"use strict";
var formatters = {

  // Display formatter for Date using moment.js:
  // Date to time string
  time: {
    parse: function(timeString, props) {
      var format = props._culture === "en-US" ? "h:mm A" : "HH:mm";
      return moment(timeString, format).toDate();
    },
    format: function(date, props) {
      var format = props._culture === "en-US" ? "h:mm A" : "HH:mm";
      return moment(date).format(format);
    }
  }

};

// Compiled page template
var pageTmpl = $.templates("#pageTmpl");

// Load the page:
var model = {
    culture: "en-US",
    date: new Date()
  };

pageTmpl.link("#page", model, formatters);

// Alternatively, register formatters as helpers: 
//$.views.helpers(formatters);
//pageTmpl.link("#page", model);
