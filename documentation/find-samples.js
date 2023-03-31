var content = $.views.documentation.content;

content.find.samples = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/samples")) ||
{
  "samples": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/jsr": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
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
        "text": "Composition by providing tmpl properties referencing external templates, rather than inline block content, as in:\n{{for languages tmpl=\"#columnTemplate\"/}}\n\nor:\n{{if name.charAt(0)==='E' tmpl='#rowTemplate'}}\n{{else tmpl='#columnTemplate'}}\n{{/if}}\n\nAlso shows wrapping, where an external template is used which then wraps the rendered block content, as in:\n{{include tmpl=\"#sectionWrapperTemplate\"}}\n  {{>title}}\n{{/include}}\n\n<script id=\"sectionWrapperTemplate\" type=\"text/x-jsrender\">\n  <td>Section: <em>{{include tmpl=#content/}}</em></td>\n</script>\n\nor as in:\n{{for languages tmpl='#indexWrapperTemplate'}}\n  <b>{{>name}}</b>\n{{/for}}\n\n<script id=\"indexWrapperTemplate\" type=\"text/x-jsrender\">\n  <div>\n    {{:#index}}:\n    {{include tmpl=#content/}}\n  </div>\n</script>\n\nNote that tmpl=#content above is not a jQuery selector, but rather uses view.content. See Wrapping content.\n\n"
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
        "text": "All of the templates referenced by tmpl=… in the preceding tmpl property sample were declared as script blocks. But they could equally have been compiled from markup strings.\nHere is a simple example:\n"
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
        "text": "Asynchronous loading of templates from the server\nThis sample illustrates one approach to loading remote templates: the template file on the server is a JavaScript file which registers a named template.\n\nTemplate resource on the server: address.js \n\n$.templates(\"address\", \"{{>city}}\");\n\nlazyGetTemplate() helper function\nWe use a helper to “lazily” fetch the template, asynchronously, but only if it has not yet been fetched. Also, we make sure the template only gets compiled from a string once.\n(Note that for optimal performance, it is always best to ensure that the $.template(... markup) method, which compiles a template from a string, is only ever called once for a given string).\nfunction lazyGetTemplate(name) {\n  var deferred = $.Deferred();\n  if ($.templates[name]) {\n    deferred.resolve();\n  } else {\n    $.getScript(...).then(function() {\n      ...  \n      deferred.resolve();\n    });\n  }\n  return deferred.promise();\n}\n\n\nWhen all templates are loaded...\nOnce the requested template (along with any nested templates used in the template composition) is loaded, the render() method can be called (or the link() method if you are using JsViews):\n$.when(\n    lazyGetTemplate(\"people\"),\n    ...  \n  )\n  .done(function() {\n    // Render or link once all templates for template composition are loaded\n    var html = $.templates.people.render(people);\n    ...\n  });\n\n\n"
      }
    ]
  },
  "samples/jsr/composition/sub-tmpl": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample takes the previous tmpl property sample and modifies it to declare nested templates as sub-templates of the calling template.\n"
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
        "text": "This sample takes the previous tmpl property sample and provides  nested templates to the calling template, by passing them in as compiled template objects, associated with a helper object.\n"
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
        "text": "Composition with custom tags\nThis sample shows some basic custom tags implemented as simple render functions, or templates, and in each case shows how the tag can incorporate block content…\n{{mytag}}\n  {{>title}}\n{{/mytag}}\n\n…into its rendering.\nA variant, is to incorporate external content (through a tag property such as tmpl, referencing an external template) into the rendered output…\n{{mytag tmpl=\"#externalcontent\"/}}\n\n\n"
      }
    ]
  },
  "samples/jsr/tags/extend-for": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "In this topic we first show a ‘purchases’ grid view sample, complete with ‘running totals’, using just the {{for}} tag, with its built-in sorting and filtering features.\n"
      },
      {
        "_type": "sample",
        "title": "Using the {{for}} tag to provide a 'purchases' grid view, with running totals...",
        "url": "samples/jsrender/tags/extend-for/sample-for",
        "text": "Using the {{for}} tag to provide a 'purchases' grid view, with running totals...\nProvide category filter helper and running total helper:\n$.views.helpers({\n  category: function(item, index, items) { // Helper for category filter\n    var str = this.props.category;     // Filter for items whose item.category contains the tagCtx.props.category string\n    return str ? item.category.toLowerCase().indexOf(str.toLowerCase()) !== -1 : true;\n  },\n\n  total: function(expr) {              // Helper for running total: ~total(expression)\n    var tmpl = $.templates[expr]       // Get named compiled template for expression, or else...\n                || $.templates(expr, \"{{:\" + expr + \"}}\"), // ...if this is first call, create it\n\n      runningTotal = 0,\n      view = this,                     // The content view of the ~total(...) helper call\n      items = view.get(\"array\").data,\n      rowIndex = view.getIndex();\n\n    for (var i = 0; i <= rowIndex; i++) {\n      runningTotal += +tmpl(items[i]); // Compute running total up to this row, using render function\n    }                                  // of compiled tmpl (either tmpl() or tmpl.render()...)\n    return runningTotal;               // Return value from ~total(...)\n  }\n});\n\nTag usage:\n{{for lineItems sort=\"price\" reverse=true filter=~category category=\"book\"}}\n  ...{{:~total('quantity*price')}}...\n{{else}}\n  ...No items...\n{{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Next we will show an equivalent ‘purchases’ grid view sample using a custom {{purchases}} tag, extending the {{for}} tag, and incorporating the specific filtering and 'running total` helpers.\nSee also the discussion in the Tag inheritance topic, which includes a similar sample with a custom {{purchases}} tag. Our sample below goes further than that sample, in providing complete encapsulation incorporating not only the ~total() helper, but also the category filter helper:\n"
      },
      {
        "_type": "sample",
        "title": "Using the {{purchases}} tag to provide a 'purchases' grid view, with running totals...",
        "url": "samples/jsrender/tags/extend-for/sample-tag2",
        "text": "Using the {{purchases}} tag to provide a 'purchases' grid view, with running totals...\nTag declaration:\n$.views.tags(\"purchases\", {\n  baseTag: \"for\",              // Inherit from the {{for}} tag\n  init: function(tagCtx) {\n    // Override init(), to set the tagCtx.props.filter function\n    tagCtx.props.filter = function(item, index, items) {\n      ...\n    };\n    this.baseApply(arguments); // Call base init()\n  },\n  ctx: {\n    total: function(expr) {    // A ~total(expression) helper\n      ...\n    }\n  }\n});\n\nTag usage:\n{{purchases lineItems sort=\"price\" reverse=true category=\"book\"}}\n  ...{{:~total('quantity*price')}}...\n{{else}}\n  ...No items...\n{{/purchases}}\n  ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the sorting and filtering samples topic – which takes the same {{purchases}} tag and adds data-linking, with JsViews. The result is a dynamic custom tag control, (with Click on header to sort. Click on cells to edit. Use filter box to filter…), precursor of a fully-fledged {{grid}} control.\n"
      }
    ]
  },
  "samples/tag-controls/multiselect": {
    "sections": [
      {
        "_type": "sample",
        "title": "JsViews 'multiselect' tag control: The {{multisel}} tag",
        "url": "samples/tag-controls/multiselect/sample",
        "text": "JsViews 'multiselect' tag control: The {{multisel}} tag\nThis is a fairly advanced sample: A multiselect control which supports both the inline data-binding syntax:\n{^{multisel items=items selected=selectedItems .../}}\n\nand the element-based data-link syntax, using a <select> tag:\n<select data-link=\"{multisel items=items selected=selectedItems ...}\"></select>\n\nIt provides two array  properties, items and selectedItems. Both use observable arrayChange data-binding, so you can (as in the example) use two-way binding between the selectedItems property of one multiselect and the items of another, following a cascading pattern.\n\n"
      },
      {
        "_type": "para",
        "title": "Using the built-in &lt;select multiple... &gt; support instead of {{multisel}}",
        "text": "Using the built-in <select multiple... > support instead of {{multisel}}\nFor most scenarios, the above multiselect control can be replaced by the built-in JsViews support for <select>: with multiple selection.\nFor example we can use the basic <select ... multiple support to replicate most of the above {{multisel}} sample, except for the dynamic add/remove feature of {{multisel}} (which automatically remove items from selectedItems when they are removed from items).\nThis is shown in the following sample:\n"
      },
      {
        "_type": "sample",
        "title": "JsViews support for '&ltselect ... multiple ... &gt;'",
        "text": "JsViews support for '<select ... multiple ... >'\n\n\n\n  <li>{{:name}}</li>\n\n\n\n  <li>(no selection)</li>\n\n\n\n  <select multiple data-link=\"{frm:selectedItems items=items:to} size{:items.length}\">\n    {^{for items}}\n      <option data-link=\"value{:id}\">{{:name}}</option>\n    {{/for}}\n  </select>\n\n  <h4>Selected Items</h4>\n  <select multiple data-link=\"{frm:selectedSelectedItems items=selectedItems:to} size{:selectedItems.length}\">\n    {^{for selectedItems}}\n      <option data-link=\"value{:id}\">{{:name}}</option>\n    {{/for}}\n  </select>\n\n  <ul>{^{for selectedItems tmpl=\"#liTmpl\" }}{{else tmpl=\"#noneTmpl\" }}{{/for}}</ul>\n\n  <h4>Selected selected items</h4>\n\n  <ul data-link=\"{for selectedSelectedItems tmpl='#liTmpl'}{else tmpl='#noneTmpl'}\"></ul>\n\n\n\n$.views.converters({\n  frm: function(val) {\n    return val.map(function(v) {return v.id;});\n  },\n  to: function(vals) {\n    var selectedItems = [],\n      items = this.tagCtx.props.items,\n      k = vals.length,\n      l = items.length;\n    while (k--) {\n      for (var i=0; i<select multiple data-link=\"{frm:selectedItems items=items:to} size{:items.length}\">\n  {^{for items}}\n    <option data-link=\"value{:id}\">{{:name}}</option>\n  {{/for}}\n</select>\n\n\n"
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
        "text": "For more information about helpers, see the $.views.helpers() API topic.\nThis sample shows passing in helpers to the render() method:\nvar html = $(\"#movieTemplate\").render(\n  // Pass in data\n  [movies],\n  // Pass in helpers\n  {\n    reverse: reverse,\n    ...\n  },\n  true // noIteration\n);\n\nIn this case our template renders an array (with order increasing/decreasing index, based on the ~reverse boolean value we pass in as a helper).\nTo make our template render just once, rather than iterating over the movies array, we pass in the additional boolean noIteration parameter, true to the render() method – and then within the template we do the iteration, using {{for}}.\n{{for}} {{!-- iterate over movies array --}}\n  <tr>\n    <td>{{>~format(title)}}</td>\n    <td>\n      {{for languages reverse=~reverse}}\n        <div><b>{{>name}}</b></div>\n      {{/for}}\n    </td>\n  </tr>\n{{/for}}\n\n\n"
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
        "_type": "links",
        "title": "",
        "text": ""
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
        "text": "Using {{: }} or {{> }} to render data values with optional conversion or encoding\nSpecifying converters:\n\n{{:value}} – does not convert. Used to render values that include html markup.\n{{loc:value lang=\"...\"}} – Uses custom converter, below.\n{{html:value}} – Converts using built-in HTML encoder. (Better security within element content, but slight perf cost).\n{{>value}} – Alternative syntax for built-in HTML encoder.\n{{attr:availability}} – Converts using built-in attribute encoder. (Better security within attributes).\n{{url:value}} – Converts using built-in URL encoder.\n{{dec:ticketPrice}} – Uses custom converter, below.\n\n\nDeclaring custom converters\n\n$.views.converters({\n  dec: function(value) {\n    return value.toFixed(2);\n  },\n  loc: function(value) {\n    var language = this.tagCtx.props.lang;\n    ... (return localized value based on language)\n  }\n});\n\n\n"
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
        "_type": "para",
        "title": "",
        "text": "Available from download/sample-tagcontrols.\nFor additional information about the {{tabs}} control see the  Data binding design patterns – two-way binding topic.\n"
      },
      {
        "_type": "sample",
        "title": "Tabs control",
        "url": "samples/tag-controls/tabs/sample",
        "text": "Tabs control\nNested tags:\nThe sample shows two instances of a custom {{tabs}} tag control – an outer one, and a second inner one in one of the tabs of the outer one…\n\nHere is markup for the inner one:\n\n{^{tabs tabCaption=\"Inner One\"}}\n  ONE inner\n{{else tabCaption=\"Inner Two\"}}\n  TWO {{>label2}}\n{{else tabCaption=\"Inner Three\"}}\n  THREE inner\n{{/tabs}}\n\n\n"
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
        "text": "This is the first of seven samples exploring alternative patterns for creating two-way binding and providing UI for editing data.\n"
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
        "title": "Using compiled View Models",
        "url": "samples/editable-data/compiled/sample",
        "text": "Using compiled View Models\nCompile View Models:\n$.views.viewModels({\n  MovieApp: {\n    getters: [...],\n    extend: {...}\n  },\n  Movie: {\n    ...\n  },\n  Language: {\n    ...\n  }\n});\n\nSet up initial data:\napp = {\n  selectedIndex: null,\n  movies: [...]\n};\n\nInstantiate View Models:\nvar appVm = $.views.viewModels.MovieApp.map(app);\n\nTop level data-linking – bind content to View Models:\n$.link(true, \".linkedContent\", appVm);\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The above sample (along with all the previous samples in this series) is not very well 'encapsulated’. The template has calls such as:\n{on ~root.select #index}\n\nwhere ~root is actually the movieApp, being accessed from the context of a movie\nor\n{on ~movie.removeLanguage #index}\n\nwhere ~movie is a contextual parameter referencing a movie, being accessed from the context of a language.\nThe sample below includes ‘parentRef’ settings on the View Model declarations, which lead to much better code encapsulation:\n"
      },
      {
        "_type": "sample",
        "title": "Compiled View Models (with parentRef properties accessing parent movieApp or movie)",
        "url": "samples/editable-data/compiled/parentref",
        "text": "Compiled View Models (with parentRef properties accessing parent movieApp or movie)\nView Models – with parentRef option settings providing access to movieApp / movie\nVMs({\n  MovieApp: {\n    getters: [\n      \"selectedIndex\",\n      { getter: \"movies\", type: \"Movie\", parentRef: \"movieApp\" }\n    ],\n    extend: {\n      addMovie: function() {\n        // Instantiate new movie with a movie.movieApp 'parentRef' property\n        var newMovie = VMs.Movie(\"NewTitle\" + counter, [], \"movieApp\", this);\n      ...\n      $.observable(this.movies()).insert(newMovie); // Insert the new movie\n  ...\n\nTemplate – with improved encapsulation, using the movieApp / movie properties accessing parent objects\n<script id=\"movieTemplate\" ...>\n  <tr ... data-link=\"...{on movieApp.select #index}\">\n  ...\n\n<script id=\"detailTemplate\" ...>\n  ...\n  {^{for languages()}}\n    ...  \n    <span ... data-link=\"{on movie.removeLanguage #index}\"></span>\n  ...\n\n\n"
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
      },
      {
        "_type": "para",
        "title": "",
        "text": "In the next sample the movies collection will be a hash/dictionary, rather than an array – and we will use {{props}} to iterate over the collection.\n"
      }
    ]
  },
  "samples/editable": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "These seven samples explore alternative patterns for creating two-way binding and providing UI for editing data.\nThe UI for all seven is visually equivalent or identical, but the approach to templated rendering and data-linking is different.\n"
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
        "text": "Available from download/sample-tagcontrols.\nThis set of samples shows three variants of a tree tag control:\nThe first uses visible{:...} binding to show and hide tree nodes using display:none. It also allows the user to select/deselect nodes. \nThe second uses {^{if ...}} binding to conditionally render tree nodes.\nThe third adds editability, to allow the user to create or remove nodes, and to modify labels."
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
        "text": "Available from download/sample-tagcontrols.\nThese samples use the custom {{validate}} tag control.\nThis provides validation support to all the two-way bound controls based on form elements, such as textbox, dropdown, checkbox, radio button group or textarea, as well as to custom tags such as the {{datepicker}} and {{slider}} controls.\nIn addition, a {{validation}} control adds group validation. See the date-picker validation wizard sample, as an example of using the group validation features: In that sample, the next button is only enabled when all controls on the current pane validate successfully.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/tag-controls/jqui/datepicker": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{datepicker}} tag integrates the jQuery UI datepicker widget (api).\nThis allows data-linking directly to widget properties, as well as using generic tag functionality such as convert and convertBack.\nIn addition, validation support is obtained, simply by wrapping a {{datepicker}} tag with a {{validate}}.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also:\n\n{{timespinner}}\nwidget APIs\n\n"
      }
    ]
  },
  "samples/tag-controls/jqui/slider": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{slider}} tag integrates the jQuery UI slider widget (api).\nThis allows data-linking directly to widget properties, as well as using generic tag functionality such as convert and convertBack.\nIn addition, validation support is obtained, simply by wrapping a {{slider}} tag with a {{validate}}.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/tag-controls/jqui/datepicker/simple": {
    "sections": [
      {
        "_type": "para",
        "title": "Date picker as pop-up, or displayed inline",
        "text": "Date picker as pop-up, or displayed inline\nBy default the {{datepicker}} is associated with an <input> - and behaves as a pop-up. Alternatively it can be associated with a <div> (either by wrapping a <div> element, or by setting {^{datepicker ... elem=\"div\" ... /}} – in which case it will display inline.\n"
      },
      {
        "_type": "sample",
        "title": "",
        "url": "samples/tag-controls/jqui/datepicker/simple/sample",
        "text": "Simple datepicker\n\n{^{datepicker startDate /}}\n\ndatepicker with data-linked properties\n\n{^{datepicker startDate\n  _changeMonth=true\n  ^_maxDate=endDate\n/}}\n\nIn-line datepicker with data-linked properties\n\n{^{datepicker middleDate\n  ^_minDate=startDate\n  ^_maxDate=endDate\n  ^_numberOfMonths=~page.monthsSpan\n}}\n  \n{{/datepicker}}\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/datepicker/variants": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/datepicker/variants/sample",
        "text": "Multiple examples of {{datepicker}} syntax…\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/datepicker/with-validation": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/datepicker/with-validation/sample",
        "text": "To add validation to a datepicker, simply wrap with a {{validate}} tag.\n{^{validate startDate\n  required=true\n  ^maxday=endDate\n}}\n  {^{datepicker startDate _numberOfMonths=2 /}}\n{{/validate}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/datepicker/with-validation-wizard": {
    "sections": [
      {
        "_type": "sample",
        "title": "",
        "url": "samples/tag-controls/jqui/datepicker/with-validation-wizard/sample",
        "text": "The sample shows a wizard, using {^{if ...}} ... {{else ...}} ... {{else ...}} ... {{else}} ... {{/if}} to manage displaying the separate wizard steps, one after the other…\nMoving to the next step is not possible until the validate controls on the current step are all valid.\nThis is achieved by wrapping in a validation group {{validation}}.\nThe enabled/disabled state of the Next button is data-linked to the validation.isValid property:\n{^{validation}}\n  ...\n  <button id=\"next\" data-link=\"... disabled{:!~tag.isValid}\">Next</button>\n  ...\n  <h4>Choose a start date:</h4> \n  {^{validate startDate\n    required=true\n    ^maxday=endDate\n  }}\n    {^{datepicker startDate _numberOfMonths=1 /}}\n  {{/validate}}\n  ...\n{{/validation}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
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
        "text": "The data is a hierarchy of node objects each of which has a name property and an optional folder property containing child data nodes:\nvar rootFolder = {\n  name: \"Categories\", folders: [\n    {name: \"Drama\", folders: [\n      {name: \"Courtroom\"},\n      {name: \"Political\"}\n    ]},\n    {name: \"Classic\", folders: [\n      ...\n    ]}\n  ]};\n\nThe {{tree}} tag is a tag control for a node in the tree. It renders a node in the data hierarchy, and has a boolean expanded property.\n$.views.tags({\n  tree: {\n    template: \"<li>...\",\n\n    //PROPERTIES\n    expanded: false, // Default to unexpanded\n\n    //METHODS\n    toggle: function() {\n      $.observable(this).setProperty(\"expanded\", !this.expanded);\n    },\n    ...\n  }\n});\n\nIt uses a template which recursively renders the child data nodes using the same {{tree}} tag, and data-links to the expanded property of the control (tag instance).\n<li>\n  {{if folders && folders.length}}\n    {{!-- If there are child items, show item, with a toggle button to expand/collapse children --}}\n    <span data-link=\"{on ~tag.toggle} {:~tag.expanded ? '-' : '+'}\" class=\"toggle\"></span> {{>name}}\n    {{!-- If expanded, show the child items --}}\n    <ul data-link=\"visible{:~tag.expanded}\">\n      {{for folders}}\n        {{!-- Recursive {{tree}} call to display subtree --}}\n        {{tree/}}\n      {{/for}}\n    </ul>\n  {{else}}\n    {{!-- If no child items, show just the item --}}\n    <span class=\"spacer\">&bull;</span> {{>name}}\n  {{/if}}\n</li>\n\nThis version of the {{tree}} tag binds using the data-link visible target  to show or hide the child nodes.\n<li data-link=\"visible{:~tag.expanded}\">\n\n\n"
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
        "text": "The data is the same hierarchy of node objects used in the previous sample:\nvar rootFolder = {\n  name: \"Categories\", folders: [\n    {name: \"Drama\", folders: [\n      {name: \"Courtroom\"},\n      {name: \"Political\"}\n    ]},\n    {name: \"Classic\", folders: [\n      ...\n    ]}\n  ]};\n\nThe {{tree}} tag is a tag control for a node in the tree. It renders a node in the data hierarchy, and sets a boolean expanded property on the data node.\n$.views.tags({\n  tree: {\n    template: \"<li>...\",\n\n    //METHODS\n    toggle: function() {\n      var data = this.tagCtx.view.data;\n      $.observable(data).setProperty(\"expanded\", !data.expanded);\n    }\n  }\n});\n\nIt has a template which with a {^{if expanded }} section which renders the child data nodes only if expanded === true, using the same {{tree}} tag.\n<li>\n  {{if folders && folders.length}}\n    {{!-- If there are child items, show item, with a toggle button to expand/collapse children --}}\n    <span data-link=\"{on ~tag.toggle} {:expanded ? '-' : '+'}\" class=\"toggle\"></span> {{>name}}\n    {^{if expanded}}\n      {{!-- If expanded, show the child items --}}\n      <ul>\n        {{for folders}}\n          {{!-- Recursive {{tree}} call to display subtree --}}\n          {{tree/}}\n        {{/for}}\n      </ul>\n    {{/if}}\n  {{else}}\n    {{!-- If no child items, show just the item --}}\n    <span class=\"spacer\">&bull;</span> {{>name}}\n  {{/if}}\n</li>\n\n\n"
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
        "text": "This version builds on the previous sample, and adds editability:\nCode:\n$.views.tags({\n  editableTree: {\n    ...\n    template: \"#editableTreeTemplate\",\n\n    //METHODS\n    ...\n    remove: function() {\n      var parentFolders = this.parent.tagCtx.view.data.folders,\n        index = this.tagCtx.view.index;\n      $.observable(parentFolders).remove(index);\n    },\n    addFolder: function() {\n      var data = this.tagCtx.view.data;\n      $.observable(data.folders).insert({\n        name: \"new folder\",\n        folders: []\n      });\n      $.observable(data).setProperty(\"expanded\", true);\n    }, ...\n  }\n});\n\neditableTreeTemplate:\n<li>\n  ...\n  {^{if ~tagCtx.props.editable}}\n    {{!-- If editable, show a textbox to edit, and add/remove buttons --}}\n    <input data-link=\"name\" />\n    <span data-link=\"{on ~tag.addFolder}\" class=\"add\">add</span>\n    {^{if ~tag.parent && ~tag.parent.tagName==='editableTree'}}\n      {{!-- Don't allow removing the top-level tree control --}}\n      <span data-link=\"{on ~tag.remove}\" class=\"remove\"></span>\n    {{/if}}\n  {{else}}\n    {{!-- Not editable --}}\n    {^{>name}}\n  {{/if}}\n  ...\n</li>\n\n\n"
      }
    ]
  },
  "samples/tag-controls/jqui/slider/simple": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Here is a sample using data-linking to instantiate and bind a slider control, as well as SVG content, within a template:\n"
      },
      {
        "_type": "sample",
        "title": "Slider control",
        "url": "samples/tag-controls/jqui/slider/simple/sample",
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
        "url": "samples/tag-controls/jqui/slider/simple-toplevel/sample",
        "text": "Top-level data-link=\"{slider ...}\"\nSlider with initialized properties (top-level data-linking)\n<div data-link=\"{slider size _range='min' _min=1 max=200 _orientation='vertical' width=400}\"></div>\n\n\nData-linking to SVG content\n\n\n  \n  ...\n\n\nActivate data-linking \n\n$.link(true, \"body\", model);\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/slider/variants": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/slider/variants/sample",
        "text": "Multiple examples of {{slider}} syntax…\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/slider/with-validation": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/slider/with-validation/sample",
        "text": "To add validation to a slider, simply wrap with a {{validate}} tag.\n{^{validate size\n  min=20\n  max=150\n  msg_min=\"Min size: %cond%\"\n  msg_max=\"Max size: %cond%\"\n  preventInvalidData=~page.noInvalidData\n}}\n  {^{slider size _orientation='vertical' ... /}}\n{{/validate}}\n\nor\n{^{validate size\n  min=50 max=100\n  msg_min=\"Min size: %cond%\"\n  msg_max=\"Max size: %cond%\"\n  preventInvalidData=~page.noInvalidData\n}}\n  <div data-link=\"{slider size _orientation='vertical' ...}\"></div>\n{{/validate}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
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
        "text": "This version of the sample uses data-linking within a template. The template is rendered and data-linked within an HTML container element as follows:\n$.templates(\"#tmpl\").link(\"#amountPickers\", data);\n\nand elements within the template are linked to the data using either element-based data-linking syntax or JsViews tag-based data-linking syntax:\n<script id=\"tmpl\" type=\"text/x-jsrender\">\n  ...\n  <b data-link=\"amount+1\"></b>\n  ...\n  {^{>amount}}\n  ...\n  <input type=\"checkbox\" data-link=\"listbox\" />\n  ...\n  <input data-link=\"amount\" />\n  ...\n  <select data-link=\"{:amount:} size{:listbox ? 4 : null}\">\n    <option>0</option>\n    ...  \n  </select>\n  ...\n  <div data-link=\"{radiogroup amount}\">\n    <label><input type=\"radio\" value=\"0\" /> 0</label>\n    ...\n  </div>\n  ...\n  <textarea data-link=\"amount\"></textarea>\n  ...\n</script>\n\n<div id=\"amountPickers\"></div>\n\n\n"
      }
    ]
  },
  "samples/form-els/converters": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/form-els/converters/sample",
        "text": "Different convert and convertBack converters are registered, and then used in the form element data-binding as follows:\n\nBinding  \"base 0\" data values to \"base 1\" values in UI:\n$.views.converters({\n  minus1: function(val) { return val-1; },\n  plus1: function(val) { return 1+val; },\n  ...\n});\n\n<input data-link=\"{plus1:amount:minus1}\" />\n<span data-link=\"{plus1:amount}\"></span>\n\n\nBinding inverted boolean data values to UI:\nnot: function(val) { return !val; }\n\n<input type=\"checkbox\" data-link=\"{not:listbox:not}\" />\n\n\nBinding number data values to string values in UI:\nintToStr: function(value) { return ... \"\" + value ... },\nstrToInt: function (value) { return ... parseInt(value) ... }\n\n<input data-link=\"{intToStr:amount:strToInt}\"/>...\n<select data-link=\"{intToStr:amount:strToInt} ...\">...\n{^{radiogroup amount convert=\"intToStr\" convertBack=\"strToInt\"}}\n<input type=\"radio\" name=\"amt\" value=\"0\" data-link=\"{intToStr:amount:strToInt}\" />...\n<textarea data-link=\"{intToStr:amount:strToInt}\" ...></textarea>...\n\n\nBinding number data values to UI elements using bit-masks:\nsetBit: function(value) {\n  ...\n  // Use the mask to set or unset that bit on the data, and return the modified value\n  return value ? (dataValue | mask) : (dataValue & ~mask);\n},\ngetBit: function (value) {\n  // \"Convert\": Get the bit from the data, and check or uncheck the checkbox\n  return (value >> this.linkCtx.elem.getAttribute(\"data-bit\") & 1) === 1;\n}\n\n<input type=\"checkbox\" data-bit=\"0\" data-link=\"{getBit:amount:setBit}\" />\n\n\n"
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
        "text": "This sample shows data-linked visibility, and also shows data-linked textbox, checkbox, textarea, radio button and select elements.\nEnter values in textboxes etc. and gradually the successive steps will be made visible through data-binding:\n"
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
        "text": "Available from download/sample-tagcontrols.\nThis sample show a simple custom {{textbox}} tag control.\nIt can be considered as a first step towards a more advanced control.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/simple-textbox/sample",
        "text": "This sample illustrates the simplest possible custom tag control supporting two-way data-binding.\nBy using a template which includes an input element:\n<input/>\n\nand then setting the linkedElement property to \"input\":\n$.views.tags({\n  textbox: {\n    linkedElement: \"input\",\n    template: \"<input/>\",\n    ...\n  }\n});\n\nJsViews automatically looks for a matching element (the linkedElement string being treated as a jQuery selector), which it then provides as a property on the resulting tag instance (wrapped in a jQuery object): tag.linkedElem.\nJsViews sets up two-way data-linking on that input element.\nNow you can get two-way binding to your data, simply by setting the path to the data as parameter on your {{textbox}} tag:\n{{textbox my.data.path /}}\n\nAs an optional optimization, we can set the onUpdate handler of our tag control to false. This has the effect of preventing the control from re-rendering itself each time that data changes. (The updating of the textbox content is already assured by the data-linked input, so re-rendering is unnecessary.)\n$.views.tags({\n  textbox: {\n    linkedElement: \"input\",\n    template: \"<input/>\",\n    onUpdate: false,\n    template: \"<input/>\"\n  }\n});\n\n\n"
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
        "text": "Using the merge converter to toggle the class\nYou just data-link the target (such as class) to a boolean value, add the {merge: converter, and then set the toggle='...' named property to the string (the name of your class) that you want to toggle. When the boolean is true, the toggle term will get added to the current value of the target (such as class), treated as a white-space-separated list. When false, it will get removed…:\n<span class=\"red-border\"\n  data-link=\"someTarget{merge:some.boolean.value toggle='someTermInWhiteSpaceSeparatedList'}\">\n\nLet’s use that to toggle our special class within the className list (which includes red-border):\n"
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
        "text": "\n  .regular { padding 5px; margin: 5px; display: inline-block; }\n  .special { color: green; display: inline-block; border: 2px solid red; padding 15px; margin: 5px; }\n\n\n\n\n\n  <input type=\"checkbox\" data-link=\"isSpecial\" id=\"myChkbx\"/>\n  <label data-link=\"\n      {:isSpecial?'special':'regular'}\n      class{:isSpecial?'special':'regular'}\n    \" for=\"myChkbx\"></label>\n\nvar data = {\n  isSpecial: false\n};\n\nvar myTmpl = $.templates(\"#myTemplate\");\n\nmyTmpl.link(\"#result\", data);\nWe’ll provide a boolean property in our data:\nvar data = {\n  isSpecial: false\n};\n\n<input type=\"checkbox\" data-link=\"isSpecial\" />\n\nNow we provide a <label>, and bind the innerText:\n<label data-link=\"{:isSpecial?'special':'regular'}\" ...></label>\n\nThen we add a second data-link expression to bind to class:\n<label data-link=\"\n  {:isSpecial?'special':'regular'}\n  class{:isSpecial?'special':'regular'}\n\" ...></label>\n\n\n"
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
        "text": "We use the {{range}} custom tag to create a drop-down to select an integer between 1 and 10 as the start integer (…and similarly for the end integer):\n<select data-link=\"{:start:strToInt}\">\n  {^{range start=1 end=10}}\n    <option>{{:#data}}</option>\n  {{/range}}\n</select>\n\nThen we again use the {{range}} tag to show a partial list of team members:\n<ul>\n  {^{range members start=start-1 end=end}}\n    <li>\n      {^{:#index + ~root.start}}. {^{>name}}\n    </li>\n  {{else}}\n    <li>No items</li>\n  {{/range}}\n</ul>\n\nNote that by default, named properties like start=start-1 are not data-bound. (This is made ‘opt-in’ for perf optimization reasons.) However in this case, our {{range}} tag implementation has start and end specified as bound properties:\n$.views.tags({\n  range: {\n    boundProps: [\"start\", \"end\"],\n    baseTag: \"for\",\n    ...\n\nSo observable changes to the start and end properties automatically trigger updates.\n(If not declared as boundProps we would have needed to use the syntax: ^start=start-1.)\n\n"
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
        "text": "This sample illustrates:\n\nComputed observables (totalAmount() with dependency \"items.**\" – see additional discussion)\nDeclarative events\n\nIt has two versions:\n\nThe first uses top-level data-linking\nThe second uses the usual linked templates approach\n\n"
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
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also the Using the {^{for}} tag as a ‘purchases’ grid control sample\n"
      }
    ]
  },
  "samples/tag-controls/jsonview": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample shows the {{jsonview/}} control, which is available from download/sample-tagcontrols.\nThe {{jsonview}} tag control can be included in any JsViews page, to show the contextual data at that place in the page, or to show given data returned by an expression {^{jsonview someExpression /}}. Changes to the data will then update dynamically.\nThe following sample (shown also in the Data-linked template tag: {^{props …}} topic) illustrates the use of {{jsonview}}:\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jsonview/sample",
        "text": "Template:\n...\n<ul>\n  {^{props members}}\n    <li>\n      ...\n      <input data-link=\"key\"/>\n      {^{>key}}\n      <input data-link=\"prop^name\"/>\n      {^{>prop^name}}\n      ...\n    </li>\n  {{else}}\n    ...\n  {{/props}}\n</ul>\n...\n{^{jsonview noFunctions=true/}}\n...\n\n\n"
      }
    ]
  },
  "samples/tag-controls/jqui/accordion": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{accordion}} tag control integrates the jQuery UI accordion widget (api).\nWhen using tag syntax, the tag wraps directly the container element (which wraps the markup for the panels):\n{^{accordion ...}}\n  <div>\n    <h3>Section 1</h3>\n    <div>Panel 1 content</div>\n    ...    ...\n  </div>\n{{/accordion}}\n\nThe tag can also be used wrapping the panel elements directly, and with the elem=... property specifying a container element. (The tag will render the container element):\n{^{accordion ... elem=\"div\"}}\n  <h3>Section 1</h3>\n  <div>Panel 1 content</div>\n  ...    ...\n{{/accordion}}\n\nAlternatively, the accordion tag binding can be used with a data-linked wrapper element:\n<div data-link=\"{accordion ...}\">\n  <h3>Section 1</h3>\n  <div>Panel 1 content</div>\n  ...    ...\n</div>\n\nThe following sample shows two accordions – one using tag syntax, and the other using element syntax, and is a declarative data-driven version of the jQuery UI Accordion – Collapse content demo.\n"
      },
      {
        "_type": "sample",
        "title": "Collapsible accordion",
        "text": "Collapsible accordion\n\n\n<h4>Tag syntax:</h4>\n\n<pre>\n&lcub;^{accordion ...}&rcub;...&lcub;^{/accordion}&rcub;\n</pre>\n\n<!--tag syntax-->\n{^{accordion _collapsible=true elem=\"div\"}}\n  <h3>Section 1</h3>\n  <div>\n    <p><em>Click header again to close panel.</em></p>\n    <p>Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam.</p>\n  </div>\n  <h3>Section 2</h3>\n  <div>\n    <p><em>Click header again to close panel.</em></p>\n    <p>Sed non urna. Donec et ante.</p>\n  </div>\n  <h3>Section 3</h3>\n  <div>\n    <p><em>Click header again to close panel.</em></p>\n    <ul>\n      <li>List item one</li>\n      <li>List item two</li>\n    </ul>\n  </div>\n{{/accordion}}\n\n<h4>Element-based data-link syntax:</h4>\n\n<pre>\n&lt;div data-link=\"{accordion _collapsible=true}\">...&lt;/div>\n</pre>\n\n<!--alternative data-linked element syntax-->\n<div data-link=\"{accordion _collapsible=true}\">\n  <h3>Not latin</h3>\n  <div>\n    <p><em>Click header to close.</em></p>\n    <p>First non-latin text.</p>\n  </div>\n  <h3>Section two</h3>\n  <div>\n    <p><em>Click header to close.</em></p>\n    <p>Second text.</p>\n  </div>\n  <h3>Section three</h3>\n  <div>\n    <p><em>Click header to close.</em></p>\n    <p>Further content.</p>\n  </div>\n</div>\n\n\n\n\nvar pageTmpl = $.templates(\"#pageTmpl\"),\n  model = {};\n\npageTmpl.link(\"#page\", model);\nTag syntax:\n{^{accordion _collapsible=true elem=\"div\"}}\n  <h3>Section 1</h3>\n  <div>...</div>\n  <h3>Section 2</h3>\n  <div>...</div>\n  ...\n{{/accordion}}\n\nData-linked element syntax:\n<div data-link=\"{accordion _collapsible=true}\">\n  <h3>Not latin</h3>\n  <div>...</div>\n  <h3>Section two</h3>\n  <div>...</div>\n  ...\n</div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Initializing the selected panel",
        "text": "Initializing the selected panel\nBy default the first panel is selected initially as open (active) panel.\nTo specify different initial panel selection, pass an integer as argument.\n{^{accordion 2 _collapsible=true}}...\n\nor\n<div data-link=\"{accordion 2 _collapsible=true}\">...\n\nTo initialize with all panels collapsed, pass the argument false.\n"
      },
      {
        "_type": "para",
        "title": "Data-linking the selected panel",
        "text": "Data-linking the selected panel\nThe ‘selected panel’ argument can of course be provided by an expression or data path:\n{^{panel selectedPanel _collapsible=true}}...\n\nIn  this case, the {{accordion}} control provides two-way data-binding on the corresponding data property (selectedPanel).\nThis is illustrated in the following sample, which is the same as the sample above except that both accordions are data-linked to the same selectedPanel property. As a result, the two accordions stay in sync: changing (or collapsing) a panel on one will trigger the corresponding change on the other.\n"
      },
      {
        "_type": "sample",
        "title": "Data-linking the selected panel",
        "url": "samples/tag-controls/jqui/accordion/collapsible",
        "text": "Data-linking the selected panel\nTag syntax:\n{^{accordion selectedPanel _collapsible=true}}\n  ...\n\nData-linked element syntax:\n<div data-link=\"{accordion selectedPanel _collapsible=true}\">\n  ...\n\nCode:\nvar model = {selectedPanel: 1};\n\npageTmpl.link(\"#page\", model);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sortable accordion",
        "text": "Sortable accordion\nThe {{accordion}} has some similarities to the {{tabs}} control (and widget) – and in both    cases a ‘sortable’ variant is possible. However from a user point of view the idea of dragging accordion panel probably makes less sense.\nSortable accordion panels are obtained by wrapping the panel markup in a {{sortable}} tag, within the {{accordion}} tag. However it is better for the header and panel markup to be contained in a single <div> element, so that the whole div can be dragged during sorting:\nThe following sample is a declarative data-driven version of the jQuery UI Accordion – Sortable demo, using tag syntax.\n"
      },
      {
        "_type": "sample",
        "title": "Sortable accordion",
        "url": "samples/tag-controls/jqui/accordion/sortable",
        "text": "Sortable accordion\nTag syntax:\n{^{accordion selectedPanel _header='>div>h3'}}\n  {^{sortable _axis=\"y\" _handle='h3' elem='div' _stop=~stop}}\n    <div>\n      <h3>Section 1</h3>\n      <div>Panel 1 content</div>\n    </div>\n    ...\n  {{/sortable}}\n{{/accordion}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using {{accordion}} with a data-linked array",
        "text": "Using {{accordion}} with a data-linked array\nA data-driven approach can be used, with the header text and panel contents rendered from a data array:\n{^{accordion ... elem='div'}}\n  {^{for panelData}}\n    <h3>{^{:header}}</h3>\n    <div>{^{:content}}</div>\n  {{/for}}\n{{/accordion}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sortable accordion with  a data-linked array",
        "text": "Sortable accordion with  a data-linked array\nIf an {{accordion}} tag control with content coming from a data-driven array is also sortable, then sorting the tabs will sort the underlying data array – and raise corresponding observable events.\nThis is the same behavior as is obtained with the {{sortable}} tag used alone, without {{accordion}}. To opt out of the observable binding on the array, set {^{sortable _bindArray=false ...}}.\nThe following sample shows data-linking to the underlying array, with a sortable {{accordion}} tag control:\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/accordion/sortablearray",
        "text": "{^{accordion selectedPanel _header='>div>h3' _collapsible=true}}\n  {^{sortable _axis=\"y\" _handle='h3' elem='div'}}\n    {^{for panelData}}\n      <div>\n        <h3>{^{>header}}</h3>\n        <div>{^{>content}}</div>\n      </div>\n    {{/for}}\n  {{/sortable}}\n{{/accordion}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sortable accordion with  a data-linked array &ndash; top-level data-linking",
        "text": "Sortable accordion with  a data-linked array – top-level data-linking\nFinally, here is the same sample as above, but achieved entirely through top-level data linking:\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/accordion/sortablearray-toplevel",
        "text": "<script id=\"panelMarkup\" type=\"text/x-jsrender\">\n  <div>\n    <h3>{^{>header}}</h3>\n    <div>{^{>content}}</div>\n  </div>\n</script>\n\nTop-level data-linked element:\n<div class=\"linkedUI\" data-link=\"\n  {for panelData tmpl='#panelMarkup'}\n  {sortable _axis='y' _handle='h3'}\n  {accordion selectedPanel _header='>div>h3' _collapsible=true}\n\"></div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/slider/color-picker": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/slider/colorpicker/sample",
        "text": "Three sliders each data-linked to a color variable (red, green, blue):\n{^{slider red class=\"red\" ... /}}\n{^{slider green class=\"green\" ... /}}\n{^{slider blue class=\"blue\" ... /}}\n\nand a <div> data-linked to three color arguments – with a converter producing a single resulting background color:\n<div class=\"swatch\" data-link=\"css-background-color{toHex:red green blue}\"></div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also:\n\nwidget APIs\nA JsViews “colorpicker” tag control\n\n"
      }
    ]
  },
  "samples/tag-controls/jqui": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The jQuery UI tag controls library is a set of tag controls based on jQuery UI widgets.\nIt provides the following tag controls:\n\n{{autocomplete/}} – based on jQuery UI autocomplete\n(api)\n\nused in the autocomplete sample\n\n{{accordion/}} – based on jQuery UI accordion\n(api)\n\nused in the accordion samples\n\n{{button/}} – based on jQuery UI button\n(api)\n\nused in the Toolbar\nand progressbar samples\n\n{{checkbox/}} – based on jQuery UI checkboxradio\n(api)\n(requires jQuery UI version 1.12.1 or later)\n\nused in the Toolbar\nand Accessing widget APIs samples\n\n{{radio/}} – based on jQuery UI checkboxradio\n(api)\n(requires jQuery UI version 1.12.1 or later)\n\nused in the Toolbar sample\n\n{{controlgroup/}} – based on jQuery UI controlgroup\n(api)\n(requires jQuery UI version 1.12.1 or later)\n\nused in the Toolbar sample\n\n{{buttonset}} – deprecated and available only if using jQuery UI 1.11.4\n{{datepicker/}} – based on jQuery UI datepicker\n(api)\n\nused in the simple datepicker,\ndatepicker variants,\ndatepicker with validation\nand datepicker with validation wizard samples\n\n{{draggable/}} – based on jQuery UI draggable\n(api)\n\nused in the draggable - droppable samples\n\n{{droppable/}} – based on jQuery UI droppable\n(api)\n\nused in the draggable - droppable samples\n\n{{menu/}} – based on jQuery UI menu\n(api)\n\nused in the menu samples\n\n{{progressbar/}} – based on jQuery UI progressbar\n(api)\n\nused in the Toolbar\nand progressbar samples\n\n{{resizable/}} – based on jQuery UI resizable\n(api)\n\nused in the resizable samples\n\n{{selectable/}} – based on jQuery UI selectable\n(api)\n\nused in the selectable samples\n\n{{selectmenu/}} – based on jQuery UI selectmenu\n(api)\n\nused in the selectmenu samples\n\n{{slider/}} – based on jQueryUI slider\n(api)\n\nused in the simple slider,\nslider variants,\nslider with validation,\nsliders as color picker,\nToolbar,\nresizable,\ndraggable - droppable,\nspinner and\nprogressbar samples\n\n{{sortable/}} – based on jQuery UI sortable\n(api)\n\nused in the sortable samples\n\n{{spinner/}} – based on jQuery UI spinner\n(api)\n\nused in the spinner\nand resizable samples\n\n{{timespinner/}} – also based on jQuery UI spinner\n(api)\n\nused in the timespinner samples\n\n{{tabs/}} – based on jQuery UI tabs\n(api)\n\nused in the tabs samples\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "To use the above tag controls simply include the library after loading  jQuery UI (recommended version 1.12.1 or later) and JsViews:\n...\n<script src=\"https://code.jquery.com/jquery-3.6.4.js\"></script>\n<script src=\"https://code.jquery.com/ui/1.12.1/jquery-ui.js\"></script>\n...\n<script src=\"https://www.jsviews.com/download/jsviews.js\"></script>\n<script src=\"https://www.jsviews.com/download/sample-tag-controls/jsviews-jqueryui-widgets.js\"></script>\n...\n\nIn addition, include an appropriate jQuery UI css class library, such as the default theme:\n<link href=\"https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css\" rel=\"stylesheet\">\n\n"
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
  "samples/tag-controls/jqui/toolbar": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following sample is a more advanced example of using multiple jQuery UI based JsViews tag controls:\n\n{{controlgroup}} – based on the jQuery UI controlgroup widget (api)\n{{button}} – based on the jQuery UI button widget (api)\n{{radio}} – based on the jQuery UI checkboxradio widget (api)\n{{checkbox}} – based on the jQuery UI checkboxradio widget (api)\n{{progressbar}} – based on the jQuery UI progressbar widget (api)\n{{slider}} – based on the jQuery UI slider widget (api)\n\n"
      },
      {
        "_type": "sample",
        "title": "Toolbar",
        "url": "samples/tag-controls/jqui/toolbar/toolbar",
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
        "url": "samples/tag-controls/jqui/toolbar/toolbararray",
        "text": "Toolbar with dynamic {{radio}} array\nThe model includes a model.modes and a model.speeds array:\nmodel = {\n  mode: \"return\",\n  speed: \"2\",\n  modes: [\n      {action: \"once\", label: \"Once\"},\n      ...\n    ],\n    speeds: [\n      {speedFactor: \"1\", label: \"Speed 1\"},\n      ...\n    ],\n    ...\n\nThe UI includes data-driven {^{for}} tags within the {^{radiogroup}} tags.\n{^{controlgroup _classes=...}}\n  {^{radiogroup mode}}\n    {^{for modes}}\n      {^{radio label=label value=action/}}\n    {{/for}}\n  {{/radiogroup}}\n{{/controlgroup}}\n  ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The second version of the sample, above, also shows alternative approaches to setting options on the jQuery UI widgets:\n\nDeclarative setting of options:\n{^{controlgroup _classes=~myUiOverrides}}\n\nProgrammatic approach, using an overridden ‘onBind’ event handler:\n{^{controlgroup onBind=~onbind}}\n\npageTmpl.link(\"#page\", model, {\n  ...\n  onbind: function(val) {\n    this.baseApply(arguments);\n    this.mainElem.controlgroup( \"option\", \"classes\", uiOverrides);\n  },\n  ...\n});\n\nProgrammatic approach, using an id and corresponding jQuery selector:\n{^{checkbox reverse id=\"reverseChkBx\"/}}\n\n$(\"#reverseChkBx\").checkboxradio(\"option\", \"classes\", {\"ui-checkboxradio-label\": ...});\n\n$.observe(model, \"reverse\", function() {\n  $(\"#reverseChkBx\").checkboxradio(\"option\", \"label\", model.reverse ? \"Forward\" : \"Reverse\");\n});\n\n\nSee also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/draggable-droppable": {
    "sections": [
      {
        "_type": "para",
        "title": "The {{droppable}} tag control ",
        "text": "The {{droppable}} tag control \nTag syntax:\n{^{droppable ~dropInGallery ...}}\n  ...\n{{/droppable}}\n\nData-linked element syntax:\n<div data-link=\"{droppable ~dropInGallery ...}\" ...>\n  ...\n</div>\n\nHandler for drop event:\n{{droppable}} accepts a function argument (dropInGallery, in the examples above) which is used as event handler for the jQuery UI Droppable widget drop event.\n"
      },
      {
        "_type": "para",
        "title": "The {{draggable}} tag control",
        "text": "The {{draggable}} tag control\nTag syntax:\n{^{draggable ...}}\n  ...\n{{/draggable}}\n\nData-linked element syntax:\n<div data-link=\"{draggable ...}\" ...>\n  ...\n</div>\n\n"
      },
      {
        "_type": "para",
        "title": "Sample: Photo Manager",
        "text": "Sample: Photo Manager\nThe following sample uses the {{draggable}} and {{droppable}} tag controls – based on the jQuery UI draggable widget (api) and droppable widget (api).\nIt is a declarative data-driven version of the jQuery UI Photo Manager demo.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/draggable-droppable/photomanager",
        "text": "Template:\n{^{droppable ~dropInGallery _accept=... _activeClass=... elem=\"ul\" ...}}\n  {^{for items}}\n    {^{draggable _cancel=... _revert=... _containment=... _helper=... _cursor=... elem=\"li\" ...}}\n      <h5 class=\"ui-widget-header\">{{:title}}</h5>\n      <img src=\"{{:icon}}\" alt=\"{{:description}}\" .../>\n      ...\n    {{/draggable}}\n  {{/for}}\n{{/droppable}}\n\n{^{droppable ~dropInTrash _accept=... _activeClass=... elem=\"ul\" ...}}\n  ...\n  {^{for trash}}\n    {^{draggable _cancel=... _revert=... _containment=... _helper=... _cursor=... elem=\"li\" ...}}\n      <h5 class=\"ui-widget-header\">{{:title}}</h5>\n      <img src=\"{{:icon}}\" alt=\"{{:description}}\" .../>\n      ...\n    {{/draggable}}\n  {{/for}}\n{{/droppable}}\n\nCode:\nvar data = {\n    items: [{title: \"High Tatras\", ...}, ...],\n    trash: [{title: \"High Tatras 4\", ...} ...]\n  },\n  helpers = {\n    dropInTrash: function(...) {...},\n    dropInGallery: function(...) {...},\n    ...\n  },\n  pageTmpl = $.templates(\"#pageTmpl\");\n\npageTmpl.link(\"#page\", data, helpers);\n\n\n"
      },
      {
        "_type": "para",
        "title": "The {{draggable}} tag control: Two-way data-binding to width and height",
        "text": "The {{draggable}} tag control: Two-way data-binding to width and height\nIn addition to all the features of the jQuery UI draggable widget, the JsViews {{draggable}} tag control provides two-way data-binding on the left and top properties.\nThis permits many powerful scenarios, illustrated by the following examples.\n"
      },
      {
        "_type": "sample",
        "text": "\n  .orange {padding: 6px; width: 34px; height: 34px; text-align: center;\n    line-height: 34px; cursor: move; border: 1px solid #d55900;\n    background-color: #ffe5d2; z-index: 100;}\n  .smalltext {font-size: 12px; line-height: 17px;}\n  body {overflow: auto;}\n  .slider .ui-slider {margin: 2px 16px 0 5px; float: left;}\n  .slider {margin-bottom: 20px;}\n\n\n\n<h4>Drag the square:</h4>\n\n<div class=\"slider\">\n  {^{slider cx _min=20 _max=400 _range=\"min\" width=400/}}\n  <em>cx:</em> {^{rnd:cx}}\n</div>\n<div class=\"slider\">\n  {^{slider cy _min=110 _max=210 _range=\"min\" width=400/}}\n  <em>cy:</em> {^{rnd:cy}}\n</div>\n\n{^{draggable left=cx top=cy\n  _containment=\"document\" class=\"orange smalltext\" \n}}\n  Drag me{{/draggable}}\n\n\n\nvar i,\n  pageTmpl = $.templates(\"#pageTmpl\"),\n  data = {cx: 210, cy: 160};\n\n$.views.converters({\n  rnd: function(val) {\n    // To string, rounded to nearest integer\n    return \"\" + Math.round(val);\n  }\n});\n\npageTmpl.link(\"#page\", data);\n{^{slider cx ... //}}\n...\n{^{slider cy... //}}\n...\n{^{draggable left=cx top=cy ...}}Drag me{{/draggable}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Tag contextual parameters: ~left, ~top",
        "text": "Tag contextual parameters: ~left, ~top\nThe {{draggable}} tag control provides two tag contextual parameters – ~left and ~top – which give access to the values of left and top from anywhere within the {{draggable}} tag’s content.\nThe next sample adds display of ~left and ~top to the previous sample:\n"
      },
      {
        "_type": "sample",
        "text": "\n  .orange {cursor: move; border: 1px solid #d55900;\n    background-color: #ffe5d2; padding: 6px; width: 34px; height: 34px;\n    text-align: center; line-height: 34px; z-index: 100;}\n  .smalltext {font-size: 12px; line-height: 17px;}\n  body {overflow: auto;}\n  .slider .ui-slider {margin: 2px 16px 0 5px; float: left;}\n  .slider {margin-bottom: 20px;}\n\n\n\n<h4>Drag the squares:</h4>\n\n<div class=\"slider\">\n  {^{slider cx _min=20 _max=300 _range=\"min\" width=400/}}\n  <em>cx:</em> {^{rnd:cx}}\n</div>\n<div class=\"slider\">\n  {^{slider cy _min=110 _max=220 _range=\"min\" width=400/}}\n  <em>cy:</em> {^{rnd:cy}}\n</div>\n\n{^{draggable left=cx top=cy\n  _containment=\"document\" class=\"orange smalltext\" \n}}\n  {^{rnd:~left}}<br/>{^{rnd:~top}}\n{{/draggable}}\n\n\nvar i,\n  pageTmpl = $.templates(\"#pageTmpl\"),\n  data = {cx: 150, cy: 165};\n\n$.views.converters({\n  rnd: function(val) {\n    // To string, rounded to nearest integer\n    return \"\" + Math.round(val);\n  }\n});\n\npageTmpl.link(\"#page\", data);\n{^{draggable left=cx top=cy}}\n  {^{:~left}} {^{:~top}}\n{{/draggable}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Two-way binding to tag contextual parameters",
        "text": "Two-way binding to tag contextual parameters\nYou can even use two-way data-binding to the tag contextual parameters as in:\n{^{draggable}}\n  <input data-link=\"~left\" />\n  {^{slider ~top ...}}\n{{/draggable}}\n\nIf the {^{draggable}} tag uses converters, then the tag contextual parameters will correspond to the values after conversion (i.e. the actual left and top position values of the {^{draggable}} control).\nThe following sample adds a second {{draggable}} – shifted to the right, and binding to the same data properties: cx and cy. It contains two <input> textboxes with two-way data-binding to the ~left and ~top tag contextual parameters:\n"
      },
      {
        "_type": "sample",
        "text": "\n  .orange, .inputs {cursor: move; border: 1px solid #d55900;\n    background-color: #ffe5d2; z-index: 100;}\n  .orange {padding: 5px; width: 34px; height: 34px;\n    text-align: center; line-height: 34px;}\n  .smalltext {font-size: 12px; line-height: 17px;}\n  .inputs {display:inline-block; padding: 10px;}\n  .inputs input {width: 40px; margin: 0; font-size: 12px;}\n  body {overflow: auto;}\n  .slider .ui-slider {margin: 2px 16px 0 5px; float: left;}\n  .slider {margin-bottom: 20px;}\n\n\n\n<h4>Drag the squares:</h4>\n\n<div class=\"slider\">\n  {^{slider cx _min=20 _max=300 _range=\"min\" width=400/}}\n  <em>cx:</em> {^{rnd:cx}}\n</div>\n<div class=\"slider\">\n  {^{slider cy _min=110 _max=220 _range=\"min\" width=400/}}\n  <em>cy:</em> {^{rnd:cy}}\n</div>\n\n{^{draggable left=cx top=cy\n  _containment=\"document\" class=\"orange smalltext\" \n}}\n  {^{rnd:~left}}<br/>{^{rnd:~top}}\n{{/draggable}}\n\n{^{draggable left=cx top=cy rightshift=100\n  convert=\"shift\" convertBack=\"unshift\"\n  _containment=\"document\" class=\"inputs\" \n}}\n  <input data-link=\"~left\" /><br/>\n  <input data-link=\"~top\" />\n{{/draggable}}\n\n\nvar i,\n  pageTmpl = $.templates(\"#pageTmpl\"),\n  data = {cx: 150, cy: 165};\n\n$.views.converters({\n  rnd: function(val) {\n    // To string, rounded to nearest integer\n    return \"\" + Math.round(val);\n  },\n  shift: function(left, top) {\n    // Shift to the right, by amount rightshift\n    return [\n      (Math.round(left) + this.tagCtx.props.rightshift) || undefined,\n      (Math.round(top) - 6) || undefined\n    ];\n  },\n  unshift: function(left, top) {\n    // Shift to the left, by amount rightshift\n    return [\n      (Math.round(left) - this.tagCtx.props.rightshift) || undefined,\n      (Math.round(top) + 6) || undefined\n    ];\n  }\n});\n\npageTmpl.link(\"#page\", data);\n{^{draggable left=cx top=cy rightshift=100\n  convert=\"shift\" convertBack=\"unshift\" ...\n}}\n  <input data-link=\"~left\" />\n  <input data-link=\"~top\" />\n{{/draggable}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Initialization of tag contextual parameters",
        "text": "Initialization of tag contextual parameters\nIf the values of left or top are initialized to a static value, rather than to a data-linked expression, then there will be no external two-way binding, but within the {{draggable}} control the tag contextual parameters will still be data-bound to each other and to the current position of the tag instance as it is dragged:\n{^{draggable left=210 top=70}}\n  {^{:~left}} {^{:~top}}\n{{/draggable}}\n\nIf left and top are not initialized, then the tag contextual parameters will initialize themselves to the current positon of the tag instance:\n{^{draggable}}\n  {^{:~left}} {^{:~top}}\n{{/draggable}}\n\nThe following sample illustrates both situations:\n"
      },
      {
        "_type": "sample",
        "text": "\n  .orange {padding: 0; width: 34px; height: 34px; text-align: center;\n    line-height: 34px; cursor: move; border: 1px solid #d55900;\n    background-color: rgba(255, 229, 210, 0.50); margin: 8px; z-index: 100;}\n  .smalltext {font-size: 12px; line-height: 17px;}\n  body {overflow: auto;}\n  .ui-slider {margin: 0 5px 10px 5px;}\n\n\n\n<h4>Drag the squares:</h4>\n\n{^{draggable\n  _containment=\"document\" class=\"orange smalltext\"\n}}\n  {^{rnd:~left}}<br/>{^{rnd:~top}}\n{{/draggable}}\n\n{^{draggable\n  _containment=\"document\" class=\"orange smalltext\"\n}}\n  {^{rnd:~left}}<br/>{^{rnd:~top}}\n{{/draggable}}\n\n{^{draggable left=210 top=70\n  _containment=\"document\" class=\"orange smalltext\"\n}}\n  {^{rnd:~left}}<br/>{^{rnd:~top}}\n{{/draggable}}\n\n\n\nvar i,\n  pageTmpl = $.templates(\"#pageTmpl\"),\n  data = {};\n\n$.views.converters({\n  rnd: function(val) {\n    // To string, rounded to nearest integer\n    return \"\" + Math.round(val);\n  }\n});\n\npageTmpl.link(\"#page\", data);\n\n{^{draggable}}\n  {^{:~left}} {^{:~top}}\n{{/draggable}}\n\n{^{draggable}}\n  {^{:~left}} {^{:~top}}\n{{/draggable}}\n\n{^{draggable left=210 top=70\n  {^{:~left}} {^{:~top}}\n{{/draggable}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Converters as parameter transforms",
        "text": "Converters as parameter transforms\nOur next example uses converters in effect to transform between cartesian parameters left and top, and polar parameters expand (which expands ‘radially’) and rotate:\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/draggable-droppable/draggable",
        "text": "{^{draggable left=cx top=cy ...}}\n  {^{:~left}} {^{:~top}}\n{{/draggable}}\n\n{^{draggable left=cx2 top=cy2 ...}}\n  {^{:~left}} {^{:~top}}\n{{/draggable}}\n\n{{for points}}\n  {^{draggable left=~root.expand top=~root.rotate\n    ^cx=~root.cx ^cy=~root.cy\n    shift=angle radius=r\n    convert=\"polarToXY\" convertBack=\"XYtoPolar\" ...\n  }}\n    {{:angle/30}}\n  {{/draggable}}\n\n  {^{draggable left=~root.expand top=~root.rotate\n    ^cx=~root.cx2 ^cy=~root.cy2\n    shift=angle radius=r scaleRot=-2\n    convert=\"polarToXY\" convertBack=\"XYtoPolar\" ...\n  }}\n    {{:angle/30}}\n  {{/draggable}}\n{{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Custom {{draggable}} tag (without jQuery UI)",
        "text": "Custom {{draggable}} tag (without jQuery UI)\nFinally here is the same sample but using a custom tag (which we name {{draggable2}}) instead of the jQueryUI widget-based {{draggable}}. It illustrates how to create a JsViews custom tag using multiple parameter binding, and providing tag contextual paramters:\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/draggable-droppable/draggable2",
        "text": "$.views.tags(\"draggable2\", {\n  bindTo: [\"left\", \"top\"],\n  linkedCtxParam: [\"left\", \"top\"],\n  mainElement: \"div\",\n  template: \"<div class='mytag'>{{include tmpl=#content/}}</div>\",\n  onBind: function() {\n    var tag = this;\n    tag.mainElem.on(\"mousedown touchstart\", function(ev) {\n      var offset = tag.mainElem.offset(),\n        addedLeft = offset.left - ev.clientX,\n        addedTop = offset.top - ev.clientY;\n      if (document.elementFromPoint(ev.clientX, ev.clientY) === tag.mainElem[0]) {\n        $(document).on(\"mousemove touchmove\", function(ev2) {\n          var moveToX = ev2.clientX + addedLeft,\n            moveToY = ev2.clientY + addedTop;\n          tag.updateValues(moveToX, moveToY, true); // Async update\n          tag.setValues(moveToX, moveToY);\n          ev.preventDefault();\n        });\n      }\n      ev.preventDefault();\n    });\n    $(document).on(\"mouseup touchend\", function() {\n      $(document).off(\"mousemove touchmove\");\n    });\n  },\n  setValue: function(value, index) {\n    this.mainElem.offset(index ? {top: value || 0} : {left: value || 0});\n  },\n  getValue: function() {\n    var offset = this.mainElem.offset();\n    return [offset.left, offset.top];\n  },\n  onUpdate: false,\n  setSize: true\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/menu": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following sample uses the {{menu}} tag control – based on the jQuery UI menu widget (api).\nThe sample is a declarative data-driven version of the jQuery UI Menu – icons demo.\nThe ~menuAction helper function is assigned as event handler for the jQuery UI Menu widget select event.\n{^{menu ~menuAction}}\n  <li>\n    <div><span class=\"ui-icon ui-icon-disk\"></span>Save</div>\n  </li>\n  ...\n{{/menu}}\n\n"
      },
      {
        "_type": "sample",
        "title": "Tag syntax, in a template",
        "url": "samples/tag-controls/jqui/menu/menu",
        "text": "Tag syntax, in a template\n{^{menu ~menuAction}}\n  <li>\n    <div><span class=\"ui-icon ui-icon-disk\"></span>Save</div>\n  </li>\n  ...\n{{/menu}}\n\npageTmpl.link(\"#page\", data, {\n  menuAction: function(ev, ui) {\n    ...\n    alert(ui.item.text());\n  }\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The same result can be obtained using element-based data-link markup:\n<ul data-link=\"{menu ~menuAction}\">\n  <li>\n    <div><span class=\"ui-icon ui-icon-disk\"></span>Save</div>\n  </li>\n  ...\n</ul>\n\nHere it is as top-level data-linked content:\n"
      },
      {
        "_type": "sample",
        "title": "Data-link syntax, top-level content",
        "text": "Data-link syntax, top-level content\n\n\n  \n    \n    Save\n  \n  \n    \n    Zoom In\n  \n  \n    \n    Zoom Out\n  \n  \n    \n    Print...\n  \n  \n    Playback\n    \n      \n        \n        Prev\n      \n      \n        \n        Stop\n      \n      \n        \n        Play\n      \n      \n        \n        Next\n      \n    \n  \n  \n    Learn more about this menu\n  \n\n\n\nSome page content.\nvar data = {};\n\n$.link(true, \"#linked\", data, {\n  menuAction: function(ev, ui) {\n    if (!ui.item.children(\"ul\").length) {\n      // Leaf menu item\n      alert(ui.item.text());\n    }\n  }\n});\n<div id=\"linked\">\n  ...\n  <ul data-link=\"{menu ~menuAction}\">\n    <li>\n      <div><span class=\"ui-icon ui-icon-disk\"></span>Save</div>\n    </li>\n    ...\n  </ul>\n  ...\n\n$.link(true, \"#linked\", data, {\n  menuAction: function(ev, ui) {\n    ...\n    alert(ui.item.text());\n  }\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/progressbar": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following sample uses the {{progressbar}}, {{slider}} and {{button}} tag controls – based on the jQuery UI progressbar widget (api), slider widget (api) and button widget (api).\nThe sample is a declarative data-driven version of the jQuery UI Progress Bar – custom label demo.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/progressbar/variants",
        "text": "Tag syntax:\n{^{progressbar amount\n  busy=mode===\"Busy\"\n  _max=max\n  _change=~change\n  _complete=~complete\n  width=\"70%\"\n  height=25\n/}}\n\nTag syntax – wrapping a <div>, to provide a custom label:\n{^{progressbar amount\n  busy=mode===\"Busy\"\n  _max=max\n  ...\n}}\n  <div class=\"proglabel\" data-link=\"label||100*amount/max+'%'\"></div>\n{{/progressbar}}\n\nData-linked element syntax (again wrapping a <div>, to provide a custom label):\n<div data-link=\"{progressbar amount\n  busy=mode==='Busy'\n  _max=max\n  ...\n}\">\n  <div class=\"proglabel\" ...></div>\n</div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/api": {
    "sections": [
      {
        "_type": "para",
        "title": "Declarative setting of options",
        "text": "Declarative setting of options\nAny widget options can be initialized by setting a named property on the tag – using the option name preceded by _.\nFor example:\n{^{datepicker startDate\n  _changeMonth=true\n  ...\n/}}\n\nas shown in this sample.\n"
      },
      {
        "_type": "para",
        "title": "Data-linked option",
        "text": "Data-linked option\nIf you want the widget option to be not only initialized, but also data-linked (to respond to “observable” changes), prepend a ^ character(see Binding to named properties), as shown in the same sample:\n{^{datepicker endDate\n  ^_minDate=startDate\n/}}\n\n"
      },
      {
        "_type": "para",
        "title": "Using jQuery UI widget events",
        "text": "Using jQuery UI widget events\nNamed tag properties can also be used to set widget event handlers declaratively, as illustrated in this sample:\n{^{progressbar amount\n  ...\n  _change=~change\n  _complete=~complete\n  ...\n/}}\n\n"
      },
      {
        "_type": "para",
        "title": "Programmatic setting of options",
        "text": "Programmatic setting of options\nA simple way to set widget options using the standard jQuery UI programmatic approach is to declare an id on the tag, and then use the corresponding jQuery selector, as illustrated in this toolbar sample:\n{^{checkbox reverse id=\"myCheckbox\"/}}\n\n// Set the 'classes' option\n$(\"#myCheckbox\").checkboxradio(\"option\", \"classes\", {\"ui-checkbox...\": ...});\n\n$.observe(model, \"reverse\", function() {\n  // Set the 'label' option\n  $(\"#myCheckbox\").checkboxradio(\"option\", \"label\", ...);\n});\n\nAnother approach (not requiring id assignment) is to override the onBind event of the tag, and set options programmatically in the handler. This approach is also used in the same toolbar sample:\n{^{controlgroup onBind=~onbind}}\n\npageTmpl.link(\"#page\", model, {\n  ...\n  onbind: function(val) {\n    this.baseApply(arguments);\n    this.mainElem.controlgroup(\"option\", \"classes\", ...);\n  },\n  ...\n});\n\n"
      },
      {
        "_type": "para",
        "title": "Getting from a tag instance to the widget APIs",
        "text": "Getting from a tag instance to the widget APIs\nAlternatively, if you have an instance, mytag, of a jQuery UI widget tag control, you can access the widget API from mytag.mainElem.widgetName(...) or  from mytag.widget(...):\n// Set the 'label' option\ncheckboxTag.mainElem.checkboxradio(\"option\", \"label\", ...);\n\nor\n// Set the 'label' option\ncheckboxTag.widget.option(\"label\", ...);\n\n"
      },
      {
        "_type": "para",
        "title": "Calling jQuery UI widget methods",
        "text": "Calling jQuery UI widget methods\nCalling widget methods, like programmatic setting of options, can be done –\n\nusing the selector approach:\n$(\"#myCheckbox\").checkboxradio(\"disable\");\n\nfrom the tag instance, using tag.mainElem:\ncheckboxTag.mainElem.checkboxradio(\"disable\");\n\nfrom the tag instance, using tag.widget:\ncheckboxTag.widget.disable();\n\n\nEach of these approaches is shown in the following sample:\n"
      },
      {
        "_type": "sample",
        "title": "Accessing jQuery UI widget APIs",
        "text": "Accessing jQuery UI widget APIs\n\n  {^{on enable}}Enable{{/on}}\n  {^{on disable}}Disable{{/on}}<br/><br/>\n  {^{checkbox reverse id=\"myCheckbox\" label=\"Reverse\"/}}\n\n\n\nvar pageTmpl = $.templates(\"#pageTmpl\"),\n  model = {\n    reverse: false,\n    enable: function() {\n      $(\"#myCheckbox\")\n        .checkboxradio(\"enable\")                        // Method call\n        .checkboxradio(\"option\", \"label\", \"New label\"); // Chaining with 'set option' call \n    },\n    disable: function(ev) {\n      // Get parent view\n      var parentView = $.view(ev.target, \"data\");\n      // Find {{checkbox}} tags\n      var checkboxTag = parentView.childTags(true, \"checkbox\")[0];\n      checkboxTag.widget\n        .disable()                                       // Method call\n        .option(\"label\", \"New label2\");                  // Chaining with 'set option' call\n// alternatively\n//    checkboxTag.mainElem\n//      .checkboxradio(\"disable\")                        // Method call\n//      .checkboxradio(\"option\", \"label\", \"New label2\"); // Chaining with 'set option' call\n    }\n  };\n\npageTmpl.link(\"#page\", model);\n\n\nSelector:\n$(\"#myCheckbox\")\n  .checkboxradio(\"enable\");                       // Method call \n  .checkboxradio(\"option\", \"label\", \"New label\"); // Chaining with 'set option' call \n\ntag.widget:\ncheckboxTag.widget\n  .disable()                                       // Method call\n  .option(\"label\", \"New label2\");                  // Chaining with 'set option' call\n\ntag.mainElem:\ncheckboxTag.mainElem\n  .checkboxradio(\"disable\")                        // Method call\n  .checkboxradio(\"option\", \"label\", \"New label2\"); // Chaining with 'set option' call\n\n\n"
      }
    ]
  },
  "samples/tag-controls/jqui/tabs": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following sample uses the {{tabs}} tag control – based on the jQuery UI tabs widget (api).\nThe sample is a declarative data-driven version of the jQuery UI Tabs – Collapse content demo – shown both using tag syntax and data-linked element syntax.\n"
      },
      {
        "_type": "sample",
        "title": "Collapsible tabs",
        "text": "Collapsible tabs\n\n\n<h4>Tag syntax:</h4>\n\n<pre>\n&lcub;^{tabs ...}&rcub;...&lcub;^{/tabs}&rcub;\n</pre>\n\n<!--tag syntax-->\n{^{tabs _collapsible=true}}\n  <ul>\n    <li><a href=\"#tabs-1\">Nunc tincidunt</a></li>\n    <li><a href=\"#tabs-2\">Proin dolor</a></li>\n    <li><a href=\"#tabs-3\">Aenean lacinia</a></li>\n  </ul>\n  <div id=\"tabs-1\">\n    <p><em>Click tab again to close content pane.</em></p>\n    <p>Proin elit arcu, rutrum commodo, vehicula tempus, commodo a,\n    risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris.</p>\n  </div>\n  <div id=\"tabs-2\">\n    <p><em>Click tab again to close content pane.</em></p>\n    <p>Morbi tincidunt, dui sit amet facilisis feugiat,\n    odio metus gravida ante, ut pharetra massa metus id nunc.</p>\n  </div>\n  <div id=\"tabs-3\">\n    <p><em>Click tab again to close content pane.</em></p>\n    <p>Duis cursus.</p>\n  </div>\n{{/tabs}}\n\n<h4>Element-based data-link syntax:</h4>\n\n<pre>\n&lt;div data-link=\"{tabs _collapsible=true}\">...&lt;/div>\n</pre>\n\n<!--alternative data-linked element syntax-->\n<div data-link=\"{tabs _collapsible=true}\">\n  <ul>\n    <li><a href=\"#tabs-1b\">Not latin</a></li>\n    <li><a href=\"#tabs-2b\">Tab2</a></li>\n    <li><a href=\"#tabs-3b\">Tab3</a></li>\n  </ul>\n  <div id=\"tabs-1b\">\n    <p><em>Click tab again to close content pane.</em></p>\n    <p>First non-latin text.</p>\n  </div>\n  <div id=\"tabs-2b\">\n    <p><em>Click tab again to close content pane.</em></p>\n    <p>Second text.</p>\n  </div>\n  <div id=\"tabs-3b\">\n    <p><em>Click tab again to close content pane.</em></p>\n    <p>Further content.</p>\n  </div>\n</div>\n\n\n\n\n\nvar pageTmpl = $.templates(\"#pageTmpl\"),\n  model = {};\n\npageTmpl.link(\"#page\", model);\nTag syntax:\n{^{tabs _collapsible=true}}\n  <ul>\n    <li><a href=\"#tabs-1\">...</a></li>\n    <li><a href=\"#tabs-2\">...</a></li>\n    ...\n  </ul>\n  <div id=\"tabs-1\">...</div>\n  <div id=\"tabs-2\">...</div>\n  ...\n{{/tabs}}\n\nData-linked element syntax:\n<div data-link=\"{tabs _collapsible=true}\">\n  <ul>\n    <li><a href=\"#tabs-1\">...</a></li>\n    <li><a href=\"#tabs-2\">...</a></li>\n    ...\n  </ul>\n  <div id=\"tabs-1\">...</div>\n  <div id=\"tabs-2\">...</div>\n  ...\n</div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Initializing the selected tab",
        "text": "Initializing the selected tab\nBy default the first tab is selected initially.\nTo specify different initial tab selection, pass an integer as argument.\n{^{tabs 2 _collapsible=true}}...\n\nor\n<div data-link=\"{tabs 2 _collapsible=true}\">...\n\nTo initialize with collapsed tabs, pass the argument false.\n"
      },
      {
        "_type": "para",
        "title": "Data-linking the selected tab",
        "text": "Data-linking the selected tab\nThe ‘selected tab’ argument can of course be provided by an expression or data path:\n{^{tabs selectedTab _collapsible=true}}...\n\nIn  this case, the {{tabs}} control provides two-way data-binding on the corresponding data property (selectedTab).\nThis is illustrated in the following sample, which is the same as the sample above except that both sets of tabs are data-linked to the same selectedTab property. As a result, the two tabs controls stay in sync: changing (or collapsing) the tab on one will trigger the corresponding change on the other.\n"
      },
      {
        "_type": "sample",
        "title": "Data-linking the selected tab",
        "url": "samples/tag-controls/jqui/tabs/collapsible",
        "text": "Data-linking the selected tab\nTag syntax:\n{^{tabs selectedTab _collapsible=true}}\n  ...\n\nData-linked element syntax:\n<div data-link=\"{tabs selectedTab _collapsible=true}\">\n  ...\n\nCode:\nvar model = {selectedTab: 1};\n\npageTmpl.link(\"#page\", model);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sortable tabs",
        "text": "Sortable tabs\nSortable tabs are obtained very simply, by wrapping the <li> markup for the tabs in a {{sortable}} tag, within the {{tabs}} tag.\n{^{tabs}}\n  {^{sortable elem=\"ul\"}}\n    <li>...\n\nThe following sample is a declarative data-driven version of the jQuery UI Tabs – Sortable demo, using tag syntax.\nThe sample also shows how (as with any of the jQuery UI based tag controls) you can specify a class or classes on the tag:\n"
      },
      {
        "_type": "sample",
        "title": "",
        "url": "samples/tag-controls/jqui/tabs/sortable",
        "text": "Tag syntax:\n{^{tabs class=\"red\"}}\n  {^{sortable elem=\"ul\"}}\n    <li><a href=\"#tabs-1\">Nunc tincidunt</a></li>\n    <li><a href=\"#tabs-2\">Proin dolor</a></li>\n    ...\n  {{/sortable}}\n  <div id=\"tabs-1\">...</div>\n  <div id=\"tabs-2\">...</div>\n  ...\n{{/tabs}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using {{tabs}} with a data-linked array",
        "text": "Using {{tabs}} with a data-linked array\nA data-driven approach can be used, with the tab header text and panel contents rendered from a data array:\n{^{tabs}}\n  <ul>\n    {^{for tabPanels}}\n      <li><a href=\"#{{:id}}\">{{:header}}</a></li>\n    {{/for}}\n  </ul>\n  {^{for tabPanels}}\n    <div id=\"{{:id}}\">{{:content}}</div>\n  {{/for}}\n{{/tabs}}\n\n"
      },
      {
        "_type": "para",
        "title": "Sortable tabs with  a data-linked array",
        "text": "Sortable tabs with  a data-linked array\nIf a {{tabs}} tag control with content coming from a data-driven array is also sortable, then sorting the tabs will sort the underlying data array – and raise corresponding observable events. This is the same behavior as is obtained with the {{sortable}} tag used alone, without {{tabs}}. To opt out of the observable binding on the array, set {^{sortable _bindArray=false ...}}.\nThe following sample shows data-linking to the underlying array, with a sortable {{tabs}} tag control:\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/tabs/sortablearray",
        "text": "{^{tabs selectedTab}}\n  {^{sortable elem=\"ul\" _axis=\"x\"}}\n    {^{for tabData}}<li><a href=\"#{{:id}}\">{^{:header}}</a></li>{{/for}}\n  {{/sortable}}\n  {^{for tabData}}\n    <div id=\"{{:id}}\">{^{:content}}</div>\n  {{/for}}\n{{/tabs}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sortable tabs with  a data-linked array &ndash; top-level data-linking",
        "text": "Sortable tabs with  a data-linked array – top-level data-linking\nFinally, here is the same sample as above, but achieved entirely through top-level data linking:\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/tabs/sortablearray-toplevel",
        "text": "<script id=\"tabsMarkup\" type=\"text/x-jsrender\">\n  {^{sortable elem=\"ul\" _axis=\"x\"}}\n    {^{for tabData}}<li><a href=\"#{{:id}}\">{^{>header}}</a></li>{{/for}}\n  {{/sortable}}\n  {^{for tabData}}\n    <div id=\"{{:id}}\">{^{>content}}</div>\n  {{/for}}\n</script>\n\nTop-level data-linked element:\n<div class=\"linkedUI\" data-link=\"{include tmpl='#tabsMarkup'}{tabs selectedTab}\"></div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/selectmenu": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{selectmenu}} tag control integrates the jQuery UI selectmenu widget (api).\nWhen using tag syntax, the tag wraps directly the <option> elements:\n{^{selectmenu color}}\n  <option value=\"black\">Black</option>\n  <option value=\"red\">Red</option>\n  ...\n{{/selectmenu}}\n\nAlternatively, the selectmenu tag binding can be used with a data-linked <select> element:\n<select data-link=\"{selectmenu color}\">\n  <option value=\"black\">Black</option>\n  <option value=\"red\">Red</option>\n  ...\n</select>\n\nA data-driven approach can be used, with the <option> elements rendered from a data array:\n{^{selectmenu color}}\n  {^{for colors}}\n    <option value=\"{{:name}}\">{{:label}}</option>\n  {{/for}}\n{{/selectmenu}}\n\nThis is shown in the following sample, which is a declarative data-driven version of the jQuery UI Selectmenu – product selection demo:\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/selectmenu/product-selection",
        "text": "Data:\nvar model = {\n  color: \"yellow\",\n  colors: [\n    {name: \"black\", label: \"Black\"},\n    {name: \"red\", label: \"Red\"},\n    ...\n  ],\n};\n...\n\nTemplate:\n...\n<label for=\"color\">Circle color</label>\n{^{selectmenu color name=\"color\"}}\n  {^{for colors}}\n    <option value=\"{{:name}}\">{{:label}}</option>\n  {{/for}}\n{{/selectmenu}}\n...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "For a data-driven approach using element-based data-link syntax, the data-linked <select> will have two tag bindings – a {for} binding and a {selectmenu} binding:\n<select data-link=\"html{for colors tmpl=...} {selectmenu color}\"></select>\n\nThis is shown in the following sample, which is functionally the same as the sample above, but uses only top-level data-linked elements, rather than a rendered template:\n"
      },
      {
        "_type": "sample",
        "text": "\n  fieldset {border:0; margin-left:300px;}\n  label {display:block; margin:20px 0 5px;}\n  select {width:200px;}\n  .circle {float:left; border-radius:50%; width:150px; height:150px;}\n  .clear {clear:both}\n\n\n\n  <option value=\"{{:}}\">{{:}}px</option>\n\n\n\n  \n\n  \n  Circle color\n  \n\n  Circle radius\n  \n  \n\n  \n    {^{:color}} {^{:radius}}px\n  \n\nvar model = {\n  color: \"yellow\",\n  colors: [\n    {name: \"black\", label: \"Black\"},\n    {name: \"red\", label: \"Red\"},\n    {name: \"yellow\", label: \"Yellow\"},\n    {name: \"blue\", label: \"Blue\"},\n    {name: \"green\", label: \"Green\"}\n  ],\n  radius: 100,\n  radii: [50, 100, 150, 200, 250]\n};\n\n// Top-level data linking\n$.link(true, \"#linked\", model, {\n  // For the colorOption template we will pass in the template as\n  // helper, rather than using a template declared in a script element.\n  colorOptionTmpl:\n    $.templates('{{:label}}')\n});\nTop-level elements:\n<div id=\"linked\">\n  ...\n  <select data-link=\"html{for colors tmpl=~colorOptionTmpl} {selectmenu color}\" ...></select>\n  ...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that {{selectmenu}} is an alternative to data-linking directly to a <select> element. Using {{selectmenu}} brings the jQuery UI themable look and feel…\nBoth provide two-way binding to the data-linked expression such as color – as shown in the following example:\n"
      },
      {
        "_type": "sample",
        "text": "\n  fieldset {border:0; margin-left:300px;}\n  label {display:block; margin:20px 0 5px;}\n  select {width:200px;}\n  .circle {float:left; border-radius:50%; width:150px; height:150px;}\n  .clear {clear:both}\n\n\n\n\n<div data-link=\"\n  css-background{:color}\n  css-width{:radius}\n  css-height{:radius}\n\" class=\"circle\"></div>\n\n<fieldset>\n{^{selectmenu color}}\n  {^{for colors}}\n    <option value=\"{{:name}}\">{{:label}}</option>\n  {{/for}}\n{{/selectmenu}}<br/><br/>\n\n<select data-link=\"{selectmenu color}\">\n  {^{for colors}}\n    <option value=\"{{:name}}\">{{:label}}</option>\n  {{/for}}\n</select><br/><br/>\n\n<select data-link=\"color\">\n  {^{for colors}}\n    <option value=\"{{:name}}\">{{:label}}</option>\n  {{/for}}\n</select><br/><br/>\n\n<select data-link=\"color\" size=\"5\">\n  {^{for colors}}\n    <option value=\"{{:name}}\">{{:label}}</option>\n  {{/for}}\n</select>\n</fieldset>\n\n<div class=\"clear\">\n  {^{:color}}\n</div>\n\n\n\n\nvar pageTmpl = $.templates(\"#pageTmpl\"),\n  model = {\n    color: \"yellow\",\n    colors: [\n      {name: \"black\", label: \"Black\"},\n      {name: \"red\", label: \"Red\"},\n      {name: \"yellow\", label: \"Yellow\"},\n      {name: \"blue\", label: \"Blue\"},\n      {name: \"green\", label: \"Green\"}\n    ]\n  };\n\npageTmpl.link(\"#page\", model);\nAlternative drop-down styles:\n{^{selectmenu color}}\n  {^{for colors}}...{{/for}}\n{{/selectmenu}}\n\n<select data-link=\"{selectmenu color}\">\n  {^{for colors}}...{{/for}}\n</select>\n\n<select data-link=\"color\">\n  {^{for colors}}...{{/for}}\n</select>\n\n<select data-link=\"color\" size=\"5\">\n  {^{for colors}}...{{/for}}\n</select>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/autocomplete": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{autocomplete}} tag control – based on the jQuery UI autocomplete widget (api) – can be used with <input> or <textarea> elements, or with contenteditable elements.\nThe following sample shows each of these cases, using either tag syntax or element-based data-link syntax.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/autocomplete/variants",
        "text": "Each variant has two-way data binding to the val property, and obtains the autocomplete suggestion list locally from a suggestionList helper property (assigned to the _source property, from the jQuery UI API).\nFor example:\nTag syntax:\n{^{autocomplete val _source=~suggestionList/}}\n\nTag syntax wrapping a <textarea> element:\n{^{autocomplete val _source=~suggestionList}}\n  <textarea ...></textarea>\n{{/autocomplete}}\n\nData-linked element syntax (textarea):\n<textarea ... data-link=\"{autocomplete val _source=~suggestionList}\"></textarea>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/selectable": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{selectable}} tag control integrates the jQuery UI Selectable widget (api).\nWhen using tag syntax, the tag wraps directly the container element (which wraps the markup for the selectable elements):\n{^{selectable ...}}\n  <ol data-link=\"{selectable}\">\n    <li>Jo</li>\n    <li>Pierre</li>\n    ...\n  </ol>\n{{/selectable}}\n\nThe tag can also be used wrapping the selectable elements directly, and with the elem=... property specifying a container element. (The tag will render the container element):\n{^{selectable ... elem=\"ol\"}}\n  <li>Jo</li>\n  <li>Pierre</li>\n  ...\n{{/selectable}}\n\nAlternatively, the selectable tag binding can be used with a data-linked wrapper element:\n<ol data-link=\"{selectable ...}\">\n  <li>Jo</li>\n  <li>Pierre</li>\n  ...\n</ol>\n\nThe following sample shows two selectables – one using tag syntax, and the other using element syntax, and is a declarative data-driven version of the jQuery UI Selectable – Display as grid demo.\n"
      },
      {
        "_type": "sample",
        "title": "Selectable &ndash; Display as grid",
        "text": "Selectable – Display as grid\n\n  ol.grid {list-style-type: none; margin: 0 0 162px 0; padding: 0; width: 360px;}\n  .grid .ui-selecting {background: #FECA40;}\n  .grid .ui-selected {background: #F39814; color: white;}\n  .grid li {float: left; margin: 3px; padding: 1px; height: 50px; font-size: 18px;\n    line-height: 46px; cursor:pointer; width: 66px; text-align: center;\n    border: 1px solid #c5c5c5; background: #f6f6f6; color: #454545;}\n  h4 {clear:both}\n\n\n\n\n<h4>Tag syntax:</h4>\n\n<pre>\n&lcub;^{selectable ...}&rcub;...&lcub;^{/selectable}&rcub;\n</pre>\n\n{^{selectable class=\"grid\" elem=\"ol\"}}\n  <li>Jo</li>\n  <li>Pierre</li>\n  <li>Rudy</li>\n  <li>Mara</li>\n  <li>Mando</li>\n  <li>Ivor</li>\n  <li>Graca</li>\n  <li>Sabrine</li>\n{{/selectable}}\n\n<h4>Element-based data-link syntax:</h4>\n\n<pre>\n&lt;ol data-link=\"{selectable}\">...&lt;/ol>\n</pre>\n\n<ol class=\"grid\" data-link=\"{selectable}\">\n  <li>Jo</li>\n  <li>Pierre</li>\n  <li>Rudy</li>\n  <li>Mara</li>\n  <li>Mando</li>\n  <li>Ivor</li>\n  <li>Graca</li>\n  <li>Sabrine</li>\n</ol>\n\n\n\nDrag (or ctrl-click) to select one or more elements:\n\nvar pageTmpl = $.templates(\"#pageTmpl\"),\n  model = {};\n\npageTmpl.link(\"#page\", model);\nTag syntax:\n{^{selectable class=\"grid\" elem=\"ol\"}}\n  <li>Jo</li>\n  <li>Pierre</li>\n  ...\n{{/selectable}}\n\nData-linked element syntax:\n<ol class=\"grid\" data-link=\"{selectable}\">\n  <li>Jo</li>\n  <li>Pierre</li>\n  ...\n</ol>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Initializing and data-linking the selection",
        "text": "Initializing and data-linking the selection\nBy default the none of the elements are initially selected. By providing as argument an array of integers (the indices of the initially selected elements) the initial selection be specified.\nIn addition, the {{selectable}} tag control provides two-way binding, so the array will be observably updated whenever selection changes.\n{^{selectable selection}}...\n\nor\n<div data-link=\"{selectable selection}\">...\n\nThis is illustrated in the following sample, which is the same as the sample above except that both selectable tag controls are data-linked to the same selectedPanel property. As a result, the two stay in sync: changing selection on one will trigger the corresponding change on the other.\n"
      },
      {
        "_type": "sample",
        "title": "Data-linking the selection",
        "text": "Data-linking the selection\n\n<b>Selected indices:</b> {^{for selected}}{{:}} {{/for}}\n\n<h4>Tag syntax:</h4>\n\n<pre>\n&lcub;^{selectable selected ...}&rcub;...&lcub;^{/selectable}&rcub;\n</pre>\n\n{^{selectable selected class=\"grid\" elem=\"ol\"}}\n  <li>Jo</li>\n  <li>Pierre</li>\n  <li>Rudy</li>\n  <li>Mara</li>\n  <li>Mando</li>\n  <li>Ivor</li>\n  <li>Graca</li>\n  <li>Sabrine</li>\n{{/selectable}}\n\n<h4>Element-based data-link syntax:</h4>\n\n<pre>\n&lt;ol data-link=\"{selectable selected ...}\">...&lt;/ol>\n</pre>\n\n<ol class=\"grid\" data-link=\"{selectable selected}\">\n  <li>Jo</li>\n  <li>Pierre</li>\n  <li>Rudy</li>\n  <li>Mara</li>\n  <li>Mando</li>\n  <li>Ivor</li>\n  <li>Graca</li>\n  <li>Sabrine</li>\n</ol>\n\n\n\n\nvar pageTmpl = $.templates(\"#pageTmpl\"),\n  model = {selected: [3, 6]};\n\npageTmpl.link(\"#page\", model);\nTag syntax:\n{^{selectable selected}}\n  ...\n\nData-linked element syntax:\n<div data-link=\"{selectable selected}\">\n  ...\n\nTracking the selection:\nSelected indices: {^{for selected}}{{:}} {{/for}}\n\nCode:\nvar model = {selected: [3, 6]};\npageTmpl.link(\"#page\", model);\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using {{selectable}} with a data-linked array",
        "text": "Using {{selectable}} with a data-linked array\nA data-driven approach can be used, with the selectable elements rendered from a data array:\n{^{selectable ... elem='ol'}}\n  {^{for itemData}}\n    <li>{^{:title}}</li>\n  {{/for}}\n{{/selectable}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sortable selectable elements with  a data-linked array",
        "text": "Sortable selectable elements with  a data-linked array\nIf a {{selectable}} tag control with content coming from a data-driven array is also sortable, then sorting will sort the underlying data array – and raise corresponding observable events.\nThe following sample shows data-linking to the underlying array, with nested {{sortable}} and {{selectable}} tag control. Two styles of markup are shown, one with the tag syntax and the other with data-linked element syntax:\n"
      },
      {
        "_type": "sample",
        "title": "{{sortable}} and {{selectable}}",
        "url": "samples/tag-controls/jqui/selectable/sortablearray",
        "text": "{{sortable}} and {{selectable}}\nTag syntax:\n<table>\n  {^{sortable ... _handle='.sort'}}\n    {^{selectable selectedItems _cancel=\"td:not(.sel)\" _filter=\".sel\" elem=\"tbody\"}}\n      {^{for people ...}}\n        <tr>\n          <td class=\"sel\">Select</td>\n          <td class=\"sort\">Sort</td>\n          ...\n        </tr>\n      {{/for}}\n    {{/selectable}}\n  {{/sortable}}\n</table>\n\nData-linked element syntax:\n<table>\n  <tbody data-link=\"\n    {for people ... tmpl='#itemMarkup'}\n    {sortable ... _handle='.sort'}\n    {selectable selectedItems _cancel='td:not(.sel)' _filter='.sel'}\n  \"></tbody>\n</table>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Sortable selectable elements with  a data-linked array &ndash; top-level data-linking",
        "text": "Sortable selectable elements with  a data-linked array – top-level data-linking\nFinally, here is the same sample as above, but achieved entirely through top-level data linking:\n"
      },
      {
        "_type": "sample",
        "title": "{{sortable}} and {{selectable}} &ndash; top-level",
        "url": "samples/tag-controls/jqui/selectable/sortablearray-toplevel",
        "text": "{{sortable}} and {{selectable}} – top-level\n<script id=\"itemMarkup\" type=\"text/x-jsrender\">\n  <tr>\n    <td class=\"sel\">Select</td>\n    <td class=\"sort\">Sort</td>\n    ...\n  </tr>\n</script>\n\nTop-level data-linked element:\n<tbody class=\"linkedUI\" data-link=\"\n  {for people ... tmpl='#itemMarkup'}\n  {sortable ...}\n  {selectable selectedItems ...}\n\"></tbody>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Advanced scenario: Data-linking directly to the {{selectable}} tag control properties",
        "text": "Advanced scenario: Data-linking directly to the {{selectable}} tag control properties\nGenerally to track selection it is best to use the two-way data-linking on the argument. If you have two independent {{selectable}} tags, they can each bind to a different data or helper property.\nHowever it is possible to use {{selectable}} without argument (so without binding to model or helper properties), and instead to bind to the selected property of the tag instance  – which will update observably when the selection changes.\nHere is an advanced sample which does that:\n"
      },
      {
        "_type": "sample",
        "text": "\n\n<h4>Selection</h4>\n\n{^{for #childTags('selectable') lateRender=true}}\n  List {{:tagCtx.props.list}} [\n    {^{for selected}} {{:}} {{/for}} \n  ]<br/>\n{{/for}}\n\n<h4>List one</h4>\n\n<table>\n  {^{selectable _filter=\"tr\" elem=\"tbody\" list=\"one\"}}\n    {^{for people}}\n      <tr>\n        <td>{{:name}}</td>\n      </tr>\n    {{/for}}\n  {{/selectable}}\n</table>\n\n<h4>List two</h4>\n\n<table>\n  {^{selectable _filter=\"tr\" elem=\"tbody\" list=\"two\"}}\n    {^{for people}}\n      <tr>\n        <td>{{:name}}</td>\n      </tr>\n    {{/for}}\n  {{/selectable}}\n</table>\n\n\n\n\nvar pageTmpl = $.templates(\"#pageTmpl\"),\n  model = {\n    people: [\n      {name: \"Jo\"},\n      {name: \"Pierre\"},\n      {name: \"Radagu\"},\n      {name: \"Mando\"}\n    ]\n  };\n\npageTmpl.link(\"#page\", model);\nBinding to the tag.selected property of any {{selectable}} tags in the page is achieved by first finding all sibling {{selectable}} tags, and iterating through them:\n{^{for #childTags('selectable') lateRender=true}}\n\nHere lateRender=true ensures that the declarative childTags() call only happens after the initial data-linking has been completed.\nThen for each {{selectable}} tag, we iterate through the selected array property:\n{^{for selected}} {{:}} {{/for}}\n\nThe complete markup is:\n{^{for #childTags('selectable') lateRender=true}}\n  List {{:tagCtx.props.list}} [\n    {^{for selected}} {{:}} {{/for}} \n  ]<br/>\n{{/for}}\n...\n{^{selectable ... list=\"One\"}}\n...\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/sortable": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{sortable}} tag control integrates the jQuery UI sortable widget (api).\nWhen using tag syntax, the tag wraps directly the container element:\n{^{sortable ...}}\n  <ul>\n    <li>Drag me</li>\n    ...\n  </ul>\n{{/sortable}}\n\nThe tag can also be used wrapping the sorted elements directly, and with the elem=... property specifying a container element. (The tag will render the container element):\n{^{sortable ... elem='ul'}}\n  <li>Drag me</li>\n  ...\n{{/sortable}}\n\nAlternatively, the sortable tag binding can be used with a data-linked wrapper element:\n<ul data-link=\"{sortable ...}\">\n  <li>Drag me</li>\n  ...\n</ul>\n\nThe following sample shows each of the above alternative syntax styles:\n"
      },
      {
        "_type": "sample",
        "title": "Alternate syntaxes",
        "text": "Alternate syntaxes\n\n  .ui-sortable li {list-style-type:none;}\n  .ui-sortable li, .ui-state-highlight {\n   height:1.2em; margin:0 0 5px 0; padding:5px;\n   font-size:.9em; width: 200px;}\n\n\n\n\n{^{sortable\n  _placeholder='ui-state-highlight'\n  _axis='y'\n}}\n  <ul>\n    <li class=\"ui-state-default\">Drag me</li>\n    <li class=\"ui-state-default\">up or down</li>\n    <li class=\"ui-state-default\">to sort...</li>\n  </ul>\n{{/sortable}}\n\n<hr/>\n\n{^{sortable\n  _placeholder='ui-state-highlight'\n  _axis='y'\n  elem='ul'\n}}\n  <li class=\"ui-state-default\">Drag me</li>\n  <li class=\"ui-state-default\">up or down</li>\n  <li class=\"ui-state-default\">to sort...</li>\n{{/sortable}}\n\n<hr/>\n\n<ul data-link=\"{sortable\n  _placeholder='ui-state-highlight'\n  _axis='y'\n}\">\n  <li class=\"ui-state-default\">Drag me</li>\n  <li class=\"ui-state-default\">up or down</li>\n  <li class=\"ui-state-default\">to sort...</li>\n</ul>\n\n\n\n\nvar model = {},\n  pageTmpl = $.templates(\"#pageTmpl\");\n\npageTmpl.link(\"#page\", model);\n\nAlternative syntaxes with {{sortable}} or data-link=\"{sortable}\".\n\n"
      },
      {
        "_type": "para",
        "title": "Using {{sortable}} with a data-linked array",
        "text": "Using {{sortable}} with a data-linked array\nA data-driven approach can be used, with the sorted elements rendered from a data array:\n{^{sortable ... elem='ul'}}\n  {^{for items}}\n    <li>{{:name}}</li>\n  {{/for}}\n{{/sortable}}\n\nor\n<ul data-link=\"{sortable ...} {for items tmpl=...}\"/>\n\n"
      },
      {
        "_type": "para",
        "title": "Triggering observable array-change events on the underlying data array, with {{sortable}}",
        "text": "Triggering observable array-change events on the underlying data array, with {{sortable}}\nWhen {{sortable}} wraps a data-linked {^{for}}array of sorted items, the tag detects the {^{for}} binding and raises observable array-change (move) events, whenever items are dragged to a new position.\nThis is shown in the following sample, where the two {{sortable}} collections remain in sync:\n"
      },
      {
        "_type": "sample",
        "title": "{{sortable}} with an 'items' array, triggering array-change events",
        "text": "{{sortable}} with an 'items' array, triggering array-change events\n\n  .ui-sortable li {list-style-type:none;}\n  .ui-sortable li, .ui-state-highlight,\n  div.ui-state-default {height:1.2em;\n  margin:0 0 5px 0; padding:5px;\n  font-size:.9em; width: 200px;}\n\n\n\n  <li class=\"ui-state-default\">{{:name}}</li>\n\n\n\n\n{^{sortable\n  _placeholder='ui-state-highlight'\n  _axis='y'\n  elem='ul'\n}}\n  {^{for items}}\n    <li class=\"ui-state-default\">{{:name}}</li>\n  {{/for}}\n{{/sortable}}\n\n<hr/>\n\n<ul data-link=\"{sortable\n  _placeholder='ui-state-highlight'\n  _axis='y'\n} {for items tmpl='#liTmpl'}\"></ul>\n\n<hr/>\n\n<h4>Data:</h4>\n{^{for items}}\n  <div class=\"ui-state-default\">{{:name}}</div>\n{{/for}}\n\n\n\n\nvar model = {\n  items: [{name: \"Drag me\"}, {name: \"up or down\"}, {name: \"to sort...\"}] \n},\n  pageTmpl = $.templates(\"#pageTmpl\");\n\npageTmpl.link(\"#page\", model);\n\n{^{sortable ...}}\n  {^{for items}}\n    <li>...</li>\n  {{/for}}\n{{/sortable}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "You can opt out of triggering array-change events, while still using a data-driven approach for rendering the sorted elements from a data array, by setting the _bindArray option to false:\n"
      },
      {
        "_type": "sample",
        "title": "{{sortable}} with an 'items' array &ndash; without array-change events",
        "text": "{{sortable}} with an 'items' array – without array-change events\n\n  .ui-sortable li {list-style-type:none;}\n  .ui-sortable li, .ui-state-highlight, div.ui-state-default {height:1.2em;\n   margin:0 0 5px 0; padding:5px; font-size:.9em; width: 200px;}\n\n\n\n  <li class=\"ui-state-default\">{{:name}}</li>\n\n\n\n\n{^{sortable\n  _bindArray=false\n  _placeholder='ui-state-highlight'\n  _axis='y'\n  elem='ul'\n}}\n  {^{for items}}\n    <li class=\"ui-state-default\">{{:name}}</li>\n  {{/for}}\n{{/sortable}}\n\n<hr/>\n\n<ul data-link=\"{sortable\n  _bindArray=false\n  _placeholder='ui-state-highlight'\n  _axis='y'\n} {for items tmpl='#liTmpl'}\"></ul>\n\n<hr/>\n\n<h4>Data:</h4>\n{^{for items}}<div class=\"ui-state-default\">{{:name}}</div>{{/for}}\n\n\n\n\nvar model = {\n  items: [{name: \"Drag me\"}, {name: \"up or down\"}, {name: \"to sort...\"}] \n},\n  pageTmpl = $.templates(\"#pageTmpl\");\n\npageTmpl.link(\"#page\", model);\n\n{^{sortable _bindArray=false ...}}\n  {^{for items}}\n    <li>...</li>\n  {{/for}}\n{{/sortable}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following sample shows many variants of a data-driven {{sortable}} list.\nIt shows full editing of the items array. It also includes top-level data-linking using the data-link=\"{sortable}\" binding.\n"
      },
      {
        "_type": "sample",
        "title": "{{sortable}} variants",
        "url": "samples/tag-controls/jqui/sortable/variants",
        "text": "{{sortable}} variants\nMultiple variants of data-driven editable {{sortable}} lists.\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/resizable": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following sample uses the {{resizable}} tag control – based on the jQuery UI resizable widget (api).\nThe sample is a declarative data-driven version of the jQuery UI Resizable – maximum / minimum size demo.\nThe width and height are initialized by setting the width and height properties of the tag control.\n"
      },
      {
        "_type": "sample",
        "text": "\n  .resize {border: 1px solid #ddd; padding: 10px; margin: 25px 0;}\n  .resize h3 {text-align: center; margin: -10px -10px 10px -10px;\n     border: 1px solid #ddd; background: #e9e9e9; color: #333;}\n\n\n\n<h4>Tag syntax</h4>\n\n<pre>&lcub;^{resizable .../}&rcub;</pre>\n\n{^{resizable width=187 height=70\n  _minWidth=136 _minHeight=40\n  _maxWidth=250 _maxHeight=100\n  class=\"resize\"\n}}\n  <h3>Resize this</h3>\n  <div>Some initial content</div>\n{{/resizable}}\n\n<h4>Element-based data-link syntax:</h4>\n\n<pre>\n&lt;div data-link=\"{resizable ...}\" /&gt;\n</pre>\n\n<div class=\"resize\" data-link=\"{resizable\n   width=187 height=70\n  _minWidth=136 _minHeight=40\n  _maxWidth=250 _maxHeight=100\n}\">\n  <h3>Resize this too</h3>\n  <div>Some more content</div>\n</div>\n\n\n\nvar pageTmpl = $.templates(\"#pageTmpl\");\n\npageTmpl.link(\"#page\");\nTag syntax:\n{^{resizable width=187 height=70 _minWidth=136 ...}}\n  <h3>Resize this</h3>\n  <div>Some initial content</div>\n{{/resizable}}\n\nData-linked element syntax:\n<div data-link=\"{resizable width=187 height=70 _minWidth=136 ...}\">\n  <h3>Resize this too</h3>\n  <div>Some more content</div>\n</div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "Two-way data-binding to width and height",
        "text": "Two-way data-binding to width and height\nThe JsViews {{resizable}} tag control provides two-way data-binding on the width and height properties. This permits many powerful scenarios, illustrated by the following examples.\nThe next sample data-links the width and height of the resizable element to underlying data properties w1 and h1.\nNeighboring layout elements also have width or height data-linked to the same data, so resizing the target element drives dynamic rendering of the surrounding layout.\nIn addition, the w1 and h1 data values are data-linked to {{slider}} and {{spinner}} controls.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/resizable/grid",
        "text": "...\n<div data-link=\"css-height{:100-h1/2}\" ... >top</div>\n<span data-link=\"css-width{:120-w1/2} css-height{:h1}\" ... >left</span>\n<span data-link=\"{resizable width=w1 height=h1 _minWidth=46 ...}\" ... >Resize!</span>\n<span data-link=\"css-width{:120-w1/2} css-height{:h1}\" ... >right</span>\n<div data-link=\"css-height{:100-h1/2}\" ... >bottom</div>\n...\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using converters with multi-parameter two-way data-linking",
        "text": "Using converters with multi-parameter two-way data-linking\nThe following sample is similar, but adds a second layout using <table> elements, rather than <div>s and <span>s.\nThe second layout is reduced in scale, using converter functions to multiply heights and widths by a scaling factor. The two {{resizable}} tags (one in each layout) are linked to the same underlying data, w1 and  h1, but the second one used converters (convert and convertBack) to apply the appropriate scaling factor in both directions.\nNote the since the {{resizable}} tag control has two data-linked properties, callback functions should have a signature taking two parameters, and returning an array of two converted values.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/resizable/grid2",
        "text": "Data-linking with converters:\n...\n<td data-link=\"{resizable width=w1 height=h1 convert='reduce' convertBack='increase' _minWidth=53*scale ...\" ...>\n...\n\nConverters for two-parameter binding:\n$.views.converters({\n  reduce: function(w, h) {\n    return [scale*w, scale*h];\n  },\n  increase: function(w, h) {\n    return [w/scale, h/scale];\n  }\n});\n\n\n"
      },
      {
        "_type": "para",
        "title": "Converters as parameter transforms",
        "text": "Converters as parameter transforms\nWith any tag that provides ‘multi-parameter’ two-way data-linking (such as this {{resizable}} tag) it is quite possible to use converters which ‘mix and match’ incoming parameters – so an outgoing parameter is any kind of transform combining values from different incoming parameters.\nA very simple example would be the following converter, which maps width to height and height to width:\nfunction(w, h) {\n return [h, w];\n}\n\n"
      },
      {
        "_type": "para",
        "title": "Tag contextual parameters: ~width, ~height",
        "text": "Tag contextual parameters: ~width, ~height\nThe {{resizable}} tag control provides two tag contextual parameters – which give access to the values of the width and height from anywhere within the {{resizable}} tag’s content.\nFor example you can write:\n{^{resizable}}\n  {^{int:~width}}\n  {^{int:~height}}\n{{/resizable}}\n\nor you can even use two-way data-binding to the tag contextual parameters as in:\n{^{resizable}}\n  <input data-link=\"~height\" />\n  {^{slider ~width ... /}}\n{{/resizable}}\n\nIf the {^{resizable}} tag uses converters, then the tag contextual parameters will correspond to the values after conversion (i.e. the actual width and height of the {^{resizable}} control.\nThis is illustrated by the next sample, which adds display of ~width and ~height to the previous sample.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/resizable/grid3",
        "text": "{^{resizable width=w1 height=h1 convert='reduce' convertBack='increase' ...}}\n  {^{int:~width}} {^{int:~height}}\n{{/resizable}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/spinner": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{spinner}} tag integrates the jQuery UI spinner widget (api).\nThis allows data-linking directly to widget properties, as well as using generic tag functionality such as convert and convertBack.\nIn addition, validation support is obtained, simply by wrapping a {{spinner}} tag with a {{validate}}.\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/tag-controls/jqui/datepicker/formats": {
    "sections": [
      {
        "_type": "para",
        "title": "Display format",
        "text": "Display format\nThe {{datepicker}} tag control lets you specify the date format displayed in the textbox (when used with an <input>, rather than as inline datepicker with a <div>) – by setting the dateFormat property, using jQuery UI datepicker date formats.\nFor example:\n{^{datepicker date dateFormat=\"DD MM d, yy\"/}}\n\nwill show the date in the format ‘Monday September 22, 2017’.\n(Note: you can also, equivalently, use _dateFormat, since dateFormat is a widget option.)\nIf the dateFormat is not specified, then the current default date format of the datepicker widget, will be used (as returned by $(element).datepicker(\"option\", \"dateFormat\")).\nA different default date can be set using the setDefaults API: $.datepicker.setDefaults(\"dateFormat\", ...)\n"
      },
      {
        "_type": "para",
        "title": "Data format",
        "text": "Data format\nThe underlying data format used by {{datepicker}} will by default be a string value with the same format as the display format. So setting a different value or the dateFormat property (dateFormat=...) will also change the persistence/serialization format of the underlying data.\nHowever you can specify a different data format by setting the dataFormat property.\nFor example:\n{^{datepicker date dataFormat=\"mm/dd/yy\" dateFormat=\"DD MM d, yy\"/}}\n\nwill show the date in the format ‘Monday September 22, 2017’, but the underlying data-bound date will have the value \"09/22/2017\".\n"
      },
      {
        "_type": "para",
        "title": "Using the JavaScript Date() type for the underlying data-linked data ",
        "text": "Using the JavaScript Date() type for the underlying data-linked data \nIf dataFormat is set to false (or null or \"\"), then {{datepicker}} will use JavaScript Date() objects as the underlying date type:\n{^{datepicker date dataFormat=false dateFormat=\"D M d yy\"/}}\n\n"
      },
      {
        "_type": "para",
        "title": "Using a number (number of ticks - JavaScript Date timestamp) for the underlying data-linked data ",
        "text": "Using a number (number of ticks - JavaScript Date timestamp) for the underlying data-linked data \nIf dataFormat is set to 0, then {{datepicker}} will use the timestamp of the JavaScript Date object (milliseconds since Jan 01 1970) as the underlying date type:\n{^{datepicker date dataFormat=0 dateFormat=\"D M d yy\"/}}\n\nThe above alternative dataFormat options are shown in the following example:\n"
      },
      {
        "_type": "sample",
        "title": "Alternative data formats",
        "url": "samples/tag-controls/jqui/datepicker/date-formats/basic",
        "text": "Alternative data formats\nDefault “date string” format:\n{^{datepicker dateString /}}\n\nBinding to a chosen “date string” format:\n{^{datepicker dateString2 dateFormat=\"mm-dd-yy\" /}}\n{^{datepicker dateString2 dataFormat=\"mm-dd-yy\" dateFormat=\"DD MM d, yy\" /}}\n\nBinding to Date object:\n{^{datepicker date dataFormat=false /}}\n{^{datepicker date dataFormat='' dateFormat=\"DD MM d, yy\" /}}\n\nBinding to a Date number\n{^{datepicker dateNumber dataFormat=0 /}}\n{^{datepicker dateNumber dataFormat=0 dateFormat=\"DD MM d, yy\" /}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using a data formatter to bind to a custom underlying data format",
        "text": "Using a data formatter to bind to a custom underlying data format\nAny underlying data format can be used (for example a string format such as the WCF Date serialization) by providing a corresponding “data formatter” (an object with a parse() method and a format() method) – and setting the dataFormat to that formatter:\nvar wcfDateFormatter = {\n  parse: function(wcfString) {\n    // Use moment.js to parse WCF date string\n    return moment(wcfString, \"/\\\\D\\\\at\\\\e(xZZ)/\").toDate();\n  },\n  format: function(date) {\n    // Use moment.js to format WCF date string\n    return moment(date).format(\"/\\\\D\\\\at\\\\e(xZZ)/\");\n  }\n};\n\n// Provide wcfDateFormatter as a helper:\n$.views.helpers(\"wcfDate\", wcfDateFormatter);\n\nUsage:\n{^{datepicker wcfDateString dataFormat=~wcfDate /}}\n\nNote that the this pointer within parse or format is the datepicker tag instance, so it can be used to access tag properties etc. (e.g. this.tagCtx.props.someprop or this.widget.options.someoption).\n"
      },
      {
        "_type": "para",
        "title": "Custom datepicker tags",
        "text": "Custom datepicker tags\nYou can create your own flavor of datepicker which defaults to chosen dateFormat and dataFormat (for display format and underlying data format):\n$.views.tags({\n  myDatepicker: {\n    baseTag: \"datepicker\",\n    dataFormat: false, // Any falsey value\n    dateFormat: \"DD MM d, yy\"\n  },\n  myWcfDatepicker: {\n    baseTag: \"datepicker\",\n    dataFormat: wcfDateFormatter,\n    dateFormat: 'm-d-yy'\n  }\n);\n\nUsage:\n{^{myDatepicker date /}}\n{^{myWcfDatepicker wcfString/}}\n\nTo override the default settings for the regular {{datepicker}} tag, use:\n$.views.tags(\"datepicker\", {\n  baseTag: \"datepicker\",\n  dataFormat: ...\n  dateFormat: ...\n})\n\nUsage:\n{^{datepicker date /}}\n\n"
      },
      {
        "_type": "para",
        "title": "Using converters with {{datepicker}}",
        "text": "Using converters with {{datepicker}}\nConverters can be useful with the {{datepicker}} tag. For example, they can be used as an alternative to the “data formatter” pattern, to convert to and from a custom underlying data format. Or they can be used for adding a date or time shift to the displayed date. (This can be done in conjunction with any dataFormat including when using a “data formatter”):\n{^{datepicker wcfString ... convert=~wcfToJqui convertBack=~jquiToWcf /}}\n\n{^{myWcfDatepicker ... wcfString daysToAdd=delay convert=~addDays convertBack=~removeDays /}}\n\n// Converters for shifting date\nfunction addDays(val) {\n  var dt = this.dataFormat.parse(val); // 'this' is the tag instance\n  dt.setDate(dt.getDate() + this.tagCtx.props.daysToAdd);\n  return this.dataFormat.format(dt);\n}\n\nfunction removeDays(val) {\n  var dt = this.dataFormat.parse(val); // 'this' is the tag instance\n  dt.setDate(dt.getDate() - this.tagCtx.props.daysToAdd);\n  return this.dataFormat.format(dt);\n}\n\nThe following sample shows examples using data formatters and converters, and examples of custom datepicker tags:\n"
      },
      {
        "_type": "sample",
        "title": "Data formatters, converters and custom tag examples",
        "url": "samples/tag-controls/jqui/datepicker/date-formats/custom",
        "text": "Data formatters, converters and custom tag examples\nUsing a formatter to bind to a custom “date string” format:\n{^{datepicker wcfString dataFormat=~wcfDate /}}\n{^{datepicker wcfString dataFormat=~wcfDate dateFormat=\"DD MM d, yy\" /}}\n\nCustom datepickers:\n{^{myDatepicker date/}}\n{^{myDatepicker date dateFormat=\"mm-dd-yy (DD)\" /}}\n\n{^{myWcfDatepicker wcfString /}}\n{^{myWcfDatepicker wcfString dateFormat=\"DD mm/dd/yy\" /}}\n\nUsing converters\n{^{datepicker wcfString dateFormat=\"D M d, yy\"\n    convert=~fromWcfDate convertBack=~toWcfDate /}}\n\n{^{myWcfDatepicker wcfString dateFormat=\"D M d, yy\" ^daysToAdd=delay\n    convert=~addDays convertBack=~removeDays /}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also:\n\n{{timespinner}}\nwidget APIs\n\n"
      }
    ]
  },
  "samples/tag-controls/jqui/timespinner": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{timespinner}} is a derived {{spinner}} tag for showing time (hours and minutes).\nBy default it binds to underlying data of type Date. The default display shows time using the 24 hour clock (e.g. 13:30).\nIt can be used in conjunction with the {{datepicker}}:\n"
      },
      {
        "_type": "sample",
        "text": "\n  Time: {^{timespinner date /}}<br/><br/>\n  Date: {^{datepicker date elem=\"div\" dataFormat=false /}}<br/><br/>\n  Underlying data (date): <em>{^{:date}}</em>\n\n\n\n\"use strict\";\nvar pageTmpl = $.templates(\"#pageTmpl\");\nvar nextWeek = new Date();\nnextWeek.setDate(nextWeek.getDate()+7);\n\nvar model = {\n    date: nextWeek\n  };\n\npageTmpl.link(\"#page\", model);\nTime: {^{timespinner date /}}\n\nDate: {^{datepicker date elem=\"div\" dataFormat=false /}}\n\nUnderlying data (date):{^{:date}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Note that if the {{timespinner}} moves past 23:59 to 00:00, the {{datepicker}} moves to the next day… To make the {{timespinner}} stay on the same day, set:\n{{timespinner ... keepDay=true /}}\n\n"
      },
      {
        "_type": "para",
        "title": "Locale-specific time formatting: displayFormatter",
        "text": "Locale-specific time formatting: displayFormatter\nA built-in displayFormatter provides locale-specific formatting (by setting _culture to the desired locale), but for this to work, the 0.1.1 version of jQuery Globalize must be included:\n"
      },
      {
        "_type": "sample",
        "title": "Time formatting using globalize.js 0.1.1",
        "url": "samples/tag-controls/jqui/timespinner/globalize",
        "text": "Time formatting using globalize.js 0.1.1\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/globalize/0.1.1/globalize.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/globalize/0.1.1/cultures/globalize.culture.de-DE.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/globalize/0.1.1/cultures/globalize.culture.ja-JP.min.js\"></script>\n\n{^{timespinner date ^_culture=culture /}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Custom display formatters",
        "text": "Custom display formatters\nThe {{timespinner}} tag control lets you provide your own \"display formatter\" (an object with a parse and a format() method) – to provide conversion between Date and any string display you wish.\nIn particular, you can use your own display formatter to provide formatting based on culture, without depending on the Globalize 0.1.1 library.\nThe following sample uses moment.js for time formatting based on culture:\n"
      },
      {
        "_type": "sample",
        "title": "Custom display formatter using moment.js for culture/locale support",
        "url": "samples/tag-controls/jqui/timespinner/moment",
        "text": "Custom display formatter using moment.js for culture/locale support\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment.min.js\"></script>\n\n// Display formatter using moment.js:\n// Date to time string\nvar timeFormatter = {\n  parse: function(timeString, props) {\n    var format = props._culture === \"en-US\" ? \"h:mm A\" : \"HH:mm\";\n    return moment(timeString, format).toDate();\n  },\n  format: function(date, props) {\n    var format = props._culture === \"en-US\" ? \"h:mm A\" : \"HH:mm\";\n    return moment(date).format(format);\n  }\n};\n\nUsage:\n$.views.helpers({time: timeFormatter, ...});\n\n{^{timespinner date ^_culture=culture displayFormat=~time /}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Alternative data formats: binding to timestamp number",
        "text": "Alternative data formats: binding to timestamp number\nTo bind to a timestamp (tick count) number, simply set dataFormat=0:\n{^{timespinner dateNumber ^_culture=culture dataFormat=0 /}}\n\nor if using a different display formatter:\n{^{timespinner dateNumber ^_culture=culture displayFormat=~time dataFormat=0 /}}\n\n"
      },
      {
        "_type": "para",
        "title": "Alternative data formats: binding to a custom string",
        "text": "Alternative data formats: binding to a custom string\nTo bind to a custom string format for the underlying date, provide a \"data formatter\" (object with a parse() and a format() method), or provide converters, to convert between Date and the chosen string format.\nThe next sample shows the use of both a “data formatters” to create a timespinner bindng to underlying data of type number or string. It also shows the use of converters to shift the displayed date-time relative to the underlying data:\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/timespinner/dataformat",
        "text": "Binding to number:\n{^{datepicker dateNumber dataFormat=0 /}}\n{^{timespinner dateNumber dataFormat=0 ... /}}\n\nBinding to custom string\n{^{datepicker dateTimeString dataFormat=~fullDate /}}\n{^{timespinner dateTimeString dataFormat=~fullDate ... /}}\n\nBinding to a WCF date-time string\n{^{datepicker wcfString dataFormat=~wcfDate /}}\n{^{timespinner wcfString dataFormat=~wcfDate ... /}}\n\nUsing convert/convertBack to display date-time shifted by a delay\n{^{datepicker wcfString dataFormat=~wcfDate\n      convert=~add convertBack=~subtract ^delay=delay /}}\n{^{timespinner wcfString dataFormat=~wcfDate\n      convert=~add convertBack=~subtract ^delay=delay ... /}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Custom timespinner tags",
        "text": "Custom timespinner tags\nYou can create your own flavor of timespinner which defaults to a chosen displayFormat and/or dataFormat and/or default converters:\n$.views.tags({\n  myTimespinner: {\n    baseTag: \"timespinner\",\n    displayFormat: momentTimeFormatter,\n    dataFormat: momentCustomDateTime,\n    convert: addDays,\n    convertBack: subtractDays\n  }\n);\n\nUsage:\n{^{myTimespinner dateTimeString culture=\"en-US\" delay=48 /}}\n\nSee also:\n\nDatepicker date formats\nwidget APIs\n\n"
      }
    ]
  },
  "samples/tag-controls/jqui/spinner/formats": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The jQuery UI spinner includes support for displaying number using number or currency formats based on culture or locale. However this support depends on including the 0.1.1 version of jQuery Globalize.\n"
      },
      {
        "_type": "sample",
        "title": "Number and currency formats using globalize.js 0.1.1",
        "url": "samples/tag-controls/jqui/spinner/globalize",
        "text": "Number and currency formats using globalize.js 0.1.1\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/globalize/0.1.1/globalize.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/globalize/0.1.1/cultures/globalize.culture.de-DE.min.js\"></script>\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/globalize/0.1.1/cultures/globalize.culture.ja-JP.min.js\"></script>\n\n{^{spinner amount ^_culture=culture _numberFormat=\"C\" /}}\n\n{^{spinner amount ^_culture=culture _numberFormat=\"n\" /}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Custom display formatters",
        "text": "Custom display formatters\nThe {{spinner}} tag control lets you specify a “display formatter” (an object with a parse() and a format() method) – to provide conversion between the underlying number and any string display you wish.\nIn particular, you can use your own formatter to provide formatting based on culture, without depending on the Globalize 0.1.1 library.\n(Note that the this pointer within parse or format is the tag instance (in this case the spinner instance) so it can be used to access any tag properties.)\nThe following formatter uses accounting.js to provide culture-based number formatting:\nvar accountingCulture = {\n  \"de-DE\": {symbol: \"€\", thousand: \".\", decimal: \",\", format: \"%v %s\"},\n  \"en-US\": {symbol: \"$\", thousand: \",\", decimal: \".\"}\n};\n\nvar numberFormatter = {\n  parse: function(string, props) {\n    return accounting.unformat(\n      string,\n      accountingCulture[props._culture].decimal\n    );\n  },\n  format: function(number, props) {\n    return accounting.formatNumber(\n      number,\n      accountingCulture[props._culture]\n    );\n  }\n};\n\nUsage:\n$.views.helpers({number: numberFormatter, ...});\n\n{^{spinner amount ^_culture=culture displayFormat=~number /}}\n\nThe following sample uses accounting.js for currency and number formatting based on culture:\n"
      },
      {
        "_type": "sample",
        "title": "Custom display formatters using accounting.js for culture/locale support",
        "url": "samples/tag-controls/jqui/spinner/accounting",
        "text": "Custom display formatters using accounting.js for culture/locale support\n<script src=\"https://cdnjs.cloudflare.com/ajax/libs/accounting.js/0.4.1/accounting.js\"></script>\n\n{^{spinner amount ^_culture=culture displayFormat=~currency /}}\n\n{^{spinner amount ^_culture=culture displayFormat=~number /}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The same approach can be used for a time spinner with localized display format. The following sample uses moment.js for time formatting based on culture (but note that it is simpler and better to use the specific {{timespinner}}) tag):\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/spinner/moment",
        "text": "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.14.1/moment.min.js\"></script>\n\ntime: {\n  parse: function(string, props) {\n    var format = props._culture === \"en-US\" ? \"h:mm A\" : \"HH:mm\";\n    return +moment(string, format).toDate();\n  },\n  format: function(ticks, props) {\n    var format = props._culture === \"en-US\" ? \"h:mm A\" : \"HH:mm\";\n    return moment(ticks).format(format);\n  }\n}\n\n{^{spinner dateNumber ^_culture=culture ... displayFormat=~time /}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Using a data formatter, or converters, to bind to a custom underlying data format",
        "text": "Using a data formatter, or converters, to bind to a custom underlying data format\nBy default the underlying data format used by {{spinner}} is a number. However any underlying data format can be used by providing a corresponding “data formatter” (object with a parse() and a format() method), and setting the dataFormat to that formatter.\nThe next sample shows the use of both a “data formatter”, and converters, to create a timespinner bindng to underlying data of type Date (though this is can be done more simply using the {{timespinner}}) tag):\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/spinner/dataformat",
        "text": "// Data formatter: ticks to Date\nnumberToDate: {\n  parse: function(date, props) {\n    return +date;\n  },\n  format: function(ticks, props) {\n    return new Date(ticks);\n  }\n}\n\n{^{spinner date ^_culture=culture ... displayFormat=~time dataFormat=~dateToNumber /}}\n\n{^{spinner date ^_culture=culture ... displayFormat=~time convert=~toNumber convertBack=~toDate /}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "Custom spinner tags",
        "text": "Custom spinner tags\nYou can create your own flavor of spinner which defaults to a chosen displayFormat and dataFormat:\n$.views.tags({\n  myCurrencySpinner: {\n    baseTag: \"spinner\",\n    displayFormat: currencyFormatter\n  }\n);\n\nUsage:\n{^{myCurrencySpinner amount culture=culture /}}\n\nSee also: widget APIs\n"
      }
    ]
  },
  "samples/tag-controls/jqui/spinner/variants": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{spinner}} tag integrates the jQuery UI spinner widget (api).\nThis allows data-linking directly to widget properties, as well as using generic tag functionality such as convert and convertBack.\nIn addition, validation support is obtained, simply by wrapping a {{spinner}} tag with a {{validate}}.\nHere is a sample with three {{spinner}} controls, using alternate syntaxes: tag syntax or element-based data-link syntax:\n"
      },
      {
        "_type": "sample",
        "text": "Variants of the {{spinner}} tag:\n\n\n<h4>Tag syntax</h4>\n\n<pre>&lcub;^{spinner amount .../}&rcub;</pre>\n\n{^{spinner amount/}}\n\n<h4>Tag syntax, wrapping element:</h4>\n\n<pre>\n&lcub;^{spinner amount ...}&rcub;\n    &lt;input .../&gt;\n&lcub;^{/spinner}&rcub;\n</pre>\n\n{^{spinner amount}}\n  <input/>\n{{/spinner}}\n\n<h4>Element-based data-link syntax:</h4>\n\n<pre>\n&lt;input data-link=\"{spinner amount ...}\" /&gt;\n</pre>\n\n<input data-link=\"{spinner amount}\"/>\n\n<h4>Regular input tag without spinner:</h4>\n\n<input type=\"text\" data-link=\"{:amount:tonum}\" />\n\n\n\n\n\n\n\n$.views.converters({\n  tonum: function(val) {\n    return +val; // Convert string to number\n  }\n});\n\nvar pageTmpl = $.templates(\"#pageTmpl\"),\n  model = {\n    amount: 150\n  };\n\npageTmpl.link(\"#page\", model);\nMultiple examples of {{spinner}} syntax…\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The following sample is a declarative data-driven version of the jQuery UI Currency spinner demo.\nThe sample also shows the use of {{validate}} with the {{spinner}} tag. (Uncheck Enforce in-range amount, and move the slider left or right.)\nNote that the page includes the jQuery Globalize.js library version 0.1.1. It also includes the jQuery mousewheel plugin (which allows you to use the mousewheel to ‘spin’ the {{spinner}} control).\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/spinner/sample",
        "text": "{^{validate amount messagewrap=true ...}}\n\n  {^{spinner amount\n    ^_culture=currency\n    _numberFormat=\"C\"\n    ...\n  /}}\n\n{{/validate}}\n\n<select data-link=\"currency\" ...>\n  <option value=\"en-US\">US $</option>\n  ...\n</select>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  },
  "samples/editable/hash": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "This sample returns to the Data-linked tags sample, but uses a different data design, with the movies collection as a hash/dictionary, rather than an array.\nWe will use {{props}} to iterate over the collection.\nIn this version of the sample, we will also replace all button jQuery-based event binding with the declarative {on} data-link binding (both for top-level buttons, and within the template).\n"
      },
      {
        "_type": "sample",
        "url": "samples/editable-data/hash-dictionary/sample",
        "text": "Data: Movies collection as a hash/dictionary, rather than an array\nmovies = { // Hash/dictionary of movies\n  movJb: {\n    title:\"Meet Joe Black\",\n    ...\n  },\n  movEws: {\n    title:\"Eyes Wide Shut\",\n    ...\n  },\n\nIterate:\n<table>\n  ...\n  <tbody class=\"movies\">\n    {^{props}}\n      <tr...>\n        ...\n      </tr>\n    {{/props}}\n  </tbody>\n</table>\n\nDynamic display of details based on key selection (rather than index selection):\n<div class=\"detail\">\n  {^{for #data[~selectedKey]}}\n    ...\n  {{/for}}\n</div>\n\nEditing and selection actions for hash-based collection:\nhelpers: {\n  ...\n  select: function select(key, ev, eventArgs) {\n    eventArgs.view.ctxPrm(\"selectedKey\", key);\n  },\n  addMovie: function(ev, eventArgs) {\n    var newKey = \"mov\" + counter;\n    $.observable(movies).setProperty(\n      newKey,\n      {\n        title: \"NewTitle\" + counter,\n        ...\n      }\n    );\n    eventArgs.view.ctxPrm(\"selectedKey\", newKey);\n  },\n  removeMovie: function(key, ev, eventArgs) {\n    eventArgs.view.ctxPrm(\"selectedKey\", null);\n    $.observable(movies).removeProperty(key);\n    return false;\n  },\n  ...\n\nButton event binding using the {on} data-link binding:\n<table>\n  ...\n  <th ... data-link=\"{on ~addMovie}\">Add</th>\n  ...\n  <tbody class=\"movies\">\n    {^{props}}\n      <tr data-link=\"...{on ~select key}\">\n        ...\n        <td><span ... data-link=\"{on ~removeMovie key}\"></span></td>\n      </tr>\n    {{/props}}\n  </tbody>\n</table>\n\n<div class=\"detail\">\n  {^{for #data[~selectedKey]}}\n    ...\n  {{/for}}\n</div>\n\nTop-level button event binding\n<div class=\"buttons\">\n  <button data-link=\"{on showData}\">show data</button>\n  <button data-link=\"{on deleteLast}\">delete last language</button>\n</div>\n\n// Data-link top-level buttons\n$.link(true, \".buttons\", helpers);\n\n\n"
      }
    ]
  },
  "samples/tag-controls/spinblock": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Available from download/sample-tagcontrols.\nFor additional information about the {{spinblock}} control see the  Data binding design patterns – responding to user actions topic.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/spinblock/sample",
        "text": "This sample shows nested {{spinblock}} custom tags:\n{^{spinblock pawne=~state.outerSelect}}\n  ...\n  {^{spinblock pane=~state.innerSelect}}\n    ...\n  {{/spinblock}}\n{{else}}\n  ...\n{{/spinblock}}\n\nSee also the {{colorpicker}} sample, which is a composite tag which uses this {{spinblock}}.\n\n"
      }
    ]
  },
  "samples/tag-controls/colorpicker": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Available from download/sample-tagcontrols.\nFor additional information about the {{colorpicker}} control see the  Tag hierarchy design patterns – composite controls topic.\n"
      },
      {
        "_type": "sample",
        "title": "Colorpicker",
        "url": "samples/tag-controls/colorpicker/colorpicker",
        "text": "Colorpicker\nUsage\n{^{picker color.h color.s color.v color.a ... /}}\n\n<div ... data-link=\"css-background-color{rgba:color.h color.s color.v color.a}\">\n  {^{rgba:color.h color.s color.v color.a}} ...\n  {^{hex:color.h color.s color.v color.a}}\n</div>\n\n<div ...>\n  h: <input data-link=\"color.h\"/>\n  ...\n</div>\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The next two samples show variants of the {{colorpicker}} which take advantage of advanced use of converters, as discussed in the Tag hierarchy design patterns – converters topic.\n"
      },
      {
        "_type": "sample",
        "title": "Multi-format colorpicker",
        "url": "samples/tag-controls/colorpicker/colorpicker-multiformat",
        "text": "Multi-format colorpicker\nTag definition\n$.views.tags({\npicker: {\n  // Bind to HSVA color parameters and mode. Color parameters will be HSVA, RGBA or HEX, depending on mode\n  bindTo: [0, 1, 2, 3, \"mode\"],\n  linkedCtxParam: [\"h\", \"s\", \"v\", \"a\", undefined],\n  ...\n\nUsage\nDefault mode: HSVA format – binding to color1 data:\n{^{picker color1.h color1.s color1.v color1.a ... /}}\n...\nh: <input data-link=\"color1.h\"/>\n...\n\nAlternative RGBA format – mode set to \"rgba\" – binding to color2 data:\n{^{picker color2.r color2.g color2.b color2.a mode=\"rgba\" ... /}}\n...\nr: <input data-link=\"color2.r\"/>\n...\n\nAlternative HEX format – mode set to \"hex\" – binding to color3 data:\n{^{picker color3.hex mode=\"hex\" ... /}}\n...\nhex: <input data-link=\"color3.hex\"/>\n...\n\n\n"
      },
      {
        "_type": "sample",
        "title": "Multi-format colorpicker using bindTo and bindFrom options",
        "url": "samples/tag-controls/colorpicker/colorpicker-multiformat2",
        "text": "Multi-format colorpicker using bindTo and bindFrom options\nTag definition\n$.views.tags({\npicker: {\n  // Bind to HSVA color parameters and mode. Color parameters will be HSVA, RGBA or HEX, depending on mode\n  bindTo: [0, 1, 2, 3],\n  bindFrom: [0, 1, 2, 3, \"mode\"],\n  linkedCtxParam: [\"h\", \"s\", \"v\", \"a\", undefined],\n  ...\n\n\n"
      }
    ]
  },
  "samples/tag-controls/areaslider": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Available from download/sample-tagcontrols.\nFor additional information about the {{areaslider}} control see the  Data binding design patterns – multiple two-way binding topic.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/areaslider/sample",
        "text": "This sample shows two JsViews {{areaslider}} custom tags, bound to the same underlying (x, y)data, but with different range settings (‘xMin’ etc.):\n{^{areaslider x y xMin=0 xMax=100 .../}}\n{^{areaslider x y xMin=100 xMax=0 .../}}\n\nThe {{areaslider}} is a two-dimensional version of the {{slider}} tag.\nSee also the {{colorpicker}} sample, which is a composite tag which uses this {{areaslider}}.\n\n"
      }
    ]
  },
  "samples/tag-controls/slider": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Available from download/sample-tagcontrols.\nFor additional information about the {{slider}} control see the  Data binding design patterns – programmatic two-way binding topic.\n"
      },
      {
        "_type": "sample",
        "url": "samples/tag-controls/slider/sample",
        "text": "This sample shows a JsViews {{slider}} custom tag:\n{^{slider amount min=360 max=0 .../}}\n\nSee also the {{colorpicker}} sample, which is a composite tag which uses this {{slider}}.\n\n"
      }
    ]
  },
  "features": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "samples/sort-filter": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The {{for}} and {{props}} tags provide built-in support for sorting and filtering.\nThe following sample uses the {{for}} tag in JsRender to  render a ‘purchases grid’ (with running totals), and applies various sorting and filtering options.\n(See also the discussion here, in the Extending {{for}} sample topic.)\n"
      },
      {
        "_type": "sample",
        "title": "JsRender: Using the {{for}} tag to provide a 'purchases' grid, with running totals...",
        "url": "samples/jsrender/tags/extend-for/sample-for",
        "text": "JsRender: Using the {{for}} tag to provide a 'purchases' grid, with running totals...\nProvide category filter helper and running total helper:\n$.views.helpers({\n  category: function(item, index, items) { // Helper for category filter\n    var str = this.props.category;     // Filter for items whose item.category contains the tagCtx.props.category string\n    return str ? item.category.toLowerCase().indexOf(str.toLowerCase()) !== -1 : true;\n  },\n\n  total: function(expr) {              // Helper for running total: ~total(expression)\n    var tmpl = $.templates[expr]       // Get named compiled template for expression, or else...\n                || $.templates(expr, \"{{:\" + expr + \"}}\"), // ...if this is first call, create it\n\n      runningTotal = 0,\n      view = this,                     // The content view of the ~total(...) helper call\n      items = view.get(\"array\").data,\n      rowIndex = view.getIndex();\n\n    for (var i = 0; i <= rowIndex; i++) {\n      runningTotal += +tmpl(items[i]); // Compute running total up to this row, using render function\n    }                                  // of compiled tmpl (either tmpl() or tmpl.render()...)\n    return runningTotal;               // Return value from ~total(...)\n  }\n});\n\nTag usage:\n{{for lineItems sort=\"price\" reverse=true filter=~category category=\"book\"}}\n  ...{{:~total('quantity*price')}}...\n{{else}}\n  ...No items...\n{{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "The next sample develops the above ‘purchases grid’ example further, as a JsViews data-linked sample.\nNow we have a fully dynamic grid that lets the user click on column headers to change the sort order, and click in cells (for data columns: ‘category’, ‘quantity’ and ‘price’) to modify the data. In addition, the Category header provides a textbox for filtering items based on category.\nThe calculated ‘amount’ and running total columns automatically update too:\n"
      },
      {
        "_type": "sample",
        "title": "JsViews: Using the {^{for}} tag to provide a dynamic 'purchases' grid control...",
        "url": "samples/tag-controls/purchases/sample-for",
        "text": "JsViews: Using the {^{for}} tag to provide a dynamic 'purchases' grid control...\nSet ~total() and ~category dependencies to refresh when appropriate:\n// Trigger refreshed filtering when filter string provided by the user changes\n$.views.helpers.category.depends = \"~cat\";\n\n// Trigger recalculation of total when any item property changes, or when row index changes (e.g. on changing sort)\n$.views.helpers.total.depends = [\"#parent.data.[]^*\", \"#index\"];\n\nProvide editable text boxes on data columns:\n{^{for lineItems sort=~sortBy reverse=~reverseSort filter=~category}}\n  ...\n  <td><input data-link=\"category\" .../></td>\n  ...\n  <td data-link=\"{:~total('quantity * price')}\"></td>\n  ...\n{{else}}\n  ...No items...\n{{/for}}\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Next we will show an equivalent ‘purchases’ grid view sample using a custom {{purchases}} tag, extending the {{for}} tag, and incorporating the specific filtering and ‘running total’ helpers.\nThis follows the same pattern we followed for JsRender in the Extending the {{for}} tag sample, where we created a custom {{purchases}} tag derived from {{for}}. But here our {{purchases}} tag will be a custom tag control that uses data-linking and is fully interactive as precursor {{grid}} control:\n"
      },
      {
        "_type": "sample",
        "title": "JsViews: A custom {^{purchases}} tag, as dynamic 'purchases' grid control...",
        "url": "samples/tag-controls/purchases/sample-tag",
        "text": "JsViews: A custom {^{purchases}} tag, as dynamic 'purchases' grid control...\nEncapsulated tag declaration. (Could be in a separate purchasesTag.js file):\n$.views.tags(\"purchases\", {\n  baseTag: \"for\",            // Inherit from the {{for}} tag\n  init: function(tagCtx) {   // Override init()\n    // Set the tagCtx.props.filter function\n    tagCtx.props.filter = function(item, index, items) {\n      ...\n    };\n\n    // Set the ~total() helper function\n    this.ctx.total = function(expr) {\n      ...\n    };\n\n    // Recalculate total when any item property changes, or when row index changes (e.g. on changing sort)\n    this.ctx.total.depends = [\"#parent.data.[]^*\", \"#index\"];\n\n    // Add \"category\" to the mapProps array, to trigger refreshed filtering when tagCtx.props.category changes\n    this.mapProps = this.mapProps.concat(\"category\"); // Make copy of prototype.mapProps with \"category\" added\n\n    this.baseApply(arguments); // Call base init()\n  }\n});\n\nTag usage:\n{^{purchases lineItems sort=~sortBy reverse=~reverseSort category=~cat...}}\n  ...\n  <td><input data-link=\"category\" .../></td>\n  ...\n  <td data-link=\"{:~total('quantity * price')}\"></td>\n  ...\n{{else}}\n  ...No items...\n{{/purchases}}\n\n\n"
      }
    ]
  },
  "samples/tag-controls/jqui/slider/range": {
    "sections": [
      {
        "_type": "sample",
        "url": "samples/tag-controls/jqui/slider/range/sample",
        "text": "Set the _range=true and the slider will have two handles binding to the first and second arguments (in this case, minAge and maxAge…):\n{^{slider minAge maxAge _range=true ... /}}\n\nSee JQuery UI ‘range’ slider.\nIn this sample we use the minAge and maxAge to dynamically filter a list of people:\n{^{for people filter=~flt depends=~fltDeps}}\n  <li>{{:name}} (age: {{:age}})</li>\n{{/for}}\n\nWe provide the filter function, ~flt and the dependency paths, ~fltDeps, as helpers, to filter based on age:\n  helpers = {\n    flt: function(item, index, items) { // Filter people based on age\n      return item.age > data.minAge && item.age < data.maxAge;\n    },\n    fltDeps: [\"minAge\", \"maxAge\"] // Make {^{people ... depends=~fltDeps ...}} update when minAge or maxAge changes\n  };\n\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "See also: widget APIs\n"
      }
    ]
  }
}