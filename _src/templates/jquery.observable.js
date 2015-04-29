/*! JsObservable v1.0.0-alpha: http://www.jsviews.com/#jsobservable
@@include("templates/-commit-counter.txt") (Beta Candidate)*/
/*
 * Subcomponent of JsViews
 * Data change events for data-linking
 *
@@include("templates/-copyright.txt")
 */

@@include("templates/-jshint-directives.txt")

(function (factory) {
	if (typeof define === "function" && define.amd) {
		// Loading from AMD script loader. Register as an anonymous module.
		define(["jquery"], factory);
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

	if ($.observable) { return $; } // JsObservable is already loaded

	var $eventSpecial = $.event.special,
		$views = $.views =
			$.views // jsrender was loaded before jquery.observable
			|| { // jsrender not loaded so set up $.views and $.views.sub here, and merge back in jsrender if loaded afterwards
				jsviews: versionNumber,
				sub: {}
			},
		$sub = $views.sub,
		$isFunction = $.isFunction,
		$isArray = $.isArray,
		OBJECT = "object",
@@include("jquery.observable.js")

	return $;
}));
