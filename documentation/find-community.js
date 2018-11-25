var content = $.views.documentation.content;

content.find.community = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/community")) ||
{
  "community": {
    "sections": [
      {
        "_type": "para",
        "title": "StackOverflow",
        "text": "StackOverflow\nThere are active tags for both JsRender and JsViews, on StackOverflow.com:\nJsRender on StackOverflow\nJsViews on StackOverflow\n"
      },
      {
        "_type": "para",
        "title": "Forum",
        "text": "Forum\nNo forum as yet, but a forum will be created for both JsViews and JsRender, when JsViews reaches V1.0…\n"
      },
      {
        "_type": "para",
        "title": "Issue trackers on GitHub",
        "text": "Issue trackers on GitHub\nIf you have questions or issues, you can look for them on the issue trackers on GitHub, and if you don’t find them, file a new issue. (And similarly for feature requests):\nJsRender issue tracker on GitHub\nJsViews issue tracker on GitHub\nMore details on the GitHub repositories here.\n"
      }
    ]
  },
  "github": {
    "sections": [
      {
        "_type": "para",
        "title": "<b>JsViews source code</b>",
        "text": "JsViews source code\nJsViews and JsObservable are available under the MIT License.\nThe source code for both JsViews and JsObservable is developed on the github.com/BorisMoore/jsviews GitHub repository.\n"
      },
      {
        "_type": "para",
        "title": "<b>JsRender source code</b>",
        "text": "JsRender source code\nJsRender is available under the MIT License.\nJsRender source code is developed on a separate GitHub repository, at github.com/BorisMoore/jsrender.\n"
      },
      {
        "_type": "para",
        "title": "<b>jsviews.com</b> &ndash; <em>Source code for this single page app web site:</em>",
        "text": "jsviews.com – Source code for this single page app web site:\nThis www.jsviews.com web site is a single page app, built entirely using JsViews. Source code is also on GitHub, on the github.com/BorisMoore/jsviews.com GitHub repository.\n"
      },
      {
        "_type": "para",
        "title": "<b>Issue trackers on GitHub</b>",
        "text": "Issue trackers on GitHub\nIf you have questions or issues, you can look for them on the issue trackers on GitHub, and if you don’t find them, file a new issue. (And similarly for feature requests):\nJsRender issue tracker: open issues /\nclosed issues\nJsViews issue tracker: open issues / closed issues\n"
      }
    ]
  }
}