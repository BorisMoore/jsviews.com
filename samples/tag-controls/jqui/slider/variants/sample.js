$.views.converters({
  tonum: function(val) {
    return +val; // Convert string to number
  }
});

var pageTmpl = $.templates("#pageTmpl"),
  model = {
    size: 150
  };

pageTmpl.link("#page", model);