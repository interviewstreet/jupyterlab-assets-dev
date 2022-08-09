(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_htmlviewer-extension_lib_index_js-_8f040"],{

/***/ "../../packages/htmlviewer-extension/lib/index.js":
/*!********************************************************!*\
  !*** ../../packages/htmlviewer-extension/lib/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_htmlviewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/htmlviewer */ "webpack/sharing/consume/default/@jupyterlab/htmlviewer/@jupyterlab/htmlviewer");
/* harmony import */ var _jupyterlab_htmlviewer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_htmlviewer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module htmlviewer-extension
 */






/**
 * Factory name
 */
const FACTORY = 'HTML Viewer';
/**
 * Command IDs used by the plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.trustHTML = 'htmlviewer:trust-html';
})(CommandIDs || (CommandIDs = {}));
/**
 * The HTML file handler extension.
 */
const htmlPlugin = {
    activate: activateHTMLViewer,
    id: '@jupyterlab/htmlviewer-extension:plugin',
    provides: _jupyterlab_htmlviewer__WEBPACK_IMPORTED_MODULE_2__.IHTMLViewerTracker,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.ITranslator],
    optional: [
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__.ISettingRegistry,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IToolbarWidgetRegistry
    ],
    autoStart: true
};
/**
 * Activate the HTMLViewer extension.
 */
function activateHTMLViewer(app, translator, palette, restorer, settingRegistry, toolbarRegistry) {
    let toolbarFactory;
    const trans = translator.load('jupyterlab');
    if (toolbarRegistry) {
        toolbarRegistry.registerFactory(FACTORY, 'refresh', widget => _jupyterlab_htmlviewer__WEBPACK_IMPORTED_MODULE_2__.ToolbarItems.createRefreshButton(widget, translator));
        toolbarRegistry.registerFactory(FACTORY, 'trust', widget => _jupyterlab_htmlviewer__WEBPACK_IMPORTED_MODULE_2__.ToolbarItems.createTrustButton(widget, translator));
        if (settingRegistry) {
            toolbarFactory = (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.createToolbarFactory)(toolbarRegistry, settingRegistry, FACTORY, htmlPlugin.id, translator);
        }
    }
    // Add an HTML file type to the docregistry.
    const ft = {
        name: 'html',
        contentType: 'file',
        fileFormat: 'text',
        displayName: trans.__('HTML File'),
        extensions: ['.html'],
        mimeTypes: ['text/html'],
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.html5Icon
    };
    app.docRegistry.addFileType(ft);
    // Create a new viewer factory.
    const factory = new _jupyterlab_htmlviewer__WEBPACK_IMPORTED_MODULE_2__.HTMLViewerFactory({
        name: FACTORY,
        fileTypes: ['html'],
        defaultFor: ['html'],
        readOnly: true,
        toolbarFactory,
        translator
    });
    // Create a widget tracker for HTML documents.
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace: 'htmlviewer'
    });
    // Handle state restoration.
    if (restorer) {
        void restorer.restore(tracker, {
            command: 'docmanager:open',
            args: widget => ({ path: widget.context.path, factory: 'HTML Viewer' }),
            name: widget => widget.context.path
        });
    }
    app.docRegistry.addWidgetFactory(factory);
    factory.widgetCreated.connect((sender, widget) => {
        var _a, _b;
        // Track the widget.
        void tracker.add(widget);
        // Notify the widget tracker if restore data needs to update.
        widget.context.pathChanged.connect(() => {
            void tracker.save(widget);
        });
        // Notify the application when the trust state changes so it
        // can update any renderings of the trust command.
        widget.trustedChanged.connect(() => {
            app.commands.notifyCommandChanged(CommandIDs.trustHTML);
        });
        widget.title.icon = ft.icon;
        widget.title.iconClass = (_a = ft.iconClass) !== null && _a !== void 0 ? _a : '';
        widget.title.iconLabel = (_b = ft.iconLabel) !== null && _b !== void 0 ? _b : '';
    });
    // Add a command to trust the active HTML document,
    // allowing script executions in its context.
    app.commands.addCommand(CommandIDs.trustHTML, {
        label: trans.__('Trust HTML File'),
        caption: trans.__(`Whether the HTML file is trusted.
    Trusting the file allows scripts to run in it,
    which may result in security risks.
    Only enable for files you trust.`),
        isEnabled: () => !!tracker.currentWidget,
        isToggled: () => {
            const current = tracker.currentWidget;
            if (!current) {
                return false;
            }
            const sandbox = current.content.sandbox;
            return sandbox.indexOf('allow-scripts') !== -1;
        },
        execute: () => {
            const current = tracker.currentWidget;
            if (!current) {
                return false;
            }
            current.trusted = !current.trusted;
        }
    });
    if (palette) {
        palette.addItem({
            command: CommandIDs.trustHTML,
            category: trans.__('File Operations')
        });
    }
    return tracker;
}
/**
 * Export the plugins as default.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (htmlPlugin);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvaHRtbHZpZXdlci1leHRlbnNpb24vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBEO0FBQzBEO0FBQ3ZCO0FBQzlCO0FBQ1Q7QUFDQTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsc0VBQWtCO0FBQ2hDLGVBQWUsZ0VBQVc7QUFDMUI7QUFDQSxRQUFRLGlFQUFlO0FBQ3ZCLFFBQVEsb0VBQWU7QUFDdkIsUUFBUSx5RUFBZ0I7QUFDeEIsUUFBUSx3RUFBc0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0Usb0ZBQWdDO0FBQ3RHLG9FQUFvRSxrRkFBOEI7QUFDbEc7QUFDQSw2QkFBNkIsMEVBQW9CO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IscUVBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdCQUF3QiwrREFBYTtBQUNyQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixvREFBb0Q7QUFDbEY7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxVQUFVLEVBQUM7QUFDMUIsaUMiLCJmaWxlIjoicGFja2FnZXNfaHRtbHZpZXdlci1leHRlbnNpb25fbGliX2luZGV4X2pzLV84ZjA0MC5mMjIyYTA5NWY4NmNkZGQwZTI5Zi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxufCBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgaHRtbHZpZXdlci1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxheW91dFJlc3RvcmVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgY3JlYXRlVG9vbGJhckZhY3RvcnksIElDb21tYW5kUGFsZXR0ZSwgSVRvb2xiYXJXaWRnZXRSZWdpc3RyeSwgV2lkZ2V0VHJhY2tlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IEhUTUxWaWV3ZXJGYWN0b3J5LCBJSFRNTFZpZXdlclRyYWNrZXIsIFRvb2xiYXJJdGVtcyB9IGZyb20gJ0BqdXB5dGVybGFiL2h0bWx2aWV3ZXInO1xuaW1wb3J0IHsgSVNldHRpbmdSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3NldHRpbmdyZWdpc3RyeSc7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGh0bWw1SWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuLyoqXG4gKiBGYWN0b3J5IG5hbWVcbiAqL1xuY29uc3QgRkFDVE9SWSA9ICdIVE1MIFZpZXdlcic7XG4vKipcbiAqIENvbW1hbmQgSURzIHVzZWQgYnkgdGhlIHBsdWdpbi5cbiAqL1xudmFyIENvbW1hbmRJRHM7XG4oZnVuY3Rpb24gKENvbW1hbmRJRHMpIHtcbiAgICBDb21tYW5kSURzLnRydXN0SFRNTCA9ICdodG1sdmlld2VyOnRydXN0LWh0bWwnO1xufSkoQ29tbWFuZElEcyB8fCAoQ29tbWFuZElEcyA9IHt9KSk7XG4vKipcbiAqIFRoZSBIVE1MIGZpbGUgaGFuZGxlciBleHRlbnNpb24uXG4gKi9cbmNvbnN0IGh0bWxQbHVnaW4gPSB7XG4gICAgYWN0aXZhdGU6IGFjdGl2YXRlSFRNTFZpZXdlcixcbiAgICBpZDogJ0BqdXB5dGVybGFiL2h0bWx2aWV3ZXItZXh0ZW5zaW9uOnBsdWdpbicsXG4gICAgcHJvdmlkZXM6IElIVE1MVmlld2VyVHJhY2tlcixcbiAgICByZXF1aXJlczogW0lUcmFuc2xhdG9yXSxcbiAgICBvcHRpb25hbDogW1xuICAgICAgICBJQ29tbWFuZFBhbGV0dGUsXG4gICAgICAgIElMYXlvdXRSZXN0b3JlcixcbiAgICAgICAgSVNldHRpbmdSZWdpc3RyeSxcbiAgICAgICAgSVRvb2xiYXJXaWRnZXRSZWdpc3RyeVxuICAgIF0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLyoqXG4gKiBBY3RpdmF0ZSB0aGUgSFRNTFZpZXdlciBleHRlbnNpb24uXG4gKi9cbmZ1bmN0aW9uIGFjdGl2YXRlSFRNTFZpZXdlcihhcHAsIHRyYW5zbGF0b3IsIHBhbGV0dGUsIHJlc3RvcmVyLCBzZXR0aW5nUmVnaXN0cnksIHRvb2xiYXJSZWdpc3RyeSkge1xuICAgIGxldCB0b29sYmFyRmFjdG9yeTtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGlmICh0b29sYmFyUmVnaXN0cnkpIHtcbiAgICAgICAgdG9vbGJhclJlZ2lzdHJ5LnJlZ2lzdGVyRmFjdG9yeShGQUNUT1JZLCAncmVmcmVzaCcsIHdpZGdldCA9PiBUb29sYmFySXRlbXMuY3JlYXRlUmVmcmVzaEJ1dHRvbih3aWRnZXQsIHRyYW5zbGF0b3IpKTtcbiAgICAgICAgdG9vbGJhclJlZ2lzdHJ5LnJlZ2lzdGVyRmFjdG9yeShGQUNUT1JZLCAndHJ1c3QnLCB3aWRnZXQgPT4gVG9vbGJhckl0ZW1zLmNyZWF0ZVRydXN0QnV0dG9uKHdpZGdldCwgdHJhbnNsYXRvcikpO1xuICAgICAgICBpZiAoc2V0dGluZ1JlZ2lzdHJ5KSB7XG4gICAgICAgICAgICB0b29sYmFyRmFjdG9yeSA9IGNyZWF0ZVRvb2xiYXJGYWN0b3J5KHRvb2xiYXJSZWdpc3RyeSwgc2V0dGluZ1JlZ2lzdHJ5LCBGQUNUT1JZLCBodG1sUGx1Z2luLmlkLCB0cmFuc2xhdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBBZGQgYW4gSFRNTCBmaWxlIHR5cGUgdG8gdGhlIGRvY3JlZ2lzdHJ5LlxuICAgIGNvbnN0IGZ0ID0ge1xuICAgICAgICBuYW1lOiAnaHRtbCcsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnZmlsZScsXG4gICAgICAgIGZpbGVGb3JtYXQ6ICd0ZXh0JyxcbiAgICAgICAgZGlzcGxheU5hbWU6IHRyYW5zLl9fKCdIVE1MIEZpbGUnKSxcbiAgICAgICAgZXh0ZW5zaW9uczogWycuaHRtbCddLFxuICAgICAgICBtaW1lVHlwZXM6IFsndGV4dC9odG1sJ10sXG4gICAgICAgIGljb246IGh0bWw1SWNvblxuICAgIH07XG4gICAgYXBwLmRvY1JlZ2lzdHJ5LmFkZEZpbGVUeXBlKGZ0KTtcbiAgICAvLyBDcmVhdGUgYSBuZXcgdmlld2VyIGZhY3RvcnkuXG4gICAgY29uc3QgZmFjdG9yeSA9IG5ldyBIVE1MVmlld2VyRmFjdG9yeSh7XG4gICAgICAgIG5hbWU6IEZBQ1RPUlksXG4gICAgICAgIGZpbGVUeXBlczogWydodG1sJ10sXG4gICAgICAgIGRlZmF1bHRGb3I6IFsnaHRtbCddLFxuICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgdG9vbGJhckZhY3RvcnksXG4gICAgICAgIHRyYW5zbGF0b3JcbiAgICB9KTtcbiAgICAvLyBDcmVhdGUgYSB3aWRnZXQgdHJhY2tlciBmb3IgSFRNTCBkb2N1bWVudHMuXG4gICAgY29uc3QgdHJhY2tlciA9IG5ldyBXaWRnZXRUcmFja2VyKHtcbiAgICAgICAgbmFtZXNwYWNlOiAnaHRtbHZpZXdlcidcbiAgICB9KTtcbiAgICAvLyBIYW5kbGUgc3RhdGUgcmVzdG9yYXRpb24uXG4gICAgaWYgKHJlc3RvcmVyKSB7XG4gICAgICAgIHZvaWQgcmVzdG9yZXIucmVzdG9yZSh0cmFja2VyLCB7XG4gICAgICAgICAgICBjb21tYW5kOiAnZG9jbWFuYWdlcjpvcGVuJyxcbiAgICAgICAgICAgIGFyZ3M6IHdpZGdldCA9PiAoeyBwYXRoOiB3aWRnZXQuY29udGV4dC5wYXRoLCBmYWN0b3J5OiAnSFRNTCBWaWV3ZXInIH0pLFxuICAgICAgICAgICAgbmFtZTogd2lkZ2V0ID0+IHdpZGdldC5jb250ZXh0LnBhdGhcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFwcC5kb2NSZWdpc3RyeS5hZGRXaWRnZXRGYWN0b3J5KGZhY3RvcnkpO1xuICAgIGZhY3Rvcnkud2lkZ2V0Q3JlYXRlZC5jb25uZWN0KChzZW5kZXIsIHdpZGdldCkgPT4ge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAvLyBUcmFjayB0aGUgd2lkZ2V0LlxuICAgICAgICB2b2lkIHRyYWNrZXIuYWRkKHdpZGdldCk7XG4gICAgICAgIC8vIE5vdGlmeSB0aGUgd2lkZ2V0IHRyYWNrZXIgaWYgcmVzdG9yZSBkYXRhIG5lZWRzIHRvIHVwZGF0ZS5cbiAgICAgICAgd2lkZ2V0LmNvbnRleHQucGF0aENoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICB2b2lkIHRyYWNrZXIuc2F2ZSh3aWRnZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gTm90aWZ5IHRoZSBhcHBsaWNhdGlvbiB3aGVuIHRoZSB0cnVzdCBzdGF0ZSBjaGFuZ2VzIHNvIGl0XG4gICAgICAgIC8vIGNhbiB1cGRhdGUgYW55IHJlbmRlcmluZ3Mgb2YgdGhlIHRydXN0IGNvbW1hbmQuXG4gICAgICAgIHdpZGdldC50cnVzdGVkQ2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGFwcC5jb21tYW5kcy5ub3RpZnlDb21tYW5kQ2hhbmdlZChDb21tYW5kSURzLnRydXN0SFRNTCk7XG4gICAgICAgIH0pO1xuICAgICAgICB3aWRnZXQudGl0bGUuaWNvbiA9IGZ0Lmljb247XG4gICAgICAgIHdpZGdldC50aXRsZS5pY29uQ2xhc3MgPSAoX2EgPSBmdC5pY29uQ2xhc3MpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICcnO1xuICAgICAgICB3aWRnZXQudGl0bGUuaWNvbkxhYmVsID0gKF9iID0gZnQuaWNvbkxhYmVsKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAnJztcbiAgICB9KTtcbiAgICAvLyBBZGQgYSBjb21tYW5kIHRvIHRydXN0IHRoZSBhY3RpdmUgSFRNTCBkb2N1bWVudCxcbiAgICAvLyBhbGxvd2luZyBzY3JpcHQgZXhlY3V0aW9ucyBpbiBpdHMgY29udGV4dC5cbiAgICBhcHAuY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnRydXN0SFRNTCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1RydXN0IEhUTUwgRmlsZScpLFxuICAgICAgICBjYXB0aW9uOiB0cmFucy5fXyhgV2hldGhlciB0aGUgSFRNTCBmaWxlIGlzIHRydXN0ZWQuXG4gICAgVHJ1c3RpbmcgdGhlIGZpbGUgYWxsb3dzIHNjcmlwdHMgdG8gcnVuIGluIGl0LFxuICAgIHdoaWNoIG1heSByZXN1bHQgaW4gc2VjdXJpdHkgcmlza3MuXG4gICAgT25seSBlbmFibGUgZm9yIGZpbGVzIHlvdSB0cnVzdC5gKSxcbiAgICAgICAgaXNFbmFibGVkOiAoKSA9PiAhIXRyYWNrZXIuY3VycmVudFdpZGdldCxcbiAgICAgICAgaXNUb2dnbGVkOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2FuZGJveCA9IGN1cnJlbnQuY29udGVudC5zYW5kYm94O1xuICAgICAgICAgICAgcmV0dXJuIHNhbmRib3guaW5kZXhPZignYWxsb3ctc2NyaXB0cycpICE9PSAtMTtcbiAgICAgICAgfSxcbiAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IHRyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnQudHJ1c3RlZCA9ICFjdXJyZW50LnRydXN0ZWQ7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAocGFsZXR0ZSkge1xuICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy50cnVzdEhUTUwsXG4gICAgICAgICAgICBjYXRlZ29yeTogdHJhbnMuX18oJ0ZpbGUgT3BlcmF0aW9ucycpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdHJhY2tlcjtcbn1cbi8qKlxuICogRXhwb3J0IHRoZSBwbHVnaW5zIGFzIGRlZmF1bHQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGh0bWxQbHVnaW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9