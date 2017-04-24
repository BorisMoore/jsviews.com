"use strict";
var pageTmpl = $.templates("#pageTmpl");

var model = {
    culture: "de-DE",
    amount: 1099.20
  };

pageTmpl.link("#page", model);
