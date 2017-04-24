"use strict";
$.datepicker.setDefaults("dateFormat", "mm/dd/yy"); // Set default date format for jQuery UI Datepicker

var pageTmpl = $.templates("#pageTmpl"),

  model = {
    date: new Date(),
    dateNumber: +new Date(),
    dateString: $.datepicker.formatDate("mm/dd/yy", new Date()),
    dateString2: $.datepicker.formatDate("mm-dd-yy", new Date())
  };

pageTmpl.link("#page", model);
