"use strict";
$.views.converters({
  dec2: function(val) {
    return val.toFixed(2); // format number to 2 decimal places
  },
  toNum: function(val) {
    return +val; // Convert string to number
  }
});

$.views.helpers({
  category: function(item, index, items) { // Helper for category filter
    var str = this.ctxPrm("cat");      // Filter for items whose item.category contains the tagCtx.ctxPrm("cat") string
    return str ? item.category.toLowerCase().indexOf(str.toLowerCase()) !== -1 : true;
  },

  total: function(expr) {              // Helper for running total: ~total(expression)
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
});

// Trigger refreshed filtering when filter string provided by the user changes
$.views.helpers.category.depends = "~cat";

// Trigger recalculation of total when any item property changes, or when row index changes (e.g. on changing sort)
$.views.helpers.total.depends = ["#parent.data.[]^*", "#index"];

var purchases = {
  lineItems: [
    {category: "book", quantity: 1, price: 85.00},
    {category: "groceries", quantity: 5, price: 1.01},
    {category: "travel books", quantity: 2, price: 84.99},
    {category: "bookshelf", quantity: 1, price: 9.99},
    {category: "groceries", quantity: 2, price: 13.10},
    {category: "books", quantity: 3, price: 12.50}
  ]
};

$.templates("#myTmpl").link("#purchases", purchases, {
  cat: "", // Filter by category, initially not filtered
  sortBy: "price",
  reverseSort: false,
  sortCol: function(sortBy, reverseSort, field, ev, eventArgs) {
    // Handler for column header click. Sort items by this column
    if (ev.target.tagName === "INPUT") {
      return;
    }
    var view = eventArgs.view;

    reverseSort = sortBy === field // Cycle through sequence: Sort/Reverse sort/No sort...
      ? !reverseSort
      : false;

    sortBy = sortBy === field
      ? reverseSort
        ? sortBy
        : false
      : field;
    view.ctxPrm("sortBy", sortBy).ctxPrm("reverseSort", reverseSort);
  }
});