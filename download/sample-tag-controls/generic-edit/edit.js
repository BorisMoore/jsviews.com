/*
 * Sample JsViews tag control: {{edit}} control
 * http://www.jsviews.com/download/sample-tag-controls/generic-edit/edit.js
 * Used in samples:
 * http://www.jsviews.com/#samples/tag-controls/edit
 * http://www.jsviews.com/#samples/tag-controls/datepicker
 * http://www.jsviews.com/#samples/tag-controls/slider
 * http://www.jsviews.com/#samples/tag-controls/validate
 * Copyright 2016, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  edit: {
    linkedElement: "select,textarea,input,.radiogroup",
    init: function(tagCtx, linkCtx) {
      if (this._.inline && !tagCtx.content) {
        this.template = "<input/>";
      }
    },
    onAfterLink: function(tagCtx, linkCtx) {
      var target, arrayView,
        tag = this;
      if (tag.linkedElem.hasClass("radiogroup")) {
        if (!tag._.radio) {
          tag._.radio = true;
          arrayView = tag.linkedElem.view(true);
          if (arrayView && arrayView.type === "array") {
            $.views.helpers("onAfterCreate", function(addedView) {
              if (addedView.parent === arrayView) {
                addedView.contents(true, "input")[0]._jsvBnd
                  = (tag._.inline ? tag._prv._jsvBnd : tag.linkedElem[0]._jsvBnd) + "+";
                // Create cloned 'to-binding' for new radio button inputs.
                // Note: the "+" is added to ensure removing elems (radio buttons)
                // with cloned bindings will not trigger unbinding of the 'parent'.
              }
            }, arrayView.tmpl);
          }
        }
      }
      if (!tag.linkedElem.length) {
        // {{edit}} wraps another tag, such as {{slider}}
        // or {{datepicker}} rather than an element such as <input/>
        if (tag.targetTag = tag.childTags()[0]) {
          tag.targetTag.onBeforeChange = function(ev, val) {
            return tag.onBeforeChange.call(tag, ev, val);
          };
        }
      }
      if (tag.targetTag) {
        tag.targetTag.setValue(tagCtx.args[0]);
      }
    },
    onUpdate: function(ev, eventArgs, tagCtxs) {
      return false; // don't rerender
    },
    dataBoundOnly: true
  }
});

})(this.jQuery);
