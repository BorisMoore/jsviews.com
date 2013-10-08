var content = $.views.documentation.content;

content.links = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/links")) ||
{
  "links": {
    "title": "Links",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "<em><small>(Work in progress. Other topics to follow...)</small></em>"
      },
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "learning",
            "label": "Learning"
          },
          {
            "hash": "blogs",
            "label": "Blogs"
          }
        ]
      }
    ]
  },
  "learning": {
    "title": "",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "MSDN 'Client Insight' articles on JsRender <a href=\"http://msdn.microsoft.com/en-us/magazine/hh882454.aspx\" >part one</a> and\n<a href=\"http://msdn.microsoft.com/en-us/magazine/hh975379.aspx\" >part two</a>\n"
      },
      {
        "_type": "para",
        "title": "",
        "text": "Training course: <a href=\"http://johnpapa.net/new-course-on-jsrender-templating-fundamentals-with-javascript\" >JsRender Fundamentals</a> from John Papa on <a href=\"http://pluralsight.net/\" >Pluralsight</a> (3 hours of video)"
      },
      {
        "_type": "para",
        "title": "",
        "text": "More content coming soon..."
      }
    ]
  },
  "blogs": {
    "title": "",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Boris Moore's blog: <a href=\"http://www.borismoore.com\"><em>Dancing with data</em></a>"
      },
      {
        "_type": "para",
        "title": "",
        "text": "More content coming soon..."
      }
    ]
  }
};