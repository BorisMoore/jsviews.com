$.views.converters({
  tonum: function(val) {
    return +val; // Convert string to number
  }
});

// Register additional validators for dates
$.views.tags.validate.validators({
  minday: {
    message: "Choose a date after: %cond%",
    test: function(condition, val) {
      var vals = val.split("/"),
        conds = condition.split("/");
      vals = vals[2]*10000 + vals[0]*100 + vals[1];
      conds = conds[2]*10000 + conds[0]*100 + conds[1];
      return vals < conds;
    }
  },
  maxday: {
    message: "Choose a date before: %cond%",
    test: function(condition, val) {
      var vals = val.split("/"),
        conds = condition.split("/");
      vals = vals[2]*10000 + vals[0]*100 + vals[1];
      conds = conds[2]*10000 + conds[0]*100 + conds[1];
      return vals > conds;
    }
  },
  weekday: {
    message: "Please choose a weekday!",
    test: function(condition, val) {
      var vals = val.split("/"),
        day = new Date(vals[2], vals[0]-1, vals[1]).getDay();
      return condition ^ (day > 0 && day < 6);
    }
  }
});

var pageTmpl = $.templates("#pageTmpl"),
  pageOptions = {
    pane: 0,
    monthsSpan: 2
  },
  today = new Date(),
  model = {
    startDate: formattedDate(today),
    endDate: "",
    middleDate: ""
  };

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

pageTmpl.link("#page", model, {
  page: pageOptions
})
.on("click", "#next", function() {
  if ($.view(this).ctx.tag.validate()) {
    $.observable(pageOptions).setProperty("pane", pageOptions.pane + 1);
  }
})
.on("click", "#prev", function() {
  $.observable(pageOptions).setProperty("pane", pageOptions.pane - 1);
});
