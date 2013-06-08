var people = [
  {
    firstName: "Pete",
    lastName: "Ruffles",
    address: {
      city: "Bellevue"
    },
    cells: ["425 666 3455", "425 222 1111"]
  },
  {
    firstName: "Xavier",
    lastName: "NoStreet",
    phones: ["222 666 3455"],
    cells: ["444 666 3455", "999 222 1111"]
  },
  {
    firstName: "Christie",
    lastName: "Sutherland",
    address: {
      street: "222 2nd Ave NE",
      city: "Redmond"
    }
  }
];

$.views.helpers({
  combine: function(arr1, arr2) {
    return arr1 && arr2 ? arr1.concat(arr2) : arr1 || arr2;
  },
  messages: {
    noAddress: "Has no address..."
  }
});

$("#peopleList").html(
  $("#peopleTemplate").render(people,
    {lateMessages: {
      noAddress: "Absolutely no address!..."}
    }
  )
);
