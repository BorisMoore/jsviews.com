var people = [
  {
    firstName: "Jeff",
    lastName: "Friedman"
  },
  {
    firstName: "Henrietta",
    lastName: "Hawks"
  }
];

// Parameterized computed observable - passed in as a helper
function fullName(reverse) {
  // We will declare dependencies (below) for any values that
  // may change observably, and are not passed in as parameters

  // 'this' for a helper is the view object - and view.data gives
  // us the appropriate instance of 'person' in the people array
  var view = this, person = view.data;
  return reverse
    ? person.lastName + " " + person.firstName
    : person.firstName + " " + person.lastName;
}

fullName.depends = "*"; // Listen to changes to ANY property of the object (person)

// Setter for fullName - for two-way binding
fullName.set = function(val) {
  // 'this' for the setter on a helper is the view object - and view.data
  // gives us the appropriate instance of 'person' in the people array
  var view = this, person = view.data;
  val = val.split(" ");
  // Make observable change to dependent properties
  $.observable(person).setProperty({
    lastName: val.pop(),
    firstName: val.join(" ")
  });
};

var tmpl = $.templates("#personTmpl");

// Pass in computed observable fullName as a helper
tmpl.link("#details", people, {fullName: fullName});

//================ Observable property change ================
$("#changeName").on("click", function() {
  $.observable(person).setProperty({
    firstName: person.firstName + "x",
    lastName: person.lastName + "y"
  });
});
