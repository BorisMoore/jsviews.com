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

var pageTmpl = $.templates("#pageTmpl"),
  pageOptions = {
    noInvalidData: false
  },
  model = {
    agree: false,
    person: "Jo",
    people: [
      {name: "Jo"},
      {name: "Mary"},
      {name: "Xavier"}
    ]
  };

pageTmpl.link("#page", model, {
  page: pageOptions,
  upper: $.views.converters.upper,
  lower: $.views.converters.lower
});
