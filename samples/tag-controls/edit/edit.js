(function(global, $, undefined) {
// global is the 'this' object (window when running in browser).
"use strict";

$.views.tags({
  edit: {
    init: function(tagCtx, linkCtx) {
      if (this._.inline && !tagCtx.content) {
        this.template = tagCtx.tmpl = "<input/>";
      }
      if (this.onInit) { // Allow derived tags to implement onInit
        this.onInit(tagCtx, linkCtx)
      }
    },
    onAfterLink: function(tagCtx, linkCtx) {
      linkCtx.convertBack = tagCtx.props.convertBack;
      linkCtx.convert = tagCtx.props.convert;

      var target, arrayView,
        tag = this;
      if (!tag.linkedElem || tag.linkedElem[0] && !tag.linkedElem[0].parentNode || tag._.radioGroup) {
        target = tag._.inline ? tag.contents("select,textarea,input,div.radiogroup")[0] : linkCtx.elem;
        if (tag._.inline && target && $.view(target).tag !== tag) {
          target = undefined; // The target element is contained in another tag - so we will find it
        }
        tag.linkedElem = $(target);
        if (target && target.tagName === "DIV") {
          if (!tag._.radioGroup) {
            arrayView = tag.linkedElem.view(true);
            if (arrayView && arrayView.type === "array") {
              $.views.helpers("onAfterCreate", function(addedView) {
                if (addedView.parent === arrayView) {
                  addedView.contents("input")[0]._jsvBnd = (tag._.inline ? tag._prv._jsvBnd : tag.linkedElem[0]._jsvBnd) + "+";
                  // Create cloned 'to-binding' for new radio button inputs. Note: the "+" is added to ensure
                  // removing elems (radio buttons) with cloned bindings will not trigger unbinding of the 'parent'.
                }
              }, arrayView.tmpl);
            }
          }
          tag._.radioGroup = true;
          tag.linkedElem = tag.linkedElem.find("input[type=radio]");
        }
        if (!tag.linkedElem.length) {
          // {{edit}} wraps another tag, such {{slider}} or {{datepicker}} rather than an element such as <input/>
          if (tag.targetTag = tag.childTags()[0]) {
            tag.targetTag.onBeforeChange = function(ev, val) {
              return tag.onBeforeChange.call(tag, ev, val);
            }
          }
        }
      }
      if (tag.targetTag) {
        tag.targetTag.setValue(tagCtx.args[0]);
      }
    },
    onUpdate: function(ev, eventArgs, tagCtxs) {
      return false; // don't rerender
    },
    //onBeforeChange: function(ev, val) {
    //}
    //onChange: function(val) {
    //  return val;
    //},
    dataBoundOnly: true
  }
});

})(this, this.jQuery);
