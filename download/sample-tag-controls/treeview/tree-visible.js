/*! Sample JsViews tag control: {{tree}} control using visible{...} binding v0.9.84 (Beta)
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
 * Copyright 2018, Boris Moore
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
        '<span class="toggle">{^{:~tag.expanded ? "-" : "+"}}</span>' +
      '{{else}}' +
        '<span class="spacer">&bull;</span>' +
      '{{/if}}' +
      '{{>name}}' +
    '</li>' +
    '{{if folders}}' +
      '<li data-link="visible{:~tag.expanded}">' +
        '<ul>' +
          '{{for folders}}' +
            '{^{tree/}}' +
          '{{/for}}' +
        '</ul>' +
      '</li>' +
    '{{/if}}',

    //PROPERTIES
    expanded: false, // default to unexpanded

    //METHODS
    toggle: function() {
      $.observable(this).setProperty("expanded", !this.expanded);
    },
    dataBoundOnly: true
  }
});

})(this.jQuery);
