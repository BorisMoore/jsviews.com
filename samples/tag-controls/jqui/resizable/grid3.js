var pageTmpl = $.templates("#pageTmpl"),
  scale = 0.75,
  model = {
    scale: scale,
    w1: 86,
    h1: 56
  };

$.views.converters({
  toNum: function(val) {
    // ConvertBack: If spinner text set to non-numeric value, return instead the minimum value
    return +val || this.widget.options.min;
  },
  rnd: function(val) {
    // Round to nearest integer
    return Math.round(val);
  },
  scale: function(val) {
    return scale*val;
  },
  reduce: function(w, h) {
    return [scale*w, scale*h];
  },
  increase: function(w, h) {
    return [w/scale, h/scale];
  },
  int: function(val){
    return val | 0; // Truncate float to int
  }
});

pageTmpl.link("#page", model);
