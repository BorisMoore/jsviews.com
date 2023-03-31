/*! JsViews jQueryUI widget integration v1.0.5
see: http://www.jsviews.com/#download/jqueryui-tagcontrols */
/*
 * https://www.jsviews.com/download/sample-tag-controls/jsviews-jqueryui-widgets.js
 * Copyright 2023, Boris Moore
 * Released under the MIT License.
 */

/* Wrap behavior (wrapping HTML content) and default element, for each widget: */

/*       autocomplete button   buttonset droppable   menu        progressbar  resizable
 * wrap: -            wrap     -         wrap        wrap        wrap         wrap     
 * elem: input        button   -         -           ul          div          div      
 */

/*       selectable   slider   spinner   timespinner  tabs       sortable     draggable
 * wrap: wrap         -        -         -            wrap       wrap         wrap     
 * elem: -            div      input     input        -          -            -      
 */

/*       accordion    checkbox radio     controlgroup selectmenu datepicker
 * wrap: wrap         -        -         wrap         wrap       wrap
 * elem: -            div      input     span         selectv    input
 */

(function(global, $, undefined) {
"use strict";

if (!$ || !$.fn || !$.ui || !$.views) {
  // jQuery is not loaded.
  throw "jsviews-jqueryui-widgets.js requires jQuery, jQuery UI and JsViews";
}

function getConverter(tag, cvt) {
  return cvt + "" === cvt ? tag.tagCtx.view.getRsc("converters", cvt) : cvt;
}

function checkboxRadioOnBind() {
  var tag = this,
    props = tag.tagCtx.props,
    elem = tag.mainElem[0];
    tag.baseApply(arguments);

  if (props.name) {
    elem.name = props.name;
  }
  if (props.value) {
    elem.value = props.value;
  }

  tag.displayElem = tag.widget.label;
}

function checkboxRadioOnAfterLink(tagCtx, linkCtx) {
  var tag = this,
    props = tagCtx.props;

  tag.baseApply(arguments);

  if (props.label && props.label !== tag.widget.options.label) {
    tag.widget.option("label", props.label);
  }
}

function tabsAccordionOnBind() {
  var tag = this;
  tag.mainElem.on("jsv-domchange", function(ev, tagCtx, linkCtx, eventArgs) {
    var newSelected,
      selected = tag.widget.options.active;

    tag.widget.refresh();
    newSelected = tag.widget.options.active;

    if (selected !== newSelected) {
      tag.updateValue(newSelected);
    }
  });
}

function tabsAccordionOptions() {
  var tag = this;
  return {
    activate: function(evt, ui) {
      // Raise elemChangeHandler event when selected tab changes - for two-way binding to arg(0)
      tag.updateValue(tag.widget.options.active);
    }
  };
}

function initDataFormatter(tag, tagCtx) { // Used by datepicker and spinner
  // Initialize the data formatter
  var dataFormatter,
    dataFormat = tagCtx.props.dataFormat;
  if (dataFormat === undefined) {
    dataFormat = tag.dataFormat;
  }
  dataFormatter = dataFormat && dataFormat.parse
    ? dataFormat
    : tag.dataFormatter;

  // Formatter can be provided as tag.dataFormat or tagCtx.props.dataFormat
  tag.parseData = function(data) {
    return dataFormatter.parse.call(tag, data, tag.tagCtx.props);
  };
  tag.formatData = function(date) {
    return dataFormatter.format.call(tag, date, tag.tagCtx.props);
  };
  return dataFormat;
}

var tagDefs = {
// ============================= WIDGET =============================
widget: {
  argDefault: false, // Do not default missing arg to #data
  mainElement: "*",
  init: function(tagCtx) {
    var content, elemType,
      tag = this;

    if (tag.inline) {
      content = tagCtx.tmpl.markup;
      if (!tag.template && (elemType = tagCtx.props.elem || tag.elem)) {
        if (content) {
          if (tag.wrap) {
            tag.template = "<"+elemType+">" + $.trim(content) + "</"+elemType+">";
          }
        } else {
          tag.template = (elemType === "input") ? "<input/>" : "<"+elemType+"></"+elemType+">";
        }
      }
      tag.attr = "html";
    }
  },
  onBind: function(tagCtx) {
    var mainElem, prop, i, optionKey,
      tag = this,
      presets = tag.initOptions || [], // initOptions: array of option names that when set declaratively
                                 // as tag options will be set on creation, not on afterLink
      widgetName = tag.widgetName,
      options = tag.options,     // hash (or function returning hash) of option settings
      widgetFullName = widgetName,
      presetsHash = {};

    presets.push("create");

    widgetName = widgetName.split("-").pop();

    i = presets.length;
    while (i--) {
      optionKey = presets[i];
      if (prop = tagCtx.props["_" + optionKey]) {
        presetsHash[optionKey] = prop;
      }
    }
    if (widgetFullName === widgetName) {
      widgetFullName = "ui-" + widgetName;
    }

    mainElem = tag.mainElem;
    if (!mainElem || !mainElem[0]) {
      // This may be due to using {{myWidget}} No element found here {{/myWidget}} 
      throw "No element found for tag '" + tag.tagName +"'";
    }

    if (tagCtx.props.id && !mainElem[0].id) {
      mainElem[0].id = tagCtx.props.id;
    }

    // Instantiate widget
    mainElem[widgetName](presetsHash);

    // Store widget instance
    tag.widget = mainElem.data(widgetFullName) || mainElem.data(widgetName);

    if (!tag.widget) {
      // Widget failed to load, or is not a valid widget factory type
      throw "widget '" + widgetName + "' failed";
    }

    if (options) {
      if ($.isFunction(options)) {
        options = tag.options();
      }
      mainElem[widgetName]("option", options); // initialize options
    }
  },
  onAfterLink: function(tagCtx) {
    var mainElem,
      tag = this,
      options = tag.options, // hash (or function returning hash) of option settings
      props = tagCtx.props,
      widgetName = tag.widgetName.split("-").pop();
    if ($.isFunction(options)) {
      options = tag.options();
    }
    mainElem = tag.mainElem;
    $.each(props, function(key, prop) {
      var option;
      if (key.charAt(0) === "_") {
        key = key.slice(1);
        option = options && options[key];
        if (mainElem[widgetName]("option", key) != prop) { // != so undefined and null are considered equivalent
          mainElem[widgetName]("option", key,
            option && $.isFunction(option) && prop && $.isFunction(prop)
              ? function() {
                // If the same event function option is overridden on the tagDef options
                // (or in a _create override) and the tagCtx.props, call first the one on
                // the tagDef options, and then the one declared on the tag properties.
                option.apply(mainElem[0], arguments);
                return prop.apply(mainElem[0], arguments);
              }
              : prop
            );
        }
      }
    });
  },
  onUpdate: false, // Don't rerender whole tag on update
  dataBoundOnly: true,
  attr: "none"
},
// ============================= BUTTON =============================
button: {
  baseTag: "widget",
  widgetName: "button",
  elem: "button",
  wrap: true,
  setSize: true,
  contentCtx: true,
  onBind: function(tagCtx, linkCtx) {
    var elem = this.mainElem[0];
      elem.innerHTML = elem.innerHTML || "&nbsp;"; // Fixes jQuery UI button issue if no label text
    this.baseApply(arguments);
  },
  onAfterLink: function(tagCtx, linkCtx, ctx, event) {
    this.baseApply(arguments);
    if (event) {
      this.widget.refresh();
    }
  }
},
// ============================= AUTOCOMPLETE =============================
autocomplete: {
  baseTag: "widget",
  widgetName: "autocomplete",
  linkedElement: "*",
  elem: "input",
  setSize: true,
  options: function() {
    var tag = this;
    return {
      change: function(evt, ui) {
        if (ui.item) {
          tag.updateValue(ui.item.value);
          // If there is a selected item, update bound value on keydown.
          // (Alternatively can set trigger=false to update on change)
        }
      },
      select: function(evt, ui) {
        if (ui.item) {
          tag.updateValue(ui.item.value);
        }
      },
      focus: function(evt, ui) {
        return false;
      }
    };
  }
},
// ============================= CHECKBOX =============================
checkbox: {
  baseTag: "widget",
  widgetName: "checkboxradio",
  template: "<label><input type='checkbox'/></label>",
  mainElement: "input",
  linkedElement: "input",
  setSize: true,
  onBind: checkboxRadioOnBind,
  onAfterLink: checkboxRadioOnAfterLink,
  setValue: function(val) {
    var tag = this,
      elem = this.mainElem[0],
      checked = val && val !== "false";
    if (elem.checked !== checked) {
      elem.checked = checked;
      tag.widget.refresh();
    }
  }
},
// ============================= RADIO =============================
radio: {
  baseTag: "widget",
  widgetName: "checkboxradio",
  template: "<label><input type='radio'/></label>",
  mainElement: "input",
  setSize: true,
  onBind: function() {
    var radiogroup = this.parents.radiogroup;
    checkboxRadioOnBind.apply(this, arguments);
    if (radiogroup && !radiogroup._d) {
      radiogroup.onAfterLink = $.views.sub._gm(radiogroup.onAfterLink, function() { // Get derived method
        var widget,
          val = radiogroup.bndArgs()[0],
          disabled = !!radiogroup.tagCtx.props.disabled,
          radios = radiogroup.childTags("radio"),
          l = radios.length;
        while (l--) {
          radios[l].setValue(val);
          widget = radios[l].widget;
          if (disabled !== widget.options.disabled) {
            widget.option("disabled", disabled);
          }
        }
        this.baseApply(arguments); // Call base onAfterLink()
      });
      radiogroup._d = true;
    }
  },
  onAfterLink: checkboxRadioOnAfterLink,

  setValue: function(val) {
    var elem = this.mainElem[0],
    checked = val === elem.value;
    if (elem.checked !== checked) {
      elem.checked = checked;
    }
    this.widget.refresh();
  }
},
// ============================= CONTROLGROUP =============================
controlgroup: {
  baseTag: "widget",
  widgetName: "controlgroup",
  elem: "span",
  wrap: true,
  contentCtx: true,
  onBind: function() {
    var tag = this;
    tag.baseApply(arguments);
    tag.mainElem.on("jsv-domchange", function() {
      tag.widget.refresh();
    });
  }
},
// ============================= DATEPICKER =============================
datepicker: {
  baseTag: "widget",
  widgetName: "datepicker",
  linkedElement: "*",
  elem: "input",
  setSize: true,
  dataFormat: true,
  dataFormatter: { // Data formatter from data to Date
    // Default data formatter uses built-in datepicker formatter.
    // Override as tag.dataFormat in tagDef or as tagCtxprops.dataFormat
    parse: function(data, props) {
      return $.datepicker.parseDate(this.dataFormat, data);
    },
    format: function(date, props) {
      return $.datepicker.formatDate(this.dataFormat, date);
    }
  },
  init: function(tagCtx) {
    var tag = this,
      dateFormat = tag.dateFormat = tagCtx.props.dateFormat
        || tagCtx.props._dateFormat // Can set as _dateFormat=... or as dateFormat=...
        || tag.dateFormat // or set as property in tagDef
        || $.datepicker._defaults.dateFormat, // or use internal date-picker default
      cvt = getConverter(tag, tag.convert),
      cvtBk = getConverter(tag, tag.convertBack),
      dataFormat = initDataFormatter(tag, tagCtx);
      tag.dataFormat = dataFormat === true ? tag.dateFormat : dataFormat;

    tag.convert = function(val) {
      // Wrapped converter calls converter then does widget format
      val = cvt ? cvt.call(tag, val) : val;
      if (tag.dataFormat && ("" + val === val)) {
        val = tag.parseData(val);
      }
      return $.datepicker.formatDate(dateFormat, dataFormat === 0 ? new Date(val) : val);
    };
    tag.convertBack = function(val) {
      // Wrapped converter, does widget parse then calls converter
      val = $.datepicker.parseDate(dateFormat, val);
      val = dataFormat ? tag.formatData(val) : dataFormat === 0 ? +val : val;
      return cvtBk ? cvtBk.call(tag, val) : val;
    };
    // Prevent onAfterLink replacing wrapped converters with unwrapped ones
    tag.convert.fix = tag.convertBack.fix = true;
    tag.baseApply(arguments);
  },
  options: function() {
    var tag = this;
    return {
      onSelect: function(dateText) {
        tag.value = dateText;
        tag.updateValue(dateText);
      }
    };
  },
  onBind: function(tagCtx) {
    var tag = this;
    tag.baseApply(arguments);
    tag.mainElem.datepicker("option", "dateFormat", tag.dateFormat);
    if (tag.mainElem[0].tagName !== "INPUT") {
      // This datepicker is not using an input (e.g. using a div) - so set to inline-
      tag.mainElem.css("display", "inline-block");
    } else {
      tag.tagCtx.props.trigger = false;
    }
  },
  setValue: function(value) {
    var tag = this;
    if (value !== undefined && value !== tag.value) {
      tag.value = value;
      tag.mainElem.datepicker("setDate", value);
    }
  },
  getValue: function() {
    return this.value;
  }
},
//dialog: { // Currently not supported. (Support would require overriding _createWrapper code.)
//  baseTag: "widget",
//  widgetName: "dialog",
//  wrap: true,
//  elem: "div"
//},
// ============================= DROPPABLE =============================
droppable: {
  baseTag: "widget",
  widgetName: "droppable",
  elem: "div",
  wrap: true,
  setSize: true,
  contentCtx: true,
  setValue: function(value) {
    if ($.isFunction(value)) {
      this.widget.option("drop", value); // Set the handler function for the drop action
    }
  }
},
// ============================= MENU =============================
menu: {
  baseTag: "widget",
  widgetName: "menu",
  elem: "ul",
  wrap: true,
  setSize: true,
  contentCtx: true,
  initOptions: ["menus", "items", "role"], // Options which need to be set on creation, not later
  setValue: function(value) {
    if ($.isFunction(value)) {
      this.widget.option("select", value); // Set the menu select handler
    }
  }
},
// ============================= PROGRESSBAR =============================
progressbar: {
  baseTag: "widget",
  widgetName: "progressbar",
  boundProps: ["busy"],
  elem: "div",
  wrap: true,
  setSize: true,
  contentCtx: true,
  setValue: function(value) {
    if (!this.tagCtx.props.busy) {
      this.widget.value(parseFloat(value) || 0);
    }
  },
  getValue: function() {
    return this.widget.value();
  },
  onAfterLink: function(tagCtx) {
    var tag = this;
    tag.baseApply(arguments);
    if (tagCtx.props.busy) {
      tag.widget.value(false);
    }
  }
},
// ============================= RESIZABLE =============================
resizable: {
  baseTag: "widget",
  widgetName: "resizable",
  bindTo: ["width", "height"],
  linkedCtxParam: ["width", "height"],
  elem: "div",
  wrap: true,
  contentCtx: true,
  options: function() {
    var tag = this;
    return {
      resize: function(evt, ui) {
        tag.updateValues(ui.size.width, ui.size.height, true); // Async update
        tag.setValues(ui.size.width, ui.size.height);
      }
    };
  },
  setValue: function(value, index) {
    if (value !== undefined) {
      this.mainElem[index ? "height" : "width"](value || 0);
    }
  },
  getValue: function() {
    return [this.mainElem.width(), this.mainElem.height()];
  }
},
// ============================= SELECTMENU =============================
selectmenu: {
  baseTag: "widget",
  widgetName: "selectmenu",
  elem: "select",
  wrap: true,
  setSize: true,
  contentCtx: true,
  options: function() {
    var tag = this;
    return {
      change: function(evt, ui) {
        tag.updateValue(ui.item.value);
      }
    };
  },
  onBind: function() {
    var tag = this;
    tag.baseApply(arguments);
    tag.displayElem = tag.widget.button;
    tag.mainElem.on("jsv-domchange", function() {
      tag.widget.refresh();
    });
  },
  setValue: function(value) {
    if (value !== undefined) {
      this.mainElem[0].value = value;
      this.widget.refresh();
    }
  },
  getValue: function() { 
    return this.mainElem[0].value;
  }
},
// ============================= SLIDER =============================
slider: {
  bindTo: [0, 1], // Bind to first argument. If options.range=true, bind also to second argument.
  baseTag: "widget",
  widgetName: "slider",
  elem: "div",
  setSize: true,
  options: function() {
    var tag = this;
    return {
      slide: function(evt, ui) {
        if (ui.values) { // property values is given when option "range" is set to true
          tag.updateValues.apply(tag, ui.values);
        } else {
          tag.updateValue(ui.value);
        }
      }
    };
  },
  onAfterLink: function(tagCtx) {
    var tag = this;
    if (!tag.linkCtx.elem._jsvChg) {
      // If change not triggered by a the slider itself changing value
      tag.baseApply(arguments);
    }
  },
  setValue: function(value, index) {
    var widget = this.widget;
    if (value !== undefined) {
      value = value || 0;
      if (widget.options.range === true) {
        widget.values(index, value);
      } else {
        widget.value(value);
      }
    }
  },
  getValue: function() {
    return this.widget.value();
  }
},
// ============================= SPINNER =============================
spinner: {
  baseTag: "widget",
  widgetName: "spinner",
  mainElement: "input",
  linkedElement: "input",
  elem: "input",
  setSize: true,
  // Default display formatter uses Globalize 0.1.1.
  // Override as tag.displayFormat in tagDef or as tagCtx.props.displayFormat
  displayFormat: { // Default display format: numberString, to number
    parse: function(numberString, props) {
      return window.Globalize
        ? Globalize.parseFloat(numberString, 10, props._culture)
        : numberString;
    },
    format: function(data, props) {
      return window.Globalize
        ? Globalize.format(data, this.widget.options.numberFormat, props._culture)
        : data;
    }
  },
  options: function() {
    var tag = this;
    return {
      spin: function(evt, ui) {
        tag.updateValue(tag.widget._format(ui.value));
      }
    };
  },
  init: function(tagCtx) {
    var dataFormat,
      tag = this,
      displayFormat = tagCtx.props.displayFormat;
    tag.parse = function(numberString) {
      return displayFormat.parse.call(tag, numberString, tag.tagCtx.props);
    };
    tag.format = function(data, props) {
      return displayFormat.format.call(tag, data, tag.tagCtx.props);
    };
    if (displayFormat === undefined) {
      displayFormat = tag.displayFormat;
    }
    tag.dataFormat = dataFormat = initDataFormatter(tag, tagCtx);
    tag.baseApply(arguments);
  },
  onBind: function(tagCtx) {
    var tag = this,
      cvt = getConverter(tag, tag.convert),
      cvtBk = getConverter(tag, tag.convertBack);
    tag.dataCvt = cvt;
    tag.dataCvtBk = cvtBk;
    tag.baseApply(arguments);

    if (!tag.linkCtx.elem._jsvChg) {
      // If change not triggered by the spinner itself changing value
      tag.displayElem = tag.mainElem.parent(); // jQuery UI wraps the input in a span
      if (tagCtx.props.width) {
        // In addition to generic setting of width on the
        // displayElem, need also to set width on the input.
        tag.mainElem.width(tagCtx.props.width - tag.displayElem.find(".ui-spinner-up").width()-9);
      }
    }

    tag.convert = function(val) {
      // Wrapped converter calls converter then does widget format
      val = cvt ? cvt.call(tag, val) : val
      val = tag.dataFormat ? +tag.parseData(val) : val;
      return tag.widget._format(val);
    };
    tag.convertBack = function(val) {
      // Wrapped converter, does widget parse then calls converter
      val = tag.widget._parse(val);
      val = tag.dataFormat ? tag.formatData(val) : val;
      return cvtBk ? cvtBk.call(tag, val) : val;
    };
    // Prevent onAfterLink replacing wrapped converters with unwrapped ones
    tag.convert.fix = tag.convertBack.fix = true;

    tag.widget._parse = function(value) {
      return value + "" === value && value
        ? +tag.parse(value, tagCtx.props)
        : value;
    };
    tag.widget._format = function(data) {
      return data !== ""
        ? tag.format(data, tagCtx.props)
        : data;
    };
  }
},
// ============================= TIMESPINNER =============================
timespinner: {
  baseTag: "spinner",
  dataFormat: { // Default data format: ticks/timestamp, to Date
    parse: function(date, props) {
      return +date;
    },
    format: function(ticks, props) {
      return new Date(ticks);
    }
  },
  displayFormat: { // Default timestring display, to Date
    parse: function(timeString, props) {
      var date;
      if (timeString) {
        return window.Globalize
          ? Globalize.parseDate(timeString, "t", props._culture)
          : ((date = new Date()).setHours(timeString.slice(0, 2), timeString.slice(3)), date);
      }
    },
    format: function(date, props) {
      if (date.getDay) {
        return window.Globalize
          ? Globalize.format(date, "t", props._culture)
          : (100 + date.getHours() + "").slice(1) + ":" + (100 + date.getMinutes() + "").slice(1);
      }
    }
  },
  options: function() {
    return $.extend(
      this.baseApply(), // Get options object from base class and extend it
      {step: 60000, page: 60}
    );
  },
  init: function(tagCtx) {
    this.baseApply(arguments);
    this.tagCtx.props.width = this.tagCtx.props.width || 80;
  },
  onBind: function(tagCtx) {
    var tag = this;
    tag.baseApply(arguments);

    tag.widget._parse = function(value) {
      var returnDate;
      if ("" + value === value && value && (value = tag.parse(value, tagCtx.props))) {
        // Make return dateNumber (ticks) change the hours and minutes but keep current date (day/month)
        if (tag.keepDay) {
          returnDate = tag.tagCtx.args[0];
          if (tag.dataCvt) {
            returnDate = tag.dataCvt(returnDate);
          }
          if (tag.dataFormat) {
            returnDate = tag.parseData(returnDate);
          }
        } else {
          returnDate = tag.value;
        }
        returnDate = new Date(returnDate);
        returnDate.setHours(value.getHours());
        returnDate.setMinutes(value.getMinutes());
        value = returnDate;
      }
      return +value;
    };
    tag.widget._format = function(value) {
      if (+value === value) {
        tag.value = value;
        return tag.format(new Date(value), tagCtx.props);
      }
    };
  },
  onAfterLink: function(tagCtx) {
    var keepDay = tagCtx.props.keepDay;
    if (keepDay !== undefined) {
      this.keepDay = keepDay;
    }
    this.baseApply(arguments);
  },
  trigger: false
},
// ============================= TABS =============================
tabs: {
  baseTag: "widget",
  widgetName: "tabs",
  elem: "div",
  wrap: true,
  setSize: true,
  contentCtx: true,
  options: tabsAccordionOptions,
  setValue: function(value) {
    if (value !== undefined) {
      this.widget.option("active", parseInt(value));
    }
  },
  onBind: function(value) {
    this.baseApply(arguments);
    var anchor,
      base = window.location.href.replace(/#.*$/, '');
    $('ul>li>a[href^="#"]', this.mainElem).each(function () {
      anchor = $(this);
      anchor.attr('href', base + anchor.attr('href'));
    });
    tabsAccordionOnBind.call(this);
  },
  getValue: function() { // Helper: get the index of the currently selected tab
    return this.widget.options.active;
  }
}

};

$.views.tags(tagDefs);

// ============================= BUTTON AND BUTTONSET =============================
if ($.ui.version.slice(0, 4) === "1.11") {
  // Add backward compatibility for {{buttonset}} and {{button}}
  tagDefs.button = {
    baseTag: "widget",
    widgetName: "button",
    elem: "button",
    setSize: true,
    contentCtx: true,
    init: function(tagCtx, linkCtx) {
      var template,
        tag = this,
        content = tagCtx.tmpl,
        props = tagCtx.props,
        id = props.id,
        parent = tag.parent;

      if (tag._.radio = parent && parent.tagName === "buttonset") {
        tagCtx = parent.tagCtx;
      } else {
        tag._.chkBx = (tag.inline ? props : linkCtx.elem).type === "checkbox";
      }

      var  params = tagCtx.params,
        paramprops = params.props || {};

      tag.baseApply(arguments);

      if (tag.inline) {
        content = content && content.markup || "&nbsp;";
        // (&nbsp; fixes a jQueryUI button rendering issue)
        if (tag._.radio || tag._.chkBx) {
          id = id || "jsv" + Math.random();
          template = '<input id="' + id + '" data-link="' + params.args[0] 
            + (paramprops.convert ? " convert=" + paramprops.convert : "")
            + (paramprops.convertBack ? " convertBack=" + paramprops.convertBack : "")
            + (tag._.radio
              ? '" name="' + parent.id + '" type="radio" value="' + props.value + 
                '"/><label for="' + id + '">' + content + '</label>'
              : '" type="checkbox"/><label for="' + id + '">' + content + '</label>');
        } else {
          template = "<button>" + content + "</button>";
        }
        tag.template = template;
      }
    },
    onAfterLink: function(tagCtx, linkCtx) {
      var tag = this,
        elem = linkCtx.elem,
        val = tag.bndArgs()[0];

      if (tag._.radio || tag._.chkBx) {
        if (!tag.inline) {
          if (tag._.unlinked && !elem.id) {
            elem.id = "jsv" + Math.random();
            $(elem).after('<label for="' + elem.id + '">&nbsp;</label>');
          }
          elem.checked = tag._.radio
            ? (elem.name = tag.parent.id, val === elem.value)
            : val && val !== "false";
        }

        tag.baseApply(arguments);

        elem = tag.mainElem[0];

        if (tag._.radio) {
          // Use {^{button value="xxx"}}Label{{/button}}
          if (elem.value === "undefined") {
            // Default, for {^{button}}xxx{{/button}} or {^{button _label="xxx"/}}
            elem.value = tag.widget.options.label; 
          }
          elem.checked = val === elem.value;
        } else {
          elem.checked = val && val !== "false";
        }

        if (tag._.chkBx) {
          tag.widget.refresh();
        }
      } else {
        if (!tag.inline) {
          elem.innerHTML = elem.innerHTML || "&nbsp;"; // Fixes jQuery UI button issue if no label text
        }
        tag.baseApply(arguments);
      }
    }
  };

  tagDefs.buttonset = {
    baseTag: "widget",
    widgetName: "buttonset",
    setSize: true,
    contentCtx: true,
    init: function(tagCtx) {
      var id,
        tag = this;

      tag.baseApply(arguments);

      if (tag.inline) {
        tag.id = tagCtx.props.id || "jsv" + Math.random();
        tag.template = '<span id="' + tag.id + '">' + tagCtx.tmpl.markup + "</span>";
      }
    },
    onAfterLink: function(tagCtx, linkCtx) {
      var tag = this,
        elem = linkCtx.elem,
        val = tag.bndArgs()[0];
      tag.baseApply(arguments);
      tag.widget.buttons.each(function(i, elem) {
        elem.checked = val === elem.value;
        $(elem).button("refresh");
      });
    }
  };
}

// Compile tags
$.views.tags(tagDefs);

function unlinkedClone() {
  // Ensure that cloned element (and its contents) created by jQuery UI to show dragging
  // element does not have any data-jsv tokens (since deleting the element would then
  // remove those views associated with the original element)
  var clone = $(this).clone();
  clone.find("*").addBack().removeAttr( "id data-link data-jsv data-jsv-df" );
  clone.find("script").remove();
  return clone;
}

// ============================= DRAGGABLE =============================
if ($.ui.draggable) {
  // Create derived draggable widget
  $.widget("jsv.draggable", $.ui.draggable, {
    _createHelper: function() {
      if (this.options.helper === "clone") {
        this.options.helper = unlinkedClone;
      }
      return this._super();
    }
  });

  $.views.tags("draggable", {
    baseTag: "widget",
    widgetName: "jsv-draggable",
    bindTo: ["left", "top"],
    linkedCtxParam: ["left", "top"],
    elem: "div",
    wrap: true,
    setSize: true,
    contentCtx: true,
    options: function() {
      var tag = this;
      return {
        drag: function(evt, ui) {
          tag.updateValues(ui.offset.left, ui.offset.top, true); // Async update
          if (tag.convert) {
            tag.setValues(ui.offset.left, ui.offset.top);
          }
        }
      };
    },
    setValue: function(value, index) {
      if (value === undefined) {
        this.ctxPrm(this.linkedCtxParam[index], this.getValue()[index]);
      } else {
        // Set new position (offset left/top) to ui.offset.left/top (and include effect of margin, if set)
        var offset = {},
          topLeft = index ? "top" : "left";
        offset[topLeft] = value + parseInt(this.mainElem.css("margin-" + topLeft));
        this.mainElem.offset(offset);
      }
    },
    getValue: function() {
      var position = this.mainElem.position();
      return [position.left, position.top];
    }
  });
}

// ============================= ACCORDION =============================
if ($.ui.accordion) {
  // Create derived accordion widget
  $.widget("jsv.accordion", $.ui.accordion, {
    _create: function() {
      var options = this.options;
      if (options.header + "" === options.header) {
        options.header = options.header.replace(":not(li):even", ":not(li,script):even");
      }
      this._super();
    }
  });

  $.views.tags("accordion", {
    baseTag: "widget",
    widgetName: "jsv-accordion",
    wrap: true,
    setSize: true,
    contentCtx: true,
    options: tabsAccordionOptions,
    initOptions: ["header"], // Options which need to be set on creation, not later
    onBind: function(value) {
      this.baseApply(arguments);
      tabsAccordionOnBind.call(this);
    },
    setValue: function(value) {
      if (value !== undefined) {
        // Select the tab whose index is the currently selected one
        this.widget.option("active", parseInt(value));
      }
    },
    getValue: function() { // Helper: get the index of the currently selected panel
      return this.widget.options.active;
    }
  });
}

// ============================= SORTABLE =============================
if ($.ui.sortable) {
  $.widget("jsv.sortable", $.ui.sortable, {
    _create: function() {
      var innerView, moveFrom,
        widget = this,
        startOption = widget.options.start,
        stopOption = widget.options.stop;

      widget.option({
        start: function(event, ui) {
          startOption && startOption.apply(this, arguments);

          if (widget.options.bindArray !== false) {
            innerView = ui.item.view(); // The view of the item that is being dragged
            if (innerView.type === "item") {
              // The sortable items are within a {{for}} loop, so this is a data-linked sortable list
              moveFrom = innerView.index + 1; // 1-based starting index of dragged item
            }
          }
        },
        stop: function(event, ui) {
          var moveTo;

          if (moveFrom) {
            // This is a data-linked sortable list
            moveTo = ui.item.prevAll(ui.item[0].tagName).length; // The new index after
            // being dragged (count of previous siblings of same tagName)
            widget.cancel(); // Now cancel the DOM changes, since we are data-driven,
            // and should use JsViews data-linking to move the sorted items
            $.observable(innerView.parent.data).move(moveFrom-1, moveTo); // Make the equivalent
            // observable change to the underlying data
            moveFrom = undefined;
            // Remove the starting index, ready for new sorting actions on this sortable list
          }
          stopOption && stopOption.apply(this, arguments);
        }
      });
      widget._super();
    }
  });

  $.views.tags("sortable", {
    baseTag: "widget",
    widgetName: "jsv-sortable",
    wrap: true,
    contentCtx: true,
  });
}

// ============================= SELECTABLE =============================
if ($.ui.selectable) {
  $.widget("jsv.selectable", $.ui.selectable, {
    _create: function() {
      var widget = this;

      widget.options.filter += ":not(script)";
      widget._super();
    }
  });

  $.views.tags("selectable", {
    baseTag: "widget",
    widgetName: "jsv-selectable",
    wrap: true,
    setSize: true,
    contentCtx: true,
    options: function() {
      var tag = this;
      return {
        stop: function(evt, ui) {
          tag.setSelectedItems();
        }
      };
    },
    initOptions: ["filter"], // Options which need to be set on creation, not later
    onBind: function() {
      var tag = this;
      tag.selected = []; // Value of first arg (after applying converter, if there is one)

      function selObs(ev, eventArgs) {
        if (!eventArgs.refresh) {
          tag.setSelection();
        }
      }

      tag.selObs = selObs; // Store function instance, for disposing of just this binding, in onDispose
      tag.baseApply(arguments);
      tag.mainElem.on("jsv-domchange.sel", function() {
        tag.widget.refresh();
        tag.selected._domChg = 2;
        tag.setSelectedItems();
        tag.selected._domChg = undefined;
      });
    },
    onDispose: function() {
      $.unobserve(this.selected, this.selObs);  // Remove just this binding to selected array
    },
    setValue: function(selected) { // Set the new observed array of selected indices
      var tag = this;
      if (selected !== undefined && $.isArray(selected) && tag.selected !== selected) {
        $.unobserve(tag.selected, tag.selObs);
        tag.selected = selected;
        $.observe(selected, tag.selObs);
        tag.setSelection();
      }
    },
    getValue: function() {
      return this.selected;
    },
    setSelection: function() {
      // Set the class on the new selected elements (based on tag.selected array of indices)
      var tag = this,
        l = tag.selected.length;
      if (!tag.selected._domChg) {
        // No need to update if during a domchange event - only if a selectable change event
        // Remove selected class from all selectable elements
        tag.widget.selectees.removeClass("ui-selected");
        while (l--) {
          // Set selected class on elements at indices in tag.selected array
          tag.widget.selectees.eq(tag.selected[l]).addClass("ui-selected");
        }
      }
    },
    setSelectedItems: function() {
      // Set observable selectedItems array based on selected elements managed by widget
      var tag = this,
        selected = [];
      if (tag.selected && tag.selected._domChg !== 1) {
        if (tag.selected._domChg) {
          // Avoid race conditions when multiple selectables bind to same selected array
          tag.selected._domChg--;
        }
        tag.widget.selectees.each(function(index, elem) {
          if ((' ' + elem.className + ' ').indexOf(' ui-selected ') > -1) {
            selected.push(index); // This is the index of a selected element
          }
        });
        tag.setValue(tag.selected); // Update the tag to bind to the new selected array
        $.observable(tag.selected).refresh(selected); // Refresh to the new selected indices
      }
    }
  });
}
})(this, this.jQuery);
