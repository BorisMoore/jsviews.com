/*! jquery.views.js v@@include("templates/-version.txt")@@include("templates/-jsv-version.txt"): http://jsviews.com/ */
/*
 * Interactive data-driven views using JsRender templates.
 * Subcomponent of JsViews
 * Requires jQuery and jsrender.js (Best-of-breed templating in browser or on Node.js)
 *   See JsRender at http://jsviews.com/#download and http://github.com/BorisMoore/jsrender
 * Also requires jquery.observable.js
 *   See JsObservable at http://jsviews.com/#download and http://github.com/BorisMoore/jsviews
 *
@@include("templates/-copyright.txt")
 */

@@include("templates/-jshint-directives.txt")

(function(factory, global) {
	// global var is the this object, which is window when running in the usual browser environment
	var $ = global.jQuery;

	if (typeof define === "function" && define.amd) { // AMD script loader, e.g. RequireJS
		define(["jquery", "./jsrender", "./jquery.observable"], function($, jsr, jso) {
			return factory(global, $, jsr, jso);
		}); // Require jQuery, JsRender, JsObservable
	} else if (typeof exports === "object") { // CommonJS e.g. Browserify
		module.exports = $
			? factory(global, $)
			: function($) { // If no global jQuery, take jQuery passed as parameter (with JsRender and JsObservable): require("jquery.views")(jQuery)
				return factory(global, $);
			};
	} else { // Browser using plain <script> tag
		factory(global, false);
	}
} (

// factory (for jquery.views.js)
function(global, $, jsr, jso) {
"use strict";

//========================== Top-level vars ==========================

// global var is the this object, which is window when running in the usual browser environment
var setGlobals = $ === false; // Only set globals if script block in browser (not AMD and not CommonJS)

jsr = jsr || setGlobals && global.jsrender;
$ = $ || global.jQuery;

var versionNumber = "v@@include("templates/-version.txt")",
	requiresStr = "JsViews requires ";

if (!$ || !$.fn) {
	// jQuery is not loaded.
	throw requiresStr + "jQuery"; // We require jQuery
}

if (jsr && !jsr.fn) {
	jsr.views.sub._jq($); // map over from jsrender namespace to jQuery namespace
}

var $observe, $observable,
	$isArray = $.isArray,
	$views = $.views;

if (!$views || !$views.map) {
		// JsRender is not loaded.
	throw requiresStr + "JsRender"; // jsrender.js must be loaded before JsViews and after jQuery
}

var document = global.document,
	$viewsSettings = $views.settings,
	$sub = $views.sub,
	$subSettings = $sub.settings,
	$extend = $sub.extend,
	$isFunction = $.isFunction,
	$converters = $views.converters,
	$tags = $views.tags,
	$subSettingsAdvanced = $subSettings.advanced,

	// These two settings can be overridden on settings after loading jsRender, and prior to loading jquery.observable.js and/or JsViews
	propertyChangeStr = $sub.propChng = $sub.propChng || "propertyChange",
	arrayChangeStr = $sub.arrChng = $sub.arrChng || "arrayChange",

	HTML = "html",
	syntaxError = $sub.syntaxErr,
	rFirstElem = /<(?!script)(\w+)[>\s]/,
	error = $sub._er,
	onRenderError = $sub._err,
	delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar, topView,
	rEscapeQuotes = /['"\\]/g; // Escape quotes and \ character
@@include("jquery.views.js", { "isJqViews": true })
	return $;
}, this));
