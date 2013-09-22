$.views.converters({
  tonum: function(val) {
    return +val; // Convert string to number
  }
});

var myTmpl = $.templates("#myTmpl"),
  pageOptions = {
    noInvalidData: false,
  },
  model = {
    size: 150
  };

myTmpl.link("#page", model, {
  page: pageOptions
})
