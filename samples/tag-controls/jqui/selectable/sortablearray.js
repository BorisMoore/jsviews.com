"use strict";
var items1 = [1,3],
	items2 = [0,2,4];
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
    swap: function() {
      $.observable(this).setProperty("selectedItems", this.selectedItems===items1 ? items2 : items1);
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
    selectedItems: items1
  };

model.selectedPeople.depends = ["people", "selectedItems"];

pageTmpl.link("#page", model);
