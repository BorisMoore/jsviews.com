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

peopleTmpl.link("#people", data)
  .on("mouseover", ".person", function() {
    // Get the view for this person (the one we moused over...)
    $.view(this)
      // Find the element with class "details" within this view
      .contents(true, ".details")
      // Make it visible
      .show();
  })
  .on("mouseout", ".person", function() {
    $.view(this)
      .contents(true, ".details")
      .hide();
  });

$("#add").on("click", function() {
  $.observable(data.people).insert({
    first:"Amos",
    last: "Sanchez",
    role: "Support"
  });
});