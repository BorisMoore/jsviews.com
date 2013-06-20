$.views.converters({
  setBit: function (value) {
    // "Convert Back": If checked, set this bit on the data,
  // or if unchecked, unset this bit on the data
    var mask = 1 << this.tagCtx.props.bit,
  // Shift first bit, 0, 1 or 2 bits to the left, to create a mask
      dataValue = this.linkCtx.data[this.linkCtx.fn.paths[0]];
  // Take the current data value
    return value ? (dataValue | mask) : (dataValue & ~mask);
  // Use the mask to set or unset that bit on the data, and return the modified value
  },
  getBit: function (value) {
    // "Convert": Get the bit from the data, and check or uncheck the checkbox
    return (value >> this.tagCtx.props.bit & 1) === 1;
  // Shift 0, 1 or 2 bits to the right, and see if the first bit is set.
  },
  intToStr: function (value) {
    return "" + value;
  },
  strToInt: function (value) {
    return parseInt(value);
  }
});

var data = { amount: 3 };

$( "#amountPickers" ).link( true, data );
