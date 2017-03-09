var pageTmpl = $.templates("#pageTmpl"),
  model = {
    w1: 116,
    h1: 90
  },
  helpers = {
    toNum: function(val) {
      // ConvertBack: If spinner text set to non-numeric value, return instead the minimum value
      return +val || this.widget.options.min;
    },
    rnd: function(val) {
      // Round to nearest integer
      return Math.round(val);
    }
  };

pageTmpl.link("#page", model, helpers);
