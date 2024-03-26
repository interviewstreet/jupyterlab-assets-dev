"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[8085],{48085:(e,t,n)=>{n.r(t);n.d(t,{Hooks:()=>Z,Lexer:()=>T,Marked:()=>q,Parser:()=>E,Renderer:()=>A,TextRenderer:()=>I,Tokenizer:()=>z,defaults:()=>r,getDefaults:()=>s,lexer:()=>j,marked:()=>D,options:()=>P,parse:()=>M,parseInline:()=>C,parser:()=>O,setOptions:()=>v,use:()=>B,walkTokens:()=>Q});function s(){return{async:false,breaks:false,extensions:null,gfm:true,hooks:null,pedantic:false,renderer:null,silent:false,tokenizer:null,walkTokens:null}}let r=s();function i(e){r=e}const l=/[&<>"']/;const o=new RegExp(l.source,"g");const a=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;const c=new RegExp(a.source,"g");const h={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};const p=e=>h[e];function u(e,t){if(t){if(l.test(e)){return e.replace(o,p)}}else{if(a.test(e)){return e.replace(c,p)}}return e}const f=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function g(e){return e.replace(f,((e,t)=>{t=t.toLowerCase();if(t==="colon")return":";if(t.charAt(0)==="#"){return t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1))}return""}))}const k=/(^|[^\[])\^/g;function d(e,t){e=typeof e==="string"?e:e.source;t=t||"";const n={replace:(t,s)=>{s=typeof s==="object"&&"source"in s?s.source:s;s=s.replace(k,"$1");e=e.replace(t,s);return n},getRegex:()=>new RegExp(e,t)};return n}function x(e){try{e=encodeURI(e).replace(/%25/g,"%")}catch(t){return null}return e}const b={exec:()=>null};function m(e,t){const n=e.replace(/\|/g,((e,t,n)=>{let s=false;let r=t;while(--r>=0&&n[r]==="\\")s=!s;if(s){return"|"}else{return" |"}})),s=n.split(/ \|/);let r=0;if(!s[0].trim()){s.shift()}if(s.length>0&&!s[s.length-1].trim()){s.pop()}if(t){if(s.length>t){s.splice(t)}else{while(s.length<t)s.push("")}}for(;r<s.length;r++){s[r]=s[r].trim().replace(/\\\|/g,"|")}return s}function w(e,t,n){const s=e.length;if(s===0){return""}let r=0;while(r<s){const i=e.charAt(s-r-1);if(i===t&&!n){r++}else if(i!==t&&n){r++}else{break}}return e.slice(0,s-r)}function _(e,t){if(e.indexOf(t[1])===-1){return-1}let n=0;for(let s=0;s<e.length;s++){if(e[s]==="\\"){s++}else if(e[s]===t[0]){n++}else if(e[s]===t[1]){n--;if(n<0){return s}}}return-1}function y(e,t,n,s){const r=t.href;const i=t.title?u(t.title):null;const l=e[1].replace(/\\([\[\]])/g,"$1");if(e[0].charAt(0)!=="!"){s.state.inLink=true;const e={type:"link",raw:n,href:r,title:i,text:l,tokens:s.inlineTokens(l)};s.state.inLink=false;return e}return{type:"image",raw:n,href:r,title:i,text:u(l)}}function $(e,t){const n=e.match(/^(\s+)(?:```)/);if(n===null){return t}const s=n[1];return t.split("\n").map((e=>{const t=e.match(/^\s+/);if(t===null){return e}const[n]=t;if(n.length>=s.length){return e.slice(s.length)}return e})).join("\n")}class z{options;rules;lexer;constructor(e){this.options=e||r}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0){return{type:"space",raw:t[0]}}}code(e){const t=this.rules.block.code.exec(e);if(t){const e=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:!this.options.pedantic?w(e,"\n"):e}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const e=t[0];const n=$(e,t[3]||"");return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline._escapes,"$1"):t[2],text:n}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(/#$/.test(e)){const t=w(e,"#");if(this.options.pedantic){e=t.trim()}else if(!t||/ $/.test(t)){e=t.trim()}}return{type:"heading",raw:t[0],depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t){return{type:"hr",raw:t[0]}}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){const e=w(t[0].replace(/^ *>[ \t]?/gm,""),"\n");const n=this.lexer.state.top;this.lexer.state.top=true;const s=this.lexer.blockTokens(e);this.lexer.state.top=n;return{type:"blockquote",raw:t[0],tokens:s,text:e}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim();const s=n.length>1;const r={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:false,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`;if(this.options.pedantic){n=s?n:"[*+-]"}const i=new RegExp(`^( {0,3}${n})((?:[\t ][^\\n]*)?(?:\\n|$))`);let l="";let o="";let a=false;while(e){let n=false;if(!(t=i.exec(e))){break}if(this.rules.block.hr.test(e)){break}l=t[0];e=e.substring(l.length);let s=t[2].split("\n",1)[0].replace(/^\t+/,(e=>" ".repeat(3*e.length)));let c=e.split("\n",1)[0];let h=0;if(this.options.pedantic){h=2;o=s.trimStart()}else{h=t[2].search(/[^ ]/);h=h>4?1:h;o=s.slice(h);h+=t[1].length}let p=false;if(!s&&/^ *$/.test(c)){l+=c+"\n";e=e.substring(c.length+1);n=true}if(!n){const t=new RegExp(`^ {0,${Math.min(3,h-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`);const n=new RegExp(`^ {0,${Math.min(3,h-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);const r=new RegExp(`^ {0,${Math.min(3,h-1)}}(?:\`\`\`|~~~)`);const i=new RegExp(`^ {0,${Math.min(3,h-1)}}#`);while(e){const a=e.split("\n",1)[0];c=a;if(this.options.pedantic){c=c.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")}if(r.test(c)){break}if(i.test(c)){break}if(t.test(c)){break}if(n.test(e)){break}if(c.search(/[^ ]/)>=h||!c.trim()){o+="\n"+c.slice(h)}else{if(p){break}if(s.search(/[^ ]/)>=4){break}if(r.test(s)){break}if(i.test(s)){break}if(n.test(s)){break}o+="\n"+c}if(!p&&!c.trim()){p=true}l+=a+"\n";e=e.substring(a.length+1);s=c.slice(h)}}if(!r.loose){if(a){r.loose=true}else if(/\n *\n *$/.test(l)){a=true}}let u=null;let f;if(this.options.gfm){u=/^\[[ xX]\] /.exec(o);if(u){f=u[0]!=="[ ] ";o=o.replace(/^\[[ xX]\] +/,"")}}r.items.push({type:"list_item",raw:l,task:!!u,checked:f,loose:false,text:o,tokens:[]});r.raw+=l}r.items[r.items.length-1].raw=l.trimEnd();r.items[r.items.length-1].text=o.trimEnd();r.raw=r.raw.trimEnd();for(let e=0;e<r.items.length;e++){this.lexer.state.top=false;r.items[e].tokens=this.lexer.blockTokens(r.items[e].text,[]);if(!r.loose){const t=r.items[e].tokens.filter((e=>e.type==="space"));const n=t.length>0&&t.some((e=>/\n.*\n/.test(e.raw)));r.loose=n}}if(r.loose){for(let e=0;e<r.items.length;e++){r.items[e].loose=true}}return r}}html(e){const t=this.rules.block.html.exec(e);if(t){const e={type:"html",block:true,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]};return e}}def(e){const t=this.rules.block.def.exec(e);if(t){const e=t[1].toLowerCase().replace(/\s+/g," ");const n=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"";const s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline._escapes,"$1"):t[3];return{type:"def",tag:e,raw:t[0],href:n,title:s}}}table(e){const t=this.rules.block.table.exec(e);if(t){if(!/[:|]/.test(t[2])){return}const e={type:"table",raw:t[0],header:m(t[1]).map((e=>({text:e,tokens:[]}))),align:t[2].replace(/^\||\| *$/g,"").split("|"),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split("\n"):[]};if(e.header.length===e.align.length){let t=e.align.length;let n,s,r,i;for(n=0;n<t;n++){const t=e.align[n];if(t){if(/^ *-+: *$/.test(t)){e.align[n]="right"}else if(/^ *:-+: *$/.test(t)){e.align[n]="center"}else if(/^ *:-+ *$/.test(t)){e.align[n]="left"}else{e.align[n]=null}}}t=e.rows.length;for(n=0;n<t;n++){e.rows[n]=m(e.rows[n],e.header.length).map((e=>({text:e,tokens:[]})))}t=e.header.length;for(s=0;s<t;s++){e.header[s].tokens=this.lexer.inline(e.header[s].text)}t=e.rows.length;for(s=0;s<t;s++){i=e.rows[s];for(r=0;r<i.length;r++){i[r].tokens=this.lexer.inline(i[r].text)}}return e}}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t){return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const e=t[1].charAt(t[1].length-1)==="\n"?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){const t=this.rules.block.text.exec(e);if(t){return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}}escape(e){const t=this.rules.inline.escape.exec(e);if(t){return{type:"escape",raw:t[0],text:u(t[1])}}}tag(e){const t=this.rules.inline.tag.exec(e);if(t){if(!this.lexer.state.inLink&&/^<a /i.test(t[0])){this.lexer.state.inLink=true}else if(this.lexer.state.inLink&&/^<\/a>/i.test(t[0])){this.lexer.state.inLink=false}if(!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])){this.lexer.state.inRawBlock=true}else if(this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])){this.lexer.state.inRawBlock=false}return{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:false,text:t[0]}}}link(e){const t=this.rules.inline.link.exec(e);if(t){const e=t[2].trim();if(!this.options.pedantic&&/^</.test(e)){if(!/>$/.test(e)){return}const t=w(e.slice(0,-1),"\\");if((e.length-t.length)%2===0){return}}else{const e=_(t[2],"()");if(e>-1){const n=t[0].indexOf("!")===0?5:4;const s=n+t[1].length+e;t[2]=t[2].substring(0,e);t[0]=t[0].substring(0,s).trim();t[3]=""}}let n=t[2];let s="";if(this.options.pedantic){const e=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(n);if(e){n=e[1];s=e[3]}}else{s=t[3]?t[3].slice(1,-1):""}n=n.trim();if(/^</.test(n)){if(this.options.pedantic&&!/>$/.test(e)){n=n.slice(1)}else{n=n.slice(1,-1)}}return y(t,{href:n?n.replace(this.rules.inline._escapes,"$1"):n,title:s?s.replace(this.rules.inline._escapes,"$1"):s},t[0],this.lexer)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=(n[2]||n[1]).replace(/\s+/g," ");e=t[e.toLowerCase()];if(!e){const e=n[0].charAt(0);return{type:"text",raw:e,text:e}}return y(n,e,n[0],this.lexer)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrong.lDelim.exec(e);if(!s)return;if(s[3]&&n.match(/[\p{L}\p{N}]/u))return;const r=s[1]||s[2]||"";if(!r||!n||this.rules.inline.punctuation.exec(n)){const n=[...s[0]].length-1;let r,i,l=n,o=0;const a=s[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;a.lastIndex=0;t=t.slice(-1*e.length+s[0].length-1);while((s=a.exec(t))!=null){r=s[1]||s[2]||s[3]||s[4]||s[5]||s[6];if(!r)continue;i=[...r].length;if(s[3]||s[4]){l+=i;continue}else if(s[5]||s[6]){if(n%3&&!((n+i)%3)){o+=i;continue}}l-=i;if(l>0)continue;i=Math.min(i,i+l+o);const t=[...e].slice(0,n+s.index+i+1).join("");if(Math.min(n,i)%2){const e=t.slice(1,-1);return{type:"em",raw:t,text:e,tokens:this.lexer.inlineTokens(e)}}const a=t.slice(2,-2);return{type:"strong",raw:t,text:a,tokens:this.lexer.inlineTokens(a)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(/\n/g," ");const n=/[^ ]/.test(e);const s=/^ /.test(e)&&/ $/.test(e);if(n&&s){e=e.substring(1,e.length-1)}e=u(e,true);return{type:"codespan",raw:t[0],text:e}}}br(e){const t=this.rules.inline.br.exec(e);if(t){return{type:"br",raw:t[0]}}}del(e){const t=this.rules.inline.del.exec(e);if(t){return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let e,n;if(t[2]==="@"){e=u(t[1]);n="mailto:"+e}else{e=u(t[1]);n=e}return{type:"link",raw:t[0],text:e,href:n,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]==="@"){e=u(t[0]);n="mailto:"+e}else{let s;do{s=t[0];t[0]=this.rules.inline._backpedal.exec(t[0])[0]}while(s!==t[0]);e=u(t[0]);if(t[1]==="www."){n="http://"+t[0]}else{n=t[0]}}return{type:"link",raw:t[0],text:e,href:n,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let e;if(this.lexer.state.inRawBlock){e=t[0]}else{e=u(t[0])}return{type:"text",raw:t[0],text:e}}}}const R={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:"+"<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)"+"|comment[^\\n]*(\\n+|$)"+"|<\\?[\\s\\S]*?(?:\\?>\\n*|$)"+"|<![A-Z][\\s\\S]*?(?:>\\n*|$)"+"|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)"+"|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)"+"|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)"+"|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)"+")",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:b,lheading:/^(?!bull )((?:.|\n(?!\s*?\n|bull ))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/};R._label=/(?!\s*\])(?:\\.|[^\[\]\\])+/;R._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;R.def=d(R.def).replace("label",R._label).replace("title",R._title).getRegex();R.bullet=/(?:[*+-]|\d{1,9}[.)])/;R.listItemStart=d(/^( *)(bull) */).replace("bull",R.bullet).getRegex();R.list=d(R.list).replace(/bull/g,R.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+R.def.source+")").getRegex();R._tag="address|article|aside|base|basefont|blockquote|body|caption"+"|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption"+"|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe"+"|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option"+"|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr"+"|track|ul";R._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/;R.html=d(R.html,"i").replace("comment",R._comment).replace("tag",R._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();R.lheading=d(R.lheading).replace(/bull/g,R.bullet).getRegex();R.paragraph=d(R._paragraph).replace("hr",R.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",R._tag).getRegex();R.blockquote=d(R.blockquote).replace("paragraph",R.paragraph).getRegex();R.normal={...R};R.gfm={...R.normal,table:"^ *([^\\n ].*)\\n"+" {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)"+"(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"};R.gfm.table=d(R.gfm.table).replace("hr",R.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",R._tag).getRegex();R.gfm.paragraph=d(R._paragraph).replace("hr",R.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",R.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",R._tag).getRegex();R.pedantic={...R.normal,html:d("^ *(?:comment *(?:\\n|\\s*$)"+"|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)"+"|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",R._comment).replace(/tag/g,"(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub"+"|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)"+"\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:b,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:d(R.normal._paragraph).replace("hr",R.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",R.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()};const S={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:b,tag:"^comment"+"|^</[a-zA-Z][\\w:-]*\\s*>"+"|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>"+"|^<\\?[\\s\\S]*?\\?>"+"|^<![a-zA-Z]+\\s[\\s\\S]*?>"+"|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,rDelimAst:/^[^_*]*?__[^_*]*?\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\*)[punct](\*+)(?=[\s]|$)|[^punct\s](\*+)(?!\*)(?=[punct\s]|$)|(?!\*)[punct\s](\*+)(?=[^punct\s])|[\s](\*+)(?!\*)(?=[punct])|(?!\*)[punct](\*+)(?!\*)(?=[punct])|[^punct\s](\*+)(?=[^punct\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\s]|$)|[^punct\s](_+)(?!_)(?=[punct\s]|$)|(?!_)[punct\s](_+)(?=[^punct\s])|[\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:b,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^((?![*_])[\spunctuation])/};S._punctuation="\\p{P}$+<=>`^|~";S.punctuation=d(S.punctuation,"u").replace(/punctuation/g,S._punctuation).getRegex();S.blockSkip=/\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;S.anyPunctuation=/\\[punct]/g;S._escapes=/\\([punct])/g;S._comment=d(R._comment).replace("(?:--\x3e|$)","--\x3e").getRegex();S.emStrong.lDelim=d(S.emStrong.lDelim,"u").replace(/punct/g,S._punctuation).getRegex();S.emStrong.rDelimAst=d(S.emStrong.rDelimAst,"gu").replace(/punct/g,S._punctuation).getRegex();S.emStrong.rDelimUnd=d(S.emStrong.rDelimUnd,"gu").replace(/punct/g,S._punctuation).getRegex();S.anyPunctuation=d(S.anyPunctuation,"gu").replace(/punct/g,S._punctuation).getRegex();S._escapes=d(S._escapes,"gu").replace(/punct/g,S._punctuation).getRegex();S._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;S._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;S.autolink=d(S.autolink).replace("scheme",S._scheme).replace("email",S._email).getRegex();S._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;S.tag=d(S.tag).replace("comment",S._comment).replace("attribute",S._attribute).getRegex();S._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;S._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;S._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;S.link=d(S.link).replace("label",S._label).replace("href",S._href).replace("title",S._title).getRegex();S.reflink=d(S.reflink).replace("label",S._label).replace("ref",R._label).getRegex();S.nolink=d(S.nolink).replace("ref",R._label).getRegex();S.reflinkSearch=d(S.reflinkSearch,"g").replace("reflink",S.reflink).replace("nolink",S.nolink).getRegex();S.normal={...S};S.pedantic={...S.normal,strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:d(/^!?\[(label)\]\((.*?)\)/).replace("label",S._label).getRegex(),reflink:d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",S._label).getRegex()};S.gfm={...S.normal,escape:d(S.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/};S.gfm.url=d(S.gfm.url,"i").replace("email",S.gfm._extended_email).getRegex();S.breaks={...S.gfm,br:d(S.br).replace("{2,}","*").getRegex(),text:d(S.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()};class T{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[];this.tokens.links=Object.create(null);this.options=e||r;this.options.tokenizer=this.options.tokenizer||new z;this.tokenizer=this.options.tokenizer;this.tokenizer.options=this.options;this.tokenizer.lexer=this;this.inlineQueue=[];this.state={inLink:false,inRawBlock:false,top:true};const t={block:R.normal,inline:S.normal};if(this.options.pedantic){t.block=R.pedantic;t.inline=S.pedantic}else if(this.options.gfm){t.block=R.gfm;if(this.options.breaks){t.inline=S.breaks}else{t.inline=S.gfm}}this.tokenizer.rules=t}static get rules(){return{block:R,inline:S}}static lex(e,t){const n=new T(t);return n.lex(e)}static lexInline(e,t){const n=new T(t);return n.inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,"\n");this.blockTokens(e,this.tokens);let t;while(t=this.inlineQueue.shift()){this.inlineTokens(t.src,t.tokens)}return this.tokens}blockTokens(e,t=[]){if(this.options.pedantic){e=e.replace(/\t/g,"    ").replace(/^ +$/gm,"")}else{e=e.replace(/^( *)(\t+)/gm,((e,t,n)=>t+"    ".repeat(n.length)))}let n;let s;let r;let i;while(e){if(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some((s=>{if(n=s.call({lexer:this},e,t)){e=e.substring(n.raw.length);t.push(n);return true}return false}))){continue}if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length);if(n.raw.length===1&&t.length>0){t[t.length-1].raw+="\n"}else{t.push(n)}continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length);s=t[t.length-1];if(s&&(s.type==="paragraph"||s.type==="text")){s.raw+="\n"+n.raw;s.text+="\n"+n.text;this.inlineQueue[this.inlineQueue.length-1].src=s.text}else{t.push(n)}continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length);s=t[t.length-1];if(s&&(s.type==="paragraph"||s.type==="text")){s.raw+="\n"+n.raw;s.text+="\n"+n.raw;this.inlineQueue[this.inlineQueue.length-1].src=s.text}else if(!this.tokens.links[n.tag]){this.tokens.links[n.tag]={href:n.href,title:n.title}}continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length);t.push(n);continue}r=e;if(this.options.extensions&&this.options.extensions.startBlock){let t=Infinity;const n=e.slice(1);let s;this.options.extensions.startBlock.forEach((e=>{s=e.call({lexer:this},n);if(typeof s==="number"&&s>=0){t=Math.min(t,s)}}));if(t<Infinity&&t>=0){r=e.substring(0,t+1)}}if(this.state.top&&(n=this.tokenizer.paragraph(r))){s=t[t.length-1];if(i&&s.type==="paragraph"){s.raw+="\n"+n.raw;s.text+="\n"+n.text;this.inlineQueue.pop();this.inlineQueue[this.inlineQueue.length-1].src=s.text}else{t.push(n)}i=r.length!==e.length;e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length);s=t[t.length-1];if(s&&s.type==="text"){s.raw+="\n"+n.raw;s.text+="\n"+n.text;this.inlineQueue.pop();this.inlineQueue[this.inlineQueue.length-1].src=s.text}else{t.push(n)}continue}if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}else{throw new Error(t)}}}this.state.top=true;return t}inline(e,t=[]){this.inlineQueue.push({src:e,tokens:t});return t}inlineTokens(e,t=[]){let n,s,r;let i=e;let l;let o,a;if(this.tokens.links){const e=Object.keys(this.tokens.links);if(e.length>0){while((l=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null){if(e.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))){i=i.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex)}}}}while((l=this.tokenizer.rules.inline.blockSkip.exec(i))!=null){i=i.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex)}while((l=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null){i=i.slice(0,l.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex)}while(e){if(!o){a=""}o=false;if(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some((s=>{if(n=s.call({lexer:this},e,t)){e=e.substring(n.raw.length);t.push(n);return true}return false}))){continue}if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length);s=t[t.length-1];if(s&&n.type==="text"&&s.type==="text"){s.raw+=n.raw;s.text+=n.text}else{t.push(n)}continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length);s=t[t.length-1];if(s&&n.type==="text"&&s.type==="text"){s.raw+=n.raw;s.text+=n.text}else{t.push(n)}continue}if(n=this.tokenizer.emStrong(e,i,a)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.del(e)){e=e.substring(n.raw.length);t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length);t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length);t.push(n);continue}r=e;if(this.options.extensions&&this.options.extensions.startInline){let t=Infinity;const n=e.slice(1);let s;this.options.extensions.startInline.forEach((e=>{s=e.call({lexer:this},n);if(typeof s==="number"&&s>=0){t=Math.min(t,s)}}));if(t<Infinity&&t>=0){r=e.substring(0,t+1)}}if(n=this.tokenizer.inlineText(r)){e=e.substring(n.raw.length);if(n.raw.slice(-1)!=="_"){a=n.raw.slice(-1)}o=true;s=t[t.length-1];if(s&&s.type==="text"){s.raw+=n.raw;s.text+=n.text}else{t.push(n)}continue}if(e){const t="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(t);break}else{throw new Error(t)}}}return t}}class A{options;constructor(e){this.options=e||r}code(e,t,n){const s=(t||"").match(/^\S*/)?.[0];e=e.replace(/\n$/,"")+"\n";if(!s){return"<pre><code>"+(n?e:u(e,true))+"</code></pre>\n"}return'<pre><code class="language-'+u(s)+'">'+(n?e:u(e,true))+"</code></pre>\n"}blockquote(e){return`<blockquote>\n${e}</blockquote>\n`}html(e,t){return e}heading(e,t,n){return`<h${t}>${e}</h${t}>\n`}hr(){return"<hr>\n"}list(e,t,n){const s=t?"ol":"ul";const r=t&&n!==1?' start="'+n+'"':"";return"<"+s+r+">\n"+e+"</"+s+">\n"}listitem(e,t,n){return`<li>${e}</li>\n`}checkbox(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph(e){return`<p>${e}</p>\n`}table(e,t){if(t)t=`<tbody>${t}</tbody>`;return"<table>\n"+"<thead>\n"+e+"</thead>\n"+t+"</table>\n"}tablerow(e){return`<tr>\n${e}</tr>\n`}tablecell(e,t){const n=t.header?"th":"td";const s=t.align?`<${n} align="${t.align}">`:`<${n}>`;return s+e+`</${n}>\n`}strong(e){return`<strong>${e}</strong>`}em(e){return`<em>${e}</em>`}codespan(e){return`<code>${e}</code>`}br(){return"<br>"}del(e){return`<del>${e}</del>`}link(e,t,n){const s=x(e);if(s===null){return n}e=s;let r='<a href="'+e+'"';if(t){r+=' title="'+t+'"'}r+=">"+n+"</a>";return r}image(e,t,n){const s=x(e);if(s===null){return n}e=s;let r=`<img src="${e}" alt="${n}"`;if(t){r+=` title="${t}"`}r+=">";return r}text(e){return e}}class I{strong(e){return e}em(e){return e}codespan(e){return e}del(e){return e}html(e){return e}text(e){return e}link(e,t,n){return""+n}image(e,t,n){return""+n}br(){return""}}class E{options;renderer;textRenderer;constructor(e){this.options=e||r;this.options.renderer=this.options.renderer||new A;this.renderer=this.options.renderer;this.renderer.options=this.options;this.textRenderer=new I}static parse(e,t){const n=new E(t);return n.parse(e)}static parseInline(e,t){const n=new E(t);return n.parseInline(e)}parse(e,t=true){let n="";for(let s=0;s<e.length;s++){const r=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const e=r;const t=this.options.extensions.renderers[e.type].call({parser:this},e);if(t!==false||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(e.type)){n+=t||"";continue}}switch(r.type){case"space":{continue}case"hr":{n+=this.renderer.hr();continue}case"heading":{const e=r;n+=this.renderer.heading(this.parseInline(e.tokens),e.depth,g(this.parseInline(e.tokens,this.textRenderer)));continue}case"code":{const e=r;n+=this.renderer.code(e.text,e.lang,!!e.escaped);continue}case"table":{const e=r;let t="";let s="";for(let n=0;n<e.header.length;n++){s+=this.renderer.tablecell(this.parseInline(e.header[n].tokens),{header:true,align:e.align[n]})}t+=this.renderer.tablerow(s);let i="";for(let n=0;n<e.rows.length;n++){const t=e.rows[n];s="";for(let n=0;n<t.length;n++){s+=this.renderer.tablecell(this.parseInline(t[n].tokens),{header:false,align:e.align[n]})}i+=this.renderer.tablerow(s)}n+=this.renderer.table(t,i);continue}case"blockquote":{const e=r;const t=this.parse(e.tokens);n+=this.renderer.blockquote(t);continue}case"list":{const e=r;const t=e.ordered;const s=e.start;const i=e.loose;let l="";for(let n=0;n<e.items.length;n++){const t=e.items[n];const s=t.checked;const r=t.task;let o="";if(t.task){const e=this.renderer.checkbox(!!s);if(i){if(t.tokens.length>0&&t.tokens[0].type==="paragraph"){t.tokens[0].text=e+" "+t.tokens[0].text;if(t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"){t.tokens[0].tokens[0].text=e+" "+t.tokens[0].tokens[0].text}}else{t.tokens.unshift({type:"text",text:e+" "})}}else{o+=e+" "}}o+=this.parse(t.tokens,i);l+=this.renderer.listitem(o,r,!!s)}n+=this.renderer.list(l,t,s);continue}case"html":{const e=r;n+=this.renderer.html(e.text,e.block);continue}case"paragraph":{const e=r;n+=this.renderer.paragraph(this.parseInline(e.tokens));continue}case"text":{let i=r;let l=i.tokens?this.parseInline(i.tokens):i.text;while(s+1<e.length&&e[s+1].type==="text"){i=e[++s];l+="\n"+(i.tokens?this.parseInline(i.tokens):i.text)}n+=t?this.renderer.paragraph(l):l;continue}default:{const e='Token with "'+r.type+'" type was not found.';if(this.options.silent){console.error(e);return""}else{throw new Error(e)}}}}return n}parseInline(e,t){t=t||this.renderer;let n="";for(let s=0;s<e.length;s++){const r=e[s];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const e=this.options.extensions.renderers[r.type].call({parser:this},r);if(e!==false||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){n+=e||"";continue}}switch(r.type){case"escape":{const e=r;n+=t.text(e.text);break}case"html":{const e=r;n+=t.html(e.text);break}case"link":{const e=r;n+=t.link(e.href,e.title,this.parseInline(e.tokens,t));break}case"image":{const e=r;n+=t.image(e.href,e.title,e.text);break}case"strong":{const e=r;n+=t.strong(this.parseInline(e.tokens,t));break}case"em":{const e=r;n+=t.em(this.parseInline(e.tokens,t));break}case"codespan":{const e=r;n+=t.codespan(e.text);break}case"br":{n+=t.br();break}case"del":{const e=r;n+=t.del(this.parseInline(e.tokens,t));break}case"text":{const e=r;n+=t.text(e.text);break}default:{const e='Token with "'+r.type+'" type was not found.';if(this.options.silent){console.error(e);return""}else{throw new Error(e)}}}}return n}}class Z{options;constructor(e){this.options=e||r}static passThroughHooks=new Set(["preprocess","postprocess"]);preprocess(e){return e}postprocess(e){return e}}class q{defaults=s();options=this.setOptions;parse=this.#e(T.lex,E.parse);parseInline=this.#e(T.lexInline,E.parseInline);Parser=E;parser=E.parse;Renderer=A;TextRenderer=I;Lexer=T;lexer=T.lex;Tokenizer=z;Hooks=Z;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(const s of e){n=n.concat(t.call(this,s));switch(s.type){case"table":{const e=s;for(const s of e.header){n=n.concat(this.walkTokens(s.tokens,t))}for(const s of e.rows){for(const e of s){n=n.concat(this.walkTokens(e.tokens,t))}}break}case"list":{const e=s;n=n.concat(this.walkTokens(e.items,t));break}default:{const e=s;if(this.defaults.extensions?.childTokens?.[e.type]){this.defaults.extensions.childTokens[e.type].forEach((s=>{n=n.concat(this.walkTokens(e[s],t))}))}else if(e.tokens){n=n.concat(this.walkTokens(e.tokens,t))}}}}return n}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};e.forEach((e=>{const n={...e};n.async=this.defaults.async||n.async||false;if(e.extensions){e.extensions.forEach((e=>{if(!e.name){throw new Error("extension name required")}if("renderer"in e){const n=t.renderers[e.name];if(n){t.renderers[e.name]=function(...t){let s=e.renderer.apply(this,t);if(s===false){s=n.apply(this,t)}return s}}else{t.renderers[e.name]=e.renderer}}if("tokenizer"in e){if(!e.level||e.level!=="block"&&e.level!=="inline"){throw new Error("extension level must be 'block' or 'inline'")}const n=t[e.level];if(n){n.unshift(e.tokenizer)}else{t[e.level]=[e.tokenizer]}if(e.start){if(e.level==="block"){if(t.startBlock){t.startBlock.push(e.start)}else{t.startBlock=[e.start]}}else if(e.level==="inline"){if(t.startInline){t.startInline.push(e.start)}else{t.startInline=[e.start]}}}}if("childTokens"in e&&e.childTokens){t.childTokens[e.name]=e.childTokens}}));n.extensions=t}if(e.renderer){const t=this.defaults.renderer||new A(this.defaults);for(const n in e.renderer){const s=e.renderer[n];const r=n;const i=t[r];t[r]=(...e)=>{let n=s.apply(t,e);if(n===false){n=i.apply(t,e)}return n||""}}n.renderer=t}if(e.tokenizer){const t=this.defaults.tokenizer||new z(this.defaults);for(const n in e.tokenizer){const s=e.tokenizer[n];const r=n;const i=t[r];t[r]=(...e)=>{let n=s.apply(t,e);if(n===false){n=i.apply(t,e)}return n}}n.tokenizer=t}if(e.hooks){const t=this.defaults.hooks||new Z;for(const n in e.hooks){const s=e.hooks[n];const r=n;const i=t[r];if(Z.passThroughHooks.has(n)){t[r]=e=>{if(this.defaults.async){return Promise.resolve(s.call(t,e)).then((e=>i.call(t,e)))}const n=s.call(t,e);return i.call(t,n)}}else{t[r]=(...e)=>{let n=s.apply(t,e);if(n===false){n=i.apply(t,e)}return n}}}n.hooks=t}if(e.walkTokens){const t=this.defaults.walkTokens;const s=e.walkTokens;n.walkTokens=function(e){let n=[];n.push(s.call(this,e));if(t){n=n.concat(t.call(this,e))}return n}}this.defaults={...this.defaults,...n}}));return this}setOptions(e){this.defaults={...this.defaults,...e};return this}#e(e,t){return(n,s)=>{const r={...s};const i={...this.defaults,...r};if(this.defaults.async===true&&r.async===false){if(!i.silent){console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.")}i.async=true}const l=this.#t(!!i.silent,!!i.async);if(typeof n==="undefined"||n===null){return l(new Error("marked(): input parameter is undefined or null"))}if(typeof n!=="string"){return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"))}if(i.hooks){i.hooks.options=i}if(i.async){return Promise.resolve(i.hooks?i.hooks.preprocess(n):n).then((t=>e(t,i))).then((e=>i.walkTokens?Promise.all(this.walkTokens(e,i.walkTokens)).then((()=>e)):e)).then((e=>t(e,i))).then((e=>i.hooks?i.hooks.postprocess(e):e)).catch(l)}try{if(i.hooks){n=i.hooks.preprocess(n)}const s=e(n,i);if(i.walkTokens){this.walkTokens(s,i.walkTokens)}let r=t(s,i);if(i.hooks){r=i.hooks.postprocess(r)}return r}catch(o){return l(o)}}}#t(e,t){return n=>{n.message+="\nPlease report this to https://github.com/markedjs/marked.";if(e){const e="<p>An error occurred:</p><pre>"+u(n.message+"",true)+"</pre>";if(t){return Promise.resolve(e)}return e}if(t){return Promise.reject(n)}throw n}}}const L=new q;function D(e,t){return L.parse(e,t)}D.options=D.setOptions=function(e){L.setOptions(e);D.defaults=L.defaults;i(D.defaults);return D};D.getDefaults=s;D.defaults=r;D.use=function(...e){L.use(...e);D.defaults=L.defaults;i(D.defaults);return D};D.walkTokens=function(e,t){return L.walkTokens(e,t)};D.parseInline=L.parseInline;D.Parser=E;D.parser=E.parse;D.Renderer=A;D.TextRenderer=I;D.Lexer=T;D.lexer=T.lex;D.Tokenizer=z;D.Hooks=Z;D.parse=D;const P=D.options;const v=D.setOptions;const B=D.use;const Q=D.walkTokens;const C=D.parseInline;const M=D;const O=E.parse;const j=T.lex}}]);
//# sourceMappingURL=8085.5e572478085996cd998d.js.map?v=5e572478085996cd998d