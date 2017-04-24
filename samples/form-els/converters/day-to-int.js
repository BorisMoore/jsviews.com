"use strict";
var days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
  myWeek = {
    dayOff: 1
  };

$.views.converters({
  dayToInt: function(val) {
    var dayOff = parseInt(val);
    if (isNaN(dayOff)) {
      for (var i = 0; i < 7; i++) {
        if (days[ i ].toLowerCase().slice(0, val.length) === val.toLowerCase()) {
          dayOff = i;
          break;
        }
      }
    }
    if (isNaN(dayOff)) {
      dayOff = val;
    } else {
      this.linkCtx.elem.value = days[dayOff]; // Set the text box value to the Day Off name
    }
    return dayOff;
  },
  intToDay: function(val) {
    return days[val] || val;
  }
});

// Observable property change
$("#changeDay").on("click", function() {
  var dayOff = myWeek.dayOff;
  $.observable(myWeek).setProperty("dayOff", dayOff < 6 ? dayOff + 1 : 0);
});

var myTmpl = $.templates("#linkedTmpl")

myTmpl.link("#linked", myWeek);
