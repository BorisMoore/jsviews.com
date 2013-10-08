var data = {
  color: "yellow",
  border: "blue",
  width: 100,
  height: 50,
  thickness: 3
};

var svgTmpl = $.templates("#svgTemplate");

svgTmpl.link("#result", data);