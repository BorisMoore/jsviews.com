"use strict";
var VMs = $.views.viewModels,
  counter = 0,

// Initial data
  app = {
    msg: null,
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

// Compile View Models
VMs({
  MovieApp: {
    getters: [
      "msg",
      "selectedIndex",
      {
        getter: "movies",
        type: "Movie"
      }
    ],
    extend: {
      undo: function() {
        this.merge(savedData); // Revert to previous savedData
        this.msg(null);
      },
      saveData: function() {
        // Save current data, for subsequent Undo behavior
        savedData = this.unmap();
        savedData.selectedIndex = null;
        savedData = JSON.stringify(savedData);

        // In real app, uncomment to save current data to the server:
        // $.post("/save/data", {movieData : savedData}, function(msg) {
          var msg = "In a real app, updated data would have been saved to server";
          this.msg(msg); // Display message
        //});
        return false; // Do not do default form action for submit
      },
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
      {
        getter: "languages",
        type: "Language"
      }
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

// Instantiate View Models
var appVm = $.views.viewModels.MovieApp.map(app);

// Background color helper function
function bgColor(index) {
  return this.selectedIndex() === index
    ? "yellow"
    : (index%2 ? "#fdfdfe" : "#efeff2");
}

bgColor.depends = ["#index", appVm, "selectedIndex"];

// Save copy of initial data, for Undo feature
var savedData = app;

// Top level data-linking - bind content to View Models
$.link(true, ".linkedContent", appVm);

// Detect changes - to enable Submit/Undo buttons, and warn on page navigation
$.observable(appVm.movies()).observeAll(function() {
  // If there have been any data changes, clear message and enable Submit and Undo buttons
  appVm.msg("");
});

// "Navigate away" behavior
$(window).on('beforeunload', function(){
  if (appVm.msg() === "") {
    return "You have unsaved changes.";
  }
});
