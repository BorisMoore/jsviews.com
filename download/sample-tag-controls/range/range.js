/*
 * Sample JsViews tag control: {{range}} control
 * http://www.jsviews.com/download/sample-tag-controls/range/range.js
 * Used in sample:
 * http://www.jsviews.com/#samples/tag-controls/range
 * Copyright 2013, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
  range: $.extend(true, {}, $.views.tags["for"], {
    render: function(val) {
      var start = this.tagCtx.props.start || 0,
        end = this.tagCtx.props.end;

      if (start || end) {
        if (val === undefined) {
          val = [];
          end = end || 0;
          for (var i = start; i <= end; i++) {
            val.push(i);
          }
        } else if ($.isArray(val)) {
          val = val.slice(start, end);
        }
      }
      return $.views.tags["for"].render.apply(this, val ? [val] : arguments);
    },
    onArrayChange: function(ev, eventArgs) {
      this.refresh();
    }
  })
});

})(this.jQuery);
