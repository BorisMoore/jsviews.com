"use strict";
var formatters = {

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
