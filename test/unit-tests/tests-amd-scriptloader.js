/*global test, equal, module, ok, QUnit, _jsv, viewsAndBindings */
(function(global, $, undefined) {
"use strict";
if (!window.attachEvent || window.addEventListener) { // Running requirejs in qunit async test seems to fail in IE8

module("AMD Script Loader");

test("Loading JsRender, without jQuery, using requirejs", function(assert) {
	var done = assert.async();

	require(["./../download/jsrender"], function($) {
		equal($.templates("Name: {{:name}}").render({name: "Jo"}), "Name: Jo", "JsRender Loaded");
		done();
	});
});

test("Loading JsRender, with jQuery, using requirejs", function(assert) {
	var done = assert.async();

	require(["./requirejs/config"], function() {
		require(["jquery", "./jsrender"], function($) {
			equal($.templates("Name: {{:name}}").render({name: "Jo"}), "Name: Jo", "JsRender Loaded");
			done();
		});
	});
});


test("Loading jquery.observable.js using requirejs", function(assert) {
	var done = assert.async();

	require(["./requirejs/config"], function() {
		require(["./jquery.observable"], function($) {
			var data = {name: "Jo"};
			$.observable(data).setProperty("name", "Jo updated!");
			equal(data.name, "Jo updated!", "jsviews.js loaded");
			done();
		});
	});
});

test("Loading jquery.views.js, plus dependencies, using requirejs", function(assert) {
	var done = assert.async();

	require(["./requirejs/config"], function() {
		require(["./jquery.views"], function($) {
			var data = {name: "Jo"};
			$.templates("Name: {^{:name}}").link("#result", data);
			$.observable(data).setProperty("name", "Jo updated!");
			equal($("#result").text(), "Name: Jo updated!", "jquery.views.js loaded");
			$.observable = $.link = undefined;
			done();
		});
	});
});

test("Loading jsviews.js using requirejs", function(assert) {
	var done = assert.async();

	require(["./requirejs/config"], function() {
		require(["./jsviews"], function($) {
			var data = {name: "Jo"};
			$.templates("Name: {^{:name}}").link("#result", data);
			$.observable(data).setProperty("name", "Jo updated!");
			equal($("#result").text(), "Name: Jo updated!", "jsviews.js loaded");
			$.observable = $.link = undefined;
			done();
		});
	});
});

}
})(this, this.jQuery);
