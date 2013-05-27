(function(window, $, undefined) {
"use strict";

var	page,
	content = $.views.documentation.content,
		
//#region TAG CONTROLS

// {{page}}

	pageTag = {
		init: function(tagCtx) {
			window.page = page = this;
			page.data =  tagCtx.view.data;
			$(window).on('hashchange', function() {
				var category = page.getCategory(location.hash.slice(1)) || page.data.categories[0];
				page.tree.selected = category;
				$.observable(page).setProperty("category", category);
			});
			var categories = page.data.categories,
				hash = location.hash;
				
			page.category = (hash && page.getCategory(hash.slice(1))) || categories[0];
//			page.category = page.getCategory(hash ? hash.slice(1) : localStorage.getItem("JsViewsDocCategory")) || categories[0];
		},
		onAfterLink: function() {
			var page = this,
				tree = page.tree,
				tabs = page.tabs;

			tree.onSelectionChange = function(selected) {
				$.observable(page).setProperty({
					hasDetail: selected.hasDetail
				});
				save(location.hash = selected.name);
			};
			tree.onExpansionChange = function(selected) {
				save(selected.name);
			};
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
				.on("click", ".removesection", function() {
					var view = $.view(this)
					page.removeSection(view.get("array").data, view.getIndex());
				})
				.on("click", ".runSample", function() {
					$.view(this).ctx.parentTags.section.sampleFrame.runCode();
				})
				.on("click", ".revertSample", function() {
					var tag = $.view(this).ctx.tag,
						section =  tag.tagName === "section" ? tag : tag.parents.section;
					section.sampleFrame.runCode(true);
				})
				.on("click", ".tryit", function() {
					var sampleSection = $.view(this).parent.tag;
					sampleSection.tabs.setTab(sampleSection.tabs.selectedIndex === 3 ? 0 : 3);
				})
				.on("keyup", ".try textarea", function() {
					$.observable($.view(this).ctx.parentTags.section.sampleFrame).setProperty("ranIt", true);
				})
				.on("contextmenu", function(ev) {
					if (content.allowEdit) {
						var editable = !page.editable;
						$.observable(tree).setProperty("editable", editable);
						$.observable(page).setProperty("editable", editable);
						return false;
					}
				});
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
		iframeLoaded: function(tagId, loadScript) {
			var sample = _jsv.bindings[tagId];
			if (sample) {
				sample.linkCtx.tag.sampleFrame.getScript(loadScript);
			}
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
			$.observable(signatures).insert(length, newSignature);
		},
		addParam: function(view, isTagArg) {
			var params = isTagArg ? view.data.args : view.data.params,
				newParam = $.extend(true, {}, this.data.subTypes.param);
			$.observable(params).insert(params.length, newParam);
		},
		addLink: function(view) {
			var links = view.data.links,
				newLink = $.extend(true, {}, this.data.subTypes.link);
			$.observable(links).insert(links.length, newLink);
		},
		addTopic: function(view) {
			var topics = view.data.topics,
				newTopic = $.extend(true, {}, this.data.subTypes.topic);
			$.observable(topics).insert(topics.length, newTopic);
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
			var selectList, index, sections, hash, i, l,
				category = this.category,
				topics = this.data.topics,
				topic = topics[category.name],
				sectionTypes = this.data.sectionTypes,
				newSection = $.extend(true, {}, sectionTypes[type]);

			if (sectionType) {
				topic = append ? view.data : view.parent.get("item").data;
			}

			if (topic) {
				sections = topic.sections;
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
		getCategory: function(hash, navigate) {
			function getCategoryNode(name, categories, parent) {
				stack.push(parent);
				var category,
					l = categories.length;
				while (l--) {
					category = categories[l];
					if (category.name === name || category.categories && (category = getCategoryNode(name, category.categories, category))) {
						while (parent = stack.pop()) {
							if (parent.hidden) {
								hidden = parent;
							}
							parent.expanded = true;
						}
						return category
					}
				}
				stack.pop();
			}
			var category, hidden,
				stack = [],
				categories = this.data.categories;
				
			category = hash && getCategoryNode(hash, categories) || categories[0];
			hash = category.name;
			if (navigate && hash !== location.hash.slice(1)) {
				location.hash = "#" + hash;
			}
			return hidden || category;
		}
	},

// {{section}}

	sectionTag = {
		init: function(tagCtx) {
			this.data = tagCtx.view.data;
		},
		render: function(type, mode) {
			var ret,
				buttons = "";
			if (mode === "edit") {
				mode = this.selected ? mode : "editview";
				if (!this.parents.section || this.parents.section.selected) {
					buttons = '<button class="toggleselect cmdbtn">' + (this.selected
						? 'ok</button><button class="up cmdbtn">up</button><button class="down cmdbtn">down'
						: "edit"
					) + '</button><img class="removesection" src="../resources/images/close.png" /><br/>';
				}
			}
			this.tagCtx.tmpl = this.templates[mode][type];
			return '<div class="mode-' + mode + '">' + buttons + this.tagCtx.render() + "</div>";
		},
		onAfterLink: function() {
			var self = this;
			if (self.ctx.mode === "edit") {
				self.contents(".cmdbtn").on("click", function() {
					ev.stopPropagation();
					ev.stopImmediatePropagation();
					return false;
				});
				self.contents().on("click", function(ev) {
					if ($(ev.target).is("cmdbtn,a,input,textarea,button,img")) {
						return;
					}
					self.toggleSelect();
				});
				self.contents(".toggleselect:first", true).on("click", function() {
					self.toggleSelect();
				});
				self.contents(".up", true).on("click", function(ev) {
					self.moveUp();
					ev.stopImmediatePropagation();
				});
				self.contents(".down", true).on("click", function(ev) {
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
						+ "</button>"
			}
			return ret + "</div>";
		}
	},

// {{sectionHeader}}

	sectionHeaderTag = {
		template: "#sectionHeaderTmpl"
	},

	sampleFrameTag = {
		init: function(tagCtx) {
			var self = this,
				data = self.origData = self.parents.section.data;
			if (data.sampleName) {
				data.url = "samples/" + data.sampleName + "/sample";
			}

			self.parent.sampleFrame = self;
			self.getScript =  function(loadScript) {
				self.loadScript = loadScript;
				if (data.url) {
					var html = $.trim(self.iframeWnd.document.body.innerHTML);
					$.get(data.url + ".js", function(content) {
						loadScript({code: content});
						self.sampleData = {
							url: data.url,
							html: html,
							code: content
						};
						self.tryItData = {
							html: html,
							code: content
						};
					}, "text");
				} else {
					loadScript(data);
					self.sampleData = {
						data: data.data,
						markup: data.markup,
						html: data.html,
						code: data.code
					};
					self.tryItData = {
						data: data.data,
						markup: data.markup,
						html: data.html,
						code: data.code
					};
				}
			};
		},
		template: "<iframe src=\"{{attr:url||'samples/resources/iframeDefault'}}.html\" class=\"sampleframe\" name=\"result\" style=\"height: {{attr:height}}px;\"></iframe>",
		onBeforeLink: function() {
			var self = this,
				iframeWnd = self.iframeWnd = $(self.parentElem).find(".sampleframe")[0].contentWindow;
			if (iframeWnd) {
				iframeWnd._tgId = self.parents.section._tgId;
			}
			self.parent.tabs.onSelectionChange = function() {
				self.onTabChange.apply(self, arguments);
			}
		},
		onDispose: function() {
			this.iframeWnd = this.parent.sampleFrame = this.parentElem = undefined;
		},
		onTabChange: function(index, tabs) {
			//if (index === 3) {
			//	$.observable(this).setProperty("sampleData", this.tryItData);
			//}
			$.observable(this).setProperty({
				tryIt: index === 3
			});
		},
		runCode: function(revert) {
			if (revert) {
				$.observable(this.tryItData).setProperty(this.sampleData);
				$.observable(this).setProperty("ranIt", !revert);
			};
			try {
				this.loadScript(this.tryItData);
			}
			catch (e) {
				alert("Error: " + e)
			}
		}
	},

	sampleFieldsTag = {
		init: function() {
			this.data = this.tagCtx.view.data.tryItData;
		},
		render: function(mode) {
			function fullCode() {
				return "<!DOCTYPE html>\n"
					+ "<html>\n"
					+ "<head>\n"
					+ "    <script src=\"http://code.jquery.com/jquery.js\"></script>\n"
					+ "    <script src=\"http://www.jsviews.com/js" + (onlyJsRender ? "render" : "views") + ".js\"></script>\n"
					+ "    <link href=\"http://www.jsviews.com/documentation/"
							+ (url || "samples/resources/css/samples") + ".css\" rel=\"stylesheet\"/>\n"
					+ "</head>\n"
					+ "<body>\n\n"
					+ (tryItData.html
						? (tryItData.html + "\n\n<script>\n" + tryItData.code)
						: (tryItData.markup
							? ("<div id=\"result\"></div>\n\n"
								+ "<script id=\"theTmpl\" type=\"text/x-jsrender\">\n"
								+ tryItData.markup
								+ "\n</script>\n\n"
								+ "<script>\n"
								+ "var data = " + stringify(tryItData.data) + ";\n\n"
								+ "var template = $.templates(\"#theTmpl\");\n\n"
								+ "var htmlOutput = template.render(data);\n\n"
								+ "$(\"#result\").html(htmlOutput);")
							: ""
						)
					)
					+ "\n</script>\n\n"
					+ "</body>\n"
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
				url = this.parents.section.data.url;
			if (mode === "full") {
				ret += "<textarea class=\"fullcode\">" + $.views.converters.html(fullCode()) + "</textarea>";
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
				sectionHeader: sectionHeaderTag
			}
		}),
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
				converters: {syntaxColor: syntaxColor}
			}),
			code: $.templates("#codeTmpl"),
			sample: $.templates({
				markup: "#sampleTmpl",
				converters: {syntaxColor: syntaxColor},
				tags: {
					sampleFrame: sampleFrameTag,
					sampleFields: sampleFieldsTag
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
sectionTag.templates = sectionTemplates

//#endregion

//#region HELPER FUNCTIONS

function signature(api) {
	var param, i, l,
		signature = this.data,
		data = api,
		ret = (api.object ? api.object + "." : "") + api.name;

	if (api.method) {
		ret += "(";
		for (i=0, l=signature.params.length; i<l; i++) {
			param = signature.params[i];
			ret += (param.optional ? "[" : "") + (i ? ", " : "") + param.name + (param.optional ? "]" : ""); 
		}
		ret += ")";
	}
	return ret;
}

function stringify(val) {
	return JSON.stringify(val, null, '  ');
}

function getContent(topics, categories) {
	return "var content = $.views.documentation.content;\n"
			+ "var useStorage = content.allowEdit;\n"
			+ "content.topics = useStorage && $.parseJSON(localStorage.getItem(\"JsViewsDocTopics\")) ||\n"
			+ stringify(topics)
			+ ";\ncontent.categories = useStorage && $.parseJSON(localStorage.getItem(\"JsViewsDocCategories\")) ||\n"
			+ stringify(categories) + ";";
}

function parse(val) {
	var data;
	try {
		eval("data=" + val + ";");
		return data;
	} catch(e) {
		alert("Invalid content");
	}
}

function syntaxColor(val) {
	return $.views.converters.html(val);
}

function save(category) {
	var topics,
		categories = stringify(page.data.categories),
		textareas = page.contents(".savetext", true);

	localStorage.setItem("JsViewsDocCategories", categories);
	localStorage.setItem("JsViewsDocCategory", category)
	if (!category ) {
		topics = stringify(page.data.topics)
		textareas[0].value = topics;
		localStorage.setItem("JsViewsDocTopics", topics);
		textareas[1].value = categories;
		textareas[2].value = getContent(page.data.topics, page.data.categories);
	}
}

//#endregion

//#region PAGE INITIALIZATION

$.views.tags({
	page: pageTag,
	section: sectionTag
});

$.views.converters({
	stringify: stringify,
	parse: parse,
	getContent: getContent,
	test: function(val){
		debugger;
	}
});

templates.page.link(".pageContent", content, {templates: templates});

//#endregion

})(this, this.jQuery);
