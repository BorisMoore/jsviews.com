/*! Sample JsViews tag control: {{multiselect}} control v1.0.4
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
 * Copyright 2019, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  multisel: {
    boundProps: ["size", "disabled"],
    init: function(tagCtx, linkCtx) {
      var tag = this;
      tag.valueProp = tag.tagCtx.props.valueProp || "id",
      tag.labelProp = tag.tagCtx.props.labelProp || "name";
      tag.items = tagCtx.props.items;
      tag.selectedItems = tagCtx.props.selected || [];
      tag._optionsTmpl = "{^{for ~tag.items}}<option data-link='value{:" + tag.valueProp + "}'>{{:" + tag.labelProp + "}}</option>{{/for}}";
      if (tag.inline) {
        if (tagCtx.content) {
          $.views.sub.error("{{multiselect}} must be empty");
        } else {
          tag.template = "<select multiple='multiple'>" + tag._optionsTmpl + "</select>";
        }
      } else {
        linkCtx.elem.multiple = "multiple";
        tag.template = tag._optionsTmpl;
      }
    },
    onBind: function(tagCtx, linkCtx) {
      var tag = this;
      tag.selectElem = tag.inline ? tag.contents("select") : $(linkCtx.elem);
      tag.selectElem.on("change", function(ev, evargs) {
          var newSelection = tag.selectElem.children().map(function(i) {
            return this.selected && tag.items[i] || null;
          }).get();

        tag._selSet = true;
        $.observable(tag.selectedItems).refresh(newSelection);
        tag._selSet = false;
      });
      $([tag.selectedItems]).on("arrayChange", $.proxy(tag.updateSelection, tag));
      $([tag.items]).on("arrayChange", $.proxy(tag.updateItems, tag));
      tag.updateSelection();
    },
    onAfterLink: function(tagCtx, linkCtx) {
    var propParams = tagCtx.params.props;
    if (propParams) {
      if (propParams.size) {
        this.selectElem[0].size = tagCtx.props.size;
      }
      if (propParams.disabled) {
        this.selectElem.prop("disabled", !!tagCtx.props.disabled);
      }
    }
    },
    onDispose: function() {
      var tag = this;
      $([tag.selectedItems]).off("arrayChange", tag.updateSelection);
      $([tag.items]).off("arrayChange", tag.updateItems);
    },
    onUpdate: false, // don't rerender
    attr: "html",

    //METHODS
    updateSelection: function() {
      var tag = this;
      if (!tag._selSet) {
        // Map selectedItems to the corresponding array of strings
        // (the names, or other prop specified by valueProp)
        var selection = tag.selectedItems.map(function(val) {
          return val[tag.valueProp];
        });
        tag.selectElem.val(selection); // Set selection on the <select> element
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
