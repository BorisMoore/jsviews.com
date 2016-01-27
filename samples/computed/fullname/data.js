//====================== Data ======================
var person = {
  firstName: "Jeff",
  lastName: "Friedman",
  fullName: fullName // Computed fullName
};

// Parameterized computed observable
function fullName(reversed) {
  // We will declare dependencies (below) for any values that
  // may change observably, and are not passed in as parameters
  return reversed
    ? this.lastName + " " + this.firstName
    : this.firstName + " " + this.lastName;
}

// Declare dependencies, except for any values passed in as parameters
fullName.depends = "*"; // Listen to changes to ANY property of the object (person)

// Setter for fullName - for two-way binding
fullName.set = function(val) {
  val = val.split(" ");
  // Make observable change to dependent properties
  $.observable(this).setProperty({
    lastName: val.pop(),
    firstName: val.join(" ")
  });
};

var tmpl = $.templates("#personTmpl");
tmpl.link("#details", person);

//================ Observable property change ================
$("#changeName").on("click", function() {
  $.observable(person).setProperty({
    firstName: person.firstName + "x",
    lastName: person.lastName + "y"
  });
});
