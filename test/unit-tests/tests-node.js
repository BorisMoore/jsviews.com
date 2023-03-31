/*global QUnit*/
(function(undefined) {
"use strict";

var jsrender = require('jsrender');
var tmplify = require('jsrender/tmplify');

function upper(val) {
	return val.toUpperCase();
}
function lower(val) {
	return val.toLowerCase();
}

QUnit.test("jsrender.templates", function(assert) {
	var tmpl, html,
		data = {name: "Jo"};

	tmpl = jsrender.templates('./test/templates/name-template.html');
	html = tmpl(data);
	assert.equal(html, "Name: Jo (name-template.html)",
		'jsrender.templates("./file/path/tmplt.html"), using relative path, compiles template');

	tmpl = jsrender.templates('/Google Drive/GitHub/jsviews.com/test/templates/name-template.html');
	html = tmpl(data);
	assert.equal(html, "Name: Jo (name-template.html)",
		'jsrender.templates("/file/path/tmplt.html"), using absolute path, compiles template');

	tmpl = jsrender.templates({markup: 'Some {{:~upper("Markup")}} Name: {{:~upper(name)}} {{lower:name}}', helpers: {upper:upper}, converters: {lower:lower}});
	html = tmpl(data);
	assert.equal(html, "Some MARKUP Name: JO jo",
		'jsrender.templates({markup: ..., helpers: ..., ...}) with markup and options, compiles template and options');
});

QUnit.test("jsrender.render", function(assert) {
	function upper(val) {
		return val.toUpperCase();
	}
	function getName(type) {
		return type + " " + this.name;
	}

	var tmpl, html,
		data = {
			name: "Jo",
			getName: getName
		},
		helpers = {
			type: "Sir",
			upper: upper
		};

	tmpl = jsrender.templates('./test/templates/name-templatePlus.html');
	html = tmpl(data, helpers);
	assert.equal(html, "Name: SIR JO (name-templatePlus.html)",
		'jsrender(data, helpers) accepts helpers/context');

	tmpl = jsrender.templates('./test/templates/name-templatePlus.html');
	html = tmpl.render(data, helpers);
	assert.equal(html, "Name: SIR JO (name-templatePlus.html)",
		'jsrender.render(data, helpers) accepts helpers/context');

	tmpl = jsrender.templates('/Google Drive/GitHub/jsviews.com/test/templates/name-templatePlus.html');
	html = tmpl.render(data, helpers);
	assert.equal(html, "Name: SIR JO (name-templatePlus.html)",
		'jsrender.templates("/file/path/tmplt.html"), using absolute path, compiles template (and renders using data and helpers/context)');
});

QUnit.test("jsrender.renderFile", function(assert) {
	function upper(val) {
		return val.toUpperCase();
	}
	function getName(type) {
		return type + " " + this.name;
	}
	function callback(error, result) { // Currently undocumented
		html2 = error || result;
	}

	var html, html2,
		data = {
			name: "Jo",
			getName: getName
		},
		helpers = {
			type: "Sir",
			upper: upper
		};

	html = jsrender.renderFile('./test/templates/name-template.html', data);
	assert.equal(html, "Name: Jo (name-template.html)",
		'jsrender.renderFile("./file/path/tmplt.html", data), using relative path, loads and renders template');

	html = jsrender.renderFile('test\\templates\\name-template.html', data);
	assert.equal(html, "Name: Jo (name-template.html)",
		'jsrender.renderFile("file\path\tmplt.html", data), using relative path, loads and renders template');

	html = jsrender.renderFile('/Google Drive/GitHub/jsviews.com/test/templates/name-template.html', data);
	assert.equal(html, "Name: Jo (name-template.html)",
		'jsrender.renderFile("/file/path/tmplt.html", data), using absolute path, loads and renders template');

	html = jsrender.renderFile('D:\\Google Drive\\GitHub\\jsviews.com\\test\\templates\\name-template.html', data);
	assert.equal(html, "Name: Jo (name-template.html)",
		'jsrender.renderFile("D:\file\path\tmplt.html", data), using absolute path, loads and renders template');

	html = jsrender.renderFile(process.cwd() + '\\test\\templates\\name-template.html', data);
	assert.equal(html, "Name: Jo (name-template.html)",
		'jsrender.renderFile(process.cwd() + "\\file\\path\\tmplt.html", data), using absolute path, loads and renders template');

	html = jsrender.renderFile('./test/templates/name-templatePlus.html', data, helpers);
	assert.equal(html, "Name: SIR JO (name-templatePlus.html)",
		'jsrender.renderFile("./file/path/tmplt.html", data, helpers) accepts helpers/context');

	html = jsrender.renderFile('/Google Drive/GitHub/jsviews.com/test/templates/name-templatePlus.html', data, helpers);
	assert.equal(html, "Name: SIR JO (name-templatePlus.html)",
		'jsrender.renderFile("/file/path/tmplt.html", data, helpers) accepts helpers/context');

	html = jsrender.renderFile('D:\\Google Drive\\GitHub\\jsviews.com\\test\\templates\\name-templatePlus.html', data, helpers);
	assert.equal(html, "Name: SIR JO (name-templatePlus.html)",
		'jsrender.renderFile("D:\file\path\tmplt.html", data, helpers) accepts helpers/context');

	html = jsrender.renderFile('./test/templates/name-template.html', data, callback);
	assert.equal(html + "|" + html2, "Name: Jo (name-template.html)|Name: Jo (name-template.html)",
		'jsrender.renderFile("./file/path/tmplt.html", data, callback) accepts "filePath, data, callback" signature');

	html = jsrender.renderFile('./test/templates/name-templatePlus.html', data, helpers, callback);
	assert.equal(html + "|" + html2, "Name: SIR JO (name-templatePlus.html)|Name: SIR JO (name-templatePlus.html)",
		'jsrender.renderFile("./file/path/tmplt.html", data, helpers, callback) accepts "filePath, data, context, callback" signature');
});

QUnit.test("jsrender.__express", function(assert) {
	function upper(val) {
		return val.toUpperCase();
	}
	function getName(type) {
		return type + " " + this.name;
	}
	function callback(error, result) {
		html2 = result;
	}

	var html, html2,
		data = {
			name: "Jo",
			getName: getName
		},
		helpers = {
			type: "Sir",
			upper: upper
		};

	html = jsrender.__express('./test/templates/name-template.html', data);
	assert.equal(html, "Name: Jo (name-template.html)",
		'jsrender.__express("./file/path/tmplt.html", data), using relative path, loads and renders template');

	html = jsrender.__express('test\\templates\\name-template.html', data);
	assert.equal(html, "Name: Jo (name-template.html)",
		'jsrender.__express("file\path\tmplt.html", data), using relative path, loads and renders template');

	html = jsrender.__express('/Google Drive/GitHub/jsviews.com/test/templates/name-template.html', data);
	assert.equal(html, "Name: Jo (name-template.html)",
		'jsrender.__express("/file/path/tmplt.html", data), using absolute path, loads and renders template');

	html = jsrender.__express('D:\\Google Drive\\GitHub\\jsviews.com\\test\\templates\\name-template.html', data);
	assert.equal(html, "Name: Jo (name-template.html)",
		'jsrender.__express("D:\file\path\tmplt.html", data), using absolute path, loads and renders template');

	html = jsrender.__express('./test/templates/name-templatePlus.html', data, helpers);
	assert.equal(html, "Name: SIR JO (name-templatePlus.html)",
		'jsrender.__express("./file/path/tmplt.html", data, helpers) accepts helpers/context');

	html = jsrender.__express('/Google Drive/GitHub/jsviews.com/test/templates/name-templatePlus.html', data, helpers);
	assert.equal(html, "Name: SIR JO (name-templatePlus.html)",
		'jsrender.__express("/file/path/tmplt.html", data, helpers) accepts helpers/context');

	html = jsrender.__express('D:\\Google Drive\\GitHub\\jsviews.com\\test\\templates\\name-templatePlus.html', data, helpers);
	assert.equal(html, "Name: SIR JO (name-templatePlus.html)",
		'jsrender.__express("D:\file\path\tmplt.html", data, helpers) accepts helpers/context');

	html = jsrender.__express('./test/templates/name-template.html', data, callback);
	assert.equal(html + "|" + html2, "Name: Jo (name-template.html)|Name: Jo (name-template.html)",
		'jsrender.__express("./file/path/tmplt.html", data, callback) accepts "filePath, data, callback" signature');

	html = jsrender.__express('./test/templates/name-templatePlus.html', data, helpers, callback);
	assert.equal(html + "|" + html2, "Name: SIR JO (name-templatePlus.html)|Name: SIR JO (name-templatePlus.html)",
		'jsrender.__express("./file/path/tmplt.html", data, helpers, callback) accepts "filePath, data, context, callback" signature');
});

QUnit.test("jsrender.tags.clientTemplate", function(assert) {
	jsrender.views.settings.delimiters("<%", "%>");
	var tmpl = jsrender.compile(
		'<script src="//code.jquery.com/jquery-3.6.4.js"></script>\n'
		+ '<script src="//www.jsviews.com/download/jsrender.js"></script>\n'
		+ '<%clientTemplate "./test/templates/outer.html"/%>\n'
		+ '<%clientTemplate "./test/templates/inner.html"/%>\n'
		+ '<script id="clientonly" type="test/x-jsrender">{{include tmpl="./test/templates/outer.html"/}}</script>\n'
		+ '<div id="result"></div>\n'
		+ '<script>var tmpl = $.templates("#clientonly"); $("#result").html(tmpl({name: "Jeff"}));</script>');
	var html = tmpl({name: "Jo"});
	assert.equal(html,
		'<script src="//code.jquery.com/jquery-3.6.4.js"></script>\n'
		+ '<script src="//www.jsviews.com/download/jsrender.js"></script>\n'
		+ '<script id="./test/templates/outer.html" type="text/x-jsrender">Name: {{:name}} (outer.html) {{include tmpl="./test/templates/inner.html"/}}</script>\n'
		+ '<script id="./test/templates/inner.html" type="text/x-jsrender">Name: {{:name}} (inner.html)</script>\n'
		+ '<script id="clientonly" type="test/x-jsrender">{{include tmpl="./test/templates/outer.html"/}}</script>\n'
		+ '<div id="result"></div>\n'
		+ '<script>var tmpl = $.templates("#clientonly"); $("#result").html(tmpl({name: "Jeff"}));</script>',
	'Server-rendered templates using {{clientTemplate "./.../tmpl.html"}}\nand direct rendering using different delimiters on server/client');
});

QUnit.test("jsrender/tmplify .html template", function(assert) {
	stop();
	var outputFile = 'test/browserify/bundles/html-jsr-tmpl-bundle.js';
	var fs = require('fs');
	var browserify = require('browserify');
	browserify('test/browserify/html-jsr-tmpl.js')

	.transform(tmplify) // Use default extensions: "html jsr jsrender"
	.bundle()
	.pipe(fs.createWriteStream(outputFile)
		.on('finish', function() {
			assert.ok(fs.readFileSync(outputFile, 'utf8').indexOf("browserify.done.html ") > 0, 'browserify().transform(tmplify)');
			start();
		})
	)
	.on('error', function(err) {
		console.log(err);
	});
});

QUnit.test("jsrender/tmplify options: 'htm jsr'", function(assert) {
	stop();
	var outputFile = 'test/browserify/bundles/htm-jsrender-tmpl-bundle.js';
	var fs = require('fs');
	var browserify = require('browserify');
	browserify('test/browserify/htm-jsrender-tmpl.js')
	.transform(tmplify, {extensions: 'htm jsrender'})
	.bundle()
	.pipe(fs.createWriteStream(outputFile))
		.on('finish', function() {
			assert.ok(fs.readFileSync(outputFile, 'utf8').indexOf("browserify.done.htm ") > 0, 'browserify().transform(tmplify, {extensions: "..., ..."})');
			start();
		})
	.on('error', function(err) {
		console.log(err);
	});
});

})();
