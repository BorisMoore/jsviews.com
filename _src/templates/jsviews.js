/*! jsviews.js @@include("templates/-jsv-version.txt") single-file version: http://jsviews.com/ */
/*! includes JsRender, JsObservable and JsViews - see: http://jsviews.com/#download */

/* Interactive data-driven views using JsRender templates */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< JsRender >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/* JsRender:
 *   See http://jsviews.com/#jsrender and http://github.com/BorisMoore/jsrender
@@include("templates/-copyright.txt")
 */

@@include("templates/-jshint-directives.txt")

(function(factory) {
	// global var is the this object, which is window when running in the usual browser environment
	var global = (0, eval)('this'), // jshint ignore:line
		$ = global.jQuery;

	if (typeof define === "function" && define.amd) { // AMD script loader, e.g. RequireJS
		define(["jquery"], factory);
	} else if (typeof exports === "object") { // CommonJS e.g. Browserify
		module.exports = $
			? factory($)
			: function($) { // If no global jQuery, take jQuery passed as parameter: require("jsviews")(jQuery)
				return factory($);
			};
	} else { // Browser using plain <script> tag
		factory(false);
	}
} (

// factory (for jsviews.js)
function($) {
"use strict";

//========================== Top-level vars ==========================

// global var is the this object, which is window when running in the usual browser environment
var global = (0, eval)('this'), // jshint ignore:line
	setGlobals = $ === false; // Only set globals if script block in browser (not AMD and not CommonJS)

$ = $ || global.jQuery; // $ is jQuery passed in by CommonJS loader (Browserify), or global jQuery.

if (!$ || !$.fn) {
	// jQuery is not loaded.
	throw "JsViews requires jQuery"; // We require jQuery
}

var versionNumber = "v1.0.0-beta",

	jsvStoreName, rTag, rTmplString, topView, $views, $observe, $observable,

@@include('jsrender.js')
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< JsObservable >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/* JsObservable:
 * See http://www.jsviews.com/#jsobservable and http://github.com/borismoore/jsviews
@@include("templates/-copyright.txt")
 */

//========================== Top-level vars ==========================

$views = $.views;
$sub = $views.sub;
$isFunction = $.isFunction;
$isArray = $.isArray;
@@include("jquery.observable.js")

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< JsViews >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/* JsViews:
 * Interactive data-driven views using templates and data-linking.
 * See  http://www.jsviews.com/#jsviews and http://github.com/BorisMoore/jsviews
@@include("templates/-copyright.txt")
 */

//========================== Top-level vars ==========================

$viewsSettings = $views.settings;
$converters = $views.converters;
$tags = $views.tags;
rFirstElem = /<(?!script)(\w+)(?:[^>]*(on\w+)\s*=)?[^>]*>/;

@@include("jquery.views.js")
return $;
}));
