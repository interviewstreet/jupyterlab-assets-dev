(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_theme-dark-extension_lib_index_js"],{

/***/ "../../packages/theme-dark-extension/lib/index.js":
/*!********************************************************!*\
  !*** ../../packages/theme-dark-extension/lib/index.js ***!
  \********************************************************/
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
 * @module theme-dark-extension
 */


/**
 * A plugin for the Jupyter Dark Theme.
 */
const plugin = {
    id: '@jupyterlab/theme-dark-extension:plugin',
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.IThemeManager, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.ITranslator],
    activate: (app, manager, translator) => {
        const trans = translator.load('jupyterlab');
        const style = '@jupyterlab/theme-dark-extension/index.css';
        manager.register({
            name: 'JupyterLab Dark',
            displayName: trans.__('JupyterLab Dark'),
            isLight: false,
            themeScrollbars: true,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdGhlbWUtZGFyay1leHRlbnNpb24vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3FEO0FBQ0M7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsK0RBQWEsRUFBRSxnRUFBVztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLGlFQUFlLE1BQU0sRUFBQztBQUN0QixpQyIsImZpbGUiOiJwYWNrYWdlc190aGVtZS1kYXJrLWV4dGVuc2lvbl9saWJfaW5kZXhfanMuN2Q1MGYxOTk2NjAzYWYxNTBmZmEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSB0aGVtZS1kYXJrLWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBJVGhlbWVNYW5hZ2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgSVRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG4vKipcbiAqIEEgcGx1Z2luIGZvciB0aGUgSnVweXRlciBEYXJrIFRoZW1lLlxuICovXG5jb25zdCBwbHVnaW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi90aGVtZS1kYXJrLWV4dGVuc2lvbjpwbHVnaW4nLFxuICAgIHJlcXVpcmVzOiBbSVRoZW1lTWFuYWdlciwgSVRyYW5zbGF0b3JdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBtYW5hZ2VyLCB0cmFuc2xhdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gJ0BqdXB5dGVybGFiL3RoZW1lLWRhcmstZXh0ZW5zaW9uL2luZGV4LmNzcyc7XG4gICAgICAgIG1hbmFnZXIucmVnaXN0ZXIoe1xuICAgICAgICAgICAgbmFtZTogJ0p1cHl0ZXJMYWIgRGFyaycsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJhbnMuX18oJ0p1cHl0ZXJMYWIgRGFyaycpLFxuICAgICAgICAgICAgaXNMaWdodDogZmFsc2UsXG4gICAgICAgICAgICB0aGVtZVNjcm9sbGJhcnM6IHRydWUsXG4gICAgICAgICAgICBsb2FkOiAoKSA9PiBtYW5hZ2VyLmxvYWRDU1Moc3R5bGUpLFxuICAgICAgICAgICAgdW5sb2FkOiAoKSA9PiBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGF1dG9TdGFydDogdHJ1ZVxufTtcbmV4cG9ydCBkZWZhdWx0IHBsdWdpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=