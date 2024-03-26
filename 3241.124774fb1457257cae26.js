"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[3241,1206],{93241:(t,e,s)=>{s.r(e);s.d(e,{IInspector:()=>m,InspectionHandler:()=>d,InspectorPanel:()=>g,KernelConnector:()=>C});var n=s(78098);var i=s(59238);var o=s(55172);var r=s(65061);var c=s(19289);class d{constructor(t){this._cleared=new c.Signal(this);this._disposed=new c.Signal(this);this._editor=null;this._inspected=new c.Signal(this);this._isDisposed=false;this._pending=0;this._standby=true;this._lastInspectedReply=null;this._connector=t.connector;this._rendermime=t.rendermime;this._debouncer=new r.Debouncer(this.onEditorChange.bind(this),250)}get cleared(){return this._cleared}get disposed(){return this._disposed}get inspected(){return this._inspected}get editor(){return this._editor}set editor(t){if(t===this._editor){return}c.Signal.disconnectReceiver(this);const e=this._editor=t;if(e){this._cleared.emit(void 0);this.onEditorChange();e.model.selections.changed.connect(this._onChange,this);e.model.sharedModel.changed.connect(this._onChange,this)}}get standby(){return this._standby}set standby(t){this._standby=t}get isDisposed(){return this._isDisposed}dispose(){if(this.isDisposed){return}this._isDisposed=true;this._debouncer.dispose();this._disposed.emit(void 0);c.Signal.clearData(this)}onEditorChange(t){if(this._standby){return}const e=this.editor;if(!e){return}const s=t?t:e.model.sharedModel.getSource();const r=e.getCursorPosition();const c=n.Text.jsIndexToCharIndex(e.getOffsetAt(r),s);const d={content:null};const a=++this._pending;void this._connector.fetch({offset:c,text:s}).then((t=>{if(!t||this.isDisposed||a!==this._pending){this._lastInspectedReply=null;this._inspected.emit(d);return}const{data:e}=t;if(this._lastInspectedReply&&o.JSONExt.deepEqual(this._lastInspectedReply,e)){return}const s=this._rendermime.preferredMimeType(e);if(s){const t=this._rendermime.createRenderer(s);const n=new i.MimeModel({data:e});void t.renderModel(n);d.content=t}this._lastInspectedReply=t.data;this._inspected.emit(d)})).catch((t=>{this._lastInspectedReply=null;this._inspected.emit(d)}))}_onChange(){void this._debouncer.invoke()}}var a=s(87447);var h=s(50724);var l=s(65178);const p="jp-Inspector";const u="jp-Inspector-content";const _="jp-Inspector-default-content";class g extends l.Panel{constructor(t={}){super();this._source=null;this.translator=t.translator||h.nullTranslator;this._trans=this.translator.load("jupyterlab");if(t.initialContent instanceof l.Widget){this._content=t.initialContent}else if(typeof t.initialContent==="string"){this._content=g._generateContentWidget(`<p>${t.initialContent}</p>`)}else{this._content=g._generateContentWidget("<p>"+this._trans.__("Click on a function to see documentation.")+"</p>")}this.addClass(p);this.layout.addWidget(this._content)}[a.Printing.symbol](){return()=>a.Printing.printWidget(this)}get source(){return this._source}set source(t){if(this._source===t){return}if(this._source){this._source.standby=true;this._source.inspected.disconnect(this.onInspectorUpdate,this);this._source.disposed.disconnect(this.onSourceDisposed,this)}if(t&&t.isDisposed){t=null}this._source=t;if(this._source){this._source.standby=false;this._source.inspected.connect(this.onInspectorUpdate,this);this._source.disposed.connect(this.onSourceDisposed,this)}}dispose(){if(this.isDisposed){return}this.source=null;super.dispose()}onInspectorUpdate(t,e){const{content:s}=e;if(!s||s===this._content){return}this._content.dispose();this._content=s;s.addClass(u);this.layout.addWidget(s)}onSourceDisposed(t,e){this.source=null}static _generateContentWidget(t){const e=new l.Widget;e.node.innerHTML=t;e.addClass(u);e.addClass(_);return e}}var f=s(26375);class C extends f.DataConnector{constructor(t){super();this._sessionContext=t.sessionContext}fetch(t){var e;const s=(e=this._sessionContext.session)===null||e===void 0?void 0:e.kernel;if(!s){return Promise.reject(new Error("Inspection fetch requires a kernel."))}const n={code:t.text,cursor_pos:t.offset,detail_level:1};return s.requestInspect(n).then((t=>{const e=t.content;if(e.status!=="ok"||!e.found){throw new Error("Inspection fetch failed to return successfully.")}return{data:e.data,metadata:e.metadata}}))}}const m=new o.Token("@jupyterlab/inspector:IInspector",`A service for adding contextual help to widgets (visible using "Show Contextual Help" from the Help menu).\n  Use this to hook into the contextual help system in your extension.`)}}]);
//# sourceMappingURL=3241.124774fb1457257cae26.js.map?v=124774fb1457257cae26