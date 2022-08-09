(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_tooltip-extension_lib_index_js-_f3cd1"],{

/***/ "../../packages/tooltip-extension/lib/index.js":
/*!*****************************************************!*\
  !*** ../../packages/tooltip-extension/lib/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/console */ "webpack/sharing/consume/default/@jupyterlab/console/@jupyterlab/console");
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_console__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/fileeditor */ "webpack/sharing/consume/default/@jupyterlab/fileeditor/@jupyterlab/fileeditor");
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/tooltip */ "webpack/sharing/consume/default/@jupyterlab/tooltip/@jupyterlab/tooltip");
/* harmony import */ var _jupyterlab_tooltip__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_tooltip__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_7__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module tooltip-extension
 */








/**
 * The command IDs used by the tooltip plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.dismiss = 'tooltip:dismiss';
    CommandIDs.launchConsole = 'tooltip:launch-console';
    CommandIDs.launchNotebook = 'tooltip:launch-notebook';
    CommandIDs.launchFile = 'tooltip:launch-file';
})(CommandIDs || (CommandIDs = {}));
/**
 * The main tooltip manager plugin.
 */
const manager = {
    id: '@jupyterlab/tooltip-extension:manager',
    autoStart: true,
    provides: _jupyterlab_tooltip__WEBPACK_IMPORTED_MODULE_5__.ITooltipManager,
    activate: (app) => {
        let tooltip = null;
        // Add tooltip dismiss command.
        app.commands.addCommand(CommandIDs.dismiss, {
            execute: () => {
                if (tooltip) {
                    tooltip.dispose();
                    tooltip = null;
                }
            }
        });
        return {
            invoke(options) {
                const detail = 0;
                const { anchor, editor, kernel, rendermime } = options;
                if (tooltip) {
                    tooltip.dispose();
                    tooltip = null;
                }
                return Private.fetch({ detail, editor, kernel })
                    .then(bundle => {
                    tooltip = new _jupyterlab_tooltip__WEBPACK_IMPORTED_MODULE_5__.Tooltip({ anchor, bundle, editor, rendermime });
                    _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.Widget.attach(tooltip, document.body);
                })
                    .catch(() => {
                    /* Fails silently. */
                });
            }
        };
    }
};
/**
 * The console tooltip plugin.
 */
const consoles = {
    id: '@jupyterlab/tooltip-extension:consoles',
    autoStart: true,
    requires: [_jupyterlab_tooltip__WEBPACK_IMPORTED_MODULE_5__.ITooltipManager, _jupyterlab_console__WEBPACK_IMPORTED_MODULE_0__.IConsoleTracker],
    activate: (app, manager, consoles) => {
        // Add tooltip launch command.
        app.commands.addCommand(CommandIDs.launchConsole, {
            execute: () => {
                var _a, _b;
                const parent = consoles.currentWidget;
                if (!parent) {
                    return;
                }
                const anchor = parent.console;
                const editor = (_a = anchor.promptCell) === null || _a === void 0 ? void 0 : _a.editor;
                const kernel = (_b = anchor.sessionContext.session) === null || _b === void 0 ? void 0 : _b.kernel;
                const rendermime = anchor.rendermime;
                // If all components necessary for rendering exist, create a tooltip.
                if (!!editor && !!kernel && !!rendermime) {
                    return manager.invoke({ anchor, editor, kernel, rendermime });
                }
            }
        });
    }
};
/**
 * The notebook tooltip plugin.
 */
const notebooks = {
    id: '@jupyterlab/tooltip-extension:notebooks',
    autoStart: true,
    requires: [_jupyterlab_tooltip__WEBPACK_IMPORTED_MODULE_5__.ITooltipManager, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__.INotebookTracker],
    activate: (app, manager, notebooks) => {
        // Add tooltip launch command.
        app.commands.addCommand(CommandIDs.launchNotebook, {
            execute: () => {
                var _a, _b;
                const parent = notebooks.currentWidget;
                if (!parent) {
                    return;
                }
                const anchor = parent.content;
                const editor = (_a = anchor.activeCell) === null || _a === void 0 ? void 0 : _a.editor;
                const kernel = (_b = parent.sessionContext.session) === null || _b === void 0 ? void 0 : _b.kernel;
                const rendermime = anchor.rendermime;
                // If all components necessary for rendering exist, create a tooltip.
                if (!!editor && !!kernel && !!rendermime) {
                    return manager.invoke({ anchor, editor, kernel, rendermime });
                }
            }
        });
    }
};
/**
 * The file editor tooltip plugin.
 */
const files = {
    id: '@jupyterlab/tooltip-extension:files',
    autoStart: true,
    requires: [_jupyterlab_tooltip__WEBPACK_IMPORTED_MODULE_5__.ITooltipManager, _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2__.IEditorTracker, _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__.IRenderMimeRegistry],
    activate: (app, manager, editorTracker, rendermime) => {
        // Keep a list of active ISessions so that we can
        // clean them up when they are no longer needed.
        const activeSessions = {};
        const sessions = app.serviceManager.sessions;
        // When the list of running sessions changes,
        // check to see if there are any kernels with a
        // matching path for the file editors.
        const onRunningChanged = (sender, models) => {
            editorTracker.forEach(file => {
                const model = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.find)(models, m => file.context.path === m.path);
                if (model) {
                    const oldSession = activeSessions[file.id];
                    // If there is a matching path, but it is the same
                    // session as we previously had, do nothing.
                    if (oldSession && oldSession.id === model.id) {
                        return;
                    }
                    // Otherwise, dispose of the old session and reset to
                    // a new CompletionConnector.
                    if (oldSession) {
                        delete activeSessions[file.id];
                        oldSession.dispose();
                    }
                    const session = sessions.connectTo({ model });
                    activeSessions[file.id] = session;
                }
                else {
                    const session = activeSessions[file.id];
                    if (session) {
                        session.dispose();
                        delete activeSessions[file.id];
                    }
                }
            });
        };
        onRunningChanged(sessions, (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.toArray)(sessions.running()));
        sessions.runningChanged.connect(onRunningChanged);
        // Clean up after a widget when it is disposed
        editorTracker.widgetAdded.connect((sender, widget) => {
            widget.disposed.connect(w => {
                const session = activeSessions[w.id];
                if (session) {
                    session.dispose();
                    delete activeSessions[w.id];
                }
            });
        });
        // Add tooltip launch command.
        app.commands.addCommand(CommandIDs.launchFile, {
            execute: async () => {
                const parent = editorTracker.currentWidget;
                const kernel = parent &&
                    activeSessions[parent.id] &&
                    activeSessions[parent.id].kernel;
                if (!kernel) {
                    return;
                }
                const anchor = parent.content;
                const editor = anchor === null || anchor === void 0 ? void 0 : anchor.editor;
                // If all components necessary for rendering exist, create a tooltip.
                if (!!editor && !!kernel && !!rendermime) {
                    return manager.invoke({ anchor, editor, kernel, rendermime });
                }
            }
        });
    }
};
/**
 * Export the plugins as default.
 */
const plugins = [
    manager,
    consoles,
    notebooks,
    files
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * A counter for outstanding requests.
     */
    let pending = 0;
    /**
     * Fetch a tooltip's content from the API server.
     */
    function fetch(options) {
        const { detail, editor, kernel } = options;
        const code = editor.model.value.text;
        const position = editor.getCursorPosition();
        const offset = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.Text.jsIndexToCharIndex(editor.getOffsetAt(position), code);
        // Clear hints if the new text value is empty or kernel is unavailable.
        if (!code || !kernel) {
            return Promise.reject(void 0);
        }
        const contents = {
            code,
            cursor_pos: offset,
            detail_level: detail || 0
        };
        const current = ++pending;
        return kernel.requestInspect(contents).then(msg => {
            const value = msg.content;
            // If a newer request is pending, bail.
            if (current !== pending) {
                return Promise.reject(void 0);
            }
            // If request fails or returns negative results, bail.
            if (value.status !== 'ok' || !value.found) {
                return Promise.reject(void 0);
            }
            return Promise.resolve(value.data);
        });
    }
    Private.fetch = fetch;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdG9vbHRpcC1leHRlbnNpb24vbGliL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3NEO0FBQ1Q7QUFDVztBQUNBO0FBQ0s7QUFDRTtBQUNiO0FBQ1Q7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnRUFBZTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscUNBQXFDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHlCQUF5QjtBQUMvRDtBQUNBLGtDQUFrQyx3REFBTyxFQUFFLHFDQUFxQztBQUNoRixvQkFBb0IsMERBQWE7QUFDakMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdFQUFlLEVBQUUsZ0VBQWU7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLHFDQUFxQztBQUNoRjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdFQUFlLEVBQUUsa0VBQWdCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxxQ0FBcUM7QUFDaEY7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnRUFBZSxFQUFFLGtFQUFjLEVBQUUsdUVBQW1CO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLHVEQUFJO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELFFBQVE7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsbUNBQW1DLDBEQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxxQ0FBcUM7QUFDaEY7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsT0FBTyxFQUFDO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx5QkFBeUI7QUFDeEM7QUFDQTtBQUNBLHVCQUF1QiwwRUFBdUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQixpQyIsImZpbGUiOiJwYWNrYWdlc190b29sdGlwLWV4dGVuc2lvbl9saWJfaW5kZXhfanMtX2YzY2QxLjA1Y2U4OWU2OGFmODMzMTdhYWMwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgdG9vbHRpcC1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUNvbnNvbGVUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29uc29sZSc7XG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IElFZGl0b3JUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvZmlsZWVkaXRvcic7XG5pbXBvcnQgeyBJTm90ZWJvb2tUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvbm90ZWJvb2snO1xuaW1wb3J0IHsgSVJlbmRlck1pbWVSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWUnO1xuaW1wb3J0IHsgSVRvb2x0aXBNYW5hZ2VyLCBUb29sdGlwIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdG9vbHRpcCc7XG5pbXBvcnQgeyBmaW5kLCB0b0FycmF5IH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbi8qKlxuICogVGhlIGNvbW1hbmQgSURzIHVzZWQgYnkgdGhlIHRvb2x0aXAgcGx1Z2luLlxuICovXG52YXIgQ29tbWFuZElEcztcbihmdW5jdGlvbiAoQ29tbWFuZElEcykge1xuICAgIENvbW1hbmRJRHMuZGlzbWlzcyA9ICd0b29sdGlwOmRpc21pc3MnO1xuICAgIENvbW1hbmRJRHMubGF1bmNoQ29uc29sZSA9ICd0b29sdGlwOmxhdW5jaC1jb25zb2xlJztcbiAgICBDb21tYW5kSURzLmxhdW5jaE5vdGVib29rID0gJ3Rvb2x0aXA6bGF1bmNoLW5vdGVib29rJztcbiAgICBDb21tYW5kSURzLmxhdW5jaEZpbGUgPSAndG9vbHRpcDpsYXVuY2gtZmlsZSc7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbi8qKlxuICogVGhlIG1haW4gdG9vbHRpcCBtYW5hZ2VyIHBsdWdpbi5cbiAqL1xuY29uc3QgbWFuYWdlciA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL3Rvb2x0aXAtZXh0ZW5zaW9uOm1hbmFnZXInLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBwcm92aWRlczogSVRvb2x0aXBNYW5hZ2VyLFxuICAgIGFjdGl2YXRlOiAoYXBwKSA9PiB7XG4gICAgICAgIGxldCB0b29sdGlwID0gbnVsbDtcbiAgICAgICAgLy8gQWRkIHRvb2x0aXAgZGlzbWlzcyBjb21tYW5kLlxuICAgICAgICBhcHAuY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmRpc21pc3MsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodG9vbHRpcCkge1xuICAgICAgICAgICAgICAgICAgICB0b29sdGlwLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGludm9rZShvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGV0YWlsID0gMDtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGFuY2hvciwgZWRpdG9yLCBrZXJuZWwsIHJlbmRlcm1pbWUgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgaWYgKHRvb2x0aXApIHtcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcC5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXAgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJpdmF0ZS5mZXRjaCh7IGRldGFpbCwgZWRpdG9yLCBrZXJuZWwgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oYnVuZGxlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcCA9IG5ldyBUb29sdGlwKHsgYW5jaG9yLCBidW5kbGUsIGVkaXRvciwgcmVuZGVybWltZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgV2lkZ2V0LmF0dGFjaCh0b29sdGlwLCBkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvKiBGYWlscyBzaWxlbnRseS4gKi9cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59O1xuLyoqXG4gKiBUaGUgY29uc29sZSB0b29sdGlwIHBsdWdpbi5cbiAqL1xuY29uc3QgY29uc29sZXMgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi90b29sdGlwLWV4dGVuc2lvbjpjb25zb2xlcycsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbSVRvb2x0aXBNYW5hZ2VyLCBJQ29uc29sZVRyYWNrZXJdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBtYW5hZ2VyLCBjb25zb2xlcykgPT4ge1xuICAgICAgICAvLyBBZGQgdG9vbHRpcCBsYXVuY2ggY29tbWFuZC5cbiAgICAgICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5sYXVuY2hDb25zb2xlLCB7XG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBjb25zb2xlcy5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gcGFyZW50LmNvbnNvbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gKF9hID0gYW5jaG9yLnByb21wdENlbGwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5lZGl0b3I7XG4gICAgICAgICAgICAgICAgY29uc3Qga2VybmVsID0gKF9iID0gYW5jaG9yLnNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5rZXJuZWw7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVuZGVybWltZSA9IGFuY2hvci5yZW5kZXJtaW1lO1xuICAgICAgICAgICAgICAgIC8vIElmIGFsbCBjb21wb25lbnRzIG5lY2Vzc2FyeSBmb3IgcmVuZGVyaW5nIGV4aXN0LCBjcmVhdGUgYSB0b29sdGlwLlxuICAgICAgICAgICAgICAgIGlmICghIWVkaXRvciAmJiAhIWtlcm5lbCAmJiAhIXJlbmRlcm1pbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hbmFnZXIuaW52b2tlKHsgYW5jaG9yLCBlZGl0b3IsIGtlcm5lbCwgcmVuZGVybWltZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIFRoZSBub3RlYm9vayB0b29sdGlwIHBsdWdpbi5cbiAqL1xuY29uc3Qgbm90ZWJvb2tzID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvdG9vbHRpcC1leHRlbnNpb246bm90ZWJvb2tzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVG9vbHRpcE1hbmFnZXIsIElOb3RlYm9va1RyYWNrZXJdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBtYW5hZ2VyLCBub3RlYm9va3MpID0+IHtcbiAgICAgICAgLy8gQWRkIHRvb2x0aXAgbGF1bmNoIGNvbW1hbmQuXG4gICAgICAgIGFwcC5jb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMubGF1bmNoTm90ZWJvb2ssIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IG5vdGVib29rcy5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gcGFyZW50LmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gKF9hID0gYW5jaG9yLmFjdGl2ZUNlbGwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5lZGl0b3I7XG4gICAgICAgICAgICAgICAgY29uc3Qga2VybmVsID0gKF9iID0gcGFyZW50LnNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5rZXJuZWw7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVuZGVybWltZSA9IGFuY2hvci5yZW5kZXJtaW1lO1xuICAgICAgICAgICAgICAgIC8vIElmIGFsbCBjb21wb25lbnRzIG5lY2Vzc2FyeSBmb3IgcmVuZGVyaW5nIGV4aXN0LCBjcmVhdGUgYSB0b29sdGlwLlxuICAgICAgICAgICAgICAgIGlmICghIWVkaXRvciAmJiAhIWtlcm5lbCAmJiAhIXJlbmRlcm1pbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hbmFnZXIuaW52b2tlKHsgYW5jaG9yLCBlZGl0b3IsIGtlcm5lbCwgcmVuZGVybWltZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIFRoZSBmaWxlIGVkaXRvciB0b29sdGlwIHBsdWdpbi5cbiAqL1xuY29uc3QgZmlsZXMgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi90b29sdGlwLWV4dGVuc2lvbjpmaWxlcycsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbSVRvb2x0aXBNYW5hZ2VyLCBJRWRpdG9yVHJhY2tlciwgSVJlbmRlck1pbWVSZWdpc3RyeV0sXG4gICAgYWN0aXZhdGU6IChhcHAsIG1hbmFnZXIsIGVkaXRvclRyYWNrZXIsIHJlbmRlcm1pbWUpID0+IHtcbiAgICAgICAgLy8gS2VlcCBhIGxpc3Qgb2YgYWN0aXZlIElTZXNzaW9ucyBzbyB0aGF0IHdlIGNhblxuICAgICAgICAvLyBjbGVhbiB0aGVtIHVwIHdoZW4gdGhleSBhcmUgbm8gbG9uZ2VyIG5lZWRlZC5cbiAgICAgICAgY29uc3QgYWN0aXZlU2Vzc2lvbnMgPSB7fTtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbnMgPSBhcHAuc2VydmljZU1hbmFnZXIuc2Vzc2lvbnM7XG4gICAgICAgIC8vIFdoZW4gdGhlIGxpc3Qgb2YgcnVubmluZyBzZXNzaW9ucyBjaGFuZ2VzLFxuICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlcmUgYXJlIGFueSBrZXJuZWxzIHdpdGggYVxuICAgICAgICAvLyBtYXRjaGluZyBwYXRoIGZvciB0aGUgZmlsZSBlZGl0b3JzLlxuICAgICAgICBjb25zdCBvblJ1bm5pbmdDaGFuZ2VkID0gKHNlbmRlciwgbW9kZWxzKSA9PiB7XG4gICAgICAgICAgICBlZGl0b3JUcmFja2VyLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSBmaW5kKG1vZGVscywgbSA9PiBmaWxlLmNvbnRleHQucGF0aCA9PT0gbS5wYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkU2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zW2ZpbGUuaWRdO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIG1hdGNoaW5nIHBhdGgsIGJ1dCBpdCBpcyB0aGUgc2FtZVxuICAgICAgICAgICAgICAgICAgICAvLyBzZXNzaW9uIGFzIHdlIHByZXZpb3VzbHkgaGFkLCBkbyBub3RoaW5nLlxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkU2Vzc2lvbiAmJiBvbGRTZXNzaW9uLmlkID09PSBtb2RlbC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgZGlzcG9zZSBvZiB0aGUgb2xkIHNlc3Npb24gYW5kIHJlc2V0IHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIGEgbmV3IENvbXBsZXRpb25Db25uZWN0b3IuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYWN0aXZlU2Vzc2lvbnNbZmlsZS5pZF07XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRTZXNzaW9uLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gc2Vzc2lvbnMuY29ubmVjdFRvKHsgbW9kZWwgfSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVNlc3Npb25zW2ZpbGUuaWRdID0gc2Vzc2lvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSBhY3RpdmVTZXNzaW9uc1tmaWxlLmlkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb24uZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGFjdGl2ZVNlc3Npb25zW2ZpbGUuaWRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIG9uUnVubmluZ0NoYW5nZWQoc2Vzc2lvbnMsIHRvQXJyYXkoc2Vzc2lvbnMucnVubmluZygpKSk7XG4gICAgICAgIHNlc3Npb25zLnJ1bm5pbmdDaGFuZ2VkLmNvbm5lY3Qob25SdW5uaW5nQ2hhbmdlZCk7XG4gICAgICAgIC8vIENsZWFuIHVwIGFmdGVyIGEgd2lkZ2V0IHdoZW4gaXQgaXMgZGlzcG9zZWRcbiAgICAgICAgZWRpdG9yVHJhY2tlci53aWRnZXRBZGRlZC5jb25uZWN0KChzZW5kZXIsIHdpZGdldCkgPT4ge1xuICAgICAgICAgICAgd2lkZ2V0LmRpc3Bvc2VkLmNvbm5lY3QodyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGFjdGl2ZVNlc3Npb25zW3cuaWRdO1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24uZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYWN0aXZlU2Vzc2lvbnNbdy5pZF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBZGQgdG9vbHRpcCBsYXVuY2ggY29tbWFuZC5cbiAgICAgICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5sYXVuY2hGaWxlLCB7XG4gICAgICAgICAgICBleGVjdXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZWRpdG9yVHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbCA9IHBhcmVudCAmJlxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVTZXNzaW9uc1twYXJlbnQuaWRdICYmXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVNlc3Npb25zW3BhcmVudC5pZF0ua2VybmVsO1xuICAgICAgICAgICAgICAgIGlmICgha2VybmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gcGFyZW50LmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gYW5jaG9yID09PSBudWxsIHx8IGFuY2hvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogYW5jaG9yLmVkaXRvcjtcbiAgICAgICAgICAgICAgICAvLyBJZiBhbGwgY29tcG9uZW50cyBuZWNlc3NhcnkgZm9yIHJlbmRlcmluZyBleGlzdCwgY3JlYXRlIGEgdG9vbHRpcC5cbiAgICAgICAgICAgICAgICBpZiAoISFlZGl0b3IgJiYgISFrZXJuZWwgJiYgISFyZW5kZXJtaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYW5hZ2VyLmludm9rZSh7IGFuY2hvciwgZWRpdG9yLCBrZXJuZWwsIHJlbmRlcm1pbWUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuLyoqXG4gKiBFeHBvcnQgdGhlIHBsdWdpbnMgYXMgZGVmYXVsdC5cbiAqL1xuY29uc3QgcGx1Z2lucyA9IFtcbiAgICBtYW5hZ2VyLFxuICAgIGNvbnNvbGVzLFxuICAgIG5vdGVib29rcyxcbiAgICBmaWxlc1xuXTtcbmV4cG9ydCBkZWZhdWx0IHBsdWdpbnM7XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogQSBjb3VudGVyIGZvciBvdXRzdGFuZGluZyByZXF1ZXN0cy5cbiAgICAgKi9cbiAgICBsZXQgcGVuZGluZyA9IDA7XG4gICAgLyoqXG4gICAgICogRmV0Y2ggYSB0b29sdGlwJ3MgY29udGVudCBmcm9tIHRoZSBBUEkgc2VydmVyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZldGNoKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyBkZXRhaWwsIGVkaXRvciwga2VybmVsIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBjb2RlID0gZWRpdG9yLm1vZGVsLnZhbHVlLnRleHQ7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IFRleHQuanNJbmRleFRvQ2hhckluZGV4KGVkaXRvci5nZXRPZmZzZXRBdChwb3NpdGlvbiksIGNvZGUpO1xuICAgICAgICAvLyBDbGVhciBoaW50cyBpZiB0aGUgbmV3IHRleHQgdmFsdWUgaXMgZW1wdHkgb3Iga2VybmVsIGlzIHVuYXZhaWxhYmxlLlxuICAgICAgICBpZiAoIWNvZGUgfHwgIWtlcm5lbCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29udGVudHMgPSB7XG4gICAgICAgICAgICBjb2RlLFxuICAgICAgICAgICAgY3Vyc29yX3Bvczogb2Zmc2V0LFxuICAgICAgICAgICAgZGV0YWlsX2xldmVsOiBkZXRhaWwgfHwgMFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gKytwZW5kaW5nO1xuICAgICAgICByZXR1cm4ga2VybmVsLnJlcXVlc3RJbnNwZWN0KGNvbnRlbnRzKS50aGVuKG1zZyA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG1zZy5jb250ZW50O1xuICAgICAgICAgICAgLy8gSWYgYSBuZXdlciByZXF1ZXN0IGlzIHBlbmRpbmcsIGJhaWwuXG4gICAgICAgICAgICBpZiAoY3VycmVudCAhPT0gcGVuZGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh2b2lkIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgcmVxdWVzdCBmYWlscyBvciByZXR1cm5zIG5lZ2F0aXZlIHJlc3VsdHMsIGJhaWwuXG4gICAgICAgICAgICBpZiAodmFsdWUuc3RhdHVzICE9PSAnb2snIHx8ICF2YWx1ZS5mb3VuZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCh2b2lkIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5kYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFByaXZhdGUuZmV0Y2ggPSBmZXRjaDtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==