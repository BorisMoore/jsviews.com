"use strict";
var reverse = false,
  upperCase = false,
  movies = [
    {
      title: "Meet Joe Black",
      languages: [
        {name: "English"},
        {name: "French"}
      ]
    },
    {
      title: "Eyes Wide Shut",
      languages: [
        {name: "French"},
        {name: "German"},
        {name: "Spanish"}
      ]
    }
  ];

function myFormatFunction(value) {
  return upperCase ? value.toUpperCase() : value.toLowerCase();
}

$("#movieList")
  .on("click", "#sortBtn", function() {
    reverse = !reverse;
    renderList();
  })
  .on("click", "#formatBtn", function() {
    upperCase = !upperCase;
    renderList();
  });

function renderList() {
  var html = $("#movieTemplate").render(
    // Wrap movies array in an array, to render as a layout with header and footer
    movies,
    // pass in helpers
    {
      reverse: reverse,
      format: myFormatFunction,
      buttonCaption: function(val) {
        if (val === 'direction') {
          return reverse ? "increasing" : "decreasing";
        }
        return upperCase ? "to lower" : "to upper";
      }
    },
    true // noIteration
  );

  $("#movieList").html(html);
}
renderList();
