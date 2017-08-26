var content = $.views.documentation.content;

content.download = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/download")) ||
{
  "download": {
    "title": "JsRender and JsViews Downloads",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsRender <span>(jsrender.js) &ndash; rendering templates in the browser</span></div>\n\n***Latest version*** *(To download, right-click and select \"Save as...\" from the menu):*\n- *Uncompressed (for development):* <a href=\"https://www.jsviews.com/download/jsrender.js\">jsrender.js</a>\n- *Compressed (for production):* <a href=\"https://www.jsviews.com/download/jsrender.min.js\">jsrender.min.js</a>. (Source map available <a href=\"https://www.jsviews.com/download/jsrender.min.js.map\">here</a>)\n\n\n*JsRender is also available:*\n- on CDN at [cdnjs.com/libraries/jsrender](https://cdnjs.com/libraries/jsrender)\n- using [Bower](http://bower.io/search/?q=jsrender) to install on the file system: `$ bower install jsrender`\n\n*Example HTML pages:*\n- [Page loading JsRender with jQuery](#download/pages-jsr-jq)\n- [Page loading JsRender without jQuery](#download/pages-jsr)\n\n*See:*\n[JsRender Quickstart](#jsr-quickstart)\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsViews <span>(jsviews.js) &ndash; templates with data-binding</span></div>\n\n***Latest version*** *(To download, right-click and select \"Save as...\" from the menu):*\n- *Uncompressed (for development):* <a href=\"https://www.jsviews.com/download/jsviews.js\">jsviews.js</a>\n- *Compressed (for production):* <a href=\"https://www.jsviews.com/download/jsviews.min.js\">jsviews.min.js</a>. (Source map available <a href=\"https://www.jsviews.com/download/jsviews.min.js.map\">here</a>)\n\n*JsViews is also available:*\n- on CDN at [cdnjs.com/libraries/jsviews](https://cdnjs.com/libraries/jsviews)\n- using [Bower](http://bower.io/search/?q=jsviews) to install on the file system: `$ bower install jsviews`\n\n*Example HTML page:*\n- [Page loading JsViews](#download/pages-jsv)\n\n*See:* [JsViews Quickstart](#jsv-quickstart)\n\n(Note that *jsviews.js* includes all of *jsrender.js* code -- so *jsrender.js* does not need to be loaded first.)"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">Additional scenarios:</div>\n"
      },
      {
        "_type": "para",
        "title": "JsRender for Node.js &ndash; rendering templates on the server",
        "text": "A specific Node.js version of JsRender can be installed from <a href=\"https://www.npmjs.com/package/jsrender\">npm</a>, using:\n\n```js\n$ npm install jsrender\n```\n\nand then loaded in script using:\n\n```js\nvar jsrender = require('jsrender');\n```\n\nNow call regular JsRender APIs, such as:\n\n```js\nvar tmpl = jsrender.templates('Name: {{:name}}<br/>'); // Compile template from string\n\nvar html = tmpl.render({name: \"Jim\"}); // Render\n```\n\nThis Node.js version of JsRender provides the complete set of JsRender APIs and features, together with integration with view-engines such as <em>Express</em> and <em>Hapi</em>, APIs for loading templates from the file system, and integration with <em>Browserify</em> for bundling server-side templates into client scripts for the browser.\n\n*See:* [JsRender Node.js Quickstart](#jsr-node-quickstart)."
      },
      {
        "_type": "para",
        "title": "Loading JsViews as separate files",
        "text": "Instead of loading JsViews as a single file (*jsviews.js*), it can be loaded as three separate files: *jsrender.js* (providing templated rendering), *jquery.observable.js* (for observable data) and *jquery.views.js* (data-binding).\n\nThis can be useful in some scenarios. For example, if JsRender has already been loaded (by other components, for example) then full JsViews functionality may be added by loading only the additional *jquery.observable.js* and *jquery.views.js* files (rather than the complete composite file, *jsviews.js*).\n\n***Latest version*** *(To download, right-click and select \"Save as...\" from the menu):*\n- *Uncompressed (for development):* <a href=\"https://www.jsviews.com/download/jquery.observable.js\">jquery.observable.js</a> and <a href=\"https://www.jsviews.com/download/jquery.views.js\">jquery.views.js</a>\n- *Compressed (for production):* <a href=\"https://www.jsviews.com/download/jquery.observable.min.js\">jquery.observable.min.js</a> and <a href=\"https://www.jsviews.com/download/jquery.views.min.js\">jquery.views.min.js</a>. (Source maps available <a href=\"https://www.jsviews.com/download/jquery.views.min.js.map\">here</a> and <a href=\"https://www.jsviews.com/download/jquery.observable.min.js.map\">here</a>)\n\n*jquery.observable.js and jquery.views.js are also available:*\n- on CDN at [cdnjs.com/libraries/jsviews](https://cdnjs.com/libraries/jsviews)\n- using [Bower](http://bower.io/search/?q=jsviews) to install on the file system: `$ bower install jsviews`\n\n*Example HTML page:*\n- [Page loading JsViews as separate files](#download/pages-jsv@separate)\n\n*See:* [JsViews Quickstart](#jsv-quickstart)"
      },
      {
        "_type": "para",
        "title": "CDN delivery",
        "text": "JsRender and JsViews are available on the ***[cdnjs](https://cdnjs.com)*** CDN at:\n\n- [cdnjs.com/libraries/jsrender](https://cdnjs.com/libraries/jsrender)\n- [cdnjs.com/libraries/jsviews](https://cdnjs.com/libraries/jsviews)"
      }
    ]
  },
  "download/specific": {
    "title": "JsRender, JsViews and JsObservable Downloads",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "download",
            "label": "Latest versions"
          }
        ]
      },
      {
        "_type": "para",
        "title": "",
        "text": "<h3>Specific named versions:</h3>\n\n(These links will continue to point to the specific version, even after subsequent new releases).\n\n<em>To download these files, right-click and select \"Save as...\" from the menu.</em>\n\n<div class=\"title\">JsRender beta</div>\n\n<em>Status: JsRender is currently beta. V1.0 is planned to be available right after JsViews official beta release is complete.</em>\n\nUncompressed (for development): <a href=\"https://www.jsviews.com/download/jsrender-v1.0.0-beta.js\">jsrender-v1.0.0-beta.js</a>.<br/>Compressed (for production): <a href=\"https://www.jsviews.com/download/jsrender-v1.0.0-beta.min.js\">jsrender-v1.0.0-beta.min.js</a>. (Source map available <a href=\"https://www.jsviews.com/download/jsrender-v1.0.0-beta.min.js.map\">here</a>).\n\n<div class=\"title\">JsViews pre beta</div>\n\n<em>Status: JsViews is currently a beta candidate. It will be officially labelled \"beta\" as soon as reasonably complete documentation for the JsViews and JsObservable APIs has been made available on this site. (Coming soon...)</em>\n\n<b>Single file version </b><em>(includes JsRender, JsObservable and JsViews)</em>\n\nUncompressed (for development): <a href=\"https://www.jsviews.com/download/jsviews-v1.0.0-alpha.js\">jsviews-v1.0.0-alpha.js</a>.<br/>Compressed (for production): <a href=\"https://www.jsviews.com/download/jsviews-v1.0.0-alpha.min.js\">jsviews-v1.0.0-alpha.min.js</a>. (Source map available <a href=\"https://www.jsviews.com/download/jsviews-v1.0.0-alpha.min.js.map\">here</a>).\n\n<b>Separate files </b><em>(to be used with jsrender.js)</em>\n\nUncompressed (for development): <a href=\"https://www.jsviews.com/download/jquery.views-v1.0.0-alpha.js\">jquery.views-v1.0.0-alpha.js</a>.<br/>Compressed (for production): <a href=\"https://www.jsviews.com/download/jquery.views-v1.0.0-alpha.min.js\">jquery.views-v1.0.0-alpha.min.js</a>. (Source map available <a href=\"https://www.jsviews.com/download/jquery.views-v1.0.0-alpha.min.js.map\">here</a>).\n\nUncompressed (for development): <a href=\"https://www.jsviews.com/download/jquery.observable-v1.0.0-alpha.js\">jquery.observable-v1.0.0-alpha.js</a>.<br/>Compressed (for production): <a href=\"https://www.jsviews.com/download/jquery.observable-v1.0.0-alpha.min.js\">jquery.observable-v1.0.0-alpha.min.js</a>. (Source map available <a href=\"https://www.jsviews.com/download/jquery.observable-v1.0.0-alpha.min.js.map\">here</a>)."
      }
    ]
  },
  "download/sample-tagcontrols": {
    "title": "Sample tag controls &ndash; plugin libraries",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following tag controls, used in some of the samples, can be a starting point for your own custom tag controls. Some are very rudimentary, others are more advanced and complete. \n\n**Note:** If you use these controls in your own applications, it is recommended to download the files, or copy the code, rather than loading directly from this location, since the implementations (and associated APIs) may change over time as new versions of the samples are introduced.\n\n*(To download, right-click and select “Save as…” from the menu.)*\n\n- **{^{tabs/}}**\n  - *Download:* [tabs.js](https://www.jsviews.com/download/sample-tag-controls/tabs/tabs.js)\n(*Compressed:* [tabs.min.js](https://www.jsviews.com/download/sample-tag-controls/tabs/tabs.min.js). *Source map [here](https://www.jsviews.com/download/sample-tag-controls/tabs/tabs.min.js.map)*)\n<br/>Used in the [tabs](#samples/tag-controls/tabs) sample\n- **{^{tree/}}**\n  - *Download:* [tree-if.js](https://www.jsviews.com/download/sample-tag-controls/treeview/tree-if.js)\n(*Compressed:* [tree-if.min.js](https://www.jsviews.com/download/sample-tag-controls/treeview/tree-if.min.js). *Source map [here](https://www.jsviews.com/download/sample-tag-controls/treeview/tree-if.min.js.map)*)\n<br/>Used in the [tree (if-binding)](#samples/tag-controls/tree/if-binding) sample\n  - *Download:* [tree-visible.js](https://www.jsviews.com/download/sample-tag-controls/treeview/tree-visible.js)\n(*Compressed:* [tree-visible.min.js](https://www.jsviews.com/download/sample-tag-controls/treeview/tree-visible.min.js). *Source map [here](https://www.jsviews.com/download/sample-tag-controls/treeview/tree-visible.min.js.map)*)\n<br/>Used in the [tree (visible-binding)](#samples/tag-controls/tree/visible-binding) sample\n- **{^{textbox/}}**\n  - *Download:* [simple-textbox.js](https://www.jsviews.com/download/sample-tag-controls/textbox/simple-textbox.js)\n(*Compressed:* [simple-textbox.min.js](https://www.jsviews.com/download/sample-tag-controls/textbox/simple-textbox.min.js). *Source map [here](https://www.jsviews.com/download/sample-tag-controls/textbox/simple-textbox.min.js.map)*)\n<br/>Used in the [simple textbox](#samples/tag-controls/simple-textbox) sample\n- **{^{validate/}}** and **{^{validation/}}** \n  - *Download:* [validate.js](https://www.jsviews.com/download/sample-tag-controls/validate/validate.js)\n(*Compressed:* [validate.min.js](https://www.jsviews.com/download/sample-tag-controls/validate/validate.min.js). *Source map [here](https://www.jsviews.com/download/sample-tag-controls/validate/validate.min.js.map)*)\n<br/>Used in the\n    [datepicker with validation](#samples/tag-controls/jqui/datepicker/with-validation),\n    [datepicker with validation wizard](#samples/tag-controls/jqui/datepicker/with-validation-wizard),\n    [slider with validation](#samples/tag-controls/jqui/slider/with-validation),<br/>\n    [validate simple](#samples/tag-controls/validate/simple)\n    and the [validate tag control](#samples/tag-controls/validate) samples\n- **{^{range/}}**\n  - *Download:* [range.js](https://www.jsviews.com/download/sample-tag-controls/range/range.js)\n(*Compressed:* [range.min.js](https://www.jsviews.com/download/sample-tag-controls/range/range.min.js). *Source map [here](https://www.jsviews.com/download/sample-tag-controls/range/range.min.js.map)*)\n<br/>Used in the\n    [extending for](#samples/jsr/tags/extend-for) JsRender sample and the [range](#samples/tag-controls/range) JsViews sample\n- **{^{jsonview/}}**\n  - *Download:* [jsonview.js](https://www.jsviews.com/download/sample-tag-controls/jsonview/jsonview.js)\n(*Compressed:* [jsonview.min.js](https://www.jsviews.com/download/sample-tag-controls/jsonview/jsonview.min.js). *Source map [here](https://www.jsviews.com/download/sample-tag-controls/jsonview/jsonview.min.js.map)*)\n<br/>Used in the [jsonview](#samples/tag-controls/jsonview) JsViews sample\n\nTo use the above tag controls simply include the corresponding libraries for your chosen tags, after loading *JsViews*:\n\n```jsr\n...\n<script src=\"//code.jquery.com/jquery-1.12.4.js\"></script>\n...\n<script src=\"//www.jsviews.com/download/jsviews.js\"></script>\n<script src=\"//www.jsviews.com/download/range.js\"></script>\n<script src=\"//www.jsviews.com/download/validate.js\"></script>\n...\n```\n\n"
      }
    ]
  },
  "download/pages": {
    "title": "Example HTML pages &ndash; loading JsRender or JsViews ",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "download/pages-jsr-jq",
            "label": "JsRender with jQuery"
          },
          {
            "hash": "download/pages-jsr",
            "label": "JsRender without jQuery"
          },
          {
            "hash": "download/pages-jsv",
            "label": "JsViews"
          }
        ]
      }
    ]
  },
  "download/pages-jsr-jq": {
    "filter": "jsr",
    "title": "Loading JsRender with jQuery",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Example HTML page, using latest version of JsRender from www.jsviews.com",
        "text": "```jsr\n<!DOCTYPE html>\n<html>\n<head>\n  <!-- Load jQuery -->\n  <script src=\"//code.jquery.com/jquery-1.12.4.js\"></script>\n\n  <!-- Load JsRender latest version, from www.jsviews.com: -->\n  <script src=\"//www.jsviews.com/download/jsrender.js\"></script>\n</head>\n<body>\n  <!-- Provide container for rendered template output: -->\n  <div id=\"result\"></div>\n\n  <!-- Declare a JsRender template, in a script block: -->\n  <script id=\"myTmpl\" type=\"text/x-jsrender\">{{:name}}</script>\n\n  <script>\n    var tmpl = $.templates(\"#myTmpl\"); // Get compiled template\n    var data = {name: \"Jo\"};           // Define data\n    var html = tmpl.render(data);      // Render template using data - as HTML string\n    $(\"#result\").html(html);           // Insert HTML string into DOM\n  </script>\n</body>\n</html>\n```",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "Alternatives: replace the JsRender &lt;script&gt; tag above by one of the following:",
        "text": "*Using latest version, minified, from www.jsviews.com:*\n\n```jsr\n<script src=\"//www.jsviews.com/download/jsrender.min.js\"></script>\n```\n\n*Using specific version from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.88/jsrender.js\"></script>\n```\n\n*Using specific version, minified, from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.88/jsrender.min.js\"></script>\n```\n\n*Loading from the file system after* [Bower](http://bower.io/search/?q=jsrender) *install:*\n\n-- Install JsRender on local file system, using `$ bower install jsrender`<br/>-- then load `jsrender.js` or `jsrender.min.js` from the `bower_components/jsrender/` folder, as in:\n\n```jsr\n<script src=\"bower_components/jsrender/jsrender.js\"></script>\n```"
      }
    ]
  },
  "download/pages-jsr": {
    "filter": "jsr",
    "title": "Loading JsRender without jQuery",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Example HTML page, using latest version of JsRender from www.jsviews.com",
        "text": "```jsr\n<!DOCTYPE html>\n<html>\n<head>\n  <!-- Load JsRender latest version, from www.jsviews.com: -->\n  <script src=\"//www.jsviews.com/download/jsrender.js\"></script>\n</head>\n<body>\n  <!-- Provide container for rendered template output: -->\n  <div id=\"result\"></div>\n\n  <!-- Declare a JsRender template, in a script block: -->\n  <script id=\"myTmpl\" type=\"text/x-jsrender\">{{:name}}</script>\n\n  <script>\n    var $ = window.jsrender;                                  // JsRender namespace, used instead of jQuery object \n    var markup = document.getElementById(\"myTmpl\").innerHTML; // Get template markup from script block contents\n    var tmpl = $.templates(markup);                           // Compile template from markup string\n    var data = {name: \"Jo\"};                                  // Define data\n    var html = tmpl.render(data);                             // Render template using data - as HTML string\n    document.getElementById(\"result\").innerHTML = html;       // Insert HTML string into DOM\n  </script>\n</body>\n</html>\n```",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "Alternatives: replace the JsRender &lt;script&gt; tag above by one of the following:",
        "text": "*Using latest version, minified, from www.jsviews.com:*\n\n```jsr\n<script src=\"//www.jsviews.com/download/jsrender.min.js\"></script>\n```\n\n*Using specific version from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.88/jsrender.js\"></script>\n```\n\n*Using specific version, minified, from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.88/jsrender.min.js\"></script>\n```\n\n*Loading from the file system after* [Bower](http://bower.io/search/?q=jsrender) *install:*\n\n-- Install JsRender on local file system, using `$ bower install jsrender`<br/>-- then load `jsrender.js` or `jsrender.min.js` from the `bower_components/jsrender/` folder, as in:\n\n```jsr\n<script src=\"bower_components/jsrender/jsrender.js\"></script>\n```"
      }
    ]
  },
  "download/pages-jsv": {
    "filter": "jsv",
    "title": "Loading JsViews",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Example HTML page, loading latest version of JsViews from www.jsviews.com",
        "text": "```jsr\n<!DOCTYPE html>\n<html>\n<head>\n  <!-- Load jQuery -->\n  <script src=\"//code.jquery.com/jquery-1.12.4.js\"></script>\n\n  <!-- Load JsViews latest version, from www.jsviews.com: -->\n  <script src=\"//www.jsviews.com/download/jsviews.js\"></script>\n</head>\n<body>\n  <!-- Provide container for rendered template output: -->\n  <div id=\"result\"></div>\n\n  <!-- Declare a JsRender template, in a script block: -->\n  <script id=\"myTmpl\" type=\"text/x-jsrender\">\n    <input data-link=\"name\" />\n    {^{:name}}\n  </script>\n\n  <script>\n    var tmpl = $.templates(\"#myTmpl\"); // Get compiled template\n    var data = {name: \"Jo\"};           // Define data\n    tmpl.link(\"#result\", data);        // Render and data-link template as content of chosen container element\n  </script>\n</body>\n</html>\n```",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "Alternatives: replace the JsViews &lt;script&gt; tag above by one of the following:",
        "text": "*Using latest version, minified, from www.jsviews.com:*\n\n```jsr\n<script src=\"//www.jsviews.com/download/jsviews.min.js\"></script>\n```\n\n*Using specific version from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.88/jsviews.js\"></script>\n```\n\n*Using specific version, minified, from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.88/jsviews.min.js\"></script>\n```\n\n*Loading from the file system after* [Bower](http://bower.io/search/?q=jsviews) *install:*\n\n-- Install JsViews on local file system, using `$ bower install jsviews`<br/>-- then load `jsviews.js` or `jsviews.min.js` from the `bower_components/jsviews/` folder, as in:\n\n```jsr\n<script src=\"bower_components/jsviews/jsviews.js\"></script>\n```"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsViews &ndash; separate files</div>\n\nUsually JsViews as a single file (*jsviews.js*), as in the example HTML page above.\n\nHowever it can be loaded as three separate files: *jsrender.js* (templated rendering), *jquery.observable.js* (observable data) and *jquery.views.js* (data-binding) -- as follows:\n"
      },
      {
        "_type": "para",
        "title": "Example HTML page, loading JsViews as separate files",
        "text": "```jsr\n<!DOCTYPE html>\n<html>\n<head>\n  <!-- Load jQuery -->\n  <script src=\"//code.jquery.com/jquery-1.12.4.js\"></script>\n\n  <!-- Load JsViews latest version, from www.jsviews.com, as separate component files: -->\n  <script src=\"//www.jsviews.com/download/jsrender.js\"></script>\n  <script src=\"//www.jsviews.com/download/jquery.observable.js\"></script>\n  <script src=\"//www.jsviews.com/download/jquery.views.js\"></script>\n</head>\n<body>\n  <!-- Provide container for rendered template output: -->\n  <div id=\"result\"></div>\n\n  <!-- Declare a JsRender template, in a script block: -->\n  <script id=\"myTmpl\" type=\"text/x-jsrender\">\n    <input data-link=\"name\" />\n    {^{:name}}\n  </script>\n\n  <script>\n    var tmpl = $.templates(\"#myTmpl\"); // Get compiled template\n    var data = {name: \"Jo\"};           // Define data\n    tmpl.link(\"#result\", data);        // Render and data-link template as content of chosen container element\n  </script>\n</body>\n</html>\n```",
        "anchor": "separate"
      },
      {
        "_type": "para",
        "title": "Alternatives: replace the three JsViews &lt;script&gt; tags above by one of the following:",
        "text": "*Using latest version, minified, from www.jsviews.com:*\n\n```jsr\n<script src=\"//www.jsviews.com/download/jsrender.min.js\"></script>\n<script src=\"//www.jsviews.com/download/jquery.observable.min.js\"></script>\n<script src=\"//www.jsviews.com/download/jquery.views.min.js\"></script>\n```\n\n*Using specific version from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.88/jsrender.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.88/jquery.observable.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.88/jquery.views.js\"></script>\n```\n\n*Using specific version, minified, from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.88/jsrender.min.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.88/jquery.observable.min.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.88/jquery.views.min.js\"></script>\n```\n\n*Loading from the file system after* [Bower](http://bower.io/search/?q=jsviews) *install:*\n\n-- Install JsViews on local file system, using `$ bower install jsviews`<br/>-- then load the correspondins `.js` or `.min.js` files from the `bower_components/jsviews/` folder, as in:\n\n```jsr\n<script src=\"bower_components/jsviews/jsrender.js\"></script>\n<script src=\"bower_components/jsviews/jquery.observable.js\"></script>\n<script src=\"bower_components/jsviews/jquery.views.js\"></script>\n```"
      }
    ]
  },
  "download/jqueryui-tagcontrols": {
    "filter": "jsv",
    "title": "jQuery UI tag controls library",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The *jQuery UI tag controls library: __jsviews-jqueryui-widgets.js__* is a set of tag controls based on jQuery UI widgets."
      },
      {
        "_type": "para",
        "title": "Download:",
        "text": "*Uncompressed (for development):* <a href=\"https://www.jsviews.com/download/sample-tag-controls/jsviews-jqueryui-widgets.js\">jsviews-jqueryui-widgets.js</a><br/>\n*Compressed (for production):* <a href=\"https://www.jsviews.com/download/sample-tag-controls/jsviews-jqueryui-widgets.min.js\">jsviews-jqueryui-widgets.min.js</a>. (Source map available <a href=\"https://www.jsviews.com/download/sample-tag-controls/jsviews-jqueryui-widgets.min.js.map\">here</a>)\n\n*(To download, right-click and select “Save as…” from the menu.)*"
      },
      {
        "_type": "para",
        "title": "Tag controls:",
        "text": "The library provides the following tag controls (each integrating the corresponding jQuery UI widget):<br/>\n\n- *__{{autocomplete/}}__* -- based on [jQuery UI autocomplete](https://jqueryui.com/autocomplete/)\n([api](https://api.jqueryui.com/autocomplete/))\n  - used in the [autocomplete](#samples/tag-controls/jqui/autocomplete) sample\n- *__{{accordion/}}__* -- based on [jQuery UI accordion](https://jqueryui.com/accordion/)\n([api](https://api.jqueryui.com/accordion/))\n  - used in the [accordion](#samples/tag-controls/jqui/accordion) samples\n- *__{{button/}}__* -- based on [jQuery UI button](https://jqueryui.com/button/)\n([api](https://api.jqueryui.com/button/))\n  - used in the [Toolbar](#samples/tag-controls/jqui/toolbar)\nand [progressbar](#samples/tag-controls/jqui/progressbar) samples\n- *__{{checkbox/}}__* -- based on [jQuery UI checkboxradio](https://jqueryui.com/checkboxradio/)\n([api](https://api.jqueryui.com/checkboxradio/))\n(requires jQuery UI version 1.12.1 or later)\n  - used in the [Toolbar](#samples/tag-controls/jqui/toolbar)\nand [Accessing widget APIs](#samples/tag-controls/jqui/api@widgetapi) samples\n- *__{{radio/}}__* -- based on [jQuery UI checkboxradio](https://jqueryui.com/checkboxradio/)\n([api](https://api.jqueryui.com/checkboxradio/))\n(requires jQuery UI version 1.12.1 or later)\n  - used in the [Toolbar](#samples/tag-controls/jqui/toolbar) sample\n- *__{{controlgroup/}}__* -- based on [jQuery UI controlgroup](https://jqueryui.com/controlgroup/)\n([api](https://api.jqueryui.com/controlgroup/))\n(requires jQuery UI version 1.12.1 or later)\n  - used in the [Toolbar](#samples/tag-controls/jqui/toolbar) sample\n- *__{{buttonset}}__* -- *deprecated and available only if using jQuery UI 1.11.4*\n- *__{{datepicker/}}__* -- based on [jQuery UI datepicker](https://jqueryui.com/datepicker/)\n([api](https://api.jqueryui.com/datepicker/))\n  - used in the [simple datepicker](#samples/tag-controls/jqui/datepicker/simple),\n[datepicker variants](#samples/tag-controls/jqui/datepicker/variants),\n[datepicker with validation](#samples/tag-controls/jqui/datepicker/with-validation)\nand [datepicker with validation wizard](#samples/tag-controls/jqui/datepicker/with-validation-wizard) samples\n- *__{{draggable/}}__* -- based on [jQuery UI draggable](https://jqueryui.com/draggable/)\n([api](https://api.jqueryui.com/draggable/))\n  - used in the [draggable - droppable](#samples/tag-controls/jqui/draggable-droppable) samples\n- *__{{droppable/}}__* -- based on [jQuery UI droppable](https://jqueryui.com/droppable/)\n([api](https://api.jqueryui.com/droppable/))\n  - used in the [draggable - droppable](#samples/tag-controls/jqui/draggable-droppable) samples\n- *__{{menu/}}__* -- based on [jQuery UI menu](https://jqueryui.com/menu/)\n([api](https://api.jqueryui.com/menu/))\n  - used in the [menu](#samples/tag-controls/jqui/menu) samples\n- *__{{progressbar/}}__* -- based on [jQuery UI progressbar](https://jqueryui.com/progressbar/)\n([api](https://api.jqueryui.com/progressbar/))\n  - used in the [Toolbar](#samples/tag-controls/jqui/toolbar)\nand [progressbar](#samples/tag-controls/jqui/progressbar) samples\n- *__{{resizable/}}__* -- based on [jQuery UI resizable](https://jqueryui.com/resizable/)\n([api](https://api.jqueryui.com/resizable/))\n  - used in the [resizable](#samples/tag-controls/jqui/resizable) samples\n- *__{{selectable/}}__* -- based on [jQuery UI selectable](https://jqueryui.com/selectable/)\n([api](https://api.jqueryui.com/selectable/))\n  - used in the [selectable](#samples/tag-controls/jqui/selectable) samples\n- *__{{selectmenu/}}__* -- based on [jQuery UI selectmenu](https://jqueryui.com/selectmenu/)\n([api](https://api.jqueryui.com/selectmenu/))\n  - used in the [selectmenu](#samples/tag-controls/jqui/selectmenu) samples\n- *__{{slider/}}__* -- based on [jQueryUI slider](https://jqueryui.com/slider/)\n([api](https://api.jqueryui.com/slider/))\n  - used in the [simple slider](#samples/tag-controls/jqui/slider/simple),\n[slider variants](#samples/tag-controls/jqui/slider/variants),\n[slider with validation](#samples/tag-controls/jqui/slider/with-validation),\n[sliders as color picker](#samples/tag-controls/jqui/slider/color-picker),\n[Toolbar](#samples/tag-controls/jqui/toolbar),\n[resizable](#samples/tag-controls/jqui/resizable),\n[draggable - droppable](#samples/tag-controls/jqui/draggable-droppable),\n[spinner](#samples/tag-controls/jqui/spinner) and\n[progressbar](#samples/tag-controls/jqui/progressbar) samples\n- *__{{sortable/}}__* -- based on [jQuery UI sortable](https://jqueryui.com/sortable/)\n([api](https://api.jqueryui.com/sortable/))\n  - used in the [sortable](#samples/tag-controls/jqui/sortable) samples\n- *__{{spinner/}}__* -- based on [jQuery UI spinner](https://jqueryui.com/spinner/)\n([api](https://api.jqueryui.com/spinner/))\n  - used in the [spinner](#samples/tag-controls/jqui/spinner)\nand [resizable](#samples/tag-controls/jqui/resizable) samples\n- *__{{timespinner/}}__* -- also based on [jQuery UI spinner](https://jqueryui.com/spinner/)\n([api](https://api.jqueryui.com/spinner/))\n  - used in the [timespinner](#samples/tag-controls/jqui/timespinner) samples\n- *__{{tabs/}}__* -- based on [jQuery UI tabs](https://jqueryui.com/tabs/)\n([api](https://api.jqueryui.com/tabs/))\n  - used in the [tabs](#samples/tag-controls/jqui/tabs) samples"
      },
      {
        "_type": "para",
        "title": "",
        "text": "To use the above tag controls simply include the library after loading *jQuery UI* (recommended version *1.12.1* or later) and *JsViews*:\n\n```jsr\n...\n<script src=\"//code.jquery.com/jquery-1.12.4.js\"></script>\n<script src=\"//code.jquery.com/ui/1.12.1/jquery-ui.js\"></script>\n...\n<script src=\"//www.jsviews.com/download/jsviews.js\"></script>\n<script src=\"//www.jsviews.com/download/sample-tag-controls/jsviews-jqueryui-widgets.js\"></script>\n...\n```\n\nIn addition, include an appropriate jQuery UI css class library, such as the default theme:\n\n```jsr\n<link href=\"//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css\" rel=\"stylesheet\">\n```\n\nSee [jQuery UI widget controls samples](#samples/tag-controls/jqui).\n"
      }
    ]
  },
  "download/jsrplugins": {
    "filter": "jsr",
    "title": "JsRender plugins",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "*JsRender* can be extended by including external libraries of custom tags, converters, helpers etc. -- such as the *range.js* library below:"
      },
      {
        "_type": "para",
        "title": "",
        "text": "```jsr\n...\n<script src=\"//www.jsviews.com/download/jsrender.js\"></script>\n<script src=\"//www.jsviews.com/download/sample-tag-controls/range.js\"></script>\n...\n```"
      },
      {
        "_type": "para",
        "title": "<b>{{range/}}</b>:",
        "text": "<ul>\n  <li><a href=\"https://www.jsviews.com/download/sample-tag-controls/range/range.js\">range.js</a> used in the\n    <a href=\"#samples/jsr/tags/extend-for\">extending for</a> JsRender sample and the <a href=\"#samples/tag-controls/range\">range</a> JsViews sample\n  </li>\n</ul>"
      }
    ]
  },
  "download/jsvplugins": {
    "filter": "jsv",
    "title": "JsViews plugins",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "*JsViews* can be extended by including external libraries of custom tags, converters, helpers, etc. -- such as the *[jQuery UI tag controls](#download/jqueryui-tagcontrols)* library (*jsviews-jqueryui-widgets.js*):"
      },
      {
        "_type": "para",
        "title": "",
        "text": "```jsr\n...\n<script src=\"//www.jsviews.com/download/jsviews.js\"></script>\n<script src=\"//www.jsviews.com/download/sample-tag-controls/jsviews-jqueryui-widgets.js\"></script>\n...\n```"
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "download/sample-tagcontrols",
            "label": "Sample tag controls"
          },
          {
            "hash": "download/jqueryui-tagcontrols",
            "label": "jQuery UI tag controls"
          }
        ]
      }
    ]
  }
};