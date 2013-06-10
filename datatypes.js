(function(global, $, undefined) {
  // global is the this object, which is window when running in the usual browser environment.
"use strict";

var sectionTypes = { 
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

$.map(sectionTypes, function(value, key) {
  switch (key) {
    case "api":
    case "tag":
      break;
    default:
      sectionTypes.api.sectionTypes[key]
        = sectionTypes.tag.sectionTypes[key]
        = sectionTypes.sample.sectionTypes[key]
        = key;  // Allow all section types to be inserted under an api or sample section except api and links sections.
  }
});

$.views.documentation = {
  content: {
  allowEdit:false, // localStorage.getItem("JsViewsDocTopicsAllowEdit"),
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
    }
  },
  sectionTypes: sectionTypes
}
};
})(this, this.jQuery);
