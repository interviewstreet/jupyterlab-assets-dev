(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[951,3274],{13274:(e,a,t)=>{"use strict";t.r(a);t.d(a,{MIME_TYPE:()=>g,default:()=>w});var r=t(10890);var o=t.n(r);var n=t(67616);var d=t.n(n);var c=t(70865);var i=t.n(c);var s=t(18241);var m=t.n(s);var p=t(21464);var v=t.n(p);var y=t(29131);var l=t.n(y);var u=t(6666);var f=t.n(u);const g="application/vdom.v1+json";const T="VDOM";const R={id:"@jupyterlab/vdom-extension:factory",requires:[p.IRenderMimeRegistry],optional:[s.INotebookTracker,r.ILayoutRestorer],provides:u.IVDOMTracker,autoStart:true,activate:(e,a,t,r)=>{const o=new n.WidgetTracker({namespace:"vdom-widget"});a.addFactory({safe:false,mimeTypes:[g],createRenderer:e=>new u.RenderedVDOM(e)},0);if(t){t.widgetAdded.connect(((e,a)=>{const{context:t,content:{rendermime:r}}=a;r.addFactory({safe:false,mimeTypes:[g],createRenderer:e=>new u.RenderedVDOM(e,t)},0)}))}e.docRegistry.addFileType({name:"vdom",mimeTypes:[g],extensions:[".vdom",".vdom.json"],icon:y.reactIcon});const d=new c.MimeDocumentFactory({renderTimeout:1e3,dataType:"json",rendermime:a,name:T,primaryFileType:e.docRegistry.getFileType("vdom"),fileTypes:["vdom","json"],defaultFor:["vdom"]});d.widgetCreated.connect(((e,a)=>{a.context.pathChanged.connect((()=>{void o.save(a)}));void o.add(a)}));e.docRegistry.addWidgetFactory(d);if(r){void r.restore(o,{command:"docmanager:open",args:e=>({path:e.context.path,factory:T}),name:e=>e.context.path})}return o}};const w=R}}]);
//# sourceMappingURL=951.7ff6ee0ff39fc4d8f76a.js.map?v=7ff6ee0ff39fc4d8f76a