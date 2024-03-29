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
        "text": "The following topics give examples and details for data-linking each of the [built-in JsRender template tags](#jsrtags):\n\n*Tags without content:*\n\n- [`{^{: ...}}`](#jsvassigntag) (Evaluate)\n- [`{^{> ...}}`](#jsvhtmltag) (HTML encode)\n\n*Block tags:*\n\n- [`{^{include ...}}`](#jsvincludetag) (Template composition -- partials)\n- [`{^{for ...}}`](#jsvfortag) (Template composition, with iteration over arrays)\n- [`{^{props ...}}`](#jsvpropstag) (Iteration over properties of an object)\n- [`{^{if ...}}`](#jsviftag) (Conditional inclusion)\n- [`{^{mytag ...}}`](#jsvtagcontrols) (Custom tag controls)\n\n*Block tags (JsViews only):*\n\n- [`{^{radiogroup ...}}`](#jsvradiogrouptag) (Radio button group)\n- [`{^{checkboxgroup ...}}`](#jsvcheckboxgrouptag) (Checkbox group)\n- [`{^{on ...}}`](#jsvontag) (Button, or event binding)\n\n*Alternative content blocks:*\n\n- [`{{else ...}}`](#jsvelsetag) (Content block separator)\n\n*Creating your own tags (custom tag controls):*\n\n- [Custom tags](#jsvtagcontrols)\n"
      },
      {
        "_type": "para",
        "title": "In JsViews your template must be well-formed:",
        "text": "JsViews imposes some 'well-formed' constraints on templates which do not apply if you are only using JsRender. This is because JsRender is string-based, and is not 'aware' of the HTML structure, whereas JsViews is 'HTML-aware' in order to provide element-based data-binding'\n\nIn JsRender you have a lot of freedom. You can even do this:",
        "anchor": "wellformed"
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
        "jsrJsvJqui": "jsr",
        "height": "80",
        "title": "Badly-formed template &ndash; but OK in JsRender!"
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
        "text": "The `link(container, data, helpersOrContext)` method is similar to the [`render(data, helpersOrContext)`](#rendertmpl) method, but in addition to rendering the template, it also inserts the rendered output as content of the target HTML `container` element, and then *data-links* (data-binds to *observable* data) the HTML content to the underlying data.\n\nThe `link(container, data, helpersOrContext)` method takes as parameters the target HTML container element (or jQuery selector), the data (used as the <em>'data context'</em> during the rendering and linking), and optionally additional metadata or contextual helpers. It returns a jQuery object corresponding to the container element.\n\nThere are two ways of calling the `link()` method:\n- If you have a reference to the <em>template object</em> -- `myTmpl`, call [myTmpl.link(...)](#jsvtmpllink)\n- If you have registered the template by name -- `\"myTmpl\"`, call [$.link.myTmpl(...)](#jsv.d.link)\n"
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
        },
        "anchor": "api"
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
            "text": "```jsr\n<td>{^{>name}}</td>\n<td><input data-link=\"name\" /></td>\n```\n\n```js\nvar myTmpl = $.templates(\"#personTmpl\");\n\nmyTmpl.link(\"#person\", person);\n```"
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td>{^{>name}}</td>\n    <td><input data-link=\"name\" /></td>\n  </tr>\n</script>",
        "code": "var myTmpl = $.templates(\"#personTmpl\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar html = myTmpl.link(\"#person\", person);\n",
        "title": "template.link(object):",
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
        "html": "<button id=\"add\">Add person</button>\n\n<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td>{^{>name}}</td>\n    <td><input data-link=\"name\" /></td>\n  </tr>\n</script>",
        "code": "var myTmpl = $.templates(\"#personTmpl\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nmyTmpl.link(\"#peopleList\", people);\n\n$(\"#add\").on(\"click\", function() {\n  $.observable(people).insert({\n    name: \"name\"\n  });\n});\n",
        "title": "template.link(array):",
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
        "text": "You can pass in any JavaScript type (<em>object, string, number, function...</em>) as helpers on the `helpersOrContext` object, and use them as metadata, or as helper functions for formatting etc.\n\n<em>Note:</em> By passing in helpers in this way, you are making them specific to this `link()` call. Alternatively, you can declare helpers globally, -- and you can also declare helpers that are private to a specific template. See *[Registering helpers: `$.views.helpers()`](#helpers)* for details...\n\nWithin the template, helpers (whether global, or passed in to the `link()` method) are accessed by *helper paths*: `~keyName...`. \n\nFor example you might pass in an object with some utility functions:\n\n```js\nvar myHelpers = {\n  util: {\n    split: function(val, part) {...},\n    ...\n  },\n  ...\n};\n\nmyTmpl.link(\"#container\", myData, myHelpers);\n```\n\n-- and access them in the template using a *helper path* such as:\n\n```jsr\n{^{:~util.split(fullName, 0)}}\n```\nor\n```jsr\n<span data-link=\"~util.split(fullName, 0)\"></span>\n```\n\nSee *[Registering helpers](#helpers)*"
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
            "text": "Code:\n\n```js\nfunction toUpper(val) {...}\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nmyTmpl.link(\"#person\", person, myHelpers);\n```\n\nTemplate:\n\n```jsr\n<td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n...\n<td><input data-link=\"~color\" /></td>\n```"
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n    <td><input data-link=\"name\" /></td>\n    <td><input data-link=\"~color\" /></td>\n  </tr>\n</script>",
        "code": "function toUpper(val) { return val.toUpperCase(); }\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nmyTmpl.link(\"#person\", person, myHelpers);",
        "title": "template.link(object, myHelpers):",
        "height": "60"
      },
      {
        "_type": "para",
        "title": "Passing an array to link(), but without iteration.",
        "text": "When rendering and linking an array, an additional optional boolean parameter, `true`, can be passed to the `link()` method, in order to prevent iteration.\n",
        "anchor": "noiteration"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "template.link(container, data, helpersOrContext, noIteration)",
        "name": "link",
        "object": "template",
        "method": true,
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
                "description": "Contextual helper methods or properties - available to template as <code>~keyName</code>"
              },
              {
                "_type": "param",
                "name": "noIteration",
                "type": "boolean",
                "optional": true,
                "description": "Pass in parameter <code>true</code>, to prevent iteration on array data"
              }
            ],
            "args": [],
            "sections": [],
            "example": "myTmpl.link(\"#container\", data, helpers, true);",
            "description": "Render and link template against data (as content of container element) and pass in helpers. Determine iteration behavior for arrays"
          }
        ],
        "description": "Render and link template against data, under a container element, along with helpers/context. Determine iteration behavior for arrays",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        },
        "anchor": "apinoiteration"
      },
      {
        "_type": "para",
        "title": "",
        "text": "By passing in `true` as the fourth *'noIteration'* parameter, (or as third parameter if no `helpersOrContext` are passed), the template renders just once, with the array itself as current data, rather than rendering once for each item in the array.\n\nWithin the template, `{^{for}}` (or equivalently `{^{for #data}}`) can be used to iterate over the array, as in the following example:"
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
            "text": "Code:\n\n```js\nmyTmpl.link(\"#peopleList\", people, true); // helpersOrContext not passed (so undefined), and noIteration set to true\n```\n\nTemplate:\n\n```jsr\n<table>\n  <thead><tr><th colspan=\"2\">\n    {^{:#data.length}} people\n  </th></tr></thead>\n  <tbody>\n    {^{for}}\n      <tr>\n        <td>{^{>name}}</td><td><input data-link=\"name\" /></td>\n      </tr>\n    {{/for}}\n  </tbody>\n</table>\n```"
          }
        ],
        "jsrJsvJqui": "",
        "height": "190",
        "html": "<button id=\"add\">Add person</button>\n\n<div id=\"peopleList\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table>\n    <thead><tr><th colspan=\"2\">\n      {^{:#data.length}} people\n    </th></tr></thead>\n    <tbody>\n      {^{for}}\n        <tr>\n          <td>{^{>name}}</td><td><input data-link=\"name\" /></td>\n        </tr>\n      {{/for}}\n    </tbody>\n  </table>\n</script>",
        "code": "var myTmpl = $.templates(\"#personTmpl\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nmyTmpl.link(\"#peopleList\", people, true); // helpersOrContext not passed (so undefined), and noIteration set to true\n\n$(\"#add\").on(\"click\", function() {\n  $.observable(people).insert({\n    name: \"name\"\n  });\n});\n",
        "title": "template.link(container, array, helpers, noIteration):"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "rendertmpl",
            "label": "Render a template"
          }
        ]
      }
    ]
  },
  "d.render": {
    "title": "Render a named template without needing the template object",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "$.render.myTmpl()",
        "text": "If a template has been [registered](#d.templates) as a named template:\n\n```js\n$.templates(\"myTmpl\", \"#personTmpl\");\n```\n\nor\n\n```js\n$.templates(\"myTmpl\", \"some markup string\");\n```\n\n...then you can call the <a href=\"#tmplrender\">`render()`</a> method of the template without needing to hold on to the compiled template object returned from <a href=\"#d.templates\">`$.templates(...)`</a>.\n\nJust call `$.render.myTmpl(...)`, or `$.render[\"myTmpl\"](...)`\n\n(**Note:** there is also an alternative syntax for rendering a named template: `$.templates.myTmpl(...);`)\n"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.render.myTmpl(data, helpersOrContext)",
        "name": "myTmpl",
        "object": "$.render",
        "method": true,
        "tag": false,
        "returns": "string",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
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
                "description": "Contextual helper methods or properties - available to template as <code>~keyName</code>"
              }
            ],
            "sections": [],
            "example": "var html = $.render.myTmpl(myData, myHelpers);",
            "description": "Render template against data, and pass in helpers"
          }
        ],
        "description": "Render a named template against data, along with helper objects or context, and return a string",
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
            "_type": "code",
            "title": "",
            "code": "$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar html = $.render.personTmpl(person);"
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <tr>\n    <td style=\"color:{{:~color}};\">\n      {{:~format(name)}}\n    </td>\n  </tr>\n</script>",
        "code": "function toUpper(val) { return val.toUpperCase(); }\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nvar html = $.render.personTmpl(person, myHelpers);\n\n$(\"#person\").html(html);",
        "title": "$.render.personTmpl(...):",
        "height": "60",
        "jsrJsvJqui": "jsr"
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
        "title": "$.link.myTmpl(container, data, helpersOrContext, noIteration)",
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
              },
              {
                "_type": "param",
                "name": "noIteration",
                "type": "boolean",
                "optional": true,
                "description": "Pass in parameter <code>true</code>, to prevent iteration on array data"
              }
            ],
            "sections": [],
            "example": "$.link.myTmpl(\"#container\", myData, myHelpers, true);",
            "description": "Render and link template against data as content of a container element. Optionally pass in helpers and specify iteration behavior for arrays"
          }
        ],
        "description": "Render and link a named template against data, under a container element. (Optionally provide helpers/context and specify iteration behavior for arrays)",
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
            "text": "```js\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\n$.link.personTmpl(\"#person\", person, myHelpers);\n```\n\n```jsr\n<td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n...\n<td><input data-link=\"~color\" /></td>\n```"
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <tr>\n    <td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n    <td><input data-link=\"name\" /></td>\n    <td><input data-link=\"~color\" /></td>\n  </tr>\n</script>",
        "code": "var person = {\n    name: \"Adriana\"\n  };\n\nfunction toUpper(val) { return val.toUpperCase(); }\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\n$.link.personTmpl(\"#person\", person, myHelpers);",
        "title": "$.link.personTmpl(...):",
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
  "jsvunlink": {
    "title": "$.unlink(): removing data-bindings",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The `$.unlink(...)` API is used for programmatically removing previously registered views and data-link bindings on a target HTML element and its content:\n\n```js\n$.unlink(selectorOrElement); // Unregister views and data-binding on container element and content\n```\n\nor equivalently:\n\n```js\n$(selectorOrElement).unlink(); // Unregister views and data-binding on container element and content\n```\n\nCalling `$.unlink()` without arguments will remove views and data-bindings from all HTML content:\n```js\n$.unlink(); // Unregister all views and data-binding\n```"
      },
      {
        "_type": "para",
        "title": "Scenarios for calling $.unlink()",
        "text": "In many scenarios, JsViews will automatically remove views and handlers when appropriate, so specific use of `$.unlink()` is rarely necessary.\n\nIn fact, the APIs for [data-linking a template](#jsvlinktmpl):\n\n- [myTmpl.link(container, data, helpers)](#jsvtmpllink)\n- [$.link.myTmpl(container, data, helpers)](#jsv.d.link)\n\nwill generally:\n\n- render the template as new HTML content within the container element\n- register a corresponding [view hierarchy](#views)\n- attach appropriate data-binding event handlers on the new content\n\nIf the new HTML content is later removed from the DOM, JsViews will automatically unregister those views and handlers.\n\nSimilarly, calling the `myTmpl.link(...)` or `$.link.myTmpl(...)` a second time will automatically unregister the previous views and handlers before establishing new ones.\n\nHowever, the [top-level data-linking](#toplink) APIs:\n\n- [$.link(true, targetElem, data, helpers)](#jsv.toplink-true)\n- [$.link(expression, targetElem, data, helpers)](#jsv.toplink-expr)\n\nwill, if called multiple times, add multiple data-bindings to the same target element. In this scenario, calling `$.unlink(targetElem)` can be useful for removing previous bindings..."
      }
    ]
  },
  "$view": {
    "title": "The view hierarchy: getting from the UI back to the data",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Each instance of a rendered template or a template block tag is associated with a JsViews *\"view\"* object.\n\nOne of the features provided by JsViews data-linking (when you use the JsViews [`.link()`](#jsvlinktmpl) method rather than JsRender's [`.render()`](#rendertmpl) method) is the [`$.view(elem)`](#$view) method. This method provides a *reverse mapping* and lets you get from a rendered DOM element back to the corresponding view object in the view hierarchy. From the view you can get to the underlying data, the index, etc.\n\nSo in effect in JsViews, *the mapping from the view hierarchy to the UI becomes a two-way mapping...*"
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsv.d.view",
            "label": "Using $.view() to get from the rendered UI back to the data"
          },
          {
            "_type": "topic",
            "hash": "views",
            "label": "View hierarchy"
          }
        ]
      },
      {
        "_type": "para",
        "title": "Technical note on how JsViews establishes two-way data binding:",
        "text": "JsViews data-linking means that observable changes to the bound data automatically trigger dynamic updates to the rendered HTML.\n\nSuppose for example we have this template:\n\n```jsr\n<ul>\n  {^{for people}}\n    <li><input data-link=\"name\"/> Name: {^{:name}}</li>\n  {{/for}}\n</ul>\n```\n\nIf `name` changes observably, then the name value in both the `<input/>` and the text content (*Name: XXX*) will update to the new value. Similarly, adding or removing a person item from the people array will cause an `<li>` element to be added or removed.\n\nTo achieve this, JsViews `link()` method includes meta-data tokens in the rendered HTML, which it then uses as locators to ensure that content is updated at the correct places in the HTML.\n\nThe meta-data does not affect visual rendering in any way, and consists essentially of `data-jsv` attributes on some HTML elements, as well as some inserted script tags of type: `jsv...` when locators are needed within text content.\n\nIn the case of the above template, the HTML markup will be similar to the following:\n\n```jsr\n<ul>\n  <li data-jsv=\"...\">\n    <input data-link=\"name\"> Name: <script type=\"jsv...\"></script>Jo Blow<script type=\"jsv...\"></script>\n  </li>\n</ul>\n```",
        "anchor": "metadata"
      }
    ]
  },
  "jsv.d.view": {
    "title": "Using $.view() to get from the rendered UI back to the data",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "var view = $.view(elem);",
        "text": "Each instance of a rendered template or a template block tag is associated with a JsViews *\"[view](#jsvviewobject)\"* object.\n\nViews provide information on how the underlying data objects map to the rendered UI.\n\n**From UI back to data:**\n\nUse `$.view(elemOrSelector)` to get from a DOM element to the corresponding `view` object (the *'containing'* `view`) for that part of the rendered content.\n\nFrom the `view` you can get to the underlying `data`, the `index`, etc."
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
        "text": "If you already have a jQuery object `$(elementOrSelector)`, then it can be convenient to use the following alternative syntax:\n\n```js\nvar view = $(elementOrSelector).view();\n```\n\nThis can be helpful in some scenarios, for example if you want to call another jQuery method on the same target element or selector, before getting the view. You can even chain the calls as in: `var view = $(elementOrSelector).doSomething().view();`\n",
        "anchor": "alt"
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
        "_type": "para",
        "title": "Finding the parent view of a given type",
        "text": "By passing an additional `type` parameter, you can find the nearest containing view of the specified type:\n\n```js\nvar typeView = $.view(elementOrSelector, type);\n```\n\n-- or, in the alternative syntax above:\n\n```js\nvar typeView = $(elementOrSelector).view(type);\n```\n\nThe above code steps up through the containing views for the element or selector, and returns *the first ancestor view of type `type`*.\n\n\n**Note:** The above are equivalent to [var typeView = `$.view(elementOrSelector).get(type)`](#viewobject@get).",
        "anchor": "type"
      },
      {
        "_type": "para",
        "title": "Getting inner views",
        "text": "An additional signature is available (for advanced scenarios):\n\n```js\nvar typeView = $.view(elementOrSelector, true, type);\n```\n\n-- which takes the content of the element or (or the element obtained from the selector), and steps *down* through descendant views (depth first traversal). It returns *the first descendant view*, or if the type parameter is specified, *the first descendant view of type `type`*.\n\nSimilarly, in the alternative syntax:\n\n```js\nvar typeView = $(elementOrSelector).view(true, type);\n```\n\n**Note:** The above are equivalent to [var typeView = `$.view(elementOrSelector).get(true, type)`](#viewobject@get).",
        "anchor": "innerview"
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
            "hash": "jsvctxobject",
            "label": "View context object (ctx)"
          },
          {
            "hash": "jsvtagctxobject",
            "label": "Tag context object (tagCtx)"
          },
          {
            "hash": "jsvlinkctxobject",
            "label": "Link context object (linkCtx)"
          },
          {
            "hash": "eventArgs",
            "label": "eventArgs object"
          },
          {
            "hash": "jsvglobals",
            "label": "Globals"
          }
        ]
      }
    ]
  },
  "jsvviewsobject": {
    "title": "The <em>$.views</em> object (JsViews)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The `$.views` object provides access to APIs for creating templates, tags, helpers etc.<br/><br/>\n\n\n- `$.views.templates(...)` -- available also as `$.templates(...)`\n<br/>Used for defining templates -- see: [Registering templates](#d.templates)\n- `$.views.tags(...)`\n<br/>Used for defining custom tags -- see: [Registering custom tags](#tagsapi) and [JsViews: Custom Tags - Tag Controls](#jsvtagcontrols)\n- `$.views.converters(...)`\n<br/>Used for defining converters -- see: [Registering converters](#convertersapi) and [JsViews: Helpers and converters](#jsvhelpers-converters)\n- `$.views.helpers(...)`\n<br/>Used for defining helpers -- see: [Registering helpers](#helpersapi) and [JsViews: Helpers and converters](#jsvhelpers-converters)\n- `$.views.viewModels(...)`\n<br/>Used for defining View Models -- see: [Compiled View Models](#viewmodelsapi) and  [JsViews: Compiled View Models](#jsvviewmodelsapi)\n\nIt also provides access to:<br/><br/>\n- `$.views.settings`\n<br/>Used for modifying JsViews settings and options -- see: [Settings](#jsvsettings)\n- `$.views.map(...)`\n<br/>Used for defining custom maps (advanced) \n- `$.views.jsviews`\n<br/>Provides the version number of the currently loaded JsViews or JsRender library\n\n"
      }
    ]
  },
  "jsvtemplateobject": {
    "title": "The <em>template</em> object (JsViews)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The [`$.templates()`](#d.templates) API can be used to obtain a compiled template object:\n\n```js\nvar myTmpl = $.templates(\"#personTmpl\");\n```\n\nThe compiled template object (`myTmpl`, in the example) provides a number of properties and methods, in particular:\n"
      },
      {
        "_type": "para",
        "title": "The render() method",
        "text": "```js\nvar html = myTmpl.render(person);\n```\n\nSee [Render a template against data objects or arrays](#tmplrender)"
      },
      {
        "_type": "para",
        "title": "The link() method",
        "text": "```js\nmyTmpl.link(\"#peopleList\", people);\n```\n\nSee [Render and data-link a template against data objects or arrays](#jsvtmpllink)"
      },
      {
        "_type": "para",
        "title": "The markup property",
        "text": "The declarative markup string for the template (available whether the template was registered by providing a markup string, or by a script block reference).\n\n```js\nvar test = myTmpl.markup; // \"...{^{:name}} ... <input data-link='name'/>...\"\n```"
      }
    ]
  },
  "jsvviewobject": {
    "title": "The <em>view</em> object (JsViews)",
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
        "text": "**JsViews -- programmatic access only**\n\nThe following methods are available only for programmatic access when using JsViews:\n\n- [*refresh()* method](#jsvviewobject@refresh)\n- [*contents()* method](#jsvviewobject@contents)\n- [*childTags()* method](#jsvviewobject@childtags)\n- [*nodes()* method](#jsvviewobject@nodes)\n- [*ctxPrm()* get/set method](#jsvviewobject@ctxprm)\n\n**Both JsRender and JsViews** (see [JsRender `view` object](#viewobject))\n\n*The following properties and methods are available when using either JsRender or JsViews (both for programmatic access and declaratively in templates):*\n\n- [*type* property](#viewobject@type)\n- [*data* property](#viewobject@data)\n- [*parent* property](#viewobject@parent)\n- [*index* property](#viewobject@index)\n- [*getIndex()* method](#viewobject@getindex)\n- [*get(type)* method](#viewobject@get)\n- [*content* property](#viewobject@content)\n- [*root* property](#viewobject@root)\n- [other properties and methods -- *tmpl*, *views*, *ctx*, *tag*, *getRsc()*](#jsvviewobject@other)\n"
      },
      {
        "_type": "para",
        "title": "Accessing view objects",
        "text": "The `view` object can be accessed *programmatically* in many contexts, such as:\n\n- in a click handler (with JsViews) -- using [`$.view(this)`](#jsv.d.view) to return the `view` for a given HTML element (`this`)\n- in a helper function, `~myHelper()` -- where the `this` pointer is the current view\n- in any method of a custom tag -- using `this.tagCtx.view`\n\nIn addition, properties and methods that are available to both JsRender and JsViews (second list above) can also be accessed *declaratively* in a template using *[view paths](#paths)* -- such as `#parent` for the `view.parent` property.\n<br/><br/>\n\n### Properties and methods:\n",
        "anchor": "access"
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
            "text": "*Template:* (No data-linking except `<input data-link=\"name\" />`)\n\n```jsr\n{{for people}}\n  ...\n  <input data-link=\"name\" />\n  ...\n  {{>name}} ... {{>~root.year}} ... {{>age + ~root.year - 2016}}\n  ...\n  <button class=\"refreshBtn\">Refresh</button>\n{{/for}}\n```\n\n*Code:*\n\n```js\n.on(\"click\", \"#incrBtn\", function() {\n  model.year++; // non-observable change\n})\n.on(\"click\", \".refreshBtn\", function() {\n  $.view(this).refresh(); // Refresh view, with updated values...\n});\n```"
          }
        ],
        "html": "<style>table td {padding: 5px;} table {margin-top: 6px;} #incrBtn {margin-bottom: 10px;}</style>\n\n<div id=\"peopleList\"></div>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <button id=\"incrBtn\">Increment year</button>\n  <button id=\"incrObsBtn\">Increment observably</button>\n  <button id=\"incrRefreshBtn\">Increment and refresh</button>\n  <button class=\"refreshBtn\">Refresh All</button><br/>\n  Year: {^{>year}}<br/>\n\n  <table><tbody>\n    {{for people}}\n      <tr>\n        <td><input data-link=\"name\" /></td>\n        <td>Name: {{>name}}</td>  {{!-- no data-linking --}}\n        <td>Age in {{>~root.year}}: {{>age + ~root.year - 2016}} </td>\n        <td><button class=\"refreshBtn\">Refresh</button></td>\n      </tr>\n    {{/for}}\n  </tbody></table>\n</script>",
        "code": "var tmpl = $.templates(\"#peopleTmpl\");\n\nvar model = {\n  year: 2016,\n  people: [{name: \"Adriana\", age: 4}, {name: \"Robert\", age: 34}]\n};\n\ntmpl.link(\"#peopleList\", model)\n  .on(\"click\", \"#incrBtn\", function() {\n    model.year++; // non-observable change\n  })\n  .on(\"click\", \"#incrObsBtn\", function() {\n    $.observable(model).setProperty(\"year\", model.year + 1);\n  })\n  .on(\"click\", \"#incrRefreshBtn\", function() {\n    model.year++; // non-observable change\n    $.view(this).refresh();\n  })\n  .on(\"click\", \".refreshBtn\", function() {\n    $.view(this).refresh();\n  });",
        "height": "160",
        "title": "view.refresh()"
      },
      {
        "_type": "para",
        "title": "The contents() method",
        "text": "***view.contents(...)***: returns a jQuery object of view content nodes -- optionally filtered by a jQuery selector.\n\n```js\nvar jqMyClassElem = view.contents(true, \".myClass\");\n// jQuery object for element with 'myClass' at any depth within view\n```",
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
                "description": "If true, search both children and descendants, (not including text nodes). Otherwise search top-level nodes only (including text nodes)."
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
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "*Note:* The `selector` argument can be jQuery selector string, or alternatively, an HTML Element, or a jQuery object"
              }
            ],
            "example": "var jqContents = view.contents(true, \".toRed\");\njqContents.css(\"color\", \"red\");",
            "description": "Get a jQuery object for the contents of the view: child and descendant nodes (not including text nodes), optionally filtered by the selector"
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
        "title": "view.contents()",
        "height": "160"
      },
      {
        "_type": "para",
        "title": "The childTags() method",
        "text": "***view.childTags(...)***: returns an array of custom tag instances within the view -- optionally filtered by tag name.\n\n```js\nvar mytagsArray = view.childTags(true, \"mytag\"); // {{mytag}} instances within view (at any depth)\n```\n",
        "anchor": "childtags"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "view.childTags(...)",
        "name": "childTags",
        "object": "view",
        "method": true,
        "returns": "Tag array",
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
            "example": "var sliders = view.childTags(\"slider\");\nsliders[0].updateValue(25);",
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
            "example": "var sliders = view.childTags(true, \"slider\");\nsliders[0].updateValue(25);",
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
        "text": "Note that `view.childTags()` looks only for custom tags. (In fact it searches for tags which do not have the `flow` property set to `true`. All built-in tags such as `{{for}}` and `{{if}}` have the setting `flow: true`, so are ignored by `childTags()`. However even 'flow tags' will be returned if searched for by name, as in: `view.childTags(\"if\")`.)\n\nThe following sample looks for `{{textbox}}` tags (in the case `data-link=\"{textbox ...}\"`) and calls a method on each."
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
        "_type": "para",
        "title": "The ctxPrm() get/set method:",
        "text": "***view.ctxPrm(name)***: returns the value of the named contextual parameter or helper (at the context of the view).\n\n```js\nvar value = view.ctxPrm(\"color\");\n// Get value of contextual parameter (or helper) \"color\"\n```\n\n***view.ctxPrm(name, newValue)***: observably modifies the value of the named contextual parameter or helper.\n\n```js\nview.ctxPrm(\"color\", \"green\");\n// Set value of contextual parameter (or helper) \"color\" to \"green\"\n```\n\nAvailable also as [`tag.ctxPrm()`](#jsvtagobject@ctxprm).\n\nSee *[Accessing contextual parameters and helpers](#tagsapi@ctxparams)*.\n\n*__Note:__* to register a listener for observable changes to a contextual parameter, such as `\"~color\"`, defined on a view, use:\n\n```js\n$.observe(view, \"~color\", myListener);\n```\n\n(Similarly on a tag, as in the [*linkedCtxParam* sample](#tagoptions@linkedctxparam) -- with the listener for `\"~mde\"`.)",
        "anchor": "ctxprm"
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
            "text": "Template:\n\n```jsr\n<span data-link=\"css-color{:~color}\">TEXT</span>\n<input data-link=\"~color\" />\n({^{>~color}})\n```\n\nCode:\n\n```js\nset: function(newColor, ev, eventArgs) {\n  eventArgs.view.ctxPrm(\"color\", newColor); // Set contextual parameter: \"color\" to newColor \n},\nget: function(ev, eventArgs) {\n  alert(eventArgs.view.ctxPrm(\"color\")); // Get current contextual parameter \"color\"\n}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{on ~set \"green\"}}set ~color to green{{/on}}\n  {^{on ~set \"red\"}}set ~color to red{{/on}}\n  {^{on ~get}}get ~color{{/on}}\n  <span data-link=\"css-color{:~color} {:~color}\"></span>\n  <input data-link=\"~color\" />\n  ({^{>~color}})\n</script>\n",
        "code": "var tmpl = $.templates(\"#tmpl\"),\n\n  model = {},\n\n  helpers = {\n    color: \"blue\",\n    set: function(newColor, ev, eventArgs) {\n      eventArgs.view.ctxPrm(\"color\", newColor); // Set contextual parameter: \"color\" to newColor\n    },\n    get: function(ev, eventArgs) {\n      alert(eventArgs.view.ctxPrm(\"color\")); // Get current contextual parameter \"color\"\n    }\n  };\n\ntmpl.link(\"#result\", model, helpers);",
        "height": "50"
      },
      {
        "_type": "para",
        "title": "",
        "text": "`view.ctxPrm()` can be used to modify any contextual parameter or helper (`~foo`). In the above example, `~color` is initialized as [helper](#helpers) passed in the with the `link()` call.\n\nIn the case of a [contextual parameter]() defined by a path expression, such as `~color=clr`, using the setter `view.ctxPrm(\"color\", \"newValue\")` will update not only the contextual parameter but also the data value `clr` that it is bound to. (The path expression `~color=expr` constitutes a two-way binding).\n\nThis is illustrated by the following sample:"
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
            "text": "```js\nmodel = {clr: \"orange\", person: {name: \"Jo\"}};\n```\n\n```jsr\n...\n<input data-link=\"clr\" />\n\n...\n{{for person ~color=clr}}\n  ...\n  {^{on ~set \"red\"}}set ~color to red{{/on}}...\n  <input data-link=\"~color\" />...\n{{/for}}\n```"
          }
        ],
        "html": "<style>div {margin: 10px 0;}</style>\n\n<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <label>clr:</label>\n  <div>\n    <span data-link=\"css-color{:clr} {:clr}\"></span>\n    <input data-link=\"clr\" />\n  </div>\n\n  {{for person ~color=clr}}\n    <label>~color:</label>\n    <div>\n      {^{on ~set \"green\"}}set ~color to green{{/on}}\n      {^{on ~set \"red\"}}set ~color to red{{/on}}\n      {^{on ~get}}get ~color{{/on}}\n      <span data-link=\"css-color{:~color} {:~color}\"></span>\n      <input data-link=\"~color\" />\n    </div>\n  {{/for}}\n</script>\n",
        "code": "var tmpl = $.templates(\"#tmpl\"),\n\n  model = {clr: \"orange\", person: {name: \"Jo\"}},\n\n  helpers = {\n    set: function(newColor, ev, eventArgs) {\n      eventArgs.view.ctxPrm(\"color\", newColor); // Set contextual parameter: \"color\" to newColor\n    },\n    get: function(ev, eventArgs) {\n      alert(eventArgs.view.ctxPrm(\"color\")); // Get current contextual parameter \"color\"\n    }\n  };\n\ntmpl.link(\"#result\", model, helpers);",
        "height": "140"
      },
      {
        "_type": "para",
        "title": "Other view object properties and methods:",
        "text": "Additional properties of the `view` object are used by JsRender and JsViews for processing templates:\n\n- *tmpl*: the template used to render the view\n- *views*: the child views in the view hierarchy\n- *ctx*: object (hash) with the named contextual helpers/template parameters for this view\n- *tag*: the `\"sometag\"` view rendered by a tag `{{sometag ...}}`, has a `view.tag` property -- the instance of the `sometag` tag object\n- *linked*: boolean, value `true` in the case of data-linked views (from [`tmpl.link()`](#jsvlinktmpl) rather than [`tmpl.render()`](#rendertmpl))\n- *getRsc(namedCollection, itemName)*: returns a named resource (*converter* function, compiled *template* object, compiled *tag*, *helper* or *viewModel*), as available contextually in the scope of the view (i.e. global, or local as a template resource from one of the parent templates)<br/><br/>The `namedCollection` parameter can be `\"templates\"`, `\"converters\"`, `\"tags\"`, `\"helpers\"` or  `\"viewModels\"`). For example:\n  ```js\n  var upperCvtFunction = view.getRsc(\"converters\", \"upper\");\n  ```",
        "anchor": "other"
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
    "title": "The <em>tag</em> object (JsViews)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "<b>Tag object</b> properties and event handlers provided as tag options",
        "text": "The following tag properties and event handlers can be specified as tag options when registering a custom tag:\n\n*Tag properties specified as tag options (both in JsRender and JsViews -- see [`$.views.tags()`](#tagsapi))*:\n\n- [`baseTag`](#tagsapi@basetag)\n- [`flow`](#tagsapi@flow)\n- [`template`](#tagsapi@template)\n- [`bindTo`](#tagsapi@bindto)\n- [`ctx`](#jsvtagobject@ctx)\n- [`contentCtx`](#tagsapi@contentctx)\n- [`argDefault`](#tagsapi@argdefault)\n\n*Tag properties specified as tag options (only in JsViews -- see [tag control options](#tagoptions))*:\n\n- [`dataBoundOnly`](#tagoptions@databoundonly)\n- [`boundProps`](#tagoptions@boundprops)\n- [`depends`](#tagoptions@depends)\n- [`attr`](#tagoptions@attr)\n- [`setSize`](#tagoptions@setsize)\n- [`height`](#tagoptions@height)\n- [`width`](#tagoptions@width)\n- [`className`](#tagoptions@classname)\n- [`linkedElement`](#tagoptions@linkedelement)\n- [`mainElement`](#tagoptions@mainelement)\n- [`displayElement`](#tagoptions@displayelement)\n- [`linkedCtxParam`](#tagoptions@linkedctxparam)\n- [`dataMap`](#tagoptions@datamap)\n- [`lateRender`](#tagoptions@laterender)\n- [`trigger`](#tagoptions@trigger)\n\n*Event handlers specified as tag options (both in JsRender and JsViews -- see [`$.views.tags()`](#tagsapi))*:\n\n- [`init()`](#tagsapi@init)\n- [`render()`](#tagsapi@render)\n- [`convert`](#tagsapi@convert)\n\n*Event handlers specified as tag options (only in JsViews -- see [tag control options](#tagoptions))*:\n\n- [`onBind()`](#tagoptions@onbind)\n- [`onAfterLink()`](#tagoptions@onafterlink)\n- [`onUpdate()`](#tagoptions@onupdate)\n- [`onDispose()`](#tagoptions@ondispose)\n- [`convertBack`](#tagoptions@convertback)\n- [`onUnbind()`](#tagoptions@onunbind)\n- [`onBeforeUpdateVal()`](#tagoptions@onbeforeupdateval)\n- [`onBeforeChange()`](#tagoptions@onbeforechange)\n- [`onAfterChange()`](#tagoptions@onafterchange)\n- [`onArrayChange()`](#tagoptions@onarraychange)\n- [`setValue()`](#tagoptions@setvalue)\n- [`domChange()`](#tagoptions@domchange)"
      },
      {
        "_type": "para",
        "title": "Additional <b>tag object</b> properties and methods",
        "text": "In addition to the above properties and handlers set as tag options, the tag object has the following properties and methods:\n\n*Tag properties (both in JsRender and JsViews)*\n\n- [parent](#tagobject@parent)\n- [parents](#tagobject@parents)\n- [tagCtx](#jsvtagobject@tagctx)\n- [tagCtxs](#tagobject@tagctxs)\n- [tagName](#tagobject@tagname)\n- [rendering](#tagobject@rendering)\n\n*Tag properties (only in JsViews)*\n\n- [linkCtx](#jsvtagobject@linkctx)\n- [parentElem](#jsvtagobject@parentelem)\n- [linkedElems and linkedElem](#jsvtagobject@linkedelem)\n- [mainElem](#jsvtagobject@mainelem)\n- [displayElem](#jsvtagobject@displayelem)\n- [inline](#jsvtagobject@inline)\n\n*Tag methods (both in JsRender and JsViews)*\n\n- [ctxPrm()](#jsvtagobject@ctxprm)\n- [cvtArgs()](#tagobject@cvtargs)\n- [bndArgs()](#tagobject@bndargs)\n- [base()](#tagobject@base)\n- [baseApply()](#tagobject@baseapply)\n\n*Tag methods (only in JsViews)*\n\n- [refresh()](#jsvtagobject@refresh)\n- [contents()](#jsvtagobject@contents)\n- [childTags()](#jsvtagobject@childtags)\n- [nodes()](#jsvtagobject@nodes)\n- [setValue()](#jsvtagobject@setvalue)\n- [setValues()](#jsvtagobject@setvalues)\n- [updateValue()](#jsvtagobject@updatevalue)\n- [updateValues()](#jsvtagobject@updatevalues)"
      },
      {
        "_type": "para",
        "title": "Accessing tag objects",
        "text": "The `tag` object can be accessed *programmatically*, for example in event handlers of custom tags, using the `this` pointer.\n\nThe current tag can also be accessed *declaratively* (in a custom tag template,  or in wrapped block content) using `~tag`, as in:\n\n```jsr\n{{:~tag.parent.tagName}}`\n```\n\nIn addition, `tag.tagCtx` can be accessed declaratively using `~tagCtx`, as in:\n\n```jsr\n{{:~tagCtx.props.mode}}`\n```",
        "anchor": "access"
      },
      {
        "_type": "para",
        "title": "<b>Tag properties</b> (JsRender and JsViews):",
        "text": "(See also the JsRender [tag object](#tagobject@propsmethods) topic.)",
        "anchor": "jsrproperties"
      },
      {
        "_type": "para",
        "title": "The tagCtx property",
        "text": "***tag.tagCtx**: a [tag context](#jsvtagctxobject) object* providing access to instance information such as arguments/properties/view etc., as in:\n\n```js\nvar propA = tag.tagCtx.props.propA;\n```\n\nIt is also provided as an argument in tag events such as [*onBind(**tagCtx**, linkCtx, ctx)*](#tagoptions@onbind).\n\nAccessed declaratively (in a tag template or wrapped content) as `~tagCtx`.\n\nSee [*Tag Context*](#tagsapi@context)",
        "anchor": "tagctx"
      },
      {
        "_type": "para",
        "title": "The  ctx property",
        "text": "***tag.ctx**: a [view context](jsvctxobject) object (hash) providing access to the [contextual parameters](#contextualparams)*, as in.\n\n```js\nvar rootData = tag.tagCtx.root;\n```\n\nIt is also provided as an argument in tag events such as [*onBind(tagCtx, linkCtx, **ctx**)*](#tagoptions@onbind).\n\nAccessed declaratively as `~tag.ctx`.\n\nSee [*Tag Context*](#tagsapi@context)\n\nSee also:\n- [`tag.ctxPrm()`](#jsvtagobject@ctxprm), below\n- The [`ctx` tag option](#tagsapi@ctx) (for specifying default context on a custom tag)",
        "anchor": "ctx"
      },
      {
        "_type": "para",
        "title": "<b>Tag properties</b> (JsViews only):",
        "text": " ",
        "anchor": "properties"
      },
      {
        "_type": "para",
        "title": "The linkCtx property",
        "text": "For any data-linked tag, such as `{^{mytag/}}` (*inline* [data-linked tag](#linked-tag-syntax)) , or `<div data-link=\"{mytag}\"></div>`([tag binding](#link-tags) on a [data-linked element](#linked-elem-syntax)), ***tag.linkCtx*** is a [link context](#jsvlinkctxobject) object providing contextual data-link information, as in:\n\n```js\nvar isTopLevelDataLinked = tag.linkCtx.type === \"top\";\n```\n\nIt is also provided as an argument in tag events such as [*onBind(tagCtx, **linkCtx**, ctx)*`](#tagoptions@onbind).",
        "anchor": "linkctx"
      },
      {
        "_type": "para",
        "title": "The parentElem property",
        "text": "For a [data-linked tag](#linked-tag-syntax), such as `{^{mytag/}}`, ***tag.parentElem*** is the parent (containing) HTML element.\n\nFor a [data-linked element](#linked-elem-syntax) such as `<div data-link=\"{mytag}\"></div>` ([tag binding](#link-tags)), whether in a template or with [top-level data-linking](#toplink), ***tag.parentElem*** is the data-linked element (the `<div>` in this case).",
        "anchor": "parentelem"
      },
      {
        "_type": "para",
        "title": "The linkedElems and linkedElem properties",
        "text": "The ***tag.linkedElems*** and ***tag.linkedElem*** properties are associated with the [`linkedElement` option](#tagoptions@linkedelement). (See the [*linkedElement* design pattern topic](#bindingpatterns@linkedelem).)\n\nIf the `linkedElement` option is used to establish two-way data binding between an element (or elements) in the tag, and the [`bindTo`](#tagoptions@bindto) tag arguments or properties, then after data-linking (for example, in the [`onBind`](#tagoptions@onbind) event handler of the tag) the `tag.linkedElems` property will contain *an array of jQuery objects for those data-linked elements*. And the `tag.linkedElem` property will contain *a jQuery object for the first of those elements*.  \n\nConversely, if `linkedElement` is not set, then in the `onBind` handler the `tag.linkedElems` properties can be ***set** to an array of jQuery objects for chosen tag elements*. (Or, if `bindTo` specifies only one binding, then `tag.linkedElem` properties can be ***set** to a single jQuery object for a chosen tag element*.)\n\nThis provides a programmatic approach to configuring the choice of data-linked elements.\n\nFor example in the [`{{namebox}}`](#bindingpatterns@namebox-linkedelem) sample\n\n```jsr\n{^{namebox first last caption=~label .../}}\n```\n\nThe declarative approach:\n\n```js\nlinkedElement: [\".firstnm\", \".lastnm\", \".cptn\"]\n```\n\ncould be replaced by a programmatic approach: \n\n```js\nnamebox: {\n  ...\n  template: '...<span class=\"cptn\"></span>: <input class=\"firstnm\"/> <input class=\"lastnm\"/>...',\n  bindTo: [0, 1, \"caption\"],\n  onBind: function() {\n    this.linkedElems = [\n      this.contents(true, \".firstnm\"); // Set linkedElem for argument 0 (first)\n      this.contents(true, \".lastnm\");  // Set linkedElem for argument 1 (last)\n      this.contents(true, \".cptn\");    // Set linkedElem for property \"caption\" (caption=~label)\n    ];\n  },\n  ...\n}\n```\n\n*Note:*\n- For tags with `{{else}}` blocks see also [`tagCtx.linkedElems`](#jsvtagctxobject@properties)\n- Establishing of two-way binding on `linkedElems` is done after the [`onBind`](#tagoptions@onbind) event, and before the [`onAfterLink`](#tagoptions@onafterlink) event",
        "anchor": "linkedelem"
      },
      {
        "_type": "para",
        "title": "The mainElem property",
        "text": "The ***tag.mainElem*** property is associated with the [`mainElement` option](#tagoptions@mainelement).\n\nIf the `mainElement` option is used to establish an element in the tag as *main element*, then after data-linking (for example, in the [`onBind`](#tagoptions@onbind) event handler of the tag) the `tag.mainElem` property will contain a jQuery object for the *main element*.  \n\nConversely, if `mainElement` is not set, then in the `onBind` handler the `tag.mainElem` property can be ***set** to a jQuery objects for a chosen tag element*.\n\nThis provides a programmatic approach to configuring the choice of *main element*.\n\n*Note:*\n- Setting of `width`, `height` or `id` on `tag.mainElem` is done after the [`onBind`](#tagoptions@onbind) event, and before the [`onAfterLink`](#tagoptions@onafterlink) event\n- For tags with `{{else}}` blocks see also [`tagCtx.mainElem`](#jsvtagctxobject@properties)",
        "anchor": "mainelem"
      },
      {
        "_type": "para",
        "title": "The displayElem property",
        "text": "The ***tag.displayElem*** property is associated with the [`displayElement` option](#tagoptions@displayelement).\n\nIf the `displayElement` option is used to establish an element in the tag as *display element*, then after data-linking (for example, in the [`onBind`](#tagoptions@onbind) event handler of the tag) the `tag.displayElem` property will contain a jQuery object for the *display element*.  \n\nConversely, if `displayElement` is not set, then in the `onBind` handler the `tag.displayElem` property can be ***set** to a jQuery objects for a chosen tag element*.\n\nThis provides a programmatic approach to configuring the choice of *display element*.\n\n*Note:*\n- Setting of `class` on the `tag.displayElem` is done after the [`onBind`](#tagoptions@onbind) event, and before the [`onAfterLink`](#tagoptions@onafterlink) event\n- For tags with `{{else}}` blocks see also [`tagCtx.displayElem`](#jsvtagctxobject@properties)\n",
        "anchor": "displayelem"
      },
      {
        "_type": "para",
        "title": "The inline property",
        "text": "If ***tag.inline*** is `true`, then this is a [data-linked tag](#linked-tag-syntax) such as `{^{mytag/}}` (also referred to as an ***inline tag***).\n\nIf ***tag.inline*** is `false`, then this is a [tag binding](#link-tags) on a [data-linked element](#linked-elem-syntax) such as `<div data-link=\"{mytag}\"></div>` (whether in a template or with [top-level data-linking](#toplink)).\n\nSee also [tag.linkCtx.type](#jsvlinkctxobject)",
        "anchor": "inline"
      },
      {
        "_type": "para",
        "title": "<b>Tag methods</b> (JsRender and JsViews):",
        "text": "(See also the JsRender [tag object](#tagobject@methods) topic.)",
        "anchor": "jsrmethods"
      },
      {
        "_type": "para",
        "title": "The ctxPrm() get/set method",
        "text": "***tag.ctxPrm(name)***: returns the value of the named contextual parameter or helper (at the context of the tag instance).\n\n```js\nvar value = tag.ctxPrm(\"color\");\n// Get value of contextual parameter (or helper) \"color\"\n```\n\n***tag.ctxPrm(name, newValue)***: observably modifies the value of the named contextual parameter or helper.\n\n```js\ntag.ctxPrm(\"color\", \"green\");\n// Set value of contextual parameter (or helper) \"color\" to \"green\"\n```\n\nAvailable also as [`view.ctxPrm()`](#jsvviewobject@ctxprm).\n\nSee *[Accessing contextual parameters and helpers](#tagsapi@ctxparams)*.\n\n*__Note:__* to register a listener for observable changes to a contextual parameter, such as `\"~color\"`, defined on a tag, use:\n\n```js\n$.observe(tag, \"~color\", myListener);\n```\n\nSee for example the [*linkedCtxParam* sample](#tagoptions@linkedctxparam) -- with the listener for `\"~mde\"`.",
        "anchor": "ctxprm"
      },
      {
        "_type": "para",
        "title": "<b>Tag methods</b> (JsViews only):",
        "text": " ",
        "anchor": "methods"
      },
      {
        "_type": "para",
        "title": "The refresh() method",
        "text": "The ***tag.refresh()*** method refreshes (re-renders and data-links) the tag control.\n\nFor example, in the [`{{spinblock}}` sample](#bindingpatterns@spinblock):\n\n- the `render()` method returns content which depends on the value of the `tag.pane` property\n- the custom tag method `cycle()` changes the value of `tag.pane`, then calls `tag.refresh()` to refresh the rendering and data-binding using the new value of `tag.pane`: \n \n\n```js\n$.views.tags(\"spinblock\", {\n  render: function() {\n    ...\n    if (this.tagCtx.index === this.pane) { // This is the selected pane.\n      ... + this.tagCtx.render(); // Render block content\n    }\n    ...\n  },\n  cycle: function() { // Method to cycle/increment selected pane\n    this.pane = (this.pane+1) % this.tagCtxs.length;\n    this.refresh();   // Refresh the rendering and data-binding, with the new value of this.pane\n  },\n  ...\n```",
        "anchor": "refresh"
      },
      {
        "_type": "para",
        "title": "The contents() method",
        "text": "Returns a jQuery object of tag content nodes -- optionally filtered by a jQuery selector:\n\n- ***tag.contents()*** (without arguments) returns the top-level contents of the tag (top-level child nodes, including text nodes):\n  ```js\n  var jqContents = tag.contents();\n  ```\n- ***tag.contents(selector)*** (with a selector argument) returns top-level content elements of the tag, filtered by the selector:\n  ```js\n  var jqSelectedElem = tag.contents(\".selected\");\n  ```\n- ***tag.contents(deep, selector)*** (with `deep` flag: `true`, and selector argument) returns content elements of the tag (any depth) filtered by the selector:\n  ```js\n  var jqContents = tag.contents(true, \".selected\");\n  ```\n\nFor example, in the [`{{spinblock}}` sample](#bindingpatterns@spinblock):\n\n```js\n$.views.tags(\"spinblock\", {\n  ...\n  onBind: function() {\n    // Find the switcher <div> element, and attach the tag.cycle() method to it, as 'click' handler\n    this.contents(true, '.switcher').on(\"click\", $.proxy(this.cycle, this));\n  },\n  ...\n```\n\nSee the similar API [`view.contents(...)`](#jsvviewobject@contents)\n",
        "anchor": "contents"
      },
      {
        "_type": "para",
        "title": "The childTags() method",
        "text": "Returns an array of custom tag instances, within the content of the tag -- optionally filtered by tag name:\n\n- ***tag.childTags()*** returns the top-level custom tag instances within the tag content:\n  ```js\n  var childTagsArray = tag.childTags();\n  ```\n- ***tag.childTags(tagName)*** returns instances of `{{tagName}}` within the tag content (not nested in other custom tags):\n  ```js\n  var slidersArray = tag.childTags(\"slider\");\n  ```\n- ***tag.childTags(deep, tagName)*** (with `deep` flag: `true`) returns instances of `{{tagName}}` within the tag content (including those nested in other custom tags):\n  ```js\n  var slidersArray = tag.childTags(true, \"slider\");\n  ```\n\nFor example, in the [`{{picker}}` sample](#hierarchypatterns@picker):\n\n```js\n$.views.tags(\"picker\", {\n  ...\n  onBind: function() {\n    ...\n    tag.areaslider = tag.childTags(\"areaslider\")[0];\n  },\n  ...\n```\n\nSee the similar API [`view.childTags(...)`](#jsvviewobject@childtags)\n",
        "anchor": "childtags"
      },
      {
        "_type": "para",
        "title": "The nodes() method",
        "text": "The ***tag.nodes()*** method returns an array of top-level nodes within the tag content (including text nodes):\n\n```js\nvar nodesArray = tag.nodes();\n```\n\nSee the similar API [`view.nodes(...)`](#jsvviewobject@nodes)\n",
        "anchor": "nodes"
      },
      {
        "_type": "para",
        "title": "The setValue() method",
        "text": "If a custom tag control uses [`linked elements`]() then calling `tag.setValue(newValue, index)` will set the value of the corresponding linked element. In addition, if the tag control has a [`setValue()`](#tagoptions@setvalue) event handler, then that event handler will be called.\n\nFor block tags, with multiple `{{else}}` blocks, the [`tagCtx.setValues()`](#jsvtagctxobject@methods) can be used (for the `tagCtx` corresponding to the `{{else}}` block) -- or, alternatively a third parameter can be passed specifying the index of the `{{else}}` block whose linked element is to be updated:\n\n```js\ntag.setValue(newValue, index, elseBlock);\n```\n\n*Note:* `index` and `elseBlock` each default to `0` -- so `tag.setValue(myval)` is equivalent to `tag.setValue(myval, 0, 0)`.\n\nSee the [Programmatic two-way data-binding](#bindingpatterns@setvalue-updatevalue) design patterns topic for additional discussion and examples.\n\nSee also [`setValues()`](#jsvtagobject@setvalues) below.",
        "anchor": "setvalue"
      },
      {
        "_type": "para",
        "title": "The setValues() method",
        "text": "If a custom tag control uses [`linked elements`]() then calling `tag.setValues(newVal1, newVal2, ...)` will set the values of the linked elements. In addition, if the tag control has a [`setValue()`](#tagoptions@setvalue) event handler, then that event handler will be called prior to updating each targeted linked element.\n\n```js\ntag.setValues(newValueFor1stElem, newValueFor2ndElem, ...);\n```\n\nFor block tags with multiple `{{else}}` blocks, `setValues()` will set values on the linked elements on the initial tag (the first block). To set values on the linked elements in additional `{{else}}` blocks, use either [`tagCtx.setValues()`](#jsvtagctxobject@methods) or [`tag.setValue()`](#jsvtagobject@setvalue).\n\nSee the [Multiple two-way binding](#bindingpatterns@multiple-twoway) design patterns topic for additional discussion and examples.",
        "anchor": "setvalues"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See the [Programmatic two-way data-binding](#bindingpatterns@setvalue-updatevalue) design patterns topic for additional discussion and examples.\n\nSee also [`updateValues()`](#jsvtagobject@updatevalues) below."
      },
      {
        "_type": "para",
        "title": "The updateValue() method",
        "text": "Calling `tag.updateValue(newValue, index)` will observably update the bound argument or property corresponding to the specified `index` of the [`bindTo`](#tagoptions@bindto) array.\n\nFor block tags, with multiple `{{else}}` blocks, a third parameter, `elseBlock`, can be passed specifying the index of the `{{else}}` block whose bound argument or property is being updated:\n\n```js\ntag.updateValue(newValue, index, elseBlock);\n```\n\n*Note:* `index` and `elseBlock` each default to `0` -- so `tag.updateValue(myval)` is equivalent to `tag.updateValue(myval, 0, 0)`.\n\nThe call will use two-way data-binding to update the underlying data specified in the data-link expression.\n\nSee the [Programmatic two-way data-binding](#bindingpatterns@setvalue-updatevalue) design patterns topic for additional discussion and examples.\n\nSee also [`updateValues()`](#jsvtagobject@updatevalues) below.\n\nThe [*tag.updateValue with delayed events*](#jsvtagobject@updatevalue-delay) sample below also gives examples of the `updateValue()` syntax...",
        "anchor": "updatevalue"
      },
      {
        "_type": "para",
        "title": "The updateValues() method",
        "text": "Calling `tag.updateValues(...)` will observably update the (one or more) bound arguments or properties specified in the [`bindTo`](#tagoptions@bindto) option array:\n\n```js\ntag.updateValues(newValue1, newValue2, ...);\n```\n\nThe call will use two-way data-binding to update the underlying data specified in the data-link expressions.\n\nFor block tags with multiple `{{else}}` blocks, an additional `elseBlock` parameter can be passed specifying the index of the `{{else}}` block whose bound arguments or properties are being updated: \n\n```js\ntag.updateValue(newValue1, newValue2, ..., elseBlock);\n```\n\nFor example, if the `bindTo` array is of length 2, `tag.updateValue(val1, val2, 1)` will update the two `bindTo` targets on the first `{{else}}` block.\n\n*Note:*\n- `elseBlock` defaults to `0` -- so if `bindTo` is length 2, `tag.updateValues(val1, val2)` is equivalent to `tag.updateValues(val1, val2, 0)`.\n- The `bindTo` option defaults to `[0]`, so if there is no `bindTo` setting, `tag.updateValues(val, i)` will observably update the first argument data path on `{{else}}` block `i`, and will be equivalent to `tag.updateValue(val, 0, i)`.\n\nSee the [Multiple two-way binding](#bindingpatterns@multiple-twoway) design patterns topic for additional discussion and examples.\n\nSee also the [*tag.updateValues with delayed events*](#jsvtagobject@updatevalues-delay) sample below.",
        "anchor": "updatevalues"
      },
      {
        "_type": "para",
        "title": "Advanced scenario: async or batched change events, with tag.updateValue() or tag.updateValues()",
        "text": "In some scenarios it is desirable for the observable changes made to [`bindTo`](#tagoptions@bindto) targets by [`tag.updateValue()`](#jsvtagobject@updatevalue) or [`tag.updateValues()`](#jsvtagobject@updatevalues) calls to use [asynchronous or batched observable change events](#delay). \n\nFor *__asynchronous events__*, simply pass in an additional parameter, `true`, to `updateValue()` or `updateValues()`.\n\nSee for example the [`{{slider}}`](#bindingpatterns@setvalue-updatevalue) control (also [here](#samples/tag-controls/slider)), which uses the code:\n\n```js\n// Call updateValue() to change the external data-linked data to the new value x\nthis.updateValue(x, true); // Async update\n```\n\nor the [`{{areaslider}}`](#bindingpatterns@multiple-twoway) control (also [here](#samples/tag-controls/areaslider)), which uses the code:\n\n```js\n// Call updateValues() to change the external data-linked data to the new values (x, y)\nthis.updateValues(x, y, true); // Async update\n```\n\n(and similarly, the [`{{draggable}}`](#samples/tag-controls/jqui/draggable-droppable@jsv-draggable) control).\n\nFor *__batched events__*, instead of passing `true`, pass an array, `batched`, and then call `batch.trigger()` to trigger the delayed events.\n\nThe following two samples show the use of batched events, along with multiple `bindTo` parameters and multiple `{{else}}` blocks:",
        "anchor": "delay"
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
            "text": "```js\nvar batch = [];\n...\nthis.updateValue(\"A...\", batch); // Update bindTo target 0\nthis.updateValue(\"B...\", 1, batch); // Update bindTo target 1\n...\nthis.updateValue(\"F...\", 2, 1, batch); // Update {{else}} block bindTo target 2\n...\nbatch.trigger() // Trigger the events\n```"
          }
        ],
        "header": "<style>\nbody {font-family: sans-serif;}\ninput, button {width: 80px; margin: 5px;}\n</style>",
        "nocss": true,
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  Make updates, then trigger the events...\n  <div>\n    {^{mytag one two mode=three}}{{else four five mode=six}}{{/mytag}}\n\n    {^{on ~trigger}}trigger{{/on}}\n  </div>\n  <input data-link=\"one\" /><input data-link=\"two\" /><input data-link=\"three\" />\n  <input data-link=\"four\" /><input data-link=\"five\" /><input data-link=\"six\" />\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\nmytag: {\n  template: '<button data-link=\"{on ~tag.doUpdate ~tagCtx.index}\">update{{:~tagCtx.index}}</button>',\n\n  bindTo: [0, 1, \"mode\"],\n\n  doUpdate: function(block) {\n    this.updateValue(\"A\" + block, batch); // Update bindTo target 0\n    this.updateValue(\"B\" + block, 1, batch); // Update bindTo target 1\n    this.updateValue(\"C\" + block, 2, batch); // Update bindTo target 2\n    this.updateValue(\"D\" + block, 0, 1, batch); // Update {{else}} block bindTo target 0\n    this.updateValue(\"E\" + block, 1, 1, batch); // Update {{else}} block bindTo target 1\n    this.updateValue(\"F\" + block, 2, 1, batch); // Update {{else}} block bindTo target 2\n    alert(\"Updates have been made. Ready for triggering the events...\");\n  }\n}\n});\n\nvar batch = [],\n\nmyTmpl = $.templates(\"#myTmpl\"),\n  data = {one: \"a\", two: \"b\", three: \"c\", four: \"d\",  five: \"e\", six: \"f\"};\n\nmyTmpl.link(\"#page\", data, {trigger: \n  function() {\n    if (batch.trigger) {\n      batch.trigger(); // Trigger the events\n    } else {\n      alert(\"Make updates first, then trigger the events...\")\n    }\n  }\n});",
        "height": "96",
        "title": "tag.updateValue() with delayed events",
        "anchor": "updatevalue-delay"
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
            "text": "```js\nvar batch = [];\n...\nthis.updateValues(\"A...\", \"B...\", \"C...\", batch); // Update tag bindTo targets\nthis.updateValues(\"D...\", \"E...\", \"F...\", 1, batch); // Update {{else}} block bindTo targets\n...\nbatch.trigger(); // Trigger the events\n```\n"
          }
        ],
        "header": "<style>\nbody {font-family: sans-serif;}\ninput, button {width: 80px; margin: 5px;}\n</style>",
        "nocss": true,
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  Make updates, then trigger the events...\n  <div>\n    {^{mytag one two mode=three}}{{else four five mode=six}}{{/mytag}}\n\n    {^{on ~trigger}}trigger{{/on}}\n  </div>\n  <input data-link=\"one\" /><input data-link=\"two\" /><input data-link=\"three\" />\n  <input data-link=\"four\" /><input data-link=\"five\" /><input data-link=\"six\" />\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\nmytag: {\n  template: '<button data-link=\"{on ~tag.doUpdate ~tagCtx.index}\">update{{:~tagCtx.index}}</button>',\n\n  bindTo: [0, 1, \"mode\"],\n\n  doUpdate: function(block) {\n    this.updateValues(\"A\" + block, \"B\" + block, \"C\" + block, batch); // Update tag bindTo targets\n    this.updateValues(\"D\" + block, \"E\" + block, \"F\" + block, 1, batch); // Update {{else}} block bindTo targets\n    alert(\"Updates have been made. Ready for triggering the events...\");\n  }\n}\n});\n\nvar batch = [],\n\nmyTmpl = $.templates(\"#myTmpl\"),\n  data = {one: \"a\", two: \"b\", three: \"c\", four: \"d\",  five: \"e\", six: \"f\"};\n\nmyTmpl.link(\"#page\", data, {trigger: \n  function() {\n    if (batch.trigger) {\n      batch.trigger(); // Trigger the events\n    } else {\n      alert(\"Make updates first, then trigger events...\")\n    }\n  }\n});",
        "height": "96",
        "anchor": "updatevalues-delay",
        "title": "tag.updateValues() with delayed events"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "tagobject",
            "label": "JsRender tag object"
          }
        ]
      }
    ]
  },
  "jsvctxobject": {
    "title": "The <em>view context</em> object, <em>ctx</em> (JsViews)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Each view has a view context object: ***view.ctx***, which is a 'hash' whose properties correspond to the set of [contextual parameters](#contextualparams), `~foo` accessible from that view, within a template. (See [*Accessing contextual parameters and helpers*](#tagsapi@ctxparams).)\n\nIt also has the following built-in properties (contextual parameters):\n\n- `ctx.root`: The [root data](#contextualparams@root) (accessed from a template as `~root`)\n- `ctx.tag`: The [tag object](#tagobject) (accessed from a template as `~tag`)\n- `ctx.tagCtx`: The [tagCtx object](#tagobject@tagctx) (accessed from a template as `~tagCtx`)\n- `ctx.parentTags`: [parent tags](tagsapi@parents) (accessed from a template as `~parentTags`)\n\nFor programmatic access to contextual parameters, it may be better to use the [view.ctxPrm()](#jsvviewobject@ctxprm) or [tag.ctxPrm()](#jsvtagobject@ctxprm) API."
      }
    ]
  },
  "jsvtagctxobject": {
    "title": "The <em>tag context</em> object, <em>tagCtx</em> (JsViews)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "When a template is rendered, each tag is instantiated.\n\n```jsr\n{^{sometag argExpr prop1=propExpr ~ctxprm1=prmExpr .../}}\n```\n\nThe tag instance has an associated tag context object, `tag.tagCtx`, giving contextual information for the tag.\n\nSee [*Tag context*](#tagsapi@context)\n\nIn the case of a tag with `{{else}}` blocks it has an array of `tagCtx` objects, `tag.tagCtxs`, one for each `{{else}}` block):\n\n```jsr\n{^{sometag argExpr prop1=propExpr ~ctxprm1=prmExpr ...}}\n  ...\n{{else argExpr2 prop2=propExpr2 ~ctxprm2=prmExpr2 ...}}\n  ...\n{{/sometag}}\n```"
      },
      {
        "_type": "para",
        "title": "<b>tagCtx properties</b> (JsRender and JsViews):",
        "text": "(See also the JsRender [`tagCtx` object](#tagctxobject@properties) topic.)\n\n- ***tagCtx.props:***\n  - a hash of the values of the named properties (such as `tagCtx.props.prop1`)\n- ***tagCtx.args:***\n  - an array with argument value (such as `tagCtx.args[0]`)\n- ***tagCtx.params:***\n  - provides access to argument, property and contextual parameter expressions (such as `tagCtx.params.props.prop1`, `tagCtx.params.args[0]` or `tagCtx.params.ctx.ctxprm1`)\n- ***tagCtx.content:***\n  - for a block tag (see [wrapping block content](#tagsapi@wrapping)), the compiled template for wrapped content\n  - otherwise, for a tag with an [external template reference](#tagsyntax@tmplref), `tmpl=...`, the compiled external template (same as `tagCtx.tmpl`)\n  - otherwise, `false`\n- ***tagCtx.tmpl:***\n  - for a tag with an external template, `tmpl=...`, the compiled external template\n  - otherwise, for a block tag, the template for wrapped content (same as `tagCtx.content`)\n  - otherwise, `false`\n- ***tagCtx.index:***\n  - for `{{else}}` blocks, the index of the block (see [`tag.tagCtxs`](#tagobject@tagctxs))\n  - otherwise, `0`\n- ***tagCtx.tag:***\n  - the tag instance\n- ***tagCtx.view:***\n  - the contextual (containing) view object\n- ***tagCtx.ctx:***\n  - the [ctx](#ctxobject) (view context) object with the contextual helpers/template parameters for this tag.",
        "anchor": "jsrproperties"
      },
      {
        "_type": "para",
        "title": "<b>tagCtx properties</b> (JsViews only):",
        "text": "- ***tagCtx.linkedElems:***\n  - equivalent to [`tag.linkedElems`](#jsvtagobject@linkedelem)\n  - however, for a tag with `{{else}}` blocks such as:\n    ```jsr\n      {{mytag firstName}}...{{else lastName}}...{{/mytag}}\n    ```\n    the context is the specific `{{else}}` block -- e.g. for the example above, `tag.tagCtxs[1].linkedElems[0]` might access an `<input/>` binding to `lastName`\n- ***tagCtx.mainElem***\n  - equivalent to [`tag.mainElem`](#jsvtagobject@mainElem)\n  - however, for a tag with `{{else}}` blocks such as:\n    ```jsr\n      {{mytag id=\"a\"}}...{{else id=\"b\"}}...{{/mytag}}\n    ```\n    the context is the specific `{{else}}` block -- e.g. for the example above, `tag.tagCtxs[1].mainElem` would access an element with `id`: `\"b\"`\n- ***tagCtx.displayElem:***\n  - equivalent to [`tag.displayElem`](#jsvtagobject@displayElem)\n  - however, for a tag with `{{else}}` blocks such as:\n    ```jsr\n      {{mytag class=\"a\"}}...{{else class=\"b\"}}...{{/mytag}}\n    ```\n    the context is the specific `{{else}}` block -- e.g. for the example above, `tag.tagCtxs[1].displayElem` would access an element with `class`: `\"b\"`\n- ***tagCtx.contentView:***\n  - the view object for tag content -- whether rendered by the render method or by a template, or wrapped content...<br/>(see [*Custom tag child views*](#tagsapi@childviews))\n  - for a tag with `{{else}}` blocks the context is the specific `{{else}}` block",
        "anchor": "properties"
      },
      {
        "_type": "para",
        "title": "<b>tagCtx methods</b> (JsRender and JsViews):",
        "text": "(See also the JsRender [`tagCtx` object](#tagctxobject@methods) topic.)\n\n- ***tagCtx.render(data, context, noIteration):***\n  - if there is a tag template, renders the template\n  - otherwise for a template with an [external template reference](#tagsyntax@tmplref), `tmpl=...`, renders the external template\n  - otherwise, for a block tag, renders the wrapped content\n  - otherwise, returns `\"\"`\n  - *Note:* as an alternative, to render wrapped content even if there is a tag template, or an external template (`tmpl-=...`), use<br/>***tagCtx.content.render(data, context, noIteration)***. (See [sample](#tags@renderplustmpl-sample))\n- ***tagCtx.ctxPrm(name):***\n  - equivalent to [`tag.ctxPrm(name)`](#jsvtagobject@ctxprm)\n  - however, for a tag with `{{else}}` blocks such as:\n    ```jsr\n      {{mytag}}...{{else ~myparam=...}}...{{/mytag}}\n    ```\n    the context is the specific `{{else}}` block -- e.g. accessing `tag.tagCtxs[1].ctxPrm(\"myparam\")` for the example above\n- ***tagCtx.cvtArgs():***\n  - equivalent to [`tag.cvtArgs()`](#jsvtagobject@cvtargs)\n  - however, for a tag with `{{else}}` blocks the context is the specific `{{else}}` block<br/>\n  -- i.e. equivalent to `tag.cvtArgs(tagCtx.index)`\n- ***tagCtx.bndArgs():***\n  - equivalent to [`tag.bndArgs()`](#jsvtagobject@bndargs)\n  - however, for a tag with `{{else}}` blocks the context is the specific `{{else}}` block<br/>\n  -- i.e. equivalent to `tag.bndArgs(tagCtx.index)`",
        "anchor": "jsrmethods"
      },
      {
        "_type": "para",
        "title": "<b>tagCtx methods</b> (JsViews only):",
        "text": "- ***tagCtx.contents():*** returns a jQuery object of tag content nodes –- optionally filtered by a jQuery selector\n  - equivalent to [`tag.contents()`](#jsvtagobject@contents)\n  - however, for a tag with `{{else}}` blocks the context is the contents of the specific `{{else}}` block\n- ***tagCtx.nodes():*** returns an array of top-level nodes within the tag content (including text nodes)\n  - equivalent to [`tag.nodes()`](#jsvtagobject@nodes)\n  - however, for a tag with `{{else}}` blocks the context is the contents of the specific `{{else}}` block\n- ***tagCtx.childTags():*** returns an array of custom tag instances, within the content of the tag -– optionally filtered by tag name\n  - equivalent to [`tag.childTags()`](#jsvtagobject@childtags)\n  - however, for a tag with `{{else}}` blocks the context is the contents of the specific `{{else}}` block\n- ***tagCtx.setValues(...):*** sets the values of the linked elements. In addition, if the tag control has a [`setValue()`](#tagoptions@setvalue) event handler, then that event handler will be called prior to updating each targeted linked element.\n  - equivalent to [`tag.setValues(...)`](#jsvtagobject@setvalues)\n  - however, for a tag with `{{else}}` blocks the context is the linked elements in the specific `{{else}}` block",
        "anchor": "methods"
      }
    ]
  },
  "jsvlinkctxobject": {
    "title": "The <em>linkCtx</em> object (JsViews)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Data-linked tags (such as `{^{mytag/}}` or `<div data-link=\"{mytag}\"></div>`) provide a `linkCtx` object giving contextual data-link information:\n\n- ***linkCtx.tag:*** the tag instance\n- ***linkCtx.type:*** `\"inline\"` for a [data-linked tag](#linked-tag-syntax), `\"link\"` for [data-linked element](#linked-elem-syntax) (tag binding), `\"top\"` for a [top-level declarative](#jsv.toplink-true) data-linked element binding or `\"expr` for a [top-level programmatic](#jsv.toplink-expr) data-linked element binding \n- ***linkCtx.data:*** the current data context for the tag\n- ***linkCtx.elem:*** the associated HTML element (e.g. the data-linked element `<div data-link=\"{mytag}\"></div>`)\n- ***linkCtx.view:*** the contextual (containing) view object\n- ***linkCtx.expr:*** the tag binding expression\n- ***linkCtx.attr:*** the [target `attr`](#link-targets) of the tag binding expression\n- ***linkCtx.ctx:*** the [ctx](#jsvctxobject) (view context) object with the contextual helpers/template parameters for this tag.\n"
      }
    ]
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
        "text": "A data-linked tag is like a regular JsRender tag (whether a built-in tag, or a custom tag) but has an additional `^` character to show that is data-linked. Let's illustrate that by an example based on the *[Extending the `{{for}}` tag](#samples/jsr/tags/extend-for)* sample:\n\n```jsr\n<ul>\n  {{for lineItems start=1 end=3}}\n    <li>\n      {{:price}}\n    </li>\n  {{/for}}\n</ul>\n\n<ul>\n  {{purchases lineItems start=1 end=3}}\n    <li>\n      {{:price}}\n    </li>\n  {{/purchases}}\n</ul>\n```\n\nWe can data-link to the `lineItems` -- whether on the built-in `{{for}}`, or the custom `{{purchases}}` tag -- like this:\n\n```jsr\n<ul>\n  {^{for lineItems}}\n    <li>\n      {^{:price}}\n    </li>\n  {{/for}}\n</ul>\n```\n\n```jsr\n<ul>\n  {^{purchases lineItems start=1 end=3}}\n    <li>\n      {^{:price}}\n    </li>\n  {{/purchases}}\n</ul>\n```\n\nNow if the `lineItems` array changes, our rendered template content will automatically update to show the additional inserted (or removed) members in the list.\n\nHere is a live sample of the data-linked `{^{for}}` tag:"
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
        "height": "120",
        "header": "<style>\nol {margin: 0}\n</style>",
        "action": "append"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice that we also added a `^` to the `{^{:name}}` tag. That means that if the value of the name field is changed ('observably') then the value will update automatically within the rendered template.\n\nAnd here is <a href=\"#jsvfortag@jsvsortfilterrange\">a link to a complete sample</a> showing a data-linked `{^{for}}` tag. It lets you modify both the `members` list and the `name` properties, and see how they automatically trigger updates in other parts of the page which bind to the same data.\n\nJsViews is smart about how it updates the HTML. Generally it does so incrementally -- only modifying the affected part of the HTML by inserting or removing elements, or replacing values."
      },
      {
        "_type": "para",
        "title": "Binding to named properties of tags",
        "text": "See also [this sample](#jsvfortag@chgtmpl), which again uses a data-linked `{^{for}}` tag, but which also has data-linking to the `tmpl` <em>named property</em> of the tag:\n\n```jsr\n{^{for members ^tmpl=isEditable? ... : ... \" /}}\n```\n\nThe prefixed `^` on the name: `^tmpl=...` is used to specify that the `tmpl` 'named property' is to be data-linked (so the whole tag will re-render if the `isEditable` value changes). Change the value (using the 'Editable' checkbox) and you see that the displayed `{^{for}}` updates automatically.\n\nBy default, named properties are not data-linked. This is made 'opt-in' for perf optimization reasons.\n\nNote, however, that custom tags can use the [boundProps](#tagoptions@boundprops) tag option to make specific named properties be data-linked by default. For example on the `{^{radiogroup}}` tag (see [sample](#link-input@disabled)) the `disabled` property is data-linked by default.",
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
            "markup": "{^{>name}}"
          },
          {
            "_type": "code",
            "title": "Code:",
            "code": "...\nvar template = $.templates(\"#theTmpl\");\ntemplate.link(\"#result\", data);\n"
          }
        ],
        "markup": "<input data-link=\"name\"/> <i>(Update on keydown)</i><br/>\n<input data-link=\"name trigger=false\"/> <i>(Update on blur)</i><br/>\n<span data-link=\"name\" class=\"spanbox\"></span>\n{^{>name}}\n",
        "data": {
          "name": "Jeff"
        },
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
        "anchor": "syntax"
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
        "text": "In fact it is short for this full syntax:\n\n```jsr\n<span data-link=\"{:pathOrExpression}\"></span>\n```\n\n-- which is a data-linked version of the familiar JsRender tag: <em><a href=\"#assigntag\">`{{:pathOrExpression}}`</a></em>. \n\nExamples:\n\n```jsr\n<span data-link=\"{:name}\"></span>\n<span data-link=\"{:address.street}\"></span>\n<span data-link=\"{:~someHelper.computed() > 1}\"></span>\n\n<input data-link=\"{:name:}\"/>\n<input data-link=\"{:name trigger=false:}\"/>\n```",
        "anchor": "full"
      },
      {
        "_type": "para",
        "title": "Optional two-way data-binding",
        "text": "Notice the full syntax for the `<input>` has an additional `:` before the `}` at the end. It corresponds to the two-way data binding. (The same applies to other *'user input elements'* such as `select`, `textarea` etc. (and also *[contenteditable elements](#)*). \n\nYou can provide both convert and convertBack converters if you want. (See the *[Two-way binding and converters](#samples/form-els/converters)* sample):\n\n```jsr\n<input data-link=\"{myConverter:some.data.path:myConvertBack}\"/>\n\n<select data-link=\"{myConverter:some.data.path:myConvertBack}\">...</select>\n```\n\nIf you want only one-way binding (from the data to the `<input>`) you simply eliminate the `:` at the end:\n\n```jsr\n<input data-link=\"{:some.data.path}\"/>\n```\n\nSee the *[Two-way binding](#link2way)* topic for additional details.",
        "anchor": "twoway"
      },
      {
        "_type": "para",
        "title": "Full syntax &ndash; multiple targets, multiple tags, multiple bindings...",
        "text": "The full syntax allows you to bind multiple expressions each to a different target, and is written like this: `data-link=\"target1{linkExpression1} target2{linkExpression2} ...\"`.\n\nPossible targets include the following:\n- an HTML attribute (such as `title{...}`, `class{...}`, `id{...}`, `disabled{...}` or `data-foo{...}`\n)\n- an HTML element property (such as `prop-muted{...}` for a `<video>` element)\n- a CSS property (such as `css-background-color{...}`)\n- innerHTML (as in `html{...}`)\n- innerText (as in `text{...}`)\n- special targets like `visible{...}`\n- or can be missing altogether (as in `{...}`) in which case it stands for the default target for the element.\n\nThe default target for most elements is `innerText`, but for `input` and `select` elements it is `value`.\n\nThe linkExpression `{...}` is actually a *template tag*, such as `{^{:a.b.c}}` or `{^{myCustomTag .../}}`. *The difference from regular JsRender tag syntax is that with data-link expressions, **you only put a single curly brace to delimit, and you don't put the self-closing `/`**, which is assumed*.\n\nIn fact as long as the tag is self-closing, you can use any JsRender tag you want -- including custom tags. See [*Tag bindings*](#link-tags).\n\nFor example, if you have a JsRender tag as content of an element: \n\n```jsr\n<div>{{for some.path tmpl='myForTmpl'}}</div>\n```\n\n-- then you can make it into a data-linked tag, using:\n\n```jsr\n<div>{^{for some.path tmpl='myForTmpl'}}</div>\n```\n\n-- or into a data-linked element, using:\n\n```jsr\n<div data-link=\"{for some.path tmpl='myForTmpl'}\" ></div>\n```\n\nSo examples would be: \n\n- `<div data-link=\"{:name}\"></div>` (one-way binding to `innerText` -- default target attrib -- so automatically HTML encodes)<br/>-- equivalent to abbreviated syntax: `<input data-link=\"name\" />`\n- `<div data-link=\"html{:name}\"></div>` (one-way binding to `innerHTML`)\n- `<div data-link=\"text{:name}\"></div>` (one-way binding to `innerText` -- equivalent to default above)\n- `<div data-link=\"html{>name}\"></div>` (one-way binding to `innerHTML` but with HTML encoding)\n- `<input data-link=\"{:name}\" >` (one-way binding to `value` -- default target attrib)\n- `<input data-link=\"value{:name}\" />` (one-way binding to `value`)\n- `<input data-link=\"title{upr:name}\" />` (one-way binding to the `title` attribute, using a registered converter: `upr`)\n- `<input data-link=\"{:name trigger=false:}\" />` (two-way binding to `value`, trigger only on blur) <br/>-- equivalent to abbreviated syntax: `<input data-link=\"name trigger=false\" />`\n- `<input data-link=\"{cvt:name:cvtBack}\" />` (two-way binding to `value`, with converters)\n- `<input data-link=\"{cvt:name trigger=false:cvtBack}\" />` (two-way binding to `value`, with converters, and trigger only on blur)\n- `<input data-link=\"{cvt:name:cvtBack} title{:info.description}\" />` (two-way binding to `value`, with converters and one-way binding to `title`)\n- `<img data-link=\"src{:'/myImagesFolder/' + fileName + '.png'}\" />` (one-way binding to `src` -- using an expression to build full path)\n- `<div data-link=\"{myCustomTag name}\"></div>` (data-linking -- and instantiating -- a JsViews custom tag control. Renders as `innerHTML` -- default target attrib for tags other than {: ...} -- so the control can insert HTML markup)\n- `<div data-link=\"text{myCustomTag name}\"></div>` (data-linking a JsViews custom tag control -- rendering as `innerText` -- so automatically HTML encodes)\n- `<svg><ellipse data-link=\"cx{:x} fill{:color}\"></ellipse>` (data-linking to attributes of an SVG element)\n- `<input data-link=\"{:name():} placeholder{:namePlaceholder()}\" />` (two-way data-linking to `name()` plus data-linking the placeholder target to `namePlaceholder()`)\n\nSee: [Targets for data-linking](#link-targets) for additional details and samples.",
        "anchor": "fullsyntax"
      },
      {
        "_type": "para",
        "title": "When do you use the abbreviated syntax?",
        "text": "The abbreviated syntax is an alternative syntax when you only have a single expression of the form `{:someExpression}`, or in the case of inputs `{:someExpression:}` (two-way binding). So it is using the default target attrib, and is targeting `innerText`, and automatically doing HTML encoding. In that case you can remove the `{}` delimiters and colons and just write the `someExpression`. JsViews will expand your expression to the full syntax. Example: `data-link=\"name\"`.\n\nSo if you need any of the following, you need to switch to the full format:\n- insertion of HTML markup as `innerHTML`: (switch to `html{:someExpression}`)\n- converters\n- different target 'attribs'\n- multiple bindings\n- using tags other than `{{: ...}}`\n",
        "anchor": "when-abbrev"
      },
      {
        "_type": "para",
        "title": "Data-linking expressions using block tags, such as {{for}} &ndash; including {{else}} blocks.",
        "text": "As mentioned above, you can data-link to block tags, as long as you register the block content as a separate template, referenced using `tmpl=...`:\n\n```jsr\n<div data-link=\"{for employees tmpl='nameTmpl'}\">\n```\n\nYou can also data-link to block tags that include `{{else}}` blocks, such as:\n\n```jsr\n<div data-link=\"{if someExpression tmpl='isTrueTmpl'}{else tmpl='isFalseTmpl'}\" ></div>\n```\n\n***Example***:",
        "anchor": "else-syntax"
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
            "title": "Top-level data-linking to {if ...}{else ...}{else ...}",
            "text": "```jsr\n...<input data-link=\"show\" type=\"checkbox\"/> Show...\n...<input data-link=\"alt\" type=\"checkbox\"/> Alt...\n\n<div data-link=\"{if show tmpl='Show this'}{else alt tmpl='#alttmpl'}{else tmpl='No show, no alt'}\"></div>\n```\n\n```js\n$.link(true, \"body\", {show: true, alt: true});\n```"
          }
        ],
        "html": "<script id=\"alttmpl\" type=\"text/x-jsrender\">\n  No show, but alt is true...\n</script>\n\n<label><input data-link=\"show\" type=\"checkbox\"/> Show</label>\n\n<label><input data-link=\"alt\" type=\"checkbox\"/> Alt</label>\n\n<div data-link=\"{if show tmpl='Show this'}{else alt tmpl='#alttmpl'}{else tmpl='No show, no alt'}\"></div>\n",
        "code": "$.link(true, \"body\", {show: true, alt: true});\n\n",
        "height": "85",
        "title": "",
        "nocss": false,
        "header": "<style>label {display: block;} div { margin-top: 8px;}</style>",
        "action": "append"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also [this](#jsviftag@if-else-tmpl) `{if}{else}` sample with dynamically changing templates)."
      },
      {
        "_type": "para",
        "title": "Data-linking expressions using tag controls",
        "text": "An important case of data-linking is binding and instantiating of custom tag controls, such as:\n\n```jsr\n<div data-link=\"{slider size _range='min' ...}\"></div>\n```\n\nSee the [tag control samples](#samples/tag-controls). Note that this works not only within data-linked templates, but also  when linking to top-level content -- as shown in the second variant of the [slider sample](#samples/tag-controls/jqui/slider/simple@toplink). \n\nAnother example might be a *tabs* control where the `{{else}}` blocks are the contents of the different tabs:\n\n```jsr\n<div data-link=\"{tabs ... tmpl='tab1'}{else ... tmpl='tab2'}{else ... tmpl='tab3'}\"></div>\n```\n\n***Example***:\n",
        "anchor": "tagcontrol"
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
            "text": "Using data-linking to instantiate a *tabs* control on a top-level page element: \n\n```jsr\n<div id=\"tabsView\" data-link=\"\n  {tabs caption='days' tmpl='tab1' pane=2 ...}\n  {else caption='months' tmpl='tab2'}\n  {else caption='name' tmpl='tab3'}\n\"></div>\n```\n\n```js\n$.templates({\n  tab1: \"365 days per year\",\n  ...\n  tab3: \"Name: {{:name}}\"\n});\n\n$(\"#tabsView\").link(true, {name: \"Jeff\"});\n```"
          }
        ],
        "markup": "",
        "html": "<div id=\"tabsView\" data-link=\"\n{tabs caption='days' tmpl='tab1' pane=2 height=20 width=350}\n{else caption='months' tmpl='tab2'}\n{else caption='name' tmpl='tab3'}\n\"></div>",
        "code": "$(function() {\n$.templates({\n  tab1: \"365 days per year\",\n  tab2: \"12 months per year\",\n  tab3: \"Name: {{:name}}\"\n});\n\n$(\"#tabsView\").link(true, {name: \"Jeff\"});\n});\n",
        "height": "96",
        "title": "A top-level data-linked tabs control",
        "nocss": true,
        "header": "<link href=\"/download/sample-tag-controls/tabs/tabs.css\" rel=\"stylesheet\"/>\n<script src=\"/download/sample-tag-controls/tabs/tabs.js\"></script>",
        "action": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also [*Tag bindings*](#link-tags)."
      },
      {
        "_type": "para",
        "title": "Data-link syntax for updating only, without initial rendering",
        "text": "Any of the full syntax data-link expressions above can be modified by adding a `^` before the initial `{`. With this modified syntax, the data-link expression will only be used for updating of content when the data changes, but *not* for the initial rendering:\n\n```jsr\n<... data-link=\"target^{expression}\" ...>\n```\n\nSee for example the following sample:",
        "anchor": "no-initial-render"
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
            "text": "```jsr\n<div data-link=\"^{:name}\">Your name will go here</div>\n\n<input data-link=\"^{:name:}\" value=\"Your name...\"/>\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <div data-link=\"^{:name}\">Your name will go here</div>\n  <input data-link=\"^{:name:}\" value=\"Your name...\"/><br/>\n  Name: {^{>name}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n  data = { name: \"\" };\n\nmyTmpl.link(\"#page\", data);",
        "header": "<style>\ninput {margin: 10px 0;} \n<style>",
        "action": "append",
        "height": "100"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also [this sample](#link-input@radioeditid) with radio buttons, which uses the syntax:\n\n```jsr\n<input ... type=\"radio\" value=\"{{:id}}\" data-link=\"value^{:id}\" />\n```"
      },
      {
        "_type": "para",
        "title": "Samples of data-linking:",
        "text": "- There are many samples showing data-linking under [JsViews Samples](#samples/jsv).\n- See in particular this [tutorial sequence on data-linking](#samples/data-link)\n"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "- *[Data-linked tags](#linked-tag-syntax)*\n- *[Targets for data-linking](#link-targets)*\n"
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
        },
        "anchor": "api"
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
        },
        "anchor": "alt"
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
        "text": "And here is another example, taken from the [slider control](#samples/tag-controls/jqui/slider/simple@toplink) in the [tag control samples](#samples/tag-controls), which uses top-level data-linking with `data-link=\"{slider ...}\"` to instantiate and data-bind a JsViews `{{slider}}` control. "
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
        "url": "samples/tag-controls/jqui/slider/simple-toplevel/sample",
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
          },
          {
            "_type": "topic",
            "hash": "jsvunlink",
            "label": "$.unlink()"
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
        },
        "anchor": "api"
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
        },
        "anchor": "alt"
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
        "height": "115",
        "title": "Top-level programmatic data-linking",
        "anchor": "sample"
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
        "height": "115",
        "title": "Top-level programmatic data-linking <span style=\"font-style:normal;\">(alternative syntax)</span>",
        "markup": "",
        "anchor": "sample-alt"
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
          },
          {
            "_type": "topic",
            "hash": "jsvunlink",
            "label": "$.unlink()"
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
            "text": "```jsr\n<input data-link=\"name\"/>\n```\n\n```jsr\n<label><input data-link=\"{toBool:gender:toString}\" type=\"checkbox\" /> Male</label>\n```\n\n```jsr\n<div data-link=\"{radiogroup gender}\">\n  <label><input value=\"male\" type=\"radio\" /> Male</label>\n  <label><input value=\"female\" type=\"radio\" /> Female</label>\n</div>\n```\n\n```jsr\n<select data-link=\"gender\">\n  <option value=\"male\">Male</option>\n  <option value=\"female\">Female</option>\n</select>\n```\n\n```jsr\n<textarea data-link=\"name\"></textarea>\n```\n\n```jsr\n<span data-link=\"{encode:name:unencode}\" contenteditable=\"true\"></span>\n```\n\n```jsr\n{^{textbox name/}}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"name\" class=\"block\"/>\n\n  <label class=\"block\"><input data-link=\"{toBool:gender:toString}\" type=\"checkbox\" /> Male</label>\n\n  <div class=\"block\" data-link=\"{radiogroup gender}\">\n    <label><input value=\"male\" type=\"radio\" /> Male</label><br/>\n    <label><input data-link=\"gender\" value=\"female\" type=\"radio\" /> Female</label>\n  </div>\n\n  <select data-link=\"gender\" class=\"block\">\n    <option value=\"male\">Male</option>\n    <option value=\"female\">Female</option>\n  </select>\n\n  <textarea data-link=\"name\" class=\"block\"></textarea>\n\n  <div class=\"block\">\n    <span data-link=\"{encode:name:unencode}\" contenteditable=\"true\"></span>\n  </div>\n\n  <div class=\"block\">\n    {^{textbox name label=\"Name:\"/}}\n  </div>\n\n  <hr/>\n\n  <div class=\"green\"><b>person:</b> {^{>name}} {^{>gender}}</div>\n</script>",
        "code": "$.views.converters({\n  toString: function(val) {\n   return val ? 'male' : 'female';\n  },\n  toBool: function(val) {\n    return val === 'male';\n }\n});\n\n$.views.tags({\n  textbox: {\n    onBind: function() {\n      // Find input in contents\n      this.linkedElem = this.contents(\"input\");\n    },\n    onUpdate: false, // No need to re-render whole tag, when content updates.\n    template: \"<em>{{:~tagCtx.props.label}}</em> <input/>\"\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo\", gender: \"male\"};\n\ntmpl.link(\"#result\", person);\n",
        "height": "310",
        "title": "Two way binding",
        "header": "<style>\n  [contenteditable] {border:1px solid green; padding:5px;}\n  .block {display: block; margin-bottom: 10px} .green {color: green;}\n</style>",
        "action": "append",
        "anchor": "sample-twoway"
      },
      {
        "_type": "para",
        "title": "Abbreviated syntax and full syntax for data-link",
        "text": "Notice that on the above elements, the `data-link=\"name\"` syntax automatically has <em>two-way data-binding</em>.\n\nThe full syntax for two-way binding is `data-link=\"{:name:}\"`. See *[Data-linked elements](#linked-elem-syntax)* for syntax details.\n\n***Note:*** To specify *one-way binding* only, use the full syntax, but *without the final colon*: `data-link=\"{:name}`.",
        "anchor": "full-abbrev"
      },
      {
        "_type": "para",
        "title": "Converters: convert and convert back ",
        "text": "With two way bindings, you can use a [converter](#converters) for each direction (*from/to*) of the binding: *convert* for converting *from* data to the rendered value, and *convert back* for converting from the user input *back to* the data.\n\nIn the sample above the *checkbox* example is using converters. Without converters the *checkbox* binds to a *Boolean* data value. Here, converters allow it to bind instead to `gender` which is a string with values `\"male\"`/`\"female\"`:\n\n```jsr\n<input data-link=\"{toBool:gender:toString}\" type=\"checkbox\" />\n```\n\nThe alternative syntax for using [converters on other tags](#converters@othertags) also extends to *convert back* -- so you can write:\n \n```jsr\ndata-link=\"... convert=... convertBack=...\n```\n\nYou can set *convert* and *convertBack* to a converter name, or a function such as a helper or data method. Here is a modified version of the previous sample, using the `convertBack-=...` syntax, in this case set to helper functions:",
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
        "html": "<style>.block {display: block; margin-bottom: 10px} .green {color: green;}</style>\n\n<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <label class=\"block\">\n  <input data-link=\"gender convert=~toBool convertBack=~toString\" type=\"checkbox\" />\n  Male</label>\n\n  <div class=\"block\" data-link=\"{radiogroup gender}\">\n    <label><input value=\"male\" type=\"radio\" /> Male</label><br/>\n    <label><input value=\"female\" type=\"radio\" /> Female</label>\n  </div>\n\n  <hr/>\n\n  <div class=\"green\">{^{>gender}}</div>\n</script>",
        "code": "var helpers = {\n  toString: function(val) {\n   return val ? 'male' : 'female';\n  },\n  toBool: function(val) {\n    return val === 'male';\n }\n};\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {gender: \"male\"};\n\ntmpl.link(\"#result\", person, helpers);\n",
        "title": "Two-way binding &ndash; using helpers as converters",
        "height": "120"
      },
      {
        "_type": "para",
        "title": "Converter function signature",
        "text": "Both the convert and the convertBack converter functions are invoked with the tag instance as `this` pointer -– as described in this JsRender topic: [*Converter function signature*](#convertersapi@signature). So within a converter function you can access `this.tagCtx`, `this.linkCtx`, etc. and from there reach many useful properties and objects.",
        "anchor": "signature"
      },
      {
        "_type": "para",
        "title": "<b>Additional advanced two-way  binding scenarios:</b>",
        "text": ""
      },
      {
        "_type": "para",
        "title": "Triggering the two-way binding on <b>blur</b>, rather than on <b>keydown</b>",
        "text": "In the case of *[textboxes](#link-input@textbox)* (or any other two-way data-linked element that takes character entry such as the *[textarea](#link-textarea)*, *[contenteditable](#link-contenteditable)* and some *custom tags* like as the `{^{textbox}}` example above), you can choose when the *to* binding updates the underlying data:\n\n- With `trigger=true` (default setting), changes to the underlying data are triggered as you type (on character entry -- the *keydown* event, or for compatible browsers, the *input* event)\n- With `trigger=false`, changes to the underlying data are made on leaving the textbox (the *change* or *blur* event)\n\nThe *trigger* setting can be modified:\n\n- globally, by using: [$.views.settings.trigger(...)](#jsvsettings/trigger):\n  ```jsr\n  $.views.settings.trigger(false); \n  ```\n- on each tag or element by writing:\n  ```jsr\n  <input data-link=\"name trigger=false\"/> \n  {^{textbox name trigger=false}}\n  ```\n\nIn fact you can also set `trigger` to a string with one or more white-space separated event names, such as: \n\n```jsr\n<input data-link=\"name trigger='keyup mouseup'\"/>`\n```\n\n-- but generally only the values ***true*** (actually equivalent to `trigger='keydown'`) and ***false*** are useful.",
        "anchor": "trigger"
      },
      {
        "_type": "para",
        "title": "linkTo: Linking from/to different underlying data",
        "text": "It can sometimes be useful to be able to choose different targets for the *from* and *to* bindings of a two-way bound element such as a textbox. This is possible by setting the `linkTo` attribute to the desired target data for the *to* binding.\n\nIn the following sample an `<input/>` and a `<select>` are bound to `settings.current` (*from* binding) and to `settings.modified` (*to* binding, using `linkTo`):\n\n```jsr\n<input data-link=\"current.title linkTo=modified.title\" />\n```\n\nNote that `linkTo` can also be used with the full syntax, and optionally with converters as in:\n\n```jsr\n<input data-link=\"{cvt:current.title linkTo=modified.title:cvtBk\" />\n```\n\nThe user can choose the *Apply* button (or hit *Enter*, for the submit action of the form) to copy values over from `modified` to `current`. *Cancel* reverts the input/select back to the current data:",
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
        "html": "<div id=\"result\"></div>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n<b>Current settings:</b>\n<span class=\"title\" data-link=\"\n  css-border-color{:current.color}\n  css-color{:current.color}\n  {:current.title}\n\"></span><br/>\n\n<form data-link=\"{on 'submit' apply}\">\n  <em>Modify settings:</em><br/><br/>\n  Color:\n  <select data-link=\"current.color linkTo=modified.color\">\n    <option>red</option>\n    <option>green</option>\n  </select><br/>\n  Name:\n  <input data-link=\"current.title linkTo=modified.title\" />\n  <hr />\n  Modified settings:\n  <span class=\"title\" data-link=\"\n    css-border-color{:modified.color}\n    css-color{:modified.color}\n    {:modified.title}\n  \"></span><br/>\n  <button type=\"submit\">Apply</button>\n  <button data-link=\"{on cancel}\">Cancel</button><br/>\n</form><br/>\n\n<em>Underlying data:</em><br/>{^{jsonview noFunctions=true/}}\n\n</script>",
        "code": "var settings = {\n  current: {title: \"My title\", color:\"green\"},\n  modified: {title: \"My title\", color:\"green\"},\n  apply: function() {\n    $.observable(this.current).setProperty(this.modified);\n    return false;\n  },\n  cancel: function() {\n    $.observable(this.modified).setProperty(this.current);\n    $.observable(this.current).setProperty({title: \"\", color: \"\"});\n  }\n}\n\nvar myTmpl = $.templates(\"#myTmpl\");\n\nmyTmpl.link(\"#result\", settings);",
        "height": "480",
        "title": "linkTo",
        "header": "<script src=\"/download/sample-tag-controls/jsonview/jsonview.js\"></script>\n<link href=\"/download/sample-tag-controls/jsonview/jsonview.css\" rel=\"stylesheet\"/>\n<style>\n.title {display: inline-block; border:1px solid; padding:5px; margin-bottom: 15px}\nform {border: 1px solid gray; display: inline-block; padding: 5px; margin-bottom: 15px;}\ninput, button, select {margin: 5px;} \n</style>",
        "action": "append"
      },
      {
        "_type": "para",
        "title": "Data-linking to/from multiple arguments, using convert and convertBack",
        "text": "When data-linking binds from more than one argument (using a *convert* converter to combine values), then two-way binding can be made to bind back not just to the first argument, but to all of the arguments. This is achieved by providing a *convert back* converter which returns an array of values, one for each argument, and is shown in the following example: ",
        "anchor": "multipleargs"
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
            "text": "Data-link to two arguments, `first ` and `last`:\n\n```jsr\n<input data-link=\"{toFull:first last:fromFull}\"/>\n```\n\n*Convert back* converter `fromFull` returns an array:\n\n```js\n$.views.converters({\n  toFull: function(first, last) {\n    return first + \" \" + last;\n  },\n  fromFull: function(fullname) {\n    ...\n    return [first, last]; // Return array for binding back to the two arguments\n  }\n});\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"{toFull:first last:fromFull}\"/><br/><br/>\n\n  First: <em>{^{>first}}</em><br/>\n  Last: <b>{^{>last}}</b>\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n  data = { first: \"Jo\", last: \"Blow\" };\n\n$.views.converters({\n  toFull: function(first, last) {\n    return first + \" \" + last;\n  },\n  fromFull: function(fullname) {\n    var names = fullname.split(\" \");\n    var last = names.pop();\n    var first = names.join(\" \"); \n    return [first, last]; // Return array for binding back to the two arguments\n  }\n});\n\nmyTmpl.link(\"#page\", data);",
        "height": "105"
      },
      {
        "_type": "para",
        "title": "Encoding to avoid XSS",
        "text": "Whenever the user has access to the two-way editing feature, it is important to avoid any associated security risk that might arise from HTML injection, or XSS (cross-site-scripting) attacks.\n\nFor example, if UI such as `<input data-link=\"someValue\" />` allows the user to edit `someValue`, then `someValue` should not be inserted directly into the HTML without encoding. In this scenario, the use of [`{^{:someValue}}`](#jsvassigntag) is therefore to be avoided, and should be replaced with either [`{^{>someValue}}`](#jsvhtmltag) or [`{^{encode:someValue}}`](#convertersapi@encode).\n\nWhen using content-editable elements with two-way binding, they should generally be associated with encode/unencode converters: [`data-link=\"{encode:someValue:unencode}\"`](#convertersapi@encode):\n\nSimilarly if the initial data from the server is untrusted, then direct rendering of unencoded values by the template should be avoided, and in particular [`{{:someValue}}`](#assigntag) should not be used, and should be replaced by [`{{>someValue}}`](#htmltag) or `[{{encode:someValue}}](#convertersapi@encode)`\n\nThese scenarios are illustrated in the following sample, which starts with some 'dangerous' data, and also allows the user to modify or insert HTML markup in the `person.name` property. However the correct use of encoding prevents the HTML markup from being inserted 'as is' into the DOM.",
        "anchor": "encode"
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
            "text": "*Editable UI elements:*\n\n```jsr\n<input data-link=\"name\"/>\n\n<div contenteditable=\"true\" data-link=\"{encode:name:unencode}\"></div>\n```\n\n*'Safe' rendering:*\n\n```jsr\n{^{>name}}\n\n{^{encode:name}}\n\n<div data-link=\"name\"></div>\n```"
          }
        ],
        "header": "<style>\ninput {width: 300px;}\n[contenteditable] {display: inline-block;}\n.box {display: inline-block; border:1px solid green;}\ninput, [contenteditable] {border: 1px solid #c31f1f;}\ninput, [contenteditable], .box {margin: 0 0 23px 15px; padding: 5px;}\ncode {display: block; margin-bottom: 10px; font-style: italic; }\n</style>",
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <code>&lt;input data-link=\"name\"/&gt;:</code>\n  <input data-link=\"name\" class=\"block\"/>\n\n  <code>&lt;div contenteditable=\"true\" data-link=\"{encode:name:unencode}\"&gt;:</code>\n  <div contenteditable=\"true\" data-link=\"{encode:name:unencode}\"></div>\n\n  <code>&lcub;^{>name}&rcub;:</code>\n  <span class=\"box\"> \n    {^{>name}}\n  </span>\n\n  <code>&lcub;^{encode:name}&rcub;:</code>\n  <span class=\"box\">\n    {^{encode:name}}\n  </span>\n\n  <code>&lt;div data-link=\"name\"&gt;:</code>\n  <span class=\"box\">\n    <div data-link=\"name\"></div>\n  </span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: 'Jo <img src=\"dangerous\" onerror=\"alert()\"/>'};\n\ntmpl.link(\"#result\", person);\n",
        "height": "408",
        "nocss": false,
        "action": "append"
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
        "title": "Data-linking to deep changes in the path ('deep linking')",
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
            "text": "```jsr\n<input data-link=\"manager.address.ZIP\" />\n\n{^{if manager.address.ZIP}}\n  ZIP: {^{>manager.address.ZIP}}\n{{/if}}\n```\n\nModify leaf: template values update in response:\n```js\n$.observable(team.manager.address).setProperty({\n  \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n});\n```\n\nChange manager: template values do *not* update:\n```js\n$.observable(team).setProperty({\n  manager: team.manager === person1 ? person2 : person1\n});\n```\n\n\n"
          }
        ],
        "html": "<div class=\"left\">\n  <button id=\"modifyLeaf\">Change leaf values</button>\n  <button id=\"changeManager\">Change manager</button>\n  <div id=\"result\"></div>\n</div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n\n<input data-link=\"manager.address.ZIP\" />\n\n{^{if manager.address.ZIP}}\n  ZIP: {^{>manager.address.ZIP}}\n{{/if}}\n\n<hr/>\n\nManager: {^{if manager === person1}}person1{{else}}person2{{/if}}\n\n</script>",
        "code": "var team = {\n  person1: {\n    address: {\n      City: \"New York\",\n      ZIP: \"10035\"\n    }\n  },\n  person2: {\n    address: {\n      City: \"London\"\n    }\n  }\n};\n\nteam.manager = team.person1;\n\n\n$(\"#modifyLeaf\").on(\"click\", function() {\n  $.observable(team.manager.address).setProperty({\n    \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n  });\n});\n\n$(\"#changeManager\").on(\"click\", function() {\n  $.observable(team).setProperty({\n    manager: team.manager === team.person1 ? team.person2 : team.person1\n  });\n});\n\nvar tmpl = $.templates(\"#managerTmpl\");\n\ntmpl.link(\"#result\", team);",
        "title": "Leaf binding only",
        "height": "130",
        "anchor": "sample-leaf"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is the same sample but with the deep path binding to manager: `manager^address.ZIP`"
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
            "text": "```jsr\n<input data-link=\"manager^address.ZIP\" />\n\n{^{if manager^address.ZIP}}\n  ZIP: {^{>manager^address.ZIP}}\n{{/if}}\n```\n\nModify leaf (ZIP) or manager: template values all update correctly in response\n"
          }
        ],
        "html": "<div class=\"left\">\n  <button id=\"modifyLeaf\">Change leaf values</button>\n  <button id=\"changeManager\">Change manager</button>\n  <div id=\"result\"></div>\n</div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n\n<input data-link=\"manager^address.ZIP\" />\n\n{^{if manager^address.ZIP}}\n  ZIP: {^{>manager^address.ZIP}}\n{{/if}}\n\n<hr/>\n\nManager: {^{if manager === person1}}person1{{else}}person2{{/if}}\n\n</script>",
        "code": "var team = {\n  person1: {\n    address: {\n      City: \"New York\",\n      ZIP: \"10035\"\n    }\n  },\n  person2: {\n    address: {\n      City: \"London\"\n    }\n  }\n};\n\nteam.manager = team.person1;\n\n\n$(\"#modifyLeaf\").on(\"click\", function() {\n  $.observable(team.manager.address).setProperty({\n    \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n  });\n});\n\n$(\"#changeManager\").on(\"click\", function() {\n  $.observable(team).setProperty({\n    manager: team.manager === team.person1 ? team.person2 : team.person1\n  });\n});\n\nvar tmpl = $.templates(\"#managerTmpl\");\n\ntmpl.link(\"#result\", team);",
        "title": "Data-linking to deep changes",
        "height": "130",
        "anchor": "sample-deep"
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
        "title": "Data-linking to deep changes (three levels)",
        "anchor": "sample-deep3levels"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also [this sample](#jsvviewmodelsapi@ismanagersample), showing similar deep linking but with computed get/set properties: `data-link=\"manager()^address().ZIP()\"`)"
      },
      {
        "_type": "links",
        "title": "See also",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-elem-syntax",
            "label": "Data-linked elements"
          },
          {
            "_type": "topic",
            "hash": "linked-tag-syntax",
            "label": "Data-linked tags"
          },
          {
            "_type": "topic",
            "hash": "paths",
            "label": "Paths and expressions"
          },
          {
            "_type": "topic",
            "hash": "settings/allowcode@security",
            "label": "Expressions and security"
          }
        ]
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
        "text": "Data-linking to computed observables can include:\n\n- data-linking to a computed value (as in [this sample](#computed@getsetdepends)): \n  ```jsr\n  <span data-link=\"person.fullName()\"></span>\n  ```\n- two-way data-linking to a get/set property (as in [this sample](#computed@getset)):\n  ```jsr\n  <input data-link=\"person.firstName()\" />\n  ```\n- data-linking to a deep path that includes one or more computed values (as in [this sample](#jsvviewmodelsapi@ismanagersample) -- where the displayed `ZIP` updates correctly when `team.manager()` changes):\n  ```jsr\n  <span data-link=\"manager()^address().ZIP()\"></span>\n  ```\n- data-linking to multiple targets as in:\n  ```jsr\n  <input data-link=\"{:name():} placeholder{:namePlaceholder()}\" />\n  ```\n  -- which has two-way data-linking to `name()` and data-linking of the placeholder target to `namePlaceholder()`\n\nSee:\n\n- [Data / View Model](#jsvmodel)\n- [Computed properties and computed observables](#computed)\n- [Samples: fullName() – variants](#samples/computed/fullname)\n- [Samples: Shopping cart - totalAmount()](#samples/computed/shopping-cart)\n- [Compiled VMs - Team manager sample](#jsvviewmodelsapi@ismanagersample)"
      }
    ]
  },
  "link-targets": {
    "title": "Targets for data-linking",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The [full syntax](#linked-elem-syntax@fullsyntax) for data-linked elements is written like this:\n\n```jsr\n<elem data-link=\"target1{linkExpression1} ...\" ...>\n```\n\nPossible targets include the following:\n- an HTML attribute (such as `title{...}`, `class{...}`, `id{...}`, `disabled{...}` or `data-foo{...}`\n)\n- an HTML element property (such as `prop-muted{...}` for a `<video>` element)\n- a CSS property (such as `css-background-color{...}`)\n- innerHTML (as in `html{...}`)\n- innerText (as in `text{...}`)\n- special targets like `visible{...}`\n- or can be missing altogether (as in `{...}`) in which case it stands for the default target for the element.\n\nThe default target for most elements is `innerText`, but for `input` and `select` elements it is `value`.\n\nThe following topics provide details and examples of each type of target attribute:"
      },
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
            "hash": "link-elemattribs",
            "label": "Element attributes/properties"
          },
          {
            "hash": "link-tags",
            "label": "Tag bindings"
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
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"name\"/>\n  <em>Two-way</em><br/>\n\n  <input data-link=\"{upper:name:lower}\"/>\n  <em>Two-way with 'upper' and 'lower' converters (convert/convert back)</em><br/>\n\n  <input data-link=\"{:name}\"/>\n  <em>One-way</em><br/>\n\n  <input data-link=\"{upper:name}\"/>\n  <em>One-way with 'upper' converter</em><br/>\n\n  <input data-link=\"{upper:name trigger=false:lower}\"/>\n  <em>Two-way with convert/convert back (no trigger on keydown, only on blur)</em><br/>\n\n  <span class=\"spanbox\" data-link=\"name\"></span>\n  <em>Data-linked span</em>\n</script>",
        "code": "$.views.converters({\n  upper: function(val) {\n    return val.toUpperCase();\n  },\n  lower: function(val) {\n    return val.toLowerCase();\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo\"};\n\ntmpl.link(\"#result\", person);",
        "height": "180",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Data-linked checkboxes",
        "text": "In most scenarios using data-linked checkboxes, each checkbox is data-linked to a boolean data value.\n\nIt is also possible to data-link multiple checkboxes as a *check box group* -- binding to a single data value of type array (generally an array of strings, one for each checked checkbox). See [*Data-linked checkbox groups*](#link-input@checkboxgroup), at the end of this topic, for details.\n\nThe following sample shows data-linked checkboxes, with examples of two-way binding, one-way binding, and use of converters (*convert* and *convert back*).",
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
        "title": "Data-linking a checkbox to a boolean data value",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also [*Data-linked checkbox groups*](#link-input@checkboxgroup))"
      },
      {
        "_type": "para",
        "title": "Data-linked radio buttons",
        "text": "The simplest way to provide two-way data-linking to a group of radio buttons is by wrapping the `<input>`s with a [`{^{radiogroup ...}}`](#jsvradiogrouptag) tag. \n\nAlternatively, it is also possible to [data-link directly](#link-input@radio2waydirect) to the `<input>` elements.",
        "anchor": "radio"
      },
      {
        "_type": "para",
        "title": "Samples in this section",
        "text": "\nThis topic includes the following radio-button samples showing data-linked radio buttons:\n\n- Two-way data-binding, with [{{radiogroup}}](#link-input@radio2way)\n- Two-way data-binding, [linking directly to the input elements](#link-input@radio2waydirect)\n- [Top-level](#link-input@topdirect) linking directly to the input elements\n- [Top-level](#link-input@topradiogroup) with `{radiogroup}` binding\n- Data-driven by [array](#link-input@radioarray) data (in a `{{for}}` loop)\n- Data-driven by an [editable array](#link-input@radioedit) (in a `{^{for}}` loop)\n- Data-driven by an [editable array](#link-input@radioeditid) -- including `id`\n- Using [converters](#link-input@radioconvert)"
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; two-way data-binding &ndash; using {^{radiogroup}}  ",
        "text": "A radio button group will generally consist of a group of `<input>` elements of type `\"radio\"`, each associated with a `<label>` (which either wraps the `<input>`, or references it by id, through the `for=\"inputId\"` attribute).\n\nTo data-link the radio buttons, wrap the `<input>` (and `<label>`) elements with a `{^{radiogroup ...}}` tag, linking to the appropriate data path such as the `selectedCar` property on the current data object:\n\n```jsr\n{^{radiogroup selectedCar}}\n```",
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
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar data = {\n  selectedCar: \"frd\",\n  ...\n};\n```\n\n*<div class=\"close\">HTML:</div>*\n\n```jsr\n{^{radiogroup selectedCar}}\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  <label><input type=\"radio\" value=\"vlv\"/> Volvo</label>\n  <label><input type=\"radio\" value=\"frd\"/> Ford</label>\n{{/radiogroup}}\n```\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{radiogroup selectedCar}}\n    <label><input type=\"radio\" value=\"\"/>\n      None</label><br/>\n    <label><input type=\"radio\" value=\"vlv\"/>\n      Volvo</label><br/>\n    <label><input type=\"radio\" value=\"frd\"/>\n      Ford</label><br/>\n  {{/radiogroup}}\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedCar: \"frd\"};\n\ntmpl.link(\"#result\", data);",
        "height": "130",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; data-binding directly to the &lt;inputs>",
        "text": "It is also possible to data-link directly to `<input>` elements, without using a `{{radiogroup}}` tag, by:\n\n- data-linking each `<input>` directly (each to the same data path, such as `data-link=\"selectedCar\"`)\n- including a `name` attribute on each `<input>` of the group (such as `name=\"cars\"`)\n\n```jsr\n<label><input name=\"cars\" type=\"radio\" value=\"vlv\" data-link=\"selectedCar\"/> ...\n```\n\nNote that setting the `name` attribute was not necessary when using `{{radiogroup}}` -- since the `{{radiogroup}}` tag will automatically add a generated `name` property to each `<input>`, if none has been specified).",
        "anchor": "radio2waydirect"
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
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar data = {\n  selectedCar: \"frd\",\n  ...\n};\n```\n\n*<div class=\"close\">HTML:</div>*\n\n```jsr\n<label><input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selectedCar\"/> None ...\n<label><input name=\"cars\" type=\"radio\" value=\"vlv\" data-link=\"selectedCar\"/> Volvo ...\n<label><input name=\"cars\" type=\"radio\" value=\"frd\" data-link=\"selectedCar\"/> Ford ...\n```\n\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <label><input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selectedCar\"/>\n    None</label><br/>\n  <label><input name=\"cars\" type=\"radio\" value=\"vlv\" data-link=\"selectedCar\"/>\n    Volvo</label><br/>\n  <label><input name=\"cars\" type=\"radio\" value=\"frd\" data-link=\"selectedCar\"/>\n    Ford</label><br/>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedCar: \"frd\"};\n\ntmpl.link(\"#result\", data);",
        "height": "130"
      },
      {
        "_type": "para",
        "title": "Top-level data-linking of radio buttons",
        "text": "For [top-level data-linking](#toplink), there are two alternatives:\n\n- Top-level data-linked `<input>` elements (using direct data-linking as in the previous example)\n- Top-level `{radiogroup}` binding (shown also [here](#jsvradiogrouptag@top-radiogroup))\n\nThe following two samples show those two approaches:\n",
        "anchor": "top"
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
            "text": "```jsr\n<div id=\"top-level-linked\">\n  <label><input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selectedCar\"/> None...\n  ...\n```\n\n```js\nvar data = {selectedCar: \"frd\"};\n$.link(true, \"#top-level-linked\", data);\n```"
          }
        ],
        "html": "<div id=\"top-level-linked\">\n  <label><input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selectedCar\"/>\n    None</label><br/>\n  <label><input name=\"cars\" type=\"radio\" value=\"vlv\" data-link=\"selectedCar\"/>\n    Volvo</label><br/>\n  <label><input name=\"cars\" type=\"radio\" value=\"frd\" data-link=\"selectedCar\"/>\n    Ford</label><br/>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n</div>",
        "code": "var data = {selectedCar: \"frd\"};\n\n$.link(true, \"#top-level-linked\", data);",
        "title": "Top-level data-linked &lt;input> elements",
        "height": "130",
        "anchor": "topdirect"
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
            "text": "```jsr\n<div id=\"top-level-linked\">\n  <div data-link=\"{radiogroup selectedCar}\">\n    <label><input type=\"radio\" value=\"\"/> None...\n    ...\n```\n\n```js\nvar data = {selectedCar: \"frd\"};\n$.link(true, \"#top-level-linked\", data);\n```"
          }
        ],
        "code": "var data = {selectedCar: \"frd\"};\n\n$.link(true, \"#top-level-linked\", data);\n",
        "html": "<div id=\"top-level-linked\">\n  <div data-link=\"{radiogroup selectedCar}\">\n    <label><input type=\"radio\" value=\"\"/>\n      None</label><br/>\n    <label><input type=\"radio\" value=\"vlv\"/>\n      Volvo</label><br/>\n   <label><input type=\"radio\" value=\"frd\"/>\n      Ford</label>\n  </div>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n</div>",
        "title": "Top-level {radiogroup ...} binding",
        "height": "130",
        "anchor": "topradiogroup"
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; in {{for}} loop with array",
        "text": "In this example, a `cars` array has values for the displayed `name` and for the corresponding `id` (used as *key*, and data-linked to the `selectedCar` property).\n\nWe provide a first radio button for the 'unselected' case, and then loop through the array using `{{for cars}}` to provide a radio button for each item.\n\nWe wrap both the initial static radio button and the buttons rendered by `{{for}}` in a `{{radiogroup}}` tag providing two-way data-link binding.",
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
            "text": "*<div class=\"close\">Data includes `cars` array:</div>*\n\n```js\nvar data = {\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    ...\n  ]\n};\n```\n\n*<div class=\"close\">{{radiogroup}} wrapping first 'unselected' radio button and additional data-driven array of radio buttons:</div>*\n\n```jsr\n{^{radiogroup selectedCar}}\n  <label><input type=\"radio\" value=\"\"/> None</label><br/>\n  {{for cars}}\n    <label><input type=\"radio\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n  {{/for}}\n{{/radiogroup}}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{radiogroup selectedCar}}\n    <label><input type=\"radio\" value=\"\"/> None</label><br/>\n    {{for cars}}\n      <label><input type=\"radio\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n    {{/for}}\n  {{/radiogroup}}\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "height": "140",
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
            "text": "*<div class=\"close\">The `cars` array (but not the `id` properties) is editable. We use the data-linked `{^{for ...}}` tag:</div>*\n\n```jsr\n{^{radiogroup selectedCar}}\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  {^{for cars}}\n    <label><input type=\"radio\" value=\"{{:id}}\"/> {^{:name}}</label>\n  {{/for}}\n{{/radiogroup}}<\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on add}\">Add car</button>\n  <table>\n    <tbody>\n      {^{for cars}}\n        <tr>\n          <td><input data-link=\"name\"/></td>\n          <td>{{:id}}</td>\n          <td><span class=\"remove\" data-link=\"{on ~root.remove #index}\"></span></td>\n        </tr>\n      {{/for}}\n    </tbody>\n  </table><br/>\n\n  {^{radiogroup selectedCar}}\n    <label><input type=\"radio\" value=\"\"/> None</label><br/>\n    {^{for cars}}\n      <label><input type=\"radio\" value=\"{{:id}}\"/> {^{:name}}</label><br/>\n    {{/for}}\n  {{/radiogroup}}<br/>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n</script>",
        "code": "var idCount = 0;\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  add: function() {\n    idCount++;\n    var id = \"car\" + idCount;\n    $.observable(this.cars).insert({id: id, name: \"name\" + idCount});\n    $.observable(this).setProperty(\"selectedCar\", id);\n  },\n  remove: function(index) {\n    $.observable(this.cars).remove(index);\n  },\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "title": "",
        "height": "330"
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; dynamic array including id (value)",
        "text": "Here we allow the user also to change the `id` value (used as key) -- which requires the more advanced data-link syntax: `value^{:id}` (see [*syntax for updating only*](#linked-elem-syntax@no-initial-render)) to update the `value` of the `<input>`s when the `id` changes.\n\nWe provide two radio button groups -- showing the alternative syntax styles -- data-linking through a `{{radiogroup}}` wrapper tag, or data-linking directly to the `<input>`s. Since both groups data-link to the same `selectedCar` property, the two-way binding keeps them in sync.",
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
            "text": "*<div class=\"close\">Two radio button groups:<br/>-- with `{{radiogroup}}`:</div>*\n\n```jsr\n{^{radiogroup selectedCar disabled=disable}}\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  {^{for cars}}\n    <label><input type=\"radio\" data-link=\"value{:id}\"/> {^{:name}}</label>\n  {{/for}}\n{{/radiogroup}}\n```\n\n*<div class=\"close\">-- and with direct data-linking to the `<input>`s:</div>*\n\n```jsr\n<label><input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selectedCar\"/> None</label>\n{^{for cars}}\n  <label><input name=\"cars\" type=\"radio\"\n    value=\"{{:id}}\" data-link=\"{:~root.selectedCar:} value^{:id} disabled{:~root.disable}\"\n  /> {^{:name}}</label>\n{{/for}}\n```\n\nSince the `id` is also editable, we are data-linking to `id`: `data-link=\"value{:id}\"`. \n\nFor the second style (data-linking directly to the `<input>`) we need to ensure that the `value` is initialized during rendering, using `value=\"{{:id}}\"` (to ensure correct initial selection of the *Ford* radio button -- based on the initial value `\"frd\"` of `selectedCar`) -- in addition to binding to subsequent changes in `id` using [`value^{:id}`](#linked-elem-syntax@no-initial-render)."
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on add}\">Add car</button>\n  <table>\n    <tbody>\n      {^{for cars}}\n        <tr>\n          <td><input data-link=\"name\"/></td>\n          <td><input data-link=\"id\"/></td>\n          <td><span class=\"remove\" data-link=\"{on ~root.remove #index}\"></span></td>\n        </tr>\n      {{/for}}\n    </tbody>\n  </table><br/>\n\n  <label><input type=\"checkbox\" data-link=\"disable\"/> Disable radio buttons</label><br/><br/>\n\n  <em>&lcub;{radiogroup&rcub;}:</em><br/><br/>\n\n  {^{radiogroup selectedCar disabled=disable}}\n    <label><input type=\"radio\" value=\"\"/> None</label><br/>\n    {^{for cars}}\n      <label><input type=\"radio\" data-link=\"value{:id}\"/> {^{:name}}</label><br/>\n    {{/for}}\n  {{/radiogroup}}<br/>\n \n  <em>Direct linking to &lt;input&gt;:</em><br/><br/>\n\n  <label><input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selectedCar\"/> None</label><br/>\n  {^{for cars}}\n    <label><input name=\"cars\" type=\"radio\"\n      value=\"{{:id}}\" data-link=\"{:~root.selectedCar:} value^{:id} disabled{:~root.disable}\"\n    /> {^{:name}}</label><br/>\n  {{/for}}\n\n  <div class=\"spanbox\" data-link=\"selectedCar||'none'\"></div>\n</script>",
        "code": "var idCount = 0;\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  add: function() {\n    idCount++;\n    var id = \"car\" + idCount;\n    $.observable(this.cars).insert({id: id, name: \"name\" + idCount});\n    $.observable(this).setProperty(\"selectedCar\", id);\n  },\n  remove: function(index) {\n    $.observable(this.cars).remove(index);\n  },\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ],\n  disable: false\n};\n\ntmpl.link(\"#result\", data);",
        "height": "460",
        "title": "",
        "anchor": "radioeditable"
      },
      {
        "_type": "para",
        "title": "Radio buttons: data-linking to enable/disable",
        "text": "The above sample also shows the use of the `{{radiogroup}}` `disabled` property, which can be used with data-linking to dynamically enable/disable the radio buttons.\n\nThe sample also shows how to data-link `disabled` when using data-linking directly to the `<input>` elements (rather than using `{{radiogroup}}`).\n",
        "anchor": "disabled"
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
            "text": "*<div class=\"close\">Define converters:</div>*\n\n```js\n$.views.converters({\n  fromId: function(val) { // convert from id to index\n    var index = -1;\n    this.tagCtx.view.data.cars.forEach(function(car, ind) {\n      if (val === car.id) {\n        index = ind;\n      }\n    });\n    return index;\n  },\n  toId: function(val) {  // convert back from index to id\n    return val === -1 ? \"\" : this.tagCtx.view.data.cars[val].id;\n}});\n```\n  \n*<div class=\"close\">Initialize the data</div>*\n\n```js\nvar data = {\n  selIndex: 1,\n  cars: [...]\n}\n```\n\n*<div class=\"close\">Data-link to `selIndex`, using the converters:</div>*\n\n```jsr\n{^{radiogroup selIndex convert=\"toId\" convertBack=\"fromId\"}}\n```\n\n*<div class=\"close\">Or, with direct linking to `<input>`s:</div>*\n\n```jsr\n...\n<input name=\"cars2\" type=\"radio\" value=\"{{:id}}\" data-link=\"{toId:~root.selIndex:fromId}\" />\n...\n```\n``` "
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <em>&lcub;{radiogroup&rcub;}:</em><br/><br/>\n\n  {^{radiogroup selIndex convert=\"toId\" convertBack=\"fromId\"}}\n    <label><input type=\"radio\" value=\"\"/> None</label><br/>\n    {^{for cars}}\n      <label><input type=\"radio\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n    {{/for}}\n  {{/radiogroup}}<br/>\n \n  <em>Direct linking to &lt;input&gt;:</em><br/><br/>\n\n  <label><input name=\"cars2\" type=\"radio\" value=\"\"\n    data-link=\"{toId:~root.selIndex:fromId}\"/> None</label><br/>\n  {^{for cars}}\n    <label><input name=\"cars2\" type=\"radio\" value=\"{{:id}}\"\n      data-link=\"{toId:~root.selIndex:fromId}\" /> {{:name}}</label><br/>\n  {{/for}}\n\n  <span class=\"spanbox\" data-link=\"selIndex\"></span> <em>Selected index</em><br/>\n  <span class=\"spanbox\"\n  data-link=\"selIndex === -1 ? 'None' : cars[selIndex].name\"></span>\n  <em>Selected car name</em>\n</script>",
        "height": "320",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selIndex: 1,\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\n$.views.converters({\n  fromId: function(val) { // convert from id to index\n    var index = -1;\n    this.tagCtx.view.ctx.root.cars.forEach(function(car, ind) {\n      if (val === car.id) {\n        index = ind;\n      }\n    });\n    return index;\n  },\n  toId: function(val) {  // convert back from index to id\n    return val === -1 ? \"\" : this.tagCtx.view.ctx.root.cars[val].id;\n}});\n\ntmpl.link(\"#result\", data);",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Data-linked checkbox groups",
        "text": "The simplest way to provide two-way data-linking to a group of checkboxes is by wrapping the `<input>`s with a [`{^{checkboxgroup ...}}`](#jsvcheckboxgrouptag) tag. \n\nAlternatively, it is also possible to [data-link directly](#link-input@checkboxgroup2waydirect) to the `<input>` elements.",
        "anchor": "checkboxgroup"
      },
      {
        "_type": "para",
        "title": "Samples in this section",
        "text": "\nThis topic includes the following checkbox group samples showing data-linked checkboxes:\n\n- Two-way data-binding, with [{{checkboxgroup}}](#link-input@checkboxgroup2way)\n- Two-way data-binding, [linking directly to the input elements](#link-input@radio2waydirect)\n- [Top-level](#link-input@topcheckboxgroupdirect) linking directly to the input elements\n- [Data-driven by array, with converters](#link-input@checkboxgroupconvert)"
      },
      {
        "_type": "para",
        "title": "Checkbox group &ndash; two-way data-binding &ndash; using {^{checkboxgroup}}  ",
        "text": "A checkbox group will generally consist of a group of `<input>` elements of type `\"checkbox\"`, each associated with a `<label>` (which either wraps the `<input>`, or references it by id, through the `for=\"inputId\"` attribute).\n\nTo data-link the checkboxes, wrap the `<input>` (and `<label>`) elements with a `{^{checkboxgroup ...}}` tag, linking to the appropriate data path such as the `selectedSports` array property on the current data object:\n\n```jsr\n{^{checkboxgroup selectedSports}}\n```\n\n(Note that when the user modifies the selection of checked checkboxes, the data property is observably *replaced* by a new array. This means that in order to observe the *length* of the array, you need to use a [deep path](#linked-paths@deep), such as `selectedSports^length` in this [example](#jsvcheckboxgrouptag@sample)).",
        "anchor": "checkboxgroup2way"
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
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar data = {\n  {selectedSports: [\"soccer\", \"running\"],\n  ...\n};\n```\n\n*<div class=\"close\">HTML:</div>*\n\n```jsr\n{^{checkboxgroup selectedSports}}\n  <label><input type=\"checkbox\" value=\"swimming\"/> Swimming</label>\n  <label><input type=\"checkbox\" value=\"running\"/> Running</label>\n  <label><input type=\"checkbox\" value=\"soccer\"/> Soccer</label>\n{{/checkboxgroup}}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{checkboxgroup selectedSports}}\n    <label><input type=\"checkbox\" value=\"swimming\"/> Swimming</label><br/>\n    <label><input type=\"checkbox\" value=\"running\"/> Running</label><br/>\n    <label><input type=\"checkbox\" value=\"soccer\"/> Soccer</label><br/>\n  {{/checkboxgroup}}\n\n  <div class=\"spanbox\">Sports:<ul>\n    {^{for selectedSports}}<li>{^{:}}</li>{{/for}}\n  </ul></div>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedSports: [\"soccer\", \"running\"]};\n\ntmpl.link(\"#result\", data);",
        "height": "190"
      },
      {
        "_type": "para",
        "title": "Checkbox group &ndash; data-binding directly to the &lt;inputs>",
        "text": "It is also possible to data-link directly to `<input>` elements, without using a `{{checkboxgroup}}` tag, by:\n\n- data-linking each `<input>` directly (each to the same data path, such as `data-link=\"selectedSports\"`, corresponding to an array of string values)\n- including a `name` attribute on each `<input>` of the group (such as `name=\"sports\"`)\n\n```jsr\n<label><input name=\"sports\" type=\"checkbox\" value=\"swimming\" data-link=\"selectedSports\"/> ...\n```\n\nNote that setting the `name` attribute was not necessary when using `{{checkboxgroup}}` -- since the `{{checkboxgroup}}` tag will automatically add a generated `name` property to each `<input>`, if none has been specified).",
        "anchor": "checkboxgroup2waydirect"
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
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar data = {\n  {selectedSports: [\"soccer\", \"running\"],\n  ...\n};\n```\n\n*<div class=\"close\">HTML:</div>*\n\n```jsr\n<label><input name=\"sports\" type=\"checkbox\" value=\"swimming\" data-link=\"selectedSports\"/> Swimming ...\n<label><input name=\"sports\" type=\"checkbox\" value=\"running\" data-link=\"selectedSports\"/> Running ...\n<label><input name=\"sports\" type=\"checkbox\" value=\"soccer\" data-link=\"selectedSports\"/> Soccer ...\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <label><input name=\"sports\" type=\"checkbox\" value=\"swimming\" data-link=\"selectedSports\"/> Swimming</label><br/>\n  <label><input name=\"sports\" type=\"checkbox\" value=\"running\" data-link=\"selectedSports\"/> Running</label><br/>\n  <label><input name=\"sports\" type=\"checkbox\" value=\"soccer\" data-link=\"selectedSports\"/> Soccer</label><br/>\n\n  <div class=\"spanbox\">Sports:<ul>\n    {^{for selectedSports}}<li>{^{:}}</li>{{/for}}\n  </ul></div>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedSports: [\"soccer\", \"running\"]};\n\ntmpl.link(\"#result\", data);",
        "height": "190",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Top-level data-linking of checkbox groups",
        "text": "For [top-level data-linking](#toplink), there are two alternatives:\n\n- Top-level `{checkboxgroup}` binding shown [here](#jsvcheckboxgrouptag@top-checkboxgroup)\n- Top-level data-linked `<input>` elements (using direct data-linking as in the previous example), shown in the following sample:\n",
        "anchor": "topcheckboxgroup"
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
            "text": "```jsr\n<div id=\"top-level-linked\">\n  <label><input name=\"sports\" type=\"checkbox\" value=\"swimming\" data-link=\"selectedSports\"/> Swimming ...\n  ...\n```\n\n```js\nvar data = {selectedSports: [\"soccer\", \"running\"]};\n...\n$.link(true, \"#top-level-linked\", data);\n```"
          }
        ],
        "html": "<div id=\"top-level-linked\">\n  <label><input name=\"sports\" type=\"checkbox\" value=\"swimming\" data-link=\"selectedSports\"/> Swimming</label><br/>\n  <label><input name=\"sports\" type=\"checkbox\" value=\"running\" data-link=\"selectedSports\"/> Running</label><br/>\n  <label><input name=\"sports\" type=\"checkbox\" value=\"soccer\" data-link=\"selectedSports\"/> Soccer</label><br/>\n\n  <div class=\"spanbox\">Sports:\n    <ul data-link=\"{for selectedSports tmpl='liItem'}\"></ul>\n  </div>\n</div>",
        "code": "var data = {selectedSports: [\"soccer\", \"running\"]};\n\n$.views.templates(\"liItem\", \"<li>{^{:}}</li>\");\n\n$.link(true, \"#top-level-linked\", data);",
        "title": "Top-level data-linked &lt;input> elements",
        "height": "190",
        "anchor": "topcheckboxgroupdirect"
      },
      {
        "_type": "para",
        "title": "Checkbox group &ndash; in {{for}} loop with array",
        "text": "A common scenario is when the options in a checkbox group come from a data array. The `<input type=\"checkbox\">` elements can be generated by a `{{for}}` tag (whether using direct data-linking on the `<input>`s, or wrapping with a `{^{checkboxgroup}}`).\n\nSee the analogous discussion for [*Radio buttons in a {{for}} loop*](#link-input@radioarray) (along with the subsequent sections and examples, which could all be applied similarly to checkbox groups).\n\nThe next sample (below) will show data-driven checkbox groups, along with the use of converters.",
        "anchor": "checkboxgrouparray"
      },
      {
        "_type": "para",
        "title": "Checkbox groups &ndash; with converters",
        "text": "In this example we use *convert* and *convert back* converters to convert from an array of integers -- the indices of the items in the `sports` array, to an array of strings -- the `id` values, and back.\n\nWe also show this both for the `{{checkboxgroup}}` approach and for direct data-linking to the `<input>`s, as well as the corresponding `<select multiple>` UI.",
        "anchor": "checkboxgroupconvert"
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
            "text": "*<div class=\"close\">Define converters:</div>*\n\n```js\n$.views.converters({\n  fromId: function(ids) { // convert from array of id strings to array of indices\n    var sports = this.tagCtx.view.ctx.root.sports,\n      indices = ids.map(function(id) { // get indices array\n        ...\n      });\n\n    return indices; // return indices array\n  },\n  toId: function(indices) {  // convert back from array of indices to array of ids\n    var sports = this.tagCtx.view.ctx.root.sports,\n      ids =indices.map(function(ind) { // ids array\n        ...\n      });\n  \n    return ids; // return ids array\n  }\n});\n```\n  \n*<div class=\"close\">Initialize the data</div>*\n\n```js\nvar data = {\n  disabled: false,\n  selSports: [0, 2], // array of integers - the indices of the items in the sports array\n  sports: [\n    {id: \"swimming\", name: \"Swimming\"},\n    ...\n  ]\n};\n```\n\n*<div class=\"close\">Data-link to `selSports` array, using the converters:</div>*\n\n```jsr\n{^{checkboxgroup selSports convert=\"toId\" convertBack=\"fromId\" disabled=disable}}\n```\n\n*<div class=\"close\">Or, with direct linking to `<input>`s:</div>*\n\n```jsr\n...\n<input name=\"sports\" type=\"checkbox\" value=\"{{:id}}\" data-link=\"{toId:~root.selSports:fromId} ... \" />\n...\n```\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <em>&lcub;{checkboxgroup&rcub;}:</em><br/><br/>\n\n  {^{checkboxgroup selSports convert=\"toId\" convertBack=\"fromId\" disabled=disable}}\n    {^{for sports}}\n      <label><input type=\"checkbox\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n    {{/for}}\n  {{/checkboxgroup}}<br/>\n \n  <em>Direct linking to &lt;input&gt;:</em><br/><br/>\n\n  {^{for sports}}\n    <label><input name=\"sports\" type=\"checkbox\" value=\"{{:id}}\"\n      data-link=\"{toId:~root.selSports:fromId} disabled{:~root.disable}\" /> {{:name}}</label><br/>\n  {{/for}}<br/>\n\n  <em>&lt;select multiple ...&gt;:</em><br/><br/>\n\n  <select multiple data-link=\"disabled{:disable} {toId:selSports:fromId} size{:sports.length}\">\n    {^{for sports}}\n      <option data-link=\"value{:id}\">{{:name}}</option>\n    {{/for}}\n  </select><br/><br/>\n\n  <label><input type=\"checkbox\" data-link=\"disable\"/> Disable checkboxes and select</label><br/><br/>\n\n  <div class=\"spanbox\"><em>Selected indices</em><ul>\n    {^{for selSports}}<li>{^{:}}</li>{{/for}}\n  </ul></div>\n\n  <div class=\"spanbox\"><em>Selected sport names</em><ul>\n    {^{for selSports}}<li>{^{:~root.sports[#data].name}}</li>{{/for}}\n  </ul></div>\n</script>",
        "height": "460",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  disabled: false,\n  selSports: [0, 2], // array of integers - the indices of the items in the sports array\n  sports: [\n    {id: \"swimming\", name: \"Swimming\"},\n    {id: \"climbing\", name: \"Mountain climbing\"},\n    {id: \"running\", name: \"Running\"}\n  ]\n};\n\n$.views.converters({\n  fromId: function(ids) { // convert from array of id strings to array of indices\n    var sports = this.tagCtx.view.ctx.root.sports,\n      indices = ids.map(function(id) { // get indices array\n        var indx;\n        sports.forEach(function(sport, ind) {\n          if (id === sport.id) {\n            indx = ind;\n            return;\n          }\n        });\n        return indx;\n      });\n\n    return indices; // return indices array\n  },\n  toId: function(indices) {  // convert back from array of indices to array of ids\n    var sports = this.tagCtx.view.ctx.root.sports,\n      ids =indices.map(function(ind) { // ids array\n        return sports[ind].id;\n      });\n  \n    return ids; // return ids array\n  }\n});\n\ntmpl.link(\"#result\", data);",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Checkboxes: data-linking to enable/disable",
        "text": "The above sample also shows the use of the `{{checkboxgroup}}` `disabled` property, which can be used with data-linking to dynamically enable/disable the checkboxes.\n\nThe sample also shows how to data-link `disabled` when using data-linking directly to the `<input>` elements (rather than using `{{checkboxgroup}}`).\n",
        "anchor": "checkboxgroupdisabled"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsvradiogrouptag",
            "label": "The {^{radiogroup}} tag"
          },
          {
            "_type": "topic",
            "hash": "jsvcheckboxgrouptag",
            "label": "The {^{checkboxgroup}} tag"
          },
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
            "hash": "samples/tag-controls/validate",
            "label": "Validate tag control samples"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls/jqui/toolbar",
            "label": "jQuery UI toolbar samples"
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
        "text": "This section shows data-linking to `<select>` elements:\n\n- [Two-way data-binding](#link-select@2way)\n- Data-driven by [array](#link-select@array) data (in a `{{for}}` loop)\n- Data-driven by an [editable array](#link-select@edit) (in a `{^{for}}` loop)\n- Using [converters](#link-select@convert)\n- [Multiple selection](#link-select@multiple)\n- [Cascading selects](#link-select@cascade)"
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: two-way data-binding",
        "text": "The `<selects>`s are data-linked to the `selectedCar` property (one a drop-down and the other a listbox: `size=\"3\"`). \n\nChanging selection on one `<select>` triggers the corresponding selection change on the other, thanks to two-way binding to the `selectedCar` property:\n",
        "anchor": "2way"
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
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar data = {\n  selectedCar: \"frd\",\n  ...\n};\n```\n\n*<div class=\"close\">HTML:</div>*\n\n```jsr\n<select data-link=\"selectedCar\">\n  <option value=\"\">Choose a car</option>\n  <option value=\"vlv\">Volvo</option>\n  <option value=\"frd\">Ford</option>\n</select>\n```\n\n```jsr\n<select data-link=\"selectedCar\" size=\"3\">\n  <option value=\"\">Choose a car</option>\n  <option value=\"vlv\">Volvo</option>\n  <option value=\"frd\">Ford</option>\n</select>\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <select data-link=\"selectedCar\">\n    <option value=\"\">Choose a car</option>\n    <option value=\"vlv\">Volvo</option>\n    <option value=\"frd\">Ford</option>\n  </select><br/><br/>\n\n  <select data-link=\"selectedCar\" size=\"3\">\n    <option value=\"\">Choose a car</option>\n    <option value=\"vlv\">Volvo</option>\n    <option value=\"frd\">Ford</option>\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedCar: \"frd\"};\n\ntmpl.link(\"#result\", data);",
        "height": "150",
        "title": ""
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: &lt;option&gt;s in {{for}} loop with array",
        "text": "A `cars` array has values for the displayed `name` and the corresponding `id` (used as *key*, and data-linked to the `selectedCar` property). We loop through the array using `{{for cars}}`, to create an `<option>` for each car.",
        "anchor": "array"
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
            "text": "*<div class=\"close\">Data includes `cars` array:</div>*\n\n```js\nvar data = {\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    ...\n  ]\n};\n```\n\n*<div class=\"close\">The first `<option>` has the 'unselected' value: `\"\"`. The following `<option>s` are in a `{{for}}` loop:</div>*\n\n```jsr\n<select data-link=\"selectedCar\" size=\"4\">\n  <option value=\"\">Choose a car</option>\n  {^{for cars}}\n    <option value=\"{{:id}}\">{{:name}}</option>\n  {{/for}}\n</select>\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <select data-link=\"selectedCar\" size=\"4\">\n    <option value=\"\">Choose a car</option>\n    {^{for cars}}\n      <option value=\"{{:id}}\">{{:name}}</option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span><br/>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "height": "130",
        "title": ""
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: &lt;option&gt;s in {^{for}} loop with dynamic array",
        "text": "In this example we allow the user to add and remove items from the array, and to change values such as `name` and `id` (the key).",
        "anchor": "edit"
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
            "text": "*<div class=\"close\">The `cars` array is editable. Using data-linked tags: `{^{...}}`:</div>*\n\n```jsr\n<select data-link=\"{:selectedCar:} size{:cars.length + 1}\">\n  <option value=\"\">Choose a car</option>\n  {^{for cars}}\n    <option data-link=\"value{:id} {:name}\"></option>\n  {{/for}}\n</select>\n```\n\nNote that `<option data-link=\"value{:id} {:name}\"></option>` data-links the `value` to `id` and innerText to `name`. We could alternatively have written `<option data-link=\"value{:id}\">{^{>name}}</option>`."
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on add}\">Add car</button>\n  <table>\n    <tbody>\n      {^{for cars}}\n        <tr>\n          <td><input data-link=\"name\"/></td>\n          <td><input data-link=\"id\"/></td>\n          <td><span class=\"remove\" data-link=\"{on ~root.remove #index}\"></span></td>\n        </tr>\n      {{/for}}\n    </tbody>\n  </table><br/>\n\n  <select data-link=\"{:selectedCar:} size{:cars.length + 1}\">\n    <option value=\"\">Choose a car</option>\n    {^{for cars}}\n      <option data-link=\"value{:id} {:name}\"></option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span><br/>\n</script>",
        "code": "var idCount = 0;\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  add: function() {\n    idCount++;\n    var id = \"car\" + idCount;\n    $.observable(this.cars).insert({id: id, name:\"name\"});\n    $.observable(this).setProperty(\"selectedCar\", id);\n  },\n  remove: function(index) {\n    $.observable(this.cars).remove(index);\n  },\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "height": "330",
        "title": ""
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: with converters",
        "text": "In this last example we use *convert* and *convert back* converters to convert from the `selIndex`, the index of the selected option, to the value of the `id` key, and back. ",
        "anchor": "convert"
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
            "text": "*<div class=\"close\">Define converters:</div>*\n\n```js\n$.views.converters({\n  fromId: function(val) { // convert from id to index\n    var index = -1;\n    this.ctx.root.cars.forEach(function(car, ind) {\n      if (val === car.id) {\n        index = ind;\n      }\n    });\n    return index;\n  },\n  toId: function(val) {  // convert back from index to id\n    return val === -1 ? \"\" : this.ctx.root.cars[val].id;\n  }\n});\n```\n\n*<div class=\"close\">Initialize the data</div>*\n\n```js\nvar data = {\n  selIndex: 1,\n  cars: [...]\n}\n```\n\n*<div class=\"close\">Data-link to `selIndex`, using the converters:</div>*\n\n```jsr\n<select data-link=\"{toId:selIndex:fromId}\" size=\"4\">\n  <option value=\"\">Choose a car</option>\n  {^{for cars}}\n    <option data-link=\"value{:id} {:name}\"></option>\n  {{/for}}\n</select>\n``` "
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <select data-link=\"{toId:selIndex:fromId}\" size=\"4\">\n    <option value=\"\">Choose a car</option>\n    {^{for cars}}\n      <option data-link=\"value{:id} {:name}\"></option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"selIndex\"></span><br/>\n  <span class=\"spanbox\" data-link=\"selIndex === -1 ? 'None' : cars[selIndex].name\"></span>\n</script>",
        "height": "170",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selIndex: 1,\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\n$.views.converters({\n  fromId: function(val) {\n    var index = 1;\n    this.ctx.root.cars.forEach(function(car, ind) {\n      if (val === car.id) {\n        index = ind;\n      }\n    });\n    return index;\n  },\n  toId: function(val) {\n    return val === -1 ? \"\" : this.ctx.root.cars[val].id;\n  }\n});\n\ntmpl.link(\"#result\", data);",
        "title": ""
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: with multiple selection",
        "text": "If the multiple attribute is set, data-linking is to an array of strings (option values). \n\nConverters could be used to convert to other data formats, such as an array of indices, or an array of objects (see for example [this sample](#samples/tag-controls/multiselect@selectmultiple)).",
        "anchor": "multiple"
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
            "text": "*<div class=\"close\">Initialize the data (with `selectedCar` property as an array of strings):</div>*\n\n```js\nvar data = {\n  selectedCar: [\"rnl\", \"frr\"],\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    ...\n  ]\n}\n```\n\n*<div class=\"close\">Data-link to `selectedCar` array):</div>*\n\n```jsr\n<select data-link=\"selectedCar\" multiple ...>\n  {^{for cars}}\n    <option data-link=\"value{:id} {:name}\"></option>\n  {{/for}}\n</select>\n```"
          }
        ],
        "html": "<style>select {margin: 10px 0;}</style>\n\n<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <em>Choose one or more cars:</em><br/>\n\n  <select data-link=\"selectedCar\" size=\"5\" multiple>\n    {^{for cars}}\n      <option data-link=\"value{:id} {:name}\"></option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\">\n    {^{for selectedCar}}{{:}} {{else}}<em>None</em>{{/for}}\n  </span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedCar: [\"rnl\", \"frr\"],\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"rnl\", name: \"Renault\"},\n    {id: \"frr\", name: \"Ferrari\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "height": "186"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the [*{{multisel}} tag control*](#samples/tag-controls/multiselect) sample."
      },
      {
        "_type": "para",
        "title": "Cascading &lt;select&gt;s: dynamic selection of subcategory items in child &lt;select&gt;",
        "text": "A common scenario is two or more `<select>` listboxes or drop-downs to allow the user to drill down into categories and sub-categories, such as choosing a make of car, then choose a model from that manufacturer, then choose among options for the chosen model, etc.\n\nThe following three samples illustrate different approaches to the same scenario, which permit to highlight different techniques, and to use different data modelling.\n\nIn the first example, the data is hierarchical -- a `makes` array of `make` objects, each with a `models` hash: \n\n```js\nmakes: [\n  {\n    id: \"vlv\",\n    name: \"Volvo\",\n    models: {xc90: \"XC90 Estate\", ... }\n  }, {\n    id: \"frd\",\n    ...\n```",
        "anchor": "cascade"
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
            "text": "Choosing a make in the first listbox sets `data.make` to the index of the chosen *make* object in the `makes` array:\n\n```jsr\n<select data-link=\"make\">\n  <option value=\"\">Choose a make</option>\n  {^{for makes}}\n    <option value=\"{{:#index}}\">{{:name}}</option>\n  {{/for}}\n</select>\n```\n\nThe second listbox selects the model `key` in the `models` hash of the chosen make:\n\n```jsr\n<select data-link=\"{:model:}...\">\n  <option value=\"\">Choose a model</option>\n  {^{props makes[make].models}}\n    <option value=\"{{:key}}\">{{:prop}}</option>\n  {{/props}}\n</select>\n```\n\nThe `{^{props makes[make].models}}` tag iterates over the `makes` array. Thanks to the `make` dependency in the expression, it contents (the `<options>`) are updated when `make` changes observably (changes to the selection in the first listbox). \n\nIn addition, changes to `make` are 'observed' by the following code:\n\n```js\n$.observe(data, \"make\", function(ev, eventArgs) {\n  // When make changes, initialize selected model to the first in models hash\n  ...\n  $.observable(data).setProperty({model: firstKey ...});\n  ...\n});\n```\n\n-- which sets initial selection to the first model in the second listbox."
          }
        ],
        "title": "",
        "code": "var data = {\n  makes: [\n    {\n      id: \"vlv\",\n      name: \"Volvo\",\n      models: {xc90: \"XC90 Estate\", v60: \"V60 Cross Country\", s90: \"S90 Hybrid\" }\n    }, {\n      id: \"frd\",\n      name: \"Ford\",\n      models: { fm: \"Mustang\", ff: \"Fiesta\", ft: \"Taurus\", fe: \"Expedition\" }\n    }, {\n      id: \"hnd\",\n      name: \"Honda\",\n      models: { hc: \"Civic Si\", ho: \"Odyssey\", ha: \"Accord\" }\n    }\n  ],\n  make: \"\",\n  model: \"\"\n};\n\n$.observe(data, \"make\", function(ev, eventArgs) {\n  // When make changes, initialize selected model to the first in models hash\n  // Also, update modelCount for the new make\n  var key, firstKey,\n    make = data.makes[eventArgs.value],\n    count = 1;\n  if (make) {\n    for (key in make.models) {\n      firstKey = firstKey || key;\n      count++;\n    }\n    $.observable(data).setProperty({model: firstKey, modelCount: count});\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\ntmpl.link(\"#result\", data);\n",
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n\n<div class=\"floatleft\">\n  <select data-link=\"make\" size=\"4\">\n    <option value=\"\">Choose a make</option>\n    {^{for makes}}\n      <option value=\"{{:#index}}\">{{:name}}</option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"make && makes[make].name || 'none...'\"></span>\n</div>\n\n{^{if makes[make]}}\n  <div class=\"floatleft\">\n    <select data-link=\"{:model:} size{:modelCount}\">\n      <option value=\"\">Choose a model</option>\n      {^{props makes[make].models}}\n        <option value=\"{{:key}}\">{{:prop}}</option>\n      {{/props}}\n    </select><br/>\n\n    <span class=\"spanbox\" data-link=\"makes[make].models[model] || 'none...'\"></span>\n  </div>\n{{/if}}\n</script>",
        "height": "150",
        "header": "<style>select {margin: 5px 20px 0 0;}</style>",
        "action": "append"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the second example, the data has a separate array of makes, and a flat array of all car models: \n\n```js\nvar data = {\nmakes: [\n  {id: \"vlv\", name: \"Volvo\"},\n  {id: \"frd\", name: \"Ford\"},\n  ...\n],\ncars: [\n  {make: \"vlv\", id: \"xc90\", name: \"XC90 Estate\"},\n  {make: \"vlv\", id: \"v60\", name: \"V60 Cross Country\"},\n  ...\n  {make: \"frd\", id: \"fm\", name: \"Mustang\"},\n  ...\n]\n```"
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
            "text": "Choosing a make in the first listbox sets `data.make` to the `id` of the chosen *make* object in the `makes` array:\n\n```jsr\n<select data-link=\"make\">\n  <option value=\"\">Choose a make</option>\n  {^{for makes}}\n    <option value=\"{{:id}}\">{{:name}}</option>\n  {{/for}}\n  </select>\n```\n\nThe second listbox selects the `data.model` object in the `cars` array (using converters to get from the selected `model` object to the `id` used as `value` on the `<option>` tags, or to get from the `id` to the `model`):\n\n```jsr\n<select data-link=\"{toId:model:fromId} size{:models^length+1}\">\n  <option value=\"\">Choose a model</option>\n  {^{for models}}\n    <option value=\"{{:id}}\">{{:name}}</option>\n  {{/for}}\n</select>\n```\n\nHere, `{^{for models}}` iterates over `data.models`, which is a filtered `cars` array with just the models for the chosen make.\n\nThe following code observes changes in `data.make` to trigger an updated `data.models` filtered array, as well as choosing the first model in the models array for initial *model* selection:\n\n```js\n$.observe(data, \"make\", function(ev, eventArgs) {\n  // When make changes, set the models array, filtered by the make\n  // and initialize selected model to the first in the array\n  var models = data.cars.filter(function(model) {\n    return model.make === eventArgs.value;\n  });\n\n  $.observable(data).setProperty({\n    models: models,  // set filtered models array\n    model: models[0] // select first model\n  });\n});\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n<div class=\"floatleft\">\n  <select data-link=\"make\" size=\"4\">\n    <option value=\"\">Choose a make</option>\n    {^{for makes}}\n      <option value=\"{{:id}}\">{{:name}}</option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"{toMake:make}\"></span>\n</div>\n\n{^{if make}}\n  <div class=\"floatleft\">\n    <select data-link=\"{toId:model:fromId} size{:models^length+1}\">\n      <option value=\"\">Choose a model</option>\n      {^{for models}}\n        <option value=\"{{:id}}\">{{:name}}</option>\n      {{/for}}\n    </select><br/>\n\n    <span class=\"spanbox\" data-link=\"model ? model.name : 'none...'\"></span>\n  </div>\n{{/if}}\n</script>",
        "code": "var data = {\n  makes: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ],\n  cars: [\n    {make: \"vlv\", id: \"xc90\", name: \"XC90 Estate\"},\n    {make: \"vlv\", id: \"v60\", name: \"V60 Cross Country\"},\n    {make: \"vlv\", id: \"s90\", name: \"S90 Hybrid\"},\n    {make: \"frd\", id: \"fm\", name: \"Mustang\"},\n    {make: \"frd\", id: \"ff\", name: \"Fiesta\"},\n    {make: \"frd\", id: \"ft\", name: \"Taurus\"},\n    {make: \"frd\", id: \"fe\", name: \"Expedition\"},\n    {make: \"hnd\", id: \"hc\", name: \"Civic Si\"},\n    {make: \"hnd\", id: \"ho\", name: \"Odyssey\"},\n    {make: \"hnd\", id: \"ha\", name: \"Accord\"}\n  ],\n  make: \"\",\n  model: null\n};\n\n$.views.converters({\n  fromId: function(id) {\n    // Get the car object with a given id\n    var car,\n      l = data.cars.length;\n    if (id) {\n      while (l--) {\n        car = data.cars[l]\n        if (id === car.id) {\n         return car;\n        }\n      }\n    }\n    return null;\n  },\n  toId: function(model) {\n    // Get the id for a given car object\n    return model ? model.id : \"\";\n  },\n  toMake: function(id) {\n    // Get the make name for car object with a given id\n    var car,\n      l = data.makes.length;\n    if (id) {\n      while (l--) {\n        make = data.makes[l]\n        if (id === make.id) {\n         return make.name;\n        }\n      }\n    }\n    return \"none...\";\n  }\n});\n\n$.observe(data, \"make\", function(ev, eventArgs) {\n  // When make changes, set the models array, filtered by the make\n  // and initialize selected model to the first in the array\n  var models = data.cars.filter(function(model) {\n    return model.make === eventArgs.value;\n  });\n\n  $.observable(data).setProperty({\n    models: models,  // set filtered models array\n    model: models[0] // select first model\n  });\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\ntmpl.link(\"#result\", data);\n",
        "height": "150",
        "action": "append",
        "header": "<style>select {margin: 5px 20px 0 0;}</style>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The third example is similar to the second, but introduces some alternative techniques which can be of interest:"
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
            "text": "Here the data and the first listbox implementation are the same as the previous sample.\n\nHowever the second listbox uses a helper function to compute the filtered array of models for the selected make:\n\n```jsr\n{^{if make ~models=~models(make)}}\n\n  <select data-link=\"{:model ...:} size{:~models.length+1}\">\n    <option value=\"\">Choose a model</option>\n    {^{for ~models onAfterLink=~setModel}}\n      <option value=\"{{:id}}\">{{:name}}</option>\n    {{/for}}\n  </select>\n```\n\nThis version uses another approach to observing when the *make* changes, and setting the initial model selection on the first model in the list. Here, rather than using `$.observe(data, \"make\", ...)`, we instead provide a `~setModel` helper as [`onAfterLink`](#tagoptions@onafterlink) handler:\n\n```jsr\n{^{for ~models onAfterLink=~setModel}}\n```\n\nThe effect of this is that whenever the `{^{for ~models}}` `<options>` list is updated, the `~setModel` helper is then called.\n\nAnother minor change from the previous sample is that here we use helpers as converters, rather than registering named converters. So our complete set of helpers is as follows:\n\n```js\nvar helpers = {\n  models: function(make) {\n    // Contextual parameter: models array filtered by the make\n    return data.cars.filter(function(model) {\n      return model.make === make;\n    });\n  },\n  setModel: function(tagCtx) {\n    // onAfterLink event for {{for}} tag rendering models options, triggered when make changes.\n    // tagCtx.args[0] is the ~carsForMake array. Initialize selected model to the first one in the array\n    $.observable(data).setProperty({model: tagCtx.args[0][0]});\n  },\n  cvt: ...,\n  toId: ...,\n  toMake: ...\n}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n<div class=\"floatleft\">\n  <select data-link=\"make\" size=\"4\">\n    <option value=\"\">Choose a make</option>\n    {^{for makes}}\n      <option value=\"{{:id}}\">{{:name}}</option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"make convert=~cvt.toMake\"></span>\n</div>\n\n{^{if make ~models=~models(make)}}\n\n  <div class=\"floatleft\">\n    <select data-link=\"{:model convert=~cvt.toId convertBack=~cvt.fromId:} size{:~models.length+1}\">\n      <option value=\"\">Choose a model</option>\n      {^{for ~models onAfterLink=~setModel}}\n        <option value=\"{{:id}}\">{{:name}}</option>\n      {{/for}}\n    </select><br/>\n\n    <span class=\"spanbox\" data-link=\"model ? model.name : 'none...'\"></span>\n  </div>\n\n{{/if}}\n</script>",
        "code": "var data = {\n  makes: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ],\n  cars: [\n    {make: \"vlv\", id: \"xc90\", name: \"XC90 Estate\"},\n    {make: \"vlv\", id: \"v60\", name: \"V60 Cross Country\"},\n    {make: \"vlv\", id: \"s90\", name: \"S90 Hybrid\"},\n    {make: \"frd\", id: \"fm\", name: \"Mustang\"},\n    {make: \"frd\", id: \"ff\", name: \"Fiesta\"},\n    {make: \"frd\", id: \"ft\", name: \"Taurus\"},\n    {make: \"frd\", id: \"fe\", name: \"Expedition\"},\n    {make: \"hnd\", id: \"hc\", name: \"Civic Si\"},\n    {make: \"hnd\", id: \"ho\", name: \"Odyssey\"},\n    {make: \"hnd\", id: \"ha\", name: \"Accord\"}\n  ],\n  make: \"\",\n  model: null\n};\n\nvar helpers = {\n  models: function(make) {\n    // models array (cars filtered by the make) provided as contextual ~models parameter, \n    return data.cars.filter(function(model, index, array) {\n      return model.make === make;\n    });\n  },\n  setModel: function(tagCtx) {\n    // onAfterLink event for {{for}} tag rendering models options, triggered when make changes.\n    // tagCtx.args[0] is the ~models array. Initialize selected model to the first one in the array\n    $.observable(data).setProperty({model: tagCtx.args[0][0]});\n  },\n  cvt: {\n    // Converter helpers. (We could alternatively have registered named converters)\n    fromId: function(id) {\n      // Get the car object with a given id\n      var car,\n        l = data.cars.length;\n      if (id) {\n        while (l--) {\n          car = data.cars[l]\n          if (id === car.id) {\n            return car;\n          }\n        }\n      }\n      return null;\n    },\n    toId: function(model) {\n      // Get the id for a given car object\n      return model ? model.id : \"\";\n    },\n    toMake: function(id) {\n      // Get the make name for car object with a given id\n      var car,\n        l = data.makes.length;\n      if (id) {\n        while (l--) {\n          make = data.makes[l]\n          if (id === make.id) {\n            return make.name;\n          }\n        }\n      }\n      return \"none...\";\n    }\n  }\n};\n\nvar tmpl = $.templates(\"#tmpl\");\n\ntmpl.link(\"#result\", data, helpers);",
        "height": "150",
        "header": "<style>select {margin: 5px 20px 0 0;}</style>",
        "action": "append"
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
            "hash": "samples/tag-controls/validate",
            "label": "Validate tag control samples"
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
        "text": "The following sample shows data-linked textboxes, with two-way binding, one-way binding, and use of converters (*convert* and *convert back*)."
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
        "height": "450",
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
            "hash": "samples/tag-controls/validate",
            "label": "Validate tag control samples"
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
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{on ~changeName}}Change name{{/on}}\n  <input data-link=\"name\" /><br/><br/>\n\n  <div data-link=\"name\"></div>\n  <div data-link=\"text{:name}\"></div>\n  <div data-link=\"html{:name}\"></div>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo <b>Blow</b>\"};\nvar swapped = false;\n\ntmpl.link(\"#result\", person, {changeName: function() {\n  swapped = !swapped;\n  $.observable(person).setProperty(\"name\", swapped ? \"Jethro <em>Tull</em>\" : \"Jo <b>Blow</b>\");\n}});"
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
        "text": "The most common data-link expression for a data-linked element is a data path, such as:\n\n```jsr\n<div data-link=\"address.street\"></div>...\n```\n\n-- which is actually abbreviated syntax, and is equivalent to the full syntax:\n\n```jsr\n<div data-link=\"{:address.street}\"></div>...\n```\n\nIn fact this example is using the default target of `innerText`, and is equivalent to the even more explicit syntax:\n\n```jsr\n<div data-link=\"text{:address.street}\"></div>...\n```\n\nFor explanation and examples of the full syntax see the *[Data-linked elements (full syntax)](#linked-elem-syntax@fullsyntax)* topic.\n\nOur example, `data-link=\"{:address.street}\"` corresponds to the JsViews tag `{^{:address.street}}`.\n\nSimilarly we can data-link not only to `{^{:...}}` but to ***any*** tag, such as:\n\n```jsr\n{^{>...}}, {^{for...}}, {^{if}}, {^{on}}, {^{slider}}, {^{mytag}} etc.\n```\n\nFor example to use `{^{mytag .../}}` as an element binding, you simply remove the initial `{^` and the last `}`, and optionally specify a target, such as `title`:\n\n```jsr\ndata-link=\"title{mytag ...}\"\n```\n\nA data-linked element can use multiple bindings, each of which has a target and a link expression, and where the link expression corresponds to a data-linked JsViews/JsRender tag:\n\n```jsr\ndata-link=\"target1{linkExpression1} target2{linkExpression2}\" ...\n```\n\nExamples of tags are:\n\n```jsr\n{^{:age}}\n{^{>name}}\n{^{slider age/}}\n{^{if age < 15}}Child{{else age > 65}}Senior{{else}}Adult{{/if}}\n{^{for phones}}...{{/for}}\n{^{on increaseAge}}Increase Age{{/on}}\n{^{mytag person.name/}} \n```\n\nThe following examples show the same tags used as link expressions for data-linking elements:\n\n```jsr\n<div data-link=\"age\"></div>\n<div data-link=\"name\"></div>\n<div data-link=\"{slider age}\"></div>\n<span data-link=\"{if age < 15 tmpl='Child'}{else age > 65 tmpl='Senior'}{else tmpl='Adult'}\"></span>\n<div data-link=\"{for phones tmpl='#phonesTmpl'}\"></div>\n<button data-link=\"{on increaseAge}\">Increase Age</button>\n<div data-link=\"{mytag person.name}\"></div>\n```\n\nAnd the following example shows two bindings, one using the default target, and binding to a `{^{slider}}` tag and the other targeting the CSS `background` property of the `div`, and binding to an `{^{if ...}}}{{else ...}}{{else}}` tag:\n \n```jsr\n<div data-link=\"{slider age}\n css-background{if ... tmpl='green'}{else ... tmpl='red'}{else tmpl='blue'}\"></div>\n```"
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
            "text": "A top-level `<div>` is data-linked to a slider (two-way binding to `age`).\n\nIn addition, its background color is also data-linked to `age`, using an `{if}{else}` binding:\n\n```jsr\n<div data-link=\"\n  {slider age ...}\n\n  css-background{if age < 15 tmpl='green'}\n  {else age > 65 tmpl='red'}\n  {else tmpl='blue'}\n\"></div>\n```\n\nA top-level `<span>` is also data-linked to `age` -- but here instead of using an `{if}{else}` binding, we use the alternative approach of a `{:}` binding with a converter:\n\n```jsr\n<span data-link=\"{ageCat:age}\"></span>\n```\n\nwhere the converter allows us to provide equivalent if/else semantics, in code:\n\n```js\n$.views.converters(\"ageCat\", function(val) {\n  var category;\n  if (val < 15) {\n     category = \"Child\";\n  } else if (val > 65) {\n     category = \"Senior\";\n  } else {\n     category = \"Adult\";\n  }\n  return val + \" (\" + category + \")\";\n});\n```"
          }
        ],
        "html": "<div id=\"topLevel\">\n\n  <br/>\n\n  <div data-link=\"\n    {slider age _max=99 width='50%'}\n\n    css-background{if age < 15 tmpl='green'}\n    {else age > 65 tmpl='red'}\n    {else tmpl='blue'}\n  \"></div>\n\n  <br/>\n\n  <label>Age:</label>\n  <span data-link=\"{ageCat:age}\"></span>\n\n</div>\n",
        "code": "var person = {age: 23};\n\n$.views.converters(\"ageCat\", function(val) {\n  var category;\n  if (val < 15) {\n     category = \"Child\";\n  } else if (val > 65) {\n     category = \"Senior\";\n  } else {\n     category = \"Adult\";\n  }\n  return val + \" (\" + category + \")\";\n});\n\n$.link(true, \"#topLevel\", person);",
        "jsrJsvJqui": "jqui",
        "height": "90",
        "title": "tag binding examples",
        "anchor": "bindings-sample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following sample illustrates how any tags can be used within a template with either tag syntax or data-linked element syntax (tag bindings).\n\nThe identical data-linked element syntax can also be used for binding [top-level data-linking](#toplink) elements.\n\nIn all three situations, the resulting rendering and interactivity are the same.\n\n"
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
            "text": "Tag syntax within a template:\n\n```jsr\n{^{on increaseAge}}Increase Age{{/on}}\n{^{for phones}}\n  <div>{^{if cell}}Home{{else}}Cell{{/if}}...</div>\n{{/for}}\n{^{slider age/}}\n...\n({^{if ...}}...{{else ...}}...{{else}}...{{/if}})\n{^{summary/}}\n```\n\nData-linked element syntax (tag bindings) either within a template or on top-level elements:\n\n```jsr\n<button data-link=\"{on increaseAge}\">Increase Age</button>\n<div data-link=\"{for phones tmpl='#phonesTmpl'}\"></div>\n<div data-link=\"{slider age}\"></div>\n...\n<span data-link=\"{if ...}{else ...}{else ...}\"></span>\n<div data-link=\"{summary}\"></div>\n```\n\nCode to set up data-linking:\n\n```js\ntmpl.link(\"#result\", person); // Data-linked template\n\n$.link(true, \"#topLevel\", person); // Data-linked top-level elements\n```\n"
          }
        ],
        "html": "<style>\n  button {margin-bottom: 12px;}\n  .ui-slider {margin: 16px 0;}\n  .summary {margin: 8px 0 18px 0}\n</style>\n\n<script id=\"phonesTmpl\" type=\"text/x-jsrender\">\n  <div>\n    <span data-link=\"\n      {if cell tmpl='Home'}\n      {else tmpl='Cell'}\n    \"></span>:\n    <span data-link=\"number\"></span>\n  </div>\n</script>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n\n<h3>(Tags in template)</h3>\n\n{^{on increaseAge}}Increase Age{{/on}}\n{^{for phones}}<div>\n  {^{if cell}}Home{{else}}Cell{{/if}}: {{:number}}</div>\n{{/for}}\n{^{slider age _max=99 width=\"50%\"/}}\n<label>Age:</label>\n{^{>age}}\n({^{if 15>age}}Child{{else age>65}}Senior{{else}}Adult{{/if}})\n{^{summary/}}\n\n<hr/>\n\n<h3>(Data-linked elements in template)</h3>\n\n<div>\n  <button data-link=\"{on increaseAge}\">Increase Age</button>\n  <div data-link=\"{for phones tmpl='#phonesTmpl'}\"></div>\n  <div data-link=\"{slider age _max=99 width='50%'}\"></div>\n  <label>Age:</label>\n  <span data-link=\"age\"></span>\n  (<span data-link=\"\n    {if 15>age tmpl='Child'}\n    {else age>65 tmpl='Senior'}\n    {else tmpl='Adult'}\n  \"></span>)\n  <div data-link=\"{summary}\"></div>\n</div>\n</script>\n\n<div id=\"result\"></div>\n\n<hr/>\n\n<h3>(Top-level data-linked elements)</h3>\n\n<div id=\"topLevel\">\n  <button data-link=\"{on increaseAge}\">Increase Age</button>\n  <div data-link=\"{for phones tmpl='#phonesTmpl'}\"></div>\n  <div data-link=\"{slider age _max=99 width='50%'}\"></div>\n  <label>Age:</label>\n  <span data-link=\"age\"></span>\n (<span data-link=\"\n    {if 15>age tmpl='Child'}\n    {else age>65 tmpl='Senior'}\n    {else tmpl='Adult'}\n  \"></span>)\n  <div data-link=\"{summary}\"></div>\n</div>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [\n    {number: \"111 111 1111\"},\n    {number:\"222 222 2222\", cell: true}\n  ],\n  age: 23,\n  increaseAge: function() {\n    $.observable(this).setProperty(\n      \"age\",\n      this.age + 10\n    );\n  }\n};\n\n$.views.tags(\n  \"summary\",\n  \"<div class='summary'>My name is {{>name}}.\"\n  + \"I am <b>{^{:age}}</b> years old.</div>\"\n);\n\ntmpl.link(\"#result\", person);\n$.link(true, \"#topLevel\", person);",
        "jsrJsvJqui": "jqui",
        "height": "690",
        "title": "tags in template / tag bindings in template / top-level tag bindings",
        "anchor": "tag-binding-variants"
      },
      {
        "_type": "para",
        "title": "Default tag binding targets",
        "text": "Data-linked expressions generally use the default target `innerText`, but data-linked *tag bindings* default to `innerHTML`.\n\nHere are the details:\n\nFor **_data-linked expressions_**, such as:\n\n```jsr\n<div data-link=\"address.street\">...\n<input data-link=\"address.street\" />...\n```\n\nor equivalently:\n\n```jsr\n<div data-link=\"{:address.street:}\">...\n<input data-link=\"{:address.street:}\" />...\n```\n\nthe default target is `value` for `input` or `select` elements, and `text` (`innerText`) for most other elements, so the above are equivalent to:\n\n```jsr\n<div data-link=\"text{:address.street:}\">...\n<input data-link=\"value{:address.street:}\" />...\n```\n\nFor **_tag bindings_**, such as:\n\n```jsr\n<div data-link=\"{mytag}\">...\n<input data-link=\"{mytag}\" />...\n```\n\nthe default target is `value` for `input` or `select` elements, and `html` (`innerHTML`) for most other elements, so the above are equivalent to:\n\n```jsr\n<div data-link=\"html{mytag}\">...\n<input data-link=\"value{mytag}\" />...\n```\n\nA custom tag can also specify its default target attribute, using the [`attr` tag option](#tagoptions@attr).",
        "anchor": "defaulttargets"
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
        "text": "Data-linking to SVG element attributes works exactly the same as with data-linking to HTML [element attributes](#link-elemattribs). Simply use the attribute name as data-link target.\n\nFor example to data-link to the `cx` attribute of an SVG element, use:\n\n```jsr\ndata-link=\"cx{:dataPathOrExpression}\"\n```"
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
            "text": "```jsr\n<svg class=\"svg\">\n  <ellipse ... data-link=\"\n    cx{:x}\n    transform{:'rotate(' + angle + ...)'}\n  \">...\n</svg>\n```"
          }
        ],
        "html": "<style>\n  .svg {\n    height: 280px;\n    width: 100%;\n    border: 1px solid #bbb;\n    margin: 2px 0 -2px -4px;\n  }\n</style>\n\n<div id=\"result\"></div>\n\n<script id=\"svgTemplate\" type=\"text/x-jsrender\">\n  <p>\n    x: <input data-link=\"x\" /><br/>\n    Rotate: <input data-link=\"angle\" />\n  </p>\n\n  <svg class=\"svg\">\n    <ellipse stroke-width=\"2\" rx=\"140\" ry=\"70\" cy=\"140\" fill=\"yellow\" stroke=\"blue\"\n      data-link=\"\n        cx{:x}\n        transform{:'rotate(' + angle + ' ' + x + ' 140)'}\n      \"\n    ></ellipse>\n  </svg>\n</script>\n",
        "code": "var data = {x: 300, angle: 30};\n\nvar svgTmpl = $.templates(\"#svgTemplate\");\n\nsvgTmpl.link(\"#result\", data);",
        "height": "376"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-elem-syntax",
            "label": "Data-linked elements"
          },
          {
            "_type": "topic",
            "hash": "samples/data-link/svg",
            "label": "Tutorial: Data-linking SVG"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls/jqui/slider/simple",
            "label": "Sample: slider"
          }
        ]
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
        "text": "To data link to CSS attributes, use `css-attribute-name` as data-link target.\n\nFor example to data-link to the CSS `background-color` use `css-background-color`:\n\n```jsr\ndata-link=\"css-background-color{:dataPathOrExpression}\"\n```\n"
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
            "text": "```jsr\n<div data-link=\"\n  css-color{:color}\n  css-background-color{:backcolor}\n  css-width{:divWidth}\n  {:text}\n\"></div>\n```"
          }
        ],
        "html": "<style>div div {border: 2px solid gray;}</style>\n<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{on ~changeData}}Change CSS and text{{/on}}<br/><br/>\n\n  Text: <input data-link=\"text\" /><br/>\n  Color: <input data-link=\"color\" /><br/>\n  Background: <input data-link=\"backcolor\" /><br/>\n  Width: <input data-link=\"divWidth\" /><br/><br/>\n\n  <div data-link=\"css-color{:color} css-background-color{:backcolor} css-width{:divWidth} {:text}\"></div>\n</script>",
        "code": "\nvar tmpl = $.templates(\"#tmpl\");\n\nvar divData = {\n        text: \"Some text\",  \n        color: \"red\",\n        backcolor: \"yellow\",\n        divWidth: 155\n    };\nvar swapped = false;\n\nfunction changeData() {\n  swapped = !swapped;\n  $.observable(divData).setProperty(\n    swapped\n    ? {\n        text: \"Other content\",  \n        color: \"#f0f\",\n        backcolor: \"#0ff\",\n        divWidth: \"17em\"\n      }\n    : {\n        text: \"Some text\",  \n        color: \"red\",\n        backcolor: \"yellow\",\n        divWidth: 155\n    });\n}\n\ntmpl.link(\"#result\", divData, {changeData: changeData});",
        "height": "214"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-elem-syntax",
            "label": "Data-linked elements"
          },
          {
            "_type": "topic",
            "hash": "samples/data-link/css",
            "label": "Tutorial: Data-linking CSS"
          }
        ]
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
        "text": "The default data-linking target for a data-linked element is `innerText` -- so the following two examples are equivalent:\n\n```jsr\n<div data-link=\"name\"></div>\n```\n\n```jsr\n<div data-link=\"text{:name}\"></div>\n```\n\nTo data-link to `innerHTML`, use the `html{}` binding:\n\n```jsr\n<div data-link=\"html{:name}\"></div>\n```\n"
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
            "text": "```jsr\n<div data-link=\"name\"></div>\n<div data-link=\"text{:name}\"></div>\n<div data-link=\"html{:name}\"></div>\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{on ~changeName}}Change name{{/on}}\n  <input data-link=\"name\" /><br/>\n\n  <div data-link=\"name\"></div>\n  <div data-link=\"text{:name}\"></div>\n  <div data-link=\"html{:name}\"></div>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo <b>Blow</b>\"};\nvar swapped = false;\n\ntmpl.link(\"#result\", person, {changeName: function() {\n  swapped = !swapped;\n  $.observable(person).setProperty(\"name\", swapped ? \"Jethro <em>Tull</em>\" : \"Jo <b>Blow</b>\");\n}});",
        "height": "110"
      },
      {
        "_type": "para",
        "title": "HTML encoding of data-linked text",
        "text": "The following approaches all guarantee HTML encoding -- and therefore protect against HTML injection from data containing untrusted markup:\n\n```jsr\n<div data-link=\"name\"></div>\n<div data-link=\"text{:name}\"></div>\n<div data-link=\"html{>name}\"></div>\n{^{>name}}\n```\n\n(See [*Encoding to avoid XSS*](#link2way@encode)).\n\nTo insert HTML markup *without encoding* (for example, from *trusted* markup in data), either of the following styles can be used:\n\n```jsr\n<div data-link=\"html{:name}\"></div>\n{^{:name}}<br/>\n```\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: *[Data-linked elements](#linked-elem-syntax)*."
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
        "text": "The value of the `class` attribute of an HTML element (corresponding to the `className` property of the HTMLElement object) is generally a white-space-separated list of class names.\n\nThere are two possible approaches to data-linking to `class`.\n\n- Data-link a string expression to the `class` as a whole, simply by setting the target to `class{:...}` (just as with data-linking to any other [HTML attribute]())\n- Data-link a boolean expression to `class` using the merge converter, in order to toggle a single class name in the white-space-separated list (adding the class when the boolean is `true`, and removing it when `false`)\n\nThe following example uses the two approaches to set the class of a div to `'redColor greenBorder yellowBackground'` if a boolean `isFoo` is `true`, and otherwise to `'blueColor greenBorder'`. \n "
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
            "text": "*<div class=\"close\">Data-link class to string:</div>*\n\n```jsr\n<div data-link=\"\n  class{:classString}\n\">...\n```\n\n*<div class=\"close\">Toggle individual class names:</div>*\n\n```jsr\n<div class=\"greenBorder\" data-link=\"\n  class{merge:isFoo toggle='redColor'}\n  class{merge:isFoo toggle='yellowBackground'}\n  class{merge:!isFoo toggle='blueColor'}\n\">...\n```"
          }
        ],
        "html": "<style>\n  .redColor {color:red;}\n  .blueColor {color:blue;}\n  .greenBorder {border:1px solid green;}\n  .yellowBackground {background-color:yellow;}\n</style>\n\n<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n\n  <em>Data-link class to string:</em><br/><br/>\n\n  {^{on ~setClassString}}Set class{{/on}} <br/><br/>\n\n  <div data-link=\"class{:classString}\">\n    Data-link class to string\n  </div><br/>\n\n  <em>Toggle individual class names:</em><br/><br/>\n\n  <label><input type=\"checkbox\" data-link=\"isFoo\" /> isFoo</label> <br/><br/>\n\n  <div class=\"greenBorder\" data-link=\"\n    class{merge:isFoo toggle='redColor'}\n    class{merge:isFoo toggle='yellowBackground'}\n    class{merge:!isFoo toggle='blueColor'}\n  \">Toggle individual class names</div>\n\n</script>",
        "code": "function setClassString() {\n  swapped = !swapped;\n  $.observable(data).setProperty(\n    \"classString\",\n    swapped\n      ? \"redColor greenBorder yellowBackground\"\n      : \"blueColor greenBorder\"\n  );\n}\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  isFoo: false,\n  classString: \"blueColor greenBorder\"\n};\nvar swapped = false;\n\ntmpl.link(\"#result\", data, {setClassString: setClassString});\n",
        "height": "224"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For further details, see the tutorial topics *[Data-linking class](#samples/data-link/class)* and *[Toggling class](#samples/data-link/toggle)*."
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-elem-syntax",
            "label": "Data-linked elements"
          },
          {
            "_type": "topic",
            "hash": "samples/data-link/class",
            "label": "Tutorial: Data-linking class"
          },
          {
            "_type": "topic",
            "hash": "samples/data-link/toggle",
            "label": "Tutorial: Toggling class"
          }
        ]
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
        "text": "The `visible` data-link target is a special built-in target in JsViews, which works through the CSS `display` property. It works by data-linking directly to a boolean property: "
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
            "text": "```jsr\n<div data-link=\"visible{:isFoo}\">...</div>\n\n<div data-link=\"visible{:!isFoo}\">...</div>\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n\n  <label><input type=\"checkbox\" data-link=\"isFoo\" /> isFoo</label> <br/><br/>\n\n  <div data-link=\"visible{:isFoo}\">\n    Show this if <em>isFoo</em> is true...\n  </div>\n\n  <div data-link=\"visible{:!isFoo}\">\n    If <em>isFoo</em> is not true, show this...\n  </div>\n\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {isFoo: false};\n\ntmpl.link(\"#result\", data);\n",
        "height": "84"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-elem-syntax",
            "label": "Data-linked elements"
          },
          {
            "_type": "topic",
            "hash": "samples/data-link/visibility",
            "label": "Tutorial: Data-linking visibility"
          },
          {
            "_type": "topic",
            "hash": "samples/data-link/hover",
            "label": "Tutorial: Data-linking visibility and hover"
          }
        ]
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
        "text": "JsViews provides alternative ways of attaching handlers for events such as the *click* event:<br/><br/>\n\n- Using [jQuery event binding](#link-events@jquery) to attach a handler function to elements (either at top level or rendered by templates):\n  ```js\n  $(selector).on(\"click\", handlerFn);\n  ```\n- Using the [`{on}` data-link binding](#link-events@datalink-on) (either on top-level data-linked elements or on elements rendered by \ntemplates):\n  ```jsr\n  <button data-link=\"{on handlerFn}\">...</button>\n  ```\n- Using the [`{^{on}}` tag](#link-events@tag-on), within templates:\n  ```jsr\n  {^{on handlerFn/}}\n  ```\n\nHere are working examples of each approach:"
      },
      {
        "_type": "para",
        "title": "Using jQuery event binding",
        "text": "```js\n$(selector).on(\"click\", handler);\n```\n\njQuery event binding can be used to attach a handler to elements either at top level or rendered by templates.\n\nHere is an example showing both a top-level button element and an element within a template:",
        "anchor": "jquery"
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
            "text": "```jsr\n<button class=\"myButton\">top level</button>\n<span id=\"result\"></span>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button class=\"myButton\">in template</button>\n</script>\n```\n\n```js\n...\ntmpl.link(\"#result\", person); // Render and link the template\n\n// Attach handler to buttons (class 'myButton'), whether in top-level or rendered content. \n$(\".myButton\").on(\"click\", helpers.doSomething);\n```\n"
          }
        ],
        "html": "<button class=\"myButton\">top level</button>\n<span id=\"result\"></span>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button class=\"myButton\">in template</button>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar person = {};\n\nvar helpers = {\n  doSomething: function() {\n    alert(\"do something\");\n  }\n}\n\ntmpl.link(\"#result\", person); // Render and link the template\n\n// Attach handler to buttons (class 'myButton'), whether in top-level or rendered content.\n$(\".myButton\").on(\"click\", helpers.doSomething);\n",
        "height": "50",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Using the {on} data-link binding",
        "text": "```jsr\n<button data-link=\"{on ~doSomething}\">...</button>\n```\n\nThe `{on}` data-link binding provides a declarative approach to attaching handlers to elements. The `handlerFn` argument is passed along with other optional arguments and properties (details below): `{on ... handlerFn ...}`. (The first argument of type 'function' will be treated as `handler` argument).\n\nIt can be used either on top-level elements (provided they are data-linked -- see *[top-level data linking](#toplink)*), or on elements rendered by templates. Here is an example of each:\n",
        "anchor": "datalink-on"
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
            "text": "```jsr\n<span id=\"topLinked\">\n  <button data-link=\"{on ~doSomething}\">top level</button>\n</span>\n```\n\n```jsr\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on ~doSomething}\">in template</button>\n</script>\n```\n\n```js\n...\nvar helpers = {doSomething: function(){...} }\n\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n\n$.link(true, \"#topLinked\", person, helpers); // Data-link top-level content\n\n```\n"
          }
        ],
        "html": "<span id=\"topLinked\">\n  <button data-link=\"{on ~doSomething}\">top level</button>\n</span>\n\n<span id=\"result\"></span>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on ~doSomething}\">in template</button>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar person = {};\n\nvar helpers = {\n  doSomething: function() {\n    alert(\"do something\");\n  }\n}\n\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n\n$.link(true, \"#topLinked\", person, helpers); // Data-link top-level content\n\n",
        "height": "50"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See the [Editable data: hash/dictionary](#samples/editable/hash) sample for an example of use of the `{on}` data-link binding, both in a template and at top-level"
      },
      {
        "_type": "para",
        "title": "Using the {^{on}} tag, within templates",
        "text": "Within templates, the *tag* form `{^{on ...}}` of the JsViews 'on' event binding can be convenient, as an alternative to `data-link={on ...}`:",
        "anchor": "tag-on"
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
            "text": "```jsr\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{on ~doSomething/}}\n</script>\n```\n\n```js\n...\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n```\n"
          }
        ],
        "html": "<span id=\"result\"></span>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{on ~doSomething/}}\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar person = {};\n\nvar helpers = {\n  doSomething: function() {\n    alert(\"do something\");\n  }\n}\n\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n",
        "height": "50"
      },
      {
        "_type": "para",
        "title": "Calling a View Model method in the click event",
        "text": "A common usage scenario for the `{on}` event binding is to have the click event invoke a *View Model* method -- for example, to provide a button to invoke the `add()` method, as in [this sample](#samples/editable/compiled)."
      },
      {
        "_type": "para",
        "title": "<b style=\"font-style: normal\">Features of the <b style=\"font-style: italic\">data-link=\"{on ...}\"</b> binding and the <b style=\"font-style: italic\">{^{on ...}}</b> tag</b>",
        "text": " "
      },
      {
        "_type": "para",
        "title": "Determining the target element",
        "text": "The `data-link=\"{on ...}\"` binding and the `{^{on ...}}` tag provide alternative (and generally equivalent) ways of attaching handler actions to HTML elements -- differing only in how they determine which element is used:\n\n- With `data-link`, the element is the data-linked element\n  ```jsr\n  <button data-link=\"{on ~doSomething}\">\n    Click me\n  </button>\n  ```\n- With `{^{on ...}}` the element is the element (or elements) wrapped by the tag\n  ```jsr\n  {^{on ~doSomething}}\n    <button>\n      Click me\n    </button>\n  {{/on}}\n  ```\n\nThe HTML element above can of course be *any* HTML element -- not necessarily `<button>`. But in the particular case of an `{^{on}}` tag wrapping a `<button>`, a simpler format is available -- since the `{^{on}}` tag wrapping only text will automatically render itself as a `<button>`:",
        "anchor": "target"
      },
      {
        "_type": "para",
        "title": "The {^{on}} tag as button",
        "text": "In the case of an `{^{on ...}}` which wraps only text, the tag generates a `<button>` element with the text as label -- and attaches to that element.\n\n```jsr\n{^{on ~doSomething}}\n  Click me\n{{/on}}\n```\n\nSimilarly, `{^{on ...}}` with a `tmpl='sometext'` property generates a `<button>` with the text as label.\n\n```jsr\n{^{on ~doSomething tmpl=\"Click me\" /}}\n```\n\nFinally, `{^{on ...}}` with no content at all will generate a `<button>`, and use the handler name as label.\n\n```jsr\n{^{on ~doSomething /}}\n```\n\nHere is a working sample with six examples showing alternative styles for creating a clickable *button*.\n\nThe last example also shows that a simple `{^{on ...}}test{{/on}}` -- for which the `<button>` is generated -- still lets you set the button `id`, `width`, `height` and `class` (by setting those properties directly on the tag).",
        "anchor": "button"
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
            "text": "```jsr\n<button data-link=\"{on ~doSomething}\" id=\"btn0\">Click me</button>\n\n{^{on ~doSomething}}<button id=\"btn1\">Click me</button>{{/on}}\n\n{^{on ~doSomething}}Click me{{/on}}\n\n{^{on ~doSomething tmpl=\"Click me\" /}}\n\n{^{on ~doSomething /}}\n\n{^{on ~doSomething height=18 width=75 class=\"red\" id=\"btn5\"}}Click me{{/on}}\n```\n"
          }
        ],
        "html": "<style>\n  .red {color: red!important;}\n</style>\n\n<span id=\"result\"></span>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on ~doSomething}\" id=\"btn0\">Click me</button>\n\n  {^{on ~doSomething}}<button id=\"btn1\">Click me</button>{{/on}}\n\n  {^{on ~doSomething}}Click me{{/on}}\n\n  {^{on ~doSomething tmpl=\"Click me\" /}}\n\n  {^{on ~doSomething /}}\n\n  {^{on ~doSomething height=18 width=75 class=\"red\" id=\"btn5\"}}Click me{{/on}}\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar person = {};\n\nvar helpers = {\n  doSomething: function(ev) {\n    alert(\"do something. id: \" + ev.target.id);\n  }\n}\n\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n",
        "height": "50"
      },
      {
        "_type": "para",
        "title": "Choosing the events",
        "text": "The `handlerFn` argument of `{on ...}` can optionally be preceded by an `eventName` string argument  containing one or more white-space separated event names (or namespaced event names, such as `\"click.my.ns\"`).\n\nIn the absence of an `eventName` argument, the default is to use the `\"click\"` event.\n\nHere is an sample showing three examples -- which attach to the `\"mouseup mousedown\"`, `\"change\"` and `\"submit\"` events, respectively.",
        "anchor": "eventname"
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
            "text": "```jsr\n<input type=\"checkbox\" data-link=\"{on 'change' change}\"/> ...\n\n{^{on \"mouseup mousedown\" mouseUpAndDown}} ...\n\n<form data-link=\"{on 'submit' formSubmit}\"> ...\n```\n"
          }
        ],
        "height": "180",
        "html": "<span id=\"result\"></span>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <label><input type=\"checkbox\" data-link=\"{on 'change' change}\"/> Decrease on change</label>\n\n  {^{on \"mouseup mousedown\" mouseUpAndDown}}Increase on up and down{{/on}} <br/>\n\n  <form data-link=\"{on 'submit' formSubmit}\">\n    Age: {^{>age}} <br/>\n    Name: <input data-link=\"name\" /> <br/>\n    Submitted: {^{>submitted}} <br/><br/>\n\n    <button type=\"submit\">Submit</button>\n  </form> \n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar person = {\n  name: \"Jo\",\n  age: 20,\n  submitted: false,\n  change: function() {\n    $.observable(this).setProperty({\n      age: this.age - 1,\n      submitted: false\n    });\n  },\n  mouseUpAndDown: function() {\n    $.observable(this).setProperty({\n      age: this.age + 1,\n      submitted: false\n    });\n  },\n  formSubmit: function() {\n    $.observable(this).setProperty(\"submitted\", true);\n    return false;\n  }  \n};\n\ntmpl.link(\"#result\", person); // Render and link the template\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the same sample -- but attaching to top-level data-linked elements rather than to content rendered by a data-linked template: "
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
            "text": "```jsr\n<input type=\"checkbox\" data-link=\"{on 'change' change}\"/> ...\n\n<button data-link=\"{on 'mouseup mousedown' mouseUpAndDown}\"> ...\n\n<form data-link=\"{on 'submit' formSubmit}\"> ...\n```\n"
          }
        ],
        "html": "<span id=\"result\"></span>\n\n<div id=\"linkedContent\">\n  <label><input type=\"checkbox\" data-link=\"{on 'change' change}\"/> Decrease on change</label>\n\n  <button data-link=\"{on 'mouseup mousedown' mouseUpAndDown}\">Increase on up and down</button> <br/>\n\n  <form data-link=\"{on 'submit' formSubmit}\">\n    Age: <span data-link=\"age\"></span> <br/>\n    Name: <input data-link=\"name\" /> <br/>\n    Submitted: <span data-link=\"submitted\"></span> <br/><br/>\n\n    <button type=\"submit\" value=\"x\">Submit</button>\n  </form> \n</div>",
        "code": "var person = {\n  name: \"Jo\",\n  age: 20,\n  submitted: false,\n  change: function() {\n    $.observable(this).setProperty({\n      age: this.age - 1,\n      submitted: false\n    });\n  },\n  mouseUpAndDown: function() {\n    $.observable(this).setProperty({\n      age: this.age + 1,\n      submitted: false\n    });\n  },\n  formSubmit: function() {\n    $.observable(this).setProperty(\"submitted\", true);\n    return false;\n  }  \n};\n\n$.link(true, \"#linkedContent\", person); // Data-link top-level content\n",
        "height": "180"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(For a more complete example of attaching to the `\"submit\"` event, see the *[Using submit](#samples/editable/submit)* sample.)"
      },
      {
        "_type": "para",
        "title": "Attaching handlers to specific elements within nested content &ndash; the selector argument",
        "text": "If the `{on}` binding is on an element or tag with nested element content, then an additional optional `selector` argument can be passed (after the `eventName` argument and before the `handlerFn` argument).\n\nAs a result the event handler will be attached to the element(s) targeted by the `selector`. (This is equivalent to the jQuery *'delegated events'* pattern).\n\nHere is an example where only the `<li>`s of class `active` have click handlers attached:",
        "anchor": "selector"
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
            "text": "*Example, with `{^{on}}` tag:*\n\n```jsr\n{^{on 'click' '.active' select}}\n  <li>one</li>\n  <li class=\"active\">two</li>\n  ...\n```\n\n*Example, with `data-link=\"{on}\"` binding:*\n\n```jsr\n<ul data-link=\"{on 'click' '.active' select}\">\n  <li>one</li>\n  <li class=\"active\">two</li>\n  ...\n```\n\n"
          }
        ],
        "html": "<style>.active {border: 1px solid green; width: 100px; background-color: white; cursor: pointer;}</style>\n\n<span id=\"result\"></span>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n<ul>\n  {^{on 'click' '.active' select}}\n    <li>one</li>\n    <li class=\"active\">two</li>\n    <li class=\"active\">three</li>\n  {{/on}}\n</ul>\n</script>\n\n<div id=\"linkedContent\">\n  <ul data-link=\"{on 'click' '.active' select}\">\n    <li>one</li>\n    <li class=\"active\">two</li>\n    <li class=\"active\">three</li>\n  </ul>\n</div>\n\n<div id=\"result\"></div>",
        "code": "var data = {\n  select: function(ev, eventArgs) {\n    var targetStyle = ev.target.style;\n    targetStyle.backgroundColor = targetStyle.backgroundColor===\"yellow\" ? \"white\" : \"yellow\";\n  }  \n};\n\n$.link(true, \"#linkedContent\", data); // Data-link top-level content\n\n$.templates(\"#tmpl\").link(\"#result\", data); // Render and link template\n",
        "height": "170"
      },
      {
        "_type": "para",
        "title": "Multiple {on} bindings on the same element",
        "text": "It is possible to have multiple `{on}` bindings on the same element -- which might use different `selector`, `eventName` or `handler` arguments. The following sample has an outer `<div>` element with three `{on}` bindings -- each attaching a different handler to different elements in the nested content  (specified by different `selector` arguments):\n\n",
        "anchor": "multiple"
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
            "text": "```jsr\n<div data-link=\"\n  {on 'click' '.addBtn' add}\n  {on 'click' '.remove' remove}\n  {on 'click' 'li' select}\n\">\n  <button class=\"addBtn\">add</button>\n  <ul>\n    {^{for items}}\n        <li>{{>label}} <span class=\"remove\"></span></li>\n        ...\n```"
          }
        ],
        "html": "<style>\nul { margin: 0; padding-left: 0;}\nli {border: 1px solid green; width: 100px; background-color: white; cursor: pointer; list-style: none;}\n</style>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <div data-link=\"\n    {on 'click' '.addBtn' add}\n    {on 'click' '.remove' remove}\n    {on 'click' 'li' select}\n  \">\n    <button class=\"addBtn\">add</button>\n    <ul>\n      {^{for items}}\n        <li>{{>label}} <span class=\"remove\"></span></li>\n      {{/for}}\n    </ul>\n  </div>\n</script>\n\n<div id=\"result\"></div>\n",
        "code": "var cnt = 0,\ndata = {\n  add: function(ev, eventArgs) {\n    $.observable(data.items).insert({label: \"new\" + cnt++});\n  }, \n  remove: function(ev, eventArgs) {\n    var index = $.view(ev.target).index\n    $.observable(data.items).remove(index);\n    return false;\n  },\n  select: function(ev, eventArgs) {\n    var targetStyle = ev.target.style;\n    targetStyle.backgroundColor = targetStyle.backgroundColor===\"yellow\" ? \"white\" : \"yellow\";\n  },  \n  items: [\n    {label: \"one\"},\n    {label: \"two\"},\n    {label: \"three\"}\n  ]\n};\n\n$.templates(\"#tmpl\").link(\"#result\", data); // Render and link template",
        "height": "140"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And similarly, the following variant of the same sample wraps the same nested element content as above with three `{^{on}}` tags -- each of which attaches a handler to different nested elements:"
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
            "text": "```jsr\n{^{on 'click' '.addBtn' add}}\n  {^{on 'click' '.remove' remove}}\n    {^{on 'click' 'li' select}}\n      <button class=\"addBtn\">add</button>\n      <ul>\n        {^{for items}}\n          <li>{{>label}} <span class=\"remove\"></span></li>\n          ...\n```"
          }
        ],
        "html": "<style>\nul { margin: 0; padding-left: 0;}\nli {border: 1px solid green; width: 100px; background-color: white; cursor: pointer; list-style: none;}\n</style>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{on 'click' '.addBtn' add}}\n    {^{on 'click' '.remove' remove}}\n      {^{on 'click' 'li' select}}\n        <button class=\"addBtn\">add</button>\n        <ul>\n          {^{for items}}\n            <li>{{>label}} <span class=\"remove\"></span></li>\n          {{/for}}\n        </ul>\n      {{/on}}\n    {{/on}}\n  {{/on}}\n</script>\n\n<div id=\"result\"></div>\n",
        "code": "var cnt = 0,\ndata = {\n  add: function(ev, eventArgs) {\n    $.observable(data.items).insert({label: \"new\" + cnt++});\n  }, \n  remove: function(ev, eventArgs) {\n    var index = $.view(ev.target).index\n    $.observable(data.items).remove(index);\n    return false;\n  },\n  select: function(ev, eventArgs) {\n    var targetStyle = ev.target.style;\n    targetStyle.backgroundColor = targetStyle.backgroundColor===\"yellow\" ? \"white\" : \"yellow\";\n  },  \n  items: [\n    {label: \"one\"},\n    {label: \"two\"},\n    {label: \"three\"}\n  ]\n};\n\n$.templates(\"#tmpl\").link(\"#result\", data); // Render and link template",
        "height": "140"
      },
      {
        "_type": "para",
        "title": "The selector argument can target elements that are added later",
        "text": "The above two samples illustrate the fact that the 'delegated events' pattern (using a `selector` argument) can target elements which are added later in time -- and were not yet present when the `{on}` binding was created.\n\nIn this case, clicking *add* will add a new `<li>` which can be selected and removed thanks to the already established `{on}` bindings for the *select* and *remove* handler actions.",
        "anchor": "late-delegate"
      },
      {
        "_type": "para",
        "title": "Passing parameters",
        "text": "The `{on}` binding can include parameters to be passed to the handler:\n\n```jsr\n{on ... myHandler param1 param2}\n```\n\nIn the above case the handler should have the signature `function(param1, param2, ev, eventArgs)`",
        "anchor": "parameters"
      },
      {
        "_type": "para",
        "title": "Setting context",
        "text": "The `{on}` binding can take an optional `context` property -- used to specify the *this* pointer in the handler. \n\nIf no `context` property is provided then:\n- if the provided handler is a 'property chain', such as `a.b.myHandler`, the context will be the preceding object in the chain -- in this case `a.b`\n- otherwise, it will be the current data context\n\nFor example if the current data context is `team`:\n\n- `{on add}`<br/>-- Here the handler is the `team.add()` method, the `this` pointer is `team`\n- `{on settings.edit}`<br/>-- Here the handler is the `team.settings.edit()` method, the `this` pointer is `team.settings`\n- `{on ~reverse}`<br/>-- Here the handler is the `reverse()` helper method, the `this` pointer is `team`\n- `{on settings.edit context=#data}`<br/>-- Here the handler is the `settings.edit()` method, the `this` pointer is `team`\n- `{on ~reverse context=settings}`<br/>-- Here the handler is the `reverse()` helper method, the `this` pointer is `team.settings`",
        "anchor": "context"
      },
      {
        "_type": "para",
        "title": "Passing data",
        "text": "The `{on}` binding can take an optional `data` property -- used to specify data which will then be passed to the handler as `ev.data`.\n\n \n",
        "anchor": "data"
      },
      {
        "_type": "para",
        "title": "The signature of the event handler function",
        "text": "If the `{on}` binding is:\n\n```jsr\n{^{on 'click' myHandler param1 param2 data=myData}}\n```\nor\n\n```jsr\ndata-link=\"{on 'click' myHandler param1 param2 data=myData}\"\n```\n\nthen the `myHandler` function should have the signature:\n\n```js\nfunction myHandler(param1, param2, ev, eventArgs) { ... }\n```\n\nwhere `ev` is the *jQuery event object*, with properties that include:\n\n- *target*: the HTML element where the click event occurred\n- *data*: the `myData` data\n\nand `eventArgs` is the *JsViews event object*, with properties:\n\n- *change*: the event: `\"click\"`\n- *linkCtx*: the link context \n- *view*: the view object\n",
        "anchor": "signature"
      },
      {
        "_type": "para",
        "title": "<b style=\"font-style: normal\">{on} binding &ndash; API summary</b>",
        "text": "The following is a summary of the arguments and properties which can be provided to the `{on}` binding:",
        "anchor": "api"
      },
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "",
        "name": "name",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "pathOrExpression",
                "type": "object or string",
                "optional": true,
                "description": "The <b>this</b> pointer in the handler. (Otherwise <b>this</b> will reference preceding object in <b>a.b.c</b> chain, or current data context)",
                "propName": "context"
              },
              {
                "_type": "param",
                "name": "pathOrExpression",
                "type": "object or string",
                "optional": true,
                "description": "Data to be provided to handler as ev.data",
                "propName": "data"
              },
              {
                "_type": "param",
                "name": "label",
                "type": "string (or template reference)",
                "optional": true,
                "description": "(For {^{on/}} tag) &ndash; String to be used as label (or reference to external template containing label)",
                "propName": "tmpl"
              }
            ],
            "args": [
              {
                "_type": "param",
                "name": "eventName",
                "type": "string",
                "optional": true,
                "description": "One or more white-space separated event names"
              },
              {
                "_type": "param",
                "name": "handler",
                "type": "function",
                "optional": false,
                "description": "The event handler function"
              },
              {
                "_type": "param",
                "name": "param1 param2...",
                "type": "object(s) or string(s)",
                "optional": true,
                "description": "One or more parameters  to be passed to handler"
              }
            ],
            "sections": [],
            "example": "{^{on myHandler /}}\n{^{on myHandler}}Click me{{/on}}\n{^{on 'click' ~showMsg msg tmpl=\"Click me\"/}}\n{^{on 'click' '.btn' ~go context=~root}}...{{/on}}\n<hr>\ndata-link=\"{on myHandler}\"\ndata-link=\"{on 'click' ~showMsg msg}\"\ndata-link=\"{on 'click' '.btn' ~go context=~root}\"\n",
            "description": "{^{on}} tag or {on} data-link binding",
            "variant": "{on [eventName][selector] handler [param1...][context=expr][data=expr][tmpl='label'] }"
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
        "text": "Here is a sample which shows the use of most of the above API features:"
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
            "text": "*<div class=\"close\">__{on}__ data-link binding:</div>*\n\n```jsr\n<table data-link=\"{on 'focus' 'input' ~hlp.showFocus 'Textbox:' context=~settings data=address}...\">\n  <tbody><tr>\n    <td>\n      <input data-link=\"first\"/>\n      ...\n```\n\n*__{on}__ arguments:*\n- `eventName`: `'focus'`\n- `selector`: `'input'`\n- `handlerFn`: `~hlp.showFocus`\n- `parameter`: `'Textbox:'`\n\n*__{on}__ properties:*\n- `context`: `~settings`\n- `data`: `address`\n\n*<div class=\"close\">__Handler:__</div>*\n\n```js\nshowFocus: function(msg, ev, eventArgs) {\n  var message = this.format(msg, ev.target.value, ev.data.street);\n  ...\n  lastTd.text(message);\n}\n```\n"
          }
        ],
        "html": "<style>table {width:80%;}</style>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <table\n    data-link=\"\n      {on 'focusin' 'input' ~hlp.focusIn 'Textbox:' context=~settings data=address}\n      {on 'focusout' 'input' ~hlp.focusOut}\n    \">\n    <tbody><tr>\n      <td>\n        <input data-link=\"first\"/>\n      </td><td>\n        <input data-link=\"last\"/>\n      </td><td style=\"width:40%\">\n        Click in textbox, to change this message\n      </td>\n    </tr></tbody>\n  </table>\n</script>\n\n<div id=\"result\"></div>",
        "code": "var cnt = 0,\n  person = {\n    first: \"Jo\",\n    last: \"Blow\",\n    address: {street: \"1st\"}\n  },\n  helpers = {\n    settings: {\n      format: function(message, val, street) {\n        return message + \" \" + val + \" Address: \" + street;\n      }\n    },\n    hlp: {\n      focusIn: function(msg, ev, eventArgs) {\n        var message = this.format(msg, ev.target.value, ev.data.street);\n        var lastTd = $(ev.target).parents(\"tr\").children().last();\n        lastTd.text(message);\n      },\n      focusOut: function(ev, eventArgs) {\n        var lastTd = $(ev.target).parents(\"tr\").children().last();\n        lastTd.text(\"Click in textbox, to change this message\");\n      }\n    }\n  };\n\n$.templates(\"#tmpl\").link(\"#result\", person, helpers);",
        "height": "60"
      },
      {
        "_type": "para",
        "title": "",
        "text": "***See also:*** the *[Compiled View Models](#samples/editable/compiled)* or *[Using submit](#samples/editable/submit)* samples for examples of using `{on}` bindings to call methods on *View Models*."
      },
      {
        "_type": "para",
        "title": "The <span style='font-style: normal'>jsv-domchange</span> event (advanced)",
        "text": "An advanced JsViews feature allows you to add an event listener for the `'jsv-domchange'` event, on an element wrapping dynamic content such as a `{^{for someArray}}` block, or an `{^{if someExpression}}` block. \n\nThe event handler will get called whenever the immediate content changes dynamically, as in this example:",
        "anchor": "domchange"
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
            "text": "```jsr\n<ul data-link=\"{on 'jsv-domchange' domChanges} ...\">\n  {^{for items}}\n   ...\n```\n\n```js\ndomChanges: function(ev, eventArgs, tagCtx, linkCtx, observableEventArgs) {\n  $(\"#change\").text(observableEventArgs.change);\n  ...\n},\n``` "
          }
        ],
        "html": "<style>ul {margin: 0; padding-left: 0;} li {list-style: none;}</style>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{on add/}}\n  <ul data-link=\"{on 'jsv-domchange' domChanges} {on 'click' '.remove' remove}\">\n    {^{for items}}\n      <li>{{>label}} <span class=\"remove\"></span></li>\n    {{/for}}\n  </ul>\n</script>\n\n<div><b>Change:</b> <em id=\"change\">-</em></div>\n<div><b>Index:</b> <em id=\"index\">-</em></div><br/>\n\n<div id=\"result\"></div>\n",
        "code": "var cnt = 0,\ndata = {\n  add: function(ev, eventArgs) {\n    $.observable(data.items).insert({label: \"new\" + cnt++});\n  }, \n  remove: function(ev, eventArgs) {\n    var index = $.view(ev.target).index\n    $.observable(data.items).remove(index);\n    return false;\n  },\n  domChanges: function(ev, eventArgs, tagCtx, linkCtx, observableEventArgs) {\n    $(\"#change\").text(observableEventArgs.change);\n    $(\"#index\").text(observableEventArgs.index);\n  },  \n  items: [\n    {label: \"one\"},\n    {label: \"two\"}\n  ]\n};\n\n$.templates(\"#tmpl\").link(\"#result\", data);",
        "height": "160"
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
        "text": "See also *[Setting tag delimiters for JsRender](#settings/delimiters)*"
      },
      {
        "_type": "para",
        "title": "JsRender default tag delimiters",
        "text": "Template tags in JsRender use the Mustache style: `{{...}}`.\n\nWhen using JsViews you can also use data-binding -- with data-linked tags, written: `{^{...}}` "
      },
      {
        "_type": "para",
        "title": "Changing delimiters:",
        "text": "Sometimes there can be a need to use different delimiters. For example there may be a conflict if the template is being rendered on the server using a declarative syntax such as *Django* with the same default delimiters `{{` and `}}`.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following call:\n\n```js\n$.views.settings.delimiters(\"<%\", \"%>\");\n```\n\nwill change the tag syntax to `<%...%>` for JsRender, and `<^%...%>`) for a data-linked tag in JsViews.\n\nAnd the following:\n```js\n$.views.settings.delimiters(\"<<\", \">>. \"*\");\n```\n\nwill change to  `<<...>>` for a JsRender tag, and `<*<...>>`) for a data-linked tag in JsViews.\n\nThe chosen delimiters must each consist of two non-alphanumeric (and non-white-space) characters.\n\n(*Note:* `$.views.settings.delimiters(...);` also accepts as parameter an array such as `[\"<%\", %>, \"*\"]` which can be useful for reverting to a previous set of delimiters -- as shown in [this sample](#settings/delimiters@tmpl-for-tmpl).)"
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
            "text": "*Markup:* \n\n```jsr\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <b>[[>title]]</b>\n  <ul>\n    [[for members]]\n      <li>Name: [*[>name>]] <input data-link=\"name\"/></li>\n    [[/for]]\n  </ul>\n</script>\n```\n\n*Code*\n\n```js\n$.views.settings.delimiters(\"[[\", \"]]\", \"*\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n...\n```"
          }
        ],
        "html": "<div id=\"result\">\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <b>[[>title]]</b>\n  <ul>\n    [[for members]]\n      <li>Name: [*[>name]] <input data-link=\"name\"/></li>\n    [[/for]]\n  </ul>\n</script>\n",
        "code": "$.views.settings.delimiters(\"[[\", \"]]\", \"*\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n\nvar team = {\n    title: \"A team\",\n    members: [{name: \"Jo\"}]\n  };\n\ntmpl.link(\"#result\", team);",
        "height": "80",
        "title": "Choosing alternative tag delimiters, with JsViews"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the [sample](#settings/delimiters@tmpl-for-tmpl) in the *Setting tag delimiters for JsRender* topic showing how to use alternative delimiters to *'render a template with a template'*.\n  "
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
        "text": "In the case of *[textboxes](#link-input@textbox)*, *[textarea](#link-textarea)*, *[contenteditable](#link-contenteditable)* and some *custom tags*, you can choose whether changes to the underlying data are triggered as you type (on *keydown*), or only on leaving the input control (on *change* or *blur*)\n\nAllowed values for *trigger* are:\n\n- `true` -- data updates as you type -- on *keydown* \n- `false` -- data updates on *change* (when the input loses focus) \n"
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
        "text": "JsViews has the following advanced settings:\n\n- **useViews** -- *default:* `false`\n- **linkAttr** -- *default:* `\"data-link\"`\n- **noValidate** -- *default:* `false` \n\nand also the following 'private' advanced settings:\n\n- **_jsv** -- *default:* `false`\n- **_wm** -- *default:* current 'wrapMap' settings\n- **_fe** -- *default:* current 'form element binding' settings\n\n***useViews*** controls a performance optimization, while building the *[view hierarchy](#views)*. For render-only scenarios with very simple templates there will usually not be any need to access the [`view`](#viewobject). JsRender detects these cases, does not create a `view` object, and hence obtains a slight performance gain. By setting `useViews` to `true`, you guarantee that JsRender will *always* create views for template blocks. (Alternatively, when registering a specific template, you can set `useViews: true` as a template option setting: `$.templates({markup: ..., useViews: true, ...})`).\n\n\n***linkAttr*** determines the JsViews data-link attribute. By default it is `data-link`. If there is a conflict where another module also uses the 'data-link' attribute, then you can choose a different attribute for JsViews data-linking. \n\nFor example, if you set `$.views.settings.advanced({linkAttr: \"link\"})`, then you would write `<input link=\"name\"/>` instead of `<input data-link=\"name\" />` for data-linking an `<input/>` to `name`.\n\n***noValidate*** controls whether JsViews runs validation code during data-linking, to raise an error in the case of invalid HTML structure (such as `<div/>` or <`div><span></div>`) or HTML/JsViews tag structure (such as `{^{if...}} <span{{/if}} ... >`). By setting *noValidate* to `true`, JsViews will skip the validation step, with a minor improvement to performance as a result.\n\n***_jsv*** is a 'private' setting (could change in the future). If set to `true` JsRender provides a global `_jsv` variable, which gives access to the internal stores of views and of data-bindings.\n\n***_wm*** is a 'private' setting (could change in the future). It determines the 'wrapMap' configuration which controls how document fragments are inserted into the DOM during data-linking. (Also used by jQuery DOM manipulation).\n\n***_fe*** is a 'private' setting (could change in the future). If contains the 'form element binding' configuration, which determines the elements (such as `<input/>` or `<textarea>`) which provide two-way data-binding with JsViews -- and specifies the default data-linked attribute, such as `value`.\n\n***To get current advanced settings:***\n\n```js\nvar advancedSettings = $.views.settings.advanced();\n```\n\nBy default the returned `advancedSettings` object is:\n\n```js\n{useViews: false, linkAttr: \"data-link\", noValidate: false, _jsv: false, _wm: ..., _fe: ...}\n```\n\n***To set advanced settings:***\n\n```js\n$.views.settings.advanced({useViews: true});\n// Set one or more advanced settings\n```"
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
        "text": "*JsViews* is much more of a framework than *JsRender*. It does much more than just templating -- providing also data-binding, *MVVM* support, observability of the data/model layer, support for interactive encapsulated components (*JsViews tag controls*), and more.\n\n*JsViews* uses the same templates as *JsRender*, but adds powerful data-binding features. Like *JsRender* it is highly flexible and expressive -- so it leaves you free to work within your own choice of overall application architecture (including architectures based on *MVVM*, *MVP* or *MVC* -- optionally with server/client integration).\n\n*JsViews* lets you use your own flavor of data/model layer -- whether simple plain JavaScript objects, hand-coded *View Model* instances, or *compiled View Models*.\n\nThe *[compiled View Models](#jsvviewmodelsapi)* pattern makes it particularly easy to follow a fully-fledged *MVVM* approach to apps and web pages. It provides for generating View Model instances directly from plain JSON data, and for triggering incremental UI updates when modified JSON data is obtained."
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
        "text": "In this example we add *JsViews* data-binding to the *[plain objects example](#jsrmodel@plain)* taken from the *JsRender Data / View Model* topic.",
        "anchor": "plain"
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
        "html": "<div class=\"left\">\n  <button id=\"changeObjects\">Change data</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label><input type=\"checkbox\" checked id=\"attach\"/> Change Log</label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Data: hierarchy of plain objects and arrays\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n// Render and link template against plain object hierarchy\ntmpl.link(\"#result\", person);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: {street: \"New Street\"},\n    phones: [{number: \"123 123 1234\"}, {number: \"321 321 4321\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number: \"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \"\n      + $.views.converters.encode(JSON.stringify(eventArgs[key])) + \"</div>\";\n      // (Note that we encode < > and & as HTML entities, for display)\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "title": "Render and link template directly against plain objects...",
        "header": "<link href=\"/samples/change-log.css\" rel=\"stylesheet\"/>",
        "action": "append"
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
        "text": "As with *JsRender* above, to convert our template from using plain objects to using *View Model* objects, the only change we need to make is to add parens for our properties, which are now *getter/setter* functions.\n\nThis applies equally to data-link expressions, such as `<input data-link=\"address()^street()\" >`.\n\n(*Note:* we also change `.` to `^` in paths if we want [deep path binding](#linked-paths@deep).)\n\n```jsr\n... \n<input data-link=\"name()\" />\n...\n<input data-link=\"address()^street()\" />\n...\n{^{for phones()}}\n  ...      \n    <input data-link=\"number()\" />\n  ...\n{{/for}}\n...\n```"
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
        "html": "<div class=\"left\">\n  <button id=\"changeObjects\">Change data</button>\n  <button id=\"setObjects\">Call setters</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:\n  <input type=\"checkbox\" checked id=\"attach\"/></label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Instantiate View Model hierarchy\nvar person = new Person(\n  \"Pete\",\n  new Address(\"1st Ave\"),\n  [new Phone(\"111 111 1111\"), new Phone(\"222 222 2222\")]\n);\n\n// Render and link the template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() { // Use setProperty to make changes\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: new Address(\"New Street\"),\n    phones: [new Phone(\"123 123 1234\"), new Phone(\"321 321 4321\")]\n  });\n});\n\n$(\"#setObjects\").on(\"click\", function() {    // Use setters to make changes\n  person.name(\"setPete\");\n  person.address(new Address(\"Set Road\"));\n  person.phones([new Phone(\"987 987 9876\")]);\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones()).insert(new Phone(\"456 456 4567\"));\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \"\n      + $.views.converters.encode(JSON.stringify(eventArgs[key])) + \"</div>\";\n      // (Note that we encode < > and & as HTML entities, for display)\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "title": "Render and link template against a 'hand-coded' View Model object hierarchy",
        "anchor": "linkvmsample",
        "header": "<link href=\"/samples/change-log.css\" rel=\"stylesheet\"/>\n<script src=\"/samples/mvvm/person-view-models-jsv.js\" ></script>",
        "action": "append"
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
        "html": "<div class=\"left\">\n  <button id=\"changeObjects\">Change data</button>\n  <button id=\"setObjects\">Call setters</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:\n  <input type=\"checkbox\" checked id=\"attach\"/></label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(Phone(phoneNo));\n}\n\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n// Instantiate View Model hierarchy using constructors\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n\n// Render and link the template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() { // Use setProperty to make changes\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: Address(\"New Street\"),\n    phones: [Phone(\"123 123 1234\"), Phone(\"321 321 4321\")]\n  });\n});\n\n$(\"#setObjects\").on(\"click\", function() {    // Use setters to make changes\n  person.name(\"setPete\");\n  person.address(Address(\"Set Road\"));\n  person.phones([Phone(\"987 987 9876\")]);\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones()).insert(Phone(\"456 456 4567\"));\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \"\n      + $.views.converters.encode(JSON.stringify(eventArgs[key])) + \"</div>\";\n      // (Note that we encode < > and & as HTML entities, for display)\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "anchor": "compilevmsample",
        "title": "Render and link template against a compiled View Model object hierarchy",
        "header": "<link href=\"/samples/change-log.css\" rel=\"stylesheet\"/>",
        "action": "append"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also the [corresponding sample](#jsrmodel@compilevmsample) with JsRender.)"
      },
      {
        "_type": "para",
        "title": "<b>Using observe and observeAll APIs with View Model hierarchies</b>",
        "text": " ",
        "anchor": "observeapis"
      },
      {
        "_type": "para",
        "title": "observeAll()",
        "text": "The <em>Change Log</em> feature above is showing us ALL the changes to *View Model* instances, even as we structurally modify the tree by adding and removing objects from arrays, setting structured values to properties, etc.\n\nThis is achieved with exactly the same call to `observeAll`/`unobserveAll` that we used above for plain objects:\n\n```js\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n```",
        "anchor": "observeall"
      },
      {
        "_type": "para",
        "title": "$.observe()",
        "text": "Similarly you can use the `observe()` APIs to observe specific properties of *View Model* objects, such as:\n\n```js\n// Observe changes to name() property of person object.\n$.observe(person, \"name()\", changeHandler); \n\n// Observe array changes on person.phones().\n$.observe(person.phones(), changeHandler);\n\n// Observe changes to person.phones() property. (This will observe both\n// array changes on the current array, and property change - setting a new array)\n$.observe(person, \"phones()\", changeHandler.);\n\n// Observe both changes to name() changes of person object and\n// street() property of current person.address() object.\n$.observe(person, \"name()\", person.address(), \"street()\", changeHandler);\n\n// Observe changes to street() property of person.address() object.\n// Note the 'deep path' (with ^) so if address() changes, continues to observe street() on new address().\n$.observe(person, \"address()^street()\", changeHandler);\n```\n\nSee for example the following sample, which uses:\n\n```js\n$.observe(person, \"name()\", \"phones()\", \"address()^street()\", changeHandler);\n```",
        "anchor": "observe"
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
            "code": "$.observe(person, \"name()\", \"phones()\", \"address()^street()\", changeHandler);"
          }
        ],
        "html": "<div class=\"left\">\n  <button id=\"changeObjects\">Change data</button>\n  <button id=\"setObjects\">Call setters</button><br/>\n  <button id=\"swapObjects\">Swap address and phones</button><br/>\n  <button id=\"insert\">Add phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label>Change Log:</label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <span class=\"floatleft\">{^{:number()}}</span>\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(Phone(phoneNo));\n}\n\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n// Instantiate View Model hierarchy\nvar alt = false,\n  address1 = Address(\"1st Ave\"),\n  phones1 = [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")],\n  address2 = Address(\"New Street\"),\n  phones2 = [Phone(\"123 123 1234\")],\n  person = Person(\"Pete\", address1, phones1);\n\n// Render and link the template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Observe specific properties on specific objects\n$.observe(person, \"name()\", \"phones()\", \"address()^street()\", changeHandler);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() { // Modify leaf values by observable changes of data\n  $.observable(person).setProperty(\"name\", person.name() + \"+\");\n  $.observable(person.address()).setProperty(\"street\", person.address().street() + \"+\");\n});\n\n$(\"#setObjects\").on(\"click\", function() { // Modify leaf values by calling setters\n  person.name(person.name() + \"*\");\n  person.address().street(person.address().street() + \"*\");\n});\n\n$(\"#swapObjects\").on(\"click\", function() {\n  person.address(alt ? address1 : address2);\n  person.phones(alt ? phones1 : phones2);\n  alt = !alt;\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones()).insert(new Phone(\"456 456 4567\"));\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \"\n      + $.views.converters.encode(JSON.stringify(eventArgs[key])) + \"</div>\";\n      // (Note that we encode < > and & as HTML entities, for display)\n  }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "350",
        "title": "Using $.observe() to observe View Model objects",
        "header": "<link href=\"/samples/change-log.css\" rel=\"stylesheet\"/>",
        "action": "append"
      },
      {
        "_type": "para",
        "title": "Chained paths with plain objects or with View Model objects",
        "text": "With plain object hierarchies you can use [chained paths](#linked-paths) in both templates, and `observe()` paths:\n\n```jsr\n<input data-link=\"address^street\" />\n```\n\n```js\n$.observe(person, \"address^street\", changeHandler);\n```\n\nSimilarly with *View Model* hierarchies you can again use chained paths, in both templates and `observe()` paths, as in the sample above:\n\n```jsr\n<input data-link=\"address()^street()\" />\n```\n\n```js\n$.observe(person, \"address()^street()\", changeHandler);\n```",
        "anchor": "chain"
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
        "text": "Helpers and converters used in *JsViews* apps are the same as regular *JsRender* helpers or converters -- defined/registered in the usual way (see *[Using helpers](#helpers)* and *[Using converters](#converters)*). \n\nThey can be used in template expressions, including data-linked expressions (see: *[Data-linked template syntax](#linked-template-syntax)*) such as:\n\n- `{^{: ~myFormatter(name)}}`\n- `{^{myCvt:name}}`\n- `<div data-link=\"~myFormatter(name)\" ...>`)\n- `<input data-link=\"{intToStr:amount:strToInt}\"/>`\n\nThe last of these examples illustrates the use of two-way data-binding in JsViews using converters (see *[Converters: convert and convert back](#link2way@converters)*).\n\nIn addition to global helpers (registered using [`$.views.helpers(myHelpers);`](#helpersapi)), JsViews lets you pass helpers in on a specific link call, as in:\n- `tmpl.link(\"#container\", data, myHelpers);` (*[Linked template](#jsvtmpllink@apihelpers)*)\n- `$.link(true, \"#target\", data, myHelpers);` (*[Top-level declarative linking](#jsv.toplink-true)*)\n- `$.link(expression, \"#target\", data, myHelpers);` (*[Top-level programmatic linking](#jsv.toplink-expr)*)\n"
      }
    ]
  },
  "link-formelems": {
    "title": "Data-linking to form elements",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following topics show data-linked textboxes, checkboxes, radio buttons, select drop-downs and lists, textareas and buttons:\n"
      },
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
      },
      {
        "_type": "links",
        "title": "See also",
        "links": [],
        "topics": [
          {
            "hash": "link2way",
            "label": "Two-way binding"
          },
          {
            "hash": "samples/form-elems",
            "label": "Form element samples"
          },
          {
            "hash": "samples/tag-controls/validate",
            "label": "Validate tag control samples"
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
        "text": "The following sample shows three equivalent ways of creating a data-linked button in a template, with the onclick action calling a function (such as a helper method or a View Model method).\n\nSee the *[Event binding](#link-events)* topic for details."
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
            "text": "```jsr\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{on ~doSomething}}Do something{{/on}}\n  <button data-link=\"{on ~doSomething}\">Do something</button>\n  <input type=\"button\" data-link=\"{on ~doSomething}\" value=\"Do something\" />\n</script>\n```\n\n```js\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{on ~doSomething}}Do something{{/on}}\n  <button data-link=\"{on ~doSomething}\">Do something</button>\n  <input type=\"button\" data-link=\"{on ~doSomething}\" value=\"Do something\" />\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar person = {};\n\nvar helpers = {\n  doSomething: function() {\n    alert(\"do something\");\n  }\n}\n\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n",
        "height": "50"
      },
      {
        "_type": "para",
        "title": "",
        "text": "[Top-level data-linking](#toplink) can also be used for `<button>` or `<input>`:\n\n"
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
            "text": "```jsr\n<div id=\"topLinked\">\n  <button data-link=\"{on ~doSomething}\">Do something</button>\n  <input type=\"button\" data-link=\"{on ~doSomething}\" value=\"Do something\" />\n</div>\n```\n\n```js\n$.link(true, \"#topLinked\", person, helpers); // Data-link top-level content\n```"
          }
        ],
        "code": "var person = {};\n\nvar helpers = {\n  doSomething: function() {\n    alert(\"do something\");\n  }\n}\n\n$.link(true, \"#topLinked\", person, helpers); // Data-link top-level content\n\n",
        "html": "<div id=\"topLinked\">\n  <button data-link=\"{on ~doSomething}\">Do something</button>\n  <input type=\"button\" data-link=\"{on ~doSomething}\" value=\"Do something\" />\n</div>\n",
        "height": "50"
      },
      {
        "_type": "para",
        "title": "Data-linking to the submit action",
        "text": "In the case of data-linking to a `submit` button within a form, it is often useful to instead data-link directly to the `submit` event of the form as shown in the *[Event binding](#link-events@eventname)* topic and in the *[Using submit](#samples/editable/submit)* sample."
      }
    ]
  },
  "link-elemattribs": {
    "title": "Data-linking to element attributes/properties",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "To data-link to an HTML element attribute, simply use the attribute name as data-link target.\n\nFor example to data-link to the `title` attribute use:\n\n```jsr\ndata-link=\"title{:dataPathOrExpression}\"\n```\n\nThis approach can be used for any HTML attribute, including `class`, `data-*` attributes etc., as shown in the following example:"
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
            "text": "```jsr\n<button data-link=\"\n  disabled{:disableButton}\n  title{:'Message: &quot;' + theTitle + '&quot;'}\n  data-myvalue{:myVal}\n  class{:disableButton ? 'class2' : 'class1'}\n\">\n```\n"
          }
        ],
        "html": "<style>\n.class1 {border-color:green;}\n.class2 {border-color:red;}\n</style>\n<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"\n    disabled{:disableButton}\n    title{:'Message: &quot;' + theTitle + '&quot;'}\n    data-myvalue{:myVal}\n    class{:disableButton ? 'class2' : 'class1'}\n  \">\n    I am {^{:disableButton?'disabled':'enabled'}}\n  </button><br/><br/>\n\n  <label><input data-link=\"disableButton\" type=\"checkbox\" /> Disable</label><br/>\n  <label>Set button title: <input data-link=\"theTitle\" /></label> (To see it, hover over the button...)<br/>\n  <label>data-myvalue property: <input data-link=\"myVal\" /></label> (To see it, click on the button...)\n</script>\n\n",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  theTitle: \"the title\",\n  disableButton: false,\n  myVal: \"My value\"\n}\n\ntmpl.link(\"#result\", data);\n\n$(\"button\").on('click', function() {\n  alert(\n    $(this).data(\"myvalue\") // Can use 'this.dataset.myvalue' for HTML 5 browsers\n  );\n})\n",
        "height": "140"
      },
      {
        "_type": "para",
        "title": "Removing HTML attributes, by returning null",
        "text": "When data-linking to an attribute, if the value of the attribute is set to `null` then the attribute will be removed. For example, setting `data-link=\"title{:myTitle||null}\"` will lead to the `title` attribute being removed from the element whenever `myTitle` returns a *falsy* value such as `\"\"`, `false` or `0`.\n\n*Special cases:* Setting `selected`, `disabled`, `multiple` or `readonly` to any *falsy* value will remove the corresponding attributes. Setting to any *truthy* value will set the attribute to a standard value such as `multiple=\"multiple\"`",
        "anchor": "remove"
      },
      {
        "_type": "para",
        "title": "Element attributes &ndash; and corresponding element properties",
        "text": "For attributes that are part of the HTML schema there is generally a corresponding property on the underlying HTML Element object, and data-linking to the attribute will also drive changes the corresponding property. For example, setting the `title` attribute will also set the underlying `elem.title` property. However, data-linking to an unknown attribute, such as `foo{:...}` will add a `foo=\"...\"` attribute, but will not set an `elem.foo` property.\n\n\n",
        "anchor": "elemattribs"
      },
      {
        "_type": "para",
        "title": "Data-linking directly to element properties",
        "text": "To data link directly to HTML Element properties, use `prop-propertyname` as data-link target.\n\nFor example to data-link to the `muted` property of a `<video>` element use `prop-muted`:\n\n```jsr\n<video ... data-link=\"prop-muted{:dataPathOrExpression}\" ...>\n```\n\nas in the following example:\n",
        "anchor": "props"
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
            "text": "```jsr\n<video ... data-link=\"prop-muted{:muted} prop-loop{:loop}\">\n  <source data-link=\"src{:src}\" ...>\n</video>\n```"
          }
        ],
        "html": "<style>video {width:400px; height:200px; margin-bottom:20px; display:block}</style>\n<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <video autobuffer controls data-link=\"prop-muted{:muted} prop-loop{:loop}\">\n    <source data-link=\"src{:src}\" type=\"video/mp4\">\n  </video>\n  <label>Muted: <input type=\"checkbox\" data-link=\"muted\"/></label>\n  <label>Loop: <input type=\"checkbox\" data-link=\"loop\"/></label>\n</script>\n",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  src: \"https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4\",\n  muted: true,\n  loop: true\n};\n\ntmpl.link(\"#result\", data);\n\n$(\"video\").on(\"volumechange\", function(ev) {\n  $.observable(data).setProperty(\"muted\", ev.target.muted);\n});\n",
        "height": "270"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [
          {
            "_type": "link",
            "hash": "hash",
            "label": "Data-linking to class",
            "url": "#link-class"
          }
        ],
        "topics": [
          {
            "_type": "topic",
            "hash": "linked-elem-syntax",
            "label": "Data-linked elements"
          },
          {
            "_type": "topic",
            "hash": "samples/data-link/attributes",
            "label": "Tutorial: Data-linking HTML attributes"
          }
        ]
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
          },
          {
            "hash": "jsvunlink",
            "label": "$.unlink()"
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
        "text": "Templates used in *JsViews* apps are regular *JsRender* templates, defined/registered in the usual way (see *[Using templates](#compiletmpl)*).\n\nHowever they can include data-linked tags (such as `{^{:name}}`) and data-linked elements (such as `<div data-link=\"name\" ...>`). See: *[Data-linked template syntax](#linked-template-syntax)*.\n\nInstead of being simply rendered by [`render()`](#rendertmpl) method, they are rendered and data-linked using the [`link()`](#jsvlinktmpl) method."
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
        "text": "MVVM (*Model/View/View-Model*) applications (including single page apps -- SPAs) generally work with data on the server, considered as the *Model*, and client data, in the browser -- which is a hierarchy of *View Models*. Client *View Models* are initialized from the server *Model*. \n\nThe user may be able to interact with *Views* in the browser, and drive changes to the *View Model*. There will then typically be a process of saving data (from the modified *View Model* in the browser) back to the server, to update the *Model*.\n\nThe following sample (available also at [samples/editable/submit](#samples/editable/submit)) illustrates this, and provides a *Submit Changes* button (which makes a 'snapshot' of current *View Model* data, and which would in a 'real app' save that data back to the server), and an *Undo* button (which reverts current *View Model* data back to the last 'snapshot').\n\nSpecifically:\n\n- *Submit Changes* is bound to the submit action of an HTML form -- so will be triggered also by *Enter*\n- It uses the *compiled View Model* [`unmap()`](#viewmodelsapi@unmap) feature to make a `snapshot` of data for sending to the server\n- *Undo* uses the *compiled View Model* [`merge()`](#viewmodelsapi@merge) feature to revert changes\n",
        "anchor": "save-undo-compiled"
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
        "anchor": "sample-save-undo-compiled",
        "height": "320",
        "title": "MVVM Save/Undo, using compiled View Models "
      },
      {
        "_type": "para",
        "title": "Save/Undo behavior in an MVVM application using plain objects",
        "text": "The above scenario of *Save/Undo* making a snapshot of current *View Model* data, and binding to the submit action, can be achieved with either *compiled View Models* or with plain object hierarchies. But it is easier to achieve with *compiled View Models*.\n\nBy way of comparison, here is the corresponding sample using plain objects:",
        "anchor": "save-undo-plain"
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
        "anchor": "sample-save-undo-plain",
        "height": "320",
        "html": "<link href=\"editable-data/sample.css\" rel=\"stylesheet\"/>\n\n<!----------------- Data-linked content -------------------> \n<div class=\"linkedContent\">\n  <div class=\"buttons\">\n    <button data-link=\"{on ~showData}\">show data</button>\n    <button data-link=\"{on ~deleteLast}\">delete last language</button>\n    <button data-link=\"{on ~undo} disabled{:msg !== ''}\">Undo</button>\n  </div>\n\n  <form data-link=\"{on 'submit' ~saveData}\">\n    <button class=\"buttons\" type=\"submit\"\n     data-link=\"disabled{:msg !== ''}\">Submit Changes</button>\n\n    <div class=\"comment\">Click to select and edit</div>\n    <table data-link=\"\n      {on 'click' '.addMovie' ~addMovie}\n      {on 'click' '.movies tr' ~select}\n      {on 'click' '.removeMovie' ~removeMovie}\n    \">\n      <thead><tr>\n        <th>Title</th><th>Languages</th>\n        <th><span class=\"addMovie\">Add</span></th>\n      </tr></thead>\n      <tbody class=\"movies\"\n        data-link=\"{for movies tmpl='#movieTemplate'}\"></tbody>\n    </table>\n\n    <div class=\"detail\"\n      data-link=\"{for movies[selectedIndex] tmpl='#detailTemplate'}\n        {on 'click' '.addLanguage' ~addLanguage}\n        {on 'click' '.removeLanguage' ~removeLanguage}\n    \"></div>\n  </form>\n\n  <div class=\"message\" data-link=\"msg\"></div>\n</div>\n\n<!----------------- Templates ------------------->\n<script id=\"movieTemplate\" type=\"text/x-jsrender\">\n  <tr class=\"hover\" data-link=\"css-background-color{:~bgColor(#index)}\">\n    <td>\n      <span data-link=\"#index + 1\"></span>:\n      <span data-link=\"title\"></span>\n    </td>\n    <td>\n      {^{for languages}}\n        <div data-link=\"name\"></div>\n      {{/for}}\n    </td>\n    <td><span class=\"removeMovie\"></span></td>\n  </tr>\n</script>\n\n<script id=\"detailTemplate\" type=\"text/x-jsrender\">\n  <div>\n    <div class=\"title\">Title:</div>\n    <div><input data-link=\"title\" /></div>\n    <div class=\"title\">\n      Languages: <span class=\"addLanguage\">Add</span>\n    </div>\n    {^{for languages ~movie=#data}}\n      <input data-link=\"name\" />\n      <span class=\"removeLanguage\"\"></span>\n    {{/for}}\n  </div>\n</script>\n\n<!----------------- Show data ------------------->\n<script id=\"showData\" type=\"text/x-jsrender\">\n  <hr/>\n  {{for movies}}<div>\n    <b>Movie:</b> {{>title}}\n    <b>Languages:</b> {{for languages}} {{>name}}{{/for}}\n  </div>{{/for}}\n</script>\n\n<div id=\"console\"></div>",
        "code": "var counter = 0,\n\n  // Initial data\n  app = {\n    msg: null,\n    selectedIndex: null,\n    movies: [\n      {\n        title:\"Meet Joe Black\",\n        languages: [\n          {name: \"English\"},\n          {name: \"French\"}\n        ]\n      },\n      {\n        title:\"Eyes Wide Shut\",\n        languages: [\n          {name: \"German\"},\n          {name: \"French\"},\n          {name: \"Spanish\"}\n        ]\n      }\n    ],\n    select: function(index) {\n      if (this.selectedIndex !== index) {\n        $.observable(this)\n          .setProperty(\"selectedIndex\", index);\n      }\n    },\n    showMsg: function(msg) {\n      $.observable(this).setProperty(\"msg\", msg);\n    }\n  },\n\n  savedData = JSON.stringify(app.movies),\n\n  handlers = {\n    undo: function() {\n      // Revert to previous savedData\n      $.observable(this.movies).refresh(JSON.parse(savedData));\n      $.observable(this).removeProperty(\"selectedIndex\");\n    },\n    saveData: function() {\n      // Make new savedData snapshot\n      savedData = JSON.stringify(this.movies);\n\n      // In real app, uncomment to save current data to the server:\n      // $.post(\"/save/data\", {movieData : savedData}, function(msg) {\n        var msg = \"In a real app, updated data would have been saved to server\";\n        this.showMsg(msg); // Display message\n      //});\n      return false; // Do not do default form action for submit\n    },\n    addMovie: function() {\n      $.observable(this.movies).insert({\n        title: \"NewTitle\" + counter ,\n        languages: [\n          {name: \"NewLanguage\" + counter++}\n        ]}\n      );\n      // Set selection on the added item\n      this.select($.view(\".movies tr:last\").index);\n    },\n    removeMovie: function(ev, evtArgs) {\n      this.select(); // unselect\n      var thisIndex = $.view(ev.target).index;\n      $.observable(this.movies).remove(thisIndex);\n      return false;\n    },\n    addLanguage: function(ev, evtArgs) {\n      var selectedMovie = this.movies[this.selectedIndex];\n      $.observable(selectedMovie.languages).insert({\n        name: \"NewLanguage\" + counter++\n      });\n    },\n    removeLanguage: function(ev, evtArgs) {\n      var selectedMovie = this.movies[this.selectedIndex];\n      var thisIndex = $.view(ev.currentTarget).index;\n      $.observable(selectedMovie.languages).remove(thisIndex);\n      return false;\n    },\n    select: function(ev, evtArgs) {\n      this.select($.view(ev.currentTarget).index);\n    },\n    deleteLast: function() {\n      if (this.movies.length) {\n        var languages = this.movies[this.movies.length - 1].languages;\n        $.observable(languages).remove();\n      }\n    },\n    showData: function() {\n      $(\"#console\").append($(\"#showData\").render(this));\n    },\n    bgColor: bgColor\n  };\n\n// Background color helper function\nfunction bgColor() {\n  return app.selectedIndex === this.index\n    ? \"yellow\"\n    : (this.index%2 ? \"#fdfdfe\" : \"#efeff2\");\n}\n\nbgColor.depends = [\"#index\", app, \"selectedIndex\"];\n\n$.observable(app.movies).observeAll(function() {\n  app.showMsg(\"\"); \n// If there have been any changes made to the movies data we clear\n// the Saved... message and this also drives the Save button\n// disabled property and the \"navigate away\" behavior.\n});\n\n// \"Navigate away\" behavior\n$(window).on('beforeunload', function(){\n  return app.msg === \"\" ? \"You have unsaved changes.\" : undefined;\n});\n\n$.link(true, \".linkedContent\", app, handlers);",
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
        "text": "Similarly, we will convert from JsRender to JsViews the [sample](#viewmodelsapi@mapsample) that took a *'View Model typed hierarchy'*, and created a complete hierarchy of *View Model* instances, by passing a plain data hierarchy to the top-level `map()` method.\n\nAgain the code for compiling *View Model* classes and for  then calling the [`map()`](#viewmodelsapi@map) method to generated the *View Model* hierarchy is unchanged:\n\n*Compile View Model classes (typed hierarchy):* \n\n```js\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // Declare 'name' as primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // Declare 'address' as Address (View Model) type\n     {getter: \"phones\", type: \"Phone\"}     // Declare 'phones' as (array) of Phone (View Model) types\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone: ...\n});\n```\n\n*Person data (plain object hierarchy, or JSON string):*\n\n```js\nvar personData = {\n    name: \"Pete\",\n    address: {street: \"1st Ave\"},\n    phones: [{number: \"111 111 1111\"}, ...]\n  };\n```\n\n*Use map() to convert from `personData` plain object hierarchy (or JSON string) to `person` *View Model* hierarchy:*\n\n```js\nvar person = $.views.viewModels.Person.map(personData);\n```"
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
        "html": "<div class=\"left\">\n  <button id=\"update\">Update</button>\n  <button id=\"revert\">Revert</button>\n  <button id=\"getData\">Get Data</button><br/>\n  <button id=\"changeName\">Change name</button>\n  <button id=\"addPhone\">Add Phone</button>\n  <div id=\"result\"></div>\n</div>\n\n<div class=\"logBox\">\n  <label><input type=\"checkbox\" checked id=\"attach\"/> Change Log</label>\n  <button class=\"clear\">Clear</button>\n  <div class=\"messages\"></div>\n</div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\"/></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\"/></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table></script>",
        "code": "var tmpl = $.templates(\"#personTmpl\");\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                               // name is a primitive type (string)\n      {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n      {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone:{\n    getters: [\"number\"]\n  }\n});\n\nvar vmCollection = $.views.viewModels;\n\n// Method for Person class\nfunction addPhone(phoneNo) {                // Uses vmCollection.Phone() to construct new instance\n  $.observable(this.phones()).insert(vmCollection.Phone(phoneNo));\n}\n\n// First version of data (e.g. from JSON request):\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\n// Second version of data (e.g. from JSON request):\nvar personData2 = {\n  name: \"Peter\",\n  address: {street: \"2nd Ave\"},\n  phones: [{number: \"111 111 9999\"},{number: \"333 333 9999\"}]\n};\n\n// Instantiate View Model hierarchy, using map()\nvar person = vmCollection.Person.map(personData);\n\n// Render and link the template against person (Person instance)\ntmpl.link(\"#result\", person);\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  person.merge(personData2);\n});\n\n$(\"#revert\").on(\"click\", function() {\n  person.merge(personData);\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n$(\"#getData\").on(\"click\", function() {\n  var updatedPersonData = person.unmap();\n  window.alert(JSON.stringify(updatedPersonData));\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"<div><em>observeAll path:</em> \" + ev.data.observeAll.path() + \"</div>\"\n  }\n  for (var key in eventArgs) {\n    message += \"<div><em>\" + key + \":</em> \"\n      + $.views.converters.encode(JSON.stringify(eventArgs[key])) + \"</div>\";\n      // (Note that we encode < > and & as HTML entities, for display)\n    }\n  $(\".messages\").append(\"<div>\" + message + \"</div>\");\n}",
        "height": "400",
        "anchor": "mergesample2",
        "title": "Using merge() and unmap() &ndash; with two-way binding",
        "header": "<link href=\"/samples/change-log.css\" rel=\"stylesheet\"/>",
        "action": "append"
      },
      {
        "_type": "para",
        "title": "MVVM &ndash; Save/Undo",
        "text": "Typically in an MVVM application, a *Save/Undo* feature will save *View Model* data back to the *Model* on the server, or revert *View Model* data back to the last version saved. \n\nThe *compiled View Model* [`merge()`](#viewmodelsapi@merge) and [`unmap()`](#viewmodelsapi@unmap) features are very useful for this scenario. See discussion and samples in the *[MVVM -- Dynamic view hierarchy](#mvvm-views)* topic."
      },
      {
        "_type": "para",
        "title": "Overriding generated get/set functions (JsViews version)",
        "text": "To override a generated *get/set* property provided by a compiled *View Model* you can provide an implementation in the `extend` hash, with the same name as the *get/set* in the `getters` array,  following the pattern below.\n\n(Note that this pattern is slightly different from the [JsRender version](#viewmodelsapi@override)):\n\n```js\n// Define a myNameGetSet(...) function, to override the compiled name(...) get/set function\nfunction myNameGetSet(val) {\n  if (!arguments.length) {\n    // No argument: use as a getter\n    return this._name;\n  }\n  // Called with argument: use as setter, and trigger observable change\n  $.observable(this).setProperty(\"name\", val);\n\n  // The above lines are standard compiled get/set code when using JsViews\n\n  console.log(\"name set to \" + val); // This is an additional line of code, for logging\n}\n\n// The following is standard compiled get/set code when using JsViews\nmyNameGetSet.set = function(val) {\n  // Setter called by observable property change\n  this._name = val;\n};\n\n// Declare a Person View Model with an overridden name() get/set property\n$.views.viewModels({\n  Person: {\n    getters: [\n      {getter: \"name\", ...}, // Compiled name() get/set\n      ...\n    ],\n    extend: {\n      name: myNameGetSet,    // Override name() get/set\n      ...\n    }\n    ...\n  },\n  ...\n});\n```\n\nThe above is equivalent to the generated version except that it adds custom logging to the getter/setter function.",
        "anchor": "override"
      },
      {
        "_type": "para",
        "title": "Sample showing some of the advanced View Model features",
        "text": "The next sample specifically highlights some of the advanced features of compiled *View Models*, by adding JsViews data-linking to the corresponding JsRender [sample](#viewmodelsapi@mergesampleadv).\n\n- It stores compiled *View Models* on a `myVmCollection` hash, as a *View Model typed collection*, rather than on<br/>`$.views.viewModels`\n- It maps from an array of 'people' rather than a single person:<br/>\n  `var people = Person.map(peopleData);`\n- It specifies an `id` key for `Person`. When updating the `phones` array the `id` value is treated as 'primary key', and used to map 'identity':<br/>\n  `id: \"id\"`\n- It provides an `id()` callback on `Person`, for determining identity -- allowing identification of corresponding *View Model* instances within the people array, and hence preventing unnecessary disposal and re-instantiation (which would destroy state, such as the `comment` value).\n- It has a `comment()` get/set property that is added as part of the `extend` definition, not the `getters`, so it is not initialized from data, in the constructor. Note therefore that if you set a *comment* on each `person` instance, then click *Update*, then *Revert*, one *comment* is conserved (since that instance is never disposed -- based on the 'identity' determination) but the other is lost since the instance is disposed and then re-created by *Revert*:<br/>\n  `extend: {...comment: comment...}`\n- It has `defaultVal` specified for `name`, `address` and `phones`, either as 'static' values or computed by a callback function:<br/>\n  `address: {type: \"Address\", defaultVal: defaultStreet}`\n- It overrides the generated `person.name()` *get/set* by a `myNameGetSet` function which includes logging\n- It passes a JSON string to `merge()` or `map()`",
        "anchor": "mergesampleadv"
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
            "text": "This sample, like the corresponding [JsRender version](#viewmodelsapi@mergesampleadv), shows some of the advanced features of compiled *View Models*.\n"
          }
        ],
        "html": "<style>table {margin-top: 9px;}</style>\n\n<button id=\"update\">Update</button>\n<button id=\"revert\">Revert</button>\n<button id=\"getData\">Get Data</button><br/>\n<button id=\"changeName\">Change name</button>\n<button id=\"addPhone\">Add Phone</button>\n\n<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Comment:</td><td><input data-link=\"comment()\"/></td></tr>\n    <tr><td>Name:</td><td><input data-link=\"name()\"/></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\"/></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones() ~personIndex=#index}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\" data-link=\"{on remove #index ~personIndex}\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table></script>",
        "code": "var tmpl = $.templates(\"#personTmpl\");\n\nvar myVmCollection = {};\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      {getter: \"name\", defaultVal: \"No name\"}, // Compiled name() get/set\n      {getter: \"address\", type: \"Address\", defaultVal: defaultAddress},\n      {getter: \"phones\", type: \"Phone\", defaultVal: []}\n    ],\n    extend: {\n      name: myNameGetSet,                      // Override name() get/set\n      addPhone: addPhone,\n      comment: comment                         // Additional get/set property, not initialized by data)\n    },\n    id: function(vm, plain) {                  // Callback function to determine 'identity'\n      return vm.personId === plain.personId;\n    }\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone: {\n    getters: [\"number\"],\n    extend: {\n      remove: remove,\n    },\n    id: \"phoneId\"                              // Treat phoneId as 'primary key', for identity\n  }\n}, myVmCollection);                            // Store View Models (typed hierarchy) on myVmCollection\n\n// Override generated name() get/set\nfunction myNameGetSet(val) {\n  if (!arguments.length) {\n    return this._name; // If there is no argument, use as a getter\n  }\n  $.observable(this).setProperty(\"name\", val);\n};\n\nmyNameGetSet.set = function(val) {\n  this._name = val; // Setter called by observable property change\n  console.log(\"name set to \" + val);           // This is an additional line of code, for logging\n};\n\n// Method for Person class\nfunction addPhone(phoneNo) {                   // Uses myVmCollection.Phone() to construct new instance\n  $.observable(this.phones()).insert(myVmCollection.Phone(phoneNo));\n}\n\n// Method for Phone class\nfunction remove(index, personIndex) {\n  $.observable(people[personIndex].phones()).remove(index);\n};\n\n// get/set for comment (state on View Model instance, not initialized from data)\nfunction comment(val) {\n  if (!arguments.length) {\n    return this._comment; // If there is no argument, use as a getter\n  }\n  $.observable(this).setProperty(\"comment\", val);\n}\n\ncomment.set = function(val) {\n  this._comment = val; // Setter called by observable property change\n};\n\nfunction defaultAddress() {                    // Function providing default address if undefined in data\n  return {street: 'No street for \"' + this.name + '\"'};\n}\n\n// First version of data - array of objects (e.g. from JSON request):\nvar peopleData = [\n  {\n    personId: \"1\",\n    address: {\n      street: \"2nd Ave\"\n    }\n  },\n  {\n    personId: \"2\",\n    name: \"Pete\",\n    phones: [\n      {number: \"333 333 3333\", phoneId: \"2a\"}\n    ]\n  }\n];\n\n// Second version of data - JSON string (e.g. new JSON request):\nvar peopleData2 = '[{\"personId\":\"2\",\"name\":\"Peter\",\"address\":{\"street\":\"11 1st Ave\"},'\n+ '\"phones\":[{\"number\":\"111 111 9999\",\"phoneId\":\"1a\"},{\"number\":\"333 333 9999\",\"phoneId\":\"2a\"}]}]';\n\n// Instantiate View Model hierarchy using map()\nvar people = myVmCollection.Person.map(peopleData);\n\n// Render and link the template against people (array of Person instances)\ntmpl.link(\"#result\", people);\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  people.merge(peopleData2);\n});\n\n$(\"#revert\").on(\"click\", function() {\n  people.merge(peopleData);\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  people[0].name(\"newName\");\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  people[0].addPhone(\"xxx xxx xxxx\");\n});\n\n$(\"#getData\").on(\"click\", function() {\n  var updatedPeopleData = people.unmap(people);\n  window.alert(JSON.stringify(updatedPeopleData));\n});",
        "height": "400",
        "title": "Mapping from JSON data to View Model hierarchy &ndash; further features",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "Adding a custom data-linked property to a compiled View Model",
        "text": "Finally, here is a sample which extends a compiled *View Model* with a custom hand-coded `Person.isManager() `*get/set* property. The property is coupled to the `Team.manager()` property -- so setting `Person.isManager(...)` will update the `Team.manager()` correspondingly (and conversely when setting `Team.manager(...)`.\n\n`Person.isManager` is not included in the `getters` declaration, so that the constructor for `Person` will not expect an `isManager` parameter to be provided for initialization.\n\nSee also the related JsRender samples -- [with](#viewmodelsapi@sample-parentref) or [without](#viewmodelsapi@ismanager) parentRef. Note that the *JsViews* version below is able to take advantage of data-linking, including data-linking directly to the custom `Person.isManager` property, and as a result is simpler than *JsRender* version, and requires less code. Also, changing *manager* triggers minimal incremental updates, whereas in the *JsRender* version it triggers a complete re-rendering of the whole template.",
        "anchor": "ismanagersample"
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
            "text": "```js\n// Custom function for Person.isManager get/set property\nfunction myIsManager(val) {\n  if (!arguments.length) {       // If there is no argument, use as a getter\n    return this === this.team.manager(); // true if this member is the manager\n  }\n  if (val) {                     // Setting this.isManager(true)\n    this.team.manager(this);     // So make this team member manager\n  } else if (this.isManager()) { // Setting this.isManager(false) and this team member is currently manager\n    this.team.manager(null);     // So set team manager to null\n  }\n}\n\n// Specify that the same function is a setter - for two-way data-linking\nmyIsManager.set = true;\n\n// Specify dependency: if team.manager() changes, manager.isManger() should update\nmyIsManager.depends = \"team.manager()\";\n\n// Compile View Models\n$.views.viewModels({\n  Team: {...},\n  Person: {\n    getters: [\"name\", ...],\n    extend: {\n      isManager: myIsManager        // use custom function\n    }\n  },\n  Address: {...}\n});\n\n// Initial data\nvar teamData = {\n    members: [\n      { name: \"Pete\", address: { street: \"1st Ave\", ZIP: \"12345\" } },\n      ...\n\n// Instantiate View Models\nvar team = $.views.viewModels.Team.map(teamData);\n\n//Initialize second team member to be manager.\nvar manager = team.members()[1];\nmanager.isManager(true);\n...\n```\n\nData-link directly to `isManager()` with two-way binding:\n```jsr\n<input data-link=\"isManager()\" type=\"checkbox\"/>\n```\n\nUse [*deep linking*](#linked-paths@deep) on other paths so they update when the `team.manager()` changes:\n```jsr\n<input data-link=\"manager()^address().ZIP()\" />\n```"
          }
        ],
        "html": "",
        "code": "",
        "height": "350",
        "title": "extending Person with an isManager property",
        "anchor": "",
        "url": "samples/computed/team-manager/sample"
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
    "title": "Data-linked template tag: {^{: ...}} (Evaluate)",
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
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on changeManager}\">Change manager</button><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n  <em>Nickname:</em> <input data-link=\"manager^nickname\" /><br/>\n\n  <em>&lcub;^{:manager^nickname || manager^name}&rcub;:</em>\n  <span class=\"spanbox\">\n    {^{:manager^nickname || manager^name}}\n  </span>\n\n</script>",
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
    "title": "Data-linked template tag: {^{> ...}} <span style=\"font-weight:normal;\">(HTML encode)</span>",
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
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on changeManager}\">Change manager</button><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n  <em>Nickname:</em> <input data-link=\"manager^nickname\" /><br/>\n\n  <em>&lcub;^{>manager^nickname || manager^name}&rcub;:</em>\n  <span class=\"spanbox\">\n    {^{>manager^nickname || manager^name}}\n  </span>\n</script>",
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
    "title": "Data-linked template tag: {^{include ...}} <span style=\"font-weight:normal;\">(Template composition &ndash; partials)</span>",
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
        "html": "<div id=\"result\"></div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n  I am {^{>manager^name}}\n</script>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on changeManager}\">Change manager</button><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n\n  <em>&lcub;{include tmpl=\"#managerTmpl\"/}&rcub;:</em>\n  <span class=\"spanbox\">\n    {{include tmpl=\"#managerTmpl\"/}}\n  </span>\n</script>\n\n",
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
        "html": "<div id=\"result\"></div>\n\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n  I am {^{>name}}\n</script>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on changeManager}\">Change manager</button><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n\n  <em>&lcub;^{include manager tmpl=\"#managerTmpl\"/}&rcub;:</em>\n  <span class=\"spanbox\">\n    {^{include manager tmpl=\"#managerTmpl\"/}}\n  </span>\n</script>\n\n",
        "code": "var team = {\n  person1: {\n    name: \"Peter\"\n  },\n  person2: {\n    name: \"Octavia\"\n  },\n  changeManager: function() {\n    $.observable(this).setProperty({\n      manager: this.manager === this.person1 ? this.person2 : this.person1\n    });\n  }\n};\n\nteam.manager = team.person1;\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", team);",
        "title": "{^{include}}",
        "anchor": "",
        "height": "130"
      },
      {
        "_type": "para",
        "title": "{^{include ...}} with dynamically changing template",
        "text": "If `{{include}}` uses `tmpl=expression` to obtain a template from data or from a helper, then the data-linked `{^{include}}` can be used to drive updates when the template changes dynamically:",
        "anchor": "chgtmpl"
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
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on changeManager}\">Change manager</button><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n  <em>Template:</em> <input data-link=\"manager^template\" /><br/>\n\n  <em>^&lcub;{include manager ^tmpl=\"manager^template\"/}&rcub;:</em>\n  <span class=\"spanbox\">\n    {^{include manager ^tmpl=manager^template/}}\n  </span>\n</script>",
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
    "title": "Data-linked template tag: {^{for ...}} <span style=\"font-weight:normal;\">(Template composition, with iteration over arrays)</span>",
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
        "text": "If `{{for}}` uses `tmpl=expression` to obtain a template from data or from a helper, then the data-linked `{^{for}}` can be used to drive updates when the template changes dynamically:",
        "anchor": "chgtmpl"
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
        "_type": "para",
        "title": "Using {^{for array}} with sorting and filtering, or specifying a range of items",
        "text": "The `{{for}}` tag has native sorting, filtering and 'range' features -- as described in the [corresponding  JsRender topic](#fortag@sortfilterrange). \n\nThe following sample illustrates use of the `start=...` and `end=...` properties of `{{for}}` to dynamically limit the 'range' of items.\n\n",
        "anchor": "jsvsortfilterrange"
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
            "text": "We use `{{for}}` to create a drop-down to select an integer between 1 and 10 as the `start` integer (...and similarly for the `end` integer):\n\n```jsr\n<select data-link=\"{:start:strToInt}\">\n  {^{for start=1 end=10}}\n    <option>{{:#data}}</option>\n  {{/for}}\n</select>\n```\n\nThen we again use `{{for}}` to show a partial list of team members:\n\n```jsr\n<ul>\n  {^{for members start=start-1 end=end}}\n    <li>\n      {^{:#index + ~root.start}}. {^{:name}}\n    </li>\n  {{else}}\n    <li>No items</li>\n  {{/for}}\n</ul>\n```"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n\n<div class=\"left\">\n  <b>Choose the range</b><br/><br/>\n\n  Start:\n  <select data-link=\"{:start:strToInt}\">\n    {^{for start=1 end=10}}\n      <option>{{:}}</option>\n    {{/for}}\n  </select>\n\n  End:\n  <select data-link=\"{:end:strToInt}\">\n    {^{for start=1 end=10}}\n      <option>{{:}}</option>\n    {{/for}}\n  </select>\n\n  <ul>\n    {^{for members start=start-1 end=end}}\n      <li>\n        {^{:#index + ~root.start}}. {^{>name}}\n      </li>\n    {{else}}\n      <li>No items</li>\n    {{/for}}\n  </ul>\n</div>\n\n<div class=\"left\">\n  <b>Edit the list</b><br/><br/>\n  <div class=\"buttons\">\n    <button id=\"add\">Add</button>\n  </div>\n\n  <ol>\n    {^{for members}}\n      <li>\n        <input data-link=\"name\" />\n        <span class=\"remove\"></span>\n      </li>\n    {{/for}}\n  </ol>\n</div>\n\n</script>",
        "code": "$.views.converters({\n  strToInt: function(value) {\n    return parseInt(value);\n  }\n});\n\nvar team = {\n  start: 2,\n  end: 4,\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team)\n  .on(\"click\", \".remove\", function() {\n    var view = $.view(this);\n    $.observable(team.members).remove(view.index);\n  })\n  .on(\"click\", \"#add\", function() {\n    $.observable(team.members).insert(0, {name: \"new\" + cnt++})\n  });",
        "header": "",
        "action": "append",
        "height": "260"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the sample [*JsViews: Using the {^{for}} tag to provide a dynamic 'purchases' grid control...*](#samples/sort-filter@jsv-for), which includes dynamic sorting, filtering, reverse, as well as a running totals helper function:\n\n```jsr\n{^{for lineItems sort=~sortBy reverse=~reverseSort filter=~filter}}\n  ...<td data-link=\"{:~total('quantity * price')}\"></td>...\n{{else}}\n  ...No items...\n{{/for}}\n```"
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
    "title": "Data-linked template tag: {^{props ...}} <span style=\"font-weight:normal;\">(Iteration over properties of an object)</span>",
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
        "title": "{^{props ...}} &ndash; iterating over string properties ",
        "url": ""
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
        "title": "{^{props ...}} &ndash; iterating over object properties",
        "anchor": "objectprops"
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
        "height": "140",
        "anchor": "chg-stringprops"
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
        "height": "140",
        "anchor": "chg-objectprops"
      },
      {
        "_type": "para",
        "title": "Loading and editing a dictionary/hash collection",
        "text": "The following sample is a copy of the last of the [Editable data](#samples/editable) set of samples, and illustrates providing completed editability of a data collection using a dictionary/hash :",
        "anchor": "load-hash"
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
            "text": "*Hash/dictionary of movies:*\n\n```js\nmovies = {\n  movJb: {\n    title:\"Meet Joe Black\",\n    ...\n  },\n  movEws: {\n    title:\"Eyes Wide Shut\",\n    ...\n  },\n```\n\n*Iterate:*\n\n```jsr\n<table>\n  ...\n  <tbody class=\"movies\">\n    {^{props}}\n      <tr...>\n        ...\n      </tr>\n    {{/props}}\n  </tbody>\n</table>\n```\n\n*Dynamic display of details based on key selection (rather than index selection):*\n\n```jsr\n<div class=\"detail\">\n  {^{for #data[~selectedKey]}}\n    ...\n  {{/for}}\n</div>\n```\n\n*Editing and selection actions for hash-based collection:*\n\n```js\nhelpers: {\n  ...\n  select: function select(key, ev, eventArgs) {\n    eventArgs.view.ctxPrm(\"selectedKey\", key);\n  },\n  addMovie: function(ev, eventArgs) {\n    var newKey = \"mov\" + counter;\n    $.observable(movies).setProperty(\n      newKey,\n      {\n        title: \"NewTitle\" + counter,\n        ...\n      }\n    );\n    eventArgs.view.ctxPrm(\"selectedKey\", newKey);\n  },\n  removeMovie: function(key, ev, eventArgs) {\n    eventArgs.view.ctxPrm(\"selectedKey\", null);\n    $.observable(movies).removeProperty(key);\n    return false;\n  },\n  ...\n```\n"
          }
        ],
        "codetabs": [],
        "url": "samples/editable-data/hash-dictionary/sample",
        "height": "320"
      },
      {
        "_type": "para",
        "title": "More advanced use of {{props}} &ndash; {{jsonview/}}",
        "text": "An example of more advanced use of `{{props}}` is the sample custom tag control `{{jsonview}}`, available from [download/sample-tagcontrols](#download/sample-tagcontrols). That tag control uses `{^{props}}`, and recursively calls itself:\n\n```jsr\n{^{props}}\n  <li>\n    ...\n    {^{jsonview prop/}}...\n  </li>\n{{/props}}\n```\n\nThe `{{jsonview}}` tag control can be included in any JsViews page, to show the contextual data at that place in the page, or to show given data returned by an expression `{^{jsonview someExpression /}}`. Changes to the data will then update dynamically.\n\nIn the next sample we update the previous one, to include:\n\n- a data-linked `{^{jsonview/}}` control to show current data\n- allow the user to modify the key values in the members object, using `<input data-link=\"key\" />`\n- `{^{props}}...{{else}}...{{/props}}` to show a message if the members object is 'empty'\n\nThis sample is also available at [samples/tag-controls/jsonview](#samples/tag-controls/jsonview).",
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
        "url": "samples/tag-controls/jsonview/sample"
      },
      {
        "_type": "para",
        "title": "{^{props ...}} with dynamically changing template (advanced)",
        "text": "If `{{props}}` uses `tmpl=expression` to obtain a template from data or from a helper, then the data-linked `{^{props}}` can be used to drive updates when the template changes dynamically.\n\nHere it is in a sample (similar to the [corresponding sample](#jsvfortag@chgtmpl) using the `{^{for}}` tag). ",
        "anchor": "chgtmpl"
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
        "_type": "para",
        "title": "Using {^{props}} with sorting and filtering, or specifying a range of properties",
        "text": "The `{{props}}` tag has native sorting, filtering and 'range' features -- as described in the [corresponding  JsRender topic](#propstag@sortfilterrange). \n",
        "anchor": "sortfilterrange"
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
    "title": "Data-linked template tag: {^{if ...}} <span style=\"font-weight:normal;\">(Conditional inclusion)</span>",
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
        "text": "If the `{{if}}` or an associated `{{else}}` tag use template references, rather than inline markup, with `tmpl=expression` (obtaining a template from data or from a helper), then the data-linked `{^{if}}` can be used to drive updates when any of the templates change dynamically:",
        "anchor": "if-else-tmpl"
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
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label><input type=\"checkbox\" data-link=\"isEditable\"/> Editable</label><br/>\n  <label><input type=\"checkbox\" data-link=\"reverse\"/> Reverse</label><br/><br/>\n\n  {^{if reverse ^tmpl=isEditable?'#editableReverseTmpl':'#noeditReverseTmpl'}}\n  {{else ^tmpl=isEditable?'#editableTmpl':'#noeditTmpl'}}\n  {{/if}}\n</script>\n\n<script id=\"editableReverseTmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"last\" />, <input data-link=\"first\" />\n</script>\n\n<script id=\"noeditReverseTmpl\" type=\"text/x-jsrender\">\n  <b>{{>last}}</b>, {{:first}}\n</script>\n\n<script id=\"editableTmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"first\" /> <input data-link=\"last\" />\n</script>\n\n<script id=\"noeditTmpl\" type=\"text/x-jsrender\">\n  {{>first}} <b>{{>last}}</b>\n</script>",
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
    "title": "Data-linked template tag: {{else ...}} <span style=\"font-weight:normal;\">(Content blocks separator)</span>",
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
            "text": "*<div class=\"close\">Template:</div>*\n\n```jsr\n...\n{^{if type==='book'}}\n  The book price is {{>price}} \n{{else type==='car'}}\n  The car costs {{>price}}\n{{else}}\n  Nothing chosen\n{{/if}}\n...\n```\n\nNote that `{{else expression}}` behaves as *else if*, but it is not necessary to write `{^{else expression}}` -- since the dynamic data-linking is determined by the associated `{^{if ...}}` tag. "
          }
        ],
        "html": "<div id=\"object\"></div>\n\n<script id=\"objectTemplate\" type=\"text/x-jsrender\">\n  <select data-link=\"type\" size=\"3\">\n    <option value=\"\">Choose type</option>\n    <option>book</option>\n    <option>car</option>\n  </select><br/><br/>\n\n  <input data-link=\"type\" /><br/><br/>\n \n  {^{if type==='book'}}\n    The book price is {{>price}} \n  {{else type==='car'}}\n    The car costs {{>price}}\n  {{else}}\n    Nothing chosen\n  {{/if}}\n</script>\n",
        "code": "var object = {\n  type: \"car\",\n  price:\"$25000\"\n};\n\nvar tmpl = $.templates(\"#objectTemplate\");\n\ntmpl.link(\"#object\", object);\n\n",
        "title": "{^{if ...}} ... {{else ...}} ... {{else}} ... {{/if}}",
        "height": "160",
        "anchor": "if-else-multiple"
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
        "height": "130",
        "title": "{^{for ...}} ... {{else ...}} ... {{else}} ... {{/for}}",
        "anchor": "for-else-multiple"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For the case of `{^{if}}...{{else}}...{{/if}}` binding, with external template references, see the last [`{^{if}}` sample](#jsviftag@if-else-tmpl), which uses the pattern:\n\n```jsr\n{^{if ... ^tmpl=...}}\n{{else ^tmpl=...}}\n{{/if}}\n```"
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
        "text": "The `{^{on ...}}` tag is used:\n\n- for attaching event handlers, using the syntax `data-link=\"{on ...}\"`\n- for [creating buttons](#link-events@button), to call a *data method/View Model method/helper method*.\n\nIt is used only as a data-bound tag in *JsViews*, and is not available in *JsRender*. \n\nSee the *[Event bindings](#link-events)* topic for more information and examples.\n"
      }
    ]
  },
  "jsvcustomtags": {
    "title": "Data-linked custom tags",
    "path": "",
    "sections": []
  },
  "jsvradiogrouptag": {
    "title": "Data-linked template tag: {^{radiogroup ...}} <span style=\"font-weight:normal;\">(Radio button group)</span>",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Alternatives for data-linking radio buttons: direct linking, or {^{radiogroup}}",
        "text": "- One way to provide two-way data-binding on a group of radio buttons is by directly data-linking each of the `<input>` elements, as described in the *[Data-linked radio buttons](#link-input@radio2waydirect)* topic\n- An alternative and often more convenient approach is to wrap the `<input>`s with a `{^{radiogroup}}` tag, as shown in this section\n"
      },
      {
        "_type": "para",
        "title": "The {^{radiogroup}} tag",
        "text": "The `{^{radiogroup ...}}` tag is used to provide two-way data-linking to a group of radio buttons.\n\nIt is used only as a data-bound tag in *JsViews*, and is not available in *JsRender*.\n\nThe set of radio buttons (`<input type=\"radio\">`) are wrapped by the tag (or contained in the external template referenced by `tmpl=...`) -- and are data-linked to the data property specified by the path or expression: `{^{radiogroup pathOrExpr}}`.\n",
        "anchor": "radiogroup"
      },
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{^{radiogroup pathOrExpr}}",
        "name": "name",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "string",
                "optional": false,
                "description": "Path or expression for the data-linked property (of type string)"
              }
            ],
            "sections": [],
            "example": "{{radiogroup selectedCar}}\n  &lt;label&gt;\n    &lt;input type=\"radio\" value=\"vlv\"/&gt; \n    Volvo\n  &lt;/label&gt;\n  ...\n{{/radiogroup}}",
            "description": "Two-way binding between the current selection of a radio button group and a data property"
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
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar data = {\n  selectedCar: \"frd\",\n  ...\n};\n```\n\n*<div class=\"close\">HTML:</div>*\n\n```jsr\n{^{radiogroup selectedCar}}\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  <label><input type=\"radio\" value=\"vlv\"/> Volvo</label>\n  <label><input type=\"radio\" value=\"frd\"/> Ford</label>\n{{/radiogroup}}\n```\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{radiogroup selectedCar}}\n    <label><input type=\"radio\" value=\"\"/>\n      None</label><br/>\n    <label><input type=\"radio\" value=\"vlv\"/>\n      Volvo</label><br/>\n    <label><input type=\"radio\" value=\"frd\"/>\n      Ford</label><br/>\n  {{/radiogroup}}\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedCar: \"frd\"};\n\ntmpl.link(\"#result\", data);",
        "height": "130",
        "title": "{^{radiogroup}}"
      },
      {
        "_type": "para",
        "title": "The name property of the radio &lt;input&gt; elements",
        "text": "If the radio button group is within an HTML `<form>` which will be submitted, then the associated `name` property of the radio button group may be specified on the `{^{radiogroup}}`:\n\n```jsr\n{^{radiogroup selectedCar name=\"cars\"}}\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  ...\n{{/radiogroup}}\n```\n\nAlternatively it can be specified on each `<input>`\n\n```jsr\n{^{radiogroup selectedCar}}\n  <label><input type=\"radio\" value=\"\" name=\"cars\"/> None</label>\n  <label><input type=\"radio\" value=\"vlv\" name=\"cars\"/> Volvo</label>\n  ...\n{{/radiogroup}}\n```\n\nIf it is not specified, then each `{^{radiogroup}}` will provide an auto-generated unique `name`, which will be set on the radio button `<input>` elements.",
        "anchor": "name"
      },
      {
        "_type": "para",
        "title": "Using a data-linked element &ndash; with data-link=\"{radiogroup ...}\"",
        "text": "An alternative to wrapping radio button `<input>` tags in a `{^{radiogroup}}` tag is to wrap them in a data-linked HTML element tag such as a `<div>`, using `data-link=\"{radiogroup ...}\"`.\n\n```jsr\n<div data-link=\"{radiogroup selectedCar}\">\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  ...\n</div>\n```\n\nThis approach can be used within templates, but is particularly useful for [top-level data-linking](#toplink), as in the following sample:\n",
        "anchor": "datalink"
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
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar data = {\n  selectedCar: \"frd\",\n  ...\n};\n```\n\n*<div class=\"close\">HTML:</div>*\n\n```jsr\n<div data-link=\"{radiogroup selectedCar}\">\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  <label><input type=\"radio\" value=\"vlv\"/> Volvo</label>\n  ...\n</div>\n```\n"
          }
        ],
        "html": "<div id=\"top-level-linked\">\n  <div data-link=\"{radiogroup selectedCar}\">\n    <label><input type=\"radio\" value=\"\"/> None</label><br/>\n    <label><input type=\"radio\" value=\"vlv\"/> Volvo</label><br/>\n    <label><input type=\"radio\" value=\"frd\"/> Ford</label>\n  </div>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n</div>",
        "code": "var data = {selectedCar: \"frd\"};\n\n$.link(true, \"#top-level-linked\", data);\n",
        "height": "130",
        "title": "Top-level {radiogroup} binding",
        "anchor": "top-radiogroup"
      },
      {
        "_type": "para",
        "title": "{^{radiogroup}} with {{for}}",
        "text": "A common scenario is when the options in a radio button group come from a data array. The `<input type=\"radio\">` elements wrapped by a `{^{radiogroup}}` can be generated by a `{{for}}` tag, as in the following example:",
        "anchor": "fortag"
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
            "text": "*<div class=\"close\">Data includes `cars` array:</div>*\n\n```js\nvar data = {\n  selectedCar: \"frd\",\n  cars: [{id: \"vlv\", name: \"Volvo\"}, ...]\n};\n```\n\n*<div class=\"close\">{{radiogroup}} tag wrapping a data-driven array of radio buttons (preceded by an additional 'unselected' radio button):</div>*\n\n```jsr\n{^{radiogroup selectedCar}}\n  <label><input type=\"radio\" value=\"\"/> None</label><br/>\n  {{for cars}}\n    <label><input type=\"radio\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n  {{/for}}\n{{/radiogroup}}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{radiogroup selectedCar}}\n    <label><input type=\"radio\" value=\"\"/> None</label><br/>\n    {{for cars}}\n      <label><input type=\"radio\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n    {{/for}}\n  {{/radiogroup}}\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "title": "",
        "height": "130"
      },
      {
        "_type": "para",
        "title": "",
        "text": "*__Note:__* The data-driven set of radio buttons can change dynamically, driven by `{^{for}}`, as shown in [this sample](#link-input@radioedit)."
      },
      {
        "_type": "para",
        "title": "Radio buttons in an external template, using {radiogroup tmpl=...}",
        "text": "The set of radio buttons wrapped by a `{^{radiogroup}}` can be in an external template, referenced using `{^{radiogroup tmpl=...}}` or `data-link=\"{radiogroup tmpl=...}\"`, as in the following example:",
        "anchor": "tmpl"
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
            "text": "*<div class=\"close\">Template, containing radio buttons:</div>*\n\n```jsr\n<script id=\"inner\" type=\"text/x-jsrender\">\n  <label><input type=\"radio\" value=\"\"/> None</label><br/>\n  ...\n</script>\n```\n\n*<div class=\"close\">Referencing \"#inner\" template from data-linked tag</div>*\n\n```jsr\n{^{radiogroup selectedCar tmpl=\"#inner\"/}}<br/>\n```\n\n*<div class=\"close\">Referencing \"#inner\" template from data-linked element</div>*\n\n```jsr\n<div data-link=\"{radiogroup selectedCar tmpl='#inner'}\"></div>\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"inner\" type=\"text/x-jsrender\">\n  <label><input type=\"radio\" value=\"\"/> None</label><br/>\n  {{for cars}}\n    <label><input type=\"radio\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n  {{/for}}\n</script>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{radiogroup selectedCar tmpl=\"#inner\"/}}<br/>\n\n  <div data-link=\"{radiogroup selectedCar tmpl='#inner'}\"></div>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "title": "tmpl",
        "height": "200"
      },
      {
        "_type": "para",
        "title": "Data context within block is the same as the outer context",
        "text": "Note that using either a `{^{radiogroup ...}}` tag or a `<div data-link=\"radiogroup ...}\">` to wrap a content block leaves the data-context unchanged. -- The current data item within the block is the same as the outer data context (including when referenced as an external template, as in the samples above).",
        "anchor": "context"
      },
      {
        "_type": "para",
        "title": "The {^{radiogroup}} disabled property",
        "text": "The `{^{radiogroup}}` tag has a `disabled` property which can be used for disabling/enabling the radio buttons, as shown [here](#link-input@disabled).",
        "anchor": "disabled"
      },
      {
        "_type": "para",
        "title": "Data-linking a {^{radiogroup}} using converters",
        "text": "Just like any other tag, `{^{radiogroup}}` can use *convert* and *convertBack* converters, using the syntax:\n\n```jsr\n{^{radiogroup convert=... convertBack=.../}}\n```\n\nas shown in the [this sample](#link-input@radioconvert), which data-links to an integer: the index of the `item` in the `items` array, rather than the `item.id` string value -- and uses converters convert between `id` and `index`",
        "anchor": "converters"
      },
      {
        "_type": "para",
        "title": "Data-linking radio buttons to integer variables",
        "text": "Selection of data-linked radio buttons is determined by comparing the current value of the date variable to the `value` of the `<input type=\"radio\" value=\"...\" />` -- which is necessarily of type *string*.\n\nIn order to data-link to a data variable of type *number* (integer), use *intToStr* and *strToInt* converters, as shown in the following samples:\n\n",
        "anchor": "integer"
      },
      {
        "_type": "links",
        "title": "",
        "links": [
          {
            "_type": "link",
            "hash": "hash",
            "label": "Form elements: Two-way binding and converters",
            "url": "#samples/form-els/converters"
          },
          {
            "_type": "link",
            "hash": "hash",
            "label": "Form elements: Array binding",
            "url": "#samples/form-els/array-binding"
          }
        ],
        "topics": []
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "- For additional details and samples see *[Data-linked radio buttons](#link-input@radio)*\n- For examples of `{^{radiogroup}}` tags wrapping *jQuery UI* `{{radio}}` tag controls, see the [Toolbar samples](#samples/tag-controls/jqui/toolbar)"
      }
    ]
  },
  "jsvcheckboxgrouptag": {
    "title": "Data-linked template tag: {^{checkboxgroup ...}} <span style=\"font-weight:normal;\">(Checkbox group)</span>",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Alternatives for data-linking groups of checkboxes: direct linking, or {^{checkboxgroup}}",
        "text": "- One way to provide two-way data-binding on a group of checkboxes is by directly data-linking each of the `<input>` elements, as described in the *[Data-linked checkbox groups](#link-input@checkboxgroup2waydirect)* topic\n- An alternative and often more convenient approach is to wrap the `<input>`s with a `{^{checkboxgroup}}` tag, as shown in this section\n"
      },
      {
        "_type": "para",
        "title": "The {^{checkboxgroup}} tag",
        "text": "The `{^{checkboxgroup ...}}` tag is used to provide two-way data-linking to a group of checkboxes.\n\nIt is used only as a data-bound tag in *JsViews*, and is not available in *JsRender*.\n\nThe set of checkboxes (`<input type=\"checkbox\">`) are wrapped by the tag (or contained in the external template referenced by `tmpl=...`) -- and are data-linked to the data property specified by the path or expression: `{^{checkboxgroup pathOrExpr}}`. The data property will be an array of string values corresponding to the selected items (checked checkboxes). (Alternatively, by using converters, the data property can instead be an array of selected obects, as in [this sample]()).\n\n(Note that when the user modifies the selection of checked checkboxes, the data property is observably *replaced* by a new array. This means that in order to observe the *length* of the array, you need to use a [deep path](#linked-paths@deep), such as `selectedSports^length` in the example [below](#jsvcheckboxgrouptag@sample)).\n\n\n\n",
        "anchor": "checkboxgroup"
      },
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{^{checkboxgroup pathOrExpr}}",
        "name": "name",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "array of strings",
                "optional": false,
                "description": "Path or expression for the data-linked property (of type array of strings)"
              }
            ],
            "sections": [],
            "example": "{{checkboxgroup selectedSports}}\n  &lt;label&gt;\n    &lt;input type=\"checkbox\" value=\"running\"/&gt; \n    Running\n  &lt;/label&gt;\n  ...\n{{/checkboxgroup}}",
            "description": "Two-way binding between the current selection of checked checkboxes within a group, and a data property (array of selected 'value' strings)"
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
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar data = {\n  {selectedSports: [\"soccer\", \"running\"],\n  ...\n};\n```\n\n*<div class=\"close\">HTML:</div>*\n\n```jsr\n{^{checkboxgroup selectedSports}}\n  <label><input type=\"checkbox\" value=\"swimming\"/> Swimming</label>\n  <label><input type=\"checkbox\" value=\"running\"/> Running</label>\n  <label><input type=\"checkbox\" value=\"soccer\"/> Soccer</label>\n{{/checkboxgroup}}\n\n... Number of checked options: {^{:selectedSports^length}}\n\n```\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{checkboxgroup selectedSports}}\n    <label><input type=\"checkbox\" value=\"swimming\"/> Swimming</label><br/>\n    <label><input type=\"checkbox\" value=\"running\"/> Running</label><br/>\n    <label><input type=\"checkbox\" value=\"soccer\"/> Soccer</label><br/>\n  {{/checkboxgroup}}\n\n  <div>(Number of checked options: {^{:selectedSports^length}})</div>\n\n  <div class=\"spanbox\">Sports:<ul>\n    {^{for selectedSports}}<li>{^{:}}</li>{{/for}}\n  </ul></div>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedSports: [\"soccer\", \"running\"]};\n\ntmpl.link(\"#result\", data);",
        "height": "200",
        "title": "{^{checkboxgroup}}",
        "anchor": "sample"
      },
      {
        "_type": "para",
        "title": "The name property of the checkbox &lt;input&gt; elements",
        "text": "If the checkbox group is within an HTML `<form>` which will be submitted, then the associated `name` property of the checkbox group may be specified on the `{^{checkboxgroup}}`:\n\n```jsr\n{^{checkboxgroup selectedSports name=\"sports\"}}\n  <label><input type=\"checkbox\" value=\"...\"/> ...</label>\n  ...\n{{/checkboxgroup}}\n```\n\nAlternatively it can be specified on each `<input>`\n\n```jsr\n{^{checkboxgroup selectedSports}}\n  <label><input type=\"checkbox\" value=\"swimming\" name=\"sports\"/> Swimming</label>\n  <label><input type=\"checkbox\" value=\"running\" name=\"sports\"/> Running</label>\n  ...\n{{/checkboxgroup}}\n```\n\nIf it is not specified, then each `{^{checkboxgroup}}` will provide an auto-generated unique `name`, which will be set on the checkbox `<input>` elements.",
        "anchor": "name"
      },
      {
        "_type": "para",
        "title": "Using a data-linked element &ndash; with data-link=\"{checkboxgroup ...}\"",
        "text": "An alternative to wrapping checkbox `<input>` tags in a `{^{checkboxgroup}}` tag is to wrap them in a data-linked HTML element tag such as a `<div>`, using `data-link=\"{checkboxgroup ...}\"`.\n\n```jsr\n<div data-link=\"{checkboxgroup selectedSports}\">\n  <label><input type=\"checkbox\" value=\"...\"/> ...</label>\n  ...\n</div>\n```\n\nThis approach can be used within templates, but is particularly useful for [top-level data-linking](#toplink), as in the following sample:\n",
        "anchor": "datalink"
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
            "text": "*<div class=\"close\">Data:</div>*\n\n```js\nvar data = {\n  {selectedSports: [\"soccer\", \"running\"],\n  ...\n};\n```\n\n*<div class=\"close\">HTML:</div>*\n\n```jsr\n  <div data-link=\"{checkboxgroup selectedSports}\">\n    <label><input type=\"checkbox\" value=\"swimming\"/> Swimming</label><br/>\n    <label><input type=\"checkbox\" value=\"running\"/> Running</label><br/>\n    <label><input type=\"checkbox\" value=\"soccer\"/> Soccer</label><br/>\n  </div>\n```"
          }
        ],
        "html": "<div id=\"top-level-linked\">\n  <div data-link=\"{checkboxgroup selectedSports}\">\n    <label><input type=\"checkbox\" value=\"swimming\"/> Swimming</label><br/>\n    <label><input type=\"checkbox\" value=\"running\"/> Running</label><br/>\n    <label><input type=\"checkbox\" value=\"soccer\"/> Soccer</label><br/>\n  </div>\n\n  <div class=\"spanbox\">Sports:<ul data-link=\"{for selectedSports tmpl='liTmpl'}\"></ul></div>\n</div>",
        "code": "$.templates(\"liTmpl\", \"<li>{{:}}</li>\");\n\nvar data = {selectedSports: [\"soccer\", \"running\"]};\n\n$.link(true, \"#top-level-linked\", data);\n",
        "height": "190",
        "title": "Top-level {checkboxgroup} binding",
        "anchor": "top-checkboxgroup"
      },
      {
        "_type": "para",
        "title": "{^{checkboxgroup}} with {{for}}",
        "text": "A common scenario is when the options in a checkbox group come from a data array. The `<input type=\"checkbox\">` elements wrapped by a `{^{checkboxgroup}}` can be generated by a `{{for}}` tag, as in the following example:",
        "anchor": "fortag"
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
            "text": "*<div class=\"close\">Data includes `sports` array:</div>*\n\n```js\nvar data = {\n  selectedSports: [\"climbing\"],\n  sports: [\n    {id: \"swimming\", name: \"Swimming\"},\n    {id: \"climbing\", name: \"Mountain climbing\"},\n    ...\n  ]\n};\n```\n\n*<div class=\"close\">{{checkboxgroup}} tag wrapping a data-driven array of checkboxes:</div>*\n\n```jsr\n{^{checkboxgroup selectedSports}}\n  {{for sports}}\n    <label><input type=\"checkbox\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n  {{/for}}\n{{/checkboxgroup}}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{checkboxgroup selectedSports}}\n    {{for sports}}\n      <label><input type=\"checkbox\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n    {{/for}}\n  {{/checkboxgroup}}\n\n  <div class=\"spanbox\">Sports:<ul>\n    {^{for selectedSports}}<li>{^{:}}</li>{{/for}}\n  </ul></div>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedSports: [\"climbing\"],\n  sports: [\n    {id: \"swimming\", name: \"Swimming\"},\n    {id: \"climbing\", name: \"Mountain climbing\"},\n    {id: \"trailrun\", name: \"Trail running\"},\n    {id: \"soccer\", name: \"Soccer\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "title": "",
        "height": "200"
      },
      {
        "_type": "para",
        "title": "",
        "text": "*__Note:__* The data-driven set of checkboxes can change dynamically, driven by `{^{for}}`, as shown in [this sample](#link-input@radioedit)."
      },
      {
        "_type": "para",
        "title": "Checkboxes in an external template, using {checkboxgroup tmpl=...}",
        "text": "The set of checkboxes wrapped by a `{^{checkboxgroup}}` can be in an external template, referenced using `{^{checkboxgroup tmpl=...}}` or `data-link=\"{checkboxgroup tmpl=...}\"`, as in the following example:",
        "anchor": "tmpl"
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
            "text": "*<div class=\"close\">Template, containing checkboxes:</div>*\n\n```jsr\n<script id=\"inner\" type=\"text/x-jsrender\">\n  ...\n  <label><input type=\"checkbox\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n  ...\n</script>\n```\n\n*<div class=\"close\">Referencing \"#inner\" template from data-linked tag</div>*\n\n```jsr\n{^{checkboxgroup selectedSports tmpl=\"#inner\"/}}<br/>\n```\n\n*<div class=\"close\">Referencing \"#inner\" template from data-linked element</div>*\n\n```jsr\n<div data-link=\"{checkboxgroup selectedSports tmpl='#inner'}\"></div>\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"inner\" type=\"text/x-jsrender\">\n  {{for sports}}\n    <label><input type=\"checkbox\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n  {{/for}}\n</script>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{checkboxgroup selectedSports tmpl=\"#inner\"/}}<br/>\n\n  <div data-link=\"{checkboxgroup selectedSports tmpl='#inner'}\"></div>\n\n  <div class=\"spanbox\">Sports:<ul>\n    {^{for selectedSports}}<li>{^{:}}</li>{{/for}}\n  </ul></div>\n</script>",
        "code": "var tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedSports: [\"climbing\"],\n  sports: [\n    {id: \"swimming\", name: \"Swimming\"},\n    {id: \"climbing\", name: \"Mountain climbing\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);",
        "title": "tmpl",
        "height": "200"
      },
      {
        "_type": "para",
        "title": "Data context within block is the same as the outer context",
        "text": "Note that using either a `{^{checkboxgroup ...}}` tag or a `<div data-link=\"checkboxgroup ...}\">` to wrap a content block leaves the data-context unchanged. -- The current data item within the block is the same as the outer data context (including when referenced as an external template, as in the samples above).",
        "anchor": "context"
      },
      {
        "_type": "para",
        "title": "The {^{checkboxgroup}} disabled property",
        "text": "The `{^{checkboxgroup}}` tag has a `disabled` property which can be used for disabling/enabling the checkboxes, as shown [here](#link-input@checkboxgroupdisabled).",
        "anchor": "disabled"
      },
      {
        "_type": "para",
        "title": "Data-linking a {^{checkboxgroup}} using converters",
        "text": "Just like any other tag, `{^{checkboxgroup}}` can use *convert* and *convertBack* converters, using the syntax:\n\n```jsr\n{^{checkboxgroup convert=... convertBack=.../}}\n```\n\nas shown in the [this sample](#link-input@checkboxgroupconvert), which data-links to an integer: the index of the `item` in the `items` array, rather than the `item.id` string value -- and uses converters convert between `id` and `index`",
        "anchor": "converters"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "For additional details and samples see *[Data-linked checkbox groups](#link-input@checkboxgroup)*\n"
      }
    ]
  },
  "other": {
    "title": "And computed observable, {{on}}, DataMap. lateRender...",
    "path": "",
    "sections": []
  },
  "eventArgs": {
    "title": "The <em>eventArgs</em> object (JsViews), for observable changes",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "[Observable changes](#$observable) to objects or arrays trigger *[onPropertyChange](#onpropchange)* or *[onArray\nChange](#onarrchange)* events, which can be observed using event handlers such as `myHandler` below:\n\n```js\n$.observe(person, \"firstName\", myHandler);\n$.observable(person).setProperty(\"firstName\", \"newName\");\n...\n```\n\n```js\nfunction myHandler(ev, eventArgs) {\n  ...\n}\n```\n\n**The first handler argument (`ev`) is the _jQuery event object_**\n\nThe properties include:\n\n- `target`: the object which changed\n- `namespace`: The *insert()* / *remove()* / *move()* / *refresh()* [namespace](#namespaces@handler)\n- `data`: *JsViews metadata*:\n\n-- where *`ev.data` JsViews metadata* corresponds to the `observe()` or `observeCall()` call, with properties that include:\n\n- `ns`: The handler [namespace](#namespaces@handler)\n- `fullPath`: the full path –- such as `\"team.manager.address.street\"`\n- `prop`: the property being changed -– such as `\"manager\"`\n- `paths`: array of 'ongoing' paths -- when doing 'deep' binding<br/>(So if this property is part of a deep path such as `\"team.manager^address.street\"`, and `manager` is being changed, the `paths` will include `[\"address^street\"]`)\n- `observeAll`: *access to additional metadata*\n\n-- where *`ev.data.observeAll`*, for `observeAll()` calls, provides methods:\n\n- *`ev.data.observeAll.path()`*: returns path to object being changed, e.g. `\"root.team\"` \n- *`ev.data.observeAll.parents()`*: returns 'parent objects' to object being changed, e.g. `[team, model]`\n\n**The second handler argument (`eventArgs`) is the _JsViews event object for array or property changes_**\n\nThe properties are specific to the *'change'* type:\n\n- For *setProperty()*: `path`, `value` and `oldValue`. (With `change`=`\"set\"`)\n- For *insert()*: `index` and `items`. (With `change`=`\"insert\"`)\n- For *remove()*: `index` and `numToRemove`. (With `change`=`\"remove\"`)\n- For *move()*: `oldIndex`, `index` and `items`. (With `change`=`\"move\"`)\n- For *refresh()*, multiple events will be triggered:\n  - First, conversion from the current array items to the new refreshed set of items will be broken down into a sequence of *insert()*, *remove()* and *move()* operations, and each will trigger a corresponding event.<br/>The `eventArgs` object for each of these events will have an additional property: `refresh` = `true` (together with the usual `change`=`\"insert\"` / `\"remove\"` / `\"move\"` etc.)\n  - Secondly, after those supplementary events, a `change`=`\"refresh\"` event will be triggered, which will also have an `oldItems` property"
      }
    ]
  },
  "jsvglobals": {
    "title": "Global jQuery extensions",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "*JsViews* adds the following extensions to the jQuery object:\n\n- ***$.render:***\n  - See [`$.render.myTmpl()`](#d.render)\n- ***$.templates:***\n  - See [`$.templates()`](#d.templates)\n- ***$.views:***\n  - See [`$.views`](#jsvviewsobject)\n- ***$.observable:***\n  - See [`$.observable(array)`](#arrchange)\n  - and [`$.observable(object)`](#propchange)\n- ***$.observe:***\n  - See [`$.observe()`](#observe)\n- ***$.unobserve:***\n  - See [`$.unobserve()`](#unobserve)\n- ***$.view:***\n  - See [`$.view()`](#jsv.d.view)\n- ***$.link:***\n  - See [`$.link.myTmpl()`](#jsv.d.link)\n- ***$.unlink:***\n  - See [`$.unlink()`](#jsvunlink)\n\nIt also adds the following 'plugin' extensions to jQuery instances:\n\n- ***$(\"#myTmpl\").render(...):***\n  - See [`$(\"#myTmpl\").render()`](#db.render)\n- ***$(elemOrSelector).view(...):***\n  - See [`$(elemOrSelector).view()`](#jsv.d.view@alt)\n- ***$(elemOrSelector).link(...):***\n  - See [`$(elemOrSelector).link(true, ...)`](#jsv.toplink-true@alt)\n  - or [`$(elemOrSelector).link(expression, ...)`](#jsv.toplink-expr@alt)\n- ***$(elemOrSelector).unlink():***\n  - See [`$(elemOrSelector).unlink()`](#jsvunlink)\n\nSee also [JsRender globals](#globals)\n"
      }
    ]
  },
  "jsvtagcontrols": {
    "title": "JsViews custom tag controls",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "*Custom tag controls* used in *JsViews* apps are regular *JsRender* custom tags, documented in the topics *[Using custom tags](#tags)* (overview) and *[Registering custom tags](#tagsapi)* (API details). \n\nHowever, in the context of JsViews data-linking they become stateful 'controls' (or 'widgets') -- self-contained encapsulated components, with a lifecycle of instantiation, initialization, initial rendering, data-binding, updating (triggered by observable data changes), disposal...\n\nJsViews tag controls support many additional tag options (see *[Tag control options](#tagoptions)*)."
      },
      {
        "_type": "para",
        "title": "Custom tags with or without data-linking",
        "text": "A custom tag can be used simply for rendering, without data-binding, as in\n\n```jsr\n{{mytag ...}}\n```\n\nor it can be used (with JsViews) as a data-linked tag (so it becomes a dynamic data-bound *tag control*), as in:\n\n```jsr\n{^{mytag ...}}\n```\n\nIt can also be used as a [tag binding](#link-tags) on a [data-linked element](#linked-elem-syntax):\n\n```jsr\n<div data-link=\"{mytag ...}\">...</div>\n```\n"
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
            "text": "Simple tag:\n\n```js\n$.views.tags(\"mytag\", {\n  template: \"<b>{{:}}</b>\" // template (wrap the data value in a <b> tag)\n});\n```\n\nUse with or without data-linking:\n\n```jsr\n<input data-link=\"name\" />\nNo data binding: {{mytag name/}}\nData-linked tag: {^{mytag name/}}\nData-linked element with tag binding: <span data-link=\"{mytag name}\"></span>\n```"
          }
        ],
        "jsrJsvJqui": "",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"name\" /><br/>\n\n  No data binding: {{mytag name/}}<br/>\n  Data-linked tag: {^{mytag name/}}<br/>\n  Data-linked element with tag binding: <span data-link=\"{mytag name}\"></span><br/>\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n  data = { name: \"Jo\" };\n\n$.views.tags(\"mytag\", {\n  template: \"<b>{{>}}</b>\" // template (wrap the data value in a <b> tag)\n});\n\nmyTmpl.link(\"#page\", data);",
        "height": "110"
      },
      {
        "_type": "para",
        "title": "Specifying tag options for a custom tag",
        "text": "The following tag declaration registers a custom tag:\n\n```js\n$.views.tags(\"mytag\", tagOptions);\n```\n\nwhere the `tagOptions` object (hash) specifies the tag options, and determines how the tag will function.\n\nAn alternative syntax is useful for declaring multiple tags:\n```js\n$.views.tags({\n  mytag: tagOptions\n  ...\n});\n```\n",
        "anchor": "options"
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">JsViews custom tag documentation topics</span>",
        "text": "JsViews tag controls provide a rich and powerful platform for providing interactive data-driven UI controls. See the following topics for details and samples:\n\n- *[The structure of a JsViews tag control](#tagstructure)*\n- *[The lifecycle of a JsViews tag control](#taglifecycle)*\n- *[Tag control design patterns](#tagpatterns)*\n\nSee also the detailed API topic:\n\n- *[Tag control options](#tagoptions)*",
        "anchor": "topics"
      },
      {
        "_type": "para",
        "title": "See also &ndash; JsRender custom tag documentation topics:",
        "text": "Many of the tag-control features and options are useful for custom tags both with and without JsViews data-linking. See the following topics:\n\nThe JsRender custom tag overview topic *[Using custom tags](#tags)* and the more detailed api topic: *[Registering custom tags](#tagsapi)* api topic explain many important custom tag features and scenarios.\n\nThey include sections covering:\n\n- *[Registering custom tags](#tagsapi@register)* -- the `$.views.tags(...)` api\n- *[Custom tag options](#tagsapi@options)* -- specifying `init()`, `render()`, `template`, `baseTag`\n- *[Tag context](#tagsapi@context)* -- accessing the tag instance, `tagCtx`, tag args and params, parent views etc.\n- *[Custom tag child views](#tagsapi@childviews)* -- and rendering wrapped block content, etc.\n- *[Rendering wrapped block content](#tagsapi@wrapping)*\n- *[Rendering else blocks](#tagsapi@elseblocks)* -- and using the `tagCtxs` array\n- *[Custom tag hierarchy](#tagsapi@parents)* -- and accessing parent tags\n- *[Accessing contextual parameters and helpers](#tagsapi@ctxparams)*\n- *[Tags as private template resources](#tagsapi@privatetags)*\n- *[Unregistering tags](#tagsapi@privatetags)*",
        "anchor": "jsrtopics"
      }
    ]
  },
  "tagoptions": {
    "title": "JsViews custom tag controls: Declaring options",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "*Custom tag controls* used in *JsViews* apps are regular *JsRender* custom tags, documented in the topics *[Using custom tags](#tags)* (overview) and *[Registering custom tags: $.views.tags()](#tagsapi)* (API details). \n\nHowever, in the context of JsViews data-linking they become stateful 'controls' (or 'widgets') -- self-contained encapsulated components, with a lifecycle of instantiation, initialization, initial rendering, data-binding, updating (triggered by observable data changes), disposal...\n\nJsViews tag controls support many additional tag options.\n\nThe *[Custom tag controls](#jsvtagcontrols)* topic provides an overview of JsViews tag controls (with many examples), along with the following subtopics:\n\n- *[The structure of a JsViews tag control](#tagstructure)*\n- *[The lifecycle of a JsViews tag control](#taglifecycle)*\n- *[Tag control design patterns](#tagpatterns)*\n\nFor a complete list of available tag options, see [below](#tagoptions@options)."
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">The <i>$.views.tags(...)</i> API</span> ",
        "text": "The following tag declaration registers a custom tag:\n\n```js\n$.views.tags(\"mytag\", tagOptions);\n```\n\nwhere the `tagOptions` object (hash) specifies the tag options, and determines how the tag will function.\n\nAn alternative syntax is useful for declaring multiple tags:\n```js\n$.views.tags({\n  mytag: tagOptions\n  ...\n});\n```",
        "anchor": "register"
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">Specifying tag control options</span> ",
        "text": "The tag options can include any combination of the following:\n\n**JsViews tag settings**\n\n- The [`baseTag`](#tagoptions@basetag) option\n- The [`flow`](#tagoptions@flow) option\n- The [`dataBoundOnly`](#tagoptions@databoundonly) option\n- The [`template`](#tagoptions@template) option\n- The [`boundProps`](#tagoptions@boundprops) option\n- The [`depends`](#tagoptions@depends) option\n- The [`bindTo`](#tagoptions@bindto) option\n- The [`bindFrom`](#tagoptions@bindfrom) option\n- The [`setSize`](#tagoptions@setsize) option\n- The [`height`](#tagoptions@height) option\n- The [`width`](#tagoptions@width) option\n- The [`className`](#tagoptions@classname) option\n- The [`linkedElement`](#tagoptions@linkedelement) option\n- The [`linkedCtxParam`](#tagoptions@linkedctxparam) option\n- The [`mainElement`](#tagoptions@mainelement) option\n- The [`displayElement`](#tagoptions@displayelement) option\n- The [`onArrayChange`](#tagoptions@onarraychange) option\n- The [`trigger`](#tagoptions@trigger) option\n- The [`attr`](#tagoptions@attr) option\n- The [`ctx`](#tagoptions@ctx) option\n- The [`contentCtx`](#tagoptions@contentctx) option\n- The [`argDefault`](#tagoptions@argdefault) option\n- The [`dataMap`](#tagoptions@datamap) option\n- The [`mapProps` and `mapDepends`](#tagoptions@mapprops) options\n- The [`lateRender`](#tagoptions@laterender) option\n\n**JsViews handlers and methods**\n\n- The [`init()`](#tagoptions@init) method\n- The [`render()`](#tagoptions@render) method\n- The [`onBind()`](#tagoptions@onbind) handler\n- The [`onAfterLink()`](#tagoptions@onafterlink) handler\n- The [`onUpdate()`](#tagoptions@onupdate) handler\n- The [`onDispose()`](#tagoptions@ondispose) handler\n- The [`convert`](#tagoptions@convert) option\n- The [`convertBack`](#tagoptions@convertback) option\n- The [`onUnbind()`](#tagoptions@onunbind) handler\n- The [`onBeforeUpdateVal()`](#tagoptions@onbeforeupdateval) handler\n- The [`onBeforeChange()`](#tagoptions@onbeforechange) handler\n- The [`onAfterChange()`](#tagoptions@onafterchange) handler\n- The [`setValue()`](#tagoptions@setvalue) method\n- The [`domChange()`](#tagoptions@domchange) handler\n\n**tag properties/state**\n\nInitialization of tag-specific 'user' properties (such as those used for instance state)\n\n**tag methods**\n\nTag-specific 'user' methods (such as methods called in response to click events on the tag control)",
        "anchor": "options"
      },
      {
        "_type": "para",
        "title": "<b>Available options:</b>",
        "text": " "
      },
      {
        "_type": "para",
        "title": "The init() method",
        "text": "See [JsViews lifecycle](#taglifecycle).\n\nThe *init()* method acts as a handler for the *init* event of the custom tag, and is called with the tag instance as `this` parameter.\n\n```js\n$.views.tags({\n  mytag: {\n    init: function(tagCtx, linkCtx, ctx) { ... },\n    ...\n  }\n});\n``` \n\nIt can be used for initializing the tag instance, including programmatically setting [other tag options](#renderingpatterns@init-options).\n\nThe *init()* method arguments are:\n- `tagCtx`: the [tagCtx object](#tagctxobject), also available as `this.tagCtx`\n- `linkCtx`: always 0 unless using [data-linked tags](#linked-tag-syntax) with *JsViews* (See [linkCtx object](#linkctxobject).)\n- `ctx`: [View context object](#ctxobject)\n\nSee also [JsRender `init()`](#tagsapi@init).",
        "anchor": "init"
      },
      {
        "_type": "para",
        "title": "The render() method",
        "text": "See [JsViews lifecycle](#taglifecycle).\n\nThe *render()* method acts as a handler for the *render* event of the custom tag, and is called with the tag instance as `this` parameter, and with arguments `arg1, arg2, ...`, corresponding to the unnamed arguments passed in the tag markup, `{{mytag expression1 expression2 ...  }}`.\n\nIf no arguments are passed in the markup, then the `render()` method will be called with the current data context as argument (unless modified by the [argDefault](#tagsapi@argdefault) option.)\n\n```js\nmytag: {\n  render: function(value1, value2) { ... return ...; },\n  ...\n}\n```\n\nThe *render()* method can be used to define how the tag renders, by returning an HTML markup string.\n\nThis approach to rendering can be used instead of (or together with) the [`template`](#tagoptions@template) option.  \n\n*See also:*\n- [JsRender `render()`](#tagsapi@render)\n- [Wrapping block content](#renderingpatterns@wrapping)",
        "anchor": "render"
      },
      {
        "_type": "para",
        "title": "The onBind() handler",
        "text": "See [JsViews lifecycle](#taglifecycle).\n\nThe `onBind()` handler is called during initial data-linking of the tag instance. It is also called during data-linking whenever the tag has been re-rendered. (This will be the case in response to `tag.refresh()` calls, and during observable updates if [`onUpdate()`](#tagoptions@onupdate) does not return `false`.)\n\nIt is called with the tag instance as `this` parameter, and with arguments `tagCtx`, `linkCtx` and `ctx`. In addition, for observable updates it receives the arguments `ev` and `eventArgs` (see [onPropertyChange](#onpropchange@args) and [onArrayChange](#onarrchange@args)).\n\n```js\nmytag: {\n  onBind: function(tagCtx, linkCtx, ctx, ev, eventArgs) { ... },\n  ...\n}\n```",
        "anchor": "onbind"
      },
      {
        "_type": "para",
        "title": "The onAfterLink() handler",
        "text": "See [JsViews lifecycle](#taglifecycle).\n\nThe `onAfterLink()` handler is called following data-linking of the tag instance, both for the initial data-linking and for any subsequent data-linking during observable updates or after `tag.refresh()` calls.\n\nIt is called with the tag instance as `this` parameter, and with arguments `tagCtx`, `linkCtx` and `ctx`. In addition, for observable updates it receives the arguments `ev` and `eventArgs` (see [onPropertyChange](#onpropchange@args) and [onArrayChange](#onarrchange@args)).\n\n```js\nmytag: {\n  onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) { ... },\n  ...\n}\n```",
        "anchor": "onafterlink"
      },
      {
        "_type": "para",
        "title": "The onUpdate() handler",
        "text": "See [JsViews lifecycle](#taglifecycle).\n\nThe `onUpdate()` handler is called whenever the tag instance is updated as a result of an observable data change. This will be the case if the tag control has arguments `{^{mytag arg1 .../}}`, data-bound properties `{^{mytag ^prop1=... .../}}`, or declared [`bound properties`](#tagoptions@boundprops) or [`depends paths`](#tagoptions@depends) for which the data changes observably... \n\nIt is called with the tag instance as `this` parameter, and with arguments `ev` and `eventArgs` corresponding to the observable data change (see [onPropertyChange](#onpropchange@args) and [onArrayChange](#onarrchange@args)) and `newTagCtxs` -- which are the new updated `tagCtx` objects.\n\n```js\nmytag: {\n  onUpdate: function(ev, eventArgs, newTagCtxs) { ... },\n  ...\n}\n```\n\n**_Returning false from `onUpdate()`, or setting `onUpdate` to `false`_**:\n\nOften a custom tag control does not need to completely re-render itself when responding to observable changes in arguments, bound properties or dependencies. In that case, performance can be optimized (see [lifecycle](#taglifecycle@datalink)) by returning `false` from the handler. (The effect will be skip the subsequent `onBind()`, `render()` and `onUnbind()` calls.)\n\nSetting the option to false -- `onUpdate: false` -- is equivalent to using the handler `function() { return false; }`.\n\nSee the [Data-linked tag controls](#bindingpatterns@datalinked) design patterns topic for a usage example.",
        "anchor": "onupdate"
      },
      {
        "_type": "para",
        "title": "The onDispose() handler",
        "text": "See [JsViews lifecycle](#taglifecycle).\n\nThe `onDispose()` handler is called when the tag instance is disposed. This happens whenever the containing HTML/`View` of the tag control is removed. (The call to `onDispose()` is preceded by a call to [`onUnbind()`](#tagoptions@onunbind)).\n\nThe `onDispose()` handler call has no arguments, and has the tag instance as `this` parameter.\n\n```js\nmytag: {\n  onDispose: function() { ... },\n  ...\n}\n```",
        "anchor": "ondispose"
      },
      {
        "_type": "para",
        "title": "The convert option",
        "text": "On any tag, including custom tags, a converter can be specified directly on the tag (see [*Using converters with other tags*](#converters@othertags)):\n\n```jsr\n{{mytag name convert='toUpperCase'/}}\n```\n\nTo provide a default converter on a custom tag (used as fallback if no converter is specified on the tag), set the `convert` tag option to a function, or to a registered converter name:\n\n```js\nmytag: {\n  ...\n  convert: 'toLowerCase', // Default converter. (A function or a registered converter name)\n  ...\n}\n```\n\nSee also:\n- [JsRender `convert`](#tagsapi@convert)\n- The [`bindTo`](#tagoptions@bindto) option\n",
        "anchor": "convert"
      },
      {
        "_type": "para",
        "title": "The convertBack option",
        "text": "On any tag providing two-way data binding, including custom tags, a 'convertBack' converter can be specified directly on the tag (see [*Using converters with other tags*](#converters@othertags)):\n\n```jsr\n{^{mytag name convert=... convertBack=... /}}\n```\n\nTo provide a default 'convertBack' converter on a custom tag (used as fallback if no 'convertBack' is specified on the tag), set the `convertBack` tag option to a function, or to a registered converter name:\n\n```js\nmytag: {\n  ...\n  convertBack: ..., // Default 'convertBack' converter. (A function or a registered converter name)\n  ...\n}\n```\n\n(See also the [`bindTo`](#tagoptions@bindto) option.)",
        "anchor": "convertback"
      },
      {
        "_type": "para",
        "title": "The onUnbind() handler",
        "text": "See [JsViews lifecycle](#taglifecycle).\n\nThe `onUnbind()` handler is called during during disposal of the tag instance. This happens whenever the containing HTML/`View` of the tag control is removed. The call to `onUnbind()` is followed by a call to [`onDispose()`](#tagoptions@ondispose).\n\nThe `onUnbind()` handler is also called during data-linking whenever the tag has been re-rendered. (This will be the case in response to `tag.refresh()` calls, and during observable updates if [`onUpdate()`](#tagoptions@onupdate) does not return `false`.) In these scenarios it is followed by a call to [`onBind()`](#tagoptions@onbind), for the refreshed tag instance.\n\nThe `onUnbind()` call has the tag instance as `this` parameter, and has the arguments `tagCtx`, `linkCtx` and `ctx`. In addition, for observable updates it receives the arguments `ev` and `eventArgs` (see [onPropertyChange](#onpropchange@args) and [onArrayChange](#onarrchange@args)).\n\n```js\nmytag: {\n  onUnbind: function(tagCtx, linkCtx, ctx, ev, eventArgs) { ... },\n  ...\n}\n```",
        "anchor": "onunbind"
      },
      {
        "_type": "para",
        "title": "The onBeforeUpdateVal() handler",
        "text": "See [JsViews lifecycle](#taglifecycle).\n\nThe `onBeforeUpdateVal()` handler is called when the tag triggers an observable change on the data, through two-way binding (`bindTo`).\n\nThe call has the tag instance as `this` parameter, and the arguments `ev` and `eventArgs` (corresponding to the observable data change being triggered). It is cancellable: returning `false` will prevent the observable data change from happening.\n\n```js\nmytag: {\n  onBeforeUpdateVal: function(ev, eventArgs) { \n    // Optionally return false\n  },\n  ...\n}\n```\n\nSee usage examples in the [`{{validate}}`](#samples/tag-controls/validate) sample tag control and in the sample [here](#taglifecycle@instancehandlers).",
        "anchor": "onbeforeupdateval"
      },
      {
        "_type": "para",
        "title": "The onBeforeChange() handler",
        "text": "See [JsViews lifecycle](#taglifecycle).\n\nThe `onBeforeChange()` handler is called when the tag is about to be updated by an observable data change.\n\nThe call has the tag instance as `this` parameter, and the arguments `ev` and `eventArgs` (corresponding to the observable data change). It is cancellable: returning `false` will prevent the tag from being updated.\n\n```js\nmytag: {\n  onBeforeChange: function(ev, eventArgs) { \n    // Optionally return false\n  },\n  ...\n}\n```\n\nSee the sample [here](#taglifecycle@instancehandlers) for a usage example.",
        "anchor": "onbeforechange"
      },
      {
        "_type": "para",
        "title": "The onAfterChange() handler",
        "text": "See [JsViews lifecycle](#taglifecycle).\n\nThe `onAfterChange()` handler is called after tag has been updated by an observable data change.\n\nThe call has the tag instance as `this` parameter, and the arguments `ev` and `eventArgs` (corresponding to the observable data change).\n\n```js\nmytag: {\n  onAfterChange: function(ev, eventArgs) { ... },\n  ...\n}\n```",
        "anchor": "onafterchange"
      },
      {
        "_type": "para",
        "title": "The setValue() method",
        "text": "See [JsViews lifecycle](#taglifecycle).\n\nThe `setValue()` method is called during tag rendering, and during each observable tag update.\n\n- It is called once for each bound argument or property -- as specified by [`bindTo`](#tagoptions@bindto) (or [`bindFrom`](#tagoptions@bindfrom), if provided) -- and receives the value of that argument or property.\n- If neither `bindFrom` nor `bindTo` are specified,  `setValue()` is called once with the value of the first argument (or the current data if the tag has no arguments) -- as if `bindFrom` was set to `[0]`.\n- For block tags with multiple `{{else}}` blocks, it is called also for each bound argument or property on the additional `{{else}}` blocks. The index of the `{{else}}` block is provided as third parameter.\n- If there is a converter, then the values are after conversion. In the case where `bindFrom`/`bindTo` is an array, but the converter returns a single value rather than an array, then `setValue()` is called once only, with that value.\n- If the tag has linked elements specified, then JsViews built-in code for data-linking (or setting the values) on those linked elements runs after the call to the `setValue()` method. If a `setValue()` method is provided, it can be used to  programmatically bind the linked elements (on the initial call) or update their values (on tag update calls) -- and the default code will not run. However if `setValue()` provides a return value then the default code will also run, using the returned value.\n- If the call to `setValue()` is coming from an observable tag update, then the `ev` and `eventArgs` objects for the observable change are passed to the `setValue()` handler as fourth and fifth parameters.\n\n```js\nmytag: {\n  setValue: function(value, index, elseBlock, ev, eventArgs) {\n    ... // Optionally return modified value\n  },\n  ...\n}\n```\n\nSee the [Programmatic two-way data-binding](#bindingpatterns@setvalue-updatevalue) design patterns topic for discussion and examples.",
        "anchor": "setvalue"
      },
      {
        "_type": "para",
        "title": "The domChange() handler",
        "text": "This feature is available for some advanced scenarios. The `{^{for}}` and `{^{if}}` tags each raise a `\"jsv-domchange\"` event whenever they dynamically modify the HTML DOM (for example when a `{^{for somearray}}` tag responds to an array change event, and inserts or removes HTML for added or removed array items). A custom tag could also raise a `\"jsv-domchange\"` event to notify when it makes changes to the DOM.\n\nTo listen to the DOM change events that are notified in this way, a handler for the `\"jsv-domchange\"` event should be attached to the HTML container element that is immediate parent of the `{^{for}}`, `{^{if}}` or custom tag:\n\n",
        "anchor": "domchange"
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
            "text": "```jsr\n<div data-link='{on \"jsv-domchange\" ~domchange name}'>\n  ...\n  {^{for items}}...{{/for}}\n  ...\n</div>\n```\n"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {^{on ~insertItem /}} {^{on ~removeItem /}}\n  <input data-link=\"name\" />\n  <div data-link='{on \"jsv-domchange\" ~domchange name}'>\n    ...\n    {^{for items}} {{:}} {{/for}}\n    ...\n  </div>\n</script>\n\n<div id=\"page\"></div>\n\n<hr/>\nChanges: <div id=\"changes\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n  res = \"\",\n  cnt = 0,\n  data = {\n    name: \"Jo\",\n    items: [\"a\", \"b\"]\n  };\n\nmyTmpl.link(\"#page\", data, {\n  insertItem: function() {\n    $.observable(data.items).insert(\"y\" + cnt);\n  },\n  removeItem: function() {\n    $.observable(data.items).remove();\n  },\n  domchange: function(param1, ev, domchangeEventArgs, tagCtx, linkCtx, observableEventArgs) {\n    res += \"Params: \" + param1 + \", \" + observableEventArgs.change + \"<br/>\";\n    $(\"#changes\").html(res);\n  }\n});",
        "height": "130"
      },
      {
        "_type": "para",
        "title": "The baseTag option",
        "text": "See [JsRender `baseTag`](#tagsapi@basetag).",
        "anchor": "basetag"
      },
      {
        "_type": "para",
        "title": "The flow option",
        "text": "See [JsRender `flow`](#tagsapi@flow).",
        "anchor": "flow"
      },
      {
        "_type": "para",
        "title": "The dataBoundOnly option",
        "text": "If a custom tag control is intended *only* for use with data-linking: `{^{mytag ... /}}`, then the `dataBoundOnly` option can be set to `true`. Attempting to use the tag without data-linking (as in `{{mytag ... /}}`) will then produce an error message.\n\n```js\nmytag: {\n  dataBoundOnly: true,\n  ...\n}\n```",
        "anchor": "databoundonly"
      },
      {
        "_type": "para",
        "title": "The template option",
        "text": "The `template` option is used for declarative rendering of the tag control, as an alternative to providing a [`render()`](#tagoptions@render) method.\n\n```js\nmytag: {\n  template: tagTemplate, // A template string, selector, or compiled template object\n  ...\n}\n```\n\nIf the tag control is called with an argument: `{^{mytag someArgument ...}}` then the template will be rendered using the value of that argument as data context.\n\nOtherwise, the data context will be the same as the outer data context (unless otherwise specified using the  [contentCtx](#tagsapi@contentctx)) option). \n\n*See also:*\n- [JsRender `template`](#tagsapi@template)\n- [Wrapping block content](#renderingpatterns@wrapping)",
        "anchor": "template"
      },
      {
        "_type": "para",
        "title": "The boundProps option",
        "text": "By default, if a data-linked tag has arguments and named properties: `{^{sometag arg1 namedProp1=xxx}}` then the arguments are data-linked, but the named properties are not. (So changes to `arg1` will trigger updates but changes to `xxx` will not.)\n\nThe syntax `{^{sometag arg1 ^namedProp1=xxx}}` is used to opt in to data-linking for a named property. (See [*binding to tag properties*](#linked-tag-syntax@linkedproperties).) \n\nFor a custom tag, the `boundProps` option allows you to specify bound properties:\n\n```js\nmytag: {\n  boundProps: [\"prop1\", ...], // Array of names of bound properties\n  ...\n}\n```\n\nThose named properties will then be data-linked without needing to use the [`^prop1=...` syntax](#linked-elem-syntax@no-initial-render).\n\nSee also the [Data-linked tag controls](#bindingpatterns@datalinked) design patterns topic.",
        "anchor": "boundprops"
      },
      {
        "_type": "para",
        "title": "The depends option",
        "text": "A custom tag control can include a `depends` option:\n\n```js\nmytag: {\n  depends: [\"~reverse\", \"person.first\", ...],\n  ...\n}\n```\n\nas in the following sample:\n",
        "anchor": "depends"
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
            "text": "```js\n$.views.tags(\"mytag\", {\n  render: function(person) {\n    ...\n    return reverse ? person.last + \" \" + person.first : ... ;\n  },\n  depends: [\"~reverse\", \"person.first\", \"person.last\"],\n  ...\n});\n\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"person.first\" /> <input data-link=\"person.last\" />\n  <label>Reverse <input type=\"checkbox\" data-link=\"~reverse\" /></label><br/>\n\n  {^{mytag person class=\"tb1\"/}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    person: {first: \"Jo\", last: \"Blow\"}\n  },\n  helpers = {reverse: true};\n\n$.views.tags(\"mytag\", {\n  render: function(person) {\n    var reverse = this.ctxPrm(\"reverse\");\n    return \"<div>\"\n      + (reverse ? person.last + \" \" + person.first : person.first + \" \" + person.last)\n    + \"</div>\";\n  },\n  depends: [\"~reverse\", \"person.first\", \"person.last\"],\n  mainElement: \"div\"\n});\n  \nmyTmpl.link(\"#page\", data, helpers);\n",
        "header": "<style>\n.tb1 {border: 1px solid #bbb; padding: 8px; margin-top: 10px; font-style: italic; display: inline-block;}\ninput:not([type]) {width: 140px; margin-right: 8px;}\n</style>",
        "action": "append",
        "height": "95"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The `depends` option specifies dependencies for refreshing the tag rendering. If there is an observable data change on one of the specified data paths, then the tag rendering will be refreshed.\n\nSee [*Declaring dependencies for a computed observable*](#computed@depends) for details on specifying `depends` paths, including making `depends` a function, as in the following more advanced examples (that could have been used in the above sample):\n\n```js\ndepends: function(data, callback) {\n  $.observe(this.tagCtx.args[0], \"first\", \"last\", callback);\n  this.ctxPrm(\"reverse\", undefined, callback);\n}\n```\n\n```js\ndepends: function(data, callback) {\n  return [\"~reverse\", this.tagCtx.args[0], \"first\", \"last\"];\n}\n```\n\n```js\ndepends: function(data, callback) {\n  return [\"~reverse\", data.person, \"first\", \"last\"];\n}\n```"
      },
      {
        "_type": "para",
        "title": "The bindTo option",
        "text": "The `bindTo` option is generally used in conjunction with [`linkedElement`](#tagoptions@linkedelement), [`linkedCtxParam`](#tagoptions@linkedctxparam), [`setValue()`](#tagoptions@setvalue) or [`updateValue()`](#jsvtagobject@updatevalue), in order to provide two-way data-binding for a tag control. It specifies one or more tag arguments or properties which will have two-way data-linking.\n\nThe `bindTo` option is set to an array, such as `[0, 1, 2]`, or `[\"title\", 1]` -- where integers refer to arguments and strings to named properties. So setting `bindTo: [\"title\", 1]` means that the `title` property and the second argument can have two-way data-binding. (However, see [`bindFrom`](#tagoptions@bindfrom) below for specifying not only *two-way*, bindings but also *one-way __from__* and *one-way __to__* bindings.)\n\nSetting to a single value (such as \"title\" or 0) is also allowed, and is equivalent to setting an array of length  1 (such as `[\"title\"]` or `[0]`).\n\nIf `bindTo` is not set then two-way binding (through `linkedElement`, `linkedCtxParam` etc.) defaults to binding the first argument (as if `bindTo` was set to `bindTo: 0`). \n\nSetting the `bindTo` option changes how converters work:\n- *convert:*\n  - *arguments:* By default the arguments passed to the `convert` converter will be the values of all the arguments passed in the tag markup. But if `bindTo` is set then the arguments passed to `convert` are instead the values of the set of arguments/properties specified in `bindTo`.\n  - *return values:* By default the value returned by the converter will be passed as first argument to the `render()` method, and be the current data for the `template`. However, if `bindTo` is an array, and the converter returns an array of the same length, then the returned values will be used as converted values for each of the arguments or properties specified in `bindTo` (see also [`cvtArgs()`](#tagobject@cvtargs) and [`bndArgs()`](#tagobject@bndargs)).\n  -  (If both `bindTo` and `bindFrom` are specified, then it will be `bindFrom` which determines converter arguments and the effect of returning an array.)\n  -  (*Note:* In the rare case where the value `ret` to be returned by the converter as first argument is actually an array, then you can set `ret.arg0 = true`. This will ensure that it targets just the first argument, even if the array length happens to be the same as the `bindTo/bindFrom` array. Conversely setting `ret.arg0 = false` will ensure that the values in the array will target multiple target arguments, even if the array length is not the full length of the `bindTo/bindFrom` array).\n- *convertBack:*\n  - *arguments:* If `bindTo` is an array then the `convertBack` signature should have a parameter for each `bindTo` path. When the tag control is updating a `bindTo` target, then `convertBack(val1, val2, val3 ...)` will be called, with  each argument `undefined` except for the argument that is updating.\n  - *return values:* The value returned by `convertBack` will update the target data. However, if `bindTo` is an array, then the first target specified in `bindTo` will be updated, unless `convertBack` returns an array of the same length, in which case the returned values will be used as updated values for each of the target arguments or properties specified in `bindTo`.\n  -  (*Note:* As in the case of *convert*, above, if the the return value `ret` is an array, you can set `ret.arg0` to  `true`/`false`, to ensure your intended behavior).\n\nSee also:\n- [JsRender `bindTo`](#tagsapi@bindto)\n- [`bindFrom`](#tagoptions@bindfrom)",
        "anchor": "bindto"
      },
      {
        "_type": "para",
        "title": "The bindFrom option: Using bindFrom and bindTo to specify one-way bindings in either direction",
        "text": "The `bindFrom` option is used in conjunction with the `bindTo` option, in some advanced scenarios.\n\nUsing `bindTo` alone specifies one or more two-way bindings. (A two-way binding is in fact made up of two separate one-way bindings, one in each direction: a *bind __to__* binding, in which the tag control triggers a change to the data, and a *bind __from__* binding, in which an observable change in the data triggers a change in the tag control.\n\nUsing both `bindTo` and `bindFrom` allows separately specifying the *bind __to__* bindings and the *bind __from__* bindings.\n\n\n```js\nbindTo: [0, \"title\"], \nbindFrom: [\"title\", 1, \"type\"],\n...\n```\n\nWith the above settings the `title` property is a two-way binding, the first argument is one-way *bind to*, and the second argument and `type` property are one-way *bind from*.\n\n(In fact, setting just the `bindTo` option, with no `bindFrom` option, is equivalent to setting both `bindTo` and `bindFrom` to the same target arguments/properties, and makes them all two-way bindings.)\n\nNote that when the `bindTo` and `bindFrom` options specify different paths, then the `linkedElement` option will correspond to the `bindTo` paths, and will specify *'one-way __to__'* bindings, and the `linkedCtxParam` option will correspond to the `bindFrom` paths, and will specify *'one-way __from__'* bindings, \n\nHere is a sample based on the [`linkTo` sample](#link2way@linkto), in which we define a `{^{toFrom current modified}}` custom tag, which behaves similarly to `<input data-link=\"current linkTo=modified\" />`:",
        "anchor": "bindfrom"
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
            "text": "```js\n$.views.tags(\"fromTo\", {\n  ...\n  bindTo: [1],    // bind to second argument (the current.title data)\n  bindFrom: [0],  // bind from first argument (the modified.title data)\n  linkedElement: \"input\", // Input binds to second argument\n  linkedCtxParam: \"fm\",   // input binds from first\n  template: \"<input data-link='~fm'/>\"\n});\n```\n\n```jsr\n{^{fromTo current.title modified.title/}}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n<b>Current settings:</b>\n<span class=\"title\" data-link=\"current.title\"></span><br/>\n\n<form data-link=\"{on 'submit' apply}\">\n  <em>Modify settings:</em><br/><br/>\n  Name:\n  {^{fromTo current.title modified.title/}}\n  <hr />\n  Modified settings:\n  <span class=\"title\" data-link=\"modified.title\"></span><br/>\n  <button type=\"submit\">Apply</button>\n  <button data-link=\"{on cancel}\">Cancel</button><br/>\n</form>\n</script>",
        "code": "$.views.tags(\"fromTo\", {\n  databoundOnly: true,\n  onUpdate: false,\n  bindTo: [1],    // bind to second argument\n  bindFrom: [0],  // bind from first argument\n  linkedElement: \"input\", // input binds to second argument\n  linkedCtxParam: \"fm\",   // input binds from first argument\n  template: \"<input data-link='~fm'/>\"\n});\n\nvar settings = {\n  current: {title: \"My title\"},\n  modified: {title: \"My title\"},\n  apply: function() {\n    $.observable(this.current).setProperty(this.modified);\n    return false;\n  },\n  cancel: function() {\n    $.observable(this.modified).setProperty(this.current);\n    $.observable(this.current).setProperty({title: \"\"});\n  }\n}\n\nvar myTmpl = $.templates(\"#myTmpl\");\n\nmyTmpl.link(\"#result\", settings);",
        "height": "260",
        "action": "append",
        "header": "<script src=\"/download/sample-tag-controls/jsonview/jsonview.js\"></script>\n<link href=\"/download/sample-tag-controls/jsonview/jsonview.css\" rel=\"stylesheet\"/>\n<style>\n.title {display: inline-block; border:1px solid; padding:5px; margin-bottom: 15px}\nform {border: 1px solid gray; display: inline-block; padding: 5px; margin-bottom: 15px;}\ninput, button, select {margin: 5px;} \n</style>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the above sample, the same `<input/>` is used both as linkedElement, to bind *__to__* the `modified.title` data path, and as linkedCtxParam, to bind *__from__* the `current.title` data path.\n\nSee also [this color picker sample](#samples/tag-controls/colorpicker@bindfrom) for advanced use of the `bindFrom` option."
      },
      {
        "_type": "para",
        "title": "The setSize option",
        "text": "If the `setSize` option of a tag control is `true` then `width` and `height` values can be set declaratively:\n\n```jsr\n{{mytag ... width=\"30em\" height=33 .../}}\n```\n\nIn addition, default `width` and `height` can be set as options:\n\n```js\nmytag: {\n  setSize: true, // Enable setting width and height props on tag\n  ...\n  width: \"60px\" // Default width if not specified as prop on tag\n  height: maxHeight // Default height if not specified as prop on tag\n  ...\n}\n```\n\nThe values can be:\n- string literals (such as `width=\"100px\"` or `height=\"30em\"`)\n- numbers (such as `width=100`) - which are treated as pixel widths. (So `100` is equivalent to `\"100px\"`)\n- expressions returning strings or numbers (such as `width=app.gridWidth-50`)\n\nThe width and height settings are applied to the 'main element' of the tag instance. See [`mainElement`](#tagoptions@mainelement) below.\n\nSee also the [Setting size](#renderingpatterns@setsize) design patterns topic. ",
        "anchor": "setsize"
      },
      {
        "_type": "para",
        "title": "The height option",
        "text": "The `height` option is used as default height for the main element of the tag control, provided the `setSize` option is `true`.\n\nSee also the [`setSize`](#tagoptions@setsize), [`width`](#tagoptions@width) and [`mainElement`](#tagoptions@mainelement) options.\n",
        "anchor": "height"
      },
      {
        "_type": "para",
        "title": "The width option",
        "text": "The `width` option is used as default width for the main element of the tag control, provided the `setSize` option is `true`.\n\nSee also the [`setSize`](#tagoptions@setsize), [`height`](#tagoptions@height) and [`mainElement`](#tagoptions@mainelement) options.\n\n",
        "anchor": "width"
      },
      {
        "_type": "para",
        "title": "The className option",
        "text": "The `className` option is used as default class name for the display element of the tag control.\n\nIt can be overridden by setting the class property on the tag:\n\n```jsr\n{{mytag class=.../}}\n```\n\nSee also the [`displayElement`](#tagoptions@displayelement) option.",
        "anchor": "classname"
      },
      {
        "_type": "para",
        "title": "The linkedElement option",
        "text": "Often a tag control incorporates one or more textboxes, checkboxes, or other [form elements](#link-formelems). The  `linkedElement` option together with the [`bindTo`](#tagoptions@bindto) option make it easy to provide two-way data binding between such an element (or elements) and a tag argument or property.\n\nThe following sample shows a `{{namebox}}` tag control with two textboxes (for first and last names) -- data-linked to the first and second tag arguments:",
        "anchor": "linkedelement"
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
            "text": "```jsr\n{^{namebox first last .../}}\n```\n\n```js\nnamebox: {\n  template: '...  <input class=\"first\"/> <input class=\"last\"/> ...',\n  bindTo: [0, 1],\n  linkedElement: [\".first\", \".last\"],\n  ...\n}\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {^{namebox first last  class=\"tb1\"/}}\n\n  <input data-link=\"first\"/> <input data-link=\"last\"/>\n</script>\n\n<div id=\"page\"></div>",
        "header": "<style>\n  .tb1 {border: 1px solid #bbb; padding: 8px; margin: 5px 20px; font-style: italic; display: inline-block;}\n  </style>",
        "code": "$.views.tags({\nnamebox: {\n  dataBoundOnly: true,\n  template: '<label>Full name: <input class=\"first\"/> <input class=\"last\"/></label>',\n  bindTo: [0, 1],\n  linkedElement: [\".first\", \".last\"],\n  displayElement: \"label\",\n  onUpdate: false\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\"\n  };\n\nmyTmpl.link(\"#page\", data);",
        "height": "70",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "The `linkedElement` option is a jQuery selector for declaratively setting `tag.linkedElem`.\n\n*Declare the `linkedElement` option:*\n\n```js\nmytag: {\n  linkedElement: \"input\", // jQuery selector\n  ...\n}\n```\n\nIf [`bindTo`](#tagoptions@bindto) is set to bind multiple arguments or properties (such as `bindTo: [0, 1]` in the sample above) then `linkedElement` must be an array of selectors, of the same length (`[\".first\", \".last\"]` in the sample). (To specify linked elements for some but not all of the `bindTo` bindings, set `undefined` for the other members of the `linkedElement` array.)\n\nThe `tag.linkedElem` (jQuery object) will then contain an HTML element (or elements, if `bindTo` is for multiple bindings) -- which will be automatically data-linked by JsViews to the specified tag argument or property.\n\n(The linked elements can be within the tag content rendered by the tag, as well as within block content wrapped by the tag.)\n\nIf the HTML element is a [form element](#link-formelems) such as `<input>` or `<selector>`, or a `contenteditable` element, then the data-link binding will be two-way.\n\nSelectors are applied to the HTML elements rendered by the tag. (In the case of a tag control using a data-linked element with [tag binding](), such as `<div data-link=\"{mytag ...}\">`, the set of HTML elements includes the data-linked element itself.) \n\nThe first element returned by a selector is added to `tag.linkedElem` (jQuery object). This element will be data-linked to the corresponding argument/property in `bindTo`.\n\nThe `tag.linkedElem` element(s) can also be set programmatically, in [`onBind`](#tagoptions@onbind) for example:\n\n```js\nmytag: {\n  onBind: function() {\n    this.linkedElem = this.contents(true, \"input\"); // Set linkedElem programmatically\n  },\n  ...\n}\n```\n\nIf `bindTo` is not set, then `linkedElement` will behave as if `bindTo` was set to `[0]`, and will provide two-way binding to the first argument.\n\nFor further discussion and examples, see the [linkedElement design pattern topic](#bindingpatterns@linkedelem).\n\nSee also the [`bindTo`](#tagoptions@bindto) and [`linkedCtxParam`](#tagoptions@linkedctxparam) options."
      },
      {
        "_type": "para",
        "title": "The linkedCtxParam option",
        "text": "The `linkedCtxParam` option is used together with the [`bindTo`](#tagoptions@bindto) option (or the `bindFrom` option, if one is specified), to optionally declare a contextual parameter for each bound argument/property specified in `bindFrom`/`bindTo`. The contextual parameters can be accessed within the tag content rendered by the tag, as well as within block content wrapped by the tag.\n\nThe following sample shows a `{{mytag}}` tag control with a data-linked `mode` property. The tag uses `linkedCtxParam` to bind a `~mde` contextual parameter to the `mode` property.\n",
        "anchor": "linkedctxparam"
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
            "text": "```jsr\n{^{mytag mode=tagmode .../}}\n```\n\n```js\nmytag: {\n  ...\n  template: '...<input data-link=\"~mde\"/>...',\n  bindTo: [\"mode\"],\n  linkedCtxParam: [\"mde\"],\n  ...\n```"
          }
        ],
        "nocss": true,
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {^{mytag mode=tagmode class=\"tb1\"/}}<br/>\n  <label>tagmode: <input data-link=\"tagmode\"/></label>\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\nmytag: {\n  dataBoundOnly: true,\n  template: '<div><label>~mde: <input data-link=\"~mde\"/></label> ' +\n    '<button data-link=\"{on ~tag.setNormalMode}\">Set normal</button>' +\n    '<div class=\"msg\"></div></div>',\n  bindTo: [\"mode\"],\n  linkedCtxParam: [\"mde\"],\n  displayElement: \"div\",\n  onUpdate: false,\n  setNormalMode: function() { // Button action\n    this.ctxPrm(\"mde\", \"normal\"); // Modify the mode property\n  },\n  onBind: function() {\n    this.msgBox = this.contents(true, \".msg\");\n    // Attach listener to change in mode property\n    $.observe(this, \"~mde\", this.onModeChange);\n  },\n  onUnbind: function() {\n    $.unobserve(this, \"~mde\", this.onModeChange); // Detach listener\n  },\n  onModeChange: function(ev, eventArgs) { // Listener\n    this.msgBox.append($.views.converters.encode(eventArgs.value )+ \"<br/>\");\n    // (Note that we encode < > and & as HTML entities, for display)\n\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {tagmode: \"start\"};\n\nmyTmpl.link(\"#page\", data);\n",
        "height": "140",
        "header": "<style>\nbody {font-family: sans-serif;}\n.tb1 {border: 1px solid #bbb; padding: 8px; margin: 4px 20px 4px 14px; display: inline-block; float: left;}\n.tb1 .msg {font-style: italic; border: 1px solid #32b732; padding-left: 8px; margin: 8px 0 0; width: 220px; height: 55px; overflow-y:auto;}\n.tb1 input {margin: 6px; width: 80px;} \n</style>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "If [`bindTo`](#tagoptions@bindto) (or [`bindFrom`](#tagoptions@bindfrom)) is set to an array, binding multiple arguments or properties (such as `bindTo: [0, 1, \"mode\"]`), then `linkedCtxParam` must be an array of strings of the same length (such as linkedCtxParam: `[\"first\", \"last\", \"mde\"]` - specifying the names of the corresponding contextual parameters. (To specify linked contextual parameters for some but not all of the `bindTo` bindings, set `undefined` for the other members of the `linkedCtxParam` array.)\n\nIf `bindTo` is not set, then `linkedCtxParam` will behave as if `bindTo` was set to `[0]`, and will provide two-way binding to the first argument.\n\nThe linked contextual parameters can be used declaratively within templates (such as the tag template, or within a tag block). They can also be accessed programmatically, for getting or setting values, or for attaching handlers (to listen to observable changes). The following examples come from the sample above:\n\n```jsr\n<input data-link=\"~mde\"/>...\n<button data-link=\"{on ~tag.setNormalMode}\">...\n```\n\n```js\nsetNormalMode: function() { // Button action\n  this.ctxPrm(\"mde\", \"normal\"); // Modify the mode property\n},\nonBind: function() {\n  // Attach listener to change in mode property\n  $.observe(this, \"~mde\", this.onModeChange);\n},\nonUnbind: function() {\n  $.unobserve(this, \"~mde\", this.onModeChange); // Detach listener\n},\nonModeChange: function(ev, eventArgs) { // Listener\n  this.msgBox.append(eventArgs.value + \"<br/>\");\n}\n```\n\nThe declared linked contextual parameters thus provide an easy way for a tag control to respond to changes in the bound arguments or properties, to observably modify their values, or to register handlers to 'listen' to observable changes.\n\nFor further discussion and examples, see the [linkedCtxParam design pattern topic](#bindingpatterns@linkedctxparam).\n\nSee also the [`bindTo`](#tagoptions@bindto), [`bindFrom`](#tagoptions@bindfrom) and [`linkedElement`](#tagoptions@linkedelement) options.\n\n*Note:* if the `bindFrom` and `bindTo` options are both set, then linkedCtxParam will correspond to the `bindFrom` arguments/properties\n"
      },
      {
        "_type": "para",
        "title": "The mainElement option",
        "text": "The `mainElement` option is a jQuery selector for declaratively setting `tag.mainElem`.\n\nThe `tag.mainElem` (jQuery object) contains the HTML element in the tag control to be used for setting `width` or `height` (if `setSize` is `true`) or `id`. (See [`setSize`](#tagoptions@setsize), [`width`](#tagoptions@width) and [`height`](#tagoptions@height).)\n\n*Declare the `mainElement` option:*\n\n```js\nmytag: {\n  mainElement: \".foo\", // jQuery selector\n  ...\n}\n```\n\nThe selector is applied to the HTML elements rendered by the tag. (In the case of a tag control using a data-linked element with [tag binding](), such as `<div data-link=\"{mytag ...}\">`, the set of HTML elements includes the data-linked element itself.) \n\nThe first element returned by the selector is assigned to `tag.mainElem` (wrapped in a jQuery object). This element will be used for setting `width`, `height` or `id`. If no element is returned, `tag.mainElem` will be an empty jQuery object.\n\nThe `tag.mainElem` can also be set programmatically, in [`onBind`](#tagoptions@onbind) for example:\n\n```js\nmytag: {\n  onBind: function() {\n    this.mainElem = this.contents(true, \".foo\"); // Set mainElem programmatically\n  },\n  ...\n}\n```\n\n*Note:* if `tag.mainElem` has not been set but `tag.linkedElem` is defined, then `tag.linkedElem[0]` is instead used for setting `width`, `height` or `id`\n\n*Usage:*\n\n```jsr\n{^{mytag width=22 id='foo' /}}\n```\n\nSee also the [`setSize`](#tagoptions@setsize), [`width`](#tagoptions@width), [`height`](#tagoptions@height) [`displayElement`](#tagoptions@displayelement) and [`linkedElement`](#tagoptions@linkedelement) options.",
        "anchor": "mainelement"
      },
      {
        "_type": "para",
        "title": "The displayElement option",
        "text": "The `displayElement` option is a jQuery selector for declaratively setting `tag.displayElem`.\n\nThe `tag.displayElem` (jQuery object) contains the HTML element in the tag control to be used for setting `class`, either declaratively:\n\n```jsr\n{{mytag ... class=.../}}\n```\n\nor, as default class, via the [`className`](#tagoptions@classname) option:\n\n```js\nmytag: {\n  className: ...\n  ...\n}\n```\n\nThe selector is applied to the HTML elements rendered by the tag. (In the case of a tag control using a data-linked element with [tag binding](), such as `<div data-link=\"{mytag ...}\">`, the set of HTML elements includes the data-linked element itself.) \n\nThe first element returned by the selector is assigned to `tag.displayElem` (wrapped in a jQuery object). This element will be used for setting `class`. If no element is returned, `tag.displayElem` will be an empty jQuery object.\n\nThe `tag.displayElem` can also be set programmatically, in [`onBind`](#tagoptions@onbind) for example:\n\n```js\nmytag: {\n  onBind: function() {\n    this.displayElem = this.contents(true, \".foo\"); // Set displayElem programmatically\n  },\n  ...\n}\n```\n\n*Note:* if `tag.displayElem` has not been set but `tag.mainElem` or `tag.linkedElem` are defined, then `tag.mainElem` (if defined), or else `tag.linkedElem[0]` is instead used for setting `class`\n\n*Usage:*\n\n```jsr\n{^{mytag class='mytagclass' /}}\n```\n\nSee also the [`className`](#tagoptions@classname), [`mainElement`](#tagoptions@mainelement), and [`linkedElement`](#tagoptions@linkedelement) options.",
        "anchor": "displayelement"
      },
      {
        "_type": "para",
        "title": "<b>Additional advanced or less commonly used options:</b>",
        "text": " "
      },
      {
        "_type": "para",
        "title": "The onArrayChange option",
        "text": "The `onArrayChange` option can be set to `false` in order to prevent a tag from binding to array change events.\n\nNote that by default any tag which depends on an array (or on expressions involving arrays) will bind to array changes. \n\nThis is the case both for custom tags and for built-in tags:\n\n```jsr\n{^{mytag things /}}                    {{!-- Depends on things array --}}\n{^{mytag ~helper(items)+things[0] /}}  {{!-- Depends on items and things arrays --}}\n{^{if items[0]===items[1]}}...{{/if}}  {{!-- Depends on items array --}}\n{^{:~things[0]+things[1]}}             {{!-- Depends on things array --}}\n```\n\nIn each case, the `onArrayChange=false` option can be set in order to prevent the tag from updating in response to array changes. (It will still respond property change events such as replacing the `things` property with another array.)\n\n```jsr\n{^{mytag things onArrayChange=false /}}\n{^{if items[0]===items[1] onArrayChange=false}}...{{/if}}\n{^{:~things[0]+things[1] onArrayChange=false}}\n```\n\nFor custom tags, `onArrayChange: false` can be declared as default behavior for the tag:\n\n```js\n$.views.tags(\"mytag\", {\n  onArrayChange: false,\n  ...\n});\n```\n\nThis default setting can still be overridden by setting it directly on the tag: `{^{mytag ... onArrayChange=true ...}}`.\n\n*__Providing a custom onArrayChange() handler__*\n\nIn some cases a custom tag may require more specific or optimized handling of array change events, rather the than default behavior of refreshing/updating the tag for each change. This can achieved by providing an `onArrayChange()` handler as a tag option, and using the `onBind()` event to register it to observe array changes. To avoid possible memory leaks, it is good practice to also use `onDispose()` or `onUnbind()` to call `unobserve()`, and remove the array change handler registration.\n\nThe following sample illustrates the use of this approach:",
        "anchor": "onarraychange"
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
            "text": "```jsr\n{^{mytag items/}}\n```\n\n```js\n$.views.tags(\"mytag\", {\n  ...\n  onArrayChange: function() { ... },\n  onBind: function() {\n    ...\n    // Register array handler which calls tag.onArrayChange()\n    $.observe(... function(...) { tag.onArrayChange(...); });\n  ...\n  onDispose: function() {\n    ...\n    $.unobserve(...); // Unregister array handler from bound array\n```",
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "paragraph"
              }
            ]
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n<div class=\"left\">\n  {^{on ~replaceItems /}} {^{on ~refreshItems /}}\n  {^{on ~insertItem /}} {^{on ~moveItem /}}<br/>\n\n  <label>Hide: <input type=\"checkbox\" data-link=\"hideTag\"/></label>\n\n  {^{if !hideTag}}\n    {^{mytag items/}}\n  {{/if}}\n</div>\n\n<div class=\"right\">\n  <em><b>Items:</b></em><br/>{^{jsonview items/}}\n</div>\n</script>\n\n<div id=\"page\"></div>\n<em>Array change:</em> <span id=\"console\">-</span>\n",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n  cnt = 0,\n  data = {\n    items: [\"a\", \"b\"],\n    hideTag: false\n  };\n\n$.views.tags(\"mytag\", {\n  template: \"<br/>First: {{:#data[0]}}<br/>Last: {{:#data[length-1]}}\",\n  onArrayChange: function(ev, eventArgs) {\n    if (!eventArgs.refresh) { // (Skip the initial 'move' events on an array refresh)\n      $(\"#console\").text(eventArgs.change); // console.log() or similar\n      this.refresh(); // For each array change event, refresh the tag to render updated array\n    }\n  },\n  onBind: function(tagCtx) {\n    var tag = this,\n      data = tagCtx.args[0];\n    if (tag._boundArray !== data) { // Different data\n      if (tag._boundArray) { // Previous data had handler, so remove it\n        $.unobserve(tag._boundArray, tag._arCh);\n      }\n\n      if ($.isArray(data)) {  // New data is an array\n        // Store array data as tag._boundArray\n        tag._boundArray = data;\n\n        // Store arrayChange handler as tag._arCh\n        tag._arCh = function(ev, eventArgs) {\n          // arrayChange handler calls tag.onArrayChange()\n          tag.onArrayChange(ev, eventArgs);\n        };\n        // Attach array handler to new data\n        $.observe(data, tag._arCh);\n      }\n    }\n  },\n  onDispose: function() {\n    var tag = this;\n    if (tag._boundArray) {\n      // Unregister array handler from bound array\n      $.unobserve(tag._boundArray, tag._arCh);\n    }\n  }\n});\n  \nmyTmpl.link(\"#page\", data, {\n  replaceItems: function() {\n    $(\"#console\").text(\"-\");\n    $.observable(data).setProperty(\"items\", [\"A\"+cnt++, \"B\"+cnt, \"C\"+cnt, \"D\"+cnt]);\n  },\n  refreshItems: function() {\n    $.observable(data.items).refresh([\"a\"+cnt++, \"b\"+cnt, \"x\"+cnt]);\n  },\n  insertItem: function() {\n    $.observable(data.items).insert(\"y\"+cnt++);\n  },\n  moveItem: function() {\n    $.observable(data.items).move(0, data.items.length-1);\n  }\n});",
        "height": "160",
        "header": "<script src=\"/download/sample-tag-controls/jsonview/jsonview.min.js\"></script>\n<link href=\"/download/sample-tag-controls/jsonview/jsonview.css\" rel=\"stylesheet\"/>\n<link href=\"/samples/tag-controls/jsonview/sample.css\" rel=\"stylesheet\">",
        "action": "append"
      },
      {
        "_type": "para",
        "title": "The trigger option",
        "text": "The `trigger` option can be used to set a default trigger behavior for two-way [linked element`](#tagoptions@linkedelement) bindings within the tag.\n\n```js\nmytag: {\n  trigger: false, // Linked element text boxes within {{mytag}} will trigger on blur, not on keydown\n  ...\n}\n```\n\nAn individual `{{mytag}}` instance can override the `trigger` option setting by writing `{^{mytag trigger=... .../}}`.\n\nSee the [trigger setting](#jsvsettings/trigger) and [two-way binding](#link2way@trigger) topics.\n\n",
        "anchor": "trigger"
      },
      {
        "_type": "para",
        "title": "The attr option",
        "text": "When data-linking using a [*Tag binding*](#link-tags) with the [full linked element syntax](#linked-elem-syntax@fullsyntax), you can specify a target attribute such as the `title` attribute:\n\n```jsr\n<div data-link=\"title{mytag ...}\">...\n```\n\nIn the example above `mytag` will render to the `title` attribute of the `div` element. \n\nIf no target attribute is specified:\n\n```jsr\n<div data-link=\"{mytag ...}\">...\n```\n\nthen `mytag` will render to the default target attribute.\n\n\nThe `attr` option can be used to specify a default target attribute for `mytag`:\n\n```js\nmytag: {\n  attr: \"text\", // Default target attribute\n  ...\n}\n```\n\nIf `mytag` has no `attr` option specified, then the default target attribute will instead be the [default target](#link-tags@defaulttargets) for that element, such as `\"html\"` for a `div` or `\"value\"` for an `input`.\n\nPossible values for the `attr` option include any of the targets such as `\"text\"`, `\"html\"`, `\"class\"`, `\"visible\"` etc (see [*Targets for data-linking*](#link-targets)). Alternatively the `attr` option can be set to `attr: \"none\"` in the case of tag bindings which do not render output at all, but add other behavior in other ways (such as [`data-link=\"{on ...}\"`](#link-events@datalink-on) which adds event bindings). ",
        "anchor": "attr"
      },
      {
        "_type": "para",
        "title": "The ctx option",
        "text": "See [JsRender `ctx`](#tagsapi@ctx).",
        "anchor": "ctx"
      },
      {
        "_type": "para",
        "title": "The contentCtx option",
        "text": "See [JsRender `contentCtx`](#tagsapi@contentctx).",
        "anchor": "contentctx"
      },
      {
        "_type": "para",
        "title": "The argDefault option",
        "text": "See [JsRender `argDefault`](#tagsapi@argdefault).",
        "anchor": "argdefault"
      },
      {
        "_type": "para",
        "title": "The dataMap option",
        "text": " This option is used in some advanced scenarios, and internally for implementation of the `{{props}}` and `{{for}}` tags. ",
        "anchor": "datamap"
      },
      {
        "_type": "para",
        "title": "The mapProps and mapDepends options",
        "text": "These options are used in some advanced scenarios in association with the [`dataMap`](#tagoptions@datamap) option, for example when using [sorting or filtering](#fortag@sortfilterrange).\n\n- The `mapProps` option is similar to the [`boundProps`](#tagoptions@boundprops) option, and specifies tag arguments or named properties for which an observable change should trigger refreshing of the `dataMap` (for refreshing the sorting or filtering, for example). See the [`{{purchases}}` sample](#samples/sort-filter@jsv-tag) for a usage example.\n- The `mapDepends` option is similar to the [`depends`](#tagoptions@depends) option, and indicates dependency paths for which observable changes should trigger a refresh of the `dataMap`.",
        "anchor": "mapprops"
      },
      {
        "_type": "para",
        "title": "The lateRender option",
        "text": " This option is available for some advanced scenarios. See unit tests for some examples of use.",
        "anchor": "laterender"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsvtagcontrols",
            "label": "JsViews tag controls"
          },
          {
            "_type": "topic",
            "hash": "tagstructure",
            "label": "Structure of a custom tag control"
          },
          {
            "_type": "topic",
            "hash": "taglifecycle",
            "label": "The lifecycle of a JsViews tag control"
          },
          {
            "_type": "topic",
            "hash": "tagpatterns",
            "label": "Tag control design patterns"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls",
            "label": "Samples: JsViews tag controls"
          },
          {
            "_type": "topic",
            "hash": "tags",
            "label": "Using custom tags (JsRender)"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/tags",
            "label": "Samples: JsRender custom tags"
          }
        ]
      }
    ]
  },
  "tagstructure": {
    "title": "The structure of a JsViews custom tag control",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The [`options`](#tagoptions) object used to register a tag control is in effect a prototype for constructing the instances of the tag control.\n\nThe specified options will fall into the following categories:\n\n- JsViews tag settings\n- JsViews handlers and methods\n- tag properties/state\n- tag methods\n\nA tag declaration might typically be structured in sections corresponding to the above categories, as in this example:\n\n```js\n$.views.tags(\"tabs\", {\n  // JsViews tag settings\n  ...\n  displayElement: \".tabsview\",\n  bindTo: \"pane\",\n  width: 250,\n  template: '...',\n\n  // JsViews handlers and methods\n  init: function(tagCtx) { ... },\n  onUpdate: function(ev, event, newTagCtxs) { ... },\n\n  // tag properties/state\n  pane: 0, // selected pane (defaults to 0)\n\n  // tag methods\n  getPane: function(tagCtxs) { ... },\n  setTab: function(index) { ... }\n});\n```\n\n(from the [`{{tabs}}` sample](#bindingpatterns@tabs2way))\n\nThe sections are: \n\n**JsViews tag settings**\n\nAny of the following:\n- [`baseTag`](#tagoptions@basetag)\n- [`flow`](#tagoptions@flow)\n- [`dataBoundOnly`](#tagoptions@databoundonly)\n- [`template`](#tagoptions@template)\n- [`boundProps`](#tagoptions@boundprops)\n- [`depends`](#tagoptions@depends)\n- [`bindTo`](#tagoptions@bindto)\n- [`bindFrom`](#tagoptions@bindto)\n- [`setSize`](#tagoptions@setsize)\n- [`height`](#tagoptions@height)\n- [`width`](#tagoptions@width)\n- [`className`](#tagoptions@classname)\n- [`linkedElement`](#tagoptions@linkedelement)\n- [`linkedCtxParam`](#tagoptions@linkedctxparam)\n- [`mainElement`](#tagoptions@mainelement)\n- [`displayElement`](#tagoptions@displayelement)\n- [`trigger`](#tagoptions@trigger)\n- [`attr`](#tagoptions@attr)\n- [`ctx`](#tagoptions@ctx)\n- [`contentCtx`](#tagoptions@contentctx)\n- [`argDefault`](#tagoptions@argdefault)\n- [`dataMap`](#tagoptions@datamap)\n- [`lateRender`](#tagoptions@laterender)\n\n**JsViews handlers and methods**\n\nAny of the following:\n\n- [`init()`](#tagoptions@init)\n- [`render()`](#tagoptions@render)\n- [`onBind()`](#tagoptions@onbind)\n- [`onAfterLink()`](#tagoptions@onafterlink)\n- [`onUpdate()`](#tagoptions@onupdate)\n- [`onDispose()`](#tagoptions@ondispose)\n- [`convert`](#tagoptions@convert)\n- [`convertBack`](#tagoptions@convertback)\n- [`onUnbind()`](#tagoptions@onunbind)\n- [`onBeforeUpdateVal()`](#tagoptions@onbeforeupdateval)\n- [`onBeforeChange()`](#tagoptions@onbeforechange)\n- [`onAfterChange()`](#tagoptions@onafterchange)\n- [`onArrayChange()`](#tagoptions@onarraychange)\n- [`setValue()`](#tagoptions@setvalue)\n- [`domChange()`](#tagoptions@domchange)\n\n**tag properties/state**\n\nInitialization of tag-specific 'user' properties (such as those used for instance state)\n\n**tag methods**\n\nTag-specific 'user' methods (such as methods called in response to click events on the tag control)",
        "anchor": "structure"
      }
    ]
  },
  "taglifecycle": {
    "title": "The lifecycle of a JsViews custom tag control",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The [tag options](#tagoptions) can include event handlers for the following lifecycle events:\n\n- [`init()`](#tagoptions@init)\n- [`render()`](#tagoptions@render)\n- [`onBind()`](#tagoptions@onbind)\n- [`onUnbind()`](#tagoptions@onunbind)\n- [`onAfterLink()`](#tagoptions@onafterlink)\n- [`onUpdate()`](#tagoptions@onupdate)\n- [`onDispose()`](#tagoptions@ondispose)\n- [`onBeforeUpdateVal()`](#tagoptions@onbeforeupdateval)\n- [`onBeforeChange()`](#tagoptions@onbeforechange)\n- [`onAfterChange()`](#tagoptions@onafterchange)\n- [`setValue()`](#tagoptions@setvalue)"
      },
      {
        "_type": "para",
        "title": "Custom tag control lifecycle without data-linking: init() and render() events only",
        "text": "When a custom tag is rendered without data-linking:\n\n```jsr\n{{mytag .../}}\n```\n\nthen it will be instantiated during rendering, and immediately disposed, and only the `init()` and `render()` lifecycle events will be triggered:\n\n- [`init()`](#tagoptions@init) -- initialization\n- [`render()`](#tagoptions@render) -- rendering\n\n\n"
      },
      {
        "_type": "para",
        "title": "Custom tag control lifecycle with data-linking (tag control)",
        "text": "When a custom tag is rendered with data-linking:\n\n```jsr\n{^{mytag .../}}\n```\n\nthen it will behave as a *tag control*. It will be instantiated during rendering, and the instance will remain as long as the parent HTML element (and JsViews `View`) are not removed or disposed. \n\n*The different lifecycle scenarios are as follows:*\n\n**_Initialization_**:\n\nDuring the initial rendering and data-linking, lifecycle events will be triggered in the following sequence:\n\n- [`init()`](#tagoptions@init) -- initialization\n- [`render()`](#tagoptions@render) -- rendering\n- [`onBind()`](#tagoptions@onbind) -- during initial data-linking\n- [`onAfterLink()`](#tagoptions@onafterlink) -- after initial data-linking\n- [`setValue()`](#tagoptions@setvalue) -- called once for each bound argument or property (and for each `{{else}}` block)\n\n**_Data-linking update (observable change)_**:\n\nIf the tag control has arguments `{^{mytag arg1 .../}}` then whenever any of the arguments changes observably, data-linking and rendering will be refreshed, with the following sequence of events:\n\n- [`onBeforeChange()`](#tagoptions@onbeforechange) -- cancellable event, before change\n- [`onUpdate()`](#tagoptions@onupdate) -- update data-linking\n- [`onUnbind()`](#tagoptions@onunbind) -- remove data-link bindings\n- [`render()`](#tagoptions@render) -- refresh rendering\n- [`onBind()`](#tagoptions@onbind) -- establish new data-link bindings\n- [`onAfterLink()`](#tagoptions@onafterlink) -- after updating data-linking\n- [`setValue()`](#tagoptions@setvalue) -- called once for each bound argument or property (and for each `{{else}}` block)\n- [`onAfterChange()`](#tagoptions@onafterchange) -- after completing change\n\n-- and similarly if the tag has data-bound properties `{^{mytag ^prop1=... .../}}`, or declared [`boundProps`](#tagoptions@boundprops) or [`depends`](#tagoptions@depends) paths for which the data changes observably... \n\n**_Data-linking update with onUpdate set to false_**:\n\nOften a custom tag control does not need to completely re-render itself when responding to observable changes in arguments, bound properties or dependencies. In that case, performance can be optimized by setting `onUpdate: false` (or setting to a handler which returns `false`). The *observable change* lifecycle is then reduced to:\n\n- [`onBeforeChange()`](#tagoptions@onbeforechange) -- cancellable event, before change\n- [`onUpdate()`](#tagoptions@onupdate) -- update data-linking (set to `false` or returns `false`)\n- [`onAfterLink()`](#tagoptions@onafterlink) -- after updating data-linking\n- [`setValue()`](#tagoptions@setvalue) -- called once for each bound argument or property (and for each `{{else}}` block)\n- [`onAfterChange()`](#tagoptions@onafterchange) -- after completing change\n\n-- Note that it is still possible to force a complete re-rendering, by calling `tag.refresh()`.\n\n**_Two-way bound tag control triggering an observable update to data_**:\n\nA tag control may be bound to data through a two-way binding. In that case it can be updated when the data-linked data changes observably (two previous scenarios), but there is also the reverse scenario where the tag triggers an observable change on the data. This leads to the following sequence of lifecycle events:\n\n- [`onBeforeUpdateVal()`](#tagoptions@onbeforeupdateval) -- cancellable event, before triggering change\n- [`onBeforeChange()`](#tagoptions@onbeforechange) -- cancellable event, before change\n- [`onUpdate()`](#tagoptions@onupdate) -- update data-linking\n- [`onAfterLink()`](#tagoptions@onafterlink) -- after updating data-linking\n- [`onAfterChange()`](#tagoptions@onafterchange) -- after completing change\n- [`setValue()`](#tagoptions@setvalue) -- called once only -- for the bound argument or property which is being triggered\n\n**_Disposal_**:\n\nIf the containing HTML/`View` is removed, then the tag control instance will be disposed, with the following sequence of events:\n\n- [`onUnbind()`](#tagoptions@onunbind) -- remove data-link bindings\n- [`onDispose()`](#tagoptions@ondispose) -- dispose of instance\n\n**_Refresh_**:\n\nIf the tag control instance is refreshed (by calling the `tag.refresh()` method, for example) then the instance will be replaced by a newly rendered and data-linked instance -- with the following sequence of events:\n\n- [`onUnbind()`](#tagoptions@onunbind) -- remove data-link bindings\n- [`render()`](#tagoptions@render) -- refresh rendering\n- [`onBind()`](#tagoptions@onbind) -- establish new data-link bindings\n- [`onAfterLink()`](#tagoptions@onafterlink) -- after data-linking refreshed instance\n- [`setValue()`](#tagoptions@setvalue) -- called once for each bound argument or property (and for each `{{else}}` block)\n",
        "anchor": "datalink"
      },
      {
        "_type": "para",
        "title": "Declaring event handlers directly on the tag instance",
        "text": "The following event handlers can be specified as tag options, for custom tags, but can also be declared directly on a tag instance:\n- [`onBind()`](#tagoptions@onbind)\n- [`onUnbind()`](#tagoptions@onunbind)\n- [`onAfterLink()`](#tagoptions@onafterlink)\n- [`onUpdate()`](#tagoptions@onupdate)\n- [`onDispose()`](#tagoptions@ondispose)\n- [`onBeforeUpdateVal()`](#tagoptions@onbeforeupdateval)\n- [`onBeforeChange()`](#tagoptions@onbeforechange)\n- [`onAfterChange()`](#tagoptions@onafterchange)\n\nFor example:\n\n```jsr\n{^{mytag ... onDispose=~cleanupMyTag/}}\n```\n\nThis style of inline event handler declaration works for regular built-in tags too. Here is an example declaring an `onBeforeUpdateVal()` handler on an `<input data-link=\"...\" />`, and an `onBeforeChange()` handler on a `{^{: ...}}` tag:",
        "anchor": "instancehandlers"
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
            "text": "```jsr\n<input data-link=\"telephone onBeforeUpdateVal=~validateTel\"/>\n\n... {^{:telephone onBeforeChange=~confirmChange}}\n```\n\n```js\nhelpers = {\n  validateTel: function(ev, eventArgs) {\n    return eventArgs.value.length < 13;\n  },\n  confirmChange: function(ev, eventArgs) {\n    return confirm(\"Accept the value: '\" + eventArgs.value + \"'?\");\n  }\n};\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"telephone onBeforeUpdateVal=~validateTel\"/>\n\n  Telephone: {^{:telephone onBeforeChange=~confirmChange}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = { telephone: \"693 726 3388\" },\n\n  helpers = {\n    validateTel: function(ev, eventArgs) {\n      return eventArgs.value.length < 13;\n    },\n    confirmChange: function(ev, eventArgs) {\n      return confirm(\"Accept the value: '\" + eventArgs.value + \"'?\");\n    }\n  };\n\nmyTmpl.link(\"#page\", data, helpers);",
        "height": "50"
      }
    ]
  },
  "tagpatterns": {
    "title": "JsViews custom tag controls: Design patterns",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following subtopics and sections show some common design patterns used for different categories of JsViews custom tag controls:\n\n*[Layout and rendering design patterns](#renderingpatterns)*\n- [Rendered template](#renderingpatterns@template)\n- [Programmatic rendering (render method)](#renderingpatterns@programmatic)\n- [Setting options in the init method](#renderingpatterns@init-options)\n- [Specifying event handlers](#renderingpatterns@handlers)\n- [Setting size](#renderingpatterns@setsize)\n- [Setting class](#renderingpatterns@setclass)\n- [Wrapping content](#renderingpatterns@wrapping)\n- [Setting the data context of wrapped content](#renderingpatterns@contentctx)\n\n*[Data binding design patterns](#bindingpatterns)*\n- [Data-linked tags: responding to updated args or props](#bindingpatterns@datalinked)\n- [Responding to user actions](#bindingpatterns@user-actions)\n- [Two-way binding to args or props (bindTo). Persistence of state](#bindingpatterns@bindto)\n- [Linked element](#bindingpatterns@linkedelem)\n- [Linked contextual parameters](#bindingpatterns@linkedctxparam)\n- [setValue and updateValue](#bindingpatterns@setvalue-updatevalue)\n- [Multiple two-way binding to args or props](#bindingpatterns@multiple-twoway)\n\n*[Tag hierarchy design patterns](#hierarchypatterns)*\n- [Composite controls](#hierarchypatterns@composite)\n- [Converters](#hierarchypatterns@converters)"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the *[JsViews tag controls](#jsvtagcontrols)* overview topic, and the *[Tag control options](#tagoptions)* API details topic.\n"
      }
    ]
  },
  "renderingpatterns": {
    "title": "JsViews tag controls: Layout and rendering design patterns",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This topic shows common tag control design patterns concerning the visual rendering and UI layout of tag controls:\n\n- [Rendered template](#renderingpatterns@template)\n- [Programmatic rendering (render method)](#renderingpatterns@programmatic)\n- [Setting options in the init method](#renderingpatterns@init-options)\n- [Specifying event handlers](#renderingpatterns@handlers)\n- [Setting size](#renderingpatterns@setsize)\n- [Setting class](#renderingpatterns@setclass)\n- [Wrapping content](#renderingpatterns@wrapping)\n- [Setting the data context of wrapped content](#renderingpatterns@contentctx)\n\nFor other categories of tag control design pattern, see *[Data binding design patterns](#bindingpatterns)* and *[Tag hierarchy design patterns](#hierarchypatterns)*.\n"
      },
      {
        "_type": "para",
        "title": "Rendered template",
        "text": "As shown in the JsRender *[Using custom tags](#tags)* topic, a simple tag control can be obtained just by assigning a template to the [`template`](#tagoptions@template) option:\n\n```js\n$.views.tags(\"mytag\", {\n  template: tagTemplate; // Provide just a template (string, selector, or compiled template object)\n});\n```\n\nSee [this example](#tags@template-sample) and [this example](#tags@tmplcontext-sample).\n",
        "anchor": "template"
      },
      {
        "_type": "para",
        "title": "Programmatic rendering (render method)",
        "text": "Similarly, a tag control can be defined just by assigning a function to the [`render`](#tagoptions@render) option:\n\n```js\n$.views.tags(\"mytag\", {\n  render: tagRenderFn); // Provide just a render method\n});\n```\n\nThis is also shown in the JsRender *[Using custom tags](#tags)* topic. See [this example](#tags@render-sample) and [this example](#tags@context-sample).",
        "anchor": "programmatic"
      },
      {
        "_type": "para",
        "title": "Setting options (such as the template option) in the init() method",
        "text": "Most of the [tag options](tagoptions) that can be specified 'statically' in a tag declaration can alternatively be set programmatically in the `init()` method, and made to depend 'dynamically' on state, or data, or other settings such as tag properties. \n\nThe following options can all be set in this way in the [`init()`](#tagoptions@init) method:\n\n- [`template`](#tagoptions@template)\n- [`boundProps`](#tagoptions@boundprops)\n- [`depends`](#tagoptions@depends)\n- [`bindTo`](#tagoptions@bindto)\n- [`bindFrom`](#tagoptions@bindfrom)\n- [`attr`](#tagoptions@attr)\n- [`setSize`](#tagoptions@setsize)\n- [`height`](#tagoptions@height)\n- [`width`](#tagoptions@width)\n- [`className`](#tagoptions@classname)\n- [`linkedElement`](#tagoptions@linkedelement)\n- [`linkedCtxParam`](#tagoptions@linkedctxparam)\n- [`mainElement`](#tagoptions@mainelement)\n- [`displayElement`](#tagoptions@displayelement)\n- [`contentCtx`](#tagoptions@contentctx)\n- [`argDefault`](#tagoptions@argdefault)\n\nFor example, in [this sample](#tagsapi@initsample) the `template` option is set within the `init()` method to a different template depending on the value of the `mode` property.",
        "anchor": "init-options"
      },
      {
        "_type": "para",
        "title": "Specifying event handlers",
        "text": "The appearance, behavior, data-binding and interactivity of a tag control can be determined by both declarative and programmatic approaches.\n\n- The declarative approach uses options such as [`template`](#tagoptions@template), [`boundProps`](#tagoptions@boundprops), [`bindTo`](#tagoptions@bindto), [`width`](#tagoptions@width), [`className`](#tagoptions@classname), [`linkedCtxParam`](#tagoptions@linkedctxparam) and [`displayElement`](#tagoptions@displayelement).\n- The programmatic approach is primarily by placing code in event handlers, declared for different events in the tag control [lifecycle](#taglifecycle).\n\nThe most common usage patterns for event handlers include:\n\n- [`init()`](#tagoptions@init) -- Called during initialization\n  - Used for initialization and Programmatic [setting of options](renderingpatterns@ini-options)\n- [`render()`](#tagoptions@render) -- Called during rendering\n  - Used for returning rendered HTML, or for controlling rendering behavior\n- [`onBind()`](#tagoptions@onbind) -- Called during initial data-linking\n  - Used for accessing tag control UI, adding data-binding, attaching event handlers\n- [`onAfterLink()`](#tagoptions@onafterlink) -- Called after data-linking, both initially, and on every observable update\n  - Used for accessing tag control UI (when needed on every update)\n- [`onUpdate()`](#tagoptions@onupdate) -- Called on every observable update\n  - Used for coding on every update. Code can depend on the specific change (`newTagCtxs`)\n  - Return `false` to skip re-rendering\n- [`onDispose()`](#tagoptions@ondispose) -- Called when tag instance is disposed\n  - Used for instance clean up or disposal\n",
        "anchor": "handlers"
      },
      {
        "_type": "para",
        "title": "Setting size",
        "text": "The height and width of a tag control can be specified in different ways:\n\n- Through CSS -- for example by setting the [`displayElement`](#tagoptions@displayelement) option, then either setting the [`className`](#tagoptions@classname) option, or specifying the `class` property on the tag markup: `{{mytag ... class=.../}}`\n- By setting the [`setSize`](#tagoptions@setsize) and [`mainElement`](#tagoptions@mainelement) options -- then either setting the  [`width`](#tagoptions@width)/[`height`](#tagoptions@height) options, or specifying the `width`/`height` properties on the tag markup: `{{mytag ... width=... height=.../}}`.<br/>See for example this [tabs sample](#bindingpatterns@tabs).\n- Programmatically -- by setting the width or height of the chosen HTML element. For example, in `onBind()`:<br/>\n`onBind: function() { this.contents(true, \"someSelector\").width(300); }`",
        "anchor": "setsize"
      },
      {
        "_type": "para",
        "title": "Setting class",
        "text": "A tag control can render elements with associated class names, which can then allow styling of the tag control instances, through CSS.\n\n```js\nmytag: {\n  template: '...<div class=\"mytagOuter\">...'\n```\n\nIn addition, if a display element is defined then a class can be associated with that element, either through the [`className`](#tagoptions@classname) option, or declaratively on the tag: `{{mytag ... class=...}}`.\n\nSee [`displayElement`](#tagoptions@displayelement).",
        "anchor": "setclass"
      },
      {
        "_type": "para",
        "title": "Wrapping content",
        "text": "Any tag can wrap block content, as in:\n\n```jsr\n{{mytag}}some block content{{/mytag}}\n```\n\nor be used with `{{else}}` tags to wrap multiple blocks -- as in \n\n```jsr\n{{mytag}}block1{{else}}block2{{else}}block3{{/mytag}}\n```\n\nIf the tag has no `template` option and no `render()` method then all the blocks will be rendered as is. Nevertheless the tag may indirectly affect rendering or behavior as a result of other tag options -- such as a setting for [`mainElement`](#tagoptions@mainelement), [`width`](#tagoptions@width), [`className`](#tagoptions@classname)\nor [`contentCtx`](#tagoptions@contentctx).\n\nEven if no tag options are specified, the tag may still impact the rendering of each block, since it will have the default `contentCtx` behavior, and move the data context in the block to whatever data was passed in as argument:",
        "anchor": "wrapping"
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
            "text": "```jsr\n{{mytag person}}\n  Name: {{:name}}<br/> {{!--data context here is 'person'--}}\n{{else address}}\n  Address: {{:street}} {{!--data context here is 'address'--}}\n{{/mytag}}\n```\n\n```js\n$.views.tags(\"mytag\", {});\nvar data = {person: {name: \"Jo\"}, address: {street: \"Main Street\"}; ...\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{{mytag person}}\n  Name: {{:name}}<br/> {{!--data context here is 'person'--}}\n{{else address}}\n  Address: {{:street}} {{!--data context here is 'address'--}}\n{{/mytag}}\n</script>\n\n<div id=\"page\"></div>\n",
        "code": "$.views.tags(\"mytag\", {});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    person: {name: \"Jo\"},\n    address: {street: \"Main Street\"}\n  },\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "54",
        "nocss": false
      },
      {
        "_type": "para",
        "title": "",
        "text": "If the tag has a `render()` method or a `template` then block content needs to be specifically included in the rendered output.\n\nIn a [`render()`](#tagoptions@render) method (if there is no `template`) block content is rendered using:\n\n```js\n... this.tagCtx.render() ...\n```\n\nIn a [`template`](#tagoptions@template) either of the following forms will render the block content:\n\n```jsr\n{{include tmpl=#content/}}\n{{include tmpl=~tagCtx.content/}}\n```\n\nand similarly, a data-linked element can use an `{include}` [tag binding](#link-tags) to wrap content, as in:\n\n```jsr\n<div data-link=\"{include tmpl=#content/}\"></div>\n```\n\n(See also the related documentation topics: *[Accessing and rendering wrapped block content](#tags@wrapping)*, *[Rendering wrapped block content](#tagsapi@wrapping)* and *[Rendering else blocks](#tagsapi@elseblocks)*)\n\nThe following sample shows two versions of a `{{chooseblock}}` custom tag -- one using a `render()` method and the other a `template`. The tag can wrap multiple blocks:\n\n```jsr\n{{chooseblock pane=2}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/chooseblock}}\n```\n\nThe tag renders just one block -- specified by its `pane` property -- which defaults to `0` and can be set using (for example) `{{chooseblock pane=1}}`, or driven by a data value such as `mode`, in `{{chooseblock pane=mode}}`.\n\nNote that the `{{chooseblock}}` tag uses the `init()` method and either the `render()` method or the `template` option, and also has a custom tag property: `pane`.\n\nWe will develop this example further in the following sections, and incorporate additional data-linking and interactivity features, using other custom tag [*options* and *methods/handlers*](#tagstructure). In this way it will evolve into a `{{spinblock}}` control (with the `pane` property as tag state) which will then be incorporated (through tag composition) into a more advanced `{{colorpicker}}` control."
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
            "text": "*Tag declaration (using a render method):*\n\n```js\nchooseblock: {\n  // JsViews handlers and methods\n  init: function(tagCtx) {\n    ... this.pane = tagCtx.props.pane;\n  },\n  render: function() {\n    // Called once for each block (tagCtx)\n    if (this.tagCtx.index === this.pane) {\n      // For selected block, include block content in rendered string \n      ret += ... + this.pane + \": \" + this.tagCtx.render();\n    }\n    return ret; // For non-selected blocks, return \"\"\n  },\n  // tag properties/state\n  pane: 0 // selected pane (defaults to 0)\n}\n```\n\n*Alternative version using a template:*\n\n```js\nchooseblock2: {\n  // JsViews tag settings\n  template: \"#chooseblock2Tmpl\", // Rendered once for each block (tagCtx)\n  // JsViews handlers and methods\n  init: function(tagCtx) {...},\n  ...\n}\n```\n\n*chooseblock2Tmpl:*\n\n```jsr\n{{!--include rendered block content, but only for selected pane--}}\n{{if ~tagCtx.index===~tag.pane}}\n  ... {{:~tag.pane}} ... {{include tmpl=#content/}}\n{{/if}}\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n<div class=\"box\">\n{{chooseblock pane=0}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/chooseblock}}\n</div>\n\n<div class=\"box\">\n{{chooseblock2 pane=1}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/chooseblock2}}\n</div>\n</script>\n\n<!--chooseblock2Tmpl-->\n<script id=\"chooseblock2Tmpl\" type=\"text/x-jsrender\">\n{{!--include rendered block content, but only for selected pane--}}\n{{if ~tagCtx.index===~tag.pane}}\n  {{:~tag.tagName}}<br/> Pane {{:~tag.pane}}:\n  {{include tmpl=#content/}}\n{{/if}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\n\n//---- {{chooseblock}} tag definition ----\n\nchooseblock: {\n  // JsViews handlers and methods\n  render: function() {\n    // Called once for each block (tagCtx)\n    var ret = \"\";\n    if (this.tagCtx.index === this.pane) {\n      // For selected block, include block content in rendered string \n      ret += this.tagName\n           + \"<br/>Pane \" + this.pane + \": \"\n           + this.tagCtx.render();\n    }\n    return ret; // For non-selected blocks, return \"\"\n  },\n\n  init: function(tagCtx) {\n    if (tagCtx.props.pane !== undefined) {\n      this.pane = tagCtx.props.pane;\n    }\n  },\n\n  // tag properties/state\n  pane: 0 // selected pane (defaults to 0)\n},\n\n//---- {{chooseblock2}} tag definition ----\n\nchooseblock2: {\n  // JsViews tag settings\n  template: \"#chooseblock2Tmpl\", // Rendered once for each block (tagCtx)\n\n  // JsViews handlers and methods\n  init: function(tagCtx) {\n    if (tagCtx.props.pane !== undefined) {\n      this.pane = tagCtx.props.pane;\n    }\n  },\n\n  // tag properties/state\n  pane: 0 // selected pane (defaults to 0)\n}\n\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {},\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "header": "<style>\n.box { width: 130px; height: 37px; margin: 10px; float: left; padding: 10px; font-family: sans-serif; box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.37);  border-radius: 2px; }\n</style>\n",
        "action": "",
        "height": "100",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "The two versions of `{{chooseblock}}` above show how:\n\n- with a `render()` method and no `template`, `render()` is called once for each block, and can selectively output rendering (such as the block content) for that block\n- with a `template` but no `render()` method, the template is rendered once for each block, and can again selectively render content (such as the block content) for the block\n\nThe following is a third variant which shows how:\n\n- with both a `template` and a `render()` method, calling `tagCtx.render()` from the `render()` method will render the template for that block. The template can then optionally include the corresponding block content"
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
            "text": "*render() method*\n\n```js\nrender: function() {\n  // Called once for each block (tagCtx)\n  if (this.tagCtx.index === 0) {\n    return this.tagCtx.render();\n    // render the template only once, on first tagCtx\n  }\n  return \"\";\n}\n```\n\n*chooseblock3Tmpl*\n\n```jsr\n{{:~tag.tagName}}<br/> Pane {{:~tag.pane}}:\n{{!--Render block content (tagCtx.content) for the selected pane--}}\n{{include tmpl=~tag.tagCtxs[~tag.pane].content /}}\n```\n"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n<div class=\"box\">\n{{chooseblock3 pane=pane}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/chooseblock3}}\n</div>\n</script>\n\n<!--chooseblock3Tmpl-->\n<script id=\"chooseblock3Tmpl\" type=\"text/x-jsrender\">\n{{:~tag.tagName}}<br/> Pane {{:~tag.pane}}:\n{{!--Render block content (tagCtx.content) for the selected pane--}}\n{{include tmpl=~tag.tagCtxs[~tag.pane].content /}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\nchooseblock3: {\n  // JsViews tag settings\n  template: \"#chooseblock3Tmpl\",\n\n  // JsViews handlers and methods\n  render: function() {\n    // Called once for each block (tagCtx)\n    if (this.tagCtx.index === 0) {\n      return this.tagCtx.render();\n      // render the template only once, on first tagCtx\n    }\n    return \"\";\n  },\n  init: function(tagCtx) {\n    if (tagCtx.props.pane !== undefined) {\n      this.pane = tagCtx.props.pane;\n    }\n  },\n\n  // tag properties/state\n  pane: 0 // selected pane (defaults to 0)\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {pane: 1}, // Set the selected pane\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "header": "<style>\n.box { width: 130px; height: 37px; margin: 10px; float: left; padding: 10px; font-family: sans-serif; box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.37);  border-radius: 2px; }\n</style>",
        "action": "append",
        "height": "100",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "Setting the data context of wrapped content",
        "text": "*__To set the inner data context for the wrapped content:__*\n\n- With the `render()` approach:\n  - pass in data as argument: `tagCtx.render(someData)`\n  - use [contentCtx](#tagoptions@contentctx) to define the inner data context\n  - call `render()` without argument, in which case the inner data context will be the same as the outer context\n- With the `template` approach:\n  - pass data as an argument: `{{include someData tmpl=... /}}`\n  - use [contentCtx](#tagoptions@contentctx) to define the data context of both the template and the wrapped content\n  - use `{{include tmpl=... /}}` without argument, in which case the data context of both the template and the wrapped content will be:\n    - the value passed as first tag argument `{{mytag someData...}}`, if there is one\n    - otherwise, the same as the outer context.)\n",
        "anchor": "contentctx"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "bindingpatterns",
            "label": "Data binding design patterns"
          },
          {
            "_type": "topic",
            "hash": "hierarchypatterns",
            "label": "Tag hierarchy design patterns"
          }
        ],
        "detail": false
      }
    ]
  },
  "bindingpatterns": {
    "title": "JsViews tag controls: Data binding design patterns",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This topic shows common tag control design patterns involving data-binding and interactivity:\n\n- [Data-linked tags: responding to updated args or props](#bindingpatterns@datalinked)\n- [Responding to user actions](#bindingpatterns@user-actions)\n- [Two-way binding to args or props (bindTo). Persistence of state](#bindingpatterns@bindto)\n- [Linked element](#bindingpatterns@linkedelem)\n- [Linked contextual parameters](#bindingpatterns@linkedctxparam)\n- [SetValue and updateValue](#bindingpatterns@setvalue-updatevalue)\n- [Multiple two-way binding to args or props](#bindingpatterns@multiple-twoway)\n\nFor other categories of tag control design pattern, see *[Layout and rendering design patterns](#renderingpatterns)* and *[Tag hierarchy design patterns](#hierarchypatterns)*.\n"
      },
      {
        "_type": "para",
        "title": "Data-linked tag controls: responding to updated args or props",
        "text": "The *[Wrapping content](#renderingpatterns@wrapping)* section of  *[Layout and rendering design patterns](#renderingpatterns)* showed the `{{chooseblock}}` custom tag -- which did not use data-linking (and could be used just with JsRender).\n\nThe next sample will make `{^{chooseblock pane=...}}` into a data-linked tag control, where the selected `tag.pane` can be driven by data and respond to observable changes through one-way data binding of the `pane` property.\n\nThis will illustrate the use of the [`boundProps`](#tagoptions@boundprops) option, the [`init()`](#tagoptions@init) and [`onUpdate()`](#tagoptions@onupdate) event handler, and custom tag methods.\n\nSpecifically, we will provide:\n\n- a `boundProps: [\"pane\"]` option setting. (This option takes an array of property names.) Declaring `pane` as a bound property saves us from having to write `{^{chooseblock ^pane=...}}` on each tag instance (see [*binding to tag properties*](#linked-tag-syntax@linkedproperties)).  \n- a `getPane()` custom tag method, to validate the value of the `pane` property.\n- an `init()` event handler to initialize `tag.pane` based on the data).\n- an `onUpdate()` event handler, to respond to observable changes of the `pane` property. Like `init()`, this handler will use `tag.getPane(...)` to test whether the new value is valid -- and if so will set the `tag.pane` to the new value. For invalid values we return `false`, to ignore the change, and skip re-rendering the tag control. (See *[Custom tag control lifecycle](#taglifecycle@datalink)*.)",
        "anchor": "datalinked"
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
            "text": "*Data-linked tag:*\n\n```jsr\n{^{chooseblock pane=mode}}...{{else}}...{{else}}...{{/chooseblock}}\n```\n\n*Add `boundProps` to observe `pane`, `getPane()` to validate value of `pane`, `init()` and `onUpdate()` to respond to valid changes:*\n\n```js\nchooseblock: {\n  // JsViews tag settings\n  boundProps: [\"pane\"], // respond to observable changes in the 'pane' property\n  // JsViews handlers and methods\n  init: function(tagCtx) {\n    var newPane = this.getPane(this.tagCtxs);  // Validate 'pane' prop\n    ...\n  },\n  render: function() {\n    ...\n  }, \n  onUpdate: function(ev, event, newTagCtxs) {\n    var newPane = this.getPane(newTagCtxs); // Validate 'pane' prop\n    if (newPane === undefined) {\n      return false; // Not a valid value, so no update\n    }\n    this.pane = newPane; // Valid value, so update\n  },\n  ...\n  // tag methods\n  getPane: function(tagCtxs) {\n    // Helper function to validate the 'pane' prop - integer, in range\n    var pane = tagCtxs[0].props.pane;\n    if (...) {\n      return pane;\n    }\n  }\n}\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n<div class=\"box\">\n{^{chooseblock pane=mode}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/chooseblock}}\n</div>\n\n<div class=\"left\">\n  <input data-link=\"mode convert=~toString convertBack=~toInt\"/>\n</div>\n\n<div class=\"left\">\n{^{radiogroup mode convert=~toString convertBack=~toInt}}\n  <label><input type=\"radio\" value=\"0\"/> 0</label>\n  <label><input type=\"radio\" value=\"1\"/> 1</label>\n  <label><input type=\"radio\" value=\"2\"/> 2</label>\n{{/radiogroup}}\n</div>\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\nchooseblock: {\n  // JsViews tag settings\n  boundProps: [\"pane\"], // Respond to observable changes in 'pane' prop\n\n  // JsViews handlers and methods\n  init: function(tagCtx) {\n    var newPane = this.getPane(this.tagCtxs);  // Validate 'pane' prop\n    if (newPane !== undefined) {\n      this.pane = newPane; // Is valid, so set to the value\n    }\n  },\n\n  render: function() { \n    var ret = \"\";\n    if (this.tagCtx.index === this.pane) {\n      // For selected block, include block content in rendered string \n      ret += this.tagName + \"<br/>Pane \"\n          + this.pane + \": \"\n          + this.tagCtx.render();\n    }\n    return ret; // For non-selected blocks, return \"\"\n  },\n\n  onUpdate: function(ev, event, newTagCtxs) {\n    var newPane = this.getPane(newTagCtxs); // Validate 'pane' prop\n    if (newPane === undefined) {\n      return false; // Not a valid value, so no update\n    }\n    this.pane = newPane; // Valid value, so update\n  },\n\n  // tag properties/state\n  pane: 0,  // selected pane (defaults to 0)\n\n  // tag methods\n  getPane: function(tagCtxs) {\n    // Helper function to validate the 'pane' prop - integer, in range\n    var pane = tagCtxs[0].props.pane;\n    if (pane !== null && 0 <= pane && pane < this.tagCtxs.length) {\n      return pane;\n    }\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    mode: 1\n  },\n  context = {\n    toInt: function(value) {\n      value = +value;  // Coerce to number\n      return value === parseInt(value) ? value : null; // If not exact integer return null\n    },\n    toString: function(value) {\n      return \"\" + value;\n    }\n  };\n\nmyTmpl.link(\"#page\", data, context);\n",
        "header": "<style>\n.box { width: 130px; height: 37px; margin: 10px; float: left; padding: 10px; font-family: sans-serif; box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.37);  border-radius: 2px; }\n.left { float: left; padding: 12px; }\n.left input:not([type]) { width: 100px; }\nlabel { display: block }\n</style>",
        "action": "",
        "height": "100",
        "title": "{{chooseblock}} with  one-way binding",
        "anchor": "chooseblock1way",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "Responding to user actions",
        "text": "An interactive tag control will capture and respond to user actions, generally in one or more of the following ways:\n\n- Responding to observable changes to data -- such as bound args or props, or changes corresponding to `depends` settings (see the *[Data-linked controls](#bindingpatterns@datalinked)* pattern above). (The data changes are typically themselves the result of the user interacting with the UI elsewhere, outside this tag control).\n- Responding to user changes made via 'sub-controls' within this tag control UI, such as textboxes, radio buttons, checkboxes or other tag controls (see the *[linked elements](#bindingpatterns@linkedelem)*, *[linked contextual parameters](#bindingpatterns@linkedctxparam)* and *[composition](#hierarchypatterns@compositee)* patterns)\n- The tag control can attach event handlers on its rendered UI, and then respond to user events such as 'click' or 'mousemove', via those handlers.\n\nTo illustrate the use of event handlers, we will convert our `{{chooseblock}}` tag control into a `{{spinblock}}` tag control, by providing *switcher* UI for cycling through the panes.\n\nWe will set the option [`dataBoundOnly: true`](#tagoptions@databoundonly) (since this control is only intended to be used with data-linking -- and otherwise should show an error message).\n\nWe will add a custom tag method, `cycle()`, registered as 'click' handler on the *switcher*.\n\nTwo versions of the `{{spinblock}}` show:\n\n- Attaching the handler declaratively, using `{on ~tag.cycle}`. (See [*Event bindings*](#link-events).)\n- Attaching the handler programmatically in the [`onBind()`](#tagoptions@onbind) event, using jQuery\n\nThe `cycle()` method modifies the tag control state: `tag.pane`, and then calls `tag.refresh()` to re-render with the new pane selection.\n\n- A third version takes the declarative approach, but instead of using a `render()` method it uses a `template`. The template data-links directly to the `tag.pane` value. In this version, the `cycle()` method does not call `tag.refresh()`, but simply changes the `tag.pane` observably, and lets JsViews automatically update appropriately thanks to the data-linking.",
        "anchor": "user-actions"
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
            "text": "*Data-linked tag:*\n\n```jsr\n{^{spinblock pane=mode}}...{{else}}...{{else}}...{{/spinblock}}\n```\n\n*spinblock* -- Attach handler declaratively, using [`{on ...}`](#jsvontag)\n\n```js\n// JsViews tag settings\ndataBoundOnly: true,\n// JsViews handlers and methods\nrender: function() {\n  ...\n  if (this.tagCtx.index === 0) { // First pane\n    // Render switcher UI, with 'click' handler calling tag.cycle() method\n    ... + '<div class=\"switcher\" data-link=\"{on ~tag.cycle}\">...</div>';\n  }\n  if (this.tagCtx.index === this.pane) { // This is the selected pane.\n    ... + this.tagCtx.render(); // Render block content\n  }\n  ...\n},\n...\n// tag methods\ncycle: function() { // Method to cycle/increment selected pane\n  this.pane = (this.pane+1) % this.tagCtxs.length;\n  this.refresh();\n}\n```\n\n*spinblock2* -- Attach handler programmatically, using jQuery *on()*\n\n```js\n...\n// JsViews handlers and methods\nrender: function() {\n  ...\n  if (this.tagCtx.index === 0) { // First pane\n    ... + '<div class=\"switcher\"> ... </div>'; // Render switcher UI\n  }\n  ...\n},\nonBind: function() {\n  // Attach tag.cycle() method to switcher UI, as 'click' handler\n  this.contents(true, '.switcher').on(\"click\", $.proxy(this.cycle, this));\n},\n...// tag methods\ncycle: function() { ... }\n```\n\n*spinblock3* -- Use data-link to incrementally update for new pane (rather than complete refresh)\n\n```js\n// JsViews tag settings\ndataBoundOnly: true,\ntemplate: \"#spinblock3Tmpl\", // spinblock UI\n...\n// tag methods\ncycle: function() { // Method to cycle/increment selected pane\n  var newPane = (this.pane+1) % this.tagCtxs.length;\n  $.observable(this).setProperty(\"pane\", newPane);\n}\n```\n\n*spinblock3Tmpl* -- Switch blocks, driven by data-linking to *tag.pane* \n\n```jsr\n...\n{{!--Switcher UI with 'click' handler calling tag.cycle() method--}}\n<div class=\"switcher\" data-link=\"{on ~tag.cycle}\">\n...\n{{!--Render wrapped content of selected block, data-linked to ~tag.pane for dynamic switching--}}\n{^{include ^tmpl=~tag.tagCtxs[~tag.pane].content/}}\n...\n```"
          }
        ],
        "header": "<style>\n.box { position: relative; width: 140px; height: 37px; margin: 10px; float: left; padding: 10px; font-family: sans-serif; box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3), 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 4px 0 rgba(0, 0, 0, 0.37);  border-radius: 2px; }\n.switcher {position: absolute; left: 136px; top: 12px; font-family: Verdana; font-size: 14px; height: 34px; width: 17px; cursor: pointer; }\n.switcher:hover { background-color: #DDD; }\n</style>",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{^{spinblock}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/spinblock}}\n\n{^{spinblock2}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/spinblock2}}\n\n{^{spinblock3}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/spinblock3}}\n</script>\n\n<script id=\"spinblock3Tmpl\" type=\"text/x-jsrender\">\n{{if ~tagCtx.index===0}} {{!--render once only--}}\n  <div class=\"box\">\n    {{!--Switcher UI with 'click' handler calling tag.cycle() method--}}\n    <div class=\"switcher\" data-link=\"{on ~tag.cycle}\">\n      <svg height=\"34\" width=\"17\">\n        <path d=\"M5,6 L11,6 L8,2 Z M5,26 L11,26 L8,30 Z\"></path>\n        <text x=4 y=21 data-link=\"text{:~tag.pane}\"></text>\n      </svg>\n    </div>\n    {{:~tag.tagName}}<br/>\n    {{!--Render wrapped content of selected block,\n         data-linked to ~tag.pane for dynamic switching--}}\n    {^{include ^tmpl=~tag.tagCtxs[~tag.pane].content/}}\n  </div>\n{{/if}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\n\n//---- {{spinblock}} tag definition ----\n\nspinblock: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n\n  // JsViews handlers and methods\n  render: function() {\n    var ret = \"\";\n    if (this.tagCtx.index === 0) {\n      // First pane\n      ret += '<div class=\"box\">' // Outer 'box' div\n      // Render switcher UI, with 'click' handler calling tag.cycle() method\n      + '<div class=\"switcher\" data-link=\"{on ~tag.cycle}\">'\n        + '<svg height=\"34\" width=\"17\">'\n          + '<path d=\"M5,6 L11,6 L8,2 Z M5,26 L11,26 L8,30 Z\"></path>'\n          + '<text x=4 y=21 >' + this.pane + '</text>'\n        + '</svg>'\n      + '</div>';\n    }\n    if (this.tagCtx.index === this.pane) {\n      // This is the selected pane.\n      ret += this.tagName + \"<br/>\"\n        + this.tagCtx.render(); // Render block content\n    }\n    if (this.tagCtx.index === this.tagCtxs.length-1) {\n      // Last pane\n      ret += '</div>'; // Close outer 'box' div\n    }\n    return ret;\n  },\n\n  onUpdate: false, // No need to re-render on update\n\n  // tag properties/state\n  pane: 1, // Initial selected pane\n\n  // tag methods\n  cycle: function() {\n    // Method to cycle/increment selected pane\n    this.pane = (this.pane+1) % this.tagCtxs.length;\n    this.refresh();\n  }\n},\n\n//---- {{spinblock2}} tag definition ----\n\nspinblock2: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n\n  // JsViews handlers and methods\n  render: function() {\n    var ret = \"\";\n    if (this.tagCtx.index === 0) {\n      // First pane\n      ret += '<div class=\"box\">' // Outer 'box' div\n      // Render switcher UI\n      + '<div class=\"switcher\">'\n        + '<svg height=\"34\" width=\"17\">'\n          + '<path d=\"M5,6 L11,6 L8,2 Z M5,26 L11,26 L8,30 Z\"></path>'\n          + '<text x=4 y=21 >' + this.pane + '</text>'\n        + '</svg>'\n      + '</div>';\n    }\n    if (this.tagCtx.index === this.pane) {\n      // This is the selected pane.\n      ret += this.tagName + \"<br/>\"\n        + this.tagCtx.render(); // Render block content\n    }\n    if (this.tagCtx.index === this.tagCtxs.length-1) {\n    // Last pane\n      ret += '</div>'; // Close outer 'box' div\n    }\n    return ret;\n  },\n\n  onBind: function() {\n    // Attach tag.cycle() method to switcher UI, as 'click' handler\n    this.contents(true, '.switcher').on(\"click\", $.proxy(this.cycle, this));\n  },\n\n  onUpdate: false, // No need to re-render on update\n\n  // tag properties/state\n  pane: 1, // Initial selected pane\n\n  // tag methods\n  cycle: function() {\n    // Method to cycle/increment selected pane index\n    this.pane = (this.pane+1) % this.tagCtxs.length;\n    this.refresh();\n  }\n},\n\n//---- {{spinblock3}} tag definition ----\n\nspinblock3: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  template: \"#spinblock3Tmpl\", // spinblock UI\n\n  // JsViews handlers and methods\n  onUpdate: false, // No need to re-render on update\n\n  // tag properties/state\n  pane: 1, // Initial selected pane\n\n  // tag methods\n  cycle: function() {\n    // Method to cycle/increment selected pane\n    newPane = (this.pane+1) % this.tagCtxs.length;\n    $.observable(this).setProperty(\"pane\", newPane);\n  }\n}\n\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {mode: \"2\"};\n\nmyTmpl.link(\"#page\", data);",
        "height": "100",
        "title": "{{spinblock}} variants",
        "anchor": "spinblock",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "It is easy to use the above pattern for other similar tag controls which wrap content, and offer interactive UI to switch blocks. Here is the same `{{spinblock3}}` example above converted to a `{{tabs}}` control:\n"
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
            "text": "*Data-linked tag:*\n\n```jsr\n{^{tabs width=width height=22 caption=\"Tab A\"}}...{{else caption=\"Tab B\"}}...{{else caption=\"Tab C\"}}...{{/tabs}}\n```\n\n*Tag options for {{tabs}}:* -- Use data-link to incrementally update for new pane\n\n```js\ntabs: {\n  // JsViews tag settings\n  setSize: true, // Allow setting width and height of 'main element'\n  mainElement: \".tabscontent td\", // Selector for 'main element' (tag.mainElem)\n  ...\n  template: \"#tabsTmpl\", // UI for tabs control\n\n  // JsViews handlers and methods\n  onUpdate: false, // No need to re-render on update\n\n  // tag properties/state\n  pane: 0, // selected pane (defaults to 0)\n\n  // tag methods\n  setTab: function(index) {\n    // OnClick for a tab\n    $.observable(this).setProperty(\"pane\", index);\n  }\n}\n```\n\n*tabsTmpl:* -- Data-linking to *tag.pane*\n\n```jsr\n{{if ~tagCtx.index===0}} {{!--render once only--}}\n  <table ...><tbody>\n    {{!--Tab strip UI with 'click' handler calling tag.setTab() method--}}\n    <tr ...>\n      {{for ~tag.tagCtxs}}\n        <th data-link=\"... {on ~tag.setTab #index}\"></th>\n      {{/for}}\n    </tr>\n    {{!--Tab content: wrapped content of selected block, data-linked to ~tag.pane for dynamic switching--}}\n    <tr ...>\n      <td ... data-link=\"{include ^tmpl=~tag.tagCtxs[~tag.pane].content}\"></td>\n    </tr>\n  </tbody></table>\n{{/if}}\n```"
          }
        ],
        "header": "<style>\n.tabstrip > td, .tabscontent > td { border: solid 1px #0000A6; border-top: none; border-right: solid 2px; #1E1ED2; background-color: #fff; }\n.tabstrip > th { cursor: pointer; padding: 2px; font-weight: normal; font-style: italic; color: #424FB3;   border: solid 1px #bbb; border-right: none; background-color: #f8f8f8; border-bottom: solid 1px #1E1ED2; }\n.tabsview { border-collapse: collapse; border: none; font-family: sans-serif; }\n.tabstrip { border-right: solid 1px #bbb; height: 26px }\n.tabstrip > th.header_true { cursor: default; font-weight: bold; border: solid 1px #0000A6; border-right: solid 2px #1E1ED2; border-bottom: solid 1px #eee; color: #0000A6; background-color: #fff; }\n.tabscontent td { padding: 15px 10px 10px 10px; }\n</style>",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{^{tabs width=width height=22 caption=\"Tab A\"}}\n  <u>Zero</u>\n{{else caption=\"Tab B\"}}\n  <b>One</b>\n{{else caption=\"Tab C\"}}\n  <i>Two</i>\n{{/tabs}}\n</script>\n\n<script id=\"tabsTmpl\" type=\"text/x-jsrender\">\n{{if ~tagCtx.index===0}} {{!--render once only--}}\n  <table class=\"tabsview\"><tbody>\n    {{!--Tab strip UI with 'click' handler calling tag.setTab() method--}}\n    <tr class=\"tabstrip\">\n      {{for ~tag.tagCtxs}}\n        <th data-link=\"\n          class{:'header_' + (#index === ~tag.pane)}\n          {on ~tag.setTab #index}\n          {:props.caption}\"></th>\n      {{/for}}\n    </tr>\n    {{!--Tab content with wrapped content of selected {{else}} block--}}\n    <tr class=\"tabscontent\">\n      <td colspan=\"{{:~tag.tagCtxs.length}}\" data-link=\"{include ^tmpl=~tag.tagCtxs[~tag.pane].content}\"></td>\n    </tr>\n  </tbody></table>\n{{/if}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\ntabs: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  setSize: true, // Allow setting width and height of 'main element'\n  mainElement: \".tabscontent td\", // Selector for 'main element' (tag.mainElem)\n  width: 250, // Default width\n  height: 100, // Default height\n  template: \"#tabsTmpl\", // UI for tabs control\n\n  // JsViews handlers and methods\n  onUpdate: false, // No need to re-render on update\n\n  // tag properties/state\n  pane: 0, // selected pane (defaults to 0)\n\n  // tag methods\n  setTab: function(index) {\n    // OnClick for a tab\n    $.observable(this).setProperty(\"pane\", index);\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    width: 230,\n    pane: \"1\"\n  };\n\nmyTmpl.link(\"#page\", data);",
        "height": "100",
        "title": "{{tabs}} control",
        "anchor": "tabs",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "The `{{tabs}}` sample above is structurally identical to the previous `{{spinblock3}}` sample, but substitutes the tabs UI (`\"#tabsTmpl\"`) for the spinblock UI (`\"spinblockTmpl3\"`).\n\nIt also adds the following tag options -- for specifying the size of the tabs control (see the *[Setting size](#renderingpatterns@setsize)* pattern):\n\n- [`setSize: true`](#tagoptions@setsize):\n- [`width: 250`](#tagoptions@width) and [`height: 100`](#tagoptions@height):\n- [`mainElement: \".tabsContent td\"`](#tagoptions@mainelement):\n"
      },
      {
        "_type": "para",
        "title": "Two-way binding to args or props (bindTo). Persistence of state",
        "text": "The `{{tabs}}` control has internal state -- the `tag.pane` integer -- which changes when the use switches to another pane. A common requirement is to be able to initialize the UI state of a tag control from a contextual 'data store' (typically, from the server as session data), and also to be able to persist changes back to that store. \n\nIn the next two samples we will first add one-way data-linking so that `tag.pane` can be initialized from contextual data, and then use the [`bindTo`](#tagoptions@bindto) option to instead provide two-way data-linking, so we can persist changes.  \n\nThe one-way data-linking has already been addressed in the section above (the *[Data-linked tag controls](#bindingpatterns@datalinked)* pattern). We will take the same approach used in that section for the `{{chooseblock pane}}` tag control with data-driven pane selection, and apply it to our `{{tabs}}` control:",
        "anchor": "bindto"
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
            "text": "This `{{tabs}}` sample adds a data-driven `pane` (selected tab), using the same pattern (and essentially the same code) as data-driven `{{chooseblock}}` example [above](#bindingpatterns@datalinked) -- adding the following option settings:\n\n- *boundProps* -- to observe `pane` property\n- *getPane()* -- to validate value of `pane`\n- *init()* -- to initialize `tag.pane` with valid value\n- *onUpdate()* -- to respond to valid changes\n\nThis sample also moves the `template` option to a template string, rather than an external script block template declaration (for better custom tag encapsulation).\n\nIt also sets the [`displayElement`](#tagoptions@displayelement) option:\n\n- `displayElement: \".tabsview\"`\n\nto determine the HTML element that takes the class attribute. (See the *[Setting class](#renderingpatterns@setclass)* pattern).\n\n*Usage:*\n\n```jsr\n{^{tabs pane=~state.tabSelect width=width ... class=\"myTabs \"}}...{{/tabs}}\n```\n\n*Behavior:*\n\nWe have one-way binding to `state.tabSelect`. (Changing the radio buttons drives tab selection, but changing the tab does not drive the radio buttons. The next sample will add two-way binding.)",
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "paragraph"
              }
            ]
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{^{tabs pane=~state.tabSelect width=width height=22 caption=\"Tab A\" class=\"myTabs \"}}\n  <u>Zero</u>\n{{else caption=\"Tab B\"}}\n  <b>One</b>\n{{else caption=\"Tab C\"}}\n  <i>Two</i>\n{{/tabs}}\n\n<div class=\"left\">\n  <input data-link=\"~state.tabSelect convert=~toString convertBack=~toInt\"/>\n</div>\n\n<div class=\"left\">\n{^{radiogroup ~state.tabSelect convert=~toString convertBack=~toInt}}\n  <label><input type=\"radio\" value=\"0\"/> 0</label><br/>\n  <label><input type=\"radio\" value=\"1\"/> 1</label><br/>\n  <label><input type=\"radio\" value=\"2\"/> 2</label><br/>\n{{/radiogroup}}\n</div>\n\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\ntabs: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  setSize: true,\n  mainElement: \".tabscontent td\",\n  displayElement: \".tabsview\",\n  boundProps: [\"pane\"],\n  width: 250,\n  height: 100,\n  template:\n    '{{if ~tagCtx.index===0}}' + // render once only\n      '<table class=\"tabsview\"><tbody>' +\n        // Tab strip UI with 'click' handler calling tag.setTab() method\n        '<tr class=\"tabstrip\">' +\n          '{{for ~tag.tagCtxs}}' +\n            '<th data-link=\"class{:\\'header_\\' + (#index === ~tag.pane)} {on ~tag.setTab #index} {:props.caption}\"></th>' +\n          '{{/for}}' +\n        '</tr>' +\n        // Tab content with wrapped content of selected {{else}} block\n        '<tr class=\"tabscontent\">' +\n          '<td colspan=\"{{:~tag.tagCtxs.length}}\" data-link=\"{include ^tmpl=~tag.tagCtxs[~tag.pane].content}\"></td>' +\n        '</tr>' +\n      '</tbody></table>' +\n    '{{/if}}',\n\n  // JsViews handlers and methods\n  init: function(tagCtx) {\n    var newPane = this.getPane(this.tagCtxs);  // Validate 'pane' prop\n    if (newPane !== undefined) {\n      this.pane = newPane; // Is valid, so set to the value\n    }\n  },\n  onUpdate: function(ev, event, newTagCtxs) {\n    var newPane = this.getPane(newTagCtxs); // Validate 'pane' prop\n    if (newPane === undefined) {\n      return false; // Not a valid value, so no update\n    }\n    this.pane = newPane; // Valid value, so update\n  },\n\n  // tag properties/state\n  pane: 0, // selected pane (defaults to 0)\n\n  // tag methods\n  getPane: function(tagCtxs) {\n    // Helper function\n    var pane = +tagCtxs[0].props.pane;\n    if (!isNaN(pane) && pane >= 0 && pane < tagCtxs.length) {\n      return pane;\n    }\n  },\n  setTab: function(index) {\n    // OnClick for a tab\n    $.observable(this).setProperty(\"pane\", index); // Update tag.pane\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    width: 290\n  },\n  context = {\n    state: {\n      tabSelect: 1\n    },\n    toInt: function(index) {\n      return +index;\n    },\n    toString: function(index) {\n      return \"\" + index;\n    }\n  };\n\nmyTmpl.link(\"#page\", data, context);\n",
        "header": "<style>\n.left { float: left; padding: 12px; }\n.left input:not([type]) { width: 100px; }\n.myTabs { float: left; margin-right: 20px; }\n.tabstrip > td, .tabscontent > td { border: solid 1px #0000A6; border-top: none; border-right: solid 2px; #1E1ED2; background-color: #fff; }\n.tabstrip > th { cursor: pointer; padding: 2px; font-weight: normal; font-style: italic; color: #424FB3;   border: solid 1px #bbb; border-right: none; background-color: #f8f8f8; border-bottom: solid 1px #1E1ED2; }\n.tabsview { border-collapse: collapse; border: none; font-family: sans-serif; }\n.tabstrip { border-right: solid 1px #bbb; height: 26px }\n.tabstrip > th.header_true { cursor: default; font-weight: bold; border: solid 1px #0000A6; border-right: solid 2px #1E1ED2; border-bottom: solid 1px #eee; color: #0000A6; background-color: #fff; }\n.tabscontent td { padding: 15px 10px 10px 10px; }\n</style>",
        "height": "102",
        "title": "{{tabs}} with one-way binding",
        "anchor": "tabs1way",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "Next we replace the [`boundProps`](#tagoptions@boundprops) option setting by the [`bindTo`](#tagoptions@bindto) option, to allow two-way binding of the `tab` property. This will enable us to persist changes in the `{{tabs}}` control state by calling `tag.updateValue()`.\n\n(See also the alternative versions below: *[linkedCtxParam](#bindingpatterns@tabsctxprm)* and *[setValue()/updateValue()](#bindingpatterns@tabs-setvalue-updatevalue)*.)"
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
            "text": "Here we use the [`bindTo`](#tagoptions@bindto) option to provide two-way data-linking of `pane`:\n\n```js\ntabs: {\n  bindTo: \"pane\",\n ...\n  setTab: function(index) {\n    // OnClick for a tab\n    $.observable(this).setProperty(\"pane\", index); // Update tag.pane\n    this.updateValue(index); // Update external data, through two-way binding\n  }\n}\n```\n\nOur sample has nested `{{tabs}}` tag controls:\n\n```jsr\n{^{tabs pane=~state.outerSelect ...}}\n  ...\n  {^{tabs pane=~state.innerSelect ...}}\n    ...\n  {{else ...}}\n    ...\n  {{/tabs}}\n{{else ...}}\n  ...\n{{/tabs}}\n```\n\nThanks to the state persistence to `~state.outerSelect` and `~state.innerSelect`, the user can switch tabs on the inner `{{tabs}}` control, then switch the outer `{{tabs}}` control to a different tab. On returning to the original tab, the inner `{{tabs}}` control 'remembers' its previous 'selected tab' setting. Both controls can be driven by the corresponding radio buttons, by two-way binding. The `~state` object could also be 'round-tripped' to the server/cloud/web service at any time, to allow re-initializing of the page with correct current 'user state' data. "
          }
        ],
        "header": "<style>\nbody { font-family: sans-serif; }\n.special { color: red; font-family: Comic Sans MS; font-style: italic; margin-bottom: 12px; }\n.left { width: 90px; height: 37px; float: left; padding: 25px; }\n.myTabs { float: left; margin-right: 20px; }\n.tabstrip > td, .tabscontent > td { border: solid 1px #0000A6; border-top: none; border-right: solid 2px; #1E1ED2; background-color: #fff; }\n.tabstrip > th { cursor: pointer; padding: 2px; font-weight: normal; font-style: italic; color: #424FB3;   border: solid 1px #bbb; border-right: none; background-color: #f8f8f8; border-bottom: solid 1px #1E1ED2; }\n.tabsview { border-collapse: collapse; border: none; }\n.tabstrip { border-right: solid 1px #bbb; height: 26px }\n.tabstrip > th.header_true { cursor: default; font-weight: bold; border: solid 1px #0000A6; border-right: solid 2px #1E1ED2; border-bottom: solid 1px #eee; color: #0000A6; background-color: #fff; }\n.tabscontent td { padding: 15px 10px 10px 10px; }\n</style>",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{^{tabs pane=~state.outerSelect width=width height=125 caption=\"Tab A\" class=\"myTabs\"}}\n  <div class=\"special\">Some tabbed content:</div>\n  {^{tabs pane=~state.innerSelect\n    width=(width-23) height=35 caption=\"Inner One\"}}\n    ONE inner\n  {{else caption=\"Inner Two\"}}\n    TWO {{>label2}}\n  {{else caption=\"Inner Three\"}}\n    THREE inner\n  {{/tabs}}\n{{else caption=\"Tab B\"}}\n  <ul><li>Some</li><li><b>other</b></li><li>content</li></ul>\n{{/tabs}}\n\n<div class=\"left\">\nOuter Select<br/>\n{^{radiogroup ~state.outerSelect convert=~toString convertBack=~toInt}}\n  <label><input type=\"radio\" value=\"0\"/> 0</label><br/>\n  <label><input type=\"radio\" value=\"1\"/> 1</label><br/>\n{{/radiogroup}}\n</div>\n\n<div class=\"left\">\nInner Select<br/>\n{^{radiogroup ~state.innerSelect convert=~toString convertBack=~toInt}}\n  <label><input type=\"radio\" value=\"0\"/> 0</label><br/>\n  <label><input type=\"radio\" value=\"1\"/> 1</label><br/>\n  <label><input type=\"radio\" value=\"2\"/> 2</label><br/>\n{{/radiogroup}}\n</div>\n\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\ntabs: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  setSize: true,\n  mainElement: \".tabscontent td\",\n  displayElement: \".tabsview\",\n  bindTo: \"pane\",\n  width: 250,\n  height: 100,\n  template:\n    '{{if ~tagCtx.index===0}}' + // render once only\n      '<table class=\"tabsview\"><tbody>' +\n        // Tab strip UI with 'click' handler calling tag.setTab() method\n        '<tr class=\"tabstrip\">' +\n          '{{for ~tag.tagCtxs}}' +\n            '<th data-link=\"class{:\\'header_\\' + (#index === ~tag.pane)} {on ~tag.setTab #index} {:props.caption}\"></th>' +\n          '{{/for}}' +\n        '</tr>' +\n        // Tab content with wrapped content of selected {{else}} block\n        '<tr class=\"tabscontent\">' +\n          '<td colspan=\"{{:~tag.tagCtxs.length}}\" data-link=\"{include ^tmpl=~tag.tagCtxs[~tag.pane].content}\"></td>' +\n        '</tr>' +\n      '</tbody></table>' +\n    '{{/if}}',\n\n  // JsViews handlers and methods\n  init: function(tagCtx) {\n    var newPane = this.getPane(this.tagCtxs);  // Validate 'pane' prop\n    if (newPane !== undefined) {\n      this.pane = newPane; // Is valid, so set to the value\n    }\n  },\n  onUpdate: function(ev, event, newTagCtxs) {\n    var newPane = this.getPane(newTagCtxs); // Validate 'pane' prop\n    if (newPane === undefined) {\n      return false; // Not a valid value, so no update\n    }\n    this.pane = newPane; // Valid value, so update\n  },\n\n  // tag properties/state\n  pane: 0, // selected pane (defaults to 0)\n\n  // tag methods\n  getPane: function(tagCtxs) {\n    // Helper function\n    var pane = +tagCtxs[0].props.pane;\n    if (!isNaN(pane) && pane >= 0 && pane < tagCtxs.length) {\n      return pane;\n    }\n  },\n\n  setTab: function(index) {\n    // OnClick for a tab\n    $.observable(this).setProperty(\"pane\", index); // Update tag.pane\n    this.updateValue(index); // Update external data, through two-way binding\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    width: 290,\n    label2: \"Inner Tab Label2\",\n    },\n  context = {\n    state: {\n      outerSelect: 0,\n      innerSelect: 1\n    },\n    toInt: function(index) {\n      return +index;\n    },\n    toString: function(index) {\n      return \"\" + index;\n    }\n  };\n\nmyTmpl.link(\"#page\", data, context);\n",
        "height": "200",
        "title": "{{tabs}} with two-way binding",
        "anchor": "tabs2way",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "Linked element",
        "text": "The [previous section](#bindingpatterns@bindto) showed how to provide two-way data-linking on custom tag controls, using [`bindTo`](#tagoptions@bindto). The approach was partly programmatic -- involving for example a call to `tag.updateValue()` to drive the two-way data-binding to the tag argument or property.\n\nTwo additional option settings can be used in conjunction with [`bindTo`](#tagoptions@bindto), to provide a simpler and more declarative approach to two-way data-linking\n\n- The first, discussed in this section, is the [`linkedElement`](#tagoptions@linkedelement) option.\n- The second -- the [`linkedCtxParam`](#tagoptions@linkedctxparam) option -- is discussed in the [next section](#bindingpatterns@linkedctxparam).  \n\nThe `linkedElement` option allows identifying a single HTML element in the control with each of the tag arguments or properties specified in `bindTo`. The chosen element is automatically data-linked to the chosen argument/property.\n\nFor example here is a custom `{{textbox}}` tag control consisting of a data-linked caption, and an `<input>` element. We use `linkedElement: \"input\"` (with the selector `\"input\"`) to set up the two-way data-linking on the `<input>`.",
        "anchor": "linkedelem"
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
            "text": "```jsr\n{^{textbox name caption=role .../}}\n```\n\n```js\ntextbox: {\n  ...\n  boundProps: [\"caption\"],\n  template: \"... {^{:~tagCtx.props.caption}}: <input/>...\",\n  linkedElement: \"input\",\n  displayElement: \"div\",\n  ...\n}\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{^{textbox name caption=role class=\"tb1\"/}}<br />\n\n<input data-link=\"role\" class=\"left\"/>\n<input data-link=\"name\"/>\n</script>\n\n<div id=\"page\"></div>",
        "header": "<style>\n.tb1 {border: 1px solid #bbb; padding: 8px; margin: 5px 20px; font-style: italic; display: inline-block;}\n.left {margin: 5px 20px;}\n</style>",
        "code": "$.views.tags({\ntextbox: {\n  dataBoundOnly: true,\n  boundProps: [\"caption\"],\n  template: \"<div>{^{>~tagCtx.props.caption}}: <input/></div>\",\n  linkedElement: \"input\",\n  displayElement: \"div\",\n  onUpdate: false\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    name: \"Jo\",\n    role: \"Owner\"\n  };\n\nmyTmpl.link(\"#page\", data);",
        "height": "102",
        "title": "{{textbox}} with  linkedElement",
        "anchor": "textbox-linkedelem",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the above sample, `bindTo` was not set, so it had the default behavior of binding to the first tag argument (`bindTo: 0`).\n\nHere is a modified sample, with `bindTo` and `linkedElement` specifying bindings to three elements:\n\n- a `<span>` for the caption (one-way binding)\n- an `<input>` for first name (two-way binding)\n- an `<input>` for last name (two-way binding)\n\n```js\nbindTo: [0, 1, \"caption\"],\nlinkedElement: [\".frst\", \".lst\", \".cptn\"],\n```"
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
            "text": "```jsr\n{^{namebox first last caption=~label .../}}\n```\n\n```js\nnamebox: {\n  ...\n  template: '...<span class=\"cptn\"></span>: <input class=\"firstnm\"/> <input class=\"lastnm\"/>...',\n  bindTo: [0, 1, \"caption\"],\n  linkedElement: [\".firstnm\", \".lastnm\", \".cptn\"],\n  ...\n}\n```"
          }
        ],
        "header": "<style>\n.tb1 {border: 1px solid #bbb; padding: 8px; margin: 5px 20px; font-style: italic; display: inline-block;}\n.left {margin: 5px 20px;}\n</style>",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{^{namebox first last caption=~label class=\"tb1\"/}}<br />\n\n<input data-link=\"~label\" class=\"left\"/>\n<input data-link=\"first\"/>\n<input data-link=\"last\"/>\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\nnamebox: {\n  dataBoundOnly: true,\n  template: '<div><span class=\"cptn\"></span>: <input class=\"firstnm\"/> <input class=\"lastnm\"/></div>',\n  bindTo: [0, 1, \"caption\"],\n  linkedElement: [\".firstnm\", \".lastnm\", \".cptn\"],\n  displayElement: \"div\",\n  onUpdate: false\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\"\n  }, \n  uiTerms = {\n    label: \"Full name\"\n  };\n\nmyTmpl.link(\"#page\", data, uiTerms);\n",
        "height": "102",
        "title": "{{namebox}} with linkedElement",
        "anchor": "namebox-linkedelem",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "Linked contextual parameters",
        "text": "Like the [`linkedElement`](#tagoptions@linkedelement) option used in the [section above](#bindingpatterns@linkedelem), the [`linkedCtxParam`](#tagoptions@linkedctxparam) option provides a largely declarative approach to two-way data-linking of tag controls. But the *linked contextual parameter* approach is in many ways simpler, more flexible and more powerful than using *'linked elements'*.\n\nWe will convert the `{{namebox}}` `linkedElement` sample above to use `linkedCtxParam`.\n\nHere, we will declare a contextual parameter for each of the element bindings we want to establish:\n\n- a `<span>` for the caption (one-way binding) -- contextual parameter `~firstnm`\n- an `<input>` for first name (two-way binding) -- contextual parameter `~lastnm`\n- an `<input>` for last name (two-way binding) -- contextual parameter `~cptn`\n\n```js\nbindTo: [0, 1, \"caption\"],\nlinkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\"],\n```\n\nNow, we can use the contextual parameters, either:\n\n- declaratively in the template -- using data-linking: `<input data-link=\"~firstnm\"/>`\n- programmatically -- using APIs such as `tag.ctxPrm(...)`\n\nHere is the `{{namebox}}` sample above, converted to use contextual parameters, with declarative data-linking in the template:\n\n```jsr\ntemplate: '...{^{:~cptn}}: <input data-link=\"~firstnm\"/> <input data-link=\"~lastnm\"/>...'\n```",
        "anchor": "linkedctxparam"
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
            "text": "```jsr\n{^{namebox first last caption=~fullName .../}}\n```\n\n```js\nnamebox: {\n  ...\n  template: '...{^{:~cptn}}: <input data-link=\"~firstnm\"/> <input data-link=\"~lastnm\"/>...',\n  bindTo: [0, 1, \"caption\"],\n  linkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\"],\n  ...\n}\n```"
          }
        ],
        "title": "{{namebox}} with linkedCtxParam",
        "header": "<style>\n.tb1 {border: 1px solid #bbb; padding: 8px; margin: 5px 20px; font-style: italic; display: inline-block;}\n.left {margin: 5px 20px;}\n</style>",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{^{namebox first last caption=~label class=\"tb1\"/}}<br />\n\n<input data-link=\"~label\" class=\"left\"/>\n<input data-link=\"first\"/>\n<input data-link=\"last\"/>\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\nnamebox: {\n  dataBoundOnly: true,\n  template: '<div>{^{>~cptn}}: <input data-link=\"~firstnm\"/> <input data-link=\"~lastnm\"/></div>',\n  bindTo: [0, 1, \"caption\"],\n  linkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\"],\n  displayElement: \"div\",\n  onUpdate: false\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\"\n  }, \n  uiTerms = {\n    label: \"Full name\"\n  };\n\nmyTmpl.link(\"#page\", data, uiTerms);\n",
        "height": "102",
        "anchor": "namebox-linkedctxprm",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "Linked contextual parameters provide many useful features:\n\n- They can store state in the tag control\n- There can be multiple bindings to the same contextual parameter, within the template\n- Calling `tag.ctxPrm(\"myparam\", newValue)` will trigger observable updates both within the tag control (to `~myparam`) and outside the tag control (to whatever data is used for two-way binding to that contextual parameter, through the `bindTo` mapping)\n- A contextual parameter can be accessed not only within the tag control template, but also, for tag controls that are used as *block controls*, within wrapped content\n\nTo illustrate some of those features, let's add editability to our `{{namebox}}`, by adding an additional contextual parameter: `~edt`, which will correspond to a boolean 'editable' property (state) on the tag control.\n\nRather than a simple checkbox data-linked to `~edt`, we will provide a data-linked image (icon) that toggles based on `~edt`, with a click handler that calls `tag.toggle()`.\n\nWithin our `toggle()` tag method, we call `tag.ctxPrm(...)` to observably change the `~edt` state.\n\n(*Note:* See also the [*composite tag controls*](#hierarchypatterns@composite) topic for a version of the this editable `{{namebox}}` sample rewritten as a composite control.)"
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
            "text": "*{{namebox}} template:*\n\n```jsr\n...\n<img data-link=\"{on ~tag.toggle} src{:~edt ? ~tag.icons.noEdit : ~tag.icons.edit}\"/>\n...\n{^{if ~edt}}\n  <input data-link='~frst'/> <input data-link='~lst'/>\n{{else}}\n  {^{:~firstnm}} {^{:~lastnm}}\n{{/if}}\n...\n```\n\n*{{namebox}} options declaration:*\n\n```js\nnamebox: {\n  bindTo: [0, 1, \"caption\", \"editable\"],\n  linkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\", \"edt\"],\n  ...\n  toggle: function() {\n    this.ctxPrm(\"edt\", !this.ctxPrm(\"edt\")); // Observably toggle ~edt\n  },\n  icons: {edit: \"...\", noEdit: \"...\"}\n}\n```\n\n*Usage:*\n\n```jsr\n{^{namebox first last caption=~label editable=edit .../}}\n```"
          }
        ],
        "header": "<style>\n.tb1 {border: 1px solid #bbb; padding: 8px 8px 10px 8px; margin: 5px 20px; display: inline-block; height: 20px; font-style: normal;}\n.tb1 span, label {font-style: italic;} \n.tb1 img {margin-right: 6px; margin-top: 1px;}\n.left, label {margin: 5px 20px;}\nimg {width: 16px; height: 16px; cursor: pointer;}\n</style>",
        "html": "<script id=\"nameboxTmpl\" type=\"text/x-jsrender\">\n<div>\n  <img data-link=\"{on ~tag.toggle} src{:~edt ? ~tag.icons.noEdit : ~tag.icons.edit}\"/>\n  <span data-link=\"~cptn\"></span>:\n  {^{if ~edt}}\n    <input data-link='~firstnm'/> <input data-link='~lastnm'/>\n  {{else}}\n    {^{>~firstnm}} {^{>~lastnm}}\n  {{/if}}\n</div>\n</script>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{^{namebox first last caption=~label editable=edit class=\"tb1\"/}}<br/>\n\n<input data-link=\"~label\" class=\"left\"/>\n<input data-link=\"first\"/>\n<input data-link=\"last\"/>\n<label> Editable: <input type=\"checkbox\" data-link=\"edit\"/></label>\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\nnamebox: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  template: \"#nameboxTmpl\",\n  bindTo: [0, 1, \"caption\", \"editable\"],\n  linkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\", \"edt\"],\n  displayElement: \"div\",\n\n  // JsViews handlers and methods\n  onUpdate: false,\n\n  // tag methods\n  toggle: function() {\n    this.ctxPrm(\"edt\", !this.ctxPrm(\"edt\")); // Observably toggle ~edt\n  },\n\n  icons: {\n    edit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8\"\n+ \"/9hAAAA4UlEQVQ4jZXTvUpDMRgG4Eesgi5adXV1EAdBwYI4e0Q3dwcXd70O6VKoODqJN+DiIP\"\n+ \"hXRbRIL8ghDcTDOZ7mhQ+SkDzkhxCyjgcMsC8za/jEBpbwiiIHuB8vjikjM9hBp1TbaMEPVkp\"\n+ \"oiqyiW1HXeCSc+aMBqcswNgq8VyBtvOCwCUiR5dKkRTzhqAmIyKACWcAzDpqA2THyJtxBmja+M\"\n+ \"V8HbAq3G3dShfSwVwd0cJX0C+EVUuQE55MCEflCH6c4xm0OAHPYxQXucJYL/Jc/wBZuMhZPYZQ\"\n+ \"OTAtfejhhjXD5Cy7fOa4Bo/DvAAAAAElFTkSuQmCC\",\n    noEdit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf\"\n+ \"8/9hAAABJ0lEQVQ4jZXSP0sDMRzG8S/4B3RRa1dXoe2Z5HqiFRHcWtDV93Gcr0O6CIpT8U24dB\"\n+ \"BEreJQpO/ncZDW5AznGfgNucvz+SV3AUApbRnGskxk6fOfIcuuHB9qkahDQ44XdRnUBwwPapEs\"\n+ \"5iVEGStqcyhDL6iEfZ2yjFI+ldEMUA9Rwo4Mw0jdyfGILH053ufIKC80ygtVHWexxjH97thlIM\"\n+ \"ubMprzl6O8kPbYkuNZjrNyOAAC5IDt0qJNWZ5kOfefAwSAh0x+IRkb5XAc6LCqLgMZXtWh4Yc8\"\n+ \"bD0KyOFkGC52EkFkuZbhJA4Yekq59Y8T3YGlqAUEIcPNn9/AB4LwEWtyHCvlsvIvzIFYJ39U3Y\"\n+ \"NMhvuqcBmRZfYDXLAkw1iOaa2yzJRy9QVyXUUsviSJ/AAAAABJRU5ErkJggg==\"\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\",\n    edit: false\n  }, \n  uiHelpers = {\n    label: \"Full name\"\n  };\n\nmyTmpl.link(\"#page\", data, uiHelpers);\n\n//Icon made by Gregor Cresnar: https://www.flaticon.com/authors/gregor-cresnar\n",
        "height": "102",
        "title": "Editable {{namebox}} with linkedCtxParam",
        "anchor": "namebox-editable",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "Sometimes using linked contextual parameters can simplify tag controls, as in the next sample, where we convert the `{{tabs}}` two-way binding sample [above](#bindingpatterns@tabs2way) to use the [`linkedCtxParam`](#tagoptions@linkedctxparam) option for two-way binding.\n \n```js\nbindTo: \"pane\",\nlinkedCtxParam: \"pane\",\n```\n\nThe `~pane` linked contextual parameter stores the tag state for tab selection, through two-way data binding to the `pane` property.\n\nThe new `setTab()` method is:\n\n```js\nsetTab: function(index) {\n  // Update tag.pane, and update external data through two-way binding\n  this.ctxPrm(\"pane\", index);\n}\n```\n\nThis is simpler than our previous `setTab()` method, which was:\n\n```js\nsetTab: function(index) {\n  // OnClick for a tab\n  $.observable(this).setProperty(\"pane\", index); // Update tag.pane\n  this.updateValue(index); // Update external data, through two-way binding\n}\n```"
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
            "text": "```js\ntabs: {\n  bindTo: \"pane\",\n  linkedCtxParam: \"pane\",\n  ctx: {pane: 0}, // Default value for ~pane\n  ...\n  setTab: function(index) {\n    // Update tag.pane, and update external data through two-way binding\n    this.ctxPrm(\"pane\", index);\n  }\n}\n```"
          }
        ],
        "url": "samples/tag-controls/tabs/sample",
        "height": "200",
        "title": "{{tabs}} with linkedCtxParam",
        "anchor": "tabsctxprm"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also the alternative *[setValue()/updateValue()](#bindingpatterns@tabs-setvalue-updatevalue)* version of `{{tabs}}`, below.)"
      },
      {
        "_type": "para",
        "title": "Using contextual parameters in tag controls",
        "text": "Many of the features of linked contextual parameters shown above actually apply to contextual parameters more generally. \n\nWithin a tag control, a contextual parameter can be used directly (declaratively in the tag template, or programmatically through the `ctxPrm()` API), without being declared as a linked contextual parameter (through `linkedCtxParam`), and can bring the following features:\n\n- The contextual parameter can store state in the tag control\n- There can be multiple bindings to the same contextual parameter, within the template\n- A contextual parameter can be accessed not only within the tag control template, but also, for tag controls that are used as *block controls*, within wrapped content\n\nFor example in the editable `{{namebox}}` sample [above](#bindingpatterns@namebox-editable) we can remove the two-way data-linking on the `editable` property, but still use use the `~edt` contextual parameter within the tag control -- to provide the boolean 'editable' state. This is shown in the following modified sample:",
        "anchor": "ctxparams"
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
            "text": "*{{namebox}} template:*\n\n```jsr\n...\n<img data-link=\"{on ~tag.toggle} src{:~edt ? ~tag.icons.noEdit : ~tag.icons.edit}\"/>\n...\n{^{if ~edt}}...{{else}}...{{/if}}\n...\n```\n\n*{{namebox}} options declaration:*\n\n```js\nnamebox: {\n  bindTo: [0, 1, \"caption\"],\n  linkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\"], // ~edt is no longer declared as linked\n  ...\n  toggle: function() {\n    this.ctxPrm(\"edt\", !this.ctxPrm(\"edt\")); // Observably toggle ~edt\n  },\n  icons: {edit: \"...\", noEdit: \"...\"}\n}\n```\n\n*Usage:*\n\n```jsr\n{^{namebox first last caption=~fullName .../}}\n```"
          }
        ],
        "header": "<style>\n.tb1 {border: 1px solid #bbb; padding: 8px 8px 10px 8px; margin: 5px 20px; display: inline-block; height: 20px; font-style: normal;}\n.tb1 span, label {font-style: italic;} \n.tb1 img {margin-right: 6px; margin-top: 1px;}\n.left, label {margin: 5px 20px;}\nimg {width: 16px; height: 16px; cursor: pointer;}\n</style>",
        "height": "102",
        "html": "<script id=\"nameboxTmpl\" type=\"text/x-jsrender\">\n<div>\n  <img data-link=\"{on ~tag.toggle} src{:~edt ? ~tag.icons.noEdit : ~tag.icons.edit}\"/>\n  <span data-link=\"~cptn\"></span>:\n  {^{if ~edt}}\n    <input data-link='~firstnm'/> <input data-link='~lastnm'/>\n  {{else}}\n    {^{>~firstnm}} {^{>~lastnm}}\n  {{/if}}\n</div>\n</script>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{^{namebox first last caption=~label editable=edit class=\"tb1\"/}}<br/>\n\n<input data-link=\"~label\" class=\"left\"/>\n<input data-link=\"first\"/>\n<input data-link=\"last\"/>\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\nnamebox: {\n  dataBoundOnly: true,\n  template: \"#nameboxTmpl\",\n  bindTo: [0, 1, \"caption\"],\n  linkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\"],\n  displayElement: \"div\",\n  onUpdate: false,\n  toggle: function() {\n    this.ctxPrm(\"edt\", !this.ctxPrm(\"edt\"));\n  },\n  icons: {\n    edit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8\"\n+ \"/9hAAAA4UlEQVQ4jZXTvUpDMRgG4Eesgi5adXV1EAdBwYI4e0Q3dwcXd70O6VKoODqJN+DiIP\"\n+ \"hXRbRIL8ghDcTDOZ7mhQ+SkDzkhxCyjgcMsC8za/jEBpbwiiIHuB8vjikjM9hBp1TbaMEPVkp\"\n+ \"oiqyiW1HXeCSc+aMBqcswNgq8VyBtvOCwCUiR5dKkRTzhqAmIyKACWcAzDpqA2THyJtxBmja+M\"\n+ \"V8HbAq3G3dShfSwVwd0cJX0C+EVUuQE55MCEflCH6c4xm0OAHPYxQXucJYL/Jc/wBZuMhZPYZQ\"\n+ \"OTAtfejhhjXD5Cy7fOa4Bo/DvAAAAAElFTkSuQmCC\",\n    noEdit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf\"\n+ \"8/9hAAABJ0lEQVQ4jZXSP0sDMRzG8S/4B3RRa1dXoe2Z5HqiFRHcWtDV93Gcr0O6CIpT8U24dB\"\n+ \"BEreJQpO/ncZDW5AznGfgNucvz+SV3AUApbRnGskxk6fOfIcuuHB9qkahDQ44XdRnUBwwPapEs\"\n+ \"5iVEGStqcyhDL6iEfZ2yjFI+ldEMUA9Rwo4Mw0jdyfGILH053ufIKC80ygtVHWexxjH97thlIM\"\n+ \"ubMprzl6O8kPbYkuNZjrNyOAAC5IDt0qJNWZ5kOfefAwSAh0x+IRkb5XAc6LCqLgMZXtWh4Yc8\"\n+ \"bD0KyOFkGC52EkFkuZbhJA4Yekq59Y8T3YGlqAUEIcPNn9/AB4LwEWtyHCvlsvIvzIFYJ39U3Y\"\n+ \"NMhvuqcBmRZfYDXLAkw1iOaa2yzJRy9QVyXUUsviSJ/AAAAABJRU5ErkJggg==\"\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\"\n  }, \n  uiHelpers = {\n    label: \"Full name\"\n  };\n\nmyTmpl.link(\"#page\", data, uiHelpers);\n\n//Icon made by Gregor Cresnar: https://www.flaticon.com/authors/gregor-cresnar",
        "title": "Editable {{namebox}} using unlinked contextual parameter",
        "anchor": "namebox-unlinkededitable",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "The next example goes further in showing the use of 'regular' contextual parameters (not declared in `linkedCtxParam`). It is a `{{namebox}}` tag control which binds to a single string argument containing the *'full name'*:\n\n```jsr\n{^{namebox name}}\n```\n\n```js\nvar data = {name: \"Jo Blow\"}; \n```\nNevertheless, it provides separate textboxes for the first and last names.\n\nInternally, the tag control does not use the `linkedCtxParam` option at all. It has two separate contextual parameters for the first and last name: `~firstnm` and `~lastnm` (bound to the textboxes). In addition it has a `~fullnm()` contextual parameter, which is a [computed observable property](#computed) depending on `~firstnm` and `~lastnm`."
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
            "text": "Within the `init()` method a `fullName()` computed observable function is declared, and assigned to `~fullnm`:\n\n```js\n// Make fullName function a computed observable\nfunction fullName() {\n  return this.ctxPrm(\"firstnm\") + \" \" + this.ctxPrm(\"lastnm\");\n}\n// Make fullName depend on ~firstnm and ~lastnm (in the context of this tag), and assign setter\nfullName.depends = [this, \"~firstnm\", \"~lastnm\"];\nfullName.set = this.fullnmSetter;\n\n// Assign fullName function as computed ~fullnm() contextual parameter\nthis.ctxPrm(\"fullnm\", fullName); \n\n// Call ~fullnm setter to initialize from tag argument\nthis.fullnmSetter(tagCtx.args[0]);\n```\n\nTwo-way binding is established between `~fullnm()` and the tag control argument (`name`, in our example):\n \nFirst, changes to `~fullnm()` are bound back to the argument, by declaring an `updateName()` method, registered/unregistered in `onBind()` and `onUnbind()` as a handler for change events of `~fullnm()`. This method uses a `this.updateValue(...)` call to observably update the value of the argument.\n\n```js\nonBind: function(ev, eventArgs) {\n  // Register updateName() method as a handler for changes in ~fullnm()\n  $.observe(this, \"~fullnm\", this.updateName);\n},\nonUnbind: function(ev, eventArgs) {\n  // Unregister updateName() method as a handler for changes in ~fullnm()\n  $.unobserve(this, \"~fullnm\", this.updateName);\n},\n...\n// tag method - handler for ~fullnm change events\nupdateName: function(ev, eventArgs) {\n  ...\n  // Update the bound tag argument with new value of ~fullnm()\n  this.updateValue(this.ctxPrm(\"fullnm\")());\n  ...\n}\n```\n\nNext, the `onUpdate()` handler is used to respond to changes in the value of the argument (`name` in our example), and trigger a corresponding change to `~fullnm()`:\n\n```js\nonUpdate: function(ev, eventArgs, newTagCtxs) {\n  ...\n  this.ctxPrm(\"fullnm\", newTagCtxs[0].args[0]);\n  ...\n}\n```"
          }
        ],
        "header": "<style>\n.tb1 {border: 1px solid #bbb; padding: 8px; margin: 5px 20px; font-style: italic; display: inline-block;}\n</style>",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {^{namebox name class=\"tb1\"/}}\n\n  <input data-link=\"name\"/>\n</script>\n\n<div id=\"page\"></div>",
        "height": "70",
        "code": "$.views.tags({\nnamebox: {\n  dataBoundOnly: true,\n  template: '<div><input data-link=\"~firstnm\"/> <input data-link=\"~lastnm\"/></div>',\n  displayElement: \"div\",\n  init: function(tagCtx) {\n    // Make fullName function a computed observable\n    function fullName() {\n      return this.ctxPrm(\"firstnm\") + \" \" + this.ctxPrm(\"lastnm\");\n    }\n    // Make fullName depend on ~firstnm and ~lastnm (in the context of this tag)\n    fullName.depends = [this, \"~firstnm\", \"~lastnm\"];\n    fullName.set = this.fullnmSetter, // Assign the setter\n\n    // Assign fullName function as computed ~fullnm() contextual parameter\n    this.ctxPrm(\"fullnm\", fullName); \n\n    // Call ~fullnm setter to initialize from tag argument\n    this.fullnmSetter(tagCtx.args[0]);\n  },\n  onBind: function(ev, eventArgs) {\n    // Register updateName() method as a handler for changes in ~fullnm()\n    $.observe(this, \"~fullnm\", this.updateName);\n  },\n  onUnbind: function(ev, eventArgs) {\n    // Unregister updateName() method as a handler for changes in ~fullnm()\n    $.unobserve(this, \"~fullnm\", this.updateName);\n  },\n  onUpdate: function(ev, eventArgs, newTagCtxs) {\n    if (!this.updating) {\n      // If tag argument changes, (and if change is from tag control\n      // updating itself) update ~fullnm() with the new value\n      this.ctxPrm(\"fullnm\", newTagCtxs[0].args[0]);\n    }\n    return false;\n  },\n  // tag method - setter for computed ~fullnm()\n  fullnmSetter: function(val) {\n    val = val.split(\" \");\n    this.ctxPrm(\"lastnm\", val.pop());\n    this.ctxPrm(\"firstnm\", val.join(\" \"));\n  },\n  // tag method - handler for ~fullnm change events\n  updateName: function(ev, eventArgs) {\n    this.updating = true;\n    // Update the bound tag argument with new value of ~fullnm()\n    this.updateValue(this.ctxPrm(\"fullnm\")());\n    this.updating = false;\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    name: \"Jo Blow\"\n  }; \n\nmyTmpl.link(\"#page\", data);",
        "title": "{{namebox}} with computed contextual parameter",
        "anchor": "namebox-computed",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "Programmatic two-way data-binding: setValue() and updateValue() ",
        "text": "The sections above show patterns for two-way data-binding of tag controls, using linked elements, and linked contextual parameters.\n\nThis section will show a pattern using a more generic programmatic approach to two-way data-binding of tag controls, particularly for cases where the data-binding does *not* correspond to data-linked form elements such as `<input>` or `<select>`.\n\nThe pattern is as follows:\n\n- The [`bindTo`](#tagoptions@bindto) option specifies the tag arguments or properties which have two-way data-binding. (If `bindTo` is not set, the default behavior will be to bind to the first argument -- as if the setting was `bindTo: 0`) \n- Whenever a bound argument or property changes, the [`setValue()`](#tagoptions@setvalue) event handler method is called, with the updated value. The tag control uses the code in `setValue()` to respond appropriately to the changed value.\n- The tag control uses calls to [`updateValue()`](#jsvtagobject@updatevalue) to drive changes in the bound arguments or properties -- for example, in response to user actions via the tag control UI.\n- Programmatically calling [`tag.setValue(...)`](#jsvtagobject@setvalue) with a value will first call the tag's `setValue(...)` event handler (if there is one). Next, if the value (or the value returned by the handler if there is one) is not `undefined`, and if there are [linked elements](#bindingpatterns@linkedelem), it will set the value on the appropriate linked element.\n\nThus, `setValue()` and `updateValue()` play symmetric roles:\n\n- [`setValue()`](#jsvtagobject@setvalue) is used to change the tag control in response to external changes in the data-linked data.\n- [`updateValue()`](#jsvtagobject@updatevalue) is used by the tag control to trigger external changes in the data-linked data\n\nThis design pattern is illustrated by the next sample -- a *slider* tag control, as well as the following sample -- a modified *tabs* control.",
        "anchor": "setvalue-updatevalue"
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
            "text": "```jsrt\n{^{slider amount min=360 max=0 .../}}\n```\n\n```js\nslider: {\n  ...\n  // Movable slider handle, within slider box\n  template: '<div class=\"box\"><div class=\"handle\"></div></div>',\n\n  onBind: function(tagCtx) {\n    ...\n    // Register handler for mouse click or start of drag\n    tagCtx.mainElem.on(\"mousedown touchstart\", function(ev) {\n      ...\n      tag.moveTo(newVal); // User click in box: move handle to clicked position\n\n      // Register handler for mousemove during drag\n      $(document).on(\"mousemove touchmove\", function(ev2) {\n        ...\n        tag.moveTo(newVal); // User mousemove - sliding handle: move handle to new position\n    ...\n  },\n  ...\n  setValue: function(x) {\n    // Move the handle to the new position x\n    ...\n    tagCtx.handle.offset({left: ...});\n  },\n\n  moveTo: function(x) {\n    // Call setValue() to move the handle to position x\n    this.setValue(x);\n    // Call updateValue() to change the external data-linked data to the new value x\n    this.updateValue(x, true); // Async update\n  },\n  ...\n}\n```\n\n"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {^{slider amount min=360 max=0 class=\"slider1\"/}}\n  <input data-link=\"amount\"/>\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\nslider: {\n  setSize: true,\n  mainElement: \".box\",\n\n  // Movable slider handle, within slider box\n  template: '<div class=\"box\"><div class=\"handle\"></div></div>',\n\n  init: function(tagCtx) {\n    // Define handler specific to this slider, to be used for end of drag\n    this.mouseMoveOff = function() {\n      $(document).off(\"mousemove touchmove\");\n    };\n  },\n\n  onBind: function(tagCtx) {\n    var tag = this,\n      min = tagCtx.props.min,\n      max = tagCtx.props.max;\n    tagCtx.handle = tagCtx.mainElem.find(\".handle\").first();\n\n    // Register handler for mouse click or start of drag\n    tagCtx.mainElem.on(\"mousedown touchstart\", function(ev) {\n      var newVal;\n      function valFromPosition(newX) {\n        newVal = clamp(\n          round(min + (newX - tagCtx.metrics.left)/tagCtx.metrics.scale),\n          min, max);\n      }\n      valFromPosition(ev.clientX);\n      // User click in box: move handle to clicked position\n      tag.moveTo(newVal);\n\n      // Register handler for mousemove during drag\n      $(document).on(\"mousemove touchmove\", function(ev2) {\n        valFromPosition(ev2.clientX);\n        if (newVal !== tagCtx.val) {\n          tagCtx.val = newVal;\n          // User mousemove - sliding handle: move handle to new position\n          tag.moveTo(newVal);\n        }\n        ev.preventDefault();\n      });\n      ev.preventDefault();\n    });\n\n    // Register slider-specific handler for end of drag\n    $(document).on(\"mouseup touchend\", this.mouseMoveOff);\n  },\n\n  onUnbind: function(tagCtx, linkCtx, ctx, ev, eventArgs) {\n    // Remove handler for end of drag specific to this slider\n    $(document).off(\"mouseup touchend\", this.mouseMoveOff);\n  },\n\n  onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {\n    if (!eventArgs) {\n      // We set metrics here, after initial linking. This event is preceded by\n      // 1) onBind event 2) setting of Width and height of mainElem\n      this.setMetrics(tagCtx); \n    }\n  },\n  onUpdate: false,\n\n  setValue: function(x) {\n    // Move the handle to the new position x\n    var tagCtx = this.tagCtx,\n      min = tagCtx.props.min,\n      max = tagCtx.props.max,\n      metrics = tagCtx.metrics;\n    x = clamp(x, min, max);\n    tagCtx.handle.offset({left: (x-min)*metrics.scale + metrics.left - metrics.handleWidth});\n  },\n\n  moveTo: function(x) {\n    // Call setValue() to move the handle to position x\n    this.setValue(x);\n    // Call updateValue() to change the external data-linked data to the new value x\n    this.updateValue(x, true); // Async update\n  },\n\n  setMetrics: function(tagCtx) {\n    var box = tagCtx.mainElem;\n    tagCtx.metrics = {\n      left: box.offset().left,\n      width: box.width(),\n      scale: box.width()/(tagCtx.props.max-tagCtx.props.min),\n      handleWidth: tagCtx.handle.width()/2\n    };\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {amount: 200};\n\nmyTmpl.link(\"#page\", data);\n\nfunction round(val) {\n  return Math.round(100*val)/100;\n}\n\nfunction clamp(num, min, max) {\n  return min>max\n    ? num <= max ? max : num >= min ? min : num\n    : num <= min ? min : num >= max ? max : num;\n}",
        "header": "<style>\ninput {width: 154px; margin: 0 10px;}\n.slider1 {width: 154px; height: 11px; border-radius: 2px; background: #eee; border: #999 solid 1px; margin: 15px 0 10px 10px;}\n.slider1 .handle {cursor: pointer; width: 11px; height: 11px; margin-top: -1px; border: 1px solid rgba(0, 0, 0, 0.5);\n  border-radius: 11px; background: #fafafa; box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);}\n</style>\n",
        "height": "80",
        "nocss": true,
        "title": "{{slider}} using setValue() / updateValue()",
        "anchor": "slider-setvalue-updatevalue"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Similarly we can also convert our `{{tabs}}` control [above](#bindingpatterns@tabsctxprm) to use this `setValue()`/`updateValue()` pattern:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/tabs/tabs2.js",
            "label": "tabs2.js"
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
            "text": "```js\ntabs: {\n  bindTo: \"pane\",\n  linkedCtxParam: \"pane\",\n  ctx: {pane: 0}, // Default value for ~pane\n  ...\n  setTab: function(index) {\n    // Update tag.pane, and update external data through two-way binding\n    this.ctxPrm(\"pane\", index);\n  }\n}\n```"
          }
        ],
        "title": "{{tabs}} using setValue() / updateValue()",
        "url": "samples/tag-controls/tabs/sample2",
        "height": "200",
        "anchor": "tabs-setvalue-updatevalue"
      },
      {
        "_type": "para",
        "title": "Multiple two-way binding to args or props",
        "text": "Tag controls can have two-way binding to multiple arguments or properties. The following `{{areaslider}}` sample is a two-dimensional version of the `{{slider}}` tag control above.\n\nIt has `bindTo: [0, 1]` specifying two-way binding to the first and second argument:\n\n```jsr\n{^{areaslider x y .../}}\n```\n\nIn the `moveTo()` method, it uses the [`setValues(x, y)`](#jsvtagobject@setvalues) and [`updateValues(x, y)`](#jsvtagobject@updatevalues) tag methods in order to pass multiple values, rather than using the single-value versions [`setValue()`](#jsvtagobject@setvalue) and [`updateValue()`](#jsvtagobject@updatevalue).\n\nThe example has two instances of the `{{areaslider}}` bound to the same data values, `x`, and `y`, but with different 'range' settings (`xMin` etc.). This shows clearly the two-way binding...\n",
        "anchor": "multiple-twoway"
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
            "text": "```jsr\n{^{areaslider x y xMin=0 xMax=100 yMin=0 yMax=50 .../}}\n{^{areaslider x y xMin=100 xMax=0 yMin=0 yMax=50 .../}}\n```\n\n```js\nareaslider: {\n  bindTo: [0, 1],\n  ...\n\n  // Movable slider handle, within slider box\n  template: '<div class=\"box\"><div class=\"handle\"></div></div>',\n\n  onBind: function(tagCtx) {\n    ...\n    // Register handler for mouse click or start of drag\n    tagCtx.mainElem.on(\"mousedown touchstart\", function(ev) {\n      ...\n      tag.moveTo(newXVal, newYVal); // User click in box: move handle to clicked position\n\n      // Register handler for mousemove during drag\n      $(document).on(\"mousemove touchmove\", function(ev2) {\n        ...\n        tag.moveTo(newXVal, newYVal); // User mousemove - sliding handle: move handle to new position\n    ...\n  },\n  ...\n  setValue: function(val, index) {\n    // Move the handle to the new x-position or y-position\n    ...\n    if (index) { // Change in y-position\n      ...\n      tagCtx.handle.offset({top:...});\n    } else { // Change in x-position\n      ...\n      tagCtx.handle.offset({left:...});\n  },\n\n  moveTo: function(x, y) {\n    // Call setValues() to move the handle to new (x, y) position\n    this.setValues(x, y);\n    // Call updateValues() to change the external data-linked data to the new values (x, y)\n    this.updateValues(x, y, true); // Async update\n  },\n  ...\n}\n```"
          }
        ],
        "header": "<style>\ninput {width: 154px; margin-top: 10px;}\n.slider1 {width: 154px; height: 50px; border-radius: 2px; background: #eee; border: #999 solid 1px; margin: 10px; float: left;}\n.slider1 .handle {cursor: pointer; width: 11px; height: 11px; border: 1px solid rgba(0, 0, 0, 0.5);\n  border-radius: 11px; background: #fafafa; box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2); }\n</style>\n",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {^{areaslider x y xMin=0 xMax=100 yMin=0 yMax=50 class=\"slider1\"/}}\n  {^{areaslider x y xMin=100 xMax=0 yMin=0 yMax=50 class=\"slider1\"/}}\n  <input data-link=\"x\"/><br/>\n  <input data-link=\"y\"/>\n</script>\n\n<div id=\"page\"></div>\n",
        "code": "$.views.tags({\nareaslider: {\n  bindTo: [0, 1],\n  setSize: true,\n  mainElement: \".box\",\n\n  // Movable slider handle, within slider box\n  template: '<div class=\"box\"><div class=\"handle\"></div></div>',\n\n  init: function(tagCtx) {\n    // Define handler specific to this slider, to be used for end of drag\n    this.mouseMoveOff = function() {\n      $(document).off(\"mousemove touchmove\");\n    };\n  },\n\n  onBind: function(tagCtx) {\n    var tag = this,\n      xMin = tagCtx.props.xMin,\n      xMax = tagCtx.props.xMax,\n      yMin = tagCtx.props.yMin,\n      yMax = tagCtx.props.yMax;\n    tagCtx.handle = tagCtx.mainElem.find(\".handle\").first();\n\n    // Register handler for mouse click or start of drag\n    tagCtx.mainElem.on(\"mousedown touchstart\", function(ev) {\n      var newXVal, newYVal;\n      function valFromPosition(newX, newY) {\n        newXVal = clamp(\n          round(xMin + (newX - tagCtx.metrics.left)/tagCtx.metrics.xScale),\n          xMin, xMax);\n        newYVal = clamp(\n          round(yMin + (newY - tagCtx.metrics.top)/tagCtx.metrics.yScale),\n          yMin, yMax);\n      }\n      valFromPosition(ev.clientX, ev.clientY);\n      // User click in box: move handle to clicked position\n      tag.moveTo(newXVal, newYVal);\n\n      // Register handler for mousemove during drag\n      $(document).on(\"mousemove touchmove\", function(ev2) {\n        valFromPosition(ev2.clientX, ev2.clientY);\n        if (newXVal !== tagCtx.xVal || newYVal !== tagCtx.yVal) {\n          tagCtx.xVal = newXVal;\n          tagCtx.yVal = newYVal;\n          // User mousemove - sliding handle: move handle to new position\n          tag.moveTo(newXVal, newYVal);\n        }\n        ev.preventDefault();\n      });\n      ev.preventDefault();\n    });\n\n    // Register slider-specific handler for end of drag\n    $(document).on(\"mouseup touchend\", this.mouseMoveOff);\n  },\n\n  onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {\n    if (!eventArgs) {\n      this.setMetrics(tagCtx);\n    }\n  },\n  onUpdate: false,\n\n  setValue: function(val, index) {\n    // Move the handle to the new x-position or y-position\n    var tagCtx = this.tagCtx,\n      xMin = tagCtx.props.xMin,\n      xMax = tagCtx.props.xMax,\n      yMin = tagCtx.props.yMin,\n      yMax = tagCtx.props.yMax;\n      metrics = tagCtx.metrics;\n    if (index) { // Change in y-position\n      val = clamp(val, yMin, yMax);\n      tagCtx.handle.offset({top: (val-yMin)*metrics.yScale + metrics.top - metrics.handleHeight});\n    } else { // Change in x-position\n      val = clamp(val, xMin, xMax);\n      tagCtx.handle.offset({left: (val-xMin)*metrics.xScale + metrics.left - metrics.handleWidth});\n    }\n  },\n\n  moveTo: function(x, y) {\n    // Call setValues() to move the handle to new (x, y) position\n    this.setValues(x, y);\n    // Call updateValues() to change the external data-linked data to the new values (x, y)\n    this.updateValues(x, y, true); // Async update\n  },\n\n  setMetrics: function(tagCtx) {\n    var box = tagCtx.mainElem,\n      boxOffset = box.offset();\n    tagCtx.metrics = {\n      left: boxOffset.left,\n      top: boxOffset.top,\n      xScale: box.width()/(tagCtx.props.xMax - tagCtx.props.xMin),\n      yScale: box.height()/(tagCtx.props.yMax - tagCtx.props.yMin),\n      handleWidth: tagCtx.handle.width()/2,\n      handleHeight: tagCtx.handle.height()/2\n    };\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {x: 30, y: 10};\n\nmyTmpl.link(\"#page\", data);\n\nfunction round(val) {\n  return Math.round(100*val)/100;\n}\nfunction clamp(num, min, max) {\n  return min>max\n    ? num <= max ? max : num >= min ? min : num\n    : num <= min ? min : num >= max ? max : num;\n}",
        "height": "90",
        "nocss": true,
        "title": "{{areaslider}}",
        "anchor": "areaslider"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For more advanced examples of using [`setValue()`](#jsvtagobject@setvalue) and [`updateValue()`](#jsvtagobject@updatevalue), see the  [color picker](#hierarchypatterns@picker), and the [multi-format color picker](#hierarchypatterns@picker-multi)."
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "renderingpatterns",
            "label": "Layout and rendering design patterns"
          },
          {
            "_type": "topic",
            "hash": "hierarchypatterns",
            "label": "Tag hierarchy design patterns"
          }
        ]
      }
    ]
  },
  "hierarchypatterns": {
    "title": "JsViews tag controls: Tag hierarchy design patterns",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This topic shows common tag control design patterns involving tag composition and tag hierarchy:\n\n- [Composite controls](#hierarchypatterns@composite)\n- [Converters](#hierarchypatterns@converters)\n\nFor other categories of tag control design pattern, see *[Layout and rendering design patterns](#renderingpatterns)* and *[Data binding design patterns](#bindingpatterns)*.\n"
      },
      {
        "_type": "para",
        "title": "Composite controls",
        "text": "A very common pattern with custom tags (in JsRender) and tag controls (in JsViews) is for the custom tag to include other custom tags, combined together as a composite tag.\n\nFor example here is a custom `{{onoff}}` tag control which behaves like a regular checkbox, but which lets you specify images (icons) for the on and off states of the button:",
        "anchor": "composite"
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
            "text": "*Template:*\n\n```jsr\n{^{onoff edit onsrc=~iconEdit offsrc=~iconNoEdit ... /}}\n{^{onoff edit onsrc=~iconNoSel offsrc=~iconSel ... /}}\n<input data-link=\"edit\" type=\"checkbox\"/>\n```\n\n*Custom tag declaration:*\n```js\n$.views.tags({\nonoff: {\n  ...\n  template: '<img data-link=\"'\n    + '{on ~tag.toggle'} // OnClick handler call toggle method\n    + 'src{:~on ? ~tagCtx.props.offsrc : ~tagCtx.props.onsrc} '// src for icon depends on boolean contextual parameter \"~on\"\n  + '\" />',\n  linkedCtxParam: \"on\", // Boolean contextual parameter bound to data\n  ...\n  toggle: function() { // toggle method\n    this.ctxPrm(\"on\", !this.ctxPrm(\"on\"));\n  }\n}});\n```"
          }
        ],
        "height": "40",
        "header": "<style>\n.onoff1 {margin: 0 50px 0 15px; cursor: pointer;}\n.onoff2 {margin: 0 50px 0 0; cursor: pointer;}\ninput {cursor: pointer;}\n</style>\n",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {^{onoff edit onsrc=~iconEdit offsrc=~iconNoEdit class='onoff1' /}}\n  {^{onoff edit onsrc=~iconNoSel offsrc=~iconSel class='onoff2'/}}\n  <input data-link=\"edit\" type=\"checkbox\"/>\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\nonoff: {\n  dataBoundOnly: true,\n  template: '<img data-link=\"{on ~tag.toggle} src{:~on ? ~tagCtx.props.offsrc : ~tagCtx.props.onsrc}\" />',\n  linkedCtxParam: \"on\",\n  displayElement: \"img\",\n  toggle: function() {\n    this.ctxPrm(\"on\", !this.ctxPrm(\"on\"));\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    edit: false\n  },\n  uiHelpers = {\n    iconEdit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8\"\n+ \"/9hAAAA4UlEQVQ4jZXTvUpDMRgG4Eesgi5adXV1EAdBwYI4e0Q3dwcXd70O6VKoODqJN+DiIP\"\n+ \"hXRbRIL8ghDcTDOZ7mhQ+SkDzkhxCyjgcMsC8za/jEBpbwiiIHuB8vjikjM9hBp1TbaMEPVkp\"\n+ \"oiqyiW1HXeCSc+aMBqcswNgq8VyBtvOCwCUiR5dKkRTzhqAmIyKACWcAzDpqA2THyJtxBmja+M\"\n+ \"V8HbAq3G3dShfSwVwd0cJX0C+EVUuQE55MCEflCH6c4xm0OAHPYxQXucJYL/Jc/wBZuMhZPYZQ\"\n+ \"OTAtfejhhjXD5Cy7fOa4Bo/DvAAAAAElFTkSuQmCC\",\n      iconNoEdit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf\"\n+ \"8/9hAAABJ0lEQVQ4jZXSP0sDMRzG8S/4B3RRa1dXoe2Z5HqiFRHcWtDV93Gcr0O6CIpT8U24dB\"\n+ \"BEreJQpO/ncZDW5AznGfgNucvz+SV3AUApbRnGskxk6fOfIcuuHB9qkahDQ44XdRnUBwwPapEs\"\n+ \"5iVEGStqcyhDL6iEfZ2yjFI+ldEMUA9Rwo4Mw0jdyfGILH053ufIKC80ygtVHWexxjH97thlIM\"\n+ \"ubMprzl6O8kPbYkuNZjrNyOAAC5IDt0qJNWZ5kOfefAwSAh0x+IRkb5XAc6LCqLgMZXtWh4Yc8\"\n+ \"bD0KyOFkGC52EkFkuZbhJA4Yekq59Y8T3YGlqAUEIcPNn9/AB4LwEWtyHCvlsvIvzIFYJ39U3Y\"\n+ \"NMhvuqcBmRZfYDXLAkw1iOaa2yzJRy9QVyXUUsviSJ/AAAAABJRU5ErkJggg==\",\n      iconNoSel: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8\"\n+ \"/9hAAAAXklEQVQ4je3ToRGAMBBE0dcHNoWkDBqIpxfKQtIEOhYBgmQGB0yQ+TPr9q+64yJgRs\"\n+ \"bxkFy6wY0VCxLGh6TSXascsWPwnqE4ESZsH+TKVtw+0Af+GYgaT5nGZ6LhnU94YkRZoAhnWgA\"\n+ \"AAABJRU5ErkJggg==\",\n      iconSel: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/\"\n+ \"9hAAAAxklEQVQ4ja3TP0qDMRjH8Q8IggrtWjfXokNHj9A/OnoCly4eQFrv4hl6ACmFQudOHb1\"\n+ \"A9zqILgk8vKQ1L/jAD5In+X5JIIE+phV5xrlC7fFTmafAddCTFhYY/JHbAN/gE8sseC8d7Uhl\"\n+ \"+IBhW0GER7mZBWe4x0UbOAq6afyByxPwuGmOV3hN8yWuGvAXJqn3gnlJALPUW+EuwA9hzwa7Y\"\n+ \"wJ4S/3vAlwlkI64x2NhrUpwqv5fUPOUY7ZR0OYzxayzoPY7N3MNvyKdYTRQV8pRAAAAAElFTk\"\n+ \"SuQmCC\"\n   };\n\nmyTmpl.link(\"#page\", data, uiHelpers);",
        "nocss": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now we'll take the [*Editable `{{namebox}}`*](#bindingpatterns@namebox-editable) sample (from the [*Data binding design patterns*](#bindingpatterns) topic) and convert it to be a composite tag incorporating the `{{onoff}}` tag as a component. \n\nThe template option in the `{{namebox}}` tag definition uses `{{onoff}}` bound to the internal `~edt` contextual parameter:\n\n```jsr\n{^{onoff ~edt onsrc=~tag.icons.edit offsrc=~tag.icons.noEdit ... /}}\n```\n\nIn this sample we also use the `{{onoff}}` tag control separately from `{{namebox}}`, bound to the boolean `edit` data."
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
            "text": "*nameboxTmpl:*\n\n```jsr\n...\n  {^{onoff ~edt onsrc=~tag.icons.edit offsrc=~tag.icons.noEdit ... /}}\n  <span data-link=\"~cptn\"></span>:\n  {^{if ~edt}}\n    <input data-link='~frst'/> <input data-link='~lst'/>\n  {{else}}\n    {^{:~frst}} {^{:~lst}}\n  {{/if}}\n...\n```\n\n*Template:*\n\n```jsr\n{^{namebox first last caption=~fullName editable=edit ... /}}\n...\nEditable: {^{onoff edit onsrc=... offsrc=... /}}\n```\n\n*Custom tag declarations:*\n\n```js\n$.views.tags({\n  onoff: {...},\n  namebox: {\n    ...\n    template: \"#nameboxTmpl\",\n    bindTo: [0, 1, \"caption\", \"editable\"],\n    linkedCtxParam: [\"frst\", \"lst\", \"cptn\", \"edt\"],\n    ...\n    icons: {edit: \"...\", noEdit: \"...\"}\n  }\n});\n```",
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "paragraph"
              }
            ]
          }
        ],
        "header": "<style>\n.tb1 {border: 1px solid #bbb; padding: 8px 8px 10px 8px; margin: 5px 20px; display: inline-block; height: 20px; font-style: normal; }\n.tb1 span, label {font-style: italic;} \n.tb1 img {margin-right: 6px; margin-top: 1px;}\n.onoff1 {margin: 0 4px -3px 4px;}\n.left, label {margin: 5px 20px;}\nimg {width: 16px; height: 16px; cursor: pointer;}\n</style>",
        "html": "<script id=\"nameboxTmpl\" type=\"text/x-jsrender\">\n<label>\n  {^{onoff ~edt onsrc=~tag.icons.edit offsrc=~tag.icons.noEdit class='onoff' /}}\n  <span data-link=\"~cptn\"></span>:\n  {^{if ~edt}}\n    <input data-link='~frst'/> <input data-link='~lst'/>\n  {{else}}\n    {^{>~frst}} {^{>~lst}}\n  {{/if}}\n</label>\n</script>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{^{namebox first last caption=~fullName editable=edit class=\"tb1\"/}}<br/>\n\n<input data-link=\"~fullName\" class=\"left\"/>\n<input data-link=\"first\"/>\n<input data-link=\"last\"/>\n<label> Editable: {^{onoff edit onsrc=~iconNoSel offsrc=~iconSel class='onoff1'/}}</label>\n</script>\n\n<div id=\"page\"></div>",
        "nocss": true,
        "code": "$.views.tags({\nonoff: {\n  dataBoundOnly: true,\n  template: '<img data-link=\"{on ~tag.toggle} src{:~on ? ~tagCtx.props.offsrc : ~tagCtx.props.onsrc}\" />',\n  linkedCtxParam: \"on\",\n  displayElement: \"img\",\n  toggle: function() {\n    this.ctxPrm(\"on\", !this.ctxPrm(\"on\"));\n  }\n},\nnamebox: {\n  dataBoundOnly: true,\n  template: \"#nameboxTmpl\",\n  bindTo: [0, 1, \"caption\", \"editable\"],\n  linkedCtxParam: [\"frst\", \"lst\", \"cptn\", \"edt\"],\n  displayElement: \"label\",\n  onUpdate: false,\n  icons: {\n    edit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8\"\n+ \"/9hAAAA4UlEQVQ4jZXTvUpDMRgG4Eesgi5adXV1EAdBwYI4e0Q3dwcXd70O6VKoODqJN+DiIP\"\n+ \"hXRbRIL8ghDcTDOZ7mhQ+SkDzkhxCyjgcMsC8za/jEBpbwiiIHuB8vjikjM9hBp1TbaMEPVkp\"\n+ \"oiqyiW1HXeCSc+aMBqcswNgq8VyBtvOCwCUiR5dKkRTzhqAmIyKACWcAzDpqA2THyJtxBmja+M\"\n+ \"V8HbAq3G3dShfSwVwd0cJX0C+EVUuQE55MCEflCH6c4xm0OAHPYxQXucJYL/Jc/wBZuMhZPYZQ\"\n+ \"OTAtfejhhjXD5Cy7fOa4Bo/DvAAAAAElFTkSuQmCC\",\n    noEdit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf\"\n+ \"8/9hAAABJ0lEQVQ4jZXSP0sDMRzG8S/4B3RRa1dXoe2Z5HqiFRHcWtDV93Gcr0O6CIpT8U24dB\"\n+ \"BEreJQpO/ncZDW5AznGfgNucvz+SV3AUApbRnGskxk6fOfIcuuHB9qkahDQ44XdRnUBwwPapEs\"\n+ \"5iVEGStqcyhDL6iEfZ2yjFI+ldEMUA9Rwo4Mw0jdyfGILH053ufIKC80ygtVHWexxjH97thlIM\"\n+ \"ubMprzl6O8kPbYkuNZjrNyOAAC5IDt0qJNWZ5kOfefAwSAh0x+IRkb5XAc6LCqLgMZXtWh4Yc8\"\n+ \"bD0KyOFkGC52EkFkuZbhJA4Yekq59Y8T3YGlqAUEIcPNn9/AB4LwEWtyHCvlsvIvzIFYJ39U3Y\"\n+ \"NMhvuqcBmRZfYDXLAkw1iOaa2yzJRy9QVyXUUsviSJ/AAAAABJRU5ErkJggg==\"\n    }\n  }\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\",\n    edit: false\n  }, \n  uiHelpers = {\n    fullName: \"Full name\",\n    iconNoSel: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8\"\n+ \"/9hAAAAXklEQVQ4je3ToRGAMBBE0dcHNoWkDBqIpxfKQtIEOhYBgmQGB0yQ+TPr9q+64yJgRs\"\n+ \"bxkFy6wY0VCxLGh6TSXascsWPwnqE4ESZsH+TKVtw+0Af+GYgaT5nGZ6LhnU94YkRZoAhnWgA\"\n+ \"AAABJRU5ErkJggg==\",\n    iconSel: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/\"\n+ \"9hAAAAxklEQVQ4ja3TP0qDMRjH8Q8IggrtWjfXokNHj9A/OnoCly4eQFrv4hl6ACmFQudOHb1\"\n+ \"A9zqILgk8vKQ1L/jAD5In+X5JIIE+phV5xrlC7fFTmafAddCTFhYY/JHbAN/gE8sseC8d7Uhl\"\n+ \"+IBhW0GER7mZBWe4x0UbOAq6afyByxPwuGmOV3hN8yWuGvAXJqn3gnlJALPUW+EuwA9hzwa7Y\"\n+ \"wJ4S/3vAlwlkI64x2NhrUpwqv5fUPOUY7ZR0OYzxayzoPY7N3MNvyKdYTRQV8pRAAAAAElFTk\"\n+ \"SuQmCC\"\n  };\n\nmyTmpl.link(\"#page\", data, uiHelpers);",
        "height": "102",
        "title": "The {{namebox}} composite control",
        "anchor": "namebox",
        "action": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "Our next sample is a much richer tag control: `{{picker}}` -- a color picker tag control based on the Chrome devtools color picker (which itself is based on the [Spectrum](https://bgrins.github.io/spectrum/) color picker).\n\nOur `{{picker}}` (which uses helper functions from [tinycolor.js](https://github.com/bgrins/TinyColor)) is a composite control which incorporates the following tag controls:\n\n- [slider](#samples/tag-controls/slider)\n- [areaslider](#samples/tag-controls/areaslider)\n- [spinblock](#samples/tag-controls/spinblock)\n\nIt is available at [www.jsviews.com/download/sample-tag-controls/colorpicker/colorpicker.js](download/sample-tag-controls/colorpicker/colorpicker.js).\n\nThe `{{picker}}` template is as follows:\n\n```js\n{^{areaslider ~s ~v xMin=0 xMax=1 yMin=1 yMax=0 width=\"100%\" convert=~cvt convertBack=~cbk}}\n  <div ... data-link=\"css-background-color{rgb:~h 100 100}\">\n    <div class=\"...\">\n      <div class=\"dragger\" data-link=\"css-background-color{rgb:~h ~s ~v}\"></div>\n    </div>\n  </div>\n{{/areaslider}}\n<span class=\"swatch\">\n  <span ... data-link=\"css-background-color{rgba:~h ~s ~v ~a}\"></span>\n</span>\n{^{slider ~h min=360 max=0 class=\"hue\"/}}\n{^{slider ~a min=0 max=1}}\n  <div class=\"...\">\n    <div class=\"handle\"></div>\n    <div class=\"alpha-background\" data-link=\"css-background-image{rgbGrad:~h ~s ~v}\"></div>\n  </div>\n{{/slider}}\n{^{spinblock}}\n  <div ...>\n    <input ... data-link=\"{hex:~h ~s ~v ~a:fromhex}\"/>\n    <div ...>HEX</div>\n  </div>\n{{else}}\n  ...\n{{else}}\n  ...\n{{/spinblock}}\n```\n\nIn the `onBind()` handler, tag properties are set pointing to each of the component tag controls:\n\n```js\nonBind: function() {\n  // Provide reference vars to access component controls\n  var tag = this,\n    sliders = tag.childTags(\"slider\");\n  tag.hueslider = sliders[0];\n  tag.alphaslider = sliders[1];\n  tag.areaslider = tag.childTags(\"areaslider\")[0];\n}\n```\n\nThen in the initial call to `onAfterLink()` (for which `eventArgs` is undefined), the metrics of each component control are updated:\n\n```js\nonAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {\n  if (!eventArgs) {\n    // Update the UI width height and position metrics for each component control\n    var tag = this;\n    tag.hueslider.setMetrics();\n    tag.alphaslider.setMetrics();\n    tag.areaslider.setMetrics();\n  }\n}\n```\n\nThe `{{picker}}` control uses the HSVA color format, with the four color values binding to arguments 0, 1, 2 and 3:\n\n```js\nbindTo: [0, 1, 2, 3],\nlinkedCtxParam: [\"h\", \"s\", \"v\", \"a\"],\n```",
        "anchor": "colorpicker"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/colorpicker/colorpicker.js",
            "label": "colorpicker.js"
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
            "text": "```jsr\n{^{picker color.h color.s color.v color.a ... /}}\n\n<div ... data-link=\"css-background-color{rgba:color.h color.s color.v color.a}\">\n  {^{rgba:color.h color.s color.v color.a}} ...\n  {^{hex:color.h color.s color.v color.a}}\n</div>\n\n<div ...>\n  h: <input data-link=\"color.h\"/>\n  ...\n</div>\n```"
          }
        ],
        "url": "samples/tag-controls/colorpicker/colorpicker",
        "height": "280",
        "jsrJsvJqui": "",
        "title": "The {{picker}} composite control",
        "anchor": "picker"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For variants of the `{{picker}}` color picker control, see also the [*Multi-format {{picker}} control*](#hierarchypatterns@picker-multi) below, as well as alternatives shown in the [color picker samples](#samples/tag-controls/colorpicker) topic."
      },
      {
        "_type": "para",
        "title": "Converters",
        "text": "A custom tag can use converters. (See [*Using converters with other tags*](#converters@othertags) and [*Two-way binding: convert and convert back*](#link2way@converters).)\n\nConverters can be specified on tag instances: `{^{mytag convert=... convertBack=... ... /}}` or as [convert](#tagoptions@convert) and [convertBack](#tagoptions@convertback) tag options. \n\nIf a custom tag has a [`bindTo`](#tagoptions@bindto) option which is an array (specifying binding to multiple arguments or properties) then convert and convertBack receive multiple arguments and return arrays.\n\nThe next sample shows a `{{namebox}}` tag which has built-in convert/convertBack option settings that swap the first and last names if the `reverse` property is `true`.\n\nHere is the `{{namebox}}` tag definition:\n\n```js\nbindTo: [0, 1],\nlinkedElement: [\".firstnm\", \".lastnm\"],\n...\ntemplate:\n  '<div>' +\n    '<span data-link=\"~tagCtx.props.caption\"></span>: ' +\n    '<input class=\"firstnm\"/> ' +\n    '<input class=\"lastnm\"/>' +\n  '</div>',\n\nconvert: function(first, last) {\n  // Swap arguments if props.reverse is true\n  return this.tagCtx.props.reverse ? [last, first] : [first, last];\n},\n\nconvertBack: function(first, last) {\n  // If arguments were swapped, (i.e. if props.reverse true) swap them back again\n  return this.tagCtx.props.reverse ? [last, first] : [first, last];\n}\n```",
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
            "text": "```jsr\n{^{namebox first last caption=\"First/Last\" ... /}}\n{^{namebox first last caption=\"Last/First\" reverse=true ... /}}\n\n<div ... >\n  <input data-link=\"first\"/>\n  <input data-link=\"last\"/>\n</div>\n</script>\n```\n\n"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{^{namebox first last caption=\"First/Last\" class=\"tb1\"/}}\n{^{namebox first last caption=\"Last/First\" reverse=true class=\"tb1\"/}}\n\n<div class=\"left\">\n  <input data-link=\"first\"/>\n  <input data-link=\"last\"/>\n</div>\n</script>\n\n<div id=\"page\"></div>\n",
        "code": "$.views.tags({\nnamebox: {\n  dataBoundOnly: true,\n  bindTo: [0, 1],\n  linkedElement: [\".firstnm\", \".lastnm\"],\n  displayElement: \"div\",\n  onUpdate: false,\n\n  template:\n    '<div>' +\n      '<span data-link=\"~tagCtx.props.caption\"></span>: ' +\n      '<input class=\"firstnm\"/> ' +\n      '<input class=\"lastnm\"/>' +\n    '</div>',\n\n  convert: function(first, last) {\n    // Swap arguments if props.reverse is true\n    return this.tagCtx.props.reverse ? [last, first] : [first, last];\n  },\n\n  convertBack: function(first, last) {\n    // If arguments were swapped, (i.e. if props.reverse true) swap them back again\n    return this.tagCtx.props.reverse ? [last, first] : [first, last];\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\"\n  };\n\nmyTmpl.link(\"#page\", data);",
        "nocss": true,
        "header": "<style>\n.tb1 {border: 1px solid #bbb; padding: 8px 8px 10px 8px; margin: 5px 20px; display: inline-block; height: 20px; font-style: normal;}\n.tb1 span {font-style: italic;} \n.left {margin: 15px 20px;}\n</style>",
        "height": "165"
      },
      {
        "_type": "para",
        "title": "Multi-format {{picker}} control",
        "text": "We will take the technique of custom tags with built-in converters a step further, in the next sample: An improved version of the [color picker](#hierarchypatterns@picker) above, which can bind to multiple alternative data formats: HSVA, RGBA and HEX.\n\nIt is available at [www.jsviews.com/download/sample-tag-controls/colorpicker/colorpicker-multiformat.js](download/sample-tag-controls/colorpicker/colorpicker-multiformat.js).\n\nHere is the tag definition of the 'multi-format' `{{picker}}`, with the added `convert` and `convertBack` options:\n\n```js\n// Bind to HSVA color parameters and mode. Color parameters will be HSVA, RGBA or HEX, depending on mode\nbindTo: [0, 1, 2, 3, \"mode\"],\nlinkedCtxParam: [\"h\", \"s\", \"v\", \"a\", undefined],\n...\nconvert: function(arg1, arg2, arg3, arg4, mode) {\n  mode = mode || \"hsva\";\n  var arg;\n  switch (mode) {\n    case \"hsva\":\n      // This is our internal format, so return as is\n      return [arg1, arg2, arg3, arg4, mode];\n    case \"rgba\":\n      // Convert from RGBA to our internal HSVA format\n      arg = tinycolor({r: arg1, g: arg2, b: arg3, a: arg4}).toHsv();\n      break;\n    case \"hex\":\n      // Convert from HEX to our internal HSVA format\n      arg = tinycolor(arg1).toHsv();\n      break;\n  }\n  return [arg.h, arg.s, arg.v, arg.a, mode];\n},\n\nconvertBack: function() {\n  var color, ret,\n    args = $.extend([], this.currentHsvaColor, arguments),\n    h = args[0], s = args[1], v = args[2], a = args[3], mode = args[4];\n\n  switch (mode) {\n    case \"hsva\":\n      // External format is same as internal format, so return as is\n      ret = [h, s, v, a];\n      break;\n    case \"rgba\":\n      color = tinycolor({h: h, s: s, v: v, a: a});\n      // Convert from internal HSVA format to RGBA external format\n      color = color.toRgb();\n      ret = [color.r, color.g, color.b, color.a];\n      break;\n    case \"hex\":\n      // Convert from internal HSVA format to HEX external format\n      color = tinycolor({h: h, s: s, v: v, a: a});\n      ret = [color.toHex8String()];\n  }\n  ret.arg0 = false; // Return array for multiple bindTo targets, with arg0 false - to indicate\n  // that this targets multiple args, not just the first one\n  return ret;\n},\n```",
        "anchor": "picker-multi"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "download/sample-tag-controls/colorpicker/colorpicker-multiformat.js",
            "label": "colorpicker-multiformat.js"
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
            "text": "*Default mode: HSVA format -- binding to `color1` data:*\n\n```jsr\n{^{picker color1.h color1.s color1.v color1.a ... /}}\n...\nh: <input data-link=\"color1.h\"/>\n...\n```\n\n*Alternative RGBA format -- `mode` set to `\"rgba\"` -- binding to `color2` data:*\n\n```jsr\n{^{picker color2.r color2.g color2.b color2.a mode=\"rgba\" ... /}}\n...\nr: <input data-link=\"color2.r\"/>\n...\n```\n*Alternative HEX format -- `mode` set to `\"hex\"` -- binding to `color3` data:*\n\n```jsr\n{^{picker color3.hex mode=\"hex\" ... /}}\n...\nhex: <input data-link=\"color3.hex\"/>\n...\n```"
          }
        ],
        "url": "samples/tag-controls/colorpicker/colorpicker-multiformat",
        "height": "470"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For additional variants of the `{{picker}}` control, see the [color picker samples](#samples/tag-controls/colorpicker) topic."
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "renderingpatterns",
            "label": "Layout and rendering design patterns"
          },
          {
            "_type": "topic",
            "hash": "bindingpatterns",
            "label": "Data binding design patterns"
          }
        ]
      }
    ]
  },
  "todo": {
    "title": "TODO",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "- Add to  Data binding topic\n\n  argDefault\n  trigger \n  sortable grid\n\n- Add to Tag hierarchy topic\n\n  - [Derived tag controls](#hierarchypatterns@derived)\n  - [Tag hierarchy and recursive tags](#hierarchypatterns@hierarchy)\n  - [dataMap flow](#hierarchypatterns@datamap)\n\n  **Derived tag controls**\n  Existing samples - on links and range\n\n  dataMap\n  flow\n\n  sortable grid\n\n  **Tag hierarchy and recursive tags**\n\n  grid, pager, gridheader etc.\n\nAlso this=~mytag, lateRender, "
      }
    ]
  }
};