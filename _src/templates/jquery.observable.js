/*! JsObservable @@include("templates/-jsv-version.txt"): http://jsviews.com/#jsobservable */
/*
 * Subcomponent of JsViews
 * Data change events for data-linking
 *
@@include("templates/-copyright.txt")
 */

@@include("templates/-jshint-directives.txt")

(function(factory) {
	// global var is the this object, which is window when running in the usual browser environment
	var global = (0, eval)('this'), // jshint ignore:line
		$ = global.jQuery;

	if (typeof define === "function" && define.amd) { // AMD script loader, e.g. RequireJS
		define(["jquery"], factory); // Require jQuery
	} else if (typeof exports === "object") { // CommonJS e.g. Browserify
		module.exports = $
			? factory($)
			: function($) { // If no global jQuery, take jQuery passed as parameter: require("jsobservable")(jQuery)
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

$ = $ || global.jQuery;

if (!$ || !$.fn) {
	// jQuery is not loaded.
	throw "JsObservable requires jQuery"; // We require jQuery
}

var versionNumber = "v1.0.0-alpha",
	$observe, $observable,

	$views = $.views =
		$.views ||
		setGlobals && global.jsrender && jsrender.views || //jsrender was loaded before jquery.observable
		{ // jsrender not loaded so set up $.views and $.views.sub here, and merge back in jsrender if loaded afterwards
			jsviews: versionNumber,
			sub: {}
		},
	$sub = $views.sub,
	$isFunction = $.isFunction,
	$isArray = $.isArray,
	OBJECT = "object";
@@include("jquery.observable.js")
return $;
}));
