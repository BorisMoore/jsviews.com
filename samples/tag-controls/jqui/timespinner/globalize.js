"use strict";
var pageTmpl = $.templates("#pageTmpl");

var model = {
    culture: "en-US",
    date: new Date()
  };

pageTmpl.link("#page", model);