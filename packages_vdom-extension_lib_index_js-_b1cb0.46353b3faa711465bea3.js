(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_vdom-extension_lib_index_js-_b1cb0"],{

/***/ "../../packages/vdom-extension/lib/index.js":
/*!**************************************************!*\
  !*** ../../packages/vdom-extension/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MIME_TYPE": () => (/* binding */ MIME_TYPE),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_vdom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/vdom */ "webpack/sharing/consume/default/@jupyterlab/vdom/@jupyterlab/vdom");
/* harmony import */ var _jupyterlab_vdom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_vdom__WEBPACK_IMPORTED_MODULE_6__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module vdom-extension
 */







/**
 * The MIME type for VDOM.
 */
const MIME_TYPE = 'application/vdom.v1+json';
/**
 * The name of the factory that creates VDOM widgets.
 */
const FACTORY_NAME = 'VDOM';
const plugin = {
    id: '@jupyterlab/vdom-extension:factory',
    requires: [_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__.IRenderMimeRegistry],
    optional: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__.INotebookTracker, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer],
    provides: _jupyterlab_vdom__WEBPACK_IMPORTED_MODULE_6__.IVDOMTracker,
    autoStart: true,
    activate: (app, rendermime, notebooks, restorer) => {
        const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
            namespace: 'vdom-widget'
        });
        // Add a renderer factory to application rendermime registry.
        rendermime.addFactory({
            safe: false,
            mimeTypes: [MIME_TYPE],
            createRenderer: options => new _jupyterlab_vdom__WEBPACK_IMPORTED_MODULE_6__.RenderedVDOM(options)
        }, 0);
        if (notebooks) {
            notebooks.widgetAdded.connect((sender, panel) => {
                // Get the notebook's context and rendermime;
                const { context, content: { rendermime } } = panel;
                // Add the renderer factory to the notebook's rendermime registry;
                rendermime.addFactory({
                    safe: false,
                    mimeTypes: [MIME_TYPE],
                    createRenderer: options => new _jupyterlab_vdom__WEBPACK_IMPORTED_MODULE_6__.RenderedVDOM(options, context)
                }, 0);
            });
        }
        app.docRegistry.addFileType({
            name: 'vdom',
            mimeTypes: [MIME_TYPE],
            extensions: ['.vdom', '.vdom.json'],
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.reactIcon
        });
        const factory = new _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__.MimeDocumentFactory({
            renderTimeout: 1000,
            dataType: 'json',
            rendermime,
            name: FACTORY_NAME,
            primaryFileType: app.docRegistry.getFileType('vdom'),
            fileTypes: ['vdom', 'json'],
            defaultFor: ['vdom']
        });
        factory.widgetCreated.connect((sender, widget) => {
            widget.context.pathChanged.connect(() => {
                void tracker.save(widget);
            });
            void tracker.add(widget);
        });
        // Add widget factory to document registry.
        app.docRegistry.addWidgetFactory(factory);
        if (restorer) {
            // Handle state restoration.
            void restorer.restore(tracker, {
                command: 'docmanager:open',
                args: widget => ({
                    path: widget.context.path,
                    factory: FACTORY_NAME
                }),
                name: widget => widget.context.path
            });
        }
        return tracker;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdmRvbS1leHRlbnNpb24vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEQ7QUFDTDtBQUNTO0FBQ047QUFDSztBQUNQO0FBQ1E7QUFDOUQ7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHVFQUFtQjtBQUNsQyxlQUFlLGtFQUFnQixFQUFFLG9FQUFlO0FBQ2hELGNBQWMsMERBQVk7QUFDMUI7QUFDQTtBQUNBLDRCQUE0QiwrREFBYTtBQUN6QztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQywwREFBWTtBQUN2RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQixhQUFhLEVBQUU7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsMERBQVk7QUFDL0QsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGdFQUFTO0FBQzNCLFNBQVM7QUFDVCw0QkFBNEIsd0VBQW1CO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxNQUFNLEVBQUM7QUFDdEIsaUMiLCJmaWxlIjoicGFja2FnZXNfdmRvbS1leHRlbnNpb25fbGliX2luZGV4X2pzLV9iMWNiMC40NjM1M2IzZmFhNzExNDY1YmVhMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIHZkb20tZXh0ZW5zaW9uXG4gKi9cbmltcG9ydCB7IElMYXlvdXRSZXN0b3JlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IFdpZGdldFRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBNaW1lRG9jdW1lbnRGYWN0b3J5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvZG9jcmVnaXN0cnknO1xuaW1wb3J0IHsgSU5vdGVib29rVHJhY2tlciB9IGZyb20gJ0BqdXB5dGVybGFiL25vdGVib29rJztcbmltcG9ydCB7IElSZW5kZXJNaW1lUmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9yZW5kZXJtaW1lJztcbmltcG9ydCB7IHJlYWN0SWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgSVZET01UcmFja2VyLCBSZW5kZXJlZFZET00gfSBmcm9tICdAanVweXRlcmxhYi92ZG9tJztcbi8qKlxuICogVGhlIE1JTUUgdHlwZSBmb3IgVkRPTS5cbiAqL1xuZXhwb3J0IGNvbnN0IE1JTUVfVFlQRSA9ICdhcHBsaWNhdGlvbi92ZG9tLnYxK2pzb24nO1xuLyoqXG4gKiBUaGUgbmFtZSBvZiB0aGUgZmFjdG9yeSB0aGF0IGNyZWF0ZXMgVkRPTSB3aWRnZXRzLlxuICovXG5jb25zdCBGQUNUT1JZX05BTUUgPSAnVkRPTSc7XG5jb25zdCBwbHVnaW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi92ZG9tLWV4dGVuc2lvbjpmYWN0b3J5JyxcbiAgICByZXF1aXJlczogW0lSZW5kZXJNaW1lUmVnaXN0cnldLFxuICAgIG9wdGlvbmFsOiBbSU5vdGVib29rVHJhY2tlciwgSUxheW91dFJlc3RvcmVyXSxcbiAgICBwcm92aWRlczogSVZET01UcmFja2VyLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgcmVuZGVybWltZSwgbm90ZWJvb2tzLCByZXN0b3JlcikgPT4ge1xuICAgICAgICBjb25zdCB0cmFja2VyID0gbmV3IFdpZGdldFRyYWNrZXIoe1xuICAgICAgICAgICAgbmFtZXNwYWNlOiAndmRvbS13aWRnZXQnXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBZGQgYSByZW5kZXJlciBmYWN0b3J5IHRvIGFwcGxpY2F0aW9uIHJlbmRlcm1pbWUgcmVnaXN0cnkuXG4gICAgICAgIHJlbmRlcm1pbWUuYWRkRmFjdG9yeSh7XG4gICAgICAgICAgICBzYWZlOiBmYWxzZSxcbiAgICAgICAgICAgIG1pbWVUeXBlczogW01JTUVfVFlQRV0sXG4gICAgICAgICAgICBjcmVhdGVSZW5kZXJlcjogb3B0aW9ucyA9PiBuZXcgUmVuZGVyZWRWRE9NKG9wdGlvbnMpXG4gICAgICAgIH0sIDApO1xuICAgICAgICBpZiAobm90ZWJvb2tzKSB7XG4gICAgICAgICAgICBub3RlYm9va3Mud2lkZ2V0QWRkZWQuY29ubmVjdCgoc2VuZGVyLCBwYW5lbCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgbm90ZWJvb2sncyBjb250ZXh0IGFuZCByZW5kZXJtaW1lO1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29udGV4dCwgY29udGVudDogeyByZW5kZXJtaW1lIH0gfSA9IHBhbmVsO1xuICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgcmVuZGVyZXIgZmFjdG9yeSB0byB0aGUgbm90ZWJvb2sncyByZW5kZXJtaW1lIHJlZ2lzdHJ5O1xuICAgICAgICAgICAgICAgIHJlbmRlcm1pbWUuYWRkRmFjdG9yeSh7XG4gICAgICAgICAgICAgICAgICAgIHNhZmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBtaW1lVHlwZXM6IFtNSU1FX1RZUEVdLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVSZW5kZXJlcjogb3B0aW9ucyA9PiBuZXcgUmVuZGVyZWRWRE9NKG9wdGlvbnMsIGNvbnRleHQpXG4gICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBhcHAuZG9jUmVnaXN0cnkuYWRkRmlsZVR5cGUoe1xuICAgICAgICAgICAgbmFtZTogJ3Zkb20nLFxuICAgICAgICAgICAgbWltZVR5cGVzOiBbTUlNRV9UWVBFXSxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IFsnLnZkb20nLCAnLnZkb20uanNvbiddLFxuICAgICAgICAgICAgaWNvbjogcmVhY3RJY29uXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gbmV3IE1pbWVEb2N1bWVudEZhY3Rvcnkoe1xuICAgICAgICAgICAgcmVuZGVyVGltZW91dDogMTAwMCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICByZW5kZXJtaW1lLFxuICAgICAgICAgICAgbmFtZTogRkFDVE9SWV9OQU1FLFxuICAgICAgICAgICAgcHJpbWFyeUZpbGVUeXBlOiBhcHAuZG9jUmVnaXN0cnkuZ2V0RmlsZVR5cGUoJ3Zkb20nKSxcbiAgICAgICAgICAgIGZpbGVUeXBlczogWyd2ZG9tJywgJ2pzb24nXSxcbiAgICAgICAgICAgIGRlZmF1bHRGb3I6IFsndmRvbSddXG4gICAgICAgIH0pO1xuICAgICAgICBmYWN0b3J5LndpZGdldENyZWF0ZWQuY29ubmVjdCgoc2VuZGVyLCB3aWRnZXQpID0+IHtcbiAgICAgICAgICAgIHdpZGdldC5jb250ZXh0LnBhdGhDaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZvaWQgdHJhY2tlci5zYXZlKHdpZGdldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZvaWQgdHJhY2tlci5hZGQod2lkZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCB3aWRnZXQgZmFjdG9yeSB0byBkb2N1bWVudCByZWdpc3RyeS5cbiAgICAgICAgYXBwLmRvY1JlZ2lzdHJ5LmFkZFdpZGdldEZhY3RvcnkoZmFjdG9yeSk7XG4gICAgICAgIGlmIChyZXN0b3Jlcikge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHN0YXRlIHJlc3RvcmF0aW9uLlxuICAgICAgICAgICAgdm9pZCByZXN0b3Jlci5yZXN0b3JlKHRyYWNrZXIsIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnZG9jbWFuYWdlcjpvcGVuJyxcbiAgICAgICAgICAgICAgICBhcmdzOiB3aWRnZXQgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogd2lkZ2V0LmNvbnRleHQucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yeTogRkFDVE9SWV9OQU1FXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbmFtZTogd2lkZ2V0ID0+IHdpZGdldC5jb250ZXh0LnBhdGhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFja2VyO1xuICAgIH1cbn07XG5leHBvcnQgZGVmYXVsdCBwbHVnaW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9