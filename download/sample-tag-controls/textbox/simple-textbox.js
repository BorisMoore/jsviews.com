/*
 * Sample JsViews tag control: Minimalist {{textbox}} control
 * http://www.jsviews.com/download/sample-tag-controls/textbox/simple-textbox.js
 * Used in samples: http://www.jsviews.com/#samples/tag-controls/edit/textbox
 * Copyright 2014, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  textbox: {
    onAfterLink: function() {
      this.linkedElem = this.contents("input");
    },
    template: "<input/>"
  }
});

})(this.jQuery);
