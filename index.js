(function(window, $, undefined) {
"use strict";
var	page, selectedCategory, topCategory, homeCategory, topCategoryName, navigating, skipLoad,
	content = $.views.documentation.content,
	allowEdit = false,
//#region TAG CONTROLS

// {{page}}

	sampleFrames = {},

	pageTag = {
		init: function() {
			window.pagetag = page = this;
			page.data =  content;
			page.category = selectedCategory;
		},
		onAfterLink: function() {
			var page = this;
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
						section =  tag.tagName === "section" ? tag : tag.parent.parents.section;
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
					if (allowEdit || content.allowEdit) {
						var editable = !page.editable;
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
				$.observable(page).setProperty({
					hasDetail: selected.hasDetail
				});
				save(location.hash = selected.name);
				if (tree.editable) {
					tree.refresh();
				}
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
			var tabs = view.data.codetabs,
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
			sample.html2 = sample.html;
			sample.css2 = sample.css;
			sample.code2 = sample.code;
			sample.markup2 = sample.markup;
			sample.data2 = $.extend(true, {}, sample.data);
			$.observable(sample).setProperty("tryIt", !sample.tryIt );
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
		navTo: function(lochash) {
			if (lochash.indexOf("#", 1) > -1 && (navigating = document.getElementById(lochash + "$"))) {
				skipLoad = true;
				location.hash = lochash;
				setTimeout(function() {
					skipLoad = undefined;
				}, 0);
				$("html, body").delay(150).animate({ scrollTop: $(navigating).offset().top - 40 }, 625, function navComplete() {
					// Gets called twice - once for body and once for html
					if (navigating) {
						navigating = undefined;
					}
					if (navigating === false) {
						window.scrollTo(0, 0);
					}
				});
			} else {
				navigating = false;
				window.scrollTo(0, 0);
			}
			return false;
		}
	},

// {{section}}

	sectionTag = {
		init: function(tagCtx) {
			this.data = tagCtx.view.data;
		},
		render: function(type, mode) {
			var editable = mode === "edit",
				buttons = "",
				anchor = this.data.anchor;
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
			if (self.ctx.mode === "edit") {
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
				nestedSectionType = this.ctx.sectionType;
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
			if (data.sampleName) {
				data.url = "samples/" + data.sampleName + "/sample";
			}

			self.parent.sampleFrame = self;
			self.getScript =  function(loadScript) {
				self.loadScript = loadScript;
				if (data.url) {
					var html = $.trim(self.iframeWnd.document.body.innerHTML),
						toremove = html.indexOf("\n<!--<script src=\""),
						header = self.iframeWnd.document.head || "";
					if (toremove > 0) {
						html = html.slice(0, toremove);
					}
					if (header) { // Fails in IE8 or earlier
						header = header.innerHTML.replace(/^.*sample-viewer.*$/m, "");
						header = header.slice(header.indexOf('.js"></script>\n') + 15);
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
						onlyJsRender: data.onlyJsRender
					};
					self.tryItData = {
						data: data.data,
						markup: data.markup,
						html: data.html,
						code: data.code
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
		template: "<iframe src=\"{{attr:url||'samples/iframeDefault'}}.html\" class=\"sampleframe\" name=\"result\" style=\"height: {{attr:height}}px;\"></iframe>",
		onBeforeLink: function() {
			var self = this,
				iframeWnd = self.iframeWnd = $(self.parentElem).find(".sampleframe")[0].contentWindow;
			if (iframeWnd) {
//		iframeWnd._tgId = self._tgId;
				sampleFrames[iframeWnd._tgId = self._tgId] = self;
			}
			self.parent.tabs.onSelectionChange = function() {
				self.onTabChange.apply(self, arguments);
			};
		},
		onDispose: function() {
			this.iframeWnd = this.parent.sampleFrame = this.parentElem = undefined;
		},
		onTabChange: function(index, tabs) {
			$.observable(this).setProperty({
				tryIt: index === tabs.tabCount - 1
			});
		},
		runCode: function(revert) {
			if (revert) {
				$.observable(this.tryItData).setProperty(this.origData);
				$.observable(this).setProperty("ranIt", !revert);
			}
			try {
				this.loadScript(this.tryItData);
			}
			catch (e) {
				alert("Error: " + e);
			}
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
					+ "  <script src=\"//code.jquery.com/jquery-1.11.3.js\"></script>\n"
					+ (url
						? ("  <base href=\"//www.jsviews.com/" + url.slice(0, url.lastIndexOf("/")) + "/\"/>\n"
							+ tryItData.header
							+ (codeInHeader
								? ("<script>\n" + code
									+ "\n</script>\n")
								: ""))
						: ("  <base href=\"//www.jsviews.com/samples/\"/>\n"
							+ "  <link href=\"samples.css\" rel=\"stylesheet\"/>\n"
							+ "  <script src=\"../download/js" + (onlyJsRender ? "render" : "views") + ".js\"></script>\n"))
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
								+ (onlyJsRender
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
					isData = type === "data";
				return value
					? "<label>" + (label||type) + ":"
						+ (editable ? "<textarea" : "<pre")
						+ " data-link=\""
						+ (isData
							? "{stringify:tryItData." + type + ":parse}"
							: "tryItData." + type
						) + "\">"
						+ (editable ? "</textarea>" : "</pre>")
						+ "</label>"
					: "";
			}
			var ret = "",
				tryItData = this.data,
				onlyJsRender = this.tagCtx.view.data.origData.onlyJsRender,
				editable = mode==="edit",
				url = this.parent.parents.section.data.url;
			if (mode === "full") {
				ret += "<textarea class=\"fullcode\">" + $.views.converters.html(fullCode()) + "</textarea>";
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
				markup: "#templateTmpl",
				converters: {syntaxColor: syntaxColor} // todo
			}),
			code: $.templates("#codeTmpl"),
			sample: $.templates({
				markup: "#sampleTmpl",
				converters: {syntaxColor: syntaxColor}, // todo
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
								'<button class="runSample" data-link="disabled{:!ranIt}">Run code</button>' +
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
						return location.pathname +"#" +  hash;
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

sectionTemplates.editview = sectionTemplates.detail = sectionTemplates.summary; // for now
sectionTag.templates = sectionTemplates;

//#endregion

//#region HELPER FUNCTIONS

function getCategory(hash, fetch) {
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

	selectedCategory = hash && getCategoryNode(hash, categories) || categories[0].jsrender;

	topCategory = topCategory || selectedCategory;
	topCategoryName = topCategory.name;

	if (topCategoryName !== oldTopCategory) {
		if (oldTopCategory) {
			$("#" + oldTopCategory)
				.removeClass("selected")
				.addClass("unselected");
		}
		$("#" + topCategoryName)
			.removeClass("unselected")
			.addClass("selected");
	}

	$.observable(content).setProperty("topCategory", topCategory || selectedCategory);

	if (topCategory && fetch && !topCategory.loaded) {
		if (!topCategory.loading) {
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
			}
	} else {
		loadedPromise.resolve();
	}
	return loadedPromise.promise();
}

function fetchCategory() {
	if (!skipLoad) {
		save();
		var categoryName,
			oldTopCategory = topCategory,
			lochash = location.hash;

		if (!lochash || lochash === "#home") {
			lochash = "#" + (homeCategory && homeCategory.key || "jsrender");
		}
		categoryName = lochash.split("#")[1];

		return getCategory(categoryName, true)
			.then(function() {
				if (page) {
					var topCategoryName = topCategory.name;
					if (topCategoryName !== "home" && !content[topCategoryName]) {
						throw topCategoryName + " not loaded. Ensure category.loaded not saved as 'true'...";
					}
					$.observable(page).setProperty({
						category: selectedCategory
					});
					if (page.tree) { // If tree not yet instantiated, will set selection in page.setTree()
						$.observable(page.tree).setProperty("selected", selectedCategory);
					}
					if (oldTopCategory !== topCategory) {
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
					page.navTo(lochash);
				}
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
		l =  topics.length;
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
		l =  topics.length;
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
		alert("Invalid content");
	}
}

function syntaxColor(val) { // todo
	return $.views.converters.html(val);
}

function save() {
	if (content.editable) {
		var topics, category,
			categories = content.categories,
			l = categories.length,
			textareas = page.contents(true, ".savetext"),
			loaded = {},
			loading = {};

		while (l-- > 1) {
			category = categories[l];
			loaded[l] = category.loaded;
			loading[l] = category.loading;
			categories[l].loaded = false;
			categories[l].loading = "";
		}
		localStorage.setItem("JsViewsDocCategories", stringify(categories));
		l = categories.length;
		while (l-- > 1) {
			categories[l].loaded = loaded[l];
			categories[l].loading = loading[l];
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
	section: sectionTag
});

$.views.converters({
	getContent: getContent,
	stringify: stringify,
	parse: parse
});

fetchCategory()
	.then(function() {
		var selectedLogo,
			categories = content.categories,
			l = categories.length;

		content.topCategory = topCategory || selectedCategory;

		templates.page.link("#content", content, {templates: templates});

		$(window).on('hashchange', fetchCategory);
		$(window).on('unload', save);

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

		while (l--) {
			// lazy load other content in the background
			(function() { // Equivalent to $.proxy. Ensure category is specific to this call
				var category = categories[l];
				if (l && !category.hidden && !category.loading) {
					category.loading = " ";
					$.getScript("documentation/contents-" + category.name + ".js")
						.then(function() {
							$.observable(category).setProperty("loaded", true);
						});
				}
			})();
		}
	});
//#endregion

})(this, this.jQuery);
