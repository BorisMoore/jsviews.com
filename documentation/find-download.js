var content = $.views.documentation.content;

content.find.download = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/download")) ||
{
  "download": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender (jsrender.js) – rendering templates in the browser\nLatest version (To download, right-click and select “Save as…” from the menu):\n\nUncompressed (for development): jsrender.js\nCompressed (for production): jsrender.min.js. (Source map available here)\n\nJsRender is also available:\n\non CDN at cdnjs.com/libraries/jsrender\nusing Bower to install on the file system: $ bower install jsrender\n\nExample HTML pages:\n\nPage loading JsRender with jQuery\nPage loading JsRender without jQuery\n\nSee:\nJsRender Quickstart\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "JsViews (jsviews.js) – templates with data-binding\nLatest version (To download, right-click and select “Save as…” from the menu):\n\nUncompressed (for development): jsviews.js\nCompressed (for production): jsviews.min.js. (Source map available here)\n\nJsViews is also available:\n\non CDN at cdnjs.com/libraries/jsviews\nusing Bower to install on the file system: $ bower install jsviews\n\nExample HTML page:\n\nPage loading JsViews\n\nSee: JsViews Quickstart\n(Note that jsviews.js includes all of jsrender.js code – so jsrender.js does not need to be loaded first.)\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Additional scenarios:\n"
      },
      {
        "_type": "para",
        "title": "JsRender for Node.js &ndash; rendering templates on the server",
        "text": "JsRender for Node.js – rendering templates on the server\nA specific Node.js version of JsRender can be installed from npm, using:\n$ npm install jsrender\n\nand then loaded in script using:\nvar jsrender = require('jsrender');\n\nNow call regular JsRender APIs, such as:\nvar tmpl = jsrender.templates('Name: {{:name}}<br/>'); // Compile template from string\n\nvar html = tmpl.render({name: \"Jim\"}); // Render\n\nThis Node.js version of JsRender provides the complete set of JsRender APIs and features, together with integration with view-engines such as Express and Hapi, APIs for loading templates from the file system, and integration with Browserify for bundling server-side templates into client scripts for the browser.\nSee: JsRender Node.js Quickstart.\n"
      },
      {
        "_type": "para",
        "title": "Loading JsViews as separate files",
        "text": "Loading JsViews as separate files\nInstead of loading JsViews as a single file (jsviews.js), it can be loaded as three separate files: jsrender.js (providing templated rendering), jquery.observable.js (for observable data) and jquery.views.js (data-binding).\nThis can be useful in some scenarios. For example, if JsRender has already been loaded (by other components, for example) then full JsViews functionality may be added by loading only the additional jquery.observable.js and jquery.views.js files (rather than the complete composite file, jsviews.js).\nLatest version (To download, right-click and select “Save as…” from the menu):\n\nUncompressed (for development): jquery.observable.js and jquery.views.js\nCompressed (for production): jquery.observable.min.js and jquery.views.min.js. (Source maps available here and here)\n\njquery.observable.js and jquery.views.js are also available:\n\non CDN at cdnjs.com/libraries/jsviews\nusing Bower to install on the file system: $ bower install jsviews\n\nExample HTML page:\n\nPage loading JsViews as separate files\n\nSee: JsViews Quickstart\n"
      },
      {
        "_type": "para",
        "title": "CDN delivery",
        "text": "CDN delivery\nJsRender and JsViews are available on the cdnjs CDN at:\n\ncdnjs.com/libraries/jsrender\ncdnjs.com/libraries/jsviews\n\n"
      }
    ]
  },
  "download/specific": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "Specific named versions:\n(These links will continue to point to the specific version, even after subsequent new releases).\nTo download these files, right-click and select “Save as…” from the menu.\nJsRender beta\nStatus: JsRender is currently beta. V1.0 is planned to be available right after JsViews official beta release is complete.\nUncompressed (for development): jsrender-v1.0.0-beta.js.Compressed (for production): jsrender-v1.0.0-beta.min.js. (Source map available here).\nJsViews pre beta\nStatus: JsViews is currently a beta candidate. It will be officially labelled “beta” as soon as reasonably complete documentation for the JsViews and JsObservable APIs has been made available on this site. (Coming soon…)\nSingle file version (includes JsRender, JsObservable and JsViews)\nUncompressed (for development): jsviews-v1.0.0-alpha.js.Compressed (for production): jsviews-v1.0.0-alpha.min.js. (Source map available here).\nSeparate files (to be used with jsrender.js)\nUncompressed (for development): jquery.views-v1.0.0-alpha.js.Compressed (for production): jquery.views-v1.0.0-alpha.min.js. (Source map available here).\nUncompressed (for development): jquery.observable-v1.0.0-alpha.js.Compressed (for production): jquery.observable-v1.0.0-alpha.min.js. (Source map available here).\n"
      }
    ]
  },
  "download/sample-tagcontrols": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "The following tag controls, used in some of the samples, can be a starting point for your own custom tag controls. Some are very rudimentary, others are more advanced and complete.\nNote: If you use these controls in your own applications, it is recommended to download the files, or copy the code, rather than loading directly from this location, since the implementations (and associated APIs) may change over time as new versions of the samples are introduced.\n(To download, right-click and select “Save as…” from the menu.)\n\n{^{tabs/}}\n\nDownload: tabs.js\n(Compressed: tabs.min.js. Source map here)\nUsed in the tabs sample\n\n{^{tree/}}\n\nDownload: tree-if.js\n(Compressed: tree-if.min.js. Source map here)\nUsed in the tree (if-binding) sample\nDownload: tree-visible.js\n(Compressed: tree-visible.min.js. Source map here)\nUsed in the tree (visible-binding) sample\n\n{^{textbox/}}\n\nDownload: simple-textbox.js\n(Compressed: simple-textbox.min.js. Source map here)\nUsed in the simple textbox sample\n\n{^{validate/}} and {^{validation/}}\n\nDownload: validate.js\n(Compressed: validate.min.js. Source map here)\nUsed in the\ndatepicker with validation,\ndatepicker with validation wizard,\nslider with validation,\nvalidate simple\nand the validate tag control samples\n\n{^{range/}}\n\nDownload: range.js\n(Compressed: range.min.js. Source map here)\nUsed in the\nextending for JsRender sample and the range JsViews sample\n\n{^{jsonview/}}\n\nDownload: jsonview.js\n(Compressed: jsonview.min.js. Source map here)\nUsed in the jsonview JsViews sample\n\n\nTo use the above tag controls simply include the corresponding libraries for your chosen tags, after loading JsViews:\n...\n<script src=\"//code.jquery.com/jquery-1.12.4.js\"></script>\n...\n<script src=\"//www.jsviews.com/download/jsviews.js\"></script>\n<script src=\"//www.jsviews.com/download/range.js\"></script>\n<script src=\"//www.jsviews.com/download/validate.js\"></script>\n...\n\n"
      }
    ]
  },
  "download/pages": {
    "sections": [
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "download/pages-jsr-jq": {
    "sections": [
      {
        "_type": "para",
        "title": "Example HTML page, using latest version of JsRender from www.jsviews.com",
        "text": "Example HTML page, using latest version of JsRender from www.jsviews.com\n<!DOCTYPE html>\n<html>\n<head>\n  <!-- Load jQuery -->\n  <script src=\"//code.jquery.com/jquery-1.12.4.js\"></script>\n\n  <!-- Load JsRender latest version, from www.jsviews.com: -->\n  <script src=\"//www.jsviews.com/download/jsrender.js\"></script>\n</head>\n<body>\n  <!-- Provide container for rendered template output: -->\n  <div id=\"result\"></div>\n\n  <!-- Declare a JsRender template, in a script block: -->\n  <script id=\"myTmpl\" type=\"text/x-jsrender\">{{:name}}</script>\n\n  <script>\n    var tmpl = $.templates(\"#myTmpl\"); // Get compiled template\n    var data = {name: \"Jo\"};           // Define data\n    var html = tmpl.render(data);      // Render template using data - as HTML string\n    $(\"#result\").html(html);           // Insert HTML string into DOM\n  </script>\n</body>\n</html>\n\n"
      },
      {
        "_type": "para",
        "title": "Alternatives: replace the JsRender &lt;script&gt; tag above by one of the following:",
        "text": "Alternatives: replace the JsRender <script> tag above by one of the following:\nUsing latest version, minified, from www.jsviews.com:\n<script src=\"//www.jsviews.com/download/jsrender.min.js\"></script>\n\nUsing specific version from CDN:\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.81/jsrender.js\"></script>\n\nUsing specific version, minified, from CDN:\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.81/jsrender.min.js\"></script>\n\nLoading from the file system after Bower install:\n– Install JsRender on local file system, using $ bower install jsrender– then load jsrender.js or jsrender.min.js from the bower_components/jsrender/ folder, as in:\n<script src=\"bower_components/jsrender/jsrender.js\"></script>\n\n"
      }
    ]
  },
  "download/pages-jsr": {
    "sections": [
      {
        "_type": "para",
        "title": "Example HTML page, using latest version of JsRender from www.jsviews.com",
        "text": "Example HTML page, using latest version of JsRender from www.jsviews.com\n<!DOCTYPE html>\n<html>\n<head>\n  <!-- Load JsRender latest version, from www.jsviews.com: -->\n  <script src=\"//www.jsviews.com/download/jsrender.js\"></script>\n</head>\n<body>\n  <!-- Provide container for rendered template output: -->\n  <div id=\"result\"></div>\n\n  <!-- Declare a JsRender template, in a script block: -->\n  <script id=\"myTmpl\" type=\"text/x-jsrender\">{{:name}}</script>\n\n  <script>\n    var $ = window.jsrender;                                  // JsRender namespace, used instead of jQuery object \n    var markup = document.getElementById(\"myTmpl\").innerHTML; // Get template markup from script block contents\n    var tmpl = $.templates(markup);                           // Compile template from markup string\n    var data = {name: \"Jo\"};                                  // Define data\n    var html = tmpl.render(data);                             // Render template using data - as HTML string\n    document.getElementById(\"result\").innerHTML = html;       // Insert HTML string into DOM\n  </script>\n</body>\n</html>\n\n"
      },
      {
        "_type": "para",
        "title": "Alternatives: replace the JsRender &lt;script&gt; tag above by one of the following:",
        "text": "Alternatives: replace the JsRender <script> tag above by one of the following:\nUsing latest version, minified, from www.jsviews.com:\n<script src=\"//www.jsviews.com/download/jsrender.min.js\"></script>\n\nUsing specific version from CDN:\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.81/jsrender.js\"></script>\n\nUsing specific version, minified, from CDN:\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsrender/0.9.81/jsrender.min.js\"></script>\n\nLoading from the file system after Bower install:\n– Install JsRender on local file system, using $ bower install jsrender– then load jsrender.js or jsrender.min.js from the bower_components/jsrender/ folder, as in:\n<script src=\"bower_components/jsrender/jsrender.js\"></script>\n\n"
      }
    ]
  },
  "download/pages-jsv": {
    "sections": [
      {
        "_type": "para",
        "title": "Example HTML page, loading latest version of JsViews from www.jsviews.com",
        "text": "Example HTML page, loading latest version of JsViews from www.jsviews.com\n<!DOCTYPE html>\n<html>\n<head>\n  <!-- Load jQuery -->\n  <script src=\"//code.jquery.com/jquery-1.12.4.js\"></script>\n\n  <!-- Load JsViews latest version, from www.jsviews.com: -->\n  <script src=\"//www.jsviews.com/download/jsviews.js\"></script>\n</head>\n<body>\n  <!-- Provide container for rendered template output: -->\n  <div id=\"result\"></div>\n\n  <!-- Declare a JsRender template, in a script block: -->\n  <script id=\"myTmpl\" type=\"text/x-jsrender\">\n    <input data-link=\"name\" />\n    {^{:name}}\n  </script>\n\n  <script>\n    var tmpl = $.templates(\"#myTmpl\"); // Get compiled template\n    var data = {name: \"Jo\"};           // Define data\n    tmpl.link(\"#result\", data);        // Render and data-link template as content of chosen container element\n  </script>\n</body>\n</html>\n\n"
      },
      {
        "_type": "para",
        "title": "Alternatives: replace the JsViews &lt;script&gt; tag above by one of the following:",
        "text": "Alternatives: replace the JsViews <script> tag above by one of the following:\nUsing latest version, minified, from www.jsviews.com:\n<script src=\"//www.jsviews.com/download/jsviews.min.js\"></script>\n\nUsing specific version from CDN:\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.81/jsviews.js\"></script>\n\nUsing specific version, minified, from CDN:\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.81/jsviews.min.js\"></script>\n\nLoading from the file system after Bower install:\n– Install JsViews on local file system, using $ bower install jsviews– then load jsviews.js or jsviews.min.js from the bower_components/jsviews/ folder, as in:\n<script src=\"bower_components/jsviews/jsviews.js\"></script>\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "JsViews – separate files\nUsually JsViews as a single file (jsviews.js), as in the example HTML page above.\nHowever it can be loaded as three separate files: jsrender.js (templated rendering), jquery.observable.js (observable data) and jquery.views.js (data-binding) – as follows:\n"
      },
      {
        "_type": "para",
        "title": "Example HTML page, loading JsViews as separate files",
        "text": "Example HTML page, loading JsViews as separate files\n<!DOCTYPE html>\n<html>\n<head>\n  <!-- Load jQuery -->\n  <script src=\"//code.jquery.com/jquery-1.12.4.js\"></script>\n\n  <!-- Load JsViews latest version, from www.jsviews.com, as separate component files: -->\n  <script src=\"//www.jsviews.com/download/jsrender.js\"></script>\n  <script src=\"//www.jsviews.com/download/jquery.observable.js\"></script>\n  <script src=\"//www.jsviews.com/download/jquery.views.js\"></script>\n</head>\n<body>\n  <!-- Provide container for rendered template output: -->\n  <div id=\"result\"></div>\n\n  <!-- Declare a JsRender template, in a script block: -->\n  <script id=\"myTmpl\" type=\"text/x-jsrender\">\n    <input data-link=\"name\" />\n    {^{:name}}\n  </script>\n\n  <script>\n    var tmpl = $.templates(\"#myTmpl\"); // Get compiled template\n    var data = {name: \"Jo\"};           // Define data\n    tmpl.link(\"#result\", data);        // Render and data-link template as content of chosen container element\n  </script>\n</body>\n</html>\n\n"
      },
      {
        "_type": "para",
        "title": "Alternatives: replace the three JsViews &lt;script&gt; tags above by one of the following:",
        "text": "Alternatives: replace the three JsViews <script> tags above by one of the following:\nUsing latest version, minified, from www.jsviews.com:*\n<script src=\"//www.jsviews.com/download/jsrender.min.js\"></script>\n<script src=\"//www.jsviews.com/download/jquery.observable.min.js\"></script>\n<script src=\"//www.jsviews.com/download/jquery.views.min.js\"></script>\n\nUsing specific version from CDN:\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.81/jsrender.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.81/jquery.observable.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.81/jquery.views.js\"></script>\n\nUsing specific version, minified, from CDN:*\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.81/jsrender.min.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.81/jquery.observable.min.js\"></script>\n<script src=\"//cdnjs.cloudflare.com/ajax/libs/jsviews/0.9.81/jquery.views.min.js\"></script>\n\nLoading from the file system after Bower install:\n– Install JsViews on local file system, using $ bower install jsviews– then load the correspondins .js or .min.js files from the bower_components/jsviews/ folder, as in:\n<script src=\"bower_components/jsviews/jsrender.js\"></script>\n<script src=\"bower_components/jsviews/jquery.observable.js\"></script>\n<script src=\"bower_components/jsviews/jquery.views.js\"></script>\n\n"
      }
    ]
  },
  "download/jqueryui-tagcontrols": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): jsviews-jqueryui-widgets.js\nCompressed (for production): jsviews-jqueryui-widgets.min.js. (Source map available here)\n(To download, right-click and select “Save as…” from the menu.)\nThe jsviews-jqueryui-widgets.js library integrates jQuery UI widgets (recommended version 1.12.1 or later).\n\n{{autocomplete/}} – based on jQuery UI autocomplete\n(api)\n{{accordion/}} – based on jQuery UI accordion\n(api)\n{{button/}} – based on jQuery UI button\n(api)\n\nused in the Toolbar sample\n\n{{checkbox/}} – based on jQuery UI checkboxradio\n(api)\n(requires jQuery UI version 1.12.1 or later)\n\nused in the Toolbar sample\n\n{{radio/}} – based on jQuery UI checkboxradio\n(api)\n(requires jQuery UI version 1.12.1 or later)\n\nused in the Toolbar sample\n\n{{controlgroup/}} – based on jQuery UI controlgroup\n(api)\n(requires jQuery UI version 1.12.1 or later)\n\nused in the Toolbar sample\n\n{{buttonset}} – deprecated and available only if using jQuery UI 1.11.4\n{{datepicker/}} – based on jQuery UI datepicker\n(api)\n\nused in the simple datepicker,\ndatepicker variants,\ndatepicker with validation\nand datepicker with validation wizard samples\n\n{{draggable/}} – based on jQuery UI draggable\n(api)\n{{droppable/}} – based on jQuery UI droppable\n(api)\n{{menu/}} – based on jQuery UI menu\n(api)\n{{progressbar/}} – based on jQuery UI progressbar\n(api)\n\nused in the Toolbar sample\n\n{{resizable/}} – based on jQuery UI resizable\n(api)\n{{selectable/}} – based on jQuery UI selectable\n(api)\n{{selectmenu/}} – based on jQuery UI selectmenu\n(api)\n{{slider/}} – based on jQueryUI slider\n(api)\n\nused in the simple slider,\nslider variants,\nslider with validation,\nsliders as color picker and\nToolbar samples\n\n{{sortable/}} – based on jQuery UI sortable\n(api)\n{{spinner/}} – based on jQuery UI spinner\n(api)\n{{tabs/}} – based on jQuery UI tabs\n(api)\n\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "To use the above tag controls simply include the library after loading jQuery UI and JsViews:\n...\n<script src=\"//code.jquery.com/jquery-1.12.4.js\"></script>\n<script src=\"//code.jquery.com/ui/1.12.1/jquery-ui.js\"></script>\n...\n<script src=\"//www.jsviews.com/download/jsviews.js\"></script>\n<script src=\"//www.jsviews.com/download/jsviews-jqueryui-widgets.js\"></script>\n...\n\nSee jQuery UI widget controls samples.\n"
      }
    ]
  },
  "download/jsrplugins": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsRender can be extended by including external libraries of custom tags, converters, helpers etc. – such as the range.js library below:\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "...\n<script src=\"//www.jsviews.com/download/jsrender.js\"></script>\n<script src=\"//www.jsviews.com/download/sample-tag-controls/range.js\"></script>\n...\n\n"
      },
      {
        "_type": "para",
        "title": "<b>{{range/}}</b>:",
        "text": "{{range/}}:\n\n  range.js used in the\n    extending for JsRender sample and the range JsViews sample\n  \n"
      }
    ]
  },
  "download/jsvplugins": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "JsViews can be extended by including external libraries of custom tags, converters, helpers, etc. – such as the jQuery UI tag controls library (jsviews-jqueryui-widgets.js):\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "...\n<script src=\"//www.jsviews.com/download/jsviews.js\"></script>\n<script src=\"//www.jsviews.com/download/jsviews-jqueryui-widgets.js\"></script>\n...\n\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  }
}