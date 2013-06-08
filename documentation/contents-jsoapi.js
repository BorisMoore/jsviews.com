var content = $.views.documentation.content,
useStorage = content.allowEdit;

content.jsoapi = useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/jsoapi")) ||
{
  "jsoapi": {
    "title": "JsObservable",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "propchange",
            "label": "Modify an object observably"
          },
          {
            "hash": "arrchange",
            "label": "Modify an array observably"
          },
          {
            "hash": "observeobjectsarrays",
            "label": "Observe objects and arrays"
          }
        ]
      }
    ]
  },
  "propchange": {
    "title": "Modify an object observably",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "setprop",
            "label": "$.observable(object).setProperty()"
          }
        ]
      }
    ]
  },
  "setprop": {
    "title": "$.observable(object).setProperty()",
    "path": "",
    "sections": []
  },
  "arrchange": {
    "title": "Modify an array observably",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "insert",
            "label": "$.observable(array).insert()"
          },
          {
            "hash": "remove",
            "label": "$.observable(array).remove()"
          },
          {
            "hash": "refresh",
            "label": "$.observable(array).refresh()"
          },
          {
            "hash": "move",
            "label": "$.observable(array).move()"
          }
        ]
      }
    ]
  },
  "insert": {
    "title": "$.observable(array).insert()",
    "path": "",
    "sections": []
  },
  "remove": {
    "title": "$.observable(array).remove()",
    "path": "",
    "sections": []
  },
  "refresh": {
    "title": "$.observable(array).refresh()",
    "path": "",
    "sections": []
  },
  "move": {
    "title": "$.observable(array).move()",
    "path": "",
    "sections": []
  },
  "observeobjectsarrays": {
    "title": "Observe objects and arrays",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "onpropchange",
            "label": "onPropertyChange"
          },
          {
            "hash": "onarrchange",
            "label": "onArrayChange"
          },
          {
            "hash": "observe",
            "label": "$.observable.observe()"
          },
          {
            "hash": "unobserve",
            "label": "unobserve()"
          }
        ]
      }
    ]
  },
  "onpropchange": {
    "title": "onPropertyChange",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "propchangehandler",
            "label": "PropertyChangeEventHandler"
          },
          {
            "hash": "propchangeevargs",
            "label": "PropertyChangeEventArguments"
          }
        ]
      }
    ]
  },
  "propchangehandler": {
    "title": "PropertyChangeEventHandler",
    "path": "",
    "sections": []
  },
  "propchangeevargs": {
    "title": "PropertyChangeEventArguments",
    "path": "",
    "sections": []
  },
  "onarrchange": {
    "title": "onArrayChange",
    "path": "",
    "sections": []
  },
  "observe": {
    "title": "Observing data",
    "path": "",
    "sections": []
  },
  "unobserve": {
    "title": "unobserve()",
    "path": "",
    "sections": []
  }
};
