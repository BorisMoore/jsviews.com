"use strict";
var accountingCulture = {
  "de-DE": {symbol: "€", thousand: ".", decimal: ",", format: "%v %s"},
  "en-US": {symbol: "$", thousand: ",", decimal: "."}
};

var formatters = {

  // Display formatter for currency, using accounting.js:
  // amount (number) to currency string
  currency: {
    parse: function(string, props) {
      return accounting.unformat(
        string,
        accountingCulture[props._culture].decimal
      );
    },
    format: function(amount, props) {
      return accounting.formatMoney(
        amount,
        accountingCulture[props._culture]
      );
    }
  },

  // Display formatter for numbers, using accounting.js:
  //amount (number) to string
  number: {
    parse: function(string, props) {
      return accounting.unformat(
        string,
        accountingCulture[props._culture].decimal
      );
    },
    format: function(number, props) {
      return accounting.formatNumber(
        number,
        accountingCulture[props._culture]
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
