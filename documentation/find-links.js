var content = $.views.documentation.content;

content.find.links = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/find/links")) ||
{
  "links": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "(Work in progress. Other topics to follow…)\n"
      },
      {
        "_type": "links",
        "title": "",
        "text": ""
      }
    ]
  },
  "learning": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "MSDN ‘Client Insight’ articles on JsRender part one and\npart two\nTraining course: JsRender Fundamentals from John Papa on Pluralsight (3 hours of video)\nMore content coming soon…\n"
      }
    ]
  },
  "blogs": {
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Boris Moore’s blog: Dancing with data\nMore content coming soon…\n"
      }
    ]
  }
}