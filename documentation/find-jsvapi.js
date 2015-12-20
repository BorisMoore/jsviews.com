var content = $.views.documentation.content;

content.find.jsvapi = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/jsvapi")) ||
{
  "jsvapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "(Work in progress. Other topics to follow…)\n"
      },
      {
        "_type": "links",
        "title": ""
      }
    ]
  },
  "jsvtags": {
    "sections": []
  },
  "jsvlinktmpl": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The link(container, data, helpersOrContext) is similar to the render(data, helpersOrContext) method, but in addition to rendering the template, it also inserts the rendered output as content of the target HTML container element, and then data-links (data-binds to observable data) the HTML content to the underlying data.\nThe link(container, data, helpersOrContext) method takes as parameters the target HTML container element (or jQuery selector), the data (used as the ‘data context’ during the rendering and linking), and optionally additional metadata or contextual helpers. It returns a jQuery object corresponding to the container element.\nThere are two ways of calling the link() method:\n\nIf you have a reference to the template object - myTmpl, call myTmpl.link(…)\nIf you have registered the template by name - \"myTmpl\", call $.link.myTmpl(…)\n\n"
      },
      {
        "_type": "links",
        "title": "Links:"
      }
    ]
  },
  "jsvtmpllink": {
    "sections": [
      {
        "_type": "para",
        "title": "myTmpl.link()",
        "text": "myTmpl.link()\nIf myTmpl is the compiled template object for your template, you can render and data-link it (data-bind to underlying observable data) using the myTmpl.link() method – which takes a container element (or jQuery selector) and a data object or array (as well as an optional helpersOrContext object).\nTo get a template object from a template string, a template declared in a script block, or a previously registered named template, see $.templates().\n"
      },
      {
        "_type": "api",
        "title": "template.link(container, data)",
        "text": "template.link(container, data)\nRender and link template against data, under a container element\nRender and link template against data, as content of container element\n\nmyTmpl.link(\"#container\", myData);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing an object to the link() method.\n— The template is rendered once, with the object as data context:\n"
      },
      {
        "_type": "sample",
        "title": "template.link(object):",
        "text": "template.link(object):\n<td>{^{:name}}</td>\n<td><input data-link=\"name trigger=true\" /></td>\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nmyTmpl.link(\"#person\", person);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing an array to the link() method.\n— The template is rendered once for each item in the array:\n"
      },
      {
        "_type": "sample",
        "title": "template.link(array):",
        "text": "template.link(array):\nmyTmpl.link(\"#peopleList\", people);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing helpers to the link() method.\n"
      },
      {
        "_type": "api",
        "title": "template.link(container, data, helpersOrContext)",
        "text": "template.link(container, data, helpersOrContext)\nRender and link template against data, under a container element, along with helper objects or context\nRender and link template against data (as content of container element) and pass in helpers\n\nmyTmpl.link(\"#container\", myData, myHelpers);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "You can pass in any JavaScript type (object, string, number, function…) as helpers on the helpersOrContext object, and use them as metadata, or as helper functions for formatting etc.\nNote: By passing in helpers in this way, you are making them specific to this render call. Alternatively, you can declare helpers globally, – and you can also declare helpers that are private to a specific template. See Registering helpers: $.views.helpers() for details…\nWithin the template, helpers (whether global, or passed in to the render() method) are accessed by helper paths: ~keyName....\nFor example you might pass in an object with some utility functions:\nvar myHelpers = {\n  util: {\n    split: function(val, part) {...},\n    ...\n  },\n  ...\n};\n\nvar html = myTmpl.render(myData, myHelpers);\n\n– and access them in the template using a helper path such as:\n{{:~util.split(fullName, 0)}}\n\nSee Registering helpers\n"
      },
      {
        "_type": "sample",
        "title": "template.link(object, myHelpers):",
        "text": "template.link(object, myHelpers):\nfunction toUpper(val) {...}\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nmyTmpl.link(\"#person\", person, myHelpers);\n\n<td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n\nClick Try it and change the color to \"green\"…\n\n"
      },
      {
        "_type": "links",
        "title": "See also:"
      }
    ]
  },
  "jsv.d.link": {
    "sections": [
      {
        "_type": "para",
        "title": "$.link.myTmpl()",
        "text": "$.link.myTmpl()\nIf a template has been registered as a named template:\n$.templates(\"myTmpl\", \"#personTmpl\");\n\n…then you can call the link() method of the template without needing to hold on to the compiled template object returned from $.templates(...).\nJust call $.link.myTmpl(...), or $.link[\"myTmpl\"](...)\n"
      },
      {
        "_type": "api",
        "title": "$.link.myTmpl(container, data, helpersOrContext)",
        "text": "$.link.myTmpl(container, data, helpersOrContext)\nRender and link a named template against data, along with helper objects or context\nRender and link template against data (as content of a container element) and pass in helpers\n\n$.link.myTmpl(\"#container\", myData, myHelpers);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example:\n"
      },
      {
        "_type": "sample",
        "title": "$.link.personTmpl(...):",
        "text": "$.link.personTmpl(...):\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\n$.link.personTmpl(\"#person\", person, myHelpers);\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:"
      }
    ]
  },
  "jsvunlink": {
    "sections": [
      {
        "_type": "links",
        "title": ""
      }
    ]
  },
  "jsvtmplunlink": {
    "sections": []
  },
  "jsv.d.unlink": {
    "sections": []
  },
  "jsv.db.unlink": {
    "sections": []
  },
  "$view": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Each instance of a rendered template or a template block tag is associated with a JsViews “view” object.\nUse $.view() to get from the rendered HTML back to the data.\n"
      },
      {
        "_type": "links",
        "title": ""
      }
    ]
  },
  "jsv.d.view": {
    "sections": [
      {
        "_type": "para",
        "title": "var view = $.view(elem);",
        "text": "var view = $.view(elem);\nEach instance of a rendered template or a template block tag is associated with a JsViews “view” object.\nViews provide information on how the underlying data objects map to the rendered UI.\nFrom UI back to data:\nUse $.view(elemOrSelector) to get from a DOM element to the corresponding view object for that part of the rendered content.\nFrom the view you can get to the underlying data, the index, etc.\n"
      },
      {
        "_type": "sample",
        "title": "Getting to the data: $.view(elem)",
        "text": "Getting to the data: $.view(elem)\n{^{for people}}\n  ...\n  <button class=\"changeBtn\">Change</button>\n  ...\n{{/for}}\n\nClick-handler code for Change button:\n$(\".changeBtn\").on(\"click\", function() {\n  var view = $.view(this); // From the clicked HTML element ('this'), get the view object\n  var person = view.data;  // The 'person' data object for clicked button\n  var index = view.index;  // The index of this 'item view'. (Equals index of person in people array)\n  $.observable(person).setProperty(\"name\", person.name + \" \" + index); // Change the person.name\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "Normal syntax:",
        "text": "Normal syntax:\n"
      },
      {
        "_type": "api",
        "title": "$.view(elementOrSelector)",
        "text": "$.view(elementOrSelector)\nFrom an HTML element or a jQuery selector, get the corresponding contextual view object within the view hierarchy  \nGet the contextual view object for an HTML element, or selector\n\nvar view = $.view(\"#myElement\");\n\n"
      },
      {
        "_type": "para",
        "title": "Alternative syntax:",
        "text": "Alternative syntax:\nIf you already have a jQuery object $(elementOrSelector), then it can be convenient to use the following alternative syntax:\nvar view = $(elementOrSelector).view();\n\nThis can be convenient in some scenarios, for example if you want to call another jQuery method on the same target element or selector, before getting the view. You can even chain the calls as in: var view = $(elementOrSelector).doSomething().view();\n"
      },
      {
        "_type": "api",
        "title": "$(elementOrSelector).view()",
        "text": "$(elementOrSelector).view()\nFrom an HTML element or a jQuery selector, get the corresponding contextual view object within the view hierarchy  \nGet the contextual view object for an HTML element, or selector\n\nvar view = $(\"#myElement\").view();\n\n"
      }
    ]
  },
  "jsv.db.view": {
    "sections": []
  },
  "jsvcompiletmpl": {
    "sections": []
  },
  "jsvregister": {
    "sections": [
      {
        "_type": "links",
        "title": ""
      }
    ]
  },
  "jsvconverters": {
    "sections": []
  },
  "jsvtemplatetags": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Any JsRender template can be used with JsViews.\nCalling the render() method works just the same within JsViews as it does if only JsRender is loaded. But alternatively you can use the link() method - which will first render and then add data binding (data-link the template).\nIf you have data-linked your template by calling the link() method, then you can continue to use the same JsRender template tags as before. But now you optionally make any tag in the template data-linked, by replacing the {{... of the opening tag by {^{..., as in:\n{^{for people}}\n  {^{:name}}\n{{/for}}\n\nIn addition, you can data-link the HTML elements in your template, as in:\n<input data-link=\"name\" />\n<div data-link=\"css-color{:color} {:name}\"></div>\n\nSee data-link template syntax for details…\n"
      },
      {
        "_type": "para",
        "title": "But in JsViews templates, your template must be well-formed:",
        "text": "But in JsViews templates, your template must be well-formed:\nJsRender is different. If you are only using JsRender (so no ‘HTML-aware data-binding’), you have a lot of freedom. You can even do this:\n"
      },
      {
        "_type": "sample",
        "title": "Badly-formed template - but OK in JsRender!",
        "text": "Badly-formed template - but OK in JsRender!\n{{if}} tag blocks wrap part of an HTML <td> tag\n\n{{:firstName}}{{:lastName}}\n  {{else}}\n    colspan=\"2\">{{:firstName}}\n  {{/if}}\n\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "That works because JsRender is pure string-based rendering, it doesn’t mind how you mix you JsRender tag hierarchy with the HTML tag markup.\n"
      },
      {
        "_type": "para",
        "title": "Rules for a well-formed template in JsViews:",
        "text": "Rules for a well-formed template in JsViews:\nWith JsViews, it is different. Here are the rules of what is valid, or invalid, within a JsViews template:\nJsRender template tags which are outside HTML elements, or fully within the element content of an HTML element can remain unchanged in a JsViews template. They will work correctly. They can optionally be data-linked by simply adding a ^ character (so that for example a {{for}} tag becomes a data-linked {^{for}} tag) - and in that case the rendered content will change dynamically whenever the bound data changes 'observably'.\nBut tags which are within the markup of the actual HTML opening tag itself, whether placed between attributes, or spanning attributes, or within the attribute content (the text value of the attribute), will not be valid in a JsViews template.\nSimilarly, tags which wrap opening or closing tag in such a way as to produce 'mal-formed HTML' will not be valid.\nIn fact a valid JsViews template will have the tree hierarchy of nested HTML tags and nested template tags combining together, as it were, as a single well-formed tree.\nIn each of the invalid scenarios mentioned above, the JsRender tags needs to be replaced by corresponding data-linked element syntax. See the next section, for details.\n"
      }
    ]
  },
  "jsvhelpers": {
    "sections": []
  },
  "jsvtagcontrols": {
    "sections": []
  },
  "jsvobjects": {
    "sections": [
      {
        "_type": "links",
        "title": ""
      }
    ]
  },
  "jsvviewsobject": {
    "sections": []
  },
  "jsvtemplateobject": {
    "sections": []
  },
  "jsvviewobject": {
    "sections": []
  },
  "jsvtagobject": {
    "sections": []
  },
  "jsvviewcontextobject": {
    "sections": []
  },
  "jsvtagcontextobject": {
    "sections": []
  },
  "jsvlinkcontextobject": {
    "sections": []
  },
  "linked-template-syntax": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews data-link syntax takes two forms:\nData-linked tagsData-linked elements"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "See also:\nTutorial sequence of samples: Data-linking tags and elements\n"
      }
    ]
  },
  "linked-tag-syntax": {
    "sections": [
      {
        "_type": "para",
        "title": "JsViews data-linked tags",
        "text": "JsViews data-linked tags\nA data-linked tag is like a regular JsRender tag (whether a built-in tag, or a custom tag) but has an additional ^ character to show that is data-linked. Let’s illustrate that by an example based on the extending the {{for}} tag sample:\n<ul>\n  {{for members}}\n    <li>\n      {{:name}}\n    </li>\n  {{/for}}\n</ul>\n\n<ul>\n  {{range members start=1 end=3}}\n    <li>\n      {{:name}}\n    </li>\n  {{/range}}\n</ul>\n\nWe can data-link to the members - whether on the built-in {{for}}, or the custom {{range}} tag - like this:\n<ul>\n  {^{for members}}\n    <li>\n      {^{:name}}\n    </li>\n  {{/for}}\n</ul>\n\n<ul>\n  {^{range members start=1 end=3}}\n    <li>\n      {^{:name}}\n    </li>\n  {{/range}}\n</ul>\n\nNow if the members array changes, our rendered template content will automatically update to show the additional inserted (or removed) members in the list.\nHere is a live sample of the data-linked {^{for}} tag:\n"
      },
      {
        "_type": "sample",
        "text": "\n{^{for members}}\n  \n    {^{:name}} \n  \n{{/for}}\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice that we also added a ^ to the {^{:name}} tag. That means that if the value of the name field is changed (‘observably’) then the value will update automatically within the rendered template.\nAnd here is a link to a complete sample showing a data-linked {^{range}} tag. It lets you modify both the members list and the name properties, and see how they automatically trigger updates in other parts of the page which bind to the same data.\nJsViews is smart about how it updates the HTML. Generally it does so incrementally - only modifying the affected part of the HTML by inserting or removing elements, or replacing values.\n"
      },
      {
        "_type": "para",
        "title": "Binding to named properties of tags",
        "text": "Binding to named properties of tags\nIn the sample we went one step further than shown above. We added data-linking to the start and end named properties of the {{range}} tag:\n{^{range members ^start=start-1 ^end=end}}\n\nThe prefixed ^ on the name: ^start=... is used to specify that the start ‘named property’ is to be data-linked. Change the value (using the drop-down in the sample) and you see that the displayed range updates automatically.\nBy default named properties are not data-linked. (This is made ‘opt-in’ for perf optimization reasons.)\n"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "See also:\n\nJsViews API topic: Data-linked elements\nTutorial sequence of samples: Data-linking tags and elements\n\n"
      }
    ]
  },
  "linked-elem-syntax": {
    "sections": [
      {
        "_type": "para",
        "title": "JsViews data-link expressions, and syntax",
        "text": "JsViews data-link expressions, and syntax\nData-linked elements are regular HTML elements which have been data-bound in the template by adding a data-link attribute.\nThey can be used within templated content, as in the following sample – and they can also be used on top-level non-templated content in your page - see Top-level data-linking.\n"
      },
      {
        "_type": "sample",
        "title": "Data-linked elements in templates",
        "text": "Data-linked elements in templates\nA data-linked input element (two-way data-binding)\n\n\n\nTwo-way data-binding with update triggered on every key down\n\n\n\nA data-linked span element\n\n\n\nA data-linked tag (renders as a text node, not an element...)\n\n{^{:name}}\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice that the <input data-link=\"name\"> tag automatically has two-way data-binding.\n"
      },
      {
        "_type": "para",
        "title": "Abbreviated syntax and full syntax for data-linked elements",
        "text": "Abbreviated syntax and full syntax for data-linked elements\nIn fact the examples of data-linked elements above correspond to simple cases, where you can use abbreviated syntax. For more powerful or complex data-linking to elements, you can use the full syntax.\n"
      },
      {
        "_type": "para",
        "title": "Abbreviated syntax is just a data-path or expression that you are binding to:",
        "text": "Abbreviated syntax is just a data-path or expression that you are binding to:\n<span data-link=\"pathOrExpression\"></span>\n\nFor example:\n<span data-link=\"name\"></span>\n<span data-link=\"address.street\"></span>\n<span data-link=\"~someHelper.computed() > 1\"></span>\n\n"
      },
      {
        "_type": "para",
        "title": "The corresponding full syntax is a data-linked <code>{{: ...}}</code> tag",
        "text": "The corresponding full syntax is a data-linked {{: ...}} tag\nIn fact it is short for this full syntax:\n<span data-link=\"{:pathOrExpression}\"></span>\n\n– which is a data-linked version of the familiar JsRender tag: {{:pathOrExpression}}.\nExamples:\n<span data-link=\"{:name}\"></span>\n<span data-link=\"{:address.street}\"></span>\n<span data-link=\"{:~someHelper.computed() > 1}\"></span>\n\n<input data-link=\"{:name:}\"/>\n<input data-link=\"{:name trigger=true:}\"/>\n\n"
      },
      {
        "_type": "para",
        "title": "Optional two-way data-binding",
        "text": "Optional two-way data-binding\nNotice the full syntax for the <input> has an additional : before the } at the end. It corresponds to the two-way data binding. (The same applies to other ‘user input elements’ such as select, textarea etc. (and also content editable elements).\nYou can provide both convert and convertBack converters if you want. (See the two-way binding and converters sample):\n<input data-link=\"{myConverter:some.data.path:myConvertBack}\"/>\n\n<select data-link=\"{myConverter:some.data.path:myConvertBack}\">...</select>\n\nAnd in addition, whenever you have two-way binding, you can optionally include  trigger=true to specify updating for every character entry (after keydown):\n<textarea data-link=\"{myConverter:some.data.path trigger=true:myConvertBack}\">...</select>\n\nIf you want only one-way binding (from the data to the <input>) you simply eliminate the : at the end:\n<input data-link=\"{:some.data.path}\"/>\n\n"
      },
      {
        "_type": "para",
        "title": "Full syntax - multiple targets, multiple tags, multiple bindings...",
        "text": "Full syntax - multiple targets, multiple tags, multiple bindings...\nThe full syntax allows you to bind multiple expressions each to a different target 'attrib’, and is written like this: data-link=\"attrib1{linkExpression1} attrib2{linkExpression2} ...\".\nattrib corresponds to the target - such as the following:\n\nHTML attribute (such as title{…}, class{…}, id{…}, disabled{…} or data-foo{…})\nCSS property (such as css-background-color{…})\ninnerHTML (as in html{…})\ninnerText (as in text{…})\nspecial targets like visible{…}\nor can be missing altogether (as in {…}) in which case it stands for the default target for the element.\n\nThe default target for most elements is innerText, but for input and select elements it is value.\nThe linkExpression {...} is actually a template tag, such as {{:a.b.c}} or {{myCustomTag .../}}. The difference from regular JsRender tag syntax is that with data-link expressions, you only put a single curly brace to delimit, and you don’t put the self-closing /, which is assumed.\nIn fact as long as the tag is self-closing, you can use any JsRender tag you want - including custom tags.\nFor example, if you have a JsRender tag as content of an element:\n<div>{{for some.path tmpl='myForTmpl'}}</div>\n\n– then you can make it into a data-linked tag, using:\n<div>{^{for some.path tmpl='myForTmpl'}}</div>\n\n– or into a data-linked element, using:\n<div data-link=\"{for some.path tmpl='myForTmpl'}\" ></div>\n\nSo examples would be:\n\n<div data-link=\"{:name}\"></div> (one-way binding to innerText - default target attrib - so automatically HTML encodes).\n<div data-link=\"html{:name}\"></div> (one-way binding to innerHTML)\n<div data-link=\"text{:name}\"></div> (one-way binding to innerText - equivalent to default above)\n<div data-link=\"html{>name}\"></div> (one-way binding to innerHTML but with HTML encoding)\n<input data-link=\"{:name}\" /&gt; (one-way binding to value - default target attrib)\n<input data-link=\"value{:name}\" /&gt; (one-way binding to value)\n<input data-link=\"title{:name}\" /&gt; (one-way binding to the title attribute)\n<input data-link=\"{:name trigger=true:}\" /&gt; (two-way binding to value, trigger on keydown) - equivalent to abbreviated syntax: <input data-link=\"name trigger=true\" /&gt;\n<input data-link=\"{cvt:name:cvtBack}\" /&gt; (two-way binding to value, with converters)\n<input data-link=\"{cvt:name trigger=true:cvtBack}\" /&gt; (two-way binding to value, with converters, and trigger on keydown)\n<input data-link=\"{cvt:name:cvtBack} title{:info.description}\" /&gt; (two-way binding to value, with converters and one-way binding to title)\n<div data-link=\"{myCustomTag name}\"></div> (data-linking a JsViews custom tag control - rendering as innerHTML - default target attrib for tags other than {: …} - so can insert HTML markup)\n<div data-link=\"text{myCustomTag name}\"></div> (data-linking a JsViews custom tag control - rendering as innerText - so automatically HTML encodes)\n\n"
      },
      {
        "_type": "para",
        "title": "When do you use the abbreviated syntax?",
        "text": "When do you use the abbreviated syntax?\nThe abbreviated syntax is an alternative syntax when you only have a single expression of the form {:someExpression}, or in the case of inputs {:someExpression:} (two-way binding). So it is using the default target attrib, and is targeting innerText, and automatically doing HTML encoding. In that case you can remove the {} delimiters and colons and just write the someExpression. JsViews will expand your expression to the full syntax. Example: data-link=\"name\".\nSo if you need any of the following, you need to switch to the full format:\n\ninsertion of HTML markup as innerHTML: (switch to html{:someExpression})\nconverters\ndifferent target ‘attribs’\nmultiple bindings\nusing tags other than {{: ...}}\n\n"
      },
      {
        "_type": "para",
        "title": "Data-linking expressions using block tags, such as {{for}} - including {{else}} blocks.",
        "text": "Data-linking expressions using block tags, such as {{for}} - including {{else}} blocks.\nAs mentioned above, you can data-link to block tags, as long as you register the block content as a separate template, referenced using tmpl=...:\n<div data-link=\"{for employees tmpl='nameTmpl'}\">\n\nYou can also data-link to block tags that include {{else}} blocks, such as:\n<div data-link=\"{if someExpression tmpl='isTrueTmpl'}{else tmpl='isFalseTmpl'}\" ></div>\n\nExample:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "Top-level data-linking to {if ...}{else ...}\nShow: <input data-link=\"show\" type=\"checkbox\"/>\n<b data-link=\"{if show tmpl='show this'}{else tmpl='no show'}\"></b>\n\n$.link(true, \"body\", {show: true});\n\n\n"
      },
      {
        "_type": "para",
        "title": "Data-linking expressions using tag controls",
        "text": "Data-linking expressions using tag controls\nAn important case of data-linking is binding and instantiating of custom tag controls, such as:\n<div data-link=\"{slider size _range='min' ...}\"></div>\n\nSee the tag control samples. Note that this works not only within data-linked templates, but also  when linking to top-level content – as shown in the second variant of the slider sample.\nAnother example might be a tabs control where the {{else}} blocks are the contents of the different tabs:\n<div data-link=\"{tabs ... tmpl='tab1'}{else ... tmpl='tab2'}{else ... tmpl='tab3'}\"></div>\n\nExample:\n"
      },
      {
        "_type": "sample",
        "title": "A top-level data-linked tabs control",
        "text": "A top-level data-linked tabs control\nUsing data-linking to instantiate a tabs control on a top-level page element:\n<div id=\"tabsView\" data-link=\"\n  {tabs tabCaption='days' tmpl='tab1' selectedIndex=2}\n  {else tabCaption='months' tmpl='tab2'}\n  {else tabCaption='name' tmpl='tab3'}\n\"></div>\n\n$.templates({\n  tab1: \"365 days per year\",\n  ...\n  tab3: \"Name: {{:name}}\"\n});\n\n$(\"#tabsView\").link(true, {name: \"Jeff\"});\n\n\n"
      },
      {
        "_type": "para",
        "title": "Samples of data-linking:",
        "text": "Samples of data-linking:\n\nThere are many samples showing data-linking under JsViews Samples\nSee in particular this tutorial sequence on data-linking\n"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "See also:\n\nJsViews API topic: Data-linked tags\nTutorial sequence of samples: Data-linking tags and elements\n"
      }
    ]
  },
  "toplink": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "You can use data-linking not only for templated content, but also to data-bind to top-level HTML content in your page. Data-link expressions can be applied to top-level elements either declaratively, or programmatically:\n"
      },
      {
        "_type": "para",
        "title": "Top-level declarative data-linking",
        "text": "Top-level declarative data-linking\nUse:\n$.link(true, target, data);\n//or alternative syntax:\n$(target).link(true, data);\n\n… to activate any declarative data-link bindings (data-link=\"...\" expressions) on the target element, or on elements within its content.\nSee: Top-level declarative data-linking\n"
      },
      {
        "_type": "para",
        "title": "Top-level programmatic data-linking",
        "text": "Top-level programmatic data-linking\nUse:\n$.link(expression, target, data);\n//or alternative syntax:\n$(target).link(expression, data);\n\n… to bind a data-link expression on a target element.\nSee Top-level programmatic data-linking\n"
      }
    ]
  },
  "jsv.toplink-true": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "You can use data-linking not only for templated content, but also to data-bind to top-level HTML content in your page…\nThe $.link(true, ...) method is used to activate top-level declarative data-binding, which can provide dynamic data-driven UI even on non-templated content.\nSimply add declarative data-binding expressions to top-level elements, using data-link=\"...\", then call:\n$.link(true, target, data, helpers);\n\n– where target is a top-level HTML element or jQuery selector, such as \"#target\". This will activate data-binding on the target element and on any elements within its content.\nYou can also use the alternative syntax (jQuery instance method):\n$(target).link(true, data, helpers);\n\n"
      },
      {
        "_type": "para",
        "title": "Declarative data-link expressions",
        "text": "Declarative data-link expressions\nData-link expressions can be quite rich, such as the following examples taken from the sample below:\n<div data-link=\"css-color{:isCEO ? 'green' : 'black'}\">\n<div data-link=\"{for employees tmpl='nameTmpl'}\"></div>\n\nData-link expressions can also be used to instantiate and data-bind custom tag controls, such as the slider, in the second sample below:\n<div data-link=\"{slider size _range='min' _min=1 _max=200 width=400}\"></div>\n\n"
      },
      {
        "_type": "api",
        "title": "$.link(true, target, data, helpers)",
        "text": "$.link(true, target, data, helpers)\nActivate any data-link bindings on target element or its content elements, using data as context, and optionally passing in helpers\nActivate data-linking on target element and its content, using data as context, and passing in helpers\n\n$.link(true, \"#target\", myData, myHelpers);\n\n"
      },
      {
        "_type": "api",
        "title": "$(target).link(true, data, helpers) <span style=\"font-weight:normal;font-family:sans-serif\">(alternative syntax)</span>",
        "text": "$(target).link(true, data, helpers) (alternative syntax)\nActivate any data-link bindings on target element or its content elements, using data as context, and optionally passing in helpers\nActivate data-linking on target element and its content, using data as context, and passing in helpers\n\n$(\"#target\").link(true, myData, myHelpers);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example:\n"
      },
      {
        "_type": "sample",
        "title": "Top-level declarative data-linking",
        "text": "Top-level declarative data-linking\nTop-level content:\n<div id=\"group\">\n  <input type=\"checkbox\" />\n  ...\n\nAdd two-way data-linking to <input>s\n<input data-link=\"isCEO\" type=\"checkbox\" />...\n<input data-link=\"first trigger=true\" />...\n\nAdd data-linking to <div>s and <span>s etc.\n<div id=\"group\" data-link=\"css-color{:isCEO ? 'red' : 'blue'}\">...\n<div data-link=\"{for employees tmpl='nameTmpl'}\">...\n\nActivate, using $.link(true, ...)\n$.link(true, \"#group\", person, helpers);\n\n(Could have used alternative syntax: $(\"#group\").link(true, person, helpers);)\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is another example, taken from the slider control in the tag control samples, which uses top-level data-linking with data-link=\"{slider ...}\" to instantiate and data-bind a JsViews {{slider}} control.\n"
      },
      {
        "_type": "sample",
        "title": "Top-level data-link=\"{slider ...}\"",
        "url": "samples/tag-controls/slider/simple-toplevel/sample",
        "text": "Top-level data-link=\"{slider ...}\"\nSlider with initialized properties (top-level data-linking)\n<div data-link=\"{slider size _range='min' _min=1 max=200 _orientation='vertical' width=400}\"></div>\n\n\nData-linking to SVG content\n\n\n  \n  ...\n\n\nActivate data-linking \n\n$.link(true, \"body\", model);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Another interesting top-level data-linking sample is this version of the editable data samples.\n"
      },
      {
        "_type": "links",
        "title": "See also:"
      }
    ]
  },
  "jsv.toplink-expr": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "You can use data-linking not only for templated content, but also to data-bind to top-level HTML content in your page…\nThe $.link(expression, ...) method is used to programmatically add a data-link expression binding to a target element:\n$.link(dataLinkExpression, target, data, helpers);\n\nwhere dataLinkExpression can be any data-link expression that you might have used declaratively with data-link=\"myExpression...\", and target is the HTML element (or jQuery selector, such as \"#target\") that you want to data-bind.\nYou can also use the alternative syntax (jQuery instance method):\n$(target).link(dataLinkExpression, data, helpers);\n\n"
      },
      {
        "_type": "api",
        "title": "$.link(expression, target, data, helpers)",
        "text": "$.link(expression, target, data, helpers)\nApply data-link binding expression to target element, using data as context, and optionally passing in helpers\nActivate data-linking on target element, using provided expression, with data as context, and passing in helpers\n\n$.link(myExpression, \"#target\", myData, myHelpers);\n\n"
      },
      {
        "_type": "api",
        "title": "$(target).link(expression, data, helpers) <span style=\"font-weight:normal;font-family:sans-serif\">(alternative syntax)</span>",
        "text": "$(target).link(expression, data, helpers) (alternative syntax)\nApply data-link binding expression to target element, using data as context, and optionally passing in helpers\nActivate data-linking on target element, using provided expression, with data as context, and passing in helpers\n\n$(\"#target\").link(myExpression, myData, myHelpers);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example:\n"
      },
      {
        "_type": "sample",
        "title": "Top-level programmatic data-linking",
        "text": "Top-level programmatic data-linking\nApply data-link expression to <input>, for two-way binding to isCEO data property:\n$.link(\n  \"isCEO\", // expression\n  \"input.ceo\", // target\n  person // data\n);\n\nApply {for...} and visible:{:...} data-link binding expressions to #employees <div>:\n$.link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  \"#employees\", // target\n  person // data\n);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the same example, using the alternative syntax: $(target).link(expression, data, helpers);\n"
      },
      {
        "_type": "sample",
        "title": "Top-level programmatic data-linking <span style=\"font-style:normal;\">(alternative syntax)</span>",
        "text": "Top-level programmatic data-linking (alternative syntax)\nApply data-link expression to <input>, for two-way binding to isCEO data property:\n$(\"input.ceo\").link(\n  \"isCEO\", // expression\n  person // data\n);\n\nApply {for...} and visible:{:...} data-link binding expressions to #employees <div>:\n$(\"#employees\").link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  person // data\n);\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:"
      }
    ]
  },
  "twoway": {
    "sections": [
      {
        "_type": "para",
        "title": "Data-linked input",
        "text": "Data-linked input\nparagraph\n"
      },
      {
        "_type": "para",
        "title": "Data-linked textarea",
        "text": "Data-linked textarea\nparagraph\n"
      },
      {
        "_type": "para",
        "title": "Data-linked select",
        "text": "Data-linked select\nparagraph\n"
      },
      {
        "_type": "para",
        "title": "Data-linked content-editable elements",
        "text": "Data-linked content-editable elements\nparagraph\n"
      },
      {
        "_type": "para",
        "title": "Custom tags with two-way binding",
        "text": "Custom tags with two-way binding\nparagraph\n"
      }
    ]
  }
}