/*
 * Sample JsViews tag control: {{tree}} control using visible{...} binding
 * http://www.jsviews.com/download/sample-tag-controls/treeview/tree-visible.js
 * Used in samples: http://www.jsviews.com/#samples/tag-controls/tree/visible-binding
 * Copyright 2014, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  tree: {
    onAfterLink: function() {
      var self = this;
      self.contents("li").first()
        .on("click", ".toggle", function() {
          self.toggle();
        })
        .on("click", ".selectable", function() {
          self.select();
        });
    },
    template: "#treeTemplate", // See http://www.jsviews.com/#samples/tag-controls/tree/visible-binding

    //PROPERTIES
    expanded: false, // default to unexpanded

    //METHODS
    toggle: function() {
      $.observable(this).setProperty("expanded", !this.expanded);
    },
    select: function() {
      $.observable(this).setProperty("selected", !this.selected);
    },
    dataBoundOnly: true,
    autoBind: true
  }
});

})(this.jQuery);
