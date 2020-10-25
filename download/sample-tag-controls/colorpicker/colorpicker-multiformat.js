/*! Sample JsViews tag control: {{picker}} control v1.0.8
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
 * Copyright 2019, Boris Moore
 * Released under the MIT License.
 */

(function($) {
"use strict";

$.views.tags({
picker: {
  // Bind to HSVA color parameters and mode. Color parameters will be HSVA, RGBA or HEX, depending on mode
  bindTo: [0, 1, 2, 3, "mode"],
  linkedCtxParam: ["h", "s", "v", "a", undefined],
  mainElement: "div",
  onBind: function() {
    // Provide reference vars to access component controls
    var tag = this,
      sliders = tag.childTags("slider");
    tag.hueslider = sliders[0];
    tag.alphaslider = sliders[1];
    tag.areaslider = tag.childTags("areaslider")[0];
    tag.currentHsvaColor = [];
  },
  setValue: function(val, i, tagElse) {
    this.currentHsvaColor[i] = val;
  },
  onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {
    if (!eventArgs) {
      // Update the UI width height and position metrics for each component control
      var tag = this;
      tag.hueslider.setMetrics();
      tag.alphaslider.setMetrics();
      tag.areaslider.setMetrics();
    }
  },
  convert: function(arg1, arg2, arg3, arg4, mode) {
    mode = mode || "hsva";
    var arg;
    switch (mode) {
      case "hsva":
        // This is our internal format, so return as is
        return [arg1, arg2, arg3, arg4, mode];
      case "rgba":
        // Convert from RGBA to our internal HSVA format
        arg = tinycolor({r: arg1, g: arg2, b: arg3, a: arg4}).toHsv();
        break;
      case "hex":
        // Convert from HEX to our internal HSVA format
        arg = tinycolor(arg1).toHsv();
        break;
    }
    return [arg.h, arg.s, arg.v, arg.a, mode];
  },
  convertBack: function() {
    var color, ret,
      args = $.extend([], this.currentHsvaColor, arguments),
      h = args[0], s = args[1], v = args[2], a = args[3], mode = args[4];

    switch (mode) {
      case "hsva":
        // External format is same as internal format, so return as is
        ret = [h, s, v, a];
        break;
      case "rgba":
        color = tinycolor({h: h, s: s, v: v, a: a});
        // Convert from internal HSVA format to RGBA external format
        color = color.toRgb();
        ret = [color.r, color.g, color.b, color.a];
        break;
      case "hex":
        // Convert from internal HSVA format to HEX external format
        color = tinycolor({h: h, s: s, v: v, a: a});
        ret = [color.toHex8String()];
    }
    ret.arg0 = false; // Return array for multiple bindTo targets, with arg0 false - to indicate
    // that this targets multiple args, not just the first one
    return ret;
  },
  template: {
    // The template markup
    markup:
      '<div class="popover">'
      + '{^{areaslider ~s ~v xMin=0 xMax=1 yMin=1 yMax=0 width="100%" convert=~cvt convertBack=~cbk}}'
        + '<div class="sliderbox sat fill" data-link="css-background-color{rgb:~h 100 100}">'
          + '<div class="val fill">'
            + '<div class="dragger" data-link="css-background-color{rgb:~h ~s ~v}"></div>'
          + '</div>'
        + '</div>'
      + '{{/areaslider}}'
      + '<span class="swatch">'
        + '<span class="swatch-inner" data-link="css-background-color{rgba:~h ~s ~v ~a}"></span>'
      + '</span>'
      + '{^{slider ~h min=360 max=0 class="hue"/}}'
      + '{^{slider ~a min=0 max=1}}'
        + '<div class="sliderbox alpha">'
          + '<div class="handle"></div>'
          + '<div class="alpha-background" data-link="css-background-image{rgbGrad:~h ~s ~v}"></div>'
        + '</div>'
      + '{{/slider}}'
      + '{^{spinblock}}'
        + '<div class="spinblock-text spinblock-hex">'
          + '<input class="spinblock-value" maxlength="20" data-link="{hex:~h ~s ~v ~a:fromhex}"/>'
          + '<div class="spinblock-label">HEX</div>'
        + '</div>'
      + '{{else}}'
        + '<div class="spinblock-text">'
          + '<input class="spinblock-value" maxlength="4" data-link="{r:~h ~s ~v:rtohsv}"/>'
          + '<input class="spinblock-value" maxlength="4" data-link="{g:~h ~s ~v:gtohsv}"/>'
          + '<input class="spinblock-value" maxlength="4" data-link="{b:~h ~s ~v:btohsv}"/>'
          + '<input class="spinblock-value" maxlength="4" data-link="~a"/>'
          + '<div class="spinblock-label">RGBA</div>'
        + '</div>'
      + '{{else}}'
        + '<div class="spinblock-text">'
          + '<input class="spinblock-value" maxlength="4" data-link="{rnd:~h:rnd}"/>'
          + '<input class="spinblock-value" maxlength="4" data-link="{shsl:~h ~s ~v ~a:stohsv}"/>'
          + '<input class="spinblock-value" maxlength="4" data-link="{lhsl:~h ~s ~v ~a:ltohsv}"/>'
          + '<input class="spinblock-value" maxlength="4" data-link="~a"/>'
          + '<div class="spinblock-label">HSLA</div>'
        + '</div>'
      + '{{/spinblock}}'
    + '</div>',

    // Color converters used within the template (defined as converters scoped to this template)
    converters : {
      rnd: function(val) { 
        return Math.round(val);
      },
      fromhex: function(hex) { 
        updateHslaValues(this, validateTiny(hex));
      },
      stohsv: function(s) { 
        if (/^[\d\.]{1,3}%$/.test(s)) {
          var hsl = currentColor(this).toHsl();
          hsl.s = s;
          updateHslaValues(this, validateTiny(hsl));
        }
      },
      ltohsv: function(l) { 
        if (/^[\d\.]{1,3}%$/.test(l)) {
          var hsl = currentColor(this).toHsl();
          hsl.l = l;
          updateHslaValues(this, validateTiny(hsl));
        }
      },
      rtohsv: function(r) { 
        if (/^\d{1,3}$/.test(r)) {
          var rgb = currentColor(this).toRgb();
          rgb.r = r;
          updateHslaValues(this, validateTiny(rgb));
        }
      },
      gtohsv: function(g) { 
        if (/^\d{1,3}$/.test(g)) {
          var rgb = currentColor(this).toRgb();
          rgb.g = g;
          updateHslaValues(this, validateTiny(rgb));
        }
      },
      btohsv: function(b) { 
        if (/^\d{1,3}$/.test(b)) {
          var rgb = currentColor(this).toRgb();
          rgb.b = b;
          updateHslaValues(this, validateTiny(rgb));
        }
      },
      lhsl: function(h, s, v, a) {
        return Math.round(color(h, s, v, a).toHsl().l*100) + "%";
      },
      shsl: function(h, s, v, a) {
        return Math.round(color(h, s, v, a).toHsl().s*100) + "%";
      },
      r: function(h, s, v, a) {
        return color(h, s, v, a).toRgb().r;
      },
      g: function(h, s, v, a) {
        return color(h, s, v, a).toRgb().g;
      },
      b: function(h, s, v, a) {
        return color(h, s, v, a).toRgb().b;
      },
      rgb: function(h, s, v, a) {
        return tinycolor({h: h, s: s, v: v}).toRgbString();
      },
      rgbGrad: function(h, s, v) {
        return "linear-gradient(to right, rgba(0, 0, 0, 0), " + tinycolor({h: h, s: s, v: v}).toRgbString() + ")";
      }
    }
  },
  onUpdate: false
}
});

$.views.converters({ // Global converters
  hex: function(h, s, v, a) {
    return (a < 1 ? color(h, s, v, a).toHex8String(true) : tinycolor({h: h, s: s, v: v}).toHexString(true));
  },
  rgba: function(h, s, v, a) { 
    return color(h, s, v, a).toRgbString();
  },
  rgbafromrgb: function(r, g, b, a) { 
    return tinycolor({r: r, g: g, b: b, a: a}).toRgbString();
  },
  hexfromrgb: function(r, g, b, a) {
    return (a < 1 ? tinycolor({r: r, g: g, b: b, a: a}).toHex8String(true) : tinycolor({r: r, g: g, b: b}).toHexString(true));
  },
  rgbafromhex: function(hex) { 
    return tinycolor(hex).toRgbString();
  }
});

// Utility functions

function round(val) {
  return Math.round(100*val)/100;
}

function clamp(num, min, max) {
  return min>max
    ? num <= max ? max : num >= min ? min : num
    : num <= min ? min : num >= max ? max : num;
}

function validateTiny(clr) {
  var tiny = tinycolor(clr);
  if (!tiny.isValid()) {
    return;
  }
  tiny = tiny.toHsv();
  return [round(tiny.h), round(tiny.s), round(tiny.v), round(tiny.a)];
}

function currentColor(tag) {
  return tinycolor({h: tag.ctxPrm("h"), s: tag.ctxPrm("s"), v:  tag.ctxPrm("v"), a: tag.ctxPrm("a")});
}

function color(h, s, v, a) {
  return tinycolor({h: h, s: s, v: v, a: a});
}

function updateHslaValues(tag, hsla) {
  if (hsla) {
    tag.ctx.parentTags.picker
      .setValues(hsla[0], hsla[1], hsla[2], hsla[3])
      .updateValues(hsla[0], hsla[1], hsla[2], hsla[3]);
  }
}

})(this.jQuery);
