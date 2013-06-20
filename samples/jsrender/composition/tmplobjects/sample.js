var movies = [
  {
    title: "Meet Joe Black",
    languages: [
      { name: "English" },
      { name: "French" }
    ],
    tmpl: "#columnTemplate"
  },
  {
    title: "Eyes Wide Shut",
    languages: [
      { name: "French" },
      { name: "Esperanto" },
      { name: "Spanish" }
    ],
    tmpl: "#rowTemplate"
  },
  {
    title: "The Inheritance",
    languages: [
      { name: "English" },
      { name: "German" }
    ],
    tmpl: "#columnTemplate"
  }
];

var movieTemplate = $.templates("#movieTemplate");

var nestedTemplates = {
  columnTemplate: $.templates("#columnTemplate"),
  rowTemplate: $.templates("#rowTemplate"),
  conditionalTemplate: $.templates("#conditionalTemplate")
};

var html = movieTemplate.render(movies, nestedTemplates);

$("#movieList").html(html);
