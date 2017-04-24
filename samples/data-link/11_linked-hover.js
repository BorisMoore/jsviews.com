"use strict";
var data = {
  people: [
    {
      first:"Jeff",
      last: "Adams",
      role: "Marketing"
    },
    {
      first:"Eugenia",
      last: "Tyzak",
      role: "Visiting member"
    }
  ]
};

var peopleTmpl = $.templates("#peopleTemplate");

$.views.converters({
    over: function(id) {
      return "$('#role_" + id + "').show();"
    },
    out: function(id) {
      return "$('#role_" + id + "').hide();"
    }
  }, peopleTmpl);


peopleTmpl.link("#people", data);

$("#add").on("click", function() {
  $.observable(data.people).insert({
    first:"Amos",
    last: "Sanchez",
    role: "Support"
  });
});