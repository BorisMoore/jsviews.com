var content = $.views.documentation.content;

content.jsvapi = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/jsvapi")) ||
{
  "jsvapi": {
    "title": "JsViews API topics",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "<em><small>(Work in progress. Other topics to follow...)</small></em>"
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvtemplatetags",
            "label": "Template tags"
          },
          {
            "hash": "linked-template-syntax",
            "label": "Data-link template syntax"
          },
          {
            "hash": "jsvrendertmpl",
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
            "hash": "jsvcompiletmpl",
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
            "hash": "jsvobjects",
            "label": "JsViews objects"
          }
        ]
      }
    ]
  },
  "jsvtags": {
    "title": "$.views.tags()",
    "path": "",
    "sections": []
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
            "hash": "jsv.d.link",
            "label": "$.link()"
          },
          {
            "hash": "jsv.db.link",
            "label": "$(...).link()"
          }
        ]
      }
    ]
  },
  "jsvtmpllink": {
    "title": "template.link()",
    "path": "",
    "sections": []
  },
  "jsv.d.link": {
    "title": "$.link()",
    "path": "",
    "sections": []
  },
  "jsv.db.link": {
    "title": "$(...).link()",
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
            "hash": "jsv.d.unlink",
            "label": "$.unlink()"
          },
          {
            "hash": "jsv.db.unlink",
            "label": "$(...).unlink()"
          }
        ]
      }
    ]
  },
  "jsvtmplunlink": {
    "title": "template.unlink()",
    "path": "",
    "sections": []
  },
  "jsv.d.unlink": {
    "title": "$.unlink()",
    "path": "",
    "sections": []
  },
  "jsv.db.unlink": {
    "title": "$(...).unlink()",
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
            "hash": "jsv.d.view",
            "label": "$.view()"
          },
          {
            "hash": "jsv.db.view",
            "label": "$(...).view()"
          }
        ]
      }
    ]
  },
  "jsv.d.view": {
    "title": "$.view()",
    "path": "",
    "sections": []
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
    "sections": [
      {
        "_type": "para",
        "title": "JsViews template tags, and JsRender",
        "text": "Any JsRender template can be used with JsViews.\n\nCalling the <a href=\"#rendertmpl\">`render()`</a> method works just the same within JsViews as it does if only JsRender is loaded. But alternatively you can use the <a href=\"#jsvlinktmpl\">`link()`</a> method - which will first render and then add data binding (<em>data-link the template</em>).\n\nIf you have data-linked your template, then you can continue to use the same <a href=\"#jsrtags\">JsRender template tags</a> as before. But now you optionally make the templates data-linked, by adding the `^` character on the opening tag, as in:\n\n```jsr\n{^{for people}}\n  {^{:name}}\n{{/for}}\n```\n\nSee <a href=\"#linked-template-syntax\">data-link template syntax</a> for details..."
      },
      {
        "_type": "para",
        "title": "But in JsViews templates, your template must be well-formed:",
        "text": "JsRender is different. If you are only using JsRender (so no 'HTML-aware data-binding'), you have a lot of freedom. You can even do this:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
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
        "onlyJsRender": true,
        "height": "80",
        "title": "Badly-formed template - but OK in JsRender!"
      },
      {
        "_type": "para",
        "title": "",
        "text": "That works because JsRender is pure string-based rendering, it doesn't mind how you mix you JsRender tag hierarchy with the HTML tag markup."
      },
      {
        "_type": "para",
        "title": "Rules for a well-formed template in JsViews:",
        "text": "With JsViews, it is different. Here are the rules of what is valid, or invalid, within a JsViews template:\n<ul class=\"textbefore\"><li>JsRender template tags which are outside HTML elements, or fully within the element content of an HTML element can remain unchanged in a JsViews template. They will work correctly. They can optionally be data-linked by simply adding a <code>^</code> character (so that for example a <code>{{for}}</code> tag becomes a data-linked <code>{^{for}}</code> tag) - and in that case the rendered content will change dynamically whenever the bound data changes <em>'observably'</em>.</li>\n<li>But tags which are within the markup of the actual HTML opening tag itself, whether placed between attributes, or spanning attributes, or within the attribute content (the text value of the attribute), will not be valid in a JsViews template.</li>\n<li>Similarly, tags which wrap opening or closing tag in such a way as to produce 'mal-formed HTML' will not be valid.</li>\n<li>In fact a valid JsViews template will have the tree hierarchy of nested HTML tags and nested template tags combining together, as it were, as a single well-formed tree.</li>\n<li>In each of the invalid scenarios mentioned above, <b><em>the JsRender tags needs to be replaced by corresponding data-linked element syntax</em></b>. See <a href=\"#linked-template-syntax\">the next section</a>, for details.</li></ul>\n"
      }
    ]
  },
  "jsvhelpers": {
    "title": "$.views.helpers()",
    "path": "",
    "sections": []
  },
  "jsvtagcontrols": {
    "title": "Custom Tags - Tag Controls",
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
  "jsvviewsobject": {
    "title": "$.views object",
    "path": "",
    "sections": []
  },
  "jsvtemplateobject": {
    "title": "template object",
    "path": "",
    "sections": []
  },
  "jsvviewobject": {
    "title": "view object",
    "path": "",
    "sections": []
  },
  "jsvtagobject": {
    "title": "tag object",
    "path": "",
    "sections": []
  },
  "jsvviewcontextobject": {
    "title": "View context object",
    "path": "",
    "sections": []
  },
  "jsvtagcontextobject": {
    "title": "Tag context object",
    "path": "",
    "sections": []
  },
  "jsvlinkcontextobject": {
    "title": "Link context object",
    "path": "",
    "sections": []
  },
  "data-linked-template-syntax": {
    "title": "Data-link template syntax",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "linked-template-syntax": {
    "title": "Data-link template syntax",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews data-link syntax takes two forms:\n\n<ul class=\"textbefore\"><li><a href=\"#linked-tag-syntax\">Data-linked tags</a></li><li><a href=\"#linked-elem-syntax\">Data-linked elements</a></li></ul>"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "<ul><li>Tutorial sequence of samples: <a href=\"#samples/data-link\">Data-linking tags and elements</a></li></ul>"
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
        "text": "A data-linked tag is like a regular JsRender tag (whether a built-in tag, or a custom tag) but has an additional `^` character to show that is data-linked. Let's illustrate that by an example based on the <a href=\"#samples/jsr/tags/extend-for\">extending the `{{for}}` tag</a> sample:\n\n```jsr\n<ul>\n  {{for members}}\n    <li>\n      {{:name}}\n    </li>\n  {{/for}}\n</ul>\n\n<ul>\n  {{range members start=1 end=3}}\n    <li>\n      {{:name}}\n    </li>\n  {{/range}}\n</ul>\n```\n\nWe can data-link to the `members` - whether on the built-in `{{for}}`, or the custom `{{range}}` tag - like this:\n\n```jsr\n<ul>\n  {^{for members}}\n    <li>\n      {^{:name}}\n    </li>\n  {{/for}}\n</ul>\n```\n\n```jsr\n<ul>\n  {^{range members start=1 end=3}}\n    <li>\n      {^{:name}}\n    </li>\n  {{/range}}\n</ul>\n```\n\nNow if the `members` array changes, our rendered template content will automatically update to show the additional inserted (or removed) members in the list.\n\nHere is a live sample of the data-linked `{^{for}}` tag:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
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
            "markup": "{^{for members}}\n  <li>\n    {^{:name}} <img class=\"remove\" .../>\n  </li>\n{{/for}}"
          }
        ],
        "html": "<div id=\"team\"></div>\n\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\n\n<div class=\"buttons\">\n  <button id=\"add\">Add</button>\n</div>\n<ol>\n  {^{for members}}\n    <li>\n      {^{:name}} \n      <span class=\"remove\"></span>\n    </li>\n  {{/for}}\n</ol>\n\n</script>\n",
        "code": "var team = {\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"}\n  ]\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team)\n  .on(\"click\", \".remove\", function() {\n    var view = $.view(this);\n    $.observable(team.members).remove(view.index);\n  })\n  .on(\"click\", \"#add\", function() {\n    $.observable(team.members).insert(0, {name: \"new\" + cnt++})\n  });",
        "height": "120"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice that we also added a `^` to the `{^{:name}}` tag. That means that if the value of the name field is changed ('observably') then the value will update automatically within the rendered template.\n\nAnd here is <a href=\"#samples/tag-controls/range\">a link to a complete sample</a> showing a data-linked `{^{range}}` tag. It lets you modify both the `members` list and the `name` properties, and see how they automatically trigger updates in other parts of the page which bind to the same data.\n\nJsViews is smart about how it updates the HTML. Generally it does so incrementally - only modifying the affected part of the HTML by inserting or removing elements, or replacing values."
      },
      {
        "_type": "para",
        "title": "Binding to named properties of tags",
        "text": "In the sample we went one step further than shown above. We added data-linking to the `start` and `end` <em>named properties</em> of the `{{range}}` tag:\n\n```jsr\n{^{range members ^start=start-1 ^end=end}}\n```\n\nThe prefixed `^` on the name: `^start=...` is used to specify that the `start` 'named property' is to be data-linked. Change the value (using the drop-down in the sample) and you see that the displayed range updates automatically.\n\nBy default named properties are not data-linked. (This is made 'opt-in' for perf optimization reasons.)"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "<ul>\n<li>JsViews API topic: <a href=\"#linked-elem-syntax\">Data-linked elements</a></li>\n<li>Tutorial sequence of samples: <a href=\"#samples/data-link\">Data-linking tags and elements</a></li>\n</ul>"
      }
    ]
  },
  "linked-elem-syntax": {
    "title": "Data-linked elements",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "JsViews data-linked elements",
        "text": "Data-linked elements are regular HTML elements which have been data-bound in the template by adding a <em>data-link</em> attribute:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
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
            "title": "A data-linked input element (two-way data-binding)",
            "markup": "<input data-link=\"name\"/>"
          },
          {
            "_type": "template",
            "title": "Two-way data-binding with update triggered on every key down",
            "markup": "<input data-link=\"name trigger=true\"/>"
          },
          {
            "_type": "template",
            "title": "A data-linked span element",
            "markup": "<span data-link=\"name\"></span>"
          },
          {
            "_type": "template",
            "title": "A data-linked tag (renders as a text node, not an element...)",
            "markup": "{^{:name}}"
          }
        ],
        "markup": "<input data-link=\"name\"/> <i>(Update on blur)</i><br/>\n<input data-link=\"name trigger=true\"/> <i>(Update on keydown)</i><br/>\n<span data-link=\"name\" class=\"spanbox\"></span>\n{^{:name}}",
        "data": {
          "name": "Jeff"
        },
        "onlyJsRender": false,
        "title": "",
        "height": "110"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice that the `<input data-link=\"name\">` tag automatically has <em>two-way data-binding</em>."
      },
      {
        "_type": "para",
        "title": "Abbreviated syntax and full syntax for data-linked elements",
        "text": "In fact the examples of data-linked elements above correspond to simple cases, where you can use abbreviated syntax. For more powerful or complex data-linking to elements, you can use the full syntax."
      },
      {
        "_type": "para",
        "title": "Abbreviated syntax is just a data-path or expression that you are binding to:",
        "text": "```jsr\n<span data-link=\"pathOrExpression\"></span>\n```\n\nFor example:\n\n```jsr\n<span data-link=\"name\"></span>\n<span data-link=\"address.street\"></span>\n<span data-link=\"~someHelper.computed() > 1\"></span>\n```"
      },
      {
        "_type": "para",
        "title": "The corresponding full syntax is a data-linked {{: ...}} tag",
        "text": "In fact it is short for this full syntax:\n\n```jsr\n<span data-link=\"{:pathOrExpression}\"></span>\n```\n\n-- which is a data-linked version of the familiar JsRender tag: <em><a href=\"#assigntag\">{{:pathOrExpression}}</a></em>. \n\nExamples:\n\n```jsr\n<span data-link=\"{:name}\"></span>\n<span data-link=\"{:address.street}\"></span>\n<span data-link=\"{:~someHelper.computed() > 1}\"></span>\n\n<input data-link=\"{:name:}\"/>\n<input data-link=\"{:name trigger=true:}\"/>\n```"
      },
      {
        "_type": "para",
        "title": "Optional two-way data-binding",
        "text": "Notice the full syntax for the `<input>` has an additional `:` before the `}` at the end. It corresponds to the two-way data binding. (The same applies to other 'user input elements' such as `select`, `textarea` etc.). \n\nAnd in addition, for `<input>`, `<textarea>`, you can optionally include  `trigger=true` to specify updating for every character entry (after keydown).\n\nYou can provide both convert and convertBack converters if you want. (See the <a href=\"#samples/form-els/converters\">two-way binding and converters</a> sample):\n\n```jsr\n<input data-link=\"{myConverter:some.data.path:myConvertBack}\"/>\n\n<select data-link=\"{myConverter:some.data.path:myConvertBack}\">...</select>\n```\n\nOr you can eliminate the `:` at the end, and you will have one-way binding (from the data to the `<input>`):\n\n```jsr\n<input data-link=\"{:some.data.path}\"/>\n```"
      },
      {
        "_type": "para",
        "title": "Full syntax - multiple targets, multiple tags, multiple bindings...",
        "text": "The full syntax allows you to bind multiple expressions each to a different target 'attrib', and is written like this: `data-link=\"attrib1{linkExpression1} attrib2{linkExpression2} ...\"`.\n\n`attrib` corresponds to the target - such as the following:\n<ul class=\"textbefore\">\n<li>HTML attribute (such as <code>title{...}</code>, <code>class{...}</code>, <code>id{...}</code>, <code>disabled{...}</code> or <code>data-foo{...}</code>)</li>\n<li>CSS property (such as <code>css-background-color{...}</code>)</li>\n<li>innerHTML (as in <code>html{...}</code>)</li>\n<li>innerText (as in <code>text{...}</code>)</li>\n<li>special targets like <code>visible{...}</code></li>\n<li>or can be missing altogether (as in <code>{...}</code>) in which case it stands for the default target for the element.</li>\n</ul> \n\nThe default target for most elements is `innerText`, but for `input` and `select` elements it is `value`.\n\nThe linkExpression `{...}` is actually a <em>template tag</em>, such as `{{:a.b.c}}` or `{{myCustomTag .../}}`. The difference from regular JsRender tag syntax is that with data-link expressions, you only put a single curly brace to delimit, and you don't put the self-closing `/`, which is assumed.\n\nIn fact as long as the tag is self closing, you can use any JsRender (or custom tag control) tag you want. You can even do `<div data-link=\"{for some.path tmpl='myForTmpl'}\"></div>`.\n\nSo examples would be: \n\n<ul class=\"textbefore\">\n<li><code>&lt;div data-link=\"{:name}\">&lt;/div></code> (one-way binding to <code>innerText</code> - default target attrib - so automatically HTML encodes).</li>\n<li><code>&lt;div data-link=\"html{:name}\">&lt;/div></code> (one-way binding to <code>innerHTML</code>)</li>\n<li><code>&lt;div data-link=\"text{:name}\">&lt;/div></code> (one-way binding to <code>innerText</code> - equivalent to default above)</li>\n<li><code>&lt;div data-link=\"html{>name}\">&lt;/div></code> (one-way binding to <code>innerHTML</code> but with HTML encoding)</li>\n<li><code>&lt;input data-link=\"{:name}\" /&gt;</code> (one-way binding to <code>value</code> - default target attrib)</li>\n<li><code>&lt;input data-link=\"value{:name}\" /&gt;</code> (one-way binding to <code>value</code>)</li>\n<li><code>&lt;input data-link=\"title{:name}\" /&gt;</code> (one-way binding to the <code>title</code> attribute)</li>\n<li><code>&lt;input data-link=\"{:name trigger=true:}\" /&gt;</code> (two-way binding to <code>value</code>, trigger on keydown) <br/>- equivalent to abbreviated syntax: <code>&lt;input data-link=\"name trigger=true\" /&gt;</code></li>\n<li><code>&lt;input data-link=\"{cvt:name:cvtBack}\" /&gt;</code> (two-way binding to <code>value</code>, with converters)</li>\n<li><code>&lt;input data-link=\"{cvt:name trigger=true:cvtBack}\" /&gt;</code> (two-way binding to <code>value</code>, with converters, and trigger on keydown)</li>\n<li><code>&lt;input data-link=\"{cvt:name:cvtBack} title{:info.description}\" /&gt;</code> (two-way binding to <code>value</code>, with converters and one-way binding to <code>title</code>)</li>\n<li><code>&lt;div data-link=\"{myCustomTag name}\">&lt;/div></code> (data-linking a JsViews custom tag control - rendering as <code>innerHTML</code> - default target attrib for tags other than {: ...} - so can insert HTML markup)</li>\n<li><code>&lt;div data-link=\"text{myCustomTag name}\">&lt;/div></code> (data-linking a JsViews custom tag control - rendering as <code>innerText</code> - so automatically HTML encodes)</li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "When do you use the abbreviated syntax?",
        "text": "The abbreviated syntax is an alternative syntax when you only have a single expression of the form `{:someExpression}`, or in the case of inputs `{:someExpression:}` (two-way binding). So it is using the default target attrib, and is targeting `innerText`, and automatically doing HTML encoding. In that case you can remove the `{}` delimiters and colons and just write the `someExpression`. JsViews will expand your expression to the full syntax. Example: `data-link=\"name\"`.\n\nSo if you need any of the following, you need to switch to the full format:\n<ul class=\"textbefore\">\n<li>insertion of HTML markup as `innerHTML`: (switch to `html{:someExpression}`)</li>\n<li>converters</li>\n<li>different target 'attribs'</li>\n<li>multiple bindings</li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "Samples of data-linking:",
        "text": "<ul>\n<li>There many samples showing data-linking under <a href=\"#samples/jsv\">JsViews Samples</a></li>\n<li>See in particular this <a href=\"#samples/data-link\">tutorial sequence on data-linking</a></li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "<ul>\n<li>JsViews API topic: <a href=\"#linked-tag-syntax\">Data-linked tags</a></li>\n<li>Tutorial sequence of samples: <a href=\"#samples/data-link\">Data-linking tags and elements</a></li>\n</ul>"
      }
    ]
  }
};