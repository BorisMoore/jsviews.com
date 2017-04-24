"use strict";
/* Hierarchy of named folders */
var rootFolder = {
  name: "Categories", folders: [
    {name: "Drama", folders: [
      {name: "Courtroom"},
      {name: "Political"}
    ]},
    {name: "Classic", folders: [
      {name: "Musicals", folders: [
        {name: "Jazz"},
        {name: "R&B/Soul"}
      ]}
    ]}
  ]};

var pageTmpl = $.templates("#pageTemplate");

pageTmpl.link("#pageContent", rootFolder);
