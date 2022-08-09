(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_running-extension_lib_index_js-_c10d0"],{

/***/ "../../packages/running-extension/lib/index.js":
/*!*****************************************************!*\
  !*** ../../packages/running-extension/lib/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_running__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/running */ "webpack/sharing/consume/default/@jupyterlab/running/@jupyterlab/running");
/* harmony import */ var _jupyterlab_running__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_running__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _kernels__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./kernels */ "../../packages/running-extension/lib/kernels.js");
/* harmony import */ var _opentabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./opentabs */ "../../packages/running-extension/lib/opentabs.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module running-extension
 */






/**
 * The default running sessions extension.
 */
const plugin = {
    activate,
    id: '@jupyterlab/running-extension:plugin',
    provides: _jupyterlab_running__WEBPACK_IMPORTED_MODULE_1__.IRunningSessionManagers,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.ITranslator],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell],
    autoStart: true
};
/**
 * Export the plugin as default.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
/**
 * Activate the running plugin.
 */
function activate(app, translator, restorer, labShell) {
    const trans = translator.load('jupyterlab');
    const runningSessionManagers = new _jupyterlab_running__WEBPACK_IMPORTED_MODULE_1__.RunningSessionManagers();
    const running = new _jupyterlab_running__WEBPACK_IMPORTED_MODULE_1__.RunningSessions(runningSessionManagers, translator);
    running.id = 'jp-running-sessions';
    running.title.caption = trans.__('Running Terminals and Kernels');
    running.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.runningIcon;
    running.node.setAttribute('role', 'region');
    running.node.setAttribute('aria-label', trans.__('Running Sessions section'));
    // Let the application restorer track the running panel for restoration of
    // application state (e.g. setting the running panel as the current side bar
    // widget).
    if (restorer) {
        restorer.add(running, 'running-sessions');
    }
    if (labShell) {
        (0,_opentabs__WEBPACK_IMPORTED_MODULE_4__.addOpenTabsSessionManager)(runningSessionManagers, translator, labShell);
    }
    (0,_kernels__WEBPACK_IMPORTED_MODULE_5__.addKernelRunningSessionManager)(runningSessionManagers, translator, app);
    // Rank has been chosen somewhat arbitrarily to give priority to the running
    // sessions widget in the sidebar.
    app.shell.add(running, 'left', { rank: 200 });
    return runningSessionManagers;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/running-extension/lib/kernels.js":
/*!*******************************************************!*\
  !*** ../../packages/running-extension/lib/kernels.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addKernelRunningSessionManager": () => (/* binding */ addKernelRunningSessionManager)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * Add the running kernel manager (notebooks & consoles) to the running panel.
 */
function addKernelRunningSessionManager(managers, translator, app) {
    const trans = translator.load('jupyterlab');
    const manager = app.serviceManager.sessions;
    const specsManager = app.serviceManager.kernelspecs;
    function filterSessions(m) {
        return !!((m.name || _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(m.path)).indexOf('.') !== -1 || m.name);
    }
    managers.add({
        name: trans.__('Kernels'),
        running: () => {
            return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.toArray)(manager.running())
                .filter(filterSessions)
                .map(model => new RunningKernel(model));
        },
        shutdownAll: () => manager.shutdownAll(),
        refreshRunning: () => manager.refreshRunning(),
        runningChanged: manager.runningChanged,
        shutdownLabel: trans.__('Shut Down'),
        shutdownAllLabel: trans.__('Shut Down All'),
        shutdownAllConfirmationText: trans.__('Are you sure you want to permanently shut down all running kernels?')
    });
    class RunningKernel {
        constructor(model) {
            this._model = model;
        }
        open() {
            const { path, type } = this._model;
            if (type.toLowerCase() === 'console') {
                void app.commands.execute('console:open', { path });
            }
            else {
                void app.commands.execute('docmanager:open', { path });
            }
        }
        shutdown() {
            return manager.shutdown(this._model.id);
        }
        icon() {
            const { name, path, type } = this._model;
            if ((name || _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(path)).indexOf('.ipynb') !== -1) {
                return _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.notebookIcon;
            }
            else if (type.toLowerCase() === 'console') {
                return _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.consoleIcon;
            }
            return _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.fileIcon;
        }
        label() {
            return this._model.name || _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(this._model.path);
        }
        labelTitle() {
            const { kernel, path } = this._model;
            let kernelName = kernel === null || kernel === void 0 ? void 0 : kernel.name;
            if (kernelName && specsManager.specs) {
                const spec = specsManager.specs.kernelspecs[kernelName];
                kernelName = spec ? spec.display_name : 'unknown';
            }
            return trans.__('Path: %1\nKernel: %2', path, kernelName);
        }
    }
}
//# sourceMappingURL=kernels.js.map

/***/ }),

/***/ "../../packages/running-extension/lib/opentabs.js":
/*!********************************************************!*\
  !*** ../../packages/running-extension/lib/opentabs.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addOpenTabsSessionManager": () => (/* binding */ addOpenTabsSessionManager)
/* harmony export */ });
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_3__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




/**
 * A class used to consolidate the signals used to rerender the open tabs section.
 */
class OpenTabsSignaler {
    constructor(labShell) {
        this._tabsChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_3__.Signal(this);
        this._widgets = [];
        this._labShell = labShell;
        this._labShell.layoutModified.connect(this._emitTabsChanged, this);
    }
    /**
     * A signal that fires when the open tabs section should be rerendered.
     */
    get tabsChanged() {
        return this._tabsChanged;
    }
    /**
     * Add a widget to watch for title changing.
     *
     * @param widget A widget whose title may change.
     */
    addWidget(widget) {
        widget.title.changed.connect(this._emitTabsChanged, this);
        this._widgets.push(widget);
    }
    /**
     * Emit the main signal that indicates the open tabs should be rerendered.
     */
    _emitTabsChanged() {
        this._widgets.forEach(widget => {
            widget.title.changed.disconnect(this._emitTabsChanged, this);
        });
        this._widgets = [];
        this._tabsChanged.emit(void 0);
    }
}
/**
 * Add the open tabs section to the running panel.
 *
 * @param managers - The IRunningSessionManagers used to register this section.
 * @param translator - The translator to use.
 * @param labShell - The ILabShell.
 */
function addOpenTabsSessionManager(managers, translator, labShell) {
    const signaler = new OpenTabsSignaler(labShell);
    const trans = translator.load('jupyterlab');
    managers.add({
        name: trans.__('Open Tabs'),
        running: () => {
            return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.toArray)(labShell.widgets('main')).map((widget) => {
                signaler.addWidget(widget);
                return new OpenTab(widget);
            });
        },
        shutdownAll: () => {
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.toArray)(labShell.widgets('main')).forEach((widget) => {
                widget.close();
            });
        },
        refreshRunning: () => {
            return void 0;
        },
        runningChanged: signaler.tabsChanged,
        shutdownLabel: trans.__('Close'),
        shutdownAllLabel: trans.__('Close All'),
        shutdownAllConfirmationText: trans.__('Are you sure you want to close all open tabs?')
    });
    class OpenTab {
        constructor(widget) {
            this._widget = widget;
        }
        open() {
            labShell.activateById(this._widget.id);
        }
        shutdown() {
            this._widget.close();
        }
        icon() {
            const widgetIcon = this._widget.title.icon;
            return widgetIcon instanceof _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.LabIcon ? widgetIcon : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.fileIcon;
        }
        label() {
            return this._widget.title.label;
        }
        labelTitle() {
            let labelTitle;
            if (this._widget instanceof _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_0__.DocumentWidget) {
                labelTitle = this._widget.context.path;
            }
            else {
                labelTitle = this._widget.title.label;
            }
            return labelTitle;
        }
    }
}
//# sourceMappingURL=opentabs.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvcnVubmluZy1leHRlbnNpb24vbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9ydW5uaW5nLWV4dGVuc2lvbi9saWIva2VybmVscy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvcnVubmluZy1leHRlbnNpb24vbGliL29wZW50YWJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3FFO0FBQ2tDO0FBQ2pEO0FBQ0U7QUFDRztBQUNKO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsd0VBQXVCO0FBQ3JDLGVBQWUsZ0VBQVc7QUFDMUIsZUFBZSxvRUFBZSxFQUFFLDhEQUFTO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxNQUFNLEVBQUM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1Qyx1RUFBc0I7QUFDN0Qsd0JBQXdCLGdFQUFlO0FBQ3ZDO0FBQ0E7QUFDQSx5QkFBeUIsa0VBQVc7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvRUFBeUI7QUFDakM7QUFDQSxJQUFJLHdFQUE4QjtBQUNsQztBQUNBO0FBQ0Esb0NBQW9DLFlBQVk7QUFDaEQ7QUFDQTtBQUNBLGlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0REE7QUFDQTtBQUNnRDtBQUNnQztBQUNwQztBQUM1QztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG1FQUFnQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwwREFBTztBQUMxQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGFBQWE7QUFDaEM7QUFDQSwyREFBMkQsT0FBTztBQUNsRTtBQUNBO0FBQ0EsOERBQThELE9BQU87QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0Qyx5QkFBeUIsbUVBQWdCO0FBQ3pDLHVCQUF1QixtRUFBWTtBQUNuQztBQUNBO0FBQ0EsdUJBQXVCLGtFQUFXO0FBQ2xDO0FBQ0EsbUJBQW1CLCtEQUFRO0FBQzNCO0FBQ0E7QUFDQSx1Q0FBdUMsbUVBQWdCO0FBQ3ZEO0FBQ0E7QUFDQSxtQkFBbUIsZUFBZTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRUE7QUFDQTtBQUN5RDtBQUNLO0FBQ2xCO0FBQ0Q7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxxREFBTTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDBEQUFPO0FBQzFCO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsWUFBWSwwREFBTztBQUNuQjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsOERBQU8sZ0JBQWdCLCtEQUFRO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxtRUFBYztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQyIsImZpbGUiOiJwYWNrYWdlc19ydW5uaW5nLWV4dGVuc2lvbl9saWJfaW5kZXhfanMtX2MxMGQwLjhhYTQ3ZDc2MTliNmJlMDdlODg1LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgcnVubmluZy1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxhYlNoZWxsLCBJTGF5b3V0UmVzdG9yZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBJUnVubmluZ1Nlc3Npb25NYW5hZ2VycywgUnVubmluZ1Nlc3Npb25NYW5hZ2VycywgUnVubmluZ1Nlc3Npb25zIH0gZnJvbSAnQGp1cHl0ZXJsYWIvcnVubmluZyc7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IHJ1bm5pbmdJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBhZGRLZXJuZWxSdW5uaW5nU2Vzc2lvbk1hbmFnZXIgfSBmcm9tICcuL2tlcm5lbHMnO1xuaW1wb3J0IHsgYWRkT3BlblRhYnNTZXNzaW9uTWFuYWdlciB9IGZyb20gJy4vb3BlbnRhYnMnO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBydW5uaW5nIHNlc3Npb25zIGV4dGVuc2lvbi5cbiAqL1xuY29uc3QgcGx1Z2luID0ge1xuICAgIGFjdGl2YXRlLFxuICAgIGlkOiAnQGp1cHl0ZXJsYWIvcnVubmluZy1leHRlbnNpb246cGx1Z2luJyxcbiAgICBwcm92aWRlczogSVJ1bm5pbmdTZXNzaW9uTWFuYWdlcnMsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJTGF5b3V0UmVzdG9yZXIsIElMYWJTaGVsbF0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLyoqXG4gKiBFeHBvcnQgdGhlIHBsdWdpbiBhcyBkZWZhdWx0LlxuICovXG5leHBvcnQgZGVmYXVsdCBwbHVnaW47XG4vKipcbiAqIEFjdGl2YXRlIHRoZSBydW5uaW5nIHBsdWdpbi5cbiAqL1xuZnVuY3Rpb24gYWN0aXZhdGUoYXBwLCB0cmFuc2xhdG9yLCByZXN0b3JlciwgbGFiU2hlbGwpIHtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGNvbnN0IHJ1bm5pbmdTZXNzaW9uTWFuYWdlcnMgPSBuZXcgUnVubmluZ1Nlc3Npb25NYW5hZ2VycygpO1xuICAgIGNvbnN0IHJ1bm5pbmcgPSBuZXcgUnVubmluZ1Nlc3Npb25zKHJ1bm5pbmdTZXNzaW9uTWFuYWdlcnMsIHRyYW5zbGF0b3IpO1xuICAgIHJ1bm5pbmcuaWQgPSAnanAtcnVubmluZy1zZXNzaW9ucyc7XG4gICAgcnVubmluZy50aXRsZS5jYXB0aW9uID0gdHJhbnMuX18oJ1J1bm5pbmcgVGVybWluYWxzIGFuZCBLZXJuZWxzJyk7XG4gICAgcnVubmluZy50aXRsZS5pY29uID0gcnVubmluZ0ljb247XG4gICAgcnVubmluZy5ub2RlLnNldEF0dHJpYnV0ZSgncm9sZScsICdyZWdpb24nKTtcbiAgICBydW5uaW5nLm5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdHJhbnMuX18oJ1J1bm5pbmcgU2Vzc2lvbnMgc2VjdGlvbicpKTtcbiAgICAvLyBMZXQgdGhlIGFwcGxpY2F0aW9uIHJlc3RvcmVyIHRyYWNrIHRoZSBydW5uaW5nIHBhbmVsIGZvciByZXN0b3JhdGlvbiBvZlxuICAgIC8vIGFwcGxpY2F0aW9uIHN0YXRlIChlLmcuIHNldHRpbmcgdGhlIHJ1bm5pbmcgcGFuZWwgYXMgdGhlIGN1cnJlbnQgc2lkZSBiYXJcbiAgICAvLyB3aWRnZXQpLlxuICAgIGlmIChyZXN0b3Jlcikge1xuICAgICAgICByZXN0b3Jlci5hZGQocnVubmluZywgJ3J1bm5pbmctc2Vzc2lvbnMnKTtcbiAgICB9XG4gICAgaWYgKGxhYlNoZWxsKSB7XG4gICAgICAgIGFkZE9wZW5UYWJzU2Vzc2lvbk1hbmFnZXIocnVubmluZ1Nlc3Npb25NYW5hZ2VycywgdHJhbnNsYXRvciwgbGFiU2hlbGwpO1xuICAgIH1cbiAgICBhZGRLZXJuZWxSdW5uaW5nU2Vzc2lvbk1hbmFnZXIocnVubmluZ1Nlc3Npb25NYW5hZ2VycywgdHJhbnNsYXRvciwgYXBwKTtcbiAgICAvLyBSYW5rIGhhcyBiZWVuIGNob3NlbiBzb21ld2hhdCBhcmJpdHJhcmlseSB0byBnaXZlIHByaW9yaXR5IHRvIHRoZSBydW5uaW5nXG4gICAgLy8gc2Vzc2lvbnMgd2lkZ2V0IGluIHRoZSBzaWRlYmFyLlxuICAgIGFwcC5zaGVsbC5hZGQocnVubmluZywgJ2xlZnQnLCB7IHJhbms6IDIwMCB9KTtcbiAgICByZXR1cm4gcnVubmluZ1Nlc3Npb25NYW5hZ2Vycztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFBhdGhFeHQgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgY29uc29sZUljb24sIGZpbGVJY29uLCBub3RlYm9va0ljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IHRvQXJyYXkgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG4vKipcbiAqIEFkZCB0aGUgcnVubmluZyBrZXJuZWwgbWFuYWdlciAobm90ZWJvb2tzICYgY29uc29sZXMpIHRvIHRoZSBydW5uaW5nIHBhbmVsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkS2VybmVsUnVubmluZ1Nlc3Npb25NYW5hZ2VyKG1hbmFnZXJzLCB0cmFuc2xhdG9yLCBhcHApIHtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGNvbnN0IG1hbmFnZXIgPSBhcHAuc2VydmljZU1hbmFnZXIuc2Vzc2lvbnM7XG4gICAgY29uc3Qgc3BlY3NNYW5hZ2VyID0gYXBwLnNlcnZpY2VNYW5hZ2VyLmtlcm5lbHNwZWNzO1xuICAgIGZ1bmN0aW9uIGZpbHRlclNlc3Npb25zKG0pIHtcbiAgICAgICAgcmV0dXJuICEhKChtLm5hbWUgfHwgUGF0aEV4dC5iYXNlbmFtZShtLnBhdGgpKS5pbmRleE9mKCcuJykgIT09IC0xIHx8IG0ubmFtZSk7XG4gICAgfVxuICAgIG1hbmFnZXJzLmFkZCh7XG4gICAgICAgIG5hbWU6IHRyYW5zLl9fKCdLZXJuZWxzJyksXG4gICAgICAgIHJ1bm5pbmc6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0b0FycmF5KG1hbmFnZXIucnVubmluZygpKVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoZmlsdGVyU2Vzc2lvbnMpXG4gICAgICAgICAgICAgICAgLm1hcChtb2RlbCA9PiBuZXcgUnVubmluZ0tlcm5lbChtb2RlbCkpO1xuICAgICAgICB9LFxuICAgICAgICBzaHV0ZG93bkFsbDogKCkgPT4gbWFuYWdlci5zaHV0ZG93bkFsbCgpLFxuICAgICAgICByZWZyZXNoUnVubmluZzogKCkgPT4gbWFuYWdlci5yZWZyZXNoUnVubmluZygpLFxuICAgICAgICBydW5uaW5nQ2hhbmdlZDogbWFuYWdlci5ydW5uaW5nQ2hhbmdlZCxcbiAgICAgICAgc2h1dGRvd25MYWJlbDogdHJhbnMuX18oJ1NodXQgRG93bicpLFxuICAgICAgICBzaHV0ZG93bkFsbExhYmVsOiB0cmFucy5fXygnU2h1dCBEb3duIEFsbCcpLFxuICAgICAgICBzaHV0ZG93bkFsbENvbmZpcm1hdGlvblRleHQ6IHRyYW5zLl9fKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcGVybWFuZW50bHkgc2h1dCBkb3duIGFsbCBydW5uaW5nIGtlcm5lbHM/JylcbiAgICB9KTtcbiAgICBjbGFzcyBSdW5uaW5nS2VybmVsIHtcbiAgICAgICAgY29uc3RydWN0b3IobW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgb3BlbigpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcGF0aCwgdHlwZSB9ID0gdGhpcy5fbW9kZWw7XG4gICAgICAgICAgICBpZiAodHlwZS50b0xvd2VyQ2FzZSgpID09PSAnY29uc29sZScpIHtcbiAgICAgICAgICAgICAgICB2b2lkIGFwcC5jb21tYW5kcy5leGVjdXRlKCdjb25zb2xlOm9wZW4nLCB7IHBhdGggfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2b2lkIGFwcC5jb21tYW5kcy5leGVjdXRlKCdkb2NtYW5hZ2VyOm9wZW4nLCB7IHBhdGggfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2h1dGRvd24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFuYWdlci5zaHV0ZG93bih0aGlzLl9tb2RlbC5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWNvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgcGF0aCwgdHlwZSB9ID0gdGhpcy5fbW9kZWw7XG4gICAgICAgICAgICBpZiAoKG5hbWUgfHwgUGF0aEV4dC5iYXNlbmFtZShwYXRoKSkuaW5kZXhPZignLmlweW5iJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vdGVib29rSWNvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnNvbGUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGVJY29uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZpbGVJY29uO1xuICAgICAgICB9XG4gICAgICAgIGxhYmVsKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVsLm5hbWUgfHwgUGF0aEV4dC5iYXNlbmFtZSh0aGlzLl9tb2RlbC5wYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBsYWJlbFRpdGxlKCkge1xuICAgICAgICAgICAgY29uc3QgeyBrZXJuZWwsIHBhdGggfSA9IHRoaXMuX21vZGVsO1xuICAgICAgICAgICAgbGV0IGtlcm5lbE5hbWUgPSBrZXJuZWwgPT09IG51bGwgfHwga2VybmVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBrZXJuZWwubmFtZTtcbiAgICAgICAgICAgIGlmIChrZXJuZWxOYW1lICYmIHNwZWNzTWFuYWdlci5zcGVjcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwZWMgPSBzcGVjc01hbmFnZXIuc3BlY3Mua2VybmVsc3BlY3Nba2VybmVsTmFtZV07XG4gICAgICAgICAgICAgICAga2VybmVsTmFtZSA9IHNwZWMgPyBzcGVjLmRpc3BsYXlfbmFtZSA6ICd1bmtub3duJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cmFucy5fXygnUGF0aDogJTFcXG5LZXJuZWw6ICUyJywgcGF0aCwga2VybmVsTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXJuZWxzLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IERvY3VtZW50V2lkZ2V0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvZG9jcmVnaXN0cnknO1xuaW1wb3J0IHsgZmlsZUljb24sIExhYkljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IHRvQXJyYXkgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG4vKipcbiAqIEEgY2xhc3MgdXNlZCB0byBjb25zb2xpZGF0ZSB0aGUgc2lnbmFscyB1c2VkIHRvIHJlcmVuZGVyIHRoZSBvcGVuIHRhYnMgc2VjdGlvbi5cbiAqL1xuY2xhc3MgT3BlblRhYnNTaWduYWxlciB7XG4gICAgY29uc3RydWN0b3IobGFiU2hlbGwpIHtcbiAgICAgICAgdGhpcy5fdGFic0NoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl93aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMuX2xhYlNoZWxsID0gbGFiU2hlbGw7XG4gICAgICAgIHRoaXMuX2xhYlNoZWxsLmxheW91dE1vZGlmaWVkLmNvbm5lY3QodGhpcy5fZW1pdFRhYnNDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgdGhhdCBmaXJlcyB3aGVuIHRoZSBvcGVuIHRhYnMgc2VjdGlvbiBzaG91bGQgYmUgcmVyZW5kZXJlZC5cbiAgICAgKi9cbiAgICBnZXQgdGFic0NoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90YWJzQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgd2lkZ2V0IHRvIHdhdGNoIGZvciB0aXRsZSBjaGFuZ2luZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWRnZXQgQSB3aWRnZXQgd2hvc2UgdGl0bGUgbWF5IGNoYW5nZS5cbiAgICAgKi9cbiAgICBhZGRXaWRnZXQod2lkZ2V0KSB7XG4gICAgICAgIHdpZGdldC50aXRsZS5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fZW1pdFRhYnNDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5wdXNoKHdpZGdldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVtaXQgdGhlIG1haW4gc2lnbmFsIHRoYXQgaW5kaWNhdGVzIHRoZSBvcGVuIHRhYnMgc2hvdWxkIGJlIHJlcmVuZGVyZWQuXG4gICAgICovXG4gICAgX2VtaXRUYWJzQ2hhbmdlZCgpIHtcbiAgICAgICAgdGhpcy5fd2lkZ2V0cy5mb3JFYWNoKHdpZGdldCA9PiB7XG4gICAgICAgICAgICB3aWRnZXQudGl0bGUuY2hhbmdlZC5kaXNjb25uZWN0KHRoaXMuX2VtaXRUYWJzQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl93aWRnZXRzID0gW107XG4gICAgICAgIHRoaXMuX3RhYnNDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICB9XG59XG4vKipcbiAqIEFkZCB0aGUgb3BlbiB0YWJzIHNlY3Rpb24gdG8gdGhlIHJ1bm5pbmcgcGFuZWwuXG4gKlxuICogQHBhcmFtIG1hbmFnZXJzIC0gVGhlIElSdW5uaW5nU2Vzc2lvbk1hbmFnZXJzIHVzZWQgdG8gcmVnaXN0ZXIgdGhpcyBzZWN0aW9uLlxuICogQHBhcmFtIHRyYW5zbGF0b3IgLSBUaGUgdHJhbnNsYXRvciB0byB1c2UuXG4gKiBAcGFyYW0gbGFiU2hlbGwgLSBUaGUgSUxhYlNoZWxsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkT3BlblRhYnNTZXNzaW9uTWFuYWdlcihtYW5hZ2VycywgdHJhbnNsYXRvciwgbGFiU2hlbGwpIHtcbiAgICBjb25zdCBzaWduYWxlciA9IG5ldyBPcGVuVGFic1NpZ25hbGVyKGxhYlNoZWxsKTtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIG1hbmFnZXJzLmFkZCh7XG4gICAgICAgIG5hbWU6IHRyYW5zLl9fKCdPcGVuIFRhYnMnKSxcbiAgICAgICAgcnVubmluZzogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRvQXJyYXkobGFiU2hlbGwud2lkZ2V0cygnbWFpbicpKS5tYXAoKHdpZGdldCkgPT4ge1xuICAgICAgICAgICAgICAgIHNpZ25hbGVyLmFkZFdpZGdldCh3aWRnZXQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT3BlblRhYih3aWRnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNodXRkb3duQWxsOiAoKSA9PiB7XG4gICAgICAgICAgICB0b0FycmF5KGxhYlNoZWxsLndpZGdldHMoJ21haW4nKSkuZm9yRWFjaCgod2lkZ2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0LmNsb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVmcmVzaFJ1bm5pbmc6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgIH0sXG4gICAgICAgIHJ1bm5pbmdDaGFuZ2VkOiBzaWduYWxlci50YWJzQ2hhbmdlZCxcbiAgICAgICAgc2h1dGRvd25MYWJlbDogdHJhbnMuX18oJ0Nsb3NlJyksXG4gICAgICAgIHNodXRkb3duQWxsTGFiZWw6IHRyYW5zLl9fKCdDbG9zZSBBbGwnKSxcbiAgICAgICAgc2h1dGRvd25BbGxDb25maXJtYXRpb25UZXh0OiB0cmFucy5fXygnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsb3NlIGFsbCBvcGVuIHRhYnM/JylcbiAgICB9KTtcbiAgICBjbGFzcyBPcGVuVGFiIHtcbiAgICAgICAgY29uc3RydWN0b3Iod2lkZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLl93aWRnZXQgPSB3aWRnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgb3BlbigpIHtcbiAgICAgICAgICAgIGxhYlNoZWxsLmFjdGl2YXRlQnlJZCh0aGlzLl93aWRnZXQuaWQpO1xuICAgICAgICB9XG4gICAgICAgIHNodXRkb3duKCkge1xuICAgICAgICAgICAgdGhpcy5fd2lkZ2V0LmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWNvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IHdpZGdldEljb24gPSB0aGlzLl93aWRnZXQudGl0bGUuaWNvbjtcbiAgICAgICAgICAgIHJldHVybiB3aWRnZXRJY29uIGluc3RhbmNlb2YgTGFiSWNvbiA/IHdpZGdldEljb24gOiBmaWxlSWNvbjtcbiAgICAgICAgfVxuICAgICAgICBsYWJlbCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93aWRnZXQudGl0bGUubGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgbGFiZWxUaXRsZSgpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbFRpdGxlO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3dpZGdldCBpbnN0YW5jZW9mIERvY3VtZW50V2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgbGFiZWxUaXRsZSA9IHRoaXMuX3dpZGdldC5jb250ZXh0LnBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsYWJlbFRpdGxlID0gdGhpcy5fd2lkZ2V0LnRpdGxlLmxhYmVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsVGl0bGU7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vcGVudGFicy5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9