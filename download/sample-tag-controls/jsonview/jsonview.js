/*! Sample JsViews tag control: {{jsonview}} control v0.9.83 (Beta)
see: http://www.jsviews.com/#download/sample-tagcontrols */
/*
 * Copyright 2016, Boris Moore
 * Released under the MIT License.
*/

(function($) {
  "use strict";

  function isObject(val) {
    return val && typeof val === "object";
  }

  function notEmpty(val) {
    return $.views.tags.props.dataMap.getTgt(val).length;
  }

  notEmpty.depends = "*";

  $.views.tags("jsonview", {
    template: {
      markup:
        '{{if ~isArray(#data)}}'
        + '<span class="jsonview"><span class="brace">[</span>{^{if length}}'
          + '<ul class="jsonview">'
            + '{^{for}}'
              + '<li>{^{jsonview/}}{^{if #index < #parent.data.length-1}},{{/if}}</li>'
            + '{{/for}}'
          + '</ul>'
        + '{{/if}}<span class="brace">]</span></span>'
      + '{{else ~isObject(#data)}}'
        + '<span class="jsonview"><span class="brace">{</span>{^{if ~notEmpty(#data)}}'
          + '<ul class="jsonview">'
            + '{^{props}}'
              + '<li>'
                + '<label>{^{>key}}: </label>'
                + '{^{jsonview prop/}}{^{if #index < #parent.data.length-1}},{{/if}}'
              + '</li>'
            + '{{/props}}'
          + '</ul>'
        + '{{/if}}<span class="brace">}</span></span>'
      + '{{else #data+""===#data}}'
        + '"{^{>#data}}"'
      + '{{else}}'
        + '{^{>#data+""}}'
      + '{{/if}}',
      helpers: {
        isObject: isObject,
        notEmpty: notEmpty,
        isArray: $.isArray
      }
    }
  });
})(this.jQuery);
