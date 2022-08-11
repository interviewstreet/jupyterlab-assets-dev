(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_apputils-extension_lib_index_js"],{

/***/ "../../packages/apputils-extension/lib/index.js":
/*!******************************************************!*\
  !*** ../../packages/apputils-extension/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleHeader": () => (/* binding */ toggleHeader),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _palette__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./palette */ "../../packages/apputils-extension/lib/palette.js");
/* harmony import */ var _settingsplugin__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./settingsplugin */ "../../packages/apputils-extension/lib/settingsplugin.js");
/* harmony import */ var _themesplugins__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./themesplugins */ "../../packages/apputils-extension/lib/themesplugins.js");
/* harmony import */ var _toolbarregistryplugin__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./toolbarregistryplugin */ "../../packages/apputils-extension/lib/toolbarregistryplugin.js");
/* harmony import */ var _workspacesplugin__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./workspacesplugin */ "../../packages/apputils-extension/lib/workspacesplugin.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module apputils-extension
 */















/**
 * The interval in milliseconds before recover options appear during splash.
 */
const SPLASH_RECOVER_TIMEOUT = 12000;
/**
 * The command IDs used by the apputils plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.loadState = 'apputils:load-statedb';
    CommandIDs.print = 'apputils:print';
    CommandIDs.reset = 'apputils:reset';
    CommandIDs.resetOnLoad = 'apputils:reset-on-load';
    CommandIDs.runFirstEnabled = 'apputils:run-first-enabled';
    CommandIDs.runAllEnabled = 'apputils:run-all-enabled';
    CommandIDs.toggleHeader = 'apputils:toggle-header';
})(CommandIDs || (CommandIDs = {}));
/**
 * The default command palette extension.
 */
const palette = {
    id: '@jupyterlab/apputils-extension:palette',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__.ITranslator],
    provides: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette,
    optional: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_3__.ISettingRegistry],
    activate: (app, translator, settingRegistry) => {
        return _palette__WEBPACK_IMPORTED_MODULE_10__.Palette.activate(app, translator, settingRegistry);
    }
};
/**
 * The default command palette's restoration extension.
 *
 * #### Notes
 * The command palette's restoration logic is handled separately from the
 * command palette provider extension because the layout restorer dependency
 * causes the command palette to be unavailable to other extensions earlier
 * in the application load cycle.
 */
const paletteRestorer = {
    id: '@jupyterlab/apputils-extension:palette-restorer',
    autoStart: true,
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__.ITranslator],
    activate: (app, restorer, translator) => {
        _palette__WEBPACK_IMPORTED_MODULE_10__.Palette.restore(app, restorer, translator);
    }
};
/**
 * The default window name resolver provider.
 */
const resolver = {
    id: '@jupyterlab/apputils-extension:resolver',
    autoStart: true,
    provides: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IWindowResolver,
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.IPaths, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.IRouter],
    activate: async (app, paths, router) => {
        const { hash, search } = router.current;
        const query = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.queryStringToObject(search || '');
        const solver = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WindowResolver();
        const workspace = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('workspace');
        const treePath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('treePath');
        const mode = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('mode') === 'multiple-document' ? 'lab' : 'doc';
        // This is used as a key in local storage to refer to workspaces, either the name
        // of the workspace or the string PageConfig.defaultWorkspace. Both lab and doc modes share the same workspace.
        const candidate = workspace ? workspace : _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.defaultWorkspace;
        const rest = treePath ? _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join('tree', treePath) : '';
        try {
            await solver.resolve(candidate);
            return solver;
        }
        catch (error) {
            // Window resolution has failed so the URL must change. Return a promise
            // that never resolves to prevent the application from loading plugins
            // that rely on `IWindowResolver`.
            return new Promise(() => {
                const { base } = paths.urls;
                const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                const random = pool[Math.floor(Math.random() * pool.length)];
                let path = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(base, mode, 'workspaces', `auto-${random}`);
                path = rest ? _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(path, _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.encodeParts(rest)) : path;
                // Reset the workspace on load.
                query['reset'] = '';
                const url = path + _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.objectToQueryString(query) + (hash || '');
                router.navigate(url, { hard: true });
            });
        }
    }
};
/**
 * The default splash screen provider.
 */
const splash = {
    id: '@jupyterlab/apputils-extension:splash',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__.ITranslator],
    provides: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ISplashScreen,
    activate: (app, translator) => {
        const trans = translator.load('jupyterlab');
        const { commands, restored } = app;
        // Create splash element and populate it.
        const splash = document.createElement('div');
        const galaxy = document.createElement('div');
        const logo = document.createElement('div');
        splash.id = 'jupyterlab-splash';
        galaxy.id = 'galaxy';
        logo.id = 'main-logo';
        _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_6__.jupyterFaviconIcon.element({
            container: logo,
            stylesheet: 'splash'
        });
        galaxy.appendChild(logo);
        ['1', '2', '3'].forEach(id => {
            const moon = document.createElement('div');
            const planet = document.createElement('div');
            moon.id = `moon${id}`;
            moon.className = 'moon orbit';
            planet.id = `planet${id}`;
            planet.className = 'planet';
            moon.appendChild(planet);
            galaxy.appendChild(moon);
        });
        splash.appendChild(galaxy);
        // Create debounced recovery dialog function.
        let dialog;
        const recovery = new _lumino_polling__WEBPACK_IMPORTED_MODULE_9__.Throttler(async () => {
            if (dialog) {
                return;
            }
            dialog = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog({
                title: trans.__('Loading…'),
                body: trans.__(`The loading screen is taking a long time.
Would you like to clear the workspace or keep waiting?`),
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: trans.__('Keep Waiting') }),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.warnButton({ label: trans.__('Clear Workspace') })
                ]
            });
            try {
                const result = await dialog.launch();
                dialog.dispose();
                dialog = null;
                if (result.button.accept && commands.hasCommand(CommandIDs.reset)) {
                    return commands.execute(CommandIDs.reset);
                }
                // Re-invoke the recovery timer in the next frame.
                requestAnimationFrame(() => {
                    // Because recovery can be stopped, handle invocation rejection.
                    void recovery.invoke().catch(_ => undefined);
                });
            }
            catch (error) {
                /* no-op */
            }
        }, { limit: SPLASH_RECOVER_TIMEOUT, edge: 'trailing' });
        // Return ISplashScreen.
        let splashCount = 0;
        return {
            show: (light = true) => {
                splash.classList.remove('splash-fade');
                splash.classList.toggle('light', light);
                splash.classList.toggle('dark', !light);
                splashCount++;
                document.body.appendChild(splash);
                // Because recovery can be stopped, handle invocation rejection.
                void recovery.invoke().catch(_ => undefined);
                return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_8__.DisposableDelegate(async () => {
                    await restored;
                    if (--splashCount === 0) {
                        void recovery.stop();
                        if (dialog) {
                            dialog.dispose();
                            dialog = null;
                        }
                        splash.classList.add('splash-fade');
                        window.setTimeout(() => {
                            document.body.removeChild(splash);
                        }, 200);
                    }
                });
            }
        };
    }
};
const print = {
    id: '@jupyterlab/apputils-extension:print',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__.ITranslator],
    activate: (app, translator) => {
        const trans = translator.load('jupyterlab');
        app.commands.addCommand(CommandIDs.print, {
            label: trans.__('Print…'),
            isEnabled: () => {
                const widget = app.shell.currentWidget;
                return _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Printing.getPrintFunction(widget) !== null;
            },
            execute: async () => {
                const widget = app.shell.currentWidget;
                const printFunction = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Printing.getPrintFunction(widget);
                if (printFunction) {
                    await printFunction();
                }
            }
        });
    }
};
const toggleHeader = {
    id: '@jupyterlab/apputils-extension:toggle-header',
    autoStart: true,
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    activate: (app, translator, palette) => {
        const trans = translator.load('jupyterlab');
        const category = trans.__('Main Area');
        app.commands.addCommand(CommandIDs.toggleHeader, {
            label: trans.__('Show Header Above Content'),
            isEnabled: () => app.shell.currentWidget instanceof _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget &&
                app.shell.currentWidget.contentHeader.widgets.length > 0,
            isToggled: () => {
                const widget = app.shell.currentWidget;
                return widget instanceof _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget
                    ? !widget.contentHeader.isHidden
                    : false;
            },
            execute: async () => {
                const widget = app.shell.currentWidget;
                if (widget instanceof _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget) {
                    widget.contentHeader.setHidden(!widget.contentHeader.isHidden);
                }
            }
        });
        if (palette) {
            palette.addItem({ command: CommandIDs.toggleHeader, category });
        }
    }
};
/**
 * Update the browser title based on the workspace and the current
 * active item.
 */
async function updateTabTitle(workspace, db, name) {
    var _a, _b;
    const data = await db.toJSON();
    let current = (_b = (_a = data['layout-restorer:data']) === null || _a === void 0 ? void 0 : _a.main) === null || _b === void 0 ? void 0 : _b.current;
    if (current === undefined) {
        document.title = `${_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getOption('appName') || 'JupyterLab'}${workspace.startsWith('auto-') ? ` (${workspace})` : ``}`;
    }
    else {
        // File name from current path
        let currentFile = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PathExt.basename(current.split(':')[1]);
        // Truncate to first 12 characters of current document name + ... if length > 15
        currentFile =
            currentFile.length > 15
                ? currentFile.slice(0, 12).concat(`…`)
                : currentFile;
        // Number of restorable items that are either notebooks or editors
        const count = Object.keys(data).filter(item => item.startsWith('notebook') || item.startsWith('editor')).length;
        if (workspace.startsWith('auto-')) {
            document.title = `${currentFile} (${workspace}${count > 1 ? ` : ${count}` : ``}) - ${name}`;
        }
        else {
            document.title = `${currentFile}${count > 1 ? ` (${count})` : ``} - ${name}`;
        }
    }
}
/**
 * The default state database for storing application state.
 *
 * #### Notes
 * If this extension is loaded with a window resolver, it will automatically add
 * state management commands, URL support for `clone` and `reset`, and workspace
 * auto-saving. Otherwise, it will return a simple in-memory state database.
 */
const state = {
    id: '@jupyterlab/apputils-extension:state',
    autoStart: true,
    provides: _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_4__.IStateDB,
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.IPaths, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.IRouter, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IWindowResolver],
    activate: (app, paths, router, translator, resolver) => {
        const trans = translator.load('jupyterlab');
        if (resolver === null) {
            return new _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_4__.StateDB();
        }
        let resolved = false;
        const { commands, name, serviceManager } = app;
        const { workspaces } = serviceManager;
        const workspace = resolver.name;
        const transform = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_7__.PromiseDelegate();
        const db = new _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_4__.StateDB({ transform: transform.promise });
        const save = new _lumino_polling__WEBPACK_IMPORTED_MODULE_9__.Debouncer(async () => {
            const id = workspace;
            const metadata = { id };
            const data = await db.toJSON();
            await workspaces.save(id, { data, metadata });
        });
        // Any time the local state database changes, save the workspace.
        db.changed.connect(() => void save.invoke(), db);
        db.changed.connect(() => updateTabTitle(workspace, db, name));
        commands.addCommand(CommandIDs.loadState, {
            execute: async (args) => {
                // Since the command can be executed an arbitrary number of times, make
                // sure it is safe to call multiple times.
                if (resolved) {
                    return;
                }
                const { hash, path, search } = args;
                const query = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.queryStringToObject(search || '');
                const clone = typeof query['clone'] === 'string'
                    ? query['clone'] === ''
                        ? _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.defaultWorkspace
                        : query['clone']
                    : null;
                const source = clone || workspace || null;
                let cloneDefaultIfEmpty = false;
                // cloneDefaultIfEmpty means to clone the default workspace if the given workspace is
                if (workspace !== _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.defaultWorkspace && query['cloneDefaultIfEmpty'] === "true") {
                    cloneDefaultIfEmpty = true;
                }
                if (source === null) {
                    console.error(`${CommandIDs.loadState} cannot load null workspace.`);
                    return;
                }
                try {
                    let saved = await workspaces.fetch(source);
                    if (cloneDefaultIfEmpty && Object.keys(saved.data).length === 0) {
                        saved = await workspaces.fetch(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.defaultWorkspace);
                    }
                    // If this command is called after a reset, the state database
                    // will already be resolved.
                    if (!resolved) {
                        resolved = true;
                        transform.resolve({ type: 'overwrite', contents: saved.data });
                    }
                }
                catch ({ message }) {
                    console.warn(`Fetching workspace "${workspace}" failed.`, message);
                    // If the workspace does not exist, cancel the data transformation
                    // and save a workspace with the current user state data.
                    if (!resolved) {
                        resolved = true;
                        transform.resolve({ type: 'cancel', contents: null });
                    }
                }
                if (source === clone) {
                    // Maintain the query string parameters but remove `clone`.
                    delete query['clone'];
                    const url = path + _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.objectToQueryString(query) + hash;
                    const cloned = save.invoke().then(() => router.stop);
                    // After the state has been cloned, navigate to the URL.
                    void cloned.then(() => {
                        router.navigate(url);
                    });
                    return cloned;
                }
                // After the state database has finished loading, save it.
                await save.invoke();
            }
        });
        commands.addCommand(CommandIDs.reset, {
            label: trans.__('Reset Application State'),
            execute: async ({ reload }) => {
                await db.clear();
                await save.invoke();
                if (reload) {
                    router.reload();
                }
            }
        });
        commands.addCommand(CommandIDs.resetOnLoad, {
            execute: (args) => {
                const { hash, path, search } = args;
                const query = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.queryStringToObject(search || '');
                const reset = 'reset' in query;
                const clone = 'clone' in query;
                if (!reset) {
                    return;
                }
                // If the state database has already been resolved, resetting is
                // impossible without reloading.
                if (resolved) {
                    return router.reload();
                }
                // Empty the state database.
                resolved = true;
                transform.resolve({ type: 'clear', contents: null });
                // Maintain the query string parameters but remove `reset`.
                delete query['reset'];
                const url = path + _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.objectToQueryString(query) + hash;
                const cleared = db.clear().then(() => save.invoke());
                // After the state has been reset, navigate to the URL.
                if (clone) {
                    void cleared.then(() => {
                        router.navigate(url, { hard: true });
                    });
                }
                else {
                    void cleared.then(() => {
                        router.navigate(url);
                    });
                }
                return cleared;
            }
        });
        router.register({
            command: CommandIDs.loadState,
            pattern: /.?/,
            rank: 30 // High priority: 30:100.
        });
        router.register({
            command: CommandIDs.resetOnLoad,
            pattern: /(\?reset|\&reset)($|&)/,
            rank: 20 // High priority: 20:100.
        });
        return db;
    }
};
/**
 * The default session context dialogs extension.
 */
const sessionDialogs = {
    id: '@jupyterlab/apputils-extension:sessionDialogs',
    provides: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ISessionContextDialogs,
    autoStart: true,
    activate: () => {
        return _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.sessionContextDialogs;
    }
};
/**
 * Utility commands
 */
const utilityCommands = {
    id: '@jupyterlab/apputils-extension:utilityCommands',
    requires: [_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__.ITranslator],
    autoStart: true,
    activate: (app, translator) => {
        const trans = translator.load('jupyterlab');
        const { commands } = app;
        commands.addCommand(CommandIDs.runFirstEnabled, {
            label: trans.__('Run First Enabled Command'),
            execute: args => {
                const commands = args.commands;
                const commandArgs = args.args;
                const argList = Array.isArray(args);
                for (let i = 0; i < commands.length; i++) {
                    const cmd = commands[i];
                    const arg = argList ? commandArgs[i] : commandArgs;
                    if (app.commands.isEnabled(cmd, arg)) {
                        return app.commands.execute(cmd, arg);
                    }
                }
            }
        });
        commands.addCommand(CommandIDs.runAllEnabled, {
            label: trans.__('Run All Enabled Commands Passed as Args'),
            execute: async (args) => {
                const commands = args.commands;
                const commandArgs = args.args;
                const argList = Array.isArray(args);
                const errorIfNotEnabled = args.errorIfNotEnabled;
                for (let i = 0; i < commands.length; i++) {
                    const cmd = commands[i];
                    const arg = argList ? commandArgs[i] : commandArgs;
                    if (app.commands.isEnabled(cmd, arg)) {
                        await app.commands.execute(cmd, arg);
                    }
                    else {
                        if (errorIfNotEnabled) {
                            console.error(`${cmd} is not enabled.`);
                        }
                    }
                }
            }
        });
    }
};
/**
 * The default HTML sanitizer.
 */
const sanitizer = {
    id: '@jupyter/apputils-extension:sanitizer',
    autoStart: true,
    provides: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ISanitizer,
    activate: () => {
        return _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.defaultSanitizer;
    }
};
/**
 * Export the plugins as default.
 */
const plugins = [
    palette,
    paletteRestorer,
    print,
    resolver,
    sanitizer,
    _settingsplugin__WEBPACK_IMPORTED_MODULE_11__.settingsPlugin,
    state,
    splash,
    sessionDialogs,
    _themesplugins__WEBPACK_IMPORTED_MODULE_12__.themesPlugin,
    _themesplugins__WEBPACK_IMPORTED_MODULE_12__.themesPaletteMenuPlugin,
    toggleHeader,
    _toolbarregistryplugin__WEBPACK_IMPORTED_MODULE_13__.toolbarRegistry,
    utilityCommands,
    _workspacesplugin__WEBPACK_IMPORTED_MODULE_14__.workspacesPlugin
];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/apputils-extension/lib/palette.js":
/*!********************************************************!*\
  !*** ../../packages/apputils-extension/lib/palette.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Palette": () => (/* binding */ Palette)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/commands */ "webpack/sharing/consume/default/@lumino/commands/@lumino/commands");
/* harmony import */ var _lumino_commands__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_commands__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_6__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/







/**
 * The command IDs used by the apputils extension.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.activate = 'apputils:activate-command-palette';
})(CommandIDs || (CommandIDs = {}));
const PALETTE_PLUGIN_ID = '@jupyterlab/apputils-extension:palette';
/**
 * A thin wrapper around the `CommandPalette` class to conform with the
 * JupyterLab interface for the application-wide command palette.
 */
class Palette {
    /**
     * Create a palette instance.
     */
    constructor(palette, translator) {
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = this.translator.load('jupyterlab');
        this._palette = palette;
        this._palette.title.label = '';
        this._palette.title.caption = trans.__('Command Palette');
    }
    /**
     * The placeholder text of the command palette's search input.
     */
    set placeholder(placeholder) {
        this._palette.inputNode.placeholder = placeholder;
    }
    get placeholder() {
        return this._palette.inputNode.placeholder;
    }
    /**
     * Activate the command palette for user input.
     */
    activate() {
        this._palette.activate();
    }
    /**
     * Add a command item to the command palette.
     *
     * @param options - The options for creating the command item.
     *
     * @returns A disposable that will remove the item from the palette.
     */
    addItem(options) {
        const item = this._palette.addItem(options);
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_5__.DisposableDelegate(() => {
            this._palette.removeItem(item);
        });
    }
}
/**
 * A namespace for `Palette` statics.
 */
(function (Palette) {
    /**
     * Activate the command palette.
     */
    function activate(app, translator, settingRegistry) {
        const { commands, shell } = app;
        const trans = translator.load('jupyterlab');
        const palette = Private.createPalette(app, translator);
        const modalPalette = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ModalCommandPalette({ commandPalette: palette });
        let modal = false;
        palette.node.setAttribute('role', 'region');
        palette.node.setAttribute('aria-label', trans.__('Command Palette Section'));
        shell.add(palette, 'left', { rank: 300 });
        if (settingRegistry) {
            const loadSettings = settingRegistry.load(PALETTE_PLUGIN_ID);
            const updateSettings = (settings) => {
                const newModal = settings.get('modal').composite;
                if (modal && !newModal) {
                    palette.parent = null;
                    modalPalette.detach();
                    shell.add(palette, 'left', { rank: 300 });
                }
                else if (!modal && newModal) {
                    palette.parent = null;
                    modalPalette.palette = palette;
                    palette.show();
                    modalPalette.attach();
                }
                modal = newModal;
            };
            Promise.all([loadSettings, app.restored])
                .then(([settings]) => {
                updateSettings(settings);
                settings.changed.connect(settings => {
                    updateSettings(settings);
                });
            })
                .catch((reason) => {
                console.error(reason.message);
            });
        }
        // Show the current palette shortcut in its title.
        const updatePaletteTitle = () => {
            const binding = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.find)(app.commands.keyBindings, b => b.command === CommandIDs.activate);
            if (binding) {
                const ks = _lumino_commands__WEBPACK_IMPORTED_MODULE_4__.CommandRegistry.formatKeystroke(binding.keys.join(' '));
                palette.title.caption = trans.__('Commands (%1)', ks);
            }
            else {
                palette.title.caption = trans.__('Commands');
            }
        };
        updatePaletteTitle();
        app.commands.keyBindingChanged.connect(() => {
            updatePaletteTitle();
        });
        commands.addCommand(CommandIDs.activate, {
            execute: () => {
                if (modal) {
                    modalPalette.activate();
                }
                else {
                    shell.activateById(palette.id);
                }
            },
            label: trans.__('Activate Command Palette')
        });
        palette.inputNode.placeholder = trans.__('SEARCH');
        return new Palette(palette, translator);
    }
    Palette.activate = activate;
    /**
     * Restore the command palette.
     */
    function restore(app, restorer, translator) {
        const palette = Private.createPalette(app, translator);
        // Let the application restorer track the command palette for restoration of
        // application state (e.g. setting the command palette as the current side bar
        // widget).
        restorer.add(palette, 'command-palette');
    }
    Palette.restore = restore;
})(Palette || (Palette = {}));
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * The private command palette instance.
     */
    let palette;
    /**
     * Create the application-wide command palette.
     */
    function createPalette(app, translator) {
        if (!palette) {
            // use a renderer tweaked to use inline svg icons
            palette = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.CommandPalette({
                commands: app.commands,
                renderer: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.CommandPaletteSvg.defaultRenderer
            });
            palette.id = 'command-palette';
            palette.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.paletteIcon;
            const trans = translator.load('jupyterlab');
            palette.title.label = trans.__('Commands');
        }
        return palette;
    }
    Private.createPalette = createPalette;
})(Private || (Private = {}));
//# sourceMappingURL=palette.js.map

/***/ }),

/***/ "../../packages/apputils-extension/lib/settingconnector.js":
/*!*****************************************************************!*\
  !*** ../../packages/apputils-extension/lib/settingconnector.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingConnector": () => (/* binding */ SettingConnector)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_2__);



/**
 * A data connector for fetching settings.
 *
 * #### Notes
 * This connector adds a query parameter to the base services setting manager.
 */
class SettingConnector extends _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_1__.DataConnector {
    constructor(connector) {
        super();
        this._throttlers = Object.create(null);
        this._connector = connector;
    }
    /**
     * Fetch settings for a plugin.
     * @param id - The plugin ID
     *
     * #### Notes
     * The REST API requests are throttled at one request per plugin per 100ms.
     */
    fetch(id) {
        const throttlers = this._throttlers;
        if (!(id in throttlers)) {
            throttlers[id] = new _lumino_polling__WEBPACK_IMPORTED_MODULE_2__.Throttler(() => this._connector.fetch(id), 100);
        }
        return throttlers[id].invoke();
    }
    async list(query = 'all') {
        const { isDeferred, isDisabled } = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.Extension;
        const { ids, values } = await this._connector.list();
        if (query === 'all') {
            return { ids, values };
        }
        return {
            ids: ids.filter(id => !isDeferred(id) && !isDisabled(id)),
            values: values.filter(({ id }) => !isDeferred(id) && !isDisabled(id))
        };
    }
    async save(id, raw) {
        await this._connector.save(id, raw);
    }
}
//# sourceMappingURL=settingconnector.js.map

/***/ }),

/***/ "../../packages/apputils-extension/lib/settingsplugin.js":
/*!***************************************************************!*\
  !*** ../../packages/apputils-extension/lib/settingsplugin.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "settingsPlugin": () => (/* binding */ settingsPlugin)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _settingconnector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settingconnector */ "../../packages/apputils-extension/lib/settingconnector.js");
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/



/**
 * The default setting registry provider.
 */
const settingsPlugin = {
    id: '@jupyterlab/apputils-extension:settings',
    activate: async (app) => {
        const { isDisabled } = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.Extension;
        const connector = new _settingconnector__WEBPACK_IMPORTED_MODULE_2__.SettingConnector(app.serviceManager.settings);
        const registry = new _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_1__.SettingRegistry({
            connector,
            plugins: (await connector.list('active')).values
        });
        // If there are plugins that have schemas that are not in the setting
        // registry after the application has restored, try to load them manually
        // because otherwise, its settings will never become available in the
        // setting registry.
        void app.restored.then(async () => {
            const plugins = await connector.list('all');
            plugins.ids.forEach(async (id, index) => {
                if (isDisabled(id) || id in registry.plugins) {
                    return;
                }
                try {
                    await registry.load(id);
                }
                catch (error) {
                    console.warn(`Settings failed to load for (${id})`, error);
                    if (plugins.values[index].schema['jupyter.lab.transform']) {
                        console.warn(`This may happen if {autoStart: false} in (${id}) ` +
                            `or if it is one of the deferredExtensions in page config.`);
                    }
                }
            });
        });
        return registry;
    },
    autoStart: true,
    provides: _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_1__.ISettingRegistry
};
//# sourceMappingURL=settingsplugin.js.map

/***/ }),

/***/ "../../packages/apputils-extension/lib/themesplugins.js":
/*!**************************************************************!*\
  !*** ../../packages/apputils-extension/lib/themesplugins.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "themesPlugin": () => (/* binding */ themesPlugin),
/* harmony export */   "themesPaletteMenuPlugin": () => (/* binding */ themesPaletteMenuPlugin)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__);
/* -----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/






var CommandIDs;
(function (CommandIDs) {
    CommandIDs.changeTheme = 'apputils:change-theme';
    CommandIDs.themeScrollbars = 'apputils:theme-scrollbars';
    CommandIDs.changeFont = 'apputils:change-font';
    CommandIDs.incrFontSize = 'apputils:incr-font-size';
    CommandIDs.decrFontSize = 'apputils:decr-font-size';
})(CommandIDs || (CommandIDs = {}));
/**
 * The default theme manager provider.
 */
const themesPlugin = {
    id: '@jupyterlab/apputils-extension:themes',
    requires: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_4__.ISettingRegistry, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.IPaths, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ISplashScreen],
    activate: (app, settings, paths, translator, splash) => {
        const trans = translator.load('jupyterlab');
        const host = app.shell;
        const commands = app.commands;
        const url = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getBaseUrl(), paths.urls.themes);
        const key = themesPlugin.id;
        const manager = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ThemeManager({
            key,
            host,
            settings,
            splash: splash !== null && splash !== void 0 ? splash : undefined,
            url
        });
        // Keep a synchronously set reference to the current theme,
        // since the asynchronous setting of the theme in `changeTheme`
        // can lead to an incorrect toggle on the currently used theme.
        let currentTheme;
        manager.themeChanged.connect((sender, args) => {
            // Set data attributes on the application shell for the current theme.
            currentTheme = args.newValue;
            document.body.dataset.jpThemeLight = String(manager.isLight(currentTheme));
            document.body.dataset.jpThemeName = currentTheme;
            if (document.body.dataset.jpThemeScrollbars !==
                String(manager.themeScrollbars(currentTheme))) {
                document.body.dataset.jpThemeScrollbars = String(manager.themeScrollbars(currentTheme));
            }
            commands.notifyCommandChanged(CommandIDs.changeTheme);
        });
        commands.addCommand(CommandIDs.changeTheme, {
            label: args => {
                const theme = args['theme'];
                const displayName = manager.getDisplayName(theme);
                return args['isPalette']
                    ? trans.__('Use Theme: %1', displayName)
                    : displayName;
            },
            isToggled: args => args['theme'] === currentTheme,
            execute: args => {
                const theme = args['theme'];
                if (theme === manager.theme) {
                    return;
                }
                return manager.setTheme(theme);
            }
        });
        commands.addCommand(CommandIDs.themeScrollbars, {
            label: trans.__('Theme Scrollbars'),
            isToggled: () => manager.isToggledThemeScrollbars(),
            execute: () => manager.toggleThemeScrollbars()
        });
        commands.addCommand(CommandIDs.changeFont, {
            label: args => args['enabled'] ? `${args['font']}` : trans.__('waiting for fonts'),
            isEnabled: args => args['enabled'],
            isToggled: args => manager.getCSS(args['key']) === args['font'],
            execute: args => manager.setCSSOverride(args['key'], args['font'])
        });
        commands.addCommand(CommandIDs.incrFontSize, {
            label: args => {
                switch (args.key) {
                    case 'code-font-size':
                        return trans.__('Increase Code Font Size');
                    case 'content-font-size1':
                        return trans.__('Increase Content Font Size');
                    case 'ui-font-size1':
                        return trans.__('Increase UI Font Size');
                    default:
                        return trans.__('Increase Font Size');
                }
            },
            execute: args => manager.incrFontSize(args['key'])
        });
        commands.addCommand(CommandIDs.decrFontSize, {
            label: args => {
                switch (args.key) {
                    case 'code-font-size':
                        return trans.__('Decrease Code Font Size');
                    case 'content-font-size1':
                        return trans.__('Decrease Content Font Size');
                    case 'ui-font-size1':
                        return trans.__('Decrease UI Font Size');
                    default:
                        return trans.__('Decrease Font Size');
                }
            },
            execute: args => manager.decrFontSize(args['key'])
        });
        return manager;
    },
    autoStart: true,
    provides: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IThemeManager
};
/**
 * The default theme manager's UI command palette and main menu functionality.
 *
 * #### Notes
 * This plugin loads separately from the theme manager plugin in order to
 * prevent blocking of the theme manager while it waits for the command palette
 * and main menu to become available.
 */
const themesPaletteMenuPlugin = {
    id: '@jupyterlab/apputils-extension:themes-palette-menu',
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IThemeManager, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__.IMainMenu],
    activate: (app, manager, translator, palette, mainMenu) => {
        const trans = translator.load('jupyterlab');
        // If we have a main menu, add the theme manager to the settings menu.
        if (mainMenu) {
            void app.restored.then(() => {
                var _a;
                const isPalette = false;
                const themeMenu = (_a = mainMenu.settingsMenu.items.find(item => {
                    var _a;
                    return item.type === 'submenu' &&
                        ((_a = item.submenu) === null || _a === void 0 ? void 0 : _a.id) === 'jp-mainmenu-settings-apputilstheme';
                })) === null || _a === void 0 ? void 0 : _a.submenu;
                // choose a theme
                if (themeMenu) {
                    manager.themes.forEach((theme, index) => {
                        themeMenu.insertItem(index, {
                            command: CommandIDs.changeTheme,
                            args: { isPalette, theme }
                        });
                    });
                }
            });
        }
        // If we have a command palette, add theme switching options to it.
        if (palette) {
            void app.restored.then(() => {
                const category = trans.__('Theme');
                const command = CommandIDs.changeTheme;
                const isPalette = true;
                // choose a theme
                manager.themes.forEach(theme => {
                    palette.addItem({ command, args: { isPalette, theme }, category });
                });
                // toggle scrollbar theming
                palette.addItem({ command: CommandIDs.themeScrollbars, category });
                // increase/decrease code font size
                palette.addItem({
                    command: CommandIDs.incrFontSize,
                    args: {
                        key: 'code-font-size'
                    },
                    category
                });
                palette.addItem({
                    command: CommandIDs.decrFontSize,
                    args: {
                        key: 'code-font-size'
                    },
                    category
                });
                // increase/decrease content font size
                palette.addItem({
                    command: CommandIDs.incrFontSize,
                    args: {
                        key: 'content-font-size1'
                    },
                    category
                });
                palette.addItem({
                    command: CommandIDs.decrFontSize,
                    args: {
                        key: 'content-font-size1'
                    },
                    category
                });
                // increase/decrease ui font size
                palette.addItem({
                    command: CommandIDs.incrFontSize,
                    args: {
                        key: 'ui-font-size1'
                    },
                    category
                });
                palette.addItem({
                    command: CommandIDs.decrFontSize,
                    args: {
                        key: 'ui-font-size1'
                    },
                    category
                });
            });
        }
    },
    autoStart: true
};
//# sourceMappingURL=themesplugins.js.map

/***/ }),

/***/ "../../packages/apputils-extension/lib/toolbarregistryplugin.js":
/*!**********************************************************************!*\
  !*** ../../packages/apputils-extension/lib/toolbarregistryplugin.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toolbarRegistry": () => (/* binding */ toolbarRegistry)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);

/**
 * The default toolbar registry.
 */
const toolbarRegistry = {
    id: '@jupyterlab/apputils-extension:toolbar-registry',
    autoStart: true,
    provides: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.IToolbarWidgetRegistry,
    activate: (app) => {
        const registry = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarWidgetRegistry({
            defaultFactory: (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.createDefaultFactory)(app.commands)
        });
        return registry;
    }
};
//# sourceMappingURL=toolbarregistryplugin.js.map

/***/ }),

/***/ "../../packages/apputils-extension/lib/workspacesplugin.js":
/*!*****************************************************************!*\
  !*** ../../packages/apputils-extension/lib/workspacesplugin.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "workspacesPlugin": () => (/* binding */ workspacesPlugin)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/filebrowser */ "webpack/sharing/consume/default/@jupyterlab/filebrowser/@jupyterlab/filebrowser");
/* harmony import */ var _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_7__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








var CommandIDs;
(function (CommandIDs) {
    CommandIDs.saveWorkspace = 'workspace-ui:save';
    CommandIDs.saveWorkspaceAs = 'workspace-ui:save-as';
})(CommandIDs || (CommandIDs = {}));
const WORKSPACE_NAME = 'jupyterlab-workspace';
const WORKSPACE_EXT = '.' + WORKSPACE_NAME;
const LAST_SAVE_ID = 'workspace-ui:lastSave';
const ICON_NAME = 'jp-JupyterIcon';
/**
 * The workspace MIME renderer and save plugin.
 */
const workspacesPlugin = {
    id: '@jupyterlab/apputils-extension:workspaces',
    autoStart: true,
    requires: [
        _jupyterlab_filebrowser__WEBPACK_IMPORTED_MODULE_4__.IFileBrowserFactory,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IWindowResolver,
        _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_5__.IStateDB,
        _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.ITranslator,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.JupyterFrontEnd.IPaths
    ],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.IRouter],
    activate: (app, fbf, resolver, state, translator, paths, router) => {
        // The workspace factory creates dummy widgets to load a new workspace.
        const factory = new Private.WorkspaceFactory({
            workspaces: app.serviceManager.workspaces,
            router,
            state,
            translator,
            paths
        });
        const trans = translator.load('jupyterlab');
        app.docRegistry.addFileType({
            name: WORKSPACE_NAME,
            contentType: 'file',
            fileFormat: 'text',
            displayName: trans.__('JupyterLab workspace File'),
            extensions: [WORKSPACE_EXT],
            mimeTypes: ['text/json'],
            iconClass: ICON_NAME
        });
        app.docRegistry.addWidgetFactory(factory);
        app.commands.addCommand(CommandIDs.saveWorkspaceAs, {
            label: trans.__('Save Current Workspace As…'),
            execute: async () => {
                const data = app.serviceManager.workspaces.fetch(resolver.name);
                await Private.saveAs(fbf.defaultBrowser, app.serviceManager.contents, data, state, translator);
            }
        });
        app.commands.addCommand(CommandIDs.saveWorkspace, {
            label: trans.__('Save Current Workspace'),
            execute: async () => {
                const { contents } = app.serviceManager;
                const data = app.serviceManager.workspaces.fetch(resolver.name);
                const lastSave = (await state.fetch(LAST_SAVE_ID));
                if (lastSave === undefined) {
                    await Private.saveAs(fbf.defaultBrowser, contents, data, state, translator);
                }
                else {
                    await Private.save(lastSave, contents, data, state);
                }
            }
        });
    }
};
var Private;
(function (Private) {
    /**
     * Save workspace to a user provided location
     */
    async function save(userPath, contents, data, state) {
        let name = userPath.split('/').pop();
        // Add extension if not provided or remove extension from name if it was.
        if (name !== undefined && name.includes('.')) {
            name = name.split('.')[0];
        }
        else {
            userPath = userPath + WORKSPACE_EXT;
        }
        // Save last save location, for save button to work
        await state.save(LAST_SAVE_ID, userPath);
        const resolvedData = await data;
        resolvedData.metadata.id = `${name}`;
        await contents.save(userPath, {
            type: 'file',
            format: 'text',
            content: JSON.stringify(resolvedData)
        });
    }
    Private.save = save;
    /**
     * Ask user for location, and save workspace.
     * Default location is the current directory in the file browser
     */
    async function saveAs(browser, contents, data, state, translator) {
        var _a;
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.nullTranslator;
        const lastSave = await state.fetch(LAST_SAVE_ID);
        let defaultName;
        if (lastSave === undefined) {
            defaultName = 'new-workspace';
        }
        else {
            defaultName = (_a = lastSave.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
        }
        const defaultPath = browser.model.path + '/' + defaultName + WORKSPACE_EXT;
        const userPath = await getSavePath(defaultPath, translator);
        if (userPath) {
            await save(userPath, contents, data, state);
        }
    }
    Private.saveAs = saveAs;
    /**
     * This widget factory is used to handle double click on workspace
     */
    class WorkspaceFactory extends _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3__.ABCWidgetFactory {
        /**
         * Construct a widget factory that uploads a workspace and navigates to it.
         *
         * @param options - The instantiation options for a `WorkspaceFactory`.
         */
        constructor(options) {
            const trans = (options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.nullTranslator).load('jupyterlab');
            super({
                name: trans.__('Workspace loader'),
                fileTypes: [WORKSPACE_NAME],
                defaultFor: [WORKSPACE_NAME],
                readOnly: true
            });
            this._application = options.paths.urls.app;
            this._router = options.router;
            this._state = options.state;
            this._workspaces = options.workspaces;
        }
        /**
         * Loads the workspace into load, and jump to it
         * @param context This is used queried to query the workspace content
         */
        createNewWidget(context) {
            // Save a file's contents as a workspace and navigate to that workspace.
            void context.ready.then(async () => {
                const file = context.model;
                const workspace = file.toJSON();
                const path = context.path;
                const id = workspace.metadata.id;
                // Save the file contents as a workspace.
                await this._workspaces.save(id, workspace);
                // Save last save location for the save command.
                await this._state.save(LAST_SAVE_ID, path);
                // Navigate to new workspace.
                const url = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.URLExt.join(this._application, 'workspaces', id);
                if (this._router) {
                    this._router.navigate(url, { hard: true });
                }
                else {
                    document.location.href = url;
                }
            });
            return dummyWidget(context);
        }
    }
    Private.WorkspaceFactory = WorkspaceFactory;
    /**
     * Returns a dummy widget with disposed content that doesn't render in the UI.
     *
     * @param context - The file context.
     */
    function dummyWidget(context) {
        const widget = new _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3__.DocumentWidget({ content: new _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.Widget(), context });
        widget.content.dispose();
        return widget;
    }
    /**
     * Ask user for a path to save to.
     * @param defaultPath Path already present when the dialog is shown
     */
    async function getSavePath(defaultPath, translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_6__.nullTranslator;
        const trans = translator.load('jupyterlab');
        const saveBtn = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.okButton({ label: trans.__('Save') });
        const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.showDialog)({
            title: trans.__('Save Current Workspace As…'),
            body: new SaveWidget(defaultPath),
            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.Dialog.cancelButton({ label: trans.__('Cancel') }), saveBtn]
        });
        if (result.button.label === trans.__('Save')) {
            return result.value;
        }
        else {
            return null;
        }
    }
    /**
     * A widget that gets a file path from a user.
     */
    class SaveWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.Widget {
        /**
         * Gets a modal node for getting save location. Will have a default to the current opened directory
         * @param path Default location
         */
        constructor(path) {
            super({ node: createSaveNode(path) });
        }
        /**
         * Gets the save path entered by the user
         */
        getValue() {
            return this.node.value;
        }
    }
    /**
     * Create the node for a save widget.
     */
    function createSaveNode(path) {
        const input = document.createElement('input');
        input.value = path;
        return input;
    }
})(Private || (Private = {}));
//# sourceMappingURL=workspacesplugin.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMtZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMtZXh0ZW5zaW9uL2xpYi9wYWxldHRlLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9hcHB1dGlscy1leHRlbnNpb24vbGliL3NldHRpbmdjb25uZWN0b3IuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2FwcHV0aWxzLWV4dGVuc2lvbi9saWIvc2V0dGluZ3NwbHVnaW4uanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2FwcHV0aWxzLWV4dGVuc2lvbi9saWIvdGhlbWVzcGx1Z2lucy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvYXBwdXRpbHMtZXh0ZW5zaW9uL2xpYi90b29sYmFycmVnaXN0cnlwbHVnaW4uanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2FwcHV0aWxzLWV4dGVuc2lvbi9saWIvd29ya3NwYWNlc3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29GO0FBQ2tJO0FBQ2xKO0FBQ0w7QUFDUDtBQUNGO0FBQ1M7QUFDWDtBQUNJO0FBQ0Q7QUFDbkI7QUFDYztBQUNzQjtBQUNkO0FBQ0o7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixtREFBTTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLDZCQUE2QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEJBQTBCO0FBQzNCLDRDIiwiZmlsZSI6InBhY2thZ2VzX2FwcHV0aWxzLWV4dGVuc2lvbl9saWJfaW5kZXhfanMuMzA4NTliYWViNTdhNzRjMTc2ZWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGFwcHV0aWxzLWV4dGVuc2lvblxuICovXG5pbXBvcnQgeyBJTGF5b3V0UmVzdG9yZXIsIElSb3V0ZXIsIEp1cHl0ZXJGcm9udEVuZCB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IGRlZmF1bHRTYW5pdGl6ZXIsIERpYWxvZywgSUNvbW1hbmRQYWxldHRlLCBJU2FuaXRpemVyLCBJU2Vzc2lvbkNvbnRleHREaWFsb2dzLCBJU3BsYXNoU2NyZWVuLCBJV2luZG93UmVzb2x2ZXIsIE1haW5BcmVhV2lkZ2V0LCBQcmludGluZywgc2Vzc2lvbkNvbnRleHREaWFsb2dzLCBXaW5kb3dSZXNvbHZlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IFBhZ2VDb25maWcsIFBhdGhFeHQsIFVSTEV4dCB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBJU2V0dGluZ1JlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2V0dGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7IElTdGF0ZURCLCBTdGF0ZURCIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdGVkYic7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGp1cHl0ZXJGYXZpY29uSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgUHJvbWlzZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgRGlzcG9zYWJsZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9kaXNwb3NhYmxlJztcbmltcG9ydCB7IERlYm91bmNlciwgVGhyb3R0bGVyIH0gZnJvbSAnQGx1bWluby9wb2xsaW5nJztcbmltcG9ydCB7IFBhbGV0dGUgfSBmcm9tICcuL3BhbGV0dGUnO1xuaW1wb3J0IHsgc2V0dGluZ3NQbHVnaW4gfSBmcm9tICcuL3NldHRpbmdzcGx1Z2luJztcbmltcG9ydCB7IHRoZW1lc1BhbGV0dGVNZW51UGx1Z2luLCB0aGVtZXNQbHVnaW4gfSBmcm9tICcuL3RoZW1lc3BsdWdpbnMnO1xuaW1wb3J0IHsgdG9vbGJhclJlZ2lzdHJ5IH0gZnJvbSAnLi90b29sYmFycmVnaXN0cnlwbHVnaW4nO1xuaW1wb3J0IHsgd29ya3NwYWNlc1BsdWdpbiB9IGZyb20gJy4vd29ya3NwYWNlc3BsdWdpbic7XG4vKipcbiAqIFRoZSBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHMgYmVmb3JlIHJlY292ZXIgb3B0aW9ucyBhcHBlYXIgZHVyaW5nIHNwbGFzaC5cbiAqL1xuY29uc3QgU1BMQVNIX1JFQ09WRVJfVElNRU9VVCA9IDEyMDAwO1xuLyoqXG4gKiBUaGUgY29tbWFuZCBJRHMgdXNlZCBieSB0aGUgYXBwdXRpbHMgcGx1Z2luLlxuICovXG52YXIgQ29tbWFuZElEcztcbihmdW5jdGlvbiAoQ29tbWFuZElEcykge1xuICAgIENvbW1hbmRJRHMubG9hZFN0YXRlID0gJ2FwcHV0aWxzOmxvYWQtc3RhdGVkYic7XG4gICAgQ29tbWFuZElEcy5wcmludCA9ICdhcHB1dGlsczpwcmludCc7XG4gICAgQ29tbWFuZElEcy5yZXNldCA9ICdhcHB1dGlsczpyZXNldCc7XG4gICAgQ29tbWFuZElEcy5yZXNldE9uTG9hZCA9ICdhcHB1dGlsczpyZXNldC1vbi1sb2FkJztcbiAgICBDb21tYW5kSURzLnJ1bkZpcnN0RW5hYmxlZCA9ICdhcHB1dGlsczpydW4tZmlyc3QtZW5hYmxlZCc7XG4gICAgQ29tbWFuZElEcy5ydW5BbGxFbmFibGVkID0gJ2FwcHV0aWxzOnJ1bi1hbGwtZW5hYmxlZCc7XG4gICAgQ29tbWFuZElEcy50b2dnbGVIZWFkZXIgPSAnYXBwdXRpbHM6dG9nZ2xlLWhlYWRlcic7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbi8qKlxuICogVGhlIGRlZmF1bHQgY29tbWFuZCBwYWxldHRlIGV4dGVuc2lvbi5cbiAqL1xuY29uc3QgcGFsZXR0ZSA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2FwcHV0aWxzLWV4dGVuc2lvbjpwYWxldHRlJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgcHJvdmlkZXM6IElDb21tYW5kUGFsZXR0ZSxcbiAgICBvcHRpb25hbDogW0lTZXR0aW5nUmVnaXN0cnldLFxuICAgIGFjdGl2YXRlOiAoYXBwLCB0cmFuc2xhdG9yLCBzZXR0aW5nUmVnaXN0cnkpID0+IHtcbiAgICAgICAgcmV0dXJuIFBhbGV0dGUuYWN0aXZhdGUoYXBwLCB0cmFuc2xhdG9yLCBzZXR0aW5nUmVnaXN0cnkpO1xuICAgIH1cbn07XG4vKipcbiAqIFRoZSBkZWZhdWx0IGNvbW1hbmQgcGFsZXR0ZSdzIHJlc3RvcmF0aW9uIGV4dGVuc2lvbi5cbiAqXG4gKiAjIyMjIE5vdGVzXG4gKiBUaGUgY29tbWFuZCBwYWxldHRlJ3MgcmVzdG9yYXRpb24gbG9naWMgaXMgaGFuZGxlZCBzZXBhcmF0ZWx5IGZyb20gdGhlXG4gKiBjb21tYW5kIHBhbGV0dGUgcHJvdmlkZXIgZXh0ZW5zaW9uIGJlY2F1c2UgdGhlIGxheW91dCByZXN0b3JlciBkZXBlbmRlbmN5XG4gKiBjYXVzZXMgdGhlIGNvbW1hbmQgcGFsZXR0ZSB0byBiZSB1bmF2YWlsYWJsZSB0byBvdGhlciBleHRlbnNpb25zIGVhcmxpZXJcbiAqIGluIHRoZSBhcHBsaWNhdGlvbiBsb2FkIGN5Y2xlLlxuICovXG5jb25zdCBwYWxldHRlUmVzdG9yZXIgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9hcHB1dGlscy1leHRlbnNpb246cGFsZXR0ZS1yZXN0b3JlcicsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHJlcXVpcmVzOiBbSUxheW91dFJlc3RvcmVyLCBJVHJhbnNsYXRvcl0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHJlc3RvcmVyLCB0cmFuc2xhdG9yKSA9PiB7XG4gICAgICAgIFBhbGV0dGUucmVzdG9yZShhcHAsIHJlc3RvcmVyLCB0cmFuc2xhdG9yKTtcbiAgICB9XG59O1xuLyoqXG4gKiBUaGUgZGVmYXVsdCB3aW5kb3cgbmFtZSByZXNvbHZlciBwcm92aWRlci5cbiAqL1xuY29uc3QgcmVzb2x2ZXIgPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9hcHB1dGlscy1leHRlbnNpb246cmVzb2x2ZXInLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBwcm92aWRlczogSVdpbmRvd1Jlc29sdmVyLFxuICAgIHJlcXVpcmVzOiBbSnVweXRlckZyb250RW5kLklQYXRocywgSVJvdXRlcl0sXG4gICAgYWN0aXZhdGU6IGFzeW5jIChhcHAsIHBhdGhzLCByb3V0ZXIpID0+IHtcbiAgICAgICAgY29uc3QgeyBoYXNoLCBzZWFyY2ggfSA9IHJvdXRlci5jdXJyZW50O1xuICAgICAgICBjb25zdCBxdWVyeSA9IFVSTEV4dC5xdWVyeVN0cmluZ1RvT2JqZWN0KHNlYXJjaCB8fCAnJyk7XG4gICAgICAgIGNvbnN0IHNvbHZlciA9IG5ldyBXaW5kb3dSZXNvbHZlcigpO1xuICAgICAgICBjb25zdCB3b3Jrc3BhY2UgPSBQYWdlQ29uZmlnLmdldE9wdGlvbignd29ya3NwYWNlJyk7XG4gICAgICAgIGNvbnN0IHRyZWVQYXRoID0gUGFnZUNvbmZpZy5nZXRPcHRpb24oJ3RyZWVQYXRoJyk7XG4gICAgICAgIGNvbnN0IG1vZGUgPSBQYWdlQ29uZmlnLmdldE9wdGlvbignbW9kZScpID09PSAnbXVsdGlwbGUtZG9jdW1lbnQnID8gJ2xhYicgOiAnZG9jJztcbiAgICAgICAgLy8gVGhpcyBpcyB1c2VkIGFzIGEga2V5IGluIGxvY2FsIHN0b3JhZ2UgdG8gcmVmZXIgdG8gd29ya3NwYWNlcywgZWl0aGVyIHRoZSBuYW1lXG4gICAgICAgIC8vIG9mIHRoZSB3b3Jrc3BhY2Ugb3IgdGhlIHN0cmluZyBQYWdlQ29uZmlnLmRlZmF1bHRXb3Jrc3BhY2UuIEJvdGggbGFiIGFuZCBkb2MgbW9kZXMgc2hhcmUgdGhlIHNhbWUgd29ya3NwYWNlLlxuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB3b3Jrc3BhY2UgPyB3b3Jrc3BhY2UgOiBQYWdlQ29uZmlnLmRlZmF1bHRXb3Jrc3BhY2U7XG4gICAgICAgIGNvbnN0IHJlc3QgPSB0cmVlUGF0aCA/IFVSTEV4dC5qb2luKCd0cmVlJywgdHJlZVBhdGgpIDogJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBzb2x2ZXIucmVzb2x2ZShjYW5kaWRhdGUpO1xuICAgICAgICAgICAgcmV0dXJuIHNvbHZlcjtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFdpbmRvdyByZXNvbHV0aW9uIGhhcyBmYWlsZWQgc28gdGhlIFVSTCBtdXN0IGNoYW5nZS4gUmV0dXJuIGEgcHJvbWlzZVxuICAgICAgICAgICAgLy8gdGhhdCBuZXZlciByZXNvbHZlcyB0byBwcmV2ZW50IHRoZSBhcHBsaWNhdGlvbiBmcm9tIGxvYWRpbmcgcGx1Z2luc1xuICAgICAgICAgICAgLy8gdGhhdCByZWx5IG9uIGBJV2luZG93UmVzb2x2ZXJgLlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGJhc2UgfSA9IHBhdGhzLnVybHM7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9vbCA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMDEyMzQ1Njc4OSc7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZG9tID0gcG9vbFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb29sLmxlbmd0aCldO1xuICAgICAgICAgICAgICAgIGxldCBwYXRoID0gVVJMRXh0LmpvaW4oYmFzZSwgbW9kZSwgJ3dvcmtzcGFjZXMnLCBgYXV0by0ke3JhbmRvbX1gKTtcbiAgICAgICAgICAgICAgICBwYXRoID0gcmVzdCA/IFVSTEV4dC5qb2luKHBhdGgsIFVSTEV4dC5lbmNvZGVQYXJ0cyhyZXN0KSkgOiBwYXRoO1xuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHRoZSB3b3Jrc3BhY2Ugb24gbG9hZC5cbiAgICAgICAgICAgICAgICBxdWVyeVsncmVzZXQnXSA9ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IHBhdGggKyBVUkxFeHQub2JqZWN0VG9RdWVyeVN0cmluZyhxdWVyeSkgKyAoaGFzaCB8fCAnJyk7XG4gICAgICAgICAgICAgICAgcm91dGVyLm5hdmlnYXRlKHVybCwgeyBoYXJkOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBzcGxhc2ggc2NyZWVuIHByb3ZpZGVyLlxuICovXG5jb25zdCBzcGxhc2ggPSB7XG4gICAgaWQ6ICdAanVweXRlcmxhYi9hcHB1dGlscy1leHRlbnNpb246c3BsYXNoJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgcHJvdmlkZXM6IElTcGxhc2hTY3JlZW4sXG4gICAgYWN0aXZhdGU6IChhcHAsIHRyYW5zbGF0b3IpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcywgcmVzdG9yZWQgfSA9IGFwcDtcbiAgICAgICAgLy8gQ3JlYXRlIHNwbGFzaCBlbGVtZW50IGFuZCBwb3B1bGF0ZSBpdC5cbiAgICAgICAgY29uc3Qgc3BsYXNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGdhbGF4eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNwbGFzaC5pZCA9ICdqdXB5dGVybGFiLXNwbGFzaCc7XG4gICAgICAgIGdhbGF4eS5pZCA9ICdnYWxheHknO1xuICAgICAgICBsb2dvLmlkID0gJ21haW4tbG9nbyc7XG4gICAgICAgIGp1cHl0ZXJGYXZpY29uSWNvbi5lbGVtZW50KHtcbiAgICAgICAgICAgIGNvbnRhaW5lcjogbG9nbyxcbiAgICAgICAgICAgIHN0eWxlc2hlZXQ6ICdzcGxhc2gnXG4gICAgICAgIH0pO1xuICAgICAgICBnYWxheHkuYXBwZW5kQ2hpbGQobG9nbyk7XG4gICAgICAgIFsnMScsICcyJywgJzMnXS5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1vb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYW5ldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbW9vbi5pZCA9IGBtb29uJHtpZH1gO1xuICAgICAgICAgICAgbW9vbi5jbGFzc05hbWUgPSAnbW9vbiBvcmJpdCc7XG4gICAgICAgICAgICBwbGFuZXQuaWQgPSBgcGxhbmV0JHtpZH1gO1xuICAgICAgICAgICAgcGxhbmV0LmNsYXNzTmFtZSA9ICdwbGFuZXQnO1xuICAgICAgICAgICAgbW9vbi5hcHBlbmRDaGlsZChwbGFuZXQpO1xuICAgICAgICAgICAgZ2FsYXh5LmFwcGVuZENoaWxkKG1vb24pO1xuICAgICAgICB9KTtcbiAgICAgICAgc3BsYXNoLmFwcGVuZENoaWxkKGdhbGF4eSk7XG4gICAgICAgIC8vIENyZWF0ZSBkZWJvdW5jZWQgcmVjb3ZlcnkgZGlhbG9nIGZ1bmN0aW9uLlxuICAgICAgICBsZXQgZGlhbG9nO1xuICAgICAgICBjb25zdCByZWNvdmVyeSA9IG5ldyBUaHJvdHRsZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGRpYWxvZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpYWxvZyA9IG5ldyBEaWFsb2coe1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnTG9hZGluZ+KApicpLFxuICAgICAgICAgICAgICAgIGJvZHk6IHRyYW5zLl9fKGBUaGUgbG9hZGluZyBzY3JlZW4gaXMgdGFraW5nIGEgbG9uZyB0aW1lLlxuV291bGQgeW91IGxpa2UgdG8gY2xlYXIgdGhlIHdvcmtzcGFjZSBvciBrZWVwIHdhaXRpbmc/YCksXG4gICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdLZWVwIFdhaXRpbmcnKSB9KSxcbiAgICAgICAgICAgICAgICAgICAgRGlhbG9nLndhcm5CdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ0NsZWFyIFdvcmtzcGFjZScpIH0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGRpYWxvZy5sYXVuY2goKTtcbiAgICAgICAgICAgICAgICBkaWFsb2cuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIGRpYWxvZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5idXR0b24uYWNjZXB0ICYmIGNvbW1hbmRzLmhhc0NvbW1hbmQoQ29tbWFuZElEcy5yZXNldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRzLmV4ZWN1dGUoQ29tbWFuZElEcy5yZXNldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFJlLWludm9rZSB0aGUgcmVjb3ZlcnkgdGltZXIgaW4gdGhlIG5leHQgZnJhbWUuXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQmVjYXVzZSByZWNvdmVyeSBjYW4gYmUgc3RvcHBlZCwgaGFuZGxlIGludm9jYXRpb24gcmVqZWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICB2b2lkIHJlY292ZXJ5Lmludm9rZSgpLmNhdGNoKF8gPT4gdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIC8qIG5vLW9wICovXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHsgbGltaXQ6IFNQTEFTSF9SRUNPVkVSX1RJTUVPVVQsIGVkZ2U6ICd0cmFpbGluZycgfSk7XG4gICAgICAgIC8vIFJldHVybiBJU3BsYXNoU2NyZWVuLlxuICAgICAgICBsZXQgc3BsYXNoQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2hvdzogKGxpZ2h0ID0gdHJ1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHNwbGFzaC5jbGFzc0xpc3QucmVtb3ZlKCdzcGxhc2gtZmFkZScpO1xuICAgICAgICAgICAgICAgIHNwbGFzaC5jbGFzc0xpc3QudG9nZ2xlKCdsaWdodCcsIGxpZ2h0KTtcbiAgICAgICAgICAgICAgICBzcGxhc2guY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycsICFsaWdodCk7XG4gICAgICAgICAgICAgICAgc3BsYXNoQ291bnQrKztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNwbGFzaCk7XG4gICAgICAgICAgICAgICAgLy8gQmVjYXVzZSByZWNvdmVyeSBjYW4gYmUgc3RvcHBlZCwgaGFuZGxlIGludm9jYXRpb24gcmVqZWN0aW9uLlxuICAgICAgICAgICAgICAgIHZvaWQgcmVjb3ZlcnkuaW52b2tlKCkuY2F0Y2goXyA9PiB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZURlbGVnYXRlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVzdG9yZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICgtLXNwbGFzaENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2b2lkIHJlY292ZXJ5LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaWFsb2cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWFsb2cuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGxhc2guY2xhc3NMaXN0LmFkZCgnc3BsYXNoLWZhZGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNwbGFzaCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufTtcbmNvbnN0IHByaW50ID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMtZXh0ZW5zaW9uOnByaW50JyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHRyYW5zbGF0b3IpID0+IHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5wcmludCwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdQcmludOKApicpLFxuICAgICAgICAgICAgaXNFbmFibGVkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gYXBwLnNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByaW50aW5nLmdldFByaW50RnVuY3Rpb24od2lkZ2V0KSAhPT0gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleGVjdXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gYXBwLnNoZWxsLmN1cnJlbnRXaWRnZXQ7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpbnRGdW5jdGlvbiA9IFByaW50aW5nLmdldFByaW50RnVuY3Rpb24od2lkZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAocHJpbnRGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBwcmludEZ1bmN0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUhlYWRlciA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2FwcHV0aWxzLWV4dGVuc2lvbjp0b2dnbGUtaGVhZGVyJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtJQ29tbWFuZFBhbGV0dGVdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCB0cmFuc2xhdG9yLCBwYWxldHRlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gdHJhbnMuX18oJ01haW4gQXJlYScpO1xuICAgICAgICBhcHAuY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLnRvZ2dsZUhlYWRlciwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdTaG93IEhlYWRlciBBYm92ZSBDb250ZW50JyksXG4gICAgICAgICAgICBpc0VuYWJsZWQ6ICgpID0+IGFwcC5zaGVsbC5jdXJyZW50V2lkZ2V0IGluc3RhbmNlb2YgTWFpbkFyZWFXaWRnZXQgJiZcbiAgICAgICAgICAgICAgICBhcHAuc2hlbGwuY3VycmVudFdpZGdldC5jb250ZW50SGVhZGVyLndpZGdldHMubGVuZ3RoID4gMCxcbiAgICAgICAgICAgIGlzVG9nZ2xlZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IGFwcC5zaGVsbC5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgICAgIHJldHVybiB3aWRnZXQgaW5zdGFuY2VvZiBNYWluQXJlYVdpZGdldFxuICAgICAgICAgICAgICAgICAgICA/ICF3aWRnZXQuY29udGVudEhlYWRlci5pc0hpZGRlblxuICAgICAgICAgICAgICAgICAgICA6IGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXQgPSBhcHAuc2hlbGwuY3VycmVudFdpZGdldDtcbiAgICAgICAgICAgICAgICBpZiAod2lkZ2V0IGluc3RhbmNlb2YgTWFpbkFyZWFXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmNvbnRlbnRIZWFkZXIuc2V0SGlkZGVuKCF3aWRnZXQuY29udGVudEhlYWRlci5pc0hpZGRlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHBhbGV0dGUpIHtcbiAgICAgICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7IGNvbW1hbmQ6IENvbW1hbmRJRHMudG9nZ2xlSGVhZGVyLCBjYXRlZ29yeSB9KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vKipcbiAqIFVwZGF0ZSB0aGUgYnJvd3NlciB0aXRsZSBiYXNlZCBvbiB0aGUgd29ya3NwYWNlIGFuZCB0aGUgY3VycmVudFxuICogYWN0aXZlIGl0ZW0uXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVRhYlRpdGxlKHdvcmtzcGFjZSwgZGIsIG5hbWUpIHtcbiAgICB2YXIgX2EsIF9iO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBkYi50b0pTT04oKTtcbiAgICBsZXQgY3VycmVudCA9IChfYiA9IChfYSA9IGRhdGFbJ2xheW91dC1yZXN0b3JlcjpkYXRhJ10pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5tYWluKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY3VycmVudDtcbiAgICBpZiAoY3VycmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gYCR7UGFnZUNvbmZpZy5nZXRPcHRpb24oJ2FwcE5hbWUnKSB8fCAnSnVweXRlckxhYid9JHt3b3Jrc3BhY2Uuc3RhcnRzV2l0aCgnYXV0by0nKSA/IGAgKCR7d29ya3NwYWNlfSlgIDogYGB9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIEZpbGUgbmFtZSBmcm9tIGN1cnJlbnQgcGF0aFxuICAgICAgICBsZXQgY3VycmVudEZpbGUgPSBQYXRoRXh0LmJhc2VuYW1lKGN1cnJlbnQuc3BsaXQoJzonKVsxXSk7XG4gICAgICAgIC8vIFRydW5jYXRlIHRvIGZpcnN0IDEyIGNoYXJhY3RlcnMgb2YgY3VycmVudCBkb2N1bWVudCBuYW1lICsgLi4uIGlmIGxlbmd0aCA+IDE1XG4gICAgICAgIGN1cnJlbnRGaWxlID1cbiAgICAgICAgICAgIGN1cnJlbnRGaWxlLmxlbmd0aCA+IDE1XG4gICAgICAgICAgICAgICAgPyBjdXJyZW50RmlsZS5zbGljZSgwLCAxMikuY29uY2F0KGDigKZgKVxuICAgICAgICAgICAgICAgIDogY3VycmVudEZpbGU7XG4gICAgICAgIC8vIE51bWJlciBvZiByZXN0b3JhYmxlIGl0ZW1zIHRoYXQgYXJlIGVpdGhlciBub3RlYm9va3Mgb3IgZWRpdG9yc1xuICAgICAgICBjb25zdCBjb3VudCA9IE9iamVjdC5rZXlzKGRhdGEpLmZpbHRlcihpdGVtID0+IGl0ZW0uc3RhcnRzV2l0aCgnbm90ZWJvb2snKSB8fCBpdGVtLnN0YXJ0c1dpdGgoJ2VkaXRvcicpKS5sZW5ndGg7XG4gICAgICAgIGlmICh3b3Jrc3BhY2Uuc3RhcnRzV2l0aCgnYXV0by0nKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPSBgJHtjdXJyZW50RmlsZX0gKCR7d29ya3NwYWNlfSR7Y291bnQgPiAxID8gYCA6ICR7Y291bnR9YCA6IGBgfSkgLSAke25hbWV9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gYCR7Y3VycmVudEZpbGV9JHtjb3VudCA+IDEgPyBgICgke2NvdW50fSlgIDogYGB9IC0gJHtuYW1lfWA7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIFRoZSBkZWZhdWx0IHN0YXRlIGRhdGFiYXNlIGZvciBzdG9yaW5nIGFwcGxpY2F0aW9uIHN0YXRlLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIElmIHRoaXMgZXh0ZW5zaW9uIGlzIGxvYWRlZCB3aXRoIGEgd2luZG93IHJlc29sdmVyLCBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgYWRkXG4gKiBzdGF0ZSBtYW5hZ2VtZW50IGNvbW1hbmRzLCBVUkwgc3VwcG9ydCBmb3IgYGNsb25lYCBhbmQgYHJlc2V0YCwgYW5kIHdvcmtzcGFjZVxuICogYXV0by1zYXZpbmcuIE90aGVyd2lzZSwgaXQgd2lsbCByZXR1cm4gYSBzaW1wbGUgaW4tbWVtb3J5IHN0YXRlIGRhdGFiYXNlLlxuICovXG5jb25zdCBzdGF0ZSA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2FwcHV0aWxzLWV4dGVuc2lvbjpzdGF0ZScsXG4gICAgYXV0b1N0YXJ0OiB0cnVlLFxuICAgIHByb3ZpZGVzOiBJU3RhdGVEQixcbiAgICByZXF1aXJlczogW0p1cHl0ZXJGcm9udEVuZC5JUGF0aHMsIElSb3V0ZXIsIElUcmFuc2xhdG9yXSxcbiAgICBvcHRpb25hbDogW0lXaW5kb3dSZXNvbHZlcl0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHBhdGhzLCByb3V0ZXIsIHRyYW5zbGF0b3IsIHJlc29sdmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGlmIChyZXNvbHZlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdGF0ZURCKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc29sdmVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHsgY29tbWFuZHMsIG5hbWUsIHNlcnZpY2VNYW5hZ2VyIH0gPSBhcHA7XG4gICAgICAgIGNvbnN0IHsgd29ya3NwYWNlcyB9ID0gc2VydmljZU1hbmFnZXI7XG4gICAgICAgIGNvbnN0IHdvcmtzcGFjZSA9IHJlc29sdmVyLm5hbWU7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IG5ldyBQcm9taXNlRGVsZWdhdGUoKTtcbiAgICAgICAgY29uc3QgZGIgPSBuZXcgU3RhdGVEQih7IHRyYW5zZm9ybTogdHJhbnNmb3JtLnByb21pc2UgfSk7XG4gICAgICAgIGNvbnN0IHNhdmUgPSBuZXcgRGVib3VuY2VyKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gd29ya3NwYWNlO1xuICAgICAgICAgICAgY29uc3QgbWV0YWRhdGEgPSB7IGlkIH07XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgZGIudG9KU09OKCk7XG4gICAgICAgICAgICBhd2FpdCB3b3Jrc3BhY2VzLnNhdmUoaWQsIHsgZGF0YSwgbWV0YWRhdGEgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBbnkgdGltZSB0aGUgbG9jYWwgc3RhdGUgZGF0YWJhc2UgY2hhbmdlcywgc2F2ZSB0aGUgd29ya3NwYWNlLlxuICAgICAgICBkYi5jaGFuZ2VkLmNvbm5lY3QoKCkgPT4gdm9pZCBzYXZlLmludm9rZSgpLCBkYik7XG4gICAgICAgIGRiLmNoYW5nZWQuY29ubmVjdCgoKSA9PiB1cGRhdGVUYWJUaXRsZSh3b3Jrc3BhY2UsIGRiLCBuYW1lKSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5sb2FkU3RhdGUsIHtcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFzeW5jIChhcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIGNvbW1hbmQgY2FuIGJlIGV4ZWN1dGVkIGFuIGFyYml0cmFyeSBudW1iZXIgb2YgdGltZXMsIG1ha2VcbiAgICAgICAgICAgICAgICAvLyBzdXJlIGl0IGlzIHNhZmUgdG8gY2FsbCBtdWx0aXBsZSB0aW1lcy5cbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB7IGhhc2gsIHBhdGgsIHNlYXJjaCB9ID0gYXJncztcbiAgICAgICAgICAgICAgICBjb25zdCBxdWVyeSA9IFVSTEV4dC5xdWVyeVN0cmluZ1RvT2JqZWN0KHNlYXJjaCB8fCAnJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xvbmUgPSB0eXBlb2YgcXVlcnlbJ2Nsb25lJ10gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgID8gcXVlcnlbJ2Nsb25lJ10gPT09ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFBhZ2VDb25maWcuZGVmYXVsdFdvcmtzcGFjZVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBxdWVyeVsnY2xvbmUnXVxuICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlID0gY2xvbmUgfHwgd29ya3NwYWNlIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IGNsb25lRGVmYXVsdElmRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvLyBjbG9uZURlZmF1bHRJZkVtcHR5IG1lYW5zIHRvIGNsb25lIHRoZSBkZWZhdWx0IHdvcmtzcGFjZSBpZiB0aGUgZ2l2ZW4gd29ya3NwYWNlIGlzXG4gICAgICAgICAgICAgICAgaWYgKHdvcmtzcGFjZSAhPT0gUGFnZUNvbmZpZy5kZWZhdWx0V29ya3NwYWNlICYmIHF1ZXJ5WydjbG9uZURlZmF1bHRJZkVtcHR5J10gPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsb25lRGVmYXVsdElmRW1wdHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc291cmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7Q29tbWFuZElEcy5sb2FkU3RhdGV9IGNhbm5vdCBsb2FkIG51bGwgd29ya3NwYWNlLmApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzYXZlZCA9IGF3YWl0IHdvcmtzcGFjZXMuZmV0Y2goc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lRGVmYXVsdElmRW1wdHkgJiYgT2JqZWN0LmtleXMoc2F2ZWQuZGF0YSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYXZlZCA9IGF3YWl0IHdvcmtzcGFjZXMuZmV0Y2goUGFnZUNvbmZpZy5kZWZhdWx0V29ya3NwYWNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGNvbW1hbmQgaXMgY2FsbGVkIGFmdGVyIGEgcmVzZXQsIHRoZSBzdGF0ZSBkYXRhYmFzZVxuICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIGFscmVhZHkgYmUgcmVzb2x2ZWQuXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzb2x2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5yZXNvbHZlKHsgdHlwZTogJ292ZXJ3cml0ZScsIGNvbnRlbnRzOiBzYXZlZC5kYXRhIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoICh7IG1lc3NhZ2UgfSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEZldGNoaW5nIHdvcmtzcGFjZSBcIiR7d29ya3NwYWNlfVwiIGZhaWxlZC5gLCBtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHdvcmtzcGFjZSBkb2VzIG5vdCBleGlzdCwgY2FuY2VsIHRoZSBkYXRhIHRyYW5zZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBzYXZlIGEgd29ya3NwYWNlIHdpdGggdGhlIGN1cnJlbnQgdXNlciBzdGF0ZSBkYXRhLlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc29sdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0ucmVzb2x2ZSh7IHR5cGU6ICdjYW5jZWwnLCBjb250ZW50czogbnVsbCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc291cmNlID09PSBjbG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBNYWludGFpbiB0aGUgcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnMgYnV0IHJlbW92ZSBgY2xvbmVgLlxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcXVlcnlbJ2Nsb25lJ107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IHBhdGggKyBVUkxFeHQub2JqZWN0VG9RdWVyeVN0cmluZyhxdWVyeSkgKyBoYXNoO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbG9uZWQgPSBzYXZlLmludm9rZSgpLnRoZW4oKCkgPT4gcm91dGVyLnN0b3ApO1xuICAgICAgICAgICAgICAgICAgICAvLyBBZnRlciB0aGUgc3RhdGUgaGFzIGJlZW4gY2xvbmVkLCBuYXZpZ2F0ZSB0byB0aGUgVVJMLlxuICAgICAgICAgICAgICAgICAgICB2b2lkIGNsb25lZC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlci5uYXZpZ2F0ZSh1cmwpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsb25lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQWZ0ZXIgdGhlIHN0YXRlIGRhdGFiYXNlIGhhcyBmaW5pc2hlZCBsb2FkaW5nLCBzYXZlIGl0LlxuICAgICAgICAgICAgICAgIGF3YWl0IHNhdmUuaW52b2tlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucmVzZXQsIHtcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnUmVzZXQgQXBwbGljYXRpb24gU3RhdGUnKSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFzeW5jICh7IHJlbG9hZCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgZGIuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBzYXZlLmludm9rZSgpO1xuICAgICAgICAgICAgICAgIGlmIChyZWxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGVyLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5yZXNldE9uTG9hZCwge1xuICAgICAgICAgICAgZXhlY3V0ZTogKGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGhhc2gsIHBhdGgsIHNlYXJjaCB9ID0gYXJncztcbiAgICAgICAgICAgICAgICBjb25zdCBxdWVyeSA9IFVSTEV4dC5xdWVyeVN0cmluZ1RvT2JqZWN0KHNlYXJjaCB8fCAnJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzZXQgPSAncmVzZXQnIGluIHF1ZXJ5O1xuICAgICAgICAgICAgICAgIGNvbnN0IGNsb25lID0gJ2Nsb25lJyBpbiBxdWVyeTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHN0YXRlIGRhdGFiYXNlIGhhcyBhbHJlYWR5IGJlZW4gcmVzb2x2ZWQsIHJlc2V0dGluZyBpc1xuICAgICAgICAgICAgICAgIC8vIGltcG9zc2libGUgd2l0aG91dCByZWxvYWRpbmcuXG4gICAgICAgICAgICAgICAgaWYgKHJlc29sdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByb3V0ZXIucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEVtcHR5IHRoZSBzdGF0ZSBkYXRhYmFzZS5cbiAgICAgICAgICAgICAgICByZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLnJlc29sdmUoeyB0eXBlOiAnY2xlYXInLCBjb250ZW50czogbnVsbCB9KTtcbiAgICAgICAgICAgICAgICAvLyBNYWludGFpbiB0aGUgcXVlcnkgc3RyaW5nIHBhcmFtZXRlcnMgYnV0IHJlbW92ZSBgcmVzZXRgLlxuICAgICAgICAgICAgICAgIGRlbGV0ZSBxdWVyeVsncmVzZXQnXTtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBwYXRoICsgVVJMRXh0Lm9iamVjdFRvUXVlcnlTdHJpbmcocXVlcnkpICsgaGFzaDtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhcmVkID0gZGIuY2xlYXIoKS50aGVuKCgpID0+IHNhdmUuaW52b2tlKCkpO1xuICAgICAgICAgICAgICAgIC8vIEFmdGVyIHRoZSBzdGF0ZSBoYXMgYmVlbiByZXNldCwgbmF2aWdhdGUgdG8gdGhlIFVSTC5cbiAgICAgICAgICAgICAgICBpZiAoY2xvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBjbGVhcmVkLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyLm5hdmlnYXRlKHVybCwgeyBoYXJkOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgY2xlYXJlZC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlci5uYXZpZ2F0ZSh1cmwpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsZWFyZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByb3V0ZXIucmVnaXN0ZXIoe1xuICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5sb2FkU3RhdGUsXG4gICAgICAgICAgICBwYXR0ZXJuOiAvLj8vLFxuICAgICAgICAgICAgcmFuazogMzAgLy8gSGlnaCBwcmlvcml0eTogMzA6MTAwLlxuICAgICAgICB9KTtcbiAgICAgICAgcm91dGVyLnJlZ2lzdGVyKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMucmVzZXRPbkxvYWQsXG4gICAgICAgICAgICBwYXR0ZXJuOiAvKFxcP3Jlc2V0fFxcJnJlc2V0KSgkfCYpLyxcbiAgICAgICAgICAgIHJhbms6IDIwIC8vIEhpZ2ggcHJpb3JpdHk6IDIwOjEwMC5cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkYjtcbiAgICB9XG59O1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBzZXNzaW9uIGNvbnRleHQgZGlhbG9ncyBleHRlbnNpb24uXG4gKi9cbmNvbnN0IHNlc3Npb25EaWFsb2dzID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMtZXh0ZW5zaW9uOnNlc3Npb25EaWFsb2dzJyxcbiAgICBwcm92aWRlczogSVNlc3Npb25Db250ZXh0RGlhbG9ncyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgYWN0aXZhdGU6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNlc3Npb25Db250ZXh0RGlhbG9ncztcbiAgICB9XG59O1xuLyoqXG4gKiBVdGlsaXR5IGNvbW1hbmRzXG4gKi9cbmNvbnN0IHV0aWxpdHlDb21tYW5kcyA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2FwcHV0aWxzLWV4dGVuc2lvbjp1dGlsaXR5Q29tbWFuZHMnLFxuICAgIHJlcXVpcmVzOiBbSVRyYW5zbGF0b3JdLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBhY3RpdmF0ZTogKGFwcCwgdHJhbnNsYXRvcikgPT4ge1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCB7IGNvbW1hbmRzIH0gPSBhcHA7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5ydW5GaXJzdEVuYWJsZWQsIHtcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnUnVuIEZpcnN0IEVuYWJsZWQgQ29tbWFuZCcpLFxuICAgICAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWFuZHMgPSBhcmdzLmNvbW1hbmRzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRBcmdzID0gYXJncy5hcmdzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ0xpc3QgPSBBcnJheS5pc0FycmF5KGFyZ3MpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tbWFuZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY21kID0gY29tbWFuZHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyZyA9IGFyZ0xpc3QgPyBjb21tYW5kQXJnc1tpXSA6IGNvbW1hbmRBcmdzO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXBwLmNvbW1hbmRzLmlzRW5hYmxlZChjbWQsIGFyZykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcHAuY29tbWFuZHMuZXhlY3V0ZShjbWQsIGFyZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucnVuQWxsRW5hYmxlZCwge1xuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSdW4gQWxsIEVuYWJsZWQgQ29tbWFuZHMgUGFzc2VkIGFzIEFyZ3MnKSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFzeW5jIChhcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWFuZHMgPSBhcmdzLmNvbW1hbmRzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRBcmdzID0gYXJncy5hcmdzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ0xpc3QgPSBBcnJheS5pc0FycmF5KGFyZ3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9ySWZOb3RFbmFibGVkID0gYXJncy5lcnJvcklmTm90RW5hYmxlZDtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNtZCA9IGNvbW1hbmRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmcgPSBhcmdMaXN0ID8gY29tbWFuZEFyZ3NbaV0gOiBjb21tYW5kQXJncztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFwcC5jb21tYW5kcy5pc0VuYWJsZWQoY21kLCBhcmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBhcHAuY29tbWFuZHMuZXhlY3V0ZShjbWQsIGFyZyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JJZk5vdEVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke2NtZH0gaXMgbm90IGVuYWJsZWQuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vKipcbiAqIFRoZSBkZWZhdWx0IEhUTUwgc2FuaXRpemVyLlxuICovXG5jb25zdCBzYW5pdGl6ZXIgPSB7XG4gICAgaWQ6ICdAanVweXRlci9hcHB1dGlscy1leHRlbnNpb246c2FuaXRpemVyJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcHJvdmlkZXM6IElTYW5pdGl6ZXIsXG4gICAgYWN0aXZhdGU6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRTYW5pdGl6ZXI7XG4gICAgfVxufTtcbi8qKlxuICogRXhwb3J0IHRoZSBwbHVnaW5zIGFzIGRlZmF1bHQuXG4gKi9cbmNvbnN0IHBsdWdpbnMgPSBbXG4gICAgcGFsZXR0ZSxcbiAgICBwYWxldHRlUmVzdG9yZXIsXG4gICAgcHJpbnQsXG4gICAgcmVzb2x2ZXIsXG4gICAgc2FuaXRpemVyLFxuICAgIHNldHRpbmdzUGx1Z2luLFxuICAgIHN0YXRlLFxuICAgIHNwbGFzaCxcbiAgICBzZXNzaW9uRGlhbG9ncyxcbiAgICB0aGVtZXNQbHVnaW4sXG4gICAgdGhlbWVzUGFsZXR0ZU1lbnVQbHVnaW4sXG4gICAgdG9nZ2xlSGVhZGVyLFxuICAgIHRvb2xiYXJSZWdpc3RyeSxcbiAgICB1dGlsaXR5Q29tbWFuZHMsXG4gICAgd29ya3NwYWNlc1BsdWdpblxuXTtcbmV4cG9ydCBkZWZhdWx0IHBsdWdpbnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IE1vZGFsQ29tbWFuZFBhbGV0dGUgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IENvbW1hbmRQYWxldHRlU3ZnLCBwYWxldHRlSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgZmluZCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IENvbW1hbmRSZWdpc3RyeSB9IGZyb20gJ0BsdW1pbm8vY29tbWFuZHMnO1xuaW1wb3J0IHsgRGlzcG9zYWJsZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9kaXNwb3NhYmxlJztcbmltcG9ydCB7IENvbW1hbmRQYWxldHRlIH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbi8qKlxuICogVGhlIGNvbW1hbmQgSURzIHVzZWQgYnkgdGhlIGFwcHV0aWxzIGV4dGVuc2lvbi5cbiAqL1xudmFyIENvbW1hbmRJRHM7XG4oZnVuY3Rpb24gKENvbW1hbmRJRHMpIHtcbiAgICBDb21tYW5kSURzLmFjdGl2YXRlID0gJ2FwcHV0aWxzOmFjdGl2YXRlLWNvbW1hbmQtcGFsZXR0ZSc7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbmNvbnN0IFBBTEVUVEVfUExVR0lOX0lEID0gJ0BqdXB5dGVybGFiL2FwcHV0aWxzLWV4dGVuc2lvbjpwYWxldHRlJztcbi8qKlxuICogQSB0aGluIHdyYXBwZXIgYXJvdW5kIHRoZSBgQ29tbWFuZFBhbGV0dGVgIGNsYXNzIHRvIGNvbmZvcm0gd2l0aCB0aGVcbiAqIEp1cHl0ZXJMYWIgaW50ZXJmYWNlIGZvciB0aGUgYXBwbGljYXRpb24td2lkZSBjb21tYW5kIHBhbGV0dGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBQYWxldHRlIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBwYWxldHRlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhbGV0dGUsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICB0aGlzLl9wYWxldHRlID0gcGFsZXR0ZTtcbiAgICAgICAgdGhpcy5fcGFsZXR0ZS50aXRsZS5sYWJlbCA9ICcnO1xuICAgICAgICB0aGlzLl9wYWxldHRlLnRpdGxlLmNhcHRpb24gPSB0cmFucy5fXygnQ29tbWFuZCBQYWxldHRlJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBwbGFjZWhvbGRlciB0ZXh0IG9mIHRoZSBjb21tYW5kIHBhbGV0dGUncyBzZWFyY2ggaW5wdXQuXG4gICAgICovXG4gICAgc2V0IHBsYWNlaG9sZGVyKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgIHRoaXMuX3BhbGV0dGUuaW5wdXROb2RlLnBsYWNlaG9sZGVyID0gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIGdldCBwbGFjZWhvbGRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhbGV0dGUuaW5wdXROb2RlLnBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZSB0aGUgY29tbWFuZCBwYWxldHRlIGZvciB1c2VyIGlucHV0LlxuICAgICAqL1xuICAgIGFjdGl2YXRlKCkge1xuICAgICAgICB0aGlzLl9wYWxldHRlLmFjdGl2YXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIGNvbW1hbmQgaXRlbSB0byB0aGUgY29tbWFuZCBwYWxldHRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGhlIGNvbW1hbmQgaXRlbS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgZGlzcG9zYWJsZSB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBpdGVtIGZyb20gdGhlIHBhbGV0dGUuXG4gICAgICovXG4gICAgYWRkSXRlbShvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9wYWxldHRlLmFkZEl0ZW0ob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZURlbGVnYXRlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3BhbGV0dGUucmVtb3ZlSXRlbShpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgYFBhbGV0dGVgIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoUGFsZXR0ZSkge1xuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIHRoZSBjb21tYW5kIHBhbGV0dGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWN0aXZhdGUoYXBwLCB0cmFuc2xhdG9yLCBzZXR0aW5nUmVnaXN0cnkpIHtcbiAgICAgICAgY29uc3QgeyBjb21tYW5kcywgc2hlbGwgfSA9IGFwcDtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgcGFsZXR0ZSA9IFByaXZhdGUuY3JlYXRlUGFsZXR0ZShhcHAsIHRyYW5zbGF0b3IpO1xuICAgICAgICBjb25zdCBtb2RhbFBhbGV0dGUgPSBuZXcgTW9kYWxDb21tYW5kUGFsZXR0ZSh7IGNvbW1hbmRQYWxldHRlOiBwYWxldHRlIH0pO1xuICAgICAgICBsZXQgbW9kYWwgPSBmYWxzZTtcbiAgICAgICAgcGFsZXR0ZS5ub2RlLnNldEF0dHJpYnV0ZSgncm9sZScsICdyZWdpb24nKTtcbiAgICAgICAgcGFsZXR0ZS5ub2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHRyYW5zLl9fKCdDb21tYW5kIFBhbGV0dGUgU2VjdGlvbicpKTtcbiAgICAgICAgc2hlbGwuYWRkKHBhbGV0dGUsICdsZWZ0JywgeyByYW5rOiAzMDAgfSk7XG4gICAgICAgIGlmIChzZXR0aW5nUmVnaXN0cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvYWRTZXR0aW5ncyA9IHNldHRpbmdSZWdpc3RyeS5sb2FkKFBBTEVUVEVfUExVR0lOX0lEKTtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZVNldHRpbmdzID0gKHNldHRpbmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TW9kYWwgPSBzZXR0aW5ncy5nZXQoJ21vZGFsJykuY29tcG9zaXRlO1xuICAgICAgICAgICAgICAgIGlmIChtb2RhbCAmJiAhbmV3TW9kYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFsZXR0ZS5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhbGV0dGUuZGV0YWNoKCk7XG4gICAgICAgICAgICAgICAgICAgIHNoZWxsLmFkZChwYWxldHRlLCAnbGVmdCcsIHsgcmFuazogMzAwIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghbW9kYWwgJiYgbmV3TW9kYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFsZXR0ZS5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhbGV0dGUucGFsZXR0ZSA9IHBhbGV0dGU7XG4gICAgICAgICAgICAgICAgICAgIHBhbGV0dGUuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhbGV0dGUuYXR0YWNoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vZGFsID0gbmV3TW9kYWw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgUHJvbWlzZS5hbGwoW2xvYWRTZXR0aW5ncywgYXBwLnJlc3RvcmVkXSlcbiAgICAgICAgICAgICAgICAudGhlbigoW3NldHRpbmdzXSkgPT4ge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVNldHRpbmdzKHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5jaGFuZ2VkLmNvbm5lY3Qoc2V0dGluZ3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihyZWFzb24ubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaG93IHRoZSBjdXJyZW50IHBhbGV0dGUgc2hvcnRjdXQgaW4gaXRzIHRpdGxlLlxuICAgICAgICBjb25zdCB1cGRhdGVQYWxldHRlVGl0bGUgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBiaW5kaW5nID0gZmluZChhcHAuY29tbWFuZHMua2V5QmluZGluZ3MsIGIgPT4gYi5jb21tYW5kID09PSBDb21tYW5kSURzLmFjdGl2YXRlKTtcbiAgICAgICAgICAgIGlmIChiaW5kaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga3MgPSBDb21tYW5kUmVnaXN0cnkuZm9ybWF0S2V5c3Ryb2tlKGJpbmRpbmcua2V5cy5qb2luKCcgJykpO1xuICAgICAgICAgICAgICAgIHBhbGV0dGUudGl0bGUuY2FwdGlvbiA9IHRyYW5zLl9fKCdDb21tYW5kcyAoJTEpJywga3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFsZXR0ZS50aXRsZS5jYXB0aW9uID0gdHJhbnMuX18oJ0NvbW1hbmRzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHVwZGF0ZVBhbGV0dGVUaXRsZSgpO1xuICAgICAgICBhcHAuY29tbWFuZHMua2V5QmluZGluZ0NoYW5nZWQuY29ubmVjdCgoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVQYWxldHRlVGl0bGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5hY3RpdmF0ZSwge1xuICAgICAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChtb2RhbCkge1xuICAgICAgICAgICAgICAgICAgICBtb2RhbFBhbGV0dGUuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNoZWxsLmFjdGl2YXRlQnlJZChwYWxldHRlLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdBY3RpdmF0ZSBDb21tYW5kIFBhbGV0dGUnKVxuICAgICAgICB9KTtcbiAgICAgICAgcGFsZXR0ZS5pbnB1dE5vZGUucGxhY2Vob2xkZXIgPSB0cmFucy5fXygnU0VBUkNIJyk7XG4gICAgICAgIHJldHVybiBuZXcgUGFsZXR0ZShwYWxldHRlLCB0cmFuc2xhdG9yKTtcbiAgICB9XG4gICAgUGFsZXR0ZS5hY3RpdmF0ZSA9IGFjdGl2YXRlO1xuICAgIC8qKlxuICAgICAqIFJlc3RvcmUgdGhlIGNvbW1hbmQgcGFsZXR0ZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXN0b3JlKGFwcCwgcmVzdG9yZXIsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgY29uc3QgcGFsZXR0ZSA9IFByaXZhdGUuY3JlYXRlUGFsZXR0ZShhcHAsIHRyYW5zbGF0b3IpO1xuICAgICAgICAvLyBMZXQgdGhlIGFwcGxpY2F0aW9uIHJlc3RvcmVyIHRyYWNrIHRoZSBjb21tYW5kIHBhbGV0dGUgZm9yIHJlc3RvcmF0aW9uIG9mXG4gICAgICAgIC8vIGFwcGxpY2F0aW9uIHN0YXRlIChlLmcuIHNldHRpbmcgdGhlIGNvbW1hbmQgcGFsZXR0ZSBhcyB0aGUgY3VycmVudCBzaWRlIGJhclxuICAgICAgICAvLyB3aWRnZXQpLlxuICAgICAgICByZXN0b3Jlci5hZGQocGFsZXR0ZSwgJ2NvbW1hbmQtcGFsZXR0ZScpO1xuICAgIH1cbiAgICBQYWxldHRlLnJlc3RvcmUgPSByZXN0b3JlO1xufSkoUGFsZXR0ZSB8fCAoUGFsZXR0ZSA9IHt9KSk7XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIG1vZHVsZSBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogVGhlIHByaXZhdGUgY29tbWFuZCBwYWxldHRlIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGxldCBwYWxldHRlO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgYXBwbGljYXRpb24td2lkZSBjb21tYW5kIHBhbGV0dGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlUGFsZXR0ZShhcHAsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgaWYgKCFwYWxldHRlKSB7XG4gICAgICAgICAgICAvLyB1c2UgYSByZW5kZXJlciB0d2Vha2VkIHRvIHVzZSBpbmxpbmUgc3ZnIGljb25zXG4gICAgICAgICAgICBwYWxldHRlID0gbmV3IENvbW1hbmRQYWxldHRlKHtcbiAgICAgICAgICAgICAgICBjb21tYW5kczogYXBwLmNvbW1hbmRzLFxuICAgICAgICAgICAgICAgIHJlbmRlcmVyOiBDb21tYW5kUGFsZXR0ZVN2Zy5kZWZhdWx0UmVuZGVyZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGFsZXR0ZS5pZCA9ICdjb21tYW5kLXBhbGV0dGUnO1xuICAgICAgICAgICAgcGFsZXR0ZS50aXRsZS5pY29uID0gcGFsZXR0ZUljb247XG4gICAgICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAgICAgcGFsZXR0ZS50aXRsZS5sYWJlbCA9IHRyYW5zLl9fKCdDb21tYW5kcycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYWxldHRlO1xuICAgIH1cbiAgICBQcml2YXRlLmNyZWF0ZVBhbGV0dGUgPSBjcmVhdGVQYWxldHRlO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYWxldHRlLmpzLm1hcCIsImltcG9ydCB7IFBhZ2VDb25maWcgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgRGF0YUNvbm5lY3RvciB9IGZyb20gJ0BqdXB5dGVybGFiL3N0YXRlZGInO1xuaW1wb3J0IHsgVGhyb3R0bGVyIH0gZnJvbSAnQGx1bWluby9wb2xsaW5nJztcbi8qKlxuICogQSBkYXRhIGNvbm5lY3RvciBmb3IgZmV0Y2hpbmcgc2V0dGluZ3MuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVGhpcyBjb25uZWN0b3IgYWRkcyBhIHF1ZXJ5IHBhcmFtZXRlciB0byB0aGUgYmFzZSBzZXJ2aWNlcyBzZXR0aW5nIG1hbmFnZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5nQ29ubmVjdG9yIGV4dGVuZHMgRGF0YUNvbm5lY3RvciB7XG4gICAgY29uc3RydWN0b3IoY29ubmVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3Rocm90dGxlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9jb25uZWN0b3IgPSBjb25uZWN0b3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZldGNoIHNldHRpbmdzIGZvciBhIHBsdWdpbi5cbiAgICAgKiBAcGFyYW0gaWQgLSBUaGUgcGx1Z2luIElEXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIFJFU1QgQVBJIHJlcXVlc3RzIGFyZSB0aHJvdHRsZWQgYXQgb25lIHJlcXVlc3QgcGVyIHBsdWdpbiBwZXIgMTAwbXMuXG4gICAgICovXG4gICAgZmV0Y2goaWQpIHtcbiAgICAgICAgY29uc3QgdGhyb3R0bGVycyA9IHRoaXMuX3Rocm90dGxlcnM7XG4gICAgICAgIGlmICghKGlkIGluIHRocm90dGxlcnMpKSB7XG4gICAgICAgICAgICB0aHJvdHRsZXJzW2lkXSA9IG5ldyBUaHJvdHRsZXIoKCkgPT4gdGhpcy5fY29ubmVjdG9yLmZldGNoKGlkKSwgMTAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhyb3R0bGVyc1tpZF0uaW52b2tlKCk7XG4gICAgfVxuICAgIGFzeW5jIGxpc3QocXVlcnkgPSAnYWxsJykge1xuICAgICAgICBjb25zdCB7IGlzRGVmZXJyZWQsIGlzRGlzYWJsZWQgfSA9IFBhZ2VDb25maWcuRXh0ZW5zaW9uO1xuICAgICAgICBjb25zdCB7IGlkcywgdmFsdWVzIH0gPSBhd2FpdCB0aGlzLl9jb25uZWN0b3IubGlzdCgpO1xuICAgICAgICBpZiAocXVlcnkgPT09ICdhbGwnKSB7XG4gICAgICAgICAgICByZXR1cm4geyBpZHMsIHZhbHVlcyB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZHM6IGlkcy5maWx0ZXIoaWQgPT4gIWlzRGVmZXJyZWQoaWQpICYmICFpc0Rpc2FibGVkKGlkKSksXG4gICAgICAgICAgICB2YWx1ZXM6IHZhbHVlcy5maWx0ZXIoKHsgaWQgfSkgPT4gIWlzRGVmZXJyZWQoaWQpICYmICFpc0Rpc2FibGVkKGlkKSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXN5bmMgc2F2ZShpZCwgcmF3KSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX2Nvbm5lY3Rvci5zYXZlKGlkLCByYXcpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNldHRpbmdjb25uZWN0b3IuanMubWFwIiwiLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG58IERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5pbXBvcnQgeyBQYWdlQ29uZmlnIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IElTZXR0aW5nUmVnaXN0cnksIFNldHRpbmdSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3NldHRpbmdyZWdpc3RyeSc7XG5pbXBvcnQgeyBTZXR0aW5nQ29ubmVjdG9yIH0gZnJvbSAnLi9zZXR0aW5nY29ubmVjdG9yJztcbi8qKlxuICogVGhlIGRlZmF1bHQgc2V0dGluZyByZWdpc3RyeSBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IHNldHRpbmdzUGx1Z2luID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMtZXh0ZW5zaW9uOnNldHRpbmdzJyxcbiAgICBhY3RpdmF0ZTogYXN5bmMgKGFwcCkgPT4ge1xuICAgICAgICBjb25zdCB7IGlzRGlzYWJsZWQgfSA9IFBhZ2VDb25maWcuRXh0ZW5zaW9uO1xuICAgICAgICBjb25zdCBjb25uZWN0b3IgPSBuZXcgU2V0dGluZ0Nvbm5lY3RvcihhcHAuc2VydmljZU1hbmFnZXIuc2V0dGluZ3MpO1xuICAgICAgICBjb25zdCByZWdpc3RyeSA9IG5ldyBTZXR0aW5nUmVnaXN0cnkoe1xuICAgICAgICAgICAgY29ubmVjdG9yLFxuICAgICAgICAgICAgcGx1Z2luczogKGF3YWl0IGNvbm5lY3Rvci5saXN0KCdhY3RpdmUnKSkudmFsdWVzXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgcGx1Z2lucyB0aGF0IGhhdmUgc2NoZW1hcyB0aGF0IGFyZSBub3QgaW4gdGhlIHNldHRpbmdcbiAgICAgICAgLy8gcmVnaXN0cnkgYWZ0ZXIgdGhlIGFwcGxpY2F0aW9uIGhhcyByZXN0b3JlZCwgdHJ5IHRvIGxvYWQgdGhlbSBtYW51YWxseVxuICAgICAgICAvLyBiZWNhdXNlIG90aGVyd2lzZSwgaXRzIHNldHRpbmdzIHdpbGwgbmV2ZXIgYmVjb21lIGF2YWlsYWJsZSBpbiB0aGVcbiAgICAgICAgLy8gc2V0dGluZyByZWdpc3RyeS5cbiAgICAgICAgdm9pZCBhcHAucmVzdG9yZWQudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwbHVnaW5zID0gYXdhaXQgY29ubmVjdG9yLmxpc3QoJ2FsbCcpO1xuICAgICAgICAgICAgcGx1Z2lucy5pZHMuZm9yRWFjaChhc3luYyAoaWQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRGlzYWJsZWQoaWQpIHx8IGlkIGluIHJlZ2lzdHJ5LnBsdWdpbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCByZWdpc3RyeS5sb2FkKGlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgU2V0dGluZ3MgZmFpbGVkIHRvIGxvYWQgZm9yICgke2lkfSlgLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbHVnaW5zLnZhbHVlc1tpbmRleF0uc2NoZW1hWydqdXB5dGVyLmxhYi50cmFuc2Zvcm0nXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBUaGlzIG1heSBoYXBwZW4gaWYge2F1dG9TdGFydDogZmFsc2V9IGluICgke2lkfSkgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYG9yIGlmIGl0IGlzIG9uZSBvZiB0aGUgZGVmZXJyZWRFeHRlbnNpb25zIGluIHBhZ2UgY29uZmlnLmApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVnaXN0cnk7XG4gICAgfSxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcHJvdmlkZXM6IElTZXR0aW5nUmVnaXN0cnlcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zZXR0aW5nc3BsdWdpbi5qcy5tYXAiLCIvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbnwgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbmltcG9ydCB7IEp1cHl0ZXJGcm9udEVuZCB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IElDb21tYW5kUGFsZXR0ZSwgSVNwbGFzaFNjcmVlbiwgSVRoZW1lTWFuYWdlciwgVGhlbWVNYW5hZ2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgUGFnZUNvbmZpZywgVVJMRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IElNYWluTWVudSB9IGZyb20gJ0BqdXB5dGVybGFiL21haW5tZW51JztcbmltcG9ydCB7IElTZXR0aW5nUmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9zZXR0aW5ncmVnaXN0cnknO1xuaW1wb3J0IHsgSVRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG52YXIgQ29tbWFuZElEcztcbihmdW5jdGlvbiAoQ29tbWFuZElEcykge1xuICAgIENvbW1hbmRJRHMuY2hhbmdlVGhlbWUgPSAnYXBwdXRpbHM6Y2hhbmdlLXRoZW1lJztcbiAgICBDb21tYW5kSURzLnRoZW1lU2Nyb2xsYmFycyA9ICdhcHB1dGlsczp0aGVtZS1zY3JvbGxiYXJzJztcbiAgICBDb21tYW5kSURzLmNoYW5nZUZvbnQgPSAnYXBwdXRpbHM6Y2hhbmdlLWZvbnQnO1xuICAgIENvbW1hbmRJRHMuaW5jckZvbnRTaXplID0gJ2FwcHV0aWxzOmluY3ItZm9udC1zaXplJztcbiAgICBDb21tYW5kSURzLmRlY3JGb250U2l6ZSA9ICdhcHB1dGlsczpkZWNyLWZvbnQtc2l6ZSc7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbi8qKlxuICogVGhlIGRlZmF1bHQgdGhlbWUgbWFuYWdlciBwcm92aWRlci5cbiAqL1xuZXhwb3J0IGNvbnN0IHRoZW1lc1BsdWdpbiA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2FwcHV0aWxzLWV4dGVuc2lvbjp0aGVtZXMnLFxuICAgIHJlcXVpcmVzOiBbSVNldHRpbmdSZWdpc3RyeSwgSnVweXRlckZyb250RW5kLklQYXRocywgSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSVNwbGFzaFNjcmVlbl0sXG4gICAgYWN0aXZhdGU6IChhcHAsIHNldHRpbmdzLCBwYXRocywgdHJhbnNsYXRvciwgc3BsYXNoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IGhvc3QgPSBhcHAuc2hlbGw7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRzID0gYXBwLmNvbW1hbmRzO1xuICAgICAgICBjb25zdCB1cmwgPSBVUkxFeHQuam9pbihQYWdlQ29uZmlnLmdldEJhc2VVcmwoKSwgcGF0aHMudXJscy50aGVtZXMpO1xuICAgICAgICBjb25zdCBrZXkgPSB0aGVtZXNQbHVnaW4uaWQ7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSBuZXcgVGhlbWVNYW5hZ2VyKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGhvc3QsXG4gICAgICAgICAgICBzZXR0aW5ncyxcbiAgICAgICAgICAgIHNwbGFzaDogc3BsYXNoICE9PSBudWxsICYmIHNwbGFzaCAhPT0gdm9pZCAwID8gc3BsYXNoIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdXJsXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBLZWVwIGEgc3luY2hyb25vdXNseSBzZXQgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHRoZW1lLFxuICAgICAgICAvLyBzaW5jZSB0aGUgYXN5bmNocm9ub3VzIHNldHRpbmcgb2YgdGhlIHRoZW1lIGluIGBjaGFuZ2VUaGVtZWBcbiAgICAgICAgLy8gY2FuIGxlYWQgdG8gYW4gaW5jb3JyZWN0IHRvZ2dsZSBvbiB0aGUgY3VycmVudGx5IHVzZWQgdGhlbWUuXG4gICAgICAgIGxldCBjdXJyZW50VGhlbWU7XG4gICAgICAgIG1hbmFnZXIudGhlbWVDaGFuZ2VkLmNvbm5lY3QoKHNlbmRlciwgYXJncykgPT4ge1xuICAgICAgICAgICAgLy8gU2V0IGRhdGEgYXR0cmlidXRlcyBvbiB0aGUgYXBwbGljYXRpb24gc2hlbGwgZm9yIHRoZSBjdXJyZW50IHRoZW1lLlxuICAgICAgICAgICAgY3VycmVudFRoZW1lID0gYXJncy5uZXdWYWx1ZTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuZGF0YXNldC5qcFRoZW1lTGlnaHQgPSBTdHJpbmcobWFuYWdlci5pc0xpZ2h0KGN1cnJlbnRUaGVtZSkpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5kYXRhc2V0LmpwVGhlbWVOYW1lID0gY3VycmVudFRoZW1lO1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkuZGF0YXNldC5qcFRoZW1lU2Nyb2xsYmFycyAhPT1cbiAgICAgICAgICAgICAgICBTdHJpbmcobWFuYWdlci50aGVtZVNjcm9sbGJhcnMoY3VycmVudFRoZW1lKSkpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmRhdGFzZXQuanBUaGVtZVNjcm9sbGJhcnMgPSBTdHJpbmcobWFuYWdlci50aGVtZVNjcm9sbGJhcnMoY3VycmVudFRoZW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb21tYW5kcy5ub3RpZnlDb21tYW5kQ2hhbmdlZChDb21tYW5kSURzLmNoYW5nZVRoZW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jaGFuZ2VUaGVtZSwge1xuICAgICAgICAgICAgbGFiZWw6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRoZW1lID0gYXJnc1sndGhlbWUnXTtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IG1hbmFnZXIuZ2V0RGlzcGxheU5hbWUodGhlbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcmdzWydpc1BhbGV0dGUnXVxuICAgICAgICAgICAgICAgICAgICA/IHRyYW5zLl9fKCdVc2UgVGhlbWU6ICUxJywgZGlzcGxheU5hbWUpXG4gICAgICAgICAgICAgICAgICAgIDogZGlzcGxheU5hbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXNUb2dnbGVkOiBhcmdzID0+IGFyZ3NbJ3RoZW1lJ10gPT09IGN1cnJlbnRUaGVtZSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRoZW1lID0gYXJnc1sndGhlbWUnXTtcbiAgICAgICAgICAgICAgICBpZiAodGhlbWUgPT09IG1hbmFnZXIudGhlbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbWFuYWdlci5zZXRUaGVtZSh0aGVtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMudGhlbWVTY3JvbGxiYXJzLCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1RoZW1lIFNjcm9sbGJhcnMnKSxcbiAgICAgICAgICAgIGlzVG9nZ2xlZDogKCkgPT4gbWFuYWdlci5pc1RvZ2dsZWRUaGVtZVNjcm9sbGJhcnMoKSxcbiAgICAgICAgICAgIGV4ZWN1dGU6ICgpID0+IG1hbmFnZXIudG9nZ2xlVGhlbWVTY3JvbGxiYXJzKClcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5jaGFuZ2VGb250LCB7XG4gICAgICAgICAgICBsYWJlbDogYXJncyA9PiBhcmdzWydlbmFibGVkJ10gPyBgJHthcmdzWydmb250J119YCA6IHRyYW5zLl9fKCd3YWl0aW5nIGZvciBmb250cycpLFxuICAgICAgICAgICAgaXNFbmFibGVkOiBhcmdzID0+IGFyZ3NbJ2VuYWJsZWQnXSxcbiAgICAgICAgICAgIGlzVG9nZ2xlZDogYXJncyA9PiBtYW5hZ2VyLmdldENTUyhhcmdzWydrZXknXSkgPT09IGFyZ3NbJ2ZvbnQnXSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFyZ3MgPT4gbWFuYWdlci5zZXRDU1NPdmVycmlkZShhcmdzWydrZXknXSwgYXJnc1snZm9udCddKVxuICAgICAgICB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmluY3JGb250U2l6ZSwge1xuICAgICAgICAgICAgbGFiZWw6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXJncy5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29kZS1mb250LXNpemUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zLl9fKCdJbmNyZWFzZSBDb2RlIEZvbnQgU2l6ZScpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50LWZvbnQtc2l6ZTEnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zLl9fKCdJbmNyZWFzZSBDb250ZW50IEZvbnQgU2l6ZScpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd1aS1mb250LXNpemUxJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmFucy5fXygnSW5jcmVhc2UgVUkgRm9udCBTaXplJyk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnMuX18oJ0luY3JlYXNlIEZvbnQgU2l6ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleGVjdXRlOiBhcmdzID0+IG1hbmFnZXIuaW5jckZvbnRTaXplKGFyZ3NbJ2tleSddKVxuICAgICAgICB9KTtcbiAgICAgICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmRlY3JGb250U2l6ZSwge1xuICAgICAgICAgICAgbGFiZWw6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXJncy5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29kZS1mb250LXNpemUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zLl9fKCdEZWNyZWFzZSBDb2RlIEZvbnQgU2l6ZScpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50LWZvbnQtc2l6ZTEnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zLl9fKCdEZWNyZWFzZSBDb250ZW50IEZvbnQgU2l6ZScpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd1aS1mb250LXNpemUxJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cmFucy5fXygnRGVjcmVhc2UgVUkgRm9udCBTaXplJyk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnMuX18oJ0RlY3JlYXNlIEZvbnQgU2l6ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBleGVjdXRlOiBhcmdzID0+IG1hbmFnZXIuZGVjckZvbnRTaXplKGFyZ3NbJ2tleSddKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XG4gICAgfSxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcHJvdmlkZXM6IElUaGVtZU1hbmFnZXJcbn07XG4vKipcbiAqIFRoZSBkZWZhdWx0IHRoZW1lIG1hbmFnZXIncyBVSSBjb21tYW5kIHBhbGV0dGUgYW5kIG1haW4gbWVudSBmdW5jdGlvbmFsaXR5LlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFRoaXMgcGx1Z2luIGxvYWRzIHNlcGFyYXRlbHkgZnJvbSB0aGUgdGhlbWUgbWFuYWdlciBwbHVnaW4gaW4gb3JkZXIgdG9cbiAqIHByZXZlbnQgYmxvY2tpbmcgb2YgdGhlIHRoZW1lIG1hbmFnZXIgd2hpbGUgaXQgd2FpdHMgZm9yIHRoZSBjb21tYW5kIHBhbGV0dGVcbiAqIGFuZCBtYWluIG1lbnUgdG8gYmVjb21lIGF2YWlsYWJsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHRoZW1lc1BhbGV0dGVNZW51UGx1Z2luID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMtZXh0ZW5zaW9uOnRoZW1lcy1wYWxldHRlLW1lbnUnLFxuICAgIHJlcXVpcmVzOiBbSVRoZW1lTWFuYWdlciwgSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSUNvbW1hbmRQYWxldHRlLCBJTWFpbk1lbnVdLFxuICAgIGFjdGl2YXRlOiAoYXBwLCBtYW5hZ2VyLCB0cmFuc2xhdG9yLCBwYWxldHRlLCBtYWluTWVudSkgPT4ge1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgbWFpbiBtZW51LCBhZGQgdGhlIHRoZW1lIG1hbmFnZXIgdG8gdGhlIHNldHRpbmdzIG1lbnUuXG4gICAgICAgIGlmIChtYWluTWVudSkge1xuICAgICAgICAgICAgdm9pZCBhcHAucmVzdG9yZWQudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzUGFsZXR0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRoZW1lTWVudSA9IChfYSA9IG1haW5NZW51LnNldHRpbmdzTWVudS5pdGVtcy5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGUgPT09ICdzdWJtZW51JyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKChfYSA9IGl0ZW0uc3VibWVudSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkKSA9PT0gJ2pwLW1haW5tZW51LXNldHRpbmdzLWFwcHV0aWxzdGhlbWUnO1xuICAgICAgICAgICAgICAgIH0pKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3VibWVudTtcbiAgICAgICAgICAgICAgICAvLyBjaG9vc2UgYSB0aGVtZVxuICAgICAgICAgICAgICAgIGlmICh0aGVtZU1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFuYWdlci50aGVtZXMuZm9yRWFjaCgodGhlbWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVtZU1lbnUuaW5zZXJ0SXRlbShpbmRleCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuY2hhbmdlVGhlbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogeyBpc1BhbGV0dGUsIHRoZW1lIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgY29tbWFuZCBwYWxldHRlLCBhZGQgdGhlbWUgc3dpdGNoaW5nIG9wdGlvbnMgdG8gaXQuXG4gICAgICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgICAgICB2b2lkIGFwcC5yZXN0b3JlZC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXRlZ29yeSA9IHRyYW5zLl9fKCdUaGVtZScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSBDb21tYW5kSURzLmNoYW5nZVRoZW1lO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzUGFsZXR0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIGEgdGhlbWVcbiAgICAgICAgICAgICAgICBtYW5hZ2VyLnRoZW1lcy5mb3JFYWNoKHRoZW1lID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZCwgYXJnczogeyBpc1BhbGV0dGUsIHRoZW1lIH0sIGNhdGVnb3J5IH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHRvZ2dsZSBzY3JvbGxiYXIgdGhlbWluZ1xuICAgICAgICAgICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7IGNvbW1hbmQ6IENvbW1hbmRJRHMudGhlbWVTY3JvbGxiYXJzLCBjYXRlZ29yeSB9KTtcbiAgICAgICAgICAgICAgICAvLyBpbmNyZWFzZS9kZWNyZWFzZSBjb2RlIGZvbnQgc2l6ZVxuICAgICAgICAgICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuaW5jckZvbnRTaXplLFxuICAgICAgICAgICAgICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdjb2RlLWZvbnQtc2l6ZSdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLmRlY3JGb250U2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnY29kZS1mb250LXNpemUnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gaW5jcmVhc2UvZGVjcmVhc2UgY29udGVudCBmb250IHNpemVcbiAgICAgICAgICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLmluY3JGb250U2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnY29udGVudC1mb250LXNpemUxJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuZGVjckZvbnRTaXplLFxuICAgICAgICAgICAgICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdjb250ZW50LWZvbnQtc2l6ZTEnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gaW5jcmVhc2UvZGVjcmVhc2UgdWkgZm9udCBzaXplXG4gICAgICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5pbmNyRm9udFNpemUsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3VpLWZvbnQtc2l6ZTEnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5kZWNyRm9udFNpemUsXG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3VpLWZvbnQtc2l6ZTEnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGhlbWVzcGx1Z2lucy5qcy5tYXAiLCJpbXBvcnQgeyBjcmVhdGVEZWZhdWx0RmFjdG9yeSwgSVRvb2xiYXJXaWRnZXRSZWdpc3RyeSwgVG9vbGJhcldpZGdldFJlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCB0b29sYmFyIHJlZ2lzdHJ5LlxuICovXG5leHBvcnQgY29uc3QgdG9vbGJhclJlZ2lzdHJ5ID0ge1xuICAgIGlkOiAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMtZXh0ZW5zaW9uOnRvb2xiYXItcmVnaXN0cnknLFxuICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICBwcm92aWRlczogSVRvb2xiYXJXaWRnZXRSZWdpc3RyeSxcbiAgICBhY3RpdmF0ZTogKGFwcCkgPT4ge1xuICAgICAgICBjb25zdCByZWdpc3RyeSA9IG5ldyBUb29sYmFyV2lkZ2V0UmVnaXN0cnkoe1xuICAgICAgICAgICAgZGVmYXVsdEZhY3Rvcnk6IGNyZWF0ZURlZmF1bHRGYWN0b3J5KGFwcC5jb21tYW5kcylcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZWdpc3RyeTtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbGJhcnJlZ2lzdHJ5cGx1Z2luLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IElSb3V0ZXIsIEp1cHl0ZXJGcm9udEVuZCB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IERpYWxvZywgSVdpbmRvd1Jlc29sdmVyLCBzaG93RGlhbG9nIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgVVJMRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IEFCQ1dpZGdldEZhY3RvcnksIERvY3VtZW50V2lkZ2V0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvZG9jcmVnaXN0cnknO1xuaW1wb3J0IHsgSUZpbGVCcm93c2VyRmFjdG9yeSB9IGZyb20gJ0BqdXB5dGVybGFiL2ZpbGVicm93c2VyJztcbmltcG9ydCB7IElTdGF0ZURCIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdGVkYic7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciwgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xudmFyIENvbW1hbmRJRHM7XG4oZnVuY3Rpb24gKENvbW1hbmRJRHMpIHtcbiAgICBDb21tYW5kSURzLnNhdmVXb3Jrc3BhY2UgPSAnd29ya3NwYWNlLXVpOnNhdmUnO1xuICAgIENvbW1hbmRJRHMuc2F2ZVdvcmtzcGFjZUFzID0gJ3dvcmtzcGFjZS11aTpzYXZlLWFzJztcbn0pKENvbW1hbmRJRHMgfHwgKENvbW1hbmRJRHMgPSB7fSkpO1xuY29uc3QgV09SS1NQQUNFX05BTUUgPSAnanVweXRlcmxhYi13b3Jrc3BhY2UnO1xuY29uc3QgV09SS1NQQUNFX0VYVCA9ICcuJyArIFdPUktTUEFDRV9OQU1FO1xuY29uc3QgTEFTVF9TQVZFX0lEID0gJ3dvcmtzcGFjZS11aTpsYXN0U2F2ZSc7XG5jb25zdCBJQ09OX05BTUUgPSAnanAtSnVweXRlckljb24nO1xuLyoqXG4gKiBUaGUgd29ya3NwYWNlIE1JTUUgcmVuZGVyZXIgYW5kIHNhdmUgcGx1Z2luLlxuICovXG5leHBvcnQgY29uc3Qgd29ya3NwYWNlc1BsdWdpbiA9IHtcbiAgICBpZDogJ0BqdXB5dGVybGFiL2FwcHV0aWxzLWV4dGVuc2lvbjp3b3Jrc3BhY2VzJyxcbiAgICBhdXRvU3RhcnQ6IHRydWUsXG4gICAgcmVxdWlyZXM6IFtcbiAgICAgICAgSUZpbGVCcm93c2VyRmFjdG9yeSxcbiAgICAgICAgSVdpbmRvd1Jlc29sdmVyLFxuICAgICAgICBJU3RhdGVEQixcbiAgICAgICAgSVRyYW5zbGF0b3IsXG4gICAgICAgIEp1cHl0ZXJGcm9udEVuZC5JUGF0aHNcbiAgICBdLFxuICAgIG9wdGlvbmFsOiBbSVJvdXRlcl0sXG4gICAgYWN0aXZhdGU6IChhcHAsIGZiZiwgcmVzb2x2ZXIsIHN0YXRlLCB0cmFuc2xhdG9yLCBwYXRocywgcm91dGVyKSA9PiB7XG4gICAgICAgIC8vIFRoZSB3b3Jrc3BhY2UgZmFjdG9yeSBjcmVhdGVzIGR1bW15IHdpZGdldHMgdG8gbG9hZCBhIG5ldyB3b3Jrc3BhY2UuXG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSBuZXcgUHJpdmF0ZS5Xb3Jrc3BhY2VGYWN0b3J5KHtcbiAgICAgICAgICAgIHdvcmtzcGFjZXM6IGFwcC5zZXJ2aWNlTWFuYWdlci53b3Jrc3BhY2VzLFxuICAgICAgICAgICAgcm91dGVyLFxuICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICB0cmFuc2xhdG9yLFxuICAgICAgICAgICAgcGF0aHNcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGFwcC5kb2NSZWdpc3RyeS5hZGRGaWxlVHlwZSh7XG4gICAgICAgICAgICBuYW1lOiBXT1JLU1BBQ0VfTkFNRSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnZmlsZScsXG4gICAgICAgICAgICBmaWxlRm9ybWF0OiAndGV4dCcsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJhbnMuX18oJ0p1cHl0ZXJMYWIgd29ya3NwYWNlIEZpbGUnKSxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IFtXT1JLU1BBQ0VfRVhUXSxcbiAgICAgICAgICAgIG1pbWVUeXBlczogWyd0ZXh0L2pzb24nXSxcbiAgICAgICAgICAgIGljb25DbGFzczogSUNPTl9OQU1FXG4gICAgICAgIH0pO1xuICAgICAgICBhcHAuZG9jUmVnaXN0cnkuYWRkV2lkZ2V0RmFjdG9yeShmYWN0b3J5KTtcbiAgICAgICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zYXZlV29ya3NwYWNlQXMsIHtcbiAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnU2F2ZSBDdXJyZW50IFdvcmtzcGFjZSBBc+KApicpLFxuICAgICAgICAgICAgZXhlY3V0ZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhcHAuc2VydmljZU1hbmFnZXIud29ya3NwYWNlcy5mZXRjaChyZXNvbHZlci5uYW1lKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBQcml2YXRlLnNhdmVBcyhmYmYuZGVmYXVsdEJyb3dzZXIsIGFwcC5zZXJ2aWNlTWFuYWdlci5jb250ZW50cywgZGF0YSwgc3RhdGUsIHRyYW5zbGF0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zYXZlV29ya3NwYWNlLCB7XG4gICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1NhdmUgQ3VycmVudCBXb3Jrc3BhY2UnKSxcbiAgICAgICAgICAgIGV4ZWN1dGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGNvbnRlbnRzIH0gPSBhcHAuc2VydmljZU1hbmFnZXI7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGFwcC5zZXJ2aWNlTWFuYWdlci53b3Jrc3BhY2VzLmZldGNoKHJlc29sdmVyLm5hbWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTYXZlID0gKGF3YWl0IHN0YXRlLmZldGNoKExBU1RfU0FWRV9JRCkpO1xuICAgICAgICAgICAgICAgIGlmIChsYXN0U2F2ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IFByaXZhdGUuc2F2ZUFzKGZiZi5kZWZhdWx0QnJvd3NlciwgY29udGVudHMsIGRhdGEsIHN0YXRlLCB0cmFuc2xhdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IFByaXZhdGUuc2F2ZShsYXN0U2F2ZSwgY29udGVudHMsIGRhdGEsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIFNhdmUgd29ya3NwYWNlIHRvIGEgdXNlciBwcm92aWRlZCBsb2NhdGlvblxuICAgICAqL1xuICAgIGFzeW5jIGZ1bmN0aW9uIHNhdmUodXNlclBhdGgsIGNvbnRlbnRzLCBkYXRhLCBzdGF0ZSkge1xuICAgICAgICBsZXQgbmFtZSA9IHVzZXJQYXRoLnNwbGl0KCcvJykucG9wKCk7XG4gICAgICAgIC8vIEFkZCBleHRlbnNpb24gaWYgbm90IHByb3ZpZGVkIG9yIHJlbW92ZSBleHRlbnNpb24gZnJvbSBuYW1lIGlmIGl0IHdhcy5cbiAgICAgICAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCAmJiBuYW1lLmluY2x1ZGVzKCcuJykpIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNwbGl0KCcuJylbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB1c2VyUGF0aCA9IHVzZXJQYXRoICsgV09SS1NQQUNFX0VYVDtcbiAgICAgICAgfVxuICAgICAgICAvLyBTYXZlIGxhc3Qgc2F2ZSBsb2NhdGlvbiwgZm9yIHNhdmUgYnV0dG9uIHRvIHdvcmtcbiAgICAgICAgYXdhaXQgc3RhdGUuc2F2ZShMQVNUX1NBVkVfSUQsIHVzZXJQYXRoKTtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWREYXRhID0gYXdhaXQgZGF0YTtcbiAgICAgICAgcmVzb2x2ZWREYXRhLm1ldGFkYXRhLmlkID0gYCR7bmFtZX1gO1xuICAgICAgICBhd2FpdCBjb250ZW50cy5zYXZlKHVzZXJQYXRoLCB7XG4gICAgICAgICAgICB0eXBlOiAnZmlsZScsXG4gICAgICAgICAgICBmb3JtYXQ6ICd0ZXh0JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IEpTT04uc3RyaW5naWZ5KHJlc29sdmVkRGF0YSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFByaXZhdGUuc2F2ZSA9IHNhdmU7XG4gICAgLyoqXG4gICAgICogQXNrIHVzZXIgZm9yIGxvY2F0aW9uLCBhbmQgc2F2ZSB3b3Jrc3BhY2UuXG4gICAgICogRGVmYXVsdCBsb2NhdGlvbiBpcyB0aGUgY3VycmVudCBkaXJlY3RvcnkgaW4gdGhlIGZpbGUgYnJvd3NlclxuICAgICAqL1xuICAgIGFzeW5jIGZ1bmN0aW9uIHNhdmVBcyhicm93c2VyLCBjb250ZW50cywgZGF0YSwgc3RhdGUsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgbGFzdFNhdmUgPSBhd2FpdCBzdGF0ZS5mZXRjaChMQVNUX1NBVkVfSUQpO1xuICAgICAgICBsZXQgZGVmYXVsdE5hbWU7XG4gICAgICAgIGlmIChsYXN0U2F2ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkZWZhdWx0TmFtZSA9ICduZXctd29ya3NwYWNlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRlZmF1bHROYW1lID0gKF9hID0gbGFzdFNhdmUuc3BsaXQoJy8nKS5wb3AoKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNwbGl0KCcuJylbMF07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVmYXVsdFBhdGggPSBicm93c2VyLm1vZGVsLnBhdGggKyAnLycgKyBkZWZhdWx0TmFtZSArIFdPUktTUEFDRV9FWFQ7XG4gICAgICAgIGNvbnN0IHVzZXJQYXRoID0gYXdhaXQgZ2V0U2F2ZVBhdGgoZGVmYXVsdFBhdGgsIHRyYW5zbGF0b3IpO1xuICAgICAgICBpZiAodXNlclBhdGgpIHtcbiAgICAgICAgICAgIGF3YWl0IHNhdmUodXNlclBhdGgsIGNvbnRlbnRzLCBkYXRhLCBzdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5zYXZlQXMgPSBzYXZlQXM7XG4gICAgLyoqXG4gICAgICogVGhpcyB3aWRnZXQgZmFjdG9yeSBpcyB1c2VkIHRvIGhhbmRsZSBkb3VibGUgY2xpY2sgb24gd29ya3NwYWNlXG4gICAgICovXG4gICAgY2xhc3MgV29ya3NwYWNlRmFjdG9yeSBleHRlbmRzIEFCQ1dpZGdldEZhY3Rvcnkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ29uc3RydWN0IGEgd2lkZ2V0IGZhY3RvcnkgdGhhdCB1cGxvYWRzIGEgd29ya3NwYWNlIGFuZCBuYXZpZ2F0ZXMgdG8gaXQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGluc3RhbnRpYXRpb24gb3B0aW9ucyBmb3IgYSBgV29ya3NwYWNlRmFjdG9yeWAuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCB0cmFucyA9IChvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3IpLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgICAgICBuYW1lOiB0cmFucy5fXygnV29ya3NwYWNlIGxvYWRlcicpLFxuICAgICAgICAgICAgICAgIGZpbGVUeXBlczogW1dPUktTUEFDRV9OQU1FXSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0Rm9yOiBbV09SS1NQQUNFX05BTUVdLFxuICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2FwcGxpY2F0aW9uID0gb3B0aW9ucy5wYXRocy51cmxzLmFwcDtcbiAgICAgICAgICAgIHRoaXMuX3JvdXRlciA9IG9wdGlvbnMucm91dGVyO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBvcHRpb25zLnN0YXRlO1xuICAgICAgICAgICAgdGhpcy5fd29ya3NwYWNlcyA9IG9wdGlvbnMud29ya3NwYWNlcztcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogTG9hZHMgdGhlIHdvcmtzcGFjZSBpbnRvIGxvYWQsIGFuZCBqdW1wIHRvIGl0XG4gICAgICAgICAqIEBwYXJhbSBjb250ZXh0IFRoaXMgaXMgdXNlZCBxdWVyaWVkIHRvIHF1ZXJ5IHRoZSB3b3Jrc3BhY2UgY29udGVudFxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlTmV3V2lkZ2V0KGNvbnRleHQpIHtcbiAgICAgICAgICAgIC8vIFNhdmUgYSBmaWxlJ3MgY29udGVudHMgYXMgYSB3b3Jrc3BhY2UgYW5kIG5hdmlnYXRlIHRvIHRoYXQgd29ya3NwYWNlLlxuICAgICAgICAgICAgdm9pZCBjb250ZXh0LnJlYWR5LnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBjb250ZXh0Lm1vZGVsO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtzcGFjZSA9IGZpbGUudG9KU09OKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IGNvbnRleHQucGF0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IHdvcmtzcGFjZS5tZXRhZGF0YS5pZDtcbiAgICAgICAgICAgICAgICAvLyBTYXZlIHRoZSBmaWxlIGNvbnRlbnRzIGFzIGEgd29ya3NwYWNlLlxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX3dvcmtzcGFjZXMuc2F2ZShpZCwgd29ya3NwYWNlKTtcbiAgICAgICAgICAgICAgICAvLyBTYXZlIGxhc3Qgc2F2ZSBsb2NhdGlvbiBmb3IgdGhlIHNhdmUgY29tbWFuZC5cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9zdGF0ZS5zYXZlKExBU1RfU0FWRV9JRCwgcGF0aCk7XG4gICAgICAgICAgICAgICAgLy8gTmF2aWdhdGUgdG8gbmV3IHdvcmtzcGFjZS5cbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBVUkxFeHQuam9pbih0aGlzLl9hcHBsaWNhdGlvbiwgJ3dvcmtzcGFjZXMnLCBpZCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JvdXRlcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb3V0ZXIubmF2aWdhdGUodXJsLCB7IGhhcmQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGR1bW15V2lkZ2V0KGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuV29ya3NwYWNlRmFjdG9yeSA9IFdvcmtzcGFjZUZhY3Rvcnk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGR1bW15IHdpZGdldCB3aXRoIGRpc3Bvc2VkIGNvbnRlbnQgdGhhdCBkb2Vzbid0IHJlbmRlciBpbiB0aGUgVUkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGV4dCAtIFRoZSBmaWxlIGNvbnRleHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZHVtbXlXaWRnZXQoY29udGV4dCkge1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBuZXcgRG9jdW1lbnRXaWRnZXQoeyBjb250ZW50OiBuZXcgV2lkZ2V0KCksIGNvbnRleHQgfSk7XG4gICAgICAgIHdpZGdldC5jb250ZW50LmRpc3Bvc2UoKTtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXNrIHVzZXIgZm9yIGEgcGF0aCB0byBzYXZlIHRvLlxuICAgICAqIEBwYXJhbSBkZWZhdWx0UGF0aCBQYXRoIGFscmVhZHkgcHJlc2VudCB3aGVuIHRoZSBkaWFsb2cgaXMgc2hvd25cbiAgICAgKi9cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRTYXZlUGF0aChkZWZhdWx0UGF0aCwgdHJhbnNsYXRvcikge1xuICAgICAgICB0cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3Qgc2F2ZUJ0biA9IERpYWxvZy5va0J1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnU2F2ZScpIH0pO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgIHRpdGxlOiB0cmFucy5fXygnU2F2ZSBDdXJyZW50IFdvcmtzcGFjZSBBc+KApicpLFxuICAgICAgICAgICAgYm9keTogbmV3IFNhdmVXaWRnZXQoZGVmYXVsdFBhdGgpLFxuICAgICAgICAgICAgYnV0dG9uczogW0RpYWxvZy5jYW5jZWxCdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ0NhbmNlbCcpIH0pLCBzYXZlQnRuXVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHJlc3VsdC5idXR0b24ubGFiZWwgPT09IHRyYW5zLl9fKCdTYXZlJykpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHdpZGdldCB0aGF0IGdldHMgYSBmaWxlIHBhdGggZnJvbSBhIHVzZXIuXG4gICAgICovXG4gICAgY2xhc3MgU2F2ZVdpZGdldCBleHRlbmRzIFdpZGdldCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXRzIGEgbW9kYWwgbm9kZSBmb3IgZ2V0dGluZyBzYXZlIGxvY2F0aW9uLiBXaWxsIGhhdmUgYSBkZWZhdWx0IHRvIHRoZSBjdXJyZW50IG9wZW5lZCBkaXJlY3RvcnlcbiAgICAgICAgICogQHBhcmFtIHBhdGggRGVmYXVsdCBsb2NhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IocGF0aCkge1xuICAgICAgICAgICAgc3VwZXIoeyBub2RlOiBjcmVhdGVTYXZlTm9kZShwYXRoKSB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0cyB0aGUgc2F2ZSBwYXRoIGVudGVyZWQgYnkgdGhlIHVzZXJcbiAgICAgICAgICovXG4gICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIG5vZGUgZm9yIGEgc2F2ZSB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlU2F2ZU5vZGUocGF0aCkge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0LnZhbHVlID0gcGF0aDtcbiAgICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d29ya3NwYWNlc3BsdWdpbi5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9