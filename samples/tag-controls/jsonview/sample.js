"use strict";
var team = {
  members: {
    m1: {name: "Robert"},
    m2: {name: "Sarah"}
  },
  addMember: function() {
    $.observable(this.members).setProperty("n" + cnt, {name: "new" + cnt++});
  }, 
  removeMember: function(key) {
    $.observable(this.members).removeProperty(key);
  },
  replaceMembers: function() {
    $.observable(this).setProperty("members", {m1: {name: "Peter"}, m2: {name: "Octavia"}, m3: {name: "Xavier"}});
  },
  changeMembers: function() {
    for (var property in this.members) {
      if (property !== $.expando) {
        $.observable(this.members).setProperty(property, {name: this.members[property].name + cnt++});
      }
    }
  }
},
cnt = 1;

$.templates("#teamTemplate").link("#team", team);
