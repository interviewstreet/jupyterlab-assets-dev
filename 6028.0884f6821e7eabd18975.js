(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[6028,3632],{56028:(t,e,s)=>{"use strict";s.r(e);s.d(e,{AttachmentsModel:()=>r,AttachmentsResolver:()=>h});var a=s(24445);var i=s(21464);var n=s(8595);class r{constructor(t={}){this._map=new a.ObservableMap;this._isDisposed=false;this._stateChanged=new n.Signal(this);this._changed=new n.Signal(this);this._modelDB=null;this._serialized=null;this._changeGuard=false;this.contentFactory=t.contentFactory||r.defaultContentFactory;if(t.values){for(const e of Object.keys(t.values)){if(t.values[e]!==undefined){this.set(e,t.values[e])}}}this._map.changed.connect(this._onMapChanged,this);if(t.modelDB){this._modelDB=t.modelDB;this._serialized=this._modelDB.createValue("attachments");if(this._serialized.get()){this.fromJSON(this._serialized.get())}else{this._serialized.set(this.toJSON())}this._serialized.changed.connect(this._onSerializedChanged,this)}}get stateChanged(){return this._stateChanged}get changed(){return this._changed}get keys(){return this._map.keys()}get length(){return this._map.keys().length}get isDisposed(){return this._isDisposed}dispose(){if(this.isDisposed){return}this._isDisposed=true;this._map.dispose();n.Signal.clearData(this)}has(t){return this._map.has(t)}get(t){return this._map.get(t)}set(t,e){const s=this._createItem({value:e});this._map.set(t,s)}remove(t){this._map.delete(t)}clear(){this._map.values().forEach((t=>{t.dispose()}));this._map.clear()}fromJSON(t){this.clear();Object.keys(t).forEach((e=>{if(t[e]!==undefined){this.set(e,t[e])}}))}toJSON(){const t={};for(const e of this._map.keys()){t[e]=this._map.get(e).toJSON()}return t}_createItem(t){const e=this.contentFactory;const s=e.createAttachmentModel(t);s.changed.connect(this._onGenericChange,this);return s}_onMapChanged(t,e){if(this._serialized&&!this._changeGuard){this._changeGuard=true;this._serialized.set(this.toJSON());this._changeGuard=false}this._changed.emit(e);this._stateChanged.emit(void 0)}_onSerializedChanged(t,e){if(!this._changeGuard){this._changeGuard=true;this.fromJSON(e.newValue);this._changeGuard=false}}_onGenericChange(){this._stateChanged.emit(void 0)}}(function(t){class e{createAttachmentModel(t){return new i.AttachmentModel(t)}}t.ContentFactory=e;t.defaultContentFactory=new e})(r||(r={}));class h{constructor(t){this._parent=t.parent||null;this._model=t.model}async resolveUrl(t){if(this._parent&&!t.startsWith("attachment:")){return this._parent.resolveUrl(t)}return t}async getDownloadUrl(t){if(this._parent&&!t.startsWith("attachment:")){return this._parent.getDownloadUrl(t)}const e=t.slice("attachment:".length);const s=this._model.get(e);if(s===undefined){return t}const{data:a}=s;const n=Object.keys(a)[0];if(n===undefined||i.imageRendererFactory.mimeTypes.indexOf(n)===-1){throw new Error(`Cannot render unknown image mime type "${n}".`)}const r=`data:${n};base64,${a[n]}`;return r}isLocal(t){var e,s,a;if(this._parent&&!t.startsWith("attachment:")){return(a=(s=(e=this._parent).isLocal)===null||s===void 0?void 0:s.call(e,t))!==null&&a!==void 0?a:true}return true}}}}]);
//# sourceMappingURL=6028.0884f6821e7eabd18975.js.map?v=0884f6821e7eabd18975