var pageTmpl = $.templates("#pageTmpl"),
  model = {
    color: "yellow",
    colors: [
      {name: "black", label: "Black"},
      {name: "red", label: "Red"},
      {name: "yellow", label: "Yellow"},
      {name: "blue", label: "Blue"},
      {name: "green", label: "Green"}
    ],
    radius: 100,
    radii: [50, 100, 150, 200, 250]
  };

pageTmpl.link("#page", model);
