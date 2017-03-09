var pageTmpl = $.templates("#pageTmpl"),
  model = {selectedTab: 1};

pageTmpl.link("#page", model);
