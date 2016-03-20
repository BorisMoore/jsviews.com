/*! JsRender v@@include("templates/-version.txt")@@include("templates/-jsr-version.txt"): http://jsviews.com/#jsrender */
/*! **VERSION FOR WEB** (For NODE.JS see http://jsviews.com/download/jsrender-node.js) */
/*
 * Best-of-breed templating in browser or on Node.js.
 * Does not require jQuery, or HTML DOM
 * Integrates with JsViews (http://jsviews.com/#jsviews)
 *
@@include("templates/-copyright.txt")
 */

@@include("templates/-jshint-directives.txt")

(function(factory, global) {
	// global var is the this object, which is window when running in the usual browser environment
	var $ = global.jQuery;

	if (typeof define === "function" && define.amd) { // AMD script loader, e.g. RequireJS
		define(function() {
			return factory(global);
		});
	} else if (typeof exports === "object") { // CommonJS e.g. Browserify
		module.exports = $
			? factory(global, $)
			: function($) { // If no global jQuery, take optional jQuery passed as parameter: require('jsrender')(jQuery)
				if ($ && !$.fn) {
					throw "Provide jQuery or null";
				}
				return factory(global, $);
			};
	} else { // Browser using plain <script> tag
		factory(global, false);
	}
} (

// factory (for jsrender.js)
function(global, $) {
"use strict";

//========================== Top-level vars ==========================

// global var is the this object, which is window when running in the usual browser environment
var setGlobals = $ === false; // Only set globals if script block in browser (not AMD and not CommonJS)

$ = $ && $.fn ? $ : global.jQuery; // $ is jQuery passed in by CommonJS loader (Browserify), or global jQuery.

var versionNumber = "v@@include("templates/-version.txt")",
	jsvStoreName, rTag, rTmplString, topView, $views,

@@include('jsrender.js', { "isNode": false })
return $ || jsr;
}, this));
