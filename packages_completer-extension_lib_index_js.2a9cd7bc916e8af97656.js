(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_completer-extension_lib_index_js"],{

/***/ "../../packages/completer-extension/lib/index.js":
/*!*******************************************************!*\
  !*** ../../packages/completer-extension/lib/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/completer */ "webpack/sharing/consume/default/@jupyterlab/completer/@jupyterlab/completer");
/* harmony import */ var _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/console */ "webpack/sharing/consume/default/@jupyterlab/console/@jupyterlab/console");
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_console__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/fileeditor */ "webpack/sharing/consume/default/@jupyterlab/fileeditor/@jupyterlab/fileeditor");
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_5__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module completer-extension
 */






/**
 * The command IDs used by the completer plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.invoke = 'completer:invoke';
    CommandIDs.invokeConsole = 'completer:invoke-console';
    CommandIDs.invokeNotebook = 'completer:invoke-notebook';
    CommandIDs.invokeFile = 'completer:invoke-file';
    CommandIDs.select = 'completer:select';
    CommandIDs.selectConsole = 'completer:select-console';
    CommandIDs.selectNotebook = 'completer:select-notebook';
    CommandIDs.selectFile = 'completer:select-file';
})(CommandIDs || (CommandIDs = {}));
/**
 * A plugin providing code completion for editors.
 */
const manager = {
    id: '@jupyterlab/completer-extension:manager',
    autoStart: true,
    provides: _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.ICompletionManager,
    activate: (app) => {
        const handlers = {};
        app.commands.addCommand(CommandIDs.invoke, {
            execute: args => {
                const id = args && args['id'];
                if (!id) {
                    return;
                }
                const handler = handlers[id];
                if (handler) {
                    handler.invoke();
                }
            }
        });
        app.commands.addCommand(CommandIDs.select, {
            execute: args => {
                const id = args && args['id'];
                if (!id) {
                    return;
                }
                const handler = handlers[id];
                if (handler) {
                    handler.completer.selectActive();
                }
            }
        });
        return {
            register: (completable, renderer = _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.Completer.defaultRenderer) => {
                const { connector, editor, parent } = completable;
                const model = new _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.CompleterModel();
                const completer = new _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.Completer({ editor, model, renderer });
                const handler = new _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.CompletionHandler({
                    completer,
                    connector
                });
                const id = parent.id;
                // Hide the widget when it first loads.
                completer.hide();
                // Associate the handler with the parent widget.
                handlers[id] = handler;
                // Set the handler's editor.
                handler.editor = editor;
                // Attach the completer widget.
                _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Widget.attach(completer, document.body);
                // Listen for parent disposal.
                parent.disposed.connect(() => {
                    delete handlers[id];
                    model.dispose();
                    completer.dispose();
                    handler.dispose();
                });
                return handler;
            }
        };
    }
};
/**
 * An extension that registers consoles for code completion.
 */
const consoles = {
    id: '@jupyterlab/completer-extension:consoles',
    requires: [_jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.ICompletionManager, _jupyterlab_console__WEBPACK_IMPORTED_MODULE_1__.IConsoleTracker],
    autoStart: true,
    activate: (app, manager, consoles) => {
        // Create a handler for each console that is created.
        consoles.widgetAdded.connect((sender, widget) => {
            var _a, _b;
            const anchor = widget.console;
            const editor = (_b = (_a = anchor.promptCell) === null || _a === void 0 ? void 0 : _a.editor) !== null && _b !== void 0 ? _b : null;
            const session = anchor.sessionContext.session;
            // TODO: CompletionConnector assumes editor and session are not null
            const connector = new _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.CompletionConnector({ session, editor });
            const handler = manager.register({ connector, editor, parent: widget });
            const updateConnector = () => {
                var _a, _b;
                const editor = (_b = (_a = anchor.promptCell) === null || _a === void 0 ? void 0 : _a.editor) !== null && _b !== void 0 ? _b : null;
                const session = anchor.sessionContext.session;
                handler.editor = editor;
                // TODO: CompletionConnector assumes editor and session are not null
                handler.connector = new _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.CompletionConnector({ session, editor });
            };
            // Update the handler whenever the prompt or session changes
            anchor.promptCellCreated.connect(updateConnector);
            anchor.sessionContext.sessionChanged.connect(updateConnector);
        });
        // Add console completer invoke command.
        app.commands.addCommand(CommandIDs.invokeConsole, {
            execute: () => {
                const id = consoles.currentWidget && consoles.currentWidget.id;
                if (id) {
                    return app.commands.execute(CommandIDs.invoke, { id });
                }
            }
        });
        // Add console completer select command.
        app.commands.addCommand(CommandIDs.selectConsole, {
            execute: () => {
                const id = consoles.currentWidget && consoles.currentWidget.id;
                if (id) {
                    return app.commands.execute(CommandIDs.select, { id });
                }
            }
        });
        // Set enter key for console completer select command.
        app.commands.addKeyBinding({
            command: CommandIDs.selectConsole,
            keys: ['Enter'],
            selector: `.jp-ConsolePanel .jp-mod-completer-active`
        });
    }
};
/**
 * An extension that registers notebooks for code completion.
 */
const notebooks = {
    id: '@jupyterlab/completer-extension:notebooks',
    requires: [_jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.ICompletionManager, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__.INotebookTracker],
    autoStart: true,
    activate: (app, manager, notebooks) => {
        // Create a handler for each notebook that is created.
        notebooks.widgetAdded.connect((sender, panel) => {
            var _a, _b;
            const editor = (_b = (_a = panel.content.activeCell) === null || _a === void 0 ? void 0 : _a.editor) !== null && _b !== void 0 ? _b : null;
            const session = panel.sessionContext.session;
            // TODO: CompletionConnector assumes editor and session are not null
            const connector = new _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.CompletionConnector({ session, editor });
            const handler = manager.register({ connector, editor, parent: panel });
            const updateConnector = () => {
                var _a, _b;
                const editor = (_b = (_a = panel.content.activeCell) === null || _a === void 0 ? void 0 : _a.editor) !== null && _b !== void 0 ? _b : null;
                const session = panel.sessionContext.session;
                handler.editor = editor;
                // TODO: CompletionConnector assumes editor and session are not null
                handler.connector = new _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.CompletionConnector({ session, editor });
            };
            // Update the handler whenever the prompt or session changes
            panel.content.activeCellChanged.connect(updateConnector);
            panel.sessionContext.sessionChanged.connect(updateConnector);
        });
        // Add notebook completer command.
        app.commands.addCommand(CommandIDs.invokeNotebook, {
            execute: () => {
                var _a;
                const panel = notebooks.currentWidget;
                if (panel && ((_a = panel.content.activeCell) === null || _a === void 0 ? void 0 : _a.model.type) === 'code') {
                    return app.commands.execute(CommandIDs.invoke, { id: panel.id });
                }
            }
        });
        // Add notebook completer select command.
        app.commands.addCommand(CommandIDs.selectNotebook, {
            execute: () => {
                const id = notebooks.currentWidget && notebooks.currentWidget.id;
                if (id) {
                    return app.commands.execute(CommandIDs.select, { id });
                }
            }
        });
        // Set enter key for notebook completer select command.
        app.commands.addKeyBinding({
            command: CommandIDs.selectNotebook,
            keys: ['Enter'],
            selector: `.jp-Notebook .jp-mod-completer-active`
        });
    }
};
/**
 * An extension that registers file editors for completion.
 */
const files = {
    id: '@jupyterlab/completer-extension:files',
    requires: [_jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.ICompletionManager, _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_2__.IEditorTracker],
    autoStart: true,
    activate: (app, manager, editorTracker) => {
        // Keep a list of active ISessions so that we can
        // clean them up when they are no longer needed.
        const activeSessions = {};
        // When a new file editor is created, make the completer for it.
        editorTracker.widgetAdded.connect((sender, widget) => {
            const sessions = app.serviceManager.sessions;
            const editor = widget.content.editor;
            const contextConnector = new _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.ContextConnector({ editor });
            // Initially create the handler with the contextConnector.
            // If a kernel session is found matching this file editor,
            // it will be replaced in onRunningChanged().
            const handler = manager.register({
                connector: contextConnector,
                editor,
                parent: widget
            });
            // When the list of running sessions changes,
            // check to see if there are any kernels with a
            // matching path for this file editor.
            const onRunningChanged = (sender, models) => {
                const oldSession = activeSessions[widget.id];
                // Search for a matching path.
                const model = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.find)(models, m => m.path === widget.context.path);
                if (model) {
                    // If there is a matching path, but it is the same
                    // session as we previously had, do nothing.
                    if (oldSession && oldSession.id === model.id) {
                        return;
                    }
                    // Otherwise, dispose of the old session and reset to
                    // a new CompletionConnector.
                    if (oldSession) {
                        delete activeSessions[widget.id];
                        oldSession.dispose();
                    }
                    const session = sessions.connectTo({ model });
                    handler.connector = new _jupyterlab_completer__WEBPACK_IMPORTED_MODULE_0__.CompletionConnector({ session, editor });
                    activeSessions[widget.id] = session;
                }
                else {
                    // If we didn't find a match, make sure
                    // the connector is the contextConnector and
                    // dispose of any previous connection.
                    handler.connector = contextConnector;
                    if (oldSession) {
                        delete activeSessions[widget.id];
                        oldSession.dispose();
                    }
                }
            };
            onRunningChanged(sessions, (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.toArray)(sessions.running()));
            sessions.runningChanged.connect(onRunningChanged);
            // When the widget is disposed, do some cleanup.
            widget.disposed.connect(() => {
                sessions.runningChanged.disconnect(onRunningChanged);
                const session = activeSessions[widget.id];
                if (session) {
                    delete activeSessions[widget.id];
                    session.dispose();
                }
            });
        });
        // Add console completer invoke command.
        app.commands.addCommand(CommandIDs.invokeFile, {
            execute: () => {
                const id = editorTracker.currentWidget && editorTracker.currentWidget.id;
                if (id) {
                    return app.commands.execute(CommandIDs.invoke, { id });
                }
            }
        });
        // Add console completer select command.
        app.commands.addCommand(CommandIDs.selectFile, {
            execute: () => {
                const id = editorTracker.currentWidget && editorTracker.currentWidget.id;
                if (id) {
                    return app.commands.execute(CommandIDs.select, { id });
                }
            }
        });
        // Set enter key for console completer select command.
        app.commands.addKeyBinding({
            command: CommandIDs.selectFile,
            keys: ['Enter'],
            selector: `.jp-FileEditor .jp-mod-completer-active`
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
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29tcGxldGVyLWV4dGVuc2lvbi9saWIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNnSjtBQUMxRjtBQUNFO0FBQ0E7QUFDTjtBQUNUO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxxRUFBa0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLCtDQUErQyw0RUFBeUI7QUFDeEUsdUJBQXVCLDRCQUE0QjtBQUNuRCxrQ0FBa0MsaUVBQWM7QUFDaEQsc0NBQXNDLDREQUFTLEVBQUUsMEJBQTBCO0FBQzNFLG9DQUFvQyxvRUFBaUI7QUFDckQ7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDBEQUFhO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscUVBQWtCLEVBQUUsZ0VBQWU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHNFQUFtQixFQUFFLGtCQUFrQjtBQUN6RSw4Q0FBOEMsb0NBQW9DO0FBQ2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxzRUFBbUIsRUFBRSxrQkFBa0I7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxLQUFLO0FBQ3pFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxLQUFLO0FBQ3pFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUscUVBQWtCLEVBQUUsa0VBQWdCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msc0VBQW1CLEVBQUUsa0JBQWtCO0FBQ3pFLDhDQUE4QyxtQ0FBbUM7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLHNFQUFtQixFQUFFLGtCQUFrQjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0UsZUFBZTtBQUNuRjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0UsS0FBSztBQUN6RTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHFFQUFrQixFQUFFLGtFQUFjO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxtRUFBZ0IsRUFBRSxTQUFTO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qix1REFBSTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsUUFBUTtBQUNoRSw0Q0FBNEMsc0VBQW1CLEVBQUUsa0JBQWtCO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDBEQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxLQUFLO0FBQ3pFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxLQUFLO0FBQ3pFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsT0FBTyxFQUFDO0FBQ3ZCLGlDIiwiZmlsZSI6InBhY2thZ2VzX2NvbXBsZXRlci1leHRlbnNpb25fbGliX2luZGV4X2pzLjJhOWNkN2JjOTE2ZThhZjk3NjU2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgY29tcGxldGVyLWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBDb21wbGV0ZXIsIENvbXBsZXRlck1vZGVsLCBDb21wbGV0aW9uQ29ubmVjdG9yLCBDb21wbGV0aW9uSGFuZGxlciwgQ29udGV4dENvbm5lY3RvciwgSUNvbXBsZXRpb25NYW5hZ2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29tcGxldGVyJztcbmltcG9ydCB7IElDb25zb2xlVHJhY2tlciB9IGZyb20gJ0BqdXB5dGVybGFiL2NvbnNvbGUnO1xuaW1wb3J0IHsgSUVkaXRvclRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9maWxlZWRpdG9yJztcbmltcG9ydCB7IElOb3RlYm9va1RyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9ub3RlYm9vayc7XG5pbXBvcnQgeyBmaW5kLCB0b0FycmF5IH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgV2lkZ2V0IH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbi8qKlxuICogVGhlIGNvbW1hbmQgSURzIHVzZWQgYnkgdGhlIGNvbXBsZXRlciBwbHVnaW4uXG4gKi9cbnZhciBDb21tYW5kSURzO1xuKGZ1bmN0aW9uIChDb21tYW5kSURzKSB7XG4gICAgQ29tbWFuZElEcy5pbnZva2UgPSAnY29tcGxldGVyOmludm9rZSc7XG4gICAgQ29tbWFuZElEcy5pbnZva2VDb25zb2xlID0gJ2NvbXBsZXRlcjppbnZva2UtY29uc29sZSc7XG4gICAgQ29tbWFuZElEcy5pbnZva2VOb3RlYm9vayA9ICdjb21wbGV0ZXI6aW52b2tlLW5vdGVib29rJztcbiAgICBDb21tYW5kSURzLmludm9rZUZpbGUgPSAnY29tcGxldGVyOmludm9rZS1maWxlJztcbiAgICBDb21tYW5kSURzLnNlbGVjdCA9ICdjb21wbGV0ZXI6c2VsZWN0JztcbiAgICBDb21tYW5kSURzLnNlbGVjdENvbnNvbGUgPSAnY29tcGxldGVyOnNlbGVjdC1jb25zb2xlJztcbiAgICBDb21tYW5kSURzLnNlbGVjdE5vdGVib29rID0gJ2NvbXBsZXRlcjpzZWxlY3Qtbm90ZWJvb2snO1xuICAgIENvbW1hbmRJRHMuc2VsZWN0RmlsZSA9ICdjb21wbGV0ZXI6c2VsZWN0LWZpbGUnO1xufSkoQ29tbWFuZElEcyB8fCAoQ29tbWFuZElEcyA9IHt9KSk7XG4vKipcbiAqIEEgcGx1Z2luIHByb3ZpZGluZyBjb2RlIGNvbXBsZXRpb24gZm9yIGVkaXRvcnMuXG4gKi9cbmNvbnN0IG1hbmFnZXIgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9jb21wbGV0ZXItZXh0ZW5zaW9uOm1hbmFnZXInLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBwcm92aWRlczogSUNvbXBsZXRpb25NYW5hZ2VyLFxuICAgIGFjdGl2YXRlOiAoYXBwKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXJzID0ge307XG4gICAgICAgIGFwcC5jb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuaW52b2tlLCB7XG4gICAgICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGFyZ3MgJiYgYXJnc1snaWQnXTtcbiAgICAgICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLmludm9rZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGFwcC5jb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc2VsZWN0LCB7XG4gICAgICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGFyZ3MgJiYgYXJnc1snaWQnXTtcbiAgICAgICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzW2lkXTtcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLmNvbXBsZXRlci5zZWxlY3RBY3RpdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVnaXN0ZXI6IChjb21wbGV0YWJsZSwgcmVuZGVyZXIgPSBDb21wbGV0ZXIuZGVmYXVsdFJlbmRlcmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjb25uZWN0b3IsIGVkaXRvciwgcGFyZW50IH0gPSBjb21wbGV0YWJsZTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IG5ldyBDb21wbGV0ZXJNb2RlbCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlciA9IG5ldyBDb21wbGV0ZXIoeyBlZGl0b3IsIG1vZGVsLCByZW5kZXJlciB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gbmV3IENvbXBsZXRpb25IYW5kbGVyKHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVyLFxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0b3JcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IHBhcmVudC5pZDtcbiAgICAgICAgICAgICAgICAvLyBIaWRlIHRoZSB3aWRnZXQgd2hlbiBpdCBmaXJzdCBsb2Fkcy5cbiAgICAgICAgICAgICAgICBjb21wbGV0ZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIC8vIEFzc29jaWF0ZSB0aGUgaGFuZGxlciB3aXRoIHRoZSBwYXJlbnQgd2lkZ2V0LlxuICAgICAgICAgICAgICAgIGhhbmRsZXJzW2lkXSA9IGhhbmRsZXI7XG4gICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBoYW5kbGVyJ3MgZWRpdG9yLlxuICAgICAgICAgICAgICAgIGhhbmRsZXIuZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICAgICAgICAgIC8vIEF0dGFjaCB0aGUgY29tcGxldGVyIHdpZGdldC5cbiAgICAgICAgICAgICAgICBXaWRnZXQuYXR0YWNoKGNvbXBsZXRlciwgZG9jdW1lbnQuYm9keSk7XG4gICAgICAgICAgICAgICAgLy8gTGlzdGVuIGZvciBwYXJlbnQgZGlzcG9zYWwuXG4gICAgICAgICAgICAgICAgcGFyZW50LmRpc3Bvc2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgaGFuZGxlcnNbaWRdO1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlci5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn07XG4vKipcbiAqIEFuIGV4dGVuc2lvbiB0aGF0IHJlZ2lzdGVycyBjb25zb2xlcyBmb3IgY29kZSBjb21wbGV0aW9uLlxuICovXG5jb25zdCBjb25zb2xlcyA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2NvbXBsZXRlci1leHRlbnNpb246Y29uc29sZXMnLFxuICAgIHJlcXVpcmVzOiBbSUNvbXBsZXRpb25NYW5hZ2VyLCBJQ29uc29sZVRyYWNrZXJdLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgbWFuYWdlciwgY29uc29sZXMpID0+IHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgaGFuZGxlciBmb3IgZWFjaCBjb25zb2xlIHRoYXQgaXMgY3JlYXRlZC5cbiAgICAgICAgY29uc29sZXMud2lkZ2V0QWRkZWQuY29ubmVjdCgoc2VuZGVyLCB3aWRnZXQpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBjb25zdCBhbmNob3IgPSB3aWRnZXQuY29uc29sZTtcbiAgICAgICAgICAgIGNvbnN0IGVkaXRvciA9IChfYiA9IChfYSA9IGFuY2hvci5wcm9tcHRDZWxsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZWRpdG9yKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsO1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGFuY2hvci5zZXNzaW9uQ29udGV4dC5zZXNzaW9uO1xuICAgICAgICAgICAgLy8gVE9ETzogQ29tcGxldGlvbkNvbm5lY3RvciBhc3N1bWVzIGVkaXRvciBhbmQgc2Vzc2lvbiBhcmUgbm90IG51bGxcbiAgICAgICAgICAgIGNvbnN0IGNvbm5lY3RvciA9IG5ldyBDb21wbGV0aW9uQ29ubmVjdG9yKHsgc2Vzc2lvbiwgZWRpdG9yIH0pO1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IG1hbmFnZXIucmVnaXN0ZXIoeyBjb25uZWN0b3IsIGVkaXRvciwgcGFyZW50OiB3aWRnZXQgfSk7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVDb25uZWN0b3IgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0b3IgPSAoX2IgPSAoX2EgPSBhbmNob3IucHJvbXB0Q2VsbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmVkaXRvcikgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gYW5jaG9yLnNlc3Npb25Db250ZXh0LnNlc3Npb247XG4gICAgICAgICAgICAgICAgaGFuZGxlci5lZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogQ29tcGxldGlvbkNvbm5lY3RvciBhc3N1bWVzIGVkaXRvciBhbmQgc2Vzc2lvbiBhcmUgbm90IG51bGxcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNvbm5lY3RvciA9IG5ldyBDb21wbGV0aW9uQ29ubmVjdG9yKHsgc2Vzc2lvbiwgZWRpdG9yIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaGFuZGxlciB3aGVuZXZlciB0aGUgcHJvbXB0IG9yIHNlc3Npb24gY2hhbmdlc1xuICAgICAgICAgICAgYW5jaG9yLnByb21wdENlbGxDcmVhdGVkLmNvbm5lY3QodXBkYXRlQ29ubmVjdG9yKTtcbiAgICAgICAgICAgIGFuY2hvci5zZXNzaW9uQ29udGV4dC5zZXNzaW9uQ2hhbmdlZC5jb25uZWN0KHVwZGF0ZUNvbm5lY3Rvcik7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBZGQgY29uc29sZSBjb21wbGV0ZXIgaW52b2tlIGNvbW1hbmQuXG4gICAgICAgIGFwcC5jb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuaW52b2tlQ29uc29sZSwge1xuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gY29uc29sZXMuY3VycmVudFdpZGdldCAmJiBjb25zb2xlcy5jdXJyZW50V2lkZ2V0LmlkO1xuICAgICAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXBwLmNvbW1hbmRzLmV4ZWN1dGUoQ29tbWFuZElEcy5pbnZva2UsIHsgaWQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQWRkIGNvbnNvbGUgY29tcGxldGVyIHNlbGVjdCBjb21tYW5kLlxuICAgICAgICBhcHAuY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnNlbGVjdENvbnNvbGUsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGNvbnNvbGVzLmN1cnJlbnRXaWRnZXQgJiYgY29uc29sZXMuY3VycmVudFdpZGdldC5pZDtcbiAgICAgICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFwcC5jb21tYW5kcy5leGVjdXRlKENvbW1hbmRJRHMuc2VsZWN0LCB7IGlkIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFNldCBlbnRlciBrZXkgZm9yIGNvbnNvbGUgY29tcGxldGVyIHNlbGVjdCBjb21tYW5kLlxuICAgICAgICBhcHAuY29tbWFuZHMuYWRkS2V5QmluZGluZyh7XG4gICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLnNlbGVjdENvbnNvbGUsXG4gICAgICAgICAgICBrZXlzOiBbJ0VudGVyJ10sXG4gICAgICAgICAgICBzZWxlY3RvcjogYC5qcC1Db25zb2xlUGFuZWwgLmpwLW1vZC1jb21wbGV0ZXItYWN0aXZlYFxuICAgICAgICB9KTtcbiAgICB9XG59O1xuLyoqXG4gKiBBbiBleHRlbnNpb24gdGhhdCByZWdpc3RlcnMgbm90ZWJvb2tzIGZvciBjb2RlIGNvbXBsZXRpb24uXG4gKi9cbmNvbnN0IG5vdGVib29rcyA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2NvbXBsZXRlci1leHRlbnNpb246bm90ZWJvb2tzJyxcbiAgICByZXF1aXJlczogW0lDb21wbGV0aW9uTWFuYWdlciwgSU5vdGVib29rVHJhY2tlcl0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBtYW5hZ2VyLCBub3RlYm9va3MpID0+IHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgaGFuZGxlciBmb3IgZWFjaCBub3RlYm9vayB0aGF0IGlzIGNyZWF0ZWQuXG4gICAgICAgIG5vdGVib29rcy53aWRnZXRBZGRlZC5jb25uZWN0KChzZW5kZXIsIHBhbmVsKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gKF9iID0gKF9hID0gcGFuZWwuY29udGVudC5hY3RpdmVDZWxsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZWRpdG9yKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsO1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IHBhbmVsLnNlc3Npb25Db250ZXh0LnNlc3Npb247XG4gICAgICAgICAgICAvLyBUT0RPOiBDb21wbGV0aW9uQ29ubmVjdG9yIGFzc3VtZXMgZWRpdG9yIGFuZCBzZXNzaW9uIGFyZSBub3QgbnVsbFxuICAgICAgICAgICAgY29uc3QgY29ubmVjdG9yID0gbmV3IENvbXBsZXRpb25Db25uZWN0b3IoeyBzZXNzaW9uLCBlZGl0b3IgfSk7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gbWFuYWdlci5yZWdpc3Rlcih7IGNvbm5lY3RvciwgZWRpdG9yLCBwYXJlbnQ6IHBhbmVsIH0pO1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlQ29ubmVjdG9yID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gKF9iID0gKF9hID0gcGFuZWwuY29udGVudC5hY3RpdmVDZWxsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZWRpdG9yKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBudWxsO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSBwYW5lbC5zZXNzaW9uQ29udGV4dC5zZXNzaW9uO1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IENvbXBsZXRpb25Db25uZWN0b3IgYXNzdW1lcyBlZGl0b3IgYW5kIHNlc3Npb24gYXJlIG5vdCBudWxsXG4gICAgICAgICAgICAgICAgaGFuZGxlci5jb25uZWN0b3IgPSBuZXcgQ29tcGxldGlvbkNvbm5lY3Rvcih7IHNlc3Npb24sIGVkaXRvciB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGhhbmRsZXIgd2hlbmV2ZXIgdGhlIHByb21wdCBvciBzZXNzaW9uIGNoYW5nZXNcbiAgICAgICAgICAgIHBhbmVsLmNvbnRlbnQuYWN0aXZlQ2VsbENoYW5nZWQuY29ubmVjdCh1cGRhdGVDb25uZWN0b3IpO1xuICAgICAgICAgICAgcGFuZWwuc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbkNoYW5nZWQuY29ubmVjdCh1cGRhdGVDb25uZWN0b3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gQWRkIG5vdGVib29rIGNvbXBsZXRlciBjb21tYW5kLlxuICAgICAgICBhcHAuY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmludm9rZU5vdGVib29rLCB7XG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhbmVsID0gbm90ZWJvb2tzLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHBhbmVsICYmICgoX2EgPSBwYW5lbC5jb250ZW50LmFjdGl2ZUNlbGwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tb2RlbC50eXBlKSA9PT0gJ2NvZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcHAuY29tbWFuZHMuZXhlY3V0ZShDb21tYW5kSURzLmludm9rZSwgeyBpZDogcGFuZWwuaWQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQWRkIG5vdGVib29rIGNvbXBsZXRlciBzZWxlY3QgY29tbWFuZC5cbiAgICAgICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zZWxlY3ROb3RlYm9vaywge1xuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gbm90ZWJvb2tzLmN1cnJlbnRXaWRnZXQgJiYgbm90ZWJvb2tzLmN1cnJlbnRXaWRnZXQuaWQ7XG4gICAgICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcHAuY29tbWFuZHMuZXhlY3V0ZShDb21tYW5kSURzLnNlbGVjdCwgeyBpZCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBTZXQgZW50ZXIga2V5IGZvciBub3RlYm9vayBjb21wbGV0ZXIgc2VsZWN0IGNvbW1hbmQuXG4gICAgICAgIGFwcC5jb21tYW5kcy5hZGRLZXlCaW5kaW5nKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuc2VsZWN0Tm90ZWJvb2ssXG4gICAgICAgICAgICBrZXlzOiBbJ0VudGVyJ10sXG4gICAgICAgICAgICBzZWxlY3RvcjogYC5qcC1Ob3RlYm9vayAuanAtbW9kLWNvbXBsZXRlci1hY3RpdmVgXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIEFuIGV4dGVuc2lvbiB0aGF0IHJlZ2lzdGVycyBmaWxlIGVkaXRvcnMgZm9yIGNvbXBsZXRpb24uXG4gKi9cbmNvbnN0IGZpbGVzID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvY29tcGxldGVyLWV4dGVuc2lvbjpmaWxlcycsXG4gICAgcmVxdWlyZXM6IFtJQ29tcGxldGlvbk1hbmFnZXIsIElFZGl0b3JUcmFja2VyXSxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgYWN0aXZhdGU6IChhcHAsIG1hbmFnZXIsIGVkaXRvclRyYWNrZXIpID0+IHtcbiAgICAgICAgLy8gS2VlcCBhIGxpc3Qgb2YgYWN0aXZlIElTZXNzaW9ucyBzbyB0aGF0IHdlIGNhblxuICAgICAgICAvLyBjbGVhbiB0aGVtIHVwIHdoZW4gdGhleSBhcmUgbm8gbG9uZ2VyIG5lZWRlZC5cbiAgICAgICAgY29uc3QgYWN0aXZlU2Vzc2lvbnMgPSB7fTtcbiAgICAgICAgLy8gV2hlbiBhIG5ldyBmaWxlIGVkaXRvciBpcyBjcmVhdGVkLCBtYWtlIHRoZSBjb21wbGV0ZXIgZm9yIGl0LlxuICAgICAgICBlZGl0b3JUcmFja2VyLndpZGdldEFkZGVkLmNvbm5lY3QoKHNlbmRlciwgd2lkZ2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9ucyA9IGFwcC5zZXJ2aWNlTWFuYWdlci5zZXNzaW9ucztcbiAgICAgICAgICAgIGNvbnN0IGVkaXRvciA9IHdpZGdldC5jb250ZW50LmVkaXRvcjtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRleHRDb25uZWN0b3IgPSBuZXcgQ29udGV4dENvbm5lY3Rvcih7IGVkaXRvciB9KTtcbiAgICAgICAgICAgIC8vIEluaXRpYWxseSBjcmVhdGUgdGhlIGhhbmRsZXIgd2l0aCB0aGUgY29udGV4dENvbm5lY3Rvci5cbiAgICAgICAgICAgIC8vIElmIGEga2VybmVsIHNlc3Npb24gaXMgZm91bmQgbWF0Y2hpbmcgdGhpcyBmaWxlIGVkaXRvcixcbiAgICAgICAgICAgIC8vIGl0IHdpbGwgYmUgcmVwbGFjZWQgaW4gb25SdW5uaW5nQ2hhbmdlZCgpLlxuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IG1hbmFnZXIucmVnaXN0ZXIoe1xuICAgICAgICAgICAgICAgIGNvbm5lY3RvcjogY29udGV4dENvbm5lY3RvcixcbiAgICAgICAgICAgICAgICBlZGl0b3IsXG4gICAgICAgICAgICAgICAgcGFyZW50OiB3aWRnZXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gV2hlbiB0aGUgbGlzdCBvZiBydW5uaW5nIHNlc3Npb25zIGNoYW5nZXMsXG4gICAgICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlcmUgYXJlIGFueSBrZXJuZWxzIHdpdGggYVxuICAgICAgICAgICAgLy8gbWF0Y2hpbmcgcGF0aCBmb3IgdGhpcyBmaWxlIGVkaXRvci5cbiAgICAgICAgICAgIGNvbnN0IG9uUnVubmluZ0NoYW5nZWQgPSAoc2VuZGVyLCBtb2RlbHMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRTZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnNbd2lkZ2V0LmlkXTtcbiAgICAgICAgICAgICAgICAvLyBTZWFyY2ggZm9yIGEgbWF0Y2hpbmcgcGF0aC5cbiAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IGZpbmQobW9kZWxzLCBtID0+IG0ucGF0aCA9PT0gd2lkZ2V0LmNvbnRleHQucGF0aCk7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgbWF0Y2hpbmcgcGF0aCwgYnV0IGl0IGlzIHRoZSBzYW1lXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlc3Npb24gYXMgd2UgcHJldmlvdXNseSBoYWQsIGRvIG5vdGhpbmcuXG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRTZXNzaW9uICYmIG9sZFNlc3Npb24uaWQgPT09IG1vZGVsLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBkaXNwb3NlIG9mIHRoZSBvbGQgc2Vzc2lvbiBhbmQgcmVzZXQgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gYSBuZXcgQ29tcGxldGlvbkNvbm5lY3Rvci5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhY3RpdmVTZXNzaW9uc1t3aWRnZXQuaWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2xkU2Vzc2lvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IHNlc3Npb25zLmNvbm5lY3RUbyh7IG1vZGVsIH0pO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLmNvbm5lY3RvciA9IG5ldyBDb21wbGV0aW9uQ29ubmVjdG9yKHsgc2Vzc2lvbiwgZWRpdG9yIH0pO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVTZXNzaW9uc1t3aWRnZXQuaWRdID0gc2Vzc2lvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGRpZG4ndCBmaW5kIGEgbWF0Y2gsIG1ha2Ugc3VyZVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgY29ubmVjdG9yIGlzIHRoZSBjb250ZXh0Q29ubmVjdG9yIGFuZFxuICAgICAgICAgICAgICAgICAgICAvLyBkaXNwb3NlIG9mIGFueSBwcmV2aW91cyBjb25uZWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLmNvbm5lY3RvciA9IGNvbnRleHRDb25uZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbGRTZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYWN0aXZlU2Vzc2lvbnNbd2lkZ2V0LmlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFNlc3Npb24uZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG9uUnVubmluZ0NoYW5nZWQoc2Vzc2lvbnMsIHRvQXJyYXkoc2Vzc2lvbnMucnVubmluZygpKSk7XG4gICAgICAgICAgICBzZXNzaW9ucy5ydW5uaW5nQ2hhbmdlZC5jb25uZWN0KG9uUnVubmluZ0NoYW5nZWQpO1xuICAgICAgICAgICAgLy8gV2hlbiB0aGUgd2lkZ2V0IGlzIGRpc3Bvc2VkLCBkbyBzb21lIGNsZWFudXAuXG4gICAgICAgICAgICB3aWRnZXQuZGlzcG9zZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbnMucnVubmluZ0NoYW5nZWQuZGlzY29ubmVjdChvblJ1bm5pbmdDaGFuZ2VkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnNbd2lkZ2V0LmlkXTtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYWN0aXZlU2Vzc2lvbnNbd2lkZ2V0LmlkXTtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbi5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBZGQgY29uc29sZSBjb21wbGV0ZXIgaW52b2tlIGNvbW1hbmQuXG4gICAgICAgIGFwcC5jb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuaW52b2tlRmlsZSwge1xuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gZWRpdG9yVHJhY2tlci5jdXJyZW50V2lkZ2V0ICYmIGVkaXRvclRyYWNrZXIuY3VycmVudFdpZGdldC5pZDtcbiAgICAgICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFwcC5jb21tYW5kcy5leGVjdXRlKENvbW1hbmRJRHMuaW52b2tlLCB7IGlkIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCBjb25zb2xlIGNvbXBsZXRlciBzZWxlY3QgY29tbWFuZC5cbiAgICAgICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zZWxlY3RGaWxlLCB7XG4gICAgICAgICAgICBleGVjdXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSBlZGl0b3JUcmFja2VyLmN1cnJlbnRXaWRnZXQgJiYgZWRpdG9yVHJhY2tlci5jdXJyZW50V2lkZ2V0LmlkO1xuICAgICAgICAgICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXBwLmNvbW1hbmRzLmV4ZWN1dGUoQ29tbWFuZElEcy5zZWxlY3QsIHsgaWQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gU2V0IGVudGVyIGtleSBmb3IgY29uc29sZSBjb21wbGV0ZXIgc2VsZWN0IGNvbW1hbmQuXG4gICAgICAgIGFwcC5jb21tYW5kcy5hZGRLZXlCaW5kaW5nKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuc2VsZWN0RmlsZSxcbiAgICAgICAgICAgIGtleXM6IFsnRW50ZXInXSxcbiAgICAgICAgICAgIHNlbGVjdG9yOiBgLmpwLUZpbGVFZGl0b3IgLmpwLW1vZC1jb21wbGV0ZXItYWN0aXZlYFxuICAgICAgICB9KTtcbiAgICB9XG59O1xuLyoqXG4gKiBFeHBvcnQgdGhlIHBsdWdpbnMgYXMgZGVmYXVsdC5cbiAqL1xuY29uc3QgcGx1Z2lucyA9IFtcbiAgICBtYW5hZ2VyLFxuICAgIGNvbnNvbGVzLFxuICAgIG5vdGVib29rcyxcbiAgICBmaWxlc1xuXTtcbmV4cG9ydCBkZWZhdWx0IHBsdWdpbnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9