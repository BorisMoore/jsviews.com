/*! JsRender @@include("templates/-jsr-version.txt"): http://jsviews.com/#jsrender */
/*! **VERSION FOR NODE.JS** (For WEB see http://jsviews.com/download/jsrender.js) */
/*
 * Best-of-breed templating in browser or on Node.js.
 * Does not require jQuery, or HTML DOM
 * Integrates with JsViews (http://jsviews.com/#jsviews)
 *
@@include('templates/-copyright.txt')
 */

@@include('templates/-jshint-directives.txt')

(function() {
"use strict";
if (typeof exports !== 'object' ) {
	throw "Outside Node.js use //jsviews.com/download/jsrender.js";
}

//========================== Top-level vars ==========================

var versionNumber = "v1.0.0-beta",

	// global var is the this object, which is window when running in the usual browser environment
	global = (0, eval)('this'), // jshint ignore:line

	$, jsvStoreName, rTag, rTmplString, topView, $views,

@@include('jsrender.js', { "isNode": true })
// NODE.JS-SPECIFIC CODE:
var nodeFs = require('fs'),
	nodePath = require('path'),
	nodePathSep = nodePath.sep,
	nodeThrough = require('through2'),
	rootDirNameLen = nodePath.resolve("./").length + 1;

// Support for rendering templates from file system in Node.js Node, and for Express template engine integration,
// using app.engine('html', jsrender.__express);
$.renderFile = $.__express = function(filepath, data, callback) {
	filepath = './' + nodeFs.realpathSync(filepath).slice(rootDirNameLen).split(nodePathSep).join('/'); // Normalize to ./some/file.html
	var html = $templates(filepath).render(data);
	if (callback) {
		callback(null, html);
	}
	return html;
};

$views.tags("clientTemplate", function(path) { // Custom tag to render a template in a script block, so it can be used as a client template without making an HTTP request
	return '<script id="' + path + '" type="text/x-jsrender">' + $templates(path).markup + '</script>';
});

// Browserify transform for bundling server-side templates ('./some/file.html') in client js bundle
$.tmplify = function(file, options) {
	var nodeFileDirName = nodePath.dirname(file),
		templateExtName = "." + (options.extension || "html");

	if (nodePath.extname(file) !== templateExtName) {
		return nodeThrough();
	}

	return nodeThrough(function(buf, enc, next) {
		var createTmplCode, ref, pathFromFileDir,
			markup = buf.toString().replace(/^\uFEFF/, ''), // Remove BOM if necessary
			tmpl = $templates(markup),
			bundledFile = '',
			templateName = './' + file.slice(rootDirNameLen).split(nodePathSep).join('/'),
			jsRenderPath = './' + nodePath.relative(nodeFileDirName, "./public/js/jsrender.js").split(nodePathSep).join('/');

		for (ref in tmpl.refs) {
			pathFromFileDir = './' + nodePath.relative(nodeFileDirName, ref).split(nodePathSep).join('/');
			bundledFile += 'require("' + pathFromFileDir + '");\n';
		}

		createTmplCode = '$.templates("' + templateName + '", mkup)';
		bundledFile +=
			"var mkup = '" + markup.replace(/['"\\]/g, "\\$&").replace(/[ \t]*(\r\n|\n|\r)/g, '\\n') + "',\n" // Normalize newlines, and escape quotes and \ character
			+ '  $ = global.jsrender || global.jQuery;\n\n'
			+ 'module.exports = $ ? ' + createTmplCode
			+ ' :\n  function($) {\n'
			+ '    if (!$ || !$.views) {throw "Requires jsrender/jQuery";}\n'
			+ '    return ' + createTmplCode
			+ '\n  };';
		this.push(bundledFile);
		next();
	});
};

module.exports = $;
// END NODE.JS-SPECIFIC CODE
}());
