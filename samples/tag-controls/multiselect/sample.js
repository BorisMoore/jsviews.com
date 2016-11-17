var count = 1,
  myTmpl = $.templates("#myTmpl"),

  // Using the default labelProp="name" valueProp="id".
  // (Or use non-default and set on tag, e.g. valueProp="key")
  items = [{id: "a", name:"first"}, {id: "b", name:"second"}, {id: "c", name:"third"}],
  selectedItems = [items[0], items[2]],
  selectedSelectedItems = [items[2]],

  model = {
    valueProp: "name",
    items: items,
    selectedItems: selectedItems,
    selectedSelectedItems: selectedSelectedItems
  };

myTmpl.link("#page", model);

$("#add").on("click", function() {
  $.observable(items).insert({id: "n" + count, name: "new" + count++});
});

$("#remove").on("click", function() {
  $.observable(items).remove();
});
