(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_docprovider-extension_lib_index_js-_a23a1"],{

/***/ "../../packages/docprovider-extension/lib/index.js":
/*!*********************************************************!*\
  !*** ../../packages/docprovider-extension/lib/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docprovider */ "webpack/sharing/consume/default/@jupyterlab/docprovider/@jupyterlab/docprovider");
/* harmony import */ var _jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module docprovider-extension
 */



/**
 * The default document provider plugin
 */
const docProviderPlugin = {
    id: '@jupyterlab/docprovider-extension:plugin',
    provides: _jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_1__.IDocumentProviderFactory,
    activate: (app) => {
        const server = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_2__.ServerConnection.makeSettings();
        const url = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(server.wsUrl, 'api/yjs');
        const collaborative = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getOption('collaborative') == 'true' ? true : false;
        const factory = (options) => {
            return collaborative
                ? new _jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_1__.WebSocketProviderWithLocks(Object.assign(Object.assign({}, options), { url }))
                : new _jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_1__.ProviderMock();
        };
        return factory;
    }
};
/**
 * Export the plugins as default.
 */
const plugins = [docProviderPlugin];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jcHJvdmlkZXItZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzJEO0FBQ2tEO0FBQ3JEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZFQUF3QjtBQUN0QztBQUNBLHVCQUF1QiwrRUFBNkI7QUFDcEQsb0JBQW9CLDhEQUFXO0FBQy9CLDhCQUE4Qix1RUFBb0I7QUFDbEQ7QUFDQTtBQUNBLHNCQUFzQiwrRUFBMEIsK0JBQStCLGFBQWEsTUFBTTtBQUNsRyxzQkFBc0IsaUVBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLE9BQU8sRUFBQztBQUN2QixpQyIsImZpbGUiOiJwYWNrYWdlc19kb2Nwcm92aWRlci1leHRlbnNpb25fbGliX2luZGV4X2pzLV9hMjNhMS5kZmQ3ZWFkNjIwMmM1MTlmZGU5Ni5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGRvY3Byb3ZpZGVyLWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBQYWdlQ29uZmlnLCBVUkxFeHQgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgSURvY3VtZW50UHJvdmlkZXJGYWN0b3J5LCBQcm92aWRlck1vY2ssIFdlYlNvY2tldFByb3ZpZGVyV2l0aExvY2tzIH0gZnJvbSAnQGp1cHl0ZXJsYWIvZG9jcHJvdmlkZXInO1xuaW1wb3J0IHsgU2VydmVyQ29ubmVjdGlvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3NlcnZpY2VzJztcbi8qKlxuICogVGhlIGRlZmF1bHQgZG9jdW1lbnQgcHJvdmlkZXIgcGx1Z2luXG4gKi9cbmNvbnN0IGRvY1Byb3ZpZGVyUGx1Z2luID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvZG9jcHJvdmlkZXItZXh0ZW5zaW9uOnBsdWdpbicsXG4gICAgcHJvdmlkZXM6IElEb2N1bWVudFByb3ZpZGVyRmFjdG9yeSxcbiAgICBhY3RpdmF0ZTogKGFwcCkgPT4ge1xuICAgICAgICBjb25zdCBzZXJ2ZXIgPSBTZXJ2ZXJDb25uZWN0aW9uLm1ha2VTZXR0aW5ncygpO1xuICAgICAgICBjb25zdCB1cmwgPSBVUkxFeHQuam9pbihzZXJ2ZXIud3NVcmwsICdhcGkveWpzJyk7XG4gICAgICAgIGNvbnN0IGNvbGxhYm9yYXRpdmUgPSBQYWdlQ29uZmlnLmdldE9wdGlvbignY29sbGFib3JhdGl2ZScpID09ICd0cnVlJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IChvcHRpb25zKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29sbGFib3JhdGl2ZVxuICAgICAgICAgICAgICAgID8gbmV3IFdlYlNvY2tldFByb3ZpZGVyV2l0aExvY2tzKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgdXJsIH0pKVxuICAgICAgICAgICAgICAgIDogbmV3IFByb3ZpZGVyTW9jaygpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZmFjdG9yeTtcbiAgICB9XG59O1xuLyoqXG4gKiBFeHBvcnQgdGhlIHBsdWdpbnMgYXMgZGVmYXVsdC5cbiAqL1xuY29uc3QgcGx1Z2lucyA9IFtkb2NQcm92aWRlclBsdWdpbl07XG5leHBvcnQgZGVmYXVsdCBwbHVnaW5zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==