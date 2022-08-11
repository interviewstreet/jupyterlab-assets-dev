(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_inspector-extension_lib_index_js-_1a100"],{

/***/ "../../packages/inspector-extension/lib/index.js":
/*!*******************************************************!*\
  !*** ../../packages/inspector-extension/lib/index.js ***!
  \*******************************************************/
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
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/console */ "webpack/sharing/consume/default/@jupyterlab/console/@jupyterlab/console");
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_console__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/inspector */ "webpack/sharing/consume/default/@jupyterlab/inspector/@jupyterlab/inspector");
/* harmony import */ var _jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module inspector-extension
 */








/**
 * The command IDs used by the inspector plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.open = 'inspector:open';
})(CommandIDs || (CommandIDs = {}));
/**
 * A service providing code introspection.
 */
const inspector = {
    id: '@jupyterlab/inspector-extension:inspector',
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_4__.ILauncher, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer],
    provides: _jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_3__.IInspector,
    autoStart: true,
    activate: (app, translator, palette, launcher, restorer) => {
        const trans = translator.load('jupyterlab');
        const { commands, shell } = app;
        const command = CommandIDs.open;
        const label = trans.__('Show Contextual Help');
        const namespace = 'inspector';
        const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
            namespace
        });
        function isInspectorOpen() {
            return inspector && !inspector.isDisposed;
        }
        let source = null;
        let inspector;
        function openInspector(args) {
            var _a;
            if (!isInspectorOpen()) {
                inspector = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({
                    content: new _jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_3__.InspectorPanel({ translator })
                });
                inspector.id = 'jp-inspector';
                inspector.title.label = label;
                inspector.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__.inspectorIcon;
                void tracker.add(inspector);
                source = source && !source.isDisposed ? source : null;
                inspector.content.source = source;
                (_a = inspector.content.source) === null || _a === void 0 ? void 0 : _a.onEditorChange(args);
            }
            if (!inspector.isAttached) {
                shell.add(inspector, 'main', { activate: false, mode: 'split-right' });
            }
            shell.activateById(inspector.id);
            return inspector;
        }
        // Add command to registry.
        commands.addCommand(command, {
            caption: trans.__('Live updating code documentation from the active kernel'),
            isEnabled: () => !inspector ||
                inspector.isDisposed ||
                !inspector.isAttached ||
                !inspector.isVisible,
            label,
            icon: args => (args.isLauncher ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_7__.inspectorIcon : undefined),
            execute: args => {
                var _a;
                const text = args && args.text;
                const refresh = args && args.refresh;
                // if inspector is open, see if we need a refresh
                if (isInspectorOpen() && refresh)
                    (_a = inspector.content.source) === null || _a === void 0 ? void 0 : _a.onEditorChange(text);
                else
                    openInspector(text);
            }
        });
        // Add command to UI where possible.
        if (palette) {
            palette.addItem({ command, category: label });
        }
        if (launcher) {
            launcher.add({ command, args: { isLauncher: true } });
        }
        // Handle state restoration.
        if (restorer) {
            void restorer.restore(tracker, { command, name: () => 'inspector' });
        }
        // Create a proxy to pass the `source` to the current inspector.
        const proxy = Object.defineProperty({}, 'source', {
            get: () => !inspector || inspector.isDisposed ? null : inspector.content.source,
            set: (src) => {
                source = src && !src.isDisposed ? src : null;
                if (inspector && !inspector.isDisposed) {
                    inspector.content.source = source;
                }
            }
        });
        return proxy;
    }
};
/**
 * An extension that registers consoles for inspection.
 */
const consoles = {
    id: '@jupyterlab/inspector-extension:consoles',
    requires: [_jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_3__.IInspector, _jupyterlab_console__WEBPACK_IMPORTED_MODULE_2__.IConsoleTracker, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell],
    autoStart: true,
    activate: (app, manager, consoles, labShell, translator) => {
        // Maintain association of new consoles with their respective handlers.
        const handlers = {};
        // Create a handler for each console that is created.
        consoles.widgetAdded.connect((sender, parent) => {
            const sessionContext = parent.console.sessionContext;
            const rendermime = parent.console.rendermime;
            const connector = new _jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_3__.KernelConnector({ sessionContext });
            const handler = new _jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_3__.InspectionHandler({ connector, rendermime });
            // Associate the handler to the widget.
            handlers[parent.id] = handler;
            // Set the initial editor.
            const cell = parent.console.promptCell;
            handler.editor = cell && cell.editor;
            // Listen for prompt creation.
            parent.console.promptCellCreated.connect((sender, cell) => {
                handler.editor = cell && cell.editor;
            });
            // Listen for parent disposal.
            parent.disposed.connect(() => {
                delete handlers[parent.id];
                handler.dispose();
            });
        });
        // Keep track of console instances and set inspector source.
        labShell.currentChanged.connect((_, args) => {
            const widget = args.newValue;
            if (!widget || !consoles.has(widget)) {
                return;
            }
            const source = handlers[widget.id];
            if (source) {
                manager.source = source;
            }
        });
    }
};
/**
 * An extension that registers notebooks for inspection.
 */
const notebooks = {
    id: '@jupyterlab/inspector-extension:notebooks',
    requires: [_jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_3__.IInspector, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_5__.INotebookTracker, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell],
    autoStart: true,
    activate: (app, manager, notebooks, labShell) => {
        // Maintain association of new notebooks with their respective handlers.
        const handlers = {};
        // Create a handler for each notebook that is created.
        notebooks.widgetAdded.connect((sender, parent) => {
            const sessionContext = parent.sessionContext;
            const rendermime = parent.content.rendermime;
            const connector = new _jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_3__.KernelConnector({ sessionContext });
            const handler = new _jupyterlab_inspector__WEBPACK_IMPORTED_MODULE_3__.InspectionHandler({ connector, rendermime });
            // Associate the handler to the widget.
            handlers[parent.id] = handler;
            // Set the initial editor.
            const cell = parent.content.activeCell;
            handler.editor = cell && cell.editor;
            // Listen for active cell changes.
            parent.content.activeCellChanged.connect((sender, cell) => {
                handler.editor = cell && cell.editor;
            });
            // Listen for parent disposal.
            parent.disposed.connect(() => {
                delete handlers[parent.id];
                handler.dispose();
            });
        });
        // Keep track of notebook instances and set inspector source.
        labShell.currentChanged.connect((sender, args) => {
            const widget = args.newValue;
            if (!widget || !notebooks.has(widget)) {
                return;
            }
            const source = handlers[widget.id];
            if (source) {
                manager.source = source;
            }
        });
    }
};
/**
 * Export the plugins as default.
 */
const plugins = [inspector, consoles, notebooks];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvaW5zcGVjdG9yLWV4dGVuc2lvbi9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDcUU7QUFDaUI7QUFDaEM7QUFDaUQ7QUFDdEQ7QUFDTztBQUNGO0FBQ0k7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0VBQVc7QUFDMUIsZUFBZSxpRUFBZSxFQUFFLDJEQUFTLEVBQUUsb0VBQWU7QUFDMUQsY0FBYyw2REFBVTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxlQUFlLGtCQUFrQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsK0RBQWE7QUFDekM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxnRUFBYztBQUM5QyxpQ0FBaUMsaUVBQWMsRUFBRSxhQUFhO0FBQzlELGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsdUNBQXVDLG9FQUFhO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyx1Q0FBdUM7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLG9FQUFhO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSw2QkFBNkIsMkJBQTJCO0FBQ3hEO0FBQ0E7QUFDQSwwQkFBMEIsaUJBQWlCLG1CQUFtQixFQUFFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxtQ0FBbUM7QUFDL0U7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSw2REFBVSxFQUFFLGdFQUFlLEVBQUUsOERBQVM7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxrRUFBZSxFQUFFLGlCQUFpQjtBQUNwRSxnQ0FBZ0Msb0VBQWlCLEVBQUUsd0JBQXdCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSw2REFBVSxFQUFFLGtFQUFnQixFQUFFLDhEQUFTO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msa0VBQWUsRUFBRSxpQkFBaUI7QUFDcEUsZ0NBQWdDLG9FQUFpQixFQUFFLHdCQUF3QjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxPQUFPLEVBQUM7QUFDdkIsaUMiLCJmaWxlIjoicGFja2FnZXNfaW5zcGVjdG9yLWV4dGVuc2lvbl9saWJfaW5kZXhfanMtXzFhMTAwLjVkMjE1M2YyMDU5NWJhYmVkOGFmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgaW5zcGVjdG9yLWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBJTGFiU2hlbGwsIElMYXlvdXRSZXN0b3JlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IElDb21tYW5kUGFsZXR0ZSwgTWFpbkFyZWFXaWRnZXQsIFdpZGdldFRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBJQ29uc29sZVRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9jb25zb2xlJztcbmltcG9ydCB7IElJbnNwZWN0b3IsIEluc3BlY3Rpb25IYW5kbGVyLCBJbnNwZWN0b3JQYW5lbCwgS2VybmVsQ29ubmVjdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvaW5zcGVjdG9yJztcbmltcG9ydCB7IElMYXVuY2hlciB9IGZyb20gJ0BqdXB5dGVybGFiL2xhdW5jaGVyJztcbmltcG9ydCB7IElOb3RlYm9va1RyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9ub3RlYm9vayc7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGluc3BlY3Rvckljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbi8qKlxuICogVGhlIGNvbW1hbmQgSURzIHVzZWQgYnkgdGhlIGluc3BlY3RvciBwbHVnaW4uXG4gKi9cbnZhciBDb21tYW5kSURzO1xuKGZ1bmN0aW9uIChDb21tYW5kSURzKSB7XG4gICAgQ29tbWFuZElEcy5vcGVuID0gJ2luc3BlY3RvcjpvcGVuJztcbn0pKENvbW1hbmRJRHMgfHwgKENvbW1hbmRJRHMgPSB7fSkpO1xuLyoqXG4gKiBBIHNlcnZpY2UgcHJvdmlkaW5nIGNvZGUgaW50cm9zcGVjdGlvbi5cbiAqL1xuY29uc3QgaW5zcGVjdG9yID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvaW5zcGVjdG9yLWV4dGVuc2lvbjppbnNwZWN0b3InLFxuICAgIHJlcXVpcmVzOiBbSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSUNvbW1hbmRQYWxldHRlLCBJTGF1bmNoZXIsIElMYXlvdXRSZXN0b3Jlcl0sXG4gICAgcHJvdmlkZXM6IElJbnNwZWN0b3IsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGFjdGl2YXRlOiAoYXBwLCB0cmFuc2xhdG9yLCBwYWxldHRlLCBsYXVuY2hlciwgcmVzdG9yZXIpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcywgc2hlbGwgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IENvbW1hbmRJRHMub3BlbjtcbiAgICAgICAgY29uc3QgbGFiZWwgPSB0cmFucy5fXygnU2hvdyBDb250ZXh0dWFsIEhlbHAnKTtcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gJ2luc3BlY3Rvcic7XG4gICAgICAgIGNvbnN0IHRyYWNrZXIgPSBuZXcgV2lkZ2V0VHJhY2tlcih7XG4gICAgICAgICAgICBuYW1lc3BhY2VcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIGlzSW5zcGVjdG9yT3BlbigpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnNwZWN0b3IgJiYgIWluc3BlY3Rvci5pc0Rpc3Bvc2VkO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzb3VyY2UgPSBudWxsO1xuICAgICAgICBsZXQgaW5zcGVjdG9yO1xuICAgICAgICBmdW5jdGlvbiBvcGVuSW5zcGVjdG9yKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmICghaXNJbnNwZWN0b3JPcGVuKCkpIHtcbiAgICAgICAgICAgICAgICBpbnNwZWN0b3IgPSBuZXcgTWFpbkFyZWFXaWRnZXQoe1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBuZXcgSW5zcGVjdG9yUGFuZWwoeyB0cmFuc2xhdG9yIH0pXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaW5zcGVjdG9yLmlkID0gJ2pwLWluc3BlY3Rvcic7XG4gICAgICAgICAgICAgICAgaW5zcGVjdG9yLnRpdGxlLmxhYmVsID0gbGFiZWw7XG4gICAgICAgICAgICAgICAgaW5zcGVjdG9yLnRpdGxlLmljb24gPSBpbnNwZWN0b3JJY29uO1xuICAgICAgICAgICAgICAgIHZvaWQgdHJhY2tlci5hZGQoaW5zcGVjdG9yKTtcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBzb3VyY2UgJiYgIXNvdXJjZS5pc0Rpc3Bvc2VkID8gc291cmNlIDogbnVsbDtcbiAgICAgICAgICAgICAgICBpbnNwZWN0b3IuY29udGVudC5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgICAgICAgICAgKF9hID0gaW5zcGVjdG9yLmNvbnRlbnQuc291cmNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub25FZGl0b3JDaGFuZ2UoYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWluc3BlY3Rvci5pc0F0dGFjaGVkKSB7XG4gICAgICAgICAgICAgICAgc2hlbGwuYWRkKGluc3BlY3RvciwgJ21haW4nLCB7IGFjdGl2YXRlOiBmYWxzZSwgbW9kZTogJ3NwbGl0LXJpZ2h0JyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNoZWxsLmFjdGl2YXRlQnlJZChpbnNwZWN0b3IuaWQpO1xuICAgICAgICAgICAgcmV0dXJuIGluc3BlY3RvcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGQgY29tbWFuZCB0byByZWdpc3RyeS5cbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChjb21tYW5kLCB7XG4gICAgICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnTGl2ZSB1cGRhdGluZyBjb2RlIGRvY3VtZW50YXRpb24gZnJvbSB0aGUgYWN0aXZlIGtlcm5lbCcpLFxuICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiAhaW5zcGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgaW5zcGVjdG9yLmlzRGlzcG9zZWQgfHxcbiAgICAgICAgICAgICAgICAhaW5zcGVjdG9yLmlzQXR0YWNoZWQgfHxcbiAgICAgICAgICAgICAgICAhaW5zcGVjdG9yLmlzVmlzaWJsZSxcbiAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgaWNvbjogYXJncyA9PiAoYXJncy5pc0xhdW5jaGVyID8gaW5zcGVjdG9ySWNvbiA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGFyZ3MgJiYgYXJncy50ZXh0O1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZnJlc2ggPSBhcmdzICYmIGFyZ3MucmVmcmVzaDtcbiAgICAgICAgICAgICAgICAvLyBpZiBpbnNwZWN0b3IgaXMgb3Blbiwgc2VlIGlmIHdlIG5lZWQgYSByZWZyZXNoXG4gICAgICAgICAgICAgICAgaWYgKGlzSW5zcGVjdG9yT3BlbigpICYmIHJlZnJlc2gpXG4gICAgICAgICAgICAgICAgICAgIChfYSA9IGluc3BlY3Rvci5jb250ZW50LnNvdXJjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm9uRWRpdG9yQ2hhbmdlKHRleHQpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgb3Blbkluc3BlY3Rvcih0ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCBjb21tYW5kIHRvIFVJIHdoZXJlIHBvc3NpYmxlLlxuICAgICAgICBpZiAocGFsZXR0ZSkge1xuICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZCwgY2F0ZWdvcnk6IGxhYmVsIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXVuY2hlcikge1xuICAgICAgICAgICAgbGF1bmNoZXIuYWRkKHsgY29tbWFuZCwgYXJnczogeyBpc0xhdW5jaGVyOiB0cnVlIH0gfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIHN0YXRlIHJlc3RvcmF0aW9uLlxuICAgICAgICBpZiAocmVzdG9yZXIpIHtcbiAgICAgICAgICAgIHZvaWQgcmVzdG9yZXIucmVzdG9yZSh0cmFja2VyLCB7IGNvbW1hbmQsIG5hbWU6ICgpID0+ICdpbnNwZWN0b3InIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIENyZWF0ZSBhIHByb3h5IHRvIHBhc3MgdGhlIGBzb3VyY2VgIHRvIHRoZSBjdXJyZW50IGluc3BlY3Rvci5cbiAgICAgICAgY29uc3QgcHJveHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdzb3VyY2UnLCB7XG4gICAgICAgICAgICBnZXQ6ICgpID0+ICFpbnNwZWN0b3IgfHwgaW5zcGVjdG9yLmlzRGlzcG9zZWQgPyBudWxsIDogaW5zcGVjdG9yLmNvbnRlbnQuc291cmNlLFxuICAgICAgICAgICAgc2V0OiAoc3JjKSA9PiB7XG4gICAgICAgICAgICAgICAgc291cmNlID0gc3JjICYmICFzcmMuaXNEaXNwb3NlZCA/IHNyYyA6IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGluc3BlY3RvciAmJiAhaW5zcGVjdG9yLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zcGVjdG9yLmNvbnRlbnQuc291cmNlID0gc291cmNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm94eTtcbiAgICB9XG59O1xuLyoqXG4gKiBBbiBleHRlbnNpb24gdGhhdCByZWdpc3RlcnMgY29uc29sZXMgZm9yIGluc3BlY3Rpb24uXG4gKi9cbmNvbnN0IGNvbnNvbGVzID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvaW5zcGVjdG9yLWV4dGVuc2lvbjpjb25zb2xlcycsXG4gICAgcmVxdWlyZXM6IFtJSW5zcGVjdG9yLCBJQ29uc29sZVRyYWNrZXIsIElMYWJTaGVsbF0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBtYW5hZ2VyLCBjb25zb2xlcywgbGFiU2hlbGwsIHRyYW5zbGF0b3IpID0+IHtcbiAgICAgICAgLy8gTWFpbnRhaW4gYXNzb2NpYXRpb24gb2YgbmV3IGNvbnNvbGVzIHdpdGggdGhlaXIgcmVzcGVjdGl2ZSBoYW5kbGVycy5cbiAgICAgICAgY29uc3QgaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgLy8gQ3JlYXRlIGEgaGFuZGxlciBmb3IgZWFjaCBjb25zb2xlIHRoYXQgaXMgY3JlYXRlZC5cbiAgICAgICAgY29uc29sZXMud2lkZ2V0QWRkZWQuY29ubmVjdCgoc2VuZGVyLCBwYXJlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb25Db250ZXh0ID0gcGFyZW50LmNvbnNvbGUuc2Vzc2lvbkNvbnRleHQ7XG4gICAgICAgICAgICBjb25zdCByZW5kZXJtaW1lID0gcGFyZW50LmNvbnNvbGUucmVuZGVybWltZTtcbiAgICAgICAgICAgIGNvbnN0IGNvbm5lY3RvciA9IG5ldyBLZXJuZWxDb25uZWN0b3IoeyBzZXNzaW9uQ29udGV4dCB9KTtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgSW5zcGVjdGlvbkhhbmRsZXIoeyBjb25uZWN0b3IsIHJlbmRlcm1pbWUgfSk7XG4gICAgICAgICAgICAvLyBBc3NvY2lhdGUgdGhlIGhhbmRsZXIgdG8gdGhlIHdpZGdldC5cbiAgICAgICAgICAgIGhhbmRsZXJzW3BhcmVudC5pZF0gPSBoYW5kbGVyO1xuICAgICAgICAgICAgLy8gU2V0IHRoZSBpbml0aWFsIGVkaXRvci5cbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBwYXJlbnQuY29uc29sZS5wcm9tcHRDZWxsO1xuICAgICAgICAgICAgaGFuZGxlci5lZGl0b3IgPSBjZWxsICYmIGNlbGwuZWRpdG9yO1xuICAgICAgICAgICAgLy8gTGlzdGVuIGZvciBwcm9tcHQgY3JlYXRpb24uXG4gICAgICAgICAgICBwYXJlbnQuY29uc29sZS5wcm9tcHRDZWxsQ3JlYXRlZC5jb25uZWN0KChzZW5kZXIsIGNlbGwpID0+IHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmVkaXRvciA9IGNlbGwgJiYgY2VsbC5lZGl0b3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIExpc3RlbiBmb3IgcGFyZW50IGRpc3Bvc2FsLlxuICAgICAgICAgICAgcGFyZW50LmRpc3Bvc2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBoYW5kbGVyc1twYXJlbnQuaWRdO1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBLZWVwIHRyYWNrIG9mIGNvbnNvbGUgaW5zdGFuY2VzIGFuZCBzZXQgaW5zcGVjdG9yIHNvdXJjZS5cbiAgICAgICAgbGFiU2hlbGwuY3VycmVudENoYW5nZWQuY29ubmVjdCgoXywgYXJncykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gYXJncy5uZXdWYWx1ZTtcbiAgICAgICAgICAgIGlmICghd2lkZ2V0IHx8ICFjb25zb2xlcy5oYXMod2lkZ2V0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGhhbmRsZXJzW3dpZGdldC5pZF07XG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgbWFuYWdlci5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIEFuIGV4dGVuc2lvbiB0aGF0IHJlZ2lzdGVycyBub3RlYm9va3MgZm9yIGluc3BlY3Rpb24uXG4gKi9cbmNvbnN0IG5vdGVib29rcyA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2luc3BlY3Rvci1leHRlbnNpb246bm90ZWJvb2tzJyxcbiAgICByZXF1aXJlczogW0lJbnNwZWN0b3IsIElOb3RlYm9va1RyYWNrZXIsIElMYWJTaGVsbF0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBtYW5hZ2VyLCBub3RlYm9va3MsIGxhYlNoZWxsKSA9PiB7XG4gICAgICAgIC8vIE1haW50YWluIGFzc29jaWF0aW9uIG9mIG5ldyBub3RlYm9va3Mgd2l0aCB0aGVpciByZXNwZWN0aXZlIGhhbmRsZXJzLlxuICAgICAgICBjb25zdCBoYW5kbGVycyA9IHt9O1xuICAgICAgICAvLyBDcmVhdGUgYSBoYW5kbGVyIGZvciBlYWNoIG5vdGVib29rIHRoYXQgaXMgY3JlYXRlZC5cbiAgICAgICAgbm90ZWJvb2tzLndpZGdldEFkZGVkLmNvbm5lY3QoKHNlbmRlciwgcGFyZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uQ29udGV4dCA9IHBhcmVudC5zZXNzaW9uQ29udGV4dDtcbiAgICAgICAgICAgIGNvbnN0IHJlbmRlcm1pbWUgPSBwYXJlbnQuY29udGVudC5yZW5kZXJtaW1lO1xuICAgICAgICAgICAgY29uc3QgY29ubmVjdG9yID0gbmV3IEtlcm5lbENvbm5lY3Rvcih7IHNlc3Npb25Db250ZXh0IH0pO1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IG5ldyBJbnNwZWN0aW9uSGFuZGxlcih7IGNvbm5lY3RvciwgcmVuZGVybWltZSB9KTtcbiAgICAgICAgICAgIC8vIEFzc29jaWF0ZSB0aGUgaGFuZGxlciB0byB0aGUgd2lkZ2V0LlxuICAgICAgICAgICAgaGFuZGxlcnNbcGFyZW50LmlkXSA9IGhhbmRsZXI7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIGluaXRpYWwgZWRpdG9yLlxuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHBhcmVudC5jb250ZW50LmFjdGl2ZUNlbGw7XG4gICAgICAgICAgICBoYW5kbGVyLmVkaXRvciA9IGNlbGwgJiYgY2VsbC5lZGl0b3I7XG4gICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIGFjdGl2ZSBjZWxsIGNoYW5nZXMuXG4gICAgICAgICAgICBwYXJlbnQuY29udGVudC5hY3RpdmVDZWxsQ2hhbmdlZC5jb25uZWN0KChzZW5kZXIsIGNlbGwpID0+IHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmVkaXRvciA9IGNlbGwgJiYgY2VsbC5lZGl0b3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIExpc3RlbiBmb3IgcGFyZW50IGRpc3Bvc2FsLlxuICAgICAgICAgICAgcGFyZW50LmRpc3Bvc2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBoYW5kbGVyc1twYXJlbnQuaWRdO1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBLZWVwIHRyYWNrIG9mIG5vdGVib29rIGluc3RhbmNlcyBhbmQgc2V0IGluc3BlY3RvciBzb3VyY2UuXG4gICAgICAgIGxhYlNoZWxsLmN1cnJlbnRDaGFuZ2VkLmNvbm5lY3QoKHNlbmRlciwgYXJncykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gYXJncy5uZXdWYWx1ZTtcbiAgICAgICAgICAgIGlmICghd2lkZ2V0IHx8ICFub3RlYm9va3MuaGFzKHdpZGdldCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBoYW5kbGVyc1t3aWRnZXQuaWRdO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIG1hbmFnZXIuc291cmNlID0gc291cmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuLyoqXG4gKiBFeHBvcnQgdGhlIHBsdWdpbnMgYXMgZGVmYXVsdC5cbiAqL1xuY29uc3QgcGx1Z2lucyA9IFtpbnNwZWN0b3IsIGNvbnNvbGVzLCBub3RlYm9va3NdO1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2lucztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=