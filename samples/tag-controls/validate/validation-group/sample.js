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
    noInvalidData: false,
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
})
  .on("click", "#validate", function() {
    validation.validate();
  })
  .on("click", "#clear", function() {
    validation.clearMessage();
  })
  .on("click", "#refresh-outer", function() {
    validation.refresh();
  })
  .on("click", "#refresh", function() {
    validation.refreshValidates();
  });
  var validation = $.view("#validate").ctx.tag;
