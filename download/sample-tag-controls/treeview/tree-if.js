/*! Sample JsViews tag control: {{tree}} control using {^{if}} binding v1.0.2
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
 * Copyright 2019, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  tree: {
    template: '<li>' +
    '{{if folders && folders.length}}' +
      // If there are child items, show item, with a toggle button to expand/collapse children
      '<span data-link="{on ~tag.toggle} {:expanded ? \'-\' : \'+\'}" class="toggle"></span> {{>name}}' +
      '{^{if expanded}}' +
        // If expanded, show the child items
        '<ul>' +
          '{{for folders}}' +
            // Recursive {{tree}} call to display subtree
            '{{tree/}}' +
          '{{/for}}' +
        '</ul>' +
      '{{/if}}' +
    '{{else}}' +
      // If no child items, show just the item
      '<span class="spacer">&bull;</span> {{>name}}' +
    '{{/if}}' +
    '</li>',

    //METHODS
    toggle: function() {
      var data = this.tagCtx.view.data;
      $.observable(data).setProperty("expanded", !data.expanded);
    }
  }
});

})(this.jQuery);
