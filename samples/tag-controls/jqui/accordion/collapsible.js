var pageTmpl = $.templates("#pageTmpl"),
  model = {selectedPanel: 1};

pageTmpl.link("#page", model);
