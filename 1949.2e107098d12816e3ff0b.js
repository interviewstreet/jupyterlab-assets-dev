"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[1949],{31949:(e,t,i)=>{i.r(t);i.d(t,{RegExpCursor:()=>u,SearchCursor:()=>a,SearchQuery:()=>V,closeSearchPanel:()=>ue,findNext:()=>ie,findPrevious:()=>re,getSearchQuery:()=>U,gotoLine:()=>w,highlightSelectionMatches:()=>k,openSearchPanel:()=>he,replaceAll:()=>le,replaceNext:()=>oe,search:()=>I,searchKeymap:()=>fe,searchPanelOpen:()=>J,selectMatches:()=>ne,selectNextOccurrence:()=>F,selectSelectionMatches:()=>se,setSearchQuery:()=>K});var r=i(5502);var n=i(46035);function s(){var e=arguments[0];if(typeof e=="string")e=document.createElement(e);var t=1,i=arguments[1];if(i&&typeof i=="object"&&i.nodeType==null&&!Array.isArray(i)){for(var r in i)if(Object.prototype.hasOwnProperty.call(i,r)){var n=i[r];if(typeof n=="string")e.setAttribute(r,n);else if(n!=null)e[r]=n}t++}for(;t<arguments.length;t++)o(e,arguments[t]);return e}function o(e,t){if(typeof t=="string"){e.appendChild(document.createTextNode(t))}else if(t==null){}else if(t.nodeType!=null){e.appendChild(t)}else if(Array.isArray(t)){for(var i=0;i<t.length;i++)o(e,t[i])}else{throw new RangeError("Unsupported child node: "+t)}}const l=typeof String.prototype.normalize=="function"?e=>e.normalize("NFKD"):e=>e;class a{constructor(e,t,i=0,r=e.length,n,s){this.test=s;this.value={from:0,to:0};this.done=false;this.matches=[];this.buffer="";this.bufferPos=0;this.iter=e.iterRange(i,r);this.bufferStart=i;this.normalize=n?e=>n(l(e)):l;this.query=this.normalize(t)}peek(){if(this.bufferPos==this.buffer.length){this.bufferStart+=this.buffer.length;this.iter.next();if(this.iter.done)return-1;this.bufferPos=0;this.buffer=this.iter.value}return(0,n.codePointAt)(this.buffer,this.bufferPos)}next(){while(this.matches.length)this.matches.pop();return this.nextOverlapping()}nextOverlapping(){for(;;){let e=this.peek();if(e<0){this.done=true;return this}let t=(0,n.fromCodePoint)(e),i=this.bufferStart+this.bufferPos;this.bufferPos+=(0,n.codePointSize)(e);let r=this.normalize(t);for(let n=0,s=i;;n++){let e=r.charCodeAt(n);let o=this.match(e,s);if(o){this.value=o;return this}if(n==r.length-1)break;if(s==i&&n<t.length&&t.charCodeAt(n)==e)s++}}}match(e,t){let i=null;for(let r=0;r<this.matches.length;r+=2){let n=this.matches[r],s=false;if(this.query.charCodeAt(n)==e){if(n==this.query.length-1){i={from:this.matches[r+1],to:t+1}}else{this.matches[r]++;s=true}}if(!s){this.matches.splice(r,2);r-=2}}if(this.query.charCodeAt(0)==e){if(this.query.length==1)i={from:t,to:t+1};else this.matches.push(1,t)}if(i&&this.test&&!this.test(i.from,i.to,this.buffer,this.bufferPos))i=null;return i}}if(typeof Symbol!="undefined")a.prototype[Symbol.iterator]=function(){return this};const c={from:-1,to:-1,match:/.*/.exec("")};const h="gm"+(/x/.unicode==null?"":"u");class u{constructor(e,t,i,r=0,n=e.length){this.text=e;this.to=n;this.curLine="";this.done=false;this.value=c;if(/\\[sWDnr]|\n|\r|\[\^/.test(t))return new p(e,t,i,r,n);this.re=new RegExp(t,h+((i===null||i===void 0?void 0:i.ignoreCase)?"i":""));this.test=i===null||i===void 0?void 0:i.test;this.iter=e.iter();let s=e.lineAt(r);this.curLineStart=s.from;this.matchPos=g(e,r);this.getLine(this.curLineStart)}getLine(e){this.iter.next(e);if(this.iter.lineBreak){this.curLine=""}else{this.curLine=this.iter.value;if(this.curLineStart+this.curLine.length>this.to)this.curLine=this.curLine.slice(0,this.to-this.curLineStart);this.iter.next()}}nextLine(){this.curLineStart=this.curLineStart+this.curLine.length+1;if(this.curLineStart>this.to)this.curLine="";else this.getLine(0)}next(){for(let e=this.matchPos-this.curLineStart;;){this.re.lastIndex=e;let t=this.matchPos<=this.to&&this.re.exec(this.curLine);if(t){let i=this.curLineStart+t.index,r=i+t[0].length;this.matchPos=g(this.text,r+(i==r?1:0));if(i==this.curLineStart+this.curLine.length)this.nextLine();if((i<r||i>this.value.to)&&(!this.test||this.test(i,r,t))){this.value={from:i,to:r,match:t};return this}e=this.matchPos-this.curLineStart}else if(this.curLineStart+this.curLine.length<this.to){this.nextLine();e=0}else{this.done=true;return this}}}}const f=new WeakMap;class d{constructor(e,t){this.from=e;this.text=t}get to(){return this.from+this.text.length}static get(e,t,i){let r=f.get(e);if(!r||r.from>=i||r.to<=t){let r=new d(t,e.sliceString(t,i));f.set(e,r);return r}if(r.from==t&&r.to==i)return r;let{text:n,from:s}=r;if(s>t){n=e.sliceString(t,s)+n;s=t}if(r.to<i)n+=e.sliceString(r.to,i);f.set(e,new d(s,n));return new d(t,n.slice(t-s,i-s))}}class p{constructor(e,t,i,r,n){this.text=e;this.to=n;this.done=false;this.value=c;this.matchPos=g(e,r);this.re=new RegExp(t,h+((i===null||i===void 0?void 0:i.ignoreCase)?"i":""));this.test=i===null||i===void 0?void 0:i.test;this.flat=d.get(e,r,this.chunkEnd(r+5e3))}chunkEnd(e){return e>=this.to?this.to:this.text.lineAt(e).to}next(){for(;;){let e=this.re.lastIndex=this.matchPos-this.flat.from;let t=this.re.exec(this.flat.text);if(t&&!t[0]&&t.index==e){this.re.lastIndex=e+1;t=this.re.exec(this.flat.text)}if(t){let e=this.flat.from+t.index,i=e+t[0].length;if((this.flat.to>=this.to||t.index+t[0].length<=this.flat.text.length-10)&&(!this.test||this.test(e,i,t))){this.value={from:e,to:i,match:t};this.matchPos=g(this.text,i+(e==i?1:0));return this}}if(this.flat.to==this.to){this.done=true;return this}this.flat=d.get(this.text,this.flat.from,this.chunkEnd(this.flat.from+this.flat.text.length*2))}}}if(typeof Symbol!="undefined"){u.prototype[Symbol.iterator]=p.prototype[Symbol.iterator]=function(){return this}}function m(e){try{new RegExp(e,h);return true}catch(t){return false}}function g(e,t){if(t>=e.length)return t;let i=e.lineAt(t),r;while(t<i.to&&(r=i.text.charCodeAt(t-i.from))>=56320&&r<57344)t++;return t}function v(e){let t=s("input",{class:"cm-textfield",name:"line"});let i=s("form",{class:"cm-gotoLine",onkeydown:t=>{if(t.keyCode==27){t.preventDefault();e.dispatch({effects:x.of(false)});e.focus()}else if(t.keyCode==13){t.preventDefault();r()}},onsubmit:e=>{e.preventDefault();r()}},s("label",e.state.phrase("Go to line"),": ",t)," ",s("button",{class:"cm-button",type:"submit"},e.state.phrase("go")));function r(){let i=/^([+-])?(\d+)?(:\d+)?(%)?$/.exec(t.value);if(!i)return;let{state:r}=e,s=r.doc.lineAt(r.selection.main.head);let[,o,l,a,c]=i;let h=a?+a.slice(1):0;let u=l?+l:s.number;if(l&&c){let e=u/100;if(o)e=e*(o=="-"?-1:1)+s.number/r.doc.lines;u=Math.round(r.doc.lines*e)}else if(l&&o){u=u*(o=="-"?-1:1)+s.number}let f=r.doc.line(Math.max(1,Math.min(r.doc.lines,u)));e.dispatch({effects:x.of(false),selection:n.EditorSelection.cursor(f.from+Math.max(0,Math.min(h,f.length))),scrollIntoView:true});e.focus()}return{dom:i}}const x=n.StateEffect.define();const y=n.StateField.define({create(){return true},update(e,t){for(let i of t.effects)if(i.is(x))e=i.value;return e},provide:e=>r.showPanel.from(e,(e=>e?v:null))});const w=e=>{let t=(0,r.getPanel)(e,v);if(!t){let i=[x.of(true)];if(e.state.field(y,false)==null)i.push(n.StateEffect.appendConfig.of([y,b]));e.dispatch({effects:i});t=(0,r.getPanel)(e,v)}if(t)t.dom.querySelector("input").focus();return true};const b=r.EditorView.baseTheme({".cm-panel.cm-gotoLine":{padding:"2px 6px 4px","& label":{fontSize:"80%"}}});const S={highlightWordAroundCursor:false,minSelectionLength:1,maxMatches:100,wholeWords:false};const C=n.Facet.define({combine(e){return(0,n.combineConfig)(e,S,{highlightWordAroundCursor:(e,t)=>e||t,minSelectionLength:Math.min,maxMatches:Math.min})}});function k(e){let t=[P,L];if(e)t.push(C.of(e));return t}const M=r.Decoration.mark({class:"cm-selectionMatch"});const E=r.Decoration.mark({class:"cm-selectionMatch cm-selectionMatch-main"});function D(e,t,i,r){return(i==0||e(t.sliceDoc(i-1,i))!=n.CharCategory.Word)&&(r==t.doc.length||e(t.sliceDoc(r,r+1))!=n.CharCategory.Word)}function q(e,t,i,r){return e(t.sliceDoc(i,i+1))==n.CharCategory.Word&&e(t.sliceDoc(r-1,r))==n.CharCategory.Word}const L=r.ViewPlugin.fromClass(class{constructor(e){this.decorations=this.getDeco(e)}update(e){if(e.selectionSet||e.docChanged||e.viewportChanged)this.decorations=this.getDeco(e.view)}getDeco(e){let t=e.state.facet(C);let{state:i}=e,n=i.selection;if(n.ranges.length>1)return r.Decoration.none;let s=n.main,o,l=null;if(s.empty){if(!t.highlightWordAroundCursor)return r.Decoration.none;let e=i.wordAt(s.head);if(!e)return r.Decoration.none;l=i.charCategorizer(s.head);o=i.sliceDoc(e.from,e.to)}else{let e=s.to-s.from;if(e<t.minSelectionLength||e>200)return r.Decoration.none;if(t.wholeWords){o=i.sliceDoc(s.from,s.to);l=i.charCategorizer(s.head);if(!(D(l,i,s.from,s.to)&&q(l,i,s.from,s.to)))return r.Decoration.none}else{o=i.sliceDoc(s.from,s.to).trim();if(!o)return r.Decoration.none}}let c=[];for(let h of e.visibleRanges){let e=new a(i.doc,o,h.from,h.to);while(!e.next().done){let{from:n,to:o}=e.value;if(!l||D(l,i,n,o)){if(s.empty&&n<=s.from&&o>=s.to)c.push(E.range(n,o));else if(n>=s.to||o<=s.from)c.push(M.range(n,o));if(c.length>t.maxMatches)return r.Decoration.none}}}return r.Decoration.set(c)}},{decorations:e=>e.decorations});const P=r.EditorView.baseTheme({".cm-selectionMatch":{backgroundColor:"#99ff7780"},".cm-searchMatch .cm-selectionMatch":{backgroundColor:"transparent"}});const A=({state:e,dispatch:t})=>{let{selection:i}=e;let r=n.EditorSelection.create(i.ranges.map((t=>e.wordAt(t.head)||n.EditorSelection.cursor(t.head))),i.mainIndex);if(r.eq(i))return false;t(e.update({selection:r}));return true};function W(e,t){let{main:i,ranges:r}=e.selection;let n=e.wordAt(i.head),s=n&&n.from==i.from&&n.to==i.to;for(let o=false,l=new a(e.doc,t,r[r.length-1].to);;){l.next();if(l.done){if(o)return null;l=new a(e.doc,t,0,Math.max(0,r[r.length-1].from-1));o=true}else{if(o&&r.some((e=>e.from==l.value.from)))continue;if(s){let t=e.wordAt(l.value.from);if(!t||t.from!=l.value.from||t.to!=l.value.to)continue}return l.value}}}const F=({state:e,dispatch:t})=>{let{ranges:i}=e.selection;if(i.some((e=>e.from===e.to)))return A({state:e,dispatch:t});let s=e.sliceDoc(i[0].from,i[0].to);if(e.selection.ranges.some((t=>e.sliceDoc(t.from,t.to)!=s)))return false;let o=W(e,s);if(!o)return false;t(e.update({selection:e.selection.addRange(n.EditorSelection.range(o.from,o.to),false),effects:r.EditorView.scrollIntoView(o.to)}));return true};const R=n.Facet.define({combine(e){return(0,n.combineConfig)(e,{top:false,caseSensitive:false,literal:false,wholeWord:false,createPanel:e=>new de(e),scrollToMatch:e=>r.EditorView.scrollIntoView(e)})}});function I(e){return e?[R.of(e),ye]:ye}class V{constructor(e){this.search=e.search;this.caseSensitive=!!e.caseSensitive;this.literal=!!e.literal;this.regexp=!!e.regexp;this.replace=e.replace||"";this.valid=!!this.search&&(!this.regexp||m(this.search));this.unquoted=this.unquote(this.search);this.wholeWord=!!e.wholeWord}unquote(e){return this.literal?e:e.replace(/\\([nrt\\])/g,((e,t)=>t=="n"?"\n":t=="r"?"\r":t=="t"?"\t":"\\"))}eq(e){return this.search==e.search&&this.replace==e.replace&&this.caseSensitive==e.caseSensitive&&this.regexp==e.regexp&&this.wholeWord==e.wholeWord}create(){return this.regexp?new B(this):new $(this)}getCursor(e,t=0,i){let r=e.doc?e:n.EditorState.create({doc:e});if(i==null)i=r.doc.length;return this.regexp?_(this,r,t,i):O(this,r,t,i)}}class z{constructor(e){this.spec=e}}function O(e,t,i,r){return new a(t.doc,e.unquoted,i,r,e.caseSensitive?undefined:e=>e.toLowerCase(),e.wholeWord?T(t.doc,t.charCategorizer(t.selection.main.head)):undefined)}function T(e,t){return(i,r,s,o)=>{if(o>i||o+s.length<r){o=Math.max(0,i-2);s=e.sliceString(o,Math.min(e.length,r+2))}return(t(N(s,i-o))!=n.CharCategory.Word||t(Q(s,i-o))!=n.CharCategory.Word)&&(t(Q(s,r-o))!=n.CharCategory.Word||t(N(s,r-o))!=n.CharCategory.Word)}}class $ extends z{constructor(e){super(e)}nextMatch(e,t,i){let r=O(this.spec,e,i,e.doc.length).nextOverlapping();if(r.done)r=O(this.spec,e,0,t).nextOverlapping();return r.done?null:r.value}prevMatchInRange(e,t,i){for(let r=i;;){let i=Math.max(t,r-1e4-this.spec.unquoted.length);let n=O(this.spec,e,i,r),s=null;while(!n.nextOverlapping().done)s=n.value;if(s)return s;if(i==t)return null;r-=1e4}}prevMatch(e,t,i){return this.prevMatchInRange(e,0,t)||this.prevMatchInRange(e,i,e.doc.length)}getReplacement(e){return this.spec.unquote(this.spec.replace)}matchAll(e,t){let i=O(this.spec,e,0,e.doc.length),r=[];while(!i.next().done){if(r.length>=t)return null;r.push(i.value)}return r}highlight(e,t,i,r){let n=O(this.spec,e,Math.max(0,t-this.spec.unquoted.length),Math.min(i+this.spec.unquoted.length,e.doc.length));while(!n.next().done)r(n.value.from,n.value.to)}}function _(e,t,i,r){return new u(t.doc,e.search,{ignoreCase:!e.caseSensitive,test:e.wholeWord?j(t.charCategorizer(t.selection.main.head)):undefined},i,r)}function N(e,t){return e.slice((0,n.findClusterBreak)(e,t,false),t)}function Q(e,t){return e.slice(t,(0,n.findClusterBreak)(e,t))}function j(e){return(t,i,r)=>!r[0].length||(e(N(r.input,r.index))!=n.CharCategory.Word||e(Q(r.input,r.index))!=n.CharCategory.Word)&&(e(Q(r.input,r.index+r[0].length))!=n.CharCategory.Word||e(N(r.input,r.index+r[0].length))!=n.CharCategory.Word)}class B extends z{nextMatch(e,t,i){let r=_(this.spec,e,i,e.doc.length).next();if(r.done)r=_(this.spec,e,0,t).next();return r.done?null:r.value}prevMatchInRange(e,t,i){for(let r=1;;r++){let n=Math.max(t,i-r*1e4);let s=_(this.spec,e,n,i),o=null;while(!s.next().done)o=s.value;if(o&&(n==t||o.from>n+10))return o;if(n==t)return null}}prevMatch(e,t,i){return this.prevMatchInRange(e,0,t)||this.prevMatchInRange(e,i,e.doc.length)}getReplacement(e){return this.spec.unquote(this.spec.replace.replace(/\$([$&\d+])/g,((t,i)=>i=="$"?"$":i=="&"?e.match[0]:i!="0"&&+i<e.match.length?e.match[i]:t)))}matchAll(e,t){let i=_(this.spec,e,0,e.doc.length),r=[];while(!i.next().done){if(r.length>=t)return null;r.push(i.value)}return r}highlight(e,t,i,r){let n=_(this.spec,e,Math.max(0,t-250),Math.min(i+250,e.doc.length));while(!n.next().done)r(n.value.from,n.value.to)}}const K=n.StateEffect.define();const G=n.StateEffect.define();const H=n.StateField.define({create(e){return new X(ce(e).create(),null)},update(e,t){for(let i of t.effects){if(i.is(K))e=new X(i.value.create(),e.panel);else if(i.is(G))e=new X(e.query,i.value?ae:null)}return e},provide:e=>r.showPanel.from(e,(e=>e.panel))});function U(e){let t=e.field(H,false);return t?t.query.spec:ce(e)}function J(e){var t;return((t=e.field(H,false))===null||t===void 0?void 0:t.panel)!=null}class X{constructor(e,t){this.query=e;this.panel=t}}const Y=r.Decoration.mark({class:"cm-searchMatch"}),Z=r.Decoration.mark({class:"cm-searchMatch cm-searchMatch-selected"});const ee=r.ViewPlugin.fromClass(class{constructor(e){this.view=e;this.decorations=this.highlight(e.state.field(H))}update(e){let t=e.state.field(H);if(t!=e.startState.field(H)||e.docChanged||e.selectionSet||e.viewportChanged)this.decorations=this.highlight(t)}highlight({query:e,panel:t}){if(!t||!e.spec.valid)return r.Decoration.none;let{view:i}=this;let s=new n.RangeSetBuilder;for(let r=0,n=i.visibleRanges,o=n.length;r<o;r++){let{from:t,to:l}=n[r];while(r<o-1&&l>n[r+1].from-2*250)l=n[++r].to;e.highlight(i.state,t,l,((e,t)=>{let r=i.state.selection.ranges.some((i=>i.from==e&&i.to==t));s.add(e,t,r?Z:Y)}))}return s.finish()}},{decorations:e=>e.decorations});function te(e){return t=>{let i=t.state.field(H,false);return i&&i.query.spec.valid?e(t,i):he(t)}}const ie=te(((e,{query:t})=>{let{to:i}=e.state.selection.main;let r=t.nextMatch(e.state,i,i);if(!r)return false;let s=n.EditorSelection.single(r.from,r.to);let o=e.state.facet(R);e.dispatch({selection:s,effects:[ve(e,r),o.scrollToMatch(s.main)],userEvent:"select.search"});return true}));const re=te(((e,{query:t})=>{let{state:i}=e,{from:r}=i.selection.main;let s=t.prevMatch(i,r,r);if(!s)return false;let o=n.EditorSelection.single(s.from,s.to);let l=e.state.facet(R);e.dispatch({selection:o,effects:[ve(e,s),l.scrollToMatch(o.main)],userEvent:"select.search"});return true}));const ne=te(((e,{query:t})=>{let i=t.matchAll(e.state,1e3);if(!i||!i.length)return false;e.dispatch({selection:n.EditorSelection.create(i.map((e=>n.EditorSelection.range(e.from,e.to)))),userEvent:"select.search.matches"});return true}));const se=({state:e,dispatch:t})=>{let i=e.selection;if(i.ranges.length>1||i.main.empty)return false;let{from:r,to:s}=i.main;let o=[],l=0;for(let c=new a(e.doc,e.sliceDoc(r,s));!c.next().done;){if(o.length>1e3)return false;if(c.value.from==r)l=o.length;o.push(n.EditorSelection.range(c.value.from,c.value.to))}t(e.update({selection:n.EditorSelection.create(o,l),userEvent:"select.search.matches"}));return true};const oe=te(((e,{query:t})=>{let{state:i}=e,{from:s,to:o}=i.selection.main;if(i.readOnly)return false;let l=t.nextMatch(i,s,s);if(!l)return false;let a=[],c,h;let u=[];if(l.from==s&&l.to==o){h=i.toText(t.getReplacement(l));a.push({from:l.from,to:l.to,insert:h});l=t.nextMatch(i,l.from,l.to);u.push(r.EditorView.announce.of(i.phrase("replaced match on line $",i.doc.lineAt(s).number)+"."))}if(l){let t=a.length==0||a[0].from>=l.to?0:l.to-l.from-h.length;c=n.EditorSelection.single(l.from-t,l.to-t);u.push(ve(e,l));u.push(i.facet(R).scrollToMatch(c.main))}e.dispatch({changes:a,selection:c,effects:u,userEvent:"input.replace"});return true}));const le=te(((e,{query:t})=>{if(e.state.readOnly)return false;let i=t.matchAll(e.state,1e9).map((e=>{let{from:i,to:r}=e;return{from:i,to:r,insert:t.getReplacement(e)}}));if(!i.length)return false;let n=e.state.phrase("replaced $ matches",i.length)+".";e.dispatch({changes:i,effects:r.EditorView.announce.of(n),userEvent:"input.replace.all"});return true}));function ae(e){return e.state.facet(R).createPanel(e)}function ce(e,t){var i,r,n,s;let o=e.selection.main;let l=o.empty||o.to>o.from+100?"":e.sliceDoc(o.from,o.to);if(t&&!l)return t;let a=e.facet(R);return new V({search:((i=t===null||t===void 0?void 0:t.literal)!==null&&i!==void 0?i:a.literal)?l:l.replace(/\n/g,"\\n"),caseSensitive:(r=t===null||t===void 0?void 0:t.caseSensitive)!==null&&r!==void 0?r:a.caseSensitive,literal:(n=t===null||t===void 0?void 0:t.literal)!==null&&n!==void 0?n:a.literal,wholeWord:(s=t===null||t===void 0?void 0:t.wholeWord)!==null&&s!==void 0?s:a.wholeWord})}const he=e=>{let t=e.state.field(H,false);if(t&&t.panel){let i=(0,r.getPanel)(e,ae);if(!i)return false;let n=i.dom.querySelector("[main-field]");if(n&&n!=e.root.activeElement){let i=ce(e.state,t.query.spec);if(i.valid)e.dispatch({effects:K.of(i)});n.focus();n.select()}}else{e.dispatch({effects:[G.of(true),t?K.of(ce(e.state,t.query.spec)):n.StateEffect.appendConfig.of(ye)]})}return true};const ue=e=>{let t=e.state.field(H,false);if(!t||!t.panel)return false;let i=(0,r.getPanel)(e,ae);if(i&&i.dom.contains(e.root.activeElement))e.focus();e.dispatch({effects:G.of(false)});return true};const fe=[{key:"Mod-f",run:he,scope:"editor search-panel"},{key:"F3",run:ie,shift:re,scope:"editor search-panel",preventDefault:true},{key:"Mod-g",run:ie,shift:re,scope:"editor search-panel",preventDefault:true},{key:"Escape",run:ue,scope:"editor search-panel"},{key:"Mod-Shift-l",run:se},{key:"Alt-g",run:w},{key:"Mod-d",run:F,preventDefault:true}];class de{constructor(e){this.view=e;let t=this.query=e.state.field(H).query.spec;this.commit=this.commit.bind(this);this.searchField=s("input",{value:t.search,placeholder:pe(e,"Find"),"aria-label":pe(e,"Find"),class:"cm-textfield",name:"search",form:"","main-field":"true",onchange:this.commit,onkeyup:this.commit});this.replaceField=s("input",{value:t.replace,placeholder:pe(e,"Replace"),"aria-label":pe(e,"Replace"),class:"cm-textfield",name:"replace",form:"",onchange:this.commit,onkeyup:this.commit});this.caseField=s("input",{type:"checkbox",name:"case",form:"",checked:t.caseSensitive,onchange:this.commit});this.reField=s("input",{type:"checkbox",name:"re",form:"",checked:t.regexp,onchange:this.commit});this.wordField=s("input",{type:"checkbox",name:"word",form:"",checked:t.wholeWord,onchange:this.commit});function i(e,t,i){return s("button",{class:"cm-button",name:e,onclick:t,type:"button"},i)}this.dom=s("div",{onkeydown:e=>this.keydown(e),class:"cm-search"},[this.searchField,i("next",(()=>ie(e)),[pe(e,"next")]),i("prev",(()=>re(e)),[pe(e,"previous")]),i("select",(()=>ne(e)),[pe(e,"all")]),s("label",null,[this.caseField,pe(e,"match case")]),s("label",null,[this.reField,pe(e,"regexp")]),s("label",null,[this.wordField,pe(e,"by word")]),...e.state.readOnly?[]:[s("br"),this.replaceField,i("replace",(()=>oe(e)),[pe(e,"replace")]),i("replaceAll",(()=>le(e)),[pe(e,"replace all")])],s("button",{name:"close",onclick:()=>ue(e),"aria-label":pe(e,"close"),type:"button"},["×"])])}commit(){let e=new V({search:this.searchField.value,caseSensitive:this.caseField.checked,regexp:this.reField.checked,wholeWord:this.wordField.checked,replace:this.replaceField.value});if(!e.eq(this.query)){this.query=e;this.view.dispatch({effects:K.of(e)})}}keydown(e){if((0,r.runScopeHandlers)(this.view,e,"search-panel")){e.preventDefault()}else if(e.keyCode==13&&e.target==this.searchField){e.preventDefault();(e.shiftKey?re:ie)(this.view)}else if(e.keyCode==13&&e.target==this.replaceField){e.preventDefault();oe(this.view)}}update(e){for(let t of e.transactions)for(let e of t.effects){if(e.is(K)&&!e.value.eq(this.query))this.setQuery(e.value)}}setQuery(e){this.query=e;this.searchField.value=e.search;this.replaceField.value=e.replace;this.caseField.checked=e.caseSensitive;this.reField.checked=e.regexp;this.wordField.checked=e.wholeWord}mount(){this.searchField.select()}get pos(){return 80}get top(){return this.view.state.facet(R).top}}function pe(e,t){return e.state.phrase(t)}const me=30;const ge=/[\s\.,:;?!]/;function ve(e,{from:t,to:i}){let n=e.state.doc.lineAt(t),s=e.state.doc.lineAt(i).to;let o=Math.max(n.from,t-me),l=Math.min(s,i+me);let a=e.state.sliceDoc(o,l);if(o!=n.from){for(let e=0;e<me;e++)if(!ge.test(a[e+1])&&ge.test(a[e])){a=a.slice(e);break}}if(l!=s){for(let e=a.length-1;e>a.length-me;e--)if(!ge.test(a[e-1])&&ge.test(a[e])){a=a.slice(0,e);break}}return r.EditorView.announce.of(`${e.state.phrase("current match")}. ${a} ${e.state.phrase("on line")} ${n.number}.`)}const xe=r.EditorView.baseTheme({".cm-panel.cm-search":{padding:"2px 6px 4px",position:"relative","& [name=close]":{position:"absolute",top:"0",right:"4px",backgroundColor:"inherit",border:"none",font:"inherit",padding:0,margin:0},"& input, & button, & label":{margin:".2em .6em .2em 0"},"& input[type=checkbox]":{marginRight:".2em"},"& label":{fontSize:"80%",whiteSpace:"pre"}},"&light .cm-searchMatch":{backgroundColor:"#ffff0054"},"&dark .cm-searchMatch":{backgroundColor:"#00ffff8a"},"&light .cm-searchMatch-selected":{backgroundColor:"#ff6a0054"},"&dark .cm-searchMatch-selected":{backgroundColor:"#ff00ff8a"}});const ye=[H,n.Prec.lowest(ee),xe]}}]);
//# sourceMappingURL=1949.2e107098d12816e3ff0b.js.map?v=2e107098d12816e3ff0b