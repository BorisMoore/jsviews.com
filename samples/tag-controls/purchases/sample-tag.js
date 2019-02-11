"use strict";

/***** The following is an encapsulated tag declaration, which could be in a separate purchasesTag.js file *****/

$.views.tags("purchases", {              // Custom {{purchases}} tag encapsulating total() and category filter features
  baseTag: "for",                        // Inherit from the {{for}} tag

  init: function(tagCtx) {               // Override init()
    // Set the tagCtx.props.filter function
    tagCtx.props.filter = function(item, index, items) {
      var str = this.props.category;     // Filter for items whose item.category contains the tagCtx.props.category string
      return str ? item.category.toLowerCase().indexOf(str.toLowerCase()) !== -1 : true;
    };

    this.ctx.total = function(expr) {    // A ~total(expression) helper
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
    };

    // Recalculate total when any item property changes, or when row index changes (e.g. on changing sort)
    this.ctx.total.depends = ["#parent.data.[]^*", "#index"];

    // Add "category" to the mapProps array, to trigger refreshed filtering when tagCtx.props.category changes
    this.mapProps = this.mapProps.concat("category"); // Make copy of prototype.mapProps with "category" added

    this.baseApply(arguments); // Call base init()
  }
});

/***** The following is page-specific code... *****/

$.views.converters("dec2", function(val) {
  return val.toFixed(2);
})

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