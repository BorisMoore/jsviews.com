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
    { getter: "movies", type: "Movie", parentRef: "movieApp" }
  ],
  extend: {
    addMovie: function() {
      // Instantiate new movie with a movie.movieApp 'parentRef' property
      var newMovie = VMs.Movie("NewTitle" + counter, [], "movieApp", this);
      newMovie.addLanguage(),
      $.observable(this.movies()).insert(newMovie); // Insert the new movie
      this.select($.view(".movies tr:last").index); // Set selection on the added item
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
    { getter: "languages", type: "Language", parentRef: "movie" }
  ],
  extend: {
    addLanguage: function() {
      // Instantiate new language with a language.movie 'parentRef' property
      var newLanguage = VMs.Language("NewLanguage" + counter++, "movie", this);
      $.observable(this.languages()).insert(newLanguage); // Insert the new language
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
