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
				
			page.category = page.getCategory(hash ? hash.slice(1) : localStorage.getItem("JsViewsDocCategory")) || categories[0];
		},
		onAfterLink: function() {
			var page = this,
				tree = page.tree,
				tabs = page.tabs;

			tabs.onSelectionChange = function() {
				var editable = tabs.selectedIndex === page.modes.edit;
				$.observable(page).setProperty({
					mode: tabs.selectedIndex,
					editable: editable
				});
				$.observable(tree).setProperty("editable", editable);
			};
			tree.onSelectionChange = function(selected) {
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
				.on("click", ".addsignature", function() {
					page.addSignature($.view(this));
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
					$.view(this).ctx.parentTags.section.sampleFrame.runCode(true);
				})
				.on("click", ".tryit", function() {
					var tag = $.view(this).parent.tag;
					tag.tabs.setTab(tag.sampleFrame.ranIt ? 0 : 2);
				})
				.on("keyup", ".try textarea", function() {
					$.observable($.view(this).ctx.parentTags.section.sampleFrame).setProperty("tryIt", true);
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
		getCategory: function(hash) {
			function getCategoryNode(name, categories, parent) {
				stack.push(parent);
				var category,
					l = categories.length;
				while (l--) {
					category = categories[l];
					if (category.name === name || category.categories && (category = getCategoryNode(name, category.categories, category))) {
						while (parent = stack.pop()) {
							parent.expanded = true;
						}
						return category
					}
				}
				stack.pop();
			}
			var category,
				stack = [],
				categories = this.data.categories;
				
			category = hash && getCategoryNode(hash, categories) || categories[0];
			hash = category.name;
			if (hash === location.hash.slice(1)) {
				return category;
			}
			location.hash = "#" + hash;
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
					buttons = '<button class="toggleselect cmdbtn">' + (this.selected ? "ok" : "edit") + '</button><img class="removesection" src="resources/images/close.png" /><br/>';
				}
			}
			this.tagCtx.tmpl = this.templates[mode][type];
			return '<div class="mode-' + mode + '">' + buttons + this.tagCtx.render() + "</div>";
		},
		onAfterLink: function() {
			var self = this;
			self.contents(".toggleselect:first", true).on("click", function() {
				self.toggleSelect();
			});
		},
		onDispose: function() {
			if (this.parent.selectedChild === this) {
				this.parent.selectedChild = null;
			}
		},

	// methods
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

			self.parent.sampleFrame = self;
			data.url = data.url || data.sampleName && ("../samples/" + data.sampleName + "/sample"); 
			self.getScript =  function(loadScript) {
				self.loadScript = loadScript;
				if (data.url) {
					$.get(data.url + ".js", function(content) {
						$.observable(data).setProperty("code", content);
						loadScript({code: content});
						self.sampleData = self.tryItData = {
							html: data.html,
							code: data.code
						};
					}, "text");
					$.observable(data).setProperty({
						html: $.trim(self.iframeWnd.document.body.innerHTML)
					});
				} else {
					loadScript(data);
					self.sampleData = self.tryItData = {
						data: data.data,
						markup: data.markup,
						html: data.html,
						code: data.code
					};
				}
			};
		},
		template: "<iframe src=\"{{attr:url||'../samples/resources/iframeDefault'}}.html\" class=\"sampleframe\" name=\"result\" style=\"height: {{attr:height}}\"></iframe>",
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
		onTabChange: function(index, tabs) {
			if (index === 2) {
				$.observable(this).setProperty("sampleData", this.tryItData);
			} else if (!index) {
				this.runCode(true);
			}
		},
		runCode: function(revert) {
			if (revert) {
				$.observable(this.sampleData).setProperty(this.origData);
				$.observable(this).setProperty({
					tryIt: false,
					ranIt: false
				});
			} else {
				$.observable(this).setProperty("ranIt", true);
			};
			try {
				this.loadScript(this.sampleData);
			}
			catch (e) {
				alert("Error: " + e)
			}
		}
	},

	sampleFieldsTag = {
		init: function() {
			this.data = this.tagCtx.view.data.sampleData;
		},
		render: function(editable) {
			function renderField(type) {
				var value = sampleData[type],
					isData = type === "data";
				stringify:data:parse
				return value 
					? "<label>" + type
						+ (editable
							? "<textarea data-link=\""
								+ (isData
									? "{stringify:sampleData." + type + ":parse}"
									: "sampleData." + type
								) + "\"></textarea>"
							: "<pre>" + (isData ? stringify(value) : $.views.converters.html(value)) + "</pre>"
						)
					+ "</label>"
					: ""; 
			}
			var ret = "",
				sampleData = this.data;
			if (sampleData.html) {
				ret += renderField("html") + renderField("code");
			} else if (sampleData.markup) {
				ret += renderField("markup") + renderField("data");
			}
			return ret;
 		}
	},

//#endregion

//#region TEMPLATES

	templates = {
		page: $.templates("#pageTmpl"),
		tabsContent: $.templates({
			markup: "#tabsContentTmpl",
			tags: {
				sectionButtons: sectionButtonsTag,
				sectionHeader: sectionHeaderTag
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
			ret += (param.optional ? "[" : "") + (i ? "," : "") + param.name + (param.optional ? "]" : ""); 
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
			+ "var useStorage = content.useStorage;\n"
			+ "content.topics = useStorage && $.parseJSON(localStorage.getItem(\"JsViewsDocTopics\")) ||\n"
			+ stringify(topics)
			+ ";\ncontent.categories = useStorage && $.parseJSON(localStorage.getItem(\"JsViewsDocCategories\")) ||\n"
			+ stringify(categories) + ";";
}

function parse(val) {
	try {
		return $.parseJSON(val);
	} catch(e) {
		if (this.tagCtx && this.tagCtx.params === "data") {
			var res = parse.call({}, "[" + val + "]");
			return res ? res[0] : {};
		}
		alert("Invalid content")
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
	if (!category) {
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
