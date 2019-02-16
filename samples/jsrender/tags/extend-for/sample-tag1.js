"use strict";
$.views.converters("dec2", function(val) {
  return val.toFixed(2);
});

function categoryFilter(item, index, items) {
  var str = this.props.category;         // Filter for items whose item.category contains the tagCtx.props.category string
  return str ? item.category.toLowerCase().indexOf(str.toLowerCase()) !== -1 : true;
}

$.views.tags("purchases", {
  baseTag: "for",                        // Inherit from the {{for}} tag
  ctx: {
    total: function(expr) {              // A ~total(expression) helper
      var tmpl = $.templates[expr]       // Get named compiled template for expression, or else...
                 || $.templates(expr, "{{:" + expr + "}}"), // ...if this is first call, create it

        runningTotal = 0,
        view = this,                     // The content view of the ~total(...) helper call
        items = view.get("array").data,
        rowIndex = view.getIndex();

      for (var i = 0; i <= rowIndex; i++) {
        runningTotal += +tmpl(items[i]); // Compute running total up to this row, using render function
      }                                  // of compiled tmpl (either tmpl() or tmpl.render()...)
      return runningTotal;               // Return value from ~total(...)
    }
  }
});

var purchases = {
  lineItems: [
    {category: "book", quantity: 1, price: 85.00},
    {category: "groceries", quantity: 5, price: 1.01},
    {category: "travel books", quantity: 2, price: 84.99},
    {category: "groceries", quantity: 2, price: 13.10}
  ]
};
var html = $("#myTmpl").render(purchases, {category: categoryFilter});

$("#purchases").html(html);