(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[5025,3426],{23426:(t,e,o)=>{"use strict";o.r(e);o.d(e,{ITooltipManager:()=>n,Tooltip:()=>m});var s=o(98034);const n=new s.Token("@jupyterlab/tooltip:ITooltipManager");var i=o(67616);var r=o(21464);var d=o(18453);const c="jp-Tooltip";const a="jp-Tooltip-content";const h="jp-mod-tooltip";const l=20;const p=250;const u=true;class m extends d.Widget{constructor(t){super();this._content=null;const e=this.layout=new d.PanelLayout;const o=new r.MimeModel({data:t.bundle});this.anchor=t.anchor;this.addClass(c);this.hide();this._editor=t.editor;this._position=t.position;this._rendermime=t.rendermime;const s=this._rendermime.preferredMimeType(t.bundle,"any");if(!s){return}this._content=this._rendermime.createRenderer(s);this._content.renderModel(o).then((()=>this._setGeometry())).catch((t=>console.error("tooltip rendering failed",t)));this._content.addClass(a);e.addWidget(this._content)}dispose(){if(this._content){this._content.dispose();this._content=null}super.dispose()}handleEvent(t){if(this.isHidden||this.isDisposed){return}const{node:e}=this;const o=t.target;switch(t.type){case"keydown":if(e.contains(o)){return}this.dispose();break;case"mousedown":if(e.contains(o)){this.activate();return}this.dispose();break;case"scroll":this._evtScroll(t);break;default:break}}onActivateRequest(t){this.node.tabIndex=0;this.node.focus()}onAfterAttach(t){document.body.classList.add(h);document.addEventListener("keydown",this,u);document.addEventListener("mousedown",this,u);this.anchor.node.addEventListener("scroll",this,u);this.update()}onBeforeDetach(t){document.body.classList.remove(h);document.removeEventListener("keydown",this,u);document.removeEventListener("mousedown",this,u);this.anchor.node.removeEventListener("scroll",this,u)}onUpdateRequest(t){if(this.isHidden){this.show()}this._setGeometry();super.onUpdateRequest(t)}_evtScroll(t){if(this.node.contains(t.target)){return}this.update()}_getTokenPosition(){const t=this._editor;const e=t.getCursorPosition();const o=t.getOffsetAt(e);const s=t.getLine(e.line);if(!s){return}const n=s.substring(0,o).split(/\W+/);const i=n[n.length-1];const r=i?o-i.length:o;return t.getPositionAt(r)}_setGeometry(){const t=this._position?this._position:this._getTokenPosition();if(!t){return}const e=this._editor;const o=e.getCoordinateForPosition(t);const s=window.getComputedStyle(this.node);const n=parseInt(s.paddingLeft,10)||0;i.HoverBox.setGeometry({anchor:o,host:e.host,maxHeight:p,minHeight:l,node:this.node,offset:{horizontal:-1*n},privilege:"below",style:s})}}}}]);
//# sourceMappingURL=5025.494c0af813c625e97b56.js.map?v=494c0af813c625e97b56