"use strict";
var accountingCulture = {
  "de-DE": {symbol: "€", thousand: ".", decimal: ",", format: "%v %s"},
  "en-US": {symbol: "$", thousand: ",", decimal: "."}
};

var formatters = {

  // Currency formatter using accounting.js
  currency: {
    format: function(value, props) {
      return accounting.formatMoney(
        value,
        accountingCulture[props._culture]
      );
    },
    parse: function(value, props) {
      return accounting.unformat(
        value,
        accountingCulture[props._culture].decimal
      );
    }
  },

  // Number formatter using accounting.js
  number: {
    format: function(value, props) {
      return accounting.formatNumber(
        value,
        accountingCulture[props._culture]
      );
    },
    parse: function(value, props) {
      return accounting.unformat(
        value,
        accountingCulture[props._culture].decimal
      );
    }
  }
};

// Compiled page template
var pageTmpl = $.templates("#pageTmpl");

// Load the page:
var model = {
    culture: "de-DE",
    amount: 1099.25
  };

pageTmpl.link("#page", model, formatters);

// Alternatively, register formatters as helpers: 
//$.views.helpers(formatters);
//pageTmpl.link("#page", model);
