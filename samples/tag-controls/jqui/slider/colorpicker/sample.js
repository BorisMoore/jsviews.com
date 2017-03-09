$.views.converters("toHex", function(r, g, b) {
  var hex = [
    r.toString(16),
    g.toString(16),
    b.toString(16)
  ];

  $.each(hex, function(nr, val) {
    if (val.length === 1) {
      hex[nr] = "0" + val;
    }
  });

  return "#" + hex.join("");
});

var pageTmpl = $.templates("#pageTmpl"),
  model = {
    red: 255,
    green: 140,
    blue: 60
  };

pageTmpl.link("#page", model);