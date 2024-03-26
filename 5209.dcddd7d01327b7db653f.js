"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[5209],{25225:(e,t,n)=>{n.r(t);n.d(t,{default:()=>w});var s=n(49655);var a=n(87447);var r=n(78098);var l=n(95009);var o=n(50724);var i=n(27425);var c=n(37900);var d=n(4702);var u=n(55172);var m=n(19289);var h=n(48130);var p=n(65178);const g="jp-Licenses-Filters-title";class _ extends p.SplitPanel{constructor(e){super();this.addClass("jp-Licenses");this.model=e.model;this.initLeftPanel();this.initFilters();this.initBundles();this.initGrid();this.initLicenseText();this.setRelativeSizes([1,2,3]);void this.model.initLicenses().then((()=>this._updateBundles()));this.model.trackerDataChanged.connect((()=>{this.title.label=this.model.title}))}dispose(){if(this.isDisposed){return}this._bundles.currentChanged.disconnect(this.onBundleSelected,this);this.model.dispose();super.dispose()}initLeftPanel(){this._leftPanel=new p.Panel;this._leftPanel.addClass("jp-Licenses-FormArea");this.addWidget(this._leftPanel);p.SplitPanel.setStretch(this._leftPanel,1)}initFilters(){this._filters=new _.Filters(this.model);p.SplitPanel.setStretch(this._filters,1);this._leftPanel.addWidget(this._filters)}initBundles(){this._bundles=new p.TabBar({orientation:"vertical",renderer:new _.BundleTabRenderer(this.model)});this._bundles.addClass("jp-Licenses-Bundles");p.SplitPanel.setStretch(this._bundles,1);this._leftPanel.addWidget(this._bundles);this._bundles.currentChanged.connect(this.onBundleSelected,this);this.model.stateChanged.connect((()=>this._bundles.update()))}initGrid(){this._grid=new _.Grid(this.model);p.SplitPanel.setStretch(this._grid,1);this.addWidget(this._grid)}initLicenseText(){this._licenseText=new _.FullText(this.model);p.SplitPanel.setStretch(this._grid,1);this.addWidget(this._licenseText)}onBundleSelected(){var e;if((e=this._bundles.currentTitle)===null||e===void 0?void 0:e.label){this.model.currentBundleName=this._bundles.currentTitle.label}}_updateBundles(){this._bundles.clearTabs();let e=0;const{currentBundleName:t}=this.model;let n=0;for(const s of this.model.bundleNames){const a=new p.Widget;a.title.label=s;if(s===t){n=e}this._bundles.insertTab(++e,a.title)}this._bundles.currentIndex=n}}(function(e){e.REPORT_FORMATS={markdown:{id:"markdown",title:"Markdown",icon:i.markdownIcon},csv:{id:"csv",title:"CSV",icon:i.spreadsheetIcon},json:{id:"csv",title:"JSON",icon:i.jsonIcon}};e.DEFAULT_FORMAT="markdown";class t extends i.VDomModel{constructor(e){super();this._selectedPackageChanged=new m.Signal(this);this._trackerDataChanged=new m.Signal(this);this._currentPackageIndex=0;this._licensesReady=new u.PromiseDelegate;this._packageFilter={};this._trans=e.trans;this._licensesUrl=e.licensesUrl;this._serverSettings=e.serverSettings||d.ServerConnection.makeSettings();if(e.currentBundleName){this._currentBundleName=e.currentBundleName}if(e.packageFilter){this._packageFilter=e.packageFilter}if(e.currentPackageIndex){this._currentPackageIndex=e.currentPackageIndex}}async initLicenses(){try{const e=await d.ServerConnection.makeRequest(this._licensesUrl,{},this._serverSettings);this._serverResponse=await e.json();this._licensesReady.resolve();this.stateChanged.emit(void 0)}catch(e){this._licensesReady.reject(e)}}async download(e){const t=`${this._licensesUrl}?format=${e.format}&download=1`;const n=document.createElement("a");n.href=t;n.download="";document.body.appendChild(n);n.click();document.body.removeChild(n);return void 0}get selectedPackageChanged(){return this._selectedPackageChanged}get trackerDataChanged(){return this._trackerDataChanged}get bundleNames(){var e;return Object.keys(((e=this._serverResponse)===null||e===void 0?void 0:e.bundles)||{})}get currentBundleName(){if(this._currentBundleName){return this._currentBundleName}if(this.bundleNames.length){return this.bundleNames[0]}return null}set currentBundleName(e){if(this._currentBundleName!==e){this._currentBundleName=e;this.stateChanged.emit(void 0);this._trackerDataChanged.emit(void 0)}}get licensesReady(){return this._licensesReady.promise}get bundles(){var e;return((e=this._serverResponse)===null||e===void 0?void 0:e.bundles)||{}}get currentPackageIndex(){return this._currentPackageIndex}set currentPackageIndex(e){if(this._currentPackageIndex===e){return}this._currentPackageIndex=e;this._selectedPackageChanged.emit(void 0);this.stateChanged.emit(void 0);this._trackerDataChanged.emit(void 0)}get currentPackage(){var e;if(this.currentBundleName&&this.bundles&&this._currentPackageIndex!=null){return this.getFilteredPackages(((e=this.bundles[this.currentBundleName])===null||e===void 0?void 0:e.packages)||[])[this._currentPackageIndex]}return null}get trans(){return this._trans}get title(){return`${this._currentBundleName||""} ${this._trans.__("Licenses")}`.trim()}get packageFilter(){return this._packageFilter}set packageFilter(e){this._packageFilter=e;this.stateChanged.emit(void 0);this._trackerDataChanged.emit(void 0)}getFilteredPackages(e){let t=[];let n=Object.entries(this._packageFilter).filter((([e,t])=>t&&`${t}`.trim().length)).map((([e,t])=>[e,`${t}`.toLowerCase().trim().split(" ")]));for(const s of e){let e=0;for(const[t,a]of n){let n=0;let r=`${s[t]}`.toLowerCase();for(const e of a){if(r.includes(e)){n+=1}}if(n){e+=1}}if(e===n.length){t.push(s)}}return Object.values(t)}}e.Model=t;class n extends i.VDomRenderer{constructor(e){super(e);this.renderFilter=e=>{const t=this.model.packageFilter[e]||"";return c.createElement("input",{type:"text",name:e,defaultValue:t,className:"jp-mod-styled",onInput:this.onFilterInput})};this.onFilterInput=e=>{const t=e.currentTarget;const{name:n,value:s}=t;this.model.packageFilter={...this.model.packageFilter,[n]:s}};this.addClass("jp-Licenses-Filters");this.addClass("jp-RenderedHTMLCommon")}render(){const{trans:e}=this.model;return c.createElement("div",null,c.createElement("label",null,c.createElement("strong",{className:g},e.__("Filter Licenses By"))),c.createElement("ul",null,c.createElement("li",null,c.createElement("label",null,e.__("Package")),this.renderFilter("name")),c.createElement("li",null,c.createElement("label",null,e.__("Version")),this.renderFilter("versionInfo")),c.createElement("li",null,c.createElement("label",null,e.__("License")),this.renderFilter("licenseId"))),c.createElement("label",null,c.createElement("strong",{className:g},e.__("Distributions"))))}}e.Filters=n;class s extends p.TabBar.Renderer{constructor(e){super();this.closeIconSelector=".lm-TabBar-tabCloseIcon";this.model=e}renderTab(e){let t=e.title.caption;let n=this.createTabKey(e);let s=this.createTabStyle(e);let a=this.createTabClass(e);let r=this.createTabDataset(e);return h.h.li({key:n,className:a,title:t,style:s,dataset:r},this.renderIcon(e),this.renderLabel(e),this.renderCountBadge(e))}renderCountBadge(e){const t=e.title.label;const{bundles:n}=this.model;const s=this.model.getFilteredPackages((n&&t?n[t].packages:[])||[]);return h.h.label({},`${s.length}`)}}e.BundleTabRenderer=s;class a extends i.VDomRenderer{constructor(e){super(e);this.renderRow=(e,t)=>{const n=t===this.model.currentPackageIndex;const s=()=>this.model.currentPackageIndex=t;return c.createElement("tr",{key:e.name,className:n?"jp-mod-selected":"",onClick:s},c.createElement("td",null,c.createElement("input",{type:"radio",name:"show-package-license",value:t,onChange:s,checked:n})),c.createElement("th",null,e.name),c.createElement("td",null,c.createElement("code",null,e.versionInfo)),c.createElement("td",null,c.createElement("code",null,e.licenseId)))};this.addClass("jp-Licenses-Grid");this.addClass("jp-RenderedHTMLCommon")}render(){var e;const{bundles:t,currentBundleName:n,trans:s}=this.model;const a=this.model.getFilteredPackages(t&&n?((e=t[n])===null||e===void 0?void 0:e.packages)||[]:[]);if(!a.length){return c.createElement("blockquote",null,c.createElement("em",null,s.__("No Packages found")))}return c.createElement("form",null,c.createElement("table",null,c.createElement("thead",null,c.createElement("tr",null,c.createElement("td",null),c.createElement("th",null,s.__("Package")),c.createElement("th",null,s.__("Version")),c.createElement("th",null,s.__("License")))),c.createElement("tbody",null,a.map(this.renderRow))))}}e.Grid=a;class r extends i.VDomRenderer{constructor(e){super(e);this.addClass("jp-Licenses-Text");this.addClass("jp-RenderedHTMLCommon");this.addClass("jp-RenderedMarkdown")}render(){const{currentPackage:e,trans:t}=this.model;let n="";let s=t.__("No Package selected");let a="";if(e){const{name:r,versionInfo:l,licenseId:o,extractedText:i}=e;n=`${r} v${l}`;s=`${t.__("License")}: ${o||t.__("No License ID found")}`;a=i||t.__("No License Text found")}return[c.createElement("h1",{key:"h1"},n),c.createElement("blockquote",{key:"quote"},c.createElement("em",null,s)),c.createElement("code",{key:"code"},a)]}}e.FullText=r})(_||(_={}));var b;(function(e){e.open="help:open";e.about="help:about";e.activate="help:activate";e.close="help:close";e.show="help:show";e.hide="help:hide";e.jupyterForum="help:jupyter-forum";e.licenses="help:licenses";e.licenseReport="help:license-report";e.refreshLicenses="help:licenses-refresh"})(b||(b={}));const f=window.location.protocol==="https:";const v="jp-Help";const k={id:"@jupyterlab/help-extension:about",description:'Adds a "About" dialog feature.',autoStart:true,requires:[o.ITranslator],optional:[a.ICommandPalette],activate:(e,t,n)=>{const{commands:s}=e;const r=t.load("jupyterlab");const l=r.__("Help");s.addCommand(b.about,{label:r.__("About %1",e.name),execute:()=>{const t=r.__("Version %1",e.version);const n=c.createElement("span",{className:"jp-About-version-info"},c.createElement("span",{className:"jp-About-version"},t,"(","17-pythonscreen-dev-32",")"));const s=c.createElement("span",{className:"jp-About-header"},c.createElement(i.jupyterIcon.react,{margin:"7px 9.5px",height:"auto",width:"58px"}),c.createElement("div",{className:"jp-About-header-info"},c.createElement(i.jupyterlabWordmarkIcon.react,{height:"auto",width:"196px"}),n));const l="https://jupyter.org/about.html";const o="https://github.com/jupyterlab/jupyterlab/graphs/contributors";const d=c.createElement("span",{className:"jp-About-externalLinks"},c.createElement("a",{href:o,target:"_blank",rel:"noopener noreferrer",className:"jp-Button-flat"},r.__("CONTRIBUTOR LIST")),c.createElement("a",{href:l,target:"_blank",rel:"noopener noreferrer",className:"jp-Button-flat"},r.__("ABOUT PROJECT JUPYTER")));const u=c.createElement("span",{className:"jp-About-copyright"},r.__("© 2015-2023 Project Jupyter Contributors"));const m=c.createElement("div",{className:"jp-About-body"},d,u);return(0,a.showDialog)({title:s,body:m,buttons:[a.Dialog.createButton({label:r.__("Dismiss"),className:"jp-About-button jp-mod-reject jp-mod-styled"})]})}});if(n){n.addItem({command:b.about,category:l})}}};const y={id:"@jupyterlab/help-extension:jupyter-forum",description:"Adds command to open the Jupyter Forum website.",autoStart:true,requires:[o.ITranslator],optional:[a.ICommandPalette],activate:(e,t,n)=>{const{commands:s}=e;const a=t.load("jupyterlab");const r=a.__("Help");s.addCommand(b.jupyterForum,{label:a.__("Jupyter Forum"),execute:()=>{window.open("https://discourse.jupyter.org/c/jupyterlab")}});if(n){n.addItem({command:b.jupyterForum,category:r})}}};const C={id:"@jupyterlab/help-extension:open",description:"Add command to open websites as panel or browser tab.",autoStart:true,requires:[o.ITranslator],optional:[s.ILayoutRestorer],activate:(e,t,n)=>{const{commands:s,shell:l}=e;const o=t.load("jupyterlab");const c="help-doc";const d=new a.WidgetTracker({namespace:c});let u=0;function m(e,t){const n=new i.IFrame({sandbox:["allow-scripts","allow-forms"]});n.url=e;n.addClass(v);n.title.label=t;n.id=`${c}-${++u}`;const s=new a.MainAreaWidget({content:n});s.addClass("jp-Help");return s}s.addCommand(b.open,{label:e=>{var t;return(t=e["text"])!==null&&t!==void 0?t:o.__("Open the provided `url` in a tab.")},execute:e=>{const t=e["url"];const n=e["text"];const s=e["newBrowserTab"]||false;if(s||f&&r.URLExt.parse(t).protocol!=="https:"){window.open(t);return}const a=m(t,n);void d.add(a);l.add(a,"main");return a}});if(n){void n.restore(d,{command:b.open,args:e=>({url:e.content.url,text:e.content.title.label}),name:e=>e.content.url})}}};const j={id:"@jupyterlab/help-extension:resources",description:"Adds menu entries to Jupyter reference documentation websites.",autoStart:true,requires:[l.IMainMenu,o.ITranslator],optional:[s.ILabShell,a.ICommandPalette],activate:(e,t,n,s,r)=>{const l=n.load("jupyterlab");const o=l.__("Help");const{commands:i,serviceManager:d}=e;const u=[{text:l.__("JupyterLab Reference"),url:"https://jupyterlab.readthedocs.io/en/latest/"},{text:l.__("JupyterLab FAQ"),url:"https://jupyterlab.readthedocs.io/en/latest/getting_started/faq.html"},{text:l.__("Jupyter Reference"),url:"https://jupyter.org/documentation"},{text:l.__("Markdown Reference"),url:"https://commonmark.org/help/"}];u.sort(((e,t)=>e.text.localeCompare(t.text)));const m=t.helpMenu;const h=u.map((e=>({args:e,command:b.open})));m.addGroup(h,10);const p=new Map;const g=(e,t)=>{var n;if(!t.length){return}const r=t[t.length-1];if(!r.kernel||p.has(r.kernel.name)){return}const o=d.sessions.connectTo({model:r,kernelConnectionOptions:{handleComms:false}});void((n=o.kernel)===null||n===void 0?void 0:n.info.then((e=>{var t,n;const r=o.kernel.name;if(p.has(r)){return}const u=(n=(t=d.kernelspecs)===null||t===void 0?void 0:t.specs)===null||n===void 0?void 0:n.kernelspecs[r];if(!u){return}p.set(r,e);let h=false;const g=async()=>{const e=await i.execute("helpmenu:get-kernel");h=(e===null||e===void 0?void 0:e.name)===r};g().catch((e=>{console.error("Failed to get the kernel for the current widget.",e)}));if(s){s.currentChanged.connect(g)}const _=()=>h;const f=`help-menu-${r}:banner`;const v=u.display_name;const k=u.resources["logo-svg"]||u.resources["logo-64x64"];i.addCommand(f,{label:l.__("About the %1 Kernel",v),isVisible:_,isEnabled:_,execute:()=>{const t=c.createElement("img",{src:k,alt:l.__("Kernel Icon")});const n=c.createElement("span",{className:"jp-About-header"},t,c.createElement("div",{className:"jp-About-header-info"},v));const s=c.createElement("pre",null,e.banner);const r=c.createElement("div",{className:"jp-About-body"},s);return(0,a.showDialog)({title:n,body:r,buttons:[a.Dialog.createButton({label:l.__("Dismiss"),className:"jp-About-button jp-mod-reject jp-mod-styled"})]})}});m.addGroup([{command:f}],20);const y=[];(e.help_links||[]).forEach((e=>{const t=`help-menu-${r}:${e.text}`;i.addCommand(t,{label:i.label(b.open,e),isVisible:_,isEnabled:_,execute:()=>i.execute(b.open,e)});y.push({command:t})}));m.addGroup(y,21)})).then((()=>{o.dispose()})))};for(const a of d.sessions.running()){g(d.sessions,[a])}d.sessions.runningChanged.connect(g);if(r){u.forEach((e=>{r.addItem({args:e,command:b.open,category:o})}));r.addItem({args:{reload:true},command:"apputils:reset",category:o})}}};const x={id:"@jupyterlab/help-extension:licenses",description:"Adds licenses used report tools.",autoStart:true,requires:[o.ITranslator],optional:[l.IMainMenu,a.ICommandPalette,s.ILayoutRestorer],activate:(e,t,n,s,l)=>{if(!r.PageConfig.getOption("licensesUrl")){return}const{commands:o,shell:c}=e;const d=t.load("jupyterlab");const u=d.__("Help");const m=d.__("Download All Licenses as");const h=d.__("Licenses");const p=d.__("Refresh Licenses");let g=0;const f=r.URLExt.join(r.PageConfig.getBaseUrl(),r.PageConfig.getOption("licensesUrl"))+"/";const v="help-licenses";const k=new a.WidgetTracker({namespace:v});function y(e){return _.REPORT_FORMATS[e]||_.REPORT_FORMATS[_.DEFAULT_FORMAT]}function C(t){const n=new _.Model({...t,licensesUrl:f,trans:d,serverSettings:e.serviceManager.serverSettings});const s=new _({model:n});s.id=`${v}-${++g}`;s.title.label=h;s.title.icon=i.copyrightIcon;const r=new a.MainAreaWidget({content:s,reveal:n.licensesReady});r.toolbar.addItem("refresh-licenses",new i.CommandToolbarButton({id:b.refreshLicenses,args:{noLabel:1},commands:o}));r.toolbar.addItem("spacer",i.Toolbar.createSpacerItem());for(const e of Object.keys(_.REPORT_FORMATS)){const t=new i.CommandToolbarButton({id:b.licenseReport,args:{format:e,noLabel:1},commands:o});r.toolbar.addItem(`download-${e}`,t)}return r}o.addCommand(b.licenses,{label:h,execute:e=>{const t=C(e);c.add(t,"main",{type:"Licenses"});void k.add(t);t.content.model.trackerDataChanged.connect((()=>{void k.save(t)}));return t}});o.addCommand(b.refreshLicenses,{label:e=>e.noLabel?"":p,caption:p,icon:i.refreshIcon,execute:async()=>{var e;return(e=k.currentWidget)===null||e===void 0?void 0:e.content.model.initLicenses()}});o.addCommand(b.licenseReport,{label:e=>{if(e.noLabel){return""}const t=y(`${e.format}`);return`${m} ${t.title}`},caption:e=>{const t=y(`${e.format}`);return`${m} ${t.title}`},icon:e=>{const t=y(`${e.format}`);return t.icon},execute:async e=>{var t;const n=y(`${e.format}`);return await((t=k.currentWidget)===null||t===void 0?void 0:t.content.model.download({format:n.id}))}});if(s){s.addItem({command:b.licenses,category:u})}if(n){const e=n.helpMenu;e.addGroup([{command:b.licenses}],0)}if(l){void l.restore(k,{command:b.licenses,name:e=>"licenses",args:e=>{const{currentBundleName:t,currentPackageIndex:n,packageFilter:s}=e.content.model;const a={currentBundleName:t,currentPackageIndex:n,packageFilter:s};return a}})}}};const E=[k,y,C,j,x];const w=E}}]);
//# sourceMappingURL=5209.dcddd7d01327b7db653f.js.map?v=dcddd7d01327b7db653f