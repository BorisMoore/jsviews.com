(function(global, $, undefined) {
  // global is the 'this' object (window when running in browser).
"use strict";

var key,
  sectionTypes = {
  para: {
    _type: "para",
    title: "",
    text: "paragraph"
  },
  api: {
    _type: "api",
    typeLabel: "API:",
    title: "",
    name: "name",
    object: "",
    method: true,
    returns: "",
    signatures: [],
    description: "",
    sectionTypes: {}
  },
  tag: {
    _type: "tag",
    typeLabel: "Tag:",
    title: "",
    name: "name",
    signatures: [],
    description: "",
    sectionTypes: {}
  },
  data: {
    _type: "data",
    title: "",
    data: {}
  },
  template: {
    _type: "template",
    title: "",
    markup: "markup"
  },
  code: {
    _type: "code",
    title: "",
    code: "code..."
  },
  sample: {
    _type: "sample",
    typeLabel: "Sample:",
    codetabs: [],
    sectionTypes: {},
    sections: []
  },
  links: {
    _type: "links",
    title: "",
    links: [],
    topics: []
  }
};

for (key in sectionTypes) {
  switch (key) {
    case "api":
    case "tag":
      break;
    default:
      sectionTypes.api.sectionTypes[key]
        = sectionTypes.tag.sectionTypes[key]
        = key;  // Allow all section types to be inserted under an api or tag section except api and tag sections.
      if (key !== "sample") {
        // Allow all section types to be inserted under a sample section except api, tag and sample sections.
        sectionTypes.sample.sectionTypes[key] = key;
      }
  }
}

$.views.documentation = {
  content: {
    allowEdit: localStorage.getItem("JsViewsDocTopics/allowEdit") === "true",
    useStorage: localStorage.getItem("JsViewsDocTopics/useStorage") === "true",
    subTypes: {
      signature: {
        _type: "signature",
        title: "title",
        params: [],
        args: [],
        sections: [],
        example: "",
        description: ""
      },
      param: {
        _type: "param",
        name: "name",
        type: "string",
        optional: false,
        description: ""
      },
      link: {
        _type: "link",
        hash: "hash",
        label: ""
      },
      topic: {
        _type: "topic",
        hash: "hash",
        label: ""
      },
      codetab: {
        _type: "codetab",
        name: "",
        url: ""
      }
    },
    sectionTypes: sectionTypes
  }
};
})(this, this.jQuery);
