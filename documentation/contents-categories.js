var content = $.views.documentation.content;

content.categories = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocCategories")) ||
[
  {
    "jsrender": {
      "loaded": true,
      "name": "home",
      "label": "JsRender",
      "heading": "Best-of-breed templating",
      "description": "Simple and intuitive, powerful and extensible, lightning fast",
      "key": "jsrender",
      "home": {
        "prefix": "jsr",
        "next": "jsrplaying",
        "leftsections": [
          {
            "_type": "para",
            "title": "Here's a first example of the power and simplicity of JsRender templates:",
            "text": ""
          },
          {
            "_type": "data",
            "title": "Some data:",
            "data": [
              {
                "name": "Robert",
                "nickname": "Bob",
                "showNickname": true
              },
              {
                "name": "Susan",
                "nickname": "Sue",
                "showNickname": false
              }
            ]
          },
          {
            "_type": "template",
            "title": "A template (with a conditional section using an {{if...}} tag):",
            "markup": "<div>\n   <em>Name:</em> {{:name}}\n   {{if showNickname}}\n      (Goes by <em>{{:nickname}}</em>)\n   {{/if}}\n</div>"
          }
        ],
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "<em>And a working demo, you can play with and modify:</em>"
          },
          {
            "_type": "sample",
            "typeLabel": "Sample:",
            "sectionTypes": {
              "para": "para",
              "data": "data",
              "template": "template",
              "code": "code",
              "sample": "sample",
              "links": "links"
            },
            "sections": [
              {
                "_type": "para",
                "title": "{{:name}}: ",
                "text": "Render the data"
              },
              {
                "_type": "para",
                "title": "{{if showNickname}}...{{/if}}",
                "text": "An <em>{{if}}</em> tag: Render the block content only if the expression is true..."
              }
            ],
            "data": [
              {
                "name": "Robert",
                "nickname": "Bob",
                "showNickname": true
              },
              {
                "name": "Susan",
                "nickname": "Sue",
                "showNickname": false
              }
            ],
            "markup": "<div>\n   <em>Name:</em> {{:name}}\n   {{if showNickname}}\n      (Goes by <em>{{:nickname}}</em>)\n   {{/if}}\n</div>",
            "onlyJsRender": true,
            "height": "85"
          }
        ],
        "title": ""
      }
    },
    "jsviews": {
      "loaded": true,
      "name": "home",
      "label": "JsViews",
      "heading": "The next-generation MVVM framework - bringing templates to life",
      "description": "The power of MVVM, the flexibilty of JavaScript, the speed and ease of JsRender templates",
      "key": "jsviews",
      "home": {
        "prefix": "jsv",
        "next": "jsvplaying",
        "leftsections": [
          {
            "_type": "code",
            "title": "The JsViews framework brings declarative data-binding to JsRender templates, supports MVVM and MVP (custom tag controls), and much more...<br/><br/>Here's a small example. We'll start with some data:",
            "code": "...\n{\n  \"name\": \"Robert\",\n  \"nickname\": \"Bob\",\n  \"showNickname\": true\n}\n..."
          },
          {
            "_type": "template",
            "title": "and a data-bound template:",
            "markup": "<div>\n  <em>Name:</em> {^{:name}}\n  {^{if showNickname}}\n    (Goes by <em data-link=\"nickname\"></em>)\n  {{/if}}\n</div>\n"
          },
          {
            "_type": "template",
            "title": "And within the template we will use two-way binding to allow editing of the underlying data:",
            "markup": "{^{if editable}}\n  <div>\n    <input data-link=\"name\"/>\n    <input data-link=\"nickname\"/>\n    <input type=\"checkbox\" data-link=\"showNickname\"/>\n  </div>\n{{/if}}\n"
          }
        ],
        "sections": [
          {
            "_type": "sample",
            "typeLabel": "Sample:",
            "sectionTypes": {
              "para": "para",
              "data": "data",
              "template": "template",
              "code": "code",
              "sample": "sample",
              "links": "links"
            },
            "sections": [
              {
                "_type": "para",
                "title": "{^{name}} ... {^{if showNickname}}...",
                "text": "These are data-bound tags. When the underlying data changes, the data-value within the rendered template automatically updates too."
              },
              {
                "_type": "para",
                "title": "",
                "text": "And change <em>{{if ...}}</em> to <em>{^{if ...}}</em> and it too will be data-bound. Now when the underlying data value or expression changes the whole rendered block content is automatically removed (or reinserted)."
              },
              {
                "_type": "para",
                "title": "&lt;em data-link=\"nickname\">",
                "text": "You can use element-based data-linking too. Here, the inner-text of the <em>&ltem></em> element is data-bound to the <em>nickname</em> data value."
              },
              {
                "_type": "para",
                "title": "&lt;input data-link=\"name\"/&gt;",
                "text": "And here, the input is automatically two-way data-bound to the <em>name</em> property of the underlying data. Change the value in the text box, and the underlying data automatically updates. Any other parts of the template that are data-linked to the same data property will then immediately update too."
              }
            ],
            "data": [
              {
                "name": "Robert",
                "nickname": "Bob",
                "showNickname": true
              },
              {
                "name": "Susan",
                "nickname": "Sue",
                "showNickname": false
              }
            ],
            "markup": "",
            "onlyJsRender": false,
            "height": "106",
            "html": "<div id=\"result\"></div>\n\n<script id=\"theTmpl\" type=\"text/x-jsrender\">\n<div>\n  Edit: <input type=\"checkbox\" data-link=\"editable\"/>\n  <em>Name:</em> {^{:name}}\n  {^{if showNickname}}\n    (Goes by <em data-link=\"nickname\"></em>)\n  {{/if}}\n  {^{if editable}}\n    <div>\n      <input data-link=\"name\"/>\n      <input data-link=\"nickname\"/>\n      <input type=\"checkbox\" data-link=\"showNickname\"/>\n    </div>\n  {{/if}}\n</div>\n\n</script>",
            "code": "var data = [\n  {\n    \"name\": \"Robert\",\n    \"nickname\": \"Bob\",\n    \"showNickname\": true\n  },\n  {\n    \"name\": \"Susan\",\n    \"nickname\": \"Sue\",\n    \"showNickname\": false\n  }\n];\n\nvar template = $.templates(\"#theTmpl\");\n\ntemplate.link(\"#result\", data);"
          }
        ]
      }
    },
    "jsobservable": {
      "loaded": true,
      "name": "home",
      "label": "JsObservable",
      "heading": "Live observable data in the browser",
      "description": "Code and declarative data-binding working hand-in-hand, adding interactivity and responsiveness to your single-page apps",
      "key": "jsobservable",
      "home": {
        "prefix": "jso",
        "next": "getstarted",
        "leftsections": [
          {
            "_type": "para",
            "title": "The JsObservable library is part of JsViews.",
            "text": "It is used by JsViews to provide the declarative data-binding. And it also allows your code in a JsViews app to trigger data changes, or to 'observe' data-changes programmatically."
          },
          {
            "_type": "code",
            "title": "We'll add some code to a \"declarative\" JsViews sample. Take some data, and a data-bound template:",
            "code": "var people = [\n  {name: \"Adriana\"},\n  {name: \"Robert\"}\n];"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{for people}}\n  ...\n  <button class=\"change\">Change</button>\n  ...\n{{/for}}"
          },
          {
            "_type": "code",
            "title": "And add some button click handlers which call JsObservable APIs to make observable changes to the underlying data:",
            "code": "$(\"#result\")\n  .on(\"click\", \".change\", function(){\n    var dataItem = $.view(this).data;\n    $.observable(dataItem).setProperty(\"name\", ...);\n  })\n  .on(\"click\", \".remove\", function(){\n    var index = $.view(this).index;\n    $.observable(people).remove(index);\n  });\n"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.observable(people).insert(people.length, {name: ...});\n"
          }
        ],
        "sections": [
          {
            "_type": "sample",
            "typeLabel": "Sample:",
            "sectionTypes": {
              "para": "para",
              "data": "data",
              "template": "template",
              "code": "code",
              "sample": "sample",
              "links": "links"
            },
            "sections": [
              {
                "_type": "para",
                "title": " $.observable(object).setProperty(...);",
                "text": "<em>$.observable(dataItem)</em> makes dataItem <em>\"observable\"</em>, by providing a <em>setProperty(...)</em> method. The changes you make will be \"observed\" by the declarative data-binding in the template."
              },
              {
                "_type": "para",
                "title": "$.observable(array).insert(...);",
                "text": "<em>$.observable(people)</em> makes the people array <em>\"observable\"</em>, by providing methods like <em>insert(...)</em> and <em>remove(...)</em>. The array changes you make will also be \"observed\" by data-bound elements and tags in the template - such as the <em>{^{for people}}</em> tag. Here the rendered block content of the tag will be incrementally added/removed for each added/removed array item - in response to your change."
              },
              {
                "_type": "para",
                "title": "",
                "text": "<em>$.view(elem)</em> allows you to get from any DOM element to the 'view' object for that part of the rendered content, and hence to the underlying data, index, etc."
              }
            ],
            "data": {},
            "markup": "",
            "onlyJsRender": false,
            "height": "175",
            "html": "<table><tbody id=\"result\"></tbody></table>\n\n<script id=\"theTmpl\" type=\"text/x-jsrender\">\n  <tr><td>\n    <button id=\"addBtn\">Add</button>\n  </td></tr>\n  {^{for people}}\n    <tr><td>\n      <button class=\"change\">Change</button>\n      <button class=\"remove\">X</button>\n      {^{:name}} \n    </td></tr>\n  {{/for}}\n</script>",
            "code": "var template = $.templates(\"#theTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar counter = 1;\n\ntemplate.link(\"#result\", {people: people});\n\n$(\"#addBtn\").on(\"click\", function(){\n  $.observable(people).insert(people.length, {name: \"name\" + counter++});\n})\n\n$(\"#result\")\n  .on(\"click\", \".change\", function(){\n    var dataItem = $.view(this).data;\n    $.observable(dataItem).setProperty(\"name\", dataItem.name + \"*\");\n  })\n  .on(\"click\", \".remove\", function(){\n    var index = $.view(this).index;\n    $.observable(people).remove(index);\n  });"
          }
        ]
      }
    }
  },
  {
    "name": "getstarted",
    "label": "Getting started",
    "heading": "Getting Started",
    "description": "First steps with JsRender, JsViews and JsObservable",
    "categories": [
      {
        "name": "jsrplaying",
        "label": "Playing with JsRender"
      },
      {
        "name": "jsvplaying",
        "label": "Playing with JsViews"
      }
    ],
    "expanded": true
  },
  {
    "hidden": true,
    "name": "explore",
    "label": "Explore",
    "heading": "Concepts and Tutorials",
    "description": "Getting a fuller understanding of JsRender, JsViews and JsObservable",
    "categories": [
      {
        "name": "data",
        "label": "Data",
        "categories": [
          {
            "name": "objectsorvm",
            "label": "Plain objects or View Model"
          },
          {
            "name": "ajax",
            "label": "Ajax requests"
          },
          {
            "name": "observabledata",
            "label": "Observable data"
          },
          {
            "name": "computed",
            "label": "Computed observables"
          },
          {
            "name": "dependencies",
            "label": "Declaring dependencies"
          }
        ],
        "expanded": true
      },
      {
        "name": "templates",
        "label": "Templates",
        "categories": [
          {
            "name": "composition",
            "label": "Composition"
          }
        ],
        "expanded": true
      },
      {
        "name": "views",
        "label": "Views",
        "categories": [
          {
            "name": "viewhierarchy",
            "label": "View hierarchy"
          }
        ],
        "expanded": true
      },
      {
        "name": "renderorlink",
        "label": "Rendering versus linking",
        "categories": [
          {
            "name": "renderasstring",
            "label": "String-based rendering"
          },
          {
            "name": "linkingtohtml",
            "label": "Data-binding to HTML"
          },
          {
            "name": "data-link",
            "label": "Element-based: data-link"
          },
          {
            "name": "inlinebinding",
            "label": "Inline tag binding"
          }
        ],
        "expanded": true
      },
      {
        "name": "helpers",
        "label": "Providing helpers",
        "categories": [
          {
            "name": "registerhelper",
            "label": "Registering helpers"
          },
          {
            "name": "passhelper",
            "label": "Passing in helpers"
          },
          {
            "name": "helperpaths",
            "label": "Helper paths"
          }
        ],
        "expanded": true
      },
      {
        "name": "converters",
        "label": "Converters",
        "categories": [
          {
            "name": "jsr-converter",
            "label": "converters in JsRender",
            "expanded": true
          },
          {
            "name": "jsv-converter",
            "label": "converters in JsViews",
            "categories": [
              {
                "name": "jsv-converter1way",
                "label": "one-way binding converter"
              },
              {
                "name": "jsv-converterback",
                "label": "2-way binding - convert back"
              }
            ],
            "expanded": true
          }
        ],
        "expanded": true
      },
      {
        "name": "customtags",
        "label": "Custom tags",
        "categories": [
          {
            "name": "jsrcustomtags",
            "label": "JsRender custom tags"
          },
          {
            "name": "tagsascontrols",
            "label": "Custom tags as controls"
          }
        ],
        "expanded": true
      },
      {
        "name": "tagexpressions",
        "label": "Tag expressions",
        "categories": [
          {
            "name": "allowcode",
            "label": "Allow code?"
          },
          {
            "name": "expressions",
            "label": "Expressions"
          },
          {
            "name": "expressions/datapath",
            "label": "Data paths"
          },
          {
            "name": "expressions/helperpath",
            "label": "Helper paths"
          },
          {
            "name": "expressions/viewpath",
            "label": "View paths"
          }
        ],
        "expanded": true
      },
      {
        "name": "linkobservedispose",
        "label": "Linking, observing, disposing"
      },
      {
        "name": "tagcontrols",
        "label": "Tag Controls",
        "categories": [
          {
            "name": "taghierarchy",
            "label": "Tag hierarchy"
          },
          {
            "name": "taglifecycle",
            "label": "Tag lifecycle"
          },
          {
            "name": "tagmethods",
            "label": "Tag methods and properties"
          }
        ],
        "expanded": true
      },
      {
        "name": "mvvm-mvp",
        "label": "MVVM and MVP"
      }
    ],
    "expanded": true
  },
  {
    "name": "jsrapi",
    "label": "JsRender API - Templated UI",
    "heading": "JsRender API documentation",
    "description": "Detailed API docs on using JsRender templates",
    "categories": [
      {
        "name": "jsrtags",
        "label": "Template tags",
        "categories": [
          {
            "name": "assigntag",
            "label": "{{: ...}}"
          },
          {
            "name": "htmltag",
            "label": "{{> ...}}"
          },
          {
            "name": "includetag",
            "label": "{{include ...}}"
          },
          {
            "name": "fortag",
            "label": "{{for ...}}"
          },
          {
            "name": "iftag",
            "label": "{{if ...}}"
          },
          {
            "name": "elsetag",
            "label": "{{else ...}}"
          },
          {
            "name": "commenttag",
            "label": "{{!-- ... --}}"
          },
          {
            "name": "customtagsapi",
            "label": "Custom tags"
          }
        ],
        "expanded": true
      },
      {
        "name": "rendertmpl",
        "label": "Render a template",
        "categories": [
          {
            "name": "tmplrender",
            "label": "template.render()"
          },
          {
            "name": "$render",
            "label": "$.render.myTmpl()"
          },
          {
            "name": "$()render",
            "label": "$(\"#myTmpl\").render()"
          }
        ],
        "expanded": true
      },
      {
        "name": "compiletmpl",
        "label": "Compile/register/get a template",
        "categories": [
          {
            "name": "$templates",
            "label": "$.templates()"
          }
        ],
        "expanded": true
      },
      {
        "name": "jsrregister",
        "label": "Register helpers, converters, tags...",
        "categories": [
          {
            "name": "converters()",
            "label": "$.views.converters()",
            "categories": [
              {
                "name": "html()",
                "label": "$.views.converters.html()"
              },
              {
                "name": "attr()",
                "label": "$.views.converters.attr()"
              },
              {
                "name": "url()",
                "label": "$.views.converters.url()"
              }
            ],
            "expanded": true
          },
          {
            "name": "tags()",
            "label": "$.views.tags()"
          },
          {
            "name": "helpers()",
            "label": "$.views.helpers()"
          }
        ],
        "expanded": true
      },
      {
        "hidden": true,
        "name": "jsrobjects",
        "label": "JsRender objects",
        "categories": [
          {
            "name": "viewsobject",
            "label": "$.views object",
            "categories": [
              {
                "name": "settingsobject",
                "label": "$.views.settings object"
              },
              {
                "name": "subobject",
                "label": "$.views.sub object"
              }
            ],
            "expanded": true
          },
          {
            "name": "templateobject",
            "label": "template object"
          },
          {
            "name": "viewobject",
            "label": "view object"
          },
          {
            "name": "tagobject",
            "label": "tag object"
          },
          {
            "name": "viewcontextobject",
            "label": "view context object"
          },
          {
            "name": "tagcontextobject",
            "label": "tag context object"
          }
        ],
        "expanded": true
      }
    ],
    "expanded": true
  },
  {
    "hidden": true,
    "name": "jsvapi",
    "label": "JsViews API - Data-driven UI",
    "heading": "JsViews API documentation",
    "description": "Detailed API docs on using JsViews for dynamic data-driven sites, or MVVM",
    "categories": [
      {
        "name": "jsvtags",
        "label": "Template tags",
        "expanded": true
      },
      {
        "name": "jsvrendertmpl",
        "label": "Render a template",
        "expanded": true
      },
      {
        "name": "jsvlinktmpl",
        "label": "Render and link a template",
        "categories": [
          {
            "name": "jsvtmpllink",
            "label": "template.link()"
          },
          {
            "name": "jsv$link",
            "label": "$.link()"
          },
          {
            "name": "jsv$()link",
            "label": "$(...).link()"
          }
        ],
        "expanded": true
      },
      {
        "name": "jsvunlink",
        "label": "Unlink a template",
        "categories": [
          {
            "name": "jsvtmplunlink",
            "label": "template.unlink()"
          },
          {
            "name": "jsv$unlink",
            "label": "$.unlink()"
          },
          {
            "name": "jsv$()unlink",
            "label": "$(...).unlink()"
          }
        ],
        "expanded": true
      },
      {
        "name": "$view",
        "label": "Access views",
        "categories": [
          {
            "name": "jsv$view",
            "label": "$.view()"
          },
          {
            "name": "jsv$()view()",
            "label": "$(...).view()"
          }
        ],
        "expanded": true
      },
      {
        "name": "jsvcompiletmpl",
        "label": "Compile/register/get a template",
        "expanded": true
      },
      {
        "name": "jsvregister",
        "label": "Register helpers, converters, tags...",
        "categories": [
          {
            "name": "jsvconverters()",
            "label": "$.views.converters()",
            "expanded": true
          },
          {
            "name": "jsvtags()",
            "label": "$.views.tags()"
          },
          {
            "name": "jsvhelpers()",
            "label": "$.views.helpers()"
          }
        ],
        "expanded": true
      },
      {
        "name": "jsvtagcontrols",
        "label": "Custom Tags - Tag Controls"
      },
      {
        "name": "jsvobjects",
        "label": "JsViews objects",
        "categories": [
          {
            "name": "jsvviewsobject",
            "label": "$.views object",
            "expanded": true
          },
          {
            "name": "jsvtemplateobject",
            "label": "template object"
          },
          {
            "name": "jsvviewobject",
            "label": "view object"
          },
          {
            "name": "jsvtagobject",
            "label": "tag object"
          },
          {
            "name": "jsvviewcontextobject",
            "label": "View context object"
          },
          {
            "name": "jsvtagcontextobject",
            "label": "Tag context object"
          },
          {
            "name": "jsvlinkcontextobject",
            "label": "Link context object"
          }
        ],
        "expanded": true
      }
    ],
    "expanded": true
  },
  {
    "hidden": true,
    "name": "jsoapi",
    "label": "JsObservable API - Observing data",
    "heading": "JsObservable API documentation",
    "description": "Detailed API docs on using JsObservable for observing or triggering data changes in a single-page app",
    "categories": [
      {
        "name": "propchange",
        "label": "Modify an object observably",
        "categories": [
          {
            "name": "setprop",
            "label": "$.observable(object).setProperty()"
          }
        ],
        "expanded": true
      },
      {
        "name": "arrchange",
        "label": "Modify an array observably",
        "categories": [
          {
            "name": "insert",
            "label": "$.observable(array).insert()"
          },
          {
            "name": "remove",
            "label": "$.observable(array).remove()"
          },
          {
            "name": "refresh",
            "label": "$.observable(array).refresh()"
          },
          {
            "name": "move",
            "label": "$.observable(array).move()"
          }
        ],
        "expanded": true
      },
      {
        "name": "observeobjectsarrays",
        "label": "Observe objects and arrays",
        "categories": [
          {
            "name": "onpropchange",
            "label": "onPropertyChange",
            "categories": [
              {
                "name": "propchangehandler",
                "label": "PropertyChangeEventHandler"
              },
              {
                "name": "propchangeevargs",
                "label": "PropertyChangeEventArguments"
              }
            ],
            "expanded": true
          },
          {
            "name": "onarrchange",
            "label": "onArrayChange"
          },
          {
            "name": "observe",
            "label": "$.observable.observe()"
          },
          {
            "name": "unobserve",
            "label": "unobserve()"
          }
        ],
        "expanded": true
      }
    ],
    "expanded": true
  },
  {
    "name": "samples",
    "label": "Samples",
    "heading": "Samples for JsRender, JsViews or JsObservable",
    "description": "Examples of some of the ways you can use JsRender templates, JsViews tag controls, and more",
    "categories": [
      {
        "name": "samples/jsr",
        "label": "JsRender",
        "categories": [
          {
            "name": "samples/jsr/converters",
            "label": "Converters and encoding"
          },
          {
            "name": "samples/jsr/composition",
            "label": "Template composition",
            "categories": [
              {
                "name": "samples/jsr/composition/tmpl",
                "label": "tmpl parameter"
              },
              {
                "name": "samples/jsr/composition/subtemplates",
                "label": "Using sub-templates"
              },
              {
                "name": "samples/jsr/composition/tmplobjects",
                "label": "Contextual template objects"
              }
            ],
            "expanded": true
          },
          {
            "name": "samples/jsr/tags",
            "label": "Custom tags",
            "categories": [
              {
                "name": "samples/jsr/tags/wrap-content",
                "label": "Wrapping content"
              },
              {
                "name": "samples/jsr/tags/extend-for",
                "label": "Extending for"
              }
            ],
            "expanded": true
          },
          {
            "name": "samples/jsr/helpers",
            "label": "Helpers"
          },
          {
            "name": "samples/jsr/paths",
            "label": "Paths"
          }
        ],
        "expanded": true
      },
      {
        "hidden": true,
        "name": "samples/jso",
        "label": "JsObservable"
      },
      {
        "name": "samples/jsv",
        "label": "JsViews",
        "categories": [
          {
            "name": "samples/jsv/converters",
            "label": "Converters",
            "categories": [
              {
                "name": "samples/converters/twoway",
                "label": "Two-way binding and converters"
              },
              {
                "name": "samples/converters/formels",
                "label": "Form elements and converters"
              }
            ],
            "expanded": true
          },
          {
            "name": "samples/tagcontrols",
            "label": "Tag controls",
            "categories": [
              {
                "name": "samples/tagcontrols/tabs",
                "label": "tabs control"
              },
              {
                "name": "samples/tagcontrols/multiselect",
                "label": "Multiselect"
              }
            ],
            "expanded": true
          }
        ],
        "expanded": true
      }
    ],
    "expanded": true
  },
  {
    "name": "download",
    "label": "Downloads",
    "heading": "Downloading JsViews, JsRender and JsObservable",
    "description": "",
    "categories": [
      {
        "name": "download/latest",
        "label": "Latest version",
        "expanded": true
      },
      {
        "name": "download/specific",
        "label": "Specific versions",
        "expanded": true
      }
    ],
    "expanded": true
  },
  {
    "name": "download",
    "label": "Downloads",
    "heading": "Downloading JsViews, JsRender and JsObservable",
    "description": "",
    "categories": [
      {
        "name": "download/specific",
        "label": "Specific versions",
        "expanded": true
      }
    ],
    "expanded": true
  },
  {
    "name": "community",
    "label": "JsViews Community",
    "heading": "JsViews and JsRender Community",
    "description": "Viewing the source code, filing bugs or feature requests...",
    "categories": [
      {
        "name": "github",
        "label": "GitHub",
        "expanded": true
      }
    ],
    "expanded": true
  },
  {
    "name": "links",
    "label": "Links",
    "heading": "Learning more",
    "description": "Learning more - external links...",
    "categories": [
      {
        "name": "learning",
        "label": "Learning",
        "expanded": true
      },
      {
        "name": "blogs",
        "label": "Blogs",
        "expanded": true
      }
    ],
    "expanded": true
  }
];