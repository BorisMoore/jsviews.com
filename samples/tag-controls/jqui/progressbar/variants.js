"use strict";
var data = {
    mode: "Stop",
    label: "",
    amount: 0,
    max: 1000,
    go: function() {
      $.observable(data).setProperty("mode", data.mode==="Go"?"Stop":"Go");
      progress();
    },
    busy: function() {
      $.observable(data).setProperty("mode", data.mode==="Busy"?"Go":"Busy");
      progress();
    },
    done: function() {
      $.observable(data).setProperty({
        mode: "Go",
        amount: data.max
      });
    },
    restart: function() {
      $.observable(data).setProperty({
        mode: data.mode==="Go"?"Stop":"Go",
        amount: data.amount >= data.max ? 0 : data.amount
      });
      progress();
    }
  },
  pageTmpl = $.templates("#pageTmpl");

  pageTmpl.link("#page", data, {
    change: function() {
      $.observable(data).setProperty("label", "");
    },
    complete: function() {
      $.observable(data).setProperty("label", "Complete!" );
    }
  });

function progress() {
  if (data.mode==="Go") {
    if ( data.amount < data.max ) {
      $.observable(data).setProperty( "amount", Math.min(data.max, data.amount + 10));
      setTimeout( progress, 50 );
    } else {
  $.observable(data).setProperty("mode", "Stop");
    }
  }
}
