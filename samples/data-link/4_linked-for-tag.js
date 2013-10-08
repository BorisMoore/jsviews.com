var data = {
  people: [
    {
      first:"Jeff",
      last: "Adams",
      role: "Marketing (Lead)"
    },
    {
      first:"Eugenia",
      last: "Tyzak",
      role: "Visiting member",
    }
  ]
};

$.templates({
  peopleTmpl: "#peopleTemplate"
});

$.templates.peopleTmpl.link("#people", data);

$("#add").on("click", function() {
  $.observable(data.people).insert({
    first:"Amos",
    last: "Sanchez",
    role: "Support"
  });
});
