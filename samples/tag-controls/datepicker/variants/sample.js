$.views.converters({
  tonum: function(val) {
    return +val; // Convert string to number
  }
});

function formattedDate(date) {
  var day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear();

  if (day < 10) {
    day = '0' + day;
  }

  if (month < 10) {
    month = '0' + month;
  }
  return month + '/'+ day + '/' + year;
}

var myTmpl = $.templates("#myTmpl"),
  pageOptions = {
    monthsSpan: 2
  },
  today = new Date(),
  model = {
    startDate: formattedDate(today),
    endDate: formattedDate(new Date(today.getTime() + 31*24*60*60*1000)),
    middleDate: ""
  };

myTmpl.link("#page", model, {
  page: pageOptions,
  selOption: function() {
    return this.linkCtx.elem.value === pageOptions.monthsSpan;
  }
});