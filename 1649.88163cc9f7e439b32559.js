(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[1649,7724],{81649:(e,t,n)=>{"use strict";n.r(t);n.d(t,{CollabDockPanel:()=>h,InterviewState:()=>o,UserIndicatorState:()=>s,getWidgetInfo:()=>g});var r=n(29131);var a=n(997);var i=n(24445);const s=new i.ObservableMap;const o=new i.ObservableMap;var c=n(67616);var l=n(95990);var d=n(70865);var p=n(17867);var u=n(91625);function g(e){if(!e||!(e instanceof c.MainAreaWidget)){return{path:"",widgetType:"unknown"}}const t=e.content;if(t instanceof p.Launcher){return{path:"",widgetType:"launcher"}}else if(e instanceof l.ConsolePanel){return{path:e.sessionContext.path,widgetType:"console"}}else if(e instanceof d.DocumentWidget){return{path:e.context.path,widgetType:"document"}}else if(t instanceof u.Terminal){return{path:t.session.model.name,widgetType:"terminal"}}return{path:"",widgetType:"unknown"}}class h extends r.DockPanelSvg{constructor(e={}){e.renderer=new v;super(e)}}class v extends r.DockPanelSvg.Renderer{createTabBar(){const e=new w;e.addClass("lm-DockPanel-tabBar");return e}}class w extends r.TabBarSvg{constructor(e={}){e.renderer=new f;super(e);s.changed.connect((()=>{this.update()}))}}class f extends r.TabBarSvg.Renderer{getUserIndicatorData(e){const t=s.values();if(!o.size||!t.length){return[]}return t.reduce(((t,n)=>{var r;if(!n||!n.insideInterview||n.qid!==o.get("questionId")||!n.widgetType||n.widgetType==="unknown"||n.widgetType==="launcher"){return t}let a=n.filePath;if(a.startsWith("/projects/")){a=a.replace("/projects/","")}if(!n.screenname){return t}const i=e.title.owner;const{widgetType:s,path:c}=g(i);if(s===n.widgetType&&c===a){return[...t,{initial:(r=n.screenname)===null||r===void 0?void 0:r.charAt(0).toUpperCase(),color:n.color,name:n.screenname}]}return t}),[])}renderUserIndicator(e){const{initial:t,color:n,name:r}=e;return a.h.div({style:{paddingRight:"5px",fontWeight:"bold",color:n},"aria-label":r?`Active participant: ${r}`:""},t)}renderAllUserIndicators(e){if(!(e===null||e===void 0?void 0:e.length)){return[]}return e.map((e=>this.renderUserIndicator(e)))}renderTab(e){let t=super.renderTab(e);const n=this.getUserIndicatorData(e);return Object.assign(Object.assign({},t),{children:[...this.renderAllUserIndicators(n),...t.children]})}}}}]);
//# sourceMappingURL=1649.88163cc9f7e439b32559.js.map?v=88163cc9f7e439b32559