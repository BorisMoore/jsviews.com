/*
 * Sample JsViews tag control: {{multiselect}} control
 * http://www.jsviews.com/download/sample-tag-controls/multiselect/multiselect.js
 * Used in samples: http://www.jsviews.com/#samples/tag-controls/multiselect
 * Copyright 2015, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  multisel: {
    init: function(tagCtx, linkCtx) {
      var tag = this;
      tag.noVal = true; // This tag control does not bind to arg[0] - no default binding to current #data context
      tag._optionsTmpl = "{^{for ~tag.items}}<option data-link='value{:name}'>{{:name}}</option>{{/for}}";
      tag.items = tagCtx.props.items;
      tag.selectedItems = tagCtx.props.selected || [];
      if (tag._.inline) {
        if (!tagCtx.content) {
          tag.template = "<select multiple='multiple'>" + tag._optionsTmpl + "</select>";
        } else {
          $.views.sub.error("{{multiselect}} must be empty");
        }
      } else {
        linkCtx.elem.multiple = "multiple";
        tag.template = tag._optionsTmpl;
      }
    },
	onAfterLink: function(tagCtx, linkCtx) {
      var tag = this;
      if (!tag.linkedElem || tag.linkedElem[0] && !tag.linkedElem[0].parentNode) {
        tag.linkedElem = tag._.inline ? tag.contents("select") : $(linkCtx.elem);
        tag.linkedElem.on("change", function(ev, evargs) {
            var newSelection = tag.linkedElem.find("option").map(function(i) {
              return this.selected && tag.items[i] || null;
            }).get();

          tag._selSet = true;
          $.observable(tag.selectedItems).refresh(newSelection);
          tag._selSet = false;
        });
        $([tag.selectedItems]).on("arrayChange", $.proxy(tag.updateSelection, tag));
        $([tag.items]).on("arrayChange", $.proxy(tag.updateItems, tag));
        tag.updateSelection();
      }
      if (tagCtx.props.size) {
        tag.linkedElem[0].size = tagCtx.props.size
      }
    },
    onDispose: function() {
      var tag = this;
      $([tag.selectedItems]).off("arrayChange", tag.updateSelection);
      $([tag.items]).off("arrayChange", tag.updateItems);
    },
    onUpdate: function(ev, eventArgs, tagCtxs) {
      return false; // don't rerender
    },
    attr: "html",

    //METHODS
    updateSelection: function() {
      var tag = this;
      if (!tag._selSet) {
        // Map selectedItems to the corresponding array of strings (the names)
        var selection = tag.selectedItems.map(function(val) {
          return val.name;
        });
        tag.linkedElem.val(selection); // Set selection on the <select> element
      }
    },
    updateItems: function() {
      var tag = this,
        l = tag.selectedItems.length;
      while (l-- > 0) {
        if ($.inArray(tag.selectedItems[l], tag.items) < 0) {
          // This selectedItem is no longer in the items
          $.observable(tag.selectedItems).remove(l);
        }
      }
      this.updateSelection();
    },
    dataBoundOnly: true
  }
});

})(this.jQuery);
