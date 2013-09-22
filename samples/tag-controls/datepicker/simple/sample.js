$.views.converters({
  tonum: function(val) {
    return +val; // Convert string to number
  }
});

var myTmpl = $.templates("#myTmpl"),
  pageOptions = {
    monthsSpan: 2
  },
  model = {
    startDate: "",
    endDate: "",
    middleDate: ""
  };

myTmpl.link("#page", model, {
  page: pageOptions,
  selOption: function() {
    return this.linkCtx.elem.value === pageOptions.monthsSpan;
  }
});
