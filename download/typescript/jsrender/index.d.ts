// Type definitions for JsRender 1.0.0
// Project: http://www.jsviews.com/
// Definitions by: Boris Moore <https://github.com/borismoore>
// Definitions at: https://www.jsviews.com/#typescript
// Will also be at: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.1.6

/// <reference types="jquery" />

declare module 'jsrender' {
    export = jsrender;
}

declare const jsrender: JQueryStatic;

interface JQueryStatic {
	/* var htmlString = $.render.templateName(data, myHelpersObject); // Render named template */
	render: {
		[tmplName: string]: JsViews.TemplateRender;
	};

	/* $.views.xxx ... // JsRender/JsViews APIs */
	views: JsViews.Views;

	/* $.templates(...) or $.templates.templateName: Compile/get template */
	templates: JsViews.Templates;
}

interface JQuery {
	/* var htmlString = $("#template").render(data, myHelpersObject); // Render template, and pass in helpers or context */
	render: JsViews.TemplateRender;
}

declare namespace JsViews {

/* Generic hash of objects of type T */
interface Hash<T> {
	[option: string]: T;
}

/* $.views*/
interface Views {
	/* $.views.templates() */
	templates: Templates;

	/* $.views.converters() */
	converters: Store<Converter, Converter>;

	/* $.views.tags() */
	tags: Store<Tag, TagOptions | string | ((...args: any[]) => any)>;

	/* $.views.helpers() */
	helpers: Store<any, any>;

	/* $.views.viewModels() */
	viewModels: ViewModels;

	/* $.views.settings */
	settings: Settings;

	/* $.views.sub.xxx */
	sub: object;

	/* $.views.map() */
	map: () => any;
}

/* $.views.settings*/
interface Settings {
	/**
	* Set delimiters
	* $.views.settings.delimiters(...)
	*
	* @param {string}   openChars
	* @param {string}   [closeChars]
	* @param {string}   [link]
	* @returns {Settings}
	*/
	delimiters(openChars: string, closeChars?: string, link?: string): Settings;
	delimiters(chars: string[]): Settings;
	/**
	* Get delimiters
	* delimsArray = $.views.settings.delimiters()
	*
	* @returns {string[]}
	*/
	delimiters(): string[];

	/**
	* Set debug mode
	* $.views.settings.debugMode(true)
	*
	* @param {boolean}  debugMode
	* @returns {Settings}
	*/
	debugMode(debugMode: boolean): Settings;
	/**
	* Get debug mode setting
	* debugMode = $.views.settings.debugMode()
	*
	* @returns {boolean}
	*/
	debugMode(): boolean;

	/**
	* Set allowCode mode
	* $.views.settings.allowCode(true)
	*
	* @param {boolean}  allowCode
	* @returns {Settings}
	*/
	allowCode(allowCode: boolean): Settings;
	/**
	* Get allowCode mode setting
	* allowCode = $.views.settings.allowCode()
	*
	* @returns {boolean}
	*/
	allowCode(): boolean;

	/**
	* Set advanced settings (useViews, _jsv ...)
	* $.views.settings.advanced({useViews: true})
	*
	* @param {object}  settings
	* @returns {Settings}
	*/
	advanced(settings: Hash<any>): Settings;
	/**
	* Get advanced settings
	* advancedSettings = $.views.settings.advanced()
	*
	* @returns {object}
	*/
	advanced(): Hash<any>;
}

interface Store<T, TO> {
	/**
	* Generic store() function to register item, named item, or hash of items
	* Also used as hash to store the registered items
	* Used as implementation of $.templates(), $.views.templates(), $.views.tags(), $.views.helpers() and $.views.converters()
	*
	* @param {string|hash}   name         name - or selector, in case of $.templates(). Or hash of items
	* @param {any}           [item]       (e.g. markup for named template)
	* @param {Template}      [parentTmpl] For item being registered as private resource of template
	* @returns {any|Views}              e.g. compiled template - or $.views in case of registering hash of items
	*/
	(name: string, item?: TO|string, parentTmpl?: Template): T; // named item
	(namedItems: Hash<TO>, parentTmpl?: Template): Views; // Multiple named items

	/**
	* var template = $.templates.templateName; // Get compiled named template - or similar for named tags, converters, helpers, viewModels
	*/
	[itemName: string]: T;
}

// Templates

interface Templates extends Store<Template, TemplateOptions> {
	/**
	* Additional $.templates() signature for compiling unnmaed template
	*
	* @param {string|TemplateOptions}   markup or selector
	* @param {Template}                 [parentTmpl] For compling template as private resource of parent template
	* @returns {Template}               compiled template
	*/
	(markupOrSelectorOrOptions: string | TemplateOptions, parentTmpl?: Template): Template; // Unnamed template
}

interface TemplateOptions {
	/* Template options hash */
	markup: any;
	converters?: Hash<Converter>;
	tags?: Hash<any>;
	helpers?: Hash<any>;
	viewModels?: Hash<ViewModel>;
	templates?: Hash<any>;
	useViews?: boolean;
}

interface Template extends TemplateRender, TemplateOptions {
	/* Compiled template object */
	tmplName: string;
	render: TemplateRender;
}

interface TemplateRender {
	/**
	* Template render method: render the template as a string, using the specified data and helpers/context
	* var htmlString = template(data, myHelpersObject);
	* var htmlString = template.render(data, myHelpersObject);
	*
	* $("#tmpl").render(), tmpl.render(), tagCtx.render(), $.render.namedTmpl()
	*
	* @param {any}        data
	* @param {hash}       [helpersOrContext]
	* @param {boolean}    [noIteration]
	* @returns {string}   rendered template
	*/
	(data?: any, helpersOrContext?: Hash<any>, noIteration?: boolean): string;
	(data?: any, noIteration?: boolean): string;
}

// ViewModels

interface ViewModel {
	/* ViewModel options hash */
	getters: string[];
	extend: Hash<any>;
	map: (data: any) => any;
	(...args: any[]): any;
	[prop: string]: any;
}

interface ViewModels extends Hash<ViewModel> {
	/* $.views.viewModels() */
	(namedItems: Hash<object>, viewModels?: Hash<any>): Views;
}

// Converters

interface Converter {
	/* Converter function */
	(value: any, ...restArgs: any[]): any;
}

// Tags

interface TagOptions {
	/* Tag options hash */
	init? (this: Tag, tagCtx: TagCtx, linkCtx: boolean, ctx: Context): void;
	render?: (this:Tag, ...args: any[]) => string|void;
	template?: Template | string;
	baseTag?: string;
	contentCtx?: boolean | ((arg0: any) => any);
	convert?: string|Converter;
	argDefault?: boolean;
	bindTo?: number | string | (number|string)[];
	bindFrom?: number | string | (number|string)[];
	flow?: boolean;
	ctx?: Hash<any>;
	[prop: string]: any;
}

interface Tag extends TagOptions {
	/* Tag object */
	tagCtx: TagCtx;
	tagCtxs: TagCtx[];
	tagName: string;
	parent?: Tag;
	parents?: Hash <Tag>;
	rendering?: Hash<any>;
	ctxPrm: (name: string, value?: any) => any | void; // get/set in JsViews but get only in JsRender
	cvtArgs: (elseBlock?: number) => any[] | void;
	bndArgs: (elseBlock?: number) => any[] | void;
	base?: (...args: any[]) => any;
	baseApply?: (args: any[]|IArguments) => any;
}

interface Context {
	/* ctx object */
	/* Root data object or array */
	root: any;

	/* This tag */
	tag?: Tag;

	/* Ancestor tags */
	parentTags?: Hash<Tag>;

	/* tagCtx object */
	tagCtx?: any;

	[prop: string]: any;
}

interface TagCtxParams {
	/* tagCtx.params object */
	args: string[];
	props: Hash<string>;
	ctx: Hash<string>;
}

interface TagCtx {
	/* tagCtx object */
	/* Arguments passed declaratively */
	args: any[];

	/* Properties passed declaratively */
	props: Hash<any>;

	/* Declarative tag parameter string */
	params: TagCtxParams;

	/* Template for wrapped content. Otherwise, false */
	tmpl: Template | boolean;

	/* Tag block content template */
	content: Template | boolean;

	/* Tag instance index (if siblings rendered against array data) */
	index: number;

	/* JsViews view containing this tag instance */
	view: View;

	/* View context for tag */
	ctx: Context;

	/* This tag instance */
	tag: Tag;

	/* Tag render method */
	render: TagRenderMethod;

	/* tagCtx.ctxPrm() method */
	ctxPrm: (name: string,value?: any) => any | void; // get/set in JsViews but get only in JsRender

	/* tagCtx.cvtArgs() method */
	cvtArgs: () => any[]| void;

	/* tagCtx.bndArgs() method */
	bndArgs: () => any[] | void;
}

interface TagRenderMethod {
	/* tag render method */
	(...arguments: any[]): string;
}

interface View {
	/* Template rendered by view */
	tmpl: Template;

	/* Block content template (for block tags) */
	content: Template;

	/* Child views */
	views: View[];

	/* Parent view */
	parent: View;

	/* View context (helpers and parameters from parent views) */
	ctx: Context;

	/* View type */
	type: string;

	/* view.get() method: find parent or child views */
	get(type?: string): View;
	get(inner: boolean, type?: string): View;

	/* view.getIndex() method: get index of parent "item" view */
	getIndex(): number;

	/* view.ctxPrm() method: get/set contextual parameter or helper */
	ctxPrm: (name: string, value?: any) => any | void; // get/set in JsViews but get only in JsRender

	/* Find contextual template resource */
	getRsc(namedCollection: string, itemName: string): any;

	/* Index of this view in parent views collection */
	index: number;

	/* tag (for tag views) */
	tag: Tag;
}

} // end namespace
