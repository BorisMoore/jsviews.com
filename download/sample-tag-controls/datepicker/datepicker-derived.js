/*
 * Sample JsViews tag control: {{datepicker}} control, derived from {{edit}} control
 * http://www.jsviews.com/download/sample-tag-controls/datepicker/datepicker-derived.js
 * Used in samples:
 * http://www.jsviews.com/#samples/tag-controls/datepicker/with-validation
 * http://www.jsviews.com/#samples/tag-controls/datepicker/with-validation-wizard
 * Copyright 2014, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

var editTag = $.views.tags["edit"]; // We will derive from the editTag

$.views.tags({
  datepicker: $.extend(true, {}, editTag, {
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
      editTag.onAfterLink.apply(tag, arguments);
    },
    setValue: function(value) {
      if (value !== undefined && value !== this.value) {
        this.value = value;
        this.linkedElem.datepicker("setDate", value);
      }
    },
    getValue: function() {
      return this.value;
    }
  })
});

})(this.jQuery);
