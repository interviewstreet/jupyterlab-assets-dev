(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_celltags-extension_lib_index_js"],{

/***/ "../../packages/celltags-extension/lib/index.js":
/*!******************************************************!*\
  !*** ../../packages/celltags-extension/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_celltags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/celltags */ "webpack/sharing/consume/default/@jupyterlab/celltags/@jupyterlab/celltags");
/* harmony import */ var _jupyterlab_celltags__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_celltags__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module celltags-extension
 */



/**
 * Initialization data for the celltags extension.
 */
const celltags = {
    id: '@jupyterlab/celltags',
    autoStart: true,
    requires: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.INotebookTools, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_0__.INotebookTracker, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.ITranslator],
    activate: (app, tools, tracker, translator) => {
        const tool = new _jupyterlab_celltags__WEBPACK_IMPORTED_MODULE_1__.TagTool(tracker, app, translator);
        tools.addItem({ tool: tool, rank: 1.6 });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (celltags);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY2VsbHRhZ3MtZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3dFO0FBQ3pCO0FBQ087QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnRUFBYyxFQUFFLGtFQUFnQixFQUFFLGdFQUFXO0FBQzVEO0FBQ0EseUJBQXlCLHlEQUFPO0FBQ2hDLHVCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBLGlFQUFlLFFBQVEsRUFBQztBQUN4QixpQyIsImZpbGUiOiJwYWNrYWdlc19jZWxsdGFncy1leHRlbnNpb25fbGliX2luZGV4X2pzLmEyYWNmMTVmNDE3Yjk3YTE0NGE5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgY2VsbHRhZ3MtZXh0ZW5zaW9uXG4gKi9cbmltcG9ydCB7IElOb3RlYm9va1Rvb2xzLCBJTm90ZWJvb2tUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvbm90ZWJvb2snO1xuaW1wb3J0IHsgVGFnVG9vbCB9IGZyb20gJ0BqdXB5dGVybGFiL2NlbGx0YWdzJztcbmltcG9ydCB7IElUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuLyoqXG4gKiBJbml0aWFsaXphdGlvbiBkYXRhIGZvciB0aGUgY2VsbHRhZ3MgZXh0ZW5zaW9uLlxuICovXG5jb25zdCBjZWxsdGFncyA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2NlbGx0YWdzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJTm90ZWJvb2tUb29scywgSU5vdGVib29rVHJhY2tlciwgSVRyYW5zbGF0b3JdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCB0b29scywgdHJhY2tlciwgdHJhbnNsYXRvcikgPT4ge1xuICAgICAgICBjb25zdCB0b29sID0gbmV3IFRhZ1Rvb2wodHJhY2tlciwgYXBwLCB0cmFuc2xhdG9yKTtcbiAgICAgICAgdG9vbHMuYWRkSXRlbSh7IHRvb2w6IHRvb2wsIHJhbms6IDEuNiB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgY2VsbHRhZ3M7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9