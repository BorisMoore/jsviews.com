/*
 * Sample JsViews tag control: Minimalist {{textbox}} control
 * http://www.jsviews.com/download/sample-tag-controls/textbox/simple-textbox.js
 * Used in samples: http://www.jsviews.com/#samples/tag-controls/edit/textbox
 * Copyright 2016, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  textbox: {
    onAfterLink: function() {
      // Find input in contents, if not already found
      this.linkedElem = this.linkedElem || this.contents("input");
    },
    onUpdate: function() {
      // No need to re-render whole tag, when content updates.
      return false;
    },
    template: "<input/>"
  }
});

})(this.jQuery);
