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
      role: "Visiting member"
    }
  ]
};

$.templates({
  peopleTmpl: "#peopleTemplate"
});

var html = $.templates.peopleTmpl.render(data);
$("#people").html(html);