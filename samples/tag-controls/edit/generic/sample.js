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
  model = {
    agree: false,
    person: "Jo",
    person2: "Name2"
  };

myTmpl.link("#page", model, {
  upper: $.views.converters.upper,
  lower: $.views.converters.lower
});
