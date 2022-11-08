/*! jsviews.js v@@include("templates/-version.txt")@@include("templates/-jsv-version.txt") single-file version: http://jsviews.com/ */
/*! includes JsRender, JsObservable and JsViews - see: http://jsviews.com/#download */

/* Interactive data-driven views using JsRender templates */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< JsRender >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/* JsRender:
 * See http://jsviews.com/#jsrender and http://github.com/BorisMoore/jsrender
@@include("templates/-copyright.txt")
 */

@@include("templates/-jshint-directives.txt")

(function(factory, global) {
	// global var is the this object, which is window when running in the usual browser environment
	var $ = global.jQuery;

	if (typeof exports === "object") { // CommonJS e.g. Browserify
		module.exports = $
			? factory(global, $)
			: function($) { // If no global jQuery, take jQuery passed as parameter: require("jsviews")(jQuery)
				return factory(global, $);
			};
	} else if (typeof define === "function" && define.amd) { // AMD script loader, e.g. RequireJS
		define(["jquery"], function($) {
			return factory(global, $);
		}); // Require jQuery
	} else { // Browser using plain <script> tag
		factory(global, false);
	}
} (

// factory (for jsviews.js)
function(global, $) {
"use strict";

//========================== Top-level vars ==========================

// global var is the this object, which is window when running in the usual browser environment
var setGlobals = $ === false; // Only set globals if script block in browser (not AMD and not CommonJS)

$ = $ || global.jQuery; // $ is jQuery passed in by CommonJS loader (Browserify), or global jQuery.

if (!$ || !$.fn) {
	// jQuery is not loaded.
	throw "JsViews requires jQuery"; // We require jQuery
}

var versionNumber = "v@@include("templates/-version.txt")",

	jsvStoreName, rTag, rTmplString, topView, $views, $observe, $observable, $expando,
	_ocp = "_ocp",      // Observable contextual parameter

@@include('jsrender.js', { "isJsViews": true })

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< JsObservable >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/* JsObservable:
 * See https://www.jsviews.com/#jsobservable and http://github.com/borismoore/jsviews
@@include("templates/-copyright.txt")
 */

//========================== Top-level vars ==========================

$views = $.views;
$sub = $views.sub;
$isFunction = $.isFunction;
$isArray = $.isArray;
$expando = $.expando;
@@include("jquery.observable.js")
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< JsViews >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/* JsViews:
 * Interactive data-driven views using templates and data-linking.
 * See https://www.jsviews.com/#jsviews and http://github.com/BorisMoore/jsviews
@@include("templates/-copyright.txt")
 */

//========================== Top-level vars ==========================

$viewsSettings = $views.settings;
$subSettings = $sub.settings;
$subSettingsAdvanced = $subSettings.advanced;
$converters = $views.converters;
$.templates = $templates = $views.templates;
$tags = $views.tags;
rFirstElem = /<(?!script)(\w+)[>\s]/;
STRING = "string";

@@include("jquery.views.js")
return $;
}, window));