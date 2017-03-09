(function(window, $, undefined) {
"use strict";
var page, selectedCategory, topCategory, homeCategory, topCategoryName, scrollTargetElem, skipLoad, searchbox, initPageParams, prevLochash,
	isSearchTreeSelectionChange, isLeftNavSelectionChange, topSearchTree, loadedAll, searchtextElem, searchNavElem, sideNavElem, hoverTextElem,

	content = $.views.documentation.content,
	searchInclude = content.include,
	searchRegex = /#(?:search\?s=([^&]+)(&f=(jsr-)?(jsv-)?(smp-)?(txt-)?)?(?:&l=)?)?([^@]+)?(?:@(.+))?$/,
	searchCategory = {
		name: "home",
		"class": "search",
		loaded: true,
		search: true
	},
	allowEdit = false,
	md = new Remarkable('full', {
		html: true,
		breaks: false,
		linkify: true,
		typographer: true,
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(lang, str).value;
				} catch (err) {}
			}
			try {
				return hljs.highlightAuto(str).value;
			} catch (err) {}
			return ''; // use external default escaping
		}
	}),
	htmlConverter = $.views.converters.html,
//#region TAG CONTROLS

// {{page}}

	historyIndex = -1,
	historyStates = {},
	sampleFrames = {},
	pageTag = {
		init: function() {
			window.pagetag = page = this;
			page.data = content;
			page.category = selectedCategory;
		},
		onAfterLink: function() {
			var page = this, activeContainer;
			page.contents()
				.on("click", ".insertsection", function() {
					page.addSection($.view(this), this.innerText, this.getAttribute("data-type"), this.className.indexOf("append") >= 0);
				})
				.on("click", ".savedata", function() {
					save();
				})
				.on("click", ".addsignature", function(ev) {
					page.addSignature($.view(this));
					ev.stopImmediatePropagation();
				})
				.on("click", ".addparam", function() {
					page.addParam($.view(this));
				})
				.on("click", ".addarg", function() {
					page.addParam($.view(this), true);
				})
				.on("click", ".addlink", function() {
					page.addLink($.view(this));
				})
				.on("click", ".addtopic", function() {
					page.addTopic($.view(this));
				})
				.on("click", ".addcodetab", function() {
					page.addCodeTab($.view(this));
				})
				.on("click", ".removesection", function() {
					var view = $.view(this);
					page.removeSection(view.get("array").data, view.getIndex());
				})
				.on("click", ".runSample", function() {
					$.view(this).ctx.parentTags.section.sampleFrame.runCode();
				})
				.on("click", ".revertSample", function() {
					var tag = $.view(this).ctx.tag,
						section = tag.tagName === "section" ? tag : tag.parent.parents.section;
					section.sampleFrame.runCode(true);
				})
				.on("click", ".tryIt", function() {
					var sampleSection = $.view(this).parent.tag,
						tabsControl = sampleSection.tabs,
						tryitTab = tabsControl.tabCount - 1;
					tabsControl.setTab(tabsControl.selectedIndex === tryitTab ? 0 : tryitTab);
				})
				.on("keyup", ".try textarea", function() {
					$.observable($.view(this).ctx.parentTags.section.sampleFrame).setProperty("ranIt", true);
				})
				.on("contextmenu", function() {
					var editable = !page.editable;
					if (!editable || !content.search && (allowEdit || content.allowEdit)) {
						$.observable(content).setProperty("editable", editable);
						if (page.tree) {
							$.observable(page.tree).setProperty("editable", editable);
						}
						$.observable(page).setProperty("editable", editable);
						save();
						return false;
					}
				});
		},
		onDispose: function() {
			save();
		},
		template: "#pagePanelTmpl",

	// properties
		modes: {
			details: 1,
			summary: 0,
			edit: 2
		},
		mode: 0,
		editable: false,

	// methods
		setTree: function(tree) {
			this.tree = tree;
			$.observable(tree).setProperty("selected", selectedCategory);
			tree.onSelectionChange = function(selected) {
				save(location.hash = selected.name);
				if (tree.editable) {
					tree.refresh();
				}
				isLeftNavSelectionChange = true;
			};
			tree.onExpansionChange = function(selected) {
				save(selected.name);
			};
		},
		iframeLoaded: function(tagId, loadScript) {
			sampleFrames[tagId].getScript(loadScript);
		},
		addSignature: function(view) {
			var signatures = view.data.signatures,
				length = signatures.length,
				newSignature = $.extend(true, {}, this.data.subTypes.signature);
			if (signatures[length-1]) {
				// Copy over the previous signature, but don't copy the event data, since we want new data-linking for the new instances.
				$.extend(true, newSignature, signatures[length-1]);
				$._removeData(newSignature);
				$._removeData(newSignature.params);
			}
			$.observable(signatures).insert(newSignature);
		},
		addParam: function(view, isTagArg) {
			var params = isTagArg ? view.data.args : view.data.params,
				newParam = $.extend(true, {}, this.data.subTypes.param);
			$.observable(params).insert(newParam);
		},
		addLink: function(view) {
			var links = view.data.links,
				newLink = $.extend(true, {}, this.data.subTypes.link);
			$.observable(links).insert(newLink);
		},
		addTopic: function(view) {
			var topics = view.data.topics,
				newTopic = $.extend(true, {}, this.data.subTypes.topic);
			$.observable(topics).insert(newTopic);
		},
		addCodeTab: function(view) {
			var tabs = view.data.codetabs = view.data.codetabs || [],
				newTab = $.extend(true, {}, this.data.subTypes.codetab);
			$.observable(tabs).insert(newTab);
		},
		addSection: function(view, type, sectionType, append) {
			function getLinks(cat, recurse) {
				var childCat, i,
					childCats = cat.categories || [],
					l = childCats.length;
				for (i =0; i<l; i++) {
					childCat = childCats[i];
					if (topics[hash = childCat.name]) {
						newSection.topics.push({
							hash: hash,
							label: childCat.label
						});
					}
					if (recurse) {
						getLinks(childCat, recurse);
					}
				}
			}
			var selectList, index, sections, hash, left,
				category = this.category,
				topics = this.data[topCategoryName],
				topic = (topics || topCategory)[category.name],
				sectionTypes = this.data.sectionTypes,
				newSection = $.extend(true, {}, sectionTypes[type]);

			if (sectionType) {
				topic = append ? view.data : view.parent.get("item").data;
			}

			if (topic) {
				if (topic.leftsections) {
					selectList = view.ctx.tag;
					left = selectList.tagCtx.props.left;
				}
				sections = left ? topic.leftsections : topic.sections;
				if (!sections) {
					sections = [];
					$.observable(topic).setProperty("sections", sections);
				}
				index = append ? sections.length :view.index;
				if (type === "links") {
					getLinks(category);
				}
				$.observable(sections).insert(index, newSection);
			} else if (!topic) {
				topics[category.name] = {
					title: category.label,
					path: "",
					sections: [newSection]
				};
				view.refresh();
				selectList = view.childTags(true, "selectList")[0];
				selectList.toggleSelect(0);
			}
			save();
		},
		removeSection: function(sections, index) {
			$.observable(sections).remove(index);
			save();
		},
		tryIt: function(view) {
			var sample = view.data;
			$.observable(sample).setProperty("tryIt", !sample.tryIt);
		},
		hideCategory: function(hash) {
			function getCategoryNode(name, categories, parent) {
				stack.push(parent);
				var category,
					l = categories.length;
				while (l--) {
					category = categories[l];
					if (category.name === name || category.categories && (category = getCategoryNode(name, category.categories, category))) {
						while (parent = stack.pop()) {
							if (parent.hidden) {
								return parent;
							}
						}
						return category;
					}
				}
				stack.pop();
			}
			var hidden,
				stack = [],
				categories = this.data.categories;

			hidden = hash && getCategoryNode(hash, categories);
			return hidden && hidden.hidden;
		},
		scrollTo: function(lochash) {
			location.hash = lochash;
		},
		navTo: function(lochash, newCat) {
			var section, searchTreeNode, offset, categoryName, sectionIndex, filter, searchTerm, scrollTo, wasSearch, navTreeNode;
			if (prevLochash !== lochash) {
				if (section = searchRegex.exec(lochash)) {
					if (searchTerm = section[1]) {
						$.observable(searchInclude).setProperty({
							jsr: !section[3],
							jsv: !section[4],
							smp: !section[5],
							txt: !section[6]
						});
					}
					categoryName = section[7];
					sectionIndex = section[8];
					if (searchTreeNode = sectionIndex && searchTerm) {
						searchTreeNode = categoryName + "@" + sectionIndex;
						section = content.filter[sectionIndex].text;
						$.observable(content).setProperty("searchtext", topSearchTree.searchtext = section);
						searchtextElem.addClass("selected");
					} else {
						section = sectionIndex;
						wasSearch = content.searchtext;
						$.observable(content).setProperty("searchtext", topSearchTree.searchtext = undefined);
						searchtextElem.removeClass("selected");
					}
					initPage(categoryName, searchTerm, sectionIndex);
					if (!searchTerm && page.tree) { // If tree not yet instantiated, will set selection in page.setTree()
						$.observable(page.tree).setProperty("selected", selectedCategory);
						navTreeNode = $(".sidenav li.selected")[0];
					}
				}
				if (section && (scrollTargetElem = document.getElementById(lochash + "$"))) {
					skipLoad = true;
					newCat = newCat === true || !isSearchTreeSelectionChange;
					setTimeout(function() { // Need short delay for Chrome to scroll to 0 - after it has moved to previous scroll position
						if (lochash === location.hash) { // If a new request has started, skip this one. (Fast clicking on prev, next, or history back/forward)
							if (newCat || !scrollTargetElem) {
								window.scrollTo(0, 0);
							}
							if (scrollTargetElem) {
								offset = $(scrollTargetElem).offset().top
									- (!content.searched
										? 40
										: searchTreeNode
											? 140
											: 120);

								$.observable(content).setProperty("loc", lochash);

								$(navigator.userAgent.toLowerCase().indexOf('webkit') > 0 ? 'body' : 'html')
									.delay(150).animate({scrollTop: offset}, searchTreeNode ? 100 : 625, function() {
									if (!isSearchTreeSelectionChange && lochash === location.hash) { // If a new request has started, skip this one.
										if (searchTreeNode = document.getElementById(searchTreeNode + "$")) {
											searchNavElem.animate({scrollTop: searchNavElem.scrollTop() - searchNavElem.height()/2
												+ $(searchTreeNode).offset().top - searchbox.offset().top - 60}, 150);
										}
									}
									scrollTargetElem = isSearchTreeSelectionChange = false;
								});
							}
						}
					}, 0);
				} else {
					navTreeNode = !isLeftNavSelectionChange && navTreeNode;
					scrollTargetElem = isSearchTreeSelectionChange = isLeftNavSelectionChange = false;
					setTimeout(function() { // Need short delay for Chrome to scroll to 0 - after it has moved to previous scroll position
						if (!wasSearch) {
							window.scrollTo(0, historyStates[historyIndex] && historyStates[historyIndex].scroll || 0);
						}
						if (navTreeNode) {
							sideNavElem.animate({scrollTop: navTreeNode.offsetTop - sideNavElem.height()/2}, 150);
						}
					}, 0);
				}
				prevLochash = lochash;
			}
			return false;
		}
	},

// {{searchTree}}
 
	searchTreeTag = {
		baseTag: "tree",
		filter: true,
		init: function(tagCtx) {
			tagCtx.ctx.tree = topSearchTree; // Set contextual property ~tree
		},
		onAfterLink: function() {
			var self = this;
			self.contents("ul")
				.on("click", ".toggle", function(ev) {
					$.view(this).ctx.tag.toggle();
					ev.stopImmediatePropagation();
				})
		},
		template: "<ul class=\"tree\">" +
			"{^{for}}" +
				"{^{searchTreeNode/}}" +
			"{{/for}}" +
		"</ul>"
	},

	searchTreeNodeTag = {
		baseTag: "treeNode",
		template: "{^{if !hidden && filtered}}<li {{:filtered.length ? 'class=\"withgroup\"' : ''}} data-link=\"class{merge: ~tree.topicName === name toggle='topicsel'}\">" +
			"{^{if categories && categories.length }}" +
				"<span class=\"spacerbox\"></span>" +
			"{{else}}" +
				"<span class=\"spacer\">&bull;</span>" +
			"{{/if}}" +
			"<span class=\"searchitem\">{{>label}}</span> {{if filtered.length}}<span class='searchgroup'>{^{for filtered ~name=name}}<div class='searchcontext' id='{{:section}}$' data-link=\"{on ~tree.select section true} class{merge: ~tree.selected === section toggle='sectionsel'} {on 'mouseenter' ~tree.mouseenter ~name}\">{{:text}}</div><span class='searchplace'></span>{{/for}}</span>{{/if}}" +
		"</li>{{if filtered.length}}<li class='aftergroup'></li>{{/if}}" +
			"<li>" +
				"<ul>" +
					"{^{for categories }}" +
						"{^{searchTreeNode/}}" +
					"{{/for}}" +
				"</ul>" +
			"</li>" +
		"{{/if}}"
	},

