var content = $.views.documentation.content;

content.community = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/community")) ||
{
  "community": {
    "title": "JsViews and JsRender Community",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "<em><small>(Work in progress. Other topics to follow...)</small></em>\n\n<div class=\"title\">StackOverflow</div>\n\nThere are active tags for both JsRender and JsViews, on StackOverflow.com:\n\n<a href=\"http://stackoverflow.com/questions/tagged/jsrender\">JsRender on StackOverflow</a><br/>\n<a href=\"http://stackoverflow.com/questions/tagged/jsviews\">JsViews on StackOverflow</a>\n\n<div class=\"title\">Forum</div>\n\nNo forum as yet, but a forum will be created for both JsViews and JsRender, when JsViews reaches official beta...\n\n<div class=\"title\">Issue trackers on GitHub</div>\n\nIf you have questions or issues, you can look for them on the issue trackers on GitHub, and if you don't find them, file a new issue. (And similarly for feature requests):\n\n<a href=\"https://github.com/BorisMoore/jsrender/issues?state=open\">JsRender issue tracker on GitHub</a><br/>\n<a href=\"https://github.com/BorisMoore/jsviews/issues?state=open\">JsViews issue tracker on GitHub</a>\n\nMore details on the GitHub repositories <a href=\"#github\">here</a>."
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
        "text": "<div class=\"title\">JsViews source code</div>\n\nJsViews and JsObservable are available under the <a href=\"https://raw.github.com/BorisMoore/jsviews/master/MIT-LICENSE.txt\">MIT License</a>.\n\nThe source code for both JsViews and JsObservable is developed on the <a href=\"https://github.com/BorisMoore/jsviews\">github.com/BorisMoore/jsviews</a> GitHub repository.\n\n<div class=\"title\">JsRender source code</div>\n\nJsRender is available under the <a href=\"https://raw.github.com/BorisMoore/jsrender/master/MIT-LICENSE.txt\">MIT License</a>.\n\nJsRender source code is developed on a separate GitHub repository, at <a href=\"https://github.com/BorisMoore/jsrender\">github.com/BorisMoore/jsrender</a>.\n\n<div class=\"title\">jsviews.com: <span>Source code for this single page app web site:</span></div>\n\nThis <em>www.jsviews.com</em> web site is a single page app, built entirely using JsViews. Source code is also on GitHub, on the <a href=\"https://github.com/BorisMoore/jsviews.com\">github.com/BorisMoore/jsviews.com</a> GitHub repository."
      },
      {
        "_type": "para",
        "title": "<div class=\"title\">Issue trackers on GitHub</div>",
        "text": "\n\nIf you have questions or issues, you can look for them on the issue trackers on GitHub, and if you don't find them, file a new issue. (And similarly for feature requests):\n\nJsRender issue tracker: <a href=\"https://github.com/BorisMoore/jsrender/issues?state=open\">open issues</a> / \n<a href=\"https://github.com/BorisMoore/jsrender/issues?state=closed\">closed issues</a><br/>\nJsViews issue tracker: <a href=\"https://github.com/BorisMoore/jsviews/issues?state=open\">open issues</a> / <a href=\"https://github.com/BorisMoore/jsviews/issues?state=open\">closed issues</a>"
      }
    ]
  }
};