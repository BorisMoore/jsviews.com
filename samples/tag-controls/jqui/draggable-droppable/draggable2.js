$.views.tags("draggable2", {
  bindTo: ["left", "top"],
  linkedCtxParam: ["left", "top"],
  mainElement: "div",
  template: "<div class='mytag'>{{include tmpl=#content/}}</div>",
  onBind: function() {
    var tag = this;
    tag.mainElem.mousedown(function(ev) {
      var offset = tag.mainElem.offset(),
        addedLeft = offset.left - ev.clientX;
        addedTop = offset.top - ev.clientY;
      if (document.elementFromPoint(ev.clientX, ev.clientY) === tag.mainElem[0]) {
        $(document.body).mousemove(function(ev2) {
          setTimeout(function() {
            var moveToX = ev2.clientX + addedLeft,
              moveToY = ev2.clientY + addedTop;
            tag.update(moveToX, moveToY);
            tag.setValue(moveToX, moveToY);
          }, 0);
        });
      }
    });
    $(document.body).mouseup(function() {
      $(document.body).off("mousemove");
    });
  },
  setValue: function(left, top) {
    if (left !== undefined) {
      this.mainElem.offset({left: left || 0});
    }
    if (top !== undefined) {
      this.mainElem.offset({top: top || 0});
    }
  },
  getValue: function() {
    var offset = this.mainElem.offset();
    return [offset.left, offset.top];
  },
  onUpdate: false,
  setSize: true
})

var i,
  pageTmpl = $.templates("#pageTmpl"),
  points = 12,
  radDlta = Math.PI/180,
  data = {cx: 180, cy: 250, cx2: 430, cy2: 250,
  rotate: 0, expand: 1, points: []};

$.views.converters({
  polarToXY: function(expand, rotate) {
    // Convert from polar coords (with center at (cx, cy) to XY coords
    var tagCtx = this.tagCtx,
      root = tagCtx.ctx.root,
      props = tagCtx.props,
      scaleRot = props.scaleRot || 1,
      angle = 180 + props.shift + rotate*scaleRot,
      r = props.radius*expand;
    // Return new [x, y] coordinates
    return [
      props.cx - r*Math.sin((angle)*radDlta),
      props.cy + r*Math.cos((angle)*radDlta)
    ];
  },
  XYtoPolar: function(left, top) {
    // Convert from XY coords to polar coords, with center at (cx, cy)
    var tagCtx = this.tagCtx,
      root = tagCtx.ctx.root,
      props = tagCtx.props,
      angle = props.shift,
      scaleRot = props.scaleRot || 1,
      // Calculate new polar coords - [expand, rotate]
      expand = Math.sqrt(Math.pow(props.cx - left, 2)
        + Math.pow(props.cy - top, 2))/props.radius;
      rotate = Math.atan2(props.cx - left, top - props.cy)/radDlta
        + 180 - props.shift;
    return [expand, rotate/scaleRot];
  },
  rnd: function(val) {
    // To string, rounded to nearest integer
    return "" + Math.round(val);
  },
  rnd2: function(val) {
    // To string, rounded to two decimal places
    return "" + Math.round(100*val)/100;
  },
  toNum: function(val) {
    // Convert to number
    return isNaN(val) ? 0 : parseFloat(val);
  }
});

i = points;
while (i--) {
  data.points.push({r: 100, angle: i*30});
}

pageTmpl.link("#page", data);
