"use strict";
var shoppingCart = {
  add: addItem,
  remove: removeItem,
  total: totalAmount,
  items: [
    {product: "Pot", price:  10, quantity: 3},
    {product: "Kettle", price:  15.5, quantity: 23}
  ],
  show: true
};

function addItem() {
  $.observable(this.items).insert({
    product: "new",
    price:  1,
    quantity: 1
    });
}
	
function removeItem(ev, eventArgs) {
  $.observable(this.items).remove(eventArgs.view.index);
}

function totalAmount() {
  var amount = 0,
    l = this.items.length;
  while (l--) {
    amount += this.items[l].price * this.items[l].quantity;
  }
  return amount;
}

totalAmount.depends = "items.**";
// totalAmount depends on any changes under the items array

var tmpl = $.templates("#cartTmpl");
tmpl.link("#shoppingcart", shoppingCart);
