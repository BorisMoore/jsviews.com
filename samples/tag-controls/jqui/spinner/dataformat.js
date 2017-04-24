"use strict";
var helpers = {

  // Time formatter using moment.js
  time: {
    parse: function(value, props) {
      var format = props._culture === "en-US" ? "h:mm A" : "HH:mm";
      return moment(value, format).toDate();
    },
    format: function(value, props) {
      var format = props._culture === "en-US" ? "h:mm A" : "HH:mm";
      return moment(value).format(format);
    }
  },

  // Date to number formatter
  dateToNumber: {
    parse: function(value, props) {
      return +value;
    },
    format: function(value, props) {
      return new Date(value);
    }
  },

  // Converters
  toNumber: function(value, props) {
    return +value;
  },
  toDate: function(value, props) {
    return new Date(value);
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
