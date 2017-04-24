"use strict";
var team = {
  members: [
    {name: "Robert"},
    {name: "Sarah"},
    {name: "Xavier"},
    {name: "Adriana"}
  ]
};

var html = $("#teamTemplate").render(team);

$("#team").html(html);
