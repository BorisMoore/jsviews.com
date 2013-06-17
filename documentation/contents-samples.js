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
      }
    ]
  },
  "samples/jsr/composition": {
    "title": "Template composition",
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
            "hash": "samples/jsr/composition/subtemplates",
            "label": "Using sub-templates"
          },
          {
            "hash": "samples/jsr/composition/tmplobjects",
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
          "sample": "sample",
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
        "sampleName": "jsrender/composition/tmpl",
        "url": "samples/jsrender/composition/tmpl/sample",
        "onlyJsRender": true,
        "height": "235",
        "title": ""
      }
    ]
  },
  "samples/jsr/composition/fromstrings": {
    "title": "Composition using named templates compiled from markup strings",
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
          "sample": "sample",
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
        "sampleName": "jsrender/composition/fromstrings",
        "height": "90",
        "onlyJsRender": true,
        "url": "samples/jsrender/composition/fromstrings/sample"
      }
    ]
  },
  "samples/jsr/composition/remotetmpl": {
    "title": "Loading remote templates",
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
          "sample": "sample",
          "links": "links"
        },
        "sections": [
          {
            "_type": "para",
            "title": "Asynchronous loading of templates from the server",
            "text": "This sample takes the <a href=\"#samples/jsr/composition/fromstrings\">Template composition/From strings</a> sample, and modifies it to use templates loaded from the server."
          },
          {
            "_type": "para",
            "title": "",
            "text": "This illustrates one approach to loading remote templates: the template file on the server is a javascript file which registers a named template."
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
        "sampleName": "jsrender/composition/remotetmpl",
        "url": "samples/jsrender/composition/remotetmpl/sample",
        "height": "90",
        "onlyJsRender": true
      }
    ]
  },
  "samples/jsr/composition/subtemplates": {
    "title": "Sample: Template composition, using sub-templates",
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
          "sample": "sample",
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
        "sampleName": "jsrender/composition/subtmpl",
        "url": "samples/jsrender/composition/subtmpl/sample",
        "height": "200",
        "onlyJsRender": true
      }
    ]
  },
  "samples/jsr/composition/tmplobjects": {
    "title": "Sample: Composition, using contextual template objects",
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
          "sample": "sample",
          "links": "links"
        },
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "<em>subTemplates</em> is an object which holds references to compiled templates. We pass it in as helper object in the <em>render()</em> call:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "var subTemplates = {\n  columnTemplate: $.templates(\"#columnTemplate\"),\n  ...\n};\n\nvar html = movieTemplate.render(movies, subTemplates);"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Now each of the compiled templates, such as <em>subTemplates.columnTemplate</em> can be accessed from the outer template, and used for composition. Sub templates are acessed as regular helper objects such as <em>~columnTemplate</em>."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<script id=\"movieTemplate\" type=\"text/x-jsrender\">\n  ...\n  {{for languages tmpl=~columnTemplate/}}\n  ...\n</script>"
          }
        ],
        "sampleName": "jsrender/composition/tmplobjects",
        "onlyJsRender": true,
        "url": "samples/jsrender/composition/tmplobjects/sample",
        "height": "200"
      }
    ]
  },
  "samples/jsr/tags": {
    "title": "Custom tags",
    "path": "",
    "sections": [
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
      }
    ]
  },
  "samples/jsr/tags/wrap-content": {
    "title": "Custom tags: wrapping content",
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
          "sample": "sample",
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
            "markup": "{{mytag}}\n  {{>title}}\n{{/fntag}}\n"
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
        "sampleName": "jsrender/tags/wrap-content",
        "url": "samples/jsrender/tags/wrap-content/sample",
        "height": "220",
        "onlyJsRender": true
      }
    ]
  },
  "samples/jsr/tags/extend-for": {
    "title": "Custom tags: extending the {{for}} tag",
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
          "sample": "sample",
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
        "sampleName": "jsrender/tags/extend-for",
        "url": "samples/jsrender/tags/extend-for/sample",
        "height": "520",
        "onlyJsRender": true
      }
    ]
  },
  "samples/tagcontrols/multiselect": {
    "title": "Multiselect",
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
          "sample": "sample",
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
        "sampleName": "tagcontrols/multiselect",
        "height": "450",
        "url": "samples/tagcontrols/multiselect/sample"
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
    "title": "Helpers, and layout templates",
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
          "sample": "sample",
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
        "sampleName": "jsrender/helpers",
        "url": "samples/jsrender/helpers/sample",
        "height": "165",
        "onlyJsRender": true
      }
    ]
  },
  "samples/jsr/paths": {
    "title": "Paths",
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
          "sample": "sample",
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
            "hash": "samples/jsv/converters",
            "label": "Converters"
          },
          {
            "hash": "samples/tagcontrols",
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
          "sample": "sample",
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
        "sampleName": "jsrender/converters",
        "url": "samples/jsrender/converters/sample",
        "height": "430",
        "title": "Using {{: }} or {{> }} to render data values with optional conversion or encoding",
        "onlyJsRender": true
      }
    ]
  },
  "samples/converters/twoway": {
    "title": "Sample: Two-way binding and converters",
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
          "sample": "sample",
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
        "sampleName": "converters/twoway",
        "url": "samples/converters/twoway/sample"
      }
    ]
  },
  "samples/converters/formels": {
    "title": "Sample: Binding to form elements, with converters",
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
          "sample": "sample",
          "links": "links"
        },
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "Different <em>convert</em> and <em>convertBack</em> converters are registered, and then used in the form element data-binding as follows:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<input data-link=\"{intToStr:amount:strToInt}\">\n\n<input type=\"radio\" name=\"intVal\" value=\"0\" data-link=\"{intToStr:amount:strToInt}\">\n\n<select data-link=\"{intToStr:amount:strToInt}\">\n  <option>0</option>\n  ...\n</select>\n\n<input type=\"checkbox\" data-link=\"{getBit:amount bit=1 :setBit}\"> bit 1<br>"
          }
        ],
        "sampleName": "converters/formels",
        "url": "samples/converters/formels/sample",
        "height": "680",
        "title": "Two-way binding and converters"
      }
    ]
  },
  "samples/tagcontrols": {
    "title": "Samples: Tag controls",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/tagcontrols/tabs",
            "label": "tabs control"
          }
        ]
      }
    ]
  },
  "samples/tagcontrols/tabs": {
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
          "sample": "sample",
          "links": "links"
        },
        "sections": [
          {
            "_type": "para",
            "title": "Nested tags:",
            "text": "The sample shows two instances of a custom <e>{{tabs}}</em> tag control - an outer one, and a second inner one in one of the tabs of the outer one..."
          },
          {
            "_type": "template",
            "title": "Here is markup for the inner one:",
            "markup": "{^{tabs tabCaption=\"Inner One\"}}\n  ONE inner\n{{else tabCaption=\"Inner Two\"}}\n  TWO  {{>label2}}\n{{else tabCaption=\"Inner Three\"}}\n  THREE inner\n{{/tabs}}\n"
          }
        ],
        "url": "samples/tagcontrols/tabs/sample",
        "sampleName": "tagcontrols/tabs",
        "height": "290",
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
          "sample": "sample",
          "links": "links"
        },
        "sections": []
      }
    ]
  },
  "samples/jsv/converters": {
    "title": "Samples: Converters",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "samples/converters/twoway",
            "label": "Two-way binding and converters"
          },
          {
            "hash": "samples/converters/formels",
            "label": "Form elements and converters"
          }
        ]
      }
    ]
  },
  "samples/jso": {
    "title": "Samples: JsObservable",
    "path": "",
    "sections": []
  }
};