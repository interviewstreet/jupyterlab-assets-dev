"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[8426,8314],{38314:(t,e,n)=>{n.r(e);n.d(e,{HTMLViewer:()=>m,HTMLViewerFactory:()=>b,IHTMLViewerTracker:()=>o,ToolbarItems:()=>f});var r=n(55172);const o=new r.Token("@jupyterlab/htmlviewer:IHTMLViewerTracker",`A widget tracker for rendered HTML documents.\n  Use this if you want to be able to iterate over and interact with HTML documents\n  viewed by the application.`);var a=n(78098);var s=n(35627);var i=n(50724);var l=n(27425);var c=n(19289);var u=n(37900);const d=1e3;const h="jp-HTMLViewer";const p=t=>`<style>\na[target="_blank"],\narea[target="_blank"],\nform[target="_blank"],\nbutton[formtarget="_blank"],\ninput[formtarget="_blank"][type="image"],\ninput[formtarget="_blank"][type="submit"] {\n  cursor: not-allowed !important;\n}\na[target="_blank"]:hover::after,\narea[target="_blank"]:hover::after,\nform[target="_blank"]:hover::after,\nbutton[formtarget="_blank"]:hover::after,\ninput[formtarget="_blank"][type="image"]:hover::after,\ninput[formtarget="_blank"][type="submit"]:hover::after {\n  content: "${t.warning}";\n  box-sizing: border-box;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 1000;\n  border: 2px solid #e65100;\n  background-color: #ffb74d;\n  color: black;\n  font-family: system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', helvetica, arial, sans-serif;\n  text-align: center;\n}\n</style>`;class m extends s.DocumentWidget{constructor(t){super({...t,content:new l.IFrame({sandbox:["allow-same-origin"]})});this._renderPending=false;this._parser=new DOMParser;this._monitor=null;this._objectUrl="";this._trustedChanged=new c.Signal(this);this.translator=t.translator||i.nullTranslator;this.content.addClass(h);void this.context.ready.then((()=>{this.update();this._monitor=new a.ActivityMonitor({signal:this.context.model.contentChanged,timeout:d});this._monitor.activityStopped.connect(this.update,this)}))}get trusted(){return this.content.sandbox.indexOf("allow-scripts")!==-1}set trusted(t){if(this.trusted===t){return}if(t){this.content.sandbox=g.trusted}else{this.content.sandbox=g.untrusted}this.update();this._trustedChanged.emit(t)}get trustedChanged(){return this._trustedChanged}dispose(){if(this._objectUrl){try{URL.revokeObjectURL(this._objectUrl)}catch(t){}}super.dispose()}onUpdateRequest(){if(this._renderPending){return}this._renderPending=true;void this._renderModel().then((()=>this._renderPending=false))}async _renderModel(){let t=this.context.model.toString();t=await this._setupDocument(t);const e=new Blob([t],{type:"text/html"});const n=this._objectUrl;this._objectUrl=URL.createObjectURL(e);this.content.url=this._objectUrl;if(n){try{URL.revokeObjectURL(n)}catch(r){}}return}async _setupDocument(t){const e=this._parser.parseFromString(t,"text/html");let n=e.querySelector("base");if(!n){n=e.createElement("base");e.head.insertBefore(n,e.head.firstChild)}const r=this.context.path;const o=await this.context.urlResolver.getDownloadUrl(r);n.href=o;n.target="_self";if(!this.trusted){const t=this.translator.load("jupyterlab");const n=t.__("Action disabled as the file is not trusted.");e.body.insertAdjacentHTML("beforeend",p({warning:n}))}return e.documentElement.innerHTML}}class b extends s.ABCWidgetFactory{createNewWidget(t){return new m({context:t})}defaultToolbarFactory(t){return[{name:"refresh",widget:f.createRefreshButton(t,this.translator)},{name:"trust",widget:f.createTrustButton(t,this.translator)}]}}var f;(function(t){function e(t,e){const n=(e!==null&&e!==void 0?e:i.nullTranslator).load("jupyterlab");return new l.ToolbarButton({icon:l.refreshIcon,onClick:async()=>{if(!t.context.model.dirty){await t.context.revert();t.update()}},tooltip:n.__("Rerender HTML Document")})}t.createRefreshButton=e;function n(t,e){return l.ReactWidget.create(u.createElement(g.TrustButtonComponent,{htmlDocument:t,translator:e}))}t.createTrustButton=n})(f||(f={}));var g;(function(t){t.untrusted=[];t.trusted=["allow-scripts","allow-popups"];function e(t){const e=t.translator||i.nullTranslator;const n=e.load("jupyterlab");return u.createElement(l.UseSignal,{signal:t.htmlDocument.trustedChanged,initialSender:t.htmlDocument},(()=>u.createElement(l.ToolbarButtonComponent,{className:"",onClick:()=>t.htmlDocument.trusted=!t.htmlDocument.trusted,tooltip:n.__(`Whether the HTML file is trusted.\nTrusting the file allows opening pop-ups and running scripts\nwhich may result in security risks.\nOnly enable for files you trust.`),label:t.htmlDocument.trusted?n.__("Distrust HTML"):n.__("Trust HTML")})))}t.TrustButtonComponent=e})(g||(g={}))}}]);
//# sourceMappingURL=8426.d7035cb353d734b94edf.js.map?v=d7035cb353d734b94edf