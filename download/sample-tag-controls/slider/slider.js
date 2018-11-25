/*! Sample JsViews tag control: {{slider}} control v1.0.0
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
 * Copyright 2018, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
slider: {
  // Movable slider handle, within slider box
  setSize: true,
  mainElement: ".sliderbox",

  init: function(tagCtx) {
    var tag = this,
      content = tagCtx.tmpl.markup;

    // Define handler specific to this slider, to be used for end of drag
    this.mouseMoveOff = function() {
      $(document).off("mousemove touchmove");
    };

    if (tag.inline) {
      tag.template = content ? $.trim(content) : '<div class="sliderbox"><div class="handle"></div></div>';
    }
  },

  onBind: function(tagCtx) {
    var tag = this,
      min = tagCtx.props.min,
      max = tagCtx.props.max;
    tagCtx.handle = tagCtx.mainElem.find(".handle").first();

    // Register handler for mouse click or start of drag
    tagCtx.mainElem.on("mousedown touchstart", function(ev) {
      var newVal;
      function valFromPosition(newX) {
        newVal = clamp(
          round(min + (newX - tagCtx.metrics.left)/tagCtx.metrics.scale),
          min, max);
      }
      valFromPosition(ev.clientX);
      // User click in box: move handle to clicked position
      tag.moveTo(newVal);

      // Register handler for mousemove during drag
      $(document).on("mousemove touchmove", function(ev2) {
        valFromPosition(ev2.clientX);
        if (newVal !== tagCtx.val) {
          tagCtx.val = newVal;
          setTimeout(function() {
            // User mousemove - sliding handle: move handle to new position
            tag.moveTo(newVal);
          }, 0);
        }
        ev.preventDefault();
      });
      ev.preventDefault();
    });

    // Register slider-specific handler for end of drag
    $(document).on("mouseup touchend", this.mouseMoveOff);
  },

  onUnbind: function(tagCtx, linkCtx, ctx, ev, eventArgs) {
    // Remove handler for end of drag specific to this slider
    $(document).off("mouseup touchend", this.mouseMoveOff);
  },

  onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {
    if (!eventArgs) {
      // We set metrics here, after initial linking. This event is preceded by
      // 1) onBind event 2) setting of Width and height of mainElem
      this.setMetrics(tagCtx); 
    }
  },
  onUpdate: false,

  setValue: function(x) {
    // Move the handle to the new position x
    var tagCtx = this.tagCtx,
      min = tagCtx.props.min,
      max = tagCtx.props.max,
      metrics = tagCtx.metrics;
    x = clamp(x, min, max);
    tagCtx.handle.offset({left: (x-min)*metrics.scale + metrics.left - metrics.handleWidth});
  },

  moveTo: function(x) {
    // Call setValue() to move the handle to position x
    this.setValue(x);
    // Call updateValue() to change the external data-linked data to the new value x
    this.updateValue(x);
  },

  setMetrics: function(tagCtx) {
    var tagCtx = tagCtx || this.tagCtx,
      box = tagCtx.mainElem;
    tagCtx.metrics = {
      left: box.offset().left,
      width: box.width(),
      scale: box.width()/(tagCtx.props.max-tagCtx.props.min),
      handleWidth: tagCtx.handle.width()/2
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
