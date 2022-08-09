(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_mathjax2-extension_lib_index_js-_efab0"],{

/***/ "../../packages/mathjax2-extension/lib/index.js":
/*!******************************************************!*\
  !*** ../../packages/mathjax2-extension/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_mathjax2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/mathjax2 */ "webpack/sharing/consume/default/@jupyterlab/mathjax2/@jupyterlab/mathjax2");
/* harmony import */ var _jupyterlab_mathjax2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mathjax2__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module mathjax2-extension
 */



/**
 * The MathJax latexTypesetter plugin.
 */
const plugin = {
    id: '@jupyterlab/mathjax2-extension:plugin',
    autoStart: true,
    provides: _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__.ILatexTypesetter,
    activate: () => {
        const [urlParam, configParam] = ['fullMathjaxUrl', 'mathjaxConfig'];
        const url = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption(urlParam);
        const config = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption(configParam);
        if (!url) {
            const message = `${plugin.id} uses '${urlParam}' and '${configParam}' in PageConfig ` +
                `to operate but '${urlParam}' was not found.`;
            throw new Error(message);
        }
        return new _jupyterlab_mathjax2__WEBPACK_IMPORTED_MODULE_1__.MathJaxTypesetter({ url, config });
    }
};
/**
 * Export the plugin as default.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbWF0aGpheDItZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNtRDtBQUNNO0FBQ0M7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxvRUFBZ0I7QUFDOUI7QUFDQTtBQUNBLG9CQUFvQix1RUFBb0I7QUFDeEMsdUJBQXVCLHVFQUFvQjtBQUMzQztBQUNBLCtCQUErQixVQUFVLFNBQVMsU0FBUyxTQUFTLFlBQVk7QUFDaEYsbUNBQW1DLFNBQVM7QUFDNUM7QUFDQTtBQUNBLG1CQUFtQixtRUFBaUIsRUFBRSxjQUFjO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxNQUFNLEVBQUM7QUFDdEIsaUMiLCJmaWxlIjoicGFja2FnZXNfbWF0aGpheDItZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy1fZWZhYjAuMWQyNTU1MTRmZGE1OTE2ZmY1ZjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIG1hdGhqYXgyLWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBQYWdlQ29uZmlnIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IE1hdGhKYXhUeXBlc2V0dGVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvbWF0aGpheDInO1xuaW1wb3J0IHsgSUxhdGV4VHlwZXNldHRlciB9IGZyb20gJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWUnO1xuLyoqXG4gKiBUaGUgTWF0aEpheCBsYXRleFR5cGVzZXR0ZXIgcGx1Z2luLlxuICovXG5jb25zdCBwbHVnaW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9tYXRoamF4Mi1leHRlbnNpb246cGx1Z2luJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcHJvdmlkZXM6IElMYXRleFR5cGVzZXR0ZXIsXG4gICAgYWN0aXZhdGU6ICgpID0+IHtcbiAgICAgICAgY29uc3QgW3VybFBhcmFtLCBjb25maWdQYXJhbV0gPSBbJ2Z1bGxNYXRoamF4VXJsJywgJ21hdGhqYXhDb25maWcnXTtcbiAgICAgICAgY29uc3QgdXJsID0gUGFnZUNvbmZpZy5nZXRPcHRpb24odXJsUGFyYW0pO1xuICAgICAgICBjb25zdCBjb25maWcgPSBQYWdlQ29uZmlnLmdldE9wdGlvbihjb25maWdQYXJhbSk7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gYCR7cGx1Z2luLmlkfSB1c2VzICcke3VybFBhcmFtfScgYW5kICcke2NvbmZpZ1BhcmFtfScgaW4gUGFnZUNvbmZpZyBgICtcbiAgICAgICAgICAgICAgICBgdG8gb3BlcmF0ZSBidXQgJyR7dXJsUGFyYW19JyB3YXMgbm90IGZvdW5kLmA7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBNYXRoSmF4VHlwZXNldHRlcih7IHVybCwgY29uZmlnIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIEV4cG9ydCB0aGUgcGx1Z2luIGFzIGRlZmF1bHQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHBsdWdpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=