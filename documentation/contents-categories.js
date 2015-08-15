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
            "markup": "<div>\n   <em>Name:</em> {{:name}}\n   {{if showNickname && nickname}}\n      (Goes by <em>{{:nickname}}</em>)\n   {{/if}}\n</div>"
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
                "title": "{{if showNickname && nickname}}...{{/if}}",
                "text": "An <em>{{if}}</em> tag: Render the block content only if the expression (<em>showNickname && nickname</em>) is true..."
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
            "markup": "<div>\n   <em>Name:</em> {{:name}}\n   {{if showNickname && nickname}}\n      (Goes by <em>{{:nickname}}</em>)\n   {{/if}}\n</div>",
            "onlyJsRender": true,
            "height": "85"
          }
        ],
        "title": ""
      },
      "loading": ""
    },
    "jsviews": {
      "loaded": true,
      "name": "home",
      "label": "JsViews",
      "heading": "The next-generation MVVM framework - bringing templates to life",
      "description": "The power of MVVM, the flexibility of JavaScript, the speed and ease of JsRender templates",
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
            "markup": "<div>\n  <em>Name:</em> {^{:name}}\n  {^{if showNickname && nickname}}\n    (Goes by <em data-link=\"nickname\"></em>)\n  {{/if}}\n</div>\n"
          },
          {
            "_type": "template",
            "title": "And within the template we will use two-way binding to allow editing of the underlying data:",
            "markup": "{^{if editable}}\n  <div>\n    <input data-link=\"name trigger=true\"/>\n    <input data-link=\"nickname trigger=true\"/>\n    <input type=\"checkbox\" data-link=\"showNickname\"/>\n  </div>\n{{/if}}\n"
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
              "links": "links"
            },
            "sections": [
              {
                "_type": "para",
                "title": "{^{name}} ... {^{if showNickname && nickname}}...",
                "text": "These are data-bound tags. When the underlying data changes the data-value within the rendered template automatically updates too."
              },
              {
                "_type": "para",
                "title": "",
                "text": "Changing <em>{{if ...}}</em> to <em>{^{if ...}}</em> makes it data-bound. Now, when the underlying data value or expression changes the whole rendered block content is automatically removed or reinserted."
              },
              {
                "_type": "para",
                "title": "&lt;em data-link=\"nickname\">",
                "text": "You can use element-based data-linking too. Here, the inner-text of the <em>&ltem></em> element is data-bound to the <em>nickname</em> data value."
              },
              {
                "_type": "para",
                "title": "&lt;input data-link=\"name trigger=true\"/&gt;",
                "text": "And here, the input is automatically two-way data-bound to the <em>name</em> property of the underlying data. Change the value in the text box, and the underlying data automatically updates. Any other parts of the template that are data-linked to the same data property will then immediately update too."
              },
              {
                "_type": "para",
                "title": "",
                "text": "Include 'trigger=true', and updates will happen as you type, not just when you leave the textbox."
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
            "html": "<div id=\"result\"></div>\n\n<script id=\"theTmpl\" type=\"text/x-jsrender\">\n<div>\n  Edit: <input type=\"checkbox\" data-link=\"editable\"/>\n  <em>Name:</em> {^{:name}}\n  {^{if showNickname && nickname}}\n    (Goes by <em data-link=\"nickname\"></em>)\n  {{/if}}\n  {^{if editable}}\n    <div>\n      <input data-link=\"name trigger=true\"/>\n      <input data-link=\"nickname trigger=true\"/>\n      <input type=\"checkbox\" data-link=\"showNickname\"/>\n    </div>\n  {{/if}}\n</div>\n\n</script>",
            "code": "var data = [\n  {\n    \"name\": \"Robert\",\n    \"nickname\": \"Bob\",\n    \"showNickname\": true\n  },\n  {\n    \"name\": \"Susan\",\n    \"nickname\": \"Sue\",\n    \"showNickname\": false\n  }\n];\n\nvar template = $.templates(\"#theTmpl\");\n\ntemplate.link(\"#result\", data);"
          }
        ]
      },
      "loading": ""
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
            "code": "$(\"#result\")\n  .on(\"click\", \".change\", function() {\n    var dataItem = $.view(this).data;\n    $.observable(dataItem).setProperty(\"name\", ...);\n  })\n  .on(\"click\", \".remove\", function() {\n    var index = $.view(this).index;\n    $.observable(people).remove(index);\n  });\n"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.observable(people).insert({name: ...});\n"
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
              "links": "links"
            },
            "sections": [
              {
                "_type": "para",
                "title": " $.observable(object).setProperty(...);",
                "text": "<em>$.observable(dataItem)</em> makes dataItem <em>\"observable\"</em>, by providing a <em>setProperty(...)</em> method.Use <em>setProperty</em> to change a value, and the change will be \"observed\" by the declarative data-binding in the template."
              },
              {
                "_type": "para",
                "title": "$.observable(array).insert(...);",
                "text": "<em>$.observable(people)</em> makes the people array <em>\"observable\"</em>, by providing methods like <em>insert(...)</em> and <em>remove(...)</em>. Use them to make changes to arrays, and the changes will be \"observed\" by data-bound elements and tags in the template - such as the <em>{^{for people}}</em> tag. Here the rendered block content of the tag will be incrementally added/removed for each added/removed array item - in response to your change."
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
            "code": "var template = $.templates(\"#theTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar counter = 1;\n\ntemplate.link(\"#result\", {people: people});\n\n$(\"#addBtn\").on(\"click\", function() {\n  $.observable(people).insert({name: \"name\" + counter++});\n})\n\n$(\"#result\")\n  .on(\"click\", \".change\", function() {\n    var dataItem = $.view(this).data;\n    $.observable(dataItem).setProperty(\"name\", dataItem.name + \"*\");\n  })\n  .on(\"click\", \".remove\", function() {\n    var index = $.view(this).index;\n    $.observable(people).remove(index);\n  });"
          }
        ]
      },
      "loading": ""
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
    "name": "explore",
    "label": "Explore",
    "heading": "Concepts and Tutorials",
    "description": "Getting a fuller understanding of JsRender, JsViews and JsObservable",
    "categories": [
      {
        "name": "explore/data",
        "label": "Data",
        "categories": [
          {
            "name": "explore/objectsorvm",
            "label": "Plain objects or View Model"
          },
          {
            "name": "explore/ajax",
            "label": "Ajax requests",
            "hidden": true
          },
          {
            "name": "explore/observabledata",
            "label": "Observable data",
            "hidden": true
          },
          {
            "name": "explore/computed",
            "label": "Computed observables",
            "hidden": true
          },
          {
            "name": "explore/dependencies",
            "label": "Declaring dependencies",
            "hidden": true
          }
        ],
        "expanded": true
      },
      {
        "name": "explore/templates",
        "label": "Templates",
        "categories": [
          {
            "name": "explore/composition",
            "label": "Composition"
          },
          {
            "name": "explore/jQueryTemplates",
            "label": "Migrating from jQuery Templates"
          }
        ],
        "expanded": true,
        "hidden": true
      },
      {
        "name": "explore/views",
        "label": "Views",
        "categories": [
          {
            "name": "explore/viewhierarchy",
            "label": "View hierarchy"
          }
        ],
        "expanded": true,
        "hidden": true
      },
      {
        "name": "explore/renderorlink",
        "label": "Rendering versus linking",
        "categories": [
          {
            "name": "explore/renderasstring",
            "label": "String-based rendering"
          },
          {
            "name": "explore/linkingtohtml",
            "label": "Data-binding to HTML"
          },
          {
            "name": "explore/data-link",
            "label": "Element-based: data-link"
          },
          {
            "name": "explore/inlinebinding",
            "label": "Inline tag binding"
          }
        ],
        "expanded": true,
        "hidden": true
      },
      {
        "name": "explore/helpers",
        "label": "Providing helpers",
        "categories": [
          {
            "name": "explore/registerhelper",
            "label": "Registering helpers"
          },
          {
            "name": "explore/passhelper",
            "label": "Passing in helpers"
          },
          {
            "name": "explore/helperpaths",
            "label": "Helper paths"
          }
        ],
        "expanded": true,
        "hidden": true
      },
      {
        "name": "explore/converters",
        "label": "Converters",
        "categories": [
          {
            "name": "explore/jsr-converter",
            "label": "converters in JsRender",
            "expanded": true
          },
          {
            "name": "explore/jsv-converter",
            "label": "converters in JsViews",
            "categories": [
              {
                "name": "explore/jsv-converter1way",
                "label": "one-way binding converter"
              },
              {
                "name": "explore/jsv-converterback",
                "label": "2-way binding - convert back"
              }
            ],
            "expanded": true
          }
        ],
        "expanded": true,
        "hidden": true
      },
      {
        "name": "explore/customtags",
        "label": "Custom tags",
        "categories": [
          {
            "name": "explore/jsrcustomtags",
            "label": "JsRender custom tags"
          },
          {
            "name": "explore/tagsascontrols",
            "label": "Custom tags as controls"
          }
        ],
        "expanded": true,
        "hidden": true
      },
      {
        "name": "explore/tagexpressions",
        "label": "Tag expressions",
        "categories": [
          {
            "name": "explore/allowcode",
            "label": "Allow code?"
          },
          {
            "name": "explore/expressions",
            "label": "Expressions"
          },
          {
            "name": "explore/expressions/datapath",
            "label": "Data paths"
          },
          {
            "name": "explore/expressions/helperpath",
            "label": "Helper paths"
          },
          {
            "name": "explore/expressions/viewpath",
            "label": "View paths"
          }
        ],
        "expanded": true,
        "hidden": true
      },
      {
        "name": "explore/linkobservedispose",
        "label": "Linking, observing, disposing",
        "hidden": true
      },
      {
        "name": "explore/tag-controls",
        "label": "Tag Controls",
        "categories": [
          {
            "name": "explore/taghierarchy",
            "label": "Tag hierarchy"
          },
          {
            "name": "explore/taglifecycle",
            "label": "Tag lifecycle"
          },
          {
            "name": "explore/tagmethods",
            "label": "Tag methods and properties"
          }
        ],
        "expanded": true,
        "hidden": true
      },
      {
        "name": "explore/mvvm-mvp",
        "label": "MVVM and MVP",
        "hidden": true
      },
      {
        "name": "explore/interop",
        "label": "Using with other librairies",
        "categories": [
          {
            "name": "explore/nojquery",
            "label": "JsRender without jQuery"
          },
          {
            "name": "explore/globalvars",
            "label": "Global variables"
          },
          {
            "name": "explore/delimiters",
            "label": "Choosing delimiters"
          }
        ],
        "expanded": true,
        "hidden": true
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
            "name": "propstag",
            "label": "{{props ...}}"
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
            "name": "allowcodetag",
            "label": "{{* ... }} and {{*: ...}}"
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
            "name": "d.render",
            "label": "$.render.myTmpl()"
          },
          {
            "name": "db.render",
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
            "name": "d.templates",
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
            "name": "converters",
            "label": "$.views.converters()",
            "categories": [
              {
                "name": "html",
                "label": "$.views.converters.html()"
              },
              {
                "name": "attr",
                "label": "$.views.converters.attr()"
              },
              {
                "name": "url",
                "label": "$.views.converters.url()"
              }
            ],
            "expanded": true
          },
          {
            "name": "tags",
            "label": "$.views.tags()"
          },
          {
            "name": "helpers",
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
      },
      {
        "name": "nojqueryapi",
        "label": "JsRender without jQuery",
        "hidden": true
      },
      {
        "name": "jsrsettings",
        "label": "Settings",
        "hidden": true
      }
    ],
    "expanded": true
  },
  {
    "name": "jsvapi",
    "label": "JsViews API - Data-driven UI",
    "heading": "JsViews API documentation",
    "description": "Detailed API docs on using JsViews for dynamic data-driven sites, or MVVM",
    "categories": [
      {
        "name": "jsvtemplatetags",
        "label": "Template tags",
        "expanded": true
      },
      {
        "name": "linked-template-syntax",
        "label": "Data-link template syntax",
        "expanded": true,
        "categories": [
          {
            "name": "linked-tag-syntax",
            "label": "Data-linked tags"
          },
          {
            "name": "linked-elem-syntax",
            "label": "Data-linked elements"
          }
        ]
      },
      {
        "name": "jsvrendertmpl",
        "label": "Render a template",
        "expanded": true,
        "hidden": true
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
            "name": "jsv.d.link",
            "label": "$.link()"
          },
          {
            "name": "jsv.db.link",
            "label": "$(...).link()"
          }
        ],
        "expanded": true,
        "hidden": true
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
            "name": "jsv.d.unlink",
            "label": "$.unlink()"
          },
          {
            "name": "jsv.db.unlink",
            "label": "$(...).unlink()"
          }
        ],
        "expanded": true,
        "hidden": true
      },
      {
        "name": "$view",
        "label": "Access views",
        "categories": [
          {
            "name": "jsv.d.view",
            "label": "$.view()"
          },
          {
            "name": "jsv.db.view",
            "label": "$(...).view()"
          }
        ],
        "expanded": true,
        "hidden": true
      },
      {
        "name": "jsvcompiletmpl",
        "label": "Compile/register/get a template",
        "expanded": true,
        "hidden": true
      },
      {
        "name": "jsvregister",
        "label": "Register helpers, converters, tags...",
        "categories": [
          {
            "name": "jsvconverters",
            "label": "$.views.converters()",
            "expanded": true
          },
          {
            "name": "jsvtags",
            "label": "$.views.tags()"
          },
          {
            "name": "jsvhelpers",
            "label": "$.views.helpers()"
          }
        ],
        "expanded": true,
        "hidden": true
      },
      {
        "name": "jsvtagcontrols",
        "label": "Custom Tags - Tag Controls",
        "hidden": true
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
        "expanded": true,
        "hidden": true
      },
      {
        "name": "jsvsettings",
        "label": "Settings",
        "hidden": true
      }
    ],
    "expanded": true
  },
  {
    "name": "jsoapi",
    "label": "JsObservable API - Observing data",
    "heading": "JsObservable API documentation",
    "description": "Detailed API docs on using JsObservable for observing or triggering data changes in a single-page app",
    "categories": [
      {
        "name": "$observable",
        "label": "Observable objects and arrays"
      },
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
            "name": "move",
            "label": "$.observable(array).move()"
          },
          {
            "name": "refresh",
            "label": "$.observable(array).refresh()"
          }
        ],
        "expanded": true
      },
      {
        "name": "observeobjectsarrays",
        "label": "Respond to data changes",
        "categories": [
          {
            "name": "onpropchange",
            "label": "onPropertyChange"
          },
          {
            "name": "onarrchange",
            "label": "onArrayChange"
          },
          {
            "name": "observe",
            "label": "$.observe()",
            "hidden": false
          },
          {
            "name": "unobserve",
            "label": "$.unobserve()",
            "hidden": false
          },
          {
            "name": "observeAll",
            "label": "$.observable().observeAll()",
            "hidden": false
          },
          {
            "name": "unobserveAll",
            "label": "$.observable().unobserveAll()",
            "hidden": false
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
                "name": "samples/jsr/composition/from-strings",
                "label": "From strings"
              },
              {
                "name": "samples/jsr/composition/remote-tmpl",
                "label": "Remote templates"
              },
              {
                "name": "samples/jsr/composition/sub-templates",
                "label": "Using sub-templates"
              },
              {
                "name": "samples/jsr/composition/tmpl-objects",
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
            "name": "samples/data-link",
            "label": "Data-linking tags and elements",
            "categories": [
              {
                "name": "samples/data-link/from-render-to-link",
                "label": "From rendering to linking"
              },
              {
                "name": "samples/data-link/for-and-if",
                "label": "Linking {^{for}} and {^{if}}"
              },
              {
                "name": "samples/data-link/class",
                "label": "Linking class"
              },
              {
                "name": "samples/data-link/toggle",
                "label": "Toggling class with data-link"
              },
              {
                "name": "samples/data-link/attributes",
                "label": "Linking attributes"
              },
              {
                "name": "samples/data-link/visibility",
                "label": "Linking visibility"
              },
              {
                "name": "samples/data-link/hover",
                "label": "Linking visibility and hover"
              },
              {
                "name": "samples/data-link/css",
                "label": "Linking CSS attributes"
              },
              {
                "name": "samples/data-link/svg",
                "label": "Linking SVG elements"
              },
              {
                "name": "samples/data-link/computed",
                "label": "Computed ....!!",
                "hidden": true
              }
            ],
            "expanded": true
          },
          {
            "name": "samples/editable",
            "label": "Editable data",
            "categories": [
              {
                "name": "samples/editable/tags",
                "label": "Data-linked tags"
              },
              {
                "name": "samples/editable/elems",
                "label": "Data-linked elements"
              },
              {
                "name": "samples/editable/toplevel-for",
                "label": "Top-level elems with {for...}"
              },
              {
                "name": "samples/editable/observe",
                "label": "$.observe()"
              }
            ],
            "expanded": true
          },
          {
            "name": "samples/form-elems",
            "label": "Form elements",
            "categories": [
              {
                "name": "samples/form-els/simple",
                "label": "Form element binding"
              },
              {
                "name": "samples/form-els/array-binding",
                "label": "Array binding"
              },
              {
                "name": "samples/form-els/converters",
                "label": "2-way binding and converters"
              },
              {
                "name": "samples/form-els/visible-binding",
                "label": "Form elements and visibility"
              },
              {
                "name": "samples/form-els/edit",
                "label": "Edit tag control",
                "hidden": true
              },
              {
                "name": "samples/form-els/validation",
                "label": "With validation",
                "hidden": true
              },
              {
                "name": "samples/form-els/submit",
                "label": "Submitting the form",
                "hidden": true
              }
            ],
            "expanded": true
          },
          {
            "name": "samples/tag-controls",
            "label": "Tag controls",
            "categories": [
              {
                "name": "samples/tag-controls/tabs",
                "label": "tabs control"
              },
              {
                "name": "samples/tag-controls/multiselect",
                "label": "multiselect control"
              },
              {
                "name": "samples/tag-controls/tree",
                "label": "tree control",
                "categories": [
                  {
                    "name": "samples/tag-controls/tree/visible-binding",
                    "label": "tree with 'visible' binding"
                  },
                  {
                    "name": "samples/tag-controls/tree/if-binding",
                    "label": "tree with if-binding"
                  },
                  {
                    "name": "samples/tag-controls/tree/editable",
                    "label": "Editable tree"
                  }
                ],
                "expanded": true
              },
              {
                "name": "samples/tag-controls/edit",
                "label": "edit control",
                "categories": [
                  {
                    "name": "samples/tag-controls/edit/simple-textbox",
                    "label": "Simple textbox control"
                  },
                  {
                    "name": "samples/tag-controls/edit/generic",
                    "label": "Generic edit control"
                  },
                  {
                    "name": "samples/tag-controls/edit/array-binding",
                    "label": "Array binding"
                  }
                ],
                "expanded": true
              },
              {
                "name": "samples/tag-controls/validate",
                "label": "validate control",
                "categories": [
                  {
                    "name": "samples/tag-controls/validate/simple",
                    "label": "Simple validate"
                  },
                  {
                    "name": "samples/tag-controls/validate/group",
                    "label": "Validation group"
                  },
                  {
                    "name": "samples/tag-controls/validate/array-binding",
                    "label": "Array binding"
                  }
                ],
                "expanded": true
              },
              {
                "name": "samples/tag-controls/datepicker",
                "label": "datepicker control",
                "categories": [
                  {
                    "name": "samples/tag-controls/datepicker/simple",
                    "label": "Simple datepicker"
                  },
                  {
                    "name": "samples/tag-controls/datepicker/variants",
                    "label": "datepicker variants"
                  },
                  {
                    "name": "samples/tag-controls/datepicker/with-validation",
                    "label": "With validation"
                  },
                  {
                    "name": "samples/tag-controls/datepicker/with-validation-wizard",
                    "label": "With validation wizard"
                  }
                ],
                "expanded": true
              },
              {
                "name": "samples/tag-controls/slider",
                "label": "slider control",
                "categories": [
                  {
                    "name": "samples/tag-controls/slider/simple",
                    "label": "Simple slider"
                  },
                  {
                    "name": "samples/tag-controls/slider/variants",
                    "label": "slider variants"
                  },
                  {
                    "name": "samples/tag-controls/slider/with-validation",
                    "label": "With validation"
                  }
                ],
                "expanded": true
              },
              {
                "name": "samples/tag-controls/range",
                "label": "range control"
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
    "label": "Download",
    "heading": "Downloading JsViews, JsRender and JsObservable",
    "description": "",
    "categories": [
      {
        "name": "download",
        "label": "Latest version"
      },
      {
        "name": "download/specific",
        "label": "Specific versions",
        "expanded": true
      },
      {
        "name": "download/tag-controls",
        "label": "Sample tag controls",
        "categories": [],
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