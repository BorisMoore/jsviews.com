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
        "code": "$.observable(person).setProperty(\"address.street\", \"Main St.\");"
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
            "code": "$.observable(person).setProperty(\"address.street\", \"Main St.\");\n"
          }
        ],
        "code": "var person = {\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"Main St.\");\n});\n\n$(\"#revert\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"1st Ave\");\n});\n\nvar tmpl = $.templates(\"Street: {^{:address.street}}\");\n\ntmpl.link(\"#result\", person);\n",
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
        "code": "var person = {\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"Main St.\");\n});\n\n$(\"#revert\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"1st Ave\");\n});\n\n$(person.address).on(\"propertyChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The '\" + eventArgs.path + \"' is '\" + eventArgs.value + \"'.\";\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<button id=\"modify\">set to new value</button>\n<button id=\"revert\">set back to original value</button>\n\n<p id=\"messages\"><p>",
        "title": "",
        "height": "110"
      },
      {
        "_type": "para",
        "title": "Sample: Observable property change, with $.observable.observe(...)",
        "text": "This sample uses <a href=\"#observe\">observe()</a> to listen to the observable property changes."
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
            "code": "$.observable.observe(person, \"address.street\", changeHandler);"
          },
          {
            "_type": "code",
            "title": "Modify the value of a property on a chosen path:",
            "code": "$.observable(person).setProperty(\"address.street\", \"Main St.\");"
          }
        ],
        "code": "var person = {\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"Main St.\");\n});\n\n$(\"#revert\").on(\"click\", function() {\n  $.observable(person).setProperty(\"address.street\", \"1st Ave\");\n});\n\n$.observable.observe(person, \"address.street\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The '\" + eventArgs.path + \"' is '\" + eventArgs.value + \"'.\";\n  if (ev.data) {\n    message += \"\\n\\nThe full path is '\" + ev.data.fullPath + \"'.\";\n  }\n  $(\"#messages\").append(message + \"<br/>\");\n}",
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
        "text": "We register a single listener for the observable property changes on both objects - with one call to <a href=\"#observe\">observe()</a>."
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
            "code": "$.observable(person).setProperty(\n  {\n    name: \"Hermione\",\n    \"address.street\": \"Main St.\"\n  }\n);"
          },
          {
            "_type": "code",
            "title": "Observe both changes with a single observe() handler:",
            "code": "$.observable.observe(person, \"name\", \"address.street\", changeHandler); "
          }
        ],
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n\n  $.observable(person).setProperty(\n    {\n      name: \"Hermione\",\n      \"address.street\": \"Main St.\"\n    }\n  );\n\n});\n\n$(\"#revert\").on(\"click\", function() {\n\n  $.observable(person).setProperty(\n    {\n      name: \"Pete\",\n      \"address.street\": \"1st Ave.\"\n    }\n  );\n\n});\n\n$.observable.observe(person, \"name\", \"address.street\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"The '\" + eventArgs.path + \"' is '\" + eventArgs.value + \"'.\";\n  if (ev.data) {\n    message += \"\\n\\nThe full path is '\" + ev.data.fullPath + \"'.\";\n  }\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<button id=\"modify\">Set new values</button>\n<button id=\"revert\">Return to original values</button>\n\n<p id=\"messages\"><p>",
        "title": "",
        "height": "110"
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
        "html": "<div class=\"left\">\n  <button id=\"append\">Append an item</button><br/><br/>\n\n  <div id=\"result\"></div>\n</div>",
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
        "code": "var things = [{id: \"item1\"}, {id: \"item2\"}],\n  count = 3;\n\n$(\"#append1\").on(\"click\", function() {\n  $.observable(things).insert(\n    {id: \"item\" + count++}\n  );\n});\n\n$(\"#append2\").on(\"click\", function() {\n  $.observable(things).insert(\n    [\n      {id: \"item\" + count++},\n      {id: \"item\" + count++}\n    ]\n  );\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) added at index: \" + eventArgs.index;\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<div class=\"left\">\n  <button id=\"append1\">Append an item</button>\n  <button id=\"append2\">Append two items</button><br/><br/>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"left\" id=\"messages\">\n  <b>Messages:</b><br/><br/>\n</div>",
        "height": "150",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Sample: Inserting items at a chosen index",
        "text": "Here we modify the sample above, by specifying the index where we want to insert, rather than simply appending. We'll also show the alternative <a href=\"#observe\">$observable.observe()</a> API for attaching our handler:"
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
            "code": "$.observable.observe([things], changeHandler);"
          },
          {
            "_type": "code",
            "title": "Insert a set of items at a chosen index:",
            "code": "$.observable(things).insert(\n  index,\n  items\n);"
          }
        ],
        "code": "var things = [{id: \"item1\"}, {id: \"item2\"}],\n  count = 3;\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(things).insert(\n    1,\n    {id: \"item\" + count++}\n  );\n});\n\n$(\"#prepend\").on(\"click\", function() {\n  $.observable(things).insert(\n    0,\n    [\n      {id: \"item\" + count++},\n      {id: \"item\" + count++}\n    ]\n  );\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);\n\n$.observable.observe([things], changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) added at index: \" + eventArgs.index;\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<div class=\"left\">\n  <button id=\"insert\">Insert an item at index 1</button>\n  <button id=\"prepend\">Prepend two items</button><br/><br/>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"left\" id=\"messages\">\n  <b>Messages:</b><br/><br/>\n</div>",
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
        "html": "<div class=\"left\">\n  <button id=\"remove\">Remove last item</button><br/><br/>\n\n  <div id=\"result\"></div>\n</div>",
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
            "title": "Remove item at index 0 or index 1",
            "code": "$.observable(things).remove(0);\n...\n$.observable(things).remove(1);\n"
          }
        ],
        "code": "var things = [\n  {id: \"item1\"},\n  {id: \"item2\"},\n  {id: \"item3\"}\n];\n\n$(\"#remove0\").on(\"click\", function() {\n  $.observable(things).remove(0);\n});\n\n$(\"#remove1\").on(\"click\", function() {\n  $.observable(things).remove(1);\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) removed at index: \" + eventArgs.index;\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<div class=\"left\">\n  <button id=\"remove0\">Remove item 0</button>\n  <button id=\"remove1\">Remove item 1</button><br/><br/>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"left\" id=\"messages\">\n  <b>Messages:</b><br/><br/>\n</div>",
        "height": "135",
        "title": "Observable array change - remove item at chosen index"
      },
      {
        "_type": "para",
        "title": "Sample: Removing one or more items at a chosen index",
        "text": "Here we modify the sample above, by specifying the number of items to remove. We'll also show the alternative <a href=\"#observe\">$observable.observe()</a> API for attaching our handler:"
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
            "code": "$.observable.observe([things], changeHandler);"
          },
          {
            "_type": "code",
            "title": "Remove 2 items at index 0:",
            "code": "$.observable(things).remove(0, 2);\n"
          }
        ],
        "code": "var things = [\n  {id: \"item1\"},\n  {id: \"item2\"},\n  {id: \"item3\"},\n  {id: \"item4\"}\n];\n\n$(\"#remove0\").on(\"click\", function() {\n  $.observable(things).remove(0, 2);\n});\n\n$(\"#remove1\").on(\"click\", function() {\n  $.observable(things).remove(1);\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);\n\n$.observable.observe([things], changeHandler);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) removed at index: \" + eventArgs.index;\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<div class=\"left\">\n  <button id=\"remove0\">Remove 2 items at 0</button>\n  <button id=\"remove1\">Remove item 1</button><br/><br/>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"left\" id=\"messages\">\n  <b>Messages:</b><br/><br/>\n</div>",
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
        "code": "var items = [\n    {id: \"item1\"},\n    {id: \"item2\"},\n    {id: \"item3\"},\n    {id: \"item4\"},\n    {id: \"item5\"}\n  ],\n  otherItems = [\n    {id: \"otherItem1\"},\n    {id: \"otherItem2\"},\n    {id: \"otherItem3\"}\n  ],\n  things = [\n    items[0],\n    items[1],\n    items[2],\n    items[3],\n    items[4]\n  ];\n\n$(\"#sort\").on(\"click\", function() {\n  $.observable(things).refresh(\n    things.reverse()\n  );\n});\n\n$(\"#replace\").on(\"click\", function() {\n  $.observable(things).refresh(\n    (things.length === 5 ? otherItems : items)\n  );\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"Previous length: \" + eventArgs.oldItems.length\n     + \". New length: \" + ev.target.length;\n\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<div class=\"left\">\n  <button id=\"sort\">Reverse sort the items</button>\n  <button id=\"replace\">Replace the items</button><br/><br/>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"left\" id=\"messages\">\n  <b>Messages:</b><br/><br/>\n</div>",
        "height": "170",
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
        "code": "var things = [\n  {id: \"item1\"},\n  {id: \"item2\"},\n  {id: \"item3\"},\n  {id: \"item4\"},\n  {id: \"item5\"}\n];\n\n$(\"#move1\").on(\"click\", function() {\n  $.observable(things).move(2, 0);\n});\n\n$(\"#move2\").on(\"click\", function() {\n  $.observable(things).move(0, 3, 2);\n});\n\nvar tmpl = $.templates(\"id: {{:id}}<br/>\");\n\ntmpl.link(\"#result\", things);\n\n$([things]).on(\"arrayChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n  var message = eventArgs.items.length + \" item(s) moved from index: \"\n  + eventArgs.oldIndex + \" to index: \" + eventArgs.index;\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<div class=\"left\">\n  <button id=\"move1\">Move 1 item at from 2 to 0</button>\n  <button id=\"move2\">Move 2 items from 0 to 3</button><br/><br/>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"left\" id=\"messages\">\n  <b>Messages:</b><br/><br/>\n</div>",
        "height": "170",
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
            "label": "$.observable.observe()"
          },
          {
            "hash": "unobserve",
            "label": "unobserve()"
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
        "text": "To handle the <em>propertyChange</em> changes you have two alternatives:\n<ul class=\"textbefore\">\n<li>use jQuery <em>.on()</em> to attach an event handler to the object</li>\n<li>use <a href=\"#observe\">$.observable.observe()</a> to associate a handler with the object, or with a <em>path</em> including the object</li>\n</ul>"
      },
      {
        "_type": "code",
        "title": "Using jQuery .on()",
        "code": "$(myObject).on(\"propertyChange\", myHandler);"
      },
      {
        "_type": "code",
        "title": "Using <a href=\"#observe\">$.observable.observe()</a>",
        "code": "$.observable.observe(myObject, changeHandler); "
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
            "title": "propertyChange event handler",
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
                "description": "JsViews propertyChange event object, with properties <b>path</b>,  <b>value</b> and <b>oldValue</b>. (With <b>change</b>=<em>\"prop\"</em>)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$(person).on(\"propertyChange\", myHandler); ",
            "description": "Handler for JsViews observable property change events"
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
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n\n  $.observable(person).setProperty(\n    {\n      name: \"Hermione\",\n      \"address.street\": \"Main St.\"\n    }\n  );\n\n});\n\n$(\"#revert\").on(\"click\", function() {\n\n  $.observable(person).setProperty(\n    {\n      name: \"Pete\",\n      \"address.street\": \"1st Ave.\"\n    }\n  );\n\n});\n\nvar tmpl = $.templates(\n   \"Name: <input data-link=\\\"name\\\" />\"\n + \"Street: <input data-link=\\\"address.street\\\" />\"\n);\n\ntmpl.link(\"#result\", person);\n\n$(person).on(\"propertyChange\", changeHandler); \n\n$(person.address).on(\"propertyChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n\n  var message = \"The new '\" + eventArgs.path + \"' is '\"\n                  + eventArgs.value + \"'.\";\n\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<div class=\"left\">\n  <button id=\"modify\">set to new values</button>\n  <button id=\"revert\">set back to original values</button><br/><br/>\n\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"left\" id=\"messages\">\n  <b>Messages:</b><br/><br/>\n</div>",
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
        "text": "To handle the <em>arrayChange</em> changes you have two alternatives:\n<ul class=\"textbefore\">\n<li>use jQuery <em>.on()</em> to attach an event handler to the array</li>\n<li>use <a href=\"#observe\">$.observable.observe()</a> to associate a handler with the array, or with a <em>path</em> including the array</li>\n</ul>"
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
        "title": "Using <a href=\"#observe\">$.observable.observe()</a>",
        "code": "$.observable.observe(myArray, changeHandler); "
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
            "title": "arrayChange event handler",
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
        "title": "Samples for the <b>handling array change events</b>:",
        "text": "Each of the following API topics includes samples showing the <em>arrayChange</em> event handler for the corresponding type of array change:\n\n<ul class=\"textbefore\">\n<li><a href=\"#insert\">$.observable(array).insert()</a></li>\n<li><a href=\"#remove\">$.observable(array).remove()</a></li>\n<li><a href=\"#move\">$.observable(array).move()</a></li>\n<li><a href=\"#refresh\">$.observable(array).refresh()</a></li>\n</ul>"
      }
    ]
  },
  "observe": {
    "title": "Observing data: $.observable.observe()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Whenever objects or arrays are changed observably, JsViews raises the corresponding <a href=\"#onpropchange\">propertyChange</a> or <a href=\"#onarrchange\">onArrayChange</a> jQuery event."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Data-linked templates respond to those events automatically, but if you want to run code in response to data-change events you have two alternatives:\n<ul class=\"textbefore\">\n<li>use jQuery <em>.on()</em> to attach the <a href=\"#onpropchange\">propertyChange</a> or <a href=\"#onarrchange\">arrayChange</a> event handler to any object or array you want to 'listen to'</li>\n<li>use <em>$.observable.observe()</em> to associate a handler with one or more objects, arrays, or <em>paths</em></li>\n</ul>"
      },
      {
        "_type": "code",
        "title": "Using $.observable.observe()",
        "code": "$.observable.observe(myArray, changeHandler);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "This approach allows you to register a single handler listen to changes on more multiple targets, which can include both objects and arrays."
      },
      {
        "_type": "para",
        "title": "",
        "text": "In addition this approach allows you to specify the targets by the effectively declarative approach of using data-paths."
      },
      {
        "_type": "para",
        "title": "Paths: leaf changes or deep changes",
        "text": "By default you listen to the leaf of a path, but you can specify if you want to listen to listen also to changes on objects higher up the path..."
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
            "title": "propertyChange event handler",
            "params": [
              {
                "_type": "param",
                "name": "ev",
                "type": "object",
                "optional": false,
                "description": "jQuery event object"
              },
              {
                "_type": "param",
                "name": "eventArgs",
                "type": "object",
                "optional": false,
                "description": "JsViews propertyChange event object, with properties <b>path</b>,  <b>value</b> and <b>oldValue</b>"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$(person).on(\"propertyChange\", myHandler); ",
            "description": "Handler for JsViews observable property change events"
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
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  }\n};\n\n$(\"#modify\").on(\"click\", function() {\n\n  $.observable(person).setProperty(\n    {\n      name: \"Hermione\",\n      \"address.street\": \"Main St.\"\n    }\n  );\n\n});\n\n$(\"#revert\").on(\"click\", function() {\n\n  $.observable(person).setProperty(\n    {\n      name: \"Pete\",\n      \"address.street\": \"1st Ave.\"\n    }\n  );\n\n});\n\nvar tmpl = $.templates(\n   \"Name: <input data-link=\\\"name\\\" />\"\n + \"Street: <input data-link=\\\"address.street\\\" />\"\n);\n\ntmpl.link(\"#result\", person);\n\n$(person).on(\"propertyChange\", changeHandler); \n\n$(person.address).on(\"propertyChange\", changeHandler); \n\nfunction changeHandler(ev, eventArgs) {\n\n  var message = \"The new '\" + eventArgs.path + \"' is '\"\n                  + eventArgs.value + \"'.\";\n\n  $(\"#messages\").append(message + \"<br/>\");\n}",
        "html": "<div class=\"left\">\n  <button id=\"modify\">set to new values</button>\n  <button id=\"revert\">set back to original values</button><br/><br/>\n\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"left\" id=\"messages\">\n  <b>Messages:</b><br/><br/>\n</div>",
        "height": "200",
        "title": "Handling property change events"
      }
    ]
  },
  "unobserve": {
    "title": "unobserve()",
    "path": "",
    "sections": []
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
        "text": "If you pass an <em>object</em> to <em>$.observable()</em> then you obtain an <b><em>observable</em> object</b> (a very lightweight wrapper around your object), which provides a method for modifying object properties observably:\n<ul class=\"textbefore\">\n<li><a href=\"\">setProperty</a></li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Similarly, if you pass an <em>array</em> to <em>$.observable()</em> then you obtain an <b><em>observable</em> array</b> (a lightweight wrapper around your array) which provides a different set of methods, specific to modifying arrays: \n<ul class=\"textbefore\">\n<li><a href=\"\">insert</a></li>\n<li><a href=\"\">remove</a></li>\n<li><a href=\"\">move</a></li>\n<li><a href=\"\">refresh</a></li>\n</ul>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that you don't need hold on to the <em>observable</em> wrapped object for reuse. It is so lightweight you can just call <em>$.observable(...)</em> again every time you need to make further changes to your object or array."
      }
    ]
  }
};