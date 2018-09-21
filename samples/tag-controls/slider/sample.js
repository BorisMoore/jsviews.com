"use strict";
var myTmpl = $.templates("#myTmpl"),
  data = {amount: 200};

myTmpl.link("#page", data);