"use strict";
// Use moment.js to format WCF date string
function wcfFormat(date) {
  return moment(date).format("/\\D\\at\\e(xZZ)/");
}

// Use moment.js to parse WCF date string
function wcfParse(wcfString) {
  return moment(wcfString, "/\\D\\at\\e(xZZ)/").toDate();
}

// Converters between data formats:
// WCF date string format to jQuery UI date format
function fromWcfToJqui(wcfDate) {
  return $.datepicker.formatDate(
    this.dateFormat, wcfParse(wcfDate)
  );
}
// jQuery UI date format to WCF date string format
function fromJquiToWcf(dateString) {
  return wcfFormat(
    $.datepicker.parseDate(this.dateFormat, dateString)
  );
}

// Converters for shifting date
function addDays(val) {
  var dt = this.dataFormat.parse(val);
  dt.setDate(dt.getDate() + this.tagCtx.props.daysToAdd);
  return this.dataFormat.format(dt);
}

function removeDays(val) {
  var dt = this.dataFormat.parse(val);
  dt.setDate(dt.getDate() - this.tagCtx.props.daysToAdd);
  return this.dataFormat.format(dt);
}

// DateFormatter using WCF date string format
var wcfDateFormatter = {
  parse: wcfParse,
  format: wcfFormat
};

// Hash of helpers
var helpers = {
  wcfDate: wcfDateFormatter,
  wcfToJqui: fromWcfToJqui,
  jquiToWcf: fromJquiToWcf,
  addDays: addDays,
  removeDays: removeDays
}

// Custom datepicker tags
$.views.tags({
  myDatepicker: {
    baseTag: "datepicker",
    dataFormat: false, // Any falsy value
    dateFormat: "DD MM d, yy"
  },
  myWcfDatepicker: {
    baseTag: "datepicker",
    dataFormat: wcfDateFormatter,
    dateFormat: 'm-d-yy'
  },
  myWcfDatepicker2: {
    baseTag: "datepicker",
    convert: fromWcfToJqui,
    convertBack: fromJquiToWcf,
    dateFormat: 'm-d-yy'
    }
  }
);

// Compiled page template
var pageTmpl = $.templates("#pageTmpl");

// Load the page:
var model = {
    delay: 30,
    date: new Date(),
    dateNumber: +new Date(),
    dateString: $.datepicker.formatDate("mm-dd-yy", new Date()),
    wcfString: wcfFormat()
  };

pageTmpl.link("#page", model, helpers);

// Alternatively, register helpers: 
//$.views.helpers(helpers);
//pageTmpl.link("#page", model);
