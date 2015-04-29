/*! JsRender v1.0.0-beta: http://www.jsviews.com/#jsrender
@@include("templates/-commit-counter.txt")*/
/*
 * Optimized version of jQuery Templates, for rendering to string.
 * Does not require jQuery, or HTML DOM
 * Integrates with JsViews (http://www.jsviews.com/#jsviews)
 *
@@include("templates/-copyright.txt")
 */

@@include("templates/-jshint-directives.txt")

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// Loading from AMD script loader. Register as an anonymous module.
		define(factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		var jsrender = module.exports = factory(true, require("fs")); // jsrender = jsviews.views

		jsrender.renderFile = jsrender.__express = function(filepath, data, callback) { // Support for rendering templates from file
				// system in Node.js Node, and for Express template engine integration, using app.engine('html', jsrender.__express);
			var html = jsrender.templates("@" + filepath).render(data);
			if (callback) {
				callback(null, html);
			}
			return html;
		};
	} else {
		// Browser using plain <script> tag
		factory(false);
	}
} (function (isCommonJS, fs) {
	"use strict";

	isCommonJS = isCommonJS === true;

	//========================== Top-level vars ==========================

	var versionNumber = "v1.0.0-beta",

		// global is the this object, which is window when running in the usual browser environment.
		global = (0, eval)('this'), // jshint ignore:line

		$ = global.jQuery,

		jsvStoreName, rTag, rTmplString, topView,

@@include("jsrender.js")
	return $views;
}));
