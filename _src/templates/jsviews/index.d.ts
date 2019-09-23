// Type definitions for JsViews 1.0
// Version: "v@@include("templates/-version.txt")"
// Project: http://www.jsviews.com/#jsviews
// Definitions by: Boris Moore <https://github.com/borismoore>
// Definitions: https://www.jsviews.com/download/typescript/jsviews/index.d.ts
// TypeScript Version: 2.3

/// <reference types="jquery" />

declare module 'jsviews' {
  export = jsviews;
}

declare const jsviews: ((jquery?: JQueryStatic) => JQueryStatic) & JQueryStatic;

@@include('jsrender.d.ts')
@@include('jsviews.d.ts')