/*
 * Sample JsViews tag control: {{slider}} control, derived from {{edit}} control
 * http://www.jsviews.com/download/sample-tag-controls/slider/slider-derived.js
 * Used in samples: http://www.jsviews.com/#samples/tag-controls/slider/with-validation
 * Copyright 2016, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  slider: {
    baseTag: "edit",
    init: function(tagCtx, linkCtx) {
      if (this._.inline && !tagCtx.content) {
        this.template = "<div></div>";
      }
    },
    onAfterLink: function(tagCtx, linkCtx) {
      var tag = this;
      if (!tag.linkedElem) {
        tag.linkedElem = tag._.inline ? tag.contents("*").first() : $(linkCtx.elem);
      }
      if (!tag.slider) {
        var settings = $.extend({
          slide: function(evt, ui) {
            tag.update(ui.value);
          }
        }, tagCtx.props);
        tag.slider = tag.linkedElem.slider(settings).data("ui-slider");
      } else {
        tag.linkedElem.slider("option", tagCtx.props);
      }
      if (tagCtx.props.height) {
        tag.linkedElem.height(tagCtx.props.height);
      }
      if (tagCtx.props.width) {
        tag.linkedElem.width(tagCtx.props.width);
      }
      tag.setValue(tagCtx.args[0] || 0);
      tag.baseApply(arguments);
    },
    setValue: function(value) {
      this.slider.value(value || 0);
    },
    getValue: function() {
      return this.slider.value();
    }
  }
});

})(this.jQuery);
