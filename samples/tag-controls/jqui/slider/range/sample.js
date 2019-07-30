"use strict";

  var data = {
      people: [
        {name: "Jo", age: 40},
        {name: "Bill", age: 24},
        {name: "Xavier", age: 50},
        {name: "Maria", age: 102},
        {name: "Scott", age: 17},
        {name: "Arabella", age: 65},
        {name: "Judy", age: 4}
      ],
      minAge: 20,
      maxAge: 60
  },
  helpers = {
    flt: function(item, index, items) { // Filter people based on age
      return item.age > data.minAge && item.age < data.maxAge;
    },
    fltDeps: ["minAge", "maxAge"] // Use this to make {^{people ... depends=~fltDeps ...}} update when minAge or maxAge changes
  };
  
var pageTmpl = $.templates("#pageTmpl");

pageTmpl.link("#page", data, helpers);