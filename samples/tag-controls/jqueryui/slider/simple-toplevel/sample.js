$.views.converters({
  tonum: function(val) {
    return +val; // Convert string to number
  }
});

var model = {
    size: 150
  };

$.link(true, "body", model);