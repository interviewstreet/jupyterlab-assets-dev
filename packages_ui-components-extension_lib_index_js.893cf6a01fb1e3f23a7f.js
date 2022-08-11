(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_ui-components-extension_lib_index_js"],{

/***/ "../../packages/ui-components-extension/lib/index.js":
/*!***********************************************************!*\
  !*** ../../packages/ui-components-extension/lib/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module ui-components-extension
 */

/**
 * Placeholder for future extension that will provide an icon manager class
 * to assist with overriding/replacing particular sets of icons
 */
const labiconManager = {
    id: '@jupyterlab/ui-components-extension:labicon-manager',
    provides: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.ILabIconManager,
    autoStart: true,
    activate: (app) => {
        return Object.create(null);
    }
};
/**
 * Sets up the component registry to be used by the FormEditor component.
 */
const registryPlugin = {
    id: '@jupyterlab/settingeditor-extension:form-registry',
    provides: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.IFormComponentRegistry,
    autoStart: true,
    activate: (app) => {
        const editorRegistry = new _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_0__.FormComponentRegistry();
        return editorRegistry;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([labiconManager, registryPlugin]);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdWktY29tcG9uZW50cy1leHRlbnNpb24vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMyRztBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHNFQUFlO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw2RUFBc0I7QUFDcEM7QUFDQTtBQUNBLG1DQUFtQyw0RUFBcUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsZ0NBQWdDLEVBQUM7QUFDaEQsaUMiLCJmaWxlIjoicGFja2FnZXNfdWktY29tcG9uZW50cy1leHRlbnNpb25fbGliX2luZGV4X2pzLjg5M2NmNmEwMWZiMWUzZjIzYTdmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgdWktY29tcG9uZW50cy1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgRm9ybUNvbXBvbmVudFJlZ2lzdHJ5LCBJRm9ybUNvbXBvbmVudFJlZ2lzdHJ5LCBJTGFiSWNvbk1hbmFnZXIgfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbi8qKlxuICogUGxhY2Vob2xkZXIgZm9yIGZ1dHVyZSBleHRlbnNpb24gdGhhdCB3aWxsIHByb3ZpZGUgYW4gaWNvbiBtYW5hZ2VyIGNsYXNzXG4gKiB0byBhc3Npc3Qgd2l0aCBvdmVycmlkaW5nL3JlcGxhY2luZyBwYXJ0aWN1bGFyIHNldHMgb2YgaWNvbnNcbiAqL1xuY29uc3QgbGFiaWNvbk1hbmFnZXIgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzLWV4dGVuc2lvbjpsYWJpY29uLW1hbmFnZXInLFxuICAgIHByb3ZpZGVzOiBJTGFiSWNvbk1hbmFnZXIsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGFjdGl2YXRlOiAoYXBwKSA9PiB7XG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cbn07XG4vKipcbiAqIFNldHMgdXAgdGhlIGNvbXBvbmVudCByZWdpc3RyeSB0byBiZSB1c2VkIGJ5IHRoZSBGb3JtRWRpdG9yIGNvbXBvbmVudC5cbiAqL1xuY29uc3QgcmVnaXN0cnlQbHVnaW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9zZXR0aW5nZWRpdG9yLWV4dGVuc2lvbjpmb3JtLXJlZ2lzdHJ5JyxcbiAgICBwcm92aWRlczogSUZvcm1Db21wb25lbnRSZWdpc3RyeSxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgYWN0aXZhdGU6IChhcHApID0+IHtcbiAgICAgICAgY29uc3QgZWRpdG9yUmVnaXN0cnkgPSBuZXcgRm9ybUNvbXBvbmVudFJlZ2lzdHJ5KCk7XG4gICAgICAgIHJldHVybiBlZGl0b3JSZWdpc3RyeTtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgW2xhYmljb25NYW5hZ2VyLCByZWdpc3RyeVBsdWdpbl07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9