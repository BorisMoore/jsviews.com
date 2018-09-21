"use strict";
var helpers = {
  // Data formatter for Date using moment.js: Date to wcfDate string
  wcfDate: {
    parse: function(wcfString, props) {
      return moment(wcfString, "/\\D\\at\\e(xZZ)/").toDate();
    },
    format: function(date, props) {
      return moment(date).format("/\\D\\at\\e(xZZ)/");
    }
  },

  // Data formatter for Date using moment.js:
  // Date to custom date/time string
  fullDate: {
    parse: function(dateTimeString, props) {
      return moment(dateTimeString, "YYYY-MM-DD@HH:mm").toDate();
    },
    format: function(date, props) {
      return moment(date).format("YYYY-MM-DD@HH:mm");
    }
  },

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
  },

  // Converters for shifting time
  add: function(data, props) {
    var dt = this.dataFormat.parse(data);
    dt.setMinutes(dt.getMinutes() + this.tagCtx.props.delay * 60);
    return this.dataFormat.format(dt);
  },
  subtract: function(data) {
    var dt = this.dataFormat.parse(data);
    dt.setMinutes(dt.getMinutes() - this.tagCtx.props.delay * 60);
    return this.dataFormat.format(dt);
  }
};

// Compiled page template
var pageTmpl = $.templates("#pageTmpl");

// Load the page:
var startDate = new Date();
var model = {
    culture: "en-US",
    delay: 25,
    date: startDate,
    dateNumber: +startDate,
    dateTimeString: moment(startDate).format("YYYY-MM-DD@HH:mm"),
    wcfString: moment(startDate).format("/\\D\\at\\e(xZZ)/")
  };

pageTmpl.link("#page", model, helpers);

// Alternatively, register helpers: 
//$.views.helpers(helpers);
//pageTmpl.link("#page", model);
