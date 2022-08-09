(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_debugger-extension_lib_index_js"],{

/***/ "../../packages/debugger-extension/lib/index.js":
/*!******************************************************!*\
  !*** ../../packages/debugger-extension/lib/index.js ***!
  \******************************************************/
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
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/codemirror */ "webpack/sharing/consume/default/@jupyterlab/codemirror/@jupyterlab/codemirror");
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/console */ "webpack/sharing/consume/default/@jupyterlab/console/@jupyterlab/console");
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_console__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/debugger */ "webpack/sharing/consume/default/@jupyterlab/debugger/@jupyterlab/debugger");
/* harmony import */ var _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/fileeditor */ "webpack/sharing/consume/default/@jupyterlab/fileeditor/@jupyterlab/fileeditor");
/* harmony import */ var _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jupyterlab/logconsole */ "webpack/sharing/consume/default/@jupyterlab/logconsole/@jupyterlab/logconsole");
/* harmony import */ var _jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_13__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module debugger-extension
 */














/**
 * A plugin that provides visual debugging support for consoles.
 */
const consoles = {
    id: '@jupyterlab/debugger-extension:consoles',
    autoStart: true,
    requires: [_jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebugger, _jupyterlab_console__WEBPACK_IMPORTED_MODULE_4__.IConsoleTracker],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell],
    activate: (app, debug, consoleTracker, labShell) => {
        const handler = new _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Handler({
            type: 'console',
            shell: app.shell,
            service: debug
        });
        const updateHandlerAndCommands = async (widget) => {
            const { sessionContext } = widget;
            await sessionContext.ready;
            await handler.updateContext(widget, sessionContext);
            app.commands.notifyCommandChanged();
        };
        if (labShell) {
            labShell.currentChanged.connect((_, update) => {
                const widget = update.newValue;
                if (widget instanceof _jupyterlab_console__WEBPACK_IMPORTED_MODULE_4__.ConsolePanel) {
                    void updateHandlerAndCommands(widget);
                }
            });
        }
        else {
            consoleTracker.currentChanged.connect((_, consolePanel) => {
                if (consolePanel) {
                    void updateHandlerAndCommands(consolePanel);
                }
            });
        }
    }
};
/**
 * A plugin that provides visual debugging support for file editors.
 */
const files = {
    id: '@jupyterlab/debugger-extension:files',
    autoStart: true,
    requires: [_jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebugger, _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_8__.IEditorTracker],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell],
    activate: (app, debug, editorTracker, labShell) => {
        const handler = new _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Handler({
            type: 'file',
            shell: app.shell,
            service: debug
        });
        const activeSessions = {};
        const updateHandlerAndCommands = async (widget) => {
            const sessions = app.serviceManager.sessions;
            try {
                const model = await sessions.findByPath(widget.context.path);
                if (!model) {
                    return;
                }
                let session = activeSessions[model.id];
                if (!session) {
                    // Use `connectTo` only if the session does not exist.
                    // `connectTo` sends a kernel_info_request on the shell
                    // channel, which blocks the debug session restore when waiting
                    // for the kernel to be ready
                    session = sessions.connectTo({ model });
                    activeSessions[model.id] = session;
                }
                await handler.update(widget, session);
                app.commands.notifyCommandChanged();
            }
            catch (_a) {
                return;
            }
        };
        if (labShell) {
            labShell.currentChanged.connect((_, update) => {
                const widget = update.newValue;
                if (widget instanceof _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_7__.DocumentWidget) {
                    const { content } = widget;
                    if (content instanceof _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_8__.FileEditor) {
                        void updateHandlerAndCommands(widget);
                    }
                }
            });
        }
        else {
            editorTracker.currentChanged.connect((_, documentWidget) => {
                if (documentWidget) {
                    void updateHandlerAndCommands(documentWidget);
                }
            });
        }
    }
};
/**
 * A plugin that provides visual debugging support for notebooks.
 */
const notebooks = {
    id: '@jupyterlab/debugger-extension:notebooks',
    autoStart: true,
    requires: [_jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebugger, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookTracker, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_13__.ITranslator],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    provides: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebuggerHandler,
    activate: (app, service, notebookTracker, translator, labShell, palette) => {
        const handler = new _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Handler({
            type: 'notebook',
            shell: app.shell,
            service
        });
        const trans = translator.load('jupyterlab');
        app.commands.addCommand(_jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.CommandIDs.restartDebug, {
            label: trans.__('Restart Kernel and Debug…'),
            caption: trans.__('Restart Kernel and Debug…'),
            isEnabled: () => service.isStarted,
            execute: async () => {
                const state = service.getDebuggerState();
                await service.stop();
                const widget = notebookTracker.currentWidget;
                if (!widget) {
                    return;
                }
                const { content, sessionContext } = widget;
                const restarted = await _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.sessionContextDialogs.restart(sessionContext);
                if (!restarted) {
                    return;
                }
                await service.restoreDebuggerState(state);
                await handler.updateWidget(widget, sessionContext.session);
                await _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookActions.runAll(content, sessionContext);
            }
        });
        const updateHandlerAndCommands = async (widget) => {
            if (widget) {
                const { sessionContext } = widget;
                await sessionContext.ready;
                await handler.updateContext(widget, sessionContext);
            }
            app.commands.notifyCommandChanged();
        };
        if (labShell) {
            labShell.currentChanged.connect((_, update) => {
                const widget = update.newValue;
                if (widget instanceof _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookPanel) {
                    void updateHandlerAndCommands(widget);
                }
            });
        }
        else {
            notebookTracker.currentChanged.connect((_, notebookPanel) => {
                if (notebookPanel) {
                    void updateHandlerAndCommands(notebookPanel);
                }
            });
        }
        if (palette) {
            palette.addItem({
                category: 'Notebook Operations',
                command: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.CommandIDs.restartDebug
            });
        }
        return handler;
    }
};
/**
 * A plugin that provides a debugger service.
 */
const service = {
    id: '@jupyterlab/debugger-extension:service',
    autoStart: true,
    provides: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebugger,
    requires: [_jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebuggerConfig],
    optional: [_jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebuggerSources],
    activate: (app, config, debuggerSources) => new _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Service({
        config,
        debuggerSources,
        specsManager: app.serviceManager.kernelspecs
    })
};
/**
 * A plugin that provides a configuration with hash method.
 */
const configuration = {
    id: '@jupyterlab/debugger-extension:config',
    provides: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebuggerConfig,
    autoStart: true,
    activate: () => new _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Config()
};
/**
 * A plugin that provides source/editor functionality for debugging.
 */
const sources = {
    id: '@jupyterlab/debugger-extension:sources',
    autoStart: true,
    provides: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebuggerSources,
    requires: [_jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebuggerConfig, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__.IEditorServices],
    optional: [_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.INotebookTracker, _jupyterlab_console__WEBPACK_IMPORTED_MODULE_4__.IConsoleTracker, _jupyterlab_fileeditor__WEBPACK_IMPORTED_MODULE_8__.IEditorTracker],
    activate: (app, config, editorServices, notebookTracker, consoleTracker, editorTracker) => {
        return new _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Sources({
            config,
            shell: app.shell,
            editorServices,
            notebookTracker,
            consoleTracker,
            editorTracker
        });
    }
};
/*
 * A plugin to open detailed views for variables.
 */
const variables = {
    id: '@jupyterlab/debugger-extension:variables',
    autoStart: true,
    requires: [_jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebugger, _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebuggerHandler, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_13__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IThemeManager, _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_11__.IRenderMimeRegistry],
    activate: (app, service, handler, translator, themeManager, rendermime) => {
        const trans = translator.load('jupyterlab');
        const { commands, shell } = app;
        const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
            namespace: 'debugger/inspect-variable'
        });
        const trackerMime = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
            namespace: 'debugger/render-variable'
        });
        const CommandIDs = _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.CommandIDs;
        // Add commands
        commands.addCommand(CommandIDs.inspectVariable, {
            label: trans.__('Inspect Variable'),
            caption: trans.__('Inspect Variable'),
            isEnabled: args => {
                var _a, _b, _c, _d;
                return !!((_a = service.session) === null || _a === void 0 ? void 0 : _a.isStarted) &&
                    ((_d = (_b = args.variableReference) !== null && _b !== void 0 ? _b : (_c = service.model.variables.selectedVariable) === null || _c === void 0 ? void 0 : _c.variablesReference) !== null && _d !== void 0 ? _d : 0) > 0;
            },
            execute: async (args) => {
                var _a, _b, _c, _d;
                let { variableReference, name } = args;
                if (!variableReference) {
                    variableReference = (_a = service.model.variables.selectedVariable) === null || _a === void 0 ? void 0 : _a.variablesReference;
                }
                if (!name) {
                    name = (_b = service.model.variables.selectedVariable) === null || _b === void 0 ? void 0 : _b.name;
                }
                const id = `jp-debugger-variable-${name}`;
                if (!name ||
                    !variableReference ||
                    tracker.find(widget => widget.id === id)) {
                    return;
                }
                const variables = await service.inspectVariable(variableReference);
                if (!variables || variables.length === 0) {
                    return;
                }
                const model = service.model.variables;
                const widget = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({
                    content: new _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.VariablesGrid({
                        model,
                        commands,
                        scopes: [{ name, variables }],
                        themeManager
                    })
                });
                widget.addClass('jp-DebuggerVariables');
                widget.id = id;
                widget.title.icon = _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Icons.variableIcon;
                widget.title.label = `${(_d = (_c = service.session) === null || _c === void 0 ? void 0 : _c.connection) === null || _d === void 0 ? void 0 : _d.name} - ${name}`;
                void tracker.add(widget);
                const disposeWidget = () => {
                    widget.dispose();
                    model.changed.disconnect(disposeWidget);
                };
                model.changed.connect(disposeWidget);
                shell.add(widget, 'main', {
                    mode: tracker.currentWidget ? 'split-right' : 'split-bottom',
                    activate: false
                });
            }
        });
        commands.addCommand(CommandIDs.renderMimeVariable, {
            label: trans.__('Render Variable'),
            caption: trans.__('Render variable according to its mime type'),
            isEnabled: () => { var _a; return !!((_a = service.session) === null || _a === void 0 ? void 0 : _a.isStarted); },
            isVisible: () => service.model.hasRichVariableRendering &&
                (rendermime !== null || handler.activeWidget instanceof _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookPanel),
            execute: args => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                let { name, frameId } = args;
                if (!name) {
                    name = (_a = service.model.variables.selectedVariable) === null || _a === void 0 ? void 0 : _a.name;
                }
                if (!frameId) {
                    frameId = (_b = service.model.callstack.frame) === null || _b === void 0 ? void 0 : _b.id;
                }
                const activeWidget = handler.activeWidget;
                let activeRendermime = activeWidget instanceof _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_10__.NotebookPanel
                    ? activeWidget.content.rendermime
                    : rendermime;
                if (!activeRendermime) {
                    return;
                }
                const id = `jp-debugger-variable-mime-${name}-${(_d = (_c = service.session) === null || _c === void 0 ? void 0 : _c.connection) === null || _d === void 0 ? void 0 : _d.path.replace('/', '-')}`;
                if (!name || // Name is mandatory
                    trackerMime.find(widget => widget.id === id) || // Widget already exists
                    (!frameId && service.hasStoppedThreads()) // frame id missing on breakpoint
                ) {
                    return;
                }
                const variablesModel = service.model.variables;
                const widget = new _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.VariableRenderer({
                    dataLoader: () => service.inspectRichVariable(name, frameId),
                    rendermime: activeRendermime,
                    translator
                });
                widget.addClass('jp-DebuggerRichVariable');
                widget.id = id;
                widget.title.icon = _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Icons.variableIcon;
                widget.title.label = `${name} - ${(_f = (_e = service.session) === null || _e === void 0 ? void 0 : _e.connection) === null || _f === void 0 ? void 0 : _f.name}`;
                widget.title.caption = `${name} - ${(_h = (_g = service.session) === null || _g === void 0 ? void 0 : _g.connection) === null || _h === void 0 ? void 0 : _h.path}`;
                void trackerMime.add(widget);
                const disposeWidget = () => {
                    widget.dispose();
                    variablesModel.changed.disconnect(refreshWidget);
                    activeWidget === null || activeWidget === void 0 ? void 0 : activeWidget.disposed.disconnect(disposeWidget);
                };
                const refreshWidget = () => {
                    // Refresh the widget only if the active element is the same.
                    if (handler.activeWidget === activeWidget) {
                        void widget.refresh();
                    }
                };
                widget.disposed.connect(disposeWidget);
                variablesModel.changed.connect(refreshWidget);
                activeWidget === null || activeWidget === void 0 ? void 0 : activeWidget.disposed.connect(disposeWidget);
                shell.add(widget, 'main', {
                    mode: trackerMime.currentWidget ? 'split-right' : 'split-bottom',
                    activate: false
                });
            }
        });
    }
};
/**
 * Debugger sidebar provider plugin.
 */
const sidebar = {
    id: '@jupyterlab/debugger-extension:sidebar',
    provides: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebuggerSidebar,
    requires: [_jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebugger, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__.IEditorServices, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_13__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IThemeManager, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_12__.ISettingRegistry],
    autoStart: true,
    activate: async (app, service, editorServices, translator, themeManager, settingRegistry) => {
        const { commands } = app;
        const CommandIDs = _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.CommandIDs;
        const callstackCommands = {
            registry: commands,
            continue: CommandIDs.debugContinue,
            terminate: CommandIDs.terminate,
            next: CommandIDs.next,
            stepIn: CommandIDs.stepIn,
            stepOut: CommandIDs.stepOut,
            evaluate: CommandIDs.evaluate
        };
        const breakpointsCommands = {
            registry: commands,
            pause: CommandIDs.pause
        };
        const sidebar = new _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Sidebar({
            service,
            callstackCommands,
            breakpointsCommands,
            editorServices,
            themeManager,
            translator
        });
        if (settingRegistry) {
            const setting = await settingRegistry.load(main.id);
            const updateSettings = () => {
                var _a, _b, _c, _d;
                const filters = setting.get('variableFilters').composite;
                const kernel = (_d = (_c = (_b = (_a = service.session) === null || _a === void 0 ? void 0 : _a.connection) === null || _b === void 0 ? void 0 : _b.kernel) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '';
                if (kernel && filters[kernel]) {
                    sidebar.variables.filter = new Set(filters[kernel]);
                }
                const kernelSourcesFilter = setting.get('defaultKernelSourcesFilter')
                    .composite;
                sidebar.kernelSources.filter = kernelSourcesFilter;
            };
            updateSettings();
            setting.changed.connect(updateSettings);
            service.sessionChanged.connect(updateSettings);
        }
        return sidebar;
    }
};
/**
 * The main debugger UI plugin.
 */
const main = {
    id: '@jupyterlab/debugger-extension:main',
    requires: [_jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebugger, _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebuggerSidebar, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__.IEditorServices, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_13__.ITranslator],
    optional: [
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette,
        _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.IDebuggerSources,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_9__.ILoggerRegistry
    ],
    autoStart: true,
    activate: async (app, service, sidebar, editorServices, translator, palette, debuggerSources, labShell, restorer, loggerRegistry) => {
        var _a;
        const trans = translator.load('jupyterlab');
        const { commands, shell, serviceManager } = app;
        const { kernelspecs } = serviceManager;
        const CommandIDs = _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.CommandIDs;
        // First check if there is a PageConfig override for the extension visibility
        const alwaysShowDebuggerExtension = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_5__.PageConfig.getOption('alwaysShowDebuggerExtension').toLowerCase() ===
            'true';
        if (!alwaysShowDebuggerExtension) {
            // hide the debugger sidebar if no kernel with support for debugging is available
            await kernelspecs.ready;
            const specs = (_a = kernelspecs.specs) === null || _a === void 0 ? void 0 : _a.kernelspecs;
            if (!specs) {
                return;
            }
            const enabled = Object.keys(specs).some(name => { var _a, _b, _c; return !!((_c = (_b = (_a = specs[name]) === null || _a === void 0 ? void 0 : _a.metadata) === null || _b === void 0 ? void 0 : _b['debugger']) !== null && _c !== void 0 ? _c : false); });
            if (!enabled) {
                return;
            }
        }
        // get the mime type of the kernel language for the current debug session
        const getMimeType = async () => {
            var _a, _b, _c;
            const kernel = (_b = (_a = service.session) === null || _a === void 0 ? void 0 : _a.connection) === null || _b === void 0 ? void 0 : _b.kernel;
            if (!kernel) {
                return '';
            }
            const info = (await kernel.info).language_info;
            const name = info.name;
            const mimeType = (_c = editorServices === null || editorServices === void 0 ? void 0 : editorServices.mimeTypeService.getMimeTypeByLanguage({ name })) !== null && _c !== void 0 ? _c : '';
            return mimeType;
        };
        const rendermime = new _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_11__.RenderMimeRegistry({ initialFactories: _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_11__.standardRendererFactories });
        commands.addCommand(CommandIDs.evaluate, {
            label: trans.__('Evaluate Code'),
            caption: trans.__('Evaluate Code'),
            icon: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Icons.evaluateIcon,
            isEnabled: () => service.hasStoppedThreads(),
            execute: async () => {
                var _a, _b, _c;
                const mimeType = await getMimeType();
                const result = await _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Dialogs.getCode({
                    title: trans.__('Evaluate Code'),
                    okLabel: trans.__('Evaluate'),
                    cancelLabel: trans.__('Cancel'),
                    mimeType,
                    rendermime
                });
                const code = result.value;
                if (!result.button.accept || !code) {
                    return;
                }
                const reply = await service.evaluate(code);
                if (reply) {
                    const data = reply.result;
                    const path = (_b = (_a = service === null || service === void 0 ? void 0 : service.session) === null || _a === void 0 ? void 0 : _a.connection) === null || _b === void 0 ? void 0 : _b.path;
                    const logger = path ? (_c = loggerRegistry === null || loggerRegistry === void 0 ? void 0 : loggerRegistry.getLogger) === null || _c === void 0 ? void 0 : _c.call(loggerRegistry, path) : undefined;
                    if (logger) {
                        // print to log console of the notebook currently being debugged
                        logger.log({ type: 'text', data, level: logger.level });
                    }
                    else {
                        // fallback to printing to devtools console
                        console.debug(data);
                    }
                }
            }
        });
        commands.addCommand(CommandIDs.debugContinue, {
            label: trans.__('Continue'),
            caption: trans.__('Continue'),
            icon: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Icons.continueIcon,
            isEnabled: () => service.hasStoppedThreads(),
            execute: async () => {
                await service.continue();
                commands.notifyCommandChanged();
            }
        });
        commands.addCommand(CommandIDs.terminate, {
            label: trans.__('Terminate'),
            caption: trans.__('Terminate'),
            icon: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Icons.terminateIcon,
            isEnabled: () => service.hasStoppedThreads(),
            execute: async () => {
                await service.restart();
                commands.notifyCommandChanged();
            }
        });
        commands.addCommand(CommandIDs.next, {
            label: trans.__('Next'),
            caption: trans.__('Next'),
            icon: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Icons.stepOverIcon,
            isEnabled: () => service.hasStoppedThreads(),
            execute: async () => {
                await service.next();
            }
        });
        commands.addCommand(CommandIDs.stepIn, {
            label: trans.__('Step In'),
            caption: trans.__('Step In'),
            icon: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Icons.stepIntoIcon,
            isEnabled: () => service.hasStoppedThreads(),
            execute: async () => {
                await service.stepIn();
            }
        });
        commands.addCommand(CommandIDs.stepOut, {
            label: trans.__('Step Out'),
            caption: trans.__('Step Out'),
            icon: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Icons.stepOutIcon,
            isEnabled: () => service.hasStoppedThreads(),
            execute: async () => {
                await service.stepOut();
            }
        });
        commands.addCommand(CommandIDs.pause, {
            label: trans.__('Enable / Disable pausing on exceptions'),
            caption: () => service.isStarted
                ? service.pauseOnExceptionsIsValid()
                    ? service.isPausingOnExceptions
                        ? trans.__('Disable pausing on exceptions')
                        : trans.__('Enable pausing on exceptions')
                    : trans.__('Kernel does not support pausing on exceptions.')
                : trans.__('Enable / Disable pausing on exceptions'),
            className: 'jp-PauseOnExceptions',
            icon: _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.Icons.pauseOnExceptionsIcon,
            isToggled: () => {
                return service.isPausingOnExceptions;
            },
            isEnabled: () => service.pauseOnExceptionsIsValid(),
            execute: async () => {
                await service.pauseOnExceptions(!service.isPausingOnExceptions);
                commands.notifyCommandChanged();
            }
        });
        service.eventMessage.connect((_, event) => {
            commands.notifyCommandChanged();
            if (labShell && event.event === 'initialized') {
                labShell.activateById(sidebar.id);
            }
        });
        service.sessionChanged.connect(_ => {
            commands.notifyCommandChanged();
        });
        if (restorer) {
            restorer.add(sidebar, 'debugger-sidebar');
        }
        sidebar.node.setAttribute('role', 'region');
        sidebar.node.setAttribute('aria-label', trans.__('Debugger section'));
        shell.add(sidebar, 'right');
        if (palette) {
            const category = trans.__('Debugger');
            [
                CommandIDs.debugContinue,
                CommandIDs.terminate,
                CommandIDs.next,
                CommandIDs.stepIn,
                CommandIDs.stepOut,
                CommandIDs.evaluate,
                CommandIDs.pause
            ].forEach(command => {
                palette.addItem({ command, category });
            });
        }
        if (debuggerSources) {
            const { model } = service;
            const readOnlyEditorFactory = new _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.ReadOnlyEditorFactory({
                editorServices
            });
            const onCurrentFrameChanged = (_, frame) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                debuggerSources
                    .find({
                    focus: true,
                    kernel: (_d = (_c = (_b = (_a = service.session) === null || _a === void 0 ? void 0 : _a.connection) === null || _b === void 0 ? void 0 : _b.kernel) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '',
                    path: (_g = (_f = (_e = service.session) === null || _e === void 0 ? void 0 : _e.connection) === null || _f === void 0 ? void 0 : _f.path) !== null && _g !== void 0 ? _g : '',
                    source: (_j = (_h = frame === null || frame === void 0 ? void 0 : frame.source) === null || _h === void 0 ? void 0 : _h.path) !== null && _j !== void 0 ? _j : ''
                })
                    .forEach(editor => {
                    requestAnimationFrame(() => {
                        _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.EditorHandler.showCurrentLine(editor, frame.line);
                    });
                });
            };
            const onKernelSourceOpened = (_, source, breakpoint) => {
                if (!source) {
                    return;
                }
                onCurrentSourceOpened(null, source, breakpoint);
            };
            const onCurrentSourceOpened = (_, source, breakpoint) => {
                var _a, _b, _c, _d, _e, _f, _g;
                if (!source) {
                    return;
                }
                const { content, mimeType, path } = source;
                const results = debuggerSources.find({
                    focus: true,
                    kernel: (_d = (_c = (_b = (_a = service.session) === null || _a === void 0 ? void 0 : _a.connection) === null || _b === void 0 ? void 0 : _b.kernel) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : '',
                    path: (_g = (_f = (_e = service.session) === null || _e === void 0 ? void 0 : _e.connection) === null || _f === void 0 ? void 0 : _f.path) !== null && _g !== void 0 ? _g : '',
                    source: path
                });
                if (results.length > 0) {
                    if (breakpoint && typeof breakpoint.line !== 'undefined') {
                        results.forEach(editor => {
                            if (editor instanceof _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_3__.CodeMirrorEditor) {
                                editor.scrollIntoViewCentered({
                                    line: breakpoint.line - 1,
                                    ch: breakpoint.column || 0
                                });
                            }
                            else {
                                editor.revealPosition({
                                    line: breakpoint.line - 1,
                                    column: breakpoint.column || 0
                                });
                            }
                        });
                    }
                    return;
                }
                const editorWrapper = readOnlyEditorFactory.createNewEditor({
                    content,
                    mimeType,
                    path
                });
                const editor = editorWrapper.editor;
                const editorHandler = new _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.EditorHandler({
                    debuggerService: service,
                    editor,
                    path
                });
                editorWrapper.disposed.connect(() => editorHandler.dispose());
                debuggerSources.open({
                    label: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_5__.PathExt.basename(path),
                    caption: path,
                    editorWrapper
                });
                const frame = service.model.callstack.frame;
                if (frame) {
                    _jupyterlab_debugger__WEBPACK_IMPORTED_MODULE_6__.Debugger.EditorHandler.showCurrentLine(editor, frame.line);
                }
            };
            model.callstack.currentFrameChanged.connect(onCurrentFrameChanged);
            model.sources.currentSourceOpened.connect(onCurrentSourceOpened);
            model.kernelSources.kernelSourceOpened.connect(onKernelSourceOpened);
            model.breakpoints.clicked.connect(async (_, breakpoint) => {
                var _a;
                const path = (_a = breakpoint.source) === null || _a === void 0 ? void 0 : _a.path;
                const source = await service.getSource({
                    sourceReference: 0,
                    path
                });
                onCurrentSourceOpened(null, source, breakpoint);
            });
        }
    }
};
/**
 * Export the plugins as default.
 */
const plugins = [
    service,
    consoles,
    files,
    notebooks,
    variables,
    sidebar,
    main,
    sources,
    configuration
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZGVidWdnZXItZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNxRTtBQUN1RDtBQUNuRTtBQUNDO0FBQ1U7QUFDUjtBQUNzRTtBQUN6RTtBQUNXO0FBQ1g7QUFDK0I7QUFDd0M7QUFDakU7QUFDVDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDJEQUFTLEVBQUUsZ0VBQWU7QUFDekMsZUFBZSw4REFBUztBQUN4QjtBQUNBLDRCQUE0QixrRUFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyw2REFBWTtBQUNsRDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDJEQUFTLEVBQUUsa0VBQWM7QUFDeEMsZUFBZSw4REFBUztBQUN4QjtBQUNBLDRCQUE0QixrRUFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsUUFBUTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsbUVBQWM7QUFDcEQsMkJBQTJCLFVBQVU7QUFDckMsMkNBQTJDLDhEQUFVO0FBQ3JEO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsT0FBTyxFQUFDO0FBQ3ZCLGlDIiwiZmlsZSI6InBhY2thZ2VzX2RlYnVnZ2VyLWV4dGVuc2lvbl9saWJfaW5kZXhfanMuNGYxN2NkNmQyZmJlNjVmZWUyZGYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBkZWJ1Z2dlci1leHRlbnNpb25cbiAqL1xuaW1wb3J0IHsgSUxhYlNoZWxsLCBJTGF5b3V0UmVzdG9yZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBJQ29tbWFuZFBhbGV0dGUsIElUaGVtZU1hbmFnZXIsIE1haW5BcmVhV2lkZ2V0LCBzZXNzaW9uQ29udGV4dERpYWxvZ3MsIFdpZGdldFRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBJRWRpdG9yU2VydmljZXMgfSBmcm9tICdAanVweXRlcmxhYi9jb2RlZWRpdG9yJztcbmltcG9ydCB7IENvZGVNaXJyb3JFZGl0b3IgfSBmcm9tICdAanVweXRlcmxhYi9jb2RlbWlycm9yJztcbmltcG9ydCB7IENvbnNvbGVQYW5lbCwgSUNvbnNvbGVUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29uc29sZSc7XG5pbXBvcnQgeyBQYWdlQ29uZmlnLCBQYXRoRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IERlYnVnZ2VyLCBJRGVidWdnZXIsIElEZWJ1Z2dlckNvbmZpZywgSURlYnVnZ2VySGFuZGxlciwgSURlYnVnZ2VyU2lkZWJhciwgSURlYnVnZ2VyU291cmNlcyB9IGZyb20gJ0BqdXB5dGVybGFiL2RlYnVnZ2VyJztcbmltcG9ydCB7IERvY3VtZW50V2lkZ2V0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvZG9jcmVnaXN0cnknO1xuaW1wb3J0IHsgRmlsZUVkaXRvciwgSUVkaXRvclRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9maWxlZWRpdG9yJztcbmltcG9ydCB7IElMb2dnZXJSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL2xvZ2NvbnNvbGUnO1xuaW1wb3J0IHsgSU5vdGVib29rVHJhY2tlciwgTm90ZWJvb2tBY3Rpb25zLCBOb3RlYm9va1BhbmVsIH0gZnJvbSAnQGp1cHl0ZXJsYWIvbm90ZWJvb2snO1xuaW1wb3J0IHsgc3RhbmRhcmRSZW5kZXJlckZhY3RvcmllcyBhcyBpbml0aWFsRmFjdG9yaWVzLCBJUmVuZGVyTWltZVJlZ2lzdHJ5LCBSZW5kZXJNaW1lUmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9yZW5kZXJtaW1lJztcbmltcG9ydCB7IElTZXR0aW5nUmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9zZXR0aW5ncmVnaXN0cnknO1xuaW1wb3J0IHsgSVRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG4vKipcbiAqIEEgcGx1Z2luIHRoYXQgcHJvdmlkZXMgdmlzdWFsIGRlYnVnZ2luZyBzdXBwb3J0IGZvciBjb25zb2xlcy5cbiAqL1xuY29uc3QgY29uc29sZXMgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9kZWJ1Z2dlci1leHRlbnNpb246Y29uc29sZXMnLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICByZXF1aXJlczogW0lEZWJ1Z2dlciwgSUNvbnNvbGVUcmFja2VyXSxcbiAgICBvcHRpb25hbDogW0lMYWJTaGVsbF0sXG4gICAgYWN0aXZhdGU6IChhcHAsIGRlYnVnLCBjb25zb2xlVHJhY2tlciwgbGFiU2hlbGwpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IG5ldyBEZWJ1Z2dlci5IYW5kbGVyKHtcbiAgICAgICAgICAgIHR5cGU6ICdjb25zb2xlJyxcbiAgICAgICAgICAgIHNoZWxsOiBhcHAuc2hlbGwsXG4gICAgICAgICAgICBzZXJ2aWNlOiBkZWJ1Z1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdXBkYXRlSGFuZGxlckFuZENvbW1hbmRzID0gYXN5bmMgKHdpZGdldCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBzZXNzaW9uQ29udGV4dCB9ID0gd2lkZ2V0O1xuICAgICAgICAgICAgYXdhaXQgc2Vzc2lvbkNvbnRleHQucmVhZHk7XG4gICAgICAgICAgICBhd2FpdCBoYW5kbGVyLnVwZGF0ZUNvbnRleHQod2lkZ2V0LCBzZXNzaW9uQ29udGV4dCk7XG4gICAgICAgICAgICBhcHAuY29tbWFuZHMubm90aWZ5Q29tbWFuZENoYW5nZWQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGxhYlNoZWxsKSB7XG4gICAgICAgICAgICBsYWJTaGVsbC5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KChfLCB1cGRhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB1cGRhdGUubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHdpZGdldCBpbnN0YW5jZW9mIENvbnNvbGVQYW5lbCkge1xuICAgICAgICAgICAgICAgICAgICB2b2lkIHVwZGF0ZUhhbmRsZXJBbmRDb21tYW5kcyh3aWRnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZVRyYWNrZXIuY3VycmVudENoYW5nZWQuY29ubmVjdCgoXywgY29uc29sZVBhbmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnNvbGVQYW5lbCkge1xuICAgICAgICAgICAgICAgICAgICB2b2lkIHVwZGF0ZUhhbmRsZXJBbmRDb21tYW5kcyhjb25zb2xlUGFuZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8qKlxuICogQSBwbHVnaW4gdGhhdCBwcm92aWRlcyB2aXN1YWwgZGVidWdnaW5nIHN1cHBvcnQgZm9yIGZpbGUgZWRpdG9ycy5cbiAqL1xuY29uc3QgZmlsZXMgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9kZWJ1Z2dlci1leHRlbnNpb246ZmlsZXMnLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICByZXF1aXJlczogW0lEZWJ1Z2dlciwgSUVkaXRvclRyYWNrZXJdLFxuICAgIG9wdGlvbmFsOiBbSUxhYlNoZWxsXSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgZGVidWcsIGVkaXRvclRyYWNrZXIsIGxhYlNoZWxsKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgRGVidWdnZXIuSGFuZGxlcih7XG4gICAgICAgICAgICB0eXBlOiAnZmlsZScsXG4gICAgICAgICAgICBzaGVsbDogYXBwLnNoZWxsLFxuICAgICAgICAgICAgc2VydmljZTogZGVidWdcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVNlc3Npb25zID0ge307XG4gICAgICAgIGNvbnN0IHVwZGF0ZUhhbmRsZXJBbmRDb21tYW5kcyA9IGFzeW5jICh3aWRnZXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb25zID0gYXBwLnNlcnZpY2VNYW5hZ2VyLnNlc3Npb25zO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IGF3YWl0IHNlc3Npb25zLmZpbmRCeVBhdGgod2lkZ2V0LmNvbnRleHQucGF0aCk7XG4gICAgICAgICAgICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBzZXNzaW9uID0gYWN0aXZlU2Vzc2lvbnNbbW9kZWwuaWRdO1xuICAgICAgICAgICAgICAgIGlmICghc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgYGNvbm5lY3RUb2Agb25seSBpZiB0aGUgc2Vzc2lvbiBkb2VzIG5vdCBleGlzdC5cbiAgICAgICAgICAgICAgICAgICAgLy8gYGNvbm5lY3RUb2Agc2VuZHMgYSBrZXJuZWxfaW5mb19yZXF1ZXN0IG9uIHRoZSBzaGVsbFxuICAgICAgICAgICAgICAgICAgICAvLyBjaGFubmVsLCB3aGljaCBibG9ja3MgdGhlIGRlYnVnIHNlc3Npb24gcmVzdG9yZSB3aGVuIHdhaXRpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIHRoZSBrZXJuZWwgdG8gYmUgcmVhZHlcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbiA9IHNlc3Npb25zLmNvbm5lY3RUbyh7IG1vZGVsIH0pO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVTZXNzaW9uc1ttb2RlbC5pZF0gPSBzZXNzaW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCBoYW5kbGVyLnVwZGF0ZSh3aWRnZXQsIHNlc3Npb24pO1xuICAgICAgICAgICAgICAgIGFwcC5jb21tYW5kcy5ub3RpZnlDb21tYW5kQ2hhbmdlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAobGFiU2hlbGwpIHtcbiAgICAgICAgICAgIGxhYlNoZWxsLmN1cnJlbnRDaGFuZ2VkLmNvbm5lY3QoKF8sIHVwZGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IHVwZGF0ZS5uZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAod2lkZ2V0IGluc3RhbmNlb2YgRG9jdW1lbnRXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBjb250ZW50IH0gPSB3aWRnZXQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50IGluc3RhbmNlb2YgRmlsZUVkaXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdm9pZCB1cGRhdGVIYW5kbGVyQW5kQ29tbWFuZHMod2lkZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWRpdG9yVHJhY2tlci5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KChfLCBkb2N1bWVudFdpZGdldCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudFdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICB2b2lkIHVwZGF0ZUhhbmRsZXJBbmRDb21tYW5kcyhkb2N1bWVudFdpZGdldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLyoqXG4gKiBBIHBsdWdpbiB0aGF0IHByb3ZpZGVzIHZpc3VhbCBkZWJ1Z2dpbmcgc3VwcG9ydCBmb3Igbm90ZWJvb2tzLlxuICovXG5jb25zdCBub3RlYm9va3MgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9kZWJ1Z2dlci1leHRlbnNpb246bm90ZWJvb2tzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJRGVidWdnZXIsIElOb3RlYm9va1RyYWNrZXIsIElUcmFuc2xhdG9yXSxcbiAgICBvcHRpb25hbDogW0lMYWJTaGVsbCwgSUNvbW1hbmRQYWxldHRlXSxcbiAgICBwcm92aWRlczogSURlYnVnZ2VySGFuZGxlcixcbiAgICBhY3RpdmF0ZTogKGFwcCwgc2VydmljZSwgbm90ZWJvb2tUcmFja2VyLCB0cmFuc2xhdG9yLCBsYWJTaGVsbCwgcGFsZXR0ZSkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gbmV3IERlYnVnZ2VyLkhhbmRsZXIoe1xuICAgICAgICAgICAgdHlwZTogJ25vdGVib29rJyxcbiAgICAgICAgICAgIHNoZWxsOiBhcHAuc2hlbGwsXG4gICAgICAgICAgICBzZXJ2aWNlXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBhcHAuY29tbWFuZHMuYWRkQ29tbWFuZChEZWJ1Z2dlci5Db21tYW5kSURzLnJlc3RhcnREZWJ1Zywge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSZXN0YXJ0IEtlcm5lbCBhbmQgRGVidWfigKYnKSxcbiAgICAgICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdSZXN0YXJ0IEtlcm5lbCBhbmQgRGVidWfigKYnKSxcbiAgICAgICAgICAgIGlzRW5hYmxlZDogKCkgPT4gc2VydmljZS5pc1N0YXJ0ZWQsXG4gICAgICAgICAgICBleGVjdXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBzZXJ2aWNlLmdldERlYnVnZ2VyU3RhdGUoKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBzZXJ2aWNlLnN0b3AoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBub3RlYm9va1RyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29udGVudCwgc2Vzc2lvbkNvbnRleHQgfSA9IHdpZGdldDtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN0YXJ0ZWQgPSBhd2FpdCBzZXNzaW9uQ29udGV4dERpYWxvZ3MucmVzdGFydChzZXNzaW9uQ29udGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCBzZXJ2aWNlLnJlc3RvcmVEZWJ1Z2dlclN0YXRlKHN0YXRlKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBoYW5kbGVyLnVwZGF0ZVdpZGdldCh3aWRnZXQsIHNlc3Npb25Db250ZXh0LnNlc3Npb24pO1xuICAgICAgICAgICAgICAgIGF3YWl0IE5vdGVib29rQWN0aW9ucy5ydW5BbGwoY29udGVudCwgc2Vzc2lvbkNvbnRleHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdXBkYXRlSGFuZGxlckFuZENvbW1hbmRzID0gYXN5bmMgKHdpZGdldCkgPT4ge1xuICAgICAgICAgICAgaWYgKHdpZGdldCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgc2Vzc2lvbkNvbnRleHQgfSA9IHdpZGdldDtcbiAgICAgICAgICAgICAgICBhd2FpdCBzZXNzaW9uQ29udGV4dC5yZWFkeTtcbiAgICAgICAgICAgICAgICBhd2FpdCBoYW5kbGVyLnVwZGF0ZUNvbnRleHQod2lkZ2V0LCBzZXNzaW9uQ29udGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcHAuY29tbWFuZHMubm90aWZ5Q29tbWFuZENoYW5nZWQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGxhYlNoZWxsKSB7XG4gICAgICAgICAgICBsYWJTaGVsbC5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KChfLCB1cGRhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB1cGRhdGUubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHdpZGdldCBpbnN0YW5jZW9mIE5vdGVib29rUGFuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCB1cGRhdGVIYW5kbGVyQW5kQ29tbWFuZHMod2lkZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vdGVib29rVHJhY2tlci5jdXJyZW50Q2hhbmdlZC5jb25uZWN0KChfLCBub3RlYm9va1BhbmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdGVib29rUGFuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCB1cGRhdGVIYW5kbGVyQW5kQ29tbWFuZHMobm90ZWJvb2tQYW5lbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhbGV0dGUpIHtcbiAgICAgICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7XG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdOb3RlYm9vayBPcGVyYXRpb25zJyxcbiAgICAgICAgICAgICAgICBjb21tYW5kOiBEZWJ1Z2dlci5Db21tYW5kSURzLnJlc3RhcnREZWJ1Z1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhbmRsZXI7XG4gICAgfVxufTtcbi8qKlxuICogQSBwbHVnaW4gdGhhdCBwcm92aWRlcyBhIGRlYnVnZ2VyIHNlcnZpY2UuXG4gKi9cbmNvbnN0IHNlcnZpY2UgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9kZWJ1Z2dlci1leHRlbnNpb246c2VydmljZScsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHByb3ZpZGVzOiBJRGVidWdnZXIsXG4gICAgcmVxdWlyZXM6IFtJRGVidWdnZXJDb25maWddLFxuICAgIG9wdGlvbmFsOiBbSURlYnVnZ2VyU291cmNlc10sXG4gICAgYWN0aXZhdGU6IChhcHAsIGNvbmZpZywgZGVidWdnZXJTb3VyY2VzKSA9PiBuZXcgRGVidWdnZXIuU2VydmljZSh7XG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgZGVidWdnZXJTb3VyY2VzLFxuICAgICAgICBzcGVjc01hbmFnZXI6IGFwcC5zZXJ2aWNlTWFuYWdlci5rZXJuZWxzcGVjc1xuICAgIH0pXG59O1xuLyoqXG4gKiBBIHBsdWdpbiB0aGF0IHByb3ZpZGVzIGEgY29uZmlndXJhdGlvbiB3aXRoIGhhc2ggbWV0aG9kLlxuICovXG5jb25zdCBjb25maWd1cmF0aW9uID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvZGVidWdnZXItZXh0ZW5zaW9uOmNvbmZpZycsXG4gICAgcHJvdmlkZXM6IElEZWJ1Z2dlckNvbmZpZyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgYWN0aXZhdGU6ICgpID0+IG5ldyBEZWJ1Z2dlci5Db25maWcoKVxufTtcbi8qKlxuICogQSBwbHVnaW4gdGhhdCBwcm92aWRlcyBzb3VyY2UvZWRpdG9yIGZ1bmN0aW9uYWxpdHkgZm9yIGRlYnVnZ2luZy5cbiAqL1xuY29uc3Qgc291cmNlcyA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2RlYnVnZ2VyLWV4dGVuc2lvbjpzb3VyY2VzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcHJvdmlkZXM6IElEZWJ1Z2dlclNvdXJjZXMsXG4gICAgcmVxdWlyZXM6IFtJRGVidWdnZXJDb25maWcsIElFZGl0b3JTZXJ2aWNlc10sXG4gICAgb3B0aW9uYWw6IFtJTm90ZWJvb2tUcmFja2VyLCBJQ29uc29sZVRyYWNrZXIsIElFZGl0b3JUcmFja2VyXSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgY29uZmlnLCBlZGl0b3JTZXJ2aWNlcywgbm90ZWJvb2tUcmFja2VyLCBjb25zb2xlVHJhY2tlciwgZWRpdG9yVHJhY2tlcikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IERlYnVnZ2VyLlNvdXJjZXMoe1xuICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgc2hlbGw6IGFwcC5zaGVsbCxcbiAgICAgICAgICAgIGVkaXRvclNlcnZpY2VzLFxuICAgICAgICAgICAgbm90ZWJvb2tUcmFja2VyLFxuICAgICAgICAgICAgY29uc29sZVRyYWNrZXIsXG4gICAgICAgICAgICBlZGl0b3JUcmFja2VyXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKlxuICogQSBwbHVnaW4gdG8gb3BlbiBkZXRhaWxlZCB2aWV3cyBmb3IgdmFyaWFibGVzLlxuICovXG5jb25zdCB2YXJpYWJsZXMgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9kZWJ1Z2dlci1leHRlbnNpb246dmFyaWFibGVzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJRGVidWdnZXIsIElEZWJ1Z2dlckhhbmRsZXIsIElUcmFuc2xhdG9yXSxcbiAgICBvcHRpb25hbDogW0lUaGVtZU1hbmFnZXIsIElSZW5kZXJNaW1lUmVnaXN0cnldLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBzZXJ2aWNlLCBoYW5kbGVyLCB0cmFuc2xhdG9yLCB0aGVtZU1hbmFnZXIsIHJlbmRlcm1pbWUpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcywgc2hlbGwgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgdHJhY2tlciA9IG5ldyBXaWRnZXRUcmFja2VyKHtcbiAgICAgICAgICAgIG5hbWVzcGFjZTogJ2RlYnVnZ2VyL2luc3BlY3QtdmFyaWFibGUnXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0cmFja2VyTWltZSA9IG5ldyBXaWRnZXRUcmFja2VyKHtcbiAgICAgICAgICAgIG5hbWVzcGFjZTogJ2RlYnVnZ2VyL3JlbmRlci12YXJpYWJsZSdcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IENvbW1hbmRJRHMgPSBEZWJ1Z2dlci5Db21tYW5kSURzO1xuICAgICAgICAvLyBBZGQgY29tbWFuZHNcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmluc3BlY3RWYXJpYWJsZSwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdJbnNwZWN0IFZhcmlhYmxlJyksXG4gICAgICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnSW5zcGVjdCBWYXJpYWJsZScpLFxuICAgICAgICAgICAgaXNFbmFibGVkOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKChfYSA9IHNlcnZpY2Uuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlzU3RhcnRlZCkgJiZcbiAgICAgICAgICAgICAgICAgICAgKChfZCA9IChfYiA9IGFyZ3MudmFyaWFibGVSZWZlcmVuY2UpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IChfYyA9IHNlcnZpY2UubW9kZWwudmFyaWFibGVzLnNlbGVjdGVkVmFyaWFibGUpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy52YXJpYWJsZXNSZWZlcmVuY2UpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IDApID4gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleGVjdXRlOiBhc3luYyAoYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgICAgICAgICBsZXQgeyB2YXJpYWJsZVJlZmVyZW5jZSwgbmFtZSB9ID0gYXJncztcbiAgICAgICAgICAgICAgICBpZiAoIXZhcmlhYmxlUmVmZXJlbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhcmlhYmxlUmVmZXJlbmNlID0gKF9hID0gc2VydmljZS5tb2RlbC52YXJpYWJsZXMuc2VsZWN0ZWRWYXJpYWJsZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnZhcmlhYmxlc1JlZmVyZW5jZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSAoX2IgPSBzZXJ2aWNlLm1vZGVsLnZhcmlhYmxlcy5zZWxlY3RlZFZhcmlhYmxlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSBganAtZGVidWdnZXItdmFyaWFibGUtJHtuYW1lfWA7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lIHx8XG4gICAgICAgICAgICAgICAgICAgICF2YXJpYWJsZVJlZmVyZW5jZSB8fFxuICAgICAgICAgICAgICAgICAgICB0cmFja2VyLmZpbmQod2lkZ2V0ID0+IHdpZGdldC5pZCA9PT0gaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgdmFyaWFibGVzID0gYXdhaXQgc2VydmljZS5pbnNwZWN0VmFyaWFibGUodmFyaWFibGVSZWZlcmVuY2UpO1xuICAgICAgICAgICAgICAgIGlmICghdmFyaWFibGVzIHx8IHZhcmlhYmxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IHNlcnZpY2UubW9kZWwudmFyaWFibGVzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IG5ldyBNYWluQXJlYVdpZGdldCh7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG5ldyBEZWJ1Z2dlci5WYXJpYWJsZXNHcmlkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZXM6IFt7IG5hbWUsIHZhcmlhYmxlcyB9XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lTWFuYWdlclxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHdpZGdldC5hZGRDbGFzcygnanAtRGVidWdnZXJWYXJpYWJsZXMnKTtcbiAgICAgICAgICAgICAgICB3aWRnZXQuaWQgPSBpZDtcbiAgICAgICAgICAgICAgICB3aWRnZXQudGl0bGUuaWNvbiA9IERlYnVnZ2VyLkljb25zLnZhcmlhYmxlSWNvbjtcbiAgICAgICAgICAgICAgICB3aWRnZXQudGl0bGUubGFiZWwgPSBgJHsoX2QgPSAoX2MgPSBzZXJ2aWNlLnNlc3Npb24pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5jb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QubmFtZX0gLSAke25hbWV9YDtcbiAgICAgICAgICAgICAgICB2b2lkIHRyYWNrZXIuYWRkKHdpZGdldCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzcG9zZVdpZGdldCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuY2hhbmdlZC5kaXNjb25uZWN0KGRpc3Bvc2VXaWRnZXQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbW9kZWwuY2hhbmdlZC5jb25uZWN0KGRpc3Bvc2VXaWRnZXQpO1xuICAgICAgICAgICAgICAgIHNoZWxsLmFkZCh3aWRnZXQsICdtYWluJywge1xuICAgICAgICAgICAgICAgICAgICBtb2RlOiB0cmFja2VyLmN1cnJlbnRXaWRnZXQgPyAnc3BsaXQtcmlnaHQnIDogJ3NwbGl0LWJvdHRvbScsXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2YXRlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJlbmRlck1pbWVWYXJpYWJsZSwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSZW5kZXIgVmFyaWFibGUnKSxcbiAgICAgICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdSZW5kZXIgdmFyaWFibGUgYWNjb3JkaW5nIHRvIGl0cyBtaW1lIHR5cGUnKSxcbiAgICAgICAgICAgIGlzRW5hYmxlZDogKCkgPT4geyB2YXIgX2E7IHJldHVybiAhISgoX2EgPSBzZXJ2aWNlLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pc1N0YXJ0ZWQpOyB9LFxuICAgICAgICAgICAgaXNWaXNpYmxlOiAoKSA9PiBzZXJ2aWNlLm1vZGVsLmhhc1JpY2hWYXJpYWJsZVJlbmRlcmluZyAmJlxuICAgICAgICAgICAgICAgIChyZW5kZXJtaW1lICE9PSBudWxsIHx8IGhhbmRsZXIuYWN0aXZlV2lkZ2V0IGluc3RhbmNlb2YgTm90ZWJvb2tQYW5lbCksXG4gICAgICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oO1xuICAgICAgICAgICAgICAgIGxldCB7IG5hbWUsIGZyYW1lSWQgfSA9IGFyZ3M7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgPSAoX2EgPSBzZXJ2aWNlLm1vZGVsLnZhcmlhYmxlcy5zZWxlY3RlZFZhcmlhYmxlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFmcmFtZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lSWQgPSAoX2IgPSBzZXJ2aWNlLm1vZGVsLmNhbGxzdGFjay5mcmFtZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmlkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVXaWRnZXQgPSBoYW5kbGVyLmFjdGl2ZVdpZGdldDtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlUmVuZGVybWltZSA9IGFjdGl2ZVdpZGdldCBpbnN0YW5jZW9mIE5vdGVib29rUGFuZWxcbiAgICAgICAgICAgICAgICAgICAgPyBhY3RpdmVXaWRnZXQuY29udGVudC5yZW5kZXJtaW1lXG4gICAgICAgICAgICAgICAgICAgIDogcmVuZGVybWltZTtcbiAgICAgICAgICAgICAgICBpZiAoIWFjdGl2ZVJlbmRlcm1pbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGBqcC1kZWJ1Z2dlci12YXJpYWJsZS1taW1lLSR7bmFtZX0tJHsoX2QgPSAoX2MgPSBzZXJ2aWNlLnNlc3Npb24pID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5jb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QucGF0aC5yZXBsYWNlKCcvJywgJy0nKX1gO1xuICAgICAgICAgICAgICAgIGlmICghbmFtZSB8fCAvLyBOYW1lIGlzIG1hbmRhdG9yeVxuICAgICAgICAgICAgICAgICAgICB0cmFja2VyTWltZS5maW5kKHdpZGdldCA9PiB3aWRnZXQuaWQgPT09IGlkKSB8fCAvLyBXaWRnZXQgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgKCFmcmFtZUlkICYmIHNlcnZpY2UuaGFzU3RvcHBlZFRocmVhZHMoKSkgLy8gZnJhbWUgaWQgbWlzc2luZyBvbiBicmVha3BvaW50XG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgdmFyaWFibGVzTW9kZWwgPSBzZXJ2aWNlLm1vZGVsLnZhcmlhYmxlcztcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBuZXcgRGVidWdnZXIuVmFyaWFibGVSZW5kZXJlcih7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFMb2FkZXI6ICgpID0+IHNlcnZpY2UuaW5zcGVjdFJpY2hWYXJpYWJsZShuYW1lLCBmcmFtZUlkKSxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVybWltZTogYWN0aXZlUmVuZGVybWltZSxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHdpZGdldC5hZGRDbGFzcygnanAtRGVidWdnZXJSaWNoVmFyaWFibGUnKTtcbiAgICAgICAgICAgICAgICB3aWRnZXQuaWQgPSBpZDtcbiAgICAgICAgICAgICAgICB3aWRnZXQudGl0bGUuaWNvbiA9IERlYnVnZ2VyLkljb25zLnZhcmlhYmxlSWNvbjtcbiAgICAgICAgICAgICAgICB3aWRnZXQudGl0bGUubGFiZWwgPSBgJHtuYW1lfSAtICR7KF9mID0gKF9lID0gc2VydmljZS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuY29ubmVjdGlvbikgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLm5hbWV9YDtcbiAgICAgICAgICAgICAgICB3aWRnZXQudGl0bGUuY2FwdGlvbiA9IGAke25hbWV9IC0gJHsoX2ggPSAoX2cgPSBzZXJ2aWNlLnNlc3Npb24pID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5jb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2gucGF0aH1gO1xuICAgICAgICAgICAgICAgIHZvaWQgdHJhY2tlck1pbWUuYWRkKHdpZGdldCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzcG9zZVdpZGdldCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVzTW9kZWwuY2hhbmdlZC5kaXNjb25uZWN0KHJlZnJlc2hXaWRnZXQpO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVXaWRnZXQgPT09IG51bGwgfHwgYWN0aXZlV2lkZ2V0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhY3RpdmVXaWRnZXQuZGlzcG9zZWQuZGlzY29ubmVjdChkaXNwb3NlV2lkZ2V0KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlZnJlc2hXaWRnZXQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlZnJlc2ggdGhlIHdpZGdldCBvbmx5IGlmIHRoZSBhY3RpdmUgZWxlbWVudCBpcyB0aGUgc2FtZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIuYWN0aXZlV2lkZ2V0ID09PSBhY3RpdmVXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZvaWQgd2lkZ2V0LnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgd2lkZ2V0LmRpc3Bvc2VkLmNvbm5lY3QoZGlzcG9zZVdpZGdldCk7XG4gICAgICAgICAgICAgICAgdmFyaWFibGVzTW9kZWwuY2hhbmdlZC5jb25uZWN0KHJlZnJlc2hXaWRnZXQpO1xuICAgICAgICAgICAgICAgIGFjdGl2ZVdpZGdldCA9PT0gbnVsbCB8fCBhY3RpdmVXaWRnZXQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGFjdGl2ZVdpZGdldC5kaXNwb3NlZC5jb25uZWN0KGRpc3Bvc2VXaWRnZXQpO1xuICAgICAgICAgICAgICAgIHNoZWxsLmFkZCh3aWRnZXQsICdtYWluJywge1xuICAgICAgICAgICAgICAgICAgICBtb2RlOiB0cmFja2VyTWltZS5jdXJyZW50V2lkZ2V0ID8gJ3NwbGl0LXJpZ2h0JyA6ICdzcGxpdC1ib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmF0ZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcbi8qKlxuICogRGVidWdnZXIgc2lkZWJhciBwcm92aWRlciBwbHVnaW4uXG4gKi9cbmNvbnN0IHNpZGViYXIgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9kZWJ1Z2dlci1leHRlbnNpb246c2lkZWJhcicsXG4gICAgcHJvdmlkZXM6IElEZWJ1Z2dlclNpZGViYXIsXG4gICAgcmVxdWlyZXM6IFtJRGVidWdnZXIsIElFZGl0b3JTZXJ2aWNlcywgSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSVRoZW1lTWFuYWdlciwgSVNldHRpbmdSZWdpc3RyeV0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGFjdGl2YXRlOiBhc3luYyAoYXBwLCBzZXJ2aWNlLCBlZGl0b3JTZXJ2aWNlcywgdHJhbnNsYXRvciwgdGhlbWVNYW5hZ2VyLCBzZXR0aW5nUmVnaXN0cnkpID0+IHtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcyB9ID0gYXBwO1xuICAgICAgICBjb25zdCBDb21tYW5kSURzID0gRGVidWdnZXIuQ29tbWFuZElEcztcbiAgICAgICAgY29uc3QgY2FsbHN0YWNrQ29tbWFuZHMgPSB7XG4gICAgICAgICAgICByZWdpc3RyeTogY29tbWFuZHMsXG4gICAgICAgICAgICBjb250aW51ZTogQ29tbWFuZElEcy5kZWJ1Z0NvbnRpbnVlLFxuICAgICAgICAgICAgdGVybWluYXRlOiBDb21tYW5kSURzLnRlcm1pbmF0ZSxcbiAgICAgICAgICAgIG5leHQ6IENvbW1hbmRJRHMubmV4dCxcbiAgICAgICAgICAgIHN0ZXBJbjogQ29tbWFuZElEcy5zdGVwSW4sXG4gICAgICAgICAgICBzdGVwT3V0OiBDb21tYW5kSURzLnN0ZXBPdXQsXG4gICAgICAgICAgICBldmFsdWF0ZTogQ29tbWFuZElEcy5ldmFsdWF0ZVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBicmVha3BvaW50c0NvbW1hbmRzID0ge1xuICAgICAgICAgICAgcmVnaXN0cnk6IGNvbW1hbmRzLFxuICAgICAgICAgICAgcGF1c2U6IENvbW1hbmRJRHMucGF1c2VcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2lkZWJhciA9IG5ldyBEZWJ1Z2dlci5TaWRlYmFyKHtcbiAgICAgICAgICAgIHNlcnZpY2UsXG4gICAgICAgICAgICBjYWxsc3RhY2tDb21tYW5kcyxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzQ29tbWFuZHMsXG4gICAgICAgICAgICBlZGl0b3JTZXJ2aWNlcyxcbiAgICAgICAgICAgIHRoZW1lTWFuYWdlcixcbiAgICAgICAgICAgIHRyYW5zbGF0b3JcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzZXR0aW5nUmVnaXN0cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmcgPSBhd2FpdCBzZXR0aW5nUmVnaXN0cnkubG9hZChtYWluLmlkKTtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVNldHRpbmdzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJzID0gc2V0dGluZy5nZXQoJ3ZhcmlhYmxlRmlsdGVycycpLmNvbXBvc2l0ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXJuZWwgPSAoX2QgPSAoX2MgPSAoX2IgPSAoX2EgPSBzZXJ2aWNlLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iua2VybmVsKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubmFtZSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogJyc7XG4gICAgICAgICAgICAgICAgaWYgKGtlcm5lbCAmJiBmaWx0ZXJzW2tlcm5lbF0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhci52YXJpYWJsZXMuZmlsdGVyID0gbmV3IFNldChmaWx0ZXJzW2tlcm5lbF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBrZXJuZWxTb3VyY2VzRmlsdGVyID0gc2V0dGluZy5nZXQoJ2RlZmF1bHRLZXJuZWxTb3VyY2VzRmlsdGVyJylcbiAgICAgICAgICAgICAgICAgICAgLmNvbXBvc2l0ZTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmtlcm5lbFNvdXJjZXMuZmlsdGVyID0ga2VybmVsU291cmNlc0ZpbHRlcjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB1cGRhdGVTZXR0aW5ncygpO1xuICAgICAgICAgICAgc2V0dGluZy5jaGFuZ2VkLmNvbm5lY3QodXBkYXRlU2V0dGluZ3MpO1xuICAgICAgICAgICAgc2VydmljZS5zZXNzaW9uQ2hhbmdlZC5jb25uZWN0KHVwZGF0ZVNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2lkZWJhcjtcbiAgICB9XG59O1xuLyoqXG4gKiBUaGUgbWFpbiBkZWJ1Z2dlciBVSSBwbHVnaW4uXG4gKi9cbmNvbnN0IG1haW4gPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9kZWJ1Z2dlci1leHRlbnNpb246bWFpbicsXG4gICAgcmVxdWlyZXM6IFtJRGVidWdnZXIsIElEZWJ1Z2dlclNpZGViYXIsIElFZGl0b3JTZXJ2aWNlcywgSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbXG4gICAgICAgIElDb21tYW5kUGFsZXR0ZSxcbiAgICAgICAgSURlYnVnZ2VyU291cmNlcyxcbiAgICAgICAgSUxhYlNoZWxsLFxuICAgICAgICBJTGF5b3V0UmVzdG9yZXIsXG4gICAgICAgIElMb2dnZXJSZWdpc3RyeVxuICAgIF0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGFjdGl2YXRlOiBhc3luYyAoYXBwLCBzZXJ2aWNlLCBzaWRlYmFyLCBlZGl0b3JTZXJ2aWNlcywgdHJhbnNsYXRvciwgcGFsZXR0ZSwgZGVidWdnZXJTb3VyY2VzLCBsYWJTaGVsbCwgcmVzdG9yZXIsIGxvZ2dlclJlZ2lzdHJ5KSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcywgc2hlbGwsIHNlcnZpY2VNYW5hZ2VyIH0gPSBhcHA7XG4gICAgICAgIGNvbnN0IHsga2VybmVsc3BlY3MgfSA9IHNlcnZpY2VNYW5hZ2VyO1xuICAgICAgICBjb25zdCBDb21tYW5kSURzID0gRGVidWdnZXIuQ29tbWFuZElEcztcbiAgICAgICAgLy8gRmlyc3QgY2hlY2sgaWYgdGhlcmUgaXMgYSBQYWdlQ29uZmlnIG92ZXJyaWRlIGZvciB0aGUgZXh0ZW5zaW9uIHZpc2liaWxpdHlcbiAgICAgICAgY29uc3QgYWx3YXlzU2hvd0RlYnVnZ2VyRXh0ZW5zaW9uID0gUGFnZUNvbmZpZy5nZXRPcHRpb24oJ2Fsd2F5c1Nob3dEZWJ1Z2dlckV4dGVuc2lvbicpLnRvTG93ZXJDYXNlKCkgPT09XG4gICAgICAgICAgICAndHJ1ZSc7XG4gICAgICAgIGlmICghYWx3YXlzU2hvd0RlYnVnZ2VyRXh0ZW5zaW9uKSB7XG4gICAgICAgICAgICAvLyBoaWRlIHRoZSBkZWJ1Z2dlciBzaWRlYmFyIGlmIG5vIGtlcm5lbCB3aXRoIHN1cHBvcnQgZm9yIGRlYnVnZ2luZyBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgIGF3YWl0IGtlcm5lbHNwZWNzLnJlYWR5O1xuICAgICAgICAgICAgY29uc3Qgc3BlY3MgPSAoX2EgPSBrZXJuZWxzcGVjcy5zcGVjcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmtlcm5lbHNwZWNzO1xuICAgICAgICAgICAgaWYgKCFzcGVjcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGVuYWJsZWQgPSBPYmplY3Qua2V5cyhzcGVjcykuc29tZShuYW1lID0+IHsgdmFyIF9hLCBfYiwgX2M7IHJldHVybiAhISgoX2MgPSAoX2IgPSAoX2EgPSBzcGVjc1tuYW1lXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1ldGFkYXRhKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2JbJ2RlYnVnZ2VyJ10pICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IGZhbHNlKTsgfSk7XG4gICAgICAgICAgICBpZiAoIWVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gZ2V0IHRoZSBtaW1lIHR5cGUgb2YgdGhlIGtlcm5lbCBsYW5ndWFnZSBmb3IgdGhlIGN1cnJlbnQgZGVidWcgc2Vzc2lvblxuICAgICAgICBjb25zdCBnZXRNaW1lVHlwZSA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICAgICAgY29uc3Qga2VybmVsID0gKF9iID0gKF9hID0gc2VydmljZS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29ubmVjdGlvbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmtlcm5lbDtcbiAgICAgICAgICAgIGlmICgha2VybmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5mbyA9IChhd2FpdCBrZXJuZWwuaW5mbykubGFuZ3VhZ2VfaW5mbztcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBpbmZvLm5hbWU7XG4gICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IChfYyA9IGVkaXRvclNlcnZpY2VzID09PSBudWxsIHx8IGVkaXRvclNlcnZpY2VzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBlZGl0b3JTZXJ2aWNlcy5taW1lVHlwZVNlcnZpY2UuZ2V0TWltZVR5cGVCeUxhbmd1YWdlKHsgbmFtZSB9KSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogJyc7XG4gICAgICAgICAgICByZXR1cm4gbWltZVR5cGU7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlbmRlcm1pbWUgPSBuZXcgUmVuZGVyTWltZVJlZ2lzdHJ5KHsgaW5pdGlhbEZhY3RvcmllcyB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmV2YWx1YXRlLCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0V2YWx1YXRlIENvZGUnKSxcbiAgICAgICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdFdmFsdWF0ZSBDb2RlJyksXG4gICAgICAgICAgICBpY29uOiBEZWJ1Z2dlci5JY29ucy5ldmFsdWF0ZUljb24sXG4gICAgICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IHNlcnZpY2UuaGFzU3RvcHBlZFRocmVhZHMoKSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IGF3YWl0IGdldE1pbWVUeXBlKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgRGVidWdnZXIuRGlhbG9ncy5nZXRDb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdFdmFsdWF0ZSBDb2RlJyksXG4gICAgICAgICAgICAgICAgICAgIG9rTGFiZWw6IHRyYW5zLl9fKCdFdmFsdWF0ZScpLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxMYWJlbDogdHJhbnMuX18oJ0NhbmNlbCcpLFxuICAgICAgICAgICAgICAgICAgICBtaW1lVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVybWltZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuYnV0dG9uLmFjY2VwdCB8fCAhY29kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcGx5ID0gYXdhaXQgc2VydmljZS5ldmFsdWF0ZShjb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAocmVwbHkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlcGx5LnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IChfYiA9IChfYSA9IHNlcnZpY2UgPT09IG51bGwgfHwgc2VydmljZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VydmljZS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29ubmVjdGlvbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnBhdGg7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvZ2dlciA9IHBhdGggPyAoX2MgPSBsb2dnZXJSZWdpc3RyeSA9PT0gbnVsbCB8fCBsb2dnZXJSZWdpc3RyeSA9PT0gdm9pZCAwID8gdm9pZCAwIDogbG9nZ2VyUmVnaXN0cnkuZ2V0TG9nZ2VyKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY2FsbChsb2dnZXJSZWdpc3RyeSwgcGF0aCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2dnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByaW50IHRvIGxvZyBjb25zb2xlIG9mIHRoZSBub3RlYm9vayBjdXJyZW50bHkgYmVpbmcgZGVidWdnZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2dlci5sb2coeyB0eXBlOiAndGV4dCcsIGRhdGEsIGxldmVsOiBsb2dnZXIubGV2ZWwgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmYWxsYmFjayB0byBwcmludGluZyB0byBkZXZ0b29scyBjb25zb2xlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmRlYnVnQ29udGludWUsIHtcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnQ29udGludWUnKSxcbiAgICAgICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdDb250aW51ZScpLFxuICAgICAgICAgICAgaWNvbjogRGVidWdnZXIuSWNvbnMuY29udGludWVJY29uLFxuICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiBzZXJ2aWNlLmhhc1N0b3BwZWRUaHJlYWRzKCksXG4gICAgICAgICAgICBleGVjdXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2VydmljZS5jb250aW51ZSgpO1xuICAgICAgICAgICAgICAgIGNvbW1hbmRzLm5vdGlmeUNvbW1hbmRDaGFuZ2VkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMudGVybWluYXRlLCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1Rlcm1pbmF0ZScpLFxuICAgICAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ1Rlcm1pbmF0ZScpLFxuICAgICAgICAgICAgaWNvbjogRGVidWdnZXIuSWNvbnMudGVybWluYXRlSWNvbixcbiAgICAgICAgICAgIGlzRW5hYmxlZDogKCkgPT4gc2VydmljZS5oYXNTdG9wcGVkVGhyZWFkcygpLFxuICAgICAgICAgICAgZXhlY3V0ZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHNlcnZpY2UucmVzdGFydCgpO1xuICAgICAgICAgICAgICAgIGNvbW1hbmRzLm5vdGlmeUNvbW1hbmRDaGFuZ2VkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMubmV4dCwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdOZXh0JyksXG4gICAgICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnTmV4dCcpLFxuICAgICAgICAgICAgaWNvbjogRGVidWdnZXIuSWNvbnMuc3RlcE92ZXJJY29uLFxuICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiBzZXJ2aWNlLmhhc1N0b3BwZWRUaHJlYWRzKCksXG4gICAgICAgICAgICBleGVjdXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2VydmljZS5uZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuc3RlcEluLCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1N0ZXAgSW4nKSxcbiAgICAgICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdTdGVwIEluJyksXG4gICAgICAgICAgICBpY29uOiBEZWJ1Z2dlci5JY29ucy5zdGVwSW50b0ljb24sXG4gICAgICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IHNlcnZpY2UuaGFzU3RvcHBlZFRocmVhZHMoKSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBzZXJ2aWNlLnN0ZXBJbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnN0ZXBPdXQsIHtcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnU3RlcCBPdXQnKSxcbiAgICAgICAgICAgIGNhcHRpb246IHRyYW5zLl9fKCdTdGVwIE91dCcpLFxuICAgICAgICAgICAgaWNvbjogRGVidWdnZXIuSWNvbnMuc3RlcE91dEljb24sXG4gICAgICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IHNlcnZpY2UuaGFzU3RvcHBlZFRocmVhZHMoKSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBzZXJ2aWNlLnN0ZXBPdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5wYXVzZSwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdFbmFibGUgLyBEaXNhYmxlIHBhdXNpbmcgb24gZXhjZXB0aW9ucycpLFxuICAgICAgICAgICAgY2FwdGlvbjogKCkgPT4gc2VydmljZS5pc1N0YXJ0ZWRcbiAgICAgICAgICAgICAgICA/IHNlcnZpY2UucGF1c2VPbkV4Y2VwdGlvbnNJc1ZhbGlkKClcbiAgICAgICAgICAgICAgICAgICAgPyBzZXJ2aWNlLmlzUGF1c2luZ09uRXhjZXB0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgPyB0cmFucy5fXygnRGlzYWJsZSBwYXVzaW5nIG9uIGV4Y2VwdGlvbnMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0cmFucy5fXygnRW5hYmxlIHBhdXNpbmcgb24gZXhjZXB0aW9ucycpXG4gICAgICAgICAgICAgICAgICAgIDogdHJhbnMuX18oJ0tlcm5lbCBkb2VzIG5vdCBzdXBwb3J0IHBhdXNpbmcgb24gZXhjZXB0aW9ucy4nKVxuICAgICAgICAgICAgICAgIDogdHJhbnMuX18oJ0VuYWJsZSAvIERpc2FibGUgcGF1c2luZyBvbiBleGNlcHRpb25zJyksXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdqcC1QYXVzZU9uRXhjZXB0aW9ucycsXG4gICAgICAgICAgICBpY29uOiBEZWJ1Z2dlci5JY29ucy5wYXVzZU9uRXhjZXB0aW9uc0ljb24sXG4gICAgICAgICAgICBpc1RvZ2dsZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VydmljZS5pc1BhdXNpbmdPbkV4Y2VwdGlvbnM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiBzZXJ2aWNlLnBhdXNlT25FeGNlcHRpb25zSXNWYWxpZCgpLFxuICAgICAgICAgICAgZXhlY3V0ZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHNlcnZpY2UucGF1c2VPbkV4Y2VwdGlvbnMoIXNlcnZpY2UuaXNQYXVzaW5nT25FeGNlcHRpb25zKTtcbiAgICAgICAgICAgICAgICBjb21tYW5kcy5ub3RpZnlDb21tYW5kQ2hhbmdlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2VydmljZS5ldmVudE1lc3NhZ2UuY29ubmVjdCgoXywgZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbW1hbmRzLm5vdGlmeUNvbW1hbmRDaGFuZ2VkKCk7XG4gICAgICAgICAgICBpZiAobGFiU2hlbGwgJiYgZXZlbnQuZXZlbnQgPT09ICdpbml0aWFsaXplZCcpIHtcbiAgICAgICAgICAgICAgICBsYWJTaGVsbC5hY3RpdmF0ZUJ5SWQoc2lkZWJhci5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzZXJ2aWNlLnNlc3Npb25DaGFuZ2VkLmNvbm5lY3QoXyA9PiB7XG4gICAgICAgICAgICBjb21tYW5kcy5ub3RpZnlDb21tYW5kQ2hhbmdlZCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHJlc3RvcmVyKSB7XG4gICAgICAgICAgICByZXN0b3Jlci5hZGQoc2lkZWJhciwgJ2RlYnVnZ2VyLXNpZGViYXInKTtcbiAgICAgICAgfVxuICAgICAgICBzaWRlYmFyLm5vZGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3JlZ2lvbicpO1xuICAgICAgICBzaWRlYmFyLm5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdHJhbnMuX18oJ0RlYnVnZ2VyIHNlY3Rpb24nKSk7XG4gICAgICAgIHNoZWxsLmFkZChzaWRlYmFyLCAncmlnaHQnKTtcbiAgICAgICAgaWYgKHBhbGV0dGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gdHJhbnMuX18oJ0RlYnVnZ2VyJyk7XG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgQ29tbWFuZElEcy5kZWJ1Z0NvbnRpbnVlLFxuICAgICAgICAgICAgICAgIENvbW1hbmRJRHMudGVybWluYXRlLFxuICAgICAgICAgICAgICAgIENvbW1hbmRJRHMubmV4dCxcbiAgICAgICAgICAgICAgICBDb21tYW5kSURzLnN0ZXBJbixcbiAgICAgICAgICAgICAgICBDb21tYW5kSURzLnN0ZXBPdXQsXG4gICAgICAgICAgICAgICAgQ29tbWFuZElEcy5ldmFsdWF0ZSxcbiAgICAgICAgICAgICAgICBDb21tYW5kSURzLnBhdXNlXG4gICAgICAgICAgICBdLmZvckVhY2goY29tbWFuZCA9PiB7XG4gICAgICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZCwgY2F0ZWdvcnkgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVidWdnZXJTb3VyY2VzKSB7XG4gICAgICAgICAgICBjb25zdCB7IG1vZGVsIH0gPSBzZXJ2aWNlO1xuICAgICAgICAgICAgY29uc3QgcmVhZE9ubHlFZGl0b3JGYWN0b3J5ID0gbmV3IERlYnVnZ2VyLlJlYWRPbmx5RWRpdG9yRmFjdG9yeSh7XG4gICAgICAgICAgICAgICAgZWRpdG9yU2VydmljZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3Qgb25DdXJyZW50RnJhbWVDaGFuZ2VkID0gKF8sIGZyYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nLCBfaCwgX2o7XG4gICAgICAgICAgICAgICAgZGVidWdnZXJTb3VyY2VzXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZm9jdXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGtlcm5lbDogKF9kID0gKF9jID0gKF9iID0gKF9hID0gc2VydmljZS5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29ubmVjdGlvbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmtlcm5lbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm5hbWUpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6ICcnLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiAoX2cgPSAoX2YgPSAoX2UgPSBzZXJ2aWNlLnNlc3Npb24pID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5jb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucGF0aCkgIT09IG51bGwgJiYgX2cgIT09IHZvaWQgMCA/IF9nIDogJycsXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogKF9qID0gKF9oID0gZnJhbWUgPT09IG51bGwgfHwgZnJhbWUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZyYW1lLnNvdXJjZSkgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLnBhdGgpICE9PSBudWxsICYmIF9qICE9PSB2b2lkIDAgPyBfaiA6ICcnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmZvckVhY2goZWRpdG9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIERlYnVnZ2VyLkVkaXRvckhhbmRsZXIuc2hvd0N1cnJlbnRMaW5lKGVkaXRvciwgZnJhbWUubGluZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IG9uS2VybmVsU291cmNlT3BlbmVkID0gKF8sIHNvdXJjZSwgYnJlYWtwb2ludCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb25DdXJyZW50U291cmNlT3BlbmVkKG51bGwsIHNvdXJjZSwgYnJlYWtwb2ludCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3Qgb25DdXJyZW50U291cmNlT3BlbmVkID0gKF8sIHNvdXJjZSwgYnJlYWtwb2ludCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZztcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29udGVudCwgbWltZVR5cGUsIHBhdGggfSA9IHNvdXJjZTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRzID0gZGVidWdnZXJTb3VyY2VzLmZpbmQoe1xuICAgICAgICAgICAgICAgICAgICBmb2N1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAga2VybmVsOiAoX2QgPSAoX2MgPSAoX2IgPSAoX2EgPSBzZXJ2aWNlLnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb25uZWN0aW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iua2VybmVsKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MubmFtZSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogJycsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IChfZyA9IChfZiA9IChfZSA9IHNlcnZpY2Uuc2Vzc2lvbikgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLmNvbm5lY3Rpb24pID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5wYXRoKSAhPT0gbnVsbCAmJiBfZyAhPT0gdm9pZCAwID8gX2cgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBwYXRoXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnJlYWtwb2ludCAmJiB0eXBlb2YgYnJlYWtwb2ludC5saW5lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKGVkaXRvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVkaXRvciBpbnN0YW5jZW9mIENvZGVNaXJyb3JFZGl0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNjcm9sbEludG9WaWV3Q2VudGVyZWQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogYnJlYWtwb2ludC5saW5lIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoOiBicmVha3BvaW50LmNvbHVtbiB8fCAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnJldmVhbFBvc2l0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IGJyZWFrcG9pbnQubGluZSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IGJyZWFrcG9pbnQuY29sdW1uIHx8IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0b3JXcmFwcGVyID0gcmVhZE9ubHlFZGl0b3JGYWN0b3J5LmNyZWF0ZU5ld0VkaXRvcih7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgIG1pbWVUeXBlLFxuICAgICAgICAgICAgICAgICAgICBwYXRoXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gZWRpdG9yV3JhcHBlci5lZGl0b3I7XG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdG9ySGFuZGxlciA9IG5ldyBEZWJ1Z2dlci5FZGl0b3JIYW5kbGVyKHtcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnZXJTZXJ2aWNlOiBzZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICBlZGl0b3IsXG4gICAgICAgICAgICAgICAgICAgIHBhdGhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlZGl0b3JXcmFwcGVyLmRpc3Bvc2VkLmNvbm5lY3QoKCkgPT4gZWRpdG9ySGFuZGxlci5kaXNwb3NlKCkpO1xuICAgICAgICAgICAgICAgIGRlYnVnZ2VyU291cmNlcy5vcGVuKHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFBhdGhFeHQuYmFzZW5hbWUocGF0aCksXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHBhdGgsXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcldyYXBwZXJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBmcmFtZSA9IHNlcnZpY2UubW9kZWwuY2FsbHN0YWNrLmZyYW1lO1xuICAgICAgICAgICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBEZWJ1Z2dlci5FZGl0b3JIYW5kbGVyLnNob3dDdXJyZW50TGluZShlZGl0b3IsIGZyYW1lLmxpbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtb2RlbC5jYWxsc3RhY2suY3VycmVudEZyYW1lQ2hhbmdlZC5jb25uZWN0KG9uQ3VycmVudEZyYW1lQ2hhbmdlZCk7XG4gICAgICAgICAgICBtb2RlbC5zb3VyY2VzLmN1cnJlbnRTb3VyY2VPcGVuZWQuY29ubmVjdChvbkN1cnJlbnRTb3VyY2VPcGVuZWQpO1xuICAgICAgICAgICAgbW9kZWwua2VybmVsU291cmNlcy5rZXJuZWxTb3VyY2VPcGVuZWQuY29ubmVjdChvbktlcm5lbFNvdXJjZU9wZW5lZCk7XG4gICAgICAgICAgICBtb2RlbC5icmVha3BvaW50cy5jbGlja2VkLmNvbm5lY3QoYXN5bmMgKF8sIGJyZWFrcG9pbnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IChfYSA9IGJyZWFrcG9pbnQuc291cmNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGF0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBhd2FpdCBzZXJ2aWNlLmdldFNvdXJjZSh7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZVJlZmVyZW5jZTogMCxcbiAgICAgICAgICAgICAgICAgICAgcGF0aFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9uQ3VycmVudFNvdXJjZU9wZW5lZChudWxsLCBzb3VyY2UsIGJyZWFrcG9pbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLyoqXG4gKiBFeHBvcnQgdGhlIHBsdWdpbnMgYXMgZGVmYXVsdC5cbiAqL1xuY29uc3QgcGx1Z2lucyA9IFtcbiAgICBzZXJ2aWNlLFxuICAgIGNvbnNvbGVzLFxuICAgIGZpbGVzLFxuICAgIG5vdGVib29rcyxcbiAgICB2YXJpYWJsZXMsXG4gICAgc2lkZWJhcixcbiAgICBtYWluLFxuICAgIHNvdXJjZXMsXG4gICAgY29uZmlndXJhdGlvblxuXTtcbmV4cG9ydCBkZWZhdWx0IHBsdWdpbnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9