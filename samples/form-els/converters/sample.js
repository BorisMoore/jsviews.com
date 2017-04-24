"use strict";
$.views.converters({
  minus1: function(value) {
    return isNaN(value) || value === '' ? null : value-1;
  },
  plus1: function(value) {
    return 1+value;
  },
  not: function(val) {
    return !val;
  },
  intToStr: function(value) {
    return "" + value;
  },
  strToInt: function(value) {
    return isNaN(value) || value === '' ? null : parseInt(value);
  },
  setBit: function(value) {
    // "Convert Back": If checked, set this bit on the data,
    // or if unchecked, unset this bit on the data
    var mask = 1 << this.linkCtx.elem.getAttribute("data-bit"),
      // Shift first bit, 0, 1 or 2 bits to the left,
      // to create a mask
      dataValue = this.tagCtx.args[0];
      // Take the current data value
    return value ? (dataValue | mask) : (dataValue & ~mask);
    // Use the mask to set or unset that bit on the data,
    // and return the modified value
  },
  getBit: function(value) {
    // "Convert": Get the bit from the data,
    // and check or uncheck the checkbox
    return (value >>
      this.linkCtx.elem.getAttribute("data-bit") & 1) === 1;
    // Shift 0, 1 or 2 bits to the right,
    // and see if the first bit is set.
  }
});

var data = {
  group: "Group ONE",
  amount: 3,
  listbox: false
};

$.templates("#tmpl").link("#amountPickers", data);
