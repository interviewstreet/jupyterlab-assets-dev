(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[5753],{75753:(e,t,o)=>{"use strict";o.r(t);o.d(t,{FileEditor:()=>y,FileEditorCodeWrapper:()=>C,FileEditorFactory:()=>v,IEditorTracker:()=>h,TabSpaceStatus:()=>d});var s=o(67616);var i=o(26351);var n=o(70278);var r=o(2411);var a=o.n(r);function c(e){const t=e.translator||n.nullTranslator;const o=t.load("jupyterlab");const s=e.isSpaces?o.__("Spaces"):o.__("Tab Size");return a().createElement(i.TextItem,{onClick:e.handleClick,source:`${s}: ${e.tabSpace}`,title:o.__("Change Tab indentation…")})}class d extends s.VDomRenderer{constructor(e){super(new d.Model);this._popup=null;this._menu=e.menu;this.translator=e.translator||n.nullTranslator;this.addClass(i.interactiveItem)}render(){if(!this.model||!this.model.config){return null}else{return a().createElement(c,{isSpaces:this.model.config.insertSpaces,tabSpace:this.model.config.tabSize,handleClick:()=>this._handleClick(),translator:this.translator})}}_handleClick(){const e=this._menu;if(this._popup){this._popup.dispose()}e.aboutToClose.connect(this._menuClosed,this);this._popup=(0,i.showPopup)({body:e,anchor:this,align:"right"})}_menuClosed(){this.removeClass(i.clickedItem)}}(function(e){class t extends s.VDomModel{constructor(){super(...arguments);this._config=null}get config(){return this._config}set config(e){const t=this._config;this._config=e;this._triggerChange(t,this._config)}_triggerChange(e,t){const o=e&&e.insertSpaces;const s=e&&e.tabSize;const i=t&&t.insertSpaces;const n=t&&t.tabSize;if(o!==i||s!==n){this.stateChanged.emit(void 0)}}}e.Model=t})(d||(d={}));var l=o(98034);const h=new l.Token("@jupyterlab/fileeditor:IEditorTracker");var u=o(41994);var p=o(70865);var m=o(29131);var _=o(18453);const g="jpCodeRunner";const f="jpUndoer";class C extends u.CodeEditorWrapper{constructor(e){super({factory:e.factory,model:e.context.model});this._ready=new l.PromiseDelegate;const t=this._context=e.context;this.addClass("jp-FileEditorCodeWrapper");this.node.dataset[g]="true";this.node.dataset[f]="true";void t.ready.then((()=>{this._onContextReady()}));if(t.model.modelDB.isCollaborative){const e=t.model.modelDB;void e.connected.then((()=>{const t=e.collaborators;if(!t){return}const o=t.localCollaborator;this.editor.uuid=o.sessionId;this.editor.selectionStyle=Object.assign(Object.assign({},u.CodeEditor.defaultSelectionStyle),{color:o.color});t.changed.connect(this._onCollaboratorsChanged,this);this._onCollaboratorsChanged()}))}}get context(){return this._context}get ready(){return this._ready.promise}_onContextReady(){if(this.isDisposed){return}this.editor.clearHistory();this._ready.resolve(undefined)}_onCollaboratorsChanged(){const e=this._context.model.modelDB.collaborators;if(!e){return}for(const t of this.editor.model.selections.keys()){if(!e.has(t)){this.editor.model.selections.delete(t)}}}}class y extends _.Widget{constructor(e){super();this.addClass("jp-FileEditor");const t=this._context=e.context;this._mimeTypeService=e.mimeTypeService;const o=this.editorWidget=new C(e);this.editor=o.editor;this.model=o.model;t.pathChanged.connect(this._onPathChanged,this);this._onPathChanged();const s=this.layout=new _.StackedLayout;s.addWidget(o)}get context(){return this.editorWidget.context}get ready(){return this.editorWidget.ready}handleEvent(e){if(!this.model){return}switch(e.type){case"mousedown":this._ensureFocus();break;default:break}}onAfterAttach(e){super.onAfterAttach(e);const t=this.node;t.addEventListener("mousedown",this)}onBeforeDetach(e){const t=this.node;t.removeEventListener("mousedown",this)}onActivateRequest(e){this._ensureFocus()}_ensureFocus(){if(!this.editor.hasFocus()){this.editor.focus()}}_onPathChanged(){const e=this.editor;const t=this._context.localPath;e.model.mimeType=this._mimeTypeService.getMimeTypeByFilePath(t)}}class v extends p.ABCWidgetFactory{constructor(e){super(e.factoryOptions);this._services=e.editorServices}createNewWidget(e){const t=this._services.factoryService.newDocumentEditor;const o=e=>t(e);const s=new y({factory:o,context:e,mimeTypeService:this._services.mimeTypeService});s.title.icon=m.textEditorIcon;const i=new p.DocumentWidget({content:s,context:e});return i}}}}]);
//# sourceMappingURL=5753.68b6cb79511f7438147b.js.map?v=68b6cb79511f7438147b