var content = $.views.documentation.content;

content.find.samples = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/samples")) ||
{
  "samples": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Note: New content is being added regularly to this set of samples.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also:\n\nthe demos folder of the JsRender GitHub repository – available here as live samples\nthe demos folder of the JsViews GitHub repository – or here as live samples\n\n"
      }
    ]
  },
  "samples/jsr": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Note: New content is being added regularly to this set of samples.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the additional samples in the demos folder of the JsRender GitHub repository (available here as live samples).\n"
      }
    ]
  },
  "samples/jsr/composition": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/jsr/composition/tmpl": {
    "sections": [
      {
        "_type": "sample",
        "title": "",
        "url": "samples/jsrender/composition/tmpl/sample",
        "text": "Composition by providing tmpl parameters referencing external templates, rather than inline block content, as in:\n{{for languages tmpl=\"#columnTemplate\"/}}\n\nor:\n{{if name.charAt(0)==='E' tmpl='#rowTemplate'}}\n{{else tmpl='#columnTemplate'}}\n{{/if}}\n\nAlso shows wrapping, where an external template is used which then wraps the rendered block content, as in:\n{{include tmpl=\"#sectionWrapperTemplate\"}}\n  {{>title}}\n{{/include}}\n\n<script id=\"sectionWrapperTemplate\" type=\"text/x-jsrender\">\n  <td>Section: <em>{{include tmpl=#content/}}</em></td>\n</script>\n\nor as in:\n{{for languages tmpl='#indexWrapperTemplate'}}\n  <b>{{>name}}</b>\n{{/for}}\n\n<script id=\"indexWrapperTemplate\" type=\"text/x-jsrender\">\n  <div>\n    {{:#index}}:\n    {{include tmpl=#content/}}\n  </div>\n</script>\n\nNote that tmpl=#content above is not a jQuery selector, but rather uses view.content. See Wrapping content.\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the following samples which are variants of this sample:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/jsr/composition/from-strings": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "All of the templates referenced by tmpl=… in the preceding tmpl parameter sample were declared as script blocks. But they could equally have been compiled from markup strings.\nHere is a simple example:\n"
      },
      {
        "_type": "sample",
        "url": "samples/jsrender/composition/from-strings/sample",
        "text": "Simple example of composition\nWe register two named templates, compiled from markup strings:\n$.templates({\n  people: '<div>{{:name}} lives in {{for address tmpl=\"address\" /}}</div>',\n  address: '<b>{{>city}}</b>'\n});\n\nThe first one uses the second as a nested template:\n{{for address tmpl=\"address\" /}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the next remote templates sample we will show a modified version of this sample but with the strings fetched “lazily” from the server.\n"
      }
    ]
  },
  "samples/jsr/composition/remote-tmpl": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample takes the preceding Template composition/from strings sample, and modifies it to use templates loaded from the server.\n(See also the simple examples of loading templates from the server, in the Compile templates API topic.)\n"
      },
      {
        "_type": "sample",
        "url": "samples/jsrender/composition/remote-tmpl/sample",
        "text": "Asynchronous loading of templates from the server\nThis sample illustrates one approach to loading remote templates: the template file on the server is a javascript file which registers a named template.\n\nTemplate resource on the server: address.js \n\n$.templates(\"address\", \"{{>city}}\");\n\nlazyGetTemplate() helper function\nWe use a helper to “lazily” fetch the template, asynchronously, but only if it has not yet been fetched. Also, we make sure the template only gets compiled from a string once.\n(Note that for optimal performance, it is always best to ensure that the $.template(... markup) method, which compiles a template from a string, is only ever called once for a given string).\nfunction lazyGetTemplate(name) {\n  var deferred = $.Deferred();\n  if ($.templates[name]) {\n    deferred.resolve();\n  } else {\n    $.getScript(...).then(function() {\n      ...  \n      deferred.resolve();\n    });\n  }\n  return deferred.promise();\n}\n\n\nWhen all templates are loaded...\nOnce the requested template (along with any nested templates used as as part of the template composition) is loaded, the render() method can be called (or the link() method if you are using JsViews):\n$.when(\n    lazyGetTemplate(\"people\"),\n    ...  \n  )\n  .done(function() {\n      // Render or link once all templates for template composition are loaded\n      var html = $.templates.people.render(people);\n      ...\n    });\n\n\n"
      }
    ]
  },
  "samples/jsr/composition/sub-tmpl": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample takes the previous tmpl parameter sample and modifies it to declare nested templates as sub-templates of the calling template.\n"
      },
      {
        "_type": "sample",
        "url": "samples/jsrender/composition/sub-tmpl/sample",
        "text": "Using sub-templates\n$.templates(\"movieTemplate\", {\n  markup: \"#movieTemplate\",\n  templates: {\n    columnTemplate: \"#columnTemplate\",\n    ...\n  }\n});\n\nNow “columnTemplate” is a named template available only to the “movieTemplate”. (See $.templates().)\n<script id=\"movieTemplate\" type=\"text/x-jsrender\">\n  ...\n  {{for languages tmpl=\"columnTemplate\"/}}\n  ...\n</script>\n\n\n"
      }
    ]
  },
  "samples/jsr/composition/tmpl-objects": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample takes the previous tmpl parameter sample and provides  nested templates to the calling template, by passing them in as compiled template objects, associated with a helper object.\n"
      },
      {
        "_type": "sample",
        "url": "samples/jsrender/composition/tmpl-objects/sample",
        "text": "nestedTemplates is an object which holds references to compiled template objects for each of the nested templates. We pass it in as a helper object in the render() call.\n(Note we could also have provided the templates via helper objects registered globally with $.views.helpers(...)).\nvar nestedTemplates = {\n  columnTemplate: $.templates(\"#columnTemplate\"),\n  ...\n};\n\nvar html = movieTemplate.render(movies, sub-templates);\n\nNow each of the compiled templates, such as nestedTemplates.columnTemplate can be accessed from the outer template, and used for composition. Templates are accessed as regular helper objects such as ~columnTemplate.\n<script id=\"movieTemplate\" type=\"text/x-jsrender\">\n  ...\n  {{for languages tmpl=~columnTemplate/}}\n  ...\n</script>\n\n\n"
      }
    ]
  },
  "samples/jsr/tags": {
    "sections": [
      {
        "_type": "para",
        "title": "Custom tags for JsRender",
        "text": "Custom tags for JsRender\nThe following examples are custom tags that can be used in JsRender or in JsViews:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "Custom tags for JsViews",
        "text": "Custom tags for JsViews\nSee also the examples of JsViews custom tags (tag controls) which include data-linking and interactivity – and are in fact fully-fledged “widgets” or controls, such as the date-picker control, or the tabs control:\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/jsr/tags/wrap-content": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/jsrender/tags/wrap-content/sample",
        "text": "Composition with custom tags\nThis sample shows some basic custom tags implemented as simple render functions, or templates, and in each case shows how the tag can incorporate block content…\n{{mytag}}\n  {{>title}}\n{{/mytag}}\n\n…into its rendering.\nA variant, is to incorporate external content (through a tag parameter such as tmpl, referencing an external template) into the rendered output…\n{{mytag tmpl=\"#externalcontent\"/}}\n\n\n"
      }
    ]
  },
  "samples/jsr/tags/extend-for": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample shows a custom tag: {{range}} – extending the {{for}} tag, used with JsRender (code: range.js).\n(See also the tag-controls/range sample – which uses the same tag with JsViews, as a data-linked custom tag control.)\n"
      },
      {
        "_type": "sample",
        "url": "samples/jsrender/tags/extend-for/sample",
        "text": "A {{range}} tag - extending the {{for}} tag\n{{range}} inherits from {{for}}, and adds support for iterating over a range (start to end) of items within an array, or for iterating directly over integers from start integer to end integer.\n\nRange of items from array\n\n{{range members start=1 end=3}}\n  ...\n{{else}}\n  ...\n{{/range}}\n\nRange of integers\n\n{{range start=10 end=40}}\n  ...\n{{else}}\n  ...\n{{/range}}\n\nDerive from {{for}} tag\n\n$.views.tags({\n  range: {\n    // Inherit from {{for}} tag\n    baseTag: \"for\",\n\n    // Override the render method of {{for}}\n    render: function(val) {\n\n      ...\n\n      // Call the baseTag render method\n      return this.baseTag.render.apply(this, val ? [val] : arguments);\n    },\n\n    ...\n  }\n});\n\n\n"
      }
    ]
  },
  "samples/tag-controls/multiselect": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/multiselect/sample",
        "text": "A multiselect custom tag control \nThis is a fairly advanced sample: A multiselect control which supports both the inline data-binding syntax:\n{^{multisel items=items selected=selectedItems .../}}\n\nand the element-based data-link syntax, using a <select> tag:\n<select data-link=\"{multisel items=items selected=selectedItems ...}\"></select>\n\nIt provides two array  properties, items and selectedItems. Both use observable arrayChange data-binding, so you can (as in the example) use two-way binding between the selectedItems property of one multiselect and the items of another, following a cascading pattern.\n\n"
      }
    ]
  },
  "jsvrendertmpl": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph\n"
      }
    ]
  },
  "samples/jsr/helpers": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample shows both passing helpers to template.render() and rendering an array as a non-repeating layout\n"
      },
      {
        "_type": "sample",
        "url": "samples/jsrender/helpers/sample",
        "text": "For more information about helpers, see the $.views.helpers() API topic.\nThis sample shows passing in helpers to the render() method:\nvar html = $(\"#movieTemplate\").render(\n  // Pass in data\n  [movies],\n  // Pass in helpers\n  {\n    reverseSort: reverse,\n    ...\n  }\n);\n\nIn this case our template renders an array (with sort-order based on the ~reverseSort boolean value we pass in as a helper).\nTo make our template render just once, rather than iterating over the movies array, we wrap the array – as render([myArray]) – and then within the template we do the iteration, using {{for #data}}.\n{{for #data}}\n  <tr>\n    <td>{{>~format(title)}}</td>\n    <td>\n      {{sort languages reverse=~reverseSort}}\n        <div><b>{{>name}}</b></div>\n      {{/sort}}\n    </td>\n  </tr>\n{{/for}}\n\n\n"
      }
    ]
  },
  "samples/jsr/paths": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/jsrender/paths/sample",
        "text": "Data paths, helper paths and view paths\nThis sample shows the use of different kinds of path, in JsRender tag expressions.\n\nData paths:\nThe following example shows a data path, address.street for ‘drilling down’ into data from the current data item.\n{{>address.street}}\n\nAnd here is an example of a slightly more complex expression, with a null check for address:\n{{if address && address.street}}\n\n\nHelper paths\nHelper paths start with ~. Here is a helper path (in this case, to a helper method):\n{{for ~combine(phones, cells)}}\n\nThe following shows helper paths referencing ‘helper properties’ (objects, or values):\n{{:~lateMessages.noAddress || ~messages.noAddress}}\n\nAnd here is an example of a helper path, ~frstNm, which is actually an ‘alias’ for the firstName, taken from an outer data-context, and is passed in through the nesting data contexts of the 'views’:\n{{for ... ~frstNm=firstName}}\n  ... {{>~frstNm}} ...\n{{else}}\n  ... {{>~frstNm}} ...\n{{/for}}\n\n\nView paths\nView paths start with \"#\":\n{{>#data}}\n\n{{>#parent.parent.data.firstName}}\n\nA view path is a way to access the current ‘view’ object (instance of a rendered template or of the block content of a tag), and drill into its properties. The examples above access view.data and view.parent.parent.data.firstName\n\n"
      }
    ]
  },
  "samples/jsv": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Note: New content is being added regularly to this set of samples.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the additional samples in the demos folder of the JsViews GitHub repository (available here as live samples).\n"
      }
    ]
  },
  "samples/jsr/converters": {
    "sections": [
      {
        "_type": "para",
        "title": "Using built-in HTML and URL and attribute encoders",
        "text": "Using built-in HTML and URL and attribute encoders\nJsRender includes built-in converters, for HTML encoding, attribute encoding and URL encoding. A common use for these converters is to protect against injection attacks from untrusted data.\nIt is generally best to use {{> }} when rendering data within element content, if the data is not intended to provide markup for insertion in the DOM.\nIn the context of HTML attributes, use {{attr: }}, or it the case of attributes corresponding to URLs,  {{url: }}\n"
      },
      {
        "_type": "sample",
        "title": "Using {{: }} or {{> }} to render data values with optional conversion or encoding",
        "url": "samples/jsrender/converters/sample",
        "text": "Using {{: }} or {{> }} to render data values with optional conversion or encoding\nSpecifying converters:\n\n{{:value}} — does not convert. Used to render values that include html markup.\n{{loc:value lang=\"...\"}} — Uses custom converter, below.\n{{html:value}} — Converts using built-in HTML encoder. (Better security within element content, but slight perf cost).\n{{>value}} — Alternative syntax for built-in HTML encoder.\n{{attr:availability}} — Converts using built-in attribute encoder. (Better security within attributes).\n{{url:value}} — Converts using built-in URL encoder.\n\n\nDeclaring custom converters\n\n$.views.converters({\n  loc: function(value) {\n    var language = this.tagCtx.props.lang;\n    ... (return localized value based on language)\n  }\n});\n\n\n"
      }
    ]
  },
  "samples/tag-controls": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/tag-controls/tabs": {
    "sections": [
      {
        "_type": "sample",
        "title": "Tabs control",
        "url": "samples/tag-controls/tabs/sample",
        "text": "Tabs control\nNested tags:\nThe sample shows two instances of a custom {{tabs}} tag control – an outer one, and a second inner one in one of the tabs of the outer one…\n\nHere is markup for the inner one:\n\n{^{tabs tabCaption=\"Inner One\"}}\n  ONE inner\n{{else tabCaption=\"Inner Two\"}}\n  TWO  {{>label2}}\n{{else tabCaption=\"Inner Three\"}}\n  THREE inner\n{{/tabs}}\n\n\n"
      }
    ]
  },
  "samples/jsrandjsvconverters": {
    "sections": [
      {
        "_type": "sample",
        "text": ""
      }
    ]
  },
  "samples/jso": {
    "sections": []
  },
  "samples/editable/tags": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the first of four samples exploring alternative patterns for creating two-way binding and providing UI for editing data.\n"
      },
      {
        "_type": "sample",
        "url": "samples/editable-data/linked-tags/sample",
        "text": "Data-linked tags: {^{for ...}}, {^{:...}}, etc.\nThis sample uses data-linked tags for {^{for ...}} (iteration over arrays) and for {^{:...}} and {^{>...}} (one-way data binding):\n{^{for movies}}\n  <tr class=\"hover\" data-link=\"css-background-color{:~bgColor()}\">\n      <td>\n      {^{:#index + 1}}: {^{>title}}\n      </td>\n      <td>\n      {^{for languages}}\n          <div>{^{>name}}</div>\n      {{/for}}\n    </td>\n    ...\n  </tr>\n{{/for}}\n\n\nData-linked elements: <input data-link=\"...\"/>\nBut for two-way data binding of the textboxes in the detail view it uses data-linked <input/> elements:\n{^{for movies[selectedIndex]}}\n  ...\n  <input data-link=\"title\" />\n  ...\n  {^{for languages}}\n    ...\n    <input data-link=\"name\" />\n    ...\n  {{/for}}\n  ...\n{{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the next sample we will replace the data-linked tags for one-way binding by equivalent data-linked elements.\n"
      }
    ]
  },
  "samples/editable/elems": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample modifies the previous sample by replacing the data-linked tags for one-way binding with equivalent data-linked elements.\n"
      },
      {
        "_type": "sample",
        "url": "samples/editable-data/linked-elems/sample",
        "text": "Data-linked elements: <span data-link=\"...\"> etc.\nThis sample uses data-linked tags for {^{for ...}} (iteration over arrays) but it uses data-linked elements for one-way data binding:\n{^{for movies}}\n  <tr class=\"hover\" data-link=\"css-background-color{:~bgColor()}\">\n      <td>\n        <span data-link=\"#index + 1\"></span>:\n        <span data-link=\"title\"></span>\n      </td>\n      <td>\n      {^{for languages}}\n        <div data-link=\"name\"></div>\n      {{/for}}\n    </td>\n    ...\n  </tr>\n{{/for}}\n\nas well as for the two-way data binding of the textboxes in the detail view:\n{^{for movies[selectedIndex]}}\n  ...\n  <input data-link=\"title\" />\n  ...\n  {^{for languages}}\n    ...\n    <input data-link=\"name\" />\n    ...\n  {{/for}}\n  ...\n{{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the next sample we will replace some of the templated content by top-level data-linked elements, and we will show how to use {for} bindings with data-linked elements.\n"
      }
    ]
  },
  "samples/editable/toplevel-for": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample modifies the previous sample by replacing some of the templated content by top-level data-linked elements. It also shows how to use {for} bindings with data-linked elements.\n"
      },
      {
        "_type": "sample",
        "url": "samples/editable-data/toplevel-for/sample",
        "text": "Data-linked top-level elements: <div data-link=\"...\"> etc.\nThis sample uses data-linking on top-level elements (i.e. elements that are not part of rendered templates):\n$.link(true, \"#linkedContent\", app)\n\n<div id=\"linkedContent\">\n  <table>\n    ...\n    <tbody class=\"movies\" data-link=\"{for movies tmpl='movieTmpl'}\"></tbody>\n  </table>\n\n  <div class=\"detail\" data-link=\"{for movies[selectedIndex] tmpl='#detailTemplate'}\"></div>\n</div>\n\n\nData-linked {for} binding: data-link=\"{for ...}\"\nThe data-linked <tbody> element uses a {for ...} binding, referencing a template –\n<tbody class=\"movies\" data-link=\"{for movies tmpl='movieTmpl'}\"></tbody>\n\n– so it is the element-based data-linking equivalent of\n{^{for movies tmpl='movieTmpl'}}\n\nand the content of the <tbody> is automatically incrementally updated when the movies array is modified.\nSimilarly the whole detail view, with its dynamic linking to the selected movie item, is achieved by a single data-linked top-level <div ...>, using {for ...} referencing a template:\n<div class=\"detail\" data-link=\"{for movies[selectedIndex] tmpl='#detailTemplate'}\"></div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the next sample we will replace the declarative top-level binding for the detail view by a programmatic approach, using $.observe().\n"
      }
    ]
  },
  "samples/editable/observe": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample modifies the previous sample by replacing the declarative top-level binding for the detail view by a programmatic approach, using $.observe().\n"
      },
      {
        "_type": "sample",
        "url": "samples/editable-data/observe/sample",
        "text": "We will replace the top-level data-linked element for the detail view:\n<div class=\"detail\" data-link=\"{for movies[selectedIndex] tmpl='#detailTemplate'}\"></div>\n\nby an unlinked element:\n<div id=\"movieDetail\" class=\"detail\"></div>\n\nNow, we will set up a listener for observable changes in the selectedIndex property of our app object, and when it changes we will insert or remove data-linked templated content for the selected data item, within our movieDetail element.\n$.observe(app, \"selectedIndex\",  function(event, args) {\n  var selectedIndex = args.value;\n  if (selectedIndex > -1) {\n    $.link.detailTmpl(\"#movieDetail\", app.movies[selectedIndex]);\n  } else {\n    $(\"#movieDetail\").empty();\n  }\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the next sample we will return to the declarative top-level binding approach for the detail view, and replace the plain objects hierarchy by a hierarchy of compiled View Models.\n"
      }
    ]
  },
  "samples/editable/compiled": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample returns to the sample with declarative top-level binding for the detail view, and replaces the plain objects hierarchy by a hierarchy of compiled View Models.\n"
      },
      {
        "_type": "sample",
        "url": "samples/editable-data/compiled/sample",
        "text": "Set up initial data:\napp = {\n  selectedIndex: null,\n  movies: [...]\n};\n\nCompile View Models:\n$.views.viewModels({\n  MovieApp: {\n    getters: [...],\n    extend: {...}\n  },\n  Movie: {\n    ...\n  },\n  Language: {\n    ...\n  }\n});\n\nInstantiate View Models:\nvar appVm = $.views.viewModels.MovieApp.map(app);\n\nTop level data-linking – bind content to View Models:\n$.link(true, \".linkedContent\", appVm);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the next sample we will provide a Save/Undo feature – where Save uses the submit action of an HTML form to save data changes to the server, and Undo uses the compiled View Model merge() and unmap() features to revert changes.\n"
      }
    ]
  },
  "samples/editable/submit": {
    "sections": [
      {
        "_type": "para",
        "title": "Using merge() and unmap() for Save/Undo behavior, in an MVVM application",
        "text": "Using merge() and unmap() for Save/Undo behavior, in an MVVM application\nThe following sample (available also at MVVM Dynamic view hierarchy) modifies the previous sample by providing a Save/Undo feature.\nIt provides a Submit Changes button (which makes a ‘snapshot’ of current View Model data, and which would in a ‘real app’ save that data back to the server), and an Undo button (which reverts current View Model data back to the last ‘snapshot’).\nSpecifically:\n\nSubmit Changes is bound to the submit action of an HTML form – so will be triggered also by Enter\nIt uses the compiled View Model unmap() feature to make a snapshot of data for sending to the server\nUndo uses the compiled View Model merge() feature to revert changes\n\n"
      },
      {
        "_type": "sample",
        "url": "samples/editable-data/submit/sample",
        "text": "Provide Submit Changes and Undo buttons, binding to saveData and undo methods of View Model:\n<div class=\"linkedContent\">\n  ...\n  <button data-link=\"{on undo} ...\">Undo</button>\n  ...\n  <form data-link=\"{on 'submit' saveData}\">\n    <button type=\"submit\" ...>Submit Changes</button>\n    ...\n    <tbody class=\"movies\" data-link=\"{for movies() tmpl='#movieTemplate'}\"></tbody>\n    ...\n    <div class=\"detail\" data-link=\"{for movies()[selectedIndex()] tmpl='#detailTemplate'}\"></div>\n  </form>\n</div>\n\nProvide undo and saveData methods on compiled View Model:\n$.views.viewModels({\n  MovieApp: {\n    getters: [...],\n    extend: {\n      undo: function() {\n        // Revert to previous savedData\n        this.merge(savedData);\n        ...\n      },\n      saveData: function() {\n        // Save current data, for subsequent Undo behavior\n        savedData = this.unmap();\n        // Submit current data to server\n        $.post(\"/save/data\", ...savedData, function(msg) {...});\n        ...\n      },\n      ...\n\n\n"
      }
    ]
  },
  "samples/editable": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "These four samples explore alternative patterns for creating two-way binding and providing UI for editing data.\nThe UI for all four is visually identical, but the approach to templated rendering and data-linking is different.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/tag-controls/tree": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This set of samples shows three variants of a tree tag control:\nThe first uses visible{:...} binding to show and hide tree nodes using display:none. It also allows the user to select/deselect nodes. \nThe second uses {^{if ...}} binding to conditionally render tree nodes.\nThe third adds editability, to allow the user to create or remove nodes, and to modify labels."
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/tag-controls/validate": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "These samples use the custom {{validate}} tag control.\nThis provides validation support to all the two-way bound controls based on form elements, such as text box, dropdown, checkbox, radio button group or textarea, as well as to custom tags such as the {{datepicker}} and {{slider}} controls.\nIn addition, a {{validation}} control adds group validation. See the date-picker validation wizard sample, as an example of using the group validation features: In that sample, the next button is only enabled when all controls on the current pane validate successfully.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/tag-controls/datepicker": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{datepicker}} tag integrates the jQueryUI datepicker widget.\nThis allows data-linking directly to widget properties, as well as using generic tag functionality such as convert and convertBack.\nIn addition, validation support is obtained, simply by wrapping a {{datepicker}} tag with a {{validation}}.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/tag-controls/slider": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{slider}} tag derives integrates the jQueryUI slider widget.\nThis allows data-linking directly to widget properties, as well as using generic tag functionality such as convert and convertBack.\nIn addition, validation support is obtained, simply by wrapping a {{slider}} tag with a {{validation}}.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/tag-controls/datepicker/simple": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqueryui/datepicker/simple/sample",
        "text": "Simple datepicker\n\n{^{datepicker startDate /}}\n\ndatepicker with data-linked properties\n\n{^{datepicker startDate\n  _changeMonth=true\n  ^_maxDate=endDate\n/}}\n\nIn-line datepicker with data-linked properties\n\n{^{datepicker middleDate\n  ^_minDate=startDate\n  ^_maxDate=endDate\n  ^_numberOfMonths=~page.monthsSpan\n}}\n  \n{{/datepicker}}\n\n"
      }
    ]
  },
  "samples/tag-controls/datepicker/variants": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqueryui/datepicker/variants/sample",
        "text": "Multiple examples of {{datepicker}} syntax…\n\n"
      }
    ]
  },
  "samples/tag-controls/datepicker/with-validation": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqueryui/datepicker/with-validation/sample",
        "text": "To add validation to a datepicker, simply wrap with a {{validation}} tag.\n{^{validate startDate\n  required=true\n  ^maxday=endDate\n}}\n  {^{datepicker startDate _numberOfMonths=2 /}}\n{{/validate}}\n\n\n"
      }
    ]
  },
  "samples/tag-controls/datepicker/with-validation-wizard": {
    "sections": [
      {
        "_type": "sample",
        "title": "",
        "url": "samples/tag-controls/jqueryui/datepicker/with-validation-wizard/sample",
        "text": "The sample shows a wizard, using {^{if ...}} ... {{else ...}} ... {{else ...}} ... {{else}} ... {{/if}} to manage displaying the separate wizard steps, one after the other…\nMoving to the next step is not possible until the validate controls on the current step are all valid.\nThis is achieved by wrapping in a validation group {{validation}}.\nThe enabled/disabled state of the Next button is data-linked to the validation.isValid property:\n{^{validation}}\n  ...\n  <button id=\"next\" data-link=\"... disabled{:!~tag.isValid}\">Next</button>\n  ...\n  <h4>Choose a start date:</h4> \n  {^{validate startDate\n    required=true\n    ^maxday=endDate\n  }}\n    {^{datepicker startDate _numberOfMonths=1 /}}\n  {{/validate}}\n  ...\n{{/validation}}\n\n\n"
      }
    ]
  },
  "samples/tag-controls/tree/visible-binding": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the first of three variants of a tree tag control. This version uses visible{:...} binding to show and hide tree nodes using display:none.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/tree/visible-binding/sample",
        "text": "The data is a hierarchy of node objects each of which has a name property and an optional folder property containing child data nodes:\nvar rootFolder = {\n  name: \"Categories\", folders: [\n    {name: \"Drama\", folders: [\n      {name: \"Courtroom\"},\n      {name: \"Political\"}\n    ]},\n    {name: \"Classic\", folders: [\n      ...\n    ]}\n  ]};\n\nThe {{tree}} tag is a tag control for a node in the tree. It renders a node in the data hierarchy, and has a boolean expanded property.\n$.views.tags({\n  tree: {\n    onBind: function() {\n      var self = this;\n      self.contents(\"li\").first()\n        .on(\"click\", \".toggle\", function() {\n          self.toggle();\n        });\n    },\n    template: \"<li>...\",\n\n    //PROPERTIES\n    expanded: false, // default to unexpanded\n\n    //METHODS\n    toggle: function() {\n      $.observable(this).setProperty(\"expanded\", !this.expanded);\n    },\n    ...\n  }\n});\n\nIt uses a template which recursively renders the child data nodes using the same data-linked tag: {^{tree}}, and data-links to the expanded property of the control (tag instance).\n<li>\n  ...\n  {{>name}}\n</li>\n{{if folders}}\n  <li data-link=\"visible{:~tag.expanded}\">\n    <ul>\n      {{for folders}}\n        {^{tree/}}\n      {{/for}}\n    </ul>\n  </li>\n{{/if}}\n\nThis version of the {{tree}} tag binds using the data-link visible target  to show or hide the child nodes.\n<li data-link=\"visible{:~tag.expanded}\">\n\n\n"
      }
    ]
  },
  "samples/tag-controls/tree/if-binding": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the second of three variants of a tree tag control. This version uses {^{if ...}} binding to conditionally render tree nodes.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/tree/if-binding/sample",
        "text": "The data is a the same hierarchy of node objects used in the previous sample:\nvar rootFolder = {\n  name: \"Categories\", folders: [\n    {name: \"Drama\", folders: [\n      {name: \"Courtroom\"},\n      {name: \"Political\"}\n    ]},\n    {name: \"Classic\", folders: [\n      ...\n    ]}\n  ]};\n\nThe {{tree}} tag is a tag control for a node in the tree. It renders a node in the data hierarchy, and sets a boolean expanded property on the data node.\n$.views.tags({\n  tree: {\n    onBind: function() {\n      var self = this;\n      self.contents(\"li\").first()\n        .on(\"click\", \".toggle\", function() {\n          self.toggle();\n        });\n    },\n    template: \"<li>...\",\n\n    //METHODS\n    toggle: function() {\n      $.observable(this.view.data).setProperty(\"expanded\", !this.view.data.expanded);\n    },\n    ...\n  }\n});\n\nIt has a template which with a {^{if expanded }} section which renders the child data nodes only if expanded === true, using the same data-linked tag: {^{tree}}.\n<li>\n  ...\n  {{>name}}\n</li>\n{^{if expanded}}\n  <li>\n    <ul>\n      {{for folders}}\n        {^{tree/}}\n      {{/for}}\n    </ul>\n  </li>\n{{/if}}\n\n\n"
      }
    ]
  },
  "samples/tag-controls/tree/editable": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the third of three variants of a tree tag control. This version adds editability, to allow the user to create or remove nodes, and to modify labels.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/tree/editable/sample",
        "text": "This version builds on the previous sample, and adds editability:\nCode:\n$.views.tags({\n  editableTree: {\n    ...\n    template: \"#editableTreeTemplate\",\n\n    //METHODS\n    ...\n    remove: function() {\n      var parentFolders = this.parent.view.data.folders,\n        index = this.tagCtx.view.index;\n      $.observable(parentFolders).remove(index);\n    },\n    addFolder: function() {\n      $.observable(this.view.data.folders).insert({\n        name: \"new folder\",\n        folders: []\n      });\n      $.observable(this.view.data).setProperty(\"expanded\", true);\n    },    ...\n  }\n});\n\neditableTreeTemplate:\n<li>\n  ...\n  {^{if ~tag.tagCtx.props.editable}}\n    <input data-link=\"name\" />\n    <span data-link=\"{on ~tag.addFolder}\" class=\"add\">add</span>\n    {^{if ~tag.parent && ~tag.parent.tagName==='editableTree'}}\n      {{!-- Don't allow removing the top-level tree control --}}\n      <span data-link=\"{on ~tag.remove}\" class=\"remove\"></span>\n    {{/if}}\n  {{else}}\n    {^{>name}}\n  {{/if}}\n</li>\n{^{if expanded}}\n  ...\n{{/if}}\n\n\n"
      }
    ]
  },
  "samples/tag-controls/slider/simple": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Here is a sample using data-linking to instantiate and bind a slider control, as well as SVG content, within a template:\n"
      },
      {
        "_type": "sample",
        "title": "Slider control",
        "url": "samples/tag-controls/jqueryui/slider/simple/sample",
        "text": "Slider control\nSimple slider\n\n{^{slider size /}}\n\nSlider with initialized properties\n{^{slider size _range='min' _min=1 _max=200 width=400 _orientation='vertical' /}}\n\nor\n<div data-link=\"{slider size _range='min' _min=1 max=200 _orientation='vertical' width=400}\"></div>\n\n\nData-linking to SVG content\n\n\n  \n  ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here is another version of the above sample, using top-level data-linking to instantiate and bind the slider control and the SVG content (within top-level page content rather than in a rendered template):\n"
      },
      {
        "_type": "sample",
        "title": "Top-level data-link=\"{slider ...}\"",
        "url": "samples/tag-controls/jqueryui/slider/simple-toplevel/sample",
        "text": "Top-level data-link=\"{slider ...}\"\nSlider with initialized properties (top-level data-linking)\n<div data-link=\"{slider size _range='min' _min=1 max=200 _orientation='vertical' width=400}\"></div>\n\n\nData-linking to SVG content\n\n\n  \n  ...\n\n\nActivate data-linking \n\n$.link(true, \"body\", model);\n\n"
      }
    ]
  },
  "samples/tag-controls/slider/variants": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqueryui/slider/variants/sample",
        "text": "Multiple examples of {{slider}} syntax…\n\n"
      }
    ]
  },
  "samples/tag-controls/slider/with-validation": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqueryui/slider/with-validation/sample",
        "text": "To add validation to a slider, simply wrap with a {{validation}} tag.\n{^{validate size\n  min=20\n  max=150\n  msg_min=\"Min size: %cond%\"\n  msg_max=\"Max size: %cond%\"\n  preventInvalidData=~page.noInvalidData\n}}\n  {^{slider size _orientation='vertical' ... /}}\n{{/validate}}\n\nor\n{^{validate size\n  min=50 max=100\n  msg_min=\"Min size: %cond%\"\n  msg_max=\"Max size: %cond%\"\n  preventInvalidData=~page.noInvalidData\n}}\n  <div data-link=\"{slider size _orientation='vertical' ...}\"></div>\n{{/validate}}\n\n\n"
      }
    ]
  },
  "samples/tag-controls/validate/simple": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/validate/simple/sample",
        "text": "The {{validate}} tag can be used as a validating textbox, checkbox, dropdown, radio button group or textarea.\nIn each case optional properties can be specified on the validate tag, not only for convert, convertBack, linkTo etc., but also properties specifying validation tests (validators) to be applied, such as minLength=3.\n\nData-linked textbox\n{^{validate person\n  minLength=3\n  msg_minLength='The name ... %cond% ...'\n  convert=\"upper\"\n  convertBack=~lower\n}}\n\nor\n<input data-link=\"{validate person\n  minLength=3\n  msg_minLength='The name ... %cond% ...'\n  convert='upper'\n  convertBack=~lower\n}\"/>\n\n\nData-linked checkbox\n{{!-- optionally include properties on {{validate ...}} tag,\n      such as convert, convertBack, minLength=..., etc. --}}\n{^{validate agree ...}}\n  <input type=\"checkbox\"/>\n{{/validate}}\n\nor\n{{!-- optionally include properties on {validate ...} tag, such as convert etc. --}}\n<input type=\"checkbox\" data-link=\"{validate agree ...}\"/>\n\n\nData-linked drop down\n{^{validate person ...}} \n  <select size=\"3\">\n    <option value=\"JO\">Jo</option>\n    <option value=\"MARY\">Mary</option>\n  </select>\n{{/validate}}\n\nor\n<select size=\"3\" data-link=\"{validate person ...'}\">\n  <option value=\"JO\">Jo</option>\n  <option value=\"MARY\">Mary</option>\n</select>\n\n\nData-linked radio buttons\n{^{validate name radiogroup=true ...}}\n  <div>\n    <label><input type=\"radio\" value=\"JO\" /> Jo</label>\n    ...\n  </div>\n{{/validate}}\n\nor\n<div data-link=\"{validate name radiogroup=true ...}\">\n  <label><input type=\"radio\" value=\"JO\" /> Jo</label>\n  ...\n</div>\n\n\nData-linked textarea\n{^{validate person ...}}\n  <textarea></textarea>\n{{/validate}}\n\nor\n<textarea data-link=\"{validate person ...}\"></textarea>\n\n\n"
      }
    ]
  },
  "samples/tag-controls/validate/group": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/validate/validation-group/sample",
        "text": "The {{validation}} validation group control is a validation container, which manages all the {{validate}} tags within the container.\nIt provides useful functionality, such as a validate() method which validates the child tags, and triggers display of the validation message on the first invalid control encountered.\nIt is even possible to data-link directly to the isValid property of the {{validation}} tag, to determine whether the whole form (or container) is valid:\n{^{if ~tag.isValid}}\n  <span class=\"val-title\">no errors</span>\n{{else}}\n  <span class=\"val-title-error\">VALIDATION ERRORS</span>\n{{/if}}\n\n\n"
      }
    ]
  },
  "samples/form-els/simple": {
    "sections": [
      {
        "_type": "code",
        "title": "Top-level form element binding",
        "text": "Top-level form element binding\n$(\"#amountPickers\").link(true, data);\n"
      },
      {
        "_type": "sample",
        "url": "samples/form-els/simple/top-level",
        "text": "This version of the sample uses top-level data-linking. An HTML container element in the page is data-linked as follows:\n$(\"#amountPickers\").link(true, data);\n\nand elements within the data-linked container are linked to the data using element-based data-linking syntax:\n<div id=\"amountPickers\">\n  ...\n  <span data-link=\"amount\"></span>\n  ...\n  <input type=\"checkbox\" data-link=\"listbox\" />\n  ...\n  <input data-link=\"amount\" />\n  ...\n  <select data-link=\"amount\">\n    <option>0</option>\n    ...  \n  </select>\n  ...\n  <div data-link=\"{radiogroup amount}\">\n    <label><input type=\"radio\" value=\"0\" /> 0</label>\n    ...\n  </div>\n  ...\n  <textarea data-link=\"amount\"></textarea>\n  ...\n</div>\n\nNote the above examples use compact data-linking syntax:\ndata-link=\"amount\"\n\nwhich is equivalent to the following full syntax:\ndata-link=\"{:amount:}\".\n\nUse the full syntax if you need to specify converters, data-linking targets other than the default, or if you need to data-link to more than one target on the same element. For example the following targets both the default binding for <select> and also the size attribute:\n<select data-link=\"{:amount:} size{:listbox ? 4 : null}\">\n\n\n"
      },
      {
        "_type": "code",
        "title": "Form element binding within a template",
        "text": "Form element binding within a template\n$.templates(\"#tmpl\").link(\"#amountPickers\", data);\n"
      },
      {
        "_type": "sample",
        "url": "samples/form-els/simple/template",
        "text": "This version of the sample uses data-linking within a template. The template is rendered and data-linked within an HTML container element as follows:\n$.templates(\"#tmpl\").link(\"#amountPickers\", data);\n\nand elements within the template are linked to the data using either element-based data-linking syntax or JsViews tag-based data-linking syntax:\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  ...\n  <b data-link=\"amount+1\"></b>\n  ...\n  {^{:amount}}\n  ...\n  <input type=\"checkbox\" data-link=\"listbox\" />\n  ...\n  <input data-link=\"amount\" />\n  ...\n  <select data-link=\"{:amount:} size{:listbox ? 4 : null}\">\n    <option>0</option>\n    ...  \n  </select>\n  ...\n  <div data-link=\"{radiogroup amount}\">\n    <label><input type=\"radio\" value=\"0\" /> 0</label>\n    ...\n  </div>\n  ...\n  <textarea data-link=\"amount\"></textarea>\n  ...\n</script>\n\n<div id=\"amountPickers\"></div>\n\n\n"
      }
    ]
  },
  "samples/form-els/converters": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/form-els/converters/sample",
        "text": "Different convert and convertBack converters are registered, and then used in the form element data-binding as follows:\n\nBinding  \"base 0\" data values to \"base 1\" values in UI:\n$.views.converters({\n  minus1: function(val) { return val-1; },\n  plus1: function(val) { return 1+val; },\n  ...\n});\n\n<input data-link=\"{plus1:amount:minus1}\" />\n<span data-link=\"{plus1:amount}\"></span>\n\n\nBinding inverted boolean data values to UI:\nnot: function(val) { return !val; }\n\n<input type=\"checkbox\" data-link=\"{not:listbox:not}\" />\n\n\nBinding number data values to string values in UI:\nintToStr: function(value) { return \"\" + value; },\nstrToInt: function (value) { return parseInt(value); }\n\n<input data-link=\"{intToStr:amount:strToInt}\"/>...\n<select data-link=\"{intToStr:amount:strToInt} ...\">...\n{^{radiogroup amount convert=\"intToStr\" convertBack=\"strToInt\"}}\n<input type=\"radio\" name=\"amt\" value=\"0\" data-link=\"{intToStr:amount:strToInt}\" />...\n<textarea data-link=\"{intToStr:amount:strToInt}\" ...></textarea>...\n\n\nBinding number data values to UI elements using bit-masks:\nsetBit: function(value) {\n  ...\n  // Use the mask to set or unset that bit on the data, and return the modified value\n  return value ? (dataValue | mask) : (dataValue & ~mask);\n},\ngetBit: function (value) {\n  // \"Convert\": Get the bit from the data, and check or uncheck the checkbox\n  return (value >> this.linkCtx.elem.getAttribute(\"data-bit\") & 1) === 1;\n}\n\n<input type=\"checkbox\" data-bit=\"0\" data-link=\"{getBit:amount:setBit}\" />\n\n\n"
      },
      {
        "_type": "sample",
        "url": "samples/form-els/converters/day-to-int",
        "text": "Using converters for tag rendering\nHTML encoding, no custom converter:\n<td>{{>dayOff}}</td>\n\nRender from data, convert to display name:\n<td>{{intToDay:dayOff}}</td>\n\n\nUsing convert and convertBack with data-linking\nLink from data value, no converter:\n<td data-link=\"dayOff\"></td>\n\nLink from data, converted to display name:\n<td data-link=\"{intToDay:dayOff}\"></td>\n\nTwo-way data linking with convert and convertBack between data format (integer) and display name (text).Also show data value as tooltip:\n<td><input data-link=\"{intToDay:dayOff:dayToInt} title{:dayOff}\" /></td>\n\n\n"
      }
    ]
  },
  "samples/form-els/array-binding": {
    "sections": [
      {
        "_type": "sample",
        "title": "Data-linking &lt;option> collections and &ltinput type=\"radio\"> collections to arrays",
        "url": "samples/form-els/array-binding/sample",
        "text": "Data-linking <option> collections and <input type=\"radio\"> collections to arrays\nThis sample is similar to the previous converters sample – but here the amount can be selected from a range of integers that is chosen by the user (by choosing the number of bits!).\nThe array of possible integers is then generated from code:\nfunction setData() {\n  ...\n  newAmounts = [];\n  ...\n  var maxAmount = Math.pow(2, bitCount);\n  for(var i = 0; i < maxAmount ; i++) {\n    newAmounts.push(i);\n  }\n  ...\n  $.observable(amounts).refresh(newAmounts);\n}\n\nThe collection of <input type=\"radio\"> elements, and the collection of <option> elements under the <select> are dynamically driven by data-linking to the amounts array:\n{^{radiogroup amount convert='intToStr' convertBack='strToInt'}}\n  {^{for amounts}}\n    <label><input type=\"radio\" value=\"{{:#data}}\" /> {{:#data}}</label>\n    ...\n  {{/for}}\n{{/radiogroup}}\n\n<select data-link=\"{intToStr:amount:strToInt} size{:listbox ? amounts.length : null}\">\n  {^{for amounts}}\n    <option data-link=\"value{:#data}\">{{:#data}}</option>\n  {{/for}}\n</select>\n\n\n"
      }
    ]
  },
  "samples/form-els/visible-binding": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample shows data-linked visibility, and also shows data-linked textbox, checkbox, textarea, radio button and select elements.\nEnter values in text boxes etc. and gradually the successive steps will be made visible through data-binding:\n"
      },
      {
        "_type": "sample",
        "url": "samples/form-els/visible-binding/sample",
        "text": "<div data-link=\"visible{:name}\">\n...\n<div data-link=\"visible{:name && selectedMovie!=='none'}\">\n...\n<div data-link=\"visible{:request}\">\n\n<select data-link=\"selectedMovie\">\n  <option value=\"none\">Choose...</option>\n  {{for ~movies}}\n    <option value=\"{{:#index}}\">{{>title}}</option>\n  {{/for}}\n</select>\n\n<textarea data-link=\"request\" ...></textarea>\n\n<input type=\"checkbox\" data-link=\"~app.chooseCurrency\" />\n\n{^{radiogroup selectedCurrency}}\n  {{for ~currencies}}\n    <label><input type=\"radio\" value=\"{{:#index}}\" /> {{:label}}</label>\n  {{/for}}\n{{/radiogroup}}\n\n\n"
      }
    ]
  },
  "samples/form-elems": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/tag-controls/validate/array-binding": {
    "sections": [
      {
        "_type": "sample",
        "title": "The  {{validate}} tag with &lt;option> collections or &ltinput type=\\\"radio\\\"> collections data-linked to arrays",
        "url": "samples/tag-controls/validate/array-binding/sample",
        "text": "The  {{validate}} tag with <option> collections or <input type=\\\"radio\\\"> collections data-linked to arrays\nThis sample is similar to the previous validation group sample – but here the people array can be modified – by adding or removing people, or changing their name property.\n.on(\"click\", \"#add\", function() {\n  $.observable(model.people).insert({name: \"new\"...});\n})\n.on(\"click\", \".remove\", function() {\n  var view = $.view(this);\n  $.observable(model.people).remove(view.index);\n  validation.validate();\n});\n\nThe collection of <option> elements or <input type=\"radio\"> elements is dynamically driven by data-linking to the people array:\n{^{validate person ...}}\n  <select>\n    {^{for people}}\n      <option data-link=\"value{upper:name} {:name:}\"></option>\n    {{/for}}\n  </select>\n{{/validate}}\n\n{^{validate person radiogroup=true ...}}\n  {^{for people}}\n    <label><input type=\"radio\" data-link=\"value{upper:name}\"/> {^{:name}}</label>\n  {{/for}}\n{{/validate}}\n\n\n"
      }
    ]
  },
  "samples/tag-controls/simple-textbox": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample show a simple custom {{textbox}} tag control.\nIt can be considered as a first step towards a more advanced control.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/simple-textbox/sample",
        "text": "This sample illustrates the simplest possible custom tag control supporting two-way data-binding.\nBy using a template which includes an input element:\n<input/>\n\nand then setting the linkedElement property to \"input\":\n$.views.tags({\n  textbox: {\n    linkedElement: \"input\",\n    template: \"<input/>\",\n    ...\n  }\n});\n\nJsViews automatically looks for a matching element (the linkedElement string being treated as a jQuery selector), which it then provides as a property on the resulting tag instance (wrapped in a jQuery object): tag.linkedElem.\nJsViews sets up two-way data-linking on that input element.\nNow you can get two-way binding to your data, simply by setting the path to the data as parameter on your {{textbox}} tag:\n{{textbox my.data.path /}}\n\nAs an optional optimization, we can set the onUpdate handler of our tag control to return false. This has the effect of preventing the control from re-rendering itself each time that data changes. (The updating of the textbox content is already assured by the data-linked input, so re-rendering is unnecessary.)\n$.views.tags({\n  textbox: {\n    linkedElement: \"input\",\n    template: \"<input/>\",\n    onUpdate: function() {\n      return false;\n    },\n    template: \"<input/>\"\n  }\n});\n\n\n"
      }
    ]
  },
  "samples/data-link/from-render-to-link": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the first page of a tutorial sequence on data-linking. We start by showing how to convert a complex JsRender template to work in JsViews, using data-linking throughout.\n"
      },
      {
        "_type": "para",
        "title": "The power of JsRender",
        "text": "The power of JsRender\nJsRender tags are powerful. JsRender does pure string-based rendering. It does not use the DOM to render a template against data, and, as a pure string-based rendering engine it doesn’t even ‘have any awareness’ of the HTML markup in the template. So this means that as long as you are just using JsRender to render (and not doing data-linking, with JsViews), you can put the JsRender tags anywhere you want in relation to the HTML tags, including within the attribute content of an HTML tag, as in the following examples.\n"
      },
      {
        "_type": "para",
        "title": "{{if}} tags within attribute markup",
        "text": "{{if}} tags within attribute markup\nThe first example applies a CSS class for people who play the role of \"Lead\". If their ‘Role description’ includes the word \"Lead\", then the ‘special’ CSS class is applied.\n(Click on Try it, change the role text, and hit Run code, and you will see…):\n"
      },
      {
        "_type": "sample",
        "title": "{{if}} tag in attribute markup",
        "url": "samples/data-link/1_if-tag-in-attribute",
        "text": "{{if}} tag in attribute markup\n<style>\n  ...\n  .special { color: blue; font-style: italic; }\n  ...\n</style>\n\n{{for people}}\n  <div class=\"person\">\n    <span class=\"{{if role.indexOf('Lead')>=0}}special{{/if}}\">\n      {{:first}} ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "But what if we want to use data-binding to add or remove people from the collection of people. And what if we plan to allow the user to change the 'Role description’. In that case we would like to use data-binding to dynamically toggle the class ‘special’ whenever the data changes, based on whether or not it includes the term \"Lead\".\n"
      },
      {
        "_type": "para",
        "title": "The plan: add data-linking. But how?",
        "text": "The plan: add data-linking. But how?\nHow can we convert the above sample to dynamically bind to data. Of course we will do that using JsViews data-linking, but how do we convert the JsRender template (which does not ‘have any knowledge of HTML elements’) so that elements are inserted and removed when the people collection changes, and the span element’s ‘special’ class is actually toggled when the role changes? Clearly JsViews has to have DOM awareness, even if JsRender does not.\n"
      },
      {
        "_type": "para",
        "title": "First let's go further with JsRender",
        "text": "First let's go further with JsRender\nWell before we get to that, let’s first make the problem even harder, by pushing our JsRender template’s HTML ignorance to a blissful extreme. Let’s use a completely non-data-bound approach to user interactivity, by adding mouse events to hide and show the role details information when the user hovers over the person’s name. And let’s use DOM level 0 inline event code, so we are mixing code and markup!\nThen – from there – we’ll show how to move to a data-driven model, with good separation of code and markup, and well-formed templates that allow the full power of JsViews to be leveraged.\nHere is the sample with the added hover behavior:\n"
      },
      {
        "_type": "sample",
        "title": "Template-rendered mouse events",
        "url": "samples/data-link/2_mouse-events-in-template",
        "text": "Template-rendered mouse events\n\n{{for people}}\n  \n    \n      {{:first}} {{:last}}\n    \n    \n\n    \n      {{:role}}\n    \n\n"
      },
      {
        "_type": "para",
        "title": "So how did that work? ",
        "text": "So how did that work? \nWell first we used the JsRender #index to insert unique IDs on the role details span.\nThat may seem surprising, given that JsRender does not ‘track’ HTML entities. So it does not have an index corresponding to counting HTML elements. But it does track instances of rendered templates, or tag blocks. (They are the ‘views’ of JsViews.) – Within a {{for}}...{{/for}} section, or block, JsRender counts the ‘views’ corresponding to the rendered instances of that block. (One for each data item in the people array).\nSo here we use that #index variable to add unique IDs to HTML element markup.\n<span class=\"details\" id=\"role_{{:#index}}\">\n\nAnd of course we use the same IDs in our mouseover code to hide and show the role details span element.\nonmouseover=\"$('#role_{{:#index}}').show();\"\nonmouseout=\"$('#role_{{:#index}}').hide();\">\n\n"
      },
      {
        "_type": "para",
        "title": "Putting all the templated attribute content in an {{include}}",
        "text": "Putting all the templated attribute content in an {{include}}\nSuppose we want to be able to reuse our mouseover behavior and conditional class rendering, as an encapsulated re-usable 'component’. Let’s use template composition to do that. We will put all of the special attribute markup into a separate template, and insert it using:\n<span {{include tmpl=\"#attributesTmpl\" ~id='role_'+#index /}} >\n\nwithin the HTML element markup for the <span>\n"
      },
      {
        "_type": "sample",
        "title": "{{include}} within HTML attribute content",
        "url": "samples/data-link/3_include-tag-in-attribute",
        "text": "{{include}} within HTML attribute content\n...\n<div class=\"person\" {{include tmpl=\"#attributesTmpl\" ~id='role_'+#index /}} >\n...\n\n<script type=\"text/x-jsrender\" id=\"attributesTmpl\">\n  onmouseover=\"$('#{{:~id}}').show();\"\n  onmouseout=\"$('#{{:~id}}').hide();\"\n</script>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice how we made the computed index, #role_{{:#index}} from the previous sample into a computed variable which we pass in to our ‘included’ template.\n~id='role_'+#index\n\nonmouseover=\"$('#{{:~id}}').show();\"\n\n"
      },
      {
        "_type": "para",
        "title": "Next step &ndash; convert to JsViews data-linking",
        "text": "Next step – convert to JsViews data-linking\nSo we have reached a relatively complex JsRender template, and we are ready to convert it to use data-linking – (move ‘from render to link’)…\nThe details of adding data-linking to the above sample – and taking it forward to additional functionality – will be shown in the rest of this tutorial sequence.\n"
      },
      {
        "_type": "para",
        "title": "As a teaser, here is a first step:",
        "text": "As a teaser, here is a first step:\nLet’s add support for inserting new ‘people’ in the people array. The basic idea is simply to change the syntax on the {{for ...}} to make it into a data-linked tag: {^{for ...}}. We change:\n{{for people}}\n\nto\n{^{for people}}\n\nNext, we need to replace our render() method by the corresponding link() call. Let’s change the script call from:\nvar html = $.templates.peopleTmpl.render(data);\n$(\"#people\").html(html);\n\nto\n$.templates.peopleTmpl.link(\"#people\", data);\n\nThen we’ll use JsObservable to allow you to add new people to the people array. Here is the updated sample:\n"
      },
      {
        "_type": "sample",
        "title": "Data-linked {^{for}} tag",
        "url": "samples/data-link/4_linked-for-tag",
        "text": "Data-linked {^{for}} tag\n$(\"#add\").on(\"click\", function() {\n  $.observable(data.people).insert({\n    first:\"Amos\",\n    ...\n  });\n})\n\n{^{for people}}\n  <div \n    class=\"person\"\n    {{include tmpl=\"#attributesTmpl\" ~id='role_'+#index /}}\n  >\n    <span class=\"{{if role.indexOf('Lead')>=0}}special{{/if}}\" >\n      {{:first}} <b>{{:last}}</b>\n    </span>\n    <img src=\".../question.jpg\"/>\n\n    <span class=\"details\" id=\"role_{{:#index}}\">\n      {{:role}}\n    </span>\n  </div>\n{{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Linked and unlinked tags, and element markup",
        "text": "Linked and unlinked tags, and element markup\nBy changing the {{for}} tag to a data-linked {^{for}} tag, we have obtained dynamic data-linking (binding) of our sample to changes in the person array.\nBut we still have an {{include}} tag and an {{if}} tag – nested within the {^{for}} block. If we could change them also to be to data-linked (using {^{include}} and {^{if}}) then we could dynamically bind to changes in the role – and make our conditional toggling of the ‘special’ class and our hover behavior be data-driven.\nHowever, those tags are within the markup of HTML element tags (between the < and >):\n<div class=\"person\" {{include .../}} >\n  <span class=\"{{if ...}}special{{/if}}\" >\n\nJsViews does not support using a data-linked tag ({^{...}}) within HTML element tag markup. (Try it and you will get a syntax error message). Instead, it provides for data-linking HTML elements directly.\nLater pages of this tutorial sequence will show you how to use data-linked elements to add data-driven class and hover behavior to our sample.\nThe next page gives more detail on data-linking {^{for}} and {^{if}}.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "samples/data-link/for-and-if": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the second page of a tutorial sequence on data-linking. Here we are showing how to convert a complex JsRender template to work in JsViews, using data-linking throughout.\n"
      },
      {
        "_type": "para",
        "title": "Data-linked {^{for ...}} tag",
        "text": "Data-linked {^{for ...}} tag\nIn the final sample in that sequence, we saw that simply by adding the ^ character, the {^{for ...}} becomes data-linked. Here is that same sample, but in a stripped down form, in which we have removed the {{include}} tag within the element markup, and the hover behavior for role details. We will add them back in progressively in later sample, as we show how to create fully data-linked implementations of similar or improved functionality…\n"
      },
      {
        "_type": "sample",
        "title": "Data-linked {^{for ...}} tag",
        "url": "samples/data-link/5_linked-for-tag",
        "text": "Data-linked {^{for ...}} tag\n$(\"#add\").on(\"click\", function() {\n  $.observable(data.people).insert({\n    first:\"Amos\",\n    ...\n  });\n})\n\n{^{for people}}\n  <div class=\"person\">\n    {{:first}} <b>{{:last}}</b>\n  </div>\n{{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Data-linked {^{if ...}} tag",
        "text": "Data-linked {^{if ...}} tag\nData-linking an {{if}} tag works in just the same way, simply by adding a ^ character.\nWe’ll illustrate that by allowing the user to switch between first-last and last-first format for the name:\n"
      },
      {
        "_type": "sample",
        "title": "Data-linked {^{if ...}} tag",
        "url": "samples/data-link/6_linked-if-tag",
        "text": "Data-linked {^{if ...}} tag\n\n Reverse name\n{^{for people}}\n  \n    {^{if ~root.reverse}}\n      {{:last}}, {{:first}}\n    {{else}}\n      {{:first}} {{:last}}\n    {{/if}}\n  \n{{/for}}\n\n"
      },
      {
        "_type": "para",
        "title": "Learning points here:",
        "text": "Learning points here:\nFirst, notice that the name reversing feature is entirely declarative. We didn’t write a single line of code. We didn’t even need to modify our data (or define a modified view model) since here we are using plain JavaScript objects, and we are taking the initial value of reverse as falsey – so undefined is fine. If we want to have an initial setting of last-first, we can add it to the data, like this:\nvar data = {\n  reverse: true,\n  people: [\n    {\n      first:\"Jeff\",\n      ...\n\nClick on Try it and test it out…\nNext, notice that we are binding our if to the reverse at the root level of the data. But the context of the {{if}} is the view for a person – corresponding to the content of the {{for}} tag. So the current data item is a person. To bind to the reverse property on the top-level data object rather than on the person object, we use the syntax {^{if ~root.reverse}}.\n"
      },
      {
        "_type": "para",
        "title": "Data-linking class",
        "text": "Data-linking class\nIn the previous page – From rendering to linking – we also used {{if}} to conditionally set a ‘special’ class on a span, as follows:\n<span class=\"{{if role.indexOf('Lead')>=0}}special{{/if}}\">\n\nThe next page shows how we can convert that using data-linked element syntax, so as to dynamically data-link class.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "samples/data-link/hover": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the page seven of a tutorial sequence on data-linking. We show how to link to all the possible targets on an HTML element, such as attributes, styles and class.\nIn the JsRender template on the first page of this tutorial, From rendering to linking, we used DOM level 0 mouse event handlers to show and hide the ‘role details’:\n<span ...\n  onmouseover=\"$('#role_{{:#index}}').show();\"\n  onmouseout=\"$('#role_{{:#index}}').hide();\"\n>\n  ...\n</span>\n\nOn this tutorial page we will convert that feature to use data-linking, and successively show three ways to improve the original approach:\n\nUse a converter to provide the inline code, so as to provide separation of code and markup\nUse attached event handlers, rather than inline code – and use JsViews to find the associated ‘role details’ element without needing to insert IDs into the HTML\nUse data-binding to trigger the hiding/showing from the mouse events\n\n"
      },
      {
        "_type": "para",
        "title": "Using a converter to return inline event code",
        "text": "Using a converter to return inline event code\nWe replace the previous inline code by a converter – which actually returns the same code string as in the original version:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "url": "samples/data-link/11_linked-hover",
        "text": "<div class=\"person\"\n  onmouseover=\"{{over:#index}}\"\n  onmouseout=\"{{out:#index}}\"\n>\n\n$.views.converters({\n    over: function(id) {\n      return \"$('#role_\" + id + \"').show();\"\n    },\n    out: function(id) {\n      return \"$('#role_\" + id + \"').hide();\"\n    }\n  }, peopleTmpl);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Notice that we declared our converters just for this peopleTmpl, by passing in the template as the last parameter. See Registering converters.\n"
      },
      {
        "_type": "para",
        "title": "Attaching event handlers &ndash; and using $.view(this) to find the associated \"role details' element",
        "text": "Attaching event handlers – and using $.view(this) to find the associated \"role details' element\nFor the second approach, we use attached event handlers, rather than inline code.\nWe don’t need to insert IDs into the rendered HTML elements, since we can get the view for this person we moused over, and find the target element in the context of that view…:\n$.view(this)\n\n$.view(this)\n  .contents(true, \".details\")\n  .show()\n\n"
      },
      {
        "_type": "sample",
        "url": "samples/data-link/11b_linked-hover",
        "text": "\npeopleTmpl.link(\"#people\", data)\n  .on(\"mouseover\", \".person\", function() {\n    // Get the view for this person (the one we moused over...)\n    $.view(this) \n      // Find the element with class \"details\" within this view\n      .contents(true, \".details\") \n      // Make it visible\n      .show();\n  })\n  ...\n\n"
      },
      {
        "_type": "para",
        "title": "Use data-binding to trigger the hiding/showing",
        "text": "Use data-binding to trigger the hiding/showing\nFinally, we’ll replace the code in the mouse handlers which was directly showing/hiding the target HTML element. Instead, we will set a boolean property _show on the data to true/false, and we’ll bind visible of the element to that property:\n"
      },
      {
        "_type": "sample",
        "url": "samples/data-link/11c_linked-hover",
        "text": ".on(\"mouseover\", \".person\", function() {\n  // Get the person object (the current data item on the view)\n  var person = $.view(this).data;\n\n  // Set the boolean property that we bind \"visible\" to:\n  $.observable(person).setProperty(\"_show\", true);\n})\n\n<span \n  data-link=\"\n    {:role}\n    visible{:_show}\n  \"\n  class=\"details\"\n></span>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "On the next page we move to showing how to data-link CSS styles or attributes.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "samples/data-link/toggle": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the fourth page of a tutorial sequence on data-linking. We show how to convert a complex JsRender template to work in JsViews, using data-linking throughout, and how to link to all the possible targets on an HTML element, such as attributes, styles and class.\nIn the previous page we used data-linking to data-bind the value of the className property of an element to our data.\n"
      },
      {
        "_type": "para",
        "title": "Data-linking to toggle <b>one class</b> in a className list",
        "text": "Data-linking to toggle one class in a className list\nIn this page of the tutorial we will show how to use data-link to toggle a class.\nFirst let’s add another class to the <span>, and see what happens to it when we data-link:\n"
      },
      {
        "_type": "sample",
        "text": "\n  .person { padding: 3px; margin: 5px; }\n  .special { color: blue; font-style: italic; }\n  .red-border { border: 1px solid red; padding: 3px; }\n\n\n\n\n\n  <button id=\"add\">Add person</button><br /><br />\n  <label><input type=\"checkbox\" data-link=\"reverse\"/> Reverse name</label>\n  {^{for people}}\n    <div class=\"person\">\n      <label><input type=\"checkbox\" data-link=\"isLead\"/> Lead: </label>\n      <span class=\"red-border\"\n        data-link=\"class{:isLead?'special':''}\">\n        {^{if ~root.reverse}}\n          <b>{{:last}}</b>, {{:first}}\n        {{else}}\n          {{:first}} <b>{{:last}}</b>\n        {{/if}}\n      </span>\n    </div>\n  {{/for}}\n\nvar data = {\n  people: [\n    {\n      first:\"Jeff\",\n      last: \"Adams\",\n      isLead: true\n    },\n    {\n      first:\"Eugenia\",\n      last: \"Tyzak\"\n    }\n  ]\n};\n\n$.templates({ \n  peopleTmpl: \"#peopleTemplate\"\n});\n\n$.templates.peopleTmpl.link(\"#people\", data);\n\n$(\"#add\").on(\"click\", function() {\n  $.observable(data.people).insert({\n    first:\"Amos\",\n    last: \"Sanchez\"\n  });\n})\n.red-border { border: 1px solid red; }\n\n<span class=\"red-border\"\n  data-link=\"class{:isLead?'special':''}\">\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "As you see, the red border does not show up, because our data-linking removes the red-border class, and replaces it with \"\" or \"special\".\nA simple fix would be to return all of the classes in the data-binding expression. But that assumes we know those classes:\n<span class=\"red-border\"\n  data-link=\"class{:isLead?'red-border special':'red-border'}\">\n\nAnother fix is to write your own converter, which looks at the element’s className, and computes the return value:\n<span class=\"red-border\"\n  data-link=\"class{mySmartConverter:isLead?'special':''}\">\n\nThat is completely possible. But there is an easier way. There is a built-in converter called merge which you can use, which automatically toggles values in a white-space separated list:\n"
      },
      {
        "_type": "para",
        "title": "Using the <b>merge</b> converter to toggle the class",
        "text": "Using the merge converter to toggle the class\nYou just data-link the target (such as class) to a boolean value, add the {merge: converter, and then set the toggle='...' named parameter to the string (the name of your class) that you want to toggle. When the boolean is true, the toggle term will get added to the current value of the target (such as class), treated as a white-space-separated list. When false, it will get removed…:\n<span class=\"red-border\"\n  data-link=\"someTarget{merge:some.boolean.value toggle='someTermInWhiteSpaceSeparatedList'}\">\n\nLet’s use that to toggle our special class within the className list (which includes red-border):\n"
      },
      {
        "_type": "sample",
        "text": "\n  .person { padding: 3px; margin: 5px; }\n  .special { color: blue; font-style: italic; }\n  .red-border { border: 1px solid red; padding: 3px; }\n\n\n\n\n\n  <button id=\"add\">Add person</button><br /><br />\n  <label><input type=\"checkbox\" data-link=\"reverse\"/> Reverse name</label>\n  {^{for people}}\n    <div class=\"person\">\n      <label><input type=\"checkbox\" data-link=\"isLead\"/> Lead: </label>\n      <span class=\"red-border\"\n        data-link=\"class{merge:isLead toggle='special'}\">\n        {^{if ~root.reverse}}\n          <b>{{:last}}</b>, {{:first}}\n        {{else}}\n          {{:first}} <b>{{:last}}</b>\n        {{/if}}\n      </span>\n    </div>\n  {{/for}}\n\nvar data = {\n  people: [\n    {\n      first:\"Jeff\",\n      last: \"Adams\",\n      isLead: true\n    },\n    {\n      first:\"Eugenia\",\n      last: \"Tyzak\"\n    }\n  ]\n};\n\n$.templates({ \n  peopleTmpl: \"#peopleTemplate\"\n});\n\n$.templates.peopleTmpl.link(\"#people\", data);\n\n$(\"#add\").on(\"click\", function() {\n  $.observable(data.people).insert({\n    first:\"Amos\",\n    last: \"Sanchez\"\n  });\n})\n.red-border { border: 1px solid red; }\n\n<span class=\"red-border\"\n  data-link=\"class{merge:isLead toggle='special'}\">\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now the red-border is correctly preserved.\n"
      },
      {
        "_type": "para",
        "title": "Using the <b>merge</b> converter to toggle the <b>'- (Lead)'</b> term in the role",
        "text": "Using the merge converter to toggle the '- (Lead)' term in the role\nWe can actually use the built-in merge converter also to add and remove the \"- (Lead)\" string from the role, too.\nThe first thing we do is link the role to the innerText:\n<span data-link=\"{:role}\"></span>\n\n(Note since innerText is the default target of data-link expressions on elements other than form elements – such as <input /> – the above is actually equivalent to writing <span data-link=\"text{:role}\"></span>).\nThen we add to the data-link an additional binding expression to toggle the \"- (Lead)\" string:\n<span data-link=\"\n  {:role}\n  {merge:isLead toggle='- (Lead)'}\n\"></span>\n\nHere is our ongoing sample with that added in too:\n"
      },
      {
        "_type": "sample",
        "text": "\n  .person { padding: 3px; margin: 5px; }\n  .special { color: blue; font-style: italic; }\n  .red-border { border: 1px solid red; padding: 3px; }\n  .details { color: green; border: 2px solid grey;\n             padding: 3px; margin-left :40px; }\n\n\n\n\n\n  <button id=\"add\">Add person</button><br /><br />\n  <label><input type=\"checkbox\" data-link=\"reverse\"/> Reverse name</label>\n  {^{for people}}\n    <div class=\"person\">\n      <label><input type=\"checkbox\" data-link=\"isLead\"/> Lead: </label>\n      <span class=\"red-border\"\n        data-link=\"class{merge:isLead toggle='special'}\">\n        {^{if ~root.reverse}}\n          <b>{{:last}}</b>, {{:first}}\n        {{else}}\n          {{:first}} <b>{{:last}}</b>\n        {{/if}}\n      </span>\n      <span data-link=\"\n          {:role}\n          {merge:isLead toggle='- (Lead)'}\n        \"\n        class=\"details\"\n      ></span>\n  </div>\n  {{/for}}\n\nvar data = {\n  people: [\n    {\n      first:\"Jeff\",\n      last: \"Adams\",\n      role: \"Marketing\",\n      isLead: true\n    },\n    {\n      first:\"Eugenia\",\n      last: \"Tyzak\",\n      role: \"Visiting member\"\n    }\n  ]\n};\n\n$.templates({ \n  peopleTmpl: \"#peopleTemplate\"\n});\n\n$.templates.peopleTmpl.link(\"#people\", data);\n\n$(\"#add\").on(\"click\", function() {\n  $.observable(data.people).insert({\n    first:\"Amos\",\n    last: \"Sanchez\",\n    role: \"Support\"\n  });\n})\n\npeople: [\n  {\n    first:\"Jeff\",\n    last: \"Adams\",\n    role: \"Marketing\",\n    isLead: true\n  },\n  {\n    first:\"Eugenia\",\n    last: \"Tyzak\",\n    role: \"Visiting member\"\n  }\n\nLead: <input type=\"checkbox\" data-link=\"isLead\"/>\n<span class=\"red-border\"\n  data-link=\"class{merge:isLead toggle='special'}\">\n  ...\n</span>\n<span data-link=\"\n    {:role}\n    {merge:isLead toggle='- (Lead)'}\n  \"\n  ...\n></span>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Toggle multiple classes at the same time",
        "text": "Toggle multiple classes at the same time\nAnd we can even have multiple simultaneous data-link bindings targeting the same list, but toggling different items in the list. Let’s toggle two more classes on the same span, based in whether the reverse boolean (already used for swapping the name order) is true, or false. Set “Reverse name” to true and we will apply a different class for the border color. Set it to false and we will remove that class and add a different one…:\n"
      },
      {
        "_type": "sample",
        "url": "samples/data-link/8_toggle-class",
        "text": "\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Here we have covered data-linking the class attribute. You can similarly data-link other attributes.\nThe next page – Data-linking HTML attributes – illustrates that with the title and disabled attributes.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "samples/data-link/attributes": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is page five of a tutorial sequence on data-linking. We show how to link to all the possible targets on an HTML element, such as attributes, styles and class.\nIn the previous two pages we explored data-linking the className attribute. Data-linking other HTML attributes is similar.\nWe’ll illustrate that by adding data-linking on the Add person button on our ongoing sample. We’ll data-link the disabled property to disable the button so as to limit to three people in the members list:\n"
      },
      {
        "_type": "para",
        "title": "Data-linking the <b>disabled</b> and <b>title</b> attributes",
        "text": "Data-linking the disabled and title attributes\nFirst a really simple sample, to show the data-linking:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now let’s use that in our ongoing sample. We’ll write:\ndata-link=\"disabled{:people.length > 2}           \n\nAnd we’ll data-link the title to show a message when it is disabled. Here is the updated sample (which we have simplified by removing the reverse name feature for now, for clarity):\nAdd a person, then mouse over the disabled Add person button to see the title message…\n"
      },
      {
        "_type": "sample",
        "url": "samples/data-link/9_linked-attributes",
        "text": "\n\n  Add person\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "On the next page we will make the message more discoverable, by data-linking visibility:\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "samples/data-link/css": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is page eight of a tutorial sequence on data-linking. We show how to link to all the possible targets on an HTML element, such as attributes, styles and class. Here we show how to data-link CSS styles.\n"
      },
      {
        "_type": "para",
        "title": "Data-linking to style is easy: - prepend the name with <b>\"css-\"</b>",
        "text": "Data-linking to style is easy: - prepend the name with \"css-\"\nFor example to data-link to the CSS background-color use css-background-color as data-link target:\ndata-link=\"css-background-color{:dataPathOrExpression}\"\n\n"
      },
      {
        "_type": "para",
        "title": "Here is a sample showing several examples of CSS attribute binding:",
        "text": "Here is a sample showing several examples of CSS attribute binding:\n"
      },
      {
        "_type": "sample",
        "url": "samples/data-link/12_linked-css",
        "text": "Using data-link to bind to CSS attributes on DOM elements:\n<div data-link=\"\n    css-background-color{:color}\n    css-width{:width}\n    css-height{:height}\n    css-border-width{:thickness}\n    css-border-color{:border}\n  \"\n></div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "On the next page we will show data-linking SVG elements.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "samples/data-link/class": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is the third page of a tutorial sequence on data-linking. We show how to convert a complex JsRender template to work in JsViews, using data-linking throughout, and how to link to all the possible targets on an HTML element, such as attributes, styles and class.\n"
      },
      {
        "_type": "para",
        "title": "Data-linking to HTML attributes",
        "text": "Data-linking to HTML attributes\nIn the JsRender template on the first page of this tutorial, From rendering to linking, we had an {{if}} tag inside an HTML attribute:\n<span class=\"{{if role.indexOf('Lead')>=0}}special{{/if}}\">\n\n"
      },
      {
        "_type": "para",
        "title": "Rules for a well-formed JsViews template",
        "text": "Rules for a well-formed JsViews template\nYou might think you can convert that to JsViews data-linking by simply adding a ^, like we did elsewhere in the previous page:\n<span class=\"{^{if role.indexOf('Lead')>=0}}special{{/if}}\">\n\nIf you try that (using the Try it button, for example) you will see that it renders incorrectly. Putting JsRender tags like {{if}} within an HTML element tag, including within an attribute value is an example of invalid JsViews template markup. For details on the rules for what is valid, or invalid, within a JsViews template see the JsViews API topic: JsViews template tags.\n"
      },
      {
        "_type": "para",
        "title": "Data-linking to \"class\"",
        "text": "Data-linking to \"class\"\nThe right way to data-link to class is using data-linked element syntax to link directly to the class attribute as target. (And similarly for linking to the attributes – see Data-linking HTML attributes.)\nHere’s a simple example:\n"
      },
      {
        "_type": "sample",
        "text": "\n  .regular { padding 5px; margin: 5px; display: inline-block; }\n  .special { color: green; display: inline-block; border: 2px solid red; padding 15px; margin: 5px; }\n\n\n\n\n\n  <input type=\"checkbox\" data-link=\"isSpecial\" />\n  <div data-link=\"\n      {:isSpecial?'special':'regular'}\n      class{:isSpecial?'special':'regular'}\n    \"></div>\n\nvar data = {\n  isSpecial: false\n};\n\nvar myTmpl = $.templates(\"#myTemplate\");\n\nmyTmpl.link(\"#result\", data);\nWe’ll provide a boolean property in our data:\nvar data = {\n  isSpecial: false\n};\n\n<input type=\"checkbox\" data-link=\"isSpecial\" />\n\nNow we provide a <div>, and bind the innerText:\n<div data-link=\"{:isSpecial?'special':'regular'}\"></div>\n\nThen we add a second data-link expression to bind to class:\n<div data-link=\"\n  {:isSpecial?'special':'regular'}\n  class{:isSpecial?'special':'regular'}\n\"></div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that we get the conditional behavior of the {{if}} simply by using a ternary expression in the data-link tag:\nisLead?'special':'regular'\n\n"
      },
      {
        "_type": "para",
        "title": "Back to our ongoing sample...",
        "text": "Back to our ongoing sample...\nLet’s use that approach in our ongoing sample to provide the feature where we can add or remove the “Lead” role and have the class update automatically.\nWe’ll bind to a boolean isLead property on the person object.\npeople: [\n  {\n    first:\"Jeff\",\n    last: \"Adams\",\n    role: \"Marketing (Lead)\",\n    isLead: true\n  },\n  ...\n\nAnd instead of using a data-linked {^{if}} tag, we’ll replace that by direct data-linking on the element, like in our sample above:\n<span data-link=\"class{:isLead?'special':''}\">\n\nHere is the sample:\n"
      },
      {
        "_type": "sample",
        "title": "Data-linked class attribute",
        "url": "samples/data-link/7_link-to-class",
        "text": "Data-linked class attribute\n\n Lead:\n\n  ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "In data-linking to class as target, we are actually linking to the HTML className property of the element, which is of course generally a white-space-separated list of class names.\nSo in our current sample we are toggling the value of className between \"\" and \"special\", depending on the value of our isLead data property.\nWhat if there are other classes set on the element? Clearly we would like to have our data-linking toggle just one class (the special class) within that list.\nThe next page takes up shows how to use data-linking to toggle a term in a list, and applies that to the class, to achieve that scenario.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "samples/data-link/visibility": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is page six of a tutorial sequence on data-linking. We show how to link to all the possible targets on an HTML element, such as attributes, styles and class.\nIn the previous sample, we data-linked the disabled and title attributes.\nTo make the message we displayed through data-linking the title more discoverable to the user, let’s  put it in a span on which we will data-link the visibility.\nThe visible data-link target is a special built-in target in JsViews, which works through the CSS display property. It works by data-linking directly to a boolean property:\n"
      },
      {
        "_type": "sample",
        "url": "samples/data-link/10_linked-visibility",
        "text": "Add a person, and you will see this message:\n<span data-link=\"visible{:people.length > 2}\" class=\"status\">\n  The team is complete!\n</span>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Now, here are two more samples using data-linked visibility:\n\nThe Form elements and data-linked visibility sample\nThe Tree with ‘visible’ binding sample\n\nBut let’s also use visible data-linking to hide and show the details blocks when the user hovers over the name – following the feature used in the original JsRender template version. The next page explores three different approaches to doing just that.\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "samples/data-link/svg": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This is page nine of a tutorial sequence on data-linking. We show how to link to all the possible targets on an HTML element, such as attributes, styles and class. Here we show how to data-link different properties of SVG elements.\n"
      },
      {
        "_type": "sample",
        "url": "samples/data-link/13_linked-svg",
        "text": "Using data-link to bind to svg elements:\n<svg class=\"svg\">\n  <ellipse stroke-width=\"2\" rx=\"140\" ry=\"50\"\n    data-link=\"\n      cx{:x}\n      cy{:y}\n      fill{:color}\n      stroke{:textcolor}\n      transform{:'rotate(' + angle + ' ' + x + ' ' + y + ')'}\n    \"\n  ></ellipse>\n  <text data-link=\"\n      x{:x}\n      y{:y}\n      fill{:textcolor}\n      text{:text}\n      transform{:'rotate(' + angle + ' ' + x + ' ' + y + ')'}\n    \"\n  ></text>\n</svg>\n\n\n"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "samples/data-link": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sequence of sample pages is a tutorial showing the multiple possibilities of data-linking. We start with showing how to convert a complex JsRender template to work in JsViews, using data-linking throughout.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "See also the JsViews API topics:",
        "text": "See also the JsViews API topics:\nData-linked tagsData-linked elements"
      },
      {
        "_type": "links",
        "title": "See also:",
        "text": "See also:\n"
      }
    ]
  },
  "samples/tag-controls/range": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample takes the {{range}} tag from the JsRender Extending the {{for}} tag sample, and adds data-linking to it.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/range/sample",
        "text": "We use the {{range}} custom tag to create a drop-down to select an integer between 1 and 10 as the start integer (…and similarly for the end integer):\n<select data-link=\"{:start:strToInt}\">\n  {^{range start=1 end=10}}\n    <option>{{:#data}}</option>\n  {{/range}}\n</select>\n\nThen we again use the {{range}} tag to show a partial list of team members:\n<ul>\n  {^{range members start=start-1 end=end}}\n    <li>\n      {^{:#index + ~root.start}}. {^{:name}}\n    </li>\n  {{else}}\n    <li>No items</li>\n  {{/range}}\n</ul>\n\nNote that by default, named properties like start=start-1 are not data-bound. (This is made ‘opt-in’ for perf optimization reasons.) However in this case, our {{range}} tag implementation has start and end specified as bound properties:\n$.views.tags({\n  range: {\n    boundProps: [\"start\", \"end\"],\n    baseTag: \"for\",\n    ...\n\nSo observable changes to the start and end properties automatically trigger updates.\n(If not declared as boundProps we would have needed to use the syntax: ^start=start-1.)\n\n"
      }
    ]
  },
  "samples/computed": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/computed/fullname": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample consists of three variants of the same sample - with a fullName() computed observable.\n\nUsing plain JavaScript objects as instance data - with the computed fullName() as a computed property\nUsing a View Model approach, with the computed fullName() as a computed property on the prototype\nUsing plain JavaScript objects as instance data – with the computed fullName() as a helper function\n\n"
      },
      {
        "_type": "sample",
        "title": "Computed data properties (declared on plain object instance)",
        "url": "samples/computed/fullname/data",
        "text": "Computed data properties (declared on plain object instance)\nvar person = {\n  ...\n  fullName: fullName\n};\n\n// Parameterized computed observable\nfunction fullName(reversed) { ... }\n\nfullName.depends = \"*\"; // Listen to changes to ANY property of the object (person)\n\n// Two-way binding: provide a setter\nfullName.set = function(val) {\n  val = val.split(\" \");\n  // Make observable change to dependent properties\n  $.observable(this).setProperty({\n    lastName: val.pop(),\n    firstName: val.join(\" \")\n  });\n};\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Computed data properties (declared on prototype) &ndash; View Model approach",
        "url": "samples/computed/fullname/prototype",
        "text": "Computed data properties (declared on prototype) – View Model approach\n// Constructor\nfunction Person(first, last) {\n  this.firstName = first;\n  this.lastName = last;\n}\n\n// Prototype\nPerson.prototype = {\n  fullName: fullName // Computed fullName\n};\n\nvar person = new Person(\"Jeff\", \"Friedman\");\n\n// Parameterized computed observable\nfunction fullName(reversed) { ... }\n\nfullName.depends = \"*\"; // Listen to changes to ANY property of the object (person)\n\n// Two-way binding: provide a setter\nfullName.set = function(val) { ... };\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Computed data properties (using computed helper)",
        "url": "samples/computed/fullname/helper",
        "text": "Computed data properties (using computed helper)\nvar people = [\n  {firstName: \"Jeff\", lastName: \"Friedman\"},\n  ...\n];\n\n// Parameterized computed observable - passed in as a helper\nfunction fullName(reverse) {\n  // 'this' for a helper is the view object - and view.data gives\n  // us the appropriate instance of 'person' in the people array\n  var view = this, person = view.data;\n  return reverse ? ... : ...;\n}\nfullName.depends = \"*\"; // Listen to changes to ANY property of the object (person)\n\n// Setter for fullName - for two-way binding\nfullName.set = function(val) {\n  // 'this' for the setter on a helper is the view object - and view.data\n  // gives us the appropriate instance of 'person' in the people array\n  var view = this, person = view.data;\n  val = val.split(\" \");\n  // Make observable change to dependent properties\n  $.observable(person).setProperty({ ... });\n};\n\nvar tmpl = $.templates(\"#personTmpl\");\n\n// Pass in computed observable fullName as a helper\ntmpl.link(\"#details\", people, {fullName: fullName});\n\n\n"
      }
    ]
  },
  "samples/computed/shopping-cart": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample illustrates:\n\nComputed observables (totalAmount() with dependency \"items.**\" – see additional discussion)\nDeclarative events\n\nIt has two versions:\n\nThe first uses Top-level data-linking\nThe second uses the usual linked templates approach\n\n"
      },
      {
        "_type": "sample",
        "title": "Shopping cart (top-level data-linking)",
        "url": "samples/computed/shopping-cart/top-level",
        "text": "Shopping cart (top-level data-linking)\nThe totalAmount() computed observable has the ** all wild card in its depends path – to indicate dependency on any changes under the items array:\ntotalAmount.depends = \"items.**\";\n\nTop-level data-linking is used for:\n\nlinked template binding using data-link=\"{for items tmpl='#itemTmpl'}\"\ncomputed observable binding: data-link=\"total()\"\ndeclarative event binding: data-link=\"{on add}\", data-link=\"{on ~root.remove}\"\n\nHTML:\n<table>\n  ...\n  <tbody data-link=\"{for items tmpl='#itemTmpl'}\"></tbody>\n  ...\n  <span data-link=\"items.length\"></span>\n  ...\n  <td class=\"add\" data-link=\"{on add}\">Add</td>\n  ...\n  <span colspan=\"2\" data-link=\"total()\"></span>\n  ...\n</table>\n\n<script id=\"itemTmpl\" type=\"text/x-jsrender\">\n  ...\n  <span data-link=\"price*quantity\"></span>\n  <span class=\"remove\" data-link=\"{on ~root.remove}\"></span>\n  ...\n</script>\n\nCode:\nvar shoppingCart = {\n  add: addItem,\n  remove: removeItem,\n  total: totalAmount,\n  items: [...]\n};\n\nfunction addItem() { ... }\nfunction removeItem() { ... }\nfunction totalAmount() { ... }\n\ntotalAmount.depends = \"items.**\"; // totalAmount depends on any changes under the items array \n\n$.link(true, \"#shoppingcart\", shoppingCart); // Top-level data-linking\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The second version is identical in behavior, but it uses a linked template, rather than top-level data linking:\n"
      },
      {
        "_type": "sample",
        "title": "Shopping cart (linked template)",
        "url": "samples/computed/shopping-cart/tmpl",
        "text": "Shopping cart (linked template)\nThe totalAmount() computed observable has the ** all wild card in its depends path – to indicate dependency on any changes under the items array:\ntotalAmount.depends = \"items.**\";\n\nThe sample uses a linked template, which includes:\n\ncomputed observable binding: data-link=\"total()\"\ndeclarative event binding: data-link=\"{on add}\", data-link=\"{on ~root.remove}\"\n\nTemplate:\n<table>\n  ...\n  {^{for items}}\n    ...\n    <span data-link=\"price*quantity\"></span>\n    <span class=\"remove\" data-link=\"{on ~root.remove}\"></span>\n    ...\n  {{/for}}\n  ...\n  <span data-link=\"items.length\"></span>\n  ...\n  <td class=\"add\" data-link=\"{on add}\">Add</td>\n  ...\n  <span colspan=\"2\" data-link=\"total()\"></span>\n  ...\n</table>\n\nCode:\nvar shoppingCart = {\n  add: addItem,\n  remove: removeItem,\n  total: totalAmount,\n  items: [...]\n};\n\nfunction addItem() { ... }\nfunction removeItem() { ... }\nfunction totalAmount() { ... }\n\ntotalAmount.depends = \"items.**\"; // totalAmount depends on any changes under the items array \n\nvar tmpl = $.templates(\"#cartTmpl\");\ntmpl.link(\"#shoppingcart\", shoppingCart);\n\n\n"
      }
    ]
  },
  "samples/tag-controls/jsonview": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample shows the {{jsonview/}} control, which is available from downloads/tag-controls.\nThe {{jsonview}} tag control can be included in any JsViews page, to show the contextual data at that place in the page, or to show given data returned by an expression {^{jsonview someExpression /}}. Changes to the data will then update dynamically.\nThe following sample (shown also in the Data-linked template tag: {^{props …}} topic) illustrates the use of {{jsonview}}:\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jsonview/sample",
        "text": "Template:\n...\n<ul>\n  {^{props members}}\n    <li>\n      ...\n      <input data-link=\"key\"/>\n      {^{>key}}\n      <input data-link=\"prop^name\"/>\n      {^{>prop^name}}\n      ...\n    </li>\n  {{else}}\n    ...\n  {{/props}}\n</ul>\n...\n{^{jsonview/}}\n...\n\n\n"
      }
    ]
  },
  "samples/tag-controls/datepicker/with-converters": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The JsViews ‘datepicker’ tag control can be used with converters to convert to and from a chosen underlying data-format.\nIn the following example, the chosen data format is the WCF JSON DateTime format. (The moment.js library is used to convert to and from the WCF format.)\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqueryui/datepicker/with-converters/sample",
        "text": "<div data-link=\"{datepicker date\n   _dateFormat='dd/mm/y'\n   convert='toDateString'\n   convertBack='toWcfDate'\n}\"></div>\n\n\n"
      }
    ]
  },
  "samples/tag-controls/accordion": {
    "sections": []
  },
  "samples/tag-controls/slider/color-picker": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqueryui/slider/colorpicker/sample",
        "text": "Three sliders each data-linked to a color variable (red, green, blue):\n{^{slider red class=\"red\" ... /}}\n{^{slider green class=\"green\" ... /}}\n{^{slider blue class=\"blue\" ... /}}\n\nand a <div> data-linked to three color arguments – with a converter producing a single resulting background color:\n<div class=\"swatch\" data-link=\"css-background-color{toHex:red green blue}\"></div>\n\n\n"
      }
    ]
  },
  "jqui": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The jQuery UI tag controls library is a set of tag controls based on jQuery UI widgets.\nIt provides the following tag controls:\n\n{{autocomplete/}} – based on jQuery UI autocomplete\n(api)\n{{accordion/}} – based on jQuery UI accordion\n(api)\n{{button/}} – based on jQuery UI button\n(api)\n\nused in the Toolbar sample\n\n{{checkbox/}} – based on jQuery UI checkboxradio\n(api)\n(requires jQuery UI version 1.12.1 or later)\n\nused in the Toolbar sample\n\n{{radio/}} – based on jQuery UI checkboxradio\n(api)\n(requires jQuery UI version 1.12.1 or later)\n\nused in the Toolbar sample\n\n{{controlgroup/}} – based on jQuery UI controlgroup\n(api)\n(requires jQuery UI version 1.12.1 or later)\n\nused in the Toolbar sample\n\n{{buttonset}} – deprecated and available only if using jQuery UI 1.11.4\n{{datepicker/}} – based on jQuery UI datepicker\n(api)\n\nused in the simple datepicker,\ndatepicker variants,\ndatepicker with validation\nand datepicker with validation wizard samples\n\n{{draggable/}} – based on jQuery UI draggable\n(api)\n{{droppable/}} – based on jQuery UI droppable\n(api)\n{{menu/}} – based on jQuery UI menu\n(api)\n{{progressbar/}} – based on jQuery UI progressbar\n(api)\n\nused in the Toolbar sample\n\n{{resizable/}} – based on jQuery UI resizable\n(api)\n{{selectable/}} – based on jQuery UI selectable\n(api)\n{{selectmenu/}} – based on jQuery UI selectmenu\n(api)\n{{slider/}} – based on jQueryUI slider\n(api)\n\nused in the simple slider,\nslider variants,\nslider with validation,\nsliders as color picker and\nToolbar samples\n\n{{sortable/}} – based on jQuery UI sortable\n(api)\n{{spinner/}} – based on jQuery UI spinner\n(api)\n{{tabs/}} – based on jQuery UI tabs\n(api)\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "To use the above tag controls, simply include the library after loading jQuery UI and JsViews:\n...\n<script src=\"//code.jquery.com/jquery-1.12.4.js\"></script>\n<script src=\"//code.jquery.com/ui/1.12.1/jquery-ui.js\"></script>\n...\n<script src=\"//www.jsviews.com/download/jsviews.js\"></script>\n<script src=\"//www.jsviews.com/download/jsviews-jqueryui-widgets.js\"></script>\n...\n\n"
      },
      {
        "_type": "para",
        "title": "Declarative access to widget options",
        "text": "Declarative access to widget options\nAny widget options can be initialized or data-linked by using the option name preceded by _, on the tag declaration.\nFor example\n{^{datepicker startDate\n  _showOn= \"button\"\n  _buttonImage=\"https://jqueryui.com/resources/demos/datepicker/images/calendar.gif\"\n  _buttonImageOnly= true\n  _buttonText= \"Select date\"\n/}}\n\n"
      },
      {
        "_type": "sample",
        "title": "",
        "text": "\n\n\n<b>Start date:</b>\n\n{^{datepicker startDate\n  ^_maxDate=endDate\n  _changeMonth=true\n  _showOn= \"button\"\n  _buttonImage=\"https://jqueryui.com/resources/demos/datepicker/images/calendar.gif\"\n  _buttonImageOnly= true\n  _buttonText= \"Select start date\"\n/}}<br/><br/>\n\n<b>End date:</b>\n\n{^{datepicker endDate\n  ^_minDate=startDate\n  _showOn= \"button\"\n  _buttonImage=\"https://jqueryui.com/resources/demos/datepicker/images/calendar.gif\"\n  _buttonImageOnly= true\n  _buttonText= \"Select end date\"\n/}}<br/>\n\n<h4>Choose a day:</h4>\n\n{^{datepicker date\n  elem=\"div\"\n  ^_minDate=startDate\n  ^_maxDate=endDate\n/}}<br/><br/>\n\n<div data-link=\"date || 'No date chosen!'\" class=\"chosenday\"></div>\n\n\n\n\nvar myTmpl = $.templates(\"#myTmpl\"),\n  pageOptions = {\n    monthsSpan: 2\n  },\n  model = {\n    startDate: \"\",\n    endDate: \"\",\n    date: \"\"\n  };\n\nmyTmpl.link(\"#page\", model, {\n  page: pageOptions\n});\n\nHere we set several options, taken from the jQuery UI datepicker api.\n{^{datepicker startDate\n  ^_maxDate=endDate\n  _changeMonth=true\n  _showOn= \"button\"\n  _buttonImage=\"https://jqueryui.com/.../calendar.gif\"\n  _buttonImageOnly= true\n  _buttonText= \"Select start date\"\n/}}\n\nFor _maxDate we include the ^ character so the it dynamically updates if the endDate changes.\n\n"
      },
      {
        "_type": "links",
        "title": "See:",
        "text": "See:\n"
      }
    ]
  },
  "samples/computed/team-manager": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample shows two-way binding to compiled View Model properties get/set properties, as well as to an additional custom Person.isManager() get/set property. The same sample is shown here in the JsViews Compiled View Models topic.\n"
      },
      {
        "_type": "sample",
        "url": "samples/computed/team-manager/sample",
        "text": "See the same sample in the JsViews Compiled View Models topic, for details and discussion.\n\n"
      }
    ]
  },
  "samples/tag-controls/toolbar": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following sample is a more advanced example of using multiple jQuery UI based JsViews tag controls:\n\n{{controlgroup}} - based on the jQuery UI controlgroup widget\n{{button}} - based on the jQuery UI button widget\n{{radio}} - based on the jQuery UI checkboxradio widget\n{{checkbox}} - based on the jQuery UI checkboxradio widget\n{{progressbar}} - based on the jQuery UI progressbar widget\n{{slider}} - based on the jQuery UI slider widget\n\n"
      },
      {
        "_type": "sample",
        "title": "Toolbar",
        "url": "samples/tag-controls/jqueryui/toolbar/toolbar",
        "text": "Toolbar\n{^{controlgroup class=...}}\n  {^{on toStart}}\n    {^{button _icon=... .../}}\n  {{/on}}\n  ...\n{{/controlgroup}}\n{^{checkbox reverse label=\"Reverse\" .../}}\n{^{controlgroup _classes=...}}\n  {^{radiogroup mode}}\n    {^{radio label=\"Once\" value=\"once\"/}}\n    ...\n  {{/radiogroup}}\n{{/controlgroup}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following modified  version of the Toolbar sample includes dynamically-driven radio button groups:\n"
      },
      {
        "_type": "sample",
        "title": "Toolbar with dynamic {{radio}} array",
        "url": "samples/tag-controls/jqueryui/toolbar/toolbararray",
        "text": "Toolbar with dynamic {{radio}} array\nThe model includes a model.modes and a model.speeds arrays:\nmodel = {\n  mode: \"return\",\n  speed: \"2\",\n  modes: [\n      {action: \"once\", label: \"Once\"},\n      ...\n    ],\n    speeds: [\n      {speedFactor: \"1\", label: \"Speed 1\"},\n      ...\n    ],\n    ...\n\nThe UI includes data-driven {^{for}} tags within the {^{radiogroup}} tags.\n{^{controlgroup _classes=...}}\n  {^{radiogroup mode}}\n    {^{for modes}}\n      {^{radio label=label value=action/}}\n    {{/for}}\n  {{/radiogroup}}\n{{/controlgroup}}\n  ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The second version of the sample, above, also shows alternative approaches to setting options on the jQuery UI widgets:\n\nDeclarative setting of options:\n{^{controlgroup _classes=~myUiOverrides}}\n\nProgrammatic approach, using an overridden event handler:\n{^{controlgroup onBind=~onbind}}\n\npageTmpl.link(\"#page\", model, {\n  ...\n  onbind: function(val) {\n    this.baseApply(arguments);\n    this.linkedElem.controlgroup( \"option\", \"classes\", uiOverrides);\n  },\n  ...\n});\n\nProgrammatic approach, using an id and corresponding jQuery selector:\n{^{checkbox reverse id=\"reverseChkBx\"/}}\n\n$(\"#reverseChkBx\").checkboxradio(\"option\", \"classes\", {\"ui-checkboxradio-label\": ...});\n\n$.observe(model, \"reverse\", function() {\n  $(\"#reverseChkBx\").checkboxradio(\"option\", \"label\", model.reverse ? \"Forward\" : \"Reverse\");\n});\n\n\n"
      }
    ]
  },
  "samples/tag-controls/draggable-droppable": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following sample uses the {{draggable}} and {{droppable}} jQuery UI based JsViews tag controls.\nIt is a declarative data-driven version of the jQuery UI Photo Manager demo.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqueryui/draggable-droppable/photomanager",
        "text": "Template:\n{^{droppable _drop=~dropInGallery _accept=... _activeClass=... elem=\"ul\" ...}}\n  {^{for items}}\n    {^{draggable _cancel=... _revert=... _containment=... _helper=... _cursor=... elem=\"li\" ...}}\n      <h5 class=\"ui-widget-header\">{{:title}}</h5>\n      <img src=\"{{:icon}}\" alt=\"{{:description}}\" .../>\n      ...\n    {{/draggable}}\n  {{/for}}\n{{/droppable}}\n\n{^{droppable _drop=~dropInTrash _accept=... _activeClass=... elem=\"ul\" ...}}\n  ...\n  {^{for trash}}\n    {^{draggable _cancel=... _revert=... _containment=... _helper=... _cursor=... elem=\"li\" ...}}\n      <h5 class=\"ui-widget-header\">{{:title}}</h5>\n      <img src=\"{{:icon}}\" alt=\"{{:description}}\" .../>\n      ...\n    {{/draggable}}\n  {{/for}}\n{{/droppable}}\n\nCode:\nvar data = {\n    items: [{title: \"High Tatras\", ...}, ...],\n    trash: [{title: \"High Tatras 4\", ...} ...]\n  },\n  helpers = {\n    dropInTrash: function(...) {...},\n    dropInGallery: function(...) {...},\n    ...\n  },\n  pageTmpl = $.templates(\"#page\");\n\npageTmpl.link(\"#content\", data, helpers);\n\n\n"
      }
    ]
  }
}