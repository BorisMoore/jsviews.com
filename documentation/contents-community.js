var content = $.views.documentation.content;

content.community = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/community")) ||
{
  "community": {
    "title": "JsViews and JsRender Community",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "StackOverflow",
        "text": "There are active tags for both JsRender and JsViews, on StackOverflow.com:\n\n<a href=\"http://stackoverflow.com/questions/tagged/jsrender\">JsRender on StackOverflow</a><br/>\n<a href=\"http://stackoverflow.com/questions/tagged/jsviews\">JsViews on StackOverflow</a>\n\n"
      },
      {
        "_type": "para",
        "title": "Forum",
        "text": "No forum as yet, but a forum will be created for both JsViews and JsRender, when JsViews reaches V1.0..."
      },
      {
        "_type": "para",
        "title": "Issue trackers on GitHub",
        "text": "If you have questions or issues, you can look for them on the issue trackers on GitHub, and if you don't find them, file a new issue. (And similarly for feature requests):\n\n<a href=\"https://github.com/BorisMoore/jsrender/issues?state=open\">JsRender issue tracker on GitHub</a><br/>\n<a href=\"https://github.com/BorisMoore/jsviews/issues?state=open\">JsViews issue tracker on GitHub</a>\n\nMore details on the GitHub repositories <a href=\"#github\">here</a>.",
        "anchor": "issues"
      }
    ]
  },
  "github": {
    "title": "JsRender, JsViews and JsObservable source code on GitHub",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "<b>JsViews source code</b>",
        "text": "JsViews and JsObservable are available under the <a href=\"https://raw.github.com/BorisMoore/jsviews/master/MIT-LICENSE.txt\">MIT License</a>.\n\nThe source code for both JsViews and JsObservable is developed on the <a href=\"https://github.com/BorisMoore/jsviews\">github.com/BorisMoore/jsviews</a> GitHub repository."
      },
      {
        "_type": "para",
        "title": "<b>JsRender source code</b>",
        "text": "JsRender is available under the <a href=\"https://raw.github.com/BorisMoore/jsrender/master/MIT-LICENSE.txt\">MIT License</a>.\n\nJsRender source code is developed on a separate GitHub repository, at <a href=\"https://github.com/BorisMoore/jsrender\">github.com/BorisMoore/jsrender</a>."
      },
      {
        "_type": "para",
        "title": "<b>jsviews.com</b> &ndash; <em>Source code for this single page app web site:</em>",
        "text": "This <em>www.jsviews.com</em> web site is a single page app, built entirely using JsViews. Source code is also on GitHub, on the <a href=\"https://github.com/BorisMoore/jsviews.com\">github.com/BorisMoore/jsviews.com</a> GitHub repository."
      },
      {
        "_type": "para",
        "title": "<b>Issue trackers on GitHub</b>",
        "text": "If you have questions or issues, you can look for them on the issue trackers on GitHub, and if you don't find them, file a new issue. (And similarly for feature requests):\n\nJsRender issue tracker: <a href=\"https://github.com/BorisMoore/jsrender/issues?state=open\">open issues</a> / \n<a href=\"https://github.com/BorisMoore/jsrender/issues?state=closed\">closed issues</a><br/>\nJsViews issue tracker: <a href=\"https://github.com/BorisMoore/jsviews/issues?state=open\">open issues</a> / <a href=\"https://github.com/BorisMoore/jsviews/issues?state=open\">closed issues</a>",
        "anchor": "issues"
      }
    ]
  }
};