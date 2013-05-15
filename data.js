var content = $.views.documentation.content;
var useStorage = content.allowEdit;
content.topics = useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics")) ||
{
  "tmplrender": {
    "title": "APIs to render a template against data objects or arrays",
    "path": "",
    "sections": [
      {
        "_type": "data",
        "title": "The data",
        "data": {
          "name": "Fred"
        }
      },
      {
        "_type": "para",
        "title": "The title",
        "text": "paragraph"
      },
      {
        "_type": "template",
        "title": "The template",
        "markup": "<div>{{:expression}}</div>"
      },
      {
        "_type": "code",
        "title": "The code",
        "code": "code...\nvar foo = { a: \"fff\" };"
      },
      {
        "_type": "api",
        "title": "template.render()",
        "name": "render",
        "object": "template",
        "method": true,
        "tag": false,
        "returns": "string",
        "signatures": [
          {
            "_type": "signature",
            "title": "Basic",
            "params": [
              {
                "_type": "param",
                "name": "data",
                "type": "object or array",
                "optional": true,
                "description": "The data to render. This can be any JavaScript type, including Array or Object."
              }
            ],
            "sections": [],
            "example": "var htmlString = myTemplate.render(myData);",
            "description": "Render template against data"
          },
          {
            "_type": "signature",
            "title": "With options",
            "params": [
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
                "description": "Contextual helper methods or properties - available to template as <em>~keyName</em>"
              }
            ],
            "sections": [],
            "example": "var htmlString = myTemplate.render(myData);",
            "description": "Render template against data, and pass in helpers"
          }
        ],
        "description": "Render a template against data, and return a string.",
        "sectionTypes": {
          "para": "para",
          "api": "api",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
      }
    ]
  },
  "documentation": {
    "title": "JsViews Documentation",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "api",
            "label": "API"
          },
          {
            "hash": "tags",
            "label": "Tags"
          }
        ]
      }
    ]
  },
  "api": {
    "title": "API",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsrapi",
            "label": "JsRender"
          },
          {
            "hash": "jsvapi",
            "label": "JsViews"
          },
          {
            "hash": "jsoapi",
            "label": "JsObservable"
          }
        ]
      }
    ]
  },
  "tags": {
    "title": "Tags",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "assigntag",
            "label": "{{: ...}}"
          },
          {
            "hash": "htmltag",
            "label": "{{> ...}}"
          },
          {
            "hash": "includetag",
            "label": "{{include ...}}"
          },
          {
            "hash": "fortag",
            "label": "{{for ...}}"
          },
          {
            "hash": "iftag",
            "label": "{{if ...}}"
          },
          {
            "hash": "elsetag",
            "label": "{{else ...}}"
          },
          {
            "hash": "commenttag",
            "label": "{{!-- ... --}}"
          },
          {
            "hash": "customtags",
            "label": "Custom Tags"
          }
        ]
      }
    ]
  },
  "assigntag": {
    "title": "{{: ...}}",
    "path": "",
    "sections": [
      {
        "_type": "tag",
        "title": "",
        "name": "name",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "title",
            "params": [
              {
                "_type": "param",
                "name": "name",
                "type": "string",
                "optional": false,
                "description": "ddddddd"
              }
            ],
            "sections": [],
            "example": "ddddddddd",
            "description": "fffffffasdf"
          }
        ],
        "description": "asdf",
        "sectionTypes": {}
      }
    ]
  },
  "jsvapi": {
    "title": "JsViews",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "tmplink",
            "label": "Linking data to HTML"
          }
        ]
      }
    ]
  },
  "jsrapi": {
    "title": "JsRender",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsrtags",
            "label": "Built-in tags"
          },
          {
            "hash": "tmplrender",
            "label": "Render a template"
          },
          {
            "hash": "tmplcompile",
            "label": "Compile a template"
          }
        ]
      }
    ]
  },
  "tmplcompile": {
    "title": "Compile a template",
    "path": "",
    "sections": []
  },
  "htmltag": {
    "title": "{{> ...}}",
    "path": "",
    "sections": []
  },
  "includetag": {
    "title": "{{include ...}}",
    "path": "",
    "sections": []
  },
  "fortag": {
    "title": "{{for ...}}",
    "path": "",
    "sections": []
  },
  "elsetag": {
    "title": "{{else ...}}",
    "path": "",
    "sections": []
  },
  "commenttag": {
    "title": "{{!-- ... --}}",
    "path": "",
    "sections": []
  },
  "customtags": {
    "title": "Custom Tags",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsrcustomtags",
            "label": "JsRender custom tags"
          },
          {
            "hash": "tagsascontrols",
            "label": "Custom tags as controls"
          }
        ]
      }
    ]
  },
  "jsoapi": {
    "title": "JsObservable",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "observe",
            "label": "Observing data"
          }
        ]
      }
    ]
  },
  "iftag": {
    "title": "{{if ...}}",
    "path": "",
    "sections": []
  },
  "gettingstarted": {
    "title": "Getting started",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [
          {
            "_type": "link",
            "hash": "hash",
            "label": ""
          }
        ],
        "topics": [
          {
            "hash": "jsrplaying",
            "label": "Playing with JsRender"
          },
          {
            "hash": "jsvplaying",
            "label": "Playing with JsViews"
          },
          {
            "_type": "topic",
            "hash": "hash",
            "label": ""
          }
        ]
      }
    ]
  },
  "jsrplaying": {
    "title": "Playing with JsRender",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "JsRender templates",
        "text": "JsRender templates are probably the most powerful and at the same time the most intuitive of template engines out there."
      },
      {
        "_type": "para",
        "title": "",
        "text": " To get started, let's just create a template, and run it against some data. The way you do that in code is like this:"
      },
      {
        "_type": "template",
        "title": "Here's a template:",
        "markup": "<label>Name:</label> {{:name}}"
      },
      {
        "_type": "code",
        "title": "Here's some code:",
        "code": "var person = {\n    name: \"Adriana\"\n};\n\nvar htmlOutput = myTemplate.render(person);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Let's go straight to a sample showing how that template renders against the data. Like all the samples in this documentation, it is a working sample that you can experiment with."
      },
      {
        "_type": "para",
        "title": "And here it is as a working sample:",
        "text": ""
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
            "text": "You can hit <em>Try it</em>, modify the template or the data, then hit <em>Run Code</em> to see the effect immediately, in the running sample above."
          },
          {
            "_type": "para",
            "title": "",
            "text": "For example, replace the data with the following:"
          },
          {
            "_type": "data",
            "title": "",
            "data": [
              {
                "name": "Adriana"
              },
              {
                "name": "Robert"
              }
            ]
          },
          {
            "_type": "para",
            "title": "",
            "text": "Or try replacing the template with the following:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<table><tbody><tr>\n    <td>Name:</label> {{:name}}</td>\n</tr></tbody><table>"
          }
        ],
        "title": "A first template:",
        "markup": "<label>Name:</label> {{:name}}<br/>",
        "data": {
          "name": "Adriana"
        },
        "height": "90px",
        "onlyJsRender": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "OK - a few interesting things there. For example, if you tried changing the data, and providing an array instead of an object, you will have seen that the template rendered once for each item in the array. <br/><br/>But before we look at more details on the template rendering, let's look at how you get a compiled template object for you markup, (<em>myTemplate</em> in the code example above) so you can call the render method. <br/><br/>The next working example shows you that."
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
            "text": "In the html you see that we put our markup in a script block with <em>type=\"text/x-jsrender\"</em> and then in the code we called the $.templates method with a jQuery selector for that script block, to get the compiled template."
          },
          {
            "_type": "para",
            "title": "",
            "text": "After that we run the code we have already seen to render the template against our data, and get the HTML output as a string. (We pass the data - this time we used an array - to the render() method of our compiled template.)"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Finally we simply insert that output into the HTML DOM using the jQuery html() method."
          },
          {
            "_type": "para",
            "title": "",
            "text": "Again, you can play with the sample, by changing the data, or the markup, or the code."
          },
          {
            "_type": "para",
            "title": "",
            "text": "For example if you change the template to produce a <em>&lt;tr></em>, you will want to insert the output into the tbody of a table, by adding a <em>&lt;table>&lt;tbody></em> target container - as in the following:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n    <tr><td>Name:</label> {{:name}}</td></tr>\n</script>"
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n    <label>Name:</label> {{:name}}\n</script>",
        "code": "var myTemplate = $.templates(\"#personTmpl\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nvar htmlOutput = myTemplate.render(people);\n\n$(\"#peopleList\").html(htmlOutput);",
        "title": "Complete code for template rendering:",
        "onlyJsRender": true
      },
      {
        "_type": "para",
        "title": "What else is in templates?",
        "text": "JsRender template have a very rich feature set, yet a small number of predefined tags. The links at the moment of this topic give details on some of the features."
      },
      {
        "_type": "para",
        "title": "",
        "text": " But let's try one more sample, where this time, instead of passing our people array to the template.render() method, we will pass an object (our <em>app</em> object) which will have a <em>people</em> property. Now in the template we will use a <em>{{for}}</em> tag to iterate over the <em>people</em>. "
      },
      {
        "_type": "para",
        "title": "",
        "text": "Also we'll use an <em>{{if}}</em> tag to test whether the person has a <em>nickname</em> field, and if so we will render out the nickname too..."
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
            "text": "The <em>{{for people}}...{{/for}}</em> block tag, in the template, looks at the current data item (the <em>app</em> that we passed in) and navigates a data-path that you provide as parameter - in this case <em>people</em>."
          },
          {
            "_type": "para",
            "title": "",
            "text": "JsRender supports different kinds of paths, as well as expressions of various kinds. The data-path can be something like <em>address.street</em>, with 'dot' separators, but in this case it is simply the <em>people</em> property of the app object."
          },
          {
            "_type": "para",
            "title": "",
            "text": "Now, because <em>people</em> is an array, JsRender will render the content of the <em>{{for}}...{{/for}}</em> block <b><em>once for each item in the array</em></b>.  "
          },
          {
            "_type": "para",
            "title": "",
            "text": "Within the block the current item is now the person (item in the array), and there we have an <em>{{if people}}...{{/if}}</em> block tag, which takes an expression as parameter."
          },
          {
            "_type": "para",
            "title": "",
            "text": " In this case the expression is another data-path, <em>nickname</em>. So it renders the content of the <em>{{if}}...{{/if}}</em> block if the nickname is not undefined (or is not null, or the empty string)."
          },
          {
            "_type": "para",
            "title": "",
            "text": "You can experiment by replacing the <em>{{if nickname}}</em> expression. For example, try giving <em>Adriana</em> the nickname <em>Adriana</em>! Then try replacing <em>{{if nickname}}</em> with:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{if nickname && nickname !== name}} "
          }
        ],
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td>\n    <ul>\n      {{for people}}\n        <li>\n          {{:name}}\n          {{if nickname}}\n            ( {{:nickname}} )\n          {{/if}}\n        </li>\n      {{/for}}\n    </ul>\n  </td></tr>\n</script>",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\",\n      nickname: \"Bob\"\n    }\n  ];\n\n  app = {\n    people: people\n  };\n\nvar htmlOutput = myTemplate.render(app);\n\n$(\"#peopleList\").html(htmlOutput);\n",
        "onlyJsRender": true,
        "title": "Some template tags..."
      },
      {
        "_type": "links",
        "title": "Links",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsrtags",
            "label": "Built-in tags"
          }
        ]
      }
    ]
  },
  "jsvplaying": {
    "title": "Playing with JsViews",
    "path": "",
    "sections": []
  },
  "concepts": {
    "title": "Concepts",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "data",
            "label": "Data"
          },
          {
            "hash": "templates",
            "label": "Templates"
          },
          {
            "hash": "views",
            "label": "Views"
          },
          {
            "hash": "renderorlink",
            "label": "Rendering versus linking"
          },
          {
            "hash": "customtags",
            "label": "Custom tags"
          },
          {
            "hash": "tagexpressions",
            "label": "Tag expressions"
          },
          {
            "hash": "linkobservedispose",
            "label": "Linking, observing, disposing"
          },
          {
            "hash": "tagcontrols",
            "label": "Tag Controls"
          }
        ]
      }
    ]
  },
  "data": {
    "title": "Data",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "objectsorvm",
            "label": "Plain objects or View Model"
          },
          {
            "hash": "ajax",
            "label": "Ajax requests"
          },
          {
            "hash": "observabledata",
            "label": "Observable data"
          },
          {
            "hash": "computed",
            "label": "Computed observables"
          },
          {
            "hash": "dependencies",
            "label": "Declaring dependencies"
          }
        ]
      }
    ]
  },
  "objectsorvm": {
    "title": "Plain objects or View Model",
    "path": "",
    "sections": []
  },
  "ajax": {
    "title": "Ajax requests",
    "path": "",
    "sections": []
  },
  "observabledata": {
    "title": "Observable data",
    "path": "",
    "sections": []
  },
  "computed": {
    "title": "Computed observables",
    "path": "",
    "sections": []
  },
  "dependencies": {
    "title": "Declaring dependencies",
    "path": "",
    "sections": []
  },
  "templates": {
    "title": "Templates",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "composition",
            "label": "Composition"
          }
        ]
      }
    ]
  },
  "composition": {
    "title": "Composition",
    "path": "",
    "sections": []
  },
  "views": {
    "title": "Views",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "viewhierarchy",
            "label": "View hierarchy"
          }
        ]
      }
    ]
  },
  "viewhierarchy": {
    "title": "View hierarchy",
    "path": "",
    "sections": []
  },
  "renderorlink": {
    "title": "Rendering versus linking",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "renderasstring",
            "label": "String-based rendering"
          },
          {
            "hash": "linkingtohtml",
            "label": "Data-binding to HTML"
          },
          {
            "hash": "data-link",
            "label": "Element-based: data-link"
          },
          {
            "hash": "inlinebinding",
            "label": "Inline tag binding"
          }
        ]
      }
    ]
  },
  "renderasstring": {
    "title": "String-based rendering",
    "path": "",
    "sections": []
  },
  "linkingtohtml": {
    "title": "Data-binding to HTML",
    "path": "",
    "sections": []
  },
  "data-link": {
    "title": "Element-based: data-link",
    "path": "",
    "sections": []
  },
  "inlinebinding": {
    "title": "Inline tag binding",
    "path": "",
    "sections": []
  },
  "jsrcustomtags": {
    "title": "JsRender custom tags",
    "path": "",
    "sections": []
  },
  "tagsascontrols": {
    "title": "Custom tags as controls",
    "path": "",
    "sections": []
  },
  "expressions": {
    "title": "Tag expressions",
    "path": "",
    "sections": []
  },
  "allowcode": {
    "title": "Allow code?",
    "path": "",
    "sections": []
  },
  "tagexpressions": {
    "title": "Tag expressions",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "allowcode",
            "label": "Allow code?"
          },
          {
            "hash": "expressions",
            "label": "Expressions"
          },
          {
            "hash": "expressions/datapath",
            "label": "Data paths"
          },
          {
            "hash": "expressions/helperpath",
            "label": "Helper paths"
          },
          {
            "hash": "expressions/viewpath",
            "label": "View paths"
          }
        ]
      }
    ]
  },
  "expressions/datapath": {
    "title": "Data paths",
    "path": "",
    "sections": []
  },
  "expressions/helperpath": {
    "title": "Helper paths",
    "path": "",
    "sections": []
  },
  "expressions/viewpath": {
    "title": "View paths",
    "path": "",
    "sections": []
  },
  "linkobservedispose": {
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
  "tagcontrols": {
    "title": "Tag Controls",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "taghierarchy",
            "label": "Tag hierarchy"
          },
          {
            "hash": "taglifecycle",
            "label": "Tag lifecycle"
          },
          {
            "hash": "tagmethods",
            "label": "Tag methods and properties"
          }
        ]
      }
    ]
  },
  "taghierarchy": {
    "title": "Tag hierarchy",
    "path": "",
    "sections": []
  },
  "taglifecycle": {
    "title": "Tag lifecycle",
    "path": "",
    "sections": []
  },
  "tagmethods": {
    "title": "Tag methods and properties",
    "path": "",
    "sections": []
  },
  "jsrtags": {
    "title": "Built-in tags",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "assigntag",
            "label": "{{: ...}}"
          },
          {
            "hash": "htmltag",
            "label": "{{> ...}}"
          },
          {
            "hash": "includetag",
            "label": "{{include ...}}"
          },
          {
            "hash": "fortag",
            "label": "{{for ...}}"
          },
          {
            "hash": "iftag",
            "label": "{{if ...}}"
          },
          {
            "hash": "elsetag",
            "label": "{{else ...}}"
          },
          {
            "hash": "commenttag",
            "label": "{{!-- ... --}}"
          }
        ]
      }
    ]
  },
  "tmplink": {
    "title": "Linking data to HTML",
    "path": "",
    "sections": []
  },
  "observe": {
    "title": "Observing data",
    "path": "",
    "sections": []
  },
  "mvvm-mvp": {
    "title": "MVVM and MVP",
    "path": "",
    "sections": []
  }
};
content.categories = useStorage && $.parseJSON(localStorage.getItem("JsViewsDocCategories")) ||
[
  {
    "name": "gettingstarted",
    "label": "Getting started",
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
    "name": "concepts",
    "label": "Concepts",
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
    "name": "api",
    "label": "API Topics",
    "categories": [
      {
        "name": "jsrapi",
        "label": "JsRender",
        "categories": [
          {
            "name": "jsrtags",
            "label": "Built-in tags",
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
              }
            ],
            "expanded": true
          },
          {
            "name": "tmplrender",
            "label": "Render a template"
          },
          {
            "name": "tmplcompile",
            "label": "Compile a template",
            "categories": [],
            "expanded": true
          }
        ],
        "expanded": true
      },
      {
        "name": "jsvapi",
        "label": "JsViews",
        "categories": [
          {
            "name": "tmplink",
            "label": "Linking data to HTML"
          }
        ],
        "expanded": true
      },
      {
        "name": "jsoapi",
        "label": "JsObservable",
        "categories": [
          {
            "name": "observe",
            "label": "Observing data"
          }
        ],
        "expanded": true
      }
    ],
    "expanded": true
  }
];