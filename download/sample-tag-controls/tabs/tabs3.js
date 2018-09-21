/*! Sample JsViews tag control: {{tabs}} control with one-way binding from pane v0.9.91 (Beta)
Version using getPane()
see: http://www.jsviews.com/#download/sample-tagcontrols
and http://www.jsviews.com/#bindingpatterns@tabs2way
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
  height: 50,
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
  init: function(tagCtx) {
    var newPane = this.getPane(this.tagCtxs);  // Validate 'pane' prop
    if (newPane !== undefined) {
      this.pane = newPane; // Is valid, so set to the value
    }
  },
  onUpdate: function(ev, event, newTagCtxs) {
    var newPane = this.getPane(newTagCtxs); // Validate 'pane' prop
    if (newPane === undefined) {
      return false; // Not a valid value, so no update
    }
    this.pane = newPane; // Valid value, so update
  },

  // tag properties/state
  pane: 0, // Selected pane (defaults to 0)

  // tag methods
  getPane: function(tagCtxs) {
    // Helper function
    var pane = +tagCtxs[0].props.pane;
    if (!isNaN(pane) && pane >= 0 && pane < tagCtxs.length) {
      return pane;
    }
  },

  setTab: function(index) {
    // OnClick for a tab
    $.observable(this).setProperty("pane", index); // Update tag.pane
    this.updateValue("" + index); // Update external data, through two-way binding
  }
}
});

})(this.jQuery);

