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
        "text": "Any JsRender template can be used with JsViews."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Calling the <a href=\"#rendertmpl\">.render()</a> method works just the same within JsViews as it does if only JsRender is loaded. But alternatively you can use the <a href=\"#jsvlinktmpl\">.link()</a> method - which will first render and then add data binding (<em>data-link the template</em>)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "If you have data-linked your template, then you can continue to use the same <a href=\"#jsrtags\">JsRender template tags</a> as before. But now you optionally make the templates data-linked, by add the ^ character on the opening tag, as in:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{^{for people}}\n  {^{:name}}\n{{/for}}"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See <a href=\"#linked-template-syntax\">data-link template syntax</a> for details..."
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
        "text": "With JsViews, it is different. Here are the rules of what is valid, or invalid, within a JsViews template:\n<ul class=\"textbefore\"><li>JsRender template tags which are outside HTML elements, or fully within the element content of an HTML element can remain unchanged in a JsViews template. They will work correctly. They can optionally be data-linked by simply adding a ^ character (so that for example a <em>{{for}}</em> tag becomes a data-linked <em>{^{for}}</em> tag) - and in that case the rendered content will change dynamically whenever the bound data changes <em>'observably'</em>.</li>\n<li>But tags which are within the markup of the actual HTML opening tag itself, whether placed between attributes, or spanning attributes, or within the attribute content (the text value of the attribute), will not be valid in a JsViews template.</li>\n<li>Similarly, tags which wrap opening or closing tag in such a way as to produce 'mal-formed HTML' will not be valid.</li>\n<li>In fact a valid JsViews template will have the tree hierarchy of nested HTML tags and nested template tags combining together, as it were, as a single well-formed tree.</li>\n<li>In each of the invalid scenarios mentioned above, <b><em>the JsRender tags needs to be replaced by corresponding data-linked element syntax</em></b>. See <a href=\"#linked-template-syntax\">the next section</a>, for details.</li></ul>\n"
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
        "text": "A data-linked tag is like a regular JsRender tag (whether a built-in tag, or a custom tag) but has an additional ^ character to show that is data-linked. Let's illustrate that by an example based on the <a href=\"#samples/jsr/tags/extend-for\">extending the {{for}} tag</a> sample:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "<ul>\n  {{for members}}\n    <li>\n      {{:name}}\n    </li>\n  {{/for}}\n</ul>\n\n<ul>\n  {{range members start=1 end=3}}\n    <li>\n      {{:name}}\n    </li>\n  {{/range}}\n</ul>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "We can data-link to the <em>members</em> - whether on the built-in <em>{{for}}</em>, or the custom <em>{{range}}</em> tag - like this:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "<ul>\n  {^{for members}}\n    <li>\n      {^{:name}}\n    </li>\n  {{/for}}\n</ul>\n"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "<ul>\n  {^{range members start=1 end=3}}\n    <li>\n      {^{:name}}\n    </li>\n  {{/range}}\n</ul>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now if the <em>members</em> changes, our rendered template content will automatically update to show the additional inserted (or removed) members in the list."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is a live sample of the data-linked <em>{^{for}}</em> tag:"
      },
      {
        "_type": "sample",
        "typeLabel": "Sample:",
        "codetabs": [],
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
        "text": "Notice that we also added a ^ to the <em>{^{:name}}</em> tag. That means that if the value of the name field is changed ('observably') then the value will update automatically within the rendered template."
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is <a href=\"#samples/tag-controls/range\">a link to a complete sample</a> showing a data-linked <em>{^{range}}</em> tag. It lets you modify both the <em>members</em> list and the <em>name</em> properties, and see how they automatically trigger updates in other parts of the page which bind to the same data."
      },
      {
        "_type": "para",
        "title": "",
        "text": "JsViews is smart about how it updates the HTML. Generally it does so incrementally - only modifying the affected part of the HTML by inserting or removing elements, or replacing values."
      },
      {
        "_type": "para",
        "title": "Binding to named properties of tags",
        "text": "In the sample we went one step further than shown above. We added data-linking to the <em>start</em> and <em>end</em> <em>named properties</em> of the <em>{{range}}</em> tag:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "{^{range members ^start=start-1 ^end=end}}"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The prefixed ^ on the name: <em>^start=...</em> is used to specify that the <em>start</em> 'named property' is to be data-linked. Change the value (using the drop-down in the sample) and you see that the displayed range updates automatically."
      },
      {
        "_type": "para",
        "title": "",
        "text": "By default named properties are not data-linked. (This is made 'opt-in' for perf optimization reasons.)"
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
        "text": "Notice that the <em>&lt;input data-link=\"name\"/&gt;</em> tag automatically has <em>two-way data-binding</em>."
      },
      {
        "_type": "para",
        "title": "Abbreviated syntax and full syntax for data-linked elements",
        "text": "In fact the examples of data-linked elements above correspond to simple cases, where you can use abbreviated syntax. For more powerful or complex data-linking to elements, you can use the full syntax."
      },
      {
        "_type": "template",
        "title": "Abbreviated syntax is just a data-path or expression that you are binding to:",
        "markup": "<span data-link=\"pathOrExpression\"></span>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For example:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "<span data-link=\"name\"></span>\n<span data-link=\"address.street\"></span>\n<span data-link=\"~someHelper.computed() > 1\"></span>"
      },
      {
        "_type": "para",
        "title": "The corresponding full syntax is a data-linked {{: ...}} tag",
        "text": "In fact it is short for this full syntax:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "<span data-link=\"{:pathOrExpression}\"></span>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "- which is a data-linked version of the familiar JsRender tag: <em><a href=\"#assigntag\">{{:pathOrExpression}}</a></em>. Examples:"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "<span data-link=\"{:name}\"></span>\n<span data-link=\"{:address.street}\"></span>\n<span data-link=\"{:~someHelper.computed() > 1}\"></span>\n\n<input data-link=\"{:name:}\"/>\n<input data-link=\"{:name trigger=true:}\"/>"
      },
      {
        "_type": "para",
        "title": "Optional two-way data-binding",
        "text": "Notice the full syntax for the <em>&lt;input/&gt;</em> has an additional ':' before the '}' at the end. It corresponds to the two-way data binding. (The same applies to other 'user input elements' such as <em>select</em>, <em>textarea</em> etc.). "
      },
      {
        "_type": "para",
        "title": "",
        "text": "And in addition, for <em>&lt;input/&gt;</em>, <em>&lt;textarea&gt;</em>, you can optionally include  <em>trigger=true</em> to specify updating for every character entry (after keydown)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "You can provide both convert and convertBack converters if you want. (See the <a href=\"#samples/form-els/converters\">two-way binding and converters</a> sample):"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "<input data-link=\"{myConverter:some.data.path:myConvertBack}\"/>\n\n<select data-link=\"{myConverter:some.data.path:myConvertBack}\">...</select>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Or you can eliminate the ':' at the end, and you will have one-way binding (from the data to the <em>&ltinput /&gt;</em>):"
      },
      {
        "_type": "template",
        "title": "",
        "markup": "<input data-link=\"{:some.data.path}\"/>"
      },
      {
        "_type": "para",
        "title": "Full syntax - multiple targets, multiple tags, multiple bindings...",
        "text": "The full syntax allows you to bind multiple expressions each to a different target 'attrib', and is written like this: <em>data-link=\"attrib1{linkExpression1} attrib2{linkExpression2} ...\"</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>attrib</em> corresponds to the target - such as the following:\n<ul class=\"textbefore\">\n<li>HTML attribute (such as <em>title{...}</em>, <em>class{...}</em>, <em>id{...}</em>, <em>disabled{...}</em> or <em>data-foo{...}</em>)</li>\n<li>CSS property (such as <em>css-background-color{...}</em>)</li>\n<li>innerHTML (as in <em>html{...}</em>)</li>\n<li>innerText (as in <em>text{...}</em>)</li>\n<li>special targets like <em>visible{...}</em></li>\n<li>or can be missing altogether (as in <em>{...}</em>) in which case it stands for the default target for the element.</li>\n</ul> "
      },
      {
        "_type": "para",
        "title": "",
        "text": "The default target for most elements is innerText, but for inputs and select it is <em>value</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "The linkExpression <em>{...}</em> is actually a <em>template tag</em>, such as <em>{{:a.b.c}}</em> or <em>{{myCustomTag .../}}</em>. The difference from regular JsRender tag syntax is that with data-link expressions, you only put a single curly brace to delimit, and you don't put the self-closing <em>/</em>, which is assumed."
      },
      {
        "_type": "para",
        "title": "",
        "text": "In fact as long as the tag is self closing, you can use any JsRender (or custom tag control) tag you want. You can even do <em>&lt;div data-link=\"{for some.path tmpl='myForTmpl'}\">&lt;/div></em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "So examples would be: \n\n<ul class=\"textbefore\">\n<li><em>&lt;div data-link=\"{:name}\">&lt;/div></em> (one-way binding to innerText - default target attrib - so automatically HTML encodes).</li>\n<li><em>&lt;div data-link=\"html{:name}\">&lt;/div></em> (one-way binding to innerHTML)</li>\n<li><em>&lt;div data-link=\"text{:name}\">&lt;/div></em> (one-way binding to innerText - equivalent to default above)</li>\n<li><em>&lt;div data-link=\"html{>name}\">&lt;/div></em> (one-way binding to innerHTML but with HTML encoding)</li>\n<li><em>&lt;input data-link=\"{:name}\" /&gt;</em> (one-way binding to value - default target attrib)</li>\n<li><em>&lt;input data-link=\"value{:name}\" /&gt;</em> (one-way binding to value)</li>\n<li><em>&lt;input data-link=\"title{:name}\" /&gt;</em> (one-way binding to the title attribute)</li>\n<li><em>&lt;input data-link=\"{:name trigger=true:}\" /&gt;</em> (two-way binding to value, trigger on keydown) <br/>- equivalent to abbreviated syntax: <em>&lt;input data-link=\"name trigger=true\" /&gt;</em></li>\n<li><em>&lt;input data-link=\"{cvt:name:cvtBack}\" /&gt;</em> (two-way binding to value, with converters)</li>\n<li><em>&lt;input data-link=\"{cvt:name trigger=true:cvtBack}\" /&gt;</em> (two-way binding to value, with converters, and trigger on keydown)</li>\n<li><em>&lt;input data-link=\"{cvt:name:cvtBack} title{:info.description}\" /&gt;</em> (two-way binding to value, with converters and one-way binding to title)</li>\n<li><em>&lt;div data-link=\"{myCustomTag name}\">&lt;/div></em> (data-linking a JsViews custom tag control - rendering as innerHTML - default target attrib for tags other than {: ...} - so can insert HTML markup)</li>\n<li><em>&lt;div data-link=\"text{myCustomTag name}\">&lt;/div></em> (data-linking a JsViews custom tag control - rendering as innerText - so automatically HTML encodes)</li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "When do you use the abbreviated syntax?",
        "text": "The abbreviated syntax is an alternative syntax when you only have a single expression of the form <em>{:someExpression}</em>, or in the case of inputs <em>{:someExpression:}</em> (two-way binding). So it is using the default target attrib, and is targeting innerText, and automatically doing HTML encoding. In that case you can remove the {} delimiters and colons and just write the <em>someExpression</em>. JsViews will expand your expression to the full syntax. Example: <em>data-link=\"name\"</em>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "So if you need any of the following, you need to switch to the full format:\n<ul class=\"textbefore\">\n<li>insertion of HTML markup as innerHTML: (switch to <em>html{:someExpression}</em>)</li>\n<li>converters</li>\n<li>different target 'attribs'</li>\n<li>multiple bindings</li>\n</ul>"
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