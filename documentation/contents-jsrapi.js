﻿var content = $.views.documentation.content;
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
        "text": "- [`{{include ...}}`](#includetag) (Template composition -- partials)\n- [`{{for ...}}`](#fortag) (Template composition, with iteration over arrays)\n- [`{{props ...}}`](#propstag) (Iteration over properties of an object)\n- [`{{if ...}}`](#iftag) (Conditional inclusion)\n- [`{{mytag ...}}`](#customtagsapi) (Custom tags)"
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
        "height": "38",
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
        "height": "74",
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
        "height": "56",
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
        "text": "`{{include}}` is similar to `{{for}}` in that it can take an argument for moving to a new data context -- as in the following examples: \n\n*Block tag with inline content:*\n\n```jsr\n{{include address}}\n  {{:street}}\n{{/include}}\n```\n\n*Self-closing tag, referencing block content as `tmpl=...` :*\n\n```jsr\n{{include address tmpl=\"#addressTemplate\"/}}\n```\n\n```jsr\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  {{:street}}\n</script>\n```\n\nThe above two examples are equivalent to:\n\n```jsr\n{{:address.street}}\n```",
        "anchor": "context"
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
        "height": "55",
        "anchor": "iteration"
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
        "height": "60",
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
        "title": "{{for object}}",
        "anchor": "object"
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
        "height": "60",
        "title": "{{for object tmpl=... /}}",
        "anchor": "tmpl"
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
        "height": "90",
        "title": "{{for array}}",
        "anchor": "array"
      },
      {
        "_type": "para",
        "title": "Using the {{else}} tag with {{for}}",
        "text": "Using the `{{else}}` tag between `{{for}}` and `{{/for}}`, allows alternate rendering based on the object or array returned from the path or expression `{{for pathOrExpr}}`",
        "anchor": "else"
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
        "height": "134",
        "jsrJsvJqui": "jsr",
        "title": "{{for array}}...{{else}}...{{/for}}",
        "anchor": "sample-arrayelse"
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
            "markup": "{{for manager}}\n  <li><b>Manager:</b> {{:name}}</li>\n{{else}}\n  <li>There is no team manager!</li>\n{{/for}}"
          }
        ],
        "markup": "<b>{{:title}}</b>\n<ul>\n  {{for manager}}\n    <li><b>Manager:</b> {{:name}}</li>\n  {{else}}\n    <li>There is no team manager!</li>\n  {{/for}}\n</ul>",
        "data": [
          {
            "title": "The A team2",
            "manager": {
              "name": "Pete"
            }
          },
          {
            "title": "The B team"
          }
        ],
        "title": "{{for object}}...{{else}}...{{/for}}",
        "height": "134",
        "anchor": "sample-objectelse"
      },
      {
        "_type": "para",
        "title": "",
        "text": "*Note:* A `{{for}}` tag (like an `{{if}}` tag) can have multiple `{{else}}` blocks. See for example [this sample](#jsvelsetag@for-else-multiple)."
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">Using {{for array}} with sorting and filtering, or specifying a range of items</span>",
        "text": "When using the `{{for}}` tag to render arrays, built-in features allow sorting, filtering and 'slicing' the rendered list:",
        "anchor": "sortfilterrange"
      },
      {
        "_type": "para",
        "title": "The <b>reverse</b> property:  specifying reverse ordering (or reverse sorting) on {{for array}}",
        "text": "To iterate over an array in reverse order, set the `reverse` property to `true`:\n\n```jsr\n{{for array reverse=true }}...{{/for}}\n```\n\nSetting `reverse=true` can be combined with using the [`sort`](#fortag@sort), [`filter`](#fortag@filter), [`start`](#fortag@start-end), [`end`](#fortag@start-end) or [`step`](#fortag@start-end) properties, to reverse the order of iteration (for example to sort in *descending* order rather than *ascending* order).",
        "anchor": "reverse"
      },
      {
        "_type": "para",
        "title": "The <b>sort</b> property:  specifying sorting on {{for array}}",
        "text": "To specify sorting, set the `sort` property: \n\n```jsr\n{{for array sort=\"firstName\" }}...{{/for}}\n```\n\n- If the array is an array of objects, the `sort=...` property of `{{for}}` is usually set to an object property to be sorted by, such as `firstName`, or to a data path, such as `sort=\"address.street\"`\n- To sort an array of numbers, strings or `Date`s, set the `sort` property to `true`: `sort=true`\n- For advanced scenarios you can provide your own sort function: `sort=~mySortFunction`\n\nSetting `sort=...` can be combined with using the [`reverse`](#fortag@reverse), [`filter`](#fortag@filter), [`start`](#fortag@start-end), [`end`](#fortag@start-end) or [`step`](#fortag@start-end) properties.\n\nThe following three samples illustrate the above scenarios, using the `reverse` and `sort` properties:",
        "anchor": "sort"
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
            "text": "*<div class=\"close\">Template:</div>*\n```jsr\n{{for colors sort=true reverse=true}}...{{/for}}  {{!-- (Reverse) sort array of strings --}}\n{{for amounts sort=true}}...{{/for}}              {{!-- Sort array of Numbers --}}\n{{for dates sort=true}}...{{/for}}                {{!-- Sort array of Dates --}}\n```\n\n*<div class=\"close\">Data:</div>*\n```js\ncolors: [\"red\", ...],\namounts: [33.001, ...],\ndates: [new Date(2000, 0, 1), ...]\n```"
          }
        ],
        "markup": "",
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <b>Reverse sort strings:</b>\n  {{for colors sort=true reverse=true}}\n    {{:}}\n  {{/for}}<hr/>\n\n  <b>Sort numbers:</b>\n  {{for amounts sort=true}}\n    {{:}},\n  {{/for}}<hr/>\n\n  <b>Sort dates:</b>\n  {{for dates sort=true}}\n    {{formatDate:}} &mdash;\n  {{/for}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.converters(\"formatDate\", function(date) {\n  // Converter to format Dates\n  return date.toLocaleDateString(\"en-US\");\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    colors: [\n      \"red\",\n      \"white\",\n      \"blue\"\n    ],\n    amounts: [\n      33,\n      -2.333,\n      2.4,\n      -22,\n      22\n    ],\n    dates: [\n      new Date(2000, 0, 1),\n      new Date(1998, 6, 30),\n      new Date(2000, 11, 31)\n    ]\n  },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "height": "110",
        "title": "Sorting an array of strings/Numbers/Dates",
        "anchor": "sortvalues"
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
            "text": "*<div class=\"close\">Template:</div>*\n```jsr\n{{for people sort=\"firstName\"}}...{{/for}}              {{!-- Sort by first name --}}\n{{for people sort=\"lastName\" reverse=true}}...{{/for}}  {{!-- Sort by last name, decreasing --}}\n{{for people sort=\"address.street\"}}                    {{!-- Sort by address.street --}}\n```\n\n*<div class=\"close\">Data:</div>*\n```js\npeople: [\n  {firstName: \"Jo\", ... address: {street: \"1st Street\" ...}},\n  ...\n]\n```"
          }
        ],
        "markup": "<b>Sort by first name</b>\n<ul>\n  {{for people sort=\"firstName\"}}\n    <li>{{:firstName}} {{:lastName}}</li>\n  {{/for}}\n</ul>\n\n<b>Sort by last name, decreasing</b>\n<ul>\n  {{for people sort=\"lastName\" reverse=true}}\n    <li>{{:firstName}} {{:lastName}}</li>\n  {{/for}}\n</ul>\n\n<b>Sort by street</b>\n<ul>\n  {{for people sort=\"address.street\"}}\n    <li>{{:firstName}}: {{:address.street}}</li>\n  {{/for}}\n</ul>",
        "data": {
          "people": [
            {
              "firstName": "Jo",
              "lastName": "Blow",
              "address": {
                "street": "1st Street"
              }
            },
            {
              "firstName": "Adriana",
              "lastName": "Zhang",
              "address": {
                "street": "1st Avenue"
              }
            },
            {
              "firstName": "Xavier",
              "lastName": "Rossi",
              "address": {
                "street": "2nd Street"
              }
            }
          ]
        },
        "height": "294",
        "jsrJsvJqui": "jsr",
        "title": "Sorting an array of objects",
        "anchor": "sortobjects"
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
            "text": "```jsr\n{{for words sort=~locale}}...{{/for}}      {{!-- Sort using a custom helper function with localeCompare() --}}\n{{for people sort=~multilevel}}...{{/for}} {{!-- Sort using a custom helper function for multi-level sorting --}}\n```\n\nThe custom sort function takes arguments `(a, b)` for the two objects being compared. The `this` pointer is the  `tagCtx` object.\n\n```js\n// Custom sort functions\nfunction localeSort(a, b) {\n  // Localized sort\n  // Return 1, -1 or 0 to specify relative position of 'a' and 'b' in the sort order\n  return a.localeCompare(b) > 0 ? 1 : b.localeCompare(a) > 0 ? -1 : 0;\n}\n\nfunction multilevelSort(a, b) {\n  // Return 1, -1 or 0 to specify relative position of 'a' and 'b' in the sort order\n  // Sort by role, then by age (descending) then by name\n  return ...\n}\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n<div class=\"left\">\n  <label>Localized sort of French words</label>\n  <ul>\n    {{for words sort=~locale}} {{!-- Sort using a custom helper function with localeCompare() --}}\n      <li>{{:}}</li>\n    {{/for}}\n  </ul>\n</div>\n\n<div class=\"left\">\n  <label>Multilevel sort</label>\n  <ul>\n    {{for people sort=~multilevel}}  {{!-- Sort using a custom helper function for multi-level sorting --}}\n      <li>{{:name}}: ({{:details.role}}) &ndash; age {{:details.age}}</li>\n    {{/for}}\n  </ul>\n</div>\n</script>\n\n<div id=\"page\"></div>",
        "code": "// Custom sort functions\nfunction localeSort(a, b) {\n  // Return 1, -1 or 0 to specify relative position of 'a' and 'b' in the sort order\n  // Localized sort\n  return a.localeCompare(b) > 0 ? 1 : b.localeCompare(a) > 0 ? -1 : 0;\n}\n\nfunction multilevelSort(a, b) {\n  // Return 1, -1 or 0 to specify relative position of 'a' and 'b' in the sort order\n  // Sort by role, then by age (descending) then by name\n  return level(a.details.role.toLowerCase(), b.details.role.toLowerCase()) // by role\n      || level(b.details.age, a.details.age)  // by age\n      || level(a.name.toLowerCase(), b.name.toLowerCase()); // by name\n}\n\n// Helper function for multi-level sort\nfunction level(aField, bField) {\n  return aField > bField ? 1 : aField < bField ? -1 : 0;\n}\n\n$.views.helpers({\n    locale: localeSort,\n    multilevel: multilevelSort\n  });\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    words:\n      [\"maître\", \"âme\", \"école\", \"amour\", \"absolu\",\n      \"maison\", \"vôtre\", \"être\", \"effort\"],\n    people:\n      [\n        {name: \"Bill\", details: {age: 22, role: \"Lead\"}},\n        {name: \"Anne\", details: {age: 32, role: \"Assistant\"}},\n        {name: \"Emma\", details: {age: 19.1, role: \"Team member\"}},\n        {name: \"Jeff\", details: {age: 33.5, role: \"Lead\"}},\n        {name: \"Xavier\", details: {age: 32, role: \"Team member\"}},\n        {name: \"Julia\", details: {age: 18, role: \"Assistant\"}},\n        {name: \"Bill\", details: {age: 32, role: \"Team member\"}}\n      ]\n    },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "height": "220",
        "title": "Using custom sort functions: localized sort and multi-level sort ",
        "anchor": "sortcustom"
      },
      {
        "_type": "para",
        "title": "The <b>filter</b> property:  specifying filtering on {{for array}}",
        "text": "To filter the rendered items, use the `filter` property to specify a filter function: \n\n```jsr\n{{for array filter=~myfilter}}...{{/for}}\n```\n\n```js\nfunction myfilter(item, index, items) {\n  return ...; // Return true/false to include/exclude any item from the result\n}\n```\n\nThe filter function is called with the `tagCtx` object as `this` pointer, and with arguments:\n\n- `item`: The current item being processed in the array\n- `index`: The index of the current item being processed in the array\n- `array`: The array being filtered\n\nSetting `filter=...` can be combined with using the [`sort`](#fortag@sort), [`reverse`](#fortag@reverse), [`start`](#fortag@start-end), [`end`](#fortag@start-end) or [`step`](#fortag@start-end) properties (to filter the items after sorting or reversing, or before 'slicing').\n\nThe following sample renders a subset of an array of `people`, filtered by age:",
        "anchor": "filter"
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
            "text": "```js\nfunction ageRangeFilter(item, index, items) {\n  return item.details.age > this.props.minAge ...\n}\n```\n\n```jsr\n{{for people filter=~ageRange minAge=20 maxAge=40 sort=\"name\"}}...{{/for}}\n```\n\n"
          }
        ],
        "jsrJsvJqui": "jsr",
        "code": "function ageRangeFilter(item, index, items) {\n  return item.details.age > this.props.minAge && item.details.age < this.props.maxAge;\n}\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {people: [\n    {name: \"Bill\", details: {age: 25}},\n    {name: \"Anne\", details: {age: 32}},\n    {name: \"Emma\", details: {age: 19.1}},\n    {name: \"Jeff\", details: {age: 33.5}},\n    {name: \"Xavier\", details: {age: 52}},\n    {name: \"Julia\", details: {age: 18}},\n    {name: \"Jo\", details: {age: 30}}\n  ]},\n\n  html = myTmpl.render(data, { \n    ageRange: ageRangeFilter\n  });\n\n$(\"#page\").html(html);",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <em>Filter: age from 20 to 40</em>\n\n  <ul>\n    {{for people filter=~ageRange minAge=20 maxAge=40 sort=\"name\"}}\n      <li>{{:name}}: age {{:details.age}}</li>\n    {{/for}}\n  </ul>\n</script>\n\n<div id=\"page\"></div>",
        "height": "120"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following sample renders an array of `people` in a two row layout -- by filtering for the items with even (first row) and odd (second row) index.\n\n(See also an alternative approach using `step=...`, in the [section](#fortag@start-end) below)."
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
            "text": "```jsr\n{{for people filter=~evenOdd odd=false sort=\"name\"}}...{{/for}}\n...\n{{for people filter=~evenOdd odd=true sort=\"name\"}}...{{/for}}\n``` \n\n```js\nevenOdd: function(item, index, items) {\n  return this.props.odd === (index%2 === 1); // Include only items with even/odd index\n}\n```"
          }
        ],
        "header": "",
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <table><tbody><tr>\n    {{for people filter=~evenOdd odd=false sort=\"name\"}}\n      <td>{{:1+2*#index}} {{:name}}</td>\n    {{/for}}\n  </tr><tr>\n    {{for people filter=~evenOdd odd=true sort=\"name\"}}\n      <td>{{:2+2*#index}} {{:name}}</td>\n    {{/for}}\n  </tr></tbody></table>\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    people: [\n      {name: \"Jo\"},\n      {name: \"Adriana\"},\n      {name: \"Xavier\"},\n      {name: \"Juanita\"},\n      {name: \"Adeline\"},\n      {name: \"Pete\"},\n      {name: \"Jeff\"},\n      {name: \"Paul\"}\n    ]\n  },\n\n  html = myTmpl.render(data, {\n    evenOdd: function(item, index, items) {\n      return this.props.odd === (index%2 === 1); // Include only items with even/odd index\n    }\n  });\n\n$(\"#page\").html(html);\n",
        "height": "100"
      },
      {
        "_type": "para",
        "title": "The <b>start</b>, <b>end</b> and <b>step</b> properties:  limiting range and/or selecting every n'th item of {{for array}}",
        "text": "To limit the range of an array ('slice' the array) of rendered items, use the `start` and/or `end` properties to specify the starting and ending index. In addition, the `step` property lets you take every other *n'th* item in the array.\n\nThe behavior of start and end corresponds to the [array.slice(start, end)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) JavaScript method: \n\n- `start`: zero-based index at which to begin rendering\n  - A negative index indicates an offset from the end of the sequence\n  - If `start` is undefined, begins from index `0`\n- `end`: zero-based index before which to end rendering (render up to but not including `end`)\n  - A negative index indicates an offset from the end of the sequence\n  - If `end` is undefined, render through the end of the array\n- `step`: A positive integer *'n'*, in order to include every *nth* item, beginning with `start`. Defaults to `1`\n\n```jsr\n{{for colors start=1 end=-1 step=2}}...{{/for}}\n```\n\nSetting `start=...`, `end=...` and/or `step=...` can be combined with using the [`sort`](#fortag@sort), [`reverse`](#fortag@reverse), [`filter`](#fortag@filter) to limit the item selection, after sorting, reversing or filtering.\n\n```jsr\n{{for colors sort=\"name\" start=1 end=-1}}...{{/for}}\n```\n\nThe following sample illustrates the use of `start=...` and `end=...` with or without sorting:",
        "anchor": "start-end"
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
            "text": "```jsr\n{{for colors}}...{{/for}}\n{{for colors start=1 end=-1}}...{{/for}}\n{{for colors step=2}}...{{/for}}\n{{for colors step=2 start=1}}...{{/for}}\n{{for colors sort=true}}...{{/for}}\n{{for colors sort=true start=1 end=-1}}...{{/for}}\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "header": "",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <b>Unsorted:</b>\n  {{for colors}}{{:}} {{/for}}\n  <hr/>\n\n  <b>Sliced:</b>\n  {{for colors start=1 end=-1}}{{:}} {{/for}}\n  <hr/>\n\n  <b>Alternate, odd:</b>\n  {{for colors step=2}}{{:}} {{/for}}\n  <hr/>\n\n  <b>Alternate, even:</b>\n  {{for colors step=2 start=1}}{{:}} {{/for}}\n  <hr/>\n\n  <b>Sorted:</b>\n  {{for colors sort=true}}{{:}} {{/for}}\n  <hr/>\n\n  <b>Sorted then sliced:</b>\n  {{for colors sort=true start=1 end=-1}}{{:}} {{/for}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    colors: [\"red\", \"orange\", \"yellow\", \"green\", \"blue\", \"indigo\", \"violet\"]\n  },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);\n",
        "height": "200"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following sample uses `step=...` to render multi-row layouts of an array of people:"
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
            "text": "```jsr\n{{for people step=3 start=0 sort=\"name\" end=-2}}\n{{for people step=3 start=1 sort=\"name\" end=-2}}\n{{for people step=3 start=2 sort=\"name\" end=-2}}\n```\n\n```jsr\n{{for people step=2 start=0 sort=\"name\" reverse=true}}\n{{for people step=2 start=1 sort=\"name\" reverse=true}}\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <em>Three row display: step=3</em>\n\n  <table><tbody><tr>\n    {{for people step=3 start=0 sort=\"name\" end=-2}}\n      <td>{{:1+3*#index}} {{:name}}</td>\n    {{/for}}\n  </tr><tr>\n    {{for people step=3 start=1 sort=\"name\" end=-2}}\n      <td>{{:2+3*#index}} {{:name}}</td>\n    {{/for}}\n  </tr><tr>\n    {{for people step=3 start=2 sort=\"name\" end=-2}}\n      <td>{{:3+3*#index}} {{:name}}</td>\n    {{/for}}\n  </tr></tbody></table>\n\n  <em>Two row display: step=2 reverse=true</em>\n\n  <table><tbody><tr>\n    {{for people step=2 start=0 sort=\"name\" reverse=true}}\n      <td>{{:1+2*#index}} {{:name}}</td>\n    {{/for}}\n  </tr><tr>\n    {{for people step=2 start=1 sort=\"name\" reverse=true}}\n      <td>{{:2+2*#index}} {{:name}}</td>\n    {{/for}}\n  </tr></tbody></table>\n</script>\n\n<div id=\"page\"></div>",
        "jsrJsvJqui": "jsr",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    people: [\n      {name: \"Jo\"},\n      {name: \"Adriana\"},\n      {name: \"Xavier\"},\n      {name: \"Juanita\"},\n      {name: \"Adeline\"},\n      {name: \"Pete\"},\n      {name: \"Jeff\"},\n      {name: \"Paul\"}\n    ]\n  },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "height": "220",
        "header": "<style>table {margin: 10px 0;}</style>",
        "action": "append"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the sample [*Using the {{for}} tag to provide a 'purchases' grid view,...*](#samples/jsr/tags/extend-for@for), which includes sorting, filtering, reverse, as well as a running totals helper function:\n\n```jsr\n{{for lineItems sort=\"price\" reverse=true filter=~category category=\"book\"}}\n  ...{{:~total('quantity*price')}}...\n{{else}}\n  ...No items...\n{{/for}}\n```\n\n"
      },
      {
        "_type": "para",
        "title": "Sorting, filtering, 'slicing' operations in any order",
        "text": "Some of the above samples include applying a sort operation followed by a 'slice' operation. It is also possible reverse the order of operations, and to limit the range **_before_** sorting the result, as in the following two examples:",
        "anchor": "anyorder"
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
            "text": "```jsr\n{{for people end=-2 noIteration=true}}     {{!-- slice (remove last two) --}}\n  ...\n  {{for #data step=3 start=0 sort=\"name\"}} {{!-- sort ... --}}\n    ...\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <em>Three row display (sliced then sorted)</em>\n\n  {{for people end=-2 noIteration=true}}       {{!-- slice (remove last two) --}}\n    <table><tbody><tr>\n      {{for #data step=3 start=0 sort=\"name\"}} {{!-- sort --}}\n        <td>{{:1+3*#index}} {{:name}}</td>\n      {{/for}}\n    </tr><tr>\n      {{for #data step=3 start=1 sort=\"name\"}}\n        <td>{{:2+3*#index}} {{:name}}</td>\n      {{/for}}\n    </tr><tr>\n      {{for #data step=3 start=2 sort=\"name\"}}\n        <td>{{:3+3*#index}} {{:name}}</td>\n      {{/for}}\n    </tr></tbody></table>\n  {{/for}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    people: [\n      {name: \"Jo\"},\n      {name: \"Adriana\"},\n      {name: \"Xavier\"},\n      {name: \"Juanita\"},\n      {name: \"Adeline\"},\n      {name: \"Pete\"},\n      {name: \"Jeff\"},\n      {name: \"Paul\"}\n    ]\n  },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);\n",
        "jsrJsvJqui": "jsr",
        "header": "<style>table {margin: 10px 0;}</style>",
        "action": "append",
        "height": "132"
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
            "text": "```jsr\n{{for colors start=1 end=-1 noIteration=true}} {{!-- slice (remove first and last) --}}\n  {{for #data sort=true}}...{{/for}}           {{!-- sort ... --}}\n{{/for}}\n```\n"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <b>Sliced then sorted:</b>\n  {{for colors start=1 end=-1 noIteration=true}} {{!-- slice (remove first and last) --}}\n     {{for #data sort=true}}{{:}} {{/for}}         {{!-- sort --}}\n  {{/for}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    colors: [\"red\", \"orange\", \"yellow\", \"green\", \"blue\", \"indigo\", \"violet\"]\n  },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "42"
      },
      {
        "_type": "para",
        "title": "",
        "text": "A similar approach can be used to apply any desired `filter`, `sort`, `reverse`, or 'slice' operations in any order. For example:\n\n```jsr\n{{for colors filter=~preSort noIteration=true}}\n  {{for #data sort=... noIteration=true}}\n    {{for #data filter=~afterSort}}...{{/for}}\n  {{/for}}\n{{/for}}\n```"
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">Using {{for start=... end=... step=...}} to iterate over a range of numbers</span>",
        "text": "The `{{for}}` tag can be used to iterate over a range of numbers, rather than iterating over a data array.\n\nFor example:\n\n```jsr\n{{for start=0 end=4}}{{:}}, {{/for}}\n```\n\nwill render the result `0, 1, 2, 3, `.\n\nBy setting the `start` and `end` properties (and optionally the `step` property) to appropriate `Numbers`, *but without providing any argument as data array*, the `{{for}}` tag will in fact generate a corresponding array of numbers (usually integers), and will iterate over that generated array.\n\n- `start`: Initial number for generated array.  If undefined, defaults to `0`\n- `end`: Number before which to end the array (generate numbers up to but not including `end`)\n- `step`: Optional: the incremental amount for subsequent numbers in the array. Defaults to `1`\n\nFor example:\n\n```jsr\n{{for start=4.5 end=-2 step=-1.5}}{{:}}, {{/for}}\n```\n\nwill output `4.5, 3, 1.5, 0, -1.5, `\n\nThe following sample uses generated arrays to render table layouts of `people` 'by rows':",
        "anchor": "number-range"
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
            "text": "*Sorted table, by rows:*\n\n```jsr\n{{for end=people.length/2 itemVar='~row'}}\n  <tr>\n    {{for ~root.people start=~row*2 end=(~row+1)*2 sort=\"name\"}}\n      <td>...{{:name}}</td>\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <em>Sorted table, by rows (2 columns):</em>\n\n  <table><tbody>\n    {{for end=people.length/2 itemVar='~row'}}\n      <tr>\n        {{for ~root.people start=~row*2 end=(~row+1)*2 sort=\"name\"}}\n          <td>{{:1+(~row*2)+#index}} {{:name}}</td>\n        {{/for}}\n      </tr>\n    {{/for}}\n  </tbody></table>\n\n  <em>Sorted table, by rows (4 columns):</em>\n\n  <table><tbody>\n    {{for end=people.length/4 itemVar='~row'}}\n      <tr>\n        {{for ~root.people start=~row*4 end=(~row+1)*4 sort=\"name\"}}\n          <td>{{:1+(~row*4)+#index}} {{:name}}</td>\n        {{/for}}\n      </tr>\n    {{/for}}\n  </tbody></table>\n</script>\n\n<div id=\"page\"></div>",
        "header": "<style>\n  table {margin: 10px 0;}\n</style>",
        "jsrJsvJqui": "jsr",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    people: [\n      {name: \"Jo\"},\n      {name: \"Adriana\"},\n      {name: \"Xavier\"},\n      {name: \"Juanita\"},\n      {name: \"Adeline\"},\n      {name: \"Pete\"},\n      {name: \"Jeff\"},\n      {name: \"Paul\"}\n    ]\n  },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);\n",
        "height": "240",
        "title": "",
        "action": "append"
      },
      {
        "_type": "para",
        "title": "Use of itemVar with noIteration=true, to reference the array",
        "text": "Note the use of `itemVar='~row'` in the above examples. [`itemVar`](#contextualparams@itemvar) is used to provide an alias for the current data in the wrapped content, so in this case it is the current integer as we iterate over the generated array.\n\nSo the following:\n\n```jsr\n{{for start=0 end=4 itemVar='row'}}{{:~row}} {{/for}}\n```\n\n```jsr\n{{for start=0 end=4}}{{:}} {{/for}}\n```\n\nare equivalent, and each render the result `\"0 1 2 3\"`.\n\nBy setting `noIteration=true` we can instead use `itemVar` for the array itself, as in the following sample:",
        "anchor": "itemvar"
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
            "text": "```jsr\n{{for start=1 end=7 noIteration=true itemVar=\"~cols\"}} {{!-- ~rows is an array from 1 to 6 --}}\n  {{for start=1 end=5 noIteration=true itemVar=\"~rows\"}} {{!-- ~cols is an array from 1 to 4 --}}\n    <table><tbody>\n      {{for ~rows itemVar=\"~j\"}} {{!-- iterate over ~rows array --}}\n        <tr>\n          {{for ~cols itemVar=\"~i\"}} {{!-- iterate over ~cols array --}}\n            <td>{{:~i}}, {{:~j}}</td>\n```"
          }
        ],
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  html = myTmpl.render({});\n\n$(\"#page\").html(html);\n",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {{for start=1 end=7 noIteration=true itemVar=\"~cols\"}}\n    {{for start=1 end=5 noIteration=true itemVar=\"~rows\"}}\n      <table><tbody>\n        {{for ~rows itemVar=\"~j\"}}\n          <tr>\n            {{for ~cols itemVar=\"~i\"}}\n              <td>{{:~i}}, {{:~j}}</td>\n            {{/for}}\n          </tr>\n        {{/for}}\n      </tbody></table>\n    {{/for}}\n  {{/for}}\n</script>\n\n<div id=\"page\"></div>",
        "title": "itemVar - passing arrays around then iterating over them",
        "jsrJsvJqui": "jsr",
        "height": "120"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following more advanced approach to sorting by columns uses the `noIteration=true itemVar=\"~sorted\"` technique:"
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
            "text": "```jsr\n{{for people sort=\"name\" noIteration=true itemVar=\"~sorted\"}} {{!-- ~sorted is the sorted people array --}}\n  ...\n    {{for end=length step=2 itemVar=\"~col\"}} {{!-- iterate over even integers from 0 to ~sorted.length--}}\n      <td>... {{:~sorted[~col].name}}</td> {{!-- render the person.name for ~sorted items with index 0, 2, 4... --}}\n    ...\n```\n"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <em>Sorted table by columns (advanced alternative):</em>\n\n  <table><tbody>\n    {{for people sort=\"name\" noIteration=true itemVar=\"~sorted\"}}\n      <tr>\n        {{for end=length step=2 itemVar=\"~col\"}}\n          <td>{{:1+2*#index}} {{:~sorted[~col].name}}</td>\n        {{/for}}\n      </tr><tr>\n        {{for start=1 end=length step=2 itemVar=\"~col\"}}\n          <td>{{:2+2*#index}} {{:~sorted[~col].name}}</td>\n        {{/for}}\n      </tr>\n    {{/for}}\n  </tbody></table>\n</script>\n\n<div id=\"page\"></div>",
        "jsrJsvJqui": "jsr",
        "height": "100",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    people: [\n      {name: \"Jo\"},\n      {name: \"Adriana\"},\n      {name: \"Xavier\"},\n      {name: \"Juanita\"},\n      {name: \"Adeline\"},\n      {name: \"Pete\"},\n      {name: \"Jeff\"},\n      {name: \"Paul\"}\n    ]\n  },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);\n",
        "header": "<style>\n  table {margin: 10px 0;}\n</style>",
        "action": "append"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the ['range' sample](#jsvfortag@jsvsortfilterrange), for an example of dynamic use of the `start` and `end` properties of `{{for}}`, along with JsViews data-linking.\n"
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
          },
          {
            "_type": "topic",
            "hash": "getindex",
            "label": "getIndex(): accessing array index"
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
        "height": "200",
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
        "height": "200",
        "title": "{{props object tmpl=... /}}",
        "anchor": "sample-tmpl"
      },
      {
        "_type": "para",
        "title": "Using the {{else}} tag with {{props}}",
        "text": "Using the `{{else}}` tag between `{{props}}` and `{{/props}}`, allows alternate rendering based on the object returned from the path or expression `{{props pathOrExpr}}`",
        "anchor": "else"
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
        "height": "160",
        "jsrJsvJqui": "jsr"
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
            "text": "```jsr\n{{props USaddress}}\n  <b>{{>key}}:</b> {{>prop}}<br/>\n{{else UKaddress}}\n  <b>{{>key}}:</b> {{>prop}}<br/>\n{{else}}\n  The address is blank (no properties)!\n{{/props}}"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n<table><tbody>\n  <tr><td><b>name:</b> {{:name}}</td></tr>\n  <tr><td> \n  {{props USaddress}}\n    <b>{{>key}}:</b> {{>prop}}<br/>\n  {{else UKaddress}}\n    <b>{{>key}}:</b> {{>prop}}<br/>\n  {{else}}\n    The address is blank (no properties)!\n  {{/props}}\n  </td></tr>\n</tbody></table></script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n  data = [\n    {\n      \"name\": \"Pete\",\n      \"USaddress\": {\n        \"street\": \"12 Pike Place\",\n        \"city\": \"Seattle\",\n        \"ZIP\": \"98101\"\n      }\n    },{\n      \"name\": \"Jeff\",\n      \"UKaddress\": {\n        \"street\": \"3a Upton Place\",\n        \"city\": \"London\",\n        \"code\": \"W2 1JA\"\n      }\n    },{\n      \"name\": \"Heidi\",\n    }\n  ],\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "height": "240"
      },
      {
        "_type": "para",
        "title": "The <b>noFunctions</b> property",
        "text": "By default `{{props}}` will iterate over all members of an object, including members of type: *function* (methods). To prevent outputting members of type *function*, set the `noFunctions` property to `true`:\n\n```jsr\n{{props ... noFunctions=true}}\n```\n\n",
        "anchor": "nofunctions"
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
            "text": "```jsr\n{{props person noFunctions=true}}\n  {{>key}}: {{>prop}}<br/>\n{{/props}}\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {{props person}}\n    {{>key}}: {{>prop}}<br/>\n  {{/props}}\n\n  <hr/>\n\n  {{props person noFunctions=true}}\n    {{>key}}: {{>prop}}<br/>\n  {{/props}}\n</script>\n\n<div id=\"page\"></div>\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    person: {\n      first: \"Jo\",\n      last: \"Blow\",\n      fullName: function() {\n        return this.first + \" \" + this.last;\n      }\n    }\n  },\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "height": "120"
      },
      {
        "_type": "para",
        "title": "Using {{props}} to iterate over a top-level dictionary/hash data-collection",
        "text": "If the data (obtained for example, from the server) is a collection, but in the form of an object (dictionary/hash) rather than an array, then *__`{{props}}`__* without arguments (or equivalently *__`{{props #data}}`__*) can be used to iterate over the collection, as shown in the next sample:\n\n(When using JsViews, see also [`{^{props}}`](#jsvpropstag@load-hash) for loading and providing complete editability of a top-level dictionary/hash.)",
        "anchor": "iterate-hash"
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
            "text": "*Dictionary/hash -- collection of people:*\n\n```js\nvar people = {\n  pt1: {\n    \"name\": \"Pete\",\n    \"address\": {\n      ...\n    }\n  },\n  Hd1: {\n    \"name\": \"Heidi\",\n    \"address\": {\n      ...\n    }\n  }\n};\n```\n\n*Template:*\n\n```jsr\n<script id=\"peopleTemplate\" type=\"text/x-jsrender\">\n  <table>\n    {{props}}\n      <tbody>\n        ...\n      </tbody>\n    {{/props}}\n  </table>\n</script>\n```"
          }
        ],
        "html": "<script id=\"peopleTemplate\" type=\"text/x-jsrender\">\n  <table>\n    {{props}}\n      <tbody>\n        <tr><td><b>name:</b> {{:prop.name}}</td></tr>\n        <tr><td> \n          {{props prop.address tmpl=\"#addressTemplate\" /}}\n        </td></tr>\n      </tbody>\n    {{/props}}\n  </table>\n</script>\n\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  <b>{{>key}}:</b> {{>prop}}<br/>\n</script>\n\n<div id=\"result\"></div>",
        "code": "var people = {\n  pt1: {\n    \"name\": \"Pete\",\n    \"address\": {\n      \"street\": \"12 Pike Place\",\n      \"city\": \"Seattle\",\n      \"ZIP\": \"98101\"\n    }\n  },\n  Hd1: {\n    \"name\": \"Heidi\",\n    \"address\": {\n      \"street\": \"5000 Broadway\",\n      \"city\": \"Sidney\",\n      \"country\": \"Australia\"\n    }\n  }\n};\n\nvar html = $(\"#peopleTemplate\").render(people);\n\n$(\"#result\").html(html);",
        "height": "194",
        "jsrJsvJqui": "jsr"
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">Using {{props}} with specific sorting, filtering or range of the rendered properties</span>",
        "text": "When using the `{{props}}` tag to render properties, built-in features allow sorting, filtering and 'slicing' of the rendered list. (These features correspond exactly to the equivalent [sorting and filtering](#fortag@sortfilterrange) features provided by the`{{for}}` tag):",
        "anchor": "sortfilterrange"
      },
      {
        "_type": "para",
        "title": "The <b>reverse</b> property:  specifying reverse ordering (or reverse sorting) on {{props object}}",
        "text": "To iterate over the object properties in reverse order, set the `reverse` property to `true`:\n\n```jsr\n{{props object reverse=true }}...{{/props}}\n```\n\nSetting `reverse=true` can be combined with using the [`sort`](#propstag@sort), [`filter`](#propstag@filter), [`start`](#propstag@start-end), [`end`](#propstag@start-end) or [`step`](#propstag@start-end) properties, to reverse the order of iteration (for example to sort in *descending* order rather than *ascending* order).",
        "anchor": "reverse"
      },
      {
        "_type": "para",
        "title": "The <b>sort</b> property:  specifying sorting on {{props object}}",
        "text": "To specify sorting, set the `sort` property: \n\n```jsr\n{{props object sort=\"prop.firstName\" }}...{{/props}}\n```\n\n- To sort the properties by *key*, set `sort=\"key\"`\n- If the properties are objects (a 'hash' of objects), the `sort=...` property of `{{props}}` is usually set to an object property to be sorted by, such as `prop.firstName`, or to a data path, such as `sort=\"prop.address.street\"`\n- To sort a hash of numbers, strings or `Date`s, set the `sort` property to: `sort=\"prop\"`\n- For advanced scenarios you can provide your own sort function: `sort=~mySortFunction`\n\nSetting `sort=...` can be combined with using the [`reverse`](#propstag@reverse), [`filter`](#propstag@filter), [`start`](#propstag@start-end), [`end`](#propstag@start-end) or [`step`](#propstag@start-end) properties.\n\nThe following three samples illustrate the above scenarios, using the `reverse` and `sort` properties:",
        "anchor": "sort"
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
            "text": "*<div class=\"close\">Template:</div>*\n```jsr\n{{props colors sort=\"prop\" reverse=true}} {{!-- (Reverse) sort string properties --}}\n{{props amounts sort=\"key\"}}              {{!-- Sort Number properties by key --}}\n{{props dates sort=\"prop\"}}               {{!-- Sort Date properties --}}\n```\n\n*<div class=\"close\">Data:</div>*\n```js\ncolors: {c1: \"red\", ...},\namounts: {\"1st quarter\": 111.2, ...},\ndates: {Created: new Date(2000, 0, 1), ...}\n```"
          }
        ],
        "markup": "",
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <b>Reverse sort strings:</b>\n  {{props colors sort=\"prop\" reverse=true}}\n    {{:prop}}\n  {{/props}}<hr/>\n\n  <b>Sort numbers:</b>\n  {{props amounts sort=\"key\"}}\n    <em>{{:key}}:</em> {{:prop}},\n  {{/props}}<hr/>\n\n  <b>Sort dates:</b>\n  {{props dates sort=\"prop\"}}\n    <em>{{:key}}:</em> {{formatDate:prop}}.\n  {{/props}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.converters(\"formatDate\", function(date) {\n  // Converter to format Dates\n  return date.toLocaleDateString(\"en-US\");\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    colors: {\n      c1: \"red\",\n      c2: \"white\",\n      c3: \"blue\"\n    },\n    amounts: {\n      \"1st quarter\": 111.2,\n      \"3rd quarter\": -2.33,\n      \"4th quarter\": 2.4,\n      \"2nd quarter\": -22\n    },\n    dates: {\n      Created: new Date(2000, 0, 1),\n      Deleted: new Date(2000, 11, 31),\n      Edited: new Date(1998, 6, 30)\n    }\n  },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "height": "110",
        "title": "Sorting strings/Numbers/Date properties",
        "anchor": "sortvalues"
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
            "text": "*<div class=\"close\">Template:</div>*\n```jsr\n{{props people sort=\"prop.lastName\" reverse=true}}...{{/props}}  {{!-- Sort by last name, decreasing --}}\n{{props people sort=\"prop.address.street\"}}                      {{!-- Sort by address.street --}}\n{{props people sort=\"key\" reverse=true}}                         {{!-- Reverse sort by key --}}\n```\n\n*<div class=\"close\">Data:</div>*\n```js\npeople: {\n  p1: {firstName: \"Jo\", ... address: {street: \"1st Street\" ...}},\n  ...\n}\n```"
          }
        ],
        "markup": "<b>Sort by last name, decreasing</b>\n<ul>\n  {{props people sort=\"prop.lastName\" reverse=true}}\n    <li>{{:prop.firstName}} {{:prop.lastName}}</li>\n  {{/props}}\n</ul>\n\n<b>Sort by street</b>\n<ul>\n  {{props people sort=\"prop.address.street\"}}\n    <li>{{:prop.firstName}}: {{:prop.address.street}}</li>\n  {{/props}}\n</ul>\n\n<b>Reverse sort by key</b>\n<ul>\n  {{props people sort=\"key\" reverse=true}}\n    <li>{{:key}}: {{:prop.firstName}} {{:prop.lastName}}</li>\n  {{/props}}\n</ul>",
        "data": {
          "people": {
            "p1": {
              "firstName": "Jo",
              "lastName": "Blow",
              "address": {
                "street": "1st Street"
              }
            },
            "p2": {
              "firstName": "Adriana",
              "lastName": "Zhang",
              "address": {
                "street": "1st Avenue"
              }
            },
            "p3": {
              "firstName": "Xavier",
              "lastName": "Rossi",
              "address": {
                "street": "2nd Street"
              }
            }
          }
        },
        "height": "290",
        "jsrJsvJqui": "jsr",
        "title": "Sorting a hash of objects",
        "anchor": "sortobjects"
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
            "text": "```jsr\n{{props words sort=~locale}}...{{/props}}      {{!-- Sort using a custom helper function with localeCompare() --}}\n{{props people sort=~multilevel}}...{{/props}} {{!-- Sort using a custom helper function: ~multilevel --}}\n```\n\nThe custom sort function takes arguments `(a, b)` for the two objects being compared. The `this` pointer is the current `tagCtx` object.\n\n```js\n// Custom sort functions\nfunction localeSort(a, b) {\n  // Localized sort\n  // Return 1, -1 or 0 to specify relative position of 'a' and 'b' in the sort order\n  return a.prop.localeCompare(b.prop) > 0 ? 1 : b.prop.localeCompare(a.prop) > 0 ? -1 : 0;\n}\n\nfunction multilevelSort(a, b) {\n  // Return 1, -1 or 0 to specify relative position of 'a' and 'b' in the sort order\n  // Sort by role, then by age (descending) then by name\n  return ...\n}\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n<div class=\"left\">\n  <label>Localized sort of French words</label>\n  <ul>\n    {{props words sort=~locale}} {{!-- Sort using a custom helper function with localeCompare() --}}\n      <li>{{:prop}}</li>\n    {{/props}}\n  </ul>\n</div>\n\n<div class=\"left\">\n  <label>Multilevel sort</label>\n  <ul>\n    {{props people sort=~multilevel}}  {{!-- Sort using a custom helper function: ~multilevel --}}\n      <li>{{:prop.name}}: ({{:prop.details.role}}) &ndash; age {{:prop.details.age}}</li>\n    {{/props}}\n  </ul>\n</div>\n</script>\n\n<div id=\"page\"></div>",
        "code": "// Custom sort functions\nfunction localeSort(a, b) {\n  // Return 1, -1 or 0 to specify relative position of 'a' and 'b' in the sort order\n  // Localized sort\n  return a.prop.localeCompare(b.prop) > 0 ? 1 : b.prop.localeCompare(a.prop) > 0 ? -1 : 0;\n}\n\nfunction multilevelSort(a, b) {\n  // Return 1, -1 or 0 to specify relative position of 'a' and 'b' in the sort order\n  // Sort by role, then by age (descending) then by name\n  return level(a.prop.details.role.toLowerCase(), b.prop.details.role.toLowerCase()) // by role\n      || level(b.prop.details.age, a.prop.details.age)  // by age\n      || level(a.prop.name.toLowerCase(), b.prop.name.toLowerCase()); // by name\n}\n\n// Helper function for multi-level sort\nfunction level(aField, bField) {\n  return aField > bField ? 1 : aField < bField ? -1 : 0;\n}\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    words: {\n      w1: \"maître\", w2: \"âme\", w3: \"école\", w4:\"amour\", w5:\"absolu\",\n      w6: \"maison\", w7: \"vôtre\", w8:\"être\", w9: \"effort\"\n    },\n    people: {\n      p1: {name: \"Bill\", details: {age: 22, role: \"Lead\"}},\n      p2: {name: \"Anne\", details: {age: 32, role: \"Assistant\"}},\n      p3: {name: \"Emma\", details: {age: 19.1, role: \"Team member\"}},\n      p4: {name: \"Jeff\", details: {age: 33.5, role: \"Lead\"}},\n      p5: {name: \"Xavier\", details: {age: 32, role: \"Team member\"}},\n      p6: {name: \"Julia\", details: {age: 18, role: \"Assistant\"}},\n      p7: {name: \"Bill\", details: {age: 32, role: \"Team member\"}}\n    }\n  },\n\n  html = myTmpl.render(data, { \n    locale: localeSort,\n    multilevel: multilevelSort\n  });\n\n$(\"#page\").html(html);",
        "height": "220",
        "title": "Using custom sort functions: localized sort and multi-level sort ",
        "anchor": "sortcustom"
      },
      {
        "_type": "para",
        "title": "The <b>filter</b> property:  specifying filtering on {{props object}}",
        "text": "To filter the rendered properties, use the `filter` property to specify a filter function: \n\n```jsr\n{{props object filter=~myfilter}}...{{/props}}\n```\n\n```js\nfunction myfilter(item, index, items) {\n  return ...; // Return true/false to include/exclude any item from the result\n}\n```\n\nThe filter function is called with the `tagCtx` object as `this` pointer, and with arguments:\n\n- `item`: The current `{key:..., prop:...}` 'property' object being processed\n- `index`: The index of the current item being processed in the (sorted) array of 'property' objects\n- `array`: The (sorted) array of 'property' objects being filtered\n\nSetting `filter=...` can be combined with using the [`sort`](#propstag@sort), [`reverse`](#propstag@reverse), [`start`](#propstag@start-end), [`end`](#propstag@start-end) or [`step`](#propstag@start-end) properties (to filter the items after sorting or reversing, or before 'slicing').\n\n\nThe following sample renders a subset of a hash of `people`, filtered by age:",
        "anchor": "filter"
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
            "text": "```js\nfunction ageRangeFilter(item, index, items) {\n  return item.prop.details.age > this.props.minAge ...\n}\n```\n\n```jsr\n{{props people filter=~ageRange minAge=20 maxAge=40 sort=\"prop.name\"}}...{{/props}}\n```\n\n"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <em>Filter: age from 20 to 40</em>\n\n  <ul>\n    {{props people filter=~ageRange minAge=20 maxAge=40 sort=\"prop.name\"}}\n      <li>{{:prop.name}}: age {{:prop.details.age}}</li>\n    {{/props}}\n  </ul>\n</script>\n\n<div id=\"page\"></div>",
        "jsrJsvJqui": "jsr",
        "height": "120",
        "code": "function ageRangeFilter(item, index, items) {\n  return item.prop.details.age > this.props.minAge && item.prop.details.age < this.props.maxAge;\n}\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    people: {\n      p1: {name: \"Bill\", details: {age: 25}},\n      p2: {name: \"Anne\", details: {age: 32}},\n      p3: {name: \"Emma\", details: {age: 19.1}},\n      p4: {name: \"Jeff\", details: {age: 33.5}},\n      p5: {name: \"Xavier\", details: {age: 52}},\n      p6: {name: \"Julia\", details: {age: 18}},\n      p7: {name: \"Jo\", details: {age: 30}}\n    }\n  },\n\n  html = myTmpl.render(data, { \n    ageRange: ageRangeFilter\n  });\n\n$(\"#page\").html(html);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following sample renders a hash of `people` in a two row layout -- by filtering for the items with even (first row) and odd (second row) index.\n\n(See also an alternative approach using `step=...`, in the [section](#propstag@start-end) below)."
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
            "text": "```jsr\n{{props people filter=~evenOdd odd=false sort=\"prop.name\"}}...{{/props}}\n...\n{{props people filter=~evenOdd odd=true sort=\"prop.name\"}}...{{/props}}\n``` \n\n```js\nevenOdd: function(item, index, items) {\n  return this.props.odd === (index%2 === 1); // Include only items with even/odd index\n}\n```"
          }
        ],
        "header": "<style>\n  table {font-family: tahoma,arial,verdana,sans-serif,'Lucida Sans';\n  font-size: 12px; color: #2b587a; border: 2px solid #7c94a5; border-collapse: collapse;}\n  td {border: 1px solid #93a0a9; padding: 10px; width: 60px; background-color: #fff}\n</style>",
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <table><tbody><tr>\n    {{props people filter=~evenOdd odd=false sort=\"prop.name\"}}\n      <td>{{:1+2*#index}} {{:prop.name}}</td>\n    {{/props}}\n  </tr><tr>\n    {{props people filter=~evenOdd odd=true sort=\"prop.name\"}}\n      <td>{{:2+2*#index}} {{:prop.name}}</td>\n    {{/props}}\n  </tr></tbody></table>\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    people: {\n      p1: {name: \"Jo\"},\n      p2: {name: \"Adriana\"},\n      p3: {name: \"Xavier\"},\n      p4: {name: \"Juanita\"},\n      p5: {name: \"Adeline\"},\n      p6: {name: \"Pete\"},\n      p7: {name: \"Jeff\"},\n      p8: {name: \"Paul\"}\n    }\n  },\n\n  html = myTmpl.render(data, {\n    evenOdd: function(item, index, items) {\n      return this.props.odd === (index%2 === 1); // Include only items with even/odd index\n    }\n  });\n\n$(\"#page\").html(html);\n",
        "height": "100"
      },
      {
        "_type": "para",
        "title": "The <b>start</b>, <b>end</b> and <b>step</b> properties:  limiting range and/or selecting every n'th item of {{props object}}",
        "text": "To limit the range of rendered properties, use the `start` and/or `end` properties to specify the starting and ending index. In addition, the `step` property lets you take every other *n'th* item in the array of 'property' objects.\n\nThe behavior of start and end corresponds to the [array.slice(start, end)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) JavaScript method: \n\n- `start`: zero-based index at which to begin rendering\n  - A negative index indicates an offset from the end of the sequence\n  - If `start` is undefined, begins from index `0`\n- `end`: zero-based index before which to end rendering (render up to but not including `end`)\n  - A negative index indicates an offset from the end of the sequence\n  - If `end` is undefined, render through the end of the array\n- `step`: A positive integer *'n'*, in order to include every *nth* item, beginning with `start`. Defaults to `1`\n\n```jsr\n{{props colors start=1 end=-1 step=2}}...{{/props}}\n```\n\nSetting `start=...`, `end=...` and/or `step=...` can be combined with using the [`sort`](#propstag@sort), [`reverse`](#propstag@reverse), [`filter`](#propstag@filter) to limit the range, after sorting, reversing or filtering.\n\n```jsr\n{{props colors sort=\"name\" start=1 end=-1 step=2}}...{{/props}}\n```\n\nThe following sample illustrates the use of `start=...` and `end=...` with or without sorting:",
        "anchor": "start-end"
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
            "text": "```jsr\n{{props colors}}...{{/props}}\n{{props colors start=1 end=-1}}...{{/props}}\n{{props colors step=2}}...{{/props}}\n{{props colors step=2 start=1}}...{{/props}}\n{{props colors sort=\"prop\"}}...{{/props}}\n{{props colors sort=\"prop\" start=1 end=-1}}...{{/props}}\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "header": "",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <b>Unsorted:</b>\n  {{props colors}}{{:prop}} {{/props}}\n  <hr/>\n\n  <b>Sliced:</b>\n  {{props colors start=1 end=-1}}{{:prop}} {{/props}}\n  <hr/>\n\n  <b>Alternate, odd:</b>\n  {{props colors step=2}}{{:prop}} {{/props}}\n  <hr/>\n\n  <b>Alternate, even:</b>\n  {{props colors step=2 start=1}}{{:prop}} {{/props}}\n  <hr/>\n\n  <b>Sorted:</b>\n  {{props colors sort=\"prop\"}}{{:prop}} {{/props}}\n  <hr/>\n\n  <b>Sorted then sliced:</b>\n  {{props colors sort=\"prop\" start=1 end=-1}}{{:prop}} {{/props}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    colors: {\n      c1: \"red\",\n      c2: \"orange\",\n      c3: \"yellow\",\n      c4: \"green\",\n      c5: \"blue\",\n      c6: \"indigo\",\n      c7: \"violet\"\n    }\n  },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);\n",
        "height": "200"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following sample uses `step=...` to render multi-row layouts of a hash of people:"
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
            "text": "```jsr\n{{props people step=3 start=0 sort=\"name\" end=-2}}\n{{props people step=3 start=1 sort=\"name\" end=-2}}\n{{props people step=3 start=2 sort=\"name\" end=-2}}\n```\n\n```jsr\n{{props people step=2 start=0 sort=\"name\" reverse=true}}\n{{props  people step=2 start=1 sort=\"name\" reverse=true}}\n```"
          }
        ],
        "header": "<style>table {margin: 10px 0;}</style>",
        "action": "append",
        "height": "220",
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <em>Three row display: step=3</em>\n\n  <table><tbody><tr>\n    {{props people step=3 start=0 sort=\"prop.name\" end=-2}}\n      <td>{{:1+3*#index}} {{:prop.name}}</td>\n    {{/props}}\n  </tr><tr>\n    {{props people step=3 start=1 sort=\"prop.name\" end=-2}}\n      <td>{{:2+3*#index}} {{:prop.name}}</td>\n    {{/props}}\n  </tr><tr>\n    {{props people step=3 start=2 sort=\"prop.name\" end=-2}}\n      <td>{{:3+3*#index}} {{:prop.name}}</td>\n    {{/props}}\n  </tr></tbody></table>\n\n  <em>Two row display: step=2 reverse=true</em>\n\n  <table><tbody><tr>\n    {{props people step=2 start=0 sort=\"prop.name\" reverse=true}}\n      <td>{{:1+2*#index}} {{:prop.name}}</td>\n    {{/props}}\n  </tr><tr>\n    {{props people step=2 start=1 sort=\"prop.name\" reverse=true}}\n      <td>{{:2+2*#index}} {{:prop.name}}</td>\n    {{/props}}\n  </tr></tbody></table>\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    people: {\n      p1: {name: \"Jo\"},\n      p2: {name: \"Adriana\"},\n      p3: {name: \"Xavier\"},\n      p4: {name: \"Juanita\"},\n      p5: {name: \"Adeline\"},\n      p6: {name: \"Pete\"},\n      p7: {name: \"Jeff\"},\n      p8: {name: \"Paul\"}\n    }\n  },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);"
      },
      {
        "_type": "para",
        "title": "Sorting, filtering, 'slicing' operations in any order",
        "text": "Some of the above samples include applying a sort operation followed by a 'slice' operation. It is also possible reverse the order of operations, and to limit the range **_before_** sorting the result, as in the following two examples:",
        "anchor": "anyorder"
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
            "text": "```jsr\n{{props people end=-2 noIteration=true}}   {{!-- slice (remove last two) --}}\n  ...\n  {{for #data step=3 sort=\"prop.name\"}}    {{!-- sort ... --}}\n    ...\n```"
          }
        ],
        "height": "132",
        "header": "<style>table {margin: 10px 0;}</style>",
        "action": "append",
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <em>Three row display (sliced then sorted)</em>\n\n  {{props people end=-2 noIteration=true}}    {{!-- slice (remove last two) --}}\n    <table><tbody><tr>\n      {{for #data step=3 sort=\"prop.name\"}}   {{!-- sort ... --}}\n        <td>{{:1+3*#index}} {{:prop.name}}</td>\n      {{/for}}\n    </tr><tr>\n      {{for #data step=3 start=1 sort=\"prop.name\"}}\n        <td>{{:2+3*#index}} {{:prop.name}}</td>\n      {{/for}}\n    </tr><tr>\n      {{for #data step=3 start=2 sort=\"prop.name\"}}\n        <td>{{:3+3*#index}} {{:prop.name}}</td>\n      {{/for}}\n    </tr></tbody></table>\n  {{/props}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    people: {\n      p1: {name: \"Jo\"},\n      p2: {name: \"Adriana\"},\n      p3: {name: \"Xavier\"},\n      p4: {name: \"Juanita\"},\n      p5: {name: \"Adeline\"},\n      p6: {name: \"Pete\"},\n      p7: {name: \"Jeff\"},\n      p8: {name: \"Paul\"}\n    }\n  },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);\n"
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
            "text": "```jsr\n{{props colors start=1 end=-1 noIteration=true}} {{!-- slice (remove first and last) --}}\n  {{for #data sort=\"prop\"}}...{{/for}}           {{!-- sort ... --}}\n{{/props}}\n```\n"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <b>Sliced then sorted:</b>\n  {{props colors start=1 end=-1 noIteration=true}} {{!-- slice (remove first and last) --}}\n     {{for #data sort=\"prop\"}}{{:prop}} {{/for}}   {{!-- sort ... --}}\n  {{/props}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n\n  data = {\n    colors: {\n      c1: \"red\",\n      c2: \"orange\",\n      c3: \"yellow\",\n      c4: \"green\",\n      c5: \"blue\",\n      c6: \"indigo\",\n      c7: \"violet\"\n    }\n  },\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);\n",
        "jsrJsvJqui": "jsr",
        "height": "42"
      },
      {
        "_type": "para",
        "title": "",
        "text": "A similar approach can be used to apply any desired `filter`, `sort`, `reverse`, or 'slice' operations in any order. For example:\n\n```jsr\n{{props colors filter=~preSort noIteration=true}}\n  {{for #data sort=... noIteration=true}}\n    {{for #data filter=~afterSort}}...{{/for}}\n  {{/for}}\n{{/props}}\n```"
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
        "description": "<em>Conditional inclusion</em>: &ndash; Render the block content of the <code>{{if}}</code> tag (or the referenced external template) only if the data-path or expression evaluates to true (or a 'truthy' value)",
        "sectionTypes": {}
      },
      {
        "_type": "para",
        "title": "Using the {{else}} tag with {{if}}",
        "text": "Using the `{{else}}` tag between `{{if}}` and `{{/if}}`, allows alternate rendering based on '<em>if ... else ...</em>' logic:",
        "anchor": "else"
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
        "text": "You can add more than one `{{else}}` tag between `{{if}}` and `{{/if}}`, to get alternate rendering based on '<em>if ... elseif ... else ...</em>' logic. For <em>elseif</em>, just include an expression...:\n",
        "anchor": "elseif"
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
        "height": "300",
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
        "text": "The `{{else}}` tag acts as a separator, for block tags, to divide the content of a tag into two or more different content blocks.\n\nSo it allows a block tag to provide specific behavior involving more than one content block.\n\nFor example, the [`{{if}}`](#iftag) tag uses `{{else}}` to provide *if-else*, or *if-elseif-else ...* behavior:\n\n```jsr\n{{if firstExpression}}\n    render this if the firstExpression is true\n{{else secondExpression}}\n    else render this if the secondExpression is true\n{{else}}\n    else render this\n{{/if}}\n```\n\nAnd the [`{{for}}`](#propstag) tag accepts alternative content to render if an array is empty (or an array or object is `null` or `undefined`):\n\n```jsr\n{{for members}}\n    Member Name: {{:name}}\n{{else}}\n    There are currently no members...\n{{/for}}\n```\n\nSimilarly you can use `{{else}}` with a custom tag, such as in [this sample](#samples/tag-controls/tabs):\n\n```jsr\n{{tabs caption=\"First Tab\"}}\n    first tab content\n{{else caption=\"Second Tab\"}}\n    second tab content\n{{/tabs}}\n```"
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
            "example": "{{!-- this section will be omitted \n\n<em>Do I really want to show this? {{:password}}</em>\n\n--}}",
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
        "sectionTypes": {},
        "anchor": "run"
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
        "sectionTypes": {},
        "anchor": "eval"
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
        "height": "60",
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
        "height": "144",
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
        "height": "110",
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
            "label": "Using custom tags"
          },
          {
            "_type": "topic",
            "hash": "tagsapi",
            "label": "Registering custom tags: $.view.tags()"
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
        },
        "anchor": "api"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing an object to the `render()` method.\n\n*--- The template is rendered once, with the object as data context:*"
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
        "height": "50",
        "anchor": "sample-render"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing an array to the `render()` method.\n\n*--- The template is rendered once for each item in the array:*"
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
        "height": "74",
        "anchor": "sample-renderarray"
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
        "height": "52",
        "jsrJsvJqui": "jsr",
        "anchor": "sample-helpers"
      },
      {
        "_type": "para",
        "title": "Passing an array to render(), but without iteration.",
        "text": "When rendering an array, an additional optional boolean parameter, `true`, can be passed to the `render()` method, in order to prevent iteration.\n",
        "anchor": "noiteration"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "template.render(data, helpersOrContext, noIteration)",
        "name": "render",
        "object": "template",
        "method": true,
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
              },
              {
                "_type": "param",
                "name": "noIteration",
                "type": "boolean",
                "optional": true,
                "description": "Pass in parameter <code>true</code> to prevent iteration on array data"
              }
            ],
            "args": [],
            "sections": [],
            "example": "var html = myTmpl.render(data, helpers, true);",
            "description": "Render template against data, pass in helpers, and specify iteration behavior"
          }
        ],
        "description": "Render a template against data, along with helpers/context (and determine iteration behavior with array data).  Return a string. ",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        },
        "anchor": "api-noiteration"
      },
      {
        "_type": "para",
        "title": "",
        "text": "By passing in `true` as the third *'noIteration'* parameter (or as second parameter if no `helpersOrContext` are passed), the template renders just once, with the array itself as current data, rather than rendering once for each item in the array.\n\nWithin the template, `{{for}}` (or equivalently `{{for #data}}`) can be used to iterate over the array, as in the following example:"
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
            "text": "Code:\n\n```js\nvar html = myTmpl.render(people, true);\n```\n\nTemplate:\n\n```jsr\n<table>\n  <thead><tr><th>\n    {{:#data.length}} people\n  </th></tr></thead>\n  <tbody>\n    {{for}}\n      <tr><td>\n        {{:name}}\n      </td></tr>\n    {{/for}}\n  </tbody>\n</table>\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "height": "110",
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table>\n    <thead><tr><th>\n      {{:#data.length}} people\n    </th></tr></thead>\n    <tbody>\n      {{for}}\n        <tr><td>\n          {{:name}}\n        </td></tr>\n      {{/for}}\n    </tbody>\n  </table>\n</script>",
        "code": "var myTmpl = $.templates(\"#personTmpl\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nvar html = myTmpl.render(people, true);\n\n$(\"#peopleList\").html(html);",
        "title": "template.render(array, helpers, noIteration):",
        "anchor": "sample-noiteration"
      },
      {
        "_type": "para",
        "title": "Alternative compact syntax for render() call",
        "text": "The compiled template is in fact *itself a function*, equivalent to its own `render()` method. \n\nThis means that any `render()` call can be replaced by an equivalent (but more compact) syntax, as shown in the following example:\n\n```js\nvar html = myTmpl(people, helpers, true);",
        "anchor": "tmpl-is-render"
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
        "text": "If a template has been [registered](#d.templates) as a named template:\n\n```js\n$.templates(\"myTmpl\", \"#personTmpl\");\n```\n\nor\n\n```js\n$.templates(\"myTmpl\", \"some markup string\");\n```\n\n...then you can call the [`render()`](#tmplrender) method of the template without needing to hold on to the compiled template object returned from [`$.templates(...)`](#d.templates).\n\nJust call `$.render.myTmpl(...)`, or `$.render[\"myTmpl\"](...)`\n\n(**Note:** there is also an alternative syntax for rendering a named template: `$.templates.myTmpl(...);`)\n"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.render.myTmpl(data, helpersOrContext, noIteration)",
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
              },
              {
                "_type": "param",
                "name": "noIteration",
                "type": "boolean",
                "optional": true,
                "description": "Pass in parameter <code>true</code> to prevent iteration on array data"
              }
            ],
            "sections": [],
            "example": "var html = $.render.myTmpl(data, helpers, true);",
            "description": "Render template against data. Optionally pass in helpers and specify iteration behavior."
          }
        ],
        "description": "Render a template against data. Return a string.<br/>(Optionally provide helpers/context, and specify iteration behavior). ",
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
        "height": "50",
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
        "text": "If a template has been [registered](#d.templates) using a script block:\n\n```jsr\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  ...\n</script>\n```\n\n...then you can call the [`render()`](#tmplrender) method of the template without needing to hold on to the compiled template object returned from [`$.templates(...)`](#d.templates), and without registering a named template.\n\nJust call `$(\"#myTmpl\").render(...)`"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$(tmplSelector).render(data, helpersOrContext, noIteration)",
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
              },
              {
                "_type": "param",
                "name": "noIteration",
                "type": "boolean",
                "optional": true,
                "description": "Pass in parameter <code>true</code> to prevent iteration on array data"
              }
            ],
            "sections": [],
            "example": "var html = $(\"#myTmpl\").render(myData, myHelpers, true);",
            "description": "Render template against data. Optionally pass in helpers and specify iteration behavior."
          }
        ],
        "description": "Render a template against data. Return a string.<br/>(Optionally provide helpers/context, and specify iteration behavior). ",
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
        "height": "50",
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
        "title": "",
        "text": "(See also *[Registering templates](#d.templates): The `$.views.templates()` API*.)"
      },
      {
        "_type": "para",
        "title": "Defining templates",
        "text": "To define a template you need to provide the markup for the template. JsRender will convert (compile) the markup into a JavaScript function -- the 'render' function for your template. In fact for convenience, JsRender creates a *template object* which has a [`template.render()`](#rendertmpl) method which is the compiled function.\n\nThere are two ways to create a template:\n\n- Pass the markup string to the [`$.templates()`](#d.templates) method\n- Declare the template in a script block with `type=\"text/x-jsrender\"` (or at least a type other than the default `text/javascript`), then pass the jQuery selector for the script block to the [`$.templates()`](#d.templates) method\n\nIn either case, the `$.templates()` method will compile a template object, and optionally register it by name.\n\nHere is an example of the first approach:"
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
            "text": "We pass our markup string to the [`$.templates()`](#d.templates) method:\n\n```jsr\nvar myTmpl = $.templates(\"<label>Name:</label> {{:name}} \");\n```\n\nthen call the [`render()`](#rendertmpl) method on the returned template object:\n\n```js\nvar html = myTmpl.render(people);\n```"
          }
        ],
        "height": "40",
        "jsrJsvJqui": "jsr",
        "html": "<div id=\"peopleList\"></div>",
        "code": "var myTmpl = $.templates(\"<label>Name:</label> {{:name}} \");\n\nvar people = [\n  {name: \"Adriana\"},\n  {name: \"Robert\"}\n];\n\nvar html = myTmpl.render(people);\n\n$(\"#peopleList\").html(html);",
        "title": "Registering a template from a template markup string:",
        "anchor": "fromstring"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is an example of the second:"
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
            "text": "This time we put our markup in a script block with `type=\"text/x-jsrender\"`\n\n```jsr\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>\n```\n\nand then in the code we call the [`$.templates()`](#d.templates) method with a jQuery selector for that script block:  \n\n```jsr\nvar myTmpl = $.templates(\"#personTemplate\");\n```\n\n*Note:* If jQuery is not loaded then only the jQuery *ID selector* is supported. But if jQuery is loaded, other jQuery selectors (such as the *class selector*) can also be used.\n\nThen as before we call the [`render()`](#rendertmpl) method on the returned template object:\n\n```js\nvar html = myTmpl.render(people);\n```"
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>",
        "code": "var myTmpl = $.templates(\"#personTemplate\");\n\nvar people = [\n  {name: \"Adriana\"},\n  {name: \"Robert\"}\n];\n\nvar html = myTmpl.render(people);\n\n$(\"#peopleList\").html(html);",
        "title": "Registering a template declared in script block:",
        "jsrJsvJqui": "jsr",
        "height": "40",
        "anchor": "fromscriptblock"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The first approach above has the advantage of keeping your template declaration independent of the HTML markup that you are loading into the browser. Indeed you may want to provide the template markup strings for your templates in different application-specific ways, such as loading the string from the server (using a script file or text or html file), creating 'computed' template markup strings on the fly, etc.\n"
      },
      {
        "_type": "para",
        "title": "Example of fetching the markup string from the server",
        "text": "Here is a simple example of fetching the markup string from the server. We load a `.../person.js` file from the server which registers a named `\"person\"` template.",
        "anchor": "fromserver"
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
            "text": "We load the *person.js* script from the server, which registers a named `\"person\"` template:\n\n```js\n$.templates(\"person\", \"<label>Name:</label> {{:name}} \");\n```\n\nAs soon as the script is loaded, we call the [`render(...)`](#d.render) method for the registered template:\n\n```js\n$.getScript(\".../person.js\", function() {\n    var html = $.render.person(people);\n    $(\"#peopleList\").html(html);\n  });\n```\n\n*Note:* For a more sophisticated example of lazy loading of scripts for registering templates, see the [remote templates](#samples/jsr/composition/remote-tmpl) sample."
          }
        ],
        "markup": "\n",
        "data": {},
        "code": "$.getScript(\"https://www.jsviews.com/samples/resources/templates/person.js\", function() {\n    var html = $.render.person(people);\n    $(\"#peopleList\").html(html);\n  });\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];",
        "html": "<div id=\"peopleList\"></div>",
        "jsrJsvJqui": "jsr",
        "height": "40",
        "title": "Fetching a script file from the server, which registers a named template from a string",
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
        "code": "var personTemplate;\n\n$.get(\"resources/templates/person.txt\", function(value) {\n  personTemplate = $.templates(value);\n  var html = personTemplate.render(people);\n  $(\"#peopleList\").html(html);\n});\n\nvar people = [\n  {name: \"Adriana\"},\n  {name: \"Robert\"}\n];",
        "title": "Registering a named template using markup fetched from the server in a text file",
        "jsrJsvJqui": "jsr",
        "height": "40",
        "codetabs": [
          {
            "_type": "codetab",
            "name": "",
            "url": "samples/resources/templates/person.txt",
            "label": "person.txt"
          }
        ],
        "anchor": "fromtext"
      },
      {
        "_type": "para",
        "title": "",
        "text": "__Note:__ It is not possible to declare a template in a non-script element such as a `<div>`. JsRender throws an error if you try to do so. This is because the browser will process the `<div>` content as HTML, and in some cases, modify the template string. For example if the template includes a `{{> ...}}` tag, then the browser will change it to `{{&gt; ...}}` and the tag will not work..."
      },
      {
        "_type": "para",
        "title": "For additional details and scenarios see:",
        "text": "[Registering templates](#d.templates): The `$.views.templates()` API"
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
                "name": "markupOrSelectorOrElement",
                "type": "string or HTML element",
                "optional": false,
                "description": "A markup string or a selector for a template declaration script block (or the script block element)"
              }
            ],
            "sections": [],
            "example": "var myTemplate = $.templates(myMarkupString);",
            "description": "Compile a template from a string, selector or element, and return the template object"
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
                "name": "markupOrSelectorOrElement",
                "type": "string or HTML element",
                "optional": false,
                "description": "A markup string or a selector for a template declaration script block (or the script block element)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.templates(\"myTemplateName\", myMarkupString);",
            "description": "Register a named template from a string, selector or element"
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
        },
        "anchor": ""
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
            "code": "var myTmpl = $.templates(\"<label>Name:</label> {{:name}}\"); // Pass a markup string for the template\n\nvar html = myTmpl.render(person);\n"
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n",
        "code": "var myTmpl = $.templates(\"<label>Name:</label> {{:name}}\");\n\nvar person = {name: \"Robert\"};\n\nvar html = myTmpl.render(person);\n\n$(\"#peopleList\").html(html);",
        "title": "Compile a template from a string",
        "jsrJsvJqui": "jsr",
        "height": "40",
        "anchor": "tmpl-string"
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
            "text": "```jsr\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n ...\n</script>\n```\n\n```js\nvar myTmpl = $.templates(\"#personTemplate\"); // Pass a jQuery selector for the script block\n\nvar html = myTmpl.render(person);\n```\n\n*Note:* If jQuery is not loaded then only the jQuery *ID selector* is supported. But if jQuery is loaded, other jQuery selectors (such as the *class selector*) can also be used."
          }
        ],
        "title": "Get template object for script block template",
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>",
        "code": "var myTmpl = $.templates(\"#personTemplate\");\n\nvar person = {name: \"Robert\"};\n\nvar html = myTmpl.render(person);\n\n$(\"#peopleList\").html(html);",
        "height": "40",
        "jsrJsvJqui": "jsr",
        "anchor": "fromscriptblock"
      },
      {
        "_type": "para",
        "title": "",
        "text": "__Note:__ It is possible to declare a template in a non-script element such as a `<div>`, but this should be avoided. The browser will process the `<div>` content as HTML, with potential side-effects and perf implications. (For example if the template includes things like `<img src=\"{{:...}}\" />`. then the browser will try to load the `<img>` from a non-existant URL...)"
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
        "jsrJsvJqui": "jsr",
        "anchor": "namedfromscriptblock"
      },
      {
        "_type": "para",
        "title": "Register multiple templates in one call",
        "text": "You can register multiple <em>named templates</em> in one call to `$.templates()` as follows:",
        "anchor": "multiple"
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
        "text": "You can get the template object for a previously registered *named template* as follows:\n\n```js\nvar myTemplate = $.templates.myTemplateName; // or $.templates[\"myTemplateName\"]\n```",
        "anchor": "fromnamed"
      },
      {
        "_type": "para",
        "title": "Unregister a named template",
        "text": "To unregister a previously registered <em>named template</em>, pass `null` to `$.templates()`:\n\n```js\n$.templates(\"myTemplateName\", null);\n// Named template \"myTemplateName\" is no longer registered\n```",
        "anchor": "unregister"
      },
      {
        "_type": "para",
        "title": "Advanced scenarios: Associating private resources with templates",
        "text": "<em>$.templates()</em> can also be used for the following more advanced scenarios:\n\n- Compile a template, (or multiple templates) along with specified resources to be available only within that template\n- Compile one or more templates to be added to the set of private resources of another (already compiled) template\n\nYou can use `$.templates()` to compile or register not only a template, but in addition some <em>helpers</em>, <em>converters</em>, <em>custom tags</em> or nested <em>sub-templates</em>, to be made available to the new template as private resources.\n\nNote that as an alternative you can register resources (<em>helpers</em>, <em>converters</em>, <em>custom tags</em> or <em>templates</em>) globally, using <a href=\"#helpers\">`$.views.helpers()`</a>, <a href=\"#converters\">`$.views.converters()`</a>, <a href=\"#tags\">`$.views.tags()`</a>, or <a href=\"#d.templates@$.templates\">`$.templates()`</a> -- rather than making them private to the template that needs to reference them.",
        "anchor": "tmpl-resources"
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
        "text": "You can pass in an existing template as an additional `parentTemplate` parameter, on <em>any</em> call to  `$.templates(...)`. In that way the template you are registering becomes a 'private template resource' for the `parentTemplate`.\n\nHere is an example:",
        "anchor": "add-resources"
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
        "_type": "para",
        "title": "Debug a template by including a debugger; statement",
        "text": "As a technique for debugging compiled templates, you can temporarily set the template option `debug: true`:\n\n```js\n$.templates({\n  myTmpl: {\n    markup: \"...\",\n    debug: true // This option will add a debugger; statement to the compiled template\n  }\n});\n```\n\nThe result will be to include a `debugger;` statement at the beginning of the compiled template, which will behave as a breakpoint when debugging, and will facilitate understanding, or stepping through, the compiled template.\n",
        "anchor": "debug"
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
    "title": "Using custom tags",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "(See also *[Registering tags](#tagsapi): The `$.views.tags()` API*.)"
      },
      {
        "_type": "para",
        "title": "What is a custom tag?",
        "text": "JsRender custom tags are named tags `{{mytag ...}}`, which you can register, and then use in your templates.\n\nA tag renders itself as part of the template output. You determine how it renders, generally by specifying either a function as *render()* method or a template, when you declare your custom tag.\n\nThe *render()* method, or the *template*, can access both unnamed arguments (*args*) and named properties (*props*) and , [as in](#tagsyntax@tagparams):\n\n```jsr\n{{mytag arg0 arg1 namedProp1=xxx namedProp2=yyy}} ... {{/mytag}}\n```\n\nIn fact it can also access the current data item -- or even the whole hierarchy of views and data...\n\n*__Note:__* When you also use JsViews, custom tags acquire a whole new dimension. -- They become [*tag controls*](#jsvtagcontrols), and you can build rich and complex single page apps cleanly and simply using custom tag controls -- following an MVP or MVVM coding pattern. "
      },
      {
        "_type": "para",
        "title": "Registering a custom tag",
        "text": "To register a custom tag, you call [`$.views.tags(...)`](#tagsapi):\n```js\n$.views.tags(\"mytag\", tagOptions)\n```\n\nYou provide a `tagOptions` object, whose properties will typically include a `render: tagRenderFn` (function to be used as *render()* method) and/or a `template: tagTemplate` (template to be rendered -- markup string, selector string or template object).\n\nFor the simple case where the *only* option you need to specify is a *render()* method, you can provide the function directly:\n\n```js\n$.views.tags(\"mytag\", tagRenderFn);\n```\n\nOr if you *only* want to provide a template markup string, to show how it renders, you can again provide it directly:\n\n```js\n$.views.tags(\"mytag\", tagTemplate);\n```\n\nHere is an example of a simple custom tag using just a function:",
        "anchor": "register"
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
            "text": "```js\n// Render method for the tag\nfunction renderBoldP(value) {\n   return \"<p><b>\" + value + \"</b></p>\";\n}\n\n$.views.tags(\"boldp\", renderBoldP); // Provide just a render method\n```\n\nAlternatively we could have written:\n\n```js\n$.views.tags(\"boldp\", {\n  render: renderBoldP); // Provide just a render method\n});\n```\n"
          },
          {
            "_type": "template",
            "title": "Using the tag",
            "markup": "This is the title:{{boldp title /}}"
          }
        ],
        "title": "A custom tag using just a render() method",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  This is the title:{{boldp title /}}\n</script>",
        "code": "// Render method for the tag\nfunction renderBoldP(value) {\n   return \"<p><b>\" + value + \"</b></p>\";\n}\n\n$.views.tags(\"boldp\", renderBoldP); // Provide just a render method\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "70",
        "jsrJsvJqui": "jsr",
        "anchor": "render-sample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the equivalent sample using just a template:"
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
            "text": "```js\n// Template markup string for the tag\nvar tagTemplate = \"<p><b>{{:}}</b></p>\";\n\n$.views.tags(\"boldp\", tagTemplate); // Provide just a template markup string\n```\n\nAlternatively we could have written:\n\n```js\n$.views.tags(\"boldp\", {\n  template: tagTemplate; // Provide just a template markup string\n});\n```"
          },
          {
            "_type": "template",
            "title": "Using the tag",
            "markup": "This is the title:{{boldp title /}}"
          }
        ],
        "code": "// Template markup string for the tag\nvar tagTemplate = \"<p><b>{{:}}</b></p>\";\n\n$.views.tags(\"boldp\", tagTemplate); // Provide just a template markup string\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  This is the title:{{boldp title /}}\n</script>",
        "title": "A custom tag using just a template",
        "height": "70",
        "jsrJsvJqui": "jsr",
        "anchor": "template-sample"
      },
      {
        "_type": "para",
        "title": "Accessing unnamed arguments, named properties, data, etc. within the render() method",
        "text": "The `this` pointer within the tag *render()* method is the instance of the tag, and can be used to access properties, data, view hierarchy, and more. Most of the useful context is provided via `this.tagCtx`. (See [tagCtx object](#tagctxobject).)\n\nIn particular, unnamed arguments can be accessed via `tagCtx.args`, and named properties via `tagCtx.props`.\n\nHere is tag with two arguments and one named property:\n\n```jsr\n{{sometag title name mode=\"edit\"}}\n```\n\nFrom within the *render()* method of `sometag`, you can access `title` and `name` as `this.tagCtx.args[0]` and `this.tagCtx.args[1]`. And you can access mode as `this.tagCtx.props.mode`.\n\nIn addition to being accessible as `tagCtx.args`, unnamed arguments are also passed directly as arguments to the *render()* method (if your tag is using one):\n\n```js\nfunction sometagRenderMethod(title, name) {\n  // Here, this.tagCtx.args[1] and the name argument are the same thing\n}\n```\n",
        "anchor": "tagctx-from-render"
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
            "text": "```js\n// Render method for the tag\nfunction sometagRenderMethod(title, name) {\n  var parentData = this.tagCtx.view.data;\n\n  return\n      \"title: \" ... title ... // Get argument passed to render method\n    + \"parentData.title: \" ... this.tagCtx.view.data.title ... // Get title from parent context\n\n    + \"args[1]: \" ... this.tagCtx.args[1] ... // Get argument from args[]\n    + \"mode: \" ... this.tagCtx.props.mode; // Get named property from props\n}\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  {{sometag title name mode=\"edit\"/}}\n</script>",
        "code": "// Render method for the tag\nfunction sometagRenderMethod(title, name) {\n  var parentData = this.tagCtx.view.data;\n\n  return \"title: <em>\" + title + \"</em><br/>\" // Get argument passed to render method\n    + \"parentData.title: <em>\" + this.tagCtx.view.data.title + \"</em><br/>\" // Get title from parent context\n    + \"args[1]: <em>\" + this.tagCtx.args[1] + \"</em><br/>\" // Get argument from args[]\n    + \"mode: <em>\" + this.tagCtx.props.mode; + \"</em>\"// Get named property from props\n}\n\n$.views.tags(\"sometag\", sometagRenderMethod); // Provide just a render method\n\nvar team = {\n  title: \"theTitle\",\n  name: \"theName\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "90",
        "title": "Accessing context within the render() method",
        "action": "append",
        "header": "<style>em {color: #a31515}</style>",
        "anchor": "context-sample"
      },
      {
        "_type": "para",
        "title": "Accessing arguments, named properties, data, etc. from the tag template",
        "text": "Within the template, the tag instance can be accessed as `~tag`, and so unnamed arguments and named properties are obtained using `~tagCtx.args[...]` and `~tagCtx.props...`",
        "anchor": "tagctx-from-tmpl"
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
            "text": "```js\n// Template markup for the tag\nvar sometagTemplate =\n      \"title: {{:}}\" // The data context within the tag is the first argument, title\n    + \"title (#data): {{:#data}}\" // Equivalent unabbreviated syntax for current data\n    + \"parentData.title: {{:~tagCtx.view.data.title}}\" // Get title from parent context\n\n    + \"args[1]: {{:~tagCtx.args[1]}}\" // Get argument from args[]\n    + \"mode: {{:~tagCtx.props.mode}}\"; // Get named property from props\";\n```"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  {{sometag title name mode=\"edit\"/}}\n</script>",
        "code": "// Template markup for the tag\nvar sometagTemplate =\n      \"title: <em>{{:}}</em><br/>\" // The data context within the tag is the first argument, title\n    + \"title (#data): <em>{{:#data}}</em><br/>\" // Equivalent unabbreviated syntax for current data\n    + \"parentData.title: <em>{{:~tagCtx.view.data.title}}</em><br/><br/>\" // Get title from parent context\n    + \"args[1]: <em>{{:~tagCtx.args[1]}}</em><br/>\" // Get argument from args[]\n    + \"mode: <em>{{:~tagCtx.props.mode}}</em>\"; // Get named property from props\n\n$.views.tags(\"sometag\", sometagTemplate ); // Provide just a template markup string\n\nvar team = {\n  title: \"theTitle\",\n  name: \"theName\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "124",
        "header": "<style>em {color: #a31515}</style>",
        "action": "append",
        "title": "Accessing context from the tag template",
        "anchor": "tmplcontext-sample"
      },
      {
        "_type": "para",
        "title": "Accessing and rendering wrapped block content, in a custom tag",
        "text": "A common requirement is to define a custom tag to be used as a block tag, which renders itself by wrapping the rendered block content with other markup.\n\nFor example, a `boldp` tag which wraps its content as: `<b><p>...</p></b> `:\n\n```jsr\n{{boldp}}\n  This is inside our block content:<br/>\n  <em>{{:title}}</em>\n{{/boldp}}\n```\n\n**_Block content, using a render() method_**:\n\nIn a *render()* method, the block content can be included in the rendered output using:\n\n```js\n... this.tagCtx.render() ...\n```\n\n(For advanced scenarios the block content is also available as a compiled template object: `tagCtx.content`, so can be rendered using `tagCtx.content.render()`. See [template as fallback sample](#tags@tmpl-fallback) below) \n",
        "anchor": "wrapping"
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
            "text": "*Tag render method:*\n\n```js\nfunction renderBoldP(val) {\n  //To render the block content, we call this.tagCtx.render()\n  return \"<p><b>\" + this.tagCtx.render() + \"</b></p>\";\n}\n```\n\n*Using the tag:*\n\n```jsr\nThis is outside our block content: ...\n{{boldp}}\n  This is inside our block content: ...\n  <em>{{:title}}</em>\n{{/boldp}}\n```"
          }
        ],
        "title": "Rendering block content from a custom tag render() method",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  This is outside our block content:<br/>\n  {{boldp}}\n    This is inside our block content:<br/>\n    <em>{{:title}}</em>\n  {{/boldp}}\n</script>",
        "code": "function renderBoldP(val) {\n   return \"<p><b>\" + this.tagCtx.render() + \"</b></p>\";\n}\n\n$.views.tags(\"boldp\", renderBoldP); // User renderBoldP() as render method\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "90",
        "jsrJsvJqui": "jsr",
        "anchor": "renderblock-sample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "When using `tagCtx.render()` without arguments, the data context within the block content is the same as the  data context outside our custom tag. However by passing an argument to `tagCtx.render(myData)` the inner data context can be moved to the chosen data. \n\nThe following sample shows a custom `{{runningTotal}}` tag which renders an array of `lineItems` (with a column for each property), and provides a running total of one of the columns.\n\nIt uses a *render()* method to access tag arguments and named properties, and iterate over the `lineItems` array. It renders a row for each `lineItem`, using the code:\n\n```js\nret += this.tagCtx.render(lineItem, {total: totalVal});\n```\n\nHere, the row is rendered using the block content as template -- with the `lineItem` passed in as data context. The running total `totalVal` is provided as contextual helper: `~total`."
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
            "text": "You call the custom `{{runningTotal}}` tag like this:\n\n```jsr\n{{runningTotal lineItems totalColumn=\"quantity\"}}\n  ...{{:quantity}}\n  ...{{:~total}}\n{{/runningTotal}}\n```\n\nAnd the *render()* method code accesses context (`this.tagCtx`) to get at the arguments and named properties... :\n\n```js\n$.views.tags(\"runningTotal\", function renderLineItems(array) {\n  ...\n  totalVal = 0;                                             // Initialize ~total to 0 before rendering\n  totalCol = this.tagCtx.props.totalColumn;                 // The column/property to use for running total\n  for (var i = 0; i < array.length; i++) {\n    lineItem = array[i];\n    totalVal += lineItem[totalCol];                         // Compute running total\n    ret += this.tagCtx.render(lineItem, {total: totalVal}); // Add the row for this lineItem - using the block content as\n                                                            // template. Pass lineItem as data and totalVal as helper: ~total\n  }\n  ...\n```"
          }
        ],
        "html": "<div id=\"lineItems\"></div>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <table><tbody>\n    <tr><th>Quantity</th><th>Total quantity</th></tr>\n    {{runningTotal lineItems totalColumn=\"quantity\"}} \n      <tr>\n        <td>{{:quantity}}</td>\n        <td class=\"total\">{{:~total}}</td>\n      </tr>\n    {{/runningTotal}}\n  </tbody></table>\n</script>",
        "code": "function renderLineItems(array) {\n  var lineItem,\n    ret = \"\",\n    totalVal = 0,                             // Initialize ~total to 0 before rendering\n    totalCol = this.tagCtx.props.totalColumn; // The column/property to use for running total\n  for (var i = 0; i < array.length; i++) {    // Iterate over array and render a row for each lineItem \n    lineItem = array[i];\n    totalVal += lineItem[totalCol];           // Compute running total\n    ret += this.tagCtx.render(lineItem, {total: totalVal}); // Add the row for this lineItem - using the block content\n                                              // as template, and passing lineItem as current data and totalVal as helper: ~total\n  }\n  return ret;\n}\n\n$.views.tags(\"runningTotal\", renderLineItems);   // Use renderLineItems() as render method\n\nvar data = {\n  lineItems: [\n    {category: \"book\", quantity: 2, price: 3.40},\n    {category: \"grocery\", quantity: 5, price: 1.01},\n    {category: \"grocery\", quantity: 2, price: 13.10},\n    {category: \"book\", quantity: 1, price: 12.50}\n  ]\n};\nvar html = $(\"#myTmpl\").render(data);\n\n$(\"#lineItems\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "152",
        "title": "A {{runningTotal}} custom tag, using a render() method  ",
        "anchor": "runningtotal-sample",
        "header": "<style>.total {background-color: #f2f7f7;}</style>",
        "action": "append"
      },
      {
        "_type": "para",
        "title": "",
        "text": "**_Block content, using a template_**:\n\nTo render block content declaratively within a custom tag template, use:\n\n```jsr\n{{include tmpl=#content/}}\n```\n\nor equivalently:\n\n```jsr\n{{include tmpl=~tagCtx.content/}}\n```\n\nHere is a modified [`{{boldp}}`](#tags@renderblock-sample) sample using a custom template instead of a *render()* method."
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
            "text": "To render block content, we use `{{include tmpl=#content/}}`\n\n```js\ntemplate: \"<p><b>{{include tmpl=#content/}}</b></p>\"\n```\n\n(The syntax `#content` is an example of a `view path` -- equivalent to `#view.content`.)\n\nThe `content` property on the `view` object is a compiled template for the block content, which is also available as the `content` property on the `tagCtx`."
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  This is outside our block content:<br/>\n  {{boldp}}\n    This is inside our block content:<br/>\n    <em>{{:title}}</em>\n  {{/boldp}}\n</script>",
        "code": "$.views.tags(\"boldp\", {\n  template: \"<p><b>{{include tmpl=#content/}}</b></p>\"\n});\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "90",
        "title": "Rendering block content from a custom tag template",
        "jsrJsvJqui": "jsr",
        "anchor": "tmplblock-sample"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here, the default data context within the block content is the same as the data context outside our custom tag (as was the case in the [previous](#tags@renderblock-sample) `{{boldp}}` sample). However by providing an argument to the `{{include...}}`, as in `{{include myData tmpl=#content/}}`, the inner data context can be moved to the chosen data.\n\n(Note: To be precise, the default data in the two samples is different. When using `tagCtx.render()` the outer context is *outside our `{{boldp}}` tag*. Whereas when using `{{include}}`, it is *outside the `{{include}}` and within the `{{boldp}}` template*. If we provide an argument to the tag: '{{mytag someArgument}}...' then in custom tag template approach the passed-in argument value will be used as default data context.)\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For further details and examples of custom tags which wrap content, see [*Rendering wrapped block content*](#tagsapi@wrapping)"
      },
      {
        "_type": "para",
        "title": "Custom tags using both a render() method <b>and</b> a template",
        "text": "If there is both a *template* and a *render()* method, then the *template* will only be used if the *render()* method returns *undefined*.\n\nLet's take our `{{runningTotal}}` example using a *render()* method, but provide a *template* which will be used as \"fallback\" rendering for the tag in the case when there are no items to render in the chosen range. We will also provide support for limiting the range of line items by setting `start=... end=...`:",
        "anchor": "tmpl-fallback"
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
            "text": "First, in the *render()* method, we will change the original code to test whether the item exists in the array, before rendering the block content.\n\nSecondly, we will make sure that when there is an item we do render the block content and not the template. So we call `this.tagCtx.content.render(...)`, rather than `this.tagCtx.render(...)`.\n\nThat's because `this.tagCtx.render(...)` will actually look to see if there is template associated with the tag, (either a template on the tag definition, or a `tmpl` property on the tag) -- in which case it will render that template and not the block content... \n\n```js\nfor (var i=start; i<end; i++) {\n  ...\n  if (lineItem) { // If item exists\n    ...\n    // Render content for this lineItem, and provide running total as helper: ~total\n    ret += this.tagCtx.content.render(lineItem, {total: totalVal}); \n  }\n}\n```\n\nFinally, if there are no items to render, we will return `undefined`, so the tag will fall back on the template rendering.\n\n```js\nreturn ret || undefined;\n```\n\nAnd here is the \"fallback\" template:\n\n```js\ntemplate: \"<tr><td ...>No line items</td></tr>\"\n```"
          }
        ],
        "code": "$.views.tags(\"runningTotal\", {\n  render: function(array) {\n    var lineItem,\n      ret = \"\",\n      totalVal = 0,                    // Initialize ~total to 0 before rendering\n      props = this.tagCtx.props,\n      totalCol = props.totalColumn;    // The column/property to use for running total\n      start = props.start,\n      end = props.end;\n    for (var i=start; i<end; i++) {\n      // Render tag content, for this data item\n      lineItem = array[i];\n      if (lineItem) {                   // If item exists\n        totalVal += lineItem[totalCol]; // Compute running total\n        ret += this.tagCtx.content.render(lineItem, {total: totalVal}); // Render content for\n                                        // this lineItem, and provide running total as helper: ~total\n      }\n    }\n    return ret || undefined;            // If no line items, return undefined. (Render template as fallback)\n  },\n  template: \"<tr><td colspan='2'>No line items</td></tr>\" // Template for fallback if no line items\n});\n\nvar data = {\n  lineItems: [\n    {category: \"book\", quantity: 2, price: 3.40},\n    {category: \"grocery\", quantity: 5, price: 1.01},\n    {category: \"grocery\", quantity: 2, price: 13.10},\n    {category: \"book\", quantity: 1, price: 12.50}\n  ],\n  lineItems2: []\n};\n\nvar html = $(\"#myTmpl\").render(data, {\n  category: function(item, index, items) {\n    return item.category === this.props.category;\n  }\n});\n\n$(\"#purchases\").html(html);",
        "html": "<div id=\"purchases\"></div>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <em>start=1 end=4:</em>\n  <table><tbody>\n    <tr><th>Quantity</th><th>Total</th></tr>\n    {{runningTotal lineItems start=1 end=4 totalColumn=\"quantity\"}} \n      <tr>\n        <td>{{:quantity}}</td>\n        <td class=\"total\">{{:~total}}</td>\n      </tr>\n    {{/runningTotal}}\n  </tbody></table>\n\n  <em>start=4 end=5:</em>\n  <table><tbody>\n    <tr><th>Quantity</th><th>Total</th></tr>\n    {{runningTotal lineItems start=4 end=5 totalColumn=\"quantity\"}} \n      <tr>\n        <td>{{:quantity}}</td>\n        <td class=\"total\">{{:~total}}</td>\n      </tr>\n    {{/runningTotal}}\n  </tbody></table>\n</script>",
        "height": "244",
        "jsrJsvJqui": "jsr",
        "title": "A {{runningTotal}} custom tag, with render() method and a template as \"fallback\"",
        "anchor": "renderplustmpl-sample",
        "header": "<style>table {margin: 10px 0;} .total {background-color: #f2f7f7;}</style>",
        "action": "append",
        "url": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the above sample our feature for limiting the range of items by setting `start=... end=...` is basically identical to the corresponding feature available natively on the [`{{for}}`](#fortag@sortfilterrange) tag:\n\n```jsr\n{{for start=... end=...}}\n```\n\nIn fact we can add this feature to our `{{runningTotal}}` tag for free (along with providing sorting, filtering etc.) by making `{{runningTotal}}` derive from `{{for}}`, as `baseTag`. This will also simplify our code considerably. See [*Specifying tag inheritance*](#tagsapi@basetag) for details and an [updated](#tagsapi@derivedfor) `{{runningTotal}}` sample."
      },
      {
        "_type": "para",
        "title": "Custom tags and 'tag controls'",
        "text": "If you use JsViews, your custom tag can be developed into a fully functional <em>tag control</em>, with its own lifecycle, properties and methods, etc. It can be used as a <em>presenter</em> according to the MVP pattern."
      },
      {
        "_type": "para",
        "title": "For additional details and scenarios see:",
        "text": "[Registering tags](#tagsapi): The `$.views.tags()` API"
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
          },
          {
            "_type": "topic",
            "hash": "jsvtagcontrols",
            "label": "JsViews tag controls"
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
            "hash": "ctxobject",
            "label": "View context object (ctx)"
          },
          {
            "hash": "tagctxobject",
            "label": "Tag context object (tagCtx)"
          },
          {
            "hash": "globals",
            "label": "Globals"
          }
        ]
      }
    ]
  },
  "viewsobject": {
    "title": "The <em>$.views</em> object (JsRender)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The `$.views` object provides access to APIs for creating templates, tags, helpers etc.<br/><br/>\n\n\n- `$.views.templates(...)` -- available also as `$.templates(...)`\n<br/>Used for defining templates -- see: [Registering templates](#d.templates)\n- `$.views.tags(...)`\n<br/>Used for defining custom tags -- see: [Registering custom tags](#tagsapi)\n- `$.views.converters(...)`\n<br/>Used for defining converters -- see: [Registering converters](#convertersapi)\n- `$.views.helpers(...)`\n<br/>Used for defining helpers -- see: [Registering helpers](#helpersapi)\n- `$.views.viewModels(...)`\n<br/>Used for defining View Models -- see: [Compiled View Models](#viewmodelsapi)\n\nIt also provides access to:<br/><br/>\n- `$.views.settings`\n<br/>Used for modifying JsViews settings and options -- see: [Settings](#jsvsettings)\n- `$.views.map(...)`\n<br/>Used for defining custom maps (advanced) \n- `$.views.jsviews`\n<br/>Provides the version number of the currently loaded JsViews or JsRender library\n\n"
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
    "title": "The <em>template</em> object (JsRender)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The [`$.templates()`](#d.templates) API can be used to obtain a compiled template object:\n\n```js\nvar myTmpl = $.templates(\"<label>Name:</label> {{:name}}\");\n```\n\nThe compiled template object (`myTmpl`, in the example) provides a number of properties and methods, in particular:\n"
      },
      {
        "_type": "para",
        "title": "The render() method",
        "text": "```js\nvar html = myTmpl.render(person);\n```\n\nSee [Render a template against data objects or arrays](#tmplrender)",
        "anchor": "render"
      },
      {
        "_type": "para",
        "title": "The markup property",
        "text": "The declarative markup string for the template (available whether the template was registered by providing a markup string, or by a script block reference).\n\n```js\nvar test = myTmpl.markup; // \"<label>Name:</label> {{:name}}\"\n```",
        "anchor": "markup"
      },
      {
        "_type": "para",
        "title": "The compiled template object is actually a render() function",
        "text": "The compiled template *is itself a function*, corresponding to its own render method, so the following two examples are actually equivalent.\n\n*Calling the render method:*\n\n```js\nvar html = myTmpl.render(person);\n```\n\n*Invoking the compiled template directly as render method:*\n\n```js\nvar html = myTmpl(person);\n```",
        "anchor": "tmpl-function"
      },
      {
        "_type": "para",
        "title": "Additional properties on the <b>template object</b>",
        "text": "In addition, the following template object properties are available for accessing any [private resources](#d.templates@tmpl-resources) associated with the template:\n\n- ***myTmpl.helpers:***\n  - access to any private helper resources: `myTmpl.helpers.someHelper`\n- ***myTmpl.converters:***\n  - access to any private converter resources: `myTmpl.converters.someConverter`\n- ***myTmpl.tags:***\n  - access to any private tag resources: `myTmpl.converters.someTag`\n- ***myTmpl.template:***\n  - access to any private template resources: `myTmpl.template.someTemplate`\n",
        "anchor": "propsmethods"
      }
    ]
  },
  "viewobject": {
    "title": "The <em>view</em> object (JsRender)",
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
        "text": "- [type property](#viewobject@type)\n- [data property](#viewobject@data)\n- [parent property](#viewobject@parent)\n- [index property](#viewobject@index)\n- [getIndex() method](#viewobject@getindex)\n- [get(type) method](#viewobject@get)\n- [content property](#viewobject@content)\n- [root property](#viewobject@root)\n- [ctxPrm() 'get' method](#viewobject@ctxprm)\n- [other properties and methods (tmpl, views, ctx, tag, getRsc()](#viewobject@other)\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "***Note:** When using JsViews [`.link()`](#jsvlinktmpl) method rather than JsRender's [`.render()`](#rendertmpl) method, the `view` objects have additional methods:*\n- *[refresh()](#jsvviewobject@refresh)*\n- *[contents()](#jsvviewobject@contents)*\n- *[childTags()](#jsvviewobject@childtags)*\n- *[nodes()](#jsvviewobject@nodes)*\n\n*See [JsViews `view` object](#jsvviewobject).*"
      },
      {
        "_type": "para",
        "title": "Accessing view objects",
        "text": "The properties of the current view are accessed *declaratively* in a template using *[view paths](#paths)* -- such as `#parent` for the `view.parent` property.\n\nAccessing `view` objects *programmatically* is less common in JsRender, but can be useful for example:\n\n- in a helper function, `~myHelper()`, where the `this` pointer is the current view\n- in the render() method of a custom tag -- using `this.tagCtx.view`\n\n*Note:* In JsViews, accessing `view` objects programmatically is very common, thanks to the [`$.view()`](#jsv.d.view) method. For example in a click handler, `$.view(this);` returns the corresponding `view` object.<br/><br/>\n\n### Properties and methods:",
        "anchor": "access"
      },
      {
        "_type": "para",
        "title": "The type property:",
        "text": "***view.type**: string corresponding to the type of view:*\n\n- `\"data\"` -- for the top-level view from a `render()` call\n- `\"array\"` or `\"item\"` -- from `{{for array}}` or `{{props object}}` (see *[array and item views](#views@itemview)*)\n-  `\"sometag\"` -- for the view from `{{sometag}}...{{sometag}}` -- for example: `\"include\"`, `\"if\"`, `\"for\"`, `\"props\"`, `\"mytag\"`...\n",
        "anchor": "type"
      },
      {
        "_type": "para",
        "title": "The data property:",
        "text": "***view.data**: the current data context for the view* -- as in:\n\n```js\nvar team = view.data.team; // The team property of the current data object\n```\n\n`view.data` can be accessed declaratively in templates as `#data`-- as in:\n\n```jsr\n{{:#data}}\n{{>#data.description()}}\n{{for #data.team.members}}...\n```\n\nBut note that since `#data`, the current data context, is the starting point for *[data paths](#paths)* within templates, the above expressions with `#data` can be abbreviated to:\n\n```jsr\n{{:}}\n{{>description()}}\n{{for team.members}} etc.\n```",
        "anchor": "data"
      },
      {
        "_type": "para",
        "title": "The parent property:",
        "text": "***view.parent**: the parent view* (used to step up through views in the hierarchy).\n\n```js\nvar index = view.parent.index; // The index of the parent view\n```\n\nAccessed declaratively as `#parent`:\n\n```jsr\n{{>#parent.data.title()}}...  {{!-- accessing data of parent view - view.parent --}}\n{{if #parent.parent.parent.data.teams.length > 1}}... {{!-- accessing data of view.parent.parent... --}}\n```\n\n(See also *[Accessing parent data](#parentdata)*)",
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
        "anchor": "getindex"
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
        "height": "80"
      },
      {
        "_type": "para",
        "title": "The get(type) method:",
        "text": "***view.get(type)**: returns the nearest parent view of type `type`.*\n\n```js\nvar arrayView = view.get(\"array\"); // Step through parents to nearest \"array\" view\nvar arrayLength = arrayView.data.length; // Get length of data array\n```\n\nAccessed declaratively as `#get(...)`:\n\n```jsr\n{{for members}}\n  {{if #index+1 === #get(\"array\").data.length}}\n    The last member in the list\n  {{/if}}\n{{/for}}\n```\n\n**Note:** An additional signature is available: ***view.get(true, type)*** (for advanced scenarios) -- which steps *down* through descendant views (depth first traversal) and returns *the first descendant view of type `type`*.\n\n```jsr\n{{for members}}\n  {{:name}}\n{{/for}}\n{{:#get(true, \"item\").data.name}} {{!-- get the name of the first member --}}\n```\n\nIn using this API it is sometimes necessary to be aware of the processing order. For example in the sample code above, placing `{{:#get(true, \"item\")...}}` before `{{for members}}` will not return any \"item\" view, since the `{{:get(...)...}}` is being evaluated during the rendering, and the \"item\" views for `{{for ...}}` will not yet have been rendered. (View instantiation is part of rendering, which is a single-pass process.) \n\n*Note:* `view.get(\"root\")` returns [`view.root`](#viewobject@root), `view.get()` returns [`view.parent`](#viewobject@parent) and `view.get(true)` returns [`view.views[0]`](#viewobject@other).",
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
        "height": "170"
      },
      {
        "_type": "para",
        "title": "The root property:",
        "text": "***view.root**: the root view (top-level ancestor view for this view)* -- as in:\n\n```js\nvar topLevelData = view.root.data; // Get the top-level data (obtained from the root view)\n```",
        "anchor": "root"
      },
      {
        "_type": "para",
        "title": "The ctxPrm() 'get' method",
        "text": "***view.ctxPrm(name)***: returns the value of the named contextual parameter or helper (at the context of the view).\n\n```js\nvar value = view.ctxPrm(\"color\");\n// Get value of contextual parameter (or helper) \"color\"\n```\n\nAvailable also as [`tag.ctxPrm()`](#tagobject@ctxprm).\n\nSee *[Accessing contextual parameters and helpers](#tagsapi@ctxparams)*.\n\n(*Note:* in JsRender, the `ctxPrm()` method is used only for *getting* the value, whereas in JsViews, [`ctxPrm()`](#jsvviewobject@ctxprm) can also be used for *setting* the value.)",
        "anchor": "ctxprm"
      },
      {
        "_type": "para",
        "title": "Other view object properties and methods:",
        "text": "The following additional properties of the `view` object are used by JsRender for processing templates:\n\n- *tmpl*: the template used to render the view\n- *views*: the child views in the view hierarchy\n- *ctx*: object (hash) with the named contextual helpers/template parameters for this view\n- *tag*: the `\"sometag\"` view rendered by a tag `{{sometag ...}}`, has a `view.tag` property -- the instance of the `sometag` tag object\n- *getRsc(namedCollection, itemName)*: returns a named resource (*converter* function, compiled *template* object, compiled *tag*, *helper* or *viewModel*), as available contextually in the scope of the view (i.e. global, or local as a template resource from one of the parent templates)<br/><br/>The `namedCollection` parameter can be `\"templates\"`, `\"converters\"`, `\"tags\"`, `\"helpers\"` or  `\"viewModels\"`). For example:\n  ```js\n  var upperCvtFunction = view.getRsc(\"converters\", \"upper\");\n  ```",
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
    "title": "The <em>tag</em> object (JsRender)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "<b>Tag object</b> properties and event handlers provided as tag options",
        "text": "The following tag properties and event handlers can be specified as tag options in the [`$.views.tags()`](#tagsapi) call, when registering a custom tag:\n\n*Tag properties*\n\n- [`baseTag`](#tagsapi@basetag)\n- [`flow`](#tagsapi@flow)\n- [`template`](#tagsapi@template)\n- [`bindTo`](#tagsapi@bindto)\n- [`ctx`](#tagobject@ctx)\n- [`contentCtx`](#tagsapi@contentctx)\n- [`argDefault`](#tagsapi@argdefault)\n\n*Event handlers*:\n\n- [`init()`](#tagsapi@init)\n- [`render()`](#tagsapi@render)\n- [`convert()`](#tagsapi@convert)"
      },
      {
        "_type": "para",
        "title": "Additional properties and methods on the <b>tag object</b>",
        "text": "In addition to the above properties and handlers set as tag options, the tag object has the following properties and methods:\n\n*Tag properties*\n\n- [parent](#tagobject@parent)\n- [parents](#tagobject@parents)\n- [tagCtx](#tagobject@tagctx)\n- [tagCtxs](#tagobject@tagctxs)\n- [tagName](#tagobject@tagname)\n- [rendering](#tagobject@rendering)\n\n*Tag methods*\n\n- [ctxPrm()](#tagobject@ctxprm)\n- [cvtArgs()](#tagobject@cvtargs)\n- [bndArgs()](#tagobject@bndargs)\n- [base()](#tagobject@base)\n- [baseApply()](#tagobject@baseapply)",
        "anchor": "propsmethods"
      },
      {
        "_type": "para",
        "title": "",
        "text": "***Note:** When using JsViews [`.link()`](#jsvlinktmpl) method rather than JsRender's [`.render()`](#rendertmpl) method, the `tag` object has many additional properties, methods and events. See [JsViews `tag` object](#jsvtagobject).*"
      },
      {
        "_type": "para",
        "title": "Accessing tag objects",
        "text": "The `tag` object can be accessed *programmatically*, for example in event handlers of custom tags, using the `this` pointer.\n\nThe current tag can also be accessed *declaratively* (in a custom tag template,  or in wrapped block content) using `~tag`, as in:\n\n```jsr\n{{:~tag.parent.tagName}}`\n```\n\nIn addition, `tag.tagCtx` can be accessed declaratively using `~tagCtx`, as in:\n\n```jsr\n{{:~tagCtx.props.mode}}`\n```",
        "anchor": "access"
      },
      {
        "_type": "para",
        "title": "<b>Tag properties</b>",
        "text": " ",
        "anchor": "properties"
      },
      {
        "_type": "para",
        "title": "The parent property",
        "text": "***tag.parent**: the parent custom tag* (nearest ancestor custom tag) in the hierarchy of custom tags.\n\n```js\nvar outerTag = innerTag.parent;\n```\n\nAccessed declaratively as `~tag.parent`.\n\nSee *[Custom tag hierarchy -- Accessing parent tags](#tagsapi@parents)*",
        "anchor": "parent"
      },
      {
        "_type": "para",
        "title": "The parents property",
        "text": "***tag.parents**: a hash of all the ancestor custom tags.*\n\nFor example if `outerTag` is a `{{layout}}` tag:\n\n```js\nvar outerTag = innerTag.parents.layout;\n```\n\nAccessed declaratively as `~parentTags`.\n\nSee *[Custom tag hierarchy -- Accessing parent tags](#tagsapi@parents)*",
        "anchor": "parents"
      },
      {
        "_type": "para",
        "title": "The tagCtx property",
        "text": "***tag.tagCtx**: a [tag context](#tagctxobject) object* providing access to instance information such as arguments/properties/view etc., as in:\n\n```js\n  var propA = tag.tagCtx.props.propA;\n```\n\nAccessed declaratively (in a tag template or wrapped content) as `~tagCtx`.\n\nSee [*Tag Context*](#tagsapi@context)",
        "anchor": "tagctx"
      },
      {
        "_type": "para",
        "title": "The tagCtxs property",
        "text": "***tag.tagCtxs**: an array of [tag context](#tagctxobject) objects, -- one for each {{else}} block*.\n\nThe first item in `tag.tagCtxs` is the `tag.tagCtx` object.\n\nIf the tag has `{{else}}` blocks, there will be an additional `TagCtx` object for each `{{else}}` block.\n\nAccessed declaratively as `~tag.tagCtxs`.\n\nSee [*Tag context objects for {{else}} blocks*](#tagsapi@tagctxs)",
        "anchor": "tagctxs"
      },
      {
        "_type": "para",
        "title": "The ctx property",
        "text": "***tag.ctx**: a [view context](#ctxobject) object (hash) providing access to the [contextual parameters](#contextualparams)*.\n\nAccessed declaratively as `~tag.ctx`.\n\nSee also:\n- [`tag.ctxPrm()`](#tagobject@ctxprm), below\n- The [`ctx` tag option](#tagsapi@ctx) (for specifying default context on a custom tag)",
        "anchor": "ctx"
      },
      {
        "_type": "para",
        "title": "The tagName property",
        "text": "***tag.tagName**: the name of the tag*.\n\n(e.g. `\"mytag\"` for the `{{mytag}}` custom tag.)",
        "anchor": "tagname"
      },
      {
        "_type": "para",
        "title": "The rendering property",
        "text": "***tag.rendering**: an object (hash) that is only present during rendering*.\n\nIt can be used to test whether the tag is currently rendering. It is also available as a means of passing parameters (application state) from one context to another, during rendering.",
        "anchor": "rendering"
      },
      {
        "_type": "para",
        "title": "<b>Tag methods</b>",
        "text": " ",
        "anchor": "methods"
      },
      {
        "_type": "para",
        "title": "The ctxPrm() 'get' method",
        "text": "***tag.ctxPrm(name)***: returns the value of the named contextual parameter or helper (at the context of the tag instance).\n\n```js\nvar value = tag.ctxPrm(\"color\");\n// Get value of contextual parameter (or helper) \"color\"\n```\n\nAvailable also as [`view.ctxPrm()`](#viewobject@ctxprm).\n\nSee *[Accessing contextual parameters and helpers](#tagsapi@ctxparams)*.\n\n(*Note:* in JsRender, the `ctxPrm()` method is used only for *getting* the value, whereas in JsViews, [`ctxPrm()`](#jsvtagobject@ctxprm) can also be used for *setting* the value.)",
        "anchor": "ctxprm"
      },
      {
        "_type": "para",
        "title": "The cvtArgs() method",
        "text": "***tag.cvtArgs()***: returns an array `[arg1, arg2, ...]`, corresponding to the values of the arguments passed in the tag markup.\n\n```jsr\n{{myTag lastName age 'edit'/}}\n```\n\n```js\nvar args = tag.cvtArgs(); // [\"Jones\", 55, \"edit\"]\n```\n\nIf the tag uses a converter, then `cvtArgs(...)` will return the arguments *after* conversion.\n\nIf the tag uses multiple `{{else}}` blocks, then passing the `elseBlock` index as parameter to `cvtArgs(elseBlock)` returns the arguments for that `{{else}}` block.",
        "anchor": "cvtargs"
      },
      {
        "_type": "para",
        "title": "The bndArgs() method",
        "text": "If a tag uses a [`bindFrom/bindTo`](#tagsapi@bindto) setting, then ***tag.bndArgs()***: returns an array `[argOrProp1, argOrProp2, ...]`, corresponding to the values of the arguments/properties specified in the `bindFrom/bindTo` option.\n\nIf there is no `bindFrom/bindTo` setting, then `tag.bndArgs()` is equivalent to `tag.cvtArgs()`\n\n```jsr\n{{myTag lastName age mode='edit'/}}\n```\n\n```js\n$.views.tags(\"myTag\", {\n  bindFrom: [\"mode\", 1, 0],\n  init: function() {\n    var args = tag.bndArgs(); // [\"edit\", 55, \"Jones\"]\n  }\n)\n```\n\nIf the tag uses a converter, then arguments/properties returned by `bndArgs(...)` will be *after* conversion.\n\nIf the tag uses multiple `{{else}}` blocks, then passing the `elseBlock` index as parameter to `bndArgs(elseBlock)` returns the arguments/properties for that `{{else}}` block.\n\nSee also [*Specifying bound arguments and properties: the `bindTo` and `bindFrom` options*](#tagsapi@bindto)",
        "anchor": "bndargs"
      },
      {
        "_type": "para",
        "title": "The base() method",
        "text": "***tag.base()***: Used in a derived tag, when overriding a method/handler, to call the corresponding *base* method.\n\nAllows passing specific arguments.\n\n```js\nthis.base(a, b, ...); // Pass chosen arguments\n```\n\nSee [`baseTag`](#tagsapi@basetag)",
        "anchor": "base"
      },
      {
        "_type": "para",
        "title": "The baseApply() method",
        "text": "***tag.baseApply()***: Used in a derived tag, when overriding a method/handler, to call the corresponding *base* method.\n\nAllows passing on the `arguments` array (or some other chosen array of arguments).\n\n```js\nthis.baseApply(arguments); // Pass arguments array\n```\n\nExample:\n\n```\n$.views.tags(\"mytag2\", {\n  baseTag: \"mytag\",\n  render: function() { // Override the render() method\n    var ret = this.baseApply(arguments);  // Call the base method\n    ... // Modify return string...\n    return ret;\n  }\n});\n```\n\nSee [*Specifying tag inheritance: the `baseTag` option*](#tagsapi@basetag)",
        "anchor": "baseapply"
      }
    ]
  },
  "ctxobject": {
    "title": "The <em>view context</em> object, <em>ctx</em> (JsRender)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Each view has a view context object: ***view.ctx***, which is a 'hash' whose properties correspond to the set of [contextual parameters](#contextualparams), `~foo` accessible from that view, within a template. (See [*Accessing contextual parameters and helpers*](#tagsapi@ctxparams).)\n\nIt also has the following built-in properties (contextual parameters):\n\n- `ctx.root`: The [root data](#contextualparams@root) (accessed from a template as `~root`)\n- `ctx.tag`: The [tag object](#tagobject) (accessed from a template as `~tag`)\n- `ctx.tagCtx`: The [tagCtx object](#tagobject@tagctx) (accessed from a template as `~tagCtx`)\n- `ctx.parentTags`: [parent tags](tagsapi@parents) (accessed from a template as `~parentTags`)\n\nFor programmatic access to contextual parameters, it may be better to use the [view.ctxPrm()](#viewobject@ctxprm) or [tag.ctxPrm()](#tagobject@ctxprm) API."
      }
    ]
  },
  "tagctxobject": {
    "title": "The <em>tag context</em> object, <em>tagCtx</em> (JsRender)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "When a template is rendered, each tag is instantiated.\n\n```jsr\n{{sometag argExpr prop1=propExpr ~ctxprm1=prmExpr .../}}\n```\n\nThe tag instance has an associated tag context object, `tag.tagCtx`, giving contextual information for the tag.\n\nSee [*Tag context*](#tagsapi@context)\n\nIn the case of a tag with `{{else}}` blocks it has an array of `tagCtx` objects, `tag.tagCtxs`, one for each `{{else}}` block):\n\n```jsr\n{{sometag argExpr prop1=propExpr ~ctxprm1=prmExpr ...}}\n  ...\n{{else argExpr2 prop2=propExpr2 ~ctxprm2=prmExpr2 ...}}\n  ...\n{{/sometag}}\n```"
      },
      {
        "_type": "para",
        "title": "<b>tagCtx properties</b>",
        "text": "- ***tagCtx.props:***\n  - a hash of the values of the named properties (such as `tagCtx.props.prop1`)\n- ***tagCtx.args:***\n  - an array with argument value (such as `tagCtx.args[0]`)\n- ***tagCtx.params:***\n  - provides access to argument, property and contextual parameter expressions (such as `tagCtx.params.props.prop1`, `tagCtx.params.args[0]` or `tagCtx.params.ctx.ctxprm1`)\n- ***tagCtx.content:***\n  - for a block tag (see [wrapping block content](#tagsapi@wrapping)), the compiled template for wrapped content\n  - otherwise, for a tag with an [external template reference](#tagsyntax@tmplref), `tmpl=...`, the compiled external template (same as `tagCtx.tmpl`)\n  - otherwise, `false`\n- ***tagCtx.tmpl:***\n  - for a tag with an external template, `tmpl=...`, the compiled external template\n  - otherwise, for a block tag, the template for wrapped content (same as `tagCtx.content`)\n  - otherwise, `false`\n- ***tagCtx.index:***\n  - for `{{else}}` blocks, the index of the block (see [`tag.tagCtxs`](#tagobject@tagctxs))\n  - otherwise, `0`\n- ***tagCtx.tag:***\n  - the tag instance\n- ***tagCtx.view:***\n  - the contextual (containing) view object\n- ***tagCtx.ctx:***\n  - the [ctx](#ctxobject) (view context) object with the contextual helpers/template parameters for this tag.",
        "anchor": "properties"
      },
      {
        "_type": "para",
        "title": "<b>tagCtx methods</b>",
        "text": "- ***tagCtx.render(data, context, noIteration):***\n  - if there is a tag template, renders the template\n  - otherwise for a template with an [external template reference](#tagsyntax@tmplref), `tmpl=...`, renders the external template\n  - otherwise, for a block tag, renders the wrapped content\n  - otherwise, returns `\"\"`\n  - *Note:* as an alternative, to render wrapped content even if there is a tag template, or an external template (`tmpl-=...`), use<br/>***tagCtx.content.render(data, context, noIteration)***. (See [sample](#tags@renderplustmpl-sample))\n- ***tagCtx.ctxPrm(name):***\n  - equivalent to [`tag.ctxPrm(name)`](#tagobject@ctxprm)\n  - however, for a tag with `{{else}}` blocks such as:\n    ```jsr\n      {{mytag}}...{{else ~myparam=...}}...{{/mytag}}\n    ```\n    the context is the specific `{{else}}` block -- e.g. accessing `tag.tagCtxs[1].ctxPrm(\"myparam\")` for the example above\n- ***tagCtx.cvtArgs():***\n  - equivalent to [`tag.cvtArgs()`](#tagobject@cvtargs)\n  - however, for a tag with `{{else}}` blocks) the context is the specific `{{else}}` block<br/>\n  -- i.e. equivalent to `tag.cvtArgs(tagCtx.index)`\n- ***tagCtx.bndArgs():***\n  - equivalent to [`tag.bndArgs()`](#tagobject@bndargs)\n  - however, for a tag with `{{else}}` blocks) the context is the specific `{{else}}` block<br/>\n  -- i.e. equivalent to `tag.bndArgs(tagCtx.index)`",
        "anchor": "methods"
      },
      {
        "_type": "para",
        "title": "",
        "text": "*Note:* When using JsViews data-linking, the tagCtx object has additional [properties](#jsvtagctxobject@properties) and [methods](#jsvtagctxobject@methods). See JsViews [`tagCtx`](#jsvtagctxobject) object.\n"
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
        "text": "## Browserify support for JsRender and JsViews\n\n[Browserify](http://browserify.org/) lets you create modular JavaScript projects for the browser, using the npm `require()` pattern for packages/modules.\n"
      },
      {
        "_type": "para",
        "title": "JsRender as a Browserify module",
        "text": "After installing JsRender on the server (using `$ npm install jsrender`) it can then be included in the Browserify client script bundle, and loaded in the browser.\n\nThere are three options for loading JsRender in the browser as a Browserify module:\n\n- Load jQuery globally (as a script tag -- so `window.jQuery` is defined), then load JsRender as a module in the Browserify client script bundle:\n  ```js\n  require('jsrender'); // Load JsRender as jQuery plugin (attached to global jQuery)\n  ```\n- Load both jQuery and JsRender as modules in the Browserify client script bundle:\n  ```js\n  var $ = require('jquery'); // Load jQuery as a module\n  require('jsrender')($);    // Load JsRender as jQuery plugin (jQuery instance as parameter)\n  ```\n- Load JsRender as a module in the Browserify client script bundle, without loading jQuery at all:\n  ```js\n  var jsrender = require('jsrender')(); // Load JsRender without jQuery (function call, no parameter)\n  ```\n\n***Note:*** In fact if jQuery is not defined globally, `require('jsrender')` returns a ***function***. \n\nCalling that function without a parameter then loads JsRender without jQuery (and returns the JsRender namespace). \n\nAlternatively, calling that function with a reference to a jQuery instance as parameter loads JsRender as a plugin (attached to that jQuery instance) -- and returns the jQuery instance.\n",
        "anchor": "jsrender"
      },
      {
        "_type": "para",
        "title": "Example &ndash; jQuery loaded globally:",
        "text": "**index.html:**\n\n```jsr\n<html><head>\n  <script src=\".../jquery-xxx.js\"></script> <!-- Load jQuery as global -->\n</head><body>\n  <div id=\"container\"></div>\n  <script src=\"bundle.js\"></script>\n</body></html>\n```\n\n**source.js:**\n\n```js\nrequire('jsrender'); // Load JsRender (jQuery is loaded as global)\nvar tmpl = $.templates('Name: {{:name}}');\nvar data = {name: 'Jo'};\nvar html = tmpl.render(data);\n$('#container').html(html);\n```\n\n**command line:**\n\n```bash\nbrowserify ./source.js > ./bundle.js\n```",
        "anchor": "jquery-global"
      },
      {
        "_type": "para",
        "title": "Example &ndash; jQuery loaded as module:",
        "text": "**index.html:**\n\n```jsr\n<html><body>\n  <div id=\"container\"></div>\n  <script src=\"bundle.js\"></script>\n</body></html>\n```\n\n**source.js:**\n\n```js\nvar $ = require('jquery'); // Load jQuery as a module\nrequire('jsrender')($);    // Load JsRender as jQuery plugin (jQuery instance as parameter)\nvar tmpl = $.templates('Name: {{:name}}');\nvar data = {name: 'Jo'};\nvar html = tmpl.render(data);\n$('#container').html(html);\n```\n\n**command line:**\n\n```bash\nbrowserify ./source.js > ./bundle.js\n```",
        "anchor": "jquery-module"
      },
      {
        "_type": "para",
        "title": "Example &ndash; JsRender without jQuery:",
        "text": "**index.html:**\n\n```jsr\n<html><body>\n  <div id=\"container\"></div>\n  <script src=\"bundle.js\"></script>\n</body></html>\n```\n\n**source.js:**\n\n```js\nvar jsrender = require('jsrender')(); // Load JsRender without jQuery\nvar tmpl = jsrender.templates('Name: {{:name}}');\nvar data = {name: 'Jo'};\nvar html = tmpl.render(data);\ndocument.querySelector('#container').innerHTML = html;\n```\n\n**command line:**\n\n```bash\nbrowserify ./source.js > ./bundle.js\n```",
        "anchor": "no-jquery"
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
        "text": "JsRender includes a Browserify transform: `jsrender/tmplify` (see [below](#node/browserify@clientbundle)) which allows you also to include your server [file-based templates](#node/filetmpls) in the client-script bundle generated by Browserify. \n\nYou can then access the compiled templates in the browser, as modules.\n\nThe exact syntax depends on whether jQuery is loaded globally, loaded as a Browserify module, or not loaded at all.\n\n- If jQuery is loaded globally then use:\n  ```js\n  var tmpl = require('./templates/myTemplate.html');           // Load template (jQuery \n                                                               // is loaded globally)\n  var html = tmpl.render(myData);\n  ...\n  ```\n- If jQuery is loaded as a module, use:\n  ```js\n  var $ = require('jquery');\n  ...\n  var tmpl = require('./templates/myTemplate.html')($);        // Load template (local\n                                                               // jQuery as parameter)\n  var html = tmpl.render(myData);\n  ...\n  ```\n- If loading JsRender as a module, without jQuery, use:\n  ```js\n  var jsrender = require('jsrender')(); // function call -- no parameter\n  ...\n  var tmpl = require('./templates/myTemplate.html')(jsrender); // Load template (jsrender\n                                                               // namespace as parameter)\n  var html = tmpl.render(myData);\n  ...\n  ```\n\n**Note on relative paths:** The `./...` paths used to identify bundled templates are always interpreted as relative paths *relative to the location of your calling script*, which in this case is the Browserify script that created the client bundle. (Note that declaring a *templates* folder for Express or Hapi does not change the origin of these relative paths).",
        "anchor": "tmplify"
      },
      {
        "_type": "para",
        "title": "Nested templates",
        "text": "Template inclusion in the bundle can be recursive, so for example if you call `require(\"./templates/myTemplate.html\");` and *myTemplate.html* includes a nested reference to another template, such as `{{include tmpl=\"./another/tmpl2.html\"/}}`, then the client-script bundle will include that template too.\n",
        "anchor": "nested"
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
        "text": "The `jsrender/tmplify` Browserify transform uses a white-space-separated list of extensions: `\"html jsrender jsr\"`, by default. This means that when you generate a client-script bundle using the `tmplify` transform, it will treat any `.html`, `.jsrender` or `.jsr` file as a template, and will include the compiled template in the client-script bundle for rendering in the browser. \n\nYou can instead specify a different list of file extensions for templates, by using the `--extensions` or `-e` option, as in the following examples:\n\n```bash \nbrowserify -t [jsrender/tmplify --extensions 'htm jsrender'] ./source.js > ./bundle.js\n```\n\n```bash \nbrowserify -t [jsrender/tmplify -e 'htm jsrender'] ./source.js > ./bundle.js\n```\n\n```bash \n\"browserify\": {\n  \"transform\": [\n    [\"jsrender/tmplify\", {\n      \"extensions\": \"htm jsrender\"\n    }]\n  ]\n}\n```\n\n```bash \nbrowserify('./source.js')\n  .transform(require('jsrender/tmplify'), {extensions: 'htm jsrender'})\n  .bundle()\n  .pipe(fs.createWriteStream('./bundle.js'));\n```",
        "anchor": "extensions"
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
        "text": "On Node.js, JsRender templates can be stored directly in the file system  (e.g. as `.html`, `.jsr.` or `.jsrender` files) -- for example:\n\n**Template:** *./templates/myTemplate.html* -- with contents:\n\n```jsr\nName - {{:name}}<br/>\n```\n\n**Code:** On Node.js, the `templates()` method recognizes file paths starting with `\"./\"` (for relative file paths), or starting with `'/'` (for absolute file paths),\n\nso you can write:\n\n```js\nvar jsrender = require('jsrender');\n\nvar tmpl = jsrender.templates('./templates/myTemplate.html'); // Compile the template\n\nvar html = tmpl({name: \"Jim\"}); // Render\n// result: Name - Jim<br/>\n```\n\n**Note:** The relative paths `./...` are interpreted as *relative to the location of your calling script*. Declaring a *templates* folder for Express or Hapi does not change the origin of these relative paths.\n\nSee also the `renderFile()` below, which also accepts absolute file paths using the syntax `C:\\\\file\\\\path\\\\myTemplate.html`, in addition to relative (`\"./...\"`) paths and absolute (`\"/...\"`) paths.",
        "anchor": "htmlfile"
      },
      {
        "_type": "para",
        "title": "renderFile() method",
        "text": "JsRender on Node.js provides a shortcut `renderFile()` method, for convenience, to compile and render in one step:\n\n```js\nvar jsrender = require('jsrender');\n\nvar html = jsrender.renderFile('./templates/myTemplate.html', {name: \"Jim\"});\n// result: Name - Jim<br/>\n```\n\nUnlike the `templates()` method above, the `renderFile()` method accepts not only relative paths `\"./...\"` and absolute paths `\"/...\"`, but also absolute file paths of the form `\"C:\\\\file\\\\path\\\\myTemplate.html\"`\n\nFor example, the following loads and renders the template':\n\n```js\nvar html = jsrender.renderFile(process.cwd() + '\\\\templates\\\\myTemplate.html', {name: \"Jim\"});\n```\n\n\n",
        "anchor": "renderfile"
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
                "description": "Relative path to template file - starting with <b><code>'./...'</code></b>, or <b><code>'/...'</code></b>, or <b><code>'C:\\\\...'</code></b>"
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
        "title": "Passing helpers or context to renderFile() ",
        "text": "Just as with the [`render()`](#tmplrender@helpers) method, you can call pass a `helpersOrContext` object as an additional parameter in the `renderFile()` call:\n\n```\nvar html = jsrender.renderFile(filePath, myData, myHelpers);\n```\n\n**Note:** The `jsrender.renderFile()` method can also be accessed using the alternative name `jsrender.__express()`. (This alternative method name is used within [Express integration](#node/express-hapi@express)).",
        "anchor": "renderfilehlelpers"
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
        "text": "For convenience you can register file-based templates by name, just as you can for [templates from strings](#d.templates@namedfromstring).\n\n```js\n// Register named template - \"myTmpl1\n$.templates(\"myTmpl1\", \"./templates/myTemplate.html\");\n\n// Render named template\nvar html = $.templates.myTmpl1(person);\n\n// Alternative syntax: var html = $.render.myTmpl1(person);\n```\n",
        "anchor": "named"
      },
      {
        "_type": "para",
        "title": "Automatic caching of file-based templates",
        "text": "The first time `jsrender.templates('./templates/myTemplate.html')` is called, JsRender will:\n\n - load the template file from the file system\n - compile the template\n - cache the template\n - return the compiled template\n\nThe cached template can be accessed directly as `jsrender.templates['./templates/myTemplate.html']` - and can also be deleted by calling `delete jsrender.templates['./templates/myTemplate.html']`, or `jsrender.templates('./templates/myTemplate.html', null)`\n\nOn subsequent calls, JsRender will simply:\n - return the compiled template\n\nThe caching means you can load and compile the template during server initialization, and avoid the cost of reading the file or compiling during HTTP requests:\n\n```js\njsrender.templates('./templates/myTemplate.html'); // Cache the compiled template\n\napp.get('/...', function(req, res) {\n  res.render('myTemplate', {name: \"Jim\"}); // Render previously cached template, using Express\n});\n```\n\nSimilarly when using the alternative forms for rendering templates:\n\n```js\napp.get('/...', function(req, res) {\n  var tmpl = jsrender.templates('./templates/myTemplate.html'); // Get previously cached template\n  var html = tmpl.render({name: \"Jim\"});\n  res.send(html);\n});\n```\n\nor \n\n```js\napp.get('/...', function(req, res) {\n  // Render previously cached template\n  var html = jsrender.renderFile('./templates/myTemplate.html', {name: \"Jim\"});\n  res.send(html);\n});\n```",
        "anchor": "caching"
      },
      {
        "_type": "para",
        "title": "Using the same template on the server and in the browser",
        "text": "JsRender lets you easily use the same templates for both server and browser rendering. See *[server/browser templates](#node/server-browser)* for details on two alternative approaches, one with the `{{clientTemplate}}` tag, and the other using *Browserify*.",
        "anchor": "server-browser"
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
        "text": "In the browser, when jQuery is present, JsRender loads as a jQuery plugin and adds APIs to the jQuery namespace object, as:\n\n`$.views`, `$.templates` and `$.render` \n\nOn the server exactly the same APIs are provided, associated instead with the `jsrender` namespace:\n\n`jsrender.views`, `jsrender.templates` and `jsrender.render`.\n\nFor convenience you can call the namespace `$` and then use the regular APIs: `$.views...`, `$.templates...`, `$.render...`, or copy from the regular browser examples/samples -- as if in the browser with jQuery.\n\nFor example:\n\n```js\nvar $ = require('jsrender'); // Returns the jsrender namespace object - referenced for convenience as var $\n\nvar tmpl = $.templates('Name: {{:first}} {{upper:last}}'); // Compile template from string\n\n$.views.converters('upper', function(val) {return val.toUpperCase()}); // Register converter\n \nvar data = {first: 'Jo', last: 'Ryan'};\n\nvar html = tmpl(data); // Or alternative syntax: var html = tmpl.render(data);\n// result: \"Name: Jo RYAN\" \n```",
        "anchor": "apis"
      },
      {
        "_type": "para",
        "title": "Using helpers, converters, custom tags...",
        "text": "On Node.js you can use the full set of JsRender features, template tags and APIs, just as you would in the browser -- by simply using the `jsrender` namespace object returned from `require('jsrender')`, instead of the jQuery object, `$`. In addition you can take advantage of [file-based templates](#node/filetmpls).\n\n**Custom Tags example:** -- For example, here is the JsRender Quickstart *[Custom Tags Sample](#jsr-quickstart@customtags)*, as you might write it on Node.js:\n\n**Template:** *./templates/personTemplate.html*:\n\n```jsr\nName: {{fullName person/}}\n```\n\n**Code:**\n\n```js\nvar jsrender = require('jsrender');\n\njsrender.views.tags(\"fullName\", \"{{:first}} {{:last}}\"); // Register custom tag\n\nvar tmpl = jsrender.templates('./templates/personTemplate.html'); // Compile template\n\nvar html = tmpl({person: {first: \"Jim\", last: \"Varsov\"}}); // Render\n// result: \"Jim Varsov\"\n```\n\n**Helpers example:** -- And here is the JsRender Quickstart *[Helpers](#jsr-quickstart@helpers)* example, in a version for Node.js:\n\n**Template:** *./templates/personTemplate.html*:\n\n```jsr\n{{:~title}} {{:first}} {{:~upper(last)}}\n```\n\n**Code:**\n\n```js\nvar jsrender = require('jsrender');\n\nvar myHelpers = {\n    upper: function(val) { return val.toUpperCase(); },\n    title: \"Sir\"\n};\n\nvar tmpl = $.templates('./templates/personTemplate.html');\n\nvar data = {first: \"Jim\", last: \"Varsov\"};\n\nvar html =  tmpl(data, myHelpers);\n// result: \"Sir Jim VARSOV\"\n```\n\nOr we can register helpers globally:\n\n```js\njsrender.views.helpers(myHelpers);\n\nvar data = {first: \"Jim\", last: \"Varsov\"};\nvar html =  tmpl(data);\n// result: \"Sir Jim VARSOV\"\n```",
        "anchor": "helpers"
      },
      {
        "_type": "para",
        "title": "Additional API: jsrender.compile()",
        "text": "On NodeJS, an additional `jsrender.compile(...)` API is available, as an alternative to `jsrender.templates(...)`. This is provided for compatibility with standard APIs, and for better integration with platforms such as Hapi:\n\nThe following:\n\n```js\n// Compile template from file\nvar tmpl1 = jsrender.compile('./templates/mytmpl.html');\n\n// Compile template from markup string\nvar tmpl2 = jsrender.compile('Name: {{name}}');\n```\n\nis equivalent to:\n\n```js\n// Compile template from file\nvar tmpl1 = jsrender.templates('./templates/mytmpl.html');\n\n// Compile template from markup string\nvar tmpl2 = jsrender.templates('Name: {{name}}');\n```\n\n**Note:** both the above APIs allow [passing in additional template options](#d.templates@resources), such as associated converter resources:\n\n```js\n// Compile template from markup string, and provide options\nvar tmpl3 = jsrender.compile('Name: {{upper:name}}', {\n  converters: {upper: ...}\n});\n```\n\nor equivalently:\n\n```js\n// Compile template from markup string, and provide options\nvar tmpl3 = jsrender.templates({\n  markup: 'Name: {{upper:name}}',\n  converters: {upper: ...}\n});\n```",
        "anchor": "compile"
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
        "text": "Using Browserify with the `jsrender/tmplify` transform allows you to include your server [file-based templates](#node/filetmpls) in the Browserify client-script bundle. \n\nYou can then access the compiled templates in the browser, as modules, using:\n\n```js\nvar tmpl = require('./.../myTemplate.html)`\nvar html = tmpl.render(myData);\n...\n```\n\nFor details, see the *[Browserify](#node/browserify)* topic.\n\nFor complete running samples, see the *index-express-browserify.js* and *index-hapi-browserify.js* samples in the *[JsRender Node Starter](https://github.com/BorisMoore/jsrender-node-starter)* project.",
        "anchor": "browserify"
      },
      {
        "_type": "para",
        "title": "Rendering file-based templates in the browser: {{clientTemplate}}",
        "text": "JsRender also provides a `{{clientTemplate}}` tag that makes file-based templates available for rendering in the browser without needing to use Browserify.\n\nSimply include `{{clientTemplate \"templateFilePath...\"}}` in the layout template, for any template you want to expose in the browser:\n\n```jsr\n<head>\n  {{clientTemplate \"./templates/myTemplate.html\" /}}\n</head>\n\n<div id=\"result\"></div>\n\n<script>\n  var data = ...\n  var tmpl = $.templates(\"./templates/myTemplate.html\");\n  var html = tmpl(myData);\n\n  $(\"#result\").html(html);\n</script>\n```\n\nSee the *index-express.js* and *index-hapi.js* samples in the *[JsRender Node Starter](https://github.com/BorisMoore/jsrender-node-starter)* project.",
        "anchor": "clienttemplate"
      },
      {
        "_type": "para",
        "title": "JsRender on the server, JsRender or JsViews in the browser...",
        "text": "Both the *Browserify* and the *{{clientTemplate}}* approach to sharing templates between server and browser let you then render or link those templates in the browser, using JsRender or JsViews.\n\nIn the browser, you reference the templates using the same `./file/path/template.html` syntax as on the server. \n\nFor example, in the *[JsRender Node Starter](https://github.com/BorisMoore/jsrender-node-starter)* samples, the [layout-movies.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/layout-movies.html) template contains the following:\n\n```html\n<tbody data-link=\"{include tmpl='./templates/movie-list.html'}\">\n  {{include tmpl=\"./templates/movie-list.html\"/}}\n</tbody>\n```\n\nHere, the `{{include ...}}` is used on the server to do initial rendering of the movies list using the *movie-list.html* template. Then in the browser, the `data-link=\"{include ...}` causes JsViews to access the same template in the browser, and provide dynamic data-binding of the list...\n",
        "anchor": "server-browser"
      },
      {
        "_type": "para",
        "title": "Single Page Apps with initial rendering on server",
        "text": "An important scenario is a *single page app* using JsRender or JsViews in the client to create dynamic UI, combined with initial rendering of the content on the server by JsRender using the same template.\n\nThis can bring many advantages, including SEO, and eliminating flicker when the page is refreshed with a new server request.\n\n*Note:* To completely eliminate flicker on data-linked content which has already been rendered on the server, it is sometimes useful to use the syntax `data-link=\"...^{...}\"` -- which data-links without doing the initial render. Here is an example from  [movie-detail.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/movie-detail.html) in the *[JsRender Node Starter](https://github.com/BorisMoore/jsrender-node-starter)*:\n\n```html\n<div><input value=\"{{:title}}\" data-link=\"^{:title:}\" /></div>\n```\n",
        "anchor": "spa"
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
        "text": "The most common JsRender tags are [`{{: pathOrExpr}}`](#assigntag) -- which inserts the value of the path or expression, and [`{{> pathOrExpr}}`](#htmltag) which inserts the *HTML-encoded* value of the path or expression. \n\nThose tags, along with the *allow code* tag [`{{* ...}}`](#allowcodetag) and *comment tag* [`{{!-- ... --}}`](#commenttag), are self-contained tags which do not wrap other content:\n\n**Built-in tags without content:**\n\n```jsr\n{{: pathOrExpr}}             (value)\n{{> pathOrExpr}}             (HTML-encoded value)\n{{* mycode}}                 (using code)\n{{!-- this is a comment --}} \n```",
        "anchor": "empty"
      },
      {
        "_type": "para",
        "title": "Block tags &ndash; tags with content: ",
        "text": "**All other built-in tags, as well as all custom tags, use the block tag syntax:**\n\n```jsr\n{{include ...}}...{{/include}}      or   {{include .../}}\n{{for}}...{{/for}}                  or   {{for.../}}\n{{props}}...{{/props}}              or   {{props .../}}\n{{if}}...{{/if}}                    or   {{if .../}}\n{{myCustomTag}}...{{/myCustomTag}}  or   {{myCustomTag .../}}\n```\n\nTags using the *block tag syntax* have *open* and *close* tags, with content, or else they use the self-closing syntax, without content:\n\n**Block tag with content**\n\n```jsr\n{{sometag ...}}\n  content\n{{/sometag}}\n```\n\n**Self-closing block tag (empty tag) -- no content:**\n\n```jsr\n{{sometag .../}}\n```\n\n",
        "anchor": "blocktag"
      },
      {
        "_type": "para",
        "title": "Using tmpl=... to reference content as an external template",
        "text": "A particular case of self-closing syntax is when any block tag uses the named property `tmpl=...` to reference an external template, which then replaces what would have been the block content.\n\nThis is a very useful technique for encapsulation and reuse of tag content. The content becomes a *'partial'* -- and is included thanks to template composition:\n\n**Self-closing block tag referencing an external template:**\n\n```jsr\n{{sometag ... tmpl=.../}}\n```\n\n(See for example `{{for languages tmpl=\"#columnTemplate\"/}}` in [this sample](#samples/jsr/composition/tmpl).)\n",
        "anchor": "tmplref"
      },
      {
        "_type": "para",
        "title": "Template composition (partials)",
        "text": "The most common way of composing templates is to have a layout template, and to use `{{include tmpl=... /}}`:\n\n```jsr\ntop level content\n{{include tmpl='myInnerTemplate' /}}\n```\n\nBut in fact template composition can be done by adding references to external templates using `tmpl=...` on ***any*** tag, as shown in the previous section.\n\n**Dynamic composition**\n\nNote that the `tmpl=...` can use any expression, so you can assign different nested templates dynamically based on data or context. For example you might write `{{include tmpl=~getTemplate(type) /}}` -- where `~getTemplate(...)` is a helper which returns a different template based in this case on the `type` property of the current data item.\n\nIn fact when setting `tmpl=...` dynamically, the returned template can be in any if the following forms:\n- a compiled template\n- a markup string\n- the name of a registered template\n- a selector\n- (on Node.js) a file path to a template",
        "anchor": "composition"
      },
      {
        "_type": "para",
        "title": "Tag arguments and named properties",
        "text": "Tags can take both unnamed arguments and named properties:\n\n```jsr\n{{sometag argument1 param1=...}}\n  content\n{{/sometag}}\n```\nAn example of a named property is the `tmpl=...` property mentioned above:\n\n```jsr\n{{for languages tmpl=\"#columnTemplate\"/}}\n```\n\nArguments and named properties can be assigned values from simple data-paths such as:\n\n```jsr\n{{formattedAddress address.street format=~util.formats.upper /}}\n```\n\nor from richer expressions such as `product.quantity * 3.1 / 4.5`, or `name.toUpperCase()`\n\n```jsr\n{{productValue product.quantity*3.1/4.5 description=name.toUpperCase() /}}\n```\n",
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
        "text": "Some block tags provide features which involve using alternative content blocks. Block tag syntax supports this by allowing the content to be separated into two or more alternative content blocks, using `{{else}}` tags as separators:\n\nFor example, the [`{{if}}`](#iftag) tag uses `{{else}}` to provide *if-else*, or *if-elseif-else ...* behavior:\n\n```jsr\n{{if firstExpression}}\n    render this if the firstExpression is true\n{{else secondExpression}}\n    else render this if the secondExpression is true\n{{else}}\n    else render this\n{{/if}}\n```\n\nAnd the [`{{for}}`](#propstag) tag accepts alternative content to render if an array is empty (or an array or object is `null` or `undefined`):\n\n```jsr\n{{for members}}\n    Member Name: {{:name}}\n{{else}}\n    There are currently no members...\n{{/for}}\n```\n\nSimilarly you can use `{{else}}` with a custom tag, such as in [this sample](#samples/tag-controls/tabs):\n\n```jsr\n{{tabs caption=\"First Tab\"}}\n    first tab content\n{{else caption=\"Second Tab\"}}\n    second tab content\n{{/tabs}}\n```",
        "anchor": "else"
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
          },
          {
            "_type": "topic",
            "hash": "linked-template-syntax",
            "label": "JsViews data-linked template syntax"
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
        "text": "A view corresponds to an instance of a *[block tag](#tagsyntax@blocktag)* ***or*** a *rendered template* -- so if we replace the inline content of a tag by an external reference: `tmpl=...`, the rendered result will be unchanged, and *the view structure will also be identical*:\n\n```jsr\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  My team\n  {{if members.length tmpl=\"#membersTemplate\" /}}\n</script>\n\n<script id=\"membersTemplate\" type=\"text/x-jsrender\">\n  The team has members!\n</script>\n```\n\nSame view structure as before:\n \n<pre>\n&mdash; <b>teamView</b>                data: <span class=\"hljs-keyword\">team</span>\n   &mdash; <b>ifView</b>               data: <span class=\"hljs-keyword\">team</span>\n</pre>",
        "anchor": "nestedtmpl"
      },
      {
        "_type": "para",
        "title": "Stepping into a block tag &ndash; what is the new data context?",
        "text": "Let's add a custom tag `{{mytag}}` to our template:\n\n```jsr\nMy team\n{{mytag members/}}\n...\n```\n\nWe'll define the custom tag, with a built-in template:\n\n```js\n  $.views.tags(\"mytag\", \"{{:length}} member(s)\");\n```\n\n`{{mytag members/}}` will render block content (with an associated view) using its tag template `\"{{:length}} members\"`. \n\n*What will the data context be for the `mytag` view?*\n\nBy default:\n\n- a block tag with no argument `{{sometag}}` will stay on the current data context\n- a block tag with an argument `{{sometag expr ...}}` will move the data context to `expr`.\n\nSo `{{mytag members}}` (just like `{{include members}}`) *will move the data context to `members`*.",
        "anchor": "innerdata"
      },
      {
        "_type": "para",
        "title": "",
        "text": "However a block tag may be designed to simply stay on the same data context as the parent block -- and that is the case for the `{{if}}` tag:\n\n- `{{if expr}}` does not move the data context.\n\nSo our template\n\n```jsr\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  My team\n  {{mytag members/}}\n\n  {{if members.length}}\n    The team has members!\n  {{/if}}\n</script>\n```\n\nwill have this view structure:\n\n<pre>\n&mdash; <b>teamView</b>                data: <span class=\"hljs-variable\">team</span>\n   &mdash; <b>mytagView</b>            data: <span class=\"hljs-variable\">team.members</span>\n   &mdash; <b>ifView</b>               data: <span class=\"hljs-variable\">team</span> (same as parent – teamView)\n</pre>\n"
      },
      {
        "_type": "para",
        "title": "Array views and item views &ndash; {{for array}}",
        "text": "Now let's add a `{{for members}}` tag to iterate over the `members`, inside the `{{if}}` block:\n\n```jsr\nTeam\n{{mytag members/}}\n\n{{if members.length}}\n  Members:\n  {{for members}}\n    {{:name}}\n  {{/for}}\n{{/if}}\n```\n\nWhen a [`{{for ...}}`](#propstag) tag is used with an array it creates:\n\n- an *\"array\" view*, whose `data` property is the array -- and under the \"array\" view:\n- an *\"item\" view* for each item in the array -- with as `data` property the item, and as [`index`](#getindex) property the index in the array:\n\n(Similarly, any tag which derives from the `{{for}}` tag -- such as the [`{{props}}`](#propstag) tag -- will also add an \"array\" view and \"item\" views...)\n\nSo our view structure with the `{{for}}` tag included will now be :\n\n<pre>\n&mdash; <b>teamView</b>                data: <span class=\"hljs-variable\">team</span>                 type: <span class=\"hljs-string\">\"data\"</span>\n   &mdash; <b>mytagView</b>            data: <span class=\"hljs-variable\">team.members</span>         type: <span class=\"hljs-string\">\"mytag\"</span>\n   &mdash; <b>ifView</b>               data: <span class=\"hljs-variable\">team</span>                 type: <span class=\"hljs-string\">\"if\"</span>\n      &mdash; <b>arrayView</b>         data: <span class=\"hljs-variable\">team.members</span>         type: <span class=\"hljs-string\">\"array\"</span>\n         &mdash; <b>itemView</b>       data: <span class=\"hljs-variable\">team.members[0]</span>      type: <span class=\"hljs-string\">\"item\"</span>\n         &mdash; <b>itemView</b>       data: <span class=\"hljs-variable\">team.members[1]</span>      type: <span class=\"hljs-string\">\"item\"</span>\n</pre>\n\n-- where we show also the [`type`](#viewobject@type) property of each `view`.",
        "anchor": "itemview"
      },
      {
        "_type": "para",
        "title": "Array views and item views &ndash; tmpl.render(array)",
        "text": "Suppose now we have an array of teams -- and we pass the `teams` array to the `render()` method:\n\n```js\nvar teams = [\n  {title: \"A Team\", members: [{name: \"Jeff\"}, {name: \"Maria\"}]},\n  {title: \"B Team\", members: [{name: \"Francis\"}]}\n];\n\nvar html = $(\"#teamTemplate\").render(teams);\n```\n\nJsRender will render the `teamTemplate` once for each team -- and just like with the `{{for}}` it will create an *\"item\" view* for each item in the `teams` array -- with the two *\"item\" views* as children of an *\"array\" view*.\n\nHere it is as a working sample:",
        "anchor": "render-itemview"
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
        "height": "86"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the resulting view structure:\n\n<pre>\n&mdash; <b>arrayView</b>               data: <span class=\"hljs-variable\">teams</span>\n   &mdash; <b>itemView</b>             data: <span class=\"hljs-variable\">teams[0]</span>               <em>(Team: The A Team - )</em>\n      &mdash; <b>mytagView</b>         data: <span class=\"hljs-variable\">team.members</span>           <em>(2 members)</em>\n      &mdash; <b>ifView</b>            data: <span class=\"hljs-variable\">teams[0]</span>               <em>(Members:)</em>\n         &mdash; <b>arrayView</b>      data: <span class=\"hljs-variable\">teams[0].members</span>\n            &mdash; <b>itemView</b>    data: <span class=\"hljs-variable\">teams[0].members[0]</span>    <em>(Jeff)</em>\n            &mdash; <b>itemView</b>    data: <span class=\"hljs-variable\">teams[0].members[1]</span>    <em>(Maria)</em>\n   &mdash; <b>itemView</b>             data: <span class=\"hljs-variable\">teams[1]</span>               <em>(Team: The B Team - )</em>\n      &mdash; <b>mytagView</b>         data: <span class=\"hljs-variable\">team.members</span>           <em>(1 members)</em>\n      &mdash; <b>ifView</b>            data: <span class=\"hljs-variable\">teams[1]</span>               <em>(Members:)</em>\n         &mdash; <b>arrayView</b>      data: <span class=\"hljs-variable\">teams[1].members</span>\n            &mdash; <b>itemView</b>    data: <span class=\"hljs-variable\">teams[1].members[0]</span>    <em>(Francis)</em>\n</pre>\n"
      },
      {
        "_type": "para",
        "title": "The default argument for a tag is the current data &ndash; #data",
        "text": "For all built-in tags (and custom tags if you don't use the [argDefault](#tagsapi@argdefault) option), you can pass the current data to the tag by writing it without an argument.\n\nSo the following:\n\n```jsr\n{{:}}                       {{!--Render value of current data (string)--}}\n{{>}}                       {{!--Render value of current data (string)--}}\n{{for}}...{{/for}}          {{!--Move to current data (object) or iterate over current data (array)--}}\n{{if}}...{{/if}}            {{!--Render block if current data is truthy--}}\n{{props}}...{{/props}}      {{!--Iterate over properties of current data (object)--}}\n```\n\nare equivalent to:\n\n```jsr\n{{:#data}}                   {{!--Render value of current data (string)--}}\n{{>#data}}                   {{!--Render value of current data (string)--}}\n{{for #data}}...{{/for}}     {{!--Move to current data (object) or iterate over current data (array)--}}\n{{if #data}}...{{/if}}       {{!--Render block if current data is truey--}}\n{{props #data}}...{{/props}} {{!--Iterate over properties of current data (object)--}}\n```",
        "anchor": "default-arg"
      },
      {
        "_type": "para",
        "title": "In JsViews: From UI back to data:",
        "text": "***Note:*** One of the features provided by JsViews data-linking (when you use the JsViews [`.link()`](#jsvlinktmpl) method rather than JsRender's [`.render()`](#rendertmpl) method) is the [`$.view(elem)`](#$view) method. This method provides a *reverse mapping* and lets you get from a rendered DOM element back to the corresponding view object in the view hierarchy. From the view you can get to the underlying data, the index, etc.\n\nSo in effect in JsViews, *the mapping from the view hierarchy to the UI becomes a two-way mapping...* \n\nSee [*Using $.view() to get from the rendered UI back to the data*](#jsv.d.view)",
        "anchor": "#$view"
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
        "text": "JsRender tags can take [unamed arguments, or named properties](#tagsyntax@tagparams):\n\n```jsr\n{{:arg0}}\n\n{{sometag arg1 arg2 param_a=param1 param_b=param2}}\n  content\n{{/sometag}}\n```\n\nThe values of the arguments or properties (such as `arg0`... `param1` ... above) must be valid JsRender paths or expressions.\n\nJsRender expressions are regular Javascript expressions, but with *no access to global variables*.\n\nInstead of global Javascript variables, JsRender expressions use *data paths*, *helper paths* and *view paths*, to access data values, values provided by helpers, and values obtained from the [view hierarchy](#views), such as the `#getIndex()`.\n\n***Data paths*** are of the form `dataProperty.bb.cc`, and they step through the data hierarchy, starting from the current data item (the [data context](#views@datacontext) for the current view). They can include array access, such as `team.members[id]`\n\n***View paths*** are of the form `#viewProperty.bb.cc`, and they start from the current [view](#views). So for example, `#data` is short for `#view.data` -- where `#view` is the current view.\n\n***Helper paths*** are of the form `~myHelper.bb.cc`, and they start from the named [helper](#helpers) `\"myHelper\"`. In addition they can be used to access *[contextual parameters](#contextualparams)*, or the built-in [`~root`](#contextualparams@root) \n\nHere are some examples of JsRender paths and values:\n\n*Data paths*:\n\n```jsr\n{{:name}}\n{{for address.street}}...{{/for}}\n{{>team.members[0].lastName}}\n{{:name.toUpperCase()}}\n```\n\n*Helper paths*:\n\n```jsr\n{{>~utilities.errorMessages.msg1}}\n{{if ~settings.show}}...{{/if}}\n{{:~root.selectedName}}         {{!--Accessing root data--}}\n```\n\n*View paths*:\n\n```jsr\n{{:#getIndex()}}\n{{include #content /}}\n{{if #parent.parent.data.isLead}}...{{/if}}\n{{>~getDescription(#data)}}\n```\n\n*A primitive value of type string, number, boolean, null ...*:\n\n```jsr\n{{if isOpen tmpl='It is open' /}}\n{{for address tmpl=\"#addressTemplate\"}}...{{/for}}\n{{for members start=1 end=5 /}}\n{{for members reverse=true /}}\n```\n\nJsRender expressions can combine values in more complex expressions, using functions, parens, operators such as `+` `-` `*` `/` `!` `===` `==` `>` `!==` `||` `&&`, as well as ternary expressions: `...?...:...`, array and object accessors: `[...]` etc.\n\n*Here are some examples of expressions*: \n\n```jsr\n{{if book.author === \"Jim Boyd\"}}...{{/if}}\n{{:~utilities.format(book.title, 'upper', true)}}\n{{for ~sort(~root.getMembers()}}}...{{/for}}\n{{:person.firstName + ' ' + person.lastName.toUpperCase()}}\n{{for #parent.data.members()/}}\n{{:(~addRebate(book.price) + 23.2)*3.5/2.1}}\n{{:~mode === \"useTitle\" ? book.title : book.name}}\n{{if error}}...{{else !utilities.valid(book.description)}}...{{else}}...{{/if}}\n{{:~books[id].title}}\n{{:people[~currentIndex].name}}\n```\n\nExpressions can include white space. The following two examples are equivalent:\n\n```jsr\n{{averageValue product.quantity*3.1/4.5 description=~getDescription(#data) /}}\n{{averageValue product.quantity * 3.1 / 4.5 description = ~getDescription( #data ) /}}\n```\n\nThe `{{averageValue}}` tag is being assigned one argument, and one named \"description\" parameter. The two expressions differ only in white space, and both are syntactically valid. However, removing optional white space -– as in the first example -– makes it easier to see the distinct arguments and parameters of the tag.\n"
      },
      {
        "_type": "para",
        "title": "Chained paths: Stepping through object properties (or functions)",
        "text": "All of the paths above (whether *Data/Helper/View paths*) involve starting from an initial value (a *current data item property/helper/view property*) -- and then, if it is an object, perhaps stepping through one or more chained properties.\n\nFor example `team.manager.address.street` starts from a `team` object and steps through the `manager` property -- which is itself a 'person' object with an `address` property, etc. \n\n(See also *[Data-linked paths](#linked-paths)*.)\n",
        "anchor": "paths"
      },
      {
        "_type": "para",
        "title": "Computed properties",
        "text": "In some cases a property may be of type *function* (possibly taking parameters), so you might have:\n\n`team.manager().getAddress('home').street`\n\n-- where the manager property is in fact a *'getter'* function which returns a `person` object, which has a `getAddress()` parameterized accessor (taking `'home'` or `'work'` -- or maybe a Boolean `isHomeAddress`). Similarly a path can include an array accessor such as `team.members['id'].address`.\n\nProperties of type function -- returning a value -- are referred to as a *computed properties*, or *getter properties*, and <br/>\n`team.manager().getAddress('home').street` is an example of chained computed properties.\n\n(See also *[Computed properties and computed observables](#computed)* -- for using computed properties with JsViews and data-linking.)\n\nA computed value can also use JavaScript methods, such `toFixed()` to format a number:\n\n```jsr\n{{:price.toFixed(2)}}    <!--Round to 2 decimal places-->\n{{:(+price).toFixed(2)}} <!--Coerce to numbe and round to 2 decimal places-->\n```",
        "anchor": "computed"
      },
      {
        "_type": "para",
        "title": "Getter properties and computed properties",
        "text": "A common pattern using computed 'getter' functions would be to provide a `person.firstName()` 'getter' property which returns a value: `person._firstName`, considered as 'private'.\n\nIn addition, there may be computed properties which depend on other properties, such as a `person.fullName()` which concatenates first and last name.\n\nHere is a sample showing both types of computed property:\n",
        "anchor": "getter"
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
        "height": "72",
        "jsrJsvJqui": "jsr",
        "title": "Getter properties with plain objects",
        "anchor": "getter-plain-sample"
      },
      {
        "_type": "para",
        "title": "Getter properties on a View Model",
        "text": "Rather than using plain JavaScript objects with getter functions, as above, a more common pattern (providing better encapsulation) would be to define a *'View Model'* class -- with getter properties defined in the class -- and to instantiate that class to provide data instances.\n\n(See *[Plain objects or View Model](#explore/objectsorvm)* for details.)\n\nThe following sample uses that approach:",
        "anchor": "getter-vm"
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
        "height": "72",
        "code": "function firstName() { return this._firstName; }\nfunction lastName() { return this._lastName; }\nfunction fullName() { return this._firstName + \" \" + this._lastName; }\n\nfunction Person(first, last) {\n  this._firstName = first;\n  this._lastName = last;\n}\n\nPerson.prototype = {\n  firstName: firstName,\n  lastName: lastName,\n  fullName: fullName\n};\n\nvar data = {\n  person: new Person(\"Jo\", \"Blow\")\n};\n\nvar html = $(\"#personTmpl\").render(data);\n\n$(\"#result\").html(html);",
        "title": "Getter properties with a View Model",
        "anchor": "getter-vm-sample"
      },
      {
        "_type": "para",
        "title": "Using the 'bracket' property accessor: object[\"property\"]",
        "text": "Just as in regular JavaScript, JsRender paths and expressions support both the dot notation: `object.property` or the bracket notation: `object[\"property\"]` for accessing properties.\n\nThis permits also support for otherwise disallowed property names, as shown in the following example:\n",
        "anchor": "bracketnotation"
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
            "text": "```js\ndata = {\"first name\": \"Jo\", \"address\": {\"1st-Line\": \"My Place\", \"street.name\": \"Broadway\"} };\n```\n\nExamples of template syntax with bracket notation property accessors:\n\n```jsr\n{{:#data[\"first name\"]}}\n{{>address['1st-Line']}}\n{{>~root[\"address\"][\"street.name\"]}}\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {{:#data[\"first name\"]}} lives at\n  <em>\n    {{>address['1st-Line']}}\n    {{>~root[\"address\"][\"street.name\"]}}\n  </em>\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    \"first name\": \"Jo\",\n    \"address\": {\n      \"1st-Line\": \"My Place\",\n      \"street.name\": \"Broadway\"\n    }\n  },\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "height": "40"
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
        "text": "See also *[Setting tag delimiters for JsViews](#jsvsettings/delimiters)*"
      },
      {
        "_type": "para",
        "title": "JsRender default tag delimiters",
        "text": "Template tags in JsRender use the Mustache style: `{{...}}`\n\n(JsRender also accepts the data-linked tag syntax used in in JsViews: `{^{...}}`). "
      },
      {
        "_type": "para",
        "title": "Changing delimiters:",
        "text": "Sometimes there can be a need to use different delimiters. For example there may be a conflict if the template is being rendered on the server using a declarative syntax such as *Django* with the same default delimiters `{{` and `}}`.\n\nThe following call:\n\n```js\n$.views.settings.delimiters(\"<%\", \"%>\");\n```\n\nwill change the tag syntax to `<%...%>`.\n\nThe chosen delimiters must each consist of two non-alphanumeric (and non-white-space) characters. \n\n(*Note:* `$.views.settings.delimiters(...);` also accepts as parameter an array such as `[\"<%\", \"%>\"]`, which can be useful for reverting to a previous set of delimiters -- as shown in the last sample [below](#settings/delimiters@tmpl-for-tmpl). )\n"
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
        "height": "70",
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
            "text": "```jsr\n<%:hello%>, {{:name}}<br/>\n<%:welcome%> {{:place}}\n```\n\n```js\n// Get current delimiters array\nvar currentDelimiters = $.views.settings.delimiters();\n\n// Temporarily switch delimiters\n$.views.settings.delimiters(\"<%\", \"%>\");\n\n// Translate to Spanish localized version\nvar localizedTemplate = $.templates(\"#baseTmpl\").render(spanishTerms);\n\n// Revert to original delimiters (by passing in previous delimiters array)\n$.views.settings.delimiters(currentDelimiters);\n\n// Render data using localized template\nhtml = $.templates(localizedTemplate).render(data);\n```"
          }
        ],
        "html": "<script id=\"baseTmpl\" type=\"text/x-jsrender\">\n  <%:hello%>, {{:name}}<br/>\n  <%:welcome%> {{:place}}\n</script>\n\n<div id=\"result\"></div>\n",
        "code": "var spanishTerms = {\n  hello: \"Hola\",\n  welcome: \"Bienvenido a\"\n};\n\nvar data = {\n  name: \"John\",\n  place: \"Madrid\"\n};\n\n// Get current delimiters array\nvar currentDelimiters = $.views.settings.delimiters();\n\n// Temporarily switch delimiters\n$.views.settings.delimiters(\"<%\", \"%>\");\n\n// Translate to Spanish localized version\nvar localizedTemplate = $.templates(\"#baseTmpl\").render(spanishTerms);\n\n// Revert to original delimiters (passing in previous delimiters array)\n$.views.settings.delimiters(currentDelimiters);\n\n// Render data using localized template\nhtml = $.templates(localizedTemplate).render(data);\n\n$(\"#result\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "54",
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
        "height": "54",
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
  "onerror": {
    "title": "Error handling and debugging",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Sometimes when rendering a JsRender template, a JavaScript error is encountered. For example `{{:address.street}}` in a template will render without error provided there is an `address` property on the current data object. But if there is no `address` property, then *there will be an error*: ***\"Cannot read property 'street' of undefined\"***.\n\nJsRender provides two features which provide powerful control over rendering behavior when errors are encountered.\n\n- The optional [`onError=...` property](#onerror@onerror) that can be set on any tag -- for controlling error handling behavior on that specific tag\n- The [`$.views.settings.debugMode(...)` setting](#onerror@debugmode) -- which provides global control over error handling during rendering\n\nIn addition, for advanced debugging of compiled templates, see:\n\n- *[Using debugging helpers](#onerror@dbg)*\n\n<br/>\n## Specifying onError fallback behavior on a tag"
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
            "text": "In this sample, if a `member` object has no `address` property, the `address.street` expression will lead to a JavaScript error, and the `{{:address.street onError=\"Address unavailable\"}}` will render the fallback string:  `\"Address unavailable\"`.\n\nSimilarly, `{{for phones() onError=\"...\"}}`, if `phones()` produces an error... \n\n*Template:*\n\n```jsr\n{{for phones() onError=\"No phones\"}} ...\n{{:address.street onError=\"Address unavailable\"}}\n```\n\n*Code:*\n\n```js\nfunction phones() { if (!this._phones) { throw new Error(\"phones() error\"); } ... }\n```\n\n*Data:*\n\n```js\nmembers: [\n  {address: {street: \"1st Ave\"}, _phones: [\"888\", \"456\"], ...\n  {address: undefined, _phones: [\"987\", \"111\"], ...             // No address\n  {address: {street: \"Main St\"}, _phones: undefined, ...        // _No phones\n]\n```\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n{{for members}}\n  Phones:\n  {{for phones() onError=\"No phones\"}}\n    {{:}}\n  {{/for}}\n  <br/>\n  <b>{{:address.street onError=\"Address unavailable\"}}</b>\n  <hr/>\n{{/for}}\n</script>\n",
        "markup": "",
        "jsrJsvJqui": "jsr",
        "data": [],
        "code": "function phones() {\n  if (!this._phones) {\n    throw new Error(\"phones() error\");\n  }\n  return this._phones;\n}\n\nvar team = {\n  members: [\n    {address: {street: \"1st Ave\"}, _phones: [\"888\", \"456\"],\n      phones: phones},\n    {address: undefined, _phones: [\"987\", \"111\"],       // No address\n      phones: phones},\n    {address: {street: \"Main St\"}, _phones: undefined,  // _No phones\n      phones: phones}\n  ]\n};\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);",
        "title": "onError=\"fallback string...\" ",
        "height": "164"
      },
      {
        "_type": "para",
        "title": "Setting onError to an expression",
        "text": "More specific or powerful behavior can be obtained by setting onError to an expression, such as:\n\n```jsr\n{{:address.street onError=name + \" has no address\"}}\n```\n\n```jsr\n{{:address.street onError=~errorMessages(1, name, 'address')}}\n```",
        "anchor": "expr"
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
        "height": "210",
        "jsrJsvJqui": "jsr",
        "title": "onError=someExpression..."
      },
      {
        "_type": "para",
        "title": "Setting onError to a function",
        "text": "If `onError=myOnErrorHandler` is set to a function, then the function will be called when there is an error.\n\n- If the function returns a string, then that string will be rendered, replacing the output of the tag\n- If the function has no return value, then the error message will be rendered\n\nFor example, you can provide a `person.error()` error handler method on a person object, and set `onError=error`. Or you can use global helper (or a helper passed to the render function), and set `onError=~myErrorHandler`, such as the following to log the error and display just the empty string:\n\n```js\nfunction myErrorHandler(e, view) {\n  console.log(...); // Log the error \n  return \"\";        // Display the empty string \n}\n```\n\nThe parameters of the onError handler function -- `myHandler(e, view)` -- will be:\n\n- `e` -- the `error` object\n- `view` -- the current `view` object\n- The `this` pointer will be the current data item, `view.data`"
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
        "height": "126",
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
        "text": "The `$.views.settings.debugMode(...)` setting provides control of error handling during rendering, similar to the `onError` feature [above](#onerror@onerror), but operating at a global level rather than on individual tags.\n\nThese two approaches are complementary and can be used together.  "
      },
      {
        "_type": "para",
        "title": "Setting debug mode to true",
        "text": "- By default *debug mode* is **false** -- and *an exception will be thrown if a JavaScript error is encountered while rendering a tag or template*\n- If *debug mode* is set to **true** -- any error message encountered while rendering a tag *will replace the rendered content of that tag*\n\n***To set debug mode to true:***\n\n```js\n$.views.settings.debugMode(true);\n```\n\n***To set debug mode back to false:***\n\n```js\n$.views.settings.debugMode(false);\n```\n\n***To get current debug mode:***\n\n```js\nvar isDebugMode = $.views.settings.debugMode(); // false by default\n```\n\nIn the following example *debug mode* is set to `true`. The error message is rendered, replacing the rendered tag.\n\n(Choose *Try it* and change *debug mode* to `false`, to see the difference.)\n",
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
            "text": "*Code:*\n\n```js\n$.views.settings.debugMode(true);\n```\n\nThe `{{:address.street}}` tag for Bill (who has no address) is replaced by the error message.\n\n```js\nvar team = {members: [\n {name:\"Jo\", address: {street: \"1st Ave\"}},\n {name:\"Bill\"}, // Bill does not have an address!!\n {name:\"Ava\", address: {street: \"Main St\"}}\n]};\n...\n```\n\n*Template:*\n\n```jsr\n{{for members}}\n  <div>{{:name}} - <b>{{:address.street}}</b></div>\n{{/for}}\n```"
          }
        ],
        "code": "$.views.settings.debugMode(true); \n// Change to $.views.settings.debugMode(false); - The error\n// will not be displayed, but an exception will be thrown.\n\nvar team = {members: [\n {name:\"Jo\", address: {street: \"1st Ave\"}},\n {name:\"Bill\"},  // Bill does not have an address!!\n {name:\"Ava\", address: {street: \"Main St\"}}\n]};\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n",
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n{{for members}}\n  <div>{{:name}} - <b>{{:address.street}}</b></div>\n{{/for}}\n</script>\n",
        "jsrJsvJqui": "jsr",
        "height": "74",
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
            "text": "*Template:*\n\n```jsr\nTeam:<div>\n  {{if owner}}\n    Owner: {^{:manager.name}}\n  {{/if}}\n</div>\nEdit: <input data-link='manager.name' />\n```\n\n*Code:*\n\n```js\n$.views.settings.debugMode(true);\n// Debug mode is set to true, so error messages are rendered in place of the corresponding tag or data-link expression.\n\nvar team = {owner:\n {name:\"Jo\"}\n}; // team.manager is undefined...\n...\ntmpl.link(\"#result\", team); // Error...\n```\n\nIf you choose *Try it* and change to `$.views.settings.debugMode(false);`, the error will instead be thrown as an exception.\n"
          }
        ],
        "html": "<style>input {width: 350px;}</style>\n<div id=\"result\"></div>\n\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  Team:<div> \n    {{for team}}\n      Owner: {^{:manager.name}}\n    {{/for}}\n  </div>\n  Edit: <input data-link='manager.name' />\n</script>\n",
        "code": "$.views.settings.debugMode(true);\n\nvar team = {owner:\n {name:\"Jo\"}\n}; // team.manager is undefined...\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", {team: team}); // Error...",
        "height": "80",
        "title": "Debug mode set to true &ndash; JsViews",
        "anchor": "datalink"
      },
      {
        "_type": "para",
        "title": "Setting debug mode to a string",
        "text": "By setting debug mode to a string rather than to `true`, no exception will be thrown, and the chosen string will be rendered, replacing the rendered tag. \n\n```js\n$.views.settings.debugMode(\"Error!\");\n``` ",
        "anchor": "debugmode-string"
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
            "text": "```js\n$.views.settings.debugMode(\"Error!\"); \n```\n\nThe `{{:address.street}}` tag for Bill (who has no address) is replaced by `\"Error!\"`."
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n{{for members}}\n  <div>{{:name}} - <b>{{:address.street}}</b></div>\n{{/for}}\n</script>\n",
        "code": "$.views.settings.debugMode(\"Error!\");  // Do not throw exception - render \"Error!\"\n\nvar team = {members: [\n {name:\"Jo\", address: {street: \"1st Ave\"}},\n {name:\"Bill\"},  // Bill does not have an address!!\n {name:\"Ava\", address: {street: \"Main St\"}}\n]};\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n",
        "title": "Debug mode set to a default string",
        "jsrJsvJqui": "jsr",
        "height": "74"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In some scenarios the desired behavior may be to ignore errors during rendering, by skipping any tag with an error, rendering it as an empty string. This is achieved very easily, by simply writing:\n\n```js\n$.views.settings.debugMode(\"\");\n``` "
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
            "text": "```jsr\n$.views.settings.debugMode(\"\");\n```\n\nThe `{{:address.street}}` tag for Bill (who has no address) is skipped."
          }
        ],
        "title": "Debug mode set to empty string",
        "code": "$.views.settings.debugMode(\"\");   // Do not throw exception - render \"\"\n\nvar team = {members: [\n {name:\"Jo\", address: {street: \"1st Ave\"}},\n {name:\"Bill\"},  // Bill does not have an address!!\n {name:\"Ava\", address: {street: \"Main St\"}}\n]};\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n",
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n{{for members}}\n  <div>{{:name}} - <b>{{:address.street}}</b></div>\n{{/for}}\n</script>\n",
        "jsrJsvJqui": "jsr",
        "height": "74"
      },
      {
        "_type": "para",
        "title": "Providing a debug mode handler (function)",
        "text": "If debug mode is set to a function, the function will be called each time an error is encountered during rendering. \n\n- If the function returns a string, then that string will be rendered, replacing the rendered tag\n- If the function has no return value, then the error message will be rendered\n\n```js\n$.views.settings.debugMode(myOnErrorHandler);\n\nfunction myOnErrorHandler(e, fallback, view) {\n  // This handler will log the error, and then display the empty string\n  console.log(...);\n  return \"\"; \n}\n```\n\nThe parameters of the debug mode error handler function -- `myHandler(e, fallback, view)` -- will be:\n\n- `e` -- the error object\n- `fallback` -- the fallback error string, provided by the *[onError fallback](#onerror@onerror)* specified on the tag, if there is one\n- `view` -- the current view object\n- The `this` pointer will be the current data item, `view.data`\n",
        "anchor": "debugmode-function"
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
            "text": "```jsr\n{{:address.street onError='address'}}\n```\n\n```js\nfunction onErrorHandler(e, fallback, view) {\n  console.log(e.message);\n  if (fallback === \"address\") {\n    return 'Address error for ' + this.name + '. (\"' + e.message + '\")';\n  }\n}\n```\n\n```js\n$.views.settings.debugMode(onErrorHandler);\n```\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n{{for members}}\n  <div>Name: {{:name}}<br/>\n    {{:address.street onError='address'}}\n    <hr/>\n  </div>\n{{/for}}\n</script>\n",
        "code": "var team = {\n  members: [\n    {name: \"Bill\", address: {street: \"1st Ave\"}},\n    {name: \"Jane\", address: undefined}           // No address\n  ]\n};\n\nfunction onErrorHandler(e, fallback, view) {\n  console.log(e.message);\n  if (fallback === \"address\") {\n    return 'Address error for ' + this.name + '. (\"' + e.message + '\")';\n  }\n}\n\n$.views.settings.debugMode(onErrorHandler);\n\nvar html = $(\"#teamTmpl\").render(team);\n\n$(\"#result\").html(html);\n",
        "title": "Debug mode &ndash; onError handler",
        "jsrJsvJqui": "jsr",
        "height": "116"
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
            "hash": "nojqueryapi",
            "label": "JsRender without jQuery"
          },
          {
            "hash": "escapetag",
            "label": "Escape {{ in template"
          },
          {
            "hash": "nullcheck",
            "label": "Null checks in templates"
          },
          {
            "hash": "unicode",
            "label": "Unicode character support"
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
        "text": "*JsRender* is a simple light-weight templating engine. It can be used in the browser within simple web pages, or within complex single-page apps, or in conjunction with other frameworks. It can also be used on the server, using *Node.js*.\n\nIt is highly flexible, expressive, and 'unopinionated' -- so it leaves you free to work within your own choice of overall application architecture (including architectures based on *MVVM*, *MVP* or *MVC* -- optionally with server/client integration), and lets you use your own flavor of data/model layer -- whether simple plain JavaScript objects, hand-coded *View Model* instances, or *[compiled View Models](#viewmodelsapi)*.\n\n\n"
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
        "text": "If you pass an array to the JsRender [`.render(myArray)`](#rendertmpl) method, or if you use [`{{for myArray}}`](#propstag),  in a template, JsRender will iterate over the array, and render an [*item view*](#views@itemview) for each item in the array.\n\nWithin an item view you can access the array-index of the current item, using `{{:#index}}`:\n\n- *Getting item index within a top-level item view (from `.render(myArray)`)*:\n\n  ```jsr\n  ...\n  {{:#index}}\n  ...\n  ```\n\n- *Getting item index within a `{{for myArray}}` block*:\n\n  ```jsr\n  {{for myArray}}\n    ...\n    {{:#index}}\n    ...\n  {{/for}}\n  ```\n\nIf there are additional nested tags, then from within the nested tags you can still access the index, by using `{{:#getIndex()}}`:\n\n- *Getting item index from nested tags within an item view*:\n\n  ```jsr\n  {{for myArray}}\n    ...\n    {{if ...}}\n      ...\n      {{:#getIndex()}}\n      ...\n    {{/if}}\n    ...\n  {{/for}}\n  ```\n\nSee [`index`](#viewobject@index) and [`getIndex()`](#viewobject@getindex) for additional details.\n"
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
        "text": "The *itemVar* feature lets you set up a contextual parameter for the current data 'item' of a block. It is in effect an 'alias' for `#data` within the block.\n\nTo define an *itemVar* contextual parameter for a block tag, simply write `itemVar=~someName`. The parameter `~someName` can then be accessed like any other helper variable or contextual parameter, within nested contexts to any depth.\n\n```jsr\n...\n{{for teams itemVar=\"~team\"}}\n  ...\n  {{for members itemVar=\"~member\"}}\n    ...\n    {{if isActive}}\n      {{:~team.title}} {{:~member.name}}\n```\n\nSee also [this sample](#fortag@itemvar).",
        "anchor": "itemvar"
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
          },
          {
            "_type": "topic",
            "hash": "tagsapi@ctxparams",
            "label": "Accessing contextual parameters and helpers"
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
        "text": "When a template (containing nested template tags) is rendered, the result is a [view hierarchy](#views) -- where the views provide information on how the underlying data objects map to the rendered UI.\n\nOften it is helpful to be able to access the data for a *parent view* from a [*nested* template](#views@nestedtmpl) or [block](#tagsyntax@blocktag) (*nested view*).\n\nThere are several ways to get to *parent data*:\n\n- Create a *[contextual parameter](#contextualparams)* to pass a value to nested views.\n\n  Here are three examples:\n\n  ```jsr\n  ...\n  {{if ... ~teamTitle=title ~teamData=#data ~teamIndex=#index}}\n    ...\n    {{for ...}}\n      ...\n      {{:~teamTitle}} {{:~teamData.title}} {{:~teamIndex}}\n  ```\n\n- Use [`itemVar`](#contextualparams@itemvar) to provide a contextual parameter for the current data 'item' of a block, to be passed in to deeper nested contexts \n\n  ```jsr\n  ...\n  {{for members itemVar=\"~member\"}}\n    ...\n    {{props}}\n      ...\n      {{:~member.name}}\n  ```\n\n- Use the [`view.parent`](#viewobject@parent) property to step up through successive parent views (`#parent`, `#parent.parent` etc.):\n\n  ```jsr\n  ...\n  {{if ...}}\n    ...\n    {{for ...}}\n      ...\n      {{:#parent.parent.data.title}}\n  ```\n\n- Use the [`view.get(type)`](#viewobject@get) method to get to a parent view of a given `type`:\n\n  ```jsr\n  ...\n  {{if ...}}\n    ...\n    {{for ...}}\n      ...\n      {{:#get(\"if\").data.title}}\n\n  ```\n\n- Use the [`view.getIndex()`](#viewobject@getindex) method to get to the index of a parent *\"item\"* view:\n\n  ```jsr\n  {{if ...}}\n    ...\n    {{for ...}}\n      ...\n      {{:#parent.getIndex()}}\n      {{:#getIndex()}}\n  ```\n\nHere is a sample showing all of these methods:"
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
        "height": "290"
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
        "text": "*JsRender* will work well with your own 'hand-coded' *View Model* classes (see [below](#jsrmodel@vm)).\n\nBut in most cases it is simpler and better to use the [`$.views.viewModels(...)`](#jsrmodel@compilevm) API. This API lets you very easily and rapidly compile *View Model* classes for your own needs, following a standard pattern, and with some additional powerful features:\n\n- It provides a built-in mapping and unmapping feature for automatically converting from a plain object hierarchy (such as from a JSON request) to a hierarchy of *View Model* instances, or for converting back to plain data (such as for submitting to the server)\n- It also provides a `merge(...)` feature for incrementally updating the *View Model* hierarchy, using updated plain data from the server.\n",
        "anchor": "compiled"
      },
      {
        "_type": "para",
        "title": "Data / View Model with JsViews",
        "text": "All of the alternatives mentioned above (plain object hierarchies, hand-coded *View Model* classes, or JsRender *compiled View Model* classes) can also be used with *JsViews* data-binding and observable data. (For more information see *[JsViews: Data / View Model](#jsvmodel)* and *[JsViews: Compiled View Models](#jsvviewmodelsapi)*.)",
        "anchor": "jsviews"
      },
      {
        "_type": "para",
        "title": "<b>Example: JsRender with plain objects and arrays</b>",
        "text": " ",
        "anchor": "plain"
      },
      {
        "_type": "code",
        "title": "Suppose this is our data from a JSON request:",
        "code": "var person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n",
        "anchor": ""
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
        "height": "140",
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
        "text": "Here is the class definition for <em><b>Person</b></em>:\n\n```js\n// Constructor\nfunction Person(name, address, phones) {\n  // Initialize private properties\n  this._name = name;\n  this._address = address;\n  this._phones = phones;\n}\n\n// Prototype\nvar personProto = {\n  // Define a getter for each property \n  name: function() {\n    return this._name;\n  },\n  address: function() {\n    return this._address;\n  },\n  phones: function() {\n    return this._phones;\n  }\n};\n...\n```\n\nWe define exactly similar classes for our <em><b>Address</b></em> and <em><b>Phone</b></em> objects too.\n\nThe above pattern for *View Model* classes will work well with *JsRender*. (It will also work seamlessly with *JsViews* data-binding, if at some point you choose to upgrade to use *JsViews* features).\n\n*Note:* The standard JsRender *View Model* pattern provided by [`$.views.viewModels(...)`](#jsrmodel@compilevm) is similar, but provides also setters (along with optional *'observability'* for two-way binding in *JsViews*).",
        "anchor": "handvm"
      },
      {
        "_type": "para",
        "title": "Getter functions",
        "text": "Note that properties are now <em>getter</em> functions, which return the appropriate value (which may be of any type, including objects or arrays -- such as `address` and `phones` above).\n\nIn fact they are particular case of *[computed properties](#paths@computed)* -- a concept that can be used quite generally within *JsRender* and *JsViews*, not only for *View Model* properties.\n",
        "anchor": "getter"
      },
      {
        "_type": "para",
        "title": "Template",
        "text": "To convert our template from using plain objects to using *View Model* objects, the only change we need to make is to add parens for our properties, which are now <em>getter</em> functions:\n\n```jsr\n... \n{{:name()}}\n...\n{{:address().street()}}\n...\n{{for phones()}}\n  ...      \n  {{:number()}}\n  ...\n{{/for}}\n...\n```",
        "anchor": ""
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
        "height": "140",
        "jsrJsvJqui": "jsr",
        "title": "Render template against a View Model object hierarchy",
        "anchor": "vmsample"
      },
      {
        "_type": "para",
        "title": "Using the same function as both getter and setter",
        "text": "For properties which are <em>read-write</em>, the above *getter* functions can be replaced by a corresponding *getter/setter*, as follows: \n\n```js\nname: function(val) {\n  if (!arguments.length) {\n    return this._name; // If there is no argument, use as a getter\n  }\n  this._name = val;    // If there is a value argument, treat as a setter\n},\n```\n\nNote that when *JsRender* renders a template using a *get/set* property `{{:name()}}` it will *always call the function as a getter, not as a setter*. However the *setter* feature lets you modify the value of `name()` from code, using:\n\n```js\nsomePerson.name(\"newName\"); // setter\n```\n\nAlso, if you use the same *View Model* class with *JsViews* then the *setter* will be called:\n\n- when the user modifies a value with two-way data-binding such as `<input data-link=\"name()\" />`\n- when using `$.observable(person).setProperty(\"name\", \"newName\")` from code<br/>\n(See [JsViews Data/View Model](#jsvmodel) for details, and alternative *setter* patterns.)",
        "anchor": "setter"
      },
      {
        "_type": "para",
        "title": "Adding methods and computed properties to the View Model ",
        "text": "Typically a *View Model* does not only provide *getter* (or *get/set*) properties -- but also other methods or computed properties corresponding to the appropriate logic at that point in the application. For example, a *View Model* for a *Person* might include a `selectPhone(...)` method or a `fullName()` computed property.\n\n",
        "anchor": "methods"
      },
      {
        "_type": "para",
        "title": "<b>Example: Using JsRender compiled View Models, with $.view.viewModels(...)</b>",
        "text": "The built-in support in both *JsRender* and *JsViews* for compiled *View Models* makes it extremely easy to define *View Model* classes that include *get/set* properties using the pattern described above, along with any desired additional methods and computed properties. Simple calls to `$.views.viewModels(...)` allow you to compile *View Model* classes conforming to these patterns without having to manually write repetitive code for multiple such *get/set* properties.\n \nAnother advantage of the compiled *View Model* classes is when working with (or migrating to) *JsViews*. In that context the classes automatically become fully-fledged MVVM classes, with a rich range of features -- where the *Views* are observable data-linked templates.\n\nFor details on `$.views.viewModels` see: *[Compiled View Models](#viewmodelsapi)*.\n\nTo illustrate, let's convert our [sample above](#jsrmodel@vm) to use compiled *View Models*. At the same time we will add a `person.addPhone(...)` custom method to the `Person` View Model class, and we'll illustrate calling a setter -- `name(...)`:",
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
        "_type": "para",
        "title": "Accessing parent objects in the View Model hierarchy",
        "text": "Sometimes a *View Model* instance object needs to provide access to a parent object in the *View Model* hierarchy. \n\nCompiled *View Models* have built-in support for this:\n\nWhen instantiating a compiled *View Model*, two additional parameters can be passed to the constructor:\n\n- `parentRef` (*string*) -- the property name for accessing the parent object\n- `parent` (*object*) -- the parent object\n\nFor example, the following code will create a `phone` (instance of `Phone`) associated with a `person` (instance of `Person`):\n\n```\nvar phone = Phone(\"xxx xx xxxx\", \"person\", person);\n```\n\nNow `phone` will have a `phone.person` *'parentRef'* property,  where `phone.person === person`.\n\nThis is shown in the following sample. It is based on our previous sample, but here the `Phone` View Model has a `phone.description()` computed property that accesses both the `phone.number()` and the `person.name()` -- so the `phone` needs a reference to the parent object, `person`:\n\n(*__Note:__* See also the topic on the *[parentRef View Model option](#viewmodelsapi@parentref)* -- for providing access to parent objects when using [`map()`](#viewmodelsapi@map) to instantiate a complete *View Model* hierarchy from data.)",
        "anchor": "parentref"
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
            "text": "Template:\n\n```jsr\n...\n{{for phones()}}\n  <tr><td>{{:description(#index+1)}}</td></tr>\n{{/for}}\n...\n```\n\n*Person* View Model\n\n```js\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {\n    addPhone: function(phoneNo) {\n      var newPhone = Phone(phoneNo, \"person\", this); // With phone.person 'parentRef'\n      this.phones().push(newPhone);\n    }\n  }\n});\n```\n\n*Phone* View Model\n\n```js\nvar Phone = $.views.viewModels({\n  getters: [\"number\"],\n  extend: {\n    description: function(index) {\n      // Accesses the person 'parentRef', to get the person.name()\n      return this.number() + \" (\" + this.person.name() + \" phone\" + index + \")\";\n    }\n  }\n});\n```\n\nInstantiate person object, using *Person* View Model constructor\n\n```js\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  null // We will add phones below, when we have the person 'parentRef'\n);\n\n// Now add phones, passing in the person 'parentRef'\nperson.phones([\n  Phone(\"111 111 1111\", \"person\", person),  // With phone.person 'parentRef'\n  Phone(\"222 222 2222\", \"person\", person)   // With phone.person 'parentRef'\n]);\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<style>button {margin-bottom: 9px;}</style>\n\n<button id=\"changeName\">Change name</button>\n<button id=\"addPhone\">Add Phone</button>\n\n<div id=\"result\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {{for phones()}}\n          <tr><td>{{:description(#index+1)}}</td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n</script>",
        "code": "// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Person View Model\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {\n    addPhone: function(phoneNo) {\n      // Instantiate a phone with phone.person 'parentRef' \n      var newPhone = Phone(phoneNo, \"person\", this);\n      this.phones().push(newPhone);\n    }\n  }\n});\n\n// Phone View Model\nvar Phone = $.views.viewModels({\n  getters: [\"number\"],\n  extend: {\n    description: function(index) {\n      // Accesses the person 'parentRef', to get the person.name()\n      return this.number() + \" (\" + this.person.name() + \" phone\" + index + \")\";\n    }\n  }\n});\n\n// Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Instantiate person object, using Person View Model constructor\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  null // We will add phones below, when we have the person 'parentRef'\n);\n\n// Now add phones, passing in the person 'parentRef'\nperson.phones([\n  Phone(\"111 111 1111\", \"person\", person), // With phone.person 'parentRef'\n  Phone(\"222 222 2222\", \"person\", person)  // With phone.person 'parentRef'\n]);\n\n// Render template against person object (instance of Person)\n$(\"#result\").html(tmpl.render(person));\n\n// Button handlers\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n  $(\"#result\").html(tmpl.render(person));\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n  $(\"#result\").html(tmpl.render(person));\n});",
        "height": "190"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the following samples which use *parentRef* (with *View Model* constructors and/or using `map(data)`):\n\n- [*isManager* sample](#viewmodelsapi@sample-parentref) (JsRender)\n- [*isManager* sample](#jsvviewmodelsapi@ismanagersample) (JsViews)\n- [*Movies* sample](#samples/editable/compiled@parentref) (JsViews)\n- [*Movies* 'submit' sample](#samples/editable/submit) (JsViews)\n\n"
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
        "title": "",
        "text": "(See also *[Registering helpers](#helpersapi): The `$.views.helpers()` API*.)"
      },
      {
        "_type": "para",
        "title": "What are helpers?",
        "text": "JsRender templates are made up of HTML markup, text, and *template tags*. *Template tags* are used to evaluate data-paths or computed expressions, and insert those values into the rendered output.\n\nBut often the values you will want to insert are not actually taken from the data, but rather from other parameters or *metadata* which you want to use. And often you will want to process the values, using helper functions or other code, e.g. for converting values to other formats, or for computed values.\n\n*Helpers*, in JsRender, refers to any functions, objects, parameters or metadata which you want to provide, in addition to the actual data you passed to the [`render()`](#rendertmpl) method (or [`link()`](#jsvlinktmpl) method if you are using JsViews).\n\nHelpers can also be objects, arrays, etc.\n\nYou access helpers by prepending the `~` character. Here are some examples:\n\n```jsr\n{{:~myHelperValue}}\n{{:~myHelperFunction(name, title)}}\n{{for ~myHelperObject.mySortFunction(people, \"increasing\")}} ... {{/for}}\n```"
      },
      {
        "_type": "para",
        "title": "Passing in helpers",
        "text": "There are three ways to provide helpers:\n\n- Global helpers -- registered using [`$.views.helpers(myHelpers)`](#helpersapi)\n- Helpers registered for a specific template -- [`$.templates(\"mytmpl\", {markup: ..., helpers: myHelpers}`](#d.templates@resources)\n- Helpers passed in on a specific render call -- [`tmpl.render(data, myHelpers)`](#tmplrender@helpers)<br/>\n(Similarly you can [pass helpers](#jsvhelpers-converters) to JsViews `link()` calls)\n",
        "anchor": "types-of-helper"
      },
      {
        "_type": "para",
        "title": "Contextual parameters",
        "text": "In addition to providing helpers as above, you can also define *[contextual parameters](#contextualparams)* within a template, which you access using the same `~someName` syntax as for regular helpers. "
      },
      {
        "_type": "para",
        "title": "The <b>this</b> pointer, in a helper call",
        "text": "In a call to `~myHelperFunction()`, the `this` pointer is the current view (see [Accessing view objects](#viewobject@access)). However in the call to `~myHelperObject.mySortFunction()`, the `this` pointer is `myHelperObject`.",
        "anchor": "this"
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
        "height": "40",
        "anchor": "sample-global-helper"
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
        "height": "40",
        "anchor": "sample-tmpl-helper"
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
        "height": "40",
        "anchor": "sample-passed-in-helper"
      },
      {
        "_type": "para",
        "title": "For additional details and scenarios see:",
        "text": "[Registering helpers](#helpersapi): The `$.views.helpers()` API"
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
        "text": "In JsRender, a converter is a convenient way of processing or formatting a data-value, or the result of expression evaluation.\n\nYou use built-in converters to *HTML-encode*, *attribute-encode*, or *URL-encode*: \n\n```jsr\n{{html:movie.description}} - This data is HTML encoded\n{{>movie.description}} - (Alternative syntax) - This data is HTML encoded\n\n{{url:~getTheFilePath()}} - This expression will be URL-encoded\n```\n\nAnd you can register custom converters. For example you might register a date formatter or an upper-case converter:\n\n```jsr\n{{daymonth:invoice.date}} - This date uses my 'daymonth' formatter \n{{upper:name}} - This uses my 'upper' converter \n```\n\n(See: [sample](#converters@simple).)\n\nYou can also use converters with any JsRender tag, not just the `{{: ...}}` tag, using the following syntax:\n\n```jsr\n{{sometag convert='myconverter' ...}}\n```\n\n(See: [sample](#converters@fortag).)\n\n***Note:*** With JsViews, you can use converters with two-way data-binding, and you will have a <em>convert</em> and a <em>convertBack</em> converter -- one for each direction."
      },
      {
        "_type": "para",
        "title": "Registering converters",
        "text": "`$.views.converters()` is used to register converters.\n\nWith `$.views.converters(...)` you can:\n- register one or more converters globally, to be used in any template\n- add one or more converters as [private resources](#convertersapi@private) for a parent template",
        "anchor": "register"
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
        "text": "To unregister a previously registered <em>converter</em>, pass `null` to `$.views.converters()`:\n\n```js\n$.views.converters(\"myCvt\", null);\n// Named converter \"myCvt\" is no longer registered\n```",
        "anchor": "unregister"
      },
      {
        "_type": "para",
        "title": "Converter functions",
        "text": "In most cases a converter function will return a computed value based on the input parameter `val`:\n\n```js\nfunction myConverter(val) {\n  ... \n  return computedVal; // converted/encoded/formatted value for 'val'\n}\n```\n\nwhere `val` comes from the data value or expression passed to the tag `{{myconverter: someExpression}}`. \n\n(See: [sample](#converters@simple).)\n",
        "anchor": "function"
      },
      {
        "_type": "para",
        "title": "Converter function signature",
        "text": "However a converter can access multiple [tag arguments](#tagsyntax@tagparams), to produce the computed value which it provides to the tag. (See for example `{{fullname: first last ...}}`, in the [fullname sample](#converters@fullname).)\n\nFurthermore, the `this` pointer within the converter function is the [instance](#tagobject) of the tag, which allows it to access much more, including [named tag properties](#tagsyntax@tagparams) (`this.tagCtx.props...`), the full data object (`this.tagCtx.view.data`), and more...\n\n```js\nfunction myConverter(arg1, arg2, arg3 ...) {\n  var tag = this;\n  var namedTagParameters = tag.tagCtx.props; \n  ...\n  return computedArg1; // converted value for 'arg1' passed to tag\n}\n```\n\nHere is the *converterFn* API definition:",
        "anchor": "signature"
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
        "text": "A converter can be used on any tag, thanks to the syntax\n\n```jsr\n{{sometag ... convert=...}}\n```\n\nwhere `sometag` can be any custom tag, or a built-in tag such as `{{if}}` or `{{for}}`.\n\nSee the [sample](#converters@fortag) using `{{for people convert='extraItems'}}`, where the converter adds additional items to the array. \n\n(***Note:*** This syntax can actually be used with the `{{: ...}}` tag too -- by writing `{{:name convert='upper'}}`...)",
        "anchor": "any-tag"
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
            "text": "```jsr\n{{for people}}\n  ...\n  {{if #data ~root.team convert='inlist'}}\n  ...\n  {{else #data ~root.reserve field=\"name\"}}\n  ...\n  {{else}}\n  ...\n{{/for}}\n```\n\n```js\n// Converter function for looking for an item (first argument of tag) in a list (second argument of tag)\nfunction inlistConverter(item, list) {\n  // If no arguments, this is the final {{else}}.\n  ... // Return true\n\n  // If the tag has a 'field' property, look for the value of that field among the list items\n  ... // Return true if found\n\n  // If no field property, look for the item among the list items\n  ... // Return true if found\n\n  return false; // Not found\n}\n\n// Register 'inlist' converter just for the 'teamTmpl' template \n$.views.converters({inlist: inlistConverter}, teamTmpl);\n```"
          }
        ],
        "title": "'inlist' converter for {{if}} tag",
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n  <ul>\n    {{for people}}\n      <li>\n        <b>{{:name}}:</b>\n        {{if #data ~root.team convert='inlist'}}\n          Team member\n        {{else #data ~root.reserve field=\"name\"}}\n          Reserve\n        {{else}}\n          Not in team\n        {{/if}}\n      </li>\n    {{/for}}\n  </ul>\n</script>",
        "code": "var teamTmpl = $.templates(\"#teamTmpl\");\n\n// Converter function for looking for an item (first argument of tag) in a list (second argument of tag)\nfunction inlistConverter(item, list) {\n  // If no arguments, this is the final {{else}}\n  if (!list) {\n    return true; // Final else, so return true\n  }\n\n  var field = this.tagCtx.props.field;\n  var l = list.length;\n\n  // If the tag has a 'field' property, look for the value of that field among the list items\n  if (field) {\n    while (l--) {\n      if (item[field] === list[l]) {\n        return true; // Return true if found\n      }\n    }\n  }\n\n  // If no field property, look for the item among the list items\n  else {\n    while (l--) {\n      if (item === list[l]) {\n        return true; // Return true if found\n      }\n    }\n  }\n  return false; // Not found\n}\n\n// Register 'inlist' converter just for the 'teamTmpl' template \n$.views.converters({inlist: inlistConverter}, teamTmpl);\n\n// Define model \nvar model= {people: [\n    {name: \"Jo\"},\n    {name: \"Liza\"},\n    {name: \"Eli\"},\n    {name: \"Pete\"},\n    {name: \"Zoey\"}\n  ],\n  // Specify list of reserves, by name\n  reserve: [\"Eli\", \"Liza\"]\n};\n\n// Specify array of team members\nmodel.team = [model.people[0], model.people[3]];\n\n$(\"#result\").html(teamTmpl.render(model));\n",
        "jsrJsvJqui": "jsr",
        "height": "114",
        "anchor": "iftag"
      },
      {
        "_type": "para",
        "title": "Using helper functions, or dynamically assigning converters",
        "text": "The `convert=...` syntax allows you to assign a converter function without it being registered by name. For example it can be a data method or a helper function -- such as `{{sometag ... convert=~myConverterHelper}}`.\n\n(You can do this with the `{{: ...}}` tag too -- by writing `{{: ... convert=~myConverterHelper}}`...)\n\nYou can even assign a converter dynamically. For example you can write: `{{sometag ... convert=~getConverter(...)}}`, where the `getConverter()` helper might return either a string (for a converter registered by name) or a function to be used as converter.\n\nTo illustrate, here is a modified version of the previous sample, using `{{if ... convert=~getConverter()}}`:",
        "anchor": "function-converter"
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
        "height": "114",
        "title": "Dynamically assigning a converter"
      },
      {
        "_type": "para",
        "title": "Built-in converters:",
        "text": "JsRender has the following built-in converters/encoders:\n\n- Built-in HTML encoder: [`{{html: ...}}`](#convertersapi@html) -- accessed programmatically as [`$.views.converters.html()`](#convertersapi@html)\n- Built-in attribute encoder: [`{{attr: ...}}`](#convertersapi@attr) -- accessed programmatically as [`$.views.converters.attr()`](#convertersapi@attr)\n- Built-in URL encoder: [`{{url: ...}}`](#convertersapi@url) -- accessed programmatically as [`$.views.converters.url()`](#convertersapi@url)\n- Basic [encode/unencode converters](#convertersapi@encode)\n",
        "anchor": "builtin"
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
        "_type": "para",
        "title": "Minimalist HTML encode/unencode converters",
        "text": "\nIn addition JsRender and JsViews provide encode/unencode converters for minimal encoding to prevent HTML injection (see the JsViews topic: [*Encoding to avoid XSS*](#link2way@encode)), by encoding just `<` `>` and `&` by the corresponding HTML entities, and for unencoding back from entities to characters:\n\n`&` &harr; `&amp;`<br/>\n`<` &harr; `&lt;`<br/>\n`>` &harr; `&gt;`<br/>\n\n*Usage:*\n\n```js\nencodedValue = $.views.converters.encode(unencodedValue);\nunencodedValue = $.views.converters.unencode(encodedValue);\n```\n\n*Declarative usage:*\n\n```jsr\n{{encode:myExpression}}\n```",
        "anchor": "encode"
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
          },
          {
            "_type": "topic",
            "hash": "tagsapi@bindto",
            "label": "Custom tags: The bindTo / bindFrom options and converters"
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
        "text": "JsRender has the following built-in converters -- based on encoders:\n\n- Built-in HTML encoder: [`{{> ...}}`](#convertersapi@html)\n- Built-in attribute encoder: [`{{attr ...}}`](#convertersapi@attr)\n- Built-in URL encoder: [`{{url ...}}`](#convertersapi@url)",
        "anchor": "builtin"
      },
      {
        "_type": "para",
        "title": "Registering a converter",
        "text": "You can register your own custom converters, using [`$.views.converters()`](#convertersapi) as in:\n\n```js\n$.views.converters(\"upper\", function(val) {\n  // Convert data-value or expression to upper case\n  return val.toUpperCase();\n});\n```\n\nTo use the `\"upper\"` converter with the [`{{:...}}`](#assigntag) tag, you write:\n\n```jsr\n{{upper:...}}\n```\n\nHere it is in a sample:",
        "anchor": "register"
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
        "height": "80",
        "title": "A simple converter",
        "jsrJsvJqui": "jsr",
        "anchor": "simple"
      },
      {
        "_type": "para",
        "title": "Converter arguments",
        "text": "A converter can access any number of [tag arguments](#tagsyntax@tagparams), to produce the computed value which it provides to the tag:\n\n```js\n$.views.converters(\"myConverter\", function(arg1, arg2, arg3 ...) {\n```\n\nFurthermore, the `this` pointer within the converter function is the [instance](#tagobject) of the tag, which allows it to access much more, including [named tag properties](#tagsyntax@tagparams) (`this.tagCtx.props...`), the full data object (`this.tagCtx.view.data`), and more...\n\nThe following sample shows a `\"fullname\"` converter, which provides a computed ***full name*** based on the first two tag arguments (*first* and *last*) and an optional named tag parameter `reverse=true`:",
        "anchor": "args"
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
        "height": "80",
        "title": "Full name converter &ndash;  accessing multiple arguments",
        "anchor": "fullname"
      },
      {
        "_type": "para",
        "title": "Using converters with other tags",
        "text": "A converter can be used on any tag, thanks to the syntax\n\n```jsr\n{{sometag ... convert=...}}\n```\n\nwhere `sometag` can be any custom tag, or a built-in tag such as `{{if}}`.\n\n(*Note:* When using JsViews [two-way binding](#link2way@converters), similar syntax is available for *convertBack*: `convertBack=...`.)\n\nFor example, you could register an `\"inList\"` converter which returns true if `item` is found in `itemList` (see [sample](#convertersapi@iftag)):\n\n```jsr\n{{if convert='inList' item itemList}}...{{/if}}\n``` \n\nThe following sample shows the `{{for ...}}` tag used with a named converter which returns the array with additional appended and prepended items:",
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
            "text": "```js\n$.views.converters({\n  extraItems: function(arr) {\n    // return array with additional items\n    return [{name: \"Prepended\"}].concat(arr, {name: \"Appended\"});\n  }\n});\n```\n\n```jsr\n{{for people convert='extraItems'}}\n  ...\n```\n\n\n"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <ul>\n    {{for people convert='extraItems'}}\n      <li>{{:name}}</li>\n    {{/for}}\n  </ul>\n</script>",
        "code": "$.views.converters({\n  extraItems: function(arr) {\n    // return array with additional items\n    return [{name: \"Prepended\"}].concat(arr, {name: \"Appended\"});\n  }\n});\n\nvar model= {people: [\n  {name: \"Jo1\"},\n  {name: \"Jo2\"},\n  {name: \"Jo3\"}\n]};\n\nvar html = $(\"#myTmpl\").render(model);\n\n$(\"#result\").html(html);",
        "title": "Using converters with the {{for}} tag",
        "jsrJsvJqui": "jsr",
        "height": "114",
        "anchor": "fortag"
      },
      {
        "_type": "para",
        "title": "Using helper functions or data methods as converters",
        "text": "The `convert=...` syntax not only works on any tag, but also allows you to use not only registered converters, by name, as in\n\n```jsr\n{{for people convert='odd'}}\n```\n\nbut alternatively to use helpers, or data methods as in\n\n```jsr\n{{for people convert=utility.extraItems}} // Using data method\n```\n\nYou can also use that approach on `{{:..}}` tags as in\n\n```jsr\n{{:name convert=~hlp.bold}} // Using a helper\n```\n\nNote that the one tag which does not support this syntax is `{{>...}}` -- for which you would need instead to write:\n\n```jsr\n{{>~hlp.bold(name)}} // Using helper \n```\n\nHere is a modified version of the sample above, using helpers and data methods:",
        "anchor": "function-converter"
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
            "text": "```jsr\n...\n{{for people convert=utility.extraItems}}  {{!-- using data method --}}\n  <li>\n    {{:name convert=~hlp.bold}}    {{!-- using helper --}}\n...\n```"
          }
        ],
        "code": "var helpers = {\n  hlp: {\n    bold: function(val) {\n      return \"<b>\" + val + \"</b>\";\n    }\n  }\n};\n\nvar model= {people: [\n    {name: \"Jo1\"},\n    {name: \"Jo2\"},\n    {name: \"Jo3\"}\n  ],\n  utility: {\n    extraItems: function(arr) {\n    // return array with additional items\n    return [{name: \"Prepended\"}].concat(arr, {name: \"Appended\"});\n    }\n  }\n};\n\nvar html = $(\"#myTmpl\").render(model, helpers);\n\n$(\"#result\").html(html);",
        "html": "<div id=\"result\"></div>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <ul>\n    {{for people convert=utility.extraItems}}  {{!-- using data method --}}\n      <li>\n        {{:name convert=~hlp.bold}}    {{!-- using helper --}}\n      </li>\n    {{/for}}\n  </ul>\n</script>",
        "jsrJsvJqui": "jsr",
        "height": "114"
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
            "label": "Two-way binding (JsViews)"
          }
        ]
      },
      {
        "_type": "para",
        "title": "See also the following sample:",
        "text": "[Converters and encoding](#samples/jsr/converters)\n"
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
        "text": "JsRender can be loaded in the browser with or without jQuery, as in these example pages:\n\n- [JsRender with jQuery](#download/pages-jsr-jq)\n- [JsRender without jQuery](#download/pages-jsr)\n\nWhen jQuery is present:\n\n- JsRender loads as a jQuery plugin and adds APIs to the `jQuery` global namespace object -- usually aliased as `var $ = jQuery;`\n- The JsRender APIs are\n  - `$.views...`\n  - `$.templates(...)`\n  - `$.render...`. \n\nIf jQuery is not present:\n\n- JsRender automatically creates its own `jsrender` global namespace variable \n- JsRender APIs are the same as above, but they are now associated with the `jsrender` namespace variable: \n  - `jsrender.views...`\n  - `jsrender.templates(...)`\n  - `jsrender.render...`. \n\nFor convenience you can follow the jQuery approach of creating a global `$` -- set this time to `var $ = jsrender;`\n\nYou can then use the regular APIs: `$.views...`, `$.templates...`, `$.render...`, or copy code from the regular browser examples/samples -- *as if* using JsRender with jQuery.\n\nFor example:\n\n```js\nvar $ = jsrender; // Alias for the jsrender namespace object - referenced for convenience as var $\n\nvar tmpl = $.templates('Name: {{:first}} {{upper:last}}'); // Compile template from string\n\n$.views.converters('upper', function(val) {return val.toUpperCase()}); // Register converter\n \nvar data = {first: 'Jo', last: 'Ryan'};\n\nvar html = tmpl.render(data);\n// result: \"Name: Jo RYAN\" \n```\n\n***Note:*** The same approach can be used when using [JsRender on the server](#node/install@apis) with Node.js, where JsRender is also being used without jQuery. "
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
        "text": "After installing JsRender on the server (using `$ npm install jsrender`) it can then be included in the webpack client script bundle, and loaded in the browser.\n\nThere are three options for loading JsRender in the browser as a webpack module:\n\n- Load jQuery globally (as a script tag -- so `window.jQuery` is defined), then load JsRender as a module in the webpack client script bundle:\n  ```js\n  require('jsrender'); // Load JsRender as jQuery plugin (attached to global jQuery)\n  ```\n- Load both jQuery and JsRender as modules in the webpack client script bundle:\n  ```js\n  var $ = require('jquery'); // Load jQuery as a module\n  require('jsrender')($);    // Load JsRender as jQuery plugin (jQuery instance as parameter)\n  ```\n- Load JsRender as a module in the webpack client script bundle, without loading jQuery at all:\n  ```js\n  var jsrender = require('jsrender')(); // Load JsRender without jQuery (function call, no parameter)\n  ```\n\n***Note:*** In fact if jQuery is not defined globally, `require('jsrender')` returns a ***function***. \n\nCalling that function without a parameter then loads JsRender without jQuery (and returns the JsRender namespace). \n\nAlternatively, calling that function with a reference to a jQuery instance as parameter loads JsRender as a plugin (attached to that jQuery instance) -- and returns the jQuery instance.",
        "anchor": "jsrender"
      },
      {
        "_type": "para",
        "title": "Example &ndash; jQuery loaded globally:",
        "text": "**index.html:**\n\n```jsr\n<html><head>\n  <script src=\".../jquery...js\"></script> <!-- Load jQuery as global -->\n</head><body>\n  <div id=\"container\"></div>\n  <script src=\"bundle.js\"></script>\n</body></html>\n```\n\n**source.js:**\n\n```js\nrequire('jsrender'); // Load JsRender (jQuery is loaded as global)\nvar tmpl = $.templates('Name: {{:name}}');\nvar data = {name: 'Jo'};\nvar html = tmpl.render(data);\n$('#container').html(html);\n```\n\n**command line:**\n\n```bash\nwebpack ./source.js bundle.js\n```",
        "anchor": "jquery-global"
      },
      {
        "_type": "para",
        "title": "Example &ndash; jQuery loaded as module:",
        "text": "**index.html:**\n\n```jsr\n<html><body>\n  <div id=\"container\"></div>\n  <script src=\"bundle.js\"></script>\n</body></html>\n```\n\n**source.js:**\n\n```js\nvar $ = require('jquery'); // Load jQuery as a module\nrequire('jsrender')($);    // Load JsRender as jQuery plugin (jQuery instance as parameter)\nvar tmpl = $.templates('Name: {{:name}}');\nvar data = {name: 'Jo'};\nvar html = tmpl.render(data);\n$('#container').html(html);\n```\n\n**command line:**\n\n```bash\nwebpack ./source.js bundle.js\n```",
        "anchor": "jquery-module"
      },
      {
        "_type": "para",
        "title": "Example &ndash; JsRender without jQuery:",
        "text": "**index.html:**\n\n```jsr\n<html><body>\n  <div id=\"container\"></div>\n  <script src=\"bundle.js\"></script>\n</body></html>\n```\n\n**source.js:**\n\n```js\nvar jsrender = require('jsrender')(); // Load JsRender without jQuery\nvar tmpl = jsrender.templates('Name: {{:name}}');\nvar data = {name: 'Jo'};\nvar html = tmpl.render(data);\ndocument.querySelector('#container').innerHTML = html;\n```\n\n**command line:**\n\n```bash\nwebpack ./source.js bundle.js\n```",
        "anchor": "no-jquery"
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
        "text": "Using `$.views.viewModels()` to compile *View Models* brings some important advantages over plain object hierarchies or 'hand-coded' *View Models*:\n\n- Simple calls to `$.views.viewModels(...)` allow you to compile these *View Model* classes without having to manually write repetitive code for multiple such *get/set* properties\n- Using compiled *View Models* rather than plain objects makes it easier to have clean well-designed modular code, since each *View Model* has specific *getters*, *setters* and *methods*, and can have its own 'private' properties and state\n- The compiled *View Models* provide a built-in mapping and unmapping feature for automatically converting from a plain object hierarchy (such as from a JSON request) to a hierarchy of *View Model* instances, or for converting back to plain data (such as for submitting to the server)\n- They also provide a `merge(...)` feature for incrementally updating the *View Model* hierarchy, using updated plain data from the server\n- When working with (or migrating to) *JsViews* the compiled classes automatically become fully-fledged MVVM classes, with a rich range of features -- where the *Views* are observable data-linked templates. Updates to the *View Model* hierarchy, and calls to the *View Model* setters both trigger observable changes, with corresponding incremental updates to the *Views*. (For more information see *[JsViews: Data / View Model](#jsvmodel)* and *[JsViews: Compiled View Models](#jsvviewmodelsapi)*.)",
        "anchor": "advantages"
      },
      {
        "_type": "para",
        "title": "Using compiled View Models",
        "text": "The basic *use scenarios* of compiled *View Models* are as follows:\n- Using `$.views.viewModels(...)` to [register/compile](#viewmodelsapi@compile) *View Models* (`MyVM`)\n- Using a compiled View Model `MyVM` as [constructor/factory](#viewmodelsapi@construct) method -- `MyVM(...)` -- to create View Model instances (`myVmInstance`)\n- Using `MyVM.map(...)` to [convert](#viewmodelsapi@map) a plain object hierarchy (such as from a JSON request) to a hierarchy of *View Model* instances\n- Using `myVMInstance.merge(...)` to incrementally [update](#viewmodelsapi@merge) a *View Model* hierarchy, using updated plain data\n- Using `myVMInstance.unmap()` to [convert](#viewmodelsapi@unmap) a *View Model* hierarchy back to a plain object hierarchy\n\n"
      },
      {
        "_type": "para",
        "title": "<b>API: $.views.viewModels(...)</b>",
        "text": "To register a *View Model*, you call the `$.views.viewModels(...)` API -- with four alternative signatures:\n- `var MyVM = $.views.viewModels(viewModelOptions);`<br/>returning a compiled *View Model* \n- `$.views.viewModels(\"MyVM\", viewModelOptions);`<br/>registering a named *View Model*, accessible as `$.views.viewModels.MyVM`\n- `$.views.viewModels(namedViewModels);`<br/>where `namedViewModels` is a hash, declaring multiple named *View Models*\n- `$.views.viewModels(namedViewModels, myViewModels);`<br/>where `namedViewModels` is a hash, declaring multiple named *View Models* and `myViewModels` is a *View Models* collection (hash) which will provide access to the compiled *View Models*, as `myViewModels.MyVM`\n\nIn each case, the compiled *View Model* is specified by a `viewModelOptions` object, with a `getters: gettersArray` (specifying an array of *get/set* properties), and/or an `extend: extendObject` (specifying additional methods or properties).\n\nExample:\n\n```js\nvar Book = $.views.viewModels({   // Compile a Book View Model\n  getters: [\"title\", \"price\"],    // getters array - signature of constructor\n  extend: {                       // extend object - additional methods \n    placeOrder: function() { ... }\n  }\n});\n\nvar book1 = Book(\"Hope\", \"1.50\"); // Construct a Book View Model instance\nbook.price(\"2.50\");               // Modify price\nbook.placeOrder();                // Call method\n```\n",
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
                "text": "*Specifying **viewModelOptions** &ndash; details:*\n\n- The (optional) `getters` array.<br/>-- Each item in the array corresponds to a *get/set* property (and also a constructor argument, which initializes that *get/set* property).<br/>-- It must be either\n  - a string -- the `getterName`, or\n  - an object, which must have a *getter* property: `{getter: getterName}`.<br/><br/>If an object, it can additionally specify:<br/><br/>\n  - a *type* property: `type: viewModelName` -- specifying the name of another *View Model* type (declared in the same View Model collection). In this case then when using `map()` to map from data to a generated *View Model* hierarchy (see [View Model typed hierarchies](#viewmodelsapi@typed-hierarchy) below), data values for the *get/set* property will be mapped to instances of that *View Model*.\n  - a *defaultVal* property -- specifying the value to be used at initialization if `undefined` -- such as\n    - `defaultVal:  null` (a value) or,\n    - `defaultVal: function() { return ...; }` (a function, to return a computed value. The <code>this</code> pointer is the data item.) \n  - a [*parentRef*](#viewmodelsapi@parentref) property -- specifying the property name for accessing the parent object\n\n- The (optional) `extend` hash has additional members (methods or properties) to be included in the View Model prototype. The prototype will extend this object\n- The (optional) `id` is either a string (the name of a *View Model* property to be treated as **id**) or\na function. The specified *id* or the function call will be used for determining identity when `merge(...)` updates a *View Model* hierarchy (see [below](#viewmodelsapi@merge-unmap))"
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
        "text": "The `Book` View Model example above has simple *get/set* properties `[\"title\", \"price\"]` which are simple primitive types (string in this case).\n\nBut consider the `Person` *View Model*, used in the overview topic *[Data / View Model](#jsrmodel)*. Here a `person` object (whether a plain object or a *View Model* instance) is in fact a hierarchy of objects, since the `address` and `phones` properties of a `Person` are themselves objects (an `Address` object and a `Phone` array)\n\nHere is a `person` plain object/hierarchy (obtained perhaps by 'evaluating' JSON data from the server): \n\n```js\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n```\n\nTo map this object hierarchy to the corresponding *View Model* hierarchy we need to define three *View Models*:\n\n```js\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n```\n\nWe can then instantiate the corresponding *View Model* hierarchy, using constructors:\n\n```js\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n```\n\nSee the [sample](#jsrmodel@compilevmsample) in the *[Data / View Model](#jsrmodel)* topic.",
        "anchor": "hierarchy"
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
        "text": "When specifying `getters` in the `$.views.viewModels(...)` call, you can declare the type of a *get/set* property. For example an `address` *get/set* property can be specified as being of type `Address` -- where `Address` is another *View Model* declared on the same collection.\n\nBy specifying View Model types for properties (and declaring those View Models in the same collection) you obtain a *'View Model typed hierarchy'*.\n\n",
        "anchor": "typed-hierarchy"
      },
      {
        "_type": "para",
        "title": "Using MyViewModel.map(...) to map a whole object hierarchy to a View Model instance hierarchy",
        "text": "In the case of a *'View Model typed hierarchy'*, simply pass the top-level plain object to the `map()` method for the top-level *View Model* class, and all *View Model* instances in the hierarchy will be correctly instantiated:\n\n*Compile View Model classes (typed hierarchy):* \n\n```js\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // Declare 'name' as being a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // Declare 'address' as being an Address (View Model) type\n     {getter: \"phones\", type: \"Phone\"}     // Declare 'phones' as being (an array) of Phone (View Model) types\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone: ...\n});\n```\n\n*Person data (plain object hierarchy, or JSON string):*\n\n```js\nvar personData = {\n    name: \"Pete\",\n    address: {street: \"1st Ave\"},\n    phones: [{number: \"111 111 1111\"}, ...]\n  };\n```\n\n*Use map() to convert from `personData` plain object hierarchy (or JSON string) to `person` *View Model* hierarchy:*\n\n```js\nvar person = $.views.viewModels.Person.map(personData);\n```\n\nThe getter properties then let you traverse the hierarchy, call methods, etc.\n\n```\nperson.name(\"newName\");                   // Use setter: change name\nperson.addPhone(...);                     // Call method: add phone\nvar phone2 = person.phones()[1].number(); // Traverse and use getter: get number\n```\n\nLet's modify the [sample](#jsrmodel@compilevmsample) in *[Data / View Model](#jsrmodel)* to use the `map(...)` approach:",
        "anchor": "map-hierarchy"
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
        "text": "When working with View Model typed hierarchies, there are two additional features that can be used together with the `map()` feature:\n\n- If later you obtain updated JSON data, `personData2`, you can use `merge()` ([below](#viewmodelsapi@merge)) to trigger an incremental update to the *View Model* hierarchy:\n  ```js\n  person.merge(personData2);\n  ```\n- If values are modified (using setters, or methods) you can at any time can use `unmap()` ([below](#viewmodelsapi@unmap)) to convert back to plain data, but with updated values:\n  ```js\n  var updatedPersonData = person.unmap();\n  ```",
        "anchor": "merge-unmap"
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
        "text": "If a *View Model* hierarchy (or array of *View Model* instances) was created by mapping from data, using the `map()` feature above, then the View Model instances (and arrays) will each have an `unmap()` method (in addition to the `merge()` method mentioned above):\n\n```js\nvar person = Person.map(personData1);\nperson.addPhone(newPhone);\nperson.name(newName)\nvar modifiedPersonData = person.unmap();          // Convert back to a plain object hierarchy\n```\n\nor for an array:\n\n```js\nvar peopleArray = Person.map(peopleDataArray1);\npeopleArray[1].address().street(newStreet)        // Make changes anywhere in the peopleArray\nvar modifiedPeopleDataArray = people.unmap();     // Convert back to a plain object array\n```\n\nOr, deeper in the hierarchy:\n\n```js\nvar person = Person.map(personData1);\nperson.addPhone(newPhone);\nvar modifiedPhonesArray = person.phones.unmap();  // Get a plain object array for person.phones\n```",
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
        "text": "The next sample is similar to the [previous](#viewmodelsapi@mergesample) one, but specifically highlights some of the advanced features of compiled *View Models*.\n\n- Instead of storing compiled *View Models* on `$.views.viewModels` (e.g. `$.views.viewModels.Person`), it stores them  on a `myVmCollection` hash, as a *View Model typed collection*, (e.g. `myVmCollection.Person`), using the API:<br/>\n  `$.views.viewModels({ Person: {...}, ... }, myVmCollection)`;             \n- It maps from an array of 'people' rather than a single person:<br/>\n  `var people = Person.map(peopleData);`\n- It specifies an `id` key for `Person`. When updating the `phones` array the `id` value is treated as 'primary key', and used to map 'identity':<br/>\n  `id: \"id\"`\n- It provides an `id()` callback on `Person`, for determining identity -- allowing identification of corresponding *View Model* instances within the people array, and hence preventing unnecessary disposal and re-instantiation (which would destroy state, such as the `comment` value).\n- It has a `comment()` get/set property that is added as part of the `extend` definition, not the `getters`, so it is not initialized from data, in the constructor. Note therefore that if you set a *comment* on each `person` instance, then click *Update*, then *Revert*, one *comment* is conserved (since that instance is never disposed -- based on the 'identity' determination) but the other is lost since the instance is disposed and then re-created by *Revert*:<br/>\n  `extend: {...comment: comment...}`\n- It has `defaultVal` specified for `name`, `address` and `phones`, either as 'static' values or computed by a callback function:<br/>\n  `address: {type: \"Address\", defaultVal: defaultStreet}`\n- It overrides the generated `person.name()` *get/set* by a `myNameGetSet` function which includes logging\n- It passes a JSON string to `merge()` or `map()`\n(See also the [same sample](#jsvviewmodelsapi@mergesampleadv) using JsViews and data-linking.)",
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
            "text": "```js\n// Custom function for Person.isManager get/set property\nfunction myIsManager(val) {\n  if (!arguments.length) {          // If there is no argument, use as a getter\n    return this === team.manager(); // true if this member is the manager\n  }\n  if (val) {                        // Setting this.isManager(true)\n    team.manager(this);             // So make this team member manager\n  } else if (this.isManager()) {    // Setting this.isManager(false) and this team member is currently manager\n    team.manager(null);             // So set team manager to null\n  }\n}\n\n// Compile View Models\n$.views.viewModels({\n  Team: {...},\n  Person: {\n    getters: [\"name\", ... ],\n    extend: {\n      isManager: myIsManager // use custom function\n    }\n  },\n  Address: {...}\n});\n...\n\n// Instantiate View Models\nvar team = $.views.viewModels.Team.map(teamData);\n\n//Initialize second team member to be manager.\nvar manager = team.members()[1];\nmanager.isManager(true);\n...\n\n// Attach handler for checkbox\n$(\"#result\")\n  .on(\"change\", \".isManager\", function() {\n    ...\n    member.isManager(this.checked); // Set/unset isManager() for this member\n    renderTemplate(); // Refresh rendering, with modified data\n  })\n  ...\n```"
          }
        ],
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n\n<button class=\"noManager\">No Manager</button>\n<button class=\"changeManager\" data-index=\"0\">Set Manager 0</button>\n<button class=\"changeManager\" data-index=\"1\">Set Manager 1</button>\n<button class=\"changeManager\" data-index=\"2\">Set Manager 2</button>\n\n<h4>Team members:</h4>\n\n<table>\n  <thead><tr><td>Is Manager</td><td>Name</td><td>Street</td><td>ZIP</td></tr></thead>\n  <tbody>\n    {{for members()}}\n      <tr><td><input class=\"isManager\" type=\"checkbox\"\n        data-index=\"{{:#index}}\"\n        {{:isManager() ? 'checked' : ''}}\n      /></td>\n      <td>{{:name()}}</td>\n      <td>{{:address().street()}}</td>\n      <td>{{:address().ZIP()}}</td>\n      </tr>\n    {{/for}}\n  </tbody>\n</table>\n\n{{if manager()}}\n  <h4>Manager:</h4>\n  <table><tbody><tr>\n    <td>{{:manager().name()}}</td>\n    <td>{{:manager().address().street()}}</td>\n    <td>{{:manager().address().ZIP()}}</td>\n  </tr></tbody></table>\n{{else}}\n  <h4>No manager</h4>\n{{/if}}\n\n</script>",
        "code": "// Compile template\nvar tmpl = $.templates(\"#teamTmpl\");\n\n// Custom function for Person.isManager get/set property\nfunction myIsManager(val) {\n  if (!arguments.length) {          // If there is no argument, use as a getter\n    return this === team.manager(); // true if this member is the manager\n  }\n  if (val) {                        // Setting this.isManager(true)\n    team.manager(this);             // So make this team member manager\n  } else if (this.isManager()) {    // Setting this.isManager(false) and this team member is currently manager\n    team.manager(null);             // So set team manager to null\n  }\n}\n\n// Compile View Models\n$.views.viewModels({\n  Team: {\n    getters: [\n      { getter: \"manager\", type: \"Person\" },\n      { getter: \"members\", type: \"Person\" }\n    ]\n  },\n  Person: {\n    getters: [\n      \"name\",\n      { getter: \"address\", type: \"Address\" }\n    ],\n    extend: { isManager: myIsManager } // use custom function\n  },\n  Address: {\n    getters: [\"street\", \"ZIP\"]\n  }\n});\n\n// Initial data  \nvar teamData = {\n    members: [\n      { name: \"Pete\", address: { street: \"1st Ave\", ZIP: \"12345\" } },\n      { name: \"Bess\", address: { street: \"Central Way\", ZIP: \"98765\" } },\n      { name: \"Henry\", address: { street: \"Main St\", ZIP: \"54321\" } }\n    ],\n    manager: null,\n  };\n\n// Instantiate View Models\nvar team = $.views.viewModels.Team.map(teamData);\n\n//Initialize second team member to be manager.\nvar manager = team.members()[1];\nmanager.isManager(true);\n\nfunction renderTemplate() {\n  // Refresh template rendering completely\n  $(\"#result\").html(tmpl.render(team));\n}\n\nrenderTemplate();\n\n// Attach handlers for checkbox and buttons\n$(\"#result\")\n  .on(\"change\", \".isManager\", function() {\n    var memberIndex = $(this).data(\"index\"),\n      member = team.members()[memberIndex];\n    member.isManager(this.checked); // Set/unset .isManager() for this member \n    renderTemplate(); // Refresh rendering, with modified data\n  })\n  .on(\"click\", \".changeManager\", function() {\n    var memberIndex = $(this).data(\"index\"),\n      member = team.members()[memberIndex];\n    member.isManager(true);\n    renderTemplate(); // Refresh rendering, with modified data\n  })\n  .on(\"click\", \".noManager\", function() {\n    team.manager(null);\n    renderTemplate(); // Refresh rendering, with modified data\n  }\n);",
        "title": "Extending Person with  an isManager property",
        "height": "294",
        "jsrJsvJqui": "jsr",
        "anchor": "ismanager"
      },
      {
        "_type": "para",
        "title": "Accessing parent objects",
        "text": "In the sample above, the `Person.isManager()` computed property accesses the `team` object, in code such as:\n\n```js\nteam.manager(this); // Need to set the team.manager() \n```\n\nIn fact the `team` object is the parent object in the hierarchy, but it is accessed here as a 'global' var.\n\nThis code would be much better encapsulated if each team member `person` object had a `person.team` property (a pointer back to the parent `team` object) so we could write\n\n```js\nthis.team.manager(this); // Set this person as manager on the parent team \n```\n\nThis can be done using the *'parentRef'* option:",
        "anchor": "accessparent"
      },
      {
        "_type": "para",
        "title": "The parentRef option: providing access to the parent object in a viewModel hierarchy",
        "text": "Sometimes a *View Model* instance object needs to provide access to a parent object in the *View Model* hierarchy.\n\nThe topic [*Accessing parent objects in the View Model hierarchy*](#jsrmodel@parentref) shows how this can be achieved when creating *View Model* instances using the *View Model* as a constructor (by passing in additional parameters, `parentRef` *string* and `parent` *object*).\n\nWhen using `map()` to create a whole hierarchy of View Model instances from data, providing access to parent objects is even easier. Simply specify a *'parentRef'* option on the getter for a child object (or array of objects) that needs to access the parent object.\n\nFor example:\n\n```js\nTeam: {\n  getters: [\n    ...\n    { getter: \"members\", type: \"Person\", parentRef: \"team\" },\n    ...\n  ]\n},\n```\n\nNow each of the member `person` objects has a `person.team` property referencing the parent `team` object.\n\nThis is used in the following sample -- a variant of our previous [`isManager`](#viewmodelsapi@ismanager) sample, in which we have an array of *teams* and each *team* can set a *member* as *manager*: ",
        "anchor": "parentref"
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
            "text": "*Person.isManager()* get/set property accesses the `team` parent object\n\n```js\nfunction myIsManager(val) {\n  if (!arguments.length) {       // If there is no argument, use as a getter\n    return this === this.team.manager(); // true if this member is the manager\n  }\n  if (val) {                     // Setting this.isManager(true)\n    this.team.manager(this);     // So make this team member manager\n  ...\n```\n\n*View Models* -- with a *parentRef* for `members()`, to reference parent `team` \n\n```js\n$.views.viewModels({\n  Team: {\n    getters: [\n      { getter: \"members\", type: \"Person\", parentRef: \"team\" }\n      ...\n```\n\n*Initial data* -- an array of teams\n\n```js\nvar teamData = [\n  { members: [{ name: \"Pete\", ... }] ... },\n  { members: [{ name: \"Jenny\", ... }] ... }\n];\n```\n\n*Instantiate View Models*\n\n```js\nvar teams = $.views.viewModels.Team.map(teamData);\n```\n\n*Initialize* -- set the manager for each team\n\n```js\nteams[0].members()[1].isManager(true);\nteams[1].members()[0].isManager(true);\n```\n"
          }
        ],
        "title": "Using a parentRef to provide access to parent object",
        "jsrJsvJqui": "jsr",
        "height": "495",
        "html": "<div id=\"result\"></div>\n\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\n\n<h3>Team {{:#index+1}}</h3>\n\n<button class=\"noManager\" data-teamid=\"{{:#index}}\">No Manager</button>\n<button class=\"changeManager\" data-memberid=\"0\" data-teamid=\"{{:#index}}\">Set Manager 0</button>\n<button class=\"changeManager\" data-memberid=\"1\" data-teamid=\"{{:#index}}\">Set Manager 1</button>\n\n<table>\n  <thead><tr><td>Is Manager</td><td>Name</td><td>Street</td><td>ZIP</td></tr></thead>\n  <tbody>\n    {{for members() ~teamid=#index}}\n      <tr><td><input class=\"isManager\" type=\"checkbox\"\n        data-memberid=\"{{:#index}}\"\n        data-teamid=\"{{:~teamid}}\"\n        {{:isManager() ? 'checked' : ''}}\n      /></td>\n      <td>{{:name()}}</td>\n      <td>{{:address().street()}}</td>\n      <td>{{:address().ZIP()}}</td>\n      </tr>\n    {{/for}}\n  </tbody>\n</table>\n\n{{if manager()}}\n  <h5>Manager:</h5>\n  <table><tbody><tr>\n    <td>{{:manager().name()}}</td>\n    <td>{{:manager().address().street()}}</td>\n    <td>{{:manager().address().ZIP()}}</td>\n  </tr></tbody></table>\n{{else}}\n  <h4>No manager</h4>\n{{/if}}\n\n</script>",
        "code": "// Compile template\nvar tmpl = $.templates(\"#teamTmpl\");\n\n// Custom function for Person.isManager get/set property\nfunction myIsManager(val) {\n  if (!arguments.length) {       // If there is no argument, use as a getter\n    return this === this.team.manager(); // true if this member is the manager\n  }\n  if (val) {                     // Setting this.isManager(true)\n    this.team.manager(this);     // So make this team member manager\n  } else if (this.isManager()) { // Setting this.isManager(false) and this team member is currently manager\n    this.team.manager(null);     // So set team manager to null\n  }\n}\n\n// Compile View Models\n$.views.viewModels({\n  Team: {\n    getters: [\n      { getter: \"members\", type: \"Person\", parentRef: \"team\" },\n      { getter: \"manager\", type: \"Person\" }\n    ]\n  },\n  Person: {\n    getters: [\n      \"name\",\n      { getter: \"address\", type: \"Address\" }\n    ],\n    extend: {\n      isManager: myIsManager // use custom function\n    }\n  },\n  Address: {\n    getters: [\"street\", \"ZIP\"]\n  }\n});\n\n// Initial data (an array of teams)\nvar teamData = [\n  { members: [\n    { name: \"Pete\", address: { street: \"1st Ave\", ZIP: \"12345\" } },\n    { name: \"Bess\", address: { street: \"Central Way\", ZIP: \"98765\" } }\n    ],\n    manager: null,\n  },\n  {\n    members: [\n      { name: \"Jenny\", address: { street: \"Main St\", ZIP: \"10101\" } },\n      { name: \"Xavier\", address: { street: \"Broadway\", ZIP: \"66666\" } }\n    ],\n    manager: null,\n  }];\n\n// Instantiate View Models\nvar teams = $.views.viewModels.Team.map(teamData);\n\nteams[0].members()[1].isManager(true); // Initialize second member as manager of team[0].\nteams[1].members()[0].isManager(true); // Initialize first member as manager of team[1].\n\nfunction renderTemplate() {\n  // Refresh template rendering completely\n  $(\"#result\").html(tmpl.render(teams));\n}\n\nrenderTemplate();\n\n// Attach handlers for checkbox and buttons\n$(\"#result\")\n  .on(\"change\", \".isManager\", function() {\n    var member = teams[$(this).data(\"teamid\")].members()[$(this).data(\"memberid\")];\n    member.isManager(this.checked); // Set/unset this team member as manager\n    renderTemplate(); // Refresh rendering, with modified data\n  })\n  .on(\"click\", \".changeManager\", function() {\n    var member = teams[$(this).data(\"teamid\")].members()[$(this).data(\"memberid\")];\n    member.isManager(true); // Make this team member manager\n    renderTemplate(); // Refresh rendering, with modified data\n  })\n  .on(\"click\", \".noManager\", function() {\n    var team = teams[$(this).data(\"teamid\")];\n    team.manager(null); // Make this team have no manager\n    renderTemplate(); // Refresh rendering, with modified data\n  }\n);",
        "anchor": "sample-parentref"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the following JsViews samples which use *parentRef* (with *View Model* constructors and/or using `map(data)`):\n\n- [*isManager* sample](#jsvviewmodelsapi@ismanagersample)\n- [*Movies* sample](#samples/editable/compiled@parentref)\n- [*Movies* 'submit' sample](#samples/editable/submit)"
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
  },
  "globals": {
    "title": "Global jQuery extensions",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "*JsRender* adds the following extensions to the jQuery object, `$` (or to the `jsrender` namespace if using [JsRender without jQuery](#nojqueryapi)):\n\n- ***$.render:***\n  - See [`$.render.myTmpl()`](#d.render)\n- ***$.templates:***\n  - See [`$.templates()`](#d.templates)\n- ***$.views:***\n  - See [`$.views`](#viewsobject)\n\nIt also adds the following 'plugin' extension to jQuery instances:\n\n- ***$(\"#myTmpl\").render(...):***\n  - See [`$(\"#myTmpl\").render()`](#db.render)\n\nSee also [JsViews globals](#jsvglobals)"
      }
    ]
  },
  "tagsapi": {
    "title": "Registering custom tags: $.views.tags()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "`$.views.tags()` is used to register custom tags. See *[Using custom tags](#tags)* for an overview, and simple examples.\n\nThis topic provides more details, including sections:\n\n- [Registering custom tags](#tagsapi@register)\n- [Custom tag options: Specifying init(), render(), template, baseTag](#tagsapi@options)\n- [Tag context](#tagsapi@context)\n- [Custom tag child views](#tagsapi@childviews)\n- [Rendering else blocks](#tagsapi@elseblocks)\n- [Custom tag hierarchy](#tagsapi@parents)\n- [Accessing contextual parameters and helpers](#tagsapi@ctxparams)\n- [Advanced options](#tagsapi@advanced)\n- [Methods and properties available on a custom tag instance](#tagsapi@instanceprops)\n- [Adding tags as private resources for a parent template](#tagsapi@privatetags)"
      },
      {
        "_type": "para",
        "title": "What is a custom tag?",
        "text": "JsRender custom tags are named tags `{{mytag ...}}`, which you can register, and then use in your templates.\n\nA custom tag can optionally use arguments (*args*) and named properties (*props*), [as in](#tagsyntax@tagparams):\n\n```jsr\n{{mytag arg0 arg1 namedProp1=xxx namedProp2=yyy}} ... {{/mytag}}\n```\n\n*__Note:__* When you also use JsViews, custom tags acquire a whole new dimension. -- They become [*tag controls*](#jsvtagcontrols), and you can build rich and complex single page apps cleanly and simply using custom tag controls -- following an MVP or MVVM coding pattern. "
      },
      {
        "_type": "para",
        "title": "Specifying tag options for a custom tag",
        "text": "The following tag declaration registers a `{{mytag}}` custom tag:\n\n```js\n$.views.tags(\"mytag\", tagOptions);\n```\n\nThe `tagOptions` object (hash) specifies the tag options and determines how the tag will function. It can include:\n\n- An [init()](#tagsapi@init) method: `init: tagInitFn`\n- A [render()](#tagsapi@render) method: `render: tagRenderFn`\n- A [template](#tagsapi@template): `template: tagTemplate`\n\nIn addition `tagOptions` can specify tag inheritance (so that the custom tag derives from a base tag):\n\n- [`baseTag: ...`](#tagsapi@basetag)\n\nIt can also specify the following more advanced options (see also the [tag object](#tagobject) documentation):\n\n- [`contentCtx: ...`](#tagsapi@contentctx)\n- [`convert: ...`](#tagsapi@convert)\n- [`argDefault: ...`](#tagsapi@argdefault)\n- [`bindTo: ...` / `bindFrom: ...`](#tagsapi@bindto)\n- [`flow: ...`](#tagsapi@flow)\n- [`ctx: ...`](#tagsapi@ctx)\n"
      },
      {
        "_type": "para",
        "title": "<b>Registering custom tags: $.views.tags(...)</b>",
        "text": "To register a custom tag, you call the `$.views.tags(...)` API.\n\nThere are four alternative signatures:\n\n- `$.views.tags(\"mytag\", tagOptions);` -- where the properties of the `tagOptions` object will typically include a `render: tagRenderFn` (specifying a render() method), and/or a `template: tagTemplate` (specifying a template to be rendered)\n- `$.views.tags(\"mytag\", tagRenderFn);` -- simplified form, when the only option being specified is a render() method\n- `$.views.tags(\"mytag\", tagTemplate);` -- simplified form, when the only option being specified is a tag template to be rendered\n- `$.views.tags(namedTags);` This version is for declaring multiple custom tags, and `namedTags` is a hash (with custom tag names as keys and `tagOption` objects as values)\n\nHere are the details:",
        "anchor": "register"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.views.tags(...)",
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
                "description": "A tagOptions object with a render() method and/or a template property, and optionally other properties or methods"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.tags(\"mytag\", {\n  render: function(...) {...},\n  template: ...\n});\n\n{{mytag ...}} ... {{/mytag}}",
            "description": "Register a custom tag, specifying chosen tag options",
            "returns": ""
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
                "name": "tagRenderFn",
                "type": "function",
                "optional": false,
                "description": "Tag render() method. Returns the rendered tag"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.tags(\"mytag\", function(...) {\n  ...return rendered content\n});\n\n{{mytag ...}} ... {{/mytag}}",
            "description": "Register a simple 'render' function as a custom tag",
            "returns": ""
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
                "type": "object or string",
                "optional": false,
                "description": "A string containing template markup to be rendered by the tag (or a selector for a script block template definition, or a compiled template object)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.tags(\"mytag\", \"templateMarkup...\");\n\n{{mytag ...}} ... {{/mytag}}",
            "description": "Register a template as a custom tag",
            "returns": ""
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
                "description": "Object (hash) of keys (name of tag) and values (render function, template, or tagOptions object)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.tags({\n  mytag1: {\n    render: function(val) {...},\n    template: ...\n  },\n  mytag2: function(val) {...},\n  mytag3: tag3TemplateString,\n});",
            "description": "Register multiple custom tags",
            "returns": ""
          }
        ],
        "description": "Register one or more custom tags",
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
        "text": "For simple samples showing the above alternative `$.views.tags(...)` signatures, see the [*Using custom tags*](#tags) overview topic:\n\n- [A custom tag using just a render() method](#tags@render-sample)\n- [A custom tag using just a template](#tags@template-sample)\n- [Accessing context within the render() method](#tags@context-sample)\n- [Accessing context from the tag template](#tags@tmplcontext-sample)\n\nThe [*Using custom tags*](#tags) overview also provides samples of custom tags which render block content -- `{{mytag}}...{{/mytag}}`:\n\n- [Rendering block content from a custom tag render() method](#tags@renderblock-sample)\n- [Rendering block content from a custom tag template](#tags@tmplblock-sample)\n- [A {{runningTotal}} custom tag, using a render() method](#tags@runningtotal-sample)\n- [A {{runningTotal}} custom tag, with render() method and a template as \"fallback\"](#tags@renderplustmpl-sample)",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">Custom tag options: Specifying <i>init()</i>, <i>render()</i>, <i>template</i>, <i>baseTag</i>:</span>",
        "text": "A custom tag in JsRender has a very simple *'life-cyle'* consisting of two events for which you can optionally provide event handlers: the `init()` event, followed by the `render()` event. (If the custom tag is used in the context of JsViews, additional lifecycle events will also come into play, for data-binding, disposal, etc.)",
        "anchor": "options"
      },
      {
        "_type": "para",
        "title": "Providing an init() method",
        "text": "The *init()* method acts as a handler for the *init* event of the custom tag, and is called with the tag instance as `this` parameter.\n\n```js\n$.views.tags(\"mytag\", {\n  init: function(tagCtx, linkCtx, ctx) { ... },\n  ...\n});\n``` \n\nThe *init()* method arguments are:\n- `tagCtx`: the [tagCtx object](#tagctxobject), also available as `this.tagCtx`\n- `linkCtx`: always 0 unless using [data-linked tags](#linked-tag-syntax) with *JsViews* (See [linkCtx object](#linkctxobject).)\n- `ctx`: [View context object](#ctxobject)\n\nThe following example uses the *init()* method to set the tag template based on the value of the `mode` prop:",
        "anchor": "init"
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
            "text": "*Tag declaration:*\n\n```js\n$.views.tags(\"mytag\", {\n  init: function(tagCtx) {\n    this.template = tagCtx.props.mode === \"a\"\n      ? \"template A ...\"\n      : \"template B ...\";\n  }\n});\n```\n\n*Tag usage:*\n\n```jsr\n{{mytag name mode='a' /}}\n{{mytag name mode='b' /}}\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {{mytag name mode='a' /}}\n  {{mytag name mode='b' /}}\n</script>\n\n<div id=\"page\"></div>\n\n",
        "code": "$.views.tags(\"mytag\", {\n  init: function(tagCtx) {\n    this.template = tagCtx.props.mode === \"a\"\n      ? \"template A: <em>{{:}}</em> aaa<br/>\"\n      : \"template B: <em>{{:}}</em> bbb<br/>\";\n  }\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  html = myTmpl.render({name: \"Jo\"});\n\n$(\"#page\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "60",
        "anchor": "initsample",
        "title": "Providing init()"
      },
      {
        "_type": "para",
        "title": "Providing a render() method",
        "text": "The *render()* method acts as a handler for the *render* event of the custom tag, and is called with the tag instance as `this` parameter, and with arguments `arg1, arg2, ...`, corresponding to the unnamed arguments passed in the tag markup, `{{mytag expression1 expression2 ...  }}`.\n\nIf no arguments are passed in the markup, then the `render()` method will be called with the current data context as argument (unless modified by the [argDefault](#tagsapi@argdefault) option.)\n\n```js\n$.views.tags(\"mytag\", {\n  render: function(value1, value2) { ... return ...; },\n  ...\n});\n```\n\nThe *render()* method can optionally be used to define how the tag renders, by returning an HTML markup string.\n\nSee the example: [*A custom tag using just a render() method*](#tags@render-sample).\n",
        "anchor": "render"
      },
      {
        "_type": "para",
        "title": "Providing a template",
        "text": "The *template* option is used for declarative rendering, as an alternative to providing a *render()* method.\n\nSee the example: [*A custom tag using just a template*](#tags@template-sample).\n",
        "anchor": "template"
      },
      {
        "_type": "para",
        "title": "Data context of a tag template",
        "text": "If the custom tag is called with an argument: `{{mytag someArgument ...}}` then the template will be rendered using the value of that argument as data context.\n\nOtherwise, the data context will be the same as the outer data context.\n\n(*Note:* This behavior can be changed using [contentCtx](#tagsapi@contentctx)) \n"
      },
      {
        "_type": "para",
        "title": "Using both a template and a render() method",
        "text": "If the tag has both a *render()* method and a *template*, then the *render()* method is used to render the tag. But if *render()* returns `undefined` (or has no return value), then the *template* is used. \n\nSee example: [*A {{runningTotal}} custom tag, with render() method and a template as \"fallback\"*](#tags@renderplustmpl-sample).\n\nIt is also possible to provide both a *template* and a *render()* method, and to make use of the rendered template within the content returned by the render method.  (In fact `this.tagCtx.render(...)` will return the rendered template). ",
        "anchor": "tmpl-fallback"
      },
      {
        "_type": "para",
        "title": "Specifying tag inheritance: the baseTag option",
        "text": "A custom tag can inherit from another tag (either built-in or custom).\n\nFor example the `{{runningTotal}}` sample, linked above, can be rewritten in a more powerful but compact form, by making it inherit from the `{{for}}` tag (since the functionality of iterating over an array is common to both).\n\nTo inherit from another tag, set the `baseTag` option to the name of the tag you want to derive from:\n\n```js\n$.views.tags(\"runningTotal\", {\n  baseTag: \"for\",\n  ...\n});\n```\n\nCustom tag methods (*init()* or *render()*) can invoke the corresponding base tag method by calling one of the following API variants:\n\n```js\nthis.base(a, b, ...); // Pass chosen arguments\nthis.baseApply(arguments); // Pass on the calling arguments (or an array of args)\n```\n\nThis is illustrated in the following sample, which takes the *Providing init()* [sample](#tagsapi@initsample) above, and defines a derived `{{mytag2}}` which overrides *init()* and adds an error message when no valid `mode` was specified:\n",
        "anchor": "basetag"
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
            "text": "*Tag declaration:*\n\n```js\n$.views.tags(\"mytag2\", {\n  baseTag: \"mytag\",\n  init: function() { // Override the init() method\n    this.baseApply(arguments);  // Call the base method\n    this.template = this.template || \"Error: Specify mode 'a' or 'b'\"; // If no template was assigned, render error message\n  }\n});\n```\n\n*Tag usage:*\n\n```jsr\n{{mytag2 name mode='a' /}}\n{{mytag2 name mode='b' /}}\n{{mytag2 name /}}\n```"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {{mytag2 name mode='a' /}}\n  {{mytag2 name mode='b' /}}\n  {{mytag2 name /}}\n</script>\n\n<div id=\"page\"></div>\n\n",
        "code": "$.views.tags(\"mytag\", {\n  init: function(tagCtx) {\n    this.templates = {\n      a: \"template A: <em>{{:}}</em> aaa<br/>\",\n      b: \"template B: <em>{{:}}</em> bbb<br/>\"\n    }; \n    this.template = this.templates[tagCtx.props.mode];\n  }\n});\n\n$.views.tags(\"mytag2\", {\n  baseTag: \"mytag\",\n  init: function() { // Override the init() method\n    this.baseApply(arguments);  // Call the base method\n    // If no template was assigned, render error message\n    this.template = this.template || \"Error: Specify mode 'a' or 'b'\";\n  }\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  html = myTmpl.render({name: \"Jo\"});\n\n$(\"#page\").html(html);",
        "jsrJsvJqui": "jsr",
        "height": "75",
        "anchor": "basetagsample",
        "title": "baseTag"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The previous `{{runningTotal}}` [sample](#tags@renderplustmpl-sample) was relatively complex. Here is an updated version rewritten to derive from `{{for}}`:"
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
            "text": "This version is much simpler and supports sorting, filtering, etc. as well as `start=... end=... step=...`, without any additional code (thanks to the inherited features of `{{for}}`).\n\nAlso the fallback rendering for *No line items* is no longer hard-coded in the tag, but instead uses the `{{runningTotal}}...{{else}}...` pattern.\n\nNote that `~total()` is a function. The call to `~total()` increments the value and returns the running total.\n\n*Tag declaration:*\n\n```js\n$.views.tags(\"runningTotal\", {\n  baseTag: \"for\",\n  ctx: {\n    total: function() {                    // A ~total() helper (now a function)\n      ...\n      tag.totalVal += this.data[totalCol]; // Compute running total\n      return tag.totalValue;               // Return value from ~total()\n    }\n  },\n  render: function() {\n    this.totalVal = 0;                     // Initialize total before rendering\n    return this.baseApply(arguments);      // Render\n  }\n});\n```\n\n*Tag usage:*\n\n```jsr\n{{runningTotal lineItems start=1 end=4 totalColumn=\"quantity\"}} \n  ...{{:~total()}}...\n{{else}}\n  ...No line items...\n{{/runningTotal}}\n```\n"
          }
        ],
        "jsrJsvJqui": "jsr",
        "height": "244",
        "title": "A {{runningTotal}} custom tag derived from {{for}}",
        "header": "<style>table {margin: 10px 0;} .total {background-color: #f2f7f7;}</style>",
        "action": "append",
        "html": "<div id=\"lineItems\"></div>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <em>start=1 end=4:</em>\n  <table><tbody>\n    <tr><th>Quantity</th><th>Total</th></tr>\n    {{runningTotal lineItems start=1 end=4 totalColumn=\"quantity\"}} \n      <tr>\n        <td>{{:quantity}}</td>\n        <td class=\"total\">{{:~total()}}</td>\n      </tr>\n    {{else}}\n      <tr><td colspan=\"2\">No line items</td></tr>\n    {{/runningTotal}}\n  </tbody></table>\n\n  <em>start=4 end=5:</em>\n  <table><tbody>\n    <tr><th>Quantity</th><th>Total</th></tr>\n    {{runningTotal lineItems start=4 end=5 totalColumn=\"quantity\"}} \n      <tr>\n        <td>{{:quantity}}</td>\n        <td class=\"total\">{{:~total()}}</td>\n      </tr>\n    {{else}}\n      <tr><td colspan=\"2\">No line items</td></tr>\n    {{/runningTotal}}\n  </tbody></table>\n</script>",
        "code": "$.views.tags(\"runningTotal\", {\n  baseTag: \"for\",\n  ctx: {\n    total: function() {                    // A ~total() helper (now a function)\n      var tag = this.ctx.tag,\n        totalCol = tag.tagCtx.props.totalColumn\n      tag.totalVal += this.data[totalCol]; // Compute running total\n      return tag.totalVal;                 // Return value from ~total()\n    }\n  },\n  render: function() {\n    this.totalVal = 0;                     // Initialize total before rendering\n    return this.baseApply(arguments);      // Render\n  }\n});\n\nvar data = {\n  lineItems: [\n    {category: \"book\", quantity: 2, price: 3.40},\n    {category: \"grocery\", quantity: 5, price: 1.01},\n    {category: \"grocery\", quantity: 2, price: 13.10},\n    {category: \"book\", quantity: 1, price: 12.50}\n  ],\n  lineItems2: []\n};\n\nvar html = $(\"#myTmpl\").render(data, {\n  category: function(item, index, items) {\n    return item.category === this.props.category;\n  }\n});\n\n$(\"#lineItems\").html(html);",
        "anchor": "derivedfor"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Our `{{runningTotal}}` [samples](#tagsapi@derivedfor) so far have initialized the running total to `0` in the render method, and then relied on the rendering process to do the incrementing of the running total. This approach would fail if the rendering sequence was changed for any reason.\n\nThe sample below takes the `{{runningTotal}}` tag above, and converts it to a more complete and more powerful \n `{{purchases}}` tag, again deriving from the `{{for}}` tag. This `{{purchases}}` tag is more flexible and more robust, and supports any number of running total columns.\n\nThe `~total(expression)` helper function now allows you to provide any expression as parameter. Here, running total values are recomputed for each line, separately, so no longer depend on the render processing sequence.\n\nIn addition, `{{purchases}}` lets you filter rows, based on the `category`:\n\n"
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
            "text": "The `~total(expr)` helper function now accepts an *expression* parameter for each running total -- to be used to compute the incremental amount for each row.\n\n*Tag declaration:*\n\n```js\n$.views.tags(\"purchases\", {\n  baseTag: \"for\",\n  ctx: {\n    total: function(expr) {              // A ~total(expression) helper\n      var tmpl = $.templates[expr]       // Get named compiled template for expression, or else...\n                 || $.templates(expr, \"{{:\" + expr + \"}}\"), // ...if this is first call, create it\n\n        runningTotal = 0,\n        view = this,                     // The content view with the ~total(...) helper call\n        items = view.get(\"array\").data,\n        rowIndex = view.getIndex();\n\n      for (var i = 0; i <= rowIndex; i++) {\n        runningTotal += +tmpl(items[i]); // Compute running total up to this row, using render function\n      }                                  // of compiled tmpl (either tmpl() or tmpl.render()...)\n      return runningTotal;               // Return value from ~total(...)\n    }\n  }\n});\n```\n\n*Tag usage:*\n\n```jsr\n{{purchases lineItems sort=\"category\" filter=~category category=\"book\"}} \n  ...{{:~total('quantity*price')}}...\n{{else}}\n  ...No items...\n{{/purchases}}\n```\n\n*Provide category filter helper:*\n\n```js\nfunction categoryFilter(item, index, items) {\n  var str = this.props.category; // Filter items. (Test whether item.category contains the tagCtx.props.category string)\n  return str ? item.category.toLowerCase().indexOf(str.toLowerCase()) !== -1 : true;\n}\n...\nvar html = $(\"#myTmpl\").render(purchases, {category: categoryFilter});\n```"
          }
        ],
        "header": "",
        "action": "append",
        "html": "",
        "code": "",
        "jsrJsvJqui": "jsr",
        "height": "680",
        "url": "samples/jsrender/tags/extend-for/sample-tag1",
        "title": "A {{purchases}} tag supporting totals for any expression",
        "anchor": "totals-expr"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that the `{{purchases}}` tag above incorporates the `~total(...)` helper, but requires the category filter helper `filter=~category` to be passed in. See the [*Extending the {{for}} tag*](#samples/jsr/tags/extend-for) sample for an improved `{{purchases}}` tag which provides better encapsulation by incorporating also the category filter.\n\nSee also the [sorting and filtering](#samples/sort-filter@jsv-tag) samples topic, which includes adding JsViews data-linking to the tag, providing a precursor to a fully-fledged `{{grid}}` control."
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">Tag context</span>",
        "text": "When a custom tag is used in a template then the rendered template instance will be part of the [view hierarchy](#views).\n\nThe instance of the tag is an object with properties and methods:\n\n- [tag object](#tagobject)\n\nAssociated with the tag instance is a [tag context object](#tagctxobject), `tagCtx`, providing most of the useful context for a tag, in particular:\n\n- context passed down through the view hierarchy:\n\n  - current view\n  - current data\n  - parent tags\n  - [contextual parameters](#contextualparams)<br/>(see also [*Accessing contextual parameters and helpers*](#tagsapi@ctxparams))\n\n- additional context coming from the tag itself, or its markup:\n\n  - arguments (*args*) and named properties (*props*)\n  - rendered tag template\n  - block content\n  - content of else blocks\n",
        "anchor": "context"
      },
      {
        "_type": "para",
        "title": "Accessing the tag instance object",
        "text": "From a tag method (*init()* or *render()*), the `this` pointer is the instance of the tag (a [tag object](#tagobject).)\n\nFrom a tag template, the tag instance can be accessed as `~tag`.\n"
      },
      {
        "_type": "para",
        "title": "Accessing the tag context object: tagCtx",
        "text": "From a tag method the `tagCtx` object is available as `this.tagCtx`.\n\nIn the [*init()*](#tagsapi@render) method it is also passed directly as an argument (`function(tagCtx ...)`).\n\nFrom a tag template, `tagCtx` can be accessed as `~tagCtx`.\n"
      },
      {
        "_type": "para",
        "title": "Accessing the tag arguments or named properties",
        "text": "The values of arguments can be accessed as `tagCtx.args`, and named properties as `tagCtx.props`.\n\nFor example, if we have the following tag, which has two arguments and one named property:\n\n```jsr\n{{sometag title name mode=\"edit\"}}\n```\n\nthen from within the *init()* or *render()* method of `sometag`, the arguments and named properties can be accessed as:\n\n```js\nvar title = this.tagCtx.args[0];\nvar name = this.tagCtx.args[1];\nvar mode = this.tagCtx.props.mode;\n```\n\nand from the tag template, the values can be accessed as `~tagCtx.args` or  `~tagCtx.props`, and so might be rendered as: \n\n```jsr\n...title: {{>~tagCtx.args[0]}}<br/>name: {{>~tagCtx.args[1]}}<br/>mode: {{>~tagCtx.props.mode}}...\n```\n\nIn addition to being available as `tagCtx.args`, arguments are also passed directly as arguments to the *render()* method, so `sometag` might use the following *render()* method, rather than a template, to render similar content:\n\n```js\nfunction sometagRenderMethod(title, name) {\n  return \"...title: \" + title + \"<br/>name: \" + name + \"<br/>mode: \" + this.tagCtx.props.mode ...;\n}\n```\n\nThe `tagCtx` object also provides access to the markup expression for arguments and named properties, as `tagCtx.params.args` and `tagCtx.params.props`.\n\n(*Note:* Tag property names can include alphanumeric characters, `_`, `$` and `.` characters -- as in `{{mytag some_$4.Name=... /}}`. If the name includes `.` characters, use the syntax `tagCtx.props[\"some_$4.Name\"];` to access the value. The '-' character is not supported in property names.)"
      },
      {
        "_type": "para",
        "title": "Accessing the parent view and the current data",
        "text": "The contextual (parent) view for the tag instance is accessed as `tagCtx.view`. The corresponding (parent) data context is `tagCtx.view.data`."
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">Custom tag child views</span>",
        "text": " ",
        "anchor": "childviews"
      },
      {
        "_type": "para",
        "title": "Custom tag rendering with template:  \"mytag\" child view",
        "text": "A custom tag template instance will be part of the [view hierarchy](#views), and the rendered tag may add additional child views to the view hierarchy.\n\nIf `{{mytag members}}` renders using its *template*, that template will render as a child view (of type `\"mytag\"`). The default data context within the *template* will be the first argument passed to the tag (`members` in this case) which will be the `view.data` property of the child view.\n\nIf the *template* markup includes template tags (other custom tags, or built-in tags) then there will be corresponding additional child views below the *mytag* view.  \n\n",
        "anchor": "tagview"
      },
      {
        "_type": "para",
        "title": "Rendering wrapped block content",
        "text": "- Any tag can wrap [block content](#tagsyntax@blocktag), or use `tmpl=...` to reference external content:\n  ```jsr\n  {{mytag}}...{{/mytag}}\n\n  {{mytag tmpl=... /}}\n  ```\n- By default, a custom tag with no *render()* method or tag template will render its block content unchanged. A tag with an argument will move data context to the data passed in the argument: `{{mytag somedata ...}}`.\n- For a custom tag rendering using a *render()* method, wrapped block content can be included using `tagCtx.render()`.<br/><br/>*Note:* To set the inner data context, pass in data as argument: `tagCtx.render(someData)`. Otherwise inner and outer data context are the same.\n  ```js\n  $.views.tags(\"mytag\", {\n    ...\n    render: function() {\n      return ... + this.tagCtx.render() + ...;\n    },\n    ...\n  });\n  ```\n  See the sample: [*Rendering block content from a custom tag render() method*](#tags@renderblock-sample).<br/><br/>\n  (For advanced scenarios the block content is also available as a compiled template object: `tagCtx.content`, so can be rendered using `tagCtx.content.render()`. See the [template as fallback](#tags@tmpl-fallback) sample).<br/><br/>\n- For a custom tag rendering using a tag template, wrapped block content can be included using:\n  ```jsr\n  {{include tmpl=#content/}}\n  ```\n  or equivalently:\n  ```jsr\n  {{include tmpl=~tagCtx.content/}}\n  ```\n  where in each case the inner data context can be modified by passing an argument, `{{include someData tmpl=... /}}`.\n  See the sample: [*Rendering block content from a custom tag template*](#tags@tmplblock-sample).\n\nNote that if a custom tag has an external `tmpl=...` reference, **_and_** inline block content, then the external template takes precedence. However, the external template can behave as a wrapper, wrapping the inline block content (see: [*Wrapping content*](#tagsyntax@wrap)).\n\nThis can provide for cascading content, as in the following sample:\n\n```jsr",
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
            "text": "```js\n$.views.tags(\"mytag\", {\n  template: \"mytagStart...{{include tmpl=#content/}}.../mytagEnd\"\n});\n```\n```jsr\n{{mytag tmpl='#external'}}wrappedContent{{/mytag}}\n```\n\n```jsr\n<script id=\"external\" ...>\n  externalTmplStart...{{include tmpl=#content/}}.../externalTmplEnd\n</script>\n\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {{mytag tmpl='#external'}}<b>wrappedContent</b>{{/mytag}}\n</script>\n\n<script id=\"external\" type=\"text/x-jsrender\">\n  externalTmplStart<br/>{{include tmpl=#content/}}<br/>/externalTmplEnd\n</script>\n\n<div id=\"page\"></div>\n",
        "code": "$.views.tags(\"mytag\", {\n  template: \"mytagStart<br/>{{include tmpl=#content/}}<br/>/mytagEnd\"\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {},\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "height": "106",
        "title": "Cascading content"
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">Rendering else blocks</span>",
        "text": "Any tag can use [`{{else}}`](#elsetag) blocks. We might for example create a custom tag for rendering lists:\n\n```jsr\n{{list}}\n  First item\n{{else}}\n  Second item\n{{else}}\n  Last item\n{{/list}}\n```\n\nA custom tag can provide specific behavior/rendering for `{{else}}` blocks:\n\n- For a tag with a render method, *render()* will be called once for the initial block and once for each `{{else}}` block.\n- Similarly, for a custom tag with a tag template, the template will be rendered once for the initial block and once for each `{{else}}` block.\n- During rendering a custom tag can detect which block is being rendered, using `tagCtx.index` (see below), and can then output the content corresponding to the desired functionality.\n",
        "anchor": "elseblocks"
      },
      {
        "_type": "para",
        "title": "Tag context objects for {{else}} blocks: the tagCtxs array",
        "text": "A tag with multiple blocks (initial block plus 1 or more `{{else}}` blocks) will have a `tagCtxs` array of `tagCtx` objects, one for each block.\n\n- From a tag method the `tagCtxs` array is available as `this.tagCtxs`.\n- From a tag template, `tagCtxs` can be accessed as `~tag.tagCtxs`.\n\nEach `tagCtx` object in `tagCtxs` has an `index` property (`0` for the initial block), as well as the other properties (`args`, `props` etc.) corresponding to the markup (arguments, named properties...) on the corresponding tag (`{{mytag ...}}` or `{{else ...}}`).\n\n- Within a tag *render()* method, `this.tagCtx` will be the current tag context object for that block.\n- Similarly, during rendering of the tag template, `~tag.tagCtx` will be the current `tagCtx`.\n\nTo determine the index of the block being rendered, use `tagCtx.index`. \n\nThese features are illustrated in the following sample:",
        "anchor": "tagctxs"
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
            "text": "*Custom `{{list}}` tag:*\n\n```js\n$.views.tags(\"list\", function() {\n  // render() method\n  var ret = \"\", // Return value\n    index = this.tagCtx.index, // block index\n    listElem = this.tagCtxs[0].props.numbered ? \"ol\" : \"ul\"; // Wrapper <ol> or <ul> element, based on numbered=true property \n\n  if (index===0) {\n    ret += \"<\" + listElem + \">\"; // First block: add opening wrapper\n  }\n  ret += \"<li>\" + this.tagCtx.render() + \"</li>\"; // Add li element and block content\n  if (index===this.tagCtxs.length-1) {\n    ret += \"</\" + listElem +  \">\"; // Last block: add closing wrapper\n  }\n  return ret;\n});\n```\n\n*Usage*:\n\n```jsr\n{{list numbered=true}}First{{else}}Second{{else}}Last{{/list}}\n{{list}}first{{else}}last{{/list}}\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "code": "// Define custom {{list}} tag\n$.views.tags(\"list\", function() {\n  // render() method\n  var ret = \"\", // Return value\n    index = this.tagCtx.index, // block index\n    listElem = this.tagCtxs[0].props.numbered ? \"ol\" : \"ul\"; // Wrapper <ol> or <ul> element, based on numbered=true property \n\n  if (index===0) {\n    ret += \"<\" + listElem + \">\"; // First block: add opening wrapper\n  }\n  ret += \"<li>\" + this.tagCtx.render() + \"</li>\"; // Add li element and block content\n  if (index===this.tagCtxs.length-1) {\n    ret += \"</\" + listElem +  \">\"; // Last block: add closing wrapper\n  }\n  return ret;\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  html = myTmpl.render();\n\n$(\"#page\").html(html);\n",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {{list numbered=true}}First{{else}}Second{{else}}Last{{/list}}\n  {{list}}first{{else}}last{{/list}}\n</script>\n\n<div id=\"page\"></div>\n\n",
        "height": "130",
        "title": "Custom {{list}} tag using {{else}} blocks"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is a version of the sample with the same tag implemented using a tag template, rather than a *render()* method.\n\nHere we use the *init()* method to assign a tag template dynamically, using a different wrapper (`ol` or `ul`) based on the `numbered` named property:"
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
            "text": "*Custom `{{list}}` tag:*\n \n```js\n$.views.tags(\"list\", {\n  init: function() {\n    var listElem = this.tagCtx.props.numbered ? 'ol' : 'ul'; // Wrapper ol or ul element\n    this.template = \n      // First block: add opening wrapper\n      \"{{if ~tagCtx.index===0}}<\" + listElem + \">{{/if}}\"\n      // Add li element and block content\n      + \"<li>{{include tmpl=#content/}}</li>\"\n      // Last block: add closing wrapper\n      + \"{{if ~tagCtx.index===~tag.tagCtxs.length-1}}</\" + listElem + \">{{/if}}\";\n  }\n});\n```"
          }
        ],
        "jsrJsvJqui": "jsr",
        "height": "130",
        "title": "Custom {{list}} tag: Rendering {{else}} blocks from a tag template",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {{list numbered=true}}First{{else}}Second{{else}}Last{{/list}}\n  {{list}}first{{else}}last{{/list}}\n</script>\n\n<div id=\"page\"></div>\n\n",
        "code": "// Define custom {{list}} tag\n$.views.tags(\"list\", {\n  init: function() {\n    var listElem = this.tagCtx.props.numbered ? 'ol' : 'ul'; // Wrapper ol or ul element\n    this.template = \n      // First block: add opening wrapper\n      \"{{if ~tagCtx.index===0}}<\" + listElem + \">{{/if}}\"\n      // Add li element and block content\n      + \"<li>{{include tmpl=#content/}}</li>\"\n      // Last block: add closing wrapper\n      + \"{{if ~tagCtx.index===~tag.tagCtxs.length-1}}</\" + listElem + \">{{/if}}\";\n  }\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  html = myTmpl.render();\n\n$(\"#page\").html(html);\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Custom tags with no *render()* method and no tag template can also render multiple blocks, using `{{else}}`. Here is an example:"
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
            "text": "Custom `{{mytag}}` which simply renders each block as is:\n\n```js\n$.views.tags(\"mytag\", {});\n```\n\nThe default data context of each block is the value passed to the first argument.\n\n```jsr\n{{mytag last}}\n  First:  <em>{{:}}</em>...\n{{else first}}\n  ...\n{{else phone}}\n  ...\n{{/mytag}}\n```\n"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {{mytag last}}\n    First: <em>{{:}}</em><br/>\n  {{else first}}\n    Last: <em>{{:}}</em><br/>\n  {{else phone}}\n    Phone: <em>{{:}}</em><br/>\n  {{/mytag}}\n</script>\n\n<div id=\"page\"></div>\n\n",
        "code": "// Define custom {{mytag}} tag\n$.views.tags(\"mytag\", {});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {first: \"Jo\", last: \"Blow\", phone: \"111-111-1111\"},\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);\n\n",
        "title": "Default behavior for custom tag with {{else}} blocks",
        "height": "72"
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">Custom tag hierarchy &ndash; Accessing parent tags</span>",
        "text": "Custom tags form a hierarchy, and can be designed with functionality or rendering that is based on parent or child tags within that hierarchy, as in the following example where a `{{layout}}` tag determines the layout for child `{{cell}}` tags:\n",
        "anchor": "parents"
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
            "text": "```jsr\n{{layout 'vertical'}}\n  {{cell}}one{{/cell}}\n  {{cell}}two{{/cell}}\n{{/layout}}\n<hr/>\n{{layout 'horizontal'}}\n  {{cell}}one{{/cell}}\n  {{cell}}two{{/cell}}\n{{/layout}}\n```\n"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {{layout 'vertical'}}{{cell}}one{{/cell}}{{cell}}two{{/cell}}{{/layout}}\n  <hr/>\n  {{layout 'horizontal'}}{{cell}}one{{/cell}}{{cell}}two{{/cell}}{{/layout}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\n  layout: {\n    render: function(mode) {\n      if (mode === \"vertical\") {\n        this.vertical = true;\n        return \"<table>\" + this.tagCtx.render() + \"</table>\";\n      } else {\n        return \"<table><tr>\" + this.tagCtx.render() + \"</tr></table>\";\n      }\n    }\n  },\n  cell: {\n    render: function() {\n      return this.parents.layout.vertical\n        ? \"<tr><td>\" + this.tagCtx.render() + \"</td></tr>\"\n        : \"<td>\" + this.tagCtx.render() + \"</td>\";\n    }\n  }\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = { name: \"Jo\" },\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "height": "140",
        "header": "<style>\ntd {padding:5px; border:solid 1px gray; font-family:Arial,sans-serif; font-size:15px;}\n</style>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following properties provide access to ancestor custom tags:\n\n**parents property:**\n\nThe [`parents`](#tagobject@parents) property is a hash of all the ancestor custom tags. In the above sample the `{{cell}}` instances have a `{{layout}}` ancestor tag, which can be accessed from the `this.parents` hash, as `this.parents.layout`. In the sample this is used to determine whether the assigned layout is vertical, and to render accordingly:\n\n```js\nrender: function() {\n  return this.parents.layout.vertical\n    ? \"<tr><td>\" + this.tagCtx.render() + \"</td></tr>\"\n    : \"<td>\" + this.tagCtx.render() + \"</td>\";\n}\n```\n\n**parent property:**\n\nThe tag instance also has a [`parent`](#tagobject@parent) property -- which is the nearest ancestor custom tag. In the above sample, the `parent` of the `{{cell}}` instance is the `{{layout}} instance`, so we could have replaced `this.parents.layout...` by `this.parent...`, in the above code.\n\n**~parentTags contextual parameter:**\n\nThe `ctx` property of a tag instance also has a `parentTags` property, equivalent to the `parents` hash. This can be used in the following alternative implementation of the `{{cell}}` tag above, using a tag template rather than a *render()* method:\n\n```js\n$.view.tags(\"cell\", {\n  template:\n    \"{{if ~parentTags.layout.vertical}}<tr><td>{{include tmpl=#content/}}</td></tr>\"\n    + \"{{else}}<td>{{include tmpl=#content/}}</td>{{/if}}\"\n});\n```\n\nIn fact, in a tag template `~parentTags` and `~tag.parents` are equivalent.\n\n**Note:** The tag hierarchy accessed using the above properties such as `tag.parent` consists *__only__* of custom tags. More precisely, it is the hierarchy of [*non-flow tags*](#tagsapi@flow). The built-in tags (`{{for}}`, `{{if}}` etc.) are all flow tags (`flow: true`) whereas custom tags by default have `flow: false`."
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">Accessing contextual parameters and helpers</span>",
        "text": "- From a tag template:\n  - [Contextual parameters](#contextualparams) and helpers can be accessed using `~myParamOrHelper`\n- From a tag method:\n  - Contextual parameters and helpers can be accessed using [`this.ctxPrm(\"myParamOrHelper\")`](#tagobject@ctxprm)\n  - (Note: contextual parameters can also be accessed using `this.ctx.myParamOrHelper`, and global helpers can be accessed using `$.views.helpers(\"myHelper\")` or `$.views.helpers.myHelper`)\n- From other contexts:\n  - Contextual parameters and helpers can be accessed using [`view.ctxPrm(\"myParamOrHelper\")`](#viewobject@ctxprm)\n\n(See also [*Tag Context*](#tagsapi@context))\n\nAs an advanced example of custom tag rendering based on contextual parameters, here is a modified version of the above *layout* sample, where instead of wrapping `{{cell}}` tags in a `{{layout}}` tag, we instead wrap in a simple `{{include}}` on which we set a contextual parameter specifying layout: `layout='vertical'`:",
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
            "text": "```jsr\n{{include ~layout='vertical'}}\n  {{cell}}one{{/cell}}\n  {{cell last=true}}two{{/cell}}\n{{/include}}\n<hr/>\n{{include ~layout='horizontal'}}\n  {{cell}}one{{/cell}}\n  {{cell last=true}}two{{/cell}}\n{{/include}}\n```\n"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  {{include ~layout='vertical'}}\n    {{cell}}one{{/cell}}\n    {{cell last=true}}two{{/cell}}\n  {{/include}}\n  <hr/>\n  {{include ~layout='horizontal'}}\n    {{cell}}one{{/cell}}\n    {{cell last=true}}two{{/cell}}\n  {{/include}}\n</script>\n\n<div id=\"page\"></div>",
        "code": "$.views.tags({\n  cell: {\n    render: function() {\n      var res = \"\",\n        vertical = this.ctxPrm(\"layout\") === \"vertical\",\n        parentView = this.tagCtx.view.parent,\n        cellIndex = parentView.cellIndex = parentView.cellIndex === undefined ? 0 : parentView.cellIndex +1;\n      if (vertical) {\n        if (cellIndex===0) {\n          res += \"<table>\";\n        }\n        res += \"<tr><td>\" + this.tagCtx.render() + \"</td></tr>\";\n        if (this.tagCtx.props.last) {\n          res += \"<table>\";\n        }\n      } else {\n        if (cellIndex===0) {\n          res += \"<table><tr>\";\n        }\n        res += \"<td>\" + this.tagCtx.render() + \"</td>\";\n        if (this.tagCtx.props.last) {\n          res += \"</tr><table>\";\n        }\n      }\n      return res;\n    }\n  }\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = { name: \"Jo\" },\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "header": "<style>\ntd {padding:5px; border:solid 1px gray; font-family:Arial,sans-serif; font-size:15px;}\n</style>",
        "height": "140"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(*Note:* Contextual parameter names can include alphanumeric characters, `_`, `$` and `.` characters -- as in `{{mytag ~some_$4.Name=... /}}`. If the name includes `.` characters, use the syntax `ctx[\"some_$4.Name\"]` or [`ctxPrm(\"some_$4.Name\")`](#tagsapi@ctxparams) to access the value.)"
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">Advanced options</span>",
        "text": " ",
        "anchor": "advanced"
      },
      {
        "_type": "para",
        "title": "Specifying data context within tag content: the contentCtx option",
        "text": "*__Default behavior:__*\n\nBy default the data context within the tag is the value of the first argument. (See [View hierarchy -- inner data context](#views@innerdata)).\n\nSo if `{{mytag}}` uses a `template` then `{{mytag members/}}` will render the template with `members` as data context. \n\nSimilarly if `{{mytag}}` is used as a block tag, then the block content within `{{mytag members}}...{{/mytag}}` will render with `members` as data context.\n\n*__Modified behavior:__*\n\nTo make the data context for tag content the same as parent context, set the `contentCtx` option to `true`:\n\n```js\n$.views.tags(\"mytag\", {\n  ...\n  contentCtx: true, // The data context inside {{mytag}} will be the same as the outer context\n  ...\n});\n```\n\nTo specify a different data context for tag content, set the `contentCtx` option to a function returning the chosen data. (The `this` pointer of the `contentCtx` function is the tag instance. The default data context, `arg0` is passed to it as argument.) \n\nFor example, with the following tag option setting, the inner data context is given by the `dataCtx` named property:\n\n```js\n$.views.tags(\"mytag\", {\n  ...\n  contentCtx: function(arg0) {\n    return this.tagCtx.props.dataCtx;  // The returned value will be the data context inside {{mytag}}\n  },\n  ...\n});\n```\n\nUsage:\n\n```jsr\n{{mytag ... dataCtx=.../}}\n``` ",
        "anchor": "contentctx"
      },
      {
        "_type": "para",
        "title": "Providing a default converter: the convert option",
        "text": "On any tag, including custom tags, a converter can be specified directly on the tag (see [*Using converters with other tags*](#converters@othertags)):\n\n```jsr\n{{mytag name convert='toUpperCase'/}}\n```\n\nTo provide a default converter on a custom tag (used as fallback if no converter is specified on the tag), set the `convert` tag option to a function, or to a registered converter name:\n\n```js\n$.views.tags(\"mytag\", {\n  ...\n  convert: 'toLowerCase', // Default converter. (A function or a registered converter name)\n  ...\n});\n```\n\n\n\n",
        "anchor": "convert"
      },
      {
        "_type": "para",
        "title": "Specifying a default argument: the argDefault option",
        "text": "If a custom tag uses a *render()* method, then the arguments of the tag are passed to the render method:\n\n```jsr\n{{mytag arg0 arg1/}}\n```\n\n```js\n$.views.tags(\"mytag\", {\n  render: function(arg0, arg1) {...}\n});\n```\n\nIf the tag is called without arguments, then the render method will be called with the current data context as first argument, so therefore writing `{{mytag/}}` is equivalent to writing `{{mytag #data/}}` \n\nTo override this behavior, set the `argDefault` option to `false`. The first argument will then not default to current data, and the render method will instead be called without arguments.\n\n```jsr\n{{mytag/}}\n```\n\n```js\n$.views.tags(\"mytag\", {\n  render: function() {\n    // arguments.length is 0\n  },\n  argDefault: false\n});\n```\n",
        "anchor": "argdefault"
      },
      {
        "_type": "para",
        "title": "Specifying bound arguments and properties: the bindTo and bindFrom options",
        "text": "The `bindTo` and `bindFrom` options are designed primarily for use with data binding, with JsViews, and allow specifying which arguments/properties are data-bound for two-way binding.\n\nIn JsRender, the `bindTo` or `bindFrom` option can be used in conjunction with converters. Set the `bindFrom` option (or the `bindTo` option if there is no `bindFrom` setting) to an array, such as `[0, 1, 2]`, or `[\"title\", 1]` -- where integers refer to arguments and strings to named properties -- to determine what values are passed to the converter. (If neither `bindFrom` nor `bindTo` are set, then the values of all the [arguments](#tagsyntax@tagparams) will be passed to the converter.)\n\nBy default the value returned by the converter will be passed as first argument to the `render()` method, (and be the current data for the `template`). However, if `bindTo` is an array, and the converter returns an array of the same length, then the returned values will be used as converted values for each of the arguments or properties specified in `bindTo`/`bindFrom`.\n\nSee also *JsViews* [`bindTo`](#tagoptions@bindto) option for additional information and advanced scenarios.\n\nSee also\n- [tag.bndArgs()](#tagobject@bndargs)\n- [tag.cvtArgs()](#tagobject@cvtargs). \n- [*JsViews* `bindTo`](#tagoptions@bindto)",
        "anchor": "bindto"
      },
      {
        "_type": "para",
        "title": "Specifying flow behavior: the flow option",
        "text": "A 'flow' tag -- which has the `flow` option set to `true` -- is a tag that does not appear in the [parent tags](#tagsapi@parents) hierarchy, so is not accessed via [`this.parent`](#tagobject@parent), [`this.parents`](#tagobject@parents), `~tagParents` etc.\n\nThe built-in tags such as `{{for}}`, `{{props}}` and `{{if}}` are *flow tags* and do not show up in the *parent tags* hierarchy. Custom tags by default are non-flow, and do show up (unless you set the option to `flow: true`).",
        "anchor": "flow"
      },
      {
        "_type": "para",
        "title": "Specifying default context: the ctx option",
        "text": "The `ctx` option of a tag can be used to provide default values of [contextual parameters](#contextualparams):\n\n```js\n$.views.tags(\"mytag\", {\n  template: \"{{:~mode}}\",\n  ctx: {mode: \"readonly\"}, // Specify default ~mode if not provided by a helper or as a contextual parameter, \n  ...\n});\n```\n",
        "anchor": "ctx"
      },
      {
        "_type": "para",
        "title": "Methods and properties available on a custom tag instance",
        "text": "A custom tag instance can access the following methods and properties\n\n*Tag properties*\n- [tag.ctx](#tagobject@ctx)\n- [tag.parent](#tagobject@parent)\n- [tag.parents](#tagobject@parents)\n- [tag.tagCtx](#tagobject@tagctx)\n- [tag.tagCtxs](#tagobject@tagctxs)\n- [tag.tagName](#tagobject@tagname)\n- [rendering](#tagobject@rendering)\n\n*Tag methods*\n- [tag.ctxPrm()](#tagobject@ctxprm)\n- [tag.cvtArgs()](#tagobject@cvtargs)\n- [tag.bndArgs()](#tagobject@bndargs)\n- [tag.base()](#tagobject@base)\n",
        "anchor": "instanceprops"
      },
      {
        "_type": "para",
        "title": "Adding tags as private resources for a parent template",
        "text": "You can pass in an existing template as an additional `parentTemplate` parameter, on  <em>any</em> call to  `$.views.tags(...)`.\n\nIn that way the tag (or tags) you are registering become 'private tag resources' for the `parentTemplate`, rather than being registered globally:",
        "anchor": "privatetags"
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
            "example": "$.views.tags({\n  mytag1: ...,\n  mytag2: ...\n}, parentTemplate);",
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
        "text": "To unregister a previously registered tag, pass `null` to `$.views.tags()`:\n\n```js\n$.views.tags(\"mytag\", null);\n// Tag \"mytag\" is no longer registered\n```",
        "anchor": "unregister"
      },
      {
        "_type": "para",
        "title": "Custom tags and 'tag controls'",
        "text": "If you use JsViews, your custom tag can be developed into a fully functional <em>tag control</em>, with its own lifecycle, properties and methods, etc. It can be used as a <em>presenter</em> according to the MVP pattern."
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "tags",
            "label": "Using custom tags"
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
          },
          {
            "_type": "topic",
            "hash": "jsvtagcontrols",
            "label": "JsViews tag controls"
          }
        ]
      }
    ]
  },
  "escapetag": {
    "title": "Escaping tag delimiters in a template",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In a template you can use HTML character entities, including `&#123;` for `{` and `&#125;` for `}` (or equivalently `&lcub;` and `&rcub;`) -- which can be useful if you want a template to output the characters \"...{{...\" without JsRender from parsing those characters as a tag delimiter.\n\nFor example, in a scenario using a JsRender template to generate another JsRender template from data, you might want to output the string `\"...{{myCustomTag/}}...\"`, where the name `myCustomTag` comes from data:\n\n```js\n{customTagName: \"myCustomTag\"}\n```\n\nThis is shown in the following sample:"
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
            "text": "Rather than writing\n\n```jsr\n... {{{{:customTagName}} ... /}} ...\n```\n\nwe write:\n\n\n```jsr\n... &#123;&#123;{{:customTagName}} ... /&#125;&#125; ...\n```\n\n*Note:* In fact the parser is looking for `{{`, `{^{` and `}}`as tag delimiters, so the following will also work:\n\n```jsr\n... {&#123;{{:customTagName}} ... /&#125;} ...\n```\n"
          }
        ],
        "jsrJsvJqui": "jsr",
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n... {&#123;{{:customTagName}} ... /&#125;} ...\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n  data = {customTagName: \"myCustomTag\"},\n\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);",
        "height": "45"
      }
    ]
  },
  "nullcheck": {
    "title": "Null checks in templates",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Suppose you have:\n\n```js\nvar html = myTemplate.render(myOrder);\n```\nand your template is:\n\n```jsr\n{{:shipping.id}}\n```\n\nSometimes you need to handle the case where the parent object, such as `shipping` might be `null` or `undefined`.\n\nHere are the results with different versions of `myOrder`:\n\n- `myOrder = {shipping: {name: \"Jo\", id: \"J1\"} }`<br/>result: `\"J1\"`\n- `myOrder = {shipping: {name: \"Jo\"} }`<br/>result: `\"\"`\n- `myOrder = {}`<br/>(Note that the `shipping` object is `undefined`)<br/>result: `\"{Error: TypeError: Unable to get property 'id' of undefined or null reference}\"`\n\nSo now, here are several ways to handle that last case -- without outputting the error message:\n\n***1)** Use `onerror=...` on the `{{:}}` tag to specify a fallback rendering of the tag in the case of error.*\n\nFor example if you want to render the empty string when the shipping object is null or undefined, you can use the template:\n\n```jsr\n{{:shipping.id onerror=''}}\n```\n\nOr you could write \n\n```jsr\n{{:shipping.id onerror='no shipping info'}}\n```\n\n***2)** Test for the shipping object using `{{if}}` or `{{if}} {{else}} {{/if}}`*\n\n```jsr\n{{if shipping}}{{:shipping.id}}{{else}}no shipping info{{/if}}\n```\n\n***3)** Use `{{for}}` or `{{for}} {{else}} {{/for}}`*\n\n```jsr\n{{for shipping}}{{:id}}{{else}}no shipping info{{/for}}\n```\n\n***4)** Use a null check*\n\n```jsr\n{{:shipping && shipping.id}}\n```\n\n***5)** Use a ternary expression*\n\n```jsr\n{{:shipping ? shipping.id : 'no shipping info'}}\n```\n\nSo to summarize, here is a template showing all of these alternatives:\n\n*Template:*\n\n```jsr\n1 {{:shipping.id onerror='no shipping info'}}<br/>\n2 {{if shipping}}{{:shipping.id}}{{else}}no shipping info{{/if}}<br />\n3 {{for shipping}}{{:id}}{{else}}no shipping info{{/for}}<br />\n4 {{:shipping && shipping.id}}<br />\n5 {{:shipping ? shipping.id : 'no shipping info'}}<br />\n```\n\n*Script:*\n\n```js\nvar myOrder = {};\nvar html = myTemplate.render(myOrder);\n```\n\n*Result:*\n\n<pre>\n1 no shipping info\n2 no shipping info\n3 no shipping info\n4\n5 no shipping info\n</pre>\n\nFinally, if the order itself is null or undefined, or if you pass an array of orders, but some may be undefined, then you can wrap the whole template by an `{{if #data}}` or equivalently simply `{{if}}`, which tests for whether the current object, (the contextual data object that you are rendering this template against) is null.\n\n*Template:*\n\n```jsr\n{{if}}\n  {{:shipping.id onerror='no shipping info'}}<br/>\n{{else}}\n  no order<br/>\n{{/if}}\n```\n\n*Script:*\n\n```js\nvar myOrders = [\n  {shipping: {id: \"J1\"}},\n  ,\n  {},\n  {shipping: {id: \"J2\"}},\n];\n\nvar html = myTemplate.render(myOrders)\n```\n\n*Result:*\n\n<pre>\nJ1\nno order\nno shipping info\nJ2\n</pre>"
      }
    ]
  },
  "unicode": {
    "title": "Unicode character support",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In some scenarios, JsRender or JsViews might need to work with data which includes unicode parameters in property names:\n\n```js\nvar data = {\n  människa: {\n    função: \"a1\",\n    角色: \"b2\",\n    ...\n```\n\nThe use of unicode characters in JavaScript names, as in the above example, is indeed allowed by the ECMAScript standard.\n\nA JsRender template might then need to include \n\n```jsr\n{{:människa.角色}}\n```\n\nIf using JsViews, the template might include:\n\n```jsr\n<input data-link=\"människa.rôle\"/>\n{^{:människa.rôle}}\n```\n\nBy default, JsRender and JsViews data path names allow only the characters `[a-zA-Z_$][0-9a-zA-Z_$]*` (ASCII letters and numbers, together with `_` and  `$`).\n\nThis support can be extended to allow *__also any unicode characters__*, by loading the [*__jsrender-unicode.js__ plugin library*](#unicode-plugin) (after loading *jsrender.js* or *jsviews.js*), as shown in the following sample.\n\nHere is an example:"
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
            "text": "```jsr\n<head>\n  <script src=\"https://code.jquery.com/jquery-3.6.4.min.js\"></script>\n  <script src=\"https://www.jsviews.com/download/jsviews.min.js\"></script>\n  <script src=\"https://www.jsviews.com/download/plugins/jsrender-unicode.min.js\"></script>\n</head>\n<body>\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"människa.função\"/>\n  {^{:människa.função}} <br/>\n\n  <input data-link=\"människa.角色\"/>\n  {^{:människa.角色}} <br/>\n  ...\n</script>\n\n<div id=\"page\"></div>\n\n<script>\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    människa: {\n      função: \"a1\",\n      角色: \"b2\",\n      ...\n    }\n  };\n\nmyTmpl.link(\"#page\", data);\n</script>\n...\n```\n"
          }
        ],
        "html": "<script id=\"myTmpl\" type=\"text/x-jsrender\">\n  <input data-link=\"människa.função\"/>\n  {^{:människa.função}} <br/>\n\n  <input data-link=\"människa.角色\"/>\n  {^{:människa.角色}} <br/>\n\n  <input data-link=\"människa.rôle\"/>\n  {^{:människa.rôle}} <br/>\n\n  <input data-link=\"människa.وظيفة\"/>\n  {^{:människa.وظيفة}} <br/>\n\n  <input data-link=\"människa.ሚና\"/>\n  {^{:människa.ሚና}} <br/>\n</script>\n\n<div id=\"page\"></div>",
        "code": "var myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    människa: {\n      função: \"a1\",\n      角色: \"b2\",\n      rôle: \"c3\",\n      وظيفة: \"d4\",\n      ሚና: \"ዳይሬክተር6\"\n    }\n  };\n\nmyTmpl.link(\"#page\", data);",
        "header": "<script src=\"/download/plugins/jsrender-unicode.min.js\"></script>",
        "action": "prepend",
        "height": "140"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See: [Unicode support: *__jsrender-unicode.js__*](#unicode-plugin)\n"
      }
    ]
  }
};