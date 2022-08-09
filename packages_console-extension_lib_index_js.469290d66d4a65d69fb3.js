(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_console-extension_lib_index_js"],{

/***/ "../../packages/console-extension/lib/foreign.js":
/*!*******************************************************!*\
  !*** ../../packages/console-extension/lib/foreign.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "foreign": () => (/* binding */ foreign),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/console */ "webpack/sharing/consume/default/@jupyterlab/console/@jupyterlab/console");
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_console__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/properties */ "webpack/sharing/consume/default/@lumino/properties/@lumino/properties?140a");
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_properties__WEBPACK_IMPORTED_MODULE_4__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





/**
 * The console widget tracker provider.
 */
const foreign = {
    id: '@jupyterlab/console-extension:foreign',
    requires: [_jupyterlab_console__WEBPACK_IMPORTED_MODULE_1__.IConsoleTracker, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_2__.ISettingRegistry, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ICommandPalette],
    activate: activateForeign,
    autoStart: true
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (foreign);
function activateForeign(app, tracker, settingRegistry, translator, palette) {
    const trans = translator.load('jupyterlab');
    const { shell } = app;
    tracker.widgetAdded.connect((sender, widget) => {
        const console = widget.console;
        const handler = new _jupyterlab_console__WEBPACK_IMPORTED_MODULE_1__.ForeignHandler({
            sessionContext: console.sessionContext,
            parent: console
        });
        Private.foreignHandlerProperty.set(console, handler);
        // Property showAllKernelActivity configures foreign handler enabled on start.
        void settingRegistry
            .get('@jupyterlab/console-extension:tracker', 'showAllKernelActivity')
            .then(({ composite }) => {
            const showAllKernelActivity = composite;
            handler.enabled = showAllKernelActivity;
        });
        console.disposed.connect(() => {
            handler.dispose();
        });
    });
    const { commands } = app;
    const category = trans.__('Console');
    const toggleShowAllActivity = 'console:toggle-show-all-kernel-activity';
    // Get the current widget and activate unless the args specify otherwise.
    function getCurrent(args) {
        const widget = tracker.currentWidget;
        const activate = args['activate'] !== false;
        if (activate && widget) {
            shell.activateById(widget.id);
        }
        return widget;
    }
    commands.addCommand(toggleShowAllActivity, {
        label: args => trans.__('Show All Kernel Activity'),
        execute: args => {
            const current = getCurrent(args);
            if (!current) {
                return;
            }
            const handler = Private.foreignHandlerProperty.get(current.console);
            if (handler) {
                handler.enabled = !handler.enabled;
            }
        },
        isToggled: () => {
            var _a;
            return tracker.currentWidget !== null &&
                !!((_a = Private.foreignHandlerProperty.get(tracker.currentWidget.console)) === null || _a === void 0 ? void 0 : _a.enabled);
        },
        isEnabled: () => tracker.currentWidget !== null &&
            tracker.currentWidget === shell.currentWidget
    });
    if (palette) {
        palette.addItem({
            command: toggleShowAllActivity,
            category,
            args: { isPalette: true }
        });
    }
}
/*
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * An attached property for a console's foreign handler.
     */
    Private.foreignHandlerProperty = new _lumino_properties__WEBPACK_IMPORTED_MODULE_4__.AttachedProperty({
        name: 'foreignHandler',
        create: () => undefined
    });
})(Private || (Private = {}));
//# sourceMappingURL=foreign.js.map

/***/ }),

/***/ "../../packages/console-extension/lib/index.js":
/*!*****************************************************!*\
  !*** ../../packages/console-extension/lib/index.js ***!
  \*****************************************************/
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
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/console */ "webpack/sharing/consume/default/@jupyterlab/console/@jupyterlab/console");
/* harmony import */ var _jupyterlab_console__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_console__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable?7038");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _foreign__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./foreign */ "../../packages/console-extension/lib/foreign.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module console-extension
 */















/**
 * The command IDs used by the console plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.autoClosingBrackets = 'console:toggle-autoclosing-brackets';
    CommandIDs.create = 'console:create';
    CommandIDs.clear = 'console:clear';
    CommandIDs.runUnforced = 'console:run-unforced';
    CommandIDs.runForced = 'console:run-forced';
    CommandIDs.linebreak = 'console:linebreak';
    CommandIDs.interrupt = 'console:interrupt-kernel';
    CommandIDs.restart = 'console:restart-kernel';
    CommandIDs.closeAndShutdown = 'console:close-and-shutdown';
    CommandIDs.open = 'console:open';
    CommandIDs.inject = 'console:inject';
    CommandIDs.changeKernel = 'console:change-kernel';
    CommandIDs.enterToExecute = 'console:enter-to-execute';
    CommandIDs.shiftEnterToExecute = 'console:shift-enter-to-execute';
    CommandIDs.interactionMode = 'console:interaction-mode';
    CommandIDs.replaceSelection = 'console:replace-selection';
})(CommandIDs || (CommandIDs = {}));
/**
 * The console widget tracker provider.
 */
const tracker = {
    id: '@jupyterlab/console-extension:tracker',
    provides: _jupyterlab_console__WEBPACK_IMPORTED_MODULE_3__.IConsoleTracker,
    requires: [
        _jupyterlab_console__WEBPACK_IMPORTED_MODULE_3__.ConsolePanel.IContentFactory,
        _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__.IEditorServices,
        _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_7__.IRenderMimeRegistry,
        _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_8__.ISettingRegistry,
        _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_9__.ITranslator
    ],
    optional: [
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserFactory,
        _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_6__.IMainMenu,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette,
        _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_5__.ILauncher,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabStatus,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ISessionContextDialogs
    ],
    activate: activateConsole,
    autoStart: true
};
/**
 * The console widget content factory.
 */
const factory = {
    id: '@jupyterlab/console-extension:factory',
    provides: _jupyterlab_console__WEBPACK_IMPORTED_MODULE_3__.ConsolePanel.IContentFactory,
    requires: [_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_2__.IEditorServices],
    autoStart: true,
    activate: (app, editorServices) => {
        const editorFactory = editorServices.factoryService.newInlineEditor;
        return new _jupyterlab_console__WEBPACK_IMPORTED_MODULE_3__.ConsolePanel.ContentFactory({ editorFactory });
    }
};
/**
 * Export the plugins as the default.
 */
const plugins = [factory, tracker, _foreign__WEBPACK_IMPORTED_MODULE_14__.default];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
/**
 * Activate the console extension.
 */
async function activateConsole(app, contentFactory, editorServices, rendermime, settingRegistry, translator, restorer, browserFactory, mainMenu, palette, launcher, status, sessionDialogs) {
    const trans = translator.load('jupyterlab');
    const manager = app.serviceManager;
    const { commands, shell } = app;
    const category = trans.__('Console');
    sessionDialogs = sessionDialogs !== null && sessionDialogs !== void 0 ? sessionDialogs : _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.sessionContextDialogs;
    // Create a widget tracker for all console panels.
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace: 'console'
    });
    // Handle state restoration.
    if (restorer) {
        void restorer.restore(tracker, {
            command: CommandIDs.create,
            args: widget => {
                const { path, name, kernelPreference } = widget.console.sessionContext;
                return {
                    path,
                    name,
                    kernelPreference: Object.assign({}, kernelPreference)
                };
            },
            name: widget => { var _a; return (_a = widget.console.sessionContext.path) !== null && _a !== void 0 ? _a : _lumino_coreutils__WEBPACK_IMPORTED_MODULE_12__.UUID.uuid4(); },
            when: manager.ready
        });
    }
    // Add a launcher item if the launcher is available.
    if (launcher) {
        void manager.ready.then(() => {
            let disposables = null;
            const onSpecsChanged = () => {
                if (disposables) {
                    disposables.dispose();
                    disposables = null;
                }
                const specs = manager.kernelspecs.specs;
                if (!specs) {
                    return;
                }
                disposables = new _lumino_disposable__WEBPACK_IMPORTED_MODULE_13__.DisposableSet();
                for (const name in specs.kernelspecs) {
                    const rank = name === specs.default ? 0 : Infinity;
                    const spec = specs.kernelspecs[name];
                    let kernelIconUrl = spec.resources['logo-64x64'];
                    disposables.add(launcher.add({
                        command: CommandIDs.create,
                        args: { isLauncher: true, kernelPreference: { name } },
                        category: trans.__('Console'),
                        rank,
                        kernelIconUrl,
                        metadata: {
                            kernel: _lumino_coreutils__WEBPACK_IMPORTED_MODULE_12__.JSONExt.deepCopy(spec.metadata || {})
                        }
                    }));
                }
            };
            onSpecsChanged();
            manager.kernelspecs.specsChanged.connect(onSpecsChanged);
        });
    }
    /**
     * Create a console for a given path.
     */
    async function createConsole(options) {
        var _a;
        await manager.ready;
        const panel = new _jupyterlab_console__WEBPACK_IMPORTED_MODULE_3__.ConsolePanel(Object.assign({ manager,
            contentFactory, mimeTypeService: editorServices.mimeTypeService, rendermime,
            translator, setBusy: (_a = (status && (() => status.setBusy()))) !== null && _a !== void 0 ? _a : undefined }, options));
        const interactionMode = (await settingRegistry.get('@jupyterlab/console-extension:tracker', 'interactionMode')).composite;
        panel.console.node.dataset.jpInteractionMode = interactionMode;
        // Add the console panel to the tracker. We want the panel to show up before
        // any kernel selection dialog, so we do not await panel.session.ready;
        await tracker.add(panel);
        panel.sessionContext.propertyChanged.connect(() => {
            void tracker.save(panel);
        });
        shell.add(panel, 'main', {
            ref: options.ref,
            mode: options.insertMode,
            activate: options.activate !== false
        });
        return panel;
    }
    const mapOption = (editor, config, option) => {
        if (config[option] === undefined) {
            return;
        }
        switch (option) {
            case 'autoClosingBrackets':
                editor.setOption('autoClosingBrackets', config['autoClosingBrackets']);
                break;
            case 'cursorBlinkRate':
                editor.setOption('cursorBlinkRate', config['cursorBlinkRate']);
                break;
            case 'fontFamily':
                editor.setOption('fontFamily', config['fontFamily']);
                break;
            case 'fontSize':
                editor.setOption('fontSize', config['fontSize']);
                break;
            case 'lineHeight':
                editor.setOption('lineHeight', config['lineHeight']);
                break;
            case 'lineNumbers':
                editor.setOption('lineNumbers', config['lineNumbers']);
                break;
            case 'lineWrap':
                editor.setOption('lineWrap', config['lineWrap']);
                break;
            case 'matchBrackets':
                editor.setOption('matchBrackets', config['matchBrackets']);
                break;
            case 'readOnly':
                editor.setOption('readOnly', config['readOnly']);
                break;
            case 'insertSpaces':
                editor.setOption('insertSpaces', config['insertSpaces']);
                break;
            case 'tabSize':
                editor.setOption('tabSize', config['tabSize']);
                break;
            case 'wordWrapColumn':
                editor.setOption('wordWrapColumn', config['wordWrapColumn']);
                break;
            case 'rulers':
                editor.setOption('rulers', config['rulers']);
                break;
            case 'codeFolding':
                editor.setOption('codeFolding', config['codeFolding']);
                break;
        }
    };
    const setOption = (editor, config) => {
        if (editor === undefined) {
            return;
        }
        mapOption(editor, config, 'autoClosingBrackets');
        mapOption(editor, config, 'cursorBlinkRate');
        mapOption(editor, config, 'fontFamily');
        mapOption(editor, config, 'fontSize');
        mapOption(editor, config, 'lineHeight');
        mapOption(editor, config, 'lineNumbers');
        mapOption(editor, config, 'lineWrap');
        mapOption(editor, config, 'matchBrackets');
        mapOption(editor, config, 'readOnly');
        mapOption(editor, config, 'insertSpaces');
        mapOption(editor, config, 'tabSize');
        mapOption(editor, config, 'wordWrapColumn');
        mapOption(editor, config, 'rulers');
        mapOption(editor, config, 'codeFolding');
    };
    const pluginId = '@jupyterlab/console-extension:tracker';
    let interactionMode;
    let promptCellConfig;
    /**
     * Update settings for one console or all consoles.
     *
     * @param panel Optional - single console to update.
     */
    async function updateSettings(panel) {
        interactionMode = (await settingRegistry.get(pluginId, 'interactionMode'))
            .composite;
        promptCellConfig = (await settingRegistry.get(pluginId, 'promptCellConfig'))
            .composite;
        const setWidgetOptions = (widget) => {
            var _a;
            widget.console.node.dataset.jpInteractionMode = interactionMode;
            // Update future promptCells
            widget.console.editorConfig = promptCellConfig;
            // Update promptCell already on screen
            setOption((_a = widget.console.promptCell) === null || _a === void 0 ? void 0 : _a.editor, promptCellConfig);
        };
        if (panel) {
            setWidgetOptions(panel);
        }
        else {
            tracker.forEach(setWidgetOptions);
        }
    }
    settingRegistry.pluginChanged.connect((sender, plugin) => {
        if (plugin === pluginId) {
            void updateSettings();
        }
    });
    await updateSettings();
    // Apply settings when a console is created.
    tracker.widgetAdded.connect((sender, panel) => {
        void updateSettings(panel);
    });
    commands.addCommand(CommandIDs.autoClosingBrackets, {
        execute: async (args) => {
            var _a;
            promptCellConfig.autoClosingBrackets = !!((_a = args['force']) !== null && _a !== void 0 ? _a : !promptCellConfig.autoClosingBrackets);
            await settingRegistry.set(pluginId, 'promptCellConfig', promptCellConfig);
        },
        label: trans.__('Auto Close Brackets for Code Console Prompt'),
        isToggled: () => promptCellConfig.autoClosingBrackets
    });
    /**
     * Whether there is an active console.
     */
    function isEnabled() {
        return (tracker.currentWidget !== null &&
            tracker.currentWidget === shell.currentWidget);
    }
    let command = CommandIDs.open;
    commands.addCommand(command, {
        execute: (args) => {
            const path = args['path'];
            const widget = tracker.find(value => {
                var _a;
                return ((_a = value.console.sessionContext.session) === null || _a === void 0 ? void 0 : _a.path) === path;
            });
            if (widget) {
                if (args.activate !== false) {
                    shell.activateById(widget.id);
                }
                return widget;
            }
            else {
                return manager.ready.then(() => {
                    const model = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_11__.find)(manager.sessions.running(), item => {
                        return item.path === path;
                    });
                    if (model) {
                        return createConsole(args);
                    }
                    return Promise.reject(`No running kernel session for path: ${path}`);
                });
            }
        }
    });
    command = CommandIDs.create;
    commands.addCommand(command, {
        label: args => {
            var _a, _b, _c, _d;
            if (args['isPalette']) {
                return trans.__('New Console');
            }
            else if (args['isLauncher'] && args['kernelPreference']) {
                const kernelPreference = args['kernelPreference'];
                // TODO: Lumino command functions should probably be allowed to return undefined?
                return ((_d = (_c = (_b = (_a = manager.kernelspecs) === null || _a === void 0 ? void 0 : _a.specs) === null || _b === void 0 ? void 0 : _b.kernelspecs[kernelPreference.name || '']) === null || _c === void 0 ? void 0 : _c.display_name) !== null && _d !== void 0 ? _d : '');
            }
            return trans.__('Console');
        },
        icon: args => (args['isPalette'] ? undefined : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_10__.consoleIcon),
        execute: args => {
            var _a;
            const basePath = (_a = (args['basePath'] ||
                args['cwd'] || (browserFactory === null || browserFactory === void 0 ? void 0 : browserFactory.defaultBrowser.model.path))) !== null && _a !== void 0 ? _a : '';
            return createConsole(Object.assign({ basePath }, args));
        }
    });
    // Get the current widget and activate unless the args specify otherwise.
    function getCurrent(args) {
        const widget = tracker.currentWidget;
        const activate = args['activate'] !== false;
        if (activate && widget) {
            shell.activateById(widget.id);
        }
        return widget !== null && widget !== void 0 ? widget : null;
    }
    commands.addCommand(CommandIDs.clear, {
        label: trans.__('Clear Console Cells'),
        execute: args => {
            const current = getCurrent(args);
            if (!current) {
                return;
            }
            current.console.clear();
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.runUnforced, {
        label: trans.__('Run Cell (unforced)'),
        execute: args => {
            const current = getCurrent(args);
            if (!current) {
                return;
            }
            return current.console.execute();
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.runForced, {
        label: trans.__('Run Cell (forced)'),
        execute: args => {
            const current = getCurrent(args);
            if (!current) {
                return;
            }
            return current.console.execute(true);
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.linebreak, {
        label: trans.__('Insert Line Break'),
        execute: args => {
            const current = getCurrent(args);
            if (!current) {
                return;
            }
            current.console.insertLinebreak();
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.replaceSelection, {
        label: trans.__('Replace Selection in Console'),
        execute: args => {
            const current = getCurrent(args);
            if (!current) {
                return;
            }
            const text = args['text'] || '';
            current.console.replaceSelection(text);
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.interrupt, {
        label: trans.__('Interrupt Kernel'),
        execute: args => {
            var _a;
            const current = getCurrent(args);
            if (!current) {
                return;
            }
            const kernel = (_a = current.console.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
            if (kernel) {
                return kernel.interrupt();
            }
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.restart, {
        label: trans.__('Restart Kernel…'),
        execute: args => {
            const current = getCurrent(args);
            if (!current) {
                return;
            }
            return sessionDialogs.restart(current.console.sessionContext, translator);
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.closeAndShutdown, {
        label: trans.__('Close and Shut Down…'),
        execute: args => {
            const current = getCurrent(args);
            if (!current) {
                return;
            }
            return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                title: trans.__('Shut down the console?'),
                body: trans.__('Are you sure you want to close "%1"?', current.title.label),
                buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton(), _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton()]
            }).then(result => {
                if (result.button.accept) {
                    return current.console.sessionContext.shutdown().then(() => {
                        current.dispose();
                        return true;
                    });
                }
                else {
                    return false;
                }
            });
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.inject, {
        execute: args => {
            const path = args['path'];
            tracker.find(widget => {
                var _a;
                if (((_a = widget.console.sessionContext.session) === null || _a === void 0 ? void 0 : _a.path) === path) {
                    if (args['activate'] !== false) {
                        shell.activateById(widget.id);
                    }
                    void widget.console.inject(args['code'], args['metadata']);
                    return true;
                }
                return false;
            });
        },
        isEnabled
    });
    commands.addCommand(CommandIDs.changeKernel, {
        label: trans.__('Change Kernel…'),
        execute: args => {
            const current = getCurrent(args);
            if (!current) {
                return;
            }
            return sessionDialogs.selectKernel(current.console.sessionContext, translator);
        },
        isEnabled
    });
    if (palette) {
        // Add command palette items
        [
            CommandIDs.create,
            CommandIDs.linebreak,
            CommandIDs.clear,
            CommandIDs.runUnforced,
            CommandIDs.runForced,
            CommandIDs.restart,
            CommandIDs.interrupt,
            CommandIDs.changeKernel,
            CommandIDs.closeAndShutdown
        ].forEach(command => {
            palette.addItem({ command, category, args: { isPalette: true } });
        });
    }
    if (mainMenu) {
        // Add a close and shutdown command to the file menu.
        mainMenu.fileMenu.closeAndCleaners.add({
            tracker,
            closeAndCleanupLabel: (n) => trans.__('Shutdown Console'),
            closeAndCleanup: (current) => {
                return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
                    title: trans.__('Shut down the Console?'),
                    body: trans.__('Are you sure you want to close "%1"?', current.title.label),
                    buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton(), _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton()]
                }).then(result => {
                    if (result.button.accept) {
                        return current.console.sessionContext.shutdown().then(() => {
                            current.dispose();
                        });
                    }
                    else {
                        return void 0;
                    }
                });
            }
        });
        // Add a kernel user to the Kernel menu
        mainMenu.kernelMenu.kernelUsers.add({
            tracker,
            restartKernelAndClearLabel: n => trans.__('Restart Kernel and Clear Console'),
            interruptKernel: current => {
                var _a;
                const kernel = (_a = current.console.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
                if (kernel) {
                    return kernel.interrupt();
                }
                return Promise.resolve(void 0);
            },
            restartKernel: current => sessionDialogs.restart(current.console.sessionContext, translator),
            restartKernelAndClear: current => {
                return sessionDialogs
                    .restart(current.console.sessionContext)
                    .then(restarted => {
                    if (restarted) {
                        current.console.clear();
                    }
                    return restarted;
                });
            },
            changeKernel: current => sessionDialogs.selectKernel(current.console.sessionContext, translator),
            shutdownKernel: current => current.console.sessionContext.shutdown()
        });
        // Add a code runner to the Run menu.
        mainMenu.runMenu.codeRunners.add({
            tracker,
            runLabel: (n) => trans.__('Run Cell'),
            run: current => current.console.execute(true)
        });
        // Add a clearer to the edit menu
        mainMenu.editMenu.clearers.add({
            tracker,
            clearCurrentLabel: (n) => trans.__('Clear Console Cell'),
            clearCurrent: (current) => {
                return current.console.clear();
            }
        });
    }
    // For backwards compatibility and clarity, we explicitly label the run
    // keystroke with the actual effected change, rather than the generic
    // "notebook" or "terminal" interaction mode. When this interaction mode
    // affects more than just the run keystroke, we can make this menu title more
    // generic.
    const runShortcutTitles = {
        notebook: trans.__('Execute with Shift+Enter'),
        terminal: trans.__('Execute with Enter')
    };
    // Add the execute keystroke setting submenu.
    commands.addCommand(CommandIDs.interactionMode, {
        label: args => runShortcutTitles[args['interactionMode']] || '',
        execute: async (args) => {
            const key = 'keyMap';
            try {
                await settingRegistry.set(pluginId, 'interactionMode', args['interactionMode']);
            }
            catch (reason) {
                console.error(`Failed to set ${pluginId}:${key} - ${reason.message}`);
            }
        },
        isToggled: args => args['interactionMode'] === interactionMode
    });
    if (mainMenu) {
        // Add kernel information to the application help menu.
        mainMenu.helpMenu.kernelUsers.add({
            tracker,
            getKernel: current => { var _a; return (_a = current.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel; }
        });
    }
    return tracker;
}
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29uc29sZS1leHRlbnNpb24vbGliL2ZvcmVpZ24uanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NvbnNvbGUtZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ3VEO0FBQ2U7QUFDUDtBQUNUO0FBQ0E7QUFDdEQ7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLGVBQWUsZ0VBQWUsRUFBRSx5RUFBZ0IsRUFBRSxnRUFBVztBQUM3RCxlQUFlLGlFQUFlO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLE9BQU8sRUFBQztBQUN2QjtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQSw0QkFBNEIsK0RBQWM7QUFDMUM7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0wsV0FBVyxXQUFXO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLGdFQUFnQjtBQUN6RDtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUMsMEJBQTBCO0FBQzNCLG1DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDc0U7QUFDbUU7QUFDaEY7QUFDVztBQUNOO0FBQ2I7QUFDQTtBQUNZO0FBQ0U7QUFDVDtBQUNFO0FBQ2Y7QUFDUztBQUNDO0FBQ25CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGdFQUFlO0FBQzdCO0FBQ0EsUUFBUSw2RUFBNEI7QUFDcEMsUUFBUSxtRUFBZTtBQUN2QixRQUFRLHVFQUFtQjtBQUMzQixRQUFRLHlFQUFnQjtBQUN4QixRQUFRLGdFQUFXO0FBQ25CO0FBQ0E7QUFDQSxRQUFRLG9FQUFlO0FBQ3ZCLFFBQVEsd0VBQW1CO0FBQzNCLFFBQVEsMkRBQVM7QUFDakIsUUFBUSxpRUFBZTtBQUN2QixRQUFRLDJEQUFTO0FBQ2pCLFFBQVEsK0RBQVU7QUFDbEIsUUFBUSx3RUFBc0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyw2RUFBNEI7QUFDMUMsZUFBZSxtRUFBZTtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsNEVBQTJCLEVBQUUsZ0JBQWdCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsOENBQU87QUFDMUMsaUVBQWUsT0FBTyxFQUFDO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsa0JBQWtCO0FBQzdCO0FBQ0EsNkZBQTZGLHVFQUFxQjtBQUNsSDtBQUNBLHdCQUF3QiwrREFBYTtBQUNyQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLCtCQUErQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7QUFDdEQ7QUFDQSxhQUFhO0FBQ2IsNkJBQTZCLFFBQVEsbUZBQW1GLDBEQUFVLEdBQUcsRUFBRTtBQUN2STtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDhEQUFhO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixzQ0FBc0MsT0FBTyxFQUFFO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGdFQUFnQixvQkFBb0I7QUFDeEU7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsNkRBQVksZ0JBQWdCO0FBQ3REO0FBQ0EseUhBQXlIO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHdEQUFJO0FBQ3RDO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRixLQUFLO0FBQ3RGLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULHVEQUF1RCxtRUFBVztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxXQUFXO0FBQzNEO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdFQUFVO0FBQzdCO0FBQ0E7QUFDQSwwQkFBMEIscUVBQW1CLElBQUksbUVBQWlCO0FBQ2xFLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsMkJBQTJCLGtCQUFrQixFQUFFO0FBQzVFLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnRUFBVTtBQUNqQztBQUNBO0FBQ0EsOEJBQThCLHFFQUFtQixJQUFJLG1FQUFpQjtBQUN0RSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsU0FBUyxHQUFHLElBQUksS0FBSyxlQUFlO0FBQ25GO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFFBQVEsNkZBQTZGO0FBQ3hJLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxpQyIsImZpbGUiOiJwYWNrYWdlc19jb25zb2xlLWV4dGVuc2lvbl9saWJfaW5kZXhfanMuNDY5MjkwZDY2ZDRhNjVkNjlmYjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBJQ29tbWFuZFBhbGV0dGUgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBGb3JlaWduSGFuZGxlciwgSUNvbnNvbGVUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29uc29sZSc7XG5pbXBvcnQgeyBJU2V0dGluZ1JlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2V0dGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7IElUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgQXR0YWNoZWRQcm9wZXJ0eSB9IGZyb20gJ0BsdW1pbm8vcHJvcGVydGllcyc7XG4vKipcbiAqIFRoZSBjb25zb2xlIHdpZGdldCB0cmFja2VyIHByb3ZpZGVyLlxuICovXG5leHBvcnQgY29uc3QgZm9yZWlnbiA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2NvbnNvbGUtZXh0ZW5zaW9uOmZvcmVpZ24nLFxuICAgIHJlcXVpcmVzOiBbSUNvbnNvbGVUcmFja2VyLCBJU2V0dGluZ1JlZ2lzdHJ5LCBJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJQ29tbWFuZFBhbGV0dGVdLFxuICAgIGFjdGl2YXRlOiBhY3RpdmF0ZUZvcmVpZ24sXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuZXhwb3J0IGRlZmF1bHQgZm9yZWlnbjtcbmZ1bmN0aW9uIGFjdGl2YXRlRm9yZWlnbihhcHAsIHRyYWNrZXIsIHNldHRpbmdSZWdpc3RyeSwgdHJhbnNsYXRvciwgcGFsZXR0ZSkge1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgeyBzaGVsbCB9ID0gYXBwO1xuICAgIHRyYWNrZXIud2lkZ2V0QWRkZWQuY29ubmVjdCgoc2VuZGVyLCB3aWRnZXQpID0+IHtcbiAgICAgICAgY29uc3QgY29uc29sZSA9IHdpZGdldC5jb25zb2xlO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gbmV3IEZvcmVpZ25IYW5kbGVyKHtcbiAgICAgICAgICAgIHNlc3Npb25Db250ZXh0OiBjb25zb2xlLnNlc3Npb25Db250ZXh0LFxuICAgICAgICAgICAgcGFyZW50OiBjb25zb2xlXG4gICAgICAgIH0pO1xuICAgICAgICBQcml2YXRlLmZvcmVpZ25IYW5kbGVyUHJvcGVydHkuc2V0KGNvbnNvbGUsIGhhbmRsZXIpO1xuICAgICAgICAvLyBQcm9wZXJ0eSBzaG93QWxsS2VybmVsQWN0aXZpdHkgY29uZmlndXJlcyBmb3JlaWduIGhhbmRsZXIgZW5hYmxlZCBvbiBzdGFydC5cbiAgICAgICAgdm9pZCBzZXR0aW5nUmVnaXN0cnlcbiAgICAgICAgICAgIC5nZXQoJ0BqdXB5dGVybGFiL2NvbnNvbGUtZXh0ZW5zaW9uOnRyYWNrZXInLCAnc2hvd0FsbEtlcm5lbEFjdGl2aXR5JylcbiAgICAgICAgICAgIC50aGVuKCh7IGNvbXBvc2l0ZSB9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaG93QWxsS2VybmVsQWN0aXZpdHkgPSBjb21wb3NpdGU7XG4gICAgICAgICAgICBoYW5kbGVyLmVuYWJsZWQgPSBzaG93QWxsS2VybmVsQWN0aXZpdHk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmRpc3Bvc2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgaGFuZGxlci5kaXNwb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGNvbnN0IHsgY29tbWFuZHMgfSA9IGFwcDtcbiAgICBjb25zdCBjYXRlZ29yeSA9IHRyYW5zLl9fKCdDb25zb2xlJyk7XG4gICAgY29uc3QgdG9nZ2xlU2hvd0FsbEFjdGl2aXR5ID0gJ2NvbnNvbGU6dG9nZ2xlLXNob3ctYWxsLWtlcm5lbC1hY3Rpdml0eSc7XG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IHdpZGdldCBhbmQgYWN0aXZhdGUgdW5sZXNzIHRoZSBhcmdzIHNwZWNpZnkgb3RoZXJ3aXNlLlxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnQoYXJncykge1xuICAgICAgICBjb25zdCB3aWRnZXQgPSB0cmFja2VyLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgIGNvbnN0IGFjdGl2YXRlID0gYXJnc1snYWN0aXZhdGUnXSAhPT0gZmFsc2U7XG4gICAgICAgIGlmIChhY3RpdmF0ZSAmJiB3aWRnZXQpIHtcbiAgICAgICAgICAgIHNoZWxsLmFjdGl2YXRlQnlJZCh3aWRnZXQuaWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfVxuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQodG9nZ2xlU2hvd0FsbEFjdGl2aXR5LCB7XG4gICAgICAgIGxhYmVsOiBhcmdzID0+IHRyYW5zLl9fKCdTaG93IEFsbCBLZXJuZWwgQWN0aXZpdHknKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudChhcmdzKTtcbiAgICAgICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBQcml2YXRlLmZvcmVpZ25IYW5kbGVyUHJvcGVydHkuZ2V0KGN1cnJlbnQuY29uc29sZSk7XG4gICAgICAgICAgICBpZiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuZW5hYmxlZCA9ICFoYW5kbGVyLmVuYWJsZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzVG9nZ2xlZDogKCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNrZXIuY3VycmVudFdpZGdldCAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICEhKChfYSA9IFByaXZhdGUuZm9yZWlnbkhhbmRsZXJQcm9wZXJ0eS5nZXQodHJhY2tlci5jdXJyZW50V2lkZ2V0LmNvbnNvbGUpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZW5hYmxlZCk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZDogKCkgPT4gdHJhY2tlci5jdXJyZW50V2lkZ2V0ICE9PSBudWxsICYmXG4gICAgICAgICAgICB0cmFja2VyLmN1cnJlbnRXaWRnZXQgPT09IHNoZWxsLmN1cnJlbnRXaWRnZXRcbiAgICB9KTtcbiAgICBpZiAocGFsZXR0ZSkge1xuICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgY29tbWFuZDogdG9nZ2xlU2hvd0FsbEFjdGl2aXR5LFxuICAgICAgICAgICAgY2F0ZWdvcnksXG4gICAgICAgICAgICBhcmdzOiB7IGlzUGFsZXR0ZTogdHJ1ZSB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qXG4gKiBBIG5hbWVzcGFjZSBmb3IgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEFuIGF0dGFjaGVkIHByb3BlcnR5IGZvciBhIGNvbnNvbGUncyBmb3JlaWduIGhhbmRsZXIuXG4gICAgICovXG4gICAgUHJpdmF0ZS5mb3JlaWduSGFuZGxlclByb3BlcnR5ID0gbmV3IEF0dGFjaGVkUHJvcGVydHkoe1xuICAgICAgICBuYW1lOiAnZm9yZWlnbkhhbmRsZXInLFxuICAgICAgICBjcmVhdGU6ICgpID0+IHVuZGVmaW5lZFxuICAgIH0pO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mb3JlaWduLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGNvbnNvbGUtZXh0ZW5zaW9uXG4gKi9cbmltcG9ydCB7IElMYWJTdGF0dXMsIElMYXlvdXRSZXN0b3JlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IERpYWxvZywgSUNvbW1hbmRQYWxldHRlLCBJU2Vzc2lvbkNvbnRleHREaWFsb2dzLCBzZXNzaW9uQ29udGV4dERpYWxvZ3MsIHNob3dEaWFsb2csIFdpZGdldFRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBJRWRpdG9yU2VydmljZXMgfSBmcm9tICdAanVweXRlcmxhYi9jb2RlZWRpdG9yJztcbmltcG9ydCB7IENvbnNvbGVQYW5lbCwgSUNvbnNvbGVUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29uc29sZSc7XG5pbXBvcnQgeyBJRmlsZUJyb3dzZXJGYWN0b3J5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvZmlsZWJyb3dzZXInO1xuaW1wb3J0IHsgSUxhdW5jaGVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvbGF1bmNoZXInO1xuaW1wb3J0IHsgSU1haW5NZW51IH0gZnJvbSAnQGp1cHl0ZXJsYWIvbWFpbm1lbnUnO1xuaW1wb3J0IHsgSVJlbmRlck1pbWVSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWUnO1xuaW1wb3J0IHsgSVNldHRpbmdSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3NldHRpbmdyZWdpc3RyeSc7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGNvbnNvbGVJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBmaW5kIH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgSlNPTkV4dCwgVVVJRCB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IERpc3Bvc2FibGVTZXQgfSBmcm9tICdAbHVtaW5vL2Rpc3Bvc2FibGUnO1xuaW1wb3J0IGZvcmVpZ24gZnJvbSAnLi9mb3JlaWduJztcbi8qKlxuICogVGhlIGNvbW1hbmQgSURzIHVzZWQgYnkgdGhlIGNvbnNvbGUgcGx1Z2luLlxuICovXG52YXIgQ29tbWFuZElEcztcbihmdW5jdGlvbiAoQ29tbWFuZElEcykge1xuICAgIENvbW1hbmRJRHMuYXV0b0Nsb3NpbmdCcmFja2V0cyA9ICdjb25zb2xlOnRvZ2dsZS1hdXRvY2xvc2luZy1icmFja2V0cyc7XG4gICAgQ29tbWFuZElEcy5jcmVhdGUgPSAnY29uc29sZTpjcmVhdGUnO1xuICAgIENvbW1hbmRJRHMuY2xlYXIgPSAnY29uc29sZTpjbGVhcic7XG4gICAgQ29tbWFuZElEcy5ydW5VbmZvcmNlZCA9ICdjb25zb2xlOnJ1bi11bmZvcmNlZCc7XG4gICAgQ29tbWFuZElEcy5ydW5Gb3JjZWQgPSAnY29uc29sZTpydW4tZm9yY2VkJztcbiAgICBDb21tYW5kSURzLmxpbmVicmVhayA9ICdjb25zb2xlOmxpbmVicmVhayc7XG4gICAgQ29tbWFuZElEcy5pbnRlcnJ1cHQgPSAnY29uc29sZTppbnRlcnJ1cHQta2VybmVsJztcbiAgICBDb21tYW5kSURzLnJlc3RhcnQgPSAnY29uc29sZTpyZXN0YXJ0LWtlcm5lbCc7XG4gICAgQ29tbWFuZElEcy5jbG9zZUFuZFNodXRkb3duID0gJ2NvbnNvbGU6Y2xvc2UtYW5kLXNodXRkb3duJztcbiAgICBDb21tYW5kSURzLm9wZW4gPSAnY29uc29sZTpvcGVuJztcbiAgICBDb21tYW5kSURzLmluamVjdCA9ICdjb25zb2xlOmluamVjdCc7XG4gICAgQ29tbWFuZElEcy5jaGFuZ2VLZXJuZWwgPSAnY29uc29sZTpjaGFuZ2Uta2VybmVsJztcbiAgICBDb21tYW5kSURzLmVudGVyVG9FeGVjdXRlID0gJ2NvbnNvbGU6ZW50ZXItdG8tZXhlY3V0ZSc7XG4gICAgQ29tbWFuZElEcy5zaGlmdEVudGVyVG9FeGVjdXRlID0gJ2NvbnNvbGU6c2hpZnQtZW50ZXItdG8tZXhlY3V0ZSc7XG4gICAgQ29tbWFuZElEcy5pbnRlcmFjdGlvbk1vZGUgPSAnY29uc29sZTppbnRlcmFjdGlvbi1tb2RlJztcbiAgICBDb21tYW5kSURzLnJlcGxhY2VTZWxlY3Rpb24gPSAnY29uc29sZTpyZXBsYWNlLXNlbGVjdGlvbic7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbi8qKlxuICogVGhlIGNvbnNvbGUgd2lkZ2V0IHRyYWNrZXIgcHJvdmlkZXIuXG4gKi9cbmNvbnN0IHRyYWNrZXIgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9jb25zb2xlLWV4dGVuc2lvbjp0cmFja2VyJyxcbiAgICBwcm92aWRlczogSUNvbnNvbGVUcmFja2VyLFxuICAgIHJlcXVpcmVzOiBbXG4gICAgICAgIENvbnNvbGVQYW5lbC5JQ29udGVudEZhY3RvcnksXG4gICAgICAgIElFZGl0b3JTZXJ2aWNlcyxcbiAgICAgICAgSVJlbmRlck1pbWVSZWdpc3RyeSxcbiAgICAgICAgSVNldHRpbmdSZWdpc3RyeSxcbiAgICAgICAgSVRyYW5zbGF0b3JcbiAgICBdLFxuICAgIG9wdGlvbmFsOiBbXG4gICAgICAgIElMYXlvdXRSZXN0b3JlcixcbiAgICAgICAgSUZpbGVCcm93c2VyRmFjdG9yeSxcbiAgICAgICAgSU1haW5NZW51LFxuICAgICAgICBJQ29tbWFuZFBhbGV0dGUsXG4gICAgICAgIElMYXVuY2hlcixcbiAgICAgICAgSUxhYlN0YXR1cyxcbiAgICAgICAgSVNlc3Npb25Db250ZXh0RGlhbG9nc1xuICAgIF0sXG4gICAgYWN0aXZhdGU6IGFjdGl2YXRlQ29uc29sZSxcbiAgICBhdXRvU3RhcnQ6IHRydWVcbn07XG4vKipcbiAqIFRoZSBjb25zb2xlIHdpZGdldCBjb250ZW50IGZhY3RvcnkuXG4gKi9cbmNvbnN0IGZhY3RvcnkgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9jb25zb2xlLWV4dGVuc2lvbjpmYWN0b3J5JyxcbiAgICBwcm92aWRlczogQ29uc29sZVBhbmVsLklDb250ZW50RmFjdG9yeSxcbiAgICByZXF1aXJlczogW0lFZGl0b3JTZXJ2aWNlc10sXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBlZGl0b3JTZXJ2aWNlcykgPT4ge1xuICAgICAgICBjb25zdCBlZGl0b3JGYWN0b3J5ID0gZWRpdG9yU2VydmljZXMuZmFjdG9yeVNlcnZpY2UubmV3SW5saW5lRWRpdG9yO1xuICAgICAgICByZXR1cm4gbmV3IENvbnNvbGVQYW5lbC5Db250ZW50RmFjdG9yeSh7IGVkaXRvckZhY3RvcnkgfSk7XG4gICAgfVxufTtcbi8qKlxuICogRXhwb3J0IHRoZSBwbHVnaW5zIGFzIHRoZSBkZWZhdWx0LlxuICovXG5jb25zdCBwbHVnaW5zID0gW2ZhY3RvcnksIHRyYWNrZXIsIGZvcmVpZ25dO1xuZXhwb3J0IGRlZmF1bHQgcGx1Z2lucztcbi8qKlxuICogQWN0aXZhdGUgdGhlIGNvbnNvbGUgZXh0ZW5zaW9uLlxuICovXG5hc3luYyBmdW5jdGlvbiBhY3RpdmF0ZUNvbnNvbGUoYXBwLCBjb250ZW50RmFjdG9yeSwgZWRpdG9yU2VydmljZXMsIHJlbmRlcm1pbWUsIHNldHRpbmdSZWdpc3RyeSwgdHJhbnNsYXRvciwgcmVzdG9yZXIsIGJyb3dzZXJGYWN0b3J5LCBtYWluTWVudSwgcGFsZXR0ZSwgbGF1bmNoZXIsIHN0YXR1cywgc2Vzc2lvbkRpYWxvZ3MpIHtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGNvbnN0IG1hbmFnZXIgPSBhcHAuc2VydmljZU1hbmFnZXI7XG4gICAgY29uc3QgeyBjb21tYW5kcywgc2hlbGwgfSA9IGFwcDtcbiAgICBjb25zdCBjYXRlZ29yeSA9IHRyYW5zLl9fKCdDb25zb2xlJyk7XG4gICAgc2Vzc2lvbkRpYWxvZ3MgPSBzZXNzaW9uRGlhbG9ncyAhPT0gbnVsbCAmJiBzZXNzaW9uRGlhbG9ncyAhPT0gdm9pZCAwID8gc2Vzc2lvbkRpYWxvZ3MgOiBzZXNzaW9uQ29udGV4dERpYWxvZ3M7XG4gICAgLy8gQ3JlYXRlIGEgd2lkZ2V0IHRyYWNrZXIgZm9yIGFsbCBjb25zb2xlIHBhbmVscy5cbiAgICBjb25zdCB0cmFja2VyID0gbmV3IFdpZGdldFRyYWNrZXIoe1xuICAgICAgICBuYW1lc3BhY2U6ICdjb25zb2xlJ1xuICAgIH0pO1xuICAgIC8vIEhhbmRsZSBzdGF0ZSByZXN0b3JhdGlvbi5cbiAgICBpZiAocmVzdG9yZXIpIHtcbiAgICAgICAgdm9pZCByZXN0b3Jlci5yZXN0b3JlKHRyYWNrZXIsIHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuY3JlYXRlLFxuICAgICAgICAgICAgYXJnczogd2lkZ2V0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHBhdGgsIG5hbWUsIGtlcm5lbFByZWZlcmVuY2UgfSA9IHdpZGdldC5jb25zb2xlLnNlc3Npb25Db250ZXh0O1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGtlcm5lbFByZWZlcmVuY2U6IE9iamVjdC5hc3NpZ24oe30sIGtlcm5lbFByZWZlcmVuY2UpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYW1lOiB3aWRnZXQgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSB3aWRnZXQuY29uc29sZS5zZXNzaW9uQ29udGV4dC5wYXRoKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBVVUlELnV1aWQ0KCk7IH0sXG4gICAgICAgICAgICB3aGVuOiBtYW5hZ2VyLnJlYWR5XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBBZGQgYSBsYXVuY2hlciBpdGVtIGlmIHRoZSBsYXVuY2hlciBpcyBhdmFpbGFibGUuXG4gICAgaWYgKGxhdW5jaGVyKSB7XG4gICAgICAgIHZvaWQgbWFuYWdlci5yZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBkaXNwb3NhYmxlcyA9IG51bGw7XG4gICAgICAgICAgICBjb25zdCBvblNwZWNzQ2hhbmdlZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGlzcG9zYWJsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBkaXNwb3NhYmxlcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHNwZWNzID0gbWFuYWdlci5rZXJuZWxzcGVjcy5zcGVjcztcbiAgICAgICAgICAgICAgICBpZiAoIXNwZWNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGlzcG9zYWJsZXMgPSBuZXcgRGlzcG9zYWJsZVNldCgpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiBzcGVjcy5rZXJuZWxzcGVjcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5rID0gbmFtZSA9PT0gc3BlY3MuZGVmYXVsdCA/IDAgOiBJbmZpbml0eTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BlYyA9IHNwZWNzLmtlcm5lbHNwZWNzW25hbWVdO1xuICAgICAgICAgICAgICAgICAgICBsZXQga2VybmVsSWNvblVybCA9IHNwZWMucmVzb3VyY2VzWydsb2dvLTY0eDY0J107XG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2FibGVzLmFkZChsYXVuY2hlci5hZGQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5jcmVhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiB7IGlzTGF1bmNoZXI6IHRydWUsIGtlcm5lbFByZWZlcmVuY2U6IHsgbmFtZSB9IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogdHJhbnMuX18oJ0NvbnNvbGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmssXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXJuZWxJY29uVXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXJuZWw6IEpTT05FeHQuZGVlcENvcHkoc3BlYy5tZXRhZGF0YSB8fCB7fSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBvblNwZWNzQ2hhbmdlZCgpO1xuICAgICAgICAgICAgbWFuYWdlci5rZXJuZWxzcGVjcy5zcGVjc0NoYW5nZWQuY29ubmVjdChvblNwZWNzQ2hhbmdlZCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjb25zb2xlIGZvciBhIGdpdmVuIHBhdGguXG4gICAgICovXG4gICAgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQ29uc29sZShvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgYXdhaXQgbWFuYWdlci5yZWFkeTtcbiAgICAgICAgY29uc3QgcGFuZWwgPSBuZXcgQ29uc29sZVBhbmVsKE9iamVjdC5hc3NpZ24oeyBtYW5hZ2VyLFxuICAgICAgICAgICAgY29udGVudEZhY3RvcnksIG1pbWVUeXBlU2VydmljZTogZWRpdG9yU2VydmljZXMubWltZVR5cGVTZXJ2aWNlLCByZW5kZXJtaW1lLFxuICAgICAgICAgICAgdHJhbnNsYXRvciwgc2V0QnVzeTogKF9hID0gKHN0YXR1cyAmJiAoKCkgPT4gc3RhdHVzLnNldEJ1c3koKSkpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB1bmRlZmluZWQgfSwgb3B0aW9ucykpO1xuICAgICAgICBjb25zdCBpbnRlcmFjdGlvbk1vZGUgPSAoYXdhaXQgc2V0dGluZ1JlZ2lzdHJ5LmdldCgnQGp1cHl0ZXJsYWIvY29uc29sZS1leHRlbnNpb246dHJhY2tlcicsICdpbnRlcmFjdGlvbk1vZGUnKSkuY29tcG9zaXRlO1xuICAgICAgICBwYW5lbC5jb25zb2xlLm5vZGUuZGF0YXNldC5qcEludGVyYWN0aW9uTW9kZSA9IGludGVyYWN0aW9uTW9kZTtcbiAgICAgICAgLy8gQWRkIHRoZSBjb25zb2xlIHBhbmVsIHRvIHRoZSB0cmFja2VyLiBXZSB3YW50IHRoZSBwYW5lbCB0byBzaG93IHVwIGJlZm9yZVxuICAgICAgICAvLyBhbnkga2VybmVsIHNlbGVjdGlvbiBkaWFsb2csIHNvIHdlIGRvIG5vdCBhd2FpdCBwYW5lbC5zZXNzaW9uLnJlYWR5O1xuICAgICAgICBhd2FpdCB0cmFja2VyLmFkZChwYW5lbCk7XG4gICAgICAgIHBhbmVsLnNlc3Npb25Db250ZXh0LnByb3BlcnR5Q2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIHZvaWQgdHJhY2tlci5zYXZlKHBhbmVsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNoZWxsLmFkZChwYW5lbCwgJ21haW4nLCB7XG4gICAgICAgICAgICByZWY6IG9wdGlvbnMucmVmLFxuICAgICAgICAgICAgbW9kZTogb3B0aW9ucy5pbnNlcnRNb2RlLFxuICAgICAgICAgICAgYWN0aXZhdGU6IG9wdGlvbnMuYWN0aXZhdGUgIT09IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGFuZWw7XG4gICAgfVxuICAgIGNvbnN0IG1hcE9wdGlvbiA9IChlZGl0b3IsIGNvbmZpZywgb3B0aW9uKSA9PiB7XG4gICAgICAgIGlmIChjb25maWdbb3B0aW9uXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChvcHRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2F1dG9DbG9zaW5nQnJhY2tldHMnOlxuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb24oJ2F1dG9DbG9zaW5nQnJhY2tldHMnLCBjb25maWdbJ2F1dG9DbG9zaW5nQnJhY2tldHMnXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjdXJzb3JCbGlua1JhdGUnOlxuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb24oJ2N1cnNvckJsaW5rUmF0ZScsIGNvbmZpZ1snY3Vyc29yQmxpbmtSYXRlJ10pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9udEZhbWlseSc6XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbignZm9udEZhbWlseScsIGNvbmZpZ1snZm9udEZhbWlseSddKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ZvbnRTaXplJzpcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0T3B0aW9uKCdmb250U2l6ZScsIGNvbmZpZ1snZm9udFNpemUnXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsaW5lSGVpZ2h0JzpcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0T3B0aW9uKCdsaW5lSGVpZ2h0JywgY29uZmlnWydsaW5lSGVpZ2h0J10pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbGluZU51bWJlcnMnOlxuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb24oJ2xpbmVOdW1iZXJzJywgY29uZmlnWydsaW5lTnVtYmVycyddKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xpbmVXcmFwJzpcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0T3B0aW9uKCdsaW5lV3JhcCcsIGNvbmZpZ1snbGluZVdyYXAnXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtYXRjaEJyYWNrZXRzJzpcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0T3B0aW9uKCdtYXRjaEJyYWNrZXRzJywgY29uZmlnWydtYXRjaEJyYWNrZXRzJ10pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVhZE9ubHknOlxuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb24oJ3JlYWRPbmx5JywgY29uZmlnWydyZWFkT25seSddKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2luc2VydFNwYWNlcyc6XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbignaW5zZXJ0U3BhY2VzJywgY29uZmlnWydpbnNlcnRTcGFjZXMnXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0YWJTaXplJzpcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0T3B0aW9uKCd0YWJTaXplJywgY29uZmlnWyd0YWJTaXplJ10pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd29yZFdyYXBDb2x1bW4nOlxuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb24oJ3dvcmRXcmFwQ29sdW1uJywgY29uZmlnWyd3b3JkV3JhcENvbHVtbiddKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3J1bGVycyc6XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbigncnVsZXJzJywgY29uZmlnWydydWxlcnMnXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjb2RlRm9sZGluZyc6XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbignY29kZUZvbGRpbmcnLCBjb25maWdbJ2NvZGVGb2xkaW5nJ10pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBzZXRPcHRpb24gPSAoZWRpdG9yLCBjb25maWcpID0+IHtcbiAgICAgICAgaWYgKGVkaXRvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbWFwT3B0aW9uKGVkaXRvciwgY29uZmlnLCAnYXV0b0Nsb3NpbmdCcmFja2V0cycpO1xuICAgICAgICBtYXBPcHRpb24oZWRpdG9yLCBjb25maWcsICdjdXJzb3JCbGlua1JhdGUnKTtcbiAgICAgICAgbWFwT3B0aW9uKGVkaXRvciwgY29uZmlnLCAnZm9udEZhbWlseScpO1xuICAgICAgICBtYXBPcHRpb24oZWRpdG9yLCBjb25maWcsICdmb250U2l6ZScpO1xuICAgICAgICBtYXBPcHRpb24oZWRpdG9yLCBjb25maWcsICdsaW5lSGVpZ2h0Jyk7XG4gICAgICAgIG1hcE9wdGlvbihlZGl0b3IsIGNvbmZpZywgJ2xpbmVOdW1iZXJzJyk7XG4gICAgICAgIG1hcE9wdGlvbihlZGl0b3IsIGNvbmZpZywgJ2xpbmVXcmFwJyk7XG4gICAgICAgIG1hcE9wdGlvbihlZGl0b3IsIGNvbmZpZywgJ21hdGNoQnJhY2tldHMnKTtcbiAgICAgICAgbWFwT3B0aW9uKGVkaXRvciwgY29uZmlnLCAncmVhZE9ubHknKTtcbiAgICAgICAgbWFwT3B0aW9uKGVkaXRvciwgY29uZmlnLCAnaW5zZXJ0U3BhY2VzJyk7XG4gICAgICAgIG1hcE9wdGlvbihlZGl0b3IsIGNvbmZpZywgJ3RhYlNpemUnKTtcbiAgICAgICAgbWFwT3B0aW9uKGVkaXRvciwgY29uZmlnLCAnd29yZFdyYXBDb2x1bW4nKTtcbiAgICAgICAgbWFwT3B0aW9uKGVkaXRvciwgY29uZmlnLCAncnVsZXJzJyk7XG4gICAgICAgIG1hcE9wdGlvbihlZGl0b3IsIGNvbmZpZywgJ2NvZGVGb2xkaW5nJyk7XG4gICAgfTtcbiAgICBjb25zdCBwbHVnaW5JZCA9ICdAanVweXRlcmxhYi9jb25zb2xlLWV4dGVuc2lvbjp0cmFja2VyJztcbiAgICBsZXQgaW50ZXJhY3Rpb25Nb2RlO1xuICAgIGxldCBwcm9tcHRDZWxsQ29uZmlnO1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBzZXR0aW5ncyBmb3Igb25lIGNvbnNvbGUgb3IgYWxsIGNvbnNvbGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhbmVsIE9wdGlvbmFsIC0gc2luZ2xlIGNvbnNvbGUgdG8gdXBkYXRlLlxuICAgICAqL1xuICAgIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNldHRpbmdzKHBhbmVsKSB7XG4gICAgICAgIGludGVyYWN0aW9uTW9kZSA9IChhd2FpdCBzZXR0aW5nUmVnaXN0cnkuZ2V0KHBsdWdpbklkLCAnaW50ZXJhY3Rpb25Nb2RlJykpXG4gICAgICAgICAgICAuY29tcG9zaXRlO1xuICAgICAgICBwcm9tcHRDZWxsQ29uZmlnID0gKGF3YWl0IHNldHRpbmdSZWdpc3RyeS5nZXQocGx1Z2luSWQsICdwcm9tcHRDZWxsQ29uZmlnJykpXG4gICAgICAgICAgICAuY29tcG9zaXRlO1xuICAgICAgICBjb25zdCBzZXRXaWRnZXRPcHRpb25zID0gKHdpZGdldCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgd2lkZ2V0LmNvbnNvbGUubm9kZS5kYXRhc2V0LmpwSW50ZXJhY3Rpb25Nb2RlID0gaW50ZXJhY3Rpb25Nb2RlO1xuICAgICAgICAgICAgLy8gVXBkYXRlIGZ1dHVyZSBwcm9tcHRDZWxsc1xuICAgICAgICAgICAgd2lkZ2V0LmNvbnNvbGUuZWRpdG9yQ29uZmlnID0gcHJvbXB0Q2VsbENvbmZpZztcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBwcm9tcHRDZWxsIGFscmVhZHkgb24gc2NyZWVuXG4gICAgICAgICAgICBzZXRPcHRpb24oKF9hID0gd2lkZ2V0LmNvbnNvbGUucHJvbXB0Q2VsbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmVkaXRvciwgcHJvbXB0Q2VsbENvbmZpZyk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChwYW5lbCkge1xuICAgICAgICAgICAgc2V0V2lkZ2V0T3B0aW9ucyhwYW5lbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmFja2VyLmZvckVhY2goc2V0V2lkZ2V0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0dGluZ1JlZ2lzdHJ5LnBsdWdpbkNoYW5nZWQuY29ubmVjdCgoc2VuZGVyLCBwbHVnaW4pID0+IHtcbiAgICAgICAgaWYgKHBsdWdpbiA9PT0gcGx1Z2luSWQpIHtcbiAgICAgICAgICAgIHZvaWQgdXBkYXRlU2V0dGluZ3MoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGF3YWl0IHVwZGF0ZVNldHRpbmdzKCk7XG4gICAgLy8gQXBwbHkgc2V0dGluZ3Mgd2hlbiBhIGNvbnNvbGUgaXMgY3JlYXRlZC5cbiAgICB0cmFja2VyLndpZGdldEFkZGVkLmNvbm5lY3QoKHNlbmRlciwgcGFuZWwpID0+IHtcbiAgICAgICAgdm9pZCB1cGRhdGVTZXR0aW5ncyhwYW5lbCk7XG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmF1dG9DbG9zaW5nQnJhY2tldHMsIHtcbiAgICAgICAgZXhlY3V0ZTogYXN5bmMgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHByb21wdENlbGxDb25maWcuYXV0b0Nsb3NpbmdCcmFja2V0cyA9ICEhKChfYSA9IGFyZ3NbJ2ZvcmNlJ10pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6ICFwcm9tcHRDZWxsQ29uZmlnLmF1dG9DbG9zaW5nQnJhY2tldHMpO1xuICAgICAgICAgICAgYXdhaXQgc2V0dGluZ1JlZ2lzdHJ5LnNldChwbHVnaW5JZCwgJ3Byb21wdENlbGxDb25maWcnLCBwcm9tcHRDZWxsQ29uZmlnKTtcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdBdXRvIENsb3NlIEJyYWNrZXRzIGZvciBDb2RlIENvbnNvbGUgUHJvbXB0JyksXG4gICAgICAgIGlzVG9nZ2xlZDogKCkgPT4gcHJvbXB0Q2VsbENvbmZpZy5hdXRvQ2xvc2luZ0JyYWNrZXRzXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGVyZSBpcyBhbiBhY3RpdmUgY29uc29sZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiAodHJhY2tlci5jdXJyZW50V2lkZ2V0ICE9PSBudWxsICYmXG4gICAgICAgICAgICB0cmFja2VyLmN1cnJlbnRXaWRnZXQgPT09IHNoZWxsLmN1cnJlbnRXaWRnZXQpO1xuICAgIH1cbiAgICBsZXQgY29tbWFuZCA9IENvbW1hbmRJRHMub3BlbjtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKGNvbW1hbmQsIHtcbiAgICAgICAgZXhlY3V0ZTogKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBhcmdzWydwYXRoJ107XG4gICAgICAgICAgICBjb25zdCB3aWRnZXQgPSB0cmFja2VyLmZpbmQodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChfYSA9IHZhbHVlLmNvbnNvbGUuc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhdGgpID09PSBwYXRoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MuYWN0aXZhdGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoZWxsLmFjdGl2YXRlQnlJZCh3aWRnZXQuaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hbmFnZXIucmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gZmluZChtYW5hZ2VyLnNlc3Npb25zLnJ1bm5pbmcoKSwgaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5wYXRoID09PSBwYXRoO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlQ29uc29sZShhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoYE5vIHJ1bm5pbmcga2VybmVsIHNlc3Npb24gZm9yIHBhdGg6ICR7cGF0aH1gKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbW1hbmQgPSBDb21tYW5kSURzLmNyZWF0ZTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKGNvbW1hbmQsIHtcbiAgICAgICAgbGFiZWw6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICAgICAgaWYgKGFyZ3NbJ2lzUGFsZXR0ZSddKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zLl9fKCdOZXcgQ29uc29sZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXJnc1snaXNMYXVuY2hlciddICYmIGFyZ3NbJ2tlcm5lbFByZWZlcmVuY2UnXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtlcm5lbFByZWZlcmVuY2UgPSBhcmdzWydrZXJuZWxQcmVmZXJlbmNlJ107XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogTHVtaW5vIGNvbW1hbmQgZnVuY3Rpb25zIHNob3VsZCBwcm9iYWJseSBiZSBhbGxvd2VkIHRvIHJldHVybiB1bmRlZmluZWQ/XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoX2QgPSAoX2MgPSAoX2IgPSAoX2EgPSBtYW5hZ2VyLmtlcm5lbHNwZWNzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3BlY3MpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5rZXJuZWxzcGVjc1trZXJuZWxQcmVmZXJlbmNlLm5hbWUgfHwgJyddKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZGlzcGxheV9uYW1lKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJhbnMuX18oJ0NvbnNvbGUnKTtcbiAgICAgICAgfSxcbiAgICAgICAgaWNvbjogYXJncyA9PiAoYXJnc1snaXNQYWxldHRlJ10gPyB1bmRlZmluZWQgOiBjb25zb2xlSWNvbiksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgYmFzZVBhdGggPSAoX2EgPSAoYXJnc1snYmFzZVBhdGgnXSB8fFxuICAgICAgICAgICAgICAgIGFyZ3NbJ2N3ZCddIHx8IChicm93c2VyRmFjdG9yeSA9PT0gbnVsbCB8fCBicm93c2VyRmFjdG9yeSA9PT0gdm9pZCAwID8gdm9pZCAwIDogYnJvd3NlckZhY3RvcnkuZGVmYXVsdEJyb3dzZXIubW9kZWwucGF0aCkpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAnJztcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVDb25zb2xlKE9iamVjdC5hc3NpZ24oeyBiYXNlUGF0aCB9LCBhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgd2lkZ2V0IGFuZCBhY3RpdmF0ZSB1bmxlc3MgdGhlIGFyZ3Mgc3BlY2lmeSBvdGhlcndpc2UuXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudChhcmdzKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IHRyYWNrZXIuY3VycmVudFdpZGdldDtcbiAgICAgICAgY29uc3QgYWN0aXZhdGUgPSBhcmdzWydhY3RpdmF0ZSddICE9PSBmYWxzZTtcbiAgICAgICAgaWYgKGFjdGl2YXRlICYmIHdpZGdldCkge1xuICAgICAgICAgICAgc2hlbGwuYWN0aXZhdGVCeUlkKHdpZGdldC5pZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHdpZGdldCAhPT0gbnVsbCAmJiB3aWRnZXQgIT09IHZvaWQgMCA/IHdpZGdldCA6IG51bGw7XG4gICAgfVxuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jbGVhciwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NsZWFyIENvbnNvbGUgQ2VsbHMnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudChhcmdzKTtcbiAgICAgICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnQuY29uc29sZS5jbGVhcigpO1xuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucnVuVW5mb3JjZWQsIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSdW4gQ2VsbCAodW5mb3JjZWQpJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQoYXJncyk7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudC5jb25zb2xlLmV4ZWN1dGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnJ1bkZvcmNlZCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1J1biBDZWxsIChmb3JjZWQpJyksXG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudCA9IGdldEN1cnJlbnQoYXJncyk7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudC5jb25zb2xlLmV4ZWN1dGUodHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5saW5lYnJlYWssIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdJbnNlcnQgTGluZSBCcmVhaycpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KGFyZ3MpO1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudC5jb25zb2xlLmluc2VydExpbmVicmVhaygpO1xuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucmVwbGFjZVNlbGVjdGlvbiwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1JlcGxhY2UgU2VsZWN0aW9uIGluIENvbnNvbGUnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudChhcmdzKTtcbiAgICAgICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBhcmdzWyd0ZXh0J10gfHwgJyc7XG4gICAgICAgICAgICBjdXJyZW50LmNvbnNvbGUucmVwbGFjZVNlbGVjdGlvbih0ZXh0KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmludGVycnVwdCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0ludGVycnVwdCBLZXJuZWwnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudChhcmdzKTtcbiAgICAgICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGtlcm5lbCA9IChfYSA9IGN1cnJlbnQuY29uc29sZS5zZXNzaW9uQ29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2VybmVsO1xuICAgICAgICAgICAgaWYgKGtlcm5lbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBrZXJuZWwuaW50ZXJydXB0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZXN0YXJ0LCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnUmVzdGFydCBLZXJuZWzigKYnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudChhcmdzKTtcbiAgICAgICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uRGlhbG9ncy5yZXN0YXJ0KGN1cnJlbnQuY29uc29sZS5zZXNzaW9uQ29udGV4dCwgdHJhbnNsYXRvcik7XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZFxuICAgIH0pO1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jbG9zZUFuZFNodXRkb3duLCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnQ2xvc2UgYW5kIFNodXQgRG93buKApicpLFxuICAgICAgICBleGVjdXRlOiBhcmdzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBnZXRDdXJyZW50KGFyZ3MpO1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnU2h1dCBkb3duIHRoZSBjb25zb2xlPycpLFxuICAgICAgICAgICAgICAgIGJvZHk6IHRyYW5zLl9fKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2xvc2UgXCIlMVwiPycsIGN1cnJlbnQudGl0bGUubGFiZWwpLFxuICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtEaWFsb2cuY2FuY2VsQnV0dG9uKCksIERpYWxvZy53YXJuQnV0dG9uKCldXG4gICAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5idXR0b24uYWNjZXB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50LmNvbnNvbGUuc2Vzc2lvbkNvbnRleHQuc2h1dGRvd24oKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpc0VuYWJsZWRcbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuaW5qZWN0LCB7XG4gICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGFyZ3NbJ3BhdGgnXTtcbiAgICAgICAgICAgIHRyYWNrZXIuZmluZCh3aWRnZXQgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBpZiAoKChfYSA9IHdpZGdldC5jb25zb2xlLnNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYXRoKSA9PT0gcGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJnc1snYWN0aXZhdGUnXSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoZWxsLmFjdGl2YXRlQnlJZCh3aWRnZXQuaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgd2lkZ2V0LmNvbnNvbGUuaW5qZWN0KGFyZ3NbJ2NvZGUnXSwgYXJnc1snbWV0YWRhdGEnXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNoYW5nZUtlcm5lbCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0NoYW5nZSBLZXJuZWzigKYnKSxcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gZ2V0Q3VycmVudChhcmdzKTtcbiAgICAgICAgICAgIGlmICghY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uRGlhbG9ncy5zZWxlY3RLZXJuZWwoY3VycmVudC5jb25zb2xlLnNlc3Npb25Db250ZXh0LCB0cmFuc2xhdG9yKTtcbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkXG4gICAgfSk7XG4gICAgaWYgKHBhbGV0dGUpIHtcbiAgICAgICAgLy8gQWRkIGNvbW1hbmQgcGFsZXR0ZSBpdGVtc1xuICAgICAgICBbXG4gICAgICAgICAgICBDb21tYW5kSURzLmNyZWF0ZSxcbiAgICAgICAgICAgIENvbW1hbmRJRHMubGluZWJyZWFrLFxuICAgICAgICAgICAgQ29tbWFuZElEcy5jbGVhcixcbiAgICAgICAgICAgIENvbW1hbmRJRHMucnVuVW5mb3JjZWQsXG4gICAgICAgICAgICBDb21tYW5kSURzLnJ1bkZvcmNlZCxcbiAgICAgICAgICAgIENvbW1hbmRJRHMucmVzdGFydCxcbiAgICAgICAgICAgIENvbW1hbmRJRHMuaW50ZXJydXB0LFxuICAgICAgICAgICAgQ29tbWFuZElEcy5jaGFuZ2VLZXJuZWwsXG4gICAgICAgICAgICBDb21tYW5kSURzLmNsb3NlQW5kU2h1dGRvd25cbiAgICAgICAgXS5mb3JFYWNoKGNvbW1hbmQgPT4ge1xuICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZCwgY2F0ZWdvcnksIGFyZ3M6IHsgaXNQYWxldHRlOiB0cnVlIH0gfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobWFpbk1lbnUpIHtcbiAgICAgICAgLy8gQWRkIGEgY2xvc2UgYW5kIHNodXRkb3duIGNvbW1hbmQgdG8gdGhlIGZpbGUgbWVudS5cbiAgICAgICAgbWFpbk1lbnUuZmlsZU1lbnUuY2xvc2VBbmRDbGVhbmVycy5hZGQoe1xuICAgICAgICAgICAgdHJhY2tlcixcbiAgICAgICAgICAgIGNsb3NlQW5kQ2xlYW51cExhYmVsOiAobikgPT4gdHJhbnMuX18oJ1NodXRkb3duIENvbnNvbGUnKSxcbiAgICAgICAgICAgIGNsb3NlQW5kQ2xlYW51cDogKGN1cnJlbnQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnU2h1dCBkb3duIHRoZSBDb25zb2xlPycpLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB0cmFucy5fXygnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNsb3NlIFwiJTFcIj8nLCBjdXJyZW50LnRpdGxlLmxhYmVsKSxcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW0RpYWxvZy5jYW5jZWxCdXR0b24oKSwgRGlhbG9nLndhcm5CdXR0b24oKV1cbiAgICAgICAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuYnV0dG9uLmFjY2VwdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQuY29uc29sZS5zZXNzaW9uQ29udGV4dC5zaHV0ZG93bigpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBZGQgYSBrZXJuZWwgdXNlciB0byB0aGUgS2VybmVsIG1lbnVcbiAgICAgICAgbWFpbk1lbnUua2VybmVsTWVudS5rZXJuZWxVc2Vycy5hZGQoe1xuICAgICAgICAgICAgdHJhY2tlcixcbiAgICAgICAgICAgIHJlc3RhcnRLZXJuZWxBbmRDbGVhckxhYmVsOiBuID0+IHRyYW5zLl9fKCdSZXN0YXJ0IEtlcm5lbCBhbmQgQ2xlYXIgQ29uc29sZScpLFxuICAgICAgICAgICAgaW50ZXJydXB0S2VybmVsOiBjdXJyZW50ID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgY29uc3Qga2VybmVsID0gKF9hID0gY3VycmVudC5jb25zb2xlLnNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5rZXJuZWw7XG4gICAgICAgICAgICAgICAgaWYgKGtlcm5lbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2VybmVsLmludGVycnVwdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZvaWQgMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzdGFydEtlcm5lbDogY3VycmVudCA9PiBzZXNzaW9uRGlhbG9ncy5yZXN0YXJ0KGN1cnJlbnQuY29uc29sZS5zZXNzaW9uQ29udGV4dCwgdHJhbnNsYXRvciksXG4gICAgICAgICAgICByZXN0YXJ0S2VybmVsQW5kQ2xlYXI6IGN1cnJlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXNzaW9uRGlhbG9nc1xuICAgICAgICAgICAgICAgICAgICAucmVzdGFydChjdXJyZW50LmNvbnNvbGUuc2Vzc2lvbkNvbnRleHQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3RhcnRlZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN0YXJ0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQuY29uc29sZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN0YXJ0ZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlS2VybmVsOiBjdXJyZW50ID0+IHNlc3Npb25EaWFsb2dzLnNlbGVjdEtlcm5lbChjdXJyZW50LmNvbnNvbGUuc2Vzc2lvbkNvbnRleHQsIHRyYW5zbGF0b3IpLFxuICAgICAgICAgICAgc2h1dGRvd25LZXJuZWw6IGN1cnJlbnQgPT4gY3VycmVudC5jb25zb2xlLnNlc3Npb25Db250ZXh0LnNodXRkb3duKClcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCBhIGNvZGUgcnVubmVyIHRvIHRoZSBSdW4gbWVudS5cbiAgICAgICAgbWFpbk1lbnUucnVuTWVudS5jb2RlUnVubmVycy5hZGQoe1xuICAgICAgICAgICAgdHJhY2tlcixcbiAgICAgICAgICAgIHJ1bkxhYmVsOiAobikgPT4gdHJhbnMuX18oJ1J1biBDZWxsJyksXG4gICAgICAgICAgICBydW46IGN1cnJlbnQgPT4gY3VycmVudC5jb25zb2xlLmV4ZWN1dGUodHJ1ZSlcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCBhIGNsZWFyZXIgdG8gdGhlIGVkaXQgbWVudVxuICAgICAgICBtYWluTWVudS5lZGl0TWVudS5jbGVhcmVycy5hZGQoe1xuICAgICAgICAgICAgdHJhY2tlcixcbiAgICAgICAgICAgIGNsZWFyQ3VycmVudExhYmVsOiAobikgPT4gdHJhbnMuX18oJ0NsZWFyIENvbnNvbGUgQ2VsbCcpLFxuICAgICAgICAgICAgY2xlYXJDdXJyZW50OiAoY3VycmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50LmNvbnNvbGUuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIEZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBhbmQgY2xhcml0eSwgd2UgZXhwbGljaXRseSBsYWJlbCB0aGUgcnVuXG4gICAgLy8ga2V5c3Ryb2tlIHdpdGggdGhlIGFjdHVhbCBlZmZlY3RlZCBjaGFuZ2UsIHJhdGhlciB0aGFuIHRoZSBnZW5lcmljXG4gICAgLy8gXCJub3RlYm9va1wiIG9yIFwidGVybWluYWxcIiBpbnRlcmFjdGlvbiBtb2RlLiBXaGVuIHRoaXMgaW50ZXJhY3Rpb24gbW9kZVxuICAgIC8vIGFmZmVjdHMgbW9yZSB0aGFuIGp1c3QgdGhlIHJ1biBrZXlzdHJva2UsIHdlIGNhbiBtYWtlIHRoaXMgbWVudSB0aXRsZSBtb3JlXG4gICAgLy8gZ2VuZXJpYy5cbiAgICBjb25zdCBydW5TaG9ydGN1dFRpdGxlcyA9IHtcbiAgICAgICAgbm90ZWJvb2s6IHRyYW5zLl9fKCdFeGVjdXRlIHdpdGggU2hpZnQrRW50ZXInKSxcbiAgICAgICAgdGVybWluYWw6IHRyYW5zLl9fKCdFeGVjdXRlIHdpdGggRW50ZXInKVxuICAgIH07XG4gICAgLy8gQWRkIHRoZSBleGVjdXRlIGtleXN0cm9rZSBzZXR0aW5nIHN1Ym1lbnUuXG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmludGVyYWN0aW9uTW9kZSwge1xuICAgICAgICBsYWJlbDogYXJncyA9PiBydW5TaG9ydGN1dFRpdGxlc1thcmdzWydpbnRlcmFjdGlvbk1vZGUnXV0gfHwgJycsXG4gICAgICAgIGV4ZWN1dGU6IGFzeW5jIChhcmdzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBrZXkgPSAna2V5TWFwJztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2V0dGluZ1JlZ2lzdHJ5LnNldChwbHVnaW5JZCwgJ2ludGVyYWN0aW9uTW9kZScsIGFyZ3NbJ2ludGVyYWN0aW9uTW9kZSddKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gc2V0ICR7cGx1Z2luSWR9OiR7a2V5fSAtICR7cmVhc29uLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzVG9nZ2xlZDogYXJncyA9PiBhcmdzWydpbnRlcmFjdGlvbk1vZGUnXSA9PT0gaW50ZXJhY3Rpb25Nb2RlXG4gICAgfSk7XG4gICAgaWYgKG1haW5NZW51KSB7XG4gICAgICAgIC8vIEFkZCBrZXJuZWwgaW5mb3JtYXRpb24gdG8gdGhlIGFwcGxpY2F0aW9uIGhlbHAgbWVudS5cbiAgICAgICAgbWFpbk1lbnUuaGVscE1lbnUua2VybmVsVXNlcnMuYWRkKHtcbiAgICAgICAgICAgIHRyYWNrZXIsXG4gICAgICAgICAgICBnZXRLZXJuZWw6IGN1cnJlbnQgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSBjdXJyZW50LnNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5rZXJuZWw7IH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0cmFja2VyO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==