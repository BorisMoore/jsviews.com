$.views.converters({
  tonum: function(val) {
    return +val; // Convert string to number
  }
});

var pageTmpl = $.templates("#pageTmpl"),
  model = {
    mode: "return",
    reverse: false,
    playing: false,
    time: 1500,

    play: function() {
      $.observable(this).setProperty("playing", true);
    },
    stop: function() {
      $.observable(this).setProperty("playing", false);
    },
    toStart: function() {
      $.observable(this).setProperty("time", 0);
    },
    toPrev: function() {
      if (this.time > 300) {
        $.observable(this).setProperty("time", this.time - 300);
      }
    },
    toNext: function() {
      if (this.time < 2700) {
        $.observable(this).setProperty("time", this.time + 300);
      }
    }
  },
  uiOverrides = {
    "ui-controlgroup": "mygroup ui-corner-all",
    "ui-controlgroup-item": "myuibutton",
    "ui-button": "myuibutton"
  };

pageTmpl.link("#page", model, {
  not: function(val) {
    return !val;
  },
  toHex: function(num) {
    num = parseInt(255-num).toString(16);
    if (num.length === 1) {
      num = "0" + num;
    }
    return "#" + num + "cc" + num;
  },
  myUiOverrides: uiOverrides
});

var stepTimer, randomTimer;

$.observe(model, "playing", function(ev, eventArgs) {
  if (eventArgs.value) {
    stepTimer = setInterval(
      function step() {
        if (model.time < 0 || model.time > 3000) {
          $.observable(model).setProperty("time", model.reverse ? 0 : 3000);
          if (model.mode === "once") {
            $.observable(model).setProperty("playing", false);
          } else {
            $.observable(model).setProperty("reverse", !model.reverse);
          }
        } else {
          $.observable(model).setProperty("time", model.time + (model.reverse ? -1 : 1));
        }
      },
      7
    );
  } else {
    clearInterval(stepTimer);
  }
});

$.observe(model, "mode", "playing", function(ev, eventArgs) {
  if (model.playing && model.mode === "random") {
    randomTimer = setInterval(
      function() {
        $.observable(model).setProperty({
          reverse: !model.reverse,
          time: Math.floor(Math.random()*3001)
        });
      },
      1300
    );
  } else {
    clearInterval(randomTimer);
  }
});
