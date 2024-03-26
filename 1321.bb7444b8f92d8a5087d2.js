"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[1321,7310],{97310:(e,t,n)=>{n.r(t);n.d(t,{IMarkdownViewerTracker:()=>a,MarkdownDocument:()=>_,MarkdownViewer:()=>w,MarkdownViewerFactory:()=>y,MarkdownViewerTableOfContentsFactory:()=>s,MarkdownViewerTableOfContentsModel:()=>i});var r=n(41252);class i extends r.TableOfContentsModel{constructor(e,t,n){super(e,n);this.parser=t}get documentType(){return"markdown-viewer"}get isAlwaysActive(){return true}get supportedOptions(){return["maximalDepth","numberingH1","numberHeaders"]}getHeadings(){const e=this.widget.context.model.toString();const t=r.TableOfContentsUtils.filterHeadings(r.TableOfContentsUtils.Markdown.getHeadings(e),{...this.configuration,baseNumbering:1});return Promise.resolve(t)}}class s extends r.TableOfContentsFactory{constructor(e,t,n){super(e);this.parser=t;this.sanitizer=n}_createNew(e,t){const n=new i(e,this.parser,t);let s=new WeakMap;const o=(t,n)=>{if(n){const t=s.get(n);if(t){const n=e.content.node.getBoundingClientRect();const r=t.getBoundingClientRect();if(r.top>n.bottom||r.bottom<n.top){t.scrollIntoView({block:"center"})}}else{console.warn("Heading element not found for heading",n,"in widget",e)}}};const a=()=>{if(!this.parser){return}r.TableOfContentsUtils.clearNumbering(e.content.node);s=new WeakMap;n.headings.forEach((async t=>{var n;const i=await r.TableOfContentsUtils.Markdown.getHeadingId(this.parser,t.raw,t.level,this.sanitizer);if(!i){return}const o=`h${t.level}[id="${CSS.escape(i)}"]`;s.set(t,r.TableOfContentsUtils.addPrefix(e.content.node,o,(n=t.prefix)!==null&&n!==void 0?n:""))}))};void e.content.ready.then((()=>{a();e.content.rendered.connect(a);n.activeHeadingChanged.connect(o);n.headingsChanged.connect(a);e.disposed.connect((()=>{e.content.rendered.disconnect(a);n.activeHeadingChanged.disconnect(o);n.headingsChanged.disconnect(a)}))}));return n}}var o=n(55172);const a=new o.Token("@jupyterlab/markdownviewer:IMarkdownViewerTracker",`A widget tracker for markdown\n  document viewers. Use this if you want to iterate over and interact with rendered markdown documents.`);var d=n(87447);var c=n(78098);var l=n(35627);var h=n(59238);var u=n(50724);var g=n(19289);var f=n(65178);const p="jp-MarkdownViewer";const m="text/markdown";class w extends f.Widget{constructor(e){super();this._config={...w.defaultConfig};this._fragment="";this._ready=new o.PromiseDelegate;this._isRendering=false;this._renderRequested=false;this._rendered=new g.Signal(this);this.context=e.context;this.translator=e.translator||u.nullTranslator;this._trans=this.translator.load("jupyterlab");this.renderer=e.renderer;this.node.tabIndex=0;this.addClass(p);const t=this.layout=new f.StackedLayout;t.addWidget(this.renderer);void this.context.ready.then((async()=>{await this._render();this._monitor=new c.ActivityMonitor({signal:this.context.model.contentChanged,timeout:this._config.renderTimeout});this._monitor.activityStopped.connect(this.update,this);this._ready.resolve(undefined)}))}get ready(){return this._ready.promise}get rendered(){return this._rendered}setFragment(e){this._fragment=e;this.update()}setOption(e,t){if(this._config[e]===t){return}this._config[e]=t;const{style:n}=this.renderer.node;switch(e){case"fontFamily":n.setProperty("font-family",t);break;case"fontSize":n.setProperty("font-size",t?t+"px":null);break;case"hideFrontMatter":this.update();break;case"lineHeight":n.setProperty("line-height",t?t.toString():null);break;case"lineWidth":{const e=t?`calc(50% - ${t/2}ch)`:null;n.setProperty("padding-left",e);n.setProperty("padding-right",e);break}case"renderTimeout":if(this._monitor){this._monitor.timeout=t}break;default:break}}dispose(){if(this.isDisposed){return}if(this._monitor){this._monitor.dispose()}this._monitor=null;super.dispose()}onUpdateRequest(e){if(this.context.isReady&&!this.isDisposed){void this._render();this._fragment=""}}onActivateRequest(e){this.node.focus()}async _render(){if(this.isDisposed){return}if(this._isRendering){this._renderRequested=true;return}this._renderRequested=false;const{context:e}=this;const{model:t}=e;const n=t.toString();const r={};r[m]=this._config.hideFrontMatter?v.removeFrontMatter(n):n;const i=new h.MimeModel({data:r,metadata:{fragment:this._fragment}});try{this._isRendering=true;await this.renderer.renderModel(i);this._isRendering=false;if(this._renderRequested){return this._render()}else{this._rendered.emit()}}catch(s){requestAnimationFrame((()=>{this.dispose()}));void(0,d.showErrorMessage)(this._trans.__("Renderer Failure: %1",e.path),s)}}}(function(e){e.defaultConfig={fontFamily:null,fontSize:null,lineHeight:null,lineWidth:null,hideFrontMatter:true,renderTimeout:1e3}})(w||(w={}));class _ extends l.DocumentWidget{setFragment(e){this.content.setFragment(e)}}class y extends l.ABCWidgetFactory{constructor(e){super(v.createRegistryOptions(e));this._fileType=e.primaryFileType;this._rendermime=e.rendermime}createNewWidget(e){var t,n,r,i,s;const o=this._rendermime.clone({resolver:e.urlResolver});const a=o.createRenderer(m);const d=new w({context:e,renderer:a});d.title.icon=(t=this._fileType)===null||t===void 0?void 0:t.icon;d.title.iconClass=(r=(n=this._fileType)===null||n===void 0?void 0:n.iconClass)!==null&&r!==void 0?r:"";d.title.iconLabel=(s=(i=this._fileType)===null||i===void 0?void 0:i.iconLabel)!==null&&s!==void 0?s:"";d.title.caption=this.label;const c=new _({content:d,context:e});return c}}var v;(function(e){function t(e){return{...e,readOnly:true}}e.createRegistryOptions=t;function n(e){const t=/^---\n[^]*?\n(---|...)\n/;const n=e.match(t);if(!n){return e}const{length:r}=n[0];return e.slice(r)}e.removeFrontMatter=n})(v||(v={}))}}]);
//# sourceMappingURL=1321.bb7444b8f92d8a5087d2.js.map?v=bb7444b8f92d8a5087d2