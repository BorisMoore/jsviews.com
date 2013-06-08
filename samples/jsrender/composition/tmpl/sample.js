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

$("#movieList").html(
  $("#movieTemplate").render(movies)
);
