var content = $.views.documentation.content;

content.find.jsoapi = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/jsoapi")) ||
{
  "jsoapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "(Work in progress. Other topics to follow…)\n"
      },
      {
        "_type": "links",
        "title": "Modifying data:"
      },
      {
        "_type": "links",
        "title": "Responding to changes in data:"
      }
    ]
  },
  "propchange": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Use $.observable(myObject) to obtain an observable object - which provides a setProperty method for making observable changes to the object:\n$.observable(object).setProperty()\n(See also: Observable objects and arrays)\n"
      }
    ]
  },
  "setprop": {
    "sections": [
      {
        "_type": "para",
        "title": "Modifying properties of an object, observably:",
        "text": "Modifying properties of an object, observably:\nIf you pass an object to $.observable(), you obtain an observable object (a very lightweight wrapper around your object) which provides a setProperty() method.\nCall the setProperty() method to make one or more observable changes to properties on your object (or on the nested objects in the ‘object graph’ below it…):\n$.observable(person).setProperty(\"address.street\", \"Main St\");\n\n"
      },
      {
        "_type": "api",
        "title": "$.observable(myObject).setProperty(path, value)",
        "text": "$.observable(myObject).setProperty(path, value)\nMake an observable change to an object property\nModify the value of an object property\n\n$.observable(book).setProperty(\"title\", \"Hope\");\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Observable property change, with data-bound template:",
        "text": "Sample: Observable property change, with data-bound template:\nHere is a sample, using a data-linked template to respond to the observable property changes.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\nStreet: {^{:address.street}}\")\n\nModify the value of a property on a chosen path:\n\n$.observable(person).setProperty(\"address.street\", \"Main St\");\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Observable property change, with onPropertyChange handler",
        "text": "Sample: Observable property change, with onPropertyChange handler\nAnd here is a sample, using an event handler for propertyChange to respond to the observable property changes.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n$(person.address).on(\"propertyChange\", changeHandler); \n\nModify the value of a property on a chosen path:\n\n$.observable(person).setProperty(\"address.street\", \"1st Ave\");\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Observable property change, with $.observe(...)",
        "text": "Sample: Observable property change, with $.observe(...)\nThis sample uses $.observe() to listen to the observable property changes.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n$.observe(person, \"address.street\", changeHandler);\n\nModify the value of a property on a chosen path:\n\n$.observable(person).setProperty(\"address.street\", \"Main St\");\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "API: Changing multiple properties in one call:",
        "text": "API: Changing multiple properties in one call:\nYou can make observable changes to one or more properties in one call to setProperty() as follows:\n"
      },
      {
        "_type": "api",
        "title": "$.observable(myObject).setProperty({prop1: ..., prop2: ..., ...})",
        "text": "$.observable(myObject).setProperty({prop1: ..., prop2: ..., ...})\nModify the values of  one or more object properties\n\n$.observable(person).setProperty(newValues);\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Changing multiple properties in one call:",
        "text": "Sample: Changing multiple properties in one call:\nIn this sample we make changes to properties on two different objects, with a single call to setProperty().\nWe register a single listener for the observable property changes on both objects - with one call to $.observe().\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "Modify two properties, on different paths:\n\n$.observable(person).setProperty(\n  {\n    name: \"Hermione\",\n    \"address.street\": \"Main St\"\n  }\n);\n\nObserve both changes with a single $.observe() handler:\n\n$.observe(person, \"name\", \"address.street\", changeHandler); \n\n"
      }
    ]
  },
  "arrchange": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Use $.observable(myArray) to obtain an observable array - which provides methods for making observable changes to the array:\n"
      },
      {
        "_type": "links",
        "title": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also: Observable objects and arrays)\n"
      }
    ]
  },
  "insert": {
    "sections": [
      {
        "_type": "para",
        "title": "Changing an array observably: inserting items",
        "text": "Changing an array observably: inserting items\nIf you pass an array to $.observable(), you obtain an observable array (a very lightweight wrapper around your array) which provides methods for modifying the array observably, including an insert() method:\n"
      },
      {
        "_type": "api",
        "title": "$.observable(myArray).insert(index, insertedItems)",
        "text": "$.observable(myArray).insert(index, insertedItems)\nInsert or append one or more items to an array\nObservably append or insert an item, or set of items\n\n$.observable(people).insert(3, insertedItems);\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Appending to an array:",
        "text": "Sample: Appending to an array:\nHere is a sample using insert() to append an item to an array.\nA data-linked template responds to the observable array changes.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\nvar tmpl = $.templates(\"id: {{:id}}\");\n\ntmpl.link(\"#result\", things);\n\nAppend an item:\n\n$.observable(things).insert(\n  {id: \"item\" + count++}\n);\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Append one or more items",
        "text": "Sample: Append one or more items\nHere we’ll add an event handler for arrayChange to respond to the observable array changes, in addition to the template:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n$([things]).on(\"arrayChange\", changeHandler);\n\nAppend two items:\n\n$.observable(things).insert(\n  [\n    {id: \"item\" + count++},\n    {id: \"item\" + count++}\n  ]\n);\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Inserting items at a chosen index",
        "text": "Sample: Inserting items at a chosen index\nHere we modify the sample above, by specifying the index where we want to insert, rather than simply appending. We’ll also show the alternative $.observe() API for attaching our handler:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n$.observe(things, changeHandler);\n\nInsert a set of items at a chosen index:\n\n$.observable(things).insert(\n  index,\n  items\n);\n\n"
      }
    ]
  },
  "remove": {
    "sections": [
      {
        "_type": "para",
        "title": "Changing an array observably: removing items",
        "text": "Changing an array observably: removing items\nIf you pass an array to $.observable(), you obtain an observable array (a very lightweight wrapper around your array) which provides methods for modifying the array observably, including a remove() method:\n"
      },
      {
        "_type": "api",
        "title": "$.observable(myArray).remove(index, numToRemove)",
        "text": "$.observable(myArray).remove(index, numToRemove)\nRemove one or more items from an array\nObservably remove one or more items from an array\n\n$.observable(people).remove(3, 2);\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Removing the last item in the array",
        "text": "Sample: Removing the last item in the array\nHere is a sample using remove() to remove the last item to an array.\nA data-linked template responds to the observable array changes.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\nvar tmpl = $.templates(\"id: {{:id}}\");\n\ntmpl.link(\"#result\", things);\n\nRemove the last item:\n\n$.observable(things).remove();\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Removing an item at a specified index:",
        "text": "Sample: Removing an item at a specified index:\nHere we’ll add an event handler for arrayChange to respond to the observable array changes, in addition to the template:\nAnd we’ll remove an item at a specified index.\n"
      },
      {
        "_type": "sample",
        "title": "Observable array change - remove item at chosen index",
        "text": "Observable array change - remove item at chosen index\n\n$([things]).on(\"arrayChange\", changeHandler);\n\nRemove item at index 0 or index 1:\n\n$.observable(things).remove(0);\n...\n$.observable(things).remove(1);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Removing one or more items at a chosen index",
        "text": "Sample: Removing one or more items at a chosen index\nHere we modify the sample above, by specifying the number of items to remove. We’ll also show the alternative $.observe() API for attaching our handler:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n$.observe(things, changeHandler);\n\nRemove two items at index 0:\n\n$.observable(things).remove(0, 2);\n\n\n"
      }
    ]
  },
  "refresh": {
    "sections": [
      {
        "_type": "para",
        "title": "Changing an array observably: replacing all the items",
        "text": "Changing an array observably: replacing all the items\nIf you pass an array to $.observable(), you obtain an observable array (a very lightweight wrapper around your array) which provides methods for modifying the array observably, including a refresh() method:\n"
      },
      {
        "_type": "api",
        "title": "$.observable(myArray).refresh(newItems)",
        "text": "$.observable(myArray).refresh(newItems)\nRefresh an array with a modified or sorted set of items\nObservably refresh the contents of an array\n\n$.observable(people).refresh(newItems);\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Refreshing items in an array (replace or sort)",
        "text": "Sample: Refreshing items in an array (replace or sort)\nHere is a sample using refresh() to replace items within an array.\nA data-linked template responds to the observable array changes. And we’ll also add an event handler for arrayChange to respond to the observable array changes:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n$([things]).on(\"arrayChange\", changeHandler); \n\nReplacing with the same items in different order:\n\n$.observable(things).refresh(\n  things.reverse()\n);\n\nReplacing with a different set of items\n\n$.observable(things).refresh(\n  (things.length === 5 ? otherItems : items)\n);\n\n\n"
      }
    ]
  },
  "move": {
    "sections": [
      {
        "_type": "para",
        "title": "Changing an array observably: moving items",
        "text": "Changing an array observably: moving items\nIf you pass an array to $.observable(), you obtain an observable array (a very lightweight wrapper around your array) which provides methods for modifying the array observably, including a move() method:\n"
      },
      {
        "_type": "api",
        "title": "$.observable(myArray).move(oldIndex, newIndex, numToMove)",
        "text": "$.observable(myArray).move(oldIndex, newIndex, numToMove)\nMove one or more items in an array\nObservably move an item, or sequence of items, in an array.\n\n$.observable(people).move(3, 5, 2);\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Moving items in an array",
        "text": "Sample: Moving items in an array\nHere is a sample using move() to move items within an array.\nA data-linked template responds to the observable array changes. And we’ll also add an event handler for arrayChange to respond to the observable array changes:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n$([things]).on(\"arrayChange\", changeHandler); \n\nMoving one item from index 2 to index 0:\n\n$.observable(things).move(2, 0);\n\nMoving two items from index 0 to index 1:\n\n$.observable(things).move(0, 1, 2);\n\n"
      }
    ]
  },
  "observeobjectsarrays": {
    "sections": [
      {
        "_type": "links",
        "title": "Handling change events for objects and arrays:"
      }
    ]
  },
  "onpropchange": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews and JsObservable raise a jQuery event: “propertyChange”, whenever an object changes observably.\nTo handle the propertyChange changes you have two alternatives:\n\nuse jQuery .on() to attach an event handler to the object\nuse $.observe() to associate a handler with the object, or with a path including the object\n"
      },
      {
        "_type": "code",
        "title": "Using jQuery .on()",
        "text": "Using jQuery .on()\n$(myObject).on(\"propertyChange\", myHandler);\n"
      },
      {
        "_type": "para",
        "title": "Using <a href=\"#observe\">$.observe()</a>",
        "text": "Using $.observe()\n$.observe(myObject, \"*\" , changeHandler); // Choose path \"*\" to listen to changes on all properties of myObject \n\nThis approach also brings some advantages if you want to listen to changes on more than one object or array, or if you want to listen to “deep changes” on a path - i.e. changes not only on the leaf, but on objects higher up the path…\n"
      },
      {
        "_type": "api",
        "title": "function myHandler(ev, eventArgs) { ... }",
        "text": "function myHandler(ev, eventArgs) { ... }\nAn event handler for propertyChange events\nHandler for JsViews observable property change events\n\n$(person).on(\"propertyChange\", myHandler); \n\n"
      },
      {
        "_type": "sample",
        "title": "Handling property change events",
        "text": "Handling property change events\nAdd a handler for propertyChange events on the person object:\n$(person).on(\"propertyChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = ... + eventArgs.path + ... + eventArgs.value ...;\n  ...\n}\n\n\n"
      }
    ]
  },
  "onarrchange": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews and JsObservable raise a jQuery event: “arrayChange”, whenever an array changes observably.\nTo handle the arrayChange changes you have two alternatives:\n\nuse jQuery .on() to attach an event handler to the array\nuse $.observe() to associate a handler with the array, or with a path including the array\n"
      },
      {
        "_type": "para",
        "title": "Using jQuery .on()",
        "text": "Using jQuery .on()\n$([myArray]).on(\"arrayChange\", myHandler);\n\n(Note the syntax with the wrapped array: $([myArray]).on();. If you write $(myArray).on(); you will be listening to each item in the array, not to the array itself).\n"
      },
      {
        "_type": "para",
        "title": "Using <a href=\"#observe\">$.observe()</a>",
        "text": "Using $.observe()\n$.observe(myArray, changeHandler); \n\nThis approach also brings some advantages if you want to listen to changes on more than one object or array, or if you want to listen to “deep changes” on a path - i.e. changes not only on the leaf, but on objects higher up the path…\n"
      },
      {
        "_type": "api",
        "title": "function myHandler(ev, eventArgs) { ... }",
        "text": "function myHandler(ev, eventArgs) { ... }\nAn event handler for arrayChange events\nHandler for JsViews observable array change events\n\n$([myArray]).on(\"arrayChange\", myHandler); \n\n"
      },
      {
        "_type": "para",
        "title": "Samples for the <b>handling array change events</b>:",
        "text": "Samples for the handling array change events:\nEach of the following API topics includes samples showing the arrayChange event handler for the corresponding type of array change:\n\n$.observable(array).insert()\n$.observable(array).remove()\n$.observable(array).move()\n$.observable(array).refresh()\n"
      }
    ]
  },
  "observe": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Whenever objects or arrays are changed observably, JsViews raises the corresponding propertyChange or arrayChange jQuery event.\nData-linked templates respond to those events automatically, but if you want to run code in response to data-change events you have two alternatives:\n\nuse jQuery .on() to attach the propertyChange or arrayChange event handler to any object or array you want to 'listen to'\nuse $.observe() to associate a handler with one or more objects, arrays, or paths\n"
      },
      {
        "_type": "para",
        "title": "Using $.observe()",
        "text": "Using $.observe()\n$.observe(myObjectOrArray, ..., changeHandler);\n\nThis approach allows you to register a single handler to listen to changes on multiple targets, which can include both objects and arrays.\n"
      },
      {
        "_type": "para",
        "title": "Examples:",
        "text": "Examples:\n1. Observe changes to a specific property:\n$.observe(person, \"firstName\", changeHandler);\n\n2. Observe changes to a specific property of type array:\n$.observe(person, \"phones\", changeHandler);\n\nHere changeHandler will handle both:\n\narray changes, and \nsetting a new value to the property (switching to a new array, or setting to null or undefined)\n\n3. Observe changes to any property on an object:\n$.observe(person, \"*\", changeHandler);\n\nHere changeHandler will handle both:\n\narray changes, and \nsetting a new value to the property (switching to a new array, or setting to null or undefined)\n\n4. Observe changes on an array:\n$.observe(person.phones, changeHandler); \n\n5. Observe multiple objects/properties/arrays:\n$.observe(person, \"lastName\", \"phones\", \"address.street\", changeHandler);\n\nHere changeHandler will handle both:\n\nchanges to lastName \narray changes to the current phones (array), or changes if a new array is assigned to the phones property\nchanges to the street property of the address property of person\n\n6. Observe paths under more than object:\n$.observe(person1, \"lastName\", \"address.*\", person2, \"firstName\", person3, \"*\", \"address.*\", changeHandler);\n\nHere changeHandler handles:\n\nfor person1: changes to lastName and any address property \nfor person2: changes to firstName\nfor person3: changes to any property of the person3 object itself, and to any property of the person3.address object\n\n"
      },
      {
        "_type": "para",
        "title": "Paths: leaf changes or deep changes",
        "text": "Paths: leaf changes or deep changes\nBy default you listen to the leaf of a path, but you can specify if you want to listen to listen also to changes on objects higher up the path…\nFor example, here:\n$.observe(team, \"manager.address.street\", changeHandler);\n\nchangeHandler will be called if the value of the street property of the team.manager.address object changes. So it is listening to leaf changes on the path “manager.address.street”.\nIt will not be called if the team.manager property is swapped to a different manager object, or if the team.manager.address property is swapped to a different address object.\nBut by a simple syntax change, the path can be made to listen to changes not only on the leaf property, but also changes on objects higher up the path. These are deep changes on the path:\nFor example, this path:\n$.observe(team, \"manager.address^street\", changeHandler);\n\nwill listen to changes to the street property of address, or the address property of manager.\nAnd the following:\n$.observe(team, \"manager^address.street\", changeHandler);\n\nwill listen to changes to the street property of address, the address property of manager, and the manager property of team.\nSimply replace a . with a ^ at the level up to which you want to listen to changes.\n(If you know that in your app the objects higher up the path will never change dynamically, then stick with the default leaf binding, since that will provide better perf optimization…)\n"
      },
      {
        "_type": "api",
        "title": "$.observe(objectOrArray, ..., myHandler)",
        "text": "$.observe(objectOrArray, ..., myHandler)\nRegister a handler for observable changes on one or more objects or data paths\nHandle observable property or array change events\n\n$.observe(person, \"address.street\", myHandler); \n\nHandle all property change events on an object\n\n$.observe(person, \"*\", myHandler); \n\nHandle array change events on an array\n\n$.observe(phones, myHandler); \n\n"
      },
      {
        "_type": "api",
        "title": "function myHandler(ev, eventArgs) { ... }",
        "text": "function myHandler(ev, eventArgs) { ... }\nAn event handler for observable data changes - registered using $.observe(...) or $.observable(object).observeAll(...)\nHandler for observable property or array change events\n\n$.observe(person, \"address.street\", myHandler); \n\n"
      },
      {
        "_type": "para",
        "title": "Samples:",
        "text": "Samples:\nHere is a sample showing $.observe(person, \"name\", \"address^*\", changeHandler);\n"
      },
      {
        "_type": "sample",
        "title": "Handling change events using $.observe()",
        "text": "Handling change events using $.observe()\nRegister a handler for changes: \nWe handle changes in the name  and address properties of the person, and any property of the address:\n$.observe(person, \"name\", \"address^*\", changeHandler);\n\n\nDefine the handler:\n\nfunction changeHandler(ev, eventArgs) {\n  var message = ... + eventArgs.path + ... + eventArgs.value ...;\n  ...\n}\n\nTemplate also binds to 'deep paths'\n\n\n\nModify values through template binding or buttons:\n\n$(\"#changeAddress\").on(\"click\", function() {\n  $.observable(person).setProperty(\n    \"address\", \n    {\n      street: \"New Street\",\n      ZIP: \"99999\"\n    }\n...\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now we modify the above sample to show $.observe(person, ...) also handling array properties: a phones property of person\n"
      },
      {
        "_type": "sample",
        "title": "Handling both property change and array change events, using $.observe()",
        "text": "Handling both property change and array change events, using $.observe()\nRegister a handler for changes: \nWe handle changes in the name, address and phones properties of the person, and the street property of the address.\nBecause the phones property is itself an array, we also handle array changes on the phones array:\n$.observe(person, \"name\", \"address^street\", \"phones\", changeHandler);\n\n\nDefine our handler:\n(Note that it outputs all the fields of eventArgs)\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  for (var key in eventArgs) {\n    message += ... key ... eventArgs[key]...\n  }\n  ...\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "But notice that if you change the value of a phone number, our handler does not ‘listen’ to that change.\nThe observeAll() API provides a very simple way include those changes too.\n"
      },
      {
        "_type": "links",
        "title": "See also:"
      }
    ]
  },
  "unobserve": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "A single call to $.observe(... myHandler) will attach the handler to one or more objects and arrays - to listen to corresponding propertyChange or arrayChange events.\nThe same call (same parameters) but with $.unobserve(...) instead of $.observe(...) will remove the handler from each of those objects.\n"
      },
      {
        "_type": "api",
        "title": "$.unobserve(objectOrArray, ..., myHandler)",
        "text": "$.unobserve(objectOrArray, ..., myHandler)\nUnregister a handler for observable changes on one or more objects or data paths\nRemove handler for observable  changes on specific paths\n\n$.unobserve(person, \"address.street\", myHandler); \n\nRemove all handlers for all observable changes to target object/array\n\n$.unobserve(person); \n\nRemove any handlers targetting specific properties or paths\n\n$.unobserve(person, \"address.street\");\n\n"
      },
      {
        "_type": "para",
        "title": "Samples:",
        "text": "Samples:\nHere is a copy of a sample from the $.observe() topic, on which we have used observe/unobserve to provide an enable/disable checkbox on the Change Log:\n"
      },
      {
        "_type": "sample",
        "title": "Using $.unobserve() to remove handlers",
        "text": "Using $.unobserve() to remove handlers\n<input type=\"checkbox\" checked id=\"attach\"/>\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\n\nCall unobserve() with the same paths and handler, to stop 'listening'...\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observe(person, \"name\", \"address^*\", changeHandler);\n  } else {\n    $.unobserve(person, \"name\", \"address^*\", changeHandler);\n  }\n}\n\n"
      },
      {
        "_type": "para",
        "title": "$.unobserve() variants",
        "text": "$.unobserve() variants\nOmitting the handler and paths:\n$.unobserve(object)\n\nThe above call will remove all change handlers from the object. For example, if you choose Try it in the sample above, and replace the unobserve call by $.unobserve(person); you’ll see that unchecking has the effect of removing JsViews data-link binding in the template too.\nOmitting handler but keeping paths:\n$.unobserve(person, \"name\");\n\nThe above call will remove all bindings of person.name, so choosing Try it and making that change will stop the name binding for both template and message log, but both will continue to respond to changes in address or zip.\nunobserve using “*”:\n$.unobserve(person, \"*\", changeHandler);\n\nThe above call will remove handlers for all properties of person, so choosing Try it and making that change will stop the changes to name or setting the address from showing in the log, but changes in street or zip on the address object will still show.\nunobserving arrays, or multiple objects\n$.unobserve(person, \"name\", person.phones, changeHandler);\n\nThe above call will stop handing changes to person.name, and will stop listening to array change events on the person.phones array. You can test it by choosing Try it on the sample below, (based on the last sample in the $.observe() topic):\nAnd this variant is almost the same:\n$.unobserve(person, \"name\", \"phones\", changeHandler);\n\n– but in addition it will stop listening to setting the phones property of person\n"
      },
      {
        "_type": "sample",
        "title": "Modified sample showing also unobserve() for arrays:",
        "text": "Modified sample showing also unobserve() for arrays:\nCall unobserve with the same paths and handler, to stop 'listening'..\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observe(person, \"name\", \"address^street\", \"phones\", changeHandler);\n  } else {\n    $.unobserve(person, \"name\", \"address^street\", \"phones\", changeHandler);\n  }\n}\n\n"
      },
      {
        "_type": "links",
        "title": "See also:"
      }
    ]
  },
  "$observable": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In current JavaScript implementations, modifying objects or arrays does not raise any event, so there is no way for the change to be detected elsewhere.\nJsViews dynamic data-bound UI solves this through data-linking, using the JsObservable observer pattern.\n$.observable() provides a way for you to change objects or arrays observably. Each change will raise a property change or array change event.\nJsViews uses those events to make any data-linked tags or elements in your templates update automatically in response to each change in your underlying data.\nIn addition, it ensures that those events are raised when the user interacts with a data-linked template, and causes changes to the underlying data.\nJsViews also lets you register event handlers or listeners, so your code can listen to the observable changes made to your data objects or view models.\n"
      },
      {
        "_type": "para",
        "title": "$.observable(myObject) and $.observable(myArray)",
        "text": "$.observable(myObject) and $.observable(myArray)\nIf you pass an object to $.observable() then you obtain an observable object (a very lightweight wrapper around your object), which provides a method for modifying object properties observably:\n\nsetProperty\n\nSimilarly, if you pass an array to $.observable() then you obtain an observable array (a lightweight wrapper around your array) which provides a different set of methods, specific to modifying arrays:\n\ninsert\nremove\nmove\nrefresh\n\nNote that you don’t need hold on to the observable wrapped object for reuse. It is so lightweight you can just call $.observable(...) again every time you need to make further changes to your object or array.\n"
      }
    ]
  },
  "observeAll": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The .observeAll() API allows you to register a single handler to listen to all the changes under a chosen object or array.\nThis means that no matter how complex the hierarchy of objects under the targeted object or array, and no matter how complex the structural changes made to that object hierarchy, the handler will continue to listen to any change on any object or array in the tree.\n$.observable(myObjectOrArray).observeAll(myHandler)\n\n"
      },
      {
        "_type": "api",
        "title": "$.observable(objectOrArray).observeAll(myHandler)",
        "text": "$.observable(objectOrArray).observeAll(myHandler)\nRegister an event handler to observe all changes in an object and on any nested object or array in the 'object graph'  under it\nObserve all changes under an object or array\n\n$.observable(person).observeAll(myHandler)\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The myHandler function registered using the .observeAll() is identical to the handler used with $.observe():\n"
      },
      {
        "_type": "api",
        "title": "function myHandler(ev, eventArgs) { ... }",
        "text": "function myHandler(ev, eventArgs) { ... }\nAn event handler for observable data changes - registered using $.observe(...) or $.observable(object).observeAll(...)\nHandler for observable property or array change events\n\n$.observe(person, \"address.street\", myHandler); \n\n"
      },
      {
        "_type": "para",
        "title": "Sample:",
        "text": "Sample:\nWe’ll use the observeAll() API to update our last sample in the $.observe() topic, so that now we will be able to include listening to newly added items in the phone array, which we were not able to achieve in our previous version…:\n"
      },
      {
        "_type": "sample",
        "title": "Handling both property change and array change events, using .observeAll()",
        "text": "Handling both property change and array change events, using .observeAll()\nA single observeAll() call for observing all the objects\nEven phone objects added to the phones array will automatically be ‘listened’ to by our handler, without us needing to write any additional code.\n$.observable(person).observeAll(changeHandler);\n\n\nDefine our handler:\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"observeAll path: \" + ev.data.observeAll.path() + \"\"\n  }\n  for (var key in eventArgs) {\n    message += ... key ... eventArgs[key]...\n  }\n  ...\n}\n\n"
      },
      {
        "_type": "para",
        "title": "observeAll() with View Model object hierarchies",
        "text": "observeAll() with View Model object hierarchies\nThe observeAll() API works equally well with View Model objects or plain objects. See plain objects or View Model. At the end of that topic we show our observeAll() sample above, using View Model objects.\n"
      },
      {
        "_type": "links",
        "title": "See also:"
      }
    ]
  },
  "unobserveAll": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Just as $.observable(objectOrArray).observeAll(myHandler) will traverse the whole hierarchy of objects or arrays under the root objectOrArray and attach the handler to each object, similarly $.observable(objectOrArray).unobserveAll(myHandler) will traverse the whole hierarchy and remove the handler from any object to which it has been attached.\n"
      },
      {
        "_type": "api",
        "title": "$.observable(objectOrArray).unobserveAll(myHandler)",
        "text": "$.observable(objectOrArray).unobserveAll(myHandler)\nRemove a handler for observable changes, from an object or array, and from any nested objects or arrays under it\nRemove handler from object/array and from all nested objects\n\n$.observable(person).unobserveAll(myHandler); \n\nRemove all handlers for observable changes, from  an object/array and from all nested objects\n\n$.observable(person).unobserveAll(); \n\n"
      },
      {
        "_type": "para",
        "title": "Samples:",
        "text": "Samples:\nHere is a copy of a sample from the .observeAll() topic, on which we have used observeAll/unobserveAll to provide an enable/disable checkbox on the Change Log:\n"
      },
      {
        "_type": "sample",
        "text": "<input type=\"checkbox\" checked id=\"attach\"/>\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\n\nCall unobserveAll() on the root, to stop 'listening'...\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\n"
      },
      {
        "_type": "para",
        "title": "$.unobserveAll() variant",
        "text": "$.unobserveAll() variant\nOmitting the handler:\n$.observable(objectOrArray).unobserveAll()\n\nThe above call will remove all change handlers from the object, and any nested objects.\nTo test it, you can choose Try it in the sample above, and replace the unobserveAll call by $.observable(person).unobserveAll();\nYou’ll see that unchecking will then have the effect of removing not only the logging handler, but also the JsViews data-link binding handler used in the template. Now, changes will trigger neither log messages, nor template updates.\n"
      },
      {
        "_type": "para",
        "title": "unobserveAll() with View Model object hierarchies",
        "text": "unobserveAll() with View Model object hierarchies\nThe unobserveAll() API works equally well with View Model objects or plain objects. See plain objects or View Model. At the end of that topic we show our unobserveAll() sample above, using View Model objects.\n"
      },
      {
        "_type": "links",
        "title": "See also:"
      }
    ]
  }
}