/*
 * Sample JsViews tag control: Minimalist {{textbox}} control
 * http://www.jsviews.com/download/sample-tag-controls/textbox/simple-textbox.js
 * Used in samples: http://www.jsviews.com/#samples/tag-controls/simple-textbox
 * Copyright 2016, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  textbox: {
    linkedElement: "input",
    template: "<input/>",
    onUpdate: function() {
      // No need to re-render whole tag, when content updates.
      return false;
    },
    dataBoundOnly: true
  }
});

})(this.jQuery);
