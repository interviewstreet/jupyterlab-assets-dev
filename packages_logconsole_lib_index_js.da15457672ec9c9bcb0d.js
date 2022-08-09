(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_logconsole_lib_index_js"],{

/***/ "../../packages/logconsole/lib/index.js":
/*!**********************************************!*\
  !*** ../../packages/logconsole/lib/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogOutputModel": () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_0__.LogOutputModel),
/* harmony export */   "Logger": () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_0__.Logger),
/* harmony export */   "LoggerOutputAreaModel": () => (/* reexport safe */ _logger__WEBPACK_IMPORTED_MODULE_0__.LoggerOutputAreaModel),
/* harmony export */   "LoggerRegistry": () => (/* reexport safe */ _registry__WEBPACK_IMPORTED_MODULE_1__.LoggerRegistry),
/* harmony export */   "ILoggerRegistry": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_2__.ILoggerRegistry),
/* harmony export */   "LogConsolePanel": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_3__.LogConsolePanel),
/* harmony export */   "ScrollingWidget": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_3__.ScrollingWidget)
/* harmony export */ });
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "../../packages/logconsole/lib/logger.js");
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registry */ "../../packages/logconsole/lib/registry.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tokens */ "../../packages/logconsole/lib/tokens.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./widget */ "../../packages/logconsole/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module logconsole
 */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/logconsole/lib/logger.js":
/*!***********************************************!*\
  !*** ../../packages/logconsole/lib/logger.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogOutputModel": () => (/* binding */ LogOutputModel),
/* harmony export */   "LoggerOutputAreaModel": () => (/* binding */ LoggerOutputAreaModel),
/* harmony export */   "Logger": () => (/* binding */ Logger)
/* harmony export */ });
/* harmony import */ var _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/outputarea */ "webpack/sharing/consume/default/@jupyterlab/outputarea/@jupyterlab/outputarea");
/* harmony import */ var _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};



/**
 * Log Output Model with timestamp which provides
 * item information for Output Area Model.
 */
class LogOutputModel extends _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__.OutputModel {
    /**
     * Construct a LogOutputModel.
     *
     * @param options - The model initialization options.
     */
    constructor(options) {
        super(options);
        this.timestamp = new Date(options.value.timestamp);
        this.level = options.value.level;
    }
}
/**
 * Implementation of `IContentFactory` for Output Area Model
 * which creates LogOutputModel instances.
 */
class LogConsoleModelContentFactory extends _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_0__.OutputAreaModel.ContentFactory {
    /**
     * Create a rendermime output model from notebook output.
     */
    createOutputModel(options) {
        return new LogOutputModel(options);
    }
}
/**
 * Output Area Model implementation which is able to
 * limit number of outputs stored.
 */
class LoggerOutputAreaModel extends _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_0__.OutputAreaModel {
    constructor(_a) {
        var { maxLength } = _a, options = __rest(_a, ["maxLength"]);
        super(options);
        this.maxLength = maxLength;
    }
    /**
     * Add an output, which may be combined with previous output.
     *
     * @returns The total number of outputs.
     *
     * #### Notes
     * The output bundle is copied. Contiguous stream outputs of the same `name`
     * are combined. The oldest outputs are possibly removed to ensure the total
     * number of outputs is at most `.maxLength`.
     */
    add(output) {
        super.add(output);
        this._applyMaxLength();
        return this.length;
    }
    /**
     * Whether an output should combine with the previous output.
     *
     * We combine if the two outputs are in the same second, which is the
     * resolution for our time display.
     */
    shouldCombine(options) {
        const { value, lastModel } = options;
        const oldSeconds = Math.trunc(lastModel.timestamp.getTime() / 1000);
        const newSeconds = Math.trunc(value.timestamp / 1000);
        return oldSeconds === newSeconds;
    }
    /**
     * Get an item at the specified index.
     */
    get(index) {
        return super.get(index);
    }
    /**
     * Maximum number of outputs to store in the model.
     */
    get maxLength() {
        return this._maxLength;
    }
    set maxLength(value) {
        this._maxLength = value;
        this._applyMaxLength();
    }
    /**
     * Manually apply length limit.
     */
    _applyMaxLength() {
        if (this.list.length > this._maxLength) {
            this.list.removeRange(0, this.list.length - this._maxLength);
        }
    }
}
/**
 * A concrete implementation of ILogger.
 */
class Logger {
    /**
     * Construct a Logger.
     *
     * @param source - The name of the log source.
     */
    constructor(options) {
        this._isDisposed = false;
        this._contentChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
        this._stateChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
        this._rendermime = null;
        this._version = 0;
        this._level = 'warning';
        this.source = options.source;
        this.outputAreaModel = new LoggerOutputAreaModel({
            contentFactory: new LogConsoleModelContentFactory(),
            maxLength: options.maxLength
        });
    }
    /**
     * The maximum number of outputs stored.
     *
     * #### Notes
     * Oldest entries will be trimmed to ensure the length is at most
     * `.maxLength`.
     */
    get maxLength() {
        return this.outputAreaModel.maxLength;
    }
    set maxLength(value) {
        this.outputAreaModel.maxLength = value;
    }
    /**
     * The level of outputs logged
     */
    get level() {
        return this._level;
    }
    set level(newValue) {
        const oldValue = this._level;
        if (oldValue === newValue) {
            return;
        }
        this._level = newValue;
        this._log({
            output: {
                output_type: 'display_data',
                data: {
                    'text/plain': `Log level set to ${newValue}`
                }
            },
            level: 'metadata'
        });
        this._stateChanged.emit({ name: 'level', oldValue, newValue });
    }
    /**
     * Number of outputs logged.
     */
    get length() {
        return this.outputAreaModel.length;
    }
    /**
     * A signal emitted when the list of log messages changes.
     */
    get contentChanged() {
        return this._contentChanged;
    }
    /**
     * A signal emitted when the log state changes.
     */
    get stateChanged() {
        return this._stateChanged;
    }
    /**
     * Rendermime to use when rendering outputs logged.
     */
    get rendermime() {
        return this._rendermime;
    }
    set rendermime(value) {
        if (value !== this._rendermime) {
            const oldValue = this._rendermime;
            const newValue = (this._rendermime = value);
            this._stateChanged.emit({ name: 'rendermime', oldValue, newValue });
        }
    }
    /**
     * The number of messages that have ever been stored.
     */
    get version() {
        return this._version;
    }
    /**
     * Log an output to logger.
     *
     * @param log - The output to be logged.
     */
    log(log) {
        // Filter by our current log level
        if (Private.LogLevel[log.level] <
            Private.LogLevel[this._level]) {
            return;
        }
        let output = null;
        switch (log.type) {
            case 'text':
                output = {
                    output_type: 'display_data',
                    data: {
                        'text/plain': log.data
                    }
                };
                break;
            case 'html':
                output = {
                    output_type: 'display_data',
                    data: {
                        'text/html': log.data
                    }
                };
                break;
            case 'output':
                output = log.data;
                break;
            default:
                break;
        }
        if (output) {
            this._log({
                output,
                level: log.level
            });
        }
    }
    /**
     * Clear all outputs logged.
     */
    clear() {
        this.outputAreaModel.clear(false);
        this._contentChanged.emit('clear');
    }
    /**
     * Add a checkpoint to the log.
     */
    checkpoint() {
        this._log({
            output: {
                output_type: 'display_data',
                data: {
                    'text/html': '<hr/>'
                }
            },
            level: 'metadata'
        });
    }
    /**
     * Whether the logger is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose the logger.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this.clear();
        this._rendermime = null;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal.clearData(this);
    }
    _log(options) {
        // First, make sure our version reflects the new message so things
        // triggering from the signals below have the correct version.
        this._version++;
        // Next, trigger any displays of the message
        this.outputAreaModel.add(Object.assign(Object.assign({}, options.output), { timestamp: Date.now(), level: options.level }));
        // Finally, tell people that the message was appended (and possibly
        // already displayed).
        this._contentChanged.emit('append');
    }
}
var Private;
(function (Private) {
    let LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["debug"] = 0] = "debug";
        LogLevel[LogLevel["info"] = 1] = "info";
        LogLevel[LogLevel["warning"] = 2] = "warning";
        LogLevel[LogLevel["error"] = 3] = "error";
        LogLevel[LogLevel["critical"] = 4] = "critical";
        LogLevel[LogLevel["metadata"] = 5] = "metadata";
    })(LogLevel = Private.LogLevel || (Private.LogLevel = {}));
})(Private || (Private = {}));
//# sourceMappingURL=logger.js.map

/***/ }),

/***/ "../../packages/logconsole/lib/registry.js":
/*!*************************************************!*\
  !*** ../../packages/logconsole/lib/registry.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoggerRegistry": () => (/* binding */ LoggerRegistry)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger */ "../../packages/logconsole/lib/logger.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.


/**
 * A concrete implementation of ILoggerRegistry.
 */
class LoggerRegistry {
    /**
     * Construct a LoggerRegistry.
     *
     * @param defaultRendermime - Default rendermime to render outputs
     * with when logger is not supplied with one.
     */
    constructor(options) {
        this._loggers = new Map();
        this._registryChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal(this);
        this._isDisposed = false;
        this._defaultRendermime = options.defaultRendermime;
        this._maxLength = options.maxLength;
    }
    /**
     * Get the logger for the specified source.
     *
     * @param source - The name of the log source.
     *
     * @returns The logger for the specified source.
     */
    getLogger(source) {
        const loggers = this._loggers;
        let logger = loggers.get(source);
        if (logger) {
            return logger;
        }
        logger = new _logger__WEBPACK_IMPORTED_MODULE_1__.Logger({ source, maxLength: this.maxLength });
        logger.rendermime = this._defaultRendermime;
        loggers.set(source, logger);
        this._registryChanged.emit('append');
        return logger;
    }
    /**
     * Get all loggers registered.
     *
     * @returns The array containing all registered loggers.
     */
    getLoggers() {
        return Array.from(this._loggers.values());
    }
    /**
     * A signal emitted when the logger registry changes.
     */
    get registryChanged() {
        return this._registryChanged;
    }
    /**
     * The max length for loggers.
     */
    get maxLength() {
        return this._maxLength;
    }
    set maxLength(value) {
        this._maxLength = value;
        this._loggers.forEach(logger => {
            logger.maxLength = value;
        });
    }
    /**
     * Whether the register is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose the registry and all loggers.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this._loggers.forEach(x => x.dispose());
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal.clearData(this);
    }
}
//# sourceMappingURL=registry.js.map

/***/ }),

/***/ "../../packages/logconsole/lib/tokens.js":
/*!***********************************************!*\
  !*** ../../packages/logconsole/lib/tokens.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ILoggerRegistry": () => (/* binding */ ILoggerRegistry)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The Logger Registry token.
 */
const ILoggerRegistry = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/logconsole:ILoggerRegistry');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/logconsole/lib/widget.js":
/*!***********************************************!*\
  !*** ../../packages/logconsole/lib/widget.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollingWidget": () => (/* binding */ ScrollingWidget),
/* harmony export */   "LogConsolePanel": () => (/* binding */ LogConsolePanel)
/* harmony export */ });
/* harmony import */ var _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/outputarea */ "webpack/sharing/consume/default/@jupyterlab/outputarea/@jupyterlab/outputarea");
/* harmony import */ var _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_3__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};




function toTitleCase(value) {
    return value.length === 0 ? value : value[0].toUpperCase() + value.slice(1);
}
/**
 * Log console output prompt implementation
 */
class LogConsoleOutputPrompt extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Widget {
    constructor() {
        super();
        this._timestampNode = document.createElement('div');
        this.node.append(this._timestampNode);
    }
    /**
     * Date & time when output is logged.
     */
    set timestamp(value) {
        this._timestamp = value;
        this._timestampNode.innerHTML = this._timestamp.toLocaleTimeString();
        this.update();
    }
    /**
     * Log level
     */
    set level(value) {
        this._level = value;
        this.node.dataset.logLevel = value;
        this.update();
    }
    update() {
        if (this._level !== undefined && this._timestamp !== undefined) {
            this.node.title = `${this._timestamp.toLocaleString()}; ${toTitleCase(this._level)} level`;
        }
    }
}
/**
 * Output Area implementation displaying log outputs
 * with prompts showing log timestamps.
 */
class LogConsoleOutputArea extends _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_0__.OutputArea {
    /**
     * Create an output item with a prompt and actual output
     */
    createOutputItem(model) {
        const panel = super.createOutputItem(model);
        if (panel === null) {
            // Could not render model
            return null;
        }
        // first widget in panel is prompt of type LoggerOutputPrompt
        const prompt = panel.widgets[0];
        prompt.timestamp = model.timestamp;
        prompt.level = model.level;
        return panel;
    }
    /**
     * Handle an input request from a kernel by doing nothing.
     */
    onInputRequest(msg, future) {
        return;
    }
}
/**
 * Implementation of `IContentFactory` for Output Area
 * which creates custom output prompts.
 */
class LogConsoleContentFactory extends _jupyterlab_outputarea__WEBPACK_IMPORTED_MODULE_0__.OutputArea.ContentFactory {
    /**
     * Create the output prompt for the widget.
     */
    createOutputPrompt() {
        return new LogConsoleOutputPrompt();
    }
}
/**
 * Implements a panel which supports pinning the position to the end if it is
 * scrolled to the end.
 *
 * #### Notes
 * This is useful for log viewing components or chat components that append
 * elements at the end. We would like to automatically scroll when the user
 * has scrolled to the bottom, but not change the scrolling when the user has
 * changed the scroll position.
 */
class ScrollingWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Widget {
    constructor(_a) {
        var { content } = _a, options = __rest(_a, ["content"]);
        super(options);
        this._observer = null;
        this.addClass('jp-Scrolling');
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.PanelLayout());
        layout.addWidget(content);
        this._content = content;
        this._sentinel = document.createElement('div');
        this.node.appendChild(this._sentinel);
    }
    /**
     * The content widget.
     */
    get content() {
        return this._content;
    }
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        // defer so content gets a chance to attach first
        requestAnimationFrame(() => {
            this._sentinel.scrollIntoView();
            this._scrollHeight = this.node.scrollHeight;
        });
        // Set up intersection observer for the sentinel
        if (typeof IntersectionObserver !== 'undefined') {
            this._observer = new IntersectionObserver(args => {
                this._handleScroll(args);
            }, { root: this.node, threshold: 1 });
            this._observer.observe(this._sentinel);
        }
    }
    onBeforeDetach(msg) {
        if (this._observer) {
            this._observer.disconnect();
        }
    }
    onAfterShow(msg) {
        if (this._tracking) {
            this._sentinel.scrollIntoView();
        }
    }
    _handleScroll([entry]) {
        if (entry.isIntersecting) {
            this._tracking = true;
        }
        else if (this.isVisible) {
            const currentHeight = this.node.scrollHeight;
            if (currentHeight === this._scrollHeight) {
                // Likely the user scrolled manually
                this._tracking = false;
            }
            else {
                // We assume we scrolled because our size changed, so scroll to the end.
                this._sentinel.scrollIntoView();
                this._scrollHeight = currentHeight;
                this._tracking = true;
            }
        }
    }
}
/**
 * A StackedPanel implementation that creates Output Areas
 * for each log source and activates as source is switched.
 */
