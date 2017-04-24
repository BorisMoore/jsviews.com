"use strict";
var data = {
  x: 300,
  y: 140,
  text: "An SVG spin",
  color: "yellow",
  textcolor: "blue",
  angle: 30
};

var svgTmpl = $.templates("#svgTemplate");

svgTmpl.link("#result", data);