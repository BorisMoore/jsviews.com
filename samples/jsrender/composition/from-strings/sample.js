$.templates({
  people: '<div>{{:name}} lives in {{for address tmpl="address" /}}</div>',
  address: '<b>{{>city}}</b>'
});

function showPeople(people) {
  var html = $.templates.people.render(people);
  $("#peopleList").html(html);
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
