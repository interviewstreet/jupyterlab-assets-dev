(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_theme-light-extension_lib_index_js"],{

/***/ "../../packages/theme-light-extension/lib/index.js":
/*!*********************************************************!*\
  !*** ../../packages/theme-light-extension/lib/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module theme-light-extension
 */


/**
 * A plugin for the Jupyter Light Theme.
 */
const plugin = {
    id: '@jupyterlab/theme-light-extension:plugin',
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.IThemeManager, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.ITranslator],
    activate: (app, manager, translator) => {
        const trans = translator.load('jupyterlab');
        const style = '@jupyterlab/theme-light-extension/index.css';
        manager.register({
            name: 'JupyterLab Light',
            displayName: trans.__('JupyterLab Light'),
            isLight: true,
            themeScrollbars: false,
            load: () => manager.loadCSS(style),
            unload: () => Promise.resolve(undefined)
        });
    },
    autoStart: true
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdGhlbWUtbGlnaHQtZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNxRDtBQUNDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLCtEQUFhLEVBQUUsZ0VBQVc7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxpRUFBZSxNQUFNLEVBQUM7QUFDdEIsaUMiLCJmaWxlIjoicGFja2FnZXNfdGhlbWUtbGlnaHQtZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy45NzUxMWY3NGEwZjJkOTgyNmFhMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIHRoZW1lLWxpZ2h0LWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBJVGhlbWVNYW5hZ2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgSVRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG4vKipcbiAqIEEgcGx1Z2luIGZvciB0aGUgSnVweXRlciBMaWdodCBUaGVtZS5cbiAqL1xuY29uc3QgcGx1Z2luID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvdGhlbWUtbGlnaHQtZXh0ZW5zaW9uOnBsdWdpbicsXG4gICAgcmVxdWlyZXM6IFtJVGhlbWVNYW5hZ2VyLCBJVHJhbnNsYXRvcl0sXG4gICAgYWN0aXZhdGU6IChhcHAsIG1hbmFnZXIsIHRyYW5zbGF0b3IpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSAnQGp1cHl0ZXJsYWIvdGhlbWUtbGlnaHQtZXh0ZW5zaW9uL2luZGV4LmNzcyc7XG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXIoe1xuICAgICAgICAgICAgbmFtZTogJ0p1cHl0ZXJMYWIgTGlnaHQnLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IHRyYW5zLl9fKCdKdXB5dGVyTGFiIExpZ2h0JyksXG4gICAgICAgICAgICBpc0xpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgdGhlbWVTY3JvbGxiYXJzOiBmYWxzZSxcbiAgICAgICAgICAgIGxvYWQ6ICgpID0+IG1hbmFnZXIubG9hZENTUyhzdHlsZSksXG4gICAgICAgICAgICB1bmxvYWQ6ICgpID0+IFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2luO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==