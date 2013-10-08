$.views.converters({
    strToInt: function (value) {
      return parseInt(value);
    }
  });

var team = {
  start: 2,
  end: 4,
  members: [
    {name: "Robert"},
    {name: "Sarah"},
    {name: "Xavier"},
    {name: "Adriana"}
  ]
},
cnt = 1;

$.templates("#teamTemplate").link("#team", team)
  .on("click", ".remove", function() {
    var view = $.view(this);
    $.observable(team.members).remove(view.index);
  })
  .on("click", "#add", function() {
    $.observable(team.members).insert(0, {name: "new" + cnt++})
  });