var pageTmpl = $.templates("#pageTmpl"),
  model = {
    person: "Jo"
  };

pageTmpl.link("#page", model);
