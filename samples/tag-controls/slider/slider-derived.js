(function(global, $, undefined) {
// global is the 'this' object (window when running in browser).
"use strict";

var editTag = $.views.tags["edit"]; // We will derive from the editTag

$.views.tags({
  slider: $.extend(true, {}, editTag, {
    init: function(tagCtx, linkCtx) {
      if (this._.inline && !tagCtx.content) {
        this.template = tagCtx.tmpl = "<div></div>";
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
      editTag.onAfterLink.apply(tag, arguments);
    },
    setValue: function(value) {
      this.slider.value(value || 0);
    },
    getValue: function(value) {
      return this.slider.value();
    }
  })
});
})(this, this.jQuery);
