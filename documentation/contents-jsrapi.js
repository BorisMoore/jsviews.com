var content = $.views.documentation.content;

content.jsrapi = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/jsrapi")) ||
{
  "jsrapi": {
    "title": "JsRender API topics",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See [*JsRender Quickstart*](#jsr-quickstart) for an introductory overview."
      },
      {
        "_type": "links",
        "title": "Topics:",
        "links": [],
        "topics": [
          {
            "hash": "tmplsyntax",
            "label": "Template syntax and structure"
          },
          {
            "hash": "jsrtags",
            "label": "Template tags"
          },
          {
            "hash": "rendertmpl",
            "label": "Render a template"
          },
          {
            "hash": "apps",
            "label": "Building apps"
          },
          {
            "hash": "nojqueryapi",
            "label": "JsRender without jQuery"
          },
          {
            "hash": "settings",
            "label": "Settings"
          },
          {
            "hash": "advanced",
            "label": "Advanced"
          },
          {
            "hash": "jsrnode",
            "label": "JsRender on Node.js"
          }
        ]
      }
    ]
  },
  "jsrtags": {
    "title": "Template tags",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "Tag syntax",
        "links": [],
        "topics": [
          {
            "hash": "tagsyntax",
            "label": "JsRender and JsViews tag syntax"
          }
        ]
      },
      {
        "_type": "para",
        "title": "Tags without content",
        "text": "- [`{{: ...}}`](#assigntag) (Evaluate)\n- [`{{> ...}}`](#htmltag) (HTML encode)\n- [`{{!-- ... --}}`](#commenttag) (Comment)\n- [`{{* ...}} and {{*: ...}}`](#allowcodetag) (Allow code)"
      },
      {
        "_type": "para",
        "title": "Block tags",
        "text": "- [`{{include ...}}`](#includetag) (Template composition -- partials)\n- [`{{for ...}}`](#fortag) (Template composition, with iteration over arrays)\n- [`{{props ...}}`](#propstag) (Iteration over properties of an object)\n- [`{{if ...}}`](#iftag) (Conditional inclusion)\n- [`{{myTag ...}}`](#customtagsapi) (Custom tags)"
      },
      {
        "_type": "para",
        "title": "Alternative content blocks",
        "text": "- [`{{else ...}}`](#elsetag) (Content block separator)"
      },
      {
        "_type": "para",
        "title": "Additional tags in JsViews",
        "text": "When using data-linked templates, with *JsViews*, the following additional template tags are available:\n\n- [`{^{radiogroup ...}}`](#jsvradiogrouptag) (Radio button group)\n- [`{^{on ...}}`](#jsvontag) (Button, or event binding)\n\n*See: [Template tags in JsViews](#jsvtags)*"
      }
    ]
  },
  "assigntag": {
    "title": "Template tag: {{: ...}} <span style=\"font-weight:normal;\">(Evaluate)</span>",
    "path": "",
    "sections": [
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{: ...}}",
        "name": "for NAME",
        "signatures": [
          {
            "_type": "signature",
            "title": "Insert data value or calculated value",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "string",
                "optional": false,
                "description": "Data-path or expression, to be evaluated and inserted as a string in the rendered output"
              }
            ],
            "sections": [],
            "example": "{{:address.street}}",
            "description": "Evaluate the data-path or expression",
            "variant": "{{:pathOrExpr}}"
          }
        ],
        "description": "<em>Get the value of the data path or expression</em>, and insert it into the rendered output as a string",
        "sectionTypes": {}
      },
      {
        "_type": "para",
        "title": "Here are some examples:",
        "text": "(Note the use of different kinds of data-path and expression in the different examples)"
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
            "title": "Data:",
            "code": "{name: \"Pete\"}"
          },
          {
            "_type": "template",
            "title": "Template:",
            "markup": "{{:name}}"
          }
        ],
        "data": {
          "name": "Pete"
        },
        "markup": "{{:name}}",
        "height": "40",
        "jsrJsvJqui": "jsr",
        "title": "{{:dataproperty}}"
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
            "text": "```js\n{\n  name: \"Pete\",\n  address: {\n    city: \"Seattle\"\n  }\n}\n```\n\n`~root` is the top-level data, and `#data` is the current data item\n\n```jsr\n{{:name}} ... {{:address.city}}\n\n... {{:~root.address.city}}\n\n... {{:#data.address.city}}\n```"
          }
        ],
        "data": {
          "name": "Pete",
          "address": {
            "city": "Seattle"
          }
        },
        "markup": "{{:name}}: lives in <b>{{:address.city}}</b>.<br/>\n\nHere is <em>~root.address.city</em>: <b>{{:~root.address.city}}</b><br/>\n\nHere is <em>#data.address.city</em>: <b>{{:#data.address.city}}</b>",
        "height": "80",
        "jsrJsvJqui": "jsr",
        "title": "{{:data.paths}}"
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
            "text": "```js\n[\n  {name: \"Pete\", ...},\n  {name: \"Heidi\", ...}\n]\n```\n\n`#xxx` is the `xxx` property of the current view -- so `#index` is the `view.index` \n\n```jsr\n{{:#index+1}}\n```"
          }
        ],
        "markup": "<b>{{:#index+1}}:</b>\n{{:name}}: lives in <b>{{:address.city}}</b>.<br/>",
        "data": [
          {
            "name": "Pete",
            "address": {
              "city": "Seattle"
            }
          },
          {
            "name": "Heidi",
            "address": {
              "city": "Sidney"
            }
          }
        ],
        "height": "60",
        "jsrJsvJqui": "jsr",
        "title": "{{:#index ...}}"
      },
      {
        "_type": "para",
        "title": "",
        "text": "***Note:*** When rendering data which is not fully trusted, such as `{{:untrustedValue}}` it would be preferable from a security point of view to use the `{{>untrustedValue}}` -- since the [`{{> ...}}`](#htmltag) tag will HTML encode the data, and thus prevent HTML injection attacks."
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "converters",
            "label": "Using converters"
          },
          {
            "_type": "topic",
            "hash": "paths",
            "label": "Paths and expressions"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/converters",
            "label": "Sample: Converters and encoding"
          },
          {
            "_type": "topic",
            "hash": "jsvassigntag",
            "label": "JsViews: {^{: ...}}"
          }
        ]
      }
    ]
  },
  "htmltag": {
    "title": "Template tag: {{> ...}} <span style=\"font-weight:normal;\">(HTML encode)</span>",
    "path": "",
    "sections": [
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{>...}}",
        "name": "for NAME",
        "signatures": [
          {
            "_type": "signature",
            "title": "Insert HTML-encoded data value or calculated value",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "string",
                "optional": false,
                "description": "Data-path or expression, to be evaluated and inserted as an HTML-encoded string in the rendered output"
              }
            ],
            "sections": [],
            "example": "{{>address.street}}",
            "description": "Evaluate the data-path or expression, and HTML encode the result",
            "variant": "{{>pathOrExpr}}"
          }
        ],
        "description": "<em>Get the HTML-encoded value of the data path or expression</em>, and insert it into the rendered output",
        "sectionTypes": {}
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
            "title": "Data:",
            "code": "{description: \"A <b>very nice</b> apartment\"}"
          },
          {
            "_type": "template",
            "title": "Template:",
            "markup": "{{:description}}\n...\n{{>description}}"
          }
        ],
        "data": {
          "description": "A <b>very nice</b> apartment"
        },
        "markup": "{{:description}}<br/>\n{{>description}}",
        "jsrJsvJqui": "jsr",
        "height": "60",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Using {{> ...}} for preventing HTML injection attacks",
        "text": "The [`{{> ...}}`](#htmltag) tag should be used instead of the [`{{: ...}}`](#assigntag) whenever *data being rendered is not fully trusted* -- in order to protect against HTML injection attacks. \n\nUsing `{{>untrustedValue}}` ensures appropriate HTML encoding."
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "converters",
            "label": "Using converters"
          },
          {
            "_type": "topic",
            "hash": "convertersapi@html",
            "label": "HTML encoder"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/converters",
            "label": "Sample: Converters and encoding"
          },
          {
            "_type": "topic",
            "hash": "paths",
            "label": "Paths and expressions"
          },
          {
            "_type": "topic",
            "hash": "jsvhtmltag",
            "label": "JsViews: {^{> ...}}"
          }
        ]
      }
    ]
  },
  "includetag": {
    "title": "Template tag: {{include tmpl=... /}} <span style=\"font-weight:normal;\">(Template composition &ndash; partials)</span>",
    "path": "",
    "sections": [
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{include tmpl=... /}}",
        "name": "for NAME",
        "signatures": [
          {
            "_type": "signature",
            "title": "Include an external template",
            "params": [
              {
                "_type": "param",
                "name": "nameOrExpr",
                "type": "object or string",
                "optional": true,
                "description": "The name of a template, or a template object, to be rendered",
                "propName": "tmpl"
              }
            ],
            "args": [],
            "sections": [],
            "example": "{{include tmpl=\"insertedPersonTemplate\" /}}",
            "description": "Include the specified template",
            "variant": "{{include tmpl=nameOrExpr /}}"
          }
        ],
        "description": "<em>Template composition</em>: &ndash; Include the referenced template: <em>tmpl</em>, rendered using the current data context.",
        "sectionTypes": {}
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
            "_type": "template",
            "title": "",
            "markup": "{{:name}} lives in {{include tmpl=\"#addressTemplate\"/}}\n"
          }
        ],
        "jsrJsvJqui": "jsr",
        "height": "60",
        "code": "var people = [\n  {\n    \"name\": \"Pete\",\n    \"address\": {\n      \"city\": \"Seattle\"\n    }\n  },\n  {\n    \"name\": \"Heidi\",\n    \"address\": {\n      \"city\": \"Sidney\"\n    }\n  }\n];\n\nvar html = $(\"#peopleTemplate\").render(people);\n\n$(\"#peopleList\").html(html);",
        "html": "<script id=\"peopleTemplate\" type=\"text/x-jsrender\">\n  <div>\n    {{:name}} lives in {{include tmpl=\"#addressTemplate\"/}}\n  </div>\n</script>\n\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n    <b>{{>address.city}}</b>\n</script>\n\n<div id=\"peopleList\"></div>",
        "title": ""
      },
      {
        "_type": "para",
        "title": "Using {{include}} to move to a new data context",
        "text": "`{{include}}` is similar to `{{for}}` in that it can take an argument for moving to a new data context -- as in the following examples: \n\n*Block tag with inline content:*\n\n```jsr\n{{include address}}\n  {{:street}}\n{{/include}}\n```\n\n*Self-closing tag, referencing block content as `tmpl=...` :*\n\n```jsr\n{{include address tmpl=\"#addressTemplate\"/}}\n```\n\n```jsr\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  {{:street}}\n</script>\n```\n\nThe above two examples are equivalent to:\n\n```jsr\n{{:address.street}}\n```"
      },
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{include pathOrExpr}}",
        "signatures": [
          {
            "_type": "signature",
            "title": "{{include pathOrExpr}} using an inline block",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "object or array",
                "optional": true,
                "description": "Path or expression for an object or array"
              }
            ],
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "<b>Note:</b> The data context inside the `{{include}}` block is the object returned by the path or expression."
              },
              {
                "_type": "para",
                "title": "",
                "text": "If the object returned is an array, then the block is rendered once for each item, and the data context for each rendered block is the data item from the array."
              }
            ],
            "example": "{{include billing.address}}\n  {{:city}}\n{{/include}}",
            "description": "Render the block content of the tag, with the given object or array as data context",
            "variant": "{{include pathOrExpr}}...{{/include}}"
          },
          {
            "_type": "signature",
            "title": "{{include pathOrExpr}} using an external template",
            "params": [
              {
                "_type": "param",
                "name": "nameOrExpr",
                "type": "object or string",
                "optional": true,
                "description": "The name of a template, or a template object, to be rendered instead of block content",
                "propName": "tmpl"
              }
            ],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "object or array",
                "optional": true,
                "description": "Path or expression for an object or array"
              }
            ],
            "sections": [],
            "example": "{{include billing.address tmpl=\"addressTmpl\" /}}",
            "description": "Render the specified template, with the given object or array as data context",
            "variant": "{{include pathOrExpr tmpl=nameOrExpr /}}"
          }
        ],
        "description": "<em>Template composition</em>: &ndash; Render the block content of the <code>{{include}}</code> (or the referenced external template), using the object or array specified by the path or expression as data context.<br/><br/>(Similar to <code>{{for pathOrExpr}}</code> but with no iteration over arrays...)",
        "sectionTypes": {}
      },
      {
        "_type": "para",
        "title": "",
        "text": "Unlike `{{for objectOrArray}}`, `{{include objectOrArray}}` does not iterate over arrays.\n\nConsider this example:\n\n```jsr\nNumber of friends: {{:friends.length}}    {{!-- Get 'length' of 'friends' array --}}\nFriends:\n{{for friends}}                           {{!-- Iterate over 'friends' array --}}\n  {{name:}}                               {{!-- Current data context (#data) is a 'friend'. Get 'name' --}}   \n{{/for}}\n```\n\nThe example could actually be rewritten, equivalently, as follows:\n\n```jsr\n{{include friends}}                       {{!-- Move to 'friends' array as data context, no iteration --}}\n  Number of friends: {{:length}}          {{!-- Current data context (#data) is 'friends'. Get 'length' --}}\n  Friends:\n  {{for}} {{!-- or {{for #data}} ... --}} {{!-- Iterate over current data context (friends array) --}}\n    {{name:}} \n  {{/for}}\n{{/include}}\n```\n\nHere it is as a running sample:"
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
            "text": "```jsr\n{{include friends}}:\n  Number of friends {{:length}}\n  ...\n{{/include}}\n```"
          }
        ],
        "html": "",
        "code": "",
        "markup": "{{include friends}} {{!-- move to friends array as data context --}}\n\n  Number of friends: {{:length}}. {{!-- length of friends array --}}\n\n  <br/>Friends:\n\n  {{for}} {{!-- Iterate over current data context (friends array) --}}\n    {{:name}} \n  {{/for}}\n\n{{/include}}",
        "title": "{{include array}} does not iterate",
        "data": {
          "friends": [
            {
              "name": "Jeff"
            },
            {
              "name": "Fabien"
            }
          ]
        },
        "jsrJsvJqui": "jsr",
        "height": "55"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "tagsyntax",
            "label": "Tag syntax"
          },
          {
            "_type": "topic",
            "hash": "views",
            "label": "View hierarchy"
          },
          {
            "_type": "topic",
            "hash": "paths",
            "label": "Paths and expressions"
          },
          {
            "_type": "topic",
            "hash": "jsvincludetag",
            "label": "JsViews: {^{include ...}}"
          }
        ]
      }
    ]
  },
  "fortag": {
    "title": "Template tag: {{for ...}} <span style=\"font-weight:normal;\">(Template composition, with iteration over arrays)</span>",
    "path": "",
    "sections": [
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{for ...}}",
        "signatures": [
          {
            "_type": "signature",
            "title": "{{for}} using an inline block",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "object or array",
                "optional": true,
                "description": "Path or expression for an object or array"
              }
            ],
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "<b>Note:</b> The data context inside the `{{for}}` block is the object returned by the path or expression."
              },
              {
                "_type": "para",
                "title": "",
                "text": "If the object returned is an array, then the block is rendered once for each item, and the data context for each rendered block is the data item from the array."
              }
            ],
            "example": "{{for billing.address}}\n  {{:city}}\n{{/for}}",
            "description": "Render the block content of the tag for the given object, or iterate over the given array",
            "variant": "{{for pathOrExpr}}...{{/for}}"
          },
          {
            "_type": "signature",
            "title": "{{for}} using an external template",
            "params": [
              {
                "_type": "param",
                "name": "nameOrExpr",
                "type": "object or string",
                "optional": true,
                "description": "The name of a template, or a template object, to be rendered instead of block content",
                "propName": "tmpl"
              }
            ],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "object or array",
                "optional": true,
                "description": "Path or expression for an object or array"
              }
            ],
            "sections": [],
            "example": "{{for billing.address tmpl=\"addressTmpl\" /}}",
            "description": "Render the specified template for the given object, or iterate over the given array",
            "variant": "{{for pathOrExpr tmpl=nameOrExpr /}}"
          }
        ],
        "description": "<em>Template composition</em>: &ndash; Render the block content of the <code>{{for}}</code> (or the referenced external template), using the object or array specified by the path or expression as data context. If it is an array, iterate over the array, rendering once for each item.",
        "sectionTypes": {}
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here are some examples:"
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
            "_type": "template",
            "title": "",
            "markup": "{{:name}} lives in \n{{for address}}\n  <b>{{>city}}</b>\n{{/for}}\n"
          }
        ],
        "code": "",
        "jsrJsvJqui": "jsr",
        "height": "70",
        "html": "",
        "data": [
          {
            "name": "Pete",
            "address": {
              "city": "Seattle"
            }
          },
          {
            "name": "Heidi",
            "address": {
              "city": "Sidney"
            }
          }
        ],
        "markup": "<div>\n  {{:name}} lives in\n  {{for address}}\n    <b>{{>city}}</b>\n  {{/for}}\n</div>",
        "title": "{{for object}}"
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
            "text": "```jsr\n{{:name}} lives in {{for address tmpl=\"#addressTemplate\" /}}\n```\n\n```jsr\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  <b>{{>city}}</b>\n</script>\n```"
          }
        ],
        "html": "<script id=\"peopleTemplate\" type=\"text/x-jsrender\">\n  <div>\n    {{:name}} lives in {{for address tmpl=\"#addressTemplate\" /}}\n  </div>\n</script>\n\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  <b>{{>city}}</b>\n</script>\n\n<div id=\"result\"></div>",
        "code": "var people = [\n  {\n    \"name\": \"Pete\",\n    \"address\": {\n      \"city\": \"Seattle\"\n    }\n  },\n  {\n    \"name\": \"Heidi\",\n    \"address\": {\n      \"city\": \"Sidney\"\n    }\n  }\n];\n\nvar html = $(\"#peopleTemplate\").render(people);\n\n$(\"#result\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "70",
        "title": "{{for object tmpl=... /}}"
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
            "_type": "template",
            "title": "",
            "markup": "<b>{{:title}}</b>\n<ul>\n  {{for members}}\n      <li>{{:name}} ...</li>\n  {{/for}}\n</ul>"
          }
        ],
        "html": "",
        "code": "",
        "data": {
          "title": "The A team",
          "members": [
            {
              "name": "Pete",
              "address": {
                "city": "Seattle"
              }
            },
            {
              "name": "Heidi",
              "address": {
                "city": "Sidney"
              }
            }
          ]
        },
        "markup": "<b>{{:title}}</b>\n<ul>\n  {{for members}}\n      <li>{{:name}} lives in <b>{{:address.city}}</b></li>\n  {{/for}}\n</ul>",
        "jsrJsvJqui": "jsr",
        "height": "100",
        "title": "{{for array}}"
      },
      {
        "_type": "para",
        "title": "Using the {{else}} tag with {{for}}",
        "text": "Using the `{{else}}` tag between `{{for}}` and `{{/for}}`, allows alternate rendering based on the object or array returned from the path or expression `{{for pathOrExpr}}`"
      },
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{for ...}}...{{else}}...{{/for}}",
        "name": "name",
        "signatures": [
          {
            "_type": "signature",
            "title": "Render alternate blocks depending on whether an array is empty or not",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "object or array",
                "optional": true,
                "description": "Path or expression for an object or array"
              }
            ],
            "sections": [],
            "example": "{{for members}}\n    Name: {{:name}}\n{{else}}\n    No members...\n{{/for}}",
            "description": "Render first block if array is not empty, otherwise render second block",
            "variant": "{{for pathOrExpr}...{{else}}...{{/for}}"
          }
        ],
        "description": "<em>Conditional blocks</em>: &ndash; Render the block content of the <code>{{for}}</code> tag (or referenced template) if the object is defined and is not an empty array, otherwise render the <code>{{else}}</code> block (or template)",
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
            "markup": "{{for members}}\n  <div>{{:name}}</div>\n{{else}}\n  <div>No members!</div>\n{{/for}}\n"
          }
        ],
        "markup": "<b>{{:title}}</b>\n<ul>\n  {{for members}}\n    <li><b>Name:</b> {{:name}}</li>\n  {{else}}\n    <li>No members!</li>\n  {{/for}}\n</ul>",
        "data": [
          {
            "title": "The A team",
            "members": []
          },
          {
            "title": "The B team",
            "members": [
              {
                "name": "Pete"
              }
            ]
          }
        ],
        "height": "144",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "",
        "text": "*Note:* A `{{for}}` tag (like an `{\"{if}}` tag) can have multiple `{{else}}` blocks. See for example [this sample](#jsvelsetag@for-else-multiple)."
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "tagsyntax",
            "label": "Tag syntax"
          },
          {
            "_type": "topic",
            "hash": "views",
            "label": "View hierarchy"
          },
          {
            "_type": "topic",
            "hash": "paths",
            "label": "Paths and expressions"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/paths",
            "label": "Sample: Paths"
          },
          {
            "_type": "topic",
            "hash": "jsvfortag",
            "label": "JsViews: {^{for ...}}"
          }
        ]
      }
    ]
  },
  "propstag": {
    "title": "Template tag: {{props ...}} <span style=\"font-weight:normal;\">(Iteration over properties of an object)</span>",
    "path": "",
    "sections": [
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{props ...}}",
        "signatures": [
          {
            "_type": "signature",
            "title": "{{props}} using an inline block",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "object",
                "optional": true,
                "description": "A data path, or an object"
              }
            ],
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "<b>Note:</b> The data context inside the `{{props}}` block is an object with properties `key` and `props`:"
              },
              {
                "_type": "code",
                "title": "",
                "code": "{\n  key: propertyName,\n  prop: propertyValue // could be a string, number, object, etc.\n}"
              }
            ],
            "example": "{{props billing.address}}\n  <b>{{>key}}</b>: {{>prop}}\n{{/props}}",
            "description": "Render the block content of the tag for each property of the given object",
            "variant": "{{props pathOrExpr}}...{{/props}}"
          },
          {
            "_type": "signature",
            "title": "{{props}} using an external template",
            "params": [
              {
                "_type": "param",
                "name": "nameOrExpr",
                "type": "object or string",
                "optional": true,
                "description": "The name of a template, or a template object, to be rendered instead of block content",
                "propName": "tmpl"
              }
            ],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "object",
                "optional": false,
                "description": "A data path, or an object"
              }
            ],
            "sections": [],
            "example": "{{props billing.address tmpl=\"addressTmpl\" /}}",
            "description": "Render the specified template once for each property of the given object",
            "variant": "{{props pathOrExpr tmpl=nameOrExpr /}}"
          }
        ],
        "description": "<em>Template composition</em>: &ndash; Iterate over the properties of the object, and render the block content of the <code>{{props}}</code> tag (or the referenced external template) once for each property &ndash; using as data context: <code>{<b>key</b>: propertyName, <b>prop</b>: propertyValue}</code>.",
        "sectionTypes": {}
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here are some examples:"
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
            "_type": "template",
            "title": "",
            "markup": "...\n{{props address}}\n  <b>{{>key}}:</b> {{>prop}}<br/>\n{{/props}}\n"
          }
        ],
        "code": "",
        "jsrJsvJqui": "jsr",
        "height": "230",
        "html": "",
        "data": [
          {
            "name": "Pete",
            "address": {
              "street": "12 Pike Place",
              "city": "Seattle",
              "ZIP": "98101"
            }
          },
          {
            "name": "Heidi",
            "address": {
              "street": "5000 Broadway",
              "city": "Sidney",
              "country": "Australia"
            }
          }
        ],
        "markup": "<table><tbody>\n  <tr><td><b>name:</b> {{:name}}</td></tr>\n  <tr><td> \n  {{props address}}\n    <b>{{>key}}:</b> {{>prop}}<br/>\n  {{/props}}\n  </td></tr>\n</tbody></table>",
        "title": "{{props object}}"
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
            "text": "```jsr\n{{props address tmpl=\"#addressTemplate\" /}}\n```\n\n```jsr\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  <b>{{>key}}:</b> {{>prop}}<br/>\n</script>\n```"
          }
        ],
        "html": "<script id=\"peopleTemplate\" type=\"text/x-jsrender\">\n  <table><tbody>\n    <tr><td><b>name:</b> {{:name}}</td></tr>\n    <tr><td> \n      {{props address tmpl=\"#addressTemplate\" /}}\n    </td></tr>\n  </tbody></table>\n</script>\n\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  <b>{{>key}}:</b> {{>prop}}<br/>\n</script>\n\n<div id=\"result\"></div>",
        "code": "var people = [\n  {\n    \"name\": \"Pete\",\n    \"address\": {\n      \"street\": \"12 Pike Place\",\n      \"city\": \"Seattle\",\n      \"ZIP\": \"98101\"\n    }\n  },\n  {\n    \"name\": \"Heidi\",\n    \"address\": {\n      \"street\": \"5000 Broadway\",\n      \"city\": \"Sidney\",\n      \"country\": \"Australia\"\n    }\n  }\n];\n\nvar html = $(\"#peopleTemplate\").render(people);\n\n$(\"#result\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "230",
        "title": "{{props object tmpl=... /}}"
      },
      {
        "_type": "para",
        "title": "Using the {{else}} tag with {{props}}",
        "text": "Using the `{{else}}` tag between `{{props}}` and `{{/props}}`, allows alternate rendering based on the object returned from the path or expression `{{props pathOrExpr}}`"
      },
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{props ...}}...{{else}}...{{/props}}",
        "name": "name",
        "signatures": [
          {
            "_type": "signature",
            "title": "Render alternate blocks depending on whether an object is empty or not",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "object",
                "optional": true,
                "description": "A data path, or an object"
              }
            ],
            "sections": [],
            "example": "{{props address}}\n  Key: {{:key}} Value: {{:prop}}\n{{else}}\n  No properties...\n{{/for}}",
            "description": "Render first block if object is not empty, otherwise render second block",
            "variant": "{{for pathOrExpr}...{{else}}...{{/for}}"
          }
        ],
        "description": "<em>Conditional blocks</em>: &ndash; Render the block content of the <code>{{prop}}</code> tag (or referenced template) if the object is defined and is not an empty object (no properties), otherwise render the <code>{{else}}</code> block (or template)",
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
            "markup": "{{props address}}\n  <b>{{>key}}:</b> {{>prop}}<br/>\n{{else}}\n  The address is blank (no properties)!\n{{/props}}"
          }
        ],
        "markup": "<table><tbody>\n  <tr><td><b>name:</b> {{:name}}</td></tr>\n  <tr><td> \n  {{props address}}\n    <b>{{>key}}:</b> {{>prop}}<br/>\n  {{else}}\n    The address is blank (no properties)!\n  {{/props}}\n  </td></tr>\n</tbody></table>",
        "data": [
          {
            "name": "Pete",
            "address": {
              "street": "12 Pike Place",
              "city": "Seattle",
              "ZIP": "98101"
            }
          },
          {
            "name": "Heidi",
            "address": {}
          }
        ],
        "height": "200",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "tagsyntax",
            "label": "Tag syntax"
          },
          {
            "_type": "topic",
            "hash": "views",
            "label": "View hierarchy"
          },
          {
            "_type": "topic",
            "hash": "paths",
            "label": "Paths and expressions"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/paths",
            "label": "Sample: Paths"
          },
          {
            "_type": "topic",
            "hash": "jsvpropstag",
            "label": "JsViews: {^{props ...}}"
          }
        ]
      }
    ]
  },
  "iftag": {
    "title": "Template tag: {{if ...}} <span style=\"font-weight:normal;\">(Conditional inclusion)</span>",
    "path": "",
    "sections": [
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{if ...}}",
        "name": "for NAME",
        "signatures": [
          {
            "_type": "signature",
            "title": "Conditional block",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "object or string",
                "optional": false,
                "description": "The data-path or expression to be tested"
              }
            ],
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "<b>Note:</b> The data context inside the `{{if}}` block is the same as the outer context"
              }
            ],
            "example": "{{if nickname}}\n  Nickname: {{:nickname}}\n{{/if}}",
            "description": "Render the block only if the expression is true",
            "variant": "{{if pathOrExpr}}...{{/if}}"
          },
          {
            "_type": "signature",
            "title": "Conditional inclusion of external template",
            "params": [
              {
                "_type": "param",
                "name": "nameOrExpr",
                "type": "object or string",
                "optional": true,
                "description": "The name of a template, or a template object, to be rendered",
                "propName": "tmpl"
              }
            ],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "object or string",
                "optional": false,
                "description": "The data-path or expression to be tested"
              }
            ],
            "sections": [],
            "example": "{{if nickname tmpl=\"nicknameTemplate\" /}}",
            "description": "Render the specified template only if the expression is true",
            "variant": "{{if pathOrExpr tmpl=nameOrExpr /}}"
          }
        ],
        "description": "<em>Conditional inclusion</em>: &ndash; Render the block content of the <code>{{if}}</code> tag (or the referenced external template) only if the data-path or expression evaluates to true ('or truthy')",
        "sectionTypes": {}
      },
      {
        "_type": "para",
        "title": "Using the {{else}} tag with {{if}}",
        "text": "Using the `{{else}}` tag between `{{if}}` and `{{/if}}`, allows alternate rendering based on '<em>if ... else ...</em>' logic:"
      },
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{if ...}}...{{else}}...{{/if}}",
        "name": "name",
        "signatures": [
          {
            "_type": "signature",
            "title": "Render alternate blocks depending on an expression",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "object or string",
                "optional": false,
                "description": "The data-path or expression to be tested"
              }
            ],
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "<b>Note:</b> The data context inside the `{{if}}` and `{{else}}` blocks is the same as the outer context"
              }
            ],
            "example": "{{if nickname}}\n  Nickname: {{:nickname}}\n{{else}}\n  No nickname...\n{{/if}}",
            "description": "Render first block if condition is true, otherwise render second block",
            "variant": "{{if pathOrExpr}...{{else}}...{{/if}}"
          },
          {
            "_type": "signature",
            "title": "Render different templates depending on one or more expressions",
            "params": [
              {
                "_type": "param",
                "name": "nameOrExpr",
                "type": "object or string",
                "optional": true,
                "description": "The name of a template, or a template object, to be rendered",
                "propName": "tmpl"
              }
            ],
            "args": [
              {
                "_type": "param",
                "name": "pathOrExpr",
                "type": "object or string",
                "optional": false,
                "description": "The data-path or expression to be tested"
              }
            ],
            "sections": [],
            "example": "{{if nickname tmpl=\"nicknameTemplate\"}}\n{{else tmpl=\"noNicknameTemplate\"}}\n{{/if}}",
            "description": "Render first template if condition is true, otherwise render second template",
            "variant": "{{if pathOrExpr1 tmpl=nameOrExpr1 }}{{else tmpl=nameOrExpr2 }}{{/if}}"
          }
        ],
        "description": "<em>Alternative conditional blocks</em>: &ndash; Render the block content of the <code>{{if}}</code> tag (or referenced template) if the expression is true, otherwise render the <code>{{else}}</code> block (or template)",
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
        "title": "else and elseif",
        "text": "You can add more than one `{{else}}` tag between `{{if}}` and `{{/if}}`, to get alternate rendering based on '<em>if ... elseif ... else ...</em>' logic. For <em>elseif</em>, just include an expression...:\n"
      },
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{if ....}}...{{else ...}}...{{else}}...{{/if}}",
        "name": "name",
        "signatures": [
          {
            "_type": "signature",
            "title": "Render alternate blocks depending on one or more expressions",
            "params": [],
            "args": [],
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "<b>Note: </b>Any of the `{{if}}` or `{{else}}` tags can have a `tmpl=nameOrExpr` parameter. The external template will be used instead of block content for that tag."
              }
            ],
            "example": "{{if nickname}}\n  Nickname: {{:nickname}}\n{{else altnickname}}\n  Alternate nickname: {{:altnickname}}\n{{else}}\n  No nickname...\n{{/if}}",
            "description": "Render first block for which condition is true, otherwise last block",
            "variant": "{{if pathOrExpr1}}...{{else pathOrExpr2}}...{{else}}...{{/if}"
          }
        ],
        "description": "<em>Multiple alternative conditional blocks</em>: &ndash; Render the first <code>{{if}}</code> or <code>{{else}}</code> block for which the expression is true. If none are true, and there is an <code>{{else}}</code> without an expression, render that block",
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
        "sectionTypes": {
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
            "text": "```js\n[\n  {title: \"The A team\", members: [...], standby: [...]},\n  {title: \"The B team\", members: [], standby: [...]},\n  {title: \"The C team\", standby: []}\n]\n```\n\n```jsr\n{{if members && members.length}}\n  ...\n{{else standby && standby.length}}\n  Standby only:\n  ...\n{{else}}\n  No members!\n{{/if}}\n```"
          }
        ],
        "markup": "<h4>{{:title}}</h4>\n{{if members && members.length}}\n  <ul>\n    {{for members}}\n      <li>{{:name}}</li>\n    {{/for}}\n  </ul>\n{{else standby && standby.length}}\n  Standby only:\n  <ul>\n    {{for standby}}\n      <li>{{:name}}</li>\n    {{/for}}\n  </ul>\n{{else}}\n  No members!\n{{/if}}",
        "data": [
          {
            "title": "The A team",
            "members": [
              {
                "name": "Pete"
              },
              {
                "name": "Heidi"
              }
            ],
            "standby": [
              {
                "name": "Xavier"
              }
            ]
          },
          {
            "title": "The B team",
            "members": [],
            "standby": [
              {
                "name": "Robert"
              },
              {
                "name": "Adriana"
              }
            ]
          },
          {
            "title": "The C team",
            "standby": []
          }
        ],
        "jsrJsvJqui": "jsr",
        "height": "316",
        "title": "{{if}}...{{else}}...{{/if}}"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "tagsyntax",
            "label": "Tag syntax"
          },
          {
            "_type": "topic",
            "hash": "views",
            "label": "View hierarchy"
          },
          {
            "_type": "topic",
            "hash": "paths",
            "label": "Paths and expressions"
          },
          {
            "_type": "topic",
            "hash": "jsviftag",
            "label": "JsViews: {^{if ...}}"
          }
        ]
      }
    ]
  },
  "elsetag": {
    "title": "Template tag: {{else ...}} <span style=\"font-weight:normal;\">(Content blocks separator)</span>",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "{{else}} can be used with {{if}}, {{for}}, {{props}} or any custom tag!",
        "text": "The `{{else}}` tag acts as a separator, for block tags, to divide the content of a tag into two or more different content blocks.\n\nSo it allows a block tag to provide specific behavior involving more than one content block.\n\nFor example, the [`{{if}}`](#iftag) tag uses `{{else}}` to provide *if-else*, or *if-elseif-else ...* behavior:\n\n```jsr\n{{if firstExpression}}\n    render this if the firstExpression is true\n{{else secondExpression}}\n    else render this if the secondExpression is true\n{{else}}\n    else render this\n{{/if}}\n```\n\nAnd the [`{{for}}`](#fortag) tag accepts alternative content to render if an array is empty (or an array or object is `null` or `undefined`):\n\n```jsr\n{{for members}}\n    Member Name: {{:name}}\n{{else}}\n    There are currently no members...\n{{/for}}\n```\n\nSimilarly you can use `{{else}}` with a custom tag, such as in [this sample](#samples/tag-controls/tabs):\n\n```jsr\n{{tabs tabCaption=\"First Tab\"}}\n    first tab content\n{{else tabCaption=\"Second Tab\"}}\n    second tab content\n{{/tabs}}\n```"
      },
      {
        "_type": "links",
        "title": "See also",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "iftag",
            "label": "{{if}}"
          },
          {
            "_type": "topic",
            "hash": "fortag",
            "label": "{{for}}"
          },
          {
            "_type": "topic",
            "hash": "propstag",
            "label": "{{props}}"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls/tabs",
            "label": "Sample: tabs control"
          },
          {
            "_type": "topic",
            "hash": "tagsyntax",
            "label": "Tag syntax"
          },
          {
            "_type": "topic",
            "hash": "views",
            "label": "View hierarchy"
          },
          {
            "_type": "topic",
            "hash": "paths",
            "label": "Paths and expressions"
          },
          {
            "_type": "topic",
            "hash": "jsvelsetag",
            "label": "JsViews: {{else}}"
          }
        ]
      }
    ]
  },
  "commenttag": {
    "title": "Template tag: {{!-- ... --}} <span style=\"font-weight:normal;\">(Comment)</span>",
    "path": "",
    "sections": [
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{!-- a comment --}}",
        "name": "for NAME",
        "signatures": [
          {
            "_type": "signature",
            "title": "Adding comments",
            "params": [],
            "args": [],
            "sections": [],
            "example": "{{!-- this is a comment --}}",
            "description": "The comment will be ignored during template rendering &ndash; and will produce no output",
            "variant": ""
          },
          {
            "_type": "signature",
            "title": "Commenting out sections of a template",
            "params": [],
            "args": [],
            "sections": [],
            "example": "{{!-- this section will be omitted \n\n<em>Do I really want this?{{:password}}</em>\n\n--}}",
            "description": "The comment can be multiline. All content will be ignored during template rendering - and will produce no output",
            "variant": ""
          }
        ],
        "description": "Adding comments to templates, or commenting out sections of a template",
        "sectionTypes": {}
      },
      {
        "_type": "para",
        "title": "JsRender comment tags versus HTML comments",
        "text": "You can include \n\n```jsr\n<!-- This is an HTML comment -->\n```\n\n&mdash; but unlike the JsRender comment tag, the HTML comment will not be ignored by JsRender or JsViews. It will be included in the rendered output, and will get inserted into the DOM along with other rendered markup."
      }
    ]
  },
  "allowcodetag": {
    "title": "Template tags: {{*... }} and {{*: ... }} <span style=\"font-weight:normal;\">(Allow code)</span>",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender templates allow you to write [rich expressions](#paths) within the template tags, such as:\n\n```jsr\n{{:person.firstName + ' ' + person.lastName.toUpperCase()}}\n```\n\nNevertheless, in order to improve encapsulation and maintainability, they don't allow <em>arbitrary</em> code. For example, they don't allow you to access global variables, like `window`. \n\nIf you want complete freedom to insert any code into a compiled template, you can [set **allowCode**](#settings/allowcode) to *true*, either globally, or specifically for that template. You can then run any code as part of the template rendering, using the `{{* ...}}` tag, or you can return (render into the template output) the result of evaluating any expression, using the `{{*: ...}}` tag.\n\n(*Note:* these ***allow code*** tags are not recommended for use within [data-linked](#jsvlinktmpl) templates -- with JsViews.)"
      },
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{* ...}}",
        "name": "for NAME",
        "signatures": [
          {
            "_type": "signature",
            "title": "Insert code",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "anyJavascriptCode ",
                "type": "code",
                "optional": false,
                "description": ""
              }
            ],
            "sections": [],
            "example": "{{* window.myvar=2; myvar+=4; }}",
            "description": "If allowCode is set to true, include any code in the compiled template.",
            "variant": "{{* anyJavascriptCode /}}"
          }
        ],
        "description": "Insert code into the template",
        "sectionTypes": {}
      },
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{*: ...}}",
        "name": "for NAME",
        "signatures": [
          {
            "_type": "signature",
            "title": "Evaluate expression",
            "params": [],
            "args": [
              {
                "_type": "param",
                "name": "anyJavascriptExpression ",
                "type": "code",
                "optional": false,
                "description": ""
              }
            ],
            "sections": [],
            "example": "{{*: myvar/2 }}",
            "description": "If allowCode is set to true, evaluate any expression, and insert the result into the rendered output.",
            "variant": "{{*: anyJavascriptExpression /}}"
          }
        ],
        "description": "Evaluate any code expression",
        "sectionTypes": {}
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example, with `allowCode` set to `true` globally:\n\n```js\n$.views.settings.allowCode(true);\n```"
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
            "text": "Enable `allowCode` in all templates:\n\n```js\n$.views.settings.allowCode(true);\n```\n\nDefine a global variable, then increment it:\n\n```jsr\n{{* window.myvar=2; myvar+=4; }}\n```\n\nInsert the value into the rendered output:\n\n```jsr\n<div> Initial value: {{*:myvar}}</div>\n```\n\nIncrement the value again, and output the new value:\n\n```js\n{{* window.myvar+=11; }}\n\n<div> New value: {{*:myvar}}</div>\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "height": "70",
        "code": "$.views.settings.allowCode(true); \n\nvar html = $(\"#myTemplate\").render();\n\n$(\"#result\").html(html);",
        "html": "<script id=\"myTemplate\" type=\"text/x-jsrender\">\n\n  {{* window.myvar=2; myvar+=4; }}\n\n  <div> Initial value: {{*:myvar}}</div>\n\n  {{* window.myvar+=11; }}\n\n  <div> New value: {{*:myvar}}</div>\n\n</script>\n\n<div id=\"result\"></div>",
        "title": "allowCode",
        "markup": "",
        "anchor": "sample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is an example that uses both regular JsRender tags, like `{{for}}`, and <em>allowCode</em> tags:"
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
            "text": "```js\n$.views.settings.allowCode(true);\n```\n\nDefine a global variable:\n\n```jsr\n{{* window.total = 0}}\n```\n\nIterate through a list, and use `{{* ...}}` to increment the `total`, and `{{*:}}` to return each value:\n\n```js\n{{for list}}\n  {{* total += data}}\n    <li>\n      Amount {{:}} (Running total: {{*: total}})\n   </li>\n{{/for}}\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "height": "160",
        "code": "var data = {\n    title: \"My list\",\n    list: [2, 10.3, 77, -44, -5.5]\n  };\n\n$.views.settings.allowCode(true);\n\nvar html = $(\"#myTemplate\").render(data);\n\n$(\"#result\").html(html);",
        "html": "<script id=\"myTemplate\" type=\"text/x-jsrender\">\n  {{* window.total = 0}}\n  <ol>\n    {{for list}}\n      {{* total += data}}\n        <li>\n          Amount {{:}} (Running total: {{*: total}})\n       </li>\n    {{/for}}\n  </ol>\n  <u>Total: {{*: total}}</u>\n</script>\n\n<div id=\"result\"></div>",
        "title": "allowCode and regular tags",
        "anchor": "plusreg"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is another example, in which we will replace the `{{for list}}` iteration by pure code-based iteration using `{{* ...}}`. This makes it easy to iterate only over the odd members of the array.\n\n<br/>This time we will allow code ***just for this template***:\n\n```js\n$.templates(..., {\n  markup: ...,\n  allowCode: true,\n  ...\n})\n```"
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
            "text": "Enable allowCode just for this template:\n\n```js\nvar tmpl = $.templates({\n    markup: \"#myTemplate\",\n    allowCode: true\n  });\n \nvar html = tmpl.render(data);\n```\n\nInsert template code to iterate over odd numbers:\n\n```jsr\n{{* for (i=0; i<data.list.length; i+=2) { }}\n```\n\nOutput the 1-based index and the value:\n\n```js\n{{*: i+1}}: Amount {{*:data.list[i]}}\n```\n\nInsert the end of the <em>for</em> block, <code>{{* <b>}</b> }}</code> into the template code:\n\n```jsr\n {{* } }}\n```\n\n"
          }
        ],
        "jsrJsvJqui": "jsr",
        "height": "120",
        "code": "var data = {\n    title: \"My list\",\n    list: [2, 10.3, 77, -44, -5.5]\n  };\n\nvar tmpl = $.templates({\n    markup: \"#myTemplate\",\n    allowCode: true\n  });\n \nvar html = tmpl.render(data);\n\n$(\"#result\").html(html);",
        "html": "<script id=\"myTemplate\" type=\"text/x-jsrender\">\n  Here are the odd numbered items:\n  <ul>\n    {{* for (i=0; i<data.list.length; i+=2) { }}\n      <li>\n        {{*: i+1}}: Amount {{*:data.list[i]}}\n      </li>\n    {{* } }}\n  </ul>\n</script>\n\n<div id=\"result\"></div>",
        "title": "allowCode for template",
        "anchor": "tmpl"
      }
    ]
  },
  "customtagsapi": {
    "title": "Custom tags",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Defining custom tags",
        "text": "JsRender deliberately has only a small number of built-in tags -- each of which is very flexible and useful. This is intended to reduce the 'learning curve'. And at the same time JsRender makes it very easy to create your own custom tags:"
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "tags",
            "label": "Registering custom tags: $.views.tags()"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/tags",
            "label": "Samples: JsRender custom tags"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls",
            "label": "Samples: JsViews tag controls"
          }
        ]
      }
    ]
  },
  "rendertmpl": {
    "title": "Render a template",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "A template is rendered by calling the `render()` method.\n\nThe `render(data, helpersOrContext)` method takes as parameters the data (used as the <em>'data context'</em> during the rendering), and optionally additional metadata or contextual helpers. It returns a string -- which is the rendered template -- typically HTML markup with data values or computed values inserted at appropriate points in the string.\n\nThere are three ways of calling the `render()` method:\n- If you have a reference to the <em>template object</em> -- `myTmpl`, call [myTmpl.render(...)](#tmplrender)\n- If you have registered the template by name -- `\"myTmpl\"`, call [$.render.myTmpl(...)](#d.render)\n- If the template is declared in a script block, with selector `\"#myTmpl\"`, you can also call [$(\"#myTmpl\").render(...)](#db.render)"
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "hash": "tmplrender",
            "label": "myTmpl.render()"
          },
          {
            "hash": "d.render",
            "label": "$.render.myTmpl()"
          },
          {
            "hash": "db.render",
            "label": "$(\"#myTmpl\").render()"
          }
        ]
      }
    ]
  },
  "tmplrender": {
    "title": "Render a template against data objects or arrays",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "myTmpl.render()",
        "text": "If `myTmpl` is the compiled template object for your template, you can render it using the `myTmpl.render()` method -- which takes a <em>data</em> object or array (as well as an optional <em>helpersOrContext</em> object), and returns the rendered template as a string.\n\nThere is also a shortcut version of the `render()` method: you can call the template object itself as a function: `var html = myTmpl(data)` -- which is equivalent to `var html = myTmpl.render(data)`.\n\nTo get a template object from a template string, a template declared in a script block, or a previously registered *named template*, see [`$.templates()`](#d.templates)."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "template.render(data)",
        "name": "render",
        "object": "template",
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
              }
            ],
            "sections": [],
            "example": "var html = myTmpl.render(myData);",
            "description": "Render template against data"
          }
        ],
        "description": "Render a template against data, and return a string.",
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
        "text": "Passing an object to the `render()` method.\n\n<em>&mdash; The template is rendered once, with the object as data context:</em>"
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
            "_type": "code",
            "title": "",
            "code": "var myTmpl = $.templates(\"#personTmpl\");\n\nvar html = myTmpl.render(person);"
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td>\n      {{:name}}\n    </td>\n  </tr>\n</script>",
        "code": "var myTmpl = $.templates(\"#personTmpl\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar html = myTmpl.render(person);\n\n$(\"#person\").html(html);",
        "title": "template.render(object):",
        "jsrJsvJqui": "jsr",
        "height": "60"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing an array to the `render()` method.\n\n<em>&mdash; The template is rendered once for each item in the array:</em>"
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
            "_type": "code",
            "title": "",
            "code": "var html = myTmpl.render(people);"
          }
        ],
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td>\n      {{:name}}\n    </td>\n  </tr>\n</script>",
        "code": "var myTmpl = $.templates(\"#personTmpl\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nvar html = myTmpl.render(people);\n\n$(\"#peopleList\").html(html);",
        "title": "template.render(array):",
        "jsrJsvJqui": "jsr",
        "height": "80"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing helpers to the `render()` method."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "template.render(data, helpersOrContext)",
        "name": "render",
        "object": "template",
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
            "example": "var html = myTmpl.render(myData, myHelpers);",
            "description": "Render template against data, and pass in helpers"
          }
        ],
        "description": "Render a template against data, along with helper objects or context, and return a string",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        },
        "anchor": "helpers"
      },
      {
        "_type": "para",
        "title": "",
        "text": "You can pass in any JavaScript type (<em>object, string, number, function...</em>) as helpers on the `helpersOrContext` object, and use them as metadata, or as helper functions for formatting etc.\n\n<em>Note:</em> By passing in helpers in this way, you are making them specific to this render call. Alternatively, you can declare helpers globally, -- and you can also declare helpers that are private to a specific template. See *[Registering helpers: `$.views.helpers()`](#helpers)* for details...\n\nWithin the template, helpers (whether global, or passed in to the `render()` method) are accessed by *helper paths*: `~keyName`. \n\nFor example you might pass in an object with some utility functions:\n\n```js\nvar myHelpers = {\n  util: {\n    split: function(val, part) {...},\n    ...\n  },\n  ...\n};\n\nvar html = myTmpl.render(myData, myHelpers);\n```\n\n-- and access them in the template using a *helper path* such as:\n\n```jsr\n{{:~util.split(fullName, 0)}}\n```\n\nSee *[Registering helpers](#helpers)*."
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
            "text": "```js\nfunction toUpper(val) {...}\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nvar html = myTmpl.render(person, myHelpers);\n```\n\n```jsr\n<td style=\"color:{{:~color}};\">\n  {{:~format(name)}}\n</td>\n```\n\nClick <em>Try it</em> and change the color to \"green\"..."
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <tr>\n    <td style=\"color:{{:~color}};\">\n      {{:~format(name)}}\n    </td>\n  </tr>\n</script>",
        "code": "function toUpper(val) { return val.toUpperCase(); }\n\nvar myTmpl = $.templates(\"#personTemplate\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nvar html = myTmpl.render(person, myHelpers);\n\n$(\"#person\").html(html);",
        "title": "template.render(object, myHelpers):",
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
            "hash": "rendertmpl",
            "label": "Render a template"
          }
        ]
      }
    ]
  },
  "db.render": {
    "title": "jQuery instance method to render a template declared in a script block",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "$(\"#myTmpl\").render()",
        "text": "If a template has been [registered](#d.templates) using a script block:\n\n```jsr\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  ...\n</script>\n```\n\n...then you can call the <a href=\"#tmplrender\">`render()`</a> method of the template without needing to hold on to the compiled template object returned from <a href=\"#d.templates\">`$.templates(...)`</a>.\n\nJust call `$(\"#myTmpl\").render(...)`"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$(tmplSelector).render(data, helpersOrContext)",
        "name": "render",
        "object": "$(tmplSelector)",
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
            "example": "var html = $(\"#myTmpl\").render(myData, myHelpers);",
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
            "_type": "para",
            "title": "",
            "text": "```jsr\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  ...\n</script>\n```\n\n```js\nvar html = $(\"#personTemplate\").render(person);\n```"
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <tr>\n    <td>\n      {{:name}}\n    </td>\n  </tr>\n</script>",
        "code": "var person = {\n    name: \"Adriana\"\n  };\n\nvar html = $(\"#personTemplate\").render(person);\n\n$(\"#person\").html(html);",
        "title": "$(\"#personTemplate\").render(...):",
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
            "hash": "rendertmpl",
            "label": "Render a template"
          }
        ]
      }
    ]
  },
  "compiletmpl": {
    "title": "Using templates",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Defining templates",
        "text": "To define a template you need to provide the markup for the template. JsRender will convert (compile) the markup into a javascript function -- the 'render' function for your template. In fact for convenience, JsRender creates a *template object* which has a [`template.render()`](#rendertmpl) method which is the compiled function.\n\nThere are two ways to create a template:\n\n- Pass the markup string to the [`$.templates()`](#d.templates) method, which will compile it as a template object, and optionally register it by name\n- Declare the template in a script block with `type=\"text/x-jsrender\"` (or at least a type other than the default `text/javascript`). In that case JsRender will automatically call `$.templates()`. You will only need to call it yourself if you want to access the *template object*\n\nThe first approach has the advantage of keeping your template declaration independent of the HTML markup that you are loading into the browser. Indeed you may want to provide the template markup strings for your templates in different application-specific ways, such as loading the string from the server (using a script file or text or html file), creating 'computed' template markup strings on the fly, etc.\n\nHere is an example:"
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
            "text": "The *person.js* script registers a named `\"person\"` template:\n\n```js\n$.templates(\"person\", \"<label>Name:</label> {{:name}} \");\n```\n\nWe load the script from the server, and it registers our template. As soon as the script is loaded, we call the [`render(...)`](#d.render) method for our template:\n\n```js\n$.getScript(\".../person.js\", function() {\n    var html = $.render.person(people);\n    $(\"#peopleList\").html(html);\n  });\n```\n\n*Note:* For a more sophisticated example of lazy loading of scripts for registering templates, see the [remote templates](#samples/jsr/composition/remote-tmpl) sample."
          }
        ],
        "markup": "\n",
        "data": {},
        "code": "$.getScript(\"//www.jsviews.com/samples/resources/templates/person.js\", function() {\n    var html = $.render.person(people);\n    $(\"#peopleList\").html(html);\n  });\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];",
        "html": "<div id=\"peopleList\"></div>",
        "jsrJsvJqui": "jsr",
        "height": "40",
        "title": "Registering a template from a markup string (in this case, fetched  from the server in a script file):",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "samples/resources/templates/person.js",
            "label": "person.js"
          }
        ]
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is a variant of the same sample, where we fetch a text file containing the template markup:"
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
            "text": "The markup string is fetched in an AJAX request (the *person.txt* file).\n\n```jsr\n<label> Name:</label> {{:name}}\n```\n\nAs soon as the request returns, we use the markup string to compile the `personTemplate` object. This time we will not register it as a *named template*, but instead directly call the [`render(...)`](#tmplrender) method of the returned `personTemplate` object:\n\n```js\n$.get(\"...person.txt\", function(value) {\n  personTemplate = $.templates(value);\n  var html = personTemplate.render(people);\n  $(\"#peopleList\").html(html);\n});\n```"
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n",
        "code": "var personTemplate;\n\n$.get(\"resources/templates/person.txt\", function(value) {\n  personTemplate = $.templates(value);\n  var html = personTemplate.render(people);\n  $(\"#peopleList\").html(html);\n});\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];",
        "title": "Compiling a template from a markup string (fetched  from the server in a text file):",
        "jsrJsvJqui": "jsr",
        "height": "40"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the second approach:"
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
            "text": "This time we put our markup in a script block with `type=\"text/x-jsrender\"`...\n\n```jsr\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>\n```\n\nThen in the code we call the [`$.templates()`](#d.templates) method with a jQuery selector for that script block, to register our template as a *named template*. (We could also hold on to the template object, which is the returned value...)  \n\n```js\n$.templates(\"personTmpl\", \"#personTemplate\");\n```\n\nThen as before we call the [`render()`](#rendertmpl) method for the *named template*:\n\n```js\nvar html = $.render.personTmpl(people);\n```"
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>",
        "code": "$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nvar html = $.render.personTmpl(people);\n\n$(\"#peopleList\").html(html);",
        "title": "Registering a template declared in script block:",
        "jsrJsvJqui": "jsr",
        "height": "40"
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios see:",
        "links": [],
        "topics": [
          {
            "hash": "d.templates",
            "label": "Registering templates"
          }
        ]
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "hash": "rendertmpl",
            "label": "Render a template"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/composition/sub-tmpl",
            "label": "Sample: sub-templates"
          }
        ]
      }
    ]
  },
  "d.templates": {
    "title": "Registering templates: $.templates()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "`$.templates()` is used to register or compile templates. See *[Using templates](#compiletmpl)* for an overview, and simple examples.\n\nThis topic provides more details."
      },
      {
        "_type": "para",
        "title": "Simple scenarios",
        "text": "`$.templates(...)` is powerful and flexible. You can use it for many scenarios, including the following:\n- Compile a template from a string\n- Get a template object for a template declared in a script block\n- Register a template (from either a string or a script block declaration) as a *named template*\n- Get a template object for a previously registered *named template*\n- On Node.js: Get a template object for a template declared as a file on the file-system (see *[File-based templates on Node.js](#node/filetmpls)*).",
        "anchor": "$.templates"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.templates(...)",
        "name": "templates",
        "object": "$",
        "method": true,
        "tag": false,
        "returns": "Compiled template object",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "markupOrSelector",
                "type": "string",
                "optional": false,
                "description": "A markup string or a selector for a template declaration script block"
              }
            ],
            "sections": [],
            "example": "var myTemplate = $.templates(myMarkupString);",
            "description": "Compile a template from a string or selector, and return the template object"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "name",
                "type": "string",
                "optional": true,
                "description": "Name for the registered template"
              },
              {
                "_type": "param",
                "name": "markupOrSelector",
                "type": "string",
                "optional": false,
                "description": "A markup string or a selector for a template declaration script block"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.templates(\"myTemplateName\", myMarkupString);",
            "description": "Register a named template from a string or selector"
          }
        ],
        "description": "Create one or more compiled templates &ndash; optionally registered as named templates",
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
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample"
        },
        "sections": [
          {
            "_type": "code",
            "title": "",
            "code": "var myTmpl = $.templates(\"<label>Name:</label> {{:name}}\");\n\nvar html = myTmpl.render(person);\n"
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n",
        "code": "var myTmpl = $.templates(\"<label>Name:</label> {{:name}}\");\n\nvar person = {name: \"Robert\"};\n\nvar html = myTmpl.render(person);\n\n$(\"#peopleList\").html(html);",
        "title": "Compile a template from a string",
        "jsrJsvJqui": "jsr",
        "height": "40"
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
            "text": "```jsr\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n ...\n</script>\n```\n\n```js\nvar myTmpl = $.templates(\"#personTemplate\");\n\nvar html = myTmpl.render(person);\n```"
          }
        ],
        "title": "Get template object for script block template",
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>",
        "code": "var myTmpl = $.templates(\"#personTemplate\");\n\nvar person = {name: \"Robert\"};\n\nvar html = myTmpl.render(person);\n\n$(\"#peopleList\").html(html);",
        "height": "40",
        "jsrJsvJqui": "jsr"
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
            "code": "$.templates(\"personTmpl\", \"<label>Name:</label> {{:name}}\");\n\nvar html = $.render.personTmpl(person);\n"
          }
        ],
        "code": "$.templates(\"personTmpl\", \"<label>Name:</label> {{:name}}\");\n\nvar person = {name: \"Robert\"};\n\nvar html = $.render.personTmpl(person);\n\n$(\"#peopleList\").html(html);",
        "html": "<div id=\"peopleList\"></div>",
        "height": "40",
        "title": "Register named template from a string",
        "anchor": "namedfromstring",
        "jsrJsvJqui": "jsr"
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
            "code": "$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar html = $.render.personTmpl(person);\n"
          }
        ],
        "code": "$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar person = {name: \"Robert\"};\n\nvar html = $.render.personTmpl(person);\n\n$(\"#peopleList\").html(html);",
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>",
        "title": "Register named template from script block",
        "height": "40",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "Register multiple templates in one call",
        "text": "You can register multiple <em>named templates</em> in one call to `$.templates()` as follows:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.templates(namedTemplates)",
        "name": "",
        "object": "",
        "method": false,
        "tag": false,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "namedTemplates",
                "type": "object",
                "optional": false,
                "description": "Object (hash) of keys (name of template) and values (markup string, selector, or templateOptions object)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.templates({\n  personTmpl: \"#personTemplate\",\n  labelTmpl: \"&lt;label>Name:&lt;/label>\"\n});",
            "description": "Register multiple named templates"
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
        "sectionTypes": {
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
            "text": "```jsr\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{include tmpl=\"labelTmpl\"/}} {{:name}}\n</script>\n```\n\n```js\n$.templates({\n  personTmpl: \"#personTemplate\",\n  labelTmpl: \"<label>Name:</label>\"\n});\n\nvar html = $.render.personTmpl(person);\n```"
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{include tmpl=\"labelTmpl\"/}} {{:name}}\n</script>",
        "code": "$.templates({\n  personTmpl: \"#personTemplate\",\n  labelTmpl: \"<label>Name:</label>\"\n});\n\nvar person = {name: \"Robert\"};\n\nvar html = $.render.personTmpl(person);\n\n$(\"#peopleList\").html(html);",
        "title": "Registering multiple templates",
        "height": "40",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "Get a template object for a named template",
        "text": "You can get the template object for a previously registered *named template* as follows:\n\n```js\nvar myTemplate = $.templates.myTemplateName; // or $.templates[\"myTemplateName\"]\n```"
      },
      {
        "_type": "para",
        "title": "Unregister a named template",
        "text": "To unregister a previously registered <em>named template</em>, pass `null` to `$.templates()`:\n\n```js\n$.templates(\"myTemplateName\", null);\n// Named template \"myTemplateName\" is no longer registered\n```"
      },
      {
        "_type": "para",
        "title": "Advanced scenarios: Associating private resources with templates",
        "text": "<em>$.templates()</em> can also be used for the following more advanced scenarios:\n\n- Compile a template, (or multiple templates) along with specified resources to be available only within that template\n- Compile one or more templates to be added to the set of private resources of another (already compiled) template\n\nYou can use `$.templates()` to compile or register not only a template, but in addition some <em>helpers</em>, <em>converters</em>, <em>custom tags</em> or nested <em>sub-templates</em>, to be made available to the new template as private resources.\n\nNote that as an alternative you can register resources (<em>helpers</em>, <em>converters</em>, <em>custom tags</em> or <em>templates</em>) globally, using <a href=\"#helpers\">`$.views.helpers()`</a>, <a href=\"#converters\">`$.views.converters()`</a>, <a href=\"#tags\">`$.views.tags()`</a>, or <a href=\"#d.templates@$.templates\">`$.templates()`</a> -- rather than making them private to the template that needs to reference them."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.templates(...) &mdash; associating resources",
        "name": "templates",
        "object": "$",
        "method": true,
        "tag": false,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "templateOptions",
                "type": "object",
                "optional": false,
                "description": "An options object with a markup property, and optionally other declared resources (converters, helpers, etc.)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "var myTmpl = $.templates({\n  markup: \"...\",\n  helpers: {...},\n  tags: {...}\n  ...\n});",
            "description": "Compile a template, along with specified resources to be available only within this template"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "name",
                "type": "string",
                "optional": true,
                "description": "Name for the registered template"
              },
              {
                "_type": "param",
                "name": "templateOptions",
                "type": "object",
                "optional": false,
                "description": "An options object with a markup property, and optionally other declared resources (converters, helpers, etc.)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.templates(\"myTmpl\", {\n  markup: \"...\",\n  helpers: {...},\n  tags: {...}\n  ...\n});",
            "description": "Register a named template, along with specified resources available only within that template"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "namedTemplates",
                "type": "object",
                "optional": false,
                "description": "Object (hash) of keys (name of template) and values (markup string, selector, or templateOptions object)"
              },
              {
                "_type": "param",
                "name": "parentTemplate",
                "type": "object or string",
                "optional": true,
                "description": "Owner template - to which this/these template(s) are being added as private resources"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.templates(namedTemplates, parentTemplate);",
            "description": "Register named templates as private resources for a 'parent template'"
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
        },
        "anchor": "resources"
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
            "text": "A converter and a helper are registered as private resources for the `personTmpl` named template.\n\n```js\n$.templates(\"personTmpl\", {\n  markup: \"#personTemplate\",\n  converters: {\n    upper: function(val) {return val.toUpperCase();}\n  },\n  helpers: {\n    append: function(a, b) {return a + b;}\n  }\n});\n```\n\nThey are accessed within the `personTmpl`\n\n```jsr\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{upper:~append(\"Mr \", name)}}\n</script>\n```"
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{upper:~append(\"Mr \", name)}}\n</script>",
        "code": "// Register a template along with a converter and a helper that it will use.\n// These resources are private to the template, rather than being registered\n// globally using $.views.converters or $.views.helpers\n$.templates(\"personTmpl\", {\n  markup: \"#personTemplate\",\n  converters: {\n    upper: function(val) {return val.toUpperCase();}\n  },\n  helpers: {\n    append: function(a, b) {return a + b;}\n  }\n});\n\nvar person = {name: \"Robert\"};\n\nvar html = $.render.personTmpl(person);\n\n$(\"#peopleList\").html(html);",
        "title": "Register a named template along with specified resources",
        "height": "40",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "Adding templates as private resources for a parent template",
        "text": "You can pass in an existing template as an additional `parentTemplate` parameter, on  <em>any</em> call to  `$.templates(...)`. In that way the template you are registering becomes a 'private template resource' for the `parentTemplate`.\n\nHere is an example:"
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
            "code": "$.templates(\"labelTmpl\", \"<label>Name: </label>\", personTmpl);\n"
          }
        ],
        "code": "var personTmpl = $.templates(\"#personTemplate\");\n\n$.templates(\"labelTmpl\", \"<label>Name: </label>\", personTmpl);\n\nvar person = {name: \"Robert\"};\n\nvar html = personTmpl.render(person);\n\n$(\"#peopleList\").html(html);",
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{include tmpl=\"labelTmpl\"/}} {{:name}}\n</script>",
        "title": "Add a \"labelTmpl\" template resource as a 'sub template' &ndash; a private resource for an existing \"personTemplate\"",
        "height": "40",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "compiletmpl",
            "label": "Using templates"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/composition/sub-tmpl",
            "label": "Sample: sub-templates"
          },
          {
            "_type": "topic",
            "hash": "rendertmpl",
            "label": "Render a template"
          }
        ]
      }
    ]
  },
  "jsrregister": {
    "title": "Register helpers, converters, tags...",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "converters",
            "label": "$.views.converters()"
          },
          {
            "hash": "tags",
            "label": "$.views.tags()"
          },
          {
            "hash": "helpers",
            "label": "$.views.helpers()"
          }
        ]
      }
    ]
  },
  "tags": {
    "title": "Registering custom tags: $.views.tags()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "What is a custom tag?",
        "text": "JsRender custom tags are named tags `{{myTag ...}}`, which you can register, and then use in your templates.\n\nA tag renders itself as part of the template output. You determine how it renders, generally by providing either a <em>render</em> function or a template, when you declare your custom tag.\n\nThe render function, or the template, can access both named parameters (<em>props</em>) and unnamed parameters (<em>args</em>), [as in](#tagsyntax@tagparams):\n\n```jsr\n{{myTag arg0 arg1 namedProp1=xxx namedProp2=yyy}} ... {{/myTag}}\n```\n\nIn fact it can also access the current data item -- or even the whole hierarchy of views and data...\n\n***Note:*** When you also use JsViews, custom tags acquire a whole new dimension. &ndash; They become <em>tag controls</em>, and you can build rich and complex single page apps cleanly and simply using custom tag controls -- following an MVP or MVVM coding pattern. "
      },
      {
        "_type": "para",
        "title": "<b>API: $.views.tags(name, tagFn)</b>",
        "text": "To register a custom tag, you call the `$.views.tags(...)` API -- with four alternative signatures:\n- `$.views.tags(\"myTag\", tagOptions);` -- where the properties of the `tagOptions` object will typically include a `render: tagFn` (specifying a render method), and/or a `template: markupString` (specifying a template to be rendered)\n- `$.views.tags(\"myTag\", tagFn);` -- simplified form, when the only option being specified is a render method\n- `$.views.tags(\"myTag\", tagTemplate);` -- simplified form, when the only option being specified is a template markup string\n- `$.views.tags(namedTags);` -- where namedTags is a hash, declaring multiple custom tags\n"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "",
        "name": "tags",
        "object": "$.views",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "name",
                "type": "string",
                "optional": false,
                "description": "name of tag - to be used in template markup: <code>{{<b>name</b> ...}}</code>"
              },
              {
                "_type": "param",
                "name": "tagOptions",
                "type": "object",
                "optional": false,
                "description": "A tagOptions object with a render method and/or a template property, and optionally other properties or methods"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.tags(\"mytag\", {\n  render: function(...) {...},\n  template: ...\n});\n\n{{mytag ...}} ... {{/mytag}}",
            "description": "Register a custom tag using a tagOptions object"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "name",
                "type": "string",
                "optional": false,
                "description": "name of tag - to be used in template markup: <code>{{<b>name</b> ...}}</code>"
              },
              {
                "_type": "param",
                "name": "tagFn",
                "type": "function",
                "optional": false,
                "description": "Tag function. Returns the rendered tag"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.tags(\"mytag\", function(...) {\n  ...return rendered content\n});\n\n{{mytag ...}} ... {{/mytag}}",
            "description": "Register a simple 'render' function as a custom tag"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "name",
                "type": "string",
                "optional": false,
                "description": "name of tag - to be used in template markup: <code>{{<b>name</b> ...}}</code>"
              },
              {
                "_type": "param",
                "name": "tagTemplate",
                "type": "string",
                "optional": false,
                "description": "A string containing markup (template) to be rendered by the tag"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.tags(\"mytag\", \"templateMarkup...\");\n\n{{mytag ...}} ... {{/mytag}}",
            "description": "Register a simple template string as a custom tag"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "namedTags",
                "type": "object",
                "optional": false,
                "description": "Object (hash) of keys (name of tag) and values (render function, template string, or tagOptions object)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.tags({\n  myTag1: {\n    render: function(val) {...},\n    template: ...\n  },\n  myTag2: function(val) {...},\n  myTag3: tag3TemplateString,\n});",
            "description": "Register multiple custom tags"
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
        "sectionTypes": {
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
            "text": "The function is the <em>render</em> method for the tag"
          },
          {
            "_type": "code",
            "title": "Declaring the custom tag",
            "code": "function renderBoldP(value) {\n  return \"<p><b>\" + value + \"</b></p>\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);"
          },
          {
            "_type": "template",
            "title": "Using the tag",
            "markup": "This is the title:{{boldp title /}}"
          }
        ],
        "title": "1 - Simple custom tag using just a function",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  This is the title:{{boldp title /}}\n</script>",
        "code": "function renderBoldP(value) {\n   return \"<p><b>\" + value + \"</b></p>\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "80",
        "jsrJsvJqui": "jsr",
        "anchor": "sample1"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>Note:</em> the `this` pointer within the tag render function is the instance of the tag, and can be used in more advanced usage, as in the next two examples:"
      },
      {
        "_type": "para",
        "title": "Wrapping block content using a function-based custom tag",
        "text": "First of all -- what if we want our tag to be used as a block tag, and to render itself by wrapping the rendered block content with the <em>'bold p'</em> html -- `<b><p>...</p></b> `as in:\n\n```jsr\n{{boldp}}\n  This is inside our block content:<br/>\n  <em>{{:title}}</em>\n{{/boldp}}\n```"
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
            "text": "To render the block content, we call `this.tagCtx.render(val)`:\n\n```js\nfunction renderBoldP(val) {\n   return \"<p><b>\" + this.tagCtx.render(val) + \"</b></p>\";\n}\n```"
          }
        ],
        "title": "2 - Rendering block content from a custom tag function",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  {{boldp}}\n    This is inside our block content:<br/>\n    <em>{{:title}}</em>\n  {{/boldp}}\n</script>",
        "code": "function renderBoldP(val) {\n   return \"<p><b>\" + this.tagCtx.render(val) + \"</b></p>\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "80",
        "jsrJsvJqui": "jsr",
        "anchor": "sample2"
      },
      {
        "_type": "para",
        "title": "",
        "text": "As well as calling the `render()` method of `this.tagCtx`, you can access `this.tagCtx.args`, `this.tagCtx.props`, `this.tagCtx.view.data` and more...\n\nThe `tagCtx.args` are the unnamed parameters. So in this example, there are two of them:\n\n```jsr\n{{someTag title name}}\n```\n\nIn addition to being accessible as `tagCtx.args`, unnamed parameters are also passed directly as parameters to the render method (if your tag is using one):\n\n```js\nfunction someTagRenderMethod(title, name) {\n  // Here, this.tagCtx.args[1] and the name parameter are the same thing\n}\n```\n\nNow here is an example which has one unnamed parameter and two named parameters. You can access named parameters from `tagCtx.props`:\n\n```jsr\n{{range members start=2 end=4}}\n```\n\nWe'll use that in our third sample, to show accessing properties from the render function of the tag:"
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
            "text": "This sample defines a `{{range}}` tag which iterates over an array which you pass as (unnamed) parameter. It also allows you to set named parameters `start` and `end`, to determine the range of iteration. (See also the <a href=\"#samples/tag-controls/range\">range</a> sample, for a more advanced implementation of a similar custom tag.)\n\nYou call it like this:\n\n```jsr\n{{range members start=1 end=2}}\n ...\n{{/range}}\n```\n\nAnd the render function code accesses context to get at those named and unnamed parameters... :\n\n```js\n$.views.tags(\"range\", function(array) {\n  ...\n  var start = this.tagCtx.props.start,\n  ...\n  // Render tag content, for this data item\n  ret += this.tagCtx.render(array[i]);\n  ...\n```"
          }
        ],
        "code": "$.views.tags(\"range\", function(array) {\n  var ret = \"\",\n    start = this.tagCtx.props.start,\n    end = this.tagCtx.props.end;\n  for (var i = start; i <= end; i++) {\n    // Render tag content, for this data item\n    ret += this.tagCtx.render(array[i]);\n  }\n  return ret;\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <p><b>{{:title}}</b></p>\n  <ul>\n    {{range members start=1 end=2}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n</script>",
        "height": "120",
        "title": "3 - Accessing tagCtx properties from the tag render function",
        "jsrJsvJqui": "jsr",
        "anchor": "sample3"
      },
      {
        "_type": "para",
        "title": "Using a tag template instead of a render function",
        "text": "If the tag definition includes a template, but no render method, then the template will be used to render the tag.\n\nLet's re-implement all three examples above using custom tags which use templates instead of render functions."
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
            "title": "Declaring the custom tag",
            "text": "```js\n$.views.tags(\"boldp\", {\n  template: \"<p><b>{{:~tag.tagCtx.args[0]}}</b></p>\"\n});\n```\n\nNote that since we are only declaring a `template` option, we could equivalently have used the simplified form:\n\n```js\n$.views.tags(\"boldp\", \"<p><b>{{:~tag.tagCtx.args[0]}}</b></p>\");\n```\n\nAs you see, the template is accessing the unnamed parameter `tagCtx.args[0]`.\n\nThe result is identical to the [other implementation](#tags@sample1) using a function. You call it just the same:\n\n```jsr\n{{boldp title /}}\n```"
          }
        ],
        "code": "$.views.tags(\"boldp\", {\n  template: \"<p><b>{{:~tag.tagCtx.args[0]}}</b></p>\"\n});\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  {{boldp title /}}\n</script>",
        "title": "1b - Simple custom tag using just a template",
        "height": "60",
        "jsrJsvJqui": "jsr"
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
            "text": "To render block content, we use `{{include tmpl=~tag.tagCtx.content/}}`\n\n```js\ntemplate: \"<p><b>{{include tmpl=~tag.tagCtx.content/}}</b></p>\"\n```\n\nHere we are accessing the `content` property on the `tagCtx`, which provides a compiled template for the block content.\n\nIt is also made available as a `content` property on the `view` object -- and can be accessed from within a template using `#content` -- which is an example of a `view path` -- equivalent to `#view.content`. You can try out that alternative syntax by choosing <em>Try it</em> and changing the template above to `<p><b>{{include tmpl=#content/}}</b></p>`.\n\nAgain, the result is identical to the [other implementation](#tags@sample2) using a function. You call it just the same:\n\n```jsr\n{{boldp}}\n  This is the title:<br/>\n  <em>{{:title}}</em>\n{{/boldp}}```"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  {{boldp}}\n    This is the title:<br/>\n    <em>{{:title}}</em>\n  {{/boldp}}\n</script>",
        "code": "$.views.tags(\"boldp\", {\n  template: \"<p><b>{{include tmpl=~tag.tagCtx.content/}}</b></p>\"\n});\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "80",
        "title": "2b - Rendering block content from a custom tag template",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Finally let's re-implement the third example using just a template. \n\nEven this example can be implemented as a custom tag which has no code at all. -- Just a template, which is also able to access all the context that we were able to access from code in our `render()` function above.\n\nThis illustrates the power of declarative templates..."
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
            "text": "The template accesses the same context as the function code above, to get at those named and unnamed parameters... :\n\n```jsr\n{{for ~tag.tagCtx.args[0]}}\n  {{if #index >= ~tag.tagCtx.props.start && #index <= ~tag.tagCtx.props.end}}\n    {{include tmpl=~tag.tagCtx.content/}}\n  {{/if}}\n{{/for}}\n```\n\nThen after filtering for the items within the chosen range, using nested `{{for}}{{if}` tags, it renders the original block content for those items using `{{include tmpl=~tag.tagCtx.content/}}` (or you could use the equivalent `{{include tmpl=#content/}}`).\n\nAgain, the result is identical to the [other implementation](#tags@sample3) using a function. You call it just the same:\n\n```jsr\n{{range members start=1 end=2}}\n ...\n{{/range}}\n```"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <p><b>{{:title}}</b></p>\n  <ul>\n    {{range members start=1 end=2}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n</script>",
        "code": "$.views.tags(\"range\", {\n  template: \n    \"{{for ~tag.tagCtx.args[0]}}\" +\n      \"{{if #index >= ~tag.tagCtx.props.start && #index <= ~tag.tagCtx.props.end}}\" +\n        \"{{include tmpl=~tag.tagCtx.content/}}\" +\n      \"{{/if}}\" +\n    \"{{/for}}\"\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "120",
        "title": " 3b - Accessing more context from the tag template",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "Custom tags using both a render function <b>and</b> a template",
        "text": "If there is both a template and a render method, then the template will only be used if the render method returns <em>undefined</em>\n\nLet's take our `{{range}}` example using a render function, but provide a template which will be used as \"fallback\" rendering for the tag in the case when there are no items to render in the chosen range:"
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
            "text": "First we will change the original code to test whether the item exists in the array, before rendering the block content.\n\nAnd secondly, we will make sure that when there is an item we do render the block content and not the template. So we call `this.tagCtx.content.render(array[i])`, rather than `this.tagCtx.render(array[i])`.\n\nThat's because `this.tagCtx.render(...)` will actually look to see if there is template associated with the tag, (either a template on the tag definition, or a `tmpl` property on the tag) -- in which case it will render that template and not the block content... \n\n```js\nfor (var i = start; i <= end; i++) {\n  if (array[i]) {\n    // Render tag block content, for this data item\n    ret += this.tagCtx.content.render(array[i]);\n  }\n}\n```\n\nFinally, if there are no items to render, we will return undefined, so the tag will fall back on the template rendering.\n\n```js\nreturn ret || undefined;\n```\n\nAnd here is the \"fallback\" template:\n\n```jsr\ntemplate: \"<li>Nothing to render</li>\"\n```"
          }
        ],
        "code": "$.views.tags({\n  range: {\n    render: function(array) {\n      var ret = \"\",\n        start = this.tagCtx.props.start,\n        end = this.tagCtx.props.end;\n      for (var i = start; i <= end; i++) {\n        if (array[i]) {\n          // Render tag block content, for this data item\n          ret += this.tagCtx.content.render(array[i]);\n        }\n      }\n      return ret || undefined;\n    },\n    template: \"<li>Nothing to render</li>\"\n  }\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\n",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <h3>Members 2 to 4</h3>\n  <ul>\n    {{range members start=1 end=3}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n\n  <h3>Members 5 to 8</h3>\n  <ul>\n    {{range members start=4 end=7}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n</script>",
        "height": "206",
        "jsrJsvJqui": "jsr",
        "title": "A render() function and a template as \"fallback\""
      },
      {
        "_type": "para",
        "title": "Adding tags as private resources for a parent template",
        "text": "You can pass in an existing template as an additional `parentTemplate` parameter, on  <em>any</em> call to  `$.views.tags(...)`.\n\nIn that way the tag (or tags) you are registering become 'private tag resources' for the `parentTemplate`, rather than being registered globally:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "",
        "name": "tags",
        "object": "$.views",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "Add one or more tags as private resources for a parent template",
            "params": [
              {
                "_type": "param",
                "name": "namedTags",
                "type": "object",
                "optional": false,
                "description": "Object (hash) of keys (name of tag) and values (render function or tagOptions)"
              },
              {
                "_type": "param",
                "name": "parentTemplate",
                "type": "object or string",
                "optional": true,
                "description": "Owner template &ndash; to which this/these tag(s) are being added as private resources"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.tags({\n  myTag1: ...,\n  myTag2: ...\n}, parentTemplate);",
            "description": "Add multiple tags as resources, to a parent template"
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
        "title": "Unregistering tags",
        "text": "To unregister a previously registered tag, pass `null` to `$.views.tags()`:\n\n```js\n$.views.tags(\"myTag\", null);\n// Tag \"myTag\" is no longer registered\n```"
      },
      {
        "_type": "para",
        "title": "Custom tags and 'tag controls'",
        "text": "If you use JsViews, your custom tag can be developed into a fully functional <em>tag control</em>, with its own life-cycle, properties and methods, etc. It can be used as a <em>presenter</em> according to the MVP pattern."
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "samples/jsr/tags",
            "label": "Samples: JsRender custom tags"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls",
            "label": "Samples: JsViews tag controls"
          }
        ]
      }
    ]
  },
  "jsrobjects": {
    "title": "JsRender objects",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "viewsobject",
            "label": "$.views object"
          },
          {
            "hash": "templateobject",
            "label": "template object"
          },
          {
            "hash": "viewobject",
            "label": "view object"
          },
          {
            "hash": "tagobject",
            "label": "tag object"
          },
          {
            "hash": "viewcontextobject",
            "label": "view context object"
          },
          {
            "hash": "tagcontextobject",
            "label": "tag context object"
          }
        ]
      }
    ]
  },
  "viewsobject": {
    "title": "$.views object",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "settingsobject",
            "label": "$.views.settings object"
          },
          {
            "hash": "subobject",
            "label": "$.views.sub object"
          }
        ]
      }
    ]
  },
  "settingsobject": {
    "title": "$.views.settings object",
    "path": "",
    "sections": []
  },
  "subobject": {
    "title": "$.views.sub object",
    "path": "",
    "sections": []
  },
  "templateobject": {
    "title": "template object",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "- link function(to, from, context, noIteration, parentView, prevNode, nextNode) {\n- render function(data, context, noIteration, parentView, key, onRender) {\n- unlink function(to, from) {\n- markup\n"
      }
    ]
  },
  "viewobject": {
    "title": "The <em>view</em> object",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender templates render as a [*view hierarchy*](#views)."
      },
      {
        "_type": "para",
        "title": "A <b>view object</b> has the following properties and methods:",
        "text": "- [type property](#viewobject@type)\n- [data property](#viewobject@data)\n- [parent property](#viewobject@parent)\n- [index property](#viewobject@index)\n- [getIndex() method](#viewobject@getIndex)\n- [get(type) method](#viewobject@get)\n- [content property](#viewobject@content)\n- [other properties (tmpl, views, ctx, tag)](#viewobject@other)\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "***Note:** When using JsViews [`.link()`](#jsvlinktmpl) method rather than JsRender's [`.render()`](#rendertmpl) method, the `view` objects have additional methods:*\n- *[refresh()](#jsvviewobject@refresh)*\n- *[contents()](#jsvviewobject@contents)*\n- *[childTags()](#jsvviewobject@childtags)*\n- *[nodes()](#jsvviewobject@nodes)*\n\n*See [JsViews `view` object](#jsvviewobject).*\n\n\n\n"
      },
      {
        "_type": "para",
        "title": "Accessing view objects",
        "text": "The properties of the current view are accessed *declaratively* in a template using *[view paths](#paths)* -- such as `#parent` for the `view.parent` property.\n\nAccessing `view` objects *programmatically* is less common in JsRender, but can be useful for example:\n\n- in a helper function, `~myHelper()`, where the `this` pointer is the current view\n- in the render() method of a custom tag -- using `this.tagCtx.view`\n\n*Note:* In JsViews, accessing `view` objects programmatically is very common, thanks to the [`$.view()`](#jsv.d.view) method. For example in a click handler, `$.view(this);` returns the corresponding `view` object.<br/><br/>\n\n\n### Properties and methods:\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "The type property:",
        "text": "***view.type**: string corresponding to the type of view:*\n\n- `\"data\"` -- for the top-level view from a `render()` call\n- `\"array\"` or `\"item\"` -- from `{{for array}}` or `{{props object}}` (see *[array and item views](#views@itemview)*)\n-  `\"someTag\"` -- for the view from `{{someTag}}...{{someTag}}` -- for example: `\"include\"`, `\"if\"`, `\"for\"`, `\"props\"`, `\"mytag\"`...\n",
        "anchor": "type"
      },
      {
        "_type": "para",
        "title": "The data property:",
        "text": "***view.data**: the current data context for the view* -- as in:\n\n```js\nvar team = view.data.team; // The team property of the current data object\n```\n\n`view.data` can be accessed declaratively in templates as `#data`-- as in:\n\n```jsr\n{{:#data}}\n{{>#data.description()}}\n{{for #data.team.members}}...\n```\n\nBut note that since `#data`, the current data context, is the starting point for *[data paths](#paths)* within templates, the above expressions with `#data' can be abbreviated to:\n\n```jsr\n{{:}}\n{{>description()}}\n{{for team.members}} etc.\n```\n\n ",
        "anchor": "data"
      },
      {
        "_type": "para",
        "title": "The parent property:",
        "text": "***view.parent**: the parent view* (used to step up through views in the hierarchy).\n\n```js\nvar index = view.parent.index; // The index of the parent view\n```\n\nAccessed declaratively as `#parent`:\n\n```jsr\n{{>#parent.data.title()}}...  {{!-- accessing data of parent view - view.parent --}}\n{{if #parent.parent.parent.data.teams.length > 1}}... {{!-- accessing data of view.parent.parent... --}}\n```\n\n(See also *[accessing parent data](#views@parent-data)*)",
        "anchor": "parent"
      },
      {
        "_type": "para",
        "title": "The index property:",
        "text": "***view.index**: the view index* (only available on [item views](#views@itemview)).\n\n```js\nvar index = view.index; // The index of the view (for \"item\" views - otherwise an 'error string')\n```\n\nAccessed declaratively as `#index`:\n\n```jsr\n{{if #index > 2}} {{!-- we are in an \"item\" view --}}\n  {{:#parent.index}}... {{!-- \"item\" view index (- the parent - since we are inside the 'ifView') --}}\n{{/if}}\n```\n\n**Note:** On non-\"item\" views, accessing the index property returns the error message prompt: *\"For #index in nested block use #getIndex().\"*",
        "anchor": "index"
      },
      {
        "_type": "para",
        "title": "The getIndex() method:",
        "text": "***view.getIndex()**: get the index of current \"item\" view* (steps up to nearest [item view](#views@itemview), and returns the index).\n\n```js\nvar index = view.getIndex(); // The index of the view\n```\n\nAccessed declaratively as `#getIndex()`:\n\n```jsr\n{{for teams}}\n  {{for members}}\n    {{if #getIndex() > 0}} {{!-- index of member (- this view is an \"item\" view for member) --}}\n      {{:#getIndex()}} {{!-- index of member --}}\n    {{/if}}\n\n    {{:#parent.getIndex()}}... {{!-- index of team (-nearest \"item\" view of parent is team \"item\" view) --}}\n  {{/for}}\n{{/for}}\n```\n",
        "anchor": "getIndex"
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
            "text": "If index is a multiple of 3, render new tr, and format index in bold.\n\nUse `getIndex()` to get *item* index from within *if* block.\n\n```jsr\n<table><tbody><tr>\n\n{{for members}}\n  {{if #index===0}}\n    <td><b>1:</b>\n  {{else #index%3===0}}\n    </tr><tr><td><b>{{:#getIndex()+1}}:</b>\n  {{else}}\n    <td>{{:#getIndex()+1}}:\n  {{/if}}\n  {{:name}}\n  </td>\n{{/for}}\n\n</tr></tbody></table>\n```"
          }
        ],
        "markup": "<table><tbody><tr>\n\n{{for members}}\n  {{if #index===0}}\n    <td><b>1:</b>\n  {{else #index%3===0}}\n    </tr><tr><td><b>{{:#getIndex()+1}}:</b>\n  {{else}}\n    <td>{{:#getIndex()+1}}:\n  {{/if}}\n  {{:name}}\n  </td>\n{{/for}}\n\n</tr></tbody></table>",
        "data": {
          "title": "The A Team",
          "members": [
            {
              "name": "Jeff"
            },
            {
              "name": "Jack"
            },
            {
              "name": "Jim"
            },
            {
              "name": "Jo"
            },
            {
              "name": "Joanna"
            },
            {
              "name": "James"
            }
          ]
        },
        "title": "getIndex() &ndash; iterating + grouping by 3",
        "jsrJsvJqui": "jsr",
        "height": "110"
      },
      {
        "_type": "para",
        "title": "The get(type) method:",
        "text": "***view.get(type)**: returns the nearest parent view of type `type`.*\n\n```js\nvar arrayView = view.get(\"array\"); // Step through parents to nearest \"array\" view\nvar arrayLength = arrayView.data.length; // Get length of data array\n```\n\nAccessed declaratively as `#get(...)`:\n\n```jsr\n{{for members}}\n  {{if #index+1 === #get(\"array\").data.length}}\n    The last member in the list\n  {{/if}}\n{{/for}}\n```\n\n**Note:** An additional signature is available: ***view.get(true, type)*** (for advanced scenarios) -- which steps *down* through descendant views (depth first traversal) and returns *the first descendant view of type `type`*.\n\n```jsr\n{{for members}}\n  {{:name}}\n{{/for}}\n{{:#get(true, \"item\").data.name}} {{!-- get the name of the first member --}}\n```\n\nIn using this API it is sometimes necessary to be aware of the processing order. For example in the sample code above, placing `{{:#get(true, \"item\")...}}` before `{{for members}}` will not return any \"item\" view, since the `{{:get(...)...}}` is being evaluated during the rendering, and the \"item\" views for `{{for ...}}` will not yet have been rendered. (View instantiation is part of rendering, which is a single-pass process.) \n\n",
        "anchor": "get"
      },
      {
        "_type": "para",
        "title": "The content property (for views which wrap inline block content):",
        "text": "***view.content**: template corresponding to the inline block content.*\n\nAccessed declaratively as `#content`:\n\nIn the [wrapping content](#tagsyntax@wrap) scenarios, the tag:\n\n```jsr\n{{sometag ... tmpl=\"externalTmpl\"}}...{{/sometag}}\n```\n\nor\n\n```jsr\n{{mytag}}...{{/mytag}}\n```\n\nwill render with a view which has both a `view.tmpl` template property and a `view.content` template property.\n\nThe `view.content` template corresponds to the inline block content, and is used for wrapping that content as in:\n\n```jsr\nbefore {{include tmpl=#content /}} after\n```\n",
        "anchor": "content"
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
            "text": "*mytag:* \n\n```js\n$.views.tags(\n  \"mytag\",\n  \"startTag {{include tmpl=#content /}} endTag\"\n);\n```\n\n*externalTmpl:* \n\n```js\n$.templates(\n  \"externalTmpl\",\n  \"startTmpl {{include tmpl=#content /}} endTmpl\"\n);\n```\n\n*Template:* \n\n```jsr\n{{mytag}}\n  <div>inside mytag</div>\n{{/mytag}}\n\n<hr/>\n\n{{mytag tmpl=\"externalTmpl\"}}\n  <div>inside mytag with external tmpl</div>\n{{/mytag}}\n```\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n{{mytag}}\n  <div>inside mytag</div>\n{{/mytag}}\n\n<hr/>\n\n{{mytag tmpl=\"externalTmpl\"}}\n  <div>inside mytag with external tmpl</div>\n{{/mytag}}\n</script>\n",
        "code": "$.views.tags(\n  \"mytag\",\n  \"startTag {{include tmpl=#content /}} endTag\"\n);\n\n$.templates(\n  \"externalTmpl\",\n  \"<div><em>startTmpl {{include tmpl=#content /}} endTmpl</em></div>\"\n);\n\n$(\"#result\").html(\n  $.templates(\"#myTmpl\").render()\n);\n",
        "jsrJsvJqui": "jsr",
        "title": "view.content &ndash; wrapping content",
        "height": "214"
      },
      {
        "_type": "para",
        "title": "Other view object properties:",
        "text": "The following additional properties of the `view` object are used by JsRender for processing templates:\n\n- *tmpl*: the template used to render the view\n- *views*: the child views in the view hierarchy\n- *ctx*: object (hash) with the named contextual helpers/template parameters for this view\n- *tag*: the `\"mytag\"` view rendered by a custom tag `{{mytag ...}}`, has a `view.tag` property -- the instance of the `mytag` tag object.",
        "anchor": "other"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsvviewobject",
            "label": "JsViews view object"
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
  "tagobject": {
    "title": "tag object",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "- childTags\tfunction(deep, tagName) {\n- contents\tfunction(deep, select) {\n- nodes\tfunction(withMarkers, prevNode, nextNode) {\n- onAfterLink\tfunction(tagCtx, linkCtx, eventArgs) {\n- onUpdate\tfunction(ev, eventArgs, tagCtxs) {\n- refresh\tfunction(sourceValue) {\n- render\tfunction(val) {\n- update\tfunction(value) {\n- ctx\t{...}\tObject\n- parent\n- tagCtx\t{...}\tObject\n- tagCtxs\t[[object Object]]\tObject, (Array)\n- tagName\tString\n\n\n\nAnd in JsViews\n\n- depends\n- ...\n"
      }
    ]
  },
  "viewcontextobject": {
    "title": "view context object",
    "path": "",
    "sections": []
  },
  "tagcontextobject": {
    "title": "tag context object",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "- render function(data, context, noIteration, parentView, key, onRender) {\n- tmpl\tfunction() {\n- args\t[]\tObject, (Array)\n- ctx\t{...}\tObject\n- index\t0\tNumber\n- params\t{...}\tObject\n- props\t{...}\tObject\n- tag\t{...}\tObject, (Tag)\n- view\t{...}\tObject\n \n"
      }
    ]
  },
  "node/browserify": {
    "title": "<em>JsRender on Node.js</em>",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "## Browserify support for JsRender and JsViews\n\n[Browserify](http://browserify.org/) lets you create modular javascript projects for the browser, using the npm `require()` pattern for packages/modules.\n"
      },
      {
        "_type": "para",
        "title": "JsRender as a Browserify module",
        "text": "After installing JsRender on the server (using `$ npm install jsrender`) it can then be included in the Browserify client-script bundle, and loaded in the browser.\n\nThere are three options for loading JsRender in the browser as a Browserify module:\n\n- Load jQuery globally (as a script tag -- so `window.jQuery` is defined), then load JsRender as a module in the Browserify client script bundle:\n  ```js\n  require('jsrender'); // Load JsRender as jQuery plugin (attached to global jQuery)\n  ```\n- Load both jQuery and JsRender as modules in the Browserify client script bundle:\n  ```js\n  var $ = require('jquery'); // Load jQuery as a module\n  require('jsrender')($);    // Load JsRender as jQuery plugin (Query instance as parameter)\n  ```\n- Load JsRender as a module in the Browserify client script bundle, without loading jQuery at all:\n  ```js\n  var jsrender = require('jsrender')(); // Load JsRender without jQuery (function call, no parameter)\n  ```\n\n***Note:*** In fact if jQuery is not defined globally, `require('jsrender')` returns a ***function***. \n\nCalling that function without a parameter then loads JsRender without jQuery (and returns the JsRender namespace). \n\nAlternatively, calling that function with a reference to a jQuery instance as parameter loads JsRender as a plugin (attached to that jQuery instance) -- and returns the jQuery instance.\n",
        "anchor": "jsrender"
      },
      {
        "_type": "para",
        "title": "Example:",
        "text": "**index.html:**\n\n```jsr\n<html><head>\n  <script src=\".../jquery-xxx.js\"></script> <!-- Load jQuery as global -->\n</head><body>\n  <div id=\"container\"></div>\n  <script src=\"bundle.js\"></script>\n</body></html>\n```\n\n**source.js:**\n\n```js\nrequire('jsrender'); // Load JsRender (jQuery is loaded as global)\nvar tmpl = $.templates('Name: {{:name}}');\nvar data = {name: 'Jo'};\nvar html = tmpl.render(data);\n$('#container').html(html);\n```\n\n**command line:**\n\n```bash\nbrowserify ./source.js > ./bundle.js\n```"
      },
      {
        "_type": "para",
        "title": "JsViews as a Browserify module",
        "text": "JsViews can also be included in the Browserify client-script bundle, and loaded in the browser.\n\nAfter installing on the server (using `$ npm install jsviews`), call:\n\n```js\nrequire('jsviews');    // Load JsViews (if jQuery is loaded globally)\n```\n\nor -- if also loading jQuery as a Browserify module, use:\n\n```js\nvar $ = require('jquery');\n...\nrequire('jsviews')($); // Load JsViews (passing local jQuery instance as a parameter)\n```",
        "anchor": "jsviews"
      },
      {
        "_type": "para",
        "title": "Loading templates as Browserify modules",
        "text": "JsRender includes a Browserify transform: `jsrender/tmplify` (see [below](#node/browserify@clientbundle)) which allows you also to include your server [file-based templates](#node/filetmpls) in the client-script bundle generated by Browserify. \n\nYou can then access the compiled templates in the browser, as modules.\n\nThe exact syntax depends on whether jQuery is loaded globally, loaded as a Browserify module, or not loaded at all.\n\n- If jQuery is loaded globally then use:\n  ```js\n  var tmpl = require('./templates/myTemplate.html');           // Load template (jQuery \n                                                               // is loaded globally)\n  var html = tmpl.render(myData);\n  ...\n  ```\n- If jQuery is loaded as a module, use:\n  ```js\n  var $ = require('jquery');\n  ...\n  var tmpl = require('./templates/myTemplate.html')($);        // Load template (local\n                                                               // jQuery as parameter)\n  var html = tmpl.render(myData);\n  ...\n  ```\n- If loading JsRender as a module, without jQuery, use:\n  ```js\n  var jsrender = require('jsrender')(); // function call -- no parameter\n  ...\n  var tmpl = require('./templates/myTemplate.html')(jsrender); // Load template (jsrender\n                                                               // namespace as parameter)\n  var html = tmpl.render(myData);\n  ...\n  ```\n\n**Note on relative paths:** The `./...` paths used to identify bundled templates are always interpreted as relative paths *relative to the location of your calling script*, which in this case is the Browserify script that created the client bundle. (Note that declaring a *templates* folder for Express or Hapi does not change the origin of these relative paths)."
      },
      {
        "_type": "para",
        "title": "Nested templates",
        "text": "Template inclusion in the bundle can be recursive, so for example if you call `require(\"./templates/myTemplate.html\");` and *myTemplate.html* includes a nested reference to another template, such as `{{include tmpl=\"./another/tmpl2.html\"/}}`, then the client-script bundle will include that template too.\n"
      },
      {
        "_type": "para",
        "title": "Generating the client bundle",
        "text": "If *source.js* includes template references such as: `var tmpl=require('./some/path/myTemplate.html')`, then Browserify generates a client script bundle which will include the referenced templates.\n\n[Browserify](http://browserify.org/) provides three different ways of generating a *bundle.js* script from a *source.js* script, and calling a transform:\n\n**Command line:**\n\n```bash\nbrowserify -t jsrender/tmplify ./source.js > ./bundle.js\n```\n\n**package.json:**\n\n```bash\n\"browserify\": {\n  \"transform\": [\n    [\"jsrender/tmplify\"]\n  ]\n}\n```\n\n**API:**\n\n```bash\nbrowserify('./source.js')\n  .transform(require('jsrender/tmplify'))\n  .bundle()\n  .pipe(fs.createWriteStream('./bundle.js'));\n```",
        "anchor": "clientbundle"
      },
      {
        "_type": "para",
        "title": "Option: extensions",
        "text": "The `jsrender/tmplify` Browserify transform uses a white-space-separated list of extensions: `\"html jsrender jsr\"`, by default. This means that when you generate a client-script bundle using the `tmplify` transform, it will treat any `.html`, `.jsrender` or `.jsr` file as a template, and will include the compiled template in the client-script bundle for rendering in the browser. \n\nYou can instead specify a different list of file extensions for templates, by using the `--extensions` or `-e` option, as in the following examples:\n\n```bash \nbrowserify -t [jsrender/tmplify --extensions 'htm jsrender'] ./source.js > ./bundle.js\n```\n\n```bash \nbrowserify -t [jsrender/tmplify -e 'htm jsrender'] ./source.js > ./bundle.js\n```\n\n```bash \n\"browserify\": {\n  \"transform\": [\n    [\"jsrender/tmplify\", {\n      \"extensions\": \"htm jsrender\"\n    }]\n  ]\n}\n```\n\n```bash \nbrowserify('./source.js')\n  .transform(require('jsrender/tmplify'), {extensions: 'htm jsrender'})\n  .bundle()\n  .pipe(fs.createWriteStream('./bundle.js'));\n```"
      },
      {
        "_type": "para",
        "title": "Including jQuery and/or JsRender/JsViews in the client-script bundle",
        "text": "When using Browserify with JsRender on Node.js, you will generally need jQuery and JsRender/JsViews in the client, to render (and optionally data-link) the templates.\n\njQuery, JsRender and JsViews are all available as npm/Browserify modules, so you can choose whether to load them globally, using a script block, or as a module. Here are three examples following alternative strategies:\n\n**Load jQuery and JsRender/JsViews globally**\n\n`$` is defined as a global variable (`window.$`, or `window.jQuery`).<br/>\nUse `require(templatePath)` to load templates as Browserify modules included in the client-script bundle, as in the following example:\n\n*index.html:*\n\n```jsr\n<script href=\".../jquery...js\"></script>\n<script href=\".../jsrender.js\"></script>\n...\n<script src=\"bundle.js\"></script>\n```\n\n*source.js:*\n\n```js\nvar myTmpl = require('./templates/myTemplate.html'); // Include compiled template in client-script bundle\nvar html = myTmpl(data); // Render using compiled template\n$('#result').html(html);\n```\n\n*command line:*\n\n```bash\nbrowserify -t jsrender/tmplify ./source.js > ./bundle.js\n```\n\nSee the *[JsRender Node Starter](https://github.com/BorisMoore/jsrender-node-starter)* project for complete examples:\n- [clientcode-hello.js](//github.com/BorisMoore/jsrender-node-starter/blob/master/public/js/clientcode-hello.js) and [layout-hello.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/layout-hello.html) using JsRender\n- [clientcode-movies.js](//github.com/BorisMoore/jsrender-node-starter/blob/master/public/js/clientcode-movies.js) and [layout-movies.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/layout-movies.html) using JsViews.\n \n**Load jQuery and JsRender/JsViews as Browserify modules**\n\nUse `var $ = require('jquery')` to load jQuery, and `require('jsrender')($)` or `require('jsviews')($)` to load JsRender/JsViews.<br/>\nUse `require(templatePath)($)` to load templates as Browserify modules included in the client-script bundle, as in the following example:\n\n*index.html:*\n\n```jsr\n...\n<script src=\"bundle.js\"></script>\n```\n\n*source.js:*\n\n```js\nvar $ = require('jquery');\nrequire('jsrender')($);\nvar myTmpl = require('./templates/myTemplate.html')($)\nvar html = myTmpl(data);\n$('#result').html(html);\n```\n\n*command line:*\n\n```bash\nbrowserify -t jsrender/tmplify ./source.js > ./bundle.js\n```\nSee:\n- [clientcode-hello-browserify.js](//github.com/BorisMoore/jsrender-node-starter/blob/master/browserify/clientcode-hello-browserify.js) and [layout-hello-browserify.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/layout-hello-browserify.html) for an example loading jQuery and JsRender as modules\n- [clientcode-hello-browserify2.js](//github.com/BorisMoore/jsrender-node-starter/blob/master/browserify/clientcode-hello-browserify2.js) and [layout-hello-browserify2.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/layout-hello-browserify2.html) for an example loading JsRender as a module (without jQuery)\n- [clientcode-movies-browserify2.js](//github.com/BorisMoore/jsrender-node-starter/blob/master/browserify/clientcode-hello-browserify2.js) and [layout-movies-browserify2.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/layout-hello-browserify2.html) for an example loading jQuery and JsViews as modules\n\n**Mixed approach: Load jQuery globally, and JsRender/JsViews as a Browserify module**\n\n`$` is defined as a global variable (`window.$` or `window.jQuery`).<br/>\nUse `require('jsrender')` or `require('jsviews')` to load JsRender/JsViews.<br/>\nUse `require(templatePath)` to load templates as Browserify modules included in the client-script bundle, as in the following example:\n\n*index.html:*\n\n```jsr\n<script href=\".../jquery...js\"></script>\n...\n<script src=\"bundle.js\"></script>\n```\n\n*source.js:*\n\n```js\nrequire('jsrender');\nvar myTmpl = require('./templates/myTemplate.html');\nvar html = myTmpl(data);\n$('#result').html(html);\n```\n\n*command line:*\n\n```bash\nbrowserify -t jsrender/tmplify ./source.js > ./bundle.js\n```\n\nSee [clientcode-movies-browserify.js](//github.com/BorisMoore/jsrender-node-starter/blob/master/browserify/clientcode-movies-browserify.js) and [layout-movies-browserify.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/layout-movies-browserify.html) for an example using JsViews.",
        "anchor": "clientscript"
      },
      {
        "_type": "para",
        "title": "Sample code",
        "text": "For running code examples using JsRender, Browserify, and the `tmplify` transform, see the *index-express-browserify.js* and *index-hapi-browserify.js* samples in the *[JsRender Node Starter](https://github.com/BorisMoore/jsrender-node-starter)* project."
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "*[Webpack support](#node/webpack)*"
      }
    ]
  },
  "node/renderfile": {
    "title": "renderFile() method",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender on Node.js provides a shortcut `renderFile` method, for convenience, to compile and render in one step:\n\n```js\nvar jsrender = require('jsrender');\n\nvar html = jsrender.renderFile('./templates/myTemplate.html', {name: \"Jim\"});\n// result: Name: Jim<br/>\n```\n"
      }
    ]
  },
  "node/filetmpls": {
    "title": "<em>JsRender on Node.js</em>",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "## File-based templates"
      },
      {
        "_type": "para",
        "title": "Defining templates as .html files",
        "text": "On Node.js, JsRender templates can be stored directly in the file system  (e.g. as `.html`, `.jsr.` or `.jsrender` files) -- for example:\n\n**Template:** *./templates/myTemplate.html* -- with contents:\n\n```jsr\nName: {{:name}}<br/>\n```\n\n**Code:** JsRender recognizes file paths (for valid relative file paths starting with `'./'`), so you can write:\n\n```js\nvar jsrender = require('jsrender');\n\nvar tmpl = jsrender.templates('./templates/myTemplate.html'); // Compile the template\n\nvar html = tmpl({name: \"Jim\"}); // Render\n// result: Name: Jim<br/>\n```\n\n**Note:** The `./...` paths are always interpreted as relative paths *relative to the location of your calling script*. Declaring a *templates* folder for Express or Hapi does not change the origin of these relative paths."
      },
      {
        "_type": "para",
        "title": "renderFile() method",
        "text": "JsRender on Node.js provides a shortcut `renderFile()` method, for convenience, to compile and render in one step:\n\n```js\nvar jsrender = require('jsrender');\n\nvar html = jsrender.renderFile('./templates/myTemplate.html', {name: \"Jim\"});\n// result: Name: Jim<br/>\n```"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "jsrender.renderFile(filepath, data)",
        "name": "renderFile",
        "object": "jsrender",
        "method": true,
        "returns": "string",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "filepath",
                "type": "string",
                "optional": false,
                "description": "Relative path to template file - starting with <b><code>'./'</code></b>"
              },
              {
                "_type": "param",
                "name": "data",
                "type": "object or array",
                "optional": true,
                "description": "The data to render. This can be any JavaScript type, including Array or Object."
              }
            ],
            "args": [],
            "sections": [],
            "example": "var jsr = require('jsrender');\nvar html = jsr.renderFile('./.../tmpl.html', data);",
            "description": "Load file-based template, compile and render against data"
          }
        ],
        "description": "Shortcut method &ndash; compile and render",
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
        "title": "Nested calls to file-based templates (composition)",
        "text": "JsRender's awareness of Node.js file paths (relative paths starting with `'./'`) means your templates can include recursive calls to other templates (partials). You don't need to register or compile those templates separately. (See also: [template composition](#tagsyntax@composition)).\n\n**Template:** *./templates/personTemplate.html*:\n\n```jsr\nName: {{:name}}<br/>Address: {{include tmpl='./templates/other/addressTemplate.jsr'}}\n```\n\n**Template:** *./templates/other/addressTemplate.jsr*:\n```jsr\nStreet: <em>{{:street}}</em>\n```\n\n**Code:** Compile and render, recursively:\n\n```js\nvar jsrender = require('jsrender');\n\nvar tmpl = jsrender.templates('./templates/personTemplate.html');\n// Compile template - and also any recursively called templates\n\nvar html = tmpl({name: \"Jim\", street: \"Main St\"});\n// result: Name: Jim<br/>Address: <em>Main St</em>\n```",
        "anchor": "composition"
      },
      {
        "_type": "para",
        "title": "Register a file-based template by name &ndash; and render it",
        "text": "For convenience you can register file-based templates by name, just as you can for [templates from strings](#d.templates@namedfromstring).\n\n```js\n// Register named template - \"myTmpl1\n$.templates(\"myTmpl1\", \"./templates/myTemplate.html\");\n\n// Render named template\nvar html = $.templates.myTmpl1(person);\n\n// Alternative syntax: var html = $.render.myTmpl1(person);\n```\n"
      },
      {
        "_type": "para",
        "title": "Automatic caching of file-based templates",
        "text": "The first time `jsrender.templates('./templates/myTemplate.html')` is called, JsRender will:\n\n - load the template file from the file system\n - compile the template\n - cache the template\n - return the compiled template\n\nThe cached template can be accessed directly as `jsrender.templates['./templates/myTemplate.html']` - and can also be deleted by calling `delete jsrender.templates['./templates/myTemplate.html']`, or `jsrender.templates('./templates/myTemplate.html', null)`\n\nOn subsequent calls, JsRender will simply:\n - return the compiled template\n\nThe caching means you can load and compile the template during server initialization, and avoid the cost of reading the file or compiling during HTTP requests:\n\n```js\njsrender.templates('./templates/myTemplate.html'); // Cache the compiled template\n\napp.get('/...', function(req, res) {\n  res.render('myTemplate', {name: \"Jim\"}); // Render previously cached template, using Express\n});\n```\n\nSimilarly when using the alternative forms for rendering templates:\n\n```js\napp.get('/...', function(req, res) {\n  var tmpl = jsrender.templates('./templates/myTemplate.html'); // Get previously cached template\n  var html = tmpl.render({name: \"Jim\"});\n  res.send(html);\n});\n```\n\nor \n\n```js\napp.get('/...', function(req, res) {\n  // Render previously cached template\n  var html = jsrender.renderFile('./templates/myTemplate.html', {name: \"Jim\"});\n  res.send(html);\n});\n```"
      },
      {
        "_type": "para",
        "title": "Using the same template on the server and in the browser",
        "text": "JsRender lets you easily use the same templates for both server and browser rendering. See *[server/browser templates](#node/server-browser)* for details on two alternative approaches, one with the `{{clientTemplate}}` tag, and the other using *Browserify*."
      }
    ]
  },
  "jsrnode": {
    "title": "<em>JsRender on Node.js</em>",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Quickstart",
        "text": "See the [JsRender Node.js Quickstart](#jsr-node-quickstart) for an overview of JsRender support in Node.js"
      },
      {
        "_type": "links",
        "title": "Detail topics:",
        "links": [],
        "topics": [
          {
            "hash": "node/install",
            "label": "Installation and usage"
          },
          {
            "hash": "node/filetmpls",
            "label": "File-based templates"
          },
          {
            "hash": "node/express-hapi",
            "label": "Express and Hapi integration"
          },
          {
            "hash": "node/server-browser",
            "label": "Server/browser shared templates"
          },
          {
            "hash": "node/browserify",
            "label": "Browserify support"
          }
        ]
      }
    ]
  },
  "node/install": {
    "title": "<em>JsRender on Node.js</em>",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "## Installation\n\nOn Node.js from the command line, install jsrender:\n\n```bash\n$ npm install jsrender\n```\n\n## Usage\n\nLoad the jsrender module:\n\n```js\nvar jsrender = require('jsrender');\n```\n\nNow call JsRender APIs, or use [Express](#node/express-hapi@express) or [Hapi](#node/express-hapi@hapi) integration, for server-rendering of JsRender templates.\n\n(For loading JsRender in the browser using Browserify or webpack, see *[JsRender as a Browserify module](#node/browserify@jsrender)* and *[JsRender as a webpack module](#node/webpack@jsrender)*)\n"
      },
      {
        "_type": "para",
        "title": "JsRender APIs on the server &ndash; same as in the browser!",
        "text": "In the browser, when jQuery is present, JsRender loads as a jQuery plugin and adds APIs to the jQuery namespace object, as:\n\n`$.views`, `$.templates` and `$.render` \n\nOn the server exactly the same APIs are provided, associated instead with the `jsrender` namespace:\n\n`jsrender.views`, `jsrender.templates` and `jsrender.render`.\n\nFor convenience you can call the namespace `$` and then use the regular APIs: `$.views...`, `$.templates...`, `$.render...`, or copy from the regular browser examples/samples -- as if in the browser with jQuery.\n\nFor example:\n\n```js\nvar $ = require('jsrender'); // Returns the jsrender namespace object - referenced for convenience as var $\n\nvar tmpl = $.templates('Name: {{:first}} {{upper:last'); // Compile template from string\n\n$.views.converters('upper', function(val) {return val.toUpperCase()}); // Register converter\n \nvar data = {first: 'Jo', last: 'Ryan'};\n\nvar html = tmpl(data); // Or alternative syntax: var html = tmpl.render(data);\n// result: \"Name: Jo RYAN\" \n```",
        "anchor": "apis"
      },
      {
        "_type": "para",
        "title": "Using helpers, converters, custom tags...",
        "text": "On Node.js you can use the full set of JsRender features, template tags and APIs, just as you would in the browser -- by simply using the `jsrender` namespace object returned from `require('jsrender')`, instead of the jQuery object, `$`. In addition you can take advantage of [file-based templates](#node/filetmpls).\n\n**Custom Tags example:** -- For example, here is the JsRender Quickstart *[Custom Tags Sample](#jsr-quickstart@customtags)*, as you might write it on Node.js:\n\n**Template:** *./templates/personTemplate.html*:\n\n```jsr\nName: {{fullName person/}}\n```\n\n**Code:**\n\n```js\nvar jsrender = require('jsrender');\n\njsrender.views.tags(\"fullName\", \"{{:first}} {{:last}}\"); // Register custom tag\n\nvar tmpl = jsrender.templates('./templates/personTemplate.html'); // Compile template\n\nvar html = tmpl({person: {first: \"Jim\", last: \"Varsov\"}}); // Render\n// result: \"Jim Varsov\"\n```\n\n**Helpers example:** -- And here is the JsRender Quickstart *[Helpers](#jsr-quickstart@helpers)* example, in a version for Node.js:\n\n**Template:** *./templates/personTemplate.html*:\n\n```jsr\n{{:~title}} {{:first}} {{:~upper(last)}}\n```\n\n**Code:**\n\n```js\nvar jsrender = require('jsrender');\n\nvar myHelpers = {\n    upper: function(val) { return val.toUpperCase(); },\n    title: \"Sir\"\n};\n\nvar tmpl = $.templates('./templates/personTemplate.html');\n\nvar data = {first: \"Jim\", last: \"Varsov\"};\n\nvar html =  tmpl(data, myHelpers);\n// result: \"Sir Jim VARSOV\"\n```\n\nOr we can register helpers globally:\n\n```js\njsrender.views.helpers(myHelpers);\n\nvar data = {first: \"Jim\", last: \"Varsov\"};\nvar html =  tmpl(data);\n// result: \"Sir Jim VARSOV\"\n```"
      }
    ]
  },
  "node/express-hapi": {
    "title": "<em>JsRender on Node.js</em>",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "## Express and Hapi integration"
      },
      {
        "_type": "para",
        "title": "Using Express to render templates",
        "text": "In Express you can use JsRender APIs to render the template, as in the examples above, then return the html in the HTTP response:\n\n```js\napp.get('/...', function(req, res) {\n  res.send(html);\n});\n```\n\nBut alternatively you can register JsRender as template engine for Express:\n\n```js\nvar jsrender = require('jsrender');\n\napp.engine('html', jsrender.__express); // Set JsRender as template engine for .html files\napp.set('view engine', 'html'); \napp.set('views', __dirname + '/templates'); // Folder location for JsRender templates for Express\n```\n\nRender template *./templates/myTemplate.html* -- content: `Name: {{:name}}<br/>`:\n\n```js\napp.get('/...', function(req, res) {\n  res.render('myTemplate', {name: \"Jim\"}); \n  // result: Name: Jim<br/>\n});\n```",
        "anchor": "express"
      },
      {
        "_type": "para",
        "title": "Using Hapi to render templates",
        "text": "JsRender also has built-in support as template engine for [Hapi](http://hapijs.com/):\n\nSet JsRender as the template engine for Hapi:\n\n```js\nvar jsrender = require('jsrender');\n\nserver.register(vision, function (err) {\n  ...\n  server.views({\n    engines: { html: jsrender },\n    relativeTo: __dirname,\n    path: 'templates'\n  });\n```\n\nUse Hapi to render a template:\n\n```js\nserver.route({\n  method: 'GET',\n  path: '/',\n  handler: function (request, reply) {\n    return reply.view('myTemplate', myData);\n  }\n});\n```",
        "anchor": "hapi"
      }
    ]
  },
  "node/server-browser": {
    "title": "<em>JsRender on Node.js</em>",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "## Sharing the same templates between server and  browser\n\nJsRender lets you share templates between server and client, using either of the *Browserify* or *{{clientTemplate}}* approaches shown below."
      },
      {
        "_type": "para",
        "title": "Browserify",
        "text": "Using Browserify with the `jsrender/tmplify` transform allows you to include your server [file-based templates](#node/filetmpls) in the Browserify client-script bundle. \n\nYou can then access the compiled templates in the browser, as modules, using:\n\n```js\nvar tmpl = require('./.../myTemplate.html)`\nvar html = tmpl.render(myData);\n...\n```\n\nFor details, see the *[Browserify](#node/browserify)* topic.\n\nFor complete running samples, see the *index-express-browserify.js* and *index-hapi-browserify.js* samples in the *[JsRender Node Starter](https://github.com/BorisMoore/jsrender-node-starter)* project."
      },
      {
        "_type": "para",
        "title": "Rendering file-based templates in the browser: {{clientTemplate}}",
        "text": "JsRender also provides a `{{clientTemplate}}` tag that makes file-based templates available for rendering in the browser without needing to use Browserify.\n\nSimply include `{{clientTemplate \"templateFilePath...\"}}` in the layout template, for any template you want to expose in the browser:\n\n```jsr\n<head>\n  {{clientTemplate \"./templates/myTemplate.html\" /}}\n</head>\n\n<div id=\"result\"></div>\n\n<script>\n  var data = ...\n  var tmpl = $.templates(\"./templates/myTemplate.html\");\n  var html = tmpl(myData);\n\n  $(\"#result\").html(html);\n</script>\n```\n\nSee the *index-express.js* and *index-hapi.js* samples in the *[JsRender Node Starter](https://github.com/BorisMoore/jsrender-node-starter)* project."
      },
      {
        "_type": "para",
        "title": "JsRender on the server, JsRender or JsViews in the browser...",
        "text": "Both the *Browserify* and the *{{clientTemplate}}* approach to sharing templates between server and browser let you then render or link those templates in the browser, using JsRender or JsViews.\n\nIn the browser, you reference the templates using the same `./file/path/template.html` syntax as on the server. \n\nFor example, in the *[JsRender Node Starter](https://github.com/BorisMoore/jsrender-node-starter)* samples, the [layout-movies.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/layout-movies.html) template contains the following:\n\n```html\n<tbody data-link=\"{include tmpl='./templates/movie-list.html'}\">\n\t{{include tmpl=\"./templates/movie-list.html\"/}}\n</tbody>\n```\n\nHere, the `{{include ...}}` is used on the server to do initial rendering of the movies list using the *movie-list.html* template. Then in the browser, the `data-link=\"{include ...}` causes JsViews to access the same template in the browser, and provide dynamic data-binding of the list...\n"
      },
      {
        "_type": "para",
        "title": "Single Page Apps with initial rendering on server",
        "text": "An important scenario is a *single page app* using JsRender or JsViews in the client to create dynamic UI, combined with initial rendering of the content on the server by JsRender using the same template.\n\nThis can bring many advantages, including SEO, and eliminating flicker when the page is refreshed with a new server request.\n\n*Note:* To completely eliminate flicker on data-linked content which has already been rendered on the server, it is sometimes useful to use the syntax `data-link=\"...^{...}\"` -- which data-links without doing the initial render. Here is an example from  [movie-detail.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/movie-detail.html) in the *[JsRender Node Starter](https://github.com/BorisMoore/jsrender-node-starter)*:\n\n```html\n<div><input value=\"{{:title}}\" data-link=\"^{:title:}\" /></div>\n```\n"
      }
    ]
  },
  "tagsyntax": {
    "title": "Tag syntax",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Template tags in JsRender use the Mustache style: `{{...}}`.<br/>\n(You can choose different delimiters, such as `<%...%>`, using `$.views.settings.delimiters(\"<%\", \"%>\")`.\n"
      },
      {
        "_type": "para",
        "title": "Tags without content",
        "text": "The most common JsRender tags are [`{{: pathOrExpr}}`](#assigntag) -- which inserts the value of the path or expression, and [`{{> pathOrExpr}}`](#htmltag) which inserts the *HTML-encoded* value of the path or expression. \n\nThose tags, along with the *allow code* tag [`{{* ...}}`](#allowcodetag) and *comment tag* [`{{!-- ... --}}`](#commenttag), are self-contained tags which do not wrap other content:\n\n**Built-in tags without content:**\n\n```jsr\n{{: pathOrExpr}}             (value)\n{{> pathOrExpr}}             (HTML-encoded value)\n{{* mycode}}                 (using code)\n{{!-- this is a comment --}} \n```"
      },
      {
        "_type": "para",
        "title": "Block tags &ndash; tags with content: ",
        "text": "**All other built-in tags, as well as all custom tags, use the block tag syntax:**\n\n```jsr\n{{include ...}}...{{/include}}      or   {{include .../}}\n{{for}}...{{/for}}                  or   {{for.../}}\n{{props}}...{{/props}}              or   {{props .../}}\n{{if}}...{{/if}}                    or   {{if .../}}\n{{myCustomTag}}...{{/myCustomTag}}  or   {{myCustomTag .../}}\n```\n\nTags using the *block tag syntax* have *open* and *close* tags, with content, or else they use the self-closing syntax, without content:\n\n**Block tag with content**\n\n```jsr\n{{someTag ...}}\n  content\n{{/someTag}}\n```\n\n**Self-closing block tag (empty tag) -- no content:**\n\n```jsr\n{{someTag .../}}\n```\n\n",
        "anchor": "blocktag"
      },
      {
        "_type": "para",
        "title": "Using tmpl=... to reference content as an external template",
        "text": "A particular case of self-closing syntax is when any block tag uses the named parameter `tmpl=...` to reference an external template, which then replaces what would have been the block content.\n\nThis is a very useful technique for encapsulation and reuse of tag content. The content becomes a *'partial'* -- and is included thanks to template composition:\n\n**Self-closing block tag referencing an external template:**\n\n```jsr\n{{someTag ... tmpl=.../}}\n```\n\n(See for example `{{for languages tmpl=\"#columnTemplate\"/}}` in [this sample](#samples/jsr/composition/tmpl).)\n"
      },
      {
        "_type": "para",
        "title": "Template composition (partials)",
        "text": "The most common way of composing templates is to have a layout template, and to use `{{include tmpl=... /}}`:\n\n```jsr\ntop level content\n{{include tmpl='myInnerTemplate' /}}\n```\n\nBut in fact template composition can be done by adding references to external templates using `tmpl=...` on ***any*** tag, as shown in the previous section.\n\n**Dynamic composition**\n\nNote that the `tmpl=...` can use any expression, so you can assign different nested templates dynamically based on data or context. For example you might write `{{include tmpl=~getTemplate(type) /}}` -- where `~getTemplate(...)` is a helper which returns a different template based in this case on the `type` property of the current data item.\n\nIn fact when setting `tmpl=...` dynamically, the returned template can be in any if the following forms:\n- a compiled template\n- a markup string\n- the name of a registered template\n- a selector\n- (on Node.js) a file path to a template",
        "anchor": "composition"
      },
      {
        "_type": "para",
        "title": "Tag arguments and named parameters",
        "text": "Tags can take both unnamed arguments and named parameters:\n\n```jsr\n{{someTag argument1 param1=...}}\n  content\n{{/someTag}}\n```\nAn example of a named parameter is the `tmpl=...` parameter mentioned above:\n\n```jsr\n{{for languages tmpl=\"#columnTemplate\"/}}\n```\n\nArguments and named parameters can be assigned values from simple data-paths such as:\n\n```jsr\n{{formattedAddress address.street format=~util.formats.upper /}}\n```\n\nor from richer expressions such as `product.quantity * 3.1 / 4.5`, or `name.toUpperCase()`\n\n```jsr\n{{productValue product.quantity*3.1/4.5 description=name.toUpperCase() /}}\n```\n",
        "anchor": "tagparams"
      },
      {
        "_type": "para",
        "title": "Wrapping content ",
        "text": "If a tag has an external `tmpl=...` reference, ***and*** inline block content, then the external template takes precedence. However, the external template can behave as a wrapper, wrapping the inline block content (one or more times), thanks to the [`view.content`](#viewobject@content) or `#content` property:\n\n```jsr\n{{sometag ... tmpl=\"externalTmpl\"}}\n  inline block content\n{{/sometag}}\n```\n\n```js\n$.templates(\"externalTmpl\", \"before {{include tmpl=#content /}} after\";\n```\n\nSimilarly, a custom tag can use a built-in template which wraps the inline content:\n\n \n```jsr\n{{mytag}}\n  inline block content\n{{/mytag}}\n```\n\n```js\n$.view.tags(\"mytag\", {\n  ...\n  template: \"before {{include tmpl=#content /}} after\"),\n  ...\n});\n```",
        "anchor": "wrap"
      },
      {
        "_type": "para",
        "title": "Block tags with {{else}}",
        "text": "Some block tags provide features which involve using alternative content blocks. Block tag syntax supports this by allowing the content to be separated into two or more alternative content blocks, using `{{else}}` tags as separators:\n\nFor example, the [`{{if}}`](#iftag) tag uses `{{else}}` to provide *if-else*, or *if-elseif-else ...* behavior:\n\n```jsr\n{{if firstExpression}}\n    render this if the firstExpression is true\n{{else secondExpression}}\n    else render this if the secondExpression is true\n{{else}}\n    else render this\n{{/if}}\n```\n\nAnd the [`{{for}}`](#fortag) tag accepts alternative content to render if an array is empty (or an array or object is `null` or `undefined`):\n\n```jsr\n{{for members}}\n    Member Name: {{:name}}\n{{else}}\n    There are currently no members...\n{{/for}}\n```\n\nSimilarly you can use `{{else}}` with a custom tag, such as in [this sample](#samples/tag-controls/tabs):\n\n```jsr\n{{tabs tabCaption=\"First Tab\"}}\n    first tab content\n{{else tabCaption=\"Second Tab\"}}\n    second tab content\n{{/tabs}}\n```"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsrtags",
            "label": "Template tags"
          },
          {
            "_type": "topic",
            "hash": "paths",
            "label": "Paths and expressions"
          }
        ]
      }
    ]
  },
  "views": {
    "title": "JsRender view hierarchy",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "A view is a rendered template/block tag",
        "text": "Each instance of a rendered template or a template [block tag](#tagsyntax@blocktag) is associated with a JsViews [*\"view\"* object](#viewobject).\n\nFor example, if the following template is rendered, and inserted into the page --\n\n```jsr\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  Team {{:title}}\n  {{if members.length}}\n    The team has members!\n  {{/if}}\n</script>\n```\n\n```js\nvar team = {title: \"The A team\", members: [{name: \"Jeff\"}, {name: \"Maria\"}]};\n\nvar html = $(\"#teamTemplate\").render(team);\n```\n\n-- then the rendered result will have the following *view structure*:\n\n<pre>\n&mdash; <b>teamView</b>                <em>(Team: The A team)</em>\n   &mdash; <b>ifView</b>               <em>(The team has members!)</em>\n</pre>\n\n\nEach view is associated with a [`view`](#viewobject) object, which provides APIs for accessing properties of that view, as well as for accessing parent or child views in the view hierarchy."
      },
      {
        "_type": "para",
        "title": "The data context of a view",
        "text": "In particular, a [`view`](#viewobject) has a [`data`](#viewobject@data) property, which is the *current data context* used for rendering that *view* (rendering that template, or inline block content):\n\n<pre>\n&mdash; <b>teamView</b>                data: <span class=\"hljs-keyword\">team</span>\n   &mdash; <b>ifView</b>               data: <span class=\"hljs-keyword\">team</span>\n</pre>\n",
        "anchor": "datacontext"
      },
      {
        "_type": "para",
        "title": "Inline block content / external 'tmpl=...'  reference: same view hierarchy...",
        "text": "A view corresponds an instance of a *[block tag](#tagsyntax@blocktag)* ***or*** a *rendered template* -- so if we replace the inline content of a tag by an external reference: `tmpl=...`, the rendered result will be unchanged, and *the view structure will also be identical*:\n\n```jsr\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  My team\n  {{if members.length tmpl=\"#membersTemplate\" /}}\n</script>\n\n<script id=\"membersTemplate\" type=\"text/x-jsrender\">\n  The team has members!\n</script>\n```\n\nSame view structure as before:\n \n<pre>\n&mdash; <b>teamView</b>                data: <span class=\"hljs-keyword\">team</span>\n   &mdash; <b>ifView</b>               data: <span class=\"hljs-keyword\">team</span>\n</pre>",
        "anchor": "nestedtmpl"
      },
      {
        "_type": "para",
        "title": "Stepping into a block tag &ndash; what is the new data context?",
        "text": "Let's add a custom tag `{{mytag}}` to our template:\n\n```jsr\nMy team\n{{mytag members/}}\n...\n```\n\nWe'll define the custom tag, with a built-in template:\n\n```js\n  $.views.tags(\"mytag\", \"{{:length}} member(s)\");\n```\n\n`{{mytag members/}}` will render block content (with an associated view) using its tag template `\"{{:length}} members\"`. \n\n*What will the data context be for the `mytag` view?*\n\nBy default:\n\n- a block tag with no argument `{{someTag}}` will stay on the current data context\n- a block tag with an argument `{{someTag expr ...}}` will move the data context to `expr`.\n\nSo `{{mytag members}}` (just like `{{include members}}`) *will move the data context to `members`*."
      },
      {
        "_type": "para",
        "title": "",
        "text": "However a block tag may be designed to simply stay on the same data context as the parent block -- and that is the case for the `{{if}}` tag:\n\n- `{{if expr}}` does not move the data context.\n\nSo our template\n\n```jsr\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  My team\n  {{mytag members/}}\n\n  {{if members.length}}\n    The team has members!\n  {{/if}}\n</script>\n```\n\nwill have this view structure:\n\n<pre>\n&mdash; <b>teamView</b>                data: <span class=\"hljs-variable\">team</span>\n   &mdash; <b>mytagView</b>            data: <span class=\"hljs-variable\">team.members</span>\n   &mdash; <b>ifView</b>               data: <span class=\"hljs-variable\">team</span> (same as parent – teamView)\n</pre>\n"
      },
      {
        "_type": "para",
        "title": "Array views and item views &ndash; {{for array}}",
        "text": "Now let's add a `{{for members}}` tag to iterate over the `members`, inside the `{{if}}` block:\n\n```jsr\nTeam\n{{mytag members/}}\n\n{{if members.length}}\n  Members:\n  {{for members}}\n    {{:name}}\n  {{/for}}\n{{/if}}\n```\n\nWhen a [`{{for ...}}`](#fortag) tag is used with an array it creates:\n\n- an *\"array\" view*, whose `data` property is the array -- and under the \"array\" view:\n- an *\"item\" view* for each item in the array -- with as `data` property the item, and as [`index`](#getindex) property the index in the array:\n\n(Similarly, any tag which derives from the `{{for}}` tag -- such as the [`{{props}}`](#propstag) tag -- will also add an \"array\" view and \"item\" views...)\n\nSo our view structure with the `{{for}}` tag included will now be :\n\n<pre>\n&mdash; <b>teamView</b>                data: <span class=\"hljs-variable\">team</span>                 type: <span class=\"hljs-string\">\"data\"</span>\n   &mdash; <b>mytagView</b>            data: <span class=\"hljs-variable\">team.members</span>         type: <span class=\"hljs-string\">\"mytag\"</span>\n   &mdash; <b>ifView</b>               data: <span class=\"hljs-variable\">team</span>                 type: <span class=\"hljs-string\">\"if\"</span>\n      &mdash; <b>arrayView</b>         data: <span class=\"hljs-variable\">team.members</span>         type: <span class=\"hljs-string\">\"array\"</span>\n         &mdash; <b>itemView</b>       data: <span class=\"hljs-variable\">team.members[0]</span>      type: <span class=\"hljs-string\">\"item\"</span>\n         &mdash; <b>itemView</b>       data: <span class=\"hljs-variable\">team.members[1]</span>      type: <span class=\"hljs-string\">\"item\"</span>\n</pre>\n\n-- where we show also the [`type`](#viewobject@type) property of each `view`.",
        "anchor": "itemview"
      },
      {
        "_type": "para",
        "title": "Array views and item views &ndash; tmpl.render(array)",
        "text": "Suppose now we have an array of teams -- and we pass the `teams` array to the `render()` method:\n\n```js\nvar teams = [\n  {title: \"A Team\", members: [{name: \"Jeff\"}, {name: \"Maria\"}]},\n  {title: \"B Team\", members: [{name: \"Francis\"}]}\n];\n\nvar html = $(\"#teamTemplate\").render(teams);\n```\n\nJsRender will render the `teamTemplate` once for each team -- and just like with the `{{for}}` it will create an *\"item\" view* for each item in the `teams` array -- with the two *\"item\" views* as children of an *\"array\" view*.\n\nHere it is as a working sample:"
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
            "code": "var html = $(\"#teamTemplate\").render(teams);\n"
          }
        ],
        "markup": "",
        "html": "<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <div>\n    Team: {{:title}} -\n    {{mytag members/}}\n\n    {{if members.length}}\n      Members:\n        {{for members}}\n          {{:name}}\n        {{/for}}\n    {{/if}}\n  </div>\n</script>\n\n<div id=\"result\"></div>",
        "code": "// mytag: custom tag to output \"1 member\" or \"n members\"\n$.views.tags(\"mytag\", \"{{:length == 1 ? '1 member' : length + ' members'}}<br/>\");\n// Alternative version of mytag:\n// $.views.tags(\"mytag\", \"{{if length == 1}}1 member{{else}}{{:length}} members{{/if}}<br/>\");\n\nvar teams = [\n  {title: \"The A Team\", members: [{name: \"Jeff\"}, {name: \"Maria\"}]},\n  {title: \"The B Team\", members: [{name: \"Francis\"}]}\n];\n\nvar html = $(\"#teamTemplate\").render(teams);\n\n$(\"#result\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "110"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the resulting view structure:\n\n<pre>\n&mdash; <b>arrayView</b>               data: <span class=\"hljs-variable\">teams</span>\n   &mdash; <b>itemView</b>             data: <span class=\"hljs-variable\">teams[0]</span>               <em>(Team: The A Team - )</em>\n      &mdash; <b>mytagView</b>         data: <span class=\"hljs-variable\">team.members</span>           <em>(2 members)</em>\n      &mdash; <b>ifView</b>            data: <span class=\"hljs-variable\">teams[0]</span>               <em>(Members:)</em>\n         &mdash; <b>arrayView</b>      data: <span class=\"hljs-variable\">teams[0].members</span>\n            &mdash; <b>itemView</b>    data: <span class=\"hljs-variable\">teams[0].members[0]</span>    <em>(Jeff)</em>\n            &mdash; <b>itemView</b>    data: <span class=\"hljs-variable\">teams[0].members[1]</span>    <em>(Maria)</em>\n   &mdash; <b>itemView</b>             data: <span class=\"hljs-variable\">teams[1]</span>               <em>(Team: The B Team - )</em>\n      &mdash; <b>mytagView</b>         data: <span class=\"hljs-variable\">team.members</span>           <em>(1 members)</em>\n      &mdash; <b>ifView</b>            data: <span class=\"hljs-variable\">teams[1]</span>               <em>(Members:)</em>\n         &mdash; <b>arrayView</b>      data: <span class=\"hljs-variable\">teams[1].members</span>\n            &mdash; <b>itemView</b>    data: <span class=\"hljs-variable\">teams[1].members[0]</span>    <em>(Francis)</em>\n</pre>\n"
      },
      {
        "_type": "para",
        "title": "In JsViews: From UI back to data:",
        "text": "***Note:*** One of the features provided by JsViews data-linking (when you use the JsViews [`.link()`](#jsvlinktmpl) method rather than JsRender's [`.render()`](#rendertmpl) method) is the [`$.view(elem)`](#$view) method. This method provides a *reverse mapping* and lets you get from a rendered DOM element back to the corresponding view object in the view hierarchy. From the view you can get to the underlying data, the index, etc.\n\nSo in effect in JsViews, *the mapping from the view hierarchy to the UI becomes a two-way mapping...* "
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "hash": "getindex",
            "label": "getIndex()"
          },
          {
            "hash": "contextualparams",
            "label": "Contextual parameters"
          },
          {
            "hash": "parentdata",
            "label": "Accessing parent data"
          }
        ]
      }
    ]
  },
  "paths": {
    "title": "Paths and expressions",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender tags can take [unamed arguments, or named parameters](#tagsyntax@tagparams):\n\n```jsr\n{{:arg0}}\n\n{{someTag arg1 arg2 param_a=param1 param_b=param2}}\n  content\n{{/someTag}}\n```\n\nThe values of the arguments or parameters (such as `arg0`... `param1` ... above) must be valid JsRender paths or expressions.\n\nJsRender expressions are regular Javascript expressions, but with *no access to global variables*.\n\nInstead of global Javascript variables, JsRender expressions use *data paths*, *helper paths* and *view paths*, to access data values, values provided by helpers, and values obtained from the [view hierarchy](#views), such as the `#getIndex()`.\n\n***Data paths*** are of the form `dataProperty.bb.cc`, and they step through the data hierarchy, starting from the current data item (the [data context](#views@datacontext) for the current view). They can include array access, such as `team.members[id]`\n\n***View paths*** are of the form `#viewProperty.bb.cc`, and they start from the current [view](#views). So for example, `#data` is short for `#view.data` -- where `#view` is the current view.\n\n***Helper paths*** are of the form `~myHelper.bb.cc`, and they start from the named [helper](#helpers) `\"myHelper\"`. In addition they can be used to access *[contextual parameters](#contextualparams)*, or the built-in [`~root`](#contextualparams@root) \n\nHere are some examples of JsRender paths and values:\n\n*Data paths*:\n\n```jsr\n{{:name}}\n{{for address.street}}...{{/for}}\n{{>team.members[0].lastName}}\n{{:name.toUpperCase()}}\n```\n\n*Helper paths*:\n\n```jsr\n{{>~utilities.errorMessages.msg1}}\n{{if ~settings.show}}...{{/if}}\n{{:~root.selectedName}}         {{!--Accessing root data--}}\n```\n\n*View paths*:\n\n```jsr\n{{:#getIndex()}}\n{{include #content /}}\n{{if #parent.parent.data.isLead}}...{{/if}}\n{{>~getDescription(#data)}}\n```\n\n*A primitive value of type string, number, boolean, null ...*:\n\n```jsr\n{{if isOpen tmpl='It is open' /}}\n{{for address tmpl=\"#addressTemplate\"}}...{{/for}}\n{{range members start=1 end=5 /}}\n{{range members reverseSort=true /}}\n```\n\nJsRender expressions can combine values in more complex expressions, using functions, parens, operators such as `+` `-` `*` `/` `!` `===` `==` `>` `!==` `||` `&&`, as well as ternary expressions: `...?...:...`, array and object accessors: `[...]` etc.\n\n*Here are some examples of expressions*: \n\n```jsr\n{{if book.author === \"Jim Boyd\"}}...{{/if}}\n{{:~utilities.format(book.title, 'upper', true)}}\n{{for ~sort(~root.getMembers()}}}...{{/for}}\n{{:person.firstName + ' ' + person.lastName.toUpperCase()}}\n{{range #parent.data.members()/}}\n{{:(~addRebate(book.price) + 23.2)*3.5/2.1}}\n{{:~mode === \"useTitle\" ? book.title : book.name}}\n{{if error}}...{{else !utilities.valid(book.description)}}...{{else}}...{{/if}}\n{{:~books[id].title}}\n{{:people[~currentIndex].name}}\n```\n\nExpressions can include white space. The following two examples are equivalent:\n\n```jsr\n{{averageValue product.quantity*3.1/4.5 description=~getDescription(#data) /}}\n{{averageValue product.quantity * 3.1 / 4.5 description = ~getDescription( #data ) /}}\n```\n\nThe `{{averageValue}}` tag is being assigned one argument, and one named \"description\" parameter. The two expressions differ only in white space, and both are syntactically valid. However, removing optional white space -– as in the first example -– makes it easier to see the distinct arguments and parameters of the tag.\n"
      },
      {
        "_type": "para",
        "title": "Chained paths: Stepping through object properties (or functions)",
        "text": "All of the paths above (whether *Data/Helper/View paths*) involve starting from an initial value (a *current data item property/helper/view property*) -- and then, if it is an object, perhaps stepping through one or more chained properties.\n\nFor example `team.manager.address.street` starts from a `team` object and steps through the `manager` property -- which is itself a 'person' object with an `address` property, etc. \n\n(See also *[Data-linked paths](#linked-paths)*.)",
        "anchor": "paths"
      },
      {
        "_type": "para",
        "title": "Computed properties",
        "text": "In some cases a property may be of type *function* (possibly taking parameters), so you might have:\n\n`team.manager().getAddress('home').street`\n\n-- where the manager property is in fact a *'getter'* function which returns a `person` object, which has a `getAddress()` parameterized accessor (taking `'home'` or `'work'` -- or maybe a Boolean `isHomeAddress`). Similarly a path can include an array accessor such as `team.members['id'].address`.\n\nProperties of type function -- returning a value -- are referred to as a *computed properties*, or *getter properties*, and <br/>\n`team.manager().getAddress('home').street` is an example of chained computed properties.\n\n(See also *[Computed properties and computed observables](#computed)* -- for using computed properties with JsViews and data-linking.)\n",
        "anchor": "computed"
      },
      {
        "_type": "para",
        "title": "Getter properties and computed properties",
        "text": "A common pattern using computed 'getter' functions would be to provide a `person.firstName()` 'getter' property which returns a value: `person._firstName`, considered as 'private'.\n\nIn addition, there may be computed properties which depend on other properties, such as a `person.fullName()` which concatenates first and last name.\n\nHere is a sample showing both types of computed property:\n"
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
            "text": "*Data:*\n\n```js\nfunction firstName() { return this._firstName; }\nfunction lastName() { return this._lastName; }\nfunction fullName() { return this._firstName + \" \" + this._lastName; }\n\nvar data = {\n  person: {\n    _firstName: \"Jo\",\n    _lastName: \"Blow\",\n    firstName: firstName,\n    lastName: lastName,\n    fullName: fullName\n  }\n};\n```\n\n*Template:*\n\n```jsr\n  First name: {{:person.firstName()}}\n  Last name: {{:person.lastName()}}\n  Full name: {{:person.fullName()}}\n```"
          }
        ],
        "code": "function firstName() { return this._firstName; }\nfunction lastName() { return this._lastName; }\nfunction fullName() { return this._firstName + \" \" + this._lastName; }\n\nvar data = {\n  person: {\n    _firstName: \"Jo\",\n    _lastName: \"Blow\",\n    firstName: firstName,\n    lastName: lastName,\n    fullName: fullName\n  }\n};\n\nvar html = $(\"#personTmpl\").render(data);\n\n$(\"#result\").html(html);",
        "html": "<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  First name: {{:person.firstName()}} <br/>\n  Last name: {{:person.lastName()}} <br/>\n  Full name: {{:person.fullName()}}\n</script>",
        "height": "76",
        "jsrJsvJqui": "jsr",
        "title": "Getter properties with plain objects",
        "anchor": "getter-plain-sample"
      },
      {
        "_type": "para",
        "title": "Getter properties on a View Model",
        "text": "Rather than using plain JavaScript objects with getter functions, as above, a more common pattern (providing better encapsulation) would be to define a *'View Model'* class -- with getter properties defined in the class -- and to instantiate that class to provide data instances.\n\n(See *[Plain objects or View Model](#explore/objectsorvm)* for details.)\n\nThe following sample uses that approach:"
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
            "text": "*Data:*\n\n```js\nfunction firstName() { return this._firstName; }\nfunction lastName() { return this._lastName; }\nfunction fullName() { return this._firstName + \" \" + this._lastName; }\n\nfunction Person(first, last) {\n  this._firstName = first;\n  this._lastName = last;\n}\n\nPerson.prototype = {\n  firstName: firstName,\n  lastName: lastName,\n  fullName: fullName\n};\n\nvar data = {\n  person: new Person(\"Jo\", \"Blow\")\n};\n```\n\n*Template:*\n\n```jsr\n  First name: {{:person.firstName()}}\n  Last name: {{:person.lastName()}}\n  Full name: {{:person.fullName()}}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  First name: {{:person.firstName()}} <br/>\n  Last name: {{:person.lastName()}} <br/>\n  Full name: {{:person.fullName()}}\n</script>",
        "jsrJsvJqui": "jsr",
        "height": "76",
        "code": "function firstName() { return this._firstName; }\nfunction lastName() { return this._lastName; }\nfunction fullName() { return this._firstName + \" \" + this._lastName; }\n\nfunction Person(first, last) {\n  this._firstName = first;\n  this._lastName = last;\n}\n\nPerson.prototype = {\n  firstName: firstName,\n  lastName: lastName,\n  fullName: fullName\n};\n\nvar data = {\n  person: new Person(\"Jo\", \"Blow\")\n};\n\nvar html = $(\"#personTmpl\").render(data);\n\n$(\"#result\").html(html);",
        "title": "Getter properties with a View Model",
        "anchor": "getter-vm-sample"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "tagsyntax",
            "label": "Tag syntax"
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
  "tmplsyntax": {
    "title": "Template syntax and structure",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following topics provide information on JsRender template syntax:"
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "tagsyntax",
            "label": "Tag syntax"
          },
          {
            "hash": "paths",
            "label": "Paths and expressions"
          },
          {
            "hash": "views",
            "label": "View hierarchy"
          }
        ]
      }
    ]
  },
  "settings": {
    "title": "Settings",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender provides the following APIs for modifying settings:"
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "settings/delimiters",
            "label": "Delimiters"
          },
          {
            "hash": "settings/debugmode",
            "label": "Debug mode"
          },
          {
            "hash": "settings/allowcode",
            "label": "Allow code"
          },
          {
            "hash": "settings/advanced",
            "label": "Additional advanced settings"
          }
        ]
      }
    ]
  },
  "settings/delimiters": {
    "title": "Setting tag delimiters for JsRender",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See also [Setting tag delimiters for JsViews](#jsvsettings/delimiters)"
      },
      {
        "_type": "para",
        "title": "JsRender default tag delimiters",
        "text": "Template tags in JsRender use the Mustache style: `{{...}}`\n\n(JsRender also accepts the data-linked tag syntax used in in JsViews: `{^{...}}`). "
      },
      {
        "_type": "para",
        "title": "Changing delimiters:",
        "text": "Sometimes there can be a need to use different delimiters. For example there may be a conflict if the template is being rendered on the server using a declarative syntax such as *Django* with the same default delimiters `{{` and `}}`.\n\nThe following call:\n\n```js\n$.views.settings.delimiters(\"<%\", \"%>\");\n```\n\nwill change the tag syntax to `<%...%>`.\n\n(*Note:* `$.views.settings.delimiters(...);` also accepts as parameter an array such as `[\"<%\", %>\"]` -- as shown in the last sample below.)\n"
      },
      {
        "_type": "para",
        "title": "Verifying current setting for tag delimiters:",
        "text": "```js\nvar delimiters = $.views.settings.delimiters();\n// Returns an array [\"{{\", \"}}\", \"^\"] - JsRender tag delimiters (and JsViews link character)\n```\n"
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
            "text": "*Markup:* \n\n```jsr\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <b>[%:title%]</b>\n  <ul>\n    [%for members%]\n      <li>Name: [%:name%]</li>\n    [%/for%]\n  </ul>\n</script>\n```\n\n*Code*\n\n```js\n$.views.settings.delimiters(\"[%\", \"%]\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n...\n```"
          }
        ],
        "html": "<div id=\"result\">\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <b>[%:title%]</b>\n  <ul>\n    [%for members%]\n      <li>Name: [%:name%]</li>\n    [%/for%]\n  </ul>\n</script>",
        "code": "$.views.settings.delimiters(\"[%\", \"%]\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n\nvar team = {\n    title: \"A team\",\n    members: [{name: \"Jo\"}]\n  };\n\nvar html = tmpl.render(team);\n\n$(\"#result\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "80",
        "title": "Choosing alternative tag delimiters, with JsRender"
      },
      {
        "_type": "para",
        "title": "Using alternative delimiters to 'render a template with a template'",
        "text": "In some scenarios you might want to use a template to generate a template, such as a template on the server to generate/render a template that will then be used in the browser.\n\nA good approach to achieving this is to use a different set of delimiters on the server.\n\nA similar scenario is to use a 'base' template to render different versions of a template for different languages/localities, as in this example:\n",
        "anchor": "tmpl-for-tmpl"
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
            "text": "```jsr\n<%:hello%>, {{:name}}<br/>\n<%:welcome%> {{:place}}\n```\n\n```js\n// Get current delimiters\nvar currentDelimiters = $.views.settings.delimiters();\n\n// Temporarily switch delimiters\n$.views.settings.delimiters(\"<%\", \"%>\");\n\n// Translate to Spanish localized version\nvar localizedTemplate = $.templates(\"#baseTmpl\").render(spanishTerms);\n\n// Revert to original delimiters\n$.views.settings.delimiters(currentDelimiters);\n\n// Render data using localized template\nhtml = $.templates(localizedTemplate).render(data);\n```"
          }
        ],
        "html": "<script id=\"baseTmpl\" type=\"text/x-jsrender\">\n  <%:hello%>, {{:name}}<br/>\n  <%:welcome%> {{:place}}\n</script>\n\n<div id=\"result\"></div>\n",
        "code": "var spanishTerms = {\n  hello: \"Hola\",\n  welcome: \"Bienvenido a\"\n};\n\nvar data = {\n  name: \"John\",\n  place: \"Madrid\"\n};\n\n// Get current delimiters\nvar currentDelimiters = $.views.settings.delimiters();\n\n// Temporarily switch delimiters\n$.views.settings.delimiters(\"<%\", \"%>\");\n\n// Translate to Spanish localized version\nvar localizedTemplate = $.templates(\"#baseTmpl\").render(spanishTerms);\n\n// Revert to original delimiters\n$.views.settings.delimiters(currentDelimiters);\n\n// Render data using localized template\nhtml = $.templates(localizedTemplate).render(data);\n\n$(\"#result\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "60",
        "title": "Template for a template"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Incidentally the above scenario of localized terms in a template can be achieved without the 'build step' of creating localized templates, simply by passing in the terms as helpers, distinct from the data itself."
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
            "text": "```js\nvar spanishTerms = {\n  hello: \"Hola\",\n  welcome: \"Bienvenido a\"\n};\n\nvar data = {\n  name: \"John\",\n  place: \"Madrid\"\n};\n\n// Pass in localized terms as helpers\nvar html = $.templates(\"#tmpl\").render(data, spanishTerms );\n```"
          }
        ],
        "html": "<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {{:~hello}}, {{:name}}<br/>\n  {{:~welcome}} {{:place}}\n</script>\n\n<div id=\"result\"></div>\n",
        "code": "var spanishTerms = {\n  hello: \"Hola\",\n  welcome: \"Bienvenido a\"\n};\n\nvar data = {\n  name: \"John\",\n  place: \"Madrid\"\n};\n\n// Pass in localized terms as helpers\nvar html = $.templates(\"#tmpl\").render(data, spanishTerms );\n\n$(\"#result\").html(html);\n",
        "height": "60",
        "title": "Passing in terms as helpers",
        "anchor": "passing",
        "jsrJsvJqui": "jsr"
      }
    ]
  },
  "settings/onerror": {
    "title": "onError",
    "path": "",
    "sections": []
  },
  "settings/dbgmode": {
    "title": "dbgMode",
    "path": "",
    "sections": []
  },
  "settings/debugmode": {
    "title": "Setting debug mode",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender has a *'debug mode'* setting which determines whether error messages encountered during rendering are displayed.\n\n***To get current debug mode:***\n\n```js\nvar isDebugMode = $.views.settings.debugMode(); // false by default\n```\n\n***To set debug mode:***\n\n```js\n$.views.settings.debugMode(...);\n```\n\nDebug mode can be set to any of the following:\n\n- `false` -- *errors during rendering will not be rendered* (but an exception will be thrown)\n- `true` -- no exception will be thrown, but *the error message will be rendered*, in place of the template tag or block\n- `\"some string\"` -- no exception. *The string `\"some string\"` will be rendered* in place of the tag or block\n- `\"\"` (empty string) -- no exception. The tag or block will simply be *replaced by the empty string*\n- a function (to be used as an error handler) -- no exception. The handler will run, and *the error string will be rendered, or else, if the function returns a string, that string will be rendered*\n\nSee *[Error handling and debugging](#onerror)* for a full discussion of alternative approaches, together with [details and working examples](#onerror@debugmode) of `$.views.settings.debugMode(...)`.\n\n "
      }
    ]
  },
  "settings/allowcode": {
    "title": "Allow code",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender templates allow you to write [rich expressions](#paths) within the template tags, such as:\n\n```jsr\n{{:person.firstName + ' ' + person.lastName.toUpperCase()}}\n```\n\n\n\nNevertheless, in order to improve encapsulation, security and maintainability, they don't allow <em>arbitrary</em> code. For example, they don't allow you to access global variables, like `window`. \n\nIf you want complete freedom to insert any code into a compiled template, you can set **allowCode** to *true*, either globally, or specifically for that template. You can then run any code as part of the template rendering, using the [`{{* ...}}`](#allowcodetag) tag, or you can return (render into the template output) the result of evaluating any expression, using the [`{{*: ...}}`](#allowcodetag) tag.\n\n(*Note:* it is not recommended to set `allowCode` to true within [data-linked](#jsvlinktmpl) templates -- with JsViews.)\n\n"
      },
      {
        "_type": "para",
        "title": "User-defined templates and security",
        "text": "For most purposes there is no need to set `allowCode` to true, since the built-in template expressions provide rich functionality which is sufficient for most scenarios.\n\nJsRender can be used to render templates either on the server or in the browser -- and is often used for applications which allow users to create their own templates, or to insert markup and expressions into templates. With `allowCode` false, JsRender is designed to *make it impossible for such user-defined templates to run arbitrary code*.\n\nUsers can include rich template expressions in the template, but they won't be able to insert code that accesses any variables (or runs any methods) that are outside of the template scope. (They can only access the contextual data/model, use the standard operators, and use any helper methods and variables which the author decides to provide.)",
        "anchor": "security"
      },
      {
        "_type": "para",
        "title": "To set allowCode to true, globally",
        "text": "```js\n$.views.settings.allowCode(true);\n```\n(See samples for [`{{* ...}}` and `{{*: ...}}`](#allowcodetag@sample))\n  \n"
      },
      {
        "_type": "para",
        "title": "To set allowCode back to false, globally",
        "text": "```js\n$.views.settings.allowCode(false);\n```\n",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "To get current global allowCode setting",
        "text": "```js\nvar allowCodeIsTrue = $.views.settings.allowCode(); // false by default\n```"
      },
      {
        "_type": "para",
        "title": "To set allowCode to true for a specific template",
        "text": "```js\n$.templates(..., {\n  markup: ...,\n  allowCode: true,\n  ...\n})\n```\n\n(See `{{* ...}}` and `{{*: ...}}` sample: *[allowCode for template](#allowcodetag@tmpl)*)."
      }
    ]
  },
  "settings/advanced": {
    "title": "Advanced settings",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender has the following advanced setting:\n\n- **useViews** -- *default:* `false`\n\nand also the following 'private' advanced setting:\n\n- **_jsv** -- *default:* `false`\n\n***useViews*** controls a JsRender performance optimization, while building the *[view hierarchy](#views)*. In very simple templates there will usually not be any need to access the [`view`](#viewobject). JsRender detects these cases, does not create a view, and hence obtains a slight performance gain. By setting `useViews` to `true`, you guarantee that JsRender will *always* create views for template blocks.\n\n***_jsv*** is a 'private' setting (could change in the future). If set to `true` JsRender provides a global `_jsv` variable, which gives access to the internal store of views.\n\n***To get current advanced settings:***\n\n```js\nvar advancedSettings = $.views.settings.advanced();\n```\n\nBy default the returned `advancedSettings` object is:\n\n```js\n{useViews: false, _jsv: false}\n```\n\n***To set advanced settings:***\n\n```js\n$.views.settings.advanced({useViews: true});\n// Set one or more advanced settings\n```"
      }
    ]
  },
  "onerror": {
    "title": "Error handling and debugging",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Sometimes when rendering a JsRender template, a JavaScript error is encountered. For example `{{:address.street}}` in a template will render without error provided there is an `address` property on the current data object. But if there is no `address` property, then *there will be an error*: ***\"Cannot read property 'street' of undefined\"***.\n\nJsRender provides two features which provide powerful control over rendering behavior when errors are encountered.\n\n- The optional [`onError=...` property](#onerror@onerror) that can be set on any tag -- for controlling error handling behavior on that specific tag\n- The [`$.views.settings.dbgMode(...)` setting](#onerror@debugmode) -- which provides global control over error handling during rendering\n\nIn addition, for advanced debugging of compiled templates, see:\n\n- *[Using debugging helpers](#onerror@dbg)*\n\n<br/>\n## Specifying onError fallback behavior on a tag"
      },
      {
        "_type": "para",
        "title": "Setting onError to a string",
        "text": "All JsRender tags (including custom tags) such as `{{address.street}}` or `{{for getItems()}}` allow you to provide a `onError` tag property, with a fallback string to render in the case of errors:\n\n```jsr\n{{:address.street onError=\"Address unavailable\"}}\n```\n\n```jsr\n{{for phones() onError=\"No phones\"}}\n```\n\n```jsr\n{{myCustomTag ... onError=\"\"}}\n```\n\nThe `onError` fallback string will be rendered whenever there an error (or exception) is encountered during the tag rendering.\n\nSetting to the empty string ensures that errors are simply ignored, and the tag renders as the empty string.",
        "anchor": "onerror"
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
            "text": "In this sample, if a `member` object has no `address` property, the `address.street` expression will lead to a JavaScript error, and the `{{:address.street onError=\"Address unavailable\"}}` will render the fallback string:  `\"Address unavailable\"`.\n\nSimilarly, `{{for phones() onError=\"...\"}}`, if `phones()` produces an error... \n\n*Template:*\n\n```jsr\n{{for phones() onError=\"<em>No phones</em>\"}} ...\n{{:address.street onError=\"Address unavailable\"}}\n```\n\n*Code:*\n\n```js\nfunction phones() { if (!this._phones) { throw new Error(\"phones() error\"); } ... }\n```\n\n*Data:*\n\n```js\nmembers: [\n  {address: {street: \"1st Ave\"}, _phones: [\"888\", \"456\"], ...\n  {address: undefined, _phones: [\"987\", \"111\"], ...             // No address\n  {address: {street: \"Main St\"}, _phones: undefined, ...        // _No phones\n]\n```\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n{{for members}}\n  Phones:\n  {{for phones() onError=\"<em>No phones</em>\"}}\n    {{:}}\n  {{/for}}\n  <br/>\n  <b>{{:address.street onError=\"Address unavailable\"}}</b>\n  <hr/>\n{{/for}}\n</script>\n",
        "markup": "",
        "jsrJsvJqui": "jsr",
        "data": [],
        "code": "function phones() {\n  if (!this._phones) {\n    throw new Error(\"phones() error\");\n  }\n  return this._phones;\n}\n\nvar team = {\n  members: [\n    {address: {street: \"1st Ave\"}, _phones: [\"888\", \"456\"],\n      phones: phones},\n    {address: undefined, _phones: [\"987\", \"111\"],       // No address\n      phones: phones},\n    {address: {street: \"Main St\"}, _phones: undefined,  // _No phones\n      phones: phones}\n  ]\n};\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);",
        "title": "onError=\"fallback string...\" ",
        "height": "180"
      },
      {
        "_type": "para",
        "title": "Setting onError to an expression",
        "text": "More specific or powerful behavior can be obtained by setting onError to an expression, such as:\n\n```jsr\n{{:address.street onError=name + \" has no address\"}}\n```\n\n```jsr\n{{:address.street onError=~errorMessages(1, name, 'address')}}\n```"
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
            "text": "```jsr\n{{for phones() onError=name + \" has no phones\"}} ...\n```\n\n```jsr\n{{:address.street onError=~errorMessages(1, name, \"address\")}}\n```\n\n```js\n$.views.helpers(\"errorMessages\", function(id, param1, param2) {\n  if (id === 1) { return param1 + \" has no \" + param2; } ...\n});\n```\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n{{for members}}\n  <div>Name: {{:name}}<br/>\n    Phones:\n    {{for phones() onError=name + \" has no phones\"}}\n      {{:}}\n    {{/for}}\n    <br/>\n    <b>{{:address.street onError=~errorMessages(1, name, \"address\")}}</b>\n    <hr/>\n  </div>\n{{/for}}\n</script>",
        "code": "function phones() {\n  if (!this._phones) {\n    throw new Error(\"phones() error\");\n  }\n  return this._phones;\n}\n\nvar team = {\n  members: [\n    {name: \"Bill\", address: {street: \"1st Ave\"}, _phones: [\"888\", \"456\"],\n      phones: phones},\n    {name: \"Jane\", address: undefined, _phones: [\"987\", \"111\"],       // No address\n      phones: phones},\n    {name: \"Ava\", address: {street: \"Main St\"}, _phones: undefined,  // _No phones\n      phones: phones}\n  ]\n};\n\n$.views.helpers(\"errorMessages\", function(id, param1, param2) {\n  if (id === 1) {\n    return param1 + \" has no \" + param2;\n  } \n});\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n",
        "height": "270",
        "jsrJsvJqui": "jsr",
        "title": "onError=someExpression..."
      },
      {
        "_type": "para",
        "title": "Setting onError to a function",
        "text": "If `onError=myOnErrorHandler` is set to a function, then the function will be called when there is an error.\n\n- If the function returns a string, then that string will be rendered, replacing the template block\n- If the function has no return value, then the error message will be rendered\n\nFor example, you can provide a `person.error()` error handler method on a person object, and set `onError=error`. Or you can use global helper (or a helper passed to the render function), and set `onError=~myErrorHandler`, such as the following to log the error and display just the empty string:\n\n```js\nfunction myErrorHandler(e, view) {\n  console.log(...); // Log the error \n  return \"\";        // Display the empty string \n}\n```\n\nThe parameters of the onError handler function -- `myHandler(e, view)` -- will be:\n\n- `e` -- the `error` object\n- `view` -- the current `view` object\n- The `this` pointer will be the current data item, `view.data`"
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
            "text": "```jsr\n{{:address.street onError=~myOnError}}\n```\n```js\nfunction onErrorHandler(e, view) {\n  console.log(e.message);\n  if (!this.address) {\n    return this.name + \" has no address (\" + e.message + \")\";\n  }\n}\n\nvar html = $(\"#teamTmpl\").render(team, {myOnError: onErrorHandler});\n```"
          }
        ],
        "code": "var team = {\n  members: [\n    {name: \"Bill\", address: {street: \"1st Ave\"}},\n    {name: \"Jane\", address: undefined}           // No address\n  ]\n};\n\nfunction onErrorHandler(e, view) {\n  console.log(e.message);\n  if (!this.address) {\n    return this.name + \" has no address (\" + e.message + \")\";\n  }\n}\n\nvar html = $(\"#teamTmpl\").render(team, {myOnError: onErrorHandler});\n\n$(\"#result\").html(html);\n",
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n{{for members}}\n  <div>Name: {{:name}}<br/>\n    <b>{{:address.street onError=~myOnError}}</b>\n    <hr/>\n  </div>\n{{/for}}\n</script>\n",
        "height": "150",
        "jsrJsvJqui": "jsr",
        "title": "onError=~myOnError"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<br/>\n## Setting debug mode",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "The `$.views.settings.dbgMode(...)` setting provides control of error handling during rendering, similar to the `onError` feature [above](#onerror@onerror), but operating at a global level rather than on individual tags.\n\nThese two approaches are complementary and can be used together.  "
      },
      {
        "_type": "para",
        "title": "Setting debug mode to true",
        "text": "- By default *debug mode* is **false** -- and *an exception will be thrown if a JavaScript error is encountered while rendering a template block*\n- If *debug mode* is set to **true** -- error messages encountered while rendering a template block *will replace the rendered content of that block*\n\n***To set debug mode to true:***\n\n```js\n$.views.settings.debugMode(true);\n```\n\n***To set debug mode back to false:***\n\n```js\n$.views.settings.debugMode(false);\n```\n\n***To get current debug mode:***\n\n```js\nvar isDebugMode = $.views.settings.debugMode(); // false by default\n```\n\nIn the following example *debug mode* is set to `true`. The error message is rendered, replacing the template block.\n\n(Choose *Try it* and change *debug mode* to `false`, to see the difference.)\n",
        "anchor": "debugmode"
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
            "text": "*Code:*\n\n```js\n$.views.settings.debugMode(true);\n```\n\nThe template block for Bill (who has no address) is replaced by the error message.\n\n```js\nvar team = {members: [\n {name:\"Jo\", address: {street: \"1st Ave\"}},\n {name:\"Bill\"}, // Bill does not have an address!!\n {name:\"Ava\", address: {street: \"Main St\"}}\n]};\n...\n```\n\n*Template:*\n\n```jsr\n{{for members}}\n  <div>{{:name}} - <b>{{:address.street}}</b></div>\n{{/for}}\n```"
          }
        ],
        "code": "$.views.settings.debugMode(true); \n// Change to $.views.settings.debugMode(false); - The error\n// will not be displayed, but an exception will be thrown.\n\nvar team = {members: [\n {name:\"Jo\", address: {street: \"1st Ave\"}},\n {name:\"Bill\"},  // Bill does not have an address!!\n {name:\"Ava\", address: {street: \"Main St\"}}\n]};\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n",
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n{{for members}}\n  <div>{{:name}} - <b>{{:address.street}}</b></div>\n{{/for}}\n</script>\n",
        "jsrJsvJqui": "jsr",
        "height": "100",
        "title": "Debug mode set to true"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following example also illustrates setting *debug mode* to `true`, but this time it is used with JsViews, and the `link(...)` method, rather than JsRender and `render(...)`.\n\nThe error conditions can arise both in expressions within tags, such as `{^{:manager.name}}` and data-link expressions such as `<input data-link='manager.name'`."
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
            "text": "*Template:*\n\n```jsr\nTeam:<div>\n  {{if owner}}\n    Owner: {^{:manager.name}}\n  {{/if}}\n</div>\nEdit: <input data-link='manager.name' />\n```\n\n*Code:*\n\n```js\n$.views.settings.debugMode(true);\n// Debug mode is set to true, so error messages are rendered as content of corresponding template block.\n\nvar team = {owner:\n {name:\"Jo\"}\n}; // team.manager is undefined...\n...\ntmpl.link(\"#result\", team); // Error...\n```\n\nIf you choose *Try it* and change to `$.views.settings.debugMode(false);`, the error will instead be thrown as an exception.\n"
          }
        ],
        "html": "<style>input {width: 350px;}</style>\n<div id=\"result\"></div>\n\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  Team:<div> \n    {{for team}}\n      Owner: {^{:manager.name}}\n    {{/for}}\n  </div>\n  Edit: <input data-link='manager.name' />\n</script>\n",
        "code": "$.views.settings.debugMode(true);\n\nvar team = {owner:\n {name:\"Jo\"}\n}; // team.manager is undefined...\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", {team: team}); // Error...",
        "height": "90",
        "title": "Debug mode set to true &ndash; JsViews",
        "anchor": "datalink"
      },
      {
        "_type": "para",
        "title": "Setting debug mode to a string",
        "text": "By setting debug mode to a string rather than to `true`, no exception will be thrown, and the chosen string will be rendered, replacing the template block. \n\n```js\n$.views.settings.debugMode(\"Error!\");\n``` "
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
            "text": "```js\n$.views.settings.debugMode(\"Error!\"); \n```\n\nThe template block for *Bill* (who has no address) is replaced by `\"Error!\"`."
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n{{for members}}\n  <div>{{:name}} - <b>{{:address.street}}</b></div>\n{{/for}}\n</script>\n",
        "code": "$.views.settings.debugMode(\"Error!\");  // Do not throw exception - render \"Error!\"\n\nvar team = {members: [\n {name:\"Jo\", address: {street: \"1st Ave\"}},\n {name:\"Bill\"},  // Bill does not have an address!!\n {name:\"Ava\", address: {street: \"Main St\"}}\n]};\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n",
        "title": "Debug mode set to a default string",
        "jsrJsvJqui": "jsr",
        "height": "100"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In some scenarios the desired behavior may be to ignore errors during rendering, by skipping any template block with an error, rendering it as an empty string. This is achieved very easily, by simply writing:\n\n```js\n$.views.settings.debugMode(\"\");\n``` "
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
            "text": "```jsr\n$.views.settings.debugMode(\"\");\n```\n\nThe template block for *Bill* (who has no address) is skipped."
          }
        ],
        "title": "Debug mode set to empty string",
        "code": "$.views.settings.debugMode(\"\");   // Do not throw exception - render \"\"\n\nvar team = {members: [\n {name:\"Jo\", address: {street: \"1st Ave\"}},\n {name:\"Bill\"},  // Bill does not have an address!!\n {name:\"Ava\", address: {street: \"Main St\"}}\n]};\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n",
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n{{for members}}\n  <div>{{:name}} - <b>{{:address.street}}</b></div>\n{{/for}}\n</script>\n",
        "jsrJsvJqui": "jsr",
        "height": "90"
      },
      {
        "_type": "para",
        "title": "Providing a debug mode handler (function)",
        "text": "If debug mode is set to a function, the function will be called each time an error is encountered during rendering. \n\n- If the function returns a string, then that string will be rendered, replacing the template block\n- If the function has no return value, then the error message will be rendered\n\n```js\n$.views.settings.debugMode(myOnErrorHandler);\n\nfunction myOnErrorHandler(e, fallback, view) {\n  // This handler will log the error, and then display the empty string\n  console.log(...);\n  return \"\"; \n}\n```\n\nThe parameters of the debug mode error handler function -- `myHandler(e, fallback, view)` -- will be:\n\n- `e` -- the error object\n- `fallback` -- the fallback error string, provided by the *[onError fallback](#onerror@onerror)* specified on the tag, if there is one\n- `view` -- the current view object\n- The `this` pointer will be the current data item, `view.data`\n"
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
            "text": "```jsr\n{{:address.street onError='address'}}\n```\n\n```js\nfunction onErrorHandler(e, fallback, view) {\n  console.log(e.message);\n  if (fallback === \"address\") {\n    return '<b>Address error</b> for ' + this.name + '. <em>(\"' + e.message + '\")</em>';\n  }\n}\n```\n\n```js\n$.views.settings.debugMode(onErrorHandler);\n```\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n{{for members}}\n  <div>Name: {{:name}}<br/>\n    {{:address.street onError='address'}}\n    <hr/>\n  </div>\n{{/for}}\n</script>\n",
        "code": "var team = {\n  members: [\n    {name: \"Bill\", address: {street: \"1st Ave\"}},\n    {name: \"Jane\", address: undefined}           // No address\n  ]\n};\n\nfunction onErrorHandler(e, fallback, view) {\n  console.log(e.message);\n  if (fallback === \"address\") {\n    return '<b>Address error</b> for ' + this.name + '. <em>(\"' + e.message + '\")</em>';\n  }\n}\n\n$.views.settings.debugMode(onErrorHandler);\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n",
        "title": "Debug mode &ndash; onError handler",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "Advanced debugging, using debugging helpers",
        "text": "***Inserting breakpoints during rendering:***\n\nJsRender (and JsViews) provide some helpers for debugging code within compiled templates:\n\n- The `{{dbg expression/}}` tag\n- The `{{dbg: expression}}` converter\n- The `~dbg(expression)` helper function\n\nEach of the above will\n- evaluate the expression\n- output a `console.log(...)` call\n- throw and catch an exception -- which you can use as a break point by *stopping on caught exceptions*\n- render the evaluated expression\n\nThis is done by inserting code into the compiled template which calls into the built-in *dbgBreak* code:\n\n```js\nfunction dbgBreak(val) {\n  try {\n    console.log(\"JsRender dbg breakpoint: \" + val);\n    throw \"dbg breakpoint\"; // To break here, stop on caught exceptions.\n  }\n  catch (e) {}\n```\n\n`val` will be the result of evaluating `expression`.\n\nWhen rendering execution breaks at the above code, you can then step up through the call stack to the compiled template code, for further debugging.\n\nUsage examples: `{{dbg:...}}`, `{{:~dbg(...)}}`, `{{dbg .../}}` etc.\n\n***Breakpoints during data linking:***\n\nIn JsViews, a breakpoint can also be inserted during template data-linking, as in `{^{for ... onAfterLink=~dbg}}`.\n\n___Using {{*debugger}}:___\n\nAn alternative (but similar) debugging technique is to use `allowCode` to insert a `debugger;` statement directly into the compiled template code, as follows:\n\n*Code:*\n\n```js\nvar tmpl = $.templates({\n  markup: \"#myTmpl\",\n  allowCode: true // Alternatively use global setting: $.views.settings.allowCode(true)\n});\n```\n\n*Template:*\n\n```jsr\n...\n{{*debugger}}\n...\n```",
        "anchor": "dbg"
      }
    ]
  },
  "advanced": {
    "title": "JsRender &ndash; advanced topics",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "onerror",
            "label": "Error handling"
          },
          {
            "hash": "settings/advanced",
            "label": "Advanced settings"
          },
          {
            "hash": "jsrobjects",
            "label": "JsRender objects"
          }
        ]
      }
    ]
  },
  "apps": {
    "title": "Building apps",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Apps using JsRender",
        "text": "*JsRender* is a simple light-weight templating engine. It can be used in the browser within simple web pages, or within complex single-page apps, or in conjunction with other frameworks. It can also be used on the server, using *Node.js*.\n\nIt is highly flexible, expressive, and 'unopiniated' -- so it leaves you free to work within your own choice of overall application architecture (including architectures based on *MVVM*, *MVP* or *MVC* -- optionally with server/client integration), and lets you use your own flavor of data/model layer -- whether simple plain JavaScript objects, hand-coded *View Model* instances, or *[compiled View Models](#viewmodelsapi)*.\n\n\n"
      },
      {
        "_type": "para",
        "title": "Components of an app using JsRender",
        "text": "Any app or web page using JsRender templates will generally involve defining or registering the following elements:\n\n- one or more **templates** -- see *[Templates](#compiletmpl)*\n- a **'data Layer'** -- see *[JsRender: Data or View Model](#jsrmodel)*\n- optionally, **helpers** -- in the form of metadata, helper functions and converter functions, see *[Helpers](#helpers)* and *[Converters](#converters)*\n- optionally, **reusable components** for use within your templates -- see *[Custom tags](#tags)*"
      },
      {
        "_type": "para",
        "title": "Apps using JsViews",
        "text": "*JsRender* also provides optional integration with *JsViews*. *JsViews* is much more of a framework than *JsRender*. It does much more than just templating -- providing also data-binding, *MVVM* support, observability of the *data/View Model* layer, support for interactive encapsulated components (*JsViews tag controls*), and more. Nevertheless, it can also interoperate with other frameworks and components. See *[Building apps in JsViews](#jsvapps)* for more information."
      }
    ]
  },
  "getindex": {
    "title": "Iterating over arrays: accessing the array index",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "If you pass an array to the JsRender [`.render(myArray)`](#rendertmpl) method, or if you use [`{{for myArray}}`](#fortag),  in a template, JsRender will iterate over the array, and render an [*item view*](#views@itemview) for each item in the array.\n\nWithin an item view you can access the array-index of the current item, using `{{:#index}}`:\n\n- *Getting item index within a top-level item view (from `.render(myArray)`)*:\n\n  ```jsr\n  ...\n  {{:#index}}\n  ...\n  ```\n\n- *Getting item index within a `{{for myArray}}` block*:\n\n  ```jsr\n  {{for myArray}}\n    ...\n    {{:#index}}\n    ...\n  {{/for}}\n  ```\n\nIf there are additional nested tags, then from within the nested tags you can still access the index, by using `{{:#getIndex()}}`:\n\n- *Getting item index from nested tags within an item view*:\n\n  ```jsr\n  {{for myArray}}\n    ...\n    {{if ...}}\n      ...\n      {{:#getIndex()}}\n      ...\n    {{/if}}\n    ...\n  {{/for}}\n  ```\n\nSee [`index`](#viewobject@index) and [`getIndex()`](#viewobject@getIndex) for additional details.\n"
      },
      {
        "_type": "links",
        "title": "See also",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "views",
            "label": "View hierarchy"
          }
        ]
      }
    ]
  },
  "contextualparams": {
    "title": "Contextual parameters",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Defining contextual parameters",
        "text": "*Contextual parameters* provide a very convenient way of passing values in to nested tag contexts. (See *[View hierarchy](#views)*.)\n\nA contextual parameter is defined by simply writing `~myValue=...` (for any expression) on any block tag, such as `{{if}}` or `{{for}}`.\n\nThe resulting `~myValue` parameter can then be accessed within the block tag -- or deeper down within nested tag contexts, at any depth. \n\nFor example, the following template defines three contextual parameters, and uses them in nested contexts:\n\n```jsr\n...\n{{if isActive ~teamTitle=title ~teamData=#data ~teamIndex=#index}}\n  {{for members}}\n    {{if ~teamIndex>2}}\n      {{:~teamTitle}} {{:~teamData.description}}\n      ...\n```\n\n*Note:* You can also set contextual parameters on `{{else}}` blocks, such as in the following example which uses the same template for the `{{if}}` and `{{else}}` blocks, but assigns different values to the `~teamTitle` parameter in each case:\n\n```jsr\n{{if isActive ~teamTitle=activeTitle tmpl=\"teamTmpl\"}}\n{{else ~teamTitle=inactiveTitle tmpl=\"teamTmpl\"}}\n{{/if}}\n```\n"
      },
      {
        "_type": "para",
        "title": "itemVar &ndash; contextual parameter for data 'item' of block",
        "text": "The *itemVar* feature lets you set up a contextual parameter for the current data 'item' of a block. It is in effect an 'alias' for `#data` within the block.\n\nTo define an *itemVar* contextual parameter for a block tag, simply write `itemVar=~someName`. The parameter `~someName` can then be accessed like any other helper variable or contextual parameter, within nested contexts to any depth.\n\n```jsr\n...\n{{for teams itemVar=\"~team\"}}\n  ...\n  {{for members itemVar=\"~member\"}}\n    ...\n    {{if isActive}}\n      {{:~team.title}} {{:~member.name}}\n```"
      },
      {
        "_type": "para",
        "title": "Accessing root data: the built-in '~root' contextual parameter",
        "text": "The built-in contextual parameter `~root` provides direct access to the *root data* which was passed to the [`render()`](#rendertmpl) method (or [`link()`](#jsvlinktmpl) method if you are using JsViews). It can be accessed from anywhere within a template, at an level of nested tags.\n\n*Note:* If an array is passed to `render()` or `link()` then `~root` will be the array (so you can render `{{:root.length}}` for example).",
        "anchor": "root"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "views",
            "label": "View hierarchy"
          }
        ]
      }
    ]
  },
  "parentdata": {
    "title": "Accessing parent data",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Accessing \"parent\" data, from nested views. Passing in template variables",
        "text": "When a template (containing nested template tags) is rendered, the result is a [view hierarchy](#views) -- where the views provide information on how the underlying data objects map to the rendered UI.\n\nOften it is helpful to be able to access the data for a *parent view* from a [*nested* template](#views@nestedtmpl) or [block](#tagsyntax@blocktag) (*nested view*).\n\nThere are several ways to get to *parent data*:\n\n- Create a *[contextual parameter](#contextualparams)* to pass a value to nested views.\n\n  Here are three examples:\n\n  ```jsr\n  ...\n  {{if ... ~teamTitle=title ~teamData=#data ~teamIndex=#index}}\n    ...\n    {{for ...}}\n      ...\n      {{:~teamTitle}} {{:~teamData.title}} {{:~teamIndex}}\n  ```\n\n- Use [`itemVar`](#contextualparams) to provide a contextual parameter for the current data 'item' of a block, to be passed in to deeper nested contexts \n\n  ```jsr\n  ...\n  {{for members itemVar=\"~member\"}}\n    ...\n    {{props}}\n      ...\n      {{:~member.name}}\n  ```\n\n- Use the [`view.parent`](#viewobject@parent) property to step up through successive parent views (`#parent`, `#parent.parent` etc.):\n\n  ```jsr\n  ...\n  {{if ...}}\n    ...\n    {{for ...}}\n      ...\n      {{:#parent.parent.data.title}}\n  ```\n\n- Use the [`view.get(type)`](#viewobject@get) method to get to a parent view of a given `type`:\n\n  ```jsr\n  ...\n  {{if ...}}\n    ...\n    {{for ...}}\n      ...\n      {{:#get(\"if\").data.title}}\n\n  ```\n\n- Use the [`view.getIndex()`](#viewobject@getIndex) method to get to the index of a parent *\"item\"* view:\n\n  ```jsr\n  {{if ...}}\n    ...\n    {{for ...}}\n      ...\n      {{:#parent.getIndex()}}\n      {{:#getIndex()}}\n  ```\n\nHere is a sample showing all of these methods:"
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
            "text": "This sample shows all the ways to get to *parent data* described in the section above:\n\n- Create a *contextual parameter* to pass a value to nested views.<br/>\n- Use `itemVar` to provide a contextual parameter for the current data 'item' of a block, to be passed in to deeper nested contexts \n- Use the `view.parent` property to step up through successive parent views (`#parent`, `#parent.parent` etc.):\n- Use the `view.get(type)` method to get to a parent view of a given `type`:\n- Use the `view.getIndex()` method to get to the index of a parent *\"item\"* view:\n"
          }
        ],
        "html": "<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <div>\n    Team: {{:title}} -\n    {{mytag members/}}\n\n    {{if members.length\n      ~teamTitle=title\n      ~teamData=#data\n      ~teamIndex=#index\n    }}\n      Members: <ul>\n        {{for members\n          itemVar=\"~member\"\n        }}\n          <li>\n            {{:name}}\n            (\n              {{:~teamTitle}}\n              {{:~teamData.title}}\n              {{:#parent.parent.data.title}}\n              {{:#get(\"if\").data.title}}\n            )\n            <br/>\n            [\n              {{:~teamIndex}}\n              = {{:#parent.getIndex()}}\n              : {{:#getIndex()}}\n            ]\n            <br/>\n            {{props}}\n              {{:key}}: {{:prop}}\n              (\n                {{:~member.name}}\n              )\n            {{/props}}\n          </li>  \n        {{/for}}\n        </ul>\n    {{/if}}\n  </div>\n</script>\n\n<div id=\"result\"></div>",
        "code": "// mytag: custom tag to output \"1 member\" or \"n members\"\n$.views.tags(\"mytag\", \"{{:length == 1 ? '1 member' : length + ' members'}}<br/>\");\n// Alternative version of mytag:\n// $.views.tags(\"mytag\", \"{{if length == 1}}1 member{{else}}{{:length}} members{{/if}}<br/>\");\n\nvar teams = [\n  {title: \"The A Team\", members: [{name: \"Jeff\"}, {name: \"Maria\"}]},\n  {title: \"The B Team\", members: [{name: \"Francis\"}]}\n];\n\nvar html = $(\"#teamTemplate\").render(teams);\n\n$(\"#result\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "320"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "views",
            "label": "View hierarchy"
          }
        ]
      }
    ]
  },
  "jsrmodel": {
    "title": "JsRender: Data / View Model",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "*JsRender* is designed to work well with either plain JavaScript objects and arrays, or with instances of JavaScript classes, such as *View Model* classes.\n\nSo, for example, if you are using data obtained from a JSON request, you can choose between:\n- rendering your templates directly against the objects and arrays returned from the JSON request\n- passing the data through a 'mapping' process to create a hierarchy of *View Model* instances, and rendering your templates against those objects\n\nThe *plain objects* [approach](#jsrmodel@plain) is convenient and simple for getting rapidly up and running with templates. But for more complex projects the *View Model* approach is better for creating clean well-designed modular code, where each *View Model* has specific *getters*, *setters* and *methods*, and can have its own 'private' properties and state.\n"
      },
      {
        "_type": "para",
        "title": "Using JsRender built-in compiled View Models",
        "text": "*JsRender* will work well with your own 'hand-coded' *View Model* classes (see [below](#jsrmodel@vm)).\n\nBut in most cases it is simpler and better to use the [`$.views.viewModels(...)`](#jsrmodel@compilevm) API. This API lets you very easily and rapidly compile *View Model* classes for your own needs, following a standard pattern, and with some additional powerful features:\n\n- It provides a built-in mapping and unmapping feature for automatically converting from a plain object hierarchy (such as from a JSON request) to a hierarchy of *View Model* instances, or for converting back to plain data (such as for submitting to the server)\n- It also provides a `merge(...)` feature for incrementally updating the *View Model* hierarchy, using updated plain data from the server.\n"
      },
      {
        "_type": "para",
        "title": "Data / View Model with JsViews",
        "text": "All of the alternatives mentioned above (plain object hierarchies, hand-coded *View Model* classes, or JsRender *compiled View Model* classes) can also be used with *JsViews* data-binding and observable data. (For more information see *[JsViews: Data / View Model](#jsvmodel)* and *[JsViews: Compiled View Models](#jsvviewmodelsapi)*.)"
      },
      {
        "_type": "para",
        "title": "<b>Example: JsRender with plain objects and arrays</b>",
        "text": " "
      },
      {
        "_type": "code",
        "title": "Suppose this is our data from a JSON request:",
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n"
      },
      {
        "_type": "template",
        "title": "We'll render using a template structured like this:",
        "markup": "... \n{{:name}}\n...\n{{:address.street}}\n...\n{{for phones}}\n  ...      \n  {{:number}}\n  ...\n{{/for}}\n..."
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
            "markup": "... {{:name}} ..."
          },
          {
            "_type": "code",
            "title": "Render template against person (plain object)",
            "code": "$(\"#result\").html(tmpl.render(person));\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name}}</td></tr>\n    <tr><td>Street:</td><td>{{:address.street}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones}}\n          <tr><td>{{:number}}</td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Data: hierarchy of plain objects and arrays\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n// Render template against plain object hierarchy\n$(\"#result\").html(tmpl.render(person));\n\n",
        "height": "150",
        "jsrJsvJqui": "jsr",
        "title": "Render template directly against plain objects..."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now we'll convert the above sample to use *View Model* classes."
      },
      {
        "_type": "para",
        "title": "<b>Example: JsRender with 'hand-coded' View Model objects</b>",
        "text": "We'll convert the data to a corresponding hierarchy of simple 'hand-coded' *View Model* class instances. In each case we will replace properties by simple *getters*, and corresponding 'private' properties. ",
        "anchor": "vm"
      },
      {
        "_type": "para",
        "title": "View Model classes:",
        "text": "Here is the class definition for <em><b>Person</b></em>:\n\n```js\n// Constructor\nfunction Person(name, address, phones) {\n  // Initialize private properties\n  this._name = name;\n  this._address = address;\n  this._phones = phones;\n}\n\n// Prototype\nvar personProto = {\n  // Define a getter for each property \n  name: function() {\n    return this._name;\n  },\n  address: function() {\n    return this._address;\n  },\n  phones: function() {\n    return this._phones;\n  }\n};\n...\n```\n\nWe define exactly similar classes for our <em><b>Address</b></em> and <em><b>Phone</b></em> objects too.\n\nThe above pattern for *View Model* classes will work well with *JsRender*. (It will also work seamlessly with *JsViews* data-binding, if at some point you choose to upgrade to use *JsViews* features).\n\n*Note:* The standard JsRender *View Model* pattern provided by `$.views.viewModels` is similar, but provides also setters (along with optional *'observability'* for two-way binding in *JsViews*).",
        "anchor": "handvm"
      },
      {
        "_type": "para",
        "title": "Getter functions",
        "text": "Note that properties are now <em>getter</em> functions, which return the appropriate value (which may be of any type, including objects or arrays -- such as `address` and `phones` above).\n\nIn fact they are particular case of *[computed properties](#paths@computed)* -- a concept that can be used quite generally within *JsRender* and *JsViews*, not only for *View Model* properties.\n"
      },
      {
        "_type": "para",
        "title": "Template",
        "text": "To convert our template from using plain objects to using *View Model* objects, the only change we need to make is to add parens for our properties, which are now <em>getter</em> functions:\n\n```jsr\n... \n{{:name()}}\n...\n{{:address().street()}}\n...\n{{for phones()}}\n  ...      \n  {{:number()}}\n  ...\n{{/for}}\n...\n```"
      },
      {
        "_type": "para",
        "title": "Instantiate and render:",
        "text": "Now all we need to do is to construct our root `person` object (with its underlying hierarchy of *View Model* instance objects) and render the template against that object in the usual way."
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "samples/mvvm/person-view-models-jsr.js",
            "label": "person-view-models-jsr.js"
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
            "text": "```jsr\n... {{:name()}} ...\n```"
          },
          {
            "_type": "code",
            "title": "Instantiate View Model hierarchy",
            "code": "// Use previously defined View Model classes: Person, Address, Phone\nvar person = new Person(\n  \"Pete\",\n  new Address(\n    \"1st Ave\"),\n    [\n      new Phone(\"111 111 1111\"),\n      new Phone(\"222 222 2222\")\n    ]\n  );\n"
          },
          {
            "_type": "code",
            "title": "Render template against person object (instance of Person)",
            "code": "$(\"#result\").html(tmpl.render(person));"
          }
        ],
        "html": "<script src=\"mvvm/person-view-models-jsr.js\" ></script>\n\n<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones()}}\n          <tr><td>\n            {{:number()}}\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Instantiate View Model hierarchy\nvar person = new Person(\n  \"Pete\",\n  new Address(\"1st Ave\"),\n    [\n      new Phone(\"111 111 1111\"),\n      new Phone(\"222 222 2222\")\n    ]\n  );\n\n// Render template against person object (instance of Person)\n$(\"#result\").html(tmpl.render(person));",
        "height": "150",
        "jsrJsvJqui": "jsr",
        "title": "Render template against a View Model object hierarchy",
        "anchor": "vmsample"
      },
      {
        "_type": "para",
        "title": "Using the same function as both getter and setter",
        "text": "For properties which are <em>read-write</em>, the above *getter* functions can be replaced by a corresponding *getter/setter*, as follows: \n\n```js\nname: function(val) {\n  if (!arguments.length) {\n    return this._name; // If there is no argument, use as a getter\n  }\n  this._name = val;    // If there is a value argument, treat as a setter\n},\n```\n\nNote that when *JsRender* renders a template using a *get/set* property `{{:name()}}` it will *always call the function as a getter, not as a setter*. However the *setter* feature lets you modify the value of `name()` from code, using:\n\n```js\nsomePerson.name(\"newName\"); // setter\n```\n\nAlso, if you use the same *View Model* class with *JsViews* then the *setter* will be called:\n\n- when the user modifies a value with two-way data-binding such as `<input data-link=\"name()\" />`\n- when using `$.observable(person).setProperty(\"name\", \"newName\")` from code<br/>\n(See [JsViews Data/View Model](#jsvmodel) for details, and alternative *setter* patterns.)"
      },
      {
        "_type": "para",
        "title": "Adding methods and computed properties to the View Model ",
        "text": "Typically a *View Model* does not only provide *getter* (or *get/set*) properties -- but also other methods or computed properties corresponding to the appropriate logic at that point in the application. For example, a *View Model* for a *Person* might include a `selectPhone(...)` method or a `fullName()` computed property.\n\n"
      },
      {
        "_type": "para",
        "title": "<b>Example: Using JsRender compiled View Models, with $.view.viewModels(...)</b>",
        "text": "The built-in support in both *JsRender* and *JsViews* for compiled *View Models* makes it extremely easy to define *View Model* classes that include *get/set* properties using the pattern described above, along with any desired additional methods and computed properties. Simple calls to `$.views.viewModels(...)` allow you to compile *View Model* classes conforming to these patterns without having to manually write repetitive code for multiple such *get/set* properties.\n \nAnother advantage of the compiled *View Model* classes is when working with (or migrating to) *JsViews*. In that context the classes automatically become fully-fledged MVVM classes, with a rich range of features -- where the *Views* are observable data-linked templates.\n\nFor details on `$.views.viewModels` see: *[Compiled View Models](#viewmodelsapi)*.\n\nTo illustrate, let's convert our [sample above](#jsrmodel@vm) to use compiled *View Models*. At the same time we will add a `person.addPhone(...)` custom method to the `Person` *View Model* class, and we'll illustrate calling a setter -- `name(...)`:",
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
            "_type": "template",
            "title": "",
            "markup": "... {{:name()}} ..."
          },
          {
            "_type": "code",
            "title": "Compile View Model classes",
            "code": "...\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"], // get/set properties\n  extend: {addPhone: addPhone}            // Additional methods or properties\n});\n..."
          },
          {
            "_type": "code",
            "title": "Instantiate View Model hierarchy using constructors",
            "code": "var person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n"
          },
          {
            "_type": "code",
            "title": "Render template against person object (instance of Person)",
            "code": "$(\"#result\").html(tmpl.render(person));"
          },
          {
            "_type": "code",
            "title": "Call setter, call method...",
            "code": "...\nperson.name(\"newName\");           // Use the name(...) setter\n\n...\nperson.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method"
          }
        ],
        "html": "<style>button {margin-bottom: 9px;}</style>\n\n<button id=\"changeName\">Change name</button>\n<button id=\"addPhone\">Add Phone</button>\n\n<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones()}}\n          <tr><td>\n            {{:number()}}\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(Phone(phoneNo));\n}\n\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n// Instantiate View Model hierarchy using constructors\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n\n// Render template against person object (instance of Person)\n$(\"#result\").html(tmpl.render(person));\n\n// Button handlers\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n  $(\"#result\").html(tmpl.render(person));\n});",
        "height": "190",
        "jsrJsvJqui": "jsr",
        "title": "Render template against a hierarchy of compiled View Model objects",
        "anchor": "compilevmsample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the [corresponding sample](#jsvviewmodelsapi@compilevmsample) with JsViews and data-linking (and [this version](#jsvmodel@compilevmsample) with two-way binding)."
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios for compiled View Models, see:",
        "links": [],
        "topics": [
          {
            "hash": "viewmodelsapi",
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
            "hash": "jsv-model",
            "label": "JsViews: Data/View Model"
          },
          {
            "_type": "topic",
            "hash": "computed",
            "label": "Computed Observables"
          }
        ]
      }
    ]
  },
  "helpersapi": {
    "title": "Registering helpers: $.views.helpers()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "`$.views.helpers()` is used to register helpers, accessed within templates using the syntax `~myhelper`. See *[Using helpers](#helpers)* for information about what *helpers* are, and some additional ways of providing them to templates.\n\nThis topic provides more details.\n\nWith `$.views.helpers(...)` you can:\n- register one or more helpers globally, to be used in any template\n- add one or more helpers as [private resources](#helpersapi@private) for a parent template"
      },
      {
        "_type": "para",
        "title": "Registering one or more helpers",
        "text": ""
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.views.helpers(...)",
        "name": "helpers",
        "object": "$.views",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "name",
                "type": "string",
                "optional": false,
                "description": "name of helper - to be used in template path expressions as <code>~name...</code>"
              },
              {
                "_type": "param",
                "name": "helper",
                "type": "any type",
                "optional": false,
                "description": "the helper - a function, object, or value"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.helpers(\"format\", myFormatFunction);",
            "description": "Register a helper, for use in any template with the syntax:<br/>~name"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "namedHelpers",
                "type": "object",
                "optional": false,
                "description": "Object (hash) of keys (name of helper) and values (function, object, or value)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.helpers({\n  format: myFormatFunction,\n  utilities: {},\n  mode: \"filtered\"\n});",
            "description": "Register multiple helpers"
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
        "text": "Here is an example using a 'hierarchy' of helpers..."
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
            "text": "Here is an example using a 'hierarchy' of helpers...\n\n```js\n$.views.helpers({\n  ...\n  utilities: {\n    maxCount: 23,\n    subtractMax: function(val) {\n      return val - this.maxCount;\n    },\n    errorMessages: {\n      msg1: \"not available\"\n    }\n  },\n  ...\n});\n```\n\n```jsr\n{{:~utilities.subtractMax(sold) > 0\n    ? ~utilities.errorMessages.msg1\n    : \"immediate\"\n}}\n```"
          }
        ],
        "code": "function myFormatFunction(value, upper) {\n  return upper ? value.toUpperCase() : value.toLowerCase();\n}\n\n$.views.helpers({\n  format: myFormatFunction,\n  utilities: {\n    maxCount: 23,\n    subtractMax: function(val) {\n      return val - this.maxCount;\n    },\n    errorMessages: {\n      msg1: \"not available\"\n    }\n  },\n  mode: \"filtered\"\n});\n\nvar html = $(\"#myTemplate\").render({title: \"gizmo\", sold: 27});\n\n$(\"#result\").html(html);",
        "html": "<div id=\"result\"></div>\n\n<script id=\"myTemplate\" type=\"text/x-jsrender\">\n  {{:~format(title, true)}}\n\n  - availability:\n  {{if ~mode===\"filtered\"}}\n    <em>\n      {{:~utilities.subtractMax(sold) > 0\n          ? ~utilities.errorMessages.msg1\n          : \"immediate\"\n      }}\n    </em>\n  {{/if}}\n</script>",
        "title": "Register multiple helpers, including objects, etc.",
        "height": "40",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "Adding helpers as private resources for a parent template",
        "text": "You can pass in an existing template as an additional `parentTemplate` parameter, on  <em>any</em> call to  `$.views.helpers(...)`.\n\nIn that way the helper you are registering becomes a 'private helper resource' for the `parentTemplate`, rather than being registered globally:",
        "anchor": "private"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.views.helpers(namedHelpers[, parentTemplate])",
        "name": "",
        "object": "",
        "method": false,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "namedHelpers",
                "type": "object",
                "optional": false,
                "description": "Object (hash) of keys (name of helper) and values (function, object, or value)"
              },
              {
                "_type": "param",
                "name": "parentTemplate",
                "type": "object or string",
                "optional": true,
                "description": "Owner template - to which this/these helper(s) are being added as private resources"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.helpers({\n  format: myFormatFunction,\n  ...\n}, parentTemplate);",
            "description": "Add one or more helpers as private resources for a parent template"
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
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "hash": "helpers",
            "label": "Using helpers"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/helpers",
            "label": "Sample: Passing helpers to template.render()"
          }
        ]
      }
    ]
  },
  "helpers": {
    "title": "Using helpers",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "What are helpers?",
        "text": "JsRender templates are made up of HTML markup, text, and *template tags*. *Template tags* are used to evaluate data-paths or computed expressions, and insert those values into the rendered output.\n\nBut often the values you will want to insert are not actually taken from the data, but rather from other parameters or *metadata* which you want to use. And often you will want to process the values, using helper functions or other code, e.g. for converting values to other formats, or for computed values.\n\n*Helpers*, in JsRender, refers to any functions, objects, parameters or metadata which you want to provide, in addition to the actual data you passed to the [`render()`](#rendertmpl) method (or [`link()`](#jsvlinktmpl) method if you are using JsViews).\n\nHelpers can also be objects, arrays, etc.\n\nYou access helpers by prepending the `~` character. Here are some examples:\n\n```jsr\n{{:~myHelperValue}}\n{{:~myHelperFunction(name, title)}}\n{{for ~myHelperObject.mySortFunction(people, \"increasing\")}} ... {{/for}}\n```"
      },
      {
        "_type": "para",
        "title": "Passing in helpers",
        "text": "There are three ways to provide helpers:\n\n- Global helpers -- registered using [`$.views.helpers(myHelpers)`](#helpersapi)\n- Helpers registered for a specific template -- [`$.templates(\"mytmpl\", {markup: ..., helpers: myHelpers}`](#d.templates@resources)\n- Helpers passed in on a specific render call -- [`tmpl.render(data, myHelpers)`](#tmplrender@helpers)<br/>\n(Similarly you can [pass helpers](#jsvhelpers-converters) to JsViews `link()` calls)\n"
      },
      {
        "_type": "para",
        "title": "Contextual parameters",
        "text": "In addition to providing helpers as above, you can also define *[contextual parameters](#contextualparams)* within a template, which you access using the same `~someName` syntax as for regular helpers. "
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
            "text": "```js\nvar myHelpers = {format: myFormatFunction};\n\n$.views.helpers(myHelpers);\n```\n\n```jsr\n{{:~format(name, true)}}\n```"
          }
        ],
        "title": "Global helper: $.views.helpers(...)",
        "code": "function myFormatFunction(value, upper) {\n  return upper ? value.toUpperCase() : value.toLowerCase();\n}\n\nvar myHelpers = {format: myFormatFunction};\n\n$.views.helpers(myHelpers);\n\nvar html = $(\"#personTemplate\").render({name: \"Robert\"});\n\n$(\"#person\").html(html);",
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{:~format(name, true)}}\n</script>",
        "jsrJsvJqui": "jsr",
        "height": "40"
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
            "text": "```js\nvar myHelpers = {format: myFormatFunction};\n\n$.templates({\n  mytmpl: {\n    markup: \"#personTemplate\",\n    helpers: myHelpers\n  }\n});\n```\n\n```jsr\n{{:~format(name)}}\n{{:~format(name, true)}}\n```"
          }
        ],
        "title": "Helper resource for a specific template",
        "code": "function myFormatFunction(value, upper) {\n  return upper ? value.toUpperCase() : value.toLowerCase();\n}\n\nvar myHelpers = {format: myFormatFunction};\n\n$.templates({\n  mytmpl: {\n    markup: \"#personTemplate\",\n    helpers: myHelpers\n  }\n});\n\nvar html = $.render.mytmpl({name: \"Robert\"});\n\n$(\"#person\").html(html);",
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{:~format(name)}}\n  {{:~format(name, true)}}\n</script>",
        "jsrJsvJqui": "jsr",
        "height": "40"
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
            "text": "```js\nvar myHelpers = {format: myFormatFunction};\n\nvar html = $(\"#personTemplate\").render(data, myHelpers); \n```\n\n```jsr\n{{:~format(name, true)}}\n{{:~format(name)}}\n```\n\nSee [`template.render(...)`](#rendertmpl)"
          }
        ],
        "title": "Passing helpers with  a render() call",
        "code": "function myFormatFunction(value, upper) {\n  return upper ? value.toUpperCase() : value.toLowerCase();\n}\n\nvar data = {name: \"Robert\"};\n\nvar myHelpers = {format: myFormatFunction};\n\nvar html = $(\"#personTemplate\").render(data, myHelpers); \n\n$(\"#person\").html(html);",
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{:~format(name, true)}}\n  {{:~format(name)}}\n</script>",
        "jsrJsvJqui": "jsr",
        "height": "40"
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios see:",
        "links": [],
        "topics": [
          {
            "hash": "helpersapi",
            "label": "Registering helpers"
          }
        ]
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "hash": "rendertmpl",
            "label": "Render a template"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/helpers",
            "label": "Sample: Passing helpers to template.render()"
          },
          {
            "_type": "topic",
            "hash": "settings/delimiters@passing",
            "label": "Sample: Passing in terms as helpers"
          }
        ]
      }
    ]
  },
  "usetags": {
    "title": "Using custom tags",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "What is a custom tag?",
        "text": "JsRender custom tags are named tags `{{myTag ...}}`, which you can register, and then use in your templates.\n\nA tag renders itself as part of the template output. You determine how it renders, generally by providing either a <em>render</em> function or a template, when you declare your custom tag.\n\nThe render function, or the template, can access both named parameters (<em>props</em>) and unnamed parameters (<em>args</em>), as in:\n\n```jsr\n{{myTag arg0 arg1 namedProp1=xxx namedProp2=yyy}} ... {{/myTag}}\n```\n\nIn fact it can also access the current data item -- or even the whole hierarchy of views and data...\n\nWhen you also use JsViews, custom tags acquire a whole new dimension. &ndash; They become <em>tag controls</em>, and you can build rich and complex single page apps cleanly and simply using custom tag controls -- following an MVP or MVVM coding pattern. "
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
            "text": "The function is the <em>render</em> method for the tag"
          },
          {
            "_type": "code",
            "title": "Declaring the custom tag",
            "code": "function renderBoldP(value) {\n  return \"<p><b>\" + value + \"</b></p>\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);"
          },
          {
            "_type": "template",
            "title": "Using the tag",
            "markup": "This is the title:{{boldp title /}}"
          }
        ],
        "title": "1 - Simple custom tag using just a function",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  This is the title:{{boldp title /}}\n</script>",
        "code": "function renderBoldP(value) {\n   return \"<p><b>\" + value + \"</b></p>\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "80",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>Note:</em> the `this` pointer within the tag render function is the instance of the tag, and can be used in more advanced usage, as in the next two examples:"
      },
      {
        "_type": "para",
        "title": "Wrapping block content using a function-based custom tag",
        "text": "First of all -- what if we want our tag to be used as a block tag, and to render itself by wrapping the rendered block content with the <em>'bold p'</em> html -- `<b><p>...</p></b> `as in:\n\n```jsr\n{{boldp}}\n  This is inside our block content:<br/>\n  <em>{{:title}}</em>\n{{/boldp}}\n```"
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
            "text": "To render the block content, we call `this.tagCtx.render(val)`:\n\n```js\nfunction renderBoldP(val) {\n   return \"<p><b>\" + this.tagCtx.render(val) + \"</b></p>\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n```"
          }
        ],
        "title": "2 - Rendering block content from a custom tag function",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  {{boldp}}\n    This is inside our block content:<br/>\n    <em>{{:title}}</em>\n  {{/boldp}}\n</script>",
        "code": "function renderBoldP(val) {\n   return \"<p><b>\" + this.tagCtx.render(val) + \"</b></p>\";\n}\n\n$.views.tags(\"boldp\", renderBoldP);\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "80",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "",
        "text": "As well as calling the `render()` method of `this.tagCtx`, you can access `this.tagCtx.args`, `this.tagCtx.props`, `this.tagCtx.view.data` and more...\n\nThe `tagCtx.args` are the unnamed parameters. So in this example, there are two of them:\n\n```jsr\n{{someTag title name}}\n```\n\nIn addition to being accessible as `tagCtx.args`, unnamed parameters are also passed directly as parameters to the render method (if your tag is using one):\n\n```js\nfunction someTagRenderMethod(title, name) {\n  // Here, this.tagCtx.args[1] and the name parameter are the same thing\n}\n```\n\nNow here is an example which has one unnamed parameter and two named parameters. You can access named parameters from `tagCtx.props`:\n\n```jsr\n{{range members start=2 end=4}}\n```\n\nWe'll use that in our third sample, to show accessing properties from the render function of the tag:"
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
            "text": "This sample defines a `{{range}}` tag which iterates over an array which you pass as (unnamed) parameter. It also allows you to set named parameters `start` and `end`, to determine the range of iteration. (See also the <a href=\"#samples/tag-controls/range\">range</a> sample, for a more advanced implementation of a similar custom tag.)\n\nYou call it like this:\n\n```jsr\n{{range members start=1 end=2}}\n ...\n{{/range}}\n```\n\nAnd the render function code accesses context to get at those named and unnamed parameters... :\n\n```js\n$.views.tags(\"range\", function(array) {\n  ...\n  var start = this.tagCtx.props.start,\n  ...\n  // Render tag content, for this data item\n  ret += this.tagCtx.render(array[i]);\n  ...\n  return ret;\n});\n```"
          }
        ],
        "code": "$.views.tags(\"range\", function(array) {\n  var ret = \"\",\n    start = this.tagCtx.props.start,\n    end = this.tagCtx.props.end;\n  for (var i = start; i <= end; i++) {\n    // Render tag content, for this data item\n    ret += this.tagCtx.render(array[i]);\n  }\n  return ret;\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <p><b>{{:title}}</b></p>\n  <ul>\n    {{range members start=1 end=2}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n</script>",
        "height": "120",
        "title": "3 - Accessing tagCtx properties from the tag render function",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "Using a tag template instead of a render function",
        "text": "If the tag definition includes a template, but no render method, then the template will be used to render the tag.\n\nLet's re-implement all three examples above using custom tags which use templates instead of render functions."
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
            "title": "Declaring the custom tag",
            "text": "```js\n$.views.tags(\"boldp\", {\n  template: \"<p><b>{{:~tag.tagCtx.args[0]}}</b></p>\"\n});\n```\n\nAs you see, the template is accessing the unnamed parameter `tagCtx.args[0]`.\n\nThe result is identical to the other implementation using a function. You call it just the same:\n\n```jsr\n{{boldp title /}}\n```"
          }
        ],
        "code": "$.views.tags(\"boldp\", {\n  template: \"<p><b>{{:~tag.tagCtx.args[0]}}</b></p>\"\n});\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  {{boldp title /}}\n</script>",
        "title": "1b - Simple custom tag using just a template",
        "height": "60",
        "jsrJsvJqui": "jsr"
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
            "text": "To render block content, we use `{{include tmpl=~tag.tagCtx.content/}}`\n\n```js\ntemplate: \"<p><b>{{include tmpl=~tag.tagCtx.content/}}</b></p>\"\n```\n\nHere we are accessing the `content` property on the `tagCtx`, which provides a compiled template for the block content.\n\nIt is also made available as a `content` property on the `view` object -- and can be accessed from within a template using `#content` -- which is an example of a `view path` -- equivalent to `#view.content`. You can try out that alternative syntax by choosing <em>Try it</em> and changing the template above to `<p><b>{{include tmpl=#content/}}</b></p>`."
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  {{boldp}}\n    This is the title:<br/>\n    <em>{{:title}}</em>\n  {{/boldp}}\n</script>",
        "code": "$.views.tags(\"boldp\", {\n  template: \"<p><b>{{include tmpl=~tag.tagCtx.content/}}</b></p>\"\n});\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "80",
        "title": "2b - Rendering block content from a custom tag template",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Finally let's re-implement the third example using just a template. \n\nEven this example can be implemented as a custom tag which has no code at all. -- Just a template, which is also able to access all the context that we were able to access from code in our `render()` function above.\n\nThis illustrates the power of declarative templates..."
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
            "text": "The template accesses the same context as the function code above, to get at those named and unnamed parameters... :\n\n```jsr\n{{for ~tag.tagCtx.args[0]}}\n  {{if #index >= ~tag.tagCtx.props.start && #index <= ~tag.tagCtx.props.end}}\n    {{include tmpl=~tag.tagCtx.content/}}\n  {{/if}}\n{{/for}}\n```\n\nThen after filtering for the items within the chosen range, using nested `{{for}}{{if}` tags, it renders the original block content for those items using `{{include tmpl=~tag.tagCtx.content/}}`."
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <p><b>{{:title}}</b></p>\n  <ul>\n    {{range members start=1 end=2}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n</script>",
        "code": "$.views.tags(\"range\", {\n  template: \n    \"{{for ~tag.tagCtx.args[0]}}\" +\n      \"{{if #index >= ~tag.tagCtx.props.start && #index <= ~tag.tagCtx.props.end}}\" +\n        \"{{include tmpl=~tag.tagCtx.content/}}\" +\n      \"{{/if}}\" +\n    \"{{/for}}\"\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "120",
        "title": " 3b - Accessing more context from the tag template",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "Custom tags using both a render function <b>and</b> a template",
        "text": "If there is both a template and a render method, then the template will only be used if the render method returns <em>undefined</em>\n\nLet's take our `{{range}}` example using a render function, but provide a template which will be used as \"fallback\" rendering for the tag in the case when there are no items to render in the chosen range:"
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
            "text": "First we will change the original code to test whether the item exists in the array, before rendering the block content.\n\nAnd secondly, we will make sure that when there is an item we do render the block content and not the template. So we call `this.tagCtx.content.render(array[i])`, rather than `this.tagCtx.render(array[i])`.\n\nThat's because `this.tagCtx.render(...)` will actually look to see if there is template associated with the tag, (either a template on the tag definition, or a `tmpl` property on the tag) -- in which case it will render that template and not the block content... \n\n```js\nfor (var i = start; i <= end; i++) {\n  if (array[i]) {\n    // Render tag block content, for this data item\n    ret += this.tagCtx.content.render(array[i]);\n  }\n}\n```\n\nFinally, if there are no items to render, we will return undefined, so the tag will fall back on the template rendering.\n\n```js\nreturn ret || undefined;\n```\n\nAnd here is the \"fallback\" template:\n\n```jsr\ntemplate: \"<li>Nothing to render</li>\"\n```"
          }
        ],
        "code": "$.views.tags({\n  range: {\n    render: function(array) {\n      var ret = \"\",\n        start = this.tagCtx.props.start,\n        end = this.tagCtx.props.end;\n      for (var i = start; i <= end; i++) {\n        if (array[i]) {\n          // Render tag block content, for this data item\n          ret += this.tagCtx.content.render(array[i]);\n        }\n      }\n      return ret || undefined;\n    },\n    template: \"<li>Nothing to render</li>\"\n  }\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\n",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <h3>Members 2 to 4</h3>\n  <ul>\n    {{range members start=1 end=3}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n\n  <h3>Members 5 to 8</h3>\n  <ul>\n    {{range members start=4 end=7}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n</script>",
        "height": "206",
        "jsrJsvJqui": "jsr",
        "title": "A render() function and a template as \"fallback\""
      },
      {
        "_type": "para",
        "title": "Custom tags and 'tag controls'",
        "text": "If you use JsViews, your custom tag can be developed into a fully functional <em>tag control</em>, with its own life-cycle, properties and methods, etc. It can be used as a <em>presenter</em> according to the MVP pattern."
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "samples/jsr/tags",
            "label": "Samples: JsRender custom tags"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls",
            "label": "Samples: JsViews tag controls"
          }
        ]
      }
    ]
  },
  "convertersapi": {
    "title": "Registering converters: $.views.converters()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See *[Using converters](#converters)* for an overview of what *converters* are, and some examples.\n\nThis topic provided more details.\n"
      },
      {
        "_type": "para",
        "title": "Using custom or built-in converters",
        "text": "In JsRender, a converter is a convenient way of processing or formatting a data-value, or the result of expression evaluation.\n\nYou use built-in converters to *HTML-encode*, *attribute-encode*, or *URL-encode*: \n\n```jsr\n{{html:movie.description}} - This data is HTML encoded\n{{>movie.description}} - (Alternative syntax) - This data is HTML encoded\n\n{{url:~getTheFilePath()}} - This expression will be URL-encoded\n```\n\nAnd you can register custom converters. For example you might register a date formatter or an upper-case converter:\n\n```jsr\n{{daymonth:invoice.date}} - This date uses my 'daymonth' formatter \n{{upper:name}} - This uses my 'upper' converter \n```\n\n(See: [sample](#converters@simple).)\n\nYou can also use converters with any JsRender tag, not just the `{{: ...}}` tag, using the following syntax:\n\n```jsr\n{{someTag convert='myconverter' ...}}\n```\n\n(See: [sample](#useconverters@fortag).)\n\n***Note:*** With JsViews, you can use converters with two-way data-binding, and you will have a <em>convert</em> and a <em>convertBack</em> converter -- one for each direction."
      },
      {
        "_type": "para",
        "title": "Registering converters",
        "text": "`$.views.converters()` is used to register converters.\n\nWith `$.views.converters(...)` you can:\n- register one or more converters globally, to be used in any template\n- add one or more converters as [private resources](#convertersapi@private) for a parent template"
      },
      {
        "_type": "para",
        "title": "Registering one or more converters",
        "text": "A simple sample of registering a converter is shown [here](#converters@simple)."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.views.converters(...)",
        "name": "converters",
        "object": "$.views",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "name",
                "type": "string",
                "optional": false,
                "description": "name of converter - to be used in template markup: <code>{{<b>name:</b></code> ...}}"
              },
              {
                "_type": "param",
                "name": "converterFn",
                "type": "function",
                "optional": false,
                "description": "Converter function. Takes <code>val</code> parameter and returns converted value"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.converters(\"upper\", function(val) {\n  return val.toUpperCase();\n});\n\n{{upper: \"upper case: \" + nickname}}",
            "description": "Register a converter"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "namedConverters",
                "type": "object",
                "optional": false,
                "description": "Object (hash) of keys (name of converter) and values (converter functions)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.converters({\n  upper: function(val) {...},\n  lower: function(val) {...}\n});",
            "description": "Register multiple converters"
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
        "title": "Adding converters as private resources for a parent template",
        "text": "You can pass in an existing template as an additional `parentTemplate` parameter, on  <em>any</em> call to  `$.views.converters(...)`.\n\nIn that way the converter you are registering becomes a 'private converter resource' for the `parentTemplate`, rather than being registered globally:",
        "anchor": "private"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.views.converters(...) &mdash; adding to parent template",
        "name": "converters",
        "object": "$.views",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "name",
                "type": "string",
                "optional": false,
                "description": "name of converter - to be used in template markup: <code>{{<b>name:</b></code> ...}}"
              },
              {
                "_type": "param",
                "name": "converterFn",
                "type": "function",
                "optional": false,
                "description": "Converter function. Takes <code>val</code> parameter and returns converted value (See <b>API: function converterFn</b> below for details)"
              },
              {
                "_type": "param",
                "name": "parentTemplate",
                "type": "object or string",
                "optional": true,
                "description": "Owner template - to which this converter is being added as private resource"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.converters(\n  \"upper\",\n  function(val) { ... },\n  parentTemplate\n);",
            "description": "Register a converter as private resources for a parent template"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "namedConverters",
                "type": "object",
                "optional": false,
                "description": "Object (hash) of keys (name of converter) and values (converter functions)"
              },
              {
                "_type": "param",
                "name": "parentTemplate",
                "type": "object or string",
                "optional": true,
                "description": "Owner template - to which this/these converter(s) are being added as private resources"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.converters({\n  upper: function(val) {...},\n  lower: function(val) {...}\n}, parentTemplate);",
            "description": "Add one or more converters as private resources for a parent template"
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
        "title": "Unregister a named converter",
        "text": "To unregister a previously registered <em>converter</em>, pass `null` to `$.views.converters()`:\n\n```js\n$.views.converters(\"myCvt\", null);\n// Named converter \"myCvt\" is no longer registered\n```"
      },
      {
        "_type": "para",
        "title": "Converter functions",
        "text": "In most cases a converter function will return a computed value based on the input parameter `val`:\n\n```js\nfunction myConverter(val) {\n  ... \n  return computedVal; // converted/encoded/formatted value for 'val'\n}\n```\n\nwhere `val` comes from the data value or expression passed to the tag `{{myconverter: someExpression}}`. \n\n(See: [sample](#converters@simple).)"
      },
      {
        "_type": "para",
        "title": "Converter function signature",
        "text": "However a converter can access multiple [tag arguments](#tagsyntax@tagparams), to produce the computed value which it provides to the tag. Furthermore, the `this` pointer within the converter function is the [instance](#tagobject) of the tag, which allows it to access much more, including [named tag parameters](#tagsyntax@tagparams) (`this.tagCtx.props...`), the full data object (`this.tagCtx.view.data`), and more...\n\n```js\nfunction myConverter(arg1, arg2, arg3 ...) {\n  var tag = this;\n  var namedTagParameters = tag.tagCtx.props; \n  ...\n  return computedArg1; // converted value for 'arg1' passed to tag\n}\n```\n\n(See [fullname sample](#converters@fullname).)\n\nHere is the *converterFn* API definition:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "function converterFn(val, ...) {...}",
        "name": "",
        "object": "",
        "method": false,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "val1",
                "type": "object or string",
                "optional": false,
                "description": "first tag argument"
              },
              {
                "_type": "param",
                "name": "val2",
                "type": "object or string",
                "optional": true,
                "description": "additional tag arguments"
              }
            ],
            "args": [],
            "sections": [],
            "example": "function myConverterFn(val1, val2, ...) {\n  var tag = this;\n  var tagProperties = tag.tagCtx.props;\n  ...\n  return ...;\n}\n\n$.views.converters(\"myconverter\", myConverterFn);",
            "description": "Converter function:<ul><li><b>parameters:</b> one or more tag arguments</li><li><b><code>this</code> pointer:</b> the tag instance</li><li>computes <b>return value:</b> which is passed to tag as first argument</li></ul>"
          }
        ],
        "description": "A converter function registered using <code>$.views.converters(...)</code>",
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
        "title": "Using converters with other tags",
        "text": "A converter can be used on any tag, thanks to the syntax\n\n```jsr\n{{someTag ... convert=...}}\n```\n\nwhere `someTag` can be any custom tag, or a built-in tag such as `{{if}}` or `{{for}}`.\n\nSee the [sample](#usingconverters@fortag) using `{{for people convert='odd'}}` to render only odd (or even) items in an array. \n\n(***Note:*** This syntax can actually be used with the `{{: ...}}` tag too -- by writing `{{:name convert='upper'}}`...)"
      },
      {
        "_type": "para",
        "title": "Example: a converter for {{if}}",
        "text": "Here is an advanced sample: an `\"inlist\"` converter for `{{if}}`.\n\n- It accepts an `item` argument and a `list` argument, and an optional `field` *named property*\n- It returns `true` if the `item` is found in the `list`\n- If there is a `field` specified, it takes the value of that field (property) on the `item` and searches for it in the `list`\n\nNote that the converter gets called once for the first `{{if}}` tag block and once for each subsequent `{{else}}` block.\n\n"
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
            "text": "```jsr\n  ...\n  {{for people}}\n  ...\n  {{if #data ~root.team convert='inlist'}}\n  ...\n  {{else #data ~root.reserve field=\"name\"}}\n  ...\n  {{else}}\n  ...\n  {{/for}}\n  ...\n  </ul>\n```\n\n```js\n// Converter function for looking for an item (first argument of tag) in a list (second argument of tag)\nfunction inlistConverter(item, list) {\n  // If no arguments, this is the final {{else}}.\n  ... // Return true\n\n  // If the tag has a 'field' property, look for the value of that field among the list items\n  ... // Return true if found\n\n  // If no field property, look for the item among the list items\n  ... // Return true if found\n\n  return false; // Not found\n}\n\n// Register 'inlist' converter just for the 'teamTmpl' template \n$.views.converters({inlist: inlistConverter}, teamTmpl);\n```"
          }
        ],
        "title": "'inlist' converter for {{if}} tag",
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <ul>\n    {{for people}}\n      <li>\n        <b>{{:name}}:</b>\n        {{if #data ~root.team convert='inlist'}}\n          Team member\n        {{else #data ~root.reserve field=\"name\"}}\n          Reserve\n        {{else}}\n          Not in team\n        {{/if}}\n      </li>\n    {{/for}}\n  </ul>\n</script>",
        "code": "var teamTmpl = $.templates(\"#teamTmpl\");\n\n// Converter function for looking for an item (first argument of tag) in a list (second argument of tag)\nfunction inlistConverter(item, list) {\n  // If no arguments, this is the final {{else}}\n  if (!list) {\n    return true; // Final else, so return true\n  }\n\n  var field = this.tagCtx.props.field;\n  var l = list.length;\n\n  // If the tag has a 'field' property, look for the value of that field among the list items\n  if (field) {\n    while (l--) {\n      if (item[field] === list[l]) {\n        return true; // Return true if found\n      }\n    }\n  }\n\n  // If no field property, look for the item among the list items\n  else {\n    while (l--) {\n      if (item === list[l]) {\n        return true; // Return true if found\n      }\n    }\n  }\n  return false; // Not found\n}\n\n// Register 'inlist' converter just for the 'teamTmpl' template \n$.views.converters({inlist: inlistConverter}, teamTmpl);\n\n// Define model \nvar model= {people: [\n    {name: \"Jo\"},\n    {name: \"Liza\"},\n    {name: \"Eli\"},\n    {name: \"Pete\"},\n    {name: \"Zoey\"}\n  ],\n  // Specify list of reserves, by name\n  reserve: [\"Eli\", \"Liza\"]\n};\n\n// Specify array of team members\nmodel.team = [model.people[0], model.people[3]];\n\n$(\"#result\").html(teamTmpl.render(model));\n",
        "jsrJsvJqui": "jsr",
        "height": "140",
        "anchor": "iftag"
      },
      {
        "_type": "para",
        "title": "Using helper functions, or dynamically assigning converters",
        "text": "The `convert=...` syntax allows you to assign a converter function without it being registered by name. For example it can be a data method or a helper function -- such as `{{someTag ... convert=~myConverterHelper}}`.\n\n(You can do this with the `{{: ...}}` tag too -- by writing `{{: ... convert=~myConverterHelper}}`...)\n\nYou can even assign a converter dynamically. For example you can write: `{{someTag ... convert=~getConverter(...)}}`, where the `getConverter()` helper might return either a string (for a converter registered by name) or a function to be used as converter.\n\nTo illustrate, here is a modified version of the previous sample, using `{{if ... convert=~getConverter()}}`:"
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
            "text": "```js\n// Converter function\nfunction inlistConverter(item, list) { ... }\n\n// Helper to dynamically assign converters\nfunction getConverter() {\n  return inlistConverter; // For this sample just return `inlistConverter` every time\n}\n\n// Register 'getConverter' helper just for the 'teamTmpl' template \n$.views.helpers(\"getConverter\", getConverter, teamTmpl);\n```\n\n```jsr\n{{if #data ~root.team convert=~getConverter()}}\n  ...\n{{/if}}\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <ul>\n    {{for people}}\n      <li>\n        <b>{{:name}}:</b>\n        {{if #data ~root.team convert=~getConverter()}}\n          Team member\n        {{else #data ~root.reserve field=\"name\"}}\n          Reserve\n        {{else}}\n          Not in team\n        {{/if}}\n      </li>\n    {{/for}}\n  </ul>\n</script>",
        "code": "var teamTmpl = $.templates(\"#teamTmpl\");\n\n// Converter function for looking for an item (first argument of tag) in a list (second argument of tag)\nfunction inlistConverter(item, list) {\n  // If no arguments, this is the final {{else}}\n  if (!list) {\n    return true; // Final else, so return true\n  }\n\n  var field = this.tagCtx.props.field;\n  var l = list.length;\n\n  // If the tag has a 'field' property, look for the value of that field among the list items\n  if (field) {\n    while (l--) {\n      if (item[field] === list[l]) {\n        return true; // Return true if found\n      }\n    }\n  }\n\n  // If no field property, look for the item among the list items\n  else {\n    while (l--) {\n      if (item === list[l]) {\n        return true; // Return true if found\n      }\n    }\n  }\n  return false; // Not found\n}\n\n// Helper to dynamically assign converters\nfunction getConverter() {\n  return inlistConverter; // For this sample just return `inlistConverter` every time\n}\n\n// Register 'getConverter' helper just for the 'teamTmpl' template \n$.views.helpers(\"getConverter\", getConverter, teamTmpl);\n\n// Define model \nvar model= {people: [\n    {name: \"Jo\"},\n    {name: \"Liza\"},\n    {name: \"Eli\"},\n    {name: \"Pete\"},\n    {name: \"Zoey\"}\n  ],\n  // Specify list of reserves, by name\n  reserve: [\"Eli\", \"Liza\"]\n};\n\n// Specify array of team members\nmodel.team = [model.people[0], model.people[3]];\n\n$(\"#result\").html(teamTmpl.render(model));\n",
        "jsrJsvJqui": "jsr",
        "height": "140",
        "title": "Dynamically assigning a converter"
      },
      {
        "_type": "para",
        "title": "Built-in converters:",
        "text": "JsRender has the following built-in converters/encoders:\n\n- Built-in HTML encoder: [`{{html: ...}}`](#convertersapi@html) -- accessed programmatically as [`$.views.converters.html()`](#convertersapi@html)\n- Built-in attribute encoder: [`{{attr: ...}}`](#convertersapi@attr) -- accessed programmatically as [`$.views.converters.attr()`](#convertersapi@attr)\n- Built-in URL encoder: [`{{url: ...}}`](#convertersapi@url) -- accessed programmatically as [`$.views.converters.url()`](#convertersapi@url)"
      },
      {
        "_type": "para",
        "title": "Built-in HTML encoder",
        "text": "JsRender includes an HTML encoder, which you can use programmatically as follows:\n\n```js\nvar myHtmlEncodedString = $.views.converters.html(myString);\n```\n\nThe same encoder is accessed declaratively as a converter, as in the following two examples:\n\n```jsr\n{{html:myExpression}}\n\n{{>myExpression}}\n```\n\nIn fact [`{{>...}}`](#htmltag) is exactly equivalent to `{{html:...}}` and is provided as a simpler syntax for HTML encoding values taken from data or from expressions and rendered within HTML content. \n\n(***Note:*** the [`{{> ...}}`](#htmltag) tag should be used in place of the [`{{: ...}}`](#assigntag) tag whenever the data being rendered is not full trusted -- in order to prevent HTML injection attacks.)",
        "anchor": "html"
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
            "code": "var value = \"< > ' \\\" &\";\n\nvar result = $.views.converters.html(value);\n\nalert(result);"
          }
        ],
        "code": "var value = \"< > ' \\\" &\";\nvar result = $.views.converters.html(value);\n\n$(\"#show\").on(\"click\", function() {\n  alert(result);\n});",
        "html": "<button id=\"show\">Show result</button>\n\n",
        "height": "46",
        "jsrJsvJqui": "jsr",
        "title": "Calling the HTML encoder"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "HTML encoder",
        "name": "html",
        "object": "$.views.converters",
        "method": true,
        "returns": "HTML-encoded string",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "valueToEncode",
                "type": "string",
                "optional": false,
                "description": "input string to be HTML-encoded"
              }
            ],
            "args": [],
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "Encodes according to the following scheme:\n<br/><br/>\n`&` &rarr; `&amp;`<br/>\n`<` &rarr; `&lt;`<br/>\n`>` &rarr; `&gt;`<br/>\n`\\x00` &rarr; `&#0;`<br/>\n`'` &rarr; `&#39;`<br/>\n`\"` &rarr; `&#34;`<br/>\n<code>\\`</code> &rarr; `&#96;`<br/>\n`=` &rarr; `&#61;`\n"
              }
            ],
            "example": "var encoder = $.views.converters.html;\nvar encodedString = encoder(myString);",
            "description": "Returns the HTML-encoded string"
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
        "title": "Built-in attribute encoder",
        "text": "JsRender includes an encoder intended for use when attribute encoding is needed. You can use it programmatically as follows:\n\n```js\nvar myAttributeEncodedString = $.views.converters.attr(myString);\n```\n\nThe same encoder is accessed by declaratively as a converter:\n\n```jsr\n{{attr:myExpression}}\n```\n\nA typical use case would be to encode an HTML attribute value in a template:\n\n```jsr\n<div title=\"{{attr:description}}\">...</div>\n```",
        "anchor": "attr"
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
            "code": "var value = \"< > ' \\\" &\";\n\nvar result = $.views.converters.attr(value);\n\nalert(result);"
          }
        ],
        "code": "var value = \"< > ' \\\" & =\";\nvar result = $.views.converters.attr(value);\n\n$(\"#show\").on(\"click\", function() {\n  alert(result);\n});",
        "html": "<button id=\"show\">Show result</button>\n\n",
        "height": "46",
        "jsrJsvJqui": "jsr",
        "title": "Calling the 'attribute' encoder"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "Attribute encoder",
        "name": "attr",
        "object": "$.views.converters",
        "method": true,
        "returns": "Attribute-encoded string",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "valueToEncode",
                "type": "string",
                "optional": false,
                "description": "input string to be attribute-encoded"
              }
            ],
            "args": [],
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "Encodes according to the following scheme:\n<br/><br/>\n`&` &rarr; `&amp;`<br/>\n`<` &rarr; `&lt;`<br/>\n`>` &rarr; `&gt;`<br/>\n`\\x00` &rarr; `&#0;`<br/>\n`'` &rarr; `&#39;`<br/>\n`\"` &rarr; `&#34;`<br/>\n<code>\\`</code> &rarr; `&#96;`<br/>\n`=` &rarr; `&#61;`"
              },
              {
                "_type": "para",
                "title": "",
                "text": "Note that this scheme encodes more characters than is sometimes the case for attribute encoding. In fact currently `{{attr: ...}}` and `{{html: ...}}` are equivalent. This ensures that using attribute encoding when HTML encoding should have been used will not expose an injection attack risk from untrusted data."
              }
            ],
            "example": "var encoder = $.views.converters.attr;\nvar encodedString = encoder(myString);",
            "description": "Returns the attribute-encoded string"
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
        "title": "Built-in URL encoder",
        "text": "JsRender includes a URL encoder, which you can use programmatically as follows:\n\n```js\nvar myUrlEncodedString = $.views.converters.url(myString);\n```\n\nThe same encoder is accessed by declaratively as a converter:\n\n```jsr\n{{url:myExpression}}\n```\n\nA typical use case would be to encode a HTML URL attribute value in a template:\n\n```jsr\n<img src=\"{{url:imageurl}}\"/>\n```",
        "anchor": "url"
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
            "code": "var value = \"<_>_\\\"_ \";\n\nvar result = $.views.converters.url(value);\n\nalert(result);"
          }
        ],
        "code": "var value = \"<_>_\\\"_ \";\nvar result = $.views.converters.url(value);\n\n$(\"#show\").on(\"click\", function() {\n  alert(result);\n});",
        "html": "<button id=\"show\">Show result</button>\n",
        "height": "46",
        "jsrJsvJqui": "jsr",
        "title": "Calling the 'url' encoder"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "URL encoder",
        "name": "url",
        "object": "$.views.converters",
        "method": true,
        "returns": "URL-encoded string",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "valueToEncode",
                "type": "string",
                "optional": false,
                "description": "input string to be URL-encoded"
              }
            ],
            "args": [],
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "Internally encodes by calling the JavaScript function `encodeURI`."
              }
            ],
            "example": "var encoder = $.views.converters.url;\nvar encodedString = encoder(myString);",
            "description": "Returns the URL-encoded string"
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
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "converters",
            "label": "Using converters"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/converters",
            "label": "Converters and encoding sample"
          }
        ]
      }
    ]
  },
  "converters": {
    "title": "Using converters",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "What are converters?",
        "text": "In JsRender, a converter is a convenient way of processing or formatting data-value, or the result of expression evaluation.\n\nYou use built-in converters to *HTML-encode*, *attribute-encode*, or *URL-encode*: \n\n```jsr\n{{html:movie.description}} - This data is HTML encoded\n{{>movie.description}} - (Alternative syntax) - This data is HTML encoded\n\n{{url:~getTheFilePath()}} - This expression will be URL-encoded\n```\n\nAnd you can register custom converters. For example you might register a date formatter or an upper-case converter:\n\n```jsr\n{{daymonth:invoice.date}} - This date uses my 'daymonth' formatter \n{{upper:name}} - This uses my 'upper' converter \n```"
      },
      {
        "_type": "para",
        "title": "Built-in converters",
        "text": "JsRender has the following built-in converters -- based on encoders:\n\n- Built-in HTML encoder: [`{{> ...}}`](#convertersapi@html)\n- Built-in attribute encoder: [`{{attr ...}}`](#convertersapi@attr)\n- Built-in URL encoder: [`{{url ...}}`](#convertersapi@url)"
      },
      {
        "_type": "para",
        "title": "Registering a converter",
        "text": "You can register your own custom converters, using [`$.views.converters()`](#convertersapi) as in:\n\n```js\n$.views.converters(\"upper\", function(val) {\n  // Convert data-value or expression to upper case\n  return val.toUpperCase();\n});\n```\n\nTo use the `\"upper\"` converter with the `{{:...}}` tag, you write:\n\n```jsr\n{{upper:...}}\n```\n\nHere it is in a sample:"
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
            "text": "```js\n$.views.converters(\"upper\", function(val) {\n  return val.toUpperCase();\n});\n```\n\n```jsr\nName: {{:name}}. Upper case nickname: {{upper:nickname}}\n...\n{{upper: \"This will be upper case too\"}} \n```"
          }
        ],
        "code": "$.views.converters(\"upper\", function(val) {\n  return val.toUpperCase();\n});\n\nvar person = {name: \"Robert\", nickname: \"Bob\"};\n\nvar html = $(\"#personTemplate\").render(person);\n\n$(\"#person\").html(html);",
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  Name: {{:name}}. Upper case nickname: {{upper:nickname}}\n  <br/><br/>\n  {{upper: \"This will be upper case too\"}} \n</script>",
        "height": "90",
        "title": "A simple converter",
        "jsrJsvJqui": "jsr",
        "anchor": "simple"
      },
      {
        "_type": "para",
        "title": "Converter arguments",
        "text": "A converter can access any number of [tag arguments](#tagsyntax@tagparams), to produce the computed value which it provides to the tag:\n\n```js\n$.views.converters(\"myConverter\", function(arg1, arg2, arg3 ...) {\n```\n\nFurthermore, the `this` pointer within the converter function is the [instance](#tagobject) of the tag, which allows it to access much more, including [named tag parameters](#tagsyntax@tagparams) (`this.tagCtx.props...`), the full data object (`this.tagCtx.view.data`), and more...\n\nThe following sample shows a `\"fullname\"` converter, which provides a computed ***full name*** based on the first two tag arguments (*first* and *last*) and an optional named tag parameter `reverse=true`:"
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
            "text": "```js\n$.views.converters(\"fullname\", function(first, last) {\n  var reverse = this.tagCtx.props.reverse;  \n  if (reverse) {\n    return last.toUpperCase() + \" \" + first;\n  }\n  return first + \" \" + last;\n});\n```\n\n```jsr\n... {{fullname:first last}}\n... {{fullname:first last reverse=true}}\n```"
          }
        ],
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <p><label>Normal:</label> {{fullname:first last}}</p>\n  <p><label>Reverse:</label> {{fullname:first last reverse=true}}</p> \n</script>",
        "code": "$.views.converters(\"fullname\", function(first, last) {\n  var reverse = this.tagCtx.props.reverse;  \n  if (reverse) {\n    return last.toUpperCase() + \" \" + first;\n  }\n  return first + \" \" + last;\n});\n\nvar person = {first: \"Xavier\", last: \"Prieto\"};\n\nvar html = $(\"#personTemplate\").render(person);\n\n$(\"#person\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "90",
        "title": "Full name converter &ndash;  accessing multiple arguments",
        "anchor": "fullname"
      },
      {
        "_type": "para",
        "title": "Using converters with other tags",
        "text": "A converter can be used on any tag, thanks to the syntax\n\n```jsr\n{{someTag ... convert=...}}\n```\n\nwhere `someTag` can be any custom tag, or a built-in tag such as `{{if}}`.\n\n(*Note:* When using JsViews [two-way binding](#link2way@converters), similar syntax is available for *convertBack*: `convertBack=...`.)\n\n\n\nFor example, you could register an `\"inList\"` converter which returns true if `item` is found in `itemList`:\n\n```jsr\n{{if convert='inList' item itemList}}...{{/if}}\n``` \n\nThe following sample shows named converters used with the `{{for ...}}` tag -- to iterate over an array and show only even or odd items:",
        "anchor": "othertags"
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
            "text": "```js\n$.views.converters({\n  odd: function(arr) {\n    // return only the odd items in the array\n    return arr.filter(function(elem, index) {\n      return (index + 1)%2;\n    });\n  },\n  even: function(arr) {\n    // return only the even items in the array\n    return arr.filter(function(elem, index) {\n      return index%2;\n    });\n  }\n});\n```\n\n```jsr\n...\n{{for people convert='odd'}}\n...\n{{for people convert='even'}}\n...\n```\n\n\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <table><tbody><tr>\n    <td><ul>{{for people convert='odd'}}<li>{{:name}}</li>{{/for}}</ul></td>\n    <td><ul>{{for people convert='even'}}<li>{{:name}}</li>{{/for}}</ul></td>\n  </tr></tbody></table>\n</script>",
        "code": "$.views.converters({\n  odd: function(arr) {\n    // return only the odd items in the array\n    return arr.filter(function(elem, index) {\n      return (index + 1)%2;\n    });\n  },\n  even: function(arr) {\n    // return only the even items in the array\n    return arr.filter(function(elem, index) {\n      return index%2;\n    });\n  }\n});\n\nvar model= {people: [\n  {name: \"Jo1\"},\n  {name: \"Jo2\"},\n  {name: \"Jo3\"},\n  {name: \"Jo4\"},\n  {name: \"Jo5\"},\n  {name: \"Jo6\"}\n]};\n\nvar html = $(\"#myTmpl\").render(model);\n\n$(\"#result\").html(html);",
        "title": "Using converters with the {{for}} tag",
        "jsrJsvJqui": "jsr",
        "height": "130",
        "anchor": "fortag"
      },
      {
        "_type": "para",
        "title": "Using helper functions or data methods as converters",
        "text": "The `convert=...` syntax not only works on any tag, but also allows you to use not only registered converters, by name, as in\n\n```jsr\n{{for people convert='odd'}}\n```\n\nbut alternatively to use helpers, or data methods as in\n\n```jsr\n{{for people convert=filter.odd}} // Using data method\n```\n\nYou can also use that approach on `{{:..}}` tags as in\n\n```jsr\n{{:name convert=~hlp.bold}} // Using helper\n```\n\nNote that the one tag which does not support this syntax is `{{>...}}` -- for which you would need instead to write:\n\n```jsr\n{{>~hlp.bold(name)}} // Using helper \n```\n\nHere is a modified version of the sample above, using helpers and data methods:"
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
            "text": "```jsr\n...\n{{for people convert=filter.odd}}  {{!-- using data method --}}\n  <li>\n    {{:name convert=~hlp.bold}}    {{!-- using helper --}}\n...\n```"
          }
        ],
        "code": "var helpers = {\n  hlp: {\n    bold: function(val) {\n      return \"<b>\" + val + \"</b>\";\n    },\n    italic: function(val) {\n      return \"<em>\" + val + \"</em>\";\n    }\n  }\n};\n\nvar model= {people: [\n    {name: \"Jo1\"},\n    {name: \"Jo2\"},\n    {name: \"Jo3\"},\n    {name: \"Jo4\"}\n  ],\n  filter: {\n    odd: function(arr) {\n      // return only the odd items in the array\n      return arr.filter(function(elem, index) {\n        return (index + 1)%2;\n      });\n    },\n    even: function(arr) {\n      // return only the even items in the array\n      return arr.filter(function(elem, index) {\n        return index%2;\n      });\n    }\n  }\n};\n\nvar html = $(\"#myTmpl\").render(model, helpers);\n\n$(\"#result\").html(html);",
        "html": "<div id=\"result\"></div>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <table><tbody><tr>\n    <td><ul>\n      {{for people convert=filter.odd}}  {{!-- using data method --}}\n        <li>\n          {{:name convert=~hlp.bold}}    {{!-- using helper --}}\n        </li>\n      {{/for}}\n    </ul></td>\n    <td><ul>\n      {{for people convert=filter.even}} {{!-- using data method --}}\n        <li>\n          {{:name convert=~hlp.italic}}  {{!-- using helper --}}\n        </li>\n      {{/for}}\n    </ul></td>\n  </tr></tbody></table>\n</script>",
        "jsrJsvJqui": "jsr",
        "height": "120"
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios see:",
        "links": [],
        "topics": [
          {
            "hash": "convertersapi",
            "label": "Registering converters"
          },
          {
            "_type": "topic",
            "hash": "link2way",
            "label": "Two-way binding"
          }
        ]
      },
      {
        "_type": "para",
        "title": "See also the following samples:",
        "text": "[Converters and encoding](#samples/jsr/converters)<br/>\n[Two-way binding and converters](#samples/form-els/converters)"
      }
    ]
  },
  "nojqueryapi": {
    "title": "JsRender without jQuery",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender can be loaded in the browser with or without jQuery, as in these example pages:\n\n- [JsRender with jQuery](#download/pages-jsr-jq)\n- [JsRender without jQuery](#download/pages-jsr)\n\nWhen jQuery is present:\n\n- JsRender loads as a jQuery plugin and adds APIs to the `jQuery` global namespace object -- usually aliased as `var $ = jQuery;`\n- The JsRender APIs are\n  - `$.views...`\n  - `$.templates(...)`\n  - `$.render...`. \n\nIf jQuery is not present:\n\n- JsRender automatically creates its own `jsrender` global namespace variable \n- JsRender APIs are the same as above, but they are now associated with the `jsrender` namespace variable: \n  - `jsrender.views...`\n  - `jsrender.templates(...)`\n  - `jsrender.render...`. \n\nFor convenience you can follow the jQuery approach of creating a global `$` -- set this time to `var $ = jsrender;`\n\nYou can then use the regular APIs: `$.views...`, `$.templates...`, `$.render...`, or copy code from the regular browser examples/samples -- *as if* using JsRender with jQuery.\n\nFor example:\n\n```js\nvar $ = jsrender; // Alias for the jsrender namespace object - referenced for convenience as var $\n\nvar tmpl = $.templates('Name: {{:first}} {{upper:last'); // Compile template from string\n\n$.views.converters('upper', function(val) {return val.toUpperCase()}); // Register converter\n \nvar data = {first: 'Jo', last: 'Ryan'};\n\nvar html = tmpl.render(data);\n// result: \"Name: Jo RYAN\" \n```\n\n***Note:*** The same approach can be used when using [JsRender on the server](#node/install@apis) with Node.js, where JsRender is also being used without jQuery. "
      }
    ]
  },
  "node/webpack": {
    "title": "<em>JsRender on Node.js</em>",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "## Webpack support for JsRender and JsViews\n JsRender and JsViews can be loaded using [webpack](https://webpack.github.io/)."
      },
      {
        "_type": "para",
        "title": "JsRender as a webpack module",
        "text": "After installing JsRender on the server (using `$ npm install jsrender`) it can then be included in the webpack client-script bundle, and loaded in the browser.\n\nIf using JsRender without jQuery, or with jQuery loaded globally (as a script tag) this is done by calling:\n\n```js\nvar $ = require('jsrender'); // Without jQuery, or if jQuery is loaded globally\n```\n(Here, if jQuery is loaded then `$` is the global jQuery namespace object. Otherwise it is the JsRender global namespace object. Either way, you can now make calls like `var myTmpl = $.templates(...);`)\n\nAlternatively, if jQuery is being loaded also as a webpack module rather than globally, *you need to use a different syntax* -- to tell JsRender to attach as a plugin to the local copy of jQuery:\n\n```js\nvar $ = require('jquery');\nrequire('jsrender')($);      // Passing local jQuery instance as parameter\n```",
        "anchor": "jsrender"
      },
      {
        "_type": "para",
        "title": "Example",
        "text": "**index.html:**\n\n```jsr\n<html><head>\n  <script src=\".../jquery...js\"></script> <!-- Load jQuery as global -->\n</head><body>\n  <div id=\"container\"></div>\n  <script src=\"bundle.js\"></script>\n</body></html>\n```\n\n**source.js:**\n\n```js\nrequire('jsrender'); // Load JsRender (jQuery is loaded as global)\nvar tmpl = $.templates('Name: {{:name}}');\nvar data = {name: 'Jo'};\nvar html = tmpl.render(data);\n$('#container').html(html);\n```\n\n**command line:**\n\n```bash\nwebpack ./source.js bundle.js\n```"
      },
      {
        "_type": "para",
        "title": "JsViews as a webpack module",
        "text": "JsViews can also be included in the webpack client-script bundle, and loaded in the browser.\n\nAfter installing on the server (using `$ npm install jsviews`), call:\n\n```js\nrequire('jsviews');    // Load JsViews (if jQuery is loaded globally)\n```\n\nor -- if also loading jQuery as a webpack module, use:\n\n```js\nvar $ = require('jquery');\n...\nrequire('jsviews')($); // Load JsViews (passing local jQuery instance as parameter)\n```",
        "anchor": "jsviews"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "*[Browserify support](#node/browserify)*"
      }
    ]
  },
  "viewmodelsapi": {
    "title": "Compiled View Models, using $.views.viewModels()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This topic provides details on using `$.views.viewModels()` to register/compile *View Models*.\n\nThis is the third of the alternative approaches discussed in *[Data / View Models](#jsrmodel)* -- namely:\n- [using](#jsrmodel@plain) plain objects\n- [using](#jsrmodel@vm) 'hand-coded' View Models\n- [using](#jsrmodel@compilevm) `$.views.viewModels()` to compile and register View Models with specific *get/set* properties and methods."
      },
      {
        "_type": "para",
        "title": "Advantages of compiled View Models",
        "text": "Using `$.views.viewModels()` to compile *View Models* brings some important advantages over plain object hierarchies or 'hand-coded' *View Models*:\n\n- Simple calls to `$.views.viewModels(...)` allow you to compile these *View Model* classes without having to manually write repetitive code for multiple such *get/set* properties\n- Using compiled *View Models* rather than plain objects makes it easier to have clean well-designed modular code, since each *View Model* has specific *getters*, *setters* and *methods*, and can have its own 'private' properties and state\n- The compiled *View Models* provide a built-in mapping and unmapping feature for automatically converting from a plain object hierarchy (such as from a JSON request) to a hierarchy of *View Model* instances, or for converting back to plain data (such as for submitting to the server)\n- They also provide a `merge(...)` feature for incrementally updating the *View Model* hierarchy, using updated plain data from the server\n- When working with (or migrating to) *JsViews* the compiled classes automatically become fully-fledged MVVM classes, with a rich range of features -- where the *Views* are observable data-linked templates. Updates to the *View Model* hierarchy, and calls to the *View Model* setters both trigger observable changes, with corresponding incremental updates to the *Views*. (For more information see *[JsViews: Data / View Model](#jsvmodel)* and *[JsViews: Compiled View Models](#jsvviewmodelsapi)*.)"
      },
      {
        "_type": "para",
        "title": "Using compiled View Models",
        "text": "The basic *use scenarios* of compiled *View Models* are as follows:\n- Using `$.views.viewModels(...)` to [register/compile](#viewmodelsapi@compile) *View Models* (`myVM`)\n- Using a compiled View Model `myVM` as [constructor/factory](#viewmodelsapi@construct) method -- `MyVM(...)` -- to create View Model instances (`myVmInstance`)\n- Using `MyVM.map(...)` to [convert](#viewmodelsapi@map) a plain object hierarchy (such as from a JSON request) to a hierarchy of *View Model* instances\n- Using `myVMInstance.merge(...)` to incrementally [update](#viewmodelsapi@merge) a *View Model* hierarchy, using updated plain data\n- Using `myVMInstance.unmap()` to [convert](#viewmodelsapi@unmap) a *View Model* hierarchy back to a plain object hierarchy\n\n"
      },
      {
        "_type": "para",
        "title": "<b>API: $.views.viewModels(...)</b>",
        "text": "To register a *View Model*, you call the `$.views.viewModels(...)` API -- with four alternative signatures:\n- `var MyVM = $.views.viewModels(viewModelOptions);`<br/>returning a compiled *View Model* \n- `$.views.viewModels(\"MyVM\", viewModelOptions);`<br/>registering a named *View Model*, accessible as `$.views.viewModels.MyVM`\n- `$.views.viewModels(namedViewModels);`<br/>where `namedViewModels` is a hash, declaring multiple *View Models*\n- `$.views.viewModels(namedViewModels, myViewModels);`<br/>where `namedViewModels` is a hash, declaring multiple *View Models* and `myViewModels` is a *View Models* collection (hash) which will provide access to the compiled *View Models*, as `myViewModels.MyVM`\n\nIn each case, the compiled *View Model* is specified by a `viewModelOptions` object, with a `getters: gettersArray` (specifying an array of *get/set* properties), and/or an `extend: extendObject` (specifying additional methods or properties).\n\nExample:\n\n```js\nvar Book = $.views.viewModels({   // Compile a Book View Model\n  getters: [\"title\", \"price\"],    // getters array - signature of constructor\n  extend: {                       // extend object - additional methods \n    placeOrder: function() { ... }\n  }\n});\n\nvar book1 = Book(\"Hope\", \"1.50\"); // Construct a Book View Model instance\nbook.price(\"2.50\");               // Modify price\nbook.placeOrder();                // Call method\n```\n",
        "anchor": "compile"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.views.viewModels(...)",
        "name": "viewModels",
        "object": "$.views",
        "method": true,
        "tag": false,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "viewModelOptions",
                "type": "object",
                "optional": false,
                "description": "A viewModelOptions object which can include:<ul><li>a 'getters' array (details below)</li><li>an  'extend' hash - with additional methods or properties</li><li>an 'id' specifier</li></ul>"
              }
            ],
            "sections": [],
            "example": "var Book = $.views.viewModels({\n  getters: [\"title\", \"price\"]\n});\n\nvar bk1 = Book(\"Hope\", \"$1.50\");",
            "description": "Return a compiled View Model (constructor/factory method) with specific get/set properties and methods",
            "returns": "View Model constructor"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "name",
                "type": "string",
                "optional": true,
                "description": "Name for the registered View Model"
              },
              {
                "_type": "param",
                "name": "viewModelOptions",
                "type": "object",
                "optional": false,
                "description": "A viewModelOptions object which can include:<ul><li>a 'getters' array (details below)</li><li>an  'extend' hash - with additional methods or properties</li><li>an 'id' specifier</li></ul>"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.viewModels(\"Book\", {\n  getters: [\"title\", \"price\"]\n});\n\nvar bk1 = $.views.viewModels.Book(\"Hope\", \"$1.50\");\n",
            "description": "Register (and return) a named View Model",
            "returns": "View Model constructor"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "namedViewModels",
                "type": "object",
                "optional": false,
                "description": "hash of viewModelOptions objects - each of which can include:<ul><li>a 'getters' array (details below)</li><li>an  'extend' hash - with additional methods or properties</li><li>an 'id' specifier</li></ul>"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.viewModels({\n  Book: {getters: [\"title\", \"price\"]},\n  ...\n});\n\nvar bk1 = $.views.viewModels.Book(\"Hope\", \"$1.50\");\n",
            "description": "Register multiple named View Models"
          },
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "namedViewModels",
                "type": "object",
                "optional": false,
                "description": "hash of viewModelOptions objects - each of which can include:<ul><li>a 'getters' array (details below)</li><li>an  'extend' hash - with additional methods or properties</li><li>an 'id' specifier</li></ul>"
              },
              {
                "_type": "param",
                "name": "viewModels",
                "type": "object",
                "optional": false,
                "description": "View Model collection object (hash)"
              }
            ],
            "args": [],
            "sections": [
              {
                "_type": "para",
                "title": "",
                "text": "*Specifying **viewModelOptions** &ndash; details:*\n\n- The (optional) `getters` array.<br/>-- Each item in the array corresponds to a *get/set* property (and also a constructor argument, which initializes that *get/set* property).<br/>-- It must be either\n  - a string -- the `getterName`, or\n  - an object, which must have a *getter* property: `{getter: getterName}`.<br/><br/>If an object, it can additionally specify:<br/><br/>\n  - a *type* property: `type: viewModelName` -- specifying the name of another *View Model* type (declared in the same View Model collection). In this case then when using `map()` to map from data to a generated *View Model* hierarchy (see below), data values for the *get/set* property will be mapped to instances of that *View Model*.\n  - a *defaultVal* property -- specifying the value to be used at initialization if `undefined` -- such as\n    - `defaultVal:  null` (a value) or,\n    - `defaultVal: function() { return ...; }` (a function, to return a computed value. The <code>this</code> pointer is the data item.) \n- The (optional) `extend` hash has additional members (methods or properties) to be included in the View Model prototype. The prototype will extend this object\n- The (optional) `id` is either a string (the name of a *View Model* property to be treated as **id**) or\na function. The specified *id* or the function call will be used for determining identity when `merge(...)` updates a *View Model* hierarchy (see below)"
              }
            ],
            "example": "var myVms = {};\n\n$.views.viewModels({\n  Book: {getters: [\"title\", \"price\"]},\n  ...\n}, myVms);\n\nvar bk1 = myVms.Book(\"Hope\", \"$1.50\");\n",
            "description": "Add one or more named View Models to a View Model collection (hash)",
            "returns": "View Model collection (hash)"
          }
        ],
        "description": "Register one or more View Models",
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
        "title": "Creating View Model instances, using the View Model constructor",
        "text": "*View Models* compiled/registered/returned by `$.view.viewModels(...)` are in fact constructors for instances of the *View Model* class.\n\n```js\nvar Book = $.views.viewModels({    // Constructor\n  getters: [\"title\", \"price\"]      // getters array - signature of constructor\n  ...\n});\n\nvar book1 = Book(\"Hope\", \"$1.50\"); // Create Book instance\n```\n\nNote that:\n- The `new` keyword is not necessary when calling the constructor. (It is in effect a factory method, that calls `new` internally.)\n- The signature of the constructor call (parameters used to initialize the instance) corresponds to the array of getters specified in the `viewModelOptions` - in this case `[\"title\", \"price\"]`",
        "anchor": "construct"
      },
      {
        "_type": "para",
        "title": "View Model hierarchies",
        "text": "The `Book` View Model example above has simple *get/set* properties `[\"title\", \"price\"]` which are simple primitive types (string in this case).\n\nBut consider the `Person` *View Model*, used in the overview topic *[Data / View Model](#jsrmodel)*. Here a `person` object (whether a plain object or a *View Model* instance) is in fact a hierarchy of objects, since the `address` and `phones` properties of a `Person` are themselves objects (an `Address` object and a `Phone` array)\n\nHere is a `person` plain object/hierarchy (obtained perhaps by 'evaluating' JSON data from the server): \n\n```js\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n```\n\nTo map this object hierarchy to the corresponding *View Model* hierarchy we need to define three *View Models*:\n\n```js\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n```\n\nWe can then instanciate the corresponding *View Model* hierarchy, using constructors:\n\n```js\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n```\n\nSee the [sample](#jsrmodel@compilevmsample) in the *[Data / View Model](#jsrmodel)* topic."
      },
      {
        "_type": "para",
        "title": "<b>Creating View Model instances by mapping from data</b>",
        "text": "The process of manually writing code to map from JSON data to a corresponding *View Model* hierarchy, as above, can be complex and inconvenient. It requires traversing the data hierarchy and using appropriate *View Model* constructors to instantiate corresponding *View Model* instances. \n\nFortunately *JsRender/JsViews* compiled *View Models* provide a `map(data)` feature which when used together with *View Model* typed hierarchies makes this process quite trivial.\n",
        "anchor": "map"
      },
      {
        "_type": "para",
        "title": "API: MyViewModel.map(...)",
        "text": "Any compiled *View Model*, `MyViewModel`, provides a `MyViewModel.map(...)` method, which can be used to convert a plain object or an array of plain objects (or the equivalent JSON string) to the corresponding *View Model* instance (or array of *View Model* instances)."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "MyViewModel.map(...)",
        "name": "map",
        "object": "MyViewModel",
        "method": true,
        "returns": "View Model instance or array or instances",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "data",
                "type": "object, array of objects, or JSON string",
                "optional": false,
                "description": "The data (typically from JSON request)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "// View Model\nvar Person = $.views.viewModels.Person;\n\n// View Model instance\nvar person = Person.map(personData);",
            "description": "Generate a View Model instance/hierarchy/array by mapping from data (a plain object instance/hierarchy/array, or JSON string)"
          }
        ],
        "description": "Generate  a View Model hierarchy from data",
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
        "text": "Example:\n\n```js\nvar Book = $.views.viewModels({ // Constructor\n  getters: [\"title\", \"price\"]\n});\n```\n\nMap from `bookData` plain object to `book` View Model instance:\n\n```js\nvar bookData1 = {title: \"Hope\", price: \"$1.50\"}; // book (plain object)\nvar book1 = Book.map(bookData1);                 // book (instance of Book View Model)\n```\n  \nMap from `bookDataArray` array of plain objects to `bookArray` array of View Model instances:\n\n```js\nvar bookDataArray1 = [                           // book array (plain objects)\n  {title: \"Hope\", price: \"$1.50\"},\n  {title: \"Courage\", price: \"$2.50\"}\n];\nvar booksArray1 = Book.map(bookDataArray1);      // book array (instances of Book View Model)\n```"
      },
      {
        "_type": "para",
        "title": "View Model  typed hierarchies",
        "text": "When specifying `getters` in the `$.views.viewModels(...)` call, you can declare the type of a *get/set* property. For example an `address` *get/set* property can be specified as being of type `Address` -- where `Address` is another *View Model* declared on the same collection.\n\nBy specifying View Model types for properties (and declaring those View Models in the same collection) you obtain a *'View Model typed hierarchy'*.\n\n"
      },
      {
        "_type": "para",
        "title": "Using MyViewModel.map(...) to map a whole object hierarchy to a View Model instance hierarchy",
        "text": "In the case of a *'View Model typed hierarchy'*, simply pass the top-level plain object to the `map()` method for the top-level *View Model* class, and all *View Model* instances in the hierarchy will be correctly instantiated:\n\n*Compile View Model classes (typed hierarchy):* \n\n```js\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // Declare 'name' as being a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // Declare 'address' as being an Address (View Model) type\n     {getter: \"phones\", type: \"Phone\"}     // Declare 'phones' as being (an array) of Phone (View Model) types\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone: ...\n});\n```\n\n*Person data (plain object hierarchy, or JSON string):*\n\n```js\nvar personData = {\n    name: \"Pete\",\n    address: {street: \"1st Ave\"},\n    phones: [{number: \"111 111 1111\"}, ...]\n  };\n```\n\n*Use map() to convert from `personData` plain object hierarchy (or JSON string) to `person` *View Model* hierarchy:*\n\n```js\nvar person = $.views.viewModels.Person.map(personData);\n```\n\nThe getter properties then let you traverse the hierarchy, call methods, etc.\n\n```\nperson.name(\"newName\");                   // Use setter: change name\nperson.addPhone(...);                     // Call method: add phone\nvar phone2 = person.phones()[1].number(); // Traverse and use getter: get number\n```\n\nLet's modify the [sample](#jsrmodel@compilevmsample) in *[Data / View Model](#jsrmodel)* to use the `map(...)` approach:"
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
            "markup": "... {{:name()}} ..."
          },
          {
            "_type": "code",
            "title": "Compile View Model classes",
            "code": "...\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: ...\n  Phone: ...\n});\n"
          },
          {
            "_type": "code",
            "title": "Instantiate View Model hierarchy using Person.map(data)",
            "code": "var personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\nvar person = vmCollection.Person.map(personData);"
          },
          {
            "_type": "code",
            "title": "Render template against person object (instance of Person)",
            "code": "$(\"#result\").html(tmpl.render(person));"
          },
          {
            "_type": "code",
            "title": "Call setter, call method...",
            "code": "...\nperson.name(\"newName\");           // Use the name(...) setter\n\n...\nperson.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method"
          }
        ],
        "html": "<style>button {margin-bottom: 9px;}</style>\n\n<button id=\"changeName\">Change name</button>\n<button id=\"addPhone\">Add Phone</button>\n\n<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones()}}\n          <tr><td>\n            {{:number()}}\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone:{\n    getters: [\"number\"]\n  }\n});\n\nvar vmCollection = $.views.viewModels;\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(vmCollection.Phone(phoneNo));\n}\n\n// person plain object hierarchy:\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\n// Instantiate View Model hierarchy using map()\nvar person = vmCollection.Person.map(personData);\n\n// Render template against person object (instance of Person)\n$(\"#result\").html(tmpl.render(person));\n\n// Button handlers\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n  $(\"#result\").html(tmpl.render(person));\n});",
        "height": "190",
        "jsrJsvJqui": "jsr",
        "title": "Using map() to convert from a plain object hierarchy to a View Model hierarchy",
        "anchor": "mapsample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also the [corresponding sample](#jsvviewmodelsapi@mapsample) with JsViews and data-linking.)"
      },
      {
        "_type": "para",
        "title": "Along with the map() feature &ndash; merge() and unmap()",
        "text": "When working with View Model typed hierarchies, there are two additional features that can be used together with the `map()` feature:\n\n- If later you obtain updated JSON data, `personData2`, you can use `merge()` ([below](#viewmodelsapi@merge)) to trigger an incremental update to the *View Model* hierarchy:\n  ```js\n  person.merge(personData2);\n  ```\n- If values are modified (using setters, or methods) you can at any time can use `unmap()` ([below](#viewmodelsapi@unmap)) to convert back to plain data, but with updated values:\n  ```js\n  var updatedPersonData = person.unmap();\n  ```"
      },
      {
        "_type": "para",
        "title": "Using myVMobjectOrArray.merge(...) to update a View Model hierarchy",
        "text": "If a *View Model* hierarchy (or array of *View Model* instances) was created using the `map()` feature above to map from data, then the *View Model* instances (and arrays) will each have a `merge()` method available:\n\n```js\nvar person = Person.map(personData1);\nperson.merge(personData2);             // Incrementally update person (hierarchy)\n```\n\nor for an array:\n\n```js\nvar peopleArray = Person.map(peopleDataArray1);\npeopleArray.merge(peopleDataArray2);   // Incrementally update people array\n```\n\nOr, deeper in the hierarchy:\n\n```js\nvar person = Person.map(personData1);\nperson.phones.merge(phonesDataArray2); // Update just the person.phones array\n```",
        "anchor": "merge"
      },
      {
        "_type": "para",
        "title": "Updating with merge() makes minimal incremental changes, and preserves state",
        "text": "Note that the `merge()` update process does not replace the whole hierarchy of *View Model* instances, but works incrementally to add/remove/modify instances as appropriate. So if most of the data in `personData2` is the same as `personData1`, calling `merge(personData2)` will make only minimal changes to the hierarchy. \n\nThis means that if *View Model* instances have state (such as additional properties that were set programmatically and are not driven by data) then that state can be maintained across the `merge()` update. "
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "myVMobjectOrArray.merge(...)",
        "name": "merge",
        "object": "myVMobjectOrArray",
        "method": true,
        "returns": "View Model instance or array",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [
              {
                "_type": "param",
                "name": "data",
                "type": "object, array of objects, or JSON string",
                "optional": false,
                "description": "The updated data (typically from JSON request)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "person.merge(personData2);\n// person (View Model hierarchy) has now\n// been updated, with modified data...",
            "description": "Update a previously generated View Model instance/hierarchy/array by mapping from updated data"
          }
        ],
        "description": "Update a View Model hierarchy, from modified data",
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
        "title": "Using myVMobjectOrArray.unmap() to convert back to a plain object hierarchy",
        "text": "If a *View Model* hierarchy (or array of *View Model* instances) was created by mapping from data, using the `map()` feature above, then the View Model instances (and arrays) will each have an `unmap()` method (in addition to the `merge()` method mentioned above):\n\n```js\nvar person = Person.map(personData1);\nperson.addPhone(newPhone);\nperson.name(newName)\nvar modifiedPersonData = person.unmap();          // Convert back to a plain object hierarchy\n```\n\nor for an array:\n\n```js\nvar peopleArray = Person.map(peopleDataArray1);\npeopleArray[1].address.street(newStreet)          // Make changes anywhere in the peopleArray\nvar modifiedPeopleDataArray = people.unmap();     // Convert back to a plain object array\n```\n\nOr, deeper in the hierarchy:\n\n```js\nvar person = Person.map(personData1);\nperson.addPhone(newPhone);\nvar modifiedPhonesArray = person.phones.unmap();  // Get a plain object array for person.phones\n```",
        "anchor": "unmap"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "myVMobjectOrArray.unmap()",
        "name": "unmap",
        "object": "myVMobjectOrArray",
        "method": true,
        "returns": "object or array",
        "signatures": [
          {
            "_type": "signature",
            "title": "",
            "params": [],
            "args": [],
            "sections": [],
            "example": "// Convert back to a plain object hierarchy\nvar modifiedPersonData = person.unmap();\n",
            "description": "Obtain an updated plain object instance/hierarchy/array, from a previously generated View Model instance/hierarchy/array"
          }
        ],
        "description": "Get a plain object hierarchy from a View Model hierarchy",
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
        "text": "Here is an updated version of our [previous](#viewmodelsapi@mapsample) sample, where now we have added the use of `merge()` and `unmap()`"
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
            "title": "Compile View Model classes",
            "code": "...\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: ...\n  Phone: ...\n});\n"
          },
          {
            "_type": "code",
            "title": "Instantiate View Model hierarchy, using map()",
            "code": "var personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\nvar person = vmCollection.Person.map(personData);"
          },
          {
            "_type": "code",
            "title": "Update View Model hierarchy, using merge()",
            "code": "$(\"#update\").on(\"click\", function() {\n  person.merge(personData2);               // Update person View Model hierarchy\n  $(\"#result\").html(tmpl.render(person));\n});\n"
          },
          {
            "_type": "code",
            "title": "Get current data, using unmap()",
            "code": "$(\"#getData\").on(\"click\", function() {\n  var updatedPersonData = person.unmap();  // Get plain object hierarchy from current View Model hierarchy\n  window.alert(JSON.stringify(updatedPersonData));\n});"
          }
        ],
        "jsrJsvJqui": "jsr",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone:{\n    getters: [\"number\"]\n  }\n});\n\nvar vmCollection = $.views.viewModels;\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(vmCollection.Phone(phoneNo));\n}\n\n// First version of data (e.g. from JSON request):\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\n// Second version of data (e.g. new JSON request):\nvar personData2 = {\n  name: \"Peter\",\n  address: {street: \"2nd Ave\"},\n  phones: [{number: \"111 111 9999\"},{number: \"333 333 9999\"}]\n};\n\n// Instantiate View Model hierarchy, using map()\nvar person = vmCollection.Person.map(personData);\n\n// Render template against person object (instance of Person)\n$(\"#result\").html(tmpl.render(person));\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  // Update View Model hierarchy, using merge()\n  person.merge(personData2);\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#revert\").on(\"click\", function() {\n  // Revert View Model hierarchy, using merge()\n  person.merge(personData);\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#getData\").on(\"click\", function() {\n  // Get current data, using unmap()\n  var updatedPersonData = person.unmap();\n  window.alert(JSON.stringify(updatedPersonData));\n});",
        "html": "<style>button {margin-bottom: 9px;}</style>\n\n<button id=\"update\">Update</button>\n<button id=\"revert\">Revert</button>\n<button id=\"getData\">Get Data</button><br/>\n<button id=\"changeName\">Change name</button>\n<button id=\"addPhone\">Add Phone</button>\n\n<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones()}}\n          <tr><td>{{:number()}}</td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "height": "230",
        "title": "Using merge() to update View Models, and unmap() to return to plain objects",
        "anchor": "mergesample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also the [corresponding sample](#jsvviewmodelsapi@mergesample) using JsViews and data-linking.)"
      },
      {
        "_type": "para",
        "title": "Overriding generated get/set functions",
        "text": "To override a generated get/set property provided by a compiled View Model you can provide an implementation in the `extend` hash, with the same name as the *get/set* in the `getters` array:\n\n```js\n// Define a myNameGetSet(...)function, to override the compiled name(...) get/set function\nfunction myNameGetSet(val) {\n  if (!arguments.length) {           // This is standard compiled get/set code\n    return this._name;               // If there is no argument, use as a getter\n  }\n  this._name = val;                  // If there is an argument, use as a setter\n  console.log(\"name set to \" + val); // This is an additional line of code, for logging\n}\n\n// Declare a Person View Model with an overridden name() get/set property\n$.views.viewModels({\n  Person: {\n    getters: [\n      {getter: \"name\", ...}, // Compiled name() get/set\n      ...\n    ],\n    extend: {\n      name: myNameGetSet,    // Override name() get/set\n      ...\n    }\n    ...\n  },\n  ...\n});\n```\n\nThe above is equivalent to the generated version except that it adds custom logging to the getter/setter function.\n\n**Note:** In the context of JsViews, the View Model get/set properties can be data-linked (one-way or two-way data-binding) -- and will then be invoked automatically during observable changes to the property. (This applies also to overridden properties -- using a variant of the above pattern, described in [the corresponding JsViews topic](#jsvviewmodelsapi@override)).",
        "anchor": "override"
      },
      {
        "_type": "para",
        "title": "Sample showing some of the advanced View Model features",
        "text": "The next sample is similar to the [previous](#viewmodelsapi@mergesample) one, but specifically highlights some of the advanced features of compiled *View Models*.\n\n- It stores compiled *View Models* on a `myVmCollection` hash, as a *View Model typed collection*, rather than on<br/>`$.views.viewModels`\n- It maps from an array of 'people' rather than a single person:<br/>\n  `var people = Person.map(peopleData);`\n- It specifies an `id` key for `Person`. When updating the `phones` array the `id` value is treated as 'primary key', and used to map 'identity':<br/>\n  `id: \"id\"`\n- It provides an `id()` callback on `Person`, for determining identity -- allowing identification of corresponding *View Model* instances within the people array, and hence preventing unnecessary disposal and re-instantiation (which would destroy state, such as the `comment` value).\n- It has a `comment()` get/set property that is added as part of the `extend` definition, not the `getters`, so it is not initialized from data, in the constructor. Note therefore that if you set a *comment* on each `person` instance, then click *Update*, then *Revert*, one *comment* is conserved (since that instance is never disposed -- based on the 'identity' determination) but the other is lost since the instance is disposed and then re-created by *Revert*:<br/>\n  `extend: {...comment: comment...}`\n- It has `defaultVal` specified for `name`, `address` and `phones`, either as 'static' values or computed by a callback function:<br/>\n  `address: {type: \"Address\", defaultVal: defaultStreet}`\n- It overrides the generated `person.name()` *get/set* by a `myNameGetSet` function which includes logging\n- It passes a JSON string to `merge()` or `map()`\n(See also the [same sample](#jsvviewmodelsapi@mergesampleadv) using JsViews and data-linking.)",
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
            "_type": "code",
            "title": "",
            "code": "var myVmCollection = {};\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      {getter: \"name\", defaultVal: \"No name\"}, // Compiled name() get/set\n      {getter: \"address\", type: \"Address\", defaultVal: defaultAddress},\n      {getter: \"phones\", type: \"Phone\", defaultVal: []}\n    ],\n    extend: {\n      name: myNameGetSet,                      // Override name() get/set\n      addPhone: addPhone,\n      comment: comment                         // Additional get/set property, not initialized by data)\n    },\n    id: function(vm, plain) {                  // Callback function to determine 'identity'\n      return vm.personId === plain.personId;\n    }\n  },\n  ...\n  Phone: {\n    getters: [\"number\"],\n    id: \"phoneId\"                              // Treat phoneId as 'primary key', for identity\n  }\n}, myVmCollection);                            // Store View Models (typed hierarchy) on myVmCollection\n\n// Override generated name() get/set\nfunction myNameGetSet(val) {\n  if (!arguments.length) {                     // This is standard compiled get/set code\n    return this._name;                         // If there is no argument, use as a getter\n  }\n  this._name = val;                            // If there is an argument, use as a setter\n  console.log(\"name set to \" + val);           // This is an additional line of code, for logging\n}\n\n// Method for Person class\nfunction addPhone(phoneNo) {                   // Uses myVmCollection.Phone() to construct new instance\n  this.phones().push(myVmCollection.Phone(phoneNo));\n}\n\n// get/set for comment (state on View Model instance, not initialized from data)\nfunction comment(val) {\n  if (!arguments.length) {\n    return this._comment;\n  }\n  this._comment = val;\n}\n\nfunction defaultAddress() {                    // Function providing default address if undefined in data\n  return {street: 'No street for \"' + this.name + '\"'};\n}\n\n// First version of data - array of objects (e.g. from JSON request):\nvar peopleData = [{personId: \"1\", ...}, {personId: \"2\", name: \"Pete\",...}];\n\n// Second version of data - JSON string (e.g. new JSON request):\nvar peopleData2 = '[{\"personId\":\"2\",\"name\":\"Peter\",\"address\":...}]';\n\n// Instantiate View Model hierarchy using map()\nvar people = myVmCollection.Person.map(peopleData);\n\n// Render template against people (array of Person instances)\n$(\"#result\").html(tmpl.render(people));\n...\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  people.merge(peopleData2);\n  ...\n});\n..."
          }
        ],
        "code": "var tmpl = $.templates(\"#personTmpl\");\n\nvar myVmCollection = {};\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      {getter: \"name\", defaultVal: \"No name\"}, // Compiled name() get/set\n      {getter: \"address\", type: \"Address\", defaultVal: defaultAddress},\n      {getter: \"phones\", type: \"Phone\", defaultVal: []}\n    ],\n    extend: {\n      name: myNameGetSet,                      // Override name() get/set\n      addPhone: addPhone,\n      comment: comment                         // Additional get/set property, not initialized by data)\n    },\n    id: function(vm, plain) {                  // Callback function to determine 'identity'\n      return vm.personId === plain.personId;\n    }\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone: {\n    getters: [\"number\"],\n    id: \"phoneId\"                              // Treat phoneId as 'primary key', for identity\n  }\n}, myVmCollection);                            // Store View Models (typed hierarchy) on myVmCollection\n\n// Override generated name() get/set\nfunction myNameGetSet(val) {\n  if (!arguments.length) {                     // This is standard compiled get/set code\n    return this._name;                         // If there is no argument, use as a getter\n  }\n  this._name = val;                            // If there is an argument, use as a setter\n  console.log(\"name set to \" + val);           // This is an additional line of code, for logging\n}\n\n// Method for Person class\nfunction addPhone(phoneNo) {                   // Uses myVmCollection.Phone() to construct new instance\n  this.phones().push(myVmCollection.Phone(phoneNo));\n}\n\n// get/set for comment (state on View Model instance, not initialized from data)\nfunction comment(val) {\n  if (!arguments.length) {\n    return this._comment;                      // If there is no argument, use as a getter\n  }\n  this._comment = val;\n}\n\nfunction defaultAddress() {                    // Function providing default address if undefined in data\n  return {street: 'No street for \"' + this.name + '\"'};\n}\n\n// First version of data - array of objects (e.g. from JSON request):\nvar peopleData = [\n  {\n    personId: \"1\",\n    address: {\n      street: \"2nd Ave\"\n    }\n  },\n  {\n    personId: \"2\",\n    name: \"Pete\",\n    phones: [\n      {number: \"333 333 3333\", phoneId: \"2a\"}\n    ]\n  }\n];\n\n// Second version of data - JSON string (e.g. new JSON request):\nvar peopleData2 = '[{\"personId\":\"2\",\"name\":\"Peter\",\"address\":{\"street\":\"11 1st Ave\"},'\n+ '\"phones\":[{\"number\":\"111 111 9999\",\"phoneId\":\"1a\"},{\"number\":\"333 333 9999\",\"phoneId\":\"2a\"}]}]';\n\n// Instantiate View Model hierarchy using map()\nvar people = myVmCollection.Person.map(peopleData);\n\n// Render template against people (array of Person instances)\n$(\"#result\").html(tmpl.render(people));\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  people.merge(peopleData2);\n  $(\"#result\").html(tmpl.render(people));\n});\n\n$(\"#revert\").on(\"click\", function() {\n  people.merge(peopleData);\n  $(\"#result\").html(tmpl.render(people));\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  people[0].name(\"newName\");\n  $(\"#result\").html(tmpl.render(people));\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  people[0].addPhone(\"xxx xxx xxxx\");\n  $(\"#result\").html(tmpl.render(people));\n});\n\n$(\"#result\").on(\"change\", \".comment\", function(val) {\n  // If comment is modified, update View Model state with new value\n  people[this.getAttribute(\"data-index\")].comment(this.value);\n});\n\n$(\"#getData\").on(\"click\", function() {\n  var updatedPeopleData = people.unmap();\n  window.alert(JSON.stringify(updatedPeopleData));\n});\n",
        "html": "<style>button, table {margin-bottom: 9px;}</style>\n\n<button id=\"update\">Update</button>\n<button id=\"revert\">Revert</button>\n<button id=\"getData\">Get Data</button><br/>\n<button id=\"changeName\">Change name</button>\n<button id=\"addPhone\">Add Phone</button>\n\n<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Comment:</td><td><input class=\"comment\" data-index=\"{{:#index}}\" value=\"{{:comment()}}\"/></td></tr>\n    <tr><td>Name:</td><td>{{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones()}}\n          <tr><td>{{:number()}}</td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "height": "350",
        "jsrJsvJqui": "jsr",
        "anchor": "",
        "title": "Mapping from JSON data to View Model hierarchy &ndash; further features"
      },
      {
        "_type": "para",
        "title": "Adding a custom get/set property to a compiled View Model ",
        "text": "Finally, here is a sample which extends a compiled *View Model* with a custom `Person.isManager() `*get/set* property. The property is coupled to the `Team.manager()` property -- so setting `Person.isManager(...)` will update the `Team.manager()` correspondingly (and conversely when setting `Team.manager(...)`.\n\n`Person.isManager` is not included in the `getters` declaration, so that the constructor for `Person` will not expect an `isManager` parameter to be provided for initialization.\n\n(See also the [related sample](#jsvviewmodelsapi@ismanagersample) using JsViews and data-linking.)",
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
            "text": "```js\n// Custom function for Person.isManager get/set property\nfunction myIsManager(val) {\n  if (!arguments.length) {\n    return this === team.manager(); // If there is no argument, use as a getter\n  }\n  if (val) {\n    // Make this team member manager\n    team.manager(this);\n  } else if (this.isManager()) {\n    // Set team manager to null\n    team.manager(null);\n  }\n}\n\n// Compile View Models\n$.views.viewModels({\n  Team: {...},\n  Person: {\n    getters: [\n      \"name\",\n      ...\n    ],\n    extend: {\n      isManager: myIsManager // use custom function\n    }\n  },\n  Address: {...}\n});\n\n...\n\n//Initialize second team member to be manager.\nvar manager = team.members()[1];\nmanager.isManager(true);\n\n...\n\n// Attach handler for checkbox\n$(\"#result\")\n  .on(\"change\", \".isManager\", function() {\n    ...\n    member.isManager(this.checked);\n    renderTemplate(); // Refresh rendering, with modified data\n  })\n  ...\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n\n<button class=\"noManager\">No Manager</button>\n<button class=\"changeManager\" data-index=\"0\">Set Manager 0</button>\n<button class=\"changeManager\" data-index=\"1\">Set Manager 1</button>\n<button class=\"changeManager\" data-index=\"2\">Set Manager 2</button>\n\n<h4>Team members:</h4>\n\n<table>\n  <thead><tr><td>Is Manager</td><td>Name</td><td>Street</td><td>ZIP</td></tr></thead>\n  <tbody>\n    {{for members()}}\n      <tr><td><input class=\"isManager\" type=\"checkbox\"\n        data-index=\"{{:#index}}\"\n        {{:isManager() ? 'checked' : ''}}\n      /></td>\n      <td>{{:name()}}</td>\n      <td>{{:address().street()}}</td>\n      <td>{{:address().ZIP()}}</td>\n      </tr>\n    {{/for}}\n  </tbody>\n</table>\n\n{{if manager()}}\n  <h4>Manager:</h4>\n  <table><tbody><tr>\n    <td>{{:manager().name()}}</td>\n    <td>{{:manager().address().street()}}</td>\n    <td>{{:manager().address().ZIP()}}</td>\n  </tr></tbody></table>\n{{else}}\n  <h4>No manager</h4>\n{{/if}}\n\n</script>",
        "code": "// Compile template\nvar tmpl = $.templates(\"#teamTmpl\");\n\n// Custom function for Person.isManager get/set property\nfunction myIsManager(val) {\n  if (!arguments.length) {\n    return this === team.manager(); // If there is no argument, use as a getter\n  }\n  if (val) {\n    // Setting this.isManager() to true\n    // So make this team member manager\n    team.manager(this);\n  } else if (this.isManager()) {\n    // Setting this.isManager to false, and this team member is currently manager.\n    // So set team manager to null\n    team.manager(null);\n  }\n}\n\n// Compile View Models\n$.views.viewModels({\n  Team: {\n    getters: [\n      {\n        getter: \"manager\",\n        type: \"Person\"\n      },\n      {\n        getter: \"members\",\n        type: \"Person\"\n      }\n    ]\n  },\n  Person: {\n    getters: [\n      \"name\",\n      {\n        getter: \"address\",\n        type: \"Address\"\n      }\n    ],\n    extend: {\n      isManager: myIsManager // use custom function\n    }\n  },\n  Address: {\n    getters: [\"street\", \"ZIP\"]\n  }\n});\n\n// Initial data  \nvar teamData = {\n    manager: null,\n    members: [{\n      name: \"Pete\",\n      address: {\n        street: \"1st Ave\",\n        ZIP: \"12345\"\n      }\n    },{\n      name: \"Bess\",\n      address: {\n        street: \"Central Way\",\n        ZIP: \"98765\"\n      }\n    },\n    {\n      name: \"Henry\",\n      address: {\n        street: \"Main St\",\n        ZIP: \"54321\"\n      }\n    }]\n  };\n\n// Instantiate View Models\nvar team = $.views.viewModels.Team.map(teamData);\n\n//Initialize second team member to be manager.\nvar manager = team.members()[1];\nmanager.isManager(true);\n\nfunction renderTemplate() {\n  // Refresh template rendering completely\n  $(\"#result\").html(tmpl.render(team));\n}\n\nrenderTemplate();\n\n// Attach handlers for checkbox and buttons\n$(\"#result\")\n  .on(\"change\", \".isManager\", function() {\n    var memberIndex = $(this).data(\"index\"),\n      member = team.members()[memberIndex];\n    member.isManager(this.checked);\n    renderTemplate(); // Refresh rendering, with modified data\n  })\n  .on(\"click\", \".changeManager\", function() {\n    var memberIndex = $(this).data(\"index\"),\n      member = team.members()[memberIndex];\n    member.isManager(true);\n    renderTemplate(); // Refresh rendering, with modified data\n  })\n  .on(\"click\", \".noManager\", function() {\n    team.manager(null);\n    renderTemplate(); // Refresh rendering, with modified data\n  }\n);",
        "title": "Sample: extending Person with  an isManager property",
        "height": "320",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "jsvviewmodelsapi",
            "label": "Compiled View Models (JsViews)"
          }
        ]
      }
    ]
  },
  "lifecycle": {
    "title": "Life-cycle events",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  }
};