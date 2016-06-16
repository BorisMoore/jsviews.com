var content = $.views.documentation.content;

content.getstarted = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/getstarted")) ||
{
  "getstarted": {
    "title": "Getting started",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "filter": "jsr",
            "hash": "jsrplaying",
            "label": "Playing with JsRender"
          },
          {
            "filter": "jsr",
            "hash": "jsr-quickstart",
            "label": "JsRender Quickstart"
          },
          {
            "filter": "jsr",
            "hash": "jsr-node-quickstart",
            "label": "JsRender Node.js Quickstart"
          },
          {
            "filter": "jsv",
            "hash": "jsvplaying",
            "label": "Playing with JsViews"
          },
          {
            "filter": "jsv",
            "hash": "jsv-quickstart",
            "label": "JsViews Quickstart"
          }
        ]
      },
      {
        "_type": "links",
        "title": "Other links:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsrapi",
            "label": "JsRender API - Templated UI"
          },
          {
            "_type": "topic",
            "hash": "jsvapi",
            "label": "JsViews API - Data-driven UI"
          },
          {
            "_type": "topic",
            "hash": "jsoapi",
            "label": "JsObservable API - Observing data"
          },
          {
            "_type": "topic",
            "hash": "samples",
            "label": "Samples"
          }
        ]
      }
    ]
  },
  "jsrplaying": {
    "filter": "jsr",
    "path": "",
    "title": "Playing with JsRender",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "(***See also:*** [JsRender Quickstart](#jsr-quickstart))"
      },
      {
        "_type": "para",
        "title": "JsRender templates",
        "text": "JsRender templates are probably the most powerful and at the same time the most intuitive of template engines out there.\n\nTo get started, let's just create a template, and run it against some data. The way you do that in code is like this:"
      },
      {
        "_type": "template",
        "title": "Here's a template:",
        "markup": "<label>Name:</label> {{:name}}"
      },
      {
        "_type": "code",
        "title": "Here's some code:",
        "code": "var person = {\n    name: \"Adriana\"\n};\n\nvar html = myTemplate.render(person);"
      },
      {
        "_type": "para",
        "title": "And here it is as a working sample:",
        "text": "Let's go straight to a sample showing how that template renders against the data. Like all the samples in this documentation, it is a working sample that you can experiment with. \n",
        "anchor": ""
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample"
        },
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "You can hit <em>Try it</em>, modify the template or the data, then hit <em>Run Code</em> to see the effect immediately in the running sample above.\n\nFor example, replace the data with the following:\n\n```json\n[\n  {\n    \"name\": \"Adriana\"\n  },\n  {\n    \"name\": \"Robert\"\n  }\n]\n```\n\nOr try replacing the template with the following:\n\n```jsr\n<table><tbody><tr>\n  <td>Name</td>\n  <td>{{:name}}</td>\n</tr></tbody></table>\n```"
          }
        ],
        "title": "A first template:",
        "markup": "<label>Name:</label> {{:name}}<br/>",
        "data": {
          "name": "Adriana"
        },
        "height": "60",
        "onlyJsRender": true,
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "OK -- a few interesting things there. For example, if you tried changing the data, and provided an array instead of an object, you will have seen that the template rendered once for each item in the array.\n\nBut before we look at more details on the template rendering, let's look at how you get a compiled template object for your markup (the `myTemplate` object in the code example above) so you can call the render method.\n\nThe next working example shows you that."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample"
        },
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "Take a look at the <em>Code</em>, <em>Full Code</em> or <em>Try It</em> tabs.\n\nIn the html you see that we put our markup in a script block with `type=\"text/x-jsrender\"`...\n\n```jsr\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>\n```\n\n... and then in the code we call the <a href=\"#d.templates\">`$.templates()`</a> method with a jQuery selector for that script block, to get the compiled template.\n\n```js\nvar myTemplate = $.templates(\"#personTmpl\");\n```\n\nAfter that we run the code we have already seen to render the template against our data, and get the HTML output as a string. (We pass the data -- this time we used an array -- to the <a href=\"#rendertmpl\">`render()`</a> method of our compiled template.)\n\n\n```js\nvar html = myTemplate.render(people);\n```\n\nFinally we simply insert that output into the HTML DOM using the jQuery `html()` method.\n\nAgain, you can play with the sample in the <em>Try it</em> tab, by changing the data, or the markup, or the code.\n\nFor example if you change the template to produce a `<tr>`, you will want to insert the output into the `tbody` of a `table`, by adding a `<table><tbody>` target container -- as in the following:\n\n```jsr\n<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td>Name</td>\n    <td>{{:name}}</td>\n  </tr>\n</script>\n```"
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}<br/>\n</script>",
        "code": "var myTemplate = $.templates(\"#personTmpl\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nvar html = myTemplate.render(people);\n\n$(\"#peopleList\").html(html);",
        "title": "Complete code for template rendering:",
        "onlyJsRender": true,
        "height": "80"
      },
      {
        "_type": "para",
        "title": "What else is in templates?",
        "text": "JsRender template have a very rich feature-set, yet a small number of predefined tags. The links at the bottom of this topic give details on some of the features.\n\n But let's try one more sample, where this time, instead of passing our `people` array to the `template.render()` method, we will pass an object (our `app` object) which will have a `people` property. Now in the template we will use a `{{for}}` tag to iterate over the `people`. \n\nAlso we'll use an `{{if}}` tag to test whether the `person` has a `nickname` field, and if so we will render out the nickname too..."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample"
        },
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "The `{{for people}}...{{/for}}` block tag, in the template, looks at the current data item (the `app` that we passed in) and navigates a data-path that you provide as parameter -- in this case `people`.\n\nJsRender supports different kinds of paths, as well as expressions of various kinds. The data-path can be something like `address.street`, with 'dot' separators, but in this case it is simply the `people` property of the `app` object.\n\nNow, because `people` is an array, JsRender will render the content of the `{{for}}...{{/for}}` block <b><em>once for each item in the array</em></b>.\n\nWithin the block the current item is now the `person`(item in the `people` array), and there we have an `{{if nickname}}...{{/if}}` block tag, which takes an expression as parameter.\n\nIn this case the expression is another data-path, `nickname`. So it renders the content of the `{{if}}...{{/if}}` block if the `nickname` is not `undefined` (or is not `null`, or the empty string).\n\nYou can experiment by replacing the `{{if nickname}}` expression. For example, try giving <em>Adriana</em> the nickname <em>Adriana</em>! Then try replacing `{{if nickname}}` with:\n\n```jsr\n{{if nickname && nickname !== name}} \n```"
          }
        ],
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td>\n    <ul>\n      {{for people}}\n        <li>\n          {{:name}}\n          {{if nickname}}\n            ( {{:nickname}} )\n          {{/if}}\n        </li>\n      {{/for}}\n    </ul>\n  </td></tr>\n</script>",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\",\n      nickname: \"Bob\"\n    }\n  ];\n\n  app = {\n    people: people\n  };\n\nvar html = myTemplate.render(app);\n\n$(\"#peopleList\").html(html);\n",
        "onlyJsRender": true,
        "title": "Some template tags...",
        "height": "110"
      },
      {
        "_type": "para",
        "title": "Next:",
        "text": "[JsRender Quickstart](#jsr-quickstart)"
      },
      {
        "_type": "links",
        "title": "Links:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsrtags",
            "label": "Built-in template tags"
          },
          {
            "_type": "topic",
            "hash": "jsrapi",
            "label": "JsRender API"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr",
            "label": "JsRender samples"
          }
        ]
      }
    ]
  },
  "jsvplaying": {
    "filter": "jsv",
    "title": "Playing with JsViews",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "(***See also:*** *[JsViews Quickstart](#jsv-quickstart)*)"
      },
      {
        "_type": "para",
        "title": "JsViews: A platform for data-bound single-page apps",
        "text": "JsViews provides dynamic data-bound views, built on top of JsRender templates. It \"brings JsRender templates to life\". So let's start with the JsRender template we ended up with in the *[Playing with JsRender](#jsrplaying)* topic:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample"
        },
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "If you look at the code you will see it is almost identical to the previous JsRender sample. One difference though: the two lines for rendering the template as a string and then inserting it into the DOM:\n\n```js\nvar html = myTemplate.render(app);\n\n$(\"#peopleList\").html(html);\n```\n\n...have been replaced by a single line:\n\n```js\nmyTemplate.link(\"#peopleList\", app);\n```\n\nThat line of code actually does three things:\n<ul class=\"textbefore\"><li>First it renders the template against the data (second parameter)</li>\n<li>Next, it inserts the resulting HTML under the container element (first parameter)</li>\n<li>Finally, it <em>data-binds the HTML</em> against the data</li></ul> "
          }
        ],
        "sampleName": "",
        "url": "",
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td>\n    <ul>\n      {{for people}}\n        <li>\n          {{:name}}\n        </li>\n      {{/for}}\n    </ul>\n  </td></tr>\n</script>\n",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar app = {\n    people: people\n  };\n\nmyTemplate.link(\"#peopleList\", app);",
        "height": "110",
        "title": "Using the template.link() method"
      },
      {
        "_type": "para",
        "title": "Data-linking",
        "text": "In JsViews we refer to *data-linking*. It means data-binding, but refers to the particular approach used in JsViews, which is based on *observable objects and arrays*.\n\nIf you take an object and assign a new value to one of its properties (fields), there is no corresponding event that can allow other code to know you modified the object. Similarly, mutating an array will not provide any events or notifications to other code.\n\nThat's where *JsObservable* comes in. It provides ways of changing objects and arrays, *observably*.\n\nThe next sample shows what happens when the template renders against an array, and then that array is modified 'observably' (*observable collection change*).\n\n```js\n$(\"#addBtn\").on(\"click\", function() {\n  $.observable(people).insert({name: \"name\"});\n});\n```"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample"
        },
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "Click on the Add button, and a new row gets added to the array. The template rendering automatically updates to show the new row.\n\nIt uses the code:\n\n```js\n$.observable(people).insert({name: \"name\"});\n```\n\nBut notice that the template is different from previously. It has that extra carat sign: `{^{for ...}}`. Try removing the `^` and then clicking the <em>Add</em> button. -- Nothing happens.\n\nAny regular JsRender tag `{{someTag ...}}` -- whether built-in or custom -- can be data-linked by adding the `^`: `{^{someTag ...}}`. That tag has become 'dynamic' and will re-render itself whenever it needs to, if the underlying data changes ('observably').\n\nRemove the `^`, and the tag is 'dead'..."
          }
        ],
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td>\n    <button id=\"addBtn\">Add</button>\n  </td></tr>\n  {^{for people}}\n    <tr><td>\n      {{:name}}\n    </td></tr>\n  {{/for}}\n</script>",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar app = {\n    people: people\n  };\n\nmyTemplate.link(\"#peopleList\", app);\n\n$(\"#addBtn\").on(\"click\", function() {\n  $.observable(people).insert({name: \"name\"});\n});",
        "height": "206",
        "title": "Data-linked tags and observable arrays and objects "
      },
      {
        "_type": "para",
        "title": "",
        "text": "What about changing an object? Let's modify the `name` on a `person` object (*observable property change*):"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample"
        },
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "Here is the code when you click <em>Change</em>:\n\n```js\nfunction() {\n  var dataItem = $.view(this).data;\n\n  $.observable(dataItem).setProperty(\"name\", dataItem.name + counter++);\n}\n```\n\nThe code for `setProperty` should make sense, given what we have already seen. You call `$.observable(myObject)` to get an 'observable form of your object' which will provide you with appropriate methods you can call: `setProperty(...)` if it was an object, and `insert`, `remove`, `refresh` and `move`, if it was an array. \n\nBut in our case, the first problem is to know <em>which</em> `person` object should be modified by this particular button. The `this` pointer in the click-handler is the element, and our code:\n\n```js\nvar dataItem = $.view(this).data;\n```\n\n-- let's us get the `view` (an 'instance' of a rendered template, or template tag block) and hence to the data item (in this case the `person`) we want to modify.\n\nAs in the previous sample, we have 'brought a tag to life' by writing:\n\n```jsr\n<td>{^{:name}}</td>\n```\n\nChange it back to:\n\n```jsr\n<td>{{:name}}</td>\n```\n\nand you will see that the name no longer updates when you click on the <em>Change</em> button."
          }
        ],
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td colspan=\"2\">\n    <button id=\"addBtn\">Add</button>\n  </td></tr>\n  {^{for people}}\n    <tr>\n      <td>{^{:name}}</td>\n      <td>\n        <button class=\"changeBtn\">Change</button>\n      </td>\n    </tr>\n  {{/for}}\n</script>",
        "height": "206",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar app = {\n    people: people\n  };\n\nvar counter = 1;\n\nmyTemplate.link(\"#peopleList\", app);\n\n$(\"#addBtn\").on(\"click\", function() {\n  $.observable(people).insert({name: \"name\"});\n});\n\n$(\"#peopleList\").on(\"click\", \".changeBtn\", function() {\n  var dataItem = $.view(this).data;\n  $.observable(dataItem).setProperty(\"name\", dataItem.name + counter++);\n});\n",
        "title": "Observable change: setProperty",
        "anchor": "setprop"
      },
      {
        "_type": "para",
        "title": "Data-linked tags...",
        "text": "So far we have used data-linked template tags for data-linking, as in:\n\n```jsr\n<td>{^{:name}}</td>\n```\n\nBut the fact that the data-linked tag is wrapped by an HTML element means that if we want we can replace it by an 'element-based' syntax:"
      },
      {
        "_type": "template",
        "title": "...or element-based data-linking",
        "markup": "<td data-link=\"name\"></td>"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample"
        },
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "So this version of the sample uses:\n\n```jsr\n<td data-link=\"name\"></td>\n```\n\nTry changing it back to the data-linked tag syntax, with `{^{`. You will see that the sample works just the same..."
          }
        ],
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td colspan=\"2\">\n    <button id=\"addBtn\">Add</button>\n  </td></tr>\n  {^{for people}}\n    <tr>\n      <td data-link=\"name\"></td>\n      <td>\n        <button class=\"changeBtn\">Change</button>\n      </td>\n    </tr>\n  {{/for}}\n</script>",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar app = {\n    people: people\n  };\n\nvar counter = 1;\n\nmyTemplate.link(\"#peopleList\", app);\n\n$(\"#addBtn\").on(\"click\", function() {\n  $.observable(people).insert({name: \"name\"});\n});\n\n$(\"#peopleList\").on(\"click\", \".changeBtn\", function() {\n  var dataItem = $.view(this).data;\n  $.observable(dataItem).setProperty(\"name\", dataItem.name + counter++);\n});\n",
        "height": "206",
        "title": "Element-based linking: \"data-link\""
      },
      {
        "_type": "para",
        "title": "",
        "text": "But what about *two-way* data-binding?"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample"
        },
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "This is where the element-based data-linking comes into its own. The textbox uses declarative binding:\n\n```jsr\n<td data-link=\"name\"></td>\n<td>\n  <input data-link=\"name\"/>\n</td>\n```\n\nThe `<input>` and the `<td>` are both data-linked. The underlying data gets modified when you change the name in the textbox -- and updates the `<td>`, without you needing to write any <em>propertyChange</em> code at all."
          }
        ],
        "title": "Two-way data-binding",
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td colspan=\"2\">\n    <button id=\"addBtn\">Add</button>\n  </td></tr>\n  {^{for people}}\n    <tr>\n      <td data-link=\"name\"></td>\n      <td>\n        <input data-link=\"name\"/>\n      </td>\n    </tr>\n  {{/for}}\n</script>",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar app = {\n    people: people\n  };\n\nvar counter = 1;\n\nmyTemplate.link(\"#peopleList\", app);\n\n$(\"#addBtn\").on(\"click\", function() {\n  $.observable(people).insert({name: \"name\"});\n});\n",
        "height": "206",
        "anchor": "twoway"
      },
      {
        "_type": "para",
        "title": "A more complete sample:",
        "text": "This was just a glimpse of some of the richness of JsViews data-linking. The next sample lets you see a more fully-fledged example, which you can experiment with.\n\nMore details on JsViews features and APIs will be available soon, and will be added to the *Links* section below."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample"
        },
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "This sample includes binding to `<select>`...\n\n```jsr\n<select data-link=\"selectedID\" size=\"5\">\n```\n\nAnd also to each `<option>` within the `<select>`...\n\n```jsr\n{^{for people}}\n  <option data-link=\"{:name} value{:ID}\"></option>\n{{/for}}\n```\n\nIt also shows observably removing items from an array...\n\n```js\n$.observable(people).remove($.inArray(app.selected(), people));\n```\n\nIt shows data-linking to the `disabled` property of an element...\n\n```jsr\n<button data-link=\"disabled{:selectedID === '0'}\">Remove</button>\n```\n\nAnd it shows the use of a *computed observable* in JsViews:\n\n```js\nvar app = {\n    ...\n    selected: function() {\n      ...\n    }\n  };\n\napp.selected.depends = \"selectedID\";\n```"
          }
        ],
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n  {\n    ID: \"Ad0\",\n    name: \"Adriana\"\n  },\n  {\n    ID: \"Ro0\",\n    name: \"Robert\",\n    nickname: \"Bob\"\n  }\n];\n\nvar counter = 1;\n\nvar app = {\n    people: people,\n    selectedID: -1, // No selection. (Or could set to initial selection - e.g. \"0\")\n    selected: function() {\n      for (var i=0; i<people.length; i++) {\n        if (people[i].ID === this.selectedID) {\n          return people[i];\n        }\n      }\n      return {};\n    }\n  };\n\napp.selected.depends = \"selectedID\";\n\n// Data-link details container to people, using the peopleTmpl template\nmyTemplate.link(\"#peopleList\", app);\n\n$(\"#addBtn\").on(\"click\", function() {\n  var newID = \"new\" + counter++;\n  $.observable(people).insert({ID: newID, name: \"name\"});\n  $.observable(app).setProperty(\"selectedID\", newID);\n});\n\n$(\"#removeBtn\").on(\"click\", function() {\n  $.observable(people).remove($.inArray(app.selected(), people));\n  $.observable(app).setProperty(\"selectedID\", \"0\");\n});\n",
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td>\n    <button id=\"addBtn\">Add</button>\n    <button id=\"removeBtn\" data-link=\"disabled{:selectedID === '0'}\">Remove</button>\n  </td></tr>\n  <tr><td>\n    <select data-link=\"selectedID\" size=\"5\">\n      <option value=\"0\">Choose a person to edit</option>\n      {^{for people}}\n        <option data-link=\"{:name} value{:ID}\"></option>\n      {{/for}}\n    </select>\n  </td></tr>\n  <tr><td>\n    <label>Name:<input data-link=\"{:selected()^name:} disabled{:selectedID === '0'}\" /></label>\n    <label>Nickname:<input data-link=\"{:selected()^nickname:} disabled{:selectedID === '0'}\" /></label>\n  </td></tr>\n  <tr><td class=\"center\">\n    {^{for selected()}}\n      {^{:name}}\t\n      {^{if nickname}}\n        ( {^{:nickname}} )\n      {{/if}}\n    {{/for}}\n  </td></tr>\n</script>",
        "height": "210",
        "title": "data-linking to &lt;select>... and much more..."
      },
      {
        "_type": "para",
        "title": "Next:",
        "text": "[JsViews Quickstart](#jsv-quickstart)"
      },
      {
        "_type": "links",
        "title": "Links:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsvapi",
            "label": "JsViews API"
          },
          {
            "_type": "topic",
            "hash": "jsoapi",
            "label": "JsObservable API"
          },
          {
            "_type": "topic",
            "hash": "samples/jsv",
            "label": "JsViews samples"
          }
        ]
      }
    ]
  },
  "jsr-quickstart": {
    "filter": "jsr",
    "title": "JsRender Quickstart",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "*Best-of-breed templating*<br/>\n*Simple and intuitive, powerful and extensible, lightning fast*\n\n*For templated content in the browser or on Node.js (with Express 4, Hapi and Browserify integration)*\n\n*JsRender* is a light-weight but powerful templating engine, highly extensible, and optimized for high-performance rendering, without DOM dependency. It is designed for use in the browser or on Node.js, with or without jQuery.\n\n*JsRender* and *JsViews* together provide the next-generation implementation of the official jQuery plugins *[jQuery Templates](https://github.com/BorisMoore/jquery-tmpl)*, and *[jQuery Data Link](https://github.com/BorisMoore/jquery-datalink)* -- and supersede those libraries.\n"
      },
      {
        "_type": "para",
        "title": "JsRender on Node.js",
        "text": "JsRender can be used to render templates on the server (using Node.js) as well as in the browser. JsRender on Node.js has all the features and APIs of JsRender in the browser, plus some additional ones specific to Node.js.\n\nIt also provides built-in *Express*, *Hapi* and *Browserify* integration -- which makes it easy to register templates as simple `.html` files on the file system, and then load and render them either server-side, client-side or both.\n\n**Learn more:** *[JsRender Node.js Quickstart](#jsr-node-quickstart)* and *[JsRender APIs for Node.js](#jsrnode)*.\n\n**Code samples:** See *[JsRender Node Starter](https://github.com/BorisMoore/jsrender-node-starter)* for running code examples of Node.js scenarios, including with *Express*, *Hapi* and *Browserify*.\n"
      },
      {
        "_type": "para",
        "title": "JsRender and JsViews",
        "text": "JsRender is used for data-driven rendering of templates to strings, ready for insertion in the DOM.\n\nIt is also used by the [JsViews](#jsviews) platform, which adds data binding to JsRender templates, and provides a fully-fledged MVVM platform for easily creating interactive data-driven single page apps and websites."
      },
      {
        "_type": "para",
        "title": "JsRender installation",
        "text": "*jsrender.js* is available from [downloads](#download) on this site. \n\n*CDN delivery* is available from the ***[cdnjs](https://cdnjs.com)*** CDN at [cdnjs.com/libraries/jsrender](https://cdnjs.com/libraries/jsrender).\n\nAlternatively:\n- It can be installed with ***[Bower](http://bower.io/search/?q=jsrender)***, using `$ bower install jsrender` \n- It can be loaded using an *AMD script loader*, such as RequireJS\n- For installation using *Node.js* (*npm*) see *[JsRender Node.js Quickstart](#jsr-node-quickstart)*\n- (For browser loading using *Browserify* or *webpack* -- see *[JsRender Node.js Quickstart](#jsr-node-quickstart)*, *[JsRender as a Browserify module](#node/browserify@jsrender)* and *[JsRender as a webpack module](#node/webpack@jsrender)*)\n"
      },
      {
        "_type": "para",
        "title": "Using JsRender with jQuery",
        "text": "When jQuery is present, JsRender loads as a jQuery plugin and adds `$.views`, `$.templates` and `$.render` to the jQuery namespace object, `$` (or `window.jQuery`).\n\n*Example HTML page:* [JsRender with jQuery](#download/pages-jsr-jq)\n"
      },
      {
        "_type": "para",
        "title": "JsRender without jQuery",
        "text": "When jQuery is not present, JsRender provides its own `jsrender` namespace object, exposed as `window.jsrender`\n\nThe `jsrender` namespace provides the same methods/APIs as with jQuery, so if jQuery is not present you can still use all the API examples, by simply writing:\n\n```js\nvar $ = window.jsrender;\n\n// Now use code as in samples/examples, with $.views... $.templates... $.render...\n```\n\n*Example HTML page:* [JsRender without jQuery](#download/pages-jsr)\n\n<br/>\n## JsRender usage"
      },
      {
        "_type": "para",
        "title": "Define a template",
        "text": "From a string:\n\n```js\nvar tmpl = $.templates(\"Name: {{:name}}\");\n```\n\nFrom a template declared as markup in a script block:\n\n```jsr\n<script id=\"myTemplate\" type=\"text/x-jsrender\">Name: {{:name}}</script>\n```\n\n```js\nvar tmpl = $.templates(\"#myTemplate\");\n```\n\n<a href=\"#d.templates\">Learn more...</a>"
      },
      {
        "_type": "para",
        "title": "Render a template",
        "text": "`tmpl.render(object)` (or shortcut form: `tmpl(object)`) renders the template with the object as data context.\n\n`tmpl.render(array)` (or `tmpl(array)`) renders the template once for each item in the array.\n\n```js\nvar tmpl = $.templates(\" Name: {{:name}}<br/> \");\n```\n\n```js\nvar person = {name: \"Jim\"};\n\n// Render template for person object\nvar html = tmpl.render(person); // ready for insertion, e.g $(\"#container\").html(html);\n\n// result: \"Name: Jim<br/> \"\n```\n\n```js\nvar people = [{name: \"Jim\"}, {name: \"Pedro\"}];\n\n// Render template for people array\nvar html = tmpl.render(people); // ready for insertion...\n\n// result: \"Name: Jim<br/> Name: Pedro<br/> \"\n```\n<a href=\"#rendertmpl\">Learn more...</a>"
      },
      {
        "_type": "para",
        "title": "Register a named template - and render it",
        "text": "```js\n// Register named template \"myTmpl1\", from string \n$.templates(\"myTmpl1\", \"Name: {{:name}}<br/> \");\n// (or from script block: $.templates(\"myTmpl1\", \"#myTemplate\"); ...)\n\nvar person = {name: \"Jim\"};\n\n// Render named template\nvar html = $.render.myTmpl1(person);\n\n// result: \"Name: Jim<br/> \"\n```\n<a href=\"#rendertmpl\">Learn more...</a>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<br/>\n## Template tags\n"
      },
      {
        "_type": "para",
        "title": "Template tag syntax",
        "text": "- All tags other than [`{{: ...}}`](#assigntag) [`{{> ...}}`](#htmltag) [`{{* ...}}`](#allowcodetag) [`{{!-- --}}`](#commenttag) behave as block tags<br/><br/>\n- Block tags can have content, unless they use the self-closing syntax:\n  - Block tag - with content: `{{someTag ...}} content {{/someTag}}`\n  - Self-closing tag - no content (empty): `{{someTag .../}}`<br/><br/>\n- A particular case where self-closing syntax is used is when a block tag uses the named parameter `tmpl=...` to reference an external template &ndash; which then replaces what would have been the block content:\n  - Self-closing block  tag referencing an external template: `{{someTag ... tmpl=.../}}`<br/>(This lets you do [template composition](#tagsyntax@composition). See [example](#samples/jsr/composition/tmpl).)<br/><br/>\n- Tags can take both unnamed arguments and named parameters:\n  - `{{someTag argument1 param1=...}} content {{/someTag}}`\n  - an example of a named parameter is the `tmpl=...` parameter mentioned above\n  - arguments and named parameters can be assigned values from simple data-paths such as `address.street` or from richer expressions such as `product.quantity * 3.1 / 4.5`, or `name.toUpperCase()`\n\n[Learn more...](#tagsyntax)\n\n<div class=\"title\">Built-in tags</div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "<b>{{: ...}}</b> (Evaluate)",
        "text": "`{{: pathOrExpr}}` inserts the value of the path or expression.\n\n```js\nvar data = {address: {street: \"Main Street\"} };\nvar tmpl = $.templates(\"<b>Street:</b> {{:address.street}}\");\nvar html = tmpl.render(data);\n\n// result: \"<b>Street:</b> Main Street\"\n```\n\n<a href=\"#assigntag\">Learn more...</a>",
        "anchor": "assigntag"
      },
      {
        "_type": "para",
        "title": "<b>{{> ...}}</b> (HTML-encode)",
        "text": "`{{> pathOrExpr}}` inserts the *HTML-encoded* value of the path or expression.\n\n```js\nvar data = {condition: \"a < b\"};\nvar tmpl = $.templates(\"<b>Formula:</b> {{>condition}}\");\nvar html = tmpl.render(data);\n\n// result: \"<b>Formula:</b> a &lt; b\"\n```\n\n<a href=\"#htmltag\">Learn more...</a>",
        "anchor": "htmltag"
      },
      {
        "_type": "para",
        "title": "<b>{{include ...}}</b> (Template composition - partials)",
        "text": "`{{include pathOrExpr}}...{{/include}}`evaluates the block content against a specified/modified data context.\n\n`{{include ... tmpl=.../}}` evaluates the specified template against an (optionally modified) context, and inserts the result. (Template composition).\n\n```js\nvar data = {name: \"Jim\", address: {street: \"Main Street\"} };\n\n// Register two named templates\n$.templates({\n    streetTmpl: \"<i>{{:street}}</i>\",\n    addressTmpl: \"{{:name}}'s address is {{include address tmpl='streetTmpl'/}}.\"\n});\n\n// Render outer template\nvar html = $.templates.addressTmpl.render(data);\n\n// result: \"Jim's address is <i>Main Street</i>\"\n```\n<a href=\"#includetag\">Learn more...</a>",
        "anchor": "includetag"
      },
      {
        "_type": "para",
        "title": "<b>{{for ...}}</b> (Template composition, with iteration over arrays)",
        "text": "`{{for pathOrExpr}}...{{/for}}`evaluates the block content against a specified data context. If the new data context is an array, it iterates over the array, renders the block content with each data item as context, and concatenates the result.\n\n`{{for pathOrExpr tmpl=.../}}` evaluates the specified template against a data context. If the new data context is an array, it iterates over the array, renders the template with each data item as context, and concatenates the result.\n\n```jsr\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <ul>{{for people}}\n    <li>Name: {{:name}}</li>\n  {{/for}}</ul>\n</script>\n```\n\n```js\nvar data = {people: [{name: \"Jim\"}, {name: \"Pedro\"}] };\nvar tmpl = $.templates(\"#peopleTmpl\");\nvar html = tmpl.render(data);\n\n// result: \"<ul> <li>Name: Jim</li> <li>Name: Pedro</li> </ul>\"\n```\n<a href=\"#fortag\">Learn more...</a>",
        "anchor": "fortag"
      },
      {
        "_type": "para",
        "title": "<b>{{props ...}}</b> (Iteration over properties of an object)",
        "text": "`{{props pathOrExpr}}...{{/prop}}` or `{{props pathOrExpr tmpl=.../}}` iterates over the properties of the object returned by the path or expression, and renders the content/template once for each property -- using as data context: `{key: propertyName, prop: propertyValue}`.\n\n```jsr\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <ul>{{props person}}\n    <li>{{:key}}: {{:prop}}</li>\n  {{/props}}</ul>\n</script>\n```\n\n```js\nvar data = {person: {first: \"Jim\", last: \"Varsov\"} };\nvar tmpl = $.templates(\"#personTmpl\");\nvar html = tmpl.render(data);\n\n// result: \"<ul> <li>first: Jim</li> <li>last: Varsov</li> </ul>\"\n```\n<a href=\"#propstag\">Learn more...</a>",
        "anchor": "propstag"
      },
      {
        "_type": "para",
        "title": "<b>{{if ...}}</b> (Conditional inclusion)",
        "text": "`{{if pathOrExpr}}...{{/if}}` or `{{if pathOrExpr tmpl=.../}}` renders the content/template only if the evaluated path or expression is 'truthy'.\n\n`{{if pathOrExpr}}...{{else pathOrExpr2}}...{{else}}...{{/if}}`  behaves as '*if' - 'else if' - 'else'* and renders each block based on the conditions.\n\n```jsr\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  {{if nickname}}\n    Nickname: {{:nickname}}\n  {{else name}}\n    Name: {{:name}}\n  {{else}}\n    No name provided\n  {{/if}}\n</script>\n```\n\n```js\nvar data = {nickname: \"Jim\", name: \"James\"};\nvar tmpl = $.templates(\"#personTmpl\");\nvar html = tmpl.render(data);\n\n// result: \"Nickname: Jim\"\n```\n<a href=\"#iftag\">Learn more...</a>",
        "anchor": "iftag"
      },
      {
        "_type": "para",
        "title": "<b>Other built-in tags</b>",
        "text": "For details on all the above built-in tags, as well as *<a href=\"#commenttag\">comment tags</a>* `{{!-- ... --}}` and *<a href=\"#allowcodetag\">allow code tags</a>*  `{{* ...}}` and `{{*: ...}}`, see the [tags documentation](#jsrtags)."
      },
      {
        "_type": "para",
        "title": "<b>Custom tags</b>",
        "text": "Creating your own custom tags is easy. Register a custom tag using `$.views.tags(\"myTag\" , ...)`. The second parameter will generally be a `tagOptions` object on which you can specify a render method, template, event handlers, etc. (There are many examples in the JsRender and JsViews custom tag samples [here](#samples/jsr/tags) and [here](#samples/tag-controls)). But for simple tags, you may only need a simple render function, or a template string. \n\nFor example the two following definitions for a `{{fullName/}}` tag provide equivalent behavior:\n\nAs a render function:\n\n```js\n$.views.tags(\"fullName\", function(val) {\n    return val.first + \" \" + val.last;\n});\n```\nOr as a template string:\n\n```js\n$.views.tags(\"fullName\", \"{{:first}} {{:last}}\");\n```\n\nEither way, the result will be as follows:\n\n```js\nvar tmpl = $.templates(\"{{fullName person/}}\");\nvar data = {person: {first: \"Jim\", last: \"Varsov\"}};\nvar html = tmpl.render(data);\n\n// result: \"Jim Varsov\"\n```",
        "anchor": "customtags"
      },
      {
        "_type": "para",
        "title": "Helpers",
        "text": "For details see *[Helpers](#helpers)*.\n\nHere is a simple example. Two helpers -- a function, and a string:\n\n```js\nvar myHelpers = {\n    upper: function(val) { return val.toUpperCase(); },\n    title: \"Sir\"\n};\n```\n\nAccess the helpers using the `~myhelper` syntax:\n\n```js\nvar tmpl = $.templates(\"{{:~title}} {{:first}} {{:~upper(last)}}\");\n```\n\nWe can pass the helpers in with the `render()` method\n\n```js\nvar data = {first: \"Jim\", last: \"Varsov\"};\n\nvar html = tmpl.render(data, myHelpers);\n\n// result: \"Sir Jim VARSOV\"\n```\n\nOr we can register helpers globally:\n\n```js\n$.views.helpers(myHelpers);\n\nvar data = {first: \"Jim\", last: \"Varsov\"};\nvar html = tmpl.render(data);\n\n// result: \"Sir Jim VARSOV\"\n```\n<a href=\"#helpers\">Learn more...</a>",
        "anchor": "helpers"
      },
      {
        "_type": "para",
        "title": "Converters",
        "text": "Converters are used with the `{{: ...}}` tag, using the syntax `{{mycvtr: ...}}}`.\n\nExample -- an *upper* converter, to convert to upper case: \n\n```js\n$.views.converters(\"upper\", function(val) { return val.toUpperCase(); });\n\nvar tmpl = $.templates(\"{{:first}} {{upper:last}}\");\nvar data = {first: \"Jim\", last: \"Varsov\"};\nvar html = tmpl.render(data);\n\n// result: \"Jim VARSOV\"\n```\n<a href=\"#converters\">Learn more...</a>",
        "anchor": "converters"
      },
      {
        "_type": "para",
        "title": "Logic and expressions",
        "text": "JsRender supports rich expressions and logic, but at the same time encapsulates templates to prevent random access to globals. If you want to provide access to global variables within a template, you have to pass them in as data or as helpers.\n\nYou can assign rich expressions to any template arguments or parameters, as in:\n\n`{{:person.nickname ? \"Nickname: \" + person.nickname : \"(has no nickname)\"}}`\n\nor\n\n```jsr\n{{if ~limits.maxVal > (product.price*100 - discount)/rate}}\n  ...\n{{else ~limits.minVal < product.price}}\n  ... \n{{else}}\n  ... \n{{/if}}\n```",
        "anchor": "logic"
      },
      {
        "_type": "links",
        "title": "Links:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsrapi",
            "label": "JsRender API"
          },
          {
            "_type": "topic",
            "hash": "jsr-node-quickstart",
            "label": "JsRender Node.js Quickstart"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr",
            "label": "JsRender samples"
          }
        ]
      }
    ]
  },
  "jsv-quickstart": {
    "filter": "jsv",
    "title": "JsViews Quickstart",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "*JsViews: Next-generation MVVM and MVP framework -- bringing templates to life*<br/>\n*The power of MVVM, the flexibility of JavaScript, the speed and ease of JsRender templates and jQuery*<br/>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "*JsViews* builds on top of *[JsRender](#jsrender)* templates, and adds data-binding and *[observable data](#jsobservable)*, to provide a fully-fledged MVVM platform for easily creating interactive data-driven single-page apps and websites.\n"
      },
      {
        "_type": "para",
        "title": "JsRender and JsViews",
        "text": "*JsRender* is used for data-driven rendering of templates to strings, ready for insertion in the DOM. (See *[JsRender Quickstart](#jsr-quickstart)* and [JsRender GitHub repository](https://github.com/BorisMoore/jsrender)). \n\n*JsViews* incorporates *JsRender* templates, together with data-binding, *observable data* and MVVM support. It provides a powerful platform for building dynamic interactive websites and single-page apps. \n\n(Note: *JsRender* and *JsViews* together provide the next-generation implementation of the official jQuery plugins *[JQuery Templates](https://github.com/BorisMoore/jquery-tmpl)*, and *[JQuery Data Link](https://github.com/BorisMoore/jquery-datalink)* -- and supersede those libraries.)"
      },
      {
        "_type": "para",
        "title": "JsViews installation",
        "text": "*jsviews.js* is available from [downloads](#download) on this site.\n\n*CDN delivery* is available from the ***[cdnjs](https://cdnjs.com)*** CDN at [cdnjs.com/libraries/jsviews](https://cdnjs.com/libraries/jsviews).\n\nAlternatively:\n\n- It can be installed with ***[Bower](http://bower.io/search/?q=jsviews)***, using `$ bower install jsviews` \n- It can be loaded using an *AMD script loader*, such as RequireJS\n- For installation using *Node.js* (*npm*), and loading using [Browserify](http://browserify.org/) or [webpack](https://webpack.github.io/), see *[JsViews as a Browserify module](#node/browserify@jsviews)* and *[JsViews as a webpack module](#node/webpack@jsviews)*\n\n*Example HTML page:* [Loading JsViews](#download/pages-jsv)\n\n(Note that *jsviews.js* includes all of *jsrender.js* code -- so *jsrender.js* does not need to be loaded first.)\n<br/>\n## JsViews usage"
      },
      {
        "_type": "para",
        "title": "Data-linked templates",
        "text": "JsViews provides *data-linking* -- so that JsRender templates become data-bound:\n\n- *Data-linked* tags or elements in your templates will update automatically whenever the underlying data changes.\n- Some data-linked tags or elements provide *two-way* data-linking, so that user interactions will trigger *\"observable\"* changes to the underlying data (which may then trigger other updates elsewhere in your templated UI).\n\n**Data-linked template tags:**\n\nAny JsRender tag, `{{...}}` can be *data-linked* by writing `{^{...}}`, as in:\n\n```jsr\n<ul>\n  {^{for people}} <!-- The <li> list will update when the people array changes -->\n    <li>{^{:name}}</li> <!-- This will update when the name property changes -->\n  {{/for}}\n</ul>\n```\n\n[Learn more...](#linked-tag-syntax)\n\n***Data-linked HTML elements:***\n\nHTML elements within templates can be *data-linked* by adding a `data-link` attribute:\n\n```jsr\n<input data-link=\"name\"/> <!-- This has two-way data-binding to the name property -->\n<span data-link=\"name\"></span> <!-- This will update when the name property changes -->\n```\n\nHTML elements within 'top-level' page content can also be data-linked -- see [below](#jsv-quickstart@toplink).\n\n[Learn more...](#linked-elem-syntax)",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "Render and link a template",
        "text": "With *JsRender*, you call the `render()` method, then insert the resulting HTML in the DOM.\n\n```js\nvar html = tmpl.render(data, helpersOrContext);\n$(\"#container\").html(html);\n```\n\nWith *JsViews*, you can instead call the `link()` method:\n\n```js\ntmpl.link(\"#container\", data, helpersOrContext);\n```\n\nwhich in one line of code will:\n- render the template\n- insert the resulting HTML as content under the HTML `container` element\n- data-link that content to the underlying `data`\n\nNow *observable* changes in the data will automatically trigger updates in the rendered UI.\n\nThere are two ways of calling the `link()` method:\n- If you have a reference to the <em>template object</em>, call [`template.link(...)`](#jsvtmpllink)\n- If you have registered the template by name (`\"myTmpl\"`), call [`link.myTmpl(...)`](#jsv.d.link)\n\n**Example**: - Template from string\n\n```js\nvar tmpl = $.templates(\"{^{:name}} <input data-link='name' />\");\nvar person = {name: \"Jim\"};\ntmpl.link(\"#container\", person);\n```\n\n**Example**: - Template from script block\n\n```jsr\n<script id=\"myTemplate\" type=\"text/x-jsrender\">{^{:name}} <input data-link=\"name\" /></script>\n```\n\n```js\nvar tmpl = $.templates(\"#myTemplate\");\nvar person= {name: \"Jim\"};\ntmpl.link(\"#container\", person);\n```\n\n**Example**: - Named template from string\n\n```js\n$.templates(\"myTmpl1\", \"{^{:name}} <input data-link='name' />\");\nvar person= {name: \"Jim\"};\n$.link.myTmpl1(\"#container\", person);\n```\n\n**Example**: - Named template from script block\n\n```jsr\n<script id=\"myTemplate\" type=\"text/x-jsrender\">{^{:name}} <input data-link=\"name\" /></script>\n```\n\n```js\n$.templates(\"myTmpl2\", \"#myTemplate\");\nvar data = {name: \"Jim\"};\n$.link.myTmpl2(\"#container\", data);\n```\n\n**Result:** After each `link()` example above the `container` element will have the following content:\n \n```html\nJim <input value=\"Jim\" />\n```\n\nwith the `name` property of `person` object data-linked to the `\"Jim\"` text node and *two-way* data-linked to the `<input />`\n\nSee: *[Playing with JsViews](#jsvplaying)* for working samples, such as [this one](#jsvplaying@twoway)\n\n[Learn more...](#jsvlinktmpl).\n"
      },
      {
        "_type": "para",
        "title": "Top-level data-linking",
        "text": "You can use data-linking not only for templated content, but also to data-bind to top-level HTML content in your page: \n\n```js\n$.link(true, \"#target\", data);\n```\n\nThis will activate any declarative data-binding (`data-link=\"...\"` expressions) on the target element -- or on elements within its content.\n\n[Learn more...](#toplink)",
        "anchor": "toplink"
      },
      {
        "_type": "para",
        "title": "Making \"observable\" changes to objects and arrays",
        "text": "In current JavaScript implementations, modifying objects or arrays does not raise any event, so there is no way for the change to be detected elsewhere. JsViews dynamic data-bound UI solves this through <em>data-linking</em>, using the *[JsObservable observer pattern](#jsoapi)*.\n\nThe JsViews `$.observable()` API provides a way for you to change objects or arrays *observably*. Each change will raise a *[property change](#onpropchange)* or *[array change](#onarrchange)* event. \n\n**Modify an object observably**\n\n```js\n$.observable(person).setProperty(\"name\", newName);\n```\n\n`$.observable(person)` makes the `person` object *\"observable\"*, by providing a `setProperty(...)` method. Use `setProperty` to change a value, and the change will be *\"observed\"* by the declarative data-binding in the template.\n\n\n**Modify an array observably**\n\n```js\n$.observable(people).insert(newPerson);\n```\n\n`$.observable(people)` makes the `people` array *\"observable\"*, by providing methods like `insert(...)` and `remove(...)`. Use them to make changes to arrays, and the changes will be *\"observed\"* by data-bound elements and tags in the template -- such as the `{^{for dataArray}}` tag.\n\n[Learn more...](#$observable)",
        "anchor": "observe-chg"
      },
      {
        "_type": "para",
        "title": "Responding to data changes",
        "text": "JsViews uses the *<a href=\"#onpropchange\">property change</a>* or *<a href=\"#onarrchange\">array change</a>* events to make any <a href=\"#linked-template-syntax\">data-linked tags or elements</a> in your templates update automatically in response to each *observable* change in your underlying data. In addition, with two-way data-linking, it ensures that those events are raised when the user interacts with a data-linked template, and causes changes to the underlying data.\n\n**observe() and observeAll()**\n\nThe `[$.observe()](#observe)` and [`$.observable().observeAll()`](#observeAll) APIs make it very easy for you to register event handlers or listeners, so your code can listen to specific observable changes made to your data objects or view models:\n\n```js\n$.observe(person, \"name\", function(...) {\n  // The \"name\" property of person has changed\n  ...\n});\n```\n\n```js\n$.observable(person).observeAll(function(...) {\n  // A property of person, or a nested object property, has changed\n  ...\n});\n```\n\n[Learn more...](#observeobjectsarrays)",
        "anchor": "observe"
      },
      {
        "_type": "para",
        "title": "Accessing the view hierarchy",
        "text": "Each instance of a rendered template or a template block tag is associated with a JsViews *\"view\"* object -- so nested tags lead to a hierarchy of view objects. The [view hierarchy](#views) shows how the underlying data objects map to the rendered UI.\n\n**From UI back to data:**\n\nUse [`$.view(elem)`](#jsv.d.view) to get from a DOM element to the corresponding `view` object for that part of the rendered content. From the `view` you can then get to the underlying `data`, the `index`, etc.\n\n*[Example](#jsv.d.view@$view):*\n\n```jsr\n{^{for people}}\n  ...\n  <button class=\"changeBtn\">Change</button>\n  ...\n{{/for}}\n```\n\nClick-handler code for <em>Change</em> button:\n\n```js\n$(\".changeBtn\").on(\"click\", function() {\n  var view = $.view(this); // From the clicked HTML element ('this'), get the view object\n  var person = view.data;  // The 'person' data object for clicked button\n  var index = view.index;  // The index of this 'item view'. (Equals index of person in people array)\n  $.observable(person).setProperty(\"name\", person.name + \" \" + index); // Change the person.name\n});\n```\n\n[Learn more...](#$view)"
      },
      {
        "_type": "para",
        "title": "Data-linked paths",
        "text": "JsViews data-linked templates (and the `$.observe()` API) use the same [paths and expressions](#paths) as JsRender templates, but in addition provide *'leaf'* data-binding -- such as:\n\n```jsr\n{^{:team.manager.name`}}                    <!-- updates when name changes -->\n<span data-link=\"team.manager.name\"></span> <!-- updates when name changes -->\n<input data-link=\"team.manager.name\" />     <!-- two-way binding to name -->\n```\n\nBut data-linked paths have additional support, such as linking deeper into paths:\n\n```jsr\n{^{:team^manager.name`}}                    <!-- updates when name, manager, or team changes -->\n```\n\n[Learn more...](#linked-paths)\n"
      },
      {
        "_type": "para",
        "title": "Computed observables",
        "text": "JsViews also allows you to data-bind to computed values, such as:\n\n```jsr\n{^{:shoppingCart.totalAmount()}}           <!-- updates when totalAmount() changes -->\n<input data-link=\"person.fullName()\" />    <!-- two-way binding to the computed fullName() -->\n```\n\n[Learn more...](#computed)"
      }
    ]
  },
  "jsr-node-quickstart": {
    "filter": "jsr",
    "title": "JsRender Node.js Quickstart",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender can be used to render templates on the server (using Node.js) as well as in the browser. \n\nJsRender on Node.js has the full set of features and APIs provided by JsRender in the browser (see *[JsRender Quickstart](#jsr-quickstart)*).\n\nIn addition, it provides built-in ***Express***, ***Hapi*** and ***Browserify/webpack*** integration, as well as APIs for accessing templates stored as simple `.html` files on the file system. This makes it easy to render the same templates server-side, client-side or both."
      },
      {
        "_type": "para",
        "title": "Installation",
        "text": "Install jsrender:\n\n```bash\n$ npm install jsrender --save\n```\n\nLoad the jsrender module:\n\n```js\nvar jsrender = require('jsrender');\n```\n\nNow [call JsRender APIs](#node/install@apis), or use Express or Hapi integration (see below), for server-rendering of JsRender templates.\n\n[Learn more about JsRender installation and usage on Node.js...](#node/install)",
        "anchor": "install"
      },
      {
        "_type": "para",
        "title": "Rendering templates on the server",
        "text": "On Node.js you can use all the normal JsRender APIs to render templates (such as a layout template) -- and return the HTML string in the HTTP response:\n\n```js\nvar jsrender = require('jsrender');\n\nvar tmpl = jsrender.templates('Name: {{:name}}<br/>'); // Compile template from string\n\nvar html = tmpl.render({name: \"Jim\"}); // Render\n// result: \"Jim Varsov\"\n\napp.get('/...', function(req, res) {\n  res.send(html);\n});\n```\n\nNote that *[template composition](#tagsyntax@composition)* works on Node.js just as it does with JsRender on the browser -- and can include *[file paths](#node/filetmpls@composition)*."
      },
      {
        "_type": "para",
        "title": "Defining templates as .html files",
        "text": "JsRender templates can be stored directly in the file system (e.g. as `.html`, `.jsr.` or `.jsrender` files).\n\nLet's rewrite the example above, but store the template as an `.html` file rather than compile it from a string:\n\n**Template:** *./templates/myTemplate.html* -- with contents:\n\n```jsr\nName: {{:name}}<br/>\n```\n\n**Code:** JsRender recognizes file paths, so you can write:\n\n```js\nvar jsrender = require('jsrender');\n\nvar tmpl = jsrender.templates('./templates/myTemplate.html'); // Compile the template from file\n\nvar html = tmpl.render({name: \"Jim\"}); // Render\n// result: Name: Jim<br/>\n\n...\nres.send(html);\n```\n\n[Learn more about file-based templates...](#node/filetmpls)"
      },
      {
        "_type": "para",
        "title": "Using helpers, converters, custom tags...",
        "text": "On Node.js you can use the full set of JsRender features, template tags and APIs, just as you would in the browser -- by simply using the `jsrender` namespace object returned from `require('jsrender')`, instead of the jQuery object, `$`. In addition you can take advantage of file-based templates.\n\nFor example, here is the JsRender Quickstart *[Custom Tags](#jsr-quickstart@customtags)* sample, as you might write it on Node.js:\n\n**Template:** *./templates/personTemplate.html*:\n\n```jsr\nName: {{fullName person/}}\n```\n\n**Code:**\n\n```js\nvar jsrender = require('jsrender');\n\njsrender.views.tags(\"fullName\", \"{{:first}} {{:last}}\"); // Register custom tag\n\nvar tmpl = jsrender.templates('./templates/personTemplate.html'); // Compile template\n\nvar html = tmpl.render({person: {first: \"Jim\", last: \"Varsov\"}}); // Render\n// result: \"Jim Varsov\"\n```\n\n[Learn more about APIs, features...](#node/install@apis)"
      },
      {
        "_type": "para",
        "title": "Using Express to render templates",
        "text": "In Express you can use JsRender APIs to render the template, as in the examples above, then return the html in the HTTP response:\n\n```js\napp.get('/...', function(req, res) {\n  res.send(html);\n});\n```\n\nBut alternatively you can register JsRender as template engine for Express:\n\n```js\nvar jsrender = require('jsrender');\n\napp.engine('html', jsrender.__express); // Set JsRender as template engine for .html files\napp.set('view engine', 'html'); \napp.set('views', __dirname + '/templates'); // Folder location for JsRender templates for Express\n```\n\nRender template *./templates/myTemplate.html* -- content: `Name: {{:name}}<br/>`:\n\n```js\napp.get('/...', function(req, res) {\n  res.render('myTemplate', {name: \"Jim\"}); \n  // result: Name: Jim<br/>\n});\n```",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "Using Hapi to render templates",
        "text": "JsRender also has built-in support as template engine for [Hapi](http://hapijs.com/):\n\nSet JsRender as the template engine for Hapi:\n\n```js\nvar jsrender = require('jsrender');\n\nserver.register(vision, function (err) {\n  ...\n  server.views({\n    engines: { html: jsrender },\n    relativeTo: __dirname,\n    path: 'templates'\n  });\n```\n\nUse Hapi to render a template:\n\n```js\nserver.route({\n  method: 'GET',\n  path: '/',\n  handler: function (request, reply) {\n    return reply.view('myTemplate', myData);\n  }\n});\n```"
      },
      {
        "_type": "para",
        "title": "Details:",
        "text": "[JsRender APIs for Node.js](#jsrnode)\n\n&mdash; [Installation and usage](#node/install)<br/>\n&mdash; [File-based templates](#node/filetmpls)<br/>\n&mdash; [Express and Hapi integration](#node/express-hapi)<br/>\n&mdash; [Server/browser shared templates](#node/server-browser)<br/>\n&mdash; [Browserify support](#node/browserify)<br/>\n&mdash; [Webpack support](#node/webpack)<br/>"
      },
      {
        "_type": "links",
        "title": "Other links:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsr-quickstart",
            "label": "JsRender Quickstart"
          },
          {
            "_type": "topic",
            "hash": "jsrapi",
            "label": "JsRender API"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr",
            "label": "JsRender samples"
          }
        ]
      },
      {
        "_type": "para",
        "title": "JsRender Node Starter",
        "text": "For details and running code samples for Node.js scenarios, including with ***Express***, ***Hapi*** and ***Browserify***, see the *[JsRender Node Starter](https://github.com/BorisMoore/jsrender-node-starter)* project on GitHub."
      }
    ]
  },
  "home": {
    "title": "JsRender",
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
  "temp": {
    "title": "JsViews QS end",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Data-link target attributes",
        "text": "Data-linking to value, innerHTML, innerText, class, disabled, CSS attributes, visibility, data-* attributes, selection, SVG"
      },
      {
        "_type": "para",
        "title": "Data-link expressions",
        "text": "{for}, {if}, custom bindings"
      },
      {
        "_type": "para",
        "title": "Event bindings",
        "text": "paragraph"
      },
      {
        "_type": "para",
        "title": "Datamaps",
        "text": "paragraph"
      },
      {
        "_type": "para",
        "title": "Tag hierarchy",
        "text": "paragraph"
      },
      {
        "_type": "para",
        "title": "Contextual parameters",
        "text": "paragraph"
      }
    ]
  }
};