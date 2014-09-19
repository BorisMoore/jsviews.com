$.views.converters({
  upper:function(val) {
    val = "" + val;
    return val && val.toUpperCase();
  },
  lower:function(val) {
    val = "" + val;
    return val && val.toLowerCase();
  }
});

var myTmpl = $.templates("#myTmpl"),
  pageOptions = {
    noInvalidData: false
  },
  model = {
    agree: false,
    name: "Jo",
    names: [
      {name: "Jo"},
      {name: "Mary"},
      {name: "Xavier"}
    ]
  };

myTmpl.link("#page", model, {
  page: pageOptions,
  upper: $.views.converters.upper,
  lower: $.views.converters.lower
});
