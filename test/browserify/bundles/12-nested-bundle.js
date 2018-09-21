(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*! JsRender v0.9.91 (Beta): http://jsviews.com/#jsrender */
/*! **VERSION FOR WEB** (For NODE.JS see http://jsviews.com/download/jsrender-node.js) */
/*
 * Best-of-breed templating in browser or on Node.js.
 * Does not require jQuery, or HTML DOM
 * Integrates with JsViews (http://jsviews.com/#jsviews)
 *
 * Copyright 2018, Boris Moore
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

var versionNumber = "v0.9.91",
	jsvStoreName, rTag, rTmplString, topView, $views,	$expando,
	_ocp = "_ocp", // Observable contextual parameter

//TODO	tmplFnsCache = {},
	$isFunction, $isArray, $templates, $converters, $helpers, $tags, $sub, $subSettings, $subSettingsAdvanced, $viewsSettings, delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar, setting, baseOnError,

	rPath = /^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
	//        not                               object     helper    view  viewProperty pathTokens      leafToken

	rParams = /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(~?[\w$.^]+)?\s*((\+\+|--)|\+|-|~(?![\w$_])|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?(@)?[#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g,
	//         lftPrn0          lftPrn        bound path             operator err                                         eq      path2 late            prn      comma  lftPrn2   apos quot        rtPrn  rtPrnDot                  prn2     space
	// (left paren? followed by (path? followed by operator) or (path followed by left paren?)) or comma or apos or quot or right paren or space

	isRenderCall,
	rNewLine = /[ \t]*(\r\n|\n|\r)/g,
	rUnescapeQuotes = /\\(['"])/g,
	rEscapeQuotes = /['"\\]/g, // Escape quotes and \ character
	rBuildHash = /(?:\x08|^)(onerror:)?(?:(~?)(([\w$_\.]+):)?([^\x08]+))\x08(,)?([^\x08]+)/gi,
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
	charsFromEntities  = {
		amp: "&",
		gt: ">",
		lt: "<"
	},
	HTML = "html",
	OBJECT = "object",
	tmplAttr = "data-jsv-tmpl",
	jsvTmpl = "jsvTmpl",
	indexStr = "For #index in nested block use #getIndex().",
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
					} else {
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
		map: dataMap    // If jsObservable loaded first, use that definition of dataMap
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
			target[name] = source[name];
		}
		return target;
	}
}

(JsViewsError.prototype = new Error()).constructor = JsViewsError;

//========================== Top-level functions ==========================

//===================
// views.delimiters
//===================

function $viewsDelimiters(openChars, closeChars, link) {
	// Set the tag opening and closing delimiters and 'link' character. Default is "{{", "}}" and "^"
	// openChars, closeChars: opening and closing strings, each with two characters
	if (!openChars) {
		return $subSettings.delimiters;
	}
	if ($isArray(openChars)) {
		return $viewsDelimiters.apply($views, openChars);
	}

	$subSettings.delimiters = [openChars, closeChars, linkChar = link ? link.charAt(0) : linkChar];

	delimOpenChar0 = openChars.charAt(0); // Escape the characters - since they could be regex special characters
	delimOpenChar1 = openChars.charAt(1);
	delimCloseChar0 = closeChars.charAt(0);
	delimCloseChar1 = closeChars.charAt(1);
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
		root = !type || type === "root";
		// If type is undefined, returns root view (view under top view).

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
	} else {
		while (view && !found) {
			// Go through views - this one, and all parent ones - and return first one with given type.
			found = view.type === type ? view : undefined;
			view = view.parent;
		}
	}
	return found;
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

//==========
// View.hlp
//==========

function getPathObject(ob, path, ltOb, fn) { // Iterate through path to late paths: @a.b.c paths
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
			if (key === "tag" || key === "tagCtx" || key === "root" || key === "parentTags" || storeView._.it === key ) {
				return res;
			}
		} else {
			store = undefined;
		}
		if (storeView.tagCtx || storeView.linked) { // Data-linked view, or tag instance
			if (!res || !res._cxp) {
				// Not a contextual parameter
				// Set storeView to tag (if this is a tag.ctxPrm() call) or to root view ("data" view of linked template)
				storeView = storeView.tagCtx || $isFunction(res)
					? storeView // Is a tag, not a view, or is a computed contextual parameter, so scope to the callView, no the 'scope view'
					: (storeView = storeView.scope || storeView,
						!storeView.isTop && storeView.ctx.tag // If this view is in a tag, set storeView to the tag
							|| storeView);
				if (res !== undefined && storeView.tagCtx) {
					// If storeView is a tag, but the contextual parameter has been set at at higher level (e.g. helpers)...
					storeView = storeView.tagCtx.view.scope; //  then move storeView to the outer level (scope of tag container view)
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
					// In a context callback for a contextual param, we set get = true, to get ctxPrm  [view, dependencies...] array - needed for observe call
					return deps;
				}
				tagElse = obsCtxPrm.tagElse;
				newRes = res[1] // linkFn for compiled expression
					? obsCtxPrm.tag && obsCtxPrm.tag.cvtArgs
						? obsCtxPrm.tag.cvtArgs(1, tagElse)[obsCtxPrm.ind] // = tag.bndArgs() - for tag contextual parameter
						: res[1](res[0].data, res[0], $sub)    // = fn(data, view, $sub) for compiled binding expression
					: res[0]._ocp; // Observable contextual parameter (uninitialized, or initialized as static expression, so no path dependencies)
				if (isUpdate) {
					if (res && newRes !== value) {
						$sub._ucp(key, value, storeView, obsCtxPrm); // Update observable contextual parameter
					}
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
			wrapped._vw = callView;
		}
		return wrapped || res;
	}
}

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
	var tag, value, argsLen, bindTo,
		// If tagCtx is an integer, then it is the key for the compiled function to return the boundTag tagCtx
		boundTag = typeof tagCtx === "number" && view.tmpl.bnds[tagCtx-1],
		linkCtx = view.linkCtx; // For data-link="{cvt:...}"...

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

function convertArgs(bound, tagElse) { // tag.cvtArgs() or tag.cvtArgs(trueOrFalse, tagElse)
	var l, key, boundArgs, args, bindFrom, tag, converter,
		tagCtx = this;

	if (tagCtx.tagName) {
		tag = tagCtx;
		tagCtx = tag.tagCtxs ? tag.tagCtxs[tagElse || 0] : tag.tagCtx;
	} else {
		tag = tagCtx.tag;
	}

	bindFrom = tag.bindFrom;
	args = tagCtx.args;

	if ((converter = tag.convert) && "" + converter === converter) {
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
		if (!$isArray(converter) || converter.length !== l) {
			converter = [converter];
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
	return this.cvtArgs(1, tagElse);
}

//=============
// views._tag
//=============

function getResource(resourceType, itemName) {
	var res, store,
		view = this;
	if ("" + itemName === itemName) {
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
					bindArray[m] = parseInt(key); // Convert "0" to 0,  etc.
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
		linkCtx = parentView.linkCtx || 0,
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
			tagCtx.tmpl = parentView.getTmpl(tmpl);
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
				tag.linkCtx = linkCtx;
			}
			if (tag._.bnd = boundTag || linkCtx.fn) {
				// Bound if {^{tag...}} or data-link="{tag...}"
				tag._.ths = tagCtx.params.props.this; // Tag has a this=expr binding, to get javascript reference to tag instance
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
			args = tag.cvtArgs(undefined, i);
			if (tag.linkedCtxParam) {
				bdArgs = tag.cvtArgs(1, i);
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
					// be a dumbed-down template which will always return the  itemRet string (no matter what the data is). The itemRet string
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
			// No return value from render, and no template/content tagCtx.render(...), so return undefined
			ret = ret ? ret + (itemRet || "") : itemRet; // If no rendered content, this will be undefined
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
	} else {
		self.ctx = context || {};
	}
}

View.prototype = {
	get: getView,
	getIndex: getIndex,
	getRsc: getResource,
	getTmpl: getTemplate,
	ctxPrm: contextParameter,
	getOb: getPathObject,
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
			resources = parentTmpl[storeNames];    // Resources not yet compiled
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
	} else if ("" + tagDef === tagDef) {
		tagDef = {template: tagDef};
	}

	if (baseTag = tagDef.baseTag) {
		tagDef.flow = !!tagDef.flow; // Set flow property, so defaults to false even if baseTag has flow=true
		baseTag = "" + baseTag === baseTag
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
		compiledDef.template = "" + tmpl === tmpl ? ($templates[tmpl] || $templates(tmpl)) : tmpl;
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
	// tmpl is either a template object, a selector for a template script block, the name of a compiled template, or a template object

	//==== nested functions ====
	function lookupTemplate(value) {
		// If value is of type string - treat as selector, or name of compiled template
		// Return the template object, if already compiled, or the markup string
		var currentName, tmpl;
		if (("" + value === value) || value.nodeType > 0 && (elem = value)) {
			if (!elem) {
				if (/^\.\/[^\\:*?"<>]*$/.test(value)) {
					// tmpl="./some/file.html"
					// If the template is not named, use "./some/file.html" as name.
					if (tmpl = $templates[name = name || value]) {
						value = tmpl;
					} else {
						// BROWSER-SPECIFIC CODE (not on Node.js):
						// Look for server-generated script block with id "./some/file.html"
						elem = document.getElementById(value);
					}
				} else if ($.fn && !$sub.rTmpl.test(value)) {
					try {
						elem = $ (value, document)[0]; // if jQuery is loaded, test for selector returning elements, and get first element
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

function unmapArray(modelArr) {
		var arr = [],
			i = 0,
			l = modelArr.length;
		for (; i<l; i++) {
			arr.push(modelArr[i].unmap());
		}
		return arr;
}

function compileViewModel(name, type) {
	var i, constructor,
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
		body = "",
		g = getters ? getters.length : 0,
		$observable = $.observable,
		getterNames = {};

	function GetNew(args) {
		constructor.apply(this, args);
	}

	function vm() {
		return new GetNew(arguments);
	}

	function iterate(data, action) {
		var getterType, defaultVal, prop, ob,
			j = 0;
		for (; j<g; j++) {
			prop = getters[j];
			getterType = undefined;
			if (prop + "" !== prop) {
				getterType = prop;
				prop = getterType.getter;
			}
			if ((ob = data[prop]) === undefined && getterType && (defaultVal = getterType.defaultVal) !== undefined) {
				ob = getDefaultVal(defaultVal, data);
			}
			action(ob, getterType && viewModels[getterType.type], prop);
		}
	}

	function map(data) {
		data = data + "" === data
			? JSON.parse(data) // Accept JSON string
			: data;            // or object/array
		var l, prop,
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
				}
				arr.push(ob);
			});

			ob = this.apply(this, arr); // Insantiate this View Model, passing getters args array to constructor
			for (prop in data) { // Copy over any other properties. that are not get/set properties
				if (prop !== $expando && !getterNames[prop]) {
					ob[prop] = data[prop];
				}
			}
		}
		return ob;
	}

	function merge(data) {
		data = data + "" === data
			? JSON.parse(data) // Accept JSON string
			: data;            // or object/array
		var j, l, m, prop, mod, found, assigned, ob, newModArr,
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
						assigned[j] = found = id + "" === id
						? (ob[id] && (getterNames[id] ? mod[id]() : mod[id]) === ob[id])
						: id(mod, ob);
					}
				}
				if (found) {
					mod.merge(ob);
					newModArr.push(mod);
				} else {
					newModArr.push(vm.map(ob));
				}
			}
			if ($observable) {
				$observable(model).refresh(newModArr, true);
			} else {
				model.splice.apply(model, [0, model.length].concat(newModArr));
			}
			return;
		}
		iterate(data, function(ob, viewModel, getter) {
			if (viewModel) {
				model[getter]().merge(ob); // Update typed property
			} else {
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

		if ($isArray(model)) {
			return unmapArray(model);
		}
		ob = {};
		for (; k<g; k++) {
			prop = getters[k];
			getterType = undefined;
			if (prop + "" !== prop) {
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
			if (prop !== "_is" && !getterNames[prop] && prop !== $expando  && (prop.charAt(0) !== "_" || !getterNames[prop.slice(1)]) && !$isFunction(model[prop])) {
				ob[prop] = model[prop];
			}
		}
		return ob;
	}

	GetNew.prototype = proto;

	for (i=0; i<g; i++) {
		(function(getter) {
			getter = getter.getter || getter;
			getterNames[getter] = i+1;
			var privField = "_" + getter;

			args += (args ? "," : "") + getter;
			body += "this." + privField + " = " + getter + ";\n";
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

	constructor = new Function(args, body.slice(0, -1));
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
		tmpl.markup = $.trim(tmpl.markup);
	}

	return tmpl;
}

//==============
// registerStore
//==============

function registerStore(storeName, storeSettings) {

	function theStore(name, item, parentTmpl) {
		// The store is also the function used to add items to the store. e.g. $.templates, or $.views.tags

		// For store of name 'thing', Call as:
		//    $.views.things(items[, parentTmpl]),
		// or $.views.things(name, item[, parentTmpl])

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
		if (item === undefined) {
			item = name;
			name = undefined;
		}
		if (name && "" + name !== name) { // name must be a string
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

function addSetting(st) {
	$viewsSettings[st] = function(value) {
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
		tmpl = view.getTmpl(tag.template || tagCtx.tmpl);
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
		if (!view) {
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
	function setItemVar(item) {
		// When itemVar is specified, set modified ctx with user-named ~item
		newCtx = $extend({}, context);
		newCtx[itemVar] = item;
	}

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
		if (itemVar = tagCtx.props.itemVar) {
			if (itemVar.charAt(0) !== "~") {
				syntaxError("Use itemVar='~myItem'");
			}
			itemVar = itemVar.slice(1);
		}
	}

	if (view) {
		onRender = onRender || view._.onRender;
		noLinking = context && context.link === false;

		if (noLinking && view._.nl) {
			onRender = undefined;
		}

		context = extendCtx(context, view.ctx);
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
			if (itemVar) {
				setItemVar(data[i]); // use modified ctx with user-named ~item
			}
			childView = new View(newCtx, "item", newView, data[i], tmpl, (key || 0) + i, onRender, newView.content);
			childView._.it = itemVar;

			itemResult = tmpl.fn(data[i], childView, $sub);
			result += newView._.onRender ? newView._.onRender(itemResult, childView) : itemResult;
		}
	} else {
		// Create a view for singleton data object. The type of the view will be the tag name, e.g. "if" or "mytag" except for
		// "item", "array" and "data" views. A "data" view is from programmatic render(object) against a 'singleton'.
		if (itemVar) {
			setItemVar(data);
		}
		newView = swapContent ? view : new View(newCtx, tmplName || "data", view, data, tmpl, key, onRender, contentTmpl);
		newView._.it = itemVar;
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

	return view && !view.linkCtx ? $converters.html(message) : message;
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
							isLateOb = isLateOb || param.charAt(0) === "@";
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
			markup = markup.slice(0, -convertBack.length - 2) + delimCloseChar0;
		}
		markup = delimOpenChar0 + markup + delimCloseChar1;
	}

	blockTagCheck(stack[0] && stack[0][2].pop()[0]);
	// Build the AST (abstract syntax tree) under astTop
	markup.replace(rTag, parseTag);

	pushprecedingContent(markup.length);

	if (loc = astTop[astTop.length - 1]) {
		blockTagCheck("" + loc !== loc && (+loc[10] === loc[10]) && loc[0]);
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

function paramStructure(parts, type) {
	return '\n\t'
		+ (type
			? type + ':{'
			: '')
		+ 'args:[' + parts[0] + '],\n\tprops:{' + parts[1] + '}'
		+ (parts[2] ? ',\n\tctx:{' + parts[2] + '}' : "");
}

function parseParams(params, pathBindings, tmpl, isLinkExpr) {

	function parseTokens(all, lftPrn0, lftPrn, bound, path, operator, err, eq, path2, late, prn, comma, lftPrn2, apos, quot, rtPrn, rtPrnDot, prn2, space, index, full) {
	// /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(~?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?(@)?[#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g,
	//  lftPrn0          lftPrn        bound path             operator err                                         eq      path2 late            prn      comma  lftPrn2   apos quot        rtPrn  rtPrnDot                  prn2     space
		// (left paren? followed by (path? followed by operator) or (path followed by paren?)) or comma or apos or quot or right paren or space
		function parsePath(allPath, not, object, helper, view, viewProperty, pathTokens, leafToken) {
			//rPath = /^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
			//          not                               object     helper    view  viewProperty pathTokens      leafToken
			var subPath = object === ".";
			if (object) {
				path = path.slice(not.length);
				if (/^\.?constructor$/.test(leafToken||path)) {
					syntaxError(allPath);
				}
				if (!subPath) {
					allPath = (late // late path @a.b.c: not throw on 'property of undefined' if a undefined, and will use getOb() after linking to resolve late.
							? (isLinkExpr ? '' : '(ltOb.lt=ltOb.lt||') + '(ob='
							: ""
						)
						+ (helper
							? 'view.ctxPrm("' + helper + '")'
							: view
								? "view"
								: "data")
						+ (late
							? ')===undefined' + (isLinkExpr ? '' : ')') + '?"":view.getOb(ob,"'
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
							if (theOb.bnd) {
								path = "^" + path.slice(1);
							}
							theOb.sb = path;
							theOb.bnd = theOb.bnd || path.charAt(0) === "^";
						}
					} else {
						binds.push(path);
					}
					pathStart[parenDepth] = index + (subPath ? 1 : 0);
				}
			}
			return allPath;
		}

		//bound = bindings && bound;
		if (bound && !eq) {
			path = bound + path; // e.g. some.fn(...)^some.path - so here path is "^some.path"
		}
		operator = operator || "";
		lftPrn = lftPrn || lftPrn0 || lftPrn2;
		path = path || path2;

		if (late && (late = !/\)|]/.test(full.charAt(index-1)))) {
			path = path.slice(1).split(".").join("^"); // Late path @z.b.c. Use "^" rather than "." to ensure that deep binding will be used
		}
		// Could do this - but not worth perf cost?? :-
		// if (!path.lastIndexOf("#data.", 0)) { path = path.slice(6); } // If path starts with "#data.", remove that.
		prn = prn || prn2 || "";

		var expr, exprFn, binds, theOb, newOb,
			rtSq = ")";

		if (prn === "[") {
			prn = "[j._sq(";
			rtSq = ")]";
		}

		if (err && !aposed && !quoted) {
			syntaxError(params);
		} else {
			if (bindings && rtPrnDot && !aposed && !quoted) {
				// This is a binding to a path in which an object is returned by a helper/data function/expression, e.g. foo()^x.y or (a?b:c)^x.y
				// We create a compiled function to get the object instance (which will be called when the dependent data of the subexpression changes, to return the new object, and trigger re-binding of the subsequent path)
				if (parenDepth && (!named || boundName || bindto)) {
					expr = pathStart[parenDepth - 1];
					if (full.length - 1 > index - (expr || 0)) { // We need to compile a subexpression
						expr = full.slice(expr, index + all.length);
						if (exprFn !== true) { // If not reentrant call during compilation
							binds = bindto || bndStack[parenDepth-1].bd;
							// Insert exprOb object, to be used during binding to return the computed object
							theOb = binds[binds.length-1];
							if (theOb && theOb.prm) {
								while (theOb.sb && theOb.sb.prm) {
									theOb = theOb.sb;
								}
								newOb = theOb.sb = {path: theOb.sb, bnd: theOb.bnd};
							} else {
								binds.push(newOb = {path: binds.pop()}); // Insert exprOb object, to be used during binding to return the computed object
							}											 // (e.g. "some.object()" in "some.object().a.b" - to be used as context for binding the following tokens "a.b")
						}
						rtPrnDot = delimOpenChar1 + ":" + expr // The parameter or function subexpression
							+ " onerror=''" // set onerror='' in order to wrap generated code with a try catch - returning '' as object instance if there is an error/missing parent
							+ delimCloseChar0;
						exprFn = tmplLinks[rtPrnDot];
						if (!exprFn) {
							tmplLinks[rtPrnDot] = true; // Flag that this exprFn (for rtPrnDot) is being compiled
							tmplLinks[rtPrnDot] = exprFn = tmplFn(rtPrnDot, tmpl, true); // Compile the expression (or use cached copy already in tmpl.links)
						}
						if (exprFn !== true && newOb) {
							// If not reentrant call during compilation
							newOb._cpfn = exprFn;
							newOb.prm = bndCtx.bd;
							newOb.bnd = newOb.bnd || newOb.path && newOb.path.indexOf("^") >= 0;
						}
					}
				}
			}
			return (aposed
				// within single-quoted string
				? (aposed = !apos, (aposed ? all : lftPrn2 + '"'))
				: quoted
				// within double-quoted string
					? (quoted = !quot, (quoted ? all : lftPrn2 + '"'))
					:
				(
					(lftPrn
						? (pathStart[parenDepth] = index++, bndCtx = bndStack[++parenDepth] = {bd: []}, lftPrn)
						: "")
					+ (space
						? (parenDepth
							? ""
				// New arg or prop - so insert backspace \b (\x08) as separator for named params, used subsequently by rBuildHash, and prepare new bindings array
							: (paramIndex = full.slice(paramIndex, index), named
								? (named = boundName = bindto = false, "\b")
								: "\b,") + paramIndex + (paramIndex = index + all.length, bindings && pathBindings.push(bndCtx.bd = []), "\b")
						)
						: eq
				// named param. Remove bindings for arg and create instead bindings array for prop
							? (parenDepth && syntaxError(params), bindings && pathBindings.pop(), named = "_" + path, boundName = bound, paramIndex = index + all.length,
									bindings && ((bindings = bndCtx.bd = pathBindings[named] = []), bindings.skp = !bound), path + ':')
							: path
				// path
								? (path.split("^").join(".").replace(rPath, parsePath)
									+ (prn
				// some.fncall(
										? (bndCtx = bndStack[++parenDepth] = {bd: []}, fnCall[parenDepth] = rtSq, prn)
										: operator)
								)
								: operator
				// operator
									? operator
									: rtPrn
				// function
										? ((rtPrn = fnCall[parenDepth] || rtPrn, fnCall[parenDepth] = false, bndCtx = bndStack[--parenDepth], rtPrn)
											+ (prn // rtPrn and prn, e.g )( in (a)() or a()(), or )[ in a()[]
												? (bndCtx = bndStack[++parenDepth], fnCall[parenDepth] = rtSq, prn)
												: "")
										)
										: comma
											? (fnCall[parenDepth] || syntaxError(params), ",") // We don't allow top-level literal arrays or objects
											: lftPrn0
												? ""
												: (aposed = apos, quoted = quot, '"')
				))
			);
		}
	}

	var named, bindto, boundName,
		quoted, // boolean for string content in double quotes
		aposed, // or in single quotes
		bindings = pathBindings && pathBindings[0], // bindings array for the first arg
		bndCtx = {bd: bindings},
		bndStack = {0: bndCtx},
		paramIndex = 0, // list,
		tmplLinks = (tmpl ? tmpl.links : bindings && (bindings.links = bindings.links || {})) || topView.tmpl.links,
		// The following are used for tracking path parsing including nested paths, such as "a.b(c^d + (e))^f", and chained computed paths such as
		// "a.b().c^d().e.f().g" - which has four chained paths, "a.b()", "^c.d()", ".e.f()" and ".g"
		parenDepth = 0,
		fnCall = {}, // We are in a function call
		pathStart = {}, // tracks the start of the current path such as c^d() in the above example
		result;

	if (params.charAt(0) === "@") {
		params = params.replace(rBracketQuote, ".");
	}
	result = (params + (tmpl ? " " : "")).replace(rParams, parseTokens);

	return !parenDepth && result || syntaxError(params); // Syntax error if unbalanced parens in params expression
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

	if ("" + tmpl === tmpl) {
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
		if ("" + node === node) {
			// a markup string to be inserted
			code += '\n+"' + node + '"';
		} else {
			// a compiled tag expression to be inserted
			tagName = node[0];
			if (tagName === "*") {
				// Code tag: {{* }}
				code += ";\n" + node[1] + "\nret=ret";
			} else {
				converter = node[1];
				content = !isLinkExpr && node[2];
				tagCtx = paramStructure(node[3], 'params') + '},' + paramStructure(params = node[4]);
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
					tagCtxFn = new Function("data,view,j,u", "// " + tmplName + " " + (++tmplBindingKey) + " " + tagName
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
					: (hasTag = true, "\n{view:view,tmpl:" // Add this tagCtx to the compiled code for the tagCtxs to be passed to renderTag()
						+ (content ? nestedTmpls.length : "0") + "," // For block tags, pass in the key (nestedTmpls.length) to the nested content template
						+ tagCtx + "},"));

				if (tagAndElses && !nextIsElse) {
					// This is a data-link expression or an inline tag without any elses, or the last {{else}} of an inline tag
					// We complete the code for returning the tagCtxs array
					code = "[" + code.slice(0, -1) + "]";
					tagRender = 't("' + tagAndElses + '",view,this,';
					if (isLinkExpr || pathBindings) {
						// This is a bound tag (data-link expression or inline bound tag {^{tag ...}}) so we store a compiled tagCtxs function in tmp.bnds
						code = new Function("data,view,j,u", " // " + tmplName + " " + tmplBindingKey + " " + tagAndElses + retStrOpen + code
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
					code += ';\n}catch(e){ret' + (isLinkExpr ? "urn " : "+=") + boundOnErrStart + 'j._err(e,view,' + onError + ')' + boundOnErrEnd + ';}' + (isLinkExpr ? "" : 'ret=ret');
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
				? (node[8]  // late @... path?
						? ", ob"
						: ""
					) + ";\n"
				: ',ret=""')
		+ code
		+ (isLinkExpr ? "\n" : ";\nreturn ret;");

	try {
		code = new Function("data,view,j,u", code);
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
		props = [];

	if (typeof source === OBJECT || $isFunction(source)) {
		for (key in source) {
			prop = source[key];
			if (key !== $expando && source.hasOwnProperty(key) && (!tagCtx.props.noFunctions || !$.isFunction(prop))) {
				props.push({key: key, prop: prop});
			}
		}
	}
	return getTargetSorted(props, tagCtx);
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
	if (directSort || sort && "" + sort === sort) {
		// Temporary mapped array holds objects with index and sort-value
		mapped = value.map(function(item, i) {
			item = directSort ? item : getPathObject(item, sort);
			return {i: i, v: "" + item === item ? item.toLowerCase() : item};
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
		value = value.sort(sort);
	}
	if (reverse < 0 && !sort) { // Reverse result if not already reversed in sort
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

	start = props.start; // Get current value - after possible  changes triggered by tag.sorted refresh() above
	end = props.end;
	if (propParams.start && start === undefined || propParams.end && end === undefined) {
		start = end = 0;
	}
	if (!isNaN(start) || !isNaN(end)) { // start or end specified, but not the auto-create Number array scenario of {{for start=xxx end=yyy}}
		start = +start || 0;
		end = end === undefined || end > value.length ? value.length : +end;
//		end = end === undefined ? value.length : +end;
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
  return "" + text === text ? text.replace(rDataEncode, getCharEntity) : text;
}

function dataUnencode(text) {
  // Unencode just < > and & - intended for 'safe data' along with {{:}} rather than {{>}}
  return "" + text === text ? text.replace(rDataUnencode, getCharFromEntity) : text;
}

//========================== Initialize ==========================

$sub = $views.sub;
$viewsSettings = $views.settings;

if (!(jsr || $ && $.render)) {
	// JsRender not already loaded, or loaded without jQuery, and we are now moving from jsrender namespace to jQuery namepace
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
				throw "JsObservable requires JsRender " + versionNumber;
			}
			$extend($sub, $.views.sub); // jquery.observable.js was loaded before jsrender.js
			$views.map = $.views.map;
		}

	} else {
		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery is not loaded.

		$ = {};

		if (setGlobals) {
			global.jsrender = $; // We are loading jsrender.js from a script element, not AMD or CommonJS, so set global
		}

		// Error warning if jsrender.js is used as template engine on Node.js (e.g. Express or Hapi...)
		// Use jsrender-node.js instead...
		$.renderFile = $.__express = $.compile = function() { throw "Node.js: use npm jsrender, or jsrender-node.js"; };

		//END BROWSER-SPECIFIC CODE
		$.isFunction = function(ob) {
			return typeof ob === "function";
		};

		$.isArray = Array.isArray || function(obj) {
			return ({}.toString).call(obj) === "[object Array]";
		};

		$sub._jq = function(jq) { // private method to move from JsRender APIs from jsrender namespace to jQuery namespace
			if (jq !== $) {
				$extend(jq, $); // map over from jsrender namespace to jQuery namespace
				$ = jq;
				$.fn.render = $fnRender;
				delete $.jsrender;
				$expando = $.expando;
			}
		};

		$.jsrender = versionNumber;
	}
	$subSettings = $sub.settings;
	$subSettings.allowCode = false;
	$isFunction = $.isFunction;
	$.render = $render;
	$.views = $views;
	$.templates = $templates = $views.templates;

	for (setting in $subSettings) {
		addSetting(setting);
	}

	($viewsSettings.debugMode = function(debugMode) {
		return debugMode === undefined
			? $subSettings.debugMode
			: (
				$subSettings.debugMode = debugMode,
				$subSettings.onError = debugMode + "" === debugMode
					? function() { return debugMode; }
					: $isFunction(debugMode)
						? debugMode
						: undefined,
				$viewsSettings);
	})(false); // jshint ignore:line

	$subSettingsAdvanced = $subSettings.advanced = {
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
				var l, tagCtx, props, sort,
					self = this,
					tagCtxs = self.tagCtxs;
				l = tagCtxs.length;
				while (l--) {
					tagCtx = tagCtxs[l];
					props = tagCtx.props;
					tagCtx.argDefault = props.end === undefined || tagCtx.args.length > 0; // Default to #data except for auto-create range scenario {{for start=xxx end=yyy step=zzz}}

					if (tagCtx.argDefault !== false && $isArray(tagCtx.args[0])
						&& (props.sort !== undefined || tagCtx.params.props.start || tagCtx.params.props.end || props.step !== undefined || props.filter || props.reverse)) {
						props.dataMap = self.sortDataMap;
					}
				}
			},
			render: function(val) {
				// This function is called once for {{for}} and once for each {{else}}.
				// We will use the tag.rendering object for carrying rendering state across the calls.
				var value, filter, srtField, isArray, i, sorted, end, step,
					self = this,
					tagCtx = self.tagCtx,
					range = tagCtx.argDefault === false,
					props = tagCtx.props,
					iterate =  range || tagCtx.args.length, // Not final else and not auto-create range
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
$isArray = ($||jsr).isArray;
$viewsSettings.delimiters("{{", "}}", "^");

if (jsrToJq) { // Moving from jsrender namespace to jQuery namepace - copy over the stored items (templates, converters, helpers...)
	jsr.views.sub._jq($);
}
return $ || jsr;
}, window));

},{}],2:[function(require,module,exports){
(function (global){
/*global QUnit, test, equal, ok*/
(function(undefined) {
"use strict";

browserify.done.twelve = true;

QUnit.module("Browserify - client code");

var isIE8 = window.attachEvent && !window.addEventListener;

if (!isIE8) {

test("No jQuery global: require('jsrender')() nested template", function() {
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
	equal(result, "Name: Jo (outer.html) Name: Jo (inner.html) true", "result: No jQuery global: require('jsrender')(), nested templates");

	// ............................... Reset .................................
	global.jQuery = jQuery; // Replace QUnit global jQuery
	global.jsrender = jsr; // Replace any previous global jsrender
});
}
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../templates/outer.html":4,"jsrender":1}],3:[function(require,module,exports){
(function (global){
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],4:[function(require,module,exports){
(function (global){
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./inner.html":3}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvanNyZW5kZXIvanNyZW5kZXIuanMiLCJ0ZXN0L2Jyb3dzZXJpZnkvMTItbmVzdGVkLXVuaXQtdGVzdHMuanMiLCJ0ZXN0L3RlbXBsYXRlcy9pbm5lci5odG1sIiwidGVzdC90ZW1wbGF0ZXMvb3V0ZXIuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4dkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qISBKc1JlbmRlciB2MC45LjkxIChCZXRhKTogaHR0cDovL2pzdmlld3MuY29tLyNqc3JlbmRlciAqL1xuLyohICoqVkVSU0lPTiBGT1IgV0VCKiogKEZvciBOT0RFLkpTIHNlZSBodHRwOi8vanN2aWV3cy5jb20vZG93bmxvYWQvanNyZW5kZXItbm9kZS5qcykgKi9cbi8qXG4gKiBCZXN0LW9mLWJyZWVkIHRlbXBsYXRpbmcgaW4gYnJvd3NlciBvciBvbiBOb2RlLmpzLlxuICogRG9lcyBub3QgcmVxdWlyZSBqUXVlcnksIG9yIEhUTUwgRE9NXG4gKiBJbnRlZ3JhdGVzIHdpdGggSnNWaWV3cyAoaHR0cDovL2pzdmlld3MuY29tLyNqc3ZpZXdzKVxuICpcbiAqIENvcHlyaWdodCAyMDE4LCBCb3JpcyBNb29yZVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbi8vanNoaW50IC1XMDE4LCAtVzA0MSwgLVcxMjBcblxuKGZ1bmN0aW9uKGZhY3RvcnksIGdsb2JhbCkge1xuXHQvLyBnbG9iYWwgdmFyIGlzIHRoZSB0aGlzIG9iamVjdCwgd2hpY2ggaXMgd2luZG93IHdoZW4gcnVubmluZyBpbiB0aGUgdXN1YWwgYnJvd3NlciBlbnZpcm9ubWVudFxuXHR2YXIgJCA9IGdsb2JhbC5qUXVlcnk7XG5cblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7IC8vIENvbW1vbkpTIGUuZy4gQnJvd3NlcmlmeVxuXHRcdG1vZHVsZS5leHBvcnRzID0gJFxuXHRcdFx0PyBmYWN0b3J5KGdsb2JhbCwgJClcblx0XHRcdDogZnVuY3Rpb24oJCkgeyAvLyBJZiBubyBnbG9iYWwgalF1ZXJ5LCB0YWtlIG9wdGlvbmFsIGpRdWVyeSBwYXNzZWQgYXMgcGFyYW1ldGVyOiByZXF1aXJlKCdqc3JlbmRlcicpKGpRdWVyeSlcblx0XHRcdFx0aWYgKCQgJiYgISQuZm4pIHtcblx0XHRcdFx0XHR0aHJvdyBcIlByb3ZpZGUgalF1ZXJ5IG9yIG51bGxcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFjdG9yeShnbG9iYWwsICQpO1xuXHRcdFx0fTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkgeyAvLyBBTUQgc2NyaXB0IGxvYWRlciwgZS5nLiBSZXF1aXJlSlNcblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZmFjdG9yeShnbG9iYWwpO1xuXHRcdH0pO1xuXHR9IGVsc2UgeyAvLyBCcm93c2VyIHVzaW5nIHBsYWluIDxzY3JpcHQ+IHRhZ1xuXHRcdGZhY3RvcnkoZ2xvYmFsLCBmYWxzZSk7XG5cdH1cbn0gKFxuXG4vLyBmYWN0b3J5IChmb3IganNyZW5kZXIuanMpXG5mdW5jdGlvbihnbG9iYWwsICQpIHtcblwidXNlIHN0cmljdFwiO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09IFRvcC1sZXZlbCB2YXJzID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vIGdsb2JhbCB2YXIgaXMgdGhlIHRoaXMgb2JqZWN0LCB3aGljaCBpcyB3aW5kb3cgd2hlbiBydW5uaW5nIGluIHRoZSB1c3VhbCBicm93c2VyIGVudmlyb25tZW50XG52YXIgc2V0R2xvYmFscyA9ICQgPT09IGZhbHNlOyAvLyBPbmx5IHNldCBnbG9iYWxzIGlmIHNjcmlwdCBibG9jayBpbiBicm93c2VyIChub3QgQU1EIGFuZCBub3QgQ29tbW9uSlMpXG5cbiQgPSAkICYmICQuZm4gPyAkIDogZ2xvYmFsLmpRdWVyeTsgLy8gJCBpcyBqUXVlcnkgcGFzc2VkIGluIGJ5IENvbW1vbkpTIGxvYWRlciAoQnJvd3NlcmlmeSksIG9yIGdsb2JhbCBqUXVlcnkuXG5cbnZhciB2ZXJzaW9uTnVtYmVyID0gXCJ2MC45LjkxXCIsXG5cdGpzdlN0b3JlTmFtZSwgclRhZywgclRtcGxTdHJpbmcsIHRvcFZpZXcsICR2aWV3cyxcdCRleHBhbmRvLFxuXHRfb2NwID0gXCJfb2NwXCIsIC8vIE9ic2VydmFibGUgY29udGV4dHVhbCBwYXJhbWV0ZXJcblxuLy9UT0RPXHR0bXBsRm5zQ2FjaGUgPSB7fSxcblx0JGlzRnVuY3Rpb24sICRpc0FycmF5LCAkdGVtcGxhdGVzLCAkY29udmVydGVycywgJGhlbHBlcnMsICR0YWdzLCAkc3ViLCAkc3ViU2V0dGluZ3MsICRzdWJTZXR0aW5nc0FkdmFuY2VkLCAkdmlld3NTZXR0aW5ncywgZGVsaW1PcGVuQ2hhcjAsIGRlbGltT3BlbkNoYXIxLCBkZWxpbUNsb3NlQ2hhcjAsIGRlbGltQ2xvc2VDaGFyMSwgbGlua0NoYXIsIHNldHRpbmcsIGJhc2VPbkVycm9yLFxuXG5cdHJQYXRoID0gL14oISo/KSg/Om51bGx8dHJ1ZXxmYWxzZXxcXGRbXFxkLl0qfChbXFx3JF0rfFxcLnx+KFtcXHckXSspfCModmlld3woW1xcdyRdKykpPykoW1xcdyQuXl0qPykoPzpbLlteXShbXFx3JF0rKVxcXT8pPykkL2csXG5cdC8vICAgICAgICBub3QgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0ICAgICBoZWxwZXIgICAgdmlldyAgdmlld1Byb3BlcnR5IHBhdGhUb2tlbnMgICAgICBsZWFmVG9rZW5cblxuXHRyUGFyYW1zID0gLyhcXCgpKD89XFxzKlxcKCl8KD86KFsoW10pXFxzKik/KD86KFxcXj8pKH4/W1xcdyQuXl0rKT9cXHMqKChcXCtcXCt8LS0pfFxcK3wtfH4oPyFbXFx3JF9dKXwmJnxcXHxcXHx8PT09fCE9PXw9PXwhPXw8PXw+PXxbPD4lKjo/XFwvXXwoPSkpXFxzKnwoISo/KEApP1sjfl0/W1xcdyQuXl0rKShbKFtdKT8pfCgsXFxzKil8KFxcKD8pXFxcXD8oPzooJyl8KFwiKSl8KD86XFxzKigoWylcXF1dKSg/PVsuXl18XFxzKiR8W14oW10pfFspXFxdXSkoWyhbXT8pKXwoXFxzKykvZyxcblx0Ly8gICAgICAgICBsZnRQcm4wICAgICAgICAgIGxmdFBybiAgICAgICAgYm91bmQgcGF0aCAgICAgICAgICAgICBvcGVyYXRvciBlcnIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVxICAgICAgcGF0aDIgbGF0ZSAgICAgICAgICAgIHBybiAgICAgIGNvbW1hICBsZnRQcm4yICAgYXBvcyBxdW90ICAgICAgICBydFBybiAgcnRQcm5Eb3QgICAgICAgICAgICAgICAgICBwcm4yICAgICBzcGFjZVxuXHQvLyAobGVmdCBwYXJlbj8gZm9sbG93ZWQgYnkgKHBhdGg/IGZvbGxvd2VkIGJ5IG9wZXJhdG9yKSBvciAocGF0aCBmb2xsb3dlZCBieSBsZWZ0IHBhcmVuPykpIG9yIGNvbW1hIG9yIGFwb3Mgb3IgcXVvdCBvciByaWdodCBwYXJlbiBvciBzcGFjZVxuXG5cdGlzUmVuZGVyQ2FsbCxcblx0ck5ld0xpbmUgPSAvWyBcXHRdKihcXHJcXG58XFxufFxccikvZyxcblx0clVuZXNjYXBlUXVvdGVzID0gL1xcXFwoWydcIl0pL2csXG5cdHJFc2NhcGVRdW90ZXMgPSAvWydcIlxcXFxdL2csIC8vIEVzY2FwZSBxdW90ZXMgYW5kIFxcIGNoYXJhY3RlclxuXHRyQnVpbGRIYXNoID0gLyg/OlxceDA4fF4pKG9uZXJyb3I6KT8oPzoofj8pKChbXFx3JF9cXC5dKyk6KT8oW15cXHgwOF0rKSlcXHgwOCgsKT8oW15cXHgwOF0rKS9naSxcblx0clRlc3RFbHNlSWYgPSAvXmlmXFxzLyxcblx0ckZpcnN0RWxlbSA9IC88KFxcdyspWz5cXHNdLyxcblx0ckF0dHJFbmNvZGUgPSAvW1xceDAwYD48XCInJj1dL2csIC8vIEluY2x1ZGVzID4gZW5jb2Rpbmcgc2luY2UgckNvbnZlcnRNYXJrZXJzIGluIEpzVmlld3MgZG9lcyBub3Qgc2tpcCA+IGNoYXJhY3RlcnMgaW4gYXR0cmlidXRlIHN0cmluZ3Ncblx0cklzSHRtbCA9IC9bXFx4MDBgPjxcXFwiJyY9XS8sXG5cdHJIYXNIYW5kbGVycyA9IC9eb25bQS1aXXxeY29udmVydChCYWNrKT8kLyxcblx0cldyYXBwZWRJblZpZXdNYXJrZXIgPSAvXlxcI1xcZCtfYFtcXHNcXFNdKlxcL1xcZCtfYCQvLFxuXHRySHRtbEVuY29kZSA9IHJBdHRyRW5jb2RlLFxuXHRyRGF0YUVuY29kZSA9IC9bJjw+XS9nLFxuXHRyRGF0YVVuZW5jb2RlID0gLyYoYW1wfGd0fGx0KTsvZyxcblx0ckJyYWNrZXRRdW90ZSA9IC9cXFtbJ1wiXT98WydcIl0/XFxdL2csXG5cdHZpZXdJZCA9IDAsXG5cdGNoYXJFbnRpdGllcyA9IHtcblx0XHRcIiZcIjogXCImYW1wO1wiLFxuXHRcdFwiPFwiOiBcIiZsdDtcIixcblx0XHRcIj5cIjogXCImZ3Q7XCIsXG5cdFx0XCJcXHgwMFwiOiBcIiYjMDtcIixcblx0XHRcIidcIjogXCImIzM5O1wiLFxuXHRcdCdcIic6IFwiJiMzNDtcIixcblx0XHRcImBcIjogXCImIzk2O1wiLFxuXHRcdFwiPVwiOiBcIiYjNjE7XCJcblx0fSxcblx0Y2hhcnNGcm9tRW50aXRpZXMgID0ge1xuXHRcdGFtcDogXCImXCIsXG5cdFx0Z3Q6IFwiPlwiLFxuXHRcdGx0OiBcIjxcIlxuXHR9LFxuXHRIVE1MID0gXCJodG1sXCIsXG5cdE9CSkVDVCA9IFwib2JqZWN0XCIsXG5cdHRtcGxBdHRyID0gXCJkYXRhLWpzdi10bXBsXCIsXG5cdGpzdlRtcGwgPSBcImpzdlRtcGxcIixcblx0aW5kZXhTdHIgPSBcIkZvciAjaW5kZXggaW4gbmVzdGVkIGJsb2NrIHVzZSAjZ2V0SW5kZXgoKS5cIixcblx0JHJlbmRlciA9IHt9LFxuXG5cdGpzciA9IGdsb2JhbC5qc3JlbmRlcixcblx0anNyVG9KcSA9IGpzciAmJiAkICYmICEkLnJlbmRlciwgLy8gSnNSZW5kZXIgYWxyZWFkeSBsb2FkZWQsIHdpdGhvdXQgalF1ZXJ5LiBidXQgd2Ugd2lsbCByZS1sb2FkIGl0IG5vdyB0byBhdHRhY2ggdG8galF1ZXJ5XG5cblx0anN2U3RvcmVzID0ge1xuXHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRjb21waWxlOiBjb21waWxlVG1wbFxuXHRcdH0sXG5cdFx0dGFnOiB7XG5cdFx0XHRjb21waWxlOiBjb21waWxlVGFnXG5cdFx0fSxcblx0XHR2aWV3TW9kZWw6IHtcblx0XHRcdGNvbXBpbGU6IGNvbXBpbGVWaWV3TW9kZWxcblx0XHR9LFxuXHRcdGhlbHBlcjoge30sXG5cdFx0Y29udmVydGVyOiB7fVxuXHR9O1xuXG5cdC8vIHZpZXdzIG9iamVjdCAoJC52aWV3cyBpZiBqUXVlcnkgaXMgbG9hZGVkLCBqc3JlbmRlci52aWV3cyBpZiBubyBqUXVlcnksIGUuZy4gaW4gTm9kZS5qcylcblx0JHZpZXdzID0ge1xuXHRcdGpzdmlld3M6IHZlcnNpb25OdW1iZXIsXG5cdFx0c3ViOiB7XG5cdFx0XHQvLyBzdWJzY3JpcHRpb24sIGUuZy4gSnNWaWV3cyBpbnRlZ3JhdGlvblxuXHRcdFx0VmlldzogVmlldyxcblx0XHRcdEVycjogSnNWaWV3c0Vycm9yLFxuXHRcdFx0dG1wbEZuOiB0bXBsRm4sXG5cdFx0XHRwYXJzZTogcGFyc2VQYXJhbXMsXG5cdFx0XHRleHRlbmQ6ICRleHRlbmQsXG5cdFx0XHRleHRlbmRDdHg6IGV4dGVuZEN0eCxcblx0XHRcdHN5bnRheEVycjogc3ludGF4RXJyb3IsXG5cdFx0XHRvblN0b3JlOiB7XG5cdFx0XHRcdHRlbXBsYXRlOiBmdW5jdGlvbihuYW1lLCBpdGVtKSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSAkcmVuZGVyW25hbWVdO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQkcmVuZGVyW25hbWVdID0gaXRlbTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRhZGRTZXR0aW5nOiBhZGRTZXR0aW5nLFxuXHRcdFx0c2V0dGluZ3M6IHtcblx0XHRcdFx0YWxsb3dDb2RlOiBmYWxzZVxuXHRcdFx0fSxcblx0XHRcdGFkdlNldDogbm9vcCwgLy8gVXBkYXRlIGFkdmFuY2VkIHNldHRpbmdzXG5cdFx0XHRfdGhwOiB0YWdIYW5kbGVyc0Zyb21Qcm9wcyxcblx0XHRcdF9nbTogZ2V0TWV0aG9kLFxuXHRcdFx0X3RnOiBmdW5jdGlvbigpIHt9LCAvLyBDb25zdHJ1Y3RvciBmb3IgdGFnRGVmXG5cdFx0XHRfY252dDogY29udmVydFZhbCxcblx0XHRcdF90YWc6IHJlbmRlclRhZyxcblx0XHRcdF9lcjogZXJyb3IsXG5cdFx0XHRfZXJyOiBvblJlbmRlckVycm9yLFxuXHRcdFx0X2NwOiByZXRWYWwsIC8vIEdldCBvYnNlcnZhYmxlIGNvbnRleHR1YWwgcGFyYW1ldGVycyAob3IgcHJvcGVydGllcykgfmZvbz1leHByLiBJbiBKc1JlbmRlciwgc2ltcGx5IHJldHVybnMgdmFsLlxuXHRcdFx0X3NxOiBmdW5jdGlvbih0b2tlbikge1xuXHRcdFx0XHRpZiAodG9rZW4gPT09IFwiY29uc3RydWN0b3JcIikge1xuXHRcdFx0XHRcdHN5bnRheEVycm9yKFwiXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0b2tlbjtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHNldHRpbmdzOiB7XG5cdFx0XHRkZWxpbWl0ZXJzOiAkdmlld3NEZWxpbWl0ZXJzLFxuXHRcdFx0YWR2YW5jZWQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdFx0XHRcdD8gKFxuXHRcdFx0XHRcdFx0XHQkZXh0ZW5kKCRzdWJTZXR0aW5nc0FkdmFuY2VkLCB2YWx1ZSksXG5cdFx0XHRcdFx0XHRcdCRzdWIuYWR2U2V0KCksXG5cdFx0XHRcdFx0XHRcdCR2aWV3c1NldHRpbmdzXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQ6ICRzdWJTZXR0aW5nc0FkdmFuY2VkO1xuXHRcdFx0XHR9XG5cdFx0fSxcblx0XHRtYXA6IGRhdGFNYXAgICAgLy8gSWYganNPYnNlcnZhYmxlIGxvYWRlZCBmaXJzdCwgdXNlIHRoYXQgZGVmaW5pdGlvbiBvZiBkYXRhTWFwXG5cdH07XG5cbmZ1bmN0aW9uIGdldERlcml2ZWRNZXRob2QoYmFzZU1ldGhvZCwgbWV0aG9kKSB7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHR2YXIgcmV0LFxuXHRcdFx0dGFnID0gdGhpcyxcblx0XHRcdHByZXZCYXNlID0gdGFnLmJhc2U7XG5cblx0XHR0YWcuYmFzZSA9IGJhc2VNZXRob2Q7IC8vIFdpdGhpbiBtZXRob2QgY2FsbCwgY2FsbGluZyB0aGlzLmJhc2Ugd2lsbCBjYWxsIHRoZSBiYXNlIG1ldGhvZFxuXHRcdHJldCA9IG1ldGhvZC5hcHBseSh0YWcsIGFyZ3VtZW50cyk7IC8vIENhbGwgdGhlIG1ldGhvZFxuXHRcdHRhZy5iYXNlID0gcHJldkJhc2U7IC8vIFJlcGxhY2UgdGhpcy5iYXNlIHRvIGJlIHRoZSBiYXNlIG1ldGhvZCBvZiB0aGUgcHJldmlvdXMgY2FsbCwgZm9yIGNoYWluZWQgY2FsbHNcblx0XHRyZXR1cm4gcmV0O1xuXHR9O1xufVxuXG5mdW5jdGlvbiBnZXRNZXRob2QoYmFzZU1ldGhvZCwgbWV0aG9kKSB7XG5cdC8vIEZvciBkZXJpdmVkIG1ldGhvZHMgKG9yIGhhbmRsZXJzIGRlY2xhcmVkIGRlY2xhcmF0aXZlbHkgYXMgaW4ge3s6Zm9vIG9uQ2hhbmdlPX5mb29DaGFuZ2VkfX0gcmVwbGFjZSBieSBhIGRlcml2ZWQgbWV0aG9kLCB0byBhbGxvdyB1c2luZyB0aGlzLmJhc2UoLi4uKVxuXHQvLyBvciB0aGlzLmJhc2VBcHBseShhcmd1bWVudHMpIHRvIGNhbGwgdGhlIGJhc2UgaW1wbGVtZW50YXRpb24uIChFcXVpdmFsZW50IHRvIHRoaXMuX3N1cGVyKC4uLikgYW5kIHRoaXMuX3N1cGVyQXBwbHkoYXJndW1lbnRzKSBpbiBqUXVlcnkgVUkpXG5cdGlmICgkaXNGdW5jdGlvbihtZXRob2QpKSB7XG5cdFx0bWV0aG9kID0gZ2V0RGVyaXZlZE1ldGhvZChcblx0XHRcdFx0IWJhc2VNZXRob2Rcblx0XHRcdFx0XHQ/IG5vb3AgLy8gbm8gYmFzZSBtZXRob2QgaW1wbGVtZW50YXRpb24sIHNvIHVzZSBub29wIGFzIGJhc2UgbWV0aG9kXG5cdFx0XHRcdFx0OiBiYXNlTWV0aG9kLl9kXG5cdFx0XHRcdFx0XHQ/IGJhc2VNZXRob2QgLy8gYmFzZU1ldGhvZCBpcyBhIGRlcml2ZWQgbWV0aG9kLCBzbyB1c2UgaXRcblx0XHRcdFx0XHRcdDogZ2V0RGVyaXZlZE1ldGhvZChub29wLCBiYXNlTWV0aG9kKSwgLy8gYmFzZU1ldGhvZCBpcyBub3QgZGVyaXZlZCBzbyBtYWtlIGl0cyBiYXNlIG1ldGhvZCBiZSB0aGUgbm9vcCBtZXRob2Rcblx0XHRcdFx0bWV0aG9kXG5cdFx0XHQpO1xuXHRcdG1ldGhvZC5fZCA9IChiYXNlTWV0aG9kICYmIGJhc2VNZXRob2QuX2QgfHwgMCkgKyAxOyAvLyBBZGQgZmxhZyBmb3IgZGVyaXZlZCBtZXRob2QgKGluY3JlbWVudGVkIGZvciBkZXJpdmVkIG9mIGRlcml2ZWQuLi4pXG5cdH1cblx0cmV0dXJuIG1ldGhvZDtcbn1cblxuZnVuY3Rpb24gdGFnSGFuZGxlcnNGcm9tUHJvcHModGFnLCB0YWdDdHgpIHtcblx0dmFyIHByb3AsXG5cdFx0cHJvcHMgPSB0YWdDdHgucHJvcHM7XG5cdGZvciAocHJvcCBpbiBwcm9wcykge1xuXHRcdGlmIChySGFzSGFuZGxlcnMudGVzdChwcm9wKSAmJiAhKHRhZ1twcm9wXSAmJiB0YWdbcHJvcF0uZml4KSkgeyAvLyBEb24ndCBvdmVycmlkZSBoYW5kbGVycyB3aXRoIGZpeCBleHBhbmRvICh1c2VkIGluIGRhdGVwaWNrZXIgYW5kIHNwaW5uZXIpXG5cdFx0XHR0YWdbcHJvcF0gPSBwcm9wICE9PSBcImNvbnZlcnRcIiA/IGdldE1ldGhvZCh0YWcuY29uc3RydWN0b3IucHJvdG90eXBlW3Byb3BdLCBwcm9wc1twcm9wXSkgOiBwcm9wc1twcm9wXTtcblx0XHRcdC8vIENvcHkgb3ZlciB0aGUgb25Gb28gcHJvcHMsIGNvbnZlcnQgYW5kIGNvbnZlcnRCYWNrIGZyb20gdGFnQ3R4LnByb3BzIHRvIHRhZyAob3ZlcnJpZGVzIHZhbHVlcyBpbiB0YWdEZWYpLlxuXHRcdFx0Ly8gTm90ZTogdW5zdXBwb3J0ZWQgc2NlbmFyaW86IGlmIGhhbmRsZXJzIGFyZSBkeW5hbWljYWxseSBhZGRlZCBeb25Gb289ZXhwcmVzc2lvbiB0aGlzIHdpbGwgd29yaywgYnV0IGR5bmFtaWNhbGx5IHJlbW92aW5nIHdpbGwgbm90IHdvcmsuXG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHJldFZhbCh2YWwpIHtcblx0cmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHtcblx0cmV0dXJuIFwiXCI7XG59XG5cbmZ1bmN0aW9uIGRiZ0JyZWFrKHZhbCkge1xuXHQvLyBVc2FnZSBleGFtcGxlczoge3tkYmc6Li4ufX0sIHt7On5kYmcoLi4uKX19LCB7e2RiZyAuLi4vfX0sIHtee2ZvciAuLi4gb25BZnRlckxpbms9fmRiZ319IGV0Yy5cblx0dHJ5IHtcblx0XHRjb25zb2xlLmxvZyhcIkpzUmVuZGVyIGRiZyBicmVha3BvaW50OiBcIiArIHZhbCk7XG5cdFx0dGhyb3cgXCJkYmcgYnJlYWtwb2ludFwiOyAvLyBUbyBicmVhayBoZXJlLCBzdG9wIG9uIGNhdWdodCBleGNlcHRpb25zLlxuXHR9XG5cdGNhdGNoIChlKSB7fVxuXHRyZXR1cm4gdGhpcy5iYXNlID8gdGhpcy5iYXNlQXBwbHkoYXJndW1lbnRzKSA6IHZhbDtcbn1cblxuZnVuY3Rpb24gSnNWaWV3c0Vycm9yKG1lc3NhZ2UpIHtcblx0Ly8gRXJyb3IgZXhjZXB0aW9uIHR5cGUgZm9yIEpzVmlld3MvSnNSZW5kZXJcblx0Ly8gT3ZlcnJpZGUgb2YgJC52aWV3cy5zdWIuRXJyb3IgaXMgcG9zc2libGVcblx0dGhpcy5uYW1lID0gKCQubGluayA/IFwiSnNWaWV3c1wiIDogXCJKc1JlbmRlclwiKSArIFwiIEVycm9yXCI7XG5cdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgdGhpcy5uYW1lO1xufVxuXG5mdW5jdGlvbiAkZXh0ZW5kKHRhcmdldCwgc291cmNlKSB7XG5cdGlmICh0YXJnZXQpIHtcblx0XHRmb3IgKHZhciBuYW1lIGluIHNvdXJjZSkge1xuXHRcdFx0dGFyZ2V0W25hbWVdID0gc291cmNlW25hbWVdO1xuXHRcdH1cblx0XHRyZXR1cm4gdGFyZ2V0O1xuXHR9XG59XG5cbihKc1ZpZXdzRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKCkpLmNvbnN0cnVjdG9yID0gSnNWaWV3c0Vycm9yO1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09IFRvcC1sZXZlbCBmdW5jdGlvbnMgPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy89PT09PT09PT09PT09PT09PT09XG4vLyB2aWV3cy5kZWxpbWl0ZXJzXG4vLz09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gJHZpZXdzRGVsaW1pdGVycyhvcGVuQ2hhcnMsIGNsb3NlQ2hhcnMsIGxpbmspIHtcblx0Ly8gU2V0IHRoZSB0YWcgb3BlbmluZyBhbmQgY2xvc2luZyBkZWxpbWl0ZXJzIGFuZCAnbGluaycgY2hhcmFjdGVyLiBEZWZhdWx0IGlzIFwie3tcIiwgXCJ9fVwiIGFuZCBcIl5cIlxuXHQvLyBvcGVuQ2hhcnMsIGNsb3NlQ2hhcnM6IG9wZW5pbmcgYW5kIGNsb3Npbmcgc3RyaW5ncywgZWFjaCB3aXRoIHR3byBjaGFyYWN0ZXJzXG5cdGlmICghb3BlbkNoYXJzKSB7XG5cdFx0cmV0dXJuICRzdWJTZXR0aW5ncy5kZWxpbWl0ZXJzO1xuXHR9XG5cdGlmICgkaXNBcnJheShvcGVuQ2hhcnMpKSB7XG5cdFx0cmV0dXJuICR2aWV3c0RlbGltaXRlcnMuYXBwbHkoJHZpZXdzLCBvcGVuQ2hhcnMpO1xuXHR9XG5cblx0JHN1YlNldHRpbmdzLmRlbGltaXRlcnMgPSBbb3BlbkNoYXJzLCBjbG9zZUNoYXJzLCBsaW5rQ2hhciA9IGxpbmsgPyBsaW5rLmNoYXJBdCgwKSA6IGxpbmtDaGFyXTtcblxuXHRkZWxpbU9wZW5DaGFyMCA9IG9wZW5DaGFycy5jaGFyQXQoMCk7IC8vIEVzY2FwZSB0aGUgY2hhcmFjdGVycyAtIHNpbmNlIHRoZXkgY291bGQgYmUgcmVnZXggc3BlY2lhbCBjaGFyYWN0ZXJzXG5cdGRlbGltT3BlbkNoYXIxID0gb3BlbkNoYXJzLmNoYXJBdCgxKTtcblx0ZGVsaW1DbG9zZUNoYXIwID0gY2xvc2VDaGFycy5jaGFyQXQoMCk7XG5cdGRlbGltQ2xvc2VDaGFyMSA9IGNsb3NlQ2hhcnMuY2hhckF0KDEpO1xuXHRvcGVuQ2hhcnMgPSBcIlxcXFxcIiArIGRlbGltT3BlbkNoYXIwICsgXCIoXFxcXFwiICsgbGlua0NoYXIgKyBcIik/XFxcXFwiICsgZGVsaW1PcGVuQ2hhcjE7IC8vIERlZmF1bHQgaXMgXCJ7XntcIlxuXHRjbG9zZUNoYXJzID0gXCJcXFxcXCIgKyBkZWxpbUNsb3NlQ2hhcjAgKyBcIlxcXFxcIiArIGRlbGltQ2xvc2VDaGFyMTsgICAgICAgICAgICAgICAgICAgLy8gRGVmYXVsdCBpcyBcIn19XCJcblx0Ly8gQnVpbGQgcmVnZXggd2l0aCBuZXcgZGVsaW1pdGVyc1xuXHQvLyAgICAgICAgICBbdGFnICAgIChmb2xsb3dlZCBieSAvIHNwYWNlIG9yIH0pICBvciBjdnRyK2NvbG9uIG9yIGh0bWwgb3IgY29kZV0gZm9sbG93ZWQgYnkgc3BhY2UrcGFyYW1zIHRoZW4gY29udmVydEJhY2s/XG5cdHJUYWcgPSBcIig/OihcXFxcdysoPz1bXFxcXC9cXFxcc1xcXFxcIiArIGRlbGltQ2xvc2VDaGFyMCArIFwiXSkpfChcXFxcdyspPyg6KXwoPil8KFxcXFwqKSlcXFxccyooKD86W15cXFxcXCJcblx0XHQrIGRlbGltQ2xvc2VDaGFyMCArIFwiXXxcXFxcXCIgKyBkZWxpbUNsb3NlQ2hhcjAgKyBcIig/IVxcXFxcIiArIGRlbGltQ2xvc2VDaGFyMSArIFwiKSkqPylcIjtcblxuXHQvLyBNYWtlIHJUYWcgYXZhaWxhYmxlIHRvIEpzVmlld3MgKG9yIG90aGVyIGNvbXBvbmVudHMpIGZvciBwYXJzaW5nIGJpbmRpbmcgZXhwcmVzc2lvbnNcblx0JHN1Yi5yVGFnID0gXCIoPzpcIiArIHJUYWcgKyBcIilcIjtcblx0Ly8gICAgICAgICAgICAgICAgICAgICAgICB7IF4/IHsgICB0YWcrcGFyYW1zIHNsYXNoPyAgb3IgY2xvc2luZ1RhZyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIGNvbW1lbnRcblx0clRhZyA9IG5ldyBSZWdFeHAoXCIoPzpcIiArIG9wZW5DaGFycyArIHJUYWcgKyBcIihcXFxcLyk/fFxcXFxcIiArIGRlbGltT3BlbkNoYXIwICsgXCIoXFxcXFwiICsgbGlua0NoYXIgKyBcIik/XFxcXFwiICsgZGVsaW1PcGVuQ2hhcjEgKyBcIig/Oig/OlxcXFwvKFxcXFx3KykpXFxcXHMqfCEtLVtcXFxcc1xcXFxTXSo/LS0pKVwiICsgY2xvc2VDaGFycywgXCJnXCIpO1xuXG5cdC8vIERlZmF1bHQ6ICBiaW5kICAgICB0YWdOYW1lICAgICAgICAgY3Z0ICAgY2xuIGh0bWwgY29kZSAgICBwYXJhbXMgICAgICAgICAgICBzbGFzaCAgIGJpbmQyICAgICAgICAgY2xvc2VCbGsgIGNvbW1lbnRcblx0Ly8gICAgICAvKD86eyhcXF4pP3soPzooXFx3Kyg/PVtcXC9cXHN9XSkpfChcXHcrKT8oOil8KD4pfChcXCopKVxccyooKD86W159XXx9KD8hfSkpKj8pKFxcLyk/fHsoXFxeKT97KD86KD86XFwvKFxcdyspKVxccyp8IS0tW1xcc1xcU10qPy0tKSl9fVxuXG5cdCRzdWIuclRtcGwgPSBuZXcgUmVnRXhwKFwiXlxcXFxzfFxcXFxzJHw8Lio+fChbXlxcXFxcXFxcXXxeKVt7fV18XCIgKyBvcGVuQ2hhcnMgKyBcIi4qXCIgKyBjbG9zZUNoYXJzKTtcblx0Ly8gJHN1Yi5yVG1wbCBsb29rcyBmb3IgaW5pdGlhbCBvciBmaW5hbCB3aGl0ZSBzcGFjZSwgaHRtbCB0YWdzIG9yIHsgb3IgfSBjaGFyIG5vdCBwcmVjZWRlZCBieSBcXFxcLCBvciBKc1JlbmRlciB0YWdzIHt7eHh4fX0uXG5cdC8vIEVhY2ggb2YgdGhlc2Ugc3RyaW5ncyBhcmUgY29uc2lkZXJlZCBOT1QgdG8gYmUgalF1ZXJ5IHNlbGVjdG9yc1xuXHRyZXR1cm4gJHZpZXdzU2V0dGluZ3M7XG59XG5cbi8vPT09PT09PT09XG4vLyBWaWV3LmdldFxuLy89PT09PT09PT1cblxuZnVuY3Rpb24gZ2V0Vmlldyhpbm5lciwgdHlwZSkgeyAvL3ZpZXcuZ2V0KGlubmVyLCB0eXBlKVxuXHRpZiAoIXR5cGUgJiYgaW5uZXIgIT09IHRydWUpIHtcblx0XHQvLyB2aWV3LmdldCh0eXBlKVxuXHRcdHR5cGUgPSBpbm5lcjtcblx0XHRpbm5lciA9IHVuZGVmaW5lZDtcblx0fVxuXG5cdHZhciB2aWV3cywgaSwgbCwgZm91bmQsXG5cdFx0dmlldyA9IHRoaXMsXG5cdFx0cm9vdCA9ICF0eXBlIHx8IHR5cGUgPT09IFwicm9vdFwiO1xuXHRcdC8vIElmIHR5cGUgaXMgdW5kZWZpbmVkLCByZXR1cm5zIHJvb3QgdmlldyAodmlldyB1bmRlciB0b3AgdmlldykuXG5cblx0aWYgKGlubmVyKSB7XG5cdFx0Ly8gR28gdGhyb3VnaCB2aWV3cyAtIHRoaXMgb25lLCBhbmQgYWxsIG5lc3RlZCBvbmVzLCBkZXB0aC1maXJzdCAtIGFuZCByZXR1cm4gZmlyc3Qgb25lIHdpdGggZ2l2ZW4gdHlwZS5cblx0XHQvLyBJZiB0eXBlIGlzIHVuZGVmaW5lZCwgaS5lLiB2aWV3LmdldCh0cnVlKSwgcmV0dXJuIGZpcnN0IGNoaWxkIHZpZXcuXG5cdFx0Zm91bmQgPSB0eXBlICYmIHZpZXcudHlwZSA9PT0gdHlwZSAmJiB2aWV3O1xuXHRcdGlmICghZm91bmQpIHtcblx0XHRcdHZpZXdzID0gdmlldy52aWV3cztcblx0XHRcdGlmICh2aWV3Ll8udXNlS2V5KSB7XG5cdFx0XHRcdGZvciAoaSBpbiB2aWV3cykge1xuXHRcdFx0XHRcdGlmIChmb3VuZCA9IHR5cGUgPyB2aWV3c1tpXS5nZXQoaW5uZXIsIHR5cGUpIDogdmlld3NbaV0pIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yIChpID0gMCwgbCA9IHZpZXdzLmxlbmd0aDsgIWZvdW5kICYmIGkgPCBsOyBpKyspIHtcblx0XHRcdFx0XHRmb3VuZCA9IHR5cGUgPyB2aWV3c1tpXS5nZXQoaW5uZXIsIHR5cGUpIDogdmlld3NbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSBpZiAocm9vdCkge1xuXHRcdC8vIEZpbmQgcm9vdCB2aWV3LiAodmlldyB3aG9zZSBwYXJlbnQgaXMgdG9wIHZpZXcpXG5cdFx0Zm91bmQgPSB2aWV3LnJvb3Q7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUgKHZpZXcgJiYgIWZvdW5kKSB7XG5cdFx0XHQvLyBHbyB0aHJvdWdoIHZpZXdzIC0gdGhpcyBvbmUsIGFuZCBhbGwgcGFyZW50IG9uZXMgLSBhbmQgcmV0dXJuIGZpcnN0IG9uZSB3aXRoIGdpdmVuIHR5cGUuXG5cdFx0XHRmb3VuZCA9IHZpZXcudHlwZSA9PT0gdHlwZSA/IHZpZXcgOiB1bmRlZmluZWQ7XG5cdFx0XHR2aWV3ID0gdmlldy5wYXJlbnQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmb3VuZDtcbn1cblxuZnVuY3Rpb24gZ2V0TmVzdGVkSW5kZXgoKSB7XG5cdHZhciB2aWV3ID0gdGhpcy5nZXQoXCJpdGVtXCIpO1xuXHRyZXR1cm4gdmlldyA/IHZpZXcuaW5kZXggOiB1bmRlZmluZWQ7XG59XG5cbmdldE5lc3RlZEluZGV4LmRlcGVuZHMgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIFt0aGlzLmdldChcIml0ZW1cIiksIFwiaW5kZXhcIl07XG59O1xuXG5mdW5jdGlvbiBnZXRJbmRleCgpIHtcblx0cmV0dXJuIHRoaXMuaW5kZXg7XG59XG5cbmdldEluZGV4LmRlcGVuZHMgPSBcImluZGV4XCI7XG5cbi8vPT09PT09PT09PVxuLy8gVmlldy5obHBcbi8vPT09PT09PT09PVxuXG5mdW5jdGlvbiBnZXRQYXRoT2JqZWN0KG9iLCBwYXRoLCBsdE9iLCBmbikgeyAvLyBJdGVyYXRlIHRocm91Z2ggcGF0aCB0byBsYXRlIHBhdGhzOiBAYS5iLmMgcGF0aHNcblx0Ly8gUmV0dXJuIFwiXCIgKG9yIG5vb3AgaWYgbGVhZiBpcyBhIGZ1bmN0aW9uIEBhLmIuYyguLi4pICkgaWYgaW50ZXJtZWRpYXRlIG9iamVjdCBub3QgeWV0IGF2YWlsYWJsZVxuXHR2YXIgcHJldk9iLCB0b2tlbnMsIGwsXG5cdFx0aSA9IDA7XG5cdGlmIChsdE9iID09PSAxKSB7XG5cdFx0Zm4gPSAxO1xuXHRcdGx0T2IgPSB1bmRlZmluZWQ7XG5cdH1cblx0Ly8gUGF0aHMgbGlrZSBeYV5iXmMgb3Igfl5hXmJeYyB3aWxsIG5vdCB0aHJvdyBpZiBhbiBvYmplY3QgaW4gcGF0aCBpcyB1bmRlZmluZWQuXG5cdGlmIChwYXRoKSB7XG5cdFx0dG9rZW5zID0gcGF0aC5zcGxpdChcIi5cIik7XG5cdFx0bCA9IHRva2Vucy5sZW5ndGg7XG5cblx0XHRmb3IgKDsgb2IgJiYgaSA8IGw7IGkrKykge1xuXHRcdFx0cHJldk9iID0gb2I7XG5cdFx0XHRvYiA9IHRva2Vuc1tpXSA/IG9iW3Rva2Vuc1tpXV0gOiBvYjtcblx0XHR9XG5cdH1cblx0aWYgKGx0T2IpIHtcblx0XHRsdE9iLmx0ID0gbHRPYi5sdCB8fCBpPGw7IC8vIElmIGkgPCBsIHRoZXJlIHdhcyBhbiBvYmplY3QgaW4gdGhlIHBhdGggbm90IHlldCBhdmFpbGFibGVcblx0fVxuXHRyZXR1cm4gb2IgPT09IHVuZGVmaW5lZFxuXHRcdD8gZm4gPyBub29wIDogXCJcIlxuXHRcdDogZm4gPyBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBvYi5hcHBseShwcmV2T2IsIGFyZ3VtZW50cyk7XG5cdFx0fSA6IG9iO1xufVxuXG5mdW5jdGlvbiBjb250ZXh0UGFyYW1ldGVyKGtleSwgdmFsdWUsIGdldCkge1xuXHQvLyBIZWxwZXIgbWV0aG9kIGNhbGxlZCBhcyB2aWV3LmN0eFBybShrZXkpIGZvciBoZWxwZXJzIG9yIHRlbXBsYXRlIHBhcmFtZXRlcnMgfmZvbyAtIGZyb20gY29tcGlsZWQgdGVtcGxhdGUgb3IgZnJvbSBjb250ZXh0IGNhbGxiYWNrXG5cdHZhciB3cmFwcGVkLCBkZXBzLCByZXMsIG9ic0N0eFBybSwgdGFnRWxzZSwgY2FsbFZpZXcsIG5ld1Jlcyxcblx0XHRzdG9yZVZpZXcgPSB0aGlzLFxuXHRcdGlzVXBkYXRlID0gIWlzUmVuZGVyQ2FsbCAmJiBhcmd1bWVudHMubGVuZ3RoID4gMSxcblx0XHRzdG9yZSA9IHN0b3JlVmlldy5jdHg7XG5cblx0aWYgKGtleSkge1xuXHRcdGlmICghc3RvcmVWaWV3Ll8pIHsgLy8gdGFnQ3R4LmN0eFBybSgpIGNhbGxcblx0XHRcdHRhZ0Vsc2UgPSBzdG9yZVZpZXcuaW5kZXg7XG5cdFx0XHRzdG9yZVZpZXcgPSBzdG9yZVZpZXcudGFnO1xuXHRcdH1cblx0XHRjYWxsVmlldyA9IHN0b3JlVmlldztcblx0XHRpZiAoc3RvcmUgJiYgc3RvcmUuaGFzT3duUHJvcGVydHkoa2V5KSB8fCAoc3RvcmUgPSAkaGVscGVycykuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0cmVzID0gc3RvcmVba2V5XTtcblx0XHRcdGlmIChrZXkgPT09IFwidGFnXCIgfHwga2V5ID09PSBcInRhZ0N0eFwiIHx8IGtleSA9PT0gXCJyb290XCIgfHwga2V5ID09PSBcInBhcmVudFRhZ3NcIiB8fCBzdG9yZVZpZXcuXy5pdCA9PT0ga2V5ICkge1xuXHRcdFx0XHRyZXR1cm4gcmVzO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdG9yZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKHN0b3JlVmlldy50YWdDdHggfHwgc3RvcmVWaWV3LmxpbmtlZCkgeyAvLyBEYXRhLWxpbmtlZCB2aWV3LCBvciB0YWcgaW5zdGFuY2Vcblx0XHRcdGlmICghcmVzIHx8ICFyZXMuX2N4cCkge1xuXHRcdFx0XHQvLyBOb3QgYSBjb250ZXh0dWFsIHBhcmFtZXRlclxuXHRcdFx0XHQvLyBTZXQgc3RvcmVWaWV3IHRvIHRhZyAoaWYgdGhpcyBpcyBhIHRhZy5jdHhQcm0oKSBjYWxsKSBvciB0byByb290IHZpZXcgKFwiZGF0YVwiIHZpZXcgb2YgbGlua2VkIHRlbXBsYXRlKVxuXHRcdFx0XHRzdG9yZVZpZXcgPSBzdG9yZVZpZXcudGFnQ3R4IHx8ICRpc0Z1bmN0aW9uKHJlcylcblx0XHRcdFx0XHQ/IHN0b3JlVmlldyAvLyBJcyBhIHRhZywgbm90IGEgdmlldywgb3IgaXMgYSBjb21wdXRlZCBjb250ZXh0dWFsIHBhcmFtZXRlciwgc28gc2NvcGUgdG8gdGhlIGNhbGxWaWV3LCBubyB0aGUgJ3Njb3BlIHZpZXcnXG5cdFx0XHRcdFx0OiAoc3RvcmVWaWV3ID0gc3RvcmVWaWV3LnNjb3BlIHx8IHN0b3JlVmlldyxcblx0XHRcdFx0XHRcdCFzdG9yZVZpZXcuaXNUb3AgJiYgc3RvcmVWaWV3LmN0eC50YWcgLy8gSWYgdGhpcyB2aWV3IGlzIGluIGEgdGFnLCBzZXQgc3RvcmVWaWV3IHRvIHRoZSB0YWdcblx0XHRcdFx0XHRcdFx0fHwgc3RvcmVWaWV3KTtcblx0XHRcdFx0aWYgKHJlcyAhPT0gdW5kZWZpbmVkICYmIHN0b3JlVmlldy50YWdDdHgpIHtcblx0XHRcdFx0XHQvLyBJZiBzdG9yZVZpZXcgaXMgYSB0YWcsIGJ1dCB0aGUgY29udGV4dHVhbCBwYXJhbWV0ZXIgaGFzIGJlZW4gc2V0IGF0IGF0IGhpZ2hlciBsZXZlbCAoZS5nLiBoZWxwZXJzKS4uLlxuXHRcdFx0XHRcdHN0b3JlVmlldyA9IHN0b3JlVmlldy50YWdDdHgudmlldy5zY29wZTsgLy8gIHRoZW4gbW92ZSBzdG9yZVZpZXcgdG8gdGhlIG91dGVyIGxldmVsIChzY29wZSBvZiB0YWcgY29udGFpbmVyIHZpZXcpXG5cdFx0XHRcdH1cblx0XHRcdFx0c3RvcmUgPSBzdG9yZVZpZXcuX29jcHM7XG5cdFx0XHRcdHJlcyA9IHN0b3JlICYmIHN0b3JlLmhhc093blByb3BlcnR5KGtleSkgJiYgc3RvcmVba2V5XSB8fCByZXM7XG5cdFx0XHRcdGlmICghKHJlcyAmJiByZXMuX2N4cCkgJiYgKGdldCB8fCBpc1VwZGF0ZSkpIHtcblx0XHRcdFx0XHQvLyBDcmVhdGUgb2JzZXJ2YWJsZSBjb250ZXh0dWFsIHBhcmFtZXRlclxuXHRcdFx0XHRcdChzdG9yZSB8fCAoc3RvcmVWaWV3Ll9vY3BzID0gc3RvcmVWaWV3Ll9vY3BzIHx8IHt9KSlba2V5XVxuXHRcdFx0XHRcdFx0PSByZXNcblx0XHRcdFx0XHRcdD0gW3tcblx0XHRcdFx0XHRcdFx0X29jcDogcmVzLCAvLyBUaGUgb2JzZXJ2YWJsZSBjb250ZXh0dWFsIHBhcmFtZXRlciB2YWx1ZVxuXHRcdFx0XHRcdFx0XHRfdnc6IGNhbGxWaWV3LFxuXHRcdFx0XHRcdFx0XHRfa2V5OiBrZXlcblx0XHRcdFx0XHRcdH1dO1xuXHRcdFx0XHRcdHJlcy5fY3hwID0ge1xuXHRcdFx0XHRcdFx0cGF0aDogX29jcCxcblx0XHRcdFx0XHRcdGluZDogMCxcblx0XHRcdFx0XHRcdHVwZGF0ZVZhbHVlOiBmdW5jdGlvbih2YWwsIHBhdGgpIHtcblx0XHRcdFx0XHRcdFx0JC5vYnNlcnZhYmxlKHJlc1swXSkuc2V0UHJvcGVydHkoX29jcCwgdmFsKTsgLy8gU2V0IHRoZSB2YWx1ZSAocmVzWzBdLl9vY3ApXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChvYnNDdHhQcm0gPSByZXMgJiYgcmVzLl9jeHApIHtcblx0XHRcdFx0Ly8gSWYgdGhpcyBoZWxwZXIgcmVzb3VyY2UgaXMgYW4gb2JzZXJ2YWJsZSBjb250ZXh0dWFsIHBhcmFtZXRlclxuXHRcdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcblx0XHRcdFx0XHRkZXBzID0gcmVzWzFdID8gJHN1Yi5fY2VvKHJlc1sxXS5kZXBzKSA6IFtfb2NwXTsgLy8gZm4gZGVwcyAod2l0aCBhbnkgZXhwck9icyBjbG9uZWQgdXNpbmcgJHN1Yi5fY2VvKVxuXHRcdFx0XHRcdGRlcHMudW5zaGlmdChyZXNbMF0pOyAvLyB2aWV3XG5cdFx0XHRcdFx0ZGVwcy5fY3hwID0gb2JzQ3R4UHJtO1xuXHRcdFx0XHRcdC8vIEluIGEgY29udGV4dCBjYWxsYmFjayBmb3IgYSBjb250ZXh0dWFsIHBhcmFtLCB3ZSBzZXQgZ2V0ID0gdHJ1ZSwgdG8gZ2V0IGN0eFBybSAgW3ZpZXcsIGRlcGVuZGVuY2llcy4uLl0gYXJyYXkgLSBuZWVkZWQgZm9yIG9ic2VydmUgY2FsbFxuXHRcdFx0XHRcdHJldHVybiBkZXBzO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRhZ0Vsc2UgPSBvYnNDdHhQcm0udGFnRWxzZTtcblx0XHRcdFx0bmV3UmVzID0gcmVzWzFdIC8vIGxpbmtGbiBmb3IgY29tcGlsZWQgZXhwcmVzc2lvblxuXHRcdFx0XHRcdD8gb2JzQ3R4UHJtLnRhZyAmJiBvYnNDdHhQcm0udGFnLmN2dEFyZ3Ncblx0XHRcdFx0XHRcdD8gb2JzQ3R4UHJtLnRhZy5jdnRBcmdzKDEsIHRhZ0Vsc2UpW29ic0N0eFBybS5pbmRdIC8vID0gdGFnLmJuZEFyZ3MoKSAtIGZvciB0YWcgY29udGV4dHVhbCBwYXJhbWV0ZXJcblx0XHRcdFx0XHRcdDogcmVzWzFdKHJlc1swXS5kYXRhLCByZXNbMF0sICRzdWIpICAgIC8vID0gZm4oZGF0YSwgdmlldywgJHN1YikgZm9yIGNvbXBpbGVkIGJpbmRpbmcgZXhwcmVzc2lvblxuXHRcdFx0XHRcdDogcmVzWzBdLl9vY3A7IC8vIE9ic2VydmFibGUgY29udGV4dHVhbCBwYXJhbWV0ZXIgKHVuaW5pdGlhbGl6ZWQsIG9yIGluaXRpYWxpemVkIGFzIHN0YXRpYyBleHByZXNzaW9uLCBzbyBubyBwYXRoIGRlcGVuZGVuY2llcylcblx0XHRcdFx0aWYgKGlzVXBkYXRlKSB7XG5cdFx0XHRcdFx0aWYgKHJlcyAmJiBuZXdSZXMgIT09IHZhbHVlKSB7XG5cdFx0XHRcdFx0XHQkc3ViLl91Y3Aoa2V5LCB2YWx1ZSwgc3RvcmVWaWV3LCBvYnNDdHhQcm0pOyAvLyBVcGRhdGUgb2JzZXJ2YWJsZSBjb250ZXh0dWFsIHBhcmFtZXRlclxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gc3RvcmVWaWV3O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJlcyA9IG5ld1Jlcztcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHJlcyAmJiAkaXNGdW5jdGlvbihyZXMpKSB7XG5cdFx0XHQvLyBJZiBhIGhlbHBlciBpcyBvZiB0eXBlIGZ1bmN0aW9uIHdlIHdpbGwgd3JhcCBpdCwgc28gaWYgY2FsbGVkIHdpdGggbm8gdGhpcyBwb2ludGVyIGl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlXG5cdFx0XHQvLyB2aWV3IGFzICd0aGlzJyBjb250ZXh0LiBJZiB0aGUgaGVscGVyIH5mb28oKSB3YXMgaW4gYSBkYXRhLWxpbmsgZXhwcmVzc2lvbiwgdGhlIHZpZXcgd2lsbCBoYXZlIGEgJ3RlbXBvcmFyeScgbGlua0N0eCBwcm9wZXJ0eSB0b28uXG5cdFx0XHQvLyBOb3RlIHRoYXQgaGVscGVyIGZ1bmN0aW9ucyBvbiBkZWVwZXIgcGF0aHMgd2lsbCBoYXZlIHNwZWNpZmljIHRoaXMgcG9pbnRlcnMsIGZyb20gdGhlIHByZWNlZGluZyBwYXRoLlxuXHRcdFx0Ly8gRm9yIGV4YW1wbGUsIH51dGlsLmZvbygpIHdpbGwgaGF2ZSB0aGUgfnV0aWwgb2JqZWN0IGFzICd0aGlzJyBwb2ludGVyXG5cdFx0XHR3cmFwcGVkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiByZXMuYXBwbHkoKCF0aGlzIHx8IHRoaXMgPT09IGdsb2JhbCkgPyBjYWxsVmlldyA6IHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHR9O1xuXHRcdFx0JGV4dGVuZCh3cmFwcGVkLCByZXMpOyAvLyBBdHRhY2ggc2FtZSBleHBhbmRvcyAoaWYgYW55KSB0byB0aGUgd3JhcHBlZCBmdW5jdGlvblxuXHRcdFx0d3JhcHBlZC5fdncgPSBjYWxsVmlldztcblx0XHR9XG5cdFx0cmV0dXJuIHdyYXBwZWQgfHwgcmVzO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdldFRlbXBsYXRlKHRtcGwpIHtcblx0cmV0dXJuIHRtcGwgJiYgKHRtcGwuZm5cblx0XHQ/IHRtcGxcblx0XHQ6IHRoaXMuZ2V0UnNjKFwidGVtcGxhdGVzXCIsIHRtcGwpIHx8ICR0ZW1wbGF0ZXModG1wbCkpOyAvLyBub3QgeWV0IGNvbXBpbGVkXG59XG5cbi8vPT09PT09PT09PT09PT1cbi8vIHZpZXdzLl9jbnZ0XG4vLz09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNvbnZlcnRWYWwoY29udmVydGVyLCB2aWV3LCB0YWdDdHgsIG9uRXJyb3IpIHtcblx0Ly8gQ2FsbGVkIGZyb20gY29tcGlsZWQgdGVtcGxhdGUgY29kZSBmb3Ige3s6fX1cblx0Ly8gc2VsZiBpcyB0ZW1wbGF0ZSBvYmplY3Qgb3IgbGlua0N0eCBvYmplY3Rcblx0dmFyIHRhZywgdmFsdWUsIGFyZ3NMZW4sIGJpbmRUbyxcblx0XHQvLyBJZiB0YWdDdHggaXMgYW4gaW50ZWdlciwgdGhlbiBpdCBpcyB0aGUga2V5IGZvciB0aGUgY29tcGlsZWQgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSBib3VuZFRhZyB0YWdDdHhcblx0XHRib3VuZFRhZyA9IHR5cGVvZiB0YWdDdHggPT09IFwibnVtYmVyXCIgJiYgdmlldy50bXBsLmJuZHNbdGFnQ3R4LTFdLFxuXHRcdGxpbmtDdHggPSB2aWV3LmxpbmtDdHg7IC8vIEZvciBkYXRhLWxpbms9XCJ7Y3Z0Oi4uLn1cIi4uLlxuXG5cdGlmIChvbkVycm9yID09PSB1bmRlZmluZWQgJiYgYm91bmRUYWcgJiYgYm91bmRUYWcuX2xyKSB7IC8vIGxhdGVSZW5kZXJcblx0XHRvbkVycm9yID0gXCJcIjtcblx0fVxuXHRpZiAob25FcnJvciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dGFnQ3R4ID0gb25FcnJvciA9IHtwcm9wczoge30sIGFyZ3M6IFtvbkVycm9yXX07XG5cdH0gZWxzZSBpZiAoYm91bmRUYWcpIHtcblx0XHR0YWdDdHggPSBib3VuZFRhZyh2aWV3LmRhdGEsIHZpZXcsICRzdWIpO1xuXHR9XG5cdGJvdW5kVGFnID0gYm91bmRUYWcuX2JkICYmIGJvdW5kVGFnO1xuXHRpZiAoY29udmVydGVyIHx8IGJvdW5kVGFnKSB7XG5cdFx0dGFnID0gbGlua0N0eCAmJiBsaW5rQ3R4LnRhZztcblx0XHR0YWdDdHgudmlldyA9IHZpZXc7XG5cdFx0aWYgKCF0YWcpIHtcblx0XHRcdHRhZyA9ICRleHRlbmQobmV3ICRzdWIuX3RnKCksIHtcblx0XHRcdFx0Xzoge1xuXHRcdFx0XHRcdGJuZDogYm91bmRUYWcsXG5cdFx0XHRcdFx0dW5saW5rZWQ6IHRydWUsXG5cdFx0XHRcdFx0bHQ6IHRhZ0N0eC5sdCAvLyBJZiBhIGxhdGUgcGF0aCBAc29tZS5wYXRoIGhhcyBub3QgcmV0dXJuZWQgQHNvbWUgb2JqZWN0LCBtYXJrIHRhZyBhcyBsYXRlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGlubGluZTogIWxpbmtDdHgsXG5cdFx0XHRcdHRhZ05hbWU6IFwiOlwiLFxuXHRcdFx0XHRjb252ZXJ0OiBjb252ZXJ0ZXIsXG5cdFx0XHRcdGZsb3c6IHRydWUsXG5cdFx0XHRcdHRhZ0N0eDogdGFnQ3R4LFxuXHRcdFx0XHR0YWdDdHhzOiBbdGFnQ3R4XSxcblx0XHRcdFx0X2lzOiBcInRhZ1wiXG5cdFx0XHR9KTtcblx0XHRcdGFyZ3NMZW4gPSB0YWdDdHguYXJncy5sZW5ndGg7XG5cdFx0XHRpZiAoYXJnc0xlbj4xKSB7XG5cdFx0XHRcdGJpbmRUbyA9IHRhZy5iaW5kVG8gPSBbXTtcblx0XHRcdFx0d2hpbGUgKGFyZ3NMZW4tLSkge1xuXHRcdFx0XHRcdGJpbmRUby51bnNoaWZ0KGFyZ3NMZW4pOyAvLyBCaW5kIHRvIGFsbCB0aGUgYXJndW1lbnRzIC0gZ2VuZXJhdGUgYmluZFRvIGFycmF5OiBbMCwxLDIuLi5dXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChsaW5rQ3R4KSB7XG5cdFx0XHRcdGxpbmtDdHgudGFnID0gdGFnO1xuXHRcdFx0XHR0YWcubGlua0N0eCA9IGxpbmtDdHg7XG5cdFx0XHR9XG5cdFx0XHR0YWdDdHguY3R4ID0gZXh0ZW5kQ3R4KHRhZ0N0eC5jdHgsIChsaW5rQ3R4ID8gbGlua0N0eC52aWV3IDogdmlldykuY3R4KTtcblx0XHRcdHRhZ0hhbmRsZXJzRnJvbVByb3BzKHRhZywgdGFnQ3R4KTtcblx0XHR9XG5cdFx0dGFnLl9lciA9IG9uRXJyb3IgJiYgdmFsdWU7XG5cdFx0dGFnLmN0eCA9IHRhZ0N0eC5jdHggfHwgdGFnLmN0eCB8fCB7fTtcblx0XHR0YWdDdHguY3R4ID0gdW5kZWZpbmVkO1xuXHRcdHZhbHVlID0gdGFnLmN2dEFyZ3MoKVswXTsgLy8gSWYgdGhlcmUgaXMgYSBjb252ZXJ0QmFjayBidXQgbm8gY29udmVydCwgY29udmVydGVyIHdpbGwgYmUgXCJ0cnVlXCJcblx0XHR0YWcuX2VyID0gb25FcnJvciAmJiB2YWx1ZTtcblx0fSBlbHNlIHtcblx0XHR2YWx1ZSA9IHRhZ0N0eC5hcmdzWzBdO1xuXHR9XG5cblx0Ly8gQ2FsbCBvblJlbmRlciAodXNlZCBieSBKc1ZpZXdzIGlmIHByZXNlbnQsIHRvIGFkZCBiaW5kaW5nIGFubm90YXRpb25zIGFyb3VuZCByZW5kZXJlZCBjb250ZW50KVxuXHR2YWx1ZSA9IGJvdW5kVGFnICYmIHZpZXcuXy5vblJlbmRlclxuXHRcdD8gdmlldy5fLm9uUmVuZGVyKHZhbHVlLCB2aWV3LCB0YWcpXG5cdFx0OiB2YWx1ZTtcblx0cmV0dXJuIHZhbHVlICE9IHVuZGVmaW5lZCA/IHZhbHVlIDogXCJcIjtcbn1cblxuZnVuY3Rpb24gY29udmVydEFyZ3MoYm91bmQsIHRhZ0Vsc2UpIHsgLy8gdGFnLmN2dEFyZ3MoKSBvciB0YWcuY3Z0QXJncyh0cnVlT3JGYWxzZSwgdGFnRWxzZSlcblx0dmFyIGwsIGtleSwgYm91bmRBcmdzLCBhcmdzLCBiaW5kRnJvbSwgdGFnLCBjb252ZXJ0ZXIsXG5cdFx0dGFnQ3R4ID0gdGhpcztcblxuXHRpZiAodGFnQ3R4LnRhZ05hbWUpIHtcblx0XHR0YWcgPSB0YWdDdHg7XG5cdFx0dGFnQ3R4ID0gdGFnLnRhZ0N0eHMgPyB0YWcudGFnQ3R4c1t0YWdFbHNlIHx8IDBdIDogdGFnLnRhZ0N0eDtcblx0fSBlbHNlIHtcblx0XHR0YWcgPSB0YWdDdHgudGFnO1xuXHR9XG5cblx0YmluZEZyb20gPSB0YWcuYmluZEZyb207XG5cdGFyZ3MgPSB0YWdDdHguYXJncztcblxuXHRpZiAoKGNvbnZlcnRlciA9IHRhZy5jb252ZXJ0KSAmJiBcIlwiICsgY29udmVydGVyID09PSBjb252ZXJ0ZXIpIHtcblx0XHRjb252ZXJ0ZXIgPSBjb252ZXJ0ZXIgPT09IFwidHJ1ZVwiXG5cdFx0XHQ/IHVuZGVmaW5lZFxuXHRcdFx0OiAodGFnQ3R4LnZpZXcuZ2V0UnNjKFwiY29udmVydGVyc1wiLCBjb252ZXJ0ZXIpIHx8IGVycm9yKFwiVW5rbm93biBjb252ZXJ0ZXI6ICdcIiArIGNvbnZlcnRlciArIFwiJ1wiKSk7XG5cdH1cblxuXHRpZiAoY29udmVydGVyICYmICFib3VuZCkgeyAvLyBJZiB0aGVyZSBpcyBhIGNvbnZlcnRlciwgdXNlIGEgY29weSBvZiB0aGUgdGFnQ3R4LmFyZ3MgYXJyYXkgZm9yIHJlbmRlcmluZywgYW5kIHJlcGxhY2UgdGhlIGFyZ3NbMF0gaW5cblx0XHRhcmdzID0gYXJncy5zbGljZSgpOyAvLyB0aGUgY29waWVkIGFycmF5IHdpdGggdGhlIGNvbnZlcnRlZCB2YWx1ZS4gQnV0IHdlIGRvIG5vdCBtb2RpZnkgdGhlIHZhbHVlIG9mIHRhZy50YWdDdHguYXJnc1swXSAodGhlIG9yaWdpbmFsIGFyZ3MgYXJyYXkpXG5cdH1cblx0aWYgKGJpbmRGcm9tKSB7IC8vIEdldCB0aGUgdmFsdWVzIG9mIHRoZSBib3VuZEFyZ3Ncblx0XHRib3VuZEFyZ3MgPSBbXTtcblx0XHRsID0gYmluZEZyb20ubGVuZ3RoO1xuXHRcdHdoaWxlIChsLS0pIHtcblx0XHRcdGtleSA9IGJpbmRGcm9tW2xdO1xuXHRcdFx0Ym91bmRBcmdzLnVuc2hpZnQoYXJnT3JQcm9wKHRhZ0N0eCwga2V5KSk7XG5cdFx0fVxuXHRcdGlmIChib3VuZCkge1xuXHRcdFx0YXJncyA9IGJvdW5kQXJnczsgLy8gQ2FsbCB0byBibmRBcmdzKCkgLSByZXR1cm5zIHRoZSBib3VuZEFyZ3Ncblx0XHR9XG5cdH1cblx0aWYgKGNvbnZlcnRlcikge1xuXHRcdGNvbnZlcnRlciA9IGNvbnZlcnRlci5hcHBseSh0YWcsIGJvdW5kQXJncyB8fCBhcmdzKTtcblx0XHRpZiAoY29udmVydGVyID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBhcmdzOyAvLyBSZXR1cm5pbmcgdW5kZWZpbmVkIGZyb20gYSBjb252ZXJ0ZXIgaXMgZXF1aXZhbGVudCB0byBub3QgaGF2aW5nIGEgY29udmVydGVyLlxuXHRcdH1cblx0XHRiaW5kRnJvbSA9IGJpbmRGcm9tIHx8IFswXTtcblx0XHRsID0gYmluZEZyb20ubGVuZ3RoO1xuXHRcdGlmICghJGlzQXJyYXkoY29udmVydGVyKSB8fCBjb252ZXJ0ZXIubGVuZ3RoICE9PSBsKSB7XG5cdFx0XHRjb252ZXJ0ZXIgPSBbY29udmVydGVyXTtcblx0XHRcdGJpbmRGcm9tID0gWzBdO1xuXHRcdFx0bCA9IDE7XG5cdFx0fVxuXHRcdGlmIChib3VuZCkgeyAgICAgICAgLy8gQ2FsbCB0byBibmRBcmdzKCkgLSBzbyBhcHBseSBjb252ZXJ0ZXIgdG8gYWxsIGJvdW5kQXJnc1xuXHRcdFx0YXJncyA9IGNvbnZlcnRlcjsgLy8gVGhlIGFycmF5IG9mIHZhbHVlcyByZXR1cm5lZCBmcm9tIHRoZSBjb252ZXJ0ZXJcblx0XHR9IGVsc2UgeyAgICAgICAgICAgIC8vIENhbGwgdG8gY3Z0QXJncygpXG5cdFx0XHR3aGlsZSAobC0tKSB7XG5cdFx0XHRcdGtleSA9IGJpbmRGcm9tW2xdO1xuXHRcdFx0XHRpZiAoK2tleSA9PT0ga2V5KSB7XG5cdFx0XHRcdFx0YXJnc1trZXldID0gY29udmVydGVyW2xdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBhcmdzO1xufVxuXG5mdW5jdGlvbiBhcmdPclByb3AoY29udGV4dCwga2V5KSB7XG5cdGNvbnRleHQgPSBjb250ZXh0WytrZXkgPT09IGtleSA/IFwiYXJnc1wiIDogXCJwcm9wc1wiXTtcblx0cmV0dXJuIGNvbnRleHQgJiYgY29udGV4dFtrZXldO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0Qm91bmRBcmdzKHRhZ0Vsc2UpIHsgLy8gdGFnLmJuZEFyZ3MoKVxuXHRyZXR1cm4gdGhpcy5jdnRBcmdzKDEsIHRhZ0Vsc2UpO1xufVxuXG4vLz09PT09PT09PT09PT1cbi8vIHZpZXdzLl90YWdcbi8vPT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBnZXRSZXNvdXJjZShyZXNvdXJjZVR5cGUsIGl0ZW1OYW1lKSB7XG5cdHZhciByZXMsIHN0b3JlLFxuXHRcdHZpZXcgPSB0aGlzO1xuXHRpZiAoXCJcIiArIGl0ZW1OYW1lID09PSBpdGVtTmFtZSkge1xuXHRcdHdoaWxlICgocmVzID09PSB1bmRlZmluZWQpICYmIHZpZXcpIHtcblx0XHRcdHN0b3JlID0gdmlldy50bXBsICYmIHZpZXcudG1wbFtyZXNvdXJjZVR5cGVdO1xuXHRcdFx0cmVzID0gc3RvcmUgJiYgc3RvcmVbaXRlbU5hbWVdO1xuXHRcdFx0dmlldyA9IHZpZXcucGFyZW50O1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzIHx8ICR2aWV3c1tyZXNvdXJjZVR5cGVdW2l0ZW1OYW1lXTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW5kZXJUYWcodGFnTmFtZSwgcGFyZW50VmlldywgdG1wbCwgdGFnQ3R4cywgaXNVcGRhdGUsIG9uRXJyb3IpIHtcblx0ZnVuY3Rpb24gYmluZFRvT3JCaW5kRnJvbSh0eXBlKSB7XG5cdFx0dmFyIGJpbmRBcnJheSA9IHRhZ1t0eXBlXTtcblxuXHRcdGlmIChiaW5kQXJyYXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0YmluZEFycmF5ID0gJGlzQXJyYXkoYmluZEFycmF5KSA/IGJpbmRBcnJheSA6IFtiaW5kQXJyYXldO1xuXHRcdFx0bSA9IGJpbmRBcnJheS5sZW5ndGg7XG5cdFx0XHR3aGlsZSAobS0tKSB7XG5cdFx0XHRcdGtleSA9IGJpbmRBcnJheVttXTtcblx0XHRcdFx0aWYgKCFpc05hTihwYXJzZUludChrZXkpKSkge1xuXHRcdFx0XHRcdGJpbmRBcnJheVttXSA9IHBhcnNlSW50KGtleSk7IC8vIENvbnZlcnQgXCIwXCIgdG8gMCwgIGV0Yy5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBiaW5kQXJyYXkgfHwgWzBdO1xuXHR9XG5cblx0cGFyZW50VmlldyA9IHBhcmVudFZpZXcgfHwgdG9wVmlldztcblx0dmFyIHRhZywgdGFnRGVmLCB0ZW1wbGF0ZSwgdGFncywgYXR0ciwgcGFyZW50VGFnLCBsLCBtLCBuLCBpdGVtUmV0LCB0YWdDdHgsIHRhZ0N0eEN0eCwgY3R4UHJtLCBiaW5kVG8sIGJpbmRGcm9tLCBpbml0VmFsLFxuXHRcdGNvbnRlbnQsIGNhbGxJbml0LCBtYXBEZWYsIHRoaXNNYXAsIGFyZ3MsIGJkQXJncywgcHJvcHMsIHRhZ0RhdGFNYXAsIGNvbnRlbnRDdHgsIGtleSwgYmluZEZyb21MZW5ndGgsIGJpbmRUb0xlbmd0aCwgbGlua2VkRWxlbWVudCwgZGVmYXVsdEN0eCxcblx0XHRpID0gMCxcblx0XHRyZXQgPSBcIlwiLFxuXHRcdGxpbmtDdHggPSBwYXJlbnRWaWV3LmxpbmtDdHggfHwgMCxcblx0XHRjdHggPSBwYXJlbnRWaWV3LmN0eCxcblx0XHRwYXJlbnRUbXBsID0gdG1wbCB8fCBwYXJlbnRWaWV3LnRtcGwsXG5cdFx0Ly8gSWYgdGFnQ3R4cyBpcyBhbiBpbnRlZ2VyLCB0aGVuIGl0IGlzIHRoZSBrZXkgZm9yIHRoZSBjb21waWxlZCBmdW5jdGlvbiB0byByZXR1cm4gdGhlIGJvdW5kVGFnIHRhZ0N0eHNcblx0XHRib3VuZFRhZyA9IHR5cGVvZiB0YWdDdHhzID09PSBcIm51bWJlclwiICYmIHBhcmVudFZpZXcudG1wbC5ibmRzW3RhZ0N0eHMtMV07XG5cblx0aWYgKHRhZ05hbWUuX2lzID09PSBcInRhZ1wiKSB7XG5cdFx0dGFnID0gdGFnTmFtZTtcblx0XHR0YWdOYW1lID0gdGFnLnRhZ05hbWU7XG5cdFx0dGFnQ3R4cyA9IHRhZy50YWdDdHhzO1xuXHRcdHRlbXBsYXRlID0gdGFnLnRlbXBsYXRlO1xuXHR9IGVsc2Uge1xuXHRcdHRhZ0RlZiA9IHBhcmVudFZpZXcuZ2V0UnNjKFwidGFnc1wiLCB0YWdOYW1lKSB8fCBlcnJvcihcIlVua25vd24gdGFnOiB7e1wiICsgdGFnTmFtZSArIFwifX0gXCIpO1xuXHRcdHRlbXBsYXRlID0gdGFnRGVmLnRlbXBsYXRlO1xuXHR9XG5cdGlmIChvbkVycm9yID09PSB1bmRlZmluZWQgJiYgYm91bmRUYWcgJiYgKGJvdW5kVGFnLl9sciA9ICh0YWdEZWYubGF0ZVJlbmRlciAmJiBib3VuZFRhZy5fbHIhPT0gZmFsc2UgfHwgYm91bmRUYWcuX2xyKSkpIHtcblx0XHRvbkVycm9yID0gXCJcIjsgLy8gSWYgbGF0ZVJlbmRlciwgc2V0IHRlbXBvcmFyeSBvbkVycm9yLCB0byBza2lwIGluaXRpYWwgcmVuZGVyaW5nIChhbmQgcmVuZGVyIGp1c3QgXCJcIilcblx0fVxuXHRpZiAob25FcnJvciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0ICs9IG9uRXJyb3I7XG5cdFx0dGFnQ3R4cyA9IG9uRXJyb3IgPSBbe3Byb3BzOiB7fSwgYXJnczogW10sIHBhcmFtczoge3Byb3BzOnt9fX1dO1xuXHR9IGVsc2UgaWYgKGJvdW5kVGFnKSB7XG5cdFx0dGFnQ3R4cyA9IGJvdW5kVGFnKHBhcmVudFZpZXcuZGF0YSwgcGFyZW50VmlldywgJHN1Yik7XG5cdH1cblxuXHRsID0gdGFnQ3R4cy5sZW5ndGg7XG5cdGZvciAoOyBpIDwgbDsgaSsrKSB7XG5cdFx0dGFnQ3R4ID0gdGFnQ3R4c1tpXTtcblx0XHRjb250ZW50ID0gdGFnQ3R4LnRtcGw7XG5cdFx0aWYgKCFsaW5rQ3R4IHx8ICFsaW5rQ3R4LnRhZyB8fCBpICYmICFsaW5rQ3R4LnRhZy5pbmxpbmUgfHwgdGFnLl9lciB8fCBjb250ZW50ICYmICtjb250ZW50PT09Y29udGVudCkge1xuXHRcdFx0Ly8gSW5pdGlhbGl6ZSB0YWdDdHhcblx0XHRcdC8vIEZvciBibG9jayB0YWdzLCB0YWdDdHgudG1wbCBpcyBhbiBpbnRlZ2VyID4gMFxuXHRcdFx0aWYgKGNvbnRlbnQgJiYgcGFyZW50VG1wbC50bXBscykge1xuXHRcdFx0XHR0YWdDdHgudG1wbCA9IHRhZ0N0eC5jb250ZW50ID0gcGFyZW50VG1wbC50bXBsc1tjb250ZW50IC0gMV07IC8vIFNldCB0aGUgdG1wbCBwcm9wZXJ0eSB0byB0aGUgY29udGVudCBvZiB0aGUgYmxvY2sgdGFnXG5cdFx0XHR9XG5cdFx0XHR0YWdDdHguaW5kZXggPSBpO1xuXHRcdFx0dGFnQ3R4LmN0eFBybSA9IGNvbnRleHRQYXJhbWV0ZXI7XG5cdFx0XHR0YWdDdHgucmVuZGVyID0gcmVuZGVyQ29udGVudDtcblx0XHRcdHRhZ0N0eC5jdnRBcmdzID0gY29udmVydEFyZ3M7XG5cdFx0XHR0YWdDdHguYm5kQXJncyA9IGNvbnZlcnRCb3VuZEFyZ3M7XG5cdFx0XHR0YWdDdHgudmlldyA9IHBhcmVudFZpZXc7XG5cdFx0XHR0YWdDdHguY3R4ID0gZXh0ZW5kQ3R4KGV4dGVuZEN0eCh0YWdDdHguY3R4LCB0YWdEZWYgJiYgdGFnRGVmLmN0eCksIGN0eCk7IC8vIENsb25lIGFuZCBleHRlbmQgcGFyZW50Vmlldy5jdHhcblx0XHR9XG5cdFx0aWYgKHRtcGwgPSB0YWdDdHgucHJvcHMudG1wbCkge1xuXHRcdFx0Ly8gSWYgdGhlIHRtcGwgcHJvcGVydHkgaXMgb3ZlcnJpZGRlbiwgc2V0IHRoZSB2YWx1ZSAod2hlbiBpbml0aWFsaXppbmcsIG9yLCBpbiBjYXNlIG9mIGJpbmRpbmc6IF50bXBsPS4uLiwgd2hlbiB1cGRhdGluZylcblx0XHRcdHRhZ0N0eC50bXBsID0gcGFyZW50Vmlldy5nZXRUbXBsKHRtcGwpO1xuXHRcdFx0dGFnQ3R4LmNvbnRlbnQgPSB0YWdDdHguY29udGVudCB8fCB0YWdDdHgudG1wbDtcblx0XHR9XG5cblx0XHRpZiAoIXRhZykge1xuXHRcdFx0Ly8gVGhpcyB3aWxsIG9ubHkgYmUgaGl0IGZvciBpbml0aWFsIHRhZ0N0eCAobm90IGZvciB7e2Vsc2V9fSkgLSBpZiB0aGUgdGFnIGluc3RhbmNlIGRvZXMgbm90IGV4aXN0IHlldFxuXHRcdFx0Ly8gSWYgdGhlIHRhZyBoYXMgbm90IGFscmVhZHkgYmVlbiBpbnN0YW50aWF0ZWQsIHdlIHdpbGwgY3JlYXRlIGEgbmV3IGluc3RhbmNlLlxuXHRcdFx0Ly8gfnRhZyB3aWxsIGFjY2VzcyB0aGUgdGFnLCBldmVuIHdpdGhpbiB0aGUgcmVuZGVyaW5nIG9mIHRoZSB0ZW1wbGF0ZSBjb250ZW50IG9mIHRoaXMgdGFnLlxuXHRcdFx0Ly8gRnJvbSBjaGlsZC9kZXNjZW5kYW50IHRhZ3MsIGNhbiBhY2Nlc3MgdXNpbmcgfnRhZy5wYXJlbnQsIG9yIH5wYXJlbnRUYWdzLnRhZ05hbWVcblx0XHRcdHRhZyA9IG5ldyB0YWdEZWYuX2N0cigpO1xuXHRcdFx0Y2FsbEluaXQgPSAhIXRhZy5pbml0O1xuXG5cdFx0XHR0YWcucGFyZW50ID0gcGFyZW50VGFnID0gY3R4ICYmIGN0eC50YWc7XG5cdFx0XHR0YWcudGFnQ3R4cyA9IHRhZ0N0eHM7XG5cblx0XHRcdGlmIChsaW5rQ3R4KSB7XG5cdFx0XHRcdHRhZy5pbmxpbmUgPSBmYWxzZTtcblx0XHRcdFx0bGlua0N0eC50YWcgPSB0YWc7XG5cdFx0XHRcdHRhZy5saW5rQ3R4ID0gbGlua0N0eDtcblx0XHRcdH1cblx0XHRcdGlmICh0YWcuXy5ibmQgPSBib3VuZFRhZyB8fCBsaW5rQ3R4LmZuKSB7XG5cdFx0XHRcdC8vIEJvdW5kIGlmIHtee3RhZy4uLn19IG9yIGRhdGEtbGluaz1cInt0YWcuLi59XCJcblx0XHRcdFx0dGFnLl8udGhzID0gdGFnQ3R4LnBhcmFtcy5wcm9wcy50aGlzOyAvLyBUYWcgaGFzIGEgdGhpcz1leHByIGJpbmRpbmcsIHRvIGdldCBqYXZhc2NyaXB0IHJlZmVyZW5jZSB0byB0YWcgaW5zdGFuY2Vcblx0XHRcdFx0dGFnLl8ubHQgPSB0YWdDdHhzLmx0OyAvLyBJZiBhIGxhdGUgcGF0aCBAc29tZS5wYXRoIGhhcyBub3QgcmV0dXJuZWQgQHNvbWUgb2JqZWN0LCBtYXJrIHRhZyBhcyBsYXRlXG5cdFx0XHRcdHRhZy5fLmFyclZ3cyA9IHt9O1xuXHRcdFx0fSBlbHNlIGlmICh0YWcuZGF0YUJvdW5kT25seSkge1xuXHRcdFx0XHRlcnJvcih0YWdOYW1lICsgXCIgbXVzdCBiZSBkYXRhLWJvdW5kOlxcbntee1wiICsgdGFnTmFtZSArIFwifX1cIik7XG5cdFx0XHR9XG5cdFx0XHQvL1RPRE8gYmV0dGVyIHBlcmYgZm9yIGNoaWxkVGFncygpIC0ga2VlcCBjaGlsZCB0YWcudGFncyBhcnJheSwgKGFuZCByZW1vdmUgY2hpbGQsIHdoZW4gZGlzcG9zZWQpXG5cdFx0XHQvLyB0YWcudGFncyA9IFtdO1xuXHRcdH0gZWxzZSBpZiAobGlua0N0eCAmJiBsaW5rQ3R4LmZuLl9scikge1xuXHRcdFx0Y2FsbEluaXQgPSAhIXRhZy5pbml0O1xuXHRcdH1cblx0XHR0YWdEYXRhTWFwID0gdGFnLmRhdGFNYXA7XG5cblx0XHR0YWdDdHgudGFnID0gdGFnO1xuXHRcdGlmICh0YWdEYXRhTWFwICYmIHRhZ0N0eHMpIHtcblx0XHRcdHRhZ0N0eC5tYXAgPSB0YWdDdHhzW2ldLm1hcDsgLy8gQ29weSBvdmVyIHRoZSBjb21waWxlZCBtYXAgaW5zdGFuY2UgZnJvbSB0aGUgcHJldmlvdXMgdGFnQ3R4cyB0byB0aGUgcmVmcmVzaGVkIG9uZXNcblx0XHR9XG5cdFx0aWYgKCF0YWcuZmxvdykge1xuXHRcdFx0dGFnQ3R4Q3R4ID0gdGFnQ3R4LmN0eCA9IHRhZ0N0eC5jdHggfHwge307XG5cblx0XHRcdC8vIHRhZ3MgaGFzaDogdGFnLmN0eC50YWdzLCBtZXJnZWQgd2l0aCBwYXJlbnRWaWV3LmN0eC50YWdzLFxuXHRcdFx0dGFncyA9IHRhZy5wYXJlbnRzID0gdGFnQ3R4Q3R4LnBhcmVudFRhZ3MgPSBjdHggJiYgZXh0ZW5kQ3R4KHRhZ0N0eEN0eC5wYXJlbnRUYWdzLCBjdHgucGFyZW50VGFncykgfHwge307XG5cdFx0XHRpZiAocGFyZW50VGFnKSB7XG5cdFx0XHRcdHRhZ3NbcGFyZW50VGFnLnRhZ05hbWVdID0gcGFyZW50VGFnO1xuXHRcdFx0XHQvL1RPRE8gYmV0dGVyIHBlcmYgZm9yIGNoaWxkVGFnczogcGFyZW50VGFnLnRhZ3MucHVzaCh0YWcpO1xuXHRcdFx0fVxuXHRcdFx0dGFnc1t0YWcudGFnTmFtZV0gPSB0YWdDdHhDdHgudGFnID0gdGFnO1xuXHRcdFx0dGFnQ3R4Q3R4LnRhZ0N0eCA9IHRhZ0N0eDtcblx0XHR9XG5cdH1cblx0aWYgKCEodGFnLl9lciA9IG9uRXJyb3IpKSB7XG5cdFx0dGFnSGFuZGxlcnNGcm9tUHJvcHModGFnLCB0YWdDdHhzWzBdKTtcblx0XHR0YWcucmVuZGVyaW5nID0ge3JuZHI6IHRhZy5yZW5kZXJpbmd9OyAvLyBQcm92aWRlIG9iamVjdCBmb3Igc3RhdGUgZHVyaW5nIHJlbmRlciBjYWxscyB0byB0YWcgYW5kIGVsc2VzLiAoVXNlZCBieSB7e2lmfX0gYW5kIHt7Zm9yfX0uLi4pXG5cdFx0Zm9yIChpID0gMDsgaSA8IGw7IGkrKykgeyAvLyBJdGVyYXRlIHRhZ0N0eCBmb3IgZWFjaCB7e2Vsc2V9fSBibG9ja1xuXHRcdFx0dGFnQ3R4ID0gdGFnLnRhZ0N0eCA9IHRhZ0N0eHNbaV07XG5cdFx0XHRwcm9wcyA9IHRhZ0N0eC5wcm9wcztcblx0XHRcdHRhZy5jdHggPSB0YWdDdHguY3R4O1xuXG5cdFx0XHRpZiAoIWkpIHtcblx0XHRcdFx0aWYgKGNhbGxJbml0KSB7XG5cdFx0XHRcdFx0dGFnLmluaXQodGFnQ3R4LCBsaW5rQ3R4LCB0YWcuY3R4KTtcblx0XHRcdFx0XHRjYWxsSW5pdCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXRhZ0N0eC5hcmdzLmxlbmd0aCAmJiB0YWdDdHguYXJnRGVmYXVsdCAhPT0gZmFsc2UgJiYgdGFnLmFyZ0RlZmF1bHQgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0dGFnQ3R4LmFyZ3MgPSBhcmdzID0gW3RhZ0N0eC52aWV3LmRhdGFdOyAvLyBNaXNzaW5nIGZpcnN0IGFyZyBkZWZhdWx0cyB0byB0aGUgY3VycmVudCBkYXRhIGNvbnRleHRcblx0XHRcdFx0XHR0YWdDdHgucGFyYW1zLmFyZ3MgPSBbXCIjZGF0YVwiXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJpbmRUbyA9IGJpbmRUb09yQmluZEZyb20oXCJiaW5kVG9cIik7XG5cblx0XHRcdFx0aWYgKHRhZy5iaW5kVG8gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHRhZy5iaW5kVG8gPSBiaW5kVG87XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGFnLmJpbmRGcm9tICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHR0YWcuYmluZEZyb20gPSBiaW5kVG9PckJpbmRGcm9tKFwiYmluZEZyb21cIik7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGFnLmJpbmRUbykge1xuXHRcdFx0XHRcdHRhZy5iaW5kRnJvbSA9IHRhZy5iaW5kVG8gPSBiaW5kVG87XG5cdFx0XHRcdH1cblx0XHRcdFx0YmluZEZyb20gPSB0YWcuYmluZEZyb20gfHwgYmluZFRvO1xuXG5cdFx0XHRcdGJpbmRUb0xlbmd0aCA9IGJpbmRUby5sZW5ndGg7XG5cdFx0XHRcdGJpbmRGcm9tTGVuZ3RoID0gYmluZEZyb20ubGVuZ3RoO1xuXG5cdFx0XHRcdGlmICh0YWcuXy5ibmQgJiYgKGxpbmtlZEVsZW1lbnQgPSB0YWcubGlua2VkRWxlbWVudCkpIHtcblx0XHRcdFx0XHR0YWcubGlua2VkRWxlbWVudCA9IGxpbmtlZEVsZW1lbnQgPSAkaXNBcnJheShsaW5rZWRFbGVtZW50KSA/IGxpbmtlZEVsZW1lbnQ6IFtsaW5rZWRFbGVtZW50XTtcblxuXHRcdFx0XHRcdGlmIChiaW5kVG9MZW5ndGggIT09IGxpbmtlZEVsZW1lbnQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRlcnJvcihcImxpbmtlZEVsZW1lbnQgbm90IHNhbWUgbGVuZ3RoIGFzIGJpbmRUb1wiKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGxpbmtlZEVsZW1lbnQgPSB0YWcubGlua2VkQ3R4UGFyYW0pIHtcblx0XHRcdFx0XHR0YWcubGlua2VkQ3R4UGFyYW0gPSBsaW5rZWRFbGVtZW50ID0gJGlzQXJyYXkobGlua2VkRWxlbWVudCkgPyBsaW5rZWRFbGVtZW50OiBbbGlua2VkRWxlbWVudF07XG5cblx0XHRcdFx0XHRpZiAoYmluZEZyb21MZW5ndGggIT09IGxpbmtlZEVsZW1lbnQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRlcnJvcihcImxpbmtlZEN0eFBhcmFtIG5vdCBzYW1lIGxlbmd0aCBhcyBiaW5kRnJvbS9iaW5kVG9cIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGJpbmRGcm9tKSB7XG5cdFx0XHRcdFx0dGFnLl8uZnJvbUluZGV4ID0ge307IC8vIEhhc2ggb2YgYmluZEZyb20gaW5kZXggd2hpY2ggaGFzIHNhbWUgcGF0aCB2YWx1ZSBhcyBiaW5kVG8gaW5kZXguIGZyb21JbmRleCA9IHRhZy5fLmZyb21JbmRleFt0b0luZGV4XVxuXHRcdFx0XHRcdHRhZy5fLnRvSW5kZXggPSB7fTsgLy8gSGFzaCBvZiBiaW5kRnJvbSBpbmRleCB3aGljaCBoYXMgc2FtZSBwYXRoIHZhbHVlIGFzIGJpbmRUbyBpbmRleC4gZnJvbUluZGV4ID0gdGFnLl8uZnJvbUluZGV4W3RvSW5kZXhdXG5cdFx0XHRcdFx0biA9IGJpbmRGcm9tTGVuZ3RoO1xuXHRcdFx0XHRcdHdoaWxlIChuLS0pIHtcblx0XHRcdFx0XHRcdGtleSA9IGJpbmRGcm9tW25dO1xuXHRcdFx0XHRcdFx0bSA9IGJpbmRUb0xlbmd0aDtcblx0XHRcdFx0XHRcdHdoaWxlIChtLS0pIHtcblx0XHRcdFx0XHRcdFx0aWYgKGtleSA9PT0gYmluZFRvW21dKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGFnLl8uZnJvbUluZGV4W21dID0gbjtcblx0XHRcdFx0XHRcdFx0XHR0YWcuXy50b0luZGV4W25dID0gbTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChsaW5rQ3R4KSB7XG5cdFx0XHRcdFx0Ly8gU2V0IGF0dHIgb24gbGlua0N0eCB0byBlbnN1cmUgb3V0cHV0dGluZyB0byB0aGUgY29ycmVjdCB0YXJnZXQgYXR0cmlidXRlLlxuXHRcdFx0XHRcdC8vIFNldHRpbmcgZWl0aGVyIGxpbmtDdHguYXR0ciBvciB0aGlzLmF0dHIgaW4gdGhlIGluaXQoKSBhbGxvd3MgcGVyLWluc3RhbmNlIGNob2ljZSBvZiB0YXJnZXQgYXR0cmliLlxuXHRcdFx0XHRcdGxpbmtDdHguYXR0ciA9IHRhZy5hdHRyID0gbGlua0N0eC5hdHRyIHx8IHRhZy5hdHRyIHx8IGxpbmtDdHguX2RmQXQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0YXR0ciA9IHRhZy5hdHRyO1xuXHRcdFx0XHR0YWcuXy5ub1Z3cyA9IGF0dHIgJiYgYXR0ciAhPT0gSFRNTDtcblx0XHRcdH1cblx0XHRcdGFyZ3MgPSB0YWcuY3Z0QXJncyh1bmRlZmluZWQsIGkpO1xuXHRcdFx0aWYgKHRhZy5saW5rZWRDdHhQYXJhbSkge1xuXHRcdFx0XHRiZEFyZ3MgPSB0YWcuY3Z0QXJncygxLCBpKTtcblx0XHRcdFx0bSA9IGJpbmRGcm9tTGVuZ3RoO1xuXHRcdFx0XHRkZWZhdWx0Q3R4ID0gdGFnLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5jdHg7XG5cdFx0XHRcdHdoaWxlIChtLS0pIHtcblx0XHRcdFx0XHRpZiAoY3R4UHJtID0gdGFnLmxpbmtlZEN0eFBhcmFtW21dKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBiaW5kRnJvbVttXTtcblx0XHRcdFx0XHRcdGluaXRWYWwgPSBiZEFyZ3NbbV07XG5cdFx0XHRcdFx0XHQvLyBDcmVhdGUgdGFnIGNvbnRleHR1YWwgcGFyYW1ldGVyXG5cdFx0XHRcdFx0XHR0YWdDdHguY3R4W2N0eFBybV0gPSAkc3ViLl9jcChcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdEN0eCAmJiBpbml0VmFsID09PSB1bmRlZmluZWQgPyBkZWZhdWx0Q3R4W2N0eFBybV06IGluaXRWYWwsXG5cdFx0XHRcdFx0XHRcdGluaXRWYWwgIT09IHVuZGVmaW5lZCAmJiBhcmdPclByb3AodGFnQ3R4LnBhcmFtcywga2V5KSxcblx0XHRcdFx0XHRcdFx0dGFnQ3R4LnZpZXcsXG5cdFx0XHRcdFx0XHRcdHRhZy5fLmJuZCAmJiB7dGFnOiB0YWcsIGN2dDogdGFnLmNvbnZlcnQsIGluZDogbSwgdGFnRWxzZTogaX1cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoKG1hcERlZiA9IHByb3BzLmRhdGFNYXAgfHwgdGFnRGF0YU1hcCkgJiYgKGFyZ3MubGVuZ3RoIHx8IHByb3BzLmRhdGFNYXApKSB7XG5cdFx0XHRcdHRoaXNNYXAgPSB0YWdDdHgubWFwO1xuXHRcdFx0XHRpZiAoIXRoaXNNYXAgfHwgdGhpc01hcC5zcmMgIT09IGFyZ3NbMF0gfHwgaXNVcGRhdGUpIHtcblx0XHRcdFx0XHRpZiAodGhpc01hcCAmJiB0aGlzTWFwLnNyYykge1xuXHRcdFx0XHRcdFx0dGhpc01hcC51bm1hcCgpOyAvLyBvbmx5IGNhbGxlZCBpZiBvYnNlcnZhYmxlIG1hcCAtIG5vdCB3aGVuIG9ubHkgdXNlZCBpbiBKc1JlbmRlciwgZS5nLiBieSB7e3Byb3BzfX1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bWFwRGVmLm1hcChhcmdzWzBdLCB0YWdDdHgsIHRoaXNNYXAsICF0YWcuXy5ibmQpO1xuXHRcdFx0XHRcdHRoaXNNYXAgPSB0YWdDdHgubWFwO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGFyZ3MgPSBbdGhpc01hcC50Z3RdO1xuXHRcdFx0fVxuXG5cdFx0XHRpdGVtUmV0ID0gdW5kZWZpbmVkO1xuXHRcdFx0aWYgKHRhZy5yZW5kZXIpIHtcblx0XHRcdFx0aXRlbVJldCA9IHRhZy5yZW5kZXIuYXBwbHkodGFnLCBhcmdzKTtcblx0XHRcdFx0aWYgKHBhcmVudFZpZXcubGlua2VkICYmIGl0ZW1SZXQgJiYgIXJXcmFwcGVkSW5WaWV3TWFya2VyLnRlc3QoaXRlbVJldCkpIHtcblx0XHRcdFx0XHQvLyBXaGVuIGEgdGFnIHJlbmRlcnMgY29udGVudCBmcm9tIHRoZSByZW5kZXIgbWV0aG9kLCB3aXRoIGRhdGEgbGlua2luZyB0aGVuIHdlIG5lZWQgdG8gd3JhcCB3aXRoIHZpZXcgbWFya2VycywgaWYgYWJzZW50LFxuXHRcdFx0XHRcdC8vIHRvIHByb3ZpZGUgYSBjb250ZW50VmlldyBmb3IgdGhlIHRhZywgd2hpY2ggd2lsbCBjb3JyZWN0bHkgZGlzcG9zZSBiaW5kaW5ncyBpZiBkZWxldGVkLiBUaGUgJ3RtcGwnIGZvciB0aGlzIHZpZXcgd2lsbFxuXHRcdFx0XHRcdC8vIGJlIGEgZHVtYmVkLWRvd24gdGVtcGxhdGUgd2hpY2ggd2lsbCBhbHdheXMgcmV0dXJuIHRoZSAgaXRlbVJldCBzdHJpbmcgKG5vIG1hdHRlciB3aGF0IHRoZSBkYXRhIGlzKS4gVGhlIGl0ZW1SZXQgc3RyaW5nXG5cdFx0XHRcdFx0Ly8gaXMgbm90IGNvbXBpbGVkIGFzIHRlbXBsYXRlIG1hcmt1cCwgc28gY2FuIGluY2x1ZGUgXCJ7e1wiIG9yIFwifX1cIiB3aXRob3V0IHRyaWdnZXJpbmcgc3ludGF4IGVycm9yc1xuXHRcdFx0XHRcdHRtcGwgPSB7IC8vICdEdW1iZWQtZG93bicgdGVtcGxhdGUgd2hpY2ggYWx3YXlzIHJlbmRlcnMgJ3N0YXRpYycgaXRlbVJldCBzdHJpbmdcblx0XHRcdFx0XHRcdGxpbmtzOiBbXVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0dG1wbC5yZW5kZXIgPSB0bXBsLmZuID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbVJldDtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdGl0ZW1SZXQgPSByZW5kZXJXaXRoVmlld3ModG1wbCwgcGFyZW50Vmlldy5kYXRhLCB1bmRlZmluZWQsIHRydWUsIHBhcmVudFZpZXcsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0YWcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWFyZ3MubGVuZ3RoKSB7XG5cdFx0XHRcdGFyZ3MgPSBbcGFyZW50Vmlld107IC8vIG5vIGFyZ3VtZW50cyAtIChlLmcuIHt7ZWxzZX19KSBnZXQgZGF0YSBjb250ZXh0IGZyb20gdmlldy5cblx0XHRcdH1cblx0XHRcdGlmIChpdGVtUmV0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y29udGVudEN0eCA9IGFyZ3NbMF07IC8vIERlZmF1bHQgZGF0YSBjb250ZXh0IGZvciB3cmFwcGVkIGJsb2NrIGNvbnRlbnQgaXMgdGhlIGZpcnN0IGFyZ3VtZW50XG5cdFx0XHRcdGlmICh0YWcuY29udGVudEN0eCkgeyAvLyBTZXQgdGFnLmNvbnRlbnRDdHggdG8gdHJ1ZSwgdG8gaW5oZXJpdCBwYXJlbnQgY29udGV4dCwgb3IgdG8gYSBmdW5jdGlvbiB0byBwcm92aWRlIGFsdGVybmF0ZSBjb250ZXh0LlxuXHRcdFx0XHRcdGNvbnRlbnRDdHggPSB0YWcuY29udGVudEN0eCA9PT0gdHJ1ZSA/IHBhcmVudFZpZXcgOiB0YWcuY29udGVudEN0eChjb250ZW50Q3R4KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpdGVtUmV0ID0gdGFnQ3R4LnJlbmRlcihjb250ZW50Q3R4LCB0cnVlKSB8fCAoaXNVcGRhdGUgPyB1bmRlZmluZWQgOiBcIlwiKTtcblx0XHRcdH1cblx0XHRcdC8vIE5vIHJldHVybiB2YWx1ZSBmcm9tIHJlbmRlciwgYW5kIG5vIHRlbXBsYXRlL2NvbnRlbnQgdGFnQ3R4LnJlbmRlciguLi4pLCBzbyByZXR1cm4gdW5kZWZpbmVkXG5cdFx0XHRyZXQgPSByZXQgPyByZXQgKyAoaXRlbVJldCB8fCBcIlwiKSA6IGl0ZW1SZXQ7IC8vIElmIG5vIHJlbmRlcmVkIGNvbnRlbnQsIHRoaXMgd2lsbCBiZSB1bmRlZmluZWRcblx0XHR9XG5cdFx0dGFnLnJlbmRlcmluZyA9IHRhZy5yZW5kZXJpbmcucm5kcjsgLy8gUmVtb3ZlIHRhZy5yZW5kZXJpbmcgb2JqZWN0IChpZiB0aGlzIGlzIG91dGVybW9zdCByZW5kZXIgY2FsbC4gKEluIGNhc2Ugb2YgbmVzdGVkIGNhbGxzKVxuXHR9XG5cdHRhZy50YWdDdHggPSB0YWdDdHhzWzBdO1xuXHR0YWcuY3R4ID0gdGFnLnRhZ0N0eC5jdHg7XG5cblx0aWYgKHRhZy5fLm5vVndzICYmIHRhZy5pbmxpbmUpIHtcblx0XHQvLyBpbmxpbmUgdGFnIHdpdGggYXR0ciBzZXQgdG8gXCJ0ZXh0XCIgd2lsbCBpbnNlcnQgSFRNTC1lbmNvZGVkIGNvbnRlbnQgLSBhcyBpZiBpdCB3YXMgZWxlbWVudC1iYXNlZCBpbm5lclRleHRcblx0XHRyZXQgPSBhdHRyID09PSBcInRleHRcIlxuXHRcdFx0PyAkY29udmVydGVycy5odG1sKHJldClcblx0XHRcdDogXCJcIjtcblx0fVxuXHRyZXR1cm4gYm91bmRUYWcgJiYgcGFyZW50Vmlldy5fLm9uUmVuZGVyXG5cdFx0Ly8gQ2FsbCBvblJlbmRlciAodXNlZCBieSBKc1ZpZXdzIGlmIHByZXNlbnQsIHRvIGFkZCBiaW5kaW5nIGFubm90YXRpb25zIGFyb3VuZCByZW5kZXJlZCBjb250ZW50KVxuXHRcdD8gcGFyZW50Vmlldy5fLm9uUmVuZGVyKHJldCwgcGFyZW50VmlldywgdGFnKVxuXHRcdDogcmV0O1xufVxuXG4vLz09PT09PT09PT09PT09PT09XG4vLyBWaWV3IGNvbnN0cnVjdG9yXG4vLz09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIFZpZXcoY29udGV4dCwgdHlwZSwgcGFyZW50VmlldywgZGF0YSwgdGVtcGxhdGUsIGtleSwgb25SZW5kZXIsIGNvbnRlbnRUbXBsKSB7XG5cdC8vIENvbnN0cnVjdG9yIGZvciB2aWV3IG9iamVjdCBpbiB2aWV3IGhpZXJhcmNoeS4gKEF1Z21lbnRlZCBieSBKc1ZpZXdzIGlmIEpzVmlld3MgaXMgbG9hZGVkKVxuXHR2YXIgdmlld3MsIHBhcmVudFZpZXdfLCB0YWcsIHNlbGZfLFxuXHRcdHNlbGYgPSB0aGlzLFxuXHRcdGlzQXJyYXkgPSB0eXBlID09PSBcImFycmF5XCI7XG5cdFx0Ly8gSWYgdGhlIGRhdGEgaXMgYW4gYXJyYXksIHRoaXMgaXMgYW4gJ2FycmF5IHZpZXcnIHdpdGggYSB2aWV3cyBhcnJheSBmb3IgZWFjaCBjaGlsZCAnaXRlbSB2aWV3J1xuXHRcdC8vIElmIHRoZSBkYXRhIGlzIG5vdCBhbiBhcnJheSwgdGhpcyBpcyBhbiAnaXRlbSB2aWV3JyB3aXRoIGEgdmlld3MgJ2hhc2gnIG9iamVjdCBmb3IgYW55IGNoaWxkIG5lc3RlZCB2aWV3c1xuXG5cdHNlbGYuY29udGVudCA9IGNvbnRlbnRUbXBsO1xuXHRzZWxmLnZpZXdzID0gaXNBcnJheSA/IFtdIDoge307XG5cdHNlbGYuZGF0YSA9IGRhdGE7XG5cdHNlbGYudG1wbCA9IHRlbXBsYXRlO1xuXHRzZWxmXyA9IHNlbGYuXyA9IHtcblx0XHRrZXk6IDAsXG5cdFx0Ly8gLl8udXNlS2V5IGlzIG5vbiB6ZXJvIGlmIGlzIG5vdCBhbiAnYXJyYXkgdmlldycgKG93bmluZyBhIGRhdGEgYXJyYXkpLiBVc2UgdGhpcyBhcyBuZXh0IGtleSBmb3IgYWRkaW5nIHRvIGNoaWxkIHZpZXdzIGhhc2hcblx0XHR1c2VLZXk6IGlzQXJyYXkgPyAwIDogMSxcblx0XHRpZDogXCJcIiArIHZpZXdJZCsrLFxuXHRcdG9uUmVuZGVyOiBvblJlbmRlcixcblx0XHRibmRzOiB7fVxuXHR9O1xuXHRzZWxmLmxpbmtlZCA9ICEhb25SZW5kZXI7XG5cdHNlbGYudHlwZSA9IHR5cGUgfHwgXCJ0b3BcIjtcblx0aWYgKHNlbGYucGFyZW50ID0gcGFyZW50Vmlldykge1xuXHRcdHNlbGYucm9vdCA9IHBhcmVudFZpZXcucm9vdCB8fCBzZWxmOyAvLyB2aWV3IHdob3NlIHBhcmVudCBpcyB0b3Agdmlld1xuXHRcdHZpZXdzID0gcGFyZW50Vmlldy52aWV3cztcblx0XHRwYXJlbnRWaWV3XyA9IHBhcmVudFZpZXcuXztcblx0XHRzZWxmLmlzVG9wID0gcGFyZW50Vmlld18uc2NwOyAvLyBJcyB0b3AgY29udGVudCB2aWV3IG9mIGEgbGluayhcIiNjb250YWluZXJcIiwgLi4uKSBjYWxsXG5cdFx0c2VsZi5zY29wZSA9ICghY29udGV4dC50YWcgfHwgY29udGV4dC50YWcgPT09IHBhcmVudFZpZXcuY3R4LnRhZykgJiYgIXNlbGYuaXNUb3AgJiYgcGFyZW50Vmlldy5zY29wZSB8fCBzZWxmO1xuXHRcdC8vIFNjb3BlIGZvciBjb250ZXh0UGFyYW1zIC0gY2xvc2VzdCBub24gZmxvdyB0YWcgYW5jZXN0b3Igb3Igcm9vdCB2aWV3XG5cdFx0aWYgKHBhcmVudFZpZXdfLnVzZUtleSkge1xuXHRcdFx0Ly8gUGFyZW50IGlzIG5vdCBhbiAnYXJyYXkgdmlldycuIEFkZCB0aGlzIHZpZXcgdG8gaXRzIHZpZXdzIG9iamVjdFxuXHRcdFx0Ly8gc2VsZi5fa2V5ID0gaXMgdGhlIGtleSBpbiB0aGUgcGFyZW50IHZpZXcgaGFzaFxuXHRcdFx0dmlld3Nbc2VsZl8ua2V5ID0gXCJfXCIgKyBwYXJlbnRWaWV3Xy51c2VLZXkrK10gPSBzZWxmO1xuXHRcdFx0c2VsZi5pbmRleCA9IGluZGV4U3RyO1xuXHRcdFx0c2VsZi5nZXRJbmRleCA9IGdldE5lc3RlZEluZGV4O1xuXHRcdH0gZWxzZSBpZiAodmlld3MubGVuZ3RoID09PSAoc2VsZl8ua2V5ID0gc2VsZi5pbmRleCA9IGtleSkpIHsgLy8gUGFyZW50IGlzIGFuICdhcnJheSB2aWV3Jy4gQWRkIHRoaXMgdmlldyB0byBpdHMgdmlld3MgYXJyYXlcblx0XHRcdHZpZXdzLnB1c2goc2VsZik7IC8vIEFkZGluZyB0byBlbmQgb2Ygdmlld3MgYXJyYXkuIChVc2luZyBwdXNoIHdoZW4gcG9zc2libGUgLSBiZXR0ZXIgcGVyZiB0aGFuIHNwbGljZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmlld3Muc3BsaWNlKGtleSwgMCwgc2VsZik7IC8vIEluc2VydGluZyBpbiB2aWV3cyBhcnJheVxuXHRcdH1cblx0XHQvLyBJZiBubyBjb250ZXh0IHdhcyBwYXNzZWQgaW4sIHVzZSBwYXJlbnQgY29udGV4dFxuXHRcdC8vIElmIGNvbnRleHQgd2FzIHBhc3NlZCBpbiwgaXQgc2hvdWxkIGhhdmUgYmVlbiBtZXJnZWQgYWxyZWFkeSB3aXRoIHBhcmVudCBjb250ZXh0XG5cdFx0c2VsZi5jdHggPSBjb250ZXh0IHx8IHBhcmVudFZpZXcuY3R4O1xuXHR9IGVsc2Uge1xuXHRcdHNlbGYuY3R4ID0gY29udGV4dCB8fCB7fTtcblx0fVxufVxuXG5WaWV3LnByb3RvdHlwZSA9IHtcblx0Z2V0OiBnZXRWaWV3LFxuXHRnZXRJbmRleDogZ2V0SW5kZXgsXG5cdGdldFJzYzogZ2V0UmVzb3VyY2UsXG5cdGdldFRtcGw6IGdldFRlbXBsYXRlLFxuXHRjdHhQcm06IGNvbnRleHRQYXJhbWV0ZXIsXG5cdGdldE9iOiBnZXRQYXRoT2JqZWN0LFxuXHRfaXM6IFwidmlld1wiXG59O1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFJlZ2lzdHJhdGlvblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNvbXBpbGVDaGlsZFJlc291cmNlcyhwYXJlbnRUbXBsKSB7XG5cdHZhciBzdG9yZU5hbWUsIHN0b3JlTmFtZXMsIHJlc291cmNlcztcblx0Zm9yIChzdG9yZU5hbWUgaW4ganN2U3RvcmVzKSB7XG5cdFx0c3RvcmVOYW1lcyA9IHN0b3JlTmFtZSArIFwic1wiO1xuXHRcdGlmIChwYXJlbnRUbXBsW3N0b3JlTmFtZXNdKSB7XG5cdFx0XHRyZXNvdXJjZXMgPSBwYXJlbnRUbXBsW3N0b3JlTmFtZXNdOyAgICAvLyBSZXNvdXJjZXMgbm90IHlldCBjb21waWxlZFxuXHRcdFx0cGFyZW50VG1wbFtzdG9yZU5hbWVzXSA9IHt9OyAgICAgICAgICAgICAgIC8vIFJlbW92ZSB1bmNvbXBpbGVkIHJlc291cmNlc1xuXHRcdFx0JHZpZXdzW3N0b3JlTmFtZXNdKHJlc291cmNlcywgcGFyZW50VG1wbCk7IC8vIEFkZCBiYWNrIGluIHRoZSBjb21waWxlZCByZXNvdXJjZXNcblx0XHR9XG5cdH1cbn1cblxuLy89PT09PT09PT09PT09PT1cbi8vIGNvbXBpbGVUYWdcbi8vPT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNvbXBpbGVUYWcobmFtZSwgdGFnRGVmLCBwYXJlbnRUbXBsKSB7XG5cdHZhciB0bXBsLCBiYXNlVGFnLCBwcm9wLFxuXHRcdGNvbXBpbGVkRGVmID0gbmV3ICRzdWIuX3RnKCk7XG5cblx0ZnVuY3Rpb24gVGFnKCkge1xuXHRcdHZhciB0YWcgPSB0aGlzO1xuXHRcdHRhZy5fID0ge1xuXHRcdFx0dW5saW5rZWQ6IHRydWVcblx0XHR9O1xuXHRcdHRhZy5pbmxpbmUgPSB0cnVlO1xuXHRcdHRhZy50YWdOYW1lID0gbmFtZTtcblx0fVxuXG5cdGlmICgkaXNGdW5jdGlvbih0YWdEZWYpKSB7XG5cdFx0Ly8gU2ltcGxlIHRhZyBkZWNsYXJlZCBhcyBmdW5jdGlvbi4gTm8gcHJlc2VudGVyIGluc3RhbnRhdGlvbi5cblx0XHR0YWdEZWYgPSB7XG5cdFx0XHRkZXBlbmRzOiB0YWdEZWYuZGVwZW5kcyxcblx0XHRcdHJlbmRlcjogdGFnRGVmXG5cdFx0fTtcblx0fSBlbHNlIGlmIChcIlwiICsgdGFnRGVmID09PSB0YWdEZWYpIHtcblx0XHR0YWdEZWYgPSB7dGVtcGxhdGU6IHRhZ0RlZn07XG5cdH1cblxuXHRpZiAoYmFzZVRhZyA9IHRhZ0RlZi5iYXNlVGFnKSB7XG5cdFx0dGFnRGVmLmZsb3cgPSAhIXRhZ0RlZi5mbG93OyAvLyBTZXQgZmxvdyBwcm9wZXJ0eSwgc28gZGVmYXVsdHMgdG8gZmFsc2UgZXZlbiBpZiBiYXNlVGFnIGhhcyBmbG93PXRydWVcblx0XHRiYXNlVGFnID0gXCJcIiArIGJhc2VUYWcgPT09IGJhc2VUYWdcblx0XHRcdD8gKHBhcmVudFRtcGwgJiYgcGFyZW50VG1wbC50YWdzW2Jhc2VUYWddIHx8ICR0YWdzW2Jhc2VUYWddKVxuXHRcdFx0OiBiYXNlVGFnO1xuXHRcdGlmICghYmFzZVRhZykge1xuXHRcdFx0ZXJyb3IoJ2Jhc2VUYWc6IFwiJyArIHRhZ0RlZi5iYXNlVGFnICsgJ1wiIG5vdCBmb3VuZCcpO1xuXHRcdH1cblx0XHRjb21waWxlZERlZiA9ICRleHRlbmQoY29tcGlsZWREZWYsIGJhc2VUYWcpO1xuXG5cdFx0Zm9yIChwcm9wIGluIHRhZ0RlZikge1xuXHRcdFx0Y29tcGlsZWREZWZbcHJvcF0gPSBnZXRNZXRob2QoYmFzZVRhZ1twcm9wXSwgdGFnRGVmW3Byb3BdKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29tcGlsZWREZWYgPSAkZXh0ZW5kKGNvbXBpbGVkRGVmLCB0YWdEZWYpO1xuXHR9XG5cblx0Ly8gVGFnIGRlY2xhcmVkIGFzIG9iamVjdCwgdXNlZCBhcyB0aGUgcHJvdG90eXBlIGZvciB0YWcgaW5zdGFudGlhdGlvbiAoY29udHJvbC9wcmVzZW50ZXIpXG5cdGlmICgodG1wbCA9IGNvbXBpbGVkRGVmLnRlbXBsYXRlKSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0Y29tcGlsZWREZWYudGVtcGxhdGUgPSBcIlwiICsgdG1wbCA9PT0gdG1wbCA/ICgkdGVtcGxhdGVzW3RtcGxdIHx8ICR0ZW1wbGF0ZXModG1wbCkpIDogdG1wbDtcblx0fVxuXHQoVGFnLnByb3RvdHlwZSA9IGNvbXBpbGVkRGVmKS5jb25zdHJ1Y3RvciA9IGNvbXBpbGVkRGVmLl9jdHIgPSBUYWc7XG5cblx0aWYgKHBhcmVudFRtcGwpIHtcblx0XHRjb21waWxlZERlZi5fcGFyZW50VG1wbCA9IHBhcmVudFRtcGw7XG5cdH1cblx0cmV0dXJuIGNvbXBpbGVkRGVmO1xufVxuXG5mdW5jdGlvbiBiYXNlQXBwbHkoYXJncykge1xuXHQvLyBJbiBkZXJpdmVkIG1ldGhvZCAob3IgaGFuZGxlciBkZWNsYXJlZCBkZWNsYXJhdGl2ZWx5IGFzIGluIHt7OmZvbyBvbkNoYW5nZT1+Zm9vQ2hhbmdlZH19IGNhbiBjYWxsIGJhc2UgbWV0aG9kLFxuXHQvLyB1c2luZyB0aGlzLmJhc2VBcHBseShhcmd1bWVudHMpIChFcXVpdmFsZW50IHRvIHRoaXMuX3N1cGVyQXBwbHkoYXJndW1lbnRzKSBpbiBqUXVlcnkgVUkpXG5cdHJldHVybiB0aGlzLmJhc2UuYXBwbHkodGhpcywgYXJncyk7XG59XG5cbi8vPT09PT09PT09PT09PT09XG4vLyBjb21waWxlVG1wbFxuLy89PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gY29tcGlsZVRtcGwobmFtZSwgdG1wbCwgcGFyZW50VG1wbCwgb3B0aW9ucykge1xuXHQvLyB0bXBsIGlzIGVpdGhlciBhIHRlbXBsYXRlIG9iamVjdCwgYSBzZWxlY3RvciBmb3IgYSB0ZW1wbGF0ZSBzY3JpcHQgYmxvY2ssIHRoZSBuYW1lIG9mIGEgY29tcGlsZWQgdGVtcGxhdGUsIG9yIGEgdGVtcGxhdGUgb2JqZWN0XG5cblx0Ly89PT09IG5lc3RlZCBmdW5jdGlvbnMgPT09PVxuXHRmdW5jdGlvbiBsb29rdXBUZW1wbGF0ZSh2YWx1ZSkge1xuXHRcdC8vIElmIHZhbHVlIGlzIG9mIHR5cGUgc3RyaW5nIC0gdHJlYXQgYXMgc2VsZWN0b3IsIG9yIG5hbWUgb2YgY29tcGlsZWQgdGVtcGxhdGVcblx0XHQvLyBSZXR1cm4gdGhlIHRlbXBsYXRlIG9iamVjdCwgaWYgYWxyZWFkeSBjb21waWxlZCwgb3IgdGhlIG1hcmt1cCBzdHJpbmdcblx0XHR2YXIgY3VycmVudE5hbWUsIHRtcGw7XG5cdFx0aWYgKChcIlwiICsgdmFsdWUgPT09IHZhbHVlKSB8fCB2YWx1ZS5ub2RlVHlwZSA+IDAgJiYgKGVsZW0gPSB2YWx1ZSkpIHtcblx0XHRcdGlmICghZWxlbSkge1xuXHRcdFx0XHRpZiAoL15cXC5cXC9bXlxcXFw6Kj9cIjw+XSokLy50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRcdC8vIHRtcGw9XCIuL3NvbWUvZmlsZS5odG1sXCJcblx0XHRcdFx0XHQvLyBJZiB0aGUgdGVtcGxhdGUgaXMgbm90IG5hbWVkLCB1c2UgXCIuL3NvbWUvZmlsZS5odG1sXCIgYXMgbmFtZS5cblx0XHRcdFx0XHRpZiAodG1wbCA9ICR0ZW1wbGF0ZXNbbmFtZSA9IG5hbWUgfHwgdmFsdWVdKSB7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IHRtcGw7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIEJST1dTRVItU1BFQ0lGSUMgQ09ERSAobm90IG9uIE5vZGUuanMpOlxuXHRcdFx0XHRcdFx0Ly8gTG9vayBmb3Igc2VydmVyLWdlbmVyYXRlZCBzY3JpcHQgYmxvY2sgd2l0aCBpZCBcIi4vc29tZS9maWxlLmh0bWxcIlxuXHRcdFx0XHRcdFx0ZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAoJC5mbiAmJiAhJHN1Yi5yVG1wbC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRlbGVtID0gJCAodmFsdWUsIGRvY3VtZW50KVswXTsgLy8gaWYgalF1ZXJ5IGlzIGxvYWRlZCwgdGVzdCBmb3Igc2VsZWN0b3IgcmV0dXJuaW5nIGVsZW1lbnRzLCBhbmQgZ2V0IGZpcnN0IGVsZW1lbnRcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdFx0XHR9Ly8gRU5EIEJST1dTRVItU1BFQ0lGSUMgQ09ERVxuXHRcdFx0fSAvL0JST1dTRVItU1BFQ0lGSUMgQ09ERVxuXHRcdFx0aWYgKGVsZW0pIHtcblx0XHRcdFx0aWYgKGVsZW0udGFnTmFtZSAhPT0gXCJTQ1JJUFRcIikge1xuXHRcdFx0XHRcdGVycm9yKHZhbHVlICsgXCI6IFVzZSBzY3JpcHQgYmxvY2ssIG5vdCBcIiArIGVsZW0udGFnTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdFx0XHQvLyBXZSB3aWxsIGNvbXBpbGUgYSBuZXcgdGVtcGxhdGUgdXNpbmcgdGhlIG1hcmt1cCBpbiB0aGUgc2NyaXB0IGVsZW1lbnRcblx0XHRcdFx0XHR2YWx1ZSA9IGVsZW0uaW5uZXJIVE1MO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIFdlIHdpbGwgY2FjaGUgYSBzaW5nbGUgY29weSBvZiB0aGUgY29tcGlsZWQgdGVtcGxhdGUsIGFuZCBhc3NvY2lhdGUgaXQgd2l0aCB0aGUgbmFtZVxuXHRcdFx0XHRcdC8vIChyZW5hbWluZyBmcm9tIGEgcHJldmlvdXMgbmFtZSBpZiB0aGVyZSB3YXMgb25lKS5cblx0XHRcdFx0XHRjdXJyZW50TmFtZSA9IGVsZW0uZ2V0QXR0cmlidXRlKHRtcGxBdHRyKTtcblx0XHRcdFx0XHRpZiAoY3VycmVudE5hbWUpIHtcblx0XHRcdFx0XHRcdGlmIChjdXJyZW50TmFtZSAhPT0ganN2VG1wbCkge1xuXHRcdFx0XHRcdFx0XHR2YWx1ZSA9ICR0ZW1wbGF0ZXNbY3VycmVudE5hbWVdO1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgJHRlbXBsYXRlc1tjdXJyZW50TmFtZV07XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCQuZm4pIHtcblx0XHRcdFx0XHRcdFx0dmFsdWUgPSAkLmRhdGEoZWxlbSlbanN2VG1wbF07IC8vIEdldCBjYWNoZWQgY29tcGlsZWQgdGVtcGxhdGVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCFjdXJyZW50TmFtZSB8fCAhdmFsdWUpIHsgLy8gTm90IHlldCBjb21waWxlZCwgb3IgY2FjaGVkIHZlcnNpb24gbG9zdFxuXHRcdFx0XHRcdFx0bmFtZSA9IG5hbWUgfHwgKCQuZm4gPyBqc3ZUbXBsIDogdmFsdWUpO1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBjb21waWxlVG1wbChuYW1lLCBlbGVtLmlubmVySFRNTCwgcGFyZW50VG1wbCwgb3B0aW9ucyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhbHVlLnRtcGxOYW1lID0gbmFtZSA9IG5hbWUgfHwgY3VycmVudE5hbWU7XG5cdFx0XHRcdFx0aWYgKG5hbWUgIT09IGpzdlRtcGwpIHtcblx0XHRcdFx0XHRcdCR0ZW1wbGF0ZXNbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUodG1wbEF0dHIsIG5hbWUpO1xuXHRcdFx0XHRcdGlmICgkLmZuKSB7XG5cdFx0XHRcdFx0XHQkLmRhdGEoZWxlbSwganN2VG1wbCwgdmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSAvLyBFTkQgQlJPV1NFUi1TUEVDSUZJQyBDT0RFXG5cdFx0XHRlbGVtID0gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSBpZiAoIXZhbHVlLmZuKSB7XG5cdFx0XHR2YWx1ZSA9IHVuZGVmaW5lZDtcblx0XHRcdC8vIElmIHZhbHVlIGlzIG5vdCBhIHN0cmluZy4gSFRNTCBlbGVtZW50LCBvciBjb21waWxlZCB0ZW1wbGF0ZSwgcmV0dXJuIHVuZGVmaW5lZFxuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblxuXHR2YXIgZWxlbSwgY29tcGlsZWRUbXBsLFxuXHRcdHRtcGxPck1hcmt1cCA9IHRtcGwgPSB0bXBsIHx8IFwiXCI7XG5cdCRzdWIuX2h0bWwgPSAkY29udmVydGVycy5odG1sO1xuXG5cdC8vPT09PSBDb21waWxlIHRoZSB0ZW1wbGF0ZSA9PT09XG5cdGlmIChvcHRpb25zID09PSAwKSB7XG5cdFx0b3B0aW9ucyA9IHVuZGVmaW5lZDtcblx0XHR0bXBsT3JNYXJrdXAgPSBsb29rdXBUZW1wbGF0ZSh0bXBsT3JNYXJrdXApOyAvLyBUb3AtbGV2ZWwgY29tcGlsZSBzbyBkbyBhIHRlbXBsYXRlIGxvb2t1cFxuXHR9XG5cblx0Ly8gSWYgb3B0aW9ucywgdGhlbiB0aGlzIHdhcyBhbHJlYWR5IGNvbXBpbGVkIGZyb20gYSAoc2NyaXB0KSBlbGVtZW50IHRlbXBsYXRlIGRlY2xhcmF0aW9uLlxuXHQvLyBJZiBub3QsIHRoZW4gaWYgdG1wbCBpcyBhIHRlbXBsYXRlIG9iamVjdCwgdXNlIGl0IGZvciBvcHRpb25zXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8ICh0bXBsLm1hcmt1cFxuXHRcdD8gdG1wbC5ibmRzXG5cdFx0XHQ/ICRleHRlbmQoe30sIHRtcGwpXG5cdFx0XHQ6IHRtcGxcblx0XHQ6IHt9XG5cdCk7XG5cblx0b3B0aW9ucy50bXBsTmFtZSA9IG9wdGlvbnMudG1wbE5hbWUgfHwgbmFtZSB8fCBcInVubmFtZWRcIjtcblx0aWYgKHBhcmVudFRtcGwpIHtcblx0XHRvcHRpb25zLl9wYXJlbnRUbXBsID0gcGFyZW50VG1wbDtcblx0fVxuXHQvLyBJZiB0bXBsIGlzIG5vdCBhIG1hcmt1cCBzdHJpbmcgb3IgYSBzZWxlY3RvciBzdHJpbmcsIHRoZW4gaXQgbXVzdCBiZSBhIHRlbXBsYXRlIG9iamVjdFxuXHQvLyBJbiB0aGF0IGNhc2UsIGdldCBpdCBmcm9tIHRoZSBtYXJrdXAgcHJvcGVydHkgb2YgdGhlIG9iamVjdFxuXHRpZiAoIXRtcGxPck1hcmt1cCAmJiB0bXBsLm1hcmt1cCAmJiAodG1wbE9yTWFya3VwID0gbG9va3VwVGVtcGxhdGUodG1wbC5tYXJrdXApKSAmJiB0bXBsT3JNYXJrdXAuZm4pIHtcblx0XHQvLyBJZiB0aGUgc3RyaW5nIHJlZmVyZW5jZXMgYSBjb21waWxlZCB0ZW1wbGF0ZSBvYmplY3QsIG5lZWQgdG8gcmVjb21waWxlIHRvIG1lcmdlIGFueSBtb2RpZmllZCBvcHRpb25zXG5cdFx0dG1wbE9yTWFya3VwID0gdG1wbE9yTWFya3VwLm1hcmt1cDtcblx0fVxuXHRpZiAodG1wbE9yTWFya3VwICE9PSB1bmRlZmluZWQpIHtcblx0XHRpZiAodG1wbE9yTWFya3VwLnJlbmRlciB8fCB0bXBsLnJlbmRlcikge1xuXHRcdFx0Ly8gdG1wbCBpcyBhbHJlYWR5IGNvbXBpbGVkLCBzbyB1c2UgaXRcblx0XHRcdGlmICh0bXBsT3JNYXJrdXAudG1wbHMpIHtcblx0XHRcdFx0Y29tcGlsZWRUbXBsID0gdG1wbE9yTWFya3VwO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyB0bXBsT3JNYXJrdXAgaXMgYSBtYXJrdXAgc3RyaW5nLCBub3QgYSBjb21waWxlZCB0ZW1wbGF0ZVxuXHRcdFx0Ly8gQ3JlYXRlIHRlbXBsYXRlIG9iamVjdFxuXHRcdFx0dG1wbCA9IHRtcGxPYmplY3QodG1wbE9yTWFya3VwLCBvcHRpb25zKTtcblx0XHRcdC8vIENvbXBpbGUgdG8gQVNUIGFuZCB0aGVuIHRvIGNvbXBpbGVkIGZ1bmN0aW9uXG5cdFx0XHR0bXBsRm4odG1wbE9yTWFya3VwLnJlcGxhY2UockVzY2FwZVF1b3RlcywgXCJcXFxcJCZcIiksIHRtcGwpO1xuXHRcdH1cblx0XHRpZiAoIWNvbXBpbGVkVG1wbCkge1xuXHRcdFx0Y29tcGlsZWRUbXBsID0gJGV4dGVuZChmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIGNvbXBpbGVkVG1wbC5yZW5kZXIuYXBwbHkoY29tcGlsZWRUbXBsLCBhcmd1bWVudHMpO1xuXHRcdFx0fSwgdG1wbCk7XG5cblx0XHRcdGNvbXBpbGVDaGlsZFJlc291cmNlcyhjb21waWxlZFRtcGwpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29tcGlsZWRUbXBsO1xuXHR9XG59XG5cbi8vPT09PSAvZW5kIG9mIGZ1bmN0aW9uIGNvbXBpbGVUbXBsID09PT1cblxuLy89PT09PT09PT09PT09PT09PVxuLy8gY29tcGlsZVZpZXdNb2RlbFxuLy89PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsKGRlZmF1bHRWYWwsIGRhdGEpIHtcblx0cmV0dXJuICRpc0Z1bmN0aW9uKGRlZmF1bHRWYWwpXG5cdFx0PyBkZWZhdWx0VmFsLmNhbGwoZGF0YSlcblx0XHQ6IGRlZmF1bHRWYWw7XG59XG5cbmZ1bmN0aW9uIHVubWFwQXJyYXkobW9kZWxBcnIpIHtcblx0XHR2YXIgYXJyID0gW10sXG5cdFx0XHRpID0gMCxcblx0XHRcdGwgPSBtb2RlbEFyci5sZW5ndGg7XG5cdFx0Zm9yICg7IGk8bDsgaSsrKSB7XG5cdFx0XHRhcnIucHVzaChtb2RlbEFycltpXS51bm1hcCgpKTtcblx0XHR9XG5cdFx0cmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gY29tcGlsZVZpZXdNb2RlbChuYW1lLCB0eXBlKSB7XG5cdHZhciBpLCBjb25zdHJ1Y3Rvcixcblx0XHR2aWV3TW9kZWxzID0gdGhpcyxcblx0XHRnZXR0ZXJzID0gdHlwZS5nZXR0ZXJzLFxuXHRcdGV4dGVuZCA9IHR5cGUuZXh0ZW5kLFxuXHRcdGlkID0gdHlwZS5pZCxcblx0XHRwcm90byA9ICQuZXh0ZW5kKHtcblx0XHRcdF9pczogbmFtZSB8fCBcInVubmFtZWRcIixcblx0XHRcdHVubWFwOiB1bm1hcCxcblx0XHRcdG1lcmdlOiBtZXJnZVxuXHRcdH0sIGV4dGVuZCksXG5cdFx0YXJncyA9IFwiXCIsXG5cdFx0Ym9keSA9IFwiXCIsXG5cdFx0ZyA9IGdldHRlcnMgPyBnZXR0ZXJzLmxlbmd0aCA6IDAsXG5cdFx0JG9ic2VydmFibGUgPSAkLm9ic2VydmFibGUsXG5cdFx0Z2V0dGVyTmFtZXMgPSB7fTtcblxuXHRmdW5jdGlvbiBHZXROZXcoYXJncykge1xuXHRcdGNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9XG5cblx0ZnVuY3Rpb24gdm0oKSB7XG5cdFx0cmV0dXJuIG5ldyBHZXROZXcoYXJndW1lbnRzKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGl0ZXJhdGUoZGF0YSwgYWN0aW9uKSB7XG5cdFx0dmFyIGdldHRlclR5cGUsIGRlZmF1bHRWYWwsIHByb3AsIG9iLFxuXHRcdFx0aiA9IDA7XG5cdFx0Zm9yICg7IGo8ZzsgaisrKSB7XG5cdFx0XHRwcm9wID0gZ2V0dGVyc1tqXTtcblx0XHRcdGdldHRlclR5cGUgPSB1bmRlZmluZWQ7XG5cdFx0XHRpZiAocHJvcCArIFwiXCIgIT09IHByb3ApIHtcblx0XHRcdFx0Z2V0dGVyVHlwZSA9IHByb3A7XG5cdFx0XHRcdHByb3AgPSBnZXR0ZXJUeXBlLmdldHRlcjtcblx0XHRcdH1cblx0XHRcdGlmICgob2IgPSBkYXRhW3Byb3BdKSA9PT0gdW5kZWZpbmVkICYmIGdldHRlclR5cGUgJiYgKGRlZmF1bHRWYWwgPSBnZXR0ZXJUeXBlLmRlZmF1bHRWYWwpICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0b2IgPSBnZXREZWZhdWx0VmFsKGRlZmF1bHRWYWwsIGRhdGEpO1xuXHRcdFx0fVxuXHRcdFx0YWN0aW9uKG9iLCBnZXR0ZXJUeXBlICYmIHZpZXdNb2RlbHNbZ2V0dGVyVHlwZS50eXBlXSwgcHJvcCk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gbWFwKGRhdGEpIHtcblx0XHRkYXRhID0gZGF0YSArIFwiXCIgPT09IGRhdGFcblx0XHRcdD8gSlNPTi5wYXJzZShkYXRhKSAvLyBBY2NlcHQgSlNPTiBzdHJpbmdcblx0XHRcdDogZGF0YTsgICAgICAgICAgICAvLyBvciBvYmplY3QvYXJyYXlcblx0XHR2YXIgbCwgcHJvcCxcblx0XHRcdGogPSAwLFxuXHRcdFx0b2IgPSBkYXRhLFxuXHRcdFx0YXJyID0gW107XG5cblx0XHRpZiAoJGlzQXJyYXkoZGF0YSkpIHtcblx0XHRcdGRhdGEgPSBkYXRhIHx8IFtdO1xuXHRcdFx0bCA9IGRhdGEubGVuZ3RoO1xuXHRcdFx0Zm9yICg7IGo8bDsgaisrKSB7XG5cdFx0XHRcdGFyci5wdXNoKHRoaXMubWFwKGRhdGFbal0pKTtcblx0XHRcdH1cblx0XHRcdGFyci5faXMgPSBuYW1lO1xuXHRcdFx0YXJyLnVubWFwID0gdW5tYXA7XG5cdFx0XHRhcnIubWVyZ2UgPSBtZXJnZTtcblx0XHRcdHJldHVybiBhcnI7XG5cdFx0fVxuXG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGl0ZXJhdGUoZGF0YSwgZnVuY3Rpb24ob2IsIHZpZXdNb2RlbCkge1xuXHRcdFx0XHRpZiAodmlld01vZGVsKSB7IC8vIEl0ZXJhdGUgdG8gYnVpbGQgZ2V0dGVycyBhcmcgYXJyYXkgKHZhbHVlLCBvciBtYXBwZWQgdmFsdWUpXG5cdFx0XHRcdFx0b2IgPSB2aWV3TW9kZWwubWFwKG9iKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRhcnIucHVzaChvYik7XG5cdFx0XHR9KTtcblxuXHRcdFx0b2IgPSB0aGlzLmFwcGx5KHRoaXMsIGFycik7IC8vIEluc2FudGlhdGUgdGhpcyBWaWV3IE1vZGVsLCBwYXNzaW5nIGdldHRlcnMgYXJncyBhcnJheSB0byBjb25zdHJ1Y3RvclxuXHRcdFx0Zm9yIChwcm9wIGluIGRhdGEpIHsgLy8gQ29weSBvdmVyIGFueSBvdGhlciBwcm9wZXJ0aWVzLiB0aGF0IGFyZSBub3QgZ2V0L3NldCBwcm9wZXJ0aWVzXG5cdFx0XHRcdGlmIChwcm9wICE9PSAkZXhwYW5kbyAmJiAhZ2V0dGVyTmFtZXNbcHJvcF0pIHtcblx0XHRcdFx0XHRvYltwcm9wXSA9IGRhdGFbcHJvcF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG9iO1xuXHR9XG5cblx0ZnVuY3Rpb24gbWVyZ2UoZGF0YSkge1xuXHRcdGRhdGEgPSBkYXRhICsgXCJcIiA9PT0gZGF0YVxuXHRcdFx0PyBKU09OLnBhcnNlKGRhdGEpIC8vIEFjY2VwdCBKU09OIHN0cmluZ1xuXHRcdFx0OiBkYXRhOyAgICAgICAgICAgIC8vIG9yIG9iamVjdC9hcnJheVxuXHRcdHZhciBqLCBsLCBtLCBwcm9wLCBtb2QsIGZvdW5kLCBhc3NpZ25lZCwgb2IsIG5ld01vZEFycixcblx0XHRcdGsgPSAwLFxuXHRcdFx0bW9kZWwgPSB0aGlzO1xuXG5cdFx0aWYgKCRpc0FycmF5KG1vZGVsKSkge1xuXHRcdFx0YXNzaWduZWQgPSB7fTtcblx0XHRcdG5ld01vZEFyciA9IFtdO1xuXHRcdFx0bCA9IGRhdGEubGVuZ3RoO1xuXHRcdFx0bSA9IG1vZGVsLmxlbmd0aDtcblx0XHRcdGZvciAoOyBrPGw7IGsrKykge1xuXHRcdFx0XHRvYiA9IGRhdGFba107XG5cdFx0XHRcdGZvdW5kID0gZmFsc2U7XG5cdFx0XHRcdGZvciAoaj0wOyBqPG0gJiYgIWZvdW5kOyBqKyspIHtcblx0XHRcdFx0XHRpZiAoYXNzaWduZWRbal0pIHtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRtb2QgPSBtb2RlbFtqXTtcblxuXHRcdFx0XHRcdGlmIChpZCkge1xuXHRcdFx0XHRcdFx0YXNzaWduZWRbal0gPSBmb3VuZCA9IGlkICsgXCJcIiA9PT0gaWRcblx0XHRcdFx0XHRcdD8gKG9iW2lkXSAmJiAoZ2V0dGVyTmFtZXNbaWRdID8gbW9kW2lkXSgpIDogbW9kW2lkXSkgPT09IG9iW2lkXSlcblx0XHRcdFx0XHRcdDogaWQobW9kLCBvYik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChmb3VuZCkge1xuXHRcdFx0XHRcdG1vZC5tZXJnZShvYik7XG5cdFx0XHRcdFx0bmV3TW9kQXJyLnB1c2gobW9kKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRuZXdNb2RBcnIucHVzaCh2bS5tYXAob2IpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCRvYnNlcnZhYmxlKSB7XG5cdFx0XHRcdCRvYnNlcnZhYmxlKG1vZGVsKS5yZWZyZXNoKG5ld01vZEFyciwgdHJ1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtb2RlbC5zcGxpY2UuYXBwbHkobW9kZWwsIFswLCBtb2RlbC5sZW5ndGhdLmNvbmNhdChuZXdNb2RBcnIpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aXRlcmF0ZShkYXRhLCBmdW5jdGlvbihvYiwgdmlld01vZGVsLCBnZXR0ZXIpIHtcblx0XHRcdGlmICh2aWV3TW9kZWwpIHtcblx0XHRcdFx0bW9kZWxbZ2V0dGVyXSgpLm1lcmdlKG9iKTsgLy8gVXBkYXRlIHR5cGVkIHByb3BlcnR5XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtb2RlbFtnZXR0ZXJdKG9iKTsgLy8gVXBkYXRlIG5vbi10eXBlZCBwcm9wZXJ0eVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGZvciAocHJvcCBpbiBkYXRhKSB7XG5cdFx0XHRpZiAocHJvcCAhPT0gJGV4cGFuZG8gJiYgIWdldHRlck5hbWVzW3Byb3BdKSB7XG5cdFx0XHRcdG1vZGVsW3Byb3BdID0gZGF0YVtwcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiB1bm1hcCgpIHtcblx0XHR2YXIgb2IsIHByb3AsIGdldHRlclR5cGUsIGFyciwgdmFsdWUsXG5cdFx0XHRrID0gMCxcblx0XHRcdG1vZGVsID0gdGhpcztcblxuXHRcdGlmICgkaXNBcnJheShtb2RlbCkpIHtcblx0XHRcdHJldHVybiB1bm1hcEFycmF5KG1vZGVsKTtcblx0XHR9XG5cdFx0b2IgPSB7fTtcblx0XHRmb3IgKDsgazxnOyBrKyspIHtcblx0XHRcdHByb3AgPSBnZXR0ZXJzW2tdO1xuXHRcdFx0Z2V0dGVyVHlwZSA9IHVuZGVmaW5lZDtcblx0XHRcdGlmIChwcm9wICsgXCJcIiAhPT0gcHJvcCkge1xuXHRcdFx0XHRnZXR0ZXJUeXBlID0gcHJvcDtcblx0XHRcdFx0cHJvcCA9IGdldHRlclR5cGUuZ2V0dGVyO1xuXHRcdFx0fVxuXHRcdFx0dmFsdWUgPSBtb2RlbFtwcm9wXSgpO1xuXHRcdFx0b2JbcHJvcF0gPSBnZXR0ZXJUeXBlICYmIHZhbHVlICYmIHZpZXdNb2RlbHNbZ2V0dGVyVHlwZS50eXBlXVxuXHRcdFx0XHQ/ICRpc0FycmF5KHZhbHVlKVxuXHRcdFx0XHRcdD8gdW5tYXBBcnJheSh2YWx1ZSlcblx0XHRcdFx0XHQ6IHZhbHVlLnVubWFwKClcblx0XHRcdFx0OiB2YWx1ZTtcblx0XHR9XG5cdFx0Zm9yIChwcm9wIGluIG1vZGVsKSB7XG5cdFx0XHRpZiAocHJvcCAhPT0gXCJfaXNcIiAmJiAhZ2V0dGVyTmFtZXNbcHJvcF0gJiYgcHJvcCAhPT0gJGV4cGFuZG8gICYmIChwcm9wLmNoYXJBdCgwKSAhPT0gXCJfXCIgfHwgIWdldHRlck5hbWVzW3Byb3Auc2xpY2UoMSldKSAmJiAhJGlzRnVuY3Rpb24obW9kZWxbcHJvcF0pKSB7XG5cdFx0XHRcdG9iW3Byb3BdID0gbW9kZWxbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBvYjtcblx0fVxuXG5cdEdldE5ldy5wcm90b3R5cGUgPSBwcm90bztcblxuXHRmb3IgKGk9MDsgaTxnOyBpKyspIHtcblx0XHQoZnVuY3Rpb24oZ2V0dGVyKSB7XG5cdFx0XHRnZXR0ZXIgPSBnZXR0ZXIuZ2V0dGVyIHx8IGdldHRlcjtcblx0XHRcdGdldHRlck5hbWVzW2dldHRlcl0gPSBpKzE7XG5cdFx0XHR2YXIgcHJpdkZpZWxkID0gXCJfXCIgKyBnZXR0ZXI7XG5cblx0XHRcdGFyZ3MgKz0gKGFyZ3MgPyBcIixcIiA6IFwiXCIpICsgZ2V0dGVyO1xuXHRcdFx0Ym9keSArPSBcInRoaXMuXCIgKyBwcml2RmllbGQgKyBcIiA9IFwiICsgZ2V0dGVyICsgXCI7XFxuXCI7XG5cdFx0XHRwcm90b1tnZXR0ZXJdID0gcHJvdG9bZ2V0dGVyXSB8fCBmdW5jdGlvbih2YWwpIHtcblx0XHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXNbcHJpdkZpZWxkXTsgLy8gSWYgdGhlcmUgaXMgbm8gYXJndW1lbnQsIHVzZSBhcyBhIGdldHRlclxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgkb2JzZXJ2YWJsZSkge1xuXHRcdFx0XHRcdCRvYnNlcnZhYmxlKHRoaXMpLnNldFByb3BlcnR5KGdldHRlciwgdmFsKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzW3ByaXZGaWVsZF0gPSB2YWw7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGlmICgkb2JzZXJ2YWJsZSkge1xuXHRcdFx0XHRwcm90b1tnZXR0ZXJdLnNldCA9IHByb3RvW2dldHRlcl0uc2V0IHx8IGZ1bmN0aW9uKHZhbCkge1xuXHRcdFx0XHRcdHRoaXNbcHJpdkZpZWxkXSA9IHZhbDsgLy8gU2V0dGVyIGNhbGxlZCBieSBvYnNlcnZhYmxlIHByb3BlcnR5IGNoYW5nZVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH0pKGdldHRlcnNbaV0pO1xuXHR9XG5cblx0Y29uc3RydWN0b3IgPSBuZXcgRnVuY3Rpb24oYXJncywgYm9keS5zbGljZSgwLCAtMSkpO1xuXHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90bztcblx0cHJvdG8uY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcblxuXHR2bS5tYXAgPSBtYXA7XG5cdHZtLmdldHRlcnMgPSBnZXR0ZXJzO1xuXHR2bS5leHRlbmQgPSBleHRlbmQ7XG5cdHZtLmlkID0gaWQ7XG5cdHJldHVybiB2bTtcbn1cblxuZnVuY3Rpb24gdG1wbE9iamVjdChtYXJrdXAsIG9wdGlvbnMpIHtcblx0Ly8gVGVtcGxhdGUgb2JqZWN0IGNvbnN0cnVjdG9yXG5cdHZhciBodG1sVGFnLFxuXHRcdHdyYXBNYXAgPSAkc3ViU2V0dGluZ3NBZHZhbmNlZC5fd20gfHwge30sIC8vIE9ubHkgdXNlZCBpbiBKc1ZpZXdzLiBPdGhlcndpc2UgZW1wdHk6IHt9XG5cdFx0dG1wbCA9IHtcblx0XHRcdHRtcGxzOiBbXSxcblx0XHRcdGxpbmtzOiB7fSwgLy8gQ29tcGlsZWQgZnVuY3Rpb25zIGZvciBsaW5rIGV4cHJlc3Npb25zXG5cdFx0XHRibmRzOiBbXSxcblx0XHRcdF9pczogXCJ0ZW1wbGF0ZVwiLFxuXHRcdFx0cmVuZGVyOiByZW5kZXJDb250ZW50XG5cdFx0fTtcblxuXHRpZiAob3B0aW9ucykge1xuXHRcdHRtcGwgPSAkZXh0ZW5kKHRtcGwsIG9wdGlvbnMpO1xuXHR9XG5cblx0dG1wbC5tYXJrdXAgPSBtYXJrdXA7XG5cdGlmICghdG1wbC5odG1sVGFnKSB7XG5cdFx0Ly8gU2V0IHRtcGwudGFnIHRvIHRoZSB0b3AtbGV2ZWwgSFRNTCB0YWcgdXNlZCBpbiB0aGUgdGVtcGxhdGUsIGlmIGFueS4uLlxuXHRcdGh0bWxUYWcgPSByRmlyc3RFbGVtLmV4ZWMobWFya3VwKTtcblx0XHR0bXBsLmh0bWxUYWcgPSBodG1sVGFnID8gaHRtbFRhZ1sxXS50b0xvd2VyQ2FzZSgpIDogXCJcIjtcblx0fVxuXHRodG1sVGFnID0gd3JhcE1hcFt0bXBsLmh0bWxUYWddO1xuXHRpZiAoaHRtbFRhZyAmJiBodG1sVGFnICE9PSB3cmFwTWFwLmRpdikge1xuXHRcdC8vIFdoZW4gdXNpbmcgSnNWaWV3cywgd2UgdHJpbSB0ZW1wbGF0ZXMgd2hpY2ggYXJlIGluc2VydGVkIGludG8gSFRNTCBjb250ZXh0cyB3aGVyZSB0ZXh0IG5vZGVzIGFyZSBub3QgcmVuZGVyZWQgKGkuZS4gbm90ICdQaHJhc2luZyBDb250ZW50JykuXG5cdFx0Ly8gQ3VycmVudGx5IG5vdCB0cmltbWVkIGZvciA8bGk+IHRhZy4gKE5vdCB3b3J0aCBhZGRpbmcgcGVyZiBjb3N0KVxuXHRcdHRtcGwubWFya3VwID0gJC50cmltKHRtcGwubWFya3VwKTtcblx0fVxuXG5cdHJldHVybiB0bXBsO1xufVxuXG4vLz09PT09PT09PT09PT09XG4vLyByZWdpc3RlclN0b3JlXG4vLz09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyU3RvcmUoc3RvcmVOYW1lLCBzdG9yZVNldHRpbmdzKSB7XG5cblx0ZnVuY3Rpb24gdGhlU3RvcmUobmFtZSwgaXRlbSwgcGFyZW50VG1wbCkge1xuXHRcdC8vIFRoZSBzdG9yZSBpcyBhbHNvIHRoZSBmdW5jdGlvbiB1c2VkIHRvIGFkZCBpdGVtcyB0byB0aGUgc3RvcmUuIGUuZy4gJC50ZW1wbGF0ZXMsIG9yICQudmlld3MudGFnc1xuXG5cdFx0Ly8gRm9yIHN0b3JlIG9mIG5hbWUgJ3RoaW5nJywgQ2FsbCBhczpcblx0XHQvLyAgICAkLnZpZXdzLnRoaW5ncyhpdGVtc1ssIHBhcmVudFRtcGxdKSxcblx0XHQvLyBvciAkLnZpZXdzLnRoaW5ncyhuYW1lLCBpdGVtWywgcGFyZW50VG1wbF0pXG5cblx0XHR2YXIgY29tcGlsZSwgaXRlbU5hbWUsIHRoaXNTdG9yZSwgY250LFxuXHRcdFx0b25TdG9yZSA9ICRzdWIub25TdG9yZVtzdG9yZU5hbWVdO1xuXG5cdFx0aWYgKG5hbWUgJiYgdHlwZW9mIG5hbWUgPT09IE9CSkVDVCAmJiAhbmFtZS5ub2RlVHlwZSAmJiAhbmFtZS5tYXJrdXAgJiYgIW5hbWUuZ2V0VGd0ICYmICEoc3RvcmVOYW1lID09PSBcInZpZXdNb2RlbFwiICYmIG5hbWUuZ2V0dGVycyB8fCBuYW1lLmV4dGVuZCkpIHtcblx0XHRcdC8vIENhbGwgdG8gJC52aWV3cy50aGluZ3MoaXRlbXNbLCBwYXJlbnRUbXBsXSksXG5cblx0XHRcdC8vIEFkZGluZyBpdGVtcyB0byB0aGUgc3RvcmVcblx0XHRcdC8vIElmIG5hbWUgaXMgYSBoYXNoLCB0aGVuIGl0ZW0gaXMgcGFyZW50VG1wbC4gSXRlcmF0ZSBvdmVyIGhhc2ggYW5kIGNhbGwgc3RvcmUgZm9yIGtleS5cblx0XHRcdGZvciAoaXRlbU5hbWUgaW4gbmFtZSkge1xuXHRcdFx0XHR0aGVTdG9yZShpdGVtTmFtZSwgbmFtZVtpdGVtTmFtZV0sIGl0ZW0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGl0ZW0gfHwgJHZpZXdzO1xuXHRcdH1cblx0XHQvLyBBZGRpbmcgYSBzaW5nbGUgdW5uYW1lZCBpdGVtIHRvIHRoZSBzdG9yZVxuXHRcdGlmIChpdGVtID09PSB1bmRlZmluZWQpIHtcblx0XHRcdGl0ZW0gPSBuYW1lO1xuXHRcdFx0bmFtZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKG5hbWUgJiYgXCJcIiArIG5hbWUgIT09IG5hbWUpIHsgLy8gbmFtZSBtdXN0IGJlIGEgc3RyaW5nXG5cdFx0XHRwYXJlbnRUbXBsID0gaXRlbTtcblx0XHRcdGl0ZW0gPSBuYW1lO1xuXHRcdFx0bmFtZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0dGhpc1N0b3JlID0gcGFyZW50VG1wbFxuXHRcdFx0PyBzdG9yZU5hbWUgPT09IFwidmlld01vZGVsXCJcblx0XHRcdFx0PyBwYXJlbnRUbXBsXG5cdFx0XHRcdDogKHBhcmVudFRtcGxbc3RvcmVOYW1lc10gPSBwYXJlbnRUbXBsW3N0b3JlTmFtZXNdIHx8IHt9KVxuXHRcdFx0OiB0aGVTdG9yZTtcblx0XHRjb21waWxlID0gc3RvcmVTZXR0aW5ncy5jb21waWxlO1xuXG5cdFx0aWYgKGl0ZW0gPT09IG51bGwpIHtcblx0XHRcdC8vIElmIGl0ZW0gaXMgbnVsbCwgZGVsZXRlIHRoaXMgZW50cnlcblx0XHRcdGlmIChuYW1lKSB7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzU3RvcmVbbmFtZV07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChjb21waWxlKSB7XG5cdFx0XHRcdGl0ZW0gPSBjb21waWxlLmNhbGwodGhpc1N0b3JlLCBuYW1lLCBpdGVtLCBwYXJlbnRUbXBsLCAwKSB8fCB7fTtcblx0XHRcdFx0aXRlbS5faXMgPSBzdG9yZU5hbWU7IC8vIE9ubHkgZG8gdGhpcyBmb3IgY29tcGlsZWQgb2JqZWN0cyAodGFncywgdGVtcGxhdGVzLi4uKVxuXHRcdFx0fVxuXHRcdFx0aWYgKG5hbWUpIHtcblx0XHRcdFx0dGhpc1N0b3JlW25hbWVdID0gaXRlbTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKG9uU3RvcmUpIHtcblx0XHRcdC8vIGUuZy4gSnNWaWV3cyBpbnRlZ3JhdGlvblxuXHRcdFx0b25TdG9yZShuYW1lLCBpdGVtLCBwYXJlbnRUbXBsLCBjb21waWxlKTtcblx0XHR9XG5cdFx0cmV0dXJuIGl0ZW07XG5cdH1cblxuXHR2YXIgc3RvcmVOYW1lcyA9IHN0b3JlTmFtZSArIFwic1wiO1xuXHQkdmlld3Nbc3RvcmVOYW1lc10gPSB0aGVTdG9yZTtcbn1cblxuZnVuY3Rpb24gYWRkU2V0dGluZyhzdCkge1xuXHQkdmlld3NTZXR0aW5nc1tzdF0gPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG5cdFx0XHQ/ICgkc3ViU2V0dGluZ3Nbc3RdID0gdmFsdWUsICR2aWV3c1NldHRpbmdzKVxuXHRcdFx0OiAkc3ViU2V0dGluZ3Nbc3RdO1xuXHR9O1xufVxuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gZGF0YU1hcCBmb3IgcmVuZGVyIG9ubHlcbi8vPT09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGRhdGFNYXAobWFwRGVmKSB7XG5cdGZ1bmN0aW9uIE1hcChzb3VyY2UsIG9wdGlvbnMpIHtcblx0XHR0aGlzLnRndCA9IG1hcERlZi5nZXRUZ3Qoc291cmNlLCBvcHRpb25zKTtcblx0XHRvcHRpb25zLm1hcCA9IHRoaXM7XG5cdH1cblxuXHRpZiAoJGlzRnVuY3Rpb24obWFwRGVmKSkge1xuXHRcdC8vIFNpbXBsZSBtYXAgZGVjbGFyZWQgYXMgZnVuY3Rpb25cblx0XHRtYXBEZWYgPSB7XG5cdFx0XHRnZXRUZ3Q6IG1hcERlZlxuXHRcdH07XG5cdH1cblxuXHRpZiAobWFwRGVmLmJhc2VNYXApIHtcblx0XHRtYXBEZWYgPSAkZXh0ZW5kKCRleHRlbmQoe30sIG1hcERlZi5iYXNlTWFwKSwgbWFwRGVmKTtcblx0fVxuXG5cdG1hcERlZi5tYXAgPSBmdW5jdGlvbihzb3VyY2UsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gbmV3IE1hcChzb3VyY2UsIG9wdGlvbnMpO1xuXHR9O1xuXHRyZXR1cm4gbWFwRGVmO1xufVxuXG4vLz09PT09PT09PT09PT09XG4vLyByZW5kZXJDb250ZW50XG4vLz09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHJlbmRlckNvbnRlbnQoZGF0YSwgY29udGV4dCwgbm9JdGVyYXRpb24sIHBhcmVudFZpZXcsIGtleSwgb25SZW5kZXIpIHtcblx0dmFyIGksIGwsIHRhZywgdG1wbCwgdGFnQ3R4LCBpc1RvcFJlbmRlckNhbGwsIHByZXZEYXRhLCBwcmV2SW5kZXgsXG5cdFx0dmlldyA9IHBhcmVudFZpZXcsXG5cdFx0cmVzdWx0ID0gXCJcIjtcblxuXHRpZiAoY29udGV4dCA9PT0gdHJ1ZSkge1xuXHRcdG5vSXRlcmF0aW9uID0gY29udGV4dDsgLy8gcGFzc2luZyBib29sZWFuIGFzIHNlY29uZCBwYXJhbSAtIG5vSXRlcmF0aW9uXG5cdFx0Y29udGV4dCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICh0eXBlb2YgY29udGV4dCAhPT0gT0JKRUNUKSB7XG5cdFx0Y29udGV4dCA9IHVuZGVmaW5lZDsgLy8gY29udGV4dCBtdXN0IGJlIGEgYm9vbGVhbiAobm9JdGVyYXRpb24pIG9yIGEgcGxhaW4gb2JqZWN0XG5cdH1cblxuXHRpZiAodGFnID0gdGhpcy50YWcpIHtcblx0XHQvLyBUaGlzIGlzIGEgY2FsbCBmcm9tIHJlbmRlclRhZyBvciB0YWdDdHgucmVuZGVyKC4uLilcblx0XHR0YWdDdHggPSB0aGlzO1xuXHRcdHZpZXcgPSB2aWV3IHx8IHRhZ0N0eC52aWV3O1xuXHRcdHRtcGwgPSB2aWV3LmdldFRtcGwodGFnLnRlbXBsYXRlIHx8IHRhZ0N0eC50bXBsKTtcblx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRcdGRhdGEgPSB0YWcuY29udGVudEN0eCAmJiAkaXNGdW5jdGlvbih0YWcuY29udGVudEN0eClcblx0XHRcdFx0PyBkYXRhID0gdGFnLmNvbnRlbnRDdHgoZGF0YSlcblx0XHRcdFx0OiB2aWV3OyAvLyBEZWZhdWx0IGRhdGEgY29udGV4dCBmb3Igd3JhcHBlZCBibG9jayBjb250ZW50IGlzIHRoZSBmaXJzdCBhcmd1bWVudFxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHQvLyBUaGlzIGlzIGEgdGVtcGxhdGUucmVuZGVyKC4uLikgY2FsbFxuXHRcdHRtcGwgPSB0aGlzO1xuXHR9XG5cblx0aWYgKHRtcGwpIHtcblx0XHRpZiAoIXBhcmVudFZpZXcgJiYgZGF0YSAmJiBkYXRhLl9pcyA9PT0gXCJ2aWV3XCIpIHtcblx0XHRcdHZpZXcgPSBkYXRhOyAvLyBXaGVuIHBhc3NpbmcgaW4gYSB2aWV3IHRvIHJlbmRlciBvciBsaW5rIChhbmQgbm90IHBhc3NpbmcgaW4gYSBwYXJlbnQgdmlldykgdXNlIHRoZSBwYXNzZWQtaW4gdmlldyBhcyBwYXJlbnRWaWV3XG5cdFx0fVxuXG5cdFx0aWYgKHZpZXcgJiYgZGF0YSA9PT0gdmlldykge1xuXHRcdFx0Ly8gSW5oZXJpdCB0aGUgZGF0YSBmcm9tIHRoZSBwYXJlbnQgdmlldy5cblx0XHRcdGRhdGEgPSB2aWV3LmRhdGE7XG5cdFx0fVxuXG5cdFx0aXNUb3BSZW5kZXJDYWxsID0gIXZpZXc7XG5cdFx0aXNSZW5kZXJDYWxsID0gaXNSZW5kZXJDYWxsIHx8IGlzVG9wUmVuZGVyQ2FsbDtcblx0XHRpZiAoIXZpZXcpIHtcblx0XHRcdChjb250ZXh0ID0gY29udGV4dCB8fCB7fSkucm9vdCA9IGRhdGE7IC8vIFByb3ZpZGUgfnJvb3QgYXMgc2hvcnRjdXQgdG8gdG9wLWxldmVsIGRhdGEuXG5cdFx0fVxuXHRcdGlmICghaXNSZW5kZXJDYWxsIHx8ICRzdWJTZXR0aW5nc0FkdmFuY2VkLnVzZVZpZXdzIHx8IHRtcGwudXNlVmlld3MgfHwgdmlldyAmJiB2aWV3ICE9PSB0b3BWaWV3KSB7XG5cdFx0XHRyZXN1bHQgPSByZW5kZXJXaXRoVmlld3ModG1wbCwgZGF0YSwgY29udGV4dCwgbm9JdGVyYXRpb24sIHZpZXcsIGtleSwgb25SZW5kZXIsIHRhZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh2aWV3KSB7IC8vIEluIGEgYmxvY2tcblx0XHRcdFx0cHJldkRhdGEgPSB2aWV3LmRhdGE7XG5cdFx0XHRcdHByZXZJbmRleCA9IHZpZXcuaW5kZXg7XG5cdFx0XHRcdHZpZXcuaW5kZXggPSBpbmRleFN0cjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZpZXcgPSB0b3BWaWV3O1xuXHRcdFx0XHRwcmV2RGF0YSA9IHZpZXcuZGF0YTtcblx0XHRcdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRcdFx0dmlldy5jdHggPSBjb250ZXh0O1xuXHRcdFx0fVxuXHRcdFx0aWYgKCRpc0FycmF5KGRhdGEpICYmICFub0l0ZXJhdGlvbikge1xuXHRcdFx0XHQvLyBDcmVhdGUgYSB2aWV3IGZvciB0aGUgYXJyYXksIHdob3NlIGNoaWxkIHZpZXdzIGNvcnJlc3BvbmQgdG8gZWFjaCBkYXRhIGl0ZW0uIChOb3RlOiBpZiBrZXkgYW5kIHBhcmVudFZpZXcgYXJlIHBhc3NlZCBpblxuXHRcdFx0XHQvLyBhbG9uZyB3aXRoIHBhcmVudCB2aWV3LCB0cmVhdCBhcyBpbnNlcnQgLWUuZy4gZnJvbSB2aWV3LmFkZFZpZXdzIC0gc28gcGFyZW50VmlldyBpcyBhbHJlYWR5IHRoZSB2aWV3IGl0ZW0gZm9yIGFycmF5KVxuXHRcdFx0XHRmb3IgKGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdFx0XHR2aWV3LmluZGV4ID0gaTtcblx0XHRcdFx0XHR2aWV3LmRhdGEgPSBkYXRhW2ldO1xuXHRcdFx0XHRcdHJlc3VsdCArPSB0bXBsLmZuKGRhdGFbaV0sIHZpZXcsICRzdWIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2aWV3LmRhdGEgPSBkYXRhO1xuXHRcdFx0XHRyZXN1bHQgKz0gdG1wbC5mbihkYXRhLCB2aWV3LCAkc3ViKTtcblx0XHRcdH1cblx0XHRcdHZpZXcuZGF0YSA9IHByZXZEYXRhO1xuXHRcdFx0dmlldy5pbmRleCA9IHByZXZJbmRleDtcblx0XHR9XG5cdFx0aWYgKGlzVG9wUmVuZGVyQ2FsbCkge1xuXHRcdFx0aXNSZW5kZXJDYWxsID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJXaXRoVmlld3ModG1wbCwgZGF0YSwgY29udGV4dCwgbm9JdGVyYXRpb24sIHZpZXcsIGtleSwgb25SZW5kZXIsIHRhZykge1xuXHRmdW5jdGlvbiBzZXRJdGVtVmFyKGl0ZW0pIHtcblx0XHQvLyBXaGVuIGl0ZW1WYXIgaXMgc3BlY2lmaWVkLCBzZXQgbW9kaWZpZWQgY3R4IHdpdGggdXNlci1uYW1lZCB+aXRlbVxuXHRcdG5ld0N0eCA9ICRleHRlbmQoe30sIGNvbnRleHQpO1xuXHRcdG5ld0N0eFtpdGVtVmFyXSA9IGl0ZW07XG5cdH1cblxuXHQvLyBSZW5kZXIgdGVtcGxhdGUgYWdhaW5zdCBkYXRhIGFzIGEgdHJlZSBvZiBzdWJ2aWV3cyAobmVzdGVkIHJlbmRlcmVkIHRlbXBsYXRlIGluc3RhbmNlcyksIG9yIGFzIGEgc3RyaW5nICh0b3AtbGV2ZWwgdGVtcGxhdGUpLlxuXHQvLyBJZiB0aGUgZGF0YSBpcyB0aGUgcGFyZW50IHZpZXcsIHRyZWF0IGFzIG5vSXRlcmF0aW9uLCByZS1yZW5kZXIgd2l0aCB0aGUgc2FtZSBkYXRhIGNvbnRleHQuXG5cdC8vIHRtcGwgY2FuIGJlIGEgc3RyaW5nIChlLmcuIHJlbmRlcmVkIGJ5IGEgdGFnLnJlbmRlcigpIG1ldGhvZCksIG9yIGEgY29tcGlsZWQgdGVtcGxhdGUuXG5cdHZhciBpLCBsLCBuZXdWaWV3LCBjaGlsZFZpZXcsIGl0ZW1SZXN1bHQsIHN3YXBDb250ZW50LCBjb250ZW50VG1wbCwgb3V0ZXJPblJlbmRlciwgdG1wbE5hbWUsIGl0ZW1WYXIsIG5ld0N0eCwgdGFnQ3R4LCBub0xpbmtpbmcsXG5cdFx0cmVzdWx0ID0gXCJcIjtcblxuXHRpZiAodGFnKSB7XG5cdFx0Ly8gVGhpcyBpcyBhIGNhbGwgZnJvbSByZW5kZXJUYWcgb3IgdGFnQ3R4LnJlbmRlciguLi4pXG5cdFx0dG1wbE5hbWUgPSB0YWcudGFnTmFtZTtcblx0XHR0YWdDdHggPSB0YWcudGFnQ3R4O1xuXHRcdGNvbnRleHQgPSBjb250ZXh0ID8gZXh0ZW5kQ3R4KGNvbnRleHQsIHRhZy5jdHgpIDogdGFnLmN0eDtcblxuXHRcdGlmICh0bXBsID09PSB2aWV3LmNvbnRlbnQpIHsgLy8ge3t4eHggdG1wbD0jY29udGVudH19XG5cdFx0XHRjb250ZW50VG1wbCA9IHRtcGwgIT09IHZpZXcuY3R4Ll93cnAgLy8gV2UgYXJlIHJlbmRlcmluZyB0aGUgI2NvbnRlbnRcblx0XHRcdFx0PyB2aWV3LmN0eC5fd3JwIC8vICNjb250ZW50IHdhcyB0aGUgdGFnQ3R4LnByb3BzLnRtcGwgd3JhcHBlciBvZiB0aGUgYmxvY2sgY29udGVudCAtIHNvIHdpdGhpbiB0aGlzIHZpZXcsICNjb250ZW50IHdpbGwgbm93IGJlIHRoZSB2aWV3LmN0eC5fd3JwIGJsb2NrIGNvbnRlbnRcblx0XHRcdFx0OiB1bmRlZmluZWQ7IC8vICNjb250ZW50IHdhcyB0aGUgdmlldy5jdHguX3dycCBibG9jayBjb250ZW50IC0gc28gd2l0aGluIHRoaXMgdmlldywgdGhlcmUgaXMgbm8gbG9uZ2VyIGFueSAjY29udGVudCB0byB3cmFwLlxuXHRcdH0gZWxzZSBpZiAodG1wbCAhPT0gdGFnQ3R4LmNvbnRlbnQpIHtcblx0XHRcdGlmICh0bXBsID09PSB0YWcudGVtcGxhdGUpIHsgLy8gUmVuZGVyaW5nIHt7dGFnfX0gdGFnLnRlbXBsYXRlLCByZXBsYWNpbmcgYmxvY2sgY29udGVudC5cblx0XHRcdFx0Y29udGVudFRtcGwgPSB0YWdDdHgudG1wbDsgLy8gU2V0ICNjb250ZW50IHRvIGJsb2NrIGNvbnRlbnQgKG9yIHdyYXBwZWQgYmxvY2sgY29udGVudCBpZiB0YWdDdHgucHJvcHMudG1wbCBpcyBzZXQpXG5cdFx0XHRcdGNvbnRleHQuX3dycCA9IHRhZ0N0eC5jb250ZW50OyAvLyBQYXNzIHdyYXBwZWQgYmxvY2sgY29udGVudCB0byBuZXN0ZWQgdmlld3Ncblx0XHRcdH0gZWxzZSB7IC8vIFJlbmRlcmluZyB0YWdDdHgucHJvcHMudG1wbCB3cmFwcGVyXG5cdFx0XHRcdGNvbnRlbnRUbXBsID0gdGFnQ3R4LmNvbnRlbnQgfHwgdmlldy5jb250ZW50OyAvLyBTZXQgI2NvbnRlbnQgdG8gd3JhcHBlZCBibG9jayBjb250ZW50XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRlbnRUbXBsID0gdmlldy5jb250ZW50OyAvLyBOZXN0ZWQgdmlld3MgaW5oZXJpdCBzYW1lIHdyYXBwZWQgI2NvbnRlbnQgcHJvcGVydHlcblx0XHR9XG5cblx0XHRpZiAodGFnQ3R4LnByb3BzLmxpbmsgPT09IGZhbHNlKSB7XG5cdFx0XHQvLyBsaW5rPWZhbHNlIHNldHRpbmcgb24gYmxvY2sgdGFnXG5cdFx0XHQvLyBXZSB3aWxsIG92ZXJyaWRlIGluaGVyaXRlZCB2YWx1ZSBvZiBsaW5rIGJ5IHRoZSBleHBsaWNpdCBzZXR0aW5nIGxpbms9ZmFsc2UgdGFrZW4gZnJvbSBwcm9wc1xuXHRcdFx0Ly8gVGhlIGNoaWxkIHZpZXdzIG9mIGFuIHVubGlua2VkIHZpZXcgYXJlIGFsc28gdW5saW5rZWQuIFNvIHNldHRpbmcgY2hpbGQgYmFjayB0byB0cnVlIHdpbGwgbm90IGhhdmUgYW55IGVmZmVjdC5cblx0XHRcdGNvbnRleHQgPSBjb250ZXh0IHx8IHt9O1xuXHRcdFx0Y29udGV4dC5saW5rID0gZmFsc2U7XG5cdFx0fVxuXHRcdGlmIChpdGVtVmFyID0gdGFnQ3R4LnByb3BzLml0ZW1WYXIpIHtcblx0XHRcdGlmIChpdGVtVmFyLmNoYXJBdCgwKSAhPT0gXCJ+XCIpIHtcblx0XHRcdFx0c3ludGF4RXJyb3IoXCJVc2UgaXRlbVZhcj0nfm15SXRlbSdcIik7XG5cdFx0XHR9XG5cdFx0XHRpdGVtVmFyID0gaXRlbVZhci5zbGljZSgxKTtcblx0XHR9XG5cdH1cblxuXHRpZiAodmlldykge1xuXHRcdG9uUmVuZGVyID0gb25SZW5kZXIgfHwgdmlldy5fLm9uUmVuZGVyO1xuXHRcdG5vTGlua2luZyA9IGNvbnRleHQgJiYgY29udGV4dC5saW5rID09PSBmYWxzZTtcblxuXHRcdGlmIChub0xpbmtpbmcgJiYgdmlldy5fLm5sKSB7XG5cdFx0XHRvblJlbmRlciA9IHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHRjb250ZXh0ID0gZXh0ZW5kQ3R4KGNvbnRleHQsIHZpZXcuY3R4KTtcblx0fVxuXG5cdGlmIChrZXkgPT09IHRydWUpIHtcblx0XHRzd2FwQ29udGVudCA9IHRydWU7XG5cdFx0a2V5ID0gMDtcblx0fVxuXG5cdC8vIElmIGxpbms9PT1mYWxzZSwgZG8gbm90IGNhbGwgb25SZW5kZXIsIHNvIG5vIGRhdGEtbGlua2luZyBtYXJrZXIgbm9kZXNcblx0aWYgKG9uUmVuZGVyICYmIHRhZyAmJiB0YWcuXy5ub1Z3cykge1xuXHRcdG9uUmVuZGVyID0gdW5kZWZpbmVkO1xuXHR9XG5cdG91dGVyT25SZW5kZXIgPSBvblJlbmRlcjtcblx0aWYgKG9uUmVuZGVyID09PSB0cnVlKSB7XG5cdFx0Ly8gVXNlZCBieSB2aWV3LnJlZnJlc2goKS4gRG9uJ3QgY3JlYXRlIGEgbmV3IHdyYXBwZXIgdmlldy5cblx0XHRvdXRlck9uUmVuZGVyID0gdW5kZWZpbmVkO1xuXHRcdG9uUmVuZGVyID0gdmlldy5fLm9uUmVuZGVyO1xuXHR9XG5cdC8vIFNldCBhZGRpdGlvbmFsIGNvbnRleHQgb24gdmlld3MgY3JlYXRlZCBoZXJlLCAoYXMgbW9kaWZpZWQgY29udGV4dCBpbmhlcml0ZWQgZnJvbSB0aGUgcGFyZW50LCBhbmQgdG8gYmUgaW5oZXJpdGVkIGJ5IGNoaWxkIHZpZXdzKVxuXHRjb250ZXh0ID0gdG1wbC5oZWxwZXJzXG5cdFx0PyBleHRlbmRDdHgodG1wbC5oZWxwZXJzLCBjb250ZXh0KVxuXHRcdDogY29udGV4dDtcblxuXHRuZXdDdHggPSBjb250ZXh0O1xuXHRpZiAoJGlzQXJyYXkoZGF0YSkgJiYgIW5vSXRlcmF0aW9uKSB7XG5cdFx0Ly8gQ3JlYXRlIGEgdmlldyBmb3IgdGhlIGFycmF5LCB3aG9zZSBjaGlsZCB2aWV3cyBjb3JyZXNwb25kIHRvIGVhY2ggZGF0YSBpdGVtLiAoTm90ZTogaWYga2V5IGFuZCB2aWV3IGFyZSBwYXNzZWQgaW5cblx0XHQvLyBhbG9uZyB3aXRoIHBhcmVudCB2aWV3LCB0cmVhdCBhcyBpbnNlcnQgLWUuZy4gZnJvbSB2aWV3LmFkZFZpZXdzIC0gc28gdmlldyBpcyBhbHJlYWR5IHRoZSB2aWV3IGl0ZW0gZm9yIGFycmF5KVxuXHRcdG5ld1ZpZXcgPSBzd2FwQ29udGVudFxuXHRcdFx0PyB2aWV3XG5cdFx0XHQ6IChrZXkgIT09IHVuZGVmaW5lZCAmJiB2aWV3KVxuXHRcdFx0XHR8fCBuZXcgVmlldyhjb250ZXh0LCBcImFycmF5XCIsIHZpZXcsIGRhdGEsIHRtcGwsIGtleSwgb25SZW5kZXIsIGNvbnRlbnRUbXBsKTtcblx0XHRuZXdWaWV3Ll8ubmw9IG5vTGlua2luZztcblx0XHRpZiAodmlldyAmJiB2aWV3Ll8udXNlS2V5KSB7XG5cdFx0XHQvLyBQYXJlbnQgaXMgbm90IGFuICdhcnJheSB2aWV3J1xuXHRcdFx0bmV3Vmlldy5fLmJuZCA9ICF0YWcgfHwgdGFnLl8uYm5kICYmIHRhZzsgLy8gRm9yIGFycmF5IHZpZXdzIHRoYXQgYXJlIGRhdGEgYm91bmQgZm9yIGNvbGxlY3Rpb24gY2hhbmdlIGV2ZW50cywgc2V0IHRoZVxuXHRcdFx0Ly8gdmlldy5fLmJuZCBwcm9wZXJ0eSB0byB0cnVlIGZvciB0b3AtbGV2ZWwgbGluaygpIG9yIGRhdGEtbGluaz1cIntmb3J9XCIsIG9yIHRvIHRoZSB0YWcgaW5zdGFuY2UgZm9yIGEgZGF0YS1ib3VuZCB0YWcsIGUuZy4ge157Zm9yIC4uLn19XG5cdFx0XHRuZXdWaWV3LnRhZyA9IHRhZztcblx0XHR9XG5cdFx0Zm9yIChpID0gMCwgbCA9IGRhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHQvLyBDcmVhdGUgYSB2aWV3IGZvciBlYWNoIGRhdGEgaXRlbS5cblx0XHRcdGlmIChpdGVtVmFyKSB7XG5cdFx0XHRcdHNldEl0ZW1WYXIoZGF0YVtpXSk7IC8vIHVzZSBtb2RpZmllZCBjdHggd2l0aCB1c2VyLW5hbWVkIH5pdGVtXG5cdFx0XHR9XG5cdFx0XHRjaGlsZFZpZXcgPSBuZXcgVmlldyhuZXdDdHgsIFwiaXRlbVwiLCBuZXdWaWV3LCBkYXRhW2ldLCB0bXBsLCAoa2V5IHx8IDApICsgaSwgb25SZW5kZXIsIG5ld1ZpZXcuY29udGVudCk7XG5cdFx0XHRjaGlsZFZpZXcuXy5pdCA9IGl0ZW1WYXI7XG5cblx0XHRcdGl0ZW1SZXN1bHQgPSB0bXBsLmZuKGRhdGFbaV0sIGNoaWxkVmlldywgJHN1Yik7XG5cdFx0XHRyZXN1bHQgKz0gbmV3Vmlldy5fLm9uUmVuZGVyID8gbmV3Vmlldy5fLm9uUmVuZGVyKGl0ZW1SZXN1bHQsIGNoaWxkVmlldykgOiBpdGVtUmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHQvLyBDcmVhdGUgYSB2aWV3IGZvciBzaW5nbGV0b24gZGF0YSBvYmplY3QuIFRoZSB0eXBlIG9mIHRoZSB2aWV3IHdpbGwgYmUgdGhlIHRhZyBuYW1lLCBlLmcuIFwiaWZcIiBvciBcIm15dGFnXCIgZXhjZXB0IGZvclxuXHRcdC8vIFwiaXRlbVwiLCBcImFycmF5XCIgYW5kIFwiZGF0YVwiIHZpZXdzLiBBIFwiZGF0YVwiIHZpZXcgaXMgZnJvbSBwcm9ncmFtbWF0aWMgcmVuZGVyKG9iamVjdCkgYWdhaW5zdCBhICdzaW5nbGV0b24nLlxuXHRcdGlmIChpdGVtVmFyKSB7XG5cdFx0XHRzZXRJdGVtVmFyKGRhdGEpO1xuXHRcdH1cblx0XHRuZXdWaWV3ID0gc3dhcENvbnRlbnQgPyB2aWV3IDogbmV3IFZpZXcobmV3Q3R4LCB0bXBsTmFtZSB8fCBcImRhdGFcIiwgdmlldywgZGF0YSwgdG1wbCwga2V5LCBvblJlbmRlciwgY29udGVudFRtcGwpO1xuXHRcdG5ld1ZpZXcuXy5pdCA9IGl0ZW1WYXI7XG5cdFx0bmV3Vmlldy50YWcgPSB0YWc7XG5cdFx0bmV3Vmlldy5fLm5sID0gbm9MaW5raW5nO1xuXHRcdHJlc3VsdCArPSB0bXBsLmZuKGRhdGEsIG5ld1ZpZXcsICRzdWIpO1xuXHR9XG5cdGlmICh0YWcpIHtcblx0XHRuZXdWaWV3LnRhZ0Vsc2UgPSB0YWdDdHguaW5kZXg7XG5cdFx0dGFnQ3R4LmNvbnRlbnRWaWV3ID0gbmV3Vmlldztcblx0fVxuXHRyZXR1cm4gb3V0ZXJPblJlbmRlciA/IG91dGVyT25SZW5kZXIocmVzdWx0LCBuZXdWaWV3KSA6IHJlc3VsdDtcbn1cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEJ1aWxkIGFuZCBjb21waWxlIHRlbXBsYXRlXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLyBHZW5lcmF0ZSBhIHJldXNhYmxlIGZ1bmN0aW9uIHRoYXQgd2lsbCBzZXJ2ZSB0byByZW5kZXIgYSB0ZW1wbGF0ZSBhZ2FpbnN0IGRhdGFcbi8vIChDb21waWxlIEFTVCB0aGVuIGJ1aWxkIHRlbXBsYXRlIGZ1bmN0aW9uKVxuXG5mdW5jdGlvbiBvblJlbmRlckVycm9yKGUsIHZpZXcsIGZhbGxiYWNrKSB7XG5cdHZhciBtZXNzYWdlID0gZmFsbGJhY2sgIT09IHVuZGVmaW5lZFxuXHRcdD8gJGlzRnVuY3Rpb24oZmFsbGJhY2spXG5cdFx0XHQ/IGZhbGxiYWNrLmNhbGwodmlldy5kYXRhLCBlLCB2aWV3KVxuXHRcdFx0OiBmYWxsYmFjayB8fCBcIlwiXG5cdFx0OiBcIntFcnJvcjogXCIgKyAoZS5tZXNzYWdlfHxlKSArIFwifVwiO1xuXG5cdGlmICgkc3ViU2V0dGluZ3Mub25FcnJvciAmJiAoZmFsbGJhY2sgPSAkc3ViU2V0dGluZ3Mub25FcnJvci5jYWxsKHZpZXcuZGF0YSwgZSwgZmFsbGJhY2sgJiYgbWVzc2FnZSwgdmlldykpICE9PSB1bmRlZmluZWQpIHtcblx0XHRtZXNzYWdlID0gZmFsbGJhY2s7IC8vIFRoZXJlIGlzIGEgc2V0dGluZ3MuZGVidWdNb2RlKGhhbmRsZXIpIG9uRXJyb3Igb3ZlcnJpZGUuIENhbGwgaXQsIGFuZCB1c2UgcmV0dXJuIHZhbHVlIChpZiBhbnkpIHRvIHJlcGxhY2UgbWVzc2FnZVxuXHR9XG5cblx0cmV0dXJuIHZpZXcgJiYgIXZpZXcubGlua0N0eCA/ICRjb252ZXJ0ZXJzLmh0bWwobWVzc2FnZSkgOiBtZXNzYWdlO1xufVxuXG5mdW5jdGlvbiBlcnJvcihtZXNzYWdlKSB7XG5cdHRocm93IG5ldyAkc3ViLkVycihtZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gc3ludGF4RXJyb3IobWVzc2FnZSkge1xuXHRlcnJvcihcIlN5bnRheCBlcnJvclxcblwiICsgbWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIHRtcGxGbihtYXJrdXAsIHRtcGwsIGlzTGlua0V4cHIsIGNvbnZlcnRCYWNrLCBoYXNFbHNlKSB7XG5cdC8vIENvbXBpbGUgbWFya3VwIHRvIEFTVCAoYWJ0cmFjdCBzeW50YXggdHJlZSkgdGhlbiBidWlsZCB0aGUgdGVtcGxhdGUgZnVuY3Rpb24gY29kZSBmcm9tIHRoZSBBU1Qgbm9kZXNcblx0Ly8gVXNlZCBmb3IgY29tcGlsaW5nIHRlbXBsYXRlcywgYW5kIGFsc28gYnkgSnNWaWV3cyB0byBidWlsZCBmdW5jdGlvbnMgZm9yIGRhdGEgbGluayBleHByZXNzaW9uc1xuXG5cdC8vPT09PSBuZXN0ZWQgZnVuY3Rpb25zID09PT1cblx0ZnVuY3Rpb24gcHVzaHByZWNlZGluZ0NvbnRlbnQoc2hpZnQpIHtcblx0XHRzaGlmdCAtPSBsb2M7XG5cdFx0aWYgKHNoaWZ0KSB7XG5cdFx0XHRjb250ZW50LnB1c2gobWFya3VwLnN1YnN0cihsb2MsIHNoaWZ0KS5yZXBsYWNlKHJOZXdMaW5lLCBcIlxcXFxuXCIpKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBibG9ja1RhZ0NoZWNrKHRhZ05hbWUsIGJsb2NrKSB7XG5cdFx0aWYgKHRhZ05hbWUpIHtcblx0XHRcdHRhZ05hbWUgKz0gJ319Jztcblx0XHRcdC8vXHRcdFx0J3t7aW5jbHVkZX19IGJsb2NrIGhhcyB7ey9mb3J9fSB3aXRoIG5vIG9wZW4ge3tmb3J9fSdcblx0XHRcdHN5bnRheEVycm9yKChcblx0XHRcdFx0YmxvY2tcblx0XHRcdFx0XHQ/ICd7eycgKyBibG9jayArICd9fSBibG9jayBoYXMge3svJyArIHRhZ05hbWUgKyAnIHdpdGhvdXQge3snICsgdGFnTmFtZVxuXHRcdFx0XHRcdDogJ1VubWF0Y2hlZCBvciBtaXNzaW5nIHt7LycgKyB0YWdOYW1lKSArICcsIGluIHRlbXBsYXRlOlxcbicgKyBtYXJrdXApO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHBhcnNlVGFnKGFsbCwgYmluZCwgdGFnTmFtZSwgY29udmVydGVyLCBjb2xvbiwgaHRtbCwgY29kZVRhZywgcGFyYW1zLCBzbGFzaCwgYmluZDIsIGNsb3NlQmxvY2ssIGluZGV4KSB7XG4vKlxuXG4gICAgIGJpbmQgICAgIHRhZ05hbWUgICAgICAgICBjdnQgICBjbG4gaHRtbCBjb2RlICAgIHBhcmFtcyAgICAgICAgICAgIHNsYXNoICAgYmluZDIgICAgICAgICBjbG9zZUJsayAgY29tbWVudFxuLyg/OnsoXFxeKT97KD86KFxcdysoPz1bXFwvXFxzfV0pKXwoXFx3Kyk/KDopfCg+KXwoXFwqKSlcXHMqKCg/OltefV18fSg/IX0pKSo/KShcXC8pP3x7KFxcXik/eyg/Oig/OlxcLyhcXHcrKSlcXHMqfCEtLVtcXHNcXFNdKj8tLSkpfX0vZ1xuXG4oPzpcbiAgeyhcXF4pP3sgICAgICAgICAgICBiaW5kXG4gICg/OlxuICAgIChcXHcrICAgICAgICAgICAgIHRhZ05hbWVcbiAgICAgICg/PVtcXC9cXHN9XSlcbiAgICApXG4gICAgfFxuICAgIChcXHcrKT8oOikgICAgICAgIGNvbnZlcnRlciBjb2xvblxuICAgIHxcbiAgICAoPikgICAgICAgICAgICAgIGh0bWxcbiAgICB8XG4gICAgKFxcKikgICAgICAgICAgICAgY29kZVRhZ1xuICApXG4gIFxccypcbiAgKCAgICAgICAgICAgICAgICAgIHBhcmFtc1xuICAgICg/OltefV18fSg/IX0pKSo/XG4gIClcbiAgKFxcLyk/ICAgICAgICAgICAgICBzbGFzaFxuICB8XG4gIHsoXFxeKT97ICAgICAgICAgICAgYmluZDJcbiAgKD86XG4gICAgKD86XFwvKFxcdyspKVxccyogICBjbG9zZUJsb2NrXG4gICAgfFxuICAgICEtLVtcXHNcXFNdKj8tLSAgICBjb21tZW50XG4gIClcbilcbn19L2dcblxuKi9cblx0XHRpZiAoY29kZVRhZyAmJiBiaW5kIHx8IHNsYXNoICYmICF0YWdOYW1lIHx8IHBhcmFtcyAmJiBwYXJhbXMuc2xpY2UoLTEpID09PSBcIjpcIiB8fCBiaW5kMikge1xuXHRcdFx0c3ludGF4RXJyb3IoYWxsKTtcblx0XHR9XG5cblx0XHQvLyBCdWlsZCBhYnN0cmFjdCBzeW50YXggdHJlZSAoQVNUKTogW3RhZ05hbWUsIGNvbnZlcnRlciwgcGFyYW1zLCBjb250ZW50LCBoYXNoLCBiaW5kaW5ncywgY29udGVudE1hcmt1cF1cblx0XHRpZiAoaHRtbCkge1xuXHRcdFx0Y29sb24gPSBcIjpcIjtcblx0XHRcdGNvbnZlcnRlciA9IEhUTUw7XG5cdFx0fVxuXHRcdHNsYXNoID0gc2xhc2ggfHwgaXNMaW5rRXhwciAmJiAhaGFzRWxzZTtcblxuXHRcdHZhciBsYXRlLCBvcGVuVGFnTmFtZSwgaXNMYXRlT2IsXG5cdFx0XHRwYXRoQmluZGluZ3MgPSAoYmluZCB8fCBpc0xpbmtFeHByKSAmJiBbW11dLCAvLyBwYXRoQmluZGluZ3MgaXMgYW4gYXJyYXkgb2YgYXJyYXlzIGZvciBhcmcgYmluZGluZ3MgYW5kIGEgaGFzaCBvZiBhcnJheXMgZm9yIHByb3AgYmluZGluZ3Ncblx0XHRcdHByb3BzID0gXCJcIixcblx0XHRcdGFyZ3MgPSBcIlwiLFxuXHRcdFx0Y3R4UHJvcHMgPSBcIlwiLFxuXHRcdFx0cGFyYW1zQXJncyA9IFwiXCIsXG5cdFx0XHRwYXJhbXNQcm9wcyA9IFwiXCIsXG5cdFx0XHRwYXJhbXNDdHhQcm9wcyA9IFwiXCIsXG5cdFx0XHRvbkVycm9yID0gXCJcIixcblx0XHRcdHVzZVRyaWdnZXIgPSBcIlwiLFxuXHRcdFx0Ly8gQmxvY2sgdGFnIGlmIG5vdCBzZWxmLWNsb3NpbmcgYW5kIG5vdCB7ezp9fSBvciB7ez59fSAoc3BlY2lhbCBjYXNlKSBhbmQgbm90IGEgZGF0YS1saW5rIGV4cHJlc3Npb25cblx0XHRcdGJsb2NrID0gIXNsYXNoICYmICFjb2xvbjtcblxuXHRcdC8vPT09PSBuZXN0ZWQgaGVscGVyIGZ1bmN0aW9uID09PT1cblx0XHR0YWdOYW1lID0gdGFnTmFtZSB8fCAocGFyYW1zID0gcGFyYW1zIHx8IFwiI2RhdGFcIiwgY29sb24pOyAvLyB7ezp9fSBpcyBlcXVpdmFsZW50IHRvIHt7OiNkYXRhfX1cblx0XHRwdXNocHJlY2VkaW5nQ29udGVudChpbmRleCk7XG5cdFx0bG9jID0gaW5kZXggKyBhbGwubGVuZ3RoOyAvLyBsb2NhdGlvbiBtYXJrZXIgLSBwYXJzZWQgdXAgdG8gaGVyZVxuXHRcdGlmIChjb2RlVGFnKSB7XG5cdFx0XHRpZiAoYWxsb3dDb2RlKSB7XG5cdFx0XHRcdGNvbnRlbnQucHVzaChbXCIqXCIsIFwiXFxuXCIgKyBwYXJhbXMucmVwbGFjZSgvXjovLCBcInJldCs9IFwiKS5yZXBsYWNlKHJVbmVzY2FwZVF1b3RlcywgXCIkMVwiKSArIFwiO1xcblwiXSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0YWdOYW1lKSB7XG5cdFx0XHRpZiAodGFnTmFtZSA9PT0gXCJlbHNlXCIpIHtcblx0XHRcdFx0aWYgKHJUZXN0RWxzZUlmLnRlc3QocGFyYW1zKSkge1xuXHRcdFx0XHRcdHN5bnRheEVycm9yKCdGb3IgXCJ7e2Vsc2UgaWYgZXhwcn19XCIgdXNlIFwie3tlbHNlIGV4cHJ9fVwiJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cGF0aEJpbmRpbmdzID0gY3VycmVudFs5XSAmJiBbW11dO1xuXHRcdFx0XHRjdXJyZW50WzEwXSA9IG1hcmt1cC5zdWJzdHJpbmcoY3VycmVudFsxMF0sIGluZGV4KTsgLy8gY29udGVudE1hcmt1cCBmb3IgYmxvY2sgdGFnXG5cdFx0XHRcdG9wZW5UYWdOYW1lID0gY3VycmVudFsxMV0gfHwgY3VycmVudFswXSB8fCBzeW50YXhFcnJvcihcIk1pc21hdGNoZWQ6IFwiICsgYWxsKTtcblx0XHRcdFx0Ly8gY3VycmVudFswXSBpcyB0YWdOYW1lLCBidXQgZm9yIHt7ZWxzZX19IG5vZGVzLCBjdXJyZW50WzExXSBpcyB0YWdOYW1lIG9mIHByZWNlZGluZyBvcGVuIHRhZ1xuXHRcdFx0XHRjdXJyZW50ID0gc3RhY2sucG9wKCk7XG5cdFx0XHRcdGNvbnRlbnQgPSBjdXJyZW50WzJdO1xuXHRcdFx0XHRibG9jayA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRpZiAocGFyYW1zKSB7XG5cdFx0XHRcdC8vIHJlbW92ZSBuZXdsaW5lcyBmcm9tIHRoZSBwYXJhbXMgc3RyaW5nLCB0byBhdm9pZCBjb21waWxlZCBjb2RlIGVycm9ycyBmb3IgdW50ZXJtaW5hdGVkIHN0cmluZ3Ncblx0XHRcdFx0cGFyc2VQYXJhbXMocGFyYW1zLnJlcGxhY2Uock5ld0xpbmUsIFwiIFwiKSwgcGF0aEJpbmRpbmdzLCB0bXBsLCBpc0xpbmtFeHByKVxuXHRcdFx0XHRcdC5yZXBsYWNlKHJCdWlsZEhhc2gsIGZ1bmN0aW9uKGFsbCwgb25lcnJvciwgaXNDdHhQcm0sIGtleSwga2V5VG9rZW4sIGtleVZhbHVlLCBhcmcsIHBhcmFtKSB7XG5cdFx0XHRcdFx0XHRpZiAoa2V5ID09PSBcInRoaXM6XCIpIHtcblx0XHRcdFx0XHRcdFx0a2V5VmFsdWUgPSBcInVuZGVmaW5lZFwiOyAvLyB0aGlzPXNvbWUucGF0aCBpcyBhbHdheXMgYSB0byBwYXJhbWV0ZXIgKG9uZS13YXkpLCBzbyBkb24ndCBuZWVkIHRvIGNvbXBpbGUvZXZhbHVhdGUgc29tZS5wYXRoIGluaXRpYWxpemF0aW9uXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAocGFyYW0pIHtcblx0XHRcdFx0XHRcdFx0aXNMYXRlT2IgPSBpc0xhdGVPYiB8fCBwYXJhbS5jaGFyQXQoMCkgPT09IFwiQFwiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0a2V5ID0gXCInXCIgKyBrZXlUb2tlbiArIFwiJzpcIjtcblx0XHRcdFx0XHRcdGlmIChhcmcpIHtcblx0XHRcdFx0XHRcdFx0YXJncyArPSBpc0N0eFBybSArIGtleVZhbHVlICsgXCIsXCI7XG5cdFx0XHRcdFx0XHRcdHBhcmFtc0FyZ3MgKz0gXCInXCIgKyBwYXJhbSArIFwiJyxcIjtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoaXNDdHhQcm0pIHsgLy8gQ29udGV4dHVhbCBwYXJhbWV0ZXIsIH5mb289ZXhwclxuXHRcdFx0XHRcdFx0XHRjdHhQcm9wcyArPSBrZXkgKyAnai5fY3AoJyArIGtleVZhbHVlICsgJyxcIicgKyBwYXJhbSArICdcIix2aWV3KSwnO1xuXHRcdFx0XHRcdFx0XHQvLyBDb21waWxlZCBjb2RlIGZvciBldmFsdWF0aW5nIHRhZ0N0eCBvbiBhIHRhZyB3aWxsIGhhdmU6IGN0eDp7J2Zvbyc6ai5fY3AoY29tcGlsZWRFeHByLCBcImV4cHJcIiwgdmlldyl9XG5cdFx0XHRcdFx0XHRcdHBhcmFtc0N0eFByb3BzICs9IGtleSArIFwiJ1wiICsgcGFyYW0gKyBcIicsXCI7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG9uZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0b25FcnJvciArPSBrZXlWYWx1ZTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGlmIChrZXlUb2tlbiA9PT0gXCJ0cmlnZ2VyXCIpIHtcblx0XHRcdFx0XHRcdFx0XHR1c2VUcmlnZ2VyICs9IGtleVZhbHVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmIChrZXlUb2tlbiA9PT0gXCJsYXRlUmVuZGVyXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRsYXRlID0gcGFyYW0gIT09IFwiZmFsc2VcIjsgLy8gUmVuZGVyIGFmdGVyIGZpcnN0IHBhc3Ncblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRwcm9wcyArPSBrZXkgKyBrZXlWYWx1ZSArIFwiLFwiO1xuXHRcdFx0XHRcdFx0XHRwYXJhbXNQcm9wcyArPSBrZXkgKyBcIidcIiArIHBhcmFtICsgXCInLFwiO1xuXHRcdFx0XHRcdFx0XHRoYXNIYW5kbGVycyA9IGhhc0hhbmRsZXJzIHx8IHJIYXNIYW5kbGVycy50ZXN0KGtleVRva2VuKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBcIlwiO1xuXHRcdFx0XHRcdH0pLnNsaWNlKDAsIC0xKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHBhdGhCaW5kaW5ncyAmJiBwYXRoQmluZGluZ3NbMF0pIHtcblx0XHRcdFx0cGF0aEJpbmRpbmdzLnBvcCgpOyAvLyBSZW1vdmUgdGhlIGJpbmRpbmcgdGhhdCB3YXMgcHJlcGFyZWQgZm9yIG5leHQgYXJnLiAoVGhlcmUgaXMgYWx3YXlzIGFuIGV4dHJhIG9uZSByZWFkeSkuXG5cdFx0XHR9XG5cblx0XHRcdG5ld05vZGUgPSBbXG5cdFx0XHRcdFx0dGFnTmFtZSxcblx0XHRcdFx0XHRjb252ZXJ0ZXIgfHwgISFjb252ZXJ0QmFjayB8fCBoYXNIYW5kbGVycyB8fCBcIlwiLFxuXHRcdFx0XHRcdGJsb2NrICYmIFtdLFxuXHRcdFx0XHRcdHBhcnNlZFBhcmFtKHBhcmFtc0FyZ3MgfHwgKHRhZ05hbWUgPT09IFwiOlwiID8gXCInI2RhdGEnLFwiIDogXCJcIiksIHBhcmFtc1Byb3BzLCBwYXJhbXNDdHhQcm9wcyksIC8vIHt7On19IGVxdWl2YWxlbnQgdG8ge3s6I2RhdGF9fVxuXHRcdFx0XHRcdHBhcnNlZFBhcmFtKGFyZ3MgfHwgKHRhZ05hbWUgPT09IFwiOlwiID8gXCJkYXRhLFwiIDogXCJcIiksIHByb3BzLCBjdHhQcm9wcyksXG5cdFx0XHRcdFx0b25FcnJvcixcblx0XHRcdFx0XHR1c2VUcmlnZ2VyLFxuXHRcdFx0XHRcdGxhdGUsXG5cdFx0XHRcdFx0aXNMYXRlT2IsXG5cdFx0XHRcdFx0cGF0aEJpbmRpbmdzIHx8IDBcblx0XHRcdFx0XTtcblx0XHRcdGNvbnRlbnQucHVzaChuZXdOb2RlKTtcblx0XHRcdGlmIChibG9jaykge1xuXHRcdFx0XHRzdGFjay5wdXNoKGN1cnJlbnQpO1xuXHRcdFx0XHRjdXJyZW50ID0gbmV3Tm9kZTtcblx0XHRcdFx0Y3VycmVudFsxMF0gPSBsb2M7IC8vIFN0b3JlIGN1cnJlbnQgbG9jYXRpb24gb2Ygb3BlbiB0YWcsIHRvIGJlIGFibGUgdG8gYWRkIGNvbnRlbnRNYXJrdXAgd2hlbiB3ZSByZWFjaCBjbG9zaW5nIHRhZ1xuXHRcdFx0XHRjdXJyZW50WzExXSA9IG9wZW5UYWdOYW1lOyAvLyBVc2VkIGZvciBjaGVja2luZyBzeW50YXggKG1hdGNoaW5nIGNsb3NlIHRhZylcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGNsb3NlQmxvY2spIHtcblx0XHRcdGJsb2NrVGFnQ2hlY2soY2xvc2VCbG9jayAhPT0gY3VycmVudFswXSAmJiBjbG9zZUJsb2NrICE9PSBjdXJyZW50WzExXSAmJiBjbG9zZUJsb2NrLCBjdXJyZW50WzBdKTsgLy8gQ2hlY2sgbWF0Y2hpbmcgY2xvc2UgdGFnIG5hbWVcblx0XHRcdGN1cnJlbnRbMTBdID0gbWFya3VwLnN1YnN0cmluZyhjdXJyZW50WzEwXSwgaW5kZXgpOyAvLyBjb250ZW50TWFya3VwIGZvciBibG9jayB0YWdcblx0XHRcdGN1cnJlbnQgPSBzdGFjay5wb3AoKTtcblx0XHR9XG5cdFx0YmxvY2tUYWdDaGVjayghY3VycmVudCAmJiBjbG9zZUJsb2NrKTtcblx0XHRjb250ZW50ID0gY3VycmVudFsyXTtcblx0fVxuXHQvLz09PT0gL2VuZCBvZiBuZXN0ZWQgZnVuY3Rpb25zID09PT1cblxuXHR2YXIgaSwgcmVzdWx0LCBuZXdOb2RlLCBoYXNIYW5kbGVycywgYmluZGluZ3MsXG5cdFx0YWxsb3dDb2RlID0gJHN1YlNldHRpbmdzLmFsbG93Q29kZSB8fCB0bXBsICYmIHRtcGwuYWxsb3dDb2RlXG5cdFx0XHR8fCAkdmlld3NTZXR0aW5ncy5hbGxvd0NvZGUgPT09IHRydWUsIC8vIGluY2x1ZGUgZGlyZWN0IHNldHRpbmcgb2Ygc2V0dGluZ3MuYWxsb3dDb2RlIHRydWUgZm9yIGJhY2t3YXJkIGNvbXBhdCBvbmx5XG5cdFx0YXN0VG9wID0gW10sXG5cdFx0bG9jID0gMCxcblx0XHRzdGFjayA9IFtdLFxuXHRcdGNvbnRlbnQgPSBhc3RUb3AsXG5cdFx0Y3VycmVudCA9IFssLGFzdFRvcF07XG5cblx0aWYgKGFsbG93Q29kZSAmJiB0bXBsLl9pcykge1xuXHRcdHRtcGwuYWxsb3dDb2RlID0gYWxsb3dDb2RlO1xuXHR9XG5cbi8vVE9ET1x0cmVzdWx0ID0gdG1wbEZuc0NhY2hlW21hcmt1cF07IC8vIE9ubHkgY2FjaGUgaWYgdGVtcGxhdGUgaXMgbm90IG5hbWVkIGFuZCBtYXJrdXAgbGVuZ3RoIDwgLi4uLFxuLy9hbmQgdGhlcmUgYXJlIG5vIGJpbmRpbmdzIG9yIHN1YnRlbXBsYXRlcz8/IENvbnNpZGVyIHN0YW5kYXJkIG9wdGltaXphdGlvbiBmb3IgZGF0YS1saW5rPVwiYS5iLmNcIlxuLy9cdFx0aWYgKHJlc3VsdCkge1xuLy9cdFx0XHR0bXBsLmZuID0gcmVzdWx0O1xuLy9cdFx0fSBlbHNlIHtcblxuLy9cdFx0cmVzdWx0ID0gbWFya3VwO1xuXHRpZiAoaXNMaW5rRXhwcikge1xuXHRcdGlmIChjb252ZXJ0QmFjayAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRtYXJrdXAgPSBtYXJrdXAuc2xpY2UoMCwgLWNvbnZlcnRCYWNrLmxlbmd0aCAtIDIpICsgZGVsaW1DbG9zZUNoYXIwO1xuXHRcdH1cblx0XHRtYXJrdXAgPSBkZWxpbU9wZW5DaGFyMCArIG1hcmt1cCArIGRlbGltQ2xvc2VDaGFyMTtcblx0fVxuXG5cdGJsb2NrVGFnQ2hlY2soc3RhY2tbMF0gJiYgc3RhY2tbMF1bMl0ucG9wKClbMF0pO1xuXHQvLyBCdWlsZCB0aGUgQVNUIChhYnN0cmFjdCBzeW50YXggdHJlZSkgdW5kZXIgYXN0VG9wXG5cdG1hcmt1cC5yZXBsYWNlKHJUYWcsIHBhcnNlVGFnKTtcblxuXHRwdXNocHJlY2VkaW5nQ29udGVudChtYXJrdXAubGVuZ3RoKTtcblxuXHRpZiAobG9jID0gYXN0VG9wW2FzdFRvcC5sZW5ndGggLSAxXSkge1xuXHRcdGJsb2NrVGFnQ2hlY2soXCJcIiArIGxvYyAhPT0gbG9jICYmICgrbG9jWzEwXSA9PT0gbG9jWzEwXSkgJiYgbG9jWzBdKTtcblx0fVxuLy9cdFx0XHRyZXN1bHQgPSB0bXBsRm5zQ2FjaGVbbWFya3VwXSA9IGJ1aWxkQ29kZShhc3RUb3AsIHRtcGwpO1xuLy9cdFx0fVxuXG5cdGlmIChpc0xpbmtFeHByKSB7XG5cdFx0cmVzdWx0ID0gYnVpbGRDb2RlKGFzdFRvcCwgbWFya3VwLCBpc0xpbmtFeHByKTtcblx0XHRiaW5kaW5ncyA9IFtdO1xuXHRcdGkgPSBhc3RUb3AubGVuZ3RoO1xuXHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdGJpbmRpbmdzLnVuc2hpZnQoYXN0VG9wW2ldWzldKTsgLy8gV2l0aCBkYXRhLWxpbmsgZXhwcmVzc2lvbnMsIHBhdGhCaW5kaW5ncyBhcnJheSBmb3IgdGFnQ3R4W2ldIGlzIGFzdFRvcFtpXVs5XVxuXHRcdH1cblx0XHRzZXRQYXRocyhyZXN1bHQsIGJpbmRpbmdzKTtcblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSBidWlsZENvZGUoYXN0VG9wLCB0bXBsKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBzZXRQYXRocyhmbiwgcGF0aHNBcnIpIHtcblx0dmFyIGtleSwgcGF0aHMsXG5cdFx0aSA9IDAsXG5cdFx0bCA9IHBhdGhzQXJyLmxlbmd0aDtcblx0Zm4uZGVwcyA9IFtdO1xuXHRmbi5wYXRocyA9IFtdOyAvLyBUaGUgYXJyYXkgb2YgcGF0aCBiaW5kaW5nIChhcnJheS9kaWN0aW9uYXJ5KXMgZm9yIGVhY2ggdGFnL2Vsc2UgYmxvY2sncyBhcmdzIGFuZCBwcm9wc1xuXHRmb3IgKDsgaSA8IGw7IGkrKykge1xuXHRcdGZuLnBhdGhzLnB1c2gocGF0aHMgPSBwYXRoc0FycltpXSk7XG5cdFx0Zm9yIChrZXkgaW4gcGF0aHMpIHtcblx0XHRcdGlmIChrZXkgIT09IFwiX2pzdnRvXCIgJiYgcGF0aHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwYXRoc1trZXldLmxlbmd0aCAmJiAhcGF0aHNba2V5XS5za3ApIHtcblx0XHRcdFx0Zm4uZGVwcyA9IGZuLmRlcHMuY29uY2F0KHBhdGhzW2tleV0pOyAvLyBkZXBzIGlzIHRoZSBjb25jYXRlbmF0aW9uIG9mIHRoZSBwYXRocyBhcnJheXMgZm9yIHRoZSBkaWZmZXJlbnQgYmluZGluZ3Ncblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gcGFyc2VkUGFyYW0oYXJncywgcHJvcHMsIGN0eCkge1xuXHRyZXR1cm4gW2FyZ3Muc2xpY2UoMCwgLTEpLCBwcm9wcy5zbGljZSgwLCAtMSksIGN0eC5zbGljZSgwLCAtMSldO1xufVxuXG5mdW5jdGlvbiBwYXJhbVN0cnVjdHVyZShwYXJ0cywgdHlwZSkge1xuXHRyZXR1cm4gJ1xcblxcdCdcblx0XHQrICh0eXBlXG5cdFx0XHQ/IHR5cGUgKyAnOnsnXG5cdFx0XHQ6ICcnKVxuXHRcdCsgJ2FyZ3M6WycgKyBwYXJ0c1swXSArICddLFxcblxcdHByb3BzOnsnICsgcGFydHNbMV0gKyAnfSdcblx0XHQrIChwYXJ0c1syXSA/ICcsXFxuXFx0Y3R4OnsnICsgcGFydHNbMl0gKyAnfScgOiBcIlwiKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VQYXJhbXMocGFyYW1zLCBwYXRoQmluZGluZ3MsIHRtcGwsIGlzTGlua0V4cHIpIHtcblxuXHRmdW5jdGlvbiBwYXJzZVRva2VucyhhbGwsIGxmdFBybjAsIGxmdFBybiwgYm91bmQsIHBhdGgsIG9wZXJhdG9yLCBlcnIsIGVxLCBwYXRoMiwgbGF0ZSwgcHJuLCBjb21tYSwgbGZ0UHJuMiwgYXBvcywgcXVvdCwgcnRQcm4sIHJ0UHJuRG90LCBwcm4yLCBzcGFjZSwgaW5kZXgsIGZ1bGwpIHtcblx0Ly8gLyhcXCgpKD89XFxzKlxcKCl8KD86KFsoW10pXFxzKik/KD86KFxcXj8pKH4/W1xcdyQuXl0rKT9cXHMqKChcXCtcXCt8LS0pfFxcK3wtfCYmfFxcfFxcfHw9PT18IT09fD09fCE9fDw9fD49fFs8PiUqOj9cXC9dfCg9KSlcXHMqfCghKj8oQCk/WyN+XT9bXFx3JC5eXSspKFsoW10pPyl8KCxcXHMqKXwoXFwoPylcXFxcPyg/OignKXwoXCIpKXwoPzpcXHMqKChbKVxcXV0pKD89Wy5eXXxcXHMqJHxbXihbXSl8WylcXF1dKShbKFtdPykpfChcXHMrKS9nLFxuXHQvLyAgbGZ0UHJuMCAgICAgICAgICBsZnRQcm4gICAgICAgIGJvdW5kIHBhdGggICAgICAgICAgICAgb3BlcmF0b3IgZXJyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcSAgICAgIHBhdGgyIGxhdGUgICAgICAgICAgICBwcm4gICAgICBjb21tYSAgbGZ0UHJuMiAgIGFwb3MgcXVvdCAgICAgICAgcnRQcm4gIHJ0UHJuRG90ICAgICAgICAgICAgICAgICAgcHJuMiAgICAgc3BhY2Vcblx0XHQvLyAobGVmdCBwYXJlbj8gZm9sbG93ZWQgYnkgKHBhdGg/IGZvbGxvd2VkIGJ5IG9wZXJhdG9yKSBvciAocGF0aCBmb2xsb3dlZCBieSBwYXJlbj8pKSBvciBjb21tYSBvciBhcG9zIG9yIHF1b3Qgb3IgcmlnaHQgcGFyZW4gb3Igc3BhY2Vcblx0XHRmdW5jdGlvbiBwYXJzZVBhdGgoYWxsUGF0aCwgbm90LCBvYmplY3QsIGhlbHBlciwgdmlldywgdmlld1Byb3BlcnR5LCBwYXRoVG9rZW5zLCBsZWFmVG9rZW4pIHtcblx0XHRcdC8vclBhdGggPSAvXighKj8pKD86bnVsbHx0cnVlfGZhbHNlfFxcZFtcXGQuXSp8KFtcXHckXSt8XFwufH4oW1xcdyRdKyl8Iyh2aWV3fChbXFx3JF0rKSk/KShbXFx3JC5eXSo/KSg/OlsuW15dKFtcXHckXSspXFxdPyk/KSQvZyxcblx0XHRcdC8vICAgICAgICAgIG5vdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgICAgIGhlbHBlciAgICB2aWV3ICB2aWV3UHJvcGVydHkgcGF0aFRva2VucyAgICAgIGxlYWZUb2tlblxuXHRcdFx0dmFyIHN1YlBhdGggPSBvYmplY3QgPT09IFwiLlwiO1xuXHRcdFx0aWYgKG9iamVjdCkge1xuXHRcdFx0XHRwYXRoID0gcGF0aC5zbGljZShub3QubGVuZ3RoKTtcblx0XHRcdFx0aWYgKC9eXFwuP2NvbnN0cnVjdG9yJC8udGVzdChsZWFmVG9rZW58fHBhdGgpKSB7XG5cdFx0XHRcdFx0c3ludGF4RXJyb3IoYWxsUGF0aCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFzdWJQYXRoKSB7XG5cdFx0XHRcdFx0YWxsUGF0aCA9IChsYXRlIC8vIGxhdGUgcGF0aCBAYS5iLmM6IG5vdCB0aHJvdyBvbiAncHJvcGVydHkgb2YgdW5kZWZpbmVkJyBpZiBhIHVuZGVmaW5lZCwgYW5kIHdpbGwgdXNlIGdldE9iKCkgYWZ0ZXIgbGlua2luZyB0byByZXNvbHZlIGxhdGUuXG5cdFx0XHRcdFx0XHRcdD8gKGlzTGlua0V4cHIgPyAnJyA6ICcobHRPYi5sdD1sdE9iLmx0fHwnKSArICcob2I9J1xuXHRcdFx0XHRcdFx0XHQ6IFwiXCJcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCsgKGhlbHBlclxuXHRcdFx0XHRcdFx0XHQ/ICd2aWV3LmN0eFBybShcIicgKyBoZWxwZXIgKyAnXCIpJ1xuXHRcdFx0XHRcdFx0XHQ6IHZpZXdcblx0XHRcdFx0XHRcdFx0XHQ/IFwidmlld1wiXG5cdFx0XHRcdFx0XHRcdFx0OiBcImRhdGFcIilcblx0XHRcdFx0XHRcdCsgKGxhdGVcblx0XHRcdFx0XHRcdFx0PyAnKT09PXVuZGVmaW5lZCcgKyAoaXNMaW5rRXhwciA/ICcnIDogJyknKSArICc/XCJcIjp2aWV3LmdldE9iKG9iLFwiJ1xuXHRcdFx0XHRcdFx0XHQ6IFwiXCJcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCsgKGxlYWZUb2tlblxuXHRcdFx0XHRcdFx0XHQ/ICh2aWV3UHJvcGVydHlcblx0XHRcdFx0XHRcdFx0XHQ/IFwiLlwiICsgdmlld1Byb3BlcnR5XG5cdFx0XHRcdFx0XHRcdFx0OiBoZWxwZXJcblx0XHRcdFx0XHRcdFx0XHRcdD8gXCJcIlxuXHRcdFx0XHRcdFx0XHRcdFx0OiAodmlldyA/IFwiXCIgOiBcIi5cIiArIG9iamVjdClcblx0XHRcdFx0XHRcdFx0XHQpICsgKHBhdGhUb2tlbnMgfHwgXCJcIilcblx0XHRcdFx0XHRcdFx0OiAobGVhZlRva2VuID0gaGVscGVyID8gXCJcIiA6IHZpZXcgPyB2aWV3UHJvcGVydHkgfHwgXCJcIiA6IG9iamVjdCwgXCJcIikpO1xuXHRcdFx0XHRcdGFsbFBhdGggPSBhbGxQYXRoICsgKGxlYWZUb2tlbiA/IFwiLlwiICsgbGVhZlRva2VuIDogXCJcIik7XG5cblx0XHRcdFx0XHRhbGxQYXRoID0gbm90ICsgKGFsbFBhdGguc2xpY2UoMCwgOSkgPT09IFwidmlldy5kYXRhXCJcblx0XHRcdFx0XHRcdD8gYWxsUGF0aC5zbGljZSg1KSAvLyBjb252ZXJ0ICN2aWV3LmRhdGEuLi4gdG8gZGF0YS4uLlxuXHRcdFx0XHRcdFx0OiBhbGxQYXRoKVxuXHRcdFx0XHRcdCsgKGxhdGVcblx0XHRcdFx0XHRcdFx0PyAoaXNMaW5rRXhwciA/ICdcIic6ICdcIixsdE9iJykgKyAocHJuID8gJywxKSc6JyknKVxuXHRcdFx0XHRcdFx0XHQ6IFwiXCJcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGJpbmRpbmdzKSB7XG5cdFx0XHRcdFx0YmluZHMgPSBuYW1lZCA9PT0gXCJfbGlua1RvXCIgPyAoYmluZHRvID0gcGF0aEJpbmRpbmdzLl9qc3Z0byA9IHBhdGhCaW5kaW5ncy5fanN2dG8gfHwgW10pIDogYm5kQ3R4LmJkO1xuXHRcdFx0XHRcdGlmICh0aGVPYiA9IHN1YlBhdGggJiYgYmluZHNbYmluZHMubGVuZ3RoLTFdKSB7XG5cdFx0XHRcdFx0XHRpZiAodGhlT2IuX2NwZm4pIHsgLy8gQ29tcHV0ZWQgcHJvcGVydHkgZXhwck9iXG5cdFx0XHRcdFx0XHRcdHdoaWxlICh0aGVPYi5zYikge1xuXHRcdFx0XHRcdFx0XHRcdHRoZU9iID0gdGhlT2Iuc2I7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKHRoZU9iLmJuZCkge1xuXHRcdFx0XHRcdFx0XHRcdHBhdGggPSBcIl5cIiArIHBhdGguc2xpY2UoMSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dGhlT2Iuc2IgPSBwYXRoO1xuXHRcdFx0XHRcdFx0XHR0aGVPYi5ibmQgPSB0aGVPYi5ibmQgfHwgcGF0aC5jaGFyQXQoMCkgPT09IFwiXlwiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRiaW5kcy5wdXNoKHBhdGgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwYXRoU3RhcnRbcGFyZW5EZXB0aF0gPSBpbmRleCArIChzdWJQYXRoID8gMSA6IDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYWxsUGF0aDtcblx0XHR9XG5cblx0XHQvL2JvdW5kID0gYmluZGluZ3MgJiYgYm91bmQ7XG5cdFx0aWYgKGJvdW5kICYmICFlcSkge1xuXHRcdFx0cGF0aCA9IGJvdW5kICsgcGF0aDsgLy8gZS5nLiBzb21lLmZuKC4uLilec29tZS5wYXRoIC0gc28gaGVyZSBwYXRoIGlzIFwiXnNvbWUucGF0aFwiXG5cdFx0fVxuXHRcdG9wZXJhdG9yID0gb3BlcmF0b3IgfHwgXCJcIjtcblx0XHRsZnRQcm4gPSBsZnRQcm4gfHwgbGZ0UHJuMCB8fCBsZnRQcm4yO1xuXHRcdHBhdGggPSBwYXRoIHx8IHBhdGgyO1xuXG5cdFx0aWYgKGxhdGUgJiYgKGxhdGUgPSAhL1xcKXxdLy50ZXN0KGZ1bGwuY2hhckF0KGluZGV4LTEpKSkpIHtcblx0XHRcdHBhdGggPSBwYXRoLnNsaWNlKDEpLnNwbGl0KFwiLlwiKS5qb2luKFwiXlwiKTsgLy8gTGF0ZSBwYXRoIEB6LmIuYy4gVXNlIFwiXlwiIHJhdGhlciB0aGFuIFwiLlwiIHRvIGVuc3VyZSB0aGF0IGRlZXAgYmluZGluZyB3aWxsIGJlIHVzZWRcblx0XHR9XG5cdFx0Ly8gQ291bGQgZG8gdGhpcyAtIGJ1dCBub3Qgd29ydGggcGVyZiBjb3N0Pz8gOi1cblx0XHQvLyBpZiAoIXBhdGgubGFzdEluZGV4T2YoXCIjZGF0YS5cIiwgMCkpIHsgcGF0aCA9IHBhdGguc2xpY2UoNik7IH0gLy8gSWYgcGF0aCBzdGFydHMgd2l0aCBcIiNkYXRhLlwiLCByZW1vdmUgdGhhdC5cblx0XHRwcm4gPSBwcm4gfHwgcHJuMiB8fCBcIlwiO1xuXG5cdFx0dmFyIGV4cHIsIGV4cHJGbiwgYmluZHMsIHRoZU9iLCBuZXdPYixcblx0XHRcdHJ0U3EgPSBcIilcIjtcblxuXHRcdGlmIChwcm4gPT09IFwiW1wiKSB7XG5cdFx0XHRwcm4gPSBcIltqLl9zcShcIjtcblx0XHRcdHJ0U3EgPSBcIildXCI7XG5cdFx0fVxuXG5cdFx0aWYgKGVyciAmJiAhYXBvc2VkICYmICFxdW90ZWQpIHtcblx0XHRcdHN5bnRheEVycm9yKHBhcmFtcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChiaW5kaW5ncyAmJiBydFBybkRvdCAmJiAhYXBvc2VkICYmICFxdW90ZWQpIHtcblx0XHRcdFx0Ly8gVGhpcyBpcyBhIGJpbmRpbmcgdG8gYSBwYXRoIGluIHdoaWNoIGFuIG9iamVjdCBpcyByZXR1cm5lZCBieSBhIGhlbHBlci9kYXRhIGZ1bmN0aW9uL2V4cHJlc3Npb24sIGUuZy4gZm9vKCleeC55IG9yIChhP2I6YyleeC55XG5cdFx0XHRcdC8vIFdlIGNyZWF0ZSBhIGNvbXBpbGVkIGZ1bmN0aW9uIHRvIGdldCB0aGUgb2JqZWN0IGluc3RhbmNlICh3aGljaCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBkZXBlbmRlbnQgZGF0YSBvZiB0aGUgc3ViZXhwcmVzc2lvbiBjaGFuZ2VzLCB0byByZXR1cm4gdGhlIG5ldyBvYmplY3QsIGFuZCB0cmlnZ2VyIHJlLWJpbmRpbmcgb2YgdGhlIHN1YnNlcXVlbnQgcGF0aClcblx0XHRcdFx0aWYgKHBhcmVuRGVwdGggJiYgKCFuYW1lZCB8fCBib3VuZE5hbWUgfHwgYmluZHRvKSkge1xuXHRcdFx0XHRcdGV4cHIgPSBwYXRoU3RhcnRbcGFyZW5EZXB0aCAtIDFdO1xuXHRcdFx0XHRcdGlmIChmdWxsLmxlbmd0aCAtIDEgPiBpbmRleCAtIChleHByIHx8IDApKSB7IC8vIFdlIG5lZWQgdG8gY29tcGlsZSBhIHN1YmV4cHJlc3Npb25cblx0XHRcdFx0XHRcdGV4cHIgPSBmdWxsLnNsaWNlKGV4cHIsIGluZGV4ICsgYWxsLmxlbmd0aCk7XG5cdFx0XHRcdFx0XHRpZiAoZXhwckZuICE9PSB0cnVlKSB7IC8vIElmIG5vdCByZWVudHJhbnQgY2FsbCBkdXJpbmcgY29tcGlsYXRpb25cblx0XHRcdFx0XHRcdFx0YmluZHMgPSBiaW5kdG8gfHwgYm5kU3RhY2tbcGFyZW5EZXB0aC0xXS5iZDtcblx0XHRcdFx0XHRcdFx0Ly8gSW5zZXJ0IGV4cHJPYiBvYmplY3QsIHRvIGJlIHVzZWQgZHVyaW5nIGJpbmRpbmcgdG8gcmV0dXJuIHRoZSBjb21wdXRlZCBvYmplY3Rcblx0XHRcdFx0XHRcdFx0dGhlT2IgPSBiaW5kc1tiaW5kcy5sZW5ndGgtMV07XG5cdFx0XHRcdFx0XHRcdGlmICh0aGVPYiAmJiB0aGVPYi5wcm0pIHtcblx0XHRcdFx0XHRcdFx0XHR3aGlsZSAodGhlT2Iuc2IgJiYgdGhlT2Iuc2IucHJtKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGVPYiA9IHRoZU9iLnNiO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRuZXdPYiA9IHRoZU9iLnNiID0ge3BhdGg6IHRoZU9iLnNiLCBibmQ6IHRoZU9iLmJuZH07XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0YmluZHMucHVzaChuZXdPYiA9IHtwYXRoOiBiaW5kcy5wb3AoKX0pOyAvLyBJbnNlcnQgZXhwck9iIG9iamVjdCwgdG8gYmUgdXNlZCBkdXJpbmcgYmluZGluZyB0byByZXR1cm4gdGhlIGNvbXB1dGVkIG9iamVjdFxuXHRcdFx0XHRcdFx0XHR9XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAvLyAoZS5nLiBcInNvbWUub2JqZWN0KClcIiBpbiBcInNvbWUub2JqZWN0KCkuYS5iXCIgLSB0byBiZSB1c2VkIGFzIGNvbnRleHQgZm9yIGJpbmRpbmcgdGhlIGZvbGxvd2luZyB0b2tlbnMgXCJhLmJcIilcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJ0UHJuRG90ID0gZGVsaW1PcGVuQ2hhcjEgKyBcIjpcIiArIGV4cHIgLy8gVGhlIHBhcmFtZXRlciBvciBmdW5jdGlvbiBzdWJleHByZXNzaW9uXG5cdFx0XHRcdFx0XHRcdCsgXCIgb25lcnJvcj0nJ1wiIC8vIHNldCBvbmVycm9yPScnIGluIG9yZGVyIHRvIHdyYXAgZ2VuZXJhdGVkIGNvZGUgd2l0aCBhIHRyeSBjYXRjaCAtIHJldHVybmluZyAnJyBhcyBvYmplY3QgaW5zdGFuY2UgaWYgdGhlcmUgaXMgYW4gZXJyb3IvbWlzc2luZyBwYXJlbnRcblx0XHRcdFx0XHRcdFx0KyBkZWxpbUNsb3NlQ2hhcjA7XG5cdFx0XHRcdFx0XHRleHByRm4gPSB0bXBsTGlua3NbcnRQcm5Eb3RdO1xuXHRcdFx0XHRcdFx0aWYgKCFleHByRm4pIHtcblx0XHRcdFx0XHRcdFx0dG1wbExpbmtzW3J0UHJuRG90XSA9IHRydWU7IC8vIEZsYWcgdGhhdCB0aGlzIGV4cHJGbiAoZm9yIHJ0UHJuRG90KSBpcyBiZWluZyBjb21waWxlZFxuXHRcdFx0XHRcdFx0XHR0bXBsTGlua3NbcnRQcm5Eb3RdID0gZXhwckZuID0gdG1wbEZuKHJ0UHJuRG90LCB0bXBsLCB0cnVlKTsgLy8gQ29tcGlsZSB0aGUgZXhwcmVzc2lvbiAob3IgdXNlIGNhY2hlZCBjb3B5IGFscmVhZHkgaW4gdG1wbC5saW5rcylcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChleHByRm4gIT09IHRydWUgJiYgbmV3T2IpIHtcblx0XHRcdFx0XHRcdFx0Ly8gSWYgbm90IHJlZW50cmFudCBjYWxsIGR1cmluZyBjb21waWxhdGlvblxuXHRcdFx0XHRcdFx0XHRuZXdPYi5fY3BmbiA9IGV4cHJGbjtcblx0XHRcdFx0XHRcdFx0bmV3T2IucHJtID0gYm5kQ3R4LmJkO1xuXHRcdFx0XHRcdFx0XHRuZXdPYi5ibmQgPSBuZXdPYi5ibmQgfHwgbmV3T2IucGF0aCAmJiBuZXdPYi5wYXRoLmluZGV4T2YoXCJeXCIpID49IDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKGFwb3NlZFxuXHRcdFx0XHQvLyB3aXRoaW4gc2luZ2xlLXF1b3RlZCBzdHJpbmdcblx0XHRcdFx0PyAoYXBvc2VkID0gIWFwb3MsIChhcG9zZWQgPyBhbGwgOiBsZnRQcm4yICsgJ1wiJykpXG5cdFx0XHRcdDogcXVvdGVkXG5cdFx0XHRcdC8vIHdpdGhpbiBkb3VibGUtcXVvdGVkIHN0cmluZ1xuXHRcdFx0XHRcdD8gKHF1b3RlZCA9ICFxdW90LCAocXVvdGVkID8gYWxsIDogbGZ0UHJuMiArICdcIicpKVxuXHRcdFx0XHRcdDpcblx0XHRcdFx0KFxuXHRcdFx0XHRcdChsZnRQcm5cblx0XHRcdFx0XHRcdD8gKHBhdGhTdGFydFtwYXJlbkRlcHRoXSA9IGluZGV4KyssIGJuZEN0eCA9IGJuZFN0YWNrWysrcGFyZW5EZXB0aF0gPSB7YmQ6IFtdfSwgbGZ0UHJuKVxuXHRcdFx0XHRcdFx0OiBcIlwiKVxuXHRcdFx0XHRcdCsgKHNwYWNlXG5cdFx0XHRcdFx0XHQ/IChwYXJlbkRlcHRoXG5cdFx0XHRcdFx0XHRcdD8gXCJcIlxuXHRcdFx0XHQvLyBOZXcgYXJnIG9yIHByb3AgLSBzbyBpbnNlcnQgYmFja3NwYWNlIFxcYiAoXFx4MDgpIGFzIHNlcGFyYXRvciBmb3IgbmFtZWQgcGFyYW1zLCB1c2VkIHN1YnNlcXVlbnRseSBieSByQnVpbGRIYXNoLCBhbmQgcHJlcGFyZSBuZXcgYmluZGluZ3MgYXJyYXlcblx0XHRcdFx0XHRcdFx0OiAocGFyYW1JbmRleCA9IGZ1bGwuc2xpY2UocGFyYW1JbmRleCwgaW5kZXgpLCBuYW1lZFxuXHRcdFx0XHRcdFx0XHRcdD8gKG5hbWVkID0gYm91bmROYW1lID0gYmluZHRvID0gZmFsc2UsIFwiXFxiXCIpXG5cdFx0XHRcdFx0XHRcdFx0OiBcIlxcYixcIikgKyBwYXJhbUluZGV4ICsgKHBhcmFtSW5kZXggPSBpbmRleCArIGFsbC5sZW5ndGgsIGJpbmRpbmdzICYmIHBhdGhCaW5kaW5ncy5wdXNoKGJuZEN0eC5iZCA9IFtdKSwgXCJcXGJcIilcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdDogZXFcblx0XHRcdFx0Ly8gbmFtZWQgcGFyYW0uIFJlbW92ZSBiaW5kaW5ncyBmb3IgYXJnIGFuZCBjcmVhdGUgaW5zdGVhZCBiaW5kaW5ncyBhcnJheSBmb3IgcHJvcFxuXHRcdFx0XHRcdFx0XHQ/IChwYXJlbkRlcHRoICYmIHN5bnRheEVycm9yKHBhcmFtcyksIGJpbmRpbmdzICYmIHBhdGhCaW5kaW5ncy5wb3AoKSwgbmFtZWQgPSBcIl9cIiArIHBhdGgsIGJvdW5kTmFtZSA9IGJvdW5kLCBwYXJhbUluZGV4ID0gaW5kZXggKyBhbGwubGVuZ3RoLFxuXHRcdFx0XHRcdFx0XHRcdFx0YmluZGluZ3MgJiYgKChiaW5kaW5ncyA9IGJuZEN0eC5iZCA9IHBhdGhCaW5kaW5nc1tuYW1lZF0gPSBbXSksIGJpbmRpbmdzLnNrcCA9ICFib3VuZCksIHBhdGggKyAnOicpXG5cdFx0XHRcdFx0XHRcdDogcGF0aFxuXHRcdFx0XHQvLyBwYXRoXG5cdFx0XHRcdFx0XHRcdFx0PyAocGF0aC5zcGxpdChcIl5cIikuam9pbihcIi5cIikucmVwbGFjZShyUGF0aCwgcGFyc2VQYXRoKVxuXHRcdFx0XHRcdFx0XHRcdFx0KyAocHJuXG5cdFx0XHRcdC8vIHNvbWUuZm5jYWxsKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ/IChibmRDdHggPSBibmRTdGFja1srK3BhcmVuRGVwdGhdID0ge2JkOiBbXX0sIGZuQ2FsbFtwYXJlbkRlcHRoXSA9IHJ0U3EsIHBybilcblx0XHRcdFx0XHRcdFx0XHRcdFx0OiBvcGVyYXRvcilcblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdFx0OiBvcGVyYXRvclxuXHRcdFx0XHQvLyBvcGVyYXRvclxuXHRcdFx0XHRcdFx0XHRcdFx0PyBvcGVyYXRvclxuXHRcdFx0XHRcdFx0XHRcdFx0OiBydFByblxuXHRcdFx0XHQvLyBmdW5jdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ/ICgocnRQcm4gPSBmbkNhbGxbcGFyZW5EZXB0aF0gfHwgcnRQcm4sIGZuQ2FsbFtwYXJlbkRlcHRoXSA9IGZhbHNlLCBibmRDdHggPSBibmRTdGFja1stLXBhcmVuRGVwdGhdLCBydFBybilcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQrIChwcm4gLy8gcnRQcm4gYW5kIHBybiwgZS5nICkoIGluIChhKSgpIG9yIGEoKSgpLCBvciApWyBpbiBhKClbXVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PyAoYm5kQ3R4ID0gYm5kU3RhY2tbKytwYXJlbkRlcHRoXSwgZm5DYWxsW3BhcmVuRGVwdGhdID0gcnRTcSwgcHJuKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiBcIlwiKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDogY29tbWFcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ/IChmbkNhbGxbcGFyZW5EZXB0aF0gfHwgc3ludGF4RXJyb3IocGFyYW1zKSwgXCIsXCIpIC8vIFdlIGRvbid0IGFsbG93IHRvcC1sZXZlbCBsaXRlcmFsIGFycmF5cyBvciBvYmplY3RzXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiBsZnRQcm4wXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ/IFwiXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDogKGFwb3NlZCA9IGFwb3MsIHF1b3RlZCA9IHF1b3QsICdcIicpXG5cdFx0XHRcdCkpXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXG5cdHZhciBuYW1lZCwgYmluZHRvLCBib3VuZE5hbWUsXG5cdFx0cXVvdGVkLCAvLyBib29sZWFuIGZvciBzdHJpbmcgY29udGVudCBpbiBkb3VibGUgcXVvdGVzXG5cdFx0YXBvc2VkLCAvLyBvciBpbiBzaW5nbGUgcXVvdGVzXG5cdFx0YmluZGluZ3MgPSBwYXRoQmluZGluZ3MgJiYgcGF0aEJpbmRpbmdzWzBdLCAvLyBiaW5kaW5ncyBhcnJheSBmb3IgdGhlIGZpcnN0IGFyZ1xuXHRcdGJuZEN0eCA9IHtiZDogYmluZGluZ3N9LFxuXHRcdGJuZFN0YWNrID0gezA6IGJuZEN0eH0sXG5cdFx0cGFyYW1JbmRleCA9IDAsIC8vIGxpc3QsXG5cdFx0dG1wbExpbmtzID0gKHRtcGwgPyB0bXBsLmxpbmtzIDogYmluZGluZ3MgJiYgKGJpbmRpbmdzLmxpbmtzID0gYmluZGluZ3MubGlua3MgfHwge30pKSB8fCB0b3BWaWV3LnRtcGwubGlua3MsXG5cdFx0Ly8gVGhlIGZvbGxvd2luZyBhcmUgdXNlZCBmb3IgdHJhY2tpbmcgcGF0aCBwYXJzaW5nIGluY2x1ZGluZyBuZXN0ZWQgcGF0aHMsIHN1Y2ggYXMgXCJhLmIoY15kICsgKGUpKV5mXCIsIGFuZCBjaGFpbmVkIGNvbXB1dGVkIHBhdGhzIHN1Y2ggYXNcblx0XHQvLyBcImEuYigpLmNeZCgpLmUuZigpLmdcIiAtIHdoaWNoIGhhcyBmb3VyIGNoYWluZWQgcGF0aHMsIFwiYS5iKClcIiwgXCJeYy5kKClcIiwgXCIuZS5mKClcIiBhbmQgXCIuZ1wiXG5cdFx0cGFyZW5EZXB0aCA9IDAsXG5cdFx0Zm5DYWxsID0ge30sIC8vIFdlIGFyZSBpbiBhIGZ1bmN0aW9uIGNhbGxcblx0XHRwYXRoU3RhcnQgPSB7fSwgLy8gdHJhY2tzIHRoZSBzdGFydCBvZiB0aGUgY3VycmVudCBwYXRoIHN1Y2ggYXMgY15kKCkgaW4gdGhlIGFib3ZlIGV4YW1wbGVcblx0XHRyZXN1bHQ7XG5cblx0aWYgKHBhcmFtcy5jaGFyQXQoMCkgPT09IFwiQFwiKSB7XG5cdFx0cGFyYW1zID0gcGFyYW1zLnJlcGxhY2UockJyYWNrZXRRdW90ZSwgXCIuXCIpO1xuXHR9XG5cdHJlc3VsdCA9IChwYXJhbXMgKyAodG1wbCA/IFwiIFwiIDogXCJcIikpLnJlcGxhY2UoclBhcmFtcywgcGFyc2VUb2tlbnMpO1xuXG5cdHJldHVybiAhcGFyZW5EZXB0aCAmJiByZXN1bHQgfHwgc3ludGF4RXJyb3IocGFyYW1zKTsgLy8gU3ludGF4IGVycm9yIGlmIHVuYmFsYW5jZWQgcGFyZW5zIGluIHBhcmFtcyBleHByZXNzaW9uXG59XG5cbmZ1bmN0aW9uIGJ1aWxkQ29kZShhc3QsIHRtcGwsIGlzTGlua0V4cHIpIHtcblx0Ly8gQnVpbGQgdGhlIHRlbXBsYXRlIGZ1bmN0aW9uIGNvZGUgZnJvbSB0aGUgQVNUIG5vZGVzLCBhbmQgc2V0IGFzIHByb3BlcnR5IG9uIHRoZSBwYXNzZWQtaW4gdGVtcGxhdGUgb2JqZWN0XG5cdC8vIFVzZWQgZm9yIGNvbXBpbGluZyB0ZW1wbGF0ZXMsIGFuZCBhbHNvIGJ5IEpzVmlld3MgdG8gYnVpbGQgZnVuY3Rpb25zIGZvciBkYXRhIGxpbmsgZXhwcmVzc2lvbnNcblx0dmFyIGksIG5vZGUsIHRhZ05hbWUsIGNvbnZlcnRlciwgdGFnQ3R4LCBoYXNUYWcsIGhhc0VuY29kZXIsIGdldHNWYWwsIGhhc0NudnQsIHVzZUNudnQsIHRtcGxCaW5kaW5ncywgcGF0aEJpbmRpbmdzLCBwYXJhbXMsIGJvdW5kT25FcnJTdGFydCxcblx0XHRib3VuZE9uRXJyRW5kLCB0YWdSZW5kZXIsIG5lc3RlZFRtcGxzLCB0bXBsTmFtZSwgbmVzdGVkVG1wbCwgdGFnQW5kRWxzZXMsIGNvbnRlbnQsIG1hcmt1cCwgbmV4dElzRWxzZSwgb2xkQ29kZSwgaXNFbHNlLCBpc0dldFZhbCwgdGFnQ3R4Rm4sXG5cdFx0b25FcnJvciwgdGFnU3RhcnQsIHRyaWdnZXIsIGxhdGVSZW5kZXIsIHJldFN0ck9wZW4sIHJldFN0ckNsb3NlLFxuXHRcdHRtcGxCaW5kaW5nS2V5ID0gMCxcblx0XHR1c2VWaWV3cyA9ICRzdWJTZXR0aW5nc0FkdmFuY2VkLnVzZVZpZXdzIHx8IHRtcGwudXNlVmlld3MgfHwgdG1wbC50YWdzIHx8IHRtcGwudGVtcGxhdGVzIHx8IHRtcGwuaGVscGVycyB8fCB0bXBsLmNvbnZlcnRlcnMsXG5cdFx0Y29kZSA9IFwiXCIsXG5cdFx0dG1wbE9wdGlvbnMgPSB7fSxcblx0XHRsID0gYXN0Lmxlbmd0aDtcblxuXHRpZiAoXCJcIiArIHRtcGwgPT09IHRtcGwpIHtcblx0XHR0bXBsTmFtZSA9IGlzTGlua0V4cHIgPyAnZGF0YS1saW5rPVwiJyArIHRtcGwucmVwbGFjZShyTmV3TGluZSwgXCIgXCIpLnNsaWNlKDEsIC0xKSArICdcIicgOiB0bXBsO1xuXHRcdHRtcGwgPSAwO1xuXHR9IGVsc2Uge1xuXHRcdHRtcGxOYW1lID0gdG1wbC50bXBsTmFtZSB8fCBcInVubmFtZWRcIjtcblx0XHRpZiAodG1wbC5hbGxvd0NvZGUpIHtcblx0XHRcdHRtcGxPcHRpb25zLmFsbG93Q29kZSA9IHRydWU7XG5cdFx0fVxuXHRcdGlmICh0bXBsLmRlYnVnKSB7XG5cdFx0XHR0bXBsT3B0aW9ucy5kZWJ1ZyA9IHRydWU7XG5cdFx0fVxuXHRcdHRtcGxCaW5kaW5ncyA9IHRtcGwuYm5kcztcblx0XHRuZXN0ZWRUbXBscyA9IHRtcGwudG1wbHM7XG5cdH1cblx0Zm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuXHRcdC8vIEFTVCBub2RlczogWzA6IHRhZ05hbWUsIDE6IGNvbnZlcnRlciwgMjogY29udGVudCwgMzogcGFyYW1zLCA0OiBjb2RlLCA1OiBvbkVycm9yLCA2OiB0cmlnZ2VyLCA3OnBhdGhCaW5kaW5ncywgODogY29udGVudE1hcmt1cF1cblx0XHRub2RlID0gYXN0W2ldO1xuXG5cdFx0Ly8gQWRkIG5ld2xpbmUgZm9yIGVhY2ggY2FsbG91dCB0byB0KCkgYygpIGV0Yy4gYW5kIGVhY2ggbWFya3VwIHN0cmluZ1xuXHRcdGlmIChcIlwiICsgbm9kZSA9PT0gbm9kZSkge1xuXHRcdFx0Ly8gYSBtYXJrdXAgc3RyaW5nIHRvIGJlIGluc2VydGVkXG5cdFx0XHRjb2RlICs9ICdcXG4rXCInICsgbm9kZSArICdcIic7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGEgY29tcGlsZWQgdGFnIGV4cHJlc3Npb24gdG8gYmUgaW5zZXJ0ZWRcblx0XHRcdHRhZ05hbWUgPSBub2RlWzBdO1xuXHRcdFx0aWYgKHRhZ05hbWUgPT09IFwiKlwiKSB7XG5cdFx0XHRcdC8vIENvZGUgdGFnOiB7eyogfX1cblx0XHRcdFx0Y29kZSArPSBcIjtcXG5cIiArIG5vZGVbMV0gKyBcIlxcbnJldD1yZXRcIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnZlcnRlciA9IG5vZGVbMV07XG5cdFx0XHRcdGNvbnRlbnQgPSAhaXNMaW5rRXhwciAmJiBub2RlWzJdO1xuXHRcdFx0XHR0YWdDdHggPSBwYXJhbVN0cnVjdHVyZShub2RlWzNdLCAncGFyYW1zJykgKyAnfSwnICsgcGFyYW1TdHJ1Y3R1cmUocGFyYW1zID0gbm9kZVs0XSk7XG5cdFx0XHRcdHRyaWdnZXIgPSBub2RlWzZdO1xuXHRcdFx0XHRsYXRlUmVuZGVyID0gbm9kZVs3XTtcblx0XHRcdFx0aWYgKG5vZGVbOF0pIHsgLy8gbGF0ZVBhdGggQGEuYi5jIG9yIEB+YS5iLmNcblx0XHRcdFx0XHRyZXRTdHJPcGVuID0gXCJcXG52YXIgb2IsbHRPYj17fSxjdHhzPVwiO1xuXHRcdFx0XHRcdHJldFN0ckNsb3NlID0gXCI7XFxuY3R4cy5sdD1sdE9iLmx0O1xcbnJldHVybiBjdHhzO1wiO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldFN0ck9wZW4gPSBcIlxcbnJldHVybiBcIjtcblx0XHRcdFx0XHRyZXRTdHJDbG9zZSA9IFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bWFya3VwID0gbm9kZVsxMF0gJiYgbm9kZVsxMF0ucmVwbGFjZShyVW5lc2NhcGVRdW90ZXMsIFwiJDFcIik7XG5cdFx0XHRcdGlmIChpc0Vsc2UgPSB0YWdOYW1lID09PSBcImVsc2VcIikge1xuXHRcdFx0XHRcdGlmIChwYXRoQmluZGluZ3MpIHtcblx0XHRcdFx0XHRcdHBhdGhCaW5kaW5ncy5wdXNoKG5vZGVbOV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRvbkVycm9yID0gbm9kZVs1XSB8fCAkc3ViU2V0dGluZ3MuZGVidWdNb2RlICE9PSBmYWxzZSAmJiBcInVuZGVmaW5lZFwiOyAvLyBJZiBkZWJ1Z01vZGUgbm90IGZhbHNlLCBzZXQgZGVmYXVsdCBvbkVycm9yIGhhbmRsZXIgb24gdGFnIHRvIFwidW5kZWZpbmVkXCIgKHNlZSBvblJlbmRlckVycm9yKVxuXHRcdFx0XHRcdGlmICh0bXBsQmluZGluZ3MgJiYgKHBhdGhCaW5kaW5ncyA9IG5vZGVbOV0pKSB7IC8vIEFycmF5IG9mIHBhdGhzLCBvciBmYWxzZSBpZiBub3QgZGF0YS1ib3VuZFxuXHRcdFx0XHRcdFx0cGF0aEJpbmRpbmdzID0gW3BhdGhCaW5kaW5nc107XG5cdFx0XHRcdFx0XHR0bXBsQmluZGluZ0tleSA9IHRtcGxCaW5kaW5ncy5wdXNoKDEpOyAvLyBBZGQgcGxhY2Vob2xkZXIgaW4gdG1wbEJpbmRpbmdzIGZvciBjb21waWxlZCBmdW5jdGlvblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR1c2VWaWV3cyA9IHVzZVZpZXdzIHx8IHBhcmFtc1sxXSB8fCBwYXJhbXNbMl0gfHwgcGF0aEJpbmRpbmdzIHx8IC92aWV3Lig/IWluZGV4KS8udGVzdChwYXJhbXNbMF0pO1xuXHRcdFx0XHQvLyB1c2VWaWV3cyBpcyBmb3IgcGVyZiBvcHRpbWl6YXRpb24uIEZvciByZW5kZXIoKSB3ZSBvbmx5IHVzZSB2aWV3cyBpZiBuZWNlc3NhcnkgLSBmb3IgdGhlIG1vcmUgYWR2YW5jZWQgc2NlbmFyaW9zLlxuXHRcdFx0XHQvLyBXZSB1c2Ugdmlld3MgaWYgdGhlcmUgYXJlIHByb3BzLCBjb250ZXh0dWFsIHByb3BlcnRpZXMgb3IgYXJncyB3aXRoICMuLi4gKG90aGVyIHRoYW4gI2luZGV4KSAtIGJ1dCB5b3UgY2FuIGZvcmNlXG5cdFx0XHRcdC8vIHVzaW5nIHRoZSBmdWxsIHZpZXcgaW5mcmFzdHJ1Y3R1cmUsIChhbmQgcGF5IGEgcGVyZiBwcmljZSkgYnkgb3B0aW5nIGluOiBTZXQgdXNlVmlld3M6IHRydWUgb24gdGhlIHRlbXBsYXRlLCBtYW51YWxseS4uLlxuXHRcdFx0XHRpZiAoaXNHZXRWYWwgPSB0YWdOYW1lID09PSBcIjpcIikge1xuXHRcdFx0XHRcdGlmIChjb252ZXJ0ZXIpIHtcblx0XHRcdFx0XHRcdHRhZ05hbWUgPSBjb252ZXJ0ZXIgPT09IEhUTUwgPyBcIj5cIiA6IGNvbnZlcnRlciArIHRhZ05hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChjb250ZW50KSB7IC8vIFRPRE8gb3B0aW1pemUgLSBpZiBjb250ZW50Lmxlbmd0aCA9PT0gMCBvciBpZiB0aGVyZSBpcyBhIHRtcGw9XCIuLi5cIiBzcGVjaWZpZWQgLSBzZXQgY29udGVudCB0byBudWxsIC8gZG9uJ3QgcnVuIHRoaXMgY29tcGlsYXRpb24gY29kZSAtIHNpbmNlIGNvbnRlbnQgd29uJ3QgZ2V0IHVzZWQhIVxuXHRcdFx0XHRcdFx0Ly8gQ3JlYXRlIHRlbXBsYXRlIG9iamVjdCBmb3IgbmVzdGVkIHRlbXBsYXRlXG5cdFx0XHRcdFx0XHRuZXN0ZWRUbXBsID0gdG1wbE9iamVjdChtYXJrdXAsIHRtcGxPcHRpb25zKTtcblx0XHRcdFx0XHRcdG5lc3RlZFRtcGwudG1wbE5hbWUgPSB0bXBsTmFtZSArIFwiL1wiICsgdGFnTmFtZTtcblx0XHRcdFx0XHRcdC8vIENvbXBpbGUgdG8gQVNUIGFuZCB0aGVuIHRvIGNvbXBpbGVkIGZ1bmN0aW9uXG5cdFx0XHRcdFx0XHRuZXN0ZWRUbXBsLnVzZVZpZXdzID0gbmVzdGVkVG1wbC51c2VWaWV3cyB8fCB1c2VWaWV3cztcblx0XHRcdFx0XHRcdGJ1aWxkQ29kZShjb250ZW50LCBuZXN0ZWRUbXBsKTtcblx0XHRcdFx0XHRcdHVzZVZpZXdzID0gbmVzdGVkVG1wbC51c2VWaWV3cztcblx0XHRcdFx0XHRcdG5lc3RlZFRtcGxzLnB1c2gobmVzdGVkVG1wbCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFpc0Vsc2UpIHtcblx0XHRcdFx0XHRcdC8vIFRoaXMgaXMgbm90IGFuIGVsc2UgdGFnLlxuXHRcdFx0XHRcdFx0dGFnQW5kRWxzZXMgPSB0YWdOYW1lO1xuXHRcdFx0XHRcdFx0dXNlVmlld3MgPSB1c2VWaWV3cyB8fCB0YWdOYW1lICYmICghJHRhZ3NbdGFnTmFtZV0gfHwgISR0YWdzW3RhZ05hbWVdLmZsb3cpO1xuXHRcdFx0XHRcdFx0Ly8gU3dpdGNoIHRvIGEgbmV3IGNvZGUgc3RyaW5nIGZvciB0aGlzIGJvdW5kIHRhZyAoYW5kIGl0cyBlbHNlcywgaWYgaXQgaGFzIGFueSkgLSBmb3IgcmV0dXJuaW5nIHRoZSB0YWdDdHhzIGFycmF5XG5cdFx0XHRcdFx0XHRvbGRDb2RlID0gY29kZTtcblx0XHRcdFx0XHRcdGNvZGUgPSBcIlwiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRuZXh0SXNFbHNlID0gYXN0W2kgKyAxXTtcblx0XHRcdFx0XHRuZXh0SXNFbHNlID0gbmV4dElzRWxzZSAmJiBuZXh0SXNFbHNlWzBdID09PSBcImVsc2VcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0YWdTdGFydCA9IG9uRXJyb3IgPyBcIjtcXG50cnl7XFxucmV0Kz1cIiA6IFwiXFxuK1wiO1xuXHRcdFx0XHRib3VuZE9uRXJyU3RhcnQgPSBcIlwiO1xuXHRcdFx0XHRib3VuZE9uRXJyRW5kID0gXCJcIjtcblxuXHRcdFx0XHRpZiAoaXNHZXRWYWwgJiYgKHBhdGhCaW5kaW5ncyB8fCB0cmlnZ2VyIHx8IGNvbnZlcnRlciAmJiBjb252ZXJ0ZXIgIT09IEhUTUwgfHwgbGF0ZVJlbmRlcikpIHtcblx0XHRcdFx0XHQvLyBGb3IgY29udmVydFZhbCB3ZSBuZWVkIGEgY29tcGlsZWQgZnVuY3Rpb24gdG8gcmV0dXJuIHRoZSBuZXcgdGFnQ3R4KHMpXG5cdFx0XHRcdFx0dGFnQ3R4Rm4gPSBuZXcgRnVuY3Rpb24oXCJkYXRhLHZpZXcsaix1XCIsIFwiLy8gXCIgKyB0bXBsTmFtZSArIFwiIFwiICsgKCsrdG1wbEJpbmRpbmdLZXkpICsgXCIgXCIgKyB0YWdOYW1lXG5cdFx0XHRcdFx0XHQrIHJldFN0ck9wZW4gKyBcIntcIiArIHRhZ0N0eCArIFwifTtcIiArIHJldFN0ckNsb3NlKTtcblx0XHRcdFx0XHR0YWdDdHhGbi5fZXIgPSBvbkVycm9yO1xuXHRcdFx0XHRcdHRhZ0N0eEZuLl90YWcgPSB0YWdOYW1lO1xuXHRcdFx0XHRcdHRhZ0N0eEZuLl9iZCA9ICEhcGF0aEJpbmRpbmdzOyAvLyBkYXRhLWxpbmtlZCB0YWcge157Li4uL319XG5cdFx0XHRcdFx0dGFnQ3R4Rm4uX2xyID0gbGF0ZVJlbmRlcjtcblxuXHRcdFx0XHRcdGlmIChpc0xpbmtFeHByKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGFnQ3R4Rm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c2V0UGF0aHModGFnQ3R4Rm4sIHBhdGhCaW5kaW5ncyk7XG5cdFx0XHRcdFx0dGFnUmVuZGVyID0gJ2MoXCInICsgY29udmVydGVyICsgJ1wiLHZpZXcsJztcblx0XHRcdFx0XHR1c2VDbnZ0ID0gdHJ1ZTtcblx0XHRcdFx0XHRib3VuZE9uRXJyU3RhcnQgPSB0YWdSZW5kZXIgKyB0bXBsQmluZGluZ0tleSArIFwiLFwiO1xuXHRcdFx0XHRcdGJvdW5kT25FcnJFbmQgPSBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb2RlICs9IChpc0dldFZhbFxuXHRcdFx0XHRcdD8gKGlzTGlua0V4cHIgPyAob25FcnJvciA/IFwidHJ5e1xcblwiIDogXCJcIikgKyBcInJldHVybiBcIiA6IHRhZ1N0YXJ0KSArICh1c2VDbnZ0IC8vIENhbGwgX2NudnQgaWYgdGhlcmUgaXMgYSBjb252ZXJ0ZXI6IHt7Y252dDogLi4uIH19IG9yIHtee2NudnQ6IC4uLiB9fVxuXHRcdFx0XHRcdFx0PyAodXNlQ252dCA9IHVuZGVmaW5lZCwgdXNlVmlld3MgPSBoYXNDbnZ0ID0gdHJ1ZSwgdGFnUmVuZGVyICsgKHRhZ0N0eEZuXG5cdFx0XHRcdFx0XHRcdD8gKCh0bXBsQmluZGluZ3NbdG1wbEJpbmRpbmdLZXkgLSAxXSA9IHRhZ0N0eEZuKSwgdG1wbEJpbmRpbmdLZXkpIC8vIFN0b3JlIHRoZSBjb21waWxlZCB0YWdDdHhGbiBpbiB0bXBsLmJuZHMsIGFuZCBwYXNzIHRoZSBrZXkgdG8gY29udmVydFZhbCgpXG5cdFx0XHRcdFx0XHRcdDogXCJ7XCIgKyB0YWdDdHggKyBcIn1cIikgKyBcIilcIilcblx0XHRcdFx0XHRcdDogdGFnTmFtZSA9PT0gXCI+XCJcblx0XHRcdFx0XHRcdFx0PyAoaGFzRW5jb2RlciA9IHRydWUsIFwiaChcIiArIHBhcmFtc1swXSArIFwiKVwiKVxuXHRcdFx0XHRcdFx0XHQ6IChnZXRzVmFsID0gdHJ1ZSwgXCIoKHY9XCIgKyBwYXJhbXNbMF0gKyAnKSE9bnVsbD92OicgKyAoaXNMaW5rRXhwciA/ICdudWxsKScgOiAnXCJcIiknKSlcblx0XHRcdFx0XHRcdFx0Ly8gTm9uIHN0cmljdCBlcXVhbGl0eSBzbyBkYXRhLWxpbms9XCJ0aXRsZXs6ZXhwcn1cIiB3aXRoIGV4cHI9bnVsbC91bmRlZmluZWQgcmVtb3ZlcyB0aXRsZSBhdHRyaWJ1dGVcblx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0OiAoaGFzVGFnID0gdHJ1ZSwgXCJcXG57dmlldzp2aWV3LHRtcGw6XCIgLy8gQWRkIHRoaXMgdGFnQ3R4IHRvIHRoZSBjb21waWxlZCBjb2RlIGZvciB0aGUgdGFnQ3R4cyB0byBiZSBwYXNzZWQgdG8gcmVuZGVyVGFnKClcblx0XHRcdFx0XHRcdCsgKGNvbnRlbnQgPyBuZXN0ZWRUbXBscy5sZW5ndGggOiBcIjBcIikgKyBcIixcIiAvLyBGb3IgYmxvY2sgdGFncywgcGFzcyBpbiB0aGUga2V5IChuZXN0ZWRUbXBscy5sZW5ndGgpIHRvIHRoZSBuZXN0ZWQgY29udGVudCB0ZW1wbGF0ZVxuXHRcdFx0XHRcdFx0KyB0YWdDdHggKyBcIn0sXCIpKTtcblxuXHRcdFx0XHRpZiAodGFnQW5kRWxzZXMgJiYgIW5leHRJc0Vsc2UpIHtcblx0XHRcdFx0XHQvLyBUaGlzIGlzIGEgZGF0YS1saW5rIGV4cHJlc3Npb24gb3IgYW4gaW5saW5lIHRhZyB3aXRob3V0IGFueSBlbHNlcywgb3IgdGhlIGxhc3Qge3tlbHNlfX0gb2YgYW4gaW5saW5lIHRhZ1xuXHRcdFx0XHRcdC8vIFdlIGNvbXBsZXRlIHRoZSBjb2RlIGZvciByZXR1cm5pbmcgdGhlIHRhZ0N0eHMgYXJyYXlcblx0XHRcdFx0XHRjb2RlID0gXCJbXCIgKyBjb2RlLnNsaWNlKDAsIC0xKSArIFwiXVwiO1xuXHRcdFx0XHRcdHRhZ1JlbmRlciA9ICd0KFwiJyArIHRhZ0FuZEVsc2VzICsgJ1wiLHZpZXcsdGhpcywnO1xuXHRcdFx0XHRcdGlmIChpc0xpbmtFeHByIHx8IHBhdGhCaW5kaW5ncykge1xuXHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBhIGJvdW5kIHRhZyAoZGF0YS1saW5rIGV4cHJlc3Npb24gb3IgaW5saW5lIGJvdW5kIHRhZyB7Xnt0YWcgLi4ufX0pIHNvIHdlIHN0b3JlIGEgY29tcGlsZWQgdGFnQ3R4cyBmdW5jdGlvbiBpbiB0bXAuYm5kc1xuXHRcdFx0XHRcdFx0Y29kZSA9IG5ldyBGdW5jdGlvbihcImRhdGEsdmlldyxqLHVcIiwgXCIgLy8gXCIgKyB0bXBsTmFtZSArIFwiIFwiICsgdG1wbEJpbmRpbmdLZXkgKyBcIiBcIiArIHRhZ0FuZEVsc2VzICsgcmV0U3RyT3BlbiArIGNvZGVcblx0XHRcdFx0XHRcdFx0KyByZXRTdHJDbG9zZSk7XG5cdFx0XHRcdFx0XHRjb2RlLl9lciA9IG9uRXJyb3I7XG5cdFx0XHRcdFx0XHRjb2RlLl90YWcgPSB0YWdBbmRFbHNlcztcblx0XHRcdFx0XHRcdGlmIChwYXRoQmluZGluZ3MpIHtcblx0XHRcdFx0XHRcdFx0c2V0UGF0aHModG1wbEJpbmRpbmdzW3RtcGxCaW5kaW5nS2V5IC0gMV0gPSBjb2RlLCBwYXRoQmluZGluZ3MpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y29kZS5fbHIgPSBsYXRlUmVuZGVyO1xuXHRcdFx0XHRcdFx0aWYgKGlzTGlua0V4cHIpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGNvZGU7IC8vIEZvciBhIGRhdGEtbGluayBleHByZXNzaW9uIHdlIHJldHVybiB0aGUgY29tcGlsZWQgdGFnQ3R4cyBmdW5jdGlvblxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ym91bmRPbkVyclN0YXJ0ID0gdGFnUmVuZGVyICsgdG1wbEJpbmRpbmdLZXkgKyBcIix1bmRlZmluZWQsXCI7XG5cdFx0XHRcdFx0XHRib3VuZE9uRXJyRW5kID0gXCIpXCI7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gVGhpcyBpcyB0aGUgbGFzdCB7e2Vsc2V9fSBmb3IgYW4gaW5saW5lIHRhZy5cblx0XHRcdFx0XHQvLyBGb3IgYSBib3VuZCB0YWcsIHBhc3MgdGhlIHRhZ0N0eHMgZm4gbG9va3VwIGtleSB0byByZW5kZXJUYWcuXG5cdFx0XHRcdFx0Ly8gRm9yIGFuIHVuYm91bmQgdGFnLCBpbmNsdWRlIHRoZSBjb2RlIGRpcmVjdGx5IGZvciBldmFsdWF0aW5nIHRhZ0N0eHMgYXJyYXlcblx0XHRcdFx0XHRjb2RlID0gb2xkQ29kZSArIHRhZ1N0YXJ0ICsgdGFnUmVuZGVyICsgKHBhdGhCaW5kaW5ncyAmJiB0bXBsQmluZGluZ0tleSB8fCBjb2RlKSArIFwiKVwiO1xuXHRcdFx0XHRcdHBhdGhCaW5kaW5ncyA9IDA7XG5cdFx0XHRcdFx0dGFnQW5kRWxzZXMgPSAwO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvbkVycm9yICYmICFuZXh0SXNFbHNlKSB7XG5cdFx0XHRcdFx0dXNlVmlld3MgPSB0cnVlO1xuXHRcdFx0XHRcdGNvZGUgKz0gJztcXG59Y2F0Y2goZSl7cmV0JyArIChpc0xpbmtFeHByID8gXCJ1cm4gXCIgOiBcIis9XCIpICsgYm91bmRPbkVyclN0YXJ0ICsgJ2ouX2VycihlLHZpZXcsJyArIG9uRXJyb3IgKyAnKScgKyBib3VuZE9uRXJyRW5kICsgJzt9JyArIChpc0xpbmtFeHByID8gXCJcIiA6ICdyZXQ9cmV0Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Ly8gSW5jbHVkZSBvbmx5IHRoZSB2YXIgcmVmZXJlbmNlcyB0aGF0IGFyZSBuZWVkZWQgaW4gdGhlIGNvZGVcblx0Y29kZSA9IFwiLy8gXCIgKyB0bXBsTmFtZVxuXHRcdCsgKHRtcGxPcHRpb25zLmRlYnVnID8gXCJcXG5kZWJ1Z2dlcjtcIiA6IFwiXCIpXG5cdFx0KyBcIlxcbnZhciB2XCJcblx0XHQrIChoYXNUYWcgPyBcIix0PWouX3RhZ1wiIDogXCJcIikgICAgICAgICAgICAgICAgLy8gaGFzIHRhZ1xuXHRcdCsgKGhhc0NudnQgPyBcIixjPWouX2NudnRcIiA6IFwiXCIpICAgICAgICAgICAgICAvLyBjb252ZXJ0ZXJcblx0XHQrIChoYXNFbmNvZGVyID8gXCIsaD1qLl9odG1sXCIgOiBcIlwiKSAgICAgICAgICAgLy8gaHRtbCBjb252ZXJ0ZXJcblx0XHQrIChpc0xpbmtFeHByXG5cdFx0XHRcdD8gKG5vZGVbOF0gIC8vIGxhdGUgQC4uLiBwYXRoP1xuXHRcdFx0XHRcdFx0PyBcIiwgb2JcIlxuXHRcdFx0XHRcdFx0OiBcIlwiXG5cdFx0XHRcdFx0KSArIFwiO1xcblwiXG5cdFx0XHRcdDogJyxyZXQ9XCJcIicpXG5cdFx0KyBjb2RlXG5cdFx0KyAoaXNMaW5rRXhwciA/IFwiXFxuXCIgOiBcIjtcXG5yZXR1cm4gcmV0O1wiKTtcblxuXHR0cnkge1xuXHRcdGNvZGUgPSBuZXcgRnVuY3Rpb24oXCJkYXRhLHZpZXcsaix1XCIsIGNvZGUpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0c3ludGF4RXJyb3IoXCJDb21waWxlZCB0ZW1wbGF0ZSBjb2RlOlxcblxcblwiICsgY29kZSArICdcXG46IFwiJyArIChlLm1lc3NhZ2V8fGUpICsgJ1wiJyk7XG5cdH1cblx0aWYgKHRtcGwpIHtcblx0XHR0bXBsLmZuID0gY29kZTtcblx0XHR0bXBsLnVzZVZpZXdzID0gISF1c2VWaWV3cztcblx0fVxuXHRyZXR1cm4gY29kZTtcbn1cblxuLy89PT09PT09PT09XG4vLyBVdGlsaXRpZXNcbi8vPT09PT09PT09PVxuXG4vLyBNZXJnZSBvYmplY3RzLCBpbiBwYXJ0aWN1bGFyIGNvbnRleHRzIHdoaWNoIGluaGVyaXQgZnJvbSBwYXJlbnQgY29udGV4dHNcbmZ1bmN0aW9uIGV4dGVuZEN0eChjb250ZXh0LCBwYXJlbnRDb250ZXh0KSB7XG5cdC8vIFJldHVybiBjb3B5IG9mIHBhcmVudENvbnRleHQsIHVubGVzcyBjb250ZXh0IGlzIGRlZmluZWQgYW5kIGlzIGRpZmZlcmVudCwgaW4gd2hpY2ggY2FzZSByZXR1cm4gYSBuZXcgbWVyZ2VkIGNvbnRleHRcblx0Ly8gSWYgbmVpdGhlciBjb250ZXh0IG5vciBwYXJlbnRDb250ZXh0IGFyZSBkZWZpbmVkLCByZXR1cm4gdW5kZWZpbmVkXG5cdHJldHVybiBjb250ZXh0ICYmIGNvbnRleHQgIT09IHBhcmVudENvbnRleHRcblx0XHQ/IChwYXJlbnRDb250ZXh0XG5cdFx0XHQ/ICRleHRlbmQoJGV4dGVuZCh7fSwgcGFyZW50Q29udGV4dCksIGNvbnRleHQpXG5cdFx0XHQ6IGNvbnRleHQpXG5cdFx0OiBwYXJlbnRDb250ZXh0ICYmICRleHRlbmQoe30sIHBhcmVudENvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBnZXRUYXJnZXRQcm9wcyhzb3VyY2UsIHRhZ0N0eCkge1xuXHQvLyB0aGlzIHBvaW50ZXIgaXMgdGhlTWFwIC0gd2hpY2ggaGFzIHRhZ0N0eC5wcm9wcyB0b29cblx0Ly8gYXJndW1lbnRzOiB0YWdDdHguYXJncy5cblx0dmFyIGtleSwgcHJvcCxcblx0XHRwcm9wcyA9IFtdO1xuXG5cdGlmICh0eXBlb2Ygc291cmNlID09PSBPQkpFQ1QgfHwgJGlzRnVuY3Rpb24oc291cmNlKSkge1xuXHRcdGZvciAoa2V5IGluIHNvdXJjZSkge1xuXHRcdFx0cHJvcCA9IHNvdXJjZVtrZXldO1xuXHRcdFx0aWYgKGtleSAhPT0gJGV4cGFuZG8gJiYgc291cmNlLmhhc093blByb3BlcnR5KGtleSkgJiYgKCF0YWdDdHgucHJvcHMubm9GdW5jdGlvbnMgfHwgISQuaXNGdW5jdGlvbihwcm9wKSkpIHtcblx0XHRcdFx0cHJvcHMucHVzaCh7a2V5OiBrZXksIHByb3A6IHByb3B9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGdldFRhcmdldFNvcnRlZChwcm9wcywgdGFnQ3R4KTtcbn1cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0U29ydGVkKHZhbHVlLCB0YWdDdHgpIHtcblx0Ly8gZ2V0VGd0XG5cdHZhciBtYXBwZWQsIHN0YXJ0LCBlbmQsXG5cdFx0dGFnID0gdGFnQ3R4LnRhZyxcblx0XHRwcm9wcyA9IHRhZ0N0eC5wcm9wcyxcblx0XHRwcm9wUGFyYW1zID0gdGFnQ3R4LnBhcmFtcy5wcm9wcyxcblx0XHRmaWx0ZXIgPSBwcm9wcy5maWx0ZXIsXG5cdFx0c29ydCA9IHByb3BzLnNvcnQsXG5cdFx0ZGlyZWN0U29ydCA9IHNvcnQgPT09IHRydWUsXG5cdFx0c3RlcCA9IHBhcnNlSW50KHByb3BzLnN0ZXApLFxuXHRcdHJldmVyc2UgPSBwcm9wcy5yZXZlcnNlID8gLTEgOiAxO1xuXG5cdGlmICghJGlzQXJyYXkodmFsdWUpKSB7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cdGlmIChkaXJlY3RTb3J0IHx8IHNvcnQgJiYgXCJcIiArIHNvcnQgPT09IHNvcnQpIHtcblx0XHQvLyBUZW1wb3JhcnkgbWFwcGVkIGFycmF5IGhvbGRzIG9iamVjdHMgd2l0aCBpbmRleCBhbmQgc29ydC12YWx1ZVxuXHRcdG1hcHBlZCA9IHZhbHVlLm1hcChmdW5jdGlvbihpdGVtLCBpKSB7XG5cdFx0XHRpdGVtID0gZGlyZWN0U29ydCA/IGl0ZW0gOiBnZXRQYXRoT2JqZWN0KGl0ZW0sIHNvcnQpO1xuXHRcdFx0cmV0dXJuIHtpOiBpLCB2OiBcIlwiICsgaXRlbSA9PT0gaXRlbSA/IGl0ZW0udG9Mb3dlckNhc2UoKSA6IGl0ZW19O1xuXHRcdH0pO1xuXHRcdC8vIFNvcnQgbWFwcGVkIGFycmF5XG5cdFx0bWFwcGVkLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0cmV0dXJuIGEudiA+IGIudiA/IHJldmVyc2UgOiBhLnYgPCBiLnYgPyAtcmV2ZXJzZSA6IDA7XG5cdFx0fSk7XG5cdFx0Ly8gTWFwIHRvIG5ldyBhcnJheSB3aXRoIHJlc3VsdGluZyBvcmRlclxuXHRcdHZhbHVlID0gbWFwcGVkLm1hcChmdW5jdGlvbihpdGVtKXtcblx0XHRcdHJldHVybiB2YWx1ZVtpdGVtLmldO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKChzb3J0IHx8IHJldmVyc2UgPCAwKSAmJiAhdGFnLmRhdGFNYXApIHtcblx0XHR2YWx1ZSA9IHZhbHVlLnNsaWNlKCk7IC8vIENsb25lIGFycmF5IGZpcnN0IGlmIG5vdCBhbHJlYWR5IGEgbmV3IGFycmF5XG5cdH1cblx0aWYgKCRpc0Z1bmN0aW9uKHNvcnQpKSB7XG5cdFx0dmFsdWUgPSB2YWx1ZS5zb3J0KHNvcnQpO1xuXHR9XG5cdGlmIChyZXZlcnNlIDwgMCAmJiAhc29ydCkgeyAvLyBSZXZlcnNlIHJlc3VsdCBpZiBub3QgYWxyZWFkeSByZXZlcnNlZCBpbiBzb3J0XG5cdFx0dmFsdWUgPSB2YWx1ZS5yZXZlcnNlKCk7XG5cdH1cblxuXHRpZiAodmFsdWUuZmlsdGVyICYmIGZpbHRlcikgeyAvLyBJRTggZG9lcyBub3Qgc3VwcG9ydCBmaWx0ZXJcblx0XHR2YWx1ZSA9IHZhbHVlLmZpbHRlcihmaWx0ZXIsIHRhZ0N0eCk7XG5cdFx0aWYgKHRhZ0N0eC50YWcub25GaWx0ZXIpIHtcblx0XHRcdHRhZ0N0eC50YWcub25GaWx0ZXIodGFnQ3R4KTtcblx0XHR9XG5cdH1cblxuXHRpZiAocHJvcFBhcmFtcy5zb3J0ZWQpIHtcblx0XHRtYXBwZWQgPSAoc29ydCB8fCByZXZlcnNlIDwgMCkgPyB2YWx1ZSA6IHZhbHVlLnNsaWNlKCk7XG5cdFx0aWYgKHRhZy5zb3J0ZWQpIHtcblx0XHRcdCQub2JzZXJ2YWJsZSh0YWcuc29ydGVkKS5yZWZyZXNoKG1hcHBlZCk7IC8vIE5vdGUgdGhhdCB0aGlzIG1pZ2h0IGNhdXNlIHRoZSBzdGFydCBhbmQgZW5kIHByb3BzIHRvIGJlIG1vZGlmaWVkIC0gZS5nLiBieSBwYWdlciB0YWcgY29udHJvbFxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YWdDdHgubWFwLnNvcnRlZCA9IG1hcHBlZDtcblx0XHR9XG5cdH1cblxuXHRzdGFydCA9IHByb3BzLnN0YXJ0OyAvLyBHZXQgY3VycmVudCB2YWx1ZSAtIGFmdGVyIHBvc3NpYmxlICBjaGFuZ2VzIHRyaWdnZXJlZCBieSB0YWcuc29ydGVkIHJlZnJlc2goKSBhYm92ZVxuXHRlbmQgPSBwcm9wcy5lbmQ7XG5cdGlmIChwcm9wUGFyYW1zLnN0YXJ0ICYmIHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgcHJvcFBhcmFtcy5lbmQgJiYgZW5kID09PSB1bmRlZmluZWQpIHtcblx0XHRzdGFydCA9IGVuZCA9IDA7XG5cdH1cblx0aWYgKCFpc05hTihzdGFydCkgfHwgIWlzTmFOKGVuZCkpIHsgLy8gc3RhcnQgb3IgZW5kIHNwZWNpZmllZCwgYnV0IG5vdCB0aGUgYXV0by1jcmVhdGUgTnVtYmVyIGFycmF5IHNjZW5hcmlvIG9mIHt7Zm9yIHN0YXJ0PXh4eCBlbmQ9eXl5fX1cblx0XHRzdGFydCA9ICtzdGFydCB8fCAwO1xuXHRcdGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHZhbHVlLmxlbmd0aCA/IHZhbHVlLmxlbmd0aCA6ICtlbmQ7XG4vL1x0XHRlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHZhbHVlLmxlbmd0aCA6ICtlbmQ7XG5cdFx0dmFsdWUgPSB2YWx1ZS5zbGljZShzdGFydCwgZW5kKTtcblx0fVxuXHRpZiAoc3RlcCA+IDEpIHtcblx0XHRzdGFydCA9IDA7XG5cdFx0ZW5kID0gdmFsdWUubGVuZ3RoO1xuXHRcdG1hcHBlZCA9IFtdO1xuXHRcdGZvciAoOyBzdGFydDxlbmQ7IHN0YXJ0Kz1zdGVwKSB7XG5cdFx0XHRtYXBwZWQucHVzaCh2YWx1ZVtzdGFydF0pO1xuXHRcdH1cblx0XHR2YWx1ZSA9IG1hcHBlZDtcblx0fVxuXHRpZiAocHJvcFBhcmFtcy5wYWdlZCAmJiB0YWcucGFnZWQpIHtcblx0XHQkb2JzZXJ2YWJsZSh0YWcucGFnZWQpLnJlZnJlc2godmFsdWUpO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiAkZm5SZW5kZXIoZGF0YSwgY29udGV4dCwgbm9JdGVyYXRpb24pIHtcblx0dmFyIHRtcGxFbGVtID0gdGhpcy5qcXVlcnkgJiYgKHRoaXNbMF0gfHwgZXJyb3IoJ1Vua25vd24gdGVtcGxhdGUnKSksIC8vIFRhcmdldGVkIGVsZW1lbnQgbm90IGZvdW5kIGZvciBqUXVlcnkgdGVtcGxhdGUgc2VsZWN0b3Igc3VjaCBhcyBcIiNteVRtcGxcIlxuXHRcdHRtcGwgPSB0bXBsRWxlbS5nZXRBdHRyaWJ1dGUodG1wbEF0dHIpO1xuXG5cdHJldHVybiByZW5kZXJDb250ZW50LmNhbGwodG1wbCAmJiAkLmRhdGEodG1wbEVsZW0pW2pzdlRtcGxdIHx8ICR0ZW1wbGF0ZXModG1wbEVsZW0pLFxuXHRcdGRhdGEsIGNvbnRleHQsIG5vSXRlcmF0aW9uKTtcbn1cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PSBSZWdpc3RlciBjb252ZXJ0ZXJzID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGdldENoYXJFbnRpdHkoY2gpIHtcblx0Ly8gR2V0IGNoYXJhY3RlciBlbnRpdHkgZm9yIEhUTUwsIEF0dHJpYnV0ZSBhbmQgb3B0aW9uYWwgZGF0YSBlbmNvZGluZ1xuXHRyZXR1cm4gY2hhckVudGl0aWVzW2NoXSB8fCAoY2hhckVudGl0aWVzW2NoXSA9IFwiJiNcIiArIGNoLmNoYXJDb2RlQXQoMCkgKyBcIjtcIik7XG59XG5cbmZ1bmN0aW9uIGdldENoYXJGcm9tRW50aXR5KG1hdGNoLCB0b2tlbikge1xuXHQvLyBHZXQgY2hhcmFjdGVyIGZyb20gSFRNTCBlbnRpdHksIGZvciBvcHRpb25hbCBkYXRhIHVuZW5jb2Rpbmdcblx0cmV0dXJuIGNoYXJzRnJvbUVudGl0aWVzW3Rva2VuXSB8fCBcIlwiO1xufVxuXG5mdW5jdGlvbiBodG1sRW5jb2RlKHRleHQpIHtcblx0Ly8gSFRNTCBlbmNvZGU6IFJlcGxhY2UgPCA+ICYgJyBcIiBgIGV0Yy4gYnkgY29ycmVzcG9uZGluZyBlbnRpdGllcy5cblx0cmV0dXJuIHRleHQgIT0gdW5kZWZpbmVkID8gcklzSHRtbC50ZXN0KHRleHQpICYmIChcIlwiICsgdGV4dCkucmVwbGFjZShySHRtbEVuY29kZSwgZ2V0Q2hhckVudGl0eSkgfHwgdGV4dCA6IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGRhdGFFbmNvZGUodGV4dCkge1xuXHQvLyBFbmNvZGUganVzdCA8ID4gYW5kICYgLSBpbnRlbmRlZCBmb3IgJ3NhZmUgZGF0YScgYWxvbmcgd2l0aCB7ezp9fSByYXRoZXIgdGhhbiB7ez59fVxuICByZXR1cm4gXCJcIiArIHRleHQgPT09IHRleHQgPyB0ZXh0LnJlcGxhY2UockRhdGFFbmNvZGUsIGdldENoYXJFbnRpdHkpIDogdGV4dDtcbn1cblxuZnVuY3Rpb24gZGF0YVVuZW5jb2RlKHRleHQpIHtcbiAgLy8gVW5lbmNvZGUganVzdCA8ID4gYW5kICYgLSBpbnRlbmRlZCBmb3IgJ3NhZmUgZGF0YScgYWxvbmcgd2l0aCB7ezp9fSByYXRoZXIgdGhhbiB7ez59fVxuICByZXR1cm4gXCJcIiArIHRleHQgPT09IHRleHQgPyB0ZXh0LnJlcGxhY2UockRhdGFVbmVuY29kZSwgZ2V0Q2hhckZyb21FbnRpdHkpIDogdGV4dDtcbn1cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PSBJbml0aWFsaXplID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiRzdWIgPSAkdmlld3Muc3ViO1xuJHZpZXdzU2V0dGluZ3MgPSAkdmlld3Muc2V0dGluZ3M7XG5cbmlmICghKGpzciB8fCAkICYmICQucmVuZGVyKSkge1xuXHQvLyBKc1JlbmRlciBub3QgYWxyZWFkeSBsb2FkZWQsIG9yIGxvYWRlZCB3aXRob3V0IGpRdWVyeSwgYW5kIHdlIGFyZSBub3cgbW92aW5nIGZyb20ganNyZW5kZXIgbmFtZXNwYWNlIHRvIGpRdWVyeSBuYW1lcGFjZVxuXHRmb3IgKGpzdlN0b3JlTmFtZSBpbiBqc3ZTdG9yZXMpIHtcblx0XHRyZWdpc3RlclN0b3JlKGpzdlN0b3JlTmFtZSwganN2U3RvcmVzW2pzdlN0b3JlTmFtZV0pO1xuXHR9XG5cblx0JGNvbnZlcnRlcnMgPSAkdmlld3MuY29udmVydGVycztcblx0JGhlbHBlcnMgPSAkdmlld3MuaGVscGVycztcblx0JHRhZ3MgPSAkdmlld3MudGFncztcblxuXHQkc3ViLl90Zy5wcm90b3R5cGUgPSB7XG5cdFx0YmFzZUFwcGx5OiBiYXNlQXBwbHksXG5cdFx0Y3Z0QXJnczogY29udmVydEFyZ3MsXG5cdFx0Ym5kQXJnczogY29udmVydEJvdW5kQXJncyxcblx0XHRjdHhQcm06IGNvbnRleHRQYXJhbWV0ZXJcblx0fTtcblxuXHR0b3BWaWV3ID0gJHN1Yi50b3BWaWV3ID0gbmV3IFZpZXcoKTtcblxuXHQvL0JST1dTRVItU1BFQ0lGSUMgQ09ERVxuXHRpZiAoJCkge1xuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8galF1ZXJ5ICg9ICQpIGlzIGxvYWRlZFxuXG5cdFx0JC5mbi5yZW5kZXIgPSAkZm5SZW5kZXI7XG5cdFx0JGV4cGFuZG8gPSAkLmV4cGFuZG87XG5cdFx0aWYgKCQub2JzZXJ2YWJsZSkge1xuXHRcdFx0aWYgKHZlcnNpb25OdW1iZXIgIT09ICh2ZXJzaW9uTnVtYmVyID0gJC52aWV3cy5qc3ZpZXdzKSkge1xuXHRcdFx0XHQvLyBEaWZmZXJlbnQgdmVyc2lvbiBvZiBqc1JlbmRlciB3YXMgbG9hZGVkXG5cdFx0XHRcdHRocm93IFwiSnNPYnNlcnZhYmxlIHJlcXVpcmVzIEpzUmVuZGVyIFwiICsgdmVyc2lvbk51bWJlcjtcblx0XHRcdH1cblx0XHRcdCRleHRlbmQoJHN1YiwgJC52aWV3cy5zdWIpOyAvLyBqcXVlcnkub2JzZXJ2YWJsZS5qcyB3YXMgbG9hZGVkIGJlZm9yZSBqc3JlbmRlci5qc1xuXHRcdFx0JHZpZXdzLm1hcCA9ICQudmlld3MubWFwO1xuXHRcdH1cblxuXHR9IGVsc2Uge1xuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vIGpRdWVyeSBpcyBub3QgbG9hZGVkLlxuXG5cdFx0JCA9IHt9O1xuXG5cdFx0aWYgKHNldEdsb2JhbHMpIHtcblx0XHRcdGdsb2JhbC5qc3JlbmRlciA9ICQ7IC8vIFdlIGFyZSBsb2FkaW5nIGpzcmVuZGVyLmpzIGZyb20gYSBzY3JpcHQgZWxlbWVudCwgbm90IEFNRCBvciBDb21tb25KUywgc28gc2V0IGdsb2JhbFxuXHRcdH1cblxuXHRcdC8vIEVycm9yIHdhcm5pbmcgaWYganNyZW5kZXIuanMgaXMgdXNlZCBhcyB0ZW1wbGF0ZSBlbmdpbmUgb24gTm9kZS5qcyAoZS5nLiBFeHByZXNzIG9yIEhhcGkuLi4pXG5cdFx0Ly8gVXNlIGpzcmVuZGVyLW5vZGUuanMgaW5zdGVhZC4uLlxuXHRcdCQucmVuZGVyRmlsZSA9ICQuX19leHByZXNzID0gJC5jb21waWxlID0gZnVuY3Rpb24oKSB7IHRocm93IFwiTm9kZS5qczogdXNlIG5wbSBqc3JlbmRlciwgb3IganNyZW5kZXItbm9kZS5qc1wiOyB9O1xuXG5cdFx0Ly9FTkQgQlJPV1NFUi1TUEVDSUZJQyBDT0RFXG5cdFx0JC5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2IpIHtcblx0XHRcdHJldHVybiB0eXBlb2Ygb2IgPT09IFwiZnVuY3Rpb25cIjtcblx0XHR9O1xuXG5cdFx0JC5pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcblx0XHRcdHJldHVybiAoe30udG9TdHJpbmcpLmNhbGwob2JqKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuXHRcdH07XG5cblx0XHQkc3ViLl9qcSA9IGZ1bmN0aW9uKGpxKSB7IC8vIHByaXZhdGUgbWV0aG9kIHRvIG1vdmUgZnJvbSBKc1JlbmRlciBBUElzIGZyb20ganNyZW5kZXIgbmFtZXNwYWNlIHRvIGpRdWVyeSBuYW1lc3BhY2Vcblx0XHRcdGlmIChqcSAhPT0gJCkge1xuXHRcdFx0XHQkZXh0ZW5kKGpxLCAkKTsgLy8gbWFwIG92ZXIgZnJvbSBqc3JlbmRlciBuYW1lc3BhY2UgdG8galF1ZXJ5IG5hbWVzcGFjZVxuXHRcdFx0XHQkID0ganE7XG5cdFx0XHRcdCQuZm4ucmVuZGVyID0gJGZuUmVuZGVyO1xuXHRcdFx0XHRkZWxldGUgJC5qc3JlbmRlcjtcblx0XHRcdFx0JGV4cGFuZG8gPSAkLmV4cGFuZG87XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdCQuanNyZW5kZXIgPSB2ZXJzaW9uTnVtYmVyO1xuXHR9XG5cdCRzdWJTZXR0aW5ncyA9ICRzdWIuc2V0dGluZ3M7XG5cdCRzdWJTZXR0aW5ncy5hbGxvd0NvZGUgPSBmYWxzZTtcblx0JGlzRnVuY3Rpb24gPSAkLmlzRnVuY3Rpb247XG5cdCQucmVuZGVyID0gJHJlbmRlcjtcblx0JC52aWV3cyA9ICR2aWV3cztcblx0JC50ZW1wbGF0ZXMgPSAkdGVtcGxhdGVzID0gJHZpZXdzLnRlbXBsYXRlcztcblxuXHRmb3IgKHNldHRpbmcgaW4gJHN1YlNldHRpbmdzKSB7XG5cdFx0YWRkU2V0dGluZyhzZXR0aW5nKTtcblx0fVxuXG5cdCgkdmlld3NTZXR0aW5ncy5kZWJ1Z01vZGUgPSBmdW5jdGlvbihkZWJ1Z01vZGUpIHtcblx0XHRyZXR1cm4gZGVidWdNb2RlID09PSB1bmRlZmluZWRcblx0XHRcdD8gJHN1YlNldHRpbmdzLmRlYnVnTW9kZVxuXHRcdFx0OiAoXG5cdFx0XHRcdCRzdWJTZXR0aW5ncy5kZWJ1Z01vZGUgPSBkZWJ1Z01vZGUsXG5cdFx0XHRcdCRzdWJTZXR0aW5ncy5vbkVycm9yID0gZGVidWdNb2RlICsgXCJcIiA9PT0gZGVidWdNb2RlXG5cdFx0XHRcdFx0PyBmdW5jdGlvbigpIHsgcmV0dXJuIGRlYnVnTW9kZTsgfVxuXHRcdFx0XHRcdDogJGlzRnVuY3Rpb24oZGVidWdNb2RlKVxuXHRcdFx0XHRcdFx0PyBkZWJ1Z01vZGVcblx0XHRcdFx0XHRcdDogdW5kZWZpbmVkLFxuXHRcdFx0XHQkdmlld3NTZXR0aW5ncyk7XG5cdH0pKGZhbHNlKTsgLy8ganNoaW50IGlnbm9yZTpsaW5lXG5cblx0JHN1YlNldHRpbmdzQWR2YW5jZWQgPSAkc3ViU2V0dGluZ3MuYWR2YW5jZWQgPSB7XG5cdFx0dXNlVmlld3M6IGZhbHNlLFxuXHRcdF9qc3Y6IGZhbHNlIC8vIEZvciBnbG9iYWwgYWNjZXNzIHRvIEpzVmlld3Mgc3RvcmVcblx0fTtcblxuXHQvLz09PT09PT09PT09PT09PT09PT09PT09PT09IFJlZ2lzdGVyIHRhZ3MgPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuXHQkdGFncyh7XG5cdFx0XCJpZlwiOiB7XG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKHZhbCkge1xuXHRcdFx0XHQvLyBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbmNlIGZvciB7e2lmfX0gYW5kIG9uY2UgZm9yIGVhY2gge3tlbHNlfX0uXG5cdFx0XHRcdC8vIFdlIHdpbGwgdXNlIHRoZSB0YWcucmVuZGVyaW5nIG9iamVjdCBmb3IgY2FycnlpbmcgcmVuZGVyaW5nIHN0YXRlIGFjcm9zcyB0aGUgY2FsbHMuXG5cdFx0XHRcdC8vIElmIG5vdCBkb25lIChhIHByZXZpb3VzIGJsb2NrIGhhcyBub3QgYmVlbiByZW5kZXJlZCksIGxvb2sgYXQgZXhwcmVzc2lvbiBmb3IgdGhpcyBibG9jayBhbmQgcmVuZGVyIHRoZSBibG9jayBpZiBleHByZXNzaW9uIGlzIHRydXRoeVxuXHRcdFx0XHQvLyBPdGhlcndpc2UgcmV0dXJuIFwiXCJcblx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRcdHRhZ0N0eCA9IHNlbGYudGFnQ3R4LFxuXHRcdFx0XHRcdHJldCA9IChzZWxmLnJlbmRlcmluZy5kb25lIHx8ICF2YWwgJiYgKHRhZ0N0eC5hcmdzLmxlbmd0aCB8fCAhdGFnQ3R4LmluZGV4KSlcblx0XHRcdFx0XHRcdD8gXCJcIlxuXHRcdFx0XHRcdFx0OiAoc2VsZi5yZW5kZXJpbmcuZG9uZSA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdHNlbGYuc2VsZWN0ZWQgPSB0YWdDdHguaW5kZXgsXG5cdFx0XHRcdFx0XHRcdHVuZGVmaW5lZCk7IC8vIFRlc3QgaXMgc2F0aXNmaWVkLCBzbyByZW5kZXIgY29udGVudCBvbiBjdXJyZW50IGNvbnRleHRcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH0sXG5cdFx0XHRjb250ZW50Q3R4OiB0cnVlLCAvLyBJbmhlcml0IHBhcmVudCB2aWV3IGRhdGEgY29udGV4dFxuXHRcdFx0ZmxvdzogdHJ1ZVxuXHRcdH0sXG5cdFx0XCJmb3JcIjoge1xuXHRcdFx0c29ydERhdGFNYXA6IGRhdGFNYXAoZ2V0VGFyZ2V0U29ydGVkKSxcblx0XHRcdGluaXQ6IGZ1bmN0aW9uKHZhbCwgY2xvbmVkKSB7XG5cdFx0XHRcdHZhciBsLCB0YWdDdHgsIHByb3BzLCBzb3J0LFxuXHRcdFx0XHRcdHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRcdHRhZ0N0eHMgPSBzZWxmLnRhZ0N0eHM7XG5cdFx0XHRcdGwgPSB0YWdDdHhzLmxlbmd0aDtcblx0XHRcdFx0d2hpbGUgKGwtLSkge1xuXHRcdFx0XHRcdHRhZ0N0eCA9IHRhZ0N0eHNbbF07XG5cdFx0XHRcdFx0cHJvcHMgPSB0YWdDdHgucHJvcHM7XG5cdFx0XHRcdFx0dGFnQ3R4LmFyZ0RlZmF1bHQgPSBwcm9wcy5lbmQgPT09IHVuZGVmaW5lZCB8fCB0YWdDdHguYXJncy5sZW5ndGggPiAwOyAvLyBEZWZhdWx0IHRvICNkYXRhIGV4Y2VwdCBmb3IgYXV0by1jcmVhdGUgcmFuZ2Ugc2NlbmFyaW8ge3tmb3Igc3RhcnQ9eHh4IGVuZD15eXkgc3RlcD16enp9fVxuXG5cdFx0XHRcdFx0aWYgKHRhZ0N0eC5hcmdEZWZhdWx0ICE9PSBmYWxzZSAmJiAkaXNBcnJheSh0YWdDdHguYXJnc1swXSlcblx0XHRcdFx0XHRcdCYmIChwcm9wcy5zb3J0ICE9PSB1bmRlZmluZWQgfHwgdGFnQ3R4LnBhcmFtcy5wcm9wcy5zdGFydCB8fCB0YWdDdHgucGFyYW1zLnByb3BzLmVuZCB8fCBwcm9wcy5zdGVwICE9PSB1bmRlZmluZWQgfHwgcHJvcHMuZmlsdGVyIHx8IHByb3BzLnJldmVyc2UpKSB7XG5cdFx0XHRcdFx0XHRwcm9wcy5kYXRhTWFwID0gc2VsZi5zb3J0RGF0YU1hcDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRyZW5kZXI6IGZ1bmN0aW9uKHZhbCkge1xuXHRcdFx0XHQvLyBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbmNlIGZvciB7e2Zvcn19IGFuZCBvbmNlIGZvciBlYWNoIHt7ZWxzZX19LlxuXHRcdFx0XHQvLyBXZSB3aWxsIHVzZSB0aGUgdGFnLnJlbmRlcmluZyBvYmplY3QgZm9yIGNhcnJ5aW5nIHJlbmRlcmluZyBzdGF0ZSBhY3Jvc3MgdGhlIGNhbGxzLlxuXHRcdFx0XHR2YXIgdmFsdWUsIGZpbHRlciwgc3J0RmllbGQsIGlzQXJyYXksIGksIHNvcnRlZCwgZW5kLCBzdGVwLFxuXHRcdFx0XHRcdHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRcdHRhZ0N0eCA9IHNlbGYudGFnQ3R4LFxuXHRcdFx0XHRcdHJhbmdlID0gdGFnQ3R4LmFyZ0RlZmF1bHQgPT09IGZhbHNlLFxuXHRcdFx0XHRcdHByb3BzID0gdGFnQ3R4LnByb3BzLFxuXHRcdFx0XHRcdGl0ZXJhdGUgPSAgcmFuZ2UgfHwgdGFnQ3R4LmFyZ3MubGVuZ3RoLCAvLyBOb3QgZmluYWwgZWxzZSBhbmQgbm90IGF1dG8tY3JlYXRlIHJhbmdlXG5cdFx0XHRcdFx0cmVzdWx0ID0gXCJcIixcblx0XHRcdFx0XHRkb25lID0gMDtcblxuXHRcdFx0XHRpZiAoIXNlbGYucmVuZGVyaW5nLmRvbmUpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGl0ZXJhdGUgPyB2YWwgOiB0YWdDdHgudmlldy5kYXRhOyAvLyBGb3IgdGhlIGZpbmFsIGVsc2UsIGRlZmF1bHRzIHRvIGN1cnJlbnQgZGF0YSB3aXRob3V0IGl0ZXJhdGlvbi5cblxuXHRcdFx0XHRcdGlmIChyYW5nZSkge1xuXHRcdFx0XHRcdFx0cmFuZ2UgPSBwcm9wcy5yZXZlcnNlID8gXCJ1bnNoaWZ0XCIgOiBcInB1c2hcIjtcblx0XHRcdFx0XHRcdGVuZCA9ICtwcm9wcy5lbmQ7XG5cdFx0XHRcdFx0XHRzdGVwID0gK3Byb3BzLnN0ZXAgfHwgMTtcblx0XHRcdFx0XHRcdHZhbHVlID0gW107IC8vIGF1dG8tY3JlYXRlIGludGVnZXIgYXJyYXkgc2NlbmFyaW8gb2Yge3tmb3Igc3RhcnQ9eHh4IGVuZD15eXl9fVxuXHRcdFx0XHRcdFx0Zm9yIChpID0gK3Byb3BzLnN0YXJ0IHx8IDA7IChlbmQgLSBpKSAqIHN0ZXAgPiAwOyBpICs9IHN0ZXApIHtcblx0XHRcdFx0XHRcdFx0dmFsdWVbcmFuZ2VdKGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0aXNBcnJheSA9ICRpc0FycmF5KHZhbHVlKTtcblx0XHRcdFx0XHRcdHJlc3VsdCArPSB0YWdDdHgucmVuZGVyKHZhbHVlLCAhaXRlcmF0ZSB8fCBwcm9wcy5ub0l0ZXJhdGlvbik7XG5cdFx0XHRcdFx0XHQvLyBJdGVyYXRlcyBpZiBkYXRhIGlzIGFuIGFycmF5LCBleGNlcHQgb24gZmluYWwgZWxzZSAtIG9yIGlmIG5vSXRlcmF0aW9uIHByb3BlcnR5XG5cdFx0XHRcdFx0XHQvLyBzZXQgdG8gdHJ1ZS4gKFVzZSB7e2luY2x1ZGV9fSB0byBjb21wb3NlIHRlbXBsYXRlcyB3aXRob3V0IGFycmF5IGl0ZXJhdGlvbilcblx0XHRcdFx0XHRcdGRvbmUgKz0gaXNBcnJheSA/IHZhbHVlLmxlbmd0aCA6IDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChzZWxmLnJlbmRlcmluZy5kb25lID0gZG9uZSkge1xuXHRcdFx0XHRcdFx0c2VsZi5zZWxlY3RlZCA9IHRhZ0N0eC5pbmRleDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gSWYgbm90aGluZyB3YXMgcmVuZGVyZWQgd2Ugd2lsbCBsb29rIGF0IHRoZSBuZXh0IHt7ZWxzZX19LiBPdGhlcndpc2UsIHdlIGFyZSBkb25lLlxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0XHR9LFxuXHRcdFx0ZmxvdzogdHJ1ZVxuXHRcdH0sXG5cdFx0cHJvcHM6IHtcblx0XHRcdGJhc2VUYWc6IFwiZm9yXCIsXG5cdFx0XHRkYXRhTWFwOiBkYXRhTWFwKGdldFRhcmdldFByb3BzKSxcblx0XHRcdGluaXQ6IG5vb3AsIC8vIERvbid0IGV4ZWN1dGUgdGhlIGJhc2UgaW5pdCgpIG9mIHRoZSBcImZvclwiIHRhZ1xuXHRcdFx0ZmxvdzogdHJ1ZVxuXHRcdH0sXG5cdFx0aW5jbHVkZToge1xuXHRcdFx0ZmxvdzogdHJ1ZVxuXHRcdH0sXG5cdFx0XCIqXCI6IHtcblx0XHRcdC8vIHt7KiBjb2RlLi4uIH19IC0gSWdub3JlZCBpZiB0ZW1wbGF0ZS5hbGxvd0NvZGUgYW5kICQudmlld3Muc2V0dGluZ3MuYWxsb3dDb2RlIGFyZSBmYWxzZS4gT3RoZXJ3aXNlIGluY2x1ZGUgY29kZSBpbiBjb21waWxlZCB0ZW1wbGF0ZVxuXHRcdFx0cmVuZGVyOiByZXRWYWwsXG5cdFx0XHRmbG93OiB0cnVlXG5cdFx0fSxcblx0XHRcIjoqXCI6IHtcblx0XHRcdC8vIHt7OiogcmV0dXJuZWRFeHByZXNzaW9uIH19IC0gSWdub3JlZCBpZiB0ZW1wbGF0ZS5hbGxvd0NvZGUgYW5kICQudmlld3Muc2V0dGluZ3MuYWxsb3dDb2RlIGFyZSBmYWxzZS4gT3RoZXJ3aXNlIGluY2x1ZGUgY29kZSBpbiBjb21waWxlZCB0ZW1wbGF0ZVxuXHRcdFx0cmVuZGVyOiByZXRWYWwsXG5cdFx0XHRmbG93OiB0cnVlXG5cdFx0fSxcblx0XHRkYmc6ICRoZWxwZXJzLmRiZyA9ICRjb252ZXJ0ZXJzLmRiZyA9IGRiZ0JyZWFrIC8vIFJlZ2lzdGVyIHt7ZGJnL319LCB7e2RiZzouLi59fSBhbmQgfmRiZygpIHRvIHRocm93IGFuZCBjYXRjaCwgYXMgYnJlYWtwb2ludHMgZm9yIGRlYnVnZ2luZy5cblx0fSk7XG5cblx0JGNvbnZlcnRlcnMoe1xuXHRcdGh0bWw6IGh0bWxFbmNvZGUsXG5cdFx0YXR0cjogaHRtbEVuY29kZSwgLy8gSW5jbHVkZXMgPiBlbmNvZGluZyBzaW5jZSByQ29udmVydE1hcmtlcnMgaW4gSnNWaWV3cyBkb2VzIG5vdCBza2lwID4gY2hhcmFjdGVycyBpbiBhdHRyaWJ1dGUgc3RyaW5nc1xuXHRcdGVuY29kZTogZGF0YUVuY29kZSxcblx0XHR1bmVuY29kZTogZGF0YVVuZW5jb2RlLCAvLyBJbmNsdWRlcyA+IGVuY29kaW5nIHNpbmNlIHJDb252ZXJ0TWFya2VycyBpbiBKc1ZpZXdzIGRvZXMgbm90IHNraXAgPiBjaGFyYWN0ZXJzIGluIGF0dHJpYnV0ZSBzdHJpbmdzXG5cdFx0dXJsOiBmdW5jdGlvbih0ZXh0KSB7XG5cdFx0XHQvLyBVUkwgZW5jb2RpbmcgaGVscGVyLlxuXHRcdFx0cmV0dXJuIHRleHQgIT0gdW5kZWZpbmVkID8gZW5jb2RlVVJJKFwiXCIgKyB0ZXh0KSA6IHRleHQgPT09IG51bGwgPyB0ZXh0IDogXCJcIjsgLy8gbnVsbCByZXR1cm5zIG51bGwsIGUuZy4gdG8gcmVtb3ZlIGF0dHJpYnV0ZS4gdW5kZWZpbmVkIHJldHVybnMgXCJcIlxuXHRcdH1cblx0fSk7XG59XG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09IERlZmluZSBkZWZhdWx0IGRlbGltaXRlcnMgPT09PT09PT09PT09PT09PT09PT09PT09PT1cbiRzdWJTZXR0aW5ncyA9ICRzdWIuc2V0dGluZ3M7XG4kaXNBcnJheSA9ICgkfHxqc3IpLmlzQXJyYXk7XG4kdmlld3NTZXR0aW5ncy5kZWxpbWl0ZXJzKFwie3tcIiwgXCJ9fVwiLCBcIl5cIik7XG5cbmlmIChqc3JUb0pxKSB7IC8vIE1vdmluZyBmcm9tIGpzcmVuZGVyIG5hbWVzcGFjZSB0byBqUXVlcnkgbmFtZXBhY2UgLSBjb3B5IG92ZXIgdGhlIHN0b3JlZCBpdGVtcyAodGVtcGxhdGVzLCBjb252ZXJ0ZXJzLCBoZWxwZXJzLi4uKVxuXHRqc3Iudmlld3Muc3ViLl9qcSgkKTtcbn1cbnJldHVybiAkIHx8IGpzcjtcbn0sIHdpbmRvdykpO1xuIiwiLypnbG9iYWwgUVVuaXQsIHRlc3QsIGVxdWFsLCBvayovXG4oZnVuY3Rpb24odW5kZWZpbmVkKSB7XG5cInVzZSBzdHJpY3RcIjtcblxuYnJvd3NlcmlmeS5kb25lLnR3ZWx2ZSA9IHRydWU7XG5cblFVbml0Lm1vZHVsZShcIkJyb3dzZXJpZnkgLSBjbGllbnQgY29kZVwiKTtcblxudmFyIGlzSUU4ID0gd2luZG93LmF0dGFjaEV2ZW50ICYmICF3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtcblxuaWYgKCFpc0lFOCkge1xuXG50ZXN0KFwiTm8galF1ZXJ5IGdsb2JhbDogcmVxdWlyZSgnanNyZW5kZXInKSgpIG5lc3RlZCB0ZW1wbGF0ZVwiLCBmdW5jdGlvbigpIHtcblx0Ly8gLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiBIaWRlIFFVbml0IGdsb2JhbCBqUXVlcnkgYW5kIGFueSBwcmV2aW91cyBnbG9iYWwganNyZW5kZXIuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cblx0dmFyIGpRdWVyeSA9IGdsb2JhbC5qUXVlcnksIGpzciA9IGdsb2JhbC5qc3JlbmRlcjtcblx0Z2xvYmFsLmpRdWVyeSA9IGdsb2JhbC5qc3JlbmRlciA9IHVuZGVmaW5lZDtcblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IEFycmFuZ2UgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHR2YXIgZGF0YSA9IHtuYW1lOiBcIkpvXCJ9O1xuXG5cdC8vIC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uIEFjdCAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5cdHZhciBqc3JlbmRlciA9IHJlcXVpcmUoJ2pzcmVuZGVyJykoKTsgLy8gTm90IHBhc3NpbmcgaW4galF1ZXJ5LCBzbyByZXR1cm5zIHRoZSBqc3JlbmRlciBuYW1lc3BhY2VcblxuXHQvLyBVc2UgcmVxdWlyZSB0byBnZXQgc2VydmVyIHRlbXBsYXRlLCB0aGFua3MgdG8gQnJvd3NlcmlmeSBidW5kbGUgdGhhdCB1c2VkIGpzcmVuZGVyL3RtcGxpZnkgdHJhbnNmb3JtXG5cdHZhciB0bXBsID0gcmVxdWlyZSgnLi4vdGVtcGxhdGVzL291dGVyLmh0bWwnKShqc3JlbmRlcik7IC8vIFByb3ZpZGUganNyZW5kZXJcblxuXHR2YXIgcmVzdWx0ID0gdG1wbChkYXRhKTtcblxuXHRyZXN1bHQgKz0gXCIgXCIgKyAoanNyZW5kZXIgIT09IGpRdWVyeSk7XG5cblx0Ly8gLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLiBBc3NlcnQgLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXG5cdGVxdWFsKHJlc3VsdCwgXCJOYW1lOiBKbyAob3V0ZXIuaHRtbCkgTmFtZTogSm8gKGlubmVyLmh0bWwpIHRydWVcIiwgXCJyZXN1bHQ6IE5vIGpRdWVyeSBnbG9iYWw6IHJlcXVpcmUoJ2pzcmVuZGVyJykoKSwgbmVzdGVkIHRlbXBsYXRlc1wiKTtcblxuXHQvLyAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uIFJlc2V0IC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxuXHRnbG9iYWwualF1ZXJ5ID0galF1ZXJ5OyAvLyBSZXBsYWNlIFFVbml0IGdsb2JhbCBqUXVlcnlcblx0Z2xvYmFsLmpzcmVuZGVyID0ganNyOyAvLyBSZXBsYWNlIGFueSBwcmV2aW91cyBnbG9iYWwganNyZW5kZXJcbn0pO1xufVxufSkoKTtcbiIsInZhciB0bXBsUmVmcyA9IFtdLFxuICBta3VwID0gJ05hbWU6IHt7Om5hbWV9fSAoaW5uZXIuaHRtbCknLFxuICAkID0gZ2xvYmFsLmpzcmVuZGVyIHx8IGdsb2JhbC5qUXVlcnk7XG5cbm1vZHVsZS5leHBvcnRzID0gJCA/ICQudGVtcGxhdGVzKFwiLi90ZXN0L3RlbXBsYXRlcy9pbm5lci5odG1sXCIsIG1rdXApIDpcbiAgZnVuY3Rpb24oJCkge1xuICAgIGlmICghJCB8fCAhJC52aWV3cykge3Rocm93IFwiUmVxdWlyZXMganNyZW5kZXIvalF1ZXJ5XCI7fVxuICAgIHdoaWxlICh0bXBsUmVmcy5sZW5ndGgpIHtcbiAgICAgIHRtcGxSZWZzLnBvcCgpKCQpOyAvLyBjb21waWxlIG5lc3RlZCB0ZW1wbGF0ZVxuICAgIH1cblxuICAgIHJldHVybiAkLnRlbXBsYXRlcyhcIi4vdGVzdC90ZW1wbGF0ZXMvaW5uZXIuaHRtbFwiLCBta3VwKVxuICB9OyIsInZhciB0bXBsUmVmcyA9IFtdLFxuICBta3VwID0gJ05hbWU6IHt7Om5hbWV9fSAob3V0ZXIuaHRtbCkge3tpbmNsdWRlIHRtcGw9XFxcIi4vdGVzdC90ZW1wbGF0ZXMvaW5uZXIuaHRtbFxcXCIvfX0nLFxuICAkID0gZ2xvYmFsLmpzcmVuZGVyIHx8IGdsb2JhbC5qUXVlcnk7XG5cbnRtcGxSZWZzLnB1c2gocmVxdWlyZShcIi4vaW5uZXIuaHRtbFwiKSk7XG5tb2R1bGUuZXhwb3J0cyA9ICQgPyAkLnRlbXBsYXRlcyhcIi4vdGVzdC90ZW1wbGF0ZXMvb3V0ZXIuaHRtbFwiLCBta3VwKSA6XG4gIGZ1bmN0aW9uKCQpIHtcbiAgICBpZiAoISQgfHwgISQudmlld3MpIHt0aHJvdyBcIlJlcXVpcmVzIGpzcmVuZGVyL2pRdWVyeVwiO31cbiAgICB3aGlsZSAodG1wbFJlZnMubGVuZ3RoKSB7XG4gICAgICB0bXBsUmVmcy5wb3AoKSgkKTsgLy8gY29tcGlsZSBuZXN0ZWQgdGVtcGxhdGVcbiAgICB9XG5cbiAgICByZXR1cm4gJC50ZW1wbGF0ZXMoXCIuL3Rlc3QvdGVtcGxhdGVzL291dGVyLmh0bWxcIiwgbWt1cClcbiAgfTsiXX0=
