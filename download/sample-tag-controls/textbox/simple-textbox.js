/*! Sample JsViews tag control: {{textbox}} control v0.9.83 (Beta)
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
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
