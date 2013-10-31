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
            "hash": "helpers",
            "label": "Providing helpers"
          },
          {
            "hash": "converters",
            "label": "Converters"
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
            "hash": "tag-controls",
            "label": "Tag Controls"
          },
          {
            "hash": "mvvm-mvp",
            "label": "MVVM and MVP"
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
    "sections": [
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
            "title": "Call unobserveAll on the root, to stop 'listening'...",
            "code": "function logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}"
          }
        ],
        "html": "<div class=\"left\">\n  <button id=\"modify\">Change name and street</button><br/>\n  <button id=\"changeObjects\">New address and phones</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <input type=\"checkbox\" checked id=\"attach\"/>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input data-link=\"number\" />\n            <img class=\"remove\" src=\"http://www.jsviews.com/resources/images/close.png\" />\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\",\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n$(\"#modify\").on(\"click\", function() {\n  $.observable(person).setProperty(\n    {\n      name: \"Hermione\",\n      \"address.street\": \"Main St\",\n    }\n  );\n});\n\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    address: {street: \"New Street\"},\n    phones: [{number:\"123 123 1234\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number:\"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \" + JSON.stringify(eventArgs[key]) + \"</div>\";\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350"
      },]
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
  "helpers": {
    "title": "Providing helpers",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "registerhelper",
            "label": "Registering helpers"
          },
          {
            "hash": "passhelper",
            "label": "Passing in helpers"
          },
          {
            "hash": "helperpaths",
            "label": "Helper paths"
          }
        ]
      }
    ]
  },
  "registerhelper": {
    "title": "Registering helpers",
    "path": "",
    "sections": []
  },
  "passhelper": {
    "title": "Passing in helpers",
    "path": "",
    "sections": []
  },
  "helperpaths": {
    "title": "Helper paths",
    "path": "",
    "sections": []
  },
  "converters": {
    "title": "Converters",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsr-converter",
            "label": "converters in JsRender"
          },
          {
            "hash": "jsv-converter",
            "label": "converters in JsViews"
          }
        ]
      }
    ]
  },
  "jsr-converter": {
    "title": "converters in JsRender",
    "path": "",
    "sections": []
  },
  "jsv-converter": {
    "title": "converters in JsViews",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsv-converter1way",
            "label": "one-way binding converter"
          },
          {
            "hash": "jsv-converterback",
            "label": "2-way binding - convert back"
          }
        ]
      }
    ]
  },
  "jsv-converter1way": {
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
  "jsv-converterback": {
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
  "allowcode": {
    "title": "Allow code?",
    "path": "",
    "sections": []
  },
  "expressions": {
    "title": "Tag expressions",
    "path": "",
    "sections": []
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
  "tag-controls": {
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
  "mvvm-mvp": {
    "title": "MVVM and MVP",
    "path": "",
    "sections": []
  },
  "interop": {
    "title": "Using with other libraries",
    "path": "",
    "sections": [
    ]
  },
  "globalvars": {
    "title": "Global variables",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "JsRender, JsViews and global variables",
        "text": "JsRender and JsViews do not set the global var $."
      },
      {
        "_type": "para",
        "title": "",
        "text": "\nIf you are using jQuery with JsRender, JsRender defines jQuery,views, jQuery.templates, etc. but does not create any global variables.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "So you can write:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.noConflict();\n\nvar template = jQuery.templates(...);\n\njQuery.views.helpers(...);\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "If you are not using jQuery, JsRender creates a global var: jsviews - which you use to replace the jQuery global.\n"
      },
      {
        "_type": "code",
        "title": "",
        "code": "var template = jsviews.templates(...);\n\njsviews.views.helpers(...);\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "You can test for JsRender as follows:\n"
      },
      {
        "_type": "code",
        "title": "",
        "code": "if (window.jQuery && window.jQuery.views || window.jsviews) { \n  // JsRender is loaded\n}"
      }
    ]
  }
};