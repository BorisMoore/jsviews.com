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
        "text": "<em><small>(Work in progress. Other topics to follow...)</small></em>"
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvtemplatetags",
            "label": "Template tags"
          },
          {
            "hash": "linked-template-syntax",
            "label": "Data-link template syntax"
          },
          {
            "hash": "jsvlinktmpl",
            "label": "Render and link a template"
          },
          {
            "hash": "toplink",
            "label": "Top-level data-linking"
          },
          {
            "hash": "link-targets",
            "label": "Data-link targets"
          },
          {
            "hash": "link-attributes-props",
            "label": "Target attributes / properties"
          },
          {
            "hash": "jsvunlink",
            "label": "Unlink a template"
          },
          {
            "hash": "$view",
            "label": "Views: from UI to data"
          },
          {
            "hash": "jsvcompiletmpl",
            "label": "Compile/register/get a template"
          },
          {
            "hash": "jsvregister",
            "label": "Register helpers, converters, tags..."
          },
          {
            "hash": "jsvtagcontrols",
            "label": "Custom Tags - Tag Controls"
          },
          {
            "hash": "jsvobjects",
            "label": "JsViews objects"
          }
        ]
      }
    ]
  },
  "jsvtags": {
    "title": "$.views.tags()",
    "path": "",
    "sections": []
  },
  "jsvlinktmpl": {
    "title": "Render and data-link a template",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The `link(container, data, helpersOrContext)` is similar to the `render(data, helpersOrContext)` method, but in addition to rendering the template, it also inserts the rendered output as content of the target HTML `container` element, and then *data-links* (data-binds to *observable* data) the HTML content to the underlying data.\n\nThe `link(container, data, helpersOrContext)` method takes as parameters the target HTML container element (or jQuery selector), the data (used as the <em>'data context'</em> during the rendering and linking), and optionally additional metadata or contextual helpers. It returns a jQuery object corresponding to the container element.\n\nThere are two ways of calling the `link()` method:\n- If you have a reference to the <em>template object</em> - `myTmpl`, call [myTmpl.link(...)](#jsvtmpllink)\n- If you have registered the template by name - `\"myTmpl\"`, call [$.link.myTmpl(...)](#jsv.d.link)\n"
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
            "text": "```jsr\n<td>{^{:name}}</td>\n<td><input data-link=\"name trigger=true\" /></td>\n```\n\n```js\nvar myTmpl = $.templates(\"#personTmpl\");\n\nmyTmpl.link(\"#person\", person);\n```"
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td>{^{:name}}</td>\n    <td><input data-link=\"name trigger=true\" /></td>\n  </tr>\n</script>",
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
        "html": "<button id=\"add\">Add person</button>\n\n<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td>{^{:name}}</td>\n    <td><input data-link=\"name trigger=true\" /></td>\n  </tr>\n</script>",
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
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n    <td><input data-link=\"name trigger=true\" /></td>\n  </tr>\n</script>",
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
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <tr>\n    <td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n    <td><input data-link=\"name trigger=true\" /></td>\n  </tr>\n</script>",
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
        "text": "Each instance of a rendered template or a template block tag is associated with a JsViews *\"view\"* object.\n\nUse `$.view()` to get from the rendered HTML back to the data. \n\n"
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
        "text": "Each instance of a rendered template or a template block tag is associated with a JsViews *\"view\"* object.\n\nViews provide information on how the underlying data objects map to the rendered UI.\n\n**From UI back to data:**\n\nUse `$.view(elemOrSelector)` to get from a DOM element to the corresponding `view` object for that part of the rendered content.\n\nFrom the `view` you can get to the underlying `data`, the `index`, etc."
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
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar app = {\n    people: people\n  };\n\nmyTemplate.link(\"#peopleList\", app);\n\n$(\".changeBtn\").on(\"click\", function() {\n  var view = $.view(this); // From the clicked HTML element ('this'), get the view object\n  var person = view.data;  // The 'person' data object for clicked button\n  var index = view.index;  // The index of this 'item view'. (Equals index of person in people array)\n  $.observable(person).setProperty(\"name\", person.name + \" \" + index); // Change the person.name\n});",
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
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "***Any JsRender template*** can be used with JsViews.\n\nCalling the <a href=\"#rendertmpl\">`render()`</a> method works just the same within JsViews as it does if only JsRender is loaded. But alternatively you can use the <a href=\"#jsvlinktmpl\">`link()`</a> method -- which will first render and then add data binding (<em>data-link the template</em>).\n\nIf you have data-linked your template by calling the `link()` method, then you can continue to use the same <a href=\"#jsrtags\">JsRender template tags</a> as before. But now you optionally make any tag in the template [data-linked](#linked-tag-syntax), by replacing the `{{...` of the opening tag by `{^{...`, as in:\n\n```jsr\n{^{for people}}\n  {^{:name}}\n{{/for}}\n```\n\nIn addition, you can [*data-link* the HTML elements](#linked-elem-syntax) in your template, as in:\n\n```jsr\n<input data-link=\"name\" />\n<div data-link=\"css-color{:color} {:name}\"></div>\n```\n \nSee *[Data-link template syntax](#linked-template-syntax)* for details..."
      },
      {
        "_type": "para",
        "title": "But in JsViews templates, your template must be well-formed:",
        "text": "JsRender is different. If you are only using JsRender (so no 'HTML-aware data-binding'), you have a lot of freedom. You can even do this:"
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
        "text": "That works because JsRender is pure string-based rendering, it doesn't mind how you mix you JsRender tag hierarchy with the HTML tag markup."
      },
      {
        "_type": "para",
        "title": "Rules for a well-formed template in JsViews:",
        "text": "With JsViews, it is different. Here are the rules of what is valid, or invalid, within a JsViews template:\n<ul class=\"textbefore\"><li>JsRender template tags which are outside HTML elements, or fully within the element content of an HTML element can remain unchanged in a JsViews template. They will work correctly. They can optionally be data-linked by simply adding a <code>^</code> character (so that for example a <code>{{for}}</code> tag becomes a data-linked <code>{^{for}}</code> tag) -- and in that case the rendered content will change dynamically whenever the bound data changes <em>'observably'</em>.</li>\n<li>But tags which are within the markup of the actual HTML opening tag itself, whether placed between attributes, or spanning attributes, or within the attribute content (the text value of the attribute), will not be valid in a JsViews template.</li>\n<li>Similarly, tags which wrap opening or closing tag in such a way as to produce 'mal-formed HTML' will not be valid.</li>\n<li>In fact a valid JsViews template will have the tree hierarchy of nested HTML tags and nested template tags combining together, as it were, as a single well-formed tree.</li>\n<li>In each of the invalid scenarios mentioned above, <b><em>the JsRender tags needs to be replaced by corresponding data-linked element syntax</em></b>. See <a href=\"#linked-template-syntax\">the next section</a>, for details.</li></ul>\n"
      }
    ]
  },
  "jsvhelpers": {
    "title": "$.views.helpers()",
    "path": "",
    "sections": []
  },
  "jsvtagcontrols": {
    "title": "Custom Tags - Tag Controls",
    "path": "",
    "sections": []
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
    "title": "view object",
    "path": "",
    "sections": []
  },
  "jsvtagobject": {
    "title": "tag object",
    "path": "",
    "sections": []
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
    "title": "Data-link template syntax",
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
            "text": "*Template:*\n\n```jsr\n...\n{^{for members}}\n  <li>\n    {^{:name}} <img class=\"remove\" .../>\n  </li>\n{{/for}}\n...\n```\n\n*Code:*\n\n```js\n...\n$.templates(\"#teamTemplate\").link(\"#team\", team) ...\n```"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n\n<div class=\"buttons\">\n  <button id=\"add\">Add</button>\n</div>\n<ol>\n  {^{for members}}\n    <li>\n      {^{:name}} \n      <span class=\"remove\"></span>\n    </li>\n  {{/for}}\n</ol>\n\n</script>\n",
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
        "text": "In the sample we went one step further than shown above. We added data-linking to the `start` and `end` <em>named properties</em> of the `{{range}}` tag:\n\n```jsr\n{^{range members ^start=start-1 ^end=end}}\n```\n\nThe prefixed `^` on the name: `^start=...` is used to specify that the `start` 'named property' is to be data-linked. Change the value (using the drop-down in the sample) and you see that the displayed range updates automatically.\n\nBy default named properties are not data-linked. (This is made 'opt-in' for perf optimization reasons.)"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "- JsViews API topic: <a href=\"#linked-elem-syntax\">Data-linked elements</a>\n- Tutorial sequence of samples: <a href=\"#samples/data-link\">Data-linking tags and elements</a>\n"
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
            "title": "A data-linked input element (two-way data-binding)",
            "markup": "<input data-link=\"name\"/>"
          },
          {
            "_type": "template",
            "title": "Two-way data-binding with update triggered on every key down",
            "markup": "<input data-link=\"name trigger=true\"/>"
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
        "markup": "<input data-link=\"name\"/> <i>(Update on blur)</i><br/>\n<input data-link=\"name trigger=true\"/> <i>(Update on keydown)</i><br/>\n<span data-link=\"name\" class=\"spanbox\"></span>\n{^{:name}}\n",
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
        "text": "In fact the examples of data-linked elements above correspond to simple cases, where you can use abbreviated syntax. For more powerful or complex data-linking to elements, you can use the full syntax."
      },
      {
        "_type": "para",
        "title": "Abbreviated syntax is just a data-path or expression that you are binding to:",
        "text": "```jsr\n<span data-link=\"pathOrExpression\"></span>\n```\n\nFor example:\n\n```jsr\n<span data-link=\"name\"></span>\n<span data-link=\"address.street\"></span>\n<span data-link=\"~someHelper.computed() > 1\"></span>\n```"
      },
      {
        "_type": "para",
        "title": "The corresponding full syntax is a data-linked <code>{{: ...}}</code> tag",
        "text": "In fact it is short for this full syntax:\n\n```jsr\n<span data-link=\"{:pathOrExpression}\"></span>\n```\n\n-- which is a data-linked version of the familiar JsRender tag: <em><a href=\"#assigntag\">`{{:pathOrExpression}}`</a></em>. \n\nExamples:\n\n```jsr\n<span data-link=\"{:name}\"></span>\n<span data-link=\"{:address.street}\"></span>\n<span data-link=\"{:~someHelper.computed() > 1}\"></span>\n\n<input data-link=\"{:name:}\"/>\n<input data-link=\"{:name trigger=true:}\"/>\n```"
      },
      {
        "_type": "para",
        "title": "Optional two-way data-binding",
        "text": "Notice the full syntax for the `<input>` has an additional `:` before the `}` at the end. It corresponds to the two-way data binding. (The same applies to other *'user input elements'* such as `select`, `textarea` etc. (and also *[content editable elements](#)*). \n\nYou can provide both convert and convertBack converters if you want. (See the *[Two-way binding and converters](#samples/form-els/converters)* sample):\n\n```jsr\n<input data-link=\"{myConverter:some.data.path:myConvertBack}\"/>\n\n<select data-link=\"{myConverter:some.data.path:myConvertBack}\">...</select>\n```\n\nAnd in addition, whenever you have two-way binding, you can optionally include  `trigger=true` to specify updating for every character entry (after keydown):\n\n```jsr\n<textarea data-link=\"{myConverter:some.data.path trigger=true:myConvertBack}\">...</select>\n```\n\nIf you want only one-way binding (from the data to the `<input>`) you simply eliminate the `:` at the end:\n\n```jsr\n<input data-link=\"{:some.data.path}\"/>\n```"
      },
      {
        "_type": "para",
        "title": "Full syntax - multiple targets, multiple tags, multiple bindings...",
        "text": "The full syntax allows you to bind multiple expressions each to a different target 'attrib', and is written like this: `data-link=\"attrib1{linkExpression1} attrib2{linkExpression2} ...\"`.\n\n`attrib` corresponds to the target -- such as the following:\n- HTML attribute (such as <code>title{...}</code>, <code>class{...}</code>, <code>id{...}</code>, <code>disabled{...}</code> or <code>data-foo{...}</code>)\n- CSS property (such as <code>css-background-color{...}</code>)\n- innerHTML (as in <code>html{...}</code>)\n- innerText (as in <code>text{...}</code>)\n- special targets like <code>visible{...}</code>\n- or can be missing altogether (as in <code>{...}</code>) in which case it stands for the default target for the element.\n\nThe default target for most elements is `innerText`, but for `input` and `select` elements it is `value`.\n\nThe linkExpression `{...}` is actually a *template tag*, such as `{{:a.b.c}}` or `{{myCustomTag .../}}`. *The difference from regular JsRender tag syntax is that with data-link expressions, **you only put a single curly brace to delimit, and you don't put the self-closing `/`**, which is assumed*.\n\nIn fact as long as the tag is self-closing, you can use any JsRender tag you want -- including custom tags.\n\nFor example, if you have a JsRender tag as content of an element: \n\n```jsr\n<div>{{for some.path tmpl='myForTmpl'}}</div>\n```\n\n-- then you can make it into a data-linked tag, using:\n\n```jsr\n<div>{^{for some.path tmpl='myForTmpl'}}</div>\n```\n\n-- or into a data-linked element, using:\n\n```jsr\n<div data-link=\"{for some.path tmpl='myForTmpl'}\" ></div>\n```\n\nSo examples would be: \n\n- `<div data-link=\"{:name}\"></div>` (one-way binding to `innerText` -- default target attrib -- so automatically HTML encodes).\n- `<div data-link=\"html{:name}\"></div>` (one-way binding to `innerHTML`)\n- `<div data-link=\"text{:name}\"></div>` (one-way binding to `innerText` -- equivalent to default above)\n- `<div data-link=\"html{>name}\"></div>` (one-way binding to `innerHTML` but with HTML encoding)\n- `<input data-link=\"{:name}\" >` (one-way binding to `value` -- default target attrib)\n- `<input data-link=\"value{:name}\" /&gt;` (one-way binding to `value`)\n- `<input data-link=\"title{:name}\" /&gt;` (one-way binding to the `title` attribute)\n- `<input data-link=\"{:name trigger=true:}\" /&gt;` (two-way binding to `value`, trigger on keydown) <br/>-- equivalent to abbreviated syntax: `<input data-link=\"name trigger=true\" /&gt;`\n- `<input data-link=\"{cvt:name:cvtBack}\" /&gt;` (two-way binding to `value`, with converters)\n- `<input data-link=\"{cvt:name trigger=true:cvtBack}\" /&gt;` (two-way binding to `value`, with converters, and trigger on keydown)\n- `<input data-link=\"{cvt:name:cvtBack} title{:info.description}\" /&gt;` (two-way binding to `value`, with converters and one-way binding to `title`)\n- `<img data-link=\"src{:'/myImagesFolder/' + fileName + '.png'}\" />` (one-way binding to `src` -- using an expression to build full path)\n- `<div data-link=\"{myCustomTag name}\"></div>` (data-linking a JsViews custom tag control -- rendering as `innerHTML` -- default target attrib for tags other than {: ...} -- so can insert HTML markup)\n- `<div data-link=\"text{myCustomTag name}\"></div>` (data-linking a JsViews custom tag control -- rendering as `innerText` -- so automatically HTML encodes)"
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
            "text": "```jsr\nShow: <input data-link=\"show\" type=\"checkbox\"/>\n<b data-link=\"{if show tmpl='show this'}{else tmpl='no show'}\"></b>\n```\n\n```js\n$.link(true, \"body\", {show: true});\n```"
          }
        ],
        "html": "Show: <input data-link=\"show\" type=\"checkbox\"/>\n<b data-link=\"{if show tmpl='show this'}{else tmpl='no show'}\"></b>\n",
        "code": "$.link(true, \"body\", {show: true});\n\n",
        "height": "40",
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
        "text": "<ul>\n<li>There are many samples showing data-linking under <a href=\"#samples/jsv\">JsViews Samples</a></li>\n<li>See in particular this <a href=\"#samples/data-link\">tutorial sequence on data-linking</a></li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "<ul>\n<li>JsViews API topic: <a href=\"#linked-tag-syntax\">Data-linked tags</a></li>\n<li>Tutorial sequence of samples: <a href=\"#samples/data-link\">Data-linking tags and elements</a></li>\n</ul>"
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
            "text": "Top-level content:\n\n```jsr\n<div id=\"group\">\n  <input type=\"checkbox\" />\n  ...\n```\n\nAdd two-way data-linking to `<input>`s\n\n```jsr\n<input data-link=\"isCEO\" type=\"checkbox\" />...\n<input data-link=\"first trigger=true\" />...\n```\n\nAdd data-linking to `<div>`s and `<span>`s etc.\n\n```jsr\n<div id=\"group\" data-link=\"css-color{:isCEO ? 'red' : 'blue'}\">...\n<div data-link=\"{for employees tmpl='nameTmpl'}\">...\n```\n\nActivate, using `$.link(true, ...)`\n\n```js\n$.link(true, \"#group\", person, helpers);\n```\n\n(Could have used alternative syntax: `$(\"#group\").link(true, person, helpers);`)"
          }
        ],
        "html": "<style>input {margin-bottom:10px;}</style>\n\n<div id=\"group\" data-link=\"css-color{:isCEO ? 'green' : 'blue'}\">\n  <input data-link=\"first trigger=true\" />\n  <input data-link=\"last trigger=true\" />\n  CEO <input data-link=\"isCEO\" type=\"checkbox\" /><br/>\n\n  <span data-link=\"~nameLabel + first + ' ' + last\" ></span>\n  <b data-link=\"visible{:isCEO}\">and I am CEO!</b>\n\n  <div data-link=\"visible{:isCEO}\"><br/>\n    <b>Employees:</b>\n    <div data-link=\"{for employees tmpl='nameTmpl'}\"></div> \n  </div>\n</div>\n",
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
        "html": "<div id=\"group\"> \n  CEO: <input class=\"ceo\" type=\"checkbox\"/>\n  <span id=\"notCeo\"></span><br/><br/> \n\n  <b>Employees:</b> \n\n  <div id=\"employees\"></div> \n</div>\n",
        "code": "$.templates(\"nameTmpl\", \"<div>Name: {{:first}} {{:last}}</div>\");\n\nvar person = {\n  isCEO: true,\n  employees: [\n    {first: \"Mary\", last: \"A\"},\n    {first: \"Hank\", last: \"B\"}\n  ]};\n\n$.link(\n  \"css-color{:isCEO ? 'green' : 'blue'}\", // expression\n  \"#group\", // target\n  person // data\n);\n\n$.link(\n  \"isCEO\", // expression\n  \"input.ceo\", // target\n  person // data\n);\n\n$.link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  \"#employees\", // target\n  person // data\n);\n\n$.link(\n  \"visible{:!isCEO} {:~message}\", // expression\n \"#notCeo\", // target\n  person, // data \n  {message: \"Not CEO!\"} // helpers\n);\n",
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
        "html": "<div id=\"group\"> \n  CEO: <input class=\"ceo\" type=\"checkbox\"/>\n  <span id=\"notCeo\"></span><br/><br/> \n\n  <b>Employees:</b> \n\n  <div id=\"employees\"></div> \n</div>\n",
        "code": "$.templates(\"nameTmpl\", \"<div>Name: {{:first}} {{:last}}</div>\");\n\nvar person = {\n  isCEO: true,\n  employees: [\n    {first: \"Mary\", last: \"A\"},\n    {first: \"Hank\", last: \"B\"}\n  ]};\n\n$(\"#group\").link(\n  \"css-color{:isCEO ? 'green' : 'blue'}\", // expression\n  person // data\n);\n\n$(\"input.ceo\").link(\n  \"isCEO\", // expression\n  person // data\n);\n\n$(\"#employees\").link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  person // data\n);\n\n$(\"#notCeo\").link(\n  \"visible{:!isCEO} {:~message}\", // expression\n  person, // data \n  {message: \"Not CEO!\"} // helpers\n);\n",
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
  "twoway": {
    "title": "Two-way binding",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Data-linked input",
        "text": "paragraph"
      },
      {
        "_type": "para",
        "title": "Data-linked textarea",
        "text": "paragraph"
      },
      {
        "_type": "para",
        "title": "Data-linked select",
        "text": "paragraph"
      },
      {
        "_type": "para",
        "title": "Data-linked content-editable elements",
        "text": "paragraph"
      },
      {
        "_type": "para",
        "title": "Custom tags with two-way binding",
        "text": "paragraph"
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
            "text": "```jsr\n<input data-link=\"manager.address.ZIP trigger=true\" />\n\n{^{if manager.address.ZIP}}\n  ZIP: {^{:manager.address.ZIP}}\n{{/if}}\n```\n\nModify leaf: template values update in response:\n```js\n$.observable(team.manager.address).setProperty({\n  \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n});\n```\n\nChange manager: template values do *not* update:\n```js\n$.observable(team).setProperty({\n  manager: team.manager === person1 ? person2 : person1\n});\n```\n\n\n"
          }
        ],
        "html": "<div class=\"left\">\n  <button id=\"modifyLeaf\">Change leaf values</button>\n  <button id=\"changeManager\">Change manager</button>\n  <div id=\"result\"></div>\n</div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n\n<input data-link=\"manager.address.ZIP trigger=true\" />\n\n{^{if manager.address.ZIP}}\n  ZIP: {^{:manager.address.ZIP}}\n{{/if}}\n\n<hr/>\n\nManager: {^{if manager === person1}}person1{{else}}person2{{/if}}\n\n</script>",
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
            "text": "```jsr\n<input data-link=\"manager^address.ZIP trigger=true\" />\n\n{^{if manager^address.ZIP}}\n  ZIP: {^{:manager^address.ZIP}}\n{{/if}}\n```\n\nModify leaf or manager: template values all update correctly in response\n"
          }
        ],
        "html": "<div class=\"left\">\n  <button id=\"modifyLeaf\">Change leaf values</button>\n  <button id=\"changeManager\">Change manager</button>\n  <div id=\"result\"></div>\n</div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n\n<input data-link=\"manager^address.ZIP trigger=true\" />\n\n{^{if manager^address.ZIP}}\n  ZIP: {^{:manager^address.ZIP}}\n{{/if}}\n\n<hr/>\n\nManager: {^{if manager === person1}}person1{{else}}person2{{/if}}\n\n</script>",
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
        "html": "<div class=\"left\">\n  <button id=\"modifyLeaf\">Change leaf values</button>\n  <button id=\"changeAddress\">New address</button>\n  <button id=\"UKAddress\">UK address</button>\n  <button id=\"changeManager\">Change manager</button>\n  <div id=\"result\"></div>\n</div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"manager^name trigger=true\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"manager^address.street trigger=true\" /></td></tr>\n    <tr>\n      {^{if manager^address.ZIP}}\n        <td>ZIP:</td><td><input data-link=\"manager^address.ZIP trigger=true\" /></td>\n       {{else}}\n      <td colspan=\"2\">UK address - No ZIP</td>\n      {{/if}}\n    </tr>\n  </tbody></table>\n</script>",
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
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-input": {
    "title": "input (textbox - checkbox - radio)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-select": {
    "title": "select",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-textarea": {
    "title": "textarea",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-contenteditable": {
    "title": "content-editable",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-widgets": {
    "title": "jQuery UI widgets",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-custom": {
    "title": "custom tags",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-svg": {
    "title": "SVG elements",
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
    "title": "CSS attributes",
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
    "title": "innerText / innerHTML",
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
    "title": "class",
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
    "title": "visibility",
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
  "link-attributes-props": {
    "title": "Target attributes / properties",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "contextual-params": {
    "title": "Contextual template parameters",
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
        "text": "paragraph"
      }
    ]
  },
  "tag-bindings": {
    "title": "Data-link tag bindings",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "{for}, {if}, custom bindings"
      }
    ]
  }
};