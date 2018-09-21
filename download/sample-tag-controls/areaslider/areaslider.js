/*! Sample JsViews tag control: {{areaslider}} control v0.9.91 (Beta)
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
 * Copyright 2018, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
areaslider: {
  // Movable 'dragger', within box
  bindTo: [0, 1],
  setSize: true,
  mainElement: ".sliderbox",

  init: function(tagCtx) {
    var tag = this,
      content = tagCtx.tmpl.markup;

    // Define handler specific to this areaslider, to be used for end of drag
    tag.mouseMoveOff = function() {
      $(document).off("mousemove touchmove");
    };

    if (tag.inline) {
      tag.template = content ? $.trim(content) : '<div class="sliderbox"><div class="dragger"></div></div>';
    }
  },

  onBind: function(tagCtx) {
    var tag = this,
      xMin = tagCtx.props.xMin,
      xMax = tagCtx.props.xMax,
      yMin = tagCtx.props.yMin,
      yMax = tagCtx.props.yMax;
    tagCtx.handle = tagCtx.mainElem.find(".dragger").first();

    // Register handler for mouse click or start of drag
    tagCtx.mainElem.on("mousedown touchstart", function(ev) {
      var newXVal, newYVal;
      function valFromPosition(newX, newY) {
        newXVal = clamp(
          round(xMin + (newX - tagCtx.metrics.left)/tagCtx.metrics.xScale),
          xMin, xMax);
        newYVal = clamp(
          round(yMin + (newY - tagCtx.metrics.top)/tagCtx.metrics.yScale),
          yMin, yMax);
      }
      valFromPosition(ev.clientX, ev.clientY);
      // User click in box: move dragger to clicked position
      tag.moveTo(newXVal, newYVal);

      // Register handler for mousemove during drag
      $(document).on("mousemove touchmove", function(ev2) {
        valFromPosition(ev2.clientX, ev2.clientY);
        if (newXVal !== tagCtx.xVal || newYVal !== tagCtx.yVal) {
          tagCtx.xVal = newXVal;
          tagCtx.yVal = newYVal;
          setTimeout(function() {
            // User mousemove - sliding dragger: move dragger to new position
            tag.moveTo(newXVal, newYVal);
          }, 0);
        }
        ev.preventDefault();
      });
      ev.preventDefault();
    });

    // Register areaslider-specific handler for end of drag
    $(document).on("mouseup touchend", this.mouseMoveOff);
  },

  onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {
    if (!eventArgs) {
      // We set metrics here, after initial linking. This event is preceded by
      // 1) onBind event 2) setting of Width and height of mainElem
      this.setMetrics(tagCtx);
    }
  },
  onUpdate: false,

  setValue: function(val, index) {
    // Move the dragger to the new x-position or y-position
    var tagCtx = this.tagCtx,
      xMin = tagCtx.props.xMin,
      xMax = tagCtx.props.xMax,
      yMin = tagCtx.props.yMin,
      yMax = tagCtx.props.yMax,
      metrics = tagCtx.metrics;
    if (index) { // Change in y-position
      val = clamp(val, yMin, yMax);
      tagCtx.handle.offset({top: (val-yMin)*metrics.yScale + metrics.top - metrics.handleHeight});
    } else { // Change in x-position
      val = clamp(val, xMin, xMax);
      tagCtx.handle.offset({left: (val-xMin)*metrics.xScale + metrics.left - metrics.handleWidth});
    }
  },

  moveTo: function(x, y) {
    // Call setValues() to move the dragger to new (x, y) position
    this.setValues(x, y);
    // Call updateValues() to change the external data-linked data to the new values (x, y)
    this.updateValues(x, y);
  },

  setMetrics: function(tagCtx) {
    var tagCtx = tagCtx || this.tagCtx,
      box = tagCtx.mainElem,
      boxOffset = box.offset();
    tagCtx.metrics = {
      left: boxOffset.left,
      top: boxOffset.top,
      xScale: box.width()/(tagCtx.props.xMax - tagCtx.props.xMin),
      yScale: box.height()/(tagCtx.props.yMax - tagCtx.props.yMin),
      handleWidth: tagCtx.handle.width()/2,
      handleHeight: tagCtx.handle.height()/2
    };
  }
}
});

function round(val) {
  return Math.round(100*val)/100;
}

function clamp(num, min, max) {
  return min>max
    ? num <= max ? max : num >= min ? min : num
    : num <= min ? min : num >= max ? max : num;
}

})(this.jQuery);
