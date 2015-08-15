var content = $.views.documentation.content;

content.jsoapi = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/jsoapi")) ||
{
  "jsoapi": {
    "title": "Observing data changes: JsObservable",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "<em><small>(Work in progress. Other topics to follow...)</small></em>"
      },
      {
        "_type": "links",
        "title": "Modifying data:",
        "links": [],
        "topics": [
          {
            "hash": "$observable",
            "label": "Observable objects and arrays"
          },
          {
            "hash": "propchange",
            "label": "Modify an object observably"
          },
          {
            "hash": "arrchange",
            "label": "Modify an array observably"
          }
        ]
      },
      {
        "_type": "links",
        "title": "Responding to changes in data:",
        "links": [],
        "topics": [
          {
            "hash": "observeobjectsarrays",
            "label": "Respond to data changes"
          }
        ]
      }
    ]
  },
  "propchange": {
    "title": "Modify an object observably",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Use <em>$.observable(myObject)</em> to obtain an <em>observable object</em> - which provides a <em>setProperty</em> method for making <em>observable changes</em> to the object:"
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "setprop",
            "label": "$.observable(object).setProperty()"
          }
        ]
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also: <a href=\"#$observable\">Observable objects and arrays</a>)"
      }
    ]
  },
  "setprop": {
    "title": "Making observable changes: $.observable(object).setProperty()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Modifying properties of an object, observably:",
        "text": "If you pass an object to <em><a href=\"#$observable\">$.observable()</a></em>, you obtain an <em>observable</em> object (a very lightweight wrapper around your object) which provides a <em>setProperty</em> method."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Call the <em>setProperty()</em> method to make one or more observable changes to properties on your object (or on the nested objects in the 'object graph' below it...)"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.observable(person).setProperty(\"address.street\", \"Main St\");"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.observable(myObject).setProperty(path, value)",
        "name": "setProperty",
        "object": "$.observable(object)",
        "method": true,
        "returns": "this",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "path",
                "type": "string",
                "optional": false,
                "description": "Path (e.g. \"address.street\") or name (e.g. \"firstName\") for the property"
              },
              {
                "_type": "param",
                "name": "value",
                "type": "any",
                "optional": false,
                "description": "Modified value"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observable(book).setProperty(\"title\", \"Hope\");",
            "description": "Modify the value of an object property"
          }
        ],
        "description": "Make an observable change to an object property",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "para",
        "title": "Sample: Observable property change, with data-bound template:",
        "text": "Here is a sample, using a <a href=\"#linked-tag-syntax\">data-linked template</a> to respond to the observable property changes."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "template",
            "title": "",
            "markup": "Street: {^{:address.street}}\")"
          },
          {
            "_type": "code",
            "title": "Modify the value of a property on a chosen path:",
            "code": "$.observable(person).setProperty(\"address.street\", \"Main St\");\n"
          }
        ],
        "code": "var person = {\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"Main St\");\n});\n\n$(\"#revert\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"1st Ave\");\n});\n\nvar tmpl = $.templates(\"Street: {^{:address.street}}\");\n\ntmpl.link(\"#result\", person);\n",
        "html": "<button id=\"modify\">set to new value</button>\n<button id=\"revert\">set back to original value</button>\n\n<p id=\"result\"><p>",
        "height": "90",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Sample: Observable property change, with onPropertyChange handler",
        "text": "And here is a sample, using an event handler for <a href=\"#onpropchange\">propertyChange</a> to respond to the observable property changes."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "code",
            "title": "",
            "code": "$(person.address).on(\"propertyChange\", changeHandler); "
          },
          {
            "_type": "code",
            "title": "Modify the value of a property on a chosen path:",
            "code": "$.observable(person).setProperty(\"address.street\", \"1st Ave\");\n"
          }
        ],
        "code": "var person = {\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"Main St\");\n});\n\n$(\"#revert\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"1st Ave\");\n});\n\n$(person.address).on(\"propertyChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The '\" + eventArgs.path + \"' is '\" + eventArgs.value + \"'.\";\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<button id=\"modify\">set to new value</button>\n<button id=\"revert\">set back to original value</button>\n\n<p id=\"messages\"><p>",
        "title": "",
        "height": "110"
      },
      {
        "_type": "para",
        "title": "Sample: Observable property change, with $.observe(...)",
        "text": "This sample uses <a href=\"#observe\">$.observe()</a> to listen to the observable property changes."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "code",
            "title": "",
            "code": "$.observe(person, \"address.street\", changeHandler);"
          },
          {
            "_type": "code",
            "title": "Modify the value of a property on a chosen path:",
            "code": "$.observable(person).setProperty(\"address.street\", \"Main St\");"
          }
        ],
        "code": "var person = {\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"Main St\");\n});\n\n$(\"#revert\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"1st Ave\");\n});\n\n$.observe(person, \"address.street\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The '\" + eventArgs.path + \"' is '\" + eventArgs.value + \"'.\";\n  if (ev.data) {\n    message += \"\\n\\nThe full path is '\" + ev.data.fullPath + \"'.\";\n  }\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<button id=\"modify\">set to new value</button>\n<button id=\"revert\">set back to original value</button>\n\n<p id=\"messages\"><p>",
        "height": "110",
        "title": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "<hr/>"
      },
      {
        "_type": "para",
        "title": "API: Changing multiple properties in one call:",
        "text": "You can make observable changes to one or more properties in one call to <em>setProperty()</em> as follows:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.observable(myObject).setProperty({prop1: ..., prop2: ..., ...})",
        "name": "setProperty",
        "object": "$.observable(object)",
        "method": true,
        "returns": "this",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "newValues",
                "type": "object",
                "optional": false,
                "description": "Path-value pairs for modified properties, e.g. {name: \"newName\", \"address.street\": \"newStreet\"}"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observable(person).setProperty(newValues);",
            "description": "Modify the values of  one or more object properties"
          }
        ],
        "description": "",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "para",
        "title": "Sample: Changing multiple properties in one call:",
        "text": "In this sample we make changes to properties on two different objects, with a single call to <em>setProperty</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "We register a single listener for the observable property changes on both objects - with one call to <a href=\"#observe\">$.observe()</a>."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "code",
            "title": "Modify two properties, on different paths:",
            "code": "$.observable(person).setProperty(\n  {\n    name: \"Hermione\",\n    \"address.street\": \"Main St\"\n  }\n);"
          },
          {
            "_type": "code",
            "title": "Observe both changes with a single $.observe() handler:",
            "code": "$.observe(person, \"name\", \"address.street\", changeHandler); "
          }
        ],
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n\n  $.observable(person).setProperty(\n    {\n      name: \"Hermione\",\n      \"address.street\": \"Main St\"\n    }\n  );\n\n});\n\n$(\"#revert\").on(\"click\", function() {\n\n  $.observable(person).setProperty(\n    {\n      name: \"Pete\",\n      \"address.street\": \"1st Ave.\"\n    }\n  );\n\n});\n\n$.observe(person, \"name\", \"address.street\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The '\" + eventArgs.path + \"' is '\" + eventArgs.value + \"'.\";\n  if (ev.data) {\n    message += \"\\n\\nThe full path is '\" + ev.data.fullPath + \"'.\";\n  }\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<button id=\"modify\">Set new values</button>\n<button id=\"revert\">Return to original values</button>\n\n<p id=\"messages\"><p>",
        "title": "",
        "height": "150"
      }
    ]
  },
  "arrchange": {
    "title": "Modify an array observably",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Use <em>$.observable(myArray)</em> to obtain an <em>observable array</em> - which provides methods for making <em>observable changes</em> to the array:"
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "insert",
            "label": "$.observable(array).insert()"
          },
          {
            "hash": "remove",
            "label": "$.observable(array).remove()"
          },
          {
            "hash": "move",
            "label": "$.observable(array).move()"
          },
          {
            "hash": "refresh",
            "label": "$.observable(array).refresh()"
          }
        ]
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also: <a href=\"#$observable\">Observable objects and arrays</a>)"
      }
    ]
  },
  "insert": {
    "title": "Making observable changes: $.observable(array).insert()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Changing an array observably: inserting items",
        "text": "If you pass an array to <em><a href=\"#$observable\">$.observable()</a></em>, you obtain an <em>observable</em> array (a very lightweight wrapper around your array) which provides methods for modifying the array <em>observably</em>, including an <b><em>insert</em></b> method:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.observable(myArray).insert(index, insertedItems)",
        "name": "insert",
        "object": "$.observable(array)",
        "method": true,
        "returns": "this",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "index",
                "type": "integer",
                "optional": true,
                "description": "Optional index at which insertion will begin. If not specified, items are appended."
              },
              {
                "_type": "param",
                "name": "insertedItems",
                "type": "any",
                "optional": false,
                "description": "item, or array of items, to be inserted"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observable(people).insert(3, insertedItems);",
            "description": "Observably append or insert an item, or set of items"
          }
        ],
        "description": "Insert or append one or more items to an array",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "para",
        "title": "Sample: Appending to an array:",
        "text": "Here is a sample using <em>insert()</em> to append an item to an array."
      },
      {
        "_type": "para",
        "title": "",
        "text": "A <a href=\"#linked-tag-syntax\">data-linked template</a> responds to the observable array changes."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "template",
            "title": "",
            "markup": "var tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);"
          },
          {
            "_type": "code",
            "title": "Append an item:",
            "code": "$.observable(things).insert(\n  {id: \"item\" + count++}\n);"
          }
        ],
        "code": "var things = [{id: \"item1\"}, {id: \"item2\"}],\n  count = 3;\n\n$(\"#append\").on(\"click\", function() {\n  $.observable(things).insert(\n    {id: \"item\" + count++}\n  );\n});\n\n$(\"#insert2\").on(\"click\", function() {\n  $.observable(things).insert(\n    [\n      {id: \"item\" + count++},\n      {id: \"item\" + count++}\n    ]\n  );\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);",
        "html": "<div class=\"left\">\n  <button id=\"append\">Append an item</button>\n  <div id=\"result\"></div>\n</div>",
        "height": "150",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Sample: Append one or more items",
        "text": "Here we'll add an event handler for <a href=\"#onarraychange\">arrayChange</a> to respond to the observable array changes, in addition to the template:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "code",
            "title": "",
            "code": "$([things]).on(\"arrayChange\", changeHandler);"
          },
          {
            "_type": "code",
            "title": "Append two items:",
            "code": "$.observable(things).insert(\n  [\n    {id: \"item\" + count++},\n    {id: \"item\" + count++}\n  ]\n);"
          }
        ],
        "code": "var things = [{id: \"item1\"}, {id: \"item2\"}],\n  count = 3;\n\n$(\"#append1\").on(\"click\", function() {\n  $.observable(things).insert(\n    {id: \"item\" + count++}\n  );\n});\n\n$(\"#append2\").on(\"click\", function() {\n  $.observable(things).insert(\n    [\n      {id: \"item\" + count++},\n      {id: \"item\" + count++}\n    ]\n  );\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) added at index: \" + eventArgs.index;\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"append1\">Append an item</button>\n  <button id=\"append2\">Append two items</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Changes:</label>\n  <div class=\"messages\"></div>\n</div>",
        "height": "150",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Sample: Inserting items at a chosen index",
        "text": "Here we modify the sample above, by specifying the index where we want to insert, rather than simply appending. We'll also show the alternative <a href=\"#observe\">$.observe()</a> API for attaching our handler:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "code",
            "title": "",
            "code": "$.observe(things, changeHandler);"
          },
          {
            "_type": "code",
            "title": "Insert a set of items at a chosen index:",
            "code": "$.observable(things).insert(\n  index,\n  items\n);"
          }
        ],
        "code": "var things = [{id: \"item1\"}, {id: \"item2\"}],\n  count = 3;\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(things).insert(\n    1,\n    {id: \"item\" + count++}\n  );\n});\n\n$(\"#prepend\").on(\"click\", function() {\n  $.observable(things).insert(\n    0,\n    [\n      {id: \"item\" + count++},\n      {id: \"item\" + count++}\n    ]\n  );\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);\n\n$.observe(things, changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) added at index: \" + eventArgs.index;\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"insert\">Insert item at index 1</button>\n  <button id=\"prepend\">Prepend 2 items</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Changes:</label>\n  <div class=\"messages\"></div>\n</div>",
        "height": "150",
        "title": ""
      }
    ]
  },
  "remove": {
    "title": "Making observable changes: $.observable(array).remove()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Changing an array observably: removing items",
        "text": "If you pass an array to <em><a href=\"#$observable\">$.observable()</a></em>, you obtain an <em>observable</em> array (a very lightweight wrapper around your array) which provides methods for modifying the array <em>observably</em>, including a <b><em>remove</em></b> method:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.observable(myArray).remove(index, numToRemove)",
        "name": "remove",
        "object": "$.observable(array)",
        "method": true,
        "returns": "this",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "index",
                "type": "integer",
                "optional": true,
                "description": "Optional index at which removal will begin. If not specified, items are removed from the end of the array."
              },
              {
                "_type": "param",
                "name": "numToRemove",
                "type": "integer",
                "optional": true,
                "description": "Number of items to be removed. If not specified, one item is removed."
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observable(people).remove(3, 2);",
            "description": "Observably remove one or more items from an array"
          }
        ],
        "description": "Remove one or more items from an array",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "para",
        "title": "Sample: Removing the last item in the array",
        "text": "Here is a sample using <em>remove()</em> to remove the last item to an array."
      },
      {
        "_type": "para",
        "title": "",
        "text": "A <a href=\"#linked-tag-syntax\">data-linked template</a> responds to the observable array changes."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "template",
            "title": "",
            "markup": "var tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);"
          },
          {
            "_type": "code",
            "title": "Remove the last item:",
            "code": "$.observable(things).remove();"
          }
        ],
        "code": "var things = [\n  {id: \"item1\"},\n  {id: \"item2\"},\n  {id: \"item3\"}\n];\n\n$(\"#remove\").on(\"click\", function() {\n  $.observable(things).remove();\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);",
        "html": "<div class=\"left\">\n  <button id=\"remove\">Remove last item</button>\n  <div id=\"result\"></div>\n</div>",
        "height": "135",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Sample: Removing an item at a specified index:",
        "text": "Here we'll add an event handler for <a href=\"#onarraychange\">arrayChange</a> to respond to the observable array changes, in addition to the template:"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And we'll remove an item at a specified index."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "code",
            "title": "",
            "code": "$([things]).on(\"arrayChange\", changeHandler);"
          },
          {
            "_type": "code",
            "title": "Remove item at index 0 or index 1:",
            "code": "$.observable(things).remove(0);\n...\n$.observable(things).remove(1);\n"
          }
        ],
        "code": "var things = [\n  {id: \"item1\"},\n  {id: \"item2\"},\n  {id: \"item3\"}\n];\n\n$(\"#remove0\").on(\"click\", function() {\n  $.observable(things).remove(0);\n});\n\n$(\"#remove1\").on(\"click\", function() {\n  $.observable(things).remove(1);\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) removed at index: \" + eventArgs.index;\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"remove0\">Remove item 0</button>\n  <button id=\"remove1\">Remove item 1</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Changes:</label>\n  <div class=\"messages\"></div>\n</div>",
        "height": "135",
        "title": "Observable array change - remove item at chosen index"
      },
      {
        "_type": "para",
        "title": "Sample: Removing one or more items at a chosen index",
        "text": "Here we modify the sample above, by specifying the number of items to remove. We'll also show the alternative <a href=\"#observe\">$.observe()</a> API for attaching our handler:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "code",
            "title": "",
            "code": "$.observe(things, changeHandler);"
          },
          {
            "_type": "code",
            "title": "Remove two items at index 0:",
            "code": "$.observable(things).remove(0, 2);\n"
          }
        ],
        "code": "var things = [\n  {id: \"item1\"},\n  {id: \"item2\"},\n  {id: \"item3\"},\n  {id: \"item4\"}\n];\n\n$(\"#remove0\").on(\"click\", function() {\n  $.observable(things).remove(0, 2);\n});\n\n$(\"#remove1\").on(\"click\", function() {\n  $.observable(things).remove(1);\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);\n\n$.observe(things, changeHandler);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) removed at index: \" + eventArgs.index;\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"remove0\">Remove 2 items at 0</button>\n  <button id=\"remove1\">Remove item 1</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Changes:</label>\n  <div class=\"messages\"></div>\n</div>",
        "height": "150",
        "title": ""
      }
    ]
  },
  "refresh": {
    "title": "Making observable changes: $.observable(array).refresh()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Changing an array observably: replacing all the items",
        "text": "If you pass an array to <em><a href=\"#$observable\">$.observable()</a></em>, you obtain an <em>observable</em> array (a very lightweight wrapper around your array) which provides methods for modifying the array <em>observably</em>, including a <b><em>refresh</em></b> method:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.observable(myArray).refresh(newItems)",
        "name": "refresh",
        "object": "$.observable(array)",
        "method": true,
        "returns": "this",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "index",
                "type": "array",
                "optional": false,
                "description": "Array containing the new set of items"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observable(people).refresh(newItems);",
            "description": "Observably refresh the contents of an array"
          }
        ],
        "description": "Refresh an array with a modified or sorted set of items",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "para",
        "title": "Sample: Refreshing items in an array (replace or sort)",
        "text": "Here is a sample using <em>refresh()</em> to replace items within an array."
      },
      {
        "_type": "para",
        "title": "",
        "text": "A <a href=\"#linked-tag-syntax\">data-linked template</a> responds to the observable array changes. And we'll also add an event handler for <a href=\"#onarraychange\">arrayChange</a> to respond to the observable array changes:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "code",
            "title": "",
            "code": "$([things]).on(\"arrayChange\", changeHandler); "
          },
          {
            "_type": "code",
            "title": "Replacing with the same items in different order:",
            "code": "$.observable(things).refresh(\n  things.reverse()\n);"
          },
          {
            "_type": "code",
            "title": "Replacing with a different set of items",
            "code": "$.observable(things).refresh(\n  (things.length === 5 ? otherItems : items)\n);\n"
          }
        ],
        "code": "var items = [\n    {id: \"item1\"},\n    {id: \"item2\"},\n    {id: \"item3\"},\n    {id: \"item4\"},\n    {id: \"item5\"}\n  ],\n  otherItems = [\n    {id: \"otherItem1\"},\n    {id: \"otherItem2\"},\n    {id: \"otherItem3\"}\n  ],\n  things = [\n    items[0],\n    items[1],\n    items[2],\n    items[3],\n    items[4]\n  ];\n\n$(\"#sort\").on(\"click\", function() {\n  $.observable(things).refresh(\n    things.reverse()\n  );\n});\n\n$(\"#replace\").on(\"click\", function() {\n  $.observable(things).refresh(\n    (things.length === 5 ? otherItems : items)\n  );\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"Previous length: \" + eventArgs.oldItems.length\n     + \". New length: \" + ev.target.length;\n\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"sort\">Reverse sort the items</button><br/>\n  <button id=\"replace\">Replace the items</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Changes:</label>\n  <div class=\"messages\"></div>\n</div>",
        "height": "200",
        "title": ""
      }
    ]
  },
  "move": {
    "title": "Making observable changes: $.observable(array).move()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Changing an array observably: moving items",
        "text": "If you pass an array to <em><a href=\"#$observable\">$.observable()</a></em>, you obtain an <em>observable</em> array (a very lightweight wrapper around your array) which provides methods for modifying the array <em>observably</em>, including a <b><em>move</em></b> method:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.observable(myArray).move(oldIndex, newIndex, numToMove)",
        "name": "move",
        "object": "$.observable(array)",
        "method": true,
        "returns": "this",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "oldIndex",
                "type": "integer",
                "optional": false,
                "description": "Optional index at which insertion will begin. If not specified, items are appended."
              },
              {
                "_type": "param",
                "name": "newIndex",
                "type": "integer",
                "optional": false,
                "description": "item, or array of items, to be inserted"
              },
              {
                "_type": "param",
                "name": "numToMove",
                "type": "integer",
                "optional": true,
                "description": ""
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observable(people).move(3, 5, 2);",
            "description": "Observably move an item, or sequence of items, in an array."
          }
        ],
        "description": "Move one or more items in an array",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "para",
        "title": "Sample: Moving items in an array",
        "text": "Here is a sample using <em>move()</em> to move items within an array."
      },
      {
        "_type": "para",
        "title": "",
        "text": "A <a href=\"#linked-tag-syntax\">data-linked template</a> responds to the observable array changes. And we'll also add an event handler for <a href=\"#onarraychange\">arrayChange</a> to respond to the observable array changes:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "code",
            "title": "",
            "code": "$([things]).on(\"arrayChange\", changeHandler); "
          },
          {
            "_type": "code",
            "title": "Moving one item from index 2 to index 0:",
            "code": "$.observable(things).move(2, 0);"
          },
          {
            "_type": "code",
            "title": "Moving two items from index 0 to index 1:",
            "code": "$.observable(things).move(0, 1, 2);"
          }
        ],
        "code": "var things = [\n  {id: \"item1\"},\n  {id: \"item2\"},\n  {id: \"item3\"},\n  {id: \"item4\"},\n  {id: \"item5\"}\n];\n\n$(\"#move1\").on(\"click\", function() {\n  $.observable(things).move(2, 0);\n});\n\n$(\"#move2\").on(\"click\", function() {\n  $.observable(things).move(0, 3, 2);\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) moved from index: \"\n  + eventArgs.oldIndex + \" to index: \" + eventArgs.index;\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"move1\">Move 1 item at from 2 to 0</button><br/>\n  <button id=\"move2\">Move 2 items from 0 to 3</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Changes:</label>\n  <div class=\"messages\"></div>\n</div>",
        "height": "200",
        "title": ""
      }
    ]
  },
  "observeobjectsarrays": {
    "title": "Respond to data changes",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "Handling change events for objects and arrays:",
        "links": [],
        "topics": [
          {
            "hash": "onpropchange",
            "label": "onPropertyChange"
          },
          {
            "hash": "onarrchange",
            "label": "onArrayChange"
          },
          {
            "hash": "observe",
            "label": "$.observe()"
          },
          {
            "hash": "unobserve",
            "label": "$.unobserve()"
          }
        ]
      }
    ]
  },
  "onpropchange": {
    "title": "Event Handler: onPropertyChange",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews and JsObservable raise a jQuery event: <em>\"propertyChange\"</em>, whenever an object changes observably."
      },
      {
        "_type": "para",
        "title": "",
        "text": "To handle the <em>propertyChange</em> changes you have two alternatives:\n<ul class=\"textbefore\">\n<li>use jQuery <em>.on()</em> to attach an event handler to the object</li>\n<li>use <a href=\"#observe\">$.observe()</a> to associate a handler with the object, or with a <em>path</em> including the object</li>\n</ul>"
      },
      {
        "_type": "code",
        "title": "Using jQuery .on()",
        "code": "$(myObject).on(\"propertyChange\", myHandler);"
      },
      {
        "_type": "code",
        "title": "Using <a href=\"#observe\">$.observe()</a>",
        "code": "$.observe(myObject, \"*\" , changeHandler); // Choose path \"*\" to listen to changes on all properties of myObject "
      },
      {
        "_type": "para",
        "title": "",
        "text": "This approach also brings some advantages if you want to listen to changes on more than one object or array, or if you want to listen to \"deep changes\" on a path - i.e. changes not only on the leaf, but on objects higher up the path..."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "function myHandler(ev, eventArgs) { ... }",
        "name": "myHandler",
        "object": "",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "ev",
                "type": "object",
                "optional": false,
                "description": "jQuery event object, with properties which include <ul class=\"textbefore\"><li><b>target</b>: the object which changed</li><li><b>data</b>: JsViews metadata, such as <em>fullPath</em></li></ul>"
              },
              {
                "_type": "param",
                "name": "eventArgs",
                "type": "object",
                "optional": false,
                "description": "JsViews propertyChange event object, with properties <b>path</b>,  <b>value</b> and <b>oldValue</b>. (With <b>change</b>=<em>\"set\"</em>)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$(person).on(\"propertyChange\", myHandler); ",
            "description": "Handler for JsViews observable property change events"
          }
        ],
        "description": "An event handler for propertyChange events",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "code",
            "title": "Add a handler for <b>propertyChange</b> events on the <b>person</b> object:",
            "code": "$(person).on(\"propertyChange\", changeHandler); \n"
          },
          {
            "_type": "code",
            "title": "",
            "code": "function changeHandler(ev, eventArgs) {\n  var message = ... + eventArgs.path + ... + eventArgs.value ...;\n  ...\n}"
          }
        ],
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty(\n    {\n      name: \"Hermione\",\n      \"address.street\": \"Main St\"\n    }\n  );\n});\n\n$(\"#revert\").on(\"click\", function() {\n  $.observable(person).setProperty(\n    {\n      name: \"Pete\",\n      \"address.street\": \"1st Ave.\"\n    }\n  );\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nvar tmpl = $.templates(\n   \"Name: <input data-link=\\\"name trigger=true\\\" /><br/>\"\n + \"Street: <input data-link=\\\"address.street trigger=true\\\" />\"\n);\n\ntmpl.link(\"#result\", person);\n\n$(person).on(\"propertyChange\", changeHandler); \n\n$(person.address).on(\"propertyChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The new '\" + eventArgs.path + \"' is '\"\n                  + eventArgs.value + \"'.\";\n\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"modify\">set to new values</button><br/>\n  <button id=\"revert\">set back to original values</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>",
        "height": "200",
        "title": "Handling property change events"
      }
    ]
  },
  "onarrchange": {
    "title": "Event Handler: onArrayChange",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews and JsObservable raise a jQuery event: <em>\"arrayChange\"</em>, whenever an array changes observably."
      },
      {
        "_type": "para",
        "title": "",
        "text": "To handle the <em>arrayChange</em> changes you have two alternatives:\n<ul class=\"textbefore\">\n<li>use jQuery <em>.on()</em> to attach an event handler to the array</li>\n<li>use <a href=\"#observe\">$.observe()</a> to associate a handler with the array, or with a <em>path</em> including the array</li>\n</ul>"
      },
      {
        "_type": "code",
        "title": "Using jQuery .on()",
        "code": "$([myArray]).on(\"arrayChange\", myHandler);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(Note the syntax with the wrapped array: <em>$(<b>[</b>myArray<b>]</b>).on();</em>. If you write <em>$(myArray).on();</em> you will be listening to each item in the array, not to the array itself)."
      },
      {
        "_type": "code",
        "title": "Using <a href=\"#observe\">$.observe()</a>",
        "code": "$.observe(myArray, changeHandler); "
      },
      {
        "_type": "para",
        "title": "",
        "text": "This approach also brings some advantages if you want to listen to changes on more than one object or array, or if you want to listen to \"deep changes\" on a path - i.e. changes not only on the leaf, but on objects higher up the path..."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "function myHandler(ev, eventArgs) { ... }",
        "name": "myHandler",
        "object": "",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "ev",
                "type": "object",
                "optional": false,
                "description": "jQuery event object, with properties which include <ul class=\"textbefore\"><li><b>target</b>: the object which changed</li><li><b>data</b>: JsViews metadata, such as <em>fullPath</em></li></ul>"
              },
              {
                "_type": "param",
                "name": "eventArgs",
                "type": "object",
                "optional": false,
                "description": "JsViews arrayChange event object, with properties <b>change</b> and additional properties specific to the 'change' type:<ul style='font-style:normal'><li>For <em>insert</em>: <b>index</b> and <b>items</b>. (With <b>change</b>=<em>\"insert\"</em>)</li><li>For <em>remove</em>: <b>index</b> and <b>numToRemove</b>. (With <b>change</b>=<em>\"remove\"</em>)</li><li>For <em>move</em>: <b>oldIndex</b>, <b>index</b> and <b>items</b>. (With <b>change</b>=<em>\"move\"</em>)</li><li>For <em>refresh</em>: <b>oldItem</b>. (With <b>change</b>=<em>\"refresh\"</em>)</li></ul>"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$([myArray]).on(\"arrayChange\", myHandler); ",
            "description": "Handler for JsViews observable array change events"
          }
        ],
        "description": "An event handler for arrayChange events",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "para",
        "title": "Samples for the <b>handling array change events</b>:",
        "text": "Each of the following API topics includes samples showing the <em>arrayChange</em> event handler for the corresponding type of array change:\n\n<ul class=\"textbefore\">\n<li><a href=\"#insert\">$.observable(array).insert()</a></li>\n<li><a href=\"#remove\">$.observable(array).remove()</a></li>\n<li><a href=\"#move\">$.observable(array).move()</a></li>\n<li><a href=\"#refresh\">$.observable(array).refresh()</a></li>\n</ul>"
      }
    ]
  },
  "observe": {
    "title": "Observing data: $.observe()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Whenever objects or arrays are changed observably, JsViews raises the corresponding <a href=\"#onpropchange\">propertyChange</a> or <a href=\"#onarrchange\">arrayChange</a> jQuery event."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Data-linked templates respond to those events automatically, but if you want to run code in response to data-change events you have two alternatives:\n<ul class=\"textbefore\">\n<li>use jQuery <em>.on()</em> to attach the <a href=\"#onpropchange\">propertyChange</a> or <a href=\"#onarrchange\">arrayChange</a> event handler to any object or array you want to 'listen to'</li>\n<li>use <em>$.observe()</em> to associate a handler with one or more objects, arrays, or <em>paths</em></li>\n</ul>"
      },
      {
        "_type": "code",
        "title": "Using $.observe()",
        "code": "$.observe(myObjectOrArray, ..., changeHandler);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "This approach allows you to register a single handler to listen to changes on multiple targets, which can include both objects and arrays."
      },
      {
        "_type": "para",
        "title": "Examples:",
        "text": "1. Observe changes to a specific property:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.observe(person, \"firstName\", changeHandler);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "2. Observe changes to a specific property <em>of type array</em>:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.observe(person, \"phones\", changeHandler);\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here <em>changeHandler</em> will handle both:\n<ul>\n<li>array changes, and</li> \n<li>setting a new value to the property (switching to a new array, or setting to null or undefined)</li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "3. Observe changes to <em>any</em> property on an object:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.observe(person, \"*\", changeHandler); \n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here <em>changeHandler</em> will handle both:\n<ul>\n<li>any changes to the value of <b>any</b> property of the object</li> \n<li>in addition, in the case of any property that is of type <em>array</em>, it will also handle <em>array change events</em> for that property</li>\n</ul>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "4. Observe changes on an array:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.observe(person.phones, changeHandler); "
      },
      {
        "_type": "para",
        "title": "",
        "text": "5. Observe multiple objects/properties/arrays:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.observe(person, \"lastName\", \"phones\", \"address.street\", changeHandler);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here <em>changeHandler</em> will handle both:\n<ul>\n<li>changes to <em>lastName</em></li> \n<li>array changes to the current <em>phones</em> (array), or changes if a new array is assigned to the <em>phones</em> property</li>\n<li>changes to the <em>street</em> property of the <em>address</em> property of <em>person</em></li>\n</ul>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "6. Observe paths under more than object:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.observe(person1, \"lastName\", \"address.*\", person2, \"firstName\", person3, \"*\", \"address.*\", changeHandler);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here <em>changeHandler</em> handles:\n<ul>\n<li>for <em>person1</em>: changes to <em>lastName</em> and any <em>address</em> property</li> \n<li>for <em>person2</em>: changes to <em>firstName</em></li>\n<li>for <em>person3</em>: changes to any property of the <em>person3</em> object itself, and to any property of the <em>person3.address</em> object</li>\n</ul>\n"
      },
      {
        "_type": "para",
        "title": "Paths: leaf changes or deep changes",
        "text": "By default you listen to the leaf of a path, but you can specify if you want to listen to listen also to changes on objects higher up the path..."
      },
      {
        "_type": "para",
        "title": "",
        "text": "For example, here:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.observe(team, \"manager.address.street\", changeHandler);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>changeHandler</em> will be called if the value of the <em>street</em> property of the <em>team.manager.address</em> object changes. So it is listening to leaf changes on the path <em>\"manager.address.street\"</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "It will not be called if the <em>team.manager</em> property is swapped to a different <em>manager</em> object, or if the <em>team.manager.address</em> property is swapped to a different <em>address</em> object."
      },
      {
        "_type": "para",
        "title": "",
        "text": "But by a simple syntax change, the path can be made to listen to changes not only on the leaf property, but also changes on objects higher up the path. These are <em>deep changes</em> on the path: "
      },
      {
        "_type": "para",
        "title": "",
        "text": "For example, this path:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.observe(team, \"manager.address^street\", changeHandler);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "will listen to changes to the <em>street</em> property of <em>address</em>, or the <em>address</em> property of <em>manager</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "And the following:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.observe(team, \"manager^address.street\", changeHandler);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "will listen to changes to the <em>street</em> property of <em>address</em>, the <em>address</em> property of <em>manager</em>, <em><b>and</b></em> the <em>manager</em> property of <em>team</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Simply replace a '.' with a '^' at the level up to which you want to listen to changes."
      },
      {
        "_type": "para",
        "title": "",
        "text": "(If you know that in your app the objects higher up the path will never change dynamically, then stick with the default <em>leaf</em> binding, since that will provide better perf optimization...)"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.observe(objectOrArray, ..., myHandler)",
        "name": "observe",
        "object": "$",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "objectOrArray",
                "type": "object",
                "optional": false,
                "description": "objectOrArray to be 'observed'"
              },
              {
                "_type": "param",
                "name": "path",
                "type": "string",
                "optional": true,
                "description": "One or more paths specifying properties to be 'observed'"
              },
              {
                "_type": "param",
                "name": "...",
                "type": "string",
                "optional": true,
                "description": "Additional paths"
              },
              {
                "_type": "param",
                "name": "myHandler",
                "type": "function",
                "optional": false,
                "description": "Event handler being registered (See <b>API: function myHandler</b> below for details)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observe(person, \"address.street\", myHandler); ",
            "description": "Handle observable property or array change events"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "object",
                "type": "object",
                "optional": false,
                "description": "object to be 'observed'"
              },
              {
                "_type": "param",
                "name": "\"*\"",
                "type": "string",
                "optional": false,
                "description": "wild card path - for <em>all</em> properties"
              },
              {
                "_type": "param",
                "name": "myHandler",
                "type": "function",
                "optional": false,
                "description": "Event handler being registered (See <b>API: function myHandler</b> below for details)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observe(person, \"*\", myHandler); ",
            "description": "Handle all property change events on an object"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "array",
                "type": "array",
                "optional": false,
                "description": "objectOrArray to be 'observed'"
              },
              {
                "_type": "param",
                "name": "myHandler",
                "type": "function",
                "optional": false,
                "description": "Event handler being registered (See <b>API: function myHandler</b> below for details)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observe(phones, myHandler); ",
            "description": "Handle array change events on an array"
          }
        ],
        "description": "Register a handler for observable changes on one or more objects or data paths",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "function myHandler(ev, eventArgs) { ... }",
        "name": "myHandler",
        "object": "",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "ev",
                "type": "object",
                "optional": false,
                "description": "jQuery event object, with properties which include <ul class=\"textbefore\"><li><b>target</b>: the object which changed</li><li><b>data</b>: JsViews metadata, including: <b>fullPath</b> (the data-linking path such as \"address.street\")</li></ul>"
              },
              {
                "_type": "param",
                "name": "eventArgs",
                "type": "object",
                "optional": false,
                "description": "JsViews event object for property or array changes, with properties <b>change</b> and additional properties specific to the 'change' type:<ul style='font-style:normal'><li>For <em>setProperty</em>: <b>path</b>, <b>value</b> and <b>oldValue</b>. (With <b>change</b>=<em>\"set\"</em>)</li><li>For <em>insert</em>: <b>index</b> and <b>items</b>. (With <b>change</b>=<em>\"insert\"</em>)</li><li>For <em>remove</em>: <b>index</b> and <b>numToRemove</b>. (With <b>change</b>=<em>\"remove\"</em>)</li><li>For <em>move</em>: <b>oldIndex</b>, <b>index</b> and <b>items</b>. (With <b>change</b>=<em>\"move\"</em>)</li><li>For <em>refresh</em>: <b>oldItem</b>. (With <b>change</b>=<em>\"refresh\"</em>)</li></ul>"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observe(person, \"address.street\", myHandler); ",
            "description": "Handler for observable property or array change events"
          }
        ],
        "description": "An event handler for observable data changes - registered using <em>$.observe(...)</em> or <em>$.observable(object).observeAll(...)</em>",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "para",
        "title": "Samples:",
        "text": "Here is a sample showing <em>$.observe(person, \"name\", \"address^*\", changeHandler);</em>"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "para",
            "title": "Register a handler for changes: ",
            "text": "We handle changes in the <em>name</em>  and <em>address</em> properties of the <b>person</b>, and <em>any property</em> of the <b>address</b>:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.observe(person, \"name\", \"address^*\", changeHandler);"
          },
          {
            "_type": "code",
            "title": "Define the handler:",
            "code": "function changeHandler(ev, eventArgs) {\n  var message = ... + eventArgs.path + ... + eventArgs.value ...;\n  ...\n}"
          },
          {
            "_type": "template",
            "title": "Template also binds to 'deep paths'",
            "markup": "<input data-link=\"address^street trigger=true\" />"
          },
          {
            "_type": "code",
            "title": "Modify values through template binding or buttons:",
            "code": "$(\"#changeAddress\").on(\"click\", function() {\n  $.observable(person).setProperty(\n    \"address\", \n    {\n      street: \"New Street\",\n      ZIP: \"99999\"\n    }\n..."
          }
        ],
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\",\n    ZIP: \"34009\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\",\n    \"address.ZIP\": \"45008\"\n  });\n});\n\n$(\"#changeAddress\").on(\"click\", function() {\n  $.observable(person).setProperty(\n    \"address\", \n    {\n      street: \"New Street\",\n      ZIP: \"99999\"\n    }\n  );\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\n$.observe(person, \"name\", \"address^*\", changeHandler);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The new <b>\" + eventArgs.path + \"</b> is <em>\"\n                + JSON.stringify(eventArgs.value) + \"</em>.\";\n\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"modify\">Change leaf values</button>\n  <button id=\"changeAddress\">New address</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name trigger=true\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street trigger=true\" /></td></tr>\n    <tr><td>ZIP:</td><td><input data-link=\"address^ZIP trigger=true\" /></td></tr>\n  </tbody></table>\n</script>",
        "height": "230",
        "title": "Handling change events using $.observe()"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now we modify the above sample to show <em>$.observe(person, ...)</em> also handling <em>array</em> properties: a <b>phones</b> property of <em>person</em>"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "para",
            "title": "Register a handler for changes: ",
            "text": "We handle changes in the <em>name</em>, <em>address</em> and <em>phones</em> properties of the <b>person</b>, and the <em>street</em> property of the <b>address</b>."
          },
          {
            "_type": "para",
            "title": "",
            "text": "Because the <em>phones</em> property is itself an array, we also handle array changes on the <em>phones</em> array:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.observe(person, \"name\", \"address^street\", \"phones\", changeHandler);"
          },
          {
            "_type": "para",
            "title": "Define our handler:",
            "text": "(Note that it outputs <em>all</em> the fields of <em>eventArgs</em>)"
          },
          {
            "_type": "code",
            "title": "",
            "code": "function changeHandler(ev, eventArgs) {\n  var message = \"\";\n  for (var key in eventArgs) {\n    message += ... key ... eventArgs[key]...\n  }\n  ...\n}"
          }
        ],
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\",\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\",\n  });\n});\n\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    address: {street: \"New Street\"},\n    phones: [{number:\"123 123 1234\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number:\"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\n$.observe(person, \"name\", \"address^street\", \"phones\", changeHandler);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"modify\">Change leaf values</button><br/>\n  <button id=\"changeObjects\">New address and phones</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name trigger=true\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street trigger=true\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input data-link=\"number\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>\n",
        "height": "350",
        "title": "Handling both property change and array change events, using $.observe()"
      },
      {
        "_type": "para",
        "title": "",
        "text": "But notice that if you change the value of a phone number, our handler does not 'listen' to that change."
      },
      {
        "_type": "para",
        "title": "",
        "text": "The <em><a href=\"#observeAll\">.observeAll()</a></em> API provides a very simple way include those changes too."
      },
      {
        "_type": "para",
        "title": "",
        "text": ""
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "unobserveAll",
            "label": "unobserveAll()"
          },
          {
            "_type": "topic",
            "hash": "observe",
            "label": "observe()"
          },
          {
            "_type": "topic",
            "hash": "explore/objectsorvm",
            "label": "Plain objects or View Model"
          }
        ]
      }
    ]
  },
  "unobserve": {
    "title": "Removing 'observe' handlers: $.unobserve()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "A single call to <b><a href=\"#observe\">$.observe(... myHandler)</a></b> will attach the handler to one or more objects and arrays - to listen to corresponding propertyChange or arrayChange events."
      },
      {
        "_type": "para",
        "title": "",
        "text": "The same call (same parameters) but with <b>$.unobserve(...)</b> instead of <b>$.observe(...)</b> will remove the handler from each of those objects."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.unobserve(objectOrArray, ..., myHandler)",
        "name": "unobserve",
        "object": "$",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "objectOrArray",
                "type": "object",
                "optional": false,
                "description": "objectOrArray to be 'observed'"
              },
              {
                "_type": "param",
                "name": "path",
                "type": "string",
                "optional": true,
                "description": "One or more paths specifying properties to be 'observed'"
              },
              {
                "_type": "param",
                "name": "...",
                "type": "string",
                "optional": true,
                "description": "Additional paths"
              },
              {
                "_type": "param",
                "name": "myHandler",
                "type": "function",
                "optional": true,
                "description": "Event handler being registered (See <b>API: function myHandler</b> below for details)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.unobserve(person, \"address.street\", myHandler); ",
            "description": "Remove handler for observable  changes on specific paths"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "objectOrArray",
                "type": "object",
                "optional": false,
                "description": "objectOrArray to be 'observed'"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.unobserve(person); ",
            "description": "Remove all handlers for all observable changes to target object/array"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "objectOrArray",
                "type": "object",
                "optional": false,
                "description": "objectOrArray to be 'observed'"
              },
              {
                "_type": "param",
                "name": "path",
                "type": "string",
                "optional": true,
                "description": "One or more paths specifying properties to be 'observed'"
              },
              {
                "_type": "param",
                "name": "...",
                "type": "string",
                "optional": true,
                "description": "Additional paths"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.unobserve(person, \"address.street\");",
            "description": "Remove any handlers targetting specific properties or paths"
          }
        ],
        "description": "Unregister a handler for observable changes on one or more objects or data paths",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "para",
        "title": "Samples:",
        "text": "Here is a copy of a sample from the <em><a href=\"#observe\">$.observe()</a></em> topic, on which we have used <em>observe/unobserve</em> to provide an <em>enable/disable checkbox</em> on the <em>Change Log</em>:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "template",
            "title": "",
            "markup": "<input type=\"checkbox\" checked id=\"attach\"/>"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});"
          },
          {
            "_type": "code",
            "title": "Call unobserve with the same paths and handler, to stop 'listening'...",
            "code": "function logChanges(enable) {\n  if (enable) {\n    $.observe(person, \"name\", \"address^*\", changeHandler);\n  } else {\n    $.unobserve(person, \"name\", \"address^*\", changeHandler);\n  }\n}"
          }
        ],
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\",\n    ZIP: \"34009\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\",\n    \"address.ZIP\": \"45008\"\n  });\n});\n\n$(\"#changeAddress\").on(\"click\", function() {\n  $.observable(person).setProperty(\n    \"address\", \n    {\n      street: \"New Street\",\n      ZIP: \"99999\"\n    }\n  );\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observe(person, \"name\", \"address^*\", changeHandler);\n  } else {\n    $.unobserve(person, \"name\", \"address^*\", changeHandler);\n  }\n}\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\n$.observe(person, \"name\", \"address^*\", changeHandler);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The new <b>\" + eventArgs.path + \"</b> is <em>\"\n                + JSON.stringify(eventArgs.value) + \"</em>.\";\n\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"modify\">Change leaf values</button>\n  <button id=\"changeAddress\">New address</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <input type=\"checkbox\" checked id=\"attach\"/>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name trigger=true\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street trigger=true\" /></td></tr>\n    <tr><td>ZIP:</td><td><input data-link=\"address^ZIP trigger=true\" /></td></tr>\n  </tbody></table>\n</script>",
        "height": "230",
        "title": "Using $.unobserve() to remove handlers"
      },
      {
        "_type": "para",
        "title": "$.unobserve variants",
        "text": "<em>Omitting the handler and paths:</em>"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.unobserve(object)"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The above call will remove <em>all</em> change handlers from the object. For example, if you choose <em>Try it</em> in the sample above, and replace the unobserve call by <em>$.unobserve(person);</em> you'll see that unchecking has the effect of removing JsViews data-link binding in the template too."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>Omitting handler but keeping paths:</em>"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.unobserve(person, \"name\");"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The above call will remove all bindings of <em>person.name</em>, so choosing <em>Try it</em> and making that change will stop the <em>name</em> binding for both template and message log, but both will continue to respond to changes in <em>address</em> or <em>zip</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>unobserve using \"*\"</em>:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.unobserve(person, \"*\", changeHandler);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The above call will remove handlers for <em>all properties</em> of <em>person</em>, so choosing <em>Try it</em> and making that change will stop the changes to <em>name</em> or <em>setting</em> the <em>address</em> from showing in the log, but changes in <em>street</em> or <em>zip</em> on the <em>address</em> object will still show."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>unobserving arrays, or multiple objects</em>"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.unobserve(person, \"name\", person.phones, changeHandler);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The above call will stop handing changes to <em>person.name</em>, and will stop listening to array change events on the <em>person.phones</em> array. You can test it by choosing <em>Try it</em> on the sample below, (based on the last sample in the <em><a href=\"#observe\">$.observe()</a></em> topic):"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And this variant is almost the same:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.unobserve(person, \"name\", \"phones\", changeHandler);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "- but in addition it will stop listening to <em>setting</em> the <em>phones</em> property of <em>person</em> "
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "code",
            "title": "Call unobserve with the same paths and handler, to stop 'listening'..",
            "code": "function logChanges(enable) {\n  if (enable) {\n    $.observe(person, \"name\", \"address^street\", \"phones\", changeHandler);\n  } else {\n    $.unobserve(person, \"name\", \"address^street\", \"phones\", changeHandler);\n  }\n}"
          }
        ],
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"modify\">Change leaf values</button><br/>\n  <button id=\"changeObjects\">New address and phones</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <input type=\"checkbox\" checked id=\"attach\"/></b>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name trigger=true\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street trigger=true\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <span>{{:number}}</span>\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\",\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\",\n  });\n});\n\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    address: {street: \"New Street\"},\n    phones: [{number:\"123 123 1234\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number:\"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observe(person, \"name\", \"address^street\", \"phones\", changeHandler);\n  } else {\n    $.unobserve(person, \"name\", \"address^street\", \"phones\", changeHandler);\n  }\n}\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "title": "Modified sample showing also unobserve() for arrays:"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "unobserveAll",
            "label": "unobserveAll()"
          },
          {
            "_type": "topic",
            "hash": "observe",
            "label": "observe()"
          },
          {
            "_type": "topic",
            "hash": "explore/objectsorvm",
            "label": "Plain objects or View Model"
          }
        ]
      }
    ]
  },
  "$observable": {
    "title": "Making \"observable\" changes to objects and arrays",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In current JavaScript implementations, modifying objects or arrays does not raise any event, so there is no way for the change to be detected elsewhere."
      },
      {
        "_type": "para",
        "title": "",
        "text": "JsViews dynamic data-bound UI solves this through <em>data-linking</em>, using the <em>JsObservable observer pattern</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>$.observable()</em> provides a way for you to change objects or arrays <em>observably</em>. Each change will raise a <a href=\"#onpropchange\">property change</a> or <a href=\"#onarrchange\">array change</a> event. "
      },
      {
        "_type": "para",
        "title": "",
        "text": "JsViews uses those events to make any <a href=\"#linked-template-syntax\">data-linked tags or elements</a> in your templates update automatically in response to each change in your underlying data."
      },
      {
        "_type": "para",
        "title": "",
        "text": "In addition, it ensures that those events are raised when the user interacts with a data-linked template, and causes changes to the underlying data."
      },
      {
        "_type": "para",
        "title": "",
        "text": "JsViews also lets you register <a href=\"#observeobjectsarrays\">event handlers or listeners</a>, so your code can listen to the observable changes made to your data objects or view models."
      },
      {
        "_type": "para",
        "title": "$.observable(myObject) and $.observable(myArray)",
        "text": "If you pass an <em>object</em> to <em>$.observable()</em> then you obtain an <b><em>observable</em> object</b> (a very lightweight wrapper around your object), which provides a method for modifying object properties observably:\n<ul class=\"textbefore\">\n<li><a href=\"#setprop\">setProperty</a></li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Similarly, if you pass an <em>array</em> to <em>$.observable()</em> then you obtain an <b><em>observable</em> array</b> (a lightweight wrapper around your array) which provides a different set of methods, specific to modifying arrays: \n<ul class=\"textbefore\">\n<li><a href=\"#insert\">insert</a></li>\n<li><a href=\"#remove\">remove</a></li>\n<li><a href=\"#move\">move</a></li>\n<li><a href=\"#refresh\">refresh</a></li>\n</ul>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that you don't need hold on to the <em>observable</em> wrapped object for reuse. It is so lightweight you can just call <em>$.observable(...)</em> again every time you need to make further changes to your object or array."
      }
    ]
  },
  "observeAll": {
    "title": "Observing all objects in an object hierarchy: $.observable().observeAll()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The <em>.observeAll()</em> API allows you to register a single handler to listen to <b><em>all</em></b> the changes under a chosen object or array."
      },
      {
        "_type": "para",
        "title": "",
        "text": "This means that no matter how complex the hierarchy of objects under the targeted object or array, and no matter how complex the structural changes made to that object hierarchy, the handler will continue to listen to any change on any object or array in the tree."
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.observable(myObjectOrArray).observeAll(myHandler)"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.observable(objectOrArray).observeAll(myHandler)",
        "name": "observeAll",
        "object": "$.observable(objectOrArray)",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "myHandler",
                "type": "function",
                "optional": false,
                "description": "Event handler being registered (See <b>API: function myHandler</b> below for details)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observable(person).observeAll(myHandler)",
            "description": "Observe all changes under an object or array"
          }
        ],
        "description": "Register an event handler to observe all changes in an object and on any nested object or array in the 'object graph'  under it",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "para",
        "title": "",
        "text": "The <em>myHandler</em> function registered using the <em>.observeAl()</em> is identical to the handler use with <em><a href=\"#$observe\">$.observe()</a></em>:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "function myHandler(ev, eventArgs) { ... }",
        "name": "myHandler",
        "object": "",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "ev",
                "type": "object",
                "optional": false,
                "description": "jQuery event object, with properties which include <ul class=\"textbefore\"><li><b>target</b>: the object which changed</li><li><b>data</b>: JsViews metadata, including: <b>fullPath</b> (the data-linking path such as \"address.street\")</li></ul>"
              },
              {
                "_type": "param",
                "name": "eventArgs",
                "type": "object",
                "optional": false,
                "description": "JsViews event object for property or array changes, with properties <b>change</b> and additional properties specific to the 'change' type:<ul style='font-style:normal'><li>For <em>setProperty</em>: <b>path</b>, <b>value</b> and <b>oldValue</b>. (With <b>change</b>=<em>\"set\"</em>)</li><li>For <em>insert</em>: <b>index</b> and <b>items</b>. (With <b>change</b>=<em>\"insert\"</em>)</li><li>For <em>remove</em>: <b>index</b> and <b>numToRemove</b>. (With <b>change</b>=<em>\"remove\"</em>)</li><li>For <em>move</em>: <b>oldIndex</b>, <b>index</b> and <b>items</b>. (With <b>change</b>=<em>\"move\"</em>)</li><li>For <em>refresh</em>: <b>oldItem</b>. (With <b>change</b>=<em>\"refresh\"</em>)</li></ul>"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observe(person, \"address.street\", myHandler); ",
            "description": "Handler for observable property or array change events"
          }
        ],
        "description": "An event handler for observable data changes - registered using <em>$.observe(...)</em> or <em>$.observable(object).observeAll(...)</em>",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "para",
        "title": "Sample:",
        "text": "We'll use the <em>observeAll()</em> API to update our last sample in the <em><a href=\"#$observe\">$.observe()</a></em> topic, so that now we will be able to include listening to newly added items in the phone array, which we were not able to achieve in our previous version...:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "para",
            "title": "A single observeAll call for observing all the objects",
            "text": "Even phone objects added to the phones array will automatically be 'listened' to by our handler, without us needing to write any additional code."
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.observable(person).observeAl(changeHandler);"
          },
          {
            "_type": "code",
            "title": "Define our handler:",
            "code": "function changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += ... key ... eventArgs[key]...\n  }\n  ...\n}"
          }
        ],
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\",\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\",\n  });\n});\n\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    address: {street: \"New Street\"},\n    phones: [{number:\"123 123 1234\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number:\"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\n$.observable(person).observeAll(changeHandler);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"modify\">Change leaf values</button><br/>\n  <button id=\"changeObjects\">New address and phones</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name trigger=true\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street trigger=true\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input data-link=\"number trigger=true\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>\n",
        "height": "350",
        "title": "Handling both property change and array change events, using .observeAll()"
      },
      {
        "_type": "para",
        "title": "observeAll with View Model object hierarchies",
        "text": "The <em>observeAll()</em> API works equally well with View Model objects or plain objects. See <a href=\"#explore/objectsorvm\">plain objects or View Model</a>. At the end of that topic we show our <em>observeAll()</em> sample above, using View Model objects."
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "unobserveAll",
            "label": "unobserveAll()"
          },
          {
            "_type": "topic",
            "hash": "observe",
            "label": "observe()"
          },
          {
            "_type": "topic",
            "hash": "explore/objectsorvm",
            "label": "Plain objects or View Model"
          }
        ]
      }
    ]
  },
  "unobserveAll": {
    "title": "$.observable().unobserveAll()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Just as  <em><a href=\"#observeAll\">$.observable(objectOrArray).<b>observeAll</b>(myHandler)</a></em> will traverse the whole hierarchy of objects or arrays under the root <em>objectOrArray</em> and attach the handler to each object, similarly <em>$.observable(objectOrArray).<b>unobserveAll</b><(myHandler)</em> will traverse the whole hierarchy and remove the handler from any object to which it has been attached."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.observable(objectOrArray).unobserveAll(myHandler)",
        "name": "unobserveAll",
        "object": "$.observable(obOrArray)",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "myHandler",
                "type": "function",
                "optional": true,
                "description": "Event handler being registered (See <b>API: function myHandler</b> below for details)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.observable(person).unobserveAll(myHandler); ",
            "description": "Remove handler from object/array and from all nested objects"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [],
            "args": [],
            "sections": [],
            "example": "$.observable(person).unobserveAll(); ",
            "description": "Remove <b>all</b> handlers for observable changes, from  an object/array and from all nested objects"
          }
        ],
        "description": "Remove a handler for observable changes, from an object or array, and from any nested objects or arrays under it",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      },
      {
        "_type": "para",
        "title": "Samples:",
        "text": "Here is a copy of a sample from the <em><a href=\"#observeAll\">.observeAll()</a></em> topic, on which we have used <em>observeAll/unobserveAll</em> to provide an <em>enable/disable checkbox</em> on the <em>Change Log</em>:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "links": "links"
        },
        "sections": [
          {
            "_type": "template",
            "title": "",
            "markup": "<input type=\"checkbox\" checked id=\"attach\"/>"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});"
          },
          {
            "_type": "code",
            "title": "Call unobserveAll on the root, to stop 'listening'...",
            "code": "function logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}"
          }
        ],
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"modify\">Change leaf values</button><br/>\n  <button id=\"changeObjects\">New address and phones</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <input type=\"checkbox\" checked id=\"attach\"/>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name trigger=true\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street trigger=true\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input data-link=\"number trigger=true\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\",\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\",\n  });\n});\n\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    address: {street: \"New Street\"},\n    phones: [{number:\"123 123 1234\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number:\"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350"
      },
      {
        "_type": "para",
        "title": "$.unobserveAll variant",
        "text": "<em>Omitting the handler:</em>"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.observable(objectOrArray).unobserveAll()"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The above call will remove <em>all</em> change handlers from the object, and any nested objects."
      },
      {
        "_type": "para",
        "title": "",
        "text": "To test it, you can choose <em>Try it</em> in the sample above, and replace the unobserveAll call by <em>$.observable(person).unobserveAll();</em>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "You'll see that unchecking will then have the effect of removing not only the logging handler, but also the JsViews data-link binding handler used in the template. Now, changes will trigger neither log messages, nor template updates."
      },
      {
        "_type": "para",
        "title": "unobserveAll with View Model object hierarchies",
        "text": "The <em>unobserveAll()</em> API works equally well with View Model objects or plain objects. See <a href=\"#explore/objectsorvm\">plain objects or View Model</a>. At the end of that topic we show our <em>unobserveAll()</em> sample above, using View Model objects."
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "observeAll",
            "label": "observeAll()"
          },
          {
            "_type": "topic",
            "hash": "unobserve",
            "label": "unobserve()"
          },
          {
            "_type": "topic",
            "hash": "explore/objectsorvm",
            "label": "Plain objects or View Model"
          }
        ]
      }
    ]
  }
};