var count = 1,
  myTmpl = $.templates("#myTmpl"),

  items = [{name:"first"}, {name:"second"}, {name:"third"}],
  selectedItems = [items[0], items[2]],
  selectedSelectedItems = [items[2]],

  model = {
    items: items,
    selectedItems: selectedItems,
    selectedSelectedItems: selectedSelectedItems
  };

myTmpl.link("#page", model);

$("#add").on("click", function() {
  $.observable(items).insert({name: "new" + count++});
});

$("#remove").on("click", function() {
  $.observable(items).remove();
});

