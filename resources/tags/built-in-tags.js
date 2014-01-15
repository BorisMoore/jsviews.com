(function(window, $, undefined) {

//#region TEMPLATES

var	treeNodeTmpl = $.templates(
		"{^{if !hidden || ~tag.tree.editable}}<li data-link=\"class{:~tag.tree.selected === #data ? 'selected' : 'unselected'}\">" +
			"{^{if categories && categories.length }}" +
				"<span class=\"toggle\">{^{:expanded ? '-' : '+' }}</span>" +
			"{{else}}" +
				"<span class=\"spacer\">&bull;</span>" +
			"{{/if}}" +
			"{^{if ~tag.tree.editedNode(#data)}}" +
				"<button class=\"up cmdbtn\">up</button>" +
				"<button class=\"down cmdbtn\">down</button>" +
				"<button class=\"add cmdbtn\">add</button>" +
				"{{if ~parentTags.treeNode }}" +
					"<img class=\"remove\" src=\"resources/images/close.png\" />" +
				"{{/if}}" +
				"<button class=\"hide cmdbtn\" data-link=\"hidden ? 'show' : 'hide'\"></button>" +
				"<label>label: <input data-link=\"label\" /></label>" +
				"<label>name: <input data-link=\"name\" /></label>" +
				"<div class=\"bottom\"></div>" +
			"{{else}}" +
				"<span>{{>label}}</span>" +
			"{{/if}}" +
		"</li>" +
		"{^{if expanded }}" +
			"<li>" +
				"<ul>" +
					"{^{for categories }}" +
						"{^{treeNode/}}" +
					"{{/for}}" +
				"</ul>" +
			"</li>" +
		"{{/if}}{{/if}}"),

	treeTmpl  = $.templates(

		"<ul class=\"tree\">" +
			"{^{for ~tag.tagCtx.args[0] }}" +
				"{^{treeNode/}}" +
			"{{/for}}" +
		"</ul>"),

	tabsTmpl  = $.templates(

		"<table class=\"tabsview\"><tbody>" +
			"<tr class=\"tabstrip\">" +
				"{{for ~tag.tagCtxs }}" +
					"<th data-link=\"class{:'header_' + (#index === ~tag.selectedIndex)}\">" +
						"{{>props.tabCaption}}" +
					"</th>" +
				"{{/for}}" +
			"</tr>" +
			"<tr class=\"tabscontent\">" +
				"<td colspan=\"{{:~tag.tagCtxs.length}}\">" +
					"{^{for ^tmpl=~tag.tagCtxs[~tag.selectedIndex].content /}}" +
				"</td>" +
			"</tr>" +
		"</tbody></table>"),

//#endregion

//#region TAG CONTROLS

// {{tabs}}

	tabsTag = {
		init: function(tagCtx) {
			this.selectedIndex = tagCtx.props.selectedTab || 0;
			this.tabCount = this.tagCtxs.length;
			(this.parents.section || this.parents.page).tabs = this;
		},
		render: function() {
			var tagCtx = this.tagCtx;
			return this.selectedIndex === tagCtx.index ? tagCtx.render() : "";
		},
		onAfterLink: function() {
			var self = this;
			self.contents(true, ".tabstrip").first()
				.on("click", ".header_false", function() {
					self.setTab($.view(this).index);
				});
		},
		template: tabsTmpl,

	// methods
		setTab: function(index) {
			$.observable(this).setProperty("selectedIndex", index);
			if (this.onSelectionChange) {
				this.onSelectionChange(index, this);
			}
		}
	},

// {{tree}}

	treeTag = {
		init: function(tagCtx) {
			this.parent.setTree(this);
		},
		onAfterLink: function() {
			var self = this;
			self.contents("ul")
				.on("click", ".selected, .unselected", function() {
					$.view(this).ctx.tag.select();
				})
				.on("click", ".toggle", function(ev) {
					$.view(this).ctx.tag.toggle();
					ev.stopImmediatePropagation();
				})
				.on("click", ".remove", function(ev) {
					$.view(this).ctx.tag.remove();
					ev.stopImmediatePropagation();
				})
				.on("click", ".add", function(ev) {
					$.view(this).ctx.tag.addCategory();
					ev.stopImmediatePropagation();
				})
				.on("click", ".up", function(ev) {
					$.view(this).ctx.tag.moveCategoryUp();
					ev.stopImmediatePropagation();
				})
				.on("click", ".down", function(ev) {
					$.view(this).ctx.tag.moveCategoryDown();
					ev.stopImmediatePropagation();
				})
				.on("click", ".hide", function(ev) {
					$.view(this).ctx.tag.hideCategory();
					ev.stopImmediatePropagation();
				});
		},
		template: treeTmpl,

	//PROPERTIES
		_newNodeCounter: 0,

	//METHODS
		select: function(treeNode) {
			$.observable(this).setProperty("selected", treeNode.data);
			if (this.onSelectionChange) {
				this.onSelectionChange(treeNode.data);
			}
		},
		editedNode: function(treeNode) {
			return this.editable && this.selected === treeNode;
		}
	},

// {{treeNode}}

	treeNodeTag = {
		init: function(tagCtx) {
			this.data = tagCtx.view.data;
			this.tree = this.parents.tree;
		},
		template: treeNodeTmpl,

	// methods
		toggle: function() {
			$.observable(this.data).setProperty("expanded", !this.data.expanded);
			if (this.tree.onExpansionChange) {
				this.tree.onExpansionChange(this.data);
			}
		},
		remove: function() {
			var childNodes,
				parent = this.parent,
				contentArray = parent.data.categories,
				index = this.tagCtx.view.index;
			$.observable(contentArray).remove(index);
			childNodes = parent.childTags();
			this.tree.select(childNodes[index] || childNodes[index - 1] || parent);
		},
		select: function() {
			if (this.tree.selected !== this.data) {
				this.tree.select(this);
			}
		},
		addCategory: function() {
			var childNodes,
				nodeData = this.data;
			nodeData.categories = nodeData.categories || [];
			$.observable(this.data.categories).insert({
				name: "name" + this.tree._newNodeCounter++,
				label: ""
			});
			$.observable(nodeData).setProperty("expanded", true);
			childNodes = this.childTags();
			this.tree.select(childNodes[childNodes.length - 1]);
		},
		moveCategoryUp: function() {
			var index = this.tagCtx.view.index,
				categories = this.parent.data.categories;
			if (index) {
				$.observable(categories).move(index, index-1);
			}
		},
		moveCategoryDown: function() {
			var index = this.tagCtx.view.index,
				categories = this.parent.data.categories;
			if (index + 1 < categories.length) {
				$.observable(categories).move(index, index+1);
			}
		},
		hideCategory: function() {
			var category = this.parent.data.categories[this.tagCtx.view.index];
			$.observable(category).setProperty("hidden", !category.hidden);
		}
	},

// {{selectList}}
// Derives from {{for}} control

	selectListTag = $.extend(true, {}, $.views.tags["for"], { // This tag control derives from the {{for}} tag.
		onArrayChange: function(ev, eventArgs) {
			$.views.tags["for"].onArrayChange.apply(this, arguments);
			if (eventArgs.change === "insert" || eventArgs.change === "move") {
				this.toggleSelect(eventArgs.index);
			}
		},
		flow: false,

	// methods
		toggleSelect: function(index) {
			this.item(index).toggleSelect();
		},
		item: function(index) {
			return this.childTags()[index];
		},

	// events
		onToggleSelect: function(child) {
			if (child === this.selectedChild) {
				this.selectedChild = null;
			} else if (child.selected) {
				if (this.selectedChild) {
					this.selectedChild.toggleSelect();
				}
				this.selectedChild = child;
			}
		}
	});

//#endregion

//#region INITIALIZATION

treeTag.editedNode.depends = "editable";

$.views.tags({
	tabs: tabsTag,
	tree: treeTag,
	treeNode: treeNodeTag,
	selectList: selectListTag
});

//#endregion
})(this, this.jQuery);
