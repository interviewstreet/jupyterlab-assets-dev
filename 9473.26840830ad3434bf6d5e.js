"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[9473],{59473:(e,t,r)=>{r.r(t);r.d(t,{julia:()=>$});function n(e,t,r){if(typeof r==="undefined")r="";if(typeof t==="undefined"){t="\\b"}return new RegExp("^"+r+"(("+e.join(")|(")+"))"+t)}var a="\\\\[0-7]{1,3}";var i="\\\\x[A-Fa-f0-9]{1,2}";var u="\\\\[abefnrtv0%?'\"\\\\]";var s="([^\\u0027\\u005C\\uD800-\\uDFFF]|[\\uD800-\\uDFFF][\\uDC00-\\uDFFF])";var o=["[<>]:","[<>=]=","<<=?",">>>?=?","=>","--?>","<--[->]?","\\/\\/","\\.{2,3}","[\\.\\\\%*+\\-<>!\\/^|&]=?","\\?","\\$","~",":"];var f=n(["[<>]:","[<>=]=","[!=]==","<<=?",">>>?=?","=>?","--?>","<--[->]?","\\/\\/","[\\\\%*+\\-<>!\\/^|&\\u00F7\\u22BB]=?","\\?","\\$","~",":","\\u00D7","\\u2208","\\u2209","\\u220B","\\u220C","\\u2218","\\u221A","\\u221B","\\u2229","\\u222A","\\u2260","\\u2264","\\u2265","\\u2286","\\u2288","\\u228A","\\u22C5","\\b(in|isa)\\b(?!.?\\()"],"");var c=/^[;,()[\]{}]/;var l=/^[_A-Za-z\u00A1-\u2217\u2219-\uFFFF][\w\u00A1-\u2217\u2219-\uFFFF]*!*/;var m=n([a,i,u,s],"'");var p=["begin","function","type","struct","immutable","let","macro","for","while","quote","if","else","elseif","try","finally","catch","do"];var h=["end","else","elseif","catch","finally"];var d=["if","else","elseif","while","for","begin","let","end","do","try","catch","finally","return","break","continue","global","local","const","export","import","importall","using","function","where","macro","module","baremodule","struct","type","mutable","immutable","quote","typealias","abstract","primitive","bitstype"];var v=["true","false","nothing","NaN","Inf"];var F=n(p);var k=n(h);var b=n(d);var g=n(v);var y=/^@[_A-Za-z\u00A1-\uFFFF][\w\u00A1-\uFFFF]*!*/;var _=/^:[_A-Za-z\u00A1-\uFFFF][\w\u00A1-\uFFFF]*!*/;var x=/^(`|([_A-Za-z\u00A1-\uFFFF]*"("")?))/;var A=n(o,"","@");var z=n(o,"",":");function E(e){return e.nestedArrays>0}function w(e){return e.nestedGenerators>0}function D(e,t){if(typeof t==="undefined"){t=0}if(e.scopes.length<=t){return null}return e.scopes[e.scopes.length-(t+1)]}function T(e,t){if(e.match("#=",false)){t.tokenize=P;return t.tokenize(e,t)}var r=t.leavingExpr;if(e.sol()){r=false}t.leavingExpr=false;if(r){if(e.match(/^'+/)){return"operator"}}if(e.match(/\.{4,}/)){return"error"}else if(e.match(/\.{1,3}/)){return"operator"}if(e.eatSpace()){return null}var n=e.peek();if(n==="#"){e.skipToEnd();return"comment"}if(n==="["){t.scopes.push("[");t.nestedArrays++}if(n==="("){t.scopes.push("(");t.nestedGenerators++}if(E(t)&&n==="]"){while(t.scopes.length&&D(t)!=="["){t.scopes.pop()}t.scopes.pop();t.nestedArrays--;t.leavingExpr=true}if(w(t)&&n===")"){while(t.scopes.length&&D(t)!=="("){t.scopes.pop()}t.scopes.pop();t.nestedGenerators--;t.leavingExpr=true}if(E(t)){if(t.lastToken=="end"&&e.match(":")){return"operator"}if(e.match("end")){return"number"}}var a;if(a=e.match(F,false)){t.scopes.push(a[0])}if(e.match(k,false)){t.scopes.pop()}if(e.match(/^::(?![:\$])/)){t.tokenize=C;return t.tokenize(e,t)}if(!r&&(e.match(_)||e.match(z))){return"builtin"}if(e.match(f)){return"operator"}if(e.match(/^\.?\d/,false)){var i=RegExp(/^im\b/);var u=false;if(e.match(/^0x\.[0-9a-f_]+p[\+\-]?[_\d]+/i)){u=true}if(e.match(/^0x[0-9a-f_]+/i)){u=true}if(e.match(/^0b[01_]+/i)){u=true}if(e.match(/^0o[0-7_]+/i)){u=true}if(e.match(/^(?:(?:\d[_\d]*)?\.(?!\.)(?:\d[_\d]*)?|\d[_\d]*\.(?!\.)(?:\d[_\d]*))?([Eef][\+\-]?[_\d]+)?/i)){u=true}if(e.match(/^\d[_\d]*(e[\+\-]?\d+)?/i)){u=true}if(u){e.match(i);t.leavingExpr=true;return"number"}}if(e.match("'")){t.tokenize=j;return t.tokenize(e,t)}if(e.match(x)){t.tokenize=B(e.current());return t.tokenize(e,t)}if(e.match(y)||e.match(A)){return"meta"}if(e.match(c)){return null}if(e.match(b)){return"keyword"}if(e.match(g)){return"builtin"}var s=t.isDefinition||t.lastToken=="function"||t.lastToken=="macro"||t.lastToken=="type"||t.lastToken=="struct"||t.lastToken=="immutable";if(e.match(l)){if(s){if(e.peek()==="."){t.isDefinition=true;return"variable"}t.isDefinition=false;return"def"}t.leavingExpr=true;return"variable"}e.next();return"error"}function C(e,t){e.match(/.*?(?=[,;{}()=\s]|$)/);if(e.match("{")){t.nestedParameters++}else if(e.match("}")&&t.nestedParameters>0){t.nestedParameters--}if(t.nestedParameters>0){e.match(/.*?(?={|})/)||e.next()}else if(t.nestedParameters==0){t.tokenize=T}return"builtin"}function P(e,t){if(e.match("#=")){t.nestedComments++}if(!e.match(/.*?(?=(#=|=#))/)){e.skipToEnd()}if(e.match("=#")){t.nestedComments--;if(t.nestedComments==0)t.tokenize=T}return"comment"}function j(e,t){var r=false,n;if(e.match(m)){r=true}else if(n=e.match(/\\u([a-f0-9]{1,4})(?=')/i)){var a=parseInt(n[1],16);if(a<=55295||a>=57344){r=true;e.next()}}else if(n=e.match(/\\U([A-Fa-f0-9]{5,8})(?=')/)){var a=parseInt(n[1],16);if(a<=1114111){r=true;e.next()}}if(r){t.leavingExpr=true;t.tokenize=T;return"string"}if(!e.match(/^[^']+(?=')/)){e.skipToEnd()}if(e.match("'")){t.tokenize=T}return"error"}function B(e){if(e.substr(-3)==='"""'){e='"""'}else if(e.substr(-1)==='"'){e='"'}function t(t,r){if(t.eat("\\")){t.next()}else if(t.match(e)){r.tokenize=T;r.leavingExpr=true;return"string"}else{t.eat(/[`"]/)}t.eatWhile(/[^\\`"]/);return"string"}return t}const $={name:"julia",startState:function(){return{tokenize:T,scopes:[],lastToken:null,leavingExpr:false,isDefinition:false,nestedArrays:0,nestedComments:0,nestedGenerators:0,nestedParameters:0,firstParenPos:-1}},token:function(e,t){var r=t.tokenize(e,t);var n=e.current();if(n&&r){t.lastToken=n}return r},indent:function(e,t,r){var n=0;if(t==="]"||t===")"||/^end\b/.test(t)||/^else/.test(t)||/^catch\b/.test(t)||/^elseif\b/.test(t)||/^finally/.test(t)){n=-1}return(e.scopes.length+n)*r.unit},languageData:{indentOnInput:/^\s*(end|else|catch|finally)\b$/,commentTokens:{line:"#",block:{open:"#=",close:"=#"}},closeBrackets:{brackets:["(","[","{",'"']},autocomplete:d.concat(v)}}}}]);
//# sourceMappingURL=9473.26840830ad3434bf6d5e.js.map?v=26840830ad3434bf6d5e