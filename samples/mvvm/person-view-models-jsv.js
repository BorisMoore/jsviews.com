// View Model class definitions using pattern with separate getter and setter functions:

// Person
function Person(name, address, phones) {
  this._name = name;
  this._address = address;
  this._phones = phones;
}

var personProto = {
  name: function(val) {
    if (!arguments.length) {
      return this._name;
    }
    // If there is a value argument, treat as observable setter
    $.observable(this).setProperty("name", val);
  },
  phones: function(val) {
    if (!arguments.length) {
      return this._phones;
    }
    // If there is a value argument, treat as observable setter
    $.observable(this).setProperty("phones", val);
  },
  address: function(val) {
    if (!arguments.length) {
      return this._address;
    }
    // If there is a value argument, treat as observable setter
    $.observable(this).setProperty("address", val);
  }
};

personProto.name.set = function(val) {
  this._name = val;
};

personProto.address.set = function(val) {
  this._address = val;
};

personProto.phones.set = function(val) {
  this._phones = val;
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
    // If there is a value argument, treat as observable setter
    $.observable(this).setProperty("street", val);
  }
};

addressProto.street.set = function(val) {
  this._street = val;
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
    // If there is a value argument, treat as observable setter
    $.observable(this).setProperty("number", val);
  }
};

phoneProto.number.set = function(val) {
  this._number = val;
};

Phone.prototype = phoneProto;
