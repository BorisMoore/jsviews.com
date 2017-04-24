"use strict";
var pageTmpl = $.templates("#pageTmpl"),
  pageOptions = {
    inRangeOnly: true
  },
  model = {
    amount: 550,
    currency: "de-DE"
  };

pageTmpl.link("#page", model, {page: pageOptions});