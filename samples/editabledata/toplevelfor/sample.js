var counter = 0,
  movies = [
    {
      title:"Meet Joe Black",
      languages: [
        { name: "English" },
        { name: "French" }
      ]
    },
    {
      title:"Eyes Wide Shut",
      languages: [
        { name: "German" },
        { name: "French" },
        { name: "Spanish" }
      ]
    }
  ],
  app = {
    selectedIndex: null,
    movies: movies,
    select: function select(index) {
      if (this.selectedIndex !== index) {
        $.observable(this)
          .setProperty("selectedIndex", index);
      }
    }
  };

$.templates({
  movieTmpl: {
    markup: "#movieTemplate",
    helpers: {
      bgColor: bgColor,
    },
    templates: {
      languageName: "<div data-link=\"name\"></div>"
    }
  }
});

function bgColor() {
  return app.selectedIndex === this.index
      ? "yellow"
      : (this.index%2 ? "#fdfdfe" : "#efeff2");
}
bgColor.depends = [app, "selectedIndex"];

$.link(true, "#linkedContent", app)
  .on("click", ".addMovie", function() {
    $.observable(movies).insert(movies.length, {
      title: "NewTitle" + counter ,
      languages: [
        { name: "NewLanguage" + counter++ }
      ]}
    );
    // Set selection on the added item
    app.select($.view(".movies tr:last").index);
  })

  .on("click", ".movies tr", function() {
    app.select($.view(this).index);
  })

  .on("click", ".removeMovie", function() {
    app.select();
    $.observable(movies).remove($.view(this).index, 1);
    return false;
  })

  .on("click", ".addLanguage", function() {
    var languages = $.view(this).data.languages;
    $.observable(languages).insert(languages.length, {
      name: "NewLanguage" + counter++
    });
  })

  .on("click", ".removeLanguage", function() {
    var view = $.view(this);
    $.observable(view.parent.data).remove(view.index, 1);
    return false;
  });

$("#deletelast").on("click", function() {
  if (movies.length) {
    var languages = movies[ movies.length - 1 ].languages;
    $.observable(languages).remove(languages.length - 1, 1);
  }
});

$("#showdata").on("click", function() {
  $("#console").append("<hr/>");
  $("#console").append($("#showData").render(movies));
});
