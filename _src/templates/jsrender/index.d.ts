// Type definitions for JsRender 1.0
// Version: "v@@include("templates/-version.txt")"
// Project: http://www.jsviews.com/#jsrender
// Definitions by: Boris Moore <https://github.com/borismoore>
// Definitions: https://www.jsviews.com/download/typescript/jsrender/index.d.ts
// TypeScript Version: 2.3

/// <reference types="jquery" />

declare module 'jsrender' {
  export = jsrender;
}

declare const jsrender: ((jquery?: JQueryStatic) => JQueryStatic) & JQueryStatic;

@@include('jsrender.d.ts')