/*! JsRender v@@include("templates/-version.txt")@@include("templates/-jsr-version.txt"): http://jsviews.com/#jsrender */
/*! **VERSION FOR NODE.JS** (For WEB see http://jsviews.com/download/jsrender.js) */
/*
 * Best-of-breed templating in browser or on Node.js.
 * Does not require jQuery, or HTML DOM
 * Integrates with JsViews (http://jsviews.com/#jsviews)
 *
@@include('templates/-copyright.txt')
 */

@@include('templates/-jshint-directives.txt')

(function(global) {
"use strict";
if (typeof exports !== 'object' ) {
	throw "Outside Node.js use //jsviews.com/download/jsrender.js";
}

//========================== Top-level vars ==========================

var versionNumber = "v@@include("templates/-version.txt")",

	// global var is the this object, which is window when running in the usual browser environment

	$, jsvStoreName, rTag, rTmplString, topView, $views,

@@include('jsrender.js', { "isNode": true })
// NODE.JS-SPECIFIC CODE:
var nodeFs = require('fs'),
	nodePath = require('path'),
	nodePathSep = nodePath.sep,
	rootDirPath = nodePath.resolve("./"),
	rootDirPathLen = rootDirPath.length + 1;

// Support for rendering templates from file system in Node.js Node, and for Express template engine integration,
// using app.engine('html', jsrender.__express);
$.renderFile = $.__express = function(filepath, data, callback) {
	filepath = './' + nodeFs.realpathSync(filepath).slice(rootDirPathLen).split(nodePathSep).join('/'); // Normalize to ./some/file.html
	var html = $templates(filepath).render(data);
	if (callback) {
		callback(null, html);
	}
	return html;
};

$views.tags("clientTemplate", function(path) { // Custom tag to render a template in a script block, so it can be used as a client template without making an HTTP request
	return '<script id="' + path + '" type="text/x-jsrender">' + $templates(path).markup + '</script>';
});

module.exports = $;
// END NODE.JS-SPECIFIC CODE
}(this));
