$.views.tags({
  tabs: {
    init: function(tagCtx) {
      this.selectedIndex = tagCtx.props.selectedTab || 0;
    },
    render: function() {
      var tagCtx = this.tagCtx;
      return this.selectedIndex === tagCtx.index ? tagCtx.render() : "";
    },
    onAfterLink: function() {
      var self = this;
      self.contents(".tabstrip", true).first()
        .on("click", ".header_false", function() {
          self.setTab($.view(this).index);
        });
    },
    onDispose: function() {
      if (this.tagCtx.props.id === "inner") {
        this.tagCtx.ctx.state.innerSelect = this.selectedIndex;
      }
    },
    template: "#tabsTemplate",

    //METHODS
    setTab: function(index) {
      $.observable(this).setProperty("selectedIndex", index);
    }
  }
});

var state = { innerSelect: 1 },
  myTmpl = $.templates("#myTmpl");

myTmpl.link("#tabsView", {label2: "Inner Tab Label2", width: 350}, {state: state});
