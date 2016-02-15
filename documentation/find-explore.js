var content = $.views.documentation.content;

content.find.explore = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/explore")) ||
{
  "explore": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/data": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/objectsorvm": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender, JsObservable and JsViews are designed to work well with either plain JavaScript objects and arrays, or with instances of JavaScript classes, such as View Model classes.\nSo, for example, if you are using data obtained from a JSON request, you can choose between:\n\nrendering your templates directly against the objects and arrays returned from the JSON request\npassing the data through a 'mapping' process to create a hierarchy of View Model instances, and rendering your templates against those objects\n\nThen if you are using JsViews, and binding to your data using data-linking, again you can do that for either scenario above.\n"
      },
      {
        "_type": "para",
        "title": "<b>Example: JsRender with plain objects and arrays</b>",
        "text": "Example: JsRender with plain objects and arrays\n"
      },
      {
        "_type": "code",
        "title": "Suppose this is our data from a JSON request:",
        "text": "Suppose this is our data from a JSON request:\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n"
      },
      {
        "_type": "template",
        "title": "We'll render using a template structured like this:",
        "text": "We'll render using a template structured like this:\n... \n{{:name}}\n...\n{{:address.street}}\n...\n{{for phones}}\n  ...      \n  {{:number}}\n  ...\n{{/for}}\n...\n"
      },
      {
        "_type": "sample",
        "title": "Render template directly against plain objects...",
        "text": "Render template directly against plain objects...\n\n$(\"#result\").html(tmpl.render(person));\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now we’ll convert the above sample to use View Model classes.\n"
      },
      {
        "_type": "para",
        "title": "<b>Example: JsRender with View Model objects</b>",
        "text": "Example: JsRender with View Model objects\nWe’ll convert the data to a corresponding hierarchy of View Model class instances.\n"
      },
      {
        "_type": "para",
        "title": "View Model classes:",
        "text": "View Model classes:\nHere is the class definition for Person:\n// Constructor\nfunction Person(name, address, phones) {\n  this._name = name;\n  this._address = address;\n  this._phones = phones;\n}\n\n// Prototype\nvar personProto = {\n  name: function() {\n    return this._name;\n  },\n  address: function() {\n    return this._address;\n  },\n  phones: function() {\n    return this._phones;\n  }\n};\n\nPerson.prototype = personProto;\n\n// For read-write properties, associate setters with getters, \npersonProto.name.set = function(val) {\n  this._name = val;\n};\n\n...\n\nThe above is a recommended pattern for View Model classes used with JsRender which will work seamlessly also with JsViews data-binding. Variants of this pattern are possible, too.\nWe define exactly similar classes for our Address and Phone objects too.\n"
      },
      {
        "_type": "para",
        "title": "Getters and setters",
        "text": "Getters and setters\nNote that properties are now getter functions, which return the appropriate value, which may be of any type, including objects or arrays (such as address and phones above).\nIn fact they are particular case of computed observables – a concept that can be used quite generally within JsViews, not only for View Model properties.\nFor properties which are read-write, there is also a setter function, declared using the syntax:\nmyGetterFunction.set = mySetterFunction\n\n"
      },
      {
        "_type": "para",
        "title": "Variant: using the same function as both getter and setter",
        "text": "Variant: using the same function as both getter and setter\nAn interesting variant is to use a single function as both setter and getter. Here is an example of what that would look like:\nvar nameGetSet = function name(val) {\n  if (val === undefined) {\n    return this._name; // getter\n  }\n  this._name = val; // setter\n}\n\nnameGetSet.set = nameGetSet; // The same function will also be used as setter\n// Or use the equivalent alternative syntax: nameGetSet.set = true;\n\nPerson.prototype.name = nameGetSet;\n\n"
      },
      {
        "_type": "para",
        "title": "Template",
        "text": "Template\nTo convert our template from using plain objects to using View Model objects, the only change we need to make is to add parens for our properties, which are now getter functions:\n... \n{{:name()}}\n...\n{{:address().street()}}\n...\n{{for phones()}}\n  ...      \n  {{:number()}}\n  ...\n{{/for}}\n...\n\n"
      },
      {
        "_type": "para",
        "title": "Using the setter function",
        "text": "Using the setter function\nWhen JsRender renders a template using a get/set property {{:name()}} it will call the getter function, but not the setter. However you may wish to modify the value of name() from code, using\nsomePerson.name.set(\"newName\");\n\n(If you have set nameGetSet.set = true;, you can equivalently write somePerson.name(\"newName\");.)\nWhen using the same View Model class with JsViews, then JsViews will call the setter function when the user modifies a data-bound value such as  <input data-link=\"name()\" />.\n"
      },
      {
        "_type": "para",
        "title": "Instantiate and render:",
        "text": "Instantiate and render:\nNow all we need to do is to construct our root person object (with its underlying hierarchy of View Model instance objects) and render the template against that object in the usual way.\n"
      },
      {
        "_type": "sample",
        "title": "Render template against a View Model object hierarchy",
        "text": "Render template against a View Model object hierarchy\nInstantiate View Model hierarchy\n\nvar person = new Person(\n  \"Pete\",\n  new Address(\n    \"1st Ave\"),\n    [\n      new Phone(\"111 111 1111\"),\n      new Phone(\"222 222 2222\")\n    ]\n  );\n\n\nRender template against person object (instance of Person)\n\n$(\"#result\").html(tmpl.render(person));\n\n// View Model class definitions:\n\n// Person\nfunction Person(name, address, phones) {\n  this._name = name;\n  this._address = address;\n  this._phones = phones;\n}\n\nvar personProto = {\n  name: function() {\n    return this._name;\n  },\n  phones: function() {\n    return this._phones;\n  },\n  address: function() {\n    return this._address;\n  }\n};\n\npersonProto.name.set = function(val) {\n  this._name = val;\n};\n\npersonProto.address.set = function(val) {\n  this._address = val;\n};\n\npersonProto.phones.set = function(val) {\n  this._phones = val;\n};\n\nPerson.prototype = personProto;\n\n// Address\nfunction Address(street) {\n  this._street = street;\n}\n\nvar addressProto = {\n  street: function() {\n    return this._street;\n  }\n};\n\naddressProto.street.set = function(val) {\n  this._street = val;\n};\n\nAddress.prototype = addressProto;\n\n// Phone\nfunction Phone(number) {\n  this._number = number;\n}\n\nvar phoneProto = {\n  number: function() {\n    return this._number;\n  }\n};\n\nphoneProto.number.set = function(val) {\n  this._number = val;\n};\n\nPhone.prototype = phoneProto;\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Next, we’ll add JsViews data-binding to the plain objects version of our sample, above.\n"
      },
      {
        "_type": "para",
        "title": "<b>Example: JsViews with plain objects and arrays</b>",
        "text": "Example: JsViews with plain objects and arrays\n"
      },
      {
        "_type": "code",
        "title": "Data (e.g. from JSON request):",
        "text": "Data (e.g. from JSON request):\nvar person = {\n  name: \"Pete\",\n  address: { ... },\n  phones: [{...}, ...] \n};\n"
      },
      {
        "_type": "template",
        "title": "Template with data-linking:",
        "text": "Template with data-linking:\n... \n\n...\n\n...\n{^{for phones}}\n  ...      \n    \n  ...\n{{/for}}\n...\n\n"
      },
      {
        "_type": "sample",
        "title": "Render and link template directly against plain objects...",
        "text": "Render and link template directly against plain objects...\nRender and link template\n\nvar tmpl = $.templates(\"#personTmpl\");\ntmpl.link(\"#result\", person);\n\n"
      },
      {
        "_type": "para",
        "title": "observeAll for plain objects and arrays",
        "text": "observeAll for plain objects and arrays\nOur data-linked sample includes the Change Log idea, copied over from the samples on the observeAll/unobserveAll topics.\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\n(You’ll see below how observeAll works identically for observing hierarchies of View Model instances or for observing hierarchies of plain objects).\n"
      },
      {
        "_type": "para",
        "title": "Example: JsViews with View Model objects",
        "text": "Example: JsViews with View Model objects\nSo now let’s switch to the View Model approach again, but this time with JsViews data-linking.\n"
      },
      {
        "_type": "code",
        "title": "Data: View Model object hierarchy",
        "text": "Data: View Model object hierarchy\nvar person = new Person(\n  \"Pete\",\n  new Address(\n    \"1st Ave\"),\n    [\n      new Phone({number: \"111 111 1111\"}),\n      new Phone({number:\"222 222 2222\"})\n    ]\n  );\n"
      },
      {
        "_type": "para",
        "title": "Template",
        "text": "Template\nAs with JsRender above, to convert our template from using plain objects to using View Model objects, the only change we need to make is to add parens for our properties, which are now getter/setter functions.\nThis applies equally to data-link expressions, such as <input data-link=\"address()^street() trigger=true\" >:\n"
      },
      {
        "_type": "template",
        "title": "Template",
        "text": "Template\n... \n\n...\n\n...\n{^{for phones()}}\n  ...      \n    \n  ...\n{{/for}}\n...\n\n"
      },
      {
        "_type": "sample",
        "title": "Render and link template against a View Model object hierarchy",
        "text": "Render and link template against a View Model object hierarchy\nInstantiate View Model hierarchy\n\nvar person = new Person(...);\n\nRender and link template against person object\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\n\nMake observable changes:\n\n$.observable(person).setProperty({\n  address: new Address(\"New Street\"),\n  phones: [new Phone(\"123 123 1234\")]\n});\n\n// View Model class definitions:\n\n// Person\nfunction Person(name, address, phones) {\n  this._name = name;\n  this._address = address;\n  this._phones = phones;\n}\n\nvar personProto = {\n  name: function() {\n    return this._name;\n  },\n  phones: function() {\n    return this._phones;\n  },\n  address: function() {\n    return this._address;\n  }\n};\n\npersonProto.name.set = function(val) {\n  this._name = val;\n};\n\npersonProto.address.set = function(val) {\n  this._address = val;\n};\n\npersonProto.phones.set = function(val) {\n  this._phones = val;\n};\n\nPerson.prototype = personProto;\n\n// Address\nfunction Address(street) {\n  this._street = street;\n}\n\nvar addressProto = {\n  street: function() {\n    return this._street;\n  }\n};\n\naddressProto.street.set = function(val) {\n  this._street = val;\n};\n\nAddress.prototype = addressProto;\n\n// Phone\nfunction Phone(number) {\n  this._number = number;\n}\n\nvar phoneProto = {\n  number: function() {\n    return this._number;\n  }\n};\n\nphoneProto.number.set = function(val) {\n  this._number = val;\n};\n\nPhone.prototype = phoneProto;\n\n"
      },
      {
        "_type": "para",
        "title": "Using observe and observeAll APIs with View Model hierarchies",
        "text": "Using observe and observeAll APIs with View Model hierarchies\nThe Change Log feature above is showing us ALL the changes to View Model instances, even as we structurally modify the tree by adding and removing objects from arrays, setting structured values to properties, etc.\nThis is achieved with exactly the same call to observeAll/unobserveAll that we used above for plain objects:\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\n"
      },
      {
        "_type": "para",
        "title": "Using $.observe() APIs with View Model objects",
        "text": "Using $.observe() APIs with View Model objects\nSimilarly you can use the observe() APIs to observe specific properties of View Model objects.\n// Observe changes to name, address and phones properties of <em>person</em> object\n$.observe(person, \"name\", \"phones\", \"address\",changeHandler); \n\n// Observe array changes <em>person.phones()</em>\n$.observe(person.phones(), changeHandler);\n\n// Observe changes to street property of <em>person.address()</em> object.\n$.observe(person.address(), \"street\", changeHandler);\n\nor equivalently:\n$.observe(person, \"name\", \"phones\", \"address\", person.phones(), person.address(), \"street\", changeHandler);\n\nHere it is in a sample:\n"
      },
      {
        "_type": "sample",
        "title": "Using $.observe() to observe View Model objects",
        "text": "Using $.observe() to observe View Model objects\nObserve specific properties on specific objects\n\n$.observe(person, \"name\", \"phones\", \"address\", person.phones(), person.address(), \"street\", changeHandler);\n\n// View Model class definitions:\n\n// Person\nfunction Person(name, address, phones) {\n  this._name = name;\n  this._address = address;\n  this._phones = phones;\n}\n\nvar personProto = {\n  name: function() {\n    return this._name;\n  },\n  phones: function() {\n    return this._phones;\n  },\n  address: function() {\n    return this._address;\n  }\n};\n\npersonProto.name.set = function(val) {\n  this._name = val;\n};\n\npersonProto.address.set = function(val) {\n  this._address = val;\n};\n\npersonProto.phones.set = function(val) {\n  this._phones = val;\n};\n\nPerson.prototype = personProto;\n\n// Address\nfunction Address(street) {\n  this._street = street;\n}\n\nvar addressProto = {\n  street: function() {\n    return this._street;\n  }\n};\n\naddressProto.street.set = function(val) {\n  this._street = val;\n};\n\nAddress.prototype = addressProto;\n\n// Phone\nfunction Phone(number) {\n  this._number = number;\n}\n\nvar phoneProto = {\n  number: function() {\n    return this._number;\n  }\n};\n\nphoneProto.number.set = function(val) {\n  this._number = val;\n};\n\nPhone.prototype = phoneProto;\n\n"
      },
      {
        "_type": "para",
        "title": "Chained paths with plain objects or with View Model objects",
        "text": "Chained paths with plain objects or with View Model objects\nWith plain object hierarchies you can use chained paths in both templates, and observe() paths:\n<input data-link=\"address^street trigger=true\" />\n\n$.observe(person, \"address^street\", changeHandler);\n\nBut for View Model hierarchies, you can only used chained paths in templates:\n<input data-link=\"address()^street() trigger=true\" />\n\nFor the corresponding $.observe() calls you must pass in each View Model object and observe its properties, rather than using a chained path. Parens are not supported within $.observe() paths.\nSo you would write:\n$.observe(person, \"address\", changeHandler);\n$.observe(person.address(), \"street\", changeHandler);\n\nor as a single call:\n$.observe(person, \"address\", person.address(), \"street\", changeHandler);\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "explore/ajax": {
    "sections": []
  },
  "explore/observabledata": {
    "sections": []
  },
  "explore/computed": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/dependencies": {
    "sections": []
  },
  "explore/templates": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/composition": {
    "sections": []
  },
  "explore/views": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/viewhierarchy": {
    "sections": []
  },
  "explore/renderorlink": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/renderasstring": {
    "sections": []
  },
  "explore/linkingtohtml": {
    "sections": []
  },
  "explore/data-link": {
    "sections": []
  },
  "explore/inlinebinding": {
    "sections": []
  },
  "explore/helpers": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/registerhelper": {
    "sections": []
  },
  "explore/passhelper": {
    "sections": []
  },
  "explore/helperpaths": {
    "sections": []
  },
  "explore/converters": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/jsr-converter": {
    "sections": []
  },
  "explore/jsv-converter": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/jsv-converter1way": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "explore/jsv-converterback": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "explore/customtags": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/jsrcustomtags": {
    "sections": []
  },
  "explore/tagsascontrols": {
    "sections": []
  },
  "explore/tagexpressions": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/allowcode": {
    "sections": []
  },
  "explore/expressions": {
    "sections": []
  },
  "explore/expressions/datapath": {
    "sections": []
  },
  "explore/expressions/helperpath": {
    "sections": []
  },
  "explore/expressions/viewpath": {
    "sections": []
  },
  "explore/linkobservedispose": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/tag-controls": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "explore/taghierarchy": {
    "sections": []
  },
  "explore/taglifecycle": {
    "sections": []
  },
  "explore/tagmethods": {
    "sections": []
  },
  "explore/mvvm-mvp": {
    "sections": []
  },
  "interop": {
    "sections": []
  },
  "explore/globalvars": {
    "sections": [
      {
        "_type": "para",
        "title": "JsRender, JsViews and global variables",
        "text": "JsRender, JsViews and global variables\nJsRender and JsViews do not set the global var $.\nIf you are using jQuery with JsRender, JsRender defines jQuery,views, jQuery.templates, etc. but does not create any global variables.\nSo you can write:\n$.noConflict();\n\nvar template = jQuery.templates(...);\n\njQuery.views.helpers(...);\n\nIf you are not using jQuery, JsRender creates a global var: jsrender – which you use to replace the jQuery global.\nvar template = jsrender.templates(...);\n\njsrender.views.helpers(...);\n\nYou can test for JsRender as follows:\nif (window.jQuery && window.jQuery.views || window.jsrender) { \n  // JsRender is loaded\n}\n\n"
      }
    ]
  }
}