"use strict";
$.views.converters("dec2", function(val) {
  return val.toFixed(2);
})

function categoryFilter(item, index, items) {
  return this.props.category === item.category;
}

function total(expr) {              // A ~total(expression) helper
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

total.depends = "#parent.data.[].*";

$.views.tags("purchases", {
  baseTag: "for",                        // Inherit from the {{for}} tag
  ctx: {total: total}
});

var purchases = {
  lineItems: [
    {category: "book", quantity: 2, price: 3.40},
    {category: "grocery", quantity: 5, price: 1.01},
    {category: "grocery", quantity: 2, price: 13.10},
    {category: "book", quantity: 1, price: 12.50}
  ]
};

$.templates("#myTmpl").link("#purchases", purchases, {
  sortBy: "category",
  category: categoryFilter,
  sortCol: function(sortBy, reverseSort, field, ev, eventArgs) {
    if (ev.target.tagName === "INPUT") {
      return;
    }
    var view = eventArgs.view;

    reverseSort = sortBy === field
      ? !reverseSort
      : false;

    sortBy = sortBy === field
      ? reverseSort
        ? sortBy
        : false
      : field;
    view.ctxPrm("sortBy", sortBy) // NEED TO BRACKET THIS
      .ctxPrm("reverseSort", reverseSort);
    }
  });