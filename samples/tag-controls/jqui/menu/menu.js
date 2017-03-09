var data = {},
  pageTmpl = $.templates("#pageTmpl");

pageTmpl.link("#page", data, {
  menuAction: function(ev, ui) {
    if (!ui.item.children("ul").length) {
      // Leaf menu item
      alert(ui.item.text());
    }
  }
});
