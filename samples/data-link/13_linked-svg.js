var data = {
  x: 300,
  y: 100,
  text: "An SVG spin",
  color: "yellow",
  textcolor: "blue",
  angle: 30
};

var svgTmpl = $.templates("#svgTemplate");

svgTmpl.link("#result", data);