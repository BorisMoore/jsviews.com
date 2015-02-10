// An extended {{for}} tag: {{range}} inherits from {{for}}, and adds
// support for iterating over a range (start to end) of items within an array,
// or for iterating directly over integers from start integer to end integer
$.views.tags({
  range: {
    baseTag: "for",
    render: function(val) {
      var start = this.tagCtx.props.start || 0,
        end = this.tagCtx.props.end;

      if (start || end) {
        if (val === undefined) {
          val = [];
          end = end || 0;
          for (var i = start; i <= end; i++) {
            val.push(i);
          }
        } else if ($.isArray(val)) {
          val = val.slice(start, end);
        }
      }
      return this.base(val);
    }
  }
});

var team = {
  members: [
    {name: "Robert"},
    {name: "Sarah"},
    {name: "Xavier"},
    {name: "Adriana"}
  ]
};

var html = $("#teamTemplate").render(team);

$("#team").html(html);
