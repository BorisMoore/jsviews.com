"use strict";
$.views.tags({

  // Tag with a render method to return HTML content,
  // including data, and the rendered inline content
  fntag: function() {
    return "Title:<br/><b>" +
      this.tagCtx.render() +
      "</b><br/>" +
      this.tagCtx.view.data.languages.length +
      "&nbsp;languages.";
  },

  // Tag with no render method. Just a template to
  // render HTML content including data, and the
  // rendered inline content.
  tmpltag: {
    template: "Title:<br/><b>" +
      "{{include tmpl=#content/}}" + // render the block content 
      "</b><br/>{{:languages.length}}&nbsp;languages."
  },

  // Tag with render method to reverse-sort an array
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

var movies = [
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

$("#movieList").html(
  $("#movieTemplate").render(movies)
);
