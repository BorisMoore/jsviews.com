"use strict";
var counter = 0,
  movies = { // Hash/dictionary of movies
    movJb: {
      title:"Meet Joe Black",
      languages: [
        {name: "English"},
        {name: "French"}
      ]
    },
    movEws: {
      title:"Eyes Wide Shut",
      languages: [
        {name: "German"},
        {name: "French"},
        {name: "Spanish"}
      ]
    }
  },

  helpers = {
//  selectedKey: "movEws", // Optionally set initial selection
    bgColor: function() {
      return this.ctxPrm("selectedKey")===this.data.key
        ? "yellow"
        : (this.index%2 ? "#fdfdfe" : "#efeff2");
    },
    select: function select(key, ev, eventArgs) {
      eventArgs.view.ctxPrm("selectedKey", key);
    },
    addMovie: function(ev, eventArgs) {
      var newKey = "mov" + counter;
      $.observable(movies).setProperty(
        newKey,
        {
          title: "NewTitle" + counter,
          languages: [
            {name: "NewLanguage" + counter++}
          ]
        }
      );
      eventArgs.view.ctxPrm("selectedKey", newKey);
    },
    removeMovie: function(key, ev, eventArgs) {
      eventArgs.view.ctxPrm("selectedKey", null);
      $.observable(movies).removeProperty(key);
      return false;
    },
    addLanguage: function(languages) {
      $.observable(languages).insert({
        name: "NewLanguage" + counter++
      });
    },
    removeLanguage: function(languages, index) {
      $.observable(languages).remove(index);
      return false;
    },
    deleteLast: function() {
      var propsArray = $.view("#movieList").get(true, "array").data;
      if (propsArray.length) {
        var lastMovie = propsArray[propsArray.length - 1].prop;
        $.observable(lastMovie.languages).remove();
      }
    },
    showData: function() {
      $("#console").append("<hr/>" + $("#showData").render(movies));
    }
  },

  movieTmpl = $.templates("#movieTemplate");

// Set dependency on bgColor, to update on collection (deletion) and selection changes
helpers.bgColor.depends = ["#index", "~selectedKey"];

// Render movies
movieTmpl.link("#movieList", movies, helpers);

// Data-link top-level buttons
$.link(true, ".buttons", helpers);
