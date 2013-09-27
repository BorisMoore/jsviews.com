var content = $.views.documentation.content;

content.samples = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/samples")) ||
{
  "samples": {
    "title": "Samples",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/jsr",
            "label": "JsRender"
          },
          {
            "hash": "samples/jso",
            "label": "JsObservable"
          },
          {
            "hash": "samples/jsv",
            "label": "JsViews"
          }
        ]
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>Note:</em> New samples are being added regularly to this set of samples."
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also:"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<ul>\n<li>the <a href=\"https://github.com/BorisMoore/jsrender/tree/master/demos\">demos</a> folder of the JsRender GitHub repository - available <a href=\"http://borismoore.github.io/jsrender/demos/index.html\">here</a> as live samples.</li>\n<li>the <a href=\"https://github.com/BorisMoore/jsviews/tree/master/demos\">demos</a> folder of the JsViews GitHub repository - or <a href=\"http://borismoore.github.io/jsviews/demos/index.html\">here</a> as live samples.</li>\n</ul>",
        "detail": false
      }
    ]
  },
  "samples/jsr": {
    "title": "Samples: JsRender",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/jsr/converters",
            "label": "Converters and encoding"
          },
          {
            "hash": "samples/jsr/composition",
            "label": "Template composition"
          },
          {
            "hash": "samples/jsr/tags",
            "label": "Custom tags"
          },
          {
            "hash": "samples/jsr/helpers",
            "label": "Helpers"
          },
          {
            "hash": "samples/jsr/paths",
            "label": "Paths"
          }
        ]
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the additional samples in the <a href=\"https://github.com/BorisMoore/jsrender/tree/master/demos\">demos</a> folder of the JsRender GitHub repository (available <a href=\"http://borismoore.github.io/jsrender/demos/index.html\">here</a> as live samples)."
      }
    ]
  },
  "samples/jsr/composition": {
    "title": "Samples: Template composition",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/jsr/composition/tmpl",
            "label": "tmpl parameter"
          },
          {
            "hash": "samples/jsr/composition/from-strings",
            "label": "From strings"
          },
          {
            "hash": "samples/jsr/composition/remote-tmpl",
            "label": "Remote templates"
          },
          {
            "hash": "samples/jsr/composition/sub-templates",
            "label": "Using sub-templates"
          },
          {
            "hash": "samples/jsr/composition/tmpl-objects",
            "label": "Contextual template objects"
          }
        ]
      }
    ]
  },
  "samples/jsr/composition/tmpl": {
    "title": "Sample: Template composition using external templates",
    "path": "",
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
            "title": "",
            "text": "Composition by providing <em>tmpl</em> parameters referencing external templates, rather than inline block content, as in:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{for languages tmpl=\"#columnTemplate\"/}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{if name.charAt(0)==='E' tmpl='#rowTemplate'}}\n{{else tmpl='#columnTemplate'}}\n{{/if}}\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Also shows <em>wrapping</em>, where an external template is used which then <em>wraps</em> the rendered block content, as in:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{include tmpl=\"#sectionWrapperTemplate\"}}\n  {{>title}}\n{{/include}}\n"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<script id=\"sectionWrapperTemplate\" type=\"text/x-jsrender\">\n  <td>Section: <em>{{include tmpl=#content/}}</em></td>\n</script>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or as in:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{for languages tmpl='#indexWrapperTemplate'}}\n  <b>{{>name}}</b>\n{{/for}}"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<script id=\"indexWrapperTemplate\" type=\"text/x-jsrender\">\n  <div>\n    {{:#index}}:\n    {{include tmpl=#content/}}\n  </div>\n</script>"
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/composition/tmpl",
        "url": "samples/jsrender/composition/tmpl/sample",
        "onlyJsRender": true,
        "height": "238",
        "title": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the following samples which are variants of this sample:\n"
      },
      {
        "_type": "links",
        "title": "",
        "links": [
          {
            "_type": "link",
            "hash": "hash",
            "label": "using sub-templates",
            "url": "#samples/jsr/composition/sub-tmpl"
          },
          {
            "_type": "link",
            "hash": "hash",
            "label": "contextual template objects",
            "url": "#samples/jsr/composition/tmpl-objects"
          }
        ],
        "topics": []
      }
    ]
  },
  "samples/jsr/composition/from-strings": {
    "title": "Sample: Composition using named templates compiled from markup strings",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "All of the templates referenced by <em>tmpl=...</em> in the preceding <a href=\"#samples/jsr/composition/tmpl\">tmpl parameter</a> sample were declared as script blocks. But they could equally have been compiled from markup strings."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is a simple example:"
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
            "title": "Simple example of composition",
            "text": "We register two named templates, compiled from markup strings:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.templates({\n  people: '<div>{{:name}} lives in {{for address tmpl=\"address\" /}}</div>',\n  address: '<b>{{>city}}</b>'\n});\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "The first one uses the second as a nested template:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{for address tmpl=\"address\" /}}"
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/composition/from-strings",
        "height": "90",
        "onlyJsRender": true,
        "url": "samples/jsrender/composition/from-strings/sample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the next <a href=\"#samples/jsr/composition/remote-tmpl\">remote templates</a> sample we will show a modified version of this sample but with the strings fetched \"lazily\" from the server."
      }
    ]
  },
  "samples/jsr/composition/remote-tmpl": {
    "title": "Sample: Loading remote templates",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample takes the preceding <a href=\"#samples/jsr/composition/from-strings\">template composition/from strings</a> sample, and modifies it to use templates loaded from the server."
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also the simple examples of loading templates from the server, in the <a href=\"#samples/jsr/composition/remote-tmpl\">compile templates</a> API topic.)"
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
            "title": "Asynchronous loading of templates from the server",
            "text": "This sample illustrates one approach to loading remote templates: the template file on the server is a javascript file which registers a named template."
          },
          {
            "_type": "code",
            "title": "Template resource on the server: address.js ",
            "code": "$.templates(\"address\", \"<b>{{>city}}</b>\");"
          },
          {
            "_type": "para",
            "title": "lazyGetTemplate() helper function",
            "text": "We use a helper to \"lazily\" fetch the template, asynchronously, but only if it has not yet been fetched. Also, we make sure the template only gets compiled from a string <em>once</em>."
          },
          {
            "_type": "para",
            "title": "",
            "text": "(Note that for optimal performance, it is always best to ensure that the <em>$.template(... markup)</em> method, which compiles a template from a string, is only ever called once for a given string). "
          },
          {
            "_type": "code",
            "title": "",
            "code": "function lazyGetTemplate(name) {\n  var deferred = $.Deferred();\n  if ($.templates[name]) {\n    deferred.resolve();\n  } else {\n    $.getScript(...).then(function() {\n      ...  \n      deferred.resolve();\n    });\n  }\n  return deferred.promise();\n}\n"
          },
          {
            "_type": "para",
            "title": "When all templates are loaded...",
            "text": "Once the requested template (along with any nested templates used as as part of the template composition) is loaded, the <em>render()</em> method can be called (or the <em>link()</em> method if you are using <em>JsViews</em>):"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.when(\n    lazyGetTemplate(\"people\"),\n    ...  \n  )\n  .done(function() {\n      // Render or link once all templates for template composition are loaded\n      var html = $.templates.people.render(people);\n      ...\n    });\n"
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/composition/remote-tmpl",
        "url": "samples/jsrender/composition/remote-tmpl/sample",
        "height": "90",
        "onlyJsRender": true
      }
    ]
  },
  "samples/jsr/composition/sub-templates": {
    "title": "Sample: Template composition, using sub-templates",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample takes the previous <a href=\"#samples/jsr/composition/tmpl\">tmpl parameter</a> sample and modifies it to declare nested templates as <em>sub-templates</em> of the calling template."
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
            "_type": "code",
            "title": "Using sub-templates",
            "code": "$.templates( \"movieTemplate\", {\n  markup: \"#movieTemplate\",\n  templates: {\n    columnTemplate: \"#columnTemplate\",\n    ...\n  }\n});\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Now <em>\"columnTemplate\"</em> is a named template available only to the <em>\"movieTemplate\"</em>. (See <a href=\"#$templates\">$.templates()</a>)."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<script id=\"movieTemplate\" type=\"text/x-jsrender\">\n  ...\n  {{for languages tmpl=\"columnTemplate\"/}}\n  ...\n</script>"
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/composition/sub-tmpl",
        "url": "samples/jsrender/composition/sub-tmpl/sample",
        "height": "200",
        "onlyJsRender": true
      }
    ]
  },
  "samples/jsr/composition/tmpl-objects": {
    "title": "Sample: Composition, using contextual template objects",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample takes the previous <a href=\"#samples/jsr/composition/tmpl\">tmpl parameter</a> sample and provides  nested templates to the calling template, by passing them in as compiled template objects, associated with a helper object."
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
            "text": "<em>nestedTemplates</em> is an object which holds references to compiled template objects for each of the nested templates. We pass it in as a helper object in the <em>render()</em> call."
          },
          {
            "_type": "para",
            "title": "",
            "text": "(Note we could also have provided the templates via helper objects registered globally with <em><a href=\"#helpers()\">$.views.helpers(...)</a></em>)."
          },
          {
            "_type": "code",
            "title": "",
            "code": "var nestedTemplates = {\n  columnTemplate: $.templates(\"#columnTemplate\"),\n  ...\n};\n\nvar html = movieTemplate.render(movies, sub-templates);"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Now each of the compiled templates, such as <em>nestedTemplates.columnTemplate</em> can be accessed from the outer template, and used for composition. Templates are accessed as regular helper objects such as <em>~columnTemplate</em>."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<script id=\"movieTemplate\" type=\"text/x-jsrender\">\n  ...\n  {{for languages tmpl=~columnTemplate/}}\n  ...\n</script>"
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/composition/tmpl-objects",
        "onlyJsRender": true,
        "url": "samples/jsrender/composition/tmpl-objects/sample",
        "height": "200"
      }
    ]
  },
  "samples/jsr/tags": {
    "title": "Samples: Custom tags",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Custom tags for JsRender",
        "text": "The following examples are custom tags that can be used in JsRender or in JsViews: "
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/jsr/tags/wrap-content",
            "label": "Wrapping content"
          },
          {
            "hash": "samples/jsr/tags/extend-for",
            "label": "Extending for"
          }
        ]
      },
      {
        "_type": "para",
        "title": "Custom tags for JsViews",
        "text": "See also the examples of JsViews custom tags (tag controls) which include data-linking and interactivity - and are in fact fully-fledged \"widgets\" or controls, such as the date-picker control, or the tabs control:"
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/tag-controls",
            "label": "Tag controls"
          }
        ]
      }
    ]
  },
  "samples/jsr/tags/wrap-content": {
    "title": "Custom tags: Wrapping content",
    "path": "",
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
            "title": "Composition with custom tags",
            "text": "This sample shows some basic custom tags implemented as simple render functions, or templates, and in each case shows how the tag can incorporate block content..."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{mytag}}\n  {{>title}}\n{{/mytag}}\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "...into its rendering."
          },
          {
            "_type": "para",
            "title": "",
            "text": "A variant, is to incorporate external content (through a tag parameter such as <em>tmpl</em>, referencing an external template) into the rendered output..."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{mytag tmpl=\"#externalcontent\"/}}\n"
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/tags/wrap-content",
        "url": "samples/jsrender/tags/wrap-content/sample",
        "height": "212",
        "onlyJsRender": true
      }
    ]
  },
  "samples/jsr/tags/extend-for": {
    "title": "Custom tags: Extending the {{for}} tag",
    "path": "",
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
            "title": "An extended <strong>({for}}</strong> tag",
            "text": "<em>{{for_range}}</em> inherits from <em>{{for}}</em>, and adds\nsupport for iterating over a range (<em>start</em> to <em>end</em>) of items within an array,\nor for iterating directly over integers from <em>start</em> integer to <em>end</em> integer."
          },
          {
            "_type": "template",
            "title": "Range of items from array",
            "markup": "{{for_range members start=1 end=3}}\n  ...\n{{else}}\n  ...\n{{/for_range}}"
          },
          {
            "_type": "template",
            "title": "Range of integers",
            "markup": "{{for_range start=10 end=40}}\n  ...\n{{else}}\n  ...\n{{/for_range}}"
          },
          {
            "_type": "code",
            "title": "Derive from <strong>{{for}}</strong> tag",
            "code": "$.views.tags({\n  for_range: $.extend(true, {}, $.views.tags[\"for\"], {\n    render: function(val) {\n      ...\n      return $.views.tags[\"for\"].render.apply(this, val ? [val] : arguments);\n    }\n  })\n});\n"
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/tags/extend-for",
        "url": "samples/jsrender/tags/extend-for/sample",
        "height": "514",
        "onlyJsRender": true
      }
    ]
  },
  "samples/tag-controls/multiselect": {
    "title": "Sample: A JsViews \"multiselect\" tag control",
    "path": "",
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
            "title": "A multiselect custom tag control ",
            "text": "This is a fairly advanced sample: A multiselect control which supports both the inline data-binding syntax:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{multisel items=items selected=selectedItems/}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "and the element-based data-link syntax, using a &lt;select&gt; tag:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<select data-link=\\\"{multisel items=items selected=selectedItems}\\\"></select>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "It provides two array  properties, <em>items</em> and <em>selectedItems</em>. Both use observable arrayChange data-binding, so you can (as in the example) use two-way binding between the <em>selectedItems</em> property of one <em>multiselect</em> and the <em>items</em> of another, following a cascading pattern."
          }
        ],
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/multiselect/multiselect.js",
            "label": "multiselect.js"
          }
        ],
        "sampleName": "tag-controls/multiselect",
        "height": "500",
        "url": "samples/tag-controls/multiselect/sample"
      }
    ]
  },
  "jsvrendertmpl": {
    "title": "Render a template",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "samples/jsr/helpers": {
    "title": "Sample: Helpers, and layout templates",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample shows both <em>passing helpers to template.render()</em> and <em>rendering an array as a non-repeating layout</em>"
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
            "text": "For more information about helpers, see the <a href=\"#helpers()\">$.views.helpers()</a> API topic."
          },
          {
            "_type": "para",
            "title": "",
            "text": "This sample shows passing in helpers to the <em>render()</em> method:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "var html = $(\"#movieTemplate\").render(\n  // Pass in data\n  [movies],\n  // Pass in helpers\n  {\n    reverseSort: reverse,\n    ...\n  }\n);\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "In this case our template renders an array (with sort-order based on the <em>~reverseSort</em> boolean value we pass in as a helper)."
          },
          {
            "_type": "para",
            "title": "",
            "text": "To make our template render just once, rather than iterating over the <em>movies</em> array, we wrap the array - as <em>render([myArray])</em> - and then <em>within the template</em> we do the iteration, using <em>{{for #data}}</em>."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{for #data}}\n  <tr>\n    <td>{{>~format(title)}}</td>\n    <td>\n      {{sort languages reverse=~reverseSort}}\n        <div><b>{{>name}}</b></div>\n      {{/sort}}\n    </td>\n  </tr>\n{{/for}}\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": ""
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/helpers",
        "url": "samples/jsrender/helpers/sample",
        "height": "168",
        "onlyJsRender": true
      }
    ]
  },
  "samples/jsr/paths": {
    "title": "Sample: Paths",
    "path": "",
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
            "title": "Data paths, helper paths and view paths",
            "text": "This sample shows the use of different kinds of <em>path</em>, in JsRender tag expressions."
          },
          {
            "_type": "para",
            "title": "Data paths:",
            "text": "The following example shows a data path, <em>address.street</em> for 'drilling down' into data from the current data item."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{>address.street}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "And here is an example of a slightly more complex expression, with a null check for <em>address</em>:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{if address && address.street}}"
          },
          {
            "_type": "para",
            "title": "Helper paths",
            "text": "Helper paths start with \"~\". Here is a helper path (in this case, to a helper method):"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{for ~combine(phones, cells)}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "The following shows helper paths referencing a 'helper properties' (objects, or values):"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{:~lateMessages.noAddress || ~messages.noAddress}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "And here is an example of a helper path, <em>frstNm</em>, which is actually an 'alias' for the <em>firstName</em>, taken from an outer data-context, and is passed in through the nesting data contexts of the 'views':"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{for ... ~frstNm=firstName}}\n  ... {{>~frstNm}} ...\n{{else}}\n  ... {{>~frstNm}} ...\n{{/for}}"
          },
          {
            "_type": "para",
            "title": "View paths",
            "text": "View paths start with \"#\":"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{>#data}}\n\n{{>#parent.parent.data.firstName}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "A view path is a way to access the current 'view' object (instance of a rendered template or of the block content of a tag), and drill into its properties. The examples above access <em>view.data</em> and <em>view.parent.parent.data.firstName</em>  "
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/paths",
        "height": "320",
        "onlyJsRender": true,
        "url": "samples/jsrender/paths/sample"
      }
    ]
  },
  "samples/jsv": {
    "title": "JsViews",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/editable",
            "label": "Editable data"
          },
          {
            "hash": "samples/form-elems",
            "label": "Form elements"
          },
          {
            "hash": "samples/tag-controls",
            "label": "Tag controls"
          }
        ]
      }
    ]
  },
  "samples/jsr/converters": {
    "title": "Sample: Converters and encoding",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Using built-in HTML and URL and attribute encoders",
        "text": "JsRender includes built-in converters, for HTML encoding, attribute encoding and URL encoding. A common use for these converters is to protect against injection attacks from untrusted data.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "It is generally best to use <b>{{> }}</b> when rendering data within element content, if the data is not intended to provide markup for insertion in the DOM.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the context of HTML attributes, use <b>{{attr: }}</b>, or it the case of attributes corresponding to URLs,  <b>{{url: }}</b>"
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
            "title": "Specifying converters:",
            "text": "<ul>\n<li><em>{{:value}}</em> &mdash; does not convert. Used to render values that include html markup.</li>\n<li><em>{{loc:value lang=\"...\"}}</em> &mdash; Uses custom converter, below.</li>\n<li><em>{{html:value}}</em> &mdash; Converts using built-in HTML encoder. (Better security within element content, but slight perf cost).</li>\n<li><em>{{>value}}</em> &mdash; Alternative syntax for built-in HTML encoder.</li>\n<li><em>{{attr:availability}}</em> &mdash; Converts using built-in attribute encoder. (Better security within attributes).</li>\n<li><em>{{url:value}}</em> &mdash; Converts using built-in URL encoder.</li>\n</ul>\n"
          },
          {
            "_type": "code",
            "title": "Declaring custom converters",
            "code": "$.views.converters({\n  loc: function (value) {\n    var language = this.tagCtx.props.lang;\n    ... (return localized value based on language)\n  }\n});\n"
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/converters",
        "url": "samples/jsrender/converters/sample",
        "height": "425",
        "title": "Using {{: }} or {{> }} to render data values with optional conversion or encoding",
        "onlyJsRender": true
      }
    ]
  },
  "samples/tag-controls": {
    "title": "Samples: Tag controls",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/tag-controls/tabs",
            "label": "tabs control"
          },
          {
            "hash": "samples/tag-controls/multiselect",
            "label": "multiselect control"
          },
          {
            "hash": "samples/tag-controls/tree",
            "label": "tree control"
          },
          {
            "hash": "samples/tag-controls/edit",
            "label": "edit control"
          },
          {
            "hash": "samples/tag-controls/validate",
            "label": "validate control"
          },
          {
            "hash": "samples/tag-controls/datepicker",
            "label": "datepicker control"
          },
          {
            "hash": "samples/tag-controls/slider",
            "label": "slider control"
          }
        ]
      }
    ]
  },
  "samples/tag-controls/tabs": {
    "title": "Sample: A JsViews \"tabs\" tag control",
    "path": "",
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
            "title": "Nested tags:",
            "text": "The sample shows two instances of a custom <em>{{tabs}}</em> tag control - an outer one, and a second inner one in one of the tabs of the outer one..."
          },
          {
            "_type": "template",
            "title": "Here is markup for the inner one:",
            "markup": "{^{tabs tabCaption=\"Inner One\"}}\n  ONE inner\n{{else tabCaption=\"Inner Two\"}}\n  TWO  {{>label2}}\n{{else tabCaption=\"Inner Three\"}}\n  THREE inner\n{{/tabs}}\n"
          }
        ],
        "url": "samples/tag-controls/tabs/sample",
        "codetabs": [
          {
            "_type": "codetab",
            "label": "tabs.js",
            "url": "download/sample-tag-controls/tabs/tabs.js"
          }
        ],
        "sampleName": "tag-controls/tabs",
        "height": "310",
        "title": "Tabs control"
      }
    ]
  },
  "samples/jsrandjsvconverters": {
    "title": "Converters in JsRender and JsViews",
    "path": "",
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
        "sections": []
      }
    ]
  },
  "samples/jso": {
    "title": "Samples: JsObservable",
    "path": "",
    "sections": []
  },
  "samples/editable/tags": {
    "title": "Editable data: Data-linked tags",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the first of <a href=\"#samples/editable\">four samples</a> exploring alternative patterns for creating two-way binding and providing UI for editing data."
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
            "title": "Data-linked tags: {^{for ...}}, {^{:...}}, etc.",
            "text": "This sample uses data-linked tags for <em>{^{for ...}}</em> (iteration over arrays) and for <em>{^{:...}}</em> and <em>{^{>...}}</em> (one-way data binding):"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{for movies}}\n  <tr class=\"hover\" data-link=\"css-background-color{:~bgColor()}\">\n      <td>\n      {^{:#index + 1}}: {^{>title}}\n      </td>\n      <td>\n      {^{for languages}}\n          <div>{^{>name}}</div>\n      {{/for}}\n    </td>\n    ...\n  </tr>\n{{/for}}"
          },
          {
            "_type": "para",
            "title": "Data-linked elements: &lt;input data-link=\"...\"/&gt;",
            "text": "But for two-way data binding of the textboxes in the detail view it uses data-linked &lt;input/&gt; elements:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{for movies[selectedIndex]}}\n  ...\n  <input data-link=\"title\" />\n  ...\n  {^{for languages}}\n    ...\n    <input data-link=\"name\" />\n    ...\n  {{/for}}\n  ...\n{{/for}}\n"
          }
        ],
        "codetabs": [],
        "sampleName": "editable-data/linked-tags",
        "url": "samples/editable-data/linked-tags/sample",
        "height": "400"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the <a href=\"#samples/editable/elems\">next sample</a> we will replace the data-linked tags for one-way binding by equivalent data-linked elements. "
      }
    ]
  },
  "samples/editable/elems": {
    "title": "Editable data: Data-linked elements",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample modifies the <a href=\"#samples/editable/tags\">previous sample</a> by replacing the data-linked tags for one-way binding with equivalent data-linked elements."
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
            "title": "Data-linked elements: &lt;span data-link=\"...\"&gt; etc.",
            "text": "This sample uses data-linked tags for <em>{^{for ...}}</em> (iteration over arrays) but it uses data-linked elements for one-way data binding:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{for movies}}\n  <tr class=\"hover\" data-link=\"css-background-color{:~bgColor()}\">\n      <td>\n        <span data-link=\"#index + 1\"></span>:\n        <span data-link=\"title\"></span>\n      </td>\n      <td>\n      {^{for languages}}\n        <div data-link=\"name\"></div>\n      {{/for}}\n    </td>\n    ...\n  </tr>\n{{/for}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "as well as for the two-way data binding of the textboxes in the detail view:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{for movies[selectedIndex]}}\n  ...\n  <input data-link=\"title\" />\n  ...\n  {^{for languages}}\n    ...\n    <input data-link=\"name\" />\n    ...\n  {{/for}}\n  ...\n{{/for}}\n"
          }
        ],
        "codetabs": [],
        "sampleName": "editable-data/linked-elems",
        "url": "samples/editable-data/linked-elems/sample",
        "height": "300"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the <a href=\"#samples/editable/toplevel-for\">next sample</a> we will replace some of the templated content by top-level data-linked elements, and we will show how to use <em>{for}</em> bindings with data-linked elements. "
      }
    ]
  },
  "samples/editable/toplevel-for": {
    "title": "Editable data: Top-level data-linked elements, and data-link using {for ...}",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample modifies the <a href=\"#samples/editable/elems\">previous sample</a> by replacing some of the templated content by top-level data-linked elements. It also shows how to use <em>{for}</em> bindings with data-linked elements."
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
            "title": "Data-linked top-level elements: &lt;div data-link=\"...\"&gt; etc.",
            "text": "This sample uses data-linking on top-level elements (i.e. elements that are not part of rendered templates): "
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.link(true, \"#linkedContent\", app)"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<div id=\"linkedContent\">\n  <table>\n    ...\n    <tbody class=\"movies\" data-link=\"{for movies tmpl='movieTmpl'}\"></tbody>\n  </table>\n\n  <div class=\"detail\" data-link=\"{for movies[selectedIndex] tmpl='#detailTemplate'}\"></div>\n</div>"
          },
          {
            "_type": "para",
            "title": "Data-linked {for} binding: data-link=\"{for ...}\"",
            "text": "The data-linked <em>&lt;tbody&gt;</em> element uses a <em>{for ...}</em> binding, referencing a template -"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<tbody class=\"movies\" data-link=\"{for movies tmpl='movieTmpl'}\"></tbody>"
          },
          {
            "_type": "para",
            "title": "",
            "text": " - so it is the element-based data-linking equivalent of "
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{for movies tmpl='movieTmpl'}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "and the content of the <em>&lt;tbody&gt;</em> is automatically incrementally updated when the <em>movies</em> array is modified."
          },
          {
            "_type": "para",
            "title": "",
            "text": "Similarly the whole detail view, with its dynamic linking to the selected movie item, is achieved by a single data-linked top-level <em>&lt;div ...&gt;</em>, using <em>{for ...}</em> referencing a template:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<div class=\"detail\" data-link=\"{for movies[selectedIndex] tmpl='#detailTemplate'}\"></div>"
          }
        ],
        "codetabs": [],
        "sampleName": "editable-data/toplevel-for",
        "url": "samples/editable-data/toplevel-for/sample",
        "height": "300"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the <a href=\"#samples/editable/observe\">next sample</a> we will replace the declarative top-level binding for the detail view by a programmatic approach, using <em>observable.observe()</em>. "
      }
    ]
  },
  "samples/editable/observe": {
    "title": "Editable data: Using observable.observe()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample modifies the <a href=\"#samples/editable/toplevel-for\">previous sample</a> by replacing the declarative top-level binding for the detail view by a programmatic approach, using <em>observable.observe()</em>."
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
            "text": "We will replace the top-level data-linked element for the detail view:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<div id=\"movieDetail\" class=\"detail\"></div>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "by an unlinked element:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<div id=\"movieDetail\" class=\"detail\"></div>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Now, we will set up a listener for observable changes in the selectedIndex property of our <em>app</em> object, and when it changes we will insert or remove data-linked templated content for the selected data item, within our <em>movieDetail</em> element. "
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.observable.observe(app, \"selectedIndex\",  function(event, args) {\n  var selectedIndex = args.value;\n  if (selectedIndex > -1) {\n    $.link.detailTmpl(\"#movieDetail\", app.movies[selectedIndex]);\n  } else {\n    $(\"#movieDetail\").empty();\n  }\n});"
          }
        ],
        "codetabs": [],
        "sampleName": "editable-data/observe",
        "url": "samples/editable-data/observe/sample",
        "height": "300"
      }
    ]
  },
  "samples/editable": {
    "title": "Samples: Editable data",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "These four samples explore alternative patterns for creating two-way binding and providing UI for editing data."
      },
      {
        "_type": "para",
        "title": "",
        "text": "The UI for all four is visually identical, but the approach to templated rendering and data-linking is different."
      },
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
            "hash": "samples/editable/tags",
            "label": "Using data-linked tags: {^{...}}"
          },
          {
            "hash": "samples/editable/elems",
            "label": "Using data-linked elements"
          },
          {
            "hash": "samples/editable/toplevel-for",
            "label": "Top-level data-linked elements, and data-link using {for ...}"
          },
          {
            "hash": "samples/editable/observe",
            "label": "Using observable.observe() to bind to data changes"
          }
        ]
      }
    ]
  },
  "samples/tag-controls/tree": {
    "title": "Samples: A JsViews \"tree\" tag control",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This set of samples shows three variants of a <em>tree</em> tag control:\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<ul><li>The first uses <em>visible{:...}</em> binding to show and hide tree nodes using <em>display:none</em>. It also allows the user to select/deselect nodes.</li> \n<li>The second uses <em>{^{if ...}}</em> binding to conditionally render tree nodes.</li>\n<li>The third adds editability, to allow the user to create or remove nodes, and to modify labels.</li></ul>"
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/tag-controls/tree/visible-binding",
            "label": "tree with 'visible' binding"
          },
          {
            "hash": "samples/tag-controls/tree/if-binding",
            "label": "tree with if-binding"
          },
          {
            "hash": "samples/tag-controls/tree/editable",
            "label": "Editable tree"
          }
        ]
      }
    ]
  },
  "samples/tag-controls/edit": {
    "title": "Samples: A JsViews \"edit\" tag control",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/tag-controls/edit/simple-textbox",
            "label": "Simple textbox control"
          },
          {
            "hash": "samples/tag-controls/edit/generic",
            "label": "Generic edit control"
          },
          {
            "hash": "samples/tag-controls/edit/array-binding",
            "label": "Array binding"
          }
        ]
      }
    ]
  },
  "samples/tag-controls/validate": {
    "title": "Samples: A JsViews \"validate\" tag control",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "These samples take the <em>{{edit}}</em> tag control above, and derive from it to provide a <em>{{validate}}</em> control."
      },
      {
        "_type": "para",
        "title": "",
        "text": "This allows all the variants of the <em>{{edit}}</em> control (as <em>text box</em>, <em>dropdown</em>, <em>checkbox</em>, <em>radio button group</em>, or <em>textarea</em>) to support validation."
      },
      {
        "_type": "para",
        "title": "",
        "text": "In addition, a <em>{{validation}}</em> control adds group validation. See the date-picker validation wizard sample, as an example of using the group validation features: In that sample, the <em>next</em> button is only enabled when all controls on the current pane validate successfully."
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/tag-controls/validate/simple",
            "label": "Simple validate"
          },
          {
            "hash": "samples/tag-controls/validate/group",
            "label": "Validation group"
          },
          {
            "hash": "samples/tag-controls/validate/array-binding",
            "label": "Array binding"
          }
        ]
      }
    ]
  },
  "samples/tag-controls/datepicker": {
    "title": "Samples: A JsViews \"datepicker\" tag control",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The <em>{{datepicker}}</em> tag derives from the <em>{{edit}}</em> tag, and integrates the <em>jQueryUI datepicker widget</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "This allows data-linking directly to widget properties, as well as using the <em>{{edit}}</em> tag functionality such as <em>convert</em> and <em>convertBack</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "In addition, validation support is obtained, simply by wrapping a <em>{{datepicker}}</em> tag with a <em>{{validation}}</em>."
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/tag-controls/datepicker/simple",
            "label": "Simple datepicker"
          },
          {
            "hash": "samples/tag-controls/datepicker/variants",
            "label": "datepicker variants"
          },
          {
            "hash": "samples/tag-controls/datepicker/with-validation",
            "label": "With validation"
          },
          {
            "hash": "samples/tag-controls/datepicker/with-validation-wizard",
            "label": "With validation wizard"
          }
        ]
      }
    ]
  },
  "samples/tag-controls/slider": {
    "title": "Samples: A JsViews \"slider\" tag control",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The <em>{{slider}}</em> tag derives from the <em>{{edit}}</em> tag, and integrates the <em>jQueryUI slider widget</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "This allows data-linking directly to widget properties, as well as using the <em>{{edit}}</em> tag functionality such as <em>convert</em> and <em>convertBack</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "In addition, validation support is obtained, simply by wrapping a <em>{{slider}}</em> tag with a <em>{{validation}}</em>."
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/tag-controls/slider/simple",
            "label": "Simple slider"
          },
          {
            "hash": "samples/tag-controls/slider/variants",
            "label": "slider variants"
          },
          {
            "hash": "samples/tag-controls/slider/with-validation",
            "label": "With validation"
          }
        ]
      }
    ]
  },
  "samples/tag-controls/datepicker/simple": {
    "title": "Sample: Datepicker control",
    "path": "",
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
            "_type": "template",
            "title": "Simple datepicker",
            "markup": "{^{datepicker startDate /}}"
          },
          {
            "_type": "template",
            "title": "datepicker with data-linked properties",
            "markup": "{^{datepicker startDate\n  changeMonth=true\n  ^maxDate=endDate\n/}}"
          },
          {
            "_type": "template",
            "title": "In-line datepicker with data-linked properties",
            "markup": "{^{datepicker middleDate\n  ^minDate=startDate\n  ^maxDate=endDate\n  ^numberOfMonths=~page.monthsSpan\n}}\n  <div></div>\n{{/datepicker}}"
          }
        ],
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/datepicker/datepicker.js",
            "label": "datepicker.js"
          }
        ],
        "sampleName": "tag-controls/datepicker/simple",
        "url": "samples/tag-controls/datepicker/simple/sample",
        "height": "730"
      }
    ]
  },
  "samples/tag-controls/datepicker/variants": {
    "title": "Sample: Datepicker variants",
    "path": "",
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
            "title": "",
            "text": "Multiple examples of <em>{{datepicker}}</em> syntax..."
          }
        ],
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/datepicker/datepicker.js",
            "label": "datepicker.js"
          }
        ],
        "sampleName": "tag-controls/datepicker/variants",
        "height": "1270",
        "url": "samples/tag-controls/datepicker/variants/sample"
      }
    ]
  },
  "samples/tag-controls/datepicker/with-validation": {
    "title": "Sample: Datepicker with validation",
    "path": "",
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
            "title": "",
            "text": "To add validation to a datepicker, simply wrap with a <em>{{validation}}</em> tag."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{validate startDate\n  required=true\n  ^maxday=endDate\n}}\n  {^{datepicker ^numberOfMonths=2 /}}\n{{/validate}}"
          }
        ],
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/generic-edit/edit.js",
            "label": "edit.js"
          },
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/validate/validate.js",
            "label": "validation.js"
          },
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/datepicker/datepicker-derived.js",
            "label": "datepicker.js"
          }
        ],
        "sampleName": "tag-controls/datepicker/with-validation",
        "height": "780",
        "url": "samples/tag-controls/datepicker/with-validation/sample"
      }
    ]
  },
  "samples/tag-controls/datepicker/with-validation-wizard": {
    "title": "Sample: Datepicker with validation (wizard)",
    "path": "",
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
            "title": "",
            "text": "The sample shows a wizard, using <em>{^{if ...}} ... {{else ...}} ... {{else ...}} ... {{else}} ... {{/if}}</em> to manage displaying the separate wizard steps, one after the other..."
          },
          {
            "_type": "para",
            "title": "",
            "text": "Moving to the next step is not possible until the <em>validate</em> controls on the current step are all valid. "
          },
          {
            "_type": "para",
            "title": "",
            "text": "This is achieved by wrapping in a validation group <em>{{validation}}</em>."
          },
          {
            "_type": "para",
            "title": "",
            "text": "The enabled/disabled state of the <em>next</em> button is data-linked to the <em>validation.isValid</em> property:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{validation}}\n  ...\n  <button id=\"next\" data-link=\"... disabled{:!~tag.isValid}\">Next</button>\n  ...\n  <h4>Choose a start date:</h4> \n  {^{validate startDate\n    required=true\n    ^maxday=endDate\n  }}\n    {^{datepicker ^numberOfMonths=1 /}}\n  {{/validate}}\n  ...\n{{/validation}}\n"
          }
        ],
        "title": "",
        "height": "450",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/generic-edit/edit.js",
            "label": "edit.js"
          },
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/validate/validate.js",
            "label": "validation.js"
          },
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/datepicker/datepicker-derived.js",
            "label": "datepicker.js"
          }
        ],
        "sampleName": "tag-controls/datepicker/with-validation-wizard",
        "url": "samples/tag-controls/datepicker/with-validation-wizard/sample"
      }
    ]
  },
  "samples/tag-controls/tree/visible-binding": {
    "title": "Sample: Tree control",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the first of <a href=\"#samples/tag-controls/tree\">three variants</a> of a <em>tree</em> tag control. This version uses <em>visible{:...}</em> binding to show and hide tree nodes using <em>display:none</em>."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/treeview/tree-if.js",
            "label": "tree-if.js"
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
            "text": "The data is a hierarchy of <em>node objects</em> each of which has a <em>name</em> property and an optional <em>folder</em> property containing child data nodes:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "var rootFolder = {\n  name: \"Categories\", folders: [\n    { name: \"Drama\", folders: [\n      { name: \"Courtroom\" },\n      { name: \"Political\" }\n    ]},\n    { name: \"Classic\", folders: [\n      ...\n    ]}\n  ]};"
          },
          {
            "_type": "para",
            "title": "",
            "text": "The <em>{{tree}}</em> tag is a tag control for a node in the tree. It renders a node in the data hierarchy, and has a boolean <em>expanded</em> property."
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.views.tags({\n  tree: {\n    onAfterLink: function() {\n      var self = this;\n      self.contents(\"li\").first()\n        .on( \"click\", \".toggle\", function() {\n          self.toggle();\n        })\n        .on( \"click\", \".selectable\", function() {\n          self.select();\n        });\n    },\n    template: \"#treeTemplate\",\n\n    //PROPERTIES\n    expanded: false, // default to unexpanded\n\n    //METHODS\n    toggle: function() {\n      $.observable(this).setProperty(\"expanded\", !this.expanded);\n    },\n    ...\n  }\n});"
          },
          {
            "_type": "para",
            "title": "",
            "text": "It uses a template which recursively renders the child data nodes using the same data-linked tag: <em>{^{tree}}</em>, and data-links to the <em>expanded</em> property of the control (<em>tag</em> instance)."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<li>\n  ...\n  <span>{{>name}}</span>\n</li>\n{{if folders}}\n  <li data-link=\"visible{:~tag.expanded}\">\n    <ul>\n      {{for folders}}\n        {^{tree/}}\n      {{/for}}\n    </ul>\n  </li>\n{{/if}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "This version of the <em>{{tree}}</em> binds using the data-link <em>visible</em> target  to show or hide the child nodes. "
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<li data-link=\"visible{:~tag.expanded}\">"
          }
        ],
        "sampleName": "tag-controls/tree/visible-binding",
        "url": "samples/tag-controls/tree/visible-binding/sample",
        "height": "290"
      }
    ]
  },
  "samples/tag-controls/tree/if-binding": {
    "title": "Sample: Tree with if-binding",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the second of <a href=\"#samples/tag-controls/tree\">three variants</a> of a <em>tree</em> tag control. This version uses <em>{^{if ...}}</em> binding to conditionally render tree nodes."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/treeview/tree-if.js",
            "label": "tree-if.js"
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
            "text": "The data is a the same hierarchy of <em>node objects</em> used in the <a href=\"#samples/tag-controls/tree/visible-binding\">previous sample</a>:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "var rootFolder = {\n  name: \"Categories\", folders: [\n    { name: \"Drama\", folders: [\n      { name: \"Courtroom\" },\n      { name: \"Political\" }\n    ]},\n    { name: \"Classic\", folders: [\n      ...\n    ]}\n  ]};"
          },
          {
            "_type": "para",
            "title": "",
            "text": "The <em>{{tree}}</em> tag is a tag control for a node in the tree. It renders a node in the data hierarchy, and sets a boolean <em>expanded</em> property on the data node."
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.views.tags({\n  tree: {\n    init: function(tagCtx, linkCtx, ctx) {\n      ...\n    },\n    onAfterLink: function() {\n      ... \n    },\n    template: \"#treeTemplate\",\n\n    //METHODS\n    toggle: function() {\n      $.observable(this.data).setProperty(\"expanded\", !this.data.expanded);\n    },\n    ...\n  }\n});"
          },
          {
            "_type": "para",
            "title": "",
            "text": "It has a template which with a <em>{^{if expanded }}</em> section which renders the child data nodes only if <em>expanded === true</em>, using the same data-linked tag: <em>{^{tree}}</em>."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<li>\n  ...\n  {{>name}}\n</li>\n{^{if expanded}}\n  <li>\n    <ul>\n      {{for folders}}\n        {^{tree/}}\n      {{/for}}\n    </ul>\n  </li>\n{{/if}}"
          }
        ],
        "sampleName": "tag-controls/tree/if-binding",
        "height": "290",
        "url": "samples/tag-controls/tree/if-binding/sample"
      }
    ]
  },
  "samples/tag-controls/tree/editable": {
    "title": "Sample: Editable tree",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the third of <a href=\"#samples/tag-controls/tree\">three variants</a> of a <em>tree</em> tag control. This version adds editability, to allow the user to create or remove nodes, and to modify labels."
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
            "text": "This version builds on the <a href=\"#samples/tag-controls/tree/if-binding\">previous sample</a>, and adds editability:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.views.tags({\n  tree: {\n    ...\n    template: \"#treeTemplate\",\n\n    //METHODS\n    toggle: function() {\n      $.observable(this.data).setProperty(\"expanded\", !this.data.expanded);\n    },\n    remove: function() {\n      var parentFolders = this.parent.data.folders,\n        index = this.tagCtx.view.index;\n      $.observable(parentFolders).remove(index);\n    },\n    addFolder: function() {\n      $.observable(this.data.folders).insert(this.data.folders.length, {\n        name: \"new folder\",\n        folders: []\n      });\n      $.observable(this.data).setProperty(\"expanded\", true);\n    }\n    ...\n  }\n});"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<li>\n  ...\n  <input data-link=\"name\" />\n  <span class=\"add\">add</span>\n  {^{if ~parentTags.tree}}\n    {{!-- Don't allow removing the top-level tree control --}}\n    <img class=\"remove\" src=\"close.png\" />\n  {{/if}}\n</li>\n{^{if expanded}}\n  ...\n{{/if}}\n"
          }
        ],
        "sampleName": "tag-controls/tree/editable",
        "height": "320",
        "url": "samples/tag-controls/tree/editable/sample"
      }
    ]
  },
  "samples/tag-controls/slider/simple": {
    "title": "Sample: Slider control",
    "path": "",
    "sections": [
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/slider/slider.js",
            "label": "slider.js"
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
            "_type": "template",
            "title": "Simple slider",
            "markup": "{^{slider size /}}"
          },
          {
            "_type": "template",
            "title": "slider with initialized properties",
            "markup": "{^{slider size range='min' min=1 max=200 width=400 orientation='vertical' /}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<div data-link=\"{slider size range='min' min=1 max=200 width=400 orientation='vertical'}\"></div>"
          },
          {
            "_type": "template",
            "title": "Data-linking to SVG content",
            "markup": "<svg data-link=\"css-width{: 2 + size*2}\" class=\"svg-circles\">\n  <circle data-link=\"r{:size} cx{:size + 1}\" ...></circle>\n  ...\n</svg>"
          }
        ],
        "sampleName": "tag-controls/slider/simple",
        "url": "samples/tag-controls/slider/simple/sample",
        "height": "400"
      }
    ]
  },
  "samples/tag-controls/slider/variants": {
    "title": "Sample: Slider variants",
    "path": "",
    "sections": [
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/slider/slider.js",
            "label": "slider.js"
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
            "text": "Multiple examples of <em>{{slider}}</em> syntax..."
          }
        ],
        "sampleName": "tag-controls/slider/variants",
        "url": "samples/tag-controls/slider/variants/sample",
        "height": "800"
      }
    ]
  },
  "samples/tag-controls/slider/with-validation": {
    "title": "Sample: Slider with validation",
    "path": "",
    "sections": [
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/generic-edit/edit.js",
            "label": "edit.js"
          },
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/validate/validate.js",
            "label": "validation.js"
          },
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/slider/slider-derived.js",
            "label": "slider.js"
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
            "text": "To add validation to a slider, simply wrap with a <em>{{validation}}</em> tag."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{validate size\n  min=20\n  max=150\n  msg_min=\"Min size: %cond%\"\n  msg_max=\"Max size: %cond%\"\n  preventInvalidData=~page.noInvalidData\n}}\n  {^{slider orientation='vertical' ... /}}\n{{/validate}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{validate size\n  min=50 max=100\n  msg_min=\"Min size: %cond%\"\n  msg_max=\"Max size: %cond%\"\n  preventInvalidData=~page.noInvalidData\n}}\n  <div data-link=\"{slider orientation='vertical' ...}\"></div>\n{{/validate}}"
          }
        ],
        "sampleName": "tag-controls/slider/with-validation",
        "url": "samples/tag-controls/slider/with-validation/sample",
        "height": "890"
      }
    ]
  },
  "samples/tag-controls/validate/simple": {
    "title": "Sample: Simple validate",
    "path": "",
    "sections": [
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/generic-edit/edit.js",
            "label": "edit.js"
          },
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/validate/validate.js",
            "label": "validation.js"
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
            "text": "The <em>{{validate}}</em> tag derives from the <em>{{edit}}</em> tag, and can similarly be used as <em>textbox</em>, <em>checkbox</em>, <em>dropdown</em>, <em>radio buttons</em>, <em>textarea</em>.\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "In each case optional properties can be specified on the edit tag, not only for <em>convert</em>, <em>convertBack</em>, <em>linkTo</em> etc., but also properties specifying validation tests to be applied.\n"
          },
          {
            "_type": "template",
            "title": "Data-linked textbox",
            "markup": "{^{validate name\n  convert=\"upper\"\n  convertBack=~lower\n  linkTo=name2\n}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<input data-link=\"{validate name\n  convert='upper'\n  convertBack=~lower\n  linkTo=name2\n}\"/>"
          },
          {
            "_type": "template",
            "title": "Data-linked checkbox",
            "markup": "<!-- optionally include properties on {{validate ...}} tag, such as convert, convertBack, linkTo, ... -->\n{^{validate agree ...}}\n  <input type=\"checkbox\"/>\n{{/validate}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<!-- optionally include properties on {validate ...} tag, such as convert etc. -->\n<input type=\"checkbox\" data-link=\"{validate agree ...}\"/>"
          },
          {
            "_type": "template",
            "title": "Data-linked drop down",
            "markup": "{^{validate name ...}}\n  <select size=\"3\">\n    <option value=\"JO\">Jo</option>\n    <option value=\"MARY\">Mary</option>\n  </select>\n{{/validate}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<select size=\"3\" data-link=\"{validate name ...'}\">\n  <option value=\"JO\">Jo</option>\n  <option value=\"MARY\">Mary</option>\n</select>"
          },
          {
            "_type": "template",
            "title": "Data-linked radio buttons",
            "markup": "{^{validate person ...}}\n  <div class=\"radiogroup\">\n    <input type=\"radio\" person=\"gp2\" value=\"JO\"/>\n    ...\n  </div>\n{{/validate}}\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<div data-link=\"{validate person ...}\" class=\"radiogroup\">\n  <input type=\"radio\" name=\"gp1\" value=\"JO\"/>\n  ...\n</div>\n"
          },
          {
            "_type": "template",
            "title": "Data-linked textarea",
            "markup": "{^{validate person ...}}\n  <textarea></textarea>\n{{/validate}}\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<textarea data-link=\"{validate person ...}\"></textarea>"
          }
        ],
        "sampleName": "tag-controls/validate/simple",
        "url": "samples/tag-controls/validate/simple/sample",
        "height": "800"
      }
    ]
  },
  "samples/tag-controls/validate/group": {
    "title": "Sample: Validation group",
    "path": "",
    "sections": [
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/generic-edit/edit.js",
            "label": "edit.js"
          },
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/validate/validate.js",
            "label": "validation.js"
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
            "text": "The <em>{{validation}}</em> validation group control is a validation container, which manages all the <em>{{validate}}</em> tags within the container. "
          },
          {
            "_type": "para",
            "title": "",
            "text": "It provides useful functionality, such as a <em>validate()</em> method which validates the child tags, and triggers display of the validation message on the first invalid control encountered. "
          },
          {
            "_type": "para",
            "title": "",
            "text": "It is even possible to data-link directly to the <em>isValid</em> property of the <em>{{validation}}</em> tag, to determine whether the whole form (or container) is valid:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{if ~tag.isValid}}\n  <span class=\"val-title\">no errors</span>\n{{else}}\n  <span class=\"val-title-error\">VALIDATION ERRORS</span>\n{{/if}}"
          }
        ],
        "sampleName": "tag-controls/validate/validation-group",
        "url": "samples/tag-controls/validate/validation-group/sample",
        "height": "850"
      }
    ]
  },
  "samples/form-els/simple": {
    "title": "Form elements: Binding top-level elements, or templated content",
    "path": "",
    "sections": [
      {
        "_type": "code",
        "title": "",
        "code": "$(\"#amountPickers\").link(true, data);"
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
            "text": "This version of the sample uses <em>top-level data-linking</em>. An HTML container element in the page is data-linked as follows: "
          },
          {
            "_type": "code",
            "title": "",
            "code": "$(\"#amountPickers\").link(true, data);"
          },
          {
            "_type": "para",
            "title": "",
            "text": "and elements within the data-linked container are linked to the data using <em>element-based data-linking syntax</em>:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<div id=\"amountPickers\">\n  ...\n  <span data-link=\"amount\"></span>\n  ...\n  <input type=\"checkbox\" data-link=\"listbox\" />\n  ...\n  <input data-link=\"amount\" />\n  ...\n  <select data-link=\"amount\">\n    <option>0</option>\n    ...  \n  </select>\n  ...\n  <input type=\"radio\" name=\"amt\" value=\"0\" data-link=\"amount\" />\n  ...\n  <textarea data-link=\"amount\"></textarea>\n  ...\n</div>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Note the above examples use compact data-linking syntax:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "data-link=\"amount\""
          },
          {
            "_type": "para",
            "title": "",
            "text": "which is equivalent to the following full syntax:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "data-link=\"{:amount:}\"."
          },
          {
            "_type": "para",
            "title": "",
            "text": "Use the full syntax if you need to specify converters, data-linking targets other than the default, or if you need to data-link to more than one target on the same element. For example the following targets both the default binding for <em>&lt;select></em> and also the <em>size</em> attribute:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<select data-link=\"{:amount:} size{:listbox ? 4 : null}\">"
          }
        ],
        "url": "samples/form-els/simple/top-level",
        "height": "784"
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
            "text": "This version of the sample uses <em>data-linking within a template</em>. The template is rendered and data-linked within an HTML container element as follows: "
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.templates(\"#tmpl\").link(\"#amountPickers\", data);"
          },
          {
            "_type": "para",
            "title": "",
            "text": "and elements within the template are linked to the data using either <em>element-based data-linking syntax</em> or <em>JsViews tag-based data-linking syntax</em>:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<script id=\"tmpl\" type=\"text/x-jsrender\">\n  ...\n  <b data-link=\"amount+1\"></b>\n  ...\n  {^{:amount}}\n  ...\n  <input type=\"checkbox\" data-link=\"listbox\" />\n  ...\n  <input data-link=\"amount\" />\n  ...\n  <select data-link=\"{:amount:} size{:listbox ? 4 : null}\">\n    <option>0</option>\n    ...  \n  </select>\n  ...\n  <input type=\"radio\" name=\"amt\" value=\"0\" data-link=\"amount\" />\n  ...\n  <textarea data-link=\"amount\"></textarea>\n  ...\n</script>\n\n<div id=\"amountPickers\"></div>\n"
          }
        ],
        "url": "samples/form-els/simple/template",
        "height": "757"
      }
    ]
  },
  "samples/form-els/converters": {
    "title": "Form elements: Two-way binding and converters",
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
            "_type": "para",
            "title": "",
            "text": "Different <em>convert</em> and <em>convertBack</em> converters are registered, and then used in the form element data-binding as follows:"
          },
          {
            "_type": "code",
            "title": "<span class=\"nonitalic\">Binding  <em>\"base 0\"</em> data values to <em>\"base 1\"</em> values in UI:</span>",
            "code": "$.views.converters({\n  minus1: function(val) { return val-1; },\n  plus1: function(val) { return 1+val; },\n  ...\n});\n"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<input data-link=\"{plus1:amount:minus1}\" />\n<span data-link=\"{plus1:amount}\"></span>"
          },
          {
            "_type": "code",
            "title": "<span class=\"nonitalic\">Binding inverted <em>boolean</em> data values to UI:</span>",
            "code": "not: function(val) { return !val; }"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<input type=\"checkbox\" data-link=\"{not:listbox:not}\" />"
          },
          {
            "_type": "code",
            "title": "<span class=\"nonitalic\">Binding <em>number</em> data values to <em>string</em> values in UI:</span>",
            "code": "intToStr: function (value) { return \"\" + value; },\nstrToInt: function (value) { return parseInt(value); }"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<input data-link=\"{intToStr:amount:strToInt}\"/>...\n<select data-link=\"{intToStr:amount:strToInt} ...\">...\n<input type=\"radio\" name=\"amt\" value=\"0\" data-link=\"{intToStr:amount:strToInt}\" />...\n<textarea data-link=\"{intToStr:amount:strToInt}\" ...></textarea>..."
          },
          {
            "_type": "code",
            "title": "<span class=\"nonitalic\">Binding <em>number</em> data values to UI elements using <em>bit-masks</em>:</span>",
            "code": "setBit: function (value) {\n  ...\n  // Use the mask to set or unset that bit on the data, and return the modified value\n  return value ? (dataValue | mask) : (dataValue & ~mask);\n},\ngetBit: function (value) {\n  // \"Convert\": Get the bit from the data, and check or uncheck the checkbox\n  return (value >> this.linkCtx.elem.getAttribute(\"data-bit\") & 1) === 1;\n}"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<input type=\"checkbox\" data-bit=\"0\" data-link=\"{getBit:amount:setBit}\" />"
          }
        ],
        "url": "samples/form-els/converters/sample",
        "height": "742"
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
            "title": "Using converters for tag rendering",
            "text": "HTML encoding, no custom converter:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<td>{{>dayOff}}</td>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Render from data, convert to display name:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<td>{{intToDay:dayOff}}</td>"
          },
          {
            "_type": "para",
            "title": "Using convert and convertBack with data-linking",
            "text": "Link from data value, no converter:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<td data-link=\"dayOff\"></td>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Link from data, converted to display name:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<td data-link=\"{intToDay:dayOff}\"></td>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Two-way data linking with convert and convertBack between data format (integer) and display name (text).<br/>Also show data value as tooltip:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<td><input data-link=\"{intToDay:dayOff:dayToInt} title{:dayOff}\" /></td>"
          }
        ],
        "url": "samples/form-els/converters/day-to-int",
        "height": "190"
      }
    ]
  },
  "samples/form-els/array-binding": {
    "title": "Form elements: Array binding",
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
            "_type": "para",
            "title": "",
            "text": "This sample is similar to the previous <a href=\"#samples/form-els/converters\">converters</a> sample - but here the <em>amount</em> can be selected from a range of integers that is chosen by the user (by choosing the number of bits!).\n\nThe array of possible integers is then generated from code:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "function setData() {\n  ...\n  newAmounts = [];\n  ...\n  var maxAmount = Math.pow(2, bitCount);\n  for(var i = 0; i < maxAmount ; i++) {\n    newAmounts.push(i);\n  }\n  ...\n  $.observable(amounts).refresh(newAmounts);\n}\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "The collection of <em>&lt;option></em> elements or <em>&ltinput type=\"radio\"></em> elements is dynamically driven by data-linking to the <em>amounts</em> array:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{for amounts}}\n  <input type=\"radio\" name=\"amt\" value=\"{{:#data}}\" data-link=\"{intToStr:~root.amount:strToInt}\" />\n{{:#data}}...\n{{/for}}"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<select data-link=\"{intToStr:amount:strToInt} size{:listbox ? amounts.length : null}\">\n  {^{for amounts}}\n    <option data-link=\"selected{:~root.amount===#data}\">{{:#data}}</option>\n  {{/for}}\n</select>"
          }
        ],
        "url": "samples/form-els/array-binding/sample",
        "height": "800",
        "title": "Data-linking &lt;option> collections and &ltinput type=\"radio\"> collections to arrays"
      }
    ]
  },
  "samples/form-elems": {
    "title": "Samples: Form elements",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/form-els/simple",
            "label": "Form element binding"
          },
          {
            "hash": "samples/form-els/array-binding",
            "label": "Array binding"
          },
          {
            "hash": "samples/form-els/converters",
            "label": "Two-way binding and converters"
          }
        ]
      }
    ]
  },
  "samples/tag-controls/edit/array-binding": {
    "title": "Sample: Array binding with the edit control",
    "path": "",
    "sections": [
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/generic-edit/edit.js",
            "label": "edit.js"
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
            "text": "This sample is similar to the previous <a href=\"#samples/tag-controls/edit/generic\">edit control</a> sample - but here the <em>people</em> array can be modified - by adding or removing people, or changing their <em>name</em> property."
          },
          {
            "_type": "code",
            "title": "",
            "code": ".on(\"click\", \"#add\", function() {\n  $.observable(model.people).insert(model.people.length, {name: \"new\"...});\n})\n.on(\"click\", \".remove\", function() {\n  var view = $.view(this);\n  $.observable(model.people).remove(view.index);\n});"
          },
          {
            "_type": "para",
            "title": "",
            "text": "The collection of <em>&lt;option></em> elements or <em>&ltinput type=\"radio\"></em> elements is dynamically driven by data-linking to the <em>people</em> array:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{edit person ...}}\n  <select>\n    {^{for people}}\n      <option data-link=\"value{upper:name} {:name:}\"></option>\n    {{/for}}\n  </select>\n{{/edit}}\n"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{edit person ...}}\n  <div class=\"radiogroup\">\n    {^{for people}}\n      <input type=\"radio\" name=\"gp1\" data-link=\"value{upper:name}\"/>...\n    {{/for}}\n  </div>\n{{/edit}}\n"
          }
        ],
        "title": "The  {{edit}} tag with &lt;option> collections or &ltinput type=\\\"radio\\\"> collections data-linked to arrays",
        "sampleName": "tag-controls/edit/array-binding",
        "height": "900",
        "url": "samples/tag-controls/edit/array-binding/sample"
      }
    ]
  },
  "samples/tag-controls/edit/generic": {
    "title": "Sample: Generic edit control",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample takes the previous <a href=\"#samples/tag-controls/edit/simple-textbox\">simple textbox</a> sample a lot further, and shows a powerful generic custom <em>{{edit}}</em> tag control which allows you to provide <em>editable data</em> support through two-way data-binding associated with any of the standard <em>HTML Form</em> controls."
      },
      {
        "_type": "para",
        "title": "",
        "text": "It can be associated with a <em>text box</em>, a <em>dropdown</em>, a <em>checkbox</em>, a <em>radio button group</em>, or a <em>textarea</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that you can also data-link directly to <em>HTML Form elements</em>, as shown in the <a href=\"#samples/form-elems\">Form elements</a> samples. "
      },
      {
        "_type": "para",
        "title": "",
        "text": "However, the <em>{{edit}}</em> custom tag allows you to provide additional functionality, along with the syntactic advantages and power of custom tags: <em>{{mytag mydata myproperty=xxx...}}</em>:\n<ul><li>You can use it as the starting point for your own tags, (and if you wish you can remove functionality, to create something simpler, as was done in the <a href=\"#samples/tag-controls/simple-textbox\">simple text box</a> example).</li>\n<li>Alternatively you can use it as the <em>base class</em> for your own custom tag.</li>\n<li>See the later <a href=\"#samples/tag-controls/datepicker\">datepicker</a> and <a href=\"#samples/tag-controls/slider\">slider</a> samples for examples of using the <em>{{edit}}</em> as base class for your own control. You could use the same approach to create a tag that encapsulates other <em>jQuery UI</em> widgets, or that wraps controls from other client-side UI libraries.</li></ul>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Out of the box, <em>{{edit}}</em> already provides some useful functionality beyond the simple data-linked <a href=\"#samples/form-elems\">form elements</a>:\n<ul><li>It allows optional <em>convert</em> and <em>convertBack</em> converters to be associated with the control - no matter what type of control it is (<em>radio buttons</em>, <em>select</em>, <em>textarea</em>...).</li>\n<li>It also provides <em>linkTo</em> support to allow two-way binding where the <em>'bind from'</em> source data node and the <em>'bind to'</em> target data node are different nodes (as distinct from normal two-way binding on a single data node).</li>\n<li>The <em>{{edit}}</em> control can be used with either data-linked tag syntax (<em>{^{edit ...}}</em>) or element-based data-linking syntax (<em>data-link=\"{edit ...}\"</em>).\n</li></ul>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "It will be used as a <em>base control</em> for the <a href=\"#samples/tag-controls/validate\"><em>{{validate}}</em></a>, <a href=\"#samples/tag-controls/datepicker\"><em>{{datepicker}}</em></a> and <a href=\"#samples/tag-controls/slider\"><em>{{slider}}</em></a> controls that are shown in later samples, below. "
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/generic-edit/edit.js",
            "label": "edit.js"
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
            "text": "The <em>{{edit}}</em> tag can be used as <em>textbox</em>, <em>checkbox</em>, <em>dropdown</em>, <em>radio buttons</em>, <em>textarea</em>.\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "In each case optional properties can be specified on the edit tag for <em>convert</em>, <em>convertBack</em>, <em>linkTo</em> etc.\n"
          },
          {
            "_type": "template",
            "title": "Data-linked textbox",
            "markup": "{^{edit name\n  convert=\"upper\"\n  convertBack=~lower\n  linkTo=name2\n}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<input data-link=\"{edit name\n  convert='upper'\n  convertBack=~lower\n  linkTo=name2\n}\"/>"
          },
          {
            "_type": "template",
            "title": "Data-linked checkbox",
            "markup": "<!-- optionally include properties on {{edit ...}} tag, such as convert, convertBack, linkTo, ... -->\n{^{edit agree ...}}\n  <input type=\"checkbox\"/>\n{{/edit}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<!-- optionally include properties on {edit ...} tag, such as convert etc. -->\n<input type=\"checkbox\" data-link=\"{edit agree ...}\"/>"
          },
          {
            "_type": "template",
            "title": "Data-linked drop down",
            "markup": "{^{edit name ...}}\n  <select size=\"3\">\n    <option value=\"JO\">Jo</option>\n    <option value=\"MARY\">Mary</option>\n  </select>\n{{/edit}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<select size=\"3\" data-link=\"{edit name ...'}\">\n  <option value=\"JO\">Jo</option>\n  <option value=\"MARY\">Mary</option>\n</select>"
          },
          {
            "_type": "template",
            "title": "Data-linked radio buttons",
            "markup": "{^{edit person ...}}\n  <div class=\"radiogroup\">\n    <input type=\"radio\" person=\"gp2\" value=\"JO\"/>\n    ...\n  </div>\n{{/edit}}\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<div data-link=\"{edit person ...}\" class=\"radiogroup\">\n  <input type=\"radio\" name=\"gp1\" value=\"JO\"/>\n  ...\n</div>\n"
          },
          {
            "_type": "template",
            "title": "Data-linked textarea",
            "markup": "{^{edit person ...}}\n  <textarea></textarea>\n{{/edit}}\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "or"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<textarea data-link=\"{edit person ...}\"></textarea>"
          }
        ],
        "sampleName": "tag-controls/edit/generic",
        "url": "samples/tag-controls/edit/generic/sample",
        "height": "1000"
      }
    ]
  },
  "samples/tag-controls/validate/array-binding": {
    "title": "Sample: Array binding with the validation control",
    "path": "",
    "sections": [
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/generic-edit/edit.js",
            "label": "edit.js"
          },
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/validate/validate.js",
            "label": "validation.js"
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
            "text": "This sample is similar to the previous <a href=\"#samples/tag-controls/validate/group\">validation group</a> sample - but here the <em>people</em> array can be modified - by adding or removing people, or changing their <em>name</em> property."
          },
          {
            "_type": "code",
            "title": "",
            "code": ".on(\"click\", \"#add\", function() {\n  $.observable(model.people).insert(model.people.length, {name: \"new\"...});\n})\n.on(\"click\", \".remove\", function() {\n  var view = $.view(this);\n  $.observable(model.people).remove(view.index);\n  validation.validate();\n});"
          },
          {
            "_type": "para",
            "title": "",
            "text": "The collection of <em>&lt;option></em> elements or <em>&ltinput type=\"radio\"></em> elements is dynamically driven by data-linking to the <em>people</em> array:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{validate person ...}}\n  <select>\n    {^{for people}}\n      <option data-link=\"value{upper:name} {:name:}\"></option>\n    {{/for}}\n  </select>\n{{/validate}}"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{validate person ...}}\n  <div class=\"radiogroup\">\n    {^{for people}}\n      <input type=\"radio\" name=\"gp1\" data-link=\"value{upper:name}\"/>...\n    {{/for}}\n  </div>\n{{/validate}}"
          }
        ],
        "sampleName": "tag-controls/validate/array-binding",
        "url": "samples/tag-controls/validate/array-binding/sample",
        "height": "975",
        "title": "The  {{validate}} tag with &lt;option> collections or &ltinput type=\\\"radio\\\"> collections data-linked to arrays"
      }
    ]
  },
  "samples/tag-controls/edit/simple-textbox": {
    "title": "Sample: Simple textbox control",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample show a simple custom <em>{{textbox}}</em> tag control."
      },
      {
        "_type": "para",
        "title": "",
        "text": "It can be considered as a first step towards a more advanced control, such as the generic <em>{{edit}}</em> control shown in the <a href=\"#samples/tag-controls/edit/generic\">next sample</a>."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/textbox/simple-textbox.js",
            "label": "simple textbox"
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
            "text": "This sample illustrates the simplest possible custom tag control supporting <em>two-way data-binding</em>."
          },
          {
            "_type": "para",
            "title": "",
            "text": "By using a template which includes an <em>input</em> element:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<input/>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "and then, in the <em>onAfterLink</em> handler, setting the <em>linkedElem</em> property to be a jQuery object containing that <em>input</em> element:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.views.tags({\n  textbox: {\n    onAfterLink: function() {\n      <em>this.linkedElem = this.contents(\"input\");</em>\n    },\n    template: \"<input/>\"\n  }\n});"
          },
          {
            "_type": "para",
            "title": "",
            "text": "JsViews automatically sets up two-way data-linking on the <em>input</em> element."
          },
          {
            "_type": "para",
            "title": "",
            "text": "Now you can get two-binding to your data, simply by setting the path to the data as parameter on your <em>{{textbox}}</em> tag:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{textbox my.data.path /}}"
          }
        ],
        "sampleName": "tag-controls/edit/simple-textbox",
        "url": "samples/tag-controls/edit/simple-textbox/sample",
        "height": "340"
      }
    ]
  }
};