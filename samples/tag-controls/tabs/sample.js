"use strict";
var tabsTmpl = $.templates("#tabsTmpl");

tabsTmpl.link("#tabsView",
  {
    label2: "Inner Tab Label2",
    width: 290
  },
  {
    state: {
      outerSelect: 0,
      innerSelect: 1
    },
    toInt: function(index) {
      return +index;
    },
    toString: function(index) {
      return "" + index;
    }
  }
);