/*! Sample JsViews tag control: {{tabs}} control v1.0.7
Version using setValue()/updateValue
see: http://www.jsviews.com/#download/sample-tagcontrols
and http://www.jsviews.com/#bindingpatterns@tabs-setvalue-updatevalue */
/*
 * Copyright 2020, Boris Moore
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
  onUpdate: false,

  // tag properties/state
  pane: 0, // selected pane (defaults to 0)

  // tag methods
  setValue: function(val) {
    if (val !== undefined) {
      $.observable(this).setProperty("pane", val); // Update tag.pane
    }
  },

  setTab: function(index) {
    // OnClick for a tab
    this.setValue(index); // Update UI: select tab pane 'index' 
    this.updateValue(index); // Update external data, through two-way binding
  }
}
});

})(this.jQuery);

