$.views.tags({
  tree: {
    render: function(val) {
      this.data = val;
    },
    onAfterLink: function() {
      var self = this;
      self.contents("li").first()
        .on("click", ".toggle", function() {
          self.toggle();
        });
    },
    template: "#treeTemplate",

    //METHODS
    toggle: function() {
      $.observable(this.data).setProperty("expanded", !this.data.expanded);
    },
    dataBoundOnly: true
  }
});

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

$("#pageContent").link(pageTmpl, rootFolder);
