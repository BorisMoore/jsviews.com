// Compile template
var tmpl = $.templates("#teamTmpl");

// Custom function for Person.isManager get/set property
function myIsManager(val) {
  if (!arguments.length) {
    return this === team.manager(); // If there is no argument, use as a getter
  }
  if (val) {
    // Setting this.isManager() to true
    // So make this team member manager
    team.manager(this);
  } else if (this.isManager()) {
    // Setting this.isManager to false, and this team member is currently manager.
    // So set team manager to null
    team.manager(null);
  }
}

// Compile View Models
$.views.viewModels({
  Team: {
    getters: [
      {
        getter: "manager",
        type: "Person"
      },
      {
        getter: "members",
        type: "Person"
      }
    ]
  },
  Person: {
    getters: [
      "name",
      {
        getter: "address",
        type: "Address"
      }
    ],
    extend: {
      isManager: myIsManager // use custom function
    }
  },
  Address: {
    getters: ["street", "ZIP"]
  }
});

// Specify that the same function is a setter - for two-way data-linking
myIsManager.set = true;

// Specify dependency: if team.manager() changes, manager.isManger() should update
myIsManager.depends = function() {
  return [team, "manager"];
}
// Alternatively - more declarative approach: use ~manager contextual parameter:
// myIsManager.depends = "~manager"

// Initial data
  teamData = {
    manager: null,
    members: [{
      name: "Pete",
      address: {
        street: "1st Ave",
        ZIP: "12345"
      }
    },{
      name: "Bess",
      address: {
        street: "Central Way",
        ZIP: "98765"
      }
    },
    {
      name: "Henry",
      address: {
        street: "Main St",
        ZIP: "54321"
      }
    }]
  };

// Instantiate View Models
var team = $.views.viewModels.Team.map(teamData);

//Initialize second team member to be manager.
var manager = team.members()[1];
manager.isManager(true);

tmpl.link("#result", team, {setManager: function(index) {
  if (arguments.length === 3) {
    team.members()[index].isManager(true);
  } else if (team.manager()) {
    team.manager().isManager(false);
  }
}});