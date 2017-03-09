var model = {
    items: [
      { name: 'Drag me' },
      { name: 'up or down' },
      { name: 'to sort...' }
    ]
  },

  pageTmpl = $.templates("#pageTmpl"),
  itemTmpl = $.templates('#item-template'),
  editTmpl = $.templates('#edit-template'),
  emptyListTmpl = $.templates('#empty-list-template'),

  helpers = {
    edit: function(view) {
      // Can also use var view = eventArgs.view;
      view.tmpl = editTmpl;
      view.refresh();
    },
    save: function(view) {
      view.tmpl = itemTmpl;
      view.refresh();
      console.log("save");
    },
    remove: function(index) {
      $.observable(model.items).remove(index);
    },
    itemTmpl: itemTmpl,
    emptyListTmpl: emptyListTmpl
  };

pageTmpl.link("#page", model, helpers);

$.link(true, ".linkedUl", model, helpers)
$.link(true, "#add", {
  add: function() {
    $.observable(model.items).insert({name: "new"});
  }
})

$(".sortable").sortable({
  placeholder: "ui-state-highlight",
  start: function(event, ui) {
    console.log("start");
  },
  stop: function(event, ui) {
    console.log("stop");
  }
})
