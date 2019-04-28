"use strict";
var VMs = $.views.viewModels,
  counter = 0;

// Background color helper function
function bgColor(index) {
  return this.selectedIndex() === index
    ? "yellow"
    : (index%2 ? "#fdfdfe" : "#efeff2");
}

bgColor.depends = "selectedIndex()";

// Compile View Models
VMs({
  MovieApp: {
    getters: [
      "selectedIndex",
      { getter: "movies", type: "Movie" }
    ],
    extend: {
      addMovie: function() {
        $.observable(this.movies()).insert(VMs.Movie(
          "NewTitle" + counter,
          [VMs.Language("NewLanguage" + counter++)]
        ));
        // Set selection on the added item
        this.select($.view(".movies tr:last").index);
      },
      removeMovie: function(index) {
        this.select(); // unselect
        $.observable(this.movies()).remove(index);
        return false;
      },
      select: function(index) {
        if (this.selectedIndex() !== index) {
          this.selectedIndex(index);
        }
      },
      deleteLast: function() { // Example of action using View Model hierarchy
        var moviesCount = this.movies().length;
        if (moviesCount) {
          var lastMovie = this.movies()[moviesCount-1];
          var languagesCount = lastMovie.languages().length;
          if (languagesCount) {
            lastMovie.removeLanguage(languagesCount-1);
          }
        }
      },
      showData: function() { // Get the current data, and display in 'console'
        $("#console").append($("#showData").render(this.unmap()));
      },
      bgColor: bgColor // Helper for background color rendering
    }
  },
  Movie: {
    getters: [
      "title",
      { getter: "languages", type: "Language" }
    ],
    extend: {
      addLanguage: function() {
        $.observable(this.languages()).insert(VMs.Language("NewLanguage" + counter++));
      },
      removeLanguage: function(index) {
        $.observable(this.languages()).remove(index);
        return false;
      }
    }
  },
  Language: {
    getters: ["name"]
  }
});

// Initial data
var app = {
  selectedIndex: null,
  movies: [
    {
      title:"Meet Joe Black",
      languages: [
        {name: "English"},
        {name: "French"}
      ]
    },
    {
      title:"Eyes Wide Shut",
      languages: [
        {name: "German"},
        {name: "French"},
        {name: "Spanish"}
      ]
    }
  ]
};

// Instantiate View Models
var appVm = $.views.viewModels.MovieApp.map(app);

// Top level data-linking - bind content to View Models
$.link(true, ".linkedContent", appVm);
