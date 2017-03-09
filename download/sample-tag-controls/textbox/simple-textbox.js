/*! Sample JsViews tag control: {{textbox}} control v0.9.84 (Beta)
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
 * Copyright 2017, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  textbox: {
    linkedElement: "input",
    template: "<input/>",
    onUpdate: false, // No need to re-render whole tag, when content updates.
    dataBoundOnly: true
  }
});

})(this.jQuery);
