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
            "_type": "code",
            "title": "",
            "code": "{\n  name: \"Pete\",\n  address: {\n    city: \"Seattle\"\n  }\n}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "<em>~root</em> is the top-level data, and <em>#data</em> is the current data item"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{:name}} ... {{:address.city}}\n\n... {{:~root.address.city}}\n\n... {{:#data.address.city}}"
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
            "_type": "code",
            "title": "",
            "code": "[\n  {name: \"Pete\", ...},\n  {name: \"Heidi\", ...}\n]"
          },
          {
            "_type": "para",
            "title": "",
            "text": "<em>#xxx</em> is the \"xxx\" property of the current view - so <em>#index</em> is the <em>view.index</em> "
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{:#index+1}}"
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
            "_type": "code",
            "title": "",
            "code": "{description: \"A <b>very nice</b> appartment\"}"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{:description}}\n...\n{{>description}}"
          }
        ],
        "data": {
          "description": "A <b>very nice</b> appartment"
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
                "text": "<b>Note:</b> The data context inside the <em>{{for}}</em> block is the object returned by the path or expression."
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
        "description": "<em>Template composition</em>: &mdash; Render the block content of the {{for}} tag (or the referenced external template), using the object or array specified by the path or expression as data context. If it is an array, iterate over the array, rendering once for each item.",
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
            "_type": "template",
            "title": "",
            "markup": "{{:name}} lives in {{for address tmpl=\"#addressTemplate\" /}}"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  <b>{{>city}}</b>\n</script>\n"
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
        "text": "Using the {{else}} tag between <em>{{for}}</em> and <em>{{/for}}</em>, allows alternate rendering based on the object or array returned from the path or expression <em>{{for pathOrExpr}}</em>"
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
        "description": "<em>Conditional blocks</em>: &mdash; Render the block content of the {{for}} tag (or referenced template) if the object is defined and is not an empty array, otherwise render the {{else}} block (or template)",
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
                "text": "<b>Note:</b> The data context inside the <em>{{props}}</em> block is an object with properties <em>key</em> and <em>props</em>:"
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
        "description": "<em>Template composition</em>: &mdash; Iterate over the properties of the object, and render the block content of the {{props}} tag (or the referenced external template) once for each property &mdash; using as data context: <em>{<b>key</b>: propertyName, <b>prop</b>: propertyValue}</em>.",
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
            "_type": "template",
            "title": "",
            "markup": "{{props address tmpl=\"#addressTemplate\" /}}"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<script id=\"addressTemplate\" type=\"text/x-jsrender\">\n  <b>{{>key}}:</b> {{>prop}}<br/>\n</script>\n"
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
        "text": "Using the {{else}} tag between <em>{{props}}</em> and <em>{{/props}}</em>, allows alternate rendering based on the object returned from the path or expression <em>{{props pathOrExpr}}</em>"
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
        "description": "<em>Conditional blocks</em>: &mdash; Render the block content of the {{prop}} tag (or referenced template) if the object is defined and is not an empty object (no properties), otherwise render the {{else}} block (or template)",
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
                "text": "<b>Note:</b> The data context inside the <em>{{if}}</em> block is the same as the outer context"
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
        "description": "<em>Conditional inclusion</em>: &mdash; Render the block content of the {{if}} tag (or the referenced external template) only if the data-path or expression evaluates to true ('or truthy')",
        "sectionTypes": {}
      },
      {
        "_type": "para",
        "title": "Using the {{else}} tag with {{if}}",
        "text": "Using the {{else}} tag between <em>{{if}}</em> and <em>{{/if}}</em>, allows alternate rendering based on '<em>if ... else ...</em>' logic:"
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
                "text": "<b>Note:</b> The data context inside the {{if}} and {{else}} blocks is the same as the outer context"
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
        "description": "<em>Alternative conditional blocks</em>: &mdash; Render the block content of the {{if}} tag (or referenced template) if the expression is true, otherwise render the {{else}} block (or template)",
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
        "text": "You can add more than one <em>{{else}}</em> tag between <em>{{if}}</em> and <em>{{/if}}</em>, to get alternate rendering based on '<em>if ... elseif ... else ...</em>' logic. For <em>elseif</em>, just include an expression...:\n"
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
                "text": "<b>Note: </b>Any of the {{if}} or {{else}} tags can have a <em>tmpl=nameOrExpr</em> parameter. The external template will be used instead of block content for that tag."
              }
            ],
            "example": "{{if nickname}}\n    Nickname: {{:nickname}}\n{{else altnickname}}\n    Alternate nickname: {{:altnickname}}\n{{else}}\n    No nickname...\n{{/if}}",
            "description": "Render first block for which condition is true, otherwise last block",
            "variant": "{{if pathOrExpr1}}...{{else pathOrExpr2}}...{{else}}...{{/if}"
          }
        ],
        "description": "<em>Multiple alternative conditional blocks</em>: &mdash; Render the first {{if}} or {{else}} block for which the expression is true. If none are true, and there is an {{else}} without an expression, render that block",
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
            "_type": "code",
            "title": "",
            "code": "[\n  {title: \"The A team\", members: [...], standby: [...]},\n  {title: \"The B team\", members: [], standby: [...]},\n  {title: \"The C team\", standby: []}\n]"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{if members && members.length}}\n  ...\n{{else standby && standby.length}}\n  Standby only:\n  ...\n{{else}}\n  No members!\n{{/if}}"
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
        "text": "The <em>{{else}}</em> tag acts as a separator, to divide the content of a tag into two or more different content blocks.\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "So it allows another tag to provide specific behavior involving more than one content block."
      },
      {
        "_type": "para",
        "title": "&nbsp;",
        "text": "For example, you can use the <em>{{else}}</em> tag with <em><a href=\"#iftag\">{{if}}</a></em>:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{{if expression}}\n    render this if the expression is true\n{{else}}\n    render this if the expression is false\n{{/if}}"
      },
      {
        "_type": "para",
        "title": "",
        "text": "to get 'if / else' behavior."
      },
      {
        "_type": "para",
        "title": "&nbsp;",
        "text": "Or you can use the <em>{{else}}</em> tag with <em><a href=\"#fortag\">{{for}}</a></em>:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{{for members}}\n    Member Name: {{:name}}\n{{else}}\n    There are currently no members...\n{{/for}}"
      },
      {
        "_type": "para",
        "title": "",
        "text": "to render what you want to show if an array is empty, or if an array or object is null or undefined."
      },
      {
        "_type": "para",
        "title": "&nbsp;",
        "text": "Similarly you can use <em>{{else}}</em> with a custom tag, such as:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{{tabs tabCaption=\"First Tab\"}}\n    first tab content\n{{else tabCaption=\"Second Tab\"}}\n    second tab content\n{{/tabs}}"
      },
      {
        "_type": "para",
        "title": "",
        "text": "as shown in <a href=\"#samples/tag-controls/tabs\">this sample</a>."
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
        "text": "You can include "
      },
      {
        "_type": "template",
        "title": "",
        "markup": "<!-- This is an HTML comment -->"
      },
      {
        "_type": "para",
        "title": "",
        "text": "&mdash; but unlike the JsRender comment tag, the HTML comment will not be ignored by JsRender or JsViews. It will be included in the rendered output, and will get inserted into the DOM along with other rendered markup."
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
        "text": "JsRender templates allow you to write rich expressions within the template tags, such as <em>{{: someExpression}}</em>. Nevertheless, in order to improve encapsulation and maintainability, they don't allow <em>arbitrary</em> code. For example, they don't allow you to access global variables, like <em>window</em>. "
      },
      {
        "_type": "para",
        "title": "",
        "text": "If you want complete freedom to insert any code into a compiled template, you can set <em>allowCode</em> to <em>true</em>, either globally, or specifically for that template. You can then insert any code by using the <em>{{* ... }}</em> tag, or you can return (render into the template output) the result of evaluating any expression, using the <em>{{*: ... }}</em> tag."
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
        "text": "Here is an example, with <em>allowCode</em> set to <em>true</em> globally:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.views.settings.allowCode= true;"
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
            "text": "Enable allowCode in all templates:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.views.settings.allowCode= true;"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Define a global variable, then increment it:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{* window.myvar=2; myvar+=4; }}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Insert the value into the rendered output:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<div> Initial value: {{*:myvar}}</div>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Increment the value again, and output the new value:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "{{* window.myvar+=11; }}\n\n<div> New value: {{*:myvar}}</div>\n"
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
        "text": "And here is an example that uses both regular JsRender tags, like <em>{{for}}</em>, and <em>allowCode</em> tags:"
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
            "code": "$.views.settings.allowCode= true; \n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Define a global variable:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{* window.total = 0}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Iterate through a list, and use <em>{{* ...}}</em> to increment the <em>total</em>, and <em>{{*:}}</em> to return each value:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "{{for list}}\n  {{* total += data}}\n    <li>\n      Amount {{:}} (Running total: {{*: total}})\n   </li>\n{{/for}}"
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
        "text": "Here is another example, in which we will replace the <em>{{for list}}</em> iteration by pure code-based iteration using <em>{{* ...}}</em>. This makes it easy to iterate only over the odd members of the array."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<br/>This time we will enable code insertion just for this template:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.templates(..., {\n  markup: ...,\n  allowCode: true,\n  ...\n})"
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
            "text": "Enable allowCode just for this template:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "var tmpl = $.templates({\n    markup: \"#myTemplate\",\n    allowCode: true\n  });\n \nvar html = tmpl.render(data);"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Insert template code to iterate over odd numbers:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{* for (i=0; i<data.list.length; i+=2) { }}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Output the 1-based index and the value:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "{{*: i+1}}: Amount {{*:data.list[i]}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Insert the end of the <em>for</em> block, <em>{{* <b>}</b> }}</em> into the template code:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": " {{* } }}"
          },
          {
            "_type": "para",
            "title": "",
            "text": ""
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
            "hash": "customtags",
            "label": "Explore: custom tags"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/tags",
            "label": "Sample: JsRender custom tags"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls",
            "label": "Sample: JsViews tag controls"
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
        "text": "A template is rendered by calling the <em>render()</em> method."
      },
      {
        "_type": "para",
        "title": "",
        "text": "The <em>render(data, helpersOrContext)</em> method takes as parameters the data (used as the <em>' data context'</em> during the rendering), and optionally additional metadata or contextual helpers. It returns a string - which is the rendered template - typically HTML markup with data values or computed values inserted at appropriated points in the string."
      },
      {
        "_type": "para",
        "title": "",
        "text": "There are three ways of calling the <em>render()</em> method:\n<ul class=\"textbefore\"><li>If you have a reference to the <em>template object</em>, call <a href=\"#tmplrender\"><em>template.render(...)</em></a></li>\n<li>If you have registered the template by name (<em>\"myTmpl\"</em>), call <a href=\"#d.render\"><em>$.render.myTmpl(...)</em></a></li>\n<li>If the template is declared in a script block, with selector <em>\"#myTmpl\"</em>, you can also call <a href=\"#db.render\"><em>$(\"#myTmpl\").render(...)</em></a></li></ul>"
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
        "text": "The <em>render()</em> method of a template takes a <em>data</em> object or array (as well as an optional <em>helpersOrContext</em> object), and returns the rendered template as a string. "
      },
      {
        "_type": "para",
        "title": "",
        "text": "To get a template object from a template string, or a template declared in a script block, see <a href=\"#compiletmpl\">Compile/register/get a template</a>."
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
        "text": "Passing an object to the <em>.render()</em> method."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>&mdash; The template is rendered once, with the object as data context:</em>"
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
        "text": "Passing an array to the <em>.render()</em> method."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>&mdash; The template is rendered once for each item in the array:</em>"
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
        "text": "Passing helpers to the <em>render()</em> method."
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
                "description": "Contextual helper methods or properties - available to template as <em>~keyName</em>"
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
        "text": "You can pass in any JavaScript type (<em>object, string, number, function...</em>) as helpers on the <em>helpersOrContext</em> object, and use them as metadata, or as helper functions for formatting etc."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Just add \"~\" to access them as <a href=\"#expressions/helperpath\">helper paths</a>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "See <a href=\"#helpers\">Providing helpers</a> for the relationship to globally registered helpers <em>- $.views.helpers(...)</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>Note:</em> By passing in helpers in this way, you are making them specific to this render call. You can also declare helpers globally, and you can also declare helpers that are private to a specific template. If you want to provide converters or custom tags with \n\nSimilarly you can cannot pass in converters or "
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
            "code": "var html = myTmpl.render(person, {color: \"red\", format: toUpper});"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<td style=\"color:{{:~color}};\">\n  {{:~format(name)}}\n</td>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Click <em>Try it</em> and change the color to \"green\"..."
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
        "text": "If a template has been registered as a named template:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$.templates(\"myTmpl\", \"#personTmpl\");"
      },
      {
        "_type": "para",
        "title": "",
        "text": "...then you can call the <a href=\"#tmplrender\"><em>render()</em></a> method of the template without needing to hold on to the compiled template object returned from <a href=\"#d.templates\"><em>$.templates(...)</em></a>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Just call <em>$.render.myTmpl(...)</em>, or <em>$.render[\"myTmpl\"](...)</em>"
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
                "description": "Contextual helper methods or properties - available to template as <em>~keyName</em>"
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
        "text": "If a template has been registered using a script block:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  ...\n</script>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "...then you can call the <a href=\"#tmplrender\"><em>render()</em></a> method of the template without needing to hold on to the compiled template object returned from <a href=\"#d.templates\"><em>$.templates(...)</em></a>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Just call <em>$(\"#myTmpl\").render(...)</em>"
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
                "description": "Contextual helper methods or properties - available to template as <em>~keyName</em>"
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
            "_type": "template",
            "title": "",
            "markup": "<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  ...\n</script>"
          },
          {
            "_type": "code",
            "title": "",
            "code": "var html = $(\"#personTemplate\").render(person);"
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
        "text": "To create a template you need to provide the markup for the template. JsRender will convert (compile) the markup into a javascript function &mdash; the 'render' function for your template. In fact for convenience, JsRender creates a <em>template object</em> which has a <a href=\"#rendertmpl\"><em>template.render()</em></a> method which is the compiled function.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "There are two ways to create a template:\n<ul class=\"textbefore\"><li>Pass the markup string to the <a href=\"#d.templates\"><em>$.templates()</em></a> method, which will compile it as a template object, and optionally register it by name</li>\n<li>Declare the template in a script block with <em>type=\"text/x-jsrender\"</em> (or at least a type other than the default <em>text/javascript</em>). In that case JsRender will automatically call <em>$.templates()</em>. You will only need to call it yourself if you want to access the <em>template object</em></li></ul>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The first approach has the advantage of keeping your template declaration independent of the HTML markup that you are loading into the browser. Indeed you may want to provide the template markup strings for your templates in different application-specific ways, such as loading the string from the server (using a script file or text or html file), creating 'computed' template markup strings on the fly, etc."
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
            "text": "The <em>person.js</em> script registers a named <em>\"person\"</em> template:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.templates(\"person\", \"<label>Name:</label> {{:name}} \");"
          },
          {
            "_type": "para",
            "title": "",
            "text": "We load the script from the server, and it registers our template. As soon as the script is loaded, we call the <a href=\"#d.render\"><em>render(...)</em></a> method for our template:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.getScript(\".../person.js\", function() {\n    var html = $.render.person(people);\n    $(\"#peopleList\").html(html);\n  });\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "<em>Note:</em> For a more sophisticated example of lazy loading of scripts for registering templates, see the <a href=\"#samples/jsr/composition/remote-tmpl\">remote templates</a> sample."
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
            "text": "The markup string is fetched in an AJAX request (the <em>person.txt</em> file)."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<label> Name:</label> {{:name}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "As soon as the request returns, we use the markup string to compile the <em>personTemplate</em> object, and then call its <a href=\"#tmplrender\"><em>render(...)</em></a> method:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.get(\"...person.txt\", function(value) {\n  personTemplate = $.templates(value);\n  var html = personTemplate.render(people);\n  $(\"#peopleList\").html(html);\n});"
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
            "text": "This time we put our markup in a script block with <em>type=\"text/x-jsrender\"</em>..."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Then in the code we call the <a href=\"#d.templates\"><em>$.templates</em></a> method with a jQuery selector for that script block, to register our template as a named template. (We could also hold on to the template object, which is the returned value...)  "
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.templates(\"personTmpl\", \"#personTemplate\");"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Then as before we call the <a href=\"#rendertmpl\"><em>render</em></a> method for the named template:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "var html = $.render.personTmpl(people);"
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
        "text": "<em>$.templates()</em> is powerful and flexible. You can use it for many scenarios, including the following:\n<ul class=\"textbefore\">\n<li>Compile a template from a string</li>\n<li>Get a template object for a template declared in a script block</li>\n<li>Register a template (from either a string or a script block declaration) as a <em>named template</em></li>\n</ul>\n"
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
            "_type": "template",
            "title": "",
            "markup": "<script id=\"personTemplate\" type=\"text/x-jsrender\">\n ...\n</script>"
          },
          {
            "_type": "code",
            "title": "",
            "code": "var myTmpl = $.templates(\"#personTemplate\");\n\nvar html = myTmpl.render(person);\n"
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
        "title": "Register named template from a string"
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
        "text": "You can register multiple <em>named templates</em> in one call to <em>$.templates()</em> as follows:"
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
            "_type": "template",
            "title": "",
            "markup": "<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{include tmpl=\"labelTmpl\"/}} {{:name}}\n</script>"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.templates({\n  personTmpl: \"#personTemplate\",\n  labelTmpl: \"<label>Name:</label>\"\n});\n\nvar html = $.render.personTmpl(person);\n"
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
        "text": "Once you have registered one or more <em>named templates</em> you can get the template object for a named template as follows:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "var myTemplate = $.templates.myTemplateName;"
      },
      {
        "_type": "para",
        "title": "Advanced scenarios: Associating private resources with templates",
        "text": "<em>$.templates()</em> can also be used for the following more advanced scenarios:\n<ul class=\"textbefore\">\n<li>Compile a template, (or multiple templates) along with specified resources to be available only within that template</li>\n<li>Compile one or more templates to be added to the set of private resources of another (already compiled) template</li>\n</ul>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "You can use <em>$.templates()</em> to compile or register not only a template, but in addition some <em>helpers</em>, <em>converters</em>, <em>custom tags</em> or nested <em>sub-templates</em>, to be made available to the new template as private resources."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that as an alternative you can register resources (<em>helpers</em>, <em>converters</em>, <em>custom tags</em> or <em>templates</em>) globally, using <a href=\"#helpers\"><em>$.views.helpers</em></a>, <a href=\"#converters\"><em>$.views.converters()</em></a>, <a href=\"#tags\"><em>$.views.tags()</em></a>, or <a href=\"#d.templates\"><em>$.templates()</em></a> - rather than making them private to the template that needs to reference them."
      },
      {
        "_type": "api",
        "typeLabel": "API:",
        "title": "",
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
            "text": "A converter and a helper are registered as private resources for the \"personTmpl\" named template."
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.templates(\"personTmpl\", {\n  markup: \"#personTemplate\",\n  converters: {\n    upper: function(val) {return val.toUpperCase();}\n  },\n  helpers: {\n    append: function(a, b) {return a + b;}\n  }\n});\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "They are accessed with the \"personTmpl\""
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  {{upper:~append(\"Mr \", name)}}\n</script>"
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
        "text": "You can pass in an existing template as an additional <em>parentTemplate</em> parameter, on  <em>any</em> call to  <em>$.templates(...)</em>. In that way the template you are registering becomes a 'private template resource' for the <em>parentTemplate</em>."
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
            "hash": "samples/jsr/composition/sub-templates",
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
        "text": "In JsRender, a converter is a convenient way of processing or formatting data-value, or the result of expression evaluation - as in:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{{html:movie.description}} - this data is HTML encoded\n{{url:getTheFilePath()}} - this expression will be URL-encode\n{{daymonth:invoice.date}} - this date uses my formatter "
      },
      {
        "_type": "para",
        "title": "",
        "text": "You use built-in converters to HTML-encode, attribute-encode, or URL-encode. And you can register custom converters."
      },
      {
        "_type": "para",
        "title": "",
        "text": "With JsViews, you can use converters with two-way data-binding, and you will have a <em>convert</em> and a <em>convertBack</em> converter - one for each direction."
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
                "description": "name of converter - to be used in template markup: {{<b>name:</b> ...}}"
              },
              {
                "_type": "param",
                "name": "converterFn",
                "type": "function",
                "optional": false,
                "description": "Converter function. Takes <b>val</b> parameter and returns converted value"
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
            "_type": "code",
            "title": "",
            "code": "$.views.converters(\"upper\", function(val) {\n  return val.toUpperCase();\n});"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{upper:nickname}}\n{{upper: \"this will be upper case too\"}}"
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
        "text": "<em>Note:</em> the <em>this</em> pointer within the converter function is the instance of the tag, and can be used in more advanced usage of converters as in the following example:"
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
            "text": "You can access multiple parameters and properties from the converter function."
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.views.converters(\"full\", function(first, last) {\n  var format = this.tagCtx.props.format;  \n  return ...;\n});"
          },
          {
            "_type": "para",
            "title": "",
            "text": "(You can also access the full data object: <em>this.tagCtx.view.data</em>)"
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
        "text": "You can pass in an existing template as an additional <em>parentTemplate</em> parameter, on  <em>any</em> call to  <em>$.views.converters(...)</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "In that way the converter you are registering becomes a 'private converter resource' for the <em>parentTemplate</em>, rather than being registered globally:"
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
        "text": "JsRender includes an HTML encoder, which you can use programmatically as follows:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "var myHtmlEncodedString = $.views.converters.html(myString);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The same encoder is accessed declaratively as a converter, as in the following two examples:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{{html:myExpression}}\n\n{{>myExpression}}"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In fact <em>{{>...}}</em> is exactly equivalent to <em>{{html:...}}</em> and is provided as a simpler syntax for HTML encoding values taken from data or from expressions and rendered within HTML content."
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
                "text": "Encodes according to the following scheme:\n<br/><br/>\n&amp; &rarr; &amp;amp;<br/>\n&lt; &rarr; &amp;lt;<br/>\n&gt; &rarr; &amp;gt;<br/>\n\\x00 &rarr; &amp;#0;<br/>\n' &rarr; &amp;#39;<br/>\n\" &rarr; &amp;#34;<br/>\n` &rarr; &amp;#96;"
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
        "text": "JsRender includes an encoder intended for use when attribute encoding is needed. You can use it programmatically as follows:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "var myAttributeEncodedString = $.views.converters.attr(myString);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The same encoder is accessed by declaratively as a converter:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{{attr:myExpression}}\n"
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
                "text": "Encodes according to the following scheme:\n<br/><br/>\n&amp; &rarr; &amp;amp;<br/>\n&lt; &rarr; &amp;lt;<br/>\n&gt; &rarr; &amp;gt;<br/>\n\\x00 &rarr; &amp;#0;<br/>\n' &rarr; &amp;#39;<br/>\n\" &rarr; &amp;#34;<br/>\n` &rarr; &amp;#96;"
              },
              {
                "_type": "para",
                "title": "",
                "text": "Note that this scheme encodes more characters than is sometimes the case for attribute encoding. In fact currently <em>{{attr: ...}}</em> and <em>{{html: ...}}</em> are equivalent. This ensures that using attribute encoding when HTML encoding should have been used will not expose an injection attack risk from untrusted data."
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
        "text": "JsRender includes a URL encoder, which you can use programmatically as follows:"
      },
      {
        "_type": "code",
        "title": "",
        "code": "var myUrlEncodedString = $.views.converters.url(myString);"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The same encoder is accessed by declaratively as a converter:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{{url:myExpression}}"
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
                "text": "Internally encodes by calling the JavaScript function <em>encodeURI</em>."
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
        "text": "JsRender custom tags are named tags <em>{{myTag ...}}</em>, which you can register, and then use in your templates."
      },
      {
        "_type": "para",
        "title": "",
        "text": "A tag renders itself as part of the template output. You determine how it renders, generally by providing either a <em>render</em> function or a template, when you declare your custom tag."
      },
      {
        "_type": "para",
        "title": "",
        "text": "The render function, or the template, can access both named parameters (<em>props</em>) and unnamed parameters (<em>args</em>), as in:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{{myTag arg0 arg1 namedProp1=xxx namedProp2=yyy}} ... {{/myTag}}"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In fact it can also access the current data item - or even the whole hierarchy of views and data..."
      },
      {
        "_type": "para",
        "title": "",
        "text": "When you also use JsViews, custom tags acquire a whole new dimension. &mdash; They become <em>tag controls</em>, and you can build rich and complex single page apps cleanly and simply using custom tag controls - following an MVP or MVVM coding pattern. "
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
                "description": "name of tag - to be used in template markup: {{<b>name</b> ...}}"
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
                "description": "name of tag - to be used in template markup: {{<b>name</b> ...}}"
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
        "text": "<em>Note:</em> the <em>this</em> pointer within the tag render function is the instance of the tag, and can be used in more advanced usage, as in the next two examples:"
      },
      {
        "_type": "para",
        "title": "Wrapping block content using a function-based custom tag",
        "text": "First of all - what if we want our tag to be used as a block tag, and to render itself by wrapping the rendered block content with the <em>bold p</em> html as in:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{{boldp}}\n  This is inside our block content:<br/>\n  <em>{{:title}}</em>\n{{/boldp}}"
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
            "text": "To render the block content, we call <em>this.tagCtx.render(val)</em>:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "function renderBoldP(val) {\n   return \"<p><b>\" + this.tagCtx.render(val) + \"</b></p>\";\n}"
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
        "text": "As well as calling the <em>render()</em> method of <em>this.tagCtx</em>, you can access <em>this.tagCtx.args</em>, <em>this.tagCtx.props</em>, <em>this.tagCtx.view.data</em> and more..."
      },
      {
        "_type": "para",
        "title": "",
        "text": "The <em>tagCtx.args</em> are the unnamed parameters. So in this example, there are two of them:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{{someTag title name}}"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In addition to being accessible as <em>tagCtx.args</em>, unnamed parameters are also passed directly as parameters to the render method (if your tag is using one):"
      },
      {
        "_type": "code",
        "title": "",
        "code": "function someTagRenderMethod(title, name) {\n  // Here, this.tagCtx.args[1] and the name parameter are the same thing\n}"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now here is an example which has one unnamed parameter and two named parameters. You can access named parameters from <em>tagCtx.props</em>:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{{range members start=2 end=4}}"
      },
      {
        "_type": "para",
        "title": "",
        "text": "We'll use that in our third sample, to show accessing properties from the render function of the tag:"
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
            "text": "This sample defines a <em>{{range}}</em> tag which iterates over an array which you pass as (unnamed) parameter. It also allows you to set named parameters <em>start</em> and <em>end</em>, to determine the range of iteration. (See also the <a href=\"#samples/tag-controls/range\">range</a> sample, for a more advanced implementation of a similar custom tag.)"
          },
          {
            "_type": "para",
            "title": "",
            "text": "You call it like this:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{range members start=1 end=2}}\n ...\n{{/range}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "And the render function code accesses context to get at those named and unnamed parameters... :"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.views.tags(\"range\", function(array) {\n  ...\n  var start = this.tagCtx.props.start,\n  ...\n  // Render tag content, for this data item\n  ret += this.tagCtx.render(array[i]);\n  ..."
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
        "text": "If the tag definition includes a template, but no render method, then the template will be used to render the tag."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Let's re-implement all three examples above using custom tags which use templates instead of render functions."
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
            "title": "Declaring the custom tag",
            "code": "$.views.tags(\"boldp\", {\n  template: \"<p><b>{{:~tag.tagCtx.args[0]}}</b></p>\"\n});"
          },
          {
            "_type": "para",
            "title": "",
            "text": "As you see, the template is accessing the unnamed parameter tagCtx.args[0]."
          },
          {
            "_type": "para",
            "title": "",
            "text": "The result is identical to the other implementation using a function. You call it just the same:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{boldp title /}}"
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
            "text": "To render block content, we use <em>{{include tmpl=~tag.tagCtx.content/}}</em>"
          },
          {
            "_type": "code",
            "title": "",
            "code": "template: \"<p><b>{{include tmpl=~tag.tagCtx.content/}}</b></p>\""
          },
          {
            "_type": "para",
            "title": "",
            "text": "Here we are accessing the <em>content</em> property on the <em>tagCtx</em>, which provides a compiled template for the block content."
          },
          {
            "_type": "para",
            "title": "",
            "text": "It is also made available as a <em>content</em> property on the <em>view</em> object - and can be accessed from within a template using <em>#content</em> - which is an example of a <em>view path</em> - equivalent to <em>#view.content</em>. You can try out that alternative syntax by choosing <em>Try it</em> and changing the template above to <em>\"&lt;p>&lt;b>{{include tmpl=#content/}}&lt;/b>&lt;/p>\"</em>."
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
        "text": "Finally let's re-implement the third example using just a template. \n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Even this example can be implemented as a custom tag which has no code at all. - Just a template, which is also able to access all the context that we were able to access from code in our <em>render()</em> function above."
      },
      {
        "_type": "para",
        "title": "",
        "text": "This illustrates the power of declarative templates..."
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
            "text": "The template accesses the same context as the function code above, to get at those named and unnamed parameters... :"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{for ~tag.tagCtx.args[0]}}\n  {{if #index >= ~tag.tagCtx.props.start && #index <= ~tag.tagCtx.props.end}}\n    {{include tmpl=~tag.tagCtx.content/}}\n  {{/if}}\n{{/for}}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Then after filtering for the items within the chosen range, using nested <em>{{for}}{{if}</em> tags, it renders the original block content for those items using <em>{{include tmpl=~tag.tagCtx.content/}}</em>."
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
        "text": "If there is both a template and a render method, then the template will only be used if the render method returns <em>undefined</em>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Let's take our <em>{{range}}</em> example using a render function, but provide a template which will be used for as \"fallback\" rendering for the tag in the case when there are no items to render in the chosen range:"
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
            "text": "First we will change the original code to test whether the item exists in the array, before rendering the block content."
          },
          {
            "_type": "para",
            "title": "",
            "text": "And secondly, we will make sure that when there is an item we do render the block content and not the template. So we call <em>this.tagCtx.content.render(array[i])</em>, rather than <em>this.tagCtx.render(array[i])</em>."
          },
          {
            "_type": "para",
            "title": "",
            "text": "That's because  <em>this.tagCtx.render(...)</em> will actually look to see if there is template associated with the tag, (either a template on the tag definition, or a tmpl property on the tag) - in which case it will render that template and not the block content... "
          },
          {
            "_type": "code",
            "title": "",
            "code": "for (var i = start; i <= end; i++) {\n  if (array[i]) {\n    // Render tag block content, for this data item\n    ret += this.tagCtx.content.render(array[i]);\n  }\n}\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Finally, if there are no items to render, we will return undefined, so the tag will fall back on the template rendering."
          },
          {
            "_type": "code",
            "title": "",
            "code": "return ret || undefined;\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "And here is the \"fallback\" template:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "template: \"<li>Nothing to render</li>\""
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
        "text": "You can pass in an existing template as an additional <em>parentTemplate</em> parameter, on  <em>any</em> call to  <em>$.views.tags(...)</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "In that way the tag you are registering becomes a 'private tag resource' for the <em>parentTemplate</em>, rather than being registered globally:"
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
            "hash": "customtags",
            "label": "Explore: custom tags"
          },
          {
            "_type": "topic",
            "hash": "samples/jsr/tags",
            "label": "Samples: JsRender custom tags"
          },
          {
            "_type": "topic",
            "hash": "samples/tag-controls",
            "label": "Sample: JsViews tag controls"
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
        "text": "JsRender templates are made up of HTML markup, text, and <em>template tags</em>. <em>Template tags</em> are used to evaluate data-paths or computed expressions, and insert those values into the rendered output."
      },
      {
        "_type": "para",
        "title": "",
        "text": "But often the values you will want to insert are not actually taken from the data, but rather from other parameters or <em>metadata</em> which you want to use. And often you will want to process the values, using helper functions or other code, e.g. for converting values to other formats, or for computed values."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>Helpers</em>, in JsRender, refers to any functions, parameters or metadata which you want to provide, in addition to the actual data you passed to the <em>render</em> method (or <em>link</em> method if you are using JsViews)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Helpers can also be objects, arrays, etc."
      },
      {
        "_type": "para",
        "title": "",
        "text": "You access helpers by prepending the \"~\" character. Here are some examples:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{{:~myHelperValue}}\n{{:~myHelperFunction(name, title)}}\n{{for ~myHelperObject.mySortFunction(people, \"increasing\")}} ... {{/for}}"
      },
      {
        "_type": "para",
        "title": "Passing in helpers",
        "text": "There are three ways to provide helpers:\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<ul>\n<li>Global helpers - registered using <em>$.views.helpers({myHelper1: ..., myHelper2: ...});</em></li>\n<li>Helpers registered for a specific template - <a href=\"#tmplrender\"><em>$.templates(\"mytmpl\", {markup: ..., helpers: {myHelper1: ...}});</em></a></li>\n<li>Helpers passed in on a specific render or link call - <a href=\"#tmplrender\"><em>tmpl.render(data, {myHelper1: ...});</em></a></li>\n</ul>"
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
            "code": "$.views.helpers({format: myFormatFunction});\n"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{:~format(name, true)}}"
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
            "_type": "code",
            "title": "",
            "code": "$.templates({\n  mytmpl: {\n    markup: \"#personTemplate\",\n    helpers: {\n      format: myFormatFunction\n    }\n  }\n});"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{:~format(name)}}\n{{:~format(name, true)}}"
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
            "_type": "code",
            "title": "",
            "code": "var html = $(\"#personTemplate\").render(\n  {name: \"Robert\"}, \n  {format: myFormatFunction}\n);"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{:~format(name, true)}}\n{{:~format(name)}}\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "See <a href=\"#tmplrender\"><em>template.render(...)</em></a>"
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
                "description": "name of helper - to be used in template path expressions as ~name..."
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
            "text": "Here is an example using a 'hierarchy' of helpers..."
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.views.helpers({\n  ...\n  utilities: {\n    maxCount: 23,\n    subtractMax: function(val) {\n      return val - this.maxCount;\n    },\n    errorMessages: {\n      msg1: \"not available\"\n    }\n  },\n  ...\n});"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{{:~utilities.subtractMax(sold) > 0\n    ? ~utilities.errorMessages.msg1\n    : \"immediate\"\n}}\n"
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
        "text": "You can pass in an existing template as an additional <em>parentTemplate</em> parameter, on  <em>any</em> call to  <em>$.views.helpers(...)</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "In that way the helper you are registering becomes a 'private helper resource' for the <em>parentTemplate</em>, rather than being registered globally:"
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
  }
};