/*! JsViews jQueryUI widget integration v1.0.0-alpha:
see: http://www.jsviews.com/#download */
/*
 * Copyright 2016, Boris Moore
 * Released under the MIT License.
 */

(function (global, $, undefined) {
"use strict";

function keepParentDataCtx(val) {
  var tagCtx = this.tagCtx;
  return tagCtx.render(tagCtx.view, true); // no arg, so renders against parentView.data
}

$.views.tags({
widget: {
  init: function(tagCtx, linkCtx) {
    var tag = this,
      props = tagCtx.props,
      content = tagCtx.content,
      elemType;

    if (tag._.inline) {
      if (elemType = props.elem || tag.elem) {
        if (content) {
          if (tag.wrap) {
            tag.template = "<" + elemType + ">" + content.markup + "</" + elemType + ">";
          }
        } else {
          tag.template = (elemType === "input") ? "<input/>" : "<"+ elemType +"></"+ elemType +">";
        }
      }
      tag.attr = "html";
    }
    delete props.elem;
  },
  onAfterLink: function(tagCtx, linkCtx) {
    var linkedElem, prop, i,
      tag = this,
      options = tag.options,
      presets = tag.initOptions,
      props = tagCtx.props,
      widgetName = tag.widgetName || tagCtx.args[0],
      widgetFullName = widgetName;
      widgetName = widgetName.split("-").pop();

    if (tag._.unlinked) {
      if (i = presets && presets.length) {
        presets = {};
        while (i--) {
          i = tag.initOptions[i];
          if (prop = tagCtx.props["_" + i]) {
            presets[i] = prop;
          }
        }
      }
      if (widgetFullName === widgetName) {
        widgetFullName = "ui-" + widgetName;
      }
      if (!tag.linkedElem) {
        tag.linkedElem = tag._.inline ? tag.contents("*").first() : $(linkCtx.elem);
      }
      linkedElem = tag.linkedElem;
      if (!linkedElem[0]) {
        // This may be due to using {{myWidget}} No element found here {{/myWidget}} 
        throw "No element found for widget '" + widgetName +"'";
      }
      // Instantiate widget
      linkedElem[widgetName](presets);

      // Store widget instance
      tag.widget = linkedElem.data(widgetFullName) || linkedElem.data(widgetName);
      if (!tag.widget) {
        // widget failed to load, or is not a valid widget factory type
        throw "widget '" + widgetName + "' failed";
      }
    }
    linkedElem = tag.linkedElem;
    if (options) {
      if ($.isFunction(options)) {
        options = tag.options();
      }
      tag.linkedElem[widgetName]("option", options);
    }
    $.each(props, function(key, prop) {
      var option;
      if (key.charAt(0) === "_") {
        key = key.slice(1);
        option = options && options[key];
        linkedElem[widgetName]("option", key,
          option && $.isFunction(option)
            ? function() {
              // if the same event function option is overridden on the tagDef options and
              // the tagCtx.props, call first the one on the initOptions options, and then
              // the one declared on the tag properties. 
              option.apply(linkedElem[0], arguments);
              return prop.apply(linkedElem[0], arguments);
            }
            : prop
          );
      }
    });
  },
  onUpdate: function() {
    return false;
  },
  dataBoundOnly: true,
  attr: "none"
},

autocomplete: {
  baseTag: "widget",
  widgetName: "autocomplete",
  elem: "input",
  setSize: true,
  options: function() {
    var tag = this;
    return {
      change: function(evt, ui) {
        if (ui.item) {
          tag.update(ui.item.value);
          // If there is a selected item, update bound value on blur.
          // (Alternatively can set trigger=true)
        }
      },
      select: function(evt, ui) {
        if (ui.item) {
          tag.update(ui.item.value);
        }
      },
      focus: function(evt, ui) {
        return false;
      }
    };
  },
  setValue: function(value) {
    this.linkedElem.val(value);
  },
  getValue: function() {
    return this.linkedElem.val();
  }
},
button: {
  baseTag: "widget",
  widgetName: "button",
  elem: "button",
  setSize: true,
  init: function(tagCtx, linkCtx) {
    var template,
      tag = this,
      content = tagCtx.content,
      props = tagCtx.props,
      id = props.id,
      parent = tag.parent;

    if (tag._.radio = parent && parent.tagName === "buttonset") {
      tagCtx = parent.tagCtx;
    } else {
      tag._.chkBx = (tag._.inline ? props : linkCtx.elem).type === "checkbox";
    }

    var  params = tagCtx.params,
      paramprops = params.props || {};

    tag.baseApply(arguments);

    if (tag._.inline) {
      content = content && content.markup || "&nbsp;"; // (&nbsp; fixes a jQueryUI button rendering issue)
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
      val = tag.cvtArgs()[0];

    if (tag._.radio || tag._.chkBx) {
      if (!tag._.inline) {
        if (tag._.unlinked && !elem.id) {
          elem.id = "jsv" + Math.random();
          $(elem).after('<label for="' + elem.id + '">&nbsp;</label>');
        }
        elem.checked = tag._.radio
          ? (elem.name = tag.parent.id, val === elem.value)
          : val && val !== "false";
      }

      tag.baseApply(arguments);

      elem = tag.linkedElem[0];

      if (tag._.radio) {
        // Use {^{button value="xxx"}}Label{{/button}}
        if (elem.value === "undefined") {
          // Default, for {^{button}}xxx{{/button}} or {^{button _label="xxx"/}}
          elem.value = tag.widget.option("label"); 
        }
        elem.checked = val === elem.value;
      } else {
        elem.checked = val && val !== "false";
      }

      if (tag._.chkBx) {
        tag.widget.refresh();
      }
    } else {
      if (!tag._.inline) {
        elem.innerHTML = elem.innerHTML || "&nbsp;"; // Fixes jQuery UI button issue if no label text
      }
      tag.baseApply(arguments);
    }
  },
  render: keepParentDataCtx
},
buttonset: {
  baseTag: "widget",
  widgetName: "buttonset",
  setSize: true,
  init: function(tagCtx) {
    var id,
      tag = this;

    tag.baseApply(arguments);

    if (tag._.inline) {
      tag.id = tagCtx.props.id || "jsv" + Math.random();
      tag.template = '<span id="' + tag.id + '">' + tagCtx.content.markup + "</span>";
    }
  },
  render: keepParentDataCtx,
  onAfterLink: function(tagCtx, linkCtx) {
    var tag = this,
      elem = linkCtx.elem,
      val = tag.cvtArgs()[0];
    tag.baseApply(arguments);
    tag.widget.buttons.each(function(i, elem) {
      elem.checked = val === elem.value;
      $(elem).button("refresh");
    });
  }
},
datepicker: {
  baseTag: "widget",
  widgetName: "datepicker",
  elem: "input",
  options: function() {
    var tag = this;
    return {
      onSelect: function(dateText, inst) {
        tag.value = dateText;
        tag.update(dateText);
      }
    };
  },
  setValue: function(value) {
    if (value !== undefined && value !== this.value) {
      this.value = value;
      this.linkedElem.datepicker("setDate", value);
    }
  },
  getValue: function() {
    return this.value;
  },
  onAfterLink: function(tagCtx) {
    var tag = this;
    tag.baseApply(arguments);
    tag.setValue(tagCtx.args[0]);
    if (tag.linkedElem[0].tagName !== "INPUT") {
      // This datepicker is not using an input (e.g. using a div) - so set to inline-block
      tag.linkedElem.css("display", "inline-block");
    }
  }
},
//dialog: { // Currently not supported. (Support would require overriding _createWrapper code.)
//  baseTag: "widget",
//  widgetName: "dialog",
//  wrap: true,
//  elem: "div"
//},
droppable: {
  baseTag: "widget",
  widgetName: "droppable",
  wrap: true
},
menu: {
  baseTag: "widget",
  widgetName: "menu",
  elem: "ul",
  wrap: true,
  initOptions: ["menus", "items"] // Options which need to be set on creation, not later
},
progressbar: {
  baseTag: "widget",
  widgetName: "progressbar",
  elem: "div",
  wrap: true,
  setSize: true,
  setValue: function(value) {
    var tag = this;
    tag.widget.value(value || 0);
  },
  getValue: function() {
    return this.widget.value();
  },
  onAfterLink: function(tagCtx) {
    var tag = this;
    tag.baseApply(arguments);
    if (tagCtx.args.length) {
      // Set the value to arg[0] (after applying converter, if there is one)
      tag.setValue(tag.cvtArgs()[0]);
    }
    if (tagCtx.props.busy) {
      // Set the value to arg[0] (after applying converter, if there is one)
      tag.widget.value(false);
    }
  },
  render: keepParentDataCtx
},
resizable: {
  baseTag: "widget",
  widgetName: "resizable",
  wrap: true,
  elem: "div"
},
selectable: {
  baseTag: "widget",
  widgetName: "selectable",
  wrap: true
},
selectmenu: {
  baseTag: "widget",
  widgetName: "selectmenu",
  elem: "select",
  wrap: true,
  options: function() {
    var tag = this;
    return {
      change: function(evt, ui) {
        tag.update(ui.value);
      }
    };
  },
  setValue: function(value) {
    this.linkedElem[0].value = value;
    this.widget.refresh();
  },
  getValue: function() {
    return this.linkedElem[0].value;
  },
  render: keepParentDataCtx,
  onAfterLink: function() {
    var tag = this;
    tag.baseApply(arguments);
    if (tag._.unlinked) {
      tag.linkedElem.on("jsv-domchange", function() {
        tag.widget.refresh();
      });
    }
    // Set the value to arg[0] (after applying converter, if there is one)
    tag.setValue(tag.cvtArgs()[0]);
  }
},
slider: {
  baseTag: "widget",
  widgetName: "slider",
  elem: "div",
  setSize: true,
  options: function() {
    var tag = this;
    return {
      slide: function(evt, ui) {
        setTimeout(function() {
          tag.update(ui.value);
        }, 0);
      }
    };
  },
  setValue: function(value) {
    this.widget.value(value || 0);
  },
  getValue: function() {
    return this.widget.value();
  },
  onAfterLink: function() {
    var tag = this;
    tag.baseApply(arguments);
    // Set the value to arg[0] (after applying converter, if there is one)
    tag.setValue(tag.cvtArgs()[0]);
  }
},
spinner: {
  baseTag: "widget",
  widgetName: "spinner",
  elem: "input",
  setSize: true,
  options: function() {
    var tag = this;
    return {
      spin: function(evt, ui) {
        tag.update(ui.value);
      }
    };
  },
  setValue: function(value) {
    this.widget.value(value || 0);
  },
  getValue: function() {
    return this.widget.value();
  }
},
tabs: {
  baseTag: "widget",
  widgetName: "tabs",
  elem: "div",
  setSize: true,
  wrap: true
}

});

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

          innerView = ui.item.view(); // The view of the item that is being dragged
          if (innerView.type === "item") {
            // The sortable items are within a {{for}} loop, so this is a data-linked sortable list
            moveFrom = innerView.index + 1; // 1-based starting index of dragged item
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
}

function unlinkedClone() {
  // Ensure that cloned element (and its contents) created by jQuery UI to show dragging element does not
  // have any data-jsv tokens (since deleting the element would them remove those views associated with
  // the original element)
  var clone = $(this).clone();
  clone.find("*").addBack().removeAttr( "id data-link data-jsv data-jsv-df" );
  clone.find("script").remove();
  return clone;
}

if ($.ui.draggable) {
  $.widget("jsv.draggable", $.ui.draggable, {
    _createHelper: function() {
      if (this.options.helper === "clone") {
        this.options.helper = unlinkedClone;
      }
      return this._super();
    }
  });
}

if ($.ui.accordion) {
  $.widget("jsv.accordion", $.ui.accordion, {
    _create: function() {
      var widget = this;
      widget.options.header = widget.options.header.replace(":not(li):even", ":not(li,script):even");
      widget.element.on("jsv-domchange", function(ev, tagCtx, linkCtx, eventArgs) {
        widget.refresh();
      });
      widget._super();
    }
  });
}

$.views.tags({
  accordion: {
    baseTag: "widget",
    widgetName: "jsv-accordion",
    wrap: true,
    initOptions: ["header"] // Options which need to be set on creation, not later
  },
  draggable: {
    baseTag: "widget",
    widgetName: "jsv-draggable",
    wrap: true
  },
  sortable: {
    baseTag: "widget",
    widgetName: "jsv-sortable",
    wrap: true
  }
});

})(this, this.jQuery);