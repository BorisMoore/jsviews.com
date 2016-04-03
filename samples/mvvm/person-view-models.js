// View Model class definitions using pattern with separate getter and setter functions:

// Person
function Person(name, address, phones) {
  this._name = name;
  this._address = address;
  this._phones = phones;
}

var personProto = {
  name: function() {
    return this._name;
  },
  phones: function() {
    return this._phones;
  },
  address: function() {
    return this._address;
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
  street: function() {
    return this._street;
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
  number: function() {
    return this._number;
  }
};

phoneProto.number.set = function(val) {
  this._number = val;
};

Phone.prototype = phoneProto;