class LogConsolePanel extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.StackedPanel {
    /**
     * Construct a LogConsolePanel instance.
     *
     * @param loggerRegistry - The logger registry that provides
     * logs to be displayed.
     */
    constructor(loggerRegistry, translator) {
        super();
        this._outputAreas = new Map();
        this._source = null;
        this._sourceChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
        this._sourceDisplayed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
        this._loggersWatched = new Set();
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this._loggerRegistry = loggerRegistry;
        this.addClass('jp-LogConsolePanel');
        loggerRegistry.registryChanged.connect((sender, args) => {
            this._bindLoggerSignals();
        }, this);
        this._bindLoggerSignals();
        this._placeholder = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Widget();
        this._placeholder.addClass('jp-LogConsoleListPlaceholder');
        this.addWidget(this._placeholder);
    }
    /**
     * The logger registry providing the logs.
     */
    get loggerRegistry() {
        return this._loggerRegistry;
    }
    /**
     * The current logger.
     */
    get logger() {
        if (this.source === null) {
            return null;
        }
        return this.loggerRegistry.getLogger(this.source);
    }
    /**
     * The log source displayed
     */
    get source() {
        return this._source;
    }
    set source(name) {
        if (name === this._source) {
            return;
        }
        const oldValue = this._source;
        const newValue = (this._source = name);
        this._showOutputFromSource(newValue);
        this._handlePlaceholder();
        this._sourceChanged.emit({ oldValue, newValue, name: 'source' });
    }
    /**
     * The source version displayed.
     */
    get sourceVersion() {
        const source = this.source;
        return source !== null
            ? this._loggerRegistry.getLogger(source).version
            : null;
    }
    /**
     * Signal for source changes
     */
    get sourceChanged() {
        return this._sourceChanged;
    }
    /**
     * Signal for source changes
     */
    get sourceDisplayed() {
        return this._sourceDisplayed;
    }
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        this._updateOutputAreas();
        this._showOutputFromSource(this._source);
        this._handlePlaceholder();
    }
    onAfterShow(msg) {
        super.onAfterShow(msg);
        if (this.source !== null) {
            this._sourceDisplayed.emit({
                source: this.source,
                version: this.sourceVersion
            });
        }
    }
    _bindLoggerSignals() {
        const loggers = this._loggerRegistry.getLoggers();
        for (const logger of loggers) {
            if (this._loggersWatched.has(logger.source)) {
                continue;
            }
            logger.contentChanged.connect((sender, args) => {
                this._updateOutputAreas();
                this._handlePlaceholder();
            }, this);
            logger.stateChanged.connect((sender, change) => {
                if (change.name !== 'rendermime') {
                    return;
                }
                const viewId = `source:${sender.source}`;
                const outputArea = this._outputAreas.get(viewId);
                if (outputArea) {
                    if (change.newValue) {
                        // cast away readonly
                        outputArea.rendermime = change.newValue;
                    }
                    else {
                        outputArea.dispose();
                    }
                }
            }, this);
            this._loggersWatched.add(logger.source);
        }
    }
    _showOutputFromSource(source) {
        // If the source is null, pick a unique name so all output areas hide.
        const viewId = source === null ? 'null source' : `source:${source}`;
        this._outputAreas.forEach((outputArea, name) => {
            var _a, _b;
            // Show/hide the output area parents, the scrolling windows.
            if (outputArea.id === viewId) {
                (_a = outputArea.parent) === null || _a === void 0 ? void 0 : _a.show();
                if (outputArea.isVisible) {
                    this._sourceDisplayed.emit({
                        source: this.source,
                        version: this.sourceVersion
                    });
                }
            }
            else {
                (_b = outputArea.parent) === null || _b === void 0 ? void 0 : _b.hide();
            }
        });
        const title = source === null
            ? this._trans.__('Log Console')
            : this._trans.__('Log: %1', source);
        this.title.label = title;
        this.title.caption = title;
    }
    _handlePlaceholder() {
        if (this.source === null) {
            this._placeholder.node.textContent = this._trans.__('No source selected.');
            this._placeholder.show();
        }
        else if (this._loggerRegistry.getLogger(this.source).length === 0) {
            this._placeholder.node.textContent = this._trans.__('No log messages.');
            this._placeholder.show();
        }
        else {
            this._placeholder.hide();
            this._placeholder.node.textContent = '';
        }
    }
    _updateOutputAreas() {
        const loggerIds = new Set();
        const loggers = this._loggerRegistry.getLoggers();
        for (const logger of loggers) {
            const source = logger.source;
            const viewId = `source:${source}`;
            loggerIds.add(viewId);
            // add view for logger if not exist
            if (!this._outputAreas.has(viewId)) {
                const outputArea = new LogConsoleOutputArea({
                    rendermime: logger.rendermime,
                    contentFactory: new LogConsoleContentFactory(),
                    model: logger.outputAreaModel
                });
                outputArea.id = viewId;
                // Attach the output area so it is visible, so the accounting
                // functions below record the outputs actually displayed.
                const w = new ScrollingWidget({
                    content: outputArea
                });
                this.addWidget(w);
                this._outputAreas.set(viewId, outputArea);
                // This is where the source object is associated with the output area.
                // We capture the source from this environment in the closure.
                const outputUpdate = (sender) => {
                    // If the current log console panel source is the source associated
                    // with this output area, and the output area is visible, then emit
                    // the logConsolePanel source displayed signal.
                    if (this.source === source && sender.isVisible) {
                        // We assume that the output area has been updated to the current
                        // version of the source.
                        this._sourceDisplayed.emit({
                            source: this.source,
                            version: this.sourceVersion
                        });
                    }
                };
                // Notify messages were displayed any time the output area is updated
                // and update for any outputs rendered on construction.
                outputArea.outputLengthChanged.connect(outputUpdate, this);
                // Since the output area was attached above, we can rely on its
                // visibility to account for the messages displayed.
                outputUpdate(outputArea);
            }
        }
        // remove output areas that do not have corresponding loggers anymore
        const viewIds = this._outputAreas.keys();
        for (const viewId of viewIds) {
            if (!loggerIds.has(viewId)) {
                const outputArea = this._outputAreas.get(viewId);
                outputArea === null || outputArea === void 0 ? void 0 : outputArea.dispose();
                this._outputAreas.delete(viewId);
            }
        }
    }
}
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbG9nY29uc29sZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2xvZ2NvbnNvbGUvbGliL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbG9nY29uc29sZS9saWIvcmVnaXN0cnkuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2xvZ2NvbnNvbGUvbGliL3Rva2Vucy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvbG9nY29uc29sZS9saWIvd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3lCO0FBQ0U7QUFDRjtBQUNBO0FBQ3pCLGlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQSxjQUFjLFNBQUksSUFBSSxTQUFJO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTRELGNBQWM7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN5RDtBQUNKO0FBQ1Y7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDTyw2QkFBNkIsK0RBQVc7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGtGQUE4QjtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sb0NBQW9DLG1FQUFlO0FBQzFEO0FBQ0EsYUFBYSxZQUFZO0FB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O0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsY0FBYztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLE9BQU87QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsT0FBTztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0MiLCJmaWxlIjoicGFja2FnZXNfbG9nY29uc29sZV9saWJfaW5kZXhfanMuZGExNTQ1NzY3MmVjOWM5YmNiMGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBsb2djb25zb2xlXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vbG9nZ2VyJztcbmV4cG9ydCAqIGZyb20gJy4vcmVnaXN0cnknO1xuZXhwb3J0ICogZnJvbSAnLi90b2tlbnMnO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsgT3V0cHV0QXJlYU1vZGVsIH0gZnJvbSAnQGp1cHl0ZXJsYWIvb3V0cHV0YXJlYSc7XG5pbXBvcnQgeyBPdXRwdXRNb2RlbCB9IGZyb20gJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWUnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBMb2cgT3V0cHV0IE1vZGVsIHdpdGggdGltZXN0YW1wIHdoaWNoIHByb3ZpZGVzXG4gKiBpdGVtIGluZm9ybWF0aW9uIGZvciBPdXRwdXQgQXJlYSBNb2RlbC5cbiAqL1xuZXhwb3J0IGNsYXNzIExvZ091dHB1dE1vZGVsIGV4dGVuZHMgT3V0cHV0TW9kZWwge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIExvZ091dHB1dE1vZGVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgbW9kZWwgaW5pdGlhbGl6YXRpb24gb3B0aW9ucy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IG5ldyBEYXRlKG9wdGlvbnMudmFsdWUudGltZXN0YW1wKTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IG9wdGlvbnMudmFsdWUubGV2ZWw7XG4gICAgfVxufVxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBgSUNvbnRlbnRGYWN0b3J5YCBmb3IgT3V0cHV0IEFyZWEgTW9kZWxcbiAqIHdoaWNoIGNyZWF0ZXMgTG9nT3V0cHV0TW9kZWwgaW5zdGFuY2VzLlxuICovXG5jbGFzcyBMb2dDb25zb2xlTW9kZWxDb250ZW50RmFjdG9yeSBleHRlbmRzIE91dHB1dEFyZWFNb2RlbC5Db250ZW50RmFjdG9yeSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgcmVuZGVybWltZSBvdXRwdXQgbW9kZWwgZnJvbSBub3RlYm9vayBvdXRwdXQuXG4gICAgICovXG4gICAgY3JlYXRlT3V0cHV0TW9kZWwob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IExvZ091dHB1dE1vZGVsKG9wdGlvbnMpO1xuICAgIH1cbn1cbi8qKlxuICogT3V0cHV0IEFyZWEgTW9kZWwgaW1wbGVtZW50YXRpb24gd2hpY2ggaXMgYWJsZSB0b1xuICogbGltaXQgbnVtYmVyIG9mIG91dHB1dHMgc3RvcmVkLlxuICovXG5leHBvcnQgY2xhc3MgTG9nZ2VyT3V0cHV0QXJlYU1vZGVsIGV4dGVuZHMgT3V0cHV0QXJlYU1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcihfYSkge1xuICAgICAgICB2YXIgeyBtYXhMZW5ndGggfSA9IF9hLCBvcHRpb25zID0gX19yZXN0KF9hLCBbXCJtYXhMZW5ndGhcIl0pO1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5tYXhMZW5ndGggPSBtYXhMZW5ndGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBvdXRwdXQsIHdoaWNoIG1heSBiZSBjb21iaW5lZCB3aXRoIHByZXZpb3VzIG91dHB1dC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSB0b3RhbCBudW1iZXIgb2Ygb3V0cHV0cy5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgb3V0cHV0IGJ1bmRsZSBpcyBjb3BpZWQuIENvbnRpZ3VvdXMgc3RyZWFtIG91dHB1dHMgb2YgdGhlIHNhbWUgYG5hbWVgXG4gICAgICogYXJlIGNvbWJpbmVkLiBUaGUgb2xkZXN0IG91dHB1dHMgYXJlIHBvc3NpYmx5IHJlbW92ZWQgdG8gZW5zdXJlIHRoZSB0b3RhbFxuICAgICAqIG51bWJlciBvZiBvdXRwdXRzIGlzIGF0IG1vc3QgYC5tYXhMZW5ndGhgLlxuICAgICAqL1xuICAgIGFkZChvdXRwdXQpIHtcbiAgICAgICAgc3VwZXIuYWRkKG91dHB1dCk7XG4gICAgICAgIHRoaXMuX2FwcGx5TWF4TGVuZ3RoKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciBhbiBvdXRwdXQgc2hvdWxkIGNvbWJpbmUgd2l0aCB0aGUgcHJldmlvdXMgb3V0cHV0LlxuICAgICAqXG4gICAgICogV2UgY29tYmluZSBpZiB0aGUgdHdvIG91dHB1dHMgYXJlIGluIHRoZSBzYW1lIHNlY29uZCwgd2hpY2ggaXMgdGhlXG4gICAgICogcmVzb2x1dGlvbiBmb3Igb3VyIHRpbWUgZGlzcGxheS5cbiAgICAgKi9cbiAgICBzaG91bGRDb21iaW5lKG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSwgbGFzdE1vZGVsIH0gPSBvcHRpb25zO1xuICAgICAgICBjb25zdCBvbGRTZWNvbmRzID0gTWF0aC50cnVuYyhsYXN0TW9kZWwudGltZXN0YW1wLmdldFRpbWUoKSAvIDEwMDApO1xuICAgICAgICBjb25zdCBuZXdTZWNvbmRzID0gTWF0aC50cnVuYyh2YWx1ZS50aW1lc3RhbXAgLyAxMDAwKTtcbiAgICAgICAgcmV0dXJuIG9sZFNlY29uZHMgPT09IG5ld1NlY29uZHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICovXG4gICAgZ2V0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiBzdXBlci5nZXQoaW5kZXgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYXhpbXVtIG51bWJlciBvZiBvdXRwdXRzIHRvIHN0b3JlIGluIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICBnZXQgbWF4TGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4TGVuZ3RoO1xuICAgIH1cbiAgICBzZXQgbWF4TGVuZ3RoKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX21heExlbmd0aCA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9hcHBseU1heExlbmd0aCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYW51YWxseSBhcHBseSBsZW5ndGggbGltaXQuXG4gICAgICovXG4gICAgX2FwcGx5TWF4TGVuZ3RoKCkge1xuICAgICAgICBpZiAodGhpcy5saXN0Lmxlbmd0aCA+IHRoaXMuX21heExlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5saXN0LnJlbW92ZVJhbmdlKDAsIHRoaXMubGlzdC5sZW5ndGggLSB0aGlzLl9tYXhMZW5ndGgpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIGNvbmNyZXRlIGltcGxlbWVudGF0aW9uIG9mIElMb2dnZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIExvZ2dlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzb3VyY2UgLSBUaGUgbmFtZSBvZiB0aGUgbG9nIHNvdXJjZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29udGVudENoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9yZW5kZXJtaW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdmVyc2lvbiA9IDA7XG4gICAgICAgIHRoaXMuX2xldmVsID0gJ3dhcm5pbmcnO1xuICAgICAgICB0aGlzLnNvdXJjZSA9IG9wdGlvbnMuc291cmNlO1xuICAgICAgICB0aGlzLm91dHB1dEFyZWFNb2RlbCA9IG5ldyBMb2dnZXJPdXRwdXRBcmVhTW9kZWwoe1xuICAgICAgICAgICAgY29udGVudEZhY3Rvcnk6IG5ldyBMb2dDb25zb2xlTW9kZWxDb250ZW50RmFjdG9yeSgpLFxuICAgICAgICAgICAgbWF4TGVuZ3RoOiBvcHRpb25zLm1heExlbmd0aFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG1heGltdW0gbnVtYmVyIG9mIG91dHB1dHMgc3RvcmVkLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIE9sZGVzdCBlbnRyaWVzIHdpbGwgYmUgdHJpbW1lZCB0byBlbnN1cmUgdGhlIGxlbmd0aCBpcyBhdCBtb3N0XG4gICAgICogYC5tYXhMZW5ndGhgLlxuICAgICAqL1xuICAgIGdldCBtYXhMZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm91dHB1dEFyZWFNb2RlbC5tYXhMZW5ndGg7XG4gICAgfVxuICAgIHNldCBtYXhMZW5ndGgodmFsdWUpIHtcbiAgICAgICAgdGhpcy5vdXRwdXRBcmVhTW9kZWwubWF4TGVuZ3RoID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBsZXZlbCBvZiBvdXRwdXRzIGxvZ2dlZFxuICAgICAqL1xuICAgIGdldCBsZXZlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xldmVsO1xuICAgIH1cbiAgICBzZXQgbGV2ZWwobmV3VmFsdWUpIHtcbiAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLl9sZXZlbDtcbiAgICAgICAgaWYgKG9sZFZhbHVlID09PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xldmVsID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMuX2xvZyh7XG4gICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICBvdXRwdXRfdHlwZTogJ2Rpc3BsYXlfZGF0YScsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAndGV4dC9wbGFpbic6IGBMb2cgbGV2ZWwgc2V0IHRvICR7bmV3VmFsdWV9YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZXZlbDogJ21ldGFkYXRhJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VkLmVtaXQoeyBuYW1lOiAnbGV2ZWwnLCBvbGRWYWx1ZSwgbmV3VmFsdWUgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiBvdXRwdXRzIGxvZ2dlZC5cbiAgICAgKi9cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdXRwdXRBcmVhTW9kZWwubGVuZ3RoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGxpc3Qgb2YgbG9nIG1lc3NhZ2VzIGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IGNvbnRlbnRDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudENoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgbG9nIHN0YXRlIGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IHN0YXRlQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVybWltZSB0byB1c2Ugd2hlbiByZW5kZXJpbmcgb3V0cHV0cyBsb2dnZWQuXG4gICAgICovXG4gICAgZ2V0IHJlbmRlcm1pbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJtaW1lO1xuICAgIH1cbiAgICBzZXQgcmVuZGVybWltZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX3JlbmRlcm1pbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5fcmVuZGVybWltZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gKHRoaXMuX3JlbmRlcm1pbWUgPSB2YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQuZW1pdCh7IG5hbWU6ICdyZW5kZXJtaW1lJywgb2xkVmFsdWUsIG5ld1ZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgbWVzc2FnZXMgdGhhdCBoYXZlIGV2ZXIgYmVlbiBzdG9yZWQuXG4gICAgICovXG4gICAgZ2V0IHZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJzaW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2cgYW4gb3V0cHV0IHRvIGxvZ2dlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsb2cgLSBUaGUgb3V0cHV0IHRvIGJlIGxvZ2dlZC5cbiAgICAgKi9cbiAgICBsb2cobG9nKSB7XG4gICAgICAgIC8vIEZpbHRlciBieSBvdXIgY3VycmVudCBsb2cgbGV2ZWxcbiAgICAgICAgaWYgKFByaXZhdGUuTG9nTGV2ZWxbbG9nLmxldmVsXSA8XG4gICAgICAgICAgICBQcml2YXRlLkxvZ0xldmVsW3RoaXMuX2xldmVsXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvdXRwdXQgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dF90eXBlOiAnZGlzcGxheV9kYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQvcGxhaW4nOiBsb2cuZGF0YVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgICAgICAgICAgIG91dHB1dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0X3R5cGU6ICdkaXNwbGF5X2RhdGEnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAndGV4dC9odG1sJzogbG9nLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvdXRwdXQnOlxuICAgICAgICAgICAgICAgIG91dHB1dCA9IGxvZy5kYXRhO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3V0cHV0KSB7XG4gICAgICAgICAgICB0aGlzLl9sb2coe1xuICAgICAgICAgICAgICAgIG91dHB1dCxcbiAgICAgICAgICAgICAgICBsZXZlbDogbG9nLmxldmVsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhciBhbGwgb3V0cHV0cyBsb2dnZWQuXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMub3V0cHV0QXJlYU1vZGVsLmNsZWFyKGZhbHNlKTtcbiAgICAgICAgdGhpcy5fY29udGVudENoYW5nZWQuZW1pdCgnY2xlYXInKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgY2hlY2twb2ludCB0byB0aGUgbG9nLlxuICAgICAqL1xuICAgIGNoZWNrcG9pbnQoKSB7XG4gICAgICAgIHRoaXMuX2xvZyh7XG4gICAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgICAgICBvdXRwdXRfdHlwZTogJ2Rpc3BsYXlfZGF0YScsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAndGV4dC9odG1sJzogJzxoci8+J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZXZlbDogJ21ldGFkYXRhJ1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgbG9nZ2VyIGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSB0aGUgbG9nZ2VyLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICB0aGlzLl9yZW5kZXJtaW1lID0gbnVsbDtcbiAgICAgICAgU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG4gICAgX2xvZyhvcHRpb25zKSB7XG4gICAgICAgIC8vIEZpcnN0LCBtYWtlIHN1cmUgb3VyIHZlcnNpb24gcmVmbGVjdHMgdGhlIG5ldyBtZXNzYWdlIHNvIHRoaW5nc1xuICAgICAgICAvLyB0cmlnZ2VyaW5nIGZyb20gdGhlIHNpZ25hbHMgYmVsb3cgaGF2ZSB0aGUgY29ycmVjdCB2ZXJzaW9uLlxuICAgICAgICB0aGlzLl92ZXJzaW9uKys7XG4gICAgICAgIC8vIE5leHQsIHRyaWdnZXIgYW55IGRpc3BsYXlzIG9mIHRoZSBtZXNzYWdlXG4gICAgICAgIHRoaXMub3V0cHV0QXJlYU1vZGVsLmFkZChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMub3V0cHV0KSwgeyB0aW1lc3RhbXA6IERhdGUubm93KCksIGxldmVsOiBvcHRpb25zLmxldmVsIH0pKTtcbiAgICAgICAgLy8gRmluYWxseSwgdGVsbCBwZW9wbGUgdGhhdCB0aGUgbWVzc2FnZSB3YXMgYXBwZW5kZWQgKGFuZCBwb3NzaWJseVxuICAgICAgICAvLyBhbHJlYWR5IGRpc3BsYXllZCkuXG4gICAgICAgIHRoaXMuX2NvbnRlbnRDaGFuZ2VkLmVtaXQoJ2FwcGVuZCcpO1xuICAgIH1cbn1cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgbGV0IExvZ0xldmVsO1xuICAgIChmdW5jdGlvbiAoTG9nTGV2ZWwpIHtcbiAgICAgICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJkZWJ1Z1wiXSA9IDBdID0gXCJkZWJ1Z1wiO1xuICAgICAgICBMb2dMZXZlbFtMb2dMZXZlbFtcImluZm9cIl0gPSAxXSA9IFwiaW5mb1wiO1xuICAgICAgICBMb2dMZXZlbFtMb2dMZXZlbFtcIndhcm5pbmdcIl0gPSAyXSA9IFwid2FybmluZ1wiO1xuICAgICAgICBMb2dMZXZlbFtMb2dMZXZlbFtcImVycm9yXCJdID0gM10gPSBcImVycm9yXCI7XG4gICAgICAgIExvZ0xldmVsW0xvZ0xldmVsW1wiY3JpdGljYWxcIl0gPSA0XSA9IFwiY3JpdGljYWxcIjtcbiAgICAgICAgTG9nTGV2ZWxbTG9nTGV2ZWxbXCJtZXRhZGF0YVwiXSA9IDVdID0gXCJtZXRhZGF0YVwiO1xuICAgIH0pKExvZ0xldmVsID0gUHJpdmF0ZS5Mb2dMZXZlbCB8fCAoUHJpdmF0ZS5Mb2dMZXZlbCA9IHt9KSk7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxvZ2dlci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XG4vKipcbiAqIEEgY29uY3JldGUgaW1wbGVtZW50YXRpb24gb2YgSUxvZ2dlclJlZ2lzdHJ5LlxuICovXG5leHBvcnQgY2xhc3MgTG9nZ2VyUmVnaXN0cnkge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIExvZ2dlclJlZ2lzdHJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGRlZmF1bHRSZW5kZXJtaW1lIC0gRGVmYXVsdCByZW5kZXJtaW1lIHRvIHJlbmRlciBvdXRwdXRzXG4gICAgICogd2l0aCB3aGVuIGxvZ2dlciBpcyBub3Qgc3VwcGxpZWQgd2l0aCBvbmUuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9sb2dnZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9yZWdpc3RyeUNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRSZW5kZXJtaW1lID0gb3B0aW9ucy5kZWZhdWx0UmVuZGVybWltZTtcbiAgICAgICAgdGhpcy5fbWF4TGVuZ3RoID0gb3B0aW9ucy5tYXhMZW5ndGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbG9nZ2VyIGZvciB0aGUgc3BlY2lmaWVkIHNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzb3VyY2UgLSBUaGUgbmFtZSBvZiB0aGUgbG9nIHNvdXJjZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBsb2dnZXIgZm9yIHRoZSBzcGVjaWZpZWQgc291cmNlLlxuICAgICAqL1xuICAgIGdldExvZ2dlcihzb3VyY2UpIHtcbiAgICAgICAgY29uc3QgbG9nZ2VycyA9IHRoaXMuX2xvZ2dlcnM7XG4gICAgICAgIGxldCBsb2dnZXIgPSBsb2dnZXJzLmdldChzb3VyY2UpO1xuICAgICAgICBpZiAobG9nZ2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9nZ2VyO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2dlciA9IG5ldyBMb2dnZXIoeyBzb3VyY2UsIG1heExlbmd0aDogdGhpcy5tYXhMZW5ndGggfSk7XG4gICAgICAgIGxvZ2dlci5yZW5kZXJtaW1lID0gdGhpcy5fZGVmYXVsdFJlbmRlcm1pbWU7XG4gICAgICAgIGxvZ2dlcnMuc2V0KHNvdXJjZSwgbG9nZ2VyKTtcbiAgICAgICAgdGhpcy5fcmVnaXN0cnlDaGFuZ2VkLmVtaXQoJ2FwcGVuZCcpO1xuICAgICAgICByZXR1cm4gbG9nZ2VyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYWxsIGxvZ2dlcnMgcmVnaXN0ZXJlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBhcnJheSBjb250YWluaW5nIGFsbCByZWdpc3RlcmVkIGxvZ2dlcnMuXG4gICAgICovXG4gICAgZ2V0TG9nZ2VycygpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5fbG9nZ2Vycy52YWx1ZXMoKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgbG9nZ2VyIHJlZ2lzdHJ5IGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IHJlZ2lzdHJ5Q2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5Q2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG1heCBsZW5ndGggZm9yIGxvZ2dlcnMuXG4gICAgICovXG4gICAgZ2V0IG1heExlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heExlbmd0aDtcbiAgICB9XG4gICAgc2V0IG1heExlbmd0aCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9tYXhMZW5ndGggPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fbG9nZ2Vycy5mb3JFYWNoKGxvZ2dlciA9PiB7XG4gICAgICAgICAgICBsb2dnZXIubWF4TGVuZ3RoID0gdmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSByZWdpc3RlciBpcyBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2UgdGhlIHJlZ2lzdHJ5IGFuZCBhbGwgbG9nZ2Vycy5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2xvZ2dlcnMuZm9yRWFjaCh4ID0+IHguZGlzcG9zZSgpKTtcbiAgICAgICAgU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWdpc3RyeS5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIFRoZSBMb2dnZXIgUmVnaXN0cnkgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJTG9nZ2VyUmVnaXN0cnkgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL2xvZ2NvbnNvbGU6SUxvZ2dlclJlZ2lzdHJ5Jyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2tlbnMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xuICAgIHZhciB0ID0ge307XG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXG4gICAgICAgIHRbcF0gPSBzW3BdO1xuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgICB9XG4gICAgcmV0dXJuIHQ7XG59O1xuaW1wb3J0IHsgT3V0cHV0QXJlYSB9IGZyb20gJ0BqdXB5dGVybGFiL291dHB1dGFyZWEnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBQYW5lbExheW91dCwgU3RhY2tlZFBhbmVsLCBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuZnVuY3Rpb24gdG9UaXRsZUNhc2UodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoID09PSAwID8gdmFsdWUgOiB2YWx1ZVswXS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XG59XG4vKipcbiAqIExvZyBjb25zb2xlIG91dHB1dCBwcm9tcHQgaW1wbGVtZW50YXRpb25cbiAqL1xuY2xhc3MgTG9nQ29uc29sZU91dHB1dFByb21wdCBleHRlbmRzIFdpZGdldCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3RpbWVzdGFtcE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZCh0aGlzLl90aW1lc3RhbXBOb2RlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGF0ZSAmIHRpbWUgd2hlbiBvdXRwdXQgaXMgbG9nZ2VkLlxuICAgICAqL1xuICAgIHNldCB0aW1lc3RhbXAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdGltZXN0YW1wID0gdmFsdWU7XG4gICAgICAgIHRoaXMuX3RpbWVzdGFtcE5vZGUuaW5uZXJIVE1MID0gdGhpcy5fdGltZXN0YW1wLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2cgbGV2ZWxcbiAgICAgKi9cbiAgICBzZXQgbGV2ZWwodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbGV2ZWwgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5ub2RlLmRhdGFzZXQubG9nTGV2ZWwgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5fbGV2ZWwgIT09IHVuZGVmaW5lZCAmJiB0aGlzLl90aW1lc3RhbXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnRpdGxlID0gYCR7dGhpcy5fdGltZXN0YW1wLnRvTG9jYWxlU3RyaW5nKCl9OyAke3RvVGl0bGVDYXNlKHRoaXMuX2xldmVsKX0gbGV2ZWxgO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBPdXRwdXQgQXJlYSBpbXBsZW1lbnRhdGlvbiBkaXNwbGF5aW5nIGxvZyBvdXRwdXRzXG4gKiB3aXRoIHByb21wdHMgc2hvd2luZyBsb2cgdGltZXN0YW1wcy5cbiAqL1xuY2xhc3MgTG9nQ29uc29sZU91dHB1dEFyZWEgZXh0ZW5kcyBPdXRwdXRBcmVhIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gb3V0cHV0IGl0ZW0gd2l0aCBhIHByb21wdCBhbmQgYWN0dWFsIG91dHB1dFxuICAgICAqL1xuICAgIGNyZWF0ZU91dHB1dEl0ZW0obW9kZWwpIHtcbiAgICAgICAgY29uc3QgcGFuZWwgPSBzdXBlci5jcmVhdGVPdXRwdXRJdGVtKG1vZGVsKTtcbiAgICAgICAgaWYgKHBhbmVsID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBDb3VsZCBub3QgcmVuZGVyIG1vZGVsXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBmaXJzdCB3aWRnZXQgaW4gcGFuZWwgaXMgcHJvbXB0IG9mIHR5cGUgTG9nZ2VyT3V0cHV0UHJvbXB0XG4gICAgICAgIGNvbnN0IHByb21wdCA9IHBhbmVsLndpZGdldHNbMF07XG4gICAgICAgIHByb21wdC50aW1lc3RhbXAgPSBtb2RlbC50aW1lc3RhbXA7XG4gICAgICAgIHByb21wdC5sZXZlbCA9IG1vZGVsLmxldmVsO1xuICAgICAgICByZXR1cm4gcGFuZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhbiBpbnB1dCByZXF1ZXN0IGZyb20gYSBrZXJuZWwgYnkgZG9pbmcgbm90aGluZy5cbiAgICAgKi9cbiAgICBvbklucHV0UmVxdWVzdChtc2csIGZ1dHVyZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxufVxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiBgSUNvbnRlbnRGYWN0b3J5YCBmb3IgT3V0cHV0IEFyZWFcbiAqIHdoaWNoIGNyZWF0ZXMgY3VzdG9tIG91dHB1dCBwcm9tcHRzLlxuICovXG5jbGFzcyBMb2dDb25zb2xlQ29udGVudEZhY3RvcnkgZXh0ZW5kcyBPdXRwdXRBcmVhLkNvbnRlbnRGYWN0b3J5IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIG91dHB1dCBwcm9tcHQgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgY3JlYXRlT3V0cHV0UHJvbXB0KCkge1xuICAgICAgICByZXR1cm4gbmV3IExvZ0NvbnNvbGVPdXRwdXRQcm9tcHQoKTtcbiAgICB9XG59XG4vKipcbiAqIEltcGxlbWVudHMgYSBwYW5lbCB3aGljaCBzdXBwb3J0cyBwaW5uaW5nIHRoZSBwb3NpdGlvbiB0byB0aGUgZW5kIGlmIGl0IGlzXG4gKiBzY3JvbGxlZCB0byB0aGUgZW5kLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFRoaXMgaXMgdXNlZnVsIGZvciBsb2cgdmlld2luZyBjb21wb25lbnRzIG9yIGNoYXQgY29tcG9uZW50cyB0aGF0IGFwcGVuZFxuICogZWxlbWVudHMgYXQgdGhlIGVuZC4gV2Ugd291bGQgbGlrZSB0byBhdXRvbWF0aWNhbGx5IHNjcm9sbCB3aGVuIHRoZSB1c2VyXG4gKiBoYXMgc2Nyb2xsZWQgdG8gdGhlIGJvdHRvbSwgYnV0IG5vdCBjaGFuZ2UgdGhlIHNjcm9sbGluZyB3aGVuIHRoZSB1c2VyIGhhc1xuICogY2hhbmdlZCB0aGUgc2Nyb2xsIHBvc2l0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgU2Nyb2xsaW5nV2lkZ2V0IGV4dGVuZHMgV2lkZ2V0IHtcbiAgICBjb25zdHJ1Y3RvcihfYSkge1xuICAgICAgICB2YXIgeyBjb250ZW50IH0gPSBfYSwgb3B0aW9ucyA9IF9fcmVzdChfYSwgW1wiY29udGVudFwiXSk7XG4gICAgICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9vYnNlcnZlciA9IG51bGw7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLVNjcm9sbGluZycpO1xuICAgICAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5sYXlvdXQgPSBuZXcgUGFuZWxMYXlvdXQoKSk7XG4gICAgICAgIGxheW91dC5hZGRXaWRnZXQoY29udGVudCk7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLl9zZW50aW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGhpcy5fc2VudGluZWwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY29udGVudCB3aWRnZXQuXG4gICAgICovXG4gICAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICAgIH1cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICBzdXBlci5vbkFmdGVyQXR0YWNoKG1zZyk7XG4gICAgICAgIC8vIGRlZmVyIHNvIGNvbnRlbnQgZ2V0cyBhIGNoYW5jZSB0byBhdHRhY2ggZmlyc3RcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3NlbnRpbmVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxIZWlnaHQgPSB0aGlzLm5vZGUuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gU2V0IHVwIGludGVyc2VjdGlvbiBvYnNlcnZlciBmb3IgdGhlIHNlbnRpbmVsXG4gICAgICAgIGlmICh0eXBlb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihhcmdzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVTY3JvbGwoYXJncyk7XG4gICAgICAgICAgICB9LCB7IHJvb3Q6IHRoaXMubm9kZSwgdGhyZXNob2xkOiAxIH0pO1xuICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLl9zZW50aW5lbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25CZWZvcmVEZXRhY2gobXNnKSB7XG4gICAgICAgIGlmICh0aGlzLl9vYnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQWZ0ZXJTaG93KG1zZykge1xuICAgICAgICBpZiAodGhpcy5fdHJhY2tpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbnRpbmVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2hhbmRsZVNjcm9sbChbZW50cnldKSB7XG4gICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgICAgdGhpcy5fdHJhY2tpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gdGhpcy5ub2RlLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgIGlmIChjdXJyZW50SGVpZ2h0ID09PSB0aGlzLl9zY3JvbGxIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAvLyBMaWtlbHkgdGhlIHVzZXIgc2Nyb2xsZWQgbWFudWFsbHlcbiAgICAgICAgICAgICAgICB0aGlzLl90cmFja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgYXNzdW1lIHdlIHNjcm9sbGVkIGJlY2F1c2Ugb3VyIHNpemUgY2hhbmdlZCwgc28gc2Nyb2xsIHRvIHRoZSBlbmQuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VudGluZWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGxIZWlnaHQgPSBjdXJyZW50SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYWNraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQSBTdGFja2VkUGFuZWwgaW1wbGVtZW50YXRpb24gdGhhdCBjcmVhdGVzIE91dHB1dCBBcmVhc1xuICogZm9yIGVhY2ggbG9nIHNvdXJjZSBhbmQgYWN0aXZhdGVzIGFzIHNvdXJjZSBpcyBzd2l0Y2hlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIExvZ0NvbnNvbGVQYW5lbCBleHRlbmRzIFN0YWNrZWRQYW5lbCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgTG9nQ29uc29sZVBhbmVsIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxvZ2dlclJlZ2lzdHJ5IC0gVGhlIGxvZ2dlciByZWdpc3RyeSB0aGF0IHByb3ZpZGVzXG4gICAgICogbG9ncyB0byBiZSBkaXNwbGF5ZWQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobG9nZ2VyUmVnaXN0cnksIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fb3V0cHV0QXJlYXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX3NvdXJjZUNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9zb3VyY2VEaXNwbGF5ZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9sb2dnZXJzV2F0Y2hlZCA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICB0aGlzLl9sb2dnZXJSZWdpc3RyeSA9IGxvZ2dlclJlZ2lzdHJ5O1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1Mb2dDb25zb2xlUGFuZWwnKTtcbiAgICAgICAgbG9nZ2VyUmVnaXN0cnkucmVnaXN0cnlDaGFuZ2VkLmNvbm5lY3QoKHNlbmRlciwgYXJncykgPT4ge1xuICAgICAgICAgICAgdGhpcy5fYmluZExvZ2dlclNpZ25hbHMoKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMuX2JpbmRMb2dnZXJTaWduYWxzKCk7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gbmV3IFdpZGdldCgpO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlci5hZGRDbGFzcygnanAtTG9nQ29uc29sZUxpc3RQbGFjZWhvbGRlcicpO1xuICAgICAgICB0aGlzLmFkZFdpZGdldCh0aGlzLl9wbGFjZWhvbGRlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBsb2dnZXIgcmVnaXN0cnkgcHJvdmlkaW5nIHRoZSBsb2dzLlxuICAgICAqL1xuICAgIGdldCBsb2dnZXJSZWdpc3RyeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvZ2dlclJlZ2lzdHJ5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBsb2dnZXIuXG4gICAgICovXG4gICAgZ2V0IGxvZ2dlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc291cmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5sb2dnZXJSZWdpc3RyeS5nZXRMb2dnZXIodGhpcy5zb3VyY2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbG9nIHNvdXJjZSBkaXNwbGF5ZWRcbiAgICAgKi9cbiAgICBnZXQgc291cmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlO1xuICAgIH1cbiAgICBzZXQgc291cmNlKG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IHRoaXMuX3NvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5fc291cmNlO1xuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9ICh0aGlzLl9zb3VyY2UgPSBuYW1lKTtcbiAgICAgICAgdGhpcy5fc2hvd091dHB1dEZyb21Tb3VyY2UobmV3VmFsdWUpO1xuICAgICAgICB0aGlzLl9oYW5kbGVQbGFjZWhvbGRlcigpO1xuICAgICAgICB0aGlzLl9zb3VyY2VDaGFuZ2VkLmVtaXQoeyBvbGRWYWx1ZSwgbmV3VmFsdWUsIG5hbWU6ICdzb3VyY2UnIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgc291cmNlIHZlcnNpb24gZGlzcGxheWVkLlxuICAgICAqL1xuICAgIGdldCBzb3VyY2VWZXJzaW9uKCkge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLnNvdXJjZTtcbiAgICAgICAgcmV0dXJuIHNvdXJjZSAhPT0gbnVsbFxuICAgICAgICAgICAgPyB0aGlzLl9sb2dnZXJSZWdpc3RyeS5nZXRMb2dnZXIoc291cmNlKS52ZXJzaW9uXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNpZ25hbCBmb3Igc291cmNlIGNoYW5nZXNcbiAgICAgKi9cbiAgICBnZXQgc291cmNlQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZUNoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNpZ25hbCBmb3Igc291cmNlIGNoYW5nZXNcbiAgICAgKi9cbiAgICBnZXQgc291cmNlRGlzcGxheWVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlRGlzcGxheWVkO1xuICAgIH1cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICBzdXBlci5vbkFmdGVyQXR0YWNoKG1zZyk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU91dHB1dEFyZWFzKCk7XG4gICAgICAgIHRoaXMuX3Nob3dPdXRwdXRGcm9tU291cmNlKHRoaXMuX3NvdXJjZSk7XG4gICAgICAgIHRoaXMuX2hhbmRsZVBsYWNlaG9sZGVyKCk7XG4gICAgfVxuICAgIG9uQWZ0ZXJTaG93KG1zZykge1xuICAgICAgICBzdXBlci5vbkFmdGVyU2hvdyhtc2cpO1xuICAgICAgICBpZiAodGhpcy5zb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZURpc3BsYXllZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgICAgICAgIHZlcnNpb246IHRoaXMuc291cmNlVmVyc2lvblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2JpbmRMb2dnZXJTaWduYWxzKCkge1xuICAgICAgICBjb25zdCBsb2dnZXJzID0gdGhpcy5fbG9nZ2VyUmVnaXN0cnkuZ2V0TG9nZ2VycygpO1xuICAgICAgICBmb3IgKGNvbnN0IGxvZ2dlciBvZiBsb2dnZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbG9nZ2Vyc1dhdGNoZWQuaGFzKGxvZ2dlci5zb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2dnZXIuY29udGVudENoYW5nZWQuY29ubmVjdCgoc2VuZGVyLCBhcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlT3V0cHV0QXJlYXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVQbGFjZWhvbGRlcigpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICBsb2dnZXIuc3RhdGVDaGFuZ2VkLmNvbm5lY3QoKHNlbmRlciwgY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5uYW1lICE9PSAncmVuZGVybWltZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB2aWV3SWQgPSBgc291cmNlOiR7c2VuZGVyLnNvdXJjZX1gO1xuICAgICAgICAgICAgICAgIGNvbnN0IG91dHB1dEFyZWEgPSB0aGlzLl9vdXRwdXRBcmVhcy5nZXQodmlld0lkKTtcbiAgICAgICAgICAgICAgICBpZiAob3V0cHV0QXJlYSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLm5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYXN0IGF3YXkgcmVhZG9ubHlcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dEFyZWEucmVuZGVybWltZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dEFyZWEuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9sb2dnZXJzV2F0Y2hlZC5hZGQobG9nZ2VyLnNvdXJjZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3Nob3dPdXRwdXRGcm9tU291cmNlKHNvdXJjZSkge1xuICAgICAgICAvLyBJZiB0aGUgc291cmNlIGlzIG51bGwsIHBpY2sgYSB1bmlxdWUgbmFtZSBzbyBhbGwgb3V0cHV0IGFyZWFzIGhpZGUuXG4gICAgICAgIGNvbnN0IHZpZXdJZCA9IHNvdXJjZSA9PT0gbnVsbCA/ICdudWxsIHNvdXJjZScgOiBgc291cmNlOiR7c291cmNlfWA7XG4gICAgICAgIHRoaXMuX291dHB1dEFyZWFzLmZvckVhY2goKG91dHB1dEFyZWEsIG5hbWUpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAvLyBTaG93L2hpZGUgdGhlIG91dHB1dCBhcmVhIHBhcmVudHMsIHRoZSBzY3JvbGxpbmcgd2luZG93cy5cbiAgICAgICAgICAgIGlmIChvdXRwdXRBcmVhLmlkID09PSB2aWV3SWQpIHtcbiAgICAgICAgICAgICAgICAoX2EgPSBvdXRwdXRBcmVhLnBhcmVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNob3coKTtcbiAgICAgICAgICAgICAgICBpZiAob3V0cHV0QXJlYS5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291cmNlRGlzcGxheWVkLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlcnNpb246IHRoaXMuc291cmNlVmVyc2lvblxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAoX2IgPSBvdXRwdXRBcmVhLnBhcmVudCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gc291cmNlID09PSBudWxsXG4gICAgICAgICAgICA/IHRoaXMuX3RyYW5zLl9fKCdMb2cgQ29uc29sZScpXG4gICAgICAgICAgICA6IHRoaXMuX3RyYW5zLl9fKCdMb2c6ICUxJywgc291cmNlKTtcbiAgICAgICAgdGhpcy50aXRsZS5sYWJlbCA9IHRpdGxlO1xuICAgICAgICB0aGlzLnRpdGxlLmNhcHRpb24gPSB0aXRsZTtcbiAgICB9XG4gICAgX2hhbmRsZVBsYWNlaG9sZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5zb3VyY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyLm5vZGUudGV4dENvbnRlbnQgPSB0aGlzLl90cmFucy5fXygnTm8gc291cmNlIHNlbGVjdGVkLicpO1xuICAgICAgICAgICAgdGhpcy5fcGxhY2Vob2xkZXIuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2xvZ2dlclJlZ2lzdHJ5LmdldExvZ2dlcih0aGlzLnNvdXJjZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9wbGFjZWhvbGRlci5ub2RlLnRleHRDb250ZW50ID0gdGhpcy5fdHJhbnMuX18oJ05vIGxvZyBtZXNzYWdlcy4nKTtcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyLmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyLm5vZGUudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBfdXBkYXRlT3V0cHV0QXJlYXMoKSB7XG4gICAgICAgIGNvbnN0IGxvZ2dlcklkcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgY29uc3QgbG9nZ2VycyA9IHRoaXMuX2xvZ2dlclJlZ2lzdHJ5LmdldExvZ2dlcnMoKTtcbiAgICAgICAgZm9yIChjb25zdCBsb2dnZXIgb2YgbG9nZ2Vycykge1xuICAgICAgICAgICAgY29uc3Qgc291cmNlID0gbG9nZ2VyLnNvdXJjZTtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdJZCA9IGBzb3VyY2U6JHtzb3VyY2V9YDtcbiAgICAgICAgICAgIGxvZ2dlcklkcy5hZGQodmlld0lkKTtcbiAgICAgICAgICAgIC8vIGFkZCB2aWV3IGZvciBsb2dnZXIgaWYgbm90IGV4aXN0XG4gICAgICAgICAgICBpZiAoIXRoaXMuX291dHB1dEFyZWFzLmhhcyh2aWV3SWQpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb3V0cHV0QXJlYSA9IG5ldyBMb2dDb25zb2xlT3V0cHV0QXJlYSh7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcm1pbWU6IGxvZ2dlci5yZW5kZXJtaW1lLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50RmFjdG9yeTogbmV3IExvZ0NvbnNvbGVDb250ZW50RmFjdG9yeSgpLFxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogbG9nZ2VyLm91dHB1dEFyZWFNb2RlbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG91dHB1dEFyZWEuaWQgPSB2aWV3SWQ7XG4gICAgICAgICAgICAgICAgLy8gQXR0YWNoIHRoZSBvdXRwdXQgYXJlYSBzbyBpdCBpcyB2aXNpYmxlLCBzbyB0aGUgYWNjb3VudGluZ1xuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9ucyBiZWxvdyByZWNvcmQgdGhlIG91dHB1dHMgYWN0dWFsbHkgZGlzcGxheWVkLlxuICAgICAgICAgICAgICAgIGNvbnN0IHcgPSBuZXcgU2Nyb2xsaW5nV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogb3V0cHV0QXJlYVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkV2lkZ2V0KHcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX291dHB1dEFyZWFzLnNldCh2aWV3SWQsIG91dHB1dEFyZWEpO1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgaXMgd2hlcmUgdGhlIHNvdXJjZSBvYmplY3QgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBvdXRwdXQgYXJlYS5cbiAgICAgICAgICAgICAgICAvLyBXZSBjYXB0dXJlIHRoZSBzb3VyY2UgZnJvbSB0aGlzIGVudmlyb25tZW50IGluIHRoZSBjbG9zdXJlLlxuICAgICAgICAgICAgICAgIGNvbnN0IG91dHB1dFVwZGF0ZSA9IChzZW5kZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgbG9nIGNvbnNvbGUgcGFuZWwgc291cmNlIGlzIHRoZSBzb3VyY2UgYXNzb2NpYXRlZFxuICAgICAgICAgICAgICAgICAgICAvLyB3aXRoIHRoaXMgb3V0cHV0IGFyZWEsIGFuZCB0aGUgb3V0cHV0IGFyZWEgaXMgdmlzaWJsZSwgdGhlbiBlbWl0XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBsb2dDb25zb2xlUGFuZWwgc291cmNlIGRpc3BsYXllZCBzaWduYWwuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvdXJjZSA9PT0gc291cmNlICYmIHNlbmRlci5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGFzc3VtZSB0aGF0IHRoZSBvdXRwdXQgYXJlYSBoYXMgYmVlbiB1cGRhdGVkIHRvIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VyY2VEaXNwbGF5ZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB0aGlzLnNvdXJjZVZlcnNpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvLyBOb3RpZnkgbWVzc2FnZXMgd2VyZSBkaXNwbGF5ZWQgYW55IHRpbWUgdGhlIG91dHB1dCBhcmVhIGlzIHVwZGF0ZWRcbiAgICAgICAgICAgICAgICAvLyBhbmQgdXBkYXRlIGZvciBhbnkgb3V0cHV0cyByZW5kZXJlZCBvbiBjb25zdHJ1Y3Rpb24uXG4gICAgICAgICAgICAgICAgb3V0cHV0QXJlYS5vdXRwdXRMZW5ndGhDaGFuZ2VkLmNvbm5lY3Qob3V0cHV0VXBkYXRlLCB0aGlzKTtcbiAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgb3V0cHV0IGFyZWEgd2FzIGF0dGFjaGVkIGFib3ZlLCB3ZSBjYW4gcmVseSBvbiBpdHNcbiAgICAgICAgICAgICAgICAvLyB2aXNpYmlsaXR5IHRvIGFjY291bnQgZm9yIHRoZSBtZXNzYWdlcyBkaXNwbGF5ZWQuXG4gICAgICAgICAgICAgICAgb3V0cHV0VXBkYXRlKG91dHB1dEFyZWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHJlbW92ZSBvdXRwdXQgYXJlYXMgdGhhdCBkbyBub3QgaGF2ZSBjb3JyZXNwb25kaW5nIGxvZ2dlcnMgYW55bW9yZVxuICAgICAgICBjb25zdCB2aWV3SWRzID0gdGhpcy5fb3V0cHV0QXJlYXMua2V5cygpO1xuICAgICAgICBmb3IgKGNvbnN0IHZpZXdJZCBvZiB2aWV3SWRzKSB7XG4gICAgICAgICAgICBpZiAoIWxvZ2dlcklkcy5oYXModmlld0lkKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG91dHB1dEFyZWEgPSB0aGlzLl9vdXRwdXRBcmVhcy5nZXQodmlld0lkKTtcbiAgICAgICAgICAgICAgICBvdXRwdXRBcmVhID09PSBudWxsIHx8IG91dHB1dEFyZWEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG91dHB1dEFyZWEuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX291dHB1dEFyZWFzLmRlbGV0ZSh2aWV3SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2lkZ2V0LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=