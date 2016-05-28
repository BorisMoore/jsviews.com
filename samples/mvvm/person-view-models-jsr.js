// View Model class definitions using getter pattern

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

Phone.prototype = phoneProto;
