"use strict";
// Compile template
var tmpl = $.templates("#teamTmpl");

// Custom function for Person.isManager get/set property
function myIsManager(val) {
  if (!arguments.length) {       // If there is no argument, use as a getter
    return this === this.team.manager(); // true if this member is the manager
  }
  if (val) {                     // Setting this.isManager(true)
    this.team.manager(this);     // So make this team member manager
  } else if (this.isManager()) { // Setting this.isManager(false) and this team member is currently manager
    this.team.manager(null);     // So set team manager to null
  }
}

// Specify that the same function is a setter - for two-way data-linking
myIsManager.set = true;

// Specify dependency: if team.manager() changes, manager.isManger() should update
myIsManager.depends = "team.manager()";

// Compile View Models
$.views.viewModels({
  Team: {
    getters: [
      { getter: "manager", type: "Person" },
      { getter: "members", type: "Person", parentRef: "team" }
    ],
    extend: {
      setManager: function(index) {
        if (arguments.length === 3) {
          this.members()[index].isManager(true);
        } else if (team.manager()) {
          this.manager().isManager(false);
        }
      }
    }
  },
  Person: {
    getters: [
      "name",
      { getter: "address", type: "Address" }
    ],
    extend: { isManager: myIsManager } // use custom function
  },
  Address: {
    getters: ["street", "ZIP"]
  }
});

// Initial data
var teamData = {
    members: [
      { name: "Pete", address: { street: "1st Ave", ZIP: "12345" } },
      { name: "Bess", address: { street: "Central Way", ZIP: "98765" } },
      { name: "Henry", address: { street: "Main St", ZIP: "54321" } }
    ],
    manager: null,
  };

// Instantiate View Models
var team = $.views.viewModels.Team.map(teamData);

//Initialize second team member to be manager.
var manager = team.members()[1];
manager.isManager(true);

tmpl.link("#result", team);