"use strict";
var cnt = 2,
  pageTmpl = $.templates("#pageTmpl"),
  model = {
    selectedTab: 1,
    tabData: [
      {
        id: "tabs-0",
        header: "First tab",
        content: "First tab content"
      },
      {
        id: "tabs-1",
        header: "Another tab",
        content: "More content"
      },
      {
        id: "tabs-2",
        header: "Third tab",
        content: "Even more content"
      }
    ]
  };

pageTmpl.link("#page", model, {
  remove: function(index) {
    $.observable(model.tabData).remove(index);
  },
  append: function() {
    cnt++;
    $.observable(model.tabData).insert({
      id: "tabs-" + cnt,
      header: "Added" + cnt,
      content: "Added content "  + cnt
    });
  }
});
