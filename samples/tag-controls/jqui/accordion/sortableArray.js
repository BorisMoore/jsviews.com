var cnt = 2,
  pageTmpl = $.templates("#pageTmpl"),
  model = {
    selectedPanel: false,
    panelData: [
      {
        header: "First tab",
        content: "First tab content"
      },
      {
        header: "Another tab",
        content: "More content"
      },
      {
        header: "Third tab",
        content: "Even more content"
      }
    ]
  };

pageTmpl.link("#page", model, {
  remove: function(index) {
    $.observable(model.panelData).remove(index);
  },
  append: function() {
    cnt++;
    $.observable(model.panelData).insert({
      header: "Added" + cnt,
      content: "Added content "  + cnt
    });
  }
});
