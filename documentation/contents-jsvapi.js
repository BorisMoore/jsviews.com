var content = $.views.documentation.content;

content.jsvapi = content.useStorage && $.parseJSON(localStorage.getItem("JsViewsDocTopics/jsvapi")) ||
{
  "jsvapi": {
    "title": "JsViews",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvtags",
            "label": "Template tags"
          },
          {
            "hash": "jsvtmplrender",
            "label": "Render a template"
          },
          {
            "hash": "jsvlinktmpl",
            "label": "Render and link a template"
          },
          {
            "hash": "jsvunlink",
            "label": "Unlink a template"
          },
          {
            "hash": "$view",
            "label": "Access views"
          },
          {
            "hash": "jsvtmplcompile",
            "label": "Compile/register/get a template"
          },
          {
            "hash": "jsvregister",
            "label": "Register helpers, converters, tags..."
          },
          {
            "hash": "jsvtagcontrols",
            "label": "Custom Tags - Tag Controls"
          },
          {
            "hash": "jsrobjects",
            "label": "JsViews objects"
          }
        ]
      }
    ]
  },
  "jsvtags()": {
    "title": "$.views.tags()",
    "path": "",
    "sections": []
  },
  "jsvrendertmpl": {
    "title": "Render a template",
    "path": "",
    "sections": [
      {
        "_type": "para",
        "title": "",
        "text": "paragraph"
      }
    ]
  },
  "jsvlinktmpl": {
    "title": "Render and link a template",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvtmpllink",
            "label": "template.link()"
          },
          {
            "hash": "jsv$link",
            "label": "$.link()"
          },
          {
            "hash": "jsv$()link",
            "label": "$(...).link()"
          }
        ]
      }
    ]
  },
  "jsvtmpllink": {
    "title": "template.link()",
    "path": "",
    "sections": []
  },
  "jsv$link": {
    "title": "$.link()",
    "path": "",
    "sections": []
  },
  "jsv$()link": {
    "title": "$(...).link()",
    "path": "",
    "sections": []
  },
  "jsvunlink": {
    "title": "Unlink a template",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvtmplunlink",
            "label": "template.unlink()"
          },
          {
            "hash": "jsv$unlink",
            "label": "$.unlink()"
          },
          {
            "hash": "jsv$()unlink",
            "label": "$(...).unlink()"
          }
        ]
      }
    ]
  },
  "jsvtmplunlink": {
    "title": "template.unlink()",
    "path": "",
    "sections": []
  },
  "jsv$unlink": {
    "title": "$.unlink()",
    "path": "",
    "sections": []
  },
  "jsv$()unlink": {
    "title": "$(...).unlink()",
    "path": "",
    "sections": []
  },
  "$view": {
    "title": "Access views",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsv$view",
            "label": "$.view()"
          },
          {
            "hash": "jsv$()view()",
            "label": "$(...).view()"
          }
        ]
      }
    ]
  },
  "jsv$view": {
    "title": "$.view()",
    "path": "",
    "sections": []
  },
  "jsv$()view()": {
    "title": "$(...).view()",
    "path": "",
    "sections": []
  },
  "jsvcompiletmpl": {
    "title": "$(...).view()",
    "path": "",
    "sections": []
  },
  "jsvregister": {
    "title": "Register helpers, converters, tags...",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvconverters()",
            "label": "$.views.converters()"
          },
          {
            "hash": "jsvtags()",
            "label": "$.views.tags()"
          },
          {
            "hash": "jsvhelpers()",
            "label": "$.views.helpers()"
          }
        ]
      }
    ]
  },
  "jsvconverters()": {
    "title": "$.views.converters()",
    "path": "",
    "sections": []
  },
  "jsvtags": {
    "title": "Template tags",
    "path": "",
    "sections": []
  },
  "jsvhelpers()": {
    "title": "$.views.helpers()",
    "path": "",
    "sections": []
  },
  "jsvtagcontrols": {
    "title": "Custom Tags - Tag Controls",
    "path": "",
    "sections": []
  },
  "jsvobjects": {
    "title": "JsViews objects",
    "path": "",
    "sections": [
      {
        "_type": "links",
        "title": "",
        "links": [],
        "topics": [
          {
            "hash": "jsvviewsobject",
            "label": "$.views object"
          },
          {
            "hash": "jsvtemplateobject",
            "label": "template object"
          },
          {
            "hash": "jsvviewobject",
            "label": "view object"
          },
          {
            "hash": "jsvtagobject",
            "label": "tag object"
          },
          {
            "hash": "jsvviewcontextobject",
            "label": "View context object"
          },
          {
            "hash": "jsvtagcontextobject",
            "label": "Tag context object"
          },
          {
            "hash": "jsvlinkcontextobject",
            "label": "Link context object"
          }
        ]
      }
    ]
  },
  "jsvviewsobject": {
    "title": "$.views object",
    "path": "",
    "sections": []
  },
  "jsvtemplateobject": {
    "title": "template object",
    "path": "",
    "sections": []
  },
  "jsvviewobject": {
    "title": "view object",
    "path": "",
    "sections": []
  },
  "jsvtagobject": {
    "title": "tag object",
    "path": "",
    "sections": []
  },
  "jsvviewcontextobject": {
    "title": "View context object",
    "path": "",
    "sections": []
  },
  "jsvtagcontextobject": {
    "title": "Tag context object",
    "path": "",
    "sections": []
  },
	"jsvlinkcontextobject": {
    "title": "Link context object",
    "path": "",
    "sections": []
  }
};
