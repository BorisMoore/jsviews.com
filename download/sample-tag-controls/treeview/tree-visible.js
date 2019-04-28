/*! Sample JsViews tag control: {{tree}} control using visible{...} v1.0.2
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
      //If there are child items, show item, with a toggle button to expand/collapse children
      '<span data-link="{on ~tag.toggle} {:~tag.expanded ? \'-\' : \'+\'}" class="toggle"></span> {{>name}}' +
      //If expanded, show the child items
      '<ul data-link="visible{:~tag.expanded}">' +
        '{{for folders}}' +
          //Recursive {{tree}} call to display subtree
          '{{tree/}}' +
        '{{/for}}' +
      '</ul>' +
    '{{else}}' +
      //If no child items, show just the item
      '<span class="spacer">&bull;</span> {{>name}}' +
    '{{/if}}' +
  '</li>',

    //PROPERTIES
    expanded: false, // Default to unexpanded

    //METHODS
    toggle: function() {
      $.observable(this).setProperty("expanded", !this.expanded);
    }
  }
});

})(this.jQuery);
