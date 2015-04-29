/*! JsViews v1.0.0-alpha: http://www.jsviews.com/#jsviews
@@include("templates/-commit-counter.txt") (Beta Candidate)*/
/*
 * Interactive data-driven views using templates and data-linking.
 * Requires jQuery and jsrender.js (next-generation jQuery Templates, optimized for pure string-based rendering)
 *   See JsRender at http://www.jsviews.com/#download and http://github.com/BorisMoore/jsrender
 * Also requires jquery.observable.js
 *   See JsObservable at http://www.jsviews.com/#download and http://github.com/BorisMoore/jsviews

@@include("templates/-copyright.txt")
 */

@@include("templates/-jshint-directives.txt")

(function(factory) {
	if (typeof define === "function" && define.amd) {
		// Loading from AMD script loader. Register as an anonymous module.
		define(["jquery", "./jsrender", "./jquery.observable"], factory);
	} else {
		// Browser using plain <script> tag
		factory(this.jQuery);
	}
} (function($) {
	"use strict";

	//========================== Top-level vars ==========================

	var versionNumber = "v1.0.0-alpha",
		requiresStr = "JsViews requires ";

	if (!$) {
		// jQuery is not loaded.
		throw requiresStr + "jQuery"; // We require jQuery
	}

	var $views = $.views,
		$observable = $.observable;

	if (!$views || ! $views.settings) {
		// JsRender is not loaded.
		throw requiresStr + "JsRender"; // jsrender.js must be loaded before JsViews and after jQuery
	}

	if (!$observable) {
		// JsObservable is not loaded.
		throw requiresStr + "JsObservable"; // jquery.observable.js must be loaded before JsViews
	}

	// global is the this object, which is window when running in the usual browser environment.
	var global = (0, eval)('this'), // jshint ignore:line
		document = global.document,
		$sub = $views.sub,
		$viewsSettings = $views.settings,
		$extend = $sub.extend,
		$isFunction = $.isFunction,
		$converters = $views.converters,
		$tags = $views.tags,
		$observe = $observable.observe,

		// These two settings can be overridden on settings after loading jsRender, and prior to loading jquery.observable.js and/or JsViews
		propertyChangeStr = $sub.propChng = $sub.propChng || "propertyChange",
		arrayChangeStr = $sub.arrChng = $sub.arrChng || "arrayChange",

		HTML = "html",
		syntaxError = $sub.syntaxErr,
		rFirstElem = /<(?!script)(\w+)(?:[^>]*(on\w+)\s*=)?[^>]*>/,
		delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar, error, topView,
		rEscapeQuotes = /['"\\]/g; // Escape quotes and \ character
@@include("jquery.views.js")
	return $;
}));
