"use strict";
var myTmpl = $.templates("#myTmpl"),
  data = {x: 30, y: 10};

myTmpl.link("#page", data);