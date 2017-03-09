$.views.tags({
  tree: {
    template: "#treeTemplate",

    //METHODS
    toggle: function() {
      $.observable(this.view.data).setProperty("expanded", !this.view.data.expanded);
    },
    dataBoundOnly: true
  },

  editableTree: {
    template: "#editableTreeTemplate",

    //METHODS
    toggle: function() {
      $.observable(this.view.data).setProperty("expanded", !this.view.data.expanded);
    },
    remove: function() {
      var parentFolders = this.parent.view.data.folders,
        index = this.tagCtx.view.index;
      $.observable(parentFolders).remove(index);
    },
    addFolder: function() {
      $.observable(this.view.data.folders).insert({
        name: "new folder",
        folders: []
      });
      $.observable(this.view.data).setProperty("expanded", true);
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
