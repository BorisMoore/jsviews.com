/*! Sample JsViews tag control: {{textbox}} control v1.0.0
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
 * Copyright 2018, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  textbox: {
    dataBoundOnly: true,
    template: "<input/>",
    linkedElement: "input",
    onUpdate: false, // No need to re-render whole tag, when content updates.
  }
});

})(this.jQuery);
