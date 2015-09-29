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
        "text": "<em>Note:</em> New topics are being added regularly to this documentation."
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsrtags",
            "label": "Template tags"
          },
          {
            "hash": "rendertmpl",
            "label": "Render a template"
          },
          {
            "hash": "compiletmpl",
            "label": "Compile/register/get a template"
          },
          {
            "hash": "jsrregister",
            "label": "Register helpers, converters, tags..."
          },
          {
            "hash": "jsrobjects",
            "label": "JsRender objects"
          },
          {
            "hash": "jsrnode",
            "label": "JsRender for Node.js"
          }
        ]
      }
    ]
  },
  "jsrtags": {
    "title": "Built-in template tags",
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
            "hash": "propstag",
            "label": "{{props ...}}"
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
            "_type": "topic",
            "hash": "allowcodetag",
            "label": "{{* ... }} and {{*: ...}}"
          },
          {
            "_type": "topic",
            "hash": "customtagsapi",
            "label": "Custom tags"
          }
        ]
      }
    ]
  },
  "assigntag": {
    "title": "Template tag: {{: ...}}",
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
        "onlyJsRender": true,
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
        "onlyJsRender": true,
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
            "text": "```js\n[\n  {name: \"Pete\", ...},\n  {name: \"Heidi\", ...}\n]\n```\n\n`#xxx` is the `xxx` property of the current view - so `#index` is the `view.index` \n\n```jsr\n{{:#index+1}}\n```"
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
        "onlyJsRender": true,
        "title": "{{:#index ...}}"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "samples/jsr/converters",
            "label": "Sample: Converters and encoding"
          }
        ]
      }
    ]
  },
  "htmltag": {
    "title": "Template tag: {{> ...}}",
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
            "_type": "para",
            "title": "",
            "text": "```js\n{description: \"A <b>very nice</b> apartment\"}\n```\n\n```jsr\n{{:description}}\n...\n{{>description}}\n```"
          }
        ],
        "data": {
          "description": "A <b>very nice</b> apartment"
        },
        "markup": "{{:description}}<br/>\n{{>description}}",
        "onlyJsRender": true,
        "height": "60",
        "title": ""
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "samples/jsr/converters",
            "label": "Sample: Converters and encoding"
          }
        ]
      }
    ]
  },
  "includetag": {
    "title": "Template tag: {{include tmpl=... /}}",
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
        "description": "<em>Template composition</em>: &mdash; Include the referenced template: <em>tmpl</em>, rendered using the current data context.",
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
        "onlyJsRender": true,
        "height": "60",
        "code": "var people = [\n  {\n    \"name\": \"Pete\",\n    \"address\": {\n      \"city\": \"Seattle\"\n    }\n  },\n  {\n    \"name\": \"Heidi\",\n    \"address\": {\n      \"city\": \"Sidney\"\n    }\n  }\n];\n\nvar html = $(\"#peopleTemplate\").render(people);\n\n$(\"#peopleList\").html(html);",
        "html": "<script id=\"peopleTemplate\" type=\"text/x-jsrender\">\n  <div>\n    {{:name}} lives in {{include tmpl=\"#addressTemplate\"/}}\n  </div>\n</script>\n\n<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n    <b>{{>address.city}}</b>\n</script>\n\n<div id=\"peopleList\"></div>",
        "title": ""
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "samples/jsr/composition",
            "label": "Samples: Template composition"
          }
        ]
      }
    ]
  },
  "fortag": {
    "title": "Template tag: {{for ...}}",
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
                "description": "A data path, or an object or array"
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
            "example": "{{for billing.address}}\n {{:city}}\n{{/for}}",
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
                "description": "A data path, or an object or array"
              }
            ],
            "sections": [],
            "example": "{{for billing.address tmpl=\"addressTmpl\" /}}",
            "description": "Render the specified template for the given object, or iterate over the given array",
            "variant": "{{for pathOrExpr tmpl=nameOrExpr /}}"
          }
        ],
        "description": "<em>Template composition</em>: &mdash; Render the block content of the <code>{{for}}</code> (or the referenced external template), using the object or array specified by the path or expression as data context. If it is an array, iterate over the array, rendering once for each item.",
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
        "onlyJsRender": true,
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
        "onlyJsRender": true,
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
        "onlyJsRender": true,
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
                "description": "A data path, or an object or array"
              }
            ],
            "sections": [],
            "example": "{{for members}}\n    Name: {{:name}}\n{{else}}\n    No members...\n{{/for}}",
            "description": "Render first block if array is not empty, otherwise render second block",
            "variant": "{{for pathOrExpr}...{{else}}...{{/for}}"
          }
        ],
        "description": "<em>Conditional blocks</em>: &mdash; Render the block content of the <code>{{for}}</code> tag (or referenced template) if the object is defined and is not an empty array, otherwise render the <code>{{else}}</code> block (or template)",
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
        "height": "140",
        "onlyJsRender": true
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "samples/jsr/paths",
            "label": "Sample: Paths"
          }
        ]
      }
    ]
  },
  "propstag": {
    "title": "Template tag: {{props ...}}",
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
            "example": "{{props billing.address}}\n <b>{{>key}}</b>: {{>prop}}\n{{/props}}",
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
        "description": "<em>Template composition</em>: &mdash; Iterate over the properties of the object, and render the block content of the <code>{{props}}</code> tag (or the referenced external template) once for each property &mdash; using as data context: <code>{<b>key</b>: propertyName, <b>prop</b>: propertyValue}</code>.",
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
        "onlyJsRender": true,
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
        "onlyJsRender": true,
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
            "example": "{{props address}}\n    Key: {{:key}} Value: {{:prop}}\n{{else}}\n    No properties...\n{{/for}}",
            "description": "Render first block if object is not empty, otherwise render second block",
            "variant": "{{for pathOrExpr}...{{else}}...{{/for}}"
          }
        ],
        "description": "<em>Conditional blocks</em>: &mdash; Render the block content of the <code>{{prop}}</code> tag (or referenced template) if the object is defined and is not an empty object (no properties), otherwise render the <code>{{else}}</code> block (or template)",
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
        "onlyJsRender": true
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "samples/jsr/paths",
            "label": "Sample: Paths"
          }
        ]
      }
    ]
  },
  "iftag": {
    "title": "Template tag: {{if ...}}",
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
            "example": "{{if nickname}}\n    Nickname: {{:nickname}}\n{{/if}}",
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
        "description": "<em>Conditional inclusion</em>: &mdash; Render the block content of the <code>{{if}}</code> tag (or the referenced external template) only if the data-path or expression evaluates to true ('or truthy')",
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
            "example": "{{if nickname}}\n    Nickname: {{:nickname}}\n{{else}}\n    No nickname...\n{{/if}}",
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
        "description": "<em>Alternative conditional blocks</em>: &mdash; Render the block content of the <code>{{if}}</code> tag (or referenced template) if the expression is true, otherwise render the <code>{{else}}</code> block (or template)",
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
            "example": "{{if nickname}}\n    Nickname: {{:nickname}}\n{{else altnickname}}\n    Alternate nickname: {{:altnickname}}\n{{else}}\n    No nickname...\n{{/if}}",
            "description": "Render first block for which condition is true, otherwise last block",
            "variant": "{{if pathOrExpr1}}...{{else pathOrExpr2}}...{{else}}...{{/if}"
          }
        ],
        "description": "<em>Multiple alternative conditional blocks</em>: &mdash; Render the first <code>{{if}}</code> or <code>{{else}}</code> block for which the expression is true. If none are true, and there is an <code>{{else}}</code> without an expression, render that block",
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
        "onlyJsRender": true,
        "height": "310",
        "title": "{{if}}...{{else}}...{{/if}}"
      }
    ]
  },
  "elsetag": {
    "title": "Template tag: {{else ...}}",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "{{else}} can be used with <em><a href=\"#iftag\">{{if}}</a></em>, <em><a href=\"#fortag\">{{for}}</a></em> or any custom tag!",
        "text": "The `{{else}}` tag acts as a separator, to divide the content of a tag into two or more different content blocks.\n\nSo it allows another tag to provide specific behavior involving more than one content block.\n\n<br/>\n-- For example, you can use the `{{else}}` tag with <a href=\"#iftag\">`{{if}}`</a>:\n\n```jsr\n{{if expression}}\n    render this if the expression is true\n{{else}}\n    render this if the expression is false\n{{/if}}\n```\n\nto get 'if / else' behavior.\n\n<br/>\n-- Or you can use the `{{else}}` tag with <a href=\"#fortag\">`{{for}}`</a>:\n\n```jsr\n{{for members}}\n    Member Name: {{:name}}\n{{else}}\n    There are currently no members...\n{{/for}}\n```\n\nto render what you want to show if an array is empty, or if an array or object is null or undefined.\n\n<br/>\n-- Similarly you can use `{{else}}` with a custom tag, such as:\n\n```jsr\n{{tabs tabCaption=\"First Tab\"}}\n    first tab content\n{{else tabCaption=\"Second Tab\"}}\n    second tab content\n{{/tabs}}\n```\n\nas shown in <a href=\"#samples/tag-controls/tabs\">this sample</a>."
      },
      {
        "_type": "links",
        "title": "See also",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "iftag",
            "label": "API: {{if}}"
          },
          {
            "_type": "topic",
            "hash": "fortag",
            "label": "API: {{for}}"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls/tabs",
            "label": "Sample: tabs control"
          }
        ]
      }
    ]
  },
  "commenttag": {
    "title": "Template comment tag: {{!-- ... --}}",
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
            "description": "The comment will be ignored during template rendering - and will produce no output",
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
    "title": "Template tags: {{*... }} and {{*: ... }} (allow code)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender templates allow you to write rich expressions within the template tags, such as `{{: someExpression}}`. Nevertheless, in order to improve encapsulation and maintainability, they don't allow <em>arbitrary</em> code. For example, they don't allow you to access global variables, like `window`. \n\nIf you want complete freedom to insert any code into a compiled template, you can set `allowCode` to `true`, either globally, or specifically for that template. You can then insert any code by using the `{{* ... }}` tag, or you can return (render into the template output) the result of evaluating any expression, using the `{{*: ... }}` tag."
      },
      {
        "_type": "tag",
        "typeLabel": "Tag:",
        "title": "{{*... /}}",
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
        "title": "{{*: ... /}}",
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
        "text": "Here is an example, with `allowCode` set to `true` globally:\n\n```js\n$.views.settings.allowCode= true;\n```"
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
            "text": "Enable `allowCode` in all templates:\n\n```js\n$.views.settings.allowCode= true;\n```\n\nDefine a global variable, then increment it:\n\n```jsr\n{{* window.myvar=2; myvar+=4; }}\n```\n\nInsert the value into the rendered output:\n\n```jsr\n<div> Initial value: {{*:myvar}}</div>\n```\n\nIncrement the value again, and output the new value:\n\n```js\n{{* window.myvar+=11; }}\n\n<div> New value: {{*:myvar}}</div>\n```"
          }
        ],
        "onlyJsRender": true,
        "height": "70",
        "code": "$.views.settings.allowCode= true; \n\nvar html = $(\"#myTemplate\").render();\n\n$(\"#result\").html(html);",
        "html": "<script id=\"myTemplate\" type=\"text/x-jsrender\">\n\n  {{* window.myvar=2; myvar+=4; }}\n\n  <div> Initial value: {{*:myvar}}</div>\n\n  {{* window.myvar+=11; }}\n\n  <div> New value: {{*:myvar}}</div>\n\n</script>\n\n<div id=\"result\"></div>",
        "title": "",
        "markup": ""
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
            "text": "```js\n$.views.settings.allowCode= true; \n```\n\nDefine a global variable:\n\n```jsr\n{{* window.total = 0}}\n```\n\nIterate through a list, and use `{{* ...}}` to increment the `total`, and `{{*:}}` to return each value:\n\n```js\n{{for list}}\n  {{* total += data}}\n    <li>\n      Amount {{:}} (Running total: {{*: total}})\n   </li>\n{{/for}}\n```"
          }
        ],
        "onlyJsRender": true,
        "height": "140",
        "code": "var data = {\n    title: \"My list\",\n    list: [2, 10.3, 77, -44, -5.5]\n  };\n\n$.views.settings.allowCode= true; \n\nvar html = $(\"#myTemplate\").render(data);\n\n$(\"#result\").html(html);",
        "html": "<script id=\"myTemplate\" type=\"text/x-jsrender\">\n  {{* window.total = 0}}\n  <ol>\n    {{for list}}\n      {{* total += data}}\n        <li>\n          Amount {{:}} (Running total: {{*: total}})\n       </li>\n    {{/for}}\n  </ol>\n  <u>Total: {{*: total}}</u>\n</script>\n\n<div id=\"result\"></div>",
        "title": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is another example, in which we will replace the `{{for list}}` iteration by pure code-based iteration using `{{* ...}}`. This makes it easy to iterate only over the odd members of the array.\n\n<br/>This time we will enable code insertion just for this template:\n\n```js\n$.templates(..., {\n  markup: ...,\n  allowCode: true,\n  ...\n})\n```"
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
        "onlyJsRender": true,
        "height": "110",
        "code": "var data = {\n    title: \"My list\",\n    list: [2, 10.3, 77, -44, -5.5]\n  };\n\nvar tmpl = $.templates({\n    markup: \"#myTemplate\",\n    allowCode: true\n  });\n \nvar html = tmpl.render(data);\n\n$(\"#result\").html(html);",
        "html": "<script id=\"myTemplate\" type=\"text/x-jsrender\">\n  Here are the odd numbered items:\n  <ul>\n    {{* for (i=0; i<data.list.length; i+=2) { }}\n      <li>\n        {{*: i+1}}: Amount {{*:data.list[i]}}\n      </li>\n    {{* } }}\n  </ul>\n</script>\n\n<div id=\"result\"></div>",
        "title": ""
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
        "text": "JsRender deliberately has only a small number of built-in tags - each of which is very flexible and useful. This is intended to reduce the 'learning curve'. And at the same time JsRender makes it very easy to create your own custom tags:"
      },
      {
        "_type": "links",
        "title": "See:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "tags",
            "label": "API: $.views.tags()"
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
        "text": "A template is rendered by calling the `render()` method.\n\nThe `render(data, helpersOrContext)` method takes as parameters the data (used as the <em>'data context'</em> during the rendering), and optionally additional metadata or contextual helpers. It returns a string - which is the rendered template - typically HTML markup with data values or computed values inserted at appropriated points in the string.\n\nThere are three ways of calling the `render()` method:\n<ul class=\"textbefore\"><li>If you have a reference to the <em>template object</em>, call <a href=\"#tmplrender\"><code>template.render(...)</code></a></li>\n<li>If you have registered the template by name (<code>\"myTmpl\"</code>), call <a href=\"#d.render\"><code>$.render.myTmpl(...)</code></a></li>\n<li>If the template is declared in a script block, with selector <code>\"#myTmpl\"</code>, you can also call <a href=\"#db.render\"><code>$(\"#myTmpl\").render(...)</code></a></li></ul>"
      },
      {
        "_type": "links",
        "title": "Links",
        "links": [],
        "topics": [
          {
            "hash": "tmplrender",
            "label": "template.render()"
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
        "title": "The template.render() method",
        "text": "The `render()` method of a template takes a <em>data</em> object or array (as well as an optional <em>helpersOrContext</em> object), and returns the rendered template as a string.\n\nThere is also a shortcut version of the `render()` method: you can call the template object itself as a function: `var html = myTemplate(data)` -- which is equivalent to `var html = myTemplate.render(data)`.\n\nTo get a template object from a template string, or a template declared in a script block, see <a href=\"#compiletmpl\">Compile/register/get a template</a>."
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
            "code": "var html = myTmpl.render(person);"
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td>\n      {{:name}}\n    </td>\n  </tr>\n</script>",
        "code": "var myTmpl = $.templates(\"#personTmpl\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar html = myTmpl.render(person);\n\n$(\"#person\").html(html);",
        "title": "template.render(object):",
        "onlyJsRender": true,
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
        "onlyJsRender": true,
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
        }
      },
      {
        "_type": "para",
        "title": "",
        "text": "You can pass in any JavaScript type (<em>object, string, number, function...</em>) as helpers on the `helpersOrContext` object, and use them as metadata, or as helper functions for formatting etc.\n\nJust add `~` to access them as <a href=\"#expressions/helperpath\">helper paths</a>.\n\nSee <a href=\"#helpers\">Providing helpers</a> for the relationship to globally registered helpers -- `$.views.helpers(...)`.\n\n<em>Note:</em> By passing in helpers in this way, you are making them specific to this render call. You can also declare helpers globally, and you can also declare helpers that are private to a specific template."
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
            "text": "```js\nvar html = myTmpl.render(person, {color: \"red\", format: toUpper});\n```\n\n```jsr\n<td style=\"color:{{:~color}};\">\n  {{:~format(name)}}\n</td>\n```\n\nClick <em>Try it</em> and change the color to \"green\"..."
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <tr>\n    <td style=\"color:{{:~color}};\">\n      {{:~format(name)}}\n    </td>\n  </tr>\n</script>",
        "code": "function toUpper(val) { return val.toUpperCase(); }\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar html = myTmpl.render(person, {color: \"red\", format: toUpper});\n\n$(\"#person\").html(html);",
        "title": "template.render(object, myHelpers):",
        "height": "60"
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
    "title": "Rendering a named template without needing the template object",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "$.render.myTmpl()",
        "text": "If a template has been registered as a named template:\n\n```js\n$.templates(\"myTmpl\", \"#personTmpl\");\n```\n\n...then you can call the <a href=\"#tmplrender\">`render()`</a> method of the template without needing to hold on to the compiled template object returned from <a href=\"#d.templates\">`$.templates(...)`</a>.\n\nJust call `$.render.myTmpl(...)`, or `$.render[\"myTmpl\"](...)`"
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
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <tr>\n    <td>\n      {{:name}}\n    </td>\n  </tr>\n</script>",
        "code": "$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar html = $.render.personTmpl(person);\n\n$(\"#person\").html(html);",
        "title": "$.render.personTmpl(...):",
        "height": "60"
      },
      {
        "_type": "links",
        "title": "See also:",
        "links": [
          {
            "_type": "link",
            "hash": "hash",
            "label": ""
          }
        ],
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
        "text": "If a template has been registered using a script block:\n\n```jsr\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  ...\n</script>\n```\n\n...then you can call the <a href=\"#tmplrender\">`render()`</a> method of the template without needing to hold on to the compiled template object returned from <a href=\"#d.templates\">`$.templates(...)`</a>.\n\nJust call `$(\"#myTmpl\").render(...)`"
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
        "height": "60"
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
    "title": "Compile/register/get a template",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "To create a template you need to provide the markup for the template. JsRender will convert (compile) the markup into a javascript function &mdash; the 'render' function for your template. In fact for convenience, JsRender creates a <em>template object</em> which has a <a href=\"#rendertmpl\">`template.render()`</a> method which is the compiled function.\n\nThere are two ways to create a template:\n<ul class=\"textbefore\"><li>Pass the markup string to the <a href=\"#d.templates\"><code>$.templates()</code></a> method, which will compile it as a template object, and optionally register it by name</li>\n<li>Declare the template in a script block with <code>type=\"text/x-jsrender\"</code> (or at least a type other than the default <code>text/javascript</code>). In that case JsRender will automatically call <code>$.templates()</code>. You will only need to call it yourself if you want to access the <em>template object</em></li></ul>\n\nThe first approach has the advantage of keeping your template declaration independent of the HTML markup that you are loading into the browser. Indeed you may want to provide the template markup strings for your templates in different application-specific ways, such as loading the string from the server (using a script file or text or html file), creating 'computed' template markup strings on the fly, etc.\n\nHere is an example:"
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
            "text": "The <em>person.js</em> script registers a named <em>\"person\"</em> template:\n\n```js\n$.templates(\"person\", \"<label>Name:</label> {{:name}} \");\n```\n\nWe load the script from the server, and it registers our template. As soon as the script is loaded, we call the <a href=\"#d.render\">`render(...)`</a> method for our template:\n\n```js\n$.getScript(\".../person.js\", function() {\n    var html = $.render.person(people);\n    $(\"#peopleList\").html(html);\n  });\n```\n\n<em>Note:</em> For a more sophisticated example of lazy loading of scripts for registering templates, see the <a href=\"#samples/jsr/composition/remote-tmpl\">remote templates</a> sample."
          }
        ],
        "markup": "\n",
        "data": {},
        "code": "$.getScript(\"//www.jsviews.com/samples/resources/templates/person.js\", function() {\n    var html = $.render.person(people);\n    $(\"#peopleList\").html(html);\n  });\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];",
        "html": "<div id=\"peopleList\"></div>",
        "onlyJsRender": true,
        "height": "40",
        "title": "Registering a template from a markup string (in this case, fetched  from the server in a script file):"
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
            "text": "The markup string is fetched in an AJAX request (the <em>person.txt</em> file).\n\n```jsr\n<label> Name:</label> {{:name}}\n```\n\nAs soon as the request returns, we use the markup string to compile the `personTemplate` object, and then call its <a href=\"#tmplrender\">`render(...)`</a> method:\n\n```js\n$.get(\"...person.txt\", function(value) {\n  personTemplate = $.templates(value);\n  var html = personTemplate.render(people);\n  $(\"#peopleList\").html(html);\n});\n```"
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n",
        "code": "var personTemplate;\n\n$.get(\"resources/templates/person.txt\", function(value) {\n  personTemplate = $.templates(value);\n  var html = personTemplate.render(people);\n  $(\"#peopleList\").html(html);\n});\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];",
        "title": "Registering a template from a markup string (fetched  from the server in a text file):",
        "onlyJsRender": true,
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
            "text": "This time we put our markup in a script block with `type=\"text/x-jsrender\"`...\n\n```jsr\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>\n```\n\nThen in the code we call the <a href=\"#d.templates\">`$.templates()`</a> method with a jQuery selector for that script block, to register our template as a named template. (We could also hold on to the template object, which is the returned value...)  \n\n```js\n$.templates(\"personTmpl\", \"#personTemplate\");\n```\n\nThen as before we call the <a href=\"#rendertmpl\">`render()`</a> method for the named template:\n\n```js\nvar html = $.render.personTmpl(people);\n```"
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>",
        "code": "$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nvar html = $.render.personTmpl(people);\n\n$(\"#peopleList\").html(html);",
        "title": "Registering a template declared in script block:",
        "onlyJsRender": true,
        "height": "40"
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios see:",
        "links": [],
        "topics": [
          {
            "hash": "d.templates",
            "label": "$.templates()"
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
        "title": "Simple scenarios",
        "text": "`$.templates()` is powerful and flexible. You can use it for many scenarios, including the following:\n<ul class=\"textbefore\">\n<li>Compile a template from a string</li>\n<li>Get a template object for a template declared in a script block</li>\n<li>Register a template (from either a string or a script block declaration) as a <em>named template</em></li>\n</ul>\n"
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
            "title": "Get a compiled template from a string or selector",
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
            "description": "Compile a template and return the template object"
          },
          {
            "_type": "signature",
            "title": "Register a named template from a string or selector",
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
            "description": "Register a named template"
          }
        ],
        "description": "Create one or more compiled templates - optionally registered as named templates",
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
        "onlyJsRender": true,
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
            "_type": "code",
            "title": "",
            "code": "$.templates(\"personTmpl\", \"<label>Name:</label> {{:name}}\");\n\nvar html = $.render.personTmpl(person);\n"
          }
        ],
        "code": "$.templates(\"personTmpl\", \"<label>Name:</label> {{:name}}\");\n\nvar person = {name: \"Robert\"};\n\nvar html = $.render.personTmpl(person);\n\n$(\"#peopleList\").html(html);",
        "html": "<div id=\"peopleList\"></div>",
        "height": "40",
        "title": "Register named template from a string",
        "anchor": "namedfromstring"
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
        "height": "40"
      },
      {
        "_type": "para",
        "title": "Registering multiple templates in one call",
        "text": "You can register multiple <em>named templates</em> in one call to `$.templates()` as follows:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.templates(namedTemplates)",
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
                "name": "namedTemplates",
                "type": "object",
                "optional": false,
                "description": "Object (hash) of keys (name of template) and values (markup string, selector, or templateOptions object)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.templates({\n  personTmpl: \"#personTemplate\",\n  labelTmpl: \"<label>Name:</label>\"\n});",
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
        "height": "40"
      },
      {
        "_type": "para",
        "title": "Getting template objects for named templates",
        "text": "Once you have registered one or more <em>named templates</em> you can get the template object for a named template as follows:\n\n```js\nvar myTemplate = $.templates.myTemplateName;\n```"
      },
      {
        "_type": "para",
        "title": "Advanced scenarios: Associating private resources with templates",
        "text": "<em>$.templates()</em> can also be used for the following more advanced scenarios:\n<ul class=\"textbefore\">\n<li>Compile a template, (or multiple templates) along with specified resources to be available only within that template</li>\n<li>Compile one or more templates to be added to the set of private resources of another (already compiled) template</li>\n</ul>\n\nYou can use `$.templates()` to compile or register not only a template, but in addition some <em>helpers</em>, <em>converters</em>, <em>custom tags</em> or nested <em>sub-templates</em>, to be made available to the new template as private resources.\n\nNote that as an alternative you can register resources (<em>helpers</em>, <em>converters</em>, <em>custom tags</em> or <em>templates</em>) globally, using <a href=\"#helpers\">`$.views.helpers()</a>, <a href=\"#converters\">`$.views.converters()`</a>, <a href=\"#tags\">`$.views.tags()`</a>, or <a href=\"#d.templates\">`$.templates()`</a> - rather than making them private to the template that needs to reference them."
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
            "title": "Compile a template along with specified resources",
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
            "title": "Register a named template, along with specified resources",
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
            "title": "Add additional templates as 'sub templates' - resources to another template",
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
            "text": "A converter and a helper are registered as private resources for the `personTmpl` named template.\n\n```js\n$.templates(\"personTmpl\", {\n  markup: \"#personTemplate\",\n  converters: {\n    upper: function(val) {return val.toUpperCase();}\n  },\n  helpers: {\n    append: function(a, b) {return a + b;}\n  }\n});\n```\n\nThey are accessed within the `personTmpl`\n\n```jsr\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{upper:~append(\"Mr \", name)}}\n</script>\n```"
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{upper:~append(\"Mr \", name)}}\n</script>",
        "code": "// Register a template along with a converter and a helper that it will use.\n// These resources are private to the template, rather than being registered\n// globally using $.views.converters or $.views.helpers\n$.templates(\"personTmpl\", {\n  markup: \"#personTemplate\",\n  converters: {\n    upper: function(val) {return val.toUpperCase();}\n  },\n  helpers: {\n    append: function(a, b) {return a + b;}\n  }\n});\n\nvar person = {name: \"Robert\"};\n\nvar html = $.render.personTmpl(person);\n\n$(\"#peopleList\").html(html);",
        "title": "Register a named template along with specified resources",
        "height": "40"
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
        "title": "Add a \"labelTmpl\" template resource as a 'sub template' - a private resource for an existing \"personTemplate\"",
        "height": "40"
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
          },
          {
            "_type": "topic",
            "hash": "compiletmpl",
            "label": "Compile/register/get a template"
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
  "converters": {
    "title": "Registering converters: $.views.converters()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "What are converters?",
        "text": "In JsRender, a converter is a convenient way of processing or formatting data-value, or the result of expression evaluation -- as in:\n\n```jsr\n{{html:movie.description}} - this data is HTML encoded\n{{url:getTheFilePath()}} - this expression will be URL-encode\n{{daymonth:invoice.date}} - this date uses my formatter \n```\n\nYou use built-in converters to HTML-encode, attribute-encode, or URL-encode. And you can register custom converters.\n\nWith JsViews, you can use converters with two-way data-binding, and you will have a <em>convert</em> and a <em>convertBack</em> converter -- one for each direction."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.views.converters(name, converterFn)",
        "name": "converters",
        "object": "$.views",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "Register a converter",
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
            "description": "Register a converter, to be used in templates with the syntax:<br/>{{converterName: someExpression}}"
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
            "text": "```js\n$.views.converters(\"upper\", function(val) {\n  return val.toUpperCase();\n});\n```\n\n```jsr\n{{upper:nickname}}\n{{upper: \"this will be upper case too\"}}\n```"
          }
        ],
        "code": "$.views.converters(\"upper\", function(val) {\n  return val.toUpperCase();\n});\n\nvar person = {name: \"Robert\", nickname: \"Bob\"};\n\nvar html = $(\"#personTemplate\").render(person);\n\n$(\"#person\").html(html);",
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{:name}}<br/>\n  Upper case nickname: {{upper:nickname}}<br/>\n  {{upper: \"this will be upper case too\"}} \n</script>",
        "height": "90",
        "title": "Using a custom converter",
        "onlyJsRender": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>Note:</em> the `this` pointer within the converter function is the instance of the tag, and can be used in more advanced usage of converters as in the following example:"
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
            "text": "You can access multiple parameters and properties from the converter function.\n\n```js\n$.views.converters(\"full\", function(first, last) {\n  var format = this.tagCtx.props.format;  \n  return ...;\n});\n```\n\n(You can also access the full data object: `this.tagCtx.view.data`)"
          }
        ],
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <p><label>Normal:</label> {{full:first last}}</p>\n  <p><label>Reverse:</label> {{full:first last format=\"reverse\"}}</p> \n</script>",
        "code": "$.views.converters(\"full\", function(first, last) {\n  var format = this.tagCtx.props.format;  \n  return format === \"reverse\" ? last.toUpperCase() + \" \" + first : first + \" \" + last;\n});\n\nvar person = {first: \"Xavier\", last: \"Prieto\"};\n\nvar html = $(\"#personTemplate\").render(person);\n\n$(\"#person\").html(html);",
        "height": "90",
        "title": "Accessing more context from the converter",
        "onlyJsRender": true
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.views.converters(namedConverters)",
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
                "name": "namedConverters",
                "type": "object",
                "optional": false,
                "description": "Object (hash) of keys (name of converter) and values (converter function)"
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
        "text": "You can pass in an existing template as an additional `parentTemplate` parameter, on  <em>any</em> call to  `$.views.converters(...)`.\n\nIn that way the converter you are registering becomes a 'private converter resource' for the `parentTemplate`, rather than being registered globally:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "",
        "name": "converters",
        "object": "$.views",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "Add one or more converters as private resources for a parent template",
            "params": [
              {
                "_type": "param",
                "name": "namedConverters",
                "type": "object",
                "optional": false,
                "description": "Object (hash) of keys (name of converter) and values (converter function)"
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
            "description": "Add multiple converters as resources, to a parent template"
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
        "title": "See also the following samples:",
        "text": "<a href=\"#samples/jsr/converters\"><em>Converters and encoding</em></a><br/>\n<a href=\"#samples/form-els/converters\"><em>Form elements: Two-way binding and converters</em></a>"
      },
      {
        "_type": "links",
        "title": "Built-in converters:",
        "links": [],
        "topics": [
          {
            "hash": "html",
            "label": "$.views.converters.html()"
          },
          {
            "hash": "attr",
            "label": "$.views.converters.attr()"
          },
          {
            "hash": "url",
            "label": "$.views.converters.url()"
          }
        ]
      }
    ]
  },
  "html": {
    "title": "$.views.converters.html()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Built-in HTML encoder",
        "text": "JsRender includes an HTML encoder, which you can use programmatically as follows:\n\n```js\nvar myHtmlEncodedString = $.views.converters.html(myString);\n```\n\nThe same encoder is accessed declaratively as a converter, as in the following two examples:\n\n```jsr\n{{html:myExpression}}\n\n{{>myExpression}}\n```\n\nIn fact `{{>...}}` is exactly equivalent to `{{html:...}}` and is provided as a simpler syntax for HTML encoding values taken from data or from expressions and rendered within HTML content."
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
            "code": "var result = $.views.converters.html(value);\n\nalert(result);"
          }
        ],
        "code": "var value = \"< > ' \\\" &\";\nvar result = $.views.converters.html(value);\n\n$(\"#show\").on(\"click\", function() {\n  alert(result);\n});",
        "html": "<button id=\"show\">Show result</button>\n\n",
        "height": "40"
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
                "text": "Encodes according to the following scheme:\n<br/><br/>\n`&` &rarr; `&amp;`<br/>\n`<` &rarr; `&lt;`<br/>\n`>` &rarr; `&gt;`<br/>\n`\\x00` &rarr; `&#0;`<br/>\n`'` &rarr; `&#39;`<br/>\n`\"` &rarr; `&#34;`<br/>\n<code>\\`</code> &rarr; `&#96;`"
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
        "_type": "links",
        "title": "See the following topic and sample:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "htmltag",
            "label": "The {{>...}} template tag"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/converters",
            "label": "Converters and encoding"
          }
        ]
      }
    ]
  },
  "attr": {
    "title": "$.views.converters.attr()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Built-in attribute encoder",
        "text": "JsRender includes an encoder intended for use when attribute encoding is needed. You can use it programmatically as follows:\n\n```js\nvar myAttributeEncodedString = $.views.converters.attr(myString);\n```\n\nThe same encoder is accessed by declaratively as a converter:\n\n```jsr\n{{attr:myExpression}}\n```"
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
            "code": "var result = $.views.converters.attr(value);\n\nalert(result);"
          }
        ],
        "code": "var value = \"< > ' \\\" &\";\nvar result = $.views.converters.attr(value);\n\n$(\"#show\").on(\"click\", function() {\n  alert(result);\n});",
        "html": "<button id=\"show\">Show result</button>\n\n",
        "height": "40"
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
                "text": "Encodes according to the following scheme:\n<br/><br/>\n`&` &rarr; `&amp;`<br/>\n`<` &rarr; `&lt;`<br/>\n`>` &rarr; `&gt;`<br/>\n`\\x00` &rarr; `&#0;`<br/>\n`'` &rarr; `&#39;`<br/>\n`\"` &rarr; `&#34;`<br/>\n<code>\\`</code> &rarr; `&#96;`"
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
        "_type": "links",
        "title": "See also the following sample:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "samples/jsr/converters",
            "label": "Converters and encoding"
          }
        ]
      }
    ]
  },
  "url": {
    "title": "$.views.converters.url()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Built-in URL encoder",
        "text": "JsRender includes a URL encoder, which you can use programmatically as follows:\n\n```js\nvar myUrlEncodedString = $.views.converters.url(myString);\n```\n\nThe same encoder is accessed by declaratively as a converter:\n\n```jsr\n{{url:myExpression}}\n```"
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
            "code": "var result = $.views.converters.url(value);\n\nalert(result);"
          }
        ],
        "code": "var value = \"<_>_\\\"_ \";\nvar result = $.views.converters.url(value);\n\n$(\"#show\").on(\"click\", function() {\n  alert(result);\n});",
        "html": "<button id=\"show\">Show result</button>\n",
        "height": "40"
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
        "title": "See the following sample:",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "samples/jsr/converters",
            "label": "Converters and encoding"
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
        "text": "JsRender custom tags are named tags `{{myTag ...}}`, which you can register, and then use in your templates.\n\nA tag renders itself as part of the template output. You determine how it renders, generally by providing either a <em>render</em> function or a template, when you declare your custom tag.\n\nThe render function, or the template, can access both named parameters (<em>props</em>) and unnamed parameters (<em>args</em>), as in:\n\n```jsr\n{{myTag arg0 arg1 namedProp1=xxx namedProp2=yyy}} ... {{/myTag}}\n```\n\nIn fact it can also access the current data item - or even the whole hierarchy of views and data...\n\nWhen you also use JsViews, custom tags acquire a whole new dimension. &mdash; They become <em>tag controls</em>, and you can build rich and complex single page apps cleanly and simply using custom tag controls - following an MVP or MVVM coding pattern. "
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.views.tags(name, tagFn)",
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
                "name": "tagFn",
                "type": "function",
                "optional": false,
                "description": "Tag function. returns the rendered tag"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.tags(\"mytag\", function(...) {\n  ...return rendered content\n});\n\n{{mytag ...}} ... {{/mytag}}",
            "description": "Register a simple 'render' function as a custom tag,"
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
                "name": "tagOptions",
                "type": "object",
                "optional": false,
                "description": "An tagOptions object with a render method and/or a template property, and optionally other properties or methods"
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
                "name": "namedTags",
                "type": "object",
                "optional": false,
                "description": "Object (hash) of keys (name of tag) and values (render function or tagOptions object)"
              }
            ],
            "args": [],
            "sections": [],
            "example": "$.views.tags({\n  myTag1: function(val) {...},\n  myTag2: {render: function(val) {...}, ...}\n});",
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
        "onlyJsRender": true
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>Note:</em> the `this` pointer within the tag render function is the instance of the tag, and can be used in more advanced usage, as in the next two examples:"
      },
      {
        "_type": "para",
        "title": "Wrapping block content using a function-based custom tag",
        "text": "First of all - what if we want our tag to be used as a block tag, and to render itself by wrapping the rendered block content with the <em>'bold p'</em> html -- `<b><p>...</p></b> `as in:\n\n```jsr\n{{boldp}}\n  This is inside our block content:<br/>\n  <em>{{:title}}</em>\n{{/boldp}}\n```"
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
        "onlyJsRender": true
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
        "onlyJsRender": true
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
        "onlyJsRender": true
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
            "text": "To render block content, we use `{{include tmpl=~tag.tagCtx.content/}}`\n\n```js\ntemplate: \"<p><b>{{include tmpl=~tag.tagCtx.content/}}</b></p>\"\n```\n\nHere we are accessing the `content` property on the `tagCtx`, which provides a compiled template for the block content.\n\nIt is also made available as a `content` property on the `view` object - and can be accessed from within a template using `#content` - which is an example of a `view path` - equivalent to `#view.content`. You can try out that alternative syntax by choosing <em>Try it</em> and changing the template above to `<p><b>{{include tmpl=#content/}}</b></p>`."
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  {{boldp}}\n    This is the title:<br/>\n    <em>{{:title}}</em>\n  {{/boldp}}\n</script>",
        "code": "$.views.tags(\"boldp\", {\n  template: \"<p><b>{{include tmpl=~tag.tagCtx.content/}}</b></p>\"\n});\n\nvar team = {\n  title: \"The A Team\"\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);",
        "height": "80",
        "title": "2b - Rendering block content from a custom tag template"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Finally let's re-implement the third example using just a template. \n\nEven this example can be implemented as a custom tag which has no code at all. - Just a template, which is also able to access all the context that we were able to access from code in our `render()` function above.\n\nThis illustrates the power of declarative templates..."
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
        "onlyJsRender": true
      },
      {
        "_type": "para",
        "title": "Custom tags using both a render function <b>and</b> a template",
        "text": "If there is both a template and a render method, then the template will only be used if the render method returns <em>undefined</em>\n\nLet's take our `{{range}}` example using a render function, but provide a template which will be used for as \"fallback\" rendering for the tag in the case when there are no items to render in the chosen range:"
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
            "text": "First we will change the original code to test whether the item exists in the array, before rendering the block content.\n\nAnd secondly, we will make sure that when there is an item we do render the block content and not the template. So we call `this.tagCtx.content.render(array[i])`, rather than `this.tagCtx.render(array[i])`.\n\nThat's because `this.tagCtx.render(...)` will actually look to see if there is template associated with the tag, (either a template on the tag definition, or a `tmpl` property on the tag) - in which case it will render that template and not the block content... \n\n```js\nfor (var i = start; i <= end; i++) {\n  if (array[i]) {\n    // Render tag block content, for this data item\n    ret += this.tagCtx.content.render(array[i]);\n  }\n}\n```\n\nFinally, if there are no items to render, we will return undefined, so the tag will fall back on the template rendering.\n\n```js\nreturn ret || undefined;\n```\n\nAnd here is the \"fallback\" template:\n\n```jsr\ntemplate: \"<li>Nothing to render</li>\"\n```"
          }
        ],
        "code": "$.views.tags({\n  range: {\n    render: function(array) {\n      var ret = \"\",\n        start = this.tagCtx.props.start,\n        end = this.tagCtx.props.end;\n      for (var i = start; i <= end; i++) {\n        if (array[i]) {\n          // Render tag block content, for this data item\n          ret += this.tagCtx.content.render(array[i]);\n        }\n      }\n      return ret || undefined;\n    },\n    template: \"<li>Nothing to render</li>\"\n  }\n});\n\nvar team = {\n  title: \"The A Team\",\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n};\n\nvar html = $(\"#teamTemplate\").render(team);\n\n$(\"#team\").html(html);\n",
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n  <h3>Members 2 to 4</h3>\n  <ul>\n    {{range members start=1 end=3}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n\n  <h3>Members 5 to 8</h3>\n  <ul>\n    {{range members start=4 end=7}} \n      <li>\n        {{:name}}\n      </li>\n    {{/range}}\n  </ul> \n</script>",
        "height": "200",
        "onlyJsRender": true,
        "title": "A render() function and a template as \"fallback\""
      },
      {
        "_type": "para",
        "title": "Adding tags as private resources for a parent template",
        "text": "You can pass in an existing template as an additional `parentTemplate` parameter, on  <em>any</em> call to  `$.views.tags(...)`.\n\nIn that way the tag you are registering becomes a 'private tag resource' for the `parentTemplate`, rather than being registered globally:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "",
        "name": "converters",
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
                "description": "Owner template - to which this/these tag(s) are being added as private resources"
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
  "helpers": {
    "title": "Registering helpers: $.views.helpers()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "What are helpers?",
        "text": "JsRender templates are made up of HTML markup, text, and <em>template tags</em>. <em>Template tags</em> are used to evaluate data-paths or computed expressions, and insert those values into the rendered output.\n\nBut often the values you will want to insert are not actually taken from the data, but rather from other parameters or <em>metadata</em> which you want to use. And often you will want to process the values, using helper functions or other code, e.g. for converting values to other formats, or for computed values.\n\n<em>Helpers</em>, in JsRender, refers to any functions, parameters or metadata which you want to provide, in addition to the actual data you passed to the `render()` method (or `link()` method if you are using JsViews).\n\nHelpers can also be objects, arrays, etc.\n\nYou access helpers by prepending the `~` character. Here are some examples:\n\n```jsr\n{{:~myHelperValue}}\n{{:~myHelperFunction(name, title)}}\n{{for ~myHelperObject.mySortFunction(people, \"increasing\")}} ... {{/for}}\n```"
      },
      {
        "_type": "para",
        "title": "Passing in helpers",
        "text": "There are three ways to provide helpers:\n\n<ul>\n<li>Global helpers - registered using <code>$.views.helpers({myHelper1: ..., myHelper2: ...});</code></li>\n<li>Helpers registered for a specific template - <a href=\"#tmplrender\"><code>$.templates(\"mytmpl\", {markup: ..., helpers: {myHelper1: ...}});</code></a></li>\n<li>Helpers passed in on a specific render or link call - <a href=\"#tmplrender\"><code>tmpl.render(data, {myHelper1: ...});</code></a></li>\n</ul>"
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
            "text": "```js\n$.views.helpers({format: myFormatFunction});\n```\n\n```jsr\n{{:~format(name, true)}}\n```"
          }
        ],
        "title": "Global helper: $.views.helpers(...)",
        "code": "function myFormatFunction(value, upper) {\n  return upper ? value.toUpperCase() : value.toLowerCase();\n}\n$.views.helpers({format: myFormatFunction});\n\nvar html = $(\"#personTemplate\").render({name: \"Robert\"});\n\n$(\"#person\").html(html);",
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{:~format(name, true)}}\n</script>",
        "onlyJsRender": true,
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
            "text": "```js\n$.templates({\n  mytmpl: {\n    markup: \"#personTemplate\",\n    helpers: {\n      format: myFormatFunction\n    }\n  }\n});\n```\n\n```jsr\n{{:~format(name)}}\n{{:~format(name, true)}}\n```"
          }
        ],
        "title": "helper resource for a specific template",
        "code": "function myFormatFunction(value, upper) {\n  return upper ? value.toUpperCase() : value.toLowerCase();\n}\n\n$.templates({\n  mytmpl: {\n    markup: \"#personTemplate\",\n    helpers: {\n      format: myFormatFunction\n    }\n  }\n});\n\nvar html = $.render.mytmpl({name: \"Robert\"});\n\n$(\"#person\").html(html);",
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{:~format(name)}}\n  {{:~format(name, true)}}\n</script>",
        "onlyJsRender": true,
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
            "text": "```js\nvar html = $(\"#personTemplate\").render(\n  {name: \"Robert\"}, \n  {format: myFormatFunction}\n);\n```\n\n```jsr\n{{:~format(name, true)}}\n{{:~format(name)}}\n```\n\nSee <a href=\"#tmplrender\"><em>template.render(...)</em></a>"
          }
        ],
        "title": "Passing helpers with  a render() call",
        "code": "function myFormatFunction(value, upper) {\n  return upper ? value.toUpperCase() : value.toLowerCase();\n}\n\nvar html = $(\"#personTemplate\").render(\n  {name: \"Robert\"}, \n  {format: myFormatFunction}\n);\n\n$(\"#person\").html(html);",
        "html": "<div id=\"person\"></div>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{:~format(name, true)}}\n  {{:~format(name)}}\n</script>",
        "onlyJsRender": true,
        "height": "40"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "$.views.helpers(name, helper)",
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
            "description": "Register a helper, to be used in templates with the syntax:<br/>~name"
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
            "description": "Add multiple helpers as resources, to a parent template"
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
        "height": "40"
      },
      {
        "_type": "para",
        "title": "Adding helpers as private resources for a parent template",
        "text": "You can pass in an existing template as an additional `parentTemplate` parameter, on  <em>any</em> call to  `$.views.helpers(...)`.\n\nIn that way the helper you are registering becomes a 'private helper resource' for the `parentTemplate`, rather than being registered globally:"
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "",
        "name": "helpers",
        "object": "$.views",
        "method": true,
        "returns": "",
        "signatures": [
          {
            "_type": "signature",
            "title": "Add one or more helpers as private resources for a parent template",
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
            "description": "Add multiple helpers as resources, to a parent template"
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
            "hash": "tmplrender",
            "label": "template.render(...)"
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
  "jsrobjects": {
    "title": "JsViews objects",
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
    "sections": []
  },
  "viewobject": {
    "title": "view object",
    "path": "",
    "sections": []
  },
  "tagobject": {
    "title": "tag object",
    "path": "",
    "sections": []
  },
  "viewcontextobject": {
    "title": "view context object",
    "path": "",
    "sections": []
  },
  "tagcontextobject": {
    "title": "tag context object",
    "path": "",
    "sections": []
  },
  "node/browserify": {
    "title": "JsRender Browserify support in Node.js",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "[Browserify](http://browserify.org/) lets you create modular javascript projects for the browser, using the NPM `require()` pattern for packages/modules.\n\nJsRender can be loaded as either a server module, or a browser module (with Browserify), by calling\n\n```js\nvar jsrender = require('jsrender)`;\n```\n\nIn addition, JsRender includes a Browserify transform: `jsrender/tmplify` which allows you also to include your server file-based templates in the *bundle.js* client-script bundle generated by Browserify. \n\nYou can then access the compiled templates in the browser, as modules, using:\n\n```js\nvar tmpl = require('./templates/myTemplate.html)`\nvar html = tmpl.render(myData);\n...\n```"
      },
      {
        "_type": "code",
        "title": "Browser code example:",
        "code": "var myTmpl = require(\"./templates/myTemplate.html\"); // Include compiled template in client-script bundle\nvar html = myTmpl(data); // Render"
      },
      {
        "_type": "para",
        "title": "Nested templates",
        "text": "Template inclusion in the bundle can be recursive, so for example if you call `require(\"./templates/myTemplate.html\");` and *myTemplate.html* includes a nested reference to another template, such as `{{include tmpl=\"./another/tmpl2.html\"/}}`, then the client-script bundle will include that template too.\n"
      },
      {
        "_type": "para",
        "title": "Generating the client bundle",
        "text": "If *source.js* includes template references such as: `var tmpl=require('./some/path/myTemplate.html')`, then Browserify generates a client script bundle which will include the referenced templates.\n\n[Browserify](http://browserify.org/) provides three different ways of generating a *bundle.js* script from a *source.js* script, and calling a transform:\n\n**Command line:**\n\n```bash\nbrowserify -t jsrender/tmplify ./source.js > ./bundle.js\n```\n\n**package.json:**\n\n```bash\n\"browserify\": {\n  \"transform\": [\n    [\"jsrender/tmplify\"]\n  ]\n}\n```\n\n**API:**\n\n```bash\nbrowserify('./source.js')\n  .transform(require('jsrender/tmplify'))\n  .bundle()\n  .pipe(fs.createWriteStream('./bundle.js'));\n```"
      },
      {
        "_type": "para",
        "title": "Option: extensions",
        "text": "The `jsrender/tmplify` Browserify transform uses a white-space-separated list of extensions: `\"html jsrender jsr\"`, by default. This means that when you generate a client-script bundle using the `tmplify` transform, it will treat any `.html`, `.jsrender` or `.jsr` file as a template, and will include the compiled template in the client-script bundle for rendering in the browser. \n\nYou can instead specify a different list of file extensions for templates, by using the `--extensions` or `-e` option, as in the following examples:\n\n```bash \nbrowserify -t [jsrender/tmplify --extensions 'htm jsrender'] ./source.js > ./bundle.js\n```\n\n```bash \nbrowserify -t [jsrender/tmplify -e 'htm jsrender'] ./source.js > ./bundle.js\n```\n\n```bash \n\"browserify\": {\n  \"transform\": [\n    [\"jsrender/tmplify\", {\n      \"extensions\": \"htm jsrender\"\n    }]\n  ]\n}\n```\n\n```bash \nbrowserify('./source.js')\n  .transform(require('jsrender/tmplify'), {extensions: 'htm jsrender'})\n  .bundle()\n  .pipe(fs.createWriteStream('./bundle.js'));\n```"
      },
      {
        "_type": "para",
        "title": "Including jQuery and/or JsRender in the client-script bundle",
        "text": "When using Browserify with JsRender on Node.js, you will generally need jQuery and JsRender/JsViews in the client, to render (and optionally data-link) the templates.\n\njQuery and JsRender are both available as NPM/Browserify modules, so you can choose whether to load them statically, using a script block, or as a module. Here are three examples following alternative strategies:\n\n**Load jQuery and JsRender statically**\n\n`$` is defined as a global variable.<br/>\nUse `require(templatePath)` to load templates as Browserify modules included in the client-script bundle, as in the following example:\n\n```jsr\n<script href=\".../jquery...js\"></script>\n<script href=\".../jsrender.js\"></script>\n\n<script>\n  var myTmpl = require(\"./templates/myTemplate.html\"); // Include compiled template in client-script bundle\n\n  var html = myTmpl(data); // Render using compiled template\n  $(\"#result\").html(html); // $ is a global\n</script>\n```\n(See [clientcode-movies-browserify.js](//github.com/BorisMoore/jsrender-node-starter/blob/master/browserify/clientcode-movies-browserify.js) and [layout-movies-browserify.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/layout-movies-browserify.html) on the [JsRender Node Starter](\"https://github.com/BorisMoore/jsrender-node-starter\") project, for a complete example.)\n \n**Load jQuery and JsRender as Browserify modules**\n\nUse `require('jQuery)` to load jQuery, and `require('jsrender')($)` to load JsRender.<br/>\nUse `require(templatePath)($)` to load templates as Browserify modules included in the client-script bundle, as in the following example:\n\n```jsr\n<script>\n  var $ = require('jquery');\n  require('jsrender')($);\n  var myTmpl = require(\"./templates/myTemplate.html\")($); // Include compiled template in client-script bundle\n\n  var html = myTmpl(data); // Render using compiled template\n  $(\"#result\").html(html);\n</script>\n```\n\n(See [clientcode-hello-browserify.js](//github.com/BorisMoore/jsrender-node-starter/blob/master/browserify/clientcode-hello-browserify.js) and [layout-hello-browserify.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/layout-hello-browserify.html) for a complete example.)\n\n**Mixed approach: Load jQuery statically, and JsRender as a Browserify module**\n\n`$` is defined as a global variable.<br/>\nUse `require('jsrender')` to load JsRender.<br/>\nUse `require(templatePath)` to load templates as Browserify modules included in the client-script bundle, as in the following example:\n\n```jsr\n<script href=\".../jquery...js\"></script>\n\n<script>\n  require('jsrender');\n  var myTmpl = require(\"./templates/myTemplate.html\"); // Include compiled template in client-script bundle\n\n  var html = myTmpl(data); // Render using compiled template\n  $(\"#result\").html(html); // $ is a global\n</script>\n```"
      },
      {
        "_type": "para",
        "title": "Sample code",
        "text": "For running code examples using JsRender, Browserify, and the `tmplify` transform, see the *index-express-browserify.js* and *index-hapi-browserify.js* samples in the [JsRender Node Starter](\"https://github.com/BorisMoore/jsrender-node-starter\") project."
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
    "title": "File-based templates",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Defining templates as .html files",
        "text": "On Node.js, JsRender templates can be stored directly in the file system  (e.g. as `.html`, `.jsr.` or `.jsrender` files) -- for example:\n\n**Template:** *./templates/myTemplate.html* -- with contents:\n\n```jsr\nName: {{:name}}<br/>\n```\n\n**Code:** JsRender recognizes file paths, so you can write:\n\n```js\nvar jsrender = require('jsrender');\n\nvar tmpl = jsrender.templates('./templates/myTemplate.html'); // Compile the template\n\nvar html = tmpl({name: \"Jim\"}); // Render\n// result: Name: Jim<br/>\n```\n"
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
                "description": "Path to template file"
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
            "example": "var jsr = require('jsrender');\nvar html = jsr.renderFile('./.../myTmpl.html', myData);",
            "description": "Load file-based template, compile and render against data"
          }
        ],
        "description": "Shortcut method - compile and render",
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
        "title": "Nested calls to file-based templates",
        "text": "JsRender's awareness of Node.js file paths means your templates can include recursive calls to other templates (partials). You don't need to register or compile those templates separately.\n\n**Template:** *./templates/personTemplate.html*:\n\n```jsr\nName: {{:name}}<br/>Address: {{include tmpl='./templates/other/addressTemplate.jsr'}}\n```\n\n**Template:** *./templates/other/addressTemplate.jsr*:\n```jsr\nStreet: <em>{{:street}}</em>\n```\n\n**Code:** Compile and render, recursively:\n\n```js\nvar jsrender = require('jsrender');\n\nvar tmpl = jsrender.templates('./templates/personTemplate.html');\n// Compile template - and also any recursively called templates\n\nvar html = tmpl({name: \"Jim\", street: \"Main St\"});\n// result: Name: Jim<br/>Address: <em>Main St</em>\n```"
      },
      {
        "_type": "para",
        "title": "Register a file-based template by name - and render it",
        "text": "For convenience you can register file-based templates by name, just as you can for [templates from strings](#d.templates@namedfromstring).\n\n```js\n// Register named template - \"myTmpl1\n$.templates(\"myTmpl1\", \"./templates/myTemplate.html\");\n\n// Render named template\nvar html = $.templates.myTmpl1(person);\n\n// Alternative syntax: var html = $.render.myTmpl1(person);\n```\n"
      },
      {
        "_type": "para",
        "title": "Automatic caching of file-based templates",
        "text": "The first time `jsrender.templates('./templates/myTemplate.html')` is called, JsRender will:\n\n - load the template file from the file system\n - compile the template\n - cache the template\n - return the compiled template\n\nThe cached template can be accessed directly as `jsrender.templates['./templates/myTemplate.html']` - and can also be deleted by calling `delete jsrender.templates['./templates/myTemplate.html']`, or `jsrender.templates('./templates/myTemplate.html', null)`\n\nOn subsequent calls, JsRender will simply:\n - return the compiled template\n\nThe caching means you can load and compile the template during server initialization, and avoid the cost of reading the file or compiling during HTTP requests:\n\n```js\njsrender.templates('./templates/myTemplate.html'); // Cache the compiled template\n\napp.get('/...', function(req, res) {\n  res.render('myTemplate', {name: \"Jim\"}); // Render previously cached template, using Express\n});\n```\n\nSimilarly when using the alternative forms for rendering templates:\n\n```js\napp.get('/...', function(req, res) {\n  var tmpl = jsrender.templates('./templates/myTemplate.html'); // Get previously cached template\n  var html = tmpl.render({name: \"Jim\"});\n  res.send(html);\n});\n```\n\nor \n\n```js\napp.get('/...', function(req, res) {\n  var html = jsrender.renderFile('./templates/myTemplate.html', {name: \"Jim\"}); // Render previously cached template\n  res.send(html);\n});\n```"
      },
      {
        "_type": "para",
        "title": "Using the same template on the server and in the browser",
        "text": "JsRender lets you easily use the same templates for both server and browser rendering. See [server/browser templates](#node/server-browser) for details on two alternative approaches, one with the `{{clientTemplate}}` tag, and the other using *Browserify*."
      }
    ]
  },
  "jsrnode": {
    "title": "JsRender for Node.js",
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
    "title": "Installation",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "On Node.js from the command line, install jsrender:\n\n```bash\n$ npm install jsrender --save\n```\n\n## Usage\n\nLoad the jsrender module:\n\n```js\nvar jsrender = require('jsrender');\n```\n\nNow call JsRender APIs, or use [Express](#node/express-hapi@express) or [Hapi](#node/express-hapi@hapi) integration, for server-rendering of JsRender templates."
      },
      {
        "_type": "para",
        "title": "JsRender APIs on the server &ndash; same as in the browser!",
        "text": "In the browser, when jQuery is present, JsRender loads as a jQuery plugin and adds APIs to the jQuery namespace object, as:\n\n`$.views`, `$.templates` and `$.render` \n\nOn the server exactly the same APIs are provided, associated instead with the `jsrender` namespace:\n\n`jsrender.views`, `jsrender.templates` and `jsrender.render`.\n\nFor convenience you can call the namespace `$` and then use the regular APIs: `$.views...` `$.templates...` `$.render...`, or copy from the regular browser examples/samples -- as if in the browser with jQuery.\n\nFor example:\n\n```js\nvar $ = require('jsrender'); // Returns the jsrender namespace object - referenced for convenience as var $\n\nvar tmpl = $.templates('Name: {{:first}} {{upper:last'); // Compile template from string\n\n$.views.converters('upper', function(val) {return val.toUpperCase()}); // Register converter\n \nvar data = {first: 'Jo', last: 'Ryan'};\n\nvar html = tmpl(data); // Or alternative syntax: var html = tmpl.render(data);\n// result: \"Name: Jo RYAN\" \n```",
        "anchor": "apis"
      },
      {
        "_type": "para",
        "title": "Using helpers, converters, custom tags...",
        "text": "On Node.js you can use the full set of JsRender features, template tags and APIs, just as you would in the browser - by simply using the `jsrender` namespace object returned from `require('jsrender')`, instead of the jQuery object, `$`. In addition you can take advantage of file-based templates.\n\n**Custom Tags example:** -- For example, here is the JsRender Quickstart [Custom Tags](#jsr-quickstart@customtags) sample, as you might write it on Node.js:\n\n**Template:** *./templates/personTemplate.html*:\n\n```jsr\nName: {{fullName person/}}\n```\n\n**Code:**\n\n```js\nvar jsrender = require('jsrender');\n\njsrender.views.tags(\"fullName\", \"{{:first}} {{:last}}\"); // Register custom tag\n\nvar tmpl = jsrender.templates('./templates/personTemplate.html'); // Compile template\n\nvar html =  tmpl({person: {first: \"Jim\", last: \"Varsov\"}}); // Render\n// result: \"Jim Varsov\"\n```\n\n**Helpers example:** -- And here is the JsRender Quickstart [Helpers](#jsr-quickstart@helpers) example, in a version for Node.js:\n\n**Template:** *./templates/personTemplate.html*:\n\n```jsr\n{{:~title}} {{:first}} {{:~upper(last)}}\n```\n\n**Code:**\n\n```js\nvar jsrender = require('jsrender');\n\nvar myHelpers = {\n    upper: function(val) { return val.toUpperCase(); },\n    title: \"Sir\"\n};\n\nvar tmpl = $.templates('./templates/personTemplate.html');\n\nvar data = {first: \"Jim\", last: \"Varsov\"};\n\nvar html =  tmpl(data, myHelpers);\n// result: \"Sir Jim VARSOV\"\n```\n\nOr we can register helpers globally:\n\n```js\njsrender.views.helpers(myHelpers);\n\nvar data = {first: \"Jim\", last: \"Varsov\"};\nvar html =  tmpl(data);\n// result: \"Sir Jim VARSOV\"\n```"
      }
    ]
  },
  "node/express-hapi": {
    "title": "Express and Hapi integration",
    "path": "",
    "sections": [
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
    "title": "Sharing the same templates between server and  browser",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender lets you share templates between server and client, using either of the *Browserify* or *{{clientTemplate}}* approaches shown below."
      },
      {
        "_type": "para",
        "title": "Browserify",
        "text": "Using Browserify with the `jsrender/tmplify` transform allows you to include your server file-based templates in the Browserify client-script bundle. \n\nYou can then access the compiled templates in the browser, as modules, using:\n\n```js\nvar tmpl = require('./.../myTemplate.html)`\nvar html = tmpl.render(myData);\n...\n```\n\nFor details, see the [Browserify](#node/browserify) topic.\n\nFor complete running samples, see the *index-express-browserify.js* and *index-hapi-browserify.js* samples in the [JsRender Node Starter](\"https://github.com/BorisMoore/jsrender-node-starter\") project."
      },
      {
        "_type": "para",
        "title": "Rendering file-based templates in the browser: {{clientTemplate}}",
        "text": "JsRender also provides a `{{clientTemplate}}` tag that makes file-based templates available for rendering in the browser without needing to use Browserify.\n\nSimply include `{{clientTemplate \"templateFilePath...\"}}` in the layout template, for any template you want to expose in the browser:\n\n```jsr\n<head>\n  {{clientTemplate \"./templates/myTemplate.html\" /}}\n</head>\n\n<div id=\"result\"></div>\n\n<script>\n  var data = ...\n  var tmpl = $.templates(\"./templates/myTemplate.html\");\n  var html = tmpl(myData);\n\n  $(\"#result\").html(html);\n</script>\n```\n\nSee the *index-express.js* and *index-hapi.js* samples in the [JsRender Node Starter](\"https://github.com/BorisMoore/jsrender-node-starter\") project."
      },
      {
        "_type": "para",
        "title": "JsRender on the server, JsRender or JsViews in the browser...",
        "text": "Both the *Browserify* and the *{{clientTemplate}}* approach to sharing templates between server and browser let you then render or link those templates in the browser, using JsRender or JsViews.\n\nIn the browser, you reference the templates using the same `./file/path/template.html` syntax as on the server. \n\nFor example, in the [JsRender Node Starter](\"https://github.com/BorisMoore/jsrender-node-starter\") samples, the [layout-movies.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/layout-movies.html) template contains the following:\n\n```html\n<tbody data-link=\"{include tmpl='./templates/movie-list.html'}\">\n\t{{include tmpl=\"./templates/movie-list.html\"/}}\n</tbody>\n```\n\nHere, the `{{include ...}}` is used on the server to do initial rendering of the movies list using the *movie-list.html* template. Then in the browser, the `data-link=\"{include ...}` causes JsViews to access the same template in the browser, and provide dynamic data-binding of the list...\n"
      },
      {
        "_type": "para",
        "title": "Single Page Apps with initial rendering on server",
        "text": "An important scenario is a *single page app* using JsRender or JsViews in the client to create dynamic UI, combined with initial rendering of the content on the server by JsRender using the same template.\n\nThis can bring many advantages, including SEO, and eliminating flicker when the page is refreshed with a new server request.\n\n*Note:* To completely eliminate flicker on data-linked content which has already been rendered on the server, it is sometimes useful to use the syntax `data-link=\"...^{...}\"` -- which data-links without doing the initial render. Here is an example from  [movie-detail.html](//github.com/BorisMoore/jsrender-node-starter/blob/master/templates/movie-detail.html) in the [JsRender Node Starter](\"https://github.com/BorisMoore/jsrender-node-starter\"):\n\n```html\n<div><input value=\"{{:title}}\" data-link=\"^{:title trigger=true:}\" /></div>\n```\n"
      }
    ]
  }
};