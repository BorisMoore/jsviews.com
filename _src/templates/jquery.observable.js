/*! JsObservable v@@include("templates/-version.txt")@@include("templates/-jsv-version.txt"): http://jsviews.com/#jsobservable */
/*
 * Subcomponent of JsViews
 * Data change events for data-linking
 *
@@include("templates/-copyright.txt")
 */

@@include("templates/-jshint-directives.txt")

(function(factory, global) {
	// global var is the this object, which is window when running in the usual browser environment
	var $ = global.jQuery;

	if (typeof exports === "object") { // CommonJS e.g. Browserify
		module.exports = $
			? factory(global, $)
			: function($) { // If no global jQuery, take jQuery passed as parameter: require("jsobservable")(jQuery)
				return factory(global, $);
			};
	} else if (typeof define === "function" && define.amd) { // AMD script loader, e.g. RequireJS
		define(["jquery"], function($) {
			return factory(global, $); // Require jQuery
		});
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

$ = $ || global.jQuery;

if (!$ || !$.fn) {
	// jQuery is not loaded.
	throw "JsObservable requires jQuery"; // We require jQuery
}

var versionNumber = "v@@include("templates/-version.txt")",
	_ocp = "_ocp", // Observable contextual parameter
	$observe, $observable,

	$views = $.views =
		$.views ||
		setGlobals && global.jsrender && jsrender.views || //jsrender was loaded before jquery.observable
		{ // jsrender not loaded so set up $.views and $.views.sub here, and merge back in jsrender if loaded afterwards
			jsviews: versionNumber,
			sub: {
				// subscription, e.g. JsViews integration
				settings: {}
			},
			settings: {
				advanced: function(value) {
					$subSettingsAdvanced = $subSettings.advanced = $subSettings.advanced || {_jsv: true};
					return value
						? (
							"_jsv" in value && ($subSettingsAdvanced._jsv = value._jsv),
							$sub.advSet(),
							$views.settings
						)
						: $subSettingsAdvanced;
					}
			}
		},
	$sub = $views.sub,
	$subSettings = $sub.settings,
	$subSettingsAdvanced = $subSettings.advanced,
	$isFunction = $.isFunction,
	$expando = $.expando,
	$isArray = $.isArray,
	OBJECT = "object";

@@include("jquery.observable.js", { "isJqObservable": true })
return $;
}, window));
