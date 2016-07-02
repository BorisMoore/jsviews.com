var content = $.views.documentation.content;

content.jsvapi = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/jsvapi")) ||
{
  "jsvapi": {
    "title": "JsViews API topics",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See [*JsViews Quickstart*](#jsv-quickstart) for an introductory overview."
      },
      {
        "_type": "links",
        "title": "Topics:",
        "links": [],
        "topics": [
          {
            "hash": "linked-template-syntax",
            "label": "Data-linked template syntax"
          },
          {
            "hash": "jsvtags",
            "label": "Template tags"
          },
          {
            "hash": "jsvlinktmpl",
            "label": "Render and link a template"
          },
          {
            "hash": "jsvapps",
            "label": "Building apps"
          },
          {
            "hash": "toplink",
            "label": "Top-level data-linking"
          },
          {
            "hash": "$view",
            "label": "Views: from UI to data"
          },
          {
            "hash": "link-targets",
            "label": "Targets for data-linking"
          },
          {
            "hash": "jsvunlink",
            "label": "unlink()"
          },
          {
            "hash": "jsvsettings",
            "label": "Settings"
          },
          {
            "hash": "jsvadvanced",
            "label": "Advanced"
          }
        ]
      }
    ]
  },
  "jsvtags": {
    "title": "Template tags in JsViews",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "***Any JsRender template*** can be used with JsViews. But in JsViews, templates are *\"data-linked\"* (think *data-bound*). Data-binding is optionally turned on within a data-linked template by data-linking individual tags and elements: "
      },
      {
        "_type": "para",
        "title": "JsViews: Using data-linked tags and elements",
        "text": "Calling the <a href=\"#rendertmpl\">`render()`</a> method works just the same within JsViews as it does if only JsRender is loaded. But alternatively you can use the <a href=\"#jsvlinktmpl\">`link()`</a> method -- which will first render and then add data binding (<em>data-link the template</em>).\n\nIf you have data-linked your template by calling the `link()` method, then you can continue to use the same [JsRender template tags](#jsrtags) as before. But now you optionally make any tag in the template [data-linked](#linked-tag-syntax), by replacing the `{{...` of the opening tag by `{^{...`, as in:\n\n```jsr\n{^{for people}}\n  {^{:name}}\n{{/for}}\n```\n\nIn addition, you can [*data-link* the HTML elements](#linked-elem-syntax) in your template, as in:\n\n```jsr\n<input data-link=\"name\" />\n<div data-link=\"css-color{:color} {:name}\"></div>\n```\n \nSee *[Data-linked template syntax](#linked-template-syntax)* for details..."
      },
      {
        "_type": "para",
        "title": "JsRender tags (with data-linking)",
        "text": "The following topics give examples and details for data-linking each of the [built-in JsRender template tags](#jsrtags):\n\n*Tags without content:*\n\n- [`{^{: ...}}`](#jsvassigntag) (Evaluate)\n- [`{^{> ...}}`](#jsvhtmltag) (HTML encode)\n\n*Block tags:*\n\n- [`{^{include ...}}`](#jsvincludetag) (Template composition -- partials)\n- [`{^{for ...}}`](#jsvfortag) (Template composition, with iteration over arrays)\n- [`{^{props ...}}`](#jsvpropstag) (Iteration over properties of an object)\n- [`{^{if ...}}`](#jsviftag) (Conditional inclusion)\n- [`{^{myTag ...}}`](#jsvtagcontrols) (Custom tag controls)\n\n*Alternative content blocks:*\n\n- [`{{else ...}}`](#jsvelsetag) (Content block separator)\n\n*Creating your own tags (custom tag controls):*\n\n- [Custom tags](#jsvtagcontrols)\n"
      },
      {
        "_type": "para",
        "title": "In JsViews your template must be well-formed:",
        "text": "JsViews imposes some 'well-formed' constraints on templates which do not apply if you are only using JsRender. This is because JsRender is string-based, and is not 'aware' of the HTML structure, whereas JsViews is 'HTML-aware' in order to provide element-based data-binding'\n\nIn JsRender you have a lot of freedom. You can even do this:"
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
            "title": "{{if}} tag blocks wrap <b>part</b> of an HTML &lt;td> tag",
            "markup": "<td \n  {{if lastName}}\n    >{{:firstName}}</td><td>{{:lastName}}\n  {{else}}\n    colspan=\"2\">{{:firstName}}\n  {{/if}}\n</td>\n"
          }
        ],
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n  {\n    firstName: \"Jeff\"\n  },\n  {\n    firstName: \"Xavier\",\n    lastName: \"Prieto\"\n  }\n];\n\nvar html = myTemplate.render(people);\n\n$(\"#peopleList\").html(html);\n",
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td \n      {{if lastName}}\n        >{{:firstName}}</td><td>{{:lastName}}\n      {{else}}\n        colspan=\"2\">{{:firstName}}\n      {{/if}}\n    </td>\n  </tr>\n</script>",
        "onlyJsRender": true,
        "height": "80",
        "title": "Badly-formed template - but OK in JsRender!"
      },
      {
        "_type": "para",
        "title": "",
        "text": "That works because JsRender (using pure string-based rendering) doesn't mind how you mix your JsRender tag hierarchy with the HTML tag markup."
      },
      {
        "_type": "para",
        "title": "Rules for a well-formed template in JsViews:",
        "text": "With JsViews, it is different. Here are the rules of what is valid, or invalid, within a JsViews template:\n\n- JsRender template tags which are outside HTML elements, or fully within the element content of an HTML element can remain unchanged in a JsViews template. They will work correctly. They can optionally be data-linked by simply adding a `^` character (so that for example a `{{for}}` tag becomes a data-linked `{^{for}}` tag) -- and in that case the rendered content will change dynamically whenever the bound data changes *['observably'](#$observable)*.\n- But tags which are within the markup of the actual HTML opening tag itself, whether placed between attributes, or spanning attributes, or within the attribute content (the text value of the attribute), will not be valid in a JsViews template.\n- Similarly, tags which wrap opening or closing tag in such a way as to produce 'mal-formed HTML' will not be valid.\n- In fact a valid JsViews template will have the tree hierarchy of nested HTML tags and nested template tags combining together, as it were, as a single well-formed tree.\n- In each of the invalid scenarios mentioned above, ***the JsRender tags needs to be replaced by corresponding data-linked element syntax***. See *[Data-linked template syntax](#linked-template-syntax)* for details.\n"
      }
    ]
  },
  "jsvlinktmpl": {
    "title": "Render and data-link a template",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The `link(container, data, helpersOrContext)` is similar to the [`render(data, helpersOrContext)`](#rendertmpl) method, but in addition to rendering the template, it also inserts the rendered output as content of the target HTML `container` element, and then *data-links* (data-binds to *observable* data) the HTML content to the underlying data.\n\nThe `link(container, data, helpersOrContext)` method takes as parameters the target HTML container element (or jQuery selector), the data (used as the <em>'data context'</em> during the rendering and linking), and optionally additional metadata or contextual helpers. It returns a jQuery object corresponding to the container element.\n\nThere are two ways of calling the `link()` method:\n- If you have a reference to the <em>template object</em> - `myTmpl`, call [myTmpl.link(...)](#jsvtmpllink)\n- If you have registered the template by name - `\"myTmpl\"`, call [$.link.myTmpl(...)](#jsv.d.link)\n"
      },
      {
        "_type": "links",
        "title": "Links:",
        "links": [],
        "topics": [
          {
            "hash": "jsvtmpllink",
            "label": "myTmpl.link()"
          },
          {
            "hash": "jsv.d.link",
            "label": "$.link.myTmpl()"
          }
        ]
      }
    ]
  },
  "jsvtmpllink": {
    "title": "Render and data-link a template against data objects or arrays",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "myTmpl.link()",
        "text": "If `myTmpl` is the compiled template object for your template, you can render and data-link it (data-bind to underlying *observable* data) using the `myTmpl.link()` method -- which takes a <em>container</em> element (or jQuery selector) and a <em>data</em> object or array (as well as an optional <em>helpersOrContext</em> object).\n\nTo get a template object from a template string, a template declared in a script block, or a previously registered *named template*, see <a href=\"#d.templates\">`$.templates()`</a>."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "template.link(container, data)",
        "name": "link",
        "object": "template",
        "method": true,
        "tag": false,
        "returns": "jQuery object for container",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "container",
                "type": "HTML element or jQuery selector",
                "optional": false,
                "description": "The target element, under which to render and data-link the content"
              },
              {
                "_type": "param",
                "name": "data",
                "type": "object or array",
                "optional": true,
                "description": "The data to render. This can be any JavaScript type, including Array or Object."
              }
            ],
            "sections": [],
            "example": "myTmpl.link(\"#container\", myData);",
            "description": "Render and link template against data, as content of container element"
          }
        ],
        "description": "Render and link template against data, under a container element",
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
        "text": "Passing an object to the `link()` method.\n\n<em>&mdash; The template is rendered once, with the object as data context:</em>"
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
            "text": "```jsr\n<td>{^{:name}}</td>\n<td><input data-link=\"name\" /></td>\n```\n\n```js\nvar myTmpl = $.templates(\"#personTmpl\");\n\nmyTmpl.link(\"#person\", person);\n```"
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td>{^{:name}}</td>\n    <td><input data-link=\"name\" /></td>\n  </tr>\n</script>",
        "code": "var myTmpl = $.templates(\"#personTmpl\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar html = myTmpl.link(\"#person\", person);\n",
        "title": "template.link(object):",
        "onlyJsRender": false,
        "height": "60"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing an array to the `link()` method.\n\n<em>&mdash; The template is rendered once for each item in the array:</em>"
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
            "text": "```js\nmyTmpl.link(\"#peopleList\", people);\n```"
          }
        ],
        "html": "<button id=\"add\">Add person</button>\n\n<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td>{^{:name}}</td>\n    <td><input data-link=\"name\" /></td>\n  </tr>\n</script>",
        "code": "var myTmpl = $.templates(\"#personTmpl\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nmyTmpl.link(\"#peopleList\", people);\n\n$(\"#add\").on(\"click\", function() {\n  $.observable(people).insert({\n    name: \"name\"\n  });\n});\n",
        "title": "template.link(array):",
        "onlyJsRender": false,
        "height": "160"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing helpers to the `link()` method."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "template.link(container, data, helpersOrContext)",
        "name": "link",
        "object": "template",
        "method": true,
        "tag": false,
        "returns": "jQuery object for container",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "container",
                "type": "HTML element or jQuery selector",
                "optional": false,
                "description": "The target element, under which to render and data-link the content"
              },
              {
                "_type": "param",
                "name": "data",
                "type": "object or array",
                "optional": true,
                "description": "The data to render. This can be any JavaScript type, including Array or Object."
              },
              {
                "_type": "param",
                "name": "helpersOrContext",
                "type": "object",
                "optional": true,
                "description": "Contextual helper methods or properties -- available to template as <code>~keyName</code>"
              }
            ],
            "sections": [],
            "example": "myTmpl.link(\"#container\", myData, myHelpers);",
            "description": "Render and link template against data (as content of container element) and pass in helpers"
          }
        ],
        "description": "Render and link template against data, under a container element, along with helper objects or context",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        },
        "anchor": "apihelpers"
      },
      {
        "_type": "para",
        "title": "",
        "text": "You can pass in any JavaScript type (<em>object, string, number, function...</em>) as helpers on the `helpersOrContext` object, and use them as metadata, or as helper functions for formatting etc.\n\n<em>Note:</em> By passing in helpers in this way, you are making them specific to this render call. Alternatively, you can declare helpers globally, -- and you can also declare helpers that are private to a specific template. See *[Registering helpers: `$.views.helpers()`](#helpers)* for details...\n\nWithin the template, helpers (whether global, or passed in to the `render()` method) are accessed by *helper paths*: `~keyName...`. \n\nFor example you might pass in an object with some utility functions:\n\n```js\nvar myHelpers = {\n  util: {\n    split: function(val, part) {...},\n    ...\n  },\n  ...\n};\n\nvar html = myTmpl.render(myData, myHelpers);\n```\n\n-- and access them in the template using a *helper path* such as:\n\n```jsr\n{{:~util.split(fullName, 0)}}\n```\n\nSee *[Registering helpers](#helpers)*"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
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
            "title": "",
            "text": "```js\nfunction toUpper(val) {...}\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nmyTmpl.link(\"#person\", person, myHelpers);\n```\n\n```jsr\n<td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n```\n\nClick <em>Try it</em> and change the color to `\"green\"`..."
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n    <td><input data-link=\"name\" /></td>\n  </tr>\n</script>",
        "code": "function toUpper(val) { return val.toUpperCase(); }\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nmyTmpl.link(\"#person\", person, myHelpers);",
        "title": "template.link(object, myHelpers):",
        "height": "60"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsvlinktmpl",
            "label": "Render and link a template"
          }
        ]
      }
    ]
  },
  "jsv.d.link": {
    "title": "Render and link a named template without needing the template object",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "$.link.myTmpl()",
        "text": "If a template has been registered as a named template:\n\n```js\n$.templates(\"myTmpl\", \"#personTmpl\");\n```\n\n...then you can call the <a href=\"#jsvtmpllink\">`link()`</a> method of the template without needing to hold on to the compiled template object returned from <a href=\"#d.templates\">`$.templates(...)`</a>.\n\nJust call `$.link.myTmpl(...)`, or `$.link[\"myTmpl\"](...)`"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.link.myTmpl(container, data, helpersOrContext)",
        "name": "myTmpl",
        "object": "$.link",
        "method": true,
        "tag": false,
        "returns": "jQuery object for container",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "container",
                "type": "HTML element or jQuery selector",
                "optional": false,
                "description": "The target element, under which to render and data-link the content"
              },
              {
                "_type": "param",
                "name": "data",
                "type": "object or array",
                "optional": true,
                "description": "The data to render. This can be any JavaScript type, including Array or Object."
              },
              {
                "_type": "param",
                "name": "helpersOrContext",
                "type": "object",
                "optional": true,
                "description": "Contextual helper methods or properties -- available to template as <code>~keyName</code>"
              }
            ],
            "sections": [],
            "example": "$.link.myTmpl(\"#container\", myData, myHelpers);",
            "description": "Render and link template against data (as content of a container element) and pass in helpers"
          }
        ],
        "description": "Render and link a named template against data, along with helper objects or context",
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
        "text": "Here is an example:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
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
            "title": "",
            "text": "```js\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\n$.link.personTmpl(\"#person\", person, myHelpers);\n```\n"
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <tr>\n    <td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n    <td><input data-link=\"name\" /></td>\n  </tr>\n</script>",
        "code": "var person = {\n    name: \"Adriana\"\n  };\n\nfunction toUpper(val) { return val.toUpperCase(); }\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\n$.link.personTmpl(\"#person\", person, myHelpers);",
        "title": "$.link.personTmpl(...):",
        "height": "60"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [
          {
            "_type": "link",
            "hash": "hash",
            "label": ""
          }
        ],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsvlinktmpl",
            "label": "Render and link a template"
          }
        ]
      }
    ]
  },
  "jsvunlink": {
    "title": "Unlink a template",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvtmplunlink",
            "label": "template.unlink()"
          },
          {
            "hash": "jsv.d.unlink",
            "label": "$.unlink()"
          },
          {
            "hash": "jsv.db.unlink",
            "label": "$(...).unlink()"
          }
        ]
      }
    ]
  },
  "jsvtmplunlink": {
    "title": "template.unlink()",
    "path": "",
    "sections": []
  },
  "jsv.d.unlink": {
    "title": "$.unlink()",
    "path": "",
    "sections": []
  },
  "jsv.db.unlink": {
    "title": "$(...).unlink()",
    "path": "",
    "sections": []
  },
  "$view": {
    "title": "The view hierarchy: getting from the UI back to the data",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Each instance of a rendered template or a template block tag is associated with a JsViews *\"view\"* object.\n\nUse `$.view()` to get from the rendered HTML back to the data."
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "views",
            "label": "View hierarchy"
          },
          {
            "_type": "topic",
            "hash": "jsv.d.view",
            "label": "$.view()"
          }
        ]
      }
    ]
  },
  "jsv.d.view": {
    "title": "Getting from the rendered UI back to the data",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "var view = $.view(elem);",
        "text": "Each instance of a rendered template or a template block tag is associated with a JsViews *\"[view](#jsvviewobject)\"* object.\n\nViews provide information on how the underlying data objects map to the rendered UI.\n\n**From UI back to data:**\n\nUse `$.view(elemOrSelector)` to get from a DOM element to the corresponding `view` object for that part of the rendered content.\n\nFrom the `view` you can get to the underlying `data`, the `index`, etc."
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
            "text": "```jsr\n{^{for people}}\n  ...\n  <button class=\"changeBtn\">Change</button>\n  ...\n{{/for}}\n```\n\nClick-handler code for <em>Change</em> button:\n\n```js\n$(\".changeBtn\").on(\"click\", function() {\n  var view = $.view(this); // From the clicked HTML element ('this'), get the view object\n  var person = view.data;  // The 'person' data object for clicked button\n  var index = view.index;  // The index of this 'item view'. (Equals index of person in people array)\n  $.observable(person).setProperty(\"name\", person.name + \" \" + index); // Change the person.name\n});\n```"
          }
        ],
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  {^{for people}}\n    <tr>\n      <td>{^{:name}}</td>\n      <td>\n        <button class=\"changeBtn\">Change</button>\n      </td>\n    </tr>\n  {{/for}}\n</script>",
        "height": "100",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar app = {\n    people: [{name: \"Adriana\"}, {name: \"Robert\"}]\n  };\n\nmyTemplate.link(\"#peopleList\", app);\n\n$(\".changeBtn\").on(\"click\", function() {\n  // From the clicked HTML element ('this'), get the view object\n  var view = $.view(this);\n\n  // The 'person' data object for clicked button\n  var person = view.data;\n\n  // The index of this 'item view'. (Equals index of person in people array)\n  var index = view.index;\n\n  // Change the person.name\n  $.observable(person).setProperty(\"name\", person.name + \" \" + index);\n});",
        "title": "Getting to the data: $.view(elem)",
        "anchor": "$view"
      },
      {
        "_type": "para",
        "title": "Normal syntax:",
        "text": ""
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.view(elementOrSelector)",
        "name": "view",
        "object": "$",
        "method": true,
        "tag": false,
        "returns": "view object",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "elemOrSelector",
                "type": "HTML element or jQuery selector",
                "optional": false,
                "description": "The target element"
              }
            ],
            "sections": [],
            "example": "var view = $.view(\"#myElement\");",
            "description": "Get the contextual view object for an HTML element, or selector"
          }
        ],
        "description": "From an HTML element or a jQuery selector, get the corresponding contextual view object within the view hierarchy  ",
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
        "title": "Alternative syntax:",
        "text": "If you already have a jQuery object `$(elementOrSelector)`, then it can be convenient to use the following alternative syntax:\n\n```js\nvar view = $(elementOrSelector).view();\n```\n\nThis can be convenient in some scenarios, for example if you want to call another jQuery method on the same target element or selector, before getting the view. You can even chain the calls as in: `var view = $(elementOrSelector).doSomething().view();`\n"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$(elementOrSelector).view()",
        "name": "view",
        "object": "$(elementOrSelector)",
        "method": true,
        "returns": "view object",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [],
            "args": [],
            "sections": [],
            "example": "var view = $(\"#myElement\").view();",
            "description": "Get the contextual view object for an HTML element, or selector"
          }
        ],
        "description": "From an HTML element or a jQuery selector, get the corresponding contextual view object within the view hierarchy  ",
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
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsvviewobject",
            "label": "view object"
          }
        ]
      }
    ]
  },
  "jsv.db.view": {
    "title": "$(...).view()",
    "path": "",
    "sections": []
  },
  "jsvcompiletmpl": {
    "title": "$(...).view()",
    "path": "",
    "sections": []
  },
  "jsvregister": {
    "title": "Register helpers, converters, tags...",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvconverters",
            "label": "$.views.converters()"
          },
          {
            "hash": "jsvtags",
            "label": "$.views.tags()"
          },
          {
            "hash": "jsvhelpers",
            "label": "$.views.helpers()"
          }
        ]
      }
    ]
  },
  "jsvconverters": {
    "title": "$.views.converters()",
    "path": "",
    "sections": []
  },
  "jsvtemplatetags": {
    "title": "JsViews template tags",
    "path": "",
    "sections": []
  },
  "jsvhelpers": {
    "title": "$.views.helpers()",
    "path": "",
    "sections": []
  },
  "jsvtagcontrols": {
    "title": "JsViews: Custom Tags - Tag Controls",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "*Custom tag controls* used in *JsViews* apps are regular *JsRender* custom tags, defined/registered in the usual way (see *[Registering custom tags](#tags)*).\n\nHowever, in the context of JsViews data-linking they become stateful 'controls' (or 'widgets') -- self contained encapsulated components, with a life-cycle of instantiation, initialization, initial rendering, data-binding, updating (triggered by observable data changes), disposal...\n\n"
      }
    ]
  },
  "jsvobjects": {
    "title": "JsViews objects",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvviewsobject",
            "label": "$.views object"
          },
          {
            "hash": "jsvtemplateobject",
            "label": "template object"
          },
          {
            "hash": "jsvviewobject",
            "label": "view object"
          },
          {
            "hash": "jsvtagobject",
            "label": "tag object"
          },
          {
            "hash": "jsvviewcontextobject",
            "label": "View context object"
          },
          {
            "hash": "jsvtagcontextobject",
            "label": "Tag context object"
          },
          {
            "hash": "jsvlinkcontextobject",
            "label": "Link context object"
          }
        ]
      }
    ]
  },
  "jsvviewsobject": {
    "title": "$.views object",
    "path": "",
    "sections": []
  },
  "jsvtemplateobject": {
    "title": "template object",
    "path": "",
    "sections": []
  },
  "jsvviewobject": {
    "title": "The <em>view</em> object",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "When using JsViews (i.e. with the [`.link()`](#jsvlinktmpl) method rather than JsRender's [`.render()`](#rendertmpl) method) the [view hierarchy](#views) is the same.\n"
      },
      {
        "_type": "para",
        "title": "A <b>view object</b> has the following properties and methods:",
        "text": "**JsViews -- programmatic access only**\n\nThe following methods are available only for programmatic access when using JsViews:\n\n- [refresh() method](#jsvviewobject@refresh)\n- [contents() method](#jsvviewobject@contents)\n- [childTags() method](#jsvviewobject@childtags)\n- [nodes() method](#jsvviewobject@nodes)\n\n**Both JsRender and JsViews** (see [JsRender `view` object](#viewobject))\n\n*The following properties and methods are available when using either JsRender or JsViews:*\n\n- [type property](#viewobject@type)\n- [data property](#viewobject@data)\n- [parent property](#viewobject@parent)\n- [index property](#viewobject@index)\n- [getIndex() method](#viewobject@getIndex)\n- [get(type) method](#viewobject@get)\n- [content property](#viewobject@content)\n- [other properties (tmpl, views, ctx, tag)](#viewobject@other)\n"
      },
      {
        "_type": "para",
        "title": "Accessing view objects",
        "text": "The `view` object can be accessed *programmatically* in many contexts, such as:\n\n- in a click handler (with JsViews) -- using [`$.view(this)`](#jsv.d.view) to return the `view` for a given HTML element (`this`)\n- in a helper function, `~myHelper()` -- where the `this` pointer is the current view\n- in any method of a custom tag -- using `this.tagCtx.view`\n\nIn addition, properties and methods that are available to both JsRender and JsViews (second list above) can also be accessed *declaratively* in a template using *[view paths](#paths)* -- such as `#parent` for the `view.parent` property.\n<br/><br/>\n\n### Properties and methods:\n"
      },
      {
        "_type": "para",
        "title": "The refresh() method",
        "text": "***view.refresh()***: refreshes the view, by re-rendering its content.\n\nThis can be used to update content using modified data or updated helpers.\n\nIt can be useful for refreshing a view (template block) which renders data without data-linking: `{{:model.year}}` (or even with data-linking, `{^{:model.year}}` -- if the data has been modified *'non-observably'*, as in: `model.year++;`).\n\n```js\nview.refresh(); // Refresh the view, using current data values and helpers\n```",
        "anchor": "refresh"
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
            "title": "",
            "text": "*Template:* (No data-linking except `<input data-link=\"name\" />`)\n\n```jsr\n{{for people}}\n  ...\n  <input data-link=\"name\" />\n  ...\n  {{:name}} ... {{:~root.year}} ... {{:age + ~root.year - 2016}}\n  ...\n  <button class=\"refreshBtn\">Refresh</button>\n{{/for}}\n```\n\n*Code:*\n\n```js\n.on(\"click\", \"#incrBtn\", function() {\n  model.year++; // non-observable change\n})\n.on(\"click\", \".refreshBtn\", function() {\n  $.view(this).refresh(); // Refresh view, with updated values...\n});\n```"
          }
        ],
        "html": "<style>table td {padding: 5px;} table {margin-top: 6px;} #incrBtn {margin-bottom: 10px;}</style>\n\n<div id=\"peopleList\"></div>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <button id=\"incrBtn\">Increment year</button>\n  <button id=\"incrObsBtn\">Increment observably</button>\n  <button id=\"incrRefreshBtn\">Increment and refresh</button>\n  <button class=\"refreshBtn\">Refresh All</button><br/>\n  Year: {^{:year}}<br/>\n\n  <table><tbody>\n    {{for people}}\n      <tr>\n        <td><input data-link=\"name\" /></td>\n        <td>Name: {{:name}}</td>  {{!-- no data-linking --}}\n        <td>Age in {{:~root.year}}: {{:age + ~root.year - 2016}} </td>\n        <td><button class=\"refreshBtn\">Refresh</button></td>\n      </tr>\n    {{/for}}\n  </tbody></table>\n</script>",
        "code": "var tmpl = $.templates(\"#peopleTmpl\");\n\nvar model = {\n  year: 2016,\n  people: [{name: \"Adriana\", age: 4}, {name: \"Robert\", age: 34}]\n};\n\ntmpl.link(\"#peopleList\", model)\n  .on(\"click\", \"#incrBtn\", function() {\n    model.year++; // non-observable change\n  })\n  .on(\"click\", \"#incrObsBtn\", function() {\n    $.observable(model).setProperty(\"year\", model.year + 1);\n  })\n  .on(\"click\", \"#incrRefreshBtn\", function() {\n    model.year++; // non-observable change\n    $.view(this).refresh();\n  })\n  .on(\"click\", \".refreshBtn\", function() {\n    $.view(this).refresh();\n  });",
        "height": "160",
        "title": "view.refresh()"
      },
      {
        "_type": "para",
        "title": "The contents() method",
        "text": "***view.contents(...)***: returns a jQuery object of view content nodes -- optionally filtered by a jQuery selector.\n\n```js\nvar jqMyClassElem = view.contents(true, \".myClass\"); // jQuery object for element with 'myClass'at any depth within view\n```",
        "anchor": "contents"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "view.contents(...)",
        "name": "contents",
        "object": "view",
        "method": true,
        "returns": "jQuery object",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [],
            "args": [],
            "sections": [],
            "example": "var jqContents = view.contents();\njqContents.css(\"color\", \"red\");",
            "description": "Get a jQuery object for the contents of the view (top-level child nodes &ndash; including text nodes)"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "selector",
                "type": "string",
                "optional": true,
                "description": "jQuery selector, to filter content elements"
              }
            ],
            "args": [],
            "sections": [],
            "example": "var jqContents = view.contents(\".toRed\");\njqContents.css(\"color\", \"red\");",
            "description": "Get a jQuery object for the top-level contents of the view, filtered by the jQuery selector"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "deep",
                "type": "boolean",
                "optional": true,
                "description": "If true, search both children and descendants"
              },
              {
                "_type": "param",
                "name": "selector",
                "type": "string",
                "optional": true,
                "description": "jQuery selector, to filter content elements"
              }
            ],
            "args": [],
            "sections": [],
            "example": "var jqContents = view.contents(true, \".toRed\");\njqContents.css(\"color\", \"red\");",
            "description": "Get a jQuery object for the contents of the view: child and descendant nodes, filtered by the selector"
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
        "title": "",
        "text": "The following example uses `view.contents()` to find the `\".nameId\"` within the view, and set its background color:"
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
            "title": "",
            "text": "```js\n// Get jQuery object for \".nameTd\" in this view:\nvar jqNameTd = view.contents(true, \".nameTd\");\n\n// Set background color\njqNameTd.css(\"backgroundColor\", this.className);\n```"
          }
        ],
        "html": "<style>.nameTd {width: 60px; padding: 0 6px;} table {width: 230px;} button {margin: 4px;}</style>\n\n<div id=\"peopleList\"></div>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <button id=\"addBtn\">Add</button>\n  <table><tbody>\n    {^{for people}}\n      <tr>\n        <td class=\"nameTd\">{^{:name}}</td>\n        <td>\n          <button class=\"orange\">orange</button>\n          <button class=\"yellow\">yellow</button>\n        </td>\n      </tr>\n    {{/for}}\n  </tbody></table>\n</script>",
        "code": "var tmpl = $.templates(\"#peopleTmpl\");\n\nvar model = {\n  people: [{name: \"Adriana\"}, {name: \"Robert\"}]\n};\n\ntmpl.link(\"#peopleList\", model)\n  .on(\"click\", \"#addBtn\", function() {\n    var view = $.view(this);           // \"data\" view\n    var data = view.data;              // model\n    $.observable(data.people).insert({name: \"name\"});\n  })\n  .on(\"click\", \".orange, .yellow\", function() {\n    var view = $.view(this);           // \"item\" view\n\n    // Get jQuery object for \".nameTd\" in this view:\n    var jqNameTd = view.contents(true, \".nameTd\");\n\n    // Set background color\n    jqNameTd.css(\"backgroundColor\", this.className);\n  });",
        "title": "view.contents()"
      },
      {
        "_type": "para",
        "title": "The childTags() method",
        "text": "***view.childTags(...)***: returns an array of custom tag instances within the view -- optionally filtered by tag name.\n\n```js\nvar myTagsArray = view.childTags(true, \"myTag\"); // {{myTag}} instances within view (at any depth)\n```\n",
        "anchor": "childtags"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "view.childTags(...)",
        "name": "childTags",
        "object": "view",
        "method": true,
        "returns": "jQuery object",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [],
            "args": [],
            "sections": [],
            "example": "var tagsArray = view.childTags();\nvar firstTagName = tagsArray[0].tagName;",
            "description": "Get top-level custom tag instances within the view"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "tagName",
                "type": "string",
                "optional": true,
                "description": "Filter returned tag instances by tag name"
              }
            ],
            "args": [],
            "sections": [],
            "example": "var sliders = view.childTags(\"slider\");\nsliders[0].setValue(25);",
            "description": "Get instances of {{tagName}} in view (not nested in other custom tags)"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "deep",
                "type": "boolean",
                "optional": true,
                "description": "If true, search at any depth of nested tags"
              },
              {
                "_type": "param",
                "name": "tagName",
                "type": "string",
                "optional": true,
                "description": "Filter returned tag instances by tag name"
              }
            ],
            "args": [],
            "sections": [],
            "example": "var jqContents = view.childTags(true, \".toRed\");\njqContents.css(\"color\", \"red\");",
            "description": "Get instances of {{tagName}} in view (including those nested in other custom tags)"
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
        "title": "",
        "text": "Note that `view.childTags()` looks only for custom tags. (In fact it searches for tags which do not have the `flow` property set to `true`. All built in tags such as `{{for}}` and `{{if}}` have the setting `flow: true`, so are ignored by `childTags()`.)\n\nThe following sample looks for `{{textbox}}` tags (in the case `data-link=\"{textbox ...}\"`) and calls a method on each."
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
            "title": "",
            "text": "```jsr\n{^{for people}}\n  {{!--data-link to {{textbox}} tag --}}\n  <div class=\"person\" data-link=\"{textbox path=name/}\"></div> \n{{/for}}\n```\n\n```js\n.on(\"click\", \"#toggleBtn\", function() {\n  var textBoxes = $.view(this).childTags(\"textbox\"); // Find all the {{textbox}} tags in the view\n  for (var i=0; i<textBoxes.length; i++) {\n    textBoxes[i].toggleEdit();                       // Toggle the edit mode for each of them\n  }\n});\n```"
          }
        ],
        "html": "<style>#toggleBtn {margin-bottom: 14px;} .person {line-height: 26px;}</style>\n<div id=\"peopleList\"></div>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <button id=\"toggleBtn\">Toggle Edit</button>\n\n  {^{for people}}\n    {{!--data-link to {{textbox}} tag --}}\n    <div class=\"person\" data-link=\"{textbox path=name/}\"></div> \n  {{/for}}\n</script>",
        "code": "// Define a {{textbox}} tag - which allows editing, and has a toggleEdit() method\n$.views.tags({\n  textbox: {\n    init: function() {\n      var path = this.tagCtx.params.props.path;\n\n      this.template = \"<input data-link='~tag.edit' type='checkbox'/> \"   // Checkbox to toggle edit\n      + \"<input data-link='visible{:~tag.edit} {:\" + path + \":}'/>\"       // <input> for editing\n      + \"<span data-link='visible{:!~tag.edit} {:\" + path + \"}'></span>\"; // <span> for rendering\n    },\n    toggleEdit: function() {\n      $.observable(this).setProperty(\"edit\", !this.edit);\n    }\n  }\n});\n\nvar tmpl = $.templates(\"#peopleTmpl\");\nvar model = {\n    people: [{name: \"Adriana\"}, {name: \"Robert\"}]\n  };\n\ntmpl.link(\"#peopleList\", model)\n  .on(\"click\", \"#toggleBtn\", function() {\n    var textBoxes = $.view(this).childTags(\"textbox\"); // Find all the {{textbox}} tags in the view\n    for (var i=0; i<textBoxes.length; i++) {\n      textBoxes[i].toggleEdit();                       // Toggle the edit mode for each of them\n    }\n  });",
        "height": "120",
        "title": "view.childTags()"
      },
      {
        "_type": "para",
        "title": "The nodes() method",
        "text": "***view.nodes()***: returns an array of top-level nodes within the view (including text nodes).\n\n```js\nvar nodesArray = view.nodes();\n```",
        "anchor": "nodes"
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
            "title": "",
            "text": "```js\n.on(\"click\", \".orange, .yellow\", function() {\n  var view = $.view(this);           // \"item\" view\n\n  // Get top-level nodes in this view - two <tr> nodes:\n  var nodes = view.nodes();\n\n  // Set colors\n  nodes[0].style.color = this.className;\n  nodes[0].style.backgroundColor = \"darkblue\";\n  nodes[1].style.backgroundColor = this.className;\n});\n```"
          }
        ],
        "html": "<style>.nameTd {width: 60px; padding: 0 6px;} table {width: 156px;} button {margin: 4px;}</style>\n\n<div id=\"peopleList\"></div>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <button id=\"addBtn\">Add</button>\n  <table><tbody>\n    {^{for people}}\n      <tr>\n        <td class=\"nameTd\">{^{:name}}</td>\n      </tr>\n      <tr>\n        <td>\n          <button class=\"orange\">orange</button>\n          <button class=\"yellow\">yellow</button>\n        </td>\n      </tr>\n    {{/for}}\n  </tbody></table>\n</script>",
        "code": "var tmpl = $.templates(\"#peopleTmpl\");\n\nvar model = {\n  people: [{name: \"Adriana\"}, {name: \"Robert\"}]\n};\n\ntmpl.link(\"#peopleList\", model)\n  .on(\"click\", \"#addBtn\", function() {\n    var view = $.view(this);           // \"data\" view\n    var data = view.data;              // model\n    $.observable(data.people).insert({name: \"name\"});\n  })\n  .on(\"click\", \".orange, .yellow\", function() {\n    var view = $.view(this);           // \"item\" view\n\n    // Get top-level nodes in this view - two <tr> nodes:\n    var nodes = view.nodes();\n\n    // Set colors\n    nodes[0].style.color = this.className;\n    nodes[0].style.backgroundColor = \"darkblue\";\n    nodes[1].style.backgroundColor = this.className;\n  });",
        "height": "230",
        "title": "view.nodes()"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "viewobject",
            "label": "JsRender view object"
          },
          {
            "_type": "topic",
            "hash": "views",
            "label": "View hierarchy"
          }
        ]
      }
    ]
  },
  "jsvtagobject": {
    "title": "tag object",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "tag hierarchy"
      }
    ]
  },
  "jsvviewcontextobject": {
    "title": "View context object",
    "path": "",
    "sections": []
  },
  "jsvtagcontextobject": {
    "title": "Tag context object",
    "path": "",
    "sections": []
  },
  "jsvlinkcontextobject": {
    "title": "Link context object",
    "path": "",
    "sections": []
  },
  "linked-template-syntax": {
    "title": "Data-linked template syntax",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews data-link syntax takes two forms:\n\n- [Data-linked tags](#linked-tag-syntax)\n- [Data-linked elements](#linked-elem-syntax)\n\nBoth forms use:\n\n- [Data-linked paths](#linked-paths)"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "hash": "link2way",
            "label": "Two-way binding"
          },
          {
            "hash": "link-events",
            "label": "Event bindings"
          },
          {
            "hash": "jsvviews",
            "label": "View hierarchy"
          },
          {
            "_type": "topic",
            "hash": "jsvtags",
            "label": "JsViews template tags"
          },
          {
            "_type": "topic",
            "hash": "samples/data-link",
            "label": "Tutorial sequence of data-linking samples"
          },
          {
            "_type": "topic",
            "hash": "tmplsyntax",
            "label": "JsRender template syntax"
          }
        ]
      }
    ]
  },
  "linked-tag-syntax": {
    "title": "Data-linked tags",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "JsViews data-linked tags",
        "text": "A data-linked tag is like a regular JsRender tag (whether a built-in tag, or a custom tag) but has an additional `^` character to show that is data-linked. Let's illustrate that by an example based on the *[Extending the `{{for}}` tag](#samples/jsr/tags/extend-for)* sample:\n\n```jsr\n<ul>\n  {{for members}}\n    <li>\n      {{:name}}\n    </li>\n  {{/for}}\n</ul>\n\n<ul>\n  {{range members start=1 end=3}}\n    <li>\n      {{:name}}\n    </li>\n  {{/range}}\n</ul>\n```\n\nWe can data-link to the `members` -- whether on the built-in `{{for}}`, or the custom `{{range}}` tag -- like this:\n\n```jsr\n<ul>\n  {^{for members}}\n    <li>\n      {^{:name}}\n    </li>\n  {{/for}}\n</ul>\n```\n\n```jsr\n<ul>\n  {^{range members start=1 end=3}}\n    <li>\n      {^{:name}}\n    </li>\n  {{/range}}\n</ul>\n```\n\nNow if the `members` array changes, our rendered template content will automatically update to show the additional inserted (or removed) members in the list.\n\nHere is a live sample of the data-linked `{^{for}}` tag:"
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
            "title": "",
            "text": "*Template:*\n\n```jsr\n...\n{^{for members}}\n  <li>\n    {^{:name}} ...\n  </li>\n{{/for}}\n...\n```\n\n*Code:*\n\n```js\n...\n$.templates(\"#teamTemplate\").link(\"#team\", team) ...\n```"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <button id=\"add\">Add</button>\n  <ol>\n    {^{for members}}\n      <li>\n        {^{:name}} \n        <span class=\"remove\"></span>\n      </li>\n    {{/for}}\n  </ol>\n</script>\n",
        "code": "var team = {\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"}\n  ]\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team)\n  .on(\"click\", \".remove\", function() {\n    var view = $.view(this);\n    $.observable(team.members).remove(view.index);\n  })\n  .on(\"click\", \"#add\", function() {\n    $.observable(team.members).insert(0, {name: \"new\" + cnt++})\n  });",
        "height": "120"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice that we also added a `^` to the `{^{:name}}` tag. That means that if the value of the name field is changed ('observably') then the value will update automatically within the rendered template.\n\nAnd here is <a href=\"#samples/tag-controls/range\">a link to a complete sample</a> showing a data-linked `{^{range}}` tag. It lets you modify both the `members` list and the `name` properties, and see how they automatically trigger updates in other parts of the page which bind to the same data.\n\nJsViews is smart about how it updates the HTML. Generally it does so incrementally -- only modifying the affected part of the HTML by inserting or removing elements, or replacing values."
      },
      {
        "_type": "para",
        "title": "Binding to named properties of tags",
        "text": "In the sample we went one step further than shown above. We added data-linking to the `start` and `end` <em>named properties</em> of the `{{range}}` tag:\n\n```jsr\n{^{range members ^start=start-1 ^end=end}}\n```\n\nThe prefixed `^` on the name: `^start=...` is used to specify that the `start` 'named property' is to be data-linked (so the whole tag will render if the `start` value changes). Change the value (using the drop-down in the sample) and you see that the displayed range updates automatically.\n\nBy default named properties are not data-linked. (This is made 'opt-in' for perf optimization reasons.)",
        "anchor": "linkedproperties"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "- JsViews API topic: *[Data-linked elements](#linked-elem-syntax)*\n- Tutorial sequence of samples: [Data-linking tags and elements](#samples/data-link)\n"
      }
    ]
  },
  "linked-elem-syntax": {
    "title": "Data-linked elements",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "JsViews data-link expressions, and syntax",
        "text": "Data-linked elements are regular HTML elements which have been data-bound in the template by adding a <em>data-link</em> attribute.\n\nThey can be used within templated content, as in the following sample -- and they can also be used on top-level non-templated content in your page -- see *[Top-level data-linking](#toplink)*."
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
            "title": "A data-linked input element (two-way data-binding, update triggered on keydown)",
            "markup": "<input data-link=\"name\"/>"
          },
          {
            "_type": "template",
            "title": "Two-way data-binding (no update on keydown, only on blur)",
            "markup": "<input data-link=\"name trigger=false\"/>"
          },
          {
            "_type": "template",
            "title": "A data-linked span element (data binding to innerText &ndash; default target)",
            "markup": "<span data-link=\"name\"></span>"
          },
          {
            "_type": "template",
            "title": "A data-linked tag (renders as a text node, not an element...)",
            "markup": "{^{:name}}"
          },
          {
            "_type": "code",
            "title": "Code:",
            "code": "...\nvar template = $.templates(\"#theTmpl\");\ntemplate.link(\"#result\", data);\n"
          }
        ],
        "markup": "<input data-link=\"name\"/> <i>(Update on keydown)</i><br/>\n<input data-link=\"name trigger=false\"/> <i>(Update on blur)</i><br/>\n<span data-link=\"name\" class=\"spanbox\"></span>\n{^{:name}}\n",
        "data": {
          "name": "Jeff"
        },
        "onlyJsRender": false,
        "title": "Data-linked elements in templates",
        "height": "120"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice that the `<input data-link=\"name\">` tag automatically has <em>two-way data-binding</em>."
      },
      {
        "_type": "para",
        "title": "Abbreviated syntax and full syntax for data-linked elements",
        "text": "In fact the examples of data-linked elements above correspond to simple cases, where you can use abbreviated syntax. For more powerful or complex data-linking to elements, you can use the full syntax.",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "Abbreviated syntax is just a data-path or expression that you are binding to:",
        "text": "```jsr\n<span data-link=\"pathOrExpression\"></span>\n```\n\nFor example:\n\n```jsr\n<span data-link=\"name\"></span>\n<span data-link=\"address.street\"></span>\n<span data-link=\"~someHelper.computed() > 1\"></span>\n```",
        "anchor": "abbrev"
      },
      {
        "_type": "para",
        "title": "The corresponding full syntax is a data-linked <code>{{: ...}}</code> tag",
        "text": "In fact it is short for this full syntax:\n\n```jsr\n<span data-link=\"{:pathOrExpression}\"></span>\n```\n\n-- which is a data-linked version of the familiar JsRender tag: <em><a href=\"#assigntag\">`{{:pathOrExpression}}`</a></em>. \n\nExamples:\n\n```jsr\n<span data-link=\"{:name}\"></span>\n<span data-link=\"{:address.street}\"></span>\n<span data-link=\"{:~someHelper.computed() > 1}\"></span>\n\n<input data-link=\"{:name:}\"/>\n<input data-link=\"{:name trigger=false:}\"/>\n```"
      },
      {
        "_type": "para",
        "title": "Optional two-way data-binding",
        "text": "Notice the full syntax for the `<input>` has an additional `:` before the `}` at the end. It corresponds to the two-way data binding. (The same applies to other *'user input elements'* such as `select`, `textarea` etc. (and also *[contenteditable elements](#)*). \n\nYou can provide both convert and convertBack converters if you want. (See the *[Two-way binding and converters](#samples/form-els/converters)* sample):\n\n```jsr\n<input data-link=\"{myConverter:some.data.path:myConvertBack}\"/>\n\n<select data-link=\"{myConverter:some.data.path:myConvertBack}\">...</select>\n```\n\nIf you want only one-way binding (from the data to the `<input>`) you simply eliminate the `:` at the end:\n\n```jsr\n<input data-link=\"{:some.data.path}\"/>\n```\n\nSee the *[Two-way binding](#link2way)* topic for additional details.",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "Full syntax - multiple targets, multiple tags, multiple bindings...",
        "text": "The full syntax allows you to bind multiple expressions each to a different target 'attrib', and is written like this: `data-link=\"attrib1{linkExpression1} attrib2{linkExpression2} ...\"`.\n\n`attrib` corresponds to the target -- such as the following:\n- HTML attribute (such as <code>title{...}</code>, <code>class{...}</code>, <code>id{...}</code>, <code>disabled{...}</code> or <code>data-foo{...}</code>)\n- CSS property (such as <code>css-background-color{...}</code>)\n- innerHTML (as in <code>html{...}</code>)\n- innerText (as in <code>text{...}</code>)\n- special targets like <code>visible{...}</code>\n- or can be missing altogether (as in <code>{...}</code>) in which case it stands for the default target for the element.\n\nThe default target for most elements is `innerText`, but for `input` and `select` elements it is `value`.\n\nThe linkExpression `{...}` is actually a *template tag*, such as `{{:a.b.c}}` or `{{myCustomTag .../}}`. *The difference from regular JsRender tag syntax is that with data-link expressions, **you only put a single curly brace to delimit, and you don't put the self-closing `/`**, which is assumed*.\n\nIn fact as long as the tag is self-closing, you can use any JsRender tag you want -- including custom tags.\n\nFor example, if you have a JsRender tag as content of an element: \n\n```jsr\n<div>{{for some.path tmpl='myForTmpl'}}</div>\n```\n\n-- then you can make it into a data-linked tag, using:\n\n```jsr\n<div>{^{for some.path tmpl='myForTmpl'}}</div>\n```\n\n-- or into a data-linked element, using:\n\n```jsr\n<div data-link=\"{for some.path tmpl='myForTmpl'}\" ></div>\n```\n\nSo examples would be: \n\n- `<div data-link=\"{:name}\"></div>` (one-way binding to `innerText` -- default target attrib -- so automatically HTML encodes).\n- `<div data-link=\"html{:name}\"></div>` (one-way binding to `innerHTML`)\n- `<div data-link=\"text{:name}\"></div>` (one-way binding to `innerText` -- equivalent to default above)\n- `<div data-link=\"html{>name}\"></div>` (one-way binding to `innerHTML` but with HTML encoding)\n- `<input data-link=\"{:name}\" >` (one-way binding to `value` -- default target attrib)\n- `<input data-link=\"value{:name}\" />` (one-way binding to `value`)\n- `<input data-link=\"title{:name}\" />` (one-way binding to the `title` attribute)\n- `<input data-link=\"{:name trigger=false:}\" />` (two-way binding to `value`, trigger only on blur) <br/>-- equivalent to abbreviated syntax: `<input data-link=\"name trigger=false\" />`\n- `<input data-link=\"{cvt:name:cvtBack}\" />` (two-way binding to `value`, with converters)\n- `<input data-link=\"{cvt:name trigger=false:cvtBack}\" />` (two-way binding to `value`, with converters, and trigger only on blur)\n- `<input data-link=\"{cvt:name:cvtBack} title{:info.description}\" />` (two-way binding to `value`, with converters and one-way binding to `title`)\n- `<img data-link=\"src{:'/myImagesFolder/' + fileName + '.png'}\" />` (one-way binding to `src` -- using an expression to build full path)\n- `<div data-link=\"{myCustomTag name}\"></div>` (data-linking -- and instantiating -- a JsViews custom tag control. Renders as `innerHTML` -- default target attrib for tags other than {: ...} -- so the control can insert HTML markup)\n- `<div data-link=\"text{myCustomTag name}\"></div>` (data-linking a JsViews custom tag control -- rendering as `innerText` -- so automatically HTML encodes)\n- `<svg><ellipse data-link=\"cx{:x} fill{:color}\"></ellipse>` (data-linking to attributes of an SVG element)",
        "anchor": "fullsyntax"
      },
      {
        "_type": "para",
        "title": "When do you use the abbreviated syntax?",
        "text": "The abbreviated syntax is an alternative syntax when you only have a single expression of the form `{:someExpression}`, or in the case of inputs `{:someExpression:}` (two-way binding). So it is using the default target attrib, and is targeting `innerText`, and automatically doing HTML encoding. In that case you can remove the `{}` delimiters and colons and just write the `someExpression`. JsViews will expand your expression to the full syntax. Example: `data-link=\"name\"`.\n\nSo if you need any of the following, you need to switch to the full format:\n- insertion of HTML markup as `innerHTML`: (switch to `html{:someExpression}`)\n- converters\n- different target 'attribs'\n- multiple bindings\n- using tags other than `{{: ...}}`\n"
      },
      {
        "_type": "para",
        "title": "Data-linking expressions using block tags, such as {{for}} - including {{else}} blocks.",
        "text": "As mentioned above, you can data-link to block tags, as long as you register the block content as a separate template, referenced using `tmpl=...`:\n\n```jsr\n<div data-link=\"{for employees tmpl='nameTmpl'}\">\n```\n\nYou can also data-link to block tags that include `{{else}}` blocks, such as:\n\n```jsr\n<div data-link=\"{if someExpression tmpl='isTrueTmpl'}{else tmpl='isFalseTmpl'}\" ></div>\n```\n\n***Example***:"
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
            "title": "Top-level data-linking to {if ...}{else ...}",
            "text": "```jsr\n<input data-link=\"show\" type=\"checkbox\"/>Show\n<div data-link=\"{if show tmpl='show this'}{else tmpl='no show'}\"></div>\n```\n\n```js\n$.link(true, \"body\", {show: true});\n```"
          }
        ],
        "html": "<label><input data-link=\"show\" type=\"checkbox\"/> Show</label>\n<div data-link=\"{if show tmpl='show this'}{else tmpl='no show'}\"></div>\n",
        "code": "$.link(true, \"body\", {show: true});\n\n",
        "height": "70",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Data-linking expressions using tag controls",
        "text": "An important case of data-linking is binding and instantiating of custom tag controls, such as:\n\n```jsr\n<div data-link=\"{slider size _range='min' ...}\"></div>\n```\n\nSee the [tag control samples](#samples/tag-controls). Note that this works not only within data-linked templates, but also  when linking to top-level content -- as shown in the second variant of the [slider sample](#samples/tag-controls/slider/simple@toplink). \n\nAnother example might be a *tabs* control where the `{{else}}` blocks are the contents of the different tabs:\n\n```jsr\n<div data-link=\"{tabs ... tmpl='tab1'}{else ... tmpl='tab2'}{else ... tmpl='tab3'}\"></div>\n```\n\n***Example***:\n"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/tabs/tabs.js",
            "label": "tabs.js"
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
            "_type": "para",
            "title": "",
            "text": "Using data-linking to instantiate a *tabs* control on a top-level page element: \n\n```jsr\n<div id=\"tabsView\" data-link=\"\n  {tabs tabCaption='days' tmpl='tab1' selectedIndex=2}\n  {else tabCaption='months' tmpl='tab2'}\n  {else tabCaption='name' tmpl='tab3'}\n\"></div>\n```\n\n```js\n$.templates({\n  tab1: \"365 days per year\",\n  ...\n  tab3: \"Name: {{:name}}\"\n});\n\n$(\"#tabsView\").link(true, {name: \"Jeff\"});\n```"
          }
        ],
        "markup": "",
        "html": "<link href=\"../download/sample-tag-controls/tabs/tabs.css\" rel=\"stylesheet\">\n<script src=\"../download/sample-tag-controls/tabs/tabs.js\"></script>\n\n<div id=\"tabsView\" data-link=\"\n{tabs tabCaption='days' tmpl='tab1' selectedIndex=2}\n{else tabCaption='months' tmpl='tab2'}\n{else tabCaption='name' tmpl='tab3'}\n\"></div>",
        "code": "$.templates({\n  tab1: \"365 days per year\",\n  tab2: \"12 months per year\",\n  tab3: \"Name: {{:name}}\"\n});\n\n$(\"#tabsView\").link(true, {name: \"Jeff\"});\n",
        "height": "90",
        "title": "A top-level data-linked tabs control"
      },
      {
        "_type": "para",
        "title": "Samples of data-linking:",
        "text": "- There are many samples showing data-linking under [JsViews Samples](#samples/jsv).\n- See in particular this [tutorial sequence on data-linking](#samples/data-link)\n"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "- JsViews API topic: *[Data-linked tags](#linked-tag-syntax)*\n"
      }
    ]
  },
  "toplink": {
    "title": "Top-level data-linking",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "You can use data-linking not only for templated content, but also to data-bind to top-level HTML content in your page. Data-link expressions can be applied to top-level elements either declaratively, or programmatically:",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "Top-level declarative data-linking",
        "text": "Use:\n\n```js\n$.link(true, target, data);\n//or alternative syntax:\n$(target).link(true, data);\n```\n\n... to activate any declarative data-link bindings (`data-link=\"...\"` expressions) on the target element, or on elements within its content.\n\nSee: *[Top-level declarative data-linking](#jsv.toplink-true)*."
      },
      {
        "_type": "para",
        "title": "Top-level programmatic data-linking",
        "text": "Use:\n\n```js\n$.link(expression, target, data);\n//or alternative syntax:\n$(target).link(expression, data);\n```\n\n... to bind a data-link expression on a target element.\n\nSee *[Top-level programmatic data-linking](#jsv.toplink-expr)*."
      }
    ]
  },
  "jsv.toplink-true": {
    "title": "Top-level declarative data-linking",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "You can use data-linking not only for templated content, but also to data-bind to top-level HTML content in your page...  \n\nThe `$.link(true, ...)` method is used to activate top-level declarative data-binding, which can provide dynamic data-driven UI even on non-templated content.\n\nSimply add declarative data-binding expressions to top-level elements, using `data-link=\"...\"`, then call:\n\n```js\n$.link(true, target, data, helpers);\n```\n\n-- where `target` is a top-level HTML element or jQuery selector, such as `\"#target\"`. This will activate data-binding on the target element and on any elements within its content.\n\nYou can also use the alternative syntax (jQuery instance method):\n\n```js\n$(target).link(true, data, helpers);\n```",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "Declarative data-link expressions",
        "text": "[Data-link expressions](#linked-elem-syntax) can be quite rich, such as the following examples taken from the [sample below](#jsv.toplink-true@toplinksample):\n\n```jsr\n<div data-link=\"css-color{:isCEO ? 'green' : 'black'}\">\n<div data-link=\"{for employees tmpl='nameTmpl'}\"></div>\n```\n\nData-link expressions can also be used to instantiate and data-bind custom tag controls, such as the slider, in the [second sample](#jsv.toplink-true@toplinkslidersample) below:\n\n```jsr\n<div data-link=\"{slider size _range='min' _min=1 _max=200 width=400}\"></div>\n```"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.link(true, target, data, helpers)",
        "name": "link",
        "object": "$",
        "method": true,
        "tag": false,
        "returns": "jQuery object for target element",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "true",
                "type": "boolean - value: true",
                "optional": false,
                "description": "Set to true, to activate declarative data-link bindings"
              },
              {
                "_type": "param",
                "name": "target",
                "type": "HTML element or jQuery selector",
                "optional": false,
                "description": "The target element, under which to activate declarative data-link bindings"
              },
              {
                "_type": "param",
                "name": "data",
                "type": "object or array",
                "optional": true,
                "description": "The data context for the binding. (Any JavaScript type, including Array or Object.)"
              },
              {
                "_type": "param",
                "name": "helpers",
                "type": "object",
                "optional": true,
                "description": "Contextual helper methods or properties &ndash; available to data-link expressions as <code>~keyName</code>"
              }
            ],
            "sections": [],
            "example": "$.link(true, \"#target\", myData, myHelpers);",
            "description": "Activate data-linking on target element and its content, using data as context, and passing in helpers"
          }
        ],
        "description": "Activate any data-link bindings on target element or its content elements, using data as context, and optionally passing in helpers",
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
        "title": "$(target).link(true, data, helpers) <span style=\"font-weight:normal;font-family:sans-serif\">(alternative syntax)</span>",
        "name": "link",
        "object": "$(target)",
        "method": true,
        "tag": false,
        "returns": "jQuery object for target element",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "true",
                "type": "boolean - value: true",
                "optional": false,
                "description": "Set to true, to activate declarative data-link bindings"
              },
              {
                "_type": "param",
                "name": "data",
                "type": "object or array",
                "optional": true,
                "description": "The data context for the binding. (Any JavaScript type, including Array or Object.)"
              },
              {
                "_type": "param",
                "name": "helpers",
                "type": "object",
                "optional": true,
                "description": "Contextual helper methods or properties &ndash; available to data-link expressions as <code>~keyName</code>"
              }
            ],
            "sections": [],
            "example": "$(\"#target\").link(true, myData, myHelpers);",
            "description": "Activate data-linking on target element and its content, using data as context, and passing in helpers"
          }
        ],
        "description": "Activate any data-link bindings on target element or its content elements, using data as context, and optionally passing in helpers",
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
        "text": "Here is an example:"
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
            "title": "",
            "text": "Top-level content:\n\n```jsr\n<div id=\"group\">\n  <input type=\"checkbox\" />\n  ...\n```\n\nAdd two-way data-linking to `<input>`s\n\n```jsr\n<input data-link=\"isCEO\" type=\"checkbox\" />...\n<input data-link=\"first\" />...\n```\n\nAdd data-linking to `<div>`s and `<span>`s etc.\n\n```jsr\n<div id=\"group\" data-link=\"css-color{:isCEO ? 'red' : 'blue'}\">...\n<div data-link=\"{for employees tmpl='nameTmpl'}\">...\n```\n\nActivate, using `$.link(true, ...)`\n\n```js\n$.link(true, \"#group\", person, helpers);\n```\n\n(Could have used alternative syntax: `$(\"#group\").link(true, person, helpers);`)"
          }
        ],
        "html": "<style>input {margin-bottom:10px;}</style>\n\n<div id=\"group\" data-link=\"css-color{:isCEO ? 'green' : 'blue'}\">\n  <input data-link=\"first\" />\n  <input data-link=\"last\" />\n  <label><input data-link=\"isCEO\" type=\"checkbox\" /> CEO</label><br/>\n\n  <span data-link=\"~nameLabel + first + ' ' + last\" ></span>\n  <b data-link=\"visible{:isCEO}\">and I am CEO!</b>\n\n  <div data-link=\"visible{:isCEO}\"><br/>\n    <b>Employees:</b>\n    <div data-link=\"{for employees tmpl='nameTmpl'}\"></div> \n  </div>\n</div>\n",
        "code": "$.templates(\"nameTmpl\", \"<div>Name: {{:first}} {{:last}}</div>\");\n\nvar person = {\n  first: \"Jim\",\n  last: \"Rudd\",\n  employees: [\n    {first: \"Mary\", last: \"A\"},\n    {first: \"Hank\", last: \"B\"}\n  ]};\n\nvar helpers = {nameLabel: \"My name is \"};\n\n$.link(true, \"#group\", person, helpers);",
        "height": "136",
        "title": "Top-level declarative data-linking",
        "anchor": "toplinksample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is another example, taken from the [slider control](#samples/tag-controls/slider/simple@toplink) in the [tag control samples](#samples/tag-controls), which uses top-level data-linking with `data-link=\"{slider ...}\"` to instantiate and data-bind a JsViews `{{slider}}` control. "
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/jsviews-jqueryui-widgets.js",
            "label": "jsviews-jqueryui-widgets"
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
            "_type": "para",
            "title": "Slider with initialized properties (top-level data-linking)",
            "text": "```jsr\n<div data-link=\"{slider size _range='min' _min=1 max=200 _orientation='vertical' width=400}\"></div>\n```"
          },
          {
            "_type": "template",
            "title": "Data-linking to SVG content",
            "markup": "<svg data-link=\"css-width{: 2 + size*2}\" class=\"svg-circles\">\n  <circle data-link=\"r{:size} cx{:size + 1}\" ...></circle>\n  ...\n</svg>"
          },
          {
            "_type": "code",
            "title": "Activate data-linking ",
            "code": "$.link(true, \"body\", model);"
          }
        ],
        "sampleName": "tag-controls/slider/simple-toplevel",
        "url": "samples/tag-controls/slider/simple-toplevel/sample",
        "height": "370",
        "title": "Top-level data-link=\"{slider ...}\"",
        "anchor": "toplinkslidersample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Other interesting top-level data-linking samples are\n\n- [this version](#samples/editable/toplevel-for) of the [editable data samples](#samples/editable)\n- the [shopping cart](#samples/computed/shopping-cart@top-level) sample (top-level data-linking version)\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsv.toplink-expr",
            "label": "Top-level programmatic data-linking"
          },
          {
            "_type": "topic",
            "hash": "linked-elem-syntax",
            "label": "Data-linked elements"
          }
        ]
      }
    ]
  },
  "jsv.toplink-expr": {
    "title": "Top-level programmatic data-linking",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "You can use data-linking not only for templated content, but also to data-bind to top-level HTML content in your page...  \n\nThe `$.link(expression, ...)` method is used to programmatically add a data-link expression binding to a target element:\n\n```js\n$.link(dataLinkExpression, target, data, helpers);\n```\n\nwhere `dataLinkExpression` can be any [data-link expression]() that you might have used declaratively with `data-link=\"myExpression...\"`, and `target` is the HTML element (or jQuery selector, such as `\"#target\"`) that you want to data-bind.\n\nYou can also use the alternative syntax (jQuery instance method):\n\n```js\n$(target).link(dataLinkExpression, data, helpers);\n```"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.link(expression, target, data, helpers)",
        "name": "link",
        "object": "$",
        "method": true,
        "tag": false,
        "returns": "jQuery object for target element",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "expression",
                "type": "string",
                "optional": false,
                "description": "Data-link binding expression"
              },
              {
                "_type": "param",
                "name": "target",
                "type": "HTML element or jQuery selector",
                "optional": false,
                "description": "The target element, on which to activate the data-link binding expression"
              },
              {
                "_type": "param",
                "name": "data",
                "type": "object or array",
                "optional": true,
                "description": "The data context for the binding. (Any JavaScript type, including Array or Object.)"
              },
              {
                "_type": "param",
                "name": "helpers",
                "type": "object",
                "optional": true,
                "description": "Contextual helper methods or properties &ndash; available to data-link expression as <code>~keyName</code>"
              }
            ],
            "sections": [],
            "example": "$.link(myExpression, \"#target\", myData, myHelpers);",
            "description": "Activate data-linking on target element, using provided expression, with data as context, and passing in helpers"
          }
        ],
        "description": "Apply data-link binding expression to target element, using data as context, and optionally passing in helpers",
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
        "title": "$(target).link(expression, data, helpers) <span style=\"font-weight:normal;font-family:sans-serif\">(alternative syntax)</span>",
        "name": "link",
        "object": "$(target)",
        "method": true,
        "tag": false,
        "returns": "jQuery object for target element",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "expression",
                "type": "string",
                "optional": false,
                "description": "Data-link binding expression"
              },
              {
                "_type": "param",
                "name": "data",
                "type": "object or array",
                "optional": true,
                "description": "The data context for the binding. (Any JavaScript type, including Array or Object.)"
              },
              {
                "_type": "param",
                "name": "helpers",
                "type": "object",
                "optional": true,
                "description": "Contextual helper methods or properties &ndash; available to data-link expressions as <code>~keyName</code>"
              }
            ],
            "sections": [],
            "example": "$(\"#target\").link(myExpression, myData, myHelpers);",
            "description": "Activate data-linking on target element, using provided expression, with data as context, and passing in helpers"
          }
        ],
        "description": "Apply data-link binding expression to target element, using data as context, and optionally passing in helpers",
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
        "text": "Here is an example:"
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
            "title": "",
            "text": "Apply data-link expression to `<input>`, for two-way binding to `isCEO` data property:\n\n```js\n$.link(\n  \"isCEO\", // expression\n  \"input.ceo\", // target\n  person // data\n);\n```\n\nApply `{for...}` and `visible:{:...}` data-link binding expressions to `#employees` `<div>`:\n\n```js\n$.link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  \"#employees\", // target\n  person // data\n);\n```"
          }
        ],
        "html": "<div id=\"group\"> \n  <label><input class=\"ceo\" type=\"checkbox\"/> CEO</label>\n  <span id=\"notCeo\"></span><br/><br/>\n\n  <b>Employees:</b> \n\n  <div id=\"employees\"></div> \n</div>\n",
        "code": "$.templates(\"nameTmpl\", \"<div>Name: {{:first}} {{:last}}</div>\");\n\nvar person = {\n  isCEO: true,\n  employees: [\n    {first: \"Mary\", last: \"A\"},\n    {first: \"Hank\", last: \"B\"}\n  ]};\n\n$.link(\n  \"css-color{:isCEO ? 'green' : 'blue'}\", // expression\n  \"#group\", // target\n  person // data\n);\n\n$.link(\n  \"isCEO\", // expression\n  \"input.ceo\", // target\n  person // data\n);\n\n$.link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  \"#employees\", // target\n  person // data\n);\n\n$.link(\n  \"visible{:!isCEO} {:~message}\", // expression\n \"#notCeo\", // target\n  person, // data \n  {message: \"(Not CEO!)\"} // helpers\n);\n",
        "height": "108",
        "title": "Top-level programmatic data-linking"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the same example, using the alternative syntax: `$(target).link(expression, data, helpers);`"
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
            "title": "",
            "text": "Apply data-link expression to `<input>`, for two-way binding to `isCEO` data property:\n\n```js\n$(\"input.ceo\").link(\n  \"isCEO\", // expression\n  person // data\n);\n```\n\nApply `{for...}` and `visible:{:...}` data-link binding expressions to `#employees` `<div>`:\n\n```js\n$(\"#employees\").link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  person // data\n);\n```"
          }
        ],
        "html": "<div id=\"group\"> \n  <label><input class=\"ceo\" type=\"checkbox\"/> CEO</label>\n  <span id=\"notCeo\"></span><br/><br/>\n\n  <b>Employees:</b> \n\n  <div id=\"employees\"></div> \n</div>\n",
        "code": "$.templates(\"nameTmpl\", \"<div>Name: {{:first}} {{:last}}</div>\");\n\nvar person = {\n  isCEO: true,\n  employees: [\n    {first: \"Mary\", last: \"A\"},\n    {first: \"Hank\", last: \"B\"}\n  ]};\n\n$(\"#group\").link(\n  \"css-color{:isCEO ? 'green' : 'blue'}\", // expression\n  person // data\n);\n\n$(\"input.ceo\").link(\n  \"isCEO\", // expression\n  person // data\n);\n\n$(\"#employees\").link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  person // data\n);\n\n$(\"#notCeo\").link(\n  \"visible{:!isCEO} {:~message}\", // expression\n  person, // data \n  {message: \"(Not CEO!)\"} // helpers\n);\n",
        "height": "108",
        "title": "Top-level programmatic data-linking <span style=\"font-style:normal;\">(alternative syntax)</span>",
        "markup": ""
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsv.toplink-true",
            "label": "Top-level declarative data-linking"
          },
          {
            "_type": "topic",
            "hash": "linked-elem-syntax",
            "label": "Data-linked elements"
          }
        ]
      }
    ]
  },
  "link2way": {
    "title": "Two-way binding",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews provides two-way binding on:\n\n- [textboxes](#link-input@textbox) (`<input/>` type: *'text'*)\n- [checkboxes](#link-input@checkbox) (`<input/>` type: *'checkbox'*)\n- [radio buttons](#link-input@radio)  (`<input/>` type: *'radio'*)\n- [select elements](#link-select)\n- [textareas](#link-textarea)\n- [contenteditable elements](#link-contenteditable)\n- In addition, custom tags can support two-way binding\n\n*Two-way binding* consists of:\n- a *from* binding: -- whenever the underlying data changes (observably) the displayed value will update\n- a *to* binding: -- when the user modifies the value, this will trigger an observable change in the underlying data\n\nOn two-way binding you can also specify:\n\n- [*convert* and *convert back*](#link2way@converters) converters\n- *[trigger](#link2way@trigger)* on *change* or on *keydown*\n- using a different *[linkTo](#link2way@linkto)* target\n"
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
            "title": "",
            "text": "```jsr\n<input data-link=\"name\"/>\n```\n\n```jsr\n<label><input data-link=\"{toBool:gender:toString}\" type=\"checkbox\" /> Male</label>\n```\n\n```jsr\n<label><input data-link=\"gender\" value=\"male\" type=\"radio\" name=\"gender\" /> Male</label>\n<label><input data-link=\"gender\" value=\"female\" type=\"radio\" name=\"gender\" /> Female</label>\n```\n\n```jsr\n<select data-link=\"gender\">\n  <option value=\"male\">Male</option>\n  <option value=\"female\">Female</option>\n</select>\n```\n\n```jsr\n<textarea data-link=\"name\"></textarea>\n```\n\n```jsr\n<span data-link=\"name\" contenteditable=\"true\"></span>\n```\n\n```jsr\n{^{textbox name/}}\n```"
          }
        ],
        "html": "<style>\n  [contenteditable] {border:1px solid green; padding:5px;}\n  .block {display: block; margin-bottom: 10px} .green {color: green;}\n</style>\n\n<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"name\" class=\"block\"/>\n\n  <label class=\"block\"><input data-link=\"{toBool:gender:toString}\" type=\"checkbox\" /> Male</label>\n\n  <div class=\"block\">\n    <label><input data-link=\"gender\" value=\"male\" type=\"radio\" name=\"gender\" /> Male</label><br/>\n    <label><input data-link=\"gender\" value=\"female\" type=\"radio\" name=\"gender\" /> Female</label>\n  </div>\n\n  <select data-link=\"gender\" class=\"block\">\n    <option value=\"male\">Male</option>\n    <option value=\"female\">Female</option>\n  </select>\n\n  <textarea data-link=\"name\" class=\"block\"></textarea>\n\n  <div class=\"block\">\n    <span data-link=\"name\" contenteditable=\"true\"></span>\n  </div>\n\n  <div class=\"block\">\n    {^{textbox name label=\"Name:\"/}}\n  </div>\n\n  <hr/>\n\n  <div class=\"green\"><b>person:</b> {^{>name}} {^{>gender}}</div>\n</script>",
        "code": "$.views.settings.trigger(true);\n\n$.views.converters({\n  toString: function(val) {\n   return val ? 'male' : 'female';\n  },\n  toBool: function(val) {\n    return val === 'male';\n }\n});\n\n$.views.tags({\n  textbox: {\n    onAfterLink: function() {\n      // Find input in contents, if not already found\n      this.linkedElem = this.linkedElem || this.contents(\"input\");\n    },\n    onUpdate: function() {\n      // No need to re-render whole tag, when content updates.\n      return false;\n    },\n    template: \"<em>{{:~tag.tagCtx.props.label}}</em> <input/>\"\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo\", gender: \"male\"};\n\ntmpl.link(\"#result\", person);\n",
        "height": "346",
        "title": "Two way binding"
      },
      {
        "_type": "para",
        "title": "Abbreviated syntax and full syntax for data-link",
        "text": "Notice that on the above elements, the `data-link=\"name\"` syntax automatically has <em>two-way data-binding</em>.\n\nThe full syntax for two-way binding is `data-link=\"{:name:}\"`. See *[Data-linked elements](#linked-elem-syntax)* for syntax details.\n\n***Note:*** To specify *one-way binding* only, use the full syntax, but *without the final colon*: `data-link=\"{:name}`."
      },
      {
        "_type": "para",
        "title": "Converters: convert and convert back ",
        "text": "With two way bindings, you can use a [converter](#converters) for each direction (*from/to*) of the binding: *convert* for converting *from* data to the rendered value, and *convert back* for converting from the user input *back to* the data.\n\nIn the sample above the *checkbox* example is using converters. Without converters the *checkbox* binds to a *Boolean* data value. Here, converters allow it to bind instead to `gender` which is a string with values `\"male\"`/`\"female\"`:\n\n```jsr\n<input data-link=\"{toBool:gender:toString}\" type=\"checkbox\" />\n```\n\nThe alternative syntax for using [converters on other tags](#converters@othertags) also extends to *convert back* - so you can write:\n \n```jsr\ndata-link=\"... convert=... convertBack=...\n```\n\nYou can set *convert* and *convertBack* to a converter name, or a function such as a helper or data method. Here is a modified version of the previous sample, using the `convertBack-=...` syntax, in this case set to helper functions:",
        "anchor": "converters"
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
            "title": "",
            "text": "```jsr\n<input data-link=\"gender convert=~toBool convertBack=~toString\" type=\"checkbox\" />\n``` "
          }
        ],
        "html": "<style>.block {display: block; margin-bottom: 10px} .green {color: green;}</style>\n\n<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <label class=\"block\">\n  <input data-link=\"gender convert=~toBool convertBack=~toString\" type=\"checkbox\" />\n  Male</label>\n\n  <div class=\"block\">\n    <label><input data-link=\"gender\" value=\"male\" type=\"radio\" name=\"gender\" /> Male</label><br/>\n    <label><input data-link=\"gender\" value=\"female\" type=\"radio\" name=\"gender\" /> Female</label>\n  </div>\n\n  <hr/>\n\n  <div class=\"green\">{^{>gender}}</div>\n</script>",
        "code": "var helpers = {\n  toString: function(val) {\n   return val ? 'male' : 'female';\n  },\n  toBool: function(val) {\n    return val === 'male';\n }\n};\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {gender: \"male\"};\n\ntmpl.link(\"#result\", person, helpers);\n",
        "title": "Two-way binding &ndash; using helpers as converters",
        "height": "140"
      },
      {
        "_type": "para",
        "title": "Triggering the two-way binding on <b>blur</b>, rather than on <b>keydown</b>",
        "text": "In the case of *[text boxes](#link-input@textbox)* (or any other two-way data-linked element that takes character entry such as the *[textarea](#link-textarea)*, *[contenteditable](#link-contenteditable)* and some *custom tags* like as the `{^{textbox}}` example above), you can choose when the *to* binding updates the underlying data:\n\n- With `trigger=true` (default setting), changes to the underlying data are triggered as you type (on character entry -- the *keydown* event)\n- With `trigger=false`, changes to the underlying data are made on leaving the text box (the *change* or *blur* event)\n\nThe *trigger* setting can be modified:\n\n- globally, by using: [$.views.settings.trigger(...)](#jsvsettings/trigger):\n  ```jsr\n  $.views.settings.trigger(false); \n  ```\n- on each tag or element by writing:\n  ```jsr\n  <input data-link=\"name trigger=false\"/> \n  {^{textbox name trigger=false}}\n  ```\n\nIn fact you can also set `trigger` to a string with one or more white-space separated event names, such as: \n\n```jsr\n<input data-link=\"name trigger='keyup mouseup'\"/>`\n```\n\n-- but generally only the values ***true*** (actually equivalent to `trigger='keydown'`) and ***false*** are useful.",
        "anchor": "trigger"
      },
      {
        "_type": "para",
        "title": "linkTo: Linking from/to different underlying data",
        "text": "It can sometimes be useful to be able to choose different targets for the *from* and *to* bindings of a two-way bound element such as a textbox. This is possible by setting the `linkTo` attribute to the desired target data for the *to* binding.\n\nIn the following sample an `<input/>` and a `<select>` are bound to `settings.current` (*from* binding) and to `settings.modified` (*to* binding, using `linkTo`):\n\n```jsr\n<input data-link=\"current.title linkTo=modified.title\" />\n```\n\nThe user can choose the *Apply* button (or hit *Enter*, for the submit action of the form) to copy values over from `modified` to `current`. *Cancel* reverts the input/select back to the current data:",
        "anchor": "linkto"
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
            "title": "",
            "text": "```jsr\nColor: \n<select data-link=\"current.color linkTo=modified.color\">\n  ...\n</select>\n\nName:\n<input data-link=\"current.title linkTo=modified.title\" />\n```\n"
          }
        ],
        "html": "<script src=\"../download/sample-tag-controls/jsonview/jsonview.js\"></script>\n<link href=\"../download/sample-tag-controls/jsonview/jsonview.css\" rel=\"stylesheet\"></link>\n<style>\n.title {display: inline-block; border:1px solid; padding:5px; margin-bottom: 15px}\nform {border: 1px solid gray; display: inline-block; padding: 5px; margin-bottom: 15px;}\ninput, button, select {margin: 5px;} \n</style>\n\n<div id=\"result\"></div>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n<b>Current settings:</b>\n<span class=\"title\" data-link=\"\n  css-border-color{:current.color}\n  css-color{:current.color}\n  {:current.title}\n\"></span><br/>\n\n<form data-link=\"{on 'submit' apply}\">\n  <em>Modify settings:</em><br/><br/>\n  Color:\n  <select data-link=\"current.color linkTo=modified.color\">\n    <option>red</option>\n    <option>green</option>\n  </select><br/>\n  Name:\n  <input data-link=\"current.title linkTo=modified.title\" />\n  <hr />\n  Modified settings:\n  <span class=\"title\" data-link=\"\n    css-border-color{:modified.color}\n    css-color{:modified.color}\n    {:modified.title}\n  \"></span><br/>\n  <button type=\"submit\">Apply</button>\n  <button data-link=\"{on cancel}\">Cancel</button><br/>\n</form><br/>\n\n<em>Underlying data:</em><br/>{^{jsonview/}}\n\n</script>",
        "code": "var settings = {\n  current: {title: \"My title\", color:\"green\"},\n  modified: {title: \"My title\", color:\"green\"},\n  apply: function() {\n    $.observable(this.current).setProperty(this.modified);\n    return false;\n  },\n  cancel: function() {\n    $.observable(this.modified).setProperty(this.current);\n\n    $.observable(this.current).setProperty({name: \"\", color: \"\"});\n    $.observable(this.current).setProperty(this.modified);\n  }\n}\n\nvar myTmpl = $.templates(\"#myTmpl\");\n\nmyTmpl.link(\"#result\", settings);",
        "height": "526",
        "title": "linkTo"
      }
    ]
  },
  "linked-paths": {
    "title": "Data-linked paths",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "A data-linked template may include [chained paths](#paths@paths) such as `manager.address.ZIP` which step through chained object properties:\n\n```jsr\n<input data-link=\"manager.address.ZIP\" />\n\n{^{if manager.address.ZIP}}\n  ZIP: {^{:manager.address.ZIP}}\n{{/if}}  \n```"
      },
      {
        "_type": "para",
        "title": "Data-linking to deep changes in the path",
        "text": "\nThe chained paths can be in the `data-link=\"...\"` expression of [data-linked elements](#linked-elem-syntax) or in [data-linked tags](#linked-tag-syntax): `{^{...}}`. Either way, the template data-binding will automatically 'listen' to observable changes in the leaf property (`ZIP` in this case). \n\nBut sometimes you may want your template to respond dynamically to changes on objects higher up in the path (*deep changes* on the path). You can specify this by a simple syntax change: replace a `.` with a `^` at the level up to which you want to listen to changes.\n\nFor example, write `manager.address^ZIP` in order to respond not only to leaf changes (to `ZIP`) but also to observable changes in the `address` property of the `manager`. And write `manager^address.ZIP` in order to data-bind also to changes where the `manager` property of the top-level `team` object is swapped observably to another `manager` object.\n\n(If you know that in your app the objects higher up the path will never change dynamically, then stick with the default <em>leaf</em> binding, since that will provide better perf optimization...)\n\nSee also the related discussion and examples on [using `$.observe()` with deep changes](#observe@deep).\n\nHere it is in a sample, with leaf binding only. Editing the ZIP or clicking *\"Change leaf values\"* triggers template updates. But clicking *\"Change manager\"* does not work.\n\nClick on ***Try it*** and change paths to `manager^address.ZIP` -- and see how *\"Change manager\"* now works.",
        "anchor": "deep"
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
            "title": "",
            "text": "```jsr\n<input data-link=\"manager.address.ZIP\" />\n\n{^{if manager.address.ZIP}}\n  ZIP: {^{:manager.address.ZIP}}\n{{/if}}\n```\n\nModify leaf: template values update in response:\n```js\n$.observable(team.manager.address).setProperty({\n  \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n});\n```\n\nChange manager: template values do *not* update:\n```js\n$.observable(team).setProperty({\n  manager: team.manager === person1 ? person2 : person1\n});\n```\n\n\n"
          }
        ],
        "html": "<div class=\"left\">\n  <button id=\"modifyLeaf\">Change leaf values</button>\n  <button id=\"changeManager\">Change manager</button>\n  <div id=\"result\"></div>\n</div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n\n<input data-link=\"manager.address.ZIP\" />\n\n{^{if manager.address.ZIP}}\n  ZIP: {^{:manager.address.ZIP}}\n{{/if}}\n\n<hr/>\n\nManager: {^{if manager === person1}}person1{{else}}person2{{/if}}\n\n</script>",
        "code": "var team = {\n  person1: {\n    address: {\n      City: \"New York\",\n      ZIP: \"10035\"\n    }\n  },\n  person2: {\n    address: {\n      City: \"London\"\n    }\n  }\n};\n\nteam.manager = team.person1;\n\n\n$(\"#modifyLeaf\").on(\"click\", function() {\n  $.observable(team.manager.address).setProperty({\n    \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n  });\n});\n\n$(\"#changeManager\").on(\"click\", function() {\n  $.observable(team).setProperty({\n    manager: team.manager === team.person1 ? team.person2 : team.person1\n  });\n});\n\nvar tmpl = $.templates(\"#managerTmpl\");\n\ntmpl.link(\"#result\", team);",
        "title": "Leaf binding only",
        "height": "130"
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
            "title": "",
            "text": "```jsr\n<input data-link=\"manager^address.ZIP\" />\n\n{^{if manager^address.ZIP}}\n  ZIP: {^{:manager^address.ZIP}}\n{{/if}}\n```\n\nModify leaf or manager: template values all update correctly in response\n"
          }
        ],
        "html": "<div class=\"left\">\n  <button id=\"modifyLeaf\">Change leaf values</button>\n  <button id=\"changeManager\">Change manager</button>\n  <div id=\"result\"></div>\n</div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n\n<input data-link=\"manager^address.ZIP\" />\n\n{^{if manager^address.ZIP}}\n  ZIP: {^{:manager^address.ZIP}}\n{{/if}}\n\n<hr/>\n\nManager: {^{if manager === person1}}person1{{else}}person2{{/if}}\n\n</script>",
        "code": "var team = {\n  person1: {\n    address: {\n      City: \"New York\",\n      ZIP: \"10035\"\n    }\n  },\n  person2: {\n    address: {\n      City: \"London\"\n    }\n  }\n};\n\nteam.manager = team.person1;\n\n\n$(\"#modifyLeaf\").on(\"click\", function() {\n  $.observable(team.manager.address).setProperty({\n    \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n  });\n});\n\n$(\"#changeManager\").on(\"click\", function() {\n  $.observable(team).setProperty({\n    manager: team.manager === team.person1 ? team.person2 : team.person1\n  });\n});\n\nvar tmpl = $.templates(\"#managerTmpl\");\n\ntmpl.link(\"#result\", team);",
        "title": "Data-linking to deep changes",
        "height": "130"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is a variant of the same demo, showing changes to all three levels of `manager^address.ZIP`: `ZIP`, `address` and `manager`."
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
            "title": "",
            "text": "```jsr\n{^{if manager^address.ZIP}}\n  <td>...<input data-link=\"manager^address.ZIP\" /></td>\n{{else}}\n  <td>...UK address - No ZIP</td>\n{{/if}}\n```"
          }
        ],
        "html": "<div class=\"left\">\n  <button id=\"modifyLeaf\">Change leaf values</button>\n  <button id=\"changeAddress\">New address</button>\n  <button id=\"UKAddress\">UK address</button>\n  <button id=\"changeManager\">Change manager</button>\n  <div id=\"result\"></div>\n</div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"manager^name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"manager^address.street\" /></td></tr>\n    <tr>\n      {^{if manager^address.ZIP}}\n        <td>ZIP:</td><td><input data-link=\"manager^address.ZIP\" /></td>\n       {{else}}\n      <td colspan=\"2\">UK address - No ZIP</td>\n      {{/if}}\n    </tr>\n  </tbody></table>\n</script>",
        "code": "var person1 = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\",\n    ZIP: \"34009\"\n  }\n};\n\nvar person2 = {\n  name: \"Henry\",\n  address: {\n    street: \"Trinity St\"\n  }\n};\n\nvar data = {\n  manager: person1\n};\n\n$(\"#modifyLeaf\").on(\"click\", function() {\n  $.observable(data.manager).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\",\n    \"address.ZIP\": \"45008\"\n  });\n});\n\n$(\"#changeAddress\").on(\"click\", function() {\n  $.observable(data.manager).setProperty(\n    \"address\", \n    {\n      street: \"New Street\",\n      ZIP: \"99999\"\n    }\n  );\n});\n\n$(\"#UKAddress\").on(\"click\", function() {\n  $.observable(data.manager).setProperty(\n    \"address\", \n    {\n      street: \"St James St\"\n    }\n  );\n});\n\n$(\"#changeManager\").on(\"click\", function() {\n  $.observable(data).setProperty({\n    manager: data.manager === person1 ? person2 : person1\n  });\n});\n\nvar tmpl = $.templates(\"#managerTmpl\");\n\ntmpl.link(\"#result\", data);",
        "height": "180",
        "title": "Data-linking to deep changes (three levels)"
      }
    ]
  },
  "link-computed": {
    "title": "Data-linking to computed observables",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      },
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-targets": {
    "title": "Data-link targets",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "link-formelems",
            "label": "Form elements"
          },
          {
            "hash": "link-text-html",
            "label": "innerText / innerHTML"
          },
          {
            "hash": "link-css",
            "label": "CSS attributes"
          },
          {
            "hash": "link-class",
            "label": "class"
          },
          {
            "hash": "link-visibility",
            "label": "visibility"
          },
          {
            "hash": "link-properties",
            "label": "element properties"
          },
          {
            "hash": "link-tags",
            "label": "tag bindings"
          },
          {
            "hash": "link-widgets",
            "label": "jQuery UI widgets"
          },
          {
            "hash": "link-computed",
            "label": "Computed observables"
          },
          {
            "hash": "link-svg",
            "label": "SVG elements"
          },
          {
            "hash": "link-contenteditable",
            "label": "contenteditable elements"
          }
        ]
      }
    ]
  },
  "link-input": {
    "title": "Data-linked &lt;input&gt; elements (textbox - checkbox - radio)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This section shows data-linking to:\n\n- [textboxes](#link-input@textbox) (`<input/>`)\n- [checkboxes](#link-input@checkbox) (`<input type=\"checkbox\"/>`)\n- [radio buttons](#link-input@radio)  (`<input type=\"radio\"/>`)\n"
      },
      {
        "_type": "para",
        "title": "Data-linked textboxes",
        "text": "The following sample shows data-linked textboxes, with examples of two-way binding, one-way binding, and use of converters (*convert* and *convert back*).",
        "anchor": "textbox"
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
            "title": "",
            "text": "*<div class=\"close\">Two-way:</div>*\n\n```jsr\n<input data-link=\"name\"/>\n```\n\n*<div class=\"close\">Two-way with 'upper' and 'lower' converters (convert/convert back):</div>*\n\n```jsr\n<input data-link=\"{upper:name:lower}\"/>\n```\n\n*<div class=\"close\">One-way:</div>*\n\n```jsr\n<input data-link=\"{:name}\"/>\n```\n\n*<div class=\"close\">One-way with 'upper' converter:</div>*\n\n```jsr\n<input data-link=\"{upper:name}\"/>\n```\n\n*<div class=\"close\">Two-way with convert/convert back -- trigger=false (no trigger on keydown, only on blur):</div>*\n\n```jsr\n<input data-link=\"{upper:name trigger=false:lower}\"/>\n```\n\n*<div class=\"close\">Data-linked span:</div>*\n\n```jsr\n<span data-link=\"name\"></span>\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"name\"/>\n  <em>Two-way</em><br/>\n\n  <input data-link=\"{upper:name:lower}\"/>\n  <em>Two-way with 'upper' and 'lower' converters (convert/convert back)</em><br/>\n\n  <input data-link=\"{:name}\"/>\n  <em>One-way</em><br/>\n\n  <input data-link=\"{upper:name}\"/>\n  <em>One-way with 'upper' converter</em><br/>\n\n  <input data-link=\"{upper:name trigger=false:lower}\"/>\n  <em>Two-way with convert/convert back (no trigger on keydown, only on blur)</em><br/>\n\n  <span class=\"spanbox\" data-link=\"name\"></span>\n  <em>Data-linked span</em>\n\n</script>",
        "code": "$.views.converters({\n  upper: function(val) {\n    return val.toUpperCase();\n  },\n  lower: function(val) {\n    return val.toLowerCase();\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo\"};\n\ntmpl.link(\"#result\", person);",
        "height": "180",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Data-linked checkboxes",
        "text": "The following sample shows data-linked checkboxes, with examples of two-way binding, one-way binding, and use of converters (*convert* and *convert back*).",
        "anchor": "checkbox"
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
            "title": "",
            "text": "*<div class=\"close\">Two-way:</div>*\n\n```jsr\n<input type=\"checkbox\" data-link=\"member\"/>\n```\n\n*<div class=\"close\">Two-way with 'not' converters (convert/convert back):</div>*\n\n```jsr\n<input type=\"checkbox\" data-link=\"{not:member:not}\"/>\n```\n\n*<div class=\"close\">One-way:</div>*\n\n```jsr\n<input type=\"checkbox\" data-link=\"{:member}\"/>\n```\n\n*<div class=\"close\">One-way with 'not' converter:</div>*\n\n```jsr\n<input type=\"checkbox\" data-link=\"{not:member}\"/>\n```\n\n*<div class=\"close\">Data-linked span:</div>*\n\n```jsr\n<span class=\"spanbox\" data-link=\"member\"></span>\n```\n\n*<div class=\"close\">Data-linked span with if-binding:</div>*\n\n```jsr\n<span class=\"spanbox\" data-link=\"{if member tmpl='Member'}{else tmpl='Non-member'}\"></span>\n```\n\n*<div class=\"close\">Data-linked if/else tags:</div>*\n\n```jsr\n{^{if member}}Member{{else}}Non-member{{/if}}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <label><input type=\"checkbox\" data-link=\"member\"/> Member</label>\n  <em>Two-way</em><br/>\n\n  <label><input type=\"checkbox\" data-link=\"{not:member:not}\"/> Non-member</label>\n  <em>Two-way with 'not' converters (convert/convert back)</em><br/>\n\n  <label><input type=\"checkbox\" data-link=\"{:member}\"/> Member</label>\n  <em>One-way</em><br/>\n\n  <label><input type=\"checkbox\" data-link=\"{not:member}\"/> Non-member</label>\n  <em>One-way with 'not' converter</em><br/>\n\n  <span class=\"spanbox\" data-link=\"member\"></span>\n  <em>Data-linked span</em><br/>\n\n  <span class=\"spanbox\" data-link=\"{if member tmpl='Member'}{else tmpl='Non-member'}\"></span>\n  <em>Data-linked span with if-binding</em><br/>\n\n  <span class=\"spanbox\">{^{if member}}Member{{else}}Non-member{{/if}}</span>\n  <em>Data-linked if/else tags</em><br/>\n</script>",
        "code": "$.views.converters({\n  not: function(val) {\n    return !val;\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {member: true};\n\ntmpl.link(\"#result\", person);",
        "height": "210",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Data-linked radio buttons",
        "text": "The following samples show data-linked radio buttons:\n\n- [Two-way data-binding](#link-input@radio2way)\n- Data-driven by [array](#link-input@radioarray) data (in a `{{for}}` loop)\n- Data-driven by an [editable array](#link-input@radioedit) (in a `{^{for}}` loop)\n- Data-driven by an [editable array](#link-input@radioeditid) -- including `id`\n- Using [converters](#link-input@radioconvert)",
        "anchor": "radio"
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; two-way data-binding",
        "text": "The `<input>`s are grouped by `name`. Each one has the same data-link expression.\n\nHere, two groups (with different `name` values) show two-way binding. Changing selection on one group triggers the corresponding selection change on the other group, thanks to two-way binding to the `selected` property:\n",
        "anchor": "radio2way"
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
            "title": "",
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar data = {\n  selected: \"ford-us\",\n  ...\n};\n```\n\n*<div class=\"close\">HTML:</div>*\n\n```jsr\n<input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selected\"/> None ...\n<input name=\"cars\" type=\"radio\" value=\"volvo-eur\" data-link=\"selected\"/> Volvo ...\n<input name=\"cars\" type=\"radio\" value=\"ford-us\" data-link=\"selected\"/> Ford ...\n```\n\n```jsr\n<input name=\"cars-long\" type=\"radio\" value=\"\" data-link=\"selected\"/> None ...\n<input name=\"cars-long\" type=\"radio\" value=\"volvo-eur\" data-link=\"selected\"/> Volvo Europe ...\n<input name=\"cars-long\" type=\"radio\" value=\"ford-us\" data-link=\"selected\"/> Ford US ...\n```\n\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <label><input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selected\"/>\n    None</label><br/>\n  <label><input name=\"cars\" type=\"radio\" value=\"volvo-eur\" data-link=\"selected\"/>\n    Volvo</label><br/>\n  <label><input name=\"cars\" type=\"radio\" value=\"ford-us\" data-link=\"selected\"/>\n    Ford</label><br/>\n\n  <hr/>\n\n  <label><input name=\"cars-long\" type=\"radio\" value=\"\" data-link=\"selected\"/>\n    None</label><br/>\n  <label><input name=\"cars-long\" type=\"radio\" value=\"volvo-eur\" data-link=\"selected\"/>\n    Volvo Europe</label><br/>\n  <label><input name=\"cars-long\" type=\"radio\" value=\"ford-us\" data-link=\"selected\"/>\n    Ford US</label><br/>\n\n  <hr/>\n\n  <span class=\"spanbox\" data-link=\"selected||'none'\"></span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {selected: \"ford-us\"};\n\ntmpl.link(\"#result\", data);",
        "height": "206",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; in {{for}} loop with array",
        "text": "A `cars` array has values for the displayed `name` and the corresponding `id` (used as *key*, and data-linked to the `selected` property).\n\nWe loop through the array using `{{for cars}}`, and within the nested context we access the `selected` property using `~root.selected`.",
        "anchor": "radioarray"
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
            "title": "",
            "text": "*<div class=\"close\">Data includes `cars` array:</div>*\n\n```js\nvar data = {\n  selected: \"ford-us\",\n  cars: [\n    {id: \"volvo-eur\", name: \"Volvo\"},\n    ...\n  ]\n};\n```\n\n*<div class=\"close\">First radio button -- 'unselected' value: `\"\"`:</div>*\n\n```jsr\n<label>\n  <input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selected\"/>\n  None\n</label>\n```\n\n*<div class=\"close\">Radio buttons in `{{for}}` loop, data-linked to same `selected` / `~root.selected` property:</div>*\n\n```jsr\n{{for cars}}\n  <label>\n    <input name=\"cars\" type=\"radio\" value=\"{{:id}}\" data-link=\"~root.selected\"/>\n    {{:name}}\n  </label>\n{{/for}}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <label>\n    <input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selected\"/>\n    None\n  </label><br/>\n\n  {{for cars}}\n    <label>\n      <input name=\"cars\" type=\"radio\" value=\"{{:id}}\" data-link=\"~root.selected\"/>\n      {{:name}}\n    </label><br/>\n  {{/for}}\n\n  <span class=\"spanbox\" data-link=\"selected||'none'\"></span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selected: \"ford-us\",\n  cars: [\n    {id: \"volvo-eur\", name: \"Volvo\"},\n    {id: \"ford-us\", name: \"Ford\"},\n    {id: \"honda-jap\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "height": "136",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; in {^{for}} loop with dynamic array",
        "text": "In this example we allow the user to add and remove items from the array, and to change values such as `name`. The `id` value (used as key) is not editable.",
        "anchor": "radioedit"
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
            "title": "",
            "text": "*<div class=\"close\">The `cars` array (but not the `id` properties) is editable. Using data-linked tags: `{^{...}}`:</div>*\n\n```jsr\n{^{for cars}}\n  <label>\n    <input name=\"cars\" type=\"radio\" value=\"{{:id}}\" data-link=\"~root.selected\"/>\n    {^{:name}}\n  </label><br/>\n{{/for}}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on add}\">Add car</button>\n  <table>\n    <tbody>\n      {^{for cars}}\n        <tr>\n          <td><input data-link=\"name\"/></td>\n          <td>{{:id}}</td>\n          <td><span class=\"remove\" data-link=\"{on ~root.remove #index}\"></span></td>\n        </tr>\n      {{/for}}\n    </tbody>\n  </table><br/>\n\n  <label>\n    <input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selected\"/>\n    None\n  </label><br/>\n  {^{for cars}}\n    <label>\n      <input name=\"cars\" type=\"radio\" value=\"{{:id}}\" data-link=\"~root.selected\"/>\n      {^{:name}}\n    </label><br/>\n  {{/for}}\n\n  <span class=\"spanbox\" data-link=\"selected||'none'\"></span>\n</script>",
        "code": "$.views.settings.trigger(true);\n\nvar idCount = 0;\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  add: function() {\n    idCount++;\n    var id = \"car\" + idCount;\n    $.observable(this.cars).insert({id: id, name:\"name\"});\n    $.observable(this).setProperty(\"selected\", id);\n  },\n  remove: function(index) {\n    $.observable(this.cars).remove(index);\n  },\n  selected: \"ford-us\",\n  cars: [\n    {id: \"volvo-eur\", name: \"Volvo\"},\n    {id: \"ford-us\", name: \"Ford\"},\n    {id: \"honda-jap\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "title": "",
        "height": "330"
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; dynamic array including id (value)",
        "text": "Here we allow the user also to change the `id` value (used as key) -- which requires more advanced data-link syntax: `value^{:id}` to update the `value` of the `<input>`s when the `id` changes.",
        "anchor": "radioeditid"
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
            "title": "",
            "text": "*<div class=\"close\">The `id` is also editable. Include data-linking to `value^{:id}` -- which binds to changes in `id`:</div>*\n```jsr\n{^{for cars}}\n  <label>\n    <input name=\"cars\" type=\"radio\" value=\"{{:id}}\" data-link=\"{:~root.selected:} value^{:id}\"/>\n    {^{:name}}\n  </label><br/>\n{{/for}}\n```\n\nNote that the initialization of `value=\"idValue\"` is done during initial rendering, by using a JsRender tag, `{{:id}}`, rather than through data-linking. Writing `<input ... data-link=\"{:~sel:} value{:id}\"/>` would initialize `value` too late to ensure correct initial selection of the *Ford* radio button (based on the initial value `\"ford-us\"` of `selected`).\n\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on add}\">Add car</button>\n  <table>\n    <tbody>\n      {^{for cars}}\n        <tr>\n          <td><input data-link=\"name\"/></td>\n          <td><input data-link=\"id\"/></td>\n          <td><span class=\"remove\" data-link=\"{on ~root.remove #index}\"></span></td>\n        </tr>\n      {{/for}}\n    </tbody>\n  </table><br/>\n\n  <label>\n    <input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selected\"/>\n    None\n  </label><br/>\n  {^{for cars}}\n    <label>\n      <input name=\"cars\" type=\"radio\" value=\"{{:id}}\" data-link=\"{:~root.selected:} value^{:id}\"/>\n      {^{:name}}\n    </label><br/>\n  {{/for}}\n\n  <span class=\"spanbox\" data-link=\"selected||'none'\"></span>\n</script>",
        "code": "$.views.settings.trigger(true);\n\nvar idCount = 0;\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  add: function() {\n    idCount++;\n    var id = \"car\" + idCount;\n    $.observable(this.cars).insert({id: id, name:\"name\"});\n    $.observable(this).setProperty(\"selected\", id);\n  },\n  remove: function(index) {\n    $.observable(this.cars).remove(index);\n  },\n  selected: \"ford-us\",\n  cars: [\n    {id: \"volvo-eur\", name: \"Volvo\"},\n    {id: \"ford-us\", name: \"Ford\"},\n    {id: \"honda-jap\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "height": "330",
        "title": "",
        "anchor": "radioeditable"
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; with converters",
        "text": "In this last example we use *convert* and *convert back* converters to convert from the `selIndex`, the index of the selected radio button, to the value of the `id` key, and back. ",
        "anchor": "radioconvert"
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
            "title": "",
            "text": "*<div class=\"close\">Define converters:</div>*\n\n```js\n$.views.converters({\n  fromId: function(val) { // convert from id to index\n    var index = -1;\n    this.ctx.root.cars.forEach(function(car, ind) {\n      if (val === car.id) {\n        index = ind;\n      }\n    });\n    return index;\n  },\n  toId: function(val) {  // convert back from index to id\n    return val === -1 ? \"\" : this.ctx.root.cars[val].id;\n  }\n});\n```\n\n*<div class=\"close\">Initialize the data</div>*\n\n```js\nvar data = {\n  selIndex: 1,\n  cars: [...]\n}\n```\n\n*<div class=\"close\">Data-link to `selIndex`, using the converters:</div>*\n\n```jsr\n<input name=\"cars\" type=\"radio\" value=\"{{:id}}\" data-link=\"{toId:~root.selIndex:fromId} value^{:id}\"/>\n``` "
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <label>\n    <input name=\"cars\" type=\"radio\" value=\"\" data-link=\"{toId:selIndex:fromId}\"/>\n    None\n  </label><br/>\n  {^{for cars}}\n    <label>\n      <input name=\"cars\" type=\"radio\" value=\"{{:id}}\" data-link=\"{toId:~root.selIndex:fromId}\"/>\n      {^{:name}}\n    </label><br/>\n  {{/for}}\n\n  <span class=\"spanbox\" data-link=\"selIndex\"></span> <em>Selected index</em><br/>\n  <span class=\"spanbox\" data-link=\"selIndex === -1 ? 'None' : cars[selIndex].name\"></span> <em>Selected car name</em>\n</script>",
        "height": "170",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selIndex: 1,\n  cars: [\n    {id: \"volvo-eur\", name: \"Volvo\"},\n    {id: \"ford-us\", name: \"Ford\"},\n    {id: \"honda-jap\", name: \"Honda\"}\n  ]\n};\n\n$.views.converters({\n  fromId: function(val) { // convert from id to index\n    var index = -1;\n    this.ctx.root.cars.forEach(function(car, ind) {\n      if (val === car.id) {\n        index = ind;\n      }\n    });\n    return index;\n  },\n  toId: function(val) {  // convert back from index to id\n    return val === -1 ? \"\" : this.ctx.root.cars[val].id;\n  }\n});\n\ntmpl.link(\"#result\", data);",
        "title": ""
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "link2way",
            "label": "Two-way binding"
          },
          {
            "_type": "topic",
            "hash": "samples/form-elems",
            "label": "Form element samples"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls/edit/generic",
            "label": "Generic edit control sample"
          }
        ]
      }
    ]
  },
  "link-select": {
    "title": "Data-linked &lt;select&gt; elements",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This section shows data-linking to `<select>` elements:\n\n- [Two-way data-binding](#link-input@select2way)\n- Data-driven by [array](#link-input@selectarray) data (in a `{{for}}` loop)\n- Data-driven by an [editable array](#link-input@selectedit) (in a `{^{for}}` loop)\n- Using [converters](#link-input@selectconvert)"
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: two-way data-binding",
        "text": "The `<selects>`s are data-linked to the `selected` property (one a drop-down and the other a listbox: `size=\"3\"`). \n\nChanging selection on one `<select>` triggers the corresponding selection change on the other, thanks to two-way binding to the `selected` property:\n",
        "anchor": "select2way"
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
            "title": "",
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar data = {\n  selected: \"ford-us\",\n  ...\n};\n```\n\n*<div class=\"close\">HTML:</div>*\n\n```jsr\n<select data-link=\"selected\">\n  <option value=\"\">Choose a car</option>\n  <option value=\"volvo-eur\">Volvo</option>\n  <option value=\"ford-us\">Ford</option>\n</select>\n```\n\n```jsr\n<select data-link=\"selected\" size=\"3\">\n  <option value=\"\">Choose a car</option>\n  <option value=\"volvo-eur\">Volvo</option>\n  <option value=\"ford-us\">Ford</option>\n</select>\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <select data-link=\"selected\">\n    <option value=\"\">Choose a car</option>\n    <option value=\"volvo-eur\">Volvo</option>\n    <option value=\"ford-us\">Ford</option>\n  </select><br/><br/>\n\n  <select data-link=\"selected\" size=\"3\">\n    <option value=\"\">Choose a car</option>\n    <option value=\"volvo-eur\">Volvo</option>\n    <option value=\"ford-us\">Ford</option>\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"selected||'none'\"></span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {selected: \"ford-us\"};\n\ntmpl.link(\"#result\", data);",
        "height": "150",
        "title": ""
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: &lt;option&gt;s in {{for}} loop with array",
        "text": "A `cars` array has values for the displayed `name` and the corresponding `id` (used as *key*, and data-linked to the `selected` property). We loop through the array using `{{for cars}}`, to create an `<option>` for each car.",
        "anchor": "selectarray"
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
            "title": "",
            "text": "*<div class=\"close\">Data includes `cars` array:</div>*\n\n```js\nvar data = {\n  selected: \"ford-us\",\n  cars: [\n    {id: \"volvo-eur\", name: \"Volvo\"},\n    ...\n  ]\n};\n```\n\n*<div class=\"close\">The first `<option>` has the 'unselected' value: `\"\"`. The following `<option>s` are in a `{{for}}` loop:</div>*\n\n```jsr\n<select data-link=\"selected\" size=\"4\">\n  <option value=\"\">Choose a car</option>\n  {^{for cars}}\n    <option value=\"{{:id}}\">{{:name}}</option>\n  {{/for}}\n</select>\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <select data-link=\"selected\" size=\"4\">\n    <option value=\"\">Choose a car</option>\n    {^{for cars}}\n      <option value=\"{{:id}}\">{{:name}}</option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"selected||'none'\"></span><br/>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selected: \"ford-us\",\n  cars: [\n    {id: \"volvo-eur\", name: \"Volvo\"},\n    {id: \"ford-us\", name: \"Ford\"},\n    {id: \"honda-jap\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "height": "130",
        "title": ""
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: &lt;option&gt;s in {^{for}} loop with dynamic array",
        "text": "In this example we allow the user to add and remove items from the array, and to change values such as `name` and `id` (the key).",
        "anchor": "selectedit"
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
            "title": "",
            "text": "*<div class=\"close\">The `cars` array is editable. Using data-linked tags: `{^{...}}`:</div>*\n\n```jsr\n<select data-link=\"{:selected:} size{:cars.length + 1}\">\n  <option value=\"\">Choose a car</option>\n  {^{for cars}}\n    <option data-link=\"value{:id} {:name}\"></option>\n  {{/for}}\n</select>\n```\n\nNote that `<option data-link=\"value{:id} {:name}\"></option>` data-links the `value` to `id` and innerText to `name`. We could alternatively have written `<option data-link=\"value{:id}\">{^{>name}}</option>`."
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on add}\">Add car</button>\n  <table>\n    <tbody>\n      {^{for cars}}\n        <tr>\n          <td><input data-link=\"name\"/></td>\n          <td><input data-link=\"id\"/></td>\n          <td><span class=\"remove\" data-link=\"{on ~root.remove #index}\"></span></td>\n        </tr>\n      {{/for}}\n    </tbody>\n  </table><br/>\n\n  <select data-link=\"{:selected:} size{:cars.length + 1}\">\n    <option value=\"\">Choose a car</option>\n    {^{for cars}}\n      <option data-link=\"value{:id} {:name}\"></option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"selected||'none'\"></span><br/>\n</script>",
        "code": "$.views.settings.trigger(true);\n\nvar idCount = 0;\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  add: function() {\n    idCount++;\n    var id = \"car\" + idCount;\n    $.observable(this.cars).insert({id: id, name:\"name\"});\n    $.observable(this).setProperty(\"selected\", id);\n  },\n  remove: function(index) {\n    $.observable(this.cars).remove(index);\n  },\n  selected: \"ford-us\",\n  cars: [\n    {id: \"volvo-eur\", name: \"Volvo\"},\n    {id: \"ford-us\", name: \"Ford\"},\n    {id: \"honda-jap\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "height": "330",
        "title": ""
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: with converters",
        "text": "In this last example we use *convert* and *convert back* converters to convert from the `selIndex`, the index of the selected radio button, to the value of the `id` key, and back. ",
        "anchor": "selectconvert"
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
            "title": "",
            "text": "*<div class=\"close\">Define converters:</div>*\n\n```js\n$.views.converters({\n  fromId: function(val) { // convert from id to index\n    var index = -1;\n    this.ctx.root.cars.forEach(function(car, ind) {\n      if (val === car.id) {\n        index = ind;\n      }\n    });\n    return index;\n  },\n  toId: function(val) {  // convert back from index to id\n    return val === -1 ? \"\" : this.ctx.root.cars[val].id;\n  }\n});\n```\n\n*<div class=\"close\">Initialize the data</div>*\n\n```js\nvar data = {\n  selIndex: 1,\n  cars: [...]\n}\n```\n\n*<div class=\"close\">Data-link to `selIndex`, using the converters:</div>*\n\n```jsr\n<input name=\"cars\" type=\"radio\" value=\"{{:id}}\" data-link=\"{toId:~root.selIndex:fromId} value^{:id}\"/>\n``` "
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <select data-link=\"{toId:selIndex:fromId}\" size=\"4\">\n    <option value=\"\">Choose a car</option>\n    {^{for cars}}\n      <option data-link=\" value{:id} {:name}\"></option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"selIndex\"></span><br/>\n  <span class=\"spanbox\" data-link=\"selIndex === -1 ? 'None' : cars[selIndex].name\"></span>\n</script>",
        "height": "170",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selIndex: 1,\n  cars: [\n    {id: \"volvo-eur\", name: \"Volvo\"},\n    {id: \"ford-us\", name: \"Ford\"},\n    {id: \"honda-jap\", name: \"Honda\"}\n  ]\n};\n\n$.views.converters({\n  fromId: function(val) {\n    var index = 1;\n    this.ctx.root.cars.forEach(function(car, ind) {\n      if (val === car.id) {\n        index = ind;\n      }\n    });\n    return index;\n  },\n  toId: function(val) {\n    return val === -1 ? \"\" : this.ctx.root.cars[val].id;\n  }\n});\n\ntmpl.link(\"#result\", data);",
        "title": ""
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: with multiple selection",
        "text": "If the multiple attribute is set, data-linking is to an array of strings (option values). \n\nConverters could be used to convert to other data formats, such as an array of indices, or an array of objects. "
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
            "title": "",
            "text": "*<div class=\"close\">Initialize the data (with `selected` property as an array of strings):</div>*\n\n```js\nvar data = {\n  selected: [\"renault-fr\", \"ferrari-it\"],\n  cars: [\n    {id: \"volvo-eur\", name: \"Volvo\"},\n    ...\n  ]\n}\n```\n\n*<div class=\"close\">Data-link to `selected` array):</div>*\n\n```jsr\n<select data-link=\"selected\" multiple ...>\n  {^{for cars}}\n    <option data-link=\" value{:id} {:name}\"></option>\n  {{/for}}\n</select>\n```"
          }
        ],
        "html": "<style>select {margin: 10px 0;}</style>\n\n<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <em>Choose one or more cars:</em><br/>\n\n  <select data-link=\"selected\" size=\"5\" multiple>\n    {^{for cars}}\n      <option data-link=\" value{:id} {:name}\"></option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\">\n    {^{for selected}}{{:}} {{else}}<em>None</em>{{/for}}\n  </span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selected: [\"renault-fr\", \"ferrari-it\"],\n  cars: [\n    {id: \"volvo-eur\", name: \"Volvo\"},\n    {id: \"ford-us\", name: \"Ford\"},\n    {id: \"renault-fr\", name: \"renault\"},\n    {id: \"ferrari-it\", name: \"Ferrari\"},\n    {id: \"honda-jap\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "height": "186"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "link2way",
            "label": "Two-way binding"
          },
          {
            "_type": "topic",
            "hash": "samples/form-elems",
            "label": "Form element samples"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls/multiselect",
            "label": "Multiselect tag sample"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls/edit/generic",
            "label": "Generic edit control sample"
          }
        ]
      }
    ]
  },
  "link-textarea": {
    "title": "Data-linked &lt;textarea&gt; elements",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following sample shows data-linked text boxes, with two-way binding, one-way binding, and use of converters (*convert* and *convert back*)."
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
            "title": "",
            "text": "*<div class=\"close\">Two-way:</div>*\n\n```jsr\n<textarea ... data-link=\"name\"></textarea>\n```\n\n*<div class=\"close\">Two-way with 'upper' and 'lower' converters (convert/convert back):</div>*\n\n```jsr\n<textarea ... data-link=\"{upper:name:lower}\"></textarea>\n```\n\n*<div class=\"close\">One-way:</div>*\n\n```jsr\n<textarea ... data-link=\"{:name}\"></textarea>\n```\n\n*<div class=\"close\">One-way with 'upper' converter:</div>*\n\n```jsr\n<textarea ... data-link=\"{upper:name}\"></textarea>\n```\n\n*<div class=\"close\">Two-way, with convert/convert back -- trigger=false (no trigger on keydown - only on blur):</div>*\n\n```jsr\n<textarea ... data-link=\"{upper:name trigger=false:lower}\"></textarea>\n```\n\n*<div class=\"close\">Data-linked span:</div>*\n\n```jsr\n<span data-link=\"name\"></span>\n```"
          }
        ],
        "html": "<style>textarea {margin-bottom: 5px;} .pre {white-space: pre;}</style>\n<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n\n  <textarea rows=\"3\" cols=\"20\"\n    data-link=\"name\"\n  ></textarea>\n  <em>Two-way</em><br/>\n\n  <textarea rows=\"3\" cols=\"20\"\n    data-link=\"{upper:name:lower}\"\n  ></textarea>\n  <em>Two-way with 'upper' and 'lower' converters (convert/convert back)</em><br/>\n\n  <textarea rows=\"3\" cols=\"20\"\n    data-link=\"{:name}\"\n  ></textarea>\n  <em>One-way</em><br/>\n\n  <textarea rows=\"3\" cols=\"20\"\n    data-link=\"{upper:name}\"\n  ></textarea>\n  <em>One-way with 'upper' converter</em><br/>\n\n  <textarea rows=\"3\" cols=\"20\"\n    data-link=\"{upper:name trigger=false:lower}\"\n  ></textarea>\n  <em>Two-way with convert/convert back (no trigger on keydown - only on blur)</em><br/>\n\n  <span class=\"spanbox pre\" data-link=\"name\"></span>\n  <em>Data-linked span</em><br/>\n\n</script>",
        "code": "$.views.converters({\n  upper: function(val) {\n    return val.toUpperCase();\n  },\n  lower: function(val) {\n    return val.toLowerCase();\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo\\nBlow\"};\n\ntmpl.link(\"#result\", person);",
        "height": "380",
        "title": "Two-way binding with &lt;textarea&gt;"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "link2way",
            "label": "Two-way binding"
          },
          {
            "_type": "topic",
            "hash": "samples/form-elems",
            "label": "Form element samples"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls/edit/generic",
            "label": "Generic edit control sample"
          }
        ]
      }
    ]
  },
  "link-contenteditable": {
    "title": "Data-linking to contenteditable elements",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following sample shows data-linked *contenteditable* elements, with two-way binding, one-way binding, and use of converters (*convert* and *convert back*)."
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
            "title": "",
            "text": "*<div class=\"close\">Two-way:</div>*\n\n```jsr\n<span contenteditable=\"true\" data-link=\"name\"></span>\n```\n\n*<div class=\"close\">One-way:</div>*\n\n```jsr\n<span contenteditable=\"true\" data-link=\"{:name}\"></span>\n```\n\n*<div class=\"close\">One-way with 'upper' converter:</div>*\n\n```jsr\n<span contenteditable=\"true\" data-link=\"{upper:name}\"></span>\n```\n\n*<div class=\"close\">Two-way with 'upper' and 'lower' converters (convert/convert back):</div>*\n\n```jsr\n<span contenteditable=\"true\" data-link=\"{upper:name:lower}\"></span>\n```\n\n*<div class=\"close\">Two-way with convert/convert back -- trigger=false (no trigger on keydown, only on blur):</div>*\n\n```jsr\n<span contenteditable=\"true\" data-link=\"{upper:name trigger=false:lower}\"></span>\n```\n\n*<div class=\"close\">Data-linked span:</div>*\n\n```jsr\n<span data-link=\"name\"></span>\n```"
          }
        ],
        "html": "<style>*[contenteditable] {display: inline-block; border: 1px solid green; margin-bottom:8px; padding: 5px;}</style>\n<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <span contenteditable=\"true\" data-link=\"name\"></span>\n  <em>Two-way</em><br/>\n\n  <span contenteditable=\"true\" data-link=\"{upper:name:lower}\"></span>\n  <em>Two-way with 'upper' and 'lower' converters (convert/convert back)</em><br/>\n\n  <span contenteditable=\"true\" data-link=\"{:name}\"></span>\n  <em>One-way</em><br/>\n\n  <span contenteditable=\"true\" data-link=\"{upper:name}\"></span>\n  <em>One-way with 'upper' converter</em><br/>\n\n  <span contenteditable=\"true\" data-link=\"{upper:name trigger=false:lower}\"></span>\n  <em>Two-way with convert/convert back (no trigger on keydown, only on blur)</em><br/>\n\n  <span class=\"spanbox pre\" data-link=\"name\"></span>\n  <em>Data-linked span</em>\n</script>",
        "code": "$.views.converters({\n  upper: function(val) {\n    return val.toUpperCase();\n  },\n  lower: function(val) {\n    return val.toLowerCase();\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo\\nBlow\"};\n\ntmpl.link(\"#result\", person);",
        "title": "Two-way binding with contenteditable elements",
        "height": "250"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "link2way",
            "label": "Two-way binding"
          }
        ]
      }
    ]
  },
  "link-widgets": {
    "title": "Data-linking to jQuery UI widgets",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-tags": {
    "title": "Data-linking using tag bindings",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "`{for}` `{if}` `{on}` `{slider}` `{mytag}` etc."
      }
    ]
  },
  "link-svg": {
    "title": "Data-linking to SVG elements",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-css": {
    "title": "Data-linking to CSS attributes",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-text-html": {
    "title": "Data-linking to innerText / innerHTML",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-class": {
    "title": "Data-linking to class",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-visibility": {
    "title": "Data-linking to visibility",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-props": {
    "title": "properties (title - disabled - value - class - data-* ...)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-events": {
    "title": "Event bindings",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "include submit binding, used in MVVM sample. Explain context, including context=..."
      }
    ]
  },
  "jsvsettings/delimiters": {
    "title": "Setting tag delimiters for JsViews",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See also [Setting tag delimiters for JsRender](#settings/delimiters)"
      },
      {
        "_type": "para",
        "title": "JsRender default tag delimiters",
        "text": "Template tags in JsRender use the Mustache style: `{{...}}`.\n\nWhen using JsViews you can also use data-binding - with data-linked tags, written: `{^{...}}` "
      },
      {
        "_type": "para",
        "title": "Changing delimiters:",
        "text": "Sometimes there can be a need to use different delimiters. For example there may be a conflict if the template is being rendered on the server using a declarative syntax such as *Django* with the same default delimiters `{{` and `}}`.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following call:\n\n```js\n$.views.settings.delimiters(\"<%\", \"%>\");\n```\n\nwill change the tag syntax to `<%...%>` for JsRender, and `<^%...%>`) for a data-linked tag in JsViews.\n\nAnd the following:\n```js\n$.views.settings.delimiters(\"<<\", \">>. \"*\");\n```\n\nwill change to  `<<...>>` for a JsRender tag, and `<*<...>>`) for a data-linked tag in JsViews."
      },
      {
        "_type": "para",
        "title": "Verifying current setting for tag delimiters:",
        "text": "```js\nvar delimiters = $.views.settings.delimiters();\n// Returns an array [\"{{\", \"}}\", \"^\"] - JsRender tag delimiters and JsViews link character\n```"
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
            "title": "",
            "text": "*Markup:* \n\n```jsr\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <b>[[:title]]</b>\n  <ul>\n    [[for members]]\n      <li>Name: [*[:name>]] <input data-link=\"name\"/></li>\n    [[/for]]\n  </ul>\n</script>\n```\n\n*Code*\n\n```js\n$.views.settings.delimiters(\"[[\", \"]]\", \"*\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n...\n```"
          }
        ],
        "html": "<div id=\"result\">\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <b>[[:title]]</b>\n  <ul>\n    [[for members]]\n      <li>Name: [*[:name]] <input data-link=\"name\"/></li>\n    [[/for]]\n  </ul>\n</script>\n",
        "code": "$.views.settings.delimiters(\"[[\", \"]]\", \"*\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n\nvar team = {\n    title: \"A team\",\n    members: [{name: \"Jo\"}]\n  };\n\ntmpl.link(\"#result\", team);",
        "onlyJsRender": false,
        "height": "90",
        "title": "Choosing alternative tag delimiters, with JsViews"
      }
    ]
  },
  "jsvsettings/debugmode": {
    "title": "Setting debug mode",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender/JsViews has a *'debug mode'* setting which determines whether error messages encountered during rendering are displayed.\n\n***To get current debug mode:***\n\n```js\nvar isDebugMode = $.views.settings.debugMode(); // false by default\n```\n\n***To set debug mode:***\n\n```js\n$.views.settings.debugMode(...);\n```\n\nDebug mode can be set to any of the following:\n\n- `false` -- *errors during rendering will not be rendered* (but an exception will be thrown)\n- `true` -- no exception will be thrown, but *the error message will be rendered*, in place of the template tag or block\n- `\"some string\"` -- no exception. *The string `\"some string\"` will be rendered* in place of the tag or block\n- `\"\"` (empty string) -- no exception. The tag or block will simply be *replaced by the empty string*\n- a function (to be used as an error handler) -- no exception. The handler will run, and *the error string will be rendered, or else, if the function returns a string, that string will be rendered*\n\nSee *[Error handling and debugging](#onerror)* for a full discussion of alternative approaches, together with [details and working examples](#onerror@debugmode) of `$.views.settings.debugMode(...)`.\n\nIn particular, see [this sample](#onerror@datalink) of using `$.views.settings.debugMode(true)` with JsViews, and data-linking."
      }
    ]
  },
  "jsvsettings/onerror": {
    "title": "onError",
    "path": "",
    "sections": []
  },
  "jsvsettings/trigger": {
    "title": "Setting the default trigger behavior",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See *[Two-way binding](#link2way)*."
      },
      {
        "_type": "para",
        "title": "Triggering two-way binding on <b>blur</b>, rather than on <b>keydown</b>",
        "text": "In the case of *[text boxes](#link-input@textbox)*, *[textarea](#link-textarea)*, *[contenteditable](#link-contenteditable)* and some *custom tags*, you can choose whether changes to the underlying data are triggered as you type (on *keydown*), or only on leaving the input control (on *change* or *blur*)\n\nAllowed values for *trigger* are:\n\n- `true` -- data updates as you type -- on *keydown* \n- `false` -- data updates on *change* (when the input loses focus) \n"
      },
      {
        "_type": "para",
        "title": "Global default trigger setting",
        "text": "***To get current default trigger setting:***\n\n```js\nvar defaultTrigger = $.views.settings.trigger(); // true by default\n```\n\n***To modify the default trigger setting:***\n\n```js\n$.views.settings.trigger(false); // Default trigger is now false\n```"
      },
      {
        "_type": "para",
        "title": "Overriding the trigger setting",
        "text": "The *trigger* setting can be modified for individual tags or elements, by writing:\n\n```jsr\n<input data-link=\"name trigger=false\"/> \n{^{textbox name trigger=false}}\n```\n\n***Note:*** You can also set the trigger value to a string consisting of one or more white-space-separated event names, as in:<br/>`<input data-link=\"name trigger='keyup mouseup'\"/>` -- but generally only the values *true* (actually equivalent to `trigger='keydown'`) and *false* are useful.\n"
      }
    ]
  },
  "jsvsettings/advanced": {
    "title": "Advanced settings",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews has the following advanced settings:\n\n- **useViews** -- *default:* `false`\n- **linkAttr** -- *default:* `\"data-link\"`\n- **noValidate** -- *default:* `false` \n\nand also the following 'private' advanced settings:\n\n- **_jsv** -- *default:* `false`\n- **_wm** -- *default:* current 'wrapMap' settings\n- **_fe** -- *default:* current 'form element binding' settings\n\n***useViews*** controls a JsRender performance optimization, while building the *[view hierarchy](#views)*. In very simple templates there will usually not be any need to access the [`view`](#viewobject). JsRender detects these cases, does not create a view, and hence obtains a slight performance gain. By setting `useViews` to `true`, you guarantee that JsRender will *always* create views for template blocks.\n\n***linkAttr*** determines the JsViews data-link attribute. By default it is `data-link`. If there is a conflict where another module also uses the 'data-link' attribute, then you can choose a different attribute for JsViews data-linking. \n\nFor example, if you set `$.views.settings.advanced({linkAttr: \"link\"})`, then you would write `<input link=\"name\"/>` instead of `<input data-link=\"name\" />` for data-linking an `<input/>` to `name`.\n\n***noValidate*** controls whether JsViews runs validation code during data-linking, to raise an error in the case of invalid HTML structure (such as `<div/>` or <`div><span></div>`) or HTML/JsViews tag structure (such as `{^{if...}} <span{{/if}} ... >`). By setting *noValidate* to `true`, JsViews will skip the validation step, with a minor improvement to performance as a result.\n\n***_jsv*** is a 'private' setting (could change in the future). If set to `true` JsRender provides a global `_jsv` variable, which gives access to the internal store of views.\n\n***_wm*** is a 'private' setting (could change in the future). It determines the 'wrapMap' configuration which controls how document fragments are inserted into the DOM during data-linking. (Also used by jQuery DOM manipulation).\n\n***_fe*** is a 'private' setting (could change in the future). If contains the 'form element binding' configuration, which determines the elements (such as `<input/>` or `<textarea>`) which provide two-way data-binding with JsViews -- and specifies the default data-linked attribute, such as `value`.\n\n***To get current advanced settings:***\n\n```js\nvar advancedSettings = $.views.settings.advanced();\n```\n\nBy default the returned `advancedSettings` object is:\n\n```js\n{useViews: false, linkAttr: \"data-link\", noValidate: false, _jsv: false, _wm: ..., _fe: ...}\n```\n\n***To set advanced settings:***\n\n```js\n$.views.settings.advanced({useViews: true});\n// Set one or more advanced settings\n```"
      }
    ]
  },
  "jsvsettings/allowcode": {
    "title": "Setting \"allow code\" (JsViews)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The [allow code feature](#settings/allowcode) is intended for use with rendered templates (using the [`render()`](#rendertmpl) method), and not for [data-linked templates](#jsvlinktmpl).\n\nThis is because data-linked templates are optimized to re-render incrementally when linked observable data is updated. The [`{{*...}}`](#allowcodetags) tags may therefore run additional times during updating of template content."
      }
    ]
  },
  "jsvsettings": {
    "title": "Settings",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews provides the following APIs for modifying settings:"
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvsettings/delimiters",
            "label": "Delimiters"
          },
          {
            "hash": "jsvsettings/debugmode",
            "label": "Debug mode"
          },
          {
            "hash": "jsvsettings/trigger",
            "label": "Trigger"
          },
          {
            "hash": "jsvsettings/allowcode",
            "label": "Allow code"
          },
          {
            "hash": "jsvsettings/advanced",
            "label": "Additional avanced settings"
          }
        ]
      }
    ]
  },
  "tmplsyntax": {
    "title": "Data-linked template template syntax and structure",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews data-link syntax takes two forms:\n\n- [Data-linked tags](#linked-tag-syntax)\n- [Data-linked elements](#linked-elem-syntax)\n\nBoth forms use:\n\n- [Data-linked paths](#linked-paths)"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "Tutorial sequence of samples: <a href=\"#samples/data-link\">Data-linking tags and elements</a>"
      }
    ]
  },
  "jsvapps": {
    "title": "JsViews: Building apps",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Apps using JsViews",
        "text": "*JsViews* is much more of a framework than *JsRender*. It does much more than just templating -- providing also data-binding, *MVVM* support, observability of the data/model layer, support for interactive encapsulated components (*JsViews tag controls*), and more.\n\n*JsViews* uses the same templates as *JsRender*, but adds powerful data-binding features. Like *JsRender* it is highly flexible and expressive -- so it leaves you free to work within your own choice of overall application architecture (including architectures based on *MVVM*, *MVP* or *MVC* -- optionally with server/client integration).\n\n*JsViews* lets you use your own flavor of data/model layer -- whether simple plain JavaScript objects, hand-coded *View Model* instances, or *compiled View Models*.\n\nThe *[compiled View Models](#viewmodelsapi)* pattern makes it particularly easy to follow a fully-fledged *MVVM* approach to apps and web pages. It provides for generating View Model instances directly from plain JSON data, and for triggering incremental UI updates when modified JSON data is obtained."
      },
      {
        "_type": "para",
        "title": "Components of an app using JsViews",
        "text": "Any app or web page using JsViews will generally involve defining or registering the following elements:\n\n- one or more *templates* -- usually with *data-linking* -- see *[Data-linked templates](#linkedtmpls)*\n- a *'data Layer'* -- see *[JsViews: Data or View Model](#jsvmodel)*\n- optionally, *helpers* -- in the form of metadata, helper functions and converter functions, see *[Helpers and converters](#jsvhelpers-converters)*\n- optionally, reusable *JsView tag control* components for use within your templates -- see *[Custom tag controls](#jsvtagcontrols)*"
      }
    ]
  },
  "jsvmodel": {
    "title": "JsViews: Data / View Model",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Just like *JsRender*, *JsViews* (along with *JsObservable*) is designed to work well with either plain JavaScript objects and arrays, or with instances of JavaScript classes, such as *View Model* classes.\n\nSee *[JsRender: Data / View Model](#jsrmodel)* for a discussion and examples of using *plain objects* / *'hand-coded' View Model objects* / *compiled View Model objects*, with *JsRender*. \n\nWhen using *JsViews* you can still choose between plain objects and *View Model* objects, but now you can also bind to those objects, using data-linking.\n\nSo, for example, if you are using data obtained from a JSON request, you can choose between:\n- data-linking your templates directly to the objects and arrays returned from the JSON request -- and thus tracking observable changes to those objects \n- passing the data through a 'mapping' process to create a hierarchy of *View Model* instances, and data-linking your templates against those objects\n"
      },
      {
        "_type": "para",
        "title": "<b>Example: JsViews with plain objects and arrays</b>",
        "text": "In this example we add *JsViews* data-binding to the *[plain objects example](#jsrmodel@plain)* taken from the *JsRender Data / View Model* topic."
      },
      {
        "_type": "code",
        "title": "Data (e.g. from JSON request):",
        "code": "var person = {\n  name: \"Pete\",\n  address: { ... },\n  phones: [{...}, ...] \n};"
      },
      {
        "_type": "template",
        "title": "Template with data-linking:",
        "markup": "... \n<input data-link=\"name\" />\n...\n<input data-link=\"address^street\" />\n...\n{^{for phones}}\n  ...      \n    <input data-link=\"number\" />\n  ...\n{{/for}}\n...\n"
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
        "html": "<link href=\"change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"changeObjects\">Change data</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label><input type=\"checkbox\" checked id=\"attach\"/> Change Log</label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "$.views.settings.trigger(true);\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Data: hierarchy of plain objects and arrays\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n// Render and link template against plain object hierarchy\ntmpl.link(\"#result\", person);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: {street: \"New Street\"},\n    phones: [{number: \"123 123 1234\"}, {number: \"321 321 4321\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number: \"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "title": "Render and link template directly against plain objects..."
      },
      {
        "_type": "para",
        "title": "observeAll for plain objects and arrays",
        "text": "Our data-linked sample includes the <em>Change Log</em> idea, copied over from the samples on the <a href=\"#observeAll\">`observeAll`</a>/<a href=\"#unobserveAll\">`unobserveAll`</a> topics.\n\n```js\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n```\n\n(You'll see below how `observeAll` works identically for observing hierarchies of *View Model* instances or for observing hierarchies of plain objects)."
      },
      {
        "_type": "para",
        "title": "<b>Example: JsViews with 'hand-coded 'View Model objects</b>",
        "text": "So now let's switch to the *View Model* approach, starting from the ['hand-coded' View Model example](#jsrmodel@vm) in the *JsRender Data / View Model* topic, but this time with *JsViews* data-linking.",
        "anchor": "vm"
      },
      {
        "_type": "para",
        "title": "View Model classes:",
        "text": "Here is the class definition for ***Person***:\n\n```js\n// Constructor\nfunction Person(name, address, phones) {\n  this._name = name;\n  this._address = address;\n  this._phones = phones;\n}\n\n// Prototype\nvar personProto = {\n  name: function(val) {\n    if (!arguments.length) {\n      return this._name;\n    }\n    // If there is a value argument, treat as observable setter\n    $.observable(this).setProperty(\"name\", val);\n  },\n// ... (Similar pattern for phones and address)\n};\n\n// For read-write properties, associate setters with getters, \npersonProto.name.set = function(val) {\n  this._name = val;\n};\n...\n\nPerson.prototype = personProto;\n\n...\n```\n\nWe define exactly similar classes for our ***Address*** and ***Phone*** objects too.\n\nThe above is a recommended pattern for *View Model* classes used with *JsViews*. Note that this pattern *automatically integrates observable data changes*. (Calling the setter will make the corresponding observable data change, and conversely, making the observable data change will call the setter.)\n\n*Compiled View Models* returned by `$.views.viewModels(...)` also use this observable pattern.\n"
      },
      {
        "_type": "code",
        "title": "Data: View Model object hierarchy",
        "code": "var person = new Person(\n  \"Pete\",\n  new Address(\"1st Ave\"),\n  [new Phone({number: \"111 111 1111\"}), new Phone({number: \"222 222 2222\"})]\n);"
      },
      {
        "_type": "para",
        "title": "Template",
        "text": "As with *JsRender* above, to convert our template from using plain objects to using *View Model* objects, the only change we need to make is to add parens for our properties, which are now *getter/setter* functions.\n\nThis applies equally to data-link expressions, such as `<input data-link=\"address()^street()\" >`.\n\n(*Note:* we also change `.` to `^` in paths if we want [deep path binding](#linked-paths@deep).)\n\n"
      },
      {
        "_type": "template",
        "title": "Template",
        "markup": "... \n<input data-link=\"name()\" />\n...\n<input data-link=\"address()^street()\" />\n...\n{^{for phones()}}\n  ...      \n    <input data-link=\"number()\" />\n  ...\n{{/for}}\n...\n"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "samples/mvvm/person-view-models-jsv.js",
            "label": "person-view-models-jsv.js"
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
            "_type": "para",
            "title": "Make observable changes:",
            "text": "by directly changing data:\n\n```js\n$(\"#changeObjects\").on(\"click\", function() { // Use setProperty to make changes\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: new Address(\"New Street\"),\n    phones: [new Phone(\"123 123 1234\"), new Phone(\"321 321 4321\")]\n  });\n});\n```\n\nor by using setters:\n\n```js\n$(\"#setObjects\").on(\"click\", function() {    // Use setters to make changes\n  person.name(\"setPete\");\n  person.address(new Address(\"Set Road\"));\n  person.phones([new Phone(\"987 987 9876\")]);\n});\n```"
          }
        ],
        "html": "<link href=\"change-log.css\" rel=\"stylesheet\"/>\n<script src=\"mvvm/person-view-models-jsv.js\" ></script>\n\n<div class=\"left\">\n  <button id=\"changeObjects\">Change data</button>\n  <button id=\"setObjects\">Call setters</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <input type=\"checkbox\" checked id=\"attach\"/>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "$.views.settings.trigger(true);\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Instantiate View Model hierarchy\nvar person = new Person(\n  \"Pete\",\n  new Address(\"1st Ave\"),\n  [new Phone(\"111 111 1111\"), new Phone(\"222 222 2222\")]\n);\n\n// Render and link the template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() { // Use setProperty to make changes\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: new Address(\"New Street\"),\n    phones: [new Phone(\"123 123 1234\"), new Phone(\"321 321 4321\")]\n  });\n});\n\n$(\"#setObjects\").on(\"click\", function() {    // Use setters to make changes\n  person.name(\"setPete\");\n  person.address(new Address(\"Set Road\"));\n  person.phones([new Phone(\"987 987 9876\")]);\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones()).insert(new Phone(\"456 456 4567\"));\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "title": "Render and link template against a 'hand-coded' View Model object hierarchy",
        "anchor": "linkvmsample"
      },
      {
        "_type": "para",
        "title": "<b>Example: JsViews with compiled View Models &ndash; using $.views.viewModels(...)</b>",
        "text": "The built-in support in both *JsRender* and *JsViews* for compiled *View Models* makes it extremely easy to define *View Model* classes that include *get/set* properties using the pattern described above, along with any desired additional methods and computed properties. Simple calls to `$.views.viewModels(...)` allow you to compile *View Model* classes conforming to these patterns without having to manually write repetitive code for multiple such *get/set* properties.\n\nFor details on `$.views.viewModels` see: *[Compiled View Models](#viewmodelsapi)*.\n\nSince here we are using compiled *View Models* with *JsViews*, the setters are observable. To change a value, you can either use `setProperty(...)` to directly make an observable change to the data (which will cause the setter also to be called), or you can call the `setter(...)` (which will also trigger an observable change to the data). (Either way is equivalent, but usually calling the setter is more convenient...)\n\nTo illustrate, let's convert our [sample above](#jsrmodel@vm) to use compiled *View Models*:",
        "anchor": "compilevm"
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
            "title": "Compile View Models",
            "code": "// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n"
          },
          {
            "_type": "code",
            "title": "Instantiate View Model hierarchy",
            "code": "var person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n"
          },
          {
            "_type": "para",
            "title": "Make observable changes:",
            "text": "by directly changing data:\n\n```js\n$(\"#changeObjects\").on(\"click\", function() { // Use setProperty to make changes\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: Address(\"New Street\"),\n    phones: [Phone(\"123 123 1234\"), Phone(\"321 321 4321\")]\n  });\n});\n```\n\nor by using setters:\n\n```js\n$(\"#setObjects\").on(\"click\", function() {    // Use setters to make changes\n  person.name(\"setPete\");\n  person.address(Address(\"Set Road\"));\n  person.phones([Phone(\"987 987 9876\")]);\n});\n```"
          }
        ],
        "html": "<link href=\"change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"changeObjects\">Change data</button>\n  <button id=\"setObjects\">Call setters</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <input type=\"checkbox\" checked id=\"attach\"/>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "$.views.settings.trigger(true);\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(Phone(phoneNo));\n}\n\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n// Instantiate View Model hierarchy using constructors\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n\n// Render and link the template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() { // Use setProperty to make changes\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: Address(\"New Street\"),\n    phones: [Phone(\"123 123 1234\"), Phone(\"321 321 4321\")]\n  });\n});\n\n$(\"#setObjects\").on(\"click\", function() {    // Use setters to make changes\n  person.name(\"setPete\");\n  person.address(Address(\"Set Road\"));\n  person.phones([Phone(\"987 987 9876\")]);\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones()).insert(Phone(\"456 456 4567\"));\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "anchor": "compilevmsample",
        "title": "Render and link template against a compiled View Model object hierarchy"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also the [corresponding sample](#jsrmodel@compilevmsample) with JsRender.)"
      },
      {
        "_type": "para",
        "title": "<b>Using observe and observeAll APIs with View Model hierarchies</b>",
        "text": " "
      },
      {
        "_type": "para",
        "title": "observeAll()",
        "text": "The <em>Change Log</em> feature above is showing us ALL the changes to *View Model* instances, even as we structurally modify the tree by adding and removing objects from arrays, setting structured values to properties, etc.\n\nThis is achieved with exactly the same call to `observeAll`/`unobserveAll` that we used above for plain objects:\n\n```js\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n```"
      },
      {
        "_type": "para",
        "title": "$.observe()",
        "text": "Similarly you can use the `observe()` APIs to observe specific properties of *View Model* objects.\n\n```js\n// Observe changes to name, address and phones properties of <em>person</em> object\n$.observe(person, \"name\", \"phones\", \"address\",changeHandler); \n\n// Observe array changes <em>person.phones()</em>\n$.observe(person.phones(), changeHandler);\n\n// Observe changes to street property of <em>person.address()</em> object.\n$.observe(person.address(), \"street\", changeHandler);\n```\n\nor equivalently:\n\n```js\n$.observe(person, \"name\", \"phones\", \"address\", person.phones(), person.address(), \"street\", changeHandler);\n```\n\nHere it is in a sample:"
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
            "title": "Observe specific properties on specific objects",
            "code": "$.observe(person, \"name\", \"phones\", \"address\", person.phones(), person.address(), \"street\", changeHandler);"
          }
        ],
        "html": "<link href=\"change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"changeObjects\">Change data</button>\n  <button id=\"setObjects\">Call setters</button><br/>\n  <button id=\"swapObjects\">Swap address and phones</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <span class=\"floatleft\">{^{:number()}}</span>\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(Phone(phoneNo));\n}\n\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n// Instantiate View Model hierarchy\nvar alt = false,\n  address1 = Address(\"1st Ave\"),\n  phones1 = [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")],\n  address2 = Address(\"New Street\"),\n  phones2 = [Phone(\"123 123 1234\")],\n  person = Person(\"Pete\", address1, phones1);\n\n// Render and link the template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Observe specific properties on specific objects\n$.observe(person, \"name\", \"phones\", \"address\", person.phones(), person.address(), \"street\", changeHandler);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() { // Modify leaf values by observable changes of data\n  $.observable(person).setProperty(\"name\", person.name() + \"+\");\n  $.observable(person.address()).setProperty(\"street\", person.address().street() + \"+\");\n});\n\n$(\"#setObjects\").on(\"click\", function() { // Modify leaf values by calling setters\n  person.name(person.name() + \"*\");\n  person.address().street(person.address().street() + \"*\");\n});\n\n$(\"#swapObjects\").on(\"click\", function() {\n  // Swap the objects (optionally, remove our specific observers)\n  $.unobserve(person.address(), \"street\", changeHandler);\n  $.unobserve(person.phones(), changeHandler);\n\n  person.address(alt ? address1 : address2);\n  person.phones(alt ? phones1 : phones2);\n\n  // observe new objects object on specific paths (if not already observing)\n  $.observe(person.address(), \"street\", changeHandler);\n  $.observe(person.phones(), changeHandler);\n\n  alt = !alt;\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones()).insert(new Phone(\"456 456 4567\"));\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "title": "Using $.observe() to observe View Model objects"
      },
      {
        "_type": "para",
        "title": "Chained paths with plain objects or with View Model objects",
        "text": "With plain object hierarchies you can use [chained paths](#linked-paths) in both templates, and `observe()` paths:\n\n```jsr\n<input data-link=\"address^street\" />\n```\n\n```js\n$.observe(person, \"address^street\", changeHandler);\n```\n\nBut for *View Model* hierarchies, you can only used chained paths in templates:\n\n```jsr\n<input data-link=\"address()^street()\" />\n```\n\nFor the corresponding `$.observe()` calls you must pass in each *View Model* object and observe its properties, rather than using a chained path. Parens are not supported within `$.observe()` paths.\n\nSo you would write:\n\n```js\n$.observe(person, \"address\", changeHandler);\n$.observe(person.address(), \"street\", changeHandler);\n```\n\nor as a single call:\n\n```js\n$.observe(person, \"address\", person.address(), \"street\", changeHandler);\n```\n"
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios for compiled View Models, see:",
        "links": [],
        "topics": [
          {
            "hash": "jsvviewmodelsapi",
            "label": "Compiled View Models"
          }
        ]
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
          },
          {
            "_type": "topic",
            "hash": "jsrmodel",
            "label": "JsRender: Data / View Model"
          },
          {
            "_type": "topic",
            "hash": "mvvm-views",
            "label": "MVVM -- Dynamic view hierarchy"
          }
        ]
      }
    ]
  },
  "jsvhelpers-converters": {
    "title": "JsViews: Helpers and converters",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Helpers and converters used in *JsViews* apps are the same as regular *JsRender* helpers or converters -- defined/registered in the usual way (see *[Using helpers](#helpers)* and *[Using converters](#converters)*). \n\nThey can be used in template expressions, including data-linked expressions (see: *[Data-linked template syntax](#linked-template-syntax)*) such as:\n\n- `{^{: ~myFormatter(name)}}`\n- `{^{myCvt:name}}`\n- `<div data-link=\"~myFormatter(name)\" ...>`)\n\nIn addition to global helpers (registered using [`$.views.helpers(myHelpers);`](#helpersapi)), JsViews lets you pass helpers in on a specific link call, as in:\n- `tmpl.link(\"#container\", data, myHelpers);` (*[Linked template](#jsvtmpllink@apihelpers)*)\n- `$.link(true, \"#target\", data, myHelpers);` (*[Top-level declarative linking](#jsv.toplink-true)*)\n- `$.link(expression, \"#target\", data, myHelpers);` (*[Top-level programmatic linking](#jsv.toplink-expr)*)\n"
      }
    ]
  },
  "link-formelems": {
    "title": "Data-linking to form elements",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "link-input",
            "label": "textbox / checkbox / radio"
          },
          {
            "hash": "link-select",
            "label": "select"
          },
          {
            "hash": "link-textarea",
            "label": "textarea"
          },
          {
            "hash": "link-button",
            "label": "button"
          }
        ]
      }
    ]
  },
  "link-button": {
    "title": "Data-linked &lt;button&gt; elements",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-properties": {
    "title": "Data-linking to element properties",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "jsvadvanced": {
    "title": "JsViews &ndash; advanced topics",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvsettings/advanced",
            "label": "Advanced settings"
          },
          {
            "hash": "jsvobjects",
            "label": "JsViews objects"
          }
        ]
      }
    ]
  },
  "jsvviews": {
    "title": "View hierarchy",
    "path": "",
    "sections": []
  },
  "linkedtmpls": {
    "title": "Data-linked templates",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Templates used in *JsViews* apps are regular *JsRender* templates, defined/registered in the usual way (see *[Using templates](#compiletmpl)*).\n\nHowever they can include data-linked tags (such as `{^{:name}}`) and data-linked elements (such as `<div data-link=\"name\" ...>`). See: *[Data-linked template syntax](#linked-template-syntax)*.\n\nInstead of being simply rendered by [`render()`](#rendertmpl) method, they are rendered and data-linked using the [`link()`](#jsvlinktmpl) method.Templates are rendered and data-linked #jsvlinktmpl"
      }
    ]
  },
  "mvvm-views": {
    "title": "MVVM &ndash; Dynamic  view hierarchy",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Using merge() and unmap() for Save/Undo behavior, in an MVVM application",
        "text": "MVVM applications (including single page apps -- SPAs) generally work with data on the server, considered as the *Model*, and client data, in the browser -- which is a hierarchy of *View Models*. Client *View Models* are initialized from the server *Model*. \n\nThe user may be able to interact with *Views* in the browser, and drive changes to the *View Model*. There will then typically be a process of saving data (from the modified *View Model* in the browser) back to the server, to update the *Model*.\n\nThe following sample (available also at [samples/editable/submit](#samples/editable/submit)) illustrates this, and provides a *Submit Changes* button (which makes a 'snapshot' of current *View Model* data, and which would in a 'real app' save that data back to the server), and an *Undo* button (which reverts current *View Model* data back to the last 'snapshot').\n\nSpecifically:\n\n- *Submit Changes* is bound to the submit action of an HTML form -- so will be triggered also by *Enter*\n- It uses the *compiled View Model* [`unmap()`](#viewmodelsapi@unmap) feature to make a `snapshot` of data for sending to the server\n- *Undo* uses the *compiled View Model* [`merge()`](#viewmodelsapi@merge) feature to revert changes\n"
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
            "title": "",
            "text": "Provide *Submit Changes* and *Undo* buttons, calling the *saveData* and *undo* methods of View Model:\n\n```jsr\n<div class=\"linkedContent\">\n  ...\n  <button data-link=\"{on undo} ...\">Undo</button>\n  ...\n  <form data-link=\"{on 'submit' saveData}\">\n    <button type=\"submit\" ...>Submit Changes</button>\n    ...\n    <tbody data-link=\"{for movies() tmpl='#movieTemplate'}\"></tbody>\n    ...\n    <div data-link=\"{for movies()[selectedIndex()] tmpl='#detailTemplate'}\"></div>\n  </form>\n</div>\n```\n\nProvide *undo* and *saveData* methods on *compiled View Model*:\n\n```js\n$.views.viewModels({\n  MovieApp: {\n    getters: [...],\n    extend: {\n      undo: function() {\n        // Revert to previous savedData\n        this.merge(savedData);\n        ...\n      },\n      saveData: function() {\n        // Save current data, for subsequent Undo behavior\n        savedData = this.unmap();\n        // Submit current data to server\n        $.post(\"/save/data\", ...savedData, function(msg) {...});\n        ...\n      },\n      ...\n```"
          }
        ],
        "url": "samples/editable-data/submit/sample",
        "anchor": "",
        "height": "320",
        "title": "MVVM Save/Undo, using compiled View Models "
      },
      {
        "_type": "para",
        "title": "Save/Undo behavior in an MVVM application using plain objects",
        "text": "The above scenario of *Save/Undo* making a snapshot of current *View Model* data, and binding to the submit action, can be achieved with either *compiled View Models* or with plain object hierarchies. But it is easier to achieve with *compiled View Models*.\n\nBy way of comparison, here is the corresponding sample using plain objects:"
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
            "title": "",
            "text": "Provide *Submit Changes* and *Undo* buttons, calling the *saveData* and *undo* methods of View Model:\n\n```jsr\n<div class=\"linkedContent\">\n  ...\n  <button data-link=\"{on ~undo} ...\">Undo</button>\n  ...\n  <form data-link=\"{on 'submit' ~saveData}\">\n    <button type=\"submit\" ...>Submit Changes</button>\n    ...\n```\n\nProvide *undo* and *saveData* helper methods:\n\n```js\nhandlers = {\n  undo: function() {\n    // Revert to previous savedData\n    $.observable(this.movies).refresh(JSON.parse(savedData));\n    $.observable(this).removeProperty(\"selectedIndex\");\n  },\n  saveData: function() {\n    // Save current data, for subsequent Undo behavior\n    savedData = JSON.stringify(this.movies);\n\n    $.post(\"/save/data\", ...savedData, function(msg) {...});\n    ...\n  },\n...\n```"
          }
        ],
        "url": "",
        "anchor": "",
        "height": "320",
        "html": "<link href=\"editable-data/sample.css\" rel=\"stylesheet\"/>\n\n<!----------------- Data-linked content -------------------> \n<div class=\"linkedContent\">\n  <div class=\"buttons\">\n    <button data-link=\"{on ~showData}\">show data</button>\n    <button data-link=\"{on ~deleteLast}\">delete last language</button>\n    <button data-link=\"{on ~undo} disabled{:msg !== ''}\">Undo</button>\n  </div>\n\n  <form data-link=\"{on 'submit' ~saveData}\">\n    <button class=\"buttons\" type=\"submit\"\n     data-link=\"disabled{:msg !== ''}\">Submit Changes</button>\n\n    <div class=\"comment\">Click to select and edit</div>\n    <table data-link=\"\n      {on 'click' '.addMovie' ~addMovie}\n      {on 'click' '.movies tr' ~select}\n      {on 'click' '.removeMovie' ~removeMovie}\n    \">\n      <thead><tr>\n        <th>Title</th><th>Languages</th>\n        <th><span class=\"addMovie\">Add</span></th>\n      </tr></thead>\n      <tbody class=\"movies\"\n        data-link=\"{for movies tmpl='#movieTemplate'}\"></tbody>\n    </table>\n\n    <div class=\"detail\"\n      data-link=\"{for movies[selectedIndex] tmpl='#detailTemplate'}\n        {on 'click' '.addLanguage' ~addLanguage}\n        {on 'click' '.removeLanguage' ~removeLanguage}\n    \"></div>\n  </form>\n\n  <div class=\"message\" data-link=\"msg\"></div>\n</div>\n\n<!----------------- Templates ------------------->\n<script id=\"movieTemplate\" type=\"text/x-jsrender\">\n  <tr class=\"hover\" data-link=\"css-background-color{:~bgColor(#index)}\">\n    <td>\n      <span data-link=\"#index + 1\"></span>:\n      <span data-link=\"title\"></span>\n    </td>\n    <td>\n      {^{for languages}}\n        <div data-link=\"name\"></div>\n      {{/for}}\n    </td>\n    <td><span class=\"removeMovie\"></span></td>\n  </tr>\n</script>\n\n<script id=\"detailTemplate\" type=\"text/x-jsrender\">\n  <div>\n    <div class=\"title\">Title:</div>\n    <div><input data-link=\"title\" /></div>\n    <div class=\"title\">\n      Languages: <span class=\"addLanguage\">Add</span>\n    </div>\n    {^{for languages ~movie=#data}}\n      <input data-link=\"name\" />\n      <span class=\"removeLanguage\"\"></span>\n    {{/for}}\n  </div>\n</script>\n\n<!----------------- Show data ------------------->\n<script id=\"showData\" type=\"text/x-jsrender\">\n  <hr/>\n  {{for movies}}<div>\n    <b>Movie:</b> {{>title}}\n    <b>Languages:</b> {{for languages}} {{>name}}{{/for}}\n  </div>{{/for}}\n</script>\n\n<div id=\"console\"></div>",
        "code": "$.views.settings.trigger(true); // Trigger on key down.\n\nvar VMs = $.views.viewModels,\n  counter = 0,\n\n  // Initial data\n  app = {\n    msg: null,\n    selectedIndex: null,\n    movies: [\n      {\n        title:\"Meet Joe Black\",\n        languages: [\n          {name: \"English\"},\n          {name: \"French\"}\n        ]\n      },\n      {\n        title:\"Eyes Wide Shut\",\n        languages: [\n          {name: \"German\"},\n          {name: \"French\"},\n          {name: \"Spanish\"}\n        ]\n      }\n    ],\n    select: function(index) {\n      if (this.selectedIndex !== index) {\n        $.observable(this)\n          .setProperty(\"selectedIndex\", index);\n      }\n    },\n    showMsg: function(msg) {\n      $.observable(this).setProperty(\"msg\", msg);\n    }\n  },\n\n  savedData = JSON.stringify(app.movies),\n\n  handlers = {\n    undo: function() {\n      // Revert to previous savedData\n      $.observable(this.movies).refresh(JSON.parse(savedData));\n      $.observable(this).removeProperty(\"selectedIndex\");\n    },\n    saveData: function() {\n      // Make new savedData snapshot\n      savedData = JSON.stringify(this.movies);\n\n      // In real app, uncomment to save current data to the server:\n      // $.post(\"/save/data\", {movieData : savedData}, function(msg) {\n        var msg = \"In a real app, updated data would have been saved to server\";\n        this.showMsg(msg); // Display message\n      //});\n      return false; // Do not do default form action for submit\n    },\n    addMovie: function() {\n      $.observable(this.movies).insert({\n        title: \"NewTitle\" + counter ,\n        languages: [\n          {name: \"NewLanguage\" + counter++}\n        ]}\n      );\n      // Set selection on the added item\n      this.select($.view(\".movies tr:last\").index);\n    },\n    removeMovie: function(ev, evtArgs) {\n      this.select(); // unselect\n      var thisIndex = $.view(ev.target).index;\n      $.observable(this.movies).remove(thisIndex);\n      return false;\n    },\n    addLanguage: function(ev, evtArgs) {\n      var selectedMovie = this.movies[this.selectedIndex];\n      $.observable(selectedMovie.languages).insert({\n        name: \"NewLanguage\" + counter++\n      });\n    },\n    removeLanguage: function(ev, evtArgs) {\n      var selectedMovie = this.movies[this.selectedIndex];\n      var thisIndex = $.view(ev.currentTarget).index;\n      $.observable(selectedMovie.languages).remove(thisIndex);\n      return false;\n    },\n    select: function(ev, evtArgs) {\n      this.select($.view(ev.currentTarget).index);\n    },\n    deleteLast: function() {\n      if (this.movies.length) {\n        var languages = this.movies[this.movies.length - 1].languages;\n        $.observable(languages).remove();\n      }\n    },\n    showData: function() {\n      $(\"#console\").append($(\"#showData\").render(this));\n    },\n    bgColor: bgColor\n  };\n\n// Background color helper function\nfunction bgColor() {\n  return app.selectedIndex === this.index\n    ? \"yellow\"\n    : (this.index%2 ? \"#fdfdfe\" : \"#efeff2\");\n}\n\nbgColor.depends = [\"#index\", app, \"selectedIndex\"];\n\n$.observable(app.movies).observeAll(function() {\n  app.showMsg(\"\"); \n// If there have been any changes made to the movies data we clear\n\t//the Saved... message and this also drives the Save button\n\t//disabled property and the \"navigate away\" behavior.\n});\n\n// \"Navigate away\" behavior\n$(window).on('beforeunload', function(){\n  return app.msg === \"\" ? \"You have unsaved changes.\" : undefined;\n});\n\n$.link(true, \".linkedContent\", app, handlers);",
        "title": "MVVM Save/Undo, using plain objects"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsvmodel",
            "label": "Data / View Model"
          },
          {
            "_type": "topic",
            "hash": "jsvviewmodelsapi",
            "label": "$.views.viewModels"
          }
        ]
      }
    ]
  },
  "jsvviewmodelsapi": {
    "title": "Compiled View Models, using $.views.viewModels() (JsViews)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This topic covers using *[Compiled View Models](#viewmodelsapi)* with *JsViews* -- along with *data-linking* and *observability*.\n\n*Compiled View Models* can be used equally well with *JsRender* or with *JsViews* -- and the same basic scenarios apply:\n- Using `$.views.viewModels(...)` to [register/compile](#viewmodelsapi@compile) *View Models* (`myVM`)\n- Using a compiled View Model `myVM` as [constructor/factory](#viewmodelsapi@construct) method -- `MyVM(...)` -- to create View Model instances (`myVmInstance`)\n- Using `MyVM.map(...)` to [convert](#viewmodelsapi@map) a plain object hierarchy (such as from a JSON request) to a hierarchy of *View Model* instances\n- Using `myVMInstance.merge(...)` to incrementally [update](#viewmodelsapi@merge) a *View Model* hierarchy, using updated plain data\n- Using `myVMInstance.unmap()` to [convert](#viewmodelsapi@unmap) a *View Model* hierarchy back to a plain object hierarchy\n\nHowever *JsViews* brings additional power to compiled *View Models*:"
      },
      {
        "_type": "para",
        "title": "Compiled View Model instances are automatically 'observable'",
        "text": "Compiled *View Model* classes used with *JsViews* are automatically *observable*, so:\n\n- Calling a setter function such as `person.name(\"newName\")` will automatically make an *observable* change to the View Model instance (`person`)\n- Directly making an observable change (`...setProperty(\"name\", ...)`) to a View Model instance `person` will automatically call the setter `person.name(...)`\n- Incremental updates triggered by [`myViewModelObject.merge(...)`](#viewmodelsapi@merge) are automatically *observable* -- so data-linked values in the templates will also update incrementally."
      },
      {
        "_type": "para",
        "title": "<b>Samples:</b> ",
        "text": " "
      },
      {
        "_type": "para",
        "title": "Using JsViews with a hierarchy of compiled View Model objects",
        "text": "The following sample adds JsViews and data-linking to the [first](#jsrmodel@compilevmsample) of the JsRender samples for compiled *View Models*.\n\nIt uses exactly the same calls to `$.views.viewMethods` to obtain compiled *View Models* -- and the same code to then construct the View Model hierarchy: \n\n```js\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n...\n// Instantiate View Model hierarchy using constructors\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n```"
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
            "title": "",
            "text": "The principal changes from the corresponding [JsRender sample](#jsrmodel@compilevmsample) are as follows:\n\n- The template uses data-linked tags:\n\n  ```jsr\n  ...{^{:name()}}...\n  ...{^{:address().street()}}...\n  ...{^{for phones()}}...\n  ...{^{:number()}}...\n  ```\n\n- Instead of the `render()` method, we use the `link()` method:\n\n  ```js\n  tmpl.link(\"#result\", person);\n  ```\n\n- The `addPhone()` method inserts a new `Phone` 'observably':\n\n  ```js\n  function addPhone(phoneNo) {\n    $.observable(this.phones()).insert(Phone(phoneNo));\n  }\n  ```\n\n- The setters (and also the `addPhone` method) now trigger updates through observable data-changes and data-linking. We don't now need to re-render the template to show the changes:\n\n  ```js\n  $(\"#changeName\").on(\"click\", function() {\n    person.name(\"newName\");           // Use the name(...) setter\n  });\n\n  $(\"#addPhone\").on(\"click\", function() {\n    person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n  });\n  ```"
          }
        ],
        "html": "<style>button {margin-bottom: 9px;}</style>\n\n<button id=\"changeName\">Change name</button>\n<button id=\"addPhone\">Add Phone</button>\n\n<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{^{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{^{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            {^{:number()}}\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  $.observable(this.phones()).insert(Phone(phoneNo));\n}\n\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n// Instantiate View Model hierarchy using constructors\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n\n// Render and link template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button handlers\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n});",
        "height": "190",
        "title": "Using JsViews with a hierarchy of compiled View Model objects",
        "anchor": "compilevmsample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "***See also:*** the *[compiled View Models](#jsvmodel@compilevmsample)* sample in the *[Data / View Model](#jsvmodel)* topic, which takes the above sample and adds add two-way data-linking on the *get/set* properties, by replacing data-linked tags such as:\n\n```jsr\n{^{:name()}}\n```\n\nwith data-linked input elements:\n\n```jsr\n<input data-link=\"name()\" />\n```\n"
      },
      {
        "_type": "para",
        "title": "Using MyViewModel.map(...) to map a whole object hierarchy to a View Model instance hierarchy",
        "text": "Similarly, we will convert from JsRender to JsViews the [sample](#viewmodelsapi@mapsample) that took a *'View Model typed hierarchy'*, and created a complete hierarchy of *View Model* instances, by passing a plain data hierarchy to the top-level `map()` method.\n\nAgain the code for compiling *View Model* classes and for  then calling the [`map()`](#viewmodelsapi@map) method to generated the *View Model* hierarchy is unchanged:\n\n*Compile View Model classes (typed hierarchy):* \n\n```js\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // Declare 'name' as being a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // Declare 'address' as being an Address (View Model) type\n     {getter: \"phones\", type: \"Phone\"}     // Declare 'phones' as being (an array) of Phone (View Model) types\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone: ...\n});\n```\n\n*Person data (plain object hierarchy, or JSON string):*\n\n```js\nvar personData = {\n    name: \"Pete\",\n    address: {street: \"1st Ave\"},\n    phones: [{number: \"111 111 1111\"}, ...]\n  };\n```\n\n*Use map() to convert from `personData` plain object hierarchy (or JSON string) to `person` *View Model* hierarchy:*\n\n```js\nvar person = $.views.viewModels.Person.map(personData);\n```"
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
            "title": "",
            "text": "Changes from the corresponding [JsRender version](#viewmodelsapi@mapsample) include:\n"
          },
          {
            "_type": "template",
            "title": "Data-linked tags",
            "markup": "... {^{:name()}} ..."
          },
          {
            "_type": "code",
            "title": "addPhone() inserts a new Phone 'observably'",
            "code": "function addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  $.observable(this.phones()).insert(vmCollection.Phone(phoneNo));\n}\n"
          },
          {
            "_type": "code",
            "title": "Calling setters, or the addPhone method, trigger observable updates...",
            "code": "...\nperson.name(\"newName\");           // Use the name(...) setter\n\n...\nperson.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method"
          }
        ],
        "html": "<style>button {margin-bottom: 9px;}</style>\n\n<button id=\"changeName\">Change name</button>\n<button id=\"addPhone\">Add Phone</button>\n\n<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{^{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{^{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            {^{:number()}}\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone:{\n    getters: [\"number\"]\n  }\n});\n\nvar vmCollection = $.views.viewModels;\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  $.observable(this.phones()).insert(vmCollection.Phone(phoneNo));\n}\n\n// person plain object hierarchy:\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\n// Instantiate View Model hierarchy using map()\nvar person = vmCollection.Person.map(personData);\n\n// Render template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button handlers\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n});",
        "height": "190",
        "onlyJsRender": false,
        "title": "Using map() to convert from a plain object hierarchy to a View Model hierarchy",
        "anchor": "mapsample"
      },
      {
        "_type": "para",
        "title": "Using merge() and unmap()",
        "text": "The next sample includes  [`merge()`](#viewmodelsapi@merge) and [`unmap()`](#viewmodelsapi@unmap) -- starting from the corresponding JsRender [sample](#viewmodelsapi@mergesample), and adding data-linking.\n"
      },
      {
        "_type": "para",
        "title": "Updating with merge() makes minimal incremental changes",
        "text": "Calling `merge(modifiedData)` does not replace the whole hierarchy of *View Model* instances, but works incrementally to add/remove/modify instances as appropriate. So if most of `modifiedData` content is the same as the data previously passed to `map()` or `merge()`, the call will make only minimal changes to the hierarchy. \n\nWhen using a data-linked template to render the *View Model* hierarchy, the resulting changes to the rendered (data-linked) view *will also be incremental* (and minimal).\n"
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
            "title": "",
            "text": "This sample, based on the corresponding [JsRender version](#viewmodelsapi@mergesample), includes using `merge()`to trigger an incremental (minimal) update to the *View Model* hierarchy, and as a result, to the data-linked view:\n\n```js\n$(\"#update\").on(\"click\", function() {\n  person.merge(personData2);               // Update person View Model hierarchy\n});\n```"
          }
        ],
        "onlyJsRender": false,
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone:{\n    getters: [\"number\"]\n  }\n});\n\nvar vmCollection = $.views.viewModels;\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  $.observable(this.phones()).insert(vmCollection.Phone(phoneNo));\n}\n\n// First version of data (e.g. from JSON request):\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\n// Second version of data (e.g. new JSON request):\nvar personData2 = {\n  name: \"Peter\",\n  address: {street: \"2nd Ave\"},\n  phones: [{number: \"111 111 9999\"},{number: \"333 333 9999\"}]\n};\n\n// Instantiate View Model hierarchy, using map()\nvar person = vmCollection.Person.map(personData);\n\n// Render template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  // Update View Model hierarchy, using merge()\n  person.merge(personData2);\n});\n\n$(\"#revert\").on(\"click\", function() {\n  // Revert View Model hierarchy, using merge()\n  person.merge(personData);\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n});\n\n$(\"#getData\").on(\"click\", function() {\n  // Get current data, using unmap()\n  var updatedPersonData = person.unmap();\n  window.alert(JSON.stringify(updatedPersonData));\n});",
        "html": "<style>button {margin-bottom: 9px;}</style>\n\n<button id=\"update\">Update</button>\n<button id=\"revert\">Revert</button>\n<button id=\"getData\">Get Data</button><br/>\n<button id=\"changeName\">Change name</button>\n<button id=\"addPhone\">Add Phone</button>\n\n<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{^{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{^{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>{^{:number()}}</td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "height": "230",
        "title": "Using merge() to update View Models, and unmap() to return to plain objects",
        "anchor": "mergesample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Since we are using data-linking, we can easily modify the sample to include two-way databinding:\n\n"
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
            "title": "",
            "text": "This sample illustrates two-way data-linking of *get/set* properties on compiled *View Models*, by replacing the data-linked tags of the previous sample, such as: \n\n```jsr\n{^{:name()}}\n```\n\nwith data-linked input elements:\n\n```jsr\n<input data-link=\"name()\" />\n```\n\nIt also illustrates using `observeAll` with compiled *View Model* instances -- by including the <em>Change Log</em> idea, copied over from the samples on the <a href=\"#observeAll\">`observeAll`</a>/<a href=\"#unobserveAll\">`unobserveAll`</a> topics."
          }
        ],
        "html": "<link href=\"change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"update\">Update</button>\n  <button id=\"revert\">Revert</button>\n  <button id=\"getData\">Get Data</button><br/>\n  <button id=\"changeName\">Change name</button>\n  <button id=\"addPhone\">Add Phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label><input type=\"checkbox\" checked id=\"attach\"/> Change Log</label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\"/></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\"/></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table></script>",
        "code": "$.views.settings.trigger(true);\n\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone:{\n    getters: [\"number\"]\n  }\n});\n\nvar vmCollection = $.views.viewModels;\n\n// Method for Person class\nfunction addPhone(phoneNo) {               // Uses vmCollection.Phone() to construct new instance\n  $.observable(this.phones()).insert(vmCollection.Phone(phoneNo));\n}\n\n// First version of data (e.g. from JSON request):\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\n// Second version of data (e.g. from JSON request):\nvar personData2 = {\n  name: \"Peter\",\n  address: {street: \"2nd Ave\"},\n  phones: [{number: \"111 111 9999\"},{number: \"333 333 9999\"}]\n};\n\n// Instantiate View Model hierarchy, using map()\nvar person = vmCollection.Person.map(personData);\n\n// Render and link the template against person (Person instance)\ntmpl.link(\"#result\", person);\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  person.merge(personData2);\n});\n\n$(\"#revert\").on(\"click\", function() {\n  person.merge(personData);\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n$(\"#getData\").on(\"click\", function() {\n  var updatedPersonData = person.unmap();\n  window.alert(JSON.stringify(updatedPersonData));\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "400",
        "anchor": "mergesample2",
        "title": "Using merge() and unmap() &ndash; with two-way binding"
      },
      {
        "_type": "para",
        "title": "MVVM &ndash; Save/Undo",
        "text": "Typically in an MVVM application, a *Save/Undo* feature will save *View Model* data back to the *Model* on the server, or revert *View Model* data back to the last version saved. \n\nThe *compiled View Model* [`merge()`](#viewmodelsapi@merge) and [`unmap()`](#viewmodelsapi@unmap) features are very useful for this scenario. See discussion and samples in the *[MVVM -- Dynamic view hierarchy](#mvvm-views)* topic."
      },
      {
        "_type": "para",
        "title": "Sample showing some of the advanced View Model features",
        "text": "The next sample specifically highlights some of the advanced features of compiled *View Models*, by adding JsViews data-linking to the corresponding JsRender [sample](#viewmodelsapi@mergeadvsample).\n\n- It stores compiled *View Models* on a `myVmCollection` hash, as a *View Model typed collection*, rather than on<br/>`$.views.viewModels`\n- It maps from an array of 'people' rather than a single person:<br/>\n  `var people = Person.map(peopleData);`\n- It specifies an `id` key for `Person`. When updating the `phones` array the `id` value is treated as 'primary key', and used to map 'identity':<br/>\n  `id: \"id\"`\n- It provides an `id()` callback on `Person`, for determining identity -- allowing identification of corresponding *View Model* instances within the people array, and hence preventing unnecessary disposal and re-instantiation (which would destroy state, such as the `comment` value).\n- It has a `comment()` get/set property that is added as part of the `extend` definition, not the `getters`, so it is not initialized from data, in the constructor. Note therefore that if you set a *comment* on each `person` instance, then click *Update*, then *Revert*, one *comment* is conserved (since that instance is never disposed - based on the 'identity' determination) but the other is lost since the instance is disposed and then re-created by *Revert*:<br/>\n  `extend: {...comment: comment...}`\n- It has `defaultVal` specified for `name`, `address` and `phones`, either as 'static' values or computed by a callback function:<br/>\n  `address: {type: \"Address\", defaultVal: defaultStreet}`\n- It overrides the generated `person.name()` *get/set* by a `myNameGetSet` function which includes logging\n- It passes a JSON string to `merge()` or `map()`",
        "anchor": "mergeadvsample"
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
            "title": "",
            "text": "This sample, like the corresponding [JsRender version](#viewmodelsapi@mergeadvsample), shows some of the advanced features of compiled *View Models*.\n"
          }
        ],
        "html": "<style>table {margin-bottom: 9px;}</style>\n\n<button id=\"update\">Update</button>\n<button id=\"revert\">Revert</button>\n<button id=\"getData\">Get Data</button><br/>\n<button id=\"changeName\">Change name</button>\n<button id=\"addPhone\">Add Phone</button>\n\n<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Comment:</td><td><input data-link=\"comment()\"/></td></tr>\n    <tr><td>Name:</td><td><input data-link=\"name()\"/></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\"/></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones() ~personIndex=#index}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\" data-link=\"{on remove #index ~personIndex}\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table></script>",
        "code": "$.views.settings.trigger(true);\n\nvar tmpl = $.templates(\"#personTmpl\");\n\nvar myVmCollection = {};\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      {getter: \"name\", defaultVal: \"No name\"}, // Compiled name() get/set\n      {getter: \"address\", type: \"Address\", defaultVal: defaultAddress},\n      {getter: \"phones\", type: \"Phone\", defaultVal: []}\n    ],\n    extend: {\n      name: myNameGetSet,                      // Override name() get/set\n      addPhone: addPhone,\n      comment: comment                         // Additional get/set property, not initialized by data)\n    },\n    id: function(vm, plain) {                  // Callback function to determine 'identity'\n      return vm.personId === plain.personId;\n    }\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone: {\n    getters: [\"number\"],\n    extend: {\n      remove: remove,\n    },\n    id: \"phoneId\"                              // Treat phoneId as 'primary key', for identity\n  }\n}, myVmCollection);                            // Store View Models (typed hierarchy) on myVmCollection\n\n// Override generated name() get/set\nfunction myNameGetSet(val) {\n  if (!arguments.length) {\n    return this._name; // If there is no argument, use as a getter\n  }\n  $.observable(this).setProperty(\"name\", val);\n};\n\nmyNameGetSet.set = function(val) {\n  this._name = val; // Setter called by observable property change\n  console.log(\"name set to \" + val);           // This is an additional line of code, for logging\n};\n\n// Method for Person class\nfunction addPhone(phoneNo) {                   // Uses myVmCollection.Phone() to construct new instance\n  $.observable(this.phones()).insert(myVmCollection.Phone(phoneNo));\n}\n\n// Method for Phone class\nfunction remove(index, personIndex) {\n  $.observable(people[personIndex].phones()).remove(index);\n};\n\n// get/set for comment (state on View Model instance, not initialized from data)\nfunction comment(val) {\n  if (!arguments.length) {\n    return this._comment; // If there is no argument, use as a getter\n  }\n  $.observable(this).setProperty(\"comment\", val);\n}\n\ncomment.set = function(val) {\n  this._comment = val; // Setter called by observable property change\n};\n\nfunction defaultAddress() {                    // Function providing default address if undefined in data\n  return {street: 'No street for \"' + this.name + '\"'};\n}\n\n// First version of data - array of objects (e.g. from JSON request):\nvar peopleData = [\n  {\n    personId: \"1\",\n    address: {\n      street: \"2nd Ave\"\n    }\n  },\n  {\n    personId: \"2\",\n    name: \"Pete\",\n    phones: [\n      {number: \"333 333 3333\", phoneId: \"2a\"}\n    ]\n  }\n];\n\n// Second version of data - JSON string (e.g. new JSON request):\nvar peopleData2 = '[{\"personId\":\"2\",\"name\":\"Peter\",\"address\":{\"street\":\"11 1st Ave\"},'\n+ '\"phones\":[{\"number\":\"111 111 9999\",\"phoneId\":\"1a\"},{\"number\":\"333 333 9999\",\"phoneId\":\"2a\"}]}]';\n\n// Instantiate View Model hierarchy using map()\nvar people = myVmCollection.Person.map(peopleData);\n\n// Render and link the template against people (array of Person instances)\ntmpl.link(\"#result\", people);\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  people.merge(peopleData2);\n});\n\n$(\"#revert\").on(\"click\", function() {\n  people.merge(peopleData);\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  people[0].name(\"newName\");\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  people[0].addPhone(\"xxx xxx xxxx\");\n});\n\n$(\"#getData\").on(\"click\", function() {\n  var updatedPeopleData = people.unmap(people);\n  window.alert(JSON.stringify(updatedPeopleData));\n});",
        "height": "400",
        "title": "Mapping from JSON data to View Model hierarchy &ndash; further features"
      },
      {
        "_type": "para",
        "title": "Overriding generated get/set functions",
        "text": "The above sample shows how to override compiled *get/set* function. (It includes a `myNameGetSet()` function which overrides the compiled `name()` *get/set* function.)\n\nTo override a generated get/set property provided by a compiled View Model you can provide an implementation in the `extend` hash, with the same name as the *get/set* in the `getters` array:\n\n```js\n// Define a myNameGetSet(...)function, to override the compiled name(...) get/set function\nfunction myNameGetSet(val) {\n  if (!arguments.length) {           // This is standard compiled get/set code\n    return this._name;               // If there is no argument, use as a getter\n  }\n  this._name = val;                  // If there is an argument, use as a setter\n  console.log(\"name set to \" + val); // This is an additional line of code, for logging\n}\n\n// Declare a Person View Model with an overridden name() get/set property\n$.views.viewModels({\n  Person: {\n    getters: [\n      {getter: \"name\", ...}, // Compiled name() get/set\n      ...\n    ],\n    extend: {\n      name: myNameGetSet,    // Override name() get/set\n      ...\n    }\n    ...\n  },\n  ...\n});\n```\n\nThe above is equivalent to the generated version except that it adds custom logging to the getter/setter function.",
        "anchor": "override"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "viewmodelsapi",
            "label": "Compiled View Models (JsRender)"
          }
        ]
      }
    ]
  },
  "jsvassigntag": {
    "title": "Data-linked template tag: {^{: ...}}",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the `{^{: someExpression}}` tag is a data-bound version of the JsRender [`{{: ...}}`](#assigntag) tag -- which evaluates the expression and returns its string value.\n\nWhen using [data-linked templates](#linkedtmpls) the data-bound version will update automatically when the data in the expression changes observably.\n"
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
            "title": "",
            "text": "```jsr\n{^{:manager^nickname || manager^name}}\n```\n\nThe data-linked `{^{: ...}}` tag updates when the expression `manager^nickname || manager^name` changes<br/>-- i.e. when `manager.nickname`, `manager.name` or the `manager` object change."
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on changeManager}\">Change manager</button><br/><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n  <em>Nickname:</em> <input data-link=\"manager^nickname\" /><br/>\n\n  <em>&lcub;{^:manager^nickname || manager^name}&rcub;:</em>\n  <span class=\"spanbox\">\n    {^{:manager^nickname || manager^name}}\n  </span>\n\n</script>",
        "code": "var team = {\n  person1: {\n    name: \"Peter\",\n    nickname: \"Pete\"\n  },\n  person2: {\n    name: \"Octavia\"\n  },\n  changeManager: function() {\n    $.observable(this).setProperty({\n      manager: this.manager === this.person1 ? this.person2 : this.person1\n    });\n  }\n};\n\nteam.manager = team.person1;\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", team);",
        "title": "{^{: ...}}",
        "height": "155"
      },
      {
        "_type": "para",
        "title": "",
        "text": "*Note:* `{^{: ...}}` does not HTML-encode the value of the expression. Therefore if you type in `...<sometag>...` as nickname, the `{^{: ...}}` tag will insert that markup as is, into the HTML, which will cause an error (mismatched tag). In this scenario the [`{^{> ...}}`](#jsvhtmltag) tag should be used instead."
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-tag-syntax",
            "label": "Data-linked tags"
          },
          {
            "_type": "topic",
            "hash": "linked-paths",
            "label": "Data-linked paths"
          },
          {
            "_type": "topic",
            "hash": "assigntag",
            "label": "JsRender: {{: ...}}"
          }
        ]
      }
    ]
  },
  "jsvhtmltag": {
    "title": "Data-linked template tag: {^{> ...}}",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the `{^{> someExpression}}` tag is a data-bound version of the JsRender [`{{> ...}}`](#htmltag) tag -- which evaluates the expression and returns the HTML encoded string value of the result.\n\nWhen using [data-linked templates](#linkedtmpls) the data-bound version will update automatically when the data in the expression changes observably.\n"
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
            "title": "",
            "text": "```jsr\n{^{:manager^nickname || manager^name}}\n```\n\nThe data-linked `{^{> ...}}` tag updates when the expression `manager^nickname || manager^name` changes<br/>-- i.e. when `manager.nickname`, `manager.name` or the `manager` object change."
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on changeManager}\">Change manager</button><br/><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n  <em>Nickname:</em> <input data-link=\"manager^nickname\" /><br/>\n\n  <em>&lcub;^{>manager^nickname || manager^name}&rcub;:</em>\n  <span class=\"spanbox\">\n    {^{>manager^nickname || manager^name}}\n  </span>\n</script>",
        "code": "var team = {\n  person1: {\n    name: \"Peter\",\n    nickname: \"Pete\"\n  },\n  person2: {\n    name: \"Octavia\"\n  },\n  changeManager: function() {\n    $.observable(this).setProperty({\n      manager: this.manager === this.person1 ? this.person2 : this.person1\n    });\n  }\n};\n\nteam.manager = team.person1;\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", team);",
        "title": "{^{> ...}}",
        "height": "155"
      },
      {
        "_type": "para",
        "title": "",
        "text": "*Note:* Unlike the [`{^{: ...}}`](#jsvassigntag), the `{^{> ...}}` HTML-encodes the value of the expression. So if you type in `...<sometag>...` as nickname, the `{^{> ...}}` tag will HTML-encode that markup, and there will not be an error."
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-tag-syntax",
            "label": "Data-linked tags"
          },
          {
            "_type": "topic",
            "hash": "linked-paths",
            "label": "Data-linked paths"
          },
          {
            "_type": "topic",
            "hash": "htmltag",
            "label": "JsRender: {{> ...}}"
          }
        ]
      }
    ]
  },
  "jsvincludetag": {
    "title": "Data-linked template tag: {^{include ...}}",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the `{^{include ...}}` tag is a data-bound version of the JsRender [`{{include ...}}`](#includetag) tag.\n\nWhen using [data-linked templates](#linkedtmpls) the data-bound version will update automatically when the data in the expression changes observably.\n\nThe most common scenario for `{{include}}` is for composition of templates, without change of data context and with statically-defined templates. In that scenario, even within a JsViews data-linked template, the `{{include}}` itself does not need to be data-linked:"
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
            "title": "",
            "text": "```jsr\n{{include tmpl=\"#managerTmpl\"/}}\n```\n\nHere, the `{{include}}` tag is not data-linked, but the `managerTmpl` template does itself include data-linking:\n\n```jsr\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n  I am {^{>manager^name}}\n</script>\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n  I am {^{>manager^name}}\n</script>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on changeManager}\">Change manager</button><br/><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n\n  <em>&lcub;{include tmpl=\"#managerTmpl\"/}&rcub;:</em>\n  <span class=\"spanbox\">\n    {{include tmpl=\"#managerTmpl\"/}}\n  </span>\n</script>\n\n",
        "code": "var team = {\n  person1: {\n    name: \"Peter\"\n  },\n  person2: {\n    name: \"Octavia\"\n  },\n  changeManager: function() {\n    $.observable(this).setProperty({\n      manager: this.manager === this.person1 ? this.person2 : this.person1\n    });\n  }\n};\n\nteam.manager = team.person1;\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", team);",
        "title": "{{include}}",
        "height": "130"
      },
      {
        "_type": "para",
        "title": "",
        "text": "If `{{include someExpression ...}}` has an argument for moving to a new data-context, and changes in the value of the expression are to drive updates, then the data-linked form `{^{include}}` must be used: "
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
            "title": "",
            "text": "```jsr\n{^{include manager tmpl=\"#managerTmpl\"/}}\n```\n\nThe data-linked `{^{include}}` tag updates when the expression `manager` changes -- i.e. when the `manager` object is changed.\n\nAlso the 'name' updates when `name` changes, because the `managerTmpl` itself has a data-linked `{^{>name}}` tag:\n\n```jsr\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n  I am {^{>name}}\n</script>\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n  I am {^{>name}}\n</script>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on changeManager}\">Change manager</button><br/><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n\n  <em>&lcub;^{include manager tmpl=\"#managerTmpl\"/}&rcub;:</em>\n  <span class=\"spanbox\">\n    {^{include manager tmpl=\"#managerTmpl\"/}}\n  </span>\n</script>\n\n",
        "code": "var team = {\n  person1: {\n    name: \"Peter\"\n  },\n  person2: {\n    name: \"Octavia\"\n  },\n  changeManager: function() {\n    $.observable(this).setProperty({\n      manager: this.manager === this.person1 ? this.person2 : this.person1\n    });\n  }\n};\n\nteam.manager = team.person1;\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", team);",
        "title": "{^{include}}",
        "anchor": "",
        "height": "130"
      },
      {
        "_type": "para",
        "title": "{^{include ...}} with dynamically changing template",
        "text": "If `{{include}}` uses `tmpl=expression` to obtain a template from data or from a helper, then the data-linked `{^{include}}` can be used to drive updates when the template changes dynamically:"
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
            "title": "",
            "text": "```jsr\n{^{include manager ^tmpl=manager^template/}}\n```\n\nHere the data-linked `{^{include}}` uses a different template for each person (`^tmpl=manager^template`):\n\n```js\nvar team = {\n  person1: {\n    name: \"Peter\",\n    template: \"I am {^{>name}}\" // Template for Peter\n  },\n  ...\n```\n\n-- so thanks to the initial `^` in `^tmpl=...` (see *[binding to tag properties](#linked-tag-syntax@linkedproperties)*), the `{^{include}}` tag updates also if the template itself changes dynamically."
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on changeManager}\">Change manager</button><br/><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n  <em>Template:</em> <input data-link=\"manager^template\" /><br/>\n\n  <em>^&lcub;{include manager ^tmpl=\"manager^template\"/}&rcub;:</em>\n  <span class=\"spanbox\">\n    {^{include manager ^tmpl=manager^template/}}\n  </span>\n</script>",
        "code": "var team = {\n  person1: {\n    name: \"Peter\",\n    template: \"I am {^{>name}}\"\n  },\n  person2: {\n    name: \"Octavia\",\n    template: \"My name is <b>{^{>name}}</b>\"\n  },\n  changeManager: function() {\n    $.observable(this).setProperty({\n      manager: this.manager === this.person1 ? this.person2 : this.person1\n    });\n  }\n};\n\nteam.manager = team.person1;\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", team);",
        "title": "",
        "height": "155"
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-tag-syntax",
            "label": "Data-linked tags"
          },
          {
            "_type": "topic",
            "hash": "linked-paths",
            "label": "Data-linked paths"
          },
          {
            "_type": "topic",
            "hash": "includetag",
            "label": "JsRender: {{include ...}}"
          }
        ]
      }
    ]
  },
  "jsvfortag": {
    "title": "Data-linked template tag: {^{for ...}}",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the `{^{for someExpression}}` tag is a data-bound version of the JsRender [`{{for ...}}`](#fortag) tag -- which moves the data context to the object or array returned by the expression, and -- if an array -- iterates over the array.\n\nWhen using [data-linked templates](#linkedtmpls) the data-bound version will update automatically when the data in the expression changes observably, and, for arrays, will also update if the array itself changes observably.\n"
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
            "title": "",
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar team = {\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"}\n  ],\n...\n```\n\n*<div class=\"close\">Template:</div>*\n\n```jsr\n...\n{^{for members}}\n  <li>... {^{>name}} ...</li>\n{{else}}\n  <li>There are no members</li>\n{{/for}}\n...\n```\n\nHere, the data-linked `{^{for}}` tag updates incrementally when the `members` array is modified as in:\n\n```js\naddMember: function() {\n  $.observable(this.members).insert({name: \"new\" + cnt++});\n}\n...\nremoveMember: function(index) {\n  $.observable(this.members).remove(index);\n}\n```\n\nand updates if the whole `members` array is replaced, as in:\n\n```js\nreplaceMembers: function() {\n  $.observable(this).setProperty(\"members\", [{name: \"Peter\"}, ...]);\n}\n```"
          }
        ],
        "html": "<style>li {list-style: none}</style>\n<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button>\n  <ul>\n    {^{for members}}\n      <li>\n        {^{:#index + 1}}: {{>name}}\n        <span class=\"remove\" data-link=\"{on ~root.removeMember #index}\"></span>\n      </li>\n    {{else}}\n      <li>There are no members</li>\n    {{/for}}\n  </ul>\n</script>\n",
        "code": "var team = {\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"}\n  ],\n  addMember: function() {\n    $.observable(this.members).insert({name: \"new\" + cnt++});\n  },\n  removeMember: function(index) {\n    $.observable(this.members).remove(index);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", [{name: \"Peter\"}, {name: \"Octavia\"}, {name: \"Xavier\"}]);\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);",
        "title": "{^{for ...}}",
        "height": "120"
      },
      {
        "_type": "para",
        "title": "{^{for ...}} with dynamically changing template",
        "text": "If `{{for}}` uses `tmpl=expression` to obtain a template from data or from a helper, then the data-linked `{^{for}}` can be used to drive updates when the template changes dynamically:"
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
            "title": "",
            "text": "```jsr\n{^{for members ^tmpl=isEditable?\"#memberEditTmpl\":\"#memberTmpl\" /}}\n```\n\nHere the data-linked `{^{for}}` uses two different templates, driven by the `isEditable` property:\n\n```js\nvar team = {\n  members: [...],\n  isEditable: false,\n  ...\n```\n\n-- so thanks to the initial `^` in `^tmpl=...` the `{^{for}}` tag updates if `isEditable` changes -- and uses the appropriate template. (See *[binding to tag properties](#linked-tag-syntax@linkedproperties)*.)"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button><br/><br/>\n  <label><input type=\"checkbox\" data-link=\"isEditable\"/> Editable</label>\n  <ol>\n    {^{for members ^tmpl=isEditable?\"#memberEditTmpl\":\"#memberTmpl\" /}}\n  </ol>\n</script>\n\n<script id=\"memberTmpl\" type=\"text/x-jsrender\">\n  <li>\n    {{>name}}\n    <span class=\"remove\" data-link=\"{on ~root.removeMember #index}\"></span>\n  </li>\n</script>\n\n<script id=\"memberEditTmpl\" type=\"text/x-jsrender\">\n  <li>\n    <input data-link=\"name\"/>\n    <span class=\"remove\" data-link=\"{on ~root.removeMember #index}\"></span>\n  </li>\n</script>",
        "code": "var team = {\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"}\n  ],\n  isEditable: false,\n  addMember: function() {\n    $.observable(this.members).insert({name: \"new\" + cnt++})\n  },\n  removeMember: function(index) {\n    $.observable(this.members).remove(index);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", [{name: \"Peter\"}, {name: \"Octavia\"}, {name: \"Xavier\"}])\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);",
        "height": "160",
        "title": "",
        "anchor": "chgtmpl"
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-tag-syntax",
            "label": "Data-linked tags"
          },
          {
            "_type": "topic",
            "hash": "linked-paths",
            "label": "Data-linked paths"
          },
          {
            "_type": "topic",
            "hash": "fortag",
            "label": "JsRender: {{for ...}}"
          }
        ]
      }
    ]
  },
  "jsvpropstag": {
    "title": "Data-linked template tag: {^{props ...}}",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the `{^{props someExpression}}` tag is a data-bound version of the JsRender [`{{props ...}}`](#propstag) tag -- which iterates over the properties of the object returned by the expression.\n\nWhen using [data-linked templates](#linkedtmpls) the data-bound version will update automatically when the data in the expression changes observably, and will also update if the properties of the object itself change observably.\n\nThe following sample is functionally similar to the example given for [`{^{for ...}}`](#jsvfortag) -- but here instead of using a `members` array, it uses a `members` object -- a *dictionary by key of 'name' strings*: \n\n```js\nteam.members = {m1: \"Robert\", m2: \"Sarah\"}\n```\n\nAdding or removing properties on the `members` object triggers incremental updates of the `{^{props members}}` tag content. Replacing the `members` object triggers a complete update of the content.\n"
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
            "title": "",
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar team = {\n  members: {m1: \"Robert\", m2: \"Sarah\"},\n...\n```\n\n*<div class=\"close\">Template:</div>*\n\n```jsr\n...\n{^{props members}}\n  <li>... {{>prop}} ...</li>\n{{else}}\n  <li>There are no members</li>\n{{/props}}\n...\n```\n\nHere, the data-linked `{^{props members}}` tag updates incrementally when properties of the `members` object are added or removed, as in:\n\n```js\naddMember: function() {\n  $.observable(this.members).setProperty(\"n\" + cnt, \"new\" + cnt++);\n}, \n...\nremoveMember: function(key) {\n  $.observable(this.members).removeProperty(key);\n}\n```\n\nIt also updates if the whole `members` object is replaced, as in:\n\n```js\nreplaceMembers: function() {\n  $.observable(this).setProperty(\"members\", {m1: \"Peter\", ...});\n}\n```"
          }
        ],
        "html": "<style>li {list-style: none}</style>\n<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button>\n  <ul>\n    {^{props members}}\n      <li>\n        {^{:#index+1}}: {{>prop}}\n        <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\n      </li>\n    {{else}}\n      <li>There are no members</li>\n    {{/props}}\n  </ul>\n</script>\n",
        "code": "var team = {\n  members: {m1: \"Robert\", m2: \"Sarah\"},\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, \"new\" + cnt++);\n  }, \n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: \"Peter\", m2: \"Octavia\", m3: \"Xavier\"});\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);",
        "height": "130",
        "title": "{^{props ...}} &ndash; iterating over string properties "
      },
      {
        "_type": "para",
        "title": "",
        "text": "Inside the `{^{props members}}` tag, a block is rendered for each property, with as data context:\n\n```js\n{key: propertyName, prop: propertyValue}\n```\n\n-- so `{{>key}}` gives the key and `{{>prop}}` gives the value for that property.\n\nIf `members` was not a *dictionary of 'name' strings*, but instead a *dictionary of 'person' objects*, each with a `name` property, then we would write `{{>prop.name}}` to display the name for that 'person' property. \n\nHere is a modified version of the sample above, using this *dictionary of 'person' objects* approach:   "
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
            "title": "",
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n...\n```\n\n*<div class=\"close\">Template:</div>*\n\n```jsr\n...\n{^{props members}}\n  <li>{{>prop.name}} ...</li>\n{{/props}}\n...\n```"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button>\n  <ol>\n    {^{props members}}\n      <li>\n        {{>prop.name}}\n        <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\n      </li>\n    {{/props}}\n  </ol>\n</script>\n",
        "code": "var team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, {name: \"new\" + cnt++});\n  }, \n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: {name: \"Peter\"}, m2: {name: \"Octavia\"}, m3: {name: \"Xavier\"}});\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);",
        "height": "130",
        "title": "{^{props ...}} &ndash; iterating over object properties"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The above samples show adding and removing properties on the `members` object, but does not show observably modifying the value of an existing property. Here is an updated version using a *dictionary of strings* -- where you can also modify property values observably. \n\nTo render the value of the 'name' string property, we use the data-linked form: `{^{>prop}}` -- which updates automatically when the value of the property changes observably. \n"
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
            "title": "",
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar team = {\n  members: {m1: \"Robert\", m2: \"Sarah\"},\n...\n```\n\n*<div class=\"close\">Template:</div>*\n\n```jsr\n...\n{^{props members}}\n  <li>\n    <input data-link=\"prop\"/>\n    {^{>prop}} ...\n  </li>\n{{else}}\n  There are no members\n{{/props}}\n...\n```\n\nHere, the *Change* button modifies each of the properties of `members`:\n\n```js\nchangeMembers: function() {\n  for (var property in this.members) {\n    ...\n    $.observable(this.members).setProperty(property, ...);\n    ...\n```\n"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button>\n  <button data-link=\"{on changeMembers}\">Change</button>\n  <ol>\n    {^{props members}}\n      <li>\n        <input data-link=\"prop\"/>\n        {^{>prop}}\n        <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\n      </li>\n    {{else}}\n      There are no members\n    {{/props}}\n  </ol>\n</script>\n",
        "code": "var team = {\n  members: {m1: \"Robert\", m2: \"Sarah\"},\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, \"new\" + cnt++);\n  }, \n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: \"Peter\", m2: \"Octavia\", m3: \"Xavier\"});\n  },\n  changeMembers: function() {\n    for (var property in this.members) {\n      if (property !== $.expando) {\n        $.observable(this.members).setProperty(property, this.members[property] + cnt++);\n      }\n    }\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);",
        "title": "{^{props ...}} &ndash; with observably changing property values (strings)",
        "height": "140"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the same thing, but where members is a *dictionary of 'person' objects* -- so we use `{^{>prop^name}}` to render the `name`. This will update when the `name` property of the 'person' object changes (e.g. when typing into the textbox: `<input data-link=\"prop^name\"` />) or when a property of `members` is changed observably to a different 'person' object."
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
            "title": "",
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n...\n```\n\n*<div class=\"close\">Template:</div>*\n\n```jsr\n...\n{^{props members}}\n  <li>\n    <input data-link=\"prop^name\"/>\n    {^{>prop^name}} ...\n  </li>\n{{/props}}\n...\n```\n\nHere, the *Change* button modifies each of the properties of `members` -- assigning a different `person` object:\n\n```js\nchangeMembers: function() {\n  for (var property in this.members) {\n    ...\n    $.observable(this.members).setProperty(property, {name: ...});\n    ...\n```\n"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button>\n  <button data-link=\"{on changeMembers}\">Change</button>\n  <ol>\n    {^{props members}}\n      <li>\n        <input data-link=\"prop^name\"/>\n        {^{>prop^name}}\n        <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\n      </li>\n    {{/props}}\n  </ol>\n</script>\n",
        "code": "var team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, {name: \"new\" + cnt++});\n  }, \n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: {name: \"Peter\"}, m2: {name: \"Octavia\"}, m3: {name: \"Xavier\"}});\n  },\n  changeMembers: function() {\n    for (var property in this.members) {\n      if (property !== $.expando) {\n        $.observable(this.members).setProperty(property, {name: this.members[property].name + cnt++});\n      }\n    }\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);",
        "title": "{^{props ...}} &ndash; with observably changing property values (objects)",
        "height": "140"
      },
      {
        "_type": "para",
        "title": "More advanced use of {{props}} &ndash; {{jsonview/}}",
        "text": "An example of more advanced use of `{{props}}` is the sample custom tag control `{{jsonview}}`, available from [downloads/tag-controls](#download/tag-controls). That tag control uses `{^{props}}`, and recursively calls itself:\n\n```jsr\n{^{props}}\n  <li>\n    ...\n    {^{jsonview prop/}}...\n  </li>\n{{/props}}\n```\n\nThe `{{jsonview}}` tag control can be included in any JsViews page, to show the contextual data at that place in the page, or to show given data returned by an expression `{^{jsonview someExpression /}}`. Changes to the data will then update dynamically.\n\nIn the next sample we update the previous one, to include:\n\n- a data-linked `{^{jsonview/}}` control to show current data\n- allow the user to modify the key values in the members object, using `<input data-link=\"key\" />`\n- `{^{props}}...{{else}}...{{/props}}` to show a message if the members object is 'empty'\n\nThis sample is also available at [samples/tag-controls/jsonview](#samples/tag-controls/jsonview).",
        "anchor": "jsonview"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/jsonview/jsonview.js",
            "label": "jsonview.js"
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
            "_type": "para",
            "title": "",
            "text": "*<div class=\"close\">Template:</div>*\n\n```js\n...\n<ul>\n  {^{props members}}\n    <li>\n      ...\n      <input data-link=\"key\"/>\n      {^{>key}}\n      <input data-link=\"prop^name\"/>\n      {^{>prop^name}}\n      ...\n    </li>\n  {{else}}\n    ...\n  {{/props}}\n</ul>\n...\n{^{jsonview/}}\n...\n```\n"
          }
        ],
        "title": "",
        "height": "300",
        "sampleName": "",
        "url": "samples/tag-controls/jsonview/sample"
      },
      {
        "_type": "para",
        "title": "{^{props ...}} with dynamically changing template (advanced)",
        "text": "If `{{props}}` uses `tmpl=expression` to obtain a template from data or from a helper, then the data-linked `{^{props}}` can be used to drive updates when the template changes dynamically.\n\nHere it is in a sample (similar to the [corresponding sample](#jsvfortag@chgtmpl) using the `{^{for}}` tag). "
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
            "title": "",
            "text": "```jsr\n{^{props members ^tmpl=editable?\"#memberEditTmpl\":\"#memberTmpl\" /}}\n```\n\nHere the data-linked `{^{props}}` uses two different templates, driven by the `isEditable` property:\n\n```js\nvar team = {\n  members: [...],\n  isEditable: false,\n  ...\n```\n\n-- so thanks to the initial `^` in `^tmpl=...` the `{^{props}}` tag updates if `isEditable` changes -- and uses the appropriate template. (See *[binding to tag properties](#linked-tag-syntax@linkedproperties)*.)"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button><br/><br/>\n  <label><input type=\"checkbox\" data-link=\"isEditable\"/> Editable</label>\n  <ol>\n    {^{props members ^tmpl=isEditable?\"#memberEditTmpl\":\"#memberTmpl\" /}}\n  </ol>\n</script>\n\n<script id=\"memberTmpl\" type=\"text/x-jsrender\">\n  <li>\n    {{>prop.name}} \n    <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\n  </li>\n</script>\n\n<script id=\"memberEditTmpl\" type=\"text/x-jsrender\">\n  <li>\n    <input data-link=\"prop.name\"/>\n    <span class=\"remove\" data-link=\"{on ~root.removeMember #index}\"></span>\n  </li>\n</script>",
        "code": "var team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n  isEditable: false,\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, {name: \"new\" + cnt++})\n  },\n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: {name: \"Peter\"}, m2: {name: \"Octavia\"}, m3: {name: \"Xavier\"}})\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);",
        "height": "160",
        "title": "",
        "anchor": ""
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-tag-syntax",
            "label": "Data-linked tags"
          },
          {
            "_type": "topic",
            "hash": "linked-paths",
            "label": "Data-linked paths"
          }
        ]
      }
    ]
  },
  "jsviftag": {
    "title": "Data-linked template tag: {^{if ...}}",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the `{^{if someExpression}}` tag is a data-bound version of the JsRender [`{{if ...}}`](#iftag) tag, which renders a block conditionally based on the value of the expression.\n\nWhen using [data-linked templates](#linkedtmpls) the data-bound version will update automatically when the value of the expression changes observably.\n\nThe following sample is similar to one found at *[Samples: Data-linking {^{for}} and {^{if}}](#samples/data-link/for-and-if)*:\n"
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
            "markup": "Reverse name <input type=\"checkbox\" data-link=\"reverse\"/>\n\n{^{if reverse}}\n  <b>{{:last}}</b>, {{:first}}\n{{else}}\n  {{:first}} <b>{{:last}}</b>\n{{/if}}\n"
          }
        ],
        "url": "",
        "height": "80",
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label><input type=\"checkbox\" data-link=\"reverse\"/> Reverse name</label><br/><br/>\n\n  {^{if reverse}}\n    <b>{{:last}}</b>, {{:first}}\n  {{else}}\n    {{:first}} <b>{{:last}}</b>\n  {{/if}}\n</script>\n",
        "code": "var person = {\n  reverse: true,\n  first:\"Jeff\",\n  last: \"Adams\"\n};\n\nvar tmpl = $.templates(\"#personTemplate\");\n\ntmpl.link(\"#person\", person);\n\n",
        "title": "{^{if ...}}"
      },
      {
        "_type": "para",
        "title": "{^{if ...}}...{{else}}...{{/if}} with dynamically changing templates (advanced)",
        "text": "If the `{{if}}` or an associated `{{else}}` tag use template references, rather than inline markup, with `tmpl=expression` (obtaining a template from data or from a helper), then the data-linked `{^{if}}` can be used to drive updates when any of the templates change dynamically:"
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
            "title": "",
            "text": "```jsr\n  {^{if reverse ^tmpl=isEditable?'#editableReverseTmpl':'#noeditReverseTmpl'}}\n  {{else ^tmpl=isEditable?'#editableTmpl':'#noeditTmpl'}}\n  {{/if}}\n```\nHere the data-linked `{^{if}}` and the `{{else}}` each use two alternate templates, driven by the `isEditable` property:\n\n```js\nvar team = {\n  members: [...],\n  isEditable: false,\n  ...\n```\n\n-- so thanks to the initial `^` in `^tmpl=...` (see *[binding to tag properties](#linked-tag-syntax@linkedproperties)*), the `{^{if}}` and `{{else}}` blocks each update if the `isEditable` changes -- and use the appropriate template."
          }
        ],
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label><input type=\"checkbox\" data-link=\"isEditable\"/> Editable</label><br/>\n  <label><input type=\"checkbox\" data-link=\"reverse\"/> Reverse</label><br/><br/>\n\n  {^{if reverse ^tmpl=isEditable?'#editableReverseTmpl':'#noeditReverseTmpl'}}\n  {{else ^tmpl=isEditable?'#editableTmpl':'#noeditTmpl'}}\n  {{/if}}\n</script>\n\n<script id=\"editableReverseTmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"last\" />, <input data-link=\"first\" />\n</script>\n\n<script id=\"noeditReverseTmpl\" type=\"text/x-jsrender\">\n  <b>{{:last}}</b>, {{:first}}\n</script>\n\n<script id=\"editableTmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"first\" /> <input data-link=\"last\" />\n</script>\n\n<script id=\"noeditTmpl\" type=\"text/x-jsrender\">\n  {{:first}} <b>{{:last}}</b>\n</script>",
        "code": "var person = {\n  isEditable: true,\n  reverse: true,\n  first:\"Jeff\",\n  last: \"Adams\"\n};\n\nvar tmpl = $.templates(\"#personTemplate\");\n\ntmpl.link(\"#person\", person);\n\n",
        "height": "110",
        "title": ""
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-tag-syntax",
            "label": "Data-linked tags"
          },
          {
            "_type": "topic",
            "hash": "linked-paths",
            "label": "Data-linked paths"
          },
          {
            "_type": "topic",
            "hash": "iftag",
            "label": "JsRender: {{if ...}}"
          }
        ]
      }
    ]
  },
  "jsvelsetag": {
    "title": "Data-linked template tag: {{else ...}}",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the `{{else ...}}` tag is identical to the [`{{else ...}}`](#elsetag) tag used in JsRender, and acts as a separator for alternate content blocks, in as association with an `{{if}}`, `{{for}}` or `{{props}}` tag, or with any custom tag.\n\nIf the associated tag is data-linked, then the rendering of the `{{else}}` block can also be dynamically driven by observable data changes. See for example the first sample in the [`{^{if}}`](#jsviftag), [`{^{for}}`](#jsvfortag) and [`{^{props}}`](#jsvpropstag) topics\n\nIn each case rendering will switch dynamically to the `{{else}}` block when the data changes appropriately -- for example, in the case of `{^{for members}}...{{else})...{{/for}}`, when the members array is empty.\n\nThe following example shows an `{^{if}}` tag with multiple `{{else}}` blocks:\n"
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
            "title": "",
            "text": "*<div class=\"close\">Template:</div>*\n\n```jsr\n...\n{^{if type==='book'}}\n  The book price is {{>price}} \n{{else type==='car'}}\n  The car costs {{>price}}\n{{else}}\n  The price is {{>price}}\n{{/if}}\n...\n```\n\nNote that `{{else expression}}` behaves as *else if*, but it is not necessary to write `{^{else ...}}` -- since the dynamic data-linking is determined by the associated `{^{if ...}}` tag. "
          }
        ],
        "html": "<div id=\"object\"></div>\n\n<script id=\"objectTemplate\" type=\"text/x-jsrender\">\n  <select data-link=\"type\" size=\"3\">\n    <option value=\"\">Choose type</option>\n    <option>book</option>\n    <option>car</option>\n  </select><br/><br/>\n\n  <input data-link=\"type\" /><br/><br/>\n \n  {^{if type==='book'}}\n    The book price is {{>price}} \n  {{else type==='car'}}\n    The car costs {{>price}}\n  {{else}}\n    Nothing chosen\n  {{/if}}\n</script>\n",
        "code": "var object = {\n  type: \"car\",\n  price:\"$25000\"\n};\n\nvar tmpl = $.templates(\"#objectTemplate\");\n\ntmpl.link(\"#object\", object);\n\n",
        "title": "{^{: ...}}",
        "height": "160"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Similarly with `{{for ...}}` with multiple `{{else}}` blocks, the data-linked `{^{for ...}}` means that there is dynamic binding to expressions not only on the `{^{for}}` tag itself, but also on the `{{else}}` tags:"
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
            "title": "",
            "text": "*<div class=\"close\">Template:</div>*\n\n```jsr\n{^{for members}}\n  ...Member ... {{>name}}...\n{{else reserves}}\n  ...Reserve ... {{>name}}...\n{{else}}\n  ...No members or reserves...\n{{/for}}\n```\n\nHere, removing all `members` causes the `{{else reserves}}` block to be displayed. Then removing all `reserves` causes the final `{{else}}` block to be displayed."
          }
        ],
        "html": "<style>li {list-style: none}</style>\n<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <button data-link=\"{on addMember}\">Add member</button>\n  <button data-link=\"{on addReserve}\">Add reserve</button>\n  <ul>\n    {^{for members}}\n      <li>\n        Member {^{:#index + 1}}: {{>name}}\n        <span class=\"remove\" data-link=\"{on ~root.removeMember #index}\"></span>\n      </li>\n    {{else reserves}}\n      <li>\n        Reserve {^{:#index + 1}}: {{>name}}\n        <span class=\"remove\" data-link=\"{on ~root.removeReserve #index}\"></span>\n      </li>\n    {{else}}\n      <li>No members or reserves</li>\n    {{/for}}\n  </ul>\n</script>\n",
        "code": "var team = {\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"}\n  ],\n  reserves: [\n    {name: \"Xavier\"}\n  ],\n  addMember: function() {\n    $.observable(this.members).insert({name: \"new\" + cnt++});\n  },\n  addReserve: function() {\n    $.observable(this.reserves).insert({name: \"new\" + cnt++});\n  },\n  removeMember: function(index) {\n    $.observable(this.members).remove(index);\n  },\n  removeReserve: function(index) {\n    $.observable(this.reserves).remove(index);\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);",
        "height": "130"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For the case of `{^{if}}...{{else}}...{{/if}}` binding, with external template references, see the last [`{^{if}}` sample](#jsviftag), which uses the pattern:\n\n```jsr\n{^{if ... ^tmpl=...}}\n{{else ^tmpl=...}}\n{{/if}}\n```"
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-tag-syntax",
            "label": "Data-linked tags"
          },
          {
            "_type": "topic",
            "hash": "linked-paths",
            "label": "Data-linked paths"
          },
          {
            "_type": "topic",
            "hash": "elsetag",
            "label": "JsRender: {{else}}"
          }
        ]
      }
    ]
  },
  "jsvontag": {
    "title": "Data-linked template tag: {^{on ...}}",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the `{^{: ...}}` tag is a data-bound version of the JsRender [`{{: ...}}`](#assigntag) tag.\n\nWhen using [data-linked templates](#linkedtmpls) the data-bound version will update automatically when the data in the expression changes observably.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the `{^{props someExpression}}` tag is a data-bound version of the JsRender [`{{props ...}}`](#propstag) tag -- which iterates over the properties of the object returned by the expression.\n\nWhen using data-linked [templates](#linkedtmpls) the data-bound version will update automatically when the data in the expression changes observably, and will also update if the properties of the object itself change observably.\n\nThe following sample is functionally identical to the example given for [`{^{for ...}}`](#jsvfortag) -- but here instead of using a `members` array, it uses a `members` object.\n"
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
            "title": "",
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n...\n```\n\n*<div class=\"close\">Template:</div>*\n\n```jsr\n...\n{^{props members}}\n  <li>\n    {{:prop.name}} ...\n  </li>\n{{/props}}\n\n...\n```\n\nHere, the data-linked `{^{props}}` tag updates incrementally when the properties of the `members` object are added or removed, as in:\n\n```js\naddMember: function() {\n  $.observable(this.members).setProperty(\"n\" + cnt, {name: \"new\" + cnt++});\n}, \n...\nremoveMember: function(key) {\n  $.observable(this.members).removeProperty(key);\n}\n```\n\nand updates if the whole `members` object is replaced, as in:\n\n```js\nreplaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: {name: \"Peter\"} ...});\n}\n```"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button>\n  <ol>\n    {^{props members}}\n      <li>\n        {{:prop.name}} \n        <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\n      </li>\n    {{/props}}\n  </ol>\n</script>\n",
        "code": "var team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, {name: \"new\" + cnt++});\n  }, \n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: {name: \"Peter\"}, m2: {name: \"Octavia\"}, m3: {name: \"Xavier\"}});\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);",
        "title": "{^{: ...}}",
        "height": "120"
      },
      {
        "_type": "para",
        "title": "",
        "text": "If `{{props}}` uses `tmpl=expression` to obtain a template from data or from a helper, then the data-linked `{^{props}}` can be used to drive updates when the template changes dynamically:"
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
            "title": "",
            "text": "```jsr\n{^{props members ^tmpl=editable?\"#memberEditTmpl\":\"#memberTmpl\" /}}\n```\n\nHere the data-linked `{^{props}}` uses two different templates, driven by the `isEditable` property:\n\n```js\nvar team = {\n  members: [...],\n  isEditable: false,\n  ...\n```\n\n-- so thanks to the initial `^` in `^tmpl=...` (see *[binding to tag properties](#linked-tag-syntax@linkedproperties)*), the `{^{props}}` tag updates if the `isEditable` changes -- and uses the appropriate template."
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button><br/><br/>\n  <label>Editable <input type=\"checkbox\" data-link=\"isEditable\"/></label>\n  <ol>\n    {^{props members ^tmpl=isEditable?\"#memberEditTmpl\":\"#memberTmpl\" /}}\n  </ol>\n</script>\n\n<script id=\"memberTmpl\" type=\"text/x-jsrender\">\n  <li>\n    {{:prop.name}} \n    <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\n  </li>\n</script>\n\n<script id=\"memberEditTmpl\" type=\"text/x-jsrender\">\n  <li>\n    <input data-link=\"prop.name\"/>\n    <span class=\"remove\" data-link=\"{on ~root.removeMember #index}\"></span>\n  </li>\n</script>",
        "code": "var team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n  isEditable: false,\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, {name: \"new\" + cnt++})\n  },\n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: {name: \"Peter\"}, m2: {name: \"Octavia\"}, m3: {name: \"Xavier\"}})\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);",
        "height": "160",
        "title": "{^{for ...}} with dynamically changing template"
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-tag-syntax",
            "label": "Data-linked tags"
          },
          {
            "_type": "topic",
            "hash": "linked-paths",
            "label": "Data-linked paths"
          }
        ]
      }
    ]
  },
  "jsvcustomtags": {
    "title": "Data-linked custom tags",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the `{^{: ...}}` tag is a data-bound version of the JsRender [`{{: ...}}`](#assigntag) tag.\n\nWhen using [data-linked templates](#linkedtmpls) the data-bound version will update automatically when the data in the expression changes observably.\n"
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
            "title": "",
            "text": "```jsr\n{^{:manager^nickname || manager^name}}\n```\n\nData-linked tag updates when expression `manager^nickname || manager^name` changes<br/>-- i.e. when `manager.nickname`, `manager.name` or `manager` object change."
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n\n<button data-link=\"{on changeManager}\">Change manager</button><br/><br/>\n\n<em>Name:</em> <input data-link=\"manager^name\" /><br/>\n<em>Nickname:</em> <input data-link=\"manager^nickname\" /><br/><br/>\n\n<em>{^&lcub;:manager^nickname || manager^name}&rcub;:</em> <b>{^{:manager^nickname || manager^name}}</b>\n\n</script>",
        "code": "var team = {\n  person1: {\n    name: \"Peter\",\n    nickname: \"Pete\"\n  },\n  person2: {\n    name: \"Octavia\"\n  },\n  changeManager: function() {\n    $.observable(this).setProperty({\n      manager: this.manager === this.person1 ? this.person2 : this.person1\n    });\n  }\n};\n\nteam.manager = team.person1;\n\nvar tmpl = $.templates(\"#managerTmpl\");\n\ntmpl.link(\"#result\", team);",
        "title": "{^{: ...}}"
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-tag-syntax",
            "label": "Data-linked tags"
          },
          {
            "_type": "topic",
            "hash": "linked-paths",
            "label": "Data-linked paths"
          }
        ]
      }
    ]
  }
};