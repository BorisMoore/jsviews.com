"use strict";
var cnt = 5,
  pageTmpl = $.templates("#pageTmpl"),
  model = {
    selectedPeople: function() {
      var person, itemIndex,
        people = [];
      for (var i = 0; i<this.selectedItems.length; i++) {
        itemIndex = this.selectedItems[i];
        person = this.people[itemIndex];
        if (person) {
          people.push({index: itemIndex, person: person});
        }
      }
      return people;
    },
    insert: function() {
      cnt++;
      $.observable(this.people).insert({
        name: "name" + cnt,
        lastName: "lastName "  + cnt
      });
    },
    remove: function(index) {
      $.observable(this.people).remove(index);
    },
    people: [
      {name: "Jo", lastName: "Johnson"},
      {name: "Pierre", lastName: "Ponce"},
      {name: "Radagu", lastName: "Regy"},
      {name: "Mara", lastName: "May"},
      {name: "Mando", lastName: "Mechy"}
    ],
    selectedItems: [1,3]
  };

model.selectedPeople.depends = ["people", "selectedItems"];

$.link(true, ".linkedUI", model);
