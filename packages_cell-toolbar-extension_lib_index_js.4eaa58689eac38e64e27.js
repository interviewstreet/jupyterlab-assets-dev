(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_cell-toolbar-extension_lib_index_js"],{

/***/ "../../packages/cell-toolbar-extension/lib/index.js":
/*!**********************************************************!*\
  !*** ../../packages/cell-toolbar-extension/lib/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_cell_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/cell-toolbar */ "webpack/sharing/consume/default/@jupyterlab/cell-toolbar/@jupyterlab/cell-toolbar");
/* harmony import */ var _jupyterlab_cell_toolbar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cell_toolbar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module cell-toolbar-extension
 */




const cellToolbar = {
    id: '@jupyterlab/cell-toolbar-extension:plugin',
    autoStart: true,
    activate: async (app, settingRegistry, toolbarRegistry, translator) => {
        const toolbarItems = settingRegistry && toolbarRegistry
            ? (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.createToolbarFactory)(toolbarRegistry, settingRegistry, _jupyterlab_cell_toolbar__WEBPACK_IMPORTED_MODULE_1__.CellBarExtension.FACTORY_NAME, cellToolbar.id, translator !== null && translator !== void 0 ? translator : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator)
            : undefined;
        app.docRegistry.addWidgetExtension('Notebook', new _jupyterlab_cell_toolbar__WEBPACK_IMPORTED_MODULE_1__.CellBarExtension(app.commands, toolbarItems));
    },
    optional: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_0__.ISettingRegistry, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_2__.IToolbarWidgetRegistry, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.ITranslator]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cellToolbar);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY2VsbC10b29sYmFyLWV4dGVuc2lvbi9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMrRDtBQUNIO0FBQ3dCO0FBQ2Q7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsMEVBQW9CLG1DQUFtQyxtRkFBNkIsOEVBQThFLG1FQUFjO0FBQzlMO0FBQ0EsMkRBQTJELHNFQUFnQjtBQUMzRSxLQUFLO0FBQ0wsZUFBZSx5RUFBZ0IsRUFBRSx3RUFBc0IsRUFBRSxnRUFBVztBQUNwRTtBQUNBLGlFQUFlLFdBQVcsRUFBQztBQUMzQixpQyIsImZpbGUiOiJwYWNrYWdlc19jZWxsLXRvb2xiYXItZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy40ZWFhNTg2ODllYWMzOGU2NGUyNy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgY2VsbC10b29sYmFyLWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBJU2V0dGluZ1JlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2V0dGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7IENlbGxCYXJFeHRlbnNpb24gfSBmcm9tICdAanVweXRlcmxhYi9jZWxsLXRvb2xiYXInO1xuaW1wb3J0IHsgY3JlYXRlVG9vbGJhckZhY3RvcnksIElUb29sYmFyV2lkZ2V0UmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciwgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5jb25zdCBjZWxsVG9vbGJhciA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2NlbGwtdG9vbGJhci1leHRlbnNpb246cGx1Z2luJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgYWN0aXZhdGU6IGFzeW5jIChhcHAsIHNldHRpbmdSZWdpc3RyeSwgdG9vbGJhclJlZ2lzdHJ5LCB0cmFuc2xhdG9yKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvb2xiYXJJdGVtcyA9IHNldHRpbmdSZWdpc3RyeSAmJiB0b29sYmFyUmVnaXN0cnlcbiAgICAgICAgICAgID8gY3JlYXRlVG9vbGJhckZhY3RvcnkodG9vbGJhclJlZ2lzdHJ5LCBzZXR0aW5nUmVnaXN0cnksIENlbGxCYXJFeHRlbnNpb24uRkFDVE9SWV9OQU1FLCBjZWxsVG9vbGJhci5pZCwgdHJhbnNsYXRvciAhPT0gbnVsbCAmJiB0cmFuc2xhdG9yICE9PSB2b2lkIDAgPyB0cmFuc2xhdG9yIDogbnVsbFRyYW5zbGF0b3IpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgYXBwLmRvY1JlZ2lzdHJ5LmFkZFdpZGdldEV4dGVuc2lvbignTm90ZWJvb2snLCBuZXcgQ2VsbEJhckV4dGVuc2lvbihhcHAuY29tbWFuZHMsIHRvb2xiYXJJdGVtcykpO1xuICAgIH0sXG4gICAgb3B0aW9uYWw6IFtJU2V0dGluZ1JlZ2lzdHJ5LCBJVG9vbGJhcldpZGdldFJlZ2lzdHJ5LCBJVHJhbnNsYXRvcl1cbn07XG5leHBvcnQgZGVmYXVsdCBjZWxsVG9vbGJhcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=