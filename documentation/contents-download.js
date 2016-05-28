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
  "download/tag-controls": {
    "title": "Sample tag controls",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "**Note:** If you use these controls in your own applications, it is recommended to download the files, or copy the code, rather than loading directly from this location, since the implementations (and associated APIs) may change over time as new versions of the samples are introduced."
      },
      {
        "_type": "para",
        "title": "<b>Tag controls based on jQuery UI widgets:</b>",
        "text": "The <a href=\"https://www.jsviews.com/download/sample-tag-controls/jsviews-jqueryui-widgets.js\">jsviews-jqueryui-widgets.js</a> library provides the following tag controls, based on corresponding jQuery UI widgets:\n\n<ul>\n  <li><em><b>{{autocomplete/}}</b></em> - based on <a href=\"https://jqueryui.com/autocomplete/\">jQuery UI autocomplete</a></li>\n  <li><em><b>{{accordion/}}</b></em> - based on <a href=\"https://jqueryui.com/accordion/\">jQuery UI accordion</a></li>\n  <li><em><b>{{autocomplete/}}</b></em> - based on <a href=\"https://jqueryui.com/autocomplete/\">jQuery UI autocomplete</a></li>\n  <li><em><b>{{button/}}</b></em> - based on <a href=\"https://jqueryui.com/button/\">jQuery UI button</a></li>\n  <li><em><b>{{buttonset/}}</b></em> - based on <a href=\"https://jqueryui.com/buttonset/\">jQuery UI buttonset</a></li>\n  <li><em><b>{{datepicker/}}</b></em> - based on <a href=\"https://jqueryui.com/datepicker/\">jQuery UI datepicker</a>\n<ul><li>used in the <a href=\"#samples/tag-controls/datepicker/simple\">simple datepicker</a>,\n<a href=\"#samples/tag-controls/datepicker/variants\">datepicker variants</a>,\n<a href=\"#samples/tag-controls/datepicker/with-validation\">datepicker with validation</a>\nand <a href=\"#samples/tag-controls/datepicker/with-validation-wizard\">datepicker with validation wizard</a> samples</li></ul></li>\n  <li><em><b>{{draggable/}}</b></em> - based on <a href=\"https://jqueryui.com/draggable/\">jQuery UI draggable</a></li>\n  <li><em><b>{{droppable/}}</b></em> - based on <a href=\"https://jqueryui.com/droppable/\">jQuery UI droppable</a></li>\n  <li><em><b>{{menu/}}</b></em> - based on <a href=\"https://jqueryui.com/menu/\">jQuery UI menu</a></li>\n  <li><em><b>{{progressbar/}}</b></em> - based on <a href=\"https://jqueryui.com/progressbar/\">jQuery UI progressbar</a></li>\n  <li><em><b>{{resizable/}}</b></em> - based on <a href=\"https://jqueryui.com/resizable/\">jQuery UI resizable</a></li>\n  <li><em><b>{{selectable/}}</b></em> - based on <a href=\"https://jqueryui.com/selectable/\">jQuery UI selectable</a></li>\n  <li><em><b>{{selectmenu/}}</b></em> - based on <a href=\"https://jqueryui.com/selectmenu/\">jQuery UI selectmenu</a></li>\n  <li><em><b>{{slider/}}</b></em> - based on <a href=\"https://jqueryui.com/slider/\">jQuery UI slider</a>\n<ul><li>used in the <a href=\"#samples/tag-controls/slider/simple\">simple slider</a>,\n<a href=\"#samples/tag-controls/slider/variants\">slider variants</a>\nand <a href=\"#samples/tag-controls/slider/with-validation\">slider with validation</a> samples</li></ul></li>\n  <li><em><b>{{sortable/}}</b></em> - based on <a href=\"https://jqueryui.com/sortable/\">jQuery UI sortable</a></li>\n  <li><em><b>{{spinner/}}</b></em> - based on <a href=\"https://jqueryui.com/spinner/\">jQuery UI spinner</a></li>\n  <li><em><b>{{tabs/}}</b></em> - based on <a href=\"https://jqueryui.com/tabs/\">jQuery UI tabs</a></li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "<b>JsViews tag controls not using jQuery UI widgets:</b>",
        "text": "The following tag controls, used in some of the samples, can be a starting point for your own custom tag controls. Some are very rudimentary, others are more advanced and complete. "
      },
      {
        "_type": "para",
        "title": "<b>{{tabs/}}</b>:",
        "text": "<ul>\n  <li><a href=\"https://www.jsviews.com/download/sample-tag-controls/tabs/tabs.js\">tabs.js</a> used in the\n    <a href=\"#samples/tag-controls/tabs\">tabs</a> sample\n  </li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "<b>{{tree/}}</b>:",
        "text": "<ul>\n  <li><a href=\"https://www.jsviews.com/download/sample-tag-controls/treeview/tree-if.js\">tree-if.js</a> used in the\n    <a href=\"#samples/tag-controls/tree/if-binding\">tree (if-binding)</a> sample\n  </li>\n  <li><a href=\"https://www.jsviews.com/download/sample-tag-controls/treeview/tree-visible.js\">tree-if.js</a> used in the\n    <a href=\"#samples/tag-controls/tree/visible-binding\">tree (visible-binding)</a> sample\n  </li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "<b>{{textbox/}}</b>:",
        "text": "<ul>\n  <li><a href=\"https://www.jsviews.com/download/sample-tag-controls/textbox/simple-textbox.js\">simple-textbox.js</a> used in the\n    <a href=\"#samples/tag-controls/edit/simple-textbox\">simple textbox</a> sample\n  </li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "<b>{{edit/}}</b>:",
        "text": "<ul>\n  <li><a href=\"https://www.jsviews.com/download/sample-tag-controls/generic-edit/edit.js\">edit.js</a> used in the\n    <a href=\"#samples/tag-controls/edit\">edit</a>,\n    <a href=\"#samples/tag-controls/datepicker\">datepicker</a>,\n    <a href=\"#samples/tag-controls/slider\">slider</a>\n    and <a href=\"#samples/tag-controls/validate\">validate</a> samples\n  </li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "<b>{{validate/}}</b> and <b>{{validation/}}</b>:",
        "text": "<ul>\n  <li><a href=\"https://www.jsviews.com/download/sample-tag-controls/validate/validate.js\">validate.js</a> used in the\n    <a href=\"#samples/tag-controls/datepicker/with-validation\">datepicker with validation</a>,\n    <a href=\"#samples/tag-controls/datepicker/with-validation-wizard\">datepicker with validation wizard</a>,\n    <a href=\"#samples/tag-controls/slider/with-validation\">slider with validation</a>,<br/>\n    <a href=\"#samples/tag-controls/validate/simple\">validate simple</a>\n    and <a href=\"#samples/tag-controls/validate/group\">validate group</a> samples\n  </li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "<b>{{range/}}</b>:",
        "text": "<ul>\n  <li><a href=\"https://www.jsviews.com/download/sample-tag-controls/range/range.js\">range.js</a> used in the\n    <a href=\"#samples/jsr/tags/extend-for\">extending for</a> JsRender sample and the <a href=\"#samples/tag-controls/range\">range</a> JsViews sample\n  </li>\n</ul>"
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
    "title": "Loading JsRender with jQuery",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Example HTML page, using latest version of JsRender from www.jsviews.com",
        "text": "```jsr\n<!DOCTYPE html>\n<html>\n<head>\n  <!-- Load jQuery -->\n  <script src=\"//code.jquery.com/jquery-1.12.3.js\"></script>\n\n  <!-- Load JsRender latest version, from www.jsviews.com: -->\n  <script src=\"//www.jsviews.com/download/jsrender.js\"></script>\n</head>\n<body>\n  <!-- Provide container for rendered template output: -->\n  <div id=\"result\"></div>\n\n  <!-- Declare a JsRender template, in a script block: -->\n  <script id=\"myTmpl\" type=\"text/x-jsrender\">{{:name}}</script>\n\n  <script>\n    var tmpl = $.templates(\"#myTmpl\"); // Get compiled template\n    var data = {name: \"Jo\"};           // Define data\n    var html = tmpl.render(data);      // Render template using data - as HTML string\n    $(\"#result\").html(html);           // Insert HTML string into DOM\n  </script>\n</body>\n</html>\n```",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "Alternatives: replace the JsRender &lt;script&gt; tag above by one of the following:",
        "text": "*Using latest version, minified, from www.jsviews.com:*\n\n```jsr\n<script src=\"//www.jsviews.com/download/jsrender.min.js\"></script>\n```\n\n*Using specific version from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.74/jsrender.js\"></script>\n```\n\n*Using specific version, minified, from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.74/jsrender.min.js\"></script>\n```\n\n*Loading from the file system after* [Bower](http://bower.io/search/?q=jsrender) *install:*\n\n-- Install JsRender on local file system, using `$ bower install jsrender`<br/>-- then load `jsrender.js` or `jsrender.min.js` from the `bower_components/jsrender/` folder, as in:\n\n```jsr\n<script src=\"bower_components/jsrender/jsrender.js\"></script>\n```"
      }
    ]
  },
  "download/pages-jsr": {
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
        "text": "*Using latest version, minified, from www.jsviews.com:*\n\n```jsr\n<script src=\"//www.jsviews.com/download/jsrender.min.js\"></script>\n```\n\n*Using specific version from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.74/jsrender.js\"></script>\n```\n\n*Using specific version, minified, from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.74/jsrender.min.js\"></script>\n```\n\n*Loading from the file system after* [Bower](http://bower.io/search/?q=jsrender) *install:*\n\n-- Install JsRender on local file system, using `$ bower install jsrender`<br/>-- then load `jsrender.js` or `jsrender.min.js` from the `bower_components/jsrender/` folder, as in:\n\n```jsr\n<script src=\"bower_components/jsrender/jsrender.js\"></script>\n```"
      }
    ]
  },
  "download/pages-jsv": {
    "title": "Loading JsViews",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Example HTML page, loading latest version of JsViews from www.jsviews.com",
        "text": "```jsr\n<!DOCTYPE html>\n<html>\n<head>\n  <!-- Load jQuery -->\n  <script src=\"//code.jquery.com/jquery-1.12.3.js\"></script>\n\n  <!-- Load JsViews latest version, from www.jsviews.com: -->\n  <script src=\"//www.jsviews.com/download/jsviews.js\"></script>\n</head>\n<body>\n  <!-- Provide container for rendered template output: -->\n  <div id=\"result\"></div>\n\n  <!-- Declare a JsRender template, in a script block: -->\n  <script id=\"myTmpl\" type=\"text/x-jsrender\">\n    <input data-link=\"name trigger=true\" />\n    {^{:name}}\n  </script>\n\n  <script>\n    var tmpl = $.templates(\"#myTmpl\"); // Get compiled template\n    var data = {name: \"Jo\"};           // Define data\n    tmpl.link(\"#result\", data);        // Render and data-link template as content of chosen container element\n  </script>\n</body>\n</html>\n```",
        "anchor": ""
      },
      {
        "_type": "para",
        "title": "Alternatives: replace the JsViews &lt;script&gt; tag above by one of the following:",
        "text": "*Using latest version, minified, from www.jsviews.com:*\n\n```jsr\n<script src=\"//www.jsviews.com/download/jsviews.min.js\"></script>\n```\n\n*Using specific version from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.74/jsviews.js\"></script>\n```\n\n*Using specific version, minified, from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.74/jsviews.min.js\"></script>\n```\n\n*Loading from the file system after* [Bower](http://bower.io/search/?q=jsviews) *install:*\n\n-- Install JsViews on local file system, using `$ bower install jsviews`<br/>-- then load `jsviews.js` or `jsviews.min.js` from the `bower_components/jsviews/` folder, as in:\n\n```jsr\n<script src=\"bower_components/jsviews/jsviews.js\"></script>\n```"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsViews &ndash; separate files</div>\n\nUsually JsViews as a single file (*jsviews.js*), as in the example HTML page above.\n\nHowever it can be loaded as three separate files: *jsrender.js* (templated rendering), *jquery.observable.js* (observable data) and *jquery.views.js* (data-binding) -- as follows:\n"
      },
      {
        "_type": "para",
        "title": "Example HTML page, loading JsViews as separate files",
        "text": "```jsr\n<!DOCTYPE html>\n<html>\n<head>\n  <!-- Load jQuery -->\n  <script src=\"//code.jquery.com/jquery-1.12.3.js\"></script>\n\n  <!-- Load JsViews latest version, from www.jsviews.com, as separate component files: -->\n  <script src=\"//www.jsviews.com/download/jsrender.js\"></script>\n  <script src=\"//www.jsviews.com/download/jquery.observable.js\"></script>\n  <script src=\"//www.jsviews.com/download/jquery.views.js\"></script>\n</head>\n<body>\n  <!-- Provide container for rendered template output: -->\n  <div id=\"result\"></div>\n\n  <!-- Declare a JsRender template, in a script block: -->\n  <script id=\"myTmpl\" type=\"text/x-jsrender\">\n    <input data-link=\"name trigger=true\" />\n    {^{:name}}\n  </script>\n\n  <script>\n    var tmpl = $.templates(\"#myTmpl\"); // Get compiled template\n    var data = {name: \"Jo\"};           // Define data\n    tmpl.link(\"#result\", data);        // Render and data-link template as content of chosen container element\n  </script>\n</body>\n</html>\n```",
        "anchor": "separate"
      },
      {
        "_type": "para",
        "title": "Alternatives: replace the three JsViews &lt;script&gt; tags above by one of the following:",
        "text": "*Using latest version, minified, from *www.jsviews.com*:**\n\n```jsr\n<script src=\"//www.jsviews.com/download/jsrender.min.js\"></script>\n<script src=\"//www.jsviews.com/download/jquery.observable.min.js\"></script>\n<script src=\"//www.jsviews.com/download/jquery.views.min.js\"></script>\n```\n\n*Using specific version from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.74/jsrender.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.74/jquery.observable.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.74/jquery.views.js\"></script>\n```\n\n*Using specific version, minified, from CDN:**\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.74/jsrender.min.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.74/jquery.observable.min.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.74/jquery.views.min.js\"></script>\n```\n\n*Loading from the file system after* [Bower](http://bower.io/search/?q=jsviews) *install:*\n\n-- Install JsViews on local file system, using `$ bower install jsviews`<br/>-- then load the correspondins `.js` or `.min.js` files from the `bower_components/jsviews/` folder, as in:\n\n```jsr\n<script src=\"bower_components/jsviews/jsrender.js\"></script>\n<script src=\"bower_components/jsviews/jquery.observable.js\"></script>\n<script src=\"bower_components/jsviews/jquery.views.js\"></script>\n```"
      }
    ]
  },
  "download/pages-jsv-separate": {
    "title": "Loading JsViews (separate files)",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "Example HTML page, loading latest version of JsViews from www.jsviews.com",
        "text": "```jsr\n<!DOCTYPE html>\n<html>\n<head>\n  <!-- Load jQuery -->\n  <script src=\"//code.jquery.com/jquery-1.12.3.js\"></script>\n\n  <!-- Load JsViews latest version, from www.jsviews.com: -->\n  <script src=\"//www.jsviews.com/download/jsrender.js\"></script>\n  <script src=\"//www.jsviews.com/download/jquery.observable.js\"></script>\n  <script src=\"//www.jsviews.com/download/jquery.views.js\"></script>\n</head>\n<body>\n  <!-- Provide container for rendered template output: -->\n  <div id=\"result\"></div>\n\n  <!-- Declare a JsRender template, in a script block: -->\n  <script id=\"myTmpl\" type=\"text/x-jsrender\">\n    <input data-link=\"name trigger=true\" />\n    {^{:name}}\n  </script>\n\n  <script>\n    var tmpl = $.templates(\"#myTmpl\"); // Get compiled template\n    var data = {name: \"Jo\"};           // Define data\n    tmpl.link(\"#result\", data);        // Render and data-link template as content of chosen container element\n  </script>\n</body>\n</html>\n```"
      },
      {
        "_type": "para",
        "title": "",
        "text": "*Using latest version, minified, from *www.jsviews.com*:**\n\n```jsr\n<script src=\"//www.jsviews.com/download/jsviews.min.js\"></script>\n```\n\n*Using specific version from CDN:*\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.74/jsviews.js\"></script>\n```\n\n*Using specific version, minified, from CDN:**\n\n```jsr\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.72/jsviews.min.js\"></script>\n```\n\n*Loading from the file system after* [Bower](http://bower.io/search/?q=jsviews) *install:*\n\n-- Install JsViews on local file system, using `$ bower install jsviews`<br/>-- then load `jsviews.js` or `jsviews.min.js` from the `bower_components/jsviews/` folder, as in:\n\n```jsr\n<script src=\"bower_components/jsviews/jsviews.js\"></script>\n```"
      }
    ]
  }
};