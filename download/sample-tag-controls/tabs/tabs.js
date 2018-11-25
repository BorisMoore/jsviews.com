/*! Sample JsViews tag control: {{tabs}} control v1.0.0
Version using linkedCtxPrm
see: http://www.jsviews.com/#download/sample-tagcontrols
and http://www.jsviews.com/#bindingpatterns@tabsctxprm
/*
 * Copyright 2018, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
tabs: {
  // JsViews tag settings
  dataBoundOnly: true,
  setSize: true,
  mainElement: ".tabscontent td",
  displayElement: ".tabsview",
  bindTo: "pane",
  linkedCtxParam: "pane",
  ctx: {pane: 0}, // Default value for ~pane
  width: 250,
  height: 100,
  template:
    '{{if ~tagCtx.index===0}}' + // render once only
      '<table class="tabsview"><tbody>' +
        // Tab strip UI with 'click' handler calling tag.setTab() method
        '<tr class="tabstrip">' +
          '{{for ~tag.tagCtxs}}' +
            '<th data-link="class{:\'header_\' + (#index == ~pane)} {on ~tag.setTab #index} {:props.caption}"></th>' +
          '{{/for}}' +
        '</tr>' +
        // Tab content with wrapped content of selected {{else}} block
        '<tr class="tabscontent">' +
          '<td colspan="{{:~tag.tagCtxs.length}}" data-link="{include ^tmpl=~tag.tagCtxs[~pane].content}"></td>' +
        '</tr>' +
      '</tbody></table>' +
    '{{/if}}',

  // JsViews handlers and methods
  onUpdate: false,

  // tag methods
  setTab: function(index) {
    index = index || 0;
    // Update tag.pane, and update external data through two-way binding
    this.ctxPrm("pane", "" + index);
  }
}
});

})(this.jQuery);
