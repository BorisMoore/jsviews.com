var content = $.views.documentation.content;

content.samples = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/samples")) ||
{
  "samples": {
    "title": "Samples",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "<em>Note:</em> New content is being added regularly to this set of samples."
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/jsr",
            "label": "JsRender samples"
          },
          {
            "hash": "samples/jso",
            "label": "JsObservable samples"
          },
          {
            "hash": "samples/jsv",
            "label": "JsViews samples"
          }
        ]
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also:\n\n<ul>\n<li>the <a href=\"https://github.com/BorisMoore/jsrender/tree/master/demos\">demos</a> folder of the JsRender GitHub repository - available <a href=\"http://borismoore.github.io/jsrender/demos/index.html\">here</a> as live samples.</li>\n<li>the <a href=\"https://github.com/BorisMoore/jsviews/tree/master/demos\">demos</a> folder of the JsViews GitHub repository - or <a href=\"http://borismoore.github.io/jsviews/demos/index.html\">here</a> as live samples.</li>\n</ul>"
      }
    ]
  },
  "samples/jsr": {
    "title": "Samples: JsRender",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "<em>Note:</em> New content is being added regularly to this set of samples."
      },
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
            "hash": "samples/jsr/composition/sub-tmpl",
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
            "text": "Composition by providing <em>tmpl</em> parameters referencing external templates, rather than inline block content, as in:\n\n```jsr\n{{for languages tmpl=\"#columnTemplate\"/}}\n```\n\nor:\n\n```jsr\n{{if name.charAt(0)==='E' tmpl='#rowTemplate'}}\n{{else tmpl='#columnTemplate'}}\n{{/if}}\n```\n\nAlso shows <em>wrapping</em>, where an external template is used which then <em>wraps</em> the rendered block content, as in:\n\n```jsr\n{{include tmpl=\"#sectionWrapperTemplate\"}}\n  {{>title}}\n{{/include}}\n```\n\n```jsr\n<script id=\"sectionWrapperTemplate\" type=\"text/x-jsrender\">\n  <td>Section: <em>{{include tmpl=#content/}}</em></td>\n</script>\n```\n\nor as in:\n\n```jsr\n{{for languages tmpl='#indexWrapperTemplate'}}\n  <b>{{>name}}</b>\n{{/for}}\n```\n\n```jsr\n<script id=\"indexWrapperTemplate\" type=\"text/x-jsrender\">\n  <div>\n    {{:#index}}:\n    {{include tmpl=#content/}}\n  </div>\n</script>\n```"
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/composition/tmpl",
        "url": "samples/jsrender/composition/tmpl/sample",
        "onlyJsRender": true,
        "height": "244",
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
        "text": "All of the templates referenced by <em>tmpl=...</em> in the preceding <a href=\"#samples/jsr/composition/tmpl\">tmpl parameter</a> sample were declared as script blocks. But they could equally have been compiled from markup strings.\n\nHere is a simple example:"
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
            "text": "We register two named templates, compiled from markup strings:\n\n```js\n$.templates({\n  people: '<div>{{:name}} lives in {{for address tmpl=\"address\" /}}</div>',\n  address: '<b>{{>city}}</b>'\n});\n```\n\nThe first one uses the second as a nested template:\n\n```jsr\n{{for address tmpl=\"address\" /}}\n```"
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
        "text": "This sample takes the preceding <a href=\"#samples/jsr/composition/from-strings\">template composition/from strings</a> sample, and modifies it to use templates loaded from the server.\n\n(See also the simple examples of loading templates from the server, in the <a href=\"#compiletmpl\">compile templates</a> API topic.)"
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
            "text": "We use a helper to \"lazily\" fetch the template, asynchronously, but only if it has not yet been fetched. Also, we make sure the template only gets compiled from a string <em>once</em>.\n\n(Note that for optimal performance, it is always best to ensure that the `$.template(... markup)` method, which compiles a template from a string, is only ever called once for a given string). \n\n```js\nfunction lazyGetTemplate(name) {\n  var deferred = $.Deferred();\n  if ($.templates[name]) {\n    deferred.resolve();\n  } else {\n    $.getScript(...).then(function() {\n      ...  \n      deferred.resolve();\n    });\n  }\n  return deferred.promise();\n}\n```"
          },
          {
            "_type": "para",
            "title": "When all templates are loaded...",
            "text": "Once the requested template (along with any nested templates used as as part of the template composition) is loaded, the `render()` method can be called (or the `link()` method if you are using <em>JsViews</em>):\n\n```js\n$.when(\n    lazyGetTemplate(\"people\"),\n    ...  \n  )\n  .done(function() {\n      // Render or link once all templates for template composition are loaded\n      var html = $.templates.people.render(people);\n      ...\n    });\n```"
          }
        ],
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "samples/resources/templates/people.js",
            "label": "people.js"
          },
          {
            "_type": "codetab",
            "name": "",
            "url": "samples/resources/templates/address.js",
            "label": "address.js"
          }
        ],
        "sampleName": "jsrender/composition/remote-tmpl",
        "url": "samples/jsrender/composition/remote-tmpl/sample",
        "height": "90",
        "onlyJsRender": true
      }
    ]
  },
  "samples/jsr/composition/sub-tmpl": {
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
            "_type": "para",
            "title": "Using sub-templates",
            "text": "```js\n$.templates(\"movieTemplate\", {\n  markup: \"#movieTemplate\",\n  templates: {\n    columnTemplate: \"#columnTemplate\",\n    ...\n  }\n});\n```\n\nNow <em>\"columnTemplate\"</em> is a named template available only to the <em>\"movieTemplate\"</em>. (See <a href=\"#d.templates\">`$.templates()`</a>).\n\n```jsr\n<script id=\"movieTemplate\" type=\"text/x-jsrender\">\n  ...\n  {{for languages tmpl=\"columnTemplate\"/}}\n  ...\n</script>\n```"
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/composition/sub-tmpl",
        "url": "samples/jsrender/composition/sub-tmpl/sample",
        "height": "210",
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
            "text": "`nestedTemplates` is an object which holds references to compiled template objects for each of the nested templates. We pass it in as a helper object in the `render()` call.\n\n(Note we could also have provided the templates via helper objects registered globally with <em><a href=\"#helpers\">`$.views.helpers(...)`</a></em>).\n\n```js\nvar nestedTemplates = {\n  columnTemplate: $.templates(\"#columnTemplate\"),\n  ...\n};\n\nvar html = movieTemplate.render(movies, sub-templates);\n```\n\nNow each of the compiled templates, such as `nestedTemplates.columnTemplate` can be accessed from the outer template, and used for composition. Templates are accessed as regular helper objects such as `~columnTemplate`.\n\n```jsr\n<script id=\"movieTemplate\" type=\"text/x-jsrender\">\n  ...\n  {{for languages tmpl=~columnTemplate/}}\n  ...\n</script>\n```"
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/composition/tmpl-objects",
        "onlyJsRender": true,
        "url": "samples/jsrender/composition/tmpl-objects/sample",
        "height": "210"
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
            "text": "This sample shows some basic custom tags implemented as simple render functions, or templates, and in each case shows how the tag can incorporate block content...\n\n```jsr\n{{mytag}}\n  {{>title}}\n{{/mytag}}\n```\n\n...into its rendering.\n\nA variant, is to incorporate external content (through a tag parameter such as `tmpl`, referencing an external template) into the rendered output...\n\n```jsr\n{{mytag tmpl=\"#externalcontent\"/}}\n```"
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
        "_type": "para",
        "title": "",
        "text": "This sample shows a custom tag: <em>{{range}}</em> - extending the <em>{{for}}</em> tag, used with JsRender (code: <a href=\"download/sample-tag-controls/range/range.js\">range.js</a>).\n\n(See also the <a href=\"#samples/tag-controls/range\">tag-controls/range</a> sample - which uses the same tag with JsViews, as a data-linked custom tag control)."
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
            "title": "A <b>{{range}}</b> tag - extending the <b>{{for}}</b> tag",
            "text": "`{{range}}` inherits from `{{for}}`, and adds support for iterating over a range (`start` to `end`) of items within an array, or for iterating directly over integers from `start` integer to `end` integer."
          },
          {
            "_type": "template",
            "title": "Range of items from array",
            "markup": "{{range members start=1 end=3}}\n  ...\n{{else}}\n  ...\n{{/range}}"
          },
          {
            "_type": "template",
            "title": "Range of integers",
            "markup": "{{range start=10 end=40}}\n  ...\n{{else}}\n  ...\n{{/range}}"
          },
          {
            "_type": "code",
            "title": "Derive from <b>{{for}}</b> tag",
            "code": "$.views.tags({\n  range: {\n    // Inherit from {{for}} tag\n    baseTag: \"for\",\n\n    // Override the render method of {{for}}\n    render: function(val) {\n\n      ...\n\n      // Call the baseTag render method\n      return this.baseTag.render.apply(this, val ? [val] : arguments);\n    },\n\n    ...\n  }\n});\n"
          }
        ],
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/range/range.js",
            "label": "range.js"
          }
        ],
        "sampleName": "jsrender/tags/extend-for",
        "url": "samples/jsrender/tags/extend-for/sample",
        "height": "450",
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
            "text": "This is a fairly advanced sample: A multiselect control which supports both the inline data-binding syntax:\n\n```jsr\n{^{multisel items=items selected=selectedItems/}}\n```\n\nand the element-based data-link syntax, using a `<select>` tag:\n\n```jsr\n<select data-link=\"{multisel items=items selected=selectedItems}\"></select>\n```\n\nIt provides two array  properties, `items` and `selectedItems`. Both use observable arrayChange data-binding, so you can (as in the example) use two-way binding between the `selectedItems` property of one `multiselect` and the `items` of another, following a cascading pattern."
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
        "text": "This sample shows both <em>passing helpers to `template.render()`</em> and <em>rendering an array as a non-repeating layout</em>"
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
            "text": "For more information about helpers, see the <a href=\"#helpers\">`$.views.helpers()`</a> API topic.\n\nThis sample shows passing in helpers to the `render()` method:\n\n```js\nvar html = $(\"#movieTemplate\").render(\n  // Pass in data\n  [movies],\n  // Pass in helpers\n  {\n    reverseSort: reverse,\n    ...\n  }\n);\n```\n\nIn this case our template renders an array (with sort-order based on the `~reverseSort` boolean value we pass in as a helper).\n\nTo make our template render just once, rather than iterating over the `movies` array, we wrap the array - as `render([myArray])` - and then <em>within the template</em> we do the iteration, using `{{for #data}}`.\n\n```jsr\n{{for #data}}\n  <tr>\n    <td>{{>~format(title)}}</td>\n    <td>\n      {{sort languages reverse=~reverseSort}}\n        <div><b>{{>name}}</b></div>\n      {{/sort}}\n    </td>\n  </tr>\n{{/for}}\n```\n\n"
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
            "text": "The following example shows a data path, `address.street` for 'drilling down' into data from the current data item.\n\n```jsr\n{{>address.street}}\n```\n\nAnd here is an example of a slightly more complex expression, with a null check for `address`:\n\n```jsr\n{{if address && address.street}}\n```"
          },
          {
            "_type": "para",
            "title": "Helper paths",
            "text": "Helper paths start with `~`. Here is a helper path (in this case, to a helper method):\n\n```jsr\n{{for ~combine(phones, cells)}}\n```\n\nThe following shows helper paths referencing 'helper properties' (objects, or values):\n\n```jsr\n{{:~lateMessages.noAddress || ~messages.noAddress}}\n```\n\nAnd here is an example of a helper path, `~frstNm`, which is actually an 'alias' for the `firstName`, taken from an outer data-context, and is passed in through the nesting data contexts of the 'views':\n\n```jsr\n{{for ... ~frstNm=firstName}}\n  ... {{>~frstNm}} ...\n{{else}}\n  ... {{>~frstNm}} ...\n{{/for}}\n```"
          },
          {
            "_type": "para",
            "title": "View paths",
            "text": "View paths start with \"#\":\n\n```jsr\n{{>#data}}\n\n{{>#parent.parent.data.firstName}}\n```\n\nA view path is a way to access the current 'view' object (instance of a rendered template or of the block content of a tag), and drill into its properties. The examples above access `view.data` and `view.parent.parent.data.firstName`  "
          }
        ],
        "codetabs": [],
        "sampleName": "jsrender/paths",
        "height": "340",
        "onlyJsRender": true,
        "url": "samples/jsrender/paths/sample"
      }
    ]
  },
  "samples/jsv": {
    "title": "Samples: JsViews",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "<em>Note:</em> New content is being added regularly to this set of samples."
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/data-link",
            "label": "Data-linking tags and elements"
          },
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
        "text": "JsRender includes built-in converters, for HTML encoding, attribute encoding and URL encoding. A common use for these converters is to protect against injection attacks from untrusted data.\n\nIt is generally best to use <b>`{{> }}`</b> when rendering data within element content, if the data is not intended to provide markup for insertion in the DOM.\n\nIn the context of HTML attributes, use <b>`{{attr: }}`</b>, or it the case of attributes corresponding to URLs,  <b>`{{url: }}`</b>"
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
            "text": "<ul>\n<li><code>{{:value}}</code> &mdash; does not convert. Used to render values that include html markup.</li>\n<li><code>{{loc:value lang=\"...\"}}</code> &mdash; Uses custom converter, below.</li>\n<li><code>{{html:value}}</code> &mdash; Converts using built-in HTML encoder. (Better security within element content, but slight perf cost).</li>\n<li><code>{{>value}}</code> &mdash; Alternative syntax for built-in HTML encoder.</li>\n<li><code>{{attr:availability}}</code> &mdash; Converts using built-in attribute encoder. (Better security within attributes).</li>\n<li><code>{{url:value}}</code> &mdash; Converts using built-in URL encoder.</li>\n</ul>\n\n"
          },
          {
            "_type": "code",
            "title": "Declaring custom converters",
            "code": "$.views.converters({\n  loc: function(value) {\n    var language = this.tagCtx.props.lang;\n    ... (return localized value based on language)\n  }\n});\n"
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
          },
          {
            "hash": "samples/tag-controls/range",
            "label": "range control"
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
            "text": "The sample shows two instances of a custom `{{tabs}}` tag control - an outer one, and a second inner one in one of the tabs of the outer one..."
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
            "text": "This sample uses data-linked tags for `{^{for ...}}` (iteration over arrays) and for `{^{:...}}` and `{^{>...}}` (one-way data binding):\n\n```jsr\n{^{for movies}}\n  <tr class=\"hover\" data-link=\"css-background-color{:~bgColor()}\">\n      <td>\n      {^{:#index + 1}}: {^{>title}}\n      </td>\n      <td>\n      {^{for languages}}\n          <div>{^{>name}}</div>\n      {{/for}}\n    </td>\n    ...\n  </tr>\n{{/for}}\n```"
          },
          {
            "_type": "para",
            "title": "Data-linked elements: &lt;input data-link=\"...\"/&gt;",
            "text": "But for two-way data binding of the textboxes in the detail view it uses data-linked `<input/>` elements:\n\n```jsr\n{^{for movies[selectedIndex]}}\n  ...\n  <input data-link=\"title trigger=true\" />\n  ...\n  {^{for languages}}\n    ...\n    <input data-link=\"name\" />\n    ...\n  {{/for}}\n  ...\n{{/for}}\n```"
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
            "text": "This sample uses data-linked tags for `{^{for ...}}` (iteration over arrays) but it uses data-linked elements for one-way data binding:\n\n```jsr\n{^{for movies}}\n  <tr class=\"hover\" data-link=\"css-background-color{:~bgColor()}\">\n      <td>\n        <span data-link=\"#index + 1\"></span>:\n        <span data-link=\"title\"></span>\n      </td>\n      <td>\n      {^{for languages}}\n        <div data-link=\"name\"></div>\n      {{/for}}\n    </td>\n    ...\n  </tr>\n{{/for}}\n```\n\nas well as for the two-way data binding of the textboxes in the detail view:\n\n```jsr\n{^{for movies[selectedIndex]}}\n  ...\n  <input data-link=\"title trigger=true\" />\n  ...\n  {^{for languages}}\n    ...\n    <input data-link=\"name\" />\n    ...\n  {{/for}}\n  ...\n{{/for}}\n```"
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
        "text": "In the <a href=\"#samples/editable/toplevel-for\">next sample</a> we will replace some of the templated content by top-level data-linked elements, and we will show how to use `{for}` bindings with data-linked elements. "
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
        "text": "This sample modifies the <a href=\"#samples/editable/elems\">previous sample</a> by replacing some of the templated content by top-level data-linked elements. It also shows how to use `{for}` bindings with data-linked elements."
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
            "text": "This sample uses data-linking on top-level elements (i.e. elements that are not part of rendered templates): \n\n```js\n$.link(true, \"#linkedContent\", app)\n```\n\n```jsr\n<div id=\"linkedContent\">\n  <table>\n    ...\n    <tbody class=\"movies\" data-link=\"{for movies tmpl='movieTmpl'}\"></tbody>\n  </table>\n\n  <div class=\"detail\" data-link=\"{for movies[selectedIndex] tmpl='#detailTemplate'}\"></div>\n</div>\n```"
          },
          {
            "_type": "para",
            "title": "Data-linked {for} binding: data-link=\"{for ...}\"",
            "text": "The data-linked `<tbody>` element uses a `{for ...}` binding, referencing a template --\n\n```jsr\n<tbody class=\"movies\" data-link=\"{for movies tmpl='movieTmpl'}\"></tbody>\n```\n\n-- so it is the element-based data-linking equivalent of \n\n```jsr\n{^{for movies tmpl='movieTmpl'}}\n```\n\nand the content of the `<tbody>` is automatically incrementally updated when the `movies` array is modified.\n\nSimilarly the whole detail view, with its dynamic linking to the selected `movie` item, is achieved by a single data-linked top-level `<div ...>`, using `{for ...}` referencing a template:\n\n```jsr\n<div class=\"detail\" data-link=\"{for movies[selectedIndex] tmpl='#detailTemplate'}\"></div>\n```"
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
        "text": "In the <a href=\"#samples/editable/observe\">next sample</a> we will replace the declarative top-level binding for the detail view by a programmatic approach, using `$.observe()`. "
      }
    ]
  },
  "samples/editable/observe": {
    "title": "Editable data: Using $.observe()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample modifies the <a href=\"#samples/editable/toplevel-for\">previous sample</a> by replacing the declarative top-level binding for the detail view by a programmatic approach, using <em>$.observe()</em>."
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
            "text": "We will replace the top-level data-linked element for the detail view:\n\n```jsr\n<div class=\"detail\" data-link=\"{for movies[selectedIndex] tmpl='#detailTemplate'}\"></div>\n```\n\nby an unlinked element:\n\n```jsr\n<div id=\"movieDetail\" class=\"detail\"></div>\n```\n\nNow, we will set up a listener for observable changes in the `selectedIndex` property of our `app` object, and when it changes we will insert or remove data-linked templated content for the selected data item, within our <em>movieDetail</em> element. \n\n```js\n$.observe(app, \"selectedIndex\",  function(event, args) {\n  var selectedIndex = args.value;\n  if (selectedIndex > -1) {\n    $.link.detailTmpl(\"#movieDetail\", app.movies[selectedIndex]);\n  } else {\n    $(\"#movieDetail\").empty();\n  }\n});\n```"
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
        "text": "These four samples explore alternative patterns for creating two-way binding and providing UI for editing data.\n\nThe UI for all four is visually identical, but the approach to templated rendering and data-linking is different."
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
            "label": "Using $.observe() to bind to data changes"
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
        "text": "This set of samples shows three variants of a <em>tree</em> tag control:\n\n<ul><li>The first uses <code>visible{:...}</code> binding to show and hide tree nodes using <code>display:none</code>. It also allows the user to select/deselect nodes.</li> \n<li>The second uses <code>{^{if ...}}</code> binding to conditionally render tree nodes.</li>\n<li>The third adds editability, to allow the user to create or remove nodes, and to modify labels.</li></ul>"
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
    "title": "Samples: Two-way binding with custom tag controls",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "These samples show you how to create custom tag controls that provide for two-data binding - i.e. controls that which allow not only for viewing data, but for modifying (or editing) data.\n\nThe first, the <a href=\"#samples/tag-controls/edit/simple-textbox\">simple textbox control</a> is a very simple and minimalistic example, showing the basic concept of a <em>linkedElem</em> HTML element which the control uses for actual data entry.\n\nThe second and third, - the <a href=\"#samples/tag-controls/edit/generic\">generic edit control</a> and the <a href=\"#samples/tag-controls/edit/array-binding\">array binding</a> samples - both use the powerful `{{edit}}` tag which can be associated with different types of user entry control (from <em>textbox</em> to <em>radio button group</em>) and also provides the basis for other controls such as the <a href=\"#samples/tag-controls/datepicker\">`{{datepicker}}`</a> and <a href=\"#samples/tag-controls/validate\">`{{validate}}`</a> controls."
      },
      {
        "_type": "links",
        "title": "Samples:",
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
        "text": "These samples take the `{{edit}}` tag control above, and derive from it to provide a `{{validate}}` control.\n\nThis allows all the variants of the `{{edit}}` control (as <em>text box</em>, <em>dropdown</em>, <em>checkbox</em>, <em>radio button group</em>, or <em>textarea</em>) to support validation.\n\nIn addition, a `{{validation}}` control adds group validation. See the date-picker validation wizard sample, as an example of using the group validation features: In that sample, the <em>next</em> button is only enabled when all controls on the current pane validate successfully."
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
        "text": "The `{{datepicker}}` tag derives from the `{{edit}}` tag, and integrates the <em>jQueryUI datepicker widget</em>.\n\nThis allows data-linking directly to widget properties, as well as using the `{{edit}}` tag functionality such as <em>convert</em> and <em>convertBack</em>.\n\nIn addition, validation support is obtained, simply by wrapping a `{{datepicker}}` tag with a `{{validation}}`."
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
        "text": "The `{{slider}}` tag derives from the `{{edit}}` tag, and integrates the <em>jQueryUI slider widget</em>.\n\nThis allows data-linking directly to widget properties, as well as using the `{{edit}}` tag functionality such as <em>convert</em> and <em>convertBack</em>.\n\nIn addition, validation support is obtained, simply by wrapping a `{{slider}}` tag with a `{{validation}}`."
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
            "markup": "{^{datepicker startDate\n  _changeMonth=true\n  ^_maxDate=endDate\n/}}"
          },
          {
            "_type": "template",
            "title": "In-line datepicker with data-linked properties",
            "markup": "{^{datepicker middleDate\n  ^_minDate=startDate\n  ^_maxDate=endDate\n  ^_numberOfMonths=~page.monthsSpan\n}}\n  <div></div>\n{{/datepicker}}"
          }
        ],
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/jsviews-jqueryui-widgets.js",
            "label": "jsviews-jqueryui-widgets"
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
            "text": "Multiple examples of `{{datepicker}}` syntax..."
          }
        ],
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/jsviews-jqueryui-widgets.js",
            "label": "jsviews-jqueryui-widgets"
          }
        ],
        "sampleName": "tag-controls/datepicker/variants",
        "height": "1370",
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
            "text": "To add validation to a datepicker, simply wrap with a `{{validation}}` tag.\n\n```jsr\n{^{validate startDate\n  required=true\n  ^maxday=endDate\n}}\n  {^{datepicker _numberOfMonths=2 /}}\n{{/validate}}\n```"
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
            "url": "download/sample-tag-controls/jsviews-jqueryui-widgets.js",
            "label": "jsviews-jqueryui-widgets"
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
            "text": "The sample shows a wizard, using `{^{if ...}} ... {{else ...}} ... {{else ...}} ... {{else}} ... {{/if}}` to manage displaying the separate wizard steps, one after the other...\n\nMoving to the next step is not possible until the <em>validate</em> controls on the current step are all valid. \n\nThis is achieved by wrapping in a validation group `{{validation}}`.\n\nThe enabled/disabled state of the <em>Next</em> button is data-linked to the `validation.isValid` property:\n\n```jsr\n{^{validation}}\n  ...\n  <button id=\"next\" data-link=\"... disabled{:!~tag.isValid}\">Next</button>\n  ...\n  <h4>Choose a start date:</h4> \n  {^{validate startDate\n    required=true\n    ^maxday=endDate\n  }}\n    {^{datepicker _numberOfMonths=1 /}}\n  {{/validate}}\n  ...\n{{/validation}}\n```"
          }
        ],
        "title": "",
        "height": "465",
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
            "url": "download/sample-tag-controls/jsviews-jqueryui-widgets.js",
            "label": "jsviews-jqueryui-widgets"
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
        "text": "This is the first of <a href=\"#samples/tag-controls/tree\">three variants</a> of a <em>tree</em> tag control. This version uses `visible{:...}` binding to show and hide tree nodes using `display:none`."
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
            "text": "The data is a hierarchy of <em>node objects</em> each of which has a `name` property and an optional `folder` property containing child data nodes:\n\n```js\nvar rootFolder = {\n  name: \"Categories\", folders: [\n    {name: \"Drama\", folders: [\n      {name: \"Courtroom\"},\n      {name: \"Political\"}\n    ]},\n    {name: \"Classic\", folders: [\n      ...\n    ]}\n  ]};\n```\n\nThe `{{tree}}` tag is a tag control for a node in the tree. It renders a node in the data hierarchy, and has a boolean `expanded` property.\n\n```js\n$.views.tags({\n  tree: {\n    onAfterLink: function() {\n      var self = this;\n      self.contents(\"li\").first()\n        .on(\"click\", \".toggle\", function() {\n          self.toggle();\n        })\n        .on(\"click\", \".selectable\", function() {\n          self.select();\n        });\n    },\n    template: \"#treeTemplate\",\n\n    //PROPERTIES\n    expanded: false, // default to unexpanded\n\n    //METHODS\n    toggle: function() {\n      $.observable(this).setProperty(\"expanded\", !this.expanded);\n    },\n    ...\n  }\n});\n```\n\nIt uses a template which recursively renders the child data nodes using the same data-linked tag: `{^{tree}}`, and data-links to the `expanded` property of the control (<em>tag</em> instance).\n\n```jsr\n<li>\n  ...\n  <span>{{>name}}</span>\n</li>\n{{if folders}}\n  <li data-link=\"visible{:~tag.expanded}\">\n    <ul>\n      {{for folders}}\n        {^{tree/}}\n      {{/for}}\n    </ul>\n  </li>\n{{/if}}\n```\n\nThis version of the `{{tree}}` binds using the data-link `visible` target  to show or hide the child nodes. \n\n```jsr\n<li data-link=\"visible{:~tag.expanded}\">\n```"
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
        "text": "This is the second of <a href=\"#samples/tag-controls/tree\">three variants</a> of a <em>tree</em> tag control. This version uses `{^{if ...}}` binding to conditionally render tree nodes."
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
            "text": "The data is a the same hierarchy of <em>node objects</em> used in the <a href=\"#samples/tag-controls/tree/visible-binding\">previous sample</a>:\n\n```js\nvar rootFolder = {\n  name: \"Categories\", folders: [\n    {name: \"Drama\", folders: [\n      {name: \"Courtroom\"},\n      {name: \"Political\"}\n    ]},\n    {name: \"Classic\", folders: [\n      ...\n    ]}\n  ]};\n```\n\nThe `{{tree}}` tag is a tag control for a node in the tree. It renders a node in the data hierarchy, and sets a boolean `expanded` property on the data node.\n\n```js\n$.views.tags({\n  tree: {\n    init: function(tagCtx, linkCtx, ctx) {\n      ...\n    },\n    onAfterLink: function() {\n      ... \n    },\n    template: \"#treeTemplate\",\n\n    //METHODS\n    toggle: function() {\n      $.observable(this.data).setProperty(\"expanded\", !this.data.expanded);\n    },\n    ...\n  }\n});\n```\n\nIt has a template which with a `{^{if expanded }}` section which renders the child data nodes only if `expanded === true`, using the same data-linked tag: `{^{tree}}`.\n\n```jsr\n<li>\n  ...\n  {{>name}}\n</li>\n{^{if expanded}}\n  <li>\n    <ul>\n      {{for folders}}\n        {^{tree/}}\n      {{/for}}\n    </ul>\n  </li>\n{{/if}}\n```"
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
            "text": "This version builds on the <a href=\"#samples/tag-controls/tree/if-binding\">previous sample</a>, and adds editability:\n\n```js\n$.views.tags({\n  tree: {\n    ...\n    template: \"#treeTemplate\",\n\n    //METHODS\n    toggle: function() {\n      $.observable(this.data).setProperty(\"expanded\", !this.data.expanded);\n    },\n    remove: function() {\n      var parentFolders = this.parent.data.folders,\n        index = this.tagCtx.view.index;\n      $.observable(parentFolders).remove(index);\n    },\n    addFolder: function() {\n      $.observable(this.data.folders).insert({\n        name: \"new folder\",\n        folders: []\n      });\n      $.observable(this.data).setProperty(\"expanded\", true);\n    }\n    ...\n  }\n});\n```\n\n```jsr\n<li>\n  ...\n  <input data-link=\"name\" />\n  <span class=\"add\">add</span>\n  {^{if ~parentTags.tree}}\n    {{!-- Don't allow removing the top-level tree control --}}\n    <span class=\"remove\"><span>\n  {{/if}}\n</li>\n{^{if expanded}}\n  ...\n{{/if}}\n```"
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
            "_type": "template",
            "title": "Simple slider",
            "markup": "{^{slider size /}}"
          },
          {
            "_type": "para",
            "title": "Slider with initialized properties",
            "text": "```jsr\n{^{slider size _range='min' _min=1 _max=200 width=400 _orientation='vertical' /}}\n```\n\nor\n\n```jsr\n<div data-link=\"{slider size _range='min' _min=1 max=200 _orientation='vertical' width=400}\"></div>\n```"
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
            "title": "",
            "text": "Multiple examples of `{{slider}}` syntax..."
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
            "title": "",
            "text": "To add validation to a slider, simply wrap with a `{{validation}}` tag.\n\n```jsr\n{^{validate size\n  min=20\n  max=150\n  msg_min=\"Min size: %cond%\"\n  msg_max=\"Max size: %cond%\"\n  preventInvalidData=~page.noInvalidData\n}}\n  {^{slider _orientation='vertical' ... /}}\n{{/validate}}\n```\n\nor\n\n```jsr\n{^{validate size\n  min=50 max=100\n  msg_min=\"Min size: %cond%\"\n  msg_max=\"Max size: %cond%\"\n  preventInvalidData=~page.noInvalidData\n}}\n  <div data-link=\"{slider _orientation='vertical' ...}\"></div>\n{{/validate}}\n```"
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
            "text": "The `{{validate}}` tag derives from the `{{edit}}` tag, and can similarly be used as <em>textbox</em>, <em>checkbox</em>, <em>dropdown</em>, <em>radio buttons</em>, <em>textarea</em>.\n\nIn each case optional properties can be specified on the edit tag, not only for <em>convert</em>, <em>convertBack</em>, <em>linkTo</em> etc., but also properties specifying validation tests to be applied."
          },
          {
            "_type": "para",
            "title": "Data-linked textbox",
            "text": "```jsr\n{^{validate name\n  convert=\"upper\"\n  convertBack=~lower\n  linkTo=name2\n}}\n```\n\nor\n\n```jsr\n<input data-link=\"{validate name trigger=true\n  convert='upper'\n  convertBack=~lower\n  linkTo=name2\n}\"/>\n```"
          },
          {
            "_type": "para",
            "title": "Data-linked checkbox",
            "text": "```jsr\n<!-- optionally include properties on {{validate ...}} tag, such as convert, convertBack, linkTo, ... -->\n{^{validate agree ...}}\n  <input type=\"checkbox\"/>\n{{/validate}}\n```\n\nor\n\n```jsr\n<!-- optionally include properties on {validate ...} tag, such as convert etc. -->\n<input type=\"checkbox\" data-link=\"{validate agree ...}\"/>\n```"
          },
          {
            "_type": "para",
            "title": "Data-linked drop down",
            "text": "```jsr\n{^{validate name ...}}\n  <select size=\"3\">\n    <option value=\"JO\">Jo</option>\n    <option value=\"MARY\">Mary</option>\n  </select>\n{{/validate}}\n```\n\nor\n\n```jsr\n<select size=\"3\" data-link=\"{validate name ...'}\">\n  <option value=\"JO\">Jo</option>\n  <option value=\"MARY\">Mary</option>\n</select>\n```"
          },
          {
            "_type": "para",
            "title": "Data-linked radio buttons",
            "text": "```jsr\n{^{validate person ...}}\n  <div class=\"radiogroup\">\n    <input type=\"radio\" person=\"gp2\" value=\"JO\"/>\n    ...\n  </div>\n{{/validate}}\n```\n\nor\n\n```jsr\n<div data-link=\"{validate person ...}\" class=\"radiogroup\">\n  <input type=\"radio\" name=\"gp1\" value=\"JO\"/>\n  ...\n</div>\n```"
          },
          {
            "_type": "para",
            "title": "Data-linked textarea",
            "text": "```jsr\n{^{validate person ...}}\n  <textarea></textarea>\n{{/validate}}\n```\n\nor\n\n```jsr\n<textarea data-link=\"{validate person ...}\"></textarea>\n```"
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
            "text": "The `{{validation}}` validation group control is a validation container, which manages all the `{{validate}}` tags within the container. \n\nIt provides useful functionality, such as a `validate()` method which validates the child tags, and triggers display of the validation message on the first invalid control encountered. \n\nIt is even possible to data-link directly to the `isValid` property of the `{{validation}}` tag, to determine whether the whole form (or container) is valid:\n\n```jsr\n{^{if ~tag.isValid}}\n  <span class=\"val-title\">no errors</span>\n{{else}}\n  <span class=\"val-title-error\">VALIDATION ERRORS</span>\n{{/if}}\n```"
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
            "text": "This version of the sample uses <em>top-level data-linking</em>. An HTML container element in the page is data-linked as follows: \n\n```js\n$(\"#amountPickers\").link(true, data);\n```\n\nand elements within the data-linked container are linked to the data using <em>element-based data-linking syntax</em>:\n\n```jsr\n<div id=\"amountPickers\">\n  ...\n  <span data-link=\"amount\"></span>\n  ...\n  <input type=\"checkbox\" data-link=\"listbox\" />\n  ...\n  <input data-link=\"amount trigger=true\" />\n  ...\n  <select data-link=\"amount\">\n    <option>0</option>\n    ...  \n  </select>\n  ...\n  <input type=\"radio\" name=\"amt\" value=\"0\" data-link=\"amount\" />\n  ...\n  <textarea data-link=\"amount\"></textarea>\n  ...\n</div>\n```\n\nNote the above examples use compact data-linking syntax:\n\n```jsr\ndata-link=\"amount\"\n```\n\nwhich is equivalent to the following full syntax:\n\n```jsr\ndata-link=\"{:amount:}\".\n```\n\nUse the full syntax if you need to specify converters, data-linking targets other than the default, or if you need to data-link to more than one target on the same element. For example the following targets both the default binding for `<select>` and also the `size` attribute:\n\n```jsr\n<select data-link=\"{:amount:} size{:listbox ? 4 : null}\">\n```"
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
            "text": "This version of the sample uses <em>data-linking within a template</em>. The template is rendered and data-linked within an HTML container element as follows: \n\n```js\n$.templates(\"#tmpl\").link(\"#amountPickers\", data);\n```\n\nand elements within the template are linked to the data using either <em>element-based data-linking syntax</em> or <em>JsViews tag-based data-linking syntax</em>:\n\n```jsr\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  ...\n  <b data-link=\"amount+1\"></b>\n  ...\n  {^{:amount}}\n  ...\n  <input type=\"checkbox\" data-link=\"listbox\" />\n  ...\n  <input data-link=\"amount trigger=true\" />\n  ...\n  <select data-link=\"{:amount:} size{:listbox ? 4 : null}\">\n    <option>0</option>\n    ...  \n  </select>\n  ...\n  <input type=\"radio\" name=\"amt\" value=\"0\" data-link=\"amount\" />\n  ...\n  <textarea data-link=\"amount\"></textarea>\n  ...\n</script>\n\n<div id=\"amountPickers\"></div>\n```"
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
            "_type": "para",
            "title": "<span class=\"nonitalic\">Binding  <em>\"base 0\"</em> data values to <em>\"base 1\"</em> values in UI:</span>",
            "text": "```js\n$.views.converters({\n  minus1: function(val) { return val-1; },\n  plus1: function(val) { return 1+val; },\n  ...\n});\n```\n\n```jsr\n<input data-link=\"{plus1:amount trigger=true:minus1}\" />\n<span data-link=\"{plus1:amount}\"></span>\n```"
          },
          {
            "_type": "para",
            "title": "<span class=\"nonitalic\">Binding inverted <em>boolean</em> data values to UI:</span>",
            "text": "```js\nnot: function(val) { return !val; }\n```\n\n```jsr\n<input type=\"checkbox\" data-link=\"{not:listbox:not}\" />\n```"
          },
          {
            "_type": "para",
            "title": "<span class=\"nonitalic\">Binding <em>number</em> data values to <em>string</em> values in UI:</span>",
            "text": "```js\nintToStr: function(value) { return \"\" + value; },\nstrToInt: function (value) { return parseInt(value); }\n```\n\n```jsr\n<input data-link=\"{intToStr:amount trigger=true:strToInt}\"/>...\n<select data-link=\"{intToStr:amount:strToInt} ...\">...\n<input type=\"radio\" name=\"amt\" value=\"0\" data-link=\"{intToStr:amount:strToInt}\" />...\n<textarea data-link=\"{intToStr:amount:strToInt}\" ...></textarea>...\n```"
          },
          {
            "_type": "para",
            "title": "<span class=\"nonitalic\">Binding <em>number</em> data values to UI elements using <em>bit-masks</em>:</span>",
            "text": "```js\nsetBit: function(value) {\n  ...\n  // Use the mask to set or unset that bit on the data, and return the modified value\n  return value ? (dataValue | mask) : (dataValue & ~mask);\n},\ngetBit: function (value) {\n  // \"Convert\": Get the bit from the data, and check or uncheck the checkbox\n  return (value >> this.linkCtx.elem.getAttribute(\"data-bit\") & 1) === 1;\n}\n```\n\n```jsr\n<input type=\"checkbox\" data-bit=\"0\" data-link=\"{getBit:amount:setBit}\" />\n```"
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
            "text": "HTML encoding, no custom converter:\n\n```jsr\n<td>{{>dayOff}}</td>\n```\n\nRender from data, convert to display name:\n\n```jsr\n<td>{{intToDay:dayOff}}</td>\n```"
          },
          {
            "_type": "para",
            "title": "Using convert and convertBack with data-linking",
            "text": "Link from data value, no converter:\n\n```jsr\n<td data-link=\"dayOff\"></td>\n```\n\nLink from data, converted to display name:\n\n```jsr\n<td data-link=\"{intToDay:dayOff}\"></td>\n```\n\nTwo-way data linking with *convert* and *convertBack* between data format (integer) and display name (text).<br/>Also show data value as tooltip:\n\n```jsr\n<td><input data-link=\"{intToDay:dayOff trigger=true:dayToInt} title{:dayOff}\" /></td>\n```"
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
            "text": "This sample is similar to the previous <a href=\"#samples/form-els/converters\">converters</a> sample - but here the `amount` can be selected from a range of integers that is chosen by the user (by choosing the number of bits!).\n\nThe array of possible integers is then generated from code:\n\n```js\nfunction setData() {\n  ...\n  newAmounts = [];\n  ...\n  var maxAmount = Math.pow(2, bitCount);\n  for(var i = 0; i < maxAmount ; i++) {\n    newAmounts.push(i);\n  }\n  ...\n  $.observable(amounts).refresh(newAmounts);\n}\n```\n\nThe collection of `<input type=\"radio\">` elements, and the collection of `<option>` elements under the `<select>` are dynamically driven by data-linking to the `amounts` array:\n\n```jsr\n{^{for amounts}}\n  <input type=\"radio\" name=\"amt\" value=\"{{:#data}}\" data-link=\"{intToStr:~root.amount:strToInt}\" />\n  {{:#data}}...\n{{/for}}\n```\n\n```jsr\n<select data-link=\"{intToStr:amount:strToInt} size{:listbox ? amounts.length : null}\">\n  {^{for amounts}}\n    <option data-link=\"selected{:~root.amount===#data}\">{{:#data}}</option>\n  {{/for}}\n</select>\n```"
          }
        ],
        "url": "samples/form-els/array-binding/sample",
        "height": "800",
        "title": "Data-linking &lt;option> collections and &ltinput type=\"radio\"> collections to arrays"
      }
    ]
  },
  "samples/form-els/visible-binding": {
    "title": "Form elements and data-linked visibility",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample shows data-linked visibility, and also shows data-linked <em>textbox</em>, <em>checkbox</em>, <em>textarea</em>, <em>radio button</em> and <em>select</em> elements.\n\nEnter values in text boxes etc. and gradually the successive steps will be made visible through data-binding:"
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
            "text": "```jsr\n<div data-link=\"visible{:name}\">\n...\n<div data-link=\"visible{:name && selectedMovie!=='none'}\">\n...\n<div data-link=\"visible{:request}\">\n```\n\n```jsr\n<select data-link=\"selectedMovie\">\n  <option value=\"none\">Choose...</option>\n  {{for ~movies}}\n    <option value=\"{{:#index}}\">{{>title}}</option>\n  {{/for}}\n</select>\n```\n\n```jsr\n<textarea data-link=\"request\" ...></textarea>\n```\n\n```jsr\n<input type=\"checkbox\" data-link=\"~app.chooseCurrency\" />\n```\n\n```jsr\n{{for ~currencies ~details=#data}}\n  <input \n    type=\"radio\"\n    name=\"currencyPicker\"\n    value=\"{{:#index}}\"\n    data-link=\"~details.selectedCurrency\"\n  />{{:label}}<br/>\n{{/for}}\n```"
          }
        ],
        "sampleName": "form-els/visible-binding",
        "url": "samples/form-els/visible-binding/sample",
        "height": "450"
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
          },
          {
            "hash": "samples/form-els/visible-binding",
            "label": "Form elements and visibility"
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
            "text": "This sample is similar to the previous <a href=\"#samples/tag-controls/edit/generic\">edit control</a> sample - but here the `people` array can be modified - by adding or removing people, or changing their `name` property.\n\n```js\n.on(\"click\", \"#add\", function() {\n  $.observable(model.people).insert({name: \"new\"...});\n})\n.on(\"click\", \".remove\", function() {\n  var view = $.view(this);\n  $.observable(model.people).remove(view.index);\n});\n```\n\nThe collection of `<option>` elements or `<input type=\"radio\">` elements is dynamically driven by data-linking to the `people` array:\n\n```jsr\n{^{edit person ...}}\n  <select>\n    {^{for ~people}}\n      <option data-link=\"value{upper:name} {:name}\"></option>\n    {{/for}}\n  </select>\n{{/edit}}\n```\n\n```jsr\n{^{edit person ...}}\n  <div class=\"radiogroup\">\n    {^{for ~people}}\n      <input type=\"radio\" name=\"gp1\" data-link=\"value{upper:name}\"/>...\n    {{/for}}\n  </div>\n{{/edit}}\n```"
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
        "text": "This sample takes the previous <a href=\"#samples/tag-controls/edit/simple-textbox\">simple textbox</a> sample a lot further, and shows a powerful generic custom `{{edit}}` tag control which allows you to provide <em>editable data</em> support through two-way data-binding associated with any of the standard <em>HTML Form</em> controls.\n\nIt can be associated with a <em>text box</em>, a <em>dropdown</em>, a <em>checkbox</em>, a <em>radio button group</em>, or a <em>textarea</em>.\n\nNote that you can also data-link directly to <em>HTML Form elements</em>, as shown in the <a href=\"#samples/form-elems\">Form elements</a> samples. \n\nHowever, the `{{edit}}` custom tag allows you to provide additional functionality, along with the syntactic advantages and power of custom tags: `{{mytag mydata myproperty=xxx...}}`:\n<ul class=\"textbefore\"><li>You can use it as the starting point for your own tags, (and if you wish you can remove functionality, to create something simpler, as was done in the <a href=\"#samples/tag-controls/simple-textbox\">simple text box</a> example).</li>\n<li>Alternatively you can use it as the <em>base class</em> for your own custom tag.</li>\n<li>See the later <a href=\"#samples/tag-controls/datepicker\">datepicker</a> and <a href=\"#samples/tag-controls/slider\">slider</a> samples for examples of using the <code>{{edit}}</code> as base class for your own control. You could use the same approach to create a tag that encapsulates other <em>jQuery UI</em> widgets, or that wraps controls from other client-side UI libraries.</li></ul>\n\nOut of the box, `{{edit}}` already provides some useful functionality beyond the simple data-linked <a href=\"#samples/form-elems\">form elements</a>:\n<ul class=\"textbefore\"><li>It allows optional <em>convert</em> and <em>convertBack</em> converters to be associated with the control - no matter what type of control it is (<em>radio buttons</em>, <em>select</em>, <em>textarea</em>...).</li>\n<li>It also provides <em>linkTo</em> support to allow two-way binding where the <em>'bind from'</em> source data node and the <em>'bind to'</em> target data node are different nodes (as distinct from normal two-way binding on a single data node).</li>\n<li>The <code>{{edit}}</code> control can be used with either data-linked tag syntax (<code>{^{edit ...}}</code>) or element-based data-linking syntax (<code>data-link=\"{edit ...}\"</code>).\n</li></ul>\n\nIt will be used as a <em>base control</em> for the <a href=\"#samples/tag-controls/validate\">`{{validate}}`</a>, <a href=\"#samples/tag-controls/datepicker\">`{{datepicker}}`</a> and <a href=\"#samples/tag-controls/slider\">`{{slider}}`</a> controls that are shown in later samples, below. "
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
            "text": "The `{{edit}}` tag can be used as <em>textbox</em>, <em>checkbox</em>, <em>dropdown</em>, <em>radio buttons</em>, <em>textarea</em>.\n\nIn each case optional properties can be specified on the edit tag for <em>convert</em>, <em>convertBack</em>, <em>linkTo</em> etc."
          },
          {
            "_type": "para",
            "title": "Data-linked textbox",
            "text": "```jsr\n{^{edit name\n  convert=\"upper\"\n  convertBack=~lower\n  linkTo=name2\n}}\n```\n\nor\n\n```jsr\n<input data-link=\"{edit name trigger=true\n  convert='upper'\n  convertBack=~lower\n  linkTo=name2\n}\"/>\n```"
          },
          {
            "_type": "para",
            "title": "Data-linked checkbox",
            "text": "```jsr\n<!-- optionally include properties on {{edit ...}} tag, such as convert, convertBack, linkTo, ... -->\n{^{edit agree ...}}\n  <input type=\"checkbox\"/>\n{{/edit}}\n```\n\nor\n\n```jsr\n<!-- optionally include properties on {edit ...} tag, such as convert etc. -->\n<input type=\"checkbox\" data-link=\"{edit agree ...}\"/>\n```"
          },
          {
            "_type": "para",
            "title": "Data-linked drop down",
            "text": "```jsr\n{^{edit name ...}}\n  <select size=\"3\">\n    <option value=\"JO\">Jo</option>\n    <option value=\"MARY\">Mary</option>\n  </select>\n{{/edit}}\n```\n\nor\n\n```jsr\n<select size=\"3\" data-link=\"{edit name ...'}\">\n  <option value=\"JO\">Jo</option>\n  <option value=\"MARY\">Mary</option>\n</select>\n```"
          },
          {
            "_type": "para",
            "title": "Data-linked radio buttons",
            "text": "```jsr\n{^{edit person ...}}\n  <div class=\"radiogroup\">\n    <input type=\"radio\" person=\"gp2\" value=\"JO\"/>\n    ...\n  </div>\n{{/edit}}\n```\n\nor\n\n```jsr\n<div data-link=\"{edit person ...}\" class=\"radiogroup\">\n  <input type=\"radio\" name=\"gp1\" value=\"JO\"/>\n  ...\n</div>\n```"
          },
          {
            "_type": "para",
            "title": "Data-linked textarea",
            "text": "```jsr\n{^{edit person ...}}\n  <textarea></textarea>\n{{/edit}}\n```\n\nor\n\n```jsr\n<textarea data-link=\"{edit person ...}\"></textarea>\n```"
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
            "text": "This sample is similar to the previous <a href=\"#samples/tag-controls/validate/group\">validation group</a> sample - but here the `people` array can be modified - by adding or removing people, or changing their `name` property.\n\n```js\n.on(\"click\", \"#add\", function() {\n  $.observable(model.people).insert({name: \"new\"...});\n})\n.on(\"click\", \".remove\", function() {\n  var view = $.view(this);\n  $.observable(model.people).remove(view.index);\n  validation.validate();\n});\n```\n\nThe collection of `<option>` elements or `<input type=\"radio\">` elements is dynamically driven by data-linking to the `people` array:\n\n```jsr\n{^{validate person ...}}\n  <select>\n    {^{for people}}\n      <option data-link=\"value{upper:name} {:name:}\"></option>\n    {{/for}}\n  </select>\n{{/validate}}\n```\n\n```jsr\n{^{validate person ...}}\n  <div class=\"radiogroup\">\n    {^{for people}}\n      <input type=\"radio\" name=\"gp1\" data-link=\"value{upper:name}\"/>...\n    {{/for}}\n  </div>\n{{/validate}}\n```"
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
        "text": "This sample show a simple custom `{{textbox}}` tag control.\n\nIt can be considered as a first step towards a more advanced control, such as the generic `{{edit}}` control shown in the <a href=\"#samples/tag-controls/edit/generic\">next sample</a>."
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
            "text": "This sample illustrates the simplest possible custom tag control supporting <em>two-way data-binding</em>.\n\nBy using a template which includes an <em>input</em> element:\n\n```jsr\n<input/>\n```\n\nand then, in the `onAfterLink` handler, setting the `linkedElem` property to be a jQuery object containing that <em>input</em> element:\n\n```js\n$.views.tags({\n  textbox: {\n    onAfterLink: function() {\n      this.linkedElem = this.contents(\"input\");\n    },\n    template: \"<input/>\"\n  }\n});\n```\n\nJsViews automatically sets up two-way data-linking on the <em>input</em> element.\n\nNow you can get two-binding to your data, simply by setting the path to the data as parameter on your `{{textbox}}` tag:\n\n```jsr\n{{textbox my.data.path /}}\n```\n\nAs an optional optimization, we can set the `onUpdate` handler of our tag control to return `false`. This has the effect that when the data changes, the control will not re-render itself completely. (The updating of the textbox content is already assured by the data-linked <em>input</em>, so re-rendering is unnecessary.)  \n\n```js\n$.views.tags({\n  textbox: {\n    onAfterLink: function() {\n      this.linkedElem = this.contents(\"input\");\n    },\n    onUpdate: function() {\n      return false;\n    },\n    template: \"<input/>\"\n  }\n});\n```"
          }
        ],
        "sampleName": "tag-controls/edit/simple-textbox",
        "url": "samples/tag-controls/edit/simple-textbox/sample",
        "height": "340"
      }
    ]
  },
  "samples/data-link/from-render-to-link": {
    "title": "From rendering to linking",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the first page of a <a href=\"#samples/data-link\">tutorial sequence</a> on data-linking. We start by showing how to convert a complex JsRender template to work in JsViews, using data-linking throughout."
      },
      {
        "_type": "para",
        "title": "The power of JsRender",
        "text": "JsRender tags are powerful. JsRender does pure string-based rendering. It does not use the DOM to render a template against data, and, as a pure string-based rendering engine it doesn't even 'have any awareness' of the HTML markup in the template. So this means that as long as you are just using JsRender to render (and not doing data-linking, with JsViews), you can put the JsRender tags anywhere you want in relation to the HTML tags, including within the attribute content of an HTML tag, as in the following examples."
      },
      {
        "_type": "para",
        "title": "{{if}} tags within attribute markup",
        "text": "The first example applies a CSS class for people who play the role of \"Lead\". If their 'Role description' includes the word \"Lead\", then the 'special' CSS class is applied.\n\n (Click on <em>Try it</em>, change the <em>role</em> text, and hit <em>Run code</em>, and you will see...):"
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
            "text": "```jsr\n<style>\n  ...\n  .special { color: blue; font-style: italic; }\n  ...\n</style>\n```\n\n```jsr\n{{for people}}\n  <div class=\"person\">\n    <span class=\"{{if role.indexOf('Lead')>=0}}special{{/if}}\">\n      {{:first}} ...\n```"
          }
        ],
        "url": "samples/data-link/1_if-tag-in-attribute",
        "height": "100",
        "onlyJsRender": true,
        "title": "{{if}} tag in attribute markup"
      },
      {
        "_type": "para",
        "title": "",
        "text": "But what if we want to use data-binding to add or remove people from the collection of people. And what if we plan to allow the user to change the 'Role description'. In that case we would like to use data-binding to dynamically toggle the class 'special' whenever the data changes, based on whether or not it includes the term \"Lead\"."
      },
      {
        "_type": "para",
        "title": "The plan: add data-linking. But how?",
        "text": "How can we convert the above sample to dynamically bind to data. Of course we will do that using JsViews data-linking, but how do we convert the JsRender template (which does not 'have any knowledge of HTML elements') so that elements are inserted and removed when the people collection changes, and the span element's 'special' class is actually toggled when the <em>role</em> changes? Clearly JsViews has to have DOM awareness, even if JsRender does not."
      },
      {
        "_type": "para",
        "title": "First let's go further with JsRender",
        "text": "Well before we get to that, let's first make the problem even harder, by pushing our JsRender template's HTML ignorance to a blissful extreme. Let's use a completely non-data-bound approach to user interactivity, by adding mouse events to hide and show the <em>role details</em> information when the user hovers over the person's name. And let's use DOM level 0 inline event code, so we are mixing code and markup! \n\nThen - from there - we'll show how to move to a data-driven model, with good separation of code and markup, and well-formed templates that allow the full power of JsViews to be leveraged.\n\nHere is the sample with the added <em>hover</em> behavior:"
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
            "markup": "{{for people}}\n  <div ...\n    onmouseover=\"$('#role_{{:#index}}').show();\"\n    onmouseout=\"$('#role_{{:#index}}').hide();\"\n  >\n    <span class=\"{{if role.indexOf('Lead')>=0}}special{{/if}}\">\n      {{:first}} <b>{{:last}}</b>\n    </span>\n    <img src=\".../question.jpg\"/>\n\n    <span ... id=\"role_{{:#index}}\">\n      {{:role}}\n    </span>"
          }
        ],
        "title": "Template-rendered mouse events",
        "sampleName": "",
        "url": "samples/data-link/2_mouse-events-in-template",
        "height": "100"
      },
      {
        "_type": "para",
        "title": "So how did that work? ",
        "text": "Well first we used the JsRender `#index` to insert unique IDs on the <em>role details</em> span.\n\nThat may seem surprising, given that JsRender does not 'track' HTML entities. So it does not have an `index` corresponding to counting HTML elements. But it <em>does</em> track instances of rendered templates, or tag blocks. (They are the <em>'views'</em> of JsViews.) - Within a `{{for}}...{{/for}}` section, or block, JsRender counts the 'views' corresponding to the rendered instances of that block. (One for each data item in the `people` array).\n\nSo here we use that `#index` variable to add unique IDs to HTML element markup.\n\n```jsr\n<span class=\"details\" id=\"role_{{:#index}}\">\n```\n\nAnd of course we use the same IDs in our <em>mouseover</em> code to hide and show the <em>role details</em> span element.\n\n```jsr\nonmouseover=\"$('#role_{{:#index}}').show();\"\nonmouseout=\"$('#role_{{:#index}}').hide();\">\n```"
      },
      {
        "_type": "para",
        "title": "Putting all the templated attribute content in an {{include}}",
        "text": "Suppose we want to be able to reuse our <em>mouseover</em> behavior and conditional class rendering, as an encapsulated re-usable 'component'. Let's use template composition to do that. We will put all of the special attribute markup into a separate template, and insert it using:\n\n```jsr\n<span {{include tmpl=\"#attributesTmpl\" ~id='role_'+#index /}} >\n```\n\nwithin the HTML element markup for the `<span>`"
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
            "text": "```jsr\n...\n<div class=\"person\" {{include tmpl=\"#attributesTmpl\" ~id='role_'+#index /}} >\n...\n```\n\n```jsr\n<script type=\"text/x-jsrender\" id=\"attributesTmpl\">\n  onmouseover=\"$('#{{:~id}}').show();\"\n  onmouseout=\"$('#{{:~id}}').hide();\"\n</script>\n```"
          }
        ],
        "url": "samples/data-link/3_include-tag-in-attribute",
        "height": "100",
        "title": "{{include}} within HTML attribute content"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice how we made the computed index, `#role_{{:#index}}` from the previous sample into a computed variable which we pass in to our 'included' template.\n\n```jsr\n~id='role_'+#index\n```\n\n```jsr\nonmouseover=\"$('#{{:~id}}').show();\"\n```"
      },
      {
        "_type": "para",
        "title": "Next step - convert to JsViews data-linking",
        "text": "So we have reached a relatively complex JsRender template, and we are ready to convert it to use data-linking - (move 'from render to link')...  \n\nThe details of adding data-linking to the above sample - and taking it forward to additional functionality - will be shown in the rest of this <a href=\"#samples/data-link\">tutorial sequence</a>. "
      },
      {
        "_type": "para",
        "title": "As a teaser, here is a first step:",
        "text": "Let's add support for inserting new 'people' in the `people` array. The basic idea is simply to change the syntax on the `{{for ...}}` to make it into a data-linked tag: `{^{for ...}}`. We change:\n\n```jsr\n{{for people}}\n```\n\nto\n\n```jsr\n{^{for people}}\n```\n\nNext, we need to replace our `render()` method by the corresponding `link()` call. Let's change the script call from: \n\n```js\nvar html = $.templates.peopleTmpl.render(data);\n$(\"#people\").html(html);\n```\n\nto\n\n```js\n$.templates.peopleTmpl.link(\"#people\", data);\n```\n\nThen we'll use JsObservable to allow you to add new people to the `people` array. Here is the updated sample:"
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
            "text": "```js\n$(\"#add\").on(\"click\", function() {\n  $.observable(data.people).insert({\n    first:\"Amos\",\n    ...\n  });\n})\n```\n\n```jsr\n{^{for people}}\n  <div \n    class=\"person\"\n    {{include tmpl=\"#attributesTmpl\" ~id='role_'+#index link=false /}}\n  >\n    <span class=\"{{if role.indexOf('Lead')>=0 link=false}}special{{/if}}\" >\n      {{:first}} <b>{{:last}}</b>\n    </span>\n    <img src=\".../question.jpg\"/>\n\n    <span class=\"details\" id=\"role_{{:#index}}\">\n      {{:role}}\n    </span>\n  </div>\n{{/for}}\n```"
          }
        ],
        "html": "",
        "code": "",
        "url": "samples/data-link/4_linked-for-tag",
        "height": "170",
        "title": "Data-linked {^{for}} tag"
      },
      {
        "_type": "para",
        "title": "But there was a catch:",
        "text": "Look closely and you will see we added `link=false` here:\n\n```jsr\n<div\n  class=\"person\"\n  {{include ... link=false /}}\n>\n  <span class=\"{{if ... link=false}}special{{/if}}\" >\n```\n\nThat was a way to tell JsViews to treat that `{{include}}` tag as a JsRender tag, and not to add JsViews data-linking behavior to that tag.\n\nRemove the `link=false` annotations and you will get an error.\n\nBut this is not a real solution for us. What we really want to do is to provide for data-binding of our conditional toggling of the <em>'special'</em> class, and to have a data-driven approach to our <em>hover</em> behavior. To do that we will need to replace the JsRender `{{include}}` tag by corresponding JsViews data-linking directly on the HTML elements.\n\nSubsequent pages of in this tutorial sequence will show you how.\n\n<em>The next page gives more detail on <a href=\"#samples/data-link/for-and-if\">data-linking `{^{for}}` and `{^{if}}`</a>.</em>"
      },
      {
        "_type": "para",
        "title": "See also the JsViews API topics:",
        "text": "<ul><li><a href=\"#linked-tag-syntax\">Data-linked tags</a></li><li><a href=\"#linked-elem-syntax\">Data-linked elements</a></li></ul>"
      }
    ]
  },
  "samples/data-link/for-and-if": {
    "title": "Data-linking {^{for}} and {^{if}}",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the second page of a <a href=\"#samples/data-link\">tutorial sequence</a> on data-linking. Here we are showing how to convert a complex JsRender template to work in JsViews, using data-linking throughout.\n"
      },
      {
        "_type": "para",
        "title": "Data-linked {^{for ...}} tag",
        "text": "In the final sample in that sequence, we saw that simply by adding the `^` character, the `{^{for ...}}` becomes data-linked. Here is that same sample, but in a stripped down form, in which we have removed the `{{include}}` tag within the element markup, and the hover behavior for <em>role details</em>. We will add them back in progressively in later sample, as we show how to create fully data-linked implementations of similar or improved functionality..."
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
            "text": "```js\n$(\"#add\").on(\"click\", function() {\n  $.observable(data.people).insert({\n    first:\"Amos\",\n    ...\n  });\n})\n```\n\n```jsr\n{^{for people}}\n  <div class=\"person\">\n    {{:first}} <b>{{:last}}</b>\n  </div>\n{{/for}}\n```"
          }
        ],
        "url": "samples/data-link/5_linked-for-tag",
        "height": "140",
        "title": "Data-linked {^{for ...}} tag"
      },
      {
        "_type": "para",
        "title": "Data-linked {^{if ...}} tag",
        "text": "Data-linking an `{{if}}` tag works in just the same way, simply by adding a `^` character.\n\nWe'll illustrate that by allowing the user to switch between <em>first-last</em> and <em>last-first</em> format for the name:"
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
            "markup": "Reverse name: <input type=\"checkbox\" data-link=\"reverse\"/>\n{^{for people}}\n  <div class=\"person\">\n    {^{if ~root.reverse}}\n      <b>{{:last}}</b>, {{:first}}\n    {{else}}\n      {{:first}} <b>{{:last}}</b>\n    {{/if}}\n  </div>\n{{/for}}"
          }
        ],
        "html": "",
        "code": "",
        "url": "samples/data-link/6_linked-if-tag",
        "height": "160",
        "title": "Data-linked {^{if ...}} tag"
      },
      {
        "_type": "para",
        "title": "Learning points here:",
        "text": "First, notice that the name reversing feature is entirely declarative. We didn't write a single line of code. We didn't even need to modify our data (or define a modified view model) since here we are using plain JavaScript objects, and we are taking the initial value of `reverse` as falsey - so `undefined` is fine. If we want to have an initial setting of <em>last-first</em>, we can add it to the data, like this:\n\n```js\nvar data = {\n  reverse: true,\n  people: [\n    {\n      first:\"Jeff\",\n      ...\n```\n\nClick on <em>Try it</em> and test it out...\n\nNext, notice that we are binding our if to the `reverse` at the <em>root</em> level of the data. But the context of the `{{if}}` is the view for a `person` - corresponding to the content of the `{{for}}` tag. So the current data item is a `person`. To bind to the `reverse` property on the top-level data object rather than on the `person` object, we use the syntax `{^{if ~root.reverse}}`."
      },
      {
        "_type": "para",
        "title": "Data-linking class",
        "text": "In the previous page - <a href=\"#samples/data-link/from-render-to-link\">from rendering to linking</a> - we also used `{{if}}` to conditionally set a <em>'special'</em> class on a <em>span</em>, as follows:\n\n```jsr\n<span class=\"{{if role.indexOf('Lead')>=0}}special{{/if}}\">\n```\n\n<em>The next page shows how we can convert that using data-linked element syntax, so as to dynamically <a href=\"#samples/data-link/class\">data-link class</a>.</em>"
      },
      {
        "_type": "para",
        "title": "See also the JsViews API topics:",
        "text": "<ul><li><a href=\"#linked-tag-syntax\">Data-linked tags</a></li><li><a href=\"#linked-elem-syntax\">Data-linked elements</a></li></ul>"
      }
    ]
  },
  "samples/data-link/hover": {
    "title": "Using data-link and visibility, with mouse events (hover)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the page seven of a <a href=\"#samples/data-link\">tutorial sequence</a> on data-linking. We show how to link to all the possible targets on an HTML element, such as attributes, styles and class.\n\nIn the JsRender template on the first page of this tutorial, <a href=\"#samples/data-link/from-render-to-link\">From rendering to linking</a>, we used <em>DOM level 0</em> mouse event handlers to show and hide the <em>'role details'</em>:\n\n```jsr\n<span ...\n  onmouseover=\"$('#role_{{:#index}}').show();\"\n  onmouseout=\"$('#role_{{:#index}}').hide();\"\n>\n  ...\n</span>\n```\n\nOn this tutorial page we will convert that feature to use data-linking, and successively show three ways to improve the original approach:\n<ul>\n<li>Use a converter to provide the inline code, so as to provide separation of code and markup</li>\n<li>Use attached event handlers, rather than inline code - and use JsViews to find the associated \"role details' element without needing to insert IDs into the HTML</li>\n<li>Use data-binding to trigger the hiding/showing from the mouse events</li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "Using a converter to return inline event code",
        "text": "We replace the previous inline code by a converter - which actually returns the same code string as in the original version:"
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
            "text": "```jsr\n<div class=\"person\"\n  onmouseover=\"{{over:#index}}\"\n  onmouseout=\"{{out:#index}}\"\n>\n```\n\n```js\n$.views.converters({\n    over: function(id) {\n      return \"$('#role_\" + id + \"').show();\"\n    },\n    out: function(id) {\n      return \"$('#role_\" + id + \"').hide();\"\n    }\n  }, peopleTmpl);\n```"
          }
        ],
        "url": "samples/data-link/11_linked-hover",
        "height": "160",
        "title": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice that we declared our converters just for this `peopleTmpl`, by passing in the template as the last parameter.<br/> See <a href=\"#converters\">Registering converters</a>."
      },
      {
        "_type": "para",
        "title": "Attaching event handlers - and using $.view(this) to find the associated \"role details' element",
        "text": "For the second approach, we use attached event handlers, rather than inline code.\n\nWe don't need to insert IDs into the rendered HTML elements, since we can get the view for this person we moused over, and find the target element in the context of that view...:\n\n```js\n$.view(this)\n```\n\n```js\n$.view(this)\n  .contents(true, \".details\")\n  .show()\n```"
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
            "code": "peopleTmpl.link(\"#people\", data)\n  .on(\"mouseover\", \".person\", function() {\n    // Get the view for this person (the one we moused over...)\n    $.view(this) \n      // Find the element with class \"details\" within this view\n      .contents(true, \".details\") \n      // Make it visible\n      .show();\n  })\n  ..."
          }
        ],
        "html": "",
        "code": "",
        "url": "samples/data-link/11b_linked-hover",
        "height": "160"
      },
      {
        "_type": "para",
        "title": "Use data-binding to trigger the hiding/showing",
        "text": "Finally, we'll replace the code in the mouse handlers which was directly showing/hiding the target HTML element. Instead, we will set a boolean property `_show` on the data to true/false, and we'll bind `visible` of the element to that property: "
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
            "text": "```js\n.on(\"mouseover\", \".person\", function() {\n  // Get the person object (the current data item on the view)\n  var person = $.view(this).data;\n\n  // Set the boolean property that we bind \"visible\" to:\n  $.observable(person).setProperty(\"_show\", true);\n})\n```\n\n```jsr\n<span \n  data-link=\"\n    {:role}\n    visible{:_show}\n  \"\n  class=\"details\"\n></span>\n```"
          }
        ],
        "url": "samples/data-link/11c_linked-hover",
        "height": "160"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>On the next page we move to showing how to <a href=\"#samples/data-link/css\">data-link CSS styles or attributes</a>.</em>"
      },
      {
        "_type": "para",
        "title": "See also the JsViews API topics:",
        "text": "<ul><li><a href=\"#linked-tag-syntax\">Data-linked tags</a></li><li><a href=\"#linked-elem-syntax\">Data-linked elements</a></li></ul>"
      }
    ]
  },
  "samples/data-link/computed": {
    "title": "Using data-link to bind to computed data values",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the page seven of a <a href=\"#samples/data-link\">tutorial sequence</a> on how to convert a complex JsRender template to work in JsViews, using data-linking throughout.\n"
      },
      {
        "_type": "para",
        "title": "Data-linked element syntax",
        "text": "The first thing that this shows us is that you can use quite rich or complex expressions in your template tags."
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
        "sections": [],
        "url": "samples/data-link/link4",
        "height": "260",
        "title": "4"
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
        "sections": [],
        "url": "samples/data-link/link5",
        "height": "190",
        "title": "5"
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
        "sections": [],
        "url": "samples/data-link/link6",
        "title": "6",
        "height": "190"
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
        "sections": [],
        "url": "samples/data-link/link7",
        "title": "7",
        "height": "190"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<ul><li>JsRender template tags which are outside HTML elements, or fully within the element content of an HTML element can remain unchanged in a JsViews template. They will work correctly. They can optionally be data-linked by simply adding a ^ character (so that for example a <em>{{for}}</em> tag becomes a data-linked <em>{^{for}}</em> tag) - and in that case the rendered content will change dynamically whenever the bound data changes <em>'observably'</em>.</li>\n<li>But tags which are within the markup of the actual HTML opening tag itself, whether placed between attributes, or spanning attributes, or within the attribute content (the text value of the attribute), will not be valid in a JsViews template.</li>\n<li>Similarly, tags which wrap opening or closing tag in such a way as to produce 'mal-formed HTML' will not be valid.</li>\n<li>In fact a valid JsViews template will have the tree hierarchy of nested HTML tags and nested template tags combining together, as it were, as a single well-formed tree.</li>\n<li>In each of the invalid scenarios mentioned above, the JsRender tags needs to be replaced by corresponding data-linked element syntax</li></ul>\n\n<em>The next page gives more detail on <a href=\"#samples/data-link/for-and-if\">data-linking {^{for}} and {^{if}}</a>.</em>"
      },
      {
        "_type": "para",
        "title": "See also the JsViews API topics:",
        "text": "<ul><li><a href=\"#linked-tag-syntax\">Data-linked tags</a></li><li><a href=\"#linked-elem-syntax\">Data-linked elements</a></li></ul>"
      }
    ]
  },
  "samples/data-link/toggle": {
    "title": "Using data-linking to toggle a value in a list",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the fourth page of a <a href=\"#samples/data-link\">tutorial sequence</a> on data-linking. We show how to convert a complex JsRender template to work in JsViews, using data-linking throughout, and how to link to all the possible targets on an HTML element, such as attributes, styles and class.\n\nIn the <a href=\"#samples/data-link/class\">previous page</a> we used data-linking to data-bind the value of the `className` property of an element to our data."
      },
      {
        "_type": "para",
        "title": "Data-linking to toggle <b>one class</b> in a className list",
        "text": "In this page of the tutorial we will show how to use data-link to toggle a <em>class</em>.\n\nFirst let's add another class to the `<span>`, and see what happens to it when we data-link:"
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
            "text": "```jsr\n.red-border { border: 1px solid red; }\n```\n\n```jsr\n<span class=\"red-border\"\n  data-link=\"class{:isLead?'special':''}\">\n```"
          }
        ],
        "html": "<style>\n  .person { padding: 3px; margin: 5px; }\n  .special { color: blue; font-style: italic; }\n  .red-border { border: 1px solid red; padding: 3px; }\n</style>\n\n<div id=\"people\"></div>\n\n<script id=\"peopleTemplate\" type=\"text/x-jsrender\">\n  <button id=\"add\">Add person</button><br />\n  Reverse name: <input type=\"checkbox\" data-link=\"reverse\"/>\n  {^{for people}}\n    <div class=\"person\">\n      Lead: <input type=\"checkbox\" data-link=\"isLead\"/>\n      <span class=\"red-border\"\n        data-link=\"class{:isLead?'special':''}\">\n        {^{if ~root.reverse}}\n          <b>{{:last}}</b>, {{:first}}\n        {{else}}\n          {{:first}} <b>{{:last}}</b>\n        {{/if}}\n      </span>\n    </div>\n  {{/for}}\n</script>",
        "code": "var data = {\n  people: [\n    {\n      first:\"Jeff\",\n      last: \"Adams\",\n      isLead: true\n    },\n    {\n      first:\"Eugenia\",\n      last: \"Tyzak\",\n    }\n  ]\n};\n\n$.templates({ \n  peopleTmpl: \"#peopleTemplate\"\n});\n\n$.templates.peopleTmpl.link(\"#people\", data);\n\n$(\"#add\").on(\"click\", function() {\n  $.observable(data.people).insert({\n    first:\"Amos\",\n    last: \"Sanchez\"\n  });\n})",
        "markup": "",
        "height": "160"
      },
      {
        "_type": "para",
        "title": "",
        "text": "As you see, the red border does not show up, because our data-linking removes the `red-border` class, and replaces it with `\"\"` or `\"special\"`.\n\nA simple fix would be to return all of the classes in the data-binding expression. But that assumes we know those classes:\n\n```jsr\n<span class=\"red-border\"\n  data-link=\"class{:isLead?'red-border special':'red-border'}\">\n```\n\nAnother fix is to write your own converter, which looks at the element's `className`, and computes the return value:\n\n```jsr\n<span class=\"red-border\"\n  data-link=\"class{mySmartConverter:isLead?'special':''}\">\n```\n\nThat is completely possible. But there is an easier way. There is a built-in converter called `merge` which you can use, which automatically toggles values in a white-space separated list:"
      },
      {
        "_type": "para",
        "title": "Using the <b>merge</b> converter to toggle the class",
        "text": "You just add the `{merge:` converter, data-link to a boolean value, and then set the `toggle='...'` named parameter to the string (the name of your class) that you want to toggle:\n\n```jsr\n<span class=\"red-border\"\n  data-link=\"someTarget{merge:some.boolean.value toggle='someTermInWhiteSpaceSeparatedList'}\">\n```\n\nLet's use that to toggle our `special` class within the `className` list (which includes `red-border`):"
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
            "text": "```jsr\n.red-border { border: 1px solid red; }\n```\n\n```jsr\n<span class=\"red-border\"\n  data-link=\"class{merge:isLead toggle='special'}\">\n```"
          }
        ],
        "html": "<style>\n  .person { padding: 3px; margin: 5px; }\n  .special { color: blue; font-style: italic; }\n  .red-border { border: 1px solid red; padding: 3px; }\n</style>\n\n<div id=\"people\"></div>\n\n<script id=\"peopleTemplate\" type=\"text/x-jsrender\">\n  <button id=\"add\">Add person</button><br />\n  Reverse name: <input type=\"checkbox\" data-link=\"reverse\"/>\n  {^{for people}}\n    <div class=\"person\">\n      Lead: <input type=\"checkbox\" data-link=\"isLead\"/>\n      <span class=\"red-border\"\n        data-link=\"class{merge:isLead toggle='special'}\">\n        {^{if ~root.reverse}}\n          <b>{{:last}}</b>, {{:first}}\n        {{else}}\n          {{:first}} <b>{{:last}}</b>\n        {{/if}}\n      </span>\n    </div>\n  {{/for}}\n</script>",
        "code": "var data = {\n  people: [\n    {\n      first:\"Jeff\",\n      last: \"Adams\",\n      isLead: true\n    },\n    {\n      first:\"Eugenia\",\n      last: \"Tyzak\",\n    }\n  ]\n};\n\n$.templates({ \n  peopleTmpl: \"#peopleTemplate\"\n});\n\n$.templates.peopleTmpl.link(\"#people\", data);\n\n$(\"#add\").on(\"click\", function() {\n  $.observable(data.people).insert({\n    first:\"Amos\",\n    last: \"Sanchez\"\n  });\n})",
        "height": "160"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now the `red-border` is correctly preserved."
      },
      {
        "_type": "para",
        "title": "Using the <b>merge</b> converter to toggle the <b>'- (Lead)'</b> term in the role",
        "text": "We can actually use the built-in `merge` converter also to add and remove the `\"- (Lead)\"` string from the `role`, too.\n\nThe first thing we do is link the `role` to the `innerText`:\n\n```jsr\n<span data-link=\"{:role}\"></span>\n```\n\n(Note since `innerText` is the default target of data-link expressions on elements other than form elements -- such as `<input />` -- the above is actually equivalent to writing `<span data-link=\"text{:role}\"></span>`).\n\nThen we add to the data-link an additional binding expression to toggle the `\"- (Lead)\"` string:\n\n```jsr\n<span data-link=\"\n  {:role}\n  {merge:isLead toggle='- (Lead)'}\n\"></span>\n```\n\nHere is our ongoing sample with that added in too:"
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
            "text": "```js\npeople: [\n  {\n    first:\"Jeff\",\n    last: \"Adams\",\n    role: \"Marketing\",\n    isLead: true\n  },\n  {\n    first:\"Eugenia\",\n    last: \"Tyzak\",\n    role: \"Visiting member\"\n  }\n```\n\n```jsr\nLead: <input type=\"checkbox\" data-link=\"isLead\"/>\n<span class=\"red-border\"\n  data-link=\"class{merge:isLead toggle='special'}\">\n  ...\n</span>\n<span data-link=\"\n    {:role}\n    {merge:isLead toggle='- (Lead)'}\n  \"\n  ...\n></span>\n```"
          }
        ],
        "height": "160",
        "html": "<style>\n  .person { padding: 3px; margin: 5px; }\n  .special { color: blue; font-style: italic; }\n  .red-border { border: 1px solid red; padding: 3px; }\n  .details { color: green; border: 2px solid grey;\n             padding: 3px; margin-left :40px; }\n</style>\n\n<div id=\"people\"></div>\n\n<script id=\"peopleTemplate\" type=\"text/x-jsrender\">\n  <button id=\"add\">Add person</button><br />\n  Reverse name: <input type=\"checkbox\" data-link=\"reverse\"/>\n  {^{for people}}\n    <div class=\"person\">\n      Lead: <input type=\"checkbox\" data-link=\"isLead\"/>\n      <span class=\"red-border\"\n        data-link=\"class{merge:isLead toggle='special'}\">\n        {^{if ~root.reverse}}\n          <b>{{:last}}</b>, {{:first}}\n        {{else}}\n          {{:first}} <b>{{:last}}</b>\n        {{/if}}\n      </span>\n      <span data-link=\"\n          {:role}\n          {merge:isLead toggle='- (Lead)'}\n        \"\n        class=\"details\"\n      ></span>\n  </div>\n  {{/for}}\n</script>",
        "code": "var data = {\n  people: [\n    {\n      first:\"Jeff\",\n      last: \"Adams\",\n      role: \"Marketing\",\n      isLead: true\n    },\n    {\n      first:\"Eugenia\",\n      last: \"Tyzak\",\n      role: \"Visiting member\"\n    }\n  ]\n};\n\n$.templates({ \n  peopleTmpl: \"#peopleTemplate\"\n});\n\n$.templates.peopleTmpl.link(\"#people\", data);\n\n$(\"#add\").on(\"click\", function() {\n  $.observable(data.people).insert({\n    first:\"Amos\",\n    last: \"Sanchez\",\n    role: \"Support\"\n  });\n})\n"
      },
      {
        "_type": "para",
        "title": "Toggle multiple classes at the same time",
        "text": "And we can even have multiple simultaneous data-link bindings targeting the same list, but toggling different items in the list. Let's toggle another class on the same span, based in whether the `reverse` boolean for swapping the name order. Select \"Reverse name\" and we will apply a different class for the border color: "
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
            "markup": "<span class=\"red-border\" data-link=\"\n    class{merge:isLead toggle='special'}\n    class{merge:~root.reverse toggle='red-border'}\n    class{merge:!~root.reverse toggle='green-border'}\n  \"\n>"
          }
        ],
        "url": "samples/data-link/8_toggle-class",
        "height": "160"
      },
      {
        "_type": "para",
        "title": "",
        "text": "\n\nHere we have covered data-linking the <em>class</em> attribute. You can similarly data-link other attributes. <em>The next page: <a href=\"#samples/data-link/attributes\">data-linking HTML attributes</a> illustrates that with the `title` and `disabled` attributes.</em>"
      },
      {
        "_type": "para",
        "title": "See also the JsViews API topics:",
        "text": "<ul><li><a href=\"#linked-tag-syntax\">Data-linked tags</a></li><li><a href=\"#linked-elem-syntax\">Data-linked elements</a></li></ul>"
      }
    ]
  },
  "samples/data-link/attributes": {
    "title": "Data-linking HTML attributes",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is page five of a <a href=\"#samples/data-link\">tutorial sequence</a> on data-linking. We show how to link to all the possible targets on an HTML element, such as attributes, styles and class.\n\nIn the previous <a href=\"#samples/data-link/class\">two pages</a> we explored data-linking the <em>className</em> attribute. Data-linking other HTML attributes is similar.\n\nWe'll illustrate that by adding data-linking on the <em>Add person</em> button on our ongoing sample. We'll data-link the `disabled` property to disable the button so as to limit to three people in the <em>members</em> list:"
      },
      {
        "_type": "para",
        "title": "Data-linking the <b>disabled</b> and <b>title</b> attributes",
        "text": "First a really simple sample, to show the data-linking:"
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
            "markup": "<button data-link=\"\n  disabled{:disableButton}\n  title{:theTitle}\"\n>\n"
          }
        ],
        "markup": "<p>\n<button data-link=\"\n  disabled{:disableButton}\n  title{:theTitle}\"\n>\n  I am {^{:disableButton?'disabled':'enabled'}}\n</button><br/><br/>\n</p>\n<p>\nDisable: <input data-link=\"disableButton\" type=\"checkbox\" /><br/>\nSet button (on hover) title: <input data-link=\"theTitle trigger=true\" />\n</p>",
        "data": {
          "theTitle": "the title",
          "disableButton": false
        },
        "title": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now let's use that in our ongoing sample. We'll write:\n\n```jsr\ndata-link=\"disabled{:people.length > 2}           \n```\n\nAnd we'll data-link the `title` to show a message when it is disabled. Here is the updated sample (which we have simplified by removing the <em>reverse name</em> feature for now, for clarity):\n\n\n\nAdd a person, then mouse over the disabled <em>Add person</em> button to see the <em>title</em> message..."
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
            "markup": "<button data-link=\"\n    disabled{:people.length > 2}\n    title{:people.length > 2 ? 'The team is complete!' : null}\n  \" \n>\n  Add person\n</button>"
          }
        ],
        "url": "samples/data-link/9_linked-attributes",
        "height": "165"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>On the next page we will make the message more discoverable, by <a href=\"#samples/data-link/visibility\">data-linking visibility</a>:</em>"
      },
      {
        "_type": "para",
        "title": "See also the JsViews API topics:",
        "text": "<ul><li><a href=\"#linked-tag-syntax\">Data-linked tags</a></li><li><a href=\"#linked-elem-syntax\">Data-linked elements</a></li></ul>"
      }
    ]
  },
  "samples/data-link/css": {
    "title": "Data-linking css attributes",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is page eight of a <a href=\"#samples/data-link\">tutorial sequence</a> on data-linking. We show how to link to all the possible targets on an HTML element, such as attributes, styles and class. Here we show how to data-link CSS styles."
      },
      {
        "_type": "para",
        "title": "Data-linking to style is easy: - prepend the name with <b>\"css-\"</b>",
        "text": "For example to data-link to the CSS `background-color` use `css-background-color` as data-link target:\n\n```jsr\ndata-link=\"css-background-color{:dataPathOrExpression}\"\n```"
      },
      {
        "_type": "para",
        "title": "Here is a sample showing several examples of CSS attribute binding:",
        "text": ""
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
            "text": "Using <em>data-link</em> to bind to <em>CSS attributes</em> on DOM elements:\n\n```jsr\n<div data-link=\"\n    css-background-color{:color}\n    css-width{:width}\n    css-height{:height}\n    css-border-width{:thickness}\n    css-border-color{:border}\n  \"\n></div>\n```"
          }
        ],
        "markup": "",
        "data": {
          "color": "yellow",
          "border": "blue",
          "width": 100,
          "height": 50,
          "thickness": 3
        },
        "height": "300",
        "url": "samples/data-link/12_linked-css"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>On the next page we will show <a href=\"#samples/data-link/svg\">data-linking SVG elements</a>.</em>"
      },
      {
        "_type": "para",
        "title": "See also the JsViews API topics:",
        "text": "<ul><li><a href=\"#linked-tag-syntax\">Data-linked tags</a></li><li><a href=\"#linked-elem-syntax\">Data-linked elements</a></li></ul>"
      }
    ]
  },
  "samples/data-link/class": {
    "title": "Data-linking to the \"class\" attribute",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the third page of a <a href=\"#samples/data-link\">tutorial sequence</a> on data-linking. We show how to convert a complex JsRender template to work in JsViews, using data-linking throughout, and how to link to all the possible targets on an HTML element, such as attributes, styles and class."
      },
      {
        "_type": "para",
        "title": "Data-linking to HTML attributes",
        "text": "In the JsRender template on the first page of this tutorial, <a href=\"#samples/data-link/from-render-to-link\">From rendering to linking</a>, we had an `{{if}}` tag <em><b>inside an HTML attribute</b></em>:\n\n```jsr\n<span class=\"{{if role.indexOf('Lead')>=0}}special{{/if}}\">\n```"
      },
      {
        "_type": "para",
        "title": "Rules for a well-formed JsViews template",
        "text": "You might think you can convert that to JsViews data-linking by simply adding a `^`, like we did elsewhere in the previous page:\n\n```jsr\n<span class=\"{^{if role.indexOf('Lead')>=0}}special{{/if}}\">\n```\n\nIf you try that (using the <em>Try it</em> button, for example) you will see that it renders incorrectly. Putting JsRender tags like `{{if}}` <em><b>within an HTML element tag</b></em>, including <em><b>within an attribute value</b></em> is an example of invalid JsViews template markup. For details on the rules for what is valid, or invalid, within a JsViews template see the JsViews API topic: <a href=\"#jsvtemplatetags\">JsViews template tags</a>."
      },
      {
        "_type": "para",
        "title": "Data-linking to \"class\"",
        "text": "The right way to data-link to <em>class</em> is using <a href=\"#linked-elem-syntax\">data-linked element</a> syntax to link directly to the <em>class</em> attribute as target. (And similarly for linking to the attributes - see <a href=\"#samples/data-link/attributes\">data-linking to HTML attributes</a>).\n\nHere's a simple example:"
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
            "text": "We'll provide a boolean property in our data:\n\n```js\nvar data = {\n  isSpecial: false\n};\n```\n\n```jsr\n<input type=\"checkbox\" data-link=\"isSpecial\" />\n```\n\nNow we provide a `<div>`, and bind the `innerText`:\n\n```jsr\n<div data-link=\"{:isSpecial?'special':'regular'}\"></div>\n```\n\nThen we add a second data-link expression to bind to <em>class</em>:\n\n```jsr\n<div data-link=\"\n  {:isSpecial?'special':'regular'}\n  class{:isSpecial?'special':'regular'}\n\"></div>\n```"
          }
        ],
        "html": "<style>\n  .regular { padding 5px; margin: 5px; display: inline-block; }\n  .special { color: green; display: inline-block; border: 2px solid red; padding 15px; margin: 5px; }\n</style>\n\n<div id=\"result\"></div>\n\n<script id=\"myTemplate\" type=\"text/x-jsrender\">\n  <input type=\"checkbox\" data-link=\"isSpecial\" />\n  <div data-link=\"\n      {:isSpecial?'special':'regular'}\n      class{:isSpecial?'special':'regular'}\n    \"></div>\n</script>",
        "code": "var data = {\n  isSpecial: false\n};\n\nvar myTmpl = $.templates(\"#myTemplate\");\n\nmyTmpl.link(\"#result\", data);",
        "height": "56"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that we get the <em>conditional</em> behavior of the `{{if}}` simply by using a ternary expression in the data-link tag:\n\n```js\nisLead?'special':'regular'\n```"
      },
      {
        "_type": "para",
        "title": "Back to our ongoing sample...",
        "text": "Let's use that approach in our ongoing sample to provide the feature where we can add or remove the <em>\"Lead\"</em> role and have the class update automatically.\n\nWe'll bind to a boolean `isLead` property on the <em>person</em> object.\n\n```js\npeople: [\n  {\n    first:\"Jeff\",\n    last: \"Adams\",\n    role: \"Marketing (Lead)\",\n    isLead: true\n  },\n  ...\n```\n\nAnd instead of using a data-linked `{^{if}}` tag, we'll replace that by direct data-linking on the element, like in our sample above:\n\n```jsr\n<span data-link=\"class{:isLead?'special':''}\">\n```\n\nHere is the sample:"
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
            "markup": "Lead: <input type=\"checkbox\" data-link=\"isLead\"/>\n<span data-link=\"class{:isLead?'special':''}\">\n  ...\n</span>"
          }
        ],
        "url": "samples/data-link/7_link-to-class",
        "height": "160",
        "title": "Data-linked class attribute"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In data-linking to <em>class</em> as target, we are actually linking to the HTML `className` property of the element, which is of course generally a white-space-separated list of class names.\n\nSo in our current sample we are toggling the value of `className` between `\"\"` and `\"special\"`, depending on the value of our `isLead` data property.\n\nWhat if there are other classes set on the element? Clearly we would like to have our data-linking toggle just one class (the `special` class) within that list.\n\n<em>The next page takes up shows how to use <a href=\"#samples/data-link/toggle\">data-linking to toggle a term in a list</a>, and applies that the the <em>class</em> to achieve that scenario.</em>"
      },
      {
        "_type": "para",
        "title": "See also the JsViews API topics:",
        "text": "<ul><li><a href=\"#linked-tag-syntax\">Data-linked tags</a></li><li><a href=\"#linked-elem-syntax\">Data-linked elements</a></li></ul>"
      }
    ]
  },
  "samples/data-link/visibility": {
    "title": "Data-linking visibility",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is page six of a <a href=\"#samples/data-link\">tutorial sequence</a> on data-linking. We show how to link to all the possible targets on an HTML element, such as attributes, styles and class.\n\nIn the <a href=\"#samples/data-link/attributes\">previous sample</a>, we data-linked the `disabled` and `title` attributes.\n\nTo make the message we displayed through data-linking the `title` more discoverable to the user, let's  put it in a <em>span</em> on which we will data-link the `visibility`.\n\nThe `visible` data-link target is a special built-in target in JsViews, which works through the CSS `display` property. It works by data-linking directly to a boolean property: "
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
            "text": "Add a person, and you will see this message:\n\n```jsr\n<span data-link=\"visible{:people.length > 2}\" class=\"status\">\n  The team is complete!\n</span>\n```"
          }
        ],
        "url": "samples/data-link/10_linked-visibility",
        "height": "150"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now, here are two more samples using data-linked visibility:\n<ul class=\"textbefore\">\n<li>The <a href=\"#samples/form-els/visible-binding\">form elements and data-linked visibility</a> sample</li>\n<li>The <a href=\"#samples/tag-controls/tree/visible-binding\">tree with 'visible' binding</a> sample</li>\n</ul>\n\nBut let's also use <em>visible</em> data-linking to hide and show the details blocks when the user hovers over the name - following the feature used in the original <a href=\"\">JsRender template version</a>. <em>The <a href=\"#samples/data-link/hover\">next page</a> explores three different approaches to doing just that.</em>"
      },
      {
        "_type": "para",
        "title": "See also the JsViews API topics:",
        "text": "<ul><li><a href=\"#linked-tag-syntax\">Data-linked tags</a></li><li><a href=\"#linked-elem-syntax\">Data-linked elements</a></li></ul>"
      }
    ]
  },
  "samples/data-link/svg": {
    "title": "Data-linking SVG elements",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is page nine of a <a href=\"#samples/data-link\">tutorial sequence</a> on data-linking. We show how to link to all the possible targets on an HTML element, such as attributes, styles and class. Here we show how to data-link different properties of SVG elements."
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
            "text": "Using <em>data-link</em> to bind to <em>svg</em> elements:\n\n```js\n<svg class=\"svg\">\n  <ellipse stroke-width=\"2\" rx=\"140\" ry=\"50\"\n    data-link=\"\n      cx{:x}\n      cy{:y}\n      fill{:color}\n      stroke{:textcolor}\n      transform{:'rotate(' + angle + ' ' + x + ' ' + y + ')'}\n    \"\n  ></ellipse>\n  <text data-link=\"\n      x{:x}\n      y{:y}\n      fill{:textcolor}\n      text{:text}\n      transform{:'rotate(' + angle + ' ' + x + ' ' + y + ')'}\n    \"\n  ></text>\n</svg>\n```"
          }
        ],
        "url": "samples/data-link/13_linked-svg",
        "height": "510"
      },
      {
        "_type": "para",
        "title": "See also the JsViews API topics:",
        "text": "<ul><li><a href=\"#linked-tag-syntax\">Data-linked tags</a></li><li><a href=\"#linked-elem-syntax\">Data-linked elements</a></li></ul>"
      }
    ]
  },
  "samples/data-link": {
    "title": "Data-linking tags and elements (tutorial sequence)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sequence of sample pages is a tutorial showing the multiple possibilities of data-linking. We start with showing how to convert a complex JsRender template to work in JsViews, using data-linking throughout."
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/data-link/from-render-to-link",
            "label": "From rendering to linking"
          },
          {
            "hash": "samples/data-link/for-and-if",
            "label": "Linking {^{for}} and {^{if}}"
          },
          {
            "hash": "samples/data-link/class",
            "label": "Linking class"
          },
          {
            "hash": "samples/data-link/toggle",
            "label": "Toggling class with data-link"
          },
          {
            "hash": "samples/data-link/attributes",
            "label": "Linking attributes"
          },
          {
            "hash": "samples/data-link/visibility",
            "label": "Linking visibility"
          },
          {
            "hash": "samples/data-link/hover",
            "label": "Linking visibility and hover"
          },
          {
            "hash": "samples/data-link/css",
            "label": "Linking CSS attributes"
          },
          {
            "hash": "samples/data-link/svg",
            "label": "Linking SVG elements"
          },
          {
            "hash": "samples/data-link/computed",
            "label": "Computed ....!!"
          }
        ]
      },
      {
        "_type": "para",
        "title": "See also the JsViews API topics:",
        "text": "<ul><li><a href=\"#linked-tag-syntax\">Data-linked tags</a></li><li><a href=\"#linked-elem-syntax\">Data-linked elements</a></li></ul>"
      }
    ]
  },
  "samples/tag-controls/range": {
    "title": "Samples: A JsViews \"range\" tag control",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample takes the `{{range}}` tag from the JsRender <a href=\"#samples/jsr/tags/extend-for\">extending the `{{for}}` tag</a> sample, and adds data-linking to it."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/range/range.js",
            "label": "range.js"
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
            "text": "We use the `{{range}}` custom tag to create a drop-down to select an integer between 1 and 10 as the `start` integer (...and similarly for the `end` integer).\n\n```jsr\n<select data-link=\"{:start:strToInt}\">\n  {^{range start=1 end=10}}\n    <option>{{:#data}}</option>\n  {{/range}}\n</select>\n```\n\nThen we again use the `{{range}}` tag to show a partial list of team members.\n\nWe bind to the observable `members` array, and we also bind to the `start` and `end` 'range' integers.\n\n```jsr\n<ul>\n  {^{range members ^start=start-1 ^end=end}}\n    <li>\n      {^{:#index + ~root.start}}. {^{:name}}\n    </li>\n  {{else}}\n    <li>No items</li>\n  {{/range}}\n</ul>\n```\n\nNote the ^ character here:\n\n```jsr\n^start=start-1\n```\n\nand here:\n\n```jsr\n^end=end\n```\n\nto specify that the start and end 'named properties' on the `{{range}}` tag are data-linked. By default named properties are not data-linked. (This is made 'opt-in' for perf optimization reasons.)"
          }
        ],
        "sampleName": "tag-controls/range",
        "url": "samples/tag-controls/range/sample",
        "height": "400"
      }
    ]
  }
};