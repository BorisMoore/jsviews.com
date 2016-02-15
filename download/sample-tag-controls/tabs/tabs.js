/*
 * Sample JsViews tag control: {{tabs}} control
 * http://www.jsviews.com/download/sample-tag-controls/tabs/tabs.js
 * Used in samples: http://www.jsviews.com/#samples/tag-controls/tabs
 * Copyright 2016, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  tabs: {
    init: function(tagCtx) {
      this.selectedIndex = tagCtx.props.selectedIndex || 0;
      this.tabCount = this.tagCtxs.length;
    },
    render: function() {
      var tagCtx = this.tagCtx;
      return this.selectedIndex === tagCtx.index ? tagCtx.render() : "";
    },
    onAfterLink: function() {
      var self = this;
      self.contents(true, ".tabstrip").first()
        .on("click", ".header_false", function() {
          self.setTab($.view(this).index);
        });
    },
    template: '<table class="tabsview"><tbody>' +
      '<tr class="tabstrip">' +
      '{{for ~tag.tagCtxs}}' +
        '<th data-link="class{:\'header_\' + (#index === ~tag.selectedIndex)}">' +
          '{{>props.tabCaption}}' +
        '</th>' +
      '{{/for}}' +
    '</tr>' +
    '<tr class="tabscontent">' +
      '<td colspan="{{:~tag.tagCtxs.length}}">' +
        '<div style="width:{{attr:~tag.tagCtxs[0].props.width}};' +
                    'height:{{attr:~tag.tagCtxs[0].props.height}}">' +
          '{^{for ^tmpl=~tag.tagCtxs[~tag.selectedIndex].tmpl /}}' +
        '</div>' +
        '</td>' +
      '</tr>' +
    '</tbody></table>',

    //METHODS
    setTab: function(index) {
      $.observable(this).setProperty("selectedIndex", index);
      if (this.onSelectionChange) {
        this.onSelectionChange(index, this);
      }
    },
    dataBoundOnly: true
  }
});

})(this.jQuery);

