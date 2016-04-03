// View Model class definitions, using get/set pattern:

// Person
function Person(name, address, phones) {
  this._name = name;
  this._address = address;
  this._phones = phones;
}

var personProto = {
  name: function(val) {
    if (!arguments.length) {
      return this._name; // If there is no argument, use as a getter
    }
    this._name = val;    // If there is a value argument, treat as a setter
  },
  phones: function(val) {
    if (!arguments.length) {
      return this._phones;
    }
    this._phones = val;
  },
  address: function(val) {
    if (!arguments.length) {
      return this._address;
    }
    this._address = val;
  }
};

Person.prototype = personProto;

// Address
function Address(street) {
  this._street = street;
}

var addressProto = {
  street: function(val) {
    if (!arguments.length) {
      return this._street;
    }
    this._street = val;
  }
};

Address.prototype = addressProto;

// Phone
function Phone(number) {
  this._number = number;
}

var phoneProto = {
  number: function(val) {
    if (!arguments.length) {
      return this._number;
    }
    this._number = val;
  }
};

Phone.prototype = phoneProto;
