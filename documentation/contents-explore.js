var content = $.views.documentation.content;

content.explore = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/explore")) ||
{
  "explore": {
    "title": "Explore",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "explore/objectsorvm",
            "label": "Plain objects or View Model"
          }
        ]
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "explore/data",
            "label": "Data"
          },
          {
            "hash": "explore/templates",
            "label": "Templates"
          },
          {
            "hash": "explore/views",
            "label": "Views"
          },
          {
            "hash": "explore/renderorlink",
            "label": "Rendering versus linking"
          },
          {
            "hash": "explore/helpers",
            "label": "Providing helpers"
          },
          {
            "hash": "explore/converters",
            "label": "Converters"
          },
          {
            "hash": "explore/customtags",
            "label": "Custom tags"
          },
          {
            "hash": "explore/tagexpressions",
            "label": "Tag expressions"
          },
          {
            "hash": "explore/linkobservedispose",
            "label": "Linking, observing, disposing"
          },
          {
            "hash": "explore/tag-controls",
            "label": "Tag Controls"
          },
          {
            "hash": "explore/mvvm-mvp",
            "label": "MVVM and MVP"
          }
        ]
      }
    ]
  },
  "explore/data": {
    "title": "Data",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "explore/objectsorvm",
            "label": "Plain objects or View Model"
          },
          {
            "hash": "explore/ajax",
            "label": "Ajax requests"
          },
          {
            "hash": "explore/observabledata",
            "label": "Observable data"
          },
          {
            "hash": "explore/computed",
            "label": "Computed observables"
          },
          {
            "hash": "explore/dependencies",
            "label": "Declaring dependencies"
          }
        ]
      }
    ]
  },
  "explore/objectsorvm": {
    "filter": "jsv",
    "title": "Plain objects or View Model",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender, JsObservable and JsViews are designed to work well with either plain JavaScript objects and arrays, or with instances of JavaScript classes, such as View Model classes.\n\nSo, for example, if you are using data obtained from a JSON request, you can choose between:\n<ul class=\"textbefore\">\n<li>rendering your templates directly against the objects and arrays returned from the JSON request</li>\n<li>passing the data through a 'mapping' process to create a hierarchy of View Model instances, and rendering your templates against those objects</li>\n</ul>\n\nThen if you are using JsViews, and binding to your data using data-linking, again you can do that for either scenario above."
      },
      {
        "_type": "para",
        "title": "<b>Example: JsRender with plain objects and arrays</b>",
        "text": " "
      },
      {
        "_type": "code",
        "title": "Suppose this is our data from a JSON request:",
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n"
      },
      {
        "_type": "template",
        "title": "We'll render using a template structured like this:",
        "markup": "... \n{{:name}}\n...\n{{:address.street}}\n...\n{{for phones}}\n  ...      \n  {{:number}}\n  ...\n{{/for}}\n..."
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
            "code": "$(\"#result\").html(tmpl.render(person));"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name}}</td></tr>\n    <tr><td>Street:</td><td>{{:address.street}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones}}\n          <tr><td>\n            {{:number}}\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Data: hierarchy of plain objects and arrays\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n// Render template against plain object hierarchy\n$(\"#result\").html(tmpl.render(person));\n\n",
        "height": "150",
        "onlyJsRender": true,
        "title": "Render template directly against plain objects..."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now we'll convert the above sample to use View Model classes."
      },
      {
        "_type": "para",
        "title": "<b>Example: JsRender with View Model objects</b>",
        "text": "We'll convert the data to a corresponding hierarchy of View Model class instances."
      },
      {
        "_type": "para",
        "title": "View Model classes:",
        "text": "Here is the class definition for <em><b>Person</b></em>:\n\n```js\n// Constructor\nfunction Person(name, address, phones) {\n  this._name = name;\n  this._address = address;\n  this._phones = phones;\n}\n\n// Prototype\nvar personProto = {\n  name: function() {\n    return this._name;\n  },\n  address: function() {\n    return this._address;\n  },\n  phones: function() {\n    return this._phones;\n  }\n};\n\nPerson.prototype = personProto;\n\n// For read-write properties, associate setters with getters, \npersonProto.name.set = function(val) {\n  this._name = val;\n};\n\n...\n```\n\nThe above is a recommended pattern for View Model classes used with JsRender which will work seamlessly also with JsViews data-binding. Variants of this pattern are possible, too.\n\nWe define exactly similar classes for our <em><b>Address</b></em> and <em><b>Phone</b></em> objects too."
      },
      {
        "_type": "para",
        "title": "Getters and setters",
        "text": "Note that properties are now <em>getter</em> functions, which return the appropriate value, which may be of any type, including objects or arrays (such as `address` and `phones` above).\n\nIn fact they are particular case of *[computed observables](#computed)* -- a concept that can be used quite generally within JsViews, not only for View Model properties.\n\nFor properties which are <em>read-write</em>, there is also a <em>setter</em> function, declared using the syntax: \n\n```js\nmyGetterFunction.set = mySetterFunction\n```"
      },
      {
        "_type": "para",
        "title": "Variant: using the same function as both getter and setter",
        "text": "An interesting variant is to use a single function as both setter and getter. Here is an example of what that would look like:\n\n```js\nvar nameGetSet = function name(val) {\n  if (val === undefined) {\n    return this._name; // getter\n  }\n  this._name = val; // setter\n}\n\nnameGetSet.set = nameGetSet; // The same function will also be used as setter\n// Or use the equivalent alternative syntax: nameGetSet.set = true;\n\nPerson.prototype.name = nameGetSet;\n```"
      },
      {
        "_type": "para",
        "title": "Template",
        "text": "To convert our template from using plain objects to using View Model objects, the only change we need to make is to add parens for our properties, which are now <em>getter</em> functions:\n\n```jsr\n... \n{{:name()}}\n...\n{{:address().street()}}\n...\n{{for phones()}}\n  ...      \n  {{:number()}}\n  ...\n{{/for}}\n...\n```"
      },
      {
        "_type": "para",
        "title": "Using the setter function",
        "text": "When JsRender renders a template using a get/set property `{{:name()}}` it will call the getter function, but not the setter. However you may wish to modify the value of `name()` from code, using\n\n```js\nsomePerson.name.set(\"newName\");\n```\n\n(If you have set `nameGetSet.set = true;`, you can equivalently write `somePerson.name(\"newName\");`.)\n\nWhen using the same [View Model class with JsViews](#explore/objectsorvm@jsviews-mvvm), then JsViews will call the setter function when the user modifies a data-bound value such as  `<input data-link=\"name()\" />`."
      },
      {
        "_type": "para",
        "title": "Instantiate and render:",
        "text": "Now all we need to do is to construct our root `person` object (with its underlying hierarchy of View Model instance objects) and render the template against that object in the usual way."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "samples/mvvm/person-view-models.js",
            "label": "person-view-models.js"
          }
        ],
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
            "title": "Instantiate View Model hierarchy",
            "code": "var person = new Person(\n  \"Pete\",\n  new Address(\n    \"1st Ave\"),\n    [\n      new Phone(\"111 111 1111\"),\n      new Phone(\"222 222 2222\")\n    ]\n  );\n"
          },
          {
            "_type": "code",
            "title": "Render template against person object (instance of Person)",
            "code": "$(\"#result\").html(tmpl.render(person));"
          }
        ],
        "html": "<script src=\"mvvm/person-view-models.js\" ></script>\n\n<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{{:address()^street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones()}}\n          <tr><td>\n            {{:number()}}\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Instantiate View Model hierarchy\nvar person = new Person(\n  \"Pete\",\n  new Address(\"1st Ave\"),\n    [\n      new Phone(\"111 111 1111\"),\n      new Phone(\"222 222 2222\")\n    ]\n  );\n\n// Render template against person object (instance of Person)\n$(\"#result\").html(tmpl.render(person));",
        "height": "150",
        "onlyJsRender": true,
        "title": "Render template against a View Model object hierarchy"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Next, we'll add JsViews data-binding to the plain objects version of our sample, above."
      },
      {
        "_type": "para",
        "title": "<b>Example: JsViews with plain objects and arrays</b>",
        "text": " "
      },
      {
        "_type": "code",
        "title": "Data (e.g. from JSON request):",
        "code": "var person = {\n  name: \"Pete\",\n  address: { ... },\n  phones: [{...}, ...] \n};"
      },
      {
        "_type": "template",
        "title": "Template with data-linking:",
        "markup": "... \n<input data-link=\"name trigger=true\" />\n...\n<input data-link=\"address^street trigger=true\" />\n...\n{^{for phones}}\n  ...      \n    <input data-link=\"number trigger=true\" />\n  ...\n{{/for}}\n...\n"
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
            "title": "Render and link template",
            "code": "var tmpl = $.templates(\"#personTmpl\");\ntmpl.link(\"#result\", person);"
          }
        ],
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"changeObjects\">New address and phones</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <input type=\"checkbox\" checked id=\"attach\"/>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name trigger=true\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street trigger=true\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input data-link=\"number trigger=true\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Data: hierarchy of plain objects and arrays\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n// Render and link template against plain object hierarchy\ntmpl.link(\"#result\", person);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    address: {street: \"New Street\"},\n    phones: [{number:\"123 123 1234\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number:\"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "title": "Render and link template directly against plain objects..."
      },
      {
        "_type": "para",
        "title": "observeAll for plain objects and arrays",
        "text": "Our data-linked sample includes the <em>Change Log</em> idea, copied over from the samples on the <a href=\"#observeAll\">`observeAll`</a>/<a href=\"#unobserveAll\">`unobserveAll`</a> topics.\n\n```js\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n```\n\n(You'll see below how `observeAll` works identically for observing hierarchies of View Model instances or for observing hierarchies of plain objects)."
      },
      {
        "_type": "para",
        "title": "Example: JsViews with View Model objects",
        "text": "So now let's switch to the View Model approach again, but this time with JsViews data-linking.",
        "anchor": "jsviews-mvvm"
      },
      {
        "_type": "code",
        "title": "Data: View Model object hierarchy",
        "code": "var person = new Person(\n  \"Pete\",\n  new Address(\n    \"1st Ave\"),\n    [\n      new Phone({number: \"111 111 1111\"}),\n      new Phone({number:\"222 222 2222\"})\n    ]\n  );"
      },
      {
        "_type": "para",
        "title": "Template",
        "text": "As with JsRender above, to convert our template from using plain objects to using View Model objects, the only change we need to make is to add parens for our properties, which are now <em>getter/setter</em> functions.\n\nThis applies equally to data-link expressions, such as `<input data-link=\"address()^street() trigger=true\" >`:"
      },
      {
        "_type": "template",
        "title": "Template",
        "markup": "... \n<input data-link=\"name() trigger=true\" />\n...\n<input data-link=\"address()^street() trigger=true\" />\n...\n{^{for phones()}}\n  ...      \n    <input data-link=\"number() trigger=true\" />\n  ...\n{{/for}}\n...\n"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "samples/mvvm/person-view-models.js",
            "label": "person-view-models.js"
          }
        ],
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
            "title": "Instantiate View Model hierarchy",
            "code": "var person = new Person(...);"
          },
          {
            "_type": "code",
            "title": "Render and link template against person object",
            "code": "var tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n"
          },
          {
            "_type": "code",
            "title": "Make observable changes:",
            "code": "$.observable(person).setProperty({\n  address: new Address(\"New Street\"),\n  phones: [new Phone(\"123 123 1234\")]\n});"
          }
        ],
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n<script src=\"mvvm/person-view-models.js\" ></script>\n\n<div class=\"left\">\n  <button id=\"changeObjects\">New address and phones</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <input type=\"checkbox\" checked id=\"attach\"/>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name() trigger=true\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street() trigger=true\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <input data-link=\"number() trigger=true\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Instantiate View Model hierarchy\nvar person = new Person(\n  \"Pete\",\n  new Address(\"1st Ave\"),\n    [\n      new Phone(\"111 111 1111\"),\n      new Phone(\"222 222 2222\")\n    ]\n  );\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Render and link the template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    address: new Address(\"New Street\"),\n    phones: [new Phone(\"123 123 1234\")]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones()).insert(new Phone(\"456 456 4567\"));\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "title": "Render and link template against a View Model object hierarchy",
        "anchor": "linkvm"
      },
      {
        "_type": "para",
        "title": "Using observe and observeAll APIs with View Model hierarchies",
        "text": "The <em>Change Log</em> feature above is showing us ALL the changes to View Model instances, even as we structurally modify the tree by adding and removing objects from arrays, setting structured values to properties, etc.\n\nThis is achieved with exactly the same call to `observeAll`/`unobserveAll` that we used above for plain objects:\n\n```js\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n```"
      },
      {
        "_type": "para",
        "title": "Using $.observe() APIs with View Model objects",
        "text": "Similarly you can use the `observe()` APIs to observe specific properties of View Model objects.\n\n```js\n// Observe changes to name, address and phones properties of <em>person</em> object\n$.observe(person, \"name\", \"phones\", \"address\",changeHandler); \n\n// Observe array changes <em>person.phones()</em>\n$.observe(person.phones(), changeHandler);\n\n// Observe changes to street property of <em>person.address()</em> object.\n$.observe(person.address(), \"street\", changeHandler);\n```\n\nor equivalently:\n\n```js\n$.observe(person, \"name\", \"phones\", \"address\", person.phones(), person.address(), \"street\", changeHandler);\n```\n\nHere it is in a sample:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "samples/mvvm/person-view-models.js",
            "label": "person-view-models.js"
          }
        ],
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
            "title": "Observe specific properties on specific objects",
            "code": "$.observe(person, \"name\", \"phones\", \"address\", person.phones(), person.address(), \"street\", changeHandler);"
          }
        ],
        "html": "<link href=\"mvvm/change-log.css\" rel=\"stylesheet\"/>\n<script src=\"mvvm/person-view-models.js\" ></script>\n\n<div class=\"left\">\n  <button id=\"modify\">Change leaf values</button><br/>\n  <button id=\"swapObjects\">Swap address and phones</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name() trigger=true\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street() trigger=true\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <span>{^{:number()}}</span>\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Instantiate View Model hierarchy\nvar alt = false,\n  address1 = new Address(\"1st Ave\"),\n  phones1 = [new Phone(\"111 111 1111\"),new Phone(\"222 222 2222\")],\n  address2 = new Address(\"New Street\"),\n  phones2 = [new Phone(\"123 123 1234\")],\n  person = new Person(\"Pete\", address1, phones1);\n\n// Render and link the template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Observe specific properties on specific objects\n$.observe(person, \"name\", \"phones\", \"address\", person.phones(), person.address(), \"street\", changeHandler);\n\n// Button event handlers for changes\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: person.name() + \"+\"\n  });\n  $.observable(person.address()).setProperty({\n    \"street\": person.address().street() + \"+\"\n  });\n});\n\n$(\"#swapObjects\").on(\"click\", function() {\n  // Swap the objects (optionally, remove our specific observers)\n  $.unobserve(person.address(), \"street\", changeHandler);\n  $.unobserve(person.phones(), changeHandler);\n\n  $.observable(person).setProperty({\n    address: (alt ? address1 : address2),\n    phones: (alt ? phones1 : phones2)\n  });\n\n  // observe new objects object on specific paths (if not already observing)\n  $.observe(person.address(), \"street\", changeHandler);\n  $.observe(person.phones(), changeHandler);\n\n  alt = !alt;\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones()).insert(new Phone(\"456 456 4567\"));\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "title": "Using $.observe() to observe View Model objects"
      },
      {
        "_type": "para",
        "title": "Chained paths with plain objects or with View Model objects",
        "text": "With plain object hierarchies you can use [chained paths](#linked-paths) in both templates, and `observe()` paths:\n\n```jsr\n<input data-link=\"address^street trigger=true\" />\n```\n\n```js\n$.observe(person, \"address^street\", changeHandler);\n```\n\nBut for View Model hierarchies, you can only used chained paths in templates:\n\n```jsr\n<input data-link=\"address()^street() trigger=true\" />\n```\n\nFor the corresponding `$.observe()` calls you must pass in each View Model object and observe its properties, rather than using a chained path. Parens are not supported within `$.observe()` paths.\n\nSo you would write:\n\n```js\n$.observe(person, \"address\", changeHandler);\n$.observe(person.address(), \"street\", changeHandler);\n```\n\nor as a single call:\n\n```js\n$.observe(person, \"address\", person.address(), \"street\", changeHandler);\n```\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "computed",
            "label": "Computed Observables"
          }
        ]
      }
    ]
  },
  "explore/ajax": {
    "title": "Ajax requests",
    "path": "",
    "sections": []
  },
  "explore/observabledata": {
    "title": "Observable data",
    "path": "",
    "sections": []
  },
  "explore/computed": {
    "title": "Computed observables",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": " "
      }
    ]
  },
  "explore/dependencies": {
    "title": "Declaring dependencies",
    "path": "",
    "sections": []
  },
  "explore/templates": {
    "title": "Templates",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "explore/composition",
            "label": "Composition"
          }
        ]
      }
    ]
  },
  "explore/composition": {
    "title": "Composition",
    "path": "",
    "sections": []
  },
  "explore/views": {
    "title": "Views",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "explore/viewhierarchy",
            "label": "View hierarchy"
          }
        ]
      }
    ]
  },
  "explore/viewhierarchy": {
    "title": "View hierarchy",
    "path": "",
    "sections": []
  },
  "explore/renderorlink": {
    "title": "Rendering versus linking",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "explore/renderasstring",
            "label": "String-based rendering"
          },
          {
            "hash": "explore/linkingtohtml",
            "label": "Data-binding to HTML"
          },
          {
            "hash": "explore/data-link",
            "label": "Element-based: data-link"
          },
          {
            "hash": "explore/inlinebinding",
            "label": "Inline tag binding"
          }
        ]
      }
    ]
  },
  "explore/renderasstring": {
    "title": "String-based rendering",
    "path": "",
    "sections": []
  },
  "explore/linkingtohtml": {
    "title": "Data-binding to HTML",
    "path": "",
    "sections": []
  },
  "explore/data-link": {
    "title": "Element-based: data-link",
    "path": "",
    "sections": []
  },
  "explore/inlinebinding": {
    "title": "Inline tag binding",
    "path": "",
    "sections": []
  },
  "explore/helpers": {
    "title": "Providing helpers",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "explore/registerhelper",
            "label": "Registering helpers"
          },
          {
            "hash": "explore/passhelper",
            "label": "Passing in helpers"
          },
          {
            "hash": "explore/helperpaths",
            "label": "Helper paths"
          }
        ]
      }
    ]
  },
  "explore/registerhelper": {
    "title": "Registering helpers",
    "path": "",
    "sections": []
  },
  "explore/passhelper": {
    "title": "Passing in helpers",
    "path": "",
    "sections": []
  },
  "explore/helperpaths": {
    "title": "Helper paths",
    "path": "",
    "sections": []
  },
  "explore/converters": {
    "title": "Converters",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "explore/jsr-converter",
            "label": "converters in JsRender"
          },
          {
            "hash": "explore/jsv-converter",
            "label": "converters in JsViews"
          }
        ]
      }
    ]
  },
  "explore/jsr-converter": {
    "title": "converters in JsRender",
    "path": "",
    "sections": []
  },
  "explore/jsv-converter": {
    "title": "converters in JsViews",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "explore/jsv-converter1way",
            "label": "one-way binding converter"
          },
          {
            "hash": "explore/jsv-converterback",
            "label": "2-way binding - convert back"
          }
        ]
      }
    ]
  },
  "explore/jsv-converter1way": {
    "title": "one-way binding converter",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "explore/jsv-converterback": {
    "title": "2-way binding - convert back",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "explore/customtags": {
    "title": "Custom Tags",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "explore/jsrcustomtags",
            "label": "JsRender custom tags"
          },
          {
            "hash": "explore/tagsascontrols",
            "label": "Custom tags as controls"
          }
        ]
      }
    ]
  },
  "explore/jsrcustomtags": {
    "title": "JsRender custom tags",
    "path": "",
    "sections": []
  },
  "explore/tagsascontrols": {
    "title": "Custom tags as controls",
    "path": "",
    "sections": []
  },
  "explore/tagexpressions": {
    "title": "Tag expressions",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "explore/allowcode",
            "label": "Allow code?"
          },
          {
            "hash": "explore/expressions",
            "label": "Expressions"
          },
          {
            "hash": "explore/expressions/datapath",
            "label": "Data paths"
          },
          {
            "hash": "explore/expressions/helperpath",
            "label": "Helper paths"
          },
          {
            "hash": "explore/expressions/viewpath",
            "label": "View paths"
          }
        ]
      }
    ]
  },
  "explore/allowcode": {
    "title": "Allow code?",
    "path": "",
    "sections": []
  },
  "explore/expressions": {
    "title": "Tag expressions",
    "path": "",
    "sections": []
  },
  "explore/expressions/datapath": {
    "title": "Data paths",
    "path": "",
    "sections": []
  },
  "explore/expressions/helperpath": {
    "title": "Helper paths",
    "path": "",
    "sections": []
  },
  "explore/expressions/viewpath": {
    "title": "View paths",
    "path": "",
    "sections": []
  },
  "explore/linkobservedispose": {
    "title": "Linking, observing, disposing",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": []
      }
    ]
  },
  "explore/tag-controls": {
    "title": "Tag Controls",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "explore/taghierarchy",
            "label": "Tag hierarchy"
          },
          {
            "hash": "explore/taglifecycle",
            "label": "Tag lifecycle"
          },
          {
            "hash": "explore/tagmethods",
            "label": "Tag methods and properties"
          }
        ]
      }
    ]
  },
  "explore/taghierarchy": {
    "title": "Tag hierarchy",
    "path": "",
    "sections": []
  },
  "explore/taglifecycle": {
    "title": "Tag lifecycle",
    "path": "",
    "sections": []
  },
  "explore/tagmethods": {
    "title": "Tag methods and properties",
    "path": "",
    "sections": []
  },
  "explore/mvvm-mvp": {
    "title": "MVVM and MVP",
    "path": "",
    "sections": []
  },
  "interop": {
    "title": "Using with other libraries",
    "path": "",
    "sections": []
  },
  "explore/globalvars": {
    "title": "Global variables",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "JsRender, JsViews and global variables",
        "text": "JsRender and JsViews do not set the global var $.\n\n\nIf you are using jQuery with JsRender, JsRender defines jQuery,views, jQuery.templates, etc. but does not create any global variables.\n\nSo you can write:\n\n```js\n$.noConflict();\n\nvar template = jQuery.templates(...);\n\njQuery.views.helpers(...);\n```\n\nIf you are not using jQuery, JsRender creates a global var: jsrender -- which you use to replace the jQuery global.\n\n```js\nvar template = jsrender.templates(...);\n\njsrender.views.helpers(...);\n```\n\nYou can test for JsRender as follows:\n\n```js\nif (window.jQuery && window.jQuery.views || window.jsrender) { \n  // JsRender is loaded\n}\n```"
      }
    ]
  }
};