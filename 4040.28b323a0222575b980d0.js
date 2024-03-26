"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[4040],{54040:(e,t,n)=>{n.r(t);n.d(t,{ruby:()=>b});function r(e){var t={};for(var n=0,r=e.length;n<r;++n)t[e[n]]=true;return t}var i=["alias","and","BEGIN","begin","break","case","class","def","defined?","do","else","elsif","END","end","ensure","false","for","if","in","module","next","not","or","redo","rescue","retry","return","self","super","then","true","undef","unless","until","when","while","yield","nil","raise","throw","catch","fail","loop","callcc","caller","lambda","proc","public","protected","private","require","load","require_relative","extend","autoload","__END__","__FILE__","__LINE__","__dir__"],a=r(i);var l=r(["def","class","case","for","while","until","module","catch","loop","proc","begin"]);var o=r(["end","until"]);var f={"[":"]","{":"}","(":")"};var u={"]":"[","}":"{",")":"("};var s;function c(e,t,n){n.tokenize.push(e);return e(t,n)}function p(e,t){if(e.sol()&&e.match("=begin")&&e.eol()){t.tokenize.push(_);return"comment"}if(e.eatSpace())return null;var n=e.next(),r;if(n=="`"||n=="'"||n=='"'){return c(m(n,"string",n=='"'||n=="`"),e,t)}else if(n=="/"){if(d(e))return c(m(n,"string.special",true),e,t);else return"operator"}else if(n=="%"){var i="string",a=true;if(e.eat("s"))i="atom";else if(e.eat(/[WQ]/))i="string";else if(e.eat(/[r]/))i="string.special";else if(e.eat(/[wxq]/)){i="string";a=false}var l=e.eat(/[^\w\s=]/);if(!l)return"operator";if(f.propertyIsEnumerable(l))l=f[l];return c(m(l,i,a,true),e,t)}else if(n=="#"){e.skipToEnd();return"comment"}else if(n=="<"&&(r=e.match(/^<([-~])[\`\"\']?([a-zA-Z_?]\w*)[\`\"\']?(?:;|$)/))){return c(v(r[2],r[1]),e,t)}else if(n=="0"){if(e.eat("x"))e.eatWhile(/[\da-fA-F]/);else if(e.eat("b"))e.eatWhile(/[01]/);else e.eatWhile(/[0-7]/);return"number"}else if(/\d/.test(n)){e.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+\-]?[\d_]+)?/);return"number"}else if(n=="?"){while(e.match(/^\\[CM]-/)){}if(e.eat("\\"))e.eatWhile(/\w/);else e.next();return"string"}else if(n==":"){if(e.eat("'"))return c(m("'","atom",false),e,t);if(e.eat('"'))return c(m('"',"atom",true),e,t);if(e.eat(/[\<\>]/)){e.eat(/[\<\>]/);return"atom"}if(e.eat(/[\+\-\*\/\&\|\:\!]/)){return"atom"}if(e.eat(/[a-zA-Z$@_\xa1-\uffff]/)){e.eatWhile(/[\w$\xa1-\uffff]/);e.eat(/[\?\!\=]/);return"atom"}return"operator"}else if(n=="@"&&e.match(/^@?[a-zA-Z_\xa1-\uffff]/)){e.eat("@");e.eatWhile(/[\w\xa1-\uffff]/);return"propertyName"}else if(n=="$"){if(e.eat(/[a-zA-Z_]/)){e.eatWhile(/[\w]/)}else if(e.eat(/\d/)){e.eat(/\d/)}else{e.next()}return"variableName.special"}else if(/[a-zA-Z_\xa1-\uffff]/.test(n)){e.eatWhile(/[\w\xa1-\uffff]/);e.eat(/[\?\!]/);if(e.eat(":"))return"atom";return"variable"}else if(n=="|"&&(t.varList||t.lastTok=="{"||t.lastTok=="do")){s="|";return null}else if(/[\(\)\[\]{}\\;]/.test(n)){s=n;return null}else if(n=="-"&&e.eat(">")){return"operator"}else if(/[=+\-\/*:\.^%<>~|]/.test(n)){var o=e.eatWhile(/[=+\-\/*:\.^%<>~|]/);if(n=="."&&!o)s=".";return"operator"}else{return null}}function d(e){var t=e.pos,n=0,r,i=false,a=false;while((r=e.next())!=null){if(!a){if("[{(".indexOf(r)>-1){n++}else if("]})".indexOf(r)>-1){n--;if(n<0)break}else if(r=="/"&&n==0){i=true;break}a=r=="\\"}else{a=false}}e.backUp(e.pos-t);return i}function k(e){if(!e)e=1;return function(t,n){if(t.peek()=="}"){if(e==1){n.tokenize.pop();return n.tokenize[n.tokenize.length-1](t,n)}else{n.tokenize[n.tokenize.length-1]=k(e-1)}}else if(t.peek()=="{"){n.tokenize[n.tokenize.length-1]=k(e+1)}return p(t,n)}}function h(){var e=false;return function(t,n){if(e){n.tokenize.pop();return n.tokenize[n.tokenize.length-1](t,n)}e=true;return p(t,n)}}function m(e,t,n,r){return function(i,a){var l=false,o;if(a.context.type==="read-quoted-paused"){a.context=a.context.prev;i.eat("}")}while((o=i.next())!=null){if(o==e&&(r||!l)){a.tokenize.pop();break}if(n&&o=="#"&&!l){if(i.eat("{")){if(e=="}"){a.context={prev:a.context,type:"read-quoted-paused"}}a.tokenize.push(k());break}else if(/[@\$]/.test(i.peek())){a.tokenize.push(h());break}}l=!l&&o=="\\"}return t}}function v(e,t){return function(n,r){if(t)n.eatSpace();if(n.match(e))r.tokenize.pop();else n.skipToEnd();return"string"}}function _(e,t){if(e.sol()&&e.match("=end")&&e.eol())t.tokenize.pop();e.skipToEnd();return"comment"}const b={name:"ruby",startState:function(e){return{tokenize:[p],indented:0,context:{type:"top",indented:-e},continuedLine:false,lastTok:null,varList:false}},token:function(e,t){s=null;if(e.sol())t.indented=e.indentation();var n=t.tokenize[t.tokenize.length-1](e,t),r;var i=s;if(n=="variable"){var f=e.current();n=t.lastTok=="."?"property":a.propertyIsEnumerable(e.current())?"keyword":/^[A-Z]/.test(f)?"tag":t.lastTok=="def"||t.lastTok=="class"||t.varList?"def":"variable";if(n=="keyword"){i=f;if(l.propertyIsEnumerable(f))r="indent";else if(o.propertyIsEnumerable(f))r="dedent";else if((f=="if"||f=="unless")&&e.column()==e.indentation())r="indent";else if(f=="do"&&t.context.indented<t.indented)r="indent"}}if(s||n&&n!="comment")t.lastTok=i;if(s=="|")t.varList=!t.varList;if(r=="indent"||/[\(\[\{]/.test(s))t.context={prev:t.context,type:s||n,indented:t.indented};else if((r=="dedent"||/[\)\]\}]/.test(s))&&t.context.prev)t.context=t.context.prev;if(e.eol())t.continuedLine=s=="\\"||n=="operator";return n},indent:function(e,t,n){if(e.tokenize[e.tokenize.length-1]!=p)return null;var r=t&&t.charAt(0);var i=e.context;var a=i.type==u[r]||i.type=="keyword"&&/^(?:end|until|else|elsif|when|rescue)\b/.test(t);return i.indented+(a?0:n.unit)+(e.continuedLine?n.unit:0)},languageData:{indentOnInput:/^\s*(?:end|rescue|elsif|else|\})$/,commentTokens:{line:"#"},autocomplete:i}}}}]);
//# sourceMappingURL=4040.28b323a0222575b980d0.js.map?v=28b323a0222575b980d0