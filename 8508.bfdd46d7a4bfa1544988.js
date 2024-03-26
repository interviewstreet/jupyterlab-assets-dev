"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[8508],{58508:(e,t,s)=>{s.r(t);s.d(t,{ModelDB:()=>f,ObservableJSON:()=>d,ObservableList:()=>_,ObservableMap:()=>h,ObservableString:()=>l,ObservableUndoableList:()=>p,ObservableValue:()=>g});var i=s(55172);var n=s(82524);var a=s(19289);var r=s(37917);class h{constructor(e={}){this._map=new Map;this._changed=new a.Signal(this);this._isDisposed=false;this._itemCmp=e.itemCmp||o.itemCmp;if(e.values){for(const t in e.values){this._map.set(t,e.values[t])}}}get type(){return"Map"}get changed(){return this._changed}get isDisposed(){return this._isDisposed}get size(){return this._map.size}set(e,t){const s=this._map.get(e);if(t===undefined){throw Error("Cannot set an undefined value, use remove")}const i=this._itemCmp;if(s!==undefined&&i(s,t)){return s}this._map.set(e,t);this._changed.emit({type:s?"change":"add",key:e,oldValue:s,newValue:t});return s}get(e){return this._map.get(e)}has(e){return this._map.has(e)}keys(){const e=[];this._map.forEach(((t,s)=>{e.push(s)}));return e}values(){const e=[];this._map.forEach(((t,s)=>{e.push(t)}));return e}delete(e){const t=this._map.get(e);const s=this._map.delete(e);if(s){this._changed.emit({type:"remove",key:e,oldValue:t,newValue:undefined})}return t}clear(){const e=this.keys();for(let t=0;t<e.length;t++){this.delete(e[t])}}dispose(){if(this.isDisposed){return}this._isDisposed=true;a.Signal.clearData(this);this._map.clear()}}var o;(function(e){function t(e,t){return e===t}e.itemCmp=t})(o||(o={}));class d extends h{constructor(e={}){super({itemCmp:i.JSONExt.deepEqual,values:e.values})}toJSON(){const e=Object.create(null);const t=this.keys();for(const s of t){const t=this.get(s);if(t!==undefined){e[s]=i.JSONExt.deepCopy(t)}}return e}}(function(e){class t extends r.Message{constructor(e,t){super(e);this.args=t}}e.ChangeMessage=t})(d||(d={}));class l{constructor(e=""){this._text="";this._isDisposed=false;this._changed=new a.Signal(this);this._text=e}get type(){return"String"}get changed(){return this._changed}set text(e){if(e.length===this._text.length&&e===this._text){return}this._text=e;this._changed.emit({type:"set",start:0,end:e.length,value:e})}get text(){return this._text}insert(e,t){this._text=this._text.slice(0,e)+t+this._text.slice(e);this._changed.emit({type:"insert",start:e,end:e+t.length,value:t})}remove(e,t){const s=this._text.slice(e,t);this._text=this._text.slice(0,e)+this._text.slice(t);this._changed.emit({type:"remove",start:e,end:t,value:s})}clear(){this.text=""}get isDisposed(){return this._isDisposed}dispose(){if(this._isDisposed){return}this._isDisposed=true;a.Signal.clearData(this);this.clear()}}var u=s(10535);class _{constructor(e={}){this._array=[];this._isDisposed=false;this._changed=new a.Signal(this);if(e.values){for(const t of e.values){this._array.push(t)}}this._itemCmp=e.itemCmp||c.itemCmp}get type(){return"List"}get changed(){return this._changed}get length(){return this._array.length}get isDisposed(){return this._isDisposed}dispose(){if(this._isDisposed){return}this._isDisposed=true;a.Signal.clearData(this);this.clear()}[Symbol.iterator](){return this._array[Symbol.iterator]()}get(e){return this._array[e]}set(e,t){const s=this._array[e];if(t===undefined){throw new Error("Cannot set an undefined item")}const i=this._itemCmp;if(i(s,t)){return}this._array[e]=t;this._changed.emit({type:"set",oldIndex:e,newIndex:e,oldValues:[s],newValues:[t]})}push(e){const t=this._array.push(e);this._changed.emit({type:"add",oldIndex:-1,newIndex:this.length-1,oldValues:[],newValues:[e]});return t}insert(e,t){if(e===this._array.length){this._array.push(t)}else{u.ArrayExt.insert(this._array,e,t)}this._changed.emit({type:"add",oldIndex:-2,newIndex:e,oldValues:[],newValues:[t]})}removeValue(e){const t=this._itemCmp;const s=u.ArrayExt.findFirstIndex(this._array,(s=>t(s,e)));this.remove(s);return s}remove(e){const t=u.ArrayExt.removeAt(this._array,e);if(t===undefined){return}this._changed.emit({type:"remove",oldIndex:e,newIndex:-1,newValues:[],oldValues:[t]});return t}clear(){const e=this._array.slice();this._array.length=0;this._changed.emit({type:"remove",oldIndex:0,newIndex:0,newValues:[],oldValues:e})}move(e,t){if(this.length<=1||e===t){return}const s=[this._array[e]];u.ArrayExt.move(this._array,e,t);this._changed.emit({type:"move",oldIndex:e,newIndex:t,oldValues:s,newValues:s})}pushAll(e){const t=this.length;for(const s of e){this._array.push(s)}this._changed.emit({type:"add",oldIndex:-1,newIndex:t,oldValues:[],newValues:Array.from(e)});return this.length}insertAll(e,t){const s=e;for(const i of t){u.ArrayExt.insert(this._array,e++,i)}this._changed.emit({type:"add",oldIndex:-2,newIndex:s,oldValues:[],newValues:Array.from(t)})}removeRange(e,t){const s=this._array.slice(e,t);for(let i=e;i<t;i++){u.ArrayExt.removeAt(this._array,e)}this._changed.emit({type:"remove",oldIndex:e,newIndex:-1,oldValues:s,newValues:[]});return this.length}}var c;(function(e){function t(e,t){return e===t}e.itemCmp=t})(c||(c={}));class p extends _{constructor(e){super();this._inCompound=false;this._isUndoable=true;this._madeCompoundChange=false;this._index=-1;this._stack=[];this._serializer=e;this.changed.connect(this._onListChanged,this)}get canRedo(){return this._index<this._stack.length-1}get canUndo(){return this._index>=0}beginCompoundOperation(e){this._inCompound=true;this._isUndoable=e!==false;this._madeCompoundChange=false}endCompoundOperation(){this._inCompound=false;this._isUndoable=true;if(this._madeCompoundChange){this._index++}}undo(){if(!this.canUndo){return}const e=this._stack[this._index];this._isUndoable=false;for(const t of e.reverse()){this._undoChange(t)}this._isUndoable=true;this._index--}redo(){if(!this.canRedo){return}this._index++;const e=this._stack[this._index];this._isUndoable=false;for(const t of e){this._redoChange(t)}this._isUndoable=true}clearUndo(){this._index=-1;this._stack=[]}_onListChanged(e,t){if(this.isDisposed||!this._isUndoable){return}if(!this._inCompound||!this._madeCompoundChange){this._stack=this._stack.slice(0,this._index+1)}const s=this._copyChange(t);if(this._stack[this._index+1]){this._stack[this._index+1].push(s)}else{this._stack.push([s])}if(!this._inCompound){this._index++}else{this._madeCompoundChange=true}}_undoChange(e){let t=0;const s=this._serializer;switch(e.type){case"add":for(let t=e.newValues.length;t>0;t--){this.remove(e.newIndex)}break;case"set":t=e.oldIndex;for(const i of e.oldValues){this.set(t++,s.fromJSON(i))}break;case"remove":t=e.oldIndex;for(const i of e.oldValues){this.insert(t++,s.fromJSON(i))}break;case"move":this.move(e.newIndex,e.oldIndex);break;default:return}}_redoChange(e){let t=0;const s=this._serializer;switch(e.type){case"add":t=e.newIndex;for(const i of e.newValues){this.insert(t++,s.fromJSON(i))}break;case"set":t=e.newIndex;for(const t of e.newValues){this.set(e.newIndex++,s.fromJSON(t))}break;case"remove":for(let t=e.oldValues.length;t>0;t--){this.remove(e.oldIndex)}break;case"move":this.move(e.oldIndex,e.newIndex);break;default:return}}_copyChange(e){const t=[];for(const i of e.oldValues){t.push(this._serializer.toJSON(i))}const s=[];for(const i of e.newValues){s.push(this._serializer.toJSON(i))}return{type:e.type,oldIndex:e.oldIndex,newIndex:e.newIndex,oldValues:t,newValues:s}}}(function(e){class t{toJSON(e){return e}fromJSON(e){return e}}e.IdentitySerializer=t})(p||(p={}));class g{constructor(e=null){this._value=null;this._changed=new a.Signal(this);this._isDisposed=false;this._value=e}get type(){return"Value"}get isDisposed(){return this._isDisposed}get changed(){return this._changed}get(){return this._value}set(e){const t=this._value;if(i.JSONExt.deepEqual(t,e)){return}this._value=e;this._changed.emit({oldValue:t,newValue:e})}dispose(){if(this._isDisposed){return}this._isDisposed=true;a.Signal.clearData(this);this._value=null}}(function(e){class t{}e.IChangedArgs=t})(g||(g={}));class f{constructor(e={}){this.isPrepopulated=false;this.isCollaborative=false;this.connected=Promise.resolve(void 0);this._toDispose=false;this._isDisposed=false;this._disposables=new n.DisposableSet;this._basePath=e.basePath||"";if(e.baseDB){this._db=e.baseDB}else{this._db=new h;this._toDispose=true}}get basePath(){return this._basePath}get isDisposed(){return this._isDisposed}get(e){return this._db.get(this._resolvePath(e))}has(e){return this._db.has(this._resolvePath(e))}createString(e){const t=new l;this._disposables.add(t);this.set(e,t);return t}createList(e){const t=new p(new p.IdentitySerializer);this._disposables.add(t);this.set(e,t);return t}createMap(e){const t=new d;this._disposables.add(t);this.set(e,t);return t}createValue(e){const t=new g;this._disposables.add(t);this.set(e,t);return t}getValue(e){const t=this.get(e);if(!t||t.type!=="Value"){throw Error("Can only call getValue for an ObservableValue")}return t.get()}setValue(e,t){const s=this.get(e);if(!s||s.type!=="Value"){throw Error("Can only call setValue on an ObservableValue")}s.set(t)}view(e){const t=new f({basePath:e,baseDB:this});this._disposables.add(t);return t}set(e,t){this._db.set(this._resolvePath(e),t)}dispose(){if(this.isDisposed){return}this._isDisposed=true;if(this._toDispose){this._db.dispose()}this._disposables.dispose()}_resolvePath(e){if(this._basePath){e=this._basePath+"."+e}return e}}}}]);
//# sourceMappingURL=8508.bfdd46d7a4bfa1544988.js.map?v=bfdd46d7a4bfa1544988