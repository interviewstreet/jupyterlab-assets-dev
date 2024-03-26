"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[6970],{26970:(e,t,r)=>{r.r(t);r.d(t,{haxe:()=>ue,hxml:()=>le});function n(e){return{type:e,style:"keyword"}}var i=n("keyword a"),a=n("keyword b"),u=n("keyword c");var l=n("operator"),f={type:"atom",style:"atom"},o={type:"attribute",style:"attribute"};var c=n("typedef");var s={if:i,while:i,else:a,do:a,try:a,return:u,break:u,continue:u,new:u,throw:u,var:n("var"),inline:o,static:o,using:n("import"),public:o,private:o,cast:n("cast"),import:n("import"),macro:n("macro"),function:n("function"),catch:n("catch"),untyped:n("untyped"),callback:n("cb"),for:n("for"),switch:n("switch"),case:n("case"),default:n("default"),in:l,never:n("property_access"),trace:n("trace"),class:c,abstract:c,enum:c,interface:c,typedef:c,extends:c,implements:c,dynamic:c,true:f,false:f,null:f};var p=/[+\-*&%=<>!?|]/;function d(e,t,r){t.tokenize=r;return r(e,t)}function m(e,t){var r=false,n;while((n=e.next())!=null){if(n==t&&!r)return true;r=!r&&n=="\\"}}var c,v;function y(e,t,r){c=e;v=r;return t}function h(e,t){var r=e.next();if(r=='"'||r=="'"){return d(e,t,b(r))}else if(/[\[\]{}\(\),;\:\.]/.test(r)){return y(r)}else if(r=="0"&&e.eat(/x/i)){e.eatWhile(/[\da-f]/i);return y("number","number")}else if(/\d/.test(r)||r=="-"&&e.eat(/\d/)){e.match(/^\d*(?:\.\d*(?!\.))?(?:[eE][+\-]?\d+)?/);return y("number","number")}else if(t.reAllowed&&(r=="~"&&e.eat(/\//))){m(e,"/");e.eatWhile(/[gimsu]/);return y("regexp","string.special")}else if(r=="/"){if(e.eat("*")){return d(e,t,k)}else if(e.eat("/")){e.skipToEnd();return y("comment","comment")}else{e.eatWhile(p);return y("operator",null,e.current())}}else if(r=="#"){e.skipToEnd();return y("conditional","meta")}else if(r=="@"){e.eat(/:/);e.eatWhile(/[\w_]/);return y("metadata","meta")}else if(p.test(r)){e.eatWhile(p);return y("operator",null,e.current())}else{var n;if(/[A-Z]/.test(r)){e.eatWhile(/[\w_<>]/);n=e.current();return y("type","type",n)}else{e.eatWhile(/[\w_]/);var n=e.current(),i=s.propertyIsEnumerable(n)&&s[n];return i&&t.kwAllowed?y(i.type,i.style,n):y("variable","variable",n)}}}function b(e){return function(t,r){if(m(t,e))r.tokenize=h;return y("string","string")}}function k(e,t){var r=false,n;while(n=e.next()){if(n=="/"&&r){t.tokenize=h;break}r=n=="*"}return y("comment","comment")}var x={atom:true,number:true,variable:true,string:true,regexp:true};function w(e,t,r,n,i,a){this.indented=e;this.column=t;this.type=r;this.prev=i;this.info=a;if(n!=null)this.align=n}function g(e,t){for(var r=e.localVars;r;r=r.next)if(r.name==t)return true}function A(e,t,r,n,i){var a=e.cc;_.state=e;_.stream=i;_.marked=null,_.cc=a;if(!e.lexical.hasOwnProperty("align"))e.lexical.align=true;while(true){var u=a.length?a.pop():C;if(u(r,n)){while(a.length&&a[a.length-1].lex)a.pop()();if(_.marked)return _.marked;if(r=="variable"&&g(e,n))return"variableName.local";if(r=="variable"&&V(e,n))return"variableName.special";return t}}}function V(e,t){if(/[a-z]/.test(t.charAt(0)))return false;var r=e.importedtypes.length;for(var n=0;n<r;n++)if(e.importedtypes[n]==t)return true}function S(e){var t=_.state;for(var r=t.importedtypes;r;r=r.next)if(r.name==e)return;t.importedtypes={name:e,next:t.importedtypes}}var _={state:null,column:null,marked:null,cc:null};function W(){for(var e=arguments.length-1;e>=0;e--)_.cc.push(arguments[e])}function z(){W.apply(null,arguments);return true}function T(e,t){for(var r=t;r;r=r.next)if(r.name==e)return true;return false}function E(e){var t=_.state;if(t.context){_.marked="def";if(T(e,t.localVars))return;t.localVars={name:e,next:t.localVars}}else if(t.globalVars){if(T(e,t.globalVars))return;t.globalVars={name:e,next:t.globalVars}}}var D={name:"this",next:null};function O(){if(!_.state.context)_.state.localVars=D;_.state.context={prev:_.state.context,vars:_.state.localVars}}function Z(){_.state.localVars=_.state.context.vars;_.state.context=_.state.context.prev}Z.lex=true;function P(e,t){var r=function(){var r=_.state;r.lexical=new w(r.indented,_.stream.column(),e,null,r.lexical,t)};r.lex=true;return r}function I(){var e=_.state;if(e.lexical.prev){if(e.lexical.type==")")e.indented=e.lexical.indented;e.lexical=e.lexical.prev}}I.lex=true;function j(e){function t(r){if(r==e)return z();else if(e==";")return W();else return z(t)}return t}function C(e){if(e=="@")return z(q);if(e=="var")return z(P("vardef"),U,j(";"),I);if(e=="keyword a")return z(P("form"),N,C,I);if(e=="keyword b")return z(P("form"),C,I);if(e=="{")return z(P("}"),O,R,I,Z);if(e==";")return z();if(e=="attribute")return z(F);if(e=="function")return z(te);if(e=="for")return z(P("form"),j("("),P(")"),Y,j(")"),I,C,I);if(e=="variable")return z(P("stat"),K);if(e=="switch")return z(P("form"),N,P("}","switch"),j("{"),R,I,I);if(e=="case")return z(N,j(":"));if(e=="default")return z(j(":"));if(e=="catch")return z(P("form"),O,j("("),ae,j(")"),C,I,Z);if(e=="import")return z(H,j(";"));if(e=="typedef")return z(J);return W(P("stat"),N,j(";"),I)}function N(e){if(x.hasOwnProperty(e))return z(B);if(e=="type")return z(B);if(e=="function")return z(te);if(e=="keyword c")return z($);if(e=="(")return z(P(")"),$,j(")"),I,B);if(e=="operator")return z(N);if(e=="[")return z(P("]"),Q($,"]"),I,B);if(e=="{")return z(P("}"),Q(M,"}"),I,B);return z()}function $(e){if(e.match(/[;\}\)\],]/))return W();return W(N)}function B(e,t){if(e=="operator"&&/\+\+|--/.test(t))return z(B);if(e=="operator"||e==":")return z(N);if(e==";")return;if(e=="(")return z(P(")"),Q(N,")"),I,B);if(e==".")return z(L,B);if(e=="[")return z(P("]"),N,j("]"),I,B)}function F(e){if(e=="attribute")return z(F);if(e=="function")return z(te);if(e=="var")return z(U)}function q(e){if(e==":")return z(q);if(e=="variable")return z(q);if(e=="(")return z(P(")"),Q(G,")"),I,C)}function G(e){if(e=="variable")return z()}function H(e,t){if(e=="variable"&&/[A-Z]/.test(t.charAt(0))){S(t);return z()}else if(e=="variable"||e=="property"||e=="."||t=="*")return z(H)}function J(e,t){if(e=="variable"&&/[A-Z]/.test(t.charAt(0))){S(t);return z()}else if(e=="type"&&/[A-Z]/.test(t.charAt(0))){return z()}}function K(e){if(e==":")return z(I,C);return W(B,j(";"),I)}function L(e){if(e=="variable"){_.marked="property";return z()}}function M(e){if(e=="variable")_.marked="property";if(x.hasOwnProperty(e))return z(j(":"),N)}function Q(e,t){function r(n){if(n==",")return z(e,r);if(n==t)return z();return z(j(t))}return function(n){if(n==t)return z();else return W(e,r)}}function R(e){if(e=="}")return z();return W(C,R)}function U(e,t){if(e=="variable"){E(t);return z(re,X)}return z()}function X(e,t){if(t=="=")return z(N,X);if(e==",")return z(U)}function Y(e,t){if(e=="variable"){E(t);return z(ee,N)}else{return W()}}function ee(e,t){if(t=="in")return z()}function te(e,t){if(e=="variable"||e=="type"){E(t);return z(te)}if(t=="new")return z(te);if(e=="(")return z(P(")"),O,Q(ae,")"),I,re,C,Z)}function re(e){if(e==":")return z(ne)}function ne(e){if(e=="type")return z();if(e=="variable")return z();if(e=="{")return z(P("}"),Q(ie,"}"),I)}function ie(e){if(e=="variable")return z(re)}function ae(e,t){if(e=="variable"){E(t);return z(re)}}const ue={name:"haxe",startState:function(e){var t=["Int","Float","String","Void","Std","Bool","Dynamic","Array"];var r={tokenize:h,reAllowed:true,kwAllowed:true,cc:[],lexical:new w(-e,0,"block",false),importedtypes:t,context:null,indented:0};return r},token:function(e,t){if(e.sol()){if(!t.lexical.hasOwnProperty("align"))t.lexical.align=false;t.indented=e.indentation()}if(e.eatSpace())return null;var r=t.tokenize(e,t);if(c=="comment")return r;t.reAllowed=!!(c=="operator"||c=="keyword c"||c.match(/^[\[{}\(,;:]$/));t.kwAllowed=c!=".";return A(t,r,c,v,e)},indent:function(e,t,r){if(e.tokenize!=h)return 0;var n=t&&t.charAt(0),i=e.lexical;if(i.type=="stat"&&n=="}")i=i.prev;var a=i.type,u=n==a;if(a=="vardef")return i.indented+4;else if(a=="form"&&n=="{")return i.indented;else if(a=="stat"||a=="form")return i.indented+r.unit;else if(i.info=="switch"&&!u)return i.indented+(/^(?:case|default)\b/.test(t)?r.unit:2*r.unit);else if(i.align)return i.column+(u?0:1);else return i.indented+(u?0:r.unit)},languageData:{indentOnInput:/^\s*[{}]$/,commentTokens:{line:"//",block:{open:"/*",close:"*/"}}}};const le={name:"hxml",startState:function(){return{define:false,inString:false}},token:function(e,t){var r=e.peek();var n=e.sol();if(r=="#"){e.skipToEnd();return"comment"}if(n&&r=="-"){var i="variable-2";e.eat(/-/);if(e.peek()=="-"){e.eat(/-/);i="keyword a"}if(e.peek()=="D"){e.eat(/[D]/);i="keyword c";t.define=true}e.eatWhile(/[A-Z]/i);return i}var r=e.peek();if(t.inString==false&&r=="'"){t.inString=true;e.next()}if(t.inString==true){if(e.skipTo("'")){}else{e.skipToEnd()}if(e.peek()=="'"){e.next();t.inString=false}return"string"}e.next();return null},languageData:{commentTokens:{line:"#"}}}}}]);
//# sourceMappingURL=6970.24cbe664fcb228a8f92e.js.map?v=24cbe664fcb228a8f92e