"use strict";
var formatters = {

  // Display formatter for timestamp (ticks) using moment.js:
  // ticks to time string
  time: {
    parse: function(string, props) {
      var format = props._culture === "en-US" ? "h:mm A" : "HH:mm";
      return +moment(string, format).toDate();
    },
    format: function(ticks, props) {
      var format = props._culture === "en-US" ? "h:mm A" : "HH:mm";
      return moment(ticks).format(format);
    }
  }

};

// Compiled page template
var pageTmpl = $.templates("#pageTmpl");

// Load the page:
var model = {
    culture: "de-DE",
    dateNumber: +new Date()
  };

pageTmpl.link("#page", model, formatters);

// Alternatively, register formatters as helpers: 
//$.views.helpers(formatters);
//pageTmpl.link("#page", model);
