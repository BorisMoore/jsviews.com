var content = $.views.documentation.content;

content.find.jsvapi = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/jsvapi")) ||
{
  "jsvapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See JsViews Quickstart for an introductory overview.\n"
      },
      {
        "_type": "links",
        "title": "Topics:",
        "text": "Topics:\n"
      }
    ]
  },
  "jsvtags": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Any JsRender template can be used with JsViews. But in JsViews, templates are “data-linked” (think data-bound). Data-binding is optionally turned on within a data-linked template by data-linking individual tags and elements:\n"
      },
      {
        "_type": "para",
        "title": "JsViews: Using data-linked tags and elements",
        "text": "JsViews: Using data-linked tags and elements\nCalling the render() method works just the same within JsViews as it does if only JsRender is loaded. But alternatively you can use the link() method – which will first render and then add data binding (data-link the template).\nIf you have data-linked your template by calling the link() method, then you can continue to use the same JsRender template tags as before. But now you optionally make any tag in the template data-linked, by replacing the {{... of the opening tag by {^{..., as in:\n{^{for people}}\n  {^{:name}}\n{{/for}}\n\nIn addition, you can data-link the HTML elements in your template, as in:\n<input data-link=\"name\" />\n<div data-link=\"css-color{:color} {:name}\"></div>\n\nSee Data-linked template syntax for details…\n"
      },
      {
        "_type": "para",
        "title": "JsRender tags (with data-linking)",
        "text": "JsRender tags (with data-linking)\nThe following topics give examples and details for data-linking each of the built-in JsRender template tags:\nTags without content:\n\n{^{: ...}} (Evaluate)\n{^{> ...}} (HTML encode)\n\nBlock tags:\n\n{^{include ...}} (Template composition – partials)\n{^{for ...}} (Template composition, with iteration over arrays)\n{^{props ...}} (Iteration over properties of an object)\n{^{if ...}} (Conditional inclusion)\n{^{mytag ...}} (Custom tag controls)\n\nBlock tags (JsViews only):\n\n{^{radiogroup ...}} (Radio button group)\n{^{checkboxgroup ...}} (Checkbox group)\n{^{on ...}} (Button, or event binding)\n\nAlternative content blocks:\n\n{{else ...}} (Content block separator)\n\nCreating your own tags (custom tag controls):\n\nCustom tags\n\n"
      },
      {
        "_type": "para",
        "title": "In JsViews your template must be well-formed:",
        "text": "In JsViews your template must be well-formed:\nJsViews imposes some ‘well-formed’ constraints on templates which do not apply if you are only using JsRender. This is because JsRender is string-based, and is not ‘aware’ of the HTML structure, whereas JsViews is ‘HTML-aware’ in order to provide element-based data-binding’\nIn JsRender you have a lot of freedom. You can even do this:\n"
      },
      {
        "_type": "sample",
        "title": "Badly-formed template &ndash; but OK in JsRender!",
        "text": "Badly-formed template – but OK in JsRender!\n\n\n\n  <tr>\n    <td \n      {{if lastName}}\n        >{{:firstName}}</td><td>{{:lastName}}\n      {{else}}\n        colspan=\"2\">{{:firstName}}\n      {{/if}}\n    </td>\n  </tr>\n\nvar myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n  {\n    firstName: \"Jeff\"\n  },\n  {\n    firstName: \"Xavier\",\n    lastName: \"Prieto\"\n  }\n];\n\nvar html = myTemplate.render(people);\n\n$(\"#peopleList\").html(html);\n\n{{if}} tag blocks wrap part of an HTML <td> tag\n\n{{:firstName}}{{:lastName}}\n  {{else}}\n    colspan=\"2\">{{:firstName}}\n  {{/if}}\n\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "That works because JsRender (using pure string-based rendering) doesn’t mind how you mix your JsRender tag hierarchy with the HTML tag markup.\n"
      },
      {
        "_type": "para",
        "title": "Rules for a well-formed template in JsViews:",
        "text": "Rules for a well-formed template in JsViews:\nWith JsViews, it is different. Here are the rules of what is valid, or invalid, within a JsViews template:\n\nJsRender template tags which are outside HTML elements, or fully within the element content of an HTML element can remain unchanged in a JsViews template. They will work correctly. They can optionally be data-linked by simply adding a ^ character (so that for example a {{for}} tag becomes a data-linked {^{for}} tag) – and in that case the rendered content will change dynamically whenever the bound data changes ‘observably’.\nBut tags which are within the markup of the actual HTML opening tag itself, whether placed between attributes, or spanning attributes, or within the attribute content (the text value of the attribute), will not be valid in a JsViews template.\nSimilarly, tags which wrap opening or closing tag in such a way as to produce ‘mal-formed HTML’ will not be valid.\nIn fact a valid JsViews template will have the tree hierarchy of nested HTML tags and nested template tags combining together, as it were, as a single well-formed tree.\nIn each of the invalid scenarios mentioned above, the JsRender tags needs to be replaced by corresponding data-linked element syntax. See Data-linked template syntax for details.\n\n"
      }
    ]
  },
  "jsvlinktmpl": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The link(container, data, helpersOrContext) method is similar to the render(data, helpersOrContext) method, but in addition to rendering the template, it also inserts the rendered output as content of the target HTML container element, and then data-links (data-binds to observable data) the HTML content to the underlying data.\nThe link(container, data, helpersOrContext) method takes as parameters the target HTML container element (or jQuery selector), the data (used as the ‘data context’ during the rendering and linking), and optionally additional metadata or contextual helpers. It returns a jQuery object corresponding to the container element.\nThere are two ways of calling the link() method:\n\nIf you have a reference to the template object – myTmpl, call myTmpl.link(…)\nIf you have registered the template by name – \"myTmpl\", call $.link.myTmpl(…)\n\n"
      },
      {
        "_type": "links",
        "title": "Links:",
        "text": "Links:\n"
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
        "text": "template.link(object):\n\n\n\n  <tr>\n    <td>{^{>name}}</td>\n    <td><input data-link=\"name\" /></td>\n  </tr>\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar html = myTmpl.link(\"#person\", person);\n\n<td>{^{>name}}</td>\n<td><input data-link=\"name\" /></td>\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nmyTmpl.link(\"#person\", person);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing an array to the link() method.\n— The template is rendered once for each item in the array:\n"
      },
      {
        "_type": "sample",
        "title": "template.link(array):",
        "text": "template.link(array):\nAdd person\n\n\n\n\n  <tr>\n    <td>{^{>name}}</td>\n    <td><input data-link=\"name\" /></td>\n  </tr>\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nmyTmpl.link(\"#peopleList\", people);\n\n$(\"#add\").on(\"click\", function() {\n  $.observable(people).insert({\n    name: \"name\"\n  });\n});\n\nmyTmpl.link(\"#peopleList\", people);\n\n\n"
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
        "text": "You can pass in any JavaScript type (object, string, number, function…) as helpers on the helpersOrContext object, and use them as metadata, or as helper functions for formatting etc.\nNote: By passing in helpers in this way, you are making them specific to this link() call. Alternatively, you can declare helpers globally, – and you can also declare helpers that are private to a specific template. See Registering helpers: $.views.helpers() for details…\nWithin the template, helpers (whether global, or passed in to the link() method) are accessed by helper paths: ~keyName....\nFor example you might pass in an object with some utility functions:\nvar myHelpers = {\n  util: {\n    split: function(val, part) {...},\n    ...\n  },\n  ...\n};\n\nmyTmpl.link(\"#container\", myData, myHelpers);\n\n– and access them in the template using a helper path such as:\n{^{:~util.split(fullName, 0)}}\n\nor\n<span data-link=\"~util.split(fullName, 0)\"></span>\n\nSee Registering helpers\n"
      },
      {
        "_type": "sample",
        "title": "template.link(object, myHelpers):",
        "text": "template.link(object, myHelpers):\n\n\n\n  <tr>\n    <td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n    <td><input data-link=\"name\" /></td>\n    <td><input data-link=\"~color\" /></td>\n  </tr>\n\nfunction toUpper(val) { return val.toUpperCase(); }\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nmyTmpl.link(\"#person\", person, myHelpers);\nCode:\nfunction toUpper(val) {...}\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nmyTmpl.link(\"#person\", person, myHelpers);\n\nTemplate:\n<td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n...\n<td><input data-link=\"~color\" /></td>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Passing an array to link(), but without iteration.",
        "text": "Passing an array to link(), but without iteration.\nWhen rendering and linking an array, an additional optional boolean parameter, true, can be passed to the link() method, in order to prevent iteration.\n"
      },
      {
        "_type": "api",
        "title": "template.link(container, data, helpersOrContext, noIteration)",
        "text": "template.link(container, data, helpersOrContext, noIteration)\nRender and link template against data, under a container element, along with helpers/context. Determine iteration behavior for arrays\nRender and link template against data (as content of container element) and pass in helpers. Determine iteration behavior for arrays\n\nmyTmpl.link(\"#container\", data, helpers, true);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "By passing in true as the fourth ‘noIteration’ parameter, (or as third parameter if no helpersOrContext are passed), the template renders just once, with the array itself as current data, rather than rendering once for each item in the array.\nWithin the template, {^{for}} (or equivalently {^{for #data}}) can be used to iterate over the array, as in the following example:\n"
      },
      {
        "_type": "sample",
        "title": "template.link(container, array, helpers, noIteration):",
        "text": "template.link(container, array, helpers, noIteration):\nAdd person\n\n\n\n\n  <table>\n    <thead><tr><th colspan=\"2\">\n      {^{:#data.length}} people\n    </th></tr></thead>\n    <tbody>\n      {^{for}}\n        <tr>\n          <td>{^{>name}}</td><td><input data-link=\"name\" /></td>\n        </tr>\n      {{/for}}\n    </tbody>\n  </table>\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nmyTmpl.link(\"#peopleList\", people, true); // helpersOrContext not passed (so undefined), and noIteration set to true\n\n$(\"#add\").on(\"click\", function() {\n  $.observable(people).insert({\n    name: \"name\"\n  });\n});\n\nCode:\nmyTmpl.link(\"#peopleList\", people, true); // helpersOrContext not passed (so undefined), and noIteration set to true\n\nTemplate:\n<table>\n  <thead><tr><th colspan=\"2\">\n    {^{:#data.length}} people\n  </th></tr></thead>\n  <tbody>\n    {^{for}}\n      <tr>\n        <td>{^{>name}}</td><td><input data-link=\"name\" /></td>\n      </tr>\n    {{/for}}\n  </tbody>\n</table>\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "d.render": {
    "sections": [
      {
        "_type": "para",
        "title": "$.render.myTmpl()",
        "text": "$.render.myTmpl()\nIf a template has been registered as a named template:\n$.templates(\"myTmpl\", \"#personTmpl\");\n\nor\n$.templates(\"myTmpl\", \"some markup string\");\n\n…then you can call the render() method of the template without needing to hold on to the compiled template object returned from $.templates(...).\nJust call $.render.myTmpl(...), or $.render[\"myTmpl\"](...)\n(Note: there is also an alternative syntax for rendering a named template: $.templates.myTmpl(...);)\n"
      },
      {
        "_type": "api",
        "title": "$.render.myTmpl(data, helpersOrContext)",
        "text": "$.render.myTmpl(data, helpersOrContext)\nRender a named template against data, along with helper objects or context, and return a string\nRender template against data, and pass in helpers\n\nvar html = $.render.myTmpl(myData, myHelpers);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example:\n"
      },
      {
        "_type": "sample",
        "title": "$.render.personTmpl(...):",
        "text": "$.render.personTmpl(...):\n\n\n\n  <tr>\n    <td style=\"color:{{:~color}};\">\n      {{:~format(name)}}\n    </td>\n  </tr>\n\nfunction toUpper(val) { return val.toUpperCase(); }\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nvar html = $.render.personTmpl(person, myHelpers);\n\n$(\"#person\").html(html);\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar html = $.render.personTmpl(person);\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
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
        "title": "$.link.myTmpl(container, data, helpersOrContext, noIteration)",
        "text": "$.link.myTmpl(container, data, helpersOrContext, noIteration)\nRender and link a named template against data, under a container element. (Optionally provide helpers/context and specify iteration behavior for arrays)\nRender and link template against data as content of a container element. Optionally pass in helpers and specify iteration behavior for arrays\n\n$.link.myTmpl(\"#container\", myData, myHelpers, true);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is an example:\n"
      },
      {
        "_type": "sample",
        "title": "$.link.personTmpl(...):",
        "text": "$.link.personTmpl(...):\n\n\n\n  <tr>\n    <td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n    <td><input data-link=\"name\" /></td>\n    <td><input data-link=\"~color\" /></td>\n  </tr>\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nfunction toUpper(val) { return val.toUpperCase(); }\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\n$.link.personTmpl(\"#person\", person, myHelpers);\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\n$.link.personTmpl(\"#person\", person, myHelpers);\n\n<td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n...\n<td><input data-link=\"~color\" /></td>\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "jsvunlink": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The $.unlink(...) API is used for programmatically removing previously registered views and data-link bindings on a target HTML element and its content:\n$.unlink(selectorOrElement); // Unregister views and data-binding on container element and content\n\nor equivalently:\n$(selectorOrElement).unlink(); // Unregister views and data-binding on container element and content\n\nCalling $.unlink() without arguments will remove views and data-bindings from all HTML content:\n$.unlink(); // Unregister all views and data-binding\n\n"
      },
      {
        "_type": "para",
        "title": "Scenarios for calling $.unlink()",
        "text": "Scenarios for calling $.unlink()\nIn many scenarios, JsViews will automatically remove views and handlers when appropriate, so specific use of $.unlink() is rarely necessary.\nIn fact, the APIs for data-linking a template:\n\nmyTmpl.link(container, data, helpers)\n$.link.myTmpl(container, data, helpers)\n\nwill generally:\n\nrender the template as new HTML content within the container element\nregister a corresponding view hierarchy\nattach appropriate data-binding event handlers on the new content\n\nIf the new HTML content is later removed from the DOM, JsViews will automatically unregister those views and handlers.\nSimilarly, calling the myTmpl.link(...) or $.link.myTmpl(...) a second time will automatically unregister the previous views and handlers before establishing new ones.\nHowever, the top-level data-linking APIs:\n\n$.link(true, targetElem, data, helpers)\n$.link(expression, targetElem, data, helpers)\n\nwill, if called multiple times, add multiple data-bindings to the same target element. In this scenario, calling $.unlink(targetElem) can be useful for removing previous bindings…\n"
      }
    ]
  },
  "$view": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Each instance of a rendered template or a template block tag is associated with a JsViews “view” object.\nOne of the features provided by JsViews data-linking (when you use the JsViews .link() method rather than JsRender’s .render() method) is the $.view(elem) method. This method provides a reverse mapping and lets you get from a rendered DOM element back to the corresponding view object in the view hierarchy. From the view you can get to the underlying data, the index, etc.\nSo in effect in JsViews, the mapping from the view hierarchy to the UI becomes a two-way mapping…\n"
      },
      {
        "_type": "links",
        "title": "See:",
        "text": "See:\n"
      },
      {
        "_type": "para",
        "title": "Technical note on how JsViews establishes two-way data binding:",
        "text": "Technical note on how JsViews establishes two-way data binding:\nJsViews data-linking means that observable changes to the bound data automatically trigger dynamic updates to the rendered HTML.\nSuppose for example we have this template:\n<ul>\n  {^{for people}}\n    <li><input data-link=\"name\"/> Name: {^{:name}}</li>\n  {{/for}}\n</ul>\n\nIf name changes observably, then the name value in both the <input/> and the text content (Name: XXX) will update to the new value. Similarly, adding or removing a person item from the people array will cause an <li> element to be added or removed.\nTo achieve this, JsViews link() method includes meta-data tokens in the rendered HTML, which it then uses as locators to ensure that content is updated at the correct places in the HTML.\nThe meta-data does not affect visual rendering in any way, and consists essentially of data-jsv attributes on some HTML elements, as well as some inserted script tags of type: jsv... when locators are needed within text content.\nIn the case of the above template, the HTML markup will be similar to the following:\n<ul>\n  <li data-jsv=\"...\">\n    <input data-link=\"name\"> Name: <script type=\"jsv...\"></script>Jo Blow<script type=\"jsv...\"></script>\n  </li>\n</ul>\n\n"
      }
    ]
  },
  "jsv.d.view": {
    "sections": [
      {
        "_type": "para",
        "title": "var view = $.view(elem);",
        "text": "var view = $.view(elem);\nEach instance of a rendered template or a template block tag is associated with a JsViews \"view\" object.\nViews provide information on how the underlying data objects map to the rendered UI.\nFrom UI back to data:\nUse $.view(elemOrSelector) to get from a DOM element to the corresponding view object (the ‘containing’ view) for that part of the rendered content.\nFrom the view you can get to the underlying data, the index, etc.\n"
      },
      {
        "_type": "sample",
        "title": "Getting to the data: $.view(elem)",
        "text": "Getting to the data: $.view(elem)\n\n\n\n  {^{for people}}\n    <tr>\n      <td>{^{:name}}</td>\n      <td>\n        <button class=\"changeBtn\">Change</button>\n      </td>\n    </tr>\n  {{/for}}\n\nvar myTemplate = $.templates(\"#peopleTmpl\");\n\nvar app = {\n    people: [{name: \"Adriana\"}, {name: \"Robert\"}]\n  };\n\nmyTemplate.link(\"#peopleList\", app);\n\n$(\".changeBtn\").on(\"click\", function() {\n  // From the clicked HTML element ('this'), get the view object\n  var view = $.view(this);\n\n  // The 'person' data object for clicked button\n  var person = view.data;\n\n  // The index of this 'item view'. (Equals index of person in people array)\n  var index = view.index;\n\n  // Change the person.name\n  $.observable(person).setProperty(\"name\", person.name + \" \" + index);\n});\n{^{for people}}\n  ...\n  <button class=\"changeBtn\">Change</button>\n  ...\n{{/for}}\n\nClick-handler code for Change button:\n$(\".changeBtn\").on(\"click\", function() {\n  var view = $.view(this); // From the clicked HTML element ('this'), get the view object\n  var person = view.data;  // The 'person' data object for clicked button\n  var index = view.index;  // The index of this 'item view'. (Equals index of person in people array)\n  $.observable(person).setProperty(\"name\", person.name + \" \" + index); // Change the person.name\n});\n\n\n"
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
        "text": "Alternative syntax:\nIf you already have a jQuery object $(elementOrSelector), then it can be convenient to use the following alternative syntax:\nvar view = $(elementOrSelector).view();\n\nThis can be helpful in some scenarios, for example if you want to call another jQuery method on the same target element or selector, before getting the view. You can even chain the calls as in: var view = $(elementOrSelector).doSomething().view();\n"
      },
      {
        "_type": "api",
        "title": "$(elementOrSelector).view()",
        "text": "$(elementOrSelector).view()\nFrom an HTML element or a jQuery selector, get the corresponding contextual view object within the view hierarchy  \nGet the contextual view object for an HTML element, or selector\n\nvar view = $(\"#myElement\").view();\n\n"
      },
      {
        "_type": "para",
        "title": "Finding the parent view of a given type",
        "text": "Finding the parent view of a given type\nBy passing an additional type parameter, you can find the nearest containing view of the specified type:\nvar typeView = $.view(elementOrSelector, type);\n\n– or, in the alternative syntax above:\nvar typeView = $(elementOrSelector).view(type);\n\nThe above code steps up through the containing views for the element or selector, and returns the first ancestor view of type type.\nNote: The above are equivalent to var typeView = $.view(elementOrSelector).get(type).\n"
      },
      {
        "_type": "para",
        "title": "Getting inner views",
        "text": "Getting inner views\nAn additional signature is available (for advanced scenarios):\nvar typeView = $.view(elementOrSelector, true, type);\n\n– which takes the content of the element or (or the element obtained from the selector), and steps down through descendant views (depth first traversal). It returns the first descendant view, or if the type parameter is specified, the first descendant view of type type.\nSimilarly, in the alternative syntax:\nvar typeView = $(elementOrSelector).view(true, type);\n\nNote: The above are equivalent to var typeView = $.view(elementOrSelector).get(true, type).\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
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
        "title": "",
        "text": ""
      }
    ]
  },
  "jsvconverters": {
    "sections": []
  },
  "jsvtemplatetags": {
    "sections": []
  },
  "jsvhelpers": {
    "sections": []
  },
  "jsvobjects": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "jsvviewsobject": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The $.views object provides access to APIs for creating templates, tags, helpers etc.\n\n$.views.templates(...) – available also as $.templates(...)\nUsed for defining templates – see: Registering templates\n$.views.tags(...)\nUsed for defining custom tags – see: Registering custom tags and JsViews: Custom Tags - Tag Controls\n$.views.converters(...)\nUsed for defining converters – see: Registering converters and JsViews: Helpers and converters\n$.views.helpers(...)\nUsed for defining helpers – see: Registering helpers and JsViews: Helpers and converters\n$.views.viewModels(...)\nUsed for defining View Models – see: Compiled View Models and  JsViews: Compiled View Models\n\nIt also provides access to:\n\n$.views.settings\nUsed for modifying JsViews settings and options – see: Settings\n$.views.map(...)\nUsed for defining custom maps (advanced)\n$.views.jsviews\nProvides the version number of the currently loaded JsViews or JsRender library\n\n"
      }
    ]
  },
  "jsvtemplateobject": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The $.templates() API can be used to obtain a compiled template object:\nvar myTmpl = $.templates(\"#personTmpl\");\n\nThe compiled template object (myTmpl, in the example) provides a number of properties and methods, in particular:\n"
      },
      {
        "_type": "para",
        "title": "The render() method",
        "text": "The render() method\nvar html = myTmpl.render(person);\n\nSee Render a template against data objects or arrays\n"
      },
      {
        "_type": "para",
        "title": "The link() method",
        "text": "The link() method\nmyTmpl.link(\"#peopleList\", people);\n\nSee Render and data-link a template against data objects or arrays\n"
      },
      {
        "_type": "para",
        "title": "The markup property",
        "text": "The markup property\nThe declarative markup string for the template (available whether the template was registered by providing a markup string, or by a script block reference).\nvar test = myTmpl.markup; // \"...{^{:name}} ... <input data-link='name'/>...\"\n\n"
      }
    ]
  },
  "jsvviewobject": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "When using JsViews (i.e. with the .link() method rather than JsRender’s .render() method) the view hierarchy is the same.\n"
      },
      {
        "_type": "para",
        "title": "A <b>view object</b> has the following properties and methods:",
        "text": "A view object has the following properties and methods:\nJsViews – programmatic access only\nThe following methods are available only for programmatic access when using JsViews:\n\nrefresh() method\ncontents() method\nchildTags() method\nnodes() method\nctxPrm() get/set method\n\nBoth JsRender and JsViews (see JsRender view object)\nThe following properties and methods are available when using either JsRender or JsViews (both for programmatic access and declaratively in templates):\n\ntype property\ndata property\nparent property\nindex property\ngetIndex() method\nget(type) method\ncontent property\nroot property\nother properties and methods – tmpl, views, ctx, tag, getRsc()\n\n"
      },
      {
        "_type": "para",
        "title": "Accessing view objects",
        "text": "Accessing view objects\nThe view object can be accessed programmatically in many contexts, such as:\n\nin a click handler (with JsViews) – using $.view(this) to return the view for a given HTML element (this)\nin a helper function, ~myHelper() – where the this pointer is the current view\nin any method of a custom tag – using this.tagCtx.view\n\nIn addition, properties and methods that are available to both JsRender and JsViews (second list above) can also be accessed declaratively in a template using view paths – such as #parent for the view.parent property.\n\nProperties and methods:\n"
      },
      {
        "_type": "para",
        "title": "The refresh() method",
        "text": "The refresh() method\nview.refresh(): refreshes the view, by re-rendering its content.\nThis can be used to update content using modified data or updated helpers.\nIt can be useful for refreshing a view (template block) which renders data without data-linking: {{:model.year}} (or even with data-linking, {^{:model.year}} – if the data has been modified ‘non-observably’, as in: model.year++;).\nview.refresh(); // Refresh the view, using current data values and helpers\n\n"
      },
      {
        "_type": "sample",
        "title": "view.refresh()",
        "text": "view.refresh()\ntable td {padding: 5px;} table {margin-top: 6px;} #incrBtn {margin-bottom: 10px;}\n\n\n\n\n  <button id=\"incrBtn\">Increment year</button>\n  <button id=\"incrObsBtn\">Increment observably</button>\n  <button id=\"incrRefreshBtn\">Increment and refresh</button>\n  <button class=\"refreshBtn\">Refresh All</button><br/>\n  Year: {^{>year}}<br/>\n\n  <table><tbody>\n    {{for people}}\n      <tr>\n        <td><input data-link=\"name\" /></td>\n        <td>Name: {{>name}}</td>  {{!-- no data-linking --}}\n        <td>Age in {{>~root.year}}: {{>age + ~root.year - 2016}} </td>\n        <td><button class=\"refreshBtn\">Refresh</button></td>\n      </tr>\n    {{/for}}\n  </tbody></table>\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n\nvar model = {\n  year: 2016,\n  people: [{name: \"Adriana\", age: 4}, {name: \"Robert\", age: 34}]\n};\n\ntmpl.link(\"#peopleList\", model)\n  .on(\"click\", \"#incrBtn\", function() {\n    model.year++; // non-observable change\n  })\n  .on(\"click\", \"#incrObsBtn\", function() {\n    $.observable(model).setProperty(\"year\", model.year + 1);\n  })\n  .on(\"click\", \"#incrRefreshBtn\", function() {\n    model.year++; // non-observable change\n    $.view(this).refresh();\n  })\n  .on(\"click\", \".refreshBtn\", function() {\n    $.view(this).refresh();\n  });\nTemplate: (No data-linking except <input data-link=\"name\" />)\n{{for people}}\n  ...\n  <input data-link=\"name\" />\n  ...\n  {{>name}} ... {{>~root.year}} ... {{>age + ~root.year - 2016}}\n  ...\n  <button class=\"refreshBtn\">Refresh</button>\n{{/for}}\n\nCode:\n.on(\"click\", \"#incrBtn\", function() {\n  model.year++; // non-observable change\n})\n.on(\"click\", \".refreshBtn\", function() {\n  $.view(this).refresh(); // Refresh view, with updated values...\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "The contents() method",
        "text": "The contents() method\nview.contents(…): returns a jQuery object of view content nodes – optionally filtered by a jQuery selector.\nvar jqMyClassElem = view.contents(true, \".myClass\");\n// jQuery object for element with 'myClass' at any depth within view\n\n"
      },
      {
        "_type": "api",
        "title": "view.contents(...)",
        "text": "view.contents(...)\nGet a jQuery object for the contents of the view (top-level child nodes – including text nodes)\n\nvar jqContents = view.contents();\njqContents.css(\"color\", \"red\");\n\nGet a jQuery object for the top-level contents of the view, filtered by the jQuery selector\n\nvar jqContents = view.contents(\".toRed\");\njqContents.css(\"color\", \"red\");\n\nGet a jQuery object for the contents of the view: child and descendant nodes (not including text nodes), optionally filtered by the selector\n\nvar jqContents = view.contents(true, \".toRed\");\njqContents.css(\"color\", \"red\");\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following example uses view.contents() to find the \".nameId\" within the view, and set its background color:\n"
      },
      {
        "_type": "sample",
        "title": "view.contents()",
        "text": "view.contents()\n.nameTd {width: 60px; padding: 0 6px;} table {width: 230px;} button {margin: 4px;}\n\n\n\n\n  <button id=\"addBtn\">Add</button>\n  <table><tbody>\n    {^{for people}}\n      <tr>\n        <td class=\"nameTd\">{^{:name}}</td>\n        <td>\n          <button class=\"orange\">orange</button>\n          <button class=\"yellow\">yellow</button>\n        </td>\n      </tr>\n    {{/for}}\n  </tbody></table>\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n\nvar model = {\n  people: [{name: \"Adriana\"}, {name: \"Robert\"}]\n};\n\ntmpl.link(\"#peopleList\", model)\n  .on(\"click\", \"#addBtn\", function() {\n    var view = $.view(this);           // \"data\" view\n    var data = view.data;              // model\n    $.observable(data.people).insert({name: \"name\"});\n  })\n  .on(\"click\", \".orange, .yellow\", function() {\n    var view = $.view(this);           // \"item\" view\n\n    // Get jQuery object for \".nameTd\" in this view:\n    var jqNameTd = view.contents(true, \".nameTd\");\n\n    // Set background color\n    jqNameTd.css(\"backgroundColor\", this.className);\n  });\n// Get jQuery object for \".nameTd\" in this view:\nvar jqNameTd = view.contents(true, \".nameTd\");\n\n// Set background color\njqNameTd.css(\"backgroundColor\", this.className);\n\n\n"
      },
      {
        "_type": "para",
        "title": "The childTags() method",
        "text": "The childTags() method\nview.childTags(…): returns an array of custom tag instances within the view – optionally filtered by tag name.\nvar mytagsArray = view.childTags(true, \"mytag\"); // {{mytag}} instances within view (at any depth)\n\n"
      },
      {
        "_type": "api",
        "title": "view.childTags(...)",
        "text": "view.childTags(...)\nGet top-level custom tag instances within the view\n\nvar tagsArray = view.childTags();\nvar firstTagName = tagsArray[0].tagName;\n\nGet instances of {{tagName}} in view (not nested in other custom tags)\n\nvar sliders = view.childTags(\"slider\");\nsliders[0].updateValue(25);\n\nGet instances of {{tagName}} in view (including those nested in other custom tags)\n\nvar sliders = view.childTags(true, \"slider\");\nsliders[0].updateValue(25);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that view.childTags() looks only for custom tags. (In fact it searches for tags which do not have the flow property set to true. All built-in tags such as {{for}} and {{if}} have the setting flow: true, so are ignored by childTags(). However even ‘flow tags’ will be returned if searched for by name, as in: view.childTags(\"if\").)\nThe following sample looks for {{textbox}} tags (in the case data-link=\"{textbox ...}\") and calls a method on each.\n"
      },
      {
        "_type": "sample",
        "title": "view.childTags()",
        "text": "view.childTags()\n#toggleBtn {margin-bottom: 14px;} .person {line-height: 26px;}\n\n\n\n  <button id=\"toggleBtn\">Toggle Edit</button>\n\n  {^{for people}}\n    {{!--data-link to {{textbox}} tag --}}\n    <div class=\"person\" data-link=\"{textbox path=name/}\"></div> \n  {{/for}}\n\n// Define a {{textbox}} tag - which allows editing, and has a toggleEdit() method\n$.views.tags({\n  textbox: {\n    init: function() {\n      var path = this.tagCtx.params.props.path;\n\n      this.template = \" \"   // Checkbox to toggle edit\n      + \"\"       //  for editing\n      + \"\"; //  for rendering\n    },\n    toggleEdit: function() {\n      $.observable(this).setProperty(\"edit\", !this.edit);\n    }\n  }\n});\n\nvar tmpl = $.templates(\"#peopleTmpl\");\nvar model = {\n    people: [{name: \"Adriana\"}, {name: \"Robert\"}]\n  };\n\ntmpl.link(\"#peopleList\", model)\n  .on(\"click\", \"#toggleBtn\", function() {\n    var textBoxes = $.view(this).childTags(\"textbox\"); // Find all the {{textbox}} tags in the view\n    for (var i=0; i{^{for people}}\n  {{!--data-link to {{textbox}} tag --}}\n  <div class=\"person\" data-link=\"{textbox path=name/}\"></div> \n{{/for}}\n\n.on(\"click\", \"#toggleBtn\", function() {\n  var textBoxes = $.view(this).childTags(\"textbox\"); // Find all the {{textbox}} tags in the view\n  for (var i=0; i<textBoxes.length; i++) {\n    textBoxes[i].toggleEdit();                       // Toggle the edit mode for each of them\n  }\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "The nodes() method",
        "text": "The nodes() method\nview.nodes(): returns an array of top-level nodes within the view (including text nodes).\nvar nodesArray = view.nodes();\n\n"
      },
      {
        "_type": "sample",
        "title": "view.nodes()",
        "text": "view.nodes()\n.nameTd {width: 60px; padding: 0 6px;} table {width: 156px;} button {margin: 4px;}\n\n\n\n\n  <button id=\"addBtn\">Add</button>\n  <table><tbody>\n    {^{for people}}\n      <tr>\n        <td class=\"nameTd\">{^{:name}}</td>\n      </tr>\n      <tr>\n        <td>\n          <button class=\"orange\">orange</button>\n          <button class=\"yellow\">yellow</button>\n        </td>\n      </tr>\n    {{/for}}\n  </tbody></table>\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n\nvar model = {\n  people: [{name: \"Adriana\"}, {name: \"Robert\"}]\n};\n\ntmpl.link(\"#peopleList\", model)\n  .on(\"click\", \"#addBtn\", function() {\n    var view = $.view(this);           // \"data\" view\n    var data = view.data;              // model\n    $.observable(data.people).insert({name: \"name\"});\n  })\n  .on(\"click\", \".orange, .yellow\", function() {\n    var view = $.view(this);           // \"item\" view\n\n    // Get top-level nodes in this view - two  nodes:\n    var nodes = view.nodes();\n\n    // Set colors\n    nodes[0].style.color = this.className;\n    nodes[0].style.backgroundColor = \"darkblue\";\n    nodes[1].style.backgroundColor = this.className;\n  });\n.on(\"click\", \".orange, .yellow\", function() {\n  var view = $.view(this);           // \"item\" view\n\n  // Get top-level nodes in this view - two <tr> nodes:\n  var nodes = view.nodes();\n\n  // Set colors\n  nodes[0].style.color = this.className;\n  nodes[0].style.backgroundColor = \"darkblue\";\n  nodes[1].style.backgroundColor = this.className;\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "The ctxPrm() get/set method:",
        "text": "The ctxPrm() get/set method:\nview.ctxPrm(name): returns the value of the named contextual parameter or helper (at the context of the view).\nvar value = view.ctxPrm(\"color\");\n// Get value of contextual parameter (or helper) \"color\"\n\nview.ctxPrm(name, newValue): observably modifies the value of the named contextual parameter or helper.\nview.ctxPrm(\"color\", \"green\");\n// Set value of contextual parameter (or helper) \"color\" to \"green\"\n\nAvailable also as tag.ctxPrm().\nSee Accessing contextual parameters and helpers.\nNote: to register a listener for observable changes to a contextual parameter, such as \"~color\", defined on a view, use:\n$.observe(view, \"~color\", myListener);\n\n(Similarly on a tag, as in the linkedCtxParam sample – with the listener for \"~mde\".)\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n  {^{on ~set \"green\"}}set ~color to green{{/on}}\n  {^{on ~set \"red\"}}set ~color to red{{/on}}\n  {^{on ~get}}get ~color{{/on}}\n  <span data-link=\"css-color{:~color} {:~color}\"></span>\n  <input data-link=\"~color\" />\n  ({^{>~color}})\n\n\nvar tmpl = $.templates(\"#tmpl\"),\n\n  model = {},\n\n  helpers = {\n    color: \"blue\",\n    set: function(newColor, ev, eventArgs) {\n      eventArgs.view.ctxPrm(\"color\", newColor); // Set contextual parameter: \"color\" to newColor\n    },\n    get: function(ev, eventArgs) {\n      alert(eventArgs.view.ctxPrm(\"color\")); // Get current contextual parameter \"color\"\n    }\n  };\n\ntmpl.link(\"#result\", model, helpers);\nTemplate:\n<span data-link=\"css-color{:~color}\">TEXT</span>\n<input data-link=\"~color\" />\n({^{>~color}})\n\nCode:\nset: function(newColor, ev, eventArgs) {\n  eventArgs.view.ctxPrm(\"color\", newColor); // Set contextual parameter: \"color\" to newColor \n},\nget: function(ev, eventArgs) {\n  alert(eventArgs.view.ctxPrm(\"color\")); // Get current contextual parameter \"color\"\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "view.ctxPrm() can be used to modify any contextual parameter or helper (~foo). In the above example, ~color is initialized as helper passed in the with the link() call.\nIn the case of a contextual parameter defined by a path expression, such as ~color=clr, using the setter view.ctxPrm(\"color\", \"newValue\") will update not only the contextual parameter but also the data value clr that it is bound to. (The path expression ~color=expr constitutes a two-way binding).\nThis is illustrated by the following sample:\n"
      },
      {
        "_type": "sample",
        "text": "div {margin: 10px 0;}\n\n\n\n\n  <label>clr:</label>\n  <div>\n    <span data-link=\"css-color{:clr} {:clr}\"></span>\n    <input data-link=\"clr\" />\n  </div>\n\n  {{for person ~color=clr}}\n    <label>~color:</label>\n    <div>\n      {^{on ~set \"green\"}}set ~color to green{{/on}}\n      {^{on ~set \"red\"}}set ~color to red{{/on}}\n      {^{on ~get}}get ~color{{/on}}\n      <span data-link=\"css-color{:~color} {:~color}\"></span>\n      <input data-link=\"~color\" />\n    </div>\n  {{/for}}\n\n\nvar tmpl = $.templates(\"#tmpl\"),\n\n  model = {clr: \"orange\", person: {name: \"Jo\"}},\n\n  helpers = {\n    set: function(newColor, ev, eventArgs) {\n      eventArgs.view.ctxPrm(\"color\", newColor); // Set contextual parameter: \"color\" to newColor\n    },\n    get: function(ev, eventArgs) {\n      alert(eventArgs.view.ctxPrm(\"color\")); // Get current contextual parameter \"color\"\n    }\n  };\n\ntmpl.link(\"#result\", model, helpers);\nmodel = {clr: \"orange\", person: {name: \"Jo\"}};\n\n...\n<input data-link=\"clr\" />\n\n...\n{{for person ~color=clr}}\n  ...\n  {^{on ~set \"red\"}}set ~color to red{{/on}}...\n  <input data-link=\"~color\" />...\n{{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Other view object properties and methods:",
        "text": "Other view object properties and methods:\nAdditional properties of the view object are used by JsRender and JsViews for processing templates:\n\ntmpl: the template used to render the view\nviews: the child views in the view hierarchy\nctx: object (hash) with the named contextual helpers/template parameters for this view\ntag: the \"sometag\" view rendered by a tag {{sometag ...}}, has a view.tag property – the instance of the sometag tag object\nlinked: boolean, value true in the case of data-linked views (from tmpl.link() rather than tmpl.render())\ngetRsc(namedCollection, itemName): returns a named resource (converter function, compiled template object, compiled tag, helper or viewModel), as available contextually in the scope of the view (i.e. global, or local as a template resource from one of the parent templates)The namedCollection parameter can be \"templates\", \"converters\", \"tags\", \"helpers\" or  \"viewModels\"). For example:\nvar upperCvtFunction = view.getRsc(\"converters\", \"upper\");\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "jsvtagobject": {
    "sections": [
      {
        "_type": "para",
        "title": "<b>Tag object</b> properties and event handlers provided as tag options",
        "text": "Tag object properties and event handlers provided as tag options\nThe following tag properties and event handlers can be specified as tag options when registering a custom tag:\nTag properties specified as tag options (both in JsRender and JsViews – see $.views.tags()):\n\nbaseTag\nflow\ntemplate\nbindTo\nctx\ncontentCtx\nargDefault\n\nTag properties specified as tag options (only in JsViews – see tag control options):\n\ndataBoundOnly\nboundProps\ndepends\nattr\nsetSize\nheight\nwidth\nclassName\nlinkedElement\nmainElement\ndisplayElement\nlinkedCtxParam\ndataMap\nlateRender\ntrigger\n\nEvent handlers specified as tag options (both in JsRender and JsViews – see $.views.tags()):\n\ninit()\nrender()\nconvert\n\nEvent handlers specified as tag options (only in JsViews – see tag control options):\n\nonBind()\nonAfterLink()\nonUpdate()\nonDispose()\nconvertBack\nonUnbind()\nonBeforeUpdateVal()\nonBeforeChange()\nonAfterChange()\nonArrayChange()\nsetValue()\ndomChange()\n\n"
      },
      {
        "_type": "para",
        "title": "Additional <b>tag object</b> properties and methods",
        "text": "Additional tag object properties and methods\nIn addition to the above properties and handlers set as tag options, the tag object has the following properties and methods:\nTag properties (both in JsRender and JsViews)\n\nparent\nparents\ntagCtx\ntagCtxs\ntagName\nrendering\n\nTag properties (only in JsViews)\n\nlinkCtx\nparentElem\nlinkedElems and linkedElem\nmainElem\ndisplayElem\ninline\n\nTag methods (both in JsRender and JsViews)\n\nctxPrm()\ncvtArgs()\nbndArgs()\nbase()\nbaseApply()\n\nTag methods (only in JsViews)\n\nrefresh()\ncontents()\nchildTags()\nnodes()\nsetValue()\nsetValues()\nupdateValue()\nupdateValues()\n\n"
      },
      {
        "_type": "para",
        "title": "Accessing tag objects",
        "text": "Accessing tag objects\nThe tag object can be accessed programmatically, for example in event handlers of custom tags, using the this pointer.\nThe current tag can also be accessed declaratively (in a custom tag template,  or in wrapped block content) using ~tag, as in:\n{{:~tag.parent.tagName}}`\n\nIn addition, tag.tagCtx can be accessed declaratively using ~tagCtx, as in:\n{{:~tagCtx.props.mode}}`\n\n"
      },
      {
        "_type": "para",
        "title": "<b>Tag properties</b> (JsRender and JsViews):",
        "text": "Tag properties (JsRender and JsViews):\n(See also the JsRender tag object topic.)\n"
      },
      {
        "_type": "para",
        "title": "The tagCtx property",
        "text": "The tagCtx property\ntag.tagCtx: a tag context object providing access to instance information such as arguments/properties/view etc., as in:\nvar propA = tag.tagCtx.props.propA;\n\nIt is also provided as an argument in tag events such as onBind(tagCtx, linkCtx, ctx).\nAccessed declaratively (in a tag template or wrapped content) as ~tagCtx.\nSee Tag Context\n"
      },
      {
        "_type": "para",
        "title": "The  ctx property",
        "text": "The  ctx property\ntag.ctx: a view context object (hash) providing access to the contextual parameters, as in.\nvar rootData = tag.tagCtx.root;\n\nIt is also provided as an argument in tag events such as onBind(tagCtx, linkCtx, ctx).\nAccessed declaratively as ~tag.ctx.\nSee Tag Context\nSee also:\n\ntag.ctxPrm(), below\nThe ctx tag option (for specifying default context on a custom tag)\n\n"
      },
      {
        "_type": "para",
        "title": "<b>Tag properties</b> (JsViews only):",
        "text": "Tag properties (JsViews only):\n"
      },
      {
        "_type": "para",
        "title": "The linkCtx property",
        "text": "The linkCtx property\nFor any data-linked tag, such as {^{mytag/}} (inline data-linked tag) , or <div data-link=\"{mytag}\"></div>(tag binding on a data-linked element), tag.linkCtx is a link context object providing contextual data-link information, as in:\nvar isTopLevelDataLinked = tag.linkCtx.type === \"top\";\n\nIt is also provided as an argument in tag events such as onBind(tagCtx, linkCtx, ctx)`.\n"
      },
      {
        "_type": "para",
        "title": "The parentElem property",
        "text": "The parentElem property\nFor a data-linked tag, such as {^{mytag/}}, tag.parentElem is the parent (containing) HTML element.\nFor a data-linked element such as <div data-link=\"{mytag}\"></div> (tag binding), whether in a template or with top-level data-linking, tag.parentElem is the data-linked element (the <div> in this case).\n"
      },
      {
        "_type": "para",
        "title": "The linkedElems and linkedElem properties",
        "text": "The linkedElems and linkedElem properties\nThe tag.linkedElems and tag.linkedElem properties are associated with the linkedElement option. (See the linkedElement design pattern topic.)\nIf the linkedElement option is used to establish two-way data binding between an element (or elements) in the tag, and the bindTo tag arguments or properties, then after data-linking (for example, in the onBind event handler of the tag) the tag.linkedElems property will contain an array of jQuery objects for those data-linked elements. And the tag.linkedElem property will contain a jQuery object for the first of those elements.\nConversely, if linkedElement is not set, then in the onBind handler the tag.linkedElems properties can be set to an array of jQuery objects for chosen tag elements. (Or, if bindTo specifies only one binding, then tag.linkedElem properties can be set to a single jQuery object for a chosen tag element.)\nThis provides a programmatic approach to configuring the choice of data-linked elements.\nFor example in the {{namebox}} sample\n{^{namebox first last caption=~label .../}}\n\nThe declarative approach:\nlinkedElement: [\".firstnm\", \".lastnm\", \".cptn\"]\n\ncould be replaced by a programmatic approach:\nnamebox: {\n  ...\n  template: '...<span class=\"cptn\"></span>: <input class=\"firstnm\"/> <input class=\"lastnm\"/>...',\n  bindTo: [0, 1, \"caption\"],\n  onBind: function() {\n    this.linkedElems = [\n      this.contents(true, \".firstnm\"); // Set linkedElem for argument 0 (first)\n      this.contents(true, \".lastnm\");  // Set linkedElem for argument 1 (last)\n      this.contents(true, \".cptn\");    // Set linkedElem for property \"caption\" (caption=~label)\n    ];\n  },\n  ...\n}\n\nNote:\n\nFor tags with {{else}} blocks see also tagCtx.linkedElems\nEstablishing of two-way binding on linkedElems is done after the onBind event, and before the onAfterLink event\n\n"
      },
      {
        "_type": "para",
        "title": "The mainElem property",
        "text": "The mainElem property\nThe tag.mainElem property is associated with the mainElement option.\nIf the mainElement option is used to establish an element in the tag as main element, then after data-linking (for example, in the onBind event handler of the tag) the tag.mainElem property will contain a jQuery object for the main element.\nConversely, if mainElement is not set, then in the onBind handler the tag.mainElem property can be set to a jQuery objects for a chosen tag element.\nThis provides a programmatic approach to configuring the choice of main element.\nNote:\n\nSetting of width, height or id on tag.mainElem is done after the onBind event, and before the onAfterLink event\nFor tags with {{else}} blocks see also tagCtx.mainElem\n\n"
      },
      {
        "_type": "para",
        "title": "The displayElem property",
        "text": "The displayElem property\nThe tag.displayElem property is associated with the displayElement option.\nIf the displayElement option is used to establish an element in the tag as display element, then after data-linking (for example, in the onBind event handler of the tag) the tag.displayElem property will contain a jQuery object for the display element.\nConversely, if displayElement is not set, then in the onBind handler the tag.displayElem property can be set to a jQuery objects for a chosen tag element.\nThis provides a programmatic approach to configuring the choice of display element.\nNote:\n\nSetting of class on the tag.displayElem is done after the onBind event, and before the onAfterLink event\nFor tags with {{else}} blocks see also tagCtx.displayElem\n\n"
      },
      {
        "_type": "para",
        "title": "The inline property",
        "text": "The inline property\nIf tag.inline is true, then this is a data-linked tag such as {^{mytag/}} (also referred to as an inline tag).\nIf tag.inline is false, then this is a tag binding on a data-linked element such as <div data-link=\"{mytag}\"></div> (whether in a template or with top-level data-linking).\nSee also tag.linkCtx.type\n"
      },
      {
        "_type": "para",
        "title": "<b>Tag methods</b> (JsRender and JsViews):",
        "text": "Tag methods (JsRender and JsViews):\n(See also the JsRender tag object topic.)\n"
      },
      {
        "_type": "para",
        "title": "The ctxPrm() get/set method",
        "text": "The ctxPrm() get/set method\ntag.ctxPrm(name): returns the value of the named contextual parameter or helper (at the context of the tag instance).\nvar value = tag.ctxPrm(\"color\");\n// Get value of contextual parameter (or helper) \"color\"\n\ntag.ctxPrm(name, newValue): observably modifies the value of the named contextual parameter or helper.\ntag.ctxPrm(\"color\", \"green\");\n// Set value of contextual parameter (or helper) \"color\" to \"green\"\n\nAvailable also as view.ctxPrm().\nSee Accessing contextual parameters and helpers.\nNote: to register a listener for observable changes to a contextual parameter, such as \"~color\", defined on a tag, use:\n$.observe(tag, \"~color\", myListener);\n\nSee for example the linkedCtxParam sample – with the listener for \"~mde\".\n"
      },
      {
        "_type": "para",
        "title": "<b>Tag methods</b> (JsViews only):",
        "text": "Tag methods (JsViews only):\n"
      },
      {
        "_type": "para",
        "title": "The refresh() method",
        "text": "The refresh() method\nThe tag.refresh() method refreshes (re-renders and data-links) the tag control.\nFor example, in the {{spinblock}} sample:\n\nthe render() method returns content which depends on the value of the tag.pane property\nthe custom tag method cycle() changes the value of tag.pane, then calls tag.refresh() to refresh the rendering and data-binding using the new value of tag.pane:\n\n$.views.tags(\"spinblock\", {\n  render: function() {\n    ...\n    if (this.tagCtx.index === this.pane) { // This is the selected pane.\n      ... + this.tagCtx.render(); // Render block content\n    }\n    ...\n  },\n  cycle: function() { // Method to cycle/increment selected pane\n    this.pane = (this.pane+1) % this.tagCtxs.length;\n    this.refresh();   // Refresh the rendering and data-binding, with the new value of this.pane\n  },\n  ...\n\n"
      },
      {
        "_type": "para",
        "title": "The contents() method",
        "text": "The contents() method\nReturns a jQuery object of tag content nodes – optionally filtered by a jQuery selector:\n\ntag.contents() (without arguments) returns the top-level contents of the tag (top-level child nodes, including text nodes):\nvar jqContents = tag.contents();\n\ntag.contents(selector) (with a selector argument) returns top-level content elements of the tag, filtered by the selector:\nvar jqSelectedElem = tag.contents(\".selected\");\n\ntag.contents(deep, selector) (with deep flag: true, and selector argument) returns content elements of the tag (any depth) filtered by the selector:\nvar jqContents = tag.contents(true, \".selected\");\n\n\nFor example, in the {{spinblock}} sample:\n$.views.tags(\"spinblock\", {\n  ...\n  onBind: function() {\n    // Find the switcher <div> element, and attach the tag.cycle() method to it, as 'click' handler\n    this.contents(true, '.switcher').on(\"click\", $.proxy(this.cycle, this));\n  },\n  ...\n\nSee the similar API view.contents(...)\n"
      },
      {
        "_type": "para",
        "title": "The childTags() method",
        "text": "The childTags() method\nReturns an array of custom tag instances, within the content of the tag – optionally filtered by tag name:\n\ntag.childTags() returns the top-level custom tag instances within the tag content:\nvar childTagsArray = tag.childTags();\n\ntag.childTags(tagName) returns instances of {{tagName}} within the tag content (not nested in other custom tags):\nvar slidersArray = tag.childTags(\"slider\");\n\ntag.childTags(deep, tagName) (with deep flag: true) returns instances of {{tagName}} within the tag content (including those nested in other custom tags):\nvar slidersArray = tag.childTags(true, \"slider\");\n\n\nFor example, in the {{picker}} sample:\n$.views.tags(\"picker\", {\n  ...\n  onBind: function() {\n    ...\n    tag.areaslider = tag.childTags(\"areaslider\")[0];\n  },\n  ...\n\nSee the similar API view.childTags(...)\n"
      },
      {
        "_type": "para",
        "title": "The nodes() method",
        "text": "The nodes() method\nThe tag.nodes() method returns an array of top-level nodes within the tag content (including text nodes):\nvar nodesArray = tag.nodes();\n\nSee the similar API view.nodes(...)\n"
      },
      {
        "_type": "para",
        "title": "The setValue() method",
        "text": "The setValue() method\nIf a custom tag control uses linked elements then calling tag.setValue(newValue, index) will set the value of the corresponding linked element. In addition, if the tag control has a setValue() event handler, then that event handler will be called.\nFor block tags, with multiple {{else}} blocks, the tagCtx.setValues() can be used (for the tagCtx corresponding to the {{else}} block) – or, alternatively a third parameter can be passed specifying the index of the {{else}} block whose linked element is to be updated:\ntag.setValue(newValue, index, elseBlock);\n\nNote: index and elseBlock each default to 0 – so tag.setValue(myval) is equivalent to tag.setValue(myval, 0, 0).\nSee the Programmatic two-way data-binding design patterns topic for additional discussion and examples.\nSee also setValues() below.\n"
      },
      {
        "_type": "para",
        "title": "The setValues() method",
        "text": "The setValues() method\nIf a custom tag control uses linked elements then calling tag.setValues(newVal1, newVal2, ...) will set the values of the linked elements. In addition, if the tag control has a setValue() event handler, then that event handler will be called prior to updating each targeted linked element.\ntag.setValues(newValueFor1stElem, newValueFor2ndElem, ...);\n\nFor block tags with multiple {{else}} blocks, setValues() will set values on the linked elements on the initial tag (the first block). To set values on the linked elements in additional {{else}} blocks, use either tagCtx.setValues() or tag.setValue().\nSee the Multiple two-way binding design patterns topic for additional discussion and examples.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See the Programmatic two-way data-binding design patterns topic for additional discussion and examples.\nSee also updateValues() below.\n"
      },
      {
        "_type": "para",
        "title": "The updateValue() method",
        "text": "The updateValue() method\nCalling tag.updateValue(newValue, index) will observably update the bound argument or property corresponding to the specified index of the bindTo array.\nFor block tags, with multiple {{else}} blocks, a third parameter, elseBlock, can be passed specifying the index of the {{else}} block whose bound argument or property is being updated:\ntag.updateValue(newValue, index, elseBlock);\n\nNote: index and elseBlock each default to 0 – so tag.updateValue(myval) is equivalent to tag.updateValue(myval, 0, 0).\nThe call will use two-way data-binding to update the underlying data specified in the data-link expression.\nSee the Programmatic two-way data-binding design patterns topic for additional discussion and examples.\nSee also updateValues() below.\nThe tag.updateValue with delayed events sample below also gives examples of the updateValue() syntax…\n"
      },
      {
        "_type": "para",
        "title": "The updateValues() method",
        "text": "The updateValues() method\nCalling tag.updateValues(...) will observably update the (one or more) bound arguments or properties specified in the bindTo option array:\ntag.updateValues(newValue1, newValue2, ...);\n\nThe call will use two-way data-binding to update the underlying data specified in the data-link expressions.\nFor block tags with multiple {{else}} blocks, an additional elseBlock parameter can be passed specifying the index of the {{else}} block whose bound arguments or properties are being updated:\ntag.updateValue(newValue1, newValue2, ..., elseBlock);\n\nFor example, if the bindTo array is of length 2, tag.updateValue(val1, val2, 1) will update the two bindTo targets on the first {{else}} block.\nNote:\n\nelseBlock defaults to 0 – so if bindTo is length 2, tag.updateValues(val1, val2) is equivalent to tag.updateValues(val1, val2, 0).\nThe bindTo option defaults to [0], so if there is no bindTo setting, tag.updateValues(val, i) will observably update the first argument data path on {{else}} block i, and will be equivalent to tag.updateValue(val, 0, i).\n\nSee the Multiple two-way binding design patterns topic for additional discussion and examples.\nSee also the tag.updateValues with delayed events sample below.\n"
      },
      {
        "_type": "para",
        "title": "Advanced scenario: async or batched change events, with tag.updateValue() or tag.updateValues()",
        "text": "Advanced scenario: async or batched change events, with tag.updateValue() or tag.updateValues()\nIn some scenarios it is desirable for the observable changes made to bindTo targets by tag.updateValue() or tag.updateValues() calls to use asynchronous or batched observable change events.\nFor asynchronous events, simply pass in an additional parameter, true, to updateValue() or updateValues().\nSee for example the {{slider}} control (also here), which uses the code:\n// Call updateValue() to change the external data-linked data to the new value x\nthis.updateValue(x, true); // Async update\n\nor the {{areaslider}} control (also here), which uses the code:\n// Call updateValues() to change the external data-linked data to the new values (x, y)\nthis.updateValues(x, y, true); // Async update\n\n(and similarly, the {{draggable}} control).\nFor batched events, instead of passing true, pass an array, batched, and then call batch.trigger() to trigger the delayed events.\nThe following two samples show the use of batched events, along with multiple bindTo parameters and multiple {{else}} blocks:\n"
      },
      {
        "_type": "sample",
        "title": "tag.updateValue() with delayed events",
        "text": "tag.updateValue() with delayed events\n\n  Make updates, then trigger the events...\n  <div>\n    {^{mytag one two mode=three}}{{else four five mode=six}}{{/mytag}}\n\n    {^{on ~trigger}}trigger{{/on}}\n  </div>\n  <input data-link=\"one\" /><input data-link=\"two\" /><input data-link=\"three\" />\n  <input data-link=\"four\" /><input data-link=\"five\" /><input data-link=\"six\" />\n\n\n\n$.views.tags({\nmytag: {\n  template: 'update{{:~tagCtx.index}}',\n\n  bindTo: [0, 1, \"mode\"],\n\n  doUpdate: function(block) {\n    this.updateValue(\"A\" + block, batch); // Update bindTo target 0\n    this.updateValue(\"B\" + block, 1, batch); // Update bindTo target 1\n    this.updateValue(\"C\" + block, 2, batch); // Update bindTo target 2\n    this.updateValue(\"D\" + block, 0, 1, batch); // Update {{else}} block bindTo target 0\n    this.updateValue(\"E\" + block, 1, 1, batch); // Update {{else}} block bindTo target 1\n    this.updateValue(\"F\" + block, 2, 1, batch); // Update {{else}} block bindTo target 2\n    alert(\"Updates have been made. Ready for triggering the events...\");\n  }\n}\n});\n\nvar batch = [],\n\nmyTmpl = $.templates(\"#myTmpl\"),\n  data = {one: \"a\", two: \"b\", three: \"c\", four: \"d\",  five: \"e\", six: \"f\"};\n\nmyTmpl.link(\"#page\", data, {trigger: \n  function() {\n    if (batch.trigger) {\n      batch.trigger(); // Trigger the events\n    } else {\n      alert(\"Make updates first, then trigger the events...\")\n    }\n  }\n});\nvar batch = [];\n...\nthis.updateValue(\"A...\", batch); // Update bindTo target 0\nthis.updateValue(\"B...\", 1, batch); // Update bindTo target 1\n...\nthis.updateValue(\"F...\", 2, 1, batch); // Update {{else}} block bindTo target 2\n...\nbatch.trigger() // Trigger the events\n\n\n"
      },
      {
        "_type": "sample",
        "title": "tag.updateValues() with delayed events",
        "text": "tag.updateValues() with delayed events\n\n  Make updates, then trigger the events...\n  <div>\n    {^{mytag one two mode=three}}{{else four five mode=six}}{{/mytag}}\n\n    {^{on ~trigger}}trigger{{/on}}\n  </div>\n  <input data-link=\"one\" /><input data-link=\"two\" /><input data-link=\"three\" />\n  <input data-link=\"four\" /><input data-link=\"five\" /><input data-link=\"six\" />\n\n\n\n$.views.tags({\nmytag: {\n  template: 'update{{:~tagCtx.index}}',\n\n  bindTo: [0, 1, \"mode\"],\n\n  doUpdate: function(block) {\n    this.updateValues(\"A\" + block, \"B\" + block, \"C\" + block, batch); // Update tag bindTo targets\n    this.updateValues(\"D\" + block, \"E\" + block, \"F\" + block, 1, batch); // Update {{else}} block bindTo targets\n    alert(\"Updates have been made. Ready for triggering the events...\");\n  }\n}\n});\n\nvar batch = [],\n\nmyTmpl = $.templates(\"#myTmpl\"),\n  data = {one: \"a\", two: \"b\", three: \"c\", four: \"d\",  five: \"e\", six: \"f\"};\n\nmyTmpl.link(\"#page\", data, {trigger: \n  function() {\n    if (batch.trigger) {\n      batch.trigger(); // Trigger the events\n    } else {\n      alert(\"Make updates first, then trigger events...\")\n    }\n  }\n});\nvar batch = [];\n...\nthis.updateValues(\"A...\", \"B...\", \"C...\", batch); // Update tag bindTo targets\nthis.updateValues(\"D...\", \"E...\", \"F...\", 1, batch); // Update {{else}} block bindTo targets\n...\nbatch.trigger(); // Trigger the events\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "jsvctxobject": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Each view has a view context object: view.ctx, which is a ‘hash’ whose properties correspond to the set of contextual parameters, ~foo accessible from that view, within a template. (See Accessing contextual parameters and helpers.)\nIt also has the following built-in properties (contextual parameters):\n\nctx.root: The root data (accessed from a template as ~root)\nctx.tag: The tag object (accessed from a template as ~tag)\nctx.tagCtx: The tagCtx object (accessed from a template as ~tagCtx)\nctx.parentTags: parent tags (accessed from a template as ~parentTags)\n\nFor programmatic access to contextual parameters, it may be better to use the view.ctxPrm() or tag.ctxPrm() API.\n"
      }
    ]
  },
  "jsvtagctxobject": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "When a template is rendered, each tag is instantiated.\n{^{sometag argExpr prop1=propExpr ~ctxprm1=prmExpr .../}}\n\nThe tag instance has an associated tag context object, tag.tagCtx, giving contextual information for the tag.\nSee Tag context\nIn the case of a tag with {{else}} blocks it has an array of tagCtx objects, tag.tagCtxs, one for each {{else}} block):\n{^{sometag argExpr prop1=propExpr ~ctxprm1=prmExpr ...}}\n  ...\n{{else argExpr2 prop2=propExpr2 ~ctxprm2=prmExpr2 ...}}\n  ...\n{{/sometag}}\n\n"
      },
      {
        "_type": "para",
        "title": "<b>tagCtx properties</b> (JsRender and JsViews):",
        "text": "tagCtx properties (JsRender and JsViews):\n(See also the JsRender tagCtx object topic.)\n\ntagCtx.props:\n\na hash of the values of the named properties (such as tagCtx.props.prop1)\n\ntagCtx.args:\n\nan array with argument value (such as tagCtx.args[0])\n\ntagCtx.params:\n\nprovides access to argument, property and contextual parameter expressions (such as tagCtx.params.props.prop1, tagCtx.params.args[0] or tagCtx.params.ctx.ctxprm1)\n\ntagCtx.content:\n\nfor a block tag (see wrapping block content), the compiled template for wrapped content\notherwise, for a tag with an external template reference, tmpl=..., the compiled external template (same as tagCtx.tmpl)\notherwise, false\n\ntagCtx.tmpl:\n\nfor a tag with an external template, tmpl=..., the compiled external template\notherwise, for a block tag, the template for wrapped content (same as tagCtx.content)\notherwise, false\n\ntagCtx.index:\n\nfor {{else}} blocks, the index of the block (see tag.tagCtxs)\notherwise, 0\n\ntagCtx.tag:\n\nthe tag instance\n\ntagCtx.view:\n\nthe contextual (containing) view object\n\ntagCtx.ctx:\n\nthe ctx (view context) object with the contextual helpers/template parameters for this tag.\n\n\n"
      },
      {
        "_type": "para",
        "title": "<b>tagCtx properties</b> (JsViews only):",
        "text": "tagCtx properties (JsViews only):\n\ntagCtx.linkedElems:\n\nequivalent to tag.linkedElems\nhowever, for a tag with {{else}} blocks such as:\n  {{mytag firstName}}...{{else lastName}}...{{/mytag}}\n\nthe context is the specific {{else}} block – e.g. for the example above, tag.tagCtxs[1].linkedElems[0] might access an <input/> binding to lastName\n\ntagCtx.mainElem\n\nequivalent to tag.mainElem\nhowever, for a tag with {{else}} blocks such as:\n  {{mytag id=\"a\"}}...{{else id=\"b\"}}...{{/mytag}}\n\nthe context is the specific {{else}} block – e.g. for the example above, tag.tagCtxs[1].mainElem would access an element with id: \"b\"\n\ntagCtx.displayElem:\n\nequivalent to tag.displayElem\nhowever, for a tag with {{else}} blocks such as:\n  {{mytag class=\"a\"}}...{{else class=\"b\"}}...{{/mytag}}\n\nthe context is the specific {{else}} block – e.g. for the example above, tag.tagCtxs[1].displayElem would access an element with class: \"b\"\n\ntagCtx.contentView:\n\nthe view object for tag content – whether rendered by the render method or by a template, or wrapped content…(see Custom tag child views)\nfor a tag with {{else}} blocks the context is the specific {{else}} block\n\n\n"
      },
      {
        "_type": "para",
        "title": "<b>tagCtx methods</b> (JsRender and JsViews):",
        "text": "tagCtx methods (JsRender and JsViews):\n(See also the JsRender tagCtx object topic.)\n\ntagCtx.render(data, context, noIteration):\n\nif there is a tag template, renders the template\notherwise for a template with an external template reference, tmpl=..., renders the external template\notherwise, for a block tag, renders the wrapped content\notherwise, returns \"\"\nNote: as an alternative, to render wrapped content even if there is a tag template, or an external template (tmpl-=...), usetagCtx.content.render(data, context, noIteration). (See sample)\n\ntagCtx.ctxPrm(name):\n\nequivalent to tag.ctxPrm(name)\nhowever, for a tag with {{else}} blocks such as:\n  {{mytag}}...{{else ~myparam=...}}...{{/mytag}}\n\nthe context is the specific {{else}} block – e.g. accessing tag.tagCtxs[1].ctxPrm(\"myparam\") for the example above\n\ntagCtx.cvtArgs():\n\nequivalent to tag.cvtArgs()\nhowever, for a tag with {{else}} blocks the context is the specific {{else}} block\n– i.e. equivalent to tag.cvtArgs(tagCtx.index)\n\ntagCtx.bndArgs():\n\nequivalent to tag.bndArgs()\nhowever, for a tag with {{else}} blocks the context is the specific {{else}} block\n– i.e. equivalent to tag.bndArgs(tagCtx.index)\n\n\n"
      },
      {
        "_type": "para",
        "title": "<b>tagCtx methods</b> (JsViews only):",
        "text": "tagCtx methods (JsViews only):\n\ntagCtx.contents(): returns a jQuery object of tag content nodes –- optionally filtered by a jQuery selector\n\nequivalent to tag.contents()\nhowever, for a tag with {{else}} blocks the context is the contents of the specific {{else}} block\n\ntagCtx.nodes(): returns an array of top-level nodes within the tag content (including text nodes)\n\nequivalent to tag.nodes()\nhowever, for a tag with {{else}} blocks the context is the contents of the specific {{else}} block\n\ntagCtx.childTags(): returns an array of custom tag instances, within the content of the tag -– optionally filtered by tag name\n\nequivalent to tag.childTags()\nhowever, for a tag with {{else}} blocks the context is the contents of the specific {{else}} block\n\ntagCtx.setValues(…): sets the values of the linked elements. In addition, if the tag control has a setValue() event handler, then that event handler will be called prior to updating each targeted linked element.\n\nequivalent to tag.setValues(...)\nhowever, for a tag with {{else}} blocks the context is the linked elements in the specific {{else}} block\n\n\n"
      }
    ]
  },
  "jsvlinkctxobject": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Data-linked tags (such as {^{mytag/}} or <div data-link=\"{mytag}\"></div>) provide a linkCtx object giving contextual data-link information:\n\nlinkCtx.tag: the tag instance\nlinkCtx.type: \"inline\" for a data-linked tag, \"link\" for data-linked element (tag binding), \"top\" for a top-level declarative data-linked element binding or \"expr for a top-level programmatic data-linked element binding\nlinkCtx.data: the current data context for the tag\nlinkCtx.elem: the associated HTML element (e.g. the data-linked element <div data-link=\"{mytag}\"></div>)\nlinkCtx.view: the contextual (containing) view object\nlinkCtx.expr: the tag binding expression\nlinkCtx.attr: the target attr of the tag binding expression\nlinkCtx.ctx: the ctx (view context) object with the contextual helpers/template parameters for this tag.\n\n"
      }
    ]
  },
  "linked-template-syntax": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews data-link syntax takes two forms:\n\nData-linked tags\nData-linked elements\n\nBoth forms use:\n\nData-linked paths\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "linked-tag-syntax": {
    "sections": [
      {
        "_type": "para",
        "title": "JsViews data-linked tags",
        "text": "JsViews data-linked tags\nA data-linked tag is like a regular JsRender tag (whether a built-in tag, or a custom tag) but has an additional ^ character to show that is data-linked. Let’s illustrate that by an example based on the Extending the {{for}} tag sample:\n<ul>\n  {{for lineItems start=1 end=3}}\n    <li>\n      {{:price}}\n    </li>\n  {{/for}}\n</ul>\n\n<ul>\n  {{purchases lineItems start=1 end=3}}\n    <li>\n      {{:price}}\n    </li>\n  {{/purchases}}\n</ul>\n\nWe can data-link to the lineItems – whether on the built-in {{for}}, or the custom {{purchases}} tag – like this:\n<ul>\n  {^{for lineItems}}\n    <li>\n      {^{:price}}\n    </li>\n  {{/for}}\n</ul>\n\n<ul>\n  {^{purchases lineItems start=1 end=3}}\n    <li>\n      {^{:price}}\n    </li>\n  {{/purchases}}\n</ul>\n\nNow if the lineItems array changes, our rendered template content will automatically update to show the additional inserted (or removed) members in the list.\nHere is a live sample of the data-linked {^{for}} tag:\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n  <button id=\"add\">Add</button>\n  <ol>\n    {^{for members}}\n      <li>\n        {^{:name}} \n        <span class=\"remove\"></span>\n      </li>\n    {{/for}}\n  </ol>\n\n\nvar team = {\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"}\n  ]\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team)\n  .on(\"click\", \".remove\", function() {\n    var view = $.view(this);\n    $.observable(team.members).remove(view.index);\n  })\n  .on(\"click\", \"#add\", function() {\n    $.observable(team.members).insert(0, {name: \"new\" + cnt++})\n  });\nTemplate:\n...\n{^{for members}}\n  <li>\n    {^{:name}} ...\n  </li>\n{{/for}}\n...\n\nCode:\n...\n$.templates(\"#teamTemplate\").link(\"#team\", team) ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice that we also added a ^ to the {^{:name}} tag. That means that if the value of the name field is changed (‘observably’) then the value will update automatically within the rendered template.\nAnd here is a link to a complete sample showing a data-linked {^{for}} tag. It lets you modify both the members list and the name properties, and see how they automatically trigger updates in other parts of the page which bind to the same data.\nJsViews is smart about how it updates the HTML. Generally it does so incrementally – only modifying the affected part of the HTML by inserting or removing elements, or replacing values.\n"
      },
      {
        "_type": "para",
        "title": "Binding to named properties of tags",
        "text": "Binding to named properties of tags\nSee also this sample, which again uses a data-linked {^{for}} tag, but which also has data-linking to the tmpl named property of the tag:\n{^{for members ^tmpl=isEditable? ... : ... \" /}}\n\nThe prefixed ^ on the name: ^tmpl=... is used to specify that the tmpl ‘named property’ is to be data-linked (so the whole tag will re-render if the isEditable value changes). Change the value (using the ‘Editable’ checkbox) and you see that the displayed {^{for}} updates automatically.\nBy default, named properties are not data-linked. This is made ‘opt-in’ for perf optimization reasons.\nNote, however, that custom tags can use the boundProps tag option to make specific named properties be data-linked by default. For example on the {^{radiogroup}} tag (see sample) the disabled property is data-linked by default.\n"
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
        "text": "JsViews data-link expressions, and syntax\nData-linked elements are regular HTML elements which have been data-bound in the template by adding a data-link attribute.\nThey can be used within templated content, as in the following sample – and they can also be used on top-level non-templated content in your page – see Top-level data-linking.\n"
      },
      {
        "_type": "sample",
        "title": "Data-linked elements in templates",
        "text": "Data-linked elements in templates\nA data-linked input element (two-way data-binding, update triggered on keydown)\n\n\n\nTwo-way data-binding (no update on keydown, only on blur)\n\n\n\nA data-linked span element (data binding to innerText – default target)\n\n\n\nA data-linked tag (renders as a text node, not an element...)\n\n{^{>name}}\n\nCode:\n\n...\nvar template = $.templates(\"#theTmpl\");\ntemplate.link(\"#result\", data);\n\n\n"
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
        "text": "The corresponding full syntax is a data-linked {{: ...}} tag\nIn fact it is short for this full syntax:\n<span data-link=\"{:pathOrExpression}\"></span>\n\n– which is a data-linked version of the familiar JsRender tag: {{:pathOrExpression}}.\nExamples:\n<span data-link=\"{:name}\"></span>\n<span data-link=\"{:address.street}\"></span>\n<span data-link=\"{:~someHelper.computed() > 1}\"></span>\n\n<input data-link=\"{:name:}\"/>\n<input data-link=\"{:name trigger=false:}\"/>\n\n"
      },
      {
        "_type": "para",
        "title": "Optional two-way data-binding",
        "text": "Optional two-way data-binding\nNotice the full syntax for the <input> has an additional : before the } at the end. It corresponds to the two-way data binding. (The same applies to other ‘user input elements’ such as select, textarea etc. (and also contenteditable elements).\nYou can provide both convert and convertBack converters if you want. (See the Two-way binding and converters sample):\n<input data-link=\"{myConverter:some.data.path:myConvertBack}\"/>\n\n<select data-link=\"{myConverter:some.data.path:myConvertBack}\">...</select>\n\nIf you want only one-way binding (from the data to the <input>) you simply eliminate the : at the end:\n<input data-link=\"{:some.data.path}\"/>\n\nSee the Two-way binding topic for additional details.\n"
      },
      {
        "_type": "para",
        "title": "Full syntax &ndash; multiple targets, multiple tags, multiple bindings...",
        "text": "Full syntax – multiple targets, multiple tags, multiple bindings...\nThe full syntax allows you to bind multiple expressions each to a different target, and is written like this: data-link=\"target1{linkExpression1} target2{linkExpression2} ...\".\nPossible targets include the following:\n\nan HTML attribute (such as title{...}, class{...}, id{...}, disabled{...} or data-foo{...}\n)\nan HTML element property (such as prop-muted{...} for a <video> element)\na CSS property (such as css-background-color{...})\ninnerHTML (as in html{...})\ninnerText (as in text{...})\nspecial targets like visible{...}\nor can be missing altogether (as in {...}) in which case it stands for the default target for the element.\n\nThe default target for most elements is innerText, but for input and select elements it is value.\nThe linkExpression {...} is actually a template tag, such as {^{:a.b.c}} or {^{myCustomTag .../}}. The difference from regular JsRender tag syntax is that with data-link expressions, you only put a single curly brace to delimit, and you don’t put the self-closing /, which is assumed.\nIn fact as long as the tag is self-closing, you can use any JsRender tag you want – including custom tags. See Tag bindings.\nFor example, if you have a JsRender tag as content of an element:\n<div>{{for some.path tmpl='myForTmpl'}}</div>\n\n– then you can make it into a data-linked tag, using:\n<div>{^{for some.path tmpl='myForTmpl'}}</div>\n\n– or into a data-linked element, using:\n<div data-link=\"{for some.path tmpl='myForTmpl'}\" ></div>\n\nSo examples would be:\n\n<div data-link=\"{:name}\"></div> (one-way binding to innerText – default target attrib – so automatically HTML encodes)– equivalent to abbreviated syntax: <input data-link=\"name\" />\n<div data-link=\"html{:name}\"></div> (one-way binding to innerHTML)\n<div data-link=\"text{:name}\"></div> (one-way binding to innerText – equivalent to default above)\n<div data-link=\"html{>name}\"></div> (one-way binding to innerHTML but with HTML encoding)\n<input data-link=\"{:name}\" > (one-way binding to value – default target attrib)\n<input data-link=\"value{:name}\" /> (one-way binding to value)\n<input data-link=\"title{upr:name}\" /> (one-way binding to the title attribute, using a registered converter: upr)\n<input data-link=\"{:name trigger=false:}\" /> (two-way binding to value, trigger only on blur) – equivalent to abbreviated syntax: <input data-link=\"name trigger=false\" />\n<input data-link=\"{cvt:name:cvtBack}\" /> (two-way binding to value, with converters)\n<input data-link=\"{cvt:name trigger=false:cvtBack}\" /> (two-way binding to value, with converters, and trigger only on blur)\n<input data-link=\"{cvt:name:cvtBack} title{:info.description}\" /> (two-way binding to value, with converters and one-way binding to title)\n<img data-link=\"src{:'/myImagesFolder/' + fileName + '.png'}\" /> (one-way binding to src – using an expression to build full path)\n<div data-link=\"{myCustomTag name}\"></div> (data-linking – and instantiating – a JsViews custom tag control. Renders as innerHTML – default target attrib for tags other than {: …} – so the control can insert HTML markup)\n<div data-link=\"text{myCustomTag name}\"></div> (data-linking a JsViews custom tag control – rendering as innerText – so automatically HTML encodes)\n<svg><ellipse data-link=\"cx{:x} fill{:color}\"></ellipse> (data-linking to attributes of an SVG element)\n<input data-link=\"{:name():} placeholder{:namePlaceholder()}\" /> (two-way data-linking to name() plus data-linking the placeholder target to namePlaceholder())\n\nSee: Targets for data-linking for additional details and samples.\n"
      },
      {
        "_type": "para",
        "title": "When do you use the abbreviated syntax?",
        "text": "When do you use the abbreviated syntax?\nThe abbreviated syntax is an alternative syntax when you only have a single expression of the form {:someExpression}, or in the case of inputs {:someExpression:} (two-way binding). So it is using the default target attrib, and is targeting innerText, and automatically doing HTML encoding. In that case you can remove the {} delimiters and colons and just write the someExpression. JsViews will expand your expression to the full syntax. Example: data-link=\"name\".\nSo if you need any of the following, you need to switch to the full format:\n\ninsertion of HTML markup as innerHTML: (switch to html{:someExpression})\nconverters\ndifferent target ‘attribs’\nmultiple bindings\nusing tags other than {{: ...}}\n\n"
      },
      {
        "_type": "para",
        "title": "Data-linking expressions using block tags, such as {{for}} &ndash; including {{else}} blocks.",
        "text": "Data-linking expressions using block tags, such as {{for}} – including {{else}} blocks.\nAs mentioned above, you can data-link to block tags, as long as you register the block content as a separate template, referenced using tmpl=...:\n<div data-link=\"{for employees tmpl='nameTmpl'}\">\n\nYou can also data-link to block tags that include {{else}} blocks, such as:\n<div data-link=\"{if someExpression tmpl='isTrueTmpl'}{else tmpl='isFalseTmpl'}\" ></div>\n\nExample:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n  No show, but alt is true...\n\n\n Show\n\n Alt\n\n\n\n$.link(true, \"body\", {show: true, alt: true});\n\n\nTop-level data-linking to {if ...}{else ...}{else ...}\n...<input data-link=\"show\" type=\"checkbox\"/> Show...\n...<input data-link=\"alt\" type=\"checkbox\"/> Alt...\n\n<div data-link=\"{if show tmpl='Show this'}{else alt tmpl='#alttmpl'}{else tmpl='No show, no alt'}\"></div>\n\n$.link(true, \"body\", {show: true, alt: true});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also this {if}{else} sample with dynamically changing templates).\n"
      },
      {
        "_type": "para",
        "title": "Data-linking expressions using tag controls",
        "text": "Data-linking expressions using tag controls\nAn important case of data-linking is binding and instantiating of custom tag controls, such as:\n<div data-link=\"{slider size _range='min' ...}\"></div>\n\nSee the tag control samples. Note that this works not only within data-linked templates, but also  when linking to top-level content – as shown in the second variant of the slider sample.\nAnother example might be a tabs control where the {{else}} blocks are the contents of the different tabs:\n<div data-link=\"{tabs ... tmpl='tab1'}{else ... tmpl='tab2'}{else ... tmpl='tab3'}\"></div>\n\nExample:\n"
      },
      {
        "_type": "sample",
        "title": "A top-level data-linked tabs control",
        "text": "A top-level data-linked tabs control\n\n$(function() {\n$.templates({\n  tab1: \"365 days per year\",\n  tab2: \"12 months per year\",\n  tab3: \"Name: {{:name}}\"\n});\n\n$(\"#tabsView\").link(true, {name: \"Jeff\"});\n});\n\nUsing data-linking to instantiate a tabs control on a top-level page element:\n<div id=\"tabsView\" data-link=\"\n  {tabs caption='days' tmpl='tab1' pane=2 ...}\n  {else caption='months' tmpl='tab2'}\n  {else caption='name' tmpl='tab3'}\n\"></div>\n\n$.templates({\n  tab1: \"365 days per year\",\n  ...\n  tab3: \"Name: {{:name}}\"\n});\n\n$(\"#tabsView\").link(true, {name: \"Jeff\"});\n\n\n/*! Sample JsViews tag control: {{tabs}} control v1.0.7\nVersion using linkedCtxPrm\nsee: http://www.jsviews.com/#download/sample-tagcontrols\nand http://www.jsviews.com/#bindingpatterns@tabsctxprm */\n/*\n * Copyright 2020, Boris Moore\n * Released under the MIT License.\n */\n\n(function($) {\n\"use strict\";\n\n$.views.tags({\ntabs: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  setSize: true,\n  mainElement: \".tabscontent td\",\n  displayElement: \".tabsview\",\n  bindTo: \"pane\",\n  linkedCtxParam: \"pane\",\n  ctx: {pane: 0}, // Default value for ~pane\n  width: 250,\n  height: 100,\n  template:\n    '{{if ~tagCtx.index===0}}' + // render once only\n      '<table class=\"tabsview\"><tbody>' +\n        // Tab strip UI with 'click' handler calling tag.setTab() method\n        '<tr class=\"tabstrip\">' +\n          '{{for ~tag.tagCtxs}}' +\n            '<th data-link=\"class{:\\'header_\\' + (#index === ~pane)} {on ~tag.setTab #index} {:props.caption}\"></th>' +\n          '{{/for}}' +\n        '</tr>' +\n        // Tab content with wrapped content of selected {{else}} block\n        '<tr class=\"tabscontent\">' +\n          '<td colspan=\"{{:~tag.tagCtxs.length}}\" data-link=\"{include ^tmpl=~tag.tagCtxs[~pane].content}\"></td>' +\n        '</tr>' +\n      '</tbody></table>' +\n    '{{/if}}',\n\n  // JsViews handlers and methods\n  onUpdate: false,\n\n  // tag methods\n  setTab: function(index) {\n    index = index || 0;\n    // Update tag.pane, and update external data through two-way binding\n    this.ctxPrm(\"pane\", index);\n  }\n}\n});\n\n})(this.jQuery);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also Tag bindings.\n"
      },
      {
        "_type": "para",
        "title": "Data-link syntax for updating only, without initial rendering",
        "text": "Data-link syntax for updating only, without initial rendering\nAny of the full syntax data-link expressions above can be modified by adding a ^ before the initial {. With this modified syntax, the data-link expression will only be used for updating of content when the data changes, but not for the initial rendering:\n<... data-link=\"target^{expression}\" ...>\n\nSee for example the following sample:\n"
      },
      {
        "_type": "sample",
        "text": "\n  <div data-link=\"^{:name}\">Your name will go here</div>\n  <input data-link=\"^{:name:}\" value=\"Your name...\"/><br/>\n  Name: {^{>name}}\n\n\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = { name: \"\" };\n\nmyTmpl.link(\"#page\", data);\n<div data-link=\"^{:name}\">Your name will go here</div>\n\n<input data-link=\"^{:name:}\" value=\"Your name...\"/>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also this sample with radio buttons, which uses the syntax:\n<input ... type=\"radio\" value=\"{{:id}}\" data-link=\"value^{:id}\" />\n\n"
      },
      {
        "_type": "para",
        "title": "Samples of data-linking:",
        "text": "Samples of data-linking:\n\nThere are many samples showing data-linking under JsViews Samples.\nSee in particular this tutorial sequence on data-linking\n\n"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "See also:\n\nData-linked tags\nTargets for data-linking\n\n"
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
        "text": "Top-level declarative data-linking\nUse:\n$.link(true, target, data);\n//or alternative syntax:\n$(target).link(true, data);\n\n… to activate any declarative data-link bindings (data-link=\"...\" expressions) on the target element, or on elements within its content.\nSee: Top-level declarative data-linking.\n"
      },
      {
        "_type": "para",
        "title": "Top-level programmatic data-linking",
        "text": "Top-level programmatic data-linking\nUse:\n$.link(expression, target, data);\n//or alternative syntax:\n$(target).link(expression, data);\n\n… to bind a data-link expression on a target element.\nSee Top-level programmatic data-linking.\n"
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
        "text": "Top-level declarative data-linking\ninput {margin-bottom:10px;}\n\n\n  \n  \n   CEO\n\n  \n  and I am CEO!\n\n  \n    Employees:\n     \n  \n\n\n$.templates(\"nameTmpl\", \"Name: {{:first}} {{:last}}\");\n\nvar person = {\n  first: \"Jim\",\n  last: \"Rudd\",\n  employees: [\n    {first: \"Mary\", last: \"A\"},\n    {first: \"Hank\", last: \"B\"}\n  ]};\n\nvar helpers = {nameLabel: \"My name is \"};\n\n$.link(true, \"#group\", person, helpers);\nTop-level content:\n<div id=\"group\">\n  <input type=\"checkbox\" />\n  ...\n\nAdd two-way data-linking to <input>s\n<input data-link=\"isCEO\" type=\"checkbox\" />...\n<input data-link=\"first\" />...\n\nAdd data-linking to <div>s and <span>s etc.\n<div id=\"group\" data-link=\"css-color{:isCEO ? 'red' : 'blue'}\">...\n<div data-link=\"{for employees tmpl='nameTmpl'}\">...\n\nActivate, using $.link(true, ...)\n$.link(true, \"#group\", person, helpers);\n\n(Could have used alternative syntax: $(\"#group\").link(true, person, helpers);)\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is another example, taken from the slider control in the tag control samples, which uses top-level data-linking with data-link=\"{slider ...}\" to instantiate and data-bind a JsViews {{slider}} control.\n"
      },
      {
        "_type": "sample",
        "title": "Top-level data-link=\"{slider ...}\"",
        "url": "samples/tag-controls/jqui/slider/simple-toplevel/sample",
        "text": "Top-level data-link=\"{slider ...}\"\nSlider with initialized properties (top-level data-linking)\n<div data-link=\"{slider size _range='min' _min=1 max=200 _orientation='vertical' width=400}\"></div>\n\n\nData-linking to SVG content\n\n\n  \n  ...\n\n\nActivate data-linking \n\n$.link(true, \"body\", model);\n\n\"use strict\";\n$.views.converters({\n  tonum: function(val) {\n    return +val; // Convert string to number\n  }\n});\n\nvar model = {\n    size: 150\n  };\n\n$.link(true, \"body\", model);\n/*! JsViews jQueryUI widget integration v1.0.4\nsee: http://www.jsviews.com/#download/jqueryui-tagcontrols */\n/*\n * https://www.jsviews.com/download/sample-tag-controls/jsviews-jqueryui-widgets.js\n * Copyright 2019, Boris Moore\n * Released under the MIT License.\n */\n\n/* Wrap behavior (wrapping HTML content) and default element, for each widget: */\n\n/*       autocomplete button   buttonset droppable   menu        progressbar  resizable\n * wrap: -            wrap     -         wrap        wrap        wrap         wrap     \n * elem: input        button   -         -           ul          div          div      \n */\n\n/*       selectable   slider   spinner   timespinner  tabs       sortable     draggable\n * wrap: wrap         -        -         -            wrap       wrap         wrap     \n * elem: -            div      input     input        -          -            -      \n */\n\n/*       accordion    checkbox radio     controlgroup selectmenu datepicker\n * wrap: wrap         -        -         wrap         wrap       wrap\n * elem: -            div      input     span         selectv    input\n */\n\n(function(global, $, undefined) {\n\"use strict\";\n\nif (!$ || !$.fn || !$.ui || !$.views) {\n  // jQuery is not loaded.\n  throw \"jsviews-jqueryui-widgets.js requires jQuery, jQuery UI and JsViews\";\n}\n\nfunction getConverter(tag, cvt) {\n  return cvt + \"\" === cvt ? tag.tagCtx.view.getRsc(\"converters\", cvt) : cvt;\n}\n\nfunction checkboxRadioOnBind() {\n  var tag = this,\n    props = tag.tagCtx.props,\n    elem = tag.mainElem[0];\n    tag.baseApply(arguments);\n\n  if (props.name) {\n    elem.name = props.name;\n  }\n  if (props.value) {\n    elem.value = props.value;\n  }\n\n  tag.displayElem = tag.widget.label;\n}\n\nfunction checkboxRadioOnAfterLink(tagCtx, linkCtx) {\n  var tag = this,\n    props = tagCtx.props;\n\n  tag.baseApply(arguments);\n\n  if (props.label && props.label !== tag.widget.options.label) {\n    tag.widget.option(\"label\", props.label);\n  }\n}\n\nfunction tabsAccordionOnBind() {\n  var tag = this;\n  tag.mainElem.on(\"jsv-domchange\", function(ev, tagCtx, linkCtx, eventArgs) {\n    var newSelected,\n      selected = tag.widget.options.active;\n\n    tag.widget.refresh();\n    newSelected = tag.widget.options.active;\n\n    if (selected !== newSelected) {\n      tag.updateValue(newSelected);\n    }\n  });\n}\n\nfunction tabsAccordionOptions() {\n  var tag = this;\n  return {\n    activate: function(evt, ui) {\n      // Raise elemChangeHandler event when selected tab changes - for two-way binding to arg(0)\n      tag.updateValue(tag.widget.options.active);\n    }\n  };\n}\n\nfunction initDataFormatter(tag, tagCtx) { // Used by datepicker and spinner\n  // Initialize the data formatter\n  var dataFormatter,\n    dataFormat = tagCtx.props.dataFormat;\n  if (dataFormat === undefined) {\n    dataFormat = tag.dataFormat;\n  }\n  dataFormatter = dataFormat && dataFormat.parse\n    ? dataFormat\n    : tag.dataFormatter;\n\n  // Formatter can be provided as tag.dataFormat or tagCtx.props.dataFormat\n  tag.parseData = function(data) {\n    return dataFormatter.parse.call(tag, data, tag.tagCtx.props);\n  };\n  tag.formatData = function(date) {\n    return dataFormatter.format.call(tag, date, tag.tagCtx.props);\n  };\n  return dataFormat;\n}\n\nvar tagDefs = {\n// ============================= WIDGET =============================\nwidget: {\n  argDefault: false, // Do not default missing arg to #data\n  mainElement: \"*\",\n  init: function(tagCtx) {\n    var content, elemType,\n      tag = this;\n\n    if (tag.inline) {\n      content = tagCtx.tmpl.markup;\n      if (!tag.template && (elemType = tagCtx.props.elem || tag.elem)) {\n        if (content) {\n          if (tag.wrap) {\n            tag.template = \"<\"+elemType+\">\" + $.trim(content) + \"</\"+elemType+\">\";\n          }\n        } else {\n          tag.template = (elemType === \"input\") ? \"<input/>\" : \"<\"+elemType+\"></\"+elemType+\">\";\n        }\n      }\n      tag.attr = \"html\";\n    }\n  },\n  onBind: function(tagCtx) {\n    var mainElem, prop, i, optionKey,\n      tag = this,\n      presets = tag.initOptions || [], // initOptions: array of option names that when set declaratively\n                                 // as tag options will be set on creation, not on afterLink\n      widgetName = tag.widgetName,\n      options = tag.options,     // hash (or function returning hash) of option settings\n      widgetFullName = widgetName,\n      presetsHash = {};\n\n    presets.push(\"create\");\n\n    widgetName = widgetName.split(\"-\").pop();\n\n    i = presets.length;\n    while (i--) {\n      optionKey = presets[i];\n      if (prop = tagCtx.props[\"_\" + optionKey]) {\n        presetsHash[optionKey] = prop;\n      }\n    }\n    if (widgetFullName === widgetName) {\n      widgetFullName = \"ui-\" + widgetName;\n    }\n\n    mainElem = tag.mainElem;\n    if (!mainElem || !mainElem[0]) {\n      // This may be due to using {{myWidget}} No element found here {{/myWidget}} \n      throw \"No element found for tag '\" + tag.tagName +\"'\";\n    }\n\n    if (tagCtx.props.id && !mainElem[0].id) {\n      mainElem[0].id = tagCtx.props.id;\n    }\n\n    // Instantiate widget\n    mainElem[widgetName](presetsHash);\n\n    // Store widget instance\n    tag.widget = mainElem.data(widgetFullName) || mainElem.data(widgetName);\n\n    if (!tag.widget) {\n      // Widget failed to load, or is not a valid widget factory type\n      throw \"widget '\" + widgetName + \"' failed\";\n    }\n\n    if (options) {\n      if ($.isFunction(options)) {\n        options = tag.options();\n      }\n      mainElem[widgetName](\"option\", options); // initialize options\n    }\n  },\n  onAfterLink: function(tagCtx) {\n    var mainElem,\n      tag = this,\n      options = tag.options, // hash (or function returning hash) of option settings\n      props = tagCtx.props,\n      widgetName = tag.widgetName.split(\"-\").pop();\n    if ($.isFunction(options)) {\n      options = tag.options();\n    }\n    mainElem = tag.mainElem;\n    $.each(props, function(key, prop) {\n      var option;\n      if (key.charAt(0) === \"_\") {\n        key = key.slice(1);\n        option = options && options[key];\n        if (mainElem[widgetName](\"option\", key) != prop) { // != so undefined and null are considered equivalent\n          mainElem[widgetName](\"option\", key,\n            option && $.isFunction(option) && prop && $.isFunction(prop)\n              ? function() {\n                // If the same event function option is overridden on the tagDef options\n                // (or in a _create override) and the tagCtx.props, call first the one on\n                // the tagDef options, and then the one declared on the tag properties.\n                option.apply(mainElem[0], arguments);\n                return prop.apply(mainElem[0], arguments);\n              }\n              : prop\n            );\n        }\n      }\n    });\n  },\n  onUpdate: false, // Don't rerender whole tag on update\n  dataBoundOnly: true,\n  attr: \"none\"\n},\n// ============================= BUTTON =============================\nbutton: {\n  baseTag: \"widget\",\n  widgetName: \"button\",\n  elem: \"button\",\n  wrap: true,\n  setSize: true,\n  contentCtx: true,\n  onBind: function(tagCtx, linkCtx) {\n    var elem = this.mainElem[0];\n      elem.innerHTML = elem.innerHTML || \"&nbsp;\"; // Fixes jQuery UI button issue if no label text\n    this.baseApply(arguments);\n  },\n  onAfterLink: function(tagCtx, linkCtx, ctx, event) {\n    this.baseApply(arguments);\n    if (event) {\n      this.widget.refresh();\n    }\n  }\n},\n// ============================= AUTOCOMPLETE =============================\nautocomplete: {\n  baseTag: \"widget\",\n  widgetName: \"autocomplete\",\n  linkedElement: \"*\",\n  elem: \"input\",\n  setSize: true,\n  options: function() {\n    var tag = this;\n    return {\n      change: function(evt, ui) {\n        if (ui.item) {\n          tag.updateValue(ui.item.value);\n          // If there is a selected item, update bound value on keydown.\n          // (Alternatively can set trigger=false to update on change)\n        }\n      },\n      select: function(evt, ui) {\n        if (ui.item) {\n          tag.updateValue(ui.item.value);\n        }\n      },\n      focus: function(evt, ui) {\n        return false;\n      }\n    };\n  }\n},\n// ============================= CHECKBOX =============================\ncheckbox: {\n  baseTag: \"widget\",\n  widgetName: \"checkboxradio\",\n  template: \"<label><input type='checkbox'/></label>\",\n  mainElement: \"input\",\n  linkedElement: \"input\",\n  setSize: true,\n  onBind: checkboxRadioOnBind,\n  onAfterLink: checkboxRadioOnAfterLink,\n  setValue: function(val) {\n    var tag = this,\n      elem = this.mainElem[0],\n      checked = val && val !== \"false\";\n    if (elem.checked !== checked) {\n      elem.checked = checked;\n      tag.widget.refresh();\n    }\n  }\n},\n// ============================= RADIO =============================\nradio: {\n  baseTag: \"widget\",\n  widgetName: \"checkboxradio\",\n  template: \"<label><input type='radio'/></label>\",\n  mainElement: \"input\",\n  setSize: true,\n  onBind: function() {\n    var radiogroup = this.parents.radiogroup;\n    checkboxRadioOnBind.apply(this, arguments);\n    if (radiogroup && !radiogroup._d) {\n      radiogroup.onAfterLink = $.views.sub._gm(radiogroup.onAfterLink, function() { // Get derived method\n        var widget,\n          val = radiogroup.bndArgs()[0],\n          disabled = !!radiogroup.tagCtx.props.disabled,\n          radios = radiogroup.childTags(\"radio\"),\n          l = radios.length;\n        while (l--) {\n          radios[l].setValue(val);\n          widget = radios[l].widget;\n          if (disabled !== widget.options.disabled) {\n            widget.option(\"disabled\", disabled);\n          }\n        }\n        this.baseApply(arguments); // Call base onAfterLink()\n      });\n      radiogroup._d = true;\n    }\n  },\n  onAfterLink: checkboxRadioOnAfterLink,\n\n  setValue: function(val) {\n    var elem = this.mainElem[0],\n    checked = val === elem.value;\n    if (elem.checked !== checked) {\n      elem.checked = checked;\n    }\n    this.widget.refresh();\n  }\n},\n// ============================= CONTROLGROUP =============================\ncontrolgroup: {\n  baseTag: \"widget\",\n  widgetName: \"controlgroup\",\n  elem: \"span\",\n  wrap: true,\n  contentCtx: true,\n  onBind: function() {\n    var tag = this;\n    tag.baseApply(arguments);\n    tag.mainElem.on(\"jsv-domchange\", function() {\n      tag.widget.refresh();\n    });\n  }\n},\n// ============================= DATEPICKER =============================\ndatepicker: {\n  baseTag: \"widget\",\n  widgetName: \"datepicker\",\n  linkedElement: \"*\",\n  elem: \"input\",\n  setSize: true,\n  dataFormat: true,\n  dataFormatter: { // Data formatter from data to Date\n    // Default data formatter uses built-in datepicker formatter.\n    // Override as tag.dataFormat in tagDef or as tagCtxprops.dataFormat\n    parse: function(data, props) {\n      return $.datepicker.parseDate(this.dataFormat, data);\n    },\n    format: function(date, props) {\n      return $.datepicker.formatDate(this.dataFormat, date);\n    }\n  },\n  init: function(tagCtx) {\n    var tag = this,\n      dateFormat = tag.dateFormat = tagCtx.props.dateFormat\n        || tagCtx.props._dateFormat // Can set as _dateFormat=... or as dateFormat=...\n        || tag.dateFormat // or set as property in tagDef\n        || $.datepicker._defaults.dateFormat, // or use internal date-picker default\n      cvt = getConverter(tag, tag.convert),\n      cvtBk = getConverter(tag, tag.convertBack),\n      dataFormat = initDataFormatter(tag, tagCtx);\n      tag.dataFormat = dataFormat === true ? tag.dateFormat : dataFormat;\n\n    tag.convert = function(val) {\n      // Wrapped converter calls converter then does widget format\n      val = cvt ? cvt.call(tag, val) : val;\n      if (tag.dataFormat && (\"\" + val === val)) {\n        val = tag.parseData(val);\n      }\n      return $.datepicker.formatDate(dateFormat, dataFormat === 0 ? new Date(val) : val);\n    };\n    tag.convertBack = function(val) {\n      // Wrapped converter, does widget parse then calls converter\n      val = $.datepicker.parseDate(dateFormat, val);\n      val = dataFormat ? tag.formatData(val) : dataFormat === 0 ? +val : val;\n      return cvtBk ? cvtBk.call(tag, val) : val;\n    };\n    // Prevent onAfterLink replacing wrapped converters with unwrapped ones\n    tag.convert.fix = tag.convertBack.fix = true;\n    tag.baseApply(arguments);\n  },\n  options: function() {\n    var tag = this;\n    return {\n      onSelect: function(dateText) {\n        tag.value = dateText;\n        tag.updateValue(dateText);\n      }\n    };\n  },\n  onBind: function(tagCtx) {\n    var tag = this;\n    tag.baseApply(arguments);\n    tag.mainElem.datepicker(\"option\", \"dateFormat\", tag.dateFormat);\n    if (tag.mainElem[0].tagName !== \"INPUT\") {\n      // This datepicker is not using an input (e.g. using a div) - so set to inline-\n      tag.mainElem.css(\"display\", \"inline-block\");\n    } else {\n      tag.tagCtx.props.trigger = false;\n    }\n  },\n  setValue: function(value) {\n    var tag = this;\n    if (value !== undefined && value !== tag.value) {\n      tag.value = value;\n      tag.mainElem.datepicker(\"setDate\", value);\n    }\n  },\n  getValue: function() {\n    return this.value;\n  }\n},\n//dialog: { // Currently not supported. (Support would require overriding _createWrapper code.)\n//  baseTag: \"widget\",\n//  widgetName: \"dialog\",\n//  wrap: true,\n//  elem: \"div\"\n//},\n// ============================= DROPPABLE =============================\ndroppable: {\n  baseTag: \"widget\",\n  widgetName: \"droppable\",\n  elem: \"div\",\n  wrap: true,\n  setSize: true,\n  contentCtx: true,\n  setValue: function(value) {\n    if ($.isFunction(value)) {\n      this.widget.option(\"drop\", value); // Set the handler function for the drop action\n    }\n  }\n},\n// ============================= MENU =============================\nmenu: {\n  baseTag: \"widget\",\n  widgetName: \"menu\",\n  elem: \"ul\",\n  wrap: true,\n  setSize: true,\n  contentCtx: true,\n  initOptions: [\"menus\", \"items\", \"role\"], // Options which need to be set on creation, not later\n  setValue: function(value) {\n    if ($.isFunction(value)) {\n      this.widget.option(\"select\", value); // Set the menu select handler\n    }\n  }\n},\n// ============================= PROGRESSBAR =============================\nprogressbar: {\n  baseTag: \"widget\",\n  widgetName: \"progressbar\",\n  boundProps: [\"busy\"],\n  elem: \"div\",\n  wrap: true,\n  setSize: true,\n  contentCtx: true,\n  setValue: function(value) {\n    if (!this.tagCtx.props.busy) {\n      this.widget.value(parseFloat(value) || 0);\n    }\n  },\n  getValue: function() {\n    return this.widget.value();\n  },\n  onAfterLink: function(tagCtx) {\n    var tag = this;\n    tag.baseApply(arguments);\n    if (tagCtx.props.busy) {\n      tag.widget.value(false);\n    }\n  }\n},\n// ============================= RESIZABLE =============================\nresizable: {\n  baseTag: \"widget\",\n  widgetName: \"resizable\",\n  bindTo: [\"width\", \"height\"],\n  linkedCtxParam: [\"width\", \"height\"],\n  elem: \"div\",\n  wrap: true,\n  contentCtx: true,\n  options: function() {\n    var tag = this;\n    return {\n      resize: function(evt, ui) {\n        tag.updateValues(ui.size.width, ui.size.height, true); // Async update\n        tag.setValues(ui.size.width, ui.size.height);\n      }\n    };\n  },\n  setValue: function(value, index) {\n    if (value !== undefined) {\n      this.mainElem[index ? \"height\" : \"width\"](value || 0);\n    }\n  },\n  getValue: function() {\n    return [this.mainElem.width(), this.mainElem.height()];\n  }\n},\n// ============================= SELECTMENU =============================\nselectmenu: {\n  baseTag: \"widget\",\n  widgetName: \"selectmenu\",\n  elem: \"select\",\n  wrap: true,\n  setSize: true,\n  contentCtx: true,\n  options: function() {\n    var tag = this;\n    return {\n      change: function(evt, ui) {\n        tag.updateValue(ui.item.value);\n      }\n    };\n  },\n  onBind: function() {\n    var tag = this;\n    tag.baseApply(arguments);\n    tag.displayElem = tag.widget.button;\n    tag.mainElem.on(\"jsv-domchange\", function() {\n      tag.widget.refresh();\n    });\n  },\n  setValue: function(value) {\n    if (value !== undefined) {\n      this.mainElem[0].value = value;\n      this.widget.refresh();\n    }\n  },\n  getValue: function() { \n    return this.mainElem[0].value;\n  }\n},\n// ============================= SLIDER =============================\nslider: {\n  bindTo: [0, 1], // Bind to first argument. If options.range=true, bind also to second argument.\n  baseTag: \"widget\",\n  widgetName: \"slider\",\n  elem: \"div\",\n  setSize: true,\n  options: function() {\n    var tag = this;\n    return {\n      slide: function(evt, ui) {\n        if (ui.values) { // property values is given when option \"range\" is set to true\n          tag.updateValues.apply(tag, ui.values);\n        } else {\n          tag.updateValue(ui.value);\n        }\n      }\n    };\n  },\n  onAfterLink: function(tagCtx) {\n    var tag = this;\n    if (!tag.linkCtx.elem._jsvChg) {\n      // If change not triggered by a the slider itself changing value\n      tag.baseApply(arguments);\n    }\n  },\n  setValue: function(value, index) {\n    var widget = this.widget;\n    if (value !== undefined) {\n      value = value || 0;\n      if (widget.options.range === true) {\n        widget.values(index, value);\n      } else {\n        widget.value(value);\n      }\n    }\n  },\n  getValue: function() {\n    return this.widget.value();\n  }\n},\n// ============================= SPINNER =============================\nspinner: {\n  baseTag: \"widget\",\n  widgetName: \"spinner\",\n  mainElement: \"input\",\n  linkedElement: \"input\",\n  elem: \"input\",\n  setSize: true,\n  // Default display formatter uses Globalize 0.1.1.\n  // Override as tag.displayFormat in tagDef or as tagCtx.props.displayFormat\n  displayFormat: { // Default display format: numberString, to number\n    parse: function(numberString, props) {\n      return window.Globalize\n        ? Globalize.parseFloat(numberString, 10, props._culture)\n        : numberString;\n    },\n    format: function(data, props) {\n      return window.Globalize\n        ? Globalize.format(data, this.widget.options.numberFormat, props._culture)\n        : data;\n    }\n  },\n  options: function() {\n    var tag = this;\n    return {\n      spin: function(evt, ui) {\n        tag.updateValue(tag.widget._format(ui.value));\n      }\n    };\n  },\n  init: function(tagCtx) {\n    var dataFormat,\n      tag = this,\n      displayFormat = tagCtx.props.displayFormat;\n    tag.parse = function(numberString) {\n      return displayFormat.parse.call(tag, numberString, tag.tagCtx.props);\n    };\n    tag.format = function(data, props) {\n      return displayFormat.format.call(tag, data, tag.tagCtx.props);\n    };\n    if (displayFormat === undefined) {\n      displayFormat = tag.displayFormat;\n    }\n    tag.dataFormat = dataFormat = initDataFormatter(tag, tagCtx);\n    tag.baseApply(arguments);\n  },\n  onBind: function(tagCtx) {\n    var tag = this,\n      cvt = getConverter(tag, tag.convert),\n      cvtBk = getConverter(tag, tag.convertBack);\n    tag.dataCvt = cvt;\n    tag.dataCvtBk = cvtBk;\n    tag.baseApply(arguments);\n\n    if (!tag.linkCtx.elem._jsvChg) {\n      // If change not triggered by the spinner itself changing value\n      tag.displayElem = tag.mainElem.parent(); // jQuery UI wraps the input in a span\n      if (tagCtx.props.width) {\n        // In addition to generic setting of width on the\n        // displayElem, need also to set width on the input.\n        tag.mainElem.width(tagCtx.props.width - tag.displayElem.find(\".ui-spinner-up\").width()-9);\n      }\n    }\n\n    tag.convert = function(val) {\n      // Wrapped converter calls converter then does widget format\n      val = cvt ? cvt.call(tag, val) : val\n      val = tag.dataFormat ? +tag.parseData(val) : val;\n      return tag.widget._format(val);\n    };\n    tag.convertBack = function(val) {\n      // Wrapped converter, does widget parse then calls converter\n      val = tag.widget._parse(val);\n      val = tag.dataFormat ? tag.formatData(val) : val;\n      return cvtBk ? cvtBk.call(tag, val) : val;\n    };\n    // Prevent onAfterLink replacing wrapped converters with unwrapped ones\n    tag.convert.fix = tag.convertBack.fix = true;\n\n    tag.widget._parse = function(value) {\n      return value + \"\" === value && value\n        ? +tag.parse(value, tagCtx.props)\n        : value;\n    };\n    tag.widget._format = function(data) {\n      return data !== \"\"\n        ? tag.format(data, tagCtx.props)\n        : data;\n    };\n  }\n},\n// ============================= TIMESPINNER =============================\ntimespinner: {\n  baseTag: \"spinner\",\n  dataFormat: { // Default data format: ticks/timestamp, to Date\n    parse: function(date, props) {\n      return +date;\n    },\n    format: function(ticks, props) {\n      return new Date(ticks);\n    }\n  },\n  displayFormat: { // Default timestring display, to Date\n    parse: function(timeString, props) {\n      var date;\n      if (timeString) {\n        return window.Globalize\n          ? Globalize.parseDate(timeString, \"t\", props._culture)\n          : ((date = new Date()).setHours(timeString.slice(0, 2), timeString.slice(3)), date);\n      }\n    },\n    format: function(date, props) {\n      if (date.getDay) {\n        return window.Globalize\n          ? Globalize.format(date, \"t\", props._culture)\n          : (100 + date.getHours() + \"\").slice(1) + \":\" + (100 + date.getMinutes() + \"\").slice(1);\n      }\n    }\n  },\n  options: function() {\n    return $.extend(\n      this.baseApply(), // Get options object from base class and extend it\n      {step: 60000, page: 60}\n    );\n  },\n  init: function(tagCtx) {\n    this.baseApply(arguments);\n    this.tagCtx.props.width = this.tagCtx.props.width || 80;\n  },\n  onBind: function(tagCtx) {\n    var tag = this;\n    tag.baseApply(arguments);\n\n    tag.widget._parse = function(value) {\n      var returnDate;\n      if (\"\" + value === value && value && (value = tag.parse(value, tagCtx.props))) {\n        // Make return dateNumber (ticks) change the hours and minutes but keep current date (day/month)\n        if (tag.keepDay) {\n          returnDate = tag.tagCtx.args[0];\n          if (tag.dataCvt) {\n            returnDate = tag.dataCvt(returnDate);\n          }\n          if (tag.dataFormat) {\n            returnDate = tag.parseData(returnDate);\n          }\n        } else {\n          returnDate = tag.value;\n        }\n        returnDate = new Date(returnDate);\n        returnDate.setHours(value.getHours());\n        returnDate.setMinutes(value.getMinutes());\n        value = returnDate;\n      }\n      return +value;\n    };\n    tag.widget._format = function(value) {\n      if (+value === value) {\n        tag.value = value;\n        return tag.format(new Date(value), tagCtx.props);\n      }\n    };\n  },\n  onAfterLink: function(tagCtx) {\n    var keepDay = tagCtx.props.keepDay;\n    if (keepDay !== undefined) {\n      this.keepDay = keepDay;\n    }\n    this.baseApply(arguments);\n  },\n  trigger: false\n},\n// ============================= TABS =============================\ntabs: {\n  baseTag: \"widget\",\n  widgetName: \"tabs\",\n  elem: \"div\",\n  wrap: true,\n  setSize: true,\n  contentCtx: true,\n  options: tabsAccordionOptions,\n  setValue: function(value) {\n    if (value !== undefined) {\n      this.widget.option(\"active\", parseInt(value));\n    }\n  },\n  onBind: function(value) {\n    this.baseApply(arguments);\n    var anchor,\n      base = window.location.href.replace(/#.*$/, '');\n    $('ul>li>a[href^=\"#\"]', this.mainElem).each(function () {\n      anchor = $(this);\n      anchor.attr('href', base + anchor.attr('href'));\n    });\n    tabsAccordionOnBind.call(this);\n  },\n  getValue: function() { // Helper: get the index of the currently selected tab\n    return this.widget.options.active;\n  }\n}\n\n};\n\n$.views.tags(tagDefs);\n\n// ============================= BUTTON AND BUTTONSET =============================\nif ($.ui.version.slice(0, 4) === \"1.11\") {\n  // Add backward compatibility for {{buttonset}} and {{button}}\n  tagDefs.button = {\n    baseTag: \"widget\",\n    widgetName: \"button\",\n    elem: \"button\",\n    setSize: true,\n    contentCtx: true,\n    init: function(tagCtx, linkCtx) {\n      var template,\n        tag = this,\n        content = tagCtx.tmpl,\n        props = tagCtx.props,\n        id = props.id,\n        parent = tag.parent;\n\n      if (tag._.radio = parent && parent.tagName === \"buttonset\") {\n        tagCtx = parent.tagCtx;\n      } else {\n        tag._.chkBx = (tag.inline ? props : linkCtx.elem).type === \"checkbox\";\n      }\n\n      var  params = tagCtx.params,\n        paramprops = params.props || {};\n\n      tag.baseApply(arguments);\n\n      if (tag.inline) {\n        content = content && content.markup || \"&nbsp;\";\n        // (&nbsp; fixes a jQueryUI button rendering issue)\n        if (tag._.radio || tag._.chkBx) {\n          id = id || \"jsv\" + Math.random();\n          template = '<input id=\"' + id + '\" data-link=\"' + params.args[0] \n            + (paramprops.convert ? \" convert=\" + paramprops.convert : \"\")\n            + (paramprops.convertBack ? \" convertBack=\" + paramprops.convertBack : \"\")\n            + (tag._.radio\n              ? '\" name=\"' + parent.id + '\" type=\"radio\" value=\"' + props.value + \n                '\"/><label for=\"' + id + '\">' + content + '</label>'\n              : '\" type=\"checkbox\"/><label for=\"' + id + '\">' + content + '</label>');\n        } else {\n          template = \"<button>\" + content + \"</button>\";\n        }\n        tag.template = template;\n      }\n    },\n    onAfterLink: function(tagCtx, linkCtx) {\n      var tag = this,\n        elem = linkCtx.elem,\n        val = tag.bndArgs()[0];\n\n      if (tag._.radio || tag._.chkBx) {\n        if (!tag.inline) {\n          if (tag._.unlinked && !elem.id) {\n            elem.id = \"jsv\" + Math.random();\n            $(elem).after('<label for=\"' + elem.id + '\">&nbsp;</label>');\n          }\n          elem.checked = tag._.radio\n            ? (elem.name = tag.parent.id, val === elem.value)\n            : val && val !== \"false\";\n        }\n\n        tag.baseApply(arguments);\n\n        elem = tag.mainElem[0];\n\n        if (tag._.radio) {\n          // Use {^{button value=\"xxx\"}}Label{{/button}}\n          if (elem.value === \"undefined\") {\n            // Default, for {^{button}}xxx{{/button}} or {^{button _label=\"xxx\"/}}\n            elem.value = tag.widget.options.label; \n          }\n          elem.checked = val === elem.value;\n        } else {\n          elem.checked = val && val !== \"false\";\n        }\n\n        if (tag._.chkBx) {\n          tag.widget.refresh();\n        }\n      } else {\n        if (!tag.inline) {\n          elem.innerHTML = elem.innerHTML || \"&nbsp;\"; // Fixes jQuery UI button issue if no label text\n        }\n        tag.baseApply(arguments);\n      }\n    }\n  };\n\n  tagDefs.buttonset = {\n    baseTag: \"widget\",\n    widgetName: \"buttonset\",\n    setSize: true,\n    contentCtx: true,\n    init: function(tagCtx) {\n      var id,\n        tag = this;\n\n      tag.baseApply(arguments);\n\n      if (tag.inline) {\n        tag.id = tagCtx.props.id || \"jsv\" + Math.random();\n        tag.template = '<span id=\"' + tag.id + '\">' + tagCtx.tmpl.markup + \"</span>\";\n      }\n    },\n    onAfterLink: function(tagCtx, linkCtx) {\n      var tag = this,\n        elem = linkCtx.elem,\n        val = tag.bndArgs()[0];\n      tag.baseApply(arguments);\n      tag.widget.buttons.each(function(i, elem) {\n        elem.checked = val === elem.value;\n        $(elem).button(\"refresh\");\n      });\n    }\n  };\n}\n\n// Compile tags\n$.views.tags(tagDefs);\n\nfunction unlinkedClone() {\n  // Ensure that cloned element (and its contents) created by jQuery UI to show dragging\n  // element does not have any data-jsv tokens (since deleting the element would then\n  // remove those views associated with the original element)\n  var clone = $(this).clone();\n  clone.find(\"*\").addBack().removeAttr( \"id data-link data-jsv data-jsv-df\" );\n  clone.find(\"script\").remove();\n  return clone;\n}\n\n// ============================= DRAGGABLE =============================\nif ($.ui.draggable) {\n  // Create derived draggable widget\n  $.widget(\"jsv.draggable\", $.ui.draggable, {\n    _createHelper: function() {\n      if (this.options.helper === \"clone\") {\n        this.options.helper = unlinkedClone;\n      }\n      return this._super();\n    }\n  });\n\n  $.views.tags(\"draggable\", {\n    baseTag: \"widget\",\n    widgetName: \"jsv-draggable\",\n    bindTo: [\"left\", \"top\"],\n    linkedCtxParam: [\"left\", \"top\"],\n    elem: \"div\",\n    wrap: true,\n    setSize: true,\n    contentCtx: true,\n    options: function() {\n      var tag = this;\n      return {\n        drag: function(evt, ui) {\n          tag.updateValues(ui.offset.left, ui.offset.top, true); // Async update\n          if (tag.convert) {\n            tag.setValues(ui.offset.left, ui.offset.top);\n          }\n        }\n      };\n    },\n    setValue: function(value, index) {\n      if (value === undefined) {\n        this.ctxPrm(this.linkedCtxParam[index], this.getValue()[index]);\n      } else {\n        // Set new position (offset left/top) to ui.offset.left/top (and include effect of margin, if set)\n        var offset = {},\n          topLeft = index ? \"top\" : \"left\";\n        offset[topLeft] = value + parseInt(this.mainElem.css(\"margin-\" + topLeft));\n        this.mainElem.offset(offset);\n      }\n    },\n    getValue: function() {\n      var position = this.mainElem.position();\n      return [position.left, position.top];\n    }\n  });\n}\n\n// ============================= ACCORDION =============================\nif ($.ui.accordion) {\n  // Create derived accordion widget\n  $.widget(\"jsv.accordion\", $.ui.accordion, {\n    _create: function() {\n      var options = this.options;\n      if (options.header + \"\" === options.header) {\n        options.header = options.header.replace(\":not(li):even\", \":not(li,script):even\");\n      }\n      this._super();\n    }\n  });\n\n  $.views.tags(\"accordion\", {\n    baseTag: \"widget\",\n    widgetName: \"jsv-accordion\",\n    wrap: true,\n    setSize: true,\n    contentCtx: true,\n    options: tabsAccordionOptions,\n    initOptions: [\"header\"], // Options which need to be set on creation, not later\n    onBind: function(value) {\n      this.baseApply(arguments);\n      tabsAccordionOnBind.call(this);\n    },\n    setValue: function(value) {\n      if (value !== undefined) {\n        // Select the tab whose index is the currently selected one\n        this.widget.option(\"active\", parseInt(value));\n      }\n    },\n    getValue: function() { // Helper: get the index of the currently selected panel\n      return this.widget.options.active;\n    }\n  });\n}\n\n// ============================= SORTABLE =============================\nif ($.ui.sortable) {\n  $.widget(\"jsv.sortable\", $.ui.sortable, {\n    _create: function() {\n      var innerView, moveFrom,\n        widget = this,\n        startOption = widget.options.start,\n        stopOption = widget.options.stop;\n\n      widget.option({\n        start: function(event, ui) {\n          startOption && startOption.apply(this, arguments);\n\n          if (widget.options.bindArray !== false) {\n            innerView = ui.item.view(); // The view of the item that is being dragged\n            if (innerView.type === \"item\") {\n              // The sortable items are within a {{for}} loop, so this is a data-linked sortable list\n              moveFrom = innerView.index + 1; // 1-based starting index of dragged item\n            }\n          }\n        },\n        stop: function(event, ui) {\n          var moveTo;\n\n          if (moveFrom) {\n            // This is a data-linked sortable list\n            moveTo = ui.item.prevAll(ui.item[0].tagName).length; // The new index after\n            // being dragged (count of previous siblings of same tagName)\n            widget.cancel(); // Now cancel the DOM changes, since we are data-driven,\n            // and should use JsViews data-linking to move the sorted items\n            $.observable(innerView.parent.data).move(moveFrom-1, moveTo); // Make the equivalent\n            // observable change to the underlying data\n            moveFrom = undefined;\n            // Remove the starting index, ready for new sorting actions on this sortable list\n          }\n          stopOption && stopOption.apply(this, arguments);\n        }\n      });\n      widget._super();\n    }\n  });\n\n  $.views.tags(\"sortable\", {\n    baseTag: \"widget\",\n    widgetName: \"jsv-sortable\",\n    wrap: true,\n    contentCtx: true,\n  });\n}\n\n// ============================= SELECTABLE =============================\nif ($.ui.selectable) {\n  $.widget(\"jsv.selectable\", $.ui.selectable, {\n    _create: function() {\n      var widget = this;\n\n      widget.options.filter += \":not(script)\";\n      widget._super();\n    }\n  });\n\n  $.views.tags(\"selectable\", {\n    baseTag: \"widget\",\n    widgetName: \"jsv-selectable\",\n    wrap: true,\n    setSize: true,\n    contentCtx: true,\n    options: function() {\n      var tag = this;\n      return {\n        stop: function(evt, ui) {\n          tag.setSelectedItems();\n        }\n      };\n    },\n    initOptions: [\"filter\"], // Options which need to be set on creation, not later\n    onBind: function() {\n      var tag = this;\n      tag.selected = []; // Value of first arg (after applying converter, if there is one)\n\n      function selObs(ev, eventArgs) {\n        if (!eventArgs.refresh) {\n          tag.setSelection();\n        }\n      }\n\n      tag.selObs = selObs; // Store function instance, for disposing of just this binding, in onDispose\n      tag.baseApply(arguments);\n      tag.mainElem.on(\"jsv-domchange.sel\", function() {\n        tag.widget.refresh();\n        tag.selected._domChg = 2;\n        tag.setSelectedItems();\n        tag.selected._domChg = undefined;\n      });\n    },\n    onDispose: function() {\n      $.unobserve(this.selected, this.selObs);  // Remove just this binding to selected array\n    },\n    setValue: function(selected) { // Set the new observed array of selected indices\n      var tag = this;\n      if (selected !== undefined && $.isArray(selected) && tag.selected !== selected) {\n        $.unobserve(tag.selected, tag.selObs);\n        tag.selected = selected;\n        $.observe(selected, tag.selObs);\n        tag.setSelection();\n      }\n    },\n    getValue: function() {\n      return this.selected;\n    },\n    setSelection: function() {\n      // Set the class on the new selected elements (based on tag.selected array of indices)\n      var tag = this,\n        l = tag.selected.length;\n      if (!tag.selected._domChg) {\n        // No need to update if during a domchange event - only if a selectable change event\n        // Remove selected class from all selectable elements\n        tag.widget.selectees.removeClass(\"ui-selected\");\n        while (l--) {\n          // Set selected class on elements at indices in tag.selected array\n          tag.widget.selectees.eq(tag.selected[l]).addClass(\"ui-selected\");\n        }\n      }\n    },\n    setSelectedItems: function() {\n      // Set observable selectedItems array based on selected elements managed by widget\n      var tag = this,\n        selected = [];\n      if (tag.selected && tag.selected._domChg !== 1) {\n        if (tag.selected._domChg) {\n          // Avoid race conditions when multiple selectables bind to same selected array\n          tag.selected._domChg--;\n        }\n        tag.widget.selectees.each(function(index, elem) {\n          if ((' ' + elem.className + ' ').indexOf(' ui-selected ') > -1) {\n            selected.push(index); // This is the index of a selected element\n          }\n        });\n        tag.setValue(tag.selected); // Update the tag to bind to the new selected array\n        $.observable(tag.selected).refresh(selected); // Refresh to the new selected indices\n      }\n    }\n  });\n}\n})(this, this.jQuery);\n\n<h3>JsViews 'slider' tag control. Top-level binding: data-link=\"{slider}\" and data-linked SVG elements</h3>\r\n\r\n<h4>Top-level data-linked SVG:</h4>\r\n\r\n<svg data-link=\"css-width{: 2 + size*2}\" class=\"svg-circles\">\r\n  <circle data-link=\"r{:size} cx{:size + 1}\"\r\n    class=\"svg-circle\" cy=\"51\" stroke-width=\"2\" stroke=\"green\"></circle>\r\n  <circle data-link=\"r{:size*3/4} cx{:size + 1} cy{:102 - size*3/4}\"\r\n    class=\"svg-circle\" stroke=\"#aaa\"></circle>\r\n  <circle data-link=\"r{:size/2} cx{:size + 1} cy{:size/2}\"\r\n    class=\"svg-circle\" stroke=\"#aaa\"></circle>\r\n  <circle data-link=\"r{:size/4} cx{:size + 1}\"\r\n    class=\"svg-circle\" cy=\"51\" stroke-width=\"2\" stroke=\"blue\"></circle>\r\n</svg>\r\n\r\n<h4>Top-level data-linked slider</h4>\r\n\r\n<div data-link=\"{slider size _range='min' _min=1 _max=200 width=400}\"></div>\r\n\r\n<h4>Size:</h4>\r\n\r\n<input type=\"text\" data-link=\"{:size:tonum}\" />\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Other interesting top-level data-linking samples are\n\nthis version of the editable data samples\nthe shopping cart sample (top-level data-linking version)\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
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
        "text": "Top-level programmatic data-linking\n \n   CEO\n  \n\n  Employees: \n\n   \n\n\n$.templates(\"nameTmpl\", \"Name: {{:first}} {{:last}}\");\n\nvar person = {\n  isCEO: true,\n  employees: [\n    {first: \"Mary\", last: \"A\"},\n    {first: \"Hank\", last: \"B\"}\n  ]};\n\n$.link(\n  \"css-color{:isCEO ? 'green' : 'blue'}\", // expression\n  \"#group\", // target\n  person // data\n);\n\n$.link(\n  \"isCEO\", // expression\n  \"input.ceo\", // target\n  person // data\n);\n\n$.link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  \"#employees\", // target\n  person // data\n);\n\n$.link(\n  \"visible{:!isCEO} {:~message}\", // expression\n \"#notCeo\", // target\n  person, // data \n  {message: \"(Not CEO!)\"} // helpers\n);\n\nApply data-link expression to <input>, for two-way binding to isCEO data property:\n$.link(\n  \"isCEO\", // expression\n  \"input.ceo\", // target\n  person // data\n);\n\nApply {for...} and visible:{:...} data-link binding expressions to #employees <div>:\n$.link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  \"#employees\", // target\n  person // data\n);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the same example, using the alternative syntax: $(target).link(expression, data, helpers);\n"
      },
      {
        "_type": "sample",
        "title": "Top-level programmatic data-linking <span style=\"font-style:normal;\">(alternative syntax)</span>",
        "text": "Top-level programmatic data-linking (alternative syntax)\n \n   CEO\n  \n\n  Employees: \n\n   \n\n\n$.templates(\"nameTmpl\", \"Name: {{:first}} {{:last}}\");\n\nvar person = {\n  isCEO: true,\n  employees: [\n    {first: \"Mary\", last: \"A\"},\n    {first: \"Hank\", last: \"B\"}\n  ]};\n\n$(\"#group\").link(\n  \"css-color{:isCEO ? 'green' : 'blue'}\", // expression\n  person // data\n);\n\n$(\"input.ceo\").link(\n  \"isCEO\", // expression\n  person // data\n);\n\n$(\"#employees\").link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  person // data\n);\n\n$(\"#notCeo\").link(\n  \"visible{:!isCEO} {:~message}\", // expression\n  person, // data \n  {message: \"(Not CEO!)\"} // helpers\n);\n\nApply data-link expression to <input>, for two-way binding to isCEO data property:\n$(\"input.ceo\").link(\n  \"isCEO\", // expression\n  person // data\n);\n\nApply {for...} and visible:{:...} data-link binding expressions to #employees <div>:\n$(\"#employees\").link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  person // data\n);\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "link2way": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews provides two-way binding on:\n\ntextboxes (<input/> type: ‘text’)\ncheckboxes (<input/> type: ‘checkbox’)\nradio buttons  (<input/> type: ‘radio’)\nselect elements\ntextareas\ncontenteditable elements\nIn addition, custom tags can support two-way binding\n\nTwo-way binding consists of:\n\na from binding: – whenever the underlying data changes (observably) the displayed value will update\na to binding: – when the user modifies the value, this will trigger an observable change in the underlying data\n\nOn two-way binding you can also specify:\n\nconvert and convert back converters\ntrigger on change or on keydown\nusing a different linkTo target\n\n"
      },
      {
        "_type": "sample",
        "title": "Two way binding",
        "text": "Two way binding\n\n\n\n  <input data-link=\"name\" class=\"block\"/>\n\n  <label class=\"block\"><input data-link=\"{toBool:gender:toString}\" type=\"checkbox\" /> Male</label>\n\n  <div class=\"block\" data-link=\"{radiogroup gender}\">\n    <label><input value=\"male\" type=\"radio\" /> Male</label><br/>\n    <label><input data-link=\"gender\" value=\"female\" type=\"radio\" /> Female</label>\n  </div>\n\n  <select data-link=\"gender\" class=\"block\">\n    <option value=\"male\">Male</option>\n    <option value=\"female\">Female</option>\n  </select>\n\n  <textarea data-link=\"name\" class=\"block\"></textarea>\n\n  <div class=\"block\">\n    <span data-link=\"{encode:name:unencode}\" contenteditable=\"true\"></span>\n  </div>\n\n  <div class=\"block\">\n    {^{textbox name label=\"Name:\"/}}\n  </div>\n\n  <hr/>\n\n  <div class=\"green\"><b>person:</b> {^{>name}} {^{>gender}}</div>\n\n$.views.converters({\n  toString: function(val) {\n   return val ? 'male' : 'female';\n  },\n  toBool: function(val) {\n    return val === 'male';\n }\n});\n\n$.views.tags({\n  textbox: {\n    onBind: function() {\n      // Find input in contents\n      this.linkedElem = this.contents(\"input\");\n    },\n    onUpdate: false, // No need to re-render whole tag, when content updates.\n    template: \"{{:~tagCtx.props.label}} \"\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo\", gender: \"male\"};\n\ntmpl.link(\"#result\", person);\n\n<input data-link=\"name\"/>\n\n<label><input data-link=\"{toBool:gender:toString}\" type=\"checkbox\" /> Male</label>\n\n<div data-link=\"{radiogroup gender}\">\n  <label><input value=\"male\" type=\"radio\" /> Male</label>\n  <label><input value=\"female\" type=\"radio\" /> Female</label>\n</div>\n\n<select data-link=\"gender\">\n  <option value=\"male\">Male</option>\n  <option value=\"female\">Female</option>\n</select>\n\n<textarea data-link=\"name\"></textarea>\n\n<span data-link=\"{encode:name:unencode}\" contenteditable=\"true\"></span>\n\n{^{textbox name/}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Abbreviated syntax and full syntax for data-link",
        "text": "Abbreviated syntax and full syntax for data-link\nNotice that on the above elements, the data-link=\"name\" syntax automatically has two-way data-binding.\nThe full syntax for two-way binding is data-link=\"{:name:}\". See Data-linked elements for syntax details.\nNote: To specify one-way binding only, use the full syntax, but without the final colon: data-link=\"{:name}.\n"
      },
      {
        "_type": "para",
        "title": "Converters: convert and convert back ",
        "text": "Converters: convert and convert back \nWith two way bindings, you can use a converter for each direction (from/to) of the binding: convert for converting from data to the rendered value, and convert back for converting from the user input back to the data.\nIn the sample above the checkbox example is using converters. Without converters the checkbox binds to a Boolean data value. Here, converters allow it to bind instead to gender which is a string with values \"male\"/\"female\":\n<input data-link=\"{toBool:gender:toString}\" type=\"checkbox\" />\n\nThe alternative syntax for using converters on other tags also extends to convert back – so you can write:\ndata-link=\"... convert=... convertBack=...\n\nYou can set convert and convertBack to a converter name, or a function such as a helper or data method. Here is a modified version of the previous sample, using the convertBack-=... syntax, in this case set to helper functions:\n"
      },
      {
        "_type": "sample",
        "title": "Two-way binding &ndash; using helpers as converters",
        "text": "Two-way binding – using helpers as converters\n.block {display: block; margin-bottom: 10px} .green {color: green;}\n\n\n\n\n  <label class=\"block\">\n  <input data-link=\"gender convert=~toBool convertBack=~toString\" type=\"checkbox\" />\n  Male</label>\n\n  <div class=\"block\" data-link=\"{radiogroup gender}\">\n    <label><input value=\"male\" type=\"radio\" /> Male</label><br/>\n    <label><input value=\"female\" type=\"radio\" /> Female</label>\n  </div>\n\n  <hr/>\n\n  <div class=\"green\">{^{>gender}}</div>\n\nvar helpers = {\n  toString: function(val) {\n   return val ? 'male' : 'female';\n  },\n  toBool: function(val) {\n    return val === 'male';\n }\n};\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {gender: \"male\"};\n\ntmpl.link(\"#result\", person, helpers);\n\n<input data-link=\"gender convert=~toBool convertBack=~toString\" type=\"checkbox\" />\n\n\n"
      },
      {
        "_type": "para",
        "title": "Converter function signature",
        "text": "Converter function signature\nBoth the convert and the convertBack converter functions are invoked with the tag instance as this pointer -– as described in this JsRender topic: Converter function signature. So within a converter function you can access this.tagCtx, this.linkCtx, etc. and from there reach many useful properties and objects.\n"
      },
      {
        "_type": "para",
        "title": "<b>Additional advanced two-way  binding scenarios:</b>",
        "text": "Additional advanced two-way  binding scenarios:\n"
      },
      {
        "_type": "para",
        "title": "Triggering the two-way binding on <b>blur</b>, rather than on <b>keydown</b>",
        "text": "Triggering the two-way binding on blur, rather than on keydown\nIn the case of textboxes (or any other two-way data-linked element that takes character entry such as the textarea, contenteditable and some custom tags like as the {^{textbox}} example above), you can choose when the to binding updates the underlying data:\n\nWith trigger=true (default setting), changes to the underlying data are triggered as you type (on character entry – the keydown event, or for compatible browsers, the input event)\nWith trigger=false, changes to the underlying data are made on leaving the textbox (the change or blur event)\n\nThe trigger setting can be modified:\n\nglobally, by using: $.views.settings.trigger(…):\n$.views.settings.trigger(false); \n\non each tag or element by writing:\n<input data-link=\"name trigger=false\"/> \n{^{textbox name trigger=false}}\n\n\nIn fact you can also set trigger to a string with one or more white-space separated event names, such as:\n<input data-link=\"name trigger='keyup mouseup'\"/>`\n\n– but generally only the values true (actually equivalent to trigger='keydown') and false are useful.\n"
      },
      {
        "_type": "para",
        "title": "linkTo: Linking from/to different underlying data",
        "text": "linkTo: Linking from/to different underlying data\nIt can sometimes be useful to be able to choose different targets for the from and to bindings of a two-way bound element such as a textbox. This is possible by setting the linkTo attribute to the desired target data for the to binding.\nIn the following sample an <input/> and a <select> are bound to settings.current (from binding) and to settings.modified (to binding, using linkTo):\n<input data-link=\"current.title linkTo=modified.title\" />\n\nNote that linkTo can also be used with the full syntax, and optionally with converters as in:\n<input data-link=\"{cvt:current.title linkTo=modified.title:cvtBk\" />\n\nThe user can choose the Apply button (or hit Enter, for the submit action of the form) to copy values over from modified to current. Cancel reverts the input/select back to the current data:\n"
      },
      {
        "_type": "sample",
        "title": "linkTo",
        "text": "linkTo\n\n\n\n<b>Current settings:</b>\n<span class=\"title\" data-link=\"\n  css-border-color{:current.color}\n  css-color{:current.color}\n  {:current.title}\n\"></span><br/>\n\n<form data-link=\"{on 'submit' apply}\">\n  <em>Modify settings:</em><br/><br/>\n  Color:\n  <select data-link=\"current.color linkTo=modified.color\">\n    <option>red</option>\n    <option>green</option>\n  </select><br/>\n  Name:\n  <input data-link=\"current.title linkTo=modified.title\" />\n  <hr />\n  Modified settings:\n  <span class=\"title\" data-link=\"\n    css-border-color{:modified.color}\n    css-color{:modified.color}\n    {:modified.title}\n  \"></span><br/>\n  <button type=\"submit\">Apply</button>\n  <button data-link=\"{on cancel}\">Cancel</button><br/>\n</form><br/>\n\n<em>Underlying data:</em><br/>{^{jsonview noFunctions=true/}}\n\n\nvar settings = {\n  current: {title: \"My title\", color:\"green\"},\n  modified: {title: \"My title\", color:\"green\"},\n  apply: function() {\n    $.observable(this.current).setProperty(this.modified);\n    return false;\n  },\n  cancel: function() {\n    $.observable(this.modified).setProperty(this.current);\n    $.observable(this.current).setProperty({title: \"\", color: \"\"});\n  }\n}\n\nvar myTmpl = $.templates(\"#myTmpl\");\n\nmyTmpl.link(\"#result\", settings);\nColor: \n<select data-link=\"current.color linkTo=modified.color\">\n  ...\n</select>\n\nName:\n<input data-link=\"current.title linkTo=modified.title\" />\n\n\n"
      },
      {
        "_type": "para",
        "title": "Data-linking to/from multiple arguments, using convert and convertBack",
        "text": "Data-linking to/from multiple arguments, using convert and convertBack\nWhen data-linking binds from more than one argument (using a convert converter to combine values), then two-way binding can be made to bind back not just to the first argument, but to all of the arguments. This is achieved by providing a convert back converter which returns an array of values, one for each argument, and is shown in the following example:\n"
      },
      {
        "_type": "sample",
        "text": "\n  <input data-link=\"{toFull:first last:fromFull}\"/><br/><br/>\n\n  First: <em>{^{>first}}</em><br/>\n  Last: <b>{^{>last}}</b>\n\n\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = { first: \"Jo\", last: \"Blow\" };\n\n$.views.converters({\n  toFull: function(first, last) {\n    return first + \" \" + last;\n  },\n  fromFull: function(fullname) {\n    var names = fullname.split(\" \");\n    var last = names.pop();\n    var first = names.join(\" \"); \n    return [first, last]; // Return array for binding back to the two arguments\n  }\n});\n\nmyTmpl.link(\"#page\", data);\nData-link to two arguments, first and last:\n<input data-link=\"{toFull:first last:fromFull}\"/>\n\nConvert back converter fromFull returns an array:\n$.views.converters({\n  toFull: function(first, last) {\n    return first + \" \" + last;\n  },\n  fromFull: function(fullname) {\n    ...\n    return [first, last]; // Return array for binding back to the two arguments\n  }\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "Encoding to avoid XSS",
        "text": "Encoding to avoid XSS\nWhenever the user has access to the two-way editing feature, it is important to avoid any associated security risk that might arise from HTML injection, or XSS (cross-site-scripting) attacks.\nFor example, if UI such as <input data-link=\"someValue\" /> allows the user to edit someValue, then someValue should not be inserted directly into the HTML without encoding. In this scenario, the use of {^{:someValue}} is therefore to be avoided, and should be replaced with either {^{>someValue}} or {^{encode:someValue}}.\nWhen using content-editable elements with two-way binding, they should generally be associated with encode/unencode converters: data-link=\"{encode:someValue:unencode}\":\nSimilarly if the initial data from the server is untrusted, then direct rendering of unencoded values by the template should be avoided, and in particular {{:someValue}} should not be used, and should be replaced by {{>someValue}} or [{{encode:someValue}}](#convertersapi@encode)\nThese scenarios are illustrated in the following sample, which starts with some ‘dangerous’ data, and also allows the user to modify or insert HTML markup in the person.name property. However the correct use of encoding prevents the HTML markup from being inserted ‘as is’ into the DOM.\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n  <code>&lt;input data-link=\"name\"/&gt;:</code>\n  <input data-link=\"name\" class=\"block\"/>\n\n  <code>&lt;div contenteditable=\"true\" data-link=\"{encode:name:unencode}\"&gt;:</code>\n  <div contenteditable=\"true\" data-link=\"{encode:name:unencode}\"></div>\n\n  <code>&lcub;^{>name}&rcub;:</code>\n  <span class=\"box\"> \n    {^{>name}}\n  </span>\n\n  <code>&lcub;^{encode:name}&rcub;:</code>\n  <span class=\"box\">\n    {^{encode:name}}\n  </span>\n\n  <code>&lt;div data-link=\"name\"&gt;:</code>\n  <span class=\"box\">\n    <div data-link=\"name\"></div>\n  </span>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: 'Jo '};\n\ntmpl.link(\"#result\", person);\n\nEditable UI elements:\n<input data-link=\"name\"/>\n\n<div contenteditable=\"true\" data-link=\"{encode:name:unencode}\"></div>\n\n‘Safe’ rendering:\n{^{>name}}\n\n{^{encode:name}}\n\n<div data-link=\"name\"></div>\n\n\n"
      }
    ]
  },
  "linked-paths": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "A data-linked template may include chained paths such as manager.address.ZIP which step through chained object properties:\n<input data-link=\"manager.address.ZIP\" />\n\n{^{if manager.address.ZIP}}\n  ZIP: {^{:manager.address.ZIP}}\n{{/if}}  \n\n"
      },
      {
        "_type": "para",
        "title": "Data-linking to deep changes in the path ('deep linking')",
        "text": "Data-linking to deep changes in the path ('deep linking')\nThe chained paths can be in the data-link=\"...\" expression of data-linked elements or in data-linked tags: {^{...}}. Either way, the template data-binding will automatically ‘listen’ to observable changes in the leaf property (ZIP in this case).\nBut sometimes you may want your template to respond dynamically to changes on objects higher up in the path (deep changes on the path). You can specify this by a simple syntax change: replace a . with a ^ at the level up to which you want to listen to changes.\nFor example, write manager.address^ZIP in order to respond not only to leaf changes (to ZIP) but also to observable changes in the address property of the manager. And write manager^address.ZIP in order to data-bind also to changes where the manager property of the top-level team object is swapped observably to another manager object.\n(If you know that in your app the objects higher up the path will never change dynamically, then stick with the default leaf binding, since that will provide better perf optimization…)\nSee also the related discussion and examples on using $.observe() with deep changes.\nHere it is in a sample, with leaf binding only. Editing the ZIP or clicking “Change leaf values” triggers template updates. But clicking “Change manager” does not work.\nClick on Try it and change paths to manager^address.ZIP – and see how “Change manager” now works.\n"
      },
      {
        "_type": "sample",
        "title": "Leaf binding only",
        "text": "Leaf binding only\n\n  Change leaf values\n  Change manager\n  \n\n\n\n\n<input data-link=\"manager.address.ZIP\" />\n\n{^{if manager.address.ZIP}}\n  ZIP: {^{>manager.address.ZIP}}\n{{/if}}\n\n<hr/>\n\nManager: {^{if manager === person1}}person1{{else}}person2{{/if}}\n\n\nvar team = {\n  person1: {\n    address: {\n      City: \"New York\",\n      ZIP: \"10035\"\n    }\n  },\n  person2: {\n    address: {\n      City: \"London\"\n    }\n  }\n};\n\nteam.manager = team.person1;\n\n\n$(\"#modifyLeaf\").on(\"click\", function() {\n  $.observable(team.manager.address).setProperty({\n    \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n  });\n});\n\n$(\"#changeManager\").on(\"click\", function() {\n  $.observable(team).setProperty({\n    manager: team.manager === team.person1 ? team.person2 : team.person1\n  });\n});\n\nvar tmpl = $.templates(\"#managerTmpl\");\n\ntmpl.link(\"#result\", team);\n<input data-link=\"manager.address.ZIP\" />\n\n{^{if manager.address.ZIP}}\n  ZIP: {^{>manager.address.ZIP}}\n{{/if}}\n\nModify leaf: template values update in response:\n$.observable(team.manager.address).setProperty({\n  \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n});\n\nChange manager: template values do not update:\n$.observable(team).setProperty({\n  manager: team.manager === person1 ? person2 : person1\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is the same sample but with the deep path binding to manager: manager^address.ZIP\n"
      },
      {
        "_type": "sample",
        "title": "Data-linking to deep changes",
        "text": "Data-linking to deep changes\n\n  Change leaf values\n  Change manager\n  \n\n\n\n\n<input data-link=\"manager^address.ZIP\" />\n\n{^{if manager^address.ZIP}}\n  ZIP: {^{>manager^address.ZIP}}\n{{/if}}\n\n<hr/>\n\nManager: {^{if manager === person1}}person1{{else}}person2{{/if}}\n\n\nvar team = {\n  person1: {\n    address: {\n      City: \"New York\",\n      ZIP: \"10035\"\n    }\n  },\n  person2: {\n    address: {\n      City: \"London\"\n    }\n  }\n};\n\nteam.manager = team.person1;\n\n\n$(\"#modifyLeaf\").on(\"click\", function() {\n  $.observable(team.manager.address).setProperty({\n    \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n  });\n});\n\n$(\"#changeManager\").on(\"click\", function() {\n  $.observable(team).setProperty({\n    manager: team.manager === team.person1 ? team.person2 : team.person1\n  });\n});\n\nvar tmpl = $.templates(\"#managerTmpl\");\n\ntmpl.link(\"#result\", team);\n<input data-link=\"manager^address.ZIP\" />\n\n{^{if manager^address.ZIP}}\n  ZIP: {^{>manager^address.ZIP}}\n{{/if}}\n\nModify leaf (ZIP) or manager: template values all update correctly in response\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is a variant of the same demo, showing changes to all three levels of manager^address.ZIP: ZIP, address and manager.\n"
      },
      {
        "_type": "sample",
        "title": "Data-linking to deep changes (three levels)",
        "text": "Data-linking to deep changes (three levels)\n\n  Change leaf values\n  New address\n  UK address\n  Change manager\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"manager^name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"manager^address.street\" /></td></tr>\n    <tr>\n      {^{if manager^address.ZIP}}\n        <td>ZIP:</td><td><input data-link=\"manager^address.ZIP\" /></td>\n       {{else}}\n      <td colspan=\"2\">UK address - No ZIP</td>\n      {{/if}}\n    </tr>\n  </tbody></table>\n\nvar person1 = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\",\n    ZIP: \"34009\"\n  }\n};\n\nvar person2 = {\n  name: \"Henry\",\n  address: {\n    street: \"Trinity St\"\n  }\n};\n\nvar data = {\n  manager: person1\n};\n\n$(\"#modifyLeaf\").on(\"click\", function() {\n  $.observable(data.manager).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\",\n    \"address.ZIP\": \"45008\"\n  });\n});\n\n$(\"#changeAddress\").on(\"click\", function() {\n  $.observable(data.manager).setProperty(\n    \"address\", \n    {\n      street: \"New Street\",\n      ZIP: \"99999\"\n    }\n  );\n});\n\n$(\"#UKAddress\").on(\"click\", function() {\n  $.observable(data.manager).setProperty(\n    \"address\", \n    {\n      street: \"St James St\"\n    }\n  );\n});\n\n$(\"#changeManager\").on(\"click\", function() {\n  $.observable(data).setProperty({\n    manager: data.manager === person1 ? person2 : person1\n  });\n});\n\nvar tmpl = $.templates(\"#managerTmpl\");\n\ntmpl.link(\"#result\", data);\n{^{if manager^address.ZIP}}\n  <td>...<input data-link=\"manager^address.ZIP\" /></td>\n{{else}}\n  <td>...UK address - No ZIP</td>\n{{/if}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also this sample, showing similar deep linking but with computed get/set properties: data-link=\"manager()^address().ZIP()\")\n"
      },
      {
        "_type": "links",
        "title": "See also",
        "text": "See also\n"
      }
    ]
  },
  "link-computed": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Data-linking to computed observables can include:\n\ndata-linking to a computed value (as in this sample):\n<span data-link=\"person.fullName()\"></span>\n\ntwo-way data-linking to a get/set property (as in this sample):\n<input data-link=\"person.firstName()\" />\n\ndata-linking to a deep path that includes one or more computed values (as in this sample – where the displayed ZIP updates correctly when team.manager() changes):\n<span data-link=\"manager()^address().ZIP()\"></span>\n\ndata-linking to multiple targets as in:\n<input data-link=\"{:name():} placeholder{:namePlaceholder()}\" />\n\n– which has two-way data-linking to name() and data-linking of the placeholder target to namePlaceholder()\n\nSee:\n\nData / View Model\nComputed properties and computed observables\nSamples: fullName() – variants\nSamples: Shopping cart - totalAmount()\nCompiled VMs - Team manager sample\n\n"
      }
    ]
  },
  "link-targets": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The full syntax for data-linked elements is written like this:\n<elem data-link=\"target1{linkExpression1} ...\" ...>\n\nPossible targets include the following:\n\nan HTML attribute (such as title{...}, class{...}, id{...}, disabled{...} or data-foo{...}\n)\nan HTML element property (such as prop-muted{...} for a <video> element)\na CSS property (such as css-background-color{...})\ninnerHTML (as in html{...})\ninnerText (as in text{...})\nspecial targets like visible{...}\nor can be missing altogether (as in {...}) in which case it stands for the default target for the element.\n\nThe default target for most elements is innerText, but for input and select elements it is value.\nThe following topics provide details and examples of each type of target attribute:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "link-input": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This section shows data-linking to:\n\ntextboxes (<input/>)\ncheckboxes (<input type=\"checkbox\"/>)\nradio buttons  (<input type=\"radio\"/>)\n\n"
      },
      {
        "_type": "para",
        "title": "Data-linked textboxes",
        "text": "Data-linked textboxes\nThe following sample shows data-linked textboxes, with examples of two-way binding, one-way binding, and use of converters (convert and convert back).\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <input data-link=\"name\"/>\n  <em>Two-way</em><br/>\n\n  <input data-link=\"{upper:name:lower}\"/>\n  <em>Two-way with 'upper' and 'lower' converters (convert/convert back)</em><br/>\n\n  <input data-link=\"{:name}\"/>\n  <em>One-way</em><br/>\n\n  <input data-link=\"{upper:name}\"/>\n  <em>One-way with 'upper' converter</em><br/>\n\n  <input data-link=\"{upper:name trigger=false:lower}\"/>\n  <em>Two-way with convert/convert back (no trigger on keydown, only on blur)</em><br/>\n\n  <span class=\"spanbox\" data-link=\"name\"></span>\n  <em>Data-linked span</em>\n\n$.views.converters({\n  upper: function(val) {\n    return val.toUpperCase();\n  },\n  lower: function(val) {\n    return val.toLowerCase();\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo\"};\n\ntmpl.link(\"#result\", person);\nTwo-way:\n<input data-link=\"name\"/>\n\nTwo-way with ‘upper’ and ‘lower’ converters (convert/convert back):\n<input data-link=\"{upper:name:lower}\"/>\n\nOne-way:\n<input data-link=\"{:name}\"/>\n\nOne-way with ‘upper’ converter:\n<input data-link=\"{upper:name}\"/>\n\nTwo-way with convert/convert back – trigger=false (no trigger on keydown, only on blur):\n<input data-link=\"{upper:name trigger=false:lower}\"/>\n\nData-linked span:\n<span data-link=\"name\"></span>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Data-linked checkboxes",
        "text": "Data-linked checkboxes\nIn most scenarios using data-linked checkboxes, each checkbox is data-linked to a boolean data value.\nIt is also possible to data-link multiple checkboxes as a check box group – binding to a single data value of type array (generally an array of strings, one for each checked checkbox). See Data-linked checkbox groups, at the end of this topic, for details.\nThe following sample shows data-linked checkboxes, with examples of two-way binding, one-way binding, and use of converters (convert and convert back).\n"
      },
      {
        "_type": "sample",
        "title": "Data-linking a checkbox to a boolean data value",
        "text": "Data-linking a checkbox to a boolean data value\n\n\n\n  <label><input type=\"checkbox\" data-link=\"member\"/> Member</label>\n  <em>Two-way</em><br/>\n\n  <label><input type=\"checkbox\" data-link=\"{not:member:not}\"/> Non-member</label>\n  <em>Two-way with 'not' converters (convert/convert back)</em><br/>\n\n  <label><input type=\"checkbox\" data-link=\"{:member}\"/> Member</label>\n  <em>One-way</em><br/>\n\n  <label><input type=\"checkbox\" data-link=\"{not:member}\"/> Non-member</label>\n  <em>One-way with 'not' converter</em><br/>\n\n  <span class=\"spanbox\" data-link=\"member\"></span>\n  <em>Data-linked span</em><br/>\n\n  <span class=\"spanbox\" data-link=\"{if member tmpl='Member'}{else tmpl='Non-member'}\"></span>\n  <em>Data-linked span with if-binding</em><br/>\n\n  <span class=\"spanbox\">{^{if member}}Member{{else}}Non-member{{/if}}</span>\n  <em>Data-linked if/else tags</em><br/>\n\n$.views.converters({\n  not: function(val) {\n    return !val;\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {member: true};\n\ntmpl.link(\"#result\", person);\nTwo-way:\n<input type=\"checkbox\" data-link=\"member\"/>\n\nTwo-way with ‘not’ converters (convert/convert back):\n<input type=\"checkbox\" data-link=\"{not:member:not}\"/>\n\nOne-way:\n<input type=\"checkbox\" data-link=\"{:member}\"/>\n\nOne-way with ‘not’ converter:\n<input type=\"checkbox\" data-link=\"{not:member}\"/>\n\nData-linked span:\n<span class=\"spanbox\" data-link=\"member\"></span>\n\nData-linked span with if-binding:\n<span class=\"spanbox\" data-link=\"{if member tmpl='Member'}{else tmpl='Non-member'}\"></span>\n\nData-linked if/else tags:\n{^{if member}}Member{{else}}Non-member{{/if}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also Data-linked checkbox groups)\n"
      },
      {
        "_type": "para",
        "title": "Data-linked radio buttons",
        "text": "Data-linked radio buttons\nThe simplest way to provide two-way data-linking to a group of radio buttons is by wrapping the <input>s with a {^{radiogroup ...}} tag.\nAlternatively, it is also possible to data-link directly to the <input> elements.\n"
      },
      {
        "_type": "para",
        "title": "Samples in this section",
        "text": "Samples in this section\nThis topic includes the following radio-button samples showing data-linked radio buttons:\n\nTwo-way data-binding, with {{radiogroup}}\nTwo-way data-binding, linking directly to the input elements\nTop-level linking directly to the input elements\nTop-level with {radiogroup} binding\nData-driven by array data (in a {{for}} loop)\nData-driven by an editable array (in a {^{for}} loop)\nData-driven by an editable array – including id\nUsing converters\n\n"
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; two-way data-binding &ndash; using {^{radiogroup}}  ",
        "text": "Radio buttons – two-way data-binding – using {^{radiogroup}}  \nA radio button group will generally consist of a group of <input> elements of type \"radio\", each associated with a <label> (which either wraps the <input>, or references it by id, through the for=\"inputId\" attribute).\nTo data-link the radio buttons, wrap the <input> (and <label>) elements with a {^{radiogroup ...}} tag, linking to the appropriate data path such as the selectedCar property on the current data object:\n{^{radiogroup selectedCar}}\n\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  {^{radiogroup selectedCar}}\n    <label><input type=\"radio\" value=\"\"/>\n      None</label><br/>\n    <label><input type=\"radio\" value=\"vlv\"/>\n      Volvo</label><br/>\n    <label><input type=\"radio\" value=\"frd\"/>\n      Ford</label><br/>\n  {{/radiogroup}}\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedCar: \"frd\"};\n\ntmpl.link(\"#result\", data);\nData:\nvar data = {\n  selectedCar: \"frd\",\n  ...\n};\n\nHTML:\n{^{radiogroup selectedCar}}\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  <label><input type=\"radio\" value=\"vlv\"/> Volvo</label>\n  <label><input type=\"radio\" value=\"frd\"/> Ford</label>\n{{/radiogroup}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; data-binding directly to the &lt;inputs>",
        "text": "Radio buttons – data-binding directly to the <inputs>\nIt is also possible to data-link directly to <input> elements, without using a {{radiogroup}} tag, by:\n\ndata-linking each <input> directly (each to the same data path, such as data-link=\"selectedCar\")\nincluding a name attribute on each <input> of the group (such as name=\"cars\")\n\n<label><input name=\"cars\" type=\"radio\" value=\"vlv\" data-link=\"selectedCar\"/> ...\n\nNote that setting the name attribute was not necessary when using {{radiogroup}} – since the {{radiogroup}} tag will automatically add a generated name property to each <input>, if none has been specified).\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n  <label><input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selectedCar\"/>\n    None</label><br/>\n  <label><input name=\"cars\" type=\"radio\" value=\"vlv\" data-link=\"selectedCar\"/>\n    Volvo</label><br/>\n  <label><input name=\"cars\" type=\"radio\" value=\"frd\" data-link=\"selectedCar\"/>\n    Ford</label><br/>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedCar: \"frd\"};\n\ntmpl.link(\"#result\", data);\nData:\nvar data = {\n  selectedCar: \"frd\",\n  ...\n};\n\nHTML:\n<label><input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selectedCar\"/> None ...\n<label><input name=\"cars\" type=\"radio\" value=\"vlv\" data-link=\"selectedCar\"/> Volvo ...\n<label><input name=\"cars\" type=\"radio\" value=\"frd\" data-link=\"selectedCar\"/> Ford ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "Top-level data-linking of radio buttons",
        "text": "Top-level data-linking of radio buttons\nFor top-level data-linking, there are two alternatives:\n\nTop-level data-linked <input> elements (using direct data-linking as in the previous example)\nTop-level {radiogroup} binding (shown also here)\n\nThe following two samples show those two approaches:\n"
      },
      {
        "_type": "sample",
        "title": "Top-level data-linked &lt;input> elements",
        "text": "Top-level data-linked <input> elements\n\n  \n    None\n  \n    Volvo\n  \n    Ford\n\n  \n\nvar data = {selectedCar: \"frd\"};\n\n$.link(true, \"#top-level-linked\", data);\n<div id=\"top-level-linked\">\n  <label><input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selectedCar\"/> None...\n  ...\n\nvar data = {selectedCar: \"frd\"};\n$.link(true, \"#top-level-linked\", data);\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Top-level {radiogroup ...} binding",
        "text": "Top-level {radiogroup ...} binding\n\n  \n    \n      None\n    \n      Volvo\n   \n      Ford\n  \n\n  \n\nvar data = {selectedCar: \"frd\"};\n\n$.link(true, \"#top-level-linked\", data);\n\n<div id=\"top-level-linked\">\n  <div data-link=\"{radiogroup selectedCar}\">\n    <label><input type=\"radio\" value=\"\"/> None...\n    ...\n\nvar data = {selectedCar: \"frd\"};\n$.link(true, \"#top-level-linked\", data);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; in {{for}} loop with array",
        "text": "Radio buttons – in {{for}} loop with array\nIn this example, a cars array has values for the displayed name and for the corresponding id (used as key, and data-linked to the selectedCar property).\nWe provide a first radio button for the ‘unselected’ case, and then loop through the array using {{for cars}} to provide a radio button for each item.\nWe wrap both the initial static radio button and the buttons rendered by {{for}} in a {{radiogroup}} tag providing two-way data-link binding.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  {^{radiogroup selectedCar}}\n    <label><input type=\"radio\" value=\"\"/> None</label><br/>\n    {{for cars}}\n      <label><input type=\"radio\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n    {{/for}}\n  {{/radiogroup}}\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);\nData includes cars array:\nvar data = {\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    ...\n  ]\n};\n\n{{radiogroup}} wrapping first ‘unselected’ radio button and additional data-driven array of radio buttons:\n{^{radiogroup selectedCar}}\n  <label><input type=\"radio\" value=\"\"/> None</label><br/>\n  {{for cars}}\n    <label><input type=\"radio\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n  {{/for}}\n{{/radiogroup}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; in {^{for}} loop with dynamic array",
        "text": "Radio buttons – in {^{for}} loop with dynamic array\nIn this example we allow the user to add and remove items from the array, and to change values such as name. The id value (used as key) is not editable.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <button data-link=\"{on add}\">Add car</button>\n  <table>\n    <tbody>\n      {^{for cars}}\n        <tr>\n          <td><input data-link=\"name\"/></td>\n          <td>{{:id}}</td>\n          <td><span class=\"remove\" data-link=\"{on ~root.remove #index}\"></span></td>\n        </tr>\n      {{/for}}\n    </tbody>\n  </table><br/>\n\n  {^{radiogroup selectedCar}}\n    <label><input type=\"radio\" value=\"\"/> None</label><br/>\n    {^{for cars}}\n      <label><input type=\"radio\" value=\"{{:id}}\"/> {^{:name}}</label><br/>\n    {{/for}}\n  {{/radiogroup}}<br/>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n\nvar idCount = 0;\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  add: function() {\n    idCount++;\n    var id = \"car\" + idCount;\n    $.observable(this.cars).insert({id: id, name: \"name\" + idCount});\n    $.observable(this).setProperty(\"selectedCar\", id);\n  },\n  remove: function(index) {\n    $.observable(this.cars).remove(index);\n  },\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);\nThe cars array (but not the id properties) is editable. We use the data-linked {^{for ...}} tag:\n{^{radiogroup selectedCar}}\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  {^{for cars}}\n    <label><input type=\"radio\" value=\"{{:id}}\"/> {^{:name}}</label>\n  {{/for}}\n{{/radiogroup}}<\n\n\n"
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; dynamic array including id (value)",
        "text": "Radio buttons – dynamic array including id (value)\nHere we allow the user also to change the id value (used as key) – which requires the more advanced data-link syntax: value^{:id} (see syntax for updating only) to update the value of the <input>s when the id changes.\nWe provide two radio button groups – showing the alternative syntax styles – data-linking through a {{radiogroup}} wrapper tag, or data-linking directly to the <input>s. Since both groups data-link to the same selectedCar property, the two-way binding keeps them in sync.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <button data-link=\"{on add}\">Add car</button>\n  <table>\n    <tbody>\n      {^{for cars}}\n        <tr>\n          <td><input data-link=\"name\"/></td>\n          <td><input data-link=\"id\"/></td>\n          <td><span class=\"remove\" data-link=\"{on ~root.remove #index}\"></span></td>\n        </tr>\n      {{/for}}\n    </tbody>\n  </table><br/>\n\n  <label><input type=\"checkbox\" data-link=\"disable\"/> Disable radio buttons</label><br/><br/>\n\n  <em>&lcub;{radiogroup&rcub;}:</em><br/><br/>\n\n  {^{radiogroup selectedCar disabled=disable}}\n    <label><input type=\"radio\" value=\"\"/> None</label><br/>\n    {^{for cars}}\n      <label><input type=\"radio\" data-link=\"value{:id}\"/> {^{:name}}</label><br/>\n    {{/for}}\n  {{/radiogroup}}<br/>\n \n  <em>Direct linking to &lt;input&gt;:</em><br/><br/>\n\n  <label><input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selectedCar\"/> None</label><br/>\n  {^{for cars}}\n    <label><input name=\"cars\" type=\"radio\"\n      value=\"{{:id}}\" data-link=\"{:~root.selectedCar:} value^{:id} disabled{:~root.disable}\"\n    /> {^{:name}}</label><br/>\n  {{/for}}\n\n  <div class=\"spanbox\" data-link=\"selectedCar||'none'\"></div>\n\nvar idCount = 0;\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  add: function() {\n    idCount++;\n    var id = \"car\" + idCount;\n    $.observable(this.cars).insert({id: id, name: \"name\" + idCount});\n    $.observable(this).setProperty(\"selectedCar\", id);\n  },\n  remove: function(index) {\n    $.observable(this.cars).remove(index);\n  },\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ],\n  disable: false\n};\n\ntmpl.link(\"#result\", data);\nTwo radio button groups:– with {{radiogroup}}:\n{^{radiogroup selectedCar disabled=disable}}\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  {^{for cars}}\n    <label><input type=\"radio\" data-link=\"value{:id}\"/> {^{:name}}</label>\n  {{/for}}\n{{/radiogroup}}\n\n– and with direct data-linking to the <input>s:\n<label><input name=\"cars\" type=\"radio\" value=\"\" data-link=\"selectedCar\"/> None</label>\n{^{for cars}}\n  <label><input name=\"cars\" type=\"radio\"\n    value=\"{{:id}}\" data-link=\"{:~root.selectedCar:} value^{:id} disabled{:~root.disable}\"\n  /> {^{:name}}</label>\n{{/for}}\n\nSince the id is also editable, we are data-linking to id: data-link=\"value{:id}\".\nFor the second style (data-linking directly to the <input>) we need to ensure that the value is initialized during rendering, using value=\"{{:id}}\" (to ensure correct initial selection of the Ford radio button – based on the initial value \"frd\" of selectedCar) – in addition to binding to subsequent changes in id using value^{:id}.\n\n"
      },
      {
        "_type": "para",
        "title": "Radio buttons: data-linking to enable/disable",
        "text": "Radio buttons: data-linking to enable/disable\nThe above sample also shows the use of the {{radiogroup}} disabled property, which can be used with data-linking to dynamically enable/disable the radio buttons.\nThe sample also shows how to data-link disabled when using data-linking directly to the <input> elements (rather than using {{radiogroup}}).\n"
      },
      {
        "_type": "para",
        "title": "Radio buttons &ndash; with converters",
        "text": "Radio buttons – with converters\nIn this last example we use convert and convert back converters to convert from the selIndex, the index of the selected radio button, to the value of the id key, and back.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <em>&lcub;{radiogroup&rcub;}:</em><br/><br/>\n\n  {^{radiogroup selIndex convert=\"toId\" convertBack=\"fromId\"}}\n    <label><input type=\"radio\" value=\"\"/> None</label><br/>\n    {^{for cars}}\n      <label><input type=\"radio\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n    {{/for}}\n  {{/radiogroup}}<br/>\n \n  <em>Direct linking to &lt;input&gt;:</em><br/><br/>\n\n  <label><input name=\"cars2\" type=\"radio\" value=\"\"\n    data-link=\"{toId:~root.selIndex:fromId}\"/> None</label><br/>\n  {^{for cars}}\n    <label><input name=\"cars2\" type=\"radio\" value=\"{{:id}}\"\n      data-link=\"{toId:~root.selIndex:fromId}\" /> {{:name}}</label><br/>\n  {{/for}}\n\n  <span class=\"spanbox\" data-link=\"selIndex\"></span> <em>Selected index</em><br/>\n  <span class=\"spanbox\"\n  data-link=\"selIndex === -1 ? 'None' : cars[selIndex].name\"></span>\n  <em>Selected car name</em>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selIndex: 1,\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\n$.views.converters({\n  fromId: function(val) { // convert from id to index\n    var index = -1;\n    this.tagCtx.view.ctx.root.cars.forEach(function(car, ind) {\n      if (val === car.id) {\n        index = ind;\n      }\n    });\n    return index;\n  },\n  toId: function(val) {  // convert back from index to id\n    return val === -1 ? \"\" : this.tagCtx.view.ctx.root.cars[val].id;\n}});\n\ntmpl.link(\"#result\", data);\nDefine converters:\n$.views.converters({\n  fromId: function(val) { // convert from id to index\n    var index = -1;\n    this.tagCtx.view.data.cars.forEach(function(car, ind) {\n      if (val === car.id) {\n        index = ind;\n      }\n    });\n    return index;\n  },\n  toId: function(val) {  // convert back from index to id\n    return val === -1 ? \"\" : this.tagCtx.view.data.cars[val].id;\n}});\n\nInitialize the data\nvar data = {\n  selIndex: 1,\n  cars: [...]\n}\n\nData-link to selIndex, using the converters:\n{^{radiogroup selIndex convert=\"toId\" convertBack=\"fromId\"}}\n\nOr, with direct linking to <input>s:\n...\n<input name=\"cars2\" type=\"radio\" value=\"{{:id}}\" data-link=\"{toId:~root.selIndex:fromId}\" />\n...\n\n\n\n"
      },
      {
        "_type": "para",
        "title": "Data-linked checkbox groups",
        "text": "Data-linked checkbox groups\nThe simplest way to provide two-way data-linking to a group of checkboxes is by wrapping the <input>s with a {^{checkboxgroup ...}} tag.\nAlternatively, it is also possible to data-link directly to the <input> elements.\n"
      },
      {
        "_type": "para",
        "title": "Samples in this section",
        "text": "Samples in this section\nThis topic includes the following checkbox group samples showing data-linked checkboxes:\n\nTwo-way data-binding, with {{checkboxgroup}}\nTwo-way data-binding, linking directly to the input elements\nTop-level linking directly to the input elements\nData-driven by array, with converters\n\n"
      },
      {
        "_type": "para",
        "title": "Checkbox group &ndash; two-way data-binding &ndash; using {^{checkboxgroup}}  ",
        "text": "Checkbox group – two-way data-binding – using {^{checkboxgroup}}  \nA checkbox group will generally consist of a group of <input> elements of type \"checkbox\", each associated with a <label> (which either wraps the <input>, or references it by id, through the for=\"inputId\" attribute).\nTo data-link the checkboxes, wrap the <input> (and <label>) elements with a {^{checkboxgroup ...}} tag, linking to the appropriate data path such as the selectedSports array property on the current data object:\n{^{checkboxgroup selectedSports}}\n\n(Note that when the user modifies the selection of checked checkboxes, the data property is observably replaced by a new array. This means that in order to observe the length of the array, you need to use a deep path, such as selectedSports^length in this example).\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n  {^{checkboxgroup selectedSports}}\n    <label><input type=\"checkbox\" value=\"swimming\"/> Swimming</label><br/>\n    <label><input type=\"checkbox\" value=\"running\"/> Running</label><br/>\n    <label><input type=\"checkbox\" value=\"soccer\"/> Soccer</label><br/>\n  {{/checkboxgroup}}\n\n  <div class=\"spanbox\">Sports:<ul>\n    {^{for selectedSports}}<li>{^{:}}</li>{{/for}}\n  </ul></div>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedSports: [\"soccer\", \"running\"]};\n\ntmpl.link(\"#result\", data);\nData:\nvar data = {\n  {selectedSports: [\"soccer\", \"running\"],\n  ...\n};\n\nHTML:\n{^{checkboxgroup selectedSports}}\n  <label><input type=\"checkbox\" value=\"swimming\"/> Swimming</label>\n  <label><input type=\"checkbox\" value=\"running\"/> Running</label>\n  <label><input type=\"checkbox\" value=\"soccer\"/> Soccer</label>\n{{/checkboxgroup}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Checkbox group &ndash; data-binding directly to the &lt;inputs>",
        "text": "Checkbox group – data-binding directly to the <inputs>\nIt is also possible to data-link directly to <input> elements, without using a {{checkboxgroup}} tag, by:\n\ndata-linking each <input> directly (each to the same data path, such as data-link=\"selectedSports\", corresponding to an array of string values)\nincluding a name attribute on each <input> of the group (such as name=\"sports\")\n\n<label><input name=\"sports\" type=\"checkbox\" value=\"swimming\" data-link=\"selectedSports\"/> ...\n\nNote that setting the name attribute was not necessary when using {{checkboxgroup}} – since the {{checkboxgroup}} tag will automatically add a generated name property to each <input>, if none has been specified).\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <label><input name=\"sports\" type=\"checkbox\" value=\"swimming\" data-link=\"selectedSports\"/> Swimming</label><br/>\n  <label><input name=\"sports\" type=\"checkbox\" value=\"running\" data-link=\"selectedSports\"/> Running</label><br/>\n  <label><input name=\"sports\" type=\"checkbox\" value=\"soccer\" data-link=\"selectedSports\"/> Soccer</label><br/>\n\n  <div class=\"spanbox\">Sports:<ul>\n    {^{for selectedSports}}<li>{^{:}}</li>{{/for}}\n  </ul></div>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedSports: [\"soccer\", \"running\"]};\n\ntmpl.link(\"#result\", data);\nData:\nvar data = {\n  {selectedSports: [\"soccer\", \"running\"],\n  ...\n};\n\nHTML:\n<label><input name=\"sports\" type=\"checkbox\" value=\"swimming\" data-link=\"selectedSports\"/> Swimming ...\n<label><input name=\"sports\" type=\"checkbox\" value=\"running\" data-link=\"selectedSports\"/> Running ...\n<label><input name=\"sports\" type=\"checkbox\" value=\"soccer\" data-link=\"selectedSports\"/> Soccer ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "Top-level data-linking of checkbox groups",
        "text": "Top-level data-linking of checkbox groups\nFor top-level data-linking, there are two alternatives:\n\nTop-level {checkboxgroup} binding shown here\nTop-level data-linked <input> elements (using direct data-linking as in the previous example), shown in the following sample:\n\n"
      },
      {
        "_type": "sample",
        "title": "Top-level data-linked &lt;input> elements",
        "text": "Top-level data-linked <input> elements\n\n   Swimming\n   Running\n   Soccer\n\n  Sports:\n    \n  \n\nvar data = {selectedSports: [\"soccer\", \"running\"]};\n\n$.views.templates(\"liItem\", \"{^{:}}\");\n\n$.link(true, \"#top-level-linked\", data);\n<div id=\"top-level-linked\">\n  <label><input name=\"sports\" type=\"checkbox\" value=\"swimming\" data-link=\"selectedSports\"/> Swimming ...\n  ...\n\nvar data = {selectedSports: [\"soccer\", \"running\"]};\n...\n$.link(true, \"#top-level-linked\", data);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Checkbox group &ndash; in {{for}} loop with array",
        "text": "Checkbox group – in {{for}} loop with array\nA common scenario is when the options in a checkbox group come from a data array. The <input type=\"checkbox\"> elements can be generated by a {{for}} tag (whether using direct data-linking on the <input>s, or wrapping with a {^{checkboxgroup}}).\nSee the analogous discussion for Radio buttons in a {{for}} loop (along with the subsequent sections and examples, which could all be applied similarly to checkbox groups).\nThe next sample (below) will show data-driven checkbox groups, along with the use of converters.\n"
      },
      {
        "_type": "para",
        "title": "Checkbox groups &ndash; with converters",
        "text": "Checkbox groups – with converters\nIn this example we use convert and convert back converters to convert from an array of integers – the indices of the items in the sports array, to an array of strings – the id values, and back.\nWe also show this both for the {{checkboxgroup}} approach and for direct data-linking to the <input>s, as well as the corresponding <select multiple> UI.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <em>&lcub;{checkboxgroup&rcub;}:</em><br/><br/>\n\n  {^{checkboxgroup selSports convert=\"toId\" convertBack=\"fromId\" disabled=disable}}\n    {^{for sports}}\n      <label><input type=\"checkbox\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n    {{/for}}\n  {{/checkboxgroup}}<br/>\n \n  <em>Direct linking to &lt;input&gt;:</em><br/><br/>\n\n  {^{for sports}}\n    <label><input name=\"sports\" type=\"checkbox\" value=\"{{:id}}\"\n      data-link=\"{toId:~root.selSports:fromId} disabled{:~root.disable}\" /> {{:name}}</label><br/>\n  {{/for}}<br/>\n\n  <em>&lt;select multiple ...&gt;:</em><br/><br/>\n\n  <select multiple data-link=\"disabled{:disable} {toId:selSports:fromId} size{:sports.length}\">\n    {^{for sports}}\n      <option data-link=\"value{:id}\">{{:name}}</option>\n    {{/for}}\n  </select><br/><br/>\n\n  <label><input type=\"checkbox\" data-link=\"disable\"/> Disable checkboxes and select</label><br/><br/>\n\n  <div class=\"spanbox\"><em>Selected indices</em><ul>\n    {^{for selSports}}<li>{^{:}}</li>{{/for}}\n  </ul></div>\n\n  <div class=\"spanbox\"><em>Selected sport names</em><ul>\n    {^{for selSports}}<li>{^{:~root.sports[#data].name}}</li>{{/for}}\n  </ul></div>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  disabled: false,\n  selSports: [0, 2], // array of integers - the indices of the items in the sports array\n  sports: [\n    {id: \"swimming\", name: \"Swimming\"},\n    {id: \"climbing\", name: \"Mountain climbing\"},\n    {id: \"running\", name: \"Running\"}\n  ]\n};\n\n$.views.converters({\n  fromId: function(ids) { // convert from array of id strings to array of indices\n    var sports = this.tagCtx.view.ctx.root.sports,\n      indices = ids.map(function(id) { // get indices array\n        var indx;\n        sports.forEach(function(sport, ind) {\n          if (id === sport.id) {\n            indx = ind;\n            return;\n          }\n        });\n        return indx;\n      });\n\n    return indices; // return indices array\n  },\n  toId: function(indices) {  // convert back from array of indices to array of ids\n    var sports = this.tagCtx.view.ctx.root.sports,\n      ids =indices.map(function(ind) { // ids array\n        return sports[ind].id;\n      });\n  \n    return ids; // return ids array\n  }\n});\n\ntmpl.link(\"#result\", data);\nDefine converters:\n$.views.converters({\n  fromId: function(ids) { // convert from array of id strings to array of indices\n    var sports = this.tagCtx.view.ctx.root.sports,\n      indices = ids.map(function(id) { // get indices array\n        ...\n      });\n\n    return indices; // return indices array\n  },\n  toId: function(indices) {  // convert back from array of indices to array of ids\n    var sports = this.tagCtx.view.ctx.root.sports,\n      ids =indices.map(function(ind) { // ids array\n        ...\n      });\n  \n    return ids; // return ids array\n  }\n});\n\nInitialize the data\nvar data = {\n  disabled: false,\n  selSports: [0, 2], // array of integers - the indices of the items in the sports array\n  sports: [\n    {id: \"swimming\", name: \"Swimming\"},\n    ...\n  ]\n};\n\nData-link to selSports array, using the converters:\n{^{checkboxgroup selSports convert=\"toId\" convertBack=\"fromId\" disabled=disable}}\n\nOr, with direct linking to <input>s:\n...\n<input name=\"sports\" type=\"checkbox\" value=\"{{:id}}\" data-link=\"{toId:~root.selSports:fromId} ... \" />\n...\n\n\n\n"
      },
      {
        "_type": "para",
        "title": "Checkboxes: data-linking to enable/disable",
        "text": "Checkboxes: data-linking to enable/disable\nThe above sample also shows the use of the {{checkboxgroup}} disabled property, which can be used with data-linking to dynamically enable/disable the checkboxes.\nThe sample also shows how to data-link disabled when using data-linking directly to the <input> elements (rather than using {{checkboxgroup}}).\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "link-select": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This section shows data-linking to <select> elements:\n\nTwo-way data-binding\nData-driven by array data (in a {{for}} loop)\nData-driven by an editable array (in a {^{for}} loop)\nUsing converters\nMultiple selection\nCascading selects\n\n"
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: two-way data-binding",
        "text": "<select>: two-way data-binding\nThe <selects>s are data-linked to the selectedCar property (one a drop-down and the other a listbox: size=\"3\").\nChanging selection on one <select> triggers the corresponding selection change on the other, thanks to two-way binding to the selectedCar property:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <select data-link=\"selectedCar\">\n    <option value=\"\">Choose a car</option>\n    <option value=\"vlv\">Volvo</option>\n    <option value=\"frd\">Ford</option>\n  </select><br/><br/>\n\n  <select data-link=\"selectedCar\" size=\"3\">\n    <option value=\"\">Choose a car</option>\n    <option value=\"vlv\">Volvo</option>\n    <option value=\"frd\">Ford</option>\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedCar: \"frd\"};\n\ntmpl.link(\"#result\", data);\nData:\nvar data = {\n  selectedCar: \"frd\",\n  ...\n};\n\nHTML:\n<select data-link=\"selectedCar\">\n  <option value=\"\">Choose a car</option>\n  <option value=\"vlv\">Volvo</option>\n  <option value=\"frd\">Ford</option>\n</select>\n\n<select data-link=\"selectedCar\" size=\"3\">\n  <option value=\"\">Choose a car</option>\n  <option value=\"vlv\">Volvo</option>\n  <option value=\"frd\">Ford</option>\n</select>\n\n\n"
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: &lt;option&gt;s in {{for}} loop with array",
        "text": "<select>: <option>s in {{for}} loop with array\nA cars array has values for the displayed name and the corresponding id (used as key, and data-linked to the selectedCar property). We loop through the array using {{for cars}}, to create an <option> for each car.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <select data-link=\"selectedCar\" size=\"4\">\n    <option value=\"\">Choose a car</option>\n    {^{for cars}}\n      <option value=\"{{:id}}\">{{:name}}</option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span><br/>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);\nData includes cars array:\nvar data = {\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    ...\n  ]\n};\n\nThe first <option> has the ‘unselected’ value: \"\". The following <option>s are in a {{for}} loop:\n<select data-link=\"selectedCar\" size=\"4\">\n  <option value=\"\">Choose a car</option>\n  {^{for cars}}\n    <option value=\"{{:id}}\">{{:name}}</option>\n  {{/for}}\n</select>\n\n\n"
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: &lt;option&gt;s in {^{for}} loop with dynamic array",
        "text": "<select>: <option>s in {^{for}} loop with dynamic array\nIn this example we allow the user to add and remove items from the array, and to change values such as name and id (the key).\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <button data-link=\"{on add}\">Add car</button>\n  <table>\n    <tbody>\n      {^{for cars}}\n        <tr>\n          <td><input data-link=\"name\"/></td>\n          <td><input data-link=\"id\"/></td>\n          <td><span class=\"remove\" data-link=\"{on ~root.remove #index}\"></span></td>\n        </tr>\n      {{/for}}\n    </tbody>\n  </table><br/>\n\n  <select data-link=\"{:selectedCar:} size{:cars.length + 1}\">\n    <option value=\"\">Choose a car</option>\n    {^{for cars}}\n      <option data-link=\"value{:id} {:name}\"></option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span><br/>\n\nvar idCount = 0;\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  add: function() {\n    idCount++;\n    var id = \"car\" + idCount;\n    $.observable(this.cars).insert({id: id, name:\"name\"});\n    $.observable(this).setProperty(\"selectedCar\", id);\n  },\n  remove: function(index) {\n    $.observable(this.cars).remove(index);\n  },\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);\nThe cars array is editable. Using data-linked tags: {^{...}}:\n<select data-link=\"{:selectedCar:} size{:cars.length + 1}\">\n  <option value=\"\">Choose a car</option>\n  {^{for cars}}\n    <option data-link=\"value{:id} {:name}\"></option>\n  {{/for}}\n</select>\n\nNote that <option data-link=\"value{:id} {:name}\"></option> data-links the value to id and innerText to name. We could alternatively have written <option data-link=\"value{:id}\">{^{>name}}</option>.\n\n"
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: with converters",
        "text": "<select>: with converters\nIn this last example we use convert and convert back converters to convert from the selIndex, the index of the selected option, to the value of the id key, and back.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <select data-link=\"{toId:selIndex:fromId}\" size=\"4\">\n    <option value=\"\">Choose a car</option>\n    {^{for cars}}\n      <option data-link=\"value{:id} {:name}\"></option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"selIndex\"></span><br/>\n  <span class=\"spanbox\" data-link=\"selIndex === -1 ? 'None' : cars[selIndex].name\"></span>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selIndex: 1,\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\n$.views.converters({\n  fromId: function(val) {\n    var index = 1;\n    this.ctx.root.cars.forEach(function(car, ind) {\n      if (val === car.id) {\n        index = ind;\n      }\n    });\n    return index;\n  },\n  toId: function(val) {\n    return val === -1 ? \"\" : this.ctx.root.cars[val].id;\n  }\n});\n\ntmpl.link(\"#result\", data);\nDefine converters:\n$.views.converters({\n  fromId: function(val) { // convert from id to index\n    var index = -1;\n    this.ctx.root.cars.forEach(function(car, ind) {\n      if (val === car.id) {\n        index = ind;\n      }\n    });\n    return index;\n  },\n  toId: function(val) {  // convert back from index to id\n    return val === -1 ? \"\" : this.ctx.root.cars[val].id;\n  }\n});\n\nInitialize the data\nvar data = {\n  selIndex: 1,\n  cars: [...]\n}\n\nData-link to selIndex, using the converters:\n<select data-link=\"{toId:selIndex:fromId}\" size=\"4\">\n  <option value=\"\">Choose a car</option>\n  {^{for cars}}\n    <option data-link=\"value{:id} {:name}\"></option>\n  {{/for}}\n</select>\n\n\n"
      },
      {
        "_type": "para",
        "title": "&lt;select&gt;: with multiple selection",
        "text": "<select>: with multiple selection\nIf the multiple attribute is set, data-linking is to an array of strings (option values).\nConverters could be used to convert to other data formats, such as an array of indices, or an array of objects (see for example this sample).\n"
      },
      {
        "_type": "sample",
        "text": "select {margin: 10px 0;}\n\n\n\n\n  <em>Choose one or more cars:</em><br/>\n\n  <select data-link=\"selectedCar\" size=\"5\" multiple>\n    {^{for cars}}\n      <option data-link=\"value{:id} {:name}\"></option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\">\n    {^{for selectedCar}}{{:}} {{else}}<em>None</em>{{/for}}\n  </span>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedCar: [\"rnl\", \"frr\"],\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"rnl\", name: \"Renault\"},\n    {id: \"frr\", name: \"Ferrari\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);\nInitialize the data (with selectedCar property as an array of strings):\nvar data = {\n  selectedCar: [\"rnl\", \"frr\"],\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    ...\n  ]\n}\n\nData-link to selectedCar array):\n<select data-link=\"selectedCar\" multiple ...>\n  {^{for cars}}\n    <option data-link=\"value{:id} {:name}\"></option>\n  {{/for}}\n</select>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the {{multisel}} tag control sample.\n"
      },
      {
        "_type": "para",
        "title": "Cascading &lt;select&gt;s: dynamic selection of subcategory items in child &lt;select&gt;",
        "text": "Cascading <select>s: dynamic selection of subcategory items in child <select>\nA common scenario is two or more <select> listboxes or drop-downs to allow the user to drill down into categories and sub-categories, such as choosing a make of car, then choose a model from that manufacturer, then choose among options for the chosen model, etc.\nThe following three samples illustrate different approaches to the same scenario, which permit to highlight different techniques, and to use different data modelling.\nIn the first example, the data is hierarchical – a makes array of make objects, each with a models hash:\nmakes: [\n  {\n    id: \"vlv\",\n    name: \"Volvo\",\n    models: {xc90: \"XC90 Estate\", ... }\n  }, {\n    id: \"frd\",\n    ...\n\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n\n<div class=\"floatleft\">\n  <select data-link=\"make\" size=\"4\">\n    <option value=\"\">Choose a make</option>\n    {^{for makes}}\n      <option value=\"{{:#index}}\">{{:name}}</option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"make && makes[make].name || 'none...'\"></span>\n</div>\n\n{^{if makes[make]}}\n  <div class=\"floatleft\">\n    <select data-link=\"{:model:} size{:modelCount}\">\n      <option value=\"\">Choose a model</option>\n      {^{props makes[make].models}}\n        <option value=\"{{:key}}\">{{:prop}}</option>\n      {{/props}}\n    </select><br/>\n\n    <span class=\"spanbox\" data-link=\"makes[make].models[model] || 'none...'\"></span>\n  </div>\n{{/if}}\n\nvar data = {\n  makes: [\n    {\n      id: \"vlv\",\n      name: \"Volvo\",\n      models: {xc90: \"XC90 Estate\", v60: \"V60 Cross Country\", s90: \"S90 Hybrid\" }\n    }, {\n      id: \"frd\",\n      name: \"Ford\",\n      models: { fm: \"Mustang\", ff: \"Fiesta\", ft: \"Taurus\", fe: \"Expedition\" }\n    }, {\n      id: \"hnd\",\n      name: \"Honda\",\n      models: { hc: \"Civic Si\", ho: \"Odyssey\", ha: \"Accord\" }\n    }\n  ],\n  make: \"\",\n  model: \"\"\n};\n\n$.observe(data, \"make\", function(ev, eventArgs) {\n  // When make changes, initialize selected model to the first in models hash\n  // Also, update modelCount for the new make\n  var key, firstKey,\n    make = data.makes[eventArgs.value],\n    count = 1;\n  if (make) {\n    for (key in make.models) {\n      firstKey = firstKey || key;\n      count++;\n    }\n    $.observable(data).setProperty({model: firstKey, modelCount: count});\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\ntmpl.link(\"#result\", data);\n\nChoosing a make in the first listbox sets data.make to the index of the chosen make object in the makes array:\n<select data-link=\"make\">\n  <option value=\"\">Choose a make</option>\n  {^{for makes}}\n    <option value=\"{{:#index}}\">{{:name}}</option>\n  {{/for}}\n</select>\n\nThe second listbox selects the model key in the models hash of the chosen make:\n<select data-link=\"{:model:}...\">\n  <option value=\"\">Choose a model</option>\n  {^{props makes[make].models}}\n    <option value=\"{{:key}}\">{{:prop}}</option>\n  {{/props}}\n</select>\n\nThe {^{props makes[make].models}} tag iterates over the makes array. Thanks to the make dependency in the expression, it contents (the <options>) are updated when make changes observably (changes to the selection in the first listbox).\nIn addition, changes to make are ‘observed’ by the following code:\n$.observe(data, \"make\", function(ev, eventArgs) {\n  // When make changes, initialize selected model to the first in models hash\n  ...\n  $.observable(data).setProperty({model: firstKey ...});\n  ...\n});\n\n– which sets initial selection to the first model in the second listbox.\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the second example, the data has a separate array of makes, and a flat array of all car models:\nvar data = {\nmakes: [\n  {id: \"vlv\", name: \"Volvo\"},\n  {id: \"frd\", name: \"Ford\"},\n  ...\n],\ncars: [\n  {make: \"vlv\", id: \"xc90\", name: \"XC90 Estate\"},\n  {make: \"vlv\", id: \"v60\", name: \"V60 Cross Country\"},\n  ...\n  {make: \"frd\", id: \"fm\", name: \"Mustang\"},\n  ...\n]\n\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n<div class=\"floatleft\">\n  <select data-link=\"make\" size=\"4\">\n    <option value=\"\">Choose a make</option>\n    {^{for makes}}\n      <option value=\"{{:id}}\">{{:name}}</option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"{toMake:make}\"></span>\n</div>\n\n{^{if make}}\n  <div class=\"floatleft\">\n    <select data-link=\"{toId:model:fromId} size{:models^length+1}\">\n      <option value=\"\">Choose a model</option>\n      {^{for models}}\n        <option value=\"{{:id}}\">{{:name}}</option>\n      {{/for}}\n    </select><br/>\n\n    <span class=\"spanbox\" data-link=\"model ? model.name : 'none...'\"></span>\n  </div>\n{{/if}}\n\nvar data = {\n  makes: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ],\n  cars: [\n    {make: \"vlv\", id: \"xc90\", name: \"XC90 Estate\"},\n    {make: \"vlv\", id: \"v60\", name: \"V60 Cross Country\"},\n    {make: \"vlv\", id: \"s90\", name: \"S90 Hybrid\"},\n    {make: \"frd\", id: \"fm\", name: \"Mustang\"},\n    {make: \"frd\", id: \"ff\", name: \"Fiesta\"},\n    {make: \"frd\", id: \"ft\", name: \"Taurus\"},\n    {make: \"frd\", id: \"fe\", name: \"Expedition\"},\n    {make: \"hnd\", id: \"hc\", name: \"Civic Si\"},\n    {make: \"hnd\", id: \"ho\", name: \"Odyssey\"},\n    {make: \"hnd\", id: \"ha\", name: \"Accord\"}\n  ],\n  make: \"\",\n  model: null\n};\n\n$.views.converters({\n  fromId: function(id) {\n    // Get the car object with a given id\n    var car,\n      l = data.cars.length;\n    if (id) {\n      while (l--) {\n        car = data.cars[l]\n        if (id === car.id) {\n         return car;\n        }\n      }\n    }\n    return null;\n  },\n  toId: function(model) {\n    // Get the id for a given car object\n    return model ? model.id : \"\";\n  },\n  toMake: function(id) {\n    // Get the make name for car object with a given id\n    var car,\n      l = data.makes.length;\n    if (id) {\n      while (l--) {\n        make = data.makes[l]\n        if (id === make.id) {\n         return make.name;\n        }\n      }\n    }\n    return \"none...\";\n  }\n});\n\n$.observe(data, \"make\", function(ev, eventArgs) {\n  // When make changes, set the models array, filtered by the make\n  // and initialize selected model to the first in the array\n  var models = data.cars.filter(function(model) {\n    return model.make === eventArgs.value;\n  });\n\n  $.observable(data).setProperty({\n    models: models,  // set filtered models array\n    model: models[0] // select first model\n  });\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\ntmpl.link(\"#result\", data);\n\nChoosing a make in the first listbox sets data.make to the id of the chosen make object in the makes array:\n<select data-link=\"make\">\n  <option value=\"\">Choose a make</option>\n  {^{for makes}}\n    <option value=\"{{:id}}\">{{:name}}</option>\n  {{/for}}\n  </select>\n\nThe second listbox selects the data.model object in the cars array (using converters to get from the selected model object to the id used as value on the <option> tags, or to get from the id to the model):\n<select data-link=\"{toId:model:fromId} size{:models^length+1}\">\n  <option value=\"\">Choose a model</option>\n  {^{for models}}\n    <option value=\"{{:id}}\">{{:name}}</option>\n  {{/for}}\n</select>\n\nHere, {^{for models}} iterates over data.models, which is a filtered cars array with just the models for the chosen make.\nThe following code observes changes in data.make to trigger an updated data.models filtered array, as well as choosing the first model in the models array for initial model selection:\n$.observe(data, \"make\", function(ev, eventArgs) {\n  // When make changes, set the models array, filtered by the make\n  // and initialize selected model to the first in the array\n  var models = data.cars.filter(function(model) {\n    return model.make === eventArgs.value;\n  });\n\n  $.observable(data).setProperty({\n    models: models,  // set filtered models array\n    model: models[0] // select first model\n  });\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The third example is similar to the second, but introduces some alternative techniques which can be of interest:\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n<div class=\"floatleft\">\n  <select data-link=\"make\" size=\"4\">\n    <option value=\"\">Choose a make</option>\n    {^{for makes}}\n      <option value=\"{{:id}}\">{{:name}}</option>\n    {{/for}}\n  </select><br/>\n\n  <span class=\"spanbox\" data-link=\"make convert=~cvt.toMake\"></span>\n</div>\n\n{^{if make ~models=~models(make)}}\n\n  <div class=\"floatleft\">\n    <select data-link=\"{:model convert=~cvt.toId convertBack=~cvt.fromId:} size{:~models.length+1}\">\n      <option value=\"\">Choose a model</option>\n      {^{for ~models onAfterLink=~setModel}}\n        <option value=\"{{:id}}\">{{:name}}</option>\n      {{/for}}\n    </select><br/>\n\n    <span class=\"spanbox\" data-link=\"model ? model.name : 'none...'\"></span>\n  </div>\n\n{{/if}}\n\nvar data = {\n  makes: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"},\n    {id: \"hnd\", name: \"Honda\"}\n  ],\n  cars: [\n    {make: \"vlv\", id: \"xc90\", name: \"XC90 Estate\"},\n    {make: \"vlv\", id: \"v60\", name: \"V60 Cross Country\"},\n    {make: \"vlv\", id: \"s90\", name: \"S90 Hybrid\"},\n    {make: \"frd\", id: \"fm\", name: \"Mustang\"},\n    {make: \"frd\", id: \"ff\", name: \"Fiesta\"},\n    {make: \"frd\", id: \"ft\", name: \"Taurus\"},\n    {make: \"frd\", id: \"fe\", name: \"Expedition\"},\n    {make: \"hnd\", id: \"hc\", name: \"Civic Si\"},\n    {make: \"hnd\", id: \"ho\", name: \"Odyssey\"},\n    {make: \"hnd\", id: \"ha\", name: \"Accord\"}\n  ],\n  make: \"\",\n  model: null\n};\n\nvar helpers = {\n  models: function(make) {\n    // models array (cars filtered by the make) provided as contextual ~models parameter, \n    return data.cars.filter(function(model, index, array) {\n      return model.make === make;\n    });\n  },\n  setModel: function(tagCtx) {\n    // onAfterLink event for {{for}} tag rendering models options, triggered when make changes.\n    // tagCtx.args[0] is the ~models array. Initialize selected model to the first one in the array\n    $.observable(data).setProperty({model: tagCtx.args[0][0]});\n  },\n  cvt: {\n    // Converter helpers. (We could alternatively have registered named converters)\n    fromId: function(id) {\n      // Get the car object with a given id\n      var car,\n        l = data.cars.length;\n      if (id) {\n        while (l--) {\n          car = data.cars[l]\n          if (id === car.id) {\n            return car;\n          }\n        }\n      }\n      return null;\n    },\n    toId: function(model) {\n      // Get the id for a given car object\n      return model ? model.id : \"\";\n    },\n    toMake: function(id) {\n      // Get the make name for car object with a given id\n      var car,\n        l = data.makes.length;\n      if (id) {\n        while (l--) {\n          make = data.makes[l]\n          if (id === make.id) {\n            return make.name;\n          }\n        }\n      }\n      return \"none...\";\n    }\n  }\n};\n\nvar tmpl = $.templates(\"#tmpl\");\n\ntmpl.link(\"#result\", data, helpers);\nHere the data and the first listbox implementation are the same as the previous sample.\nHowever the second listbox uses a helper function to compute the filtered array of models for the selected make:\n{^{if make ~models=~models(make)}}\n\n  <select data-link=\"{:model ...:} size{:~models.length+1}\">\n    <option value=\"\">Choose a model</option>\n    {^{for ~models onAfterLink=~setModel}}\n      <option value=\"{{:id}}\">{{:name}}</option>\n    {{/for}}\n  </select>\n\nThis version uses another approach to observing when the make changes, and setting the initial model selection on the first model in the list. Here, rather than using $.observe(data, \"make\", ...), we instead provide a ~setModel helper as onAfterLink handler:\n{^{for ~models onAfterLink=~setModel}}\n\nThe effect of this is that whenever the {^{for ~models}} <options> list is updated, the ~setModel helper is then called.\nAnother minor change from the previous sample is that here we use helpers as converters, rather than registering named converters. So our complete set of helpers is as follows:\nvar helpers = {\n  models: function(make) {\n    // Contextual parameter: models array filtered by the make\n    return data.cars.filter(function(model) {\n      return model.make === make;\n    });\n  },\n  setModel: function(tagCtx) {\n    // onAfterLink event for {{for}} tag rendering models options, triggered when make changes.\n    // tagCtx.args[0] is the ~carsForMake array. Initialize selected model to the first one in the array\n    $.observable(data).setProperty({model: tagCtx.args[0][0]});\n  },\n  cvt: ...,\n  toId: ...,\n  toMake: ...\n}\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "link-textarea": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following sample shows data-linked textboxes, with two-way binding, one-way binding, and use of converters (convert and convert back).\n"
      },
      {
        "_type": "sample",
        "title": "Two-way binding with &lt;textarea&gt;",
        "text": "Two-way binding with <textarea>\ntextarea {margin-bottom: 5px;} .pre {white-space: pre;}\n\n\n\n\n  <textarea rows=\"3\" cols=\"20\"\n    data-link=\"name\"\n  ></textarea>\n  <em>Two-way</em><br/>\n\n  <textarea rows=\"3\" cols=\"20\"\n    data-link=\"{upper:name:lower}\"\n  ></textarea>\n  <em>Two-way with 'upper' and 'lower' converters (convert/convert back)</em><br/>\n\n  <textarea rows=\"3\" cols=\"20\"\n    data-link=\"{:name}\"\n  ></textarea>\n  <em>One-way</em><br/>\n\n  <textarea rows=\"3\" cols=\"20\"\n    data-link=\"{upper:name}\"\n  ></textarea>\n  <em>One-way with 'upper' converter</em><br/>\n\n  <textarea rows=\"3\" cols=\"20\"\n    data-link=\"{upper:name trigger=false:lower}\"\n  ></textarea>\n  <em>Two-way with convert/convert back (no trigger on keydown - only on blur)</em><br/>\n\n  <span class=\"spanbox pre\" data-link=\"name\"></span>\n  <em>Data-linked span</em><br/>\n\n\n$.views.converters({\n  upper: function(val) {\n    return val.toUpperCase();\n  },\n  lower: function(val) {\n    return val.toLowerCase();\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo\\nBlow\"};\n\ntmpl.link(\"#result\", person);\nTwo-way:\n<textarea ... data-link=\"name\"></textarea>\n\nTwo-way with ‘upper’ and ‘lower’ converters (convert/convert back):\n<textarea ... data-link=\"{upper:name:lower}\"></textarea>\n\nOne-way:\n<textarea ... data-link=\"{:name}\"></textarea>\n\nOne-way with ‘upper’ converter:\n<textarea ... data-link=\"{upper:name}\"></textarea>\n\nTwo-way, with convert/convert back – trigger=false (no trigger on keydown - only on blur):\n<textarea ... data-link=\"{upper:name trigger=false:lower}\"></textarea>\n\nData-linked span:\n<span data-link=\"name\"></span>\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "link-contenteditable": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following sample shows data-linked contenteditable elements, with two-way binding, one-way binding, and use of converters (convert and convert back).\n"
      },
      {
        "_type": "sample",
        "title": "Two-way binding with contenteditable elements",
        "text": "Two-way binding with contenteditable elements\n*[contenteditable] {display: inline-block; border: 1px solid green; margin-bottom:8px; padding: 5px;}\n\n\n\n  <span contenteditable=\"true\" data-link=\"name\"></span>\n  <em>Two-way</em><br/>\n\n  <span contenteditable=\"true\" data-link=\"{upper:name:lower}\"></span>\n  <em>Two-way with 'upper' and 'lower' converters (convert/convert back)</em><br/>\n\n  <span contenteditable=\"true\" data-link=\"{:name}\"></span>\n  <em>One-way</em><br/>\n\n  <span contenteditable=\"true\" data-link=\"{upper:name}\"></span>\n  <em>One-way with 'upper' converter</em><br/>\n\n  <span contenteditable=\"true\" data-link=\"{upper:name trigger=false:lower}\"></span>\n  <em>Two-way with convert/convert back (no trigger on keydown, only on blur)</em><br/>\n\n  <span class=\"spanbox pre\" data-link=\"name\"></span>\n  <em>Data-linked span</em>\n\n$.views.converters({\n  upper: function(val) {\n    return val.toUpperCase();\n  },\n  lower: function(val) {\n    return val.toLowerCase();\n  }\n});\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo\\nBlow\"};\n\ntmpl.link(\"#result\", person);\nTwo-way:\n<span contenteditable=\"true\" data-link=\"name\"></span>\n\nOne-way:\n<span contenteditable=\"true\" data-link=\"{:name}\"></span>\n\nOne-way with ‘upper’ converter:\n<span contenteditable=\"true\" data-link=\"{upper:name}\"></span>\n\nTwo-way with ‘upper’ and ‘lower’ converters (convert/convert back):\n<span contenteditable=\"true\" data-link=\"{upper:name:lower}\"></span>\n\nTwo-way with convert/convert back – trigger=false (no trigger on keydown, only on blur):\n<span contenteditable=\"true\" data-link=\"{upper:name trigger=false:lower}\"></span>\n\nData-linked span:\n<span data-link=\"name\"></span>\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "link-widgets": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n  {^{on ~changeName}}Change name{{/on}}\n  <input data-link=\"name\" /><br/><br/>\n\n  <div data-link=\"name\"></div>\n  <div data-link=\"text{:name}\"></div>\n  <div data-link=\"html{:name}\"></div>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo Blow\"};\nvar swapped = false;\n\ntmpl.link(\"#result\", person, {changeName: function() {\n  swapped = !swapped;\n  $.observable(person).setProperty(\"name\", swapped ? \"Jethro Tull\" : \"Jo Blow\");\n}});\n"
      }
    ]
  },
  "link-tags": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The most common data-link expression for a data-linked element is a data path, such as:\n<div data-link=\"address.street\"></div>...\n\n– which is actually abbreviated syntax, and is equivalent to the full syntax:\n<div data-link=\"{:address.street}\"></div>...\n\nIn fact this example is using the default target of innerText, and is equivalent to the even more explicit syntax:\n<div data-link=\"text{:address.street}\"></div>...\n\nFor explanation and examples of the full syntax see the Data-linked elements (full syntax) topic.\nOur example, data-link=\"{:address.street}\" corresponds to the JsViews tag {^{:address.street}}.\nSimilarly we can data-link not only to {^{:...}} but to any tag, such as:\n{^{>...}}, {^{for...}}, {^{if}}, {^{on}}, {^{slider}}, {^{mytag}} etc.\n\nFor example to use {^{mytag .../}} as an element binding, you simply remove the initial {^ and the last }, and optionally specify a target, such as title:\ndata-link=\"title{mytag ...}\"\n\nA data-linked element can use multiple bindings, each of which has a target and a link expression, and where the link expression corresponds to a data-linked JsViews/JsRender tag:\ndata-link=\"target1{linkExpression1} target2{linkExpression2}\" ...\n\nExamples of tags are:\n{^{:age}}\n{^{>name}}\n{^{slider age/}}\n{^{if age < 15}}Child{{else age > 65}}Senior{{else}}Adult{{/if}}\n{^{for phones}}...{{/for}}\n{^{on increaseAge}}Increase Age{{/on}}\n{^{mytag person.name/}} \n\nThe following examples show the same tags used as link expressions for data-linking elements:\n<div data-link=\"age\"></div>\n<div data-link=\"name\"></div>\n<div data-link=\"{slider age}\"></div>\n<span data-link=\"{if age < 15 tmpl='Child'}{else age > 65 tmpl='Senior'}{else tmpl='Adult'}\"></span>\n<div data-link=\"{for phones tmpl='#phonesTmpl'}\"></div>\n<button data-link=\"{on increaseAge}\">Increase Age</button>\n<div data-link=\"{mytag person.name}\"></div>\n\nAnd the following example shows two bindings, one using the default target, and binding to a {^{slider}} tag and the other targeting the CSS background property of the div, and binding to an {^{if ...}}}{{else ...}}{{else}} tag:\n<div data-link=\"{slider age}\n css-background{if ... tmpl='green'}{else ... tmpl='red'}{else tmpl='blue'}\"></div>\n\n"
      },
      {
        "_type": "sample",
        "title": "tag binding examples",
        "text": "tag binding examples\n\n\n  \n\n  \n\n  \n\n  Age:\n  \n\n\n\nvar person = {age: 23};\n\n$.views.converters(\"ageCat\", function(val) {\n  var category;\n  if (val < 15) {\n     category = \"Child\";\n  } else if (val > 65) {\n     category = \"Senior\";\n  } else {\n     category = \"Adult\";\n  }\n  return val + \" (\" + category + \")\";\n});\n\n$.link(true, \"#topLevel\", person);\nA top-level <div> is data-linked to a slider (two-way binding to age).\nIn addition, its background color is also data-linked to age, using an {if}{else} binding:\n<div data-link=\"\n  {slider age ...}\n\n  css-background{if age < 15 tmpl='green'}\n  {else age > 65 tmpl='red'}\n  {else tmpl='blue'}\n\"></div>\n\nA top-level <span> is also data-linked to age – but here instead of using an {if}{else} binding, we use the alternative approach of a {:} binding with a converter:\n<span data-link=\"{ageCat:age}\"></span>\n\nwhere the converter allows us to provide equivalent if/else semantics, in code:\n$.views.converters(\"ageCat\", function(val) {\n  var category;\n  if (val < 15) {\n     category = \"Child\";\n  } else if (val > 65) {\n     category = \"Senior\";\n  } else {\n     category = \"Adult\";\n  }\n  return val + \" (\" + category + \")\";\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following sample illustrates how any tags can be used within a template with either tag syntax or data-linked element syntax (tag bindings).\nThe identical data-linked element syntax can also be used for binding top-level data-linking elements.\nIn all three situations, the resulting rendering and interactivity are the same.\n"
      },
      {
        "_type": "sample",
        "title": "tags in template / tag bindings in template / top-level tag bindings",
        "text": "tags in template / tag bindings in template / top-level tag bindings\n\n  button {margin-bottom: 12px;}\n  .ui-slider {margin: 16px 0;}\n  .summary {margin: 8px 0 18px 0}\n\n\n\n  <div>\n    <span data-link=\"\n      {if cell tmpl='Home'}\n      {else tmpl='Cell'}\n    \"></span>:\n    <span data-link=\"number\"></span>\n  </div>\n\n\n\n\n<h3>(Tags in template)</h3>\n\n{^{on increaseAge}}Increase Age{{/on}}\n{^{for phones}}<div>\n  {^{if cell}}Home{{else}}Cell{{/if}}: {{:number}}</div>\n{{/for}}\n{^{slider age _max=99 width=\"50%\"/}}\n<label>Age:</label>\n{^{>age}}\n({^{if 15>age}}Child{{else age>65}}Senior{{else}}Adult{{/if}})\n{^{summary/}}\n\n<hr/>\n\n<h3>(Data-linked elements in template)</h3>\n\n<div>\n  <button data-link=\"{on increaseAge}\">Increase Age</button>\n  <div data-link=\"{for phones tmpl='#phonesTmpl'}\"></div>\n  <div data-link=\"{slider age _max=99 width='50%'}\"></div>\n  <label>Age:</label>\n  <span data-link=\"age\"></span>\n  (<span data-link=\"\n    {if 15>age tmpl='Child'}\n    {else age>65 tmpl='Senior'}\n    {else tmpl='Adult'}\n  \"></span>)\n  <div data-link=\"{summary}\"></div>\n</div>\n\n\n\n\n\n\n(Top-level data-linked elements)\n\n\n  Increase Age\n  \n  \n  Age:\n  \n ()\n  \n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [\n    {number: \"111 111 1111\"},\n    {number:\"222 222 2222\", cell: true}\n  ],\n  age: 23,\n  increaseAge: function() {\n    $.observable(this).setProperty(\n      \"age\",\n      this.age + 10\n    );\n  }\n};\n\n$.views.tags(\n  \"summary\",\n  \"My name is {{>name}}.\"\n  + \"I am {^{:age}} years old.\"\n);\n\ntmpl.link(\"#result\", person);\n$.link(true, \"#topLevel\", person);\nTag syntax within a template:\n{^{on increaseAge}}Increase Age{{/on}}\n{^{for phones}}\n  <div>{^{if cell}}Home{{else}}Cell{{/if}}...</div>\n{{/for}}\n{^{slider age/}}\n...\n({^{if ...}}...{{else ...}}...{{else}}...{{/if}})\n{^{summary/}}\n\nData-linked element syntax (tag bindings) either within a template or on top-level elements:\n<button data-link=\"{on increaseAge}\">Increase Age</button>\n<div data-link=\"{for phones tmpl='#phonesTmpl'}\"></div>\n<div data-link=\"{slider age}\"></div>\n...\n<span data-link=\"{if ...}{else ...}{else ...}\"></span>\n<div data-link=\"{summary}\"></div>\n\nCode to set up data-linking:\ntmpl.link(\"#result\", person); // Data-linked template\n\n$.link(true, \"#topLevel\", person); // Data-linked top-level elements\n\n\n"
      },
      {
        "_type": "para",
        "title": "Default tag binding targets",
        "text": "Default tag binding targets\nData-linked expressions generally use the default target innerText, but data-linked tag bindings default to innerHTML.\nHere are the details:\nFor data-linked expressions, such as:\n<div data-link=\"address.street\">...\n<input data-link=\"address.street\" />...\n\nor equivalently:\n<div data-link=\"{:address.street:}\">...\n<input data-link=\"{:address.street:}\" />...\n\nthe default target is value for input or select elements, and text (innerText) for most other elements, so the above are equivalent to:\n<div data-link=\"text{:address.street:}\">...\n<input data-link=\"value{:address.street:}\" />...\n\nFor tag bindings, such as:\n<div data-link=\"{mytag}\">...\n<input data-link=\"{mytag}\" />...\n\nthe default target is value for input or select elements, and html (innerHTML) for most other elements, so the above are equivalent to:\n<div data-link=\"html{mytag}\">...\n<input data-link=\"value{mytag}\" />...\n\nA custom tag can also specify its default target attribute, using the attr tag option.\n"
      }
    ]
  },
  "link-svg": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Data-linking to SVG element attributes works exactly the same as with data-linking to HTML element attributes. Simply use the attribute name as data-link target.\nFor example to data-link to the cx attribute of an SVG element, use:\ndata-link=\"cx{:dataPathOrExpression}\"\n\n"
      },
      {
        "_type": "sample",
        "text": "\n  .svg {\n    height: 280px;\n    width: 100%;\n    border: 1px solid #bbb;\n    margin: 2px 0 -2px -4px;\n  }\n\n\n\n\n\n  <p>\n    x: <input data-link=\"x\" /><br/>\n    Rotate: <input data-link=\"angle\" />\n  </p>\n\n  <svg class=\"svg\">\n    <ellipse stroke-width=\"2\" rx=\"140\" ry=\"70\" cy=\"140\" fill=\"yellow\" stroke=\"blue\"\n      data-link=\"\n        cx{:x}\n        transform{:'rotate(' + angle + ' ' + x + ' 140)'}\n      \"\n    ></ellipse>\n  </svg>\n\n\nvar data = {x: 300, angle: 30};\n\nvar svgTmpl = $.templates(\"#svgTemplate\");\n\nsvgTmpl.link(\"#result\", data);\n<svg class=\"svg\">\n  <ellipse ... data-link=\"\n    cx{:x}\n    transform{:'rotate(' + angle + ...)'}\n  \">...\n</svg>\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "link-css": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "To data link to CSS attributes, use css-attribute-name as data-link target.\nFor example to data-link to the CSS background-color use css-background-color:\ndata-link=\"css-background-color{:dataPathOrExpression}\"\n\n"
      },
      {
        "_type": "sample",
        "text": "div div {border: 2px solid gray;}\n\n\n\n  {^{on ~changeData}}Change CSS and text{{/on}}<br/><br/>\n\n  Text: <input data-link=\"text\" /><br/>\n  Color: <input data-link=\"color\" /><br/>\n  Background: <input data-link=\"backcolor\" /><br/>\n  Width: <input data-link=\"divWidth\" /><br/><br/>\n\n  <div data-link=\"css-color{:color} css-background-color{:backcolor} css-width{:divWidth} {:text}\"></div>\n\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar divData = {\n        text: \"Some text\",  \n        color: \"red\",\n        backcolor: \"yellow\",\n        divWidth: 155\n    };\nvar swapped = false;\n\nfunction changeData() {\n  swapped = !swapped;\n  $.observable(divData).setProperty(\n    swapped\n    ? {\n        text: \"Other content\",  \n        color: \"#f0f\",\n        backcolor: \"#0ff\",\n        divWidth: \"17em\"\n      }\n    : {\n        text: \"Some text\",  \n        color: \"red\",\n        backcolor: \"yellow\",\n        divWidth: 155\n    });\n}\n\ntmpl.link(\"#result\", divData, {changeData: changeData});\n<div data-link=\"\n  css-color{:color}\n  css-background-color{:backcolor}\n  css-width{:divWidth}\n  {:text}\n\"></div>\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "link-text-html": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The default data-linking target for a data-linked element is innerText – so the following two examples are equivalent:\n<div data-link=\"name\"></div>\n\n<div data-link=\"text{:name}\"></div>\n\nTo data-link to innerHTML, use the html{} binding:\n<div data-link=\"html{:name}\"></div>\n\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n  {^{on ~changeName}}Change name{{/on}}\n  <input data-link=\"name\" /><br/>\n\n  <div data-link=\"name\"></div>\n  <div data-link=\"text{:name}\"></div>\n  <div data-link=\"html{:name}\"></div>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {name: \"Jo Blow\"};\nvar swapped = false;\n\ntmpl.link(\"#result\", person, {changeName: function() {\n  swapped = !swapped;\n  $.observable(person).setProperty(\"name\", swapped ? \"Jethro Tull\" : \"Jo Blow\");\n}});\n<div data-link=\"name\"></div>\n<div data-link=\"text{:name}\"></div>\n<div data-link=\"html{:name}\"></div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "HTML encoding of data-linked text",
        "text": "HTML encoding of data-linked text\nThe following approaches all guarantee HTML encoding – and therefore protect against HTML injection from data containing untrusted markup:\n<div data-link=\"name\"></div>\n<div data-link=\"text{:name}\"></div>\n<div data-link=\"html{>name}\"></div>\n{^{>name}}\n\n(See Encoding to avoid XSS).\nTo insert HTML markup without encoding (for example, from trusted markup in data), either of the following styles can be used:\n<div data-link=\"html{:name}\"></div>\n{^{:name}}<br/>\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: Data-linked elements.\n"
      }
    ]
  },
  "link-class": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The value of the class attribute of an HTML element (corresponding to the className property of the HTMLElement object) is generally a white-space-separated list of class names.\nThere are two possible approaches to data-linking to class.\n\nData-link a string expression to the class as a whole, simply by setting the target to class{:...} (just as with data-linking to any other HTML attribute)\nData-link a boolean expression to class using the merge converter, in order to toggle a single class name in the white-space-separated list (adding the class when the boolean is true, and removing it when false)\n\nThe following example uses the two approaches to set the class of a div to 'redColor greenBorder yellowBackground' if a boolean isFoo is true, and otherwise to 'blueColor greenBorder'.\n"
      },
      {
        "_type": "sample",
        "text": "\n  .redColor {color:red;}\n  .blueColor {color:blue;}\n  .greenBorder {border:1px solid green;}\n  .yellowBackground {background-color:yellow;}\n\n\n\n\n\n\n  <em>Data-link class to string:</em><br/><br/>\n\n  {^{on ~setClassString}}Set class{{/on}} <br/><br/>\n\n  <div data-link=\"class{:classString}\">\n    Data-link class to string\n  </div><br/>\n\n  <em>Toggle individual class names:</em><br/><br/>\n\n  <label><input type=\"checkbox\" data-link=\"isFoo\" /> isFoo</label> <br/><br/>\n\n  <div class=\"greenBorder\" data-link=\"\n    class{merge:isFoo toggle='redColor'}\n    class{merge:isFoo toggle='yellowBackground'}\n    class{merge:!isFoo toggle='blueColor'}\n  \">Toggle individual class names</div>\n\n\nfunction setClassString() {\n  swapped = !swapped;\n  $.observable(data).setProperty(\n    \"classString\",\n    swapped\n      ? \"redColor greenBorder yellowBackground\"\n      : \"blueColor greenBorder\"\n  );\n}\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  isFoo: false,\n  classString: \"blueColor greenBorder\"\n};\nvar swapped = false;\n\ntmpl.link(\"#result\", data, {setClassString: setClassString});\n\nData-link class to string:\n<div data-link=\"\n  class{:classString}\n\">...\n\nToggle individual class names:\n<div class=\"greenBorder\" data-link=\"\n  class{merge:isFoo toggle='redColor'}\n  class{merge:isFoo toggle='yellowBackground'}\n  class{merge:!isFoo toggle='blueColor'}\n\">...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For further details, see the tutorial topics Data-linking class and Toggling class.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "link-visibility": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The visible data-link target is a special built-in target in JsViews, which works through the CSS display property. It works by data-linking directly to a boolean property:\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n\n  <label><input type=\"checkbox\" data-link=\"isFoo\" /> isFoo</label> <br/><br/>\n\n  <div data-link=\"visible{:isFoo}\">\n    Show this if <em>isFoo</em> is true...\n  </div>\n\n  <div data-link=\"visible{:!isFoo}\">\n    If <em>isFoo</em> is not true, show this...\n  </div>\n\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {isFoo: false};\n\ntmpl.link(\"#result\", data);\n\n<div data-link=\"visible{:isFoo}\">...</div>\n\n<div data-link=\"visible{:!isFoo}\">...</div>\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "link-props": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-events": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews provides alternative ways of attaching handlers for events such as the click event:\n\nUsing jQuery event binding to attach a handler function to elements (either at top level or rendered by templates):\n$(selector).on(\"click\", handlerFn);\n\nUsing the {on} data-link binding (either on top-level data-linked elements or on elements rendered by\ntemplates):\n<button data-link=\"{on handlerFn}\">...</button>\n\nUsing the {^{on}} tag, within templates:\n{^{on handlerFn/}}\n\n\nHere are working examples of each approach:\n"
      },
      {
        "_type": "para",
        "title": "Using jQuery event binding",
        "text": "Using jQuery event binding\n$(selector).on(\"click\", handler);\n\njQuery event binding can be used to attach a handler to elements either at top level or rendered by templates.\nHere is an example showing both a top-level button element and an element within a template:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "top level\n\n\n\n  <button class=\"myButton\">in template</button>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {};\n\nvar helpers = {\n  doSomething: function() {\n    alert(\"do something\");\n  }\n}\n\ntmpl.link(\"#result\", person); // Render and link the template\n\n// Attach handler to buttons (class 'myButton'), whether in top-level or rendered content.\n$(\".myButton\").on(\"click\", helpers.doSomething);\n\n<button class=\"myButton\">top level</button>\n<span id=\"result\"></span>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button class=\"myButton\">in template</button>\n</script>\n\n...\ntmpl.link(\"#result\", person); // Render and link the template\n\n// Attach handler to buttons (class 'myButton'), whether in top-level or rendered content. \n$(\".myButton\").on(\"click\", helpers.doSomething);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using the {on} data-link binding",
        "text": "Using the {on} data-link binding\n<button data-link=\"{on ~doSomething}\">...</button>\n\nThe {on} data-link binding provides a declarative approach to attaching handlers to elements. The handlerFn argument is passed along with other optional arguments and properties (details below): {on ... handlerFn ...}. (The first argument of type ‘function’ will be treated as handler argument).\nIt can be used either on top-level elements (provided they are data-linked – see top-level data linking), or on elements rendered by templates. Here is an example of each:\n"
      },
      {
        "_type": "sample",
        "text": "\n  top level\n\n\n\n\n\n  <button data-link=\"{on ~doSomething}\">in template</button>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {};\n\nvar helpers = {\n  doSomething: function() {\n    alert(\"do something\");\n  }\n}\n\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n\n$.link(true, \"#topLinked\", person, helpers); // Data-link top-level content\n\n\n<span id=\"topLinked\">\n  <button data-link=\"{on ~doSomething}\">top level</button>\n</span>\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  <button data-link=\"{on ~doSomething}\">in template</button>\n</script>\n\n...\nvar helpers = {doSomething: function(){...} }\n\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n\n$.link(true, \"#topLinked\", person, helpers); // Data-link top-level content\n\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See the Editable data: hash/dictionary sample for an example of use of the {on} data-link binding, both in a template and at top-level\n"
      },
      {
        "_type": "para",
        "title": "Using the {^{on}} tag, within templates",
        "text": "Using the {^{on}} tag, within templates\nWithin templates, the tag form {^{on ...}} of the JsViews ‘on’ event binding can be convenient, as an alternative to data-link={on ...}:\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n  {^{on ~doSomething/}}\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {};\n\nvar helpers = {\n  doSomething: function() {\n    alert(\"do something\");\n  }\n}\n\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{on ~doSomething/}}\n</script>\n\n...\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n\n\n"
      },
      {
        "_type": "para",
        "title": "Calling a View Model method in the click event",
        "text": "Calling a View Model method in the click event\nA common usage scenario for the {on} event binding is to have the click event invoke a View Model method – for example, to provide a button to invoke the add() method, as in this sample.\n"
      },
      {
        "_type": "para",
        "title": "<b style=\"font-style: normal\">Features of the <b style=\"font-style: italic\">data-link=\"{on ...}\"</b> binding and the <b style=\"font-style: italic\">{^{on ...}}</b> tag</b>",
        "text": "Features of the data-link=\"{on ...}\" binding and the {^{on ...}} tag\n"
      },
      {
        "_type": "para",
        "title": "Determining the target element",
        "text": "Determining the target element\nThe data-link=\"{on ...}\" binding and the {^{on ...}} tag provide alternative (and generally equivalent) ways of attaching handler actions to HTML elements – differing only in how they determine which element is used:\n\nWith data-link, the element is the data-linked element\n<button data-link=\"{on ~doSomething}\">\n  Click me\n</button>\n\nWith {^{on ...}} the element is the element (or elements) wrapped by the tag\n{^{on ~doSomething}}\n  <button>\n    Click me\n  </button>\n{{/on}}\n\n\nThe HTML element above can of course be any HTML element – not necessarily <button>. But in the particular case of an {^{on}} tag wrapping a <button>, a simpler format is available – since the {^{on}} tag wrapping only text will automatically render itself as a <button>:\n"
      },
      {
        "_type": "para",
        "title": "The {^{on}} tag as button",
        "text": "The {^{on}} tag as button\nIn the case of an {^{on ...}} which wraps only text, the tag generates a <button> element with the text as label – and attaches to that element.\n{^{on ~doSomething}}\n  Click me\n{{/on}}\n\nSimilarly, {^{on ...}} with a tmpl='sometext' property generates a <button> with the text as label.\n{^{on ~doSomething tmpl=\"Click me\" /}}\n\nFinally, {^{on ...}} with no content at all will generate a <button>, and use the handler name as label.\n{^{on ~doSomething /}}\n\nHere is a working sample with six examples showing alternative styles for creating a clickable button.\nThe last example also shows that a simple {^{on ...}}test{{/on}} – for which the <button> is generated – still lets you set the button id, width, height and class (by setting those properties directly on the tag).\n"
      },
      {
        "_type": "sample",
        "text": "\n  .red {color: red!important;}\n\n\n\n\n\n  <button data-link=\"{on ~doSomething}\" id=\"btn0\">Click me</button>\n\n  {^{on ~doSomething}}<button id=\"btn1\">Click me</button>{{/on}}\n\n  {^{on ~doSomething}}Click me{{/on}}\n\n  {^{on ~doSomething tmpl=\"Click me\" /}}\n\n  {^{on ~doSomething /}}\n\n  {^{on ~doSomething height=18 width=75 class=\"red\" id=\"btn5\"}}Click me{{/on}}\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {};\n\nvar helpers = {\n  doSomething: function(ev) {\n    alert(\"do something. id: \" + ev.target.id);\n  }\n}\n\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n\n<button data-link=\"{on ~doSomething}\" id=\"btn0\">Click me</button>\n\n{^{on ~doSomething}}<button id=\"btn1\">Click me</button>{{/on}}\n\n{^{on ~doSomething}}Click me{{/on}}\n\n{^{on ~doSomething tmpl=\"Click me\" /}}\n\n{^{on ~doSomething /}}\n\n{^{on ~doSomething height=18 width=75 class=\"red\" id=\"btn5\"}}Click me{{/on}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Choosing the events",
        "text": "Choosing the events\nThe handlerFn argument of {on ...} can optionally be preceded by an eventName string argument  containing one or more white-space separated event names (or namespaced event names, such as \"click.my.ns\").\nIn the absence of an eventName argument, the default is to use the \"click\" event.\nHere is an sample showing three examples – which attach to the \"mouseup mousedown\", \"change\" and \"submit\" events, respectively.\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n  <label><input type=\"checkbox\" data-link=\"{on 'change' change}\"/> Decrease on change</label>\n\n  {^{on \"mouseup mousedown\" mouseUpAndDown}}Increase on up and down{{/on}} <br/>\n\n  <form data-link=\"{on 'submit' formSubmit}\">\n    Age: {^{>age}} <br/>\n    Name: <input data-link=\"name\" /> <br/>\n    Submitted: {^{>submitted}} <br/><br/>\n\n    <button type=\"submit\">Submit</button>\n  </form> \n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {\n  name: \"Jo\",\n  age: 20,\n  submitted: false,\n  change: function() {\n    $.observable(this).setProperty({\n      age: this.age - 1,\n      submitted: false\n    });\n  },\n  mouseUpAndDown: function() {\n    $.observable(this).setProperty({\n      age: this.age + 1,\n      submitted: false\n    });\n  },\n  formSubmit: function() {\n    $.observable(this).setProperty(\"submitted\", true);\n    return false;\n  }  \n};\n\ntmpl.link(\"#result\", person); // Render and link the template\n\n<input type=\"checkbox\" data-link=\"{on 'change' change}\"/> ...\n\n{^{on \"mouseup mousedown\" mouseUpAndDown}} ...\n\n<form data-link=\"{on 'submit' formSubmit}\"> ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the same sample – but attaching to top-level data-linked elements rather than to content rendered by a data-linked template:\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n   Decrease on change\n\n  Increase on up and down \n\n  \n    Age:  \n    Name:  \n    Submitted:  \n\n    Submit\n   \n\nvar person = {\n  name: \"Jo\",\n  age: 20,\n  submitted: false,\n  change: function() {\n    $.observable(this).setProperty({\n      age: this.age - 1,\n      submitted: false\n    });\n  },\n  mouseUpAndDown: function() {\n    $.observable(this).setProperty({\n      age: this.age + 1,\n      submitted: false\n    });\n  },\n  formSubmit: function() {\n    $.observable(this).setProperty(\"submitted\", true);\n    return false;\n  }  \n};\n\n$.link(true, \"#linkedContent\", person); // Data-link top-level content\n\n<input type=\"checkbox\" data-link=\"{on 'change' change}\"/> ...\n\n<button data-link=\"{on 'mouseup mousedown' mouseUpAndDown}\"> ...\n\n<form data-link=\"{on 'submit' formSubmit}\"> ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(For a more complete example of attaching to the \"submit\" event, see the Using submit sample.)\n"
      },
      {
        "_type": "para",
        "title": "Attaching handlers to specific elements within nested content &ndash; the selector argument",
        "text": "Attaching handlers to specific elements within nested content – the selector argument\nIf the {on} binding is on an element or tag with nested element content, then an additional optional selector argument can be passed (after the eventName argument and before the handlerFn argument).\nAs a result the event handler will be attached to the element(s) targeted by the selector. (This is equivalent to the jQuery ‘delegated events’ pattern).\nHere is an example where only the <li>s of class active have click handlers attached:\n"
      },
      {
        "_type": "sample",
        "text": ".active {border: 1px solid green; width: 100px; background-color: white; cursor: pointer;}\n\n\n\n\n<ul>\n  {^{on 'click' '.active' select}}\n    <li>one</li>\n    <li class=\"active\">two</li>\n    <li class=\"active\">three</li>\n  {{/on}}\n</ul>\n\n\n\n  \n    one\n    two\n    three\n  \n\n\n\nvar data = {\n  select: function(ev, eventArgs) {\n    var targetStyle = ev.target.style;\n    targetStyle.backgroundColor = targetStyle.backgroundColor===\"yellow\" ? \"white\" : \"yellow\";\n  }  \n};\n\n$.link(true, \"#linkedContent\", data); // Data-link top-level content\n\n$.templates(\"#tmpl\").link(\"#result\", data); // Render and link template\n\nExample, with {^{on}} tag:\n{^{on 'click' '.active' select}}\n  <li>one</li>\n  <li class=\"active\">two</li>\n  ...\n\nExample, with data-link=\"{on}\" binding:\n<ul data-link=\"{on 'click' '.active' select}\">\n  <li>one</li>\n  <li class=\"active\">two</li>\n  ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "Multiple {on} bindings on the same element",
        "text": "Multiple {on} bindings on the same element\nIt is possible to have multiple {on} bindings on the same element – which might use different selector, eventName or handler arguments. The following sample has an outer <div> element with three {on} bindings – each attaching a different handler to different elements in the nested content  (specified by different selector arguments):\n"
      },
      {
        "_type": "sample",
        "text": "\nul { margin: 0; padding-left: 0;}\nli {border: 1px solid green; width: 100px; background-color: white; cursor: pointer; list-style: none;}\n\n\n\n  <div data-link=\"\n    {on 'click' '.addBtn' add}\n    {on 'click' '.remove' remove}\n    {on 'click' 'li' select}\n  \">\n    <button class=\"addBtn\">add</button>\n    <ul>\n      {^{for items}}\n        <li>{{>label}} <span class=\"remove\"></span></li>\n      {{/for}}\n    </ul>\n  </div>\n\n\n\n\nvar cnt = 0,\ndata = {\n  add: function(ev, eventArgs) {\n    $.observable(data.items).insert({label: \"new\" + cnt++});\n  }, \n  remove: function(ev, eventArgs) {\n    var index = $.view(ev.target).index\n    $.observable(data.items).remove(index);\n    return false;\n  },\n  select: function(ev, eventArgs) {\n    var targetStyle = ev.target.style;\n    targetStyle.backgroundColor = targetStyle.backgroundColor===\"yellow\" ? \"white\" : \"yellow\";\n  },  \n  items: [\n    {label: \"one\"},\n    {label: \"two\"},\n    {label: \"three\"}\n  ]\n};\n\n$.templates(\"#tmpl\").link(\"#result\", data); // Render and link template\n<div data-link=\"\n  {on 'click' '.addBtn' add}\n  {on 'click' '.remove' remove}\n  {on 'click' 'li' select}\n\">\n  <button class=\"addBtn\">add</button>\n  <ul>\n    {^{for items}}\n        <li>{{>label}} <span class=\"remove\"></span></li>\n        ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And similarly, the following variant of the same sample wraps the same nested element content as above with three {^{on}} tags – each of which attaches a handler to different nested elements:\n"
      },
      {
        "_type": "sample",
        "text": "\nul { margin: 0; padding-left: 0;}\nli {border: 1px solid green; width: 100px; background-color: white; cursor: pointer; list-style: none;}\n\n\n\n  {^{on 'click' '.addBtn' add}}\n    {^{on 'click' '.remove' remove}}\n      {^{on 'click' 'li' select}}\n        <button class=\"addBtn\">add</button>\n        <ul>\n          {^{for items}}\n            <li>{{>label}} <span class=\"remove\"></span></li>\n          {{/for}}\n        </ul>\n      {{/on}}\n    {{/on}}\n  {{/on}}\n\n\n\n\nvar cnt = 0,\ndata = {\n  add: function(ev, eventArgs) {\n    $.observable(data.items).insert({label: \"new\" + cnt++});\n  }, \n  remove: function(ev, eventArgs) {\n    var index = $.view(ev.target).index\n    $.observable(data.items).remove(index);\n    return false;\n  },\n  select: function(ev, eventArgs) {\n    var targetStyle = ev.target.style;\n    targetStyle.backgroundColor = targetStyle.backgroundColor===\"yellow\" ? \"white\" : \"yellow\";\n  },  \n  items: [\n    {label: \"one\"},\n    {label: \"two\"},\n    {label: \"three\"}\n  ]\n};\n\n$.templates(\"#tmpl\").link(\"#result\", data); // Render and link template\n{^{on 'click' '.addBtn' add}}\n  {^{on 'click' '.remove' remove}}\n    {^{on 'click' 'li' select}}\n      <button class=\"addBtn\">add</button>\n      <ul>\n        {^{for items}}\n          <li>{{>label}} <span class=\"remove\"></span></li>\n          ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "The selector argument can target elements that are added later",
        "text": "The selector argument can target elements that are added later\nThe above two samples illustrate the fact that the ‘delegated events’ pattern (using a selector argument) can target elements which are added later in time – and were not yet present when the {on} binding was created.\nIn this case, clicking add will add a new <li> which can be selected and removed thanks to the already established {on} bindings for the select and remove handler actions.\n"
      },
      {
        "_type": "para",
        "title": "Passing parameters",
        "text": "Passing parameters\nThe {on} binding can include parameters to be passed to the handler:\n{on ... myHandler param1 param2}\n\nIn the above case the handler should have the signature function(param1, param2, ev, eventArgs)\n"
      },
      {
        "_type": "para",
        "title": "Setting context",
        "text": "Setting context\nThe {on} binding can take an optional context property – used to specify the this pointer in the handler.\nIf no context property is provided then:\n\nif the provided handler is a 'property chain’, such as a.b.myHandler, the context will be the preceding object in the chain – in this case a.b\notherwise, it will be the current data context\n\nFor example if the current data context is team:\n\n{on add}– Here the handler is the team.add() method, the this pointer is team\n{on settings.edit}– Here the handler is the team.settings.edit() method, the this pointer is team.settings\n{on ~reverse}– Here the handler is the reverse() helper method, the this pointer is team\n{on settings.edit context=#data}– Here the handler is the settings.edit() method, the this pointer is team\n{on ~reverse context=settings}– Here the handler is the reverse() helper method, the this pointer is team.settings\n\n"
      },
      {
        "_type": "para",
        "title": "Passing data",
        "text": "Passing data\nThe {on} binding can take an optional data property – used to specify data which will then be passed to the handler as ev.data.\n"
      },
      {
        "_type": "para",
        "title": "The signature of the event handler function",
        "text": "The signature of the event handler function\nIf the {on} binding is:\n{^{on 'click' myHandler param1 param2 data=myData}}\n\nor\ndata-link=\"{on 'click' myHandler param1 param2 data=myData}\"\n\nthen the myHandler function should have the signature:\nfunction myHandler(param1, param2, ev, eventArgs) { ... }\n\nwhere ev is the jQuery event object, with properties that include:\n\ntarget: the HTML element where the click event occurred\ndata: the myData data\n\nand eventArgs is the JsViews event object, with properties:\n\nchange: the event: \"click\"\nlinkCtx: the link context\nview: the view object\n\n"
      },
      {
        "_type": "para",
        "title": "<b style=\"font-style: normal\">{on} binding &ndash; API summary</b>",
        "text": "{on} binding – API summary\nThe following is a summary of the arguments and properties which can be provided to the {on} binding:\n"
      },
      {
        "_type": "tag",
        "title": "",
        "text": "{^{on}} tag or {on} data-link binding\n\n{^{on myHandler /}}\n{^{on myHandler}}Click me{{/on}}\n{^{on 'click' ~showMsg msg tmpl=\"Click me\"/}}\n{^{on 'click' '.btn' ~go context=~root}}...{{/on}}\n\ndata-link=\"{on myHandler}\"\ndata-link=\"{on 'click' ~showMsg msg}\"\ndata-link=\"{on 'click' '.btn' ~go context=~root}\"\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is a sample which shows the use of most of the above API features:\n"
      },
      {
        "_type": "sample",
        "text": "table {width:80%;}\n\n\n  <table\n    data-link=\"\n      {on 'focusin' 'input' ~hlp.focusIn 'Textbox:' context=~settings data=address}\n      {on 'focusout' 'input' ~hlp.focusOut}\n    \">\n    <tbody><tr>\n      <td>\n        <input data-link=\"first\"/>\n      </td><td>\n        <input data-link=\"last\"/>\n      </td><td style=\"width:40%\">\n        Click in textbox, to change this message\n      </td>\n    </tr></tbody>\n  </table>\n\n\n\nvar cnt = 0,\n  person = {\n    first: \"Jo\",\n    last: \"Blow\",\n    address: {street: \"1st\"}\n  },\n  helpers = {\n    settings: {\n      format: function(message, val, street) {\n        return message + \" \" + val + \" Address: \" + street;\n      }\n    },\n    hlp: {\n      focusIn: function(msg, ev, eventArgs) {\n        var message = this.format(msg, ev.target.value, ev.data.street);\n        var lastTd = $(ev.target).parents(\"tr\").children().last();\n        lastTd.text(message);\n      },\n      focusOut: function(ev, eventArgs) {\n        var lastTd = $(ev.target).parents(\"tr\").children().last();\n        lastTd.text(\"Click in textbox, to change this message\");\n      }\n    }\n  };\n\n$.templates(\"#tmpl\").link(\"#result\", person, helpers);\n{on} data-link binding:\n<table data-link=\"{on 'focus' 'input' ~hlp.showFocus 'Textbox:' context=~settings data=address}...\">\n  <tbody><tr>\n    <td>\n      <input data-link=\"first\"/>\n      ...\n\n{on} arguments:\n\neventName: 'focus'\nselector: 'input'\nhandlerFn: ~hlp.showFocus\nparameter: 'Textbox:'\n\n{on} properties:\n\ncontext: ~settings\ndata: address\n\nHandler:\nshowFocus: function(msg, ev, eventArgs) {\n  var message = this.format(msg, ev.target.value, ev.data.street);\n  ...\n  lastTd.text(message);\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: the Compiled View Models or Using submit samples for examples of using {on} bindings to call methods on View Models.\n"
      },
      {
        "_type": "para",
        "title": "The <span style='font-style: normal'>jsv-domchange</span> event (advanced)",
        "text": "The jsv-domchange event (advanced)\nAn advanced JsViews feature allows you to add an event listener for the 'jsv-domchange' event, on an element wrapping dynamic content such as a {^{for someArray}} block, or an {^{if someExpression}} block.\nThe event handler will get called whenever the immediate content changes dynamically, as in this example:\n"
      },
      {
        "_type": "sample",
        "text": "ul {margin: 0; padding-left: 0;} li {list-style: none;}\n\n\n  {^{on add/}}\n  <ul data-link=\"{on 'jsv-domchange' domChanges} {on 'click' '.remove' remove}\">\n    {^{for items}}\n      <li>{{>label}} <span class=\"remove\"></span></li>\n    {{/for}}\n  </ul>\n\n\nChange: -\nIndex: -\n\n\n\nvar cnt = 0,\ndata = {\n  add: function(ev, eventArgs) {\n    $.observable(data.items).insert({label: \"new\" + cnt++});\n  }, \n  remove: function(ev, eventArgs) {\n    var index = $.view(ev.target).index\n    $.observable(data.items).remove(index);\n    return false;\n  },\n  domChanges: function(ev, eventArgs, tagCtx, linkCtx, observableEventArgs) {\n    $(\"#change\").text(observableEventArgs.change);\n    $(\"#index\").text(observableEventArgs.index);\n  },  \n  items: [\n    {label: \"one\"},\n    {label: \"two\"}\n  ]\n};\n\n$.templates(\"#tmpl\").link(\"#result\", data);\n<ul data-link=\"{on 'jsv-domchange' domChanges} ...\">\n  {^{for items}}\n   ...\n\ndomChanges: function(ev, eventArgs, tagCtx, linkCtx, observableEventArgs) {\n  $(\"#change\").text(observableEventArgs.change);\n  ...\n},\n\n\n"
      }
    ]
  },
  "jsvsettings/delimiters": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See also Setting tag delimiters for JsRender\n"
      },
      {
        "_type": "para",
        "title": "JsRender default tag delimiters",
        "text": "JsRender default tag delimiters\nTemplate tags in JsRender use the Mustache style: {{...}}.\nWhen using JsViews you can also use data-binding – with data-linked tags, written: {^{...}}\n"
      },
      {
        "_type": "para",
        "title": "Changing delimiters:",
        "text": "Changing delimiters:\nSometimes there can be a need to use different delimiters. For example there may be a conflict if the template is being rendered on the server using a declarative syntax such as Django with the same default delimiters {{ and }}.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following call:\n$.views.settings.delimiters(\"<%\", \"%>\");\n\nwill change the tag syntax to <%...%> for JsRender, and <^%...%>) for a data-linked tag in JsViews.\nAnd the following:\n$.views.settings.delimiters(\"<<\", \">>. \"*\");\n\nwill change to  <<...>> for a JsRender tag, and <*<...>>) for a data-linked tag in JsViews.\nThe chosen delimiters must each consist of two non-alphanumeric (and non-white-space) characters.\n(Note: $.views.settings.delimiters(...); also accepts as parameter an array such as [\"<%\", %>, \"*\"] which can be useful for reverting to a previous set of delimiters – as shown in this sample.)\n"
      },
      {
        "_type": "para",
        "title": "Verifying current setting for tag delimiters:",
        "text": "Verifying current setting for tag delimiters:\nvar delimiters = $.views.settings.delimiters();\n// Returns an array [\"{{\", \"}}\", \"^\"] - JsRender tag delimiters and JsViews link character\n\n"
      },
      {
        "_type": "sample",
        "title": "Choosing alternative tag delimiters, with JsViews",
        "text": "Choosing alternative tag delimiters, with JsViews\n\n\n\n  <b>[[>title]]</b>\n  <ul>\n    [[for members]]\n      <li>Name: [*[>name]] <input data-link=\"name\"/></li>\n    [[/for]]\n  </ul>\n\n\n$.views.settings.delimiters(\"[[\", \"]]\", \"*\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n\nvar team = {\n    title: \"A team\",\n    members: [{name: \"Jo\"}]\n  };\n\ntmpl.link(\"#result\", team);\nMarkup:\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <b>[[>title]]</b>\n  <ul>\n    [[for members]]\n      <li>Name: [*[>name>]] <input data-link=\"name\"/></li>\n    [[/for]]\n  </ul>\n</script>\n\nCode\n$.views.settings.delimiters(\"[[\", \"]]\", \"*\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the sample in the Setting tag delimiters for JsRender topic showing how to use alternative delimiters to ‘render a template with a template’.\n"
      }
    ]
  },
  "jsvsettings/debugmode": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender/JsViews has a ‘debug mode’ setting which determines whether error messages encountered during rendering are displayed.\nTo get current debug mode:\nvar isDebugMode = $.views.settings.debugMode(); // false by default\n\nTo set debug mode:\n$.views.settings.debugMode(...);\n\nDebug mode can be set to any of the following:\n\nfalse – errors during rendering will not be rendered (but an exception will be thrown)\ntrue – no exception will be thrown, but the error message will be rendered, in place of the template tag or block\n\"some string\" – no exception. The string \"some string\" will be rendered in place of the tag or block\n\"\" (empty string) – no exception. The tag or block will simply be replaced by the empty string\na function (to be used as an error handler) – no exception. The handler will run, and the error string will be rendered, or else, if the function returns a string, that string will be rendered\n\nSee Error handling and debugging for a full discussion of alternative approaches, together with details and working examples of $.views.settings.debugMode(...).\nIn particular, see this sample of using $.views.settings.debugMode(true) with JsViews, and data-linking.\n"
      }
    ]
  },
  "jsvsettings/onerror": {
    "sections": []
  },
  "jsvsettings/trigger": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "See Two-way binding.\n"
      },
      {
        "_type": "para",
        "title": "Triggering two-way binding on <b>blur</b>, rather than on <b>keydown</b>",
        "text": "Triggering two-way binding on blur, rather than on keydown\nIn the case of textboxes, textarea, contenteditable and some custom tags, you can choose whether changes to the underlying data are triggered as you type (on keydown), or only on leaving the input control (on change or blur)\nAllowed values for trigger are:\n\ntrue – data updates as you type – on keydown\nfalse – data updates on change (when the input loses focus)\n\n"
      },
      {
        "_type": "para",
        "title": "Global default trigger setting",
        "text": "Global default trigger setting\nTo get current default trigger setting:\nvar defaultTrigger = $.views.settings.trigger(); // true by default\n\nTo modify the default trigger setting:\n$.views.settings.trigger(false); // Default trigger is now false\n\n"
      },
      {
        "_type": "para",
        "title": "Overriding the trigger setting",
        "text": "Overriding the trigger setting\nThe trigger setting can be modified for individual tags or elements, by writing:\n<input data-link=\"name trigger=false\"/> \n{^{textbox name trigger=false}}\n\nNote: You can also set the trigger value to a string consisting of one or more white-space-separated event names, as in:<input data-link=\"name trigger='keyup mouseup'\"/> – but generally only the values true (actually equivalent to trigger='keydown') and false are useful.\n"
      }
    ]
  },
  "jsvsettings/advanced": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews has the following advanced settings:\n\nuseViews – default: false\nlinkAttr – default: \"data-link\"\nnoValidate – default: false\n\nand also the following ‘private’ advanced settings:\n\n_jsv – default: false\n_wm – default: current ‘wrapMap’ settings\n_fe – default: current ‘form element binding’ settings\n\nuseViews controls a performance optimization, while building the view hierarchy. For render-only scenarios with very simple templates there will usually not be any need to access the view. JsRender detects these cases, does not create a view object, and hence obtains a slight performance gain. By setting useViews to true, you guarantee that JsRender will always create views for template blocks. (Alternatively, when registering a specific template, you can set useViews: true as a template option setting: $.templates({markup: ..., useViews: true, ...})).\nlinkAttr determines the JsViews data-link attribute. By default it is data-link. If there is a conflict where another module also uses the ‘data-link’ attribute, then you can choose a different attribute for JsViews data-linking.\nFor example, if you set $.views.settings.advanced({linkAttr: \"link\"}), then you would write <input link=\"name\"/> instead of <input data-link=\"name\" /> for data-linking an <input/> to name.\nnoValidate controls whether JsViews runs validation code during data-linking, to raise an error in the case of invalid HTML structure (such as <div/> or <div><span></div>) or HTML/JsViews tag structure (such as {^{if...}} <span{{/if}} ... >). By setting noValidate to true, JsViews will skip the validation step, with a minor improvement to performance as a result.\n_jsv is a ‘private’ setting (could change in the future). If set to true JsRender provides a global _jsv variable, which gives access to the internal stores of views and of data-bindings.\n_wm is a ‘private’ setting (could change in the future). It determines the ‘wrapMap’ configuration which controls how document fragments are inserted into the DOM during data-linking. (Also used by jQuery DOM manipulation).\n_fe is a ‘private’ setting (could change in the future). If contains the ‘form element binding’ configuration, which determines the elements (such as <input/> or <textarea>) which provide two-way data-binding with JsViews – and specifies the default data-linked attribute, such as value.\nTo get current advanced settings:\nvar advancedSettings = $.views.settings.advanced();\n\nBy default the returned advancedSettings object is:\n{useViews: false, linkAttr: \"data-link\", noValidate: false, _jsv: false, _wm: ..., _fe: ...}\n\nTo set advanced settings:\n$.views.settings.advanced({useViews: true});\n// Set one or more advanced settings\n\n"
      }
    ]
  },
  "jsvsettings/allowcode": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The allow code feature is intended for use with rendered templates (using the render() method), and not for data-linked templates.\nThis is because data-linked templates are optimized to re-render incrementally when linked observable data is updated. The {{*...}} tags may therefore run additional times during updating of template content.\n"
      }
    ]
  },
  "jsvsettings": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews provides the following APIs for modifying settings:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "tmplsyntax": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews data-link syntax takes two forms:\n\nData-linked tags\nData-linked elements\n\nBoth forms use:\n\nData-linked paths\n\n"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "See also:\nTutorial sequence of samples: Data-linking tags and elements\n"
      }
    ]
  },
  "jsvapps": {
    "sections": [
      {
        "_type": "para",
        "title": "Apps using JsViews",
        "text": "Apps using JsViews\nJsViews is much more of a framework than JsRender. It does much more than just templating – providing also data-binding, MVVM support, observability of the data/model layer, support for interactive encapsulated components (JsViews tag controls), and more.\nJsViews uses the same templates as JsRender, but adds powerful data-binding features. Like JsRender it is highly flexible and expressive – so it leaves you free to work within your own choice of overall application architecture (including architectures based on MVVM, MVP or MVC – optionally with server/client integration).\nJsViews lets you use your own flavor of data/model layer – whether simple plain JavaScript objects, hand-coded View Model instances, or compiled View Models.\nThe compiled View Models pattern makes it particularly easy to follow a fully-fledged MVVM approach to apps and web pages. It provides for generating View Model instances directly from plain JSON data, and for triggering incremental UI updates when modified JSON data is obtained.\n"
      },
      {
        "_type": "para",
        "title": "Components of an app using JsViews",
        "text": "Components of an app using JsViews\nAny app or web page using JsViews will generally involve defining or registering the following elements:\n\none or more templates – usually with data-linking – see Data-linked templates\na ‘data Layer’ – see JsViews: Data or View Model\noptionally, helpers – in the form of metadata, helper functions and converter functions, see Helpers and converters\noptionally, reusable JsView tag control components for use within your templates – see Custom tag controls\n\n"
      }
    ]
  },
  "jsvmodel": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Just like JsRender, JsViews (along with JsObservable) is designed to work well with either plain JavaScript objects and arrays, or with instances of JavaScript classes, such as View Model classes.\nSee JsRender: Data / View Model for a discussion and examples of using plain objects / ‘hand-coded’ View Model objects / compiled View Model objects, with JsRender.\nWhen using JsViews you can still choose between plain objects and View Model objects, but now you can also bind to those objects, using data-linking.\nSo, for example, if you are using data obtained from a JSON request, you can choose between:\n\ndata-linking your templates directly to the objects and arrays returned from the JSON request – and thus tracking observable changes to those objects\npassing the data through a ‘mapping’ process to create a hierarchy of View Model instances, and data-linking your templates against those objects\n\n"
      },
      {
        "_type": "para",
        "title": "<b>Example: JsViews with plain objects and arrays</b>",
        "text": "Example: JsViews with plain objects and arrays\nIn this example we add JsViews data-binding to the plain objects example taken from the JsRender Data / View Model topic.\n"
      },
      {
        "_type": "code",
        "title": "Data (e.g. from JSON request):",
        "text": "Data (e.g. from JSON request):\nvar person = {\n  name: \"Pete\",\n  address: { ... },\n  phones: [{...}, ...] \n};\n"
      },
      {
        "_type": "template",
        "title": "Template with data-linking:",
        "text": "Template with data-linking:\n... \n\n...\n\n...\n{^{for phones}}\n  ...      \n    \n  ...\n{{/for}}\n...\n\n"
      },
      {
        "_type": "sample",
        "title": "Render and link template directly against plain objects...",
        "text": "Render and link template directly against plain objects...\n\n  Change data\n  Add phone\n  \n\n\n\n   Change Log\n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address^street\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Data: hierarchy of plain objects and arrays\nvar person = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\"\n  },\n  phones: [{number: \"111 111 1111\"}, {number:\"222 222 2222\"}] \n};\n\n// Render and link template against plain object hierarchy\ntmpl.link(\"#result\", person);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() {\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: {street: \"New Street\"},\n    phones: [{number: \"123 123 1234\"}, {number: \"321 321 4321\"}]\n  });\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones).insert({\n    number: \"456 456 4567\"\n  });\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"observeAll path: \" + ev.data.observeAll.path() + \"\"\n  }\n  for (var key in eventArgs) {\n    message += \"\" + key + \": \"\n      + $.views.converters.encode(JSON.stringify(eventArgs[key])) + \"\";\n      // (Note that we encode < > and & as HTML entities, for display)\n  }\n  $(\".messages\").append(\"\" + message + \"\");\n}\nRender and link template\n\nvar tmpl = $.templates(\"#personTmpl\");\ntmpl.link(\"#result\", person);\n\n"
      },
      {
        "_type": "para",
        "title": "observeAll for plain objects and arrays",
        "text": "observeAll for plain objects and arrays\nOur data-linked sample includes the Change Log idea, copied over from the samples on the observeAll/unobserveAll topics.\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\n(You’ll see below how observeAll works identically for observing hierarchies of View Model instances or for observing hierarchies of plain objects).\n"
      },
      {
        "_type": "para",
        "title": "<b>Example: JsViews with 'hand-coded 'View Model objects</b>",
        "text": "Example: JsViews with 'hand-coded 'View Model objects\nSo now let’s switch to the View Model approach, starting from the ‘hand-coded’ View Model example in the JsRender Data / View Model topic, but this time with JsViews data-linking.\n"
      },
      {
        "_type": "para",
        "title": "View Model classes:",
        "text": "View Model classes:\nHere is the class definition for Person:\n// Constructor\nfunction Person(name, address, phones) {\n  this._name = name;\n  this._address = address;\n  this._phones = phones;\n}\n\n// Prototype\nvar personProto = {\n  name: function(val) {\n    if (!arguments.length) {\n      return this._name;\n    }\n    // If there is a value argument, treat as observable setter\n    $.observable(this).setProperty(\"name\", val);\n  },\n// ... (Similar pattern for phones and address)\n};\n\n// For read-write properties, associate setters with getters, \npersonProto.name.set = function(val) {\n  this._name = val;\n};\n...\n\nPerson.prototype = personProto;\n\n...\n\nWe define exactly similar classes for our Address and Phone objects too.\nThe above is a recommended pattern for View Model classes used with JsViews. Note that this pattern automatically integrates observable data changes. (Calling the setter will make the corresponding observable data change, and conversely, making the observable data change will call the setter.)\nCompiled View Models returned by $.views.viewModels(...) also use this observable pattern.\n"
      },
      {
        "_type": "code",
        "title": "Data: View Model object hierarchy",
        "text": "Data: View Model object hierarchy\nvar person = new Person(\n  \"Pete\",\n  new Address(\"1st Ave\"),\n  [new Phone({number: \"111 111 1111\"}), new Phone({number: \"222 222 2222\"})]\n);\n"
      },
      {
        "_type": "para",
        "title": "Template",
        "text": "Template\nAs with JsRender above, to convert our template from using plain objects to using View Model objects, the only change we need to make is to add parens for our properties, which are now getter/setter functions.\nThis applies equally to data-link expressions, such as <input data-link=\"address()^street()\" >.\n(Note: we also change . to ^ in paths if we want deep path binding.)\n... \n<input data-link=\"name()\" />\n...\n<input data-link=\"address()^street()\" />\n...\n{^{for phones()}}\n  ...      \n    <input data-link=\"number()\" />\n  ...\n{{/for}}\n...\n\n"
      },
      {
        "_type": "sample",
        "title": "Render and link template against a 'hand-coded' View Model object hierarchy",
        "text": "Render and link template against a 'hand-coded' View Model object hierarchy\n\n  Change data\n  Call setters\n  Add phone\n  \n\n\n\n  Change Log:\n  \n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Instantiate View Model hierarchy\nvar person = new Person(\n  \"Pete\",\n  new Address(\"1st Ave\"),\n  [new Phone(\"111 111 1111\"), new Phone(\"222 222 2222\")]\n);\n\n// Render and link the template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() { // Use setProperty to make changes\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: new Address(\"New Street\"),\n    phones: [new Phone(\"123 123 1234\"), new Phone(\"321 321 4321\")]\n  });\n});\n\n$(\"#setObjects\").on(\"click\", function() {    // Use setters to make changes\n  person.name(\"setPete\");\n  person.address(new Address(\"Set Road\"));\n  person.phones([new Phone(\"987 987 9876\")]);\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones()).insert(new Phone(\"456 456 4567\"));\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"observeAll path: \" + ev.data.observeAll.path() + \"\"\n  }\n  for (var key in eventArgs) {\n    message += \"\" + key + \": \"\n      + $.views.converters.encode(JSON.stringify(eventArgs[key])) + \"\";\n      // (Note that we encode < > and & as HTML entities, for display)\n  }\n  $(\".messages\").append(\"\" + message + \"\");\n}\nInstantiate View Model hierarchy\n\nvar person = new Person(...);\n\nRender and link template against person object\n\nvar tmpl = $.templates(\"#personTmpl\");\n\ntmpl.link(\"#result\", person);\n\n\nMake observable changes:\nby directly changing data:\n$(\"#changeObjects\").on(\"click\", function() { // Use setProperty to make changes\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: new Address(\"New Street\"),\n    phones: [new Phone(\"123 123 1234\"), new Phone(\"321 321 4321\")]\n  });\n});\n\nor by using setters:\n$(\"#setObjects\").on(\"click\", function() {    // Use setters to make changes\n  person.name(\"setPete\");\n  person.address(new Address(\"Set Road\"));\n  person.phones([new Phone(\"987 987 9876\")]);\n});\n\n\n// View Model class definitions using pattern with separate getter and setter functions:\n\n// Person\nfunction Person(name, address, phones) {\n  this._name = name;\n  this._address = address;\n  this._phones = phones;\n}\n\nvar personProto = {\n  name: function(val) {\n    if (!arguments.length) {\n      return this._name;\n    }\n    // If there is a value argument, treat as observable setter\n    $.observable(this).setProperty(\"name\", val);\n  },\n  phones: function(val) {\n    if (!arguments.length) {\n      return this._phones;\n    }\n    // If there is a value argument, treat as observable setter\n    $.observable(this).setProperty(\"phones\", val);\n  },\n  address: function(val) {\n    if (!arguments.length) {\n      return this._address;\n    }\n    // If there is a value argument, treat as observable setter\n    $.observable(this).setProperty(\"address\", val);\n  }\n};\n\npersonProto.name.set = function(val) {\n  this._name = val;\n};\n\npersonProto.address.set = function(val) {\n  this._address = val;\n};\n\npersonProto.phones.set = function(val) {\n  this._phones = val;\n};\n\nPerson.prototype = personProto;\n\n// Address\nfunction Address(street) {\n  this._street = street;\n}\n\nvar addressProto = {\n  street: function(val) {\n    if (!arguments.length) {\n      return this._street;\n    }\n    // If there is a value argument, treat as observable setter\n    $.observable(this).setProperty(\"street\", val);\n  }\n};\n\naddressProto.street.set = function(val) {\n  this._street = val;\n};\n\nAddress.prototype = addressProto;\n\n// Phone\nfunction Phone(number) {\n  this._number = number;\n}\n\nvar phoneProto = {\n  number: function(val) {\n    if (!arguments.length) {\n      return this._number;\n    }\n    // If there is a value argument, treat as observable setter\n    $.observable(this).setProperty(\"number\", val);\n  }\n};\n\nphoneProto.number.set = function(val) {\n  this._number = val;\n};\n\nPhone.prototype = phoneProto;\n\n"
      },
      {
        "_type": "para",
        "title": "<b>Example: JsViews with compiled View Models &ndash; using $.views.viewModels(...)</b>",
        "text": "Example: JsViews with compiled View Models – using $.views.viewModels(...)\nThe built-in support in both JsRender and JsViews for compiled View Models makes it extremely easy to define View Model classes that include get/set properties using the pattern described above, along with any desired additional methods and computed properties. Simple calls to $.views.viewModels(...) allow you to compile View Model classes conforming to these patterns without having to manually write repetitive code for multiple such get/set properties.\nFor details on $.views.viewModels see: Compiled View Models.\nSince here we are using compiled View Models with JsViews, the setters are observable. To change a value, you can either use setProperty(...) to directly make an observable change to the data (which will cause the setter also to be called), or you can call the setter(...) (which will also trigger an observable change to the data). (Either way is equivalent, but usually calling the setter is more convenient…)\nTo illustrate, let’s convert our sample above to use compiled View Models:\n"
      },
      {
        "_type": "sample",
        "title": "Render and link template against a compiled View Model object hierarchy",
        "text": "Render and link template against a compiled View Model object hierarchy\n\n  Change data\n  Call setters\n  Add phone\n  \n\n\n\n  Change Log:\n  \n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(Phone(phoneNo));\n}\n\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n// Instantiate View Model hierarchy using constructors\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n\n// Render and link the template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() { // Use setProperty to make changes\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: Address(\"New Street\"),\n    phones: [Phone(\"123 123 1234\"), Phone(\"321 321 4321\")]\n  });\n});\n\n$(\"#setObjects\").on(\"click\", function() {    // Use setters to make changes\n  person.name(\"setPete\");\n  person.address(Address(\"Set Road\"));\n  person.phones([Phone(\"987 987 9876\")]);\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones()).insert(Phone(\"456 456 4567\"));\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"observeAll path: \" + ev.data.observeAll.path() + \"\"\n  }\n  for (var key in eventArgs) {\n    message += \"\" + key + \": \"\n      + $.views.converters.encode(JSON.stringify(eventArgs[key])) + \"\";\n      // (Note that we encode < > and & as HTML entities, for display)\n  }\n  $(\".messages\").append(\"\" + message + \"\");\n}\nCompile View Models\n\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n\n\nInstantiate View Model hierarchy\n\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n\n\nMake observable changes:\nby directly changing data:\n$(\"#changeObjects\").on(\"click\", function() { // Use setProperty to make changes\n  $.observable(person).setProperty({\n    name: \"newName\",\n    address: Address(\"New Street\"),\n    phones: [Phone(\"123 123 1234\"), Phone(\"321 321 4321\")]\n  });\n});\n\nor by using setters:\n$(\"#setObjects\").on(\"click\", function() {    // Use setters to make changes\n  person.name(\"setPete\");\n  person.address(Address(\"Set Road\"));\n  person.phones([Phone(\"987 987 9876\")]);\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also the corresponding sample with JsRender.)\n"
      },
      {
        "_type": "para",
        "title": "<b>Using observe and observeAll APIs with View Model hierarchies</b>",
        "text": "Using observe and observeAll APIs with View Model hierarchies\n"
      },
      {
        "_type": "para",
        "title": "observeAll()",
        "text": "observeAll()\nThe Change Log feature above is showing us ALL the changes to View Model instances, even as we structurally modify the tree by adding and removing objects from arrays, setting structured values to properties, etc.\nThis is achieved with exactly the same call to observeAll/unobserveAll that we used above for plain objects:\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\n"
      },
      {
        "_type": "para",
        "title": "$.observe()",
        "text": "$.observe()\nSimilarly you can use the observe() APIs to observe specific properties of View Model objects, such as:\n// Observe changes to name() property of person object.\n$.observe(person, \"name()\", changeHandler); \n\n// Observe array changes on person.phones().\n$.observe(person.phones(), changeHandler);\n\n// Observe changes to person.phones() property. (This will observe both\n// array changes on the current array, and property change - setting a new array)\n$.observe(person, \"phones()\", changeHandler.);\n\n// Observe both changes to name() changes of person object and\n// street() property of current person.address() object.\n$.observe(person, \"name()\", person.address(), \"street()\", changeHandler);\n\n// Observe changes to street() property of person.address() object.\n// Note the 'deep path' (with ^) so if address() changes, continues to observe street() on new address().\n$.observe(person, \"address()^street()\", changeHandler);\n\nSee for example the following sample, which uses:\n$.observe(person, \"name()\", \"phones()\", \"address()^street()\", changeHandler);\n\n"
      },
      {
        "_type": "sample",
        "title": "Using $.observe() to observe View Model objects",
        "text": "Using $.observe() to observe View Model objects\n\n  Change data\n  Call setters\n  Swap address and phones\n  Add phone\n  \n\n\n\n  Change Log:\n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\" /></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <span class=\"floatleft\">{^{:number()}}</span>\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  this.phones().push(Phone(phoneNo));\n}\n\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n// Instantiate View Model hierarchy\nvar alt = false,\n  address1 = Address(\"1st Ave\"),\n  phones1 = [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")],\n  address2 = Address(\"New Street\"),\n  phones2 = [Phone(\"123 123 1234\")],\n  person = Person(\"Pete\", address1, phones1);\n\n// Render and link the template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Observe specific properties on specific objects\n$.observe(person, \"name()\", \"phones()\", \"address()^street()\", changeHandler);\n\n// Button event handlers for changes\n$(\"#changeObjects\").on(\"click\", function() { // Modify leaf values by observable changes of data\n  $.observable(person).setProperty(\"name\", person.name() + \"+\");\n  $.observable(person.address()).setProperty(\"street\", person.address().street() + \"+\");\n});\n\n$(\"#setObjects\").on(\"click\", function() { // Modify leaf values by calling setters\n  person.name(person.name() + \"*\");\n  person.address().street(person.address().street() + \"*\");\n});\n\n$(\"#swapObjects\").on(\"click\", function() {\n  person.address(alt ? address1 : address2);\n  person.phones(alt ? phones1 : phones2);\n  alt = !alt;\n});\n\n$(\"#insert\").on(\"click\", function() {\n  $.observable(person.phones()).insert(new Phone(\"456 456 4567\"));\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"observeAll path: \" + ev.data.observeAll.path() + \"\"\n  }\n  for (var key in eventArgs) {\n    message += \"\" + key + \": \"\n      + $.views.converters.encode(JSON.stringify(eventArgs[key])) + \"\";\n      // (Note that we encode < > and & as HTML entities, for display)\n  }\n  $(\".messages\").append(\"\" + message + \"\");\n}\nObserve specific properties on specific objects\n\n$.observe(person, \"name()\", \"phones()\", \"address()^street()\", changeHandler);\n\n"
      },
      {
        "_type": "para",
        "title": "Chained paths with plain objects or with View Model objects",
        "text": "Chained paths with plain objects or with View Model objects\nWith plain object hierarchies you can use chained paths in both templates, and observe() paths:\n<input data-link=\"address^street\" />\n\n$.observe(person, \"address^street\", changeHandler);\n\nSimilarly with View Model hierarchies you can again use chained paths, in both templates and observe() paths, as in the sample above:\n<input data-link=\"address()^street()\" />\n\n$.observe(person, \"address()^street()\", changeHandler);\n\n"
      },
      {
        "_type": "links",
        "title": "For additional details and scenarios for compiled View Models, see:",
        "text": "For additional details and scenarios for compiled View Models, see:\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "jsvhelpers-converters": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Helpers and converters used in JsViews apps are the same as regular JsRender helpers or converters – defined/registered in the usual way (see Using helpers and Using converters).\nThey can be used in template expressions, including data-linked expressions (see: Data-linked template syntax) such as:\n\n{^{: ~myFormatter(name)}}\n{^{myCvt:name}}\n<div data-link=\"~myFormatter(name)\" ...>)\n<input data-link=\"{intToStr:amount:strToInt}\"/>\n\nThe last of these examples illustrates the use of two-way data-binding in JsViews using converters (see Converters: convert and convert back).\nIn addition to global helpers (registered using $.views.helpers(myHelpers);), JsViews lets you pass helpers in on a specific link call, as in:\n\ntmpl.link(\"#container\", data, myHelpers); (Linked template)\n$.link(true, \"#target\", data, myHelpers); (Top-level declarative linking)\n$.link(expression, \"#target\", data, myHelpers); (Top-level programmatic linking)\n\n"
      }
    ]
  },
  "link-formelems": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following topics show data-linked textboxes, checkboxes, radio buttons, select drop-downs and lists, textareas and buttons:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      },
      {
        "_type": "links",
        "title": "See also",
        "text": "See also\n"
      }
    ]
  },
  "link-button": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following sample shows three equivalent ways of creating a data-linked button in a template, with the onclick action calling a function (such as a helper method or a View Model method).\nSee the Event binding topic for details.\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n  {^{on ~doSomething}}Do something{{/on}}\n  <button data-link=\"{on ~doSomething}\">Do something</button>\n  <input type=\"button\" data-link=\"{on ~doSomething}\" value=\"Do something\" />\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar person = {};\n\nvar helpers = {\n  doSomething: function() {\n    alert(\"do something\");\n  }\n}\n\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  {^{on ~doSomething}}Do something{{/on}}\n  <button data-link=\"{on ~doSomething}\">Do something</button>\n  <input type=\"button\" data-link=\"{on ~doSomething}\" value=\"Do something\" />\n</script>\n\ntmpl.link(\"#result\", person, helpers); // Render and link the template\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Top-level data-linking can also be used for <button> or <input>:\n"
      },
      {
        "_type": "sample",
        "text": "\n  Do something\n  \n\n\nvar person = {};\n\nvar helpers = {\n  doSomething: function() {\n    alert(\"do something\");\n  }\n}\n\n$.link(true, \"#topLinked\", person, helpers); // Data-link top-level content\n\n\n<div id=\"topLinked\">\n  <button data-link=\"{on ~doSomething}\">Do something</button>\n  <input type=\"button\" data-link=\"{on ~doSomething}\" value=\"Do something\" />\n</div>\n\n$.link(true, \"#topLinked\", person, helpers); // Data-link top-level content\n\n\n"
      },
      {
        "_type": "para",
        "title": "Data-linking to the submit action",
        "text": "Data-linking to the submit action\nIn the case of data-linking to a submit button within a form, it is often useful to instead data-link directly to the submit event of the form as shown in the Event binding topic and in the Using submit sample.\n"
      }
    ]
  },
  "link-elemattribs": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "To data-link to an HTML element attribute, simply use the attribute name as data-link target.\nFor example to data-link to the title attribute use:\ndata-link=\"title{:dataPathOrExpression}\"\n\nThis approach can be used for any HTML attribute, including class, data-* attributes etc., as shown in the following example:\n"
      },
      {
        "_type": "sample",
        "text": "\n.class1 {border-color:green;}\n.class2 {border-color:red;}\n\n\n\n\n  <button data-link=\"\n    disabled{:disableButton}\n    title{:'Message: &quot;' + theTitle + '&quot;'}\n    data-myvalue{:myVal}\n    class{:disableButton ? 'class2' : 'class1'}\n  \">\n    I am {^{:disableButton?'disabled':'enabled'}}\n  </button><br/><br/>\n\n  <label><input data-link=\"disableButton\" type=\"checkbox\" /> Disable</label><br/>\n  <label>Set button title: <input data-link=\"theTitle\" /></label> (To see it, hover over the button...)<br/>\n  <label>data-myvalue property: <input data-link=\"myVal\" /></label> (To see it, click on the button...)\n\n\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  theTitle: \"the title\",\n  disableButton: false,\n  myVal: \"My value\"\n}\n\ntmpl.link(\"#result\", data);\n\n$(\"button\").on('click', function() {\n  alert(\n    $(this).data(\"myvalue\") // Can use 'this.dataset.myvalue' for HTML 5 browsers\n  );\n})\n\n<button data-link=\"\n  disabled{:disableButton}\n  title{:'Message: &quot;' + theTitle + '&quot;'}\n  data-myvalue{:myVal}\n  class{:disableButton ? 'class2' : 'class1'}\n\">\n\n\n"
      },
      {
        "_type": "para",
        "title": "Removing HTML attributes, by returning null",
        "text": "Removing HTML attributes, by returning null\nWhen data-linking to an attribute, if the value of the attribute is set to null then the attribute will be removed. For example, setting data-link=\"title{:myTitle||null}\" will lead to the title attribute being removed from the element whenever myTitle returns a falsy value such as \"\", false or 0.\nSpecial cases: Setting selected, disabled, multiple or readonly to any falsy value will remove the corresponding attributes. Setting to any truthy value will set the attribute to a standard value such as multiple=\"multiple\"\n"
      },
      {
        "_type": "para",
        "title": "Element attributes &ndash; and corresponding element properties",
        "text": "Element attributes – and corresponding element properties\nFor attributes that are part of the HTML schema there is generally a corresponding property on the underlying HTML Element object, and data-linking to the attribute will also drive changes the corresponding property. For example, setting the title attribute will also set the underlying elem.title property. However, data-linking to an unknown attribute, such as foo{:...} will add a foo=\"...\" attribute, but will not set an elem.foo property.\n"
      },
      {
        "_type": "para",
        "title": "Data-linking directly to element properties",
        "text": "Data-linking directly to element properties\nTo data link directly to HTML Element properties, use prop-propertyname as data-link target.\nFor example to data-link to the muted property of a <video> element use prop-muted:\n<video ... data-link=\"prop-muted{:dataPathOrExpression}\" ...>\n\nas in the following example:\n"
      },
      {
        "_type": "sample",
        "text": "video {width:400px; height:200px; margin-bottom:20px; display:block}\n\n\n\n  <video autobuffer controls data-link=\"prop-muted{:muted} prop-loop{:loop}\">\n    <source data-link=\"src{:src}\" type=\"video/mp4\">\n  </video>\n  <label>Muted: <input type=\"checkbox\" data-link=\"muted\"/></label>\n  <label>Loop: <input type=\"checkbox\" data-link=\"loop\"/></label>\n\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  src: \"https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4\",\n  muted: true,\n  loop: true\n};\n\ntmpl.link(\"#result\", data);\n\n$(\"video\").on(\"volumechange\", function(ev) {\n  $.observable(data).setProperty(\"muted\", ev.target.muted);\n});\n\n<video ... data-link=\"prop-muted{:muted} prop-loop{:loop}\">\n  <source data-link=\"src{:src}\" ...>\n</video>\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "jsvadvanced": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "jsvviews": {
    "sections": []
  },
  "linkedtmpls": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Templates used in JsViews apps are regular JsRender templates, defined/registered in the usual way (see Using templates).\nHowever they can include data-linked tags (such as {^{:name}}) and data-linked elements (such as <div data-link=\"name\" ...>). See: Data-linked template syntax.\nInstead of being simply rendered by render() method, they are rendered and data-linked using the link() method.\n"
      }
    ]
  },
  "mvvm-views": {
    "sections": [
      {
        "_type": "para",
        "title": "Using merge() and unmap() for Save/Undo behavior, in an MVVM application",
        "text": "Using merge() and unmap() for Save/Undo behavior, in an MVVM application\nMVVM (Model/View/View-Model) applications (including single page apps – SPAs) generally work with data on the server, considered as the Model, and client data, in the browser – which is a hierarchy of View Models. Client View Models are initialized from the server Model.\nThe user may be able to interact with Views in the browser, and drive changes to the View Model. There will then typically be a process of saving data (from the modified View Model in the browser) back to the server, to update the Model.\nThe following sample (available also at samples/editable/submit) illustrates this, and provides a Submit Changes button (which makes a ‘snapshot’ of current View Model data, and which would in a ‘real app’ save that data back to the server), and an Undo button (which reverts current View Model data back to the last ‘snapshot’).\nSpecifically:\n\nSubmit Changes is bound to the submit action of an HTML form – so will be triggered also by Enter\nIt uses the compiled View Model unmap() feature to make a snapshot of data for sending to the server\nUndo uses the compiled View Model merge() feature to revert changes\n\n"
      },
      {
        "_type": "sample",
        "title": "MVVM Save/Undo, using compiled View Models ",
        "url": "samples/editable-data/submit/sample",
        "text": "MVVM Save/Undo, using compiled View Models \nProvide Submit Changes and Undo buttons, calling the saveData and undo methods of View Model:\n<div class=\"linkedContent\">\n  ...\n  <button data-link=\"{on undo} ...\">Undo</button>\n  ...\n  <form data-link=\"{on 'submit' saveData}\">\n    <button type=\"submit\" ...>Submit Changes</button>\n    ...\n    <tbody data-link=\"{for movies() tmpl='#movieTemplate'}\"></tbody>\n    ...\n    <div data-link=\"{for movies()[selectedIndex()] tmpl='#detailTemplate'}\"></div>\n  </form>\n</div>\n\nProvide undo and saveData methods on compiled View Model:\n$.views.viewModels({\n  MovieApp: {\n    getters: [...],\n    extend: {\n      undo: function() {\n        // Revert to previous savedData\n        this.merge(savedData);\n        ...\n      },\n      saveData: function() {\n        // Save current data, for subsequent Undo behavior\n        savedData = this.unmap();\n        // Submit current data to server\n        $.post(\"/save/data\", ...savedData, function(msg) {...});\n        ...\n      },\n      ...\n\n\n\"use strict\";\nvar VMs = $.views.viewModels,\n  counter = 0;\n\n// Background color helper function\nfunction bgColor(index) {\n  return this.selectedIndex() === index\n    ? \"yellow\"\n    : (index%2 ? \"#fdfdfe\" : \"#efeff2\");\n}\n\nbgColor.depends = \"selectedIndex()\";\n\n// Compile View Models\nVMs({\nMovieApp: {\n  getters: [\n    \"msg\",\n    \"selectedIndex\",\n    { getter: \"movies\", type: \"Movie\", parentRef: \"movieApp\" }\n  ],\n  extend: {\n    undo: function() {\n      this.merge(savedData); // Revert to previous savedData\n      this.msg(null);\n    },\n    saveData: function() {\n      // Save current data, for subsequent Undo behavior\n      savedData = this.unmap();\n      savedData.selectedIndex = null;\n\n      // In real app, uncomment to save current data to the server:\n      // savedData = JSON.stringify(savedData);\n      // $.post(\"/save/data\", {movieData : savedData}, function(msg) {\n        var msg = \"In a real app, updated data would have been saved to server\";\n        this.msg(msg); // Display message\n      //});\n      return false; // Do not do default form action for submit\n    },\n    addMovie: function() {\n      // Instantiate new movie with a movie.movieApp 'parentRef' property\n      var newMovie = VMs.Movie(\"NewTitle\" + counter, [], \"movieApp\", this\n      );\n      newMovie.addLanguage(),\n      $.observable(this.movies()).insert(newMovie); // Insert the new movie\n      this.select($.view(\".movies tr:last\").index); // Set selection on the added item\n    },\n    removeMovie: function(index) {\n      this.select(); // unselect\n      $.observable(this.movies()).remove(index);\n      return false;\n    },\n    select: function(index) {\n      if (this.selectedIndex() !== index) {\n        this.selectedIndex(index);\n      }\n    },\n    deleteLast: function() { // Example of action using View Model hierarchy\n      var moviesCount = this.movies().length;\n      if (moviesCount) {\n        var lastMovie = this.movies()[moviesCount-1];\n        var languagesCount = lastMovie.languages().length;\n        if (languagesCount) {\n          lastMovie.removeLanguage(languagesCount-1);\n        }\n      }\n    },\n    showData: function() { // Get the current data, and display in 'console'\n      $(\"#console\").append($(\"#showData\").render(this.unmap()));\n    },\n    bgColor: bgColor // Helper for background color rendering\n  }\n},\nMovie: {\n  getters: [\n    \"title\",\n    { getter: \"languages\", type: \"Language\", parentRef: \"movie\" }\n  ],\n  extend: {\n    addLanguage: function() {\n      // Instantiate new language with a language.movie 'parentRef' property\n      var newLanguage = VMs.Language(\"NewLanguage\" + counter++, \"movie\", this);\n      $.observable(this.languages()).insert(newLanguage); // Insert the new language\n    },\n    removeLanguage: function(index) {\n      $.observable(this.languages()).remove(index);\n      return false;\n    }\n  }\n},\nLanguage: {\n  getters: [\"name\"]\n}\n});\n\n// Initial data\nvar app = {\n  selectedIndex: null,\n  movies: [\n    {\n      title:\"Meet Joe Black\",\n      languages: [\n        {name: \"English\"},\n        {name: \"French\"}\n      ]\n    },\n    {\n      title:\"Eyes Wide Shut\",\n      languages: [\n        {name: \"German\"},\n        {name: \"French\"},\n        {name: \"Spanish\"}\n      ]\n    }\n  ]\n};\n\n// Instantiate View Models\nvar appVm = $.views.viewModels.MovieApp.map(app);\n\n// Save copy of initial data, for Undo feature\nvar savedData = app;\n\n// Top level data-linking - bind content to View Models\n$.link(true, \".linkedContent\", appVm);\n\n// Detect changes - to enable Submit/Undo buttons, and warn on page navigation\n$.observable(appVm.movies()).observeAll(function() {\n  // If there have been any data changes, clear message and enable Submit and Undo buttons\n  appVm.msg(\"\");\n});\n\n// \"Navigate away\" behavior\n$(window).on('beforeunload', function(){\n  if (appVm.msg() === \"\") {\n    return \"You have unsaved changes.\";\n  }\n});\n\n<!----------------- Data-linked content -------------------> \r\n<div class=\"linkedContent\">\r\n  <button data-link=\"{on showData}\">show data</button>\r\n  <button data-link=\"{on deleteLast}\">delete last language</button>\r\n  <button data-link=\"{on undo} disabled{:msg() !== ''}\">Undo</button>\r\n\r\n  <form data-link=\"{on 'submit' saveData}\">\r\n    <button class=\"buttons\" type=\"submit\" data-link=\"disabled{:msg() !== ''}\">Submit Changes</button>\r\n\r\n    <div class=\"comment\">Click to select and edit</div>\r\n    <table>\r\n      <thead><tr>\r\n        <th>Title</th><th>Languages</th>\r\n        <th><span class=\"addMovie\" data-link=\"{on addMovie}\">Add</span></th>\r\n      </tr></thead>\r\n      <tbody class=\"movies\" data-link=\"{for movies() tmpl='#movieTemplate'}\"></tbody>\r\n    </table>\r\n\r\n    <div class=\"detail\" data-link=\"{for movies()[selectedIndex()] tmpl='#detailTemplate'}\"></div>\r\n  </form>\r\n\r\n  <div class=\"message\" data-link=\"msg()\"></div>\r\n</div>\r\n\r\n<!----------------- Templates ------------------->\r\n<script id=\"movieTemplate\" type=\"text/x-jsrender\">\r\n  <tr class=\"hover\" data-link=\"css-background-color{:movieApp.bgColor(#index)} {on movieApp.select #index}\">\r\n    <td>\r\n      <span data-link=\"#index + 1\"></span>:\r\n      <span data-link=\"title()\"></span>\r\n    </td>\r\n    <td>\r\n      {^{for languages()}}\r\n        <div data-link=\"name()\"></div>\r\n      {{/for}}\r\n    </td>\r\n    <td><span class=\"removeMovie\" data-link=\"{on movieApp.removeMovie #index}\"></span></td>\r\n  </tr>\r\n</script>\r\n\r\n<script id=\"detailTemplate\" type=\"text/x-jsrender\">\r\n  <div>\r\n    <div class=\"title\">Title:</div>\r\n    <div><input data-link=\"title()\" /></div>\r\n    <div class=\"title\">\r\n      Languages: <span class=\"addLanguage\" data-link=\"{on addLanguage}\">Add</span>\r\n    </div>\r\n    {^{for languages()}}\r\n      <input data-link=\"name()\" />\r\n      <span class=\"removeLanguage\" data-link=\"{on movie.removeLanguage #index}\"></span>\r\n    {{/for}}\r\n  </div>\r\n</script>\r\n\r\n<!----------------- Show data ------------------->\r\n<script id=\"showData\" type=\"text/x-jsrender\">\r\n  <hr/>\r\n  {{for movies}}<div>\r\n    <b>Movie:</b> {{>title}}\r\n    <b>Languages:</b> {{for languages}} {{>name}}{{/for}}\r\n  </div>{{/for}}\r\n</script>\r\n\r\n<div id=\"console\">\r\n</div>\n"
      },
      {
        "_type": "para",
        "title": "Save/Undo behavior in an MVVM application using plain objects",
        "text": "Save/Undo behavior in an MVVM application using plain objects\nThe above scenario of Save/Undo making a snapshot of current View Model data, and binding to the submit action, can be achieved with either compiled View Models or with plain object hierarchies. But it is easier to achieve with compiled View Models.\nBy way of comparison, here is the corresponding sample using plain objects:\n"
      },
      {
        "_type": "sample",
        "title": "MVVM Save/Undo, using plain objects",
        "text": "MVVM Save/Undo, using plain objects\n\n\n \n\n  \n    show data\n    delete last language\n    Undo\n  \n\n  \n    Submit Changes\n\n    Click to select and edit\n    \n      \n        TitleLanguages\n        Add\n      \n      \n    \n\n    \n  \n\n  \n\n\n\n\n  <tr class=\"hover\" data-link=\"css-background-color{:~bgColor(#index)}\">\n    <td>\n      <span data-link=\"#index + 1\"></span>:\n      <span data-link=\"title\"></span>\n    </td>\n    <td>\n      {^{for languages}}\n        <div data-link=\"name\"></div>\n      {{/for}}\n    </td>\n    <td><span class=\"removeMovie\"></span></td>\n  </tr>\n\n\n\n  <div>\n    <div class=\"title\">Title:</div>\n    <div><input data-link=\"title\" /></div>\n    <div class=\"title\">\n      Languages: <span class=\"addLanguage\">Add</span>\n    </div>\n    {^{for languages ~movie=#data}}\n      <input data-link=\"name\" />\n      <span class=\"removeLanguage\"\"></span>\n    {{/for}}\n  </div>\n\n\n\n\n  <hr/>\n  {{for movies}}<div>\n    <b>Movie:</b> {{>title}}\n    <b>Languages:</b> {{for languages}} {{>name}}{{/for}}\n  </div>{{/for}}\n\n\n\nvar counter = 0,\n\n  // Initial data\n  app = {\n    msg: null,\n    selectedIndex: null,\n    movies: [\n      {\n        title:\"Meet Joe Black\",\n        languages: [\n          {name: \"English\"},\n          {name: \"French\"}\n        ]\n      },\n      {\n        title:\"Eyes Wide Shut\",\n        languages: [\n          {name: \"German\"},\n          {name: \"French\"},\n          {name: \"Spanish\"}\n        ]\n      }\n    ],\n    select: function(index) {\n      if (this.selectedIndex !== index) {\n        $.observable(this)\n          .setProperty(\"selectedIndex\", index);\n      }\n    },\n    showMsg: function(msg) {\n      $.observable(this).setProperty(\"msg\", msg);\n    }\n  },\n\n  savedData = JSON.stringify(app.movies),\n\n  handlers = {\n    undo: function() {\n      // Revert to previous savedData\n      $.observable(this.movies).refresh(JSON.parse(savedData));\n      $.observable(this).removeProperty(\"selectedIndex\");\n    },\n    saveData: function() {\n      // Make new savedData snapshot\n      savedData = JSON.stringify(this.movies);\n\n      // In real app, uncomment to save current data to the server:\n      // $.post(\"/save/data\", {movieData : savedData}, function(msg) {\n        var msg = \"In a real app, updated data would have been saved to server\";\n        this.showMsg(msg); // Display message\n      //});\n      return false; // Do not do default form action for submit\n    },\n    addMovie: function() {\n      $.observable(this.movies).insert({\n        title: \"NewTitle\" + counter ,\n        languages: [\n          {name: \"NewLanguage\" + counter++}\n        ]}\n      );\n      // Set selection on the added item\n      this.select($.view(\".movies tr:last\").index);\n    },\n    removeMovie: function(ev, evtArgs) {\n      this.select(); // unselect\n      var thisIndex = $.view(ev.target).index;\n      $.observable(this.movies).remove(thisIndex);\n      return false;\n    },\n    addLanguage: function(ev, evtArgs) {\n      var selectedMovie = this.movies[this.selectedIndex];\n      $.observable(selectedMovie.languages).insert({\n        name: \"NewLanguage\" + counter++\n      });\n    },\n    removeLanguage: function(ev, evtArgs) {\n      var selectedMovie = this.movies[this.selectedIndex];\n      var thisIndex = $.view(ev.currentTarget).index;\n      $.observable(selectedMovie.languages).remove(thisIndex);\n      return false;\n    },\n    select: function(ev, evtArgs) {\n      this.select($.view(ev.currentTarget).index);\n    },\n    deleteLast: function() {\n      if (this.movies.length) {\n        var languages = this.movies[this.movies.length - 1].languages;\n        $.observable(languages).remove();\n      }\n    },\n    showData: function() {\n      $(\"#console\").append($(\"#showData\").render(this));\n    },\n    bgColor: bgColor\n  };\n\n// Background color helper function\nfunction bgColor() {\n  return app.selectedIndex === this.index\n    ? \"yellow\"\n    : (this.index%2 ? \"#fdfdfe\" : \"#efeff2\");\n}\n\nbgColor.depends = [\"#index\", app, \"selectedIndex\"];\n\n$.observable(app.movies).observeAll(function() {\n  app.showMsg(\"\"); \n// If there have been any changes made to the movies data we clear\n// the Saved... message and this also drives the Save button\n// disabled property and the \"navigate away\" behavior.\n});\n\n// \"Navigate away\" behavior\n$(window).on('beforeunload', function(){\n  return app.msg === \"\" ? \"You have unsaved changes.\" : undefined;\n});\n\n$.link(true, \".linkedContent\", app, handlers);\nProvide Submit Changes and Undo buttons, calling the saveData and undo methods of View Model:\n<div class=\"linkedContent\">\n  ...\n  <button data-link=\"{on ~undo} ...\">Undo</button>\n  ...\n  <form data-link=\"{on 'submit' ~saveData}\">\n    <button type=\"submit\" ...>Submit Changes</button>\n    ...\n\nProvide undo and saveData helper methods:\nhandlers = {\n  undo: function() {\n    // Revert to previous savedData\n    $.observable(this.movies).refresh(JSON.parse(savedData));\n    $.observable(this).removeProperty(\"selectedIndex\");\n  },\n  saveData: function() {\n    // Save current data, for subsequent Undo behavior\n    savedData = JSON.stringify(this.movies);\n\n    $.post(\"/save/data\", ...savedData, function(msg) {...});\n    ...\n  },\n...\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "jsvviewmodelsapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This topic covers using Compiled View Models with JsViews – along with data-linking and observability.\nCompiled View Models can be used equally well with JsRender or with JsViews – and the same basic scenarios apply:\n\nUsing $.views.viewModels(...) to register/compile View Models (myVM)\nUsing a compiled View Model myVM as constructor/factory method – MyVM(...) – to create View Model instances (myVmInstance)\nUsing MyVM.map(...) to convert a plain object hierarchy (such as from a JSON request) to a hierarchy of View Model instances\nUsing myVMInstance.merge(...) to incrementally update a View Model hierarchy, using updated plain data\nUsing myVMInstance.unmap() to convert a View Model hierarchy back to a plain object hierarchy\n\nHowever JsViews brings additional power to compiled View Models:\n"
      },
      {
        "_type": "para",
        "title": "Compiled View Model instances are automatically 'observable'",
        "text": "Compiled View Model instances are automatically 'observable'\nCompiled View Model classes used with JsViews are automatically observable, so:\n\nCalling a setter function such as person.name(\"newName\") will automatically make an observable change to the View Model instance (person)\nDirectly making an observable change (...setProperty(\"name\", ...)) to a View Model instance person will automatically call the setter person.name(...)\nIncremental updates triggered by myViewModelObject.merge(...) are automatically observable – so data-linked values in the templates will also update incrementally.\n\n"
      },
      {
        "_type": "para",
        "title": "<b>Samples:</b> ",
        "text": "Samples: \n"
      },
      {
        "_type": "para",
        "title": "Using JsViews with a hierarchy of compiled View Model objects",
        "text": "Using JsViews with a hierarchy of compiled View Model objects\nThe following sample adds JsViews and data-linking to the first of the JsRender samples for compiled View Models.\nIt uses exactly the same calls to $.views.viewMethods to obtain compiled View Models – and the same code to then construct the View Model hierarchy:\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n...\n// Instantiate View Model hierarchy using constructors\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n\n"
      },
      {
        "_type": "sample",
        "title": "Using JsViews with a hierarchy of compiled View Model objects",
        "text": "Using JsViews with a hierarchy of compiled View Model objects\nbutton {margin-bottom: 9px;}\n\nChange name\nAdd Phone\n\n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{^{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{^{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            {^{:number()}}\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  $.observable(this.phones()).insert(Phone(phoneNo));\n}\n\n// Compile Person View Model, with addPhone method\nvar Person = $.views.viewModels({\n  getters: [\"name\", \"address\", \"phones\"],\n  extend: {addPhone: addPhone}\n});\n\n// Compile Address View Model\nvar Address = $.views.viewModels({getters: [\"street\"]});\n\n// Compile Phone View Model\nvar Phone = $.views.viewModels({getters: [\"number\"]});\n\n// Instantiate View Model hierarchy using constructors\nvar person = Person(\n  \"Pete\",\n  Address(\"1st Ave\"),\n  [Phone(\"111 111 1111\"), Phone(\"222 222 2222\")]\n);\n\n// Render and link template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button handlers\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n});\nThe principal changes from the corresponding JsRender sample are as follows:\n\nThe template uses data-linked tags:\n...{^{:name()}}...\n...{^{:address().street()}}...\n...{^{for phones()}}...\n...{^{:number()}}...\n\nInstead of the render() method, we use the link() method:\ntmpl.link(\"#result\", person);\n\nThe addPhone() method inserts a new Phone 'observably’:\nfunction addPhone(phoneNo) {\n  $.observable(this.phones()).insert(Phone(phoneNo));\n}\n\nThe setters (and also the addPhone method) now trigger updates through observable data-changes and data-linking. We don’t now need to re-render the template to show the changes:\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n});\n\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: the compiled View Models sample in the Data / View Model topic, which takes the above sample and adds add two-way data-linking on the get/set properties, by replacing data-linked tags such as:\n{^{:name()}}\n\nwith data-linked input elements:\n<input data-link=\"name()\" />\n\n"
      },
      {
        "_type": "para",
        "title": "Using MyViewModel.map(...) to map a whole object hierarchy to a View Model instance hierarchy",
        "text": "Using MyViewModel.map(...) to map a whole object hierarchy to a View Model instance hierarchy\nSimilarly, we will convert from JsRender to JsViews the sample that took a ‘View Model typed hierarchy’, and created a complete hierarchy of View Model instances, by passing a plain data hierarchy to the top-level map() method.\nAgain the code for compiling View Model classes and for  then calling the map() method to generated the View Model hierarchy is unchanged:\nCompile View Model classes (typed hierarchy):\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // Declare 'name' as primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // Declare 'address' as Address (View Model) type\n     {getter: \"phones\", type: \"Phone\"}     // Declare 'phones' as (array) of Phone (View Model) types\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone: ...\n});\n\nPerson data (plain object hierarchy, or JSON string):\nvar personData = {\n    name: \"Pete\",\n    address: {street: \"1st Ave\"},\n    phones: [{number: \"111 111 1111\"}, ...]\n  };\n\nUse map() to convert from personData plain object hierarchy (or JSON string) to person View Model hierarchy:\nvar person = $.views.viewModels.Person.map(personData);\n\n"
      },
      {
        "_type": "sample",
        "title": "Using map() to convert from a plain object hierarchy to a View Model hierarchy",
        "text": "Using map() to convert from a plain object hierarchy to a View Model hierarchy\nbutton {margin-bottom: 9px;}\n\nChange name\nAdd Phone\n\n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{^{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{^{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            {^{:number()}}\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone:{\n    getters: [\"number\"]\n  }\n});\n\nvar vmCollection = $.views.viewModels;\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  $.observable(this.phones()).insert(vmCollection.Phone(phoneNo));\n}\n\n// person plain object hierarchy:\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\n// Instantiate View Model hierarchy using map()\nvar person = vmCollection.Person.map(personData);\n\n// Render template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button handlers\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n});\nChanges from the corresponding JsRender version include:\n\nData-linked tags\n\n... {^{:name()}} ...\n\naddPhone() inserts a new Phone 'observably'\n\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  $.observable(this.phones()).insert(vmCollection.Phone(phoneNo));\n}\n\n\nCalling setters, or the addPhone method, trigger observable updates...\n\n...\nperson.name(\"newName\");           // Use the name(...) setter\n\n...\nperson.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n\n"
      },
      {
        "_type": "para",
        "title": "Using merge() and unmap()",
        "text": "Using merge() and unmap()\nThe next sample includes  merge() and unmap() – starting from the corresponding JsRender sample, and adding data-linking.\n"
      },
      {
        "_type": "para",
        "title": "Updating with merge() makes minimal incremental changes",
        "text": "Updating with merge() makes minimal incremental changes\nCalling merge(modifiedData) does not replace the whole hierarchy of View Model instances, but works incrementally to add/remove/modify instances as appropriate. So if most of modifiedData content is the same as the data previously passed to map() or merge(), the call will make only minimal changes to the hierarchy.\nWhen using a data-linked template to render the View Model hierarchy, the resulting changes to the rendered (data-linked) view will also be incremental (and minimal).\n"
      },
      {
        "_type": "sample",
        "title": "Using merge() to update View Models, and unmap() to return to plain objects",
        "text": "Using merge() to update View Models, and unmap() to return to plain objects\nbutton {margin-bottom: 9px;}\n\nUpdate\nRevert\nGet Data\nChange name\nAdd Phone\n\n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td>{^{:name()}}</td></tr>\n    <tr><td>Street:</td><td>{^{:address().street()}}</td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>{^{:number()}}</td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\n\n// Compiled template\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                              // name is a primitive type (string)\n     {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n     {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone:{\n    getters: [\"number\"]\n  }\n});\n\nvar vmCollection = $.views.viewModels;\n\n// Method for Person class\nfunction addPhone(phoneNo) {\n  // Uses Phone() View Model constructor to create Phone instance\n  $.observable(this.phones()).insert(vmCollection.Phone(phoneNo));\n}\n\n// First version of data (e.g. from JSON request):\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\n// Second version of data (e.g. new JSON request):\nvar personData2 = {\n  name: \"Peter\",\n  address: {street: \"2nd Ave\"},\n  phones: [{number: \"111 111 9999\"},{number: \"333 333 9999\"}]\n};\n\n// Instantiate View Model hierarchy, using map()\nvar person = vmCollection.Person.map(personData);\n\n// Render template against person object (instance of Person)\ntmpl.link(\"#result\", person);\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  // Update View Model hierarchy, using merge()\n  person.merge(personData2);\n});\n\n$(\"#revert\").on(\"click\", function() {\n  // Revert View Model hierarchy, using merge()\n  person.merge(personData);\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");           // Use the name(...) setter\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");  // Call the addPhone(...) method\n});\n\n$(\"#getData\").on(\"click\", function() {\n  // Get current data, using unmap()\n  var updatedPersonData = person.unmap();\n  window.alert(JSON.stringify(updatedPersonData));\n});\nThis sample, based on the corresponding JsRender version, includes using merge()to trigger an incremental (minimal) update to the View Model hierarchy, and as a result, to the data-linked view:\n$(\"#update\").on(\"click\", function() {\n  person.merge(personData2);               // Update person View Model hierarchy\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Since we are using data-linking, we can easily modify the sample to include two-way databinding:\n"
      },
      {
        "_type": "sample",
        "title": "Using merge() and unmap() &ndash; with two-way binding",
        "text": "Using merge() and unmap() – with two-way binding\n\n  Update\n  Revert\n  Get Data\n  Change name\n  Add Phone\n  \n\n\n\n   Change Log\n  Clear\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"name()\"/></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\"/></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones()}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      \"name\",                               // name is a primitive type (string)\n      {getter: \"address\", type: \"Address\"}, // address is of type Address (View Model)\n      {getter: \"phones\", type: \"Phone\"}     // Each phone is of type Phone (View Model)\n    ],\n    extend: {addPhone: addPhone}\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone:{\n    getters: [\"number\"]\n  }\n});\n\nvar vmCollection = $.views.viewModels;\n\n// Method for Person class\nfunction addPhone(phoneNo) {                // Uses vmCollection.Phone() to construct new instance\n  $.observable(this.phones()).insert(vmCollection.Phone(phoneNo));\n}\n\n// First version of data (e.g. from JSON request):\nvar personData = {\n  name: \"Pete\",\n  address: {street: \"1st Ave\"},\n  phones: [{number: \"111 111 1111\"}, {number: \"222 222 2222\"}]\n};\n\n// Second version of data (e.g. from JSON request):\nvar personData2 = {\n  name: \"Peter\",\n  address: {street: \"2nd Ave\"},\n  phones: [{number: \"111 111 9999\"},{number: \"333 333 9999\"}]\n};\n\n// Instantiate View Model hierarchy, using map()\nvar person = vmCollection.Person.map(personData);\n\n// Render and link the template against person (Person instance)\ntmpl.link(\"#result\", person);\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  person.merge(personData2);\n});\n\n$(\"#revert\").on(\"click\", function() {\n  person.merge(personData);\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  person.name(\"newName\");\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  person.addPhone(\"xxx xxx xxxx\");\n});\n\n$(\"#result\").on(\"click\", \".remove\", function() {\n  $.observable(person.phones()).remove(\n    $.view(this).index\n  )\n});\n\n$(\"#getData\").on(\"click\", function() {\n  var updatedPersonData = person.unmap();\n  window.alert(JSON.stringify(updatedPersonData));\n});\n\n// Change log code\n$(\".clear\").on(\"click\", function() {\n  $(\".messages\").empty();\n});\n\n$(\"#attach\").on(\"click\", function(x) {\n  logChanges(this.checked);\n});\n\nlogChanges(true);\n\nfunction logChanges(enable) {\n  if (enable) {\n    $.observable(person).observeAll(changeHandler);\n  } else {\n    $.observable(person).unobserveAll(changeHandler);\n  }\n}\n\nfunction changeHandler(ev, eventArgs) {\n  var message = \"\";\n  if (ev.data.observeAll) {\n    message += \"observeAll path: \" + ev.data.observeAll.path() + \"\"\n  }\n  for (var key in eventArgs) {\n    message += \"\" + key + \": \"\n      + $.views.converters.encode(JSON.stringify(eventArgs[key])) + \"\";\n      // (Note that we encode < > and & as HTML entities, for display)\n    }\n  $(\".messages\").append(\"\" + message + \"\");\n}\nThis sample illustrates two-way data-linking of get/set properties on compiled View Models, by replacing the data-linked tags of the previous sample, such as:\n{^{:name()}}\n\nwith data-linked input elements:\n<input data-link=\"name()\" />\n\nIt also illustrates using observeAll with compiled View Model instances – by including the Change Log idea, copied over from the samples on the observeAll/unobserveAll topics.\n\n"
      },
      {
        "_type": "para",
        "title": "MVVM &ndash; Save/Undo",
        "text": "MVVM – Save/Undo\nTypically in an MVVM application, a Save/Undo feature will save View Model data back to the Model on the server, or revert View Model data back to the last version saved.\nThe compiled View Model merge() and unmap() features are very useful for this scenario. See discussion and samples in the MVVM – Dynamic view hierarchy topic.\n"
      },
      {
        "_type": "para",
        "title": "Overriding generated get/set functions (JsViews version)",
        "text": "Overriding generated get/set functions (JsViews version)\nTo override a generated get/set property provided by a compiled View Model you can provide an implementation in the extend hash, with the same name as the get/set in the getters array,  following the pattern below.\n(Note that this pattern is slightly different from the JsRender version):\n// Define a myNameGetSet(...) function, to override the compiled name(...) get/set function\nfunction myNameGetSet(val) {\n  if (!arguments.length) {\n    // No argument: use as a getter\n    return this._name;\n  }\n  // Called with argument: use as setter, and trigger observable change\n  $.observable(this).setProperty(\"name\", val);\n\n  // The above lines are standard compiled get/set code when using JsViews\n\n  console.log(\"name set to \" + val); // This is an additional line of code, for logging\n}\n\n// The following is standard compiled get/set code when using JsViews\nmyNameGetSet.set = function(val) {\n  // Setter called by observable property change\n  this._name = val;\n};\n\n// Declare a Person View Model with an overridden name() get/set property\n$.views.viewModels({\n  Person: {\n    getters: [\n      {getter: \"name\", ...}, // Compiled name() get/set\n      ...\n    ],\n    extend: {\n      name: myNameGetSet,    // Override name() get/set\n      ...\n    }\n    ...\n  },\n  ...\n});\n\nThe above is equivalent to the generated version except that it adds custom logging to the getter/setter function.\n"
      },
      {
        "_type": "para",
        "title": "Sample showing some of the advanced View Model features",
        "text": "Sample showing some of the advanced View Model features\nThe next sample specifically highlights some of the advanced features of compiled View Models, by adding JsViews data-linking to the corresponding JsRender sample.\n\nIt stores compiled View Models on a myVmCollection hash, as a View Model typed collection, rather than on$.views.viewModels\nIt maps from an array of ‘people’ rather than a single person:\nvar people = Person.map(peopleData);\nIt specifies an id key for Person. When updating the phones array the id value is treated as 'primary key’, and used to map 'identity’:\nid: \"id\"\nIt provides an id() callback on Person, for determining identity – allowing identification of corresponding View Model instances within the people array, and hence preventing unnecessary disposal and re-instantiation (which would destroy state, such as the comment value).\nIt has a comment() get/set property that is added as part of the extend definition, not the getters, so it is not initialized from data, in the constructor. Note therefore that if you set a comment on each person instance, then click Update, then Revert, one comment is conserved (since that instance is never disposed – based on the ‘identity’ determination) but the other is lost since the instance is disposed and then re-created by Revert:\nextend: {...comment: comment...}\nIt has defaultVal specified for name, address and phones, either as ‘static’ values or computed by a callback function:\naddress: {type: \"Address\", defaultVal: defaultStreet}\nIt overrides the generated person.name() get/set by a myNameGetSet function which includes logging\nIt passes a JSON string to merge() or map()\n\n"
      },
      {
        "_type": "sample",
        "title": "Mapping from JSON data to View Model hierarchy &ndash; further features",
        "text": "Mapping from JSON data to View Model hierarchy – further features\ntable {margin-top: 9px;}\n\nUpdate\nRevert\nGet Data\nChange name\nAdd Phone\n\n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Comment:</td><td><input data-link=\"comment()\"/></td></tr>\n    <tr><td>Name:</td><td><input data-link=\"name()\"/></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"address()^street()\"/></td></tr>\n    <tr><td>Phones:</td><td>\n      <table class=\"nowidth\"><tbody>\n        {^{for phones() ~personIndex=#index}}\n          <tr><td>\n            <input class=\"floatleft\" data-link=\"number()\" />\n            <span class=\"remove\" data-link=\"{on remove #index ~personIndex}\"></span>\n          </td></tr>\n        {{/for}}\n      </tbody></table>\n    </td></tr>\n  </tbody></table>\nvar tmpl = $.templates(\"#personTmpl\");\n\nvar myVmCollection = {};\n\n// Compile View Models\n$.views.viewModels({\n  Person: {\n    getters: [\n      {getter: \"name\", defaultVal: \"No name\"}, // Compiled name() get/set\n      {getter: \"address\", type: \"Address\", defaultVal: defaultAddress},\n      {getter: \"phones\", type: \"Phone\", defaultVal: []}\n    ],\n    extend: {\n      name: myNameGetSet,                      // Override name() get/set\n      addPhone: addPhone,\n      comment: comment                         // Additional get/set property, not initialized by data)\n    },\n    id: function(vm, plain) {                  // Callback function to determine 'identity'\n      return vm.personId === plain.personId;\n    }\n  },\n  Address: {\n    getters: [\"street\"]\n  },\n  Phone: {\n    getters: [\"number\"],\n    extend: {\n      remove: remove,\n    },\n    id: \"phoneId\"                              // Treat phoneId as 'primary key', for identity\n  }\n}, myVmCollection);                            // Store View Models (typed hierarchy) on myVmCollection\n\n// Override generated name() get/set\nfunction myNameGetSet(val) {\n  if (!arguments.length) {\n    return this._name; // If there is no argument, use as a getter\n  }\n  $.observable(this).setProperty(\"name\", val);\n};\n\nmyNameGetSet.set = function(val) {\n  this._name = val; // Setter called by observable property change\n  console.log(\"name set to \" + val);           // This is an additional line of code, for logging\n};\n\n// Method for Person class\nfunction addPhone(phoneNo) {                   // Uses myVmCollection.Phone() to construct new instance\n  $.observable(this.phones()).insert(myVmCollection.Phone(phoneNo));\n}\n\n// Method for Phone class\nfunction remove(index, personIndex) {\n  $.observable(people[personIndex].phones()).remove(index);\n};\n\n// get/set for comment (state on View Model instance, not initialized from data)\nfunction comment(val) {\n  if (!arguments.length) {\n    return this._comment; // If there is no argument, use as a getter\n  }\n  $.observable(this).setProperty(\"comment\", val);\n}\n\ncomment.set = function(val) {\n  this._comment = val; // Setter called by observable property change\n};\n\nfunction defaultAddress() {                    // Function providing default address if undefined in data\n  return {street: 'No street for \"' + this.name + '\"'};\n}\n\n// First version of data - array of objects (e.g. from JSON request):\nvar peopleData = [\n  {\n    personId: \"1\",\n    address: {\n      street: \"2nd Ave\"\n    }\n  },\n  {\n    personId: \"2\",\n    name: \"Pete\",\n    phones: [\n      {number: \"333 333 3333\", phoneId: \"2a\"}\n    ]\n  }\n];\n\n// Second version of data - JSON string (e.g. new JSON request):\nvar peopleData2 = '[{\"personId\":\"2\",\"name\":\"Peter\",\"address\":{\"street\":\"11 1st Ave\"},'\n+ '\"phones\":[{\"number\":\"111 111 9999\",\"phoneId\":\"1a\"},{\"number\":\"333 333 9999\",\"phoneId\":\"2a\"}]}]';\n\n// Instantiate View Model hierarchy using map()\nvar people = myVmCollection.Person.map(peopleData);\n\n// Render and link the template against people (array of Person instances)\ntmpl.link(\"#result\", people);\n\n// Button handlers\n$(\"#update\").on(\"click\", function() {\n  people.merge(peopleData2);\n});\n\n$(\"#revert\").on(\"click\", function() {\n  people.merge(peopleData);\n});\n\n$(\"#changeName\").on(\"click\", function() {\n  people[0].name(\"newName\");\n});\n\n$(\"#addPhone\").on(\"click\", function() {\n  people[0].addPhone(\"xxx xxx xxxx\");\n});\n\n$(\"#getData\").on(\"click\", function() {\n  var updatedPeopleData = people.unmap(people);\n  window.alert(JSON.stringify(updatedPeopleData));\n});\nThis sample, like the corresponding JsRender version, shows some of the advanced features of compiled View Models.\n\n"
      },
      {
        "_type": "para",
        "title": "Adding a custom data-linked property to a compiled View Model",
        "text": "Adding a custom data-linked property to a compiled View Model\nFinally, here is a sample which extends a compiled View Model with a custom hand-coded Person.isManager()get/set property. The property is coupled to the Team.manager() property – so setting Person.isManager(...) will update the Team.manager() correspondingly (and conversely when setting Team.manager(...).\nPerson.isManager is not included in the getters declaration, so that the constructor for Person will not expect an isManager parameter to be provided for initialization.\nSee also the related JsRender samples – with or without parentRef. Note that the JsViews version below is able to take advantage of data-linking, including data-linking directly to the custom Person.isManager property, and as a result is simpler than JsRender version, and requires less code. Also, changing manager triggers minimal incremental updates, whereas in the JsRender version it triggers a complete re-rendering of the whole template.\n"
      },
      {
        "_type": "sample",
        "title": "extending Person with an isManager property",
        "url": "samples/computed/team-manager/sample",
        "text": "extending Person with an isManager property\n// Custom function for Person.isManager get/set property\nfunction myIsManager(val) {\n  if (!arguments.length) {       // If there is no argument, use as a getter\n    return this === this.team.manager(); // true if this member is the manager\n  }\n  if (val) {                     // Setting this.isManager(true)\n    this.team.manager(this);     // So make this team member manager\n  } else if (this.isManager()) { // Setting this.isManager(false) and this team member is currently manager\n    this.team.manager(null);     // So set team manager to null\n  }\n}\n\n// Specify that the same function is a setter - for two-way data-linking\nmyIsManager.set = true;\n\n// Specify dependency: if team.manager() changes, manager.isManger() should update\nmyIsManager.depends = \"team.manager()\";\n\n// Compile View Models\n$.views.viewModels({\n  Team: {...},\n  Person: {\n    getters: [\"name\", ...],\n    extend: {\n      isManager: myIsManager        // use custom function\n    }\n  },\n  Address: {...}\n});\n\n// Initial data\nvar teamData = {\n    members: [\n      { name: \"Pete\", address: { street: \"1st Ave\", ZIP: \"12345\" } },\n      ...\n\n// Instantiate View Models\nvar team = $.views.viewModels.Team.map(teamData);\n\n//Initialize second team member to be manager.\nvar manager = team.members()[1];\nmanager.isManager(true);\n...\n\nData-link directly to isManager() with two-way binding:\n<input data-link=\"isManager()\" type=\"checkbox\"/>\n\nUse deep linking on other paths so they update when the team.manager() changes:\n<input data-link=\"manager()^address().ZIP()\" />\n\n\n\"use strict\";\n// Compile template\nvar tmpl = $.templates(\"#teamTmpl\");\n\n// Custom function for Person.isManager get/set property\nfunction myIsManager(val) {\n  if (!arguments.length) {       // If there is no argument, use as a getter\n    return this === this.team.manager(); // true if this member is the manager\n  }\n  if (val) {                     // Setting this.isManager(true)\n    this.team.manager(this);     // So make this team member manager\n  } else if (this.isManager()) { // Setting this.isManager(false) and this team member is currently manager\n    this.team.manager(null);     // So set team manager to null\n  }\n}\n\n// Specify that the same function is a setter - for two-way data-linking\nmyIsManager.set = true;\n\n// Specify dependency: if team.manager() changes, manager.isManger() should update\nmyIsManager.depends = \"team.manager()\";\n\n// Compile View Models\n$.views.viewModels({\n  Team: {\n    getters: [\n      { getter: \"manager\", type: \"Person\" },\n      { getter: \"members\", type: \"Person\", parentRef: \"team\" }\n    ],\n    extend: {\n      setManager: function(index) {\n        if (arguments.length === 3) {\n          this.members()[index].isManager(true);\n        } else if (team.manager()) {\n          this.manager().isManager(false);\n        }\n      }\n    }\n  },\n  Person: {\n    getters: [\n      \"name\",\n      { getter: \"address\", type: \"Address\" }\n    ],\n    extend: { isManager: myIsManager } // use custom function\n  },\n  Address: {\n    getters: [\"street\", \"ZIP\"]\n  }\n});\n\n// Initial data\nvar teamData = {\n    members: [\n      { name: \"Pete\", address: { street: \"1st Ave\", ZIP: \"12345\" } },\n      { name: \"Bess\", address: { street: \"Central Way\", ZIP: \"98765\" } },\n      { name: \"Henry\", address: { street: \"Main St\", ZIP: \"54321\" } }\n    ],\n    manager: null,\n  };\n\n// Instantiate View Models\nvar team = $.views.viewModels.Team.map(teamData);\n\n//Initialize second team member to be manager.\nvar manager = team.members()[1];\nmanager.isManager(true);\n\ntmpl.link(\"#result\", team);\n<title>Computed observables:- Compiled View Model and two-way binding</title>\r\n\r\n<div id=\"result\"></div>\r\n\r\n<script id=\"teamTmpl\" type=\"text/x-jsrender\">\r\n{^{on setManager}}No Manager{{/on}}\r\n{^{on setManager 0}}Set Manager 0{{/on}}\r\n{^{on setManager 1}}Set Manager 1{{/on}}\r\n{^{on setManager 2}}Set Manager 2{{/on}}\r\n<h4>Team members:</h4>\r\n\r\n<table>\r\n  <thead><tr><td>Is&nbsp;Manager</td><td>Name</td><td>Street</td><td>ZIP</td></tr></thead>\r\n  <tbody>\r\n    {^{for members() ~manager=manager}}\r\n      <tr><td><input data-link=\"isManager()\" type=\"checkbox\"/></td>\r\n      <td><input data-link=\"name()\" /></td>\r\n      <td><input data-link=\"address().street()\" /></td>\r\n      <td><input data-link=\"address().ZIP()\" /></td>\r\n      </tr>\r\n    {{/for}}\r\n  </tbody>\r\n</table>\r\n\r\n{^{if manager()}}\r\n  <h4>Manager:</h4>\r\n  <table><tbody><tr>\r\n    <td><input data-link=\"manager()^name()\" /></td>\r\n    <td><input data-link=\"manager()^address().street()\" /></td>\r\n    <td><input data-link=\"manager()^address().ZIP()\" /></td>\r\n  </tr></tbody></table>\r\n{{else}}\r\n  <h4>No manager</h4>\r\n{{/if}}\r\n</script>\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "jsvassigntag": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the {^{: someExpression}} tag is a data-bound version of the JsRender {{: ...}} tag – which evaluates the expression and returns its string value.\nWhen using data-linked templates the data-bound version will update automatically when the data in the expression changes observably.\n"
      },
      {
        "_type": "sample",
        "title": "{^{: ...}}",
        "text": "{^{: ...}}\n\n\n\n  <button data-link=\"{on changeManager}\">Change manager</button><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n  <em>Nickname:</em> <input data-link=\"manager^nickname\" /><br/>\n\n  <em>&lcub;^{:manager^nickname || manager^name}&rcub;:</em>\n  <span class=\"spanbox\">\n    {^{:manager^nickname || manager^name}}\n  </span>\n\n\nvar team = {\n  person1: {\n    name: \"Peter\",\n    nickname: \"Pete\"\n  },\n  person2: {\n    name: \"Octavia\"\n  },\n  changeManager: function() {\n    $.observable(this).setProperty({\n      manager: this.manager === this.person1 ? this.person2 : this.person1\n    });\n  }\n};\n\nteam.manager = team.person1;\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", team);\n{^{:manager^nickname || manager^name}}\n\nThe data-linked {^{: ...}} tag updates when the expression manager^nickname || manager^name changes– i.e. when manager.nickname, manager.name or the manager object change.\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note: {^{: ...}} does not HTML-encode the value of the expression. Therefore if you type in ...<sometag>... as nickname, the {^{: ...}} tag will insert that markup as is, into the HTML, which will cause an error (mismatched tag). In this scenario the {^{> ...}} tag should be used instead.\n"
      },
      {
        "_type": "links",
        "title": "See:",
        "text": "See:\n"
      }
    ]
  },
  "jsvhtmltag": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the {^{> someExpression}} tag is a data-bound version of the JsRender {{> ...}} tag – which evaluates the expression and returns the HTML encoded string value of the result.\nWhen using data-linked templates the data-bound version will update automatically when the data in the expression changes observably.\n"
      },
      {
        "_type": "sample",
        "title": "{^{> ...}}",
        "text": "{^{> ...}}\n\n\n\n  <button data-link=\"{on changeManager}\">Change manager</button><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n  <em>Nickname:</em> <input data-link=\"manager^nickname\" /><br/>\n\n  <em>&lcub;^{>manager^nickname || manager^name}&rcub;:</em>\n  <span class=\"spanbox\">\n    {^{>manager^nickname || manager^name}}\n  </span>\n\nvar team = {\n  person1: {\n    name: \"Peter\",\n    nickname: \"Pete\"\n  },\n  person2: {\n    name: \"Octavia\"\n  },\n  changeManager: function() {\n    $.observable(this).setProperty({\n      manager: this.manager === this.person1 ? this.person2 : this.person1\n    });\n  }\n};\n\nteam.manager = team.person1;\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", team);\n{^{:manager^nickname || manager^name}}\n\nThe data-linked {^{> ...}} tag updates when the expression manager^nickname || manager^name changes– i.e. when manager.nickname, manager.name or the manager object change.\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note: Unlike the {^{: ...}}, the {^{> ...}} HTML-encodes the value of the expression. So if you type in ...<sometag>... as nickname, the {^{> ...}} tag will HTML-encode that markup, and there will not be an error.\n"
      },
      {
        "_type": "links",
        "title": "See:",
        "text": "See:\n"
      }
    ]
  },
  "jsvincludetag": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the {^{include ...}} tag is a data-bound version of the JsRender {{include ...}} tag.\nWhen using data-linked templates the data-bound version will update automatically when the data in the expression changes observably.\nThe most common scenario for {{include}} is for composition of templates, without change of data context and with statically-defined templates. In that scenario, even within a JsViews data-linked template, the {{include}} itself does not need to be data-linked:\n"
      },
      {
        "_type": "sample",
        "title": "{{include}}",
        "text": "{{include}}\n\n\n\n  I am {^{>manager^name}}\n\n\n\n  <button data-link=\"{on changeManager}\">Change manager</button><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n\n  <em>&lcub;{include tmpl=\"#managerTmpl\"/}&rcub;:</em>\n  <span class=\"spanbox\">\n    {{include tmpl=\"#managerTmpl\"/}}\n  </span>\n\n\n\nvar team = {\n  person1: {\n    name: \"Peter\"\n  },\n  person2: {\n    name: \"Octavia\"\n  },\n  changeManager: function() {\n    $.observable(this).setProperty({\n      manager: this.manager === this.person1 ? this.person2 : this.person1\n    });\n  }\n};\n\nteam.manager = team.person1;\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", team);\n{{include tmpl=\"#managerTmpl\"/}}\n\nHere, the {{include}} tag is not data-linked, but the managerTmpl template does itself include data-linking:\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n  I am {^{>manager^name}}\n</script>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "If {{include someExpression ...}} has an argument for moving to a new data-context, and changes in the value of the expression are to drive updates, then the data-linked form {^{include}} must be used:\n"
      },
      {
        "_type": "sample",
        "title": "{^{include}}",
        "text": "{^{include}}\n\n\n\n  I am {^{>name}}\n\n\n\n  <button data-link=\"{on changeManager}\">Change manager</button><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n\n  <em>&lcub;^{include manager tmpl=\"#managerTmpl\"/}&rcub;:</em>\n  <span class=\"spanbox\">\n    {^{include manager tmpl=\"#managerTmpl\"/}}\n  </span>\n\n\n\nvar team = {\n  person1: {\n    name: \"Peter\"\n  },\n  person2: {\n    name: \"Octavia\"\n  },\n  changeManager: function() {\n    $.observable(this).setProperty({\n      manager: this.manager === this.person1 ? this.person2 : this.person1\n    });\n  }\n};\n\nteam.manager = team.person1;\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", team);\n{^{include manager tmpl=\"#managerTmpl\"/}}\n\nThe data-linked {^{include}} tag updates when the expression manager changes – i.e. when the manager object is changed.\nAlso the ‘name’ updates when name changes, because the managerTmpl itself has a data-linked {^{>name}} tag:\n<script id=\"managerTmpl\" type=\"text/x-jsrender\">\n  I am {^{>name}}\n</script>\n\n\n"
      },
      {
        "_type": "para",
        "title": "{^{include ...}} with dynamically changing template",
        "text": "{^{include ...}} with dynamically changing template\nIf {{include}} uses tmpl=expression to obtain a template from data or from a helper, then the data-linked {^{include}} can be used to drive updates when the template changes dynamically:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <button data-link=\"{on changeManager}\">Change manager</button><br/>\n\n  <em>Name:</em> <input data-link=\"manager^name\" /><br/>\n  <em>Template:</em> <input data-link=\"manager^template\" /><br/>\n\n  <em>^&lcub;{include manager ^tmpl=\"manager^template\"/}&rcub;:</em>\n  <span class=\"spanbox\">\n    {^{include manager ^tmpl=manager^template/}}\n  </span>\n\nvar team = {\n  person1: {\n    name: \"Peter\",\n    template: \"I am {^{>name}}\"\n  },\n  person2: {\n    name: \"Octavia\",\n    template: \"My name is {^{>name}}\"\n  },\n  changeManager: function() {\n    $.observable(this).setProperty({\n      manager: this.manager === this.person1 ? this.person2 : this.person1\n    });\n  }\n};\n\nteam.manager = team.person1;\n\nvar tmpl = $.templates(\"#teamTmpl\");\n\ntmpl.link(\"#result\", team);\n{^{include manager ^tmpl=manager^template/}}\n\nHere the data-linked {^{include}} uses a different template for each person (^tmpl=manager^template):\nvar team = {\n  person1: {\n    name: \"Peter\",\n    template: \"I am {^{>name}}\" // Template for Peter\n  },\n  ...\n\n– so thanks to the initial ^ in ^tmpl=... (see binding to tag properties), the {^{include}} tag updates also if the template itself changes dynamically.\n\n"
      },
      {
        "_type": "links",
        "title": "See:",
        "text": "See:\n"
      }
    ]
  },
  "jsvfortag": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the {^{for someExpression}} tag is a data-bound version of the JsRender {{for ...}} tag – which moves the data context to the object or array returned by the expression, and – if an array – iterates over the array.\nWhen using data-linked templates the data-bound version will update automatically when the data in the expression changes observably, and, for arrays, will also update if the array itself changes observably.\n"
      },
      {
        "_type": "sample",
        "title": "{^{for ...}}",
        "text": "{^{for ...}}\nli {list-style: none}\n\n\n\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button>\n  <ul>\n    {^{for members}}\n      <li>\n        {^{:#index + 1}}: {{>name}}\n        <span class=\"remove\" data-link=\"{on ~root.removeMember #index}\"></span>\n      </li>\n    {{else}}\n      <li>There are no members</li>\n    {{/for}}\n  </ul>\n\n\nvar team = {\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"}\n  ],\n  addMember: function() {\n    $.observable(this.members).insert({name: \"new\" + cnt++});\n  },\n  removeMember: function(index) {\n    $.observable(this.members).remove(index);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", [{name: \"Peter\"}, {name: \"Octavia\"}, {name: \"Xavier\"}]);\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);\nData:\nvar team = {\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"}\n  ],\n...\n\nTemplate:\n...\n{^{for members}}\n  <li>... {^{>name}} ...</li>\n{{else}}\n  <li>There are no members</li>\n{{/for}}\n...\n\nHere, the data-linked {^{for}} tag updates incrementally when the members array is modified as in:\naddMember: function() {\n  $.observable(this.members).insert({name: \"new\" + cnt++});\n}\n...\nremoveMember: function(index) {\n  $.observable(this.members).remove(index);\n}\n\nand updates if the whole members array is replaced, as in:\nreplaceMembers: function() {\n  $.observable(this).setProperty(\"members\", [{name: \"Peter\"}, ...]);\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "{^{for ...}} with dynamically changing template",
        "text": "{^{for ...}} with dynamically changing template\nIf {{for}} uses tmpl=expression to obtain a template from data or from a helper, then the data-linked {^{for}} can be used to drive updates when the template changes dynamically:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button><br/><br/>\n  <label><input type=\"checkbox\" data-link=\"isEditable\"/> Editable</label>\n  <ol>\n    {^{for members ^tmpl=isEditable?\"#memberEditTmpl\":\"#memberTmpl\" /}}\n  </ol>\n\n\n\n  <li>\n    {{>name}}\n    <span class=\"remove\" data-link=\"{on ~root.removeMember #index}\"></span>\n  </li>\n\n\n\n  <li>\n    <input data-link=\"name\"/>\n    <span class=\"remove\" data-link=\"{on ~root.removeMember #index}\"></span>\n  </li>\n\nvar team = {\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"}\n  ],\n  isEditable: false,\n  addMember: function() {\n    $.observable(this.members).insert({name: \"new\" + cnt++})\n  },\n  removeMember: function(index) {\n    $.observable(this.members).remove(index);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", [{name: \"Peter\"}, {name: \"Octavia\"}, {name: \"Xavier\"}])\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);\n{^{for members ^tmpl=isEditable?\"#memberEditTmpl\":\"#memberTmpl\" /}}\n\nHere the data-linked {^{for}} uses two different templates, driven by the isEditable property:\nvar team = {\n  members: [...],\n  isEditable: false,\n  ...\n\n– so thanks to the initial ^ in ^tmpl=... the {^{for}} tag updates if isEditable changes – and uses the appropriate template. (See binding to tag properties.)\n\n"
      },
      {
        "_type": "para",
        "title": "Using {^{for array}} with sorting and filtering, or specifying a range of items",
        "text": "Using {^{for array}} with sorting and filtering, or specifying a range of items\nThe {{for}} tag has native sorting, filtering and ‘range’ features – as described in the corresponding  JsRender topic.\nThe following sample illustrates use of the start=... and end=... properties of {{for}} to dynamically limit the ‘range’ of items.\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n\n<div class=\"left\">\n  <b>Choose the range</b><br/><br/>\n\n  Start:\n  <select data-link=\"{:start:strToInt}\">\n    {^{for start=1 end=10}}\n      <option>{{:}}</option>\n    {{/for}}\n  </select>\n\n  End:\n  <select data-link=\"{:end:strToInt}\">\n    {^{for start=1 end=10}}\n      <option>{{:}}</option>\n    {{/for}}\n  </select>\n\n  <ul>\n    {^{for members start=start-1 end=end}}\n      <li>\n        {^{:#index + ~root.start}}. {^{>name}}\n      </li>\n    {{else}}\n      <li>No items</li>\n    {{/for}}\n  </ul>\n</div>\n\n<div class=\"left\">\n  <b>Edit the list</b><br/><br/>\n  <div class=\"buttons\">\n    <button id=\"add\">Add</button>\n  </div>\n\n  <ol>\n    {^{for members}}\n      <li>\n        <input data-link=\"name\" />\n        <span class=\"remove\"></span>\n      </li>\n    {{/for}}\n  </ol>\n</div>\n\n\n$.views.converters({\n  strToInt: function(value) {\n    return parseInt(value);\n  }\n});\n\nvar team = {\n  start: 2,\n  end: 4,\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"},\n    {name: \"Xavier\"},\n    {name: \"Adriana\"}\n  ]\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team)\n  .on(\"click\", \".remove\", function() {\n    var view = $.view(this);\n    $.observable(team.members).remove(view.index);\n  })\n  .on(\"click\", \"#add\", function() {\n    $.observable(team.members).insert(0, {name: \"new\" + cnt++})\n  });\nWe use {{for}} to create a drop-down to select an integer between 1 and 10 as the start integer (…and similarly for the end integer):\n<select data-link=\"{:start:strToInt}\">\n  {^{for start=1 end=10}}\n    <option>{{:#data}}</option>\n  {{/for}}\n</select>\n\nThen we again use {{for}} to show a partial list of team members:\n<ul>\n  {^{for members start=start-1 end=end}}\n    <li>\n      {^{:#index + ~root.start}}. {^{:name}}\n    </li>\n  {{else}}\n    <li>No items</li>\n  {{/for}}\n</ul>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the sample JsViews: Using the {^{for}} tag to provide a dynamic ‘purchases’ grid control…, which includes dynamic sorting, filtering, reverse, as well as a running totals helper function:\n{^{for lineItems sort=~sortBy reverse=~reverseSort filter=~filter}}\n  ...<td data-link=\"{:~total('quantity * price')}\"></td>...\n{{else}}\n  ...No items...\n{{/for}}\n\n"
      },
      {
        "_type": "links",
        "title": "See:",
        "text": "See:\n"
      }
    ]
  },
  "jsvpropstag": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the {^{props someExpression}} tag is a data-bound version of the JsRender {{props ...}} tag – which iterates over the properties of the object returned by the expression.\nWhen using data-linked templates the data-bound version will update automatically when the data in the expression changes observably, and will also update if the properties of the object itself change observably.\nThe following sample is functionally similar to the example given for {^{for ...}} – but here instead of using a members array, it uses a members object – a dictionary by key of ‘name’ strings:\nteam.members = {m1: \"Robert\", m2: \"Sarah\"}\n\nAdding or removing properties on the members object triggers incremental updates of the {^{props members}} tag content. Replacing the members object triggers a complete update of the content.\n"
      },
      {
        "_type": "sample",
        "title": "{^{props ...}} &ndash; iterating over string properties ",
        "text": "{^{props ...}} – iterating over string properties \nli {list-style: none}\n\n\n\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button>\n  <ul>\n    {^{props members}}\n      <li>\n        {^{:#index+1}}: {{>prop}}\n        <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\n      </li>\n    {{else}}\n      <li>There are no members</li>\n    {{/props}}\n  </ul>\n\n\nvar team = {\n  members: {m1: \"Robert\", m2: \"Sarah\"},\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, \"new\" + cnt++);\n  }, \n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: \"Peter\", m2: \"Octavia\", m3: \"Xavier\"});\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);\nData:\nvar team = {\n  members: {m1: \"Robert\", m2: \"Sarah\"},\n...\n\nTemplate:\n...\n{^{props members}}\n  <li>... {{>prop}} ...</li>\n{{else}}\n  <li>There are no members</li>\n{{/props}}\n...\n\nHere, the data-linked {^{props members}} tag updates incrementally when properties of the members object are added or removed, as in:\naddMember: function() {\n  $.observable(this.members).setProperty(\"n\" + cnt, \"new\" + cnt++);\n}, \n...\nremoveMember: function(key) {\n  $.observable(this.members).removeProperty(key);\n}\n\nIt also updates if the whole members object is replaced, as in:\nreplaceMembers: function() {\n  $.observable(this).setProperty(\"members\", {m1: \"Peter\", ...});\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Inside the {^{props members}} tag, a block is rendered for each property, with as data context:\n{key: propertyName, prop: propertyValue}\n\n– so {{>key}} gives the key and {{>prop}} gives the value for that property.\nIf members was not a dictionary of ‘name’ strings, but instead a dictionary of ‘person’ objects, each with a name property, then we would write {{>prop.name}} to display the name for that ‘person’ property.\nHere is a modified version of the sample above, using this dictionary of ‘person’ objects approach:\n"
      },
      {
        "_type": "sample",
        "title": "{^{props ...}} &ndash; iterating over object properties",
        "text": "{^{props ...}} – iterating over object properties\n\n\n\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button>\n  <ol>\n    {^{props members}}\n      <li>\n        {{>prop.name}}\n        <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\n      </li>\n    {{/props}}\n  </ol>\n\n\nvar team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, {name: \"new\" + cnt++});\n  }, \n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: {name: \"Peter\"}, m2: {name: \"Octavia\"}, m3: {name: \"Xavier\"}});\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);\nData:\nvar team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n...\n\nTemplate:\n...\n{^{props members}}\n  <li>{{>prop.name}} ...</li>\n{{/props}}\n...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The above samples show adding and removing properties on the members object, but does not show observably modifying the value of an existing property. Here is an updated version using a dictionary of strings – where you can also modify property values observably.\nTo render the value of the ‘name’ string property, we use the data-linked form: {^{>prop}} – which updates automatically when the value of the property changes observably.\n"
      },
      {
        "_type": "sample",
        "title": "{^{props ...}} &ndash; with observably changing property values (strings)",
        "text": "{^{props ...}} – with observably changing property values (strings)\n\n\n\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button>\n  <button data-link=\"{on changeMembers}\">Change</button>\n  <ol>\n    {^{props members}}\n      <li>\n        <input data-link=\"prop\"/>\n        {^{>prop}}\n        <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\n      </li>\n    {{else}}\n      There are no members\n    {{/props}}\n  </ol>\n\n\nvar team = {\n  members: {m1: \"Robert\", m2: \"Sarah\"},\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, \"new\" + cnt++);\n  }, \n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: \"Peter\", m2: \"Octavia\", m3: \"Xavier\"});\n  },\n  changeMembers: function() {\n    for (var property in this.members) {\n      if (property !== $.expando) {\n        $.observable(this.members).setProperty(property, this.members[property] + cnt++);\n      }\n    }\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);\nData:\nvar team = {\n  members: {m1: \"Robert\", m2: \"Sarah\"},\n...\n\nTemplate:\n...\n{^{props members}}\n  <li>\n    <input data-link=\"prop\"/>\n    {^{>prop}} ...\n  </li>\n{{else}}\n  There are no members\n{{/props}}\n...\n\nHere, the Change button modifies each of the properties of members:\nchangeMembers: function() {\n  for (var property in this.members) {\n    ...\n    $.observable(this.members).setProperty(property, ...);\n    ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the same thing, but where members is a dictionary of ‘person’ objects – so we use {^{>prop^name}} to render the name. This will update when the name property of the ‘person’ object changes (e.g. when typing into the textbox: <input data-link=\"prop^name\" />) or when a property of members is changed observably to a different ‘person’ object.\n"
      },
      {
        "_type": "sample",
        "title": "{^{props ...}} &ndash; with observably changing property values (objects)",
        "text": "{^{props ...}} – with observably changing property values (objects)\n\n\n\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button>\n  <button data-link=\"{on changeMembers}\">Change</button>\n  <ol>\n    {^{props members}}\n      <li>\n        <input data-link=\"prop^name\"/>\n        {^{>prop^name}}\n        <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\n      </li>\n    {{/props}}\n  </ol>\n\n\nvar team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, {name: \"new\" + cnt++});\n  }, \n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: {name: \"Peter\"}, m2: {name: \"Octavia\"}, m3: {name: \"Xavier\"}});\n  },\n  changeMembers: function() {\n    for (var property in this.members) {\n      if (property !== $.expando) {\n        $.observable(this.members).setProperty(property, {name: this.members[property].name + cnt++});\n      }\n    }\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);\nData:\nvar team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n...\n\nTemplate:\n...\n{^{props members}}\n  <li>\n    <input data-link=\"prop^name\"/>\n    {^{>prop^name}} ...\n  </li>\n{{/props}}\n...\n\nHere, the Change button modifies each of the properties of members – assigning a different person object:\nchangeMembers: function() {\n  for (var property in this.members) {\n    ...\n    $.observable(this.members).setProperty(property, {name: ...});\n    ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "Loading and editing a dictionary/hash collection",
        "text": "Loading and editing a dictionary/hash collection\nThe following sample is a copy of the last of the Editable data set of samples, and illustrates providing completed editability of a data collection using a dictionary/hash :\n"
      },
      {
        "_type": "sample",
        "url": "samples/editable-data/hash-dictionary/sample",
        "text": "Hash/dictionary of movies:\nmovies = {\n  movJb: {\n    title:\"Meet Joe Black\",\n    ...\n  },\n  movEws: {\n    title:\"Eyes Wide Shut\",\n    ...\n  },\n\nIterate:\n<table>\n  ...\n  <tbody class=\"movies\">\n    {^{props}}\n      <tr...>\n        ...\n      </tr>\n    {{/props}}\n  </tbody>\n</table>\n\nDynamic display of details based on key selection (rather than index selection):\n<div class=\"detail\">\n  {^{for #data[~selectedKey]}}\n    ...\n  {{/for}}\n</div>\n\nEditing and selection actions for hash-based collection:\nhelpers: {\n  ...\n  select: function select(key, ev, eventArgs) {\n    eventArgs.view.ctxPrm(\"selectedKey\", key);\n  },\n  addMovie: function(ev, eventArgs) {\n    var newKey = \"mov\" + counter;\n    $.observable(movies).setProperty(\n      newKey,\n      {\n        title: \"NewTitle\" + counter,\n        ...\n      }\n    );\n    eventArgs.view.ctxPrm(\"selectedKey\", newKey);\n  },\n  removeMovie: function(key, ev, eventArgs) {\n    eventArgs.view.ctxPrm(\"selectedKey\", null);\n    $.observable(movies).removeProperty(key);\n    return false;\n  },\n  ...\n\n\n\"use strict\";\nvar counter = 0,\n  movies = { // Hash/dictionary of movies\n    movJb: {\n      title:\"Meet Joe Black\",\n      languages: [\n        {name: \"English\"},\n        {name: \"French\"}\n      ]\n    },\n    movEws: {\n      title:\"Eyes Wide Shut\",\n      languages: [\n        {name: \"German\"},\n        {name: \"French\"},\n        {name: \"Spanish\"}\n      ]\n    }\n  },\n\n  helpers = {\n//  selectedKey: \"movEws\", // Optionally set initial selection\n    bgColor: function() {\n      return this.ctxPrm(\"selectedKey\")===this.data.key\n        ? \"yellow\"\n        : (this.index%2 ? \"#fdfdfe\" : \"#efeff2\");\n    },\n    select: function select(key, ev, eventArgs) {\n      eventArgs.view.ctxPrm(\"selectedKey\", key);\n    },\n    addMovie: function(ev, eventArgs) {\n      var newKey = \"mov\" + counter;\n      $.observable(movies).setProperty(\n        newKey,\n        {\n          title: \"NewTitle\" + counter,\n          languages: [\n            {name: \"NewLanguage\" + counter++}\n          ]\n        }\n      );\n      eventArgs.view.ctxPrm(\"selectedKey\", newKey);\n    },\n    removeMovie: function(key, ev, eventArgs) {\n      eventArgs.view.ctxPrm(\"selectedKey\", null);\n      $.observable(movies).removeProperty(key);\n      return false;\n    },\n    addLanguage: function(languages) {\n      $.observable(languages).insert({\n        name: \"NewLanguage\" + counter++\n      });\n    },\n    removeLanguage: function(languages, index) {\n      $.observable(languages).remove(index);\n      return false;\n    },\n    deleteLast: function() {\n      var propsArray = $.view(\"#movieList\").get(true, \"array\").data;\n      if (propsArray.length) {\n        var lastMovie = propsArray[propsArray.length - 1].prop;\n        $.observable(lastMovie.languages).remove();\n      }\n    },\n    showData: function() {\n      $(\"#console\").append(\"<hr/>\" + $(\"#showData\").render(movies));\n    }\n  },\n\n  movieTmpl = $.templates(\"#movieTemplate\");\n\n// Set dependency on bgColor, to update on collection (deletion) and selection changes\nhelpers.bgColor.depends = [\"#index\", \"~selectedKey\"];\n\n// Render movies\nmovieTmpl.link(\"#movieList\", movies, helpers);\n\n// Data-link top-level buttons\n$.link(true, \".buttons\", helpers);\n\n<div class=\"buttons\">\r\n  <button data-link=\"{on showData}\">show data</button>\r\n  <button  data-link=\"{on deleteLast}\">delete last language</button>\r\n</div>\r\n\r\n<div class=\"comment\">Click to select and edit</div>\r\n\r\n<div id=\"movieList\"></div>\r\n\r\n<script id=\"movieTemplate\" type=\"text/x-jsrender\">\r\n  <table>\r\n    <thead><tr>\r\n      <th>Title</th><th>Languages</th>\r\n      <th class=\"addMovie\" data-link=\"{on ~addMovie}\">Add</th>\r\n    </tr></thead>\r\n    <tbody class=\"movies\">\r\n      {^{props}}\r\n        <tr class=\"hover\" data-link=\"css-background-color{:~bgColor()} {on ~select key}\">\r\n          <td>\r\n            {^{:#index + 1}}: {^{>prop.title}}\r\n          </td>\r\n          <td>\r\n            {^{for prop.languages}}\r\n              <div>{^{>name}}</div>\r\n            {{/for}}\r\n          </td>\r\n          <td><span class=\"removeMovie\" data-link=\"{on ~removeMovie key}\"></span></td>\r\n        </tr>\r\n      {{/props}}\r\n    </tbody>\r\n  </table>\r\n\r\n  <div class=\"detail\">\r\n    {^{for #data[~selectedKey]}}\r\n      <div>\r\n        <div class=\"title\">Title:</div>\r\n        <div><input data-link=\"title\" /></div>\r\n        <div class=\"title\">\r\n          Languages: <span class=\"addLanguage\" data-link=\"{on ~addLanguage languages}\">Add</span>\r\n        </div>\r\n        {^{for languages ~languages=languages}}\r\n          <input data-link=\"name\" />\r\n          <span class=\"removeLanguage\" data-link=\"{on ~removeLanguage ~languages #index}\"></span>\r\n        {{/for}}\r\n      </div>\r\n    {{/for}}\r\n  </div>\r\n</script>\r\n\r\n<script id=\"showData\" type=\"text/x-jsrender\">\r\n  {{props}}\r\n\t<div>\r\n    <b>Movie:</b> {{>prop.title}}\r\n    <b>Languages:</b> {{for prop.languages}} {{>name}}{{/for}}\r\n  </div>\r\n  {{/props}}\r\n</script>\r\n\r\n<div id=\"console\">\r\n</div>\n"
      },
      {
        "_type": "para",
        "title": "More advanced use of {{props}} &ndash; {{jsonview/}}",
        "text": "More advanced use of {{props}} – {{jsonview/}}\nAn example of more advanced use of {{props}} is the sample custom tag control {{jsonview}}, available from download/sample-tagcontrols. That tag control uses {^{props}}, and recursively calls itself:\n{^{props}}\n  <li>\n    ...\n    {^{jsonview prop/}}...\n  </li>\n{{/props}}\n\nThe {{jsonview}} tag control can be included in any JsViews page, to show the contextual data at that place in the page, or to show given data returned by an expression {^{jsonview someExpression /}}. Changes to the data will then update dynamically.\nIn the next sample we update the previous one, to include:\n\na data-linked {^{jsonview/}} control to show current data\nallow the user to modify the key values in the members object, using <input data-link=\"key\" />\n{^{props}}...{{else}}...{{/props}} to show a message if the members object is ‘empty’\n\nThis sample is also available at samples/tag-controls/jsonview.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "url": "samples/tag-controls/jsonview/sample",
        "text": "Template:\n...\n<ul>\n  {^{props members}}\n    <li>\n      ...\n      <input data-link=\"key\"/>\n      {^{>key}}\n      <input data-link=\"prop^name\"/>\n      {^{>prop^name}}\n      ...\n    </li>\n  {{else}}\n    ...\n  {{/props}}\n</ul>\n...\n{^{jsonview/}}\n...\n\n\n\"use strict\";\nvar team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, {name: \"new\" + cnt++});\n  }, \n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: {name: \"Peter\"}, m2: {name: \"Octavia\"}, m3: {name: \"Xavier\"}});\n  },\n  changeMembers: function() {\n    for (var property in this.members) {\n      if (property !== $.expando) {\n        $.observable(this.members).setProperty(property, {name: this.members[property].name + cnt++});\n      }\n    }\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);\n\n/*! Sample JsViews tag control: {{jsonview}} control v1.0.0\nsee: http://www.jsviews.com/#download/sample-tagcontrols */\n/*\n  * Copyright 2018, Boris Moore\n  * Released under the MIT License.\n*/\n\n(function($) {\n  \"use strict\";\n  $.views.tags(\"jsonview\", {\n    template: {\n      markup: '{{if ~tag.isArray(#data)}}'\n      + '<span class=\"jsonview\"><span class=\"brace\">[</span>{^{if length}}'\n        + '<ul class=\"jsonview\">'\n          + '{^{for}}'\n            + '<li {{:~tag.isFn(#data) ? \"class=\\'function\\'\" : \"\"}}>{^{jsonview/}}{^{if #index < #parent.data.length-1}},{{/if}}</li>'\n          + '{{/for}}'\n        + '</ul>'\n      + '{{/if}}<span class=\"brace\">]</span></span>'\n    + '{{else ~tag.isObject(#data)}}'\n      + '<span class=\"jsonview\"><span class=\"brace\">{</span>{^{if ~tag.notEmpty(#data)}}'\n        + '<ul class=\"jsonview\">'\n          + '{^{props noFunctions=~noFunctions}}'\n            + '<li {{:~tag.isFn(prop) ? \"class=\\'function\\'\" : \"\"}}>'\n              + '<label>\"{^{encode: key}}\": </label>'\n              + '{^{jsonview prop /}}{^{if #index < #parent.data.length-1}},{{/if}}'\n            + '</li>'\n          + '{{/props}}'\n        + '</ul>'\n      + '{{/if}}<span class=\"brace\">}</span></span>'\n    + '{{else #data+\"\"===#data}}'\n      + '\"{^{str:#data}}\"'\n    + '{{else}}'\n      + '{^{cvt:#data}}'\n    + '{{/if}}',\n      converters: {\n        str: function convertValue(val) {\n          return $.views.converters.encode(val+\"\").replace(/\"/g, '\\\\\"');\n        },\n        cvt: function convertValue(val) {\n          if ($.isFunction(val)) {\n            return (this.ctx.noFunctions\n              ? \"<em>[function...]</em>\"\n              : $.views.converters.encode(val+\"\"));\n          } else {\n            return val + \"\"; // TODO Add support for dates\n          }\n        }\n      }\n    },\n    notEmpty: function notEmpty(val) {\n      for (var key in val) {\n        if (key !== $.expando && val.hasOwnProperty(key) && (!this.ctx.noFunctions || !$.isFunction(val[key]))) {\n          return true;\n        }\n      }\n    },\n    init: function() {\n      this.notEmpty.depends = \"*\";\n      this.ctx.noFunctions = this.ctx.noFunctions || this.tagCtx.props.noFunctions;\n    },\n    isFn: $.isFunction,\n    isArray: $.isArray,\n    isObject: function isObject(val) {\n      return val && typeof val === \"object\" && !(val instanceof Date);\n    },\n\n  });\n\n})(this.jQuery);\n\n<div id=\"team\"></div>\r\n\r\n<script id=\"teamTemplate\" type=\"text/x-jsrender\">\r\n  <div class=\"left\">\r\n    <button data-link=\"{on addMember}\">Add</button>\r\n    <button data-link=\"{on replaceMembers}\">Replace</button>\r\n    <button data-link=\"{on changeMembers}\">Change</button>\r\n    <ul>\r\n      {^{props members}}\r\n        <li>\r\n          {^{:#index+1}}.\r\n          <input data-link=\"key\"/>\r\n          {^{>key}}\r\n          <input data-link=\"prop^name\"/>\r\n          {^{>prop^name}}\r\n          <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\r\n        </li>\r\n      {{else}}\r\n        <li>No members...</li>\r\n      {{/props}}\r\n    </ul>\r\n  </div>\r\n  <div class=\"right\">\r\n    <em><b>Data:</b></em><br/>{^{jsonview noFunctions=true/}}\r\n  </div>\r\n</script>\n"
      },
      {
        "_type": "para",
        "title": "{^{props ...}} with dynamically changing template (advanced)",
        "text": "{^{props ...}} with dynamically changing template (advanced)\nIf {{props}} uses tmpl=expression to obtain a template from data or from a helper, then the data-linked {^{props}} can be used to drive updates when the template changes dynamically.\nHere it is in a sample (similar to the corresponding sample using the {^{for}} tag).\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <button data-link=\"{on addMember}\">Add</button>\n  <button data-link=\"{on replaceMembers}\">Replace</button><br/><br/>\n  <label><input type=\"checkbox\" data-link=\"isEditable\"/> Editable</label>\n  <ol>\n    {^{props members ^tmpl=isEditable?\"#memberEditTmpl\":\"#memberTmpl\" /}}\n  </ol>\n\n\n\n  <li>\n    {{>prop.name}} \n    <span class=\"remove\" data-link=\"{on ~root.removeMember key}\"></span>\n  </li>\n\n\n\n  <li>\n    <input data-link=\"prop.name\"/>\n    <span class=\"remove\" data-link=\"{on ~root.removeMember #index}\"></span>\n  </li>\n\nvar team = {\n  members: {\n    m1: {name: \"Robert\"},\n    m2: {name: \"Sarah\"}\n  },\n  isEditable: false,\n  addMember: function() {\n    $.observable(this.members).setProperty(\"n\" + cnt, {name: \"new\" + cnt++})\n  },\n  removeMember: function(key) {\n    $.observable(this.members).removeProperty(key);\n  },\n  replaceMembers: function() {\n    $.observable(this).setProperty(\"members\", {m1: {name: \"Peter\"}, m2: {name: \"Octavia\"}, m3: {name: \"Xavier\"}})\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);\n{^{props members ^tmpl=editable?\"#memberEditTmpl\":\"#memberTmpl\" /}}\n\nHere the data-linked {^{props}} uses two different templates, driven by the isEditable property:\nvar team = {\n  members: [...],\n  isEditable: false,\n  ...\n\n– so thanks to the initial ^ in ^tmpl=... the {^{props}} tag updates if isEditable changes – and uses the appropriate template. (See binding to tag properties.)\n\n"
      },
      {
        "_type": "para",
        "title": "Using {^{props}} with sorting and filtering, or specifying a range of properties",
        "text": "Using {^{props}} with sorting and filtering, or specifying a range of properties\nThe {{props}} tag has native sorting, filtering and ‘range’ features – as described in the corresponding  JsRender topic.\n"
      },
      {
        "_type": "links",
        "title": "See:",
        "text": "See:\n"
      }
    ]
  },
  "jsviftag": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the {^{if someExpression}} tag is a data-bound version of the JsRender {{if ...}} tag, which renders a block conditionally based on the value of the expression.\nWhen using data-linked templates the data-bound version will update automatically when the value of the expression changes observably.\nThe following sample is similar to one found at Samples: Data-linking {^{for}} and {^{if}}:\n"
      },
      {
        "_type": "sample",
        "title": "{^{if ...}}",
        "text": "{^{if ...}}\n\n\n\n  <label><input type=\"checkbox\" data-link=\"reverse\"/> Reverse name</label><br/><br/>\n\n  {^{if reverse}}\n    <b>{{:last}}</b>, {{:first}}\n  {{else}}\n    {{:first}} <b>{{:last}}</b>\n  {{/if}}\n\n\nvar person = {\n  reverse: true,\n  first:\"Jeff\",\n  last: \"Adams\"\n};\n\nvar tmpl = $.templates(\"#personTemplate\");\n\ntmpl.link(\"#person\", person);\n\n\n\nReverse name \n\n{^{if reverse}}\n  {{:last}}, {{:first}}\n{{else}}\n  {{:first}} {{:last}}\n{{/if}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "{^{if ...}}...{{else}}...{{/if}} with dynamically changing templates (advanced)",
        "text": "{^{if ...}}...{{else}}...{{/if}} with dynamically changing templates (advanced)\nIf the {{if}} or an associated {{else}} tag use template references, rather than inline markup, with tmpl=expression (obtaining a template from data or from a helper), then the data-linked {^{if}} can be used to drive updates when any of the templates change dynamically:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  <label><input type=\"checkbox\" data-link=\"isEditable\"/> Editable</label><br/>\n  <label><input type=\"checkbox\" data-link=\"reverse\"/> Reverse</label><br/><br/>\n\n  {^{if reverse ^tmpl=isEditable?'#editableReverseTmpl':'#noeditReverseTmpl'}}\n  {{else ^tmpl=isEditable?'#editableTmpl':'#noeditTmpl'}}\n  {{/if}}\n\n\n\n  <input data-link=\"last\" />, <input data-link=\"first\" />\n\n\n\n  <b>{{>last}}</b>, {{:first}}\n\n\n\n  <input data-link=\"first\" /> <input data-link=\"last\" />\n\n\n\n  {{>first}} <b>{{>last}}</b>\n\nvar person = {\n  isEditable: true,\n  reverse: true,\n  first:\"Jeff\",\n  last: \"Adams\"\n};\n\nvar tmpl = $.templates(\"#personTemplate\");\n\ntmpl.link(\"#person\", person);\n\n\n  {^{if reverse ^tmpl=isEditable?'#editableReverseTmpl':'#noeditReverseTmpl'}}\n  {{else ^tmpl=isEditable?'#editableTmpl':'#noeditTmpl'}}\n  {{/if}}\n\nHere the data-linked {^{if}} and the {{else}} each use two alternate templates, driven by the isEditable property:\nvar team = {\n  members: [...],\n  isEditable: false,\n  ...\n\n– so thanks to the initial ^ in ^tmpl=... (see binding to tag properties), the {^{if}} and {{else}} blocks each update if the isEditable changes – and use the appropriate template.\n\n"
      },
      {
        "_type": "links",
        "title": "See:",
        "text": "See:\n"
      }
    ]
  },
  "jsvelsetag": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In JsViews the {{else ...}} tag is identical to the {{else ...}} tag used in JsRender, and acts as a separator for alternate content blocks, in as association with an {{if}}, {{for}} or {{props}} tag, or with any custom tag.\nIf the associated tag is data-linked, then the rendering of the {{else}} block can also be dynamically driven by observable data changes. See for example the first sample in the {^{if}}, {^{for}} and {^{props}} topics\nIn each case rendering will switch dynamically to the {{else}} block when the data changes appropriately – for example, in the case of {^{for members}}...{{else})...{{/for}}, when the members array is empty.\nThe following example shows an {^{if}} tag with multiple {{else}} blocks:\n"
      },
      {
        "_type": "sample",
        "title": "{^{if ...}} ... {{else ...}} ... {{else}} ... {{/if}}",
        "text": "{^{if ...}} ... {{else ...}} ... {{else}} ... {{/if}}\n\n\n\n  <select data-link=\"type\" size=\"3\">\n    <option value=\"\">Choose type</option>\n    <option>book</option>\n    <option>car</option>\n  </select><br/><br/>\n\n  <input data-link=\"type\" /><br/><br/>\n \n  {^{if type==='book'}}\n    The book price is {{>price}} \n  {{else type==='car'}}\n    The car costs {{>price}}\n  {{else}}\n    Nothing chosen\n  {{/if}}\n\n\nvar object = {\n  type: \"car\",\n  price:\"$25000\"\n};\n\nvar tmpl = $.templates(\"#objectTemplate\");\n\ntmpl.link(\"#object\", object);\n\n\nTemplate:\n...\n{^{if type==='book'}}\n  The book price is {{>price}} \n{{else type==='car'}}\n  The car costs {{>price}}\n{{else}}\n  Nothing chosen\n{{/if}}\n...\n\nNote that {{else expression}} behaves as else if, but it is not necessary to write {^{else expression}} – since the dynamic data-linking is determined by the associated {^{if ...}} tag.\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Similarly with {{for ...}} with multiple {{else}} blocks, the data-linked {^{for ...}} means that there is dynamic binding to expressions not only on the {^{for}} tag itself, but also on the {{else}} tags:\n"
      },
      {
        "_type": "sample",
        "title": "{^{for ...}} ... {{else ...}} ... {{else}} ... {{/for}}",
        "text": "{^{for ...}} ... {{else ...}} ... {{else}} ... {{/for}}\nli {list-style: none}\n\n\n\n  <button data-link=\"{on addMember}\">Add member</button>\n  <button data-link=\"{on addReserve}\">Add reserve</button>\n  <ul>\n    {^{for members}}\n      <li>\n        Member {^{:#index + 1}}: {{>name}}\n        <span class=\"remove\" data-link=\"{on ~root.removeMember #index}\"></span>\n      </li>\n    {{else reserves}}\n      <li>\n        Reserve {^{:#index + 1}}: {{>name}}\n        <span class=\"remove\" data-link=\"{on ~root.removeReserve #index}\"></span>\n      </li>\n    {{else}}\n      <li>No members or reserves</li>\n    {{/for}}\n  </ul>\n\n\nvar team = {\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"}\n  ],\n  reserves: [\n    {name: \"Xavier\"}\n  ],\n  addMember: function() {\n    $.observable(this.members).insert({name: \"new\" + cnt++});\n  },\n  addReserve: function() {\n    $.observable(this.reserves).insert({name: \"new\" + cnt++});\n  },\n  removeMember: function(index) {\n    $.observable(this.members).remove(index);\n  },\n  removeReserve: function(index) {\n    $.observable(this.reserves).remove(index);\n  }\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team);\nTemplate:\n{^{for members}}\n  ...Member ... {{>name}}...\n{{else reserves}}\n  ...Reserve ... {{>name}}...\n{{else}}\n  ...No members or reserves...\n{{/for}}\n\nHere, removing all members causes the {{else reserves}} block to be displayed. Then removing all reserves causes the final {{else}} block to be displayed.\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For the case of {^{if}}...{{else}}...{{/if}} binding, with external template references, see the last {^{if}} sample, which uses the pattern:\n{^{if ... ^tmpl=...}}\n{{else ^tmpl=...}}\n{{/if}}\n\n"
      },
      {
        "_type": "links",
        "title": "See:",
        "text": "See:\n"
      }
    ]
  },
  "jsvontag": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {^{on ...}} tag is used:\n\nfor attaching event handlers, using the syntax data-link=\"{on ...}\"\nfor creating buttons, to call a data method/View Model method/helper method.\n\nIt is used only as a data-bound tag in JsViews, and is not available in JsRender.\nSee the Event bindings topic for more information and examples.\n"
      }
    ]
  },
  "jsvcustomtags": {
    "sections": []
  },
  "jsvradiogrouptag": {
    "sections": [
      {
        "_type": "para",
        "title": "Alternatives for data-linking radio buttons: direct linking, or {^{radiogroup}}",
        "text": "Alternatives for data-linking radio buttons: direct linking, or {^{radiogroup}}\n\nOne way to provide two-way data-binding on a group of radio buttons is by directly data-linking each of the <input> elements, as described in the Data-linked radio buttons topic\nAn alternative and often more convenient approach is to wrap the <input>s with a {^{radiogroup}} tag, as shown in this section\n\n"
      },
      {
        "_type": "para",
        "title": "The {^{radiogroup}} tag",
        "text": "The {^{radiogroup}} tag\nThe {^{radiogroup ...}} tag is used to provide two-way data-linking to a group of radio buttons.\nIt is used only as a data-bound tag in JsViews, and is not available in JsRender.\nThe set of radio buttons (<input type=\"radio\">) are wrapped by the tag (or contained in the external template referenced by tmpl=...) – and are data-linked to the data property specified by the path or expression: {^{radiogroup pathOrExpr}}.\n"
      },
      {
        "_type": "tag",
        "title": "{^{radiogroup pathOrExpr}}",
        "text": "{^{radiogroup pathOrExpr}}\nTwo-way binding between the current selection of a radio button group and a data property\n\n{{radiogroup selectedCar}}\n  <label>\n    <input type=\"radio\" value=\"vlv\"/> \n    Volvo\n  </label>\n  ...\n{{/radiogroup}}\n\n"
      },
      {
        "_type": "sample",
        "title": "{^{radiogroup}}",
        "text": "{^{radiogroup}}\n\n\n\n  {^{radiogroup selectedCar}}\n    <label><input type=\"radio\" value=\"\"/>\n      None</label><br/>\n    <label><input type=\"radio\" value=\"vlv\"/>\n      Volvo</label><br/>\n    <label><input type=\"radio\" value=\"frd\"/>\n      Ford</label><br/>\n  {{/radiogroup}}\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedCar: \"frd\"};\n\ntmpl.link(\"#result\", data);\nData:\nvar data = {\n  selectedCar: \"frd\",\n  ...\n};\n\nHTML:\n{^{radiogroup selectedCar}}\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  <label><input type=\"radio\" value=\"vlv\"/> Volvo</label>\n  <label><input type=\"radio\" value=\"frd\"/> Ford</label>\n{{/radiogroup}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "The name property of the radio &lt;input&gt; elements",
        "text": "The name property of the radio <input> elements\nIf the radio button group is within an HTML <form> which will be submitted, then the associated name property of the radio button group may be specified on the {^{radiogroup}}:\n{^{radiogroup selectedCar name=\"cars\"}}\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  ...\n{{/radiogroup}}\n\nAlternatively it can be specified on each <input>\n{^{radiogroup selectedCar}}\n  <label><input type=\"radio\" value=\"\" name=\"cars\"/> None</label>\n  <label><input type=\"radio\" value=\"vlv\" name=\"cars\"/> Volvo</label>\n  ...\n{{/radiogroup}}\n\nIf it is not specified, then each {^{radiogroup}} will provide an auto-generated unique name, which will be set on the radio button <input> elements.\n"
      },
      {
        "_type": "para",
        "title": "Using a data-linked element &ndash; with data-link=\"{radiogroup ...}\"",
        "text": "Using a data-linked element – with data-link=\"{radiogroup ...}\"\nAn alternative to wrapping radio button <input> tags in a {^{radiogroup}} tag is to wrap them in a data-linked HTML element tag such as a <div>, using data-link=\"{radiogroup ...}\".\n<div data-link=\"{radiogroup selectedCar}\">\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  ...\n</div>\n\nThis approach can be used within templates, but is particularly useful for top-level data-linking, as in the following sample:\n"
      },
      {
        "_type": "sample",
        "title": "Top-level {radiogroup} binding",
        "text": "Top-level {radiogroup} binding\n\n  \n     None\n     Volvo\n     Ford\n  \n\n  \n\nvar data = {selectedCar: \"frd\"};\n\n$.link(true, \"#top-level-linked\", data);\n\nData:\nvar data = {\n  selectedCar: \"frd\",\n  ...\n};\n\nHTML:\n<div data-link=\"{radiogroup selectedCar}\">\n  <label><input type=\"radio\" value=\"\"/> None</label>\n  <label><input type=\"radio\" value=\"vlv\"/> Volvo</label>\n  ...\n</div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "{^{radiogroup}} with {{for}}",
        "text": "{^{radiogroup}} with {{for}}\nA common scenario is when the options in a radio button group come from a data array. The <input type=\"radio\"> elements wrapped by a {^{radiogroup}} can be generated by a {{for}} tag, as in the following example:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  {^{radiogroup selectedCar}}\n    <label><input type=\"radio\" value=\"\"/> None</label><br/>\n    {{for cars}}\n      <label><input type=\"radio\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n    {{/for}}\n  {{/radiogroup}}\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);\nData includes cars array:\nvar data = {\n  selectedCar: \"frd\",\n  cars: [{id: \"vlv\", name: \"Volvo\"}, ...]\n};\n\n{{radiogroup}} tag wrapping a data-driven array of radio buttons (preceded by an additional ‘unselected’ radio button):\n{^{radiogroup selectedCar}}\n  <label><input type=\"radio\" value=\"\"/> None</label><br/>\n  {{for cars}}\n    <label><input type=\"radio\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n  {{/for}}\n{{/radiogroup}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note: The data-driven set of radio buttons can change dynamically, driven by {^{for}}, as shown in this sample.\n"
      },
      {
        "_type": "para",
        "title": "Radio buttons in an external template, using {radiogroup tmpl=...}",
        "text": "Radio buttons in an external template, using {radiogroup tmpl=...}\nThe set of radio buttons wrapped by a {^{radiogroup}} can be in an external template, referenced using {^{radiogroup tmpl=...}} or data-link=\"{radiogroup tmpl=...}\", as in the following example:\n"
      },
      {
        "_type": "sample",
        "title": "tmpl",
        "text": "tmpl\n\n\n\n  <label><input type=\"radio\" value=\"\"/> None</label><br/>\n  {{for cars}}\n    <label><input type=\"radio\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n  {{/for}}\n\n\n\n  {^{radiogroup selectedCar tmpl=\"#inner\"/}}<br/>\n\n  <div data-link=\"{radiogroup selectedCar tmpl='#inner'}\"></div>\n\n  <span class=\"spanbox\" data-link=\"selectedCar||'none'\"></span>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedCar: \"frd\",\n  cars: [\n    {id: \"vlv\", name: \"Volvo\"},\n    {id: \"frd\", name: \"Ford\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);\nTemplate, containing radio buttons:\n<script id=\"inner\" type=\"text/x-jsrender\">\n  <label><input type=\"radio\" value=\"\"/> None</label><br/>\n  ...\n</script>\n\nReferencing “#inner” template from data-linked tag\n{^{radiogroup selectedCar tmpl=\"#inner\"/}}<br/>\n\nReferencing “#inner” template from data-linked element\n<div data-link=\"{radiogroup selectedCar tmpl='#inner'}\"></div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Data context within block is the same as the outer context",
        "text": "Data context within block is the same as the outer context\nNote that using either a {^{radiogroup ...}} tag or a <div data-link=\"radiogroup ...}\"> to wrap a content block leaves the data-context unchanged. – The current data item within the block is the same as the outer data context (including when referenced as an external template, as in the samples above).\n"
      },
      {
        "_type": "para",
        "title": "The {^{radiogroup}} disabled property",
        "text": "The {^{radiogroup}} disabled property\nThe {^{radiogroup}} tag has a disabled property which can be used for disabling/enabling the radio buttons, as shown here.\n"
      },
      {
        "_type": "para",
        "title": "Data-linking a {^{radiogroup}} using converters",
        "text": "Data-linking a {^{radiogroup}} using converters\nJust like any other tag, {^{radiogroup}} can use convert and convertBack converters, using the syntax:\n{^{radiogroup convert=... convertBack=.../}}\n\nas shown in the this sample, which data-links to an integer: the index of the item in the items array, rather than the item.id string value – and uses converters convert between id and index\n"
      },
      {
        "_type": "para",
        "title": "Data-linking radio buttons to integer variables",
        "text": "Data-linking radio buttons to integer variables\nSelection of data-linked radio buttons is determined by comparing the current value of the date variable to the value of the <input type=\"radio\" value=\"...\" /> – which is necessarily of type string.\nIn order to data-link to a data variable of type number (integer), use intToStr and strToInt converters, as shown in the following samples:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "See also:\n\nFor additional details and samples see Data-linked radio buttons\nFor examples of {^{radiogroup}} tags wrapping jQuery UI {{radio}} tag controls, see the Toolbar samples\n\n"
      }
    ]
  },
  "jsvcheckboxgrouptag": {
    "sections": [
      {
        "_type": "para",
        "title": "Alternatives for data-linking groups of checkboxes: direct linking, or {^{checkboxgroup}}",
        "text": "Alternatives for data-linking groups of checkboxes: direct linking, or {^{checkboxgroup}}\n\nOne way to provide two-way data-binding on a group of checkboxes is by directly data-linking each of the <input> elements, as described in the Data-linked checkbox groups topic\nAn alternative and often more convenient approach is to wrap the <input>s with a {^{checkboxgroup}} tag, as shown in this section\n\n"
      },
      {
        "_type": "para",
        "title": "The {^{checkboxgroup}} tag",
        "text": "The {^{checkboxgroup}} tag\nThe {^{checkboxgroup ...}} tag is used to provide two-way data-linking to a group of checkboxes.\nIt is used only as a data-bound tag in JsViews, and is not available in JsRender.\nThe set of checkboxes (<input type=\"checkbox\">) are wrapped by the tag (or contained in the external template referenced by tmpl=...) – and are data-linked to the data property specified by the path or expression: {^{checkboxgroup pathOrExpr}}. The data property will be an array of string values corresponding to the selected items (checked checkboxes). (Alternatively, by using converters, the data property can instead be an array of selected obects, as in this sample).\n(Note that when the user modifies the selection of checked checkboxes, the data property is observably replaced by a new array. This means that in order to observe the length of the array, you need to use a deep path, such as selectedSports^length in the example below).\n"
      },
      {
        "_type": "tag",
        "title": "{^{checkboxgroup pathOrExpr}}",
        "text": "{^{checkboxgroup pathOrExpr}}\nTwo-way binding between the current selection of checked checkboxes within a group, and a data property (array of selected 'value' strings)\n\n{{checkboxgroup selectedSports}}\n  <label>\n    <input type=\"checkbox\" value=\"running\"/> \n    Running\n  </label>\n  ...\n{{/checkboxgroup}}\n\n"
      },
      {
        "_type": "sample",
        "title": "{^{checkboxgroup}}",
        "text": "{^{checkboxgroup}}\n\n\n\n  {^{checkboxgroup selectedSports}}\n    <label><input type=\"checkbox\" value=\"swimming\"/> Swimming</label><br/>\n    <label><input type=\"checkbox\" value=\"running\"/> Running</label><br/>\n    <label><input type=\"checkbox\" value=\"soccer\"/> Soccer</label><br/>\n  {{/checkboxgroup}}\n\n  <div>(Number of checked options: {^{:selectedSports^length}})</div>\n\n  <div class=\"spanbox\">Sports:<ul>\n    {^{for selectedSports}}<li>{^{:}}</li>{{/for}}\n  </ul></div>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {selectedSports: [\"soccer\", \"running\"]};\n\ntmpl.link(\"#result\", data);\nData:\nvar data = {\n  {selectedSports: [\"soccer\", \"running\"],\n  ...\n};\n\nHTML:\n{^{checkboxgroup selectedSports}}\n  <label><input type=\"checkbox\" value=\"swimming\"/> Swimming</label>\n  <label><input type=\"checkbox\" value=\"running\"/> Running</label>\n  <label><input type=\"checkbox\" value=\"soccer\"/> Soccer</label>\n{{/checkboxgroup}}\n\n... Number of checked options: {^{:selectedSports^length}}\n\n\n\n"
      },
      {
        "_type": "para",
        "title": "The name property of the checkbox &lt;input&gt; elements",
        "text": "The name property of the checkbox <input> elements\nIf the checkbox group is within an HTML <form> which will be submitted, then the associated name property of the checkbox group may be specified on the {^{checkboxgroup}}:\n{^{checkboxgroup selectedSports name=\"sports\"}}\n  <label><input type=\"checkbox\" value=\"...\"/> ...</label>\n  ...\n{{/checkboxgroup}}\n\nAlternatively it can be specified on each <input>\n{^{checkboxgroup selectedSports}}\n  <label><input type=\"checkbox\" value=\"swimming\" name=\"sports\"/> Swimming</label>\n  <label><input type=\"checkbox\" value=\"running\" name=\"sports\"/> Running</label>\n  ...\n{{/checkboxgroup}}\n\nIf it is not specified, then each {^{checkboxgroup}} will provide an auto-generated unique name, which will be set on the checkbox <input> elements.\n"
      },
      {
        "_type": "para",
        "title": "Using a data-linked element &ndash; with data-link=\"{checkboxgroup ...}\"",
        "text": "Using a data-linked element – with data-link=\"{checkboxgroup ...}\"\nAn alternative to wrapping checkbox <input> tags in a {^{checkboxgroup}} tag is to wrap them in a data-linked HTML element tag such as a <div>, using data-link=\"{checkboxgroup ...}\".\n<div data-link=\"{checkboxgroup selectedSports}\">\n  <label><input type=\"checkbox\" value=\"...\"/> ...</label>\n  ...\n</div>\n\nThis approach can be used within templates, but is particularly useful for top-level data-linking, as in the following sample:\n"
      },
      {
        "_type": "sample",
        "title": "Top-level {checkboxgroup} binding",
        "text": "Top-level {checkboxgroup} binding\n\n  \n     Swimming\n     Running\n     Soccer\n  \n\n  Sports:\n\n$.templates(\"liTmpl\", \"{{:}}\");\n\nvar data = {selectedSports: [\"soccer\", \"running\"]};\n\n$.link(true, \"#top-level-linked\", data);\n\nData:\nvar data = {\n  {selectedSports: [\"soccer\", \"running\"],\n  ...\n};\n\nHTML:\n  <div data-link=\"{checkboxgroup selectedSports}\">\n    <label><input type=\"checkbox\" value=\"swimming\"/> Swimming</label><br/>\n    <label><input type=\"checkbox\" value=\"running\"/> Running</label><br/>\n    <label><input type=\"checkbox\" value=\"soccer\"/> Soccer</label><br/>\n  </div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "{^{checkboxgroup}} with {{for}}",
        "text": "{^{checkboxgroup}} with {{for}}\nA common scenario is when the options in a checkbox group come from a data array. The <input type=\"checkbox\"> elements wrapped by a {^{checkboxgroup}} can be generated by a {{for}} tag, as in the following example:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n  {^{checkboxgroup selectedSports}}\n    {{for sports}}\n      <label><input type=\"checkbox\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n    {{/for}}\n  {{/checkboxgroup}}\n\n  <div class=\"spanbox\">Sports:<ul>\n    {^{for selectedSports}}<li>{^{:}}</li>{{/for}}\n  </ul></div>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedSports: [\"climbing\"],\n  sports: [\n    {id: \"swimming\", name: \"Swimming\"},\n    {id: \"climbing\", name: \"Mountain climbing\"},\n    {id: \"trailrun\", name: \"Trail running\"},\n    {id: \"soccer\", name: \"Soccer\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);\nData includes sports array:\nvar data = {\n  selectedSports: [\"climbing\"],\n  sports: [\n    {id: \"swimming\", name: \"Swimming\"},\n    {id: \"climbing\", name: \"Mountain climbing\"},\n    ...\n  ]\n};\n\n{{checkboxgroup}} tag wrapping a data-driven array of checkboxes:\n{^{checkboxgroup selectedSports}}\n  {{for sports}}\n    <label><input type=\"checkbox\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n  {{/for}}\n{{/checkboxgroup}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note: The data-driven set of checkboxes can change dynamically, driven by {^{for}}, as shown in this sample.\n"
      },
      {
        "_type": "para",
        "title": "Checkboxes in an external template, using {checkboxgroup tmpl=...}",
        "text": "Checkboxes in an external template, using {checkboxgroup tmpl=...}\nThe set of checkboxes wrapped by a {^{checkboxgroup}} can be in an external template, referenced using {^{checkboxgroup tmpl=...}} or data-link=\"{checkboxgroup tmpl=...}\", as in the following example:\n"
      },
      {
        "_type": "sample",
        "title": "tmpl",
        "text": "tmpl\n\n\n\n  {{for sports}}\n    <label><input type=\"checkbox\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n  {{/for}}\n\n\n\n  {^{checkboxgroup selectedSports tmpl=\"#inner\"/}}<br/>\n\n  <div data-link=\"{checkboxgroup selectedSports tmpl='#inner'}\"></div>\n\n  <div class=\"spanbox\">Sports:<ul>\n    {^{for selectedSports}}<li>{^{:}}</li>{{/for}}\n  </ul></div>\n\nvar tmpl = $.templates(\"#tmpl\");\n\nvar data = {\n  selectedSports: [\"climbing\"],\n  sports: [\n    {id: \"swimming\", name: \"Swimming\"},\n    {id: \"climbing\", name: \"Mountain climbing\"}\n  ]\n};\n\ntmpl.link(\"#result\", data);\nTemplate, containing checkboxes:\n<script id=\"inner\" type=\"text/x-jsrender\">\n  ...\n  <label><input type=\"checkbox\" value=\"{{:id}}\"/> {{:name}}</label><br/>\n  ...\n</script>\n\nReferencing “#inner” template from data-linked tag\n{^{checkboxgroup selectedSports tmpl=\"#inner\"/}}<br/>\n\nReferencing “#inner” template from data-linked element\n<div data-link=\"{checkboxgroup selectedSports tmpl='#inner'}\"></div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Data context within block is the same as the outer context",
        "text": "Data context within block is the same as the outer context\nNote that using either a {^{checkboxgroup ...}} tag or a <div data-link=\"checkboxgroup ...}\"> to wrap a content block leaves the data-context unchanged. – The current data item within the block is the same as the outer data context (including when referenced as an external template, as in the samples above).\n"
      },
      {
        "_type": "para",
        "title": "The {^{checkboxgroup}} disabled property",
        "text": "The {^{checkboxgroup}} disabled property\nThe {^{checkboxgroup}} tag has a disabled property which can be used for disabling/enabling the checkboxes, as shown here.\n"
      },
      {
        "_type": "para",
        "title": "Data-linking a {^{checkboxgroup}} using converters",
        "text": "Data-linking a {^{checkboxgroup}} using converters\nJust like any other tag, {^{checkboxgroup}} can use convert and convertBack converters, using the syntax:\n{^{checkboxgroup convert=... convertBack=.../}}\n\nas shown in the this sample, which data-links to an integer: the index of the item in the items array, rather than the item.id string value – and uses converters convert between id and index\n"
      },
      {
        "_type": "para",
        "title": "See also:",
        "text": "See also:\nFor additional details and samples see Data-linked checkbox groups\n"
      }
    ]
  },
  "other": {
    "sections": []
  },
  "eventArgs": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Observable changes to objects or arrays trigger onPropertyChange or onArray\nChange events, which can be observed using event handlers such as myHandler below:\n$.observe(person, \"firstName\", myHandler);\n$.observable(person).setProperty(\"firstName\", \"newName\");\n...\n\nfunction myHandler(ev, eventArgs) {\n  ...\n}\n\nThe first handler argument (ev) is the jQuery event object\nThe properties include:\n\ntarget: the object which changed\nnamespace: The insert() / remove() / move() / refresh() namespace\ndata: JsViews metadata:\n\n– where ev.data JsViews metadata corresponds to the observe() or observeCall() call, with properties that include:\n\nns: The handler namespace\nfullPath: the full path –- such as \"team.manager.address.street\"\nprop: the property being changed -– such as \"manager\"\npaths: array of ‘ongoing’ paths – when doing ‘deep’ binding(So if this property is part of a deep path such as \"team.manager^address.street\", and manager is being changed, the paths will include [\"address^street\"])\nobserveAll: access to additional metadata\n\n– where ev.data.observeAll, for observeAll() calls, provides methods:\n\nev.data.observeAll.path(): returns path to object being changed, e.g. \"root.team\"\nev.data.observeAll.parents(): returns ‘parent objects’ to object being changed, e.g. [team, model]\n\nThe second handler argument (eventArgs) is the JsViews event object for array or property changes\nThe properties are specific to the ‘change’ type:\n\nFor setProperty(): path, value and oldValue. (With change=\"set\")\nFor insert(): index and items. (With change=\"insert\")\nFor remove(): index and numToRemove. (With change=\"remove\")\nFor move(): oldIndex, index and items. (With change=\"move\")\nFor refresh(), multiple events will be triggered:\n\nFirst, conversion from the current array items to the new refreshed set of items will be broken down into a sequence of insert(), remove() and move() operations, and each will trigger a corresponding event.The eventArgs object for each of these events will have an additional property: refresh = true (together with the usual change=\"insert\" / \"remove\" / \"move\" etc.)\nSecondly, after those supplementary events, a change=\"refresh\" event will be triggered, which will also have an oldItems property\n\n\n"
      }
    ]
  },
  "jsvglobals": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews adds the following extensions to the jQuery object:\n\n$.render:\n\nSee $.render.myTmpl()\n\n$.templates:\n\nSee $.templates()\n\n$.views:\n\nSee $.views\n\n$.observable:\n\nSee $.observable(array)\nand $.observable(object)\n\n$.observe:\n\nSee $.observe()\n\n$.unobserve:\n\nSee $.unobserve()\n\n$.view:\n\nSee $.view()\n\n$.link:\n\nSee $.link.myTmpl()\n\n$.unlink:\n\nSee $.unlink()\n\n\nIt also adds the following ‘plugin’ extensions to jQuery instances:\n\n$(“#myTmpl”).render(…):\n\nSee $(\"#myTmpl\").render()\n\n$(elemOrSelector).view(…):\n\nSee $(elemOrSelector).view()\n\n$(elemOrSelector).link(…):\n\nSee $(elemOrSelector).link(true, ...)\nor $(elemOrSelector).link(expression, ...)\n\n$(elemOrSelector).unlink():\n\nSee $(elemOrSelector).unlink()\n\n\nSee also JsRender globals\n"
      }
    ]
  },
  "jsvtagcontrols": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Custom tag controls used in JsViews apps are regular JsRender custom tags, documented in the topics Using custom tags (overview) and Registering custom tags (API details).\nHowever, in the context of JsViews data-linking they become stateful ‘controls’ (or ‘widgets’) – self-contained encapsulated components, with a lifecycle of instantiation, initialization, initial rendering, data-binding, updating (triggered by observable data changes), disposal…\nJsViews tag controls support many additional tag options (see Tag control options).\n"
      },
      {
        "_type": "para",
        "title": "Custom tags with or without data-linking",
        "text": "Custom tags with or without data-linking\nA custom tag can be used simply for rendering, without data-binding, as in\n{{mytag ...}}\n\nor it can be used (with JsViews) as a data-linked tag (so it becomes a dynamic data-bound tag control), as in:\n{^{mytag ...}}\n\nIt can also be used as a tag binding on a data-linked element:\n<div data-link=\"{mytag ...}\">...</div>\n\n"
      },
      {
        "_type": "sample",
        "text": "\n  <input data-link=\"name\" /><br/>\n\n  No data binding: {{mytag name/}}<br/>\n  Data-linked tag: {^{mytag name/}}<br/>\n  Data-linked element with tag binding: <span data-link=\"{mytag name}\"></span><br/>\n\n\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = { name: \"Jo\" };\n\n$.views.tags(\"mytag\", {\n  template: \"{{>}}\" // template (wrap the data value in a  tag)\n});\n\nmyTmpl.link(\"#page\", data);\nSimple tag:\n$.views.tags(\"mytag\", {\n  template: \"<b>{{:}}</b>\" // template (wrap the data value in a <b> tag)\n});\n\nUse with or without data-linking:\n<input data-link=\"name\" />\nNo data binding: {{mytag name/}}\nData-linked tag: {^{mytag name/}}\nData-linked element with tag binding: <span data-link=\"{mytag name}\"></span>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Specifying tag options for a custom tag",
        "text": "Specifying tag options for a custom tag\nThe following tag declaration registers a custom tag:\n$.views.tags(\"mytag\", tagOptions);\n\nwhere the tagOptions object (hash) specifies the tag options, and determines how the tag will function.\nAn alternative syntax is useful for declaring multiple tags:\n$.views.tags({\n  mytag: tagOptions\n  ...\n});\n\n"
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">JsViews custom tag documentation topics</span>",
        "text": "JsViews custom tag documentation topics\nJsViews tag controls provide a rich and powerful platform for providing interactive data-driven UI controls. See the following topics for details and samples:\n\nThe structure of a JsViews tag control\nThe lifecycle of a JsViews tag control\nTag control design patterns\n\nSee also the detailed API topic:\n\nTag control options\n\n"
      },
      {
        "_type": "para",
        "title": "See also &ndash; JsRender custom tag documentation topics:",
        "text": "See also – JsRender custom tag documentation topics:\nMany of the tag-control features and options are useful for custom tags both with and without JsViews data-linking. See the following topics:\nThe JsRender custom tag overview topic Using custom tags and the more detailed api topic: Registering custom tags api topic explain many important custom tag features and scenarios.\nThey include sections covering:\n\nRegistering custom tags – the $.views.tags(...) api\nCustom tag options – specifying init(), render(), template, baseTag\nTag context – accessing the tag instance, tagCtx, tag args and params, parent views etc.\nCustom tag child views – and rendering wrapped block content, etc.\nRendering wrapped block content\nRendering else blocks – and using the tagCtxs array\nCustom tag hierarchy – and accessing parent tags\nAccessing contextual parameters and helpers\nTags as private template resources\nUnregistering tags\n\n"
      }
    ]
  },
  "tagoptions": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Custom tag controls used in JsViews apps are regular JsRender custom tags, documented in the topics Using custom tags (overview) and Registering custom tags: $.views.tags() (API details).\nHowever, in the context of JsViews data-linking they become stateful ‘controls’ (or ‘widgets’) – self-contained encapsulated components, with a lifecycle of instantiation, initialization, initial rendering, data-binding, updating (triggered by observable data changes), disposal…\nJsViews tag controls support many additional tag options.\nThe Custom tag controls topic provides an overview of JsViews tag controls (with many examples), along with the following subtopics:\n\nThe structure of a JsViews tag control\nThe lifecycle of a JsViews tag control\nTag control design patterns\n\nFor a complete list of available tag options, see below.\n"
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">The <i>$.views.tags(...)</i> API</span> ",
        "text": "The $.views.tags(...) API \nThe following tag declaration registers a custom tag:\n$.views.tags(\"mytag\", tagOptions);\n\nwhere the tagOptions object (hash) specifies the tag options, and determines how the tag will function.\nAn alternative syntax is useful for declaring multiple tags:\n$.views.tags({\n  mytag: tagOptions\n  ...\n});\n\n"
      },
      {
        "_type": "para",
        "title": "<span class=\"strong\">Specifying tag control options</span> ",
        "text": "Specifying tag control options \nThe tag options can include any combination of the following:\nJsViews tag settings\n\nThe baseTag option\nThe flow option\nThe dataBoundOnly option\nThe template option\nThe boundProps option\nThe depends option\nThe bindTo option\nThe bindFrom option\nThe setSize option\nThe height option\nThe width option\nThe className option\nThe linkedElement option\nThe linkedCtxParam option\nThe mainElement option\nThe displayElement option\nThe onArrayChange option\nThe trigger option\nThe attr option\nThe ctx option\nThe contentCtx option\nThe argDefault option\nThe dataMap option\nThe mapProps and mapDepends options\nThe lateRender option\n\nJsViews handlers and methods\n\nThe init() method\nThe render() method\nThe onBind() handler\nThe onAfterLink() handler\nThe onUpdate() handler\nThe onDispose() handler\nThe convert option\nThe convertBack option\nThe onUnbind() handler\nThe onBeforeUpdateVal() handler\nThe onBeforeChange() handler\nThe onAfterChange() handler\nThe setValue() method\nThe domChange() handler\n\ntag properties/state\nInitialization of tag-specific ‘user’ properties (such as those used for instance state)\ntag methods\nTag-specific ‘user’ methods (such as methods called in response to click events on the tag control)\n"
      },
      {
        "_type": "para",
        "title": "<b>Available options:</b>",
        "text": "Available options:\n"
      },
      {
        "_type": "para",
        "title": "The init() method",
        "text": "The init() method\nSee JsViews lifecycle.\nThe init() method acts as a handler for the init event of the custom tag, and is called with the tag instance as this parameter.\n$.views.tags({\n  mytag: {\n    init: function(tagCtx, linkCtx, ctx) { ... },\n    ...\n  }\n});\n\nIt can be used for initializing the tag instance, including programmatically setting other tag options.\nThe init() method arguments are:\n\ntagCtx: the tagCtx object, also available as this.tagCtx\nlinkCtx: always 0 unless using data-linked tags with JsViews (See linkCtx object.)\nctx: View context object\n\nSee also JsRender init().\n"
      },
      {
        "_type": "para",
        "title": "The render() method",
        "text": "The render() method\nSee JsViews lifecycle.\nThe render() method acts as a handler for the render event of the custom tag, and is called with the tag instance as this parameter, and with arguments arg1, arg2, ..., corresponding to the unnamed arguments passed in the tag markup, {{mytag expression1 expression2 ... }}.\nIf no arguments are passed in the markup, then the render() method will be called with the current data context as argument (unless modified by the argDefault option.)\nmytag: {\n  render: function(value1, value2) { ... return ...; },\n  ...\n}\n\nThe render() method can be used to define how the tag renders, by returning an HTML markup string.\nThis approach to rendering can be used instead of (or together with) the template option.\nSee also:\n\nJsRender render()\nWrapping block content\n\n"
      },
      {
        "_type": "para",
        "title": "The onBind() handler",
        "text": "The onBind() handler\nSee JsViews lifecycle.\nThe onBind() handler is called during initial data-linking of the tag instance. It is also called during data-linking whenever the tag has been re-rendered. (This will be the case in response to tag.refresh() calls, and during observable updates if onUpdate() does not return false.)\nIt is called with the tag instance as this parameter, and with arguments tagCtx, linkCtx and ctx. In addition, for observable updates it receives the arguments ev and eventArgs (see onPropertyChange and onArrayChange).\nmytag: {\n  onBind: function(tagCtx, linkCtx, ctx, ev, eventArgs) { ... },\n  ...\n}\n\n"
      },
      {
        "_type": "para",
        "title": "The onAfterLink() handler",
        "text": "The onAfterLink() handler\nSee JsViews lifecycle.\nThe onAfterLink() handler is called following data-linking of the tag instance, both for the initial data-linking and for any subsequent data-linking during observable updates or after tag.refresh() calls.\nIt is called with the tag instance as this parameter, and with arguments tagCtx, linkCtx and ctx. In addition, for observable updates it receives the arguments ev and eventArgs (see onPropertyChange and onArrayChange).\nmytag: {\n  onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) { ... },\n  ...\n}\n\n"
      },
      {
        "_type": "para",
        "title": "The onUpdate() handler",
        "text": "The onUpdate() handler\nSee JsViews lifecycle.\nThe onUpdate() handler is called whenever the tag instance is updated as a result of an observable data change. This will be the case if the tag control has arguments {^{mytag arg1 .../}}, data-bound properties {^{mytag ^prop1=... .../}}, or declared bound properties or depends paths for which the data changes observably…\nIt is called with the tag instance as this parameter, and with arguments ev and eventArgs corresponding to the observable data change (see onPropertyChange and onArrayChange) and newTagCtxs – which are the new updated tagCtx objects.\nmytag: {\n  onUpdate: function(ev, eventArgs, newTagCtxs) { ... },\n  ...\n}\n\nReturning false from onUpdate(), or setting onUpdate to false:\nOften a custom tag control does not need to completely re-render itself when responding to observable changes in arguments, bound properties or dependencies. In that case, performance can be optimized (see lifecycle) by returning false from the handler. (The effect will be skip the subsequent onBind(), render() and onUnbind() calls.)\nSetting the option to false – onUpdate: false – is equivalent to using the handler function() { return false; }.\nSee the Data-linked tag controls design patterns topic for a usage example.\n"
      },
      {
        "_type": "para",
        "title": "The onDispose() handler",
        "text": "The onDispose() handler\nSee JsViews lifecycle.\nThe onDispose() handler is called when the tag instance is disposed. This happens whenever the containing HTML/View of the tag control is removed. (The call to onDispose() is preceded by a call to onUnbind()).\nThe onDispose() handler call has no arguments, and has the tag instance as this parameter.\nmytag: {\n  onDispose: function() { ... },\n  ...\n}\n\n"
      },
      {
        "_type": "para",
        "title": "The convert option",
        "text": "The convert option\nOn any tag, including custom tags, a converter can be specified directly on the tag (see Using converters with other tags):\n{{mytag name convert='toUpperCase'/}}\n\nTo provide a default converter on a custom tag (used as fallback if no converter is specified on the tag), set the convert tag option to a function, or to a registered converter name:\nmytag: {\n  ...\n  convert: 'toLowerCase', // Default converter. (A function or a registered converter name)\n  ...\n}\n\nSee also:\n\nJsRender convert\nThe bindTo option\n\n"
      },
      {
        "_type": "para",
        "title": "The convertBack option",
        "text": "The convertBack option\nOn any tag providing two-way data binding, including custom tags, a ‘convertBack’ converter can be specified directly on the tag (see Using converters with other tags):\n{^{mytag name convert=... convertBack=... /}}\n\nTo provide a default ‘convertBack’ converter on a custom tag (used as fallback if no ‘convertBack’ is specified on the tag), set the convertBack tag option to a function, or to a registered converter name:\nmytag: {\n  ...\n  convertBack: ..., // Default 'convertBack' converter. (A function or a registered converter name)\n  ...\n}\n\n(See also the bindTo option.)\n"
      },
      {
        "_type": "para",
        "title": "The onUnbind() handler",
        "text": "The onUnbind() handler\nSee JsViews lifecycle.\nThe onUnbind() handler is called during during disposal of the tag instance. This happens whenever the containing HTML/View of the tag control is removed. The call to onUnbind() is followed by a call to onDispose().\nThe onUnbind() handler is also called during data-linking whenever the tag has been re-rendered. (This will be the case in response to tag.refresh() calls, and during observable updates if onUpdate() does not return false.) In these scenarios it is followed by a call to onBind(), for the refreshed tag instance.\nThe onUnbind() call has the tag instance as this parameter, and has the arguments tagCtx, linkCtx and ctx. In addition, for observable updates it receives the arguments ev and eventArgs (see onPropertyChange and onArrayChange).\nmytag: {\n  onUnbind: function(tagCtx, linkCtx, ctx, ev, eventArgs) { ... },\n  ...\n}\n\n"
      },
      {
        "_type": "para",
        "title": "The onBeforeUpdateVal() handler",
        "text": "The onBeforeUpdateVal() handler\nSee JsViews lifecycle.\nThe onBeforeUpdateVal() handler is called when the tag triggers an observable change on the data, through two-way binding (bindTo).\nThe call has the tag instance as this parameter, and the arguments ev and eventArgs (corresponding to the observable data change being triggered). It is cancellable: returning false will prevent the observable data change from happening.\nmytag: {\n  onBeforeUpdateVal: function(ev, eventArgs) { \n    // Optionally return false\n  },\n  ...\n}\n\nSee usage examples in the {{validate}} sample tag control and in the sample here.\n"
      },
      {
        "_type": "para",
        "title": "The onBeforeChange() handler",
        "text": "The onBeforeChange() handler\nSee JsViews lifecycle.\nThe onBeforeChange() handler is called when the tag is about to be updated by an observable data change.\nThe call has the tag instance as this parameter, and the arguments ev and eventArgs (corresponding to the observable data change). It is cancellable: returning false will prevent the tag from being updated.\nmytag: {\n  onBeforeChange: function(ev, eventArgs) { \n    // Optionally return false\n  },\n  ...\n}\n\nSee the sample here for a usage example.\n"
      },
      {
        "_type": "para",
        "title": "The onAfterChange() handler",
        "text": "The onAfterChange() handler\nSee JsViews lifecycle.\nThe onAfterChange() handler is called after tag has been updated by an observable data change.\nThe call has the tag instance as this parameter, and the arguments ev and eventArgs (corresponding to the observable data change).\nmytag: {\n  onAfterChange: function(ev, eventArgs) { ... },\n  ...\n}\n\n"
      },
      {
        "_type": "para",
        "title": "The setValue() method",
        "text": "The setValue() method\nSee JsViews lifecycle.\nThe setValue() method is called during tag rendering, and during each observable tag update.\n\nIt is called once for each bound argument or property – as specified by bindTo (or bindFrom, if provided) – and receives the value of that argument or property.\nIf neither bindFrom nor bindTo are specified,  setValue() is called once with the value of the first argument (or the current data if the tag has no arguments) – as if bindFrom was set to [0].\nFor block tags with multiple {{else}} blocks, it is called also for each bound argument or property on the additional {{else}} blocks. The index of the {{else}} block is provided as third parameter.\nIf there is a converter, then the values are after conversion. In the case where bindFrom/bindTo is an array, but the converter returns a single value rather than an array, then setValue() is called once only, with that value.\nIf the tag has linked elements specified, then JsViews built-in code for data-linking (or setting the values) on those linked elements runs after the call to the setValue() method. If a setValue() method is provided, it can be used to  programmatically bind the linked elements (on the initial call) or update their values (on tag update calls) – and the default code will not run. However if setValue() provides a return value then the default code will also run, using the returned value.\nIf the call to setValue() is coming from an observable tag update, then the ev and eventArgs objects for the observable change are passed to the setValue() handler as fourth and fifth parameters.\n\nmytag: {\n  setValue: function(value, index, elseBlock, ev, eventArgs) {\n    ... // Optionally return modified value\n  },\n  ...\n}\n\nSee the Programmatic two-way data-binding design patterns topic for discussion and examples.\n"
      },
      {
        "_type": "para",
        "title": "The domChange() handler",
        "text": "The domChange() handler\nThis feature is available for some advanced scenarios. The {^{for}} and {^{if}} tags each raise a \"jsv-domchange\" event whenever they dynamically modify the HTML DOM (for example when a {^{for somearray}} tag responds to an array change event, and inserts or removes HTML for added or removed array items). A custom tag could also raise a \"jsv-domchange\" event to notify when it makes changes to the DOM.\nTo listen to the DOM change events that are notified in this way, a handler for the \"jsv-domchange\" event should be attached to the HTML container element that is immediate parent of the {^{for}}, {^{if}} or custom tag:\n"
      },
      {
        "_type": "sample",
        "text": "\n  {^{on ~insertItem /}} {^{on ~removeItem /}}\n  <input data-link=\"name\" />\n  <div data-link='{on \"jsv-domchange\" ~domchange name}'>\n    ...\n    {^{for items}} {{:}} {{/for}}\n    ...\n  </div>\n\n\n\n\n\nChanges: \nvar myTmpl = $.templates(\"#myTmpl\"),\n  res = \"\",\n  cnt = 0,\n  data = {\n    name: \"Jo\",\n    items: [\"a\", \"b\"]\n  };\n\nmyTmpl.link(\"#page\", data, {\n  insertItem: function() {\n    $.observable(data.items).insert(\"y\" + cnt);\n  },\n  removeItem: function() {\n    $.observable(data.items).remove();\n  },\n  domchange: function(param1, ev, domchangeEventArgs, tagCtx, linkCtx, observableEventArgs) {\n    res += \"Params: \" + param1 + \", \" + observableEventArgs.change + \"\";\n    $(\"#changes\").html(res);\n  }\n});\n<div data-link='{on \"jsv-domchange\" ~domchange name}'>\n  ...\n  {^{for items}}...{{/for}}\n  ...\n</div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "The baseTag option",
        "text": "The baseTag option\nSee JsRender baseTag.\n"
      },
      {
        "_type": "para",
        "title": "The flow option",
        "text": "The flow option\nSee JsRender flow.\n"
      },
      {
        "_type": "para",
        "title": "The dataBoundOnly option",
        "text": "The dataBoundOnly option\nIf a custom tag control is intended only for use with data-linking: {^{mytag ... /}}, then the dataBoundOnly option can be set to true. Attempting to use the tag without data-linking (as in {{mytag ... /}}) will then produce an error message.\nmytag: {\n  dataBoundOnly: true,\n  ...\n}\n\n"
      },
      {
        "_type": "para",
        "title": "The template option",
        "text": "The template option\nThe template option is used for declarative rendering of the tag control, as an alternative to providing a render() method.\nmytag: {\n  template: tagTemplate, // A template string, selector, or compiled template object\n  ...\n}\n\nIf the tag control is called with an argument: {^{mytag someArgument ...}} then the template will be rendered using the value of that argument as data context.\nOtherwise, the data context will be the same as the outer data context (unless otherwise specified using the  contentCtx) option).\nSee also:\n\nJsRender template\nWrapping block content\n\n"
      },
      {
        "_type": "para",
        "title": "The boundProps option",
        "text": "The boundProps option\nBy default, if a data-linked tag has arguments and named properties: {^{sometag arg1 namedProp1=xxx}} then the arguments are data-linked, but the named properties are not. (So changes to arg1 will trigger updates but changes to xxx will not.)\nThe syntax {^{sometag arg1 ^namedProp1=xxx}} is used to opt in to data-linking for a named property. (See binding to tag properties.)\nFor a custom tag, the boundProps option allows you to specify bound properties:\nmytag: {\n  boundProps: [\"prop1\", ...], // Array of names of bound properties\n  ...\n}\n\nThose named properties will then be data-linked without needing to use the ^prop1=... syntax.\nSee also the Data-linked tag controls design patterns topic.\n"
      },
      {
        "_type": "para",
        "title": "The depends option",
        "text": "The depends option\nA custom tag control can include a depends option:\nmytag: {\n  depends: [\"~reverse\", \"person.first\", ...],\n  ...\n}\n\nas in the following sample:\n"
      },
      {
        "_type": "sample",
        "text": "\n  <input data-link=\"person.first\" /> <input data-link=\"person.last\" />\n  <label>Reverse <input type=\"checkbox\" data-link=\"~reverse\" /></label><br/>\n\n  {^{mytag person class=\"tb1\"/}}\n\n\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    person: {first: \"Jo\", last: \"Blow\"}\n  },\n  helpers = {reverse: true};\n\n$.views.tags(\"mytag\", {\n  render: function(person) {\n    var reverse = this.ctxPrm(\"reverse\");\n    return \"\"\n      + (reverse ? person.last + \" \" + person.first : person.first + \" \" + person.last)\n    + \"\";\n  },\n  depends: [\"~reverse\", \"person.first\", \"person.last\"],\n  mainElement: \"div\"\n});\n  \nmyTmpl.link(\"#page\", data, helpers);\n\n$.views.tags(\"mytag\", {\n  render: function(person) {\n    ...\n    return reverse ? person.last + \" \" + person.first : ... ;\n  },\n  depends: [\"~reverse\", \"person.first\", \"person.last\"],\n  ...\n});\n\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The depends option specifies dependencies for refreshing the tag rendering. If there is an observable data change on one of the specified data paths, then the tag rendering will be refreshed.\nSee Declaring dependencies for a computed observable for details on specifying depends paths, including making depends a function, as in the following more advanced examples (that could have been used in the above sample):\ndepends: function(data, callback) {\n  $.observe(this.tagCtx.args[0], \"first\", \"last\", callback);\n  this.ctxPrm(\"reverse\", undefined, callback);\n}\n\ndepends: function(data, callback) {\n  return [\"~reverse\", this.tagCtx.args[0], \"first\", \"last\"];\n}\n\ndepends: function(data, callback) {\n  return [\"~reverse\", data.person, \"first\", \"last\"];\n}\n\n"
      },
      {
        "_type": "para",
        "title": "The bindTo option",
        "text": "The bindTo option\nThe bindTo option is generally used in conjunction with linkedElement, linkedCtxParam, setValue() or updateValue(), in order to provide two-way data-binding for a tag control. It specifies one or more tag arguments or properties which will have two-way data-linking.\nThe bindTo option is set to an array, such as [0, 1, 2], or [\"title\", 1] – where integers refer to arguments and strings to named properties. So setting bindTo: [\"title\", 1] means that the title property and the second argument can have two-way data-binding. (However, see bindFrom below for specifying not only two-way, bindings but also one-way from and one-way to bindings.)\nSetting to a single value (such as “title” or 0) is also allowed, and is equivalent to setting an array of length  1 (such as [\"title\"] or [0]).\nIf bindTo is not set then two-way binding (through linkedElement, linkedCtxParam etc.) defaults to binding the first argument (as if bindTo was set to bindTo: 0).\nSetting the bindTo option changes how converters work:\n\nconvert:\n\narguments: By default the arguments passed to the convert converter will be the values of all the arguments passed in the tag markup. But if bindTo is set then the arguments passed to convert are instead the values of the set of arguments/properties specified in bindTo.\nreturn values: By default the value returned by the converter will be passed as first argument to the render() method, and be the current data for the template. However, if bindTo is an array, and the converter returns an array of the same length, then the returned values will be used as converted values for each of the arguments or properties specified in bindTo (see also cvtArgs() and bndArgs()).\n(If both bindTo and bindFrom are specified, then it will be bindFrom which determines converter arguments and the effect of returning an array.)\n(Note: In the rare case where the value ret to be returned by the converter as first argument is actually an array, then you can set ret.arg0 = true. This will ensure that it targets just the first argument, even if the array length happens to be the same as the bindTo/bindFrom array. Conversely setting ret.arg0 = false will ensure that the values in the array will target multiple target arguments, even if the array length is not the full length of the bindTo/bindFrom array).\n\nconvertBack:\n\narguments: If bindTo is an array then the convertBack signature should have a parameter for each bindTo path. When the tag control is updating a bindTo target, then convertBack(val1, val2, val3 ...) will be called, with  each argument undefined except for the argument that is updating.\nreturn values: The value returned by convertBack will update the target data. However, if bindTo is an array, then the first target specified in bindTo will be updated, unless convertBack returns an array of the same length, in which case the returned values will be used as updated values for each of the target arguments or properties specified in bindTo.\n(Note: As in the case of convert, above, if the the return value ret is an array, you can set ret.arg0 to  true/false, to ensure your intended behavior).\n\n\nSee also:\n\nJsRender bindTo\nbindFrom\n\n"
      },
      {
        "_type": "para",
        "title": "The bindFrom option: Using bindFrom and bindTo to specify one-way bindings in either direction",
        "text": "The bindFrom option: Using bindFrom and bindTo to specify one-way bindings in either direction\nThe bindFrom option is used in conjunction with the bindTo option, in some advanced scenarios.\nUsing bindTo alone specifies one or more two-way bindings. (A two-way binding is in fact made up of two separate one-way bindings, one in each direction: a bind to binding, in which the tag control triggers a change to the data, and a bind from binding, in which an observable change in the data triggers a change in the tag control.\nUsing both bindTo and bindFrom allows separately specifying the bind to bindings and the bind from bindings.\nbindTo: [0, \"title\"], \nbindFrom: [\"title\", 1, \"type\"],\n...\n\nWith the above settings the title property is a two-way binding, the first argument is one-way bind to, and the second argument and type property are one-way bind from.\n(In fact, setting just the bindTo option, with no bindFrom option, is equivalent to setting both bindTo and bindFrom to the same target arguments/properties, and makes them all two-way bindings.)\nNote that when the bindTo and bindFrom options specify different paths, then the linkedElement option will correspond to the bindTo paths, and will specify 'one-way to' bindings, and the linkedCtxParam option will correspond to the bindFrom paths, and will specify 'one-way from' bindings,\nHere is a sample based on the linkTo sample, in which we define a {^{toFrom current modified}} custom tag, which behaves similarly to <input data-link=\"current linkTo=modified\" />:\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n<b>Current settings:</b>\n<span class=\"title\" data-link=\"current.title\"></span><br/>\n\n<form data-link=\"{on 'submit' apply}\">\n  <em>Modify settings:</em><br/><br/>\n  Name:\n  {^{fromTo current.title modified.title/}}\n  <hr />\n  Modified settings:\n  <span class=\"title\" data-link=\"modified.title\"></span><br/>\n  <button type=\"submit\">Apply</button>\n  <button data-link=\"{on cancel}\">Cancel</button><br/>\n</form>\n\n$.views.tags(\"fromTo\", {\n  databoundOnly: true,\n  onUpdate: false,\n  bindTo: [1],    // bind to second argument\n  bindFrom: [0],  // bind from first argument\n  linkedElement: \"input\", // input binds to second argument\n  linkedCtxParam: \"fm\",   // input binds from first argument\n  template: \"\"\n});\n\nvar settings = {\n  current: {title: \"My title\"},\n  modified: {title: \"My title\"},\n  apply: function() {\n    $.observable(this.current).setProperty(this.modified);\n    return false;\n  },\n  cancel: function() {\n    $.observable(this.modified).setProperty(this.current);\n    $.observable(this.current).setProperty({title: \"\"});\n  }\n}\n\nvar myTmpl = $.templates(\"#myTmpl\");\n\nmyTmpl.link(\"#result\", settings);\n$.views.tags(\"fromTo\", {\n  ...\n  bindTo: [1],    // bind to second argument (the current.title data)\n  bindFrom: [0],  // bind from first argument (the modified.title data)\n  linkedElement: \"input\", // Input binds to second argument\n  linkedCtxParam: \"fm\",   // input binds from first\n  template: \"<input data-link='~fm'/>\"\n});\n\n{^{fromTo current.title modified.title/}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the above sample, the same <input/> is used both as linkedElement, to bind to the modified.title data path, and as linkedCtxParam, to bind from the current.title data path.\nSee also this color picker sample for advanced use of the bindFrom option.\n"
      },
      {
        "_type": "para",
        "title": "The setSize option",
        "text": "The setSize option\nIf the setSize option of a tag control is true then width and height values can be set declaratively:\n{{mytag ... width=\"30em\" height=33 .../}}\n\nIn addition, default width and height can be set as options:\nmytag: {\n  setSize: true, // Enable setting width and height props on tag\n  ...\n  width: \"60px\" // Default width if not specified as prop on tag\n  height: maxHeight // Default height if not specified as prop on tag\n  ...\n}\n\nThe values can be:\n\nstring literals (such as width=\"100px\" or height=\"30em\")\nnumbers (such as width=100) - which are treated as pixel widths. (So 100 is equivalent to \"100px\")\nexpressions returning strings or numbers (such as width=app.gridWidth-50)\n\nThe width and height settings are applied to the ‘main element’ of the tag instance. See mainElement below.\nSee also the Setting size design patterns topic.\n"
      },
      {
        "_type": "para",
        "title": "The height option",
        "text": "The height option\nThe height option is used as default height for the main element of the tag control, provided the setSize option is true.\nSee also the setSize, width and mainElement options.\n"
      },
      {
        "_type": "para",
        "title": "The width option",
        "text": "The width option\nThe width option is used as default width for the main element of the tag control, provided the setSize option is true.\nSee also the setSize, height and mainElement options.\n"
      },
      {
        "_type": "para",
        "title": "The className option",
        "text": "The className option\nThe className option is used as default class name for the display element of the tag control.\nIt can be overridden by setting the class property on the tag:\n{{mytag class=.../}}\n\nSee also the displayElement option.\n"
      },
      {
        "_type": "para",
        "title": "The linkedElement option",
        "text": "The linkedElement option\nOften a tag control incorporates one or more textboxes, checkboxes, or other form elements. The  linkedElement option together with the bindTo option make it easy to provide two-way data binding between such an element (or elements) and a tag argument or property.\nThe following sample shows a {{namebox}} tag control with two textboxes (for first and last names) – data-linked to the first and second tag arguments:\n"
      },
      {
        "_type": "sample",
        "text": "\n  {^{namebox first last  class=\"tb1\"/}}\n\n  <input data-link=\"first\"/> <input data-link=\"last\"/>\n\n\n\n$.views.tags({\nnamebox: {\n  dataBoundOnly: true,\n  template: 'Full name:  ',\n  bindTo: [0, 1],\n  linkedElement: [\".first\", \".last\"],\n  displayElement: \"label\",\n  onUpdate: false\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\"\n  };\n\nmyTmpl.link(\"#page\", data);\n{^{namebox first last .../}}\n\nnamebox: {\n  template: '...  <input class=\"first\"/> <input class=\"last\"/> ...',\n  bindTo: [0, 1],\n  linkedElement: [\".first\", \".last\"],\n  ...\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The linkedElement option is a jQuery selector for declaratively setting tag.linkedElem.\nDeclare the linkedElement option:\nmytag: {\n  linkedElement: \"input\", // jQuery selector\n  ...\n}\n\nIf bindTo is set to bind multiple arguments or properties (such as bindTo: [0, 1] in the sample above) then linkedElement must be an array of selectors, of the same length ([\".first\", \".last\"] in the sample). (To specify linked elements for some but not all of the bindTo bindings, set undefined for the other members of the linkedElement array.)\nThe tag.linkedElem (jQuery object) will then contain an HTML element (or elements, if bindTo is for multiple bindings) – which will be automatically data-linked by JsViews to the specified tag argument or property.\n(The linked elements can be within the tag content rendered by the tag, as well as within block content wrapped by the tag.)\nIf the HTML element is a form element such as <input> or <selector>, or a contenteditable element, then the data-link binding will be two-way.\nSelectors are applied to the HTML elements rendered by the tag. (In the case of a tag control using a data-linked element with tag binding, such as <div data-link=\"{mytag ...}\">, the set of HTML elements includes the data-linked element itself.)\nThe first element returned by a selector is added to tag.linkedElem (jQuery object). This element will be data-linked to the corresponding argument/property in bindTo.\nThe tag.linkedElem element(s) can also be set programmatically, in onBind for example:\nmytag: {\n  onBind: function() {\n    this.linkedElem = this.contents(true, \"input\"); // Set linkedElem programmatically\n  },\n  ...\n}\n\nIf bindTo is not set, then linkedElement will behave as if bindTo was set to [0], and will provide two-way binding to the first argument.\nFor further discussion and examples, see the linkedElement design pattern topic.\nSee also the bindTo and linkedCtxParam options.\n"
      },
      {
        "_type": "para",
        "title": "The linkedCtxParam option",
        "text": "The linkedCtxParam option\nThe linkedCtxParam option is used together with the bindTo option (or the bindFrom option, if one is specified), to optionally declare a contextual parameter for each bound argument/property specified in bindFrom/bindTo. The contextual parameters can be accessed within the tag content rendered by the tag, as well as within block content wrapped by the tag.\nThe following sample shows a {{mytag}} tag control with a data-linked mode property. The tag uses linkedCtxParam to bind a ~mde contextual parameter to the mode property.\n"
      },
      {
        "_type": "sample",
        "text": "\n  {^{mytag mode=tagmode class=\"tb1\"/}}<br/>\n  <label>tagmode: <input data-link=\"tagmode\"/></label>\n\n\n\n$.views.tags({\nmytag: {\n  dataBoundOnly: true,\n  template: '~mde:  ' +\n    'Set normal' +\n    '',\n  bindTo: [\"mode\"],\n  linkedCtxParam: [\"mde\"],\n  displayElement: \"div\",\n  onUpdate: false,\n  setNormalMode: function() { // Button action\n    this.ctxPrm(\"mde\", \"normal\"); // Modify the mode property\n  },\n  onBind: function() {\n    this.msgBox = this.contents(true, \".msg\");\n    // Attach listener to change in mode property\n    $.observe(this, \"~mde\", this.onModeChange);\n  },\n  onUnbind: function() {\n    $.unobserve(this, \"~mde\", this.onModeChange); // Detach listener\n  },\n  onModeChange: function(ev, eventArgs) { // Listener\n    this.msgBox.append($.views.converters.encode(eventArgs.value )+ \"\");\n    // (Note that we encode < > and & as HTML entities, for display)\n\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {tagmode: \"start\"};\n\nmyTmpl.link(\"#page\", data);\n\n{^{mytag mode=tagmode .../}}\n\nmytag: {\n  ...\n  template: '...<input data-link=\"~mde\"/>...',\n  bindTo: [\"mode\"],\n  linkedCtxParam: [\"mde\"],\n  ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "If bindTo (or bindFrom) is set to an array, binding multiple arguments or properties (such as bindTo: [0, 1, \"mode\"]), then linkedCtxParam must be an array of strings of the same length (such as linkedCtxParam: [\"first\", \"last\", \"mde\"] - specifying the names of the corresponding contextual parameters. (To specify linked contextual parameters for some but not all of the bindTo bindings, set undefined for the other members of the linkedCtxParam array.)\nIf bindTo is not set, then linkedCtxParam will behave as if bindTo was set to [0], and will provide two-way binding to the first argument.\nThe linked contextual parameters can be used declaratively within templates (such as the tag template, or within a tag block). They can also be accessed programmatically, for getting or setting values, or for attaching handlers (to listen to observable changes). The following examples come from the sample above:\n<input data-link=\"~mde\"/>...\n<button data-link=\"{on ~tag.setNormalMode}\">...\n\nsetNormalMode: function() { // Button action\n  this.ctxPrm(\"mde\", \"normal\"); // Modify the mode property\n},\nonBind: function() {\n  // Attach listener to change in mode property\n  $.observe(this, \"~mde\", this.onModeChange);\n},\nonUnbind: function() {\n  $.unobserve(this, \"~mde\", this.onModeChange); // Detach listener\n},\nonModeChange: function(ev, eventArgs) { // Listener\n  this.msgBox.append(eventArgs.value + \"<br/>\");\n}\n\nThe declared linked contextual parameters thus provide an easy way for a tag control to respond to changes in the bound arguments or properties, to observably modify their values, or to register handlers to ‘listen’ to observable changes.\nFor further discussion and examples, see the linkedCtxParam design pattern topic.\nSee also the bindTo, bindFrom and linkedElement options.\nNote: if the bindFrom and bindTo options are both set, then linkedCtxParam will correspond to the bindFrom arguments/properties\n"
      },
      {
        "_type": "para",
        "title": "The mainElement option",
        "text": "The mainElement option\nThe mainElement option is a jQuery selector for declaratively setting tag.mainElem.\nThe tag.mainElem (jQuery object) contains the HTML element in the tag control to be used for setting width or height (if setSize is true) or id. (See setSize, width and height.)\nDeclare the mainElement option:\nmytag: {\n  mainElement: \".foo\", // jQuery selector\n  ...\n}\n\nThe selector is applied to the HTML elements rendered by the tag. (In the case of a tag control using a data-linked element with tag binding, such as <div data-link=\"{mytag ...}\">, the set of HTML elements includes the data-linked element itself.)\nThe first element returned by the selector is assigned to tag.mainElem (wrapped in a jQuery object). This element will be used for setting width, height or id. If no element is returned, tag.mainElem will be an empty jQuery object.\nThe tag.mainElem can also be set programmatically, in onBind for example:\nmytag: {\n  onBind: function() {\n    this.mainElem = this.contents(true, \".foo\"); // Set mainElem programmatically\n  },\n  ...\n}\n\nNote: if tag.mainElem has not been set but tag.linkedElem is defined, then tag.linkedElem[0] is instead used for setting width, height or id\nUsage:\n{^{mytag width=22 id='foo' /}}\n\nSee also the setSize, width, height displayElement and linkedElement options.\n"
      },
      {
        "_type": "para",
        "title": "The displayElement option",
        "text": "The displayElement option\nThe displayElement option is a jQuery selector for declaratively setting tag.displayElem.\nThe tag.displayElem (jQuery object) contains the HTML element in the tag control to be used for setting class, either declaratively:\n{{mytag ... class=.../}}\n\nor, as default class, via the className option:\nmytag: {\n  className: ...\n  ...\n}\n\nThe selector is applied to the HTML elements rendered by the tag. (In the case of a tag control using a data-linked element with tag binding, such as <div data-link=\"{mytag ...}\">, the set of HTML elements includes the data-linked element itself.)\nThe first element returned by the selector is assigned to tag.displayElem (wrapped in a jQuery object). This element will be used for setting class. If no element is returned, tag.displayElem will be an empty jQuery object.\nThe tag.displayElem can also be set programmatically, in onBind for example:\nmytag: {\n  onBind: function() {\n    this.displayElem = this.contents(true, \".foo\"); // Set displayElem programmatically\n  },\n  ...\n}\n\nNote: if tag.displayElem has not been set but tag.mainElem or tag.linkedElem are defined, then tag.mainElem (if defined), or else tag.linkedElem[0] is instead used for setting class\nUsage:\n{^{mytag class='mytagclass' /}}\n\nSee also the className, mainElement, and linkedElement options.\n"
      },
      {
        "_type": "para",
        "title": "<b>Additional advanced or less commonly used options:</b>",
        "text": "Additional advanced or less commonly used options:\n"
      },
      {
        "_type": "para",
        "title": "The onArrayChange option",
        "text": "The onArrayChange option\nThe onArrayChange option can be set to false in order to prevent a tag from binding to array change events.\nNote that by default any tag which depends on an array (or on expressions involving arrays) will bind to array changes.\nThis is the case both for custom tags and for built-in tags:\n{^{mytag things /}}                    {{!-- Depends on things array --}}\n{^{mytag ~helper(items)+things[0] /}}  {{!-- Depends on items and things arrays --}}\n{^{if items[0]===items[1]}}...{{/if}}  {{!-- Depends on items array --}}\n{^{:~things[0]+things[1]}}             {{!-- Depends on things array --}}\n\nIn each case, the onArrayChange=false option can be set in order to prevent the tag from updating in response to array changes. (It will still respond property change events such as replacing the things property with another array.)\n{^{mytag things onArrayChange=false /}}\n{^{if items[0]===items[1] onArrayChange=false}}...{{/if}}\n{^{:~things[0]+things[1] onArrayChange=false}}\n\nFor custom tags, onArrayChange: false can be declared as default behavior for the tag:\n$.views.tags(\"mytag\", {\n  onArrayChange: false,\n  ...\n});\n\nThis default setting can still be overridden by setting it directly on the tag: {^{mytag ... onArrayChange=true ...}}.\nProviding a custom onArrayChange() handler\nIn some cases a custom tag may require more specific or optimized handling of array change events, rather the than default behavior of refreshing/updating the tag for each change. This can achieved by providing an onArrayChange() handler as a tag option, and using the onBind() event to register it to observe array changes. To avoid possible memory leaks, it is good practice to also use onDispose() or onUnbind() to call unobserve(), and remove the array change handler registration.\nThe following sample illustrates the use of this approach:\n"
      },
      {
        "_type": "sample",
        "text": "\n<div class=\"left\">\n  {^{on ~replaceItems /}} {^{on ~refreshItems /}}\n  {^{on ~insertItem /}} {^{on ~moveItem /}}<br/>\n\n  <label>Hide: <input type=\"checkbox\" data-link=\"hideTag\"/></label>\n\n  {^{if !hideTag}}\n    {^{mytag items/}}\n  {{/if}}\n</div>\n\n<div class=\"right\">\n  <em><b>Items:</b></em><br/>{^{jsonview items/}}\n</div>\n\n\n\nArray change: -\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  cnt = 0,\n  data = {\n    items: [\"a\", \"b\"],\n    hideTag: false\n  };\n\n$.views.tags(\"mytag\", {\n  template: \"First: {{:#data[0]}}Last: {{:#data[length-1]}}\",\n  onArrayChange: function(ev, eventArgs) {\n    if (!eventArgs.refresh) { // (Skip the initial 'move' events on an array refresh)\n      $(\"#console\").text(eventArgs.change); // console.log() or similar\n      this.refresh(); // For each array change event, refresh the tag to render updated array\n    }\n  },\n  onBind: function(tagCtx) {\n    var tag = this,\n      data = tagCtx.args[0];\n    if (tag._boundArray !== data) { // Different data\n      if (tag._boundArray) { // Previous data had handler, so remove it\n        $.unobserve(tag._boundArray, tag._arCh);\n      }\n\n      if ($.isArray(data)) {  // New data is an array\n        // Store array data as tag._boundArray\n        tag._boundArray = data;\n\n        // Store arrayChange handler as tag._arCh\n        tag._arCh = function(ev, eventArgs) {\n          // arrayChange handler calls tag.onArrayChange()\n          tag.onArrayChange(ev, eventArgs);\n        };\n        // Attach array handler to new data\n        $.observe(data, tag._arCh);\n      }\n    }\n  },\n  onDispose: function() {\n    var tag = this;\n    if (tag._boundArray) {\n      // Unregister array handler from bound array\n      $.unobserve(tag._boundArray, tag._arCh);\n    }\n  }\n});\n  \nmyTmpl.link(\"#page\", data, {\n  replaceItems: function() {\n    $(\"#console\").text(\"-\");\n    $.observable(data).setProperty(\"items\", [\"A\"+cnt++, \"B\"+cnt, \"C\"+cnt, \"D\"+cnt]);\n  },\n  refreshItems: function() {\n    $.observable(data.items).refresh([\"a\"+cnt++, \"b\"+cnt, \"x\"+cnt]);\n  },\n  insertItem: function() {\n    $.observable(data.items).insert(\"y\"+cnt++);\n  },\n  moveItem: function() {\n    $.observable(data.items).move(0, data.items.length-1);\n  }\n});\n{^{mytag items/}}\n\n$.views.tags(\"mytag\", {\n  ...\n  onArrayChange: function() { ... },\n  onBind: function() {\n    ...\n    // Register array handler which calls tag.onArrayChange()\n    $.observe(... function(...) { tag.onArrayChange(...); });\n  ...\n  onDispose: function() {\n    ...\n    $.unobserve(...); // Unregister array handler from bound array\n\n\n"
      },
      {
        "_type": "para",
        "title": "The trigger option",
        "text": "The trigger option\nThe trigger option can be used to set a default trigger behavior for two-way linked element` bindings within the tag.\nmytag: {\n  trigger: false, // Linked element text boxes within {{mytag}} will trigger on blur, not on keydown\n  ...\n}\n\nAn individual {{mytag}} instance can override the trigger option setting by writing {^{mytag trigger=... .../}}.\nSee the trigger setting and two-way binding topics.\n"
      },
      {
        "_type": "para",
        "title": "The attr option",
        "text": "The attr option\nWhen data-linking using a Tag binding with the full linked element syntax, you can specify a target attribute such as the title attribute:\n<div data-link=\"title{mytag ...}\">...\n\nIn the example above mytag will render to the title attribute of the div element.\nIf no target attribute is specified:\n<div data-link=\"{mytag ...}\">...\n\nthen mytag will render to the default target attribute.\nThe attr option can be used to specify a default target attribute for mytag:\nmytag: {\n  attr: \"text\", // Default target attribute\n  ...\n}\n\nIf mytag has no attr option specified, then the default target attribute will instead be the default target for that element, such as \"html\" for a div or \"value\" for an input.\nPossible values for the attr option include any of the targets such as \"text\", \"html\", \"class\", \"visible\" etc (see Targets for data-linking). Alternatively the attr option can be set to attr: \"none\" in the case of tag bindings which do not render output at all, but add other behavior in other ways (such as data-link=\"{on ...}\" which adds event bindings).\n"
      },
      {
        "_type": "para",
        "title": "The ctx option",
        "text": "The ctx option\nSee JsRender ctx.\n"
      },
      {
        "_type": "para",
        "title": "The contentCtx option",
        "text": "The contentCtx option\nSee JsRender contentCtx.\n"
      },
      {
        "_type": "para",
        "title": "The argDefault option",
        "text": "The argDefault option\nSee JsRender argDefault.\n"
      },
      {
        "_type": "para",
        "title": "The dataMap option",
        "text": "The dataMap option\nThis option is used in some advanced scenarios, and internally for implementation of the {{props}} and {{for}} tags.\n"
      },
      {
        "_type": "para",
        "title": "The mapProps and mapDepends options",
        "text": "The mapProps and mapDepends options\nThese options are used in some advanced scenarios in association with the dataMap option, for example when using sorting or filtering.\n\nThe mapProps option is similar to the boundProps option, and specifies tag arguments or named properties for which an observable change should trigger refreshing of the dataMap (for refreshing the sorting or filtering, for example). See the {{purchases}} sample for a usage example.\nThe mapDepends option is similar to the depends option, and indicates dependency paths for which observable changes should trigger a refresh of the dataMap.\n\n"
      },
      {
        "_type": "para",
        "title": "The lateRender option",
        "text": "The lateRender option\nThis option is available for some advanced scenarios. See unit tests for some examples of use.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "tagstructure": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The options object used to register a tag control is in effect a prototype for constructing the instances of the tag control.\nThe specified options will fall into the following categories:\n\nJsViews tag settings\nJsViews handlers and methods\ntag properties/state\ntag methods\n\nA tag declaration might typically be structured in sections corresponding to the above categories, as in this example:\n$.views.tags(\"tabs\", {\n  // JsViews tag settings\n  ...\n  displayElement: \".tabsview\",\n  bindTo: \"pane\",\n  width: 250,\n  template: '...',\n\n  // JsViews handlers and methods\n  init: function(tagCtx) { ... },\n  onUpdate: function(ev, event, newTagCtxs) { ... },\n\n  // tag properties/state\n  pane: 0, // selected pane (defaults to 0)\n\n  // tag methods\n  getPane: function(tagCtxs) { ... },\n  setTab: function(index) { ... }\n});\n\n(from the {{tabs}} sample)\nThe sections are:\nJsViews tag settings\nAny of the following:\n\nbaseTag\nflow\ndataBoundOnly\ntemplate\nboundProps\ndepends\nbindTo\nbindFrom\nsetSize\nheight\nwidth\nclassName\nlinkedElement\nlinkedCtxParam\nmainElement\ndisplayElement\ntrigger\nattr\nctx\ncontentCtx\nargDefault\ndataMap\nlateRender\n\nJsViews handlers and methods\nAny of the following:\n\ninit()\nrender()\nonBind()\nonAfterLink()\nonUpdate()\nonDispose()\nconvert\nconvertBack\nonUnbind()\nonBeforeUpdateVal()\nonBeforeChange()\nonAfterChange()\nonArrayChange()\nsetValue()\ndomChange()\n\ntag properties/state\nInitialization of tag-specific ‘user’ properties (such as those used for instance state)\ntag methods\nTag-specific ‘user’ methods (such as methods called in response to click events on the tag control)\n"
      }
    ]
  },
  "taglifecycle": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The tag options can include event handlers for the following lifecycle events:\n\ninit()\nrender()\nonBind()\nonUnbind()\nonAfterLink()\nonUpdate()\nonDispose()\nonBeforeUpdateVal()\nonBeforeChange()\nonAfterChange()\nsetValue()\n\n"
      },
      {
        "_type": "para",
        "title": "Custom tag control lifecycle without data-linking: init() and render() events only",
        "text": "Custom tag control lifecycle without data-linking: init() and render() events only\nWhen a custom tag is rendered without data-linking:\n{{mytag .../}}\n\nthen it will be instantiated during rendering, and immediately disposed, and only the init() and render() lifecycle events will be triggered:\n\ninit() – initialization\nrender() – rendering\n\n"
      },
      {
        "_type": "para",
        "title": "Custom tag control lifecycle with data-linking (tag control)",
        "text": "Custom tag control lifecycle with data-linking (tag control)\nWhen a custom tag is rendered with data-linking:\n{^{mytag .../}}\n\nthen it will behave as a tag control. It will be instantiated during rendering, and the instance will remain as long as the parent HTML element (and JsViews View) are not removed or disposed.\nThe different lifecycle scenarios are as follows:\nInitialization:\nDuring the initial rendering and data-linking, lifecycle events will be triggered in the following sequence:\n\ninit() – initialization\nrender() – rendering\nonBind() – during initial data-linking\nonAfterLink() – after initial data-linking\nsetValue() – called once for each bound argument or property (and for each {{else}} block)\n\nData-linking update (observable change):\nIf the tag control has arguments {^{mytag arg1 .../}} then whenever any of the arguments changes observably, data-linking and rendering will be refreshed, with the following sequence of events:\n\nonBeforeChange() – cancellable event, before change\nonUpdate() – update data-linking\nonUnbind() – remove data-link bindings\nrender() – refresh rendering\nonBind() – establish new data-link bindings\nonAfterLink() – after updating data-linking\nsetValue() – called once for each bound argument or property (and for each {{else}} block)\nonAfterChange() – after completing change\n\n– and similarly if the tag has data-bound properties {^{mytag ^prop1=... .../}}, or declared boundProps or depends paths for which the data changes observably…\nData-linking update with onUpdate set to false:\nOften a custom tag control does not need to completely re-render itself when responding to observable changes in arguments, bound properties or dependencies. In that case, performance can be optimized by setting onUpdate: false (or setting to a handler which returns false). The observable change lifecycle is then reduced to:\n\nonBeforeChange() – cancellable event, before change\nonUpdate() – update data-linking (set to false or returns false)\nonAfterLink() – after updating data-linking\nsetValue() – called once for each bound argument or property (and for each {{else}} block)\nonAfterChange() – after completing change\n\n– Note that it is still possible to force a complete re-rendering, by calling tag.refresh().\nTwo-way bound tag control triggering an observable update to data:\nA tag control may be bound to data through a two-way binding. In that case it can be updated when the data-linked data changes observably (two previous scenarios), but there is also the reverse scenario where the tag triggers an observable change on the data. This leads to the following sequence of lifecycle events:\n\nonBeforeUpdateVal() – cancellable event, before triggering change\nonBeforeChange() – cancellable event, before change\nonUpdate() – update data-linking\nonAfterLink() – after updating data-linking\nonAfterChange() – after completing change\nsetValue() – called once only – for the bound argument or property which is being triggered\n\nDisposal:\nIf the containing HTML/View is removed, then the tag control instance will be disposed, with the following sequence of events:\n\nonUnbind() – remove data-link bindings\nonDispose() – dispose of instance\n\nRefresh:\nIf the tag control instance is refreshed (by calling the tag.refresh() method, for example) then the instance will be replaced by a newly rendered and data-linked instance – with the following sequence of events:\n\nonUnbind() – remove data-link bindings\nrender() – refresh rendering\nonBind() – establish new data-link bindings\nonAfterLink() – after data-linking refreshed instance\nsetValue() – called once for each bound argument or property (and for each {{else}} block)\n\n"
      },
      {
        "_type": "para",
        "title": "Declaring event handlers directly on the tag instance",
        "text": "Declaring event handlers directly on the tag instance\nThe following event handlers can be specified as tag options, for custom tags, but can also be declared directly on a tag instance:\n\nonBind()\nonUnbind()\nonAfterLink()\nonUpdate()\nonDispose()\nonBeforeUpdateVal()\nonBeforeChange()\nonAfterChange()\n\nFor example:\n{^{mytag ... onDispose=~cleanupMyTag/}}\n\nThis style of inline event handler declaration works for regular built-in tags too. Here is an example declaring an onBeforeUpdateVal() handler on an <input data-link=\"...\" />, and an onBeforeChange() handler on a {^{: ...}} tag:\n"
      },
      {
        "_type": "sample",
        "text": "\n  <input data-link=\"telephone onBeforeUpdateVal=~validateTel\"/>\n\n  Telephone: {^{:telephone onBeforeChange=~confirmChange}}\n\n\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n\n  data = { telephone: \"693 726 3388\" },\n\n  helpers = {\n    validateTel: function(ev, eventArgs) {\n      return eventArgs.value.length < 13;\n    },\n    confirmChange: function(ev, eventArgs) {\n      return confirm(\"Accept the value: '\" + eventArgs.value + \"'?\");\n    }\n  };\n\nmyTmpl.link(\"#page\", data, helpers);\n<input data-link=\"telephone onBeforeUpdateVal=~validateTel\"/>\n\n... {^{:telephone onBeforeChange=~confirmChange}}\n\nhelpers = {\n  validateTel: function(ev, eventArgs) {\n    return eventArgs.value.length < 13;\n  },\n  confirmChange: function(ev, eventArgs) {\n    return confirm(\"Accept the value: '\" + eventArgs.value + \"'?\");\n  }\n};\n\n\n"
      }
    ]
  },
  "tagpatterns": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following subtopics and sections show some common design patterns used for different categories of JsViews custom tag controls:\nLayout and rendering design patterns\n\nRendered template\nProgrammatic rendering (render method)\nSetting options in the init method\nSpecifying event handlers\nSetting size\nSetting class\nWrapping content\nSetting the data context of wrapped content\n\nData binding design patterns\n\nData-linked tags: responding to updated args or props\nResponding to user actions\nTwo-way binding to args or props (bindTo). Persistence of state\nLinked element\nLinked contextual parameters\nsetValue and updateValue\nMultiple two-way binding to args or props\n\nTag hierarchy design patterns\n\nComposite controls\nConverters\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the JsViews tag controls overview topic, and the Tag control options API details topic.\n"
      }
    ]
  },
  "renderingpatterns": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This topic shows common tag control design patterns concerning the visual rendering and UI layout of tag controls:\n\nRendered template\nProgrammatic rendering (render method)\nSetting options in the init method\nSpecifying event handlers\nSetting size\nSetting class\nWrapping content\nSetting the data context of wrapped content\n\nFor other categories of tag control design pattern, see Data binding design patterns and Tag hierarchy design patterns.\n"
      },
      {
        "_type": "para",
        "title": "Rendered template",
        "text": "Rendered template\nAs shown in the JsRender Using custom tags topic, a simple tag control can be obtained just by assigning a template to the template option:\n$.views.tags(\"mytag\", {\n  template: tagTemplate; // Provide just a template (string, selector, or compiled template object)\n});\n\nSee this example and this example.\n"
      },
      {
        "_type": "para",
        "title": "Programmatic rendering (render method)",
        "text": "Programmatic rendering (render method)\nSimilarly, a tag control can be defined just by assigning a function to the render option:\n$.views.tags(\"mytag\", {\n  render: tagRenderFn); // Provide just a render method\n});\n\nThis is also shown in the JsRender Using custom tags topic. See this example and this example.\n"
      },
      {
        "_type": "para",
        "title": "Setting options (such as the template option) in the init() method",
        "text": "Setting options (such as the template option) in the init() method\nMost of the tag options that can be specified ‘statically’ in a tag declaration can alternatively be set programmatically in the init() method, and made to depend ‘dynamically’ on state, or data, or other settings such as tag properties.\nThe following options can all be set in this way in the init() method:\n\ntemplate\nboundProps\ndepends\nbindTo\nbindFrom\nattr\nsetSize\nheight\nwidth\nclassName\nlinkedElement\nlinkedCtxParam\nmainElement\ndisplayElement\ncontentCtx\nargDefault\n\nFor example, in this sample the template option is set within the init() method to a different template depending on the value of the mode property.\n"
      },
      {
        "_type": "para",
        "title": "Specifying event handlers",
        "text": "Specifying event handlers\nThe appearance, behavior, data-binding and interactivity of a tag control can be determined by both declarative and programmatic approaches.\n\nThe declarative approach uses options such as template, boundProps, bindTo, width, className, linkedCtxParam and displayElement.\nThe programmatic approach is primarily by placing code in event handlers, declared for different events in the tag control lifecycle.\n\nThe most common usage patterns for event handlers include:\n\ninit() – Called during initialization\n\nUsed for initialization and Programmatic setting of options\n\nrender() – Called during rendering\n\nUsed for returning rendered HTML, or for controlling rendering behavior\n\nonBind() – Called during initial data-linking\n\nUsed for accessing tag control UI, adding data-binding, attaching event handlers\n\nonAfterLink() – Called after data-linking, both initially, and on every observable update\n\nUsed for accessing tag control UI (when needed on every update)\n\nonUpdate() – Called on every observable update\n\nUsed for coding on every update. Code can depend on the specific change (newTagCtxs)\nReturn false to skip re-rendering\n\nonDispose() – Called when tag instance is disposed\n\nUsed for instance clean up or disposal\n\n\n"
      },
      {
        "_type": "para",
        "title": "Setting size",
        "text": "Setting size\nThe height and width of a tag control can be specified in different ways:\n\nThrough CSS – for example by setting the displayElement option, then either setting the className option, or specifying the class property on the tag markup: {{mytag ... class=.../}}\nBy setting the setSize and mainElement options – then either setting the  width/height options, or specifying the width/height properties on the tag markup: {{mytag ... width=... height=.../}}.See for example this tabs sample.\nProgrammatically – by setting the width or height of the chosen HTML element. For example, in onBind():\nonBind: function() { this.contents(true, \"someSelector\").width(300); }\n\n"
      },
      {
        "_type": "para",
        "title": "Setting class",
        "text": "Setting class\nA tag control can render elements with associated class names, which can then allow styling of the tag control instances, through CSS.\nmytag: {\n  template: '...<div class=\"mytagOuter\">...'\n\nIn addition, if a display element is defined then a class can be associated with that element, either through the className option, or declaratively on the tag: {{mytag ... class=...}}.\nSee displayElement.\n"
      },
      {
        "_type": "para",
        "title": "Wrapping content",
        "text": "Wrapping content\nAny tag can wrap block content, as in:\n{{mytag}}some block content{{/mytag}}\n\nor be used with {{else}} tags to wrap multiple blocks – as in\n{{mytag}}block1{{else}}block2{{else}}block3{{/mytag}}\n\nIf the tag has no template option and no render() method then all the blocks will be rendered as is. Nevertheless the tag may indirectly affect rendering or behavior as a result of other tag options – such as a setting for mainElement, width, className\nor contentCtx.\nEven if no tag options are specified, the tag may still impact the rendering of each block, since it will have the default contentCtx behavior, and move the data context in the block to whatever data was passed in as argument:\n"
      },
      {
        "_type": "sample",
        "text": "\n{{mytag person}}\n  Name: {{:name}}<br/> {{!--data context here is 'person'--}}\n{{else address}}\n  Address: {{:street}} {{!--data context here is 'address'--}}\n{{/mytag}}\n\n\n\n\n$.views.tags(\"mytag\", {});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    person: {name: \"Jo\"},\n    address: {street: \"Main Street\"}\n  },\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);\n{{mytag person}}\n  Name: {{:name}}<br/> {{!--data context here is 'person'--}}\n{{else address}}\n  Address: {{:street}} {{!--data context here is 'address'--}}\n{{/mytag}}\n\n$.views.tags(\"mytag\", {});\nvar data = {person: {name: \"Jo\"}, address: {street: \"Main Street\"}; ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "If the tag has a render() method or a template then block content needs to be specifically included in the rendered output.\nIn a render() method (if there is no template) block content is rendered using:\n... this.tagCtx.render() ...\n\nIn a template either of the following forms will render the block content:\n{{include tmpl=#content/}}\n{{include tmpl=~tagCtx.content/}}\n\nand similarly, a data-linked element can use an {include} tag binding to wrap content, as in:\n<div data-link=\"{include tmpl=#content/}\"></div>\n\n(See also the related documentation topics: Accessing and rendering wrapped block content, Rendering wrapped block content and Rendering else blocks)\nThe following sample shows two versions of a {{chooseblock}} custom tag – one using a render() method and the other a template. The tag can wrap multiple blocks:\n{{chooseblock pane=2}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/chooseblock}}\n\nThe tag renders just one block – specified by its pane property – which defaults to 0 and can be set using (for example) {{chooseblock pane=1}}, or driven by a data value such as mode, in {{chooseblock pane=mode}}.\nNote that the {{chooseblock}} tag uses the init() method and either the render() method or the template option, and also has a custom tag property: pane.\nWe will develop this example further in the following sections, and incorporate additional data-linking and interactivity features, using other custom tag options and methods/handlers. In this way it will evolve into a {{spinblock}} control (with the pane property as tag state) which will then be incorporated (through tag composition) into a more advanced {{colorpicker}} control.\n"
      },
      {
        "_type": "sample",
        "text": "\n<div class=\"box\">\n{{chooseblock pane=0}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/chooseblock}}\n</div>\n\n<div class=\"box\">\n{{chooseblock2 pane=1}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/chooseblock2}}\n</div>\n\n\n\n\n{{!--include rendered block content, but only for selected pane--}}\n{{if ~tagCtx.index===~tag.pane}}\n  {{:~tag.tagName}}<br/> Pane {{:~tag.pane}}:\n  {{include tmpl=#content/}}\n{{/if}}\n\n\n\n$.views.tags({\n\n//---- {{chooseblock}} tag definition ----\n\nchooseblock: {\n  // JsViews handlers and methods\n  render: function() {\n    // Called once for each block (tagCtx)\n    var ret = \"\";\n    if (this.tagCtx.index === this.pane) {\n      // For selected block, include block content in rendered string \n      ret += this.tagName\n           + \"Pane \" + this.pane + \": \"\n           + this.tagCtx.render();\n    }\n    return ret; // For non-selected blocks, return \"\"\n  },\n\n  init: function(tagCtx) {\n    if (tagCtx.props.pane !== undefined) {\n      this.pane = tagCtx.props.pane;\n    }\n  },\n\n  // tag properties/state\n  pane: 0 // selected pane (defaults to 0)\n},\n\n//---- {{chooseblock2}} tag definition ----\n\nchooseblock2: {\n  // JsViews tag settings\n  template: \"#chooseblock2Tmpl\", // Rendered once for each block (tagCtx)\n\n  // JsViews handlers and methods\n  init: function(tagCtx) {\n    if (tagCtx.props.pane !== undefined) {\n      this.pane = tagCtx.props.pane;\n    }\n  },\n\n  // tag properties/state\n  pane: 0 // selected pane (defaults to 0)\n}\n\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {},\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);\nTag declaration (using a render method):\nchooseblock: {\n  // JsViews handlers and methods\n  init: function(tagCtx) {\n    ... this.pane = tagCtx.props.pane;\n  },\n  render: function() {\n    // Called once for each block (tagCtx)\n    if (this.tagCtx.index === this.pane) {\n      // For selected block, include block content in rendered string \n      ret += ... + this.pane + \": \" + this.tagCtx.render();\n    }\n    return ret; // For non-selected blocks, return \"\"\n  },\n  // tag properties/state\n  pane: 0 // selected pane (defaults to 0)\n}\n\nAlternative version using a template:\nchooseblock2: {\n  // JsViews tag settings\n  template: \"#chooseblock2Tmpl\", // Rendered once for each block (tagCtx)\n  // JsViews handlers and methods\n  init: function(tagCtx) {...},\n  ...\n}\n\nchooseblock2Tmpl:\n{{!--include rendered block content, but only for selected pane--}}\n{{if ~tagCtx.index===~tag.pane}}\n  ... {{:~tag.pane}} ... {{include tmpl=#content/}}\n{{/if}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The two versions of {{chooseblock}} above show how:\n\nwith a render() method and no template, render() is called once for each block, and can selectively output rendering (such as the block content) for that block\nwith a template but no render() method, the template is rendered once for each block, and can again selectively render content (such as the block content) for the block\n\nThe following is a third variant which shows how:\n\nwith both a template and a render() method, calling tagCtx.render() from the render() method will render the template for that block. The template can then optionally include the corresponding block content\n\n"
      },
      {
        "_type": "sample",
        "text": "\n<div class=\"box\">\n{{chooseblock3 pane=pane}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/chooseblock3}}\n</div>\n\n\n\n\n{{:~tag.tagName}}<br/> Pane {{:~tag.pane}}:\n{{!--Render block content (tagCtx.content) for the selected pane--}}\n{{include tmpl=~tag.tagCtxs[~tag.pane].content /}}\n\n\n\n$.views.tags({\nchooseblock3: {\n  // JsViews tag settings\n  template: \"#chooseblock3Tmpl\",\n\n  // JsViews handlers and methods\n  render: function() {\n    // Called once for each block (tagCtx)\n    if (this.tagCtx.index === 0) {\n      return this.tagCtx.render();\n      // render the template only once, on first tagCtx\n    }\n    return \"\";\n  },\n  init: function(tagCtx) {\n    if (tagCtx.props.pane !== undefined) {\n      this.pane = tagCtx.props.pane;\n    }\n  },\n\n  // tag properties/state\n  pane: 0 // selected pane (defaults to 0)\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {pane: 1}, // Set the selected pane\n  html = myTmpl.render(data);\n\n$(\"#page\").html(html);\nrender() method\nrender: function() {\n  // Called once for each block (tagCtx)\n  if (this.tagCtx.index === 0) {\n    return this.tagCtx.render();\n    // render the template only once, on first tagCtx\n  }\n  return \"\";\n}\n\nchooseblock3Tmpl\n{{:~tag.tagName}}<br/> Pane {{:~tag.pane}}:\n{{!--Render block content (tagCtx.content) for the selected pane--}}\n{{include tmpl=~tag.tagCtxs[~tag.pane].content /}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Setting the data context of wrapped content",
        "text": "Setting the data context of wrapped content\nTo set the inner data context for the wrapped content:\n\nWith the render() approach:\n\npass in data as argument: tagCtx.render(someData)\nuse contentCtx to define the inner data context\ncall render() without argument, in which case the inner data context will be the same as the outer context\n\nWith the template approach:\n\npass data as an argument: {{include someData tmpl=... /}}\nuse contentCtx to define the data context of both the template and the wrapped content\nuse {{include tmpl=... /}} without argument, in which case the data context of both the template and the wrapped content will be:\n\nthe value passed as first tag argument {{mytag someData...}}, if there is one\notherwise, the same as the outer context.)\n\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "bindingpatterns": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This topic shows common tag control design patterns involving data-binding and interactivity:\n\nData-linked tags: responding to updated args or props\nResponding to user actions\nTwo-way binding to args or props (bindTo). Persistence of state\nLinked element\nLinked contextual parameters\nSetValue and updateValue\nMultiple two-way binding to args or props\n\nFor other categories of tag control design pattern, see Layout and rendering design patterns and Tag hierarchy design patterns.\n"
      },
      {
        "_type": "para",
        "title": "Data-linked tag controls: responding to updated args or props",
        "text": "Data-linked tag controls: responding to updated args or props\nThe Wrapping content section of  Layout and rendering design patterns showed the {{chooseblock}} custom tag – which did not use data-linking (and could be used just with JsRender).\nThe next sample will make {^{chooseblock pane=...}} into a data-linked tag control, where the selected tag.pane can be driven by data and respond to observable changes through one-way data binding of the pane property.\nThis will illustrate the use of the boundProps option, the init() and onUpdate() event handler, and custom tag methods.\nSpecifically, we will provide:\n\na boundProps: [\"pane\"] option setting. (This option takes an array of property names.) Declaring pane as a bound property saves us from having to write {^{chooseblock ^pane=...}} on each tag instance (see binding to tag properties).\na getPane() custom tag method, to validate the value of the pane property.\nan init() event handler to initialize tag.pane based on the data).\nan onUpdate() event handler, to respond to observable changes of the pane property. Like init(), this handler will use tag.getPane(...) to test whether the new value is valid – and if so will set the tag.pane to the new value. For invalid values we return false, to ignore the change, and skip re-rendering the tag control. (See Custom tag control lifecycle.)\n\n"
      },
      {
        "_type": "sample",
        "title": "{{chooseblock}} with  one-way binding",
        "text": "{{chooseblock}} with  one-way binding\n\n<div class=\"box\">\n{^{chooseblock pane=mode}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/chooseblock}}\n</div>\n\n<div class=\"left\">\n  <input data-link=\"mode convert=~toString convertBack=~toInt\"/>\n</div>\n\n<div class=\"left\">\n{^{radiogroup mode convert=~toString convertBack=~toInt}}\n  <label><input type=\"radio\" value=\"0\"/> 0</label>\n  <label><input type=\"radio\" value=\"1\"/> 1</label>\n  <label><input type=\"radio\" value=\"2\"/> 2</label>\n{{/radiogroup}}\n</div>\n\n\n\n$.views.tags({\nchooseblock: {\n  // JsViews tag settings\n  boundProps: [\"pane\"], // Respond to observable changes in 'pane' prop\n\n  // JsViews handlers and methods\n  init: function(tagCtx) {\n    var newPane = this.getPane(this.tagCtxs);  // Validate 'pane' prop\n    if (newPane !== undefined) {\n      this.pane = newPane; // Is valid, so set to the value\n    }\n  },\n\n  render: function() { \n    var ret = \"\";\n    if (this.tagCtx.index === this.pane) {\n      // For selected block, include block content in rendered string \n      ret += this.tagName + \"Pane \"\n          + this.pane + \": \"\n          + this.tagCtx.render();\n    }\n    return ret; // For non-selected blocks, return \"\"\n  },\n\n  onUpdate: function(ev, event, newTagCtxs) {\n    var newPane = this.getPane(newTagCtxs); // Validate 'pane' prop\n    if (newPane === undefined) {\n      return false; // Not a valid value, so no update\n    }\n    this.pane = newPane; // Valid value, so update\n  },\n\n  // tag properties/state\n  pane: 0,  // selected pane (defaults to 0)\n\n  // tag methods\n  getPane: function(tagCtxs) {\n    // Helper function to validate the 'pane' prop - integer, in range\n    var pane = tagCtxs[0].props.pane;\n    if (pane !== null && 0 <= pane && pane < this.tagCtxs.length) {\n      return pane;\n    }\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    mode: 1\n  },\n  context = {\n    toInt: function(value) {\n      value = +value;  // Coerce to number\n      return value === parseInt(value) ? value : null; // If not exact integer return null\n    },\n    toString: function(value) {\n      return \"\" + value;\n    }\n  };\n\nmyTmpl.link(\"#page\", data, context);\n\nData-linked tag:\n{^{chooseblock pane=mode}}...{{else}}...{{else}}...{{/chooseblock}}\n\nAdd boundProps to observe pane, getPane() to validate value of pane, init() and onUpdate() to respond to valid changes:\nchooseblock: {\n  // JsViews tag settings\n  boundProps: [\"pane\"], // respond to observable changes in the 'pane' property\n  // JsViews handlers and methods\n  init: function(tagCtx) {\n    var newPane = this.getPane(this.tagCtxs);  // Validate 'pane' prop\n    ...\n  },\n  render: function() {\n    ...\n  }, \n  onUpdate: function(ev, event, newTagCtxs) {\n    var newPane = this.getPane(newTagCtxs); // Validate 'pane' prop\n    if (newPane === undefined) {\n      return false; // Not a valid value, so no update\n    }\n    this.pane = newPane; // Valid value, so update\n  },\n  ...\n  // tag methods\n  getPane: function(tagCtxs) {\n    // Helper function to validate the 'pane' prop - integer, in range\n    var pane = tagCtxs[0].props.pane;\n    if (...) {\n      return pane;\n    }\n  }\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Responding to user actions",
        "text": "Responding to user actions\nAn interactive tag control will capture and respond to user actions, generally in one or more of the following ways:\n\nResponding to observable changes to data – such as bound args or props, or changes corresponding to depends settings (see the Data-linked controls pattern above). (The data changes are typically themselves the result of the user interacting with the UI elsewhere, outside this tag control).\nResponding to user changes made via ‘sub-controls’ within this tag control UI, such as textboxes, radio buttons, checkboxes or other tag controls (see the linked elements, linked contextual parameters and composition patterns)\nThe tag control can attach event handlers on its rendered UI, and then respond to user events such as ‘click’ or 'mousemove’, via those handlers.\n\nTo illustrate the use of event handlers, we will convert our {{chooseblock}} tag control into a {{spinblock}} tag control, by providing switcher UI for cycling through the panes.\nWe will set the option dataBoundOnly: true (since this control is only intended to be used with data-linking – and otherwise should show an error message).\nWe will add a custom tag method, cycle(), registered as ‘click’ handler on the switcher.\nTwo versions of the {{spinblock}} show:\n\nAttaching the handler declaratively, using {on ~tag.cycle}. (See Event bindings.)\nAttaching the handler programmatically in the onBind() event, using jQuery\n\nThe cycle() method modifies the tag control state: tag.pane, and then calls tag.refresh() to re-render with the new pane selection.\n\nA third version takes the declarative approach, but instead of using a render() method it uses a template. The template data-links directly to the tag.pane value. In this version, the cycle() method does not call tag.refresh(), but simply changes the tag.pane observably, and lets JsViews automatically update appropriately thanks to the data-linking.\n\n"
      },
      {
        "_type": "sample",
        "title": "{{spinblock}} variants",
        "text": "{{spinblock}} variants\n\n{^{spinblock}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/spinblock}}\n\n{^{spinblock2}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/spinblock2}}\n\n{^{spinblock3}}\n  <u>Zero</u>\n{{else}}\n  <b>One</b>\n{{else}}\n  <i>Two</i>\n{{/spinblock3}}\n\n\n\n{{if ~tagCtx.index===0}} {{!--render once only--}}\n  <div class=\"box\">\n    {{!--Switcher UI with 'click' handler calling tag.cycle() method--}}\n    <div class=\"switcher\" data-link=\"{on ~tag.cycle}\">\n      <svg height=\"34\" width=\"17\">\n        <path d=\"M5,6 L11,6 L8,2 Z M5,26 L11,26 L8,30 Z\"></path>\n        <text x=4 y=21 data-link=\"text{:~tag.pane}\"></text>\n      </svg>\n    </div>\n    {{:~tag.tagName}}<br/>\n    {{!--Render wrapped content of selected block,\n         data-linked to ~tag.pane for dynamic switching--}}\n    {^{include ^tmpl=~tag.tagCtxs[~tag.pane].content/}}\n  </div>\n{{/if}}\n\n\n\n$.views.tags({\n\n//---- {{spinblock}} tag definition ----\n\nspinblock: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n\n  // JsViews handlers and methods\n  render: function() {\n    var ret = \"\";\n    if (this.tagCtx.index === 0) {\n      // First pane\n      ret += '' // Outer 'box' div\n      // Render switcher UI, with 'click' handler calling tag.cycle() method\n      + ''\n        + ''\n          + ''\n          + '' + this.pane + ''\n        + ''\n      + '';\n    }\n    if (this.tagCtx.index === this.pane) {\n      // This is the selected pane.\n      ret += this.tagName + \"\"\n        + this.tagCtx.render(); // Render block content\n    }\n    if (this.tagCtx.index === this.tagCtxs.length-1) {\n      // Last pane\n      ret += ''; // Close outer 'box' div\n    }\n    return ret;\n  },\n\n  onUpdate: false, // No need to re-render on update\n\n  // tag properties/state\n  pane: 1, // Initial selected pane\n\n  // tag methods\n  cycle: function() {\n    // Method to cycle/increment selected pane\n    this.pane = (this.pane+1) % this.tagCtxs.length;\n    this.refresh();\n  }\n},\n\n//---- {{spinblock2}} tag definition ----\n\nspinblock2: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n\n  // JsViews handlers and methods\n  render: function() {\n    var ret = \"\";\n    if (this.tagCtx.index === 0) {\n      // First pane\n      ret += '' // Outer 'box' div\n      // Render switcher UI\n      + ''\n        + ''\n          + ''\n          + '' + this.pane + ''\n        + ''\n      + '';\n    }\n    if (this.tagCtx.index === this.pane) {\n      // This is the selected pane.\n      ret += this.tagName + \"\"\n        + this.tagCtx.render(); // Render block content\n    }\n    if (this.tagCtx.index === this.tagCtxs.length-1) {\n    // Last pane\n      ret += ''; // Close outer 'box' div\n    }\n    return ret;\n  },\n\n  onBind: function() {\n    // Attach tag.cycle() method to switcher UI, as 'click' handler\n    this.contents(true, '.switcher').on(\"click\", $.proxy(this.cycle, this));\n  },\n\n  onUpdate: false, // No need to re-render on update\n\n  // tag properties/state\n  pane: 1, // Initial selected pane\n\n  // tag methods\n  cycle: function() {\n    // Method to cycle/increment selected pane index\n    this.pane = (this.pane+1) % this.tagCtxs.length;\n    this.refresh();\n  }\n},\n\n//---- {{spinblock3}} tag definition ----\n\nspinblock3: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  template: \"#spinblock3Tmpl\", // spinblock UI\n\n  // JsViews handlers and methods\n  onUpdate: false, // No need to re-render on update\n\n  // tag properties/state\n  pane: 1, // Initial selected pane\n\n  // tag methods\n  cycle: function() {\n    // Method to cycle/increment selected pane\n    newPane = (this.pane+1) % this.tagCtxs.length;\n    $.observable(this).setProperty(\"pane\", newPane);\n  }\n}\n\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {mode: \"2\"};\n\nmyTmpl.link(\"#page\", data);\nData-linked tag:\n{^{spinblock pane=mode}}...{{else}}...{{else}}...{{/spinblock}}\n\nspinblock – Attach handler declaratively, using {on ...}\n// JsViews tag settings\ndataBoundOnly: true,\n// JsViews handlers and methods\nrender: function() {\n  ...\n  if (this.tagCtx.index === 0) { // First pane\n    // Render switcher UI, with 'click' handler calling tag.cycle() method\n    ... + '<div class=\"switcher\" data-link=\"{on ~tag.cycle}\">...</div>';\n  }\n  if (this.tagCtx.index === this.pane) { // This is the selected pane.\n    ... + this.tagCtx.render(); // Render block content\n  }\n  ...\n},\n...\n// tag methods\ncycle: function() { // Method to cycle/increment selected pane\n  this.pane = (this.pane+1) % this.tagCtxs.length;\n  this.refresh();\n}\n\nspinblock2 – Attach handler programmatically, using jQuery on()\n...\n// JsViews handlers and methods\nrender: function() {\n  ...\n  if (this.tagCtx.index === 0) { // First pane\n    ... + '<div class=\"switcher\"> ... </div>'; // Render switcher UI\n  }\n  ...\n},\nonBind: function() {\n  // Attach tag.cycle() method to switcher UI, as 'click' handler\n  this.contents(true, '.switcher').on(\"click\", $.proxy(this.cycle, this));\n},\n...// tag methods\ncycle: function() { ... }\n\nspinblock3 – Use data-link to incrementally update for new pane (rather than complete refresh)\n// JsViews tag settings\ndataBoundOnly: true,\ntemplate: \"#spinblock3Tmpl\", // spinblock UI\n...\n// tag methods\ncycle: function() { // Method to cycle/increment selected pane\n  var newPane = (this.pane+1) % this.tagCtxs.length;\n  $.observable(this).setProperty(\"pane\", newPane);\n}\n\nspinblock3Tmpl – Switch blocks, driven by data-linking to tag.pane\n...\n{{!--Switcher UI with 'click' handler calling tag.cycle() method--}}\n<div class=\"switcher\" data-link=\"{on ~tag.cycle}\">\n...\n{{!--Render wrapped content of selected block, data-linked to ~tag.pane for dynamic switching--}}\n{^{include ^tmpl=~tag.tagCtxs[~tag.pane].content/}}\n...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "It is easy to use the above pattern for other similar tag controls which wrap content, and offer interactive UI to switch blocks. Here is the same {{spinblock3}} example above converted to a {{tabs}} control:\n"
      },
      {
        "_type": "sample",
        "title": "{{tabs}} control",
        "text": "{{tabs}} control\n\n{^{tabs width=width height=22 caption=\"Tab A\"}}\n  <u>Zero</u>\n{{else caption=\"Tab B\"}}\n  <b>One</b>\n{{else caption=\"Tab C\"}}\n  <i>Two</i>\n{{/tabs}}\n\n\n\n{{if ~tagCtx.index===0}} {{!--render once only--}}\n  <table class=\"tabsview\"><tbody>\n    {{!--Tab strip UI with 'click' handler calling tag.setTab() method--}}\n    <tr class=\"tabstrip\">\n      {{for ~tag.tagCtxs}}\n        <th data-link=\"\n          class{:'header_' + (#index === ~tag.pane)}\n          {on ~tag.setTab #index}\n          {:props.caption}\"></th>\n      {{/for}}\n    </tr>\n    {{!--Tab content with wrapped content of selected {{else}} block--}}\n    <tr class=\"tabscontent\">\n      <td colspan=\"{{:~tag.tagCtxs.length}}\" data-link=\"{include ^tmpl=~tag.tagCtxs[~tag.pane].content}\"></td>\n    </tr>\n  </tbody></table>\n{{/if}}\n\n\n\n$.views.tags({\ntabs: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  setSize: true, // Allow setting width and height of 'main element'\n  mainElement: \".tabscontent td\", // Selector for 'main element' (tag.mainElem)\n  width: 250, // Default width\n  height: 100, // Default height\n  template: \"#tabsTmpl\", // UI for tabs control\n\n  // JsViews handlers and methods\n  onUpdate: false, // No need to re-render on update\n\n  // tag properties/state\n  pane: 0, // selected pane (defaults to 0)\n\n  // tag methods\n  setTab: function(index) {\n    // OnClick for a tab\n    $.observable(this).setProperty(\"pane\", index);\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    width: 230,\n    pane: \"1\"\n  };\n\nmyTmpl.link(\"#page\", data);\nData-linked tag:\n{^{tabs width=width height=22 caption=\"Tab A\"}}...{{else caption=\"Tab B\"}}...{{else caption=\"Tab C\"}}...{{/tabs}}\n\nTag options for {{tabs}}: – Use data-link to incrementally update for new pane\ntabs: {\n  // JsViews tag settings\n  setSize: true, // Allow setting width and height of 'main element'\n  mainElement: \".tabscontent td\", // Selector for 'main element' (tag.mainElem)\n  ...\n  template: \"#tabsTmpl\", // UI for tabs control\n\n  // JsViews handlers and methods\n  onUpdate: false, // No need to re-render on update\n\n  // tag properties/state\n  pane: 0, // selected pane (defaults to 0)\n\n  // tag methods\n  setTab: function(index) {\n    // OnClick for a tab\n    $.observable(this).setProperty(\"pane\", index);\n  }\n}\n\ntabsTmpl: – Data-linking to tag.pane\n{{if ~tagCtx.index===0}} {{!--render once only--}}\n  <table ...><tbody>\n    {{!--Tab strip UI with 'click' handler calling tag.setTab() method--}}\n    <tr ...>\n      {{for ~tag.tagCtxs}}\n        <th data-link=\"... {on ~tag.setTab #index}\"></th>\n      {{/for}}\n    </tr>\n    {{!--Tab content: wrapped content of selected block, data-linked to ~tag.pane for dynamic switching--}}\n    <tr ...>\n      <td ... data-link=\"{include ^tmpl=~tag.tagCtxs[~tag.pane].content}\"></td>\n    </tr>\n  </tbody></table>\n{{/if}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The {{tabs}} sample above is structurally identical to the previous {{spinblock3}} sample, but substitutes the tabs UI (\"#tabsTmpl\") for the spinblock UI (\"spinblockTmpl3\").\nIt also adds the following tag options – for specifying the size of the tabs control (see the Setting size pattern):\n\nsetSize: true:\nwidth: 250 and height: 100:\nmainElement: \".tabsContent td\":\n\n"
      },
      {
        "_type": "para",
        "title": "Two-way binding to args or props (bindTo). Persistence of state",
        "text": "Two-way binding to args or props (bindTo). Persistence of state\nThe {{tabs}} control has internal state – the tag.pane integer – which changes when the use switches to another pane. A common requirement is to be able to initialize the UI state of a tag control from a contextual ‘data store’ (typically, from the server as session data), and also to be able to persist changes back to that store.\nIn the next two samples we will first add one-way data-linking so that tag.pane can be initialized from contextual data, and then use the bindTo option to instead provide two-way data-linking, so we can persist changes.\nThe one-way data-linking has already been addressed in the section above (the Data-linked tag controls pattern). We will take the same approach used in that section for the {{chooseblock pane}} tag control with data-driven pane selection, and apply it to our {{tabs}} control:\n"
      },
      {
        "_type": "sample",
        "title": "{{tabs}} with one-way binding",
        "text": "{{tabs}} with one-way binding\n\n{^{tabs pane=~state.tabSelect width=width height=22 caption=\"Tab A\" class=\"myTabs \"}}\n  <u>Zero</u>\n{{else caption=\"Tab B\"}}\n  <b>One</b>\n{{else caption=\"Tab C\"}}\n  <i>Two</i>\n{{/tabs}}\n\n<div class=\"left\">\n  <input data-link=\"~state.tabSelect convert=~toString convertBack=~toInt\"/>\n</div>\n\n<div class=\"left\">\n{^{radiogroup ~state.tabSelect convert=~toString convertBack=~toInt}}\n  <label><input type=\"radio\" value=\"0\"/> 0</label><br/>\n  <label><input type=\"radio\" value=\"1\"/> 1</label><br/>\n  <label><input type=\"radio\" value=\"2\"/> 2</label><br/>\n{{/radiogroup}}\n</div>\n\n\n\n\n$.views.tags({\ntabs: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  setSize: true,\n  mainElement: \".tabscontent td\",\n  displayElement: \".tabsview\",\n  boundProps: [\"pane\"],\n  width: 250,\n  height: 100,\n  template:\n    '{{if ~tagCtx.index===0}}' + // render once only\n      '' +\n        // Tab strip UI with 'click' handler calling tag.setTab() method\n        '' +\n          '{{for ~tag.tagCtxs}}' +\n            '' +\n          '{{/for}}' +\n        '' +\n        // Tab content with wrapped content of selected {{else}} block\n        '' +\n          '' +\n        '' +\n      '' +\n    '{{/if}}',\n\n  // JsViews handlers and methods\n  init: function(tagCtx) {\n    var newPane = this.getPane(this.tagCtxs);  // Validate 'pane' prop\n    if (newPane !== undefined) {\n      this.pane = newPane; // Is valid, so set to the value\n    }\n  },\n  onUpdate: function(ev, event, newTagCtxs) {\n    var newPane = this.getPane(newTagCtxs); // Validate 'pane' prop\n    if (newPane === undefined) {\n      return false; // Not a valid value, so no update\n    }\n    this.pane = newPane; // Valid value, so update\n  },\n\n  // tag properties/state\n  pane: 0, // selected pane (defaults to 0)\n\n  // tag methods\n  getPane: function(tagCtxs) {\n    // Helper function\n    var pane = +tagCtxs[0].props.pane;\n    if (!isNaN(pane) && pane >= 0 && pane < tagCtxs.length) {\n      return pane;\n    }\n  },\n  setTab: function(index) {\n    // OnClick for a tab\n    $.observable(this).setProperty(\"pane\", index); // Update tag.pane\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    width: 290\n  },\n  context = {\n    state: {\n      tabSelect: 1\n    },\n    toInt: function(index) {\n      return +index;\n    },\n    toString: function(index) {\n      return \"\" + index;\n    }\n  };\n\nmyTmpl.link(\"#page\", data, context);\n\nThis {{tabs}} sample adds a data-driven pane (selected tab), using the same pattern (and essentially the same code) as data-driven {{chooseblock}} example above – adding the following option settings:\n\nboundProps – to observe pane property\ngetPane() – to validate value of pane\ninit() – to initialize tag.pane with valid value\nonUpdate() – to respond to valid changes\n\nThis sample also moves the template option to a template string, rather than an external script block template declaration (for better custom tag encapsulation).\nIt also sets the displayElement option:\n\ndisplayElement: \".tabsview\"\n\nto determine the HTML element that takes the class attribute. (See the Setting class pattern).\nUsage:\n{^{tabs pane=~state.tabSelect width=width ... class=\"myTabs \"}}...{{/tabs}}\n\nBehavior:\nWe have one-way binding to state.tabSelect. (Changing the radio buttons drives tab selection, but changing the tab does not drive the radio buttons. The next sample will add two-way binding.)\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Next we replace the boundProps option setting by the bindTo option, to allow two-way binding of the tab property. This will enable us to persist changes in the {{tabs}} control state by calling tag.updateValue().\n(See also the alternative versions below: linkedCtxParam and setValue()/updateValue().)\n"
      },
      {
        "_type": "sample",
        "title": "{{tabs}} with two-way binding",
        "text": "{{tabs}} with two-way binding\n\n{^{tabs pane=~state.outerSelect width=width height=125 caption=\"Tab A\" class=\"myTabs\"}}\n  <div class=\"special\">Some tabbed content:</div>\n  {^{tabs pane=~state.innerSelect\n    width=(width-23) height=35 caption=\"Inner One\"}}\n    ONE inner\n  {{else caption=\"Inner Two\"}}\n    TWO {{>label2}}\n  {{else caption=\"Inner Three\"}}\n    THREE inner\n  {{/tabs}}\n{{else caption=\"Tab B\"}}\n  <ul><li>Some</li><li><b>other</b></li><li>content</li></ul>\n{{/tabs}}\n\n<div class=\"left\">\nOuter Select<br/>\n{^{radiogroup ~state.outerSelect convert=~toString convertBack=~toInt}}\n  <label><input type=\"radio\" value=\"0\"/> 0</label><br/>\n  <label><input type=\"radio\" value=\"1\"/> 1</label><br/>\n{{/radiogroup}}\n</div>\n\n<div class=\"left\">\nInner Select<br/>\n{^{radiogroup ~state.innerSelect convert=~toString convertBack=~toInt}}\n  <label><input type=\"radio\" value=\"0\"/> 0</label><br/>\n  <label><input type=\"radio\" value=\"1\"/> 1</label><br/>\n  <label><input type=\"radio\" value=\"2\"/> 2</label><br/>\n{{/radiogroup}}\n</div>\n\n\n\n\n$.views.tags({\ntabs: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  setSize: true,\n  mainElement: \".tabscontent td\",\n  displayElement: \".tabsview\",\n  bindTo: \"pane\",\n  width: 250,\n  height: 100,\n  template:\n    '{{if ~tagCtx.index===0}}' + // render once only\n      '' +\n        // Tab strip UI with 'click' handler calling tag.setTab() method\n        '' +\n          '{{for ~tag.tagCtxs}}' +\n            '' +\n          '{{/for}}' +\n        '' +\n        // Tab content with wrapped content of selected {{else}} block\n        '' +\n          '' +\n        '' +\n      '' +\n    '{{/if}}',\n\n  // JsViews handlers and methods\n  init: function(tagCtx) {\n    var newPane = this.getPane(this.tagCtxs);  // Validate 'pane' prop\n    if (newPane !== undefined) {\n      this.pane = newPane; // Is valid, so set to the value\n    }\n  },\n  onUpdate: function(ev, event, newTagCtxs) {\n    var newPane = this.getPane(newTagCtxs); // Validate 'pane' prop\n    if (newPane === undefined) {\n      return false; // Not a valid value, so no update\n    }\n    this.pane = newPane; // Valid value, so update\n  },\n\n  // tag properties/state\n  pane: 0, // selected pane (defaults to 0)\n\n  // tag methods\n  getPane: function(tagCtxs) {\n    // Helper function\n    var pane = +tagCtxs[0].props.pane;\n    if (!isNaN(pane) && pane >= 0 && pane < tagCtxs.length) {\n      return pane;\n    }\n  },\n\n  setTab: function(index) {\n    // OnClick for a tab\n    $.observable(this).setProperty(\"pane\", index); // Update tag.pane\n    this.updateValue(index); // Update external data, through two-way binding\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    width: 290,\n    label2: \"Inner Tab Label2\",\n    },\n  context = {\n    state: {\n      outerSelect: 0,\n      innerSelect: 1\n    },\n    toInt: function(index) {\n      return +index;\n    },\n    toString: function(index) {\n      return \"\" + index;\n    }\n  };\n\nmyTmpl.link(\"#page\", data, context);\n\nHere we use the bindTo option to provide two-way data-linking of pane:\ntabs: {\n  bindTo: \"pane\",\n ...\n  setTab: function(index) {\n    // OnClick for a tab\n    $.observable(this).setProperty(\"pane\", index); // Update tag.pane\n    this.updateValue(index); // Update external data, through two-way binding\n  }\n}\n\nOur sample has nested {{tabs}} tag controls:\n{^{tabs pane=~state.outerSelect ...}}\n  ...\n  {^{tabs pane=~state.innerSelect ...}}\n    ...\n  {{else ...}}\n    ...\n  {{/tabs}}\n{{else ...}}\n  ...\n{{/tabs}}\n\nThanks to the state persistence to ~state.outerSelect and ~state.innerSelect, the user can switch tabs on the inner {{tabs}} control, then switch the outer {{tabs}} control to a different tab. On returning to the original tab, the inner {{tabs}} control ‘remembers’ its previous ‘selected tab’ setting. Both controls can be driven by the corresponding radio buttons, by two-way binding. The ~state object could also be ‘round-tripped’ to the server/cloud/web service at any time, to allow re-initializing of the page with correct current ‘user state’ data.\n\n"
      },
      {
        "_type": "para",
        "title": "Linked element",
        "text": "Linked element\nThe previous section showed how to provide two-way data-linking on custom tag controls, using bindTo. The approach was partly programmatic – involving for example a call to tag.updateValue() to drive the two-way data-binding to the tag argument or property.\nTwo additional option settings can be used in conjunction with bindTo, to provide a simpler and more declarative approach to two-way data-linking\n\nThe first, discussed in this section, is the linkedElement option.\nThe second – the linkedCtxParam option – is discussed in the next section.\n\nThe linkedElement option allows identifying a single HTML element in the control with each of the tag arguments or properties specified in bindTo. The chosen element is automatically data-linked to the chosen argument/property.\nFor example here is a custom {{textbox}} tag control consisting of a data-linked caption, and an <input> element. We use linkedElement: \"input\" (with the selector \"input\") to set up the two-way data-linking on the <input>.\n"
      },
      {
        "_type": "sample",
        "title": "{{textbox}} with  linkedElement",
        "text": "{{textbox}} with  linkedElement\n\n{^{textbox name caption=role class=\"tb1\"/}}<br />\n\n<input data-link=\"role\" class=\"left\"/>\n<input data-link=\"name\"/>\n\n\n\n$.views.tags({\ntextbox: {\n  dataBoundOnly: true,\n  boundProps: [\"caption\"],\n  template: \"{^{>~tagCtx.props.caption}}: \",\n  linkedElement: \"input\",\n  displayElement: \"div\",\n  onUpdate: false\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    name: \"Jo\",\n    role: \"Owner\"\n  };\n\nmyTmpl.link(\"#page\", data);\n{^{textbox name caption=role .../}}\n\ntextbox: {\n  ...\n  boundProps: [\"caption\"],\n  template: \"... {^{:~tagCtx.props.caption}}: <input/>...\",\n  linkedElement: \"input\",\n  displayElement: \"div\",\n  ...\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the above sample, bindTo was not set, so it had the default behavior of binding to the first tag argument (bindTo: 0).\nHere is a modified sample, with bindTo and linkedElement specifying bindings to three elements:\n\na <span> for the caption (one-way binding)\nan <input> for first name (two-way binding)\nan <input> for last name (two-way binding)\n\nbindTo: [0, 1, \"caption\"],\nlinkedElement: [\".frst\", \".lst\", \".cptn\"],\n\n"
      },
      {
        "_type": "sample",
        "title": "{{namebox}} with linkedElement",
        "text": "{{namebox}} with linkedElement\n\n{^{namebox first last caption=~label class=\"tb1\"/}}<br />\n\n<input data-link=\"~label\" class=\"left\"/>\n<input data-link=\"first\"/>\n<input data-link=\"last\"/>\n\n\n\n$.views.tags({\nnamebox: {\n  dataBoundOnly: true,\n  template: ':  ',\n  bindTo: [0, 1, \"caption\"],\n  linkedElement: [\".firstnm\", \".lastnm\", \".cptn\"],\n  displayElement: \"div\",\n  onUpdate: false\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\"\n  }, \n  uiTerms = {\n    label: \"Full name\"\n  };\n\nmyTmpl.link(\"#page\", data, uiTerms);\n\n{^{namebox first last caption=~label .../}}\n\nnamebox: {\n  ...\n  template: '...<span class=\"cptn\"></span>: <input class=\"firstnm\"/> <input class=\"lastnm\"/>...',\n  bindTo: [0, 1, \"caption\"],\n  linkedElement: [\".firstnm\", \".lastnm\", \".cptn\"],\n  ...\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Linked contextual parameters",
        "text": "Linked contextual parameters\nLike the linkedElement option used in the section above, the linkedCtxParam option provides a largely declarative approach to two-way data-linking of tag controls. But the linked contextual parameter approach is in many ways simpler, more flexible and more powerful than using ‘linked elements’.\nWe will convert the {{namebox}} linkedElement sample above to use linkedCtxParam.\nHere, we will declare a contextual parameter for each of the element bindings we want to establish:\n\na <span> for the caption (one-way binding) – contextual parameter ~firstnm\nan <input> for first name (two-way binding) – contextual parameter ~lastnm\nan <input> for last name (two-way binding) – contextual parameter ~cptn\n\nbindTo: [0, 1, \"caption\"],\nlinkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\"],\n\nNow, we can use the contextual parameters, either:\n\ndeclaratively in the template – using data-linking: <input data-link=\"~firstnm\"/>\nprogrammatically – using APIs such as tag.ctxPrm(...)\n\nHere is the {{namebox}} sample above, converted to use contextual parameters, with declarative data-linking in the template:\ntemplate: '...{^{:~cptn}}: <input data-link=\"~firstnm\"/> <input data-link=\"~lastnm\"/>...'\n\n"
      },
      {
        "_type": "sample",
        "title": "{{namebox}} with linkedCtxParam",
        "text": "{{namebox}} with linkedCtxParam\n\n{^{namebox first last caption=~label class=\"tb1\"/}}<br />\n\n<input data-link=\"~label\" class=\"left\"/>\n<input data-link=\"first\"/>\n<input data-link=\"last\"/>\n\n\n\n$.views.tags({\nnamebox: {\n  dataBoundOnly: true,\n  template: '{^{>~cptn}}:  ',\n  bindTo: [0, 1, \"caption\"],\n  linkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\"],\n  displayElement: \"div\",\n  onUpdate: false\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\"\n  }, \n  uiTerms = {\n    label: \"Full name\"\n  };\n\nmyTmpl.link(\"#page\", data, uiTerms);\n\n{^{namebox first last caption=~fullName .../}}\n\nnamebox: {\n  ...\n  template: '...{^{:~cptn}}: <input data-link=\"~firstnm\"/> <input data-link=\"~lastnm\"/>...',\n  bindTo: [0, 1, \"caption\"],\n  linkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\"],\n  ...\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Linked contextual parameters provide many useful features:\n\nThey can store state in the tag control\nThere can be multiple bindings to the same contextual parameter, within the template\nCalling tag.ctxPrm(\"myparam\", newValue) will trigger observable updates both within the tag control (to ~myparam) and outside the tag control (to whatever data is used for two-way binding to that contextual parameter, through the bindTo mapping)\nA contextual parameter can be accessed not only within the tag control template, but also, for tag controls that are used as block controls, within wrapped content\n\nTo illustrate some of those features, let’s add editability to our {{namebox}}, by adding an additional contextual parameter: ~edt, which will correspond to a boolean ‘editable’ property (state) on the tag control.\nRather than a simple checkbox data-linked to ~edt, we will provide a data-linked image (icon) that toggles based on ~edt, with a click handler that calls tag.toggle().\nWithin our toggle() tag method, we call tag.ctxPrm(...) to observably change the ~edt state.\n(Note: See also the composite tag controls topic for a version of the this editable {{namebox}} sample rewritten as a composite control.)\n"
      },
      {
        "_type": "sample",
        "title": "Editable {{namebox}} with linkedCtxParam",
        "text": "Editable {{namebox}} with linkedCtxParam\n\n<div>\n  <img data-link=\"{on ~tag.toggle} src{:~edt ? ~tag.icons.noEdit : ~tag.icons.edit}\"/>\n  <span data-link=\"~cptn\"></span>:\n  {^{if ~edt}}\n    <input data-link='~firstnm'/> <input data-link='~lastnm'/>\n  {{else}}\n    {^{>~firstnm}} {^{>~lastnm}}\n  {{/if}}\n</div>\n\n\n\n{^{namebox first last caption=~label editable=edit class=\"tb1\"/}}<br/>\n\n<input data-link=\"~label\" class=\"left\"/>\n<input data-link=\"first\"/>\n<input data-link=\"last\"/>\n<label> Editable: <input type=\"checkbox\" data-link=\"edit\"/></label>\n\n\n\n$.views.tags({\nnamebox: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  template: \"#nameboxTmpl\",\n  bindTo: [0, 1, \"caption\", \"editable\"],\n  linkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\", \"edt\"],\n  displayElement: \"div\",\n\n  // JsViews handlers and methods\n  onUpdate: false,\n\n  // tag methods\n  toggle: function() {\n    this.ctxPrm(\"edt\", !this.ctxPrm(\"edt\")); // Observably toggle ~edt\n  },\n\n  icons: {\n    edit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8\"\n+ \"/9hAAAA4UlEQVQ4jZXTvUpDMRgG4Eesgi5adXV1EAdBwYI4e0Q3dwcXd70O6VKoODqJN+DiIP\"\n+ \"hXRbRIL8ghDcTDOZ7mhQ+SkDzkhxCyjgcMsC8za/jEBpbwiiIHuB8vjikjM9hBp1TbaMEPVkp\"\n+ \"oiqyiW1HXeCSc+aMBqcswNgq8VyBtvOCwCUiR5dKkRTzhqAmIyKACWcAzDpqA2THyJtxBmja+M\"\n+ \"V8HbAq3G3dShfSwVwd0cJX0C+EVUuQE55MCEflCH6c4xm0OAHPYxQXucJYL/Jc/wBZuMhZPYZQ\"\n+ \"OTAtfejhhjXD5Cy7fOa4Bo/DvAAAAAElFTkSuQmCC\",\n    noEdit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf\"\n+ \"8/9hAAABJ0lEQVQ4jZXSP0sDMRzG8S/4B3RRa1dXoe2Z5HqiFRHcWtDV93Gcr0O6CIpT8U24dB\"\n+ \"BEreJQpO/ncZDW5AznGfgNucvz+SV3AUApbRnGskxk6fOfIcuuHB9qkahDQ44XdRnUBwwPapEs\"\n+ \"5iVEGStqcyhDL6iEfZ2yjFI+ldEMUA9Rwo4Mw0jdyfGILH053ufIKC80ygtVHWexxjH97thlIM\"\n+ \"ubMprzl6O8kPbYkuNZjrNyOAAC5IDt0qJNWZ5kOfefAwSAh0x+IRkb5XAc6LCqLgMZXtWh4Yc8\"\n+ \"bD0KyOFkGC52EkFkuZbhJA4Yekq59Y8T3YGlqAUEIcPNn9/AB4LwEWtyHCvlsvIvzIFYJ39U3Y\"\n+ \"NMhvuqcBmRZfYDXLAkw1iOaa2yzJRy9QVyXUUsviSJ/AAAAABJRU5ErkJggg==\"\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\",\n    edit: false\n  }, \n  uiHelpers = {\n    label: \"Full name\"\n  };\n\nmyTmpl.link(\"#page\", data, uiHelpers);\n\n//Icon made by Gregor Cresnar: https://www.flaticon.com/authors/gregor-cresnar\n\n{{namebox}} template:\n...\n<img data-link=\"{on ~tag.toggle} src{:~edt ? ~tag.icons.noEdit : ~tag.icons.edit}\"/>\n...\n{^{if ~edt}}\n  <input data-link='~frst'/> <input data-link='~lst'/>\n{{else}}\n  {^{:~firstnm}} {^{:~lastnm}}\n{{/if}}\n...\n\n{{namebox}} options declaration:\nnamebox: {\n  bindTo: [0, 1, \"caption\", \"editable\"],\n  linkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\", \"edt\"],\n  ...\n  toggle: function() {\n    this.ctxPrm(\"edt\", !this.ctxPrm(\"edt\")); // Observably toggle ~edt\n  },\n  icons: {edit: \"...\", noEdit: \"...\"}\n}\n\nUsage:\n{^{namebox first last caption=~label editable=edit .../}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Sometimes using linked contextual parameters can simplify tag controls, as in the next sample, where we convert the {{tabs}} two-way binding sample above to use the linkedCtxParam option for two-way binding.\nbindTo: \"pane\",\nlinkedCtxParam: \"pane\",\n\nThe ~pane linked contextual parameter stores the tag state for tab selection, through two-way data binding to the pane property.\nThe new setTab() method is:\nsetTab: function(index) {\n  // Update tag.pane, and update external data through two-way binding\n  this.ctxPrm(\"pane\", index);\n}\n\nThis is simpler than our previous setTab() method, which was:\nsetTab: function(index) {\n  // OnClick for a tab\n  $.observable(this).setProperty(\"pane\", index); // Update tag.pane\n  this.updateValue(index); // Update external data, through two-way binding\n}\n\n"
      },
      {
        "_type": "sample",
        "title": "{{tabs}} with linkedCtxParam",
        "url": "samples/tag-controls/tabs/sample",
        "text": "{{tabs}} with linkedCtxParam\ntabs: {\n  bindTo: \"pane\",\n  linkedCtxParam: \"pane\",\n  ctx: {pane: 0}, // Default value for ~pane\n  ...\n  setTab: function(index) {\n    // Update tag.pane, and update external data through two-way binding\n    this.ctxPrm(\"pane\", index);\n  }\n}\n\n\n/*! Sample JsViews tag control: {{tabs}} control v1.0.7\nVersion using linkedCtxPrm\nsee: http://www.jsviews.com/#download/sample-tagcontrols\nand http://www.jsviews.com/#bindingpatterns@tabsctxprm */\n/*\n * Copyright 2020, Boris Moore\n * Released under the MIT License.\n */\n\n(function($) {\n\"use strict\";\n\n$.views.tags({\ntabs: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  setSize: true,\n  mainElement: \".tabscontent td\",\n  displayElement: \".tabsview\",\n  bindTo: \"pane\",\n  linkedCtxParam: \"pane\",\n  ctx: {pane: 0}, // Default value for ~pane\n  width: 250,\n  height: 100,\n  template:\n    '{{if ~tagCtx.index===0}}' + // render once only\n      '<table class=\"tabsview\"><tbody>' +\n        // Tab strip UI with 'click' handler calling tag.setTab() method\n        '<tr class=\"tabstrip\">' +\n          '{{for ~tag.tagCtxs}}' +\n            '<th data-link=\"class{:\\'header_\\' + (#index === ~pane)} {on ~tag.setTab #index} {:props.caption}\"></th>' +\n          '{{/for}}' +\n        '</tr>' +\n        // Tab content with wrapped content of selected {{else}} block\n        '<tr class=\"tabscontent\">' +\n          '<td colspan=\"{{:~tag.tagCtxs.length}}\" data-link=\"{include ^tmpl=~tag.tagCtxs[~pane].content}\"></td>' +\n        '</tr>' +\n      '</tbody></table>' +\n    '{{/if}}',\n\n  // JsViews handlers and methods\n  onUpdate: false,\n\n  // tag methods\n  setTab: function(index) {\n    index = index || 0;\n    // Update tag.pane, and update external data through two-way binding\n    this.ctxPrm(\"pane\", index);\n  }\n}\n});\n\n})(this.jQuery);\n\n\"use strict\";\nvar tabsTmpl = $.templates(\"#tabsTmpl\");\n\ntabsTmpl.link(\"#tabsView\",\n  {\n    label2: \"Inner Tab Label2\",\n    width: 290\n  },\n  {\n    state: {\n      outerSelect: 0,\n      innerSelect: 1\n    },\n    toInt: function(index) {\n      return +index;\n    },\n    toString: function(index) {\n      return \"\" + index;\n    }\n  }\n);\n<div id=\"tabsView\"></div>\r\n\r\n<script id=\"tabsTmpl\" type=\"text/x-jsrender\">\r\n{^{tabs pane=~state.outerSelect ^width=width height=125 caption=\"first\" class=\"myTabs\"}}\r\n  <div class=\"special\">Some tabbed content:</div>\r\n  {^{tabs pane=~state.innerSelect\r\n    ^width=(width-23) height=35 caption=\"Inner One\"}}\r\n    ONE inner\r\n  {{else caption=\"Inner Two\"}}\r\n    TWO {{>label2}}\r\n  {{else caption=\"Inner Three\"}}\r\n    THREE inner\r\n  {{/tabs}}\r\n{{else caption=\"second\"}}\r\n  <ul><li>Some</li><li>other</li><li>content</li></ul>\r\n{{/tabs}}\r\n\r\n<div class=\"left\">\r\nOuter Select<br/>\r\n{^{radiogroup ~state.outerSelect convert=~toString convertBack=~toInt}}\r\n  <label><input type=\"radio\" value=\"0\"/> 0</label><br/>\r\n  <label><input type=\"radio\" value=\"1\"/> 1</label><br/>\r\n{{/radiogroup}}\r\n</div>\r\n\r\n<div class=\"left\">\r\nInner Select<br/>\r\n{^{radiogroup ~state.innerSelect convert=~toString convertBack=~toInt}}\r\n  <label><input type=\"radio\" value=\"0\"/> 0</label><br/>\r\n  <label><input type=\"radio\" value=\"1\"/> 1</label><br/>\r\n  <label><input type=\"radio\" value=\"2\"/> 2</label><br/>\r\n{{/radiogroup}}\r\n</div>\r\n\r\n</script>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(See also the alternative setValue()/updateValue() version of {{tabs}}, below.)\n"
      },
      {
        "_type": "para",
        "title": "Using contextual parameters in tag controls",
        "text": "Using contextual parameters in tag controls\nMany of the features of linked contextual parameters shown above actually apply to contextual parameters more generally.\nWithin a tag control, a contextual parameter can be used directly (declaratively in the tag template, or programmatically through the ctxPrm() API), without being declared as a linked contextual parameter (through linkedCtxParam), and can bring the following features:\n\nThe contextual parameter can store state in the tag control\nThere can be multiple bindings to the same contextual parameter, within the template\nA contextual parameter can be accessed not only within the tag control template, but also, for tag controls that are used as block controls, within wrapped content\n\nFor example in the editable {{namebox}} sample above we can remove the two-way data-linking on the editable property, but still use use the ~edt contextual parameter within the tag control – to provide the boolean ‘editable’ state. This is shown in the following modified sample:\n"
      },
      {
        "_type": "sample",
        "title": "Editable {{namebox}} using unlinked contextual parameter",
        "text": "Editable {{namebox}} using unlinked contextual parameter\n\n<div>\n  <img data-link=\"{on ~tag.toggle} src{:~edt ? ~tag.icons.noEdit : ~tag.icons.edit}\"/>\n  <span data-link=\"~cptn\"></span>:\n  {^{if ~edt}}\n    <input data-link='~firstnm'/> <input data-link='~lastnm'/>\n  {{else}}\n    {^{>~firstnm}} {^{>~lastnm}}\n  {{/if}}\n</div>\n\n\n\n{^{namebox first last caption=~label editable=edit class=\"tb1\"/}}<br/>\n\n<input data-link=\"~label\" class=\"left\"/>\n<input data-link=\"first\"/>\n<input data-link=\"last\"/>\n\n\n\n$.views.tags({\nnamebox: {\n  dataBoundOnly: true,\n  template: \"#nameboxTmpl\",\n  bindTo: [0, 1, \"caption\"],\n  linkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\"],\n  displayElement: \"div\",\n  onUpdate: false,\n  toggle: function() {\n    this.ctxPrm(\"edt\", !this.ctxPrm(\"edt\"));\n  },\n  icons: {\n    edit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8\"\n+ \"/9hAAAA4UlEQVQ4jZXTvUpDMRgG4Eesgi5adXV1EAdBwYI4e0Q3dwcXd70O6VKoODqJN+DiIP\"\n+ \"hXRbRIL8ghDcTDOZ7mhQ+SkDzkhxCyjgcMsC8za/jEBpbwiiIHuB8vjikjM9hBp1TbaMEPVkp\"\n+ \"oiqyiW1HXeCSc+aMBqcswNgq8VyBtvOCwCUiR5dKkRTzhqAmIyKACWcAzDpqA2THyJtxBmja+M\"\n+ \"V8HbAq3G3dShfSwVwd0cJX0C+EVUuQE55MCEflCH6c4xm0OAHPYxQXucJYL/Jc/wBZuMhZPYZQ\"\n+ \"OTAtfejhhjXD5Cy7fOa4Bo/DvAAAAAElFTkSuQmCC\",\n    noEdit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf\"\n+ \"8/9hAAABJ0lEQVQ4jZXSP0sDMRzG8S/4B3RRa1dXoe2Z5HqiFRHcWtDV93Gcr0O6CIpT8U24dB\"\n+ \"BEreJQpO/ncZDW5AznGfgNucvz+SV3AUApbRnGskxk6fOfIcuuHB9qkahDQ44XdRnUBwwPapEs\"\n+ \"5iVEGStqcyhDL6iEfZ2yjFI+ldEMUA9Rwo4Mw0jdyfGILH053ufIKC80ygtVHWexxjH97thlIM\"\n+ \"ubMprzl6O8kPbYkuNZjrNyOAAC5IDt0qJNWZ5kOfefAwSAh0x+IRkb5XAc6LCqLgMZXtWh4Yc8\"\n+ \"bD0KyOFkGC52EkFkuZbhJA4Yekq59Y8T3YGlqAUEIcPNn9/AB4LwEWtyHCvlsvIvzIFYJ39U3Y\"\n+ \"NMhvuqcBmRZfYDXLAkw1iOaa2yzJRy9QVyXUUsviSJ/AAAAABJRU5ErkJggg==\"\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\"\n  }, \n  uiHelpers = {\n    label: \"Full name\"\n  };\n\nmyTmpl.link(\"#page\", data, uiHelpers);\n\n//Icon made by Gregor Cresnar: https://www.flaticon.com/authors/gregor-cresnar\n{{namebox}} template:\n...\n<img data-link=\"{on ~tag.toggle} src{:~edt ? ~tag.icons.noEdit : ~tag.icons.edit}\"/>\n...\n{^{if ~edt}}...{{else}}...{{/if}}\n...\n\n{{namebox}} options declaration:\nnamebox: {\n  bindTo: [0, 1, \"caption\"],\n  linkedCtxParam: [\"firstnm\", \"lastnm\", \"cptn\"], // ~edt is no longer declared as linked\n  ...\n  toggle: function() {\n    this.ctxPrm(\"edt\", !this.ctxPrm(\"edt\")); // Observably toggle ~edt\n  },\n  icons: {edit: \"...\", noEdit: \"...\"}\n}\n\nUsage:\n{^{namebox first last caption=~fullName .../}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The next example goes further in showing the use of ‘regular’ contextual parameters (not declared in linkedCtxParam). It is a {{namebox}} tag control which binds to a single string argument containing the ‘full name’:\n{^{namebox name}}\n\nvar data = {name: \"Jo Blow\"}; \n\nNevertheless, it provides separate textboxes for the first and last names.\nInternally, the tag control does not use the linkedCtxParam option at all. It has two separate contextual parameters for the first and last name: ~firstnm and ~lastnm (bound to the textboxes). In addition it has a ~fullnm() contextual parameter, which is a computed observable property depending on ~firstnm and ~lastnm.\n"
      },
      {
        "_type": "sample",
        "title": "{{namebox}} with computed contextual parameter",
        "text": "{{namebox}} with computed contextual parameter\n\n  {^{namebox name class=\"tb1\"/}}\n\n  <input data-link=\"name\"/>\n\n\n\n$.views.tags({\nnamebox: {\n  dataBoundOnly: true,\n  template: ' ',\n  displayElement: \"div\",\n  init: function(tagCtx) {\n    // Make fullName function a computed observable\n    function fullName() {\n      return this.ctxPrm(\"firstnm\") + \" \" + this.ctxPrm(\"lastnm\");\n    }\n    // Make fullName depend on ~firstnm and ~lastnm (in the context of this tag)\n    fullName.depends = [this, \"~firstnm\", \"~lastnm\"];\n    fullName.set = this.fullnmSetter, // Assign the setter\n\n    // Assign fullName function as computed ~fullnm() contextual parameter\n    this.ctxPrm(\"fullnm\", fullName); \n\n    // Call ~fullnm setter to initialize from tag argument\n    this.fullnmSetter(tagCtx.args[0]);\n  },\n  onBind: function(ev, eventArgs) {\n    // Register updateName() method as a handler for changes in ~fullnm()\n    $.observe(this, \"~fullnm\", this.updateName);\n  },\n  onUnbind: function(ev, eventArgs) {\n    // Unregister updateName() method as a handler for changes in ~fullnm()\n    $.unobserve(this, \"~fullnm\", this.updateName);\n  },\n  onUpdate: function(ev, eventArgs, newTagCtxs) {\n    if (!this.updating) {\n      // If tag argument changes, (and if change is from tag control\n      // updating itself) update ~fullnm() with the new value\n      this.ctxPrm(\"fullnm\", newTagCtxs[0].args[0]);\n    }\n    return false;\n  },\n  // tag method - setter for computed ~fullnm()\n  fullnmSetter: function(val) {\n    val = val.split(\" \");\n    this.ctxPrm(\"lastnm\", val.pop());\n    this.ctxPrm(\"firstnm\", val.join(\" \"));\n  },\n  // tag method - handler for ~fullnm change events\n  updateName: function(ev, eventArgs) {\n    this.updating = true;\n    // Update the bound tag argument with new value of ~fullnm()\n    this.updateValue(this.ctxPrm(\"fullnm\")());\n    this.updating = false;\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    name: \"Jo Blow\"\n  }; \n\nmyTmpl.link(\"#page\", data);\nWithin the init() method a fullName() computed observable function is declared, and assigned to ~fullnm:\n// Make fullName function a computed observable\nfunction fullName() {\n  return this.ctxPrm(\"firstnm\") + \" \" + this.ctxPrm(\"lastnm\");\n}\n// Make fullName depend on ~firstnm and ~lastnm (in the context of this tag), and assign setter\nfullName.depends = [this, \"~firstnm\", \"~lastnm\"];\nfullName.set = this.fullnmSetter;\n\n// Assign fullName function as computed ~fullnm() contextual parameter\nthis.ctxPrm(\"fullnm\", fullName); \n\n// Call ~fullnm setter to initialize from tag argument\nthis.fullnmSetter(tagCtx.args[0]);\n\nTwo-way binding is established between ~fullnm() and the tag control argument (name, in our example):\nFirst, changes to ~fullnm() are bound back to the argument, by declaring an updateName() method, registered/unregistered in onBind() and onUnbind() as a handler for change events of ~fullnm(). This method uses a this.updateValue(...) call to observably update the value of the argument.\nonBind: function(ev, eventArgs) {\n  // Register updateName() method as a handler for changes in ~fullnm()\n  $.observe(this, \"~fullnm\", this.updateName);\n},\nonUnbind: function(ev, eventArgs) {\n  // Unregister updateName() method as a handler for changes in ~fullnm()\n  $.unobserve(this, \"~fullnm\", this.updateName);\n},\n...\n// tag method - handler for ~fullnm change events\nupdateName: function(ev, eventArgs) {\n  ...\n  // Update the bound tag argument with new value of ~fullnm()\n  this.updateValue(this.ctxPrm(\"fullnm\")());\n  ...\n}\n\nNext, the onUpdate() handler is used to respond to changes in the value of the argument (name in our example), and trigger a corresponding change to ~fullnm():\nonUpdate: function(ev, eventArgs, newTagCtxs) {\n  ...\n  this.ctxPrm(\"fullnm\", newTagCtxs[0].args[0]);\n  ...\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Programmatic two-way data-binding: setValue() and updateValue() ",
        "text": "Programmatic two-way data-binding: setValue() and updateValue() \nThe sections above show patterns for two-way data-binding of tag controls, using linked elements, and linked contextual parameters.\nThis section will show a pattern using a more generic programmatic approach to two-way data-binding of tag controls, particularly for cases where the data-binding does not correspond to data-linked form elements such as <input> or <select>.\nThe pattern is as follows:\n\nThe bindTo option specifies the tag arguments or properties which have two-way data-binding. (If bindTo is not set, the default behavior will be to bind to the first argument – as if the setting was bindTo: 0)\nWhenever a bound argument or property changes, the setValue() event handler method is called, with the updated value. The tag control uses the code in setValue() to respond appropriately to the changed value.\nThe tag control uses calls to updateValue() to drive changes in the bound arguments or properties – for example, in response to user actions via the tag control UI.\nProgrammatically calling tag.setValue(...) with a value will first call the tag’s setValue(...) event handler (if there is one). Next, if the value (or the value returned by the handler if there is one) is not undefined, and if there are linked elements, it will set the value on the appropriate linked element.\n\nThus, setValue() and updateValue() play symmetric roles:\n\nsetValue() is used to change the tag control in response to external changes in the data-linked data.\nupdateValue() is used by the tag control to trigger external changes in the data-linked data\n\nThis design pattern is illustrated by the next sample – a slider tag control, as well as the following sample – a modified tabs control.\n"
      },
      {
        "_type": "sample",
        "title": "{{slider}} using setValue() / updateValue()",
        "text": "{{slider}} using setValue() / updateValue()\n\n  {^{slider amount min=360 max=0 class=\"slider1\"/}}\n  <input data-link=\"amount\"/>\n\n\n\n$.views.tags({\nslider: {\n  setSize: true,\n  mainElement: \".box\",\n\n  // Movable slider handle, within slider box\n  template: '',\n\n  init: function(tagCtx) {\n    // Define handler specific to this slider, to be used for end of drag\n    this.mouseMoveOff = function() {\n      $(document).off(\"mousemove touchmove\");\n    };\n  },\n\n  onBind: function(tagCtx) {\n    var tag = this,\n      min = tagCtx.props.min,\n      max = tagCtx.props.max;\n    tagCtx.handle = tagCtx.mainElem.find(\".handle\").first();\n\n    // Register handler for mouse click or start of drag\n    tagCtx.mainElem.on(\"mousedown touchstart\", function(ev) {\n      var newVal;\n      function valFromPosition(newX) {\n        newVal = clamp(\n          round(min + (newX - tagCtx.metrics.left)/tagCtx.metrics.scale),\n          min, max);\n      }\n      valFromPosition(ev.clientX);\n      // User click in box: move handle to clicked position\n      tag.moveTo(newVal);\n\n      // Register handler for mousemove during drag\n      $(document).on(\"mousemove touchmove\", function(ev2) {\n        valFromPosition(ev2.clientX);\n        if (newVal !== tagCtx.val) {\n          tagCtx.val = newVal;\n          // User mousemove - sliding handle: move handle to new position\n          tag.moveTo(newVal);\n        }\n        ev.preventDefault();\n      });\n      ev.preventDefault();\n    });\n\n    // Register slider-specific handler for end of drag\n    $(document).on(\"mouseup touchend\", this.mouseMoveOff);\n  },\n\n  onUnbind: function(tagCtx, linkCtx, ctx, ev, eventArgs) {\n    // Remove handler for end of drag specific to this slider\n    $(document).off(\"mouseup touchend\", this.mouseMoveOff);\n  },\n\n  onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {\n    if (!eventArgs) {\n      // We set metrics here, after initial linking. This event is preceded by\n      // 1) onBind event 2) setting of Width and height of mainElem\n      this.setMetrics(tagCtx); \n    }\n  },\n  onUpdate: false,\n\n  setValue: function(x) {\n    // Move the handle to the new position x\n    var tagCtx = this.tagCtx,\n      min = tagCtx.props.min,\n      max = tagCtx.props.max,\n      metrics = tagCtx.metrics;\n    x = clamp(x, min, max);\n    tagCtx.handle.offset({left: (x-min)*metrics.scale + metrics.left - metrics.handleWidth});\n  },\n\n  moveTo: function(x) {\n    // Call setValue() to move the handle to position x\n    this.setValue(x);\n    // Call updateValue() to change the external data-linked data to the new value x\n    this.updateValue(x, true); // Async update\n  },\n\n  setMetrics: function(tagCtx) {\n    var box = tagCtx.mainElem;\n    tagCtx.metrics = {\n      left: box.offset().left,\n      width: box.width(),\n      scale: box.width()/(tagCtx.props.max-tagCtx.props.min),\n      handleWidth: tagCtx.handle.width()/2\n    };\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {amount: 200};\n\nmyTmpl.link(\"#page\", data);\n\nfunction round(val) {\n  return Math.round(100*val)/100;\n}\n\nfunction clamp(num, min, max) {\n  return min>max\n    ? num <= max ? max : num >= min ? min : num\n    : num <= min ? min : num >= max ? max : num;\n}\n{^{slider amount min=360 max=0 .../}}\n\nslider: {\n  ...\n  // Movable slider handle, within slider box\n  template: '<div class=\"box\"><div class=\"handle\"></div></div>',\n\n  onBind: function(tagCtx) {\n    ...\n    // Register handler for mouse click or start of drag\n    tagCtx.mainElem.on(\"mousedown touchstart\", function(ev) {\n      ...\n      tag.moveTo(newVal); // User click in box: move handle to clicked position\n\n      // Register handler for mousemove during drag\n      $(document).on(\"mousemove touchmove\", function(ev2) {\n        ...\n        tag.moveTo(newVal); // User mousemove - sliding handle: move handle to new position\n    ...\n  },\n  ...\n  setValue: function(x) {\n    // Move the handle to the new position x\n    ...\n    tagCtx.handle.offset({left: ...});\n  },\n\n  moveTo: function(x) {\n    // Call setValue() to move the handle to position x\n    this.setValue(x);\n    // Call updateValue() to change the external data-linked data to the new value x\n    this.updateValue(x, true); // Async update\n  },\n  ...\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Similarly we can also convert our {{tabs}} control above to use this setValue()/updateValue() pattern:\n"
      },
      {
        "_type": "sample",
        "title": "{{tabs}} using setValue() / updateValue()",
        "url": "samples/tag-controls/tabs/sample2",
        "text": "{{tabs}} using setValue() / updateValue()\ntabs: {\n  bindTo: \"pane\",\n  linkedCtxParam: \"pane\",\n  ctx: {pane: 0}, // Default value for ~pane\n  ...\n  setTab: function(index) {\n    // Update tag.pane, and update external data through two-way binding\n    this.ctxPrm(\"pane\", index);\n  }\n}\n\n\n\"use strict\";\nvar tabsTmpl = $.templates(\"#tabsTmpl\");\n\ntabsTmpl.link(\"#tabsView\",\n  {\n    label2: \"Inner Tab Label2\",\n    width: 290\n  },\n  {\n    state: {\n      outerSelect: 0,\n      innerSelect: 1\n    },\n    toInt: function(index) {\n      return +index;\n    },\n    toString: function(index) {\n      return \"\" + index;\n    }\n  }\n);\n/*! Sample JsViews tag control: {{tabs}} control v1.0.7\nVersion using setValue()/updateValue\nsee: http://www.jsviews.com/#download/sample-tagcontrols\nand http://www.jsviews.com/#bindingpatterns@tabs-setvalue-updatevalue */\n/*\n * Copyright 2020, Boris Moore\n * Released under the MIT License.\n */\n\n(function($) {\n\"use strict\";\n\n$.views.tags({\ntabs: {\n  // JsViews tag settings\n  dataBoundOnly: true,\n  setSize: true,\n  mainElement: \".tabscontent td\",\n  displayElement: \".tabsview\",\n  bindTo: \"pane\",\n  width: 250,\n  height: 100,\n  template:\n    '{{if ~tagCtx.index===0}}' + // Render once only\n      '<table class=\"tabsview\"><tbody>' +\n        // Tab strip UI with 'click' handler calling tag.setTab() method\n        '<tr class=\"tabstrip\">' +\n          '{{for ~tag.tagCtxs}}' +\n            '<th data-link=\"class{:\\'header_\\' + (#index === ~tag.pane)} {on ~tag.setTab #index} {:props.caption}\"></th>' +\n          '{{/for}}' +\n        '</tr>' +\n        // Tab content with wrapped content of selected {{else}} block\n        '<tr class=\"tabscontent\">' +\n          '<td colspan=\"{{:~tag.tagCtxs.length}}\" data-link=\"{include ^tmpl=~tag.tagCtxs[~tag.pane].content}\"></td>' +\n        '</tr>' +\n      '</tbody></table>' +\n    '{{/if}}',\n\n  // JsViews handlers and methods\n  onUpdate: false,\n\n  // tag properties/state\n  pane: 0, // selected pane (defaults to 0)\n\n  // tag methods\n  setValue: function(val) {\n    if (val !== undefined) {\n      $.observable(this).setProperty(\"pane\", val); // Update tag.pane\n    }\n  },\n\n  setTab: function(index) {\n    // OnClick for a tab\n    this.setValue(index); // Update UI: select tab pane 'index' \n    this.updateValue(index); // Update external data, through two-way binding\n  }\n}\n});\n\n})(this.jQuery);\n\n\n<div id=\"tabsView\"></div>\r\n\r\n<script id=\"tabsTmpl\" type=\"text/x-jsrender\">\r\n{^{tabs pane=~state.outerSelect ^width=width height=125 caption=\"first\" class=\"myTabs\"}}\r\n  <div class=\"special\">Some tabbed content:</div>\r\n  {^{tabs pane=~state.innerSelect\r\n    ^width=(width-23) height=35 caption=\"Inner One\"}}\r\n    ONE inner\r\n  {{else caption=\"Inner Two\"}}\r\n    TWO {{>label2}}\r\n  {{else caption=\"Inner Three\"}}\r\n    THREE inner\r\n  {{/tabs}}\r\n{{else caption=\"second\"}}\r\n  <ul><li>Some</li><li>other</li><li>content</li></ul>\r\n{{/tabs}}\r\n\r\n<div class=\"left\">\r\nOuter Select<br/>\r\n{^{radiogroup ~state.outerSelect convert=~toString convertBack=~toInt}}\r\n  <label><input type=\"radio\" value=\"0\"/> 0</label><br/>\r\n  <label><input type=\"radio\" value=\"1\"/> 1</label><br/>\r\n{{/radiogroup}}\r\n</div>\r\n\r\n<div class=\"left\">\r\nInner Select<br/>\r\n{^{radiogroup ~state.innerSelect convert=~toString convertBack=~toInt}}\r\n  <label><input type=\"radio\" value=\"0\"/> 0</label><br/>\r\n  <label><input type=\"radio\" value=\"1\"/> 1</label><br/>\r\n  <label><input type=\"radio\" value=\"2\"/> 2</label><br/>\r\n{{/radiogroup}}\r\n</div>\r\n\r\n</script>\n"
      },
      {
        "_type": "para",
        "title": "Multiple two-way binding to args or props",
        "text": "Multiple two-way binding to args or props\nTag controls can have two-way binding to multiple arguments or properties. The following {{areaslider}} sample is a two-dimensional version of the {{slider}} tag control above.\nIt has bindTo: [0, 1] specifying two-way binding to the first and second argument:\n{^{areaslider x y .../}}\n\nIn the moveTo() method, it uses the setValues(x, y) and updateValues(x, y) tag methods in order to pass multiple values, rather than using the single-value versions setValue() and updateValue().\nThe example has two instances of the {{areaslider}} bound to the same data values, x, and y, but with different ‘range’ settings (xMin etc.). This shows clearly the two-way binding…\n"
      },
      {
        "_type": "sample",
        "title": "{{areaslider}}",
        "text": "{{areaslider}}\n\n  {^{areaslider x y xMin=0 xMax=100 yMin=0 yMax=50 class=\"slider1\"/}}\n  {^{areaslider x y xMin=100 xMax=0 yMin=0 yMax=50 class=\"slider1\"/}}\n  <input data-link=\"x\"/><br/>\n  <input data-link=\"y\"/>\n\n\n\n\n$.views.tags({\nareaslider: {\n  bindTo: [0, 1],\n  setSize: true,\n  mainElement: \".box\",\n\n  // Movable slider handle, within slider box\n  template: '',\n\n  init: function(tagCtx) {\n    // Define handler specific to this slider, to be used for end of drag\n    this.mouseMoveOff = function() {\n      $(document).off(\"mousemove touchmove\");\n    };\n  },\n\n  onBind: function(tagCtx) {\n    var tag = this,\n      xMin = tagCtx.props.xMin,\n      xMax = tagCtx.props.xMax,\n      yMin = tagCtx.props.yMin,\n      yMax = tagCtx.props.yMax;\n    tagCtx.handle = tagCtx.mainElem.find(\".handle\").first();\n\n    // Register handler for mouse click or start of drag\n    tagCtx.mainElem.on(\"mousedown touchstart\", function(ev) {\n      var newXVal, newYVal;\n      function valFromPosition(newX, newY) {\n        newXVal = clamp(\n          round(xMin + (newX - tagCtx.metrics.left)/tagCtx.metrics.xScale),\n          xMin, xMax);\n        newYVal = clamp(\n          round(yMin + (newY - tagCtx.metrics.top)/tagCtx.metrics.yScale),\n          yMin, yMax);\n      }\n      valFromPosition(ev.clientX, ev.clientY);\n      // User click in box: move handle to clicked position\n      tag.moveTo(newXVal, newYVal);\n\n      // Register handler for mousemove during drag\n      $(document).on(\"mousemove touchmove\", function(ev2) {\n        valFromPosition(ev2.clientX, ev2.clientY);\n        if (newXVal !== tagCtx.xVal || newYVal !== tagCtx.yVal) {\n          tagCtx.xVal = newXVal;\n          tagCtx.yVal = newYVal;\n          // User mousemove - sliding handle: move handle to new position\n          tag.moveTo(newXVal, newYVal);\n        }\n        ev.preventDefault();\n      });\n      ev.preventDefault();\n    });\n\n    // Register slider-specific handler for end of drag\n    $(document).on(\"mouseup touchend\", this.mouseMoveOff);\n  },\n\n  onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {\n    if (!eventArgs) {\n      this.setMetrics(tagCtx);\n    }\n  },\n  onUpdate: false,\n\n  setValue: function(val, index) {\n    // Move the handle to the new x-position or y-position\n    var tagCtx = this.tagCtx,\n      xMin = tagCtx.props.xMin,\n      xMax = tagCtx.props.xMax,\n      yMin = tagCtx.props.yMin,\n      yMax = tagCtx.props.yMax;\n      metrics = tagCtx.metrics;\n    if (index) { // Change in y-position\n      val = clamp(val, yMin, yMax);\n      tagCtx.handle.offset({top: (val-yMin)*metrics.yScale + metrics.top - metrics.handleHeight});\n    } else { // Change in x-position\n      val = clamp(val, xMin, xMax);\n      tagCtx.handle.offset({left: (val-xMin)*metrics.xScale + metrics.left - metrics.handleWidth});\n    }\n  },\n\n  moveTo: function(x, y) {\n    // Call setValues() to move the handle to new (x, y) position\n    this.setValues(x, y);\n    // Call updateValues() to change the external data-linked data to the new values (x, y)\n    this.updateValues(x, y, true); // Async update\n  },\n\n  setMetrics: function(tagCtx) {\n    var box = tagCtx.mainElem,\n      boxOffset = box.offset();\n    tagCtx.metrics = {\n      left: boxOffset.left,\n      top: boxOffset.top,\n      xScale: box.width()/(tagCtx.props.xMax - tagCtx.props.xMin),\n      yScale: box.height()/(tagCtx.props.yMax - tagCtx.props.yMin),\n      handleWidth: tagCtx.handle.width()/2,\n      handleHeight: tagCtx.handle.height()/2\n    };\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {x: 30, y: 10};\n\nmyTmpl.link(\"#page\", data);\n\nfunction round(val) {\n  return Math.round(100*val)/100;\n}\nfunction clamp(num, min, max) {\n  return min>max\n    ? num <= max ? max : num >= min ? min : num\n    : num <= min ? min : num >= max ? max : num;\n}\n{^{areaslider x y xMin=0 xMax=100 yMin=0 yMax=50 .../}}\n{^{areaslider x y xMin=100 xMax=0 yMin=0 yMax=50 .../}}\n\nareaslider: {\n  bindTo: [0, 1],\n  ...\n\n  // Movable slider handle, within slider box\n  template: '<div class=\"box\"><div class=\"handle\"></div></div>',\n\n  onBind: function(tagCtx) {\n    ...\n    // Register handler for mouse click or start of drag\n    tagCtx.mainElem.on(\"mousedown touchstart\", function(ev) {\n      ...\n      tag.moveTo(newXVal, newYVal); // User click in box: move handle to clicked position\n\n      // Register handler for mousemove during drag\n      $(document).on(\"mousemove touchmove\", function(ev2) {\n        ...\n        tag.moveTo(newXVal, newYVal); // User mousemove - sliding handle: move handle to new position\n    ...\n  },\n  ...\n  setValue: function(val, index) {\n    // Move the handle to the new x-position or y-position\n    ...\n    if (index) { // Change in y-position\n      ...\n      tagCtx.handle.offset({top:...});\n    } else { // Change in x-position\n      ...\n      tagCtx.handle.offset({left:...});\n  },\n\n  moveTo: function(x, y) {\n    // Call setValues() to move the handle to new (x, y) position\n    this.setValues(x, y);\n    // Call updateValues() to change the external data-linked data to the new values (x, y)\n    this.updateValues(x, y, true); // Async update\n  },\n  ...\n}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For more advanced examples of using setValue() and updateValue(), see the  color picker, and the multi-format color picker.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "hierarchypatterns": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This topic shows common tag control design patterns involving tag composition and tag hierarchy:\n\nComposite controls\nConverters\n\nFor other categories of tag control design pattern, see Layout and rendering design patterns and Data binding design patterns.\n"
      },
      {
        "_type": "para",
        "title": "Composite controls",
        "text": "Composite controls\nA very common pattern with custom tags (in JsRender) and tag controls (in JsViews) is for the custom tag to include other custom tags, combined together as a composite tag.\nFor example here is a custom {{onoff}} tag control which behaves like a regular checkbox, but which lets you specify images (icons) for the on and off states of the button:\n"
      },
      {
        "_type": "sample",
        "text": "\n  {^{onoff edit onsrc=~iconEdit offsrc=~iconNoEdit class='onoff1' /}}\n  {^{onoff edit onsrc=~iconNoSel offsrc=~iconSel class='onoff2'/}}\n  <input data-link=\"edit\" type=\"checkbox\"/>\n\n\n\n$.views.tags({\nonoff: {\n  dataBoundOnly: true,\n  template: '',\n  linkedCtxParam: \"on\",\n  displayElement: \"img\",\n  toggle: function() {\n    this.ctxPrm(\"on\", !this.ctxPrm(\"on\"));\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    edit: false\n  },\n  uiHelpers = {\n    iconEdit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8\"\n+ \"/9hAAAA4UlEQVQ4jZXTvUpDMRgG4Eesgi5adXV1EAdBwYI4e0Q3dwcXd70O6VKoODqJN+DiIP\"\n+ \"hXRbRIL8ghDcTDOZ7mhQ+SkDzkhxCyjgcMsC8za/jEBpbwiiIHuB8vjikjM9hBp1TbaMEPVkp\"\n+ \"oiqyiW1HXeCSc+aMBqcswNgq8VyBtvOCwCUiR5dKkRTzhqAmIyKACWcAzDpqA2THyJtxBmja+M\"\n+ \"V8HbAq3G3dShfSwVwd0cJX0C+EVUuQE55MCEflCH6c4xm0OAHPYxQXucJYL/Jc/wBZuMhZPYZQ\"\n+ \"OTAtfejhhjXD5Cy7fOa4Bo/DvAAAAAElFTkSuQmCC\",\n      iconNoEdit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf\"\n+ \"8/9hAAABJ0lEQVQ4jZXSP0sDMRzG8S/4B3RRa1dXoe2Z5HqiFRHcWtDV93Gcr0O6CIpT8U24dB\"\n+ \"BEreJQpO/ncZDW5AznGfgNucvz+SV3AUApbRnGskxk6fOfIcuuHB9qkahDQ44XdRnUBwwPapEs\"\n+ \"5iVEGStqcyhDL6iEfZ2yjFI+ldEMUA9Rwo4Mw0jdyfGILH053ufIKC80ygtVHWexxjH97thlIM\"\n+ \"ubMprzl6O8kPbYkuNZjrNyOAAC5IDt0qJNWZ5kOfefAwSAh0x+IRkb5XAc6LCqLgMZXtWh4Yc8\"\n+ \"bD0KyOFkGC52EkFkuZbhJA4Yekq59Y8T3YGlqAUEIcPNn9/AB4LwEWtyHCvlsvIvzIFYJ39U3Y\"\n+ \"NMhvuqcBmRZfYDXLAkw1iOaa2yzJRy9QVyXUUsviSJ/AAAAABJRU5ErkJggg==\",\n      iconNoSel: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8\"\n+ \"/9hAAAAXklEQVQ4je3ToRGAMBBE0dcHNoWkDBqIpxfKQtIEOhYBgmQGB0yQ+TPr9q+64yJgRs\"\n+ \"bxkFy6wY0VCxLGh6TSXascsWPwnqE4ESZsH+TKVtw+0Af+GYgaT5nGZ6LhnU94YkRZoAhnWgA\"\n+ \"AAABJRU5ErkJggg==\",\n      iconSel: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/\"\n+ \"9hAAAAxklEQVQ4ja3TP0qDMRjH8Q8IggrtWjfXokNHj9A/OnoCly4eQFrv4hl6ACmFQudOHb1\"\n+ \"A9zqILgk8vKQ1L/jAD5In+X5JIIE+phV5xrlC7fFTmafAddCTFhYY/JHbAN/gE8sseC8d7Uhl\"\n+ \"+IBhW0GER7mZBWe4x0UbOAq6afyByxPwuGmOV3hN8yWuGvAXJqn3gnlJALPUW+EuwA9hzwa7Y\"\n+ \"wJ4S/3vAlwlkI64x2NhrUpwqv5fUPOUY7ZR0OYzxayzoPY7N3MNvyKdYTRQV8pRAAAAAElFTk\"\n+ \"SuQmCC\"\n   };\n\nmyTmpl.link(\"#page\", data, uiHelpers);\nTemplate:\n{^{onoff edit onsrc=~iconEdit offsrc=~iconNoEdit ... /}}\n{^{onoff edit onsrc=~iconNoSel offsrc=~iconSel ... /}}\n<input data-link=\"edit\" type=\"checkbox\"/>\n\nCustom tag declaration:\n$.views.tags({\nonoff: {\n  ...\n  template: '<img data-link=\"'\n    + '{on ~tag.toggle'} // OnClick handler call toggle method\n    + 'src{:~on ? ~tagCtx.props.offsrc : ~tagCtx.props.onsrc} '// src for icon depends on boolean contextual parameter \"~on\"\n  + '\" />',\n  linkedCtxParam: \"on\", // Boolean contextual parameter bound to data\n  ...\n  toggle: function() { // toggle method\n    this.ctxPrm(\"on\", !this.ctxPrm(\"on\"));\n  }\n}});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now we’ll take the Editable {{namebox}} sample (from the Data binding design patterns topic) and convert it to be a composite tag incorporating the {{onoff}} tag as a component.\nThe template option in the {{namebox}} tag definition uses {{onoff}} bound to the internal ~edt contextual parameter:\n{^{onoff ~edt onsrc=~tag.icons.edit offsrc=~tag.icons.noEdit ... /}}\n\nIn this sample we also use the {{onoff}} tag control separately from {{namebox}}, bound to the boolean edit data.\n"
      },
      {
        "_type": "sample",
        "title": "The {{namebox}} composite control",
        "text": "The {{namebox}} composite control\n\n<label>\n  {^{onoff ~edt onsrc=~tag.icons.edit offsrc=~tag.icons.noEdit class='onoff' /}}\n  <span data-link=\"~cptn\"></span>:\n  {^{if ~edt}}\n    <input data-link='~frst'/> <input data-link='~lst'/>\n  {{else}}\n    {^{>~frst}} {^{>~lst}}\n  {{/if}}\n</label>\n\n\n\n{^{namebox first last caption=~fullName editable=edit class=\"tb1\"/}}<br/>\n\n<input data-link=\"~fullName\" class=\"left\"/>\n<input data-link=\"first\"/>\n<input data-link=\"last\"/>\n<label> Editable: {^{onoff edit onsrc=~iconNoSel offsrc=~iconSel class='onoff1'/}}</label>\n\n\n\n$.views.tags({\nonoff: {\n  dataBoundOnly: true,\n  template: '',\n  linkedCtxParam: \"on\",\n  displayElement: \"img\",\n  toggle: function() {\n    this.ctxPrm(\"on\", !this.ctxPrm(\"on\"));\n  }\n},\nnamebox: {\n  dataBoundOnly: true,\n  template: \"#nameboxTmpl\",\n  bindTo: [0, 1, \"caption\", \"editable\"],\n  linkedCtxParam: [\"frst\", \"lst\", \"cptn\", \"edt\"],\n  displayElement: \"label\",\n  onUpdate: false,\n  icons: {\n    edit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8\"\n+ \"/9hAAAA4UlEQVQ4jZXTvUpDMRgG4Eesgi5adXV1EAdBwYI4e0Q3dwcXd70O6VKoODqJN+DiIP\"\n+ \"hXRbRIL8ghDcTDOZ7mhQ+SkDzkhxCyjgcMsC8za/jEBpbwiiIHuB8vjikjM9hBp1TbaMEPVkp\"\n+ \"oiqyiW1HXeCSc+aMBqcswNgq8VyBtvOCwCUiR5dKkRTzhqAmIyKACWcAzDpqA2THyJtxBmja+M\"\n+ \"V8HbAq3G3dShfSwVwd0cJX0C+EVUuQE55MCEflCH6c4xm0OAHPYxQXucJYL/Jc/wBZuMhZPYZQ\"\n+ \"OTAtfejhhjXD5Cy7fOa4Bo/DvAAAAAElFTkSuQmCC\",\n    noEdit: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf\"\n+ \"8/9hAAABJ0lEQVQ4jZXSP0sDMRzG8S/4B3RRa1dXoe2Z5HqiFRHcWtDV93Gcr0O6CIpT8U24dB\"\n+ \"BEreJQpO/ncZDW5AznGfgNucvz+SV3AUApbRnGskxk6fOfIcuuHB9qkahDQ44XdRnUBwwPapEs\"\n+ \"5iVEGStqcyhDL6iEfZ2yjFI+ldEMUA9Rwo4Mw0jdyfGILH053ufIKC80ygtVHWexxjH97thlIM\"\n+ \"ubMprzl6O8kPbYkuNZjrNyOAAC5IDt0qJNWZ5kOfefAwSAh0x+IRkb5XAc6LCqLgMZXtWh4Yc8\"\n+ \"bD0KyOFkGC52EkFkuZbhJA4Yekq59Y8T3YGlqAUEIcPNn9/AB4LwEWtyHCvlsvIvzIFYJ39U3Y\"\n+ \"NMhvuqcBmRZfYDXLAkw1iOaa2yzJRy9QVyXUUsviSJ/AAAAABJRU5ErkJggg==\"\n    }\n  }\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\",\n    edit: false\n  }, \n  uiHelpers = {\n    fullName: \"Full name\",\n    iconNoSel: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8\"\n+ \"/9hAAAAXklEQVQ4je3ToRGAMBBE0dcHNoWkDBqIpxfKQtIEOhYBgmQGB0yQ+TPr9q+64yJgRs\"\n+ \"bxkFy6wY0VCxLGh6TSXascsWPwnqE4ESZsH+TKVtw+0Af+GYgaT5nGZ6LhnU94YkRZoAhnWgA\"\n+ \"AAABJRU5ErkJggg==\",\n    iconSel: \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/\"\n+ \"9hAAAAxklEQVQ4ja3TP0qDMRjH8Q8IggrtWjfXokNHj9A/OnoCly4eQFrv4hl6ACmFQudOHb1\"\n+ \"A9zqILgk8vKQ1L/jAD5In+X5JIIE+phV5xrlC7fFTmafAddCTFhYY/JHbAN/gE8sseC8d7Uhl\"\n+ \"+IBhW0GER7mZBWe4x0UbOAq6afyByxPwuGmOV3hN8yWuGvAXJqn3gnlJALPUW+EuwA9hzwa7Y\"\n+ \"wJ4S/3vAlwlkI64x2NhrUpwqv5fUPOUY7ZR0OYzxayzoPY7N3MNvyKdYTRQV8pRAAAAAElFTk\"\n+ \"SuQmCC\"\n  };\n\nmyTmpl.link(\"#page\", data, uiHelpers);\nnameboxTmpl:\n...\n  {^{onoff ~edt onsrc=~tag.icons.edit offsrc=~tag.icons.noEdit ... /}}\n  <span data-link=\"~cptn\"></span>:\n  {^{if ~edt}}\n    <input data-link='~frst'/> <input data-link='~lst'/>\n  {{else}}\n    {^{:~frst}} {^{:~lst}}\n  {{/if}}\n...\n\nTemplate:\n{^{namebox first last caption=~fullName editable=edit ... /}}\n...\nEditable: {^{onoff edit onsrc=... offsrc=... /}}\n\nCustom tag declarations:\n$.views.tags({\n  onoff: {...},\n  namebox: {\n    ...\n    template: \"#nameboxTmpl\",\n    bindTo: [0, 1, \"caption\", \"editable\"],\n    linkedCtxParam: [\"frst\", \"lst\", \"cptn\", \"edt\"],\n    ...\n    icons: {edit: \"...\", noEdit: \"...\"}\n  }\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Our next sample is a much richer tag control: {{picker}} – a color picker tag control based on the Chrome devtools color picker (which itself is based on the Spectrum color picker).\nOur {{picker}} (which uses helper functions from tinycolor.js) is a composite control which incorporates the following tag controls:\n\nslider\nareaslider\nspinblock\n\nIt is available at www.jsviews.com/download/sample-tag-controls/colorpicker/colorpicker.js.\nThe {{picker}} template is as follows:\n{^{areaslider ~s ~v xMin=0 xMax=1 yMin=1 yMax=0 width=\"100%\" convert=~cvt convertBack=~cbk}}\n  <div ... data-link=\"css-background-color{rgb:~h 100 100}\">\n    <div class=\"...\">\n      <div class=\"dragger\" data-link=\"css-background-color{rgb:~h ~s ~v}\"></div>\n    </div>\n  </div>\n{{/areaslider}}\n<span class=\"swatch\">\n  <span ... data-link=\"css-background-color{rgba:~h ~s ~v ~a}\"></span>\n</span>\n{^{slider ~h min=360 max=0 class=\"hue\"/}}\n{^{slider ~a min=0 max=1}}\n  <div class=\"...\">\n    <div class=\"handle\"></div>\n    <div class=\"alpha-background\" data-link=\"css-background-image{rgbGrad:~h ~s ~v}\"></div>\n  </div>\n{{/slider}}\n{^{spinblock}}\n  <div ...>\n    <input ... data-link=\"{hex:~h ~s ~v ~a:fromhex}\"/>\n    <div ...>HEX</div>\n  </div>\n{{else}}\n  ...\n{{else}}\n  ...\n{{/spinblock}}\n\nIn the onBind() handler, tag properties are set pointing to each of the component tag controls:\nonBind: function() {\n  // Provide reference vars to access component controls\n  var tag = this,\n    sliders = tag.childTags(\"slider\");\n  tag.hueslider = sliders[0];\n  tag.alphaslider = sliders[1];\n  tag.areaslider = tag.childTags(\"areaslider\")[0];\n}\n\nThen in the initial call to onAfterLink() (for which eventArgs is undefined), the metrics of each component control are updated:\nonAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {\n  if (!eventArgs) {\n    // Update the UI width height and position metrics for each component control\n    var tag = this;\n    tag.hueslider.setMetrics();\n    tag.alphaslider.setMetrics();\n    tag.areaslider.setMetrics();\n  }\n}\n\nThe {{picker}} control uses the HSVA color format, with the four color values binding to arguments 0, 1, 2 and 3:\nbindTo: [0, 1, 2, 3],\nlinkedCtxParam: [\"h\", \"s\", \"v\", \"a\"],\n\n"
      },
      {
        "_type": "sample",
        "title": "The {{picker}} composite control",
        "url": "samples/tag-controls/colorpicker/colorpicker",
        "text": "The {{picker}} composite control\n{^{picker color.h color.s color.v color.a ... /}}\n\n<div ... data-link=\"css-background-color{rgba:color.h color.s color.v color.a}\">\n  {^{rgba:color.h color.s color.v color.a}} ...\n  {^{hex:color.h color.s color.v color.a}}\n</div>\n\n<div ...>\n  h: <input data-link=\"color.h\"/>\n  ...\n</div>\n\n\n\"use strict\";\nvar myTmpl = $.templates(\"#myTmpl\");\n\nmyTmpl.link('#page', {\n  color: {h:194, s: 0.25, v: 0.9, a: 1}\n});\n/*! Sample JsViews tag control: {{picker}} control v1.0.0\nsee: http://www.jsviews.com/#download/sample-tagcontrols */\n/*\n * Copyright 2018, Boris Moore\n * Released under the MIT License.\n */\n\n(function($) {\n\"use strict\";\n\n$.views.tags({\npicker: {\n  // Bind to HSVA color parameters\n  bindTo: [0, 1, 2, 3],\n  linkedCtxParam: [\"h\", \"s\", \"v\", \"a\"],\n  mainElement: \"div\",\n  onBind: function() {\n    // Provide reference vars to access component controls\n    var tag = this,\n      sliders = tag.childTags(\"slider\");\n    tag.hueslider = sliders[0];\n    tag.alphaslider = sliders[1];\n    tag.areaslider = tag.childTags(\"areaslider\")[0];\n  },\n  onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {\n    if (!eventArgs) {\n      // Update the UI width height and position metrics for each component control\n      var tag = this;\n      tag.hueslider.setMetrics();\n      tag.alphaslider.setMetrics();\n      tag.areaslider.setMetrics();\n    }\n  },\n  template: {\n    // The template markup\n    markup:\n      '<div class=\"popover\">'\n      + '{^{areaslider ~s ~v xMin=0 xMax=1 yMin=1 yMax=0 width=\"100%\" convert=~cvt convertBack=~cbk}}'\n        + '<div class=\"sliderbox sat fill\" data-link=\"css-background-color{rgb:~h 100 100}\">'\n          + '<div class=\"val fill\">'\n            + '<div class=\"dragger\" data-link=\"css-background-color{rgb:~h ~s ~v}\"></div>'\n          + '</div>'\n        + '</div>'\n      + '{{/areaslider}}'\n      + '<span class=\"swatch\">'\n        + '<span class=\"swatch-inner\" data-link=\"css-background-color{rgba:~h ~s ~v ~a}\"></span>'\n      + '</span>'\n      + '{^{slider ~h min=360 max=0 class=\"hue\"/}}'\n      + '{^{slider ~a min=0 max=1}}'\n        + '<div class=\"sliderbox alpha\">'\n          + '<div class=\"handle\"></div>'\n          + '<div class=\"alpha-background\" data-link=\"css-background-image{rgbGrad:~h ~s ~v}\"></div>'\n        + '</div>'\n      + '{{/slider}}'\n      + '{^{spinblock}}'\n        + '<div class=\"spinblock-text spinblock-hex\">'\n          + '<input class=\"spinblock-value\" maxlength=\"20\" data-link=\"{hex:~h ~s ~v ~a:fromhex}\"/>'\n          + '<div class=\"spinblock-label\">HEX</div>'\n        + '</div>'\n      + '{{else}}'\n        + '<div class=\"spinblock-text\">'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"{r:~h ~s ~v:rtohsv}\"/>'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"{g:~h ~s ~v:gtohsv}\"/>'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"{b:~h ~s ~v:btohsv}\"/>'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"~a\"/>'\n          + '<div class=\"spinblock-label\">RGBA</div>'\n        + '</div>'\n      + '{{else}}'\n        + '<div class=\"spinblock-text\">'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"{rnd:~h:rnd}\"/>'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"{shsl:~h ~s ~v ~a:stohsv}\"/>'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"{lhsl:~h ~s ~v ~a:ltohsv}\"/>'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"~a\"/>'\n          + '<div class=\"spinblock-label\">HSLA</div>'\n        + '</div>'\n      + '{{/spinblock}}'\n    + '</div>',\n\n    // Color converters used within the template (defined as converters scoped to this template)\n    converters : {\n      rnd: function(val) { \n        return Math.round(val);\n      },\n      fromhex: function(hex) { \n        updateHslaValues(this, validateTiny(hex));\n      },\n      stohsv: function(s) { \n        if (/^[\\d\\.]{1,3}%$/.test(s)) {\n          var hsl = currentColor(this).toHsl();\n          hsl.s = s;\n          updateHslaValues(this, validateTiny(hsl));\n        }\n      },\n      ltohsv: function(l) { \n        if (/^[\\d\\.]{1,3}%$/.test(l)) {\n          var hsl = currentColor(this).toHsl();\n          hsl.l = l;\n          updateHslaValues(this, validateTiny(hsl));\n        }\n      },\n      rtohsv: function(r) { \n        if (/^\\d{1,3}$/.test(r)) {\n          var rgb = currentColor(this).toRgb();\n          rgb.r = r;\n          updateHslaValues(this, validateTiny(rgb));\n        }\n      },\n      gtohsv: function(g) { \n        if (/^\\d{1,3}$/.test(g)) {\n          var rgb = currentColor(this).toRgb();\n          rgb.g = g;\n          updateHslaValues(this, validateTiny(rgb));\n        }\n      },\n      btohsv: function(b) { \n        if (/^\\d{1,3}$/.test(b)) {\n          var rgb = currentColor(this).toRgb();\n          rgb.b = b;\n          updateHslaValues(this, validateTiny(rgb));\n        }\n      },\n      lhsl: function(h, s, v, a) {\n        return Math.round(color(h, s, v, a).toHsl().l*100) + \"%\";\n      },\n      shsl: function(h, s, v, a) {\n        return Math.round(color(h, s, v, a).toHsl().s*100) + \"%\";\n      },\n      r: function(h, s, v, a) {\n        return color(h, s, v, a).toRgb().r;\n      },\n      g: function(h, s, v, a) {\n        return color(h, s, v, a).toRgb().g;\n      },\n      b: function(h, s, v, a) {\n        return color(h, s, v, a).toRgb().b;\n      },\n      rgb: function(h, s, v, a) {\n        return tinycolor({h: h, s: s, v: v}).toRgbString();\n      },\n      rgbGrad: function(h, s, v) {\n        return \"linear-gradient(to right, rgba(0, 0, 0, 0), \" + tinycolor({h: h, s: s, v: v}).toRgbString() + \")\";\n      }\n    }\n  },\n  onUpdate: false\n}\n});\n\n$.views.converters({ // Global converters\n  hex: function(h, s, v, a) {\n    return (a < 1 ? color(h, s, v, a).toHex8String(true) : tinycolor({h: h, s: s, v: v}).toHexString(true));\n  },\n  rgba: function(h, s, v, a) { \n    return color(h, s, v, a).toRgbString();\n  }\n});\n\n// Utility functions\n\nfunction round(val) {\n  return Math.round(100*val)/100;\n}\n\nfunction clamp(num, min, max) {\n  return min>max\n    ? num <= max ? max : num >= min ? min : num\n    : num <= min ? min : num >= max ? max : num;\n}\n\nfunction validateTiny(clr) {\n  var tiny = tinycolor(clr);\n  if (!tiny.isValid()) {\n    return;\n  }\n  tiny = tiny.toHsv();\n  return [round(tiny.h), round(tiny.s), round(tiny.v), round(tiny.a)];\n}\n\nfunction currentColor(tag) {\n  return tinycolor({h: tag.ctxPrm(\"h\"), s: tag.ctxPrm(\"s\"), v:  tag.ctxPrm(\"v\"), a: tag.ctxPrm(\"a\")});\n}\n\nfunction color(h, s, v, a) {\n  return tinycolor({h: h, s: s, v: v, a: a});\n}\n\nfunction updateHslaValues(tag, hsla) {\n  if (hsla) {\n    tag.ctx.parentTags.picker\n      .updateValues(hsla[0], hsla[1], hsla[2], hsla[3])\n      .setValues(hsla[0], hsla[1], hsla[2], hsla[3]);\n  }\n}\n\n})(this.jQuery);\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\r\n{^{picker color.h color.s color.v color.a class=\"picker\"/}}\r\n\r\n<div class=\"box\" data-link=\"css-background-color{rgba:color.h color.s color.v color.a}\">\r\n  {^{rgba:color.h color.s color.v color.a}}<br/>\r\n  {^{hex:color.h color.s color.v color.a}}\r\n</div>\r\n\r\n<div class=\"inputs\">\r\n  h: <input data-link=\"color.h\"/><br/>\r\n  s: <input data-link=\"color.s\"/><br/>\r\n  v: <input data-link=\"color.v\"/><br/>\r\n  a: <input data-link=\"color.a\"/><br/><br/>\r\n</div>\r\n</script>\r\n\r\n<div id=\"page\"></div>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For variants of the {{picker}} color picker control, see also the Multi-format {{picker}} control below, as well as alternatives shown in the color picker samples topic.\n"
      },
      {
        "_type": "para",
        "title": "Converters",
        "text": "Converters\nA custom tag can use converters. (See Using converters with other tags and Two-way binding: convert and convert back.)\nConverters can be specified on tag instances: {^{mytag convert=... convertBack=... ... /}} or as convert and convertBack tag options.\nIf a custom tag has a bindTo option which is an array (specifying binding to multiple arguments or properties) then convert and convertBack receive multiple arguments and return arrays.\nThe next sample shows a {{namebox}} tag which has built-in convert/convertBack option settings that swap the first and last names if the reverse property is true.\nHere is the {{namebox}} tag definition:\nbindTo: [0, 1],\nlinkedElement: [\".firstnm\", \".lastnm\"],\n...\ntemplate:\n  '<div>' +\n    '<span data-link=\"~tagCtx.props.caption\"></span>: ' +\n    '<input class=\"firstnm\"/> ' +\n    '<input class=\"lastnm\"/>' +\n  '</div>',\n\nconvert: function(first, last) {\n  // Swap arguments if props.reverse is true\n  return this.tagCtx.props.reverse ? [last, first] : [first, last];\n},\n\nconvertBack: function(first, last) {\n  // If arguments were swapped, (i.e. if props.reverse true) swap them back again\n  return this.tagCtx.props.reverse ? [last, first] : [first, last];\n}\n\n"
      },
      {
        "_type": "sample",
        "text": "\n{^{namebox first last caption=\"First/Last\" class=\"tb1\"/}}\n{^{namebox first last caption=\"Last/First\" reverse=true class=\"tb1\"/}}\n\n<div class=\"left\">\n  <input data-link=\"first\"/>\n  <input data-link=\"last\"/>\n</div>\n\n\n\n\n$.views.tags({\nnamebox: {\n  dataBoundOnly: true,\n  bindTo: [0, 1],\n  linkedElement: [\".firstnm\", \".lastnm\"],\n  displayElement: \"div\",\n  onUpdate: false,\n\n  template:\n    '' +\n      ': ' +\n      ' ' +\n      '' +\n    '',\n\n  convert: function(first, last) {\n    // Swap arguments if props.reverse is true\n    return this.tagCtx.props.reverse ? [last, first] : [first, last];\n  },\n\n  convertBack: function(first, last) {\n    // If arguments were swapped, (i.e. if props.reverse true) swap them back again\n    return this.tagCtx.props.reverse ? [last, first] : [first, last];\n  }\n}\n});\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  data = {\n    first: \"Jo\",\n    last: \"Blow\"\n  };\n\nmyTmpl.link(\"#page\", data);\n{^{namebox first last caption=\"First/Last\" ... /}}\n{^{namebox first last caption=\"Last/First\" reverse=true ... /}}\n\n<div ... >\n  <input data-link=\"first\"/>\n  <input data-link=\"last\"/>\n</div>\n</script>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Multi-format {{picker}} control",
        "text": "Multi-format {{picker}} control\nWe will take the technique of custom tags with built-in converters a step further, in the next sample: An improved version of the color picker above, which can bind to multiple alternative data formats: HSVA, RGBA and HEX.\nIt is available at www.jsviews.com/download/sample-tag-controls/colorpicker/colorpicker-multiformat.js.\nHere is the tag definition of the ‘multi-format’ {{picker}}, with the added convert and convertBack options:\n// Bind to HSVA color parameters and mode. Color parameters will be HSVA, RGBA or HEX, depending on mode\nbindTo: [0, 1, 2, 3, \"mode\"],\nlinkedCtxParam: [\"h\", \"s\", \"v\", \"a\", undefined],\n...\nconvert: function(arg1, arg2, arg3, arg4, mode) {\n  mode = mode || \"hsva\";\n  var arg;\n  switch (mode) {\n    case \"hsva\":\n      // This is our internal format, so return as is\n      return [arg1, arg2, arg3, arg4, mode];\n    case \"rgba\":\n      // Convert from RGBA to our internal HSVA format\n      arg = tinycolor({r: arg1, g: arg2, b: arg3, a: arg4}).toHsv();\n      break;\n    case \"hex\":\n      // Convert from HEX to our internal HSVA format\n      arg = tinycolor(arg1).toHsv();\n      break;\n  }\n  return [arg.h, arg.s, arg.v, arg.a, mode];\n},\n\nconvertBack: function() {\n  var color, ret,\n    args = $.extend([], this.currentHsvaColor, arguments),\n    h = args[0], s = args[1], v = args[2], a = args[3], mode = args[4];\n\n  switch (mode) {\n    case \"hsva\":\n      // External format is same as internal format, so return as is\n      ret = [h, s, v, a];\n      break;\n    case \"rgba\":\n      color = tinycolor({h: h, s: s, v: v, a: a});\n      // Convert from internal HSVA format to RGBA external format\n      color = color.toRgb();\n      ret = [color.r, color.g, color.b, color.a];\n      break;\n    case \"hex\":\n      // Convert from internal HSVA format to HEX external format\n      color = tinycolor({h: h, s: s, v: v, a: a});\n      ret = [color.toHex8String()];\n  }\n  ret.arg0 = false; // Return array for multiple bindTo targets, with arg0 false - to indicate\n  // that this targets multiple args, not just the first one\n  return ret;\n},\n\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/colorpicker/colorpicker-multiformat",
        "text": "Default mode: HSVA format – binding to color1 data:\n{^{picker color1.h color1.s color1.v color1.a ... /}}\n...\nh: <input data-link=\"color1.h\"/>\n...\n\nAlternative RGBA format – mode set to \"rgba\" – binding to color2 data:\n{^{picker color2.r color2.g color2.b color2.a mode=\"rgba\" ... /}}\n...\nr: <input data-link=\"color2.r\"/>\n...\n\nAlternative HEX format – mode set to \"hex\" – binding to color3 data:\n{^{picker color3.hex mode=\"hex\" ... /}}\n...\nhex: <input data-link=\"color3.hex\"/>\n...\n\n\n\"use strict\";\nvar myTmpl = $.templates(\"#myTmpl\");\n\nmyTmpl.link('#page', {\n  color1: {h:194, s: 0.25, v: 0.9, a: 1},\n  color2: {r:172, g: 216, b: 230, a: 1},\n  color3: {hex:\"#acd8e6\"}\n});\n/*! Sample JsViews tag control: {{picker}} control v1.0.8\nsee: http://www.jsviews.com/#download/sample-tagcontrols */\n/*\n * Copyright 2019, Boris Moore\n * Released under the MIT License.\n */\n\n(function($) {\n\"use strict\";\n\n$.views.tags({\npicker: {\n  // Bind to HSVA color parameters and mode. Color parameters will be HSVA, RGBA or HEX, depending on mode\n  bindTo: [0, 1, 2, 3, \"mode\"],\n  linkedCtxParam: [\"h\", \"s\", \"v\", \"a\", undefined],\n  mainElement: \"div\",\n  onBind: function() {\n    // Provide reference vars to access component controls\n    var tag = this,\n      sliders = tag.childTags(\"slider\");\n    tag.hueslider = sliders[0];\n    tag.alphaslider = sliders[1];\n    tag.areaslider = tag.childTags(\"areaslider\")[0];\n    tag.currentHsvaColor = [];\n  },\n  setValue: function(val, i, tagElse) {\n    this.currentHsvaColor[i] = val;\n  },\n  onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {\n    if (!eventArgs) {\n      // Update the UI width height and position metrics for each component control\n      var tag = this;\n      tag.hueslider.setMetrics();\n      tag.alphaslider.setMetrics();\n      tag.areaslider.setMetrics();\n    }\n  },\n  convert: function(arg1, arg2, arg3, arg4, mode) {\n    mode = mode || \"hsva\";\n    var arg;\n    switch (mode) {\n      case \"hsva\":\n        // This is our internal format, so return as is\n        return [arg1, arg2, arg3, arg4, mode];\n      case \"rgba\":\n        // Convert from RGBA to our internal HSVA format\n        arg = tinycolor({r: arg1, g: arg2, b: arg3, a: arg4}).toHsv();\n        break;\n      case \"hex\":\n        // Convert from HEX to our internal HSVA format\n        arg = tinycolor(arg1).toHsv();\n        break;\n    }\n    return [arg.h, arg.s, arg.v, arg.a, mode];\n  },\n  convertBack: function() {\n    var color, ret,\n      args = $.extend([], this.currentHsvaColor, arguments),\n      h = args[0], s = args[1], v = args[2], a = args[3], mode = args[4];\n\n    switch (mode) {\n      case \"hsva\":\n        // External format is same as internal format, so return as is\n        ret = [h, s, v, a];\n        break;\n      case \"rgba\":\n        color = tinycolor({h: h, s: s, v: v, a: a});\n        // Convert from internal HSVA format to RGBA external format\n        color = color.toRgb();\n        ret = [color.r, color.g, color.b, color.a];\n        break;\n      case \"hex\":\n        // Convert from internal HSVA format to HEX external format\n        color = tinycolor({h: h, s: s, v: v, a: a});\n        ret = [color.toHex8String()];\n    }\n    ret.arg0 = false; // Return array for multiple bindTo targets, with arg0 false - to indicate\n    // that this targets multiple args, not just the first one\n    return ret;\n  },\n  template: {\n    // The template markup\n    markup:\n      '<div class=\"popover\">'\n      + '{^{areaslider ~s ~v xMin=0 xMax=1 yMin=1 yMax=0 width=\"100%\" convert=~cvt convertBack=~cbk}}'\n        + '<div class=\"sliderbox sat fill\" data-link=\"css-background-color{rgb:~h 100 100}\">'\n          + '<div class=\"val fill\">'\n            + '<div class=\"dragger\" data-link=\"css-background-color{rgb:~h ~s ~v}\"></div>'\n          + '</div>'\n        + '</div>'\n      + '{{/areaslider}}'\n      + '<span class=\"swatch\">'\n        + '<span class=\"swatch-inner\" data-link=\"css-background-color{rgba:~h ~s ~v ~a}\"></span>'\n      + '</span>'\n      + '{^{slider ~h min=360 max=0 class=\"hue\"/}}'\n      + '{^{slider ~a min=0 max=1}}'\n        + '<div class=\"sliderbox alpha\">'\n          + '<div class=\"handle\"></div>'\n          + '<div class=\"alpha-background\" data-link=\"css-background-image{rgbGrad:~h ~s ~v}\"></div>'\n        + '</div>'\n      + '{{/slider}}'\n      + '{^{spinblock}}'\n        + '<div class=\"spinblock-text spinblock-hex\">'\n          + '<input class=\"spinblock-value\" maxlength=\"20\" data-link=\"{hex:~h ~s ~v ~a:fromhex}\"/>'\n          + '<div class=\"spinblock-label\">HEX</div>'\n        + '</div>'\n      + '{{else}}'\n        + '<div class=\"spinblock-text\">'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"{r:~h ~s ~v:rtohsv}\"/>'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"{g:~h ~s ~v:gtohsv}\"/>'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"{b:~h ~s ~v:btohsv}\"/>'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"~a\"/>'\n          + '<div class=\"spinblock-label\">RGBA</div>'\n        + '</div>'\n      + '{{else}}'\n        + '<div class=\"spinblock-text\">'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"{rnd:~h:rnd}\"/>'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"{shsl:~h ~s ~v ~a:stohsv}\"/>'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"{lhsl:~h ~s ~v ~a:ltohsv}\"/>'\n          + '<input class=\"spinblock-value\" maxlength=\"4\" data-link=\"~a\"/>'\n          + '<div class=\"spinblock-label\">HSLA</div>'\n        + '</div>'\n      + '{{/spinblock}}'\n    + '</div>',\n\n    // Color converters used within the template (defined as converters scoped to this template)\n    converters : {\n      rnd: function(val) { \n        return Math.round(val);\n      },\n      fromhex: function(hex) { \n        updateHslaValues(this, validateTiny(hex));\n      },\n      stohsv: function(s) { \n        if (/^[\\d\\.]{1,3}%$/.test(s)) {\n          var hsl = currentColor(this).toHsl();\n          hsl.s = s;\n          updateHslaValues(this, validateTiny(hsl));\n        }\n      },\n      ltohsv: function(l) { \n        if (/^[\\d\\.]{1,3}%$/.test(l)) {\n          var hsl = currentColor(this).toHsl();\n          hsl.l = l;\n          updateHslaValues(this, validateTiny(hsl));\n        }\n      },\n      rtohsv: function(r) { \n        if (/^\\d{1,3}$/.test(r)) {\n          var rgb = currentColor(this).toRgb();\n          rgb.r = r;\n          updateHslaValues(this, validateTiny(rgb));\n        }\n      },\n      gtohsv: function(g) { \n        if (/^\\d{1,3}$/.test(g)) {\n          var rgb = currentColor(this).toRgb();\n          rgb.g = g;\n          updateHslaValues(this, validateTiny(rgb));\n        }\n      },\n      btohsv: function(b) { \n        if (/^\\d{1,3}$/.test(b)) {\n          var rgb = currentColor(this).toRgb();\n          rgb.b = b;\n          updateHslaValues(this, validateTiny(rgb));\n        }\n      },\n      lhsl: function(h, s, v, a) {\n        return Math.round(color(h, s, v, a).toHsl().l*100) + \"%\";\n      },\n      shsl: function(h, s, v, a) {\n        return Math.round(color(h, s, v, a).toHsl().s*100) + \"%\";\n      },\n      r: function(h, s, v, a) {\n        return color(h, s, v, a).toRgb().r;\n      },\n      g: function(h, s, v, a) {\n        return color(h, s, v, a).toRgb().g;\n      },\n      b: function(h, s, v, a) {\n        return color(h, s, v, a).toRgb().b;\n      },\n      rgb: function(h, s, v, a) {\n        return tinycolor({h: h, s: s, v: v}).toRgbString();\n      },\n      rgbGrad: function(h, s, v) {\n        return \"linear-gradient(to right, rgba(0, 0, 0, 0), \" + tinycolor({h: h, s: s, v: v}).toRgbString() + \")\";\n      }\n    }\n  },\n  onUpdate: false\n}\n});\n\n$.views.converters({ // Global converters\n  hex: function(h, s, v, a) {\n    return (a < 1 ? color(h, s, v, a).toHex8String(true) : tinycolor({h: h, s: s, v: v}).toHexString(true));\n  },\n  rgba: function(h, s, v, a) { \n    return color(h, s, v, a).toRgbString();\n  },\n  rgbafromrgb: function(r, g, b, a) { \n    return tinycolor({r: r, g: g, b: b, a: a}).toRgbString();\n  },\n  hexfromrgb: function(r, g, b, a) {\n    return (a < 1 ? tinycolor({r: r, g: g, b: b, a: a}).toHex8String(true) : tinycolor({r: r, g: g, b: b}).toHexString(true));\n  },\n  rgbafromhex: function(hex) { \n    return tinycolor(hex).toRgbString();\n  }\n});\n\n// Utility functions\n\nfunction round(val) {\n  return Math.round(100*val)/100;\n}\n\nfunction clamp(num, min, max) {\n  return min>max\n    ? num <= max ? max : num >= min ? min : num\n    : num <= min ? min : num >= max ? max : num;\n}\n\nfunction validateTiny(clr) {\n  var tiny = tinycolor(clr);\n  if (!tiny.isValid()) {\n    return;\n  }\n  tiny = tiny.toHsv();\n  return [round(tiny.h), round(tiny.s), round(tiny.v), round(tiny.a)];\n}\n\nfunction currentColor(tag) {\n  return tinycolor({h: tag.ctxPrm(\"h\"), s: tag.ctxPrm(\"s\"), v:  tag.ctxPrm(\"v\"), a: tag.ctxPrm(\"a\")});\n}\n\nfunction color(h, s, v, a) {\n  return tinycolor({h: h, s: s, v: v, a: a});\n}\n\nfunction updateHslaValues(tag, hsla) {\n  if (hsla) {\n    tag.ctx.parentTags.picker\n      .setValues(hsla[0], hsla[1], hsla[2], hsla[3])\n      .updateValues(hsla[0], hsla[1], hsla[2], hsla[3]);\n  }\n}\n\n})(this.jQuery);\n\n<script id=\"myTmpl\" type=\"text/x-jsrender\">\r\n{^{picker color1.h color1.s color1.v color1.a class=\"picker1\"/}}\r\n\r\n<div class=\"inputs1\">\r\n  h: <input data-link=\"color1.h\"/><br/>\r\n  s: <input data-link=\"color1.s\"/><br/>\r\n  v: <input data-link=\"color1.v\"/><br/>\r\n  a: <input data-link=\"color1.a\"/>\r\n</div>\r\n<div class=\"box1\" data-link=\"css-background-color{rgba:color1.h color1.s color1.v color1.a}\">\r\n  {^{rgba:color1.h color1.s color1.v color1.a}}<br/>{^{hex:color1.h color1.s color1.v color1.a}}\r\n</div>\r\n\r\n{^{picker color2.r color2.g color2.b color2.a mode=\"rgba\" class=\"picker2\"/}}\r\n\r\n<div class=\"inputs2\">\r\n  r: <input data-link=\"color2.r\"/><br/>\r\n  g: <input data-link=\"color2.g\"/><br/>\r\n  b: <input data-link=\"color2.b\"/><br/>\r\n  a: <input data-link=\"color2.a\"/>\r\n</div>\r\n<div class=\"box2\" data-link=\"css-background-color{rgbafromrgb:color2.r color2.g color2.b color2.a}\">\r\n  {^{rgbafromrgb:color2.r color2.g color2.b color2.a}}<br/>{^{hexfromrgb:\r\n  color2.r color2.g color2.b color2.a}}\r\n</div>\r\n\r\n{^{picker color3.hex mode=\"hex\" class=\"picker3\"/}}\r\n\r\n<div class=\"inputs3\">\r\n  hex: <input data-link=\"color3.hex\"/><br/>\r\n</div>\r\n<div class=\"box3\" data-link=\"css-background-color{rgbafromhex:color3.hex}\">\r\n  {^{rgbafromhex:color3.hex}}<br/>{^{:color3.hex}}\r\n</div>\r\n</script>\r\n\r\n<div id=\"page\"></div>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For additional variants of the {{picker}} control, see the color picker samples topic.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "todo": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "\nAdd to  Data binding topic\nargDefault\ntrigger\nsortable grid\nAdd to Tag hierarchy topic\n\nDerived tag controls\nTag hierarchy and recursive tags\ndataMap flow\n\nDerived tag controls\nExisting samples - on links and range\ndataMap\nflow\nsortable grid\nTag hierarchy and recursive tags\ngrid, pager, gridheader etc.\n\nAlso this=~mytag, lateRender,\n"
      }
    ]
  }
}