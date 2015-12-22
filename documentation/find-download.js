var content = $.views.documentation.content;

content.find.download = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/download")) ||
{
  "download": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Latest versions:\nThese links will always point to the latest version. (They move to the new current version with each new release).\nTo download these files, right-click and select “Save as…” from the menu.\nJsRender\nUncompressed (for development): jsrender.js.Compressed (for production): jsrender.min.js. (Source map available here).\nJsViews - single file (includes JsRender, JsObservable and JsViews)\nUncompressed (for development): jsviews.js.Compressed (for production): jsviews.min.js. (Source map available here).\nJsViews and JsObservable - separate files (to be used with jsrender.js)\nUncompressed (for development): jquery.views.js.Compressed (for production): jquery.views.min.js. (Source map available here).\nUncompressed (for development): jquery.observable.js.Compressed (for production): jquery.observable.min.js. (Source map available here).\nJsRender for Node.js\nA specific Node.js version of JsRender can be installed from NPM, using:\n$ npm install jsrender\n\nand then loaded in script using:\nvar jsrender = require('jsrender');\n\nNow call regular JsRender APIs, such as:\nvar tmpl = jsrender.templates('Name: {{:name}}<br/>'); // Compile template from string\n\nvar html = tmpl.render({name: \"Jim\"}); // Render\n\nThis Node.js version of JsRender provides the complete set of JsRender APIs and features, together with integration with view-engines such as Express and Hapi, APIs for loading templates from the file system, and integration with Browserify for bundling server-side templates into client scripts for the browser.\nSee JsRender Node.js Quickstart for details.\n"
      },
      {
        "_type": "para",
        "title": "CDN delivery",
        "text": "CDN delivery\nJsRender is available on the CDN: cdnjs\n"
      }
    ]
  },
  "download/specific": {
    "sections": [
      {
        "_type": "links",
        "title": ""
      },
      {
        "_type": "para",
        "title": "",
        "text": "Specific named versions:\n(These links will continue to point to the specific version, even after subsequent new releases).\nTo download these files, right-click and select “Save as…” from the menu.\nJsRender beta\nStatus: JsRender is currently beta. V1.0 is planned to be available right after JsViews official beta release is complete.\nUncompressed (for development): jsrender-v1.0.0-beta.js.Compressed (for production): jsrender-v1.0.0-beta.min.js. (Source map available here).\nJsViews pre beta\nStatus: JsViews is currently a beta candidate. It will be officially labelled “beta” as soon as reasonably complete documentation for the JsViews and JsObservable APIs has been made available on this site. (Coming soon…)\nSingle file version (includes JsRender, JsObservable and JsViews)\nUncompressed (for development): jsviews-v1.0.0-alpha.js.Compressed (for production): jsviews-v1.0.0-alpha.min.js. (Source map available here).\nSeparate files (to be used with jsrender.js)\nUncompressed (for development): jquery.views-v1.0.0-alpha.js.Compressed (for production): jquery.views-v1.0.0-alpha.min.js. (Source map available here).\nUncompressed (for development): jquery.observable-v1.0.0-alpha.js.Compressed (for production): jquery.observable-v1.0.0-alpha.min.js. (Source map available here).\n"
      }
    ]
  },
  "download/tag-controls": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Note: If you use these controls in your own applications, it is recommended to download the files, or copy the code, rather than loading directly from this location, since the implementations (and associated APIs) may change over time as new versions of the samples are introduced.\n"
      },
      {
        "_type": "para",
        "title": "<b>Tag controls based on jQuery UI widgets:</b>",
        "text": "Tag controls based on jQuery UI widgets:\nThe jsviews-jqueryui-widgets.js library provides the following tag controls, based on corresponding jQuery UI widgets:\n\n  {{autocomplete/}} - based on jQuery UI autocomplete\n  {{accordion/}} - based on jQuery UI accordion\n  {{autocomplete/}} - based on jQuery UI autocomplete\n  {{button/}} - based on jQuery UI button\n  {{buttonset/}} - based on jQuery UI buttonset\n  {{datepicker/}} - based on jQuery UI datepicker\nused in the simple datepicker,\ndatepicker variants,\ndatepicker with validation\nand datepicker with validation wizard samples\n  {{draggable/}} - based on jQuery UI draggable\n  {{droppable/}} - based on jQuery UI droppable\n  {{menu/}} - based on jQuery UI menu\n  {{progressbar/}} - based on jQuery UI progressbar\n  {{resizable/}} - based on jQuery UI resizable\n  {{selectable/}} - based on jQuery UI selectable\n  {{selectmenu/}} - based on jQuery UI selectmenu\n  {{slider/}} - based on jQuery UI slider\nused in the simple slider,\nslider variants\nand slider with validation samples\n  {{sortable/}} - based on jQuery UI sortable\n  {{spinner/}} - based on jQuery UI spinner\n  {{tabs/}} - based on jQuery UI tabs\n"
      },
      {
        "_type": "para",
        "title": "<b>JsViews tag controls not using jQuery UI widgets:</b>",
        "text": "JsViews tag controls not using jQuery UI widgets:\nThe following tag controls, used in some of the samples, can be a starting point for your own custom tag controls. Some are very rudimentary, others are more advanced and complete.\n"
      },
      {
        "_type": "para",
        "title": "<b>{{tabs/}}</b>:",
        "text": "{{tabs/}}:\n\n  tabs.js used in the\n    tabs sample\n  \n"
      },
      {
        "_type": "para",
        "title": "<b>{{tree/}}</b>:",
        "text": "{{tree/}}:\n\n  tree-if.js used in the\n    tree (if-binding) sample\n  \n  tree-if.js used in the\n    tree (visible-binding) sample\n  \n"
      },
      {
        "_type": "para",
        "title": "<b>{{textbox/}}</b>:",
        "text": "{{textbox/}}:\n\n  simple-textbox.js used in the\n    simple textbox sample\n  \n"
      },
      {
        "_type": "para",
        "title": "<b>{{edit/}}</b>:",
        "text": "{{edit/}}:\n\n  edit.js used in the\n    edit,\n    datepicker,\n    slider\n    and validate samples\n  \n"
      },
      {
        "_type": "para",
        "title": "<b>{{validate/}}</b> and <b>{{validation/}}</b>:",
        "text": "{{validate/}} and {{validation/}}:\n\n  validate.js used in the\n    datepicker with validation,\n    datepicker with validation wizard,\n    slider with validation,\n    validate simple\n    and validate group samples\n  \n"
      },
      {
        "_type": "para",
        "title": "<b>{{range/}}</b>:",
        "text": "{{range/}}:\n\n  range.js used in the\n    extending for JsRender sample and the range JsViews sample\n  \n"
      }
    ]
  }
}