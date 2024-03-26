"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[4407,5969],{44407:(e,t,i)=>{i.r(t);i.d(t,{CSVDelimiter:()=>s.p,CSVDocumentWidget:()=>o.kw,CSVViewer:()=>o.A9,CSVViewerFactory:()=>o.LT,DSVModel:()=>r.DSVModel,GridSearchService:()=>o.JZ,TSVViewerFactory:()=>o._d,TextRenderConfig:()=>o.B0,parseDSV:()=>n.G,parseDSVNoQuotes:()=>n.z});var r=i(37535);var n=i(96577);var s=i(47922);var o=i(34548)},47922:(e,t,i)=>{i.d(t,{p:()=>u});var r=i(50724);var n=i.n(r);var s=i(27425);var o=i.n(s);var a=i(65178);var d=i.n(a);const l="jp-CSVDelimiter";const c="jp-CSVDelimiter-label";const h="jp-CSVDelimiter-dropdown";class u extends a.Widget{constructor(e){super({node:_.createNode(e.widget.delimiter,e.translator)});this._widget=e.widget;this.addClass(l)}get selectNode(){return this.node.getElementsByTagName("select")[0]}handleEvent(e){switch(e.type){case"change":this._widget.delimiter=this.selectNode.value;break;default:break}}onAfterAttach(e){this.selectNode.addEventListener("change",this)}onBeforeDetach(e){this.selectNode.removeEventListener("change",this)}}var _;(function(e){function t(e,t){t=t||r.nullTranslator;const i=t===null||t===void 0?void 0:t.load("jupyterlab");const n=[[",",","],[";",";"],["\t",i.__("tab")],["|",i.__("pipe")],["#",i.__("hash")]];const o=document.createElement("div");const a=document.createElement("span");const d=document.createElement("select");a.textContent=i.__("Delimiter: ");a.className=c;for(const[r,s]of n){const t=document.createElement("option");t.value=r;t.textContent=s;if(r===e){t.selected=true}d.appendChild(t)}o.appendChild(a);const l=s.Styling.wrapSelect(d);l.classList.add(h);o.appendChild(l);return o}e.createNode=t})(_||(_={}))},34548:(e,t,i)=>{i.d(t,{A9:()=>v,B0:()=>p,JZ:()=>f,LT:()=>S,_d:()=>C,kw:()=>y});var r=i(78098);var n=i.n(r);var s=i(35627);var o=i.n(s);var a=i(55172);var d=i.n(a);var l=i(19289);var c=i.n(l);var h=i(65178);var u=i.n(h);var _=i(47922);const g="jp-CSVViewer";const m="jp-CSVViewer-grid";const w=1e3;class p{}class f{constructor(e){this._looping=true;this._changed=new l.Signal(this);this._grid=e;this._query=null;this._row=0;this._column=-1}get changed(){return this._changed}cellBackgroundColorRendererFunc(e){return({value:t,row:i,column:r})=>{if(this._query){if(t.match(this._query)){if(this._row===i&&this._column===r){return e.currentMatchBackgroundColor}return e.matchBackgroundColor}}return""}}clear(){this._query=null;this._row=0;this._column=-1;this._changed.emit(undefined)}find(e,t=false){const i=this._grid.dataModel;const r=i.rowCount("body");const n=i.columnCount("body");if(this._query!==e){this._row=0;this._column=-1}this._query=e;const s=this._grid.scrollY/this._grid.defaultSizes.rowHeight;const o=(this._grid.scrollY+this._grid.pageHeight)/this._grid.defaultSizes.rowHeight;const a=this._grid.scrollX/this._grid.defaultSizes.columnHeaderHeight;const d=(this._grid.scrollX+this._grid.pageWidth)/this._grid.defaultSizes.columnHeaderHeight;const l=(e,t)=>e>=s&&e<=o&&t>=a&&t<=d;const c=t?-1:1;this._column+=c;for(let h=this._row;t?h>=0:h<r;h+=c){for(let r=this._column;t?r>=0:r<n;r+=c){const t=i.data("body",h,r);if(t.match(e)){this._changed.emit(undefined);if(!l(h,r)){this._grid.scrollToRow(h)}this._row=h;this._column=r;return true}}this._column=t?n-1:0}if(this._looping){this._looping=false;this._row=t?0:r-1;this._wrapRows(t);try{return this.find(e,t)}finally{this._looping=true}}return false}_wrapRows(e=false){const t=this._grid.dataModel;const i=t.rowCount("body");const r=t.columnCount("body");if(e&&this._row<=0){this._row=i-1;this._column=r}else if(!e&&this._row>=i-1){this._row=0;this._column=-1}}get query(){return this._query}}class v extends h.Widget{constructor(e){super();this._monitor=null;this._delimiter=",";this._revealed=new a.PromiseDelegate;this._baseRenderer=null;this._context=e.context;this.layout=new h.PanelLayout;this.addClass(g);this._ready=this.initialize()}get ready(){return this._ready}async initialize(){const e=this.layout;if(this.isDisposed||!e){return}const{BasicKeyHandler:t,BasicMouseHandler:i,DataGrid:n}=await b.ensureDataGrid();this._defaultStyle=n.defaultStyle;this._grid=new n({defaultSizes:{rowHeight:24,columnWidth:144,rowHeaderWidth:64,columnHeaderHeight:36}});this._grid.addClass(m);this._grid.headerVisibility="all";this._grid.keyHandler=new t;this._grid.mouseHandler=new i;this._grid.copyConfig={separator:"\t",format:n.copyFormatGeneric,headers:"all",warningThreshold:1e6};e.addWidget(this._grid);this._searchService=new f(this._grid);this._searchService.changed.connect(this._updateRenderer,this);await this._context.ready;await this._updateGrid();this._revealed.resolve(undefined);this._monitor=new r.ActivityMonitor({signal:this._context.model.contentChanged,timeout:w});this._monitor.activityStopped.connect(this._updateGrid,this)}get context(){return this._context}get revealed(){return this._revealed.promise}get delimiter(){return this._delimiter}set delimiter(e){if(e===this._delimiter){return}this._delimiter=e;void this._updateGrid()}get style(){return this._grid.style}set style(e){this._grid.style={...this._defaultStyle,...e}}set rendererConfig(e){this._baseRenderer=e;void this._updateRenderer()}get searchService(){return this._searchService}dispose(){if(this._monitor){this._monitor.dispose()}super.dispose()}goToLine(e){this._grid.scrollToRow(e)}onActivateRequest(e){this.node.tabIndex=-1;this.node.focus()}async _updateGrid(){const{BasicSelectionModel:e}=await b.ensureDataGrid();const{DSVModel:t}=await b.ensureDSVModel();const i=this._context.model.toString();const r=this._delimiter;const n=this._grid.dataModel;const s=this._grid.dataModel=new t({data:i,delimiter:r});this._grid.selectionModel=new e({dataModel:s});if(n){n.dispose()}}async _updateRenderer(){if(this._baseRenderer===null){return}const{TextRenderer:e}=await b.ensureDataGrid();const t=this._baseRenderer;const i=new e({textColor:t.textColor,horizontalAlignment:t.horizontalAlignment,backgroundColor:this._searchService.cellBackgroundColorRendererFunc(t)});this._grid.cellRenderers.update({body:i,"column-header":i,"corner-header":i,"row-header":i})}}class y extends s.DocumentWidget{constructor(e){let{content:t,context:i,delimiter:r,reveal:n,...s}=e;t=t||b.createContent(i);n=Promise.all([n,t.revealed]);super({content:t,context:i,reveal:n,...s});if(r){t.delimiter=r}}setFragment(e){const t=e.split("=");if(t[0]!=="#row"){return}let i=t[1].split(";")[0];i=i.split("-")[0];void this.context.ready.then((()=>{this.content.goToLine(Number(i))}))}}class S extends s.ABCWidgetFactory{createNewWidget(e){const t=this.translator;return new y({context:e,translator:t})}defaultToolbarFactory(e){return[{name:"delimiter",widget:new _.p({widget:e.content,translator:this.translator})}]}}class C extends S{createNewWidget(e){const t="\t";return new y({context:e,delimiter:t,translator:this.translator})}}var b;(function(e){let t=null;let r=null;async function n(){if(t==null){t=new a.PromiseDelegate;t.resolve(await i.e(6221).then(i.t.bind(i,76221,23)))}return t.promise}e.ensureDataGrid=n;async function s(){if(r==null){r=new a.PromiseDelegate;r.resolve(await Promise.all([i.e(6221),i.e(7535)]).then(i.bind(i,37535)))}return r.promise}e.ensureDSVModel=s;function o(e){return new v({context:e})}e.createContent=o})(b||(b={}))}}]);
//# sourceMappingURL=4407.6fedff5e32ea990b085d.js.map?v=6fedff5e32ea990b085d