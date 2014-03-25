/*
 * Sample JsViews tag control: {{datepicker}} control
 * http://www.jsviews.com/download/sample-tag-controls/datepicker/datepicker.js
 * Used in samples:
 * http://www.jsviews.com/#samples/tag-controls/datepicker/simple
 * http://www.jsviews.com/#samples/tag-controls/datepicker/variants
 * Copyright 2014, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  datepicker: {
    init: function(tagCtx, linkCtx) {
      if (this._.inline && !tagCtx.content) {
        this.template = "<input/>";
      }
    },
    onAfterLink: function(tagCtx, linkCtx) {
      var tag = this;
      if (!tag.linkedElem) {
        tag.linkedElem = tag._.inline ? tag.contents("*").first() : $(linkCtx.elem);
      }
      tag.isInput = tag.linkedElem[0].tagName === "INPUT";
      if (!tag.datepicker) {
        var settings = $.extend({
          onSelect: function(dateText, inst) {
            tag.value = dateText;
            tag.update(dateText);
          }
        }, tagCtx.props);
        tag.datepicker = tag.linkedElem.datepicker(settings).data("datepicker");
      } else {
        tag.linkedElem.datepicker("option", tagCtx.props);
      }
      if (tagCtx.args[0] !== undefined && !tag.isInput) {
        tag.setValue(tagCtx.args[0]);
      }
    },
    onUpdate: function(ev, eventArgs, tagCtxs) {
      return false; // return false so as not to re-render every time.
      // Here we don't need to render, so return false for better perf.
    },
    //onBeforeChange: function(ev, eventArgs) {
    //  return true; // return false to cancel change
    //},
    setValue: function(value) {
      if (value !== undefined && value !== this.value) {
        this.value = value;
        this.linkedElem.datepicker("setDate", value);
      }
    },
    getValue: function() {
      return this.value;
    },
    dataBoundOnly: true
  }
});

})(this.jQuery);
