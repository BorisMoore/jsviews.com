/*! Sample JsViews tag control: {{tabs}} control v1.0.0
Version using setValue()
see: http://www.jsviews.com/#download/sample-tagcontrols */
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
  width: 250,
  height: 100,
  template:
    '{{if ~tagCtx.index===0}}' + // Render once only
      '<table class="tabsview"><tbody>' +
        // Tab strip UI with 'click' handler calling tag.setTab() method
        '<tr class="tabstrip">' +
          '{{for ~tag.tagCtxs}}' +
            '<th data-link="class{:\'header_\' + (#index === ~tag.pane)} {on ~tag.setTab #index} {:props.caption}"></th>' +
          '{{/for}}' +
        '</tr>' +
        // Tab content with wrapped content of selected {{else}} block
        '<tr class="tabscontent">' +
          '<td colspan="{{:~tag.tagCtxs.length}}" data-link="{include ^tmpl=~tag.tagCtxs[~tag.pane].content}"></td>' +
        '</tr>' +
      '</tbody></table>' +
    '{{/if}}',

  // JsViews handlers and methods
  setValue: function(val, index, tagElse) {
    var newPane = +val;
    if (!tagElse && 0 <= newPane && newPane < this.tagCtxs.length) {
      $.observable(this).setProperty("pane", newPane); // Update tag.pane
    }
  },
  onUpdate: false,
  pane: 0, // Selected pane (defaults to 0)
  setTab: function(index) {
    // OnClick for a tab
    $.observable(this).setProperty("pane", index); // Update tag.pane
    this.updateValue("" + index); // Update external data, through two-way binding
  }
}
});

})(this.jQuery);

