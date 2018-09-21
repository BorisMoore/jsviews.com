"use strict";
var helpers = {

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
  },

  // Data formatter: ticks to Date
  numberToDate: {
    parse: function(date, props) {
      return +date;
    },
    format: function(ticks, props) {
      return new Date(ticks);
    }
  },

  // Converters
  toNumber: function(date, props) {
    return +date;
  },
  toDate: function(ticks, props) {
    return new Date(ticks);
  }
};

// Compiled page template
var pageTmpl = $.templates("#pageTmpl");

// Load the page:
var model = {
    culture: "de-DE",
    date: new Date()
  };

pageTmpl.link("#page", model, helpers);

// Alternatively, register helpers: 
//$.views.helpers(helpers);
//pageTmpl.link("#page", model);
