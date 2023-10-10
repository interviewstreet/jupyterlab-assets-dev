(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[5225],{25225:(e,t,n)=>{"use strict";n.r(t);n.d(t,{default:()=>E});var s=n(10890);var a=n(67616);var r=n(66853);var l=n(48305);var o=n(70278);var i=n(29131);var c=n(2411);var d=n(42911);var u=n(98034);var m=n(8595);var h=n(997);var p=n(18453);class g extends p.SplitPanel{constructor(e){super();this.addClass("jp-Licenses");this.model=e.model;this.initLeftPanel();this.initFilters();this.initBundles();this.initGrid();this.initLicenseText();this.setRelativeSizes([1,2,3]);void this.model.initLicenses().then((()=>this._updateBundles()));this.model.trackerDataChanged.connect((()=>{this.title.label=this.model.title}))}dispose(){if(this.isDisposed){return}this._bundles.currentChanged.disconnect(this.onBundleSelected,this);this.model.dispose();super.dispose()}initLeftPanel(){this._leftPanel=new p.Panel;this._leftPanel.addClass("jp-Licenses-FormArea");this.addWidget(this._leftPanel);p.SplitPanel.setStretch(this._leftPanel,1)}initFilters(){this._filters=new g.Filters(this.model);p.SplitPanel.setStretch(this._filters,1);this._leftPanel.addWidget(this._filters)}initBundles(){this._bundles=new p.TabBar({orientation:"vertical",renderer:new g.BundleTabRenderer(this.model)});this._bundles.addClass("jp-Licenses-Bundles");p.SplitPanel.setStretch(this._bundles,1);this._leftPanel.addWidget(this._bundles);this._bundles.currentChanged.connect(this.onBundleSelected,this);this.model.stateChanged.connect((()=>this._bundles.update()))}initGrid(){this._grid=new g.Grid(this.model);p.SplitPanel.setStretch(this._grid,1);this.addWidget(this._grid)}initLicenseText(){this._licenseText=new g.FullText(this.model);p.SplitPanel.setStretch(this._grid,1);this.addWidget(this._licenseText)}onBundleSelected(){var e;if((e=this._bundles.currentTitle)===null||e===void 0?void 0:e.label){this.model.currentBundleName=this._bundles.currentTitle.label}}_updateBundles(){this._bundles.clearTabs();let e=0;const{currentBundleName:t}=this.model;let n=0;for(const s of this.model.bundleNames){const a=new p.Widget;a.title.label=s;if(s===t){n=e}this._bundles.insertTab(++e,a.title)}this._bundles.currentIndex=n}}(function(e){e.REPORT_FORMATS={markdown:{id:"markdown",title:"Markdown",icon:i.markdownIcon},csv:{id:"csv",title:"CSV",icon:i.spreadsheetIcon},json:{id:"csv",title:"JSON",icon:i.jsonIcon}};e.DEFAULT_FORMAT="markdown";class t extends a.VDomModel{constructor(e){super();this._selectedPackageChanged=new m.Signal(this);this._trackerDataChanged=new m.Signal(this);this._currentPackageIndex=0;this._licensesReady=new u.PromiseDelegate;this._packageFilter={};this._trans=e.trans;this._licensesUrl=e.licensesUrl;this._serverSettings=e.serverSettings||d.ServerConnection.makeSettings();if(e.currentBundleName){this._currentBundleName=e.currentBundleName}if(e.packageFilter){this._packageFilter=e.packageFilter}if(e.currentPackageIndex){this._currentPackageIndex=e.currentPackageIndex}}async initLicenses(){try{const e=await d.ServerConnection.makeRequest(this._licensesUrl,{},this._serverSettings);this._serverResponse=await e.json();this._licensesReady.resolve();this.stateChanged.emit(void 0)}catch(e){this._licensesReady.reject(e)}}async download(e){const t=`${this._licensesUrl}?format=${e.format}&download=1`;const n=document.createElement("a");n.href=t;n.download="";document.body.appendChild(n);n.click();document.body.removeChild(n);return void 0}get selectedPackageChanged(){return this._selectedPackageChanged}get trackerDataChanged(){return this._trackerDataChanged}get bundleNames(){var e;return Object.keys(((e=this._serverResponse)===null||e===void 0?void 0:e.bundles)||{})}get currentBundleName(){if(this._currentBundleName){return this._currentBundleName}if(this.bundleNames.length){return this.bundleNames[0]}return null}set currentBundleName(e){if(this._currentBundleName!==e){this._currentBundleName=e;this.stateChanged.emit(void 0);this._trackerDataChanged.emit(void 0)}}get licensesReady(){return this._licensesReady.promise}get bundles(){var e;return((e=this._serverResponse)===null||e===void 0?void 0:e.bundles)||{}}get currentPackageIndex(){return this._currentPackageIndex}set currentPackageIndex(e){if(this._currentPackageIndex===e){return}this._currentPackageIndex=e;this._selectedPackageChanged.emit(void 0);this.stateChanged.emit(void 0);this._trackerDataChanged.emit(void 0)}get currentPackage(){var e;if(this.currentBundleName&&this.bundles&&this._currentPackageIndex!=null){return this.getFilteredPackages(((e=this.bundles[this.currentBundleName])===null||e===void 0?void 0:e.packages)||[])[this._currentPackageIndex]}return null}get trans(){return this._trans}get title(){return`${this._currentBundleName||""} ${this._trans.__("Licenses")}`.trim()}get packageFilter(){return this._packageFilter}set packageFilter(e){this._packageFilter=e;this.stateChanged.emit(void 0);this._trackerDataChanged.emit(void 0)}getFilteredPackages(e){let t=[];let n=Object.entries(this._packageFilter).filter((([e,t])=>t&&`${t}`.trim().length)).map((([e,t])=>[e,`${t}`.toLowerCase().trim().split(" ")]));for(const s of e){let e=0;for(const[t,a]of n){let n=0;let r=`${s[t]}`.toLowerCase();for(const e of a){if(r.includes(e)){n+=1}}if(n){e+=1}}if(e===n.length){t.push(s)}}return Object.values(t)}}e.Model=t;class n extends a.VDomRenderer{constructor(e){super(e);this.renderFilter=e=>{const t=this.model.packageFilter[e]||"";return c.createElement("input",{type:"text",name:e,defaultValue:t,className:"jp-mod-styled",onInput:this.onFilterInput})};this.onFilterInput=e=>{const t=e.currentTarget;const{name:n,value:s}=t;this.model.packageFilter=Object.assign(Object.assign({},this.model.packageFilter),{[n]:s})};this.addClass("jp-Licenses-Filters");this.addClass("jp-RenderedHTMLCommon")}render(){const{trans:e}=this.model;return c.createElement("div",null,c.createElement("label",null,c.createElement("strong",null,e.__("Filter Licenses By"))),c.createElement("ul",null,c.createElement("li",null,c.createElement("label",null,e.__("Package")),this.renderFilter("name")),c.createElement("li",null,c.createElement("label",null,e.__("Version")),this.renderFilter("versionInfo")),c.createElement("li",null,c.createElement("label",null,e.__("License")),this.renderFilter("licenseId"))),c.createElement("label",null,c.createElement("strong",null,e.__("Distributions"))))}}e.Filters=n;class s extends p.TabBar.Renderer{constructor(e){super();this.closeIconSelector=".lm-TabBar-tabCloseIcon";this.model=e}renderTab(e){let t=e.title.caption;let n=this.createTabKey(e);let s=this.createTabStyle(e);let a=this.createTabClass(e);let r=this.createTabDataset(e);return h.h.li({key:n,className:a,title:t,style:s,dataset:r},this.renderIcon(e),this.renderLabel(e),this.renderCountBadge(e))}renderCountBadge(e){const t=e.title.label;const{bundles:n}=this.model;const s=this.model.getFilteredPackages((n&&t?n[t].packages:[])||[]);return h.h.label({},`${s.length}`)}}e.BundleTabRenderer=s;class r extends a.VDomRenderer{constructor(e){super(e);this.renderRow=(e,t)=>{const n=t===this.model.currentPackageIndex;const s=()=>this.model.currentPackageIndex=t;return c.createElement("tr",{key:e.name,className:n?"jp-mod-selected":"",onClick:s},c.createElement("td",null,c.createElement("input",{type:"radio",name:"show-package-license",value:t,onChange:s,checked:n})),c.createElement("th",null,e.name),c.createElement("td",null,c.createElement("code",null,e.versionInfo)),c.createElement("td",null,c.createElement("code",null,e.licenseId)))};this.addClass("jp-Licenses-Grid");this.addClass("jp-RenderedHTMLCommon")}render(){var e;const{bundles:t,currentBundleName:n,trans:s}=this.model;const a=this.model.getFilteredPackages(t&&n?((e=t[n])===null||e===void 0?void 0:e.packages)||[]:[]);if(!a.length){return c.createElement("blockquote",null,c.createElement("em",null,s.__("No Packages found")))}return c.createElement("form",null,c.createElement("table",null,c.createElement("thead",null,c.createElement("tr",null,c.createElement("td",null),c.createElement("th",null,s.__("Package")),c.createElement("th",null,s.__("Version")),c.createElement("th",null,s.__("License")))),c.createElement("tbody",null,a.map(this.renderRow))))}}e.Grid=r;class l extends a.VDomRenderer{constructor(e){super(e);this.addClass("jp-Licenses-Text");this.addClass("jp-RenderedHTMLCommon");this.addClass("jp-RenderedMarkdown")}render(){const{currentPackage:e,trans:t}=this.model;let n="";let s=t.__("No Package selected");let a="";if(e){const{name:r,versionInfo:l,licenseId:o,extractedText:i}=e;n=`${r} v${l}`;s=`${t.__("License")}: ${o||t.__("No License ID found")}`;a=i||t.__("No License Text found")}return[c.createElement("h1",{key:"h1"},n),c.createElement("blockquote",{key:"quote"},c.createElement("em",null,s)),c.createElement("code",{key:"code"},a)]}}e.FullText=l})(g||(g={}));var _;(function(e){e.open="help:open";e.about="help:about";e.activate="help:activate";e.close="help:close";e.show="help:show";e.hide="help:hide";e.launchClassic="help:launch-classic-notebook";e.jupyterForum="help:jupyter-forum";e.licenses="help:licenses";e.licenseReport="help:license-report";e.refreshLicenses="help:licenses-refresh"})(_||(_={}));const b=window.location.protocol==="https:";const f="jp-Help";const v={id:"@jupyterlab/help-extension:about",autoStart:true,requires:[o.ITranslator],optional:[a.ICommandPalette],activate:(e,t,n)=>{const{commands:s}=e;const r=t.load("jupyterlab");const l=r.__("Help");s.addCommand(_.about,{label:r.__("About %1",e.name),execute:()=>{const t=r.__("Version %1",e.version);const n=c.createElement("span",{className:"jp-About-version-info"},c.createElement("span",{className:"jp-About-version"},t,"(","8-pythonscreen-dev-17",")"));const s=c.createElement("span",{className:"jp-About-header"},c.createElement(i.jupyterIcon.react,{margin:"7px 9.5px",height:"auto",width:"58px"}),c.createElement("div",{className:"jp-About-header-info"},c.createElement(i.jupyterlabWordmarkIcon.react,{height:"auto",width:"196px"}),n));const l="https://jupyter.org/about.html";const o="https://github.com/jupyterlab/jupyterlab/graphs/contributors";const d=c.createElement("span",{className:"jp-About-externalLinks"},c.createElement("a",{href:o,target:"_blank",rel:"noopener noreferrer",className:"jp-Button-flat"},r.__("CONTRIBUTOR LIST")),c.createElement("a",{href:l,target:"_blank",rel:"noopener noreferrer",className:"jp-Button-flat"},r.__("ABOUT PROJECT JUPYTER")));const u=c.createElement("span",{className:"jp-About-copyright"},r.__("© 2015-2022 Project Jupyter Contributors"));const m=c.createElement("div",{className:"jp-About-body"},d,u);return(0,a.showDialog)({title:s,body:m,buttons:[a.Dialog.createButton({label:r.__("Dismiss"),className:"jp-About-button jp-mod-reject jp-mod-styled"})]})}});if(n){n.addItem({command:_.about,category:l})}}};const k={id:"@jupyterlab/help-extension:launch-classic",autoStart:true,requires:[o.ITranslator],optional:[a.ICommandPalette],activate:(e,t,n)=>{const{commands:s}=e;const a=t.load("jupyterlab");const l=a.__("Help");s.addCommand(_.launchClassic,{label:a.__("Launch Classic Notebook"),execute:()=>{window.open(r.PageConfig.getBaseUrl()+"tree")}});if(n){n.addItem({command:_.launchClassic,category:l})}}};const C={id:"@jupyterlab/help-extension:jupyter-forum",autoStart:true,requires:[o.ITranslator],optional:[a.ICommandPalette],activate:(e,t,n)=>{const{commands:s}=e;const a=t.load("jupyterlab");const r=a.__("Help");s.addCommand(_.jupyterForum,{label:a.__("Jupyter Forum"),execute:()=>{window.open("https://discourse.jupyter.org/c/jupyterlab")}});if(n){n.addItem({command:_.jupyterForum,category:r})}}};const y={id:"@jupyterlab/help-extension:resources",autoStart:true,requires:[l.IMainMenu,o.ITranslator],optional:[a.ICommandPalette,s.ILayoutRestorer],activate:(e,t,n,s,l)=>{const o=n.load("jupyterlab");let i=0;const d=o.__("Help");const u="help-doc";const{commands:m,shell:h,serviceManager:p}=e;const g=new a.WidgetTracker({namespace:u});const v=[{text:o.__("JupyterLab Reference"),url:"https://jupyterlab.readthedocs.io/en/3.4.x/"},{text:o.__("JupyterLab FAQ"),url:"https://jupyterlab.readthedocs.io/en/3.4.x/getting_started/faq.html"},{text:o.__("Jupyter Reference"),url:"https://jupyter.org/documentation"},{text:o.__("Markdown Reference"),url:"https://commonmark.org/help/"}];v.sort(((e,t)=>e.text.localeCompare(t.text)));if(l){void l.restore(g,{command:_.open,args:e=>({url:e.content.url,text:e.content.title.label}),name:e=>e.content.url})}function k(e,t){const n=new a.IFrame({sandbox:["allow-scripts","allow-forms"]});n.url=e;n.addClass(f);n.title.label=t;n.id=`${u}-${++i}`;const s=new a.MainAreaWidget({content:n});s.addClass("jp-Help");return s}const C=t.helpMenu;const y=v.map((e=>({args:e,command:_.open})));C.addGroup(y,10);const j=new Map;p.sessions.runningChanged.connect(((t,n)=>{var s;if(!n.length){return}const r=n[n.length-1];if(!r.kernel||j.has(r.kernel.name)){return}const l=p.sessions.connectTo({model:r,kernelConnectionOptions:{handleComms:false}});void((s=l.kernel)===null||s===void 0?void 0:s.info.then((t=>{var n,s;const r=l.kernel.name;if(j.has(r)){return}j.set(r,t);const i=()=>{let t=false;const n=e.shell.currentWidget;if(!n){return t}C.kernelUsers.forEach((e=>{var s;if(e.tracker.has(n)&&((s=e.getKernel(n))===null||s===void 0?void 0:s.name)===r){t=true}}));return t};const d=`help-menu-${r}:banner`;const u=(s=(n=p.kernelspecs)===null||n===void 0?void 0:n.specs)===null||s===void 0?void 0:s.kernelspecs[r];if(!u){return}const h=u.display_name;let g=u.resources["logo-64x64"];m.addCommand(d,{label:o.__("About the %1 Kernel",h),isVisible:i,isEnabled:i,execute:()=>{const e=c.createElement("img",{src:g});const n=c.createElement("span",{className:"jp-About-header"},e,c.createElement("div",{className:"jp-About-header-info"},h));const s=c.createElement("pre",null,t.banner);const r=c.createElement("div",{className:"jp-About-body"},s);return(0,a.showDialog)({title:n,body:r,buttons:[a.Dialog.createButton({label:o.__("Dismiss"),className:"jp-About-button jp-mod-reject jp-mod-styled"})]})}});C.addGroup([{command:d}],20);const b=[];(t.help_links||[]).forEach((e=>{const t=`help-menu-${r}:${e.text}`;m.addCommand(t,{label:e.text,isVisible:i,isEnabled:i,execute:()=>m.execute(_.open,e)});b.push({command:t})}));C.addGroup(b,21);l.dispose()})))}));m.addCommand(_.open,{label:e=>e["text"],execute:e=>{const t=e["url"];const n=e["text"];const s=e["newBrowserTab"]||false;if(s||b&&r.URLExt.parse(t).protocol!=="https:"){window.open(t);return}const a=k(t,n);void g.add(a);h.add(a,"main");return a}});if(s){v.forEach((e=>{s.addItem({args:e,command:_.open,category:d})}));s.addItem({args:{reload:true},command:"apputils:reset",category:d})}}};const j={id:"@jupyterlab/help-extension:licenses",autoStart:true,requires:[o.ITranslator],optional:[l.IMainMenu,a.ICommandPalette,s.ILayoutRestorer],activate:(e,t,n,s,l)=>{if(!r.PageConfig.getOption("licensesUrl")){return}const{commands:o,shell:c}=e;const d=t.load("jupyterlab");const u=d.__("Help");const m=d.__("Download All Licenses as");const h=d.__("Licenses");const p=d.__("Refresh Licenses");let b=0;const f=r.URLExt.join(r.PageConfig.getBaseUrl(),r.PageConfig.getOption("licensesUrl"))+"/";const v="help-licenses";const k=new a.WidgetTracker({namespace:v});function C(e){return g.REPORT_FORMATS[e]||g.REPORT_FORMATS[g.DEFAULT_FORMAT]}function y(t){const n=new g.Model(Object.assign(Object.assign({},t),{licensesUrl:f,trans:d,serverSettings:e.serviceManager.serverSettings}));const s=new g({model:n});s.id=`${v}-${++b}`;s.title.label=h;s.title.icon=i.copyrightIcon;const r=new a.MainAreaWidget({content:s,reveal:n.licensesReady});r.toolbar.addItem("refresh-licenses",new a.CommandToolbarButton({id:_.refreshLicenses,args:{noLabel:1},commands:o}));r.toolbar.addItem("spacer",a.Toolbar.createSpacerItem());for(const e of Object.keys(g.REPORT_FORMATS)){const t=new a.CommandToolbarButton({id:_.licenseReport,args:{format:e,noLabel:1},commands:o});r.toolbar.addItem(`download-${e}`,t)}return r}o.addCommand(_.licenses,{label:h,execute:e=>{const t=y(e);c.add(t,"main");void k.add(t);t.content.model.trackerDataChanged.connect((()=>{void k.save(t)}));return t}});o.addCommand(_.refreshLicenses,{label:e=>e.noLabel?"":p,caption:p,icon:i.refreshIcon,execute:async()=>{var e;return(e=k.currentWidget)===null||e===void 0?void 0:e.content.model.initLicenses()}});o.addCommand(_.licenseReport,{label:e=>{if(e.noLabel){return""}const t=C(`${e.format}`);return`${m} ${t.title}`},caption:e=>{const t=C(`${e.format}`);return`${m} ${t.title}`},icon:e=>{const t=C(`${e.format}`);return t.icon},execute:async e=>{var t;const n=C(`${e.format}`);return await((t=k.currentWidget)===null||t===void 0?void 0:t.content.model.download({format:n.id}))}});if(s){s.addItem({command:_.licenses,category:u})}if(n){const e=n.helpMenu;e.addGroup([{command:_.licenses}],0)}if(l){void l.restore(k,{command:_.licenses,name:e=>"licenses",args:e=>{const{currentBundleName:t,currentPackageIndex:n,packageFilter:s}=e.content.model;const a={currentBundleName:t,currentPackageIndex:n,packageFilter:s};return a}})}}};const x=[v,k,C,y,j];const E=x}}]);
//# sourceMappingURL=5225.d995788a09d0dbdf3ace.js.map?v=d995788a09d0dbdf3ace