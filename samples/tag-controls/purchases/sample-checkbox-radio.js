"use strict";
$.views.tags("myDataChangeTag",
  {
    contentCtx: true, // Inherit parent view data context
    onDomChange: function(tagCtx, linkCtx, eventArgs, ev) {
      console.log("DomChange: tag: '" + this.tagName + "', type: '" + ev.type + "', change: '" + eventArgs.change + "'");
    }
  }
);

$.views.converters({
  dec2: function(val) {
    return val.toFixed(2); // Format number to 2 decimal places
  },
  trans: function(val) {
    if (this.linkCtx.elem.innerHTML != val) {
      $(this.linkCtx.elem).css("display", "none").fadeIn(100);  // Trigger a 'fadeIn' transition
    }
    return val;
  },
  dec2Trans: function(val) {
    var value = val.toFixed(2); // Format number to 2 decimal places
    if (this.linkCtx.elem.innerHTML != value) {
      $(this.linkCtx.elem).css("display", "none").fadeIn(200);  // Trigger a 'fadeIn' transition
    }
    return value;
  },
  toNum: function(val) {
    return +val; // Convert string to number
  }
});

var helpers = {
  cat: "book", // Filter by category
  sortBy: "price",
  reverseSort: false,
  cmpA: "",
  cmpB: "b2",
  sortCol: function(sortBy, reverseSort, field, ev, eventArgs) {
    // Handler for column header click. Sort items by this column
    if (!ev || ev.target.tagName === "INPUT") {
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
  },
  catFilter: function(item, index, items) { // Helper for category filter
    var str = this.view.ctxPrm("cat");
    // Filter for items whose item.category contains the tagCtx.ctxPrm("cat") string
    return str ? item.category.toLowerCase().indexOf(str.toLowerCase()) !== -1 : true;
  },
  total: function(expr, excluded, taxed) { // Helper for running total: ~total(expression)
    var tmpl = $.templates[expr]       // Get named compiled template for expression, or else...
                  || $.templates(expr, "{{:" + expr + "}}"), // ...if this is first call, create it

      runningTotal = 0,
      view = this,                     // The content view of the ~total(...) helper call
      items = view.get("array").data,
      rowIndex = view.getIndex();

    for (var i = 0; i <= rowIndex; i++) {
      if (excluded && $.inArray(items[i].id, excluded) > -1) {
        continue;
      }
      runningTotal += +tmpl(items[i]); // Compute running total up to this row, using render function of
      if (taxed && $.inArray(items[i].id, taxed) > -1) {  // compiled tmpl (either tmpl() or tmpl.render()...)
        runningTotal += runningTotal*.1;
      }
    }
    return runningTotal;               // Return value from ~total(...)
  },
  getItem: function(itemId, items) {   // Helper to get item with a given id
    var i  = items.length;
    while (i--) {
      if (items[i].id === itemId) {
        return items[i];
      }
    }
  },
  trans: function(tagCtx, linkCtx, ctx, ev, eventArgs) { // Called by onBeforeChange of {{props}} tag, above
    $(this.parentElem).css("display", "none").fadeIn(300); // Trigger a 'fadeIn' transition
  },
  excluded: ["b3"],
  taxed: ["t1", "b1"]
};

// Trigger refreshed filtering when filter string provided by the user changes
helpers.catFilter.depends = "~cat";

// Trigger recalculation of total when any item property changes, or when row index changes (e.g. on changing sort)
helpers.total.depends = ["#parent.data.[]^*", "#index"];

var purchases = {
  lineItems: [
    {category: "book", quantity: 1, price: 85.00, id:"b1"},
    {category: "groceries", quantity: 5, price: 1.01, id:"g1"},
    {category: "travel books", quantity: 2, price: 84.99, id:"t1"},
    {category: "bookshelf", quantity: 1, price: 9.99, id:"b2"},
    {category: "groceries", quantity: 2, price: 13.10, id:"g2"},
    {category: "books", quantity: 3, price: 12.50, id:"b3"}
  ]
};

$.templates("#myTmpl").link("#purchases", purchases, helpers);
