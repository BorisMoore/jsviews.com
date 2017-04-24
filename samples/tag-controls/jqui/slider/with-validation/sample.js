"use strict";
$.views.converters({
  tonum: function(val) {
    return +val; // Convert string to number
  }
});

var pageTmpl = $.templates("#pageTmpl"),
  pageOptions = {
    noInvalidData: false
  },
  model = {
    size: 150
  };

pageTmpl.link("#page", model, {
  page: pageOptions
})
