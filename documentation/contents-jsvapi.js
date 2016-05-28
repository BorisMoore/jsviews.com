﻿var content = $.views.documentation.content;

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
    "title": "$.views.tags()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "***Any JsRender template*** can be used with JsViews."
      },
      {
        "_type": "para",
        "title": "Data-linked templates",
        "text": "Calling the <a href=\"#rendertmpl\">`render()`</a> method works just the same within JsViews as it does if only JsRender is loaded. But alternatively you can use the <a href=\"#jsvlinktmpl\">`link()`</a> method -- which will first render and then add data binding (<em>data-link the template</em>).\n\nIf you have data-linked your template by calling the `link()` method, then you can continue to use the same <a href=\"#jsrtags\">JsRender template tags</a> as before. But now you optionally make any tag in the template [data-linked](#linked-tag-syntax), by replacing the `{{...` of the opening tag by `{^{...`, as in:\n\n```jsr\n{^{for people}}\n  {^{:name}}\n{{/for}}\n```\n\nIn addition, you can [*data-link* the HTML elements](#linked-elem-syntax) in your template, as in:\n\n```jsr\n<input data-link=\"name\" />\n<div data-link=\"css-color{:color} {:name}\"></div>\n```\n \nSee *[Data-link template syntax](#linked-template-syntax)* for details..."
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
        "text": "With JsViews, it is different. Here are the rules of what is valid, or invalid, within a JsViews template:\n\n- JsRender template tags which are outside HTML elements, or fully within the element content of an HTML element can remain unchanged in a JsViews template. They will work correctly. They can optionally be data-linked by simply adding a `^` character (so that for example a `{{for}}` tag becomes a data-linked `{^{for}}` tag) -- and in that case the rendered content will change dynamically whenever the bound data changes *['observably'](#$observable)*.\n- But tags which are within the markup of the actual HTML opening tag itself, whether placed between attributes, or spanning attributes, or within the attribute content (the text value of the attribute), will not be valid in a JsViews template.\n- Similarly, tags which wrap opening or closing tag in such a way as to produce 'mal-formed HTML' will not be valid.\n- In fact a valid JsViews template will have the tree hierarchy of nested HTML tags and nested template tags combining together, as it were, as a single well-formed tree.\n- In each of the invalid scenarios mentioned above, ***the JsRender tags needs to be replaced by corresponding data-linked element syntax***. See *[Data-link template syntax](#linked-template-syntax)* for details.\n"
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
        "code": "// Define a {{textbox}} tag - which allows editing, and has a toggleEdit() method\n$.views.tags({\n  textbox: {\n    init: function() {\n      var path = this.tagCtx.params.props.path + \" trigger=true\";\n\n      this.template = \"<input data-link='~tag.edit' type='checkbox'/> \"   // Checkbox to toggle edit\n      + \"<input data-link='visible{:~tag.edit} {:\" + path + \":}'/>\"       // <input> for editing\n      + \"<span data-link='visible{:!~tag.edit} {:\" + path + \"}'></span>\"; // <span> for rendering\n    },\n    toggleEdit: function() {\n      $.observable(this).setProperty(\"edit\", !this.edit);\n    }\n  }\n});\n\nvar tmpl = $.templates(\"#peopleTmpl\");\nvar model = {\n    people: [{name: \"Adriana\"}, {name: \"Robert\"}]\n  };\n\ntmpl.link(\"#peopleList\", model)\n  .on(\"click\", \"#toggleBtn\", function() {\n    var textBoxes = $.view(this).childTags(\"textbox\"); // Find all the {{textbox}} tags in the view\n    for (var i=0; i<textBoxes.length; i++) {\n      textBoxes[i].toggleEdit();                       // Toggle the edit mode for each of them\n    }\n  });",
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
        "text": "The full syntax allows you to bind multiple expressions each to a different target 'attrib', and is written like this: `data-link=\"attrib1{linkExpression1} attrib2{linkExpression2} ...\"`.\n\n`attrib` corresponds to the target -- such as the following:\n- HTML attribute (such as <code>title{...}</code>, <code>class{...}</code>, <code>id{...}</code>, <code>disabled{...}</code> or <code>data-foo{...}</code>)\n- CSS property (such as <code>css-background-color{...}</code>)\n- innerHTML (as in <code>html{...}</code>)\n- innerText (as in <code>text{...}</code>)\n- special targets like <code>visible{...}</code>\n- or can be missing altogether (as in <code>{...}</code>) in which case it stands for the default target for the element.\n\nThe default target for most elements is `innerText`, but for `input` and `select` elements it is `value`.\n\nThe linkExpression `{...}` is actually a *template tag*, such as `{{:a.b.c}}` or `{{myCustomTag .../}}`. *The difference from regular JsRender tag syntax is that with data-link expressions, **you only put a single curly brace to delimit, and you don't put the self-closing `/`**, which is assumed*.\n\nIn fact as long as the tag is self-closing, you can use any JsRender tag you want -- including custom tags.\n\nFor example, if you have a JsRender tag as content of an element: \n\n```jsr\n<div>{{for some.path tmpl='myForTmpl'}}</div>\n```\n\n-- then you can make it into a data-linked tag, using:\n\n```jsr\n<div>{^{for some.path tmpl='myForTmpl'}}</div>\n```\n\n-- or into a data-linked element, using:\n\n```jsr\n<div data-link=\"{for some.path tmpl='myForTmpl'}\" ></div>\n```\n\nSo examples would be: \n\n- `<div data-link=\"{:name}\"></div>` (one-way binding to `innerText` -- default target attrib -- so automatically HTML encodes).\n- `<div data-link=\"html{:name}\"></div>` (one-way binding to `innerHTML`)\n- `<div data-link=\"text{:name}\"></div>` (one-way binding to `innerText` -- equivalent to default above)\n- `<div data-link=\"html{>name}\"></div>` (one-way binding to `innerHTML` but with HTML encoding)\n- `<input data-link=\"{:name}\" >` (one-way binding to `value` -- default target attrib)\n- `<input data-link=\"value{:name}\" /&gt;` (one-way binding to `value`)\n- `<input data-link=\"title{:name}\" /&gt;` (one-way binding to the `title` attribute)\n- `<input data-link=\"{:name trigger=true:}\" /&gt;` (two-way binding to `value`, trigger on keydown) <br/>-- equivalent to abbreviated syntax: `<input data-link=\"name trigger=true\" /&gt;`\n- `<input data-link=\"{cvt:name:cvtBack}\" /&gt;` (two-way binding to `value`, with converters)\n- `<input data-link=\"{cvt:name trigger=true:cvtBack}\" /&gt;` (two-way binding to `value`, with converters, and trigger on keydown)\n- `<input data-link=\"{cvt:name:cvtBack} title{:info.description}\" /&gt;` (two-way binding to `value`, with converters and one-way binding to `title`)\n- `<img data-link=\"src{:'/myImagesFolder/' + fileName + '.png'}\" />` (one-way binding to `src` -- using an expression to build full path)\n- `<div data-link=\"{myCustomTag name}\"></div>` (data-linking -- and instantiating -- a JsViews custom tag control. Renders as `innerHTML` -- default target attrib for tags other than {: ...} -- so the control can insert HTML markup)\n- `<div data-link=\"text{myCustomTag name}\"></div>` (data-linking a JsViews custom tag control -- rendering as `innerText` -- so automatically HTML encodes)\n- `<svg><ellipse data-link=\"cx{:x} fill{:color}\"></ellipse>` (data-linking to attributes of an SVG element)",
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
        "text": "- There are many samples showing data-linking under [JsViews Samples](#samples/jsv).\n- See in particular this [tutorial sequence on data-linking](#samples/data-link)\n"
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
  "link-twoway": {
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
      },
      {
        "_type": "para",
        "title": "convert and convertBack",
        "text": "paragraph"
      },
      {
        "_type": "para",
        "title": "trigger",
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
  "link-tags": {
    "title": "Tag bindings",
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
        "text": "paragraph"
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
            "text": "*Markup:* \n\n```jsr\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <b>[[:title]]</b>\n  <ul>\n    [[for members]]\n      <li>Name: [*[:name>]] <input data-link=\"name trigger=true\"/></li>\n    [[/for]]\n  </ul>\n</script>\n```\n\n*Code*\n\n```js\n$.views.settings.delimiters(\"[[\", \"]]\", \"*\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n...\n```"
          }
        ],
        "html": "<div id=\"result\">\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <b>[[:title]]</b>\n  <ul>\n    [[for members]]\n      <li>Name: [*[:name]] <input data-link=\"name trigger=true\"/></li>\n    [[/for]]\n  </ul>\n</script>\n",
        "code": "$.views.settings.delimiters(\"[[\", \"]]\", \"*\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n\nvar team = {\n    title: \"A team\",\n    members: [{name: \"Jo\"}]\n  };\n\ntmpl.link(\"#result\", team);",
        "onlyJsRender": false,
        "height": "90",
        "title": "Choosing alternative tag delimiters, with JsViews"
      }
    ]
  },
  "jsvsettings/debugmode": {
    "title": "Debug mode",
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
    "title": "Trigger",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See [two-way binding](#link-twoway).\n\n***To get current default trigger setting:***\n\n```js\nvar defaultTrigger = $.views.settings.trigger(); // false by default\n```\n\n***To set the default trigger setting:***\n\n```js\n$.views.settings.trigger(...);\n```\n\nThe trigger setting can be set to any of the following:\n\n- `true` -- xxx\n- `'keyup'` -- xxx"
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
    "title": "Allow code (JsViews)",
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
            "label": "Advanced"
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
        "html": "<link href=\"change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"changeObjects\">Change data</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <input type=\"checkbox\" checked id=\"attach\"/>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
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
        "text": "As with *JsRender* above, to convert our template from using plain objects to using *View Model* objects, the only change we need to make is to add parens for our properties, which are now *getter/setter* functions.\n\nThis applies equally to data-link expressions, such as `<input data-link=\"address()^street() trigger=true\" >`.\n\n(*Note:* we also change `.` to `^` in paths if we want [deep path binding](#linked-paths@deep).)\n\n"
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
        "html": "<link href=\"change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"changeObjects\">Change data</button>\n  <button id=\"setObjects\">Call setters</button><br/>\n  <button id=\"swapObjects\">Swap address and phones</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name() trigger=true\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street() trigger=true\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <span class=\"floatleft\">{^{:number()}}</span>\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(Phone(phoneNo));\n}\n\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n// Instantiate View Model hierarchy\nvar alt = false,\n  address1 = Address(\"1st Ave\"),\n  phones1 = [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")],\n  address2 = Address(\"New Street\"),\n  phones2 = [Phone(\"123 123 1234\")],\n  person = Person(\"Pete\", address1, phones1);\n\n// Render and link the template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Observe specific properties on specific objects\n$.observe(person, \"name\", \"phones\", \"address\", person.phones(), person.address(), \"street\", changeHandler);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() { // Modify leaf values by observable changes of data\n  $.observable(person).setProperty(\"name\", person.name() + \"+\");\n  $.observable(person.address()).setProperty(\"street\", person.address().street() + \"+\");\n});\n\n$(\"#setObjects\").on(\"click\", function() { // Modify leaf values by calling setters\n  person.name(person.name() + \"*\");\n  person.address().street(person.address().street() + \"*\");\n});\n\n$(\"#swapObjects\").on(\"click\", function() {\n  // Swap the objects (optionally, remove our specific observers)\n  $.unobserve(person.address(), \"street\", changeHandler);\n  $.unobserve(person.phones(), changeHandler);\n\n  person.address(alt ? address1 : address2);\n  person.phones(alt ? phones1 : phones2);\n\n  // observe new objects object on specific paths (if not already observing)\n  $.observe(person.address(), \"street\", changeHandler);\n  $.observe(person.phones(), changeHandler);\n\n  alt = !alt;\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones()).insert(new Phone(\"456 456 4567\"));\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "title": "Using $.observe() to observe View Model objects"
      },
      {
        "_type": "para",
        "title": "Chained paths with plain objects or with View Model objects",
        "text": "With plain object hierarchies you can use [chained paths](#linked-paths) in both templates, and `observe()` paths:\n\n```jsr\n<input data-link=\"address^street trigger=true\" />\n```\n\n```js\n$.observe(person, \"address^street\", changeHandler);\n```\n\nBut for *View Model* hierarchies, you can only used chained paths in templates:\n\n```jsr\n<input data-link=\"address()^street() trigger=true\" />\n```\n\nFor the corresponding `$.observe()` calls you must pass in each *View Model* object and observe its properties, rather than using a chained path. Parens are not supported within `$.observe()` paths.\n\nSo you would write:\n\n```js\n$.observe(person, \"address\", changeHandler);\n$.observe(person.address(), \"street\", changeHandler);\n```\n\nor as a single call:\n\n```js\n$.observe(person, \"address\", person.address(), \"street\", changeHandler);\n```\n"
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
    "title": "Form elements",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "link-button": {
    "title": "button",
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
    "title": "element properties",
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
        "text": "Templates used in *JsViews* apps are regular *JsRender* templates, defined/registered in the usual way (see *[Using templates](#compiletmpl)*).\n\nHowever they can include data-linked tags (such as `{^{:name}}`) and data-linked elements (such as `<div data-link=\"name\" ...>`). See: *[Data-linked template syntax](#linked-template-syntax)*."
      }
    ]
  },
  "mvvm-views": {
    "title": "MVVM - Dynamic  view hierarchy",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
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
        "html": "<link href=\"change-log.css\" rel=\"stylesheet\"/>\n\n<div class=\"left\">\n  <button id=\"update\">Update</button>\n  <button id=\"revert\">Revert</button>\n  <button id=\"getData\">Get Data</button><br/>\n  <button id=\"changeName\">Change name</button>\n  <button id=\"addPhone\">Add Phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <input type=\"checkbox\" checked id=\"attach\"/>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\"/></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\"/></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table></script>",
        "code": "$.views.settings.trigger(true);\n\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone:{\n    getters: [\"number\"]\n  }\n});\n\nvar vmCollection = $.views.viewModels;\n\n// Method for Person class\nfunction addPhone(phoneNo) {               // Uses vmCollection.Phone() to construct new instance\n  $.observable(this.phones()).insert(vmCollection.Phone(phoneNo));\n}\n\n// First version of data (e.g. from JSON request):\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\n// Second version of data (e.g. from JSON request):\nvar personData2 = {\n  name: \"Peter\",\n  address: {street: \"2nd Ave\"},\n  phones: [{number: \"111 111 9999\"},{number: \"333 333 9999\"}]\n};\n\n// Instantiate View Model hierarchy, using map()\nvar person = vmCollection.Person.map(personData);\n\n// Render and link the template against person (Person instance)\ntmpl.link(\"#result\", person);\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  person.merge(personData2);\n});\n\n$(\"#revert\").on(\"click\", function() {\n  person.merge(personData);\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n$(\"#getData\").on(\"click\", function() {\n  var updatedPersonData = person.unmap();\n  window.alert(JSON.stringify(updatedPersonData));\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "400",
        "anchor": "mergesample2",
        "title": "Using merge() and unmap() &ndash; with two-way binding"
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
  }
};