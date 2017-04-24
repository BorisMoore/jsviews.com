"use strict";
$.views.converters({
  tonum: function(val) {
    return +val; // Convert string to number
  }
});

var pageTmpl = $.templates("#pageTmpl"),
  pageOptions = {
    monthsSpan: 2
  },
  model = {
    startDate: "",
    endDate: "",
    middleDate: ""
  };

pageTmpl.link("#page", model, {
  page: pageOptions
});
