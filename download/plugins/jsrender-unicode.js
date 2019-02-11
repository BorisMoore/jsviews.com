/*! JsRender unicode char support v1.0.1
see: http://www.jsviews.com/#download/plugins */
/*
 * https://www.jsviews.com/download/plugins/jsrender-unicode.js
 * JsRender support for unicode chars in data property names and template data paths
 * Copyright 2019, Boris Moore
 * Released under the MIT License.
 */

$.views.sub.rPath =
  /^(!*?)(?:null|true|false|\d[\d.]*|([^.^\s~\/\x00-\x23\x25-\x2D\x3A-\x40[\]\\`{}|]+|\.|~([\w$]+)|#(view|([\w$]+))?)([^\s~\/\x00-\x23\x25-\x2D\x3A-\x40[\]\\`{}|]*?)(?:[.[^]([^.^\s~\/\x00-\x23\x25-\x2D\x3A-\x40[\]\\`{}|]+)\]?)?)$/g;
// ^(!*?)(?:null|true|false|\d[\d.]*|([        \w$                                 ]+|\.|~([\w$]+)|#(view|([\w$]+))?)([   \w$.^                                  ]*?)(?:[.[^]([      \w$                                   ]+)\]?)?)$/g,
//   not                                      object                                      helper    view  viewProperty   pathTokens                                                leafToken

$.views.sub.rPrm =
  /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(~?[\w$.^]+)?\s*((\+\+|--)|\+|-|~(?![\w$])|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?(@)?[#~]?[^\s~\/\x00-\x23\x25-\x2D\x3A-\x40[\]\\`{}|]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g;
// (\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(~?[\w$.^]+)?\s*((\+\+|--)|\+|-|~(?![\w$])|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?/]|(=))\s*|(!*?(@)?[#~]?[     \w$.^                              ]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g,
// lftPrn0        lftPrn         bound     path               operator     err                                            eq     path2 late                                              prn      comma  lftPrn2   apos quot       rtPrn  rtPrnDot                  prn2     space
