(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_terminal-extension_lib_index_js"],{

/***/ "../../packages/terminal-extension/lib/index.js":
/*!******************************************************!*\
  !*** ../../packages/terminal-extension/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "addCommands": () => (/* binding */ addCommands)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_running__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/running */ "webpack/sharing/consume/default/@jupyterlab/running/@jupyterlab/running");
/* harmony import */ var _jupyterlab_running__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_running__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_terminal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/terminal */ "webpack/sharing/consume/default/@jupyterlab/terminal/@jupyterlab/terminal");
/* harmony import */ var _jupyterlab_terminal__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_terminal__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_11__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module terminal-extension
 */












/**
 * The command IDs used by the terminal plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.createNew = 'terminal:create-new';
    CommandIDs.open = 'terminal:open';
    CommandIDs.refresh = 'terminal:refresh';
    CommandIDs.increaseFont = 'terminal:increase-font';
    CommandIDs.decreaseFont = 'terminal:decrease-font';
    CommandIDs.setTheme = 'terminal:set-theme';
})(CommandIDs || (CommandIDs = {}));
/**
 * The default terminal extension.
 */
const plugin = {
    activate,
    id: '@jupyterlab/terminal-extension:plugin',
    provides: _jupyterlab_terminal__WEBPACK_IMPORTED_MODULE_7__.ITerminalTracker,
    requires: [_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_6__.ISettingRegistry, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_8__.ITranslator],
    optional: [
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette,
        _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_2__.ILauncher,
        _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer,
        _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__.IMainMenu,
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.IThemeManager,
        _jupyterlab_running__WEBPACK_IMPORTED_MODULE_4__.IRunningSessionManagers
    ],
    autoStart: true
};
/**
 * Export the plugin as default.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);
/**
 * Activate the terminal plugin.
 */
function activate(app, settingRegistry, translator, palette, launcher, restorer, mainMenu, themeManager, runningSessionManagers) {
    const trans = translator.load('jupyterlab');
    const { serviceManager, commands } = app;
    const category = trans.__('Terminal');
    const namespace = 'terminal';
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace
    });
    // Bail if there are no terminals available.
    if (!serviceManager.terminals.isAvailable()) {
        console.warn('Disabling terminals plugin because they are not available on the server');
        return tracker;
    }
    // Handle state restoration.
    if (restorer) {
        void restorer.restore(tracker, {
            command: CommandIDs.createNew,
            args: widget => ({ name: widget.content.session.name }),
            name: widget => widget.content.session.name
        });
    }
    // The cached terminal options from the setting editor.
    const options = {};
    /**
     * Update the cached option values.
     */
    function updateOptions(settings) {
        // Update the cached options by doing a shallow copy of key/values.
        // This is needed because options is passed and used in addcommand-palette and needs
        // to reflect the current cached values.
        Object.keys(settings.composite).forEach((key) => {
            options[key] = settings.composite[key];
        });
    }
    /**
     * Update terminal
     */
    function updateTerminal(widget) {
        const terminal = widget.content;
        if (!terminal) {
            return;
        }
        Object.keys(options).forEach((key) => {
            terminal.setOption(key, options[key]);
        });
    }
    /**
     * Update the settings of the current tracker instances.
     */
    function updateTracker() {
        tracker.forEach(widget => updateTerminal(widget));
    }
    // Fetch the initial state of the settings.
    settingRegistry
        .load(plugin.id)
        .then(settings => {
        updateOptions(settings);
        updateTracker();
        settings.changed.connect(() => {
            updateOptions(settings);
            updateTracker();
        });
    })
        .catch(Private.showErrorMessage);
    // Subscribe to changes in theme. This is needed as the theme
    // is computed dynamically based on the string value and DOM
    // properties.
    themeManager === null || themeManager === void 0 ? void 0 : themeManager.themeChanged.connect((sender, args) => {
        tracker.forEach(widget => {
            const terminal = widget.content;
            if (terminal.getOption('theme') === 'inherit') {
                terminal.setOption('theme', 'inherit');
            }
        });
    });
    addCommands(app, tracker, settingRegistry, translator, options);
    if (mainMenu) {
        // Add "Terminal Theme" menu below "Theme" menu.
        const themeMenu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_11__.Menu({ commands });
        themeMenu.title.label = trans._p('menu', 'Terminal Theme');
        themeMenu.addItem({
            command: CommandIDs.setTheme,
            args: {
                theme: 'inherit',
                displayName: trans.__('Inherit'),
                isPalette: false
            }
        });
        themeMenu.addItem({
            command: CommandIDs.setTheme,
            args: {
                theme: 'light',
                displayName: trans.__('Light'),
                isPalette: false
            }
        });
        themeMenu.addItem({
            command: CommandIDs.setTheme,
            args: { theme: 'dark', displayName: trans.__('Dark'), isPalette: false }
        });
        // Add some commands to the "View" menu.
        mainMenu.settingsMenu.addGroup([
            { command: CommandIDs.increaseFont },
            { command: CommandIDs.decreaseFont },
            { type: 'submenu', submenu: themeMenu }
        ], 40);
        // Add terminal creation to the file menu.
        mainMenu.fileMenu.newMenu.addItem({
            command: CommandIDs.createNew,
            rank: 20
        });
        // Add terminal close-and-shutdown to the file menu.
        mainMenu.fileMenu.closeAndCleaners.add({
            tracker,
            closeAndCleanupLabel: (n) => trans.__('Shutdown Terminal'),
            closeAndCleanup: (current) => {
                // The widget is automatically disposed upon session shutdown.
                return current.content.session.shutdown();
            }
        });
    }
    if (palette) {
        // Add command palette items.
        [
            CommandIDs.createNew,
            CommandIDs.refresh,
            CommandIDs.increaseFont,
            CommandIDs.decreaseFont
        ].forEach(command => {
            palette.addItem({ command, category, args: { isPalette: true } });
        });
        palette.addItem({
            command: CommandIDs.setTheme,
            category,
            args: {
                theme: 'inherit',
                displayName: trans.__('Inherit'),
                isPalette: true
            }
        });
        palette.addItem({
            command: CommandIDs.setTheme,
            category,
            args: { theme: 'light', displayName: trans.__('Light'), isPalette: true }
        });
        palette.addItem({
            command: CommandIDs.setTheme,
            category,
            args: { theme: 'dark', displayName: trans.__('Dark'), isPalette: true }
        });
    }
    // Add a launcher item if the launcher is available.
    if (launcher) {
        launcher.add({
            command: CommandIDs.createNew,
            category: trans.__('Other'),
            rank: 0
        });
    }
    // Add a sessions manager if the running extension is available
    if (runningSessionManagers) {
        addRunningSessionManager(runningSessionManagers, app, translator);
    }
    return tracker;
}
/**
 * Add the running terminal manager to the running panel.
 */
function addRunningSessionManager(managers, app, translator) {
    const trans = translator.load('jupyterlab');
    const manager = app.serviceManager.terminals;
    managers.add({
        name: trans.__('Terminals'),
        running: () => (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_10__.toArray)(manager.running()).map(model => new RunningTerminal(model)),
        shutdownAll: () => manager.shutdownAll(),
        refreshRunning: () => manager.refreshRunning(),
        runningChanged: manager.runningChanged,
        shutdownLabel: trans.__('Shut Down'),
        shutdownAllLabel: trans.__('Shut Down All'),
        shutdownAllConfirmationText: trans.__('Are you sure you want to permanently shut down all running terminals?')
    });
    class RunningTerminal {
        constructor(model) {
            this._model = model;
        }
        open() {
            void app.commands.execute('terminal:open', { name: this._model.name });
        }
        icon() {
            return _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.terminalIcon;
        }
        label() {
            return `terminals/${this._model.name}`;
        }
        shutdown() {
            return manager.shutdown(this._model.name);
        }
    }
}
/**
 * Add the commands for the terminal.
 */
function addCommands(app, tracker, settingRegistry, translator, options) {
    const trans = translator.load('jupyterlab');
    const { commands, serviceManager } = app;
    // Add terminal commands.
    commands.addCommand(CommandIDs.createNew, {
        label: args => args['isPalette'] ? trans.__('New Terminal') : trans.__('Terminal'),
        caption: trans.__('Start a new terminal session'),
        icon: args => (args['isPalette'] ? undefined : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.terminalIcon),
        execute: async (args) => {
            // wait for the widget to lazy load
            let Terminal;
            try {
                Terminal = (await Private.ensureWidget()).Terminal;
            }
            catch (err) {
                Private.showErrorMessage(err);
                return;
            }
            const name = args['name'];
            const cwd = args['cwd'];
            let session;
            if (name) {
                const models = await _jupyterlab_services__WEBPACK_IMPORTED_MODULE_5__.TerminalAPI.listRunning();
                if (models.map(d => d.name).includes(name)) {
                    // we are restoring a terminal widget and the corresponding terminal exists
                    // let's connect to it
                    session = serviceManager.terminals.connectTo({ model: { name } });
                }
                else {
                    // we are restoring a terminal widget but the corresponding terminal was closed
                    // let's start a new terminal with the original name
                    session = await serviceManager.terminals.startNew({ name, cwd });
                }
            }
            else {
                // we are creating a new terminal widget with a new terminal
                // let the server choose the terminal name
                session = await serviceManager.terminals.startNew({ cwd });
            }
            const term = new Terminal(session, options, translator);
            term.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_9__.terminalIcon;
            term.title.label = '...';
            const main = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({ content: term });
            app.shell.add(main, 'main', {
                activate: args.activate !== false
            });
            void tracker.add(main);
            return main;
        }
    });
    commands.addCommand(CommandIDs.open, {
        execute: args => {
            const name = args['name'];
            // Check for a running terminal with the given name.
            const widget = tracker.find(value => {
                const content = value.content;
                return content.session.name === name || false;
            });
            if (widget) {
                if (args.activate !== false) {
                    app.shell.activateById(widget.id);
                }
            }
            else {
                // Otherwise, create a new terminal with a given name.
                return commands.execute(CommandIDs.createNew, {
                    name,
                    activate: args.activate
                });
            }
        }
    });
    commands.addCommand(CommandIDs.refresh, {
        label: trans.__('Refresh Terminal'),
        caption: trans.__('Refresh the current terminal session'),
        execute: async () => {
            const current = tracker.currentWidget;
            if (!current) {
                return;
            }
            app.shell.activateById(current.id);
            try {
                await current.content.refresh();
                if (current) {
                    current.content.activate();
                }
            }
            catch (err) {
                Private.showErrorMessage(err);
            }
        },
        isEnabled: () => tracker.currentWidget !== null
    });
    commands.addCommand(CommandIDs.increaseFont, {
        label: trans.__('Increase Terminal Font Size'),
        execute: async () => {
            const { fontSize } = options;
            if (fontSize && fontSize < 72) {
                try {
                    await settingRegistry.set(plugin.id, 'fontSize', fontSize + 1);
                }
                catch (err) {
                    Private.showErrorMessage(err);
                }
            }
        }
    });
    commands.addCommand(CommandIDs.decreaseFont, {
        label: trans.__('Decrease Terminal Font Size'),
        execute: async () => {
            const { fontSize } = options;
            if (fontSize && fontSize > 9) {
                try {
                    await settingRegistry.set(plugin.id, 'fontSize', fontSize - 1);
                }
                catch (err) {
                    Private.showErrorMessage(err);
                }
            }
        }
    });
    const themeDisplayedName = {
        inherit: trans.__('Inherit'),
        light: trans.__('Light'),
        dark: trans.__('Dark')
    };
    commands.addCommand(CommandIDs.setTheme, {
        label: args => {
            const theme = args['theme'];
            const displayName = theme in themeDisplayedName
                ? themeDisplayedName[theme]
                : trans.__(theme[0].toUpperCase() + theme.slice(1));
            return args['isPalette']
                ? trans.__('Use Terminal Theme: %1', displayName)
                : displayName;
        },
        caption: trans.__('Set the terminal theme'),
        isToggled: args => {
            const { theme } = options;
            return args['theme'] === theme;
        },
        execute: async (args) => {
            const theme = args['theme'];
            try {
                await settingRegistry.set(plugin.id, 'theme', theme);
                commands.notifyCommandChanged(CommandIDs.setTheme);
            }
            catch (err) {
                console.log(err);
                Private.showErrorMessage(err);
            }
        }
    });
}
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * Lazy-load the widget (and xterm library and addons)
     */
    function ensureWidget() {
        if (Private.widgetReady) {
            return Private.widgetReady;
        }
        Private.widgetReady = Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_xterm-addon-fit_lib_xterm-addon-fit_js-node_modules_xterm_lib_xterm_js"), __webpack_require__.e("webpack_sharing_consume_default_lumino_coreutils_lumino_coreutils"), __webpack_require__.e("webpack_sharing_consume_default_lumino_messaging_lumino_messaging"), __webpack_require__.e("webpack_sharing_consume_default_lumino_domutils_lumino_domutils"), __webpack_require__.e("packages_terminal_lib_widget_js")]).then(__webpack_require__.bind(__webpack_require__, /*! @jupyterlab/terminal/lib/widget */ "../../packages/terminal/lib/widget.js"));
        return Private.widgetReady;
    }
    Private.ensureWidget = ensureWidget;
    /**
     *  Utility function for consistent error reporting
     */
    function showErrorMessage(error) {
        console.error(`Failed to configure ${plugin.id}: ${error.message}`);
    }
    Private.showErrorMessage = showErrorMessage;
})(Private || (Private = {}));
//# sourceMappingURL=index.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvdGVybWluYWwtZXh0ZW5zaW9uL2xpYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwRDtBQUMyQztBQUNwRDtBQUNBO0FBQ2E7QUFDWDtBQUNZO0FBQ1A7QUFDRjtBQUNHO0FBQ2I7QUFDTDtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxrRUFBZ0I7QUFDOUIsZUFBZSx5RUFBZ0IsRUFBRSxnRUFBVztBQUM1QztBQUNBLFFBQVEsaUVBQWU7QUFDdkIsUUFBUSwyREFBUztBQUNqQixRQUFRLG9FQUFlO0FBQ3ZCLFFBQVEsMkRBQVM7QUFDakIsUUFBUSwrREFBYTtBQUNyQixRQUFRLHdFQUF1QjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxNQUFNLEVBQUM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsMkJBQTJCO0FBQ3RDO0FBQ0E7QUFDQSx3QkFBd0IsK0RBQWE7QUFDckM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG9DQUFvQztBQUNsRTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsbUJBQW1CLFFBQVE7QUFDM0I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixrbUJBQXlDO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFVBQVUsSUFBSSxjQUFjO0FBQ3pFO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQixpQyIsImZpbGUiOiJwYWNrYWdlc190ZXJtaW5hbC1leHRlbnNpb25fbGliX2luZGV4X2pzLjAwZTI2NTFiYjc0Nzk5NDIyNTMyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgdGVybWluYWwtZXh0ZW5zaW9uXG4gKi9cbmltcG9ydCB7IElMYXlvdXRSZXN0b3JlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IElDb21tYW5kUGFsZXR0ZSwgSVRoZW1lTWFuYWdlciwgTWFpbkFyZWFXaWRnZXQsIFdpZGdldFRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBJTGF1bmNoZXIgfSBmcm9tICdAanVweXRlcmxhYi9sYXVuY2hlcic7XG5pbXBvcnQgeyBJTWFpbk1lbnUgfSBmcm9tICdAanVweXRlcmxhYi9tYWlubWVudSc7XG5pbXBvcnQgeyBJUnVubmluZ1Nlc3Npb25NYW5hZ2VycyB9IGZyb20gJ0BqdXB5dGVybGFiL3J1bm5pbmcnO1xuaW1wb3J0IHsgVGVybWluYWxBUEkgfSBmcm9tICdAanVweXRlcmxhYi9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBJU2V0dGluZ1JlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2V0dGluZ3JlZ2lzdHJ5JztcbmltcG9ydCB7IElUZXJtaW5hbFRyYWNrZXIgfSBmcm9tICdAanVweXRlcmxhYi90ZXJtaW5hbCc7XG5pbXBvcnQgeyBJVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IHRlcm1pbmFsSWNvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3VpLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgdG9BcnJheSB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IE1lbnUgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuLyoqXG4gKiBUaGUgY29tbWFuZCBJRHMgdXNlZCBieSB0aGUgdGVybWluYWwgcGx1Z2luLlxuICovXG52YXIgQ29tbWFuZElEcztcbihmdW5jdGlvbiAoQ29tbWFuZElEcykge1xuICAgIENvbW1hbmRJRHMuY3JlYXRlTmV3ID0gJ3Rlcm1pbmFsOmNyZWF0ZS1uZXcnO1xuICAgIENvbW1hbmRJRHMub3BlbiA9ICd0ZXJtaW5hbDpvcGVuJztcbiAgICBDb21tYW5kSURzLnJlZnJlc2ggPSAndGVybWluYWw6cmVmcmVzaCc7XG4gICAgQ29tbWFuZElEcy5pbmNyZWFzZUZvbnQgPSAndGVybWluYWw6aW5jcmVhc2UtZm9udCc7XG4gICAgQ29tbWFuZElEcy5kZWNyZWFzZUZvbnQgPSAndGVybWluYWw6ZGVjcmVhc2UtZm9udCc7XG4gICAgQ29tbWFuZElEcy5zZXRUaGVtZSA9ICd0ZXJtaW5hbDpzZXQtdGhlbWUnO1xufSkoQ29tbWFuZElEcyB8fCAoQ29tbWFuZElEcyA9IHt9KSk7XG4vKipcbiAqIFRoZSBkZWZhdWx0IHRlcm1pbmFsIGV4dGVuc2lvbi5cbiAqL1xuY29uc3QgcGx1Z2luID0ge1xuICAgIGFjdGl2YXRlLFxuICAgIGlkOiAnQGp1cHl0ZXJsYWIvdGVybWluYWwtZXh0ZW5zaW9uOnBsdWdpbicsXG4gICAgcHJvdmlkZXM6IElUZXJtaW5hbFRyYWNrZXIsXG4gICAgcmVxdWlyZXM6IFtJU2V0dGluZ1JlZ2lzdHJ5LCBJVHJhbnNsYXRvcl0sXG4gICAgb3B0aW9uYWw6IFtcbiAgICAgICAgSUNvbW1hbmRQYWxldHRlLFxuICAgICAgICBJTGF1bmNoZXIsXG4gICAgICAgIElMYXlvdXRSZXN0b3JlcixcbiAgICAgICAgSU1haW5NZW51LFxuICAgICAgICBJVGhlbWVNYW5hZ2VyLFxuICAgICAgICBJUnVubmluZ1Nlc3Npb25NYW5hZ2Vyc1xuICAgIF0sXG4gICAgYXV0b1N0YXJ0OiB0cnVlXG59O1xuLyoqXG4gKiBFeHBvcnQgdGhlIHBsdWdpbiBhcyBkZWZhdWx0LlxuICovXG5leHBvcnQgZGVmYXVsdCBwbHVnaW47XG4vKipcbiAqIEFjdGl2YXRlIHRoZSB0ZXJtaW5hbCBwbHVnaW4uXG4gKi9cbmZ1bmN0aW9uIGFjdGl2YXRlKGFwcCwgc2V0dGluZ1JlZ2lzdHJ5LCB0cmFuc2xhdG9yLCBwYWxldHRlLCBsYXVuY2hlciwgcmVzdG9yZXIsIG1haW5NZW51LCB0aGVtZU1hbmFnZXIsIHJ1bm5pbmdTZXNzaW9uTWFuYWdlcnMpIHtcbiAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgIGNvbnN0IHsgc2VydmljZU1hbmFnZXIsIGNvbW1hbmRzIH0gPSBhcHA7XG4gICAgY29uc3QgY2F0ZWdvcnkgPSB0cmFucy5fXygnVGVybWluYWwnKTtcbiAgICBjb25zdCBuYW1lc3BhY2UgPSAndGVybWluYWwnO1xuICAgIGNvbnN0IHRyYWNrZXIgPSBuZXcgV2lkZ2V0VHJhY2tlcih7XG4gICAgICAgIG5hbWVzcGFjZVxuICAgIH0pO1xuICAgIC8vIEJhaWwgaWYgdGhlcmUgYXJlIG5vIHRlcm1pbmFscyBhdmFpbGFibGUuXG4gICAgaWYgKCFzZXJ2aWNlTWFuYWdlci50ZXJtaW5hbHMuaXNBdmFpbGFibGUoKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0Rpc2FibGluZyB0ZXJtaW5hbHMgcGx1Z2luIGJlY2F1c2UgdGhleSBhcmUgbm90IGF2YWlsYWJsZSBvbiB0aGUgc2VydmVyJyk7XG4gICAgICAgIHJldHVybiB0cmFja2VyO1xuICAgIH1cbiAgICAvLyBIYW5kbGUgc3RhdGUgcmVzdG9yYXRpb24uXG4gICAgaWYgKHJlc3RvcmVyKSB7XG4gICAgICAgIHZvaWQgcmVzdG9yZXIucmVzdG9yZSh0cmFja2VyLCB7XG4gICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLmNyZWF0ZU5ldyxcbiAgICAgICAgICAgIGFyZ3M6IHdpZGdldCA9PiAoeyBuYW1lOiB3aWRnZXQuY29udGVudC5zZXNzaW9uLm5hbWUgfSksXG4gICAgICAgICAgICBuYW1lOiB3aWRnZXQgPT4gd2lkZ2V0LmNvbnRlbnQuc2Vzc2lvbi5uYW1lXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBUaGUgY2FjaGVkIHRlcm1pbmFsIG9wdGlvbnMgZnJvbSB0aGUgc2V0dGluZyBlZGl0b3IuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgY2FjaGVkIG9wdGlvbiB2YWx1ZXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlT3B0aW9ucyhzZXR0aW5ncykge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIGNhY2hlZCBvcHRpb25zIGJ5IGRvaW5nIGEgc2hhbGxvdyBjb3B5IG9mIGtleS92YWx1ZXMuXG4gICAgICAgIC8vIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2Ugb3B0aW9ucyBpcyBwYXNzZWQgYW5kIHVzZWQgaW4gYWRkY29tbWFuZC1wYWxldHRlIGFuZCBuZWVkc1xuICAgICAgICAvLyB0byByZWZsZWN0IHRoZSBjdXJyZW50IGNhY2hlZCB2YWx1ZXMuXG4gICAgICAgIE9iamVjdC5rZXlzKHNldHRpbmdzLmNvbXBvc2l0ZSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zW2tleV0gPSBzZXR0aW5ncy5jb21wb3NpdGVba2V5XTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0ZXJtaW5hbFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZVRlcm1pbmFsKHdpZGdldCkge1xuICAgICAgICBjb25zdCB0ZXJtaW5hbCA9IHdpZGdldC5jb250ZW50O1xuICAgICAgICBpZiAoIXRlcm1pbmFsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICB0ZXJtaW5hbC5zZXRPcHRpb24oa2V5LCBvcHRpb25zW2tleV0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBzZXR0aW5ncyBvZiB0aGUgY3VycmVudCB0cmFja2VyIGluc3RhbmNlcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVUcmFja2VyKCkge1xuICAgICAgICB0cmFja2VyLmZvckVhY2god2lkZ2V0ID0+IHVwZGF0ZVRlcm1pbmFsKHdpZGdldCkpO1xuICAgIH1cbiAgICAvLyBGZXRjaCB0aGUgaW5pdGlhbCBzdGF0ZSBvZiB0aGUgc2V0dGluZ3MuXG4gICAgc2V0dGluZ1JlZ2lzdHJ5XG4gICAgICAgIC5sb2FkKHBsdWdpbi5pZClcbiAgICAgICAgLnRoZW4oc2V0dGluZ3MgPT4ge1xuICAgICAgICB1cGRhdGVPcHRpb25zKHNldHRpbmdzKTtcbiAgICAgICAgdXBkYXRlVHJhY2tlcigpO1xuICAgICAgICBzZXR0aW5ncy5jaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlT3B0aW9ucyhzZXR0aW5ncyk7XG4gICAgICAgICAgICB1cGRhdGVUcmFja2VyKCk7XG4gICAgICAgIH0pO1xuICAgIH0pXG4gICAgICAgIC5jYXRjaChQcml2YXRlLnNob3dFcnJvck1lc3NhZ2UpO1xuICAgIC8vIFN1YnNjcmliZSB0byBjaGFuZ2VzIGluIHRoZW1lLiBUaGlzIGlzIG5lZWRlZCBhcyB0aGUgdGhlbWVcbiAgICAvLyBpcyBjb21wdXRlZCBkeW5hbWljYWxseSBiYXNlZCBvbiB0aGUgc3RyaW5nIHZhbHVlIGFuZCBET01cbiAgICAvLyBwcm9wZXJ0aWVzLlxuICAgIHRoZW1lTWFuYWdlciA9PT0gbnVsbCB8fCB0aGVtZU1hbmFnZXIgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRoZW1lTWFuYWdlci50aGVtZUNoYW5nZWQuY29ubmVjdCgoc2VuZGVyLCBhcmdzKSA9PiB7XG4gICAgICAgIHRyYWNrZXIuZm9yRWFjaCh3aWRnZXQgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVybWluYWwgPSB3aWRnZXQuY29udGVudDtcbiAgICAgICAgICAgIGlmICh0ZXJtaW5hbC5nZXRPcHRpb24oJ3RoZW1lJykgPT09ICdpbmhlcml0Jykge1xuICAgICAgICAgICAgICAgIHRlcm1pbmFsLnNldE9wdGlvbigndGhlbWUnLCAnaW5oZXJpdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBhZGRDb21tYW5kcyhhcHAsIHRyYWNrZXIsIHNldHRpbmdSZWdpc3RyeSwgdHJhbnNsYXRvciwgb3B0aW9ucyk7XG4gICAgaWYgKG1haW5NZW51KSB7XG4gICAgICAgIC8vIEFkZCBcIlRlcm1pbmFsIFRoZW1lXCIgbWVudSBiZWxvdyBcIlRoZW1lXCIgbWVudS5cbiAgICAgICAgY29uc3QgdGhlbWVNZW51ID0gbmV3IE1lbnUoeyBjb21tYW5kcyB9KTtcbiAgICAgICAgdGhlbWVNZW51LnRpdGxlLmxhYmVsID0gdHJhbnMuX3AoJ21lbnUnLCAnVGVybWluYWwgVGhlbWUnKTtcbiAgICAgICAgdGhlbWVNZW51LmFkZEl0ZW0oe1xuICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5zZXRUaGVtZSxcbiAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2luaGVyaXQnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiB0cmFucy5fXygnSW5oZXJpdCcpLFxuICAgICAgICAgICAgICAgIGlzUGFsZXR0ZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoZW1lTWVudS5hZGRJdGVtKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuc2V0VGhlbWUsXG4gICAgICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgICAgICAgdGhlbWU6ICdsaWdodCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IHRyYW5zLl9fKCdMaWdodCcpLFxuICAgICAgICAgICAgICAgIGlzUGFsZXR0ZTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoZW1lTWVudS5hZGRJdGVtKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuc2V0VGhlbWUsXG4gICAgICAgICAgICBhcmdzOiB7IHRoZW1lOiAnZGFyaycsIGRpc3BsYXlOYW1lOiB0cmFucy5fXygnRGFyaycpLCBpc1BhbGV0dGU6IGZhbHNlIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCBzb21lIGNvbW1hbmRzIHRvIHRoZSBcIlZpZXdcIiBtZW51LlxuICAgICAgICBtYWluTWVudS5zZXR0aW5nc01lbnUuYWRkR3JvdXAoW1xuICAgICAgICAgICAgeyBjb21tYW5kOiBDb21tYW5kSURzLmluY3JlYXNlRm9udCB9LFxuICAgICAgICAgICAgeyBjb21tYW5kOiBDb21tYW5kSURzLmRlY3JlYXNlRm9udCB9LFxuICAgICAgICAgICAgeyB0eXBlOiAnc3VibWVudScsIHN1Ym1lbnU6IHRoZW1lTWVudSB9XG4gICAgICAgIF0sIDQwKTtcbiAgICAgICAgLy8gQWRkIHRlcm1pbmFsIGNyZWF0aW9uIHRvIHRoZSBmaWxlIG1lbnUuXG4gICAgICAgIG1haW5NZW51LmZpbGVNZW51Lm5ld01lbnUuYWRkSXRlbSh7XG4gICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLmNyZWF0ZU5ldyxcbiAgICAgICAgICAgIHJhbms6IDIwXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBZGQgdGVybWluYWwgY2xvc2UtYW5kLXNodXRkb3duIHRvIHRoZSBmaWxlIG1lbnUuXG4gICAgICAgIG1haW5NZW51LmZpbGVNZW51LmNsb3NlQW5kQ2xlYW5lcnMuYWRkKHtcbiAgICAgICAgICAgIHRyYWNrZXIsXG4gICAgICAgICAgICBjbG9zZUFuZENsZWFudXBMYWJlbDogKG4pID0+IHRyYW5zLl9fKCdTaHV0ZG93biBUZXJtaW5hbCcpLFxuICAgICAgICAgICAgY2xvc2VBbmRDbGVhbnVwOiAoY3VycmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFRoZSB3aWRnZXQgaXMgYXV0b21hdGljYWxseSBkaXNwb3NlZCB1cG9uIHNlc3Npb24gc2h1dGRvd24uXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQuY29udGVudC5zZXNzaW9uLnNodXRkb3duKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocGFsZXR0ZSkge1xuICAgICAgICAvLyBBZGQgY29tbWFuZCBwYWxldHRlIGl0ZW1zLlxuICAgICAgICBbXG4gICAgICAgICAgICBDb21tYW5kSURzLmNyZWF0ZU5ldyxcbiAgICAgICAgICAgIENvbW1hbmRJRHMucmVmcmVzaCxcbiAgICAgICAgICAgIENvbW1hbmRJRHMuaW5jcmVhc2VGb250LFxuICAgICAgICAgICAgQ29tbWFuZElEcy5kZWNyZWFzZUZvbnRcbiAgICAgICAgXS5mb3JFYWNoKGNvbW1hbmQgPT4ge1xuICAgICAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHsgY29tbWFuZCwgY2F0ZWdvcnksIGFyZ3M6IHsgaXNQYWxldHRlOiB0cnVlIH0gfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5zZXRUaGVtZSxcbiAgICAgICAgICAgIGNhdGVnb3J5LFxuICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICAgIHRoZW1lOiAnaW5oZXJpdCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IHRyYW5zLl9fKCdJbmhlcml0JyksXG4gICAgICAgICAgICAgICAgaXNQYWxldHRlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwYWxldHRlLmFkZEl0ZW0oe1xuICAgICAgICAgICAgY29tbWFuZDogQ29tbWFuZElEcy5zZXRUaGVtZSxcbiAgICAgICAgICAgIGNhdGVnb3J5LFxuICAgICAgICAgICAgYXJnczogeyB0aGVtZTogJ2xpZ2h0JywgZGlzcGxheU5hbWU6IHRyYW5zLl9fKCdMaWdodCcpLCBpc1BhbGV0dGU6IHRydWUgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGFsZXR0ZS5hZGRJdGVtKHtcbiAgICAgICAgICAgIGNvbW1hbmQ6IENvbW1hbmRJRHMuc2V0VGhlbWUsXG4gICAgICAgICAgICBjYXRlZ29yeSxcbiAgICAgICAgICAgIGFyZ3M6IHsgdGhlbWU6ICdkYXJrJywgZGlzcGxheU5hbWU6IHRyYW5zLl9fKCdEYXJrJyksIGlzUGFsZXR0ZTogdHJ1ZSB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBBZGQgYSBsYXVuY2hlciBpdGVtIGlmIHRoZSBsYXVuY2hlciBpcyBhdmFpbGFibGUuXG4gICAgaWYgKGxhdW5jaGVyKSB7XG4gICAgICAgIGxhdW5jaGVyLmFkZCh7XG4gICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLmNyZWF0ZU5ldyxcbiAgICAgICAgICAgIGNhdGVnb3J5OiB0cmFucy5fXygnT3RoZXInKSxcbiAgICAgICAgICAgIHJhbms6IDBcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIEFkZCBhIHNlc3Npb25zIG1hbmFnZXIgaWYgdGhlIHJ1bm5pbmcgZXh0ZW5zaW9uIGlzIGF2YWlsYWJsZVxuICAgIGlmIChydW5uaW5nU2Vzc2lvbk1hbmFnZXJzKSB7XG4gICAgICAgIGFkZFJ1bm5pbmdTZXNzaW9uTWFuYWdlcihydW5uaW5nU2Vzc2lvbk1hbmFnZXJzLCBhcHAsIHRyYW5zbGF0b3IpO1xuICAgIH1cbiAgICByZXR1cm4gdHJhY2tlcjtcbn1cbi8qKlxuICogQWRkIHRoZSBydW5uaW5nIHRlcm1pbmFsIG1hbmFnZXIgdG8gdGhlIHJ1bm5pbmcgcGFuZWwuXG4gKi9cbmZ1bmN0aW9uIGFkZFJ1bm5pbmdTZXNzaW9uTWFuYWdlcihtYW5hZ2VycywgYXBwLCB0cmFuc2xhdG9yKSB7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBjb25zdCBtYW5hZ2VyID0gYXBwLnNlcnZpY2VNYW5hZ2VyLnRlcm1pbmFscztcbiAgICBtYW5hZ2Vycy5hZGQoe1xuICAgICAgICBuYW1lOiB0cmFucy5fXygnVGVybWluYWxzJyksXG4gICAgICAgIHJ1bm5pbmc6ICgpID0+IHRvQXJyYXkobWFuYWdlci5ydW5uaW5nKCkpLm1hcChtb2RlbCA9PiBuZXcgUnVubmluZ1Rlcm1pbmFsKG1vZGVsKSksXG4gICAgICAgIHNodXRkb3duQWxsOiAoKSA9PiBtYW5hZ2VyLnNodXRkb3duQWxsKCksXG4gICAgICAgIHJlZnJlc2hSdW5uaW5nOiAoKSA9PiBtYW5hZ2VyLnJlZnJlc2hSdW5uaW5nKCksXG4gICAgICAgIHJ1bm5pbmdDaGFuZ2VkOiBtYW5hZ2VyLnJ1bm5pbmdDaGFuZ2VkLFxuICAgICAgICBzaHV0ZG93bkxhYmVsOiB0cmFucy5fXygnU2h1dCBEb3duJyksXG4gICAgICAgIHNodXRkb3duQWxsTGFiZWw6IHRyYW5zLl9fKCdTaHV0IERvd24gQWxsJyksXG4gICAgICAgIHNodXRkb3duQWxsQ29uZmlybWF0aW9uVGV4dDogdHJhbnMuX18oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBwZXJtYW5lbnRseSBzaHV0IGRvd24gYWxsIHJ1bm5pbmcgdGVybWluYWxzPycpXG4gICAgfSk7XG4gICAgY2xhc3MgUnVubmluZ1Rlcm1pbmFsIHtcbiAgICAgICAgY29uc3RydWN0b3IobW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsID0gbW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgb3BlbigpIHtcbiAgICAgICAgICAgIHZvaWQgYXBwLmNvbW1hbmRzLmV4ZWN1dGUoJ3Rlcm1pbmFsOm9wZW4nLCB7IG5hbWU6IHRoaXMuX21vZGVsLm5hbWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWNvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0ZXJtaW5hbEljb247XG4gICAgICAgIH1cbiAgICAgICAgbGFiZWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gYHRlcm1pbmFscy8ke3RoaXMuX21vZGVsLm5hbWV9YDtcbiAgICAgICAgfVxuICAgICAgICBzaHV0ZG93bigpIHtcbiAgICAgICAgICAgIHJldHVybiBtYW5hZ2VyLnNodXRkb3duKHRoaXMuX21vZGVsLm5hbWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBZGQgdGhlIGNvbW1hbmRzIGZvciB0aGUgdGVybWluYWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGRDb21tYW5kcyhhcHAsIHRyYWNrZXIsIHNldHRpbmdSZWdpc3RyeSwgdHJhbnNsYXRvciwgb3B0aW9ucykge1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgeyBjb21tYW5kcywgc2VydmljZU1hbmFnZXIgfSA9IGFwcDtcbiAgICAvLyBBZGQgdGVybWluYWwgY29tbWFuZHMuXG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNyZWF0ZU5ldywge1xuICAgICAgICBsYWJlbDogYXJncyA9PiBhcmdzWydpc1BhbGV0dGUnXSA/IHRyYW5zLl9fKCdOZXcgVGVybWluYWwnKSA6IHRyYW5zLl9fKCdUZXJtaW5hbCcpLFxuICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnU3RhcnQgYSBuZXcgdGVybWluYWwgc2Vzc2lvbicpLFxuICAgICAgICBpY29uOiBhcmdzID0+IChhcmdzWydpc1BhbGV0dGUnXSA/IHVuZGVmaW5lZCA6IHRlcm1pbmFsSWNvbiksXG4gICAgICAgIGV4ZWN1dGU6IGFzeW5jIChhcmdzKSA9PiB7XG4gICAgICAgICAgICAvLyB3YWl0IGZvciB0aGUgd2lkZ2V0IHRvIGxhenkgbG9hZFxuICAgICAgICAgICAgbGV0IFRlcm1pbmFsO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBUZXJtaW5hbCA9IChhd2FpdCBQcml2YXRlLmVuc3VyZVdpZGdldCgpKS5UZXJtaW5hbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBQcml2YXRlLnNob3dFcnJvck1lc3NhZ2UoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gYXJnc1snbmFtZSddO1xuICAgICAgICAgICAgY29uc3QgY3dkID0gYXJnc1snY3dkJ107XG4gICAgICAgICAgICBsZXQgc2Vzc2lvbjtcbiAgICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kZWxzID0gYXdhaXQgVGVybWluYWxBUEkubGlzdFJ1bm5pbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWxzLm1hcChkID0+IGQubmFtZSkuaW5jbHVkZXMobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgYXJlIHJlc3RvcmluZyBhIHRlcm1pbmFsIHdpZGdldCBhbmQgdGhlIGNvcnJlc3BvbmRpbmcgdGVybWluYWwgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCdzIGNvbm5lY3QgdG8gaXRcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbiA9IHNlcnZpY2VNYW5hZ2VyLnRlcm1pbmFscy5jb25uZWN0VG8oeyBtb2RlbDogeyBuYW1lIH0gfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBhcmUgcmVzdG9yaW5nIGEgdGVybWluYWwgd2lkZ2V0IGJ1dCB0aGUgY29ycmVzcG9uZGluZyB0ZXJtaW5hbCB3YXMgY2xvc2VkXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCdzIHN0YXJ0IGEgbmV3IHRlcm1pbmFsIHdpdGggdGhlIG9yaWdpbmFsIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbiA9IGF3YWl0IHNlcnZpY2VNYW5hZ2VyLnRlcm1pbmFscy5zdGFydE5ldyh7IG5hbWUsIGN3ZCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB3ZSBhcmUgY3JlYXRpbmcgYSBuZXcgdGVybWluYWwgd2lkZ2V0IHdpdGggYSBuZXcgdGVybWluYWxcbiAgICAgICAgICAgICAgICAvLyBsZXQgdGhlIHNlcnZlciBjaG9vc2UgdGhlIHRlcm1pbmFsIG5hbWVcbiAgICAgICAgICAgICAgICBzZXNzaW9uID0gYXdhaXQgc2VydmljZU1hbmFnZXIudGVybWluYWxzLnN0YXJ0TmV3KHsgY3dkIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdGVybSA9IG5ldyBUZXJtaW5hbChzZXNzaW9uLCBvcHRpb25zLCB0cmFuc2xhdG9yKTtcbiAgICAgICAgICAgIHRlcm0udGl0bGUuaWNvbiA9IHRlcm1pbmFsSWNvbjtcbiAgICAgICAgICAgIHRlcm0udGl0bGUubGFiZWwgPSAnLi4uJztcbiAgICAgICAgICAgIGNvbnN0IG1haW4gPSBuZXcgTWFpbkFyZWFXaWRnZXQoeyBjb250ZW50OiB0ZXJtIH0pO1xuICAgICAgICAgICAgYXBwLnNoZWxsLmFkZChtYWluLCAnbWFpbicsIHtcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZTogYXJncy5hY3RpdmF0ZSAhPT0gZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdm9pZCB0cmFja2VyLmFkZChtYWluKTtcbiAgICAgICAgICAgIHJldHVybiBtYWluO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm9wZW4sIHtcbiAgICAgICAgZXhlY3V0ZTogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gYXJnc1snbmFtZSddO1xuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGEgcnVubmluZyB0ZXJtaW5hbCB3aXRoIHRoZSBnaXZlbiBuYW1lLlxuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdHJhY2tlci5maW5kKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZW50ID0gdmFsdWUuY29udGVudDtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGVudC5zZXNzaW9uLm5hbWUgPT09IG5hbWUgfHwgZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh3aWRnZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5hY3RpdmF0ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwLnNoZWxsLmFjdGl2YXRlQnlJZCh3aWRnZXQuaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgY3JlYXRlIGEgbmV3IHRlcm1pbmFsIHdpdGggYSBnaXZlbiBuYW1lLlxuICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kcy5leGVjdXRlKENvbW1hbmRJRHMuY3JlYXRlTmV3LCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2YXRlOiBhcmdzLmFjdGl2YXRlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMucmVmcmVzaCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ1JlZnJlc2ggVGVybWluYWwnKSxcbiAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ1JlZnJlc2ggdGhlIGN1cnJlbnQgdGVybWluYWwgc2Vzc2lvbicpLFxuICAgICAgICBleGVjdXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gdHJhY2tlci5jdXJyZW50V2lkZ2V0O1xuICAgICAgICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXBwLnNoZWxsLmFjdGl2YXRlQnlJZChjdXJyZW50LmlkKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgY3VycmVudC5jb250ZW50LnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50LmNvbnRlbnQuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgUHJpdmF0ZS5zaG93RXJyb3JNZXNzYWdlKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzRW5hYmxlZDogKCkgPT4gdHJhY2tlci5jdXJyZW50V2lkZ2V0ICE9PSBudWxsXG4gICAgfSk7XG4gICAgY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmluY3JlYXNlRm9udCwge1xuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0luY3JlYXNlIFRlcm1pbmFsIEZvbnQgU2l6ZScpLFxuICAgICAgICBleGVjdXRlOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGZvbnRTaXplIH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgaWYgKGZvbnRTaXplICYmIGZvbnRTaXplIDwgNzIpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBzZXR0aW5nUmVnaXN0cnkuc2V0KHBsdWdpbi5pZCwgJ2ZvbnRTaXplJywgZm9udFNpemUgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBQcml2YXRlLnNob3dFcnJvck1lc3NhZ2UoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb21tYW5kcy5hZGRDb21tYW5kKENvbW1hbmRJRHMuZGVjcmVhc2VGb250LCB7XG4gICAgICAgIGxhYmVsOiB0cmFucy5fXygnRGVjcmVhc2UgVGVybWluYWwgRm9udCBTaXplJyksXG4gICAgICAgIGV4ZWN1dGU6IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgZm9udFNpemUgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICBpZiAoZm9udFNpemUgJiYgZm9udFNpemUgPiA5KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgc2V0dGluZ1JlZ2lzdHJ5LnNldChwbHVnaW4uaWQsICdmb250U2l6ZScsIGZvbnRTaXplIC0gMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgUHJpdmF0ZS5zaG93RXJyb3JNZXNzYWdlKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgdGhlbWVEaXNwbGF5ZWROYW1lID0ge1xuICAgICAgICBpbmhlcml0OiB0cmFucy5fXygnSW5oZXJpdCcpLFxuICAgICAgICBsaWdodDogdHJhbnMuX18oJ0xpZ2h0JyksXG4gICAgICAgIGRhcms6IHRyYW5zLl9fKCdEYXJrJylcbiAgICB9O1xuICAgIGNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zZXRUaGVtZSwge1xuICAgICAgICBsYWJlbDogYXJncyA9PiB7XG4gICAgICAgICAgICBjb25zdCB0aGVtZSA9IGFyZ3NbJ3RoZW1lJ107XG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHRoZW1lIGluIHRoZW1lRGlzcGxheWVkTmFtZVxuICAgICAgICAgICAgICAgID8gdGhlbWVEaXNwbGF5ZWROYW1lW3RoZW1lXVxuICAgICAgICAgICAgICAgIDogdHJhbnMuX18odGhlbWVbMF0udG9VcHBlckNhc2UoKSArIHRoZW1lLnNsaWNlKDEpKTtcbiAgICAgICAgICAgIHJldHVybiBhcmdzWydpc1BhbGV0dGUnXVxuICAgICAgICAgICAgICAgID8gdHJhbnMuX18oJ1VzZSBUZXJtaW5hbCBUaGVtZTogJTEnLCBkaXNwbGF5TmFtZSlcbiAgICAgICAgICAgICAgICA6IGRpc3BsYXlOYW1lO1xuICAgICAgICB9LFxuICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnU2V0IHRoZSB0ZXJtaW5hbCB0aGVtZScpLFxuICAgICAgICBpc1RvZ2dsZWQ6IGFyZ3MgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyB0aGVtZSB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIHJldHVybiBhcmdzWyd0aGVtZSddID09PSB0aGVtZTtcbiAgICAgICAgfSxcbiAgICAgICAgZXhlY3V0ZTogYXN5bmMgKGFyZ3MpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRoZW1lID0gYXJnc1sndGhlbWUnXTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2V0dGluZ1JlZ2lzdHJ5LnNldChwbHVnaW4uaWQsICd0aGVtZScsIHRoZW1lKTtcbiAgICAgICAgICAgICAgICBjb21tYW5kcy5ub3RpZnlDb21tYW5kQ2hhbmdlZChDb21tYW5kSURzLnNldFRoZW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIFByaXZhdGUuc2hvd0Vycm9yTWVzc2FnZShlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogTGF6eS1sb2FkIHRoZSB3aWRnZXQgKGFuZCB4dGVybSBsaWJyYXJ5IGFuZCBhZGRvbnMpXG4gICAgICovXG4gICAgZnVuY3Rpb24gZW5zdXJlV2lkZ2V0KCkge1xuICAgICAgICBpZiAoUHJpdmF0ZS53aWRnZXRSZWFkeSkge1xuICAgICAgICAgICAgcmV0dXJuIFByaXZhdGUud2lkZ2V0UmVhZHk7XG4gICAgICAgIH1cbiAgICAgICAgUHJpdmF0ZS53aWRnZXRSZWFkeSA9IGltcG9ydCgnQGp1cHl0ZXJsYWIvdGVybWluYWwvbGliL3dpZGdldCcpO1xuICAgICAgICByZXR1cm4gUHJpdmF0ZS53aWRnZXRSZWFkeTtcbiAgICB9XG4gICAgUHJpdmF0ZS5lbnN1cmVXaWRnZXQgPSBlbnN1cmVXaWRnZXQ7XG4gICAgLyoqXG4gICAgICogIFV0aWxpdHkgZnVuY3Rpb24gZm9yIGNvbnNpc3RlbnQgZXJyb3IgcmVwb3J0aW5nXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2hvd0Vycm9yTWVzc2FnZShlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBGYWlsZWQgdG8gY29uZmlndXJlICR7cGx1Z2luLmlkfTogJHtlcnJvci5tZXNzYWdlfWApO1xuICAgIH1cbiAgICBQcml2YXRlLnNob3dFcnJvck1lc3NhZ2UgPSBzaG93RXJyb3JNZXNzYWdlO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9