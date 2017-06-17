/*! Sample JsViews tag control: {{tree}} control using {^{if}} binding v0.9.84 (Beta)
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
 * Copyright 2017, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  tree: {
    onBind: function() {
      var self = this;
      self.contents("li").first()
        .on("click", ".toggle", function() {
          self.toggle();
        });
    },
    template: '<li>' +
      '{{if folders && folders.length}}' +
        '<span class="toggle">{^{:expanded ? "-" : "+"}}</span>' +
      '{{else}}' +
        '<span class="spacer">&bull;</span>' +
      '{{/if}}' +
      '{{>name}}' +
    '</li>' +
    '{^{if expanded}}' +
      '<li>' +
        '<ul>' +
          '{{for folders}}' +
            '{^{tree/}}' +
          '{{/for}}' +
        '</ul>' +
      '</li>' +
    '{{/if}}',

    //METHODS
    toggle: function() {
      var data = this.tagCtx.contentView.data;
      $.observable(data).setProperty("expanded", !data.expanded);
    },
    dataBoundOnly: true
  }
});

})(this.jQuery);
