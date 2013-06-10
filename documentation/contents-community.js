var content = $.views.documentation.content,
useStorage = content.allowEdit;

content.community = useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopicscommunity")) ||
{
  "community": {
    "title": "JsViews and JsRender Community",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "(Additional content coming soon)"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Source code and issue trackers for filing bug reports and feature requests are maintained on <a href=\"#github\">GitHub</a>.\n"
      }
    ]
  },
  "github": {
    "title": "JsRender, JsViews and JsObservable source code on GitHub",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsViews source code</div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "JsViews and JsObservable are available under the <a href=\"https://raw.github.com/BorisMoore/jsviews/master/MIT-LICENSE.txt\">MIT License</a>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "The source code for both JsViews and JsObservable is developed on the <a href=\"https://github.com/BorisMoore/jsviews\">github.com/BorisMoore/jsviews</a> GitHub repository."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">JsRender source code</div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "JsRender is available under the <a href=\"https://raw.github.com/BorisMoore/jsrender/master/MIT-LICENSE.txt\">MIT License</a>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "JsRender source code is developed on a separate GitHub repository, at <a href=\"https://github.com/BorisMoore/jsrender\">github.com/BorisMoore/jsrender</a>."
      },
      {
        "_type": "para",
        "title": "",
        "text": "<div class=\"title\">jsviews.com: <span>Source code for this single page app web site:</span></div>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "This <em>jsviews.com</em> web site is a single page app, built entirely using JsViews. Source code is also on GitHub, on the <a href=\"https://github.com/BorisMoore/jsviews.com\">github.com/BorisMoore/jsviews.com</a> GitHub repository."
      }
    ]
  }
};