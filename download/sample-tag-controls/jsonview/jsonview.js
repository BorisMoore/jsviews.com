/*! Sample JsViews tag control: {{jsonview}} control v1.0.0
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
  * Copyright 2018, Boris Moore
  * Released under the MIT License.
*/

(function($) {
  "use strict";
  $.views.tags("jsonview", {
    template: {
      markup: '{{if ~tag.isArray(#data)}}'
      + '<span class="jsonview"><span class="brace">[</span>{^{if length}}'
        + '<ul class="jsonview">'
          + '{^{for}}'
            + '<li {{:~tag.isFn(#data) ? "class=\'function\'" : ""}}>{^{jsonview/}}{^{if #index < #parent.data.length-1}},{{/if}}</li>'
          + '{{/for}}'
        + '</ul>'
      + '{{/if}}<span class="brace">]</span></span>'
    + '{{else ~tag.isObject(#data)}}'
      + '<span class="jsonview"><span class="brace">{</span>{^{if ~tag.notEmpty(#data)}}'
        + '<ul class="jsonview">'
          + '{^{props noFunctions=~noFunctions}}'
            + '<li {{:~tag.isFn(prop) ? "class=\'function\'" : ""}}>'
              + '<label>"{^{encode: key}}": </label>'
              + '{^{jsonview prop /}}{^{if #index < #parent.data.length-1}},{{/if}}'
            + '</li>'
          + '{{/props}}'
        + '</ul>'
      + '{{/if}}<span class="brace">}</span></span>'
    + '{{else #data+""===#data}}'
      + '"{^{str:#data}}"'
    + '{{else}}'
      + '{^{cvt:#data}}'
    + '{{/if}}',
      converters: {
        str: function convertValue(val) {
          return $.views.converters.encode(val+"").replace(/"/g, '\\"');
        },
        cvt: function convertValue(val) {
          if ($.isFunction(val)) {
            return (this.ctx.noFunctions
              ? "<em>[function...]</em>"
              : $.views.converters.encode(val+""));
          } else {
            return val + ""; // TODO Add support for dates
          }
        }
      }
    },
    notEmpty: function notEmpty(val) {
      for (var key in val) {
        if (key !== $.expando && val.hasOwnProperty(key) && (!this.ctx.noFunctions || !$.isFunction(val[key]))) {
          return true;
        }
      }
    },
    init: function() {
      this.notEmpty.depends = "*";
      this.ctx.noFunctions = this.ctx.noFunctions || this.tagCtx.props.noFunctions;
    },
    isFn: $.isFunction,
    isArray: $.isArray,
    isObject: function isObject(val) {
      return val && typeof val === "object" && !(val instanceof Date);
    },

  });

})(this.jQuery);
