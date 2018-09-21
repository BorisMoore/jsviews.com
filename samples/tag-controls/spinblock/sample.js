"use strict";
var tabsTmpl = $.templates("#tabsTmpl");

tabsTmpl.link("#tabsView",
  {
    label: "Inner Label"
  },
  {
    state: {
      outerSelect: 0,
      innerSelect: 0
    },
    toInt: function(index) {
      return +index;
    },
    toString: function(index) {
      return "" + index;
    }
  }
);