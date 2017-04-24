"use strict";
$.datepicker.setDefaults("dateFormat", "mm/dd/yy"); // Set default date format for jQuery UI Datepicker

$.views.converters({
  tonum: function(val) {
    return +val; // Convert string to number
  }
});

var pageTmpl = $.templates("#pageTmpl"),
  pageOptions = {
    monthsSpan: 2
  },
  today = new Date(),
  model = {
    startDate: $.datepicker.formatDate("mm/dd/yy", today),
    endDate: $.datepicker.formatDate("mm/dd/yy", new Date(today.getTime() + 31*24*60*60*1000)),
    middleDate: ""
  };

pageTmpl.link("#page", model, {
  page: pageOptions
});