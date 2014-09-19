var data = {
  people: [
    {
      first:"Jeff",
      last: "Adams",
      isLead: true
    },
    {
      first:"Eugenia",
      last: "Tyzak"
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
    last: "Sanchez"
  });
});
