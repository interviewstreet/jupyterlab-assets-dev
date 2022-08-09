(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_rendermime-extension_lib_index_js"],{

/***/ "../../packages/rendermime-extension/lib/index.js":
/*!********************************************************!*\
  !*** ../../packages/rendermime-extension/lib/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docmanager */ "webpack/sharing/consume/default/@jupyterlab/docmanager/@jupyterlab/docmanager");
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module rendermime-extension
 */




var CommandIDs;
(function (CommandIDs) {
    CommandIDs.handleLink = 'rendermime:handle-local-link';
})(CommandIDs || (CommandIDs = {}));
/**
 * A plugin providing a rendermime registry.
 */
const plugin = {
    id: '@jupyterlab/rendermime-extension:plugin',
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.ITranslator],
    optional: [_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_1__.IDocumentManager, _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__.ILatexTypesetter, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ISanitizer],
    provides: _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__.IRenderMimeRegistry,
    activate: activate,
    autoStart: true
};
/**
 * Export the plugin as default.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
/**
 * Activate the rendermine plugin.
 */
function activate(app, translator, docManager, latexTypesetter, sanitizer) {
    const trans = translator.load('jupyterlab');
    if (docManager) {
        app.commands.addCommand(CommandIDs.handleLink, {
            label: trans.__('Handle Local Link'),
            execute: args => {
                const path = args['path'];
                const id = args['id'];
                if (!path) {
                    return;
                }
                // First check if the path exists on the server.
                return docManager.services.contents
                    .get(path, { content: false })
                    .then(() => {
                    // Open the link with the default rendered widget factory,
                    // if applicable.
                    const factory = docManager.registry.defaultRenderedWidgetFactory(path);
                    const widget = docManager.openOrReveal(path, factory.name);
                    // Handle the hash if one has been provided.
                    if (widget && id) {
                        widget.setFragment(id);
                    }
                });
            }
        });
    }
    return new _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__.RenderMimeRegistry({
        initialFactories: _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__.standardRendererFactories,
        linkHandler: !docManager
            ? undefined
            : {
                handleLink: (node, path, id) => {
                    // If node has the download attribute explicitly set, use the
                    // default browser downloading behavior.
                    if (node.tagName === 'A' && node.hasAttribute('download')) {
                        return;
                    }
                    app.commandLinker.connectNode(node, CommandIDs.handleLink, {
                        path,
                        id
                    });
                }
            },
        latexTypesetter: latexTypesetter !== null && latexTypesetter !== void 0 ? latexTypesetter : undefined,
        translator: translator,
        sanitizer: sanitizer !== null && sanitizer !== void 0 ? sanitizer : undefined
    });
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvcmVuZGVybWltZS1leHRlbnNpb24vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDa0Q7QUFDUTtBQUNvRTtBQUN4RTtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnRUFBVztBQUMxQixlQUFlLG9FQUFnQixFQUFFLG9FQUFnQixFQUFFLDREQUFVO0FBQzdELGNBQWMsdUVBQW1CO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLE1BQU0sRUFBQztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxpQkFBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsZUFBZSxzRUFBa0I7QUFDakMsMEJBQTBCLDZFQUF5QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsaUMiLCJmaWxlIjoicGFja2FnZXNfcmVuZGVybWltZS1leHRlbnNpb25fbGliX2luZGV4X2pzLjg1NTZlZDg0ZDFkOWM5MThjZDZhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSByZW5kZXJtaW1lLWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBJU2FuaXRpemVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgSURvY3VtZW50TWFuYWdlciB9IGZyb20gJ0BqdXB5dGVybGFiL2RvY21hbmFnZXInO1xuaW1wb3J0IHsgSUxhdGV4VHlwZXNldHRlciwgSVJlbmRlck1pbWVSZWdpc3RyeSwgUmVuZGVyTWltZVJlZ2lzdHJ5LCBzdGFuZGFyZFJlbmRlcmVyRmFjdG9yaWVzIH0gZnJvbSAnQGp1cHl0ZXJsYWIvcmVuZGVybWltZSc7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbnZhciBDb21tYW5kSURzO1xuKGZ1bmN0aW9uIChDb21tYW5kSURzKSB7XG4gICAgQ29tbWFuZElEcy5oYW5kbGVMaW5rID0gJ3JlbmRlcm1pbWU6aGFuZGxlLWxvY2FsLWxpbmsnO1xufSkoQ29tbWFuZElEcyB8fCAoQ29tbWFuZElEcyA9IHt9KSk7XG4vKipcbiAqIEEgcGx1Z2luIHByb3ZpZGluZyBhIHJlbmRlcm1pbWUgcmVnaXN0cnkuXG4gKi9cbmNvbnN0IHBsdWdpbiA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWUtZXh0ZW5zaW9uOnBsdWdpbicsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJRG9jdW1lbnRNYW5hZ2VyLCBJTGF0ZXhUeXBlc2V0dGVyLCBJU2FuaXRpemVyXSxcbiAgICBwcm92aWRlczogSVJlbmRlck1pbWVSZWdpc3RyeSxcbiAgICBhY3RpdmF0ZTogYWN0aXZhdGUsXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLyoqXG4gKiBFeHBvcnQgdGhlIHBsdWdpbiBhcyBkZWZhdWx0LlxuICovXG5leHBvcnQgZGVmYXVsdCBwbHVnaW47XG4vKipcbiAqIEFjdGl2YXRlIHRoZSByZW5kZXJtaW5lIHBsdWdpbi5cbiAqL1xuZnVuY3Rpb24gYWN0aXZhdGUoYXBwLCB0cmFuc2xhdG9yLCBkb2NNYW5hZ2VyLCBsYXRleFR5cGVzZXR0ZXIsIHNhbml0aXplcikge1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgaWYgKGRvY01hbmFnZXIpIHtcbiAgICAgICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5oYW5kbGVMaW5rLCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0hhbmRsZSBMb2NhbCBMaW5rJyksXG4gICAgICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gYXJnc1sncGF0aCddO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gYXJnc1snaWQnXTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBGaXJzdCBjaGVjayBpZiB0aGUgcGF0aCBleGlzdHMgb24gdGhlIHNlcnZlci5cbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jTWFuYWdlci5zZXJ2aWNlcy5jb250ZW50c1xuICAgICAgICAgICAgICAgICAgICAuZ2V0KHBhdGgsIHsgY29udGVudDogZmFsc2UgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBPcGVuIHRoZSBsaW5rIHdpdGggdGhlIGRlZmF1bHQgcmVuZGVyZWQgd2lkZ2V0IGZhY3RvcnksXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGFwcGxpY2FibGUuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZhY3RvcnkgPSBkb2NNYW5hZ2VyLnJlZ2lzdHJ5LmRlZmF1bHRSZW5kZXJlZFdpZGdldEZhY3RvcnkocGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IGRvY01hbmFnZXIub3Blbk9yUmV2ZWFsKHBhdGgsIGZhY3RvcnkubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgaGFzaCBpZiBvbmUgaGFzIGJlZW4gcHJvdmlkZWQuXG4gICAgICAgICAgICAgICAgICAgIGlmICh3aWRnZXQgJiYgaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5zZXRGcmFnbWVudChpZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmVuZGVyTWltZVJlZ2lzdHJ5KHtcbiAgICAgICAgaW5pdGlhbEZhY3Rvcmllczogc3RhbmRhcmRSZW5kZXJlckZhY3RvcmllcyxcbiAgICAgICAgbGlua0hhbmRsZXI6ICFkb2NNYW5hZ2VyXG4gICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgaGFuZGxlTGluazogKG5vZGUsIHBhdGgsIGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIG5vZGUgaGFzIHRoZSBkb3dubG9hZCBhdHRyaWJ1dGUgZXhwbGljaXRseSBzZXQsIHVzZSB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmYXVsdCBicm93c2VyIGRvd25sb2FkaW5nIGJlaGF2aW9yLlxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS50YWdOYW1lID09PSAnQScgJiYgbm9kZS5oYXNBdHRyaWJ1dGUoJ2Rvd25sb2FkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcHAuY29tbWFuZExpbmtlci5jb25uZWN0Tm9kZShub2RlLCBDb21tYW5kSURzLmhhbmRsZUxpbmssIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICBsYXRleFR5cGVzZXR0ZXI6IGxhdGV4VHlwZXNldHRlciAhPT0gbnVsbCAmJiBsYXRleFR5cGVzZXR0ZXIgIT09IHZvaWQgMCA/IGxhdGV4VHlwZXNldHRlciA6IHVuZGVmaW5lZCxcbiAgICAgICAgdHJhbnNsYXRvcjogdHJhbnNsYXRvcixcbiAgICAgICAgc2FuaXRpemVyOiBzYW5pdGl6ZXIgIT09IG51bGwgJiYgc2FuaXRpemVyICE9PSB2b2lkIDAgPyBzYW5pdGl6ZXIgOiB1bmRlZmluZWRcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=