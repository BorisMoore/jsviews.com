"use strict";
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
  count = 0,
  pageOptions = {
    noInvalidData: false
  },
  model = {
    person: "Maria",
    people: [
      {name: "Jo"},
      {name: "Maria"},
      {name: "Xavier"}
    ]
  };

pageTmpl.link("#page", model, {
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
  })
  .on("click", "#add", function() {
    $.observable(model.people).insert({name: "new" + count++});
  })
  .on("click", ".remove", function() {
    var view = $.view(this);
    $.observable(model.people).remove(view.index);
    validation.validate();
  });
var validation = $.view("#validate").ctx.tag;
