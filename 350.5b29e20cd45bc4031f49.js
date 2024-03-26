"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[350,9089],{60350:(e,t,n)=>{n.r(t);n.d(t,{default:()=>y});var i=n(49655);var s=n.n(i);var c=n(87447);var a=n.n(c);var r=n(80379);var o=n.n(r);var d=n(68299);var l=n.n(d);var h=n(50724);var u=n.n(h);var g=n(65178);var m=n.n(g);const v="jp-mod-searchable";const f="jp-mod-search-active";var p;(function(e){e.search="documentsearch:start";e.searchAndReplace="documentsearch:startWithReplace";e.findNext="documentsearch:highlightNext";e.findPrevious="documentsearch:highlightPrevious";e.end="documentsearch:end";e.toggleSearchInSelection="documentsearch:toggleSearchInSelection"})(p||(p={}));const S={id:"@jupyterlab/documentsearch-extension:labShellWidgetListener",description:"Active search on valid document",requires:[i.ILabShell,r.ISearchProviderRegistry],autoStart:true,activate:(e,t,n)=>{const i=e=>{if(!e){return}if(n.hasProvider(e)){e.addClass(v)}else{e.removeClass(v)}};n.changed.connect((()=>i(t.activeWidget)));t.activeChanged.connect(((e,t)=>{const n=t.oldValue;if(n){n.removeClass(v)}i(t.newValue)}))}};class _{constructor(e){this._commandRegistry=e;this._cache=this._buildCache();this._commandRegistry.keyBindingChanged.connect(this._rebuildCache,this)}get next(){return this._cache.next}get previous(){return this._cache.previous}get toggleSearchInSelection(){return this._cache.toggleSearchInSelection}_rebuildCache(){this._cache=this._buildCache()}_buildCache(){const e=this._commandRegistry.keyBindings.find((e=>e.command===p.findNext));const t=this._commandRegistry.keyBindings.find((e=>e.command===p.findPrevious));const n=this._commandRegistry.keyBindings.find((e=>e.command===p.toggleSearchInSelection));return{next:e,previous:t,toggleSearchInSelection:n}}dispose(){this._commandRegistry.keyBindingChanged.disconnect(this._rebuildCache,this)}}const b={id:"@jupyterlab/documentsearch-extension:plugin",description:"Provides the document search registry.",provides:r.ISearchProviderRegistry,requires:[h.ITranslator],optional:[c.ICommandPalette,d.ISettingRegistry],autoStart:true,activate:(e,t,n,i)=>{const s=t.load("jupyterlab");let a=500;let o="never";const d=new r.SearchProviderRegistry(t);const l=new Map;if(i){const t=i.load(b.id);const n=e=>{a=e.get("searchDebounceTime").composite;o=e.get("autoSearchInSelection").composite};Promise.all([t,e.restored]).then((([e])=>{n(e);e.changed.connect((e=>{n(e)}))})).catch((e=>{console.error(e.message)}))}const h=()=>{const t=e.shell.currentWidget;if(!t){return false}return d.hasProvider(t)};const u=n=>{if(!n){return}const i=n.id;let s=l.get(i);if(!s){const c=d.getProvider(n);if(!c){return}const o=new r.SearchDocumentModel(c,a);const h=new _(e.commands);const u=new r.SearchDocumentView(o,t,h);l.set(i,u);[p.findNext,p.findPrevious,p.end,p.toggleSearchInSelection].forEach((t=>{e.commands.notifyCommandChanged(t)}));u.closed.connect((()=>{if(!n.isDisposed){n.activate();n.removeClass(f)}}));u.disposed.connect((()=>{if(!n.isDisposed){n.activate();n.removeClass(f)}l.delete(i);[p.findNext,p.findPrevious,p.end,p.toggleSearchInSelection].forEach((t=>{e.commands.notifyCommandChanged(t)}))}));n.disposed.connect((()=>{u.dispose();o.dispose();c.dispose();h.dispose()}));s=u}if(!s.isAttached){g.Widget.attach(s,n.node);n.addClass(f);if(n instanceof c.MainAreaWidget){s.node.style.top=`${n.toolbar.node.getBoundingClientRect().height+n.contentHeader.node.getBoundingClientRect().height}px`}if(s.model.searchExpression){s.model.refresh()}}return s};e.commands.addCommand(p.search,{label:s.__("Find…"),isEnabled:h,execute:async t=>{const n=u(e.shell.currentWidget);if(n){const e=t["searchText"];if(e){n.setSearchText(e)}else{n.setSearchText(n.model.suggestedInitialQuery)}const i=n.model.selectionState;let s=false;switch(o){case"multiple-selected":s=i==="multiple";break;case"any-selected":s=i==="multiple"||i==="single";break;case"never":break}if(s){await n.model.setFilter("selection",true)}n.focusSearchInput()}}});e.commands.addCommand(p.searchAndReplace,{label:s.__("Find and Replace…"),isEnabled:h,execute:t=>{const n=u(e.shell.currentWidget);if(n){const e=t["searchText"];if(e){n.setSearchText(e)}else{n.setSearchText(n.model.suggestedInitialQuery)}const i=t["replaceText"];if(i){n.setReplaceText(i)}n.showReplace();n.focusSearchInput()}}});e.commands.addCommand(p.findNext,{label:s.__("Find Next"),isEnabled:()=>!!e.shell.currentWidget&&l.has(e.shell.currentWidget.id),execute:async()=>{var t;const n=e.shell.currentWidget;if(!n){return}await((t=l.get(n.id))===null||t===void 0?void 0:t.model.highlightNext())}});e.commands.addCommand(p.findPrevious,{label:s.__("Find Previous"),isEnabled:()=>!!e.shell.currentWidget&&l.has(e.shell.currentWidget.id),execute:async()=>{var t;const n=e.shell.currentWidget;if(!n){return}await((t=l.get(n.id))===null||t===void 0?void 0:t.model.highlightPrevious())}});e.commands.addCommand(p.end,{label:s.__("End Search"),isEnabled:()=>!!e.shell.currentWidget&&l.has(e.shell.currentWidget.id),execute:async()=>{var t;const n=e.shell.currentWidget;if(!n){return}(t=l.get(n.id))===null||t===void 0?void 0:t.close()}});e.commands.addCommand(p.toggleSearchInSelection,{label:s.__("Search in Selection"),isEnabled:()=>!!e.shell.currentWidget&&l.has(e.shell.currentWidget.id)&&"selection"in l.get(e.shell.currentWidget.id).model.filtersDefinition,execute:async()=>{var t;const n=e.shell.currentWidget;if(!n){return}const i=(t=l.get(n.id))===null||t===void 0?void 0:t.model;if(!i){return}const s=i.filters["selection"];return i.setFilter("selection",!s)}});if(n){[p.search,p.findNext,p.findPrevious,p.end,p.toggleSearchInSelection].forEach((e=>{n.addItem({command:e,category:s.__("Main Area")})}))}return d}};const y=[b,S]}}]);
//# sourceMappingURL=350.5b29e20cd45bc4031f49.js.map?v=5b29e20cd45bc4031f49