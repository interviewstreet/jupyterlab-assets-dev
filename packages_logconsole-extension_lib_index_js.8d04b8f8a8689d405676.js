(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_logconsole-extension_lib_index_js"],{

/***/ "../../packages/logconsole-extension/lib/index.js":
/*!********************************************************!*\
  !*** ../../packages/logconsole-extension/lib/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogLevelSwitcher": () => (/* binding */ LogLevelSwitcher),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/logconsole */ "webpack/sharing/consume/default/@jupyterlab/logconsole/@jupyterlab/logconsole");
/* harmony import */ var _jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/notebook */ "webpack/sharing/consume/default/@jupyterlab/notebook/@jupyterlab/notebook");
/* harmony import */ var _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/settingregistry */ "webpack/sharing/consume/default/@jupyterlab/settingregistry/@jupyterlab/settingregistry");
/* harmony import */ var _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./status */ "../../packages/logconsole-extension/lib/status.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module logconsole-extension
 */












const LOG_CONSOLE_PLUGIN_ID = '@jupyterlab/logconsole-extension:plugin';
/**
 * The command IDs used by the plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.addCheckpoint = 'logconsole:add-checkpoint';
    CommandIDs.clear = 'logconsole:clear';
    CommandIDs.open = 'logconsole:open';
    CommandIDs.setLevel = 'logconsole:set-level';
})(CommandIDs || (CommandIDs = {}));
/**
 * The Log Console extension.
 */
const logConsolePlugin = {
    activate: activateLogConsole,
    id: LOG_CONSOLE_PLUGIN_ID,
    provides: _jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_2__.ILoggerRegistry,
    requires: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILabShell, _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_4__.IRenderMimeRegistry, _jupyterlab_notebook__WEBPACK_IMPORTED_MODULE_3__.INotebookTracker, _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.ITranslator],
    optional: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer, _jupyterlab_settingregistry__WEBPACK_IMPORTED_MODULE_5__.ISettingRegistry, _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_6__.IStatusBar],
    autoStart: true
};
/**
 * Activate the Log Console extension.
 */
function activateLogConsole(app, labShell, rendermime, nbtracker, translator, palette, restorer, settingRegistry, statusBar) {
    const trans = translator.load('jupyterlab');
    let logConsoleWidget = null;
    let logConsolePanel = null;
    const loggerRegistry = new _jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_2__.LoggerRegistry({
        defaultRendermime: rendermime,
        // The maxLength is reset below from settings
        maxLength: 1000
    });
    const tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace: 'logconsole'
    });
    if (restorer) {
        void restorer.restore(tracker, {
            command: CommandIDs.open,
            name: () => 'logconsole'
        });
    }
    const status = new _status__WEBPACK_IMPORTED_MODULE_11__.LogConsoleStatus({
        loggerRegistry: loggerRegistry,
        handleClick: () => {
            var _a;
            if (!logConsoleWidget) {
                createLogConsoleWidget({
                    insertMode: 'split-bottom',
                    ref: (_a = app.shell.currentWidget) === null || _a === void 0 ? void 0 : _a.id
                });
            }
            else {
                app.shell.activateById(logConsoleWidget.id);
            }
        },
        translator
    });
    const createLogConsoleWidget = (options = {}) => {
        logConsolePanel = new _jupyterlab_logconsole__WEBPACK_IMPORTED_MODULE_2__.LogConsolePanel(loggerRegistry, translator);
        logConsolePanel.source =
            options.source !== undefined
                ? options.source
                : nbtracker.currentWidget
                    ? nbtracker.currentWidget.context.path
                    : null;
        logConsoleWidget = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({ content: logConsolePanel });
        logConsoleWidget.addClass('jp-LogConsole');
        logConsoleWidget.title.closable = true;
        logConsoleWidget.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8__.listIcon;
        logConsoleWidget.title.label = trans.__('Log Console');
        const addCheckpointButton = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.CommandToolbarButton({
            commands: app.commands,
            id: CommandIDs.addCheckpoint
        });
        const clearButton = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.CommandToolbarButton({
            commands: app.commands,
            id: CommandIDs.clear
        });
        logConsoleWidget.toolbar.addItem('lab-log-console-add-checkpoint', addCheckpointButton);
        logConsoleWidget.toolbar.addItem('lab-log-console-clear', clearButton);
        logConsoleWidget.toolbar.addItem('level', new LogLevelSwitcher(logConsoleWidget.content, translator));
        logConsolePanel.sourceChanged.connect(() => {
            app.commands.notifyCommandChanged();
        });
        logConsolePanel.sourceDisplayed.connect((panel, { source, version }) => {
            status.model.sourceDisplayed(source, version);
        });
        logConsoleWidget.disposed.connect(() => {
            logConsoleWidget = null;
            logConsolePanel = null;
            app.commands.notifyCommandChanged();
        });
        app.shell.add(logConsoleWidget, 'down', {
            ref: options.ref,
            mode: options.insertMode
        });
        void tracker.add(logConsoleWidget);
        app.shell.activateById(logConsoleWidget.id);
        logConsoleWidget.update();
        app.commands.notifyCommandChanged();
    };
    app.commands.addCommand(CommandIDs.open, {
        label: trans.__('Show Log Console'),
        execute: (options = {}) => {
            // Toggle the display
            if (logConsoleWidget) {
                logConsoleWidget.dispose();
            }
            else {
                createLogConsoleWidget(options);
            }
        },
        isToggled: () => {
            return logConsoleWidget !== null;
        }
    });
    app.commands.addCommand(CommandIDs.addCheckpoint, {
        execute: () => {
            var _a;
            (_a = logConsolePanel === null || logConsolePanel === void 0 ? void 0 : logConsolePanel.logger) === null || _a === void 0 ? void 0 : _a.checkpoint();
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8__.addIcon,
        isEnabled: () => !!logConsolePanel && logConsolePanel.source !== null,
        label: trans.__('Add Checkpoint')
    });
    app.commands.addCommand(CommandIDs.clear, {
        execute: () => {
            var _a;
            (_a = logConsolePanel === null || logConsolePanel === void 0 ? void 0 : logConsolePanel.logger) === null || _a === void 0 ? void 0 : _a.clear();
        },
        icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8__.clearIcon,
        isEnabled: () => !!logConsolePanel && logConsolePanel.source !== null,
        label: trans.__('Clear Log')
    });
    function toTitleCase(value) {
        return value.length === 0 ? value : value[0].toUpperCase() + value.slice(1);
    }
    app.commands.addCommand(CommandIDs.setLevel, {
        // TODO: find good icon class
        execute: (args) => {
            if (logConsolePanel === null || logConsolePanel === void 0 ? void 0 : logConsolePanel.logger) {
                logConsolePanel.logger.level = args.level;
            }
        },
        isEnabled: () => !!logConsolePanel && logConsolePanel.source !== null,
        label: args => trans.__('Set Log Level to %1', toTitleCase(args.level))
    });
    if (palette) {
        palette.addItem({
            command: CommandIDs.open,
            category: trans.__('Main Area')
        });
    }
    if (statusBar) {
        statusBar.registerStatusItem('@jupyterlab/logconsole-extension:status', {
            item: status,
            align: 'left',
            isActive: () => { var _a; return ((_a = status.model) === null || _a === void 0 ? void 0 : _a.version) > 0; },
            activeStateChanged: status.model.stateChanged
        });
    }
    function setSource(newValue) {
        if (logConsoleWidget && newValue === logConsoleWidget) {
            // Do not change anything if we are just focusing on ourselves
            return;
        }
        let source;
        if (newValue && nbtracker.has(newValue)) {
            source = newValue.context.path;
        }
        else {
            source = null;
        }
        if (logConsolePanel) {
            logConsolePanel.source = source;
        }
        status.model.source = source;
    }
    void app.restored.then(() => {
        // Set source only after app is restored in order to allow restorer to
        // restore previous source first, which may set the renderer
        setSource(labShell.currentWidget);
        labShell.currentChanged.connect((_, { newValue }) => setSource(newValue));
    });
    if (settingRegistry) {
        const updateSettings = (settings) => {
            loggerRegistry.maxLength = settings.get('maxLogEntries')
                .composite;
            status.model.flashEnabled = settings.get('flash').composite;
        };
        Promise.all([settingRegistry.load(LOG_CONSOLE_PLUGIN_ID), app.restored])
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
    return loggerRegistry;
}
/**
 * A toolbar widget that switches log levels.
 */
class LogLevelSwitcher extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ReactWidget {
    /**
     * Construct a new cell type switcher.
     */
    constructor(widget, translator) {
        super();
        /**
         * Handle `change` events for the HTMLSelect component.
         */
        this.handleChange = (event) => {
            if (this._logConsole.logger) {
                this._logConsole.logger.level = event.target.value;
            }
            this.update();
        };
        /**
         * Handle `keydown` events for the HTMLSelect component.
         */
        this.handleKeyDown = (event) => {
            if (event.keyCode === 13) {
                this._logConsole.activate();
            }
        };
        this._id = `level-${_lumino_coreutils__WEBPACK_IMPORTED_MODULE_9__.UUID.uuid4()}`;
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_7__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this.addClass('jp-LogConsole-toolbarLogLevel');
        this._logConsole = widget;
        if (widget.source) {
            this.update();
        }
        widget.sourceChanged.connect(this._updateSource, this);
    }
    _updateSource(sender, { oldValue, newValue }) {
        // Transfer stateChanged handler to new source logger
        if (oldValue !== null) {
            const logger = sender.loggerRegistry.getLogger(oldValue);
            logger.stateChanged.disconnect(this.update, this);
        }
        if (newValue !== null) {
            const logger = sender.loggerRegistry.getLogger(newValue);
            logger.stateChanged.connect(this.update, this);
        }
        this.update();
    }
    render() {
        const logger = this._logConsole.logger;
        return (react__WEBPACK_IMPORTED_MODULE_10__.createElement(react__WEBPACK_IMPORTED_MODULE_10__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_10__.createElement("label", { htmlFor: this._id, className: logger === null
                    ? 'jp-LogConsole-toolbarLogLevel-disabled'
                    : undefined }, this._trans.__('Log Level:')),
            react__WEBPACK_IMPORTED_MODULE_10__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_8__.HTMLSelect, { id: this._id, className: "jp-LogConsole-toolbarLogLevelDropdown", onChange: this.handleChange, onKeyDown: this.handleKeyDown, value: logger === null || logger === void 0 ? void 0 : logger.level, "aria-label": this._trans.__('Log level'), disabled: logger === null, options: logger === null
                    ? []
                    : [
                        [this._trans.__('Critical'), 'Critical'],
                        [this._trans.__('Error'), 'Error'],
                        [this._trans.__('Warning'), 'Warning'],
                        [this._trans.__('Info'), 'Info'],
                        [this._trans.__('Debug'), 'Debug']
                    ].map(data => ({
                        label: data[0],
                        value: data[1].toLowerCase()
                    })) })));
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logConsolePlugin);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/logconsole-extension/lib/status.js":
/*!*********************************************************!*\
  !*** ../../packages/logconsole-extension/lib/status.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogConsoleStatus": () => (/* binding */ LogConsoleStatus)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.






/**
 * A pure functional component for a Log Console status item.
 *
 * @param props - the props for the component.
 *
 * @returns a tsx component for rendering the Log Console status.
 */
function LogConsoleStatusComponent(props) {
    const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
    const trans = translator.load('jupyterlab');
    let title = '';
    if (props.newMessages > 0) {
        title = trans.__('%1 new messages, %2 log entries for %3', props.newMessages, props.logEntries, props.source);
    }
    else {
        title += trans.__('%1 log entries for %2', props.logEntries, props.source);
    }
    return (react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.GroupItem, { spacing: 0, onClick: props.handleClick, title: title },
        react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.listIcon.react, { top: '2px', stylesheet: 'statusBar' }),
        props.newMessages > 0 ? react__WEBPACK_IMPORTED_MODULE_5___default().createElement(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.TextItem, { source: props.newMessages }) : react__WEBPACK_IMPORTED_MODULE_5___default().createElement((react__WEBPACK_IMPORTED_MODULE_5___default().Fragment), null)));
}
/**
 * A VDomRenderer widget for displaying the status of Log Console logs.
 */
class LogConsoleStatus extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Construct the log console status widget.
     *
     * @param options - The status widget initialization options.
     */
    constructor(options) {
        super(new LogConsoleStatus.Model(options.loggerRegistry));
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        this._handleClick = options.handleClick;
        this.addClass(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.interactiveItem);
        this.addClass('jp-LogConsoleStatusItem');
    }
    /**
     * Render the log console status item.
     */
    render() {
        if (this.model === null || this.model.version === 0) {
            return null;
        }
        const { flashEnabled, messages, source, version, versionDisplayed, versionNotified } = this.model;
        if (source !== null && flashEnabled && version > versionNotified) {
            this._flashHighlight();
            this.model.sourceNotified(source, version);
        }
        else if (source !== null && flashEnabled && version > versionDisplayed) {
            this._showHighlighted();
        }
        else {
            this._clearHighlight();
        }
        return (react__WEBPACK_IMPORTED_MODULE_5___default().createElement(LogConsoleStatusComponent, { handleClick: this._handleClick, logEntries: messages, newMessages: version - versionDisplayed, source: this.model.source, translator: this.translator }));
    }
    _flashHighlight() {
        this._showHighlighted();
        // To make sure the browser triggers the animation, we remove the class,
        // wait for an animation frame, then add it back
        this.removeClass('jp-LogConsole-flash');
        requestAnimationFrame(() => {
            this.addClass('jp-LogConsole-flash');
        });
    }
    _showHighlighted() {
        this.addClass('jp-mod-selected');
    }
    _clearHighlight() {
        this.removeClass('jp-LogConsole-flash');
        this.removeClass('jp-mod-selected');
    }
}
/**
 * A namespace for Log Console log status.
 */
(function (LogConsoleStatus) {
    /**
     * A VDomModel for the LogConsoleStatus item.
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        /**
         * Create a new LogConsoleStatus model.
         *
         * @param loggerRegistry - The logger registry providing the logs.
         */
        constructor(loggerRegistry) {
            super();
            /**
             * A signal emitted when the flash enablement changes.
             */
            this.flashEnabledChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
            this._flashEnabled = true;
            this._source = null;
            /**
             * The view status of each source.
             *
             * #### Notes
             * Keys are source names, value is a list of two numbers. The first
             * represents the version of the messages that was last displayed to the
             * user, the second represents the version that we last notified the user
             * about.
             */
            this._sourceVersion = new Map();
            this._loggerRegistry = loggerRegistry;
            this._loggerRegistry.registryChanged.connect(this._handleLogRegistryChange, this);
            this._handleLogRegistryChange();
        }
        /**
         * Number of messages currently in the current source.
         */
        get messages() {
            if (this._source === null) {
                return 0;
            }
            const logger = this._loggerRegistry.getLogger(this._source);
            return logger.length;
        }
        /**
         * The number of messages ever stored by the current source.
         */
        get version() {
            if (this._source === null) {
                return 0;
            }
            const logger = this._loggerRegistry.getLogger(this._source);
            return logger.version;
        }
        /**
         * The name of the active log source
         */
        get source() {
            return this._source;
        }
        set source(name) {
            if (this._source === name) {
                return;
            }
            this._source = name;
            // refresh rendering
            this.stateChanged.emit();
        }
        /**
         * The last source version that was displayed.
         */
        get versionDisplayed() {
            var _a, _b;
            if (this._source === null) {
                return 0;
            }
            return (_b = (_a = this._sourceVersion.get(this._source)) === null || _a === void 0 ? void 0 : _a.lastDisplayed) !== null && _b !== void 0 ? _b : 0;
        }
        /**
         * The last source version we notified the user about.
         */
        get versionNotified() {
            var _a, _b;
            if (this._source === null) {
                return 0;
            }
            return (_b = (_a = this._sourceVersion.get(this._source)) === null || _a === void 0 ? void 0 : _a.lastNotified) !== null && _b !== void 0 ? _b : 0;
        }
        /**
         * Flag to toggle flashing when new logs added.
         */
        get flashEnabled() {
            return this._flashEnabled;
        }
        set flashEnabled(enabled) {
            if (this._flashEnabled === enabled) {
                return;
            }
            this._flashEnabled = enabled;
            this.flashEnabledChanged.emit();
            // refresh rendering
            this.stateChanged.emit();
        }
        /**
         * Record the last source version displayed to the user.
         *
         * @param source - The name of the log source.
         * @param version - The version of the log that was displayed.
         *
         * #### Notes
         * This will also update the last notified version so that the last
         * notified version is always at least the last displayed version.
         */
        sourceDisplayed(source, version) {
            if (source === null || version === null) {
                return;
            }
            const versions = this._sourceVersion.get(source);
            let change = false;
            if (versions.lastDisplayed < version) {
                versions.lastDisplayed = version;
                change = true;
            }
            if (versions.lastNotified < version) {
                versions.lastNotified = version;
                change = true;
            }
            if (change && source === this._source) {
                this.stateChanged.emit();
            }
        }
        /**
         * Record a source version we notified the user about.
         *
         * @param source - The name of the log source.
         * @param version - The version of the log.
         */
        sourceNotified(source, version) {
            if (source === null) {
                return;
            }
            const versions = this._sourceVersion.get(source);
            if (versions.lastNotified < version) {
                versions.lastNotified = version;
                if (source === this._source) {
                    this.stateChanged.emit();
                }
            }
        }
        _handleLogRegistryChange() {
            const loggers = this._loggerRegistry.getLoggers();
            for (const logger of loggers) {
                if (!this._sourceVersion.has(logger.source)) {
                    logger.contentChanged.connect(this._handleLogContentChange, this);
                    this._sourceVersion.set(logger.source, {
                        lastDisplayed: 0,
                        lastNotified: 0
                    });
                }
            }
        }
        _handleLogContentChange({ source }, change) {
            if (source === this._source) {
                this.stateChanged.emit();
            }
        }
    }
    LogConsoleStatus.Model = Model;
})(LogConsoleStatus || (LogConsoleStatus = {}));
//# sourceMappingURL=status.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbG9nY29uc29sZS1leHRlbnNpb24vbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9sb2djb25zb2xlLWV4dGVuc2lvbi9saWIvc3RhdHVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDcUU7QUFDb0Q7QUFDL0I7QUFDbEM7QUFDSztBQUNFO0FBQ1o7QUFDbUI7QUFDZTtBQUM1QztBQUNWO0FBQ2E7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdDQUFnQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1FQUFlO0FBQzdCLGVBQWUsOERBQVMsRUFBRSx1RUFBbUIsRUFBRSxrRUFBZ0IsRUFBRSxnRUFBVztBQUM1RSxlQUFlLGlFQUFlLEVBQUUsb0VBQWUsRUFBRSx5RUFBZ0IsRUFBRSw2REFBVTtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isa0VBQWM7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHdCQUF3QiwrREFBYTtBQUNyQztBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QixzREFBZ0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsZ0RBQWdEO0FBQ2hELDhCQUE4QixtRUFBZTtBQUM3QztBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxTQUFTO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNENBQTRDO0FBQzdDLGtDIiwiZmlsZSI6InBhY2thZ2VzX2xvZ2NvbnNvbGUtZXh0ZW5zaW9uX2xpYl9pbmRleF9qcy44ZDA0YjhmOGE4Njg5ZDQwNTY3Ni5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGxvZ2NvbnNvbGUtZXh0ZW5zaW9uXG4gKi9cbmltcG9ydCB7IElMYWJTaGVsbCwgSUxheW91dFJlc3RvcmVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgQ29tbWFuZFRvb2xiYXJCdXR0b24sIElDb21tYW5kUGFsZXR0ZSwgTWFpbkFyZWFXaWRnZXQsIFJlYWN0V2lkZ2V0LCBXaWRnZXRUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgSUxvZ2dlclJlZ2lzdHJ5LCBMb2dDb25zb2xlUGFuZWwsIExvZ2dlclJlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvbG9nY29uc29sZSc7XG5pbXBvcnQgeyBJTm90ZWJvb2tUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvbm90ZWJvb2snO1xuaW1wb3J0IHsgSVJlbmRlck1pbWVSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWUnO1xuaW1wb3J0IHsgSVNldHRpbmdSZWdpc3RyeSB9IGZyb20gJ0BqdXB5dGVybGFiL3NldHRpbmdyZWdpc3RyeSc7XG5pbXBvcnQgeyBJU3RhdHVzQmFyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdHVzYmFyJztcbmltcG9ydCB7IElUcmFuc2xhdG9yLCBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGFkZEljb24sIGNsZWFySWNvbiwgSFRNTFNlbGVjdCwgbGlzdEljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMb2dDb25zb2xlU3RhdHVzIH0gZnJvbSAnLi9zdGF0dXMnO1xuY29uc3QgTE9HX0NPTlNPTEVfUExVR0lOX0lEID0gJ0BqdXB5dGVybGFiL2xvZ2NvbnNvbGUtZXh0ZW5zaW9uOnBsdWdpbic7XG4vKipcbiAqIFRoZSBjb21tYW5kIElEcyB1c2VkIGJ5IHRoZSBwbHVnaW4uXG4gKi9cbnZhciBDb21tYW5kSURzO1xuKGZ1bmN0aW9uIChDb21tYW5kSURzKSB7XG4gICAgQ29tbWFuZElEcy5hZGRDaGVja3BvaW50ID0gJ2xvZ2NvbnNvbGU6YWRkLWNoZWNrcG9pbnQnO1xuICAgIENvbW1hbmRJRHMuY2xlYXIgPSAnbG9nY29uc29sZTpjbGVhcic7XG4gICAgQ29tbWFuZElEcy5vcGVuID0gJ2xvZ2NvbnNvbGU6b3Blbic7XG4gICAgQ29tbWFuZElEcy5zZXRMZXZlbCA9ICdsb2djb25zb2xlOnNldC1sZXZlbCc7XG59KShDb21tYW5kSURzIHx8IChDb21tYW5kSURzID0ge30pKTtcbi8qKlxuICogVGhlIExvZyBDb25zb2xlIGV4dGVuc2lvbi5cbiAqL1xuY29uc3QgbG9nQ29uc29sZVBsdWdpbiA9IHtcbiAgICBhY3RpdmF0ZTogYWN0aXZhdGVMb2dDb25zb2xlLFxuICAgIGlkOiBMT0dfQ09OU09MRV9QTFVHSU5fSUQsXG4gICAgcHJvdmlkZXM6IElMb2dnZXJSZWdpc3RyeSxcbiAgICByZXF1aXJlczogW0lMYWJTaGVsbCwgSVJlbmRlck1pbWVSZWdpc3RyeSwgSU5vdGVib29rVHJhY2tlciwgSVRyYW5zbGF0b3JdLFxuICAgIG9wdGlvbmFsOiBbSUNvbW1hbmRQYWxldHRlLCBJTGF5b3V0UmVzdG9yZXIsIElTZXR0aW5nUmVnaXN0cnksIElTdGF0dXNCYXJdLFxuICAgIGF1dG9TdGFydDogdHJ1ZVxufTtcbi8qKlxuICogQWN0aXZhdGUgdGhlIExvZyBDb25zb2xlIGV4dGVuc2lvbi5cbiAqL1xuZnVuY3Rpb24gYWN0aXZhdGVMb2dDb25zb2xlKGFwcCwgbGFiU2hlbGwsIHJlbmRlcm1pbWUsIG5idHJhY2tlciwgdHJhbnNsYXRvciwgcGFsZXR0ZSwgcmVzdG9yZXIsIHNldHRpbmdSZWdpc3RyeSwgc3RhdHVzQmFyKSB7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBsZXQgbG9nQ29uc29sZVdpZGdldCA9IG51bGw7XG4gICAgbGV0IGxvZ0NvbnNvbGVQYW5lbCA9IG51bGw7XG4gICAgY29uc3QgbG9nZ2VyUmVnaXN0cnkgPSBuZXcgTG9nZ2VyUmVnaXN0cnkoe1xuICAgICAgICBkZWZhdWx0UmVuZGVybWltZTogcmVuZGVybWltZSxcbiAgICAgICAgLy8gVGhlIG1heExlbmd0aCBpcyByZXNldCBiZWxvdyBmcm9tIHNldHRpbmdzXG4gICAgICAgIG1heExlbmd0aDogMTAwMFxuICAgIH0pO1xuICAgIGNvbnN0IHRyYWNrZXIgPSBuZXcgV2lkZ2V0VHJhY2tlcih7XG4gICAgICAgIG5hbWVzcGFjZTogJ2xvZ2NvbnNvbGUnXG4gICAgfSk7XG4gICAgaWYgKHJlc3RvcmVyKSB7XG4gICAgICAgIHZvaWQgcmVzdG9yZXIucmVzdG9yZSh0cmFja2VyLCB7XG4gICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLm9wZW4sXG4gICAgICAgICAgICBuYW1lOiAoKSA9PiAnbG9nY29uc29sZSdcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHN0YXR1cyA9IG5ldyBMb2dDb25zb2xlU3RhdHVzKHtcbiAgICAgICAgbG9nZ2VyUmVnaXN0cnk6IGxvZ2dlclJlZ2lzdHJ5LFxuICAgICAgICBoYW5kbGVDbGljazogKCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKCFsb2dDb25zb2xlV2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgY3JlYXRlTG9nQ29uc29sZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydE1vZGU6ICdzcGxpdC1ib3R0b20nLFxuICAgICAgICAgICAgICAgICAgICByZWY6IChfYSA9IGFwcC5zaGVsbC5jdXJyZW50V2lkZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFwcC5zaGVsbC5hY3RpdmF0ZUJ5SWQobG9nQ29uc29sZVdpZGdldC5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRyYW5zbGF0b3JcbiAgICB9KTtcbiAgICBjb25zdCBjcmVhdGVMb2dDb25zb2xlV2lkZ2V0ID0gKG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgICAgICBsb2dDb25zb2xlUGFuZWwgPSBuZXcgTG9nQ29uc29sZVBhbmVsKGxvZ2dlclJlZ2lzdHJ5LCB0cmFuc2xhdG9yKTtcbiAgICAgICAgbG9nQ29uc29sZVBhbmVsLnNvdXJjZSA9XG4gICAgICAgICAgICBvcHRpb25zLnNvdXJjZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLnNvdXJjZVxuICAgICAgICAgICAgICAgIDogbmJ0cmFja2VyLmN1cnJlbnRXaWRnZXRcbiAgICAgICAgICAgICAgICAgICAgPyBuYnRyYWNrZXIuY3VycmVudFdpZGdldC5jb250ZXh0LnBhdGhcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBsb2dDb25zb2xlV2lkZ2V0ID0gbmV3IE1haW5BcmVhV2lkZ2V0KHsgY29udGVudDogbG9nQ29uc29sZVBhbmVsIH0pO1xuICAgICAgICBsb2dDb25zb2xlV2lkZ2V0LmFkZENsYXNzKCdqcC1Mb2dDb25zb2xlJyk7XG4gICAgICAgIGxvZ0NvbnNvbGVXaWRnZXQudGl0bGUuY2xvc2FibGUgPSB0cnVlO1xuICAgICAgICBsb2dDb25zb2xlV2lkZ2V0LnRpdGxlLmljb24gPSBsaXN0SWNvbjtcbiAgICAgICAgbG9nQ29uc29sZVdpZGdldC50aXRsZS5sYWJlbCA9IHRyYW5zLl9fKCdMb2cgQ29uc29sZScpO1xuICAgICAgICBjb25zdCBhZGRDaGVja3BvaW50QnV0dG9uID0gbmV3IENvbW1hbmRUb29sYmFyQnV0dG9uKHtcbiAgICAgICAgICAgIGNvbW1hbmRzOiBhcHAuY29tbWFuZHMsXG4gICAgICAgICAgICBpZDogQ29tbWFuZElEcy5hZGRDaGVja3BvaW50XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBjbGVhckJ1dHRvbiA9IG5ldyBDb21tYW5kVG9vbGJhckJ1dHRvbih7XG4gICAgICAgICAgICBjb21tYW5kczogYXBwLmNvbW1hbmRzLFxuICAgICAgICAgICAgaWQ6IENvbW1hbmRJRHMuY2xlYXJcbiAgICAgICAgfSk7XG4gICAgICAgIGxvZ0NvbnNvbGVXaWRnZXQudG9vbGJhci5hZGRJdGVtKCdsYWItbG9nLWNvbnNvbGUtYWRkLWNoZWNrcG9pbnQnLCBhZGRDaGVja3BvaW50QnV0dG9uKTtcbiAgICAgICAgbG9nQ29uc29sZVdpZGdldC50b29sYmFyLmFkZEl0ZW0oJ2xhYi1sb2ctY29uc29sZS1jbGVhcicsIGNsZWFyQnV0dG9uKTtcbiAgICAgICAgbG9nQ29uc29sZVdpZGdldC50b29sYmFyLmFkZEl0ZW0oJ2xldmVsJywgbmV3IExvZ0xldmVsU3dpdGNoZXIobG9nQ29uc29sZVdpZGdldC5jb250ZW50LCB0cmFuc2xhdG9yKSk7XG4gICAgICAgIGxvZ0NvbnNvbGVQYW5lbC5zb3VyY2VDaGFuZ2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgYXBwLmNvbW1hbmRzLm5vdGlmeUNvbW1hbmRDaGFuZ2VkKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBsb2dDb25zb2xlUGFuZWwuc291cmNlRGlzcGxheWVkLmNvbm5lY3QoKHBhbmVsLCB7IHNvdXJjZSwgdmVyc2lvbiB9KSA9PiB7XG4gICAgICAgICAgICBzdGF0dXMubW9kZWwuc291cmNlRGlzcGxheWVkKHNvdXJjZSwgdmVyc2lvbik7XG4gICAgICAgIH0pO1xuICAgICAgICBsb2dDb25zb2xlV2lkZ2V0LmRpc3Bvc2VkLmNvbm5lY3QoKCkgPT4ge1xuICAgICAgICAgICAgbG9nQ29uc29sZVdpZGdldCA9IG51bGw7XG4gICAgICAgICAgICBsb2dDb25zb2xlUGFuZWwgPSBudWxsO1xuICAgICAgICAgICAgYXBwLmNvbW1hbmRzLm5vdGlmeUNvbW1hbmRDaGFuZ2VkKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhcHAuc2hlbGwuYWRkKGxvZ0NvbnNvbGVXaWRnZXQsICdkb3duJywge1xuICAgICAgICAgICAgcmVmOiBvcHRpb25zLnJlZixcbiAgICAgICAgICAgIG1vZGU6IG9wdGlvbnMuaW5zZXJ0TW9kZVxuICAgICAgICB9KTtcbiAgICAgICAgdm9pZCB0cmFja2VyLmFkZChsb2dDb25zb2xlV2lkZ2V0KTtcbiAgICAgICAgYXBwLnNoZWxsLmFjdGl2YXRlQnlJZChsb2dDb25zb2xlV2lkZ2V0LmlkKTtcbiAgICAgICAgbG9nQ29uc29sZVdpZGdldC51cGRhdGUoKTtcbiAgICAgICAgYXBwLmNvbW1hbmRzLm5vdGlmeUNvbW1hbmRDaGFuZ2VkKCk7XG4gICAgfTtcbiAgICBhcHAuY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLm9wZW4sIHtcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdTaG93IExvZyBDb25zb2xlJyksXG4gICAgICAgIGV4ZWN1dGU6IChvcHRpb25zID0ge30pID0+IHtcbiAgICAgICAgICAgIC8vIFRvZ2dsZSB0aGUgZGlzcGxheVxuICAgICAgICAgICAgaWYgKGxvZ0NvbnNvbGVXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICBsb2dDb25zb2xlV2lkZ2V0LmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNyZWF0ZUxvZ0NvbnNvbGVXaWRnZXQob3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzVG9nZ2xlZDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGxvZ0NvbnNvbGVXaWRnZXQgIT09IG51bGw7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBhcHAuY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmFkZENoZWNrcG9pbnQsIHtcbiAgICAgICAgZXhlY3V0ZTogKCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgKF9hID0gbG9nQ29uc29sZVBhbmVsID09PSBudWxsIHx8IGxvZ0NvbnNvbGVQYW5lbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogbG9nQ29uc29sZVBhbmVsLmxvZ2dlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNoZWNrcG9pbnQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgaWNvbjogYWRkSWNvbixcbiAgICAgICAgaXNFbmFibGVkOiAoKSA9PiAhIWxvZ0NvbnNvbGVQYW5lbCAmJiBsb2dDb25zb2xlUGFuZWwuc291cmNlICE9PSBudWxsLFxuICAgICAgICBsYWJlbDogdHJhbnMuX18oJ0FkZCBDaGVja3BvaW50JylcbiAgICB9KTtcbiAgICBhcHAuY29tbWFuZHMuYWRkQ29tbWFuZChDb21tYW5kSURzLmNsZWFyLCB7XG4gICAgICAgIGV4ZWN1dGU6ICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIChfYSA9IGxvZ0NvbnNvbGVQYW5lbCA9PT0gbnVsbCB8fCBsb2dDb25zb2xlUGFuZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxvZ0NvbnNvbGVQYW5lbC5sb2dnZXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGVhcigpO1xuICAgICAgICB9LFxuICAgICAgICBpY29uOiBjbGVhckljb24sXG4gICAgICAgIGlzRW5hYmxlZDogKCkgPT4gISFsb2dDb25zb2xlUGFuZWwgJiYgbG9nQ29uc29sZVBhbmVsLnNvdXJjZSAhPT0gbnVsbCxcbiAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdDbGVhciBMb2cnKVxuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHRvVGl0bGVDYXNlKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPT09IDAgPyB2YWx1ZSA6IHZhbHVlWzBdLnRvVXBwZXJDYXNlKCkgKyB2YWx1ZS5zbGljZSgxKTtcbiAgICB9XG4gICAgYXBwLmNvbW1hbmRzLmFkZENvbW1hbmQoQ29tbWFuZElEcy5zZXRMZXZlbCwge1xuICAgICAgICAvLyBUT0RPOiBmaW5kIGdvb2QgaWNvbiBjbGFzc1xuICAgICAgICBleGVjdXRlOiAoYXJncykgPT4ge1xuICAgICAgICAgICAgaWYgKGxvZ0NvbnNvbGVQYW5lbCA9PT0gbnVsbCB8fCBsb2dDb25zb2xlUGFuZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxvZ0NvbnNvbGVQYW5lbC5sb2dnZXIpIHtcbiAgICAgICAgICAgICAgICBsb2dDb25zb2xlUGFuZWwubG9nZ2VyLmxldmVsID0gYXJncy5sZXZlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaXNFbmFibGVkOiAoKSA9PiAhIWxvZ0NvbnNvbGVQYW5lbCAmJiBsb2dDb25zb2xlUGFuZWwuc291cmNlICE9PSBudWxsLFxuICAgICAgICBsYWJlbDogYXJncyA9PiB0cmFucy5fXygnU2V0IExvZyBMZXZlbCB0byAlMScsIHRvVGl0bGVDYXNlKGFyZ3MubGV2ZWwpKVxuICAgIH0pO1xuICAgIGlmIChwYWxldHRlKSB7XG4gICAgICAgIHBhbGV0dGUuYWRkSXRlbSh7XG4gICAgICAgICAgICBjb21tYW5kOiBDb21tYW5kSURzLm9wZW4sXG4gICAgICAgICAgICBjYXRlZ29yeTogdHJhbnMuX18oJ01haW4gQXJlYScpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoc3RhdHVzQmFyKSB7XG4gICAgICAgIHN0YXR1c0Jhci5yZWdpc3RlclN0YXR1c0l0ZW0oJ0BqdXB5dGVybGFiL2xvZ2NvbnNvbGUtZXh0ZW5zaW9uOnN0YXR1cycsIHtcbiAgICAgICAgICAgIGl0ZW06IHN0YXR1cyxcbiAgICAgICAgICAgIGFsaWduOiAnbGVmdCcsXG4gICAgICAgICAgICBpc0FjdGl2ZTogKCkgPT4geyB2YXIgX2E7IHJldHVybiAoKF9hID0gc3RhdHVzLm1vZGVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudmVyc2lvbikgPiAwOyB9LFxuICAgICAgICAgICAgYWN0aXZlU3RhdGVDaGFuZ2VkOiBzdGF0dXMubW9kZWwuc3RhdGVDaGFuZ2VkXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRTb3VyY2UobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKGxvZ0NvbnNvbGVXaWRnZXQgJiYgbmV3VmFsdWUgPT09IGxvZ0NvbnNvbGVXaWRnZXQpIHtcbiAgICAgICAgICAgIC8vIERvIG5vdCBjaGFuZ2UgYW55dGhpbmcgaWYgd2UgYXJlIGp1c3QgZm9jdXNpbmcgb24gb3Vyc2VsdmVzXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNvdXJjZTtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIG5idHJhY2tlci5oYXMobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICBzb3VyY2UgPSBuZXdWYWx1ZS5jb250ZXh0LnBhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzb3VyY2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2dDb25zb2xlUGFuZWwpIHtcbiAgICAgICAgICAgIGxvZ0NvbnNvbGVQYW5lbC5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdHVzLm1vZGVsLnNvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgdm9pZCBhcHAucmVzdG9yZWQudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIFNldCBzb3VyY2Ugb25seSBhZnRlciBhcHAgaXMgcmVzdG9yZWQgaW4gb3JkZXIgdG8gYWxsb3cgcmVzdG9yZXIgdG9cbiAgICAgICAgLy8gcmVzdG9yZSBwcmV2aW91cyBzb3VyY2UgZmlyc3QsIHdoaWNoIG1heSBzZXQgdGhlIHJlbmRlcmVyXG4gICAgICAgIHNldFNvdXJjZShsYWJTaGVsbC5jdXJyZW50V2lkZ2V0KTtcbiAgICAgICAgbGFiU2hlbGwuY3VycmVudENoYW5nZWQuY29ubmVjdCgoXywgeyBuZXdWYWx1ZSB9KSA9PiBzZXRTb3VyY2UobmV3VmFsdWUpKTtcbiAgICB9KTtcbiAgICBpZiAoc2V0dGluZ1JlZ2lzdHJ5KSB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZVNldHRpbmdzID0gKHNldHRpbmdzKSA9PiB7XG4gICAgICAgICAgICBsb2dnZXJSZWdpc3RyeS5tYXhMZW5ndGggPSBzZXR0aW5ncy5nZXQoJ21heExvZ0VudHJpZXMnKVxuICAgICAgICAgICAgICAgIC5jb21wb3NpdGU7XG4gICAgICAgICAgICBzdGF0dXMubW9kZWwuZmxhc2hFbmFibGVkID0gc2V0dGluZ3MuZ2V0KCdmbGFzaCcpLmNvbXBvc2l0ZTtcbiAgICAgICAgfTtcbiAgICAgICAgUHJvbWlzZS5hbGwoW3NldHRpbmdSZWdpc3RyeS5sb2FkKExPR19DT05TT0xFX1BMVUdJTl9JRCksIGFwcC5yZXN0b3JlZF0pXG4gICAgICAgICAgICAudGhlbigoW3NldHRpbmdzXSkgPT4ge1xuICAgICAgICAgICAgdXBkYXRlU2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgICAgICAgICAgc2V0dGluZ3MuY2hhbmdlZC5jb25uZWN0KHNldHRpbmdzID0+IHtcbiAgICAgICAgICAgICAgICB1cGRhdGVTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHJlYXNvbi5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBsb2dnZXJSZWdpc3RyeTtcbn1cbi8qKlxuICogQSB0b29sYmFyIHdpZGdldCB0aGF0IHN3aXRjaGVzIGxvZyBsZXZlbHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBMb2dMZXZlbFN3aXRjaGVyIGV4dGVuZHMgUmVhY3RXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBjZWxsIHR5cGUgc3dpdGNoZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkZ2V0LCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYGNoYW5nZWAgZXZlbnRzIGZvciB0aGUgSFRNTFNlbGVjdCBjb21wb25lbnQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xvZ0NvbnNvbGUubG9nZ2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nQ29uc29sZS5sb2dnZXIubGV2ZWwgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGBrZXlkb3duYCBldmVudHMgZm9yIHRoZSBIVE1MU2VsZWN0IGNvbXBvbmVudC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaGFuZGxlS2V5RG93biA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9nQ29uc29sZS5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9pZCA9IGBsZXZlbC0ke1VVSUQudXVpZDQoKX1gO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLl90cmFucyA9IHRoaXMudHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLUxvZ0NvbnNvbGUtdG9vbGJhckxvZ0xldmVsJyk7XG4gICAgICAgIHRoaXMuX2xvZ0NvbnNvbGUgPSB3aWRnZXQ7XG4gICAgICAgIGlmICh3aWRnZXQuc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHdpZGdldC5zb3VyY2VDaGFuZ2VkLmNvbm5lY3QodGhpcy5fdXBkYXRlU291cmNlLCB0aGlzKTtcbiAgICB9XG4gICAgX3VwZGF0ZVNvdXJjZShzZW5kZXIsIHsgb2xkVmFsdWUsIG5ld1ZhbHVlIH0pIHtcbiAgICAgICAgLy8gVHJhbnNmZXIgc3RhdGVDaGFuZ2VkIGhhbmRsZXIgdG8gbmV3IHNvdXJjZSBsb2dnZXJcbiAgICAgICAgaWYgKG9sZFZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBsb2dnZXIgPSBzZW5kZXIubG9nZ2VyUmVnaXN0cnkuZ2V0TG9nZ2VyKG9sZFZhbHVlKTtcbiAgICAgICAgICAgIGxvZ2dlci5zdGF0ZUNoYW5nZWQuZGlzY29ubmVjdCh0aGlzLnVwZGF0ZSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBsb2dnZXIgPSBzZW5kZXIubG9nZ2VyUmVnaXN0cnkuZ2V0TG9nZ2VyKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGxvZ2dlci5zdGF0ZUNoYW5nZWQuY29ubmVjdCh0aGlzLnVwZGF0ZSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBsb2dnZXIgPSB0aGlzLl9sb2dDb25zb2xlLmxvZ2dlcjtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImxhYmVsXCIsIHsgaHRtbEZvcjogdGhpcy5faWQsIGNsYXNzTmFtZTogbG9nZ2VyID09PSBudWxsXG4gICAgICAgICAgICAgICAgICAgID8gJ2pwLUxvZ0NvbnNvbGUtdG9vbGJhckxvZ0xldmVsLWRpc2FibGVkJ1xuICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCB9LCB0aGlzLl90cmFucy5fXygnTG9nIExldmVsOicpKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSFRNTFNlbGVjdCwgeyBpZDogdGhpcy5faWQsIGNsYXNzTmFtZTogXCJqcC1Mb2dDb25zb2xlLXRvb2xiYXJMb2dMZXZlbERyb3Bkb3duXCIsIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSwgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleURvd24sIHZhbHVlOiBsb2dnZXIgPT09IG51bGwgfHwgbG9nZ2VyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsb2dnZXIubGV2ZWwsIFwiYXJpYS1sYWJlbFwiOiB0aGlzLl90cmFucy5fXygnTG9nIGxldmVsJyksIGRpc2FibGVkOiBsb2dnZXIgPT09IG51bGwsIG9wdGlvbnM6IGxvZ2dlciA9PT0gbnVsbFxuICAgICAgICAgICAgICAgICAgICA/IFtdXG4gICAgICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMuX3RyYW5zLl9fKCdDcml0aWNhbCcpLCAnQ3JpdGljYWwnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLl90cmFucy5fXygnRXJyb3InKSwgJ0Vycm9yJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbdGhpcy5fdHJhbnMuX18oJ1dhcm5pbmcnKSwgJ1dhcm5pbmcnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt0aGlzLl90cmFucy5fXygnSW5mbycpLCAnSW5mbyddLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3RoaXMuX3RyYW5zLl9fKCdEZWJ1ZycpLCAnRGVidWcnXVxuICAgICAgICAgICAgICAgICAgICBdLm1hcChkYXRhID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogZGF0YVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhWzFdLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgfSkpIH0pKSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgbG9nQ29uc29sZVBsdWdpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFZEb21Nb2RlbCwgVkRvbVJlbmRlcmVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgR3JvdXBJdGVtLCBpbnRlcmFjdGl2ZUl0ZW0sIFRleHRJdGVtIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdHVzYmFyJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgbGlzdEljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vKipcbiAqIEEgcHVyZSBmdW5jdGlvbmFsIGNvbXBvbmVudCBmb3IgYSBMb2cgQ29uc29sZSBzdGF0dXMgaXRlbS5cbiAqXG4gKiBAcGFyYW0gcHJvcHMgLSB0aGUgcHJvcHMgZm9yIHRoZSBjb21wb25lbnQuXG4gKlxuICogQHJldHVybnMgYSB0c3ggY29tcG9uZW50IGZvciByZW5kZXJpbmcgdGhlIExvZyBDb25zb2xlIHN0YXR1cy5cbiAqL1xuZnVuY3Rpb24gTG9nQ29uc29sZVN0YXR1c0NvbXBvbmVudChwcm9wcykge1xuICAgIGNvbnN0IHRyYW5zbGF0b3IgPSBwcm9wcy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgbGV0IHRpdGxlID0gJyc7XG4gICAgaWYgKHByb3BzLm5ld01lc3NhZ2VzID4gMCkge1xuICAgICAgICB0aXRsZSA9IHRyYW5zLl9fKCclMSBuZXcgbWVzc2FnZXMsICUyIGxvZyBlbnRyaWVzIGZvciAlMycsIHByb3BzLm5ld01lc3NhZ2VzLCBwcm9wcy5sb2dFbnRyaWVzLCBwcm9wcy5zb3VyY2UpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGl0bGUgKz0gdHJhbnMuX18oJyUxIGxvZyBlbnRyaWVzIGZvciAlMicsIHByb3BzLmxvZ0VudHJpZXMsIHByb3BzLnNvdXJjZSk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChHcm91cEl0ZW0sIHsgc3BhY2luZzogMCwgb25DbGljazogcHJvcHMuaGFuZGxlQ2xpY2ssIHRpdGxlOiB0aXRsZSB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KGxpc3RJY29uLnJlYWN0LCB7IHRvcDogJzJweCcsIHN0eWxlc2hlZXQ6ICdzdGF0dXNCYXInIH0pLFxuICAgICAgICBwcm9wcy5uZXdNZXNzYWdlcyA+IDAgPyBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRJdGVtLCB7IHNvdXJjZTogcHJvcHMubmV3TWVzc2FnZXMgfSkgOiBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsKSkpO1xufVxuLyoqXG4gKiBBIFZEb21SZW5kZXJlciB3aWRnZXQgZm9yIGRpc3BsYXlpbmcgdGhlIHN0YXR1cyBvZiBMb2cgQ29uc29sZSBsb2dzLlxuICovXG5leHBvcnQgY2xhc3MgTG9nQ29uc29sZVN0YXR1cyBleHRlbmRzIFZEb21SZW5kZXJlciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IHRoZSBsb2cgY29uc29sZSBzdGF0dXMgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgc3RhdHVzIHdpZGdldCBpbml0aWFsaXphdGlvbiBvcHRpb25zLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIobmV3IExvZ0NvbnNvbGVTdGF0dXMuTW9kZWwob3B0aW9ucy5sb2dnZXJSZWdpc3RyeSkpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX2hhbmRsZUNsaWNrID0gb3B0aW9ucy5oYW5kbGVDbGljaztcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhpbnRlcmFjdGl2ZUl0ZW0pO1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1Mb2dDb25zb2xlU3RhdHVzSXRlbScpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIGxvZyBjb25zb2xlIHN0YXR1cyBpdGVtLlxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWwgPT09IG51bGwgfHwgdGhpcy5tb2RlbC52ZXJzaW9uID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGZsYXNoRW5hYmxlZCwgbWVzc2FnZXMsIHNvdXJjZSwgdmVyc2lvbiwgdmVyc2lvbkRpc3BsYXllZCwgdmVyc2lvbk5vdGlmaWVkIH0gPSB0aGlzLm1vZGVsO1xuICAgICAgICBpZiAoc291cmNlICE9PSBudWxsICYmIGZsYXNoRW5hYmxlZCAmJiB2ZXJzaW9uID4gdmVyc2lvbk5vdGlmaWVkKSB7XG4gICAgICAgICAgICB0aGlzLl9mbGFzaEhpZ2hsaWdodCgpO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5zb3VyY2VOb3RpZmllZChzb3VyY2UsIHZlcnNpb24pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNvdXJjZSAhPT0gbnVsbCAmJiBmbGFzaEVuYWJsZWQgJiYgdmVyc2lvbiA+IHZlcnNpb25EaXNwbGF5ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dIaWdobGlnaHRlZCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fY2xlYXJIaWdobGlnaHQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTG9nQ29uc29sZVN0YXR1c0NvbXBvbmVudCwgeyBoYW5kbGVDbGljazogdGhpcy5faGFuZGxlQ2xpY2ssIGxvZ0VudHJpZXM6IG1lc3NhZ2VzLCBuZXdNZXNzYWdlczogdmVyc2lvbiAtIHZlcnNpb25EaXNwbGF5ZWQsIHNvdXJjZTogdGhpcy5tb2RlbC5zb3VyY2UsIHRyYW5zbGF0b3I6IHRoaXMudHJhbnNsYXRvciB9KSk7XG4gICAgfVxuICAgIF9mbGFzaEhpZ2hsaWdodCgpIHtcbiAgICAgICAgdGhpcy5fc2hvd0hpZ2hsaWdodGVkKCk7XG4gICAgICAgIC8vIFRvIG1ha2Ugc3VyZSB0aGUgYnJvd3NlciB0cmlnZ2VycyB0aGUgYW5pbWF0aW9uLCB3ZSByZW1vdmUgdGhlIGNsYXNzLFxuICAgICAgICAvLyB3YWl0IGZvciBhbiBhbmltYXRpb24gZnJhbWUsIHRoZW4gYWRkIGl0IGJhY2tcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnanAtTG9nQ29uc29sZS1mbGFzaCcpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtTG9nQ29uc29sZS1mbGFzaCcpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgX3Nob3dIaWdobGlnaHRlZCgpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtbW9kLXNlbGVjdGVkJyk7XG4gICAgfVxuICAgIF9jbGVhckhpZ2hsaWdodCgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnanAtTG9nQ29uc29sZS1mbGFzaCcpO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdqcC1tb2Qtc2VsZWN0ZWQnKTtcbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBMb2cgQ29uc29sZSBsb2cgc3RhdHVzLlxuICovXG4oZnVuY3Rpb24gKExvZ0NvbnNvbGVTdGF0dXMpIHtcbiAgICAvKipcbiAgICAgKiBBIFZEb21Nb2RlbCBmb3IgdGhlIExvZ0NvbnNvbGVTdGF0dXMgaXRlbS5cbiAgICAgKi9cbiAgICBjbGFzcyBNb2RlbCBleHRlbmRzIFZEb21Nb2RlbCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBuZXcgTG9nQ29uc29sZVN0YXR1cyBtb2RlbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGxvZ2dlclJlZ2lzdHJ5IC0gVGhlIGxvZ2dlciByZWdpc3RyeSBwcm92aWRpbmcgdGhlIGxvZ3MuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3Rvcihsb2dnZXJSZWdpc3RyeSkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBmbGFzaCBlbmFibGVtZW50IGNoYW5nZXMuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuZmxhc2hFbmFibGVkQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9mbGFzaEVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fc291cmNlID0gbnVsbDtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIHZpZXcgc3RhdHVzIG9mIGVhY2ggc291cmNlLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqICMjIyMgTm90ZXNcbiAgICAgICAgICAgICAqIEtleXMgYXJlIHNvdXJjZSBuYW1lcywgdmFsdWUgaXMgYSBsaXN0IG9mIHR3byBudW1iZXJzLiBUaGUgZmlyc3RcbiAgICAgICAgICAgICAqIHJlcHJlc2VudHMgdGhlIHZlcnNpb24gb2YgdGhlIG1lc3NhZ2VzIHRoYXQgd2FzIGxhc3QgZGlzcGxheWVkIHRvIHRoZVxuICAgICAgICAgICAgICogdXNlciwgdGhlIHNlY29uZCByZXByZXNlbnRzIHRoZSB2ZXJzaW9uIHRoYXQgd2UgbGFzdCBub3RpZmllZCB0aGUgdXNlclxuICAgICAgICAgICAgICogYWJvdXQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZVZlcnNpb24gPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXJSZWdpc3RyeSA9IGxvZ2dlclJlZ2lzdHJ5O1xuICAgICAgICAgICAgdGhpcy5fbG9nZ2VyUmVnaXN0cnkucmVnaXN0cnlDaGFuZ2VkLmNvbm5lY3QodGhpcy5faGFuZGxlTG9nUmVnaXN0cnlDaGFuZ2UsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlTG9nUmVnaXN0cnlDaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogTnVtYmVyIG9mIG1lc3NhZ2VzIGN1cnJlbnRseSBpbiB0aGUgY3VycmVudCBzb3VyY2UuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgbWVzc2FnZXMoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc291cmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBsb2dnZXIgPSB0aGlzLl9sb2dnZXJSZWdpc3RyeS5nZXRMb2dnZXIodGhpcy5fc291cmNlKTtcbiAgICAgICAgICAgIHJldHVybiBsb2dnZXIubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgbnVtYmVyIG9mIG1lc3NhZ2VzIGV2ZXIgc3RvcmVkIGJ5IHRoZSBjdXJyZW50IHNvdXJjZS5cbiAgICAgICAgICovXG4gICAgICAgIGdldCB2ZXJzaW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NvdXJjZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbG9nZ2VyID0gdGhpcy5fbG9nZ2VyUmVnaXN0cnkuZ2V0TG9nZ2VyKHRoaXMuX3NvdXJjZSk7XG4gICAgICAgICAgICByZXR1cm4gbG9nZ2VyLnZlcnNpb247XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBuYW1lIG9mIHRoZSBhY3RpdmUgbG9nIHNvdXJjZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IHNvdXJjZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHNvdXJjZShuYW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc291cmNlID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc291cmNlID0gbmFtZTtcbiAgICAgICAgICAgIC8vIHJlZnJlc2ggcmVuZGVyaW5nXG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBsYXN0IHNvdXJjZSB2ZXJzaW9uIHRoYXQgd2FzIGRpc3BsYXllZC5cbiAgICAgICAgICovXG4gICAgICAgIGdldCB2ZXJzaW9uRGlzcGxheWVkKCkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zb3VyY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoX2IgPSAoX2EgPSB0aGlzLl9zb3VyY2VWZXJzaW9uLmdldCh0aGlzLl9zb3VyY2UpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGFzdERpc3BsYXllZCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogMDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGxhc3Qgc291cmNlIHZlcnNpb24gd2Ugbm90aWZpZWQgdGhlIHVzZXIgYWJvdXQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgdmVyc2lvbk5vdGlmaWVkKCkge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zb3VyY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoX2IgPSAoX2EgPSB0aGlzLl9zb3VyY2VWZXJzaW9uLmdldCh0aGlzLl9zb3VyY2UpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGFzdE5vdGlmaWVkKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiAwO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGbGFnIHRvIHRvZ2dsZSBmbGFzaGluZyB3aGVuIG5ldyBsb2dzIGFkZGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IGZsYXNoRW5hYmxlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mbGFzaEVuYWJsZWQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGZsYXNoRW5hYmxlZChlbmFibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZmxhc2hFbmFibGVkID09PSBlbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZmxhc2hFbmFibGVkID0gZW5hYmxlZDtcbiAgICAgICAgICAgIHRoaXMuZmxhc2hFbmFibGVkQ2hhbmdlZC5lbWl0KCk7XG4gICAgICAgICAgICAvLyByZWZyZXNoIHJlbmRlcmluZ1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNvcmQgdGhlIGxhc3Qgc291cmNlIHZlcnNpb24gZGlzcGxheWVkIHRvIHRoZSB1c2VyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gc291cmNlIC0gVGhlIG5hbWUgb2YgdGhlIGxvZyBzb3VyY2UuXG4gICAgICAgICAqIEBwYXJhbSB2ZXJzaW9uIC0gVGhlIHZlcnNpb24gb2YgdGhlIGxvZyB0aGF0IHdhcyBkaXNwbGF5ZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqICMjIyMgTm90ZXNcbiAgICAgICAgICogVGhpcyB3aWxsIGFsc28gdXBkYXRlIHRoZSBsYXN0IG5vdGlmaWVkIHZlcnNpb24gc28gdGhhdCB0aGUgbGFzdFxuICAgICAgICAgKiBub3RpZmllZCB2ZXJzaW9uIGlzIGFsd2F5cyBhdCBsZWFzdCB0aGUgbGFzdCBkaXNwbGF5ZWQgdmVyc2lvbi5cbiAgICAgICAgICovXG4gICAgICAgIHNvdXJjZURpc3BsYXllZChzb3VyY2UsIHZlcnNpb24pIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgPT09IG51bGwgfHwgdmVyc2lvbiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZlcnNpb25zID0gdGhpcy5fc291cmNlVmVyc2lvbi5nZXQoc291cmNlKTtcbiAgICAgICAgICAgIGxldCBjaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh2ZXJzaW9ucy5sYXN0RGlzcGxheWVkIDwgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgIHZlcnNpb25zLmxhc3REaXNwbGF5ZWQgPSB2ZXJzaW9uO1xuICAgICAgICAgICAgICAgIGNoYW5nZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmVyc2lvbnMubGFzdE5vdGlmaWVkIDwgdmVyc2lvbikge1xuICAgICAgICAgICAgICAgIHZlcnNpb25zLmxhc3ROb3RpZmllZCA9IHZlcnNpb247XG4gICAgICAgICAgICAgICAgY2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaGFuZ2UgJiYgc291cmNlID09PSB0aGlzLl9zb3VyY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlY29yZCBhIHNvdXJjZSB2ZXJzaW9uIHdlIG5vdGlmaWVkIHRoZSB1c2VyIGFib3V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gc291cmNlIC0gVGhlIG5hbWUgb2YgdGhlIGxvZyBzb3VyY2UuXG4gICAgICAgICAqIEBwYXJhbSB2ZXJzaW9uIC0gVGhlIHZlcnNpb24gb2YgdGhlIGxvZy5cbiAgICAgICAgICovXG4gICAgICAgIHNvdXJjZU5vdGlmaWVkKHNvdXJjZSwgdmVyc2lvbikge1xuICAgICAgICAgICAgaWYgKHNvdXJjZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZlcnNpb25zID0gdGhpcy5fc291cmNlVmVyc2lvbi5nZXQoc291cmNlKTtcbiAgICAgICAgICAgIGlmICh2ZXJzaW9ucy5sYXN0Tm90aWZpZWQgPCB2ZXJzaW9uKSB7XG4gICAgICAgICAgICAgICAgdmVyc2lvbnMubGFzdE5vdGlmaWVkID0gdmVyc2lvbjtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlID09PSB0aGlzLl9zb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBfaGFuZGxlTG9nUmVnaXN0cnlDaGFuZ2UoKSB7XG4gICAgICAgICAgICBjb25zdCBsb2dnZXJzID0gdGhpcy5fbG9nZ2VyUmVnaXN0cnkuZ2V0TG9nZ2VycygpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsb2dnZXIgb2YgbG9nZ2Vycykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fc291cmNlVmVyc2lvbi5oYXMobG9nZ2VyLnNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nZ2VyLmNvbnRlbnRDaGFuZ2VkLmNvbm5lY3QodGhpcy5faGFuZGxlTG9nQ29udGVudENoYW5nZSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdXJjZVZlcnNpb24uc2V0KGxvZ2dlci5zb3VyY2UsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3REaXNwbGF5ZWQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0Tm90aWZpZWQ6IDBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIF9oYW5kbGVMb2dDb250ZW50Q2hhbmdlKHsgc291cmNlIH0sIGNoYW5nZSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZSA9PT0gdGhpcy5fc291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIExvZ0NvbnNvbGVTdGF0dXMuTW9kZWwgPSBNb2RlbDtcbn0pKExvZ0NvbnNvbGVTdGF0dXMgfHwgKExvZ0NvbnNvbGVTdGF0dXMgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhdHVzLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=