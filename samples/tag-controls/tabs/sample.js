var state = {
    innerSelect: 1
  },
  tabsTmpl = $.templates("#tabsTmpl");

  tabsTmpl.link("#tabsView",
    {
      label2: "Inner Tab Label2",
      width: 290
    },
    {
      state: state,
      onAfterCreate: function(view) {
        // When the outer tabs controls tab changes to a tab containing
        // a nested tabs control, the inner tabs control we must
        // hook up the selectionChange handler
        if (view.type === "tabs" && view.tag.tagCtx.props.id === "inner") {
          view.tag.onSelectionChange = function(index) {
            $.observable(state).setProperty("innerSelect", index);
          }
        }
      }
    }
  );