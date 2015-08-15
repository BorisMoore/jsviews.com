var content = $.views.documentation.content;

content.download = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/download")) ||
{
  "download": {
    "title": "JsRender, JsViews and JsObservable Downloads",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "<h3>Latest versions:</h3>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "These links will always point to the latest version. (They move to the new current version with each new release)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>To download these files, right-click and select \"Save as...\" from the menu.</em>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsRender</div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jsrender.js\">jsrender.js</a>.<br/>Compressed (for production): <a href=\"download/jsrender.min.js\">jsrender.min.js</a>. (Source map available <a href=\"download/jsrender.min.js.map\">here</a>)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsViews - single file <span>(includes JsRender, JsObservable and JsViews)</span></div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jsviews.js\">jsviews.js</a>.<br/>Compressed (for production): <a href=\"download/jsviews.min.js\">jsviews.min.js</a>. (Source map available <a href=\"download/jsviews.min.js.map\">here</a>)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsViews and JsObservable - separate files <span>(to be used with jsrender.js)</span></div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jquery.views.js\">jquery.views.js</a>.<br/>Compressed (for production): <a href=\"download/jquery.views.min.js\">jquery.views.min.js</a>. (Source map available <a href=\"download/jquery.views.min.js.map\">here</a>)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jquery.observable.js\">jquery.observable.js</a>.<br/>Compressed (for production): <a href=\"download/jquery.observable.min.js\">jquery.observable.min.js</a>. (Source map available <a href=\"download/jquery.observable.min.js.map\">here</a>)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsRender for Node.js</div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>This version of JsRender is specifically for use on the server (Node.js). It provides the complete set of JsRender APIs and features, together with integration with view-engines such as Express and Hapi, APIs for loading templates from the file system, etc.</em>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jsrender-node.js\">jsrender-node.js</a>.<br/>Compressed (for production): <a href=\"download/jsrender-node.min.js\">jsrender-node.min.js</a>. (Source map available <a href=\"download/jsrender-node.min.js.map\">here</a>)."
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "download/specific",
            "label": "Specific versions"
          }
        ]
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
        "text": "<h3>Specific named versions:</h3>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "(These links will continue to point to the specific version, even after subsequent new releases)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>To download these files, right-click and select \"Save as...\" from the menu.</em>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsRender beta</div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>Status: JsRender is currently beta. V1.0 is planned to be available right after JsViews official beta release is complete.</em>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jsrender-v1.0.0-beta.js\">jsrender-v1.0.0-beta.js</a>.<br/>Compressed (for production): <a href=\"download/jsrender-v1.0.0-beta.min.js\">jsrender-v1.0.0-beta.min.js</a>. (Source map available <a href=\"download/jsrender-v1.0.0-beta.min.js.map\">here</a>)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsViews pre beta</div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<em>Status: JsViews is currently a beta candidate. It will be officially labelled \"beta\" as soon as reasonably complete documentation for the JsViews and JsObservable APIs has been made available on this site. (Coming soon...)</em>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<b>Single file version </b><em>(includes JsRender, JsObservable and JsViews)</em>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jsviews-v1.0.0-alpha.js\">jsviews-v1.0.0-alpha.js</a>.<br/>Compressed (for production): <a href=\"download/jsviews-v1.0.0-alpha.min.js\">jsviews-v1.0.0-alpha.min.js</a>. (Source map available <a href=\"download/jsviews-v1.0.0-alpha.min.js.map\">here</a>)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<b>Separate files </b><em>(to be used with jsrender.js)</em>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jquery.views-v1.0.0-alpha.js\">jquery.views-v1.0.0-alpha.js</a>.<br/>Compressed (for production): <a href=\"download/jquery.views-v1.0.0-alpha.min.js\">jquery.views-v1.0.0-alpha.min.js</a>. (Source map available <a href=\"download/jquery.views-v1.0.0-alpha.min.js.map\">here</a>)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jquery.observable-v1.0.0-alpha.js\">jquery.observable-v1.0.0-alpha.js</a>.<br/>Compressed (for production): <a href=\"download/jquery.observable-v1.0.0-alpha.min.js\">jquery.observable-v1.0.0-alpha.min.js</a>. (Source map available <a href=\"download/jquery.observable-v1.0.0-alpha.min.js.map\">here</a>)."
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
        "text": "<b>Note:</b> If you use these controls in your own applications, it is recommended to download the files, or copy the code, rather than loading directly from this location, since the implementations (and associated APIs) may change over time as new versions of the samples are introduced."
      },
      {
        "_type": "para",
        "title": "<b>Tag controls based on jQuery UI widgets:</b>",
        "text": "The <a href=\"download/sample-tag-controls/jsviews-jqueryui-widgets.js\">jsviews-jqueryui-widgets.js</a> library provides the following tag controls, based on corresponding jQuery UI widgets:"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<ul>\n  <li><em><b>{{autocomplete/}}</b></em> - based on <a href=\"https://jqueryui.com/autocomplete/\">jQuery UI autocomplete</a></li>\n  <li><em><b>{{accordion/}}</b></em> - based on <a href=\"https://jqueryui.com/accordion/\">jQuery UI accordion</a></li>\n  <li><em><b>{{autocomplete/}}</b></em> - based on <a href=\"https://jqueryui.com/autocomplete/\">jQuery UI autocomplete</a></li>\n  <li><em><b>{{button/}}</b></em> - based on <a href=\"https://jqueryui.com/button/\">jQuery UI button</a></li>\n  <li><em><b>{{buttonset/}}</b></em> - based on <a href=\"https://jqueryui.com/buttonset/\">jQuery UI buttonset</a></li>\n  <li><em><b>{{datepicker/}}</b></em> - based on <a href=\"https://jqueryui.com/datepicker/\">jQuery UI datepicker</a>\n<ul><li>used in the <a href=\"#samples/tag-controls/datepicker/simple\">simple datepicker</a>,\n<a href=\"#samples/tag-controls/datepicker/variants\">datepicker variants</a>,\n<a href=\"#samples/tag-controls/datepicker/with-validation\">datepicker with validation</a>\nand <a href=\"#samples/tag-controls/datepicker/with-validation-wizard\">datepicker with validation wizard</a> samples</li></ul></li>\n  <li><em><b>{{draggable/}}</b></em> - based on <a href=\"https://jqueryui.com/draggable/\">jQuery UI draggable</a></li>\n  <li><em><b>{{droppable/}}</b></em> - based on <a href=\"https://jqueryui.com/droppable/\">jQuery UI droppable</a></li>\n  <li><em><b>{{menu/}}</b></em> - based on <a href=\"https://jqueryui.com/menu/\">jQuery UI menu</a></li>\n  <li><em><b>{{progressbar/}}</b></em> - based on <a href=\"https://jqueryui.com/progressbar/\">jQuery UI progressbar</a></li>\n  <li><em><b>{{resizable/}}</b></em> - based on <a href=\"https://jqueryui.com/resizable/\">jQuery UI resizable</a></li>\n  <li><em><b>{{selectable/}}</b></em> - based on <a href=\"https://jqueryui.com/selectable/\">jQuery UI selectable</a></li>\n  <li><em><b>{{selectmenu/}}</b></em> - based on <a href=\"https://jqueryui.com/selectmenu/\">jQuery UI selectmenu</a></li>\n  <li><em><b>{{slider/}}</b></em> - based on <a href=\"https://jqueryui.com/slider/\">jQuery UI slider</a>\n<ul><li>used in the <a href=\"#samples/tag-controls/slider/simple\">simple slider</a>,\n<a href=\"#samples/tag-controls/slider/variants\">slider variants</a>\nand <a href=\"#samples/tag-controls/slider/with-validation\">slider with validation</a> samples</li></ul></li>\n  <li><em><b>{{sortable/}}</b></em> - based on <a href=\"https://jqueryui.com/sortable/\">jQuery UI sortable</a></li>\n  <li><em><b>{{spinner/}}</b></em> - based on <a href=\"https://jqueryui.com/spinner/\">jQuery UI spinner</a></li>\n  <li><em><b>{{tabs/}}</b></em> - based on <a href=\"https://jqueryui.com/tabs/\">jQuery UI tabs</a></li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "<b>JsViews tag controls not using jQuery UI widgets:</b>",
        "text": "The following tag controls, used in some of the samples, can be a starting point for your own custom tag controls. Some are very rudimentary, others are more advanced and complete. "
      },
      {
        "_type": "para",
        "title": "<b>{{tabs/}}</b>:",
        "text": "<ul>\n  <li><a href=\"download/sample-tag-controls/tabs/tabs.js\">tabs.js</a> used in the\n    <a href=\"#samples/tag-controls/tabs\">tabs</a> sample\n  </li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "<b>{{tree/}}</b>:",
        "text": "<ul>\n  <li><a href=\"download/sample-tag-controls/treeview/tree-if.js\">tree-if.js</a> used in the\n    <a href=\"#samples/tag-controls/tree/if-binding\">tree (if-binding)</a> sample\n  </li>\n  <li><a href=\"download/sample-tag-controls/treeview/tree-visible.js\">tree-if.js</a> used in the\n    <a href=\"#samples/tag-controls/tree/visible-binding\">tree (visible-binding)</a> sample\n  </li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "<b>{{textbox/}}</b>:",
        "text": "<ul>\n  <li><a href=\"download/sample-tag-controls/textbox/simple-textbox.js\">simple-textbox.js</a> used in the\n    <a href=\"#samples/tag-controls/edit/simple-textbox\">simple textbox</a> sample\n  </li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "<b>{{edit/}}</b>:",
        "text": "<ul>\n  <li><a href=\"download/sample-tag-controls/generic-edit/edit.js\">edit.js</a> used in the\n    <a href=\"#samples/tag-controls/edit\">edit</a>,\n    <a href=\"#samples/tag-controls/datepicker\">datepicker</a>,\n    <a href=\"#samples/tag-controls/slider\">slider</a>\n    and <a href=\"#samples/tag-controls/validate\">validate</a> samples\n  </li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "<b>{{validate/}}</b> and <b>{{validation/}}</b>:",
        "text": "<ul>\n  <li><a href=\"download/sample-tag-controls/validate/validate.js\">validate.js</a> used in the\n    <a href=\"#samples/tag-controls/datepicker/with-validation\">datepicker with validation</a>,\n    <a href=\"#samples/tag-controls/datepicker/with-validation-wizard\">datepicker with validation wizard</a>,\n    <a href=\"#samples/tag-controls/slider/with-validation\">slider with validation</a>,<br/>\n    <a href=\"#samples/tag-controls/validate/simple\">validate simple</a>\n    and <a href=\"#samples/tag-controls/validate/group\">validate group</a> samples\n  </li>\n</ul>"
      },
      {
        "_type": "para",
        "title": "<b>{{range/}}</b>:",
        "text": "<ul>\n  <li><a href=\"download/sample-tag-controls/range/range.js\">range.js</a> used in the\n    <a href=\"#samples/jsr/tags/extend-for\">extending for</a> JsRender sample and the <a href=\"#samples/tag-controls/range\">range</a> JsViews sample\n  </li>\n</ul>"
      }
    ]
  }
};