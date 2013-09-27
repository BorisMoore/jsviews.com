var myTmpl = $.templates("#myTmpl"),
  model = {
    person: "Jo"
  };

myTmpl.link("#page", model);
