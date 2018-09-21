/*! Sample JsViews tag control: {{spinblock}} control v0.9.91 (Beta)
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
 * Copyright 2018, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
spinblock: {
  // JsViews tag settings
  dataBoundOnly: true,
  bindTo: "pane",
  linkedCtxParam: "pane",
  ctx: {pane: 0}, // Default value for ~pane
  template:
  '{{if ~tagCtx.index===0}}' // Render once only
  + '<svg class="switcher" data-link="{on ~tag.cycle ~pane}" height="34" width="17">'
    + '<path d="M5,6 L11,6 L8,2 Z M5,11 L11,11 L8,15 Z"></path>'
  + '</svg>'
  + '{^{include ^tmpl=~tag.tagCtxs[~pane].content/}}' // Render wrapped content of selected block,
                                                      // data-linked to ~tag.pane for dynamic switching 
+ '{{/if}}',

  // JsViews handlers and methods
  onUpdate: false, // No need to re-render on update

  // tag methods
  cycle: function(pane) {
    // Method to cycle/increment selected pane
    this.ctxPrm("pane", (pane + 1) % this.tagCtxs.length);
  }
}
});

})(this.jQuery);
