/*
 * Sample JsViews tag control: {{tree}} control using {^{if}} binding
 * http://www.jsviews.com/download/sample-tag-controls/treeview/tree-if.js
 * Used in samples: http://www.jsviews.com/#samples/tag-controls/tree/if-binding
 * Copyright 2016, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  tree: {
    render: function(val) {
      this.data = val;
    },
    onAfterLink: function() {
      var self = this;
      self.contents("li").first()
        .on("click", ".toggle", function() {
          self.toggle();
        });
    },
    template: "#treeTemplate", // See http://www.jsviews.com/#samples/tag-controls/tree/if-binding

    //METHODS
    toggle: function() {
      $.observable(this.data).setProperty("expanded", !this.data.expanded);
    },
    dataBoundOnly: true
  }
});

})(this.jQuery);