// {{section}}

	sectionTag = {
		init: function(tagCtx) {
			this.data = tagCtx.view.data;
		},
		render: function(type, mode) {
			var editable = mode === "edit",
				buttons = "";
			if (editable) {
				mode = this.selected ? mode : "editview";
				if (!this.parent.parents.section || this.parent.parents.section.selected) {
					buttons = '<button class="toggleselect cmdbtn">' + (this.selected
						? 'ok</button><button class="up cmdbtn">up</button><button class="down cmdbtn">down'
						: "edit"
					) + '</button><span class="removesection"></span><br/>';
				}
			}
			this.tagCtx.tmpl = this.templates[mode][type];
				buttons += this.tagCtx.render();
			return editable
				? ('<div class="mode-' + mode + '">' + buttons + "</div>") : buttons;
		},
		onAfterLink: function() {
			var self = this;
			if ($.views.getCtx(self.ctx.mode) === "edit") {
				self.contents(".cmdbtn").on("click", function(ev) {
					ev.stopPropagation();
					ev.stopImmediatePropagation();
					return false;
				});
				self.contents().on("click", function(ev) {
					if ($(ev.target).is("cmdbtn,a,input,textarea,button,img,.removesection")) {
						return;
					}
					self.toggleSelect();
				});
				self.contents(true, ".toggleselect:first").on("click", function() {
					self.toggleSelect();
				});
				self.contents(true, ".up").on("click", function(ev) {
					self.moveUp();
					ev.stopImmediatePropagation();
				});
				self.contents(true, ".down").on("click", function(ev) {
					self.moveDown();
					ev.stopImmediatePropagation();
				});
			}
		},
		onDispose: function() {
			if (this.parent.selectedChild === this) {
				this.parent.selectedChild = null;
			}
		},

	// methods
		moveUp: function() {
			var index = this.tagCtx.view.index,
				sections = this.parent.tagCtx.args[0];
			if (index) {
				$.observable(sections).move(index, index-1);
			}
			save();
		},
		moveDown: function() {
			var index = this.tagCtx.view.index,
				sections = this.parent.tagCtx.args[0];
			if (index + 1 < sections.length) {
				$.observable(sections).move(index, index+1);
			}
			save();
		},
		toggleSelect: function() {
			$.observable(this).setProperty("selected", !this.selected);
			this.refresh();
			if (this.parent.onToggleSelect) {
				this.parent.onToggleSelect(this);
			}
			save();
		}
	},

// {{sectionButton}}

	sectionButtonsTag = {
		render: function(sectionTypes) {
			var ret = "<div class=\"buttons\">",
				nestedSectionType = $.views.getCtx(this.ctx.sectionType);
			for (var type in sectionTypes) {
				ret += "<button class=\""
							+ (this.tagCtx.props.append ? "append " : "")
							+ "insertsection cmdbtn\" "
							+ (nestedSectionType ? "data-type=\"" + nestedSectionType + "\"" : "")
						+ ">"
							+ type
						+ "</button>";
			}
			return ret + "</div>";
		}
	},

// {{sectionTitle}}

	sectionTitleTag = {
		template: "#sectionTitleTmpl"
	},

// {{sectionHeader}}

	sectionHeaderTag = {
		template: "#sectionHeaderTmpl"
	},

// {{sampleFrame}}

	sampleFrameTag = {
		init: function() {
			var self = this,
				data = $.parseJSON(stringify(self.parent.parents.section.data)),
				codetabs = data.codetabs;

			self.parent.sampleFrame = self;
			self.getScript = function(loadScript) {
				self.loadScript = loadScript;
				if (data.url) {
					var html = $.trim(self.iframeWnd.document.body.innerHTML).replace(/&#10;/g, "\n"), // IE puts &#10; entities in place of some newlines
						toremove = html.indexOf("\n<!--<script src=\""),
						header = self.iframeWnd.document.head || "";
					if (toremove > 0) {
						html = html.slice(0, toremove);
					}
					if (header) { // Fails in IE8 or earlier
						header = header.innerHTML
							.replace(/^.*sample-viewer.*$/m, "")
							.replace(/<style type="text\/css"><\/style>/, "")
							.replace(/^\n*.*\.js"><\/script>\n*/, "");
					}
					$.get(data.url + ".js", function(content) {
						loadScript({code: content});
						self.origData = self.sampleData = {
							url: data.url,
							html: html,
							header: header,
							code: content
						};
						self.tryItData = {
							html: html,
							header: header,
							code: content
						};
						codetabs && self.loadTabs(codetabs);
					}, "text");
				} else {
					loadScript(data);
					self.origData = self.sampleData = {
						data: data.data,
						markup: data.markup,
						html: data.html,
						code: data.code,
						jsrJsvJqui: data.jsrJsvJqui,
						nocss: data.nocss
					};
					self.tryItData = {
						data: data.data,
						markup: data.markup,
						html: data.html,
						code: data.code,
						jsrJsvJqui: data.jsrJsvJqui,
						nocss: data.nocss
					};
					codetabs && self.loadTabs(codetabs);
				}
			};
		},
		loadTabs: function(codetabs) {
			var self = this;
			$.each(codetabs, function(index, tab) {
				$.get(tab.url, function(content) {
					self.tryItData['c' + index] = self.sampleData['c' + index] = content;
				}, "text");
			});
		},
		template: "<iframe src=\"{{attr:url||'samples/iframedefault' + (jsrJsvJqui||'') + (nocss?'_nocss':'')}}.html\" class=\"sampleframe\" name=\"result\" style=\"height: {{attr:height}}px;\"></iframe>",
		onBind: function() {
			var self = this,
				iframeWnd = self.iframeWnd = $(self.parentElem).find(".sampleframe")[0].contentWindow;
			if (iframeWnd) {
				sampleFrames[iframeWnd._tgId = self._tgId] = self;
			}
			self.parent.tabs.onSelectionChange = function() {
				self.onTabChange.apply(self, arguments);
			};
		},
		onDispose: function() {
			if (this.iframeWnd.$.observe) {
				this.iframeWnd.$.unobserve();
			}
			this.iframeWnd = this.parent.sampleFrame = this.parentElem = undefined;
		},
		onTabChange: function(index, tabs) {
			$.observable(this).setProperty("tryIt", index === tabs.tabCount - 1);
		},
		runCode: function(revert) {
			if (revert) {
				$.observable(this.tryItData).setProperty(this.origData);
				$.observable(this).setProperty("ranIt", !revert);
			}
				this.loadScript(this.tryItData);
		}
	},

// {{sampleFields}}

	sampleFieldsTag = {
		init: function() {
			this.data = this.tagCtx.view.data.tryItData;
		},
		render: function(mode, arg1, arg2) {
			function fullCode() {
				var code = tryItData.code,
					codeInHeader = code && code.indexOf("$(function()") === 0,
					html = tryItData.html;
				return "<!DOCTYPE html>\n"
					+ "<!-- To run the current sample code in your own environment, copy this to an html page. -->\n\n"
					+ "<html>\n"
					+ "<head>\n"
					+ "  <script src=\"//code.jquery.com/jquery-1.12.4.js\"></script>\n"
					+ (url
						? ("  <base href=\"//www.jsviews.com/" + url.slice(0, url.lastIndexOf("/")) + "/\"/>\n"
							+ tryItData.header
							+ (codeInHeader
								? ("<script>\n" + code
									+ "\n</script>\n")
								: ""))
						: (
					(jsrJsvJqui === "jqui"
						? "  <script src=\"//code.jquery.com/ui/1.12.1/jquery-ui.min.js\"></script>\n"
						+ "  <link href=\"//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css\" rel=\"stylesheet\">\n"
						: ""
					)
					+ "  <base href=\"//www.jsviews.com/samples/\"/>\n"
					+ (nocss ? "" : "  <link href=\"samples.css\" rel=\"stylesheet\"/>\n")
					+ "  <script src=\"../download/js" + (jsrJsvJqui === "jsr" ? "render" : "views")
					+ ".js\"></script>\n"
					+ (jsrJsvJqui === "jqui"
						? "  <script src=\"../download/sample-tag-controls/jsviews-jqueryui-widgets.js\"></script>\n"
						: "")
					))
					+ "</head>\n"
					+ "<body>\n\n"
					+ (html
						? (html + (code && !codeInHeader ? "\n\n<script>\n" + code + "\n</script>" : ""))
						: (tryItData.markup
							? ("<div id=\"result\"></div>\n\n"
								+ "<script id=\"theTmpl\" type=\"text/x-jsrender\">\n"
								+ tryItData.markup
								+ "\n</script>\n\n"
								+ "<script>\n"
								+ "var data = " + stringify(tryItData.data) + ";\n\n"
								+ "var template = $.templates(\"#theTmpl\");\n\n"
								+ (jsrJsvJqui === "jsr"
									? ("var htmlOutput = template.render(data);\n\n"
										+ "$(\"#result\").html(htmlOutput);")
									: "template.link(\"#result\", data);")
								+ "\n</script>"
							)
							: ""
						)
					)
					+ "\n\n</body>\n"
					+ "</html>\n";
			}

			function renderField(type, label) {
				var value = tryItData[type],
					isData = type === "data",
					highlightSyntax = {
						code: "js",
						markup: "jsr",
						html: "jsr"
					};

				if (value) {
					value = "<label>" + (label||type);
					if (editable) {
						 value += ":<textarea data-link=\""
							+ (isData
								? "{stringify:tryItData." + type + ":parse}"
								: "tryItData." + type
							) + "\"></textarea></label>";
					} else {
						value += ":<pre>"
							+ (isData
								? hljs.highlight("json", stringify(tryItData[type])).value
								: hljs.highlight(highlightSyntax[type] || "javascript", tryItData[type]).value
							) + "</pre></label>";
					}
				}
				return value || "";
			}

			var ret = "",
				tryItData = this.data,
				jsrJsvJqui = this.tagCtx.view.data.origData.jsrJsvJqui,
				nocss = this.tagCtx.view.data.origData.nocss,
				editable = mode==="edit",
				url = this.parent.parents.section.data.url;

			if (mode === "full") {
				ret += "<textarea class=\"fullcode\">" + htmlConverter(fullCode()) + "</textarea>";
			} else if (mode === "code") {
				ret += renderField(arg1, arg2);
			} else if (tryItData.html) {
				ret += renderField("html") + renderField("code", "javascript");
			} else if (tryItData.markup) {
				ret += renderField("markup", "template markup") + renderField("data");
			}
			return ret;
		}
	},

//#endregion

//#region TEMPLATES

	templates = {
		page: $.templates({
			markup: "#pageTmpl",
			tags: {
				sectionButtons: sectionButtonsTag,
				sectionHeader: sectionHeaderTag,
				sectionTitle: sectionTitleTag
			},
			converters: {
				newsearch: function(val) {
					return val.toLowerCase();
				}
			}
		})
	},
	sectionTemplates = {
		summary: {
			para: $.templates("#paraTmpl"),
			api: $.templates({
				markup: "#apiTmpl",
				helpers: {
					signature: signature
				}
			}),
			tag: $.templates({
				markup: "#tagTmpl",
				helpers: {
					signature: signature
				}
			}),
			data: $.templates("#dataTmpl"),
			template: $.templates({
				markup: "#templateTmpl"
			}),
			code: $.templates("#codeTmpl"),
			sample: $.templates({
				markup: "#sampleTmpl",
				tags: {
					sampleFrame: sampleFrameTag,
					sampleFields: sampleFieldsTag
				},
				helpers: {
					tabsTmpl: function() {
						var tab,
							codetabs = this.data.codetabs || [],
							codetabsLength = codetabs.length,
							template = '{^{tabs tabCaption="How it works"}}' +
							'{{for ~sections}}' +
								'{{if ~mode!=="summary" || !detail}}{^{section _type ~mode /}}{{/if}}' +
							'{{/for}}' +
						'{{else tabCaption="Code"}}' +
							'<div class="code">' +
								'{{sampleFields/}}' +
							'</div>';

						for (tab = 0; tab < codetabsLength; tab++) { // Add an {{else}} block for each codetab
							template += '{{else tabCaption="' + codetabs[tab].label + '"}}' +
								'<div class="codetab">' +
									'{{sampleFields "code" "c' + tab + '" "' + codetabs[tab].url + '"/}}' +
								'</div>';
						}

						template +=
						'{{else tabCaption="Full Code"}}' +
							'{{sampleFields "full"/}}' +
						'{{else tabCaption="Try it"}}' +
							'<div class="runButtons">' +
								'<em>Try it:</em> make changes below, then run... <button class="runSample" data-link="disabled{:!ranIt}">Run code</button>' +
								'<button class="revertSample" data-link="disabled{:!ranIt}">Clear changes</button>' +
							'</div>' +
							'<div class="try">' +
								'{{sampleFields "edit"/}}' +
							'</div>' +
						'{{/tabs}}';
						return template;
					}
				}
			}),
			links: $.templates({
				markup: "#linksTmpl",
				helpers: {
					url: function(hash) {
						return location.pathname +"#" + hash;
					}
				}
			})
		},
		edit: {
			para: $.templates("#editParaTmpl"),
			api: $.templates("#editApiTmpl"),
			tag: $.templates("#editTagTmpl"),
			data: $.templates("#editDataTmpl"),
			template: $.templates("#editTemplateTmpl"),
			code: $.templates("#editCodeTmpl"),
			sample: $.templates("#editSampleTmpl"),
			links: $.templates("#editLinksTmpl")
		}
	};

var testDiv = $("#testHtml")[0];

document.onkeydown = function(ev) {
	ev = ev || window.event;
	var keyCode = ev.keyCode;
	if (!ev.altKey && !ev.shiftKey) {
		if (keyCode === 27) { // Escape
			content.searchTree.close();
		} else if (ev.ctrlKey) {
			if (content.search) {
				if (keyCode === 39) { // Right arrow
					content.searchTree.next();
				} else if (keyCode === 37) { //Left Arrow
					content.searchTree.prev();
				}
			}
			if (keyCode === 191) { // Ctrl+/
				searchbox.focus();
				window.scrollTo(0, 0);
			}
		}
	}
};

function treeGroup () {}

treeGroup.prototype = {
	select: function(section) {
		if (section && this.selected !== section) {
			location.hash = "search?s=" + encodeURIComponent(content.search) + searchIncludeHash() + "&l=" + section;
			searchtextElem.addClass("selected");
		}
	},
	unselect: function() {
		location.hash = "search?s=" + encodeURIComponent(content.search) + searchIncludeHash();
		searchtextElem.removeClass("selected");
	},
	changing: function(ev, eventArgs) {
		var searchTerm, newSearch,
			noSearch = " ";
		if (eventArgs.value || eventArgs.oldValue) {
			searchTerm = eventArgs.value;
			if (ev.keyCode === 13 && searchTerm && !content.editable) {
				newSearch = content.search !== searchTerm;
				searchTerm = "#search?s=" + encodeURIComponent(searchTerm) + searchIncludeHash();
				if (location.hash !== searchTerm) {
					location.hash = searchTerm;
					$.observable(content).setProperty("noSearch", newSearch ? "Loading" : "");
				}
				return; // Set content.search to value in text box.
			}
			if (searchTerm !== content.search) {
				if (searchTerm) {
					noSearch = "<b>Enter</b>: Search...<br/><b>Escape</b>: Quit<br/><b>Ctrl+Left/Right Arrow</b>: Prev/Next result";
				}
			} else {
				noSearch = "";
			}
		}
		$.observable(content).setProperty("noSearch", noSearch);
		return false;
	},
	prev: function() {
		$("#prev").focus();
		var newIndex = this.sectionIndex === undefined ? content.filterlen - 1 : this.sectionIndex - 1;
		if (newIndex >= 0) {
			this.select(content.filter[newIndex].section);
		} else if (newIndex === -1) {
			this.unselect();
		}
	},
	next: function() {
		$("#next").focus();
		var newIndex = this.sectionIndex === undefined ? 0 : this.sectionIndex + 1;
		if (newIndex < content.filterlen) {
			this.select(content.filter[newIndex].section);
		} else if (newIndex === content.filterlen) {
			this.unselect();
		}
	},
	close: function() {
		location.hash = searchRegex.exec(location.hash)[7] || topCategoryName;
	},
	mouseenter: function(topicName, ev, eventArgs) { // Hover over a search target section
		var section = eventArgs.linkCtx.data;

		$.observable(content).setProperty({
			hoverText: section.text, // Set section text on hover div, which will also make it visible
			hoverTopicSel: this.topicName === topicName // True for search section within the currently selected topic - sets class for colors.
		});
		hoverTextElem
			.show()
			.offset({top: eventArgs.linkCtx.elem.offsetTop + searchNavElem.offset().top - searchNavElem.scrollTop()});
	},
	mouseleave: function(ev, eventArgs) {
		hoverTextElem.hide();
	},
	mousewheel: function(ev, eventArgs) {
		hoverTextElem.hide();
		ev.preventDefault();
		searchNavElem.scrollTop(searchNavElem.scrollTop() + ev.originalEvent.deltaY);
	},
	click: function(ev, eventArgs) { // Click on overlay: "#hoverText"
		var leftTarget = searchNavElem.position().left + 10;
		hoverTextElem.hide();
		isSearchTreeSelectionChange = true;
		this.select($.view(document.elementFromPoint(leftTarget, ev.clientY)).data.section);
	}
};

function searchIncludeHash() {
	var hash = "";
	if (!(searchInclude.jsr && searchInclude.jsv && searchInclude.smp && searchInclude.txt)) {
		hash += "&f="
		+ (searchInclude.jsr ? "" : "jsr-")
		+ (searchInclude.jsv ? "" : "jsv-")
		+ (searchInclude.smp ? "" : "smp-")
		+ (searchInclude.txt ? "" : "txt-");
	}
	return hash;
}

function searchContent(searchValue) {
	var i, category, foundInCat, foundInCats,
		categories = content.categories,
		l = categories.length;
	content.filter = [];
	$.observable(content).setProperty("searchtext", "");
	searchtextElem && searchtextElem.removeClass("selected");
	for (i=1; categories && i<l; i++) {
		category = categories[i];
		foundInCat = undefined;
		if ((category.filter !== "jsr" || searchInclude.jsr)
			&& (category.filter !== "jsv" || searchInclude.jsv)
			&& !category.hidden
			&& searchCat(category, searchValue.toLowerCase(), content[category.name], content.find[category.name])) {
			foundInCat = true;
			foundInCats = true;
		}
		$.observable(category).setProperty("filtered", foundInCat);
	}
	$.observable(content).setProperty({
		noSearch: foundInCats || !searchValue ? "" : "No results found for <span class='searchterm'>" + searchValue + "</span>...",
		filterlen: content.filter.length
	});
}

function searchCat(category, search, topCatContent, topCatFindContent) {
	var i, l, found, foundInTopic, foundInSubCat, categories, subCategory;
	if (search && (categories = category.categories)) {
		l = categories.length;
		for (i=0; categories && i<l; i++) {
			subCategory = categories[i];
			foundInSubCat = foundInTopic = undefined;
			if ((subCategory.filter !== "jsr" || searchInclude.jsr)
				&& (subCategory.filter !== "jsv" || searchInclude.jsv)
				&& !subCategory.hidden) {
				foundInTopic = searchTopic(subCategory.name, search, topCatContent, topCatFindContent);
				foundInSubCat = searchCat(subCategory, search, topCatContent, topCatFindContent);
				if (foundInTopic && foundInTopic.length || foundInSubCat) {
					found = foundInTopic;
				} else {
					foundInTopic = undefined;
				}
			}
			$.observable(subCategory).setProperty("filtered", foundInTopic);
		}
	}
	return found;
}

function searchTopic(topicName, text, topCatContent, topCatFindContent) {
	var i, l, index, displayText, ind, section, preText, postText, filtered, sectionId, searchItem, findSection, searchAnchor,
		topic = topCatContent[topicName],
		findTopic = topCatFindContent[topicName];
	if (findTopic) {
		l = findTopic.sections.length;
		filtered = [];
		if ((topic.filter !== "jsr" || searchInclude.jsr)
			&& (topic.filter !== "jsv" || searchInclude.jsv)) {
			for (i=0; i<l; i++) {
				section = topic.sections[i];
				findSection = findTopic.sections[i];
				searchAnchor = undefined;
				if (section && findSection.text && (section._type === "sample" && searchInclude.smp || section._type !== "sample" && searchInclude.txt)) {
					displayText = findSection.text;
					index = displayText.toLowerCase().indexOf(text);
					if (index + 1) {
						preText = displayText.substring(index - 35, index);
						if (ind = (preText.lastIndexOf("\n") + 1) || (preText.search(/\s/) + 1)) {
							preText = preText.slice(ind);
						}
						postText = displayText.substr(index + text.length, 210 - text.length - preText.length);
						if (ind = postText.indexOf("\n") + 1) {
							postText = postText.slice(0, ind - 1);
						}
						sectionId = topicName + "@" + content.filter.length;
						searchAnchor = "#search?s=" + encodeURIComponent(text) + searchIncludeHash() + "&l=" + sectionId;
				
						$.observable(section).setProperty("searchAnchor", "#search?s=" + encodeURIComponent(text) + searchIncludeHash() + "&l=" + sectionId);
						searchItem = {
							section: sectionId,
							searchTerm: htmlConverter(displayText.substr(index, text.length)), 
							text: htmlConverter(preText)
								+ "<span class='searchterm'>"
									+ htmlConverter(displayText.substr(index, text.length))
								+ "</span>"
								+ htmlConverter(postText)
						};
					
						filtered.push(searchItem);
						content.filter.push(searchItem);
					}
				}
				$.observable(section).setProperty("searchAnchor", searchAnchor);
			}
		}
		$.observable(topic).setProperty("filtered", filtered); 
		return topic.filtered;
	}
}

function clearSearch(searchValue) {
	var category,
		categories = content.categories,
		l = categories.length;
	content.filter = [];
	while (categories && l-- > 1) {
		category = categories[l];
		category.filtered = undefined;
		!category.hidden && clearSearchCat(category, content[category.name]);
	}
}

function clearSearchCat(category, topCatContent) {
	var l, categories, subCategory;
	if (categories = category.categories) {
		l = categories.length;
		while (categories && l--) {
			subCategory = categories[l];
			if (!subCategory.hidden) {
				subCategory.filtered = undefined;
				clearSearchTopic(subCategory.name, topCatContent);
				clearSearchCat(subCategory, topCatContent);
			}
		}
	}
}

function clearSearchTopic(topicName, topCatContent) {
	var l, section,
		topic = topCatContent[topicName];
	if (topic) {
		l = topic.sections.length;
		topic.filtered = undefined;
		while (l--) {
			section = topic.sections[l];
			$.observable(section).setProperty("searchAnchor", undefined);
		}
	}
}

sectionTemplates.editview = sectionTemplates.detail = sectionTemplates.summary; // for now
sectionTag.templates = sectionTemplates;

//#endregion

//#region HELPER FUNCTIONS

function getCategory(catName, searchTerm, searchExclude) {
	function getCategoryNode(name, subcategories, parent) {
		if (selectedCategory = categories[0][name]) {
			return topCategory = homeCategory = selectedCategory;
		}
		topCategory = undefined;

		stack.push(parent);
		var category,
			l = subcategories.length;
		while (l--) {
			category = subcategories[l];
			if (category.name === name || category.categories && (category = getCategoryNode(name, category.categories, category))) {
				while (parent = stack.pop()) {
					topCategory = parent;
					if (!parent.expanded) {
						$.observable(parent).setProperty("expanded", true);
					}
				}
				return category;
			}
		}
		stack.pop();
	}
	var topCat, // specific to this getScript call
		stack = [],
		categories = content.categories,
		oldTopCategory = topCategoryName,
		loadedPromise = $.Deferred();

	selectedCategory = catName && getCategoryNode(catName, categories) || categories[0].jsrender;
	topCategory = topCategory || selectedCategory;
	if (searchTerm && !catName) {
		topCategory = searchCategory;
		if (page) {
			page.category = undefined;
		}
	}

	topCategoryName = topCategory.name;

	if (topCategoryName !== oldTopCategory) {
		if (oldTopCategory) {
			$("#id-" + oldTopCategory)
				.removeClass("selected")
				.addClass("unselected");
		}
		$("#id-" + topCategoryName)
			.removeClass("unselected")
			.addClass("selected");
	}

	if (content.topCategory !== topCategory) {
		content.catName = catName; // Don't change this observably, to avoid triggering an additional UI update before topCategory has been set.
		$.observable(content).setProperty("topCategory", topCategory);
	}

	if (searchTerm) {
		if (content.searched !== searchTerm || content.searchExclude !== searchExclude) {
			loadAllContent()
				.then(function() {
					loadAllContent("find")
						.then(function() {
							searchContent(searchTerm);
							$.observable(content).setProperty("searched", searchTerm);
							content.searchExclude = searchExclude;
							loadedPromise.resolve();
						});
				});
		} else {
			loadedPromise.resolve();
		}
	} else {
		if (!topCategory.loaded && !topCategory.loading) {
			topCategory.loading = " "; // true, but render blank until after timeout
			topCat = topCategory; // Specific to this getCategory() call. (Global topCategory var may change before then() returns)

			$.getScript("documentation/contents-" + topCategory.name + ".js")
				.then(function() {
					$.observable(topCat).setProperty("loaded", true);
					loadedPromise.resolve();
				});

			setTimeout(function() {
				if (!topCat.loaded) {
					$.observable(topCat).setProperty("loading", "Loading...");
				}
			}, 300);
		} else {
			if (content.searched) {
				setTimeout(function() {
					clearSearch(); // lazy clear search annotations from content
					$.observable(content).setProperty({
						search: undefined,
						filterlen: 0
					});
					content.searched = undefined;
				}, 0);
			}
			loadedPromise.resolve();
		}
	}
	return loadedPromise.promise();
}

function fetchCategory() {
	save();

	var categoryName, searchTerm, sectionIndex, searchExclude,
		oldTopCategory = topCategory,
		oldCategory = selectedCategory,
		lochash = location.hash;

	if (history && history.replaceState) { // In IE9 history.replaceState not supported
		if (history.state && history.state.url === document.URL) {
			historyIndex = history.state.index;
			if (historyStates[historyIndex]) {
				history.replaceState(historyStates[historyIndex], "")
			} else {
				historyStates[historyIndex] = history.state;
			}
		} else {
			historyIndex++;
			var newState = historyStates[historyIndex] = {
				url: document.URL,
				index: historyIndex
			};

			history.replaceState(newState, "")

			if (historyStates[historyIndex - 1]) {
				historyStates[historyIndex - 1].scroll = $(window).scrollTop();
			}
		}
	}

	if (!lochash || lochash === "#home") {
		lochash = "#" + (homeCategory && homeCategory.key || "jsrender");
	}
	categoryName = searchRegex.exec(lochash);

	if (categoryName[1]) {
		$.observable(searchInclude).setProperty({
			jsr: !categoryName[3],
			jsv: !categoryName[4],
			smp: !categoryName[5],
			txt: !categoryName[6]
		});
		$.observable(content).setProperty("search", searchTerm = decodeURIComponent(categoryName[1]));
	}

	sectionIndex = categoryName[8];
	searchExclude = categoryName[2];
	categoryName = categoryName[7];

	return getCategory(categoryName, searchTerm, searchExclude)
		.then(function() {
			if (page) {
				var newTopCat = oldTopCategory !== topCategory;
				topCategoryName = topCategory.name;
				if (topCategoryName !== "home" && !content[topCategoryName]) {
					throw topCategoryName + " not loaded. Ensure category.loaded not saved as 'true'...";
				}
				$.observable(page).setProperty({
					category: selectedCategory
				});

				if (newTopCat) {
					oldTopCategory.loading = ""; // false
					if (oldTopCategory && oldTopCategory.key) {
						$("#logo-" + oldTopCategory.key)
							.removeClass("selected")
							.addClass("unselected");
					}
					if (topCategory.key) {
						$("#logo-" + topCategory.key)
							.removeClass("unselected")
							.addClass("selected");
					}
				}
				page.navTo(lochash, newTopCat || oldCategory !== selectedCategory);
			} else {
				initPageParams = {catName: categoryName, searchTerm: searchTerm, section: sectionIndex};
			}
		});
}

function initPage(categoryName, searchTerm, sectionIndex) {

	$.observable(content).setProperty({
		searchTitle: searchTerm && categoryName && content[topCategoryName][categoryName].title,
		catName: categoryName
	});
	if (searchTerm) {
		$.observable(topSearchTree).setProperty({
			sectionIndex: sectionIndex && parseInt(sectionIndex),
			topicName: categoryName,
			selected: sectionIndex && (categoryName + "@" + sectionIndex)
		});
	}
}

function signature(api) {
	var param, i, l,
		sig = this.data,
		ret = (api.object ? api.object + "." : "") + api.name;

	if (api.method) {
		ret += "(";
		for (i=0, l=sig.params.length; i<l; i++) {
			param = sig.params[i];
			ret += (param.optional ? "[" : "") + (i ? ", " : "") + param.name + (param.optional ? "]" : "");
		}
		ret += ")";
	}
	return ret;
}

function getContent(topics) {
	if (!topics) {
		return "";
	}
	var ret, l, topic,
		categories = content.categories,
		name = topCategoryName,
		path = "JsViewsDocTopics/" + topCategoryName,
		loaded = {},
		loading = {};

	if (topics === categories) {
		name = "categories";
		path = "JsViewsDocCategories";
		l = topics.length;
		while (l--) {
			topic = topics[l];
			loaded[l] = topic.loaded;
			loading[l] = topic.loading;
			delete topic.loading;
			delete topic.loaded;
		}
	}

	ret = "var content = $.views.documentation.content;\n\ncontent."
		+ name + " = content.useStorage && $.parseJSON(localStorage.getItem(\"" + path + "\")) ||\n"
		+ stringify(topics) + ";";

	if (topics === categories) {
		l = topics.length;
		while (l--) {
			topics[l].loading = loading[l];
			topics[l].loaded = loaded[l];
		}
	}
	return ret;
}

function stringify(val) {
	return JSON.stringify(val, null, '  ');
}

function parse(val) {
	var data;
	try {
		eval("data=" + val + ";");
		return data;
	} catch (e) {
	}
}

function save() {
	if (content.editable) {
		var topics, category,
			categories = content.categories,
			l = categories.length,
			textareas = page.contents(true, ".savetext"),
			loaded = {},
			loading = {},
			loadedfind = {},
			loadingfind = {};

		while (l-- > 1) {
			category = categories[l];
			loaded[l] = category.loaded;
			loading[l] = category.loading;
			loadedfind[l] = category.loadedfind;
			loadingfind[l] = category.loadingfind;
			categories[l].loaded = categories[l].loadedfind = false;
			categories[l].loading = categories[l].loadingfind = "";
		}
		localStorage.setItem("JsViewsDocCategories", stringify(categories));
		l = categories.length;
		while (l-- > 1) {
			categories[l].loaded = loaded[l];
			categories[l].loading = loading[l];
			categories[l].loadedfind = loadedfind[l];
			categories[l].loadingfind = loadingfind[l];
		}
		topics = content[topCategoryName];
		if (topics) {
			localStorage.setItem("JsViewsDocTopics/" + topCategoryName, stringify(topics));
		}
		textareas[0].value = getContent(topics);
		textareas[1].value = getContent(categories);
	}
}

//#endregion

//#region PAGE INITIALIZATION

$.views.tags({
	page: pageTag,
	section: sectionTag,
	searchTree: searchTreeTag,
	searchTreeNode: searchTreeNodeTag
});

$.views.helpers({
	stringify: stringify
});

$.views.converters({
	stringify: stringify,
	getContent: getContent,
	syntax: function(val) {
		return "<pre>" + hljs.highlight(this.tagCtx.args[1], val).value + "</pre>";
	},
	parse: parse,
	md: function(val) {
		return md.render(val);
	}
});

topSearchTree = content.searchTree = new treeGroup();

fetchCategory()
	.then(function() {
		var selectedLogo, categoryName,
		categories = content.categories,
		l = categories.length;

		while (l--) {
			categories[l].loadedfind = categories[l].loadingfind = undefined;
		}

		content.topCategory = topCategory || selectedCategory;

		//================ Load Page ================
		templates.page.link("#id-content", content, {templates: templates});

		searchtextElem = $("#searchtext");
		searchbox = $("#id-searchbox");
		searchNavElem = $(".searchnav");
		sideNavElem = $(".sidenav");
		hoverTextElem = $("#hovertext");

		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
		$(window)
			.on('hashchange', fetchCategory)
			.on('unload', save);

		$.observe(searchInclude, "jsr", "jsv", "smp", "txt", function(ev, eventArgs){
			location.hash = "search?s=" + searchRegex.exec(location.hash)[1] + searchIncludeHash();
		});

		$("#logo-" + topCategory.key)
			.removeClass("unselected")
			.addClass("selected");

		selectedLogo = $(".main-item.selected");

		page.navTo(location.hash);

		$(".main-item").on("click", function() {
			selectedLogo.removeClass("selected").addClass("unselected");
			selectedLogo = $(this).addClass("selected").removeClass("unselected");
			location.hash = this.id.slice(5);
		});
		if (!loadedAll) {
			setTimeout(function() {
				loadAllContent(); // lazy load other content in the background
			}, 0);
		}
	});

function loadAllContent(prefix) {
	var categories = content.categories,
		l = categories.length,
		notLoaded = 0,
		allLoadedPromise = $.Deferred(),
		loadingLabel = "loading" + (prefix||""),
		loadedLabel = "loaded" + (prefix||"");
	prefix = prefix || "contents";
	loadedAll = true;
	while (l-- > 1) {
		(function() { // Equivalent to $.proxy. Ensure category is specific to this call
			var category = categories[l];
			if (!category.hidden && !(prefix==="contents" ? content : content[prefix])[category.name]) {
				notLoaded++;
				category[loadingLabel] = " ";
				$.getScript("documentation/" + prefix + "-" + category.name + ".js")
					.then(function() {
						$.observable(category).setProperty(loadedLabel, true);
						category.loading = "";
						notLoaded--;
						if (!notLoaded) {
							allLoadedPromise.resolve();
						}
					});
			}
		})();
	}
	if (!notLoaded) {
		allLoadedPromise.resolve();
	}
	return allLoadedPromise.promise();
}
//#endregion
})(this, this.jQuery);
