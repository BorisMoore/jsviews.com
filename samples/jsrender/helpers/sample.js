"use strict";
$.views.tags({

  // Tag to reverse-sort an array
  sort: function(array) {
    var ret = "";
    if (this.tagCtx.props.reverse) {
      // Render in reverse order
      for (var i = array.length; i; i--) {
        ret += this.tagCtx.render(array[i - 1]);
      }
    } else {
      // Render in original order
      ret += this.tagCtx.render(array);
    }
    return ret;
  }

});

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
    [movies],
    // pass in helpers
    {
      reverseSort: reverse,
      format: myFormatFunction,
      buttonCaption: function(val) {
        if (val === 'sort') {
          return reverse ? "Sort increasing" : "Sort decreasing";
        }
        return upperCase ? "to lower" : "to upper";
      }
    }
  );

  $("#movieList").html(html);
}
renderList();
