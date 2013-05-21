var content = $.views.documentation.content;
var useStorage = content.allowEdit;
content.topics = useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics")) ||
{
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
        "text": "To get a template object from a template string, or a template declared in a script block, see <a href=\"#tmplcompile\">Compile/register/get a template</a>."
      },
      {
        "_type": "api",
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
          "api": "api",
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
          "api": "api",
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
            "hash": "jsvtags",
            "label": "Template tags"
          },
          {
            "hash": "jsvtmplrender",
            "label": "Render a template"
          },
          {
            "hash": "jsvlinktmpl",
            "label": "Render and link a template"
          },
          {
            "hash": "jsvunlink",
            "label": "Unlink a template"
          },
          {
            "hash": "$view",
            "label": "Access views"
          },
          {
            "hash": "jsvtmplcompile",
            "label": "Compile/register/get a template"
          },
          {
            "hash": "jsvregister",
            "label": "Register helpers, converters, tags..."
          },
          {
            "hash": "jsvtagcontrols",
            "label": "Custom Tags - Tag Controls"
          },
          {
            "hash": "jsrobjects",
            "label": "JsViews objects"
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
    "title": "templates(): Compile/get a template",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "$templates",
            "label": "$.templates()"
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
      }
    ]
  },
  "htmltag": {
    "title": "{{> ...}}",
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
      }
    ]
  },
  "includetag": {
    "title": "{{include tmpl=... /}}",
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
      }
    ]
  },
  "fortag": {
    "title": "{{for ...}}",
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
            "sections": [],
            "example": "{{for billing.address}}\n {{:street}}\n{{/for}}",
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
            "args": [],
            "sections": [],
            "example": "{{for billing.address tmpl=\"addressTmpl\" /}}",
            "description": "Render the specified template for the given object, or iterate over the given array",
            "variant": "{{for pathOrExpr tmpl=nameOrExpr /}}"
          }
        ],
        "description": "<em>Template composition</em>: &mdash; Render the block content of the {{for}} tag (or the referenced external template), using the object or array specified by the path or expression as data context. If it is an array, iterate over the array, rendering once for each item.",
        "sectionTypes": {}
      }
    ]
  },
  "elsetag": {
    "title": "{{else ...}}",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "{{else}} can be used with {{if}}, {{for}} or any custom tag!",
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
        "text": "as shown in <a href=\"#samples/tagcontrols/tabs\">this sample</a>."
      }
    ]
  },
  "commenttag": {
    "title": "Comment tag: {{!-- ... --}}",
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
  "iftag": {
    "title": "{{if ...}}",
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
                "text": "<b>Note:</b> The data context inside the {{if}} block is the same as the outer context"
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
        "description": "<em>Conditional inclusion</em>: &mdash; Render the block content of the {{if}} tag (or the referenced external template) only if the data-path or expression evaluates to true ('or truey')",
        "sectionTypes": {}
      },
      {
        "_type": "para",
        "title": "Using the {{else}} tag with {{/if}}",
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
        "description": "<em>Conditional inclusion</em>: &mdash; Render the block content of the {{if}} tag (or referenced template) if the expression is true, otherwise render the {{else}} block (or template)",
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
        "description": "<em>Conditional inclusion</em>: &mdash; Render the first {{if}} or {{else}} block for which the expression is true. If none are true, and there is an {{else}} without an expression, render that block",
        "sectionTypes": {
          "para": "para",
          "data": "data",
          "template": "template",
          "code": "code",
          "sample": "sample",
          "links": "links"
        }
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
            "hash": "propchange",
            "label": "Modify an object observably"
          },
          {
            "hash": "collchange",
            "label": "Modify an array observably"
          },
          {
            "hash": "observeobjectsarrays",
            "label": "Observe objects and arrays"
          }
        ]
      }
    ]
  },
  "gettingstarted": {
    "title": "Getting started",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
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
            "hash": "concepts",
            "label": "Concepts"
          },
          {
            "_type": "topic",
            "hash": "jsrapi",
            "label": "JsRender API - Templated UI"
          },
          {
            "_type": "topic",
            "hash": "jsvapi",
            "label": "JsViews API - Data-driven UI"
          },
          {
            "_type": "topic",
            "hash": "jsoapi",
            "label": "JsObservable API - Observing data"
          },
          {
            "_type": "topic",
            "hash": "samples",
            "label": "Samples"
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
        "code": "var person = {\n    name: \"Adriana\"\n};\n\nvar html = myTemplate.render(person);"
      },
      {
        "_type": "para",
        "title": "And here it is as a working sample:",
        "text": "Let's go straight to a sample showing how that template renders against the data. Like all the samples in this documentation, it is a working sample that you can experiment with. \n"
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
        "height": "90",
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
            "text": "In the html you see that we put our markup in a script block with <em>type=\"text/x-jsrender\"</em>..."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "... and then in the code we call the <a href=\"#$templates\"><em>$.templates</em></a> method with a jQuery selector for that script block, to get the compiled template."
          },
          {
            "_type": "code",
            "title": "",
            "code": "var myTemplate = $.templates(\"#personTmpl\");\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "After that we run the code we have already seen to render the template against our data, and get the HTML output as a string. (We pass the data - this time we used an array - to the <a href=\"#rendertmpl\"><em>render()</em></a> method of our compiled template.)"
          },
          {
            "_type": "code",
            "title": "",
            "code": "var html = myTemplate.render(people);"
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
          }
        ],
        "html": "<div id=\"peopleList\"></div>\n\n<script id=\"personTmpl\" type=\"text/x-jsrender\">\n  <label>Name:</label> {{:name}}\n</script>",
        "code": "var myTemplate = $.templates(\"#personTmpl\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nvar html = myTemplate.render(people);\n\n$(\"#peopleList\").html(html);",
        "title": "Complete code for template rendering:",
        "onlyJsRender": true,
        "height": "110"
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
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\",\n      nickname: \"Bob\"\n    }\n  ];\n\n  app = {\n    people: people\n  };\n\nvar html = myTemplate.render(app);\n\n$(\"#peopleList\").html(html);\n",
        "onlyJsRender": true,
        "title": "Some template tags...",
        "height": "110"
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
          },
          {
            "_type": "topic",
            "hash": "data",
            "label": "Data"
          },
          {
            "_type": "topic",
            "hash": "templates",
            "label": "Templates"
          },
          {
            "_type": "topic",
            "hash": "views",
            "label": "Views"
          },
          {
            "_type": "topic",
            "hash": "tagexpressions",
            "label": "Tag expressions"
          },
          {
            "_type": "topic",
            "hash": "customtags",
            "label": "Custom tags"
          },
          {
            "_type": "topic",
            "hash": "jsrapi",
            "label": "JsRender API"
          }
        ]
      }
    ]
  },
  "jsvplaying": {
    "title": "Playing with JsViews",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "JsViews: A platform for data-bound single-page apps",
        "text": "JsViews provides dynamic data-bound views, built on top of JsRender templates. It \"brings JsRender templates to life\". So lets start with the JsRender template we ended up with in the <a href=\"#jsrplaying\">Playing with JsRender</a> topic:"
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
            "text": "If you look at the code you will see it is almost identical to the previous JsRender sample. One difference though: The two lines for rendering the template as a string and then inserting it into the DOM:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "var html = myTemplate.render(app);\n\n$(\"#peopleList\").html(html);\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "...have been replaced by a single line:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "myTemplate.link(\"#peopleList\", app);"
          },
          {
            "_type": "para",
            "title": "",
            "text": "That line of code renders the template against the data (second parameter) and then inserts that data under the container element (first parameter), <em>and data-binds the HTML</em>. "
          }
        ],
        "sampleName": "",
        "url": "",
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td>\n    <ul>\n      {{for people}}\n        <li>\n          {{:name}}\n        </li>\n      {{/for}}\n    </ul>\n  </td></tr>\n</script>\n",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar app = {\n    people: people\n  };\n\nmyTemplate.link(\"#peopleList\", app);",
        "height": "120",
        "title": "Using the template.link() method"
      },
      {
        "_type": "para",
        "title": "Data-linking",
        "text": "In JsViews we refer to <em>data-linking</em>. It means data-binding, but refers to the particular approach used in JsViews, which is based on <em>observable arrays and objects</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "If you take an object and assign a new value to one of its properties (fields), there is no corresponding event that can allow other code to know you modified the object. Similarly, mutating an array will not provide any events or notifications to other code.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "\nThat's where <em>JsObservable</em> comes in. It provides ways of changing objects and arrays, <em>observably</em>.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The next sample shows what happens when the template renders against an array, and then that array is modified 'observably' (<em>observable collection change</em>).\n"
      },
      {
        "_type": "code",
        "title": "",
        "code": "$(\"#addBtn\").on(\"click\", function(){\n  $.observable(people).insert(people.length, {name: \"name\"});\n})\n"
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
            "text": "Click on the Add button, and a new row gets added to the array. The template rendering automatically updates to show the new row."
          },
          {
            "_type": "para",
            "title": "",
            "text": "It uses the code:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.observable(people).insert(people.length, {name: \"name\"});"
          },
          {
            "_type": "para",
            "title": "",
            "text": "But notice that the template is different from previously. It has that extra carat sign: <em style=\"white-space:nowrap\">{<b>^</b>{for ...}}</em>. Try removing the <b>^</b> and then clicking the <em>Add</em> button. - Nothing happens."
          },
          {
            "_type": "para",
            "title": "",
            "text": "Any regular JsRender tag <em>{{someTag ...}}</em> - whether built-in or custom - can be data-linked by adding the <b>^</b>: <em style=\"white-space:nowrap\">{<b>^</b>{someTag ...}}</em>. That tag has become 'dynamic' and will re-render itself whenever it needs to, if the underlying data changes ('observably')."
          },
          {
            "_type": "para",
            "title": "",
            "text": "Remove the <b>^</b>, and the tag is 'dead'..."
          }
        ],
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td>\n    <button id=\"addBtn\">Add</button>\n  </td></tr>\n  {^{for people}}\n    <tr><td>\n      {{:name}}\n    </td></tr>\n  {{/for}}\n</script>",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar app = {\n    people: people\n  };\n\nvar html = myTemplate.link(\"#peopleList\", app);\n\n$(\"#addBtn\").on(\"click\", function(){\n  $.observable(people).insert(people.length, {name: \"name\"});\n})",
        "height": "200",
        "title": "Data-linked tags and observable arrays and objects "
      },
      {
        "_type": "para",
        "title": "",
        "text": "What about changing an object? Let's modify the <em>name</em> on a <em>person</em> object (<em>observable property change</em>):"
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
            "text": "Here is the code when you click <em>Change</em>:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "function(){\n  var dataItem = $.view(this).data;\n\n  $.observable(dataItem).setProperty(\"name\", dataItem.name + counter++);\n}"
          },
          {
            "_type": "para",
            "title": "",
            "text": "The code for \"setProperty\" makes sense, given what we have already seen. You call <em style=\"white-space:nowrap\">$.observable(myObject)</em> to get an 'observable form of your object' which will provide you appropriate methods you can call: <em style=\"white-space:nowrap\">setProperty(...)</em> if it was an object, and <em>insert, remove, refresh</em> and <em>move</em>, if it was an array. "
          },
          {
            "_type": "para",
            "title": "",
            "text": "But in our case, the first problem is to know <em>which</em> person object should be modified by this particular button. The <em>this</em> pointer in the click-handler is the element, and our code: "
          },
          {
            "_type": "code",
            "title": "",
            "code": "var dataItem = $.view(this).data;"
          },
          {
            "_type": "para",
            "title": "",
            "text": "let's us get the <em>view</em> (an 'instance' of a rendered template, or template tag block) and hence to the data item (in this case the <em>person</em>) we want to modify."
          },
          {
            "_type": "para",
            "title": "",
            "text": "As in the previous sample, we have 'brought a tag to life' by writing:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<td>{^{:name}}</td>\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Change it back to:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<td>{^{:name}}</td>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "and you will see that the name no longer updates when you click on the <em>Change</em> button."
          }
        ],
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td colspan=\"2\">\n    <button id=\"addBtn\">Add</button>\n  </td></tr>\n  {^{for people}}\n    <tr>\n      <td>{^{:name}}</td>\n      <td>\n        <button class=\"changeBtn\">Change</button>\n      </td>\n    </tr>\n  {{/for}}\n</script>",
        "height": "200",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar app = {\n    people: people\n  };\n\nvar counter = 1;\n\nmyTemplate.link(\"#peopleList\", app);\n\n$(\"#addBtn\").on(\"click\", function(){\n  $.observable(people).insert(people.length, {name: \"name\"});\n})\n\n$(\"#peopleList\").on(\"click\", \".changeBtn\", function(){\n  var dataItem = $.view(this).data;\n  $.observable(dataItem).setProperty(\"name\", dataItem.name + counter++);\n})\n",
        "title": "Observable change: propertyChange"
      },
      {
        "_type": "para",
        "title": "Data-linked tags...",
        "text": "So far have used data-linked template tags for data-linking, as in:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "<td>{^{:name}}</td>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "But the fact that the data-linked tag is wrapped by an HTML element means that if we want we can replace it by an 'element-base' syntax:"
      },
      {
        "_type": "template",
        "title": "...or element-based data-linking",
        "markup": "<td data-link=\"name\"></td>"
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
            "text": "So this version of the sample uses:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<td data-link=\"name\"></td>"
          },
          {
            "_type": "para",
            "title": "",
            "text": "Try changing it back to the data-linked tag syntax. You will see that the sample works just the same..."
          }
        ],
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td colspan=\"2\">\n    <button id=\"addBtn\">Add</button>\n  </td></tr>\n  {^{for people}}\n    <tr>\n      <td data-link=\"name\"></td>\n      <td>\n        <button class=\"changeBtn\">Change</button>\n      </td>\n    </tr>\n  {{/for}}\n</script>",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar app = {\n    people: people\n  };\n\nvar counter = 1;\n\nmyTemplate.link(\"#peopleList\", app);\n\n$(\"#addBtn\").on(\"click\", function(){\n  $.observable(people).insert(people.length, {name: \"name\"});\n})\n\n$(\"#peopleList\").on(\"click\", \".changeBtn\", function(){\n  var dataItem = $.view(this).data;\n  $.observable(dataItem).setProperty(\"name\", dataItem.name + counter++);\n})\n",
        "height": "200",
        "title": "Element-based linking: \"data-link\""
      },
      {
        "_type": "para",
        "title": "",
        "text": "But what about <em>two-way</em> data-binding?"
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
            "text": "This is where the element-based data-linking comes into its own. The textbox uses declarative binding:"
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<td data-link=\"name\"></td>\n<td>\n  <input data-link=\"name\"/>\n</td>\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "The <em>&lt;input></em> and the <em>&lt;td></em> are both data-linked. The underlying data gets modified when you change the name in the textbox - and updates the <em>&lt;td></em>, without you needing to write any <em>propertyChange</em> code at all."
          }
        ],
        "title": "Two-way data-binding",
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td colspan=\"2\">\n    <button id=\"addBtn\">Add</button>\n  </td></tr>\n  {^{for people}}\n    <tr>\n      <td data-link=\"name\"></td>\n      <td>\n        <input data-link=\"name\"/>\n      </td>\n    </tr>\n  {{/for}}\n</script>",
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n    {\n      name: \"Adriana\"\n    },\n    {\n      name: \"Robert\"\n    }\n  ];\n\nvar app = {\n    people: people\n  };\n\nvar counter = 1;\n\nmyTemplate.link(\"#peopleList\", app);\n\n$(\"#addBtn\").on(\"click\", function(){\n  $.observable(people).insert(people.length, {name: \"name\"});\n})\n",
        "height": "200"
      },
      {
        "_type": "para",
        "title": "A more complete sample:",
        "text": "This was just a glimpse of some of the richness of JsViews data-linking. The next sample let's you see a more fully-fledged example, which you can experiment with."
      },
      {
        "_type": "para",
        "title": "",
        "text": "See the links section below, for more details on features and APIs."
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
            "text": "This sample includes binding to <em>&ltselect></em>..."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<select data-link=\"selectedID\" size=\"5\">"
          },
          {
            "_type": "para",
            "title": "",
            "text": "And also to the <em>&ltoption></em>s within the <em>&lt;select></em>...."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "{^{for people}}\n  <option data-link=\"{:name} value{:ID} selected{:ID === ~root.selectedID}\"></option>\n{{/for}}\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "It also shows observably removing items from an array..."
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.observable(people).remove($.inArray(app.selected(), people));"
          },
          {
            "_type": "para",
            "title": "",
            "text": "It shows data-linking to the <em>disabled</em> property of an element..."
          },
          {
            "_type": "template",
            "title": "",
            "markup": "<button data-link=\"disabled{:selectedID === '0'}\">Remove</button>\n"
          },
          {
            "_type": "para",
            "title": "",
            "text": "And it shows the use of a <em>computed observable</em> in JsViews"
          },
          {
            "_type": "code",
            "title": "",
            "code": "var app = {\n    ...\n    selected: function() {\n      ...\n    }\n  };\n\napp.selected.depends = \"selectedID\";"
          }
        ],
        "code": "var myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n  {\n    ID: \"Ad0\",\n    name: \"Adriana\"\n  },\n  {\n    ID: \"Ro0\",\n    name: \"Robert\",\n    nickname: \"Bob\"\n  }\n];\n\nvar counter = 1;\n\nvar app = {\n    people: people,\n    selectedID: people[1].ID,\n    selected: function() {\n      for (var i=0; i<people.length; i++) {\n        if (people[i].ID === this.selectedID) {\n          return people[i];\n        }\n      }\n      return {};\n    }\n  };\n\napp.selected.depends = \"selectedID\";\n\n// Data-link details container to people, using the peopleTmpl template\nmyTemplate.link(\"#peopleList\", app);\n\n$(\"#addBtn\").on(\"click\", function(){\nvar newID = \"new\" + counter++;\n  $.observable(people).insert(people.length, {ID: newID, name: \"name\"});\n  $.observable(app).setProperty(\"selectedID\", newID);\n\n})\n\n$(\"#removeBtn\").on(\"click\", function(){\n  $.observable(people).remove($.inArray(app.selected(), people));\n  $.observable(app).setProperty(\"selectedID\", \"0\");\n})\n",
        "html": "<table><tbody id=\"peopleList\"></tbody></table>\n\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <tr><td>\n    <button id=\"addBtn\">Add</button>\n    <button id=\"removeBtn\" data-link=\"disabled{:selectedID === '0'}\">Remove</button>\n  </td></tr>\n  <tr><td>\n    <select data-link=\"selectedID\" size=\"5\">\n      <option value=\"0\">Choose a person to edit</option>\n      {^{for people}}\n        <option data-link=\"{:name} value{:ID} selected{:ID === ~root.selectedID}\"></option>\n      {{/for}}\n    </select>\n  </td></tr>\n  <tr><td>\n    <label>Name:<input data-link=\"{:selected().name:} disabled{:selectedID === '0'}\" /></label>\n    <label>Nickname:<input data-link=\"{:selected().nickname:} disabled{:selectedID === '0'}\" /></label>\n  </td></tr>\n  <tr><td class=\"center\">\n    {^{for selected()}}\n      {^{:name}}\t\n      {^{if nickname}}\n        ( {^{:nickname}} )\n      {{/if}}\n    {{/for}}\n  </td></tr>\n</script>",
        "height": "220",
        "title": "data-linking to &lt;select>... and much more..."
      },
      {
        "_type": "links",
        "title": "Links",
        "links": [],
        "topics": [
          {
            "_type": "topic",
            "hash": "renderorlink",
            "label": "Rendering versus linking"
          },
          {
            "_type": "topic",
            "hash": "data",
            "label": "Data"
          },
          {
            "_type": "topic",
            "hash": "views",
            "label": "Views"
          },
          {
            "_type": "topic",
            "hash": "linkobservedispose",
            "label": "Linking, observing, disposing"
          },
          {
            "_type": "topic",
            "hash": "computed",
            "label": "Computed observables"
          },
          {
            "_type": "topic",
            "hash": "dependencies",
            "label": "Declaring dependencies"
          },
          {
            "_type": "topic",
            "hash": "tagcontrols",
            "label": "Tag Controls"
          },
          {
            "_type": "topic",
            "hash": "mvvm-mvp",
            "label": "MVVM and MVP"
          },
          {
            "_type": "topic",
            "hash": "jsvapi",
            "label": "JsViews API"
          },
          {
            "_type": "topic",
            "hash": "jsoapi",
            "label": "JsObservable API"
          }
        ]
      }
    ]
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
            "hash": "tagcontrols",
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
          },
          {
            "hash": "customtags",
            "label": "Custom tags"
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
  "jsr-converter": {
    "title": "converters in JsRender",
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
  "helperpaths": {
    "title": "Helper paths",
    "path": "",
    "sections": []
  },
  "pass helper": {
    "title": "Passing in helpers",
    "path": "",
    "sections": []
  },
  "registerhelper": {
    "title": "Registering helpers",
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
            "hash": "pass helper",
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
  "samples/tagcontrols/tabs": {
    "title": "A JsViews \"tabs\" tag control",
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
            "hash": "samples/tagcontrols",
            "label": "Tag controls"
          }
        ]
      }
    ]
  },
  "samples/tagcontrols": {
    "title": "Tag controls",
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
  "unobserve": {
    "title": "unobserve()",
    "path": "",
    "sections": []
  },
  "onarrchange": {
    "title": "onArrayChange",
    "path": "",
    "sections": []
  },
  "propchangeevargs": {
    "title": "PropertyChangeEventArguments",
    "path": "",
    "sections": []
  },
  "propchangehandler": {
    "title": "PropertyChangeEventHandler",
    "path": "",
    "sections": []
  },
  "onpropchange": {
    "title": "onPropertyChange",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "propchangehandler",
            "label": "PropertyChangeEventHandler"
          },
          {
            "hash": "propchangeevargs",
            "label": "PropertyChangeEventArguments"
          }
        ]
      }
    ]
  },
  "observeobjectsarrays": {
    "title": "Observe objects and arrays",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "onpropchange",
            "label": "onPropertyChange"
          },
          {
            "hash": "onarrchange",
            "label": "onArrayChange"
          },
          {
            "hash": "observe",
            "label": "$.observable.observe()"
          },
          {
            "hash": "unobserve",
            "label": "unobserve()"
          }
        ]
      }
    ]
  },
  "move": {
    "title": "$.observable(array).move()",
    "path": "",
    "sections": []
  },
  "refresh": {
    "title": "$.observable(array).refresh()",
    "path": "",
    "sections": []
  },
  "remove": {
    "title": "$.observable(array).remove()",
    "path": "",
    "sections": []
  },
  "insert": {
    "title": "$.observable(array).insert()",
    "path": "",
    "sections": []
  },
  "collchange": {
    "title": "Modify an array observably",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "insert",
            "label": "$.observable(array).insert()"
          },
          {
            "hash": "remove",
            "label": "$.observable(array).remove()"
          },
          {
            "hash": "refresh",
            "label": "$.observable(array).refresh()"
          },
          {
            "hash": "move",
            "label": "$.observable(array).move()"
          }
        ]
      }
    ]
  },
  "setprop": {
    "title": "$.observable(object).setProperty()",
    "path": "",
    "sections": []
  },
  "propchange": {
    "title": "Modify an object observably",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "setprop",
            "label": "$.observable(object).setProperty()"
          }
        ]
      }
    ]
  },
  "jsvlinkcontextobject": {
    "title": "Link context object",
    "path": "",
    "sections": []
  },
  "jsvtagcontextobject": {
    "title": "Tag context object",
    "path": "",
    "sections": []
  },
  "jsvviewcontextobject": {
    "title": "View context object",
    "path": "",
    "sections": []
  },
  "jsvtagobject": {
    "title": "tag object",
    "path": "",
    "sections": []
  },
  "jsvviewobject": {
    "title": "view object",
    "path": "",
    "sections": []
  },
  "jsvtemplateobject": {
    "title": "template object",
    "path": "",
    "sections": []
  },
  "jsvviewsobject": {
    "title": "$.views object",
    "path": "",
    "sections": []
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
            "hash": "jsvviewcontextobject",
            "label": "View context object"
          },
          {
            "hash": "jsvtagcontextobject",
            "label": "Tag context object"
          },
          {
            "hash": "jsvlinkcontextobject",
            "label": "Link context object"
          }
        ]
      }
    ]
  },
  "jsvtagcontrols": {
    "title": "Custom Tags - Tag Controls",
    "path": "",
    "sections": []
  },
  "jsvhelpers()": {
    "title": "$.views.helpers()",
    "path": "",
    "sections": []
  },
  "jsvtags()": {
    "title": "$.views.tags()",
    "path": "",
    "sections": []
  },
  "jsvconverters()": {
    "title": "$.views.converters()",
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
            "hash": "jsvconverters()",
            "label": "$.views.converters()"
          },
          {
            "hash": "jsvtags()",
            "label": "$.views.tags()"
          },
          {
            "hash": "jsvhelpers()",
            "label": "$.views.helpers()"
          }
        ]
      }
    ]
  },
  "jsvtmplcompile": {
    "title": "Compile/register/get a template",
    "path": "",
    "sections": []
  },
  "jsv$()view()": {
    "title": "$(...).view()",
    "path": "",
    "sections": []
  },
  "jsv$view": {
    "title": "$.view()",
    "path": "",
    "sections": []
  },
  "$view": {
    "title": "Access views",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsv$view",
            "label": "$.view()"
          },
          {
            "hash": "jsv$()view()",
            "label": "$(...).view()"
          }
        ]
      }
    ]
  },
  "jsv$()unlink": {
    "title": "$(...).unlink()",
    "path": "",
    "sections": []
  },
  "jsv$unlink": {
    "title": "$.unlink()",
    "path": "",
    "sections": []
  },
  "jsvtmplunlink": {
    "title": "template.unlink()",
    "path": "",
    "sections": []
  },
  "jsvunlink": {
    "title": "Unlink a template",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvtmplunlink",
            "label": "template.unlink()"
          },
          {
            "hash": "jsv$unlink",
            "label": "$.unlink()"
          },
          {
            "hash": "jsv$()unlink",
            "label": "$(...).unlink()"
          }
        ]
      }
    ]
  },
  "jsv$()link": {
    "title": "$(...).link()",
    "path": "",
    "sections": []
  },
  "jsv$link": {
    "title": "$.link()",
    "path": "",
    "sections": []
  },
  "jsvtmpllink": {
    "title": "template.link()",
    "path": "",
    "sections": []
  },
  "jsvlinktmpl": {
    "title": "Render and link a template",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvtmpllink",
            "label": "template.link()"
          },
          {
            "hash": "jsv$link",
            "label": "$.link()"
          },
          {
            "hash": "jsv$()link",
            "label": "$(...).link()"
          }
        ]
      }
    ]
  },
  "jsvtmplrender": {
    "title": "Render a template",
    "path": "",
    "sections": []
  },
  "jsvtags": {
    "title": "Template tags",
    "path": "",
    "sections": []
  },
  "subobject": {
    "title": "$.views.sub object",
    "path": "",
    "sections": []
  },
  "settingsobject": {
    "title": "$.views.settings object",
    "path": "",
    "sections": []
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
  "tagcontextobject": {
    "title": "tag context object",
    "path": "",
    "sections": []
  },
  "viewcontextobject": {
    "title": "view context object",
    "path": "",
    "sections": []
  },
  "tagobject": {
    "title": "tag object",
    "path": "",
    "sections": []
  },
  "viewobject": {
    "title": "view object",
    "path": "",
    "sections": []
  },
  "templateobject": {
    "title": "template object",
    "path": "",
    "sections": []
  },
  "helpers()": {
    "title": "$.views.helpers()",
    "path": "",
    "sections": []
  },
  "tags()": {
    "title": "$.views.tags()",
    "path": "",
    "sections": []
  },
  "url()": {
    "title": "views.converters.url()",
    "path": "",
    "sections": []
  },
  "attr()": {
    "title": "views.converters.attr()",
    "path": "",
    "sections": []
  },
  "html()": {
    "title": "views.converters.html()",
    "path": "",
    "sections": []
  },
  "converters()": {
    "title": "$.views.converters()",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "html()",
            "label": "views.converters.html()"
          },
          {
            "hash": "attr()",
            "label": "views.converters.attr()"
          },
          {
            "hash": "url()",
            "label": "views.converters.url()"
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
            "hash": "converters()",
            "label": "$.views.converters()"
          },
          {
            "hash": "tags()",
            "label": "$.views.tags()"
          },
          {
            "hash": "helpers()",
            "label": "$.views.helpers()"
          }
        ]
      }
    ]
  },
  "$templates": {
    "title": "$.templates()",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Simple scenarios",
        "text": "<em>$.templates()</em> is powerful and flexible. You can use it for many scenarios, including the following:\n<ul>\n<li>Compile a template from a string</li>\n<li>Get a template object for a template declared in a script block</li>\n<li>Register a template (from either a string or a script block declaration) as a <em>named template</em></li>\n</ul>\n"
      },
      {
        "_type": "api",
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
          "api": "api",
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
        "height": "70"
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
        "height": "70"
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
            "_type": "code",
            "title": "",
            "code": "$.templates(\"personTmpl\", \"<label>Name:</label> {{:name}}\");\n\nvar html = $.render.personTmpl(person);\n"
          }
        ],
        "code": "$.templates(\"personTmpl\", \"<label>Name:</label> {{:name}}\");\n\nvar person = {name: \"Robert\"};\n\nvar html = $.render.personTmpl(person);\n\n$(\"#peopleList\").html(html);",
        "html": "<div id=\"peopleList\"></div>",
        "height": "70",
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
          "sample": "sample",
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
        "height": "70"
      },
      {
        "_type": "para",
        "title": "Registering multiple templates in one call",
        "text": "You can register multiple <em>named templates</em> in one call to <em>$.templates()</em> as follows:"
      },
      {
        "_type": "api",
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
          "api": "api",
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
          "sample": "sample",
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
        "height": "70"
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
        "text": "<em>$.templates()</em> can also be used for the following more advanced scenarios:\n<ul>\n<li>Compile a template, (or multiple templates) along with specified resources to be available only within that template</li>\n<li>Compile one or more templates to be added to the set of private resources of another (already compiled) template</li>\n</ul>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "You can use <em>$.templates()</em> to compile or register not only a template, but in addition some <em>helpers</em>, <em>converters</em>, <em>custom tags</em> or nested <em>templates</em>, to be made available to the new template as private resources."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that as an alternative you can register resources (<em>helpers</em>, <em>converters</em>, <em>custom tags</em> or <em>templates</em>) globally, using <a href=\"#helpers()\"><em>$.views.helpers()</em></a>, <a href=\"#converters()\"><em>$.views.converters()</em></a>, <a href=\"#tags()\"><em>$.views.tags()</em></a>, or <a href=\"#$templates\"><em>$.templates()</em></a> - rather than making them private to the template that needs to reference them."
      },
      {
        "_type": "api",
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
            "title": "Add additional templates as resources to another template",
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
          "api": "api",
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
          "sample": "sample",
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
        "height": "70"
      },
      {
        "_type": "para",
        "title": "",
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
          "sample": "sample",
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
        "title": "Add a \"labelTmpl\" template resource as a private resource for an existing \"personTemplate\"",
        "height": "70"
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
          }
        ]
      }
    ]
  },
  "$()render": {
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
        "text": "...then you can call the <a href=\"#tmplrender\"><em>render()</em></a> method of the template without needing to hold on to the compiled template object returned from <a href=\"#$templates\"><em>$.templates(...)</em></a>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Just call <em>$(\"#myTmpl\").render(...)</em>"
      },
      {
        "_type": "api",
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
          "api": "api",
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
          "sample": "sample",
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
            "code": "var html = $(\"#personTemplates\").render(person);"
          }
        ],
        "html": "<table><tbody id=\"person\"></tbody></table>\n\n<script id=\"personTemplate\" type=\"text/x-jsrender\">\n  <tr>\n    <td>\n      {{:name}}\n    </td>\n  </tr>\n</script>",
        "code": "var person = {\n    name: \"Adriana\"\n  };\n\nvar html = $(\"#personTemplate\").render(person);\n\n$(\"#person\").html(html);",
        "title": "$.render.personTmpl(...):",
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
  "$render": {
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
        "text": "...then you can call the <a href=\"#tmplrender\"><em>render()</em></a> method of the template without needing to hold on to the compiled template object returned from <a href=\"#$templates\"><em>$.templates(...)</em></a>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Just call <em>$.render.myTmpl(...)</em>, or <em>$.render[\"myTmpl\"](...)</em>"
      },
      {
        "_type": "api",
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
          "api": "api",
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
          "sample": "sample",
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
        "text": "There are three ways of calling the <em>render()</em> method:\n<ul><li>If you have a reference to the <em>template object</em>, call <a href=\"#tmplrender\"><em>template.render(...)</em></a></li>\n<li>If you have a registered the template by name (<em>\"myTmpl\"</em>), call <a href=\"#$render\"><em>$.render.myTmpl(...)</em></a></li>\n<li>If the template is declared in a script block, with selector <em>\"#myTmpl\"</em>, you can also call <a href=\"#$()render\"><em>$(\"#myTmpl\").render(...)</em></a></li></ul>"
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
            "hash": "$render",
            "label": "$.render.myTmpl()"
          },
          {
            "hash": "$()render",
            "label": "$(\"#myTmpl\").render()"
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
        "text": "There are two ways to create a template:\n<ul><li>Pass the markup string to the <a href=\"#$templates\"><em>$.templates()</em></a> method, which will compile it as a template object, and optionally register it by name</li>\n<li>Declare the template in a script block with <em>type=\"text/x-jsrender\"</em> (or at least a type other than the default <em>text/javascript</em>). In that case JsRender will automatically call <em>$.templates()</em>. You will only need to call it yourself if you want to access the <em>template object</em></li></ul>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The first approach has the advantage of keeping your template declaration independent of you HTML markup that you are loading into the browser. Indeed you may want to provide the template markup strings for your templates in different application-specific ways, such as loading string from the server, creating 'computed' template markup strings on the fly, etc. "
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
          "sample": "sample"
        },
        "sections": [
          {
            "_type": "para",
            "title": "",
            "text": "The markup string is fetched in an AJAX request, and used to register a named template..."
          },
          {
            "_type": "code",
            "title": "",
            "code": "$.get(\"templates/person.txt\", function(value) {\n  $.templates(\"personTmpl\", value);\n});"
          },
          {
            "_type": "para",
            "title": "",
            "text": "... and then in the code we call the <a href=\"#rendertmpl\"><em>render</em></a> method for the named template:"
          },
          {
            "_type": "code",
            "title": "",
            "code": "var html = $.render.personTmpl(people);\n"
          }
        ],
        "html": "<button id=\"show\">Show People</button>\n\n<div id=\"peopleList\"></div>\n",
        "code": "$.get(\"templates/person.txt\", function(value) {\n  $.templates(\"personTmpl\", value);\n});\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\n$(\"#show\").on(\"click\", function(){\n  var html = $.render.personTmpl(people);\n  $(\"#peopleList\").html(html);\n});",
        "title": "Registering a template from a markup string (in this case, fetched  from the server):",
        "onlyJsRender": true,
        "height": "70"
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
            "text": "Then in the code we call the <a href=\"#$templates\"><em>$.templates</em></a> method with a jQuery selector for that script block, to register our template as a named template. (We could also hold on to the template object, which is the returned value...)  "
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
        "height": "70"
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios see:",
        "links": [],
        "topics": [
          {
            "hash": "$templates",
            "label": "$.templates()"
          }
        ]
      }
    ]
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
        "expanded": false
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
        "expanded": false
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
        "expanded": false
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
        "expanded": false
      },
      {
        "name": "helpers",
        "label": "Providing helpers",
        "categories": [
          {
            "name": "registerhelper",
            "label": "Registering helpers"
          },
          {
            "name": "pass helper",
            "label": "Passing in helpers"
          },
          {
            "name": "helperpaths",
            "label": "Helper paths"
          }
        ],
        "expanded": false
      },
      {
        "name": "converters",
        "label": "Converters",
        "categories": [
          {
            "name": "jsr-converter",
            "label": "converters in JsRender",
            "expanded": true
          },
          {
            "name": "jsv-converter",
            "label": "converters in JsViews",
            "categories": [
              {
                "name": "jsv-converter1way",
                "label": "one-way binding converter"
              },
              {
                "name": "jsv-converterback",
                "label": "2-way binding - convert back"
              }
            ],
            "expanded": true
          }
        ],
        "expanded": false
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
        "expanded": false
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
        "expanded": false
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
        "expanded": false
      },
      {
        "name": "mvvm-mvp",
        "label": "MVVM and MVP"
      }
    ],
    "expanded": true
  },
  {
    "name": "jsrapi",
    "label": "JsRender API - Templated UI",
    "categories": [
      {
        "name": "jsrtags",
        "label": "Template tags",
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
          },
          {
            "name": "customtags",
            "label": "Custom tags"
          }
        ],
        "expanded": false
      },
      {
        "name": "rendertmpl",
        "label": "Render a template",
        "categories": [
          {
            "name": "tmplrender",
            "label": "template.render()"
          },
          {
            "name": "$render",
            "label": "$.render.myTmpl()"
          },
          {
            "name": "$()render",
            "label": "$(\"#myTmpl\").render()"
          }
        ],
        "expanded": false
      },
      {
        "name": "compiletmpl",
        "label": "Compile/register/get a template",
        "categories": [
          {
            "name": "$templates",
            "label": "$.templates()"
          }
        ],
        "expanded": false
      },
      {
        "name": "jsrregister",
        "label": "Register helpers, converters, tags...",
        "categories": [
          {
            "name": "converters()",
            "label": "$.views.converters()",
            "categories": [
              {
                "name": "html()",
                "label": "views.converters.html()"
              },
              {
                "name": "attr()",
                "label": "views.converters.attr()"
              },
              {
                "name": "url()",
                "label": "views.converters.url()"
              }
            ],
            "expanded": true
          },
          {
            "name": "tags()",
            "label": "$.views.tags()"
          },
          {
            "name": "helpers()",
            "label": "$.views.helpers()"
          }
        ],
        "expanded": false
      },
      {
        "name": "jsrobjects",
        "label": "JsRender objects",
        "categories": [
          {
            "name": "viewsobject",
            "label": "$.views object",
            "categories": [
              {
                "name": "settingsobject",
                "label": "$.views.settings object"
              },
              {
                "name": "subobject",
                "label": "$.views.sub object"
              }
            ],
            "expanded": true
          },
          {
            "name": "templateobject",
            "label": "template object"
          },
          {
            "name": "viewobject",
            "label": "view object"
          },
          {
            "name": "tagobject",
            "label": "tag object"
          },
          {
            "name": "viewcontextobject",
            "label": "view context object"
          },
          {
            "name": "tagcontextobject",
            "label": "tag context object"
          }
        ],
        "expanded": false
      }
    ],
    "expanded": false
  },
  {
    "name": "jsvapi",
    "label": "JsViews API - Data-driven UI",
    "categories": [
      {
        "name": "jsvtags",
        "label": "Template tags",
        "expanded": false
      },
      {
        "name": "jsvrendertmpl",
        "label": "Render a template",
        "expanded": false
      },
      {
        "name": "jsvlinktmpl",
        "label": "Render and link a template",
        "categories": [
          {
            "name": "jsvtmpllink",
            "label": "template.link()"
          },
          {
            "name": "jsv$link",
            "label": "$.link()"
          },
          {
            "name": "jsv$()link",
            "label": "$(...).link()"
          }
        ],
        "expanded": false
      },
      {
        "name": "jsvunlink",
        "label": "Unlink a template",
        "categories": [
          {
            "name": "jsvtmplunlink",
            "label": "template.unlink()"
          },
          {
            "name": "jsv$unlink",
            "label": "$.unlink()"
          },
          {
            "name": "jsv$()unlink",
            "label": "$(...).unlink()"
          }
        ],
        "expanded": false
      },
      {
        "name": "$view",
        "label": "Access views",
        "categories": [
          {
            "name": "jsv$view",
            "label": "$.view()"
          },
          {
            "name": "jsv$()view()",
            "label": "$(...).view()"
          }
        ],
        "expanded": false
      },
      {
        "name": "jsvcompiletmpl",
        "label": "Compile/register/get a template",
        "expanded": false
      },
      {
        "name": "jsvregister",
        "label": "Register helpers, converters, tags...",
        "categories": [
          {
            "name": "jsvconverters()",
            "label": "$.views.converters()",
            "expanded": false
          },
          {
            "name": "jsvtags()",
            "label": "$.views.tags()"
          },
          {
            "name": "jsvhelpers()",
            "label": "$.views.helpers()"
          }
        ],
        "expanded": false
      },
      {
        "name": "jsvtagcontrols",
        "label": "Custom Tags - Tag Controls"
      },
      {
        "name": "jsrobjects",
        "label": "JsViews objects",
        "categories": [
          {
            "name": "jsvviewsobject",
            "label": "$.views object",
            "expanded": true
          },
          {
            "name": "jsvtemplateobject",
            "label": "template object"
          },
          {
            "name": "jsvviewobject",
            "label": "view object"
          },
          {
            "name": "jsvtagobject",
            "label": "tag object"
          },
          {
            "name": "jsvviewcontextobject",
            "label": "View context object"
          },
          {
            "name": "jsvtagcontextobject",
            "label": "Tag context object"
          },
          {
            "name": "jsvlinkcontextobject",
            "label": "Link context object"
          }
        ],
        "expanded": false
      }
    ],
    "expanded": false
  },
  {
    "name": "jsoapi",
    "label": "JsObservable API - Observing data",
    "categories": [
      {
        "name": "propchange",
        "label": "Modify an object observably",
        "categories": [
          {
            "name": "setprop",
            "label": "$.observable(object).setProperty()"
          }
        ],
        "expanded": false
      },
      {
        "name": "collchange",
        "label": "Modify an array observably",
        "categories": [
          {
            "name": "insert",
            "label": "$.observable(array).insert()"
          },
          {
            "name": "remove",
            "label": "$.observable(array).remove()"
          },
          {
            "name": "refresh",
            "label": "$.observable(array).refresh()"
          },
          {
            "name": "move",
            "label": "$.observable(array).move()"
          }
        ],
        "expanded": false
      },
      {
        "name": "observeobjectsarrays",
        "label": "Observe objects and arrays",
        "categories": [
          {
            "name": "onpropchange",
            "label": "onPropertyChange",
            "categories": [
              {
                "name": "propchangehandler",
                "label": "PropertyChangeEventHandler"
              },
              {
                "name": "propchangeevargs",
                "label": "PropertyChangeEventArguments"
              }
            ],
            "expanded": true
          },
          {
            "name": "onarrchange",
            "label": "onArrayChange"
          },
          {
            "name": "observe",
            "label": "$.observable.observe()"
          },
          {
            "name": "unobserve",
            "label": "unobserve()"
          }
        ],
        "expanded": false
      }
    ],
    "expanded": false
  },
  {
    "name": "samples",
    "label": "Samples",
    "categories": [
      {
        "name": "samples/tagcontrols",
        "label": "Tag controls",
        "categories": [
          {
            "name": "samples/tagcontrols/tabs",
            "label": "tabs control"
          }
        ],
        "expanded": false
      }
    ],
    "expanded": false
  }
];