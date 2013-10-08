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
  count = 0,
  model = {
    person: "Mary",
    people: [
      {name: "Jo"},
      {name: "Mary"},
      {name: "Xavier"}
    ]
  };

myTmpl.link("#page", model, {
  upper: $.views.converters.upper,
  lower: $.views.converters.lower
})
  .on("click", "#add", function() {
    $.observable(model.people).insert({name: "new" + count++});
  })
  .on("click", ".remove", function() {
    var view = $.view(this);
    $.observable(model.people).remove(view.index);
  });
