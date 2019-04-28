"use strict";
$.views.tags({
  tree: {
    template: "#treeTemplate",

    //METHODS
    toggle: function() {
      var data = this.tagCtx.view.data;
      $.observable(data).setProperty("expanded", !data.expanded);
    }
  },

  editableTree: {
    template: "#editableTreeTemplate",

    //METHODS
    toggle: function() {
      var data = this.tagCtx.view.data;
      $.observable(data).setProperty("expanded", !data.expanded);
    },
    remove: function() {
      var parentFolders = this.parent.tagCtx.view.data.folders,
        index = this.tagCtx.view.index;
      $.observable(parentFolders).remove(index);
    },
    addFolder: function() {
      var data = this.tagCtx.view.data;
      $.observable(data.folders).insert({
        name: "new folder",
        folders: []
      });
      $.observable(data).setProperty("expanded", true);
    },
    dataBoundOnly: true
  }
});

/* Hierarchy of named folders */
var rootFolder = {
  editable: true,
  name: "Categories", folders: [
    {name: "Drama", folders: []}
  ]};

var pageTmpl = $.templates("#pageTemplate");

pageTmpl.link("#pageContent", rootFolder);
