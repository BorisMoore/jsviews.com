$.views.converters({
  intToStr: function(value) {
    return "" + value;
  },
  strToInt: function(value) {
    return parseInt(value);
  },
  setBit: function(value) {
    // "Convert Back": If checked, set this bit on the data,
    // or if unchecked, unset this bit on the data
    var mask = 1 << this.linkCtx.elem.getAttribute("data-bit"),
    // Shift first bit, 0, 1 or 2 bits to the left, to create a mask
      dataValue = this.tagCtx.args[0];
      // Take the current data value
    return value ? (dataValue | mask) : (dataValue & ~mask);
    // Use the mask to set or unset that bit on the data, and return the modified value
  },
  getBit: function(value) {
    // "Convert": Get the bit from the data, and check or uncheck the checkbox
    return (value >> this.linkCtx.elem.getAttribute("data-bit") & 1) === 1;
    // Shift 0, 1 or 2 bits to the right, and see if the first bit is set.
  }
});

var newBits, newAmounts,
  bits = [],
  amounts = [],
  bitCount = 3,
  data = {
    amount: 3,
    amounts: amounts,
    bits: bits,
    listbox: true
  };

function setData() {
  newBits = [];
  newAmounts = [];
  var maxAmount = Math.pow(2, bitCount);
  for(var i = 0; i < bitCount; i++) {
    newBits.push(i);
  }
  for(var i = 0; i < maxAmount ; i++) {
    newAmounts.push(i);
  }
  $.observable(bits).refresh(newBits);
  $.observable(amounts).refresh(newAmounts);
}

setData();

$.templates("#tmpl").link("#amountPickers", data);

$("#more").on("click", function() {
  bitCount++;
  setData();
});
$("#less").on("click", function() {
  bitCount--;
  setData();
});
