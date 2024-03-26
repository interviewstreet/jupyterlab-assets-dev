"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[9817,2256],{2256:(e,t,r)=>{r.r(t);r.d(t,{default:()=>R,lineColItem:()=>I});var o=r(49655);var n=r(52959);var i=r(53825);var a=r(50724);var s=r(39720);var d=r(1458);var l=r(68299);var c=r(27425);var u=r(55172);var g=r(64173);var m=r.n(g);var p=r(37900);var v=r.n(p);const h="@jupyterlab/codemirror-extension:plugin";const f={id:"@jupyterlab/codemirror-extension:languages",description:"Provides the CodeMirror languages registry.",provides:d.IEditorLanguageRegistry,optional:[a.ITranslator],activate:(e,t)=>{const o=new d.EditorLanguageRegistry;for(const r of d.EditorLanguageRegistry.getDefaultLanguages(t)){o.addLanguage(r)}o.addLanguage({name:"ipythongfm",mime:"text/x-ipythongfm",load:async()=>{const[e,t]=await Promise.all([r.e(230).then(r.t.bind(r,40230,23)),r.e(5513).then(r.bind(r,55513))]);return e.markdown({base:e.markdownLanguage,codeLanguages:e=>o.findBest(e),extensions:[(0,d.parseMathIPython)(s.StreamLanguage.define(t.stexMath).parser)]})}});return o}};const y={id:"@jupyterlab/codemirror-extension:themes",description:"Provides the CodeMirror theme registry",provides:d.IEditorThemeRegistry,optional:[a.ITranslator],activate:(e,t)=>{const r=new d.EditorThemeRegistry;for(const o of d.EditorThemeRegistry.getDefaultThemes(t)){r.addTheme(o)}return r}};const E={id:"@jupyterlab/codemirror-extension:extensions",description:"Provides the CodeMirror extension factory registry.",provides:d.IEditorExtensionRegistry,requires:[d.IEditorThemeRegistry],optional:[a.ITranslator,l.ISettingRegistry,c.IFormRendererRegistry],activate:(e,t,r,o,n)=>{const i=new d.EditorExtensionRegistry;for(const a of d.EditorExtensionRegistry.getDefaultExtensions({themes:t,translator:r})){i.addExtension(a)}if(o){const t=e=>{var t;i.baseConfiguration=(t=e.get("defaultConfig").composite)!==null&&t!==void 0?t:{}};void Promise.all([o.load(h),e.restored]).then((([e])=>{t(e);e.changed.connect(t)}));n===null||n===void 0?void 0:n.addRenderer(`${h}.defaultConfig`,{fieldRenderer:e=>{const t=v().useMemo((()=>i.settingsSchema),[]);const o={};for(const[r,n]of Object.entries(i.defaultConfiguration)){if(typeof t[r]!=="undefined"){o[r]=n}}return v().createElement("div",{className:"jp-FormGroup-contentNormal"},v().createElement("h3",{className:"jp-FormGroup-fieldLabel jp-FormGroup-contentItem"},e.schema.title),e.schema.description&&v().createElement("div",{className:"jp-FormGroup-description"},e.schema.description),v().createElement(c.FormComponent,{schema:{title:e.schema.title,description:e.schema.description,type:"object",properties:t,additionalProperties:false},validator:m(),formData:{...o,...e.formData},formContext:{defaultFormData:o},liveValidate:true,onChange:t=>{var r;const n={};for(const[e,i]of Object.entries((r=t.formData)!==null&&r!==void 0?r:{})){const t=o[e];if(t===undefined||!u.JSONExt.deepEqual(i,t)){n[e]=i}}e.onChange(n)},tagName:"div",translator:r!==null&&r!==void 0?r:a.nullTranslator}))}})}return i}};const x={id:"@jupyterlab/codemirror-extension:binding",description:"Register the CodeMirror extension factory binding the editor and the shared model.",autoStart:true,requires:[d.IEditorExtensionRegistry],activate:(e,t)=>{t.addExtension({name:"shared-model-binding",factory:e=>{var t;const r=e.model.sharedModel;return d.EditorExtensionRegistry.createImmutableExtension((0,d.ybinding)({ytext:r.ysource,undoManager:(t=r.undoManager)!==null&&t!==void 0?t:undefined}))}})}};const b={id:"@jupyterlab/codemirror-extension:services",description:"Provides the service to instantiate CodeMirror editors.",provides:n.IEditorServices,requires:[d.IEditorLanguageRegistry,d.IEditorExtensionRegistry],optional:[a.ITranslator],activate:(e,t,r,o)=>{const n=new d.CodeMirrorEditorFactory({extensions:r,languages:t,translator:o!==null&&o!==void 0?o:a.nullTranslator});return{factoryService:n,mimeTypeService:new d.CodeMirrorMimeTypeService(t)}}};const I={id:"@jupyterlab/codemirror-extension:line-col-status",description:"Provides the code editor cursor position model.",autoStart:true,requires:[a.ITranslator],optional:[o.ILabShell,i.IStatusBar],provides:n.IPositionModel,activate:(e,t,r,o)=>{const i=new n.LineCol(t);const a=new Set;if(o){o.registerStatusItem(I.id,{priority:1,item:i,align:"right",rank:2,isActive:()=>!!i.model.editor})}const s=t=>{a.add(t);if(e.shell.currentWidget){l(e.shell,{newValue:e.shell.currentWidget,oldValue:null})}};const d=()=>{l(e.shell,{oldValue:e.shell.currentWidget,newValue:e.shell.currentWidget})};function l(e,t){Promise.all([...a].map((e=>e(t.newValue)))).then((e=>{var t;i.model.editor=(t=e.filter((e=>e!==null))[0])!==null&&t!==void 0?t:null})).catch((e=>{console.error("Get editors",e)}))}if(r){r.currentChanged.connect(l)}return{addEditorProvider:s,update:d}}};const C=[f,y,x,E,b,I];const R=C}}]);
//# sourceMappingURL=9817.da7fa3e3f988e85b8a09.js.map?v=da7fa3e3f988e85b8a09