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
        "text": "Uncompressed (for development): <a href=\"download/jsrender.js\">jsrender.js</a>.<br />Compressed (for production): <a href=\"download/jsrender.min.js\">jsrender.min.js</a>. (Source map available <a href=\"download/jsrender.min.js.map\">here</a>)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsViews - single file <span>(includes JsRender, JsObservable and JsViews)</span></div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jsviews.js\">jsviews.js</a>.<br />Compressed (for production): <a href=\"download/jsviews.min.js\">jsviews.min.js</a>. (Source map available <a href=\"download/jsviews.min.js.map\">here</a>)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsViews and JsObservable - separate files <span>(to be used with jsrender.js)</span></div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jquery.views.js\">jquery.views.js</a>.<br />Compressed (for production): <a href=\"download/jquery.views.min.js\">jquery.views.min.js</a>. (Source map available <a href=\"download/jquery.views.min.js.map\">here</a>)."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jquery.observable.js\">jquery.observable.js</a>.<br />Compressed (for production): <a href=\"download/jquery.observable.min.js\">jquery.observable.min.js</a>. (Source map available <a href=\"download/jquery.observable.min.js.map\">here</a>)."
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
        "text": "<b>Status: </b>JsRender is currently beta. V1.0 is planned to be available right after JsViews official beta release is complete."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jsrender-1.0.0-beta.js\">jsrender-1.0.0-beta.js</a>.<br />Compressed (for production): <a href=\"download/jsrender-1.0.0-beta.min.js\">jsrender-1.0.0-beta.min.js</a>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsViews pre beta <span>(single file version)</span></div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "<b>Status: </b>JsViews is currently a beta candidate. It will be officially labelled \"beta\" as soon as reasonably complete documentation for the JsViews and JsObservable APIs has been made available on this site. (Coming soon...)"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jquery.views-1.0.0-alpha.js\">jquery.views-1.0.0-alpha.js</a>.<br />Compressed (for production): <a href=\"download/jquery.views-1.0.0-alpha.min.js\">jquery.views-1.0.0-alpha.min.js</a>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "Uncompressed (for development): <a href=\"download/jquery.observable-1.0.0-alpha.js\">jquery.observable-1.0.0-alpha.js</a>.<br />Compressed (for production): <a href=\"download/jquery.observable-1.0.0-alpha.min.js\">jquery.observable-1.0.0-alpha.min.js</a>."
      }
    ]
  }
};