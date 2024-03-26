"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[442,3525],{44869:(n,e,t)=>{t.r(e);t.d(e,{IRunningSessionManagers:()=>y,RunningSessionManagers:()=>C,RunningSessions:()=>T});var s=t(87447);var a=t.n(s);var i=t(50724);var o=t.n(i);var r=t(27425);var l=t.n(r);var d=t(55172);var c=t.n(d);var u=t(82524);var h=t.n(u);var m=t(19289);var g=t.n(m);var p=t(37900);var b=t.n(p);const _="jp-RunningSessions";const w="jp-RunningSessions-section";const v="jp-RunningSessions-sectionContainer";const f="jp-RunningSessions-sectionList";const I="jp-RunningSessions-item";const S="jp-RunningSessions-itemLabel";const j="jp-RunningSessions-itemDetail";const E="jp-RunningSessions-itemShutdown";const R="jp-RunningSessions-shutdownAll";const y=new d.Token("@jupyterlab/running:IRunningSessionManagers","A service to add running session managers.");class C{constructor(){this._added=new m.Signal(this);this._managers=[]}get added(){return this._added}add(n){this._managers.push(n);this._added.emit(n);return new u.DisposableDelegate((()=>{const e=this._managers.indexOf(n);if(e>-1){this._managers.splice(e,1)}}))}items(){return this._managers}}function L(n){var e,t;const{runningItem:s}=n;const a=[I];const o=(e=s.detail)===null||e===void 0?void 0:e.call(s);const l=s.icon();const d=s.labelTitle?s.labelTitle():"";const c=n.translator||i.nullTranslator;const u=c.load("jupyterlab");let h=false;const m=n.shutdownItemIcon||r.closeIcon;const g=n.shutdownLabel||u.__("Shut Down");const b=()=>{var n;h=true;(n=s.shutdown)===null||n===void 0?void 0:n.call(s)};const[_,w]=p.useState(false);const v=!!((t=s.children)===null||t===void 0?void 0:t.length);const f=v?()=>!h&&w(!_):undefined;if(s.className){a.push(s.className)}if(n.child){a.push("jp-mod-running-child")}return p.createElement(p.Fragment,null,p.createElement("li",null,p.createElement("div",{className:a.join(" "),onClick:f,"data-context":s.context||""},v&&(_?p.createElement(r.caretRightIcon.react,{tag:"span",stylesheet:"runningItem"}):p.createElement(r.caretDownIcon.react,{tag:"span",stylesheet:"runningItem"})),l?typeof l==="string"?p.createElement("img",{src:l}):p.createElement(l.react,{tag:"span",stylesheet:"runningItem"}):undefined,p.createElement("span",{className:S,title:d,onClick:s.open&&(()=>s.open())},s.label()),o&&p.createElement("span",{className:j},o),s.shutdown&&p.createElement(r.ToolbarButtonComponent,{className:E,icon:m,onClick:b,tooltip:g})),v&&!_&&p.createElement(k,{child:true,runningItems:s.children,shutdownItemIcon:m,translator:c})))}function k(n){return p.createElement("ul",{className:f},n.runningItems.map(((e,t)=>p.createElement(L,{child:n.child,key:t,runningItem:e,shutdownLabel:n.shutdownLabel,shutdownItemIcon:n.shutdownItemIcon,translator:n.translator}))))}class A extends r.ReactWidget{constructor(n){super();this._options=n;this._update=new m.Signal(this);n.manager.runningChanged.connect(this._emitUpdate,this)}dispose(){this._options.manager.runningChanged.disconnect(this._emitUpdate,this);super.dispose()}onBeforeShow(n){super.onBeforeShow(n);this._update.emit()}render(){const n=this._options;let e=true;return p.createElement(r.UseSignal,{signal:this._update},(()=>{if(e){e=false}else{n.runningItems=n.manager.running()}return p.createElement("div",{className:v},p.createElement(k,{runningItems:n.runningItems,shutdownLabel:n.manager.shutdownLabel,shutdownAllLabel:n.shutdownAllLabel,shutdownItemIcon:n.manager.shutdownItemIcon,translator:n.translator}))}))}_isAnyHidden(){let n=this.isHidden;if(n){return n}let e=this.parent;while(e!=null){if(e.isHidden){n=true;break}e=e.parent}return n}_emitUpdate(){if(this._isAnyHidden()){return}this._update.emit()}}class D extends r.PanelWithToolbar{constructor(n){super();this._manager=n.manager;const e=n.translator||i.nullTranslator;const t=e.load("jupyterlab");const a=n.manager.shutdownAllLabel||t.__("Shut Down All");const o=`${a}?`;const l=n.manager.shutdownAllConfirmationText||`${a} ${n.manager.name}`;this.addClass(w);this.title.label=n.manager.name;function d(){void(0,s.showDialog)({title:o,body:l,buttons:[s.Dialog.cancelButton(),s.Dialog.warnButton({label:a})]}).then((e=>{if(e.button.accept){n.manager.shutdownAll()}}))}let c=n.manager.running();const u=c.length>0;this._button=new r.ToolbarButton({label:a,className:`${R}${!u?" jp-mod-disabled":""}`,enabled:u,onClick:d});this._manager.runningChanged.connect(this._updateButton,this);this.toolbar.addItem("shutdown-all",this._button);this.addWidget(new A({runningItems:c,shutdownAllLabel:a,...n}))}dispose(){if(this.isDisposed){return}this._manager.runningChanged.disconnect(this._updateButton,this);super.dispose()}_updateButton(){var n,e;const t=this._button;t.enabled=this._manager.running().length>0;if(t.enabled){(n=t.node.querySelector("jp-button"))===null||n===void 0?void 0:n.classList.remove("jp-mod-disabled")}else{(e=t.node.querySelector("jp-button"))===null||e===void 0?void 0:e.classList.add("jp-mod-disabled")}}}class T extends r.SidePanel{constructor(n,e){super();this.managers=n;this.translator=e!==null&&e!==void 0?e:i.nullTranslator;const t=this.translator.load("jupyterlab");this.addClass(_);this.toolbar.addItem("refresh",new r.ToolbarButton({tooltip:t.__("Refresh List"),icon:r.refreshIcon,onClick:()=>n.items().forEach((n=>n.refreshRunning()))}));n.items().forEach((e=>this.addSection(n,e)));n.added.connect(this.addSection,this)}dispose(){if(this.isDisposed){return}this.managers.added.disconnect(this.addSection,this);super.dispose()}addSection(n,e){this.addWidget(new D({manager:e,translator:this.translator}))}}}}]);
//# sourceMappingURL=442.c649bc7380a9b5a7ee3d.js.map?v=c649bc7380a9b5a7ee3d