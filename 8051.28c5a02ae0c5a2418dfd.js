(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[8051,2214],{12214:(e,n,t)=>{"use strict";t.r(n);t.d(n,{default:()=>h});var a=t(10890);var o=t.n(a);var i=t(67616);var r=t.n(i);var s=t(49889);var l=t.n(s);var c=t(95994);var d=t.n(c);var u=t(70278);var g=t.n(u);var b=t(29131);var v=t.n(b);const m="@jupyterlab/extensionmanager-extension:plugin";var _;(function(e){e.toggle="extensionmanager:toggle"})(_||(_={}));const p={id:m,autoStart:true,requires:[c.ISettingRegistry,u.ITranslator],optional:[a.ILabShell,a.ILayoutRestorer,i.ICommandPalette],activate:async(e,n,t,a,o,i)=>{const r=t.load("jupyterlab");const l=await n.load(p.id);let c=l.composite["enabled"]===true;const{commands:d,serviceManager:u}=e;let g;const v=()=>{const n=new s.ExtensionView(e,u,l,t);n.id="extensionmanager.main-view";n.title.icon=b.extensionIcon;n.title.caption=r.__("Extension Manager");if(o){o.add(n,n.id)}return n};if(c&&a){g=v();g.node.setAttribute("role","region");g.node.setAttribute("aria-label",r.__("Extension Manager section"));a.add(g,"left",{rank:1e3})}Promise.all([e.restored,n.load(m)]).then((([,n])=>{n.changed.connect((async()=>{c=n.composite["enabled"]===true;if(c&&!(g===null||g===void 0?void 0:g.isAttached)){const e=await y.showWarning(r);if(!e){void n.set("enabled",false);return}g=g||v();g.node.setAttribute("role","region");g.node.setAttribute("aria-label",r.__("Extension Manager section"));if(a){a.add(g,"left",{rank:1e3})}}else if(!c&&(g===null||g===void 0?void 0:g.isAttached)){e.commands.notifyCommandChanged(_.toggle);g.close()}}))})).catch((e=>{console.error(`Something went wrong when reading the settings.\n${e}`)}));d.addCommand(_.toggle,{label:r.__("Enable Extension Manager"),execute:()=>{if(n){void n.set(p.id,"enabled",!c)}},isToggled:()=>c,isEnabled:()=>u.builder.isAvailable});const h=r.__("Extension Manager");const f=_.toggle;if(i){i.addItem({command:f,category:h})}}};const h=p;var y;(function(e){async function n(e){return(0,i.showDialog)({title:e.__("Enable Extension Manager?"),body:e.__(`Thanks for trying out JupyterLab's extension manager.\nThe JupyterLab development team is excited to have a robust\nthird-party extension community.\nHowever, we cannot vouch for every extension,\nand some may introduce security risks.\nDo you want to continue?`),buttons:[i.Dialog.cancelButton({label:e.__("Disable")}),i.Dialog.warnButton({label:e.__("Enable")})]}).then((e=>e.button.accept))}e.showWarning=n})(y||(y={}))}}]);
//# sourceMappingURL=8051.28c5a02ae0c5a2418dfd.js.map?v=28c5a02ae0c5a2418dfd