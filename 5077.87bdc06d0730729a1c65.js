"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[5077],{85077:(e,r,t)=>{t.r(r);t.d(r,{CSVSearchProvider:()=>u});var i=t(68171);var s=t.n(i);var n=t(35627);var a=t.n(n);var c=t(80379);var o=t.n(c);class u extends c.SearchProvider{constructor(){super(...arguments);this.isReadOnly=true}static createNew(e,r){return new u(e)}static isApplicable(e){return e instanceof n.DocumentWidget&&e.content instanceof i.CSVViewer}clearHighlight(){return Promise.resolve()}highlightNext(e){this.widget.content.searchService.find(this._query);return Promise.resolve(undefined)}highlightPrevious(e){this.widget.content.searchService.find(this._query,true);return Promise.resolve(undefined)}replaceCurrentMatch(e,r){return Promise.resolve(false)}replaceAllMatches(e){return Promise.resolve(false)}startQuery(e){this._query=e;this.widget.content.searchService.find(e);return Promise.resolve()}endQuery(){this.widget.content.searchService.clear();return Promise.resolve()}}}}]);
//# sourceMappingURL=5077.87bdc06d0730729a1c65.js.map?v=87bdc06d0730729a1c65