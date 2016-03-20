var content = $.views.documentation.content;

content.find.jsvapi = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/jsvapi")) ||
{
  "jsvapi": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Note: New topics are being added regularly to this documentation.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
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
        "text": "template.link(object):\n\n\n\n  <tr>\n    <td>{^{:name}}</td>\n    <td><input data-link=\"name trigger=true\" /></td>\n  </tr>\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar html = myTmpl.link(\"#person\", person);\n\n<td>{^{:name}}</td>\n<td><input data-link=\"name trigger=true\" /></td>\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nmyTmpl.link(\"#person\", person);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Passing an array to the link() method.\n— The template is rendered once for each item in the array:\n"
      },
      {
        "_type": "sample",
        "title": "template.link(array):",
        "text": "template.link(array):\nAdd person\n\n\n\n\n  <tr>\n    <td>{^{:name}}</td>\n    <td><input data-link=\"name trigger=true\" /></td>\n  </tr>\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar people = [\n  {\n    name: \"Adriana\"\n  },\n  {\n    name: \"Robert\"\n  }\n];\n\nmyTmpl.link(\"#peopleList\", people);\n\n$(\"#add\").on(\"click\", function() {\n  $.observable(people).insert({\n    name: \"name\"\n  });\n});\n\nmyTmpl.link(\"#peopleList\", people);\n\n\n"
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
        "text": "template.link(object, myHelpers):\n\n\n\n  <tr>\n    <td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n    <td><input data-link=\"name trigger=true\" /></td>\n  </tr>\n\nfunction toUpper(val) { return val.toUpperCase(); }\n\nvar myTmpl = $.templates(\"#personTmpl\");\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nmyTmpl.link(\"#person\", person, myHelpers);\nfunction toUpper(val) {...}\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\nmyTmpl.link(\"#person\", person, myHelpers);\n\n<td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n\nClick Try it and change the color to \"green\"…\n\n"
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
        "text": "$.link.personTmpl(...):\n\n\n\n  <tr>\n    <td data-link=\"css-color{:~color} {:~format(name)}\"></td>\n    <td><input data-link=\"name trigger=true\" /></td>\n  </tr>\n\nvar person = {\n    name: \"Adriana\"\n  };\n\nfunction toUpper(val) { return val.toUpperCase(); }\n\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\n$.link.personTmpl(\"#person\", person, myHelpers);\n$.templates(\"personTmpl\", \"#personTemplate\");\n\nvar myHelpers = {color: \"red\", format: toUpper};\n\n$.link.personTmpl(\"#person\", person, myHelpers);\n\n\n"
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
        "_type": "links",
        "title": "",
        "text": ""
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
        "title": "",
        "text": ""
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
        "title": "",
        "text": ""
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
        "text": "Any JsRender template can be used with JsViews.\n"
      },
      {
        "_type": "para",
        "title": "Data-linked templates",
        "text": "Data-linked templates\nCalling the render() method works just the same within JsViews as it does if only JsRender is loaded. But alternatively you can use the link() method – which will first render and then add data binding (data-link the template).\nIf you have data-linked your template by calling the link() method, then you can continue to use the same JsRender template tags as before. But now you optionally make any tag in the template data-linked, by replacing the {{... of the opening tag by {^{..., as in:\n{^{for people}}\n  {^{:name}}\n{{/for}}\n\nIn addition, you can data-link the HTML elements in your template, as in:\n<input data-link=\"name\" />\n<div data-link=\"css-color{:color} {:name}\"></div>\n\nSee Data-link template syntax for details…\n"
      },
      {
        "_type": "para",
        "title": "But in JsViews templates, your template must be well-formed:",
        "text": "But in JsViews templates, your template must be well-formed:\nJsRender is different. If you are only using JsRender (so no ‘HTML-aware data-binding’), you have a lot of freedom. You can even do this:\n"
      },
      {
        "_type": "sample",
        "title": "Badly-formed template - but OK in JsRender!",
        "text": "Badly-formed template - but OK in JsRender!\n\n\n\n  <tr>\n    <td \n      {{if lastName}}\n        >{{:firstName}}</td><td>{{:lastName}}\n      {{else}}\n        colspan=\"2\">{{:firstName}}\n      {{/if}}\n    </td>\n  </tr>\n\nvar myTemplate = $.templates(\"#peopleTmpl\");\n\nvar people = [\n  {\n    firstName: \"Jeff\"\n  },\n  {\n    firstName: \"Xavier\",\n    lastName: \"Prieto\"\n  }\n];\n\nvar html = myTemplate.render(people);\n\n$(\"#peopleList\").html(html);\n\n{{if}} tag blocks wrap part of an HTML <td> tag\n\n{{:firstName}}{{:lastName}}\n  {{else}}\n    colspan=\"2\">{{:firstName}}\n  {{/if}}\n\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "That works because JsRender is pure string-based rendering, it doesn’t mind how you mix you JsRender tag hierarchy with the HTML tag markup.\n"
      },
      {
        "_type": "para",
        "title": "Rules for a well-formed template in JsViews:",
        "text": "Rules for a well-formed template in JsViews:\nWith JsViews, it is different. Here are the rules of what is valid, or invalid, within a JsViews template:\n\nJsRender template tags which are outside HTML elements, or fully within the element content of an HTML element can remain unchanged in a JsViews template. They will work correctly. They can optionally be data-linked by simply adding a ^ character (so that for example a {{for}} tag becomes a data-linked {^{for}} tag) – and in that case the rendered content will change dynamically whenever the bound data changes ‘observably’.\nBut tags which are within the markup of the actual HTML opening tag itself, whether placed between attributes, or spanning attributes, or within the attribute content (the text value of the attribute), will not be valid in a JsViews template.\nSimilarly, tags which wrap opening or closing tag in such a way as to produce ‘mal-formed HTML’ will not be valid.\nIn fact a valid JsViews template will have the tree hierarchy of nested HTML tags and nested template tags combining together, as it were, as a single well-formed tree.\nIn each of the invalid scenarios mentioned above, the JsRender tags needs to be replaced by corresponding data-linked element syntax. See Data-link template syntax for details.\n\n"
      }
    ]
  },
  "jsvhelpers": {
    "sections": []
  },
  "jsvtagcontrols": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "tag hierarchy\n"
      }
    ]
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
    "sections": []
  },
  "jsvtemplateobject": {
    "sections": []
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
        "text": "A view object has the following properties and methods:\nJsViews – programmatic access only\nThe following methods are available only for programmatic access when using JsViews:\n\nrefresh() method\ncontents() method\nchildTags() method\nnodes() method\n\nBoth JsRender and JsViews (see JsRender view object)\nThe following properties and methods are available when using either JsRender or JsViews:\n\ntype property\ndata property\nparent property\nindex property\ngetIndex() method\nget(type) method\ncontent property\nother properties (tmpl, views, ctx tags )\n\n"
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
        "text": "view.refresh()\ntable td {padding: 5px;} table {margin-top: 6px;} #incrBtn {margin-bottom: 10px;}\n\n\n\n\n  <button id=\"incrBtn\">Increment year</button>\n  <button id=\"incrObsBtn\">Increment observably</button>\n  <button id=\"incrRefreshBtn\">Increment and refresh</button>\n  <button class=\"refreshBtn\">Refresh All</button><br/>\n  Year: {^{:year}}<br/>\n\n  <table><tbody>\n    {{for people}}\n      <tr>\n        <td><input data-link=\"name\" /></td>\n        <td>Name: {{:name}}</td>  {{!-- no data-linking --}}\n        <td>Age in {{:~root.year}}: {{:age + ~root.year - 2016}} </td>\n        <td><button class=\"refreshBtn\">Refresh</button></td>\n      </tr>\n    {{/for}}\n  </tbody></table>\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n\nvar model = {\n  year: 2016,\n  people: [{name: \"Adriana\", age: 4}, {name: \"Robert\", age: 34}]\n};\n\ntmpl.link(\"#peopleList\", model)\n  .on(\"click\", \"#incrBtn\", function() {\n    model.year++; // non-observable change\n  })\n  .on(\"click\", \"#incrObsBtn\", function() {\n    $.observable(model).setProperty(\"year\", model.year + 1);\n  })\n  .on(\"click\", \"#incrRefreshBtn\", function() {\n    model.year++; // non-observable change\n    $.view(this).refresh();\n  })\n  .on(\"click\", \".refreshBtn\", function() {\n    $.view(this).refresh();\n  });\nTemplate: (No data-linking except <input data-link=\"name\" />)\n{{for people}}\n  ...\n  <input data-link=\"name\" />\n  ...\n  {{:name}} ... {{:~root.year}} ... {{:age + ~root.year - 2016}}\n  ...\n  <button class=\"refreshBtn\">Refresh</button>\n{{/for}}\n\nCode:\n.on(\"click\", \"#incrBtn\", function() {\n  model.year++; // non-observable change\n})\n.on(\"click\", \".refreshBtn\", function() {\n  $.view(this).refresh(); // Refresh view, with updated values...\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "The contents() method",
        "text": "The contents() method\nview.contents(…): returns a jQuery object of view content nodes – optionally filtered by a jQuery selector.\nvar jqMyClassElem = view.contents(true, \".myClass\"); // jQuery object for element with 'myClass'at any depth within view\n\n"
      },
      {
        "_type": "api",
        "title": "view.contents(...)",
        "text": "view.contents(...)\nGet a jQuery object for the contents of the view (top-level child nodes – including text nodes)\n\nvar jqContents = view.contents();\njqContents.css(\"color\", \"red\");\n\nGet a jQuery object for the top-level contents of the view, filtered by the jQuery selector\n\nvar jqContents = view.contents(\".toRed\");\njqContents.css(\"color\", \"red\");\n\nGet a jQuery object for the contents of the view: child and descendant nodes, filtered by the selector\n\nvar jqContents = view.contents(true, \".toRed\");\njqContents.css(\"color\", \"red\");\n\n"
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
        "text": "The childTags() method\nview.childTags(…): returns an array of custom tag instances within the view – optionally filtered by tag name.\nvar myTagsArray = view.childTags(true, \"myTag\"); // {{myTag}} instances within view (at any depth)\n\n"
      },
      {
        "_type": "api",
        "title": "view.childTags(...)",
        "text": "view.childTags(...)\nGet top-level custom tag instances within the view\n\nvar tagsArray = view.childTags();\nvar firstTagName = tagsArray[0].tagName;\n\nGet instances of {{tagName}} in view (not nested in other custom tags)\n\nvar sliders = view.childTags(\"slider\");\nsliders[0].setValue(25);\n\nGet instances of {{tagName}} in view (including those nested in other custom tags)\n\nvar jqContents = view.childTags(true, \".toRed\");\njqContents.css(\"color\", \"red\");\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that view.childTags() looks only for custom tags. (In fact it searches for tags which do not have the flow property set to true. All built in tags such as {{for}} and {{if}} have the setting flow: true, so are ignored by childTags().)\nThe following sample looks for {{textbox}} tags (in the case data-link=\"{textbox ...}\") and calls a method on each.\n"
      },
      {
        "_type": "sample",
        "title": "view.childTags()",
        "text": "view.childTags()\n#toggleBtn {margin-bottom: 14px;} .person {line-height: 26px;}\n\n\n\n  <button id=\"toggleBtn\">Toggle Edit</button>\n\n  {^{for people}}\n    {{!--data-link to {{textbox}} tag --}}\n    <div class=\"person\" data-link=\"{textbox path=name/}\"></div> \n  {{/for}}\n\n// Define a {{textbox}} tag - which allows editing, and has a toggleEdit() method\n$.views.tags({\n  textbox: {\n    init: function() {\n      var path = this.tagCtx.params.props.path + \" trigger=true\";\n\n      this.template = \" \"   // Checkbox to toggle edit\n      + \"\"       //  for editing\n      + \"\"; //  for rendering\n    },\n    toggleEdit: function() {\n      $.observable(this).setProperty(\"edit\", !this.edit);\n    }\n  }\n});\n\nvar tmpl = $.templates(\"#peopleTmpl\");\nvar model = {\n    people: [{name: \"Adriana\"}, {name: \"Robert\"}]\n  };\n\ntmpl.link(\"#peopleList\", model)\n  .on(\"click\", \"#toggleBtn\", function() {\n    var textBoxes = $.view(this).childTags(\"textbox\"); // Find all the {{textbox}} tags in the view\n    for (var i=0; i{^{for people}}\n  {{!--data-link to {{textbox}} tag --}}\n  <div class=\"person\" data-link=\"{textbox path=name/}\"></div> \n{{/for}}\n\n.on(\"click\", \"#toggleBtn\", function() {\n  var textBoxes = $.view(this).childTags(\"textbox\"); // Find all the {{textbox}} tags in the view\n  for (var i=0; i<textBoxes.length; i++) {\n    textBoxes[i].toggleEdit();                       // Toggle the edit mode for each of them\n  }\n});\n\n\n"
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
        "title": "",
        "text": "tag hierarchy\n"
      }
    ]
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
        "text": "JsViews data-link syntax takes two forms:\n\nData-linked tags\nData-linked elements\n\nBoth forms use:\n\nData-linked paths\n\n"
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
        "text": "JsViews data-linked tags\nA data-linked tag is like a regular JsRender tag (whether a built-in tag, or a custom tag) but has an additional ^ character to show that is data-linked. Let’s illustrate that by an example based on the Extending the {{for}} tag sample:\n<ul>\n  {{for members}}\n    <li>\n      {{:name}}\n    </li>\n  {{/for}}\n</ul>\n\n<ul>\n  {{range members start=1 end=3}}\n    <li>\n      {{:name}}\n    </li>\n  {{/range}}\n</ul>\n\nWe can data-link to the members – whether on the built-in {{for}}, or the custom {{range}} tag – like this:\n<ul>\n  {^{for members}}\n    <li>\n      {^{:name}}\n    </li>\n  {{/for}}\n</ul>\n\n<ul>\n  {^{range members start=1 end=3}}\n    <li>\n      {^{:name}}\n    </li>\n  {{/range}}\n</ul>\n\nNow if the members array changes, our rendered template content will automatically update to show the additional inserted (or removed) members in the list.\nHere is a live sample of the data-linked {^{for}} tag:\n"
      },
      {
        "_type": "sample",
        "text": "\n\n\n\n<div class=\"buttons\">\n  <button id=\"add\">Add</button>\n</div>\n<ol>\n  {^{for members}}\n    <li>\n      {^{:name}} \n      <span class=\"remove\"></span>\n    </li>\n  {{/for}}\n</ol>\n\n\n\nvar team = {\n  members: [\n    {name: \"Robert\"},\n    {name: \"Sarah\"}\n  ]\n},\ncnt = 1;\n\n$.templates(\"#teamTemplate\").link(\"#team\", team)\n  .on(\"click\", \".remove\", function() {\n    var view = $.view(this);\n    $.observable(team.members).remove(view.index);\n  })\n  .on(\"click\", \"#add\", function() {\n    $.observable(team.members).insert(0, {name: \"new\" + cnt++})\n  });\nTemplate:\n...\n{^{for members}}\n  <li>\n    {^{:name}} <img class=\"remove\" .../>\n  </li>\n{{/for}}\n...\n\nCode:\n...\n$.templates(\"#teamTemplate\").link(\"#team\", team) ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice that we also added a ^ to the {^{:name}} tag. That means that if the value of the name field is changed (‘observably’) then the value will update automatically within the rendered template.\nAnd here is a link to a complete sample showing a data-linked {^{range}} tag. It lets you modify both the members list and the name properties, and see how they automatically trigger updates in other parts of the page which bind to the same data.\nJsViews is smart about how it updates the HTML. Generally it does so incrementally – only modifying the affected part of the HTML by inserting or removing elements, or replacing values.\n"
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
        "text": "JsViews data-link expressions, and syntax\nData-linked elements are regular HTML elements which have been data-bound in the template by adding a data-link attribute.\nThey can be used within templated content, as in the following sample – and they can also be used on top-level non-templated content in your page – see Top-level data-linking.\n"
      },
      {
        "_type": "sample",
        "title": "Data-linked elements in templates",
        "text": "Data-linked elements in templates\nA data-linked input element (two-way data-binding)\n\n\n\nTwo-way data-binding with update triggered on every key down\n\n\n\nA data-linked span element (data binding to innerText – default target)\n\n\n\nA data-linked tag (renders as a text node, not an element...)\n\n{^{:name}}\n\nCode:\n\n...\nvar template = $.templates(\"#theTmpl\");\ntemplate.link(\"#result\", data);\n\n\n"
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
        "text": "Optional two-way data-binding\nNotice the full syntax for the <input> has an additional : before the } at the end. It corresponds to the two-way data binding. (The same applies to other ‘user input elements’ such as select, textarea etc. (and also content editable elements).\nYou can provide both convert and convertBack converters if you want. (See the Two-way binding and converters sample):\n<input data-link=\"{myConverter:some.data.path:myConvertBack}\"/>\n\n<select data-link=\"{myConverter:some.data.path:myConvertBack}\">...</select>\n\nAnd in addition, whenever you have two-way binding, you can optionally include  trigger=true to specify updating for every character entry (after keydown):\n<textarea data-link=\"{myConverter:some.data.path trigger=true:myConvertBack}\">...</select>\n\nIf you want only one-way binding (from the data to the <input>) you simply eliminate the : at the end:\n<input data-link=\"{:some.data.path}\"/>\n\n"
      },
      {
        "_type": "para",
        "title": "Full syntax - multiple targets, multiple tags, multiple bindings...",
        "text": "Full syntax - multiple targets, multiple tags, multiple bindings...\nThe full syntax allows you to bind multiple expressions each to a different target 'attrib’, and is written like this: data-link=\"attrib1{linkExpression1} attrib2{linkExpression2} ...\".\nattrib corresponds to the target – such as the following:\n\nHTML attribute (such as title{…}, class{…}, id{…}, disabled{…} or data-foo{…})\nCSS property (such as css-background-color{…})\ninnerHTML (as in html{…})\ninnerText (as in text{…})\nspecial targets like visible{…}\nor can be missing altogether (as in {…}) in which case it stands for the default target for the element.\n\nThe default target for most elements is innerText, but for input and select elements it is value.\nThe linkExpression {...} is actually a template tag, such as {{:a.b.c}} or {{myCustomTag .../}}. The difference from regular JsRender tag syntax is that with data-link expressions, you only put a single curly brace to delimit, and you don’t put the self-closing /, which is assumed.\nIn fact as long as the tag is self-closing, you can use any JsRender tag you want – including custom tags.\nFor example, if you have a JsRender tag as content of an element:\n<div>{{for some.path tmpl='myForTmpl'}}</div>\n\n– then you can make it into a data-linked tag, using:\n<div>{^{for some.path tmpl='myForTmpl'}}</div>\n\n– or into a data-linked element, using:\n<div data-link=\"{for some.path tmpl='myForTmpl'}\" ></div>\n\nSo examples would be:\n\n<div data-link=\"{:name}\"></div> (one-way binding to innerText – default target attrib – so automatically HTML encodes).\n<div data-link=\"html{:name}\"></div> (one-way binding to innerHTML)\n<div data-link=\"text{:name}\"></div> (one-way binding to innerText – equivalent to default above)\n<div data-link=\"html{>name}\"></div> (one-way binding to innerHTML but with HTML encoding)\n<input data-link=\"{:name}\" > (one-way binding to value – default target attrib)\n<input data-link=\"value{:name}\" /&gt; (one-way binding to value)\n<input data-link=\"title{:name}\" /&gt; (one-way binding to the title attribute)\n<input data-link=\"{:name trigger=true:}\" /&gt; (two-way binding to value, trigger on keydown) – equivalent to abbreviated syntax: <input data-link=\"name trigger=true\" /&gt;\n<input data-link=\"{cvt:name:cvtBack}\" /&gt; (two-way binding to value, with converters)\n<input data-link=\"{cvt:name trigger=true:cvtBack}\" /&gt; (two-way binding to value, with converters, and trigger on keydown)\n<input data-link=\"{cvt:name:cvtBack} title{:info.description}\" /&gt; (two-way binding to value, with converters and one-way binding to title)\n<img data-link=\"src{:'/myImagesFolder/' + fileName + '.png'}\" /> (one-way binding to src – using an expression to build full path)\n<div data-link=\"{myCustomTag name}\"></div> (data-linking – and instantiating – a JsViews custom tag control. Renders as innerHTML – default target attrib for tags other than {: …} – so the control can insert HTML markup)\n<div data-link=\"text{myCustomTag name}\"></div> (data-linking a JsViews custom tag control – rendering as innerText – so automatically HTML encodes)\n<svg><ellipse data-link=\"cx{:x} fill{:color}\"></ellipse> (data-linking to attributes of an SVG element)\n\n"
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
        "text": "Show: \n\n\n$.link(true, \"body\", {show: true});\n\n\nTop-level data-linking to {if ...}{else ...}\nShow: <input data-link=\"show\" type=\"checkbox\"/>\n<b data-link=\"{if show tmpl='show this'}{else tmpl='no show'}\"></b>\n\n$.link(true, \"body\", {show: true});\n\n\n"
      },
      {
        "_type": "para",
        "title": "Data-linking expressions using tag controls",
        "text": "Data-linking expressions using tag controls\nAn important case of data-linking is binding and instantiating of custom tag controls, such as:\n<div data-link=\"{slider size _range='min' ...}\"></div>\n\nSee the tag control samples. Note that this works not only within data-linked templates, but also  when linking to top-level content – as shown in the second variant of the slider sample.\nAnother example might be a tabs control where the {{else}} blocks are the contents of the different tabs:\n<div data-link=\"{tabs ... tmpl='tab1'}{else ... tmpl='tab2'}{else ... tmpl='tab3'}\"></div>\n\nExample:\n"
      },
      {
        "_type": "sample",
        "title": "A top-level data-linked tabs control",
        "text": "A top-level data-linked tabs control\n\n\n\n\n$.templates({\n  tab1: \"365 days per year\",\n  tab2: \"12 months per year\",\n  tab3: \"Name: {{:name}}\"\n});\n\n$(\"#tabsView\").link(true, {name: \"Jeff\"});\n\nUsing data-linking to instantiate a tabs control on a top-level page element:\n<div id=\"tabsView\" data-link=\"\n  {tabs tabCaption='days' tmpl='tab1' selectedIndex=2}\n  {else tabCaption='months' tmpl='tab2'}\n  {else tabCaption='name' tmpl='tab3'}\n\"></div>\n\n$.templates({\n  tab1: \"365 days per year\",\n  ...\n  tab3: \"Name: {{:name}}\"\n});\n\n$(\"#tabsView\").link(true, {name: \"Jeff\"});\n\n\n/*\n * Sample JsViews tag control: {{tabs}} control\n * http://www.jsviews.com/download/sample-tag-controls/tabs/tabs.js\n * Used in samples: http://www.jsviews.com/#samples/tag-controls/tabs\n * Copyright 2016, Boris Moore\n * Released under the MIT License.\n */\n\n(function($) {\n\"use strict\";\n\n$.views.tags({\n  tabs: {\n    init: function(tagCtx) {\n      this.selectedIndex = tagCtx.props.selectedIndex || 0;\n      this.tabCount = this.tagCtxs.length;\n    },\n    render: function() {\n      var tagCtx = this.tagCtx;\n      return this.selectedIndex === tagCtx.index ? tagCtx.render() : \"\";\n    },\n    onAfterLink: function() {\n      var self = this;\n      self.contents(true, \".tabstrip\").first()\n        .on(\"click\", \".header_false\", function() {\n          self.setTab($.view(this).index);\n        });\n    },\n    template: '<table class=\"tabsview\"><tbody>' +\n      '<tr class=\"tabstrip\">' +\n      '{{for ~tag.tagCtxs}}' +\n        '<th data-link=\"class{:\\'header_\\' + (#index === ~tag.selectedIndex)}\">' +\n          '{{>props.tabCaption}}' +\n        '</th>' +\n      '{{/for}}' +\n    '</tr>' +\n    '<tr class=\"tabscontent\">' +\n      '<td colspan=\"{{:~tag.tagCtxs.length}}\">' +\n        '<div style=\"width:{{attr:~tag.tagCtxs[0].props.width}};' +\n                    'height:{{attr:~tag.tagCtxs[0].props.height}}\">' +\n          '{^{for ^tmpl=~tag.tagCtxs[~tag.selectedIndex].tmpl /}}' +\n        '</div>' +\n        '</td>' +\n      '</tr>' +\n    '</tbody></table>',\n\n    //METHODS\n    setTab: function(index) {\n      $.observable(this).setProperty(\"selectedIndex\", index);\n      if (this.onSelectionChange) {\n        this.onSelectionChange(index, this);\n      }\n    },\n    dataBoundOnly: true\n  }\n});\n\n})(this.jQuery);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Samples of data-linking:",
        "text": "Samples of data-linking:\n\nThere are many samples showing data-linking under JsViews Samples.\nSee in particular this tutorial sequence on data-linking\n\n"
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
        "text": "Top-level declarative data-linking\ninput {margin-bottom:10px;}\n\n\n  \n  \n  CEO \n\n  \n  and I am CEO!\n\n  \n    Employees:\n     \n  \n\n\n$.templates(\"nameTmpl\", \"Name: {{:first}} {{:last}}\");\n\nvar person = {\n  first: \"Jim\",\n  last: \"Rudd\",\n  employees: [\n    {first: \"Mary\", last: \"A\"},\n    {first: \"Hank\", last: \"B\"}\n  ]};\n\nvar helpers = {nameLabel: \"My name is \"};\n\n$.link(true, \"#group\", person, helpers);\nTop-level content:\n<div id=\"group\">\n  <input type=\"checkbox\" />\n  ...\n\nAdd two-way data-linking to <input>s\n<input data-link=\"isCEO\" type=\"checkbox\" />...\n<input data-link=\"first trigger=true\" />...\n\nAdd data-linking to <div>s and <span>s etc.\n<div id=\"group\" data-link=\"css-color{:isCEO ? 'red' : 'blue'}\">...\n<div data-link=\"{for employees tmpl='nameTmpl'}\">...\n\nActivate, using $.link(true, ...)\n$.link(true, \"#group\", person, helpers);\n\n(Could have used alternative syntax: $(\"#group\").link(true, person, helpers);)\n\n"
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
        "text": "Top-level data-link=\"{slider ...}\"\nSlider with initialized properties (top-level data-linking)\n<div data-link=\"{slider size _range='min' _min=1 max=200 _orientation='vertical' width=400}\"></div>\n\n\nData-linking to SVG content\n\n\n  \n  ...\n\n\nActivate data-linking \n\n$.link(true, \"body\", model);\n\n$.views.converters({\n  tonum: function(val) {\n    return +val; // Convert string to number\n  }\n});\n\nvar model = {\n    size: 150\n  };\n\n$.link(true, \"body\", model);\n/*! JsViews jQueryUI widget integration v1.0.0-alpha:\nsee: http://www.jsviews.com/#download */\n/*\n * Copyright 2016, Boris Moore\n * Released under the MIT License.\n */\n\n(function (global, $, undefined) {\n\"use strict\";\n\nfunction keepParentDataCtx(val) {\n  var tagCtx = this.tagCtx;\n  return tagCtx.render(tagCtx.view, true); // no arg, so renders against parentView.data\n}\n\n$.views.tags({\nwidget: {\n  init: function(tagCtx, linkCtx) {\n    var tag = this,\n      props = tagCtx.props,\n      content = tagCtx.content,\n      elemType;\n\n    if (tag._.inline) {\n      if (elemType = props.elem || tag.elem) {\n        if (content) {\n          if (tag.wrap) {\n            tag.template = \"<\" + elemType + \">\" + content.markup + \"</\" + elemType + \">\";\n          }\n        } else {\n          tag.template = (elemType === \"input\") ? \"<input/>\" : \"<\"+ elemType +\"></\"+ elemType +\">\";\n        }\n      }\n      tag.attr = \"html\";\n    }\n    delete props.elem;\n  },\n  onAfterLink: function(tagCtx, linkCtx) {\n    var linkedElem, prop, i,\n      tag = this,\n      options = tag.options,\n      presets = tag.initOptions,\n      props = tagCtx.props,\n      widgetName = tag.widgetName || tagCtx.args[0],\n      widgetFullName = widgetName;\n      widgetName = widgetName.split(\"-\").pop();\n\n    if (tag._.unlinked) {\n      if (i = presets && presets.length) {\n        presets = {};\n        while (i--) {\n          i = tag.initOptions[i];\n          if (prop = tagCtx.props[\"_\" + i]) {\n            presets[i] = prop;\n          }\n        }\n      }\n      if (widgetFullName === widgetName) {\n        widgetFullName = \"ui-\" + widgetName;\n      }\n      if (!tag.linkedElem) {\n        tag.linkedElem = tag._.inline ? tag.contents(\"*\").first() : $(linkCtx.elem);\n      }\n      linkedElem = tag.linkedElem;\n      if (!linkedElem[0]) {\n        // This may be due to using {{myWidget}} No element found here {{/myWidget}} \n        throw \"No element found for widget '\" + widgetName +\"'\";\n      }\n      // Instantiate widget\n      linkedElem[widgetName](presets);\n\n      // Store widget instance\n      tag.widget = linkedElem.data(widgetFullName) || linkedElem.data(widgetName);\n      if (!tag.widget) {\n        // widget failed to load, or is not a valid widget factory type\n        throw \"widget '\" + widgetName + \"' failed\";\n      }\n    }\n    linkedElem = tag.linkedElem;\n    if (options) {\n      if ($.isFunction(options)) {\n        options = tag.options();\n      }\n      tag.linkedElem[widgetName](\"option\", options);\n    }\n    $.each(props, function(key, prop) {\n      var option;\n      if (key.charAt(0) === \"_\") {\n        key = key.slice(1);\n        option = options && options[key];\n        linkedElem[widgetName](\"option\", key,\n          option && $.isFunction(option)\n            ? function() {\n              // if the same event function option is overridden on the tagDef options and\n              // the tagCtx.props, call first the one on the initOptions options, and then\n              // the one declared on the tag properties. \n              option.apply(linkedElem[0], arguments);\n              return prop.apply(linkedElem[0], arguments);\n            }\n            : prop\n          );\n      }\n    });\n  },\n  onUpdate: function() {\n    return false;\n  },\n  dataBoundOnly: true,\n  attr: \"none\"\n},\n\nautocomplete: {\n  baseTag: \"widget\",\n  widgetName: \"autocomplete\",\n  elem: \"input\",\n  setSize: true,\n  options: function() {\n    var tag = this;\n    return {\n      change: function(evt, ui) {\n        if (ui.item) {\n          tag.update(ui.item.value);\n          // If there is a selected item, update bound value on blur.\n          // (Alternatively can set trigger=true)\n        }\n      },\n      select: function(evt, ui) {\n        if (ui.item) {\n          tag.update(ui.item.value);\n        }\n      },\n      focus: function(evt, ui) {\n        return false;\n      }\n    };\n  },\n  setValue: function(value) {\n    this.linkedElem.val(value);\n  },\n  getValue: function() {\n    return this.linkedElem.val();\n  }\n},\nbutton: {\n  baseTag: \"widget\",\n  widgetName: \"button\",\n  elem: \"button\",\n  setSize: true,\n  init: function(tagCtx, linkCtx) {\n    var template,\n      tag = this,\n      content = tagCtx.content,\n      props = tagCtx.props,\n      id = props.id,\n      parent = tag.parent;\n\n    if (tag._.radio = parent && parent.tagName === \"buttonset\") {\n      tagCtx = parent.tagCtx;\n    } else {\n      tag._.chkBx = (tag._.inline ? props : linkCtx.elem).type === \"checkbox\";\n    }\n\n    var  params = tagCtx.params,\n      paramprops = params.props || {};\n\n    tag.baseApply(arguments);\n\n    if (tag._.inline) {\n      content = content && content.markup || \"&nbsp;\"; // (&nbsp; fixes a jQueryUI button rendering issue)\n      if (tag._.radio || tag._.chkBx) {\n        id = id || \"jsv\" + Math.random();\n        template = '<input id=\"' + id + '\" data-link=\"' + params.args[0] \n          + (paramprops.convert ? \" convert=\" + paramprops.convert : \"\")\n          + (paramprops.convertBack ? \" convertBack=\" + paramprops.convertBack : \"\")\n          + (tag._.radio\n            ? '\" name=\"' + parent.id + '\" type=\"radio\" value=\"' + props.value + \n              '\"/><label for=\"' + id + '\">' + content + '</label>'\n            : '\" type=\"checkbox\"/><label for=\"' + id + '\">' + content + '</label>');\n      } else {\n        template = \"<button>\" + content + \"</button>\";\n      }\n      tag.template = template;\n    }\n  },\n  onAfterLink: function(tagCtx, linkCtx) {\n    var tag = this,\n      elem = linkCtx.elem,\n      val = tag.cvtArgs()[0];\n\n    if (tag._.radio || tag._.chkBx) {\n      if (!tag._.inline) {\n        if (tag._.unlinked && !elem.id) {\n          elem.id = \"jsv\" + Math.random();\n          $(elem).after('<label for=\"' + elem.id + '\">&nbsp;</label>');\n        }\n        elem.checked = tag._.radio\n          ? (elem.name = tag.parent.id, val === elem.value)\n          : val && val !== \"false\";\n      }\n\n      tag.baseApply(arguments);\n\n      elem = tag.linkedElem[0];\n\n      if (tag._.radio) {\n        // Use {^{button value=\"xxx\"}}Label{{/button}}\n        if (elem.value === \"undefined\") {\n          // Default, for {^{button}}xxx{{/button}} or {^{button _label=\"xxx\"/}}\n          elem.value = tag.widget.option(\"label\"); \n        }\n        elem.checked = val === elem.value;\n      } else {\n        elem.checked = val && val !== \"false\";\n      }\n\n      if (tag._.chkBx) {\n        tag.widget.refresh();\n      }\n    } else {\n      if (!tag._.inline) {\n        elem.innerHTML = elem.innerHTML || \"&nbsp;\"; // Fixes jQuery UI button issue if no label text\n      }\n      tag.baseApply(arguments);\n    }\n  },\n  render: keepParentDataCtx\n},\nbuttonset: {\n  baseTag: \"widget\",\n  widgetName: \"buttonset\",\n  setSize: true,\n  init: function(tagCtx) {\n    var id,\n      tag = this;\n\n    tag.baseApply(arguments);\n\n    if (tag._.inline) {\n      tag.id = tagCtx.props.id || \"jsv\" + Math.random();\n      tag.template = '<span id=\"' + tag.id + '\">' + tagCtx.content.markup + \"</span>\";\n    }\n  },\n  render: keepParentDataCtx,\n  onAfterLink: function(tagCtx, linkCtx) {\n    var tag = this,\n      elem = linkCtx.elem,\n      val = tag.cvtArgs()[0];\n    tag.baseApply(arguments);\n    tag.widget.buttons.each(function(i, elem) {\n      elem.checked = val === elem.value;\n      $(elem).button(\"refresh\");\n    });\n  }\n},\ndatepicker: {\n  baseTag: \"widget\",\n  widgetName: \"datepicker\",\n  elem: \"input\",\n  options: function() {\n    var tag = this;\n    return {\n      onSelect: function(dateText, inst) {\n        tag.value = dateText;\n        tag.update(dateText);\n      }\n    };\n  },\n  setValue: function(value) {\n    if (value !== undefined && value !== this.value) {\n      this.value = value;\n      this.linkedElem.datepicker(\"setDate\", value);\n    }\n  },\n  getValue: function() {\n    return this.value;\n  },\n  onAfterLink: function(tagCtx) {\n    var tag = this;\n    tag.baseApply(arguments);\n    tag.setValue(tagCtx.args[0]);\n    if (tag.linkedElem[0].tagName !== \"INPUT\") {\n      // This datepicker is not using an input (e.g. using a div) - so set to inline-block\n      tag.linkedElem.css(\"display\", \"inline-block\");\n    }\n  }\n},\n//dialog: { // Currently not supported. (Support would require overriding _createWrapper code.)\n//  baseTag: \"widget\",\n//  widgetName: \"dialog\",\n//  wrap: true,\n//  elem: \"div\"\n//},\ndroppable: {\n  baseTag: \"widget\",\n  widgetName: \"droppable\",\n  wrap: true\n},\nmenu: {\n  baseTag: \"widget\",\n  widgetName: \"menu\",\n  elem: \"ul\",\n  wrap: true,\n  initOptions: [\"menus\", \"items\"] // Options which need to be set on creation, not later\n},\nprogressbar: {\n  baseTag: \"widget\",\n  widgetName: \"progressbar\",\n  elem: \"div\",\n  wrap: true,\n  setSize: true,\n  setValue: function(value) {\n    var tag = this;\n    tag.widget.value(value || 0);\n  },\n  getValue: function() {\n    return this.widget.value();\n  },\n  onAfterLink: function(tagCtx) {\n    var tag = this;\n    tag.baseApply(arguments);\n    if (tagCtx.args.length) {\n      // Set the value to arg[0] (after applying converter, if there is one)\n      tag.setValue(tag.cvtArgs()[0]);\n    }\n    if (tagCtx.props.busy) {\n      // Set the value to arg[0] (after applying converter, if there is one)\n      tag.widget.value(false);\n    }\n  },\n  render: keepParentDataCtx\n},\nresizable: {\n  baseTag: \"widget\",\n  widgetName: \"resizable\",\n  wrap: true,\n  elem: \"div\"\n},\nselectable: {\n  baseTag: \"widget\",\n  widgetName: \"selectable\",\n  wrap: true\n},\nselectmenu: {\n  baseTag: \"widget\",\n  widgetName: \"selectmenu\",\n  elem: \"select\",\n  wrap: true,\n  options: function() {\n    var tag = this;\n    return {\n      change: function(evt, ui) {\n        tag.update(ui.value);\n      }\n    };\n  },\n  setValue: function(value) {\n    this.linkedElem[0].value = value;\n    this.widget.refresh();\n  },\n  getValue: function() {\n    return this.linkedElem[0].value;\n  },\n  render: keepParentDataCtx,\n  onAfterLink: function() {\n    var tag = this;\n    tag.baseApply(arguments);\n    if (tag._.unlinked) {\n      tag.linkedElem.on(\"jsv-domchange\", function() {\n        tag.widget.refresh();\n      });\n    }\n    // Set the value to arg[0] (after applying converter, if there is one)\n    tag.setValue(tag.cvtArgs()[0]);\n  }\n},\nslider: {\n  baseTag: \"widget\",\n  widgetName: \"slider\",\n  elem: \"div\",\n  setSize: true,\n  options: function() {\n    var tag = this;\n    return {\n      slide: function(evt, ui) {\n        setTimeout(function() {\n          tag.update(ui.value);\n        }, 0);\n      }\n    };\n  },\n  setValue: function(value) {\n    this.widget.value(value || 0);\n  },\n  getValue: function() {\n    return this.widget.value();\n  },\n  onAfterLink: function() {\n    var tag = this;\n    tag.baseApply(arguments);\n    // Set the value to arg[0] (after applying converter, if there is one)\n    tag.setValue(tag.cvtArgs()[0]);\n  }\n},\nspinner: {\n  baseTag: \"widget\",\n  widgetName: \"spinner\",\n  elem: \"input\",\n  setSize: true,\n  options: function() {\n    var tag = this;\n    return {\n      spin: function(evt, ui) {\n        tag.update(ui.value);\n      }\n    };\n  },\n  setValue: function(value) {\n    this.widget.value(value || 0);\n  },\n  getValue: function() {\n    return this.widget.value();\n  }\n},\ntabs: {\n  baseTag: \"widget\",\n  widgetName: \"tabs\",\n  elem: \"div\",\n  setSize: true,\n  wrap: true\n}\n\n});\n\nif ($.ui.sortable) {\n  $.widget(\"jsv.sortable\", $.ui.sortable, {\n    _create: function() {\n      var innerView, moveFrom,\n        widget = this,\n        startOption = widget.options.start,\n        stopOption = widget.options.stop;\n\n      widget.option({\n        start: function(event, ui) {\n          startOption && startOption.apply(this, arguments);\n\n          innerView = ui.item.view(); // The view of the item that is being dragged\n          if (innerView.type === \"item\") {\n            // The sortable items are within a {{for}} loop, so this is a data-linked sortable list\n            moveFrom = innerView.index + 1; // 1-based starting index of dragged item\n          }\n        },\n        stop: function(event, ui) {\n          var moveTo;\n\n          if (moveFrom) {\n            // This is a data-linked sortable list\n            moveTo = ui.item.prevAll(ui.item[0].tagName).length; // The new index after\n            // being dragged (count of previous siblings of same tagName)\n            widget.cancel(); // Now cancel the DOM changes, since we are data-driven,\n            // and should use JsViews data-linking to move the sorted items\n            $.observable(innerView.parent.data).move(moveFrom-1, moveTo); // Make the equivalent\n            // observable change to the underlying data\n            moveFrom = undefined;\n            // Remove the starting index, ready for new sorting actions on this sortable list\n          }\n          stopOption && stopOption.apply(this, arguments);\n        }\n      });\n      widget._super();\n    }\n  });\n}\n\nfunction unlinkedClone() {\n  // Ensure that cloned element (and its contents) created by jQuery UI to show dragging element does not\n  // have any data-jsv tokens (since deleting the element would them remove those views associated with\n  // the original element)\n  var clone = $(this).clone();\n  clone.find(\"*\").addBack().removeAttr( \"id data-link data-jsv data-jsv-df\" );\n  clone.find(\"script\").remove();\n  return clone;\n}\n\nif ($.ui.draggable) {\n  $.widget(\"jsv.draggable\", $.ui.draggable, {\n    _createHelper: function() {\n      if (this.options.helper === \"clone\") {\n        this.options.helper = unlinkedClone;\n      }\n      return this._super();\n    }\n  });\n}\n\nif ($.ui.accordion) {\n  $.widget(\"jsv.accordion\", $.ui.accordion, {\n    _create: function() {\n      var widget = this;\n      widget.options.header = widget.options.header.replace(\":not(li):even\", \":not(li,script):even\");\n      widget.element.on(\"jsv-domchange\", function(ev, tagCtx, linkCtx, eventArgs) {\n        widget.refresh();\n      });\n      widget._super();\n    }\n  });\n}\n\n$.views.tags({\n  accordion: {\n    baseTag: \"widget\",\n    widgetName: \"jsv-accordion\",\n    wrap: true,\n    initOptions: [\"header\"] // Options which need to be set on creation, not later\n  },\n  draggable: {\n    baseTag: \"widget\",\n    widgetName: \"jsv-draggable\",\n    wrap: true\n  },\n  sortable: {\n    baseTag: \"widget\",\n    widgetName: \"jsv-sortable\",\n    wrap: true\n  }\n});\n\n})(this, this.jQuery);\n<h3>JsViews 'slider' tag control. Top-level binding: data-link=\"{slider}\" and data-linked SVG elements</h3>\r\n\r\n<h4>Top-level data-linked SVG:</h4>\r\n\r\n<svg data-link=\"css-width{: 2 + size*2}\" class=\"svg-circles\">\r\n  <circle data-link=\"r{:size} cx{:size + 1}\"\r\n    class=\"svg-circle\" cy=\"51\" stroke-width=\"2\" stroke=\"green\"></circle>\r\n  <circle data-link=\"r{:size*3/4} cx{:size + 1} cy{:102 - size*3/4}\"\r\n    class=\"svg-circle\" stroke=\"#aaa\"></circle>\r\n  <circle data-link=\"r{:size/2} cx{:size + 1} cy{:size/2}\"\r\n    class=\"svg-circle\" stroke=\"#aaa\"></circle>\r\n  <circle data-link=\"r{:size/4} cx{:size + 1}\"\r\n    class=\"svg-circle\" cy=\"51\" stroke-width=\"2\" stroke=\"blue\"></circle>\r\n</svg>\r\n\r\n<h4>Top-level data-linked slider</h4>\r\n\r\n<div data-link=\"{slider size _range='min' _min=1 _max=200 width=400}\"></div>\r\n\r\n<h4>Size:</h4>\r\n\r\n<input type=\"text\" data-link=\"{:size trigger=true:tonum}\" />\n"
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
        "text": "Top-level programmatic data-linking\n \n  CEO: \n   \n\n  Employees: \n\n   \n\n\n$.templates(\"nameTmpl\", \"Name: {{:first}} {{:last}}\");\n\nvar person = {\n  isCEO: true,\n  employees: [\n    {first: \"Mary\", last: \"A\"},\n    {first: \"Hank\", last: \"B\"}\n  ]};\n\n$.link(\n  \"css-color{:isCEO ? 'green' : 'blue'}\", // expression\n  \"#group\", // target\n  person // data\n);\n\n$.link(\n  \"isCEO\", // expression\n  \"input.ceo\", // target\n  person // data\n);\n\n$.link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  \"#employees\", // target\n  person // data\n);\n\n$.link(\n  \"visible{:!isCEO} {:~message}\", // expression\n \"#notCeo\", // target\n  person, // data \n  {message: \"Not CEO!\"} // helpers\n);\n\nApply data-link expression to <input>, for two-way binding to isCEO data property:\n$.link(\n  \"isCEO\", // expression\n  \"input.ceo\", // target\n  person // data\n);\n\nApply {for...} and visible:{:...} data-link binding expressions to #employees <div>:\n$.link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  \"#employees\", // target\n  person // data\n);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is the same example, using the alternative syntax: $(target).link(expression, data, helpers);\n"
      },
      {
        "_type": "sample",
        "title": "Top-level programmatic data-linking <span style=\"font-style:normal;\">(alternative syntax)</span>",
        "text": "Top-level programmatic data-linking (alternative syntax)\n \n  CEO: \n   \n\n  Employees: \n\n   \n\n\n$.templates(\"nameTmpl\", \"Name: {{:first}} {{:last}}\");\n\nvar person = {\n  isCEO: true,\n  employees: [\n    {first: \"Mary\", last: \"A\"},\n    {first: \"Hank\", last: \"B\"}\n  ]};\n\n$(\"#group\").link(\n  \"css-color{:isCEO ? 'green' : 'blue'}\", // expression\n  person // data\n);\n\n$(\"input.ceo\").link(\n  \"isCEO\", // expression\n  person // data\n);\n\n$(\"#employees\").link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  person // data\n);\n\n$(\"#notCeo\").link(\n  \"visible{:!isCEO} {:~message}\", // expression\n  person, // data \n  {message: \"Not CEO!\"} // helpers\n);\n\nApply data-link expression to <input>, for two-way binding to isCEO data property:\n$(\"input.ceo\").link(\n  \"isCEO\", // expression\n  person // data\n);\n\nApply {for...} and visible:{:...} data-link binding expressions to #employees <div>:\n$(\"#employees\").link(\n  \"{for employees tmpl='nameTmpl'} visible{:isCEO}\", // expression\n  person // data\n);\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
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
      },
      {
        "_type": "para",
        "title": "convert and convertBack",
        "text": "convert and convertBack\nparagraph\n"
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
        "title": "Data-linking to deep changes in the path",
        "text": "Data-linking to deep changes in the path\nThe chained paths can be in the data-link=\"...\" expression of data-linked elements or in data-linked tags: {^{...}}. Either way, the template data-binding will automatically ‘listen’ to observable changes in the leaf property (ZIP in this case).\nBut sometimes you may want your template to respond dynamically to changes on objects higher up in the path (deep changes on the path). You can specify this by a simple syntax change: replace a . with a ^ at the level up to which you want to listen to changes.\nFor example, write manager.address^ZIP in order to respond not only to leaf changes (to ZIP) but also to observable changes in the address property of the manager. And write manager^address.ZIP in order to data-bind also to changes where the manager property of the top-level team object is swapped observably to another manager object.\n(If you know that in your app the objects higher up the path will never change dynamically, then stick with the default leaf binding, since that will provide better perf optimization…)\nSee also the related discussion and examples on using $.observe() with deep changes.\nHere it is in a sample, with leaf binding only. Editing the ZIP or clicking “Change leaf values” triggers template updates. But clicking “Change manager” does not work.\nClick on Try it and change paths to manager^address.ZIP – and see how “Change manager” now works.\n"
      },
      {
        "_type": "sample",
        "title": "Leaf binding only",
        "text": "Leaf binding only\n\n  Change leaf values\n  Change manager\n  \n\n\n\n\n<input data-link=\"manager.address.ZIP trigger=true\" />\n\n{^{if manager.address.ZIP}}\n  ZIP: {^{:manager.address.ZIP}}\n{{/if}}\n\n<hr/>\n\nManager: {^{if manager === person1}}person1{{else}}person2{{/if}}\n\n\nvar team = {\n  person1: {\n    address: {\n      City: \"New York\",\n      ZIP: \"10035\"\n    }\n  },\n  person2: {\n    address: {\n      City: \"London\"\n    }\n  }\n};\n\nteam.manager = team.person1;\n\n\n$(\"#modifyLeaf\").on(\"click\", function() {\n  $.observable(team.manager.address).setProperty({\n    \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n  });\n});\n\n$(\"#changeManager\").on(\"click\", function() {\n  $.observable(team).setProperty({\n    manager: team.manager === team.person1 ? team.person2 : team.person1\n  });\n});\n\nvar tmpl = $.templates(\"#managerTmpl\");\n\ntmpl.link(\"#result\", team);\n<input data-link=\"manager.address.ZIP trigger=true\" />\n\n{^{if manager.address.ZIP}}\n  ZIP: {^{:manager.address.ZIP}}\n{{/if}}\n\nModify leaf: template values update in response:\n$.observable(team.manager.address).setProperty({\n  \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n});\n\nChange manager: template values do not update:\n$.observable(team).setProperty({\n  manager: team.manager === person1 ? person2 : person1\n});\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Data-linking to deep changes",
        "text": "Data-linking to deep changes\n\n  Change leaf values\n  Change manager\n  \n\n\n\n\n<input data-link=\"manager^address.ZIP trigger=true\" />\n\n{^{if manager^address.ZIP}}\n  ZIP: {^{:manager^address.ZIP}}\n{{/if}}\n\n<hr/>\n\nManager: {^{if manager === person1}}person1{{else}}person2{{/if}}\n\n\nvar team = {\n  person1: {\n    address: {\n      City: \"New York\",\n      ZIP: \"10035\"\n    }\n  },\n  person2: {\n    address: {\n      City: \"London\"\n    }\n  }\n};\n\nteam.manager = team.person1;\n\n\n$(\"#modifyLeaf\").on(\"click\", function() {\n  $.observable(team.manager.address).setProperty({\n    \"ZIP\": team.manager.address.ZIP === \"45008\" ? \"\" : \"45008\"\n  });\n});\n\n$(\"#changeManager\").on(\"click\", function() {\n  $.observable(team).setProperty({\n    manager: team.manager === team.person1 ? team.person2 : team.person1\n  });\n});\n\nvar tmpl = $.templates(\"#managerTmpl\");\n\ntmpl.link(\"#result\", team);\n<input data-link=\"manager^address.ZIP trigger=true\" />\n\n{^{if manager^address.ZIP}}\n  ZIP: {^{:manager^address.ZIP}}\n{{/if}}\n\nModify leaf or manager: template values all update correctly in response\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "And here is a variant of the same demo, showing changes to all three levels of manager^address.ZIP: ZIP, address and manager.\n"
      },
      {
        "_type": "sample",
        "title": "Data-linking to deep changes (three levels)",
        "text": "Data-linking to deep changes (three levels)\n\n  Change leaf values\n  New address\n  UK address\n  Change manager\n  \n\n\n\n  <table class=\"nowidth\"><tbody>\n    <tr><td>Name:</td><td><input data-link=\"manager^name trigger=true\" /></td></tr>\n    <tr><td>Street:</td><td><input data-link=\"manager^address.street trigger=true\" /></td></tr>\n    <tr>\n      {^{if manager^address.ZIP}}\n        <td>ZIP:</td><td><input data-link=\"manager^address.ZIP trigger=true\" /></td>\n       {{else}}\n      <td colspan=\"2\">UK address - No ZIP</td>\n      {{/if}}\n    </tr>\n  </tbody></table>\n\nvar person1 = {\n  name: \"Pete\",\n  address: {\n    street: \"1st Ave\",\n    ZIP: \"34009\"\n  }\n};\n\nvar person2 = {\n  name: \"Henry\",\n  address: {\n    street: \"Trinity St\"\n  }\n};\n\nvar data = {\n  manager: person1\n};\n\n$(\"#modifyLeaf\").on(\"click\", function() {\n  $.observable(data.manager).setProperty({\n    name: \"Hermione\",\n    \"address.street\": \"Main St\",\n    \"address.ZIP\": \"45008\"\n  });\n});\n\n$(\"#changeAddress\").on(\"click\", function() {\n  $.observable(data.manager).setProperty(\n    \"address\", \n    {\n      street: \"New Street\",\n      ZIP: \"99999\"\n    }\n  );\n});\n\n$(\"#UKAddress\").on(\"click\", function() {\n  $.observable(data.manager).setProperty(\n    \"address\", \n    {\n      street: \"St James St\"\n    }\n  );\n});\n\n$(\"#changeManager\").on(\"click\", function() {\n  $.observable(data).setProperty({\n    manager: data.manager === person1 ? person2 : person1\n  });\n});\n\nvar tmpl = $.templates(\"#managerTmpl\");\n\ntmpl.link(\"#result\", data);\n{^{if manager^address.ZIP}}\n  <td>...<input data-link=\"manager^address.ZIP\" /></td>\n{{else}}\n  <td>...UK address - No ZIP</td>\n{{/if}}\n\n\n"
      }
    ]
  },
  "link-computed": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-targets": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-input": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-select": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-textarea": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-contenteditable": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-widgets": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-custom": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-svg": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-css": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-text-html": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-class": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-visibility": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-properties": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "link-attributes-props": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "contextual-params": {
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
        "text": "paragraph\n"
      }
    ]
  },
  "tag-bindings": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "{for}, {if}, custom bindings\n"
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
        "text": "JsRender default tag delimiters\nTemplate tags in JsRender use the Mustache style: {{...}}.\nWhen using JsViews you can also use data-binding - with data-linked tags, written: {^{...}}\n"
      },
      {
        "_type": "para",
        "title": "Changing delimiters:",
        "text": "Changing delimiters:\nSometimes there can be a need to use different delimiters. For example there may be a conflict if the template is being rendered on the server using a declarative syntax such as Django with the same default delimiters {{ and }}.\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following call:\n$.views.settings.delimiters(\"<%\", \"%>\");\n\nwill change the tag syntax to <%...%> for JsRender, and <^%...%>) for a data-linked tag in JsViews.\nAnd the following:\n$.views.settings.delimiters(\"<<\", \">>. \"*\");\n\nwill change to  <<...>> for a JsRender tag, and <*<...>>) for a data-linked tag in JsViews.\n"
      },
      {
        "_type": "para",
        "title": "Verifying current setting for tag delimiters:",
        "text": "Verifying current setting for tag delimiters:\nvar delimiters = $.views.settings.delimiters();\n// Returns an array [\"{{\", \"}}\", \"^\"] - JsRender tag delimiters and JsViews link character\n\n"
      },
      {
        "_type": "sample",
        "title": "Choosing alternative tag delimiters, with JsViews",
        "text": "Choosing alternative tag delimiters, with JsViews\n\n\n\n  <b>[[:title]]</b>\n  <ul>\n    [[for members]]\n      <li>Name: [*[:name]] <input data-link=\"name trigger=true\"/></li>\n    [[/for]]\n  </ul>\n\n\n$.views.settings.delimiters(\"[[\", \"]]\", \"*\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n\nvar team = {\n    title: \"A team\",\n    members: [{name: \"Jo\"}]\n  };\n\ntmpl.link(\"#result\", team);\nMarkup:\n<script id=\"peopleTmpl\" type=\"text/x-jsrender\">\n  <b>[[:title]]</b>\n  <ul>\n    [[for members]]\n      <li>Name: [*[:name>]] <input data-link=\"name trigger=true\"/></li>\n    [[/for]]\n  </ul>\n</script>\n\nCode\n$.views.settings.delimiters(\"[[\", \"]]\", \"*\");\n\nvar tmpl = $.templates(\"#peopleTmpl\");\n...\n\n\n"
      }
    ]
  },
  "jsvsettings/debugmode": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender/JsViews has a ‘debug mode’ setting which determines whether error messages encountered during rendering are displayed.\nTo get current debug mode:\nvar isDebugMode = $.views.settings.debugMode(); // false by default\n\nTo set debug mode:\n$.views.settings.debugMode(...);\n\nDebug mode can be set to any of the following:\n\nfalse – errors during rendering will not be rendered (but an exception will be thrown)\ntrue – no exception will be thrown, but the error message will be rendered, in place of the template tag or block\n\"some string\" – no exception. The string \"some string\" will be rendered in place of the tag or block\n\"\" (empty string) – no exception. The tag or block will simply be replaced by the empty string\nan function (to be used as an error handler) – no exception. The handler will run, and the error string will be rendered, or else, if the function returns a string, that string will be rendered\n\nSee Error handling and debugging for a full discussion of alternative approaches, together with details and working examples of $.views.settings.debugMode(...).\nIn particular, see this sample of using $.views.settings.debugMode(true) with JsViews, and data-linking.\n"
      }
    ]
  },
  "jsvsettings/onerror": {
    "sections": []
  },
  "jsvsettings/trigger": {
    "sections": []
  },
  "jsvsettings/advanced": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews has the following advanced settings:\n\nuseViews – default: false\nlinkAttr – default: \"data-link\"\nnoValidate – default: false\n\nand also the following ‘private’ advanced settings:\n\n_jsv – default: false\n_wm – default: current ‘wrapMap’ settings\n_fe – default: current ‘form element binding’ settings\n\nuseViews controls a JsRender performance optimization, while building the view hierarchy. In very simple templates there will usually not be any need to access the view. JsRender detects these cases, does not create a view, and hence obtains a slight performance gain. By setting useViews to true, you guarantee that JsRender will always create views for template blocks.\nlinkAttr determines the JsViews data-link attribute. By default it is data-link. If there is a conflict where another module also uses the ‘data-link’ attribute, then you can choose a different attribute for JsViews data-linking.\nFor example, if you set $.views.settings.advanced({linkAttr: \"link\"}), then you would write <input link=\"name\"/> instead of <input data-link=\"name\" /> for data-linking an <input/> to name.\nnoValidate controls whether JsViews runs validation code during data-linking, to raise an error in the case of invalid HTML structure (such as <div/> or <div><span></div>) or HTML/JsViews tag structure (such as {^{if...}} <span{{/if}} ... >). By setting noValidate to true, JsViews will skip the validation step, with a minor improvement to performance as a result.\n_jsv is a ‘private’ setting (could change in the future). If set to true JsRender provides a global _jsv variable, which gives access to the internal store of views.\n_wm is a ‘private’ setting (could change in the future). It determines the ‘wrapMap’ configuration which controls how document fragments are inserted into the DOM during data-linking. (Also used by jQuery DOM manipulation).\n_fe is a ‘private’ setting (could change in the future). If contains the ‘form element binding’ configuration, which determines the elements (such as <input/> or <textarea>) which provide two-way data-binding with JsViews – and specifies the default data-linked attribute, such as value.\nTo get current advanced settings:\nvar advancedSettings = $.views.settings.advanced();\n\nBy default the returned advancedSettings object is:\n{useViews: false, linkAttr: \"data-link\", noValidate: false, _jsv: false, _wm: ..., _fe: ...}\n\nTo set advanced settings:\n$.views.settings.advanced({useViews: true});\n// Set one or more advanced settings\n\n"
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
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  }
}