/*! jsviews.js v1.0.0-alpha single-file version: http://www.jsviews.com/
includes JsRender, JsObservable and JsViews - see: http://www.jsviews.com/#download
@@include("templates/-commit-counter.txt") (Beta Candidate)*/

/* JsRender:
 *   See http://www.jsviews.com/#jsrender and http://github.com/BorisMoore/jsrender
@@include("templates/-copyright.txt")
 */

@@include("templates/-jshint-directives.txt")

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// Loading from AMD script loader. Register as an anonymous module.
		define(["jquery"], factory);
	} else {
		// Browser using plain <script> tag
		factory(this.jQuery);
	}
} (function($, fs) {
	"use strict";

	//========================== Top-level vars ==========================

	var versionNumber = "v1.0.0-alpha",
		requiresStr = "JsViews requires ";

	if (!$) {
		// jQuery is not loaded.
		throw requiresStr + "jQuery"; // We require jQuery
	}

	var jsvStoreName, rTag, rTmplString, topView,

		// global is the this object, which is window when running in the usual browser environment.
		global = (0, eval)('this'), // jshint ignore:line

@@include('jsrender.js')
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< JsObservable >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/* JsObservable:
 * See http://www.jsviews.com/#jsobservable and http://github.com/borismoore/jsviews
@@include("templates/-copyright.txt")
 */

	//========================== Top-level vars ==========================

var $eventSpecial = $.event.special,
@@include("jquery.observable.js")
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< JsViews >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/* JsViews:
 * Interactive data-driven views using templates and data-linking.
 * See  http://www.jsviews.com/#jsviews and http://github.com/BorisMoore/jsviews
@@include("templates/-copyright.txt")
 */

	//========================== Top-level vars ==========================

@@include("jquery.views.js")
	return $;
}));
