var content = $.views.documentation.content,
useStorage = content.allowEdit;

content.links = useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopicslinks")) ||
{
  "links": {
    "title": "Links",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "Content coming soon..."
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
        "text": "Content coming soon..."
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
        "text": "Content coming soon..."
      }
    ]
  }
};