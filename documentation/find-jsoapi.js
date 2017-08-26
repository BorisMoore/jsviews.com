var content = $.views.documentation.content;

content.find.jsoapi = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/jsoapi")) ||
{
  "jsoapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "For an introductory overview see the Making observable changes and Responding to changes sections in JsViews Quickstart.\n"
      },
      {
        "_type": "links",
        "title": "Modifying data:",
        "text": "Modifying data:\n"
      },
      {
        "_type": "links",
        "title": "Responding to changes in data:",
        "text": "Responding to changes in data:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "propchange": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Use $.observable(myObject) to obtain an observable object – which provides a setProperty method and a removeProperty method for making observable changes to the object:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also: Observable objects and arrays)\n"
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
        "text": "set to new value\nset back to original value\n\n\nvar person = {\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"Main St\");\n});\n\n$(\"#revert\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"1st Ave\");\n});\n\nvar tmpl = $.templates(\"Street: {^{:address.street}}\");\n\ntmpl.link(\"#result\", person);\n\n\nStreet: {^{:address.street}}\")\n\nModify the value of a property on a chosen path:\n\n$.observable(person).setProperty(\"address.street\", \"Main St\");\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Observable property change, with onPropertyChange handler",
        "text": "Sample: Observable property change, with onPropertyChange handler\nAnd here is a sample, using an event handler for propertyChange to respond to the observable property changes.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "set to new value\nset back to original value\n\n\nvar person = {\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"Main St\");\n});\n\n$(\"#revert\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"1st Ave\");\n});\n\n$(person.address).on(\"propertyChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The '\" + eventArgs.path + \"' is '\" + eventArgs.value + \"'.\";\n  $(\"#messages\").append(message + \"\");\n}\n\n$(person.address).on(\"propertyChange\", changeHandler); \n\nModify the value of a property on a chosen path:\n\n$.observable(person).setProperty(\"address.street\", \"1st Ave\");\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Observable property change, with $.observe(...)",
        "text": "Sample: Observable property change, with $.observe(...)\nThis sample uses $.observe() to listen to the observable property changes.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "set to new value\nset back to original value\n\n\nvar person = {\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"Main St\");\n});\n\n$(\"#revert\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"1st Ave\");\n});\n\n$.observe(person, \"address.street\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The '\" + eventArgs.path + \"' is '\" + eventArgs.value + \"'.\";\n  if (ev.data) {\n    message += \"\\n\\nThe full path is '\" + ev.data.fullPath + \"'.\";\n  }\n  $(\"#messages\").append(message + \"\");\n}\n\n$.observe(person, \"address.street\", changeHandler);\n\nModify the value of a property on a chosen path:\n\n$.observable(person).setProperty(\"address.street\", \"Main St\");\n\n"
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
        "text": "Sample: Changing multiple properties in one call:\nIn this sample we make changes to properties on two different objects, with a single call to setProperty().\nWe register a single listener for the observable property changes on both objects – with one call to $.observe().\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "Set new values\nReturn to original values\n\n\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n\n  $.observable(person).setProperty(\n    {\n      name: \"Hermione\",\n      \"address.street\": \"Main St\"\n    }\n  );\n\n});\n\n$(\"#revert\").on(\"click\", function() {\n\n  $.observable(person).setProperty(\n    {\n      name: \"Pete\",\n      \"address.street\": \"1st Ave.\"\n    }\n  );\n\n});\n\n$.observe(person, \"name\", \"address.street\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The '\" + eventArgs.path + \"' is '\" + eventArgs.value + \"'.\";\n  if (ev.data) {\n    message += \"\\n\\nThe full path is '\" + ev.data.fullPath + \"'.\";\n  }\n  $(\"#messages\").append(message + \"\");\n}\nModify two properties, on different paths:\n\n$.observable(person).setProperty(\n  {\n    name: \"Hermione\",\n    \"address.street\": \"Main St\"\n  }\n);\n\nObserve both changes with a single $.observe() handler:\n\n$.observe(person, \"name\", \"address.street\", changeHandler); \n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "arrchange": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Use $.observable(myArray) to obtain an observable array – which provides methods for making observable changes to the array:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
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
        "text": "\n  Append an item\n  \n\nvar things = [{id: \"item1\"}, {id: \"item2\"}],\n  count = 3;\n\n$(\"#append\").on(\"click\", function() {\n  $.observable(things).insert(\n    {id: \"item\" + count++}\n  );\n});\n\n$(\"#insert2\").on(\"click\", function() {\n  $.observable(things).insert(\n    [\n      {id: \"item\" + count++},\n      {id: \"item\" + count++}\n    ]\n  );\n});\n\nvar tmpl = $.templates(\"id: {{:id}}\");\n\ntmpl.link(\"#result\", things);\n\nvar tmpl = $.templates(\"id: {{:id}}\");\n\ntmpl.link(\"#result\", things);\n\nAppend an item:\n\n$.observable(things).insert(\n  {id: \"item\" + count++}\n);\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Append one or more items",
        "text": "Sample: Append one or more items\nHere we’ll add an event handler for arrayChange to respond to the observable array changes, in addition to the template:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  Append an item\n  Append two items\n  \n\n\n\n  Changes:\n  \n\nvar things = [{id: \"item1\"}, {id: \"item2\"}],\n  count = 3;\n\n$(\"#append1\").on(\"click\", function() {\n  $.observable(things).insert(\n    {id: \"item\" + count++}\n  );\n});\n\n$(\"#append2\").on(\"click\", function() {\n  $.observable(things).insert(\n    [\n      {id: \"item\" + count++},\n      {id: \"item\" + count++}\n    ]\n  );\n});\n\nvar tmpl = $.templates(\"id: {{:id}}\");\n\ntmpl.link(\"#result\", things);\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) added at index: \" + eventArgs.index;\n  $(\".messages\").append(\"\" + message + \"\");\n}\n\n$([things]).on(\"arrayChange\", changeHandler);\n\nAppend two items:\n\n$.observable(things).insert(\n  [\n    {id: \"item\" + count++},\n    {id: \"item\" + count++}\n  ]\n);\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Inserting items at a chosen index",
        "text": "Sample: Inserting items at a chosen index\nHere we modify the sample above, by specifying the index where we want to insert, rather than simply appending. We’ll also show the alternative $.observe() API for attaching our handler:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  Insert item at index 1\n  Prepend 2 items\n  \n\n\n\n  Changes:\n  \n\nvar things = [{id: \"item1\"}, {id: \"item2\"}],\n  count = 3;\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(things).insert(\n    1,\n    {id: \"item\" + count++}\n  );\n});\n\n$(\"#prepend\").on(\"click\", function() {\n  $.observable(things).insert(\n    0,\n    [\n      {id: \"item\" + count++},\n      {id: \"item\" + count++}\n    ]\n  );\n});\n\nvar tmpl = $.templates(\"id: {{:id}}\");\n\ntmpl.link(\"#result\", things);\n\n$.observe(things, changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) added at index: \" + eventArgs.index;\n  $(\".messages\").append(\"\" + message + \"\");\n}\n\n$.observe(things, changeHandler);\n\nInsert a set of items at a chosen index:\n\n$.observable(things).insert(\n  index,\n  items\n);\n\n"
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
        "text": "\n  Remove last item\n  \n\nvar things = [\n  {id: \"item1\"},\n  {id: \"item2\"},\n  {id: \"item3\"}\n];\n\n$(\"#remove\").on(\"click\", function() {\n  $.observable(things).remove();\n});\n\nvar tmpl = $.templates(\"id: {{:id}}\");\n\ntmpl.link(\"#result\", things);\n\nvar tmpl = $.templates(\"id: {{:id}}\");\n\ntmpl.link(\"#result\", things);\n\nRemove the last item:\n\n$.observable(things).remove();\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Removing an item at a specified index:",
        "text": "Sample: Removing an item at a specified index:\nHere we’ll add an event handler for arrayChange to respond to the observable array changes, in addition to the template:\nAnd we’ll remove an item at a specified index.\n"
      },
      {
        "_type": "sample",
        "title": "Observable array change &ndash; remove item at chosen index",
        "text": "Observable array change – remove item at chosen index\n\n\n\n  Remove item 0\n  Remove item 1\n  \n\n\n\n  Changes:\n  \n\nvar things = [\n  {id: \"item1\"},\n  {id: \"item2\"},\n  {id: \"item3\"}\n];\n\n$(\"#remove0\").on(\"click\", function() {\n  $.observable(things).remove(0);\n});\n\n$(\"#remove1\").on(\"click\", function() {\n  $.observable(things).remove(1);\n});\n\nvar tmpl = $.templates(\"id: {{:id}}\");\n\ntmpl.link(\"#result\", things);\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) removed at index: \" + eventArgs.index;\n  $(\".messages\").append(\"\" + message + \"\");\n}\n\n$([things]).on(\"arrayChange\", changeHandler);\n\nRemove item at index 0 or index 1:\n\n$.observable(things).remove(0);\n...\n$.observable(things).remove(1);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Removing one or more items at a chosen index",
        "text": "Sample: Removing one or more items at a chosen index\nHere we modify the sample above, by specifying the number of items to remove. We’ll also show the alternative $.observe() API for attaching our handler:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  Remove 2 items at 0\n  Remove item 1\n  \n\n\n\n  Changes:\n  \n\nvar things = [\n  {id: \"item1\"},\n  {id: \"item2\"},\n  {id: \"item3\"},\n  {id: \"item4\"}\n];\n\n$(\"#remove0\").on(\"click\", function() {\n  $.observable(things).remove(0, 2);\n});\n\n$(\"#remove1\").on(\"click\", function() {\n  $.observable(things).remove(1);\n});\n\nvar tmpl = $.templates(\"id: {{:id}}\");\n\ntmpl.link(\"#result\", things);\n\n$.observe(things, changeHandler);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) removed at index: \" + eventArgs.index;\n  $(\".messages\").append(\"\" + message + \"\");\n}\n\n$.observe(things, changeHandler);\n\nRemove two items at index 0:\n\n$.observable(things).remove(0, 2);\n\n\n"
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
        "text": "\n\n\n  Reverse sort the items\n  Replace the items\n  \n\n\n\n  Changes:\n  \n\nvar items = [\n    {id: \"item0\"},\n    {id: \"item1\"},\n    {id: \"item2\"},\n    {id: \"item3\"},\n    {id: \"item4\"}\n  ],\n  otherItems = [\n    {id: \"otherItem0\"},\n    {id: \"otherItem1\"},\n    {id: \"otherItem2\"}\n  ],\n  things = [\n    items[0],\n    items[1],\n    items[2],\n    items[3],\n    items[4]\n  ];\n\n$(\"#sort\").on(\"click\", function() {\n  $.observable(things).refresh(\n    things.slice().reverse() // copy array and reverse it\n  );\n});\n\n$(\"#replace\").on(\"click\", function() {\n  $.observable(things).refresh(\n    (things.length === 5 ? otherItems : items)\n  );\n});\n\nvar tmpl = $.templates(\"id: {{:id}}\");\n\ntmpl.link(\"#result\", things);\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  if (eventArgs.change === \"refresh\") {\n    var message = \"Previous length: \" + eventArgs.oldItems.length\n      + \". New length: \" + ev.target.length;\n\n    $(\".messages\").append(\"\" + message + \"\");\n  }\n}\n\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nReplacing with the same items in different order:\n\n$.observable(things).refresh(\n  things.slice().reverse() // copy array and reverse it\n);\n\nReplacing with a different set of items\n\n$.observable(things).refresh(\n  (things.length === 5 ? otherItems : items)\n);\n\n\n"
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
        "text": "\n\n\n  Move 1 item from index 2 to 0\n  Move 2 items from index 0 to 3\n  \n\n\n\n  Changes:\n  \n\nvar things = [\n  {id: \"item0\"},\n  {id: \"item1\"},\n  {id: \"item2\"},\n  {id: \"item3\"},\n  {id: \"item4\"}\n];\n\n$(\"#move1\").on(\"click\", function() {\n  $.observable(things).move(2, 0);\n});\n\n$(\"#move2\").on(\"click\", function() {\n  $.observable(things).move(0, 3, 2);\n});\n\nvar tmpl = $.templates(\"id: {{:id}}\");\n\ntmpl.link(\"#result\", things);\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) moved from index: \"\n  + eventArgs.oldIndex + \" to index: \" + eventArgs.index;\n  $(\".messages\").append(\"\" + message + \"\");\n}\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nMoving one item from index 2 to index 0:\n\n$.observable(things).move(2, 0);\n\nMoving two items from index 0 to index 1:\n\n$.observable(things).move(0, 1, 2);\n\n"
      }
    ]
  },
  "observeobjectsarrays": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following API topics provide ways of attaching/removing event handlers to respond to observable data changes:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "onpropchange": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews and JsObservable raise a jQuery event: “propertyChange”, whenever an object changes observably.\nTo handle the propertyChange changes you have two alternatives:\n\nuse jQuery .on() to attach an event handler to the object\nuse $.observe() or  .observeAll() to associate a handler with the object, or with a path including the object\n\n"
      },
      {
        "_type": "code",
        "title": "Using jQuery .on()",
        "text": "Using jQuery .on()\n$(myObject).on(\"propertyChange\", myHandler);\n"
      },
      {
        "_type": "para",
        "title": "Using <a href=\"#observe\">$.observe()</a> or <a href=\"#observeAll\">.observeAll()</a>",
        "text": "Using $.observe() or .observeAll()\n$.observe(myObject, \"*\" , myHandler); \n// Choose path \"*\" to listen to changes on all properties of myObject \n\nThis approach also brings some advantages if you want to listen to changes on more than one object or array, or if you want to listen to “deep changes” on a path – i.e. changes not only on the leaf, but on objects higher up the path…\nAlternatively you can use:\n$.observable(myObject).observeAll(myHandler);\n// Listen to changes on all properties and nested properties of myObject at any depth\n\n"
      },
      {
        "_type": "api",
        "title": "function myHandler(ev, eventArgs) { ... }",
        "text": "function myHandler(ev, eventArgs) { ... }\nAn event handler for propertyChange events\nHandler for JsViews observable property change events\n\n$(person).on(\"propertyChange\", myHandler); \n\n"
      },
      {
        "_type": "para",
        "title": "Arguments of the propertyChange event handler",
        "text": "Arguments of the propertyChange event handler\nfunction changeHandler(ev, eventArgs) { ... }\n\nThe first argument (ev) is the jQuery event object\nThe properties include:\n\ntarget: the object which changed\nnamespace: The setProperty() namespace\ndata: JsViews metadata:\n\n– where ev.data JsViews metadata corresponds to the observe() or observeCall() call, with properties that include:\n\nns: The handler namespace\nfullPath: the full path –- such as \"team.manager.address.street\"\nprop: the property being changed -– such as \"manager\"\npaths: array of ‘ongoing’ paths – when doing ‘deep’ binding(So if this property is part of a deep path such as \"team.manager^address.street\", and manager is being changed, the paths will include [\"address^street\"])\nobserveAll: access to additional metadata\n\n– where ev.data.observeAll, for observeAll() calls, provides methods:\n\nev.data.observeAll.path(): returns path to object being changed, e.g. \"root.team\"\nev.data.observeAll.parents(): returns ‘parent objects’ to object being changed, e.g. [team, model]\n\nThe second argument (eventArgs) is the JsViews event object for property changes\nThe properties are:\n\nchange: the string \"set\"\npath: e.g. ‘\"manager\"’\nvalue: new value of property being set\noldValue: previous value of property\n\n"
      },
      {
        "_type": "sample",
        "title": "Handling property change events",
        "text": "Handling property change events\n\n\n\n  set to new values\n  set back to original values\n  \n\n\n\n  Change Log:\n  Clear\n  \n\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty(\n    {\n      name: \"Hermione\",\n      \"address.street\": \"Main St\"\n    }\n  );\n});\n\n$(\"#revert\").on(\"click\", function() {\n  $.observable(person).setProperty(\n    {\n      name: \"Pete\",\n      \"address.street\": \"1st Ave.\"\n    }\n  );\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nvar tmpl = $.templates(\n   \"Name: \"\n + \"Street: \"\n);\n\ntmpl.link(\"#result\", person);\n\n$(person).on(\"propertyChange\", changeHandler); \n\n$(person.address).on(\"propertyChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The new '\" + eventArgs.path + \"' is '\"\n                  + eventArgs.value + \"'.\";\n\n  $(\".messages\").append(\"\" + message + \"\");\n}\nAdd a handler for propertyChange events on the person object:\n$(person).on(\"propertyChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The new '\" + eventArgs.path + \"' is '\" + eventArgs.value + \"'.\";\n  ...\n}\n\n\n"
      }
    ]
  },
  "onarrchange": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews and JsObservable raise a jQuery event: “arrayChange”, whenever an array changes observably.\nTo handle the arrayChange changes you have two alternatives:\n\nuse jQuery .on() to attach an event handler to the array\nuse $.observe() to associate a handler with the array, or with a path including the array\n\n"
      },
      {
        "_type": "para",
        "title": "Using jQuery .on()",
        "text": "Using jQuery .on()\n$([myArray]).on(\"arrayChange\", myHandler);\n\n(Note the syntax with the wrapped array: $([myArray]).on();. If you write $(myArray).on(); you will be listening to each item in the array, not to the array itself).\n"
      },
      {
        "_type": "para",
        "title": "Using <a href=\"#observe\">$.observe()</a>",
        "text": "Using $.observe()\n$.observe(myArray, myHandler); \n\nThis approach also brings some advantages if you want to listen to changes on more than one object or array, or if you want to listen to “deep changes” on a path – i.e. changes not only on the leaf, but on objects higher up the path…\n"
      },
      {
        "_type": "api",
        "title": "function myHandler(ev, eventArgs) { ... }",
        "text": "function myHandler(ev, eventArgs) { ... }\nAn event handler for arrayChange events\nHandler for JsViews observable array change events\n\n$([myArray]).on(\"arrayChange\", myHandler); \n\n"
      },
      {
        "_type": "para",
        "title": "Arguments of the arrayChange event handler",
        "text": "Arguments of the arrayChange event handler\nfunction changeHandler(ev, eventArgs) { ... }\n\nThe first argument (ev) is the jQuery event object\nThe properties include:\n\ntarget: the object which changed\nnamespace: The insert()/remove()/move()/refresh() namespace\ndata: JsViews metadata:\n\n– where ev.data JsViews metadata corresponds to the observe() or observeCall() call, with properties that include:\n\nns: The handler namespace\nobserveAll: access to additional metadata\n\n– where ev.data.observeAll, for observeAll() calls, provides methods:\n\nev.data.observeAll.path(): returns path to object being changed - e.g. \"root.team\"\nev.data.observeAll.parents(): returns ‘parent objects’ to object being changed, e.g. [team, model]\n\nThe second argument (eventArgs) is the JsViews event object for array changes\nThe properties are specific to the ‘change’ type:\n\nFor insert(): index and items. (With change=\"insert\")\nFor remove(): index and numToRemove. (With change=\"remove\")\nFor move(): oldIndex, index and items. (With change=\"move\")\nFor refresh(): oldItem. (With change=\"refresh\")\n\n"
      },
      {
        "_type": "para",
        "title": "Samples for the <b>handling array change events</b>:",
        "text": "Samples for the handling array change events:\nEach of the following API topics includes samples showing the arrayChange event handler for the corresponding type of array change:\n\n$.observable(array).insert()\n$.observable(array).remove()\n$.observable(array).move()\n$.observable(array).refresh()\n\n"
      }
    ]
  },
  "observe": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Whenever objects or arrays are changed observably, JsViews raises the corresponding propertyChange or arrayChange jQuery event.\nData-linked templates respond to those events automatically, but if you want to run code in response to data-change events you have two alternatives:\n\nuse jQuery .on() to attach the propertyChange or arrayChange event handler to any object or array you want to ‘listen to’\nuse $.observe() to associate a handler with one or more objects, arrays, or paths\n\n"
      },
      {
        "_type": "para",
        "title": "Using $.observe()",
        "text": "Using $.observe()\n$.observe(myObjectOrArray, ..., myHandler);\n\nThis approach allows you to register a single handler to listen to changes on multiple targets, which can include both objects and arrays.\n"
      },
      {
        "_type": "para",
        "title": "Examples:",
        "text": "Examples:\n1. Observe changes to a specific property:\n$.observe(person, \"firstName\", myHandler);\n\n2. Observe changes to a specific property of type array:\n$.observe(person, \"phones\", myHandler);\n\nHere myHandler will handle both:\n\narray changes, and \nsetting a new value to the property (switching to a new array, or setting to null or undefined)\n\n3. Observe changes to any property on an object:\n$.observe(person, \"*\", myHandler);\n\n(For properties of type array, such as person.phones, this will observe both setting/removing the array property, and array changes on that property)\n4. Observe changes on an array:\n$.observe(person.phones, myHandler); \n\n5. Observe multiple objects/properties/arrays:\n$.observe(person, \"lastName\", \"phones\", \"address.street\", myHandler);\n\nHere myHandler will handle both:\n\nchanges to lastName \narray changes to the current phones (array), or changes if a new array is assigned to the phones property\nchanges to the street property of the address property of person\n\n6. Observe paths under more than object:\n$.observe(person1, \"lastName\", \"address.*\", person2, \"firstName\", person3, \"*\", \"address.*\", myHandler);\n\nHere myHandler handles:\n\nfor person1: changes to lastName and any address property \nfor person2: changes to firstName\nfor person3: changes to any property of the person3 object itself, and to any property of the person3.address object\n\n"
      },
      {
        "_type": "para",
        "title": "Chained paths: leaf changes or deep changes",
        "text": "Chained paths: leaf changes or deep changes\nBy default you listen to the leaf of a path, but you can specify if you want to listen also to changes on objects higher up the path…\nFor example, here:\n$.observe(team, \"manager.address.street\", myHandler);\n\nmyHandler will be called if the value of the street property of the team.manager.address object changes. So it is listening to leaf changes on the path “manager.address.street”.\nIt will not be called if the team.manager property is swapped to a different manager object, or if the team.manager.address property is swapped to a different address object.\nBut by a simple syntax change, the path can be made to listen to changes not only on the leaf property, but also changes on objects higher up the path. These are deep changes on the path:\nFor example, this path:\n$.observe(team, \"manager.address^street\", myHandler);\n\nwill listen to changes to the street property of address, or the address property of manager.\nAnd the following:\n$.observe(team, \"manager^address.street\", myHandler);\n\nwill listen to changes to the street property of address, the address property of manager, and the manager property of team.\nSimply replace a . with a ^ at the level up to which you want to listen to changes.\n(If you know that in your app the objects higher up the path will never change dynamically, then stick with the default leaf binding, since that will provide better perf optimization…)\nSee samples below.\nSee also the related discussion and examples on data-linking to deep changes, within data-linked templates.\n"
      },
      {
        "_type": "para",
        "title": "Observing <b>all</b> changes under an object",
        "text": "Observing all changes under an object\nThe * (any wild card symbol) let’s you observe changes to any property (e.g. \"manager.*\" for changes to any property of manager).\nSimilarly the ** (all wild card symbol) let’s you observe all observable changes under a chosen object or array – at any depth.\nYou can write paths such as \"**\", \"some.objectOrArray.**\", \"some^objectOrArray.**\", or even \"some.objectOrArray^**\".\nFor example, this:\n$.observe(team, \"**\", myHandler);\n\nwill listen to all changes (to any depth) under the team object (for example, changes to the team.manager, team.manager.address or team.manager.address.street properties), and also changes to the team.members property (swapping to another array) – and even to array changes to team.members (adding or removing a member…).\nAnd this:\n$.observe(team, \"manager.address.**\", \"manager.members.**\", myHandler);\n\nwill listen to all changes (to any depth) under manager.address, and also to all array changes to the manager.members array, and to any changes to objects or arrays under the manager.members array.\nIncluding the ‘^’ alongside the ‘**’ allows you to specify deep paths along with observeAll behavior, such as:\n\"manager.address^**\"\n\nwhich will listen to changing the manager.address to another address object, as well as to all changes (at any depth) under manager.address.\nSee third sample below.\n"
      },
      {
        "_type": "para",
        "title": "Two ways to 'observeAll': the ** wild card and the $.observeAll() API",
        "text": "Two ways to 'observeAll': the ** wild card and the $.observeAll() API\nInternally, using ** actually calls the observeAll() API.\nIn fact:\n$.observe(team, \"**\", myHandler);\n\nis actually equivalent to:\n$.observable(team).observeAll(myHandler);\n\nThe first approach can be convenient for combining multiple paths (with or without **) using the same handler.\n"
      },
      {
        "_type": "api",
        "title": "$.observe(objectOrArray, ..., myHandler)",
        "text": "$.observe(objectOrArray, ..., myHandler)\nRegister a handler for observable changes on one or more objects or data paths\nHandle observable property or array change events\n\n$.observe(person, \"address.street\", myHandler); \n\nHandle all property change events on an object\n\n$.observe(person, \"*\", myHandler); \n\nHandle array change events on an array\n\n$.observe(phones, myHandler); \n\n"
      },
      {
        "_type": "api",
        "title": "function myHandler(ev, eventArgs) { ... }",
        "text": "function myHandler(ev, eventArgs) { ... }\nAn event handler for observable data changes – registered using $.observe(...) or $.observable(object).observeAll(...)\nHandler for observable property or array change events\n\n$.observe(person, \"address.street\", myHandler); \n\n"
      },
      {
        "_type": "para",
        "title": "Samples:",
        "text": "Samples:\nHere is a sample showing $.observe(person, \"name\", \"address^*\", changeHandler);\n"
      },
      {
        "_type": "sample",
        "title": "Handling change events using $.observe()",
        "text": "Handling change events using $.observe()\n\n\n\n  Change leaf values\n  New address\n  \n\n\n\n  Change Log:\n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street\" /></td></tr>\n    <tr><td>ZIP:</td><td><input data-link=\"address^ZIP\" /></td></tr>\n  </tbody></table>\n\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\",\n    ZIP: \"34009\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\",\n    \"address.ZIP\": \"45008\"\n  });\n});\n\n$(\"#changeAddress\").on(\"click\", function() {\n  $.observable(person).setProperty(\n    \"address\", \n    {\n      street: \"New Street\",\n      ZIP: \"99999\"\n    }\n  );\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\n$.observe(person, \"name\", \"address^*\", changeHandler);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The new \" + eventArgs.path + \" is \"\n                + JSON.stringify(eventArgs.value) + \".\";\n\n  $(\".messages\").append(\"\" + message + \"\");\n}\nRegister a handler for changes: \nWe handle changes in the name  and address properties of the person, and any property of the address:\n$.observe(person, \"name\", \"address^*\", changeHandler);\n\n\nDefine the handler:\n\nfunction changeHandler(ev, eventArgs) {\n  var message = ... + eventArgs.path + ... + eventArgs.value ...;\n  ...\n}\n\nTemplate also binds to 'deep paths'\n\n\n\nModify values through template binding or buttons:\n\n$(\"#changeAddress\").on(\"click\", function() {\n  $.observable(person).setProperty(\n    \"address\", \n    {\n      street: \"New Street\",\n      ZIP: \"99999\"\n    }\n...\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now we modify the above sample to show $.observe(person, ...) also handling array properties: a phones property of person\n"
      },
      {
        "_type": "sample",
        "title": "Handling both property change and array change events, using $.observe()",
        "text": "Handling both property change and array change events, using $.observe()\n\n\n\n  Change leaf values\n  New address and phones\n  Add phone\n  \n\n\n\n  Change Log:\n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\"\n  });\n});\n\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    address: {street: \"New Street\"},\n    phones: [{number:\"123 123 1234\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number:\"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\n$.observe(person, \"name\", \"address^street\", \"phones\", changeHandler);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  for (var key in eventArgs) {\n    message += \"\" + key + \": \" + JSON.stringify(eventArgs[key]) + \"\";\n  }\n  $(\".messages\").append(\"\" + message + \"\");\n}\nRegister a handler for changes: \nWe handle changes in the name, address and phones properties of the person, and the street property of the address.\nBecause the phones property is itself an array, we also handle array changes on the phones array:\n$.observe(person, \"name\", \"address^street\", \"phones\", changeHandler);\n\n\nDefine our handler:\n(Note that it outputs all the fields of eventArgs)\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  for (var key in eventArgs) {\n    message += ... key ... eventArgs[key]...\n  }\n  ...\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "But notice that if you change the value of a phone number, our handler does not ‘listen’ to that change.\nIn the next sample we solve that by listening to all changes under phones, thanks to the ** wild card.\n"
      },
      {
        "_type": "sample",
        "title": "Observing <b>all</b> changes under a path: $.observe() with **",
        "text": "Observing all changes under a path: $.observe() with **\n\n\n\n  Change leaf values\n  New address and phones\n  Add phone\n  \n\n\n\n  Change Log:\n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\"\n  });\n  $.observable(person.phones[0]).setProperty({\n    number: \"999 999 9999\"\n  });\n});\n\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    address: {street: \"New Street\"},\n    phones: [{number:\"123 123 1234\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number:\"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\n$.observe(person, \"name\", \"address^street\", \"phones^**\", changeHandler);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  for (var key in eventArgs) {\n    message += \"\" + key + \": \" + JSON.stringify(eventArgs[key]) + \"\";\n  }\n  $(\".messages\").append(\"\" + message + \"\");\n}\nWe modify the previous sample by replacing the \"phones\" path with \"phones^**\":\n$.observe(person, \"name\", \"address^street\", \"phones^**\", changeHandler);\n\nSo now we observe not only replacing the phones array and making array changes to the phones array – but also any change under phones, such as changing a phones[n].name property.\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that instead of using the ** wild card, we could have used the observeAll() API directly – as shown in the last sample of the observeAll() API topic.\n"
      },
      {
        "_type": "para",
        "title": "$.observe() with computed observables",
        "text": "$.observe() with computed observables\nNext, we’ll modify the last sample to show only a computed observable fullName(reverse) depending on firstName and lastName.\nWe’ll observe changes to fullName():\n$.observe(person, \"fullName\", changeHandler);\n\n(Note: The path for observing a computed observable has no parens – so \"fullName\" rather than \"fullName()\".)\n"
      },
      {
        "_type": "sample",
        "title": "Observing a computed observable",
        "text": "Observing a computed observable\n\n\n\n\n\n  Change Log:\n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>First name:</td><td><input data-link=\"firstName\" /></td></tr>\n    <tr><td>Last name:</td><td><input data-link=\"lastName\" /></td></tr>\n    <tr><td>Full name:</td><td><input data-link=\"fullName()\" /></td></tr>\n    <tr><td>Full name<br/>(reversed)</td><td data-link=\"fullName(true)\"></td></tr>\n  </tbody></table>\n\nvar person = {\n  firstName: \"Jeff\",\n  lastName: \"Friedman\",\n  fullName: fullName\n};\n\n// Parameterized computed observable\nfunction fullName(reversed) {\n  // We will declare dependencies (below) for any values that\n  // may change observably, and are not passed in as parameters\n  return reversed\n    ? this.lastName + \" \" + this.firstName\n    : this.firstName + \" \" + this.lastName;\n}\n\n// Declare dependencies, except for any values passed in as parameters\nfullName.depends = [\"firstName\", \"lastName\"]; \n\n// For two-way binding of computed observables, provide a setter\nfullName.set = function(val) {\n  val = val.split(\" \");\n  // Make observable change to dependent properties\n  $.observable(this).setProperty({\n    lastName: val.pop(),\n    firstName: val.join(\" \")\n  });\n};\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\n// Observe changes to fullName() computed observable\n$.observe(person, \"fullName\", changeHandler);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The new \" + eventArgs.path + \" is \"\n                + JSON.stringify(eventArgs.value) + \".\";\n\n  $(\".messages\").append(\"\" + message + \"\");\n}\nObserve changes to fullName() computed observable:\n$.observe(person, \"fullName\", changeHandler);\n\n– which will trigger whenever firstName or lastName change, since fullName() has them as dependencies:\nfullName.depends = [\"firstName\", \"lastName\"]; \n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "unobserve": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "A single call to $.observe(... myHandler) will attach the handler to one or more objects and arrays – to listen to corresponding propertyChange or arrayChange events.\nThe same call (same parameters) but with $.unobserve(...) instead of $.observe(...) will remove the handler from each of those objects.\n"
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
        "text": "Using $.unobserve() to remove handlers\n\n\n\n  Change leaf values\n  New address\n  \n\n\n\n   Change Log\n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street\" /></td></tr>\n    <tr><td>ZIP:</td><td><input data-link=\"address^ZIP\" /></td></tr>\n  </tbody></table><br/>\n\n  {^{:name}}: {^{:address^street}} - {^{:address^ZIP}}\n\n\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\",\n    ZIP: \"34009\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\",\n    \"address.ZIP\": \"45008\"\n  });\n});\n\n$(\"#changeAddress\").on(\"click\", function() {\n  $.observable(person).setProperty(\n    \"address\", \n    {\n      street: \"New Street\",\n      ZIP: \"99999\"\n    }\n  );\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observe(person, \"name\", \"address^*\", changeHandler);\n  } else {\n    $.unobserve(person, \"name\", \"address^*\", changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The new \" + eventArgs.path + \" is \"\n                + JSON.stringify(eventArgs.value) + \".\";\n\n  $(\".messages\").append(\"\" + message + \"\");\n}\n<input type=\"checkbox\" checked id=\"attach\"/>\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\n\nCall unobserve() with the same paths and handler, to stop 'listening'...\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observe(person, \"name\", \"address^*\", changeHandler);\n  } else {\n    $.unobserve(person, \"name\", \"address^*\", changeHandler);\n  }\n}\n\n"
      },
      {
        "_type": "para",
        "title": "$.unobserve() variants",
        "text": "$.unobserve() variants\n$.unobserve() calls do not have to include object, path or handler. Each can be omitted, and the effect will then be to remove ‘observable change’ handler bindings for all handlers, all paths or all objects…\nDetails:\nRemoving all ‘observe’ handlers from all objects\n$.unobserve();\n\nThe above call will remove all ‘observable change’ handlers from all objects – whether created by calls to $.observe(...) or $.observable(...).observeAll(), by JsViews data-link binding in templates or as top-level data-linking. For example, if you choose Try it in the sample above, and replace the unobserve call by $.unobserve(); you’ll see that unchecking has the effect of removing all JsViews data-link binding in the template too.\n$.unobserve() can be used on exiting JsViews or JsObservable code as a way of ensuring complete disposal of all handler bindings. (But note that JsViews data-linking in templates does already automatically dispose its own ‘observe’ bindings when the corresponding HTML elements are removed from the DOM.)\nRemoving all ‘observe’ handlers an object\n$.unobserve(objectOrArray);\n\nThe above call will remove all change handlers from the object (or array). For example, if you choose Try it in the sample above, and replace the unobserve call by $.unobserve(person); you’ll see that unchecking has the effect of removing both the log listener and the JsViews data-link binding in the template too (for the person but not for the address).\n(Note that $unobserve(objectA, objectB); will do nothing. To unobserve multiple objects, make a separate $unobserve(object); call for each object.)\nRemoving ‘observe’ handler bindings for a given handler:\n$.unobserve(myHandler);\n\nThe above call will remove change handler bindings for myHandler from all objects. For example, you can choose Try it in the sample above, and replace the unobserve call by $.unobserve(myHandler);. You’ll see that unchecking works correctly (and does not remove JsViews data-link binding in the template).\nRemoving bindings for specific paths, but for any handlers:\n$.unobserve(person, \"name\", \"address\"...);\n\nThe above call will remove all bindings of person.name and person.address, so choosing Try it and making that change will stop the name and address bindings for both template and message log, but both will continue to respond to changes in address.ZIP and address.street.\nRemoving ‘observe’ handlers from an object (or array), for a given handler\n$.unobserve(objectOrArray, myHandler);\n\nThe above call will remove bindings for myHandler from the object (or array) specified. For example, if you choose Try it in the sample above, and replace the unobserve call by $.unobserve(person, myHandler); you’ll see that unchecking has the effect of removing logging for the person, but does not affect the data-link binding in the template.\nAdditional examples:\nunobserve using \"*\":\n$.unobserve(person, \"*\", myHandler);\n\nThe above call will remove myHandler bindings for all properties of person, so is similar to $.unobserve(person, myHandler). However, for array properties it will also remove the arrayChange myHandler binding (on person.phones for example).\nunobserve using \"**\":\n$.unobserve(person, \"**\", myHandler);\n\nThe above call will remove all myHandler bindings on person and on its child objects at any depth. So it is equivalent to $.observable(person).unobserveAll(myHandler). (See unobserveAll.)\nArray properties:\n$.unobserve(person, \"name\", person.phones, myHandler);\n\nThe above call will stop handing changes to person.name, and will stop listening to array change events on the person.phones array. You can test it by choosing Try it on the sample below, (based on the last sample in the $.observe() topic):\nAnd this variant is almost the same:\n$.unobserve(person, \"name\", \"phones\", myHandler);\n\n– but in addition it will stop listening to setting the phones property of person\n"
      },
      {
        "_type": "sample",
        "title": "Modified sample showing also unobserve() for arrays:",
        "text": "Modified sample showing also unobserve() for arrays:\n\n\n\n  Change leaf values\n  New address and phones\n  Add phone\n  \n\n\n\n  Change Log:\n  \n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <span class=\"floatleft\">{{:number}}</span>\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\"\n  });\n});\n\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    address: {street: \"New Street\"},\n    phones: [{number:\"123 123 1234\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number:\"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observe(person, \"name\", \"address^street\", \"phones\", changeHandler);\n  } else {\n    $.unobserve(person, \"name\", \"address^street\", \"phones\", changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  for (var key in eventArgs) {\n    message += \"\" + key + \": \" + JSON.stringify(eventArgs[key]) + \"\";\n  }\n  $(\".messages\").append(\"\" + message + \"\");\n}\nCall unobserve with the same paths and handler, to stop 'listening'..\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observe(person, \"name\", \"address^street\", \"phones\", changeHandler);\n  } else {\n    $.unobserve(person, \"name\", \"address^street\", \"phones\", changeHandler);\n  }\n}\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
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
        "text": "Sample:\nWe’ll use the observeAll() API to provide an alternative version of our last sample in the $.observe() topic.\nThis allows us to include listening to newly added items in the phone array.\n(But in this version we use $observeAll() directly, rather than using the ** wild card as we did in that sample.)\n"
      },
      {
        "_type": "sample",
        "title": "Handling both property change and array change events, using .observeAll()",
        "text": "Handling both property change and array change events, using .observeAll()\n\n\n\n  Change leaf values\n  New address and phones\n  Add phone\n  \n\n\n\n  Change Log:\n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number\" />\n            <span class=\"remove\" style=\"margin:3px\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\"\n  });\n});\n\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    address: {street: \"New Street\"},\n    phones: [{number:\"123 123 1234\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number:\"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\n$.observable(person).observeAll(changeHandler);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"observeAll path: \" + ev.data.observeAll.path() + \"\"\n  }\n  for (var key in eventArgs) {\n    message += \"\" + key + \": \" + JSON.stringify(eventArgs[key]) + \"\";\n  }\n  $(\".messages\").append(\"\" + message + \"\");\n}\nA single observeAll() call for observing all the objects\nEven phone objects added to the phones array will automatically be ‘listened’ to by our handler, without us needing to write any additional code.\n$.observable(person).observeAll(changeHandler);\n\n\nDefine our handler:\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"observeAll path: \" + ev.data.observeAll.path() + \"\"\n  }\n  for (var key in eventArgs) {\n    message += ... key ... eventArgs[key]...\n  }\n  ...\n}\n\n"
      },
      {
        "_type": "para",
        "title": "observeAll() with View Model object hierarchies",
        "text": "observeAll() with View Model object hierarchies\nThe observeAll() API works equally well with View Model objects or plain objects. See Plain objects or View Model. At the end of that topic we show our observeAll() sample above, using View Model objects.\n"
      },
      {
        "_type": "para",
        "title": "observeAll() and \"**\" paths",
        "text": "observeAll() and \"**\" paths\nAs an alternative to using the observeAll() API, it is sometimes simpler to use the ** all wild card path in association with $.observe(), or with computed observables, as shown here and here.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
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
        "title": "unobserveAll()",
        "text": "unobserveAll()\n\n\n\n  Change leaf values\n  New address and phones\n  Add phone\n  \n\n\n\n   Change Log\n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\"\n  });\n});\n\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    address: {street: \"New Street\"},\n    phones: [{number:\"123 123 1234\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number:\"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"observeAll path: \" + ev.data.observeAll.path() + \"\"\n  }\n  for (var key in eventArgs) {\n    message += \"\" + key + \": \" + JSON.stringify(eventArgs[key]) + \"\";\n  }\n  $(\".messages\").append(\"\" + message + \"\");\n}\n<input type=\"checkbox\" checked id=\"attach\"/>\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\n\nCall unobserveAll() on the root, to stop 'listening'...\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\n"
      },
      {
        "_type": "para",
        "title": "$.unobserveAll() variant",
        "text": "$.unobserveAll() variant\nOmitting the handler:\n$.observable(objectOrArray).unobserveAll()\n\nThe above call will remove all change handlers from the object, and any nested objects.\nTo test it, you can choose Try it in the sample above, and replace the unobserveAll call by $.observable(person).unobserveAll();\nYou’ll see that unchecking will then have the effect of removing not only the logging handler, but also the JsViews data-link binding handler used in the template. Now, changes will trigger neither log messages, nor template updates.\n"
      },
      {
        "_type": "para",
        "title": "unobserveAll() with View Model object hierarchies",
        "text": "unobserveAll() with View Model object hierarchies\nThe unobserveAll() API works equally well with View Model objects or plain objects. See Plain objects or View Model. At the end of that topic we show our unobserveAll() sample above, using View Model objects.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "computed": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender templates can include computed properties, such as:\n\nperson.firstName(): a computed ‘getter’ property which returns a private _firstName\nperson.fullName(): a computed property which concatenates (and perhaps formats) first and last name.\nexpenses.total(): a computed property which gives the total for a property/column of an array of items.\n\nSee the samples Getter properties with plain objects and Getter properties on View Model.\nJsObservable and JsViews provide support for making computed properties observable, so that in a data-linked template you can bind directly to computed properties, provide two-way data-binding, etc.\n"
      },
      {
        "_type": "para",
        "title": "Computed observable: get / set",
        "text": "Computed observable: get / set\nTo make person.firstName() into a computed observable, with two-way data-binding, specify an associated ‘setter’ function:\nfunction firstName() {\n  return this._firstName; // Get the firstName\n}\n\nfirstName.set = function(val) {\n  this._firstName = val; // Set the firstName\n}\n\nThe firstName() computed observable can be modified observably, either by calling setProperty:\n$.observable(person).setProperty(\"firstName\", \"updatedFirstName\");\n\nor by two-way binding in a template:\n<input data-link=\"firstName()\" />\n\nand if used in a tag expression in a data-linked templates it will update automatically in response to observable changes:\nFirst name: {^{:firstName()}}\n\n<span data-link=\"firstName()\"></span>\n\n$.observe() can be used to listen to observable changes in a computed observable:\nThe following sample shows all of these scenarios:\n"
      },
      {
        "_type": "sample",
        "title": "get/set",
        "text": "get/set\n\n\n\n  <button data-link=\"{on ~changeFirstName person}\">\n    Change firstName\n  </button> <br/>\n\n  First name: <input data-link=\"person.firstName()\" /> -\n  {^{:person.firstName()}} -\n  <em data-link=\"person.firstName()\"></em>\n\nfunction firstName() {\n  return this._firstName;\n}\n\nfirstName.set = function(val) {\n  this._firstName = val;\n};\n\nvar data = {\n  person: {\n    _firstName: \"Jo\",\n    firstName: firstName\n  }\n};\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", data, {\n  changeFirstName: function(person) {\n    $.observable(person).setProperty(\n      \"firstName\",\n      person.firstName() + \"+\"\n    );\n  }\n});\n\n$.observe(data.person, \"firstName\", function(ev, evArgs) {\n  alert(\"New firstName: \" + evArgs.value);\n});\nCode:\nfunction firstName() { return this._firstName; } // Getter (with _firstName as private property)\n\nfirstName.set = function(val) { this._firstName = val; }; // Provide a setter\n\n$.observable(person).setProperty(\"firstName\", person.firstName() + \"+\"); // Modify firstName() observably\n\n$.observe(data.person, \"firstName\", function(ev, evArgs) {\n  ... // Listen to observable changes in firstName()\n});\n\nTemplate:\n<input data-link=\"person.firstName()\" />\n{^{:person.firstName()}}\n<em data-link=\"person.firstName()\"></em>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Get/set properties on a View Model",
        "text": "Get/set properties on a View Model\nRather than using plain JavaScript objects with getter functions, as above, a more common pattern (providing better encapsulation) would be to define a ‘View Model’ class, and to instantiate that class to provide data instances.\nSee Plain objects or View Model for a full discussion of using View Models with JsRender and JsViews.\nHere is a modified version of the above sample, using a View Model Person class, rather than plain objects:\n"
      },
      {
        "_type": "sample",
        "title": "get/set &ndash; View Model",
        "text": "get/set – View Model\n\n\n\n  <button data-link=\"{on ~changeFirstName person}\">\n    Change firstName\n  </button> <br/>\n\n  First name: <input data-link=\"person.firstName()\" /> -\n  {^{:person.firstName()}} -\n  <em data-link=\"person.firstName()\"></em>\n\nfunction firstName() {\n    return this._firstName;\n}\n\nfirstName.set = function(val) {\n  this._firstName = val;\n};\n\n// Person class\nfunction Person(firstName) {\n  this._firstName = firstName;\n}\n\nPerson.prototype = {\n  firstName: firstName\n};\n\nvar data = {\n  person: new Person(\"Jo\")\n};\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", data, {\n  changeFirstName: function(person) {\n    $.observable(person).setProperty(\n      \"firstName\",\n      person.firstName() + \"+\"\n    );\n  }\n});\n\n$.observe(data.person, \"firstName\", function(ev, evArgs) {\n  alert(\"New firstName: \" + evArgs.value);\n});\nCode:\nfunction firstName() { return this._firstName; } // Getter (with _firstName as private property)\n\nfirstName.set = function(val) { this._firstName = val; }; // Provide a setter\n\n// Person class\nfunction Person(firstName) {\n  this._firstName = firstName;\n}\n\nPerson.prototype = {\n  firstName: firstName\n};\n\nvar data = {\n  person: new Person(\"Jo\")\n};\n\nTemplate:\n<input data-link=\"person.firstName()\" />\n{^{:person.firstName()}}\n<em data-link=\"person.firstName()\"></em>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Computed observable: get &ndash; depends",
        "text": "Computed observable: get – depends\nThe firstName() example above is probably the most common type of computed observable: a get/set property depending on a corresponding ‘private’ property.\nAnother very common use of computed observables is for read-only computed properties that may depend on more than one other property.\nThe  following sample illustrates that, with a person.fullName() computed property which concatenates the computed firstName() and a regular (non-computed) lastName property.\nThis type of computed observable consists simply of a getter function, and a specification of the dependencies – i.e. the other observable properties which the getter function depends on:\nfunction fullName() { return this.firstName() + \" \" + this.lastName; }\n\nfullName.depends = [\"firstName\", \"lastName\"];\n\nThe depends specification above means that whenever firstName() or lastName change, an observable change event for fullName() will also be triggered, and fullName() will be recalculated.\n"
      },
      {
        "_type": "sample",
        "title": "get &ndash; depends",
        "text": "get – depends\n\n\n\n  First name: <input data-link=\"person.firstName()\" /> -\n  {^{:person.firstName()}} -\n  <em data-link=\"person.firstName()\"></em> <br/>\n\n  Last name: <input data-link=\"person.lastName\" /> -\n  {^{:person.lastName}} -\n  <em data-link=\"person.lastName\"></em> <br/>\n\n  Full name: {^{:person.fullName()}} -\n  <em data-link=\"person.fullName()\"></em>\n\nfunction firstName() { return this._firstName; }\n\nfirstName.set = function(val) {\n  this._firstName = val;\n};\n\nfunction fullName() { return this.firstName() + \" \" + this.lastName; }\n\nfullName.depends = [\"firstName\", \"lastName\"];\n\nvar data = {\n  person: {\n    _firstName: \"Jo\",\n    lastName: \"Blow\",\n    firstName: firstName,\n    fullName: fullName\n  }\n};\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", data);\n\n$.observe(data.person, \"fullName\", function(ev, evArgs) {\n  alert('New fullName: \"' + data.person.fullName() + '\"');\n});\n\nCode:\nfunction fullName() { return this.firstName() + \" \" + this.lastName; } // getter\n\nfullName.depends = [\"firstName\", \"lastName\"]; // Dependencies\n\n$.observe(data.person, \"fullName\", function(ev, evArgs) {\n  ... // listen to changes in fullName()\n});\n\nTemplate:\n{^{:person.fullName()}}\n<em data-link=\"person.fullName()\"></em>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Computed observable: get / set &ndash; depends",
        "text": "Computed observable: get / set – depends\nSometimes a computed observable may depend on other observables, and also have a setter defined.\nFor example we may want to allow two-way binding to fullName() – with a setter which looks for white-space in the provided string and reassigns the preceding and following text to firstName and lastName – so an observable change to fullName automatically triggers appropriate observable changes to firstName and lastName:\n"
      },
      {
        "_type": "sample",
        "title": "get/set &ndash; depends",
        "text": "get/set – depends\n\n\n\n  First name: <input data-link=\"person.firstName()\" /> -\n  {^{:person.firstName()}} -\n  <em data-link=\"person.firstName()\"></em> <br/>\n\n  Last name: <input data-link=\"person.lastName\" /> -\n  {^{:person.lastName}} -\n  <em data-link=\"person.lastName\"></em> <br/>\n\n  Full name: <input data-link=\"person.fullName()\" /> -\n  {^{:person.fullName()}} -\n  <em data-link=\"person.fullName()\"></em>\n\nfunction firstName() { return this._firstName; }\n\nfirstName.set = function(val) {\n  this._firstName = val;\n};\n\nfunction fullName() { return this.firstName() + \" \" + this.lastName; }\n\nfullName.set = function(val) {\n  val = val.split(\" \");\n  // Make observable change to dependent properties\n  $.observable(this).setProperty({\n    lastName: val.pop(),\n    firstName: val.join(\" \")\n  });\n};\n\nfullName.depends = [\"firstName\", \"lastName\"];\n\nvar data = {\n  person: {\n    _firstName: \"Jo\",\n    lastName: \"Blow\",\n    firstName: firstName,\n    fullName: fullName\n  }\n};\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", data);\nCode:\nfunction fullName() { return this.firstName() + \" \" + this.lastName; }\n\nfullName.set = function(val) { \n  val = val.split(\" \");\n  // Make observable change to dependent properties\n  $.observable(this).setProperty({\n    lastName: val.pop(),\n    firstName: val.join(\" \")\n  });\n};\n\nfullName.depends = [\"firstName\", \"lastName\"];\n\nTemplate:\n<input data-link=\"person.fullName()\" />\n{^{:person.fullName()}}\n<em data-link=\"person.fullName()\" ></em>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Computed observable with parameters",
        "text": "Computed observable with parameters\nA computed observable function myComputed(a, b, c) may take parameters. For example:\nfunction fullName(reverse) {\n return reverse\n   ? this.lastName() + \" \" + this.firstName\n   : this.firstName + \" \" + this.lastName();\n}\n\nfullName.depends = [\"firstName\", \"lastName\"];\n\nThe computed value might be used in a data-linked expression in a template, with a specific value passed in as parameter:\n{^{:person.fullName(true)}}\n\n(You can see an example of this in the samples/computed/fullName samples.)\nPassed-in parameters may be observable values – in which case whenever they change observably, the computed observable will update automatically. For example:\n{^{:person.fullName(~settings.reverseName)}}\n\nThe value of a computed observable (person.fullName(...) above) will update whenever either an observable parameter (in this case: ~setting.reverseName) or a dependency (firstName or lastName) change.\nHere is a working example:\n"
      },
      {
        "_type": "sample",
        "title": "get/set &ndash; depends, with parameters",
        "text": "get/set – depends, with parameters\n\n\n\n  <label><input type=\"checkbox\" data-link=\"~settings.reverseName\" /> Reverse name:</label>\n  {^{:~settings.reverseName}} <br/>\n\n  First name: <input data-link=\"person.firstName()\" /> -\n  {^{:person.firstName()}} -\n  <em data-link=\"person.firstName()\"></em> <br/>\n\n  Last name: <input data-link=\"person.lastName\" /> -\n  {^{:person.lastName}} -\n  <em data-link=\"person.lastName\"></em> <br/>\n\n  Full name: <input data-link=\"person.fullName()\" /> -\n  {^{:person.fullName(~settings.reverseName)}} -\n  <em data-link=\"person.fullName(~settings.reverseName)\"></em>\n\nfunction firstName() { return this._firstName; }\n\nfirstName.set = function(val) {\n  this._firstName = val;\n};\n\nfunction fullName(reverse) {\n  return reverse\n    ? this.lastName + \" \" + this.firstName()\n    : this.firstName() + \" \" + this.lastName;\n}\n\nfullName.set = function(val) {\n  val = val.split(\" \");\n  // Make observable change to dependent properties\n  $.observable(this).setProperty({\n    lastName: val.pop(),\n    firstName: val.join(\" \")\n  });\n};\n\nfullName.depends = [\"firstName\", \"lastName\"];\n\nvar data = {\n  person: {\n    _firstName: \"Jo\",\n    lastName: \"Blow\",\n    firstName: firstName,\n    fullName: fullName\n  }\n};\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", data, {\n  settings: {reverseName: false}\n});\nCode:\nfunction fullName(reverse) {\n  return reverse\n    ? this.lastName + \" \" + this.firstName()\n    : this.firstName() + \" \" + this.lastName;\n}\n\nTemplate:\n{^{:person.fullName(~settings.reverseName)}}\n\n<em data-link=\"person.fullName(~settings.reverseName)\" ></em>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The computed fullName(reverse) above takes a parameter, reverse, but note that for read-write computed properties (get/set), you cannot pass additional parameters to the setter. (So in the example above is the setter is still fullName.set = function(val) {...}.) Indeed, clicking on the Reverse name checkbox does not reverse the name in the Full name text box.\nTo achieve that functionality, we need to include \"~settings.reverseName\" as a path in the fullName.depends declaration, rather than passing it in as a parameter:\n"
      },
      {
        "_type": "sample",
        "title": "get/set &ndash; depends (with ~settings.reverseName in depends)",
        "text": "get/set – depends (with ~settings.reverseName in depends)\n\n\n\n  <label><input type=\"checkbox\" data-link=\"~settings.reverseName\" /> Reverse name:</label>\n  {^{:~settings.reverseName}} <br/>\n\n  First name: <input data-link=\"person.firstName()\" /> -\n  {^{:person.firstName()}} -\n  <em data-link=\"person.firstName()\"></em> <br/>\n\n  Last name: <input data-link=\"person.lastName\" /> -\n  {^{:person.lastName}} -\n  <em data-link=\"person.lastName\"></em> <br/>\n\n  Full name: <input data-link=\"person.fullName()\" /> -\n  {^{:person.fullName()}} -\n  <em data-link=\"person.fullName()\"></em>\n\nfunction firstName() { return this._firstName; }\n\nfirstName.set = function(val) {\n  this._firstName = val;\n};\n\nfunction fullName() {\n  return settings.reverseName\n    ? this.lastName + \" \" + this.firstName()\n    : this.firstName() + \" \" + this.lastName;\n}\n\nfullName.set = function(val) {\n  val = val.split(\" \");\n  var afterSpace = val.pop();\n  var beforeSpace = val.join(\" \");\n  // Make observable change to dependent properties\n  $.observable(this).setProperty({\n    lastName: settings.reverseName ? beforeSpace : afterSpace,\n    firstName: settings.reverseName ? afterSpace : beforeSpace\n  });\n};\n\nfullName.depends = [\"firstName\", \"lastName\", \"~settings.reverseName\" ];\n\nvar settings = {\n reverseName: false\n};\n\nvar data = {\n  person: {\n    _firstName: \"Jo\",\n    lastName: \"Blow\",\n    firstName: firstName,\n    fullName: fullName\n  }\n};\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", data, {\n  settings: settings\n});\nfunction fullName() {\n  return settings.reverseName ? ... : ...;\n}\n\nfullName.set = function(val) {\n  ...\n  $.observable(this).setProperty({\n    lastName: settings.reverseName ? ... : ...,\n    firstName: settings.reverseName ? ... : ...\n  });\n};\n\nfullName.depends = [\"firstName\", \"lastName\", \"~settings.reverseName\" ];\n\nvar settings = {reverseName: false};\n\ntmpl.link(\"#result\", data, {settings: settings});\n\n\n"
      },
      {
        "_type": "para",
        "title": "Declaring dependencies for a computed observable",
        "text": "Declaring dependencies for a computed observable\nWhen setting\nmyObservableFunction.depends = dependencyExpression;\n\nfor a computed observable, the dependencyExpression can be a string, such as:\n\n\"firstName\", or\n\"manager^address*\"\n\nor an array of strings (or objects and strings), such as:\n\n[\"firstName\", \"lastName\", \"~settings.reverseName\"] or\n[\"firstName\", \"lastName\", settings, \"reverseName\"]\n\n(The last two are equivalent, assuming the settings object is the helper object referenced declaratively using \"~settings\".)\nIn fact setting depends to an array is equivalent to providing the corresponding arguments to $.observe(). So all the examples of $.observe() (including with deep paths) can also be used in equivalent depends expressions. For example you might have:\nmyObservableFn.depends = [person1, \"lastName\", \"address^*\", person2, \"firstName\", person3, \"*\", \"address.*\"];\n\n– which is similar to the example #6 in the $.observe() examples – and includes a deep path \"address^*\" (listening to changes in the address property of the person1 object and changes to any properties of the person1.address object).\nIn addition, depends expressions can be functions.\nA depends function can return strings or arrays. It is called during initial binding of the link expression, and the this pointer (and data argument) is the object instance (e.g. person object in the case of a computed person.fullName()):\nmyObservableFn.depends = function(data) {\n  return [data.person1, \"lastName\", \"address.*\", data.person2, \"firstName\"];\n}\n\n– and/or can use a callback:\nmyObservableFn.depends = function(data, callback) {\n  $.observable(data.person).observeAll(callback);\n  // (In addition to calling the callback, can optionally also return a string or array)\n}\n\nNote that this last example, (using observeAll to call the callback) is a programmatic approach which is actually equivalent to the following declarative version with the ** wild card:\nmyObservableFn.depends = \"person.**\";\n\n(See the next sample)\n"
      },
      {
        "_type": "para",
        "title": "Sample: Using the <b>**</b> wild card in <b>depends</b>",
        "text": "Sample: Using the ** wild card in depends\nIn the next sample we’ll use the ** wild card in a depends declaration for a computed observable that tracks the running total of some items in a shopping cart.\nThis sample also illustrates top-level data-linking, and declarative events.\n(For more information see the same sample here: samples/computed/shopping-cart)\n"
      },
      {
        "_type": "sample",
        "title": "Shopping cart",
        "url": "samples/computed/shopping-cart/top-level",
        "text": "Shopping cart\nHere we define a totalAmount() computed observable for calculating the total amount for an array of items in a shopping cart.\nfunction totalAmount() {\n  ...\n  while (...) {\n    amount += this.items[l].price * this.items[l].quantity;\n  }\n  return amount;\n}\n\nvar cart = {\n  total: totalAmount,\n  ...\n  items: [...]\n}\n\nThe total is rendered using:\n<span colspan=\"2\" data-link=\"total()\"></span>\n\n(In this example we are using top-level data-linking.)\n\ndepends with **\ntotalAmount() needs to update when the items array changes, and also when the quantity or price property of an item in the array changes.\nWe can achieve that very easily by declaring the items.** path as a dependency:\ntotalAmount.depends = \"items.**\";\n\n\n\"use strict\";\nvar shoppingCart = {\n  add: addItem,\n  remove: removeItem,\n  total: totalAmount,\n  items: [\n    {product: \"Pot\", price:  10, quantity: 3},\n    {product: \"Kettle\", price:  15.5, quantity: 23}\n  ],\n  show: true\n};\n\nfunction addItem() {\n  $.observable(this.items).insert({\n    product: \"new\",\n    price:  1,\n    quantity: 1\n    });\n}\n\t\nfunction removeItem(ev, eventArgs) {\n  $.observable(this.items).remove(eventArgs.view.index);\n}\n\nfunction totalAmount() {\n  var amount = 0,\n    l = this.items.length;\n  while (l--) {\n    amount += this.items[l].price * this.items[l].quantity;\n  }\n  return amount;\n}\n\ntotalAmount.depends = \"items.**\";\n// totalAmount depends on any changes under the items array\n\n$.link(true, \"#shoppingcart\", shoppingCart);\n\n"
      },
      {
        "_type": "para",
        "title": "Observing computed observables",
        "text": "Observing computed observables\ndepends declarations and $.observe() calls both use paths such as \"manager.name\" for listening to changes in the manager.name, as in:\ngetNamesList.depends = [\"manager.name\", ...]; // Dependency declaration for team.getNamesList()\n\n$.observe(team, \"manager.name\", myHandler); // Observe changes in manager.name\n\nIf manager.fullName() is a computed observable then the corresponding path (for listening to changes in the manager.fullName()) is \"manager.fullName\" (without parens) – as in:\ngetNamesList.depends = [\"manager.fullName\", ...]; // Dependency declaration for team.getNamesList()\n\n$.observe(team, \"manager.fullName\", myHandler); // Observe changes in manager.fullName()\n\nSee $.observe() with computed observables.\n"
      }
    ]
  },
  "namespaces": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Note: This feature will not be needed for simple applications – but can be useful for certain large scale or complex apps.\n$.observe(), $.unobserve(), .observeAll(), .unobserveAll(), observable object (.setProperty()) and observable array (.insert() etc.),  are all implemented using jQuery event framework, and they support the use of namespaces in the same way that jQuery .on(), .off() and .trigger() support namespaces.\nAs with the jQuery API, a namespace is a string – generally one or more dot-separated tokens, such as \"module1.module2\". More than one namespace can be provided, with white-space separation – as in \"case1.outer case2\" – in order to create more than one event binding with different namespaces.\n"
      },
      {
        "_type": "para",
        "title": "$.observe() handler bindings &ndash; with namespaces",
        "text": "$.observe() handler bindings – with namespaces\nAn optional namespace parameter can be included, before all the other parameters in the $.observe(...) call:\n$.observe(namespace, myObjectOrArray, ..., myHandler);\n\nThis will associate the chosen namespace with the propertyChange/arrayChange event binding.\nExamples:\n$.observe(\"case1\", person, \"name\", myHandler); \n// binds a propertyChange.case1 event on person, for myHandler\n\n$.observe(\"scenario1\", person, \"address\", myHandler);\n// binds a propertyChange.scenario1 event on person, for myHandler\n\n$.observe(\"case1.scenario2\", myArray, myHandler);\n// binds an arrayChange.case1.scenario2 event on myArray, for myHandler\n\n$.observe(\"case1.scenario2\", myArray, team, \"manager.name\", myHandler);\n// binds an arrayChange.case1.scenario2 event on myArray, for myHandler\n// binds a propertyChange.case1.scenario2 event on team, for myHandler\n\nWhite-space-separated namespaces:\nA observe() call associated with multiple namespaces such as \"case1.scenario2 scenario1\" will add event bindings for each namespace:\n$.observe(\"case1.scenario2 scenario1\", myArray, team, \"manager.name\", myHandler);\n// binds an arrayChange.case1.scenario2 event on myArray, for myHandler\n// binds an arrayChange.scenario1 event on myArray, for myHandler\n// binds a propertyChange.case1.scenario2 event on person.manager, for myHandler\n// binds a propertyChange.scenario1 event on person.manager, for myHandler\n\n"
      },
      {
        "_type": "para",
        "title": ".observeAll() handler bindings &ndash; with namespaces",
        "text": ".observeAll() handler bindings – with namespaces\nAn optional namespace parameter can be included before the objectOrArray parameter in the $.observable(objectOrArray).observeAll(handler) call:\n$.observable(namespace, myObjectOrArray).observeAll(myHandler);\n\nThis will associate the chosen namespace with all the propertyChange/arrayChange event bindings that are created by observeAll().\nExample:\n$.observable(\"case1.scenario2\", team).observeAll(myHandler);\n// binds propertyChange.case1.scenario2/arrayChange.case1.scenario2 events\n// on objects/arrays under team, for myHandler\n\n$.observable(\"case1 case2\", team).observeAll(myHandler); // (multiple bindings)\n// binds propertyChange.case1/arrayChange.case1 events on objects/arrays under team, for myHandler\n// and propertyChange.case2/arrayChange.case2 events on objects/arrays under team, for myHandler\n\nAs with observe(), an observeAll() call associated with multiple (white-space separated) namespaces such as \"case1.scenario2 scenario1\" will add event bindings for each namespace.\n"
      },
      {
        "_type": "para",
        "title": "$.observable(...).setProperty(...) with namespaces",
        "text": "$.observable(...).setProperty(...) with namespaces\nAn optional namespace parameter can be included before the object parameter in the $.observable(object).setProperty(...) call:\n$.observable(namespace, myObject).setProperty(...);\n\nThis will only trigger observable change handlers that are associated with the same namespace.\nExample:\n$.observable(\"case1.scenario2\", person).setProperty(\"name\", \"newName\");\n// triggers only handlers that are associated with the `\"case1.scenario2\"` namespace tokens.\n\nThe above namespaced setProperty call will trigger the myHandler1, myHandler2 and myHandler3 bindings below, but not the myHandler5, myHandler5 or myHandler6 bindings:\n$.observe(\"case1.scenario2\", person, \"name\", myHandler1);       // Triggered\n$.observe(\"scenario2.foo.case1\", person, \"name\", myHandler2);   // Triggered\n$.observable(\"scenario2.case1\", person).observeAll(myHandler3); // Triggered \n\n$.observe(person, \"name\", myHandler4);                          // Not triggered \n$.observe(\"scenario2\", person, \"name\", myHandler5);             // Not triggered\n$.observable(person).observeAll(myHandler6);                    // Not triggered\n\n"
      },
      {
        "_type": "para",
        "title": "$.observable(...).insert(...) etc. &ndash; with namespaces",
        "text": "$.observable(...).insert(...) etc. – with namespaces\nJust as with propertyChange operations on *observable objects *(above), observable array operations: insert(), remove(), move() and refresh()can also be scoped to namespaces.\nAn optional namespace parameter can be included before the array parameter in the $.observable(array).insert(...) call:\n$.observable(namespace, myObject).insert(...);\n\nand similarly for the other operations, such as remove().\nThis will only trigger observable change handlers that are associated with the same namespace.\nExample:\n$.observable(\"case1.scenario2\", phones).insert(newPhone);\n// triggers only handlers that are associated with the `\"case1.scenario2\"` namespace tokens.\n\nThe above namespaced insert call will trigger the myHandler1, myHandler2 and myHandler3 bindings below, but not the myHandler5, myHandler5 or myHandler6 bindings:\n$.observe(\"case1.scenario2\", phones, myHandler1);               // Triggered\n$.observe(\"scenario2.foo.case1\", phones, myHandler2);           // Triggered\n$.observable(\"scenario2.case1\", person).observeAll(myHandler3); // Triggered - for person.phones \n\n$.observe(phones, myHandler4);                                  // Not triggered \n$.observe(\"scenario2\", phones, myHandler5);                     // Not triggered\n$.observable(person).observeAll(myHandler6);                    // Not triggered\n\n"
      },
      {
        "_type": "para",
        "title": "Accessing namespaces in the 'observable change' handler",
        "text": "Accessing namespaces in the 'observable change' handler\nWhen the observable change handler is triggered, the associated namespace can be accessed as:\nfunction myHandler(ev, eventArgs) {\n  // ev.data.ns - the namespace used in the handler binding\n  // ev.namespace - the namespace used in the `$.observable(...).setProperty/insert/remove/move/refresh` call\n}\n\n"
      },
      {
        "_type": "para",
        "title": "Using namespaces for selective removal of bindings",
        "text": "Using namespaces for selective removal of bindings\nNamespaces can be very useful for removing a specific collection of bindings in a single call, filtering by namespace tokens.\n$.unobserve(namespace, ...);\n\nThis will only remove handler bindings that are associated with the same namespace.\nFor example any of the following calls:\n$.unobserve(\"case1.scenario2\", person, \"name\", myHandler);\n$.unobserve(\"case1.scenario2\", person, \"name\");\n$.unobserve(\"case1.scenario2\", person);\n$.unobserve(\"case1.scenario2\");\n$.observable(\"case1.scenario2\", person).unobserveAll(myHandler);\n$.observable(\"case1.scenario2\", person).unobserveAll();\n\nwill remove all of the following bindings:\n$.observe(\"case1.scenario2\", person, \"name\", myHandler);       // Removed\n$.observe(\"scenario2.foo.case1\", person, \"name\", myHandler);   // Removed\n$.observable(\"scenario2.case1\", person).observeAll(myHandler); // Removed \n\nbut will not remove the following bindings:\n$.observe(person, \"name\", myHandler);                          // Not removed \n$.observe(\"scenario2\", person, \"name\", myHandler);             // Not removed\n$.observable(person).observeAll(myHandler);                    // Not removed\n\nWhite-space-separated namespaces:\nAn unobserve() or unobserveAll() call associated with multiple namespaces such as:\n$.unobserve(\"case1.scenario2 scenario1\", ...);\n\nwill remove both \"case1.scenario2\" handler bindings and \"scenario1\" handler bindings.\n"
      }
    ]
  },
  "jsoadvanced": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "removeprop": {
    "sections": [
      {
        "_type": "api",
        "title": "$.observable(myObject).removeProperty(path)",
        "text": "$.observable(myObject).removeProperty(path)\nRemove an object property (as an observable change)\nRemove an object property\n\n$.observable(book).removeProperty(\"title\");\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is a sample where we remove a ZIP property from person.address. We use both a data-linked template and an event handler for propertyChange to respond to the observable property changes:\n"
      },
      {
        "_type": "sample",
        "title": "Removing a property",
        "text": "Removing a property\n\n\n\n  Set ZIP\n  Remove ZIP\n  \n\n\n\n  Changes:\n  \n\n\n\n  <input data-link=\"address.ZIP\" /><br/><br/>\n  {^{if address.ZIP === undefined}}\n    <b>ZIP is undefined</b>\n  {{else}}\n    <b>ZIP:</b> {^{:address.ZIP}}\n  {{/if}}  \n\nvar person = {\n  address: {\n    street: \"1st Ave\",\n    ZIP: \"00000\"\n  }\n};\n\n$(\"#set\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.ZIP\", \"33444\");\n});\n\n$(\"#remove\").on(\"click\", function() {\n  $.observable(person).removeProperty(\"address.ZIP\");\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\n$(person.address).on(\"propertyChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = '' + eventArgs.path + ': ' + (eventArgs.value === undefined ? 'undefined' : '\"' + eventArgs.value + '\"');\n  $(\"#messages\").append(message + \"\");\n}\n\n\n{^{if address.ZIP === undefined}}\n  ZIP is undefined\n{{else}}\n  ZIP: {^{:address.ZIP}}\n{{/if}} \n\nRemove property\n\n$.observable(person).removeProperty(\"address.ZIP\");\n\n\n\nListen to changes\n\n$(person.address).on(\"propertyChange\", changeHandler);\n\n// Alternatively we could have used: $.observe(person, \"address.ZIP\", changeHandler);\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  }
}