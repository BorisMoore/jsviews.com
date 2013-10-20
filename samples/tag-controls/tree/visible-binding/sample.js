$.views.tags({
  tree: {
    onAfterLink: function() {
      var self = this;
      self.contents("li").first()
        .on("click", ".toggle", function() {
          self.toggle();
        })
        .on("click", ".selectable", function() {
          self.select();
        });
    },
    template: "#treeTemplate",

    //PROPERTIES
    expanded: false, // default to unexpanded

    //METHODS
    toggle: function() {
      $.observable(this).setProperty("expanded", !this.expanded);
    },
    select: function() {
      $.observable(this).setProperty("selected", !this.selected);
    },
    dataBoundOnly: true
  }
});

/* Hierarchy of named folders */
var rootFolder = {
  name: "Categories", folders: [
    { name: "Drama", folders: [
      { name: "Courtroom" },
      { name: "Political" }
    ]},
    { name: "Classic", folders: [
      { name: "Musicals", folders: [
        { name: "Jazz"},
        { name: "R&B/Soul"}
      ]}
    ]}
  ]};

var pageTmpl = $.templates("#pageTemplate");

$("#pageContent").link(pageTmpl, rootFolder);
