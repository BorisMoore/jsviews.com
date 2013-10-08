var data = {
  people: [
    {
      first:"Jeff",
      last: "Adams",
      role: "Marketing"
    },
    {
      first:"Eugenia",
      last: "Tyzak",
      role: "Visiting member"
    }
  ]
};

var peopleTmpl = $.templates("#peopleTemplate");

peopleTmpl.link("#people", data)
  .on("mouseover", ".person", function() {
    // Get the person object (the current data item on the view)
    var person = $.view(this).data;

    // Set the boolean property that we bind "visible" to:
    $.observable(person).setProperty("_show", true);
  })
  .on("mouseout", ".person", function() {
    var person = $.view(this).data;

    $.observable(person).setProperty("_show", false);
  });

$("#add").on("click", function() {
  $.observable(data.people).insert({
    first:"Amos",
    last: "Sanchez",
    role: "Support"
  });
});