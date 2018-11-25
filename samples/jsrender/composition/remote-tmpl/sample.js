"use strict";
function lazyGetTemplate(name) {
  // If the named remote template is not yet loaded and compiled
  // as a named template, fetch it. In either case, return a promise
  // (already resolved, if the template has already been loaded)
  var deferred = $.Deferred();
  if ($.templates[name]) {
    deferred.resolve();
  } else {
    $.getScript(
      "https://www.jsviews.com/samples/resources/templates/"
              + name + ".js")
      .then(function() {
        if ($.templates[name]) {
          deferred.resolve();
        } else {
          alert("Script: \"" + name + ".js\" failed to load");
          deferred.reject();
        }
      });
  }
  return deferred.promise();
}

function showPeople(people) {
  $.when(

    lazyGetTemplate("people"),
// '<div>{{:name}} lives in {{for address tmpl="address" /}}</div>'
// fetched from www.jsviews.com/samples/resources/templates/people.js

    lazyGetTemplate("address")
// Template: '<b>{{>city}}</b>'
// fetched from www.jsviews.com/samples/resources/templates/address.js

  )
    .done(function() {
      // Render once all templates for template composition are loaded
      var html = $.templates.people.render(people);
      $("#peopleList").html(html);
    });
}

var people1 = [
    {
      "name": "Pete", "address": { "city": "Seattle" }
    },
    {
      "name": "Heidi", "address": { "city": "Sidney" }
    }
  ],

  people2 = [
    {
      "name": "Adriana", "address": { "city": "Dubai" }
    },
    {
      "name": "Robert", "address": { "city": "London" }
    }
  ];

$("#show1").on("click", function() {
  showPeople(people1);
});

$("#show2").on("click", function() {
  showPeople(people2);
});
