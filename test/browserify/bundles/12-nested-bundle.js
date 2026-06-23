(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*! JsRender v1.2.0: http://jsviews.com/#jsrender */
/*! **VERSION FOR WEB** (For NODE.JS see http://jsviews.com/download/jsrender-node.js) */
/*
 * Best-of-breed templating in browser or on Node.js.
 * Does not require jQuery, or HTML DOM
 * Integrates with JsViews (http://jsviews.com/#jsviews)
 *
 * Copyright 2026, Boris Moore
 * Released under the MIT License.
 */

//jshint -W018, -W041, -W120

(function(factory, global) {
	// global var is the this object, which is window when running in the usual browser environment
	var $ = global.jQuery;

	if (typeof exports === "object") { // CommonJS e.g. Browserify
		module.exports = $
			? factory(global, $)
			: function($) { // If no global jQuery, take optional jQuery passed as parameter: require('jsrender')(jQuery)
				if ($ && !$.fn) {
					throw "Provide jQuery or null";
				}
				return factory(global, $);
			};
	} else if (typeof define === "function" && define.amd) { // AMD script loader, e.g. RequireJS
		define(function() {
			return factory(global);
		});
	} else { // Browser using plain <script> tag
		factory(global, false);
	}
} (

// factory (for jsrender.js)
function(global, $) {
"use strict";

//========================== Top-level vars ==========================

// global var is the this object, which is window when running in the usual browser environment
var setGlobals = $ === false; // Only set globals if script block in browser (not AMD and not CommonJS)

$ = $ && $.fn ? $ : global.jQuery; // $ is jQuery passed in by CommonJS loader (Browserify), or global jQuery.

var versionNumber = "v1.2.0",
	jsvStoreName, rTag, rTmplString, topView, $views, $expando,
	_ocp = "_ocp",      // Observable contextual parameter
	$isFunction = function(ob) {return typeof ob === "function";},
	$isArray = Array.isArray,
	$templates, $converters, $helpers, $tags, $sub, $subSettings, $subSettingsAdvanced, $viewsSettings,
	delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar, setting, baseOnError,
	isRenderCall,
	rNewLine = /[ \t]*(\r\n|\n|\r)/g,
	rUnescapeQuotes = /\\(['"\\])/g, // Unescape quotes and trim
	rEscapeQuotes = /['"\\]/g, // Escape quotes and \ character
	rBuildHash = /(?:\x08|^)(onerror:)?(?:(~?)(([\w$.]+):)?([^\x08]+))\x08(,)?([^\x08]+)/gi,
	rTestElseIf = /^if\s/,
	rFirstElem = /<(\w+)[>\s]/,
	rAttrEncode = /[\x00`><"'&=]/g, // Includes > encoding since rConvertMarkers in JsViews does not skip > characters in attribute strings
	rIsHtml = /[\x00`><\"'&=]/,
	rHasHandlers = /^on[A-Z]|^convert(Back)?$/,
	rWrappedInViewMarker = /^\#\d+_`[\s\S]*\/\d+_`$/,
	rHtmlEncode = rAttrEncode,
	rDataEncode = /[&<>]/g,
	rDataUnencode = /&(amp|gt|lt);/g,
	rBracketQuote = /\[['"]?|['"]?\]/g,
	viewId = 0,
	charEntities = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\x00": "&#0;",
		"'": "&#39;",
		'"': "&#34;",
		"`": "&#96;",
		"=": "&#61;"
	},
	charsFromEntities = {
		amp: "&",
		gt: ">",
		lt: "<"
	},
	HTML = "html",
	STRING = "string",
	OBJECT = "object",
	tmplAttr = "data-jsv-tmpl",
	jsvTmpl = "jsvTmpl",
	indexStr = "For #index in nested block use #getIndex().",
	cpFnStore = {},     // Compiled furnctions for computed values in template expressions (properties, methods, helpers)
	$render = {},

	jsr = global.jsrender,
	jsrToJq = jsr && $ && !$.render, // JsRender already loaded, without jQuery. but we will re-load it now to attach to jQuery

	jsvStores = {
		template: {
			compile: compileTmpl
		},
		tag: {
			compile: compileTag
		},
		viewModel: {
			compile: compileViewModel
		},
		helper: {},
		converter: {}
	};

	// views object ($.views if jQuery is loaded, jsrender.views if no jQuery, e.g. in Node.js)
	$views = {
		jsviews: versionNumber,
		sub: {
			// subscription, e.g. JsViews integration
			rPath: /^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
			//        not                               object     helper    view  viewProperty pathTokens      leafToken

			rPrm: /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(~?[\w$.^]+)?\s*((\+\+|--)|\+|-|~(?![\w$])|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?(@)?[#~]?[\w$.^]+)([([])?)|(,\s*)|(?:(\()\s*)?\\?(?:(')|("))|(?:\s*(([)\]])(?=[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g,
			//   lftPrn0           lftPrn         bound     path               operator     err                                          eq      path2 late            prn      comma  lftPrn2          apos quot        rtPrn  rtPrnDot                  prn2     space

			View: View,
			Err: JsViewsError,
			tmplFn: tmplFn,
			parse: parseParams,
			extend: $extend,
			extendCtx: extendCtx,
			syntaxErr: syntaxError,
			onStore: {
				template: function(name, item) {
					if (item === null) {
						delete $render[name];
					} else if (name) {
						$render[name] = item;
					}
				}
			},
			addSetting: addSetting,
			settings: {
				allowCode: false
			},
			advSet: noop, // Update advanced settings
			_thp: tagHandlersFromProps,
			_gm: getMethod,
			_tg: function() {}, // Constructor for tagDef
			_cnvt: convertVal,
			_tag: renderTag,
			_er: error,
			_err: onRenderError,
			_cp: retVal, // Get observable contextual parameters (or properties) ~foo=expr. In JsRender, simply returns val.
			_sq: function(token) {
				if (token === "constructor") {
					syntaxError("");
				}
				return token;
			}
		},
		settings: {
			delimiters: $viewsDelimiters,
			advanced: function(value) {
				return value
					? (
							$extend($subSettingsAdvanced, value),
							$sub.advSet(),
							$viewsSettings
						)
						: $subSettingsAdvanced;
				}
		},
		map: dataMap // If jsObservable loaded first, use that definition of dataMap
	};

function getDerivedMethod(baseMethod, method) {
	return function() {
		var ret,
			tag = this,
			prevBase = tag.base;

		tag.base = baseMethod; // Within method call, calling this.base will call the base method
		ret = method.apply(tag, arguments); // Call the method
		tag.base = prevBase; // Replace this.base to be the base method of the previous call, for chained calls
		return ret;
	};
}

function getMethod(baseMethod, method) {
	// For derived methods (or handlers declared declaratively as in {{:foo onChange=~fooChanged}} replace by a derived method, to allow using this.base(...)
	// or this.baseApply(arguments) to call the base implementation. (Equivalent to this._super(...) and this._superApply(arguments) in jQuery UI)
	if ($isFunction(method)) {
		method = getDerivedMethod(
				!baseMethod
					? noop // no base method implementation, so use noop as base method
					: baseMethod._d
						? baseMethod // baseMethod is a derived method, so use it
						: getDerivedMethod(noop, baseMethod), // baseMethod is not derived so make its base method be the noop method
				method
			);
		method._d = (baseMethod && baseMethod._d || 0) + 1; // Add flag for derived method (incremented for derived of derived...)
	}
	return method;
}

function tagHandlersFromProps(tag, tagCtx) {
	var prop,
		props = tagCtx.props;
	for (prop in props) {
		if (rHasHandlers.test(prop) && !(tag[prop] && tag[prop].fix)) { // Don't override handlers with fix expando (used in datepicker and spinner)
			tag[prop] = prop !== "convert" ? getMethod(tag.constructor.prototype[prop], props[prop]) : props[prop];
			// Copy over the onFoo props, convert and convertBack from tagCtx.props to tag (overrides values in tagDef).
			// Note: unsupported scenario: if handlers are dynamically added ^onFoo=expression this will work, but dynamically removing will not work.
		}
	}
}

function retVal(val) {
	return val;
}

function noop() {
	return "";
}

function dbgBreak(val) {
	// Usage examples: {{dbg:...}}, {{:~dbg(...)}}, {{dbg .../}}, {^{for ... onAfterLink=~dbg}} etc.
	try {
		console.log("JsRender dbg breakpoint: " + val);
		throw "dbg breakpoint"; // To break here, stop on caught exceptions.
	}
	catch (e) {}
	return this.base ? this.baseApply(arguments) : val;
}

function JsViewsError(message) {
	// Error exception type for JsViews/JsRender
	// Override of $.views.sub.Error is possible
	this.name = ($.link ? "JsViews" : "JsRender") + " Error";
	this.message = message || this.name;
}

function $extend(target, source) {
	if (target) {
		for (var name in source) {
			if (name !== "__proto__") { // Prevent prototype pollution attacks
				target[name] = source[name];
			}
		}
		return target;
	}
}

(JsViewsError.prototype = new Error()).constructor = JsViewsError;

//========================== Top-level functions ==========================

//===================
// views.delimiters
//===================

	/**
	* Set the tag opening and closing delimiters and 'link' character. Default is "{{", "}}" and "^"
	* openChars, closeChars: opening and closing strings, each with two characters
	* $.views.settings.delimiters(...)
	*
	* @param {string}   openChars
	* @param {string}   [closeChars]
	* @param {string}   [link]
	* @returns {Settings}
	*
	* Get delimiters
	* delimsArray = $.views.settings.delimiters()
	*
	* @returns {string[]}
	*/
function $viewsDelimiters(openChars, closeChars, link) {
	if (!openChars) {
		return $subSettings.delimiters;
	}
	if (Array.isArray(openChars)) {
		return $viewsDelimiters.apply($views, openChars);
	}
	linkChar = link ? link[0] : linkChar;
	if (!/^(\W|_){5}$/.test(openChars + closeChars + linkChar)) {
		error("Invalid delimiters"); // Must be non-word characters, and openChars and closeChars must each be length 2
	}
	delimOpenChar0 = openChars[0];
	delimOpenChar1 = openChars[1];
	delimCloseChar0 = closeChars[0];
	delimCloseChar1 = closeChars[1];

	$subSettings.delimiters = [delimOpenChar0 + delimOpenChar1, delimCloseChar0 + delimCloseChar1, linkChar];

	// Escape the characters - since they could be regex special characters
	openChars = "\\" + delimOpenChar0 + "(\\" + linkChar + ")?\\" + delimOpenChar1; // Default is "{^{"
	closeChars = "\\" + delimCloseChar0 + "\\" + delimCloseChar1;                   // Default is "}}"
	// Build regex with new delimiters
	//          [tag    (followed by / space or })  or cvtr+colon or html or code] followed by space+params then convertBack?
	rTag = "(?:(\\w+(?=[\\/\\s\\" + delimCloseChar0 + "]))|(\\w+)?(:)|(>)|(\\*))\\s*((?:[^\\"
		+ delimCloseChar0 + "]|\\" + delimCloseChar0 + "(?!\\" + delimCloseChar1 + "))*?)";

	// Make rTag available to JsViews (or other components) for parsing binding expressions
	$sub.rTag = "(?:" + rTag + ")";
	//                        { ^? {   tag+params slash?  or closingTag                                                   or comment
	rTag = new RegExp("(?:" + openChars + rTag + "(\\/)?|\\" + delimOpenChar0 + "(\\" + linkChar + ")?\\" + delimOpenChar1 + "(?:(?:\\/(\\w+))\\s*|!--[\\s\\S]*?--))" + closeChars, "g");

	// Default:  bind     tagName         cvt   cln html code    params            slash   bind2         closeBlk  comment
	//      /(?:{(\^)?{(?:(\w+(?=[\/\s}]))|(\w+)?(:)|(>)|(\*))\s*((?:[^}]|}(?!}))*?)(\/)?|{(\^)?{(?:(?:\/(\w+))\s*|!--[\s\S]*?--))}}

	$sub.rTmpl = new RegExp("^\\s|\\s$|<.*>|([^\\\\]|^)[{}]|" + openChars + ".*" + closeChars);
	// $sub.rTmpl looks for initial or final white space, html tags or { or } char not preceded by \\, or JsRender tags {{xxx}}.
	// Each of these strings are considered NOT to be jQuery selectors
	return $viewsSettings;
}

//=========
// View.get
//=========

function getView(inner, type) { //view.get(inner, type)
	if (!type && inner !== true) {
		// view.get(type)
		type = inner;
		inner = undefined;
	}

	var views, i, l, found,
		view = this,
		root = type === "root";
		// view.get("root") returns view.root, view.get() returns view.parent, view.get(true) returns view.views[0].

	if (inner) {
		// Go through views - this one, and all nested ones, depth-first - and return first one with given type.
		// If type is undefined, i.e. view.get(true), return first child view.
		found = type && view.type === type && view;
		if (!found) {
			views = view.views;
			if (view._.useKey) {
				for (i in views) {
					if (found = type ? views[i].get(inner, type) : views[i]) {
						break;
					}
				}
			} else {
				for (i = 0, l = views.length; !found && i < l; i++) {
					found = type ? views[i].get(inner, type) : views[i];
				}
			}
		}
	} else if (root) {
		// Find root view. (view whose parent is top view)
		found = view.root;
	} else if (type) {
		while (view && !found) {
			// Go through views - this one, and all parent ones - and return first one with given type.
			found = view.type === type ? view : undefined;
			view = view.parent;
		}
	} else {
		found = view.parent;
	}
	return found || undefined;
}

function getNestedIndex() {
	var view = this.get("item");
	return view ? view.index : undefined;
}

getNestedIndex.depends = function() {
	return [this.get("item"), "index"];
};

function getIndex() {
	return this.index;
}

getIndex.depends = "index";

//==================
// View.ctxPrm, etc.
//==================

/* Internal private: view._getOb() */
function getPathObject(ob, path, ltOb, fn) {
	// Iterate through path to late paths: @a.b.c paths
	// Return "" (or noop if leaf is a function @a.b.c(...) ) if intermediate object not yet available
	var prevOb, tokens, l,
		i = 0;
	if (ltOb === 1) {
		fn = 1;
		ltOb = undefined;
	}
	// Paths like ^a^b^c or ~^a^b^c will not throw if an object in path is undefined.
	if (path) {
		tokens = path.split(".");
		l = tokens.length;

		for (; ob && i < l; i++) {
			prevOb = ob;
			ob = tokens[i] ? ob[tokens[i]] : ob;
			if ($isFunction(ob)) {
				ob = ob.call(prevOb);
			}
		}
	}
	if (ltOb) {
		ltOb.lt = ltOb.lt || i<l; // If i < l there was an object in the path not yet available
	}
	return ob === undefined
		? fn ? noop : ""
		: fn ? function() {
			return ob.apply(prevOb, arguments);
		} : ob;
}

function contextParameter(key, value, get) {
	// Helper method called as view.ctxPrm(key) for helpers or template parameters ~foo - from compiled template or from context callback
	var wrapped, deps, res, obsCtxPrm, tagElse, callView, newRes,
		storeView = this,
		isUpdate = !isRenderCall && arguments.length > 1,
		store = storeView.ctx;
	if (key) {
		if (!storeView._) { // tagCtx.ctxPrm() call
			tagElse = storeView.index;
			storeView = storeView.tag;
		}
		callView = storeView;
		if (store && store.hasOwnProperty(key) || (store = $helpers).hasOwnProperty(key)) {
			res = store[key];
			if (key === "tag" || key === "tagCtx" || key === "root" || key === "parentTags") {
				return res;
			}
		} else {
			store = undefined;
		}
		if (!isRenderCall && storeView.tagCtx || storeView.linked) { // Data-linked view, or tag instance
			if (!res || !res._cxp) {
				// Not a contextual parameter
				// Set storeView to tag (if this is a tag.ctxPrm() call) or to root view ("data" view of linked template)
				storeView = storeView.tagCtx || $isFunction(res)
					? storeView // Is a tag, not a view, or is a computed contextual parameter, so scope to the callView, not the 'scope view'
					: (storeView = storeView.scope || storeView,
						!storeView.isTop && storeView.ctx.tag // If this view is in a tag, set storeView to the tag
							|| storeView);
				if (res !== undefined && storeView.tagCtx) {
					// If storeView is a tag, but the contextual parameter has been set at at higher level (e.g. helpers)...
					storeView = storeView.tagCtx.view.scope; // then move storeView to the outer level (scope of tag container view)
				}
				store = storeView._ocps;
				res = store && store.hasOwnProperty(key) && store[key] || res;
				if (!(res && res._cxp) && (get || isUpdate)) {
					// Create observable contextual parameter
					(store || (storeView._ocps = storeView._ocps || {}))[key]
						= res
						= [{
							_ocp: res, // The observable contextual parameter value
							_vw: callView,
							_key: key
						}];
					res._cxp = {
						path: _ocp,
						ind: 0,
						updateValue: function(val, path) {
							$.observable(res[0]).setProperty(_ocp, val); // Set the value (res[0]._ocp)
							return this;
						}
					};
				}
			}
			if (obsCtxPrm = res && res._cxp) {
				// If this helper resource is an observable contextual parameter
				if (arguments.length > 2) {
					deps = res[1] ? $sub._ceo(res[1].deps) : [_ocp]; // fn deps (with any exprObs cloned using $sub._ceo)
					deps.unshift(res[0]); // view
					deps._cxp = obsCtxPrm;
					// In a context callback for a contextual param, we set get = true, to get ctxPrm [view, dependencies...] array - needed for observe call
					return deps;
				}
				tagElse = obsCtxPrm.tagElse;
				newRes = res[1] // linkFn for compiled expression
					? obsCtxPrm.tag && obsCtxPrm.tag.cvtArgs
						? obsCtxPrm.tag.cvtArgs(tagElse, 1)[obsCtxPrm.ind] // = tag.bndArgs() - for tag contextual parameter
						: res[1](res[0].data, res[0], $sub) // = fn(data, view, $sub) for compiled binding expression
					: res[0]._ocp; // Observable contextual parameter (uninitialized, or initialized as static expression, so no path dependencies)
				if (isUpdate) {
					$sub._ucp(key, value, storeView, obsCtxPrm); // Update observable contextual parameter
					return storeView;
				}
				res = newRes;
			}
		}
		if (res && $isFunction(res)) {
			// If a helper is of type function we will wrap it, so if called with no this pointer it will be called with the
			// view as 'this' context. If the helper ~foo() was in a data-link expression, the view will have a 'temporary' linkCtx property too.
			// Note that helper functions on deeper paths will have specific this pointers, from the preceding path.
			// For example, ~util.foo() will have the ~util object as 'this' pointer
			wrapped = function() {
				return res.apply((!this || this === global) ? callView : this, arguments);
			};
			$extend(wrapped, res); // Attach same expandos (if any) to the wrapped function
		}
		return wrapped || res;
	}
}

/* Internal private: view._getTmpl() */
function getTemplate(tmpl) {
	return tmpl && (tmpl.fn
		? tmpl
		: this.getRsc("templates", tmpl) || $templates(tmpl)); // not yet compiled
}

//==============
// views._cnvt
//==============

function convertVal(converter, view, tagCtx, onError) {
	// Called from compiled template code for {{:}}
	// self is template object or linkCtx object
	var tag, linkCtx, value, argsLen, bindTo,
		// If tagCtx is an integer, then it is the key for the compiled function to return the boundTag tagCtx
		boundTag = typeof tagCtx === "number" && view.tmpl.bnds[tagCtx-1];

	if (onError === undefined && boundTag && boundTag._lr) { // lateRender
		onError = "";
	}
	if (onError !== undefined) {
		tagCtx = onError = {props: {}, args: [onError]};
	} else if (boundTag) {
		tagCtx = boundTag(view.data, view, $sub);
	}
	boundTag = boundTag._bd && boundTag;
	if (converter || boundTag) {
		linkCtx = view._lc; // For data-link="{cvt:...}"... See onDataLinkedTagChange
		tag = linkCtx && linkCtx.tag;
		tagCtx.view = view;
		if (!tag) {
			tag = $extend(new $sub._tg(), {
				_: {
					bnd: boundTag,
					unlinked: true,
					lt: tagCtx.lt // If a late path @some.path has not returned @some object, mark tag as late
				},
				inline: !linkCtx,
				tagName: ":",
				convert: converter,
				onArrayChange: true,
				flow: true,
				tagCtx: tagCtx,
				tagCtxs: [tagCtx],
				_is: "tag"
			});
			argsLen = tagCtx.args.length;
			if (argsLen>1) {
				bindTo = tag.bindTo = [];
				while (argsLen--) {
					bindTo.unshift(argsLen); // Bind to all the arguments - generate bindTo array: [0,1,2...]
				}
			}
			if (linkCtx) {
				linkCtx.tag = tag;
				tag.linkCtx = linkCtx;
			}
			tagCtx.ctx = extendCtx(tagCtx.ctx, (linkCtx ? linkCtx.view : view).ctx);
			tagHandlersFromProps(tag, tagCtx);
		}
		tag._er = onError && value;
		tag.ctx = tagCtx.ctx || tag.ctx || {};
		tagCtx.ctx = undefined;
		value = tag.cvtArgs()[0]; // If there is a convertBack but no convert, converter will be "true"
		tag._er = onError && value;
	} else {
		value = tagCtx.args[0];
	}

	// Call onRender (used by JsViews if present, to add binding annotations around rendered content)
	value = boundTag && view._.onRender
		? view._.onRender(value, view, tag)
		: value;
	return value != undefined ? value : "";
}

function convertArgs(tagElse, bound) { // tag.cvtArgs() or tag.cvtArgs(tagElse?, true?)
	var l, key, boundArgs, args, bindFrom, tag, converter,
		tagCtx = this;

	if (tagCtx.tagName) {
		tag = tagCtx;
		tagCtx = (tag.tagCtxs || [tagCtx])[tagElse||0];
		if (!tagCtx) {
			return;
		}
	} else {
		tag = tagCtx.tag;
	}

	bindFrom = tag.bindFrom;
	args = tagCtx.args;

	if ((converter = tag.convert) && typeof converter === STRING) {
		converter = converter === "true"
			? undefined
			: (tagCtx.view.getRsc("converters", converter) || error("Unknown converter: '" + converter + "'"));
	}

	if (converter && !bound) { // If there is a converter, use a copy of the tagCtx.args array for rendering, and replace the args[0] in
		args = args.slice(); // the copied array with the converted value. But we do not modify the value of tag.tagCtx.args[0] (the original args array)
	}
	if (bindFrom) { // Get the values of the boundArgs
		boundArgs = [];
		l = bindFrom.length;
		while (l--) {
			key = bindFrom[l];
			boundArgs.unshift(argOrProp(tagCtx, key));
		}
		if (bound) {
			args = boundArgs; // Call to bndArgs() - returns the boundArgs
		}
	}
	if (converter) {
		converter = converter.apply(tag, boundArgs || args);
		if (converter === undefined) {
			return args; // Returning undefined from a converter is equivalent to not having a converter.
		}
		bindFrom = bindFrom || [0];
		l = bindFrom.length;
		if (!$isArray(converter) || (converter.arg0 !== false && (l === 1 || converter.length !== l || converter.arg0))) {
			converter = [converter]; // Returning converter as first arg, even if converter value is an array
			bindFrom = [0];
			l = 1;
		}
		if (bound) {        // Call to bndArgs() - so apply converter to all boundArgs
			args = converter; // The array of values returned from the converter
		} else {            // Call to cvtArgs()
			while (l--) {
				key = bindFrom[l];
				if (+key === key) {
					args[key] = converter[l];
				}
			}
		}
	}
	return args;
}

function argOrProp(context, key) {
	context = context[+key === key ? "args" : "props"];
	return context && context[key];
}

function convertBoundArgs(tagElse) { // tag.bndArgs()
	return this.cvtArgs(tagElse, 1);
}

//=============
// views.tag
//=============

/* view.getRsc() */
function getResource(resourceType, itemName) {
	var res, store,
		view = this;
	if (typeof itemName === STRING) {
		while ((res === undefined) && view) {
			store = view.tmpl && view.tmpl[resourceType];
			res = store && store[itemName];
			view = view.parent;
		}
		return res || $views[resourceType][itemName];
	}
}

function renderTag(tagName, parentView, tmpl, tagCtxs, isUpdate, onError) {
	function bindToOrBindFrom(type) {
		var bindArray = tag[type];

		if (bindArray !== undefined) {
			bindArray = $isArray(bindArray) ? bindArray : [bindArray];
			m = bindArray.length;
			while (m--) {
				key = bindArray[m];
				if (!isNaN(parseInt(key))) {
					bindArray[m] = parseInt(key); // Convert "0" to 0, etc.
				}
			}
		}

		return bindArray || [0];
	}

	parentView = parentView || topView;
	var tag, tagDef, template, tags, attr, parentTag, l, m, n, itemRet, tagCtx, tagCtxCtx, ctxPrm, bindTo, bindFrom, initVal,
		content, callInit, mapDef, thisMap, args, bdArgs, props, tagDataMap, contentCtx, key, bindFromLength, bindToLength, linkedElement, defaultCtx,
		i = 0,
		ret = "",
		linkCtx = parentView._lc || false, // For data-link="{myTag...}"... See onDataLinkedTagChange
		ctx = parentView.ctx,
		parentTmpl = tmpl || parentView.tmpl,
		// If tagCtxs is an integer, then it is the key for the compiled function to return the boundTag tagCtxs
		boundTag = typeof tagCtxs === "number" && parentView.tmpl.bnds[tagCtxs-1];

	if (tagName._is === "tag") {
		tag = tagName;
		tagName = tag.tagName;
		tagCtxs = tag.tagCtxs;
		template = tag.template;
	} else {
		tagDef = parentView.getRsc("tags", tagName) || error("Unknown tag: {{" + tagName + "}} ");
		template = tagDef.template;
	}
	if (onError === undefined && boundTag && (boundTag._lr = (tagDef.lateRender && boundTag._lr!== false || boundTag._lr))) {
		onError = ""; // If lateRender, set temporary onError, to skip initial rendering (and render just "")
	}
	if (onError !== undefined) {
		ret += onError;
		tagCtxs = onError = [{props: {}, args: [], params: {props:{}}}];
	} else if (boundTag) {
		tagCtxs = boundTag(parentView.data, parentView, $sub);
	}

	l = tagCtxs.length;
	for (; i < l; i++) {
		tagCtx = tagCtxs[i];
		content = tagCtx.tmpl;
		if (!linkCtx || !linkCtx.tag || i && !linkCtx.tag.inline || tag._er || content && +content===content) {
			// Initialize tagCtx
			// For block tags, tagCtx.tmpl is an integer > 0
			if (content && parentTmpl.tmpls) {
				tagCtx.tmpl = tagCtx.content = parentTmpl.tmpls[content - 1]; // Set the tmpl property to the content of the block tag
			}
			tagCtx.index = i;
			tagCtx.ctxPrm = contextParameter;
			tagCtx.render = renderContent;
			tagCtx.cvtArgs = convertArgs;
			tagCtx.bndArgs = convertBoundArgs;
			tagCtx.view = parentView;
			tagCtx.ctx = extendCtx(extendCtx(tagCtx.ctx, tagDef && tagDef.ctx), ctx); // Clone and extend parentView.ctx
		}
		if (tmpl = tagCtx.props.tmpl) {
			// If the tmpl property is overridden, set the value (when initializing, or, in case of binding: ^tmpl=..., when updating)
			tagCtx.tmpl = parentView._getTmpl(tmpl);
			tagCtx.content = tagCtx.content || tagCtx.tmpl;
		}

		if (!tag) {
			// This will only be hit for initial tagCtx (not for {{else}}) - if the tag instance does not exist yet
			// If the tag has not already been instantiated, we will create a new instance.
			// ~tag will access the tag, even within the rendering of the template content of this tag.
			// From child/descendant tags, can access using ~tag.parent, or ~parentTags.tagName
			tag = new tagDef._ctr();
			callInit = !!tag.init;

			tag.parent = parentTag = ctx && ctx.tag;
			tag.tagCtxs = tagCtxs;

			if (linkCtx) {
				tag.inline = false;
				linkCtx.tag = tag;
			}
			tag.linkCtx = linkCtx;
			if (tag._.bnd = boundTag || linkCtx.fn) {
				// Bound if {^{tag...}} or data-link="{tag...}"
				tag._.ths = tagCtx.params.props["this"]; // Tag has a this=expr binding, to get javascript reference to tag instance
				tag._.lt = tagCtxs.lt; // If a late path @some.path has not returned @some object, mark tag as late
				tag._.arrVws = {};
			} else if (tag.dataBoundOnly) {
				error(tagName + " must be data-bound:\n{^{" + tagName + "}}");
			}
			//TODO better perf for childTags() - keep child tag.tags array, (and remove child, when disposed)
			// tag.tags = [];
		} else if (linkCtx && linkCtx.fn._lr) {
			callInit = !!tag.init;
		}
		tagDataMap = tag.dataMap;

		tagCtx.tag = tag;
		if (tagDataMap && tagCtxs) {
			tagCtx.map = tagCtxs[i].map; // Copy over the compiled map instance from the previous tagCtxs to the refreshed ones
		}
		if (!tag.flow) {
			tagCtxCtx = tagCtx.ctx = tagCtx.ctx || {};

			// tags hash: tag.ctx.tags, merged with parentView.ctx.tags,
			tags = tag.parents = tagCtxCtx.parentTags = ctx && extendCtx(tagCtxCtx.parentTags, ctx.parentTags) || {};
			if (parentTag) {
				tags[parentTag.tagName] = parentTag;
				//TODO better perf for childTags: parentTag.tags.push(tag);
			}
			tags[tag.tagName] = tagCtxCtx.tag = tag;
			tagCtxCtx.tagCtx = tagCtx;
		}
	}
	if (!(tag._er = onError)) {
		tagHandlersFromProps(tag, tagCtxs[0]);
		tag.rendering = {rndr: tag.rendering}; // Provide object for state during render calls to tag and elses. (Used by {{if}} and {{for}}...)
		for (i = 0; i < l; i++) { // Iterate tagCtx for each {{else}} block
			tagCtx = tag.tagCtx = tagCtxs[i];
			props = tagCtx.props;
			tag.ctx = tagCtx.ctx;

			if (!i) {
				if (callInit) {
					tag.init(tagCtx, linkCtx, tag.ctx);
					callInit = undefined;
				}
				if (!tagCtx.args.length && tagCtx.argDefault !== false && tag.argDefault !== false) {
					tagCtx.args = args = [tagCtx.view.data]; // Missing first arg defaults to the current data context
					tagCtx.params.args = ["#data"];
				}

				bindTo = bindToOrBindFrom("bindTo");

				if (tag.bindTo !== undefined) {
					tag.bindTo = bindTo;
				}

				if (tag.bindFrom !== undefined) {
					tag.bindFrom = bindToOrBindFrom("bindFrom");
				} else if (tag.bindTo) {
					tag.bindFrom = tag.bindTo = bindTo;
				}
				bindFrom = tag.bindFrom || bindTo;

				bindToLength = bindTo.length;
				bindFromLength = bindFrom.length;

				if (tag._.bnd && (linkedElement = tag.linkedElement)) {
					tag.linkedElement = linkedElement = $isArray(linkedElement) ? linkedElement: [linkedElement];

					if (bindToLength !== linkedElement.length) {
						error("linkedElement not same length as bindTo");
					}
				}
				if (linkedElement = tag.linkedCtxParam) {
					tag.linkedCtxParam = linkedElement = $isArray(linkedElement) ? linkedElement: [linkedElement];

					if (bindFromLength !== linkedElement.length) {
						error("linkedCtxParam not same length as bindFrom/bindTo");
					}
				}

				if (bindFrom) {
					tag._.fromIndex = {}; // Hash of bindFrom index which has same path value as bindTo index. fromIndex = tag._.fromIndex[toIndex]
					tag._.toIndex = {}; // Hash of bindFrom index which has same path value as bindTo index. fromIndex = tag._.fromIndex[toIndex]
					n = bindFromLength;
					while (n--) {
						key = bindFrom[n];
						m = bindToLength;
						while (m--) {
							if (key === bindTo[m]) {
								tag._.fromIndex[m] = n;
								tag._.toIndex[n] = m;
							}
						}
					}
				}

				if (linkCtx) {
					// Set attr on linkCtx to ensure outputting to the correct target attribute.
					// Setting either linkCtx.attr or this.attr in the init() allows per-instance choice of target attrib.
					linkCtx.attr = tag.attr = linkCtx.attr || tag.attr || linkCtx._dfAt;
				}
				attr = tag.attr;
				tag._.noVws = attr && attr !== HTML;
			}
			args = tag.cvtArgs(i);
			if (tag.linkedCtxParam) {
				bdArgs = tag.cvtArgs(i, 1);
				m = bindFromLength;
				defaultCtx = tag.constructor.prototype.ctx;
				while (m--) {
					if (ctxPrm = tag.linkedCtxParam[m]) {
						key = bindFrom[m];
						initVal = bdArgs[m];
						// Create tag contextual parameter
						tagCtx.ctx[ctxPrm] = $sub._cp(
							defaultCtx && initVal === undefined ? defaultCtx[ctxPrm]: initVal,
							initVal !== undefined && argOrProp(tagCtx.params, key),
							tagCtx.view,
							tag._.bnd && {tag: tag, cvt: tag.convert, ind: m, tagElse: i}
						);
					}
				}
			}
			if ((mapDef = props.dataMap || tagDataMap) && (args.length || props.dataMap)) {
				thisMap = tagCtx.map;
				if (!thisMap || thisMap.src !== args[0] || isUpdate) {
					if (thisMap && thisMap.src) {
						thisMap.unmap(); // only called if observable map - not when only used in JsRender, e.g. by {{props}}
					}
					mapDef.map(args[0], tagCtx, thisMap, !tag._.bnd);
					thisMap = tagCtx.map;
				}
				args = [thisMap.tgt];
			}

			itemRet = undefined;
			if (tag.render) {
				itemRet = tag.render.apply(tag, args);
				if (parentView.linked && itemRet && !rWrappedInViewMarker.test(itemRet)) {
					// When a tag renders content from the render method, with data linking then we need to wrap with view markers, if absent,
					// to provide a contentView for the tag, which will correctly dispose bindings if deleted. The 'tmpl' for this view will
					// be a dumbed-down template which will always return the itemRet string (no matter what the data is). The itemRet string
					// is not compiled as template markup, so can include "{{" or "}}" without triggering syntax errors
					tmpl = { // 'Dumbed-down' template which always renders 'static' itemRet string
						links: []
					};
					tmpl.render = tmpl.fn = function() {
						return itemRet;
					};
					itemRet = renderWithViews(tmpl, parentView.data, undefined, true, parentView, undefined, undefined, tag);
				}
			}
			if (!args.length) {
				args = [parentView]; // no arguments - (e.g. {{else}}) get data context from view.
			}
			if (itemRet === undefined) {
				contentCtx = args[0]; // Default data context for wrapped block content is the first argument
				if (tag.contentCtx) { // Set tag.contentCtx to true, to inherit parent context, or to a function to provide alternate context.
					contentCtx = tag.contentCtx === true ? parentView : tag.contentCtx(contentCtx);
				}
				itemRet = tagCtx.render(contentCtx, true) || (isUpdate ? undefined : "");
			}
			ret = ret
				? ret + (itemRet || "")
				: itemRet !== undefined
					? "" + itemRet
					: undefined; // If no return value from render, and no template/content tagCtx.render(...), return undefined
		}
		tag.rendering = tag.rendering.rndr; // Remove tag.rendering object (if this is outermost render call. (In case of nested calls)
	}
	tag.tagCtx = tagCtxs[0];
	tag.ctx = tag.tagCtx.ctx;

	if (tag._.noVws && tag.inline) {
		// inline tag with attr set to "text" will insert HTML-encoded content - as if it was element-based innerText
		ret = attr === "text"
			? $converters.html(ret)
			: "";
	}
	return boundTag && parentView._.onRender
		// Call onRender (used by JsViews if present, to add binding annotations around rendered content)
		? parentView._.onRender(ret, parentView, tag)
		: ret;
}

//=================
// View constructor
//=================

function View(context, type, parentView, data, template, key, onRender, contentTmpl) {
	// Constructor for view object in view hierarchy. (Augmented by JsViews if JsViews is loaded)
	var views, parentView_, tag, self_,
		self = this,
		isArray = type === "array";
		// If the data is an array, this is an 'array view' with a views array for each child 'item view'
		// If the data is not an array, this is an 'item view' with a views 'hash' object for any child nested views

	self.content = contentTmpl;
	self.views = isArray ? [] : {};
	self.data = data;
	self.tmpl = template;
	self_ = self._ = {
		key: 0,
		// ._.useKey is non zero if is not an 'array view' (owning a data array). Use this as next key for adding to child views hash
		useKey: isArray ? 0 : 1,
		id: "" + viewId++,
		onRender: onRender,
		bnds: {}
	};
	self.linked = !!onRender;
	self.type = type || "top";
	if (type) {
		self.cache = {_ct: $subSettings._cchCt}; // Used for caching results of computed properties and helpers (view.getCache)
	}

	if (!parentView || parentView.type === "top") {
		(self.ctx = context || {}).root = self.data;
	}

	if (self.parent = parentView) {
		self.root = parentView.root || self; // view whose parent is top view
		views = parentView.views;
		parentView_ = parentView._;
		self.isTop = parentView_.scp; // Is top content view of a link("#container", ...) call
		self.scope = (!context.tag || context.tag === parentView.ctx.tag) && !self.isTop && parentView.scope || self;
		// Scope for contextParams - closest non flow tag ancestor or root view
		if (parentView_.useKey) {
			// Parent is not an 'array view'. Add this view to its views object
			// self._key = is the key in the parent view hash
			views[self_.key = "_" + parentView_.useKey++] = self;
			self.index = indexStr;
			self.getIndex = getNestedIndex;
		} else if (views.length === (self_.key = self.index = key)) { // Parent is an 'array view'. Add this view to its views array
			views.push(self); // Adding to end of views array. (Using push when possible - better perf than splice)
		} else {
			views.splice(key, 0, self); // Inserting in views array
		}
		// If no context was passed in, use parent context
		// If context was passed in, it should have been merged already with parent context
		self.ctx = context || parentView.ctx;
	} else if (type) {
		self.root = self; // view whose parent is top view
	}
}

View.prototype = {
	get: getView,
	getIndex: getIndex,
	ctxPrm: contextParameter,
	getRsc: getResource,
	_getTmpl: getTemplate,
	_getOb: getPathObject,
	getCache: function(key) { // Get cached value of computed value
		if ($subSettings._cchCt > this.cache._ct) {
			this.cache = {_ct: $subSettings._cchCt};
		}
		return this.cache[key] !== undefined ? this.cache[key] : (this.cache[key] = cpFnStore[key](this.data, this, $sub));
	},
	_is: "view"
};

//====================================================
// Registration
//====================================================

function compileChildResources(parentTmpl) {
	var storeName, storeNames, resources;
	for (storeName in jsvStores) {
		storeNames = storeName + "s";
		if (parentTmpl[storeNames]) {
			resources = parentTmpl[storeNames];        // Resources not yet compiled
			parentTmpl[storeNames] = {};               // Remove uncompiled resources
			$views[storeNames](resources, parentTmpl); // Add back in the compiled resources
		}
	}
}

//===============
// compileTag
//===============

function compileTag(name, tagDef, parentTmpl) {
	var tmpl, baseTag, prop,
		compiledDef = new $sub._tg();

	function Tag() {
		var tag = this;
		tag._ = {
			unlinked: true
		};
		tag.inline = true;
		tag.tagName = name;
	}

	if ($isFunction(tagDef)) {
		// Simple tag declared as function. No presenter instantation.
		tagDef = {
			depends: tagDef.depends,
			render: tagDef
		};
	} else if (typeof tagDef === STRING) {
		tagDef = {template: tagDef};
	}

	if (baseTag = tagDef.baseTag) {
		tagDef.flow = !!tagDef.flow; // Set flow property, so defaults to false even if baseTag has flow=true
		baseTag = typeof baseTag === STRING
			? (parentTmpl && parentTmpl.tags[baseTag] || $tags[baseTag])
			: baseTag;
		if (!baseTag) {
			error('baseTag: "' + tagDef.baseTag + '" not found');
		}
		compiledDef = $extend(compiledDef, baseTag);

		for (prop in tagDef) {
			compiledDef[prop] = getMethod(baseTag[prop], tagDef[prop]);
		}
	} else {
		compiledDef = $extend(compiledDef, tagDef);
	}

	// Tag declared as object, used as the prototype for tag instantiation (control/presenter)
	if ((tmpl = compiledDef.template) !== undefined) {
		compiledDef.template = typeof tmpl === STRING ? ($templates[tmpl] || $templates(tmpl)) : tmpl;
	}
	(Tag.prototype = compiledDef).constructor = compiledDef._ctr = Tag;

	if (parentTmpl) {
		compiledDef._parentTmpl = parentTmpl;
	}
	return compiledDef;
}

function baseApply(args) {
	// In derived method (or handler declared declaratively as in {{:foo onChange=~fooChanged}} can call base method,
	// using this.baseApply(arguments) (Equivalent to this._superApply(arguments) in jQuery UI)
	return this.base.apply(this, args);
}

//===============
// compileTmpl
//===============

function compileTmpl(name, tmpl, parentTmpl, options) {
	// tmpl is either a template object, a selector for a template script block, or the name of a compiled template

	//==== nested functions ====
	function lookupTemplate(value) {
		// If value is of type string - treat as selector, or name of compiled template
		// Return the template object, if already compiled, or the markup string
		var currentName, tmpl;
		if ((typeof value === STRING) || value.nodeType > 0 && (elem = value)) {
			if (!elem) {
				if (/^\.?\/[^\\:*?"<>]*$/.test(value)) {
					// value="./some/file.html" (or "/some/file.html")
					// If the template is not named, use "./some/file.html" as name.
					if (tmpl = $templates[name = name || value]) {
						value = tmpl;
					} else {
						// BROWSER-SPECIFIC CODE (not on Node.js):
						// Look for server-generated script block with id "./some/file.html"
						elem = document.getElementById(value);
					}
				} else if (value.charAt(0) === "#") {
					elem = document.getElementById(value.slice(1));
				} if (!elem && $.fn && !$sub.rTmpl.test(value)) {
					try {
						elem = $(value, document)[0]; // if jQuery is loaded, test for selector returning elements, and get first element
					} catch (e) {}
				}// END BROWSER-SPECIFIC CODE
			} //BROWSER-SPECIFIC CODE
			if (elem) {
				if (elem.tagName !== "SCRIPT") {
					error(value + ": Use script block, not " + elem.tagName);
				}
				if (options) {
					// We will compile a new template using the markup in the script element
					value = elem.innerHTML;
				} else {
					// We will cache a single copy of the compiled template, and associate it with the name
					// (renaming from a previous name if there was one).
					currentName = elem.getAttribute(tmplAttr);
					if (currentName) {
						if (currentName !== jsvTmpl) {
							value = $templates[currentName];
							delete $templates[currentName];
						} else if ($.fn) {
							value = $.data(elem)[jsvTmpl]; // Get cached compiled template
						}
					}
					if (!currentName || !value) { // Not yet compiled, or cached version lost
						name = name || ($.fn ? jsvTmpl : value);
						value = compileTmpl(name, elem.innerHTML, parentTmpl, options);
					}
					value.tmplName = name = name || currentName;
					if (name !== jsvTmpl) {
						$templates[name] = value;
					}
					elem.setAttribute(tmplAttr, name);
					if ($.fn) {
						$.data(elem, jsvTmpl, value);
					}
				}
			} // END BROWSER-SPECIFIC CODE
			elem = undefined;
		} else if (!value.fn) {
			value = undefined;
			// If value is not a string. HTML element, or compiled template, return undefined
		}
		return value;
	}

	var elem, compiledTmpl,
		tmplOrMarkup = tmpl = tmpl || "";
	$sub._html = $converters.html;

	//==== Compile the template ====
	if (options === 0) {
		options = undefined;
		tmplOrMarkup = lookupTemplate(tmplOrMarkup); // Top-level compile so do a template lookup
	}

	// If options, then this was already compiled from a (script) element template declaration.
	// If not, then if tmpl is a template object, use it for options
	options = options || (tmpl.markup
		? tmpl.bnds
			? $extend({}, tmpl)
			: tmpl
		: {}
	);

	options.tmplName = options.tmplName || name || "unnamed";
	if (parentTmpl) {
		options._parentTmpl = parentTmpl;
	}
	// If tmpl is not a markup string or a selector string, then it must be a template object
	// In that case, get it from the markup property of the object
	if (!tmplOrMarkup && tmpl.markup && (tmplOrMarkup = lookupTemplate(tmpl.markup)) && tmplOrMarkup.fn) {
		// If the string references a compiled template object, need to recompile to merge any modified options
		tmplOrMarkup = tmplOrMarkup.markup;
	}
	if (tmplOrMarkup !== undefined) {
		if (tmplOrMarkup.render || tmpl.render) {
			// tmpl is already compiled, so use it
			if (tmplOrMarkup.tmpls) {
				compiledTmpl = tmplOrMarkup;
			}
		} else {
			// tmplOrMarkup is a markup string, not a compiled template
			// Create template object
			tmpl = tmplObject(tmplOrMarkup, options);
			// Compile to AST and then to compiled function
			tmplFn(tmplOrMarkup.replace(rEscapeQuotes, "\\$&"), tmpl);
		}
		if (!compiledTmpl) {
			compiledTmpl = $extend(function() {
				return compiledTmpl.render.apply(compiledTmpl, arguments);
			}, tmpl);

			compileChildResources(compiledTmpl);
		}
		return compiledTmpl;
	}
}

//==== /end of function compileTmpl ====

//=================
// compileViewModel
//=================

function getDefaultVal(defaultVal, data) {
	return $isFunction(defaultVal)
		? defaultVal.call(data)
		: defaultVal;
}

function addParentRef(ob, ref, parent) {
	Object.defineProperty(ob, ref, {
		value: parent,
		configurable: true
	});
}

function compileViewModel(name, type) {
	var i, constructor, parent,
		viewModels = this,
		getters = type.getters,
		extend = type.extend,
		id = type.id,
		proto = $.extend({
			_is: name || "unnamed",
			unmap: unmap,
			merge: merge
		}, extend),
		args = "",
		cnstr = "",
		getterCount = getters ? getters.length : 0,
		$observable = $.observable,
		getterNames = {};

	function JsvVm(args) {
		constructor.apply(this, args);
	}

	function vm() {
		return new JsvVm(arguments);
	}

	function iterate(data, action) {
		var getterType, defaultVal, prop, ob, parentRef,
			j = 0;
		for (; j < getterCount; j++) {
			prop = getters[j];
			getterType = undefined;
			if (typeof prop !== STRING) {
				getterType = prop;
				prop = getterType.getter;
				parentRef = getterType.parentRef;
			}
			if ((ob = data[prop]) === undefined && getterType && (defaultVal = getterType.defaultVal) !== undefined) {
				ob = getDefaultVal(defaultVal, data);
			}
			action(ob, getterType && viewModels[getterType.type], prop, parentRef);
		}
	}

	function map(data) {
		data = typeof data === STRING
			? JSON.parse(data) // Accept JSON string
			: data;            // or object/array
		var l, prop, childOb, parentRef,
			j = 0,
			ob = data,
			arr = [];

		if ($isArray(data)) {
			data = data || [];
			l = data.length;
			for (; j<l; j++) {
				arr.push(this.map(data[j]));
			}
			arr._is = name;
			arr.unmap = unmap;
			arr.merge = merge;
			return arr;
		}

		if (data) {
			iterate(data, function(ob, viewModel) {
				if (viewModel) { // Iterate to build getters arg array (value, or mapped value)
					ob = viewModel.map(ob);
				} else if (typeof ob === STRING && (ob[0] === "{" && ob[ob.length-1] === "}" || ob[0] === "[" && ob[ob.length-1] === "]")){
					// If it is a string with the start/end char: {/}, or [/], then assume it is a JSON expression
					ob = JSON.parse(ob);
				}
				arr.push(ob);
			});
			ob = this.apply(this, arr); // Instantiate this View Model, passing getters args array to constructor
			j = getterCount;
			while (j--) {
				childOb = arr[j];
				parentRef = getters[j].parentRef;
				if (parentRef && childOb && childOb.unmap) {
					if ($isArray(childOb)) {
						l = childOb.length;
						while (l--) {
							addParentRef(childOb[l], parentRef, ob);
						}
					} else {
						addParentRef(childOb, parentRef, ob);
					}
				}
			}
			for (prop in data) { // Copy over any other properties. that are not get/set properties
				if (prop !== $expando && !getterNames[prop]) {
					ob[prop] = data[prop];
				}
			}
		}
		return ob;
	}

	function merge(data, parent, parentRef) {
		data = typeof data === STRING
			? JSON.parse(data) // Accept JSON string
			: data;            // or object/array

		var j, l, m, prop, mod, found, assigned, ob, newModArr, childOb,
			k = 0,
			model = this;

		if ($isArray(model)) {
			assigned = {};
			newModArr = [];
			l = data.length;
			m = model.length;
			for (; k<l; k++) {
				ob = data[k];
				found = false;
				for (j=0; j<m && !found; j++) {
					if (assigned[j]) {
						continue;
					}
					mod = model[j];

					if (id) {
						assigned[j] = found = typeof id === STRING
						? (ob[id] && (getterNames[id] ? mod[id]() : mod[id]) === ob[id])
						: id(mod, ob);
					}
				}
				if (found) {
					mod.merge(ob);
					newModArr.push(mod);
				} else {
					newModArr.push(childOb = vm.map(ob));
					if (parentRef) {
						addParentRef(childOb, parentRef, parent);
					}
				}
			}
			if ($observable) {
				$observable(model).refresh(newModArr, true);
			} else {
				model.splice.apply(model, [0, model.length].concat(newModArr));
			}
			return;
		}
		iterate(data, function(ob, viewModel, getter, parentRef) {
			if (viewModel) {
				model[getter]().merge(ob, model, parentRef); // Update typed property
			} else if (model[getter]() !== ob) {
				if (typeof ob === STRING && (ob[0] === "{" && ob[ob.length-1] === "}" || ob[0] === "[" && ob[ob.length-1] === "]")){
					// If it is a string with the start/end char: {/}, or [/], then assume it is a JSON expression
					ob = JSON.parse(ob);
				}
				model[getter](ob); // Update non-typed property
			}
		});
		for (prop in data) {
			if (prop !== $expando && !getterNames[prop]) {
				model[prop] = data[prop];
			}
		}
	}

	function unmap() {
		var ob, prop, getterType, arr, value,
			k = 0,
			model = this;

		function unmapArray(modelArr) {
			var arr = [],
				i = 0,
				l = modelArr.length;
			for (; i<l; i++) {
				arr.push(modelArr[i].unmap());
			}
			return arr;
		}

		if ($isArray(model)) {
			return unmapArray(model);
		}
		ob = {};
		for (; k < getterCount; k++) {
			prop = getters[k];
			getterType = undefined;
			if (typeof prop !== STRING) {
				getterType = prop;
				prop = getterType.getter;
			}
			value = model[prop]();
			ob[prop] = getterType && value && viewModels[getterType.type]
				? $isArray(value)
					? unmapArray(value)
					: value.unmap()
				: value;
		}
		for (prop in model) {
			if (model.hasOwnProperty(prop) && (prop.charAt(0) !== "_" || !getterNames[prop.slice(1)]) && prop !== $expando && !$isFunction(model[prop])) {
				ob[prop] = model[prop];
			}
		}
		return ob;
	}

	JsvVm.prototype = proto;

	for (i=0; i < getterCount; i++) {
		(function(getter) {
			getter = getter.getter || getter;
			getterNames[getter] = i+1;
			var privField = "_" + getter;

			args += (args ? "," : "") + getter;
			cnstr += "this." + privField + " = " + getter + ";\n";
			proto[getter] = proto[getter] || function(val) {
				if (!arguments.length) {
					return this[privField]; // If there is no argument, use as a getter
				}
				if ($observable) {
					$observable(this).setProperty(getter, val);
				} else {
					this[privField] = val;
				}
			};

			if ($observable) {
				proto[getter].set = proto[getter].set || function(val) {
					this[privField] = val; // Setter called by observable property change
				};
			}
		})(getters[i]);
	}

	// Constructor for new viewModel instance.
	cnstr = new Function(args, cnstr);

	constructor = function() {
		cnstr.apply(this, arguments);
		// Pass additional parentRef str and parent obj to have a parentRef pointer on instance
		if (parent = arguments[getterCount + 1]) {
			addParentRef(this, arguments[getterCount], parent);
		}
	};

	constructor.prototype = proto;
	proto.constructor = constructor;

	vm.map = map;
	vm.getters = getters;
	vm.extend = extend;
	vm.id = id;
	return vm;
}

function tmplObject(markup, options) {
	// Template object constructor
	var htmlTag,
		wrapMap = $subSettingsAdvanced._wm || {}, // Only used in JsViews. Otherwise empty: {}
		tmpl = {
			tmpls: [],
			links: {}, // Compiled functions for link expressions
			bnds: [],
			_is: "template",
			render: renderContent
		};

	if (options) {
		tmpl = $extend(tmpl, options);
	}

	tmpl.markup = markup;
	if (!tmpl.htmlTag) {
		// Set tmpl.tag to the top-level HTML tag used in the template, if any...
		htmlTag = rFirstElem.exec(markup);
		tmpl.htmlTag = htmlTag ? htmlTag[1].toLowerCase() : "";
	}
	htmlTag = wrapMap[tmpl.htmlTag];
	if (htmlTag && htmlTag !== wrapMap.div) {
		// When using JsViews, we trim templates which are inserted into HTML contexts where text nodes are not rendered (i.e. not 'Phrasing Content').
		// Currently not trimmed for <li> tag. (Not worth adding perf cost)
		tmpl.markup = tmpl.markup.trim();
	}

	return tmpl;
}

//==============
// registerStore
//==============

/**
* Internal. Register a store type (used for template, tags, helpers, converters)
*/
function registerStore(storeName, storeSettings) {

/**
* Generic store() function to register item, named item, or hash of items
* Also used as hash to store the registered items
* Used as implementation of $.templates(), $.views.templates(), $.views.tags(), $.views.helpers() and $.views.converters()
*
* @param {string|hash} name         name - or selector, in case of $.templates(). Or hash of items
* @param {any}         [item]       (e.g. markup for named template)
* @param {template}    [parentTmpl] For item being registered as private resource of template
* @returns {any|$.views} item, e.g. compiled template - or $.views in case of registering hash of items
*/
	function theStore(name, item, parentTmpl) {
		// The store is also the function used to add items to the store. e.g. $.templates, or $.views.tags

		// For store of name 'thing', Call as:
		//    $.views.things(items[, parentTmpl]),
		// or $.views.things(name[, item, parentTmpl])

		var compile, itemName, thisStore, cnt,
			onStore = $sub.onStore[storeName];

		if (name && typeof name === OBJECT && !name.nodeType && !name.markup && !name.getTgt && !(storeName === "viewModel" && name.getters || name.extend)) {
			// Call to $.views.things(items[, parentTmpl]),

			// Adding items to the store
			// If name is a hash, then item is parentTmpl. Iterate over hash and call store for key.
			for (itemName in name) {
				theStore(itemName, name[itemName], item);
			}
			return item || $views;
		}
		// Adding a single unnamed item to the store
		if (name &&  typeof name !== STRING) { // name must be a string
			parentTmpl = item;
			item = name;
			name = undefined;
		}
		thisStore = parentTmpl
			? storeName === "viewModel"
				? parentTmpl
				: (parentTmpl[storeNames] = parentTmpl[storeNames] || {})
			: theStore;
		compile = storeSettings.compile;

		if (item === undefined) {
			item = compile ? name : thisStore[name];
			name = undefined;
		}
		if (item === null) {
			// If item is null, delete this entry
			if (name) {
				delete thisStore[name];
			}
		} else {
			if (compile) {
				item = compile.call(thisStore, name, item, parentTmpl, 0) || {};
				item._is = storeName; // Only do this for compiled objects (tags, templates...)
			}
			if (name) {
				thisStore[name] = item;
			}
		}
		if (onStore) {
			// e.g. JsViews integration
			onStore(name, item, parentTmpl, compile);
		}
		return item;
	}

	var storeNames = storeName + "s";
	$views[storeNames] = theStore;
}

/**
* Add settings such as:
* $.views.settings.allowCode(true)
* @param {boolean} value
* @returns {Settings}
*
* allowCode = $.views.settings.allowCode()
* @returns {boolean}
*/
function addSetting(st) {
	$viewsSettings[st] = $viewsSettings[st] || function(value) {
		return arguments.length
			? ($subSettings[st] = value, $viewsSettings)
			: $subSettings[st];
	};
}

//========================
// dataMap for render only
//========================

function dataMap(mapDef) {
	function Map(source, options) {
		this.tgt = mapDef.getTgt(source, options);
		options.map = this;
	}

	if ($isFunction(mapDef)) {
		// Simple map declared as function
		mapDef = {
			getTgt: mapDef
		};
	}

	if (mapDef.baseMap) {
		mapDef = $extend($extend({}, mapDef.baseMap), mapDef);
	}

	mapDef.map = function(source, options) {
		return new Map(source, options);
	};
	return mapDef;
}

//==============
// renderContent
//==============

/** Render the template as a string, using the specified data and helpers/context
* $("#tmpl").render(), tmpl.render(), tagCtx.render(), $.render.namedTmpl()
*
* @param {any}        data
* @param {hash}       [context]           helpers or context
* @param {boolean}    [noIteration]
* @param {View}       [parentView]        internal
* @param {string}     [key]               internal
* @param {function}   [onRender]          internal
* @returns {string}   rendered template   internal
*/
function renderContent(data, context, noIteration, parentView, key, onRender) {
	var i, l, tag, tmpl, tagCtx, isTopRenderCall, prevData, prevIndex,
		view = parentView,
		result = "";

	if (context === true) {
		noIteration = context; // passing boolean as second param - noIteration
		context = undefined;
	} else if (typeof context !== OBJECT) {
		context = undefined; // context must be a boolean (noIteration) or a plain object
	}

	if (tag = this.tag) {
		// This is a call from renderTag or tagCtx.render(...)
		tagCtx = this;
		view = view || tagCtx.view;
		tmpl = view._getTmpl(tag.template || tagCtx.tmpl);
		if (!arguments.length) {
			data = tag.contentCtx && $isFunction(tag.contentCtx)
				? data = tag.contentCtx(data)
				: view; // Default data context for wrapped block content is the first argument
		}
	} else {
		// This is a template.render(...) call
		tmpl = this;
	}

	if (tmpl) {
		if (!parentView && data && data._is === "view") {
			view = data; // When passing in a view to render or link (and not passing in a parent view) use the passed-in view as parentView
		}

		if (view && data === view) {
			// Inherit the data from the parent view.
			data = view.data;
		}

		isTopRenderCall = !view;
		isRenderCall = isRenderCall || isTopRenderCall;
		if (isTopRenderCall) {
			(context = context || {}).root = data; // Provide ~root as shortcut to top-level data.
		}
		if (!isRenderCall || $subSettingsAdvanced.useViews || tmpl.useViews || view && view !== topView) {
			result = renderWithViews(tmpl, data, context, noIteration, view, key, onRender, tag);
		} else {
			if (view) { // In a block
				prevData = view.data;
				prevIndex = view.index;
				view.index = indexStr;
			} else {
				view = topView;
				prevData = view.data;
				view.data = data;
				view.ctx = context;
			}
			if ($isArray(data) && !noIteration) {
				// Create a view for the array, whose child views correspond to each data item. (Note: if key and parentView are passed in
				// along with parent view, treat as insert -e.g. from view.addViews - so parentView is already the view item for array)
				for (i = 0, l = data.length; i < l; i++) {
					view.index = i;
					view.data = data[i];
					result += tmpl.fn(data[i], view, $sub);
				}
			} else {
				view.data = data;
				result += tmpl.fn(data, view, $sub);
			}
			view.data = prevData;
			view.index = prevIndex;
		}
		if (isTopRenderCall) {
			isRenderCall = undefined;
		}
	}
	return result;
}

function renderWithViews(tmpl, data, context, noIteration, view, key, onRender, tag) {
	// Render template against data as a tree of subviews (nested rendered template instances), or as a string (top-level template).
	// If the data is the parent view, treat as noIteration, re-render with the same data context.
	// tmpl can be a string (e.g. rendered by a tag.render() method), or a compiled template.
	var i, l, newView, childView, itemResult, swapContent, contentTmpl, outerOnRender, tmplName, itemVar, newCtx, tagCtx, noLinking,
		result = "";

	if (tag) {
		// This is a call from renderTag or tagCtx.render(...)
		tmplName = tag.tagName;
		tagCtx = tag.tagCtx;
		context = context ? extendCtx(context, tag.ctx) : tag.ctx;

		if (tmpl === view.content) { // {{xxx tmpl=#content}}
			contentTmpl = tmpl !== view.ctx._wrp // We are rendering the #content
				? view.ctx._wrp // #content was the tagCtx.props.tmpl wrapper of the block content - so within this view, #content will now be the view.ctx._wrp block content
				: undefined; // #content was the view.ctx._wrp block content - so within this view, there is no longer any #content to wrap.
		} else if (tmpl !== tagCtx.content) {
			if (tmpl === tag.template) { // Rendering {{tag}} tag.template, replacing block content.
				contentTmpl = tagCtx.tmpl; // Set #content to block content (or wrapped block content if tagCtx.props.tmpl is set)
				context._wrp = tagCtx.content; // Pass wrapped block content to nested views
			} else { // Rendering tagCtx.props.tmpl wrapper
				contentTmpl = tagCtx.content || view.content; // Set #content to wrapped block content
			}
		} else {
			contentTmpl = view.content; // Nested views inherit same wrapped #content property
		}

		if (tagCtx.props.link === false) {
			// link=false setting on block tag
			// We will override inherited value of link by the explicit setting link=false taken from props
			// The child views of an unlinked view are also unlinked. So setting child back to true will not have any effect.
			context = context || {};
			context.link = false;
		}
	}

	if (view) {
		onRender = onRender || view._.onRender;
		noLinking = context && context.link === false;

		if (noLinking && view._.nl) {
			onRender = undefined;
		}

		context = extendCtx(context, view.ctx);
		tagCtx = !tag && view.tag
			? view.tag.tagCtxs[view.tagElse]
			: tagCtx;
	}

	if (itemVar = tagCtx && tagCtx.props.itemVar) {
		if (itemVar[0] !== "~") {
			syntaxError("Use itemVar='~myItem'");
		}
		itemVar = itemVar.slice(1);
	}

	if (key === true) {
		swapContent = true;
		key = 0;
	}

	// If link===false, do not call onRender, so no data-linking marker nodes
	if (onRender && tag && tag._.noVws) {
		onRender = undefined;
	}
	outerOnRender = onRender;
	if (onRender === true) {
		// Used by view.refresh(). Don't create a new wrapper view.
		outerOnRender = undefined;
		onRender = view._.onRender;
	}
	// Set additional context on views created here, (as modified context inherited from the parent, and to be inherited by child views)
	context = tmpl.helpers
		? extendCtx(tmpl.helpers, context)
		: context;

	newCtx = context;
	if ($isArray(data) && !noIteration) {
		// Create a view for the array, whose child views correspond to each data item. (Note: if key and view are passed in
		// along with parent view, treat as insert -e.g. from view.addViews - so view is already the view item for array)
		newView = swapContent
			? view
			: (key !== undefined && view)
				|| new View(context, "array", view, data, tmpl, key, onRender, contentTmpl);
		newView._.nl= noLinking;
		if (view && view._.useKey) {
			// Parent is not an 'array view'
			newView._.bnd = !tag || tag._.bnd && tag; // For array views that are data bound for collection change events, set the
			// view._.bnd property to true for top-level link() or data-link="{for}", or to the tag instance for a data-bound tag, e.g. {^{for ...}}
			newView.tag = tag;
		}
		for (i = 0, l = data.length; i < l; i++) {
			// Create a view for each data item.
			childView = new View(newCtx, "item", newView, data[i], tmpl, (key || 0) + i, onRender, newView.content);
			if (itemVar) {
				(childView.ctx = $extend({}, newCtx))[itemVar] = $sub._cp(data[i], "#data", childView);
			}
			itemResult = tmpl.fn(data[i], childView, $sub);
			result += newView._.onRender ? newView._.onRender(itemResult, childView) : itemResult;
		}
	} else {
		// Create a view for singleton data object. The type of the view will be the tag name, e.g. "if" or "mytag" except for
		// "item", "array" and "data" views. A "data" view is from programmatic render(object) against a 'singleton'.
		newView = swapContent ? view : new View(newCtx, tmplName || "data", view, data, tmpl, key, onRender, contentTmpl);

		if (itemVar) {
			(newView.ctx = $extend({}, newCtx))[itemVar] = $sub._cp(data, "#data", newView);
		}

		newView.tag = tag;
		newView._.nl = noLinking;
		result += tmpl.fn(data, newView, $sub);
	}
	if (tag) {
		newView.tagElse = tagCtx.index;
		tagCtx.contentView = newView;
	}
	return outerOnRender ? outerOnRender(result, newView) : result;
}

//===========================
// Build and compile template
//===========================

// Generate a reusable function that will serve to render a template against data
// (Compile AST then build template function)

function onRenderError(e, view, fallback) {
	var message = fallback !== undefined
		? $isFunction(fallback)
			? fallback.call(view.data, e, view)
			: fallback || ""
		: "{Error: " + (e.message||e) + "}";

	if ($subSettings.onError && (fallback = $subSettings.onError.call(view.data, e, fallback && message, view)) !== undefined) {
		message = fallback; // There is a settings.debugMode(handler) onError override. Call it, and use return value (if any) to replace message
	}
	return view && !view._lc ? $converters.html(message) : message; // For data-link=\"{... onError=...}"... See onDataLinkedTagChange
}

function error(message) {
	throw new $sub.Err(message);
}

function syntaxError(message) {
	error("Syntax error\n" + message);
}

function tmplFn(markup, tmpl, isLinkExpr, convertBack, hasElse) {
	// Compile markup to AST (abtract syntax tree) then build the template function code from the AST nodes
	// Used for compiling templates, and also by JsViews to build functions for data link expressions

	//==== nested functions ====
	function pushprecedingContent(shift) {
		shift -= loc;
		if (shift) {
			content.push(markup.substr(loc, shift).replace(rNewLine, "\\n"));
		}
	}

	function blockTagCheck(tagName, block) {
		if (tagName) {
			tagName += '}}';
			//			'{{include}} block has {{/for}} with no open {{for}}'
			syntaxError((
				block
					? '{{' + block + '}} block has {{/' + tagName + ' without {{' + tagName
					: 'Unmatched or missing {{/' + tagName) + ', in template:\n' + markup);
		}
	}

	function parseTag(all, bind, tagName, converter, colon, html, codeTag, params, slash, bind2, closeBlock, index) {
/*

     bind     tagName         cvt   cln html code    params            slash   bind2         closeBlk  comment
/(?:{(\^)?{(?:(\w+(?=[\/\s}]))|(\w+)?(:)|(>)|(\*))\s*((?:[^}]|}(?!}))*?)(\/)?|{(\^)?{(?:(?:\/(\w+))\s*|!--[\s\S]*?--))}}/g

(?:
  {(\^)?{            bind
  (?:
    (\w+             tagName
      (?=[\/\s}])
    )
    |
    (\w+)?(:)        converter colon
    |
    (>)              html
    |
    (\*)             codeTag
  )
  \s*
  (                  params
    (?:[^}]|}(?!}))*?
  )
  (\/)?              slash
  |
  {(\^)?{            bind2
  (?:
    (?:\/(\w+))\s*   closeBlock
    |
    !--[\s\S]*?--    comment
  )
)
}}/g

*/
		if (codeTag && bind || slash && !tagName || params && params.slice(-1) === ":" || bind2) {
			syntaxError(all);
		}

		// Build abstract syntax tree (AST): [tagName, converter, params, content, hash, bindings, contentMarkup]
		if (html) {
			colon = ":";
			converter = HTML;
		}
		slash = slash || isLinkExpr && !hasElse;

		var late, openTagName, isLateOb,
			pathBindings = (bind || isLinkExpr) && [[]], // pathBindings is an array of arrays for arg bindings and a hash of arrays for prop bindings
			props = "",
			args = "",
			ctxProps = "",
			paramsArgs = "",
			paramsProps = "",
			paramsCtxProps = "",
			onError = "",
			useTrigger = "",
			// Block tag if not self-closing and not {{:}} or {{>}} (special case) and not a data-link expression
			block = !slash && !colon;

		//==== nested helper function ====
		tagName = tagName || (params = params || "#data", colon); // {{:}} is equivalent to {{:#data}}
		pushprecedingContent(index);
		loc = index + all.length; // location marker - parsed up to here
		if (codeTag) {
			if (allowCode) {
				content.push(["*", "\n" + params.replace(/^:/, "ret+= ").replace(rUnescapeQuotes, "$1") + ";\n"]);
			}
		} else if (tagName) {
			if (tagName === "else") {
				if (rTestElseIf.test(params)) {
					syntaxError('For "{{else if expr}}" use "{{else expr}}"');
				}
				pathBindings = current[9] && [[]];
				current[10] = markup.substring(current[10], index); // contentMarkup for block tag
				openTagName = current[11] || current[0] || syntaxError("Mismatched: " + all);
				// current[0] is tagName, but for {{else}} nodes, current[11] is tagName of preceding open tag
				current = stack.pop();
				content = current[2];
				block = true;
			}
			if (params) {
				// remove newlines from the params string, to avoid compiled code errors for unterminated strings
				parseParams(params.replace(rNewLine, " "), pathBindings, tmpl, isLinkExpr)
					.replace(rBuildHash, function(all, onerror, isCtxPrm, key, keyToken, keyValue, arg, param) {
						if (key === "this:") {
							keyValue = "undefined"; // this=some.path is always a to parameter (one-way), so don't need to compile/evaluate some.path initialization
						}
						if (param) {
							isLateOb = isLateOb || param[0] === "@";
						}
						key = "'" + keyToken + "':";
						if (arg) {
							args += isCtxPrm + keyValue + ",";
							paramsArgs += "'" + param + "',";
						} else if (isCtxPrm) { // Contextual parameter, ~foo=expr
							ctxProps += key + 'j._cp(' + keyValue + ',"' + param + '",view),';
							// Compiled code for evaluating tagCtx on a tag will have: ctx:{'foo':j._cp(compiledExpr, "expr", view)}
							paramsCtxProps += key + "'" + param + "',";
						} else if (onerror) {
							onError += keyValue;
						} else {
							if (keyToken === "trigger") {
								useTrigger += keyValue;
							}
							if (keyToken === "lateRender") {
								late = param !== "false"; // Render after first pass
							}
							props += key + keyValue + ",";
							paramsProps += key + "'" + param + "',";
							hasHandlers = hasHandlers || rHasHandlers.test(keyToken);
						}
						return "";
					}).slice(0, -1);
			}

			if (pathBindings && pathBindings[0]) {
				pathBindings.pop(); // Remove the binding that was prepared for next arg. (There is always an extra one ready).
			}

			newNode = [
					tagName,
					converter || !!convertBack || hasHandlers || "",
					block && [],
					parsedParam(paramsArgs || (tagName === ":" ? "'#data'," : ""), paramsProps, paramsCtxProps), // {{:}} equivalent to {{:#data}}
					parsedParam(args || (tagName === ":" ? "data," : ""), props, ctxProps),
					onError,
					useTrigger,
					late,
					isLateOb,
					pathBindings || 0
				];
			content.push(newNode);
			if (block) {
				stack.push(current);
				current = newNode;
				current[10] = loc; // Store current location of open tag, to be able to add contentMarkup when we reach closing tag
				current[11] = openTagName; // Used for checking syntax (matching close tag)
			}
		} else if (closeBlock) {
			blockTagCheck(closeBlock !== current[0] && closeBlock !== current[11] && closeBlock, current[0]); // Check matching close tag name
			current[10] = markup.substring(current[10], index); // contentMarkup for block tag
			current = stack.pop();
		}
		blockTagCheck(!current && closeBlock);
		content = current[2];
	}
	//==== /end of nested functions ====

	var i, result, newNode, hasHandlers, bindings,
		allowCode = $subSettings.allowCode || tmpl && tmpl.allowCode
			|| $viewsSettings.allowCode === true, // include direct setting of settings.allowCode true for backward compat only
		astTop = [],
		loc = 0,
		stack = [],
		content = astTop,
		current = [,,astTop];

	if (allowCode && tmpl._is) {
		tmpl.allowCode = allowCode;
	}

//TODO	result = tmplFnsCache[markup]; // Only cache if template is not named and markup length < ...,
//and there are no bindings or subtemplates?? Consider standard optimization for data-link="a.b.c"
//		if (result) {
//			tmpl.fn = result;
//		} else {

//		result = markup;
	if (isLinkExpr) {
		if (convertBack !== undefined) {
			markup = markup.slice(0, -convertBack.length - 2) + delimCloseChar0;  // "{:myExpr:myCvt}" => "{:myExpr}"
		}
		markup = delimOpenChar0 + markup + delimCloseChar1;
	}

	blockTagCheck(stack[0] && stack[0][2].pop()[0]);
	// Build the AST (abstract syntax tree) under astTop
	markup.replace(rTag, parseTag);

	pushprecedingContent(markup.length);

	if (loc = astTop[astTop.length - 1]) {
		blockTagCheck(typeof loc !== STRING && (+loc[10] === loc[10]) && loc[0]);
	}
//			result = tmplFnsCache[markup] = buildCode(astTop, tmpl);
//		}

	if (isLinkExpr) {
		result = buildCode(astTop, markup, isLinkExpr);
		bindings = [];
		i = astTop.length;
		while (i--) {
			bindings.unshift(astTop[i][9]); // With data-link expressions, pathBindings array for tagCtx[i] is astTop[i][9]
		}
		setPaths(result, bindings);
	} else {
		result = buildCode(astTop, tmpl);
	}
	return result;
}

function setPaths(fn, pathsArr) {
	var key, paths,
		i = 0,
		l = pathsArr.length;
	fn.deps = [];
	fn.paths = []; // The array of path binding (array/dictionary)s for each tag/else block's args and props
	for (; i < l; i++) {
		fn.paths.push(paths = pathsArr[i]);
		for (key in paths) {
			if (key !== "_jsvto" && paths.hasOwnProperty(key) && paths[key].length && !paths[key].skp) {
				fn.deps = fn.deps.concat(paths[key]); // deps is the concatenation of the paths arrays for the different bindings
			}
		}
	}
}

function parsedParam(args, props, ctx) {
	return [args.slice(0, -1), props.slice(0, -1), ctx.slice(0, -1)];
}

function paramStructure(paramCode, paramVals) {
	return '\n\tparams:{args:[' + paramCode[0] + '],\n\tprops:{' + paramCode[1] + '}'
		+ (paramCode[2] ? ',\n\tctx:{' + paramCode[2] + '}' : "")
		+ '},\n\targs:[' + paramVals[0] + '],\n\tprops:{' + paramVals[1] + '}'
		+ (paramVals[2] ? ',\n\tctx:{' + paramVals[2] + '}' : "");
}

function parseParams(params, pathBindings, tmpl, isLinkExpr) {

	function parseTokens(all, lftPrn0, lftPrn, bound, path, operator, err, eq, path2, late, prn,
												comma, lftPrn2, apos, quot, rtPrn, rtPrnDot, prn2, space, index, full) {
	// /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(~?[\w$.^]+)?\s*((\+\+|--)|\+|-|~(?![\w$])|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?(@)?[#~]?[\w$.^]+)([([])?)|(,\s*)|(?:(\()\s*)?\\?(?:(')|("))|(?:\s*(([)\]])(?=[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g,
	//lftPrn0           lftPrn         bound     path               operator     err                                          eq      path2 late            prn      comma  lftPrn2          apos quot        rtPrn  rtPrnDot                  prn2     space
	// (left paren? followed by (path? followed by operator) or (path followed by paren?)) or comma or apos or quot or right paren or space

		function parsePath(allPath, not, object, helper, view, viewProperty, pathTokens, leafToken) {
			// /^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
			//    not                               object     helper    view  viewProperty pathTokens      leafToken
			subPath = object === ".";
			if (object) {
				path = path.slice(not.length);
				if (/^\.?constructor$/.test(leafToken||path)) {
					syntaxError(allPath);
				}
				if (!subPath) {
					allPath = (late // late path @a.b.c: not throw on 'property of undefined' if a undefined, and will use _getOb() after linking to resolve late.
							? (isLinkExpr ? '' : '(ltOb.lt=ltOb.lt||') + '(ob='
							: ""
						)
						+ (helper
							? 'view.ctxPrm("' + helper + '")'
							: view
								? "view"
								: "data")
						+ (late
							? ')===undefined' + (isLinkExpr ? '' : ')') + '?"":view._getOb(ob,"'
							: ""
						)
						+ (leafToken
							? (viewProperty
								? "." + viewProperty
								: helper
									? ""
									: (view ? "" : "." + object)
								) + (pathTokens || "")
							: (leafToken = helper ? "" : view ? viewProperty || "" : object, ""));
					allPath = allPath + (leafToken ? "." + leafToken : "");

					allPath = not + (allPath.slice(0, 9) === "view.data"
						? allPath.slice(5) // convert #view.data... to data...
						: allPath)
					+ (late
							? (isLinkExpr ? '"': '",ltOb') + (prn ? ',1)':')')
							: ""
						);
				}
				if (bindings) {
					binds = named === "_linkTo" ? (bindto = pathBindings._jsvto = pathBindings._jsvto || []) : bndCtx.bd;
					if (theOb = subPath && binds[binds.length-1]) {
						if (theOb._cpfn) { // Computed property exprOb
							while (theOb.sb) {
								theOb = theOb.sb;
							}
							if (theOb.prm) {
								if (theOb.bnd) {
									path = "^" + path.slice(1);
								}
								theOb.sb = path;
								theOb.bnd = theOb.bnd || path[0] === "^";
							}
						}
					} else {
						binds.push(path);
					}
					if (prn && !subPath) {
						pathStart[fnDp] = ind;
						compiledPathStart[fnDp] = compiledPath[fnDp].length;
					}
				}
			}
			return allPath;
		}

		//bound = bindings && bound;
		if (bound && !eq) {
			path = bound + path; // e.g. some.fn(...)^some.path - so here path is "^some.path"
		}
		operator = operator || "";
		lftPrn2 = lftPrn2 || "";
		lftPrn = lftPrn || lftPrn0 || lftPrn2;
		path = path || path2;

		if (late && (late = !/\)|]/.test(full[index-1]))) {
			path = path.slice(1).split(".").join("^"); // Late path @z.b.c. Use "^" rather than "." to ensure that deep binding will be used
		}
		// Could do this - but not worth perf cost?? :-
		// if (!path.lastIndexOf("#data.", 0)) { path = path.slice(6); } // If path starts with "#data.", remove that.
		prn = prn || prn2 || "";
		var expr, binds, theOb, newOb, subPath, lftPrnFCall, ret,
			ind = index;

		if (!aposed && !quoted) {
			if (err) {
				syntaxError(params);
			}
			if (rtPrnDot && bindings) {
				// This is a binding to a path in which an object is returned by a helper/data function/expression, e.g. foo()^x.y or (a?b:c)^x.y
				// We create a compiled function to get the object instance (which will be called when the dependent data of the subexpression changes,
				// to return the new object, and trigger re-binding of the subsequent path)
				expr = pathStart[fnDp-1];
				if (typeof full !== "undefined" && full.length - 1 > ind - (expr || 0)) { // We need to compile a subexpression
					expr = full.slice(expr, ind + all.length).trim();
					binds = bindto || bndStack[fnDp-1].bd;
					// Insert exprOb object, to be used during binding to return the computed object
					theOb = binds[binds.length-1];
					if (theOb && theOb.prm) {
						while (theOb.sb && theOb.sb.prm) {
							theOb = theOb.sb;
						}
						newOb = theOb.sb = {path: theOb.sb, bnd: theOb.bnd};
						if (!newOb.path && theOb.path) {
							theOb.bnd = true;
						}
					} else {
						binds.push(newOb = {path: binds.pop()}); // Insert exprOb object, to be used during binding to return the computed object
					}
					if (theOb && theOb.sb === newOb) {
						compiledPath[fnDp] = compiledPath[fnDp-1].slice(theOb._cpPthSt) + compiledPath[fnDp];
						compiledPath[fnDp-1] = compiledPath[fnDp-1].slice(0, theOb._cpPthSt);
					}
					newOb._cpPthSt = compiledPathStart[fnDp-1];
					newOb._cpKey = expr;

					compiledPath[fnDp] += full.slice(prevIndex, index);
					prevIndex = index;

					newOb._cpfn = cpFnStore[expr] = cpFnStore[expr] || // Compiled function for computed value: get from store, or compile and store
						new Function("data,view,j", // Compiled function for computed value in template
					"//" + expr + "\nvar v;\nreturn ((v=" + compiledPath[fnDp] + (rtPrn === "]" ? ")]" : rtPrn) + ")!=null?v:null);");

					compiledPath[fnDp-1] += (fnCall[prnDp] && $subSettingsAdvanced.cache ? "view.getCache(\"" + expr.replace(rEscapeQuotes, "\\$&") + "\"" : compiledPath[fnDp]);

					newOb.prm = bndCtx.bd;
					newOb.bnd = newOb.bnd || newOb.path && newOb.path.indexOf("^") >= 0;
				}
				compiledPath[fnDp] = "";
			}
			if (prn === "[") {
				prn = "[j._sq(";
			}
			if (lftPrn === "[") {
				lftPrn = "[j._sq(";
			}
		}
		ret = (aposed
			// within single-quoted string
			? (aposed = !apos, (aposed ? all : lftPrn2 + '"'))
			: quoted
			// within double-quoted string
				? (quoted = !quot, (quoted ? all : lftPrn2 + '"'))
				:
			(
				(lftPrn
					? (
						prnStack[++prnDp] = true,
						prnInd[prnDp] = 0,
						bindings && (
							pathStart[fnDp++] = ind++,
							bndCtx = bndStack[fnDp] = {bd: []},
							compiledPath[fnDp] = "",
							compiledPathStart[fnDp] = 1
						),
						lftPrn) // Left paren, (not a function call paren)
					: "")
				+ (space
					? (prnDp
						? "" // A space within parens or within function call parens, so not a separator for tag args
			// New arg or prop - so insert backspace \b (\x08) as separator for named params, used subsequently by rBuildHash, and prepare new bindings array
						: (paramIndex = full.slice(paramIndex, ind), named
							? (named = boundName = bindto = false, "\b")
							: "\b,") + paramIndex + (paramIndex = ind + all.length, bindings && pathBindings.push(bndCtx.bd = []), "\b")
					)
					: eq
			// named param. Remove bindings for arg and create instead bindings array for prop
						? (fnDp && syntaxError(params), bindings && pathBindings.pop(), named = "_" + path, boundName = bound, paramIndex = ind + all.length,
								bindings && ((bindings = bndCtx.bd = pathBindings[named] = []), bindings.skp = !bound), path + ':')
						: path
			// path
							? (path.split("^").join(".").replace($sub.rPath, parsePath)
								+ (prn || operator)
							)
							: operator
			// operator
								? operator
								: rtPrn
			// function
									? rtPrn === "]" ? ")]" : ")"
									: comma
										? (fnCall[prnDp] || syntaxError(params), ",") // We don't allow top-level literal arrays or objects
										: lftPrn0
											? ""
											: (aposed = apos, quoted = quot, '"')
			))
		);

		if (!aposed && !quoted) {
			if (rtPrn) {
				fnCall[prnDp] = false;
				prnDp--;
			}
		}

		if (bindings) {
			if (!aposed && !quoted) {
				if (rtPrn) {
					if (prnStack[prnDp+1]) {
						bndCtx = bndStack[--fnDp];
						prnStack[prnDp+1] = false;
					}
					prnStart = prnInd[prnDp+1];
				}
				if (prn) {
					prnInd[prnDp+1] = compiledPath[fnDp].length + (lftPrn ? 1 : 0);
					if (path || rtPrn) {
						bndCtx = bndStack[++fnDp] = {bd: []};
						prnStack[prnDp+1] = true;
					}
				}
			}

			compiledPath[fnDp] = (compiledPath[fnDp]||"") + full.slice(prevIndex, index);
			prevIndex = index+all.length;

			if (!aposed && !quoted) {
				if (lftPrnFCall = lftPrn && prnStack[prnDp+1]) {
					compiledPath[fnDp-1] += lftPrn;
					compiledPathStart[fnDp-1]++;
				}
				if (prn === "(" && subPath && !newOb) {
					compiledPath[fnDp] = compiledPath[fnDp-1].slice(prnStart) + compiledPath[fnDp];
					compiledPath[fnDp-1] = compiledPath[fnDp-1].slice(0, prnStart);
				}
			}
			compiledPath[fnDp] += lftPrnFCall ? ret.slice(1) : ret;
		}

		if (!aposed && !quoted && prn) {
			prnDp++;
			if (path && prn === "(") {
				fnCall[prnDp] = true;
			}
		}

		if (!aposed && !quoted && prn2) {
			if (bindings) {
				compiledPath[fnDp] += prn;
			}
			ret += prn;
		}
		return ret;
	}

	var named, bindto, boundName, result,
		quoted, // boolean for string content in double quotes
		aposed, // or in single quotes
		bindings = pathBindings && pathBindings[0], // bindings array for the first arg
		bndCtx = {bd: bindings},
		bndStack = {0: bndCtx},
		paramIndex = 0, // list,
		// The following are used for tracking path parsing including nested paths, such as "a.b(c^d + (e))^f", and chained computed paths such as
		// "a.b().c^d().e.f().g" - which has four chained paths, "a.b()", "^c.d()", ".e.f()" and ".g"
		prnDp = 0,     // For tracking paren depth (not function call parens)
		fnDp = 0,      // For tracking depth of function call parens
		prnInd = {},   // We are in a function call
		prnStart = 0,  // tracks the start of the current path such as c^d() in the above example
		prnStack = {}, // tracks parens which are not function calls, and so are associated with new bndStack contexts
		fnCall = {},   // We are in a function call
		pathStart = {},// tracks the start of the current path such as c^d() in the above example
		compiledPathStart = {0: 0},
		compiledPath = {0:""},
		prevIndex = 0;

	if (params[0] === "@") {
		params = params.replace(rBracketQuote, ".");
	}
	result = (params + (tmpl ? " " : "")).replace($sub.rPrm, parseTokens);

	if (bindings) {
		result = compiledPath[0];
	}

	return !prnDp && result || syntaxError(params); // Syntax error if unbalanced parens in params expression
}

function buildCode(ast, tmpl, isLinkExpr) {
	// Build the template function code from the AST nodes, and set as property on the passed-in template object
	// Used for compiling templates, and also by JsViews to build functions for data link expressions
	var i, node, tagName, converter, tagCtx, hasTag, hasEncoder, getsVal, hasCnvt, useCnvt, tmplBindings, pathBindings, params, boundOnErrStart,
		boundOnErrEnd, tagRender, nestedTmpls, tmplName, nestedTmpl, tagAndElses, content, markup, nextIsElse, oldCode, isElse, isGetVal, tagCtxFn,
		onError, tagStart, trigger, lateRender, retStrOpen, retStrClose,
		tmplBindingKey = 0,
		useViews = $subSettingsAdvanced.useViews || tmpl.useViews || tmpl.tags || tmpl.templates || tmpl.helpers || tmpl.converters,
		code = "",
		tmplOptions = {},
		l = ast.length;

	if (typeof tmpl === STRING) {
		tmplName = isLinkExpr ? 'data-link="' + tmpl.replace(rNewLine, " ").slice(1, -1) + '"' : tmpl;
		tmpl = 0;
	} else {
		tmplName = tmpl.tmplName || "unnamed";
		if (tmpl.allowCode) {
			tmplOptions.allowCode = true;
		}
		if (tmpl.debug) {
			tmplOptions.debug = true;
		}
		tmplBindings = tmpl.bnds;
		nestedTmpls = tmpl.tmpls;
	}
	for (i = 0; i < l; i++) {
		// AST nodes: [0: tagName, 1: converter, 2: content, 3: params, 4: code, 5: onError, 6: trigger, 7:pathBindings, 8: contentMarkup]
		node = ast[i];

		// Add newline for each callout to t() c() etc. and each markup string
		if (typeof node === STRING) {
			// a markup string to be inserted
			code += '+"' + node + '"';
		} else {
			// a compiled tag expression to be inserted
			tagName = node[0];
			if (tagName === "*") {
				// Code tag: {{* }}
				code += ";\n" + node[1] + "\nret=ret";
			} else {
				converter = node[1];
				content = !isLinkExpr && node[2];
				tagCtx = paramStructure(node[3], params = node[4]);
				trigger = node[6];
				lateRender = node[7];
				if (node[8]) { // latePath @a.b.c or @~a.b.c
					retStrOpen = "\nvar ob,ltOb={},ctxs=";
					retStrClose = ";\nctxs.lt=ltOb.lt;\nreturn ctxs;";
				} else {
					retStrOpen = "\nreturn ";
					retStrClose = "";
				}
				markup = node[10] && node[10].replace(rUnescapeQuotes, "$1");
				if (isElse = tagName === "else") {
					if (pathBindings) {
						pathBindings.push(node[9]);
					}
				} else {
					onError = node[5] || $subSettings.debugMode !== false && "undefined"; // If debugMode not false, set default onError handler on tag to "undefined" (see onRenderError)
					if (tmplBindings && (pathBindings = node[9])) { // Array of paths, or false if not data-bound
						pathBindings = [pathBindings];
						tmplBindingKey = tmplBindings.push(1); // Add placeholder in tmplBindings for compiled function
					}
				}
				useViews = useViews || params[1] || params[2] || pathBindings || /view.(?!index)/.test(params[0]);
				// useViews is for perf optimization. For render() we only use views if necessary - for the more advanced scenarios.
				// We use views if there are props, contextual properties or args with #... (other than #index) - but you can force
				// using the full view infrastructure, (and pay a perf price) by opting in: Set useViews: true on the template, manually...
				if (isGetVal = tagName === ":") {
					if (converter) {
						tagName = converter === HTML ? ">" : converter + tagName;
					}
				} else {
					if (content) { // TODO optimize - if content.length === 0 or if there is a tmpl="..." specified - set content to null / don't run this compilation code - since content won't get used!!
						// Create template object for nested template
						nestedTmpl = tmplObject(markup, tmplOptions);
						nestedTmpl.tmplName = tmplName + "/" + tagName;
						// Compile to AST and then to compiled function
						nestedTmpl.useViews = nestedTmpl.useViews || useViews;
						buildCode(content, nestedTmpl);
						useViews = nestedTmpl.useViews;
						nestedTmpls.push(nestedTmpl);
					}

					if (!isElse) {
						// This is not an else tag.
						tagAndElses = tagName;
						useViews = useViews || tagName && (!$tags[tagName] || !$tags[tagName].flow);
						// Switch to a new code string for this bound tag (and its elses, if it has any) - for returning the tagCtxs array
						oldCode = code;
						code = "";
					}
					nextIsElse = ast[i + 1];
					nextIsElse = nextIsElse && nextIsElse[0] === "else";
				}
				tagStart = onError ? ";\ntry{\nret+=" : "\n+";
				boundOnErrStart = "";
				boundOnErrEnd = "";

				if (isGetVal && (pathBindings || trigger || converter && converter !== HTML || lateRender)) {
					// For convertVal we need a compiled function to return the new tagCtx(s)
					tagCtxFn = new Function("data,view,j", "// " + tmplName + " " + (++tmplBindingKey) + " " + tagName
						+ retStrOpen + "{" + tagCtx + "};" + retStrClose);
					tagCtxFn._er = onError;
					tagCtxFn._tag = tagName;
					tagCtxFn._bd = !!pathBindings; // data-linked tag {^{.../}}
					tagCtxFn._lr = lateRender;

					if (isLinkExpr) {
						return tagCtxFn;
					}

					setPaths(tagCtxFn, pathBindings);
					tagRender = 'c("' + converter + '",view,';
					useCnvt = true;
					boundOnErrStart = tagRender + tmplBindingKey + ",";
					boundOnErrEnd = ")";
				}
				code += (isGetVal
					? (isLinkExpr ? (onError ? "try{\n" : "") + "return " : tagStart) + (useCnvt // Call _cnvt if there is a converter: {{cnvt: ... }} or {^{cnvt: ... }}
						? (useCnvt = undefined, useViews = hasCnvt = true, tagRender + (tagCtxFn
							? ((tmplBindings[tmplBindingKey - 1] = tagCtxFn), tmplBindingKey) // Store the compiled tagCtxFn in tmpl.bnds, and pass the key to convertVal()
							: "{" + tagCtx + "}") + ")")
						: tagName === ">"
							? (hasEncoder = true, "h(" + params[0] + ")")
							: (getsVal = true, "((v=" + params[0] + ')!=null?v:' + (isLinkExpr ? 'null)' : '"")'))
							// Non strict equality so data-link="title{:expr}" with expr=null/undefined removes title attribute
					)
					: (hasTag = true, "\n{view:view,content:false,tmpl:" // Add this tagCtx to the compiled code for the tagCtxs to be passed to renderTag()
						+ (content ? nestedTmpls.length : "false") + "," // For block tags, pass in the key (nestedTmpls.length) to the nested content template
						+ tagCtx + "},"));

				if (tagAndElses && !nextIsElse) {
					// This is a data-link expression or an inline tag without any elses, or the last {{else}} of an inline tag
					// We complete the code for returning the tagCtxs array
					code = "[" + code.slice(0, -1) + "]";
					tagRender = 't("' + tagAndElses + '",view,this,';
					if (isLinkExpr || pathBindings) {
						// This is a bound tag (data-link expression or inline bound tag {^{tag ...}}) so we store a compiled tagCtxs function in tmp.bnds
						code = new Function("data,view,j", " // " + tmplName + " " + tmplBindingKey + " " + tagAndElses + retStrOpen + code
							+ retStrClose);
						code._er = onError;
						code._tag = tagAndElses;
						if (pathBindings) {
							setPaths(tmplBindings[tmplBindingKey - 1] = code, pathBindings);
						}
						code._lr = lateRender;
						if (isLinkExpr) {
							return code; // For a data-link expression we return the compiled tagCtxs function
						}
						boundOnErrStart = tagRender + tmplBindingKey + ",undefined,";
						boundOnErrEnd = ")";
					}

					// This is the last {{else}} for an inline tag.
					// For a bound tag, pass the tagCtxs fn lookup key to renderTag.
					// For an unbound tag, include the code directly for evaluating tagCtxs array
					code = oldCode + tagStart + tagRender + (pathBindings && tmplBindingKey || code) + ")";
					pathBindings = 0;
					tagAndElses = 0;
				}
				if (onError && !nextIsElse) {
					useViews = true;
					code += ';\n}catch(e){ret' + (isLinkExpr ? "urn " : "+=") + boundOnErrStart + 'j._err(e,view,' + onError + ')' + boundOnErrEnd + ';}' + (isLinkExpr ? "" : '\nret=ret');
				}
			}
		}
	}
	// Include only the var references that are needed in the code
	code = "// " + tmplName
		+ (tmplOptions.debug ? "\ndebugger;" : "")
		+ "\nvar v"
		+ (hasTag ? ",t=j._tag" : "")                // has tag
		+ (hasCnvt ? ",c=j._cnvt" : "")              // converter
		+ (hasEncoder ? ",h=j._html" : "")           // html converter
		+ (isLinkExpr
				? (node[8] // late @... path?
						? ", ob"
						: ""
					) + ";\n"
				: ',ret=""')
		+ code
		+ (isLinkExpr ? "\n" : ";\nreturn ret;");

	try {
		code = new Function("data,view,j", code);
	} catch (e) {
		syntaxError("Compiled template code:\n\n" + code + '\n: "' + (e.message||e) + '"');
	}
	if (tmpl) {
		tmpl.fn = code;
		tmpl.useViews = !!useViews;
	}
	return code;
}

//==========
// Utilities
//==========

// Merge objects, in particular contexts which inherit from parent contexts
function extendCtx(context, parentContext) {
	// Return copy of parentContext, unless context is defined and is different, in which case return a new merged context
	// If neither context nor parentContext are defined, return undefined
	return context && context !== parentContext
		? (parentContext
			? $extend($extend({}, parentContext), context)
			: context)
		: parentContext && $extend({}, parentContext);
}

function getTargetProps(source, tagCtx) {
	// this pointer is theMap - which has tagCtx.props too
	// arguments: tagCtx.args.
	var key, prop,
		map = tagCtx.map,
		propsArr = map && map.propsArr;

	if (!propsArr) { // map.propsArr is the full array of {key:..., prop:...} objects
		propsArr = [];
		if (typeof source === OBJECT || $isFunction(source)) {
			for (key in source) {
				prop = source[key];
				if (key !== $expando && source.hasOwnProperty(key) && (!tagCtx.props.noFunctions || !$isFunction(prop))) {
					propsArr.push({key: key, prop: prop});
				}
			}
		}
		if (map) {
			map.propsArr = map.options && propsArr; // If bound {^{props}} and not isRenderCall, store propsArr on map (map.options is defined only for bound, && !isRenderCall)
		}
	}
	return getTargetSorted(propsArr, tagCtx); // Obtains map.tgt, by filtering, sorting and splicing the full propsArr
}

function getTargetSorted(value, tagCtx) {
	// getTgt
	var mapped, start, end,
		tag = tagCtx.tag,
		props = tagCtx.props,
		propParams = tagCtx.params.props,
		filter = props.filter,
		sort = props.sort,
		directSort = sort === true,
		step = parseInt(props.step),
		reverse = props.reverse ? -1 : 1;

	if (!$isArray(value)) {
		return value;
	}
	if (directSort || sort && typeof sort === STRING) {
		// Temporary mapped array holds objects with index and sort-value
		mapped = value.map(function(item, i) {
			item = directSort ? item : getPathObject(item, sort);
			return {i: i, v: typeof item === STRING ? item.toLowerCase() : item};
		});
		// Sort mapped array
		mapped.sort(function(a, b) {
			return a.v > b.v ? reverse : a.v < b.v ? -reverse : 0;
		});
		// Map to new array with resulting order
		value = mapped.map(function(item){
			return value[item.i];
		});
	} else if ((sort || reverse < 0) && !tag.dataMap) {
		value = value.slice(); // Clone array first if not already a new array
	}
	if ($isFunction(sort)) {
		value = value.sort(function() { // Wrap the sort function to provide tagCtx as 'this' pointer
			return sort.apply(tagCtx, arguments);
		});
	}
	if (reverse < 0 && (!sort || $isFunction(sort))) { // Reverse result if not already reversed in sort
		value = value.reverse();
	}

	if (value.filter && filter) { // IE8 does not support filter
		value = value.filter(filter, tagCtx);
		if (tagCtx.tag.onFilter) {
			tagCtx.tag.onFilter(tagCtx);
		}
	}

	if (propParams.sorted) {
		mapped = (sort || reverse < 0) ? value : value.slice();
		if (tag.sorted) {
			$.observable(tag.sorted).refresh(mapped); // Note that this might cause the start and end props to be modified - e.g. by pager tag control
		} else {
			tagCtx.map.sorted = mapped;
		}
	}

	start = props.start; // Get current value - after possible changes triggered by tag.sorted refresh() above
	end = props.end;
	if (propParams.start && start === undefined || propParams.end && end === undefined) {
		start = end = 0;
	}
	if (!isNaN(start) || !isNaN(end)) { // start or end specified, but not the auto-create Number array scenario of {{for start=xxx end=yyy}}
		start = +start || 0;
		end = end === undefined || end > value.length ? value.length : +end;
		value = value.slice(start, end);
	}
	if (step > 1) {
		start = 0;
		end = value.length;
		mapped = [];
		for (; start<end; start+=step) {
			mapped.push(value[start]);
		}
		value = mapped;
	}
	if (propParams.paged && tag.paged) {
		$observable(tag.paged).refresh(value);
	}

	return value;
}

/** Render the template as a string, using the specified data and helpers/context
* $("#tmpl").render()
*
* @param {any}        data
* @param {hash}       [helpersOrContext]
* @param {boolean}    [noIteration]
* @returns {string}   rendered template
*/
function $fnRender(data, context, noIteration) {
	var tmplElem = this.jquery && (this[0] || error('Unknown template')), // Targeted element not found for jQuery template selector such as "#myTmpl"
		tmpl = tmplElem.getAttribute(tmplAttr);

	return renderContent.call(tmpl && $.data(tmplElem)[jsvTmpl] || $templates(tmplElem),
		data, context, noIteration);
}

//========================== Register converters ==========================

function getCharEntity(ch) {
	// Get character entity for HTML, Attribute and optional data encoding
	return charEntities[ch] || (charEntities[ch] = "&#" + ch.charCodeAt(0) + ";");
}

function getCharFromEntity(match, token) {
	// Get character from HTML entity, for optional data unencoding
	return charsFromEntities[token] || "";
}

function htmlEncode(text) {
	// HTML encode: Replace < > & ' " ` etc. by corresponding entities.
	return text != undefined ? rIsHtml.test(text) && ("" + text).replace(rHtmlEncode, getCharEntity) || text : "";
}

function dataEncode(text) {
	// Encode just < > and & - intended for 'safe data' along with {{:}} rather than {{>}}
  return typeof text === STRING ? text.replace(rDataEncode, getCharEntity) : text;
}

function dataUnencode(text) {
  // Unencode just < > and & - intended for 'safe data' along with {{:}} rather than {{>}}
  return  typeof text === STRING ? text.replace(rDataUnencode, getCharFromEntity) : text;
}

//========================== Initialize ==========================

$sub = $views.sub;
$viewsSettings = $views.settings;

if (!(jsr || $ && $.render)) {
	// JsRender/JsViews not already loaded (or loaded without jQuery, and we are now moving from jsrender namespace to jQuery namepace)
	for (jsvStoreName in jsvStores) {
		registerStore(jsvStoreName, jsvStores[jsvStoreName]);
	}

	$converters = $views.converters;
	$helpers = $views.helpers;
	$tags = $views.tags;

	$sub._tg.prototype = {
		baseApply: baseApply,
		cvtArgs: convertArgs,
		bndArgs: convertBoundArgs,
		ctxPrm: contextParameter
	};

	topView = $sub.topView = new View();

	//BROWSER-SPECIFIC CODE
	if ($) {
		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery (= $) is loaded

		$.fn.render = $fnRender;
		$expando = $.expando;
		if ($.observable) {
			if (versionNumber !== (versionNumber = $.views.jsviews)) {
				// Different version of jsRender was loaded
				throw "jquery.observable.js requires jsrender.js " + versionNumber;
			}
			$extend($sub, $.views.sub); // jquery.observable.js was loaded before jsrender.js
			$views.map = $.views.map;
		}

	} else {
		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery is not loaded.

		$ =  { jsrender: versionNumber };

		if (setGlobals) {
			global.jsrender = $; // We are loading jsrender.js from a script element, not AMD or CommonJS, so set global
		}

		// Error warning if jsrender.js is used as template engine on Node.js (e.g. Express or Hapi...)
		// Use jsrender-node.js instead...
		$.renderFile = $.__express = $.compile = function() { throw "Node.js: use npm jsrender, or jsrender-node.js"; };

		$sub._jq = function(jq) { // private method to move from JsRender APIs from jsrender namespace to jQuery namespace
			if (jq !== $) {
				$extend(jq, $); // map over from jsrender namespace to jQuery namespace
				$ = jq;
				$.fn.render = $fnRender;
				delete $.jsrender;
				$expando = $.expando;
			}
		};
	}
	//END OF BROWSER-SPECIFIC CODE

	$subSettings = $sub.settings;
	$subSettings.allowCode = false;
	$.render = $render;
	$.views = $views;
	$.templates = $templates = $views.templates;

	for (setting in $subSettings) {
		addSetting(setting);
	}

	/**
	* $.views.settings.debugMode(true)
	* @param {boolean} debugMode
	* @returns {Settings}
	*
	* debugMode = $.views.settings.debugMode()
	* @returns {boolean}
	*/
	($viewsSettings.debugMode = function(debugMode) {
		return debugMode === undefined
			? $subSettings.debugMode
			: (
				$subSettings._clFns && $subSettings._clFns(), // Clear linkExprStore (cached compiled expressions), since debugMode setting affects compilation for expressions
				$subSettings.debugMode = debugMode,
				$subSettings.onError = typeof debugMode === STRING
					? function() { return debugMode; }
					: $isFunction(debugMode)
						? debugMode
						: undefined,
				$viewsSettings);
	})(false); // jshint ignore:line

	$subSettingsAdvanced = $subSettings.advanced = {
		cache: true, // By default use cached values of computed values (Otherwise, set advanced cache setting to false)
		useViews: false,
		_jsv: false // For global access to JsViews store
	};

	//========================== Register tags ==========================

	$tags({
		"if": {
			render: function(val) {
				// This function is called once for {{if}} and once for each {{else}}.
				// We will use the tag.rendering object for carrying rendering state across the calls.
				// If not done (a previous block has not been rendered), look at expression for this block and render the block if expression is truthy
				// Otherwise return ""
				var self = this,
					tagCtx = self.tagCtx,
					ret = (self.rendering.done || !val && (tagCtx.args.length || !tagCtx.index))
						? ""
						: (self.rendering.done = true,
							self.selected = tagCtx.index,
							undefined); // Test is satisfied, so render content on current context
				return ret;
			},
			contentCtx: true, // Inherit parent view data context
			flow: true
		},
		"for": {
			sortDataMap: dataMap(getTargetSorted),
			init: function(val, cloned) {
				this.setDataMap(this.tagCtxs);
			},
			render: function(val) {
				// This function is called once for {{for}} and once for each {{else}}.
				// We will use the tag.rendering object for carrying rendering state across the calls.
				var value, filter, srtField, isArray, i, sorted, end, step,
					self = this,
					tagCtx = self.tagCtx,
					range = tagCtx.argDefault === false,
					props = tagCtx.props,
					iterate = range || tagCtx.args.length, // Not final else and not auto-create range
					result = "",
					done = 0;

				if (!self.rendering.done) {
					value = iterate ? val : tagCtx.view.data; // For the final else, defaults to current data without iteration.

					if (range) {
						range = props.reverse ? "unshift" : "push";
						end = +props.end;
						step = +props.step || 1;
						value = []; // auto-create integer array scenario of {{for start=xxx end=yyy}}
						for (i = +props.start || 0; (end - i) * step > 0; i += step) {
							value[range](i);
						}
					}
					if (value !== undefined) {
						isArray = $isArray(value);
						result += tagCtx.render(value, !iterate || props.noIteration);
						// Iterates if data is an array, except on final else - or if noIteration property
						// set to true. (Use {{include}} to compose templates without array iteration)
						done += isArray ? value.length : 1;
					}
					if (self.rendering.done = done) {
						self.selected = tagCtx.index;
					}
					// If nothing was rendered we will look at the next {{else}}. Otherwise, we are done.
				}
				return result;
			},
			setDataMap: function(tagCtxs) {
				var tagCtx, props, paramsProps,
					self = this,
					l = tagCtxs.length;
				while (l--) {
					tagCtx = tagCtxs[l];
					props = tagCtx.props;
					paramsProps = tagCtx.params.props;
					tagCtx.argDefault = props.end === undefined || tagCtx.args.length > 0; // Default to #data except for auto-create range scenario {{for start=xxx end=yyy step=zzz}}
					props.dataMap = (tagCtx.argDefault !== false && $isArray(tagCtx.args[0]) &&
						(paramsProps.sort || paramsProps.start || paramsProps.end || paramsProps.step || paramsProps.filter || paramsProps.reverse
						|| props.sort || props.start || props.end || props.step || props.filter || props.reverse))
						&& self.sortDataMap;
				}
			},
			flow: true
		},
		props: {
			baseTag: "for",
			dataMap: dataMap(getTargetProps),
			init: noop, // Don't execute the base init() of the "for" tag
			flow: true
		},
		include: {
			flow: true
		},
		"*": {
			// {{* code... }} - Ignored if template.allowCode and $.views.settings.allowCode are false. Otherwise include code in compiled template
			render: retVal,
			flow: true
		},
		":*": {
			// {{:* returnedExpression }} - Ignored if template.allowCode and $.views.settings.allowCode are false. Otherwise include code in compiled template
			render: retVal,
			flow: true
		},
		dbg: $helpers.dbg = $converters.dbg = dbgBreak // Register {{dbg/}}, {{dbg:...}} and ~dbg() to throw and catch, as breakpoints for debugging.
	});

	$converters({
		html: htmlEncode,
		attr: htmlEncode, // Includes > encoding since rConvertMarkers in JsViews does not skip > characters in attribute strings
		encode: dataEncode,
		unencode: dataUnencode, // Includes > encoding since rConvertMarkers in JsViews does not skip > characters in attribute strings
		url: function(text) {
			// URL encoding helper.
			return text != undefined ? encodeURI("" + text) : text === null ? text : ""; // null returns null, e.g. to remove attribute. undefined returns ""
		}
	});
}
//========================== Define default delimiters ==========================
$subSettings = $sub.settings;
$viewsSettings.delimiters("{{", "}}", "^");

if (jsrToJq) { // Moving from jsrender namespace to jQuery namepace - copy over the stored items (templates, converters, helpers...)
	jsr.views.sub._jq($);
}
return $ || jsr;
}, window));

},{}],2:[function(require,module,exports){
(function (global){(function (){
/*global QUnit, test, equal, ok*/
(function(undefined) {
"use strict";

browserify.done.twelve = true;

QUnit.module("Browserify - client code");

var isIE8 = window.attachEvent && !window.addEventListener;

if (!isIE8) {

QUnit.test("No jQuery global: require('jsrender')() nested template", function(assert) {
	// ............................... Hide QUnit global jQuery and any previous global jsrender.................................
	var jQuery = global.jQuery, jsr = global.jsrender;
	global.jQuery = global.jsrender = undefined;

	// =============================== Arrange ===============================
	var data = {name: "Jo"};

	// ................................ Act ..................................
	var jsrender = require('jsrender')(); // Not passing in jQuery, so returns the jsrender namespace

	// Use require to get server template, thanks to Browserify bundle that used jsrender/tmplify transform
	var tmpl = require('../templates/outer.html')(jsrender); // Provide jsrender

	var result = tmpl(data);

	result += " " + (jsrender !== jQuery);

	// ............................... Assert .................................
	assert.equal(result, "Name: Jo (outer.html) Name: Jo (inner.html) true", "result: No jQuery global: require('jsrender')(), nested templates");

	// ............................... Reset .................................
	global.jQuery = jQuery; // Replace QUnit global jQuery
	global.jsrender = jsr; // Replace any previous global jsrender
});
}
})();

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../templates/outer.html":4,"jsrender":1}],3:[function(require,module,exports){
(function (global){(function (){
var tmplRefs = [],
  mkup = 'Name: {{:name}} (inner.html)',
  $ = global.jsrender || global.jQuery;

module.exports = $ ? $.templates("./test/templates/inner.html", mkup) :
  function($) {
    if (!$ || !$.views) {throw "Requires jsrender/jQuery";}
    while (tmplRefs.length) {
      tmplRefs.pop()($); // compile nested template
    }

    return $.templates("./test/templates/inner.html", mkup)
  };
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
(function (global){(function (){
var tmplRefs = [],
  mkup = 'Name: {{:name}} (outer.html) {{include tmpl=\"./test/templates/inner.html\"/}}',
  $ = global.jsrender || global.jQuery;

tmplRefs.push(require("./inner.html"));
module.exports = $ ? $.templates("./test/templates/outer.html", mkup) :
  function($) {
    if (!$ || !$.views) {throw "Requires jsrender/jQuery";}
    while (tmplRefs.length) {
      tmplRefs.pop()($); // compile nested template
    }

    return $.templates("./test/templates/outer.html", mkup)
  };
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./inner.html":3}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvanNyZW5kZXIvanNyZW5kZXIuanMiLCJ0ZXN0L2Jyb3dzZXJpZnkvMTItbmVzdGVkLXVuaXQtdGVzdHMuanMiLCJ0ZXN0L3RlbXBsYXRlcy9pbm5lci5odG1sIiwidGVzdC90ZW1wbGF0ZXMvb3V0ZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNoOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyohIEpzUmVuZGVyIHYxLjIuMDogaHR0cDovL2pzdmlld3MuY29tLyNqc3JlbmRlciAqL1xuLyohICoqVkVSU0lPTiBGT1IgV0VCKiogKEZvciBOT0RFLkpTIHNlZSBodHRwOi8vanN2aWV3cy5jb20vZG93bmxvYWQvanNyZW5kZXItbm9kZS5qcykgKi9cbi8qXG4gKiBCZXN0LW9mLWJyZWVkIHRlbXBsYXRpbmcgaW4gYnJvd3NlciBvciBvbiBOb2RlLmpzLlxuICogRG9lcyBub3QgcmVxdWlyZSBqUXVlcnksIG9yIEhUTUwgRE9NXG4gKiBJbnRlZ3JhdGVzIHdpdGggSnNWaWV3cyAoaHR0cDovL2pzdmlld3MuY29tLyNqc3ZpZXdzKVxuICpcbiAqIENvcHlyaWdodCAyMDI2LCBCb3JpcyBNb29yZVxyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuLy9qc2hpbnQgLVcwMTgsIC1XMDQxLCAtVzEyMFxuXG4oZnVuY3Rpb24oZmFjdG9yeSwgZ2xvYmFsKSB7XG5cdC8vIGdsb2JhbCB2YXIgaXMgdGhlIHRoaXMgb2JqZWN0LCB3aGljaCBpcyB3aW5kb3cgd2hlbiBydW5uaW5nIGluIHRoZSB1c3VhbCBicm93c2VyIGVudmlyb25tZW50XG5cdHZhciAkID0gZ2xvYmFsLmpRdWVyeTtcblxuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHsgLy8gQ29tbW9uSlMgZS5nLiBCcm93c2VyaWZ5XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSAkXG5cdFx0XHQ/IGZhY3RvcnkoZ2xvYmFsLCAkKVxuXHRcdFx0OiBmdW5jdGlvbigkKSB7IC8vIElmIG5vIGdsb2JhbCBqUXVlcnksIHRha2Ugb3B0aW9uYWwgalF1ZXJ5IHBhc3NlZCBhcyBwYXJhbWV0ZXI6IHJlcXVpcmUoJ2pzcmVuZGVyJykoalF1ZXJ5KVxuXHRcdFx0XHRpZiAoJCAmJiAhJC5mbikge1xuXHRcdFx0XHRcdHRocm93IFwiUHJvdmlkZSBqUXVlcnkgb3IgbnVsbFwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWN0b3J5KGdsb2JhbCwgJCk7XG5cdFx0XHR9O1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7IC8vIEFNRCBzY3JpcHQgbG9hZGVyLCBlLmcuIFJlcXVpcmVKU1xuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBmYWN0b3J5KGdsb2JhbCk7XG5cdFx0fSk7XG5cdH0gZWxzZSB7IC8vIEJyb3dzZXIgdXNpbmcgcGxhaW4gPHNjcmlwdD4gdGFnXG5cdFx0ZmFjdG9yeShnbG9iYWwsIGZhbHNlKTtcblx0fVxufSAoXG5cbi8vIGZhY3RvcnkgKGZvciBqc3JlbmRlci5qcylcbmZ1bmN0aW9uKGdsb2JhbCwgJCkge1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT0gVG9wLWxldmVsIHZhcnMgPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gZ2xvYmFsIHZhciBpcyB0aGUgdGhpcyBvYmplY3QsIHdoaWNoIGlzIHdpbmRvdyB3aGVuIHJ1bm5pbmcgaW4gdGhlIHVzdWFsIGJyb3dzZXIgZW52aXJvbm1lbnRcbnZhciBzZXRHbG9iYWxzID0gJCA9PT0gZmFsc2U7IC8vIE9ubHkgc2V0IGdsb2JhbHMgaWYgc2NyaXB0IGJsb2NrIGluIGJyb3dzZXIgKG5vdCBBTUQgYW5kIG5vdCBDb21tb25KUylcblxuJCA9ICQgJiYgJC5mbiA/ICQgOiBnbG9iYWwualF1ZXJ5OyAvLyAkIGlzIGpRdWVyeSBwYXNzZWQgaW4gYnkgQ29tbW9uSlMgbG9hZGVyIChCcm93c2VyaWZ5KSwgb3IgZ2xvYmFsIGpRdWVyeS5cblxudmFyIHZlcnNpb25OdW1iZXIgPSBcInYxLjIuMFwiLFxuXHRqc3ZTdG9yZU5hbWUsIHJUYWcsIHJUbXBsU3RyaW5nLCB0b3BWaWV3LCAkdmlld3MsICRleHBhbmRvLFxuXHRfb2NwID0gXCJfb2NwXCIsICAgICAgLy8gT2JzZXJ2YWJsZSBjb250ZXh0dWFsIHBhcmFtZXRlclxuXHQkaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iKSB7cmV0dXJuIHR5cGVvZiBvYiA9PT0gXCJmdW5jdGlvblwiO30sXG5cdCRpc0FycmF5ID0gQXJyYXkuaXNBcnJheSxcblx0JHRlbXBsYXRlcywgJGNvbnZlcnRlcnMsICRoZWxwZXJzLCAkdGFncywgJHN1YiwgJHN1YlNldHRpbmdzLCAkc3ViU2V0dGluZ3NBZHZhbmNlZCwgJHZpZXdzU2V0dGluZ3MsXG5cdGRlbGltT3BlbkNoYXIwLCBkZWxpbU9wZW5DaGFyMSwgZGVsaW1DbG9zZUNoYXIwLCBkZWxpbUNsb3NlQ2hhcjEsIGxpbmtDaGFyLCBzZXR0aW5nLCBiYXNlT25FcnJvcixcblx0aXNSZW5kZXJDYWxsLFxuXHRyTmV3TGluZSA9IC9bIFxcdF0qKFxcclxcbnxcXG58XFxyKS9nLFxuXHRyVW5lc2NhcGVRdW90ZXMgPSAvXFxcXChbJ1wiXFxcXF0pL2csIC8vIFVuZXNjYXBlIHF1b3RlcyBhbmQgdHJpbVxuXHRyRXNjYXBlUXVvdGVzID0gL1snXCJcXFxcXS9nLCAvLyBFc2NhcGUgcXVvdGVzIGFuZCBcXCBjaGFyYWN0ZXJcblx0ckJ1aWxkSGFzaCA9IC8oPzpcXHgwOHxeKShvbmVycm9yOik/KD86KH4/KSgoW1xcdyQuXSspOik/KFteXFx4MDhdKykpXFx4MDgoLCk/KFteXFx4MDhdKykvZ2ksXG5cdHJUZXN0RWxzZUlmID0gL15pZlxccy8sXG5cdHJGaXJzdEVsZW0gPSAvPChcXHcrKVs+XFxzXS8sXG5cdHJBdHRyRW5jb2RlID0gL1tcXHgwMGA+PFwiJyY9XS9nLCAvLyBJbmNsdWRlcyA+IGVuY29kaW5nIHNpbmNlIHJDb252ZXJ0TWFya2VycyBpbiBKc1ZpZXdzIGRvZXMgbm90IHNraXAgPiBjaGFyYWN0ZXJzIGluIGF0dHJpYnV0ZSBzdHJpbmdzXG5cdHJJc0h0bWwgPSAvW1xceDAwYD48XFxcIicmPV0vLFxuXHRySGFzSGFuZGxlcnMgPSAvXm9uW0EtWl18XmNvbnZlcnQoQmFjayk/JC8sXG5cdHJXcmFwcGVkSW5WaWV3TWFya2VyID0gL15cXCNcXGQrX2BbXFxzXFxTXSpcXC9cXGQrX2AkLyxcblx0ckh0bWxFbmNvZGUgPSByQXR0ckVuY29kZSxcblx0ckRhdGFFbmNvZGUgPSAvWyY8Pl0vZyxcblx0ckRhdGFVbmVuY29kZSA9IC8mKGFtcHxndHxsdCk7L2csXG5cdHJCcmFja2V0UXVvdGUgPSAvXFxbWydcIl0/fFsnXCJdP1xcXS9nLFxuXHR2aWV3SWQgPSAwLFxuXHRjaGFyRW50aXRpZXMgPSB7XG5cdFx0XCImXCI6IFwiJmFtcDtcIixcblx0XHRcIjxcIjogXCImbHQ7XCIsXG5cdFx0XCI+XCI6IFwiJmd0O1wiLFxuXHRcdFwiXFx4MDBcIjogXCImIzA7XCIsXG5cdFx0XCInXCI6IFwiJiMzOTtcIixcblx0XHQnXCInOiBcIiYjMzQ7XCIsXG5cdFx0XCJgXCI6IFwiJiM5NjtcIixcblx0XHRcIj1cIjogXCImIzYxO1wiXG5cdH0sXG5cdGNoYXJzRnJvbUVudGl0aWVzID0ge1xuXHRcdGFtcDogXCImXCIsXG5cdFx0Z3Q6IFwiPlwiLFxuXHRcdGx0OiBcIjxcIlxuXHR9LFxuXHRIVE1MID0gXCJodG1sXCIsXG5cdFNUUklORyA9IFwic3RyaW5nXCIsXG5cdE9CSkVDVCA9IFwib2JqZWN0XCIsXG5cdHRtcGxBdHRyID0gXCJkYXRhLWpzdi10bXBsXCIsXG5cdGpzdlRtcGwgPSBcImpzdlRtcGxcIixcblx0aW5kZXhTdHIgPSBcIkZvciAjaW5kZXggaW4gbmVzdGVkIGJsb2NrIHVzZSAjZ2V0SW5kZXgoKS5cIixcblx0Y3BGblN0b3JlID0ge30sICAgICAvLyBDb21waWxlZCBmdXJuY3Rpb25zIGZvciBjb21wdXRlZCB2YWx1ZXMgaW4gdGVtcGxhdGUgZXhwcmVzc2lvbnMgKHByb3BlcnRpZXMsIG1ldGhvZHMsIGhlbHBlcnMpXG5cdCRyZW5kZXIgPSB7fSxcblxuXHRqc3IgPSBnbG9iYWwuanNyZW5kZXIsXG5cdGpzclRvSnEgPSBqc3IgJiYgJCAmJiAhJC5yZW5kZXIsIC8vIEpzUmVuZGVyIGFscmVhZHkgbG9hZGVkLCB3aXRob3V0IGpRdWVyeS4gYnV0IHdlIHdpbGwgcmUtbG9hZCBpdCBub3cgdG8gYXR0YWNoIHRvIGpRdWVyeVxuXG5cdGpzdlN0b3JlcyA9IHtcblx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0Y29tcGlsZTogY29tcGlsZVRtcGxcblx0XHR9LFxuXHRcdHRhZzoge1xuXHRcdFx0Y29tcGlsZTogY29tcGlsZVRhZ1xuXHRcdH0sXG5cdFx0dmlld01vZGVsOiB7XG5cdFx0XHRjb21waWxlOiBjb21waWxlVmlld01vZGVsXG5cdFx0fSxcblx0XHRoZWxwZXI6IHt9LFxuXHRcdGNvbnZlcnRlcjoge31cblx0fTtcblxuXHQvLyB2aWV3cyBvYmplY3QgKCQudmlld3MgaWYgalF1ZXJ5IGlzIGxvYWRlZCwganNyZW5kZXIudmlld3MgaWYgbm8galF1ZXJ5LCBlLmcuIGluIE5vZGUuanMpXG5cdCR2aWV3cyA9IHtcblx0XHRqc3ZpZXdzOiB2ZXJzaW9uTnVtYmVyLFxuXHRcdHN1Yjoge1xuXHRcdFx0Ly8gc3Vic2NyaXB0aW9uLCBlLmcuIEpzVmlld3MgaW50ZWdyYXRpb25cblx0XHRcdHJQYXRoOiAvXighKj8pKD86bnVsbHx0cnVlfGZhbHNlfFxcZFtcXGQuXSp8KFtcXHckXSt8XFwufH4oW1xcdyRdKyl8Iyh2aWV3fChbXFx3JF0rKSk/KShbXFx3JC5eXSo/KSg/OlsuW15dKFtcXHckXSspXFxdPyk/KSQvZyxcblx0XHRcdC8vICAgICAgICBub3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0ICAgICBoZWxwZXIgICAgdmlldyAgdmlld1Byb3BlcnR5IHBhdGhUb2tlbnMgICAgICBsZWFmVG9rZW5cblxuXHRcdFx0clBybTogLyhcXCgpKD89XFxzKlxcKCl8KD86KFsoW10pXFxzKik/KD86KFxcXj8pKH4/W1xcdyQuXl0rKT9cXHMqKChcXCtcXCt8LS0pfFxcK3wtfH4oPyFbXFx3JF0pfCYmfFxcfFxcfHw9PT18IT09fD09fCE9fDw9fD49fFs8PiUqOj9cXC9dfCg9KSlcXHMqfCghKj8oQCk/WyN+XT9bXFx3JC5eXSspKFsoW10pPyl8KCxcXHMqKXwoPzooXFwoKVxccyopP1xcXFw/KD86KCcpfChcIikpfCg/OlxccyooKFspXFxdXSkoPz1bLl5dfFxccyokfFteKFtdKXxbKVxcXV0pKFsoW10/KSl8KFxccyspL2csXG5cdFx0XHQvLyAgIGxmdFBybjAgICAgICAgICAgIGxmdFBybiAgICAgICAgIGJvdW5kICAgICBwYXRoICAgICAgICAgICAgICAgb3BlcmF0b3IgICAgIGVyciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVxICAgICAgcGF0aDIgbGF0ZSAgICAgICAgICAgIHBybiAgICAgIGNvbW1hICBsZnRQcm4yICAgICAgICAgIGFwb3MgcXVvdCAgICAgICAgcnRQcm4gIHJ0UHJuRG90ICAgICAgICAgICAgICAgICAgcHJuMiAgICAgc3BhY2VcblxuXHRcdFx0VmlldzogVmlldyxcblx0XHRcdEVycjogSnNWaWV3c0Vycm9yLFxuXHRcdFx0dG1wbEZuOiB0bXBsRm4sXG5cdFx0XHRwYXJzZTogcGFyc2VQYXJhbXMsXG5cdFx0XHRleHRlbmQ6ICRleHRlbmQsXG5cdFx0XHRleHRlbmRDdHg6IGV4dGVuZEN0eCxcblx0XHRcdHN5bnRheEVycjogc3ludGF4RXJyb3IsXG5cdFx0XHRvblN0b3JlOiB7XG5cdFx0XHRcdHRlbXBsYXRlOiBmdW5jdGlvbihuYW1lLCBpdGVtKSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSAkcmVuZGVyW25hbWVdO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAobmFtZSkge1xuXHRcdFx0XHRcdFx0JHJlbmRlcltuYW1lXSA9IGl0ZW07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0YWRkU2V0dGluZzogYWRkU2V0dGluZyxcblx0XHRcdHNldHRpbmdzOiB7XG5cdFx0XHRcdGFsbG93Q29kZTogZmFsc2Vcblx0XHRcdH0sXG5cdFx0XHRhZHZTZXQ6IG5vb3AsIC8vIFVwZGF0ZSBhZHZhbmNlZCBzZXR0aW5nc1xuXHRcdFx0X3RocDogdGFnSGFuZGxlcnNGcm9tUHJvcHMsXG5cdFx0XHRfZ206IGdldE1ldGhvZCxcblx0XHRcdF90ZzogZnVuY3Rpb24oKSB7fSwgLy8gQ29uc3RydWN0b3IgZm9yIHRhZ0RlZlxuXHRcdFx0X2NudnQ6IGNvbnZlcnRWYWwsXG5cdFx0XHRfdGFnOiByZW5kZXJUYWcsXG5cdFx0XHRfZXI6IGVycm9yLFxuXHRcdFx0X2Vycjogb25SZW5kZXJFcnJvcixcblx0XHRcdF9jcDogcmV0VmFsLCAvLyBHZXQgb2JzZXJ2YWJsZSBjb250ZXh0dWFsIHBhcmFtZXRlcnMgKG9yIHByb3BlcnRpZXMpIH5mb289ZXhwci4gSW4gSnNSZW5kZXIsIHNpbXBseSByZXR1cm5zIHZhbC5cblx0XHRcdF9zcTogZnVuY3Rpb24odG9rZW4pIHtcblx0XHRcdFx0aWYgKHRva2VuID09PSBcImNvbnN0cnVjdG9yXCIpIHtcblx0XHRcdFx0XHRzeW50YXhFcnJvcihcIlwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdG9rZW47XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRzZXR0aW5nczoge1xuXHRcdFx0ZGVsaW1pdGVyczogJHZpZXdzRGVsaW1pdGVycyxcblx0XHRcdGFkdmFuY2VkOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRcdFx0XHQ/IChcblx0XHRcdFx0XHRcdFx0JGV4dGVuZCgkc3ViU2V0dGluZ3NBZHZhbmNlZCwgdmFsdWUpLFxuXHRcdFx0XHRcdFx0XHQkc3ViLmFkdlNldCgpLFxuXHRcdFx0XHRcdFx0XHQkdmlld3NTZXR0aW5nc1xuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0OiAkc3ViU2V0dGluZ3NBZHZhbmNlZDtcblx0XHRcdFx0fVxuXHRcdH0sXG5cdFx0bWFwOiBkYXRhTWFwIC8vIElmIGpzT2JzZXJ2YWJsZSBsb2FkZWQgZmlyc3QsIHVzZSB0aGF0IGRlZmluaXRpb24gb2YgZGF0YU1hcFxuXHR9O1xuXG5mdW5jdGlvbiBnZXREZXJpdmVkTWV0aG9kKGJhc2VNZXRob2QsIG1ldGhvZCkge1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHJldCxcblx0XHRcdHRhZyA9IHRoaXMsXG5cdFx0XHRwcmV2QmFzZSA9IHRhZy5iYXNlO1xuXG5cdFx0dGFnLmJhc2UgPSBiYXNlTWV0aG9kOyAvLyBXaXRoaW4gbWV0aG9kIGNhbGwsIGNhbGxpbmcgdGhpcy5iYXNlIHdpbGwgY2FsbCB0aGUgYmFzZSBtZXRob2Rcblx0XHRyZXQgPSBtZXRob2QuYXBwbHkodGFnLCBhcmd1bWVudHMpOyAvLyBDYWxsIHRoZSBtZXRob2Rcblx0XHR0YWcuYmFzZSA9IHByZXZCYXNlOyAvLyBSZXBsYWNlIHRoaXMuYmFzZSB0byBiZSB0aGUgYmFzZSBtZXRob2Qgb2YgdGhlIHByZXZpb3VzIGNhbGwsIGZvciBjaGFpbmVkIGNhbGxzXG5cdFx0cmV0dXJuIHJldDtcblx0fTtcbn1cblxuZnVuY3Rpb24gZ2V0TWV0aG9kKGJhc2VNZXRob2QsIG1ldGhvZCkge1xuXHQvLyBGb3IgZGVyaXZlZCBtZXRob2RzIChvciBoYW5kbGVycyBkZWNsYXJlZCBkZWNsYXJhdGl2ZWx5IGFzIGluIHt7OmZvbyBvbkNoYW5nZT1+Zm9vQ2hhbmdlZH19IHJlcGxhY2UgYnkgYSBkZXJpdmVkIG1ldGhvZCwgdG8gYWxsb3cgdXNpbmcgdGhpcy5iYXNlKC4uLilcblx0Ly8gb3IgdGhpcy5iYXNlQXBwbHkoYXJndW1lbnRzKSB0byBjYWxsIHRoZSBiYXNlIGltcGxlbWVudGF0aW9uLiAoRXF1aXZhbGVudCB0byB0aGlzLl9zdXBlciguLi4pIGFuZCB0aGlzLl9zdXBlckFwcGx5KGFyZ3VtZW50cykgaW4galF1ZXJ5IFVJKVxuXHRpZiAoJGlzRnVuY3Rpb24obWV0aG9kKSkge1xuXHRcdG1ldGhvZCA9IGdldERlcml2ZWRNZXRob2QoXG5cdFx0XHRcdCFiYXNlTWV0aG9kXG5cdFx0XHRcdFx0PyBub29wIC8vIG5vIGJhc2UgbWV0aG9kIGltcGxlbWVudGF0aW9uLCBzbyB1c2Ugbm9vcCBhcyBiYXNlIG1ldGhvZFxuXHRcdFx0XHRcdDogYmFzZU1ldGhvZC5fZFxuXHRcdFx0XHRcdFx0PyBiYXNlTWV0aG9kIC8vIGJhc2VNZXRob2QgaXMgYSBkZXJpdmVkIG1ldGhvZCwgc28gdXNlIGl0XG5cdFx0XHRcdFx0XHQ6IGdldERlcml2ZWRNZXRob2Qobm9vcCwgYmFzZU1ldGhvZCksIC8vIGJhc2VNZXRob2QgaXMgbm90IGRlcml2ZWQgc28gbWFrZSBpdHMgYmFzZSBtZXRob2QgYmUgdGhlIG5vb3AgbWV0aG9kXG5cdFx0XHRcdG1ldGhvZFxuXHRcdFx0KTtcblx0XHRtZXRob2QuX2QgPSAoYmFzZU1ldGhvZCAmJiBiYXNlTWV0aG9kLl9kIHx8IDApICsgMTsgLy8gQWRkIGZsYWcgZm9yIGRlcml2ZWQgbWV0aG9kIChpbmNyZW1lbnRlZCBmb3IgZGVyaXZlZCBvZiBkZXJpdmVkLi4uKVxuXHR9XG5cdHJldHVybiBtZXRob2Q7XG59XG5cbmZ1bmN0aW9uIHRhZ0hhbmRsZXJzRnJvbVByb3BzKHRhZywgdGFnQ3R4KSB7XG5cdHZhciBwcm9wLFxuXHRcdHByb3BzID0gdGFnQ3R4LnByb3BzO1xuXHRmb3IgKHByb3AgaW4gcHJvcHMpIHtcblx0XHRpZiAockhhc0hhbmRsZXJzLnRlc3QocHJvcCkgJiYgISh0YWdbcHJvcF0gJiYgdGFnW3Byb3BdLmZpeCkpIHsgLy8gRG9uJ3Qgb3ZlcnJpZGUgaGFuZGxlcnMgd2l0aCBmaXggZXhwYW5kbyAodXNlZCBpbiBkYXRlcGlja2VyIGFuZCBzcGlubmVyKVxuXHRcdFx0dGFnW3Byb3BdID0gcHJvcCAhPT0gXCJjb252ZXJ0XCIgPyBnZXRNZXRob2QodGFnLmNvbnN0cnVjdG9yLnByb3RvdHlwZVtwcm9wXSwgcHJvcHNbcHJvcF0pIDogcHJvcHNbcHJvcF07XG5cdFx0XHQvLyBDb3B5IG92ZXIgdGhlIG9uRm9vIHByb3BzLCBjb252ZXJ0IGFuZCBjb252ZXJ0QmFjayBmcm9tIHRhZ0N0eC5wcm9wcyB0byB0YWcgKG92ZXJyaWRlcyB2YWx1ZXMgaW4gdGFnRGVmKS5cblx0XHRcdC8vIE5vdGU6IHVuc3VwcG9ydGVkIHNjZW5hcmlvOiBpZiBoYW5kbGVycyBhcmUgZHluYW1pY2FsbHkgYWRkZWQgXm9uRm9vPWV4cHJlc3Npb24gdGhpcyB3aWxsIHdvcmssIGJ1dCBkeW5hbWljYWxseSByZW1vdmluZyB3aWxsIG5vdCB3b3JrLlxuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiByZXRWYWwodmFsKSB7XG5cdHJldHVybiB2YWw7XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7XG5cdHJldHVybiBcIlwiO1xufVxuXG5mdW5jdGlvbiBkYmdCcmVhayh2YWwpIHtcblx0Ly8gVXNhZ2UgZXhhbXBsZXM6IHt7ZGJnOi4uLn19LCB7ezp+ZGJnKC4uLil9fSwge3tkYmcgLi4uL319LCB7Xntmb3IgLi4uIG9uQWZ0ZXJMaW5rPX5kYmd9fSBldGMuXG5cdHRyeSB7XG5cdFx0Y29uc29sZS5sb2coXCJKc1JlbmRlciBkYmcgYnJlYWtwb2ludDogXCIgKyB2YWwpO1xuXHRcdHRocm93IFwiZGJnIGJyZWFrcG9pbnRcIjsgLy8gVG8gYnJlYWsgaGVyZSwgc3RvcCBvbiBjYXVnaHQgZXhjZXB0aW9ucy5cblx0fVxuXHRjYXRjaCAoZSkge31cblx0cmV0dXJuIHRoaXMuYmFzZSA/IHRoaXMuYmFzZUFwcGx5KGFyZ3VtZW50cykgOiB2YWw7XG59XG5cbmZ1bmN0aW9uIEpzVmlld3NFcnJvcihtZXNzYWdlKSB7XG5cdC8vIEVycm9yIGV4Y2VwdGlvbiB0eXBlIGZvciBKc1ZpZXdzL0pzUmVuZGVyXG5cdC8vIE92ZXJyaWRlIG9mICQudmlld3Muc3ViLkVycm9yIGlzIHBvc3NpYmxlXG5cdHRoaXMubmFtZSA9ICgkLmxpbmsgPyBcIkpzVmlld3NcIiA6IFwiSnNSZW5kZXJcIikgKyBcIiBFcnJvclwiO1xuXHR0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlIHx8IHRoaXMubmFtZTtcbn1cblxuZnVuY3Rpb24gJGV4dGVuZCh0YXJnZXQsIHNvdXJjZSkge1xuXHRpZiAodGFyZ2V0KSB7XG5cdFx0Zm9yICh2YXIgbmFtZSBpbiBzb3VyY2UpIHtcblx0XHRcdGlmIChuYW1lICE9PSBcIl9fcHJvdG9fX1wiKSB7IC8vIFByZXZlbnQgcHJvdG90eXBlIHBvbGx1dGlvbiBhdHRhY2tzXG5cdFx0XHRcdHRhcmdldFtuYW1lXSA9IHNvdXJjZVtuYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fVxufVxuXG4oSnNWaWV3c0Vycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpKS5jb25zdHJ1Y3RvciA9IEpzVmlld3NFcnJvcjtcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PSBUb3AtbGV2ZWwgZnVuY3Rpb25zID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vPT09PT09PT09PT09PT09PT09PVxuLy8gdmlld3MuZGVsaW1pdGVyc1xuLy89PT09PT09PT09PT09PT09PT09XG5cblx0LyoqXG5cdCogU2V0IHRoZSB0YWcgb3BlbmluZyBhbmQgY2xvc2luZyBkZWxpbWl0ZXJzIGFuZCAnbGluaycgY2hhcmFjdGVyLiBEZWZhdWx0IGlzIFwie3tcIiwgXCJ9fVwiIGFuZCBcIl5cIlxuXHQqIG9wZW5DaGFycywgY2xvc2VDaGFyczogb3BlbmluZyBhbmQgY2xvc2luZyBzdHJpbmdzLCBlYWNoIHdpdGggdHdvIGNoYXJhY3RlcnNcblx0KiAkLnZpZXdzLnNldHRpbmdzLmRlbGltaXRlcnMoLi4uKVxuXHQqXG5cdCogQHBhcmFtIHtzdHJpbmd9ICAgb3BlbkNoYXJzXG5cdCogQHBhcmFtIHtzdHJpbmd9ICAgW2Nsb3NlQ2hhcnNdXG5cdCogQHBhcmFtIHtzdHJpbmd9ICAgW2xpbmtdXG5cdCogQHJldHVybnMge1NldHRpbmdzfVxuXHQqXG5cdCogR2V0IGRlbGltaXRlcnNcblx0KiBkZWxpbXNBcnJheSA9ICQudmlld3Muc2V0dGluZ3MuZGVsaW1pdGVycygpXG5cdCpcblx0KiBAcmV0dXJucyB7c3RyaW5nW119XG5cdCovXG5mdW5jdGlvbiAkdmlld3NEZWxpbWl0ZXJzKG9wZW5DaGFycywgY2xvc2VDaGFycywgbGluaykge1xuXHRpZiAoIW9wZW5DaGFycykge1xuXHRcdHJldHVybiAkc3ViU2V0dGluZ3MuZGVsaW1pdGVycztcblx0fVxuXHRpZiAoQXJyYXkuaXNBcnJheShvcGVuQ2hhcnMpKSB7XG5cdFx0cmV0dXJuICR2aWV3c0RlbGltaXRlcnMuYXBwbHkoJHZpZXdzLCBvcGVuQ2hhcnMpO1xuXHR9XG5cdGxpbmtDaGFyID0gbGluayA/IGxpbmtbMF0gOiBsaW5rQ2hhcjtcblx0aWYgKCEvXihcXFd8Xyl7NX0kLy50ZXN0KG9wZW5DaGFycyArIGNsb3NlQ2hhcnMgKyBsaW5rQ2hhcikpIHtcblx0XHRlcnJvcihcIkludmFsaWQgZGVsaW1pdGVyc1wiKTsgLy8gTXVzdCBiZSBub24td29yZCBjaGFyYWN0ZXJzLCBhbmQgb3BlbkNoYXJzIGFuZCBjbG9zZUNoYXJzIG11c3QgZWFjaCBiZSBsZW5ndGggMlxuXHR9XG5cdGRlbGltT3BlbkNoYXIwID0gb3BlbkNoYXJzWzBdO1xuXHRkZWxpbU9wZW5DaGFyMSA9IG9wZW5DaGFyc1sxXTtcblx0ZGVsaW1DbG9zZUNoYXIwID0gY2xvc2VDaGFyc1swXTtcblx0ZGVsaW1DbG9zZUNoYXIxID0gY2xvc2VDaGFyc1sxXTtcblxuXHQkc3ViU2V0dGluZ3MuZGVsaW1pdGVycyA9IFtkZWxpbU9wZW5DaGFyMCArIGRlbGltT3BlbkNoYXIxLCBkZWxpbUNsb3NlQ2hhcjAgKyBkZWxpbUNsb3NlQ2hhcjEsIGxpbmtDaGFyXTtcblxuXHQvLyBFc2NhcGUgdGhlIGNoYXJhY3RlcnMgLSBzaW5jZSB0aGV5IGNvdWxkIGJlIHJlZ2V4IHNwZWNpYWwgY2hhcmFjdGVyc1xuXHRvcGVuQ2hhcnMgPSBcIlxcXFxcIiArIGRlbGltT3BlbkNoYXIwICsgXCIoXFxcXFwiICsgbGlua0NoYXIgKyBcIik/XFxcXFwiICsgZGVsaW1PcGVuQ2hhcjE7IC8vIERlZmF1bHQgaXMgXCJ7XntcIlxuXHRjbG9zZUNoYXJzID0gXCJcXFxcXCIgKyBkZWxpbUNsb3NlQ2hhcjAgKyBcIlxcXFxcIiArIGRlbGltQ2xvc2VDaGFyMTsgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCBpcyBcIn19XCJcblx0Ly8gQnVpbGQgcmVnZXggd2l0aCBuZXcgZGVsaW1pdGVyc1xuXHQvLyAgICAgICAgICBbdGFnICAgIChmb2xsb3dlZCBieSAvIHNwYWNlIG9yIH0pICBvciBjdnRyK2NvbG9uIG9yIGh0bWwgb3IgY29kZV0gZm9sbG93ZWQgYnkgc3BhY2UrcGFyYW1zIHRoZW4gY29udmVydEJhY2s/XG5cdHJUYWcgPSBcIig/OihcXFxcdysoPz1bXFxcXC9cXFxcc1xcXFxcIiArIGRlbGltQ2xvc2VDaGFyMCArIFwiXSkpfChcXFxcdyspPyg6KXwoPil8KFxcXFwqKSlcXFxccyooKD86W15cXFxcXCJcblx0XHQrIGRlbGltQ2xvc2VDaGFyMCArIFwiXXxcXFxcXCIgKyBkZWxpbUNsb3NlQ2hhcjAgKyBcIig/IVxcXFxcIiArIGRlbGltQ2xvc2VDaGFyMSArIFwiKSkqPylcIjtcblxuXHQvLyBNYWtlIHJUYWcgYXZhaWxhYmxlIHRvIEpzVmlld3MgKG9yIG90aGVyIGNvbXBvbmVudHMpIGZvciBwYXJzaW5nIGJpbmRpbmcgZXhwcmVzc2lvbnNcblx0JHN1Yi5yVGFnID0gXCIoPzpcIiArIHJUYWcgKyBcIilcIjtcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICB7IF4/IHsgICB0YWcrcGFyYW1zIHNsYXNoPyAgb3IgY2xvc2luZ1RhZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIGNvbW1lbnRcblx0clRhZyA9IG5ldyBSZWdFeHAoXCIoPzpcIiArIG9wZW5DaGFycyArIHJUYWcgKyBcIihcXFxcLyk/fFxcXFxcIiArIGRlbGltT3BlbkNoYXIwICsgXCIoXFxcXFwiICsgbGlua0NoYXIgKyBcIik/XFxcXFwiICsgZGVsaW1PcGVuQ2hhcjEgKyBcIig/Oig/OlxcXFwvKFxcXFx3KykpXFxcXHMqfCEtLVtcXFxcc1xcXFxTXSo/LS0pKVwiICsgY2xvc2VDaGFycywgXCJnXCIpO1xuXG5cdC8vIERlZmF1bHQ6ICBiaW5kICAgICB0YWdOYW1lICAgICAgICAgY3Z0ICAgY2xuIGh0bWwgY29kZSAgICBwYXJhbXMgICAgICAgICAgICBzbGFzaCAgIGJpbmQyICAgICAgICAgY2xvc2VCbGsgIGNvbW1lbnRcblx0Ly8gICAgICAvKD86eyhcXF4pP3soPzooXFx3Kyg/PVtcXC9cXHN9XSkpfChcXHcrKT8oOil8KD4pfChcXCopKVxccyooKD86W159XXx9KD8hfSkpKj8pKFxcLyk/fHsoXFxeKT97KD86KD86XFwvKFxcdyspKVxccyp8IS0tW1xcc1xcU10qPy0tKSl9fVxuXG5cdCRzdWIuclRtcGwgPSBuZXcgUmVnRXhwKFwiXlxcXFxzfFxcXFxzJHw8Lio+fChbXlxcXFxcXFxcXXxeKVt7fV18XCIgKyBvcGVuQ2hhcnMgKyBcIi4qXCIgKyBjbG9zZUNoYXJzKTtcblx0Ly8gJHN1Yi5yVG1wbCBsb29rcyBmb3IgaW5pdGlhbCBvciBmaW5hbCB3aGl0ZSBzcGFjZSwgaHRtbCB0YWdzIG9yIHsgb3IgfSBjaGFyIG5vdCBwcmVjZWRlZCBieSBcXFxcLCBvciBKc1JlbmRlciB0YWdzIHt7eHh4fX0uXG5cdC8vIEVhY2ggb2YgdGhlc2Ugc3RyaW5ncyBhcmUgY29uc2lkZXJlZCBOT1QgdG8gYmUgalF1ZXJ5IHNlbGVjdG9yc1xuXHRyZXR1cm4gJHZpZXdzU2V0dGluZ3M7XG59XG5cbi8vPT09PT09PT09XG4vLyBWaWV3LmdldFxuLy89PT09PT09PT1cblxuZnVuY3Rpb24gZ2V0Vmlldyhpbm5lciwgdHlwZSkgeyAvL3ZpZXcuZ2V0KGlubmVyLCB0eXBlKVxuXHRpZiAoIXR5cGUgJiYgaW5uZXIgIT09IHRydWUpIHtcblx0XHQvLyB2aWV3LmdldCh0eXBlKVxuXHRcdHR5cGUgPSBpbm5lcjtcblx0XHRpbm5lciA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdHZhciB2aWV3cywgaSwgbCwgZm91bmQsXG5cdFx0dmlldyA9IHRoaXMsXG5cdFx0cm9vdCA9IHR5cGUgPT09IFwicm9vdFwiO1xuXHRcdC8vIHZpZXcuZ2V0KFwicm9vdFwiKSByZXR1cm5zIHZpZXcucm9vdCwgdmlldy5nZXQoKSByZXR1cm5zIHZpZXcucGFyZW50LCB2aWV3LmdldCh0cnVlKSByZXR1cm5zIHZpZXcudmlld3NbMF0uXG5cblx0aWYgKGlubmVyKSB7XG5cdFx0Ly8gR28gdGhyb3VnaCB2aWV3cyAtIHRoaXMgb25lLCBhbmQgYWxsIG5lc3RlZCBvbmVzLCBkZXB0aC1maXJzdCAtIGFuZCByZXR1cm4gZmlyc3Qgb25lIHdpdGggZ2l2ZW4gdHlwZS5cblx0XHQvLyBJZiB0eXBlIGlzIHVuZGVmaW5lZCwgaS5lLiB2aWV3LmdldCh0cnVlKSwgcmV0dXJuIGZpcnN0IGNoaWxkIHZpZXcuXG5cdFx0Zm91bmQgPSB0eXBlICYmIHZpZXcudHlwZSA9PT0gdHlwZSAmJiB2aWV3O1xuXHRcdGlmICghZm91bmQpIHtcblx0XHRcdHZpZXdzID0gdmlldy52aWV3cztcblx0XHRcdGlmICh2aWV3Ll8udXNlS2V5KSB7XG5cdFx0XHRcdGZvciAoaSBpbiB2aWV3cykge1xuXHRcdFx0XHRcdGlmIChmb3VuZCA9IHR5cGUgPyB2aWV3c1tpXS5nZXQoaW5uZXIsIHR5cGUpIDogdmlld3NbaV0pIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yIChpID0gMCwgbCA9IHZpZXdzLmxlbmd0aDsgIWZvdW5kICYmIGkgPCBsOyBpKyspIHtcblx0XHRcdFx0XHRmb3VuZCA9IHR5cGUgPyB2aWV3c1tpXS5nZXQoaW5uZXIsIHR5cGUpIDogdmlld3NbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSBpZiAocm9vdCkge1xuXHRcdC8vIEZpbmQgcm9vdCB2aWV3LiAodmlldyB3aG9zZSBwYXJlbnQgaXMgdG9wIHZpZXcpXG5cdFx0Zm91bmQgPSB2aWV3LnJvb3Q7XG5cdH0gZWxzZSBpZiAodHlwZSkge1xuXHRcdHdoaWxlICh2aWV3ICYmICFmb3VuZCkge1xuXHRcdFx0Ly8gR28gdGhyb3VnaCB2aWV3cyAtIHRoaXMgb25lLCBhbmQgYWxsIHBhcmVudCBvbmVzIC0gYW5kIHJldHVybiBmaXJzdCBvbmUgd2l0aCBnaXZlbiB0eXBlLlxuXHRcdFx0Zm91bmQgPSB2aWV3LnR5cGUgPT09IHR5cGUgPyB2aWV3IDogdW5kZWZpbmVkO1xuXHRcdFx0dmlldyA9IHZpZXcucGFyZW50O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRmb3VuZCA9IHZpZXcucGFyZW50O1xuXHR9XG5cdHJldHVybiBmb3VuZCB8fCB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGdldE5lc3RlZEluZGV4KCkge1xuXHR2YXIgdmlldyA9IHRoaXMuZ2V0KFwiaXRlbVwiKTtcblx0cmV0dXJuIHZpZXcgPyB2aWV3LmluZGV4IDogdW5kZWZpbmVkO1xufVxuXG5nZXROZXN0ZWRJbmRleC5kZXBlbmRzID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiBbdGhpcy5nZXQoXCJpdGVtXCIpLCBcImluZGV4XCJdO1xufTtcblxuZnVuY3Rpb24gZ2V0SW5kZXgoKSB7XG5cdHJldHVybiB0aGlzLmluZGV4O1xufVxuXG5nZXRJbmRleC5kZXBlbmRzID0gXCJpbmRleFwiO1xuXG4vLz09PT09PT09PT09PT09PT09PVxuLy8gVmlldy5jdHhQcm0sIGV0Yy5cbi8vPT09PT09PT09PT09PT09PT09XG5cbi8qIEludGVybmFsIHByaXZhdGU6IHZpZXcuX2dldE9iKCkgKi9cbmZ1bmN0aW9uIGdldFBhdGhPYmplY3Qob2IsIHBhdGgsIGx0T2IsIGZuKSB7XG5cdC8vIEl0ZXJhdGUgdGhyb3VnaCBwYXRoIHRvIGxhdGUgcGF0aHM6IEBhLmIuYyBwYXRoc1xuXHQvLyBSZXR1cm4gXCJcIiAob3Igbm9vcCBpZiBsZWFmIGlzIGEgZnVuY3Rpb24gQGEuYi5jKC4uLikgKSBpZiBpbnRlcm1lZGlhdGUgb2JqZWN0IG5vdCB5ZXQgYXZhaWxhYmxlXG5cdHZhciBwcmV2T2IsIHRva2VucywgbCxcblx0XHRpID0gMDtcblx0aWYgKGx0T2IgPT09IDEpIHtcblx0XHRmbiA9IDE7XG5cdFx0bHRPYiA9IHVuZGVmaW5lZDtcblx0fVxuXHQvLyBQYXRocyBsaWtlIF5hXmJeYyBvciB+XmFeYl5jIHdpbGwgbm90IHRocm93IGlmIGFuIG9iamVjdCBpbiBwYXRoIGlzIHVuZGVmaW5lZC5cblx0aWYgKHBhdGgpIHtcblx0XHR0b2tlbnMgPSBwYXRoLnNwbGl0KFwiLlwiKTtcblx0XHRsID0gdG9rZW5zLmxlbmd0aDtcblxuXHRcdGZvciAoOyBvYiAmJiBpIDwgbDsgaSsrKSB7XG5cdFx0XHRwcmV2T2IgPSBvYjtcblx0XHRcdG9iID0gdG9rZW5zW2ldID8gb2JbdG9rZW5zW2ldXSA6IG9iO1xuXHRcdFx0aWYgKCRpc0Z1bmN0aW9uKG9iKSkge1xuXHRcdFx0XHRvYiA9IG9iLmNhbGwocHJldk9iKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0aWYgKGx0T2IpIHtcblx0XHRsdE9iLmx0ID0gbHRPYi5sdCB8fCBpPGw7IC8vIElmIGkgPCBsIHRoZXJlIHdhcyBhbiBvYmplY3QgaW4gdGhlIHBhdGggbm90IHlldCBhdmFpbGFibGVcblx0fVxuXHRyZXR1cm4gb2IgPT09IHVuZGVmaW5lZFxuXHRcdD8gZm4gPyBub29wIDogXCJcIlxuXHRcdDogZm4gPyBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBvYi5hcHBseShwcmV2T2IsIGFyZ3VtZW50cyk7XG5cdFx0fSA6IG9iO1xufVxuXG5mdW5jdGlvbiBjb250ZXh0UGFyYW1ldGVyKGtleSwgdmFsdWUsIGdldCkge1xuXHQvLyBIZWxwZXIgbWV0aG9kIGNhbGxlZCBhcyB2aWV3LmN0eFBybShrZXkpIGZvciBoZWxwZXJzIG9yIHRlbXBsYXRlIHBhcmFtZXRlcnMgfmZvbyAtIGZyb20gY29tcGlsZWQgdGVtcGxhdGUgb3IgZnJvbSBjb250ZXh0IGNhbGxiYWNrXG5cdHZhciB3cmFwcGVkLCBkZXBzLCByZXMsIG9ic0N0eFBybSwgdGFnRWxzZSwgY2FsbFZpZXcsIG5ld1Jlcyxcblx0XHRzdG9yZVZpZXcgPSB0aGlzLFxuXHRcdGlzVXBkYXRlID0gIWlzUmVuZGVyQ2FsbCAmJiBhcmd1bWVudHMubGVuZ3RoID4gMSxcblx0XHRzdG9yZSA9IHN0b3JlVmlldy5jdHg7XG5cdGlmIChrZXkpIHtcblx0XHRpZiAoIXN0b3JlVmlldy5fKSB7IC8vIHRhZ0N0eC5jdHhQcm0oKSBjYWxsXG5cdFx0XHR0YWdFbHNlID0gc3RvcmVWaWV3LmluZGV4O1xuXHRcdFx0c3RvcmVWaWV3ID0gc3RvcmVWaWV3LnRhZztcblx0XHR9XG5cdFx0Y2FsbFZpZXcgPSBzdG9yZVZpZXc7XG5cdFx0aWYgKHN0b3JlICYmIHN0b3JlLmhhc093blByb3BlcnR5KGtleSkgfHwgKHN0b3JlID0gJGhlbHBlcnMpLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdHJlcyA9IHN0b3JlW2tleV07XG5cdFx0XHRpZiAoa2V5ID09PSBcInRhZ1wiIHx8IGtleSA9PT0gXCJ0YWdDdHhcIiB8fCBrZXkgPT09IFwicm9vdFwiIHx8IGtleSA9PT0gXCJwYXJlbnRUYWdzXCIpIHtcblx0XHRcdFx0cmV0dXJuIHJlcztcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0c3RvcmUgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmICghaXNSZW5kZXJDYWxsICYmIHN0b3JlVmlldy50YWdDdHggfHwgc3RvcmVWaWV3LmxpbmtlZCkgeyAvLyBEYXRhLWxpbmtlZCB2aWV3LCBvciB0YWcgaW5zdGFuY2Vcblx0XHRcdGlmICghcmVzIHx8ICFyZXMuX2N4cCkge1xuXHRcdFx0XHQvLyBOb3QgYSBjb250ZXh0dWFsIHBhcmFtZXRlclxuXHRcdFx0XHQvLyBTZXQgc3RvcmVWaWV3IHRvIHRhZyAoaWYgdGhpcyBpcyBhIHRhZy5jdHhQcm0oKSBjYWxsKSBvciB0byByb290IHZpZXcgKFwiZGF0YVwiIHZpZXcgb2YgbGlua2VkIHRlbXBsYXRlKVxuXHRcdFx0XHRzdG9yZVZpZXcgPSBzdG9yZVZpZXcudGFnQ3R4IHx8ICRpc0Z1bmN0aW9uKHJlcylcblx0XHRcdFx0XHQ/IHN0b3JlVmlldyAvLyBJcyBhIHRhZywgbm90IGEgdmlldywgb3IgaXMgYSBjb21wdXRlZCBjb250ZXh0dWFsIHBhcmFtZXRlciwgc28gc2NvcGUgdG8gdGhlIGNhbGxWaWV3LCBub3QgdGhlICdzY29wZSB2aWV3J1xuXHRcdFx0XHRcdDogKHN0b3JlVmlldyA9IHN0b3JlVmlldy5zY29wZSB8fCBzdG9yZVZpZXcsXG5cdFx0XHRcdFx0XHQhc3RvcmVWaWV3LmlzVG9wICYmIHN0b3JlVmlldy5jdHgudGFnIC8vIElmIHRoaXMgdmlldyBpcyBpbiBhIHRhZywgc2V0IHN0b3JlVmlldyB0byB0aGUgdGFnXG5cdFx0XHRcdFx0XHRcdHx8IHN0b3JlVmlldyk7XG5cdFx0XHRcdGlmIChyZXMgIT09IHVuZGVmaW5lZCAmJiBzdG9yZVZpZXcudGFnQ3R4KSB7XG5cdFx0XHRcdFx0Ly8gSWYgc3RvcmVWaWV3IGlzIGEgdGFnLCBidXQgdGhlIGNvbnRleHR1YWwgcGFyYW1ldGVyIGhhcyBiZWVuIHNldCBhdCBhdCBoaWdoZXIgbGV2ZWwgKGUuZy4gaGVscGVycykuLi5cblx0XHRcdFx0XHRzdG9yZVZpZXcgPSBzdG9yZVZpZXcudGFnQ3R4LnZpZXcuc2NvcGU7IC8vIHRoZW4gbW92ZSBzdG9yZVZpZXcgdG8gdGhlIG91dGVyIGxldmVsIChzY29wZSBvZiB0YWcgY29udGFpbmVyIHZpZXcpXG5cdFx0XHRcdH1cblx0XHRcdFx0c3RvcmUgPSBzdG9yZVZpZXcuX29jcHM7XG5cdFx0XHRcdHJlcyA9IHN0b3JlICYmIHN0b3JlLmhhc093blByb3BlcnR5KGtleSkgJiYgc3RvcmVba2V5XSB8fCByZXM7XG5cdFx0XHRcdGlmICghKHJlcyAmJiByZXMuX2N4cCkgJiYgKGdldCB8fCBpc1VwZGF0ZSkpIHtcblx0XHRcdFx0XHQvLyBDcmVhdGUgb2JzZXJ2YWJsZSBjb250ZXh0dWFsIHBhcmFtZXRlclxuXHRcdFx0XHRcdChzdG9yZSB8fCAoc3RvcmVWaWV3Ll9vY3BzID0gc3RvcmVWaWV3Ll9vY3BzIHx8IHt9KSlba2V5XVxuXHRcdFx0XHRcdFx0PSByZXNcblx0XHRcdFx0XHRcdD0gW3tcblx0XHRcdFx0XHRcdFx0X29jcDogcmVzLCAvLyBUaGUgb2JzZXJ2YWJsZSBjb250ZXh0dWFsIHBhcmFtZXRlciB2YWx1ZVxuXHRcdFx0XHRcdFx0XHRfdnc6IGNhbGxWaWV3LFxuXHRcdFx0XHRcdFx0XHRfa2V5OiBrZXlcblx0XHRcdFx0XHRcdH1dO1xuXHRcdFx0XHRcdHJlcy5fY3hwID0ge1xuXHRcdFx0XHRcdFx0cGF0aDogX29jcCxcblx0XHRcdFx0XHRcdGluZDogMCxcblx0XHRcdFx0XHRcdHVwZGF0ZVZhbHVlOiBmdW5jdGlvbih2YWwsIHBhdGgpIHtcblx0XHRcdFx0XHRcdFx0JC5vYnNlcnZhYmxlKHJlc1swXSkuc2V0UHJvcGVydHkoX29jcCwgdmFsKTsgLy8gU2V0IHRoZSB2YWx1ZSAocmVzWzBdLl9vY3ApXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChvYnNDdHhQcm0gPSByZXMgJiYgcmVzLl9jeHApIHtcblx0XHRcdFx0Ly8gSWYgdGhpcyBoZWxwZXIgcmVzb3VyY2UgaXMgYW4gb2JzZXJ2YWJsZSBjb250ZXh0dWFsIHBhcmFtZXRlclxuXHRcdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcblx0XHRcdFx0XHRkZXBzID0gcmVzWzFdID8gJHN1Yi5fY2VvKHJlc1sxXS5kZXBzKSA6IFtfb2NwXTsgLy8gZm4gZGVwcyAod2l0aCBhbnkgZXhwck9icyBjbG9uZWQgdXNpbmcgJHN1Yi5fY2VvKVxuXHRcdFx0XHRcdGRlcHMudW5zaGlmdChyZXNbMF0pOyAvLyB2aWV3XG5cdFx0XHRcdFx0ZGVwcy5fY3hwID0gb2JzQ3R4UHJtO1xuXHRcdFx0XHRcdC8vIEluIGEgY29udGV4dCBjYWxsYmFjayBmb3IgYSBjb250ZXh0dWFsIHBhcmFtLCB3ZSBzZXQgZ2V0ID0gdHJ1ZSwgdG8gZ2V0IGN0eFBybSBbdmlldywgZGVwZW5kZW5jaWVzLi4uXSBhcnJheSAtIG5lZWRlZCBmb3Igb2JzZXJ2ZSBjYWxsXG5cdFx0XHRcdFx0cmV0dXJuIGRlcHM7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGFnRWxzZSA9IG9ic0N0eFBybS50YWdFbHNlO1xuXHRcdFx0XHRuZXdSZXMgPSByZXNbMV0gLy8gbGlua0ZuIGZvciBjb21waWxlZCBleHByZXNzaW9uXG5cdFx0XHRcdFx0PyBvYnNDdHhQcm0udGFnICYmIG9ic0N0eFBybS50YWcuY3Z0QXJnc1xuXHRcdFx0XHRcdFx0PyBvYnNDdHhQcm0udGFnLmN2dEFyZ3ModGFnRWxzZSwgMSlbb2JzQ3R4UHJtLmluZF0gLy8gPSB0YWcuYm5kQXJncygpIC0gZm9yIHRhZyBjb250ZXh0dWFsIHBhcmFtZXRlclxuXHRcdFx0XHRcdFx0OiByZXNbMV0ocmVzWzBdLmRhdGEsIHJlc1swXSwgJHN1YikgLy8gPSBmbihkYXRhLCB2aWV3LCAkc3ViKSBmb3IgY29tcGlsZWQgYmluZGluZyBleHByZXNzaW9uXG5cdFx0XHRcdFx0OiByZXNbMF0uX29jcDsgLy8gT2JzZXJ2YWJsZSBjb250ZXh0dWFsIHBhcmFtZXRlciAodW5pbml0aWFsaXplZCwgb3IgaW5pdGlhbGl6ZWQgYXMgc3RhdGljIGV4cHJlc3Npb24sIHNvIG5vIHBhdGggZGVwZW5kZW5jaWVzKVxuXHRcdFx0XHRpZiAoaXNVcGRhdGUpIHtcblx0XHRcdFx0XHQkc3ViLl91Y3Aoa2V5LCB2YWx1ZSwgc3RvcmVWaWV3LCBvYnNDdHhQcm0pOyAvLyBVcGRhdGUgb2JzZXJ2YWJsZSBjb250ZXh0dWFsIHBhcmFtZXRlclxuXHRcdFx0XHRcdHJldHVybiBzdG9yZVZpZXc7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmVzID0gbmV3UmVzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAocmVzICYmICRpc0Z1bmN0aW9uKHJlcykpIHtcblx0XHRcdC8vIElmIGEgaGVscGVyIGlzIG9mIHR5cGUgZnVuY3Rpb24gd2Ugd2lsbCB3cmFwIGl0LCBzbyBpZiBjYWxsZWQgd2l0aCBubyB0aGlzIHBvaW50ZXIgaXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcblx0XHRcdC8vIHZpZXcgYXMgJ3RoaXMnIGNvbnRleHQuIElmIHRoZSBoZWxwZXIgfmZvbygpIHdhcyBpbiBhIGRhdGEtbGluayBleHByZXNzaW9uLCB0aGUgdmlldyB3aWxsIGhhdmUgYSAndGVtcG9yYXJ5JyBsaW5rQ3R4IHByb3BlcnR5IHRvby5cblx0XHRcdC8vIE5vdGUgdGhhdCBoZWxwZXIgZnVuY3Rpb25zIG9uIGRlZXBlciBwYXRocyB3aWxsIGhhdmUgc3BlY2lmaWMgdGhpcyBwb2ludGVycywgZnJvbSB0aGUgcHJlY2VkaW5nIHBhdGguXG5cdFx0XHQvLyBGb3IgZXhhbXBsZSwgfnV0aWwuZm9vKCkgd2lsbCBoYXZlIHRoZSB+dXRpbCBvYmplY3QgYXMgJ3RoaXMnIHBvaW50ZXJcblx0XHRcdHdyYXBwZWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIHJlcy5hcHBseSgoIXRoaXMgfHwgdGhpcyA9PT0gZ2xvYmFsKSA/IGNhbGxWaWV3IDogdGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH07XG5cdFx0XHQkZXh0ZW5kKHdyYXBwZWQsIHJlcyk7IC8vIEF0dGFjaCBzYW1lIGV4cGFuZG9zIChpZiBhbnkpIHRvIHRoZSB3cmFwcGVkIGZ1bmN0aW9uXG5cdFx0fVxuXHRcdHJldHVybiB3cmFwcGVkIHx8IHJlcztcblx0fVxufVxuXG4vKiBJbnRlcm5hbCBwcml2YXRlOiB2aWV3Ll9nZXRUbXBsKCkgKi9cbmZ1bmN0aW9uIGdldFRlbXBsYXRlKHRtcGwpIHtcblx0cmV0dXJuIHRtcGwgJiYgKHRtcGwuZm5cblx0XHQ/IHRtcGxcblx0XHQ6IHRoaXMuZ2V0UnNjKFwidGVtcGxhdGVzXCIsIHRtcGwpIHx8ICR0ZW1wbGF0ZXModG1wbCkpOyAvLyBub3QgeWV0IGNvbXBpbGVkXG59XG5cbi8vPT09PT09PT09PT09PT1cbi8vIHZpZXdzLl9jbnZ0XG4vLz09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNvbnZlcnRWYWwoY29udmVydGVyLCB2aWV3LCB0YWdDdHgsIG9uRXJyb3IpIHtcblx0Ly8gQ2FsbGVkIGZyb20gY29tcGlsZWQgdGVtcGxhdGUgY29kZSBmb3Ige3s6fX1cblx0Ly8gc2VsZiBpcyB0ZW1wbGF0ZSBvYmplY3Qgb3IgbGlua0N0eCBvYmplY3Rcblx0dmFyIHRhZywgbGlua0N0eCwgdmFsdWUsIGFyZ3NMZW4sIGJpbmRUbyxcblx0XHQvLyBJZiB0YWdDdHggaXMgYW4gaW50ZWdlciwgdGhlbiBpdCBpcyB0aGUga2V5IGZvciB0aGUgY29tcGlsZWQgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSBib3VuZFRhZyB0YWdDdHhcblx0XHRib3VuZFRhZyA9IHR5cGVvZiB0YWdDdHggPT09IFwibnVtYmVyXCIgJiYgdmlldy50bXBsLmJuZHNbdGFnQ3R4LTFdO1xuXG5cdGlmIChvbkVycm9yID09PSB1bmRlZmluZWQgJiYgYm91bmRUYWcgJiYgYm91bmRUYWcuX2xyKSB7IC8vIGxhdGVSZW5kZXJcblx0XHRvbkVycm9yID0gXCJcIjtcblx0fVxuXHRpZiAob25FcnJvciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGFnQ3R4ID0gb25FcnJvciA9IHtwcm9wczoge30sIGFyZ3M6IFtvbkVycm9yXX07XG5cdH0gZWxzZSBpZiAoYm91bmRUYWcpIHtcblx0XHR0YWdDdHggPSBib3VuZFRhZyh2aWV3LmRhdGEsIHZpZXcsICRzdWIpO1xuXHR9XG5cdGJvdW5kVGFnID0gYm91bmRUYWcuX2JkICYmIGJvdW5kVGFnO1xuXHRpZiAoY29udmVydGVyIHx8IGJvdW5kVGFnKSB7XG5cdFx0bGlua0N0eCA9IHZpZXcuX2xjOyAvLyBGb3IgZGF0YS1saW5rPVwie2N2dDouLi59XCIuLi4gU2VlIG9uRGF0YUxpbmtlZFRhZ0NoYW5nZVxuXHRcdHRhZyA9IGxpbmtDdHggJiYgbGlua0N0eC50YWc7XG5cdFx0dGFnQ3R4LnZpZXcgPSB2aWV3O1xuXHRcdGlmICghdGFnKSB7XG5cdFx0XHR0YWcgPSAkZXh0ZW5kKG5ldyAkc3ViLl90ZygpLCB7XG5cdFx0XHRcdF86IHtcblx0XHRcdFx0XHRibmQ6IGJvdW5kVGFnLFxuXHRcdFx0XHRcdHVubGlua2VkOiB0cnVlLFxuXHRcdFx0XHRcdGx0OiB0YWdDdHgubHQgLy8gSWYgYSBsYXRlIHBhdGggQHNvbWUucGF0aCBoYXMgbm90IHJldHVybmVkIEBzb21lIG9iamVjdCwgbWFyayB0YWcgYXMgbGF0ZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpbmxpbmU6ICFsaW5rQ3R4LFxuXHRcdFx0XHR0YWdOYW1lOiBcIjpcIixcblx0XHRcdFx0Y29udmVydDogY29udmVydGVyLFxuXHRcdFx0XHRvbkFycmF5Q2hhbmdlOiB0cnVlLFxuXHRcdFx0XHRmbG93OiB0cnVlLFxuXHRcdFx0XHR0YWdDdHg6IHRhZ0N0eCxcblx0XHRcdFx0dGFnQ3R4czogW3RhZ0N0eF0sXG5cdFx0XHRcdF9pczogXCJ0YWdcIlxuXHRcdFx0fSk7XG5cdFx0XHRhcmdzTGVuID0gdGFnQ3R4LmFyZ3MubGVuZ3RoO1xuXHRcdFx0aWYgKGFyZ3NMZW4+MSkge1xuXHRcdFx0XHRiaW5kVG8gPSB0YWcuYmluZFRvID0gW107XG5cdFx0XHRcdHdoaWxlIChhcmdzTGVuLS0pIHtcblx0XHRcdFx0XHRiaW5kVG8udW5zaGlmdChhcmdzTGVuKTsgLy8gQmluZCB0byBhbGwgdGhlIGFyZ3VtZW50cyAtIGdlbmVyYXRlIGJpbmRUbyBhcnJheTogWzAsMSwyLi4uXVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAobGlua0N0eCkge1xuXHRcdFx0XHRsaW5rQ3R4LnRhZyA9IHRhZztcblx0XHRcdFx0dGFnLmxpbmtDdHggPSBsaW5rQ3R4O1xuXHRcdFx0fVxuXHRcdFx0dGFnQ3R4LmN0eCA9IGV4dGVuZEN0eCh0YWdDdHguY3R4LCAobGlua0N0eCA/IGxpbmtDdHgudmlldyA6IHZpZXcpLmN0eCk7XG5cdFx0XHR0YWdIYW5kbGVyc0Zyb21Qcm9wcyh0YWcsIHRhZ0N0eCk7XG5cdFx0fVxuXHRcdHRhZy5fZXIgPSBvbkVycm9yICYmIHZhbHVlO1xuXHRcdHRhZy5jdHggPSB0YWdDdHguY3R4IHx8IHRhZy5jdHggfHwge307XG5cdFx0dGFnQ3R4LmN0eCA9IHVuZGVmaW5lZDtcblx0XHR2YWx1ZSA9IHRhZy5jdnRBcmdzKClbMF07IC8vIElmIHRoZXJlIGlzIGEgY29udmVydEJhY2sgYnV0IG5vIGNvbnZlcnQsIGNvbnZlcnRlciB3aWxsIGJlIFwidHJ1ZVwiXG5cdFx0dGFnLl9lciA9IG9uRXJyb3IgJiYgdmFsdWU7XG5cdH0gZWxzZSB7XG5cdFx0dmFsdWUgPSB0YWdDdHguYXJnc1swXTtcblx0fVxuXG5cdC8vIENhbGwgb25SZW5kZXIgKHVzZWQgYnkgSnNWaWV3cyBpZiBwcmVzZW50LCB0byBhZGQgYmluZGluZyBhbm5vdGF0aW9ucyBhcm91bmQgcmVuZGVyZWQgY29udGVudClcblx0dmFsdWUgPSBib3VuZFRhZyAmJiB2aWV3Ll8ub25SZW5kZXJcblx0XHQ/IHZpZXcuXy5vblJlbmRlcih2YWx1ZSwgdmlldywgdGFnKVxuXHRcdDogdmFsdWU7XG5cdHJldHVybiB2YWx1ZSAhPSB1bmRlZmluZWQgPyB2YWx1ZSA6IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRBcmdzKHRhZ0Vsc2UsIGJvdW5kKSB7IC8vIHRhZy5jdnRBcmdzKCkgb3IgdGFnLmN2dEFyZ3ModGFnRWxzZT8sIHRydWU/KVxuXHR2YXIgbCwga2V5LCBib3VuZEFyZ3MsIGFyZ3MsIGJpbmRGcm9tLCB0YWcsIGNvbnZlcnRlcixcblx0XHR0YWdDdHggPSB0aGlzO1xuXG5cdGlmICh0YWdDdHgudGFnTmFtZSkge1xuXHRcdHRhZyA9IHRhZ0N0eDtcblx0XHR0YWdDdHggPSAodGFnLnRhZ0N0eHMgfHwgW3RhZ0N0eF0pW3RhZ0Vsc2V8fDBdO1xuXHRcdGlmICghdGFnQ3R4KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHRhZyA9IHRhZ0N0eC50YWc7XG5cdH1cblxuXHRiaW5kRnJvbSA9IHRhZy5iaW5kRnJvbTtcblx0YXJncyA9IHRhZ0N0eC5hcmdzO1xuXG5cdGlmICgoY29udmVydGVyID0gdGFnLmNvbnZlcnQpICYmIHR5cGVvZiBjb252ZXJ0ZXIgPT09IFNUUklORykge1xuXHRcdGNvbnZlcnRlciA9IGNvbnZlcnRlciA9PT0gXCJ0cnVlXCJcblx0XHRcdD8gdW5kZWZpbmVkXG5cdFx0XHQ6ICh0YWdDdHgudmlldy5nZXRSc2MoXCJjb252ZXJ0ZXJzXCIsIGNvbnZlcnRlcikgfHwgZXJyb3IoXCJVbmtub3duIGNvbnZlcnRlcjogJ1wiICsgY29udmVydGVyICsgXCInXCIpKTtcblx0fVxuXG5cdGlmIChjb252ZXJ0ZXIgJiYgIWJvdW5kKSB7IC8vIElmIHRoZXJlIGlzIGEgY29udmVydGVyLCB1c2UgYSBjb3B5IG9mIHRoZSB0YWdDdHguYXJncyBhcnJheSBmb3IgcmVuZGVyaW5nLCBhbmQgcmVwbGFjZSB0aGUgYXJnc1swXSBpblxuXHRcdGFyZ3MgPSBhcmdzLnNsaWNlKCk7IC8vIHRoZSBjb3BpZWQgYXJyYXkgd2l0aCB0aGUgY29udmVydGVkIHZhbHVlLiBCdXQgd2UgZG8gbm90IG1vZGlmeSB0aGUgdmFsdWUgb2YgdGFnLnRhZ0N0eC5hcmdzWzBdICh0aGUgb3JpZ2luYWwgYXJncyBhcnJheSlcblx0fVxuXHRpZiAoYmluZEZyb20pIHsgLy8gR2V0IHRoZSB2YWx1ZXMgb2YgdGhlIGJvdW5kQXJnc1xuXHRcdGJvdW5kQXJncyA9IFtdO1xuXHRcdGwgPSBiaW5kRnJvbS5sZW5ndGg7XG5cdFx0d2hpbGUgKGwtLSkge1xuXHRcdFx0a2V5ID0gYmluZEZyb21bbF07XG5cdFx0XHRib3VuZEFyZ3MudW5zaGlmdChhcmdPclByb3AodGFnQ3R4LCBrZXkpKTtcblx0XHR9XG5cdFx0aWYgKGJvdW5kKSB7XG5cdFx0XHRhcmdzID0gYm91bmRBcmdzOyAvLyBDYWxsIHRvIGJuZEFyZ3MoKSAtIHJldHVybnMgdGhlIGJvdW5kQXJnc1xuXHRcdH1cblx0fVxuXHRpZiAoY29udmVydGVyKSB7XG5cdFx0Y29udmVydGVyID0gY29udmVydGVyLmFwcGx5KHRhZywgYm91bmRBcmdzIHx8IGFyZ3MpO1xuXHRcdGlmIChjb252ZXJ0ZXIgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGFyZ3M7IC8vIFJldHVybmluZyB1bmRlZmluZWQgZnJvbSBhIGNvbnZlcnRlciBpcyBlcXVpdmFsZW50IHRvIG5vdCBoYXZpbmcgYSBjb252ZXJ0ZXIuXG5cdFx0fVxuXHRcdGJpbmRGcm9tID0gYmluZEZyb20gfHwgWzBdO1xuXHRcdGwgPSBiaW5kRnJvbS5sZW5ndGg7XG5cdFx0aWYgKCEkaXNBcnJheShjb252ZXJ0ZXIpIHx8IChjb252ZXJ0ZXIuYXJnMCAhPT0gZmFsc2UgJiYgKGwgPT09IDEgfHwgY29udmVydGVyLmxlbmd0aCAhPT0gbCB8fCBjb252ZXJ0ZXIuYXJnMCkpKSB7XG5cdFx0XHRjb252ZXJ0ZXIgPSBbY29udmVydGVyXTsgLy8gUmV0dXJuaW5nIGNvbnZlcnRlciBhcyBmaXJzdCBhcmcsIGV2ZW4gaWYgY29udmVydGVyIHZhbHVlIGlzIGFuIGFycmF5XG5cdFx0XHRiaW5kRnJvbSA9IFswXTtcblx0XHRcdGwgPSAxO1xuXHRcdH1cblx0XHRpZiAoYm91bmQpIHsgICAgICAgIC8vIENhbGwgdG8gYm5kQXJncygpIC0gc28gYXBwbHkgY29udmVydGVyIHRvIGFsbCBib3VuZEFyZ3Ncblx0XHRcdGFyZ3MgPSBjb252ZXJ0ZXI7IC8vIFRoZSBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgZnJvbSB0aGUgY29udmVydGVyXG5cdFx0fSBlbHNlIHsgICAgICAgICAgICAvLyBDYWxsIHRvIGN2dEFyZ3MoKVxuXHRcdFx0d2hpbGUgKGwtLSkge1xuXHRcdFx0XHRrZXkgPSBiaW5kRnJvbVtsXTtcblx0XHRcdFx0aWYgKCtrZXkgPT09IGtleSkge1xuXHRcdFx0XHRcdGFyZ3Nba2V5XSA9IGNvbnZlcnRlcltsXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gYXJncztcbn1cblxuZnVuY3Rpb24gYXJnT3JQcm9wKGNvbnRleHQsIGtleSkge1xuXHRjb250ZXh0ID0gY29udGV4dFsra2V5ID09PSBrZXkgPyBcImFyZ3NcIiA6IFwicHJvcHNcIl07XG5cdHJldHVybiBjb250ZXh0ICYmIGNvbnRleHRba2V5XTtcbn1cblxuZnVuY3Rpb24gY29udmVydEJvdW5kQXJncyh0YWdFbHNlKSB7IC8vIHRhZy5ibmRBcmdzKClcblx0cmV0dXJuIHRoaXMuY3Z0QXJncyh0YWdFbHNlLCAxKTtcbn1cblxuLy89PT09PT09PT09PT09XG4vLyB2aWV3cy50YWdcbi8vPT09PT09PT09PT09PVxuXG4vKiB2aWV3LmdldFJzYygpICovXG5mdW5jdGlvbiBnZXRSZXNvdXJjZShyZXNvdXJjZVR5cGUsIGl0ZW1OYW1lKSB7XG5cdHZhciByZXMsIHN0b3JlLFxuXHRcdHZpZXcgPSB0aGlzO1xuXHRpZiAodHlwZW9mIGl0ZW1OYW1lID09PSBTVFJJTkcpIHtcblx0XHR3aGlsZSAoKHJlcyA9PT0gdW5kZWZpbmVkKSAmJiB2aWV3KSB7XG5cdFx0XHRzdG9yZSA9IHZpZXcudG1wbCAmJiB2aWV3LnRtcGxbcmVzb3VyY2VUeXBlXTtcblx0XHRcdHJlcyA9IHN0b3JlICYmIHN0b3JlW2l0ZW1OYW1lXTtcblx0XHRcdHZpZXcgPSB2aWV3LnBhcmVudDtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcyB8fCAkdmlld3NbcmVzb3VyY2VUeXBlXVtpdGVtTmFtZV07XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyVGFnKHRhZ05hbWUsIHBhcmVudFZpZXcsIHRtcGwsIHRhZ0N0eHMsIGlzVXBkYXRlLCBvbkVycm9yKSB7XG5cdGZ1bmN0aW9uIGJpbmRUb09yQmluZEZyb20odHlwZSkge1xuXHRcdHZhciBiaW5kQXJyYXkgPSB0YWdbdHlwZV07XG5cblx0XHRpZiAoYmluZEFycmF5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGJpbmRBcnJheSA9ICRpc0FycmF5KGJpbmRBcnJheSkgPyBiaW5kQXJyYXkgOiBbYmluZEFycmF5XTtcblx0XHRcdG0gPSBiaW5kQXJyYXkubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKG0tLSkge1xuXHRcdFx0XHRrZXkgPSBiaW5kQXJyYXlbbV07XG5cdFx0XHRcdGlmICghaXNOYU4ocGFyc2VJbnQoa2V5KSkpIHtcblx0XHRcdFx0XHRiaW5kQXJyYXlbbV0gPSBwYXJzZUludChrZXkpOyAvLyBDb252ZXJ0IFwiMFwiIHRvIDAsIGV0Yy5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBiaW5kQXJyYXkgfHwgWzBdO1xuXHR9XG5cblx0cGFyZW50VmlldyA9IHBhcmVudFZpZXcgfHwgdG9wVmlldztcblx0dmFyIHRhZywgdGFnRGVmLCB0ZW1wbGF0ZSwgdGFncywgYXR0ciwgcGFyZW50VGFnLCBsLCBtLCBuLCBpdGVtUmV0LCB0YWdDdHgsIHRhZ0N0eEN0eCwgY3R4UHJtLCBiaW5kVG8sIGJpbmRGcm9tLCBpbml0VmFsLFxuXHRcdGNvbnRlbnQsIGNhbGxJbml0LCBtYXBEZWYsIHRoaXNNYXAsIGFyZ3MsIGJkQXJncywgcHJvcHMsIHRhZ0RhdGFNYXAsIGNvbnRlbnRDdHgsIGtleSwgYmluZEZyb21MZW5ndGgsIGJpbmRUb0xlbmd0aCwgbGlua2VkRWxlbWVudCwgZGVmYXVsdEN0eCxcblx0XHRpID0gMCxcblx0XHRyZXQgPSBcIlwiLFxuXHRcdGxpbmtDdHggPSBwYXJlbnRWaWV3Ll9sYyB8fCBmYWxzZSwgLy8gRm9yIGRhdGEtbGluaz1cIntteVRhZy4uLn1cIi4uLiBTZWUgb25EYXRhTGlua2VkVGFnQ2hhbmdlXG5cdFx0Y3R4ID0gcGFyZW50Vmlldy5jdHgsXG5cdFx0cGFyZW50VG1wbCA9IHRtcGwgfHwgcGFyZW50Vmlldy50bXBsLFxuXHRcdC8vIElmIHRhZ0N0eHMgaXMgYW4gaW50ZWdlciwgdGhlbiBpdCBpcyB0aGUga2V5IGZvciB0aGUgY29tcGlsZWQgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSBib3VuZFRhZyB0YWdDdHhzXG5cdFx0Ym91bmRUYWcgPSB0eXBlb2YgdGFnQ3R4cyA9PT0gXCJudW1iZXJcIiAmJiBwYXJlbnRWaWV3LnRtcGwuYm5kc1t0YWdDdHhzLTFdO1xuXG5cdGlmICh0YWdOYW1lLl9pcyA9PT0gXCJ0YWdcIikge1xuXHRcdHRhZyA9IHRhZ05hbWU7XG5cdFx0dGFnTmFtZSA9IHRhZy50YWdOYW1lO1xuXHRcdHRhZ0N0eHMgPSB0YWcudGFnQ3R4cztcblx0XHR0ZW1wbGF0ZSA9IHRhZy50ZW1wbGF0ZTtcblx0fSBlbHNlIHtcblx0XHR0YWdEZWYgPSBwYXJlbnRWaWV3LmdldFJzYyhcInRhZ3NcIiwgdGFnTmFtZSkgfHwgZXJyb3IoXCJVbmtub3duIHRhZzoge3tcIiArIHRhZ05hbWUgKyBcIn19IFwiKTtcblx0XHR0ZW1wbGF0ZSA9IHRhZ0RlZi50ZW1wbGF0ZTtcblx0fVxuXHRpZiAob25FcnJvciA9PT0gdW5kZWZpbmVkICYmIGJvdW5kVGFnICYmIChib3VuZFRhZy5fbHIgPSAodGFnRGVmLmxhdGVSZW5kZXIgJiYgYm91bmRUYWcuX2xyIT09IGZhbHNlIHx8IGJvdW5kVGFnLl9scikpKSB7XG5cdFx0b25FcnJvciA9IFwiXCI7IC8vIElmIGxhdGVSZW5kZXIsIHNldCB0ZW1wb3Jhcnkgb25FcnJvciwgdG8gc2tpcCBpbml0aWFsIHJlbmRlcmluZyAoYW5kIHJlbmRlciBqdXN0IFwiXCIpXG5cdH1cblx0aWYgKG9uRXJyb3IgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldCArPSBvbkVycm9yO1xuXHRcdHRhZ0N0eHMgPSBvbkVycm9yID0gW3twcm9wczoge30sIGFyZ3M6IFtdLCBwYXJhbXM6IHtwcm9wczp7fX19XTtcblx0fSBlbHNlIGlmIChib3VuZFRhZykge1xuXHRcdHRhZ0N0eHMgPSBib3VuZFRhZyhwYXJlbnRWaWV3LmRhdGEsIHBhcmVudFZpZXcsICRzdWIpO1xuXHR9XG5cblx0bCA9IHRhZ0N0eHMubGVuZ3RoO1xuXHRmb3IgKDsgaSA8IGw7IGkrKykge1xuXHRcdHRhZ0N0eCA9IHRhZ0N0eHNbaV07XG5cdFx0Y29udGVudCA9IHRhZ0N0eC50bXBsO1xuXHRcdGlmICghbGlua0N0eCB8fCAhbGlua0N0eC50YWcgfHwgaSAmJiAhbGlua0N0eC50YWcuaW5saW5lIHx8IHRhZy5fZXIgfHwgY29udGVudCAmJiArY29udGVudD09PWNvbnRlbnQpIHtcblx0XHRcdC8vIEluaXRpYWxpemUgdGFnQ3R4XG5cdFx0XHQvLyBGb3IgYmxvY2sgdGFncywgdGFnQ3R4LnRtcGwgaXMgYW4gaW50ZWdlciA+IDBcblx0XHRcdGlmIChjb250ZW50ICYmIHBhcmVudFRtcGwudG1wbHMpIHtcblx0XHRcdFx0dGFnQ3R4LnRtcGwgPSB0YWdDdHguY29udGVudCA9IHBhcmVudFRtcGwudG1wbHNbY29udGVudCAtIDFdOyAvLyBTZXQgdGhlIHRtcGwgcHJvcGVydHkgdG8gdGhlIGNvbnRlbnQgb2YgdGhlIGJsb2NrIHRhZ1xuXHRcdFx0fVxuXHRcdFx0dGFnQ3R4LmluZGV4ID0gaTtcblx0XHRcdHRhZ0N0eC5jdHhQcm0gPSBjb250ZXh0UGFyYW1ldGVyO1xuXHRcdFx0dGFnQ3R4LnJlbmRlciA9IHJlbmRlckNvbnRlbnQ7XG5cdFx0XHR0YWdDdHguY3Z0QXJncyA9IGNvbnZlcnRBcmdzO1xuXHRcdFx0dGFnQ3R4LmJuZEFyZ3MgPSBjb252ZXJ0Qm91bmRBcmdzO1xuXHRcdFx0dGFnQ3R4LnZpZXcgPSBwYXJlbnRWaWV3O1xuXHRcdFx0dGFnQ3R4LmN0eCA9IGV4dGVuZEN0eChleHRlbmRDdHgodGFnQ3R4LmN0eCwgdGFnRGVmICYmIHRhZ0RlZi5jdHgpLCBjdHgpOyAvLyBDbG9uZSBhbmQgZXh0ZW5kIHBhcmVudFZpZXcuY3R4XG5cdFx0fVxuXHRcdGlmICh0bXBsID0gdGFnQ3R4LnByb3BzLnRtcGwpIHtcblx0XHRcdC8vIElmIHRoZSB0bXBsIHByb3BlcnR5IGlzIG92ZXJyaWRkZW4sIHNldCB0aGUgdmFsdWUgKHdoZW4gaW5pdGlhbGl6aW5nLCBvciwgaW4gY2FzZSBvZiBiaW5kaW5nOiBedG1wbD0uLi4sIHdoZW4gdXBkYXRpbmcpXG5cdFx0XHR0YWdDdHgudG1wbCA9IHBhcmVudFZpZXcuX2dldFRtcGwodG1wbCk7XG5cdFx0XHR0YWdDdHguY29udGVudCA9IHRhZ0N0eC5jb250ZW50IHx8IHRhZ0N0eC50bXBsO1xuXHRcdH1cblxuXHRcdGlmICghdGFnKSB7XG5cdFx0XHQvLyBUaGlzIHdpbGwgb25seSBiZSBoaXQgZm9yIGluaXRpYWwgdGFnQ3R4IChub3QgZm9yIHt7ZWxzZX19KSAtIGlmIHRoZSB0YWcgaW5zdGFuY2UgZG9lcyBub3QgZXhpc3QgeWV0XG5cdFx0XHQvLyBJZiB0aGUgdGFnIGhhcyBub3QgYWxyZWFkeSBiZWVuIGluc3RhbnRpYXRlZCwgd2Ugd2lsbCBjcmVhdGUgYSBuZXcgaW5zdGFuY2UuXG5cdFx0XHQvLyB+dGFnIHdpbGwgYWNjZXNzIHRoZSB0YWcsIGV2ZW4gd2l0aGluIHRoZSByZW5kZXJpbmcgb2YgdGhlIHRlbXBsYXRlIGNvbnRlbnQgb2YgdGhpcyB0YWcuXG5cdFx0XHQvLyBGcm9tIGNoaWxkL2Rlc2NlbmRhbnQgdGFncywgY2FuIGFjY2VzcyB1c2luZyB+dGFnLnBhcmVudCwgb3IgfnBhcmVudFRhZ3MudGFnTmFtZVxuXHRcdFx0dGFnID0gbmV3IHRhZ0RlZi5fY3RyKCk7XG5cdFx0XHRjYWxsSW5pdCA9ICEhdGFnLmluaXQ7XG5cblx0XHRcdHRhZy5wYXJlbnQgPSBwYXJlbnRUYWcgPSBjdHggJiYgY3R4LnRhZztcblx0XHRcdHRhZy50YWdDdHhzID0gdGFnQ3R4cztcblxuXHRcdFx0aWYgKGxpbmtDdHgpIHtcblx0XHRcdFx0dGFnLmlubGluZSA9IGZhbHNlO1xuXHRcdFx0XHRsaW5rQ3R4LnRhZyA9IHRhZztcblx0XHRcdH1cblx0XHRcdHRhZy5saW5rQ3R4ID0gbGlua0N0eDtcblx0XHRcdGlmICh0YWcuXy5ibmQgPSBib3VuZFRhZyB8fCBsaW5rQ3R4LmZuKSB7XG5cdFx0XHRcdC8vIEJvdW5kIGlmIHtee3RhZy4uLn19IG9yIGRhdGEtbGluaz1cInt0YWcuLi59XCJcblx0XHRcdFx0dGFnLl8udGhzID0gdGFnQ3R4LnBhcmFtcy5wcm9wc1tcInRoaXNcIl07IC8vIFRhZyBoYXMgYSB0aGlzPWV4cHIgYmluZGluZywgdG8gZ2V0IGphdmFzY3JpcHQgcmVmZXJlbmNlIHRvIHRhZyBpbnN0YW5jZVxuXHRcdFx0XHR0YWcuXy5sdCA9IHRhZ0N0eHMubHQ7IC8vIElmIGEgbGF0ZSBwYXRoIEBzb21lLnBhdGggaGFzIG5vdCByZXR1cm5lZCBAc29tZSBvYmplY3QsIG1hcmsgdGFnIGFzIGxhdGVcblx0XHRcdFx0dGFnLl8uYXJyVndzID0ge307XG5cdFx0XHR9IGVsc2UgaWYgKHRhZy5kYXRhQm91bmRPbmx5KSB7XG5cdFx0XHRcdGVycm9yKHRhZ05hbWUgKyBcIiBtdXN0IGJlIGRhdGEtYm91bmQ6XFxue157XCIgKyB0YWdOYW1lICsgXCJ9fVwiKTtcblx0XHRcdH1cblx0XHRcdC8vVE9ETyBiZXR0ZXIgcGVyZiBmb3IgY2hpbGRUYWdzKCkgLSBrZWVwIGNoaWxkIHRhZy50YWdzIGFycmF5LCAoYW5kIHJlbW92ZSBjaGlsZCwgd2hlbiBkaXNwb3NlZClcblx0XHRcdC8vIHRhZy50YWdzID0gW107XG5cdFx0fSBlbHNlIGlmIChsaW5rQ3R4ICYmIGxpbmtDdHguZm4uX2xyKSB7XG5cdFx0XHRjYWxsSW5pdCA9ICEhdGFnLmluaXQ7XG5cdFx0fVxuXHRcdHRhZ0RhdGFNYXAgPSB0YWcuZGF0YU1hcDtcblxuXHRcdHRhZ0N0eC50YWcgPSB0YWc7XG5cdFx0aWYgKHRhZ0RhdGFNYXAgJiYgdGFnQ3R4cykge1xuXHRcdFx0dGFnQ3R4Lm1hcCA9IHRhZ0N0eHNbaV0ubWFwOyAvLyBDb3B5IG92ZXIgdGhlIGNvbXBpbGVkIG1hcCBpbnN0YW5jZSBmcm9tIHRoZSBwcmV2aW91cyB0YWdDdHhzIHRvIHRoZSByZWZyZXNoZWQgb25lc1xuXHRcdH1cblx0XHRpZiAoIXRhZy5mbG93KSB7XG5cdFx0XHR0YWdDdHhDdHggPSB0YWdDdHguY3R4ID0gdGFnQ3R4LmN0eCB8fCB7fTtcblxuXHRcdFx0Ly8gdGFncyBoYXNoOiB0YWcuY3R4LnRhZ3MsIG1lcmdlZCB3aXRoIHBhcmVudFZpZXcuY3R4LnRhZ3MsXG5cdFx0XHR0YWdzID0gdGFnLnBhcmVudHMgPSB0YWdDdHhDdHgucGFyZW50VGFncyA9IGN0eCAmJiBleHRlbmRDdHgodGFnQ3R4Q3R4LnBhcmVudFRhZ3MsIGN0eC5wYXJlbnRUYWdzKSB8fCB7fTtcblx0XHRcdGlmIChwYXJlbnRUYWcpIHtcblx0XHRcdFx0dGFnc1twYXJlbnRUYWcudGFnTmFtZV0gPSBwYXJlbnRUYWc7XG5cdFx0XHRcdC8vVE9ETyBiZXR0ZXIgcGVyZiBmb3IgY2hpbGRUYWdzOiBwYXJlbnRUYWcudGFncy5wdXNoKHRhZyk7XG5cdFx0XHR9XG5cdFx0XHR0YWdzW3RhZy50YWdOYW1lXSA9IHRhZ0N0eEN0eC50YWcgPSB0YWc7XG5cdFx0XHR0YWdDdHhDdHgudGFnQ3R4ID0gdGFnQ3R4O1xuXHRcdH1cblx0fVxuXHRpZiAoISh0YWcuX2VyID0gb25FcnJvcikpIHtcblx0XHR0YWdIYW5kbGVyc0Zyb21Qcm9wcyh0YWcsIHRhZ0N0eHNbMF0pO1xuXHRcdHRhZy5yZW5kZXJpbmcgPSB7cm5kcjogdGFnLnJlbmRlcmluZ307IC8vIFByb3ZpZGUgb2JqZWN0IGZvciBzdGF0ZSBkdXJpbmcgcmVuZGVyIGNhbGxzIHRvIHRhZyBhbmQgZWxzZXMuIChVc2VkIGJ5IHt7aWZ9fSBhbmQge3tmb3J9fS4uLilcblx0XHRmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7IC8vIEl0ZXJhdGUgdGFnQ3R4IGZvciBlYWNoIHt7ZWxzZX19IGJsb2NrXG5cdFx0XHR0YWdDdHggPSB0YWcudGFnQ3R4ID0gdGFnQ3R4c1tpXTtcblx0XHRcdHByb3BzID0gdGFnQ3R4LnByb3BzO1xuXHRcdFx0dGFnLmN0eCA9IHRhZ0N0eC5jdHg7XG5cblx0XHRcdGlmICghaSkge1xuXHRcdFx0XHRpZiAoY2FsbEluaXQpIHtcblx0XHRcdFx0XHR0YWcuaW5pdCh0YWdDdHgsIGxpbmtDdHgsIHRhZy5jdHgpO1xuXHRcdFx0XHRcdGNhbGxJbml0ID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghdGFnQ3R4LmFyZ3MubGVuZ3RoICYmIHRhZ0N0eC5hcmdEZWZhdWx0ICE9PSBmYWxzZSAmJiB0YWcuYXJnRGVmYXVsdCAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHR0YWdDdHguYXJncyA9IGFyZ3MgPSBbdGFnQ3R4LnZpZXcuZGF0YV07IC8vIE1pc3NpbmcgZmlyc3QgYXJnIGRlZmF1bHRzIHRvIHRoZSBjdXJyZW50IGRhdGEgY29udGV4dFxuXHRcdFx0XHRcdHRhZ0N0eC5wYXJhbXMuYXJncyA9IFtcIiNkYXRhXCJdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmluZFRvID0gYmluZFRvT3JCaW5kRnJvbShcImJpbmRUb1wiKTtcblxuXHRcdFx0XHRpZiAodGFnLmJpbmRUbyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dGFnLmJpbmRUbyA9IGJpbmRUbztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0YWcuYmluZEZyb20gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHRhZy5iaW5kRnJvbSA9IGJpbmRUb09yQmluZEZyb20oXCJiaW5kRnJvbVwiKTtcblx0XHRcdFx0fSBlbHNlIGlmICh0YWcuYmluZFRvKSB7XG5cdFx0XHRcdFx0dGFnLmJpbmRGcm9tID0gdGFnLmJpbmRUbyA9IGJpbmRUbztcblx0XHRcdFx0fVxuXHRcdFx0XHRiaW5kRnJvbSA9IHRhZy5iaW5kRnJvbSB8fCBiaW5kVG87XG5cblx0XHRcdFx0YmluZFRvTGVuZ3RoID0gYmluZFRvLmxlbmd0aDtcblx0XHRcdFx0YmluZEZyb21MZW5ndGggPSBiaW5kRnJvbS5sZW5ndGg7XG5cblx0XHRcdFx0aWYgKHRhZy5fLmJuZCAmJiAobGlua2VkRWxlbWVudCA9IHRhZy5saW5rZWRFbGVtZW50KSkge1xuXHRcdFx0XHRcdHRhZy5saW5rZWRFbGVtZW50ID0gbGlua2VkRWxlbWVudCA9ICRpc0FycmF5KGxpbmtlZEVsZW1lbnQpID8gbGlua2VkRWxlbWVudDogW2xpbmtlZEVsZW1lbnRdO1xuXG5cdFx0XHRcdFx0aWYgKGJpbmRUb0xlbmd0aCAhPT0gbGlua2VkRWxlbWVudC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdGVycm9yKFwibGlua2VkRWxlbWVudCBub3Qgc2FtZSBsZW5ndGggYXMgYmluZFRvXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobGlua2VkRWxlbWVudCA9IHRhZy5saW5rZWRDdHhQYXJhbSkge1xuXHRcdFx0XHRcdHRhZy5saW5rZWRDdHhQYXJhbSA9IGxpbmtlZEVsZW1lbnQgPSAkaXNBcnJheShsaW5rZWRFbGVtZW50KSA/IGxpbmtlZEVsZW1lbnQ6IFtsaW5rZWRFbGVtZW50XTtcblxuXHRcdFx0XHRcdGlmIChiaW5kRnJvbUxlbmd0aCAhPT0gbGlua2VkRWxlbWVudC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdGVycm9yKFwibGlua2VkQ3R4UGFyYW0gbm90IHNhbWUgbGVuZ3RoIGFzIGJpbmRGcm9tL2JpbmRUb1wiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYmluZEZyb20pIHtcblx0XHRcdFx0XHR0YWcuXy5mcm9tSW5kZXggPSB7fTsgLy8gSGFzaCBvZiBiaW5kRnJvbSBpbmRleCB3aGljaCBoYXMgc2FtZSBwYXRoIHZhbHVlIGFzIGJpbmRUbyBpbmRleC4gZnJvbUluZGV4ID0gdGFnLl8uZnJvbUluZGV4W3RvSW5kZXhdXG5cdFx0XHRcdFx0dGFnLl8udG9JbmRleCA9IHt9OyAvLyBIYXNoIG9mIGJpbmRGcm9tIGluZGV4IHdoaWNoIGhhcyBzYW1lIHBhdGggdmFsdWUgYXMgYmluZFRvIGluZGV4LiBmcm9tSW5kZXggPSB0YWcuXy5mcm9tSW5kZXhbdG9JbmRleF1cblx0XHRcdFx0XHRuID0gYmluZEZyb21MZW5ndGg7XG5cdFx0XHRcdFx0d2hpbGUgKG4tLSkge1xuXHRcdFx0XHRcdFx0a2V5ID0gYmluZEZyb21bbl07XG5cdFx0XHRcdFx0XHRtID0gYmluZFRvTGVuZ3RoO1xuXHRcdFx0XHRcdFx0d2hpbGUgKG0tLSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoa2V5ID09PSBiaW5kVG9bbV0pIHtcblx0XHRcdFx0XHRcdFx0XHR0YWcuXy5mcm9tSW5kZXhbbV0gPSBuO1xuXHRcdFx0XHRcdFx0XHRcdHRhZy5fLnRvSW5kZXhbbl0gPSBtO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGxpbmtDdHgpIHtcblx0XHRcdFx0XHQvLyBTZXQgYXR0ciBvbiBsaW5rQ3R4IHRvIGVuc3VyZSBvdXRwdXR0aW5nIHRvIHRoZSBjb3JyZWN0IHRhcmdldCBhdHRyaWJ1dGUuXG5cdFx0XHRcdFx0Ly8gU2V0dGluZyBlaXRoZXIgbGlua0N0eC5hdHRyIG9yIHRoaXMuYXR0ciBpbiB0aGUgaW5pdCgpIGFsbG93cyBwZXItaW5zdGFuY2UgY2hvaWNlIG9mIHRhcmdldCBhdHRyaWIuXG5cdFx0XHRcdFx0bGlua0N0eC5hdHRyID0gdGFnLmF0dHIgPSBsaW5rQ3R4LmF0dHIgfHwgdGFnLmF0dHIgfHwgbGlua0N0eC5fZGZBdDtcblx0XHRcdFx0fVxuXHRcdFx0XHRhdHRyID0gdGFnLmF0dHI7XG5cdFx0XHRcdHRhZy5fLm5vVndzID0gYXR0ciAmJiBhdHRyICE9PSBIVE1MO1xuXHRcdFx0fVxuXHRcdFx0YXJncyA9IHRhZy5jdnRBcmdzKGkpO1xuXHRcdFx0aWYgKHRhZy5saW5rZWRDdHhQYXJhbSkge1xuXHRcdFx0XHRiZEFyZ3MgPSB0YWcuY3Z0QXJncyhpLCAxKTtcblx0XHRcdFx0bSA9IGJpbmRGcm9tTGVuZ3RoO1xuXHRcdFx0XHRkZWZhdWx0Q3R4ID0gdGFnLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5jdHg7XG5cdFx0XHRcdHdoaWxlIChtLS0pIHtcblx0XHRcdFx0XHRpZiAoY3R4UHJtID0gdGFnLmxpbmtlZEN0eFBhcmFtW21dKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBiaW5kRnJvbVttXTtcblx0XHRcdFx0XHRcdGluaXRWYWwgPSBiZEFyZ3NbbV07XG5cdFx0XHRcdFx0XHQvLyBDcmVhdGUgdGFnIGNvbnRleHR1YWwgcGFyYW1ldGVyXG5cdFx0XHRcdFx0XHR0YWdDdHguY3R4W2N0eFBybV0gPSAkc3ViLl9jcChcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdEN0eCAmJiBpbml0VmFsID09PSB1bmRlZmluZWQgPyBkZWZhdWx0Q3R4W2N0eFBybV06IGluaXRWYWwsXG5cdFx0XHRcdFx0XHRcdGluaXRWYWwgIT09IHVuZGVmaW5lZCAmJiBhcmdPclByb3AodGFnQ3R4LnBhcmFtcywga2V5KSxcblx0XHRcdFx0XHRcdFx0dGFnQ3R4LnZpZXcsXG5cdFx0XHRcdFx0XHRcdHRhZy5fLmJuZCAmJiB7dGFnOiB0YWcsIGN2dDogdGFnLmNvbnZlcnQsIGluZDogbSwgdGFnRWxzZTogaX1cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoKG1hcERlZiA9IHByb3BzLmRhdGFNYXAgfHwgdGFnRGF0YU1hcCkgJiYgKGFyZ3MubGVuZ3RoIHx8IHByb3BzLmRhdGFNYXApKSB7XG5cdFx0XHRcdHRoaXNNYXAgPSB0YWdDdHgubWFwO1xuXHRcdFx0XHRpZiAoIXRoaXNNYXAgfHwgdGhpc01hcC5zcmMgIT09IGFyZ3NbMF0gfHwgaXNVcGRhdGUpIHtcblx0XHRcdFx0XHRpZiAodGhpc01hcCAmJiB0aGlzTWFwLnNyYykge1xuXHRcdFx0XHRcdFx0dGhpc01hcC51bm1hcCgpOyAvLyBvbmx5IGNhbGxlZCBpZiBvYnNlcnZhYmxlIG1hcCAtIG5vdCB3aGVuIG9ubHkgdXNlZCBpbiBKc1JlbmRlciwgZS5nLiBieSB7e3Byb3BzfX1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bWFwRGVmLm1hcChhcmdzWzBdLCB0YWdDdHgsIHRoaXNNYXAsICF0YWcuXy5ibmQpO1xuXHRcdFx0XHRcdHRoaXNNYXAgPSB0YWdDdHgubWFwO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGFyZ3MgPSBbdGhpc01hcC50Z3RdO1xuXHRcdFx0fVxuXG5cdFx0XHRpdGVtUmV0ID0gdW5kZWZpbmVkO1xuXHRcdFx0aWYgKHRhZy5yZW5kZXIpIHtcblx0XHRcdFx0aXRlbVJldCA9IHRhZy5yZW5kZXIuYXBwbHkodGFnLCBhcmdzKTtcblx0XHRcdFx0aWYgKHBhcmVudFZpZXcubGlua2VkICYmIGl0ZW1SZXQgJiYgIXJXcmFwcGVkSW5WaWV3TWFya2VyLnRlc3QoaXRlbVJldCkpIHtcblx0XHRcdFx0XHQvLyBXaGVuIGEgdGFnIHJlbmRlcnMgY29udGVudCBmcm9tIHRoZSByZW5kZXIgbWV0aG9kLCB3aXRoIGRhdGEgbGlua2luZyB0aGVuIHdlIG5lZWQgdG8gd3JhcCB3aXRoIHZpZXcgbWFya2VycywgaWYgYWJzZW50LFxuXHRcdFx0XHRcdC8vIHRvIHByb3ZpZGUgYSBjb250ZW50VmlldyBmb3IgdGhlIHRhZywgd2hpY2ggd2lsbCBjb3JyZWN0bHkgZGlzcG9zZSBiaW5kaW5ncyBpZiBkZWxldGVkLiBUaGUgJ3RtcGwnIGZvciB0aGlzIHZpZXcgd2lsbFxuXHRcdFx0XHRcdC8vIGJlIGEgZHVtYmVkLWRvd24gdGVtcGxhdGUgd2hpY2ggd2lsbCBhbHdheXMgcmV0dXJuIHRoZSBpdGVtUmV0IHN0cmluZyAobm8gbWF0dGVyIHdoYXQgdGhlIGRhdGEgaXMpLiBUaGUgaXRlbVJldCBzdHJpbmdcblx0XHRcdFx0XHQvLyBpcyBub3QgY29tcGlsZWQgYXMgdGVtcGxhdGUgbWFya3VwLCBzbyBjYW4gaW5jbHVkZSBcInt7XCIgb3IgXCJ9fVwiIHdpdGhvdXQgdHJpZ2dlcmluZyBzeW50YXggZXJyb3JzXG5cdFx0XHRcdFx0dG1wbCA9IHsgLy8gJ0R1bWJlZC1kb3duJyB0ZW1wbGF0ZSB3aGljaCBhbHdheXMgcmVuZGVycyAnc3RhdGljJyBpdGVtUmV0IHN0cmluZ1xuXHRcdFx0XHRcdFx0bGlua3M6IFtdXG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR0bXBsLnJlbmRlciA9IHRtcGwuZm4gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBpdGVtUmV0O1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0aXRlbVJldCA9IHJlbmRlcldpdGhWaWV3cyh0bXBsLCBwYXJlbnRWaWV3LmRhdGEsIHVuZGVmaW5lZCwgdHJ1ZSwgcGFyZW50VmlldywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRhZyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICghYXJncy5sZW5ndGgpIHtcblx0XHRcdFx0YXJncyA9IFtwYXJlbnRWaWV3XTsgLy8gbm8gYXJndW1lbnRzIC0gKGUuZy4ge3tlbHNlfX0pIGdldCBkYXRhIGNvbnRleHQgZnJvbSB2aWV3LlxuXHRcdFx0fVxuXHRcdFx0aWYgKGl0ZW1SZXQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250ZW50Q3R4ID0gYXJnc1swXTsgLy8gRGVmYXVsdCBkYXRhIGNvbnRleHQgZm9yIHdyYXBwZWQgYmxvY2sgY29udGVudCBpcyB0aGUgZmlyc3QgYXJndW1lbnRcblx0XHRcdFx0aWYgKHRhZy5jb250ZW50Q3R4KSB7IC8vIFNldCB0YWcuY29udGVudEN0eCB0byB0cnVlLCB0byBpbmhlcml0IHBhcmVudCBjb250ZXh0LCBvciB0byBhIGZ1bmN0aW9uIHRvIHByb3ZpZGUgYWx0ZXJuYXRlIGNvbnRleHQuXG5cdFx0XHRcdFx0Y29udGVudEN0eCA9IHRhZy5jb250ZW50Q3R4ID09PSB0cnVlID8gcGFyZW50VmlldyA6IHRhZy5jb250ZW50Q3R4KGNvbnRlbnRDdHgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGl0ZW1SZXQgPSB0YWdDdHgucmVuZGVyKGNvbnRlbnRDdHgsIHRydWUpIHx8IChpc1VwZGF0ZSA/IHVuZGVmaW5lZCA6IFwiXCIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0ID0gcmV0XG5cdFx0XHRcdD8gcmV0ICsgKGl0ZW1SZXQgfHwgXCJcIilcblx0XHRcdFx0OiBpdGVtUmV0ICE9PSB1bmRlZmluZWRcblx0XHRcdFx0XHQ/IFwiXCIgKyBpdGVtUmV0XG5cdFx0XHRcdFx0OiB1bmRlZmluZWQ7IC8vIElmIG5vIHJldHVybiB2YWx1ZSBmcm9tIHJlbmRlciwgYW5kIG5vIHRlbXBsYXRlL2NvbnRlbnQgdGFnQ3R4LnJlbmRlciguLi4pLCByZXR1cm4gdW5kZWZpbmVkXG5cdFx0fVxuXHRcdHRhZy5yZW5kZXJpbmcgPSB0YWcucmVuZGVyaW5nLnJuZHI7IC8vIFJlbW92ZSB0YWcucmVuZGVyaW5nIG9iamVjdCAoaWYgdGhpcyBpcyBvdXRlcm1vc3QgcmVuZGVyIGNhbGwuIChJbiBjYXNlIG9mIG5lc3RlZCBjYWxscylcblx0fVxuXHR0YWcudGFnQ3R4ID0gdGFnQ3R4c1swXTtcblx0dGFnLmN0eCA9IHRhZy50YWdDdHguY3R4O1xuXG5cdGlmICh0YWcuXy5ub1Z3cyAmJiB0YWcuaW5saW5lKSB7XG5cdFx0Ly8gaW5saW5lIHRhZyB3aXRoIGF0dHIgc2V0IHRvIFwidGV4dFwiIHdpbGwgaW5zZXJ0IEhUTUwtZW5jb2RlZCBjb250ZW50IC0gYXMgaWYgaXQgd2FzIGVsZW1lbnQtYmFzZWQgaW5uZXJUZXh0XG5cdFx0cmV0ID0gYXR0ciA9PT0gXCJ0ZXh0XCJcblx0XHRcdD8gJGNvbnZlcnRlcnMuaHRtbChyZXQpXG5cdFx0XHQ6IFwiXCI7XG5cdH1cblx0cmV0dXJuIGJvdW5kVGFnICYmIHBhcmVudFZpZXcuXy5vblJlbmRlclxuXHRcdC8vIENhbGwgb25SZW5kZXIgKHVzZWQgYnkgSnNWaWV3cyBpZiBwcmVzZW50LCB0byBhZGQgYmluZGluZyBhbm5vdGF0aW9ucyBhcm91bmQgcmVuZGVyZWQgY29udGVudClcblx0XHQ/IHBhcmVudFZpZXcuXy5vblJlbmRlcihyZXQsIHBhcmVudFZpZXcsIHRhZylcblx0XHQ6IHJldDtcbn1cblxuLy89PT09PT09PT09PT09PT09PVxuLy8gVmlldyBjb25zdHJ1Y3RvclxuLy89PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBWaWV3KGNvbnRleHQsIHR5cGUsIHBhcmVudFZpZXcsIGRhdGEsIHRlbXBsYXRlLCBrZXksIG9uUmVuZGVyLCBjb250ZW50VG1wbCkge1xuXHQvLyBDb25zdHJ1Y3RvciBmb3IgdmlldyBvYmplY3QgaW4gdmlldyBoaWVyYXJjaHkuIChBdWdtZW50ZWQgYnkgSnNWaWV3cyBpZiBKc1ZpZXdzIGlzIGxvYWRlZClcblx0dmFyIHZpZXdzLCBwYXJlbnRWaWV3XywgdGFnLCBzZWxmXyxcblx0XHRzZWxmID0gdGhpcyxcblx0XHRpc0FycmF5ID0gdHlwZSA9PT0gXCJhcnJheVwiO1xuXHRcdC8vIElmIHRoZSBkYXRhIGlzIGFuIGFycmF5LCB0aGlzIGlzIGFuICdhcnJheSB2aWV3JyB3aXRoIGEgdmlld3MgYXJyYXkgZm9yIGVhY2ggY2hpbGQgJ2l0ZW0gdmlldydcblx0XHQvLyBJZiB0aGUgZGF0YSBpcyBub3QgYW4gYXJyYXksIHRoaXMgaXMgYW4gJ2l0ZW0gdmlldycgd2l0aCBhIHZpZXdzICdoYXNoJyBvYmplY3QgZm9yIGFueSBjaGlsZCBuZXN0ZWQgdmlld3NcblxuXHRzZWxmLmNvbnRlbnQgPSBjb250ZW50VG1wbDtcblx0c2VsZi52aWV3cyA9IGlzQXJyYXkgPyBbXSA6IHt9O1xuXHRzZWxmLmRhdGEgPSBkYXRhO1xuXHRzZWxmLnRtcGwgPSB0ZW1wbGF0ZTtcblx0c2VsZl8gPSBzZWxmLl8gPSB7XG5cdFx0a2V5OiAwLFxuXHRcdC8vIC5fLnVzZUtleSBpcyBub24gemVybyBpZiBpcyBub3QgYW4gJ2FycmF5IHZpZXcnIChvd25pbmcgYSBkYXRhIGFycmF5KS4gVXNlIHRoaXMgYXMgbmV4dCBrZXkgZm9yIGFkZGluZyB0byBjaGlsZCB2aWV3cyBoYXNoXG5cdFx0dXNlS2V5OiBpc0FycmF5ID8gMCA6IDEsXG5cdFx0aWQ6IFwiXCIgKyB2aWV3SWQrKyxcblx0XHRvblJlbmRlcjogb25SZW5kZXIsXG5cdFx0Ym5kczoge31cblx0fTtcblx0c2VsZi5saW5rZWQgPSAhIW9uUmVuZGVyO1xuXHRzZWxmLnR5cGUgPSB0eXBlIHx8IFwidG9wXCI7XG5cdGlmICh0eXBlKSB7XG5cdFx0c2VsZi5jYWNoZSA9IHtfY3Q6ICRzdWJTZXR0aW5ncy5fY2NoQ3R9OyAvLyBVc2VkIGZvciBjYWNoaW5nIHJlc3VsdHMgb2YgY29tcHV0ZWQgcHJvcGVydGllcyBhbmQgaGVscGVycyAodmlldy5nZXRDYWNoZSlcblx0fVxuXG5cdGlmICghcGFyZW50VmlldyB8fCBwYXJlbnRWaWV3LnR5cGUgPT09IFwidG9wXCIpIHtcblx0XHQoc2VsZi5jdHggPSBjb250ZXh0IHx8IHt9KS5yb290ID0gc2VsZi5kYXRhO1xuXHR9XG5cblx0aWYgKHNlbGYucGFyZW50ID0gcGFyZW50Vmlldykge1xuXHRcdHNlbGYucm9vdCA9IHBhcmVudFZpZXcucm9vdCB8fCBzZWxmOyAvLyB2aWV3IHdob3NlIHBhcmVudCBpcyB0b3Agdmlld1xuXHRcdHZpZXdzID0gcGFyZW50Vmlldy52aWV3cztcblx0XHRwYXJlbnRWaWV3XyA9IHBhcmVudFZpZXcuXztcblx0XHRzZWxmLmlzVG9wID0gcGFyZW50Vmlld18uc2NwOyAvLyBJcyB0b3AgY29udGVudCB2aWV3IG9mIGEgbGluayhcIiNjb250YWluZXJcIiwgLi4uKSBjYWxsXG5cdFx0c2VsZi5zY29wZSA9ICghY29udGV4dC50YWcgfHwgY29udGV4dC50YWcgPT09IHBhcmVudFZpZXcuY3R4LnRhZykgJiYgIXNlbGYuaXNUb3AgJiYgcGFyZW50Vmlldy5zY29wZSB8fCBzZWxmO1xuXHRcdC8vIFNjb3BlIGZvciBjb250ZXh0UGFyYW1zIC0gY2xvc2VzdCBub24gZmxvdyB0YWcgYW5jZXN0b3Igb3Igcm9vdCB2aWV3XG5cdFx0aWYgKHBhcmVudFZpZXdfLnVzZUtleSkge1xuXHRcdFx0Ly8gUGFyZW50IGlzIG5vdCBhbiAnYXJyYXkgdmlldycuIEFkZCB0aGlzIHZpZXcgdG8gaXRzIHZpZXdzIG9iamVjdFxuXHRcdFx0Ly8gc2VsZi5fa2V5ID0gaXMgdGhlIGtleSBpbiB0aGUgcGFyZW50IHZpZXcgaGFzaFxuXHRcdFx0dmlld3Nbc2VsZl8ua2V5ID0gXCJfXCIgKyBwYXJlbnRWaWV3Xy51c2VLZXkrK10gPSBzZWxmO1xuXHRcdFx0c2VsZi5pbmRleCA9IGluZGV4U3RyO1xuXHRcdFx0c2VsZi5nZXRJbmRleCA9IGdldE5lc3RlZEluZGV4O1xuXHRcdH0gZWxzZSBpZiAodmlld3MubGVuZ3RoID09PSAoc2VsZl8ua2V5ID0gc2VsZi5pbmRleCA9IGtleSkpIHsgLy8gUGFyZW50IGlzIGFuICdhcnJheSB2aWV3Jy4gQWRkIHRoaXMgdmlldyB0byBpdHMgdmlld3MgYXJyYXlcblx0XHRcdHZpZXdzLnB1c2goc2VsZik7IC8vIEFkZGluZyB0byBlbmQgb2Ygdmlld3MgYXJyYXkuIChVc2luZyBwdXNoIHdoZW4gcG9zc2libGUgLSBiZXR0ZXIgcGVyZiB0aGFuIHNwbGljZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmlld3Muc3BsaWNlKGtleSwgMCwgc2VsZik7IC8vIEluc2VydGluZyBpbiB2aWV3cyBhcnJheVxuXHRcdH1cblx0XHQvLyBJZiBubyBjb250ZXh0IHdhcyBwYXNzZWQgaW4sIHVzZSBwYXJlbnQgY29udGV4dFxuXHRcdC8vIElmIGNvbnRleHQgd2FzIHBhc3NlZCBpbiwgaXQgc2hvdWxkIGhhdmUgYmVlbiBtZXJnZWQgYWxyZWFkeSB3aXRoIHBhcmVudCBjb250ZXh0XG5cdFx0c2VsZi5jdHggPSBjb250ZXh0IHx8IHBhcmVudFZpZXcuY3R4O1xuXHR9IGVsc2UgaWYgKHR5cGUpIHtcblx0XHRzZWxmLnJvb3QgPSBzZWxmOyAvLyB2aWV3IHdob3NlIHBhcmVudCBpcyB0b3Agdmlld1xuXHR9XG59XG5cblZpZXcucHJvdG90eXBlID0ge1xuXHRnZXQ6IGdldFZpZXcsXG5cdGdldEluZGV4OiBnZXRJbmRleCxcblx0Y3R4UHJtOiBjb250ZXh0UGFyYW1ldGVyLFxuXHRnZXRSc2M6IGdldFJlc291cmNlLFxuXHRfZ2V0VG1wbDogZ2V0VGVtcGxhdGUsXG5cdF9nZXRPYjogZ2V0UGF0aE9iamVjdCxcblx0Z2V0Q2FjaGU6IGZ1bmN0aW9uKGtleSkgeyAvLyBHZXQgY2FjaGVkIHZhbHVlIG9mIGNvbXB1dGVkIHZhbHVlXG5cdFx0aWYgKCRzdWJTZXR0aW5ncy5fY2NoQ3QgPiB0aGlzLmNhY2hlLl9jdCkge1xuXHRcdFx0dGhpcy5jYWNoZSA9IHtfY3Q6ICRzdWJTZXR0aW5ncy5fY2NoQ3R9O1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jYWNoZVtrZXldICE9PSB1bmRlZmluZWQgPyB0aGlzLmNhY2hlW2tleV0gOiAodGhpcy5jYWNoZVtrZXldID0gY3BGblN0b3JlW2tleV0odGhpcy5kYXRhLCB0aGlzLCAkc3ViKSk7XG5cdH0sXG5cdF9pczogXCJ2aWV3XCJcbn07XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gUmVnaXN0cmF0aW9uXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gY29tcGlsZUNoaWxkUmVzb3VyY2VzKHBhcmVudFRtcGwpIHtcblx0dmFyIHN0b3JlTmFtZSwgc3RvcmVOYW1lcywgcmVzb3VyY2VzO1xuXHRmb3IgKHN0b3JlTmFtZSBpbiBqc3ZTdG9yZXMpIHtcblx0XHRzdG9yZU5hbWVzID0gc3RvcmVOYW1lICsgXCJzXCI7XG5cdFx0aWYgKHBhcmVudFRtcGxbc3RvcmVOYW1lc10pIHtcblx0XHRcdHJlc291cmNlcyA9IHBhcmVudFRtcGxbc3RvcmVOYW1lc107ICAgICAgICAvLyBSZXNvdXJjZXMgbm90IHlldCBjb21waWxlZFxuXHRcdFx0cGFyZW50VG1wbFtzdG9yZU5hbWVzXSA9IHt9OyAgICAgICAgICAgICAgIC8vIFJlbW92ZSB1bmNvbXBpbGVkIHJlc291cmNlc1xuXHRcdFx0JHZpZXdzW3N0b3JlTmFtZXNdKHJlc291cmNlcywgcGFyZW50VG1wbCk7IC8vIEFkZCBiYWNrIGluIHRoZSBjb21waWxlZCByZXNvdXJjZXNcblx0XHR9XG5cdH1cbn1cblxuLy89PT09PT09PT09PT09PT1cbi8vIGNvbXBpbGVUYWdcbi8vPT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNvbXBpbGVUYWcobmFtZSwgdGFnRGVmLCBwYXJlbnRUbXBsKSB7XG5cdHZhciB0bXBsLCBiYXNlVGFnLCBwcm9wLFxuXHRcdGNvbXBpbGVkRGVmID0gbmV3ICRzdWIuX3RnKCk7XG5cblx0ZnVuY3Rpb24gVGFnKCkge1xuXHRcdHZhciB0YWcgPSB0aGlzO1xuXHRcdHRhZy5fID0ge1xuXHRcdFx0dW5saW5rZWQ6IHRydWVcblx0XHR9O1xuXHRcdHRhZy5pbmxpbmUgPSB0cnVlO1xuXHRcdHRhZy50YWdOYW1lID0gbmFtZTtcblx0fVxuXG5cdGlmICgkaXNGdW5jdGlvbih0YWdEZWYpKSB7XG5cdFx0Ly8gU2ltcGxlIHRhZyBkZWNsYXJlZCBhcyBmdW5jdGlvbi4gTm8gcHJlc2VudGVyIGluc3RhbnRhdGlvbi5cblx0XHR0YWdEZWYgPSB7XG5cdFx0XHRkZXBlbmRzOiB0YWdEZWYuZGVwZW5kcyxcblx0XHRcdHJlbmRlcjogdGFnRGVmXG5cdFx0fTtcblx0fSBlbHNlIGlmICh0eXBlb2YgdGFnRGVmID09PSBTVFJJTkcpIHtcblx0XHR0YWdEZWYgPSB7dGVtcGxhdGU6IHRhZ0RlZn07XG5cdH1cblxuXHRpZiAoYmFzZVRhZyA9IHRhZ0RlZi5iYXNlVGFnKSB7XG5cdFx0dGFnRGVmLmZsb3cgPSAhIXRhZ0RlZi5mbG93OyAvLyBTZXQgZmxvdyBwcm9wZXJ0eSwgc28gZGVmYXVsdHMgdG8gZmFsc2UgZXZlbiBpZiBiYXNlVGFnIGhhcyBmbG93PXRydWVcblx0XHRiYXNlVGFnID0gdHlwZW9mIGJhc2VUYWcgPT09IFNUUklOR1xuXHRcdFx0PyAocGFyZW50VG1wbCAmJiBwYXJlbnRUbXBsLnRhZ3NbYmFzZVRhZ10gfHwgJHRhZ3NbYmFzZVRhZ10pXG5cdFx0XHQ6IGJhc2VUYWc7XG5cdFx0aWYgKCFiYXNlVGFnKSB7XG5cdFx0XHRlcnJvcignYmFzZVRhZzogXCInICsgdGFnRGVmLmJhc2VUYWcgKyAnXCIgbm90IGZvdW5kJyk7XG5cdFx0fVxuXHRcdGNvbXBpbGVkRGVmID0gJGV4dGVuZChjb21waWxlZERlZiwgYmFzZVRhZyk7XG5cblx0XHRmb3IgKHByb3AgaW4gdGFnRGVmKSB7XG5cdFx0XHRjb21waWxlZERlZltwcm9wXSA9IGdldE1ldGhvZChiYXNlVGFnW3Byb3BdLCB0YWdEZWZbcHJvcF0pO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRjb21waWxlZERlZiA9ICRleHRlbmQoY29tcGlsZWREZWYsIHRhZ0RlZik7XG5cdH1cblxuXHQvLyBUYWcgZGVjbGFyZWQgYXMgb2JqZWN0LCB1c2VkIGFzIHRoZSBwcm90b3R5cGUgZm9yIHRhZyBpbnN0YW50aWF0aW9uIChjb250cm9sL3ByZXNlbnRlcilcblx0aWYgKCh0bXBsID0gY29tcGlsZWREZWYudGVtcGxhdGUpICE9PSB1bmRlZmluZWQpIHtcblx0XHRjb21waWxlZERlZi50ZW1wbGF0ZSA9IHR5cGVvZiB0bXBsID09PSBTVFJJTkcgPyAoJHRlbXBsYXRlc1t0bXBsXSB8fCAkdGVtcGxhdGVzKHRtcGwpKSA6IHRtcGw7XG5cdH1cblx0KFRhZy5wcm90b3R5cGUgPSBjb21waWxlZERlZikuY29uc3RydWN0b3IgPSBjb21waWxlZERlZi5fY3RyID0gVGFnO1xuXG5cdGlmIChwYXJlbnRUbXBsKSB7XG5cdFx0Y29tcGlsZWREZWYuX3BhcmVudFRtcGwgPSBwYXJlbnRUbXBsO1xuXHR9XG5cdHJldHVybiBjb21waWxlZERlZjtcbn1cblxuZnVuY3Rpb24gYmFzZUFwcGx5KGFyZ3MpIHtcblx0Ly8gSW4gZGVyaXZlZCBtZXRob2QgKG9yIGhhbmRsZXIgZGVjbGFyZWQgZGVjbGFyYXRpdmVseSBhcyBpbiB7ezpmb28gb25DaGFuZ2U9fmZvb0NoYW5nZWR9fSBjYW4gY2FsbCBiYXNlIG1ldGhvZCxcblx0Ly8gdXNpbmcgdGhpcy5iYXNlQXBwbHkoYXJndW1lbnRzKSAoRXF1aXZhbGVudCB0byB0aGlzLl9zdXBlckFwcGx5KGFyZ3VtZW50cykgaW4galF1ZXJ5IFVJKVxuXHRyZXR1cm4gdGhpcy5iYXNlLmFwcGx5KHRoaXMsIGFyZ3MpO1xufVxuXG4vLz09PT09PT09PT09PT09PVxuLy8gY29tcGlsZVRtcGxcbi8vPT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNvbXBpbGVUbXBsKG5hbWUsIHRtcGwsIHBhcmVudFRtcGwsIG9wdGlvbnMpIHtcblx0Ly8gdG1wbCBpcyBlaXRoZXIgYSB0ZW1wbGF0ZSBvYmplY3QsIGEgc2VsZWN0b3IgZm9yIGEgdGVtcGxhdGUgc2NyaXB0IGJsb2NrLCBvciB0aGUgbmFtZSBvZiBhIGNvbXBpbGVkIHRlbXBsYXRlXG5cblx0Ly89PT09IG5lc3RlZCBmdW5jdGlvbnMgPT09PVxuXHRmdW5jdGlvbiBsb29rdXBUZW1wbGF0ZSh2YWx1ZSkge1xuXHRcdC8vIElmIHZhbHVlIGlzIG9mIHR5cGUgc3RyaW5nIC0gdHJlYXQgYXMgc2VsZWN0b3IsIG9yIG5hbWUgb2YgY29tcGlsZWQgdGVtcGxhdGVcblx0XHQvLyBSZXR1cm4gdGhlIHRlbXBsYXRlIG9iamVjdCwgaWYgYWxyZWFkeSBjb21waWxlZCwgb3IgdGhlIG1hcmt1cCBzdHJpbmdcblx0XHR2YXIgY3VycmVudE5hbWUsIHRtcGw7XG5cdFx0aWYgKCh0eXBlb2YgdmFsdWUgPT09IFNUUklORykgfHwgdmFsdWUubm9kZVR5cGUgPiAwICYmIChlbGVtID0gdmFsdWUpKSB7XG5cdFx0XHRpZiAoIWVsZW0pIHtcblx0XHRcdFx0aWYgKC9eXFwuP1xcL1teXFxcXDoqP1wiPD5dKiQvLnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdFx0Ly8gdmFsdWU9XCIuL3NvbWUvZmlsZS5odG1sXCIgKG9yIFwiL3NvbWUvZmlsZS5odG1sXCIpXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIHRlbXBsYXRlIGlzIG5vdCBuYW1lZCwgdXNlIFwiLi9zb21lL2ZpbGUuaHRtbFwiIGFzIG5hbWUuXG5cdFx0XHRcdFx0aWYgKHRtcGwgPSAkdGVtcGxhdGVzW25hbWUgPSBuYW1lIHx8IHZhbHVlXSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSB0bXBsO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBCUk9XU0VSLVNQRUNJRklDIENPREUgKG5vdCBvbiBOb2RlLmpzKTpcblx0XHRcdFx0XHRcdC8vIExvb2sgZm9yIHNlcnZlci1nZW5lcmF0ZWQgc2NyaXB0IGJsb2NrIHdpdGggaWQgXCIuL3NvbWUvZmlsZS5odG1sXCJcblx0XHRcdFx0XHRcdGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2YWx1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKHZhbHVlLmNoYXJBdCgwKSA9PT0gXCIjXCIpIHtcblx0XHRcdFx0XHRlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmFsdWUuc2xpY2UoMSkpO1xuXHRcdFx0XHR9IGlmICghZWxlbSAmJiAkLmZuICYmICEkc3ViLnJUbXBsLnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGVsZW0gPSAkKHZhbHVlLCBkb2N1bWVudClbMF07IC8vIGlmIGpRdWVyeSBpcyBsb2FkZWQsIHRlc3QgZm9yIHNlbGVjdG9yIHJldHVybmluZyBlbGVtZW50cywgYW5kIGdldCBmaXJzdCBlbGVtZW50XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHRcdFx0fS8vIEVORCBCUk9XU0VSLVNQRUNJRklDIENPREVcblx0XHRcdH0gLy9CUk9XU0VSLVNQRUNJRklDIENPREVcblx0XHRcdGlmIChlbGVtKSB7XG5cdFx0XHRcdGlmIChlbGVtLnRhZ05hbWUgIT09IFwiU0NSSVBUXCIpIHtcblx0XHRcdFx0XHRlcnJvcih2YWx1ZSArIFwiOiBVc2Ugc2NyaXB0IGJsb2NrLCBub3QgXCIgKyBlbGVtLnRhZ05hbWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRcdFx0Ly8gV2Ugd2lsbCBjb21waWxlIGEgbmV3IHRlbXBsYXRlIHVzaW5nIHRoZSBtYXJrdXAgaW4gdGhlIHNjcmlwdCBlbGVtZW50XG5cdFx0XHRcdFx0dmFsdWUgPSBlbGVtLmlubmVySFRNTDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBXZSB3aWxsIGNhY2hlIGEgc2luZ2xlIGNvcHkgb2YgdGhlIGNvbXBpbGVkIHRlbXBsYXRlLCBhbmQgYXNzb2NpYXRlIGl0IHdpdGggdGhlIG5hbWVcblx0XHRcdFx0XHQvLyAocmVuYW1pbmcgZnJvbSBhIHByZXZpb3VzIG5hbWUgaWYgdGhlcmUgd2FzIG9uZSkuXG5cdFx0XHRcdFx0Y3VycmVudE5hbWUgPSBlbGVtLmdldEF0dHJpYnV0ZSh0bXBsQXR0cik7XG5cdFx0XHRcdFx0aWYgKGN1cnJlbnROYW1lKSB7XG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudE5hbWUgIT09IGpzdlRtcGwpIHtcblx0XHRcdFx0XHRcdFx0dmFsdWUgPSAkdGVtcGxhdGVzW2N1cnJlbnROYW1lXTtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlICR0ZW1wbGF0ZXNbY3VycmVudE5hbWVdO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkLmZuKSB7XG5cdFx0XHRcdFx0XHRcdHZhbHVlID0gJC5kYXRhKGVsZW0pW2pzdlRtcGxdOyAvLyBHZXQgY2FjaGVkIGNvbXBpbGVkIHRlbXBsYXRlXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICghY3VycmVudE5hbWUgfHwgIXZhbHVlKSB7IC8vIE5vdCB5ZXQgY29tcGlsZWQsIG9yIGNhY2hlZCB2ZXJzaW9uIGxvc3Rcblx0XHRcdFx0XHRcdG5hbWUgPSBuYW1lIHx8ICgkLmZuID8ganN2VG1wbCA6IHZhbHVlKTtcblx0XHRcdFx0XHRcdHZhbHVlID0gY29tcGlsZVRtcGwobmFtZSwgZWxlbS5pbm5lckhUTUwsIHBhcmVudFRtcGwsIG9wdGlvbnMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YWx1ZS50bXBsTmFtZSA9IG5hbWUgPSBuYW1lIHx8IGN1cnJlbnROYW1lO1xuXHRcdFx0XHRcdGlmIChuYW1lICE9PSBqc3ZUbXBsKSB7XG5cdFx0XHRcdFx0XHQkdGVtcGxhdGVzW25hbWVdID0gdmFsdWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKHRtcGxBdHRyLCBuYW1lKTtcblx0XHRcdFx0XHRpZiAoJC5mbikge1xuXHRcdFx0XHRcdFx0JC5kYXRhKGVsZW0sIGpzdlRtcGwsIHZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gLy8gRU5EIEJST1dTRVItU1BFQ0lGSUMgQ09ERVxuXHRcdFx0ZWxlbSA9IHVuZGVmaW5lZDtcblx0XHR9IGVsc2UgaWYgKCF2YWx1ZS5mbikge1xuXHRcdFx0dmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0XHQvLyBJZiB2YWx1ZSBpcyBub3QgYSBzdHJpbmcuIEhUTUwgZWxlbWVudCwgb3IgY29tcGlsZWQgdGVtcGxhdGUsIHJldHVybiB1bmRlZmluZWRcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cblx0dmFyIGVsZW0sIGNvbXBpbGVkVG1wbCxcblx0XHR0bXBsT3JNYXJrdXAgPSB0bXBsID0gdG1wbCB8fCBcIlwiO1xuXHQkc3ViLl9odG1sID0gJGNvbnZlcnRlcnMuaHRtbDtcblxuXHQvLz09PT0gQ29tcGlsZSB0aGUgdGVtcGxhdGUgPT09PVxuXHRpZiAob3B0aW9ucyA9PT0gMCkge1xuXHRcdG9wdGlvbnMgPSB1bmRlZmluZWQ7XG5cdFx0dG1wbE9yTWFya3VwID0gbG9va3VwVGVtcGxhdGUodG1wbE9yTWFya3VwKTsgLy8gVG9wLWxldmVsIGNvbXBpbGUgc28gZG8gYSB0ZW1wbGF0ZSBsb29rdXBcblx0fVxuXG5cdC8vIElmIG9wdGlvbnMsIHRoZW4gdGhpcyB3YXMgYWxyZWFkeSBjb21waWxlZCBmcm9tIGEgKHNjcmlwdCkgZWxlbWVudCB0ZW1wbGF0ZSBkZWNsYXJhdGlvbi5cblx0Ly8gSWYgbm90LCB0aGVuIGlmIHRtcGwgaXMgYSB0ZW1wbGF0ZSBvYmplY3QsIHVzZSBpdCBmb3Igb3B0aW9uc1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCAodG1wbC5tYXJrdXBcblx0XHQ/IHRtcGwuYm5kc1xuXHRcdFx0PyAkZXh0ZW5kKHt9LCB0bXBsKVxuXHRcdFx0OiB0bXBsXG5cdFx0OiB7fVxuXHQpO1xuXG5cdG9wdGlvbnMudG1wbE5hbWUgPSBvcHRpb25zLnRtcGxOYW1lIHx8IG5hbWUgfHwgXCJ1bm5hbWVkXCI7XG5cdGlmIChwYXJlbnRUbXBsKSB7XG5cdFx0b3B0aW9ucy5fcGFyZW50VG1wbCA9IHBhcmVudFRtcGw7XG5cdH1cblx0Ly8gSWYgdG1wbCBpcyBub3QgYSBtYXJrdXAgc3RyaW5nIG9yIGEgc2VsZWN0b3Igc3RyaW5nLCB0aGVuIGl0IG11c3QgYmUgYSB0ZW1wbGF0ZSBvYmplY3Rcblx0Ly8gSW4gdGhhdCBjYXNlLCBnZXQgaXQgZnJvbSB0aGUgbWFya3VwIHByb3BlcnR5IG9mIHRoZSBvYmplY3Rcblx0aWYgKCF0bXBsT3JNYXJrdXAgJiYgdG1wbC5tYXJrdXAgJiYgKHRtcGxPck1hcmt1cCA9IGxvb2t1cFRlbXBsYXRlKHRtcGwubWFya3VwKSkgJiYgdG1wbE9yTWFya3VwLmZuKSB7XG5cdFx0Ly8gSWYgdGhlIHN0cmluZyByZWZlcmVuY2VzIGEgY29tcGlsZWQgdGVtcGxhdGUgb2JqZWN0LCBuZWVkIHRvIHJlY29tcGlsZSB0byBtZXJnZSBhbnkgbW9kaWZpZWQgb3B0aW9uc1xuXHRcdHRtcGxPck1hcmt1cCA9IHRtcGxPck1hcmt1cC5tYXJrdXA7XG5cdH1cblx0aWYgKHRtcGxPck1hcmt1cCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKHRtcGxPck1hcmt1cC5yZW5kZXIgfHwgdG1wbC5yZW5kZXIpIHtcblx0XHRcdC8vIHRtcGwgaXMgYWxyZWFkeSBjb21waWxlZCwgc28gdXNlIGl0XG5cdFx0XHRpZiAodG1wbE9yTWFya3VwLnRtcGxzKSB7XG5cdFx0XHRcdGNvbXBpbGVkVG1wbCA9IHRtcGxPck1hcmt1cDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gdG1wbE9yTWFya3VwIGlzIGEgbWFya3VwIHN0cmluZywgbm90IGEgY29tcGlsZWQgdGVtcGxhdGVcblx0XHRcdC8vIENyZWF0ZSB0ZW1wbGF0ZSBvYmplY3Rcblx0XHRcdHRtcGwgPSB0bXBsT2JqZWN0KHRtcGxPck1hcmt1cCwgb3B0aW9ucyk7XG5cdFx0XHQvLyBDb21waWxlIHRvIEFTVCBhbmQgdGhlbiB0byBjb21waWxlZCBmdW5jdGlvblxuXHRcdFx0dG1wbEZuKHRtcGxPck1hcmt1cC5yZXBsYWNlKHJFc2NhcGVRdW90ZXMsIFwiXFxcXCQmXCIpLCB0bXBsKTtcblx0XHR9XG5cdFx0aWYgKCFjb21waWxlZFRtcGwpIHtcblx0XHRcdGNvbXBpbGVkVG1wbCA9ICRleHRlbmQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBjb21waWxlZFRtcGwucmVuZGVyLmFwcGx5KGNvbXBpbGVkVG1wbCwgYXJndW1lbnRzKTtcblx0XHRcdH0sIHRtcGwpO1xuXG5cdFx0XHRjb21waWxlQ2hpbGRSZXNvdXJjZXMoY29tcGlsZWRUbXBsKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbXBpbGVkVG1wbDtcblx0fVxufVxuXG4vLz09PT0gL2VuZCBvZiBmdW5jdGlvbiBjb21waWxlVG1wbCA9PT09XG5cbi8vPT09PT09PT09PT09PT09PT1cbi8vIGNvbXBpbGVWaWV3TW9kZWxcbi8vPT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFZhbChkZWZhdWx0VmFsLCBkYXRhKSB7XG5cdHJldHVybiAkaXNGdW5jdGlvbihkZWZhdWx0VmFsKVxuXHRcdD8gZGVmYXVsdFZhbC5jYWxsKGRhdGEpXG5cdFx0OiBkZWZhdWx0VmFsO1xufVxuXG5mdW5jdGlvbiBhZGRQYXJlbnRSZWYob2IsIHJlZiwgcGFyZW50KSB7XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYiwgcmVmLCB7XG5cdFx0dmFsdWU6IHBhcmVudCxcblx0XHRjb25maWd1cmFibGU6IHRydWVcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVWaWV3TW9kZWwobmFtZSwgdHlwZSkge1xuXHR2YXIgaSwgY29uc3RydWN0b3IsIHBhcmVudCxcblx0XHR2aWV3TW9kZWxzID0gdGhpcyxcblx0XHRnZXR0ZXJzID0gdHlwZS5nZXR0ZXJzLFxuXHRcdGV4dGVuZCA9IHR5cGUuZXh0ZW5kLFxuXHRcdGlkID0gdHlwZS5pZCxcblx0XHRwcm90byA9ICQuZXh0ZW5kKHtcblx0XHRcdF9pczogbmFtZSB8fCBcInVubmFtZWRcIixcblx0XHRcdHVubWFwOiB1bm1hcCxcblx0XHRcdG1lcmdlOiBtZXJnZVxuXHRcdH0sIGV4dGVuZCksXG5cdFx0YXJncyA9IFwiXCIsXG5cdFx0Y25zdHIgPSBcIlwiLFxuXHRcdGdldHRlckNvdW50ID0gZ2V0dGVycyA/IGdldHRlcnMubGVuZ3RoIDogMCxcblx0XHQkb2JzZXJ2YWJsZSA9ICQub2JzZXJ2YWJsZSxcblx0XHRnZXR0ZXJOYW1lcyA9IHt9O1xuXG5cdGZ1bmN0aW9uIEpzdlZtKGFyZ3MpIHtcblx0XHRjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIHZtKCkge1xuXHRcdHJldHVybiBuZXcgSnN2Vm0oYXJndW1lbnRzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGl0ZXJhdGUoZGF0YSwgYWN0aW9uKSB7XG5cdFx0dmFyIGdldHRlclR5cGUsIGRlZmF1bHRWYWwsIHByb3AsIG9iLCBwYXJlbnRSZWYsXG5cdFx0XHRqID0gMDtcblx0XHRmb3IgKDsgaiA8IGdldHRlckNvdW50OyBqKyspIHtcblx0XHRcdHByb3AgPSBnZXR0ZXJzW2pdO1xuXHRcdFx0Z2V0dGVyVHlwZSA9IHVuZGVmaW5lZDtcblx0XHRcdGlmICh0eXBlb2YgcHJvcCAhPT0gU1RSSU5HKSB7XG5cdFx0XHRcdGdldHRlclR5cGUgPSBwcm9wO1xuXHRcdFx0XHRwcm9wID0gZ2V0dGVyVHlwZS5nZXR0ZXI7XG5cdFx0XHRcdHBhcmVudFJlZiA9IGdldHRlclR5cGUucGFyZW50UmVmO1xuXHRcdFx0fVxuXHRcdFx0aWYgKChvYiA9IGRhdGFbcHJvcF0pID09PSB1bmRlZmluZWQgJiYgZ2V0dGVyVHlwZSAmJiAoZGVmYXVsdFZhbCA9IGdldHRlclR5cGUuZGVmYXVsdFZhbCkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRvYiA9IGdldERlZmF1bHRWYWwoZGVmYXVsdFZhbCwgZGF0YSk7XG5cdFx0XHR9XG5cdFx0XHRhY3Rpb24ob2IsIGdldHRlclR5cGUgJiYgdmlld01vZGVsc1tnZXR0ZXJUeXBlLnR5cGVdLCBwcm9wLCBwYXJlbnRSZWYpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIG1hcChkYXRhKSB7XG5cdFx0ZGF0YSA9IHR5cGVvZiBkYXRhID09PSBTVFJJTkdcblx0XHRcdD8gSlNPTi5wYXJzZShkYXRhKSAvLyBBY2NlcHQgSlNPTiBzdHJpbmdcblx0XHRcdDogZGF0YTsgICAgICAgICAgICAvLyBvciBvYmplY3QvYXJyYXlcblx0XHR2YXIgbCwgcHJvcCwgY2hpbGRPYiwgcGFyZW50UmVmLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRvYiA9IGRhdGEsXG5cdFx0XHRhcnIgPSBbXTtcblxuXHRcdGlmICgkaXNBcnJheShkYXRhKSkge1xuXHRcdFx0ZGF0YSA9IGRhdGEgfHwgW107XG5cdFx0XHRsID0gZGF0YS5sZW5ndGg7XG5cdFx0XHRmb3IgKDsgajxsOyBqKyspIHtcblx0XHRcdFx0YXJyLnB1c2godGhpcy5tYXAoZGF0YVtqXSkpO1xuXHRcdFx0fVxuXHRcdFx0YXJyLl9pcyA9IG5hbWU7XG5cdFx0XHRhcnIudW5tYXAgPSB1bm1hcDtcblx0XHRcdGFyci5tZXJnZSA9IG1lcmdlO1xuXHRcdFx0cmV0dXJuIGFycjtcblx0XHR9XG5cblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0aXRlcmF0ZShkYXRhLCBmdW5jdGlvbihvYiwgdmlld01vZGVsKSB7XG5cdFx0XHRcdGlmICh2aWV3TW9kZWwpIHsgLy8gSXRlcmF0ZSB0byBidWlsZCBnZXR0ZXJzIGFyZyBhcnJheSAodmFsdWUsIG9yIG1hcHBlZCB2YWx1ZSlcblx0XHRcdFx0XHRvYiA9IHZpZXdNb2RlbC5tYXAob2IpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBvYiA9PT0gU1RSSU5HICYmIChvYlswXSA9PT0gXCJ7XCIgJiYgb2Jbb2IubGVuZ3RoLTFdID09PSBcIn1cIiB8fCBvYlswXSA9PT0gXCJbXCIgJiYgb2Jbb2IubGVuZ3RoLTFdID09PSBcIl1cIikpe1xuXHRcdFx0XHRcdC8vIElmIGl0IGlzIGEgc3RyaW5nIHdpdGggdGhlIHN0YXJ0L2VuZCBjaGFyOiB7L30sIG9yIFsvXSwgdGhlbiBhc3N1bWUgaXQgaXMgYSBKU09OIGV4cHJlc3Npb25cblx0XHRcdFx0XHRvYiA9IEpTT04ucGFyc2Uob2IpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGFyci5wdXNoKG9iKTtcblx0XHRcdH0pO1xuXHRcdFx0b2IgPSB0aGlzLmFwcGx5KHRoaXMsIGFycik7IC8vIEluc3RhbnRpYXRlIHRoaXMgVmlldyBNb2RlbCwgcGFzc2luZyBnZXR0ZXJzIGFyZ3MgYXJyYXkgdG8gY29uc3RydWN0b3Jcblx0XHRcdGogPSBnZXR0ZXJDb3VudDtcblx0XHRcdHdoaWxlIChqLS0pIHtcblx0XHRcdFx0Y2hpbGRPYiA9IGFycltqXTtcblx0XHRcdFx0cGFyZW50UmVmID0gZ2V0dGVyc1tqXS5wYXJlbnRSZWY7XG5cdFx0XHRcdGlmIChwYXJlbnRSZWYgJiYgY2hpbGRPYiAmJiBjaGlsZE9iLnVubWFwKSB7XG5cdFx0XHRcdFx0aWYgKCRpc0FycmF5KGNoaWxkT2IpKSB7XG5cdFx0XHRcdFx0XHRsID0gY2hpbGRPYi5sZW5ndGg7XG5cdFx0XHRcdFx0XHR3aGlsZSAobC0tKSB7XG5cdFx0XHRcdFx0XHRcdGFkZFBhcmVudFJlZihjaGlsZE9iW2xdLCBwYXJlbnRSZWYsIG9iKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YWRkUGFyZW50UmVmKGNoaWxkT2IsIHBhcmVudFJlZiwgb2IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Zm9yIChwcm9wIGluIGRhdGEpIHsgLy8gQ29weSBvdmVyIGFueSBvdGhlciBwcm9wZXJ0aWVzLiB0aGF0IGFyZSBub3QgZ2V0L3NldCBwcm9wZXJ0aWVzXG5cdFx0XHRcdGlmIChwcm9wICE9PSAkZXhwYW5kbyAmJiAhZ2V0dGVyTmFtZXNbcHJvcF0pIHtcblx0XHRcdFx0XHRvYltwcm9wXSA9IGRhdGFbcHJvcF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG9iO1xuXHR9XG5cblx0ZnVuY3Rpb24gbWVyZ2UoZGF0YSwgcGFyZW50LCBwYXJlbnRSZWYpIHtcblx0XHRkYXRhID0gdHlwZW9mIGRhdGEgPT09IFNUUklOR1xuXHRcdFx0PyBKU09OLnBhcnNlKGRhdGEpIC8vIEFjY2VwdCBKU09OIHN0cmluZ1xuXHRcdFx0OiBkYXRhOyAgICAgICAgICAgIC8vIG9yIG9iamVjdC9hcnJheVxuXG5cdFx0dmFyIGosIGwsIG0sIHByb3AsIG1vZCwgZm91bmQsIGFzc2lnbmVkLCBvYiwgbmV3TW9kQXJyLCBjaGlsZE9iLFxuXHRcdFx0ayA9IDAsXG5cdFx0XHRtb2RlbCA9IHRoaXM7XG5cblx0XHRpZiAoJGlzQXJyYXkobW9kZWwpKSB7XG5cdFx0XHRhc3NpZ25lZCA9IHt9O1xuXHRcdFx0bmV3TW9kQXJyID0gW107XG5cdFx0XHRsID0gZGF0YS5sZW5ndGg7XG5cdFx0XHRtID0gbW9kZWwubGVuZ3RoO1xuXHRcdFx0Zm9yICg7IGs8bDsgaysrKSB7XG5cdFx0XHRcdG9iID0gZGF0YVtrXTtcblx0XHRcdFx0Zm91bmQgPSBmYWxzZTtcblx0XHRcdFx0Zm9yIChqPTA7IGo8bSAmJiAhZm91bmQ7IGorKykge1xuXHRcdFx0XHRcdGlmIChhc3NpZ25lZFtqXSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG1vZCA9IG1vZGVsW2pdO1xuXG5cdFx0XHRcdFx0aWYgKGlkKSB7XG5cdFx0XHRcdFx0XHRhc3NpZ25lZFtqXSA9IGZvdW5kID0gdHlwZW9mIGlkID09PSBTVFJJTkdcblx0XHRcdFx0XHRcdD8gKG9iW2lkXSAmJiAoZ2V0dGVyTmFtZXNbaWRdID8gbW9kW2lkXSgpIDogbW9kW2lkXSkgPT09IG9iW2lkXSlcblx0XHRcdFx0XHRcdDogaWQobW9kLCBvYik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChmb3VuZCkge1xuXHRcdFx0XHRcdG1vZC5tZXJnZShvYik7XG5cdFx0XHRcdFx0bmV3TW9kQXJyLnB1c2gobW9kKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRuZXdNb2RBcnIucHVzaChjaGlsZE9iID0gdm0ubWFwKG9iKSk7XG5cdFx0XHRcdFx0aWYgKHBhcmVudFJlZikge1xuXHRcdFx0XHRcdFx0YWRkUGFyZW50UmVmKGNoaWxkT2IsIHBhcmVudFJlZiwgcGFyZW50KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICgkb2JzZXJ2YWJsZSkge1xuXHRcdFx0XHQkb2JzZXJ2YWJsZShtb2RlbCkucmVmcmVzaChuZXdNb2RBcnIsIHRydWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bW9kZWwuc3BsaWNlLmFwcGx5KG1vZGVsLCBbMCwgbW9kZWwubGVuZ3RoXS5jb25jYXQobmV3TW9kQXJyKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGl0ZXJhdGUoZGF0YSwgZnVuY3Rpb24ob2IsIHZpZXdNb2RlbCwgZ2V0dGVyLCBwYXJlbnRSZWYpIHtcblx0XHRcdGlmICh2aWV3TW9kZWwpIHtcblx0XHRcdFx0bW9kZWxbZ2V0dGVyXSgpLm1lcmdlKG9iLCBtb2RlbCwgcGFyZW50UmVmKTsgLy8gVXBkYXRlIHR5cGVkIHByb3BlcnR5XG5cdFx0XHR9IGVsc2UgaWYgKG1vZGVsW2dldHRlcl0oKSAhPT0gb2IpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBvYiA9PT0gU1RSSU5HICYmIChvYlswXSA9PT0gXCJ7XCIgJiYgb2Jbb2IubGVuZ3RoLTFdID09PSBcIn1cIiB8fCBvYlswXSA9PT0gXCJbXCIgJiYgb2Jbb2IubGVuZ3RoLTFdID09PSBcIl1cIikpe1xuXHRcdFx0XHRcdC8vIElmIGl0IGlzIGEgc3RyaW5nIHdpdGggdGhlIHN0YXJ0L2VuZCBjaGFyOiB7L30sIG9yIFsvXSwgdGhlbiBhc3N1bWUgaXQgaXMgYSBKU09OIGV4cHJlc3Npb25cblx0XHRcdFx0XHRvYiA9IEpTT04ucGFyc2Uob2IpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG1vZGVsW2dldHRlcl0ob2IpOyAvLyBVcGRhdGUgbm9uLXR5cGVkIHByb3BlcnR5XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Zm9yIChwcm9wIGluIGRhdGEpIHtcblx0XHRcdGlmIChwcm9wICE9PSAkZXhwYW5kbyAmJiAhZ2V0dGVyTmFtZXNbcHJvcF0pIHtcblx0XHRcdFx0bW9kZWxbcHJvcF0gPSBkYXRhW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHVubWFwKCkge1xuXHRcdHZhciBvYiwgcHJvcCwgZ2V0dGVyVHlwZSwgYXJyLCB2YWx1ZSxcblx0XHRcdGsgPSAwLFxuXHRcdFx0bW9kZWwgPSB0aGlzO1xuXG5cdFx0ZnVuY3Rpb24gdW5tYXBBcnJheShtb2RlbEFycikge1xuXHRcdFx0dmFyIGFyciA9IFtdLFxuXHRcdFx0XHRpID0gMCxcblx0XHRcdFx0bCA9IG1vZGVsQXJyLmxlbmd0aDtcblx0XHRcdGZvciAoOyBpPGw7IGkrKykge1xuXHRcdFx0XHRhcnIucHVzaChtb2RlbEFycltpXS51bm1hcCgpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBhcnI7XG5cdFx0fVxuXG5cdFx0aWYgKCRpc0FycmF5KG1vZGVsKSkge1xuXHRcdFx0cmV0dXJuIHVubWFwQXJyYXkobW9kZWwpO1xuXHRcdH1cblx0XHRvYiA9IHt9O1xuXHRcdGZvciAoOyBrIDwgZ2V0dGVyQ291bnQ7IGsrKykge1xuXHRcdFx0cHJvcCA9IGdldHRlcnNba107XG5cdFx0XHRnZXR0ZXJUeXBlID0gdW5kZWZpbmVkO1xuXHRcdFx0aWYgKHR5cGVvZiBwcm9wICE9PSBTVFJJTkcpIHtcblx0XHRcdFx0Z2V0dGVyVHlwZSA9IHByb3A7XG5cdFx0XHRcdHByb3AgPSBnZXR0ZXJUeXBlLmdldHRlcjtcblx0XHRcdH1cblx0XHRcdHZhbHVlID0gbW9kZWxbcHJvcF0oKTtcblx0XHRcdG9iW3Byb3BdID0gZ2V0dGVyVHlwZSAmJiB2YWx1ZSAmJiB2aWV3TW9kZWxzW2dldHRlclR5cGUudHlwZV1cblx0XHRcdFx0PyAkaXNBcnJheSh2YWx1ZSlcblx0XHRcdFx0XHQ/IHVubWFwQXJyYXkodmFsdWUpXG5cdFx0XHRcdFx0OiB2YWx1ZS51bm1hcCgpXG5cdFx0XHRcdDogdmFsdWU7XG5cdFx0fVxuXHRcdGZvciAocHJvcCBpbiBtb2RlbCkge1xuXHRcdFx0aWYgKG1vZGVsLmhhc093blByb3BlcnR5KHByb3ApICYmIChwcm9wLmNoYXJBdCgwKSAhPT0gXCJfXCIgfHwgIWdldHRlck5hbWVzW3Byb3Auc2xpY2UoMSldKSAmJiBwcm9wICE9PSAkZXhwYW5kbyAmJiAhJGlzRnVuY3Rpb24obW9kZWxbcHJvcF0pKSB7XG5cdFx0XHRcdG9iW3Byb3BdID0gbW9kZWxbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvYjtcblx0fVxuXG5cdEpzdlZtLnByb3RvdHlwZSA9IHByb3RvO1xuXG5cdGZvciAoaT0wOyBpIDwgZ2V0dGVyQ291bnQ7IGkrKykge1xuXHRcdChmdW5jdGlvbihnZXR0ZXIpIHtcblx0XHRcdGdldHRlciA9IGdldHRlci5nZXR0ZXIgfHwgZ2V0dGVyO1xuXHRcdFx0Z2V0dGVyTmFtZXNbZ2V0dGVyXSA9IGkrMTtcblx0XHRcdHZhciBwcml2RmllbGQgPSBcIl9cIiArIGdldHRlcjtcblxuXHRcdFx0YXJncyArPSAoYXJncyA/IFwiLFwiIDogXCJcIikgKyBnZXR0ZXI7XG5cdFx0XHRjbnN0ciArPSBcInRoaXMuXCIgKyBwcml2RmllbGQgKyBcIiA9IFwiICsgZ2V0dGVyICsgXCI7XFxuXCI7XG5cdFx0XHRwcm90b1tnZXR0ZXJdID0gcHJvdG9bZ2V0dGVyXSB8fCBmdW5jdGlvbih2YWwpIHtcblx0XHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXNbcHJpdkZpZWxkXTsgLy8gSWYgdGhlcmUgaXMgbm8gYXJndW1lbnQsIHVzZSBhcyBhIGdldHRlclxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgkb2JzZXJ2YWJsZSkge1xuXHRcdFx0XHRcdCRvYnNlcnZhYmxlKHRoaXMpLnNldFByb3BlcnR5KGdldHRlciwgdmFsKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzW3ByaXZGaWVsZF0gPSB2YWw7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGlmICgkb2JzZXJ2YWJsZSkge1xuXHRcdFx0XHRwcm90b1tnZXR0ZXJdLnNldCA9IHByb3RvW2dldHRlcl0uc2V0IHx8IGZ1bmN0aW9uKHZhbCkge1xuXHRcdFx0XHRcdHRoaXNbcHJpdkZpZWxkXSA9IHZhbDsgLy8gU2V0dGVyIGNhbGxlZCBieSBvYnNlcnZhYmxlIHByb3BlcnR5IGNoYW5nZVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH0pKGdldHRlcnNbaV0pO1xuXHR9XG5cblx0Ly8gQ29uc3RydWN0b3IgZm9yIG5ldyB2aWV3TW9kZWwgaW5zdGFuY2UuXG5cdGNuc3RyID0gbmV3IEZ1bmN0aW9uKGFyZ3MsIGNuc3RyKTtcblxuXHRjb25zdHJ1Y3RvciA9IGZ1bmN0aW9uKCkge1xuXHRcdGNuc3RyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0Ly8gUGFzcyBhZGRpdGlvbmFsIHBhcmVudFJlZiBzdHIgYW5kIHBhcmVudCBvYmogdG8gaGF2ZSBhIHBhcmVudFJlZiBwb2ludGVyIG9uIGluc3RhbmNlXG5cdFx0aWYgKHBhcmVudCA9IGFyZ3VtZW50c1tnZXR0ZXJDb3VudCArIDFdKSB7XG5cdFx0XHRhZGRQYXJlbnRSZWYodGhpcywgYXJndW1lbnRzW2dldHRlckNvdW50XSwgcGFyZW50KTtcblx0XHR9XG5cdH07XG5cblx0Y29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG87XG5cdHByb3RvLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG5cblx0dm0ubWFwID0gbWFwO1xuXHR2bS5nZXR0ZXJzID0gZ2V0dGVycztcblx0dm0uZXh0ZW5kID0gZXh0ZW5kO1xuXHR2bS5pZCA9IGlkO1xuXHRyZXR1cm4gdm07XG59XG5cbmZ1bmN0aW9uIHRtcGxPYmplY3QobWFya3VwLCBvcHRpb25zKSB7XG5cdC8vIFRlbXBsYXRlIG9iamVjdCBjb25zdHJ1Y3RvclxuXHR2YXIgaHRtbFRhZyxcblx0XHR3cmFwTWFwID0gJHN1YlNldHRpbmdzQWR2YW5jZWQuX3dtIHx8IHt9LCAvLyBPbmx5IHVzZWQgaW4gSnNWaWV3cy4gT3RoZXJ3aXNlIGVtcHR5OiB7fVxuXHRcdHRtcGwgPSB7XG5cdFx0XHR0bXBsczogW10sXG5cdFx0XHRsaW5rczoge30sIC8vIENvbXBpbGVkIGZ1bmN0aW9ucyBmb3IgbGluayBleHByZXNzaW9uc1xuXHRcdFx0Ym5kczogW10sXG5cdFx0XHRfaXM6IFwidGVtcGxhdGVcIixcblx0XHRcdHJlbmRlcjogcmVuZGVyQ29udGVudFxuXHRcdH07XG5cblx0aWYgKG9wdGlvbnMpIHtcblx0XHR0bXBsID0gJGV4dGVuZCh0bXBsLCBvcHRpb25zKTtcblx0fVxuXG5cdHRtcGwubWFya3VwID0gbWFya3VwO1xuXHRpZiAoIXRtcGwuaHRtbFRhZykge1xuXHRcdC8vIFNldCB0bXBsLnRhZyB0byB0aGUgdG9wLWxldmVsIEhUTUwgdGFnIHVzZWQgaW4gdGhlIHRlbXBsYXRlLCBpZiBhbnkuLi5cblx0XHRodG1sVGFnID0gckZpcnN0RWxlbS5leGVjKG1hcmt1cCk7XG5cdFx0dG1wbC5odG1sVGFnID0gaHRtbFRhZyA/IGh0bWxUYWdbMV0udG9Mb3dlckNhc2UoKSA6IFwiXCI7XG5cdH1cblx0aHRtbFRhZyA9IHdyYXBNYXBbdG1wbC5odG1sVGFnXTtcblx0aWYgKGh0bWxUYWcgJiYgaHRtbFRhZyAhPT0gd3JhcE1hcC5kaXYpIHtcblx0XHQvLyBXaGVuIHVzaW5nIEpzVmlld3MsIHdlIHRyaW0gdGVtcGxhdGVzIHdoaWNoIGFyZSBpbnNlcnRlZCBpbnRvIEhUTUwgY29udGV4dHMgd2hlcmUgdGV4dCBub2RlcyBhcmUgbm90IHJlbmRlcmVkIChpLmUuIG5vdCAnUGhyYXNpbmcgQ29udGVudCcpLlxuXHRcdC8vIEN1cnJlbnRseSBub3QgdHJpbW1lZCBmb3IgPGxpPiB0YWcuIChOb3Qgd29ydGggYWRkaW5nIHBlcmYgY29zdClcblx0XHR0bXBsLm1hcmt1cCA9IHRtcGwubWFya3VwLnRyaW0oKTtcblx0fVxuXG5cdHJldHVybiB0bXBsO1xufVxuXG4vLz09PT09PT09PT09PT09XG4vLyByZWdpc3RlclN0b3JlXG4vLz09PT09PT09PT09PT09XG5cbi8qKlxuKiBJbnRlcm5hbC4gUmVnaXN0ZXIgYSBzdG9yZSB0eXBlICh1c2VkIGZvciB0ZW1wbGF0ZSwgdGFncywgaGVscGVycywgY29udmVydGVycylcbiovXG5mdW5jdGlvbiByZWdpc3RlclN0b3JlKHN0b3JlTmFtZSwgc3RvcmVTZXR0aW5ncykge1xuXG4vKipcbiogR2VuZXJpYyBzdG9yZSgpIGZ1bmN0aW9uIHRvIHJlZ2lzdGVyIGl0ZW0sIG5hbWVkIGl0ZW0sIG9yIGhhc2ggb2YgaXRlbXNcbiogQWxzbyB1c2VkIGFzIGhhc2ggdG8gc3RvcmUgdGhlIHJlZ2lzdGVyZWQgaXRlbXNcbiogVXNlZCBhcyBpbXBsZW1lbnRhdGlvbiBvZiAkLnRlbXBsYXRlcygpLCAkLnZpZXdzLnRlbXBsYXRlcygpLCAkLnZpZXdzLnRhZ3MoKSwgJC52aWV3cy5oZWxwZXJzKCkgYW5kICQudmlld3MuY29udmVydGVycygpXG4qXG4qIEBwYXJhbSB7c3RyaW5nfGhhc2h9IG5hbWUgICAgICAgICBuYW1lIC0gb3Igc2VsZWN0b3IsIGluIGNhc2Ugb2YgJC50ZW1wbGF0ZXMoKS4gT3IgaGFzaCBvZiBpdGVtc1xuKiBAcGFyYW0ge2FueX0gICAgICAgICBbaXRlbV0gICAgICAgKGUuZy4gbWFya3VwIGZvciBuYW1lZCB0ZW1wbGF0ZSlcbiogQHBhcmFtIHt0ZW1wbGF0ZX0gICAgW3BhcmVudFRtcGxdIEZvciBpdGVtIGJlaW5nIHJlZ2lzdGVyZWQgYXMgcHJpdmF0ZSByZXNvdXJjZSBvZiB0ZW1wbGF0ZVxuKiBAcmV0dXJucyB7YW55fCQudmlld3N9IGl0ZW0sIGUuZy4gY29tcGlsZWQgdGVtcGxhdGUgLSBvciAkLnZpZXdzIGluIGNhc2Ugb2YgcmVnaXN0ZXJpbmcgaGFzaCBvZiBpdGVtc1xuKi9cblx0ZnVuY3Rpb24gdGhlU3RvcmUobmFtZSwgaXRlbSwgcGFyZW50VG1wbCkge1xuXHRcdC8vIFRoZSBzdG9yZSBpcyBhbHNvIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGFkZCBpdGVtcyB0byB0aGUgc3RvcmUuIGUuZy4gJC50ZW1wbGF0ZXMsIG9yICQudmlld3MudGFnc1xuXG5cdFx0Ly8gRm9yIHN0b3JlIG9mIG5hbWUgJ3RoaW5nJywgQ2FsbCBhczpcblx0XHQvLyAgICAkLnZpZXdzLnRoaW5ncyhpdGVtc1ssIHBhcmVudFRtcGxdKSxcblx0XHQvLyBvciAkLnZpZXdzLnRoaW5ncyhuYW1lWywgaXRlbSwgcGFyZW50VG1wbF0pXG5cblx0XHR2YXIgY29tcGlsZSwgaXRlbU5hbWUsIHRoaXNTdG9yZSwgY250LFxuXHRcdFx0b25TdG9yZSA9ICRzdWIub25TdG9yZVtzdG9yZU5hbWVdO1xuXG5cdFx0aWYgKG5hbWUgJiYgdHlwZW9mIG5hbWUgPT09IE9CSkVDVCAmJiAhbmFtZS5ub2RlVHlwZSAmJiAhbmFtZS5tYXJrdXAgJiYgIW5hbWUuZ2V0VGd0ICYmICEoc3RvcmVOYW1lID09PSBcInZpZXdNb2RlbFwiICYmIG5hbWUuZ2V0dGVycyB8fCBuYW1lLmV4dGVuZCkpIHtcblx0XHRcdC8vIENhbGwgdG8gJC52aWV3cy50aGluZ3MoaXRlbXNbLCBwYXJlbnRUbXBsXSksXG5cblx0XHRcdC8vIEFkZGluZyBpdGVtcyB0byB0aGUgc3RvcmVcblx0XHRcdC8vIElmIG5hbWUgaXMgYSBoYXNoLCB0aGVuIGl0ZW0gaXMgcGFyZW50VG1wbC4gSXRlcmF0ZSBvdmVyIGhhc2ggYW5kIGNhbGwgc3RvcmUgZm9yIGtleS5cblx0XHRcdGZvciAoaXRlbU5hbWUgaW4gbmFtZSkge1xuXHRcdFx0XHR0aGVTdG9yZShpdGVtTmFtZSwgbmFtZVtpdGVtTmFtZV0sIGl0ZW0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGl0ZW0gfHwgJHZpZXdzO1xuXHRcdH1cblx0XHQvLyBBZGRpbmcgYSBzaW5nbGUgdW5uYW1lZCBpdGVtIHRvIHRoZSBzdG9yZVxuXHRcdGlmIChuYW1lICYmICB0eXBlb2YgbmFtZSAhPT0gU1RSSU5HKSB7IC8vIG5hbWUgbXVzdCBiZSBhIHN0cmluZ1xuXHRcdFx0cGFyZW50VG1wbCA9IGl0ZW07XG5cdFx0XHRpdGVtID0gbmFtZTtcblx0XHRcdG5hbWUgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdHRoaXNTdG9yZSA9IHBhcmVudFRtcGxcblx0XHRcdD8gc3RvcmVOYW1lID09PSBcInZpZXdNb2RlbFwiXG5cdFx0XHRcdD8gcGFyZW50VG1wbFxuXHRcdFx0XHQ6IChwYXJlbnRUbXBsW3N0b3JlTmFtZXNdID0gcGFyZW50VG1wbFtzdG9yZU5hbWVzXSB8fCB7fSlcblx0XHRcdDogdGhlU3RvcmU7XG5cdFx0Y29tcGlsZSA9IHN0b3JlU2V0dGluZ3MuY29tcGlsZTtcblxuXHRcdGlmIChpdGVtID09PSB1bmRlZmluZWQpIHtcblx0XHRcdGl0ZW0gPSBjb21waWxlID8gbmFtZSA6IHRoaXNTdG9yZVtuYW1lXTtcblx0XHRcdG5hbWUgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmIChpdGVtID09PSBudWxsKSB7XG5cdFx0XHQvLyBJZiBpdGVtIGlzIG51bGwsIGRlbGV0ZSB0aGlzIGVudHJ5XG5cdFx0XHRpZiAobmFtZSkge1xuXHRcdFx0XHRkZWxldGUgdGhpc1N0b3JlW25hbWVdO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoY29tcGlsZSkge1xuXHRcdFx0XHRpdGVtID0gY29tcGlsZS5jYWxsKHRoaXNTdG9yZSwgbmFtZSwgaXRlbSwgcGFyZW50VG1wbCwgMCkgfHwge307XG5cdFx0XHRcdGl0ZW0uX2lzID0gc3RvcmVOYW1lOyAvLyBPbmx5IGRvIHRoaXMgZm9yIGNvbXBpbGVkIG9iamVjdHMgKHRhZ3MsIHRlbXBsYXRlcy4uLilcblx0XHRcdH1cblx0XHRcdGlmIChuYW1lKSB7XG5cdFx0XHRcdHRoaXNTdG9yZVtuYW1lXSA9IGl0ZW07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChvblN0b3JlKSB7XG5cdFx0XHQvLyBlLmcuIEpzVmlld3MgaW50ZWdyYXRpb25cblx0XHRcdG9uU3RvcmUobmFtZSwgaXRlbSwgcGFyZW50VG1wbCwgY29tcGlsZSk7XG5cdFx0fVxuXHRcdHJldHVybiBpdGVtO1xuXHR9XG5cblx0dmFyIHN0b3JlTmFtZXMgPSBzdG9yZU5hbWUgKyBcInNcIjtcblx0JHZpZXdzW3N0b3JlTmFtZXNdID0gdGhlU3RvcmU7XG59XG5cbi8qKlxuKiBBZGQgc2V0dGluZ3Mgc3VjaCBhczpcbiogJC52aWV3cy5zZXR0aW5ncy5hbGxvd0NvZGUodHJ1ZSlcbiogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuKiBAcmV0dXJucyB7U2V0dGluZ3N9XG4qXG4qIGFsbG93Q29kZSA9ICQudmlld3Muc2V0dGluZ3MuYWxsb3dDb2RlKClcbiogQHJldHVybnMge2Jvb2xlYW59XG4qL1xuZnVuY3Rpb24gYWRkU2V0dGluZyhzdCkge1xuXHQkdmlld3NTZXR0aW5nc1tzdF0gPSAkdmlld3NTZXR0aW5nc1tzdF0gfHwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuXHRcdFx0PyAoJHN1YlNldHRpbmdzW3N0XSA9IHZhbHVlLCAkdmlld3NTZXR0aW5ncylcblx0XHRcdDogJHN1YlNldHRpbmdzW3N0XTtcblx0fTtcbn1cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIGRhdGFNYXAgZm9yIHJlbmRlciBvbmx5XG4vLz09PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBkYXRhTWFwKG1hcERlZikge1xuXHRmdW5jdGlvbiBNYXAoc291cmNlLCBvcHRpb25zKSB7XG5cdFx0dGhpcy50Z3QgPSBtYXBEZWYuZ2V0VGd0KHNvdXJjZSwgb3B0aW9ucyk7XG5cdFx0b3B0aW9ucy5tYXAgPSB0aGlzO1xuXHR9XG5cblx0aWYgKCRpc0Z1bmN0aW9uKG1hcERlZikpIHtcblx0XHQvLyBTaW1wbGUgbWFwIGRlY2xhcmVkIGFzIGZ1bmN0aW9uXG5cdFx0bWFwRGVmID0ge1xuXHRcdFx0Z2V0VGd0OiBtYXBEZWZcblx0XHR9O1xuXHR9XG5cblx0aWYgKG1hcERlZi5iYXNlTWFwKSB7XG5cdFx0bWFwRGVmID0gJGV4dGVuZCgkZXh0ZW5kKHt9LCBtYXBEZWYuYmFzZU1hcCksIG1hcERlZik7XG5cdH1cblxuXHRtYXBEZWYubWFwID0gZnVuY3Rpb24oc291cmNlLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIG5ldyBNYXAoc291cmNlLCBvcHRpb25zKTtcblx0fTtcblx0cmV0dXJuIG1hcERlZjtcbn1cblxuLy89PT09PT09PT09PT09PVxuLy8gcmVuZGVyQ29udGVudFxuLy89PT09PT09PT09PT09PVxuXG4vKiogUmVuZGVyIHRoZSB0ZW1wbGF0ZSBhcyBhIHN0cmluZywgdXNpbmcgdGhlIHNwZWNpZmllZCBkYXRhIGFuZCBoZWxwZXJzL2NvbnRleHRcbiogJChcIiN0bXBsXCIpLnJlbmRlcigpLCB0bXBsLnJlbmRlcigpLCB0YWdDdHgucmVuZGVyKCksICQucmVuZGVyLm5hbWVkVG1wbCgpXG4qXG4qIEBwYXJhbSB7YW55fSAgICAgICAgZGF0YVxuKiBAcGFyYW0ge2hhc2h9ICAgICAgIFtjb250ZXh0XSAgICAgICAgICAgaGVscGVycyBvciBjb250ZXh0XG4qIEBwYXJhbSB7Ym9vbGVhbn0gICAgW25vSXRlcmF0aW9uXVxuKiBAcGFyYW0ge1ZpZXd9ICAgICAgIFtwYXJlbnRWaWV3XSAgICAgICAgaW50ZXJuYWxcbiogQHBhcmFtIHtzdHJpbmd9ICAgICBba2V5XSAgICAgICAgICAgICAgIGludGVybmFsXG4qIEBwYXJhbSB7ZnVuY3Rpb259ICAgW29uUmVuZGVyXSAgICAgICAgICBpbnRlcm5hbFxuKiBAcmV0dXJucyB7c3RyaW5nfSAgIHJlbmRlcmVkIHRlbXBsYXRlICAgaW50ZXJuYWxcbiovXG5mdW5jdGlvbiByZW5kZXJDb250ZW50KGRhdGEsIGNvbnRleHQsIG5vSXRlcmF0aW9uLCBwYXJlbnRWaWV3LCBrZXksIG9uUmVuZGVyKSB7XG5cdHZhciBpLCBsLCB0YWcsIHRtcGwsIHRhZ0N0eCwgaXNUb3BSZW5kZXJDYWxsLCBwcmV2RGF0YSwgcHJldkluZGV4LFxuXHRcdHZpZXcgPSBwYXJlbnRWaWV3LFxuXHRcdHJlc3VsdCA9IFwiXCI7XG5cblx0aWYgKGNvbnRleHQgPT09IHRydWUpIHtcblx0XHRub0l0ZXJhdGlvbiA9IGNvbnRleHQ7IC8vIHBhc3NpbmcgYm9vbGVhbiBhcyBzZWNvbmQgcGFyYW0gLSBub0l0ZXJhdGlvblxuXHRcdGNvbnRleHQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGNvbnRleHQgIT09IE9CSkVDVCkge1xuXHRcdGNvbnRleHQgPSB1bmRlZmluZWQ7IC8vIGNvbnRleHQgbXVzdCBiZSBhIGJvb2xlYW4gKG5vSXRlcmF0aW9uKSBvciBhIHBsYWluIG9iamVjdFxuXHR9XG5cblx0aWYgKHRhZyA9IHRoaXMudGFnKSB7XG5cdFx0Ly8gVGhpcyBpcyBhIGNhbGwgZnJvbSByZW5kZXJUYWcgb3IgdGFnQ3R4LnJlbmRlciguLi4pXG5cdFx0dGFnQ3R4ID0gdGhpcztcblx0XHR2aWV3ID0gdmlldyB8fCB0YWdDdHgudmlldztcblx0XHR0bXBsID0gdmlldy5fZ2V0VG1wbCh0YWcudGVtcGxhdGUgfHwgdGFnQ3R4LnRtcGwpO1xuXHRcdGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0ZGF0YSA9IHRhZy5jb250ZW50Q3R4ICYmICRpc0Z1bmN0aW9uKHRhZy5jb250ZW50Q3R4KVxuXHRcdFx0XHQ/IGRhdGEgPSB0YWcuY29udGVudEN0eChkYXRhKVxuXHRcdFx0XHQ6IHZpZXc7IC8vIERlZmF1bHQgZGF0YSBjb250ZXh0IGZvciB3cmFwcGVkIGJsb2NrIGNvbnRlbnQgaXMgdGhlIGZpcnN0IGFyZ3VtZW50XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdC8vIFRoaXMgaXMgYSB0ZW1wbGF0ZS5yZW5kZXIoLi4uKSBjYWxsXG5cdFx0dG1wbCA9IHRoaXM7XG5cdH1cblxuXHRpZiAodG1wbCkge1xuXHRcdGlmICghcGFyZW50VmlldyAmJiBkYXRhICYmIGRhdGEuX2lzID09PSBcInZpZXdcIikge1xuXHRcdFx0dmlldyA9IGRhdGE7IC8vIFdoZW4gcGFzc2luZyBpbiBhIHZpZXcgdG8gcmVuZGVyIG9yIGxpbmsgKGFuZCBub3QgcGFzc2luZyBpbiBhIHBhcmVudCB2aWV3KSB1c2UgdGhlIHBhc3NlZC1pbiB2aWV3IGFzIHBhcmVudFZpZXdcblx0XHR9XG5cblx0XHRpZiAodmlldyAmJiBkYXRhID09PSB2aWV3KSB7XG5cdFx0XHQvLyBJbmhlcml0IHRoZSBkYXRhIGZyb20gdGhlIHBhcmVudCB2aWV3LlxuXHRcdFx0ZGF0YSA9IHZpZXcuZGF0YTtcblx0XHR9XG5cblx0XHRpc1RvcFJlbmRlckNhbGwgPSAhdmlldztcblx0XHRpc1JlbmRlckNhbGwgPSBpc1JlbmRlckNhbGwgfHwgaXNUb3BSZW5kZXJDYWxsO1xuXHRcdGlmIChpc1RvcFJlbmRlckNhbGwpIHtcblx0XHRcdChjb250ZXh0ID0gY29udGV4dCB8fCB7fSkucm9vdCA9IGRhdGE7IC8vIFByb3ZpZGUgfnJvb3QgYXMgc2hvcnRjdXQgdG8gdG9wLWxldmVsIGRhdGEuXG5cdFx0fVxuXHRcdGlmICghaXNSZW5kZXJDYWxsIHx8ICRzdWJTZXR0aW5nc0FkdmFuY2VkLnVzZVZpZXdzIHx8IHRtcGwudXNlVmlld3MgfHwgdmlldyAmJiB2aWV3ICE9PSB0b3BWaWV3KSB7XG5cdFx0XHRyZXN1bHQgPSByZW5kZXJXaXRoVmlld3ModG1wbCwgZGF0YSwgY29udGV4dCwgbm9JdGVyYXRpb24sIHZpZXcsIGtleSwgb25SZW5kZXIsIHRhZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh2aWV3KSB7IC8vIEluIGEgYmxvY2tcblx0XHRcdFx0cHJldkRhdGEgPSB2aWV3LmRhdGE7XG5cdFx0XHRcdHByZXZJbmRleCA9IHZpZXcuaW5kZXg7XG5cdFx0XHRcdHZpZXcuaW5kZXggPSBpbmRleFN0cjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZpZXcgPSB0b3BWaWV3O1xuXHRcdFx0XHRwcmV2RGF0YSA9IHZpZXcuZGF0YTtcblx0XHRcdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRcdFx0dmlldy5jdHggPSBjb250ZXh0O1xuXHRcdFx0fVxuXHRcdFx0aWYgKCRpc0FycmF5KGRhdGEpICYmICFub0l0ZXJhdGlvbikge1xuXHRcdFx0XHQvLyBDcmVhdGUgYSB2aWV3IGZvciB0aGUgYXJyYXksIHdob3NlIGNoaWxkIHZpZXdzIGNvcnJlc3BvbmQgdG8gZWFjaCBkYXRhIGl0ZW0uIChOb3RlOiBpZiBrZXkgYW5kIHBhcmVudFZpZXcgYXJlIHBhc3NlZCBpblxuXHRcdFx0XHQvLyBhbG9uZyB3aXRoIHBhcmVudCB2aWV3LCB0cmVhdCBhcyBpbnNlcnQgLWUuZy4gZnJvbSB2aWV3LmFkZFZpZXdzIC0gc28gcGFyZW50VmlldyBpcyBhbHJlYWR5IHRoZSB2aWV3IGl0ZW0gZm9yIGFycmF5KVxuXHRcdFx0XHRmb3IgKGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0XHR2aWV3LmluZGV4ID0gaTtcblx0XHRcdFx0XHR2aWV3LmRhdGEgPSBkYXRhW2ldO1xuXHRcdFx0XHRcdHJlc3VsdCArPSB0bXBsLmZuKGRhdGFbaV0sIHZpZXcsICRzdWIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2aWV3LmRhdGEgPSBkYXRhO1xuXHRcdFx0XHRyZXN1bHQgKz0gdG1wbC5mbihkYXRhLCB2aWV3LCAkc3ViKTtcblx0XHRcdH1cblx0XHRcdHZpZXcuZGF0YSA9IHByZXZEYXRhO1xuXHRcdFx0dmlldy5pbmRleCA9IHByZXZJbmRleDtcblx0XHR9XG5cdFx0aWYgKGlzVG9wUmVuZGVyQ2FsbCkge1xuXHRcdFx0aXNSZW5kZXJDYWxsID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJXaXRoVmlld3ModG1wbCwgZGF0YSwgY29udGV4dCwgbm9JdGVyYXRpb24sIHZpZXcsIGtleSwgb25SZW5kZXIsIHRhZykge1xuXHQvLyBSZW5kZXIgdGVtcGxhdGUgYWdhaW5zdCBkYXRhIGFzIGEgdHJlZSBvZiBzdWJ2aWV3cyAobmVzdGVkIHJlbmRlcmVkIHRlbXBsYXRlIGluc3RhbmNlcyksIG9yIGFzIGEgc3RyaW5nICh0b3AtbGV2ZWwgdGVtcGxhdGUpLlxuXHQvLyBJZiB0aGUgZGF0YSBpcyB0aGUgcGFyZW50IHZpZXcsIHRyZWF0IGFzIG5vSXRlcmF0aW9uLCByZS1yZW5kZXIgd2l0aCB0aGUgc2FtZSBkYXRhIGNvbnRleHQuXG5cdC8vIHRtcGwgY2FuIGJlIGEgc3RyaW5nIChlLmcuIHJlbmRlcmVkIGJ5IGEgdGFnLnJlbmRlcigpIG1ldGhvZCksIG9yIGEgY29tcGlsZWQgdGVtcGxhdGUuXG5cdHZhciBpLCBsLCBuZXdWaWV3LCBjaGlsZFZpZXcsIGl0ZW1SZXN1bHQsIHN3YXBDb250ZW50LCBjb250ZW50VG1wbCwgb3V0ZXJPblJlbmRlciwgdG1wbE5hbWUsIGl0ZW1WYXIsIG5ld0N0eCwgdGFnQ3R4LCBub0xpbmtpbmcsXG5cdFx0cmVzdWx0ID0gXCJcIjtcblxuXHRpZiAodGFnKSB7XG5cdFx0Ly8gVGhpcyBpcyBhIGNhbGwgZnJvbSByZW5kZXJUYWcgb3IgdGFnQ3R4LnJlbmRlciguLi4pXG5cdFx0dG1wbE5hbWUgPSB0YWcudGFnTmFtZTtcblx0XHR0YWdDdHggPSB0YWcudGFnQ3R4O1xuXHRcdGNvbnRleHQgPSBjb250ZXh0ID8gZXh0ZW5kQ3R4KGNvbnRleHQsIHRhZy5jdHgpIDogdGFnLmN0eDtcblxuXHRcdGlmICh0bXBsID09PSB2aWV3LmNvbnRlbnQpIHsgLy8ge3t4eHggdG1wbD0jY29udGVudH19XG5cdFx0XHRjb250ZW50VG1wbCA9IHRtcGwgIT09IHZpZXcuY3R4Ll93cnAgLy8gV2UgYXJlIHJlbmRlcmluZyB0aGUgI2NvbnRlbnRcblx0XHRcdFx0PyB2aWV3LmN0eC5fd3JwIC8vICNjb250ZW50IHdhcyB0aGUgdGFnQ3R4LnByb3BzLnRtcGwgd3JhcHBlciBvZiB0aGUgYmxvY2sgY29udGVudCAtIHNvIHdpdGhpbiB0aGlzIHZpZXcsICNjb250ZW50IHdpbGwgbm93IGJlIHRoZSB2aWV3LmN0eC5fd3JwIGJsb2NrIGNvbnRlbnRcblx0XHRcdFx0OiB1bmRlZmluZWQ7IC8vICNjb250ZW50IHdhcyB0aGUgdmlldy5jdHguX3dycCBibG9jayBjb250ZW50IC0gc28gd2l0aGluIHRoaXMgdmlldywgdGhlcmUgaXMgbm8gbG9uZ2VyIGFueSAjY29udGVudCB0byB3cmFwLlxuXHRcdH0gZWxzZSBpZiAodG1wbCAhPT0gdGFnQ3R4LmNvbnRlbnQpIHtcblx0XHRcdGlmICh0bXBsID09PSB0YWcudGVtcGxhdGUpIHsgLy8gUmVuZGVyaW5nIHt7dGFnfX0gdGFnLnRlbXBsYXRlLCByZXBsYWNpbmcgYmxvY2sgY29udGVudC5cblx0XHRcdFx0Y29udGVudFRtcGwgPSB0YWdDdHgudG1wbDsgLy8gU2V0ICNjb250ZW50IHRvIGJsb2NrIGNvbnRlbnQgKG9yIHdyYXBwZWQgYmxvY2sgY29udGVudCBpZiB0YWdDdHgucHJvcHMudG1wbCBpcyBzZXQpXG5cdFx0XHRcdGNvbnRleHQuX3dycCA9IHRhZ0N0eC5jb250ZW50OyAvLyBQYXNzIHdyYXBwZWQgYmxvY2sgY29udGVudCB0byBuZXN0ZWQgdmlld3Ncblx0XHRcdH0gZWxzZSB7IC8vIFJlbmRlcmluZyB0YWdDdHgucHJvcHMudG1wbCB3cmFwcGVyXG5cdFx0XHRcdGNvbnRlbnRUbXBsID0gdGFnQ3R4LmNvbnRlbnQgfHwgdmlldy5jb250ZW50OyAvLyBTZXQgI2NvbnRlbnQgdG8gd3JhcHBlZCBibG9jayBjb250ZW50XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRlbnRUbXBsID0gdmlldy5jb250ZW50OyAvLyBOZXN0ZWQgdmlld3MgaW5oZXJpdCBzYW1lIHdyYXBwZWQgI2NvbnRlbnQgcHJvcGVydHlcblx0XHR9XG5cblx0XHRpZiAodGFnQ3R4LnByb3BzLmxpbmsgPT09IGZhbHNlKSB7XG5cdFx0XHQvLyBsaW5rPWZhbHNlIHNldHRpbmcgb24gYmxvY2sgdGFnXG5cdFx0XHQvLyBXZSB3aWxsIG92ZXJyaWRlIGluaGVyaXRlZCB2YWx1ZSBvZiBsaW5rIGJ5IHRoZSBleHBsaWNpdCBzZXR0aW5nIGxpbms9ZmFsc2UgdGFrZW4gZnJvbSBwcm9wc1xuXHRcdFx0Ly8gVGhlIGNoaWxkIHZpZXdzIG9mIGFuIHVubGlua2VkIHZpZXcgYXJlIGFsc28gdW5saW5rZWQuIFNvIHNldHRpbmcgY2hpbGQgYmFjayB0byB0cnVlIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdC5cblx0XHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IHt9O1xuXHRcdFx0Y29udGV4dC5saW5rID0gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0aWYgKHZpZXcpIHtcblx0XHRvblJlbmRlciA9IG9uUmVuZGVyIHx8IHZpZXcuXy5vblJlbmRlcjtcblx0XHRub0xpbmtpbmcgPSBjb250ZXh0ICYmIGNvbnRleHQubGluayA9PT0gZmFsc2U7XG5cblx0XHRpZiAobm9MaW5raW5nICYmIHZpZXcuXy5ubCkge1xuXHRcdFx0b25SZW5kZXIgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Y29udGV4dCA9IGV4dGVuZEN0eChjb250ZXh0LCB2aWV3LmN0eCk7XG5cdFx0dGFnQ3R4ID0gIXRhZyAmJiB2aWV3LnRhZ1xuXHRcdFx0PyB2aWV3LnRhZy50YWdDdHhzW3ZpZXcudGFnRWxzZV1cblx0XHRcdDogdGFnQ3R4O1xuXHR9XG5cblx0aWYgKGl0ZW1WYXIgPSB0YWdDdHggJiYgdGFnQ3R4LnByb3BzLml0ZW1WYXIpIHtcblx0XHRpZiAoaXRlbVZhclswXSAhPT0gXCJ+XCIpIHtcblx0XHRcdHN5bnRheEVycm9yKFwiVXNlIGl0ZW1WYXI9J35teUl0ZW0nXCIpO1xuXHRcdH1cblx0XHRpdGVtVmFyID0gaXRlbVZhci5zbGljZSgxKTtcblx0fVxuXG5cdGlmIChrZXkgPT09IHRydWUpIHtcblx0XHRzd2FwQ29udGVudCA9IHRydWU7XG5cdFx0a2V5ID0gMDtcblx0fVxuXG5cdC8vIElmIGxpbms9PT1mYWxzZSwgZG8gbm90IGNhbGwgb25SZW5kZXIsIHNvIG5vIGRhdGEtbGlua2luZyBtYXJrZXIgbm9kZXNcblx0aWYgKG9uUmVuZGVyICYmIHRhZyAmJiB0YWcuXy5ub1Z3cykge1xuXHRcdG9uUmVuZGVyID0gdW5kZWZpbmVkO1xuXHR9XG5cdG91dGVyT25SZW5kZXIgPSBvblJlbmRlcjtcblx0aWYgKG9uUmVuZGVyID09PSB0cnVlKSB7XG5cdFx0Ly8gVXNlZCBieSB2aWV3LnJlZnJlc2goKS4gRG9uJ3QgY3JlYXRlIGEgbmV3IHdyYXBwZXIgdmlldy5cblx0XHRvdXRlck9uUmVuZGVyID0gdW5kZWZpbmVkO1xuXHRcdG9uUmVuZGVyID0gdmlldy5fLm9uUmVuZGVyO1xuXHR9XG5cdC8vIFNldCBhZGRpdGlvbmFsIGNvbnRleHQgb24gdmlld3MgY3JlYXRlZCBoZXJlLCAoYXMgbW9kaWZpZWQgY29udGV4dCBpbmhlcml0ZWQgZnJvbSB0aGUgcGFyZW50LCBhbmQgdG8gYmUgaW5oZXJpdGVkIGJ5IGNoaWxkIHZpZXdzKVxuXHRjb250ZXh0ID0gdG1wbC5oZWxwZXJzXG5cdFx0PyBleHRlbmRDdHgodG1wbC5oZWxwZXJzLCBjb250ZXh0KVxuXHRcdDogY29udGV4dDtcblxuXHRuZXdDdHggPSBjb250ZXh0O1xuXHRpZiAoJGlzQXJyYXkoZGF0YSkgJiYgIW5vSXRlcmF0aW9uKSB7XG5cdFx0Ly8gQ3JlYXRlIGEgdmlldyBmb3IgdGhlIGFycmF5LCB3aG9zZSBjaGlsZCB2aWV3cyBjb3JyZXNwb25kIHRvIGVhY2ggZGF0YSBpdGVtLiAoTm90ZTogaWYga2V5IGFuZCB2aWV3IGFyZSBwYXNzZWQgaW5cblx0XHQvLyBhbG9uZyB3aXRoIHBhcmVudCB2aWV3LCB0cmVhdCBhcyBpbnNlcnQgLWUuZy4gZnJvbSB2aWV3LmFkZFZpZXdzIC0gc28gdmlldyBpcyBhbHJlYWR5IHRoZSB2aWV3IGl0ZW0gZm9yIGFycmF5KVxuXHRcdG5ld1ZpZXcgPSBzd2FwQ29udGVudFxuXHRcdFx0PyB2aWV3XG5cdFx0XHQ6IChrZXkgIT09IHVuZGVmaW5lZCAmJiB2aWV3KVxuXHRcdFx0XHR8fCBuZXcgVmlldyhjb250ZXh0LCBcImFycmF5XCIsIHZpZXcsIGRhdGEsIHRtcGwsIGtleSwgb25SZW5kZXIsIGNvbnRlbnRUbXBsKTtcblx0XHRuZXdWaWV3Ll8ubmw9IG5vTGlua2luZztcblx0XHRpZiAodmlldyAmJiB2aWV3Ll8udXNlS2V5KSB7XG5cdFx0XHQvLyBQYXJlbnQgaXMgbm90IGFuICdhcnJheSB2aWV3J1xuXHRcdFx0bmV3Vmlldy5fLmJuZCA9ICF0YWcgfHwgdGFnLl8uYm5kICYmIHRhZzsgLy8gRm9yIGFycmF5IHZpZXdzIHRoYXQgYXJlIGRhdGEgYm91bmQgZm9yIGNvbGxlY3Rpb24gY2hhbmdlIGV2ZW50cywgc2V0IHRoZVxuXHRcdFx0Ly8gdmlldy5fLmJuZCBwcm9wZXJ0eSB0byB0cnVlIGZvciB0b3AtbGV2ZWwgbGluaygpIG9yIGRhdGEtbGluaz1cIntmb3J9XCIsIG9yIHRvIHRoZSB0YWcgaW5zdGFuY2UgZm9yIGEgZGF0YS1ib3VuZCB0YWcsIGUuZy4ge157Zm9yIC4uLn19XG5cdFx0XHRuZXdWaWV3LnRhZyA9IHRhZztcblx0XHR9XG5cdFx0Zm9yIChpID0gMCwgbCA9IGRhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHQvLyBDcmVhdGUgYSB2aWV3IGZvciBlYWNoIGRhdGEgaXRlbS5cblx0XHRcdGNoaWxkVmlldyA9IG5ldyBWaWV3KG5ld0N0eCwgXCJpdGVtXCIsIG5ld1ZpZXcsIGRhdGFbaV0sIHRtcGwsIChrZXkgfHwgMCkgKyBpLCBvblJlbmRlciwgbmV3Vmlldy5jb250ZW50KTtcblx0XHRcdGlmIChpdGVtVmFyKSB7XG5cdFx0XHRcdChjaGlsZFZpZXcuY3R4ID0gJGV4dGVuZCh7fSwgbmV3Q3R4KSlbaXRlbVZhcl0gPSAkc3ViLl9jcChkYXRhW2ldLCBcIiNkYXRhXCIsIGNoaWxkVmlldyk7XG5cdFx0XHR9XG5cdFx0XHRpdGVtUmVzdWx0ID0gdG1wbC5mbihkYXRhW2ldLCBjaGlsZFZpZXcsICRzdWIpO1xuXHRcdFx0cmVzdWx0ICs9IG5ld1ZpZXcuXy5vblJlbmRlciA/IG5ld1ZpZXcuXy5vblJlbmRlcihpdGVtUmVzdWx0LCBjaGlsZFZpZXcpIDogaXRlbVJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Ly8gQ3JlYXRlIGEgdmlldyBmb3Igc2luZ2xldG9uIGRhdGEgb2JqZWN0LiBUaGUgdHlwZSBvZiB0aGUgdmlldyB3aWxsIGJlIHRoZSB0YWcgbmFtZSwgZS5nLiBcImlmXCIgb3IgXCJteXRhZ1wiIGV4Y2VwdCBmb3Jcblx0XHQvLyBcIml0ZW1cIiwgXCJhcnJheVwiIGFuZCBcImRhdGFcIiB2aWV3cy4gQSBcImRhdGFcIiB2aWV3IGlzIGZyb20gcHJvZ3JhbW1hdGljIHJlbmRlcihvYmplY3QpIGFnYWluc3QgYSAnc2luZ2xldG9uJy5cblx0XHRuZXdWaWV3ID0gc3dhcENvbnRlbnQgPyB2aWV3IDogbmV3IFZpZXcobmV3Q3R4LCB0bXBsTmFtZSB8fCBcImRhdGFcIiwgdmlldywgZGF0YSwgdG1wbCwga2V5LCBvblJlbmRlciwgY29udGVudFRtcGwpO1xuXG5cdFx0aWYgKGl0ZW1WYXIpIHtcblx0XHRcdChuZXdWaWV3LmN0eCA9ICRleHRlbmQoe30sIG5ld0N0eCkpW2l0ZW1WYXJdID0gJHN1Yi5fY3AoZGF0YSwgXCIjZGF0YVwiLCBuZXdWaWV3KTtcblx0XHR9XG5cblx0XHRuZXdWaWV3LnRhZyA9IHRhZztcblx0XHRuZXdWaWV3Ll8ubmwgPSBub0xpbmtpbmc7XG5cdFx0cmVzdWx0ICs9IHRtcGwuZm4oZGF0YSwgbmV3VmlldywgJHN1Yik7XG5cdH1cblx0aWYgKHRhZykge1xuXHRcdG5ld1ZpZXcudGFnRWxzZSA9IHRhZ0N0eC5pbmRleDtcblx0XHR0YWdDdHguY29udGVudFZpZXcgPSBuZXdWaWV3O1xuXHR9XG5cdHJldHVybiBvdXRlck9uUmVuZGVyID8gb3V0ZXJPblJlbmRlcihyZXN1bHQsIG5ld1ZpZXcpIDogcmVzdWx0O1xufVxuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQnVpbGQgYW5kIGNvbXBpbGUgdGVtcGxhdGVcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vIEdlbmVyYXRlIGEgcmV1c2FibGUgZnVuY3Rpb24gdGhhdCB3aWxsIHNlcnZlIHRvIHJlbmRlciBhIHRlbXBsYXRlIGFnYWluc3QgZGF0YVxuLy8gKENvbXBpbGUgQVNUIHRoZW4gYnVpbGQgdGVtcGxhdGUgZnVuY3Rpb24pXG5cbmZ1bmN0aW9uIG9uUmVuZGVyRXJyb3IoZSwgdmlldywgZmFsbGJhY2spIHtcblx0dmFyIG1lc3NhZ2UgPSBmYWxsYmFjayAhPT0gdW5kZWZpbmVkXG5cdFx0PyAkaXNGdW5jdGlvbihmYWxsYmFjaylcblx0XHRcdD8gZmFsbGJhY2suY2FsbCh2aWV3LmRhdGEsIGUsIHZpZXcpXG5cdFx0XHQ6IGZhbGxiYWNrIHx8IFwiXCJcblx0XHQ6IFwie0Vycm9yOiBcIiArIChlLm1lc3NhZ2V8fGUpICsgXCJ9XCI7XG5cblx0aWYgKCRzdWJTZXR0aW5ncy5vbkVycm9yICYmIChmYWxsYmFjayA9ICRzdWJTZXR0aW5ncy5vbkVycm9yLmNhbGwodmlldy5kYXRhLCBlLCBmYWxsYmFjayAmJiBtZXNzYWdlLCB2aWV3KSkgIT09IHVuZGVmaW5lZCkge1xuXHRcdG1lc3NhZ2UgPSBmYWxsYmFjazsgLy8gVGhlcmUgaXMgYSBzZXR0aW5ncy5kZWJ1Z01vZGUoaGFuZGxlcikgb25FcnJvciBvdmVycmlkZS4gQ2FsbCBpdCwgYW5kIHVzZSByZXR1cm4gdmFsdWUgKGlmIGFueSkgdG8gcmVwbGFjZSBtZXNzYWdlXG5cdH1cblx0cmV0dXJuIHZpZXcgJiYgIXZpZXcuX2xjID8gJGNvbnZlcnRlcnMuaHRtbChtZXNzYWdlKSA6IG1lc3NhZ2U7IC8vIEZvciBkYXRhLWxpbms9XFxcInsuLi4gb25FcnJvcj0uLi59XCIuLi4gU2VlIG9uRGF0YUxpbmtlZFRhZ0NoYW5nZVxufVxuXG5mdW5jdGlvbiBlcnJvcihtZXNzYWdlKSB7XG5cdHRocm93IG5ldyAkc3ViLkVycihtZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gc3ludGF4RXJyb3IobWVzc2FnZSkge1xuXHRlcnJvcihcIlN5bnRheCBlcnJvclxcblwiICsgbWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIHRtcGxGbihtYXJrdXAsIHRtcGwsIGlzTGlua0V4cHIsIGNvbnZlcnRCYWNrLCBoYXNFbHNlKSB7XG5cdC8vIENvbXBpbGUgbWFya3VwIHRvIEFTVCAoYWJ0cmFjdCBzeW50YXggdHJlZSkgdGhlbiBidWlsZCB0aGUgdGVtcGxhdGUgZnVuY3Rpb24gY29kZSBmcm9tIHRoZSBBU1Qgbm9kZXNcblx0Ly8gVXNlZCBmb3IgY29tcGlsaW5nIHRlbXBsYXRlcywgYW5kIGFsc28gYnkgSnNWaWV3cyB0byBidWlsZCBmdW5jdGlvbnMgZm9yIGRhdGEgbGluayBleHByZXNzaW9uc1xuXG5cdC8vPT09PSBuZXN0ZWQgZnVuY3Rpb25zID09PT1cblx0ZnVuY3Rpb24gcHVzaHByZWNlZGluZ0NvbnRlbnQoc2hpZnQpIHtcblx0XHRzaGlmdCAtPSBsb2M7XG5cdFx0aWYgKHNoaWZ0KSB7XG5cdFx0XHRjb250ZW50LnB1c2gobWFya3VwLnN1YnN0cihsb2MsIHNoaWZ0KS5yZXBsYWNlKHJOZXdMaW5lLCBcIlxcXFxuXCIpKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBibG9ja1RhZ0NoZWNrKHRhZ05hbWUsIGJsb2NrKSB7XG5cdFx0aWYgKHRhZ05hbWUpIHtcblx0XHRcdHRhZ05hbWUgKz0gJ319Jztcblx0XHRcdC8vXHRcdFx0J3t7aW5jbHVkZX19IGJsb2NrIGhhcyB7ey9mb3J9fSB3aXRoIG5vIG9wZW4ge3tmb3J9fSdcblx0XHRcdHN5bnRheEVycm9yKChcblx0XHRcdFx0YmxvY2tcblx0XHRcdFx0XHQ/ICd7eycgKyBibG9jayArICd9fSBibG9jayBoYXMge3svJyArIHRhZ05hbWUgKyAnIHdpdGhvdXQge3snICsgdGFnTmFtZVxuXHRcdFx0XHRcdDogJ1VubWF0Y2hlZCBvciBtaXNzaW5nIHt7LycgKyB0YWdOYW1lKSArICcsIGluIHRlbXBsYXRlOlxcbicgKyBtYXJrdXApO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHBhcnNlVGFnKGFsbCwgYmluZCwgdGFnTmFtZSwgY29udmVydGVyLCBjb2xvbiwgaHRtbCwgY29kZVRhZywgcGFyYW1zLCBzbGFzaCwgYmluZDIsIGNsb3NlQmxvY2ssIGluZGV4KSB7XG4vKlxuXG4gICAgIGJpbmQgICAgIHRhZ05hbWUgICAgICAgICBjdnQgICBjbG4gaHRtbCBjb2RlICAgIHBhcmFtcyAgICAgICAgICAgIHNsYXNoICAgYmluZDIgICAgICAgICBjbG9zZUJsayAgY29tbWVudFxuLyg/OnsoXFxeKT97KD86KFxcdysoPz1bXFwvXFxzfV0pKXwoXFx3Kyk/KDopfCg+KXwoXFwqKSlcXHMqKCg/OltefV18fSg/IX0pKSo/KShcXC8pP3x7KFxcXik/eyg/Oig/OlxcLyhcXHcrKSlcXHMqfCEtLVtcXHNcXFNdKj8tLSkpfX0vZ1xuXG4oPzpcbiAgeyhcXF4pP3sgICAgICAgICAgICBiaW5kXG4gICg/OlxuICAgIChcXHcrICAgICAgICAgICAgIHRhZ05hbWVcbiAgICAgICg/PVtcXC9cXHN9XSlcbiAgICApXG4gICAgfFxuICAgIChcXHcrKT8oOikgICAgICAgIGNvbnZlcnRlciBjb2xvblxuICAgIHxcbiAgICAoPikgICAgICAgICAgICAgIGh0bWxcbiAgICB8XG4gICAgKFxcKikgICAgICAgICAgICAgY29kZVRhZ1xuICApXG4gIFxccypcbiAgKCAgICAgICAgICAgICAgICAgIHBhcmFtc1xuICAgICg/OltefV18fSg/IX0pKSo/XG4gIClcbiAgKFxcLyk/ICAgICAgICAgICAgICBzbGFzaFxuICB8XG4gIHsoXFxeKT97ICAgICAgICAgICAgYmluZDJcbiAgKD86XG4gICAgKD86XFwvKFxcdyspKVxccyogICBjbG9zZUJsb2NrXG4gICAgfFxuICAgICEtLVtcXHNcXFNdKj8tLSAgICBjb21tZW50XG4gIClcbilcbn19L2dcblxuKi9cblx0XHRpZiAoY29kZVRhZyAmJiBiaW5kIHx8IHNsYXNoICYmICF0YWdOYW1lIHx8IHBhcmFtcyAmJiBwYXJhbXMuc2xpY2UoLTEpID09PSBcIjpcIiB8fCBiaW5kMikge1xuXHRcdFx0c3ludGF4RXJyb3IoYWxsKTtcblx0XHR9XG5cblx0XHQvLyBCdWlsZCBhYnN0cmFjdCBzeW50YXggdHJlZSAoQVNUKTogW3RhZ05hbWUsIGNvbnZlcnRlciwgcGFyYW1zLCBjb250ZW50LCBoYXNoLCBiaW5kaW5ncywgY29udGVudE1hcmt1cF1cblx0XHRpZiAoaHRtbCkge1xuXHRcdFx0Y29sb24gPSBcIjpcIjtcblx0XHRcdGNvbnZlcnRlciA9IEhUTUw7XG5cdFx0fVxuXHRcdHNsYXNoID0gc2xhc2ggfHwgaXNMaW5rRXhwciAmJiAhaGFzRWxzZTtcblxuXHRcdHZhciBsYXRlLCBvcGVuVGFnTmFtZSwgaXNMYXRlT2IsXG5cdFx0XHRwYXRoQmluZGluZ3MgPSAoYmluZCB8fCBpc0xpbmtFeHByKSAmJiBbW11dLCAvLyBwYXRoQmluZGluZ3MgaXMgYW4gYXJyYXkgb2YgYXJyYXlzIGZvciBhcmcgYmluZGluZ3MgYW5kIGEgaGFzaCBvZiBhcnJheXMgZm9yIHByb3AgYmluZGluZ3Ncblx0XHRcdHByb3BzID0gXCJcIixcblx0XHRcdGFyZ3MgPSBcIlwiLFxuXHRcdFx0Y3R4UHJvcHMgPSBcIlwiLFxuXHRcdFx0cGFyYW1zQXJncyA9IFwiXCIsXG5cdFx0XHRwYXJhbXNQcm9wcyA9IFwiXCIsXG5cdFx0XHRwYXJhbXNDdHhQcm9wcyA9IFwiXCIsXG5cdFx0XHRvbkVycm9yID0gXCJcIixcblx0XHRcdHVzZVRyaWdnZXIgPSBcIlwiLFxuXHRcdFx0Ly8gQmxvY2sgdGFnIGlmIG5vdCBzZWxmLWNsb3NpbmcgYW5kIG5vdCB7ezp9fSBvciB7ez59fSAoc3BlY2lhbCBjYXNlKSBhbmQgbm90IGEgZGF0YS1saW5rIGV4cHJlc3Npb25cblx0XHRcdGJsb2NrID0gIXNsYXNoICYmICFjb2xvbjtcblxuXHRcdC8vPT09PSBuZXN0ZWQgaGVscGVyIGZ1bmN0aW9uID09PT1cblx0XHR0YWdOYW1lID0gdGFnTmFtZSB8fCAocGFyYW1zID0gcGFyYW1zIHx8IFwiI2RhdGFcIiwgY29sb24pOyAvLyB7ezp9fSBpcyBlcXVpdmFsZW50IHRvIHt7OiNkYXRhfX1cblx0XHRwdXNocHJlY2VkaW5nQ29udGVudChpbmRleCk7XG5cdFx0bG9jID0gaW5kZXggKyBhbGwubGVuZ3RoOyAvLyBsb2NhdGlvbiBtYXJrZXIgLSBwYXJzZWQgdXAgdG8gaGVyZVxuXHRcdGlmIChjb2RlVGFnKSB7XG5cdFx0XHRpZiAoYWxsb3dDb2RlKSB7XG5cdFx0XHRcdGNvbnRlbnQucHVzaChbXCIqXCIsIFwiXFxuXCIgKyBwYXJhbXMucmVwbGFjZSgvXjovLCBcInJldCs9IFwiKS5yZXBsYWNlKHJVbmVzY2FwZVF1b3RlcywgXCIkMVwiKSArIFwiO1xcblwiXSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0YWdOYW1lKSB7XG5cdFx0XHRpZiAodGFnTmFtZSA9PT0gXCJlbHNlXCIpIHtcblx0XHRcdFx0aWYgKHJUZXN0RWxzZUlmLnRlc3QocGFyYW1zKSkge1xuXHRcdFx0XHRcdHN5bnRheEVycm9yKCdGb3IgXCJ7e2Vsc2UgaWYgZXhwcn19XCIgdXNlIFwie3tlbHNlIGV4cHJ9fVwiJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cGF0aEJpbmRpbmdzID0gY3VycmVudFs5XSAmJiBbW11dO1xuXHRcdFx0XHRjdXJyZW50WzEwXSA9IG1hcmt1cC5zdWJzdHJpbmcoY3VycmVudFsxMF0sIGluZGV4KTsgLy8gY29udGVudE1hcmt1cCBmb3IgYmxvY2sgdGFnXG5cdFx0XHRcdG9wZW5UYWdOYW1lID0gY3VycmVudFsxMV0gfHwgY3VycmVudFswXSB8fCBzeW50YXhFcnJvcihcIk1pc21hdGNoZWQ6IFwiICsgYWxsKTtcblx0XHRcdFx0Ly8gY3VycmVudFswXSBpcyB0YWdOYW1lLCBidXQgZm9yIHt7ZWxzZX19IG5vZGVzLCBjdXJyZW50WzExXSBpcyB0YWdOYW1lIG9mIHByZWNlZGluZyBvcGVuIHRhZ1xuXHRcdFx0XHRjdXJyZW50ID0gc3RhY2sucG9wKCk7XG5cdFx0XHRcdGNvbnRlbnQgPSBjdXJyZW50WzJdO1xuXHRcdFx0XHRibG9jayA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAocGFyYW1zKSB7XG5cdFx0XHRcdC8vIHJlbW92ZSBuZXdsaW5lcyBmcm9tIHRoZSBwYXJhbXMgc3RyaW5nLCB0byBhdm9pZCBjb21waWxlZCBjb2RlIGVycm9ycyBmb3IgdW50ZXJtaW5hdGVkIHN0cmluZ3Ncblx0XHRcdFx0cGFyc2VQYXJhbXMocGFyYW1zLnJlcGxhY2Uock5ld0xpbmUsIFwiIFwiKSwgcGF0aEJpbmRpbmdzLCB0bXBsLCBpc0xpbmtFeHByKVxuXHRcdFx0XHRcdC5yZXBsYWNlKHJCdWlsZEhhc2gsIGZ1bmN0aW9uKGFsbCwgb25lcnJvciwgaXNDdHhQcm0sIGtleSwga2V5VG9rZW4sIGtleVZhbHVlLCBhcmcsIHBhcmFtKSB7XG5cdFx0XHRcdFx0XHRpZiAoa2V5ID09PSBcInRoaXM6XCIpIHtcblx0XHRcdFx0XHRcdFx0a2V5VmFsdWUgPSBcInVuZGVmaW5lZFwiOyAvLyB0aGlzPXNvbWUucGF0aCBpcyBhbHdheXMgYSB0byBwYXJhbWV0ZXIgKG9uZS13YXkpLCBzbyBkb24ndCBuZWVkIHRvIGNvbXBpbGUvZXZhbHVhdGUgc29tZS5wYXRoIGluaXRpYWxpemF0aW9uXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAocGFyYW0pIHtcblx0XHRcdFx0XHRcdFx0aXNMYXRlT2IgPSBpc0xhdGVPYiB8fCBwYXJhbVswXSA9PT0gXCJAXCI7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRrZXkgPSBcIidcIiArIGtleVRva2VuICsgXCInOlwiO1xuXHRcdFx0XHRcdFx0aWYgKGFyZykge1xuXHRcdFx0XHRcdFx0XHRhcmdzICs9IGlzQ3R4UHJtICsga2V5VmFsdWUgKyBcIixcIjtcblx0XHRcdFx0XHRcdFx0cGFyYW1zQXJncyArPSBcIidcIiArIHBhcmFtICsgXCInLFwiO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChpc0N0eFBybSkgeyAvLyBDb250ZXh0dWFsIHBhcmFtZXRlciwgfmZvbz1leHByXG5cdFx0XHRcdFx0XHRcdGN0eFByb3BzICs9IGtleSArICdqLl9jcCgnICsga2V5VmFsdWUgKyAnLFwiJyArIHBhcmFtICsgJ1wiLHZpZXcpLCc7XG5cdFx0XHRcdFx0XHRcdC8vIENvbXBpbGVkIGNvZGUgZm9yIGV2YWx1YXRpbmcgdGFnQ3R4IG9uIGEgdGFnIHdpbGwgaGF2ZTogY3R4OnsnZm9vJzpqLl9jcChjb21waWxlZEV4cHIsIFwiZXhwclwiLCB2aWV3KX1cblx0XHRcdFx0XHRcdFx0cGFyYW1zQ3R4UHJvcHMgKz0ga2V5ICsgXCInXCIgKyBwYXJhbSArIFwiJyxcIjtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAob25lcnJvcikge1xuXHRcdFx0XHRcdFx0XHRvbkVycm9yICs9IGtleVZhbHVlO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0aWYgKGtleVRva2VuID09PSBcInRyaWdnZXJcIikge1xuXHRcdFx0XHRcdFx0XHRcdHVzZVRyaWdnZXIgKz0ga2V5VmFsdWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKGtleVRva2VuID09PSBcImxhdGVSZW5kZXJcIikge1xuXHRcdFx0XHRcdFx0XHRcdGxhdGUgPSBwYXJhbSAhPT0gXCJmYWxzZVwiOyAvLyBSZW5kZXIgYWZ0ZXIgZmlyc3QgcGFzc1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHByb3BzICs9IGtleSArIGtleVZhbHVlICsgXCIsXCI7XG5cdFx0XHRcdFx0XHRcdHBhcmFtc1Byb3BzICs9IGtleSArIFwiJ1wiICsgcGFyYW0gKyBcIicsXCI7XG5cdFx0XHRcdFx0XHRcdGhhc0hhbmRsZXJzID0gaGFzSGFuZGxlcnMgfHwgckhhc0hhbmRsZXJzLnRlc3Qoa2V5VG9rZW4pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIFwiXCI7XG5cdFx0XHRcdFx0fSkuc2xpY2UoMCwgLTEpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocGF0aEJpbmRpbmdzICYmIHBhdGhCaW5kaW5nc1swXSkge1xuXHRcdFx0XHRwYXRoQmluZGluZ3MucG9wKCk7IC8vIFJlbW92ZSB0aGUgYmluZGluZyB0aGF0IHdhcyBwcmVwYXJlZCBmb3IgbmV4dCBhcmcuIChUaGVyZSBpcyBhbHdheXMgYW4gZXh0cmEgb25lIHJlYWR5KS5cblx0XHRcdH1cblxuXHRcdFx0bmV3Tm9kZSA9IFtcblx0XHRcdFx0XHR0YWdOYW1lLFxuXHRcdFx0XHRcdGNvbnZlcnRlciB8fCAhIWNvbnZlcnRCYWNrIHx8IGhhc0hhbmRsZXJzIHx8IFwiXCIsXG5cdFx0XHRcdFx0YmxvY2sgJiYgW10sXG5cdFx0XHRcdFx0cGFyc2VkUGFyYW0ocGFyYW1zQXJncyB8fCAodGFnTmFtZSA9PT0gXCI6XCIgPyBcIicjZGF0YScsXCIgOiBcIlwiKSwgcGFyYW1zUHJvcHMsIHBhcmFtc0N0eFByb3BzKSwgLy8ge3s6fX0gZXF1aXZhbGVudCB0byB7ezojZGF0YX19XG5cdFx0XHRcdFx0cGFyc2VkUGFyYW0oYXJncyB8fCAodGFnTmFtZSA9PT0gXCI6XCIgPyBcImRhdGEsXCIgOiBcIlwiKSwgcHJvcHMsIGN0eFByb3BzKSxcblx0XHRcdFx0XHRvbkVycm9yLFxuXHRcdFx0XHRcdHVzZVRyaWdnZXIsXG5cdFx0XHRcdFx0bGF0ZSxcblx0XHRcdFx0XHRpc0xhdGVPYixcblx0XHRcdFx0XHRwYXRoQmluZGluZ3MgfHwgMFxuXHRcdFx0XHRdO1xuXHRcdFx0Y29udGVudC5wdXNoKG5ld05vZGUpO1xuXHRcdFx0aWYgKGJsb2NrKSB7XG5cdFx0XHRcdHN0YWNrLnB1c2goY3VycmVudCk7XG5cdFx0XHRcdGN1cnJlbnQgPSBuZXdOb2RlO1xuXHRcdFx0XHRjdXJyZW50WzEwXSA9IGxvYzsgLy8gU3RvcmUgY3VycmVudCBsb2NhdGlvbiBvZiBvcGVuIHRhZywgdG8gYmUgYWJsZSB0byBhZGQgY29udGVudE1hcmt1cCB3aGVuIHdlIHJlYWNoIGNsb3NpbmcgdGFnXG5cdFx0XHRcdGN1cnJlbnRbMTFdID0gb3BlblRhZ05hbWU7IC8vIFVzZWQgZm9yIGNoZWNraW5nIHN5bnRheCAobWF0Y2hpbmcgY2xvc2UgdGFnKVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoY2xvc2VCbG9jaykge1xuXHRcdFx0YmxvY2tUYWdDaGVjayhjbG9zZUJsb2NrICE9PSBjdXJyZW50WzBdICYmIGNsb3NlQmxvY2sgIT09IGN1cnJlbnRbMTFdICYmIGNsb3NlQmxvY2ssIGN1cnJlbnRbMF0pOyAvLyBDaGVjayBtYXRjaGluZyBjbG9zZSB0YWcgbmFtZVxuXHRcdFx0Y3VycmVudFsxMF0gPSBtYXJrdXAuc3Vic3RyaW5nKGN1cnJlbnRbMTBdLCBpbmRleCk7IC8vIGNvbnRlbnRNYXJrdXAgZm9yIGJsb2NrIHRhZ1xuXHRcdFx0Y3VycmVudCA9IHN0YWNrLnBvcCgpO1xuXHRcdH1cblx0XHRibG9ja1RhZ0NoZWNrKCFjdXJyZW50ICYmIGNsb3NlQmxvY2spO1xuXHRcdGNvbnRlbnQgPSBjdXJyZW50WzJdO1xuXHR9XG5cdC8vPT09PSAvZW5kIG9mIG5lc3RlZCBmdW5jdGlvbnMgPT09PVxuXG5cdHZhciBpLCByZXN1bHQsIG5ld05vZGUsIGhhc0hhbmRsZXJzLCBiaW5kaW5ncyxcblx0XHRhbGxvd0NvZGUgPSAkc3ViU2V0dGluZ3MuYWxsb3dDb2RlIHx8IHRtcGwgJiYgdG1wbC5hbGxvd0NvZGVcblx0XHRcdHx8ICR2aWV3c1NldHRpbmdzLmFsbG93Q29kZSA9PT0gdHJ1ZSwgLy8gaW5jbHVkZSBkaXJlY3Qgc2V0dGluZyBvZiBzZXR0aW5ncy5hbGxvd0NvZGUgdHJ1ZSBmb3IgYmFja3dhcmQgY29tcGF0IG9ubHlcblx0XHRhc3RUb3AgPSBbXSxcblx0XHRsb2MgPSAwLFxuXHRcdHN0YWNrID0gW10sXG5cdFx0Y29udGVudCA9IGFzdFRvcCxcblx0XHRjdXJyZW50ID0gWywsYXN0VG9wXTtcblxuXHRpZiAoYWxsb3dDb2RlICYmIHRtcGwuX2lzKSB7XG5cdFx0dG1wbC5hbGxvd0NvZGUgPSBhbGxvd0NvZGU7XG5cdH1cblxuLy9UT0RPXHRyZXN1bHQgPSB0bXBsRm5zQ2FjaGVbbWFya3VwXTsgLy8gT25seSBjYWNoZSBpZiB0ZW1wbGF0ZSBpcyBub3QgbmFtZWQgYW5kIG1hcmt1cCBsZW5ndGggPCAuLi4sXG4vL2FuZCB0aGVyZSBhcmUgbm8gYmluZGluZ3Mgb3Igc3VidGVtcGxhdGVzPz8gQ29uc2lkZXIgc3RhbmRhcmQgb3B0aW1pemF0aW9uIGZvciBkYXRhLWxpbms9XCJhLmIuY1wiXG4vL1x0XHRpZiAocmVzdWx0KSB7XG4vL1x0XHRcdHRtcGwuZm4gPSByZXN1bHQ7XG4vL1x0XHR9IGVsc2Uge1xuXG4vL1x0XHRyZXN1bHQgPSBtYXJrdXA7XG5cdGlmIChpc0xpbmtFeHByKSB7XG5cdFx0aWYgKGNvbnZlcnRCYWNrICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdG1hcmt1cCA9IG1hcmt1cC5zbGljZSgwLCAtY29udmVydEJhY2subGVuZ3RoIC0gMikgKyBkZWxpbUNsb3NlQ2hhcjA7ICAvLyBcIns6bXlFeHByOm15Q3Z0fVwiID0+IFwiezpteUV4cHJ9XCJcblx0XHR9XG5cdFx0bWFya3VwID0gZGVsaW1PcGVuQ2hhcjAgKyBtYXJrdXAgKyBkZWxpbUNsb3NlQ2hhcjE7XG5cdH1cblxuXHRibG9ja1RhZ0NoZWNrKHN0YWNrWzBdICYmIHN0YWNrWzBdWzJdLnBvcCgpWzBdKTtcblx0Ly8gQnVpbGQgdGhlIEFTVCAoYWJzdHJhY3Qgc3ludGF4IHRyZWUpIHVuZGVyIGFzdFRvcFxuXHRtYXJrdXAucmVwbGFjZShyVGFnLCBwYXJzZVRhZyk7XG5cblx0cHVzaHByZWNlZGluZ0NvbnRlbnQobWFya3VwLmxlbmd0aCk7XG5cblx0aWYgKGxvYyA9IGFzdFRvcFthc3RUb3AubGVuZ3RoIC0gMV0pIHtcblx0XHRibG9ja1RhZ0NoZWNrKHR5cGVvZiBsb2MgIT09IFNUUklORyAmJiAoK2xvY1sxMF0gPT09IGxvY1sxMF0pICYmIGxvY1swXSk7XG5cdH1cbi8vXHRcdFx0cmVzdWx0ID0gdG1wbEZuc0NhY2hlW21hcmt1cF0gPSBidWlsZENvZGUoYXN0VG9wLCB0bXBsKTtcbi8vXHRcdH1cblxuXHRpZiAoaXNMaW5rRXhwcikge1xuXHRcdHJlc3VsdCA9IGJ1aWxkQ29kZShhc3RUb3AsIG1hcmt1cCwgaXNMaW5rRXhwcik7XG5cdFx0YmluZGluZ3MgPSBbXTtcblx0XHRpID0gYXN0VG9wLmxlbmd0aDtcblx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRiaW5kaW5ncy51bnNoaWZ0KGFzdFRvcFtpXVs5XSk7IC8vIFdpdGggZGF0YS1saW5rIGV4cHJlc3Npb25zLCBwYXRoQmluZGluZ3MgYXJyYXkgZm9yIHRhZ0N0eFtpXSBpcyBhc3RUb3BbaV1bOV1cblx0XHR9XG5cdFx0c2V0UGF0aHMocmVzdWx0LCBiaW5kaW5ncyk7XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gYnVpbGRDb2RlKGFzdFRvcCwgdG1wbCk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gc2V0UGF0aHMoZm4sIHBhdGhzQXJyKSB7XG5cdHZhciBrZXksIHBhdGhzLFxuXHRcdGkgPSAwLFxuXHRcdGwgPSBwYXRoc0Fyci5sZW5ndGg7XG5cdGZuLmRlcHMgPSBbXTtcblx0Zm4ucGF0aHMgPSBbXTsgLy8gVGhlIGFycmF5IG9mIHBhdGggYmluZGluZyAoYXJyYXkvZGljdGlvbmFyeSlzIGZvciBlYWNoIHRhZy9lbHNlIGJsb2NrJ3MgYXJncyBhbmQgcHJvcHNcblx0Zm9yICg7IGkgPCBsOyBpKyspIHtcblx0XHRmbi5wYXRocy5wdXNoKHBhdGhzID0gcGF0aHNBcnJbaV0pO1xuXHRcdGZvciAoa2V5IGluIHBhdGhzKSB7XG5cdFx0XHRpZiAoa2V5ICE9PSBcIl9qc3Z0b1wiICYmIHBhdGhzLmhhc093blByb3BlcnR5KGtleSkgJiYgcGF0aHNba2V5XS5sZW5ndGggJiYgIXBhdGhzW2tleV0uc2twKSB7XG5cdFx0XHRcdGZuLmRlcHMgPSBmbi5kZXBzLmNvbmNhdChwYXRoc1trZXldKTsgLy8gZGVwcyBpcyB0aGUgY29uY2F0ZW5hdGlvbiBvZiB0aGUgcGF0aHMgYXJyYXlzIGZvciB0aGUgZGlmZmVyZW50IGJpbmRpbmdzXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHBhcnNlZFBhcmFtKGFyZ3MsIHByb3BzLCBjdHgpIHtcblx0cmV0dXJuIFthcmdzLnNsaWNlKDAsIC0xKSwgcHJvcHMuc2xpY2UoMCwgLTEpLCBjdHguc2xpY2UoMCwgLTEpXTtcbn1cblxuZnVuY3Rpb24gcGFyYW1TdHJ1Y3R1cmUocGFyYW1Db2RlLCBwYXJhbVZhbHMpIHtcblx0cmV0dXJuICdcXG5cXHRwYXJhbXM6e2FyZ3M6WycgKyBwYXJhbUNvZGVbMF0gKyAnXSxcXG5cXHRwcm9wczp7JyArIHBhcmFtQ29kZVsxXSArICd9J1xuXHRcdCsgKHBhcmFtQ29kZVsyXSA/ICcsXFxuXFx0Y3R4OnsnICsgcGFyYW1Db2RlWzJdICsgJ30nIDogXCJcIilcblx0XHQrICd9LFxcblxcdGFyZ3M6WycgKyBwYXJhbVZhbHNbMF0gKyAnXSxcXG5cXHRwcm9wczp7JyArIHBhcmFtVmFsc1sxXSArICd9J1xuXHRcdCsgKHBhcmFtVmFsc1syXSA/ICcsXFxuXFx0Y3R4OnsnICsgcGFyYW1WYWxzWzJdICsgJ30nIDogXCJcIik7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUGFyYW1zKHBhcmFtcywgcGF0aEJpbmRpbmdzLCB0bXBsLCBpc0xpbmtFeHByKSB7XG5cblx0ZnVuY3Rpb24gcGFyc2VUb2tlbnMoYWxsLCBsZnRQcm4wLCBsZnRQcm4sIGJvdW5kLCBwYXRoLCBvcGVyYXRvciwgZXJyLCBlcSwgcGF0aDIsIGxhdGUsIHBybixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbW1hLCBsZnRQcm4yLCBhcG9zLCBxdW90LCBydFBybiwgcnRQcm5Eb3QsIHBybjIsIHNwYWNlLCBpbmRleCwgZnVsbCkge1xuXHQvLyAvKFxcKCkoPz1cXHMqXFwoKXwoPzooWyhbXSlcXHMqKT8oPzooXFxePykofj9bXFx3JC5eXSspP1xccyooKFxcK1xcK3wtLSl8XFwrfC18fig/IVtcXHckXSl8JiZ8XFx8XFx8fD09PXwhPT18PT18IT18PD18Pj18Wzw+JSo6P1xcL118KD0pKVxccyp8KCEqPyhAKT9bI35dP1tcXHckLl5dKykoWyhbXSk/KXwoLFxccyopfCg/OihcXCgpXFxzKik/XFxcXD8oPzooJyl8KFwiKSl8KD86XFxzKigoWylcXF1dKSg/PVsuXl18XFxzKiR8W14oW10pfFspXFxdXSkoWyhbXT8pKXwoXFxzKykvZyxcblx0Ly9sZnRQcm4wICAgICAgICAgICBsZnRQcm4gICAgICAgICBib3VuZCAgICAgcGF0aCAgICAgICAgICAgICAgIG9wZXJhdG9yICAgICBlcnIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcSAgICAgIHBhdGgyIGxhdGUgICAgICAgICAgICBwcm4gICAgICBjb21tYSAgbGZ0UHJuMiAgICAgICAgICBhcG9zIHF1b3QgICAgICAgIHJ0UHJuICBydFBybkRvdCAgICAgICAgICAgICAgICAgIHBybjIgICAgIHNwYWNlXG5cdC8vIChsZWZ0IHBhcmVuPyBmb2xsb3dlZCBieSAocGF0aD8gZm9sbG93ZWQgYnkgb3BlcmF0b3IpIG9yIChwYXRoIGZvbGxvd2VkIGJ5IHBhcmVuPykpIG9yIGNvbW1hIG9yIGFwb3Mgb3IgcXVvdCBvciByaWdodCBwYXJlbiBvciBzcGFjZVxuXG5cdFx0ZnVuY3Rpb24gcGFyc2VQYXRoKGFsbFBhdGgsIG5vdCwgb2JqZWN0LCBoZWxwZXIsIHZpZXcsIHZpZXdQcm9wZXJ0eSwgcGF0aFRva2VucywgbGVhZlRva2VuKSB7XG5cdFx0XHQvLyAvXighKj8pKD86bnVsbHx0cnVlfGZhbHNlfFxcZFtcXGQuXSp8KFtcXHckXSt8XFwufH4oW1xcdyRdKyl8Iyh2aWV3fChbXFx3JF0rKSk/KShbXFx3JC5eXSo/KSg/OlsuW15dKFtcXHckXSspXFxdPyk/KSQvZyxcblx0XHRcdC8vICAgIG5vdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgICAgIGhlbHBlciAgICB2aWV3ICB2aWV3UHJvcGVydHkgcGF0aFRva2VucyAgICAgIGxlYWZUb2tlblxuXHRcdFx0c3ViUGF0aCA9IG9iamVjdCA9PT0gXCIuXCI7XG5cdFx0XHRpZiAob2JqZWN0KSB7XG5cdFx0XHRcdHBhdGggPSBwYXRoLnNsaWNlKG5vdC5sZW5ndGgpO1xuXHRcdFx0XHRpZiAoL15cXC4/Y29uc3RydWN0b3IkLy50ZXN0KGxlYWZUb2tlbnx8cGF0aCkpIHtcblx0XHRcdFx0XHRzeW50YXhFcnJvcihhbGxQYXRoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXN1YlBhdGgpIHtcblx0XHRcdFx0XHRhbGxQYXRoID0gKGxhdGUgLy8gbGF0ZSBwYXRoIEBhLmIuYzogbm90IHRocm93IG9uICdwcm9wZXJ0eSBvZiB1bmRlZmluZWQnIGlmIGEgdW5kZWZpbmVkLCBhbmQgd2lsbCB1c2UgX2dldE9iKCkgYWZ0ZXIgbGlua2luZyB0byByZXNvbHZlIGxhdGUuXG5cdFx0XHRcdFx0XHRcdD8gKGlzTGlua0V4cHIgPyAnJyA6ICcobHRPYi5sdD1sdE9iLmx0fHwnKSArICcob2I9J1xuXHRcdFx0XHRcdFx0XHQ6IFwiXCJcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCsgKGhlbHBlclxuXHRcdFx0XHRcdFx0XHQ/ICd2aWV3LmN0eFBybShcIicgKyBoZWxwZXIgKyAnXCIpJ1xuXHRcdFx0XHRcdFx0XHQ6IHZpZXdcblx0XHRcdFx0XHRcdFx0XHQ/IFwidmlld1wiXG5cdFx0XHRcdFx0XHRcdFx0OiBcImRhdGFcIilcblx0XHRcdFx0XHRcdCsgKGxhdGVcblx0XHRcdFx0XHRcdFx0PyAnKT09PXVuZGVmaW5lZCcgKyAoaXNMaW5rRXhwciA/ICcnIDogJyknKSArICc/XCJcIjp2aWV3Ll9nZXRPYihvYixcIidcblx0XHRcdFx0XHRcdFx0OiBcIlwiXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQrIChsZWFmVG9rZW5cblx0XHRcdFx0XHRcdFx0PyAodmlld1Byb3BlcnR5XG5cdFx0XHRcdFx0XHRcdFx0PyBcIi5cIiArIHZpZXdQcm9wZXJ0eVxuXHRcdFx0XHRcdFx0XHRcdDogaGVscGVyXG5cdFx0XHRcdFx0XHRcdFx0XHQ/IFwiXCJcblx0XHRcdFx0XHRcdFx0XHRcdDogKHZpZXcgPyBcIlwiIDogXCIuXCIgKyBvYmplY3QpXG5cdFx0XHRcdFx0XHRcdFx0KSArIChwYXRoVG9rZW5zIHx8IFwiXCIpXG5cdFx0XHRcdFx0XHRcdDogKGxlYWZUb2tlbiA9IGhlbHBlciA/IFwiXCIgOiB2aWV3ID8gdmlld1Byb3BlcnR5IHx8IFwiXCIgOiBvYmplY3QsIFwiXCIpKTtcblx0XHRcdFx0XHRhbGxQYXRoID0gYWxsUGF0aCArIChsZWFmVG9rZW4gPyBcIi5cIiArIGxlYWZUb2tlbiA6IFwiXCIpO1xuXG5cdFx0XHRcdFx0YWxsUGF0aCA9IG5vdCArIChhbGxQYXRoLnNsaWNlKDAsIDkpID09PSBcInZpZXcuZGF0YVwiXG5cdFx0XHRcdFx0XHQ/IGFsbFBhdGguc2xpY2UoNSkgLy8gY29udmVydCAjdmlldy5kYXRhLi4uIHRvIGRhdGEuLi5cblx0XHRcdFx0XHRcdDogYWxsUGF0aClcblx0XHRcdFx0XHQrIChsYXRlXG5cdFx0XHRcdFx0XHRcdD8gKGlzTGlua0V4cHIgPyAnXCInOiAnXCIsbHRPYicpICsgKHBybiA/ICcsMSknOicpJylcblx0XHRcdFx0XHRcdFx0OiBcIlwiXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChiaW5kaW5ncykge1xuXHRcdFx0XHRcdGJpbmRzID0gbmFtZWQgPT09IFwiX2xpbmtUb1wiID8gKGJpbmR0byA9IHBhdGhCaW5kaW5ncy5fanN2dG8gPSBwYXRoQmluZGluZ3MuX2pzdnRvIHx8IFtdKSA6IGJuZEN0eC5iZDtcblx0XHRcdFx0XHRpZiAodGhlT2IgPSBzdWJQYXRoICYmIGJpbmRzW2JpbmRzLmxlbmd0aC0xXSkge1xuXHRcdFx0XHRcdFx0aWYgKHRoZU9iLl9jcGZuKSB7IC8vIENvbXB1dGVkIHByb3BlcnR5IGV4cHJPYlxuXHRcdFx0XHRcdFx0XHR3aGlsZSAodGhlT2Iuc2IpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGVPYiA9IHRoZU9iLnNiO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICh0aGVPYi5wcm0pIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodGhlT2IuYm5kKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwYXRoID0gXCJeXCIgKyBwYXRoLnNsaWNlKDEpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR0aGVPYi5zYiA9IHBhdGg7XG5cdFx0XHRcdFx0XHRcdFx0dGhlT2IuYm5kID0gdGhlT2IuYm5kIHx8IHBhdGhbMF0gPT09IFwiXlwiO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGJpbmRzLnB1c2gocGF0aCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChwcm4gJiYgIXN1YlBhdGgpIHtcblx0XHRcdFx0XHRcdHBhdGhTdGFydFtmbkRwXSA9IGluZDtcblx0XHRcdFx0XHRcdGNvbXBpbGVkUGF0aFN0YXJ0W2ZuRHBdID0gY29tcGlsZWRQYXRoW2ZuRHBdLmxlbmd0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBhbGxQYXRoO1xuXHRcdH1cblxuXHRcdC8vYm91bmQgPSBiaW5kaW5ncyAmJiBib3VuZDtcblx0XHRpZiAoYm91bmQgJiYgIWVxKSB7XG5cdFx0XHRwYXRoID0gYm91bmQgKyBwYXRoOyAvLyBlLmcuIHNvbWUuZm4oLi4uKV5zb21lLnBhdGggLSBzbyBoZXJlIHBhdGggaXMgXCJec29tZS5wYXRoXCJcblx0XHR9XG5cdFx0b3BlcmF0b3IgPSBvcGVyYXRvciB8fCBcIlwiO1xuXHRcdGxmdFBybjIgPSBsZnRQcm4yIHx8IFwiXCI7XG5cdFx0bGZ0UHJuID0gbGZ0UHJuIHx8IGxmdFBybjAgfHwgbGZ0UHJuMjtcblx0XHRwYXRoID0gcGF0aCB8fCBwYXRoMjtcblxuXHRcdGlmIChsYXRlICYmIChsYXRlID0gIS9cXCl8XS8udGVzdChmdWxsW2luZGV4LTFdKSkpIHtcblx0XHRcdHBhdGggPSBwYXRoLnNsaWNlKDEpLnNwbGl0KFwiLlwiKS5qb2luKFwiXlwiKTsgLy8gTGF0ZSBwYXRoIEB6LmIuYy4gVXNlIFwiXlwiIHJhdGhlciB0aGFuIFwiLlwiIHRvIGVuc3VyZSB0aGF0IGRlZXAgYmluZGluZyB3aWxsIGJlIHVzZWRcblx0XHR9XG5cdFx0Ly8gQ291bGQgZG8gdGhpcyAtIGJ1dCBub3Qgd29ydGggcGVyZiBjb3N0Pz8gOi1cblx0XHQvLyBpZiAoIXBhdGgubGFzdEluZGV4T2YoXCIjZGF0YS5cIiwgMCkpIHsgcGF0aCA9IHBhdGguc2xpY2UoNik7IH0gLy8gSWYgcGF0aCBzdGFydHMgd2l0aCBcIiNkYXRhLlwiLCByZW1vdmUgdGhhdC5cblx0XHRwcm4gPSBwcm4gfHwgcHJuMiB8fCBcIlwiO1xuXHRcdHZhciBleHByLCBiaW5kcywgdGhlT2IsIG5ld09iLCBzdWJQYXRoLCBsZnRQcm5GQ2FsbCwgcmV0LFxuXHRcdFx0aW5kID0gaW5kZXg7XG5cblx0XHRpZiAoIWFwb3NlZCAmJiAhcXVvdGVkKSB7XG5cdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdHN5bnRheEVycm9yKHBhcmFtcyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAocnRQcm5Eb3QgJiYgYmluZGluZ3MpIHtcblx0XHRcdFx0Ly8gVGhpcyBpcyBhIGJpbmRpbmcgdG8gYSBwYXRoIGluIHdoaWNoIGFuIG9iamVjdCBpcyByZXR1cm5lZCBieSBhIGhlbHBlci9kYXRhIGZ1bmN0aW9uL2V4cHJlc3Npb24sIGUuZy4gZm9vKCleeC55IG9yIChhP2I6YyleeC55XG5cdFx0XHRcdC8vIFdlIGNyZWF0ZSBhIGNvbXBpbGVkIGZ1bmN0aW9uIHRvIGdldCB0aGUgb2JqZWN0IGluc3RhbmNlICh3aGljaCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBkZXBlbmRlbnQgZGF0YSBvZiB0aGUgc3ViZXhwcmVzc2lvbiBjaGFuZ2VzLFxuXHRcdFx0XHQvLyB0byByZXR1cm4gdGhlIG5ldyBvYmplY3QsIGFuZCB0cmlnZ2VyIHJlLWJpbmRpbmcgb2YgdGhlIHN1YnNlcXVlbnQgcGF0aClcblx0XHRcdFx0ZXhwciA9IHBhdGhTdGFydFtmbkRwLTFdO1xuXHRcdFx0XHRpZiAodHlwZW9mIGZ1bGwgIT09IFwidW5kZWZpbmVkXCIgJiYgZnVsbC5sZW5ndGggLSAxID4gaW5kIC0gKGV4cHIgfHwgMCkpIHsgLy8gV2UgbmVlZCB0byBjb21waWxlIGEgc3ViZXhwcmVzc2lvblxuXHRcdFx0XHRcdGV4cHIgPSBmdWxsLnNsaWNlKGV4cHIsIGluZCArIGFsbC5sZW5ndGgpLnRyaW0oKTtcblx0XHRcdFx0XHRiaW5kcyA9IGJpbmR0byB8fCBibmRTdGFja1tmbkRwLTFdLmJkO1xuXHRcdFx0XHRcdC8vIEluc2VydCBleHByT2Igb2JqZWN0LCB0byBiZSB1c2VkIGR1cmluZyBiaW5kaW5nIHRvIHJldHVybiB0aGUgY29tcHV0ZWQgb2JqZWN0XG5cdFx0XHRcdFx0dGhlT2IgPSBiaW5kc1tiaW5kcy5sZW5ndGgtMV07XG5cdFx0XHRcdFx0aWYgKHRoZU9iICYmIHRoZU9iLnBybSkge1xuXHRcdFx0XHRcdFx0d2hpbGUgKHRoZU9iLnNiICYmIHRoZU9iLnNiLnBybSkge1xuXHRcdFx0XHRcdFx0XHR0aGVPYiA9IHRoZU9iLnNiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bmV3T2IgPSB0aGVPYi5zYiA9IHtwYXRoOiB0aGVPYi5zYiwgYm5kOiB0aGVPYi5ibmR9O1xuXHRcdFx0XHRcdFx0aWYgKCFuZXdPYi5wYXRoICYmIHRoZU9iLnBhdGgpIHtcblx0XHRcdFx0XHRcdFx0dGhlT2IuYm5kID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0YmluZHMucHVzaChuZXdPYiA9IHtwYXRoOiBiaW5kcy5wb3AoKX0pOyAvLyBJbnNlcnQgZXhwck9iIG9iamVjdCwgdG8gYmUgdXNlZCBkdXJpbmcgYmluZGluZyB0byByZXR1cm4gdGhlIGNvbXB1dGVkIG9iamVjdFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodGhlT2IgJiYgdGhlT2Iuc2IgPT09IG5ld09iKSB7XG5cdFx0XHRcdFx0XHRjb21waWxlZFBhdGhbZm5EcF0gPSBjb21waWxlZFBhdGhbZm5EcC0xXS5zbGljZSh0aGVPYi5fY3BQdGhTdCkgKyBjb21waWxlZFBhdGhbZm5EcF07XG5cdFx0XHRcdFx0XHRjb21waWxlZFBhdGhbZm5EcC0xXSA9IGNvbXBpbGVkUGF0aFtmbkRwLTFdLnNsaWNlKDAsIHRoZU9iLl9jcFB0aFN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bmV3T2IuX2NwUHRoU3QgPSBjb21waWxlZFBhdGhTdGFydFtmbkRwLTFdO1xuXHRcdFx0XHRcdG5ld09iLl9jcEtleSA9IGV4cHI7XG5cblx0XHRcdFx0XHRjb21waWxlZFBhdGhbZm5EcF0gKz0gZnVsbC5zbGljZShwcmV2SW5kZXgsIGluZGV4KTtcblx0XHRcdFx0XHRwcmV2SW5kZXggPSBpbmRleDtcblxuXHRcdFx0XHRcdG5ld09iLl9jcGZuID0gY3BGblN0b3JlW2V4cHJdID0gY3BGblN0b3JlW2V4cHJdIHx8IC8vIENvbXBpbGVkIGZ1bmN0aW9uIGZvciBjb21wdXRlZCB2YWx1ZTogZ2V0IGZyb20gc3RvcmUsIG9yIGNvbXBpbGUgYW5kIHN0b3JlXG5cdFx0XHRcdFx0XHRuZXcgRnVuY3Rpb24oXCJkYXRhLHZpZXcsalwiLCAvLyBDb21waWxlZCBmdW5jdGlvbiBmb3IgY29tcHV0ZWQgdmFsdWUgaW4gdGVtcGxhdGVcblx0XHRcdFx0XHRcIi8vXCIgKyBleHByICsgXCJcXG52YXIgdjtcXG5yZXR1cm4gKCh2PVwiICsgY29tcGlsZWRQYXRoW2ZuRHBdICsgKHJ0UHJuID09PSBcIl1cIiA/IFwiKV1cIiA6IHJ0UHJuKSArIFwiKSE9bnVsbD92Om51bGwpO1wiKTtcblxuXHRcdFx0XHRcdGNvbXBpbGVkUGF0aFtmbkRwLTFdICs9IChmbkNhbGxbcHJuRHBdICYmICRzdWJTZXR0aW5nc0FkdmFuY2VkLmNhY2hlID8gXCJ2aWV3LmdldENhY2hlKFxcXCJcIiArIGV4cHIucmVwbGFjZShyRXNjYXBlUXVvdGVzLCBcIlxcXFwkJlwiKSArIFwiXFxcIlwiIDogY29tcGlsZWRQYXRoW2ZuRHBdKTtcblxuXHRcdFx0XHRcdG5ld09iLnBybSA9IGJuZEN0eC5iZDtcblx0XHRcdFx0XHRuZXdPYi5ibmQgPSBuZXdPYi5ibmQgfHwgbmV3T2IucGF0aCAmJiBuZXdPYi5wYXRoLmluZGV4T2YoXCJeXCIpID49IDA7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29tcGlsZWRQYXRoW2ZuRHBdID0gXCJcIjtcblx0XHRcdH1cblx0XHRcdGlmIChwcm4gPT09IFwiW1wiKSB7XG5cdFx0XHRcdHBybiA9IFwiW2ouX3NxKFwiO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGxmdFBybiA9PT0gXCJbXCIpIHtcblx0XHRcdFx0bGZ0UHJuID0gXCJbai5fc3EoXCI7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldCA9IChhcG9zZWRcblx0XHRcdC8vIHdpdGhpbiBzaW5nbGUtcXVvdGVkIHN0cmluZ1xuXHRcdFx0PyAoYXBvc2VkID0gIWFwb3MsIChhcG9zZWQgPyBhbGwgOiBsZnRQcm4yICsgJ1wiJykpXG5cdFx0XHQ6IHF1b3RlZFxuXHRcdFx0Ly8gd2l0aGluIGRvdWJsZS1xdW90ZWQgc3RyaW5nXG5cdFx0XHRcdD8gKHF1b3RlZCA9ICFxdW90LCAocXVvdGVkID8gYWxsIDogbGZ0UHJuMiArICdcIicpKVxuXHRcdFx0XHQ6XG5cdFx0XHQoXG5cdFx0XHRcdChsZnRQcm5cblx0XHRcdFx0XHQ/IChcblx0XHRcdFx0XHRcdHByblN0YWNrWysrcHJuRHBdID0gdHJ1ZSxcblx0XHRcdFx0XHRcdHBybkluZFtwcm5EcF0gPSAwLFxuXHRcdFx0XHRcdFx0YmluZGluZ3MgJiYgKFxuXHRcdFx0XHRcdFx0XHRwYXRoU3RhcnRbZm5EcCsrXSA9IGluZCsrLFxuXHRcdFx0XHRcdFx0XHRibmRDdHggPSBibmRTdGFja1tmbkRwXSA9IHtiZDogW119LFxuXHRcdFx0XHRcdFx0XHRjb21waWxlZFBhdGhbZm5EcF0gPSBcIlwiLFxuXHRcdFx0XHRcdFx0XHRjb21waWxlZFBhdGhTdGFydFtmbkRwXSA9IDFcblx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRsZnRQcm4pIC8vIExlZnQgcGFyZW4sIChub3QgYSBmdW5jdGlvbiBjYWxsIHBhcmVuKVxuXHRcdFx0XHRcdDogXCJcIilcblx0XHRcdFx0KyAoc3BhY2Vcblx0XHRcdFx0XHQ/IChwcm5EcFxuXHRcdFx0XHRcdFx0PyBcIlwiIC8vIEEgc3BhY2Ugd2l0aGluIHBhcmVucyBvciB3aXRoaW4gZnVuY3Rpb24gY2FsbCBwYXJlbnMsIHNvIG5vdCBhIHNlcGFyYXRvciBmb3IgdGFnIGFyZ3Ncblx0XHRcdC8vIE5ldyBhcmcgb3IgcHJvcCAtIHNvIGluc2VydCBiYWNrc3BhY2UgXFxiIChcXHgwOCkgYXMgc2VwYXJhdG9yIGZvciBuYW1lZCBwYXJhbXMsIHVzZWQgc3Vic2VxdWVudGx5IGJ5IHJCdWlsZEhhc2gsIGFuZCBwcmVwYXJlIG5ldyBiaW5kaW5ncyBhcnJheVxuXHRcdFx0XHRcdFx0OiAocGFyYW1JbmRleCA9IGZ1bGwuc2xpY2UocGFyYW1JbmRleCwgaW5kKSwgbmFtZWRcblx0XHRcdFx0XHRcdFx0PyAobmFtZWQgPSBib3VuZE5hbWUgPSBiaW5kdG8gPSBmYWxzZSwgXCJcXGJcIilcblx0XHRcdFx0XHRcdFx0OiBcIlxcYixcIikgKyBwYXJhbUluZGV4ICsgKHBhcmFtSW5kZXggPSBpbmQgKyBhbGwubGVuZ3RoLCBiaW5kaW5ncyAmJiBwYXRoQmluZGluZ3MucHVzaChibmRDdHguYmQgPSBbXSksIFwiXFxiXCIpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHRcdDogZXFcblx0XHRcdC8vIG5hbWVkIHBhcmFtLiBSZW1vdmUgYmluZGluZ3MgZm9yIGFyZyBhbmQgY3JlYXRlIGluc3RlYWQgYmluZGluZ3MgYXJyYXkgZm9yIHByb3Bcblx0XHRcdFx0XHRcdD8gKGZuRHAgJiYgc3ludGF4RXJyb3IocGFyYW1zKSwgYmluZGluZ3MgJiYgcGF0aEJpbmRpbmdzLnBvcCgpLCBuYW1lZCA9IFwiX1wiICsgcGF0aCwgYm91bmROYW1lID0gYm91bmQsIHBhcmFtSW5kZXggPSBpbmQgKyBhbGwubGVuZ3RoLFxuXHRcdFx0XHRcdFx0XHRcdGJpbmRpbmdzICYmICgoYmluZGluZ3MgPSBibmRDdHguYmQgPSBwYXRoQmluZGluZ3NbbmFtZWRdID0gW10pLCBiaW5kaW5ncy5za3AgPSAhYm91bmQpLCBwYXRoICsgJzonKVxuXHRcdFx0XHRcdFx0OiBwYXRoXG5cdFx0XHQvLyBwYXRoXG5cdFx0XHRcdFx0XHRcdD8gKHBhdGguc3BsaXQoXCJeXCIpLmpvaW4oXCIuXCIpLnJlcGxhY2UoJHN1Yi5yUGF0aCwgcGFyc2VQYXRoKVxuXHRcdFx0XHRcdFx0XHRcdCsgKHBybiB8fCBvcGVyYXRvcilcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHQ6IG9wZXJhdG9yXG5cdFx0XHQvLyBvcGVyYXRvclxuXHRcdFx0XHRcdFx0XHRcdD8gb3BlcmF0b3Jcblx0XHRcdFx0XHRcdFx0XHQ6IHJ0UHJuXG5cdFx0XHQvLyBmdW5jdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0PyBydFBybiA9PT0gXCJdXCIgPyBcIildXCIgOiBcIilcIlxuXHRcdFx0XHRcdFx0XHRcdFx0OiBjb21tYVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ/IChmbkNhbGxbcHJuRHBdIHx8IHN5bnRheEVycm9yKHBhcmFtcyksIFwiLFwiKSAvLyBXZSBkb24ndCBhbGxvdyB0b3AtbGV2ZWwgbGl0ZXJhbCBhcnJheXMgb3Igb2JqZWN0c1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQ6IGxmdFBybjBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ/IFwiXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ6IChhcG9zZWQgPSBhcG9zLCBxdW90ZWQgPSBxdW90LCAnXCInKVxuXHRcdFx0KSlcblx0XHQpO1xuXG5cdFx0aWYgKCFhcG9zZWQgJiYgIXF1b3RlZCkge1xuXHRcdFx0aWYgKHJ0UHJuKSB7XG5cdFx0XHRcdGZuQ2FsbFtwcm5EcF0gPSBmYWxzZTtcblx0XHRcdFx0cHJuRHAtLTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoYmluZGluZ3MpIHtcblx0XHRcdGlmICghYXBvc2VkICYmICFxdW90ZWQpIHtcblx0XHRcdFx0aWYgKHJ0UHJuKSB7XG5cdFx0XHRcdFx0aWYgKHByblN0YWNrW3BybkRwKzFdKSB7XG5cdFx0XHRcdFx0XHRibmRDdHggPSBibmRTdGFja1stLWZuRHBdO1xuXHRcdFx0XHRcdFx0cHJuU3RhY2tbcHJuRHArMV0gPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cHJuU3RhcnQgPSBwcm5JbmRbcHJuRHArMV07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHBybikge1xuXHRcdFx0XHRcdHBybkluZFtwcm5EcCsxXSA9IGNvbXBpbGVkUGF0aFtmbkRwXS5sZW5ndGggKyAobGZ0UHJuID8gMSA6IDApO1xuXHRcdFx0XHRcdGlmIChwYXRoIHx8IHJ0UHJuKSB7XG5cdFx0XHRcdFx0XHRibmRDdHggPSBibmRTdGFja1srK2ZuRHBdID0ge2JkOiBbXX07XG5cdFx0XHRcdFx0XHRwcm5TdGFja1twcm5EcCsxXSA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbXBpbGVkUGF0aFtmbkRwXSA9IChjb21waWxlZFBhdGhbZm5EcF18fFwiXCIpICsgZnVsbC5zbGljZShwcmV2SW5kZXgsIGluZGV4KTtcblx0XHRcdHByZXZJbmRleCA9IGluZGV4K2FsbC5sZW5ndGg7XG5cblx0XHRcdGlmICghYXBvc2VkICYmICFxdW90ZWQpIHtcblx0XHRcdFx0aWYgKGxmdFBybkZDYWxsID0gbGZ0UHJuICYmIHByblN0YWNrW3BybkRwKzFdKSB7XG5cdFx0XHRcdFx0Y29tcGlsZWRQYXRoW2ZuRHAtMV0gKz0gbGZ0UHJuO1xuXHRcdFx0XHRcdGNvbXBpbGVkUGF0aFN0YXJ0W2ZuRHAtMV0rKztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAocHJuID09PSBcIihcIiAmJiBzdWJQYXRoICYmICFuZXdPYikge1xuXHRcdFx0XHRcdGNvbXBpbGVkUGF0aFtmbkRwXSA9IGNvbXBpbGVkUGF0aFtmbkRwLTFdLnNsaWNlKHByblN0YXJ0KSArIGNvbXBpbGVkUGF0aFtmbkRwXTtcblx0XHRcdFx0XHRjb21waWxlZFBhdGhbZm5EcC0xXSA9IGNvbXBpbGVkUGF0aFtmbkRwLTFdLnNsaWNlKDAsIHByblN0YXJ0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y29tcGlsZWRQYXRoW2ZuRHBdICs9IGxmdFBybkZDYWxsID8gcmV0LnNsaWNlKDEpIDogcmV0O1xuXHRcdH1cblxuXHRcdGlmICghYXBvc2VkICYmICFxdW90ZWQgJiYgcHJuKSB7XG5cdFx0XHRwcm5EcCsrO1xuXHRcdFx0aWYgKHBhdGggJiYgcHJuID09PSBcIihcIikge1xuXHRcdFx0XHRmbkNhbGxbcHJuRHBdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIWFwb3NlZCAmJiAhcXVvdGVkICYmIHBybjIpIHtcblx0XHRcdGlmIChiaW5kaW5ncykge1xuXHRcdFx0XHRjb21waWxlZFBhdGhbZm5EcF0gKz0gcHJuO1xuXHRcdFx0fVxuXHRcdFx0cmV0ICs9IHBybjtcblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdHZhciBuYW1lZCwgYmluZHRvLCBib3VuZE5hbWUsIHJlc3VsdCxcblx0XHRxdW90ZWQsIC8vIGJvb2xlYW4gZm9yIHN0cmluZyBjb250ZW50IGluIGRvdWJsZSBxdW90ZXNcblx0XHRhcG9zZWQsIC8vIG9yIGluIHNpbmdsZSBxdW90ZXNcblx0XHRiaW5kaW5ncyA9IHBhdGhCaW5kaW5ncyAmJiBwYXRoQmluZGluZ3NbMF0sIC8vIGJpbmRpbmdzIGFycmF5IGZvciB0aGUgZmlyc3QgYXJnXG5cdFx0Ym5kQ3R4ID0ge2JkOiBiaW5kaW5nc30sXG5cdFx0Ym5kU3RhY2sgPSB7MDogYm5kQ3R4fSxcblx0XHRwYXJhbUluZGV4ID0gMCwgLy8gbGlzdCxcblx0XHQvLyBUaGUgZm9sbG93aW5nIGFyZSB1c2VkIGZvciB0cmFja2luZyBwYXRoIHBhcnNpbmcgaW5jbHVkaW5nIG5lc3RlZCBwYXRocywgc3VjaCBhcyBcImEuYihjXmQgKyAoZSkpXmZcIiwgYW5kIGNoYWluZWQgY29tcHV0ZWQgcGF0aHMgc3VjaCBhc1xuXHRcdC8vIFwiYS5iKCkuY15kKCkuZS5mKCkuZ1wiIC0gd2hpY2ggaGFzIGZvdXIgY2hhaW5lZCBwYXRocywgXCJhLmIoKVwiLCBcIl5jLmQoKVwiLCBcIi5lLmYoKVwiIGFuZCBcIi5nXCJcblx0XHRwcm5EcCA9IDAsICAgICAvLyBGb3IgdHJhY2tpbmcgcGFyZW4gZGVwdGggKG5vdCBmdW5jdGlvbiBjYWxsIHBhcmVucylcblx0XHRmbkRwID0gMCwgICAgICAvLyBGb3IgdHJhY2tpbmcgZGVwdGggb2YgZnVuY3Rpb24gY2FsbCBwYXJlbnNcblx0XHRwcm5JbmQgPSB7fSwgICAvLyBXZSBhcmUgaW4gYSBmdW5jdGlvbiBjYWxsXG5cdFx0cHJuU3RhcnQgPSAwLCAgLy8gdHJhY2tzIHRoZSBzdGFydCBvZiB0aGUgY3VycmVudCBwYXRoIHN1Y2ggYXMgY15kKCkgaW4gdGhlIGFib3ZlIGV4YW1wbGVcblx0XHRwcm5TdGFjayA9IHt9LCAvLyB0cmFja3MgcGFyZW5zIHdoaWNoIGFyZSBub3QgZnVuY3Rpb24gY2FsbHMsIGFuZCBzbyBhcmUgYXNzb2NpYXRlZCB3aXRoIG5ldyBibmRTdGFjayBjb250ZXh0c1xuXHRcdGZuQ2FsbCA9IHt9LCAgIC8vIFdlIGFyZSBpbiBhIGZ1bmN0aW9uIGNhbGxcblx0XHRwYXRoU3RhcnQgPSB7fSwvLyB0cmFja3MgdGhlIHN0YXJ0IG9mIHRoZSBjdXJyZW50IHBhdGggc3VjaCBhcyBjXmQoKSBpbiB0aGUgYWJvdmUgZXhhbXBsZVxuXHRcdGNvbXBpbGVkUGF0aFN0YXJ0ID0gezA6IDB9LFxuXHRcdGNvbXBpbGVkUGF0aCA9IHswOlwiXCJ9LFxuXHRcdHByZXZJbmRleCA9IDA7XG5cblx0aWYgKHBhcmFtc1swXSA9PT0gXCJAXCIpIHtcblx0XHRwYXJhbXMgPSBwYXJhbXMucmVwbGFjZShyQnJhY2tldFF1b3RlLCBcIi5cIik7XG5cdH1cblx0cmVzdWx0ID0gKHBhcmFtcyArICh0bXBsID8gXCIgXCIgOiBcIlwiKSkucmVwbGFjZSgkc3ViLnJQcm0sIHBhcnNlVG9rZW5zKTtcblxuXHRpZiAoYmluZGluZ3MpIHtcblx0XHRyZXN1bHQgPSBjb21waWxlZFBhdGhbMF07XG5cdH1cblxuXHRyZXR1cm4gIXBybkRwICYmIHJlc3VsdCB8fCBzeW50YXhFcnJvcihwYXJhbXMpOyAvLyBTeW50YXggZXJyb3IgaWYgdW5iYWxhbmNlZCBwYXJlbnMgaW4gcGFyYW1zIGV4cHJlc3Npb25cbn1cblxuZnVuY3Rpb24gYnVpbGRDb2RlKGFzdCwgdG1wbCwgaXNMaW5rRXhwcikge1xuXHQvLyBCdWlsZCB0aGUgdGVtcGxhdGUgZnVuY3Rpb24gY29kZSBmcm9tIHRoZSBBU1Qgbm9kZXMsIGFuZCBzZXQgYXMgcHJvcGVydHkgb24gdGhlIHBhc3NlZC1pbiB0ZW1wbGF0ZSBvYmplY3Rcblx0Ly8gVXNlZCBmb3IgY29tcGlsaW5nIHRlbXBsYXRlcywgYW5kIGFsc28gYnkgSnNWaWV3cyB0byBidWlsZCBmdW5jdGlvbnMgZm9yIGRhdGEgbGluayBleHByZXNzaW9uc1xuXHR2YXIgaSwgbm9kZSwgdGFnTmFtZSwgY29udmVydGVyLCB0YWdDdHgsIGhhc1RhZywgaGFzRW5jb2RlciwgZ2V0c1ZhbCwgaGFzQ252dCwgdXNlQ252dCwgdG1wbEJpbmRpbmdzLCBwYXRoQmluZGluZ3MsIHBhcmFtcywgYm91bmRPbkVyclN0YXJ0LFxuXHRcdGJvdW5kT25FcnJFbmQsIHRhZ1JlbmRlciwgbmVzdGVkVG1wbHMsIHRtcGxOYW1lLCBuZXN0ZWRUbXBsLCB0YWdBbmRFbHNlcywgY29udGVudCwgbWFya3VwLCBuZXh0SXNFbHNlLCBvbGRDb2RlLCBpc0Vsc2UsIGlzR2V0VmFsLCB0YWdDdHhGbixcblx0XHRvbkVycm9yLCB0YWdTdGFydCwgdHJpZ2dlciwgbGF0ZVJlbmRlciwgcmV0U3RyT3BlbiwgcmV0U3RyQ2xvc2UsXG5cdFx0dG1wbEJpbmRpbmdLZXkgPSAwLFxuXHRcdHVzZVZpZXdzID0gJHN1YlNldHRpbmdzQWR2YW5jZWQudXNlVmlld3MgfHwgdG1wbC51c2VWaWV3cyB8fCB0bXBsLnRhZ3MgfHwgdG1wbC50ZW1wbGF0ZXMgfHwgdG1wbC5oZWxwZXJzIHx8IHRtcGwuY29udmVydGVycyxcblx0XHRjb2RlID0gXCJcIixcblx0XHR0bXBsT3B0aW9ucyA9IHt9LFxuXHRcdGwgPSBhc3QubGVuZ3RoO1xuXG5cdGlmICh0eXBlb2YgdG1wbCA9PT0gU1RSSU5HKSB7XG5cdFx0dG1wbE5hbWUgPSBpc0xpbmtFeHByID8gJ2RhdGEtbGluaz1cIicgKyB0bXBsLnJlcGxhY2Uock5ld0xpbmUsIFwiIFwiKS5zbGljZSgxLCAtMSkgKyAnXCInIDogdG1wbDtcblx0XHR0bXBsID0gMDtcblx0fSBlbHNlIHtcblx0XHR0bXBsTmFtZSA9IHRtcGwudG1wbE5hbWUgfHwgXCJ1bm5hbWVkXCI7XG5cdFx0aWYgKHRtcGwuYWxsb3dDb2RlKSB7XG5cdFx0XHR0bXBsT3B0aW9ucy5hbGxvd0NvZGUgPSB0cnVlO1xuXHRcdH1cblx0XHRpZiAodG1wbC5kZWJ1Zykge1xuXHRcdFx0dG1wbE9wdGlvbnMuZGVidWcgPSB0cnVlO1xuXHRcdH1cblx0XHR0bXBsQmluZGluZ3MgPSB0bXBsLmJuZHM7XG5cdFx0bmVzdGVkVG1wbHMgPSB0bXBsLnRtcGxzO1xuXHR9XG5cdGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcblx0XHQvLyBBU1Qgbm9kZXM6IFswOiB0YWdOYW1lLCAxOiBjb252ZXJ0ZXIsIDI6IGNvbnRlbnQsIDM6IHBhcmFtcywgNDogY29kZSwgNTogb25FcnJvciwgNjogdHJpZ2dlciwgNzpwYXRoQmluZGluZ3MsIDg6IGNvbnRlbnRNYXJrdXBdXG5cdFx0bm9kZSA9IGFzdFtpXTtcblxuXHRcdC8vIEFkZCBuZXdsaW5lIGZvciBlYWNoIGNhbGxvdXQgdG8gdCgpIGMoKSBldGMuIGFuZCBlYWNoIG1hcmt1cCBzdHJpbmdcblx0XHRpZiAodHlwZW9mIG5vZGUgPT09IFNUUklORykge1xuXHRcdFx0Ly8gYSBtYXJrdXAgc3RyaW5nIHRvIGJlIGluc2VydGVkXG5cdFx0XHRjb2RlICs9ICcrXCInICsgbm9kZSArICdcIic7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGEgY29tcGlsZWQgdGFnIGV4cHJlc3Npb24gdG8gYmUgaW5zZXJ0ZWRcblx0XHRcdHRhZ05hbWUgPSBub2RlWzBdO1xuXHRcdFx0aWYgKHRhZ05hbWUgPT09IFwiKlwiKSB7XG5cdFx0XHRcdC8vIENvZGUgdGFnOiB7eyogfX1cblx0XHRcdFx0Y29kZSArPSBcIjtcXG5cIiArIG5vZGVbMV0gKyBcIlxcbnJldD1yZXRcIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnZlcnRlciA9IG5vZGVbMV07XG5cdFx0XHRcdGNvbnRlbnQgPSAhaXNMaW5rRXhwciAmJiBub2RlWzJdO1xuXHRcdFx0XHR0YWdDdHggPSBwYXJhbVN0cnVjdHVyZShub2RlWzNdLCBwYXJhbXMgPSBub2RlWzRdKTtcblx0XHRcdFx0dHJpZ2dlciA9IG5vZGVbNl07XG5cdFx0XHRcdGxhdGVSZW5kZXIgPSBub2RlWzddO1xuXHRcdFx0XHRpZiAobm9kZVs4XSkgeyAvLyBsYXRlUGF0aCBAYS5iLmMgb3IgQH5hLmIuY1xuXHRcdFx0XHRcdHJldFN0ck9wZW4gPSBcIlxcbnZhciBvYixsdE9iPXt9LGN0eHM9XCI7XG5cdFx0XHRcdFx0cmV0U3RyQ2xvc2UgPSBcIjtcXG5jdHhzLmx0PWx0T2IubHQ7XFxucmV0dXJuIGN0eHM7XCI7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmV0U3RyT3BlbiA9IFwiXFxucmV0dXJuIFwiO1xuXHRcdFx0XHRcdHJldFN0ckNsb3NlID0gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRtYXJrdXAgPSBub2RlWzEwXSAmJiBub2RlWzEwXS5yZXBsYWNlKHJVbmVzY2FwZVF1b3RlcywgXCIkMVwiKTtcblx0XHRcdFx0aWYgKGlzRWxzZSA9IHRhZ05hbWUgPT09IFwiZWxzZVwiKSB7XG5cdFx0XHRcdFx0aWYgKHBhdGhCaW5kaW5ncykge1xuXHRcdFx0XHRcdFx0cGF0aEJpbmRpbmdzLnB1c2gobm9kZVs5XSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG9uRXJyb3IgPSBub2RlWzVdIHx8ICRzdWJTZXR0aW5ncy5kZWJ1Z01vZGUgIT09IGZhbHNlICYmIFwidW5kZWZpbmVkXCI7IC8vIElmIGRlYnVnTW9kZSBub3QgZmFsc2UsIHNldCBkZWZhdWx0IG9uRXJyb3IgaGFuZGxlciBvbiB0YWcgdG8gXCJ1bmRlZmluZWRcIiAoc2VlIG9uUmVuZGVyRXJyb3IpXG5cdFx0XHRcdFx0aWYgKHRtcGxCaW5kaW5ncyAmJiAocGF0aEJpbmRpbmdzID0gbm9kZVs5XSkpIHsgLy8gQXJyYXkgb2YgcGF0aHMsIG9yIGZhbHNlIGlmIG5vdCBkYXRhLWJvdW5kXG5cdFx0XHRcdFx0XHRwYXRoQmluZGluZ3MgPSBbcGF0aEJpbmRpbmdzXTtcblx0XHRcdFx0XHRcdHRtcGxCaW5kaW5nS2V5ID0gdG1wbEJpbmRpbmdzLnB1c2goMSk7IC8vIEFkZCBwbGFjZWhvbGRlciBpbiB0bXBsQmluZGluZ3MgZm9yIGNvbXBpbGVkIGZ1bmN0aW9uXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHVzZVZpZXdzID0gdXNlVmlld3MgfHwgcGFyYW1zWzFdIHx8IHBhcmFtc1syXSB8fCBwYXRoQmluZGluZ3MgfHwgL3ZpZXcuKD8haW5kZXgpLy50ZXN0KHBhcmFtc1swXSk7XG5cdFx0XHRcdC8vIHVzZVZpZXdzIGlzIGZvciBwZXJmIG9wdGltaXphdGlvbi4gRm9yIHJlbmRlcigpIHdlIG9ubHkgdXNlIHZpZXdzIGlmIG5lY2Vzc2FyeSAtIGZvciB0aGUgbW9yZSBhZHZhbmNlZCBzY2VuYXJpb3MuXG5cdFx0XHRcdC8vIFdlIHVzZSB2aWV3cyBpZiB0aGVyZSBhcmUgcHJvcHMsIGNvbnRleHR1YWwgcHJvcGVydGllcyBvciBhcmdzIHdpdGggIy4uLiAob3RoZXIgdGhhbiAjaW5kZXgpIC0gYnV0IHlvdSBjYW4gZm9yY2Vcblx0XHRcdFx0Ly8gdXNpbmcgdGhlIGZ1bGwgdmlldyBpbmZyYXN0cnVjdHVyZSwgKGFuZCBwYXkgYSBwZXJmIHByaWNlKSBieSBvcHRpbmcgaW46IFNldCB1c2VWaWV3czogdHJ1ZSBvbiB0aGUgdGVtcGxhdGUsIG1hbnVhbGx5Li4uXG5cdFx0XHRcdGlmIChpc0dldFZhbCA9IHRhZ05hbWUgPT09IFwiOlwiKSB7XG5cdFx0XHRcdFx0aWYgKGNvbnZlcnRlcikge1xuXHRcdFx0XHRcdFx0dGFnTmFtZSA9IGNvbnZlcnRlciA9PT0gSFRNTCA/IFwiPlwiIDogY29udmVydGVyICsgdGFnTmFtZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGNvbnRlbnQpIHsgLy8gVE9ETyBvcHRpbWl6ZSAtIGlmIGNvbnRlbnQubGVuZ3RoID09PSAwIG9yIGlmIHRoZXJlIGlzIGEgdG1wbD1cIi4uLlwiIHNwZWNpZmllZCAtIHNldCBjb250ZW50IHRvIG51bGwgLyBkb24ndCBydW4gdGhpcyBjb21waWxhdGlvbiBjb2RlIC0gc2luY2UgY29udGVudCB3b24ndCBnZXQgdXNlZCEhXG5cdFx0XHRcdFx0XHQvLyBDcmVhdGUgdGVtcGxhdGUgb2JqZWN0IGZvciBuZXN0ZWQgdGVtcGxhdGVcblx0XHRcdFx0XHRcdG5lc3RlZFRtcGwgPSB0bXBsT2JqZWN0KG1hcmt1cCwgdG1wbE9wdGlvbnMpO1xuXHRcdFx0XHRcdFx0bmVzdGVkVG1wbC50bXBsTmFtZSA9IHRtcGxOYW1lICsgXCIvXCIgKyB0YWdOYW1lO1xuXHRcdFx0XHRcdFx0Ly8gQ29tcGlsZSB0byBBU1QgYW5kIHRoZW4gdG8gY29tcGlsZWQgZnVuY3Rpb25cblx0XHRcdFx0XHRcdG5lc3RlZFRtcGwudXNlVmlld3MgPSBuZXN0ZWRUbXBsLnVzZVZpZXdzIHx8IHVzZVZpZXdzO1xuXHRcdFx0XHRcdFx0YnVpbGRDb2RlKGNvbnRlbnQsIG5lc3RlZFRtcGwpO1xuXHRcdFx0XHRcdFx0dXNlVmlld3MgPSBuZXN0ZWRUbXBsLnVzZVZpZXdzO1xuXHRcdFx0XHRcdFx0bmVzdGVkVG1wbHMucHVzaChuZXN0ZWRUbXBsKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoIWlzRWxzZSkge1xuXHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBub3QgYW4gZWxzZSB0YWcuXG5cdFx0XHRcdFx0XHR0YWdBbmRFbHNlcyA9IHRhZ05hbWU7XG5cdFx0XHRcdFx0XHR1c2VWaWV3cyA9IHVzZVZpZXdzIHx8IHRhZ05hbWUgJiYgKCEkdGFnc1t0YWdOYW1lXSB8fCAhJHRhZ3NbdGFnTmFtZV0uZmxvdyk7XG5cdFx0XHRcdFx0XHQvLyBTd2l0Y2ggdG8gYSBuZXcgY29kZSBzdHJpbmcgZm9yIHRoaXMgYm91bmQgdGFnIChhbmQgaXRzIGVsc2VzLCBpZiBpdCBoYXMgYW55KSAtIGZvciByZXR1cm5pbmcgdGhlIHRhZ0N0eHMgYXJyYXlcblx0XHRcdFx0XHRcdG9sZENvZGUgPSBjb2RlO1xuXHRcdFx0XHRcdFx0Y29kZSA9IFwiXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5leHRJc0Vsc2UgPSBhc3RbaSArIDFdO1xuXHRcdFx0XHRcdG5leHRJc0Vsc2UgPSBuZXh0SXNFbHNlICYmIG5leHRJc0Vsc2VbMF0gPT09IFwiZWxzZVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRhZ1N0YXJ0ID0gb25FcnJvciA/IFwiO1xcbnRyeXtcXG5yZXQrPVwiIDogXCJcXG4rXCI7XG5cdFx0XHRcdGJvdW5kT25FcnJTdGFydCA9IFwiXCI7XG5cdFx0XHRcdGJvdW5kT25FcnJFbmQgPSBcIlwiO1xuXG5cdFx0XHRcdGlmIChpc0dldFZhbCAmJiAocGF0aEJpbmRpbmdzIHx8IHRyaWdnZXIgfHwgY29udmVydGVyICYmIGNvbnZlcnRlciAhPT0gSFRNTCB8fCBsYXRlUmVuZGVyKSkge1xuXHRcdFx0XHRcdC8vIEZvciBjb252ZXJ0VmFsIHdlIG5lZWQgYSBjb21waWxlZCBmdW5jdGlvbiB0byByZXR1cm4gdGhlIG5ldyB0YWdDdHgocylcblx0XHRcdFx0XHR0YWdDdHhGbiA9IG5ldyBGdW5jdGlvbihcImRhdGEsdmlldyxqXCIsIFwiLy8gXCIgKyB0bXBsTmFtZSArIFwiIFwiICsgKCsrdG1wbEJpbmRpbmdLZXkpICsgXCIgXCIgKyB0YWdOYW1lXG5cdFx0XHRcdFx0XHQrIHJldFN0ck9wZW4gKyBcIntcIiArIHRhZ0N0eCArIFwifTtcIiArIHJldFN0ckNsb3NlKTtcblx0XHRcdFx0XHR0YWdDdHhGbi5fZXIgPSBvbkVycm9yO1xuXHRcdFx0XHRcdHRhZ0N0eEZuLl90YWcgPSB0YWdOYW1lO1xuXHRcdFx0XHRcdHRhZ0N0eEZuLl9iZCA9ICEhcGF0aEJpbmRpbmdzOyAvLyBkYXRhLWxpbmtlZCB0YWcge157Li4uL319XG5cdFx0XHRcdFx0dGFnQ3R4Rm4uX2xyID0gbGF0ZVJlbmRlcjtcblxuXHRcdFx0XHRcdGlmIChpc0xpbmtFeHByKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGFnQ3R4Rm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c2V0UGF0aHModGFnQ3R4Rm4sIHBhdGhCaW5kaW5ncyk7XG5cdFx0XHRcdFx0dGFnUmVuZGVyID0gJ2MoXCInICsgY29udmVydGVyICsgJ1wiLHZpZXcsJztcblx0XHRcdFx0XHR1c2VDbnZ0ID0gdHJ1ZTtcblx0XHRcdFx0XHRib3VuZE9uRXJyU3RhcnQgPSB0YWdSZW5kZXIgKyB0bXBsQmluZGluZ0tleSArIFwiLFwiO1xuXHRcdFx0XHRcdGJvdW5kT25FcnJFbmQgPSBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb2RlICs9IChpc0dldFZhbFxuXHRcdFx0XHRcdD8gKGlzTGlua0V4cHIgPyAob25FcnJvciA/IFwidHJ5e1xcblwiIDogXCJcIikgKyBcInJldHVybiBcIiA6IHRhZ1N0YXJ0KSArICh1c2VDbnZ0IC8vIENhbGwgX2NudnQgaWYgdGhlcmUgaXMgYSBjb252ZXJ0ZXI6IHt7Y252dDogLi4uIH19IG9yIHtee2NudnQ6IC4uLiB9fVxuXHRcdFx0XHRcdFx0PyAodXNlQ252dCA9IHVuZGVmaW5lZCwgdXNlVmlld3MgPSBoYXNDbnZ0ID0gdHJ1ZSwgdGFnUmVuZGVyICsgKHRhZ0N0eEZuXG5cdFx0XHRcdFx0XHRcdD8gKCh0bXBsQmluZGluZ3NbdG1wbEJpbmRpbmdLZXkgLSAxXSA9IHRhZ0N0eEZuKSwgdG1wbEJpbmRpbmdLZXkpIC8vIFN0b3JlIHRoZSBjb21waWxlZCB0YWdDdHhGbiBpbiB0bXBsLmJuZHMsIGFuZCBwYXNzIHRoZSBrZXkgdG8gY29udmVydFZhbCgpXG5cdFx0XHRcdFx0XHRcdDogXCJ7XCIgKyB0YWdDdHggKyBcIn1cIikgKyBcIilcIilcblx0XHRcdFx0XHRcdDogdGFnTmFtZSA9PT0gXCI+XCJcblx0XHRcdFx0XHRcdFx0PyAoaGFzRW5jb2RlciA9IHRydWUsIFwiaChcIiArIHBhcmFtc1swXSArIFwiKVwiKVxuXHRcdFx0XHRcdFx0XHQ6IChnZXRzVmFsID0gdHJ1ZSwgXCIoKHY9XCIgKyBwYXJhbXNbMF0gKyAnKSE9bnVsbD92OicgKyAoaXNMaW5rRXhwciA/ICdudWxsKScgOiAnXCJcIiknKSlcblx0XHRcdFx0XHRcdFx0Ly8gTm9uIHN0cmljdCBlcXVhbGl0eSBzbyBkYXRhLWxpbms9XCJ0aXRsZXs6ZXhwcn1cIiB3aXRoIGV4cHI9bnVsbC91bmRlZmluZWQgcmVtb3ZlcyB0aXRsZSBhdHRyaWJ1dGVcblx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0OiAoaGFzVGFnID0gdHJ1ZSwgXCJcXG57dmlldzp2aWV3LGNvbnRlbnQ6ZmFsc2UsdG1wbDpcIiAvLyBBZGQgdGhpcyB0YWdDdHggdG8gdGhlIGNvbXBpbGVkIGNvZGUgZm9yIHRoZSB0YWdDdHhzIHRvIGJlIHBhc3NlZCB0byByZW5kZXJUYWcoKVxuXHRcdFx0XHRcdFx0KyAoY29udGVudCA/IG5lc3RlZFRtcGxzLmxlbmd0aCA6IFwiZmFsc2VcIikgKyBcIixcIiAvLyBGb3IgYmxvY2sgdGFncywgcGFzcyBpbiB0aGUga2V5IChuZXN0ZWRUbXBscy5sZW5ndGgpIHRvIHRoZSBuZXN0ZWQgY29udGVudCB0ZW1wbGF0ZVxuXHRcdFx0XHRcdFx0KyB0YWdDdHggKyBcIn0sXCIpKTtcblxuXHRcdFx0XHRpZiAodGFnQW5kRWxzZXMgJiYgIW5leHRJc0Vsc2UpIHtcblx0XHRcdFx0XHQvLyBUaGlzIGlzIGEgZGF0YS1saW5rIGV4cHJlc3Npb24gb3IgYW4gaW5saW5lIHRhZyB3aXRob3V0IGFueSBlbHNlcywgb3IgdGhlIGxhc3Qge3tlbHNlfX0gb2YgYW4gaW5saW5lIHRhZ1xuXHRcdFx0XHRcdC8vIFdlIGNvbXBsZXRlIHRoZSBjb2RlIGZvciByZXR1cm5pbmcgdGhlIHRhZ0N0eHMgYXJyYXlcblx0XHRcdFx0XHRjb2RlID0gXCJbXCIgKyBjb2RlLnNsaWNlKDAsIC0xKSArIFwiXVwiO1xuXHRcdFx0XHRcdHRhZ1JlbmRlciA9ICd0KFwiJyArIHRhZ0FuZEVsc2VzICsgJ1wiLHZpZXcsdGhpcywnO1xuXHRcdFx0XHRcdGlmIChpc0xpbmtFeHByIHx8IHBhdGhCaW5kaW5ncykge1xuXHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIGJvdW5kIHRhZyAoZGF0YS1saW5rIGV4cHJlc3Npb24gb3IgaW5saW5lIGJvdW5kIHRhZyB7Xnt0YWcgLi4ufX0pIHNvIHdlIHN0b3JlIGEgY29tcGlsZWQgdGFnQ3R4cyBmdW5jdGlvbiBpbiB0bXAuYm5kc1xuXHRcdFx0XHRcdFx0Y29kZSA9IG5ldyBGdW5jdGlvbihcImRhdGEsdmlldyxqXCIsIFwiIC8vIFwiICsgdG1wbE5hbWUgKyBcIiBcIiArIHRtcGxCaW5kaW5nS2V5ICsgXCIgXCIgKyB0YWdBbmRFbHNlcyArIHJldFN0ck9wZW4gKyBjb2RlXG5cdFx0XHRcdFx0XHRcdCsgcmV0U3RyQ2xvc2UpO1xuXHRcdFx0XHRcdFx0Y29kZS5fZXIgPSBvbkVycm9yO1xuXHRcdFx0XHRcdFx0Y29kZS5fdGFnID0gdGFnQW5kRWxzZXM7XG5cdFx0XHRcdFx0XHRpZiAocGF0aEJpbmRpbmdzKSB7XG5cdFx0XHRcdFx0XHRcdHNldFBhdGhzKHRtcGxCaW5kaW5nc1t0bXBsQmluZGluZ0tleSAtIDFdID0gY29kZSwgcGF0aEJpbmRpbmdzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvZGUuX2xyID0gbGF0ZVJlbmRlcjtcblx0XHRcdFx0XHRcdGlmIChpc0xpbmtFeHByKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBjb2RlOyAvLyBGb3IgYSBkYXRhLWxpbmsgZXhwcmVzc2lvbiB3ZSByZXR1cm4gdGhlIGNvbXBpbGVkIHRhZ0N0eHMgZnVuY3Rpb25cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJvdW5kT25FcnJTdGFydCA9IHRhZ1JlbmRlciArIHRtcGxCaW5kaW5nS2V5ICsgXCIsdW5kZWZpbmVkLFwiO1xuXHRcdFx0XHRcdFx0Ym91bmRPbkVyckVuZCA9IFwiKVwiO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFRoaXMgaXMgdGhlIGxhc3Qge3tlbHNlfX0gZm9yIGFuIGlubGluZSB0YWcuXG5cdFx0XHRcdFx0Ly8gRm9yIGEgYm91bmQgdGFnLCBwYXNzIHRoZSB0YWdDdHhzIGZuIGxvb2t1cCBrZXkgdG8gcmVuZGVyVGFnLlxuXHRcdFx0XHRcdC8vIEZvciBhbiB1bmJvdW5kIHRhZywgaW5jbHVkZSB0aGUgY29kZSBkaXJlY3RseSBmb3IgZXZhbHVhdGluZyB0YWdDdHhzIGFycmF5XG5cdFx0XHRcdFx0Y29kZSA9IG9sZENvZGUgKyB0YWdTdGFydCArIHRhZ1JlbmRlciArIChwYXRoQmluZGluZ3MgJiYgdG1wbEJpbmRpbmdLZXkgfHwgY29kZSkgKyBcIilcIjtcblx0XHRcdFx0XHRwYXRoQmluZGluZ3MgPSAwO1xuXHRcdFx0XHRcdHRhZ0FuZEVsc2VzID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob25FcnJvciAmJiAhbmV4dElzRWxzZSkge1xuXHRcdFx0XHRcdHVzZVZpZXdzID0gdHJ1ZTtcblx0XHRcdFx0XHRjb2RlICs9ICc7XFxufWNhdGNoKGUpe3JldCcgKyAoaXNMaW5rRXhwciA/IFwidXJuIFwiIDogXCIrPVwiKSArIGJvdW5kT25FcnJTdGFydCArICdqLl9lcnIoZSx2aWV3LCcgKyBvbkVycm9yICsgJyknICsgYm91bmRPbkVyckVuZCArICc7fScgKyAoaXNMaW5rRXhwciA/IFwiXCIgOiAnXFxucmV0PXJldCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdC8vIEluY2x1ZGUgb25seSB0aGUgdmFyIHJlZmVyZW5jZXMgdGhhdCBhcmUgbmVlZGVkIGluIHRoZSBjb2RlXG5cdGNvZGUgPSBcIi8vIFwiICsgdG1wbE5hbWVcblx0XHQrICh0bXBsT3B0aW9ucy5kZWJ1ZyA/IFwiXFxuZGVidWdnZXI7XCIgOiBcIlwiKVxuXHRcdCsgXCJcXG52YXIgdlwiXG5cdFx0KyAoaGFzVGFnID8gXCIsdD1qLl90YWdcIiA6IFwiXCIpICAgICAgICAgICAgICAgIC8vIGhhcyB0YWdcblx0XHQrIChoYXNDbnZ0ID8gXCIsYz1qLl9jbnZ0XCIgOiBcIlwiKSAgICAgICAgICAgICAgLy8gY29udmVydGVyXG5cdFx0KyAoaGFzRW5jb2RlciA/IFwiLGg9ai5faHRtbFwiIDogXCJcIikgICAgICAgICAgIC8vIGh0bWwgY29udmVydGVyXG5cdFx0KyAoaXNMaW5rRXhwclxuXHRcdFx0XHQ/IChub2RlWzhdIC8vIGxhdGUgQC4uLiBwYXRoP1xuXHRcdFx0XHRcdFx0PyBcIiwgb2JcIlxuXHRcdFx0XHRcdFx0OiBcIlwiXG5cdFx0XHRcdFx0KSArIFwiO1xcblwiXG5cdFx0XHRcdDogJyxyZXQ9XCJcIicpXG5cdFx0KyBjb2RlXG5cdFx0KyAoaXNMaW5rRXhwciA/IFwiXFxuXCIgOiBcIjtcXG5yZXR1cm4gcmV0O1wiKTtcblxuXHR0cnkge1xuXHRcdGNvZGUgPSBuZXcgRnVuY3Rpb24oXCJkYXRhLHZpZXcsalwiLCBjb2RlKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHN5bnRheEVycm9yKFwiQ29tcGlsZWQgdGVtcGxhdGUgY29kZTpcXG5cXG5cIiArIGNvZGUgKyAnXFxuOiBcIicgKyAoZS5tZXNzYWdlfHxlKSArICdcIicpO1xuXHR9XG5cdGlmICh0bXBsKSB7XG5cdFx0dG1wbC5mbiA9IGNvZGU7XG5cdFx0dG1wbC51c2VWaWV3cyA9ICEhdXNlVmlld3M7XG5cdH1cblx0cmV0dXJuIGNvZGU7XG59XG5cbi8vPT09PT09PT09PVxuLy8gVXRpbGl0aWVzXG4vLz09PT09PT09PT1cblxuLy8gTWVyZ2Ugb2JqZWN0cywgaW4gcGFydGljdWxhciBjb250ZXh0cyB3aGljaCBpbmhlcml0IGZyb20gcGFyZW50IGNvbnRleHRzXG5mdW5jdGlvbiBleHRlbmRDdHgoY29udGV4dCwgcGFyZW50Q29udGV4dCkge1xuXHQvLyBSZXR1cm4gY29weSBvZiBwYXJlbnRDb250ZXh0LCB1bmxlc3MgY29udGV4dCBpcyBkZWZpbmVkIGFuZCBpcyBkaWZmZXJlbnQsIGluIHdoaWNoIGNhc2UgcmV0dXJuIGEgbmV3IG1lcmdlZCBjb250ZXh0XG5cdC8vIElmIG5laXRoZXIgY29udGV4dCBub3IgcGFyZW50Q29udGV4dCBhcmUgZGVmaW5lZCwgcmV0dXJuIHVuZGVmaW5lZFxuXHRyZXR1cm4gY29udGV4dCAmJiBjb250ZXh0ICE9PSBwYXJlbnRDb250ZXh0XG5cdFx0PyAocGFyZW50Q29udGV4dFxuXHRcdFx0PyAkZXh0ZW5kKCRleHRlbmQoe30sIHBhcmVudENvbnRleHQpLCBjb250ZXh0KVxuXHRcdFx0OiBjb250ZXh0KVxuXHRcdDogcGFyZW50Q29udGV4dCAmJiAkZXh0ZW5kKHt9LCBwYXJlbnRDb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0UHJvcHMoc291cmNlLCB0YWdDdHgpIHtcblx0Ly8gdGhpcyBwb2ludGVyIGlzIHRoZU1hcCAtIHdoaWNoIGhhcyB0YWdDdHgucHJvcHMgdG9vXG5cdC8vIGFyZ3VtZW50czogdGFnQ3R4LmFyZ3MuXG5cdHZhciBrZXksIHByb3AsXG5cdFx0bWFwID0gdGFnQ3R4Lm1hcCxcblx0XHRwcm9wc0FyciA9IG1hcCAmJiBtYXAucHJvcHNBcnI7XG5cblx0aWYgKCFwcm9wc0FycikgeyAvLyBtYXAucHJvcHNBcnIgaXMgdGhlIGZ1bGwgYXJyYXkgb2Yge2tleTouLi4sIHByb3A6Li4ufSBvYmplY3RzXG5cdFx0cHJvcHNBcnIgPSBbXTtcblx0XHRpZiAodHlwZW9mIHNvdXJjZSA9PT0gT0JKRUNUIHx8ICRpc0Z1bmN0aW9uKHNvdXJjZSkpIHtcblx0XHRcdGZvciAoa2V5IGluIHNvdXJjZSkge1xuXHRcdFx0XHRwcm9wID0gc291cmNlW2tleV07XG5cdFx0XHRcdGlmIChrZXkgIT09ICRleHBhbmRvICYmIHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICghdGFnQ3R4LnByb3BzLm5vRnVuY3Rpb25zIHx8ICEkaXNGdW5jdGlvbihwcm9wKSkpIHtcblx0XHRcdFx0XHRwcm9wc0Fyci5wdXNoKHtrZXk6IGtleSwgcHJvcDogcHJvcH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChtYXApIHtcblx0XHRcdG1hcC5wcm9wc0FyciA9IG1hcC5vcHRpb25zICYmIHByb3BzQXJyOyAvLyBJZiBib3VuZCB7Xntwcm9wc319IGFuZCBub3QgaXNSZW5kZXJDYWxsLCBzdG9yZSBwcm9wc0FyciBvbiBtYXAgKG1hcC5vcHRpb25zIGlzIGRlZmluZWQgb25seSBmb3IgYm91bmQsICYmICFpc1JlbmRlckNhbGwpXG5cdFx0fVxuXHR9XG5cdHJldHVybiBnZXRUYXJnZXRTb3J0ZWQocHJvcHNBcnIsIHRhZ0N0eCk7IC8vIE9idGFpbnMgbWFwLnRndCwgYnkgZmlsdGVyaW5nLCBzb3J0aW5nIGFuZCBzcGxpY2luZyB0aGUgZnVsbCBwcm9wc0FyclxufVxuXG5mdW5jdGlvbiBnZXRUYXJnZXRTb3J0ZWQodmFsdWUsIHRhZ0N0eCkge1xuXHQvLyBnZXRUZ3Rcblx0dmFyIG1hcHBlZCwgc3RhcnQsIGVuZCxcblx0XHR0YWcgPSB0YWdDdHgudGFnLFxuXHRcdHByb3BzID0gdGFnQ3R4LnByb3BzLFxuXHRcdHByb3BQYXJhbXMgPSB0YWdDdHgucGFyYW1zLnByb3BzLFxuXHRcdGZpbHRlciA9IHByb3BzLmZpbHRlcixcblx0XHRzb3J0ID0gcHJvcHMuc29ydCxcblx0XHRkaXJlY3RTb3J0ID0gc29ydCA9PT0gdHJ1ZSxcblx0XHRzdGVwID0gcGFyc2VJbnQocHJvcHMuc3RlcCksXG5cdFx0cmV2ZXJzZSA9IHByb3BzLnJldmVyc2UgPyAtMSA6IDE7XG5cblx0aWYgKCEkaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblx0aWYgKGRpcmVjdFNvcnQgfHwgc29ydCAmJiB0eXBlb2Ygc29ydCA9PT0gU1RSSU5HKSB7XG5cdFx0Ly8gVGVtcG9yYXJ5IG1hcHBlZCBhcnJheSBob2xkcyBvYmplY3RzIHdpdGggaW5kZXggYW5kIHNvcnQtdmFsdWVcblx0XHRtYXBwZWQgPSB2YWx1ZS5tYXAoZnVuY3Rpb24oaXRlbSwgaSkge1xuXHRcdFx0aXRlbSA9IGRpcmVjdFNvcnQgPyBpdGVtIDogZ2V0UGF0aE9iamVjdChpdGVtLCBzb3J0KTtcblx0XHRcdHJldHVybiB7aTogaSwgdjogdHlwZW9mIGl0ZW0gPT09IFNUUklORyA/IGl0ZW0udG9Mb3dlckNhc2UoKSA6IGl0ZW19O1xuXHRcdH0pO1xuXHRcdC8vIFNvcnQgbWFwcGVkIGFycmF5XG5cdFx0bWFwcGVkLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0cmV0dXJuIGEudiA+IGIudiA/IHJldmVyc2UgOiBhLnYgPCBiLnYgPyAtcmV2ZXJzZSA6IDA7XG5cdFx0fSk7XG5cdFx0Ly8gTWFwIHRvIG5ldyBhcnJheSB3aXRoIHJlc3VsdGluZyBvcmRlclxuXHRcdHZhbHVlID0gbWFwcGVkLm1hcChmdW5jdGlvbihpdGVtKXtcblx0XHRcdHJldHVybiB2YWx1ZVtpdGVtLmldO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKChzb3J0IHx8IHJldmVyc2UgPCAwKSAmJiAhdGFnLmRhdGFNYXApIHtcblx0XHR2YWx1ZSA9IHZhbHVlLnNsaWNlKCk7IC8vIENsb25lIGFycmF5IGZpcnN0IGlmIG5vdCBhbHJlYWR5IGEgbmV3IGFycmF5XG5cdH1cblx0aWYgKCRpc0Z1bmN0aW9uKHNvcnQpKSB7XG5cdFx0dmFsdWUgPSB2YWx1ZS5zb3J0KGZ1bmN0aW9uKCkgeyAvLyBXcmFwIHRoZSBzb3J0IGZ1bmN0aW9uIHRvIHByb3ZpZGUgdGFnQ3R4IGFzICd0aGlzJyBwb2ludGVyXG5cdFx0XHRyZXR1cm4gc29ydC5hcHBseSh0YWdDdHgsIGFyZ3VtZW50cyk7XG5cdFx0fSk7XG5cdH1cblx0aWYgKHJldmVyc2UgPCAwICYmICghc29ydCB8fCAkaXNGdW5jdGlvbihzb3J0KSkpIHsgLy8gUmV2ZXJzZSByZXN1bHQgaWYgbm90IGFscmVhZHkgcmV2ZXJzZWQgaW4gc29ydFxuXHRcdHZhbHVlID0gdmFsdWUucmV2ZXJzZSgpO1xuXHR9XG5cblx0aWYgKHZhbHVlLmZpbHRlciAmJiBmaWx0ZXIpIHsgLy8gSUU4IGRvZXMgbm90IHN1cHBvcnQgZmlsdGVyXG5cdFx0dmFsdWUgPSB2YWx1ZS5maWx0ZXIoZmlsdGVyLCB0YWdDdHgpO1xuXHRcdGlmICh0YWdDdHgudGFnLm9uRmlsdGVyKSB7XG5cdFx0XHR0YWdDdHgudGFnLm9uRmlsdGVyKHRhZ0N0eCk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKHByb3BQYXJhbXMuc29ydGVkKSB7XG5cdFx0bWFwcGVkID0gKHNvcnQgfHwgcmV2ZXJzZSA8IDApID8gdmFsdWUgOiB2YWx1ZS5zbGljZSgpO1xuXHRcdGlmICh0YWcuc29ydGVkKSB7XG5cdFx0XHQkLm9ic2VydmFibGUodGFnLnNvcnRlZCkucmVmcmVzaChtYXBwZWQpOyAvLyBOb3RlIHRoYXQgdGhpcyBtaWdodCBjYXVzZSB0aGUgc3RhcnQgYW5kIGVuZCBwcm9wcyB0byBiZSBtb2RpZmllZCAtIGUuZy4gYnkgcGFnZXIgdGFnIGNvbnRyb2xcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFnQ3R4Lm1hcC5zb3J0ZWQgPSBtYXBwZWQ7XG5cdFx0fVxuXHR9XG5cblx0c3RhcnQgPSBwcm9wcy5zdGFydDsgLy8gR2V0IGN1cnJlbnQgdmFsdWUgLSBhZnRlciBwb3NzaWJsZSBjaGFuZ2VzIHRyaWdnZXJlZCBieSB0YWcuc29ydGVkIHJlZnJlc2goKSBhYm92ZVxuXHRlbmQgPSBwcm9wcy5lbmQ7XG5cdGlmIChwcm9wUGFyYW1zLnN0YXJ0ICYmIHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgcHJvcFBhcmFtcy5lbmQgJiYgZW5kID09PSB1bmRlZmluZWQpIHtcblx0XHRzdGFydCA9IGVuZCA9IDA7XG5cdH1cblx0aWYgKCFpc05hTihzdGFydCkgfHwgIWlzTmFOKGVuZCkpIHsgLy8gc3RhcnQgb3IgZW5kIHNwZWNpZmllZCwgYnV0IG5vdCB0aGUgYXV0by1jcmVhdGUgTnVtYmVyIGFycmF5IHNjZW5hcmlvIG9mIHt7Zm9yIHN0YXJ0PXh4eCBlbmQ9eXl5fX1cblx0XHRzdGFydCA9ICtzdGFydCB8fCAwO1xuXHRcdGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHZhbHVlLmxlbmd0aCA/IHZhbHVlLmxlbmd0aCA6ICtlbmQ7XG5cdFx0dmFsdWUgPSB2YWx1ZS5zbGljZShzdGFydCwgZW5kKTtcblx0fVxuXHRpZiAoc3RlcCA+IDEpIHtcblx0XHRzdGFydCA9IDA7XG5cdFx0ZW5kID0gdmFsdWUubGVuZ3RoO1xuXHRcdG1hcHBlZCA9IFtdO1xuXHRcdGZvciAoOyBzdGFydDxlbmQ7IHN0YXJ0Kz1zdGVwKSB7XG5cdFx0XHRtYXBwZWQucHVzaCh2YWx1ZVtzdGFydF0pO1xuXHRcdH1cblx0XHR2YWx1ZSA9IG1hcHBlZDtcblx0fVxuXHRpZiAocHJvcFBhcmFtcy5wYWdlZCAmJiB0YWcucGFnZWQpIHtcblx0XHQkb2JzZXJ2YWJsZSh0YWcucGFnZWQpLnJlZnJlc2godmFsdWUpO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG4vKiogUmVuZGVyIHRoZSB0ZW1wbGF0ZSBhcyBhIHN0cmluZywgdXNpbmcgdGhlIHNwZWNpZmllZCBkYXRhIGFuZCBoZWxwZXJzL2NvbnRleHRcbiogJChcIiN0bXBsXCIpLnJlbmRlcigpXG4qXG4qIEBwYXJhbSB7YW55fSAgICAgICAgZGF0YVxuKiBAcGFyYW0ge2hhc2h9ICAgICAgIFtoZWxwZXJzT3JDb250ZXh0XVxuKiBAcGFyYW0ge2Jvb2xlYW59ICAgIFtub0l0ZXJhdGlvbl1cbiogQHJldHVybnMge3N0cmluZ30gICByZW5kZXJlZCB0ZW1wbGF0ZVxuKi9cbmZ1bmN0aW9uICRmblJlbmRlcihkYXRhLCBjb250ZXh0LCBub0l0ZXJhdGlvbikge1xuXHR2YXIgdG1wbEVsZW0gPSB0aGlzLmpxdWVyeSAmJiAodGhpc1swXSB8fCBlcnJvcignVW5rbm93biB0ZW1wbGF0ZScpKSwgLy8gVGFyZ2V0ZWQgZWxlbWVudCBub3QgZm91bmQgZm9yIGpRdWVyeSB0ZW1wbGF0ZSBzZWxlY3RvciBzdWNoIGFzIFwiI215VG1wbFwiXG5cdFx0dG1wbCA9IHRtcGxFbGVtLmdldEF0dHJpYnV0ZSh0bXBsQXR0cik7XG5cblx0cmV0dXJuIHJlbmRlckNvbnRlbnQuY2FsbCh0bXBsICYmICQuZGF0YSh0bXBsRWxlbSlbanN2VG1wbF0gfHwgJHRlbXBsYXRlcyh0bXBsRWxlbSksXG5cdFx0ZGF0YSwgY29udGV4dCwgbm9JdGVyYXRpb24pO1xufVxuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09IFJlZ2lzdGVyIGNvbnZlcnRlcnMgPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gZ2V0Q2hhckVudGl0eShjaCkge1xuXHQvLyBHZXQgY2hhcmFjdGVyIGVudGl0eSBmb3IgSFRNTCwgQXR0cmlidXRlIGFuZCBvcHRpb25hbCBkYXRhIGVuY29kaW5nXG5cdHJldHVybiBjaGFyRW50aXRpZXNbY2hdIHx8IChjaGFyRW50aXRpZXNbY2hdID0gXCImI1wiICsgY2guY2hhckNvZGVBdCgwKSArIFwiO1wiKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2hhckZyb21FbnRpdHkobWF0Y2gsIHRva2VuKSB7XG5cdC8vIEdldCBjaGFyYWN0ZXIgZnJvbSBIVE1MIGVudGl0eSwgZm9yIG9wdGlvbmFsIGRhdGEgdW5lbmNvZGluZ1xuXHRyZXR1cm4gY2hhcnNGcm9tRW50aXRpZXNbdG9rZW5dIHx8IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGh0bWxFbmNvZGUodGV4dCkge1xuXHQvLyBIVE1MIGVuY29kZTogUmVwbGFjZSA8ID4gJiAnIFwiIGAgZXRjLiBieSBjb3JyZXNwb25kaW5nIGVudGl0aWVzLlxuXHRyZXR1cm4gdGV4dCAhPSB1bmRlZmluZWQgPyBySXNIdG1sLnRlc3QodGV4dCkgJiYgKFwiXCIgKyB0ZXh0KS5yZXBsYWNlKHJIdG1sRW5jb2RlLCBnZXRDaGFyRW50aXR5KSB8fCB0ZXh0IDogXCJcIjtcbn1cblxuZnVuY3Rpb24gZGF0YUVuY29kZSh0ZXh0KSB7XG5cdC8vIEVuY29kZSBqdXN0IDwgPiBhbmQgJiAtIGludGVuZGVkIGZvciAnc2FmZSBkYXRhJyBhbG9uZyB3aXRoIHt7On19IHJhdGhlciB0aGFuIHt7Pn19XG4gIHJldHVybiB0eXBlb2YgdGV4dCA9PT0gU1RSSU5HID8gdGV4dC5yZXBsYWNlKHJEYXRhRW5jb2RlLCBnZXRDaGFyRW50aXR5KSA6IHRleHQ7XG59XG5cbmZ1bmN0aW9uIGRhdGFVbmVuY29kZSh0ZXh0KSB7XG4gIC8vIFVuZW5jb2RlIGp1c3QgPCA+IGFuZCAmIC0gaW50ZW5kZWQgZm9yICdzYWZlIGRhdGEnIGFsb25nIHdpdGgge3s6fX0gcmF0aGVyIHRoYW4ge3s+fX1cbiAgcmV0dXJuICB0eXBlb2YgdGV4dCA9PT0gU1RSSU5HID8gdGV4dC5yZXBsYWNlKHJEYXRhVW5lbmNvZGUsIGdldENoYXJGcm9tRW50aXR5KSA6IHRleHQ7XG59XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT0gSW5pdGlhbGl6ZSA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4kc3ViID0gJHZpZXdzLnN1YjtcbiR2aWV3c1NldHRpbmdzID0gJHZpZXdzLnNldHRpbmdzO1xuXG5pZiAoIShqc3IgfHwgJCAmJiAkLnJlbmRlcikpIHtcblx0Ly8gSnNSZW5kZXIvSnNWaWV3cyBub3QgYWxyZWFkeSBsb2FkZWQgKG9yIGxvYWRlZCB3aXRob3V0IGpRdWVyeSwgYW5kIHdlIGFyZSBub3cgbW92aW5nIGZyb20ganNyZW5kZXIgbmFtZXNwYWNlIHRvIGpRdWVyeSBuYW1lcGFjZSlcblx0Zm9yIChqc3ZTdG9yZU5hbWUgaW4ganN2U3RvcmVzKSB7XG5cdFx0cmVnaXN0ZXJTdG9yZShqc3ZTdG9yZU5hbWUsIGpzdlN0b3Jlc1tqc3ZTdG9yZU5hbWVdKTtcblx0fVxuXG5cdCRjb252ZXJ0ZXJzID0gJHZpZXdzLmNvbnZlcnRlcnM7XG5cdCRoZWxwZXJzID0gJHZpZXdzLmhlbHBlcnM7XG5cdCR0YWdzID0gJHZpZXdzLnRhZ3M7XG5cblx0JHN1Yi5fdGcucHJvdG90eXBlID0ge1xuXHRcdGJhc2VBcHBseTogYmFzZUFwcGx5LFxuXHRcdGN2dEFyZ3M6IGNvbnZlcnRBcmdzLFxuXHRcdGJuZEFyZ3M6IGNvbnZlcnRCb3VuZEFyZ3MsXG5cdFx0Y3R4UHJtOiBjb250ZXh0UGFyYW1ldGVyXG5cdH07XG5cblx0dG9wVmlldyA9ICRzdWIudG9wVmlldyA9IG5ldyBWaWV3KCk7XG5cblx0Ly9CUk9XU0VSLVNQRUNJRklDIENPREVcblx0aWYgKCQpIHtcblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBqUXVlcnkgKD0gJCkgaXMgbG9hZGVkXG5cblx0XHQkLmZuLnJlbmRlciA9ICRmblJlbmRlcjtcblx0XHQkZXhwYW5kbyA9ICQuZXhwYW5kbztcblx0XHRpZiAoJC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRpZiAodmVyc2lvbk51bWJlciAhPT0gKHZlcnNpb25OdW1iZXIgPSAkLnZpZXdzLmpzdmlld3MpKSB7XG5cdFx0XHRcdC8vIERpZmZlcmVudCB2ZXJzaW9uIG9mIGpzUmVuZGVyIHdhcyBsb2FkZWRcblx0XHRcdFx0dGhyb3cgXCJqcXVlcnkub2JzZXJ2YWJsZS5qcyByZXF1aXJlcyBqc3JlbmRlci5qcyBcIiArIHZlcnNpb25OdW1iZXI7XG5cdFx0XHR9XG5cdFx0XHQkZXh0ZW5kKCRzdWIsICQudmlld3Muc3ViKTsgLy8ganF1ZXJ5Lm9ic2VydmFibGUuanMgd2FzIGxvYWRlZCBiZWZvcmUganNyZW5kZXIuanNcblx0XHRcdCR2aWV3cy5tYXAgPSAkLnZpZXdzLm1hcDtcblx0XHR9XG5cblx0fSBlbHNlIHtcblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLyBqUXVlcnkgaXMgbm90IGxvYWRlZC5cblxuXHRcdCQgPSAgeyBqc3JlbmRlcjogdmVyc2lvbk51bWJlciB9O1xuXG5cdFx0aWYgKHNldEdsb2JhbHMpIHtcblx0XHRcdGdsb2JhbC5qc3JlbmRlciA9ICQ7IC8vIFdlIGFyZSBsb2FkaW5nIGpzcmVuZGVyLmpzIGZyb20gYSBzY3JpcHQgZWxlbWVudCwgbm90IEFNRCBvciBDb21tb25KUywgc28gc2V0IGdsb2JhbFxuXHRcdH1cblxuXHRcdC8vIEVycm9yIHdhcm5pbmcgaWYganNyZW5kZXIuanMgaXMgdXNlZCBhcyB0ZW1wbGF0ZSBlbmdpbmUgb24gTm9kZS5qcyAoZS5nLiBFeHByZXNzIG9yIEhhcGkuLi4pXG5cdFx0Ly8gVXNlIGpzcmVuZGVyLW5vZGUuanMgaW5zdGVhZC4uLlxuXHRcdCQucmVuZGVyRmlsZSA9ICQuX19leHByZXNzID0gJC5jb21waWxlID0gZnVuY3Rpb24oKSB7IHRocm93IFwiTm9kZS5qczogdXNlIG5wbSBqc3JlbmRlciwgb3IganNyZW5kZXItbm9kZS5qc1wiOyB9O1xuXG5cdFx0JHN1Yi5fanEgPSBmdW5jdGlvbihqcSkgeyAvLyBwcml2YXRlIG1ldGhvZCB0byBtb3ZlIGZyb20gSnNSZW5kZXIgQVBJcyBmcm9tIGpzcmVuZGVyIG5hbWVzcGFjZSB0byBqUXVlcnkgbmFtZXNwYWNlXG5cdFx0XHRpZiAoanEgIT09ICQpIHtcblx0XHRcdFx0JGV4dGVuZChqcSwgJCk7IC8vIG1hcCBvdmVyIGZyb20ganNyZW5kZXIgbmFtZXNwYWNlIHRvIGpRdWVyeSBuYW1lc3BhY2Vcblx0XHRcdFx0JCA9IGpxO1xuXHRcdFx0XHQkLmZuLnJlbmRlciA9ICRmblJlbmRlcjtcblx0XHRcdFx0ZGVsZXRlICQuanNyZW5kZXI7XG5cdFx0XHRcdCRleHBhbmRvID0gJC5leHBhbmRvO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblx0Ly9FTkQgT0YgQlJPV1NFUi1TUEVDSUZJQyBDT0RFXG5cblx0JHN1YlNldHRpbmdzID0gJHN1Yi5zZXR0aW5ncztcblx0JHN1YlNldHRpbmdzLmFsbG93Q29kZSA9IGZhbHNlO1xuXHQkLnJlbmRlciA9ICRyZW5kZXI7XG5cdCQudmlld3MgPSAkdmlld3M7XG5cdCQudGVtcGxhdGVzID0gJHRlbXBsYXRlcyA9ICR2aWV3cy50ZW1wbGF0ZXM7XG5cblx0Zm9yIChzZXR0aW5nIGluICRzdWJTZXR0aW5ncykge1xuXHRcdGFkZFNldHRpbmcoc2V0dGluZyk7XG5cdH1cblxuXHQvKipcblx0KiAkLnZpZXdzLnNldHRpbmdzLmRlYnVnTW9kZSh0cnVlKVxuXHQqIEBwYXJhbSB7Ym9vbGVhbn0gZGVidWdNb2RlXG5cdCogQHJldHVybnMge1NldHRpbmdzfVxuXHQqXG5cdCogZGVidWdNb2RlID0gJC52aWV3cy5zZXR0aW5ncy5kZWJ1Z01vZGUoKVxuXHQqIEByZXR1cm5zIHtib29sZWFufVxuXHQqL1xuXHQoJHZpZXdzU2V0dGluZ3MuZGVidWdNb2RlID0gZnVuY3Rpb24oZGVidWdNb2RlKSB7XG5cdFx0cmV0dXJuIGRlYnVnTW9kZSA9PT0gdW5kZWZpbmVkXG5cdFx0XHQ/ICRzdWJTZXR0aW5ncy5kZWJ1Z01vZGVcblx0XHRcdDogKFxuXHRcdFx0XHQkc3ViU2V0dGluZ3MuX2NsRm5zICYmICRzdWJTZXR0aW5ncy5fY2xGbnMoKSwgLy8gQ2xlYXIgbGlua0V4cHJTdG9yZSAoY2FjaGVkIGNvbXBpbGVkIGV4cHJlc3Npb25zKSwgc2luY2UgZGVidWdNb2RlIHNldHRpbmcgYWZmZWN0cyBjb21waWxhdGlvbiBmb3IgZXhwcmVzc2lvbnNcblx0XHRcdFx0JHN1YlNldHRpbmdzLmRlYnVnTW9kZSA9IGRlYnVnTW9kZSxcblx0XHRcdFx0JHN1YlNldHRpbmdzLm9uRXJyb3IgPSB0eXBlb2YgZGVidWdNb2RlID09PSBTVFJJTkdcblx0XHRcdFx0XHQ/IGZ1bmN0aW9uKCkgeyByZXR1cm4gZGVidWdNb2RlOyB9XG5cdFx0XHRcdFx0OiAkaXNGdW5jdGlvbihkZWJ1Z01vZGUpXG5cdFx0XHRcdFx0XHQ/IGRlYnVnTW9kZVxuXHRcdFx0XHRcdFx0OiB1bmRlZmluZWQsXG5cdFx0XHRcdCR2aWV3c1NldHRpbmdzKTtcblx0fSkoZmFsc2UpOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcblxuXHQkc3ViU2V0dGluZ3NBZHZhbmNlZCA9ICRzdWJTZXR0aW5ncy5hZHZhbmNlZCA9IHtcblx0XHRjYWNoZTogdHJ1ZSwgLy8gQnkgZGVmYXVsdCB1c2UgY2FjaGVkIHZhbHVlcyBvZiBjb21wdXRlZCB2YWx1ZXMgKE90aGVyd2lzZSwgc2V0IGFkdmFuY2VkIGNhY2hlIHNldHRpbmcgdG8gZmFsc2UpXG5cdFx0dXNlVmlld3M6IGZhbHNlLFxuXHRcdF9qc3Y6IGZhbHNlIC8vIEZvciBnbG9iYWwgYWNjZXNzIHRvIEpzVmlld3Mgc3RvcmVcblx0fTtcblxuXHQvLz09PT09PT09PT09PT09PT09PT09PT09PT09IFJlZ2lzdGVyIHRhZ3MgPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHQkdGFncyh7XG5cdFx0XCJpZlwiOiB7XG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKHZhbCkge1xuXHRcdFx0XHQvLyBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbmNlIGZvciB7e2lmfX0gYW5kIG9uY2UgZm9yIGVhY2gge3tlbHNlfX0uXG5cdFx0XHRcdC8vIFdlIHdpbGwgdXNlIHRoZSB0YWcucmVuZGVyaW5nIG9iamVjdCBmb3IgY2FycnlpbmcgcmVuZGVyaW5nIHN0YXRlIGFjcm9zcyB0aGUgY2FsbHMuXG5cdFx0XHRcdC8vIElmIG5vdCBkb25lIChhIHByZXZpb3VzIGJsb2NrIGhhcyBub3QgYmVlbiByZW5kZXJlZCksIGxvb2sgYXQgZXhwcmVzc2lvbiBmb3IgdGhpcyBibG9jayBhbmQgcmVuZGVyIHRoZSBibG9jayBpZiBleHByZXNzaW9uIGlzIHRydXRoeVxuXHRcdFx0XHQvLyBPdGhlcndpc2UgcmV0dXJuIFwiXCJcblx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRcdHRhZ0N0eCA9IHNlbGYudGFnQ3R4LFxuXHRcdFx0XHRcdHJldCA9IChzZWxmLnJlbmRlcmluZy5kb25lIHx8ICF2YWwgJiYgKHRhZ0N0eC5hcmdzLmxlbmd0aCB8fCAhdGFnQ3R4LmluZGV4KSlcblx0XHRcdFx0XHRcdD8gXCJcIlxuXHRcdFx0XHRcdFx0OiAoc2VsZi5yZW5kZXJpbmcuZG9uZSA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdHNlbGYuc2VsZWN0ZWQgPSB0YWdDdHguaW5kZXgsXG5cdFx0XHRcdFx0XHRcdHVuZGVmaW5lZCk7IC8vIFRlc3QgaXMgc2F0aXNmaWVkLCBzbyByZW5kZXIgY29udGVudCBvbiBjdXJyZW50IGNvbnRleHRcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH0sXG5cdFx0XHRjb250ZW50Q3R4OiB0cnVlLCAvLyBJbmhlcml0IHBhcmVudCB2aWV3IGRhdGEgY29udGV4dFxuXHRcdFx0ZmxvdzogdHJ1ZVxuXHRcdH0sXG5cdFx0XCJmb3JcIjoge1xuXHRcdFx0c29ydERhdGFNYXA6IGRhdGFNYXAoZ2V0VGFyZ2V0U29ydGVkKSxcblx0XHRcdGluaXQ6IGZ1bmN0aW9uKHZhbCwgY2xvbmVkKSB7XG5cdFx0XHRcdHRoaXMuc2V0RGF0YU1hcCh0aGlzLnRhZ0N0eHMpO1xuXHRcdFx0fSxcblx0XHRcdHJlbmRlcjogZnVuY3Rpb24odmFsKSB7XG5cdFx0XHRcdC8vIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIG9uY2UgZm9yIHt7Zm9yfX0gYW5kIG9uY2UgZm9yIGVhY2gge3tlbHNlfX0uXG5cdFx0XHRcdC8vIFdlIHdpbGwgdXNlIHRoZSB0YWcucmVuZGVyaW5nIG9iamVjdCBmb3IgY2FycnlpbmcgcmVuZGVyaW5nIHN0YXRlIGFjcm9zcyB0aGUgY2FsbHMuXG5cdFx0XHRcdHZhciB2YWx1ZSwgZmlsdGVyLCBzcnRGaWVsZCwgaXNBcnJheSwgaSwgc29ydGVkLCBlbmQsIHN0ZXAsXG5cdFx0XHRcdFx0c2VsZiA9IHRoaXMsXG5cdFx0XHRcdFx0dGFnQ3R4ID0gc2VsZi50YWdDdHgsXG5cdFx0XHRcdFx0cmFuZ2UgPSB0YWdDdHguYXJnRGVmYXVsdCA9PT0gZmFsc2UsXG5cdFx0XHRcdFx0cHJvcHMgPSB0YWdDdHgucHJvcHMsXG5cdFx0XHRcdFx0aXRlcmF0ZSA9IHJhbmdlIHx8IHRhZ0N0eC5hcmdzLmxlbmd0aCwgLy8gTm90IGZpbmFsIGVsc2UgYW5kIG5vdCBhdXRvLWNyZWF0ZSByYW5nZVxuXHRcdFx0XHRcdHJlc3VsdCA9IFwiXCIsXG5cdFx0XHRcdFx0ZG9uZSA9IDA7XG5cblx0XHRcdFx0aWYgKCFzZWxmLnJlbmRlcmluZy5kb25lKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBpdGVyYXRlID8gdmFsIDogdGFnQ3R4LnZpZXcuZGF0YTsgLy8gRm9yIHRoZSBmaW5hbCBlbHNlLCBkZWZhdWx0cyB0byBjdXJyZW50IGRhdGEgd2l0aG91dCBpdGVyYXRpb24uXG5cblx0XHRcdFx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdFx0XHRcdHJhbmdlID0gcHJvcHMucmV2ZXJzZSA/IFwidW5zaGlmdFwiIDogXCJwdXNoXCI7XG5cdFx0XHRcdFx0XHRlbmQgPSArcHJvcHMuZW5kO1xuXHRcdFx0XHRcdFx0c3RlcCA9ICtwcm9wcy5zdGVwIHx8IDE7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IFtdOyAvLyBhdXRvLWNyZWF0ZSBpbnRlZ2VyIGFycmF5IHNjZW5hcmlvIG9mIHt7Zm9yIHN0YXJ0PXh4eCBlbmQ9eXl5fX1cblx0XHRcdFx0XHRcdGZvciAoaSA9ICtwcm9wcy5zdGFydCB8fCAwOyAoZW5kIC0gaSkgKiBzdGVwID4gMDsgaSArPSBzdGVwKSB7XG5cdFx0XHRcdFx0XHRcdHZhbHVlW3JhbmdlXShpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGlzQXJyYXkgPSAkaXNBcnJheSh2YWx1ZSk7XG5cdFx0XHRcdFx0XHRyZXN1bHQgKz0gdGFnQ3R4LnJlbmRlcih2YWx1ZSwgIWl0ZXJhdGUgfHwgcHJvcHMubm9JdGVyYXRpb24pO1xuXHRcdFx0XHRcdFx0Ly8gSXRlcmF0ZXMgaWYgZGF0YSBpcyBhbiBhcnJheSwgZXhjZXB0IG9uIGZpbmFsIGVsc2UgLSBvciBpZiBub0l0ZXJhdGlvbiBwcm9wZXJ0eVxuXHRcdFx0XHRcdFx0Ly8gc2V0IHRvIHRydWUuIChVc2Uge3tpbmNsdWRlfX0gdG8gY29tcG9zZSB0ZW1wbGF0ZXMgd2l0aG91dCBhcnJheSBpdGVyYXRpb24pXG5cdFx0XHRcdFx0XHRkb25lICs9IGlzQXJyYXkgPyB2YWx1ZS5sZW5ndGggOiAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoc2VsZi5yZW5kZXJpbmcuZG9uZSA9IGRvbmUpIHtcblx0XHRcdFx0XHRcdHNlbGYuc2VsZWN0ZWQgPSB0YWdDdHguaW5kZXg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIElmIG5vdGhpbmcgd2FzIHJlbmRlcmVkIHdlIHdpbGwgbG9vayBhdCB0aGUgbmV4dCB7e2Vsc2V9fS4gT3RoZXJ3aXNlLCB3ZSBhcmUgZG9uZS5cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fSxcblx0XHRcdHNldERhdGFNYXA6IGZ1bmN0aW9uKHRhZ0N0eHMpIHtcblx0XHRcdFx0dmFyIHRhZ0N0eCwgcHJvcHMsIHBhcmFtc1Byb3BzLFxuXHRcdFx0XHRcdHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRcdGwgPSB0YWdDdHhzLmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKGwtLSkge1xuXHRcdFx0XHRcdHRhZ0N0eCA9IHRhZ0N0eHNbbF07XG5cdFx0XHRcdFx0cHJvcHMgPSB0YWdDdHgucHJvcHM7XG5cdFx0XHRcdFx0cGFyYW1zUHJvcHMgPSB0YWdDdHgucGFyYW1zLnByb3BzO1xuXHRcdFx0XHRcdHRhZ0N0eC5hcmdEZWZhdWx0ID0gcHJvcHMuZW5kID09PSB1bmRlZmluZWQgfHwgdGFnQ3R4LmFyZ3MubGVuZ3RoID4gMDsgLy8gRGVmYXVsdCB0byAjZGF0YSBleGNlcHQgZm9yIGF1dG8tY3JlYXRlIHJhbmdlIHNjZW5hcmlvIHt7Zm9yIHN0YXJ0PXh4eCBlbmQ9eXl5IHN0ZXA9enp6fX1cblx0XHRcdFx0XHRwcm9wcy5kYXRhTWFwID0gKHRhZ0N0eC5hcmdEZWZhdWx0ICE9PSBmYWxzZSAmJiAkaXNBcnJheSh0YWdDdHguYXJnc1swXSkgJiZcblx0XHRcdFx0XHRcdChwYXJhbXNQcm9wcy5zb3J0IHx8IHBhcmFtc1Byb3BzLnN0YXJ0IHx8IHBhcmFtc1Byb3BzLmVuZCB8fCBwYXJhbXNQcm9wcy5zdGVwIHx8IHBhcmFtc1Byb3BzLmZpbHRlciB8fCBwYXJhbXNQcm9wcy5yZXZlcnNlXG5cdFx0XHRcdFx0XHR8fCBwcm9wcy5zb3J0IHx8IHByb3BzLnN0YXJ0IHx8IHByb3BzLmVuZCB8fCBwcm9wcy5zdGVwIHx8IHByb3BzLmZpbHRlciB8fCBwcm9wcy5yZXZlcnNlKSlcblx0XHRcdFx0XHRcdCYmIHNlbGYuc29ydERhdGFNYXA7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRmbG93OiB0cnVlXG5cdFx0fSxcblx0XHRwcm9wczoge1xuXHRcdFx0YmFzZVRhZzogXCJmb3JcIixcblx0XHRcdGRhdGFNYXA6IGRhdGFNYXAoZ2V0VGFyZ2V0UHJvcHMpLFxuXHRcdFx0aW5pdDogbm9vcCwgLy8gRG9uJ3QgZXhlY3V0ZSB0aGUgYmFzZSBpbml0KCkgb2YgdGhlIFwiZm9yXCIgdGFnXG5cdFx0XHRmbG93OiB0cnVlXG5cdFx0fSxcblx0XHRpbmNsdWRlOiB7XG5cdFx0XHRmbG93OiB0cnVlXG5cdFx0fSxcblx0XHRcIipcIjoge1xuXHRcdFx0Ly8ge3sqIGNvZGUuLi4gfX0gLSBJZ25vcmVkIGlmIHRlbXBsYXRlLmFsbG93Q29kZSBhbmQgJC52aWV3cy5zZXR0aW5ncy5hbGxvd0NvZGUgYXJlIGZhbHNlLiBPdGhlcndpc2UgaW5jbHVkZSBjb2RlIGluIGNvbXBpbGVkIHRlbXBsYXRlXG5cdFx0XHRyZW5kZXI6IHJldFZhbCxcblx0XHRcdGZsb3c6IHRydWVcblx0XHR9LFxuXHRcdFwiOipcIjoge1xuXHRcdFx0Ly8ge3s6KiByZXR1cm5lZEV4cHJlc3Npb24gfX0gLSBJZ25vcmVkIGlmIHRlbXBsYXRlLmFsbG93Q29kZSBhbmQgJC52aWV3cy5zZXR0aW5ncy5hbGxvd0NvZGUgYXJlIGZhbHNlLiBPdGhlcndpc2UgaW5jbHVkZSBjb2RlIGluIGNvbXBpbGVkIHRlbXBsYXRlXG5cdFx0XHRyZW5kZXI6IHJldFZhbCxcblx0XHRcdGZsb3c6IHRydWVcblx0XHR9LFxuXHRcdGRiZzogJGhlbHBlcnMuZGJnID0gJGNvbnZlcnRlcnMuZGJnID0gZGJnQnJlYWsgLy8gUmVnaXN0ZXIge3tkYmcvfX0sIHt7ZGJnOi4uLn19IGFuZCB+ZGJnKCkgdG8gdGhyb3cgYW5kIGNhdGNoLCBhcyBicmVha3BvaW50cyBmb3IgZGVidWdnaW5nLlxuXHR9KTtcblxuXHQkY29udmVydGVycyh7XG5cdFx0aHRtbDogaHRtbEVuY29kZSxcblx0XHRhdHRyOiBodG1sRW5jb2RlLCAvLyBJbmNsdWRlcyA+IGVuY29kaW5nIHNpbmNlIHJDb252ZXJ0TWFya2VycyBpbiBKc1ZpZXdzIGRvZXMgbm90IHNraXAgPiBjaGFyYWN0ZXJzIGluIGF0dHJpYnV0ZSBzdHJpbmdzXG5cdFx0ZW5jb2RlOiBkYXRhRW5jb2RlLFxuXHRcdHVuZW5jb2RlOiBkYXRhVW5lbmNvZGUsIC8vIEluY2x1ZGVzID4gZW5jb2Rpbmcgc2luY2UgckNvbnZlcnRNYXJrZXJzIGluIEpzVmlld3MgZG9lcyBub3Qgc2tpcCA+IGNoYXJhY3RlcnMgaW4gYXR0cmlidXRlIHN0cmluZ3Ncblx0XHR1cmw6IGZ1bmN0aW9uKHRleHQpIHtcblx0XHRcdC8vIFVSTCBlbmNvZGluZyBoZWxwZXIuXG5cdFx0XHRyZXR1cm4gdGV4dCAhPSB1bmRlZmluZWQgPyBlbmNvZGVVUkkoXCJcIiArIHRleHQpIDogdGV4dCA9PT0gbnVsbCA/IHRleHQgOiBcIlwiOyAvLyBudWxsIHJldHVybnMgbnVsbCwgZS5nLiB0byByZW1vdmUgYXR0cmlidXRlLiB1bmRlZmluZWQgcmV0dXJucyBcIlwiXG5cdFx0fVxuXHR9KTtcbn1cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT0gRGVmaW5lIGRlZmF1bHQgZGVsaW1pdGVycyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuJHN1YlNldHRpbmdzID0gJHN1Yi5zZXR0aW5ncztcbiR2aWV3c1NldHRpbmdzLmRlbGltaXRlcnMoXCJ7e1wiLCBcIn19XCIsIFwiXlwiKTtcblxuaWYgKGpzclRvSnEpIHsgLy8gTW92aW5nIGZyb20ganNyZW5kZXIgbmFtZXNwYWNlIHRvIGpRdWVyeSBuYW1lcGFjZSAtIGNvcHkgb3ZlciB0aGUgc3RvcmVkIGl0ZW1zICh0ZW1wbGF0ZXMsIGNvbnZlcnRlcnMsIGhlbHBlcnMuLi4pXG5cdGpzci52aWV3cy5zdWIuX2pxKCQpO1xufVxucmV0dXJuICQgfHwganNyO1xufSwgd2luZG93KSk7XG4iLCIvKmdsb2JhbCBRVW5pdCwgdGVzdCwgZXF1YWwsIG9rKi9cbihmdW5jdGlvbih1bmRlZmluZWQpIHtcblwidXNlIHN0cmljdFwiO1xuXG5icm93c2VyaWZ5LmRvbmUudHdlbHZlID0gdHJ1ZTtcblxuUVVuaXQubW9kdWxlKFwiQnJvd3NlcmlmeSAtIGNsaWVudCBjb2RlXCIpO1xuXG52YXIgaXNJRTggPSB3aW5kb3cuYXR0YWNoRXZlbnQgJiYgIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyO1xuXG5pZiAoIWlzSUU4KSB7XG5cblFVbml0LnRlc3QoXCJObyBqUXVlcnkgZ2xvYmFsOiByZXF1aXJlKCdqc3JlbmRlcicpKCkgbmVzdGVkIHRlbXBsYXRlXCIsIGZ1bmN0aW9uKGFzc2VydCkge1xuXHQvLyAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uIEhpZGUgUVVuaXQgZ2xvYmFsIGpRdWVyeSBhbmQgYW55IHByZXZpb3VzIGdsb2JhbCBqc3JlbmRlci4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuXHR2YXIgalF1ZXJ5ID0gZ2xvYmFsLmpRdWVyeSwganNyID0gZ2xvYmFsLmpzcmVuZGVyO1xuXHRnbG9iYWwualF1ZXJ5ID0gZ2xvYmFsLmpzcmVuZGVyID0gdW5kZWZpbmVkO1xuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gQXJyYW5nZSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdHZhciBkYXRhID0ge25hbWU6IFwiSm9cIn07XG5cblx0Ly8gLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4gQWN0IC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cblx0dmFyIGpzcmVuZGVyID0gcmVxdWlyZSgnanNyZW5kZXInKSgpOyAvLyBOb3QgcGFzc2luZyBpbiBqUXVlcnksIHNvIHJldHVybnMgdGhlIGpzcmVuZGVyIG5hbWVzcGFjZVxuXG5cdC8vIFVzZSByZXF1aXJlIHRvIGdldCBzZXJ2ZXIgdGVtcGxhdGUsIHRoYW5rcyB0byBCcm93c2VyaWZ5IGJ1bmRsZSB0aGF0IHVzZWQganNyZW5kZXIvdG1wbGlmeSB0cmFuc2Zvcm1cblx0dmFyIHRtcGwgPSByZXF1aXJlKCcuLi90ZW1wbGF0ZXMvb3V0ZXIuaHRtbCcpKGpzcmVuZGVyKTsgLy8gUHJvdmlkZSBqc3JlbmRlclxuXG5cdHZhciByZXN1bHQgPSB0bXBsKGRhdGEpO1xuXG5cdHJlc3VsdCArPSBcIiBcIiArIChqc3JlbmRlciAhPT0galF1ZXJ5KTtcblxuXHQvLyAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uIEFzc2VydCAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cblx0YXNzZXJ0LmVxdWFsKHJlc3VsdCwgXCJOYW1lOiBKbyAob3V0ZXIuaHRtbCkgTmFtZTogSm8gKGlubmVyLmh0bWwpIHRydWVcIiwgXCJyZXN1bHQ6IE5vIGpRdWVyeSBnbG9iYWw6IHJlcXVpcmUoJ2pzcmVuZGVyJykoKSwgbmVzdGVkIHRlbXBsYXRlc1wiKTtcblxuXHQvLyAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uIFJlc2V0IC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuXHRnbG9iYWwualF1ZXJ5ID0galF1ZXJ5OyAvLyBSZXBsYWNlIFFVbml0IGdsb2JhbCBqUXVlcnlcblx0Z2xvYmFsLmpzcmVuZGVyID0ganNyOyAvLyBSZXBsYWNlIGFueSBwcmV2aW91cyBnbG9iYWwganNyZW5kZXJcbn0pO1xufVxufSkoKTtcbiIsInZhciB0bXBsUmVmcyA9IFtdLFxuICBta3VwID0gJ05hbWU6IHt7Om5hbWV9fSAoaW5uZXIuaHRtbCknLFxuICAkID0gZ2xvYmFsLmpzcmVuZGVyIHx8IGdsb2JhbC5qUXVlcnk7XG5cbm1vZHVsZS5leHBvcnRzID0gJCA/ICQudGVtcGxhdGVzKFwiLi90ZXN0L3RlbXBsYXRlcy9pbm5lci5odG1sXCIsIG1rdXApIDpcbiAgZnVuY3Rpb24oJCkge1xuICAgIGlmICghJCB8fCAhJC52aWV3cykge3Rocm93IFwiUmVxdWlyZXMganNyZW5kZXIvalF1ZXJ5XCI7fVxuICAgIHdoaWxlICh0bXBsUmVmcy5sZW5ndGgpIHtcbiAgICAgIHRtcGxSZWZzLnBvcCgpKCQpOyAvLyBjb21waWxlIG5lc3RlZCB0ZW1wbGF0ZVxuICAgIH1cblxuICAgIHJldHVybiAkLnRlbXBsYXRlcyhcIi4vdGVzdC90ZW1wbGF0ZXMvaW5uZXIuaHRtbFwiLCBta3VwKVxuICB9OyIsInZhciB0bXBsUmVmcyA9IFtdLFxuICBta3VwID0gJ05hbWU6IHt7Om5hbWV9fSAob3V0ZXIuaHRtbCkge3tpbmNsdWRlIHRtcGw9XFxcIi4vdGVzdC90ZW1wbGF0ZXMvaW5uZXIuaHRtbFxcXCIvfX0nLFxuICAkID0gZ2xvYmFsLmpzcmVuZGVyIHx8IGdsb2JhbC5qUXVlcnk7XG5cbnRtcGxSZWZzLnB1c2gocmVxdWlyZShcIi4vaW5uZXIuaHRtbFwiKSk7XG5tb2R1bGUuZXhwb3J0cyA9ICQgPyAkLnRlbXBsYXRlcyhcIi4vdGVzdC90ZW1wbGF0ZXMvb3V0ZXIuaHRtbFwiLCBta3VwKSA6XG4gIGZ1bmN0aW9uKCQpIHtcbiAgICBpZiAoISQgfHwgISQudmlld3MpIHt0aHJvdyBcIlJlcXVpcmVzIGpzcmVuZGVyL2pRdWVyeVwiO31cbiAgICB3aGlsZSAodG1wbFJlZnMubGVuZ3RoKSB7XG4gICAgICB0bXBsUmVmcy5wb3AoKSgkKTsgLy8gY29tcGlsZSBuZXN0ZWQgdGVtcGxhdGVcbiAgICB9XG5cbiAgICByZXR1cm4gJC50ZW1wbGF0ZXMoXCIuL3Rlc3QvdGVtcGxhdGVzL291dGVyLmh0bWxcIiwgbWt1cClcbiAgfTsiXX0=
