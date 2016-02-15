/*
 * Sample JsViews tag control: {{slider}} control
 * http://www.jsviews.com/download/sample-tag-controls/slider/slider.js
 * Used in samples:
 * http://www.jsviews.com/#samples/tag-controls/slider/simple
 * http://www.jsviews.com/#samples/tag-controls/slider/variants
 * Copyright 2016, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  slider: {
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
    },
    onUpdate: function(ev, eventArgs, tagCtxs) {
      return false;
      // Here we don't need to render, so return false for better perf.
    },
    //onBeforeChange: function(ev, eventArgs) {
    //  return true; // return false to cancel change
    //},
    setValue: function(value) {
      this.slider.value(value || 0);
    },
    getValue: function() {
      return this.slider.value();
    },
    dataBoundOnly: true
  }
});

})(this.jQuery);
