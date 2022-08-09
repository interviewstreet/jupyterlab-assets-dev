(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_console_lib_index_js"],{

/***/ "../../packages/console/lib/foreign.js":
/*!*********************************************!*\
  !*** ../../packages/console/lib/foreign.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ForeignHandler": () => (/* binding */ ForeignHandler)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

const FOREIGN_CELL_CLASS = 'jp-CodeConsole-foreignCell';
/**
 * A handler for capturing API messages from other sessions that should be
 * rendered in a given parent.
 */
class ForeignHandler {
    /**
     * Construct a new foreign message handler.
     */
    constructor(options) {
        this._enabled = false;
        this._isDisposed = false;
        this.sessionContext = options.sessionContext;
        this.sessionContext.iopubMessage.connect(this.onIOPubMessage, this);
        this._parent = options.parent;
    }
    /**
     * Set whether the handler is able to inject foreign cells into a console.
     */
    get enabled() {
        return this._enabled;
    }
    set enabled(value) {
        this._enabled = value;
    }
    /**
     * The foreign handler's parent receiver.
     */
    get parent() {
        return this._parent;
    }
    /**
     * Test whether the handler is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose the resources held by the handler.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal.clearData(this);
    }
    /**
     * Handler IOPub messages.
     *
     * @returns `true` if the message resulted in a new cell injection or a
     * previously injected cell being updated and `false` for all other messages.
     */
    onIOPubMessage(sender, msg) {
        var _a;
        // Only process messages if foreign cell injection is enabled.
        if (!this._enabled) {
            return false;
        }
        const kernel = (_a = this.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
        if (!kernel) {
            return false;
        }
        // Check whether this message came from an external session.
        const parent = this._parent;
        const session = msg.parent_header.session;
        if (session === kernel.clientId) {
            return false;
        }
        const msgType = msg.header.msg_type;
        const parentHeader = msg.parent_header;
        const parentMsgId = parentHeader.msg_id;
        let cell;
        switch (msgType) {
            case 'execute_input': {
                const inputMsg = msg;
                cell = this._newCell(parentMsgId);
                const model = cell.model;
                model.executionCount = inputMsg.content.execution_count;
                model.value.text = inputMsg.content.code;
                model.trusted = true;
                parent.update();
                return true;
            }
            case 'execute_result':
            case 'display_data':
            case 'stream':
            case 'error': {
                cell = this._parent.getCell(parentMsgId);
                if (!cell) {
                    return false;
                }
                const output = Object.assign(Object.assign({}, msg.content), { output_type: msgType });
                cell.model.outputs.add(output);
                parent.update();
                return true;
            }
            case 'clear_output': {
                const wait = msg.content.wait;
                cell = this._parent.getCell(parentMsgId);
                if (cell) {
                    cell.model.outputs.clear(wait);
                }
                return true;
            }
            default:
                return false;
        }
    }
    /**
     * Create a new code cell for an input originated from a foreign session.
     */
    _newCell(parentMsgId) {
        const cell = this.parent.createCodeCell();
        cell.addClass(FOREIGN_CELL_CLASS);
        this._parent.addCell(cell, parentMsgId);
        return cell;
    }
}
//# sourceMappingURL=foreign.js.map

/***/ }),

/***/ "../../packages/console/lib/history.js":
/*!*********************************************!*\
  !*** ../../packages/console/lib/history.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsoleHistory": () => (/* binding */ ConsoleHistory)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * A console history manager object.
 */
class ConsoleHistory {
    /**
     * Construct a new console history object.
     */
    constructor(options) {
        this._cursor = 0;
        this._hasSession = false;
        this._history = [];
        this._placeholder = '';
        this._setByHistory = false;
        this._isDisposed = false;
        this._editor = null;
        this._filtered = [];
        this.sessionContext = options.sessionContext;
        void this._handleKernel();
        this.sessionContext.kernelChanged.connect(this._handleKernel, this);
    }
    /**
     * The current editor used by the history manager.
     */
    get editor() {
        return this._editor;
    }
    set editor(value) {
        if (this._editor === value) {
            return;
        }
        const prev = this._editor;
        if (prev) {
            prev.edgeRequested.disconnect(this.onEdgeRequest, this);
            prev.model.value.changed.disconnect(this.onTextChange, this);
        }
        this._editor = value;
        if (value) {
            value.edgeRequested.connect(this.onEdgeRequest, this);
            value.model.value.changed.connect(this.onTextChange, this);
        }
    }
    /**
     * The placeholder text that a history session began with.
     */
    get placeholder() {
        return this._placeholder;
    }
    /**
     * Get whether the console history manager is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the console history manager.
     */
    dispose() {
        this._isDisposed = true;
        this._history.length = 0;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal.clearData(this);
    }
    /**
     * Get the previous item in the console history.
     *
     * @param placeholder - The placeholder string that gets temporarily added
     * to the history only for the duration of one history session. If multiple
     * placeholders are sent within a session, only the first one is accepted.
     *
     * @returns A Promise for console command text or `undefined` if unavailable.
     */
    back(placeholder) {
        if (!this._hasSession) {
            this._hasSession = true;
            this._placeholder = placeholder;
            // Filter the history with the placeholder string.
            this.setFilter(placeholder);
            this._cursor = this._filtered.length - 1;
        }
        --this._cursor;
        this._cursor = Math.max(0, this._cursor);
        const content = this._filtered[this._cursor];
        return Promise.resolve(content);
    }
    /**
     * Get the next item in the console history.
     *
     * @param placeholder - The placeholder string that gets temporarily added
     * to the history only for the duration of one history session. If multiple
     * placeholders are sent within a session, only the first one is accepted.
     *
     * @returns A Promise for console command text or `undefined` if unavailable.
     */
    forward(placeholder) {
        if (!this._hasSession) {
            this._hasSession = true;
            this._placeholder = placeholder;
            // Filter the history with the placeholder string.
            this.setFilter(placeholder);
            this._cursor = this._filtered.length;
        }
        ++this._cursor;
        this._cursor = Math.min(this._filtered.length - 1, this._cursor);
        const content = this._filtered[this._cursor];
        return Promise.resolve(content);
    }
    /**
     * Add a new item to the bottom of history.
     *
     * @param item The item being added to the bottom of history.
     *
     * #### Notes
     * If the item being added is undefined or empty, it is ignored. If the item
     * being added is the same as the last item in history, it is ignored as well
     * so that the console's history will consist of no contiguous repetitions.
     */
    push(item) {
        if (item && item !== this._history[this._history.length - 1]) {
            this._history.push(item);
        }
        this.reset();
    }
    /**
     * Reset the history navigation state, i.e., start a new history session.
     */
    reset() {
        this._cursor = this._history.length;
        this._hasSession = false;
        this._placeholder = '';
    }
    /**
     * Populate the history collection on history reply from a kernel.
     *
     * @param value The kernel message history reply.
     *
     * #### Notes
     * History entries have the shape:
     * [session: number, line: number, input: string]
     * Contiguous duplicates are stripped out of the API response.
     */
    onHistory(value) {
        this._history.length = 0;
        let last = '';
        let current = '';
        if (value.content.status === 'ok') {
            for (let i = 0; i < value.content.history.length; i++) {
                current = value.content.history[i][2];
                if (current !== last) {
                    this._history.push((last = current));
                }
            }
        }
        // Reset the history navigation cursor back to the bottom.
        this._cursor = this._history.length;
    }
    /**
     * Handle a text change signal from the editor.
     */
    onTextChange() {
        if (this._setByHistory) {
            this._setByHistory = false;
            return;
        }
        this.reset();
    }
    /**
     * Handle an edge requested signal.
     */
    onEdgeRequest(editor, location) {
        const model = editor.model;
        const source = model.value.text;
        if (location === 'top' || location === 'topLine') {
            void this.back(source).then(value => {
                if (this.isDisposed || !value) {
                    return;
                }
                if (model.value.text === value) {
                    return;
                }
                this._setByHistory = true;
                model.value.text = value;
                let columnPos = 0;
                columnPos = value.indexOf('\n');
                if (columnPos < 0) {
                    columnPos = value.length;
                }
                editor.setCursorPosition({ line: 0, column: columnPos });
            });
        }
        else {
            void this.forward(source).then(value => {
                if (this.isDisposed) {
                    return;
                }
                const text = value || this.placeholder;
                if (model.value.text === text) {
                    return;
                }
                this._setByHistory = true;
                model.value.text = text;
                const pos = editor.getPositionAt(text.length);
                if (pos) {
                    editor.setCursorPosition(pos);
                }
            });
        }
    }
    /**
     * Handle the current kernel changing.
     */
    async _handleKernel() {
        var _a;
        const kernel = (_a = this.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
        if (!kernel) {
            this._history.length = 0;
            return;
        }
        return kernel.requestHistory(Private.initialRequest).then(v => {
            this.onHistory(v);
        });
    }
    /**
     * Set the filter data.
     *
     * @param filterStr - The string to use when filtering the data.
     */
    setFilter(filterStr = '') {
        // Apply the new filter and remove contiguous duplicates.
        this._filtered.length = 0;
        let last = '';
        let current = '';
        for (let i = 0; i < this._history.length; i++) {
            current = this._history[i];
            if (current !== last &&
                filterStr === current.slice(0, filterStr.length)) {
                this._filtered.push((last = current));
            }
        }
        this._filtered.push(filterStr);
    }
}
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    Private.initialRequest = {
        output: false,
        raw: true,
        hist_access_type: 'tail',
        n: 500
    };
})(Private || (Private = {}));
//# sourceMappingURL=history.js.map

/***/ }),

/***/ "../../packages/console/lib/index.js":
/*!*******************************************!*\
  !*** ../../packages/console/lib/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ForeignHandler": () => (/* reexport safe */ _foreign__WEBPACK_IMPORTED_MODULE_0__.ForeignHandler),
/* harmony export */   "ConsoleHistory": () => (/* reexport safe */ _history__WEBPACK_IMPORTED_MODULE_1__.ConsoleHistory),
/* harmony export */   "ConsolePanel": () => (/* reexport safe */ _panel__WEBPACK_IMPORTED_MODULE_2__.ConsolePanel),
/* harmony export */   "IConsoleTracker": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_3__.IConsoleTracker),
/* harmony export */   "CodeConsole": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_4__.CodeConsole)
/* harmony export */ });
/* harmony import */ var _foreign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foreign */ "../../packages/console/lib/foreign.js");
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./history */ "../../packages/console/lib/history.js");
/* harmony import */ var _panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./panel */ "../../packages/console/lib/panel.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tokens */ "../../packages/console/lib/tokens.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./widget */ "../../packages/console/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module console
 */





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/console/lib/panel.js":
/*!*******************************************!*\
  !*** ../../packages/console/lib/panel.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConsolePanel": () => (/* binding */ ConsolePanel)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./widget */ "../../packages/console/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * The class name added to console panels.
 */
const PANEL_CLASS = 'jp-ConsolePanel';
/**
 * A panel which contains a console and the ability to add other children.
 */
class ConsolePanel extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.MainAreaWidget {
    /**
     * Construct a console panel.
     */
    constructor(options) {
        super({ content: new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Panel() });
        this._executed = null;
        this._connected = null;
        this.addClass(PANEL_CLASS);
        let { rendermime, mimeTypeService, path, basePath, name, manager, modelFactory, sessionContext, translator } = options;
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
        const trans = this.translator.load('jupyterlab');
        const contentFactory = (this.contentFactory =
            options.contentFactory || ConsolePanel.defaultContentFactory);
        const count = Private.count++;
        if (!path) {
            path = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.URLExt.join(basePath || '', `console-${count}-${_lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.UUID.uuid4()}`);
        }
        sessionContext = this._sessionContext =
            sessionContext ||
                new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.SessionContext({
                    sessionManager: manager.sessions,
                    specsManager: manager.kernelspecs,
                    path,
                    name: name || trans.__('Console %1', count),
                    type: 'console',
                    kernelPreference: options.kernelPreference,
                    setBusy: options.setBusy
                });
        const resolver = new _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__.RenderMimeRegistry.UrlResolver({
            session: sessionContext,
            contents: manager.contents
        });
        rendermime = rendermime.clone({ resolver });
        this.console = contentFactory.createConsole({
            rendermime,
            sessionContext: sessionContext,
            mimeTypeService,
            contentFactory,
            modelFactory
        });
        this.content.addWidget(this.console);
        void sessionContext.initialize().then(async (value) => {
            if (value) {
                await _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.sessionContextDialogs.selectKernel(sessionContext);
            }
            this._connected = new Date();
            this._updateTitlePanel();
        });
        this.console.executed.connect(this._onExecuted, this);
        this._updateTitlePanel();
        sessionContext.kernelChanged.connect(this._updateTitlePanel, this);
        sessionContext.propertyChanged.connect(this._updateTitlePanel, this);
        this.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__.consoleIcon;
        this.title.closable = true;
        this.id = `console-${count}`;
    }
    /**
     * The session used by the panel.
     */
    get sessionContext() {
        return this._sessionContext;
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        this.sessionContext.dispose();
        this.console.dispose();
        super.dispose();
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        const prompt = this.console.promptCell;
        if (prompt) {
            prompt.editor.focus();
        }
    }
    /**
     * Handle `'close-request'` messages.
     */
    onCloseRequest(msg) {
        super.onCloseRequest(msg);
        this.dispose();
    }
    /**
     * Handle a console execution.
     */
    _onExecuted(sender, args) {
        this._executed = args;
        this._updateTitlePanel();
    }
    /**
     * Update the console panel title.
     */
    _updateTitlePanel() {
        Private.updateTitle(this, this._connected, this._executed, this.translator);
    }
}
/**
 * A namespace for ConsolePanel statics.
 */
(function (ConsolePanel) {
    /**
     * Default implementation of `IContentFactory`.
     */
    class ContentFactory extends _widget__WEBPACK_IMPORTED_MODULE_7__.CodeConsole.ContentFactory {
        /**
         * Create a new console panel.
         */
        createConsole(options) {
            return new _widget__WEBPACK_IMPORTED_MODULE_7__.CodeConsole(options);
        }
    }
    ConsolePanel.ContentFactory = ContentFactory;
    /**
     * A default code console content factory.
     */
    ConsolePanel.defaultContentFactory = new ContentFactory();
    /* tslint:disable */
    /**
     * The console renderer token.
     */
    ConsolePanel.IContentFactory = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.Token('@jupyterlab/console:IContentFactory');
    /* tslint:enable */
})(ConsolePanel || (ConsolePanel = {}));
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * The counter for new consoles.
     */
    Private.count = 1;
    /**
     * Update the title of a console panel.
     */
    function updateTitle(panel, connected, executed, translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
        const trans = translator.load('jupyterlab');
        const sessionContext = panel.console.sessionContext.session;
        if (sessionContext) {
            // FIXME:
            let caption = trans.__('Name: %1\n', sessionContext.name) +
                trans.__('Directory: %1\n', _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.dirname(sessionContext.path)) +
                trans.__('Kernel: %1', panel.console.sessionContext.kernelDisplayName);
            if (connected) {
                caption += trans.__('\nConnected: %1', _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.Time.format(connected.toISOString()));
            }
            if (executed) {
                caption += trans.__('\nLast Execution: %1');
            }
            panel.title.label = sessionContext.name;
            panel.title.caption = caption;
        }
        else {
            panel.title.label = trans.__('Console');
            panel.title.caption = '';
        }
    }
    Private.updateTitle = updateTitle;
})(Private || (Private = {}));
//# sourceMappingURL=panel.js.map

/***/ }),

/***/ "../../packages/console/lib/tokens.js":
/*!********************************************!*\
  !*** ../../packages/console/lib/tokens.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IConsoleTracker": () => (/* binding */ IConsoleTracker)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The console tracker token.
 */
const IConsoleTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/console:IConsoleTracker');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/console/lib/widget.js":
/*!********************************************!*\
  !*** ../../packages/console/lib/widget.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeConsole": () => (/* binding */ CodeConsole)
/* harmony export */ });
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/cells */ "webpack/sharing/consume/default/@jupyterlab/cells/@jupyterlab/cells");
/* harmony import */ var _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/observables */ "webpack/sharing/consume/default/@jupyterlab/observables/@jupyterlab/observables");
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_dragdrop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/dragdrop */ "webpack/sharing/consume/default/@lumino/dragdrop/@lumino/dragdrop");
/* harmony import */ var _lumino_dragdrop__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_dragdrop__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _history__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./history */ "../../packages/console/lib/history.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * The data attribute added to a widget that has an active kernel.
 */
const KERNEL_USER = 'jpKernelUser';
/**
 * The data attribute added to a widget can run code.
 */
const CODE_RUNNER = 'jpCodeRunner';
/**
 * The class name added to console widgets.
 */
const CONSOLE_CLASS = 'jp-CodeConsole';
/**
 * The class added to console cells
 */
const CONSOLE_CELL_CLASS = 'jp-Console-cell';
/**
 * The class name added to the console banner.
 */
const BANNER_CLASS = 'jp-CodeConsole-banner';
/**
 * The class name of the active prompt cell.
 */
const PROMPT_CLASS = 'jp-CodeConsole-promptCell';
/**
 * The class name of the panel that holds cell content.
 */
const CONTENT_CLASS = 'jp-CodeConsole-content';
/**
 * The class name of the panel that holds prompts.
 */
const INPUT_CLASS = 'jp-CodeConsole-input';
/**
 * The timeout in ms for execution requests to the kernel.
 */
const EXECUTION_TIMEOUT = 250;
/**
 * The mimetype used for Jupyter cell data.
 */
const JUPYTER_CELL_MIME = 'application/vnd.jupyter.cells';
/**
 * A widget containing a Jupyter console.
 *
 * #### Notes
 * The CodeConsole class is intended to be used within a ConsolePanel
 * instance. Under most circumstances, it is not instantiated by user code.
 */
class CodeConsole extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget {
    /**
     * Construct a console widget.
     */
    constructor(options) {
        super();
        this._banner = null;
        this._executed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__.Signal(this);
        this._mimetype = 'text/x-ipython';
        this._msgIds = new Map();
        this._msgIdCells = new Map();
        this._promptCellCreated = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__.Signal(this);
        this._dragData = null;
        this._drag = null;
        this._focusedCell = null;
        this.addClass(CONSOLE_CLASS);
        this.node.dataset[KERNEL_USER] = 'true';
        this.node.dataset[CODE_RUNNER] = 'true';
        this.node.tabIndex = -1; // Allow the widget to take focus.
        // Create the panels that hold the content and input.
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.PanelLayout());
        this._cells = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__.ObservableList();
        this._content = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Panel();
        this._input = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Panel();
        this.contentFactory =
            options.contentFactory || CodeConsole.defaultContentFactory;
        this.modelFactory = options.modelFactory || CodeConsole.defaultModelFactory;
        this.rendermime = options.rendermime;
        this.sessionContext = options.sessionContext;
        this._mimeTypeService = options.mimeTypeService;
        // Add top-level CSS classes.
        this._content.addClass(CONTENT_CLASS);
        this._input.addClass(INPUT_CLASS);
        // Insert the content and input panes into the widget.
        layout.addWidget(this._content);
        layout.addWidget(this._input);
        this._history = new _history__WEBPACK_IMPORTED_MODULE_7__.ConsoleHistory({
            sessionContext: this.sessionContext
        });
        void this._onKernelChanged();
        this.sessionContext.kernelChanged.connect(this._onKernelChanged, this);
        this.sessionContext.statusChanged.connect(this._onKernelStatusChanged, this);
    }
    /**
     * A signal emitted when the console finished executing its prompt cell.
     */
    get executed() {
        return this._executed;
    }
    /**
     * A signal emitted when a new prompt cell is created.
     */
    get promptCellCreated() {
        return this._promptCellCreated;
    }
    /**
     * The list of content cells in the console.
     *
     * #### Notes
     * This list does not include the current banner or the prompt for a console.
     * It may include previous banners as raw cells.
     */
    get cells() {
        return this._cells;
    }
    /*
     * The console input prompt cell.
     */
    get promptCell() {
        const inputLayout = this._input.layout;
        return inputLayout.widgets[0] || null;
    }
    /**
     * Add a new cell to the content panel.
     *
     * @param cell - The code cell widget being added to the content panel.
     *
     * @param msgId - The optional execution message id for the cell.
     *
     * #### Notes
     * This method is meant for use by outside classes that want to add cells to a
     * console. It is distinct from the `inject` method in that it requires
     * rendered code cell widgets and does not execute them (though it can store
     * the execution message id).
     */
    addCell(cell, msgId) {
        cell.addClass(CONSOLE_CELL_CLASS);
        this._content.addWidget(cell);
        this._cells.push(cell);
        if (msgId) {
            this._msgIds.set(msgId, cell);
            this._msgIdCells.set(cell, msgId);
        }
        cell.disposed.connect(this._onCellDisposed, this);
        this.update();
    }
    /**
     * Add a banner cell.
     */
    addBanner() {
        if (this._banner) {
            // An old banner just becomes a normal cell now.
            const cell = this._banner;
            this._cells.push(this._banner);
            cell.disposed.connect(this._onCellDisposed, this);
        }
        // Create the banner.
        const model = this.modelFactory.createRawCell({});
        model.value.text = '...';
        const banner = (this._banner = new _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.RawCell({
            model,
            contentFactory: this.contentFactory,
            placeholder: false
        })).initializeState();
        banner.addClass(BANNER_CLASS);
        banner.readOnly = true;
        this._content.addWidget(banner);
    }
    /**
     * Clear the code cells.
     */
    clear() {
        // Dispose all the content cells
        const cells = this._cells;
        while (cells.length > 0) {
            cells.get(0).dispose();
        }
    }
    /**
     * Create a new cell with the built-in factory.
     */
    createCodeCell() {
        const factory = this.contentFactory;
        const options = this._createCodeCellOptions();
        const cell = factory.createCodeCell(options);
        cell.readOnly = true;
        cell.model.mimeType = this._mimetype;
        return cell;
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        // Do nothing if already disposed.
        if (this.isDisposed) {
            return;
        }
        this._cells.clear();
        this._msgIdCells = null;
        this._msgIds = null;
        this._history.dispose();
        super.dispose();
    }
    /**
     * Execute the current prompt.
     *
     * @param force - Whether to force execution without checking code
     * completeness.
     *
     * @param timeout - The length of time, in milliseconds, that the execution
     * should wait for the API to determine whether code being submitted is
     * incomplete before attempting submission anyway. The default value is `250`.
     */
    async execute(force = false, timeout = EXECUTION_TIMEOUT) {
        var _a, _b;
        if (((_b = (_a = this.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel) === null || _b === void 0 ? void 0 : _b.status) === 'dead') {
            return;
        }
        const promptCell = this.promptCell;
        if (!promptCell) {
            throw new Error('Cannot execute without a prompt cell');
        }
        promptCell.model.trusted = true;
        if (force) {
            // Create a new prompt cell before kernel execution to allow typeahead.
            this.newPromptCell();
            await this._execute(promptCell);
            return;
        }
        // Check whether we should execute.
        const shouldExecute = await this._shouldExecute(timeout);
        if (this.isDisposed) {
            return;
        }
        if (shouldExecute) {
            // Create a new prompt cell before kernel execution to allow typeahead.
            this.newPromptCell();
            this.promptCell.editor.focus();
            await this._execute(promptCell);
        }
        else {
            // add a newline if we shouldn't execute
            promptCell.editor.newIndentedLine();
        }
    }
    /**
     * Get a cell given a message id.
     *
     * @param msgId - The message id.
     */
    getCell(msgId) {
        return this._msgIds.get(msgId);
    }
    /**
     * Inject arbitrary code for the console to execute immediately.
     *
     * @param code - The code contents of the cell being injected.
     *
     * @returns A promise that indicates when the injected cell's execution ends.
     */
    inject(code, metadata = {}) {
        const cell = this.createCodeCell();
        cell.model.value.text = code;
        for (const key of Object.keys(metadata)) {
            cell.model.metadata.set(key, metadata[key]);
        }
        this.addCell(cell);
        return this._execute(cell);
    }
    /**
     * Insert a line break in the prompt cell.
     */
    insertLinebreak() {
        const promptCell = this.promptCell;
        if (!promptCell) {
            return;
        }
        promptCell.editor.newIndentedLine();
    }
    /**
     * Replaces the selected text in the prompt cell.
     *
     * @param text - The text to replace the selection.
     */
    replaceSelection(text) {
        var _a, _b;
        const promptCell = this.promptCell;
        if (!promptCell) {
            return;
        }
        (_b = (_a = promptCell.editor).replaceSelection) === null || _b === void 0 ? void 0 : _b.call(_a, text);
    }
    /**
     * Serialize the output.
     *
     * #### Notes
     * This only serializes the code cells and the prompt cell if it exists, and
     * skips any old banner cells.
     */
    serialize() {
        const cells = [];
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(this._cells, cell => {
            const model = cell.model;
            if ((0,_jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.isCodeCellModel)(model)) {
                cells.push(model.toJSON());
            }
        });
        if (this.promptCell) {
            cells.push(this.promptCell.model.toJSON());
        }
        return cells;
    }
    /**
     * Handle `mousedown` events for the widget.
     */
    _evtMouseDown(event) {
        const { button, shiftKey } = event;
        // We only handle main or secondary button actions.
        if (!(button === 0 || button === 2) ||
            // Shift right-click gives the browser default behavior.
            (shiftKey && button === 2)) {
            return;
        }
        let target = event.target;
        const cellFilter = (node) => node.classList.contains(CONSOLE_CELL_CLASS);
        let cellIndex = _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.CellDragUtils.findCell(target, this._cells, cellFilter);
        if (cellIndex === -1) {
            // `event.target` sometimes gives an orphaned node in
            // Firefox 57, which can have `null` anywhere in its parent line. If we fail
            // to find a cell using `event.target`, try again using a target
            // reconstructed from the position of the click event.
            target = document.elementFromPoint(event.clientX, event.clientY);
            cellIndex = _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.CellDragUtils.findCell(target, this._cells, cellFilter);
        }
        if (cellIndex === -1) {
            return;
        }
        const cell = this._cells.get(cellIndex);
        const targetArea = _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.CellDragUtils.detectTargetArea(cell, event.target);
        if (targetArea === 'prompt') {
            this._dragData = {
                pressX: event.clientX,
                pressY: event.clientY,
                index: cellIndex
            };
            this._focusedCell = cell;
            document.addEventListener('mouseup', this, true);
            document.addEventListener('mousemove', this, true);
            event.preventDefault();
        }
    }
    /**
     * Handle `mousemove` event of widget
     */
    _evtMouseMove(event) {
        const data = this._dragData;
        if (data &&
            _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.CellDragUtils.shouldStartDrag(data.pressX, data.pressY, event.clientX, event.clientY)) {
            void this._startDrag(data.index, event.clientX, event.clientY);
        }
    }
    /**
     * Start a drag event
     */
    _startDrag(index, clientX, clientY) {
        const cellModel = this._focusedCell.model;
        const selected = [cellModel.toJSON()];
        const dragImage = _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.CellDragUtils.createCellDragImage(this._focusedCell, selected);
        this._drag = new _lumino_dragdrop__WEBPACK_IMPORTED_MODULE_4__.Drag({
            mimeData: new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.MimeData(),
            dragImage,
            proposedAction: 'copy',
            supportedActions: 'copy',
            source: this
        });
        this._drag.mimeData.setData(JUPYTER_CELL_MIME, selected);
        const textContent = cellModel.value.text;
        this._drag.mimeData.setData('text/plain', textContent);
        this._focusedCell = null;
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('mouseup', this, true);
        return this._drag.start(clientX, clientY).then(() => {
            if (this.isDisposed) {
                return;
            }
            this._drag = null;
            this._dragData = null;
        });
    }
    /**
     * Handle the DOM events for the widget.
     *
     * @param event -The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the notebook panel's node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'keydown':
                this._evtKeyDown(event);
                break;
            case 'mousedown':
                this._evtMouseDown(event);
                break;
            case 'mousemove':
                this._evtMouseMove(event);
                break;
            case 'mouseup':
                this._evtMouseUp(event);
                break;
            default:
                break;
        }
    }
    /**
     * Handle `after_attach` messages for the widget.
     */
    onAfterAttach(msg) {
        const node = this.node;
        node.addEventListener('keydown', this, true);
        node.addEventListener('click', this);
        node.addEventListener('mousedown', this);
        // Create a prompt if necessary.
        if (!this.promptCell) {
            this.newPromptCell();
        }
        else {
            this.promptCell.editor.focus();
            this.update();
        }
    }
    /**
     * Handle `before-detach` messages for the widget.
     */
    onBeforeDetach(msg) {
        const node = this.node;
        node.removeEventListener('keydown', this, true);
        node.removeEventListener('click', this);
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        const editor = this.promptCell && this.promptCell.editor;
        if (editor) {
            editor.focus();
        }
        this.update();
    }
    /**
     * Make a new prompt cell.
     */
    newPromptCell() {
        let promptCell = this.promptCell;
        const input = this._input;
        // Make the last prompt read-only, clear its signals, and move to content.
        if (promptCell) {
            promptCell.readOnly = true;
            promptCell.removeClass(PROMPT_CLASS);
            _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__.Signal.clearData(promptCell.editor);
            const child = input.widgets[0];
            child.parent = null;
            this.addCell(promptCell);
        }
        // Create the new prompt cell.
        const factory = this.contentFactory;
        const options = this._createCodeCellOptions();
        promptCell = factory.createCodeCell(options);
        promptCell.model.mimeType = this._mimetype;
        promptCell.addClass(PROMPT_CLASS);
        // Add the prompt cell to the DOM, making `this.promptCell` valid again.
        this._input.addWidget(promptCell);
        // Suppress the default "Enter" key handling.
        const editor = promptCell.editor;
        editor.addKeydownHandler(this._onEditorKeydown);
        this._history.editor = editor;
        this._promptCellCreated.emit(promptCell);
    }
    /**
     * Handle `update-request` messages.
     */
    onUpdateRequest(msg) {
        Private.scrollToBottom(this._content.node);
    }
    /**
     * Handle the `'keydown'` event for the widget.
     */
    _evtKeyDown(event) {
        const editor = this.promptCell && this.promptCell.editor;
        if (!editor) {
            return;
        }
        if (event.keyCode === 13 && !editor.hasFocus()) {
            event.preventDefault();
            editor.focus();
        }
        else if (event.keyCode === 27 && editor.hasFocus()) {
            // Set to command mode
            event.preventDefault();
            event.stopPropagation();
            this.node.focus();
        }
    }
    /**
     * Handle the `'mouseup'` event for the widget.
     */
    _evtMouseUp(event) {
        if (this.promptCell &&
            this.promptCell.node.contains(event.target)) {
            this.promptCell.editor.focus();
        }
    }
    /**
     * Execute the code in the current prompt cell.
     */
    _execute(cell) {
        const source = cell.model.value.text;
        this._history.push(source);
        // If the source of the console is just "clear", clear the console as we
        // do in IPython or QtConsole.
        if (source === 'clear' || source === '%clear') {
            this.clear();
            return Promise.resolve(void 0);
        }
        cell.model.contentChanged.connect(this.update, this);
        const onSuccess = (value) => {
            if (this.isDisposed) {
                return;
            }
            if (value && value.content.status === 'ok') {
                const content = value.content;
                // Use deprecated payloads for backwards compatibility.
                if (content.payload && content.payload.length) {
                    const setNextInput = content.payload.filter(i => {
                        return i.source === 'set_next_input';
                    })[0];
                    if (setNextInput) {
                        const text = setNextInput.text;
                        // Ignore the `replace` value and always set the next cell.
                        cell.model.value.text = text;
                    }
                }
            }
            else if (value && value.content.status === 'error') {
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_2__.each)(this._cells, (cell) => {
                    if (cell.model.executionCount === null) {
                        cell.setPrompt('');
                    }
                });
            }
            cell.model.contentChanged.disconnect(this.update, this);
            this.update();
            this._executed.emit(new Date());
        };
        const onFailure = () => {
            if (this.isDisposed) {
                return;
            }
            cell.model.contentChanged.disconnect(this.update, this);
            this.update();
        };
        return _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.CodeCell.execute(cell, this.sessionContext).then(onSuccess, onFailure);
    }
    /**
     * Update the console based on the kernel info.
     */
    _handleInfo(info) {
        if (info.status !== 'ok') {
            this._banner.model.value.text = 'Error in getting kernel banner';
            return;
        }
        this._banner.model.value.text = info.banner;
        const lang = info.language_info;
        this._mimetype = this._mimeTypeService.getMimeTypeByLanguage(lang);
        if (this.promptCell) {
            this.promptCell.model.mimeType = this._mimetype;
        }
    }
    /**
     * Create the options used to initialize a code cell widget.
     */
    _createCodeCellOptions() {
        const contentFactory = this.contentFactory;
        const modelFactory = this.modelFactory;
        const model = modelFactory.createCodeCell({});
        const rendermime = this.rendermime;
        const editorConfig = this.editorConfig;
        return {
            model,
            rendermime,
            contentFactory,
            editorConfig,
            placeholder: false
        };
    }
    /**
     * Handle cell disposed signals.
     */
    _onCellDisposed(sender, args) {
        if (!this.isDisposed) {
            this._cells.removeValue(sender);
            const msgId = this._msgIdCells.get(sender);
            if (msgId) {
                this._msgIdCells.delete(sender);
                this._msgIds.delete(msgId);
            }
        }
    }
    /**
     * Test whether we should execute the prompt cell.
     */
    _shouldExecute(timeout) {
        const promptCell = this.promptCell;
        if (!promptCell) {
            return Promise.resolve(false);
        }
        const model = promptCell.model;
        const code = model.value.text;
        return new Promise((resolve, reject) => {
            var _a;
            const timer = setTimeout(() => {
                resolve(true);
            }, timeout);
            const kernel = (_a = this.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
            if (!kernel) {
                resolve(false);
                return;
            }
            kernel
                .requestIsComplete({ code })
                .then(isComplete => {
                clearTimeout(timer);
                if (this.isDisposed) {
                    resolve(false);
                }
                if (isComplete.content.status !== 'incomplete') {
                    resolve(true);
                    return;
                }
                resolve(false);
            })
                .catch(() => {
                resolve(true);
            });
        });
    }
    /**
     * Handle a keydown event on an editor.
     */
    _onEditorKeydown(editor, event) {
        // Suppress "Enter" events.
        return event.keyCode === 13;
    }
    /**
     * Handle a change to the kernel.
     */
    async _onKernelChanged() {
        var _a;
        this.clear();
        if (this._banner) {
            this._banner.dispose();
            this._banner = null;
        }
        this.addBanner();
        if ((_a = this.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel) {
            this._handleInfo(await this.sessionContext.session.kernel.info);
        }
    }
    /**
     * Handle a change to the kernel status.
     */
    async _onKernelStatusChanged() {
        var _a;
        const kernel = (_a = this.sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
        if ((kernel === null || kernel === void 0 ? void 0 : kernel.status) === 'restarting') {
            this.addBanner();
            this._handleInfo(await (kernel === null || kernel === void 0 ? void 0 : kernel.info));
        }
    }
}
/**
 * A namespace for CodeConsole statics.
 */
(function (CodeConsole) {
    /**
     * Default implementation of `IContentFactory`.
     */
    class ContentFactory extends _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.Cell.ContentFactory {
        /**
         * Create a new code cell widget.
         *
         * #### Notes
         * If no cell content factory is passed in with the options, the one on the
         * notebook content factory is used.
         */
        createCodeCell(options) {
            if (!options.contentFactory) {
                options.contentFactory = this;
            }
            return new _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.CodeCell(options).initializeState();
        }
        /**
         * Create a new raw cell widget.
         *
         * #### Notes
         * If no cell content factory is passed in with the options, the one on the
         * notebook content factory is used.
         */
        createRawCell(options) {
            if (!options.contentFactory) {
                options.contentFactory = this;
            }
            return new _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.RawCell(options).initializeState();
        }
    }
    CodeConsole.ContentFactory = ContentFactory;
    /**
     * A default content factory for the code console.
     */
    CodeConsole.defaultContentFactory = new ContentFactory();
    /**
     * The default implementation of an `IModelFactory`.
     */
    class ModelFactory {
        /**
         * Create a new cell model factory.
         */
        constructor(options = {}) {
            this.codeCellContentFactory =
                options.codeCellContentFactory || _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.CodeCellModel.defaultContentFactory;
        }
        /**
         * Create a new code cell.
         *
         * @param source - The data to use for the original source data.
         *
         * @returns A new code cell. If a source cell is provided, the
         *   new cell will be initialized with the data from the source.
         *   If the contentFactory is not provided, the instance
         *   `codeCellContentFactory` will be used.
         */
        createCodeCell(options) {
            if (!options.contentFactory) {
                options.contentFactory = this.codeCellContentFactory;
            }
            return new _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.CodeCellModel(options);
        }
        /**
         * Create a new raw cell.
         *
         * @param source - The data to use for the original source data.
         *
         * @returns A new raw cell. If a source cell is provided, the
         *   new cell will be initialized with the data from the source.
         */
        createRawCell(options) {
            return new _jupyterlab_cells__WEBPACK_IMPORTED_MODULE_0__.RawCellModel(options);
        }
    }
    CodeConsole.ModelFactory = ModelFactory;
    /**
     * The default `ModelFactory` instance.
     */
    CodeConsole.defaultModelFactory = new ModelFactory({});
})(CodeConsole || (CodeConsole = {}));
/**
 * A namespace for console widget private data.
 */
var Private;
(function (Private) {
    /**
     * Jump to the bottom of a node.
     *
     * @param node - The scrollable element.
     */
    function scrollToBottom(node) {
        node.scrollTop = node.scrollHeight - node.clientHeight;
    }
    Private.scrollToBottom = scrollToBottom;
})(Private || (Private = {}));
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29uc29sZS9saWIvZm9yZWlnbi5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29uc29sZS9saWIvaGlzdG9yeS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29uc29sZS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NvbnNvbGUvbGliL3BhbmVsLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9jb25zb2xlL2xpYi90b2tlbnMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NvbnNvbGUvbGliL3dpZGdldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQzJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0RBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGlCQUFpQix1QkFBdUI7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFIQTtBQUNBO0FBQzJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLCtEQUFnQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQix1REFBSTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwrREFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLE9BQU87QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLGtFQUFtQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVEQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzREFBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0Esa0RBQWtELGtGQUFtQztBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNERBQWE7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMkRBQVk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pELENBQUMsa0NBQWtDO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQixrQyIsImZpbGUiOiJwYWNrYWdlc19jb25zb2xlX2xpYl9pbmRleF9qcy5iYmM2ODIyMzg0N2IxZGFiMjc1Ni5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmNvbnN0IEZPUkVJR05fQ0VMTF9DTEFTUyA9ICdqcC1Db2RlQ29uc29sZS1mb3JlaWduQ2VsbCc7XG4vKipcbiAqIEEgaGFuZGxlciBmb3IgY2FwdHVyaW5nIEFQSSBtZXNzYWdlcyBmcm9tIG90aGVyIHNlc3Npb25zIHRoYXQgc2hvdWxkIGJlXG4gKiByZW5kZXJlZCBpbiBhIGdpdmVuIHBhcmVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEZvcmVpZ25IYW5kbGVyIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgZm9yZWlnbiBtZXNzYWdlIGhhbmRsZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXNzaW9uQ29udGV4dCA9IG9wdGlvbnMuc2Vzc2lvbkNvbnRleHQ7XG4gICAgICAgIHRoaXMuc2Vzc2lvbkNvbnRleHQuaW9wdWJNZXNzYWdlLmNvbm5lY3QodGhpcy5vbklPUHViTWVzc2FnZSwgdGhpcyk7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IG9wdGlvbnMucGFyZW50O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgd2hldGhlciB0aGUgaGFuZGxlciBpcyBhYmxlIHRvIGluamVjdCBmb3JlaWduIGNlbGxzIGludG8gYSBjb25zb2xlLlxuICAgICAqL1xuICAgIGdldCBlbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgICB9XG4gICAgc2V0IGVuYWJsZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZm9yZWlnbiBoYW5kbGVyJ3MgcGFyZW50IHJlY2VpdmVyLlxuICAgICAqL1xuICAgIGdldCBwYXJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlc3Qgd2hldGhlciB0aGUgaGFuZGxlciBpcyBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2UgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBoYW5kbGVyLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlciBJT1B1YiBtZXNzYWdlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiB0aGUgbWVzc2FnZSByZXN1bHRlZCBpbiBhIG5ldyBjZWxsIGluamVjdGlvbiBvciBhXG4gICAgICogcHJldmlvdXNseSBpbmplY3RlZCBjZWxsIGJlaW5nIHVwZGF0ZWQgYW5kIGBmYWxzZWAgZm9yIGFsbCBvdGhlciBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvbklPUHViTWVzc2FnZShzZW5kZXIsIG1zZykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIE9ubHkgcHJvY2VzcyBtZXNzYWdlcyBpZiBmb3JlaWduIGNlbGwgaW5qZWN0aW9uIGlzIGVuYWJsZWQuXG4gICAgICAgIGlmICghdGhpcy5fZW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtlcm5lbCA9IChfYSA9IHRoaXMuc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmtlcm5lbDtcbiAgICAgICAgaWYgKCFrZXJuZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoaXMgbWVzc2FnZSBjYW1lIGZyb20gYW4gZXh0ZXJuYWwgc2Vzc2lvbi5cbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgICAgICBjb25zdCBzZXNzaW9uID0gbXNnLnBhcmVudF9oZWFkZXIuc2Vzc2lvbjtcbiAgICAgICAgaWYgKHNlc3Npb24gPT09IGtlcm5lbC5jbGllbnRJZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1zZ1R5cGUgPSBtc2cuaGVhZGVyLm1zZ190eXBlO1xuICAgICAgICBjb25zdCBwYXJlbnRIZWFkZXIgPSBtc2cucGFyZW50X2hlYWRlcjtcbiAgICAgICAgY29uc3QgcGFyZW50TXNnSWQgPSBwYXJlbnRIZWFkZXIubXNnX2lkO1xuICAgICAgICBsZXQgY2VsbDtcbiAgICAgICAgc3dpdGNoIChtc2dUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdleGVjdXRlX2lucHV0Jzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0TXNnID0gbXNnO1xuICAgICAgICAgICAgICAgIGNlbGwgPSB0aGlzLl9uZXdDZWxsKHBhcmVudE1zZ0lkKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RlbCA9IGNlbGwubW9kZWw7XG4gICAgICAgICAgICAgICAgbW9kZWwuZXhlY3V0aW9uQ291bnQgPSBpbnB1dE1zZy5jb250ZW50LmV4ZWN1dGlvbl9jb3VudDtcbiAgICAgICAgICAgICAgICBtb2RlbC52YWx1ZS50ZXh0ID0gaW5wdXRNc2cuY29udGVudC5jb2RlO1xuICAgICAgICAgICAgICAgIG1vZGVsLnRydXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHBhcmVudC51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2V4ZWN1dGVfcmVzdWx0JzpcbiAgICAgICAgICAgIGNhc2UgJ2Rpc3BsYXlfZGF0YSc6XG4gICAgICAgICAgICBjYXNlICdzdHJlYW0nOlxuICAgICAgICAgICAgY2FzZSAnZXJyb3InOiB7XG4gICAgICAgICAgICAgICAgY2VsbCA9IHRoaXMuX3BhcmVudC5nZXRDZWxsKHBhcmVudE1zZ0lkKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBvdXRwdXQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIG1zZy5jb250ZW50KSwgeyBvdXRwdXRfdHlwZTogbXNnVHlwZSB9KTtcbiAgICAgICAgICAgICAgICBjZWxsLm1vZGVsLm91dHB1dHMuYWRkKG91dHB1dCk7XG4gICAgICAgICAgICAgICAgcGFyZW50LnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnY2xlYXJfb3V0cHV0Jzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdhaXQgPSBtc2cuY29udGVudC53YWl0O1xuICAgICAgICAgICAgICAgIGNlbGwgPSB0aGlzLl9wYXJlbnQuZ2V0Q2VsbChwYXJlbnRNc2dJZCk7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5tb2RlbC5vdXRwdXRzLmNsZWFyKHdhaXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBjb2RlIGNlbGwgZm9yIGFuIGlucHV0IG9yaWdpbmF0ZWQgZnJvbSBhIGZvcmVpZ24gc2Vzc2lvbi5cbiAgICAgKi9cbiAgICBfbmV3Q2VsbChwYXJlbnRNc2dJZCkge1xuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5wYXJlbnQuY3JlYXRlQ29kZUNlbGwoKTtcbiAgICAgICAgY2VsbC5hZGRDbGFzcyhGT1JFSUdOX0NFTExfQ0xBU1MpO1xuICAgICAgICB0aGlzLl9wYXJlbnQuYWRkQ2VsbChjZWxsLCBwYXJlbnRNc2dJZCk7XG4gICAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZvcmVpZ24uanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBBIGNvbnNvbGUgaGlzdG9yeSBtYW5hZ2VyIG9iamVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbnNvbGVIaXN0b3J5IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgY29uc29sZSBoaXN0b3J5IG9iamVjdC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2N1cnNvciA9IDA7XG4gICAgICAgIHRoaXMuX2hhc1Nlc3Npb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faGlzdG9yeSA9IFtdO1xuICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9ICcnO1xuICAgICAgICB0aGlzLl9zZXRCeUhpc3RvcnkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lZGl0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLl9maWx0ZXJlZCA9IFtdO1xuICAgICAgICB0aGlzLnNlc3Npb25Db250ZXh0ID0gb3B0aW9ucy5zZXNzaW9uQ29udGV4dDtcbiAgICAgICAgdm9pZCB0aGlzLl9oYW5kbGVLZXJuZWwoKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uQ29udGV4dC5rZXJuZWxDaGFuZ2VkLmNvbm5lY3QodGhpcy5faGFuZGxlS2VybmVsLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgZWRpdG9yIHVzZWQgYnkgdGhlIGhpc3RvcnkgbWFuYWdlci5cbiAgICAgKi9cbiAgICBnZXQgZWRpdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yO1xuICAgIH1cbiAgICBzZXQgZWRpdG9yKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9lZGl0b3IgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJldiA9IHRoaXMuX2VkaXRvcjtcbiAgICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgICAgIHByZXYuZWRnZVJlcXVlc3RlZC5kaXNjb25uZWN0KHRoaXMub25FZGdlUmVxdWVzdCwgdGhpcyk7XG4gICAgICAgICAgICBwcmV2Lm1vZGVsLnZhbHVlLmNoYW5nZWQuZGlzY29ubmVjdCh0aGlzLm9uVGV4dENoYW5nZSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZWRpdG9yID0gdmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFsdWUuZWRnZVJlcXVlc3RlZC5jb25uZWN0KHRoaXMub25FZGdlUmVxdWVzdCwgdGhpcyk7XG4gICAgICAgICAgICB2YWx1ZS5tb2RlbC52YWx1ZS5jaGFuZ2VkLmNvbm5lY3QodGhpcy5vblRleHRDaGFuZ2UsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBwbGFjZWhvbGRlciB0ZXh0IHRoYXQgYSBoaXN0b3J5IHNlc3Npb24gYmVnYW4gd2l0aC5cbiAgICAgKi9cbiAgICBnZXQgcGxhY2Vob2xkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHdoZXRoZXIgdGhlIGNvbnNvbGUgaGlzdG9yeSBtYW5hZ2VyIGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIGNvbnNvbGUgaGlzdG9yeSBtYW5hZ2VyLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9oaXN0b3J5Lmxlbmd0aCA9IDA7XG4gICAgICAgIFNpZ25hbC5jbGVhckRhdGEodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcHJldmlvdXMgaXRlbSBpbiB0aGUgY29uc29sZSBoaXN0b3J5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBsYWNlaG9sZGVyIC0gVGhlIHBsYWNlaG9sZGVyIHN0cmluZyB0aGF0IGdldHMgdGVtcG9yYXJpbHkgYWRkZWRcbiAgICAgKiB0byB0aGUgaGlzdG9yeSBvbmx5IGZvciB0aGUgZHVyYXRpb24gb2Ygb25lIGhpc3Rvcnkgc2Vzc2lvbi4gSWYgbXVsdGlwbGVcbiAgICAgKiBwbGFjZWhvbGRlcnMgYXJlIHNlbnQgd2l0aGluIGEgc2Vzc2lvbiwgb25seSB0aGUgZmlyc3Qgb25lIGlzIGFjY2VwdGVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBQcm9taXNlIGZvciBjb25zb2xlIGNvbW1hbmQgdGV4dCBvciBgdW5kZWZpbmVkYCBpZiB1bmF2YWlsYWJsZS5cbiAgICAgKi9cbiAgICBiYWNrKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgIGlmICghdGhpcy5faGFzU2Vzc2lvbikge1xuICAgICAgICAgICAgdGhpcy5faGFzU2Vzc2lvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgLy8gRmlsdGVyIHRoZSBoaXN0b3J5IHdpdGggdGhlIHBsYWNlaG9sZGVyIHN0cmluZy5cbiAgICAgICAgICAgIHRoaXMuc2V0RmlsdGVyKHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvciA9IHRoaXMuX2ZpbHRlcmVkLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgLS10aGlzLl9jdXJzb3I7XG4gICAgICAgIHRoaXMuX2N1cnNvciA9IE1hdGgubWF4KDAsIHRoaXMuX2N1cnNvcik7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLl9maWx0ZXJlZFt0aGlzLl9jdXJzb3JdO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNvbnRlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG5leHQgaXRlbSBpbiB0aGUgY29uc29sZSBoaXN0b3J5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBsYWNlaG9sZGVyIC0gVGhlIHBsYWNlaG9sZGVyIHN0cmluZyB0aGF0IGdldHMgdGVtcG9yYXJpbHkgYWRkZWRcbiAgICAgKiB0byB0aGUgaGlzdG9yeSBvbmx5IGZvciB0aGUgZHVyYXRpb24gb2Ygb25lIGhpc3Rvcnkgc2Vzc2lvbi4gSWYgbXVsdGlwbGVcbiAgICAgKiBwbGFjZWhvbGRlcnMgYXJlIHNlbnQgd2l0aGluIGEgc2Vzc2lvbiwgb25seSB0aGUgZmlyc3Qgb25lIGlzIGFjY2VwdGVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBQcm9taXNlIGZvciBjb25zb2xlIGNvbW1hbmQgdGV4dCBvciBgdW5kZWZpbmVkYCBpZiB1bmF2YWlsYWJsZS5cbiAgICAgKi9cbiAgICBmb3J3YXJkKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgIGlmICghdGhpcy5faGFzU2Vzc2lvbikge1xuICAgICAgICAgICAgdGhpcy5faGFzU2Vzc2lvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgLy8gRmlsdGVyIHRoZSBoaXN0b3J5IHdpdGggdGhlIHBsYWNlaG9sZGVyIHN0cmluZy5cbiAgICAgICAgICAgIHRoaXMuc2V0RmlsdGVyKHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnNvciA9IHRoaXMuX2ZpbHRlcmVkLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICArK3RoaXMuX2N1cnNvcjtcbiAgICAgICAgdGhpcy5fY3Vyc29yID0gTWF0aC5taW4odGhpcy5fZmlsdGVyZWQubGVuZ3RoIC0gMSwgdGhpcy5fY3Vyc29yKTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuX2ZpbHRlcmVkW3RoaXMuX2N1cnNvcl07XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY29udGVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIG5ldyBpdGVtIHRvIHRoZSBib3R0b20gb2YgaGlzdG9yeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpdGVtIFRoZSBpdGVtIGJlaW5nIGFkZGVkIHRvIHRoZSBib3R0b20gb2YgaGlzdG9yeS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJZiB0aGUgaXRlbSBiZWluZyBhZGRlZCBpcyB1bmRlZmluZWQgb3IgZW1wdHksIGl0IGlzIGlnbm9yZWQuIElmIHRoZSBpdGVtXG4gICAgICogYmVpbmcgYWRkZWQgaXMgdGhlIHNhbWUgYXMgdGhlIGxhc3QgaXRlbSBpbiBoaXN0b3J5LCBpdCBpcyBpZ25vcmVkIGFzIHdlbGxcbiAgICAgKiBzbyB0aGF0IHRoZSBjb25zb2xlJ3MgaGlzdG9yeSB3aWxsIGNvbnNpc3Qgb2Ygbm8gY29udGlndW91cyByZXBldGl0aW9ucy5cbiAgICAgKi9cbiAgICBwdXNoKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbSAhPT0gdGhpcy5faGlzdG9yeVt0aGlzLl9oaXN0b3J5Lmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICB0aGlzLl9oaXN0b3J5LnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNldCB0aGUgaGlzdG9yeSBuYXZpZ2F0aW9uIHN0YXRlLCBpLmUuLCBzdGFydCBhIG5ldyBoaXN0b3J5IHNlc3Npb24uXG4gICAgICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuX2N1cnNvciA9IHRoaXMuX2hpc3RvcnkubGVuZ3RoO1xuICAgICAgICB0aGlzLl9oYXNTZXNzaW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gJyc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlIHRoZSBoaXN0b3J5IGNvbGxlY3Rpb24gb24gaGlzdG9yeSByZXBseSBmcm9tIGEga2VybmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlIFRoZSBrZXJuZWwgbWVzc2FnZSBoaXN0b3J5IHJlcGx5LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEhpc3RvcnkgZW50cmllcyBoYXZlIHRoZSBzaGFwZTpcbiAgICAgKiBbc2Vzc2lvbjogbnVtYmVyLCBsaW5lOiBudW1iZXIsIGlucHV0OiBzdHJpbmddXG4gICAgICogQ29udGlndW91cyBkdXBsaWNhdGVzIGFyZSBzdHJpcHBlZCBvdXQgb2YgdGhlIEFQSSByZXNwb25zZS5cbiAgICAgKi9cbiAgICBvbkhpc3RvcnkodmFsdWUpIHtcbiAgICAgICAgdGhpcy5faGlzdG9yeS5sZW5ndGggPSAwO1xuICAgICAgICBsZXQgbGFzdCA9ICcnO1xuICAgICAgICBsZXQgY3VycmVudCA9ICcnO1xuICAgICAgICBpZiAodmFsdWUuY29udGVudC5zdGF0dXMgPT09ICdvaycpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUuY29udGVudC5oaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHZhbHVlLmNvbnRlbnQuaGlzdG9yeVtpXVsyXTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCAhPT0gbGFzdCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaXN0b3J5LnB1c2goKGxhc3QgPSBjdXJyZW50KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlc2V0IHRoZSBoaXN0b3J5IG5hdmlnYXRpb24gY3Vyc29yIGJhY2sgdG8gdGhlIGJvdHRvbS5cbiAgICAgICAgdGhpcy5fY3Vyc29yID0gdGhpcy5faGlzdG9yeS5sZW5ndGg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIHRleHQgY2hhbmdlIHNpZ25hbCBmcm9tIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgb25UZXh0Q2hhbmdlKCkge1xuICAgICAgICBpZiAodGhpcy5fc2V0QnlIaXN0b3J5KSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRCeUhpc3RvcnkgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhbiBlZGdlIHJlcXVlc3RlZCBzaWduYWwuXG4gICAgICovXG4gICAgb25FZGdlUmVxdWVzdChlZGl0b3IsIGxvY2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gZWRpdG9yLm1vZGVsO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBtb2RlbC52YWx1ZS50ZXh0O1xuICAgICAgICBpZiAobG9jYXRpb24gPT09ICd0b3AnIHx8IGxvY2F0aW9uID09PSAndG9wTGluZScpIHtcbiAgICAgICAgICAgIHZvaWQgdGhpcy5iYWNrKHNvdXJjZSkudGhlbih2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCB8fCAhdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobW9kZWwudmFsdWUudGV4dCA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRCeUhpc3RvcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG1vZGVsLnZhbHVlLnRleHQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uUG9zID0gMDtcbiAgICAgICAgICAgICAgICBjb2x1bW5Qb3MgPSB2YWx1ZS5pbmRleE9mKCdcXG4nKTtcbiAgICAgICAgICAgICAgICBpZiAoY29sdW1uUG9zIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Qb3MgPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3JQb3NpdGlvbih7IGxpbmU6IDAsIGNvbHVtbjogY29sdW1uUG9zIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2b2lkIHRoaXMuZm9yd2FyZChzb3VyY2UpLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0ID0gdmFsdWUgfHwgdGhpcy5wbGFjZWhvbGRlcjtcbiAgICAgICAgICAgICAgICBpZiAobW9kZWwudmFsdWUudGV4dCA9PT0gdGV4dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEJ5SGlzdG9yeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgbW9kZWwudmFsdWUudGV4dCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zID0gZWRpdG9yLmdldFBvc2l0aW9uQXQodGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldEN1cnNvclBvc2l0aW9uKHBvcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBjdXJyZW50IGtlcm5lbCBjaGFuZ2luZy5cbiAgICAgKi9cbiAgICBhc3luYyBfaGFuZGxlS2VybmVsKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGtlcm5lbCA9IChfYSA9IHRoaXMuc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmtlcm5lbDtcbiAgICAgICAgaWYgKCFrZXJuZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpc3RvcnkubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2VybmVsLnJlcXVlc3RIaXN0b3J5KFByaXZhdGUuaW5pdGlhbFJlcXVlc3QpLnRoZW4odiA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uSGlzdG9yeSh2KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZmlsdGVyIGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmlsdGVyU3RyIC0gVGhlIHN0cmluZyB0byB1c2Ugd2hlbiBmaWx0ZXJpbmcgdGhlIGRhdGEuXG4gICAgICovXG4gICAgc2V0RmlsdGVyKGZpbHRlclN0ciA9ICcnKSB7XG4gICAgICAgIC8vIEFwcGx5IHRoZSBuZXcgZmlsdGVyIGFuZCByZW1vdmUgY29udGlndW91cyBkdXBsaWNhdGVzLlxuICAgICAgICB0aGlzLl9maWx0ZXJlZC5sZW5ndGggPSAwO1xuICAgICAgICBsZXQgbGFzdCA9ICcnO1xuICAgICAgICBsZXQgY3VycmVudCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2hpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGN1cnJlbnQgPSB0aGlzLl9oaXN0b3J5W2ldO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQgIT09IGxhc3QgJiZcbiAgICAgICAgICAgICAgICBmaWx0ZXJTdHIgPT09IGN1cnJlbnQuc2xpY2UoMCwgZmlsdGVyU3RyLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXJlZC5wdXNoKChsYXN0ID0gY3VycmVudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpbHRlcmVkLnB1c2goZmlsdGVyU3RyKTtcbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgUHJpdmF0ZS5pbml0aWFsUmVxdWVzdCA9IHtcbiAgICAgICAgb3V0cHV0OiBmYWxzZSxcbiAgICAgICAgcmF3OiB0cnVlLFxuICAgICAgICBoaXN0X2FjY2Vzc190eXBlOiAndGFpbCcsXG4gICAgICAgIG46IDUwMFxuICAgIH07XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhpc3RvcnkuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgY29uc29sZVxuICovXG5leHBvcnQgKiBmcm9tICcuL2ZvcmVpZ24nO1xuZXhwb3J0ICogZnJvbSAnLi9oaXN0b3J5JztcbmV4cG9ydCAqIGZyb20gJy4vcGFuZWwnO1xuZXhwb3J0ICogZnJvbSAnLi90b2tlbnMnO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgTWFpbkFyZWFXaWRnZXQsIFNlc3Npb25Db250ZXh0LCBzZXNzaW9uQ29udGV4dERpYWxvZ3MgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBQYXRoRXh0LCBUaW1lLCBVUkxFeHQgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgUmVuZGVyTWltZVJlZ2lzdHJ5IH0gZnJvbSAnQGp1cHl0ZXJsYWIvcmVuZGVybWltZSc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGNvbnNvbGVJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBUb2tlbiwgVVVJRCB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IFBhbmVsIH0gZnJvbSAnQGx1bWluby93aWRnZXRzJztcbmltcG9ydCB7IENvZGVDb25zb2xlIH0gZnJvbSAnLi93aWRnZXQnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBjb25zb2xlIHBhbmVscy5cbiAqL1xuY29uc3QgUEFORUxfQ0xBU1MgPSAnanAtQ29uc29sZVBhbmVsJztcbi8qKlxuICogQSBwYW5lbCB3aGljaCBjb250YWlucyBhIGNvbnNvbGUgYW5kIHRoZSBhYmlsaXR5IHRvIGFkZCBvdGhlciBjaGlsZHJlbi5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbnNvbGVQYW5lbCBleHRlbmRzIE1haW5BcmVhV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBjb25zb2xlIHBhbmVsLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoeyBjb250ZW50OiBuZXcgUGFuZWwoKSB9KTtcbiAgICAgICAgdGhpcy5fZXhlY3V0ZWQgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb25uZWN0ZWQgPSBudWxsO1xuICAgICAgICB0aGlzLmFkZENsYXNzKFBBTkVMX0NMQVNTKTtcbiAgICAgICAgbGV0IHsgcmVuZGVybWltZSwgbWltZVR5cGVTZXJ2aWNlLCBwYXRoLCBiYXNlUGF0aCwgbmFtZSwgbWFuYWdlciwgbW9kZWxGYWN0b3J5LCBzZXNzaW9uQ29udGV4dCwgdHJhbnNsYXRvciB9ID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBjb250ZW50RmFjdG9yeSA9ICh0aGlzLmNvbnRlbnRGYWN0b3J5ID1cbiAgICAgICAgICAgIG9wdGlvbnMuY29udGVudEZhY3RvcnkgfHwgQ29uc29sZVBhbmVsLmRlZmF1bHRDb250ZW50RmFjdG9yeSk7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gUHJpdmF0ZS5jb3VudCsrO1xuICAgICAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgICAgIHBhdGggPSBVUkxFeHQuam9pbihiYXNlUGF0aCB8fCAnJywgYGNvbnNvbGUtJHtjb3VudH0tJHtVVUlELnV1aWQ0KCl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgc2Vzc2lvbkNvbnRleHQgPSB0aGlzLl9zZXNzaW9uQ29udGV4dCA9XG4gICAgICAgICAgICBzZXNzaW9uQ29udGV4dCB8fFxuICAgICAgICAgICAgICAgIG5ldyBTZXNzaW9uQ29udGV4dCh7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25NYW5hZ2VyOiBtYW5hZ2VyLnNlc3Npb25zLFxuICAgICAgICAgICAgICAgICAgICBzcGVjc01hbmFnZXI6IG1hbmFnZXIua2VybmVsc3BlY3MsXG4gICAgICAgICAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUgfHwgdHJhbnMuX18oJ0NvbnNvbGUgJTEnLCBjb3VudCksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjb25zb2xlJyxcbiAgICAgICAgICAgICAgICAgICAga2VybmVsUHJlZmVyZW5jZTogb3B0aW9ucy5rZXJuZWxQcmVmZXJlbmNlLFxuICAgICAgICAgICAgICAgICAgICBzZXRCdXN5OiBvcHRpb25zLnNldEJ1c3lcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmVzb2x2ZXIgPSBuZXcgUmVuZGVyTWltZVJlZ2lzdHJ5LlVybFJlc29sdmVyKHtcbiAgICAgICAgICAgIHNlc3Npb246IHNlc3Npb25Db250ZXh0LFxuICAgICAgICAgICAgY29udGVudHM6IG1hbmFnZXIuY29udGVudHNcbiAgICAgICAgfSk7XG4gICAgICAgIHJlbmRlcm1pbWUgPSByZW5kZXJtaW1lLmNsb25lKHsgcmVzb2x2ZXIgfSk7XG4gICAgICAgIHRoaXMuY29uc29sZSA9IGNvbnRlbnRGYWN0b3J5LmNyZWF0ZUNvbnNvbGUoe1xuICAgICAgICAgICAgcmVuZGVybWltZSxcbiAgICAgICAgICAgIHNlc3Npb25Db250ZXh0OiBzZXNzaW9uQ29udGV4dCxcbiAgICAgICAgICAgIG1pbWVUeXBlU2VydmljZSxcbiAgICAgICAgICAgIGNvbnRlbnRGYWN0b3J5LFxuICAgICAgICAgICAgbW9kZWxGYWN0b3J5XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbnRlbnQuYWRkV2lkZ2V0KHRoaXMuY29uc29sZSk7XG4gICAgICAgIHZvaWQgc2Vzc2lvbkNvbnRleHQuaW5pdGlhbGl6ZSgpLnRoZW4oYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBzZXNzaW9uQ29udGV4dERpYWxvZ3Muc2VsZWN0S2VybmVsKHNlc3Npb25Db250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3RlZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVUaXRsZVBhbmVsKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbnNvbGUuZXhlY3V0ZWQuY29ubmVjdCh0aGlzLl9vbkV4ZWN1dGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlVGl0bGVQYW5lbCgpO1xuICAgICAgICBzZXNzaW9uQ29udGV4dC5rZXJuZWxDaGFuZ2VkLmNvbm5lY3QodGhpcy5fdXBkYXRlVGl0bGVQYW5lbCwgdGhpcyk7XG4gICAgICAgIHNlc3Npb25Db250ZXh0LnByb3BlcnR5Q2hhbmdlZC5jb25uZWN0KHRoaXMuX3VwZGF0ZVRpdGxlUGFuZWwsIHRoaXMpO1xuICAgICAgICB0aGlzLnRpdGxlLmljb24gPSBjb25zb2xlSWNvbjtcbiAgICAgICAgdGhpcy50aXRsZS5jbG9zYWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaWQgPSBgY29uc29sZS0ke2NvdW50fWA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBzZXNzaW9uIHVzZWQgYnkgdGhlIHBhbmVsLlxuICAgICAqL1xuICAgIGdldCBzZXNzaW9uQ29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nlc3Npb25Db250ZXh0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbkNvbnRleHQuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLmNvbnNvbGUuZGlzcG9zZSgpO1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgJ2FjdGl2YXRlLXJlcXVlc3QnYCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvbkFjdGl2YXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgY29uc3QgcHJvbXB0ID0gdGhpcy5jb25zb2xlLnByb21wdENlbGw7XG4gICAgICAgIGlmIChwcm9tcHQpIHtcbiAgICAgICAgICAgIHByb21wdC5lZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCdjbG9zZS1yZXF1ZXN0J2AgbWVzc2FnZXMuXG4gICAgICovXG4gICAgb25DbG9zZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIHN1cGVyLm9uQ2xvc2VSZXF1ZXN0KG1zZyk7XG4gICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjb25zb2xlIGV4ZWN1dGlvbi5cbiAgICAgKi9cbiAgICBfb25FeGVjdXRlZChzZW5kZXIsIGFyZ3MpIHtcbiAgICAgICAgdGhpcy5fZXhlY3V0ZWQgPSBhcmdzO1xuICAgICAgICB0aGlzLl91cGRhdGVUaXRsZVBhbmVsKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgY29uc29sZSBwYW5lbCB0aXRsZS5cbiAgICAgKi9cbiAgICBfdXBkYXRlVGl0bGVQYW5lbCgpIHtcbiAgICAgICAgUHJpdmF0ZS51cGRhdGVUaXRsZSh0aGlzLCB0aGlzLl9jb25uZWN0ZWQsIHRoaXMuX2V4ZWN1dGVkLCB0aGlzLnRyYW5zbGF0b3IpO1xuICAgIH1cbn1cbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIENvbnNvbGVQYW5lbCBzdGF0aWNzLlxuICovXG4oZnVuY3Rpb24gKENvbnNvbGVQYW5lbCkge1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYElDb250ZW50RmFjdG9yeWAuXG4gICAgICovXG4gICAgY2xhc3MgQ29udGVudEZhY3RvcnkgZXh0ZW5kcyBDb2RlQ29uc29sZS5Db250ZW50RmFjdG9yeSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBuZXcgY29uc29sZSBwYW5lbC5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUNvbnNvbGUob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2RlQ29uc29sZShvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb25zb2xlUGFuZWwuQ29udGVudEZhY3RvcnkgPSBDb250ZW50RmFjdG9yeTtcbiAgICAvKipcbiAgICAgKiBBIGRlZmF1bHQgY29kZSBjb25zb2xlIGNvbnRlbnQgZmFjdG9yeS5cbiAgICAgKi9cbiAgICBDb25zb2xlUGFuZWwuZGVmYXVsdENvbnRlbnRGYWN0b3J5ID0gbmV3IENvbnRlbnRGYWN0b3J5KCk7XG4gICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICAvKipcbiAgICAgKiBUaGUgY29uc29sZSByZW5kZXJlciB0b2tlbi5cbiAgICAgKi9cbiAgICBDb25zb2xlUGFuZWwuSUNvbnRlbnRGYWN0b3J5ID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9jb25zb2xlOklDb250ZW50RmFjdG9yeScpO1xuICAgIC8qIHRzbGludDplbmFibGUgKi9cbn0pKENvbnNvbGVQYW5lbCB8fCAoQ29uc29sZVBhbmVsID0ge30pKTtcbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIHByaXZhdGUgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgY291bnRlciBmb3IgbmV3IGNvbnNvbGVzLlxuICAgICAqL1xuICAgIFByaXZhdGUuY291bnQgPSAxO1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdGl0bGUgb2YgYSBjb25zb2xlIHBhbmVsLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpdGxlKHBhbmVsLCBjb25uZWN0ZWQsIGV4ZWN1dGVkLCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBzZXNzaW9uQ29udGV4dCA9IHBhbmVsLmNvbnNvbGUuc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbjtcbiAgICAgICAgaWYgKHNlc3Npb25Db250ZXh0KSB7XG4gICAgICAgICAgICAvLyBGSVhNRTpcbiAgICAgICAgICAgIGxldCBjYXB0aW9uID0gdHJhbnMuX18oJ05hbWU6ICUxXFxuJywgc2Vzc2lvbkNvbnRleHQubmFtZSkgK1xuICAgICAgICAgICAgICAgIHRyYW5zLl9fKCdEaXJlY3Rvcnk6ICUxXFxuJywgUGF0aEV4dC5kaXJuYW1lKHNlc3Npb25Db250ZXh0LnBhdGgpKSArXG4gICAgICAgICAgICAgICAgdHJhbnMuX18oJ0tlcm5lbDogJTEnLCBwYW5lbC5jb25zb2xlLnNlc3Npb25Db250ZXh0Lmtlcm5lbERpc3BsYXlOYW1lKTtcbiAgICAgICAgICAgIGlmIChjb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uICs9IHRyYW5zLl9fKCdcXG5Db25uZWN0ZWQ6ICUxJywgVGltZS5mb3JtYXQoY29ubmVjdGVkLnRvSVNPU3RyaW5nKCkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChleGVjdXRlZCkge1xuICAgICAgICAgICAgICAgIGNhcHRpb24gKz0gdHJhbnMuX18oJ1xcbkxhc3QgRXhlY3V0aW9uOiAlMScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFuZWwudGl0bGUubGFiZWwgPSBzZXNzaW9uQ29udGV4dC5uYW1lO1xuICAgICAgICAgICAgcGFuZWwudGl0bGUuY2FwdGlvbiA9IGNhcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYW5lbC50aXRsZS5sYWJlbCA9IHRyYW5zLl9fKCdDb25zb2xlJyk7XG4gICAgICAgICAgICBwYW5lbC50aXRsZS5jYXB0aW9uID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS51cGRhdGVUaXRsZSA9IHVwZGF0ZVRpdGxlO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYW5lbC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIFRoZSBjb25zb2xlIHRyYWNrZXIgdG9rZW4uXG4gKi9cbmV4cG9ydCBjb25zdCBJQ29uc29sZVRyYWNrZXIgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL2NvbnNvbGU6SUNvbnNvbGVUcmFja2VyJyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2tlbnMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgQ2VsbCwgQ2VsbERyYWdVdGlscywgQ29kZUNlbGwsIENvZGVDZWxsTW9kZWwsIGlzQ29kZUNlbGxNb2RlbCwgUmF3Q2VsbCwgUmF3Q2VsbE1vZGVsIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY2VsbHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUxpc3QgfSBmcm9tICdAanVweXRlcmxhYi9vYnNlcnZhYmxlcyc7XG5pbXBvcnQgeyBlYWNoIH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgTWltZURhdGEgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBEcmFnIH0gZnJvbSAnQGx1bWluby9kcmFnZHJvcCc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBQYW5lbCwgUGFuZWxMYXlvdXQsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgeyBDb25zb2xlSGlzdG9yeSB9IGZyb20gJy4vaGlzdG9yeSc7XG4vKipcbiAqIFRoZSBkYXRhIGF0dHJpYnV0ZSBhZGRlZCB0byBhIHdpZGdldCB0aGF0IGhhcyBhbiBhY3RpdmUga2VybmVsLlxuICovXG5jb25zdCBLRVJORUxfVVNFUiA9ICdqcEtlcm5lbFVzZXInO1xuLyoqXG4gKiBUaGUgZGF0YSBhdHRyaWJ1dGUgYWRkZWQgdG8gYSB3aWRnZXQgY2FuIHJ1biBjb2RlLlxuICovXG5jb25zdCBDT0RFX1JVTk5FUiA9ICdqcENvZGVSdW5uZXInO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBjb25zb2xlIHdpZGdldHMuXG4gKi9cbmNvbnN0IENPTlNPTEVfQ0xBU1MgPSAnanAtQ29kZUNvbnNvbGUnO1xuLyoqXG4gKiBUaGUgY2xhc3MgYWRkZWQgdG8gY29uc29sZSBjZWxsc1xuICovXG5jb25zdCBDT05TT0xFX0NFTExfQ0xBU1MgPSAnanAtQ29uc29sZS1jZWxsJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGNvbnNvbGUgYmFubmVyLlxuICovXG5jb25zdCBCQU5ORVJfQ0xBU1MgPSAnanAtQ29kZUNvbnNvbGUtYmFubmVyJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgb2YgdGhlIGFjdGl2ZSBwcm9tcHQgY2VsbC5cbiAqL1xuY29uc3QgUFJPTVBUX0NMQVNTID0gJ2pwLUNvZGVDb25zb2xlLXByb21wdENlbGwnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBvZiB0aGUgcGFuZWwgdGhhdCBob2xkcyBjZWxsIGNvbnRlbnQuXG4gKi9cbmNvbnN0IENPTlRFTlRfQ0xBU1MgPSAnanAtQ29kZUNvbnNvbGUtY29udGVudCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIG9mIHRoZSBwYW5lbCB0aGF0IGhvbGRzIHByb21wdHMuXG4gKi9cbmNvbnN0IElOUFVUX0NMQVNTID0gJ2pwLUNvZGVDb25zb2xlLWlucHV0Jztcbi8qKlxuICogVGhlIHRpbWVvdXQgaW4gbXMgZm9yIGV4ZWN1dGlvbiByZXF1ZXN0cyB0byB0aGUga2VybmVsLlxuICovXG5jb25zdCBFWEVDVVRJT05fVElNRU9VVCA9IDI1MDtcbi8qKlxuICogVGhlIG1pbWV0eXBlIHVzZWQgZm9yIEp1cHl0ZXIgY2VsbCBkYXRhLlxuICovXG5jb25zdCBKVVBZVEVSX0NFTExfTUlNRSA9ICdhcHBsaWNhdGlvbi92bmQuanVweXRlci5jZWxscyc7XG4vKipcbiAqIEEgd2lkZ2V0IGNvbnRhaW5pbmcgYSBKdXB5dGVyIGNvbnNvbGUuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogVGhlIENvZGVDb25zb2xlIGNsYXNzIGlzIGludGVuZGVkIHRvIGJlIHVzZWQgd2l0aGluIGEgQ29uc29sZVBhbmVsXG4gKiBpbnN0YW5jZS4gVW5kZXIgbW9zdCBjaXJjdW1zdGFuY2VzLCBpdCBpcyBub3QgaW5zdGFudGlhdGVkIGJ5IHVzZXIgY29kZS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvZGVDb25zb2xlIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBjb25zb2xlIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2Jhbm5lciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2V4ZWN1dGVkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fbWltZXR5cGUgPSAndGV4dC94LWlweXRob24nO1xuICAgICAgICB0aGlzLl9tc2dJZHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX21zZ0lkQ2VsbHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX3Byb21wdENlbGxDcmVhdGVkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZHJhZ0RhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl9kcmFnID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZm9jdXNlZENlbGwgPSBudWxsO1xuICAgICAgICB0aGlzLmFkZENsYXNzKENPTlNPTEVfQ0xBU1MpO1xuICAgICAgICB0aGlzLm5vZGUuZGF0YXNldFtLRVJORUxfVVNFUl0gPSAndHJ1ZSc7XG4gICAgICAgIHRoaXMubm9kZS5kYXRhc2V0W0NPREVfUlVOTkVSXSA9ICd0cnVlJztcbiAgICAgICAgdGhpcy5ub2RlLnRhYkluZGV4ID0gLTE7IC8vIEFsbG93IHRoZSB3aWRnZXQgdG8gdGFrZSBmb2N1cy5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBwYW5lbHMgdGhhdCBob2xkIHRoZSBjb250ZW50IGFuZCBpbnB1dC5cbiAgICAgICAgY29uc3QgbGF5b3V0ID0gKHRoaXMubGF5b3V0ID0gbmV3IFBhbmVsTGF5b3V0KCkpO1xuICAgICAgICB0aGlzLl9jZWxscyA9IG5ldyBPYnNlcnZhYmxlTGlzdCgpO1xuICAgICAgICB0aGlzLl9jb250ZW50ID0gbmV3IFBhbmVsKCk7XG4gICAgICAgIHRoaXMuX2lucHV0ID0gbmV3IFBhbmVsKCk7XG4gICAgICAgIHRoaXMuY29udGVudEZhY3RvcnkgPVxuICAgICAgICAgICAgb3B0aW9ucy5jb250ZW50RmFjdG9yeSB8fCBDb2RlQ29uc29sZS5kZWZhdWx0Q29udGVudEZhY3Rvcnk7XG4gICAgICAgIHRoaXMubW9kZWxGYWN0b3J5ID0gb3B0aW9ucy5tb2RlbEZhY3RvcnkgfHwgQ29kZUNvbnNvbGUuZGVmYXVsdE1vZGVsRmFjdG9yeTtcbiAgICAgICAgdGhpcy5yZW5kZXJtaW1lID0gb3B0aW9ucy5yZW5kZXJtaW1lO1xuICAgICAgICB0aGlzLnNlc3Npb25Db250ZXh0ID0gb3B0aW9ucy5zZXNzaW9uQ29udGV4dDtcbiAgICAgICAgdGhpcy5fbWltZVR5cGVTZXJ2aWNlID0gb3B0aW9ucy5taW1lVHlwZVNlcnZpY2U7XG4gICAgICAgIC8vIEFkZCB0b3AtbGV2ZWwgQ1NTIGNsYXNzZXMuXG4gICAgICAgIHRoaXMuX2NvbnRlbnQuYWRkQ2xhc3MoQ09OVEVOVF9DTEFTUyk7XG4gICAgICAgIHRoaXMuX2lucHV0LmFkZENsYXNzKElOUFVUX0NMQVNTKTtcbiAgICAgICAgLy8gSW5zZXJ0IHRoZSBjb250ZW50IGFuZCBpbnB1dCBwYW5lcyBpbnRvIHRoZSB3aWRnZXQuXG4gICAgICAgIGxheW91dC5hZGRXaWRnZXQodGhpcy5fY29udGVudCk7XG4gICAgICAgIGxheW91dC5hZGRXaWRnZXQodGhpcy5faW5wdXQpO1xuICAgICAgICB0aGlzLl9oaXN0b3J5ID0gbmV3IENvbnNvbGVIaXN0b3J5KHtcbiAgICAgICAgICAgIHNlc3Npb25Db250ZXh0OiB0aGlzLnNlc3Npb25Db250ZXh0XG4gICAgICAgIH0pO1xuICAgICAgICB2b2lkIHRoaXMuX29uS2VybmVsQ2hhbmdlZCgpO1xuICAgICAgICB0aGlzLnNlc3Npb25Db250ZXh0Lmtlcm5lbENoYW5nZWQuY29ubmVjdCh0aGlzLl9vbktlcm5lbENoYW5nZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLnNlc3Npb25Db250ZXh0LnN0YXR1c0NoYW5nZWQuY29ubmVjdCh0aGlzLl9vbktlcm5lbFN0YXR1c0NoYW5nZWQsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGNvbnNvbGUgZmluaXNoZWQgZXhlY3V0aW5nIGl0cyBwcm9tcHQgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgZXhlY3V0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9leGVjdXRlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIGEgbmV3IHByb21wdCBjZWxsIGlzIGNyZWF0ZWQuXG4gICAgICovXG4gICAgZ2V0IHByb21wdENlbGxDcmVhdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbXB0Q2VsbENyZWF0ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBsaXN0IG9mIGNvbnRlbnQgY2VsbHMgaW4gdGhlIGNvbnNvbGUuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBsaXN0IGRvZXMgbm90IGluY2x1ZGUgdGhlIGN1cnJlbnQgYmFubmVyIG9yIHRoZSBwcm9tcHQgZm9yIGEgY29uc29sZS5cbiAgICAgKiBJdCBtYXkgaW5jbHVkZSBwcmV2aW91cyBiYW5uZXJzIGFzIHJhdyBjZWxscy5cbiAgICAgKi9cbiAgICBnZXQgY2VsbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jZWxscztcbiAgICB9XG4gICAgLypcbiAgICAgKiBUaGUgY29uc29sZSBpbnB1dCBwcm9tcHQgY2VsbC5cbiAgICAgKi9cbiAgICBnZXQgcHJvbXB0Q2VsbCgpIHtcbiAgICAgICAgY29uc3QgaW5wdXRMYXlvdXQgPSB0aGlzLl9pbnB1dC5sYXlvdXQ7XG4gICAgICAgIHJldHVybiBpbnB1dExheW91dC53aWRnZXRzWzBdIHx8IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIG5ldyBjZWxsIHRvIHRoZSBjb250ZW50IHBhbmVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGNlbGwgLSBUaGUgY29kZSBjZWxsIHdpZGdldCBiZWluZyBhZGRlZCB0byB0aGUgY29udGVudCBwYW5lbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtc2dJZCAtIFRoZSBvcHRpb25hbCBleGVjdXRpb24gbWVzc2FnZSBpZCBmb3IgdGhlIGNlbGwuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBtZXRob2QgaXMgbWVhbnQgZm9yIHVzZSBieSBvdXRzaWRlIGNsYXNzZXMgdGhhdCB3YW50IHRvIGFkZCBjZWxscyB0byBhXG4gICAgICogY29uc29sZS4gSXQgaXMgZGlzdGluY3QgZnJvbSB0aGUgYGluamVjdGAgbWV0aG9kIGluIHRoYXQgaXQgcmVxdWlyZXNcbiAgICAgKiByZW5kZXJlZCBjb2RlIGNlbGwgd2lkZ2V0cyBhbmQgZG9lcyBub3QgZXhlY3V0ZSB0aGVtICh0aG91Z2ggaXQgY2FuIHN0b3JlXG4gICAgICogdGhlIGV4ZWN1dGlvbiBtZXNzYWdlIGlkKS5cbiAgICAgKi9cbiAgICBhZGRDZWxsKGNlbGwsIG1zZ0lkKSB7XG4gICAgICAgIGNlbGwuYWRkQ2xhc3MoQ09OU09MRV9DRUxMX0NMQVNTKTtcbiAgICAgICAgdGhpcy5fY29udGVudC5hZGRXaWRnZXQoY2VsbCk7XG4gICAgICAgIHRoaXMuX2NlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgIGlmIChtc2dJZCkge1xuICAgICAgICAgICAgdGhpcy5fbXNnSWRzLnNldChtc2dJZCwgY2VsbCk7XG4gICAgICAgICAgICB0aGlzLl9tc2dJZENlbGxzLnNldChjZWxsLCBtc2dJZCk7XG4gICAgICAgIH1cbiAgICAgICAgY2VsbC5kaXNwb3NlZC5jb25uZWN0KHRoaXMuX29uQ2VsbERpc3Bvc2VkLCB0aGlzKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgYmFubmVyIGNlbGwuXG4gICAgICovXG4gICAgYWRkQmFubmVyKCkge1xuICAgICAgICBpZiAodGhpcy5fYmFubmVyKSB7XG4gICAgICAgICAgICAvLyBBbiBvbGQgYmFubmVyIGp1c3QgYmVjb21lcyBhIG5vcm1hbCBjZWxsIG5vdy5cbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLl9iYW5uZXI7XG4gICAgICAgICAgICB0aGlzLl9jZWxscy5wdXNoKHRoaXMuX2Jhbm5lcik7XG4gICAgICAgICAgICBjZWxsLmRpc3Bvc2VkLmNvbm5lY3QodGhpcy5fb25DZWxsRGlzcG9zZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgYmFubmVyLlxuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWxGYWN0b3J5LmNyZWF0ZVJhd0NlbGwoe30pO1xuICAgICAgICBtb2RlbC52YWx1ZS50ZXh0ID0gJy4uLic7XG4gICAgICAgIGNvbnN0IGJhbm5lciA9ICh0aGlzLl9iYW5uZXIgPSBuZXcgUmF3Q2VsbCh7XG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIGNvbnRlbnRGYWN0b3J5OiB0aGlzLmNvbnRlbnRGYWN0b3J5LFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGZhbHNlXG4gICAgICAgIH0pKS5pbml0aWFsaXplU3RhdGUoKTtcbiAgICAgICAgYmFubmVyLmFkZENsYXNzKEJBTk5FUl9DTEFTUyk7XG4gICAgICAgIGJhbm5lci5yZWFkT25seSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NvbnRlbnQuYWRkV2lkZ2V0KGJhbm5lcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFyIHRoZSBjb2RlIGNlbGxzLlxuICAgICAqL1xuICAgIGNsZWFyKCkge1xuICAgICAgICAvLyBEaXNwb3NlIGFsbCB0aGUgY29udGVudCBjZWxsc1xuICAgICAgICBjb25zdCBjZWxscyA9IHRoaXMuX2NlbGxzO1xuICAgICAgICB3aGlsZSAoY2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY2VsbHMuZ2V0KDApLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgY2VsbCB3aXRoIHRoZSBidWlsdC1pbiBmYWN0b3J5LlxuICAgICAqL1xuICAgIGNyZWF0ZUNvZGVDZWxsKCkge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jb250ZW50RmFjdG9yeTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuX2NyZWF0ZUNvZGVDZWxsT3B0aW9ucygpO1xuICAgICAgICBjb25zdCBjZWxsID0gZmFjdG9yeS5jcmVhdGVDb2RlQ2VsbChvcHRpb25zKTtcbiAgICAgICAgY2VsbC5yZWFkT25seSA9IHRydWU7XG4gICAgICAgIGNlbGwubW9kZWwubWltZVR5cGUgPSB0aGlzLl9taW1ldHlwZTtcbiAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBhbHJlYWR5IGRpc3Bvc2VkLlxuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2VsbHMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fbXNnSWRDZWxscyA9IG51bGw7XG4gICAgICAgIHRoaXMuX21zZ0lkcyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2hpc3RvcnkuZGlzcG9zZSgpO1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgdGhlIGN1cnJlbnQgcHJvbXB0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGZvcmNlIC0gV2hldGhlciB0byBmb3JjZSBleGVjdXRpb24gd2l0aG91dCBjaGVja2luZyBjb2RlXG4gICAgICogY29tcGxldGVuZXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHRpbWVvdXQgLSBUaGUgbGVuZ3RoIG9mIHRpbWUsIGluIG1pbGxpc2Vjb25kcywgdGhhdCB0aGUgZXhlY3V0aW9uXG4gICAgICogc2hvdWxkIHdhaXQgZm9yIHRoZSBBUEkgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgY29kZSBiZWluZyBzdWJtaXR0ZWQgaXNcbiAgICAgKiBpbmNvbXBsZXRlIGJlZm9yZSBhdHRlbXB0aW5nIHN1Ym1pc3Npb24gYW55d2F5LiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBgMjUwYC5cbiAgICAgKi9cbiAgICBhc3luYyBleGVjdXRlKGZvcmNlID0gZmFsc2UsIHRpbWVvdXQgPSBFWEVDVVRJT05fVElNRU9VVCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBpZiAoKChfYiA9IChfYSA9IHRoaXMuc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmtlcm5lbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnN0YXR1cykgPT09ICdkZWFkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb21wdENlbGwgPSB0aGlzLnByb21wdENlbGw7XG4gICAgICAgIGlmICghcHJvbXB0Q2VsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZXhlY3V0ZSB3aXRob3V0IGEgcHJvbXB0IGNlbGwnKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9tcHRDZWxsLm1vZGVsLnRydXN0ZWQgPSB0cnVlO1xuICAgICAgICBpZiAoZm9yY2UpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBwcm9tcHQgY2VsbCBiZWZvcmUga2VybmVsIGV4ZWN1dGlvbiB0byBhbGxvdyB0eXBlYWhlYWQuXG4gICAgICAgICAgICB0aGlzLm5ld1Byb21wdENlbGwoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2V4ZWN1dGUocHJvbXB0Q2VsbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB3ZSBzaG91bGQgZXhlY3V0ZS5cbiAgICAgICAgY29uc3Qgc2hvdWxkRXhlY3V0ZSA9IGF3YWl0IHRoaXMuX3Nob3VsZEV4ZWN1dGUodGltZW91dCk7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2hvdWxkRXhlY3V0ZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHByb21wdCBjZWxsIGJlZm9yZSBrZXJuZWwgZXhlY3V0aW9uIHRvIGFsbG93IHR5cGVhaGVhZC5cbiAgICAgICAgICAgIHRoaXMubmV3UHJvbXB0Q2VsbCgpO1xuICAgICAgICAgICAgdGhpcy5wcm9tcHRDZWxsLmVkaXRvci5mb2N1cygpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5fZXhlY3V0ZShwcm9tcHRDZWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGFkZCBhIG5ld2xpbmUgaWYgd2Ugc2hvdWxkbid0IGV4ZWN1dGVcbiAgICAgICAgICAgIHByb21wdENlbGwuZWRpdG9yLm5ld0luZGVudGVkTGluZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhIGNlbGwgZ2l2ZW4gYSBtZXNzYWdlIGlkLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1zZ0lkIC0gVGhlIG1lc3NhZ2UgaWQuXG4gICAgICovXG4gICAgZ2V0Q2VsbChtc2dJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXNnSWRzLmdldChtc2dJZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluamVjdCBhcmJpdHJhcnkgY29kZSBmb3IgdGhlIGNvbnNvbGUgdG8gZXhlY3V0ZSBpbW1lZGlhdGVseS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb2RlIC0gVGhlIGNvZGUgY29udGVudHMgb2YgdGhlIGNlbGwgYmVpbmcgaW5qZWN0ZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCBpbmRpY2F0ZXMgd2hlbiB0aGUgaW5qZWN0ZWQgY2VsbCdzIGV4ZWN1dGlvbiBlbmRzLlxuICAgICAqL1xuICAgIGluamVjdChjb2RlLCBtZXRhZGF0YSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmNyZWF0ZUNvZGVDZWxsKCk7XG4gICAgICAgIGNlbGwubW9kZWwudmFsdWUudGV4dCA9IGNvZGU7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG1ldGFkYXRhKSkge1xuICAgICAgICAgICAgY2VsbC5tb2RlbC5tZXRhZGF0YS5zZXQoa2V5LCBtZXRhZGF0YVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZENlbGwoY2VsbCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9leGVjdXRlKGNlbGwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYSBsaW5lIGJyZWFrIGluIHRoZSBwcm9tcHQgY2VsbC5cbiAgICAgKi9cbiAgICBpbnNlcnRMaW5lYnJlYWsoKSB7XG4gICAgICAgIGNvbnN0IHByb21wdENlbGwgPSB0aGlzLnByb21wdENlbGw7XG4gICAgICAgIGlmICghcHJvbXB0Q2VsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHByb21wdENlbGwuZWRpdG9yLm5ld0luZGVudGVkTGluZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlcyB0aGUgc2VsZWN0ZWQgdGV4dCBpbiB0aGUgcHJvbXB0IGNlbGwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGV4dCAtIFRoZSB0ZXh0IHRvIHJlcGxhY2UgdGhlIHNlbGVjdGlvbi5cbiAgICAgKi9cbiAgICByZXBsYWNlU2VsZWN0aW9uKHRleHQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgcHJvbXB0Q2VsbCA9IHRoaXMucHJvbXB0Q2VsbDtcbiAgICAgICAgaWYgKCFwcm9tcHRDZWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgKF9iID0gKF9hID0gcHJvbXB0Q2VsbC5lZGl0b3IpLnJlcGxhY2VTZWxlY3Rpb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hLCB0ZXh0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplIHRoZSBvdXRwdXQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBvbmx5IHNlcmlhbGl6ZXMgdGhlIGNvZGUgY2VsbHMgYW5kIHRoZSBwcm9tcHQgY2VsbCBpZiBpdCBleGlzdHMsIGFuZFxuICAgICAqIHNraXBzIGFueSBvbGQgYmFubmVyIGNlbGxzLlxuICAgICAqL1xuICAgIHNlcmlhbGl6ZSgpIHtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBbXTtcbiAgICAgICAgZWFjaCh0aGlzLl9jZWxscywgY2VsbCA9PiB7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IGNlbGwubW9kZWw7XG4gICAgICAgICAgICBpZiAoaXNDb2RlQ2VsbE1vZGVsKG1vZGVsKSkge1xuICAgICAgICAgICAgICAgIGNlbGxzLnB1c2gobW9kZWwudG9KU09OKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMucHJvbXB0Q2VsbCkge1xuICAgICAgICAgICAgY2VsbHMucHVzaCh0aGlzLnByb21wdENlbGwubW9kZWwudG9KU09OKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjZWxscztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBtb3VzZWRvd25gIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfZXZ0TW91c2VEb3duKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHsgYnV0dG9uLCBzaGlmdEtleSB9ID0gZXZlbnQ7XG4gICAgICAgIC8vIFdlIG9ubHkgaGFuZGxlIG1haW4gb3Igc2Vjb25kYXJ5IGJ1dHRvbiBhY3Rpb25zLlxuICAgICAgICBpZiAoIShidXR0b24gPT09IDAgfHwgYnV0dG9uID09PSAyKSB8fFxuICAgICAgICAgICAgLy8gU2hpZnQgcmlnaHQtY2xpY2sgZ2l2ZXMgdGhlIGJyb3dzZXIgZGVmYXVsdCBiZWhhdmlvci5cbiAgICAgICAgICAgIChzaGlmdEtleSAmJiBidXR0b24gPT09IDIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgY2VsbEZpbHRlciA9IChub2RlKSA9PiBub2RlLmNsYXNzTGlzdC5jb250YWlucyhDT05TT0xFX0NFTExfQ0xBU1MpO1xuICAgICAgICBsZXQgY2VsbEluZGV4ID0gQ2VsbERyYWdVdGlscy5maW5kQ2VsbCh0YXJnZXQsIHRoaXMuX2NlbGxzLCBjZWxsRmlsdGVyKTtcbiAgICAgICAgaWYgKGNlbGxJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIGBldmVudC50YXJnZXRgIHNvbWV0aW1lcyBnaXZlcyBhbiBvcnBoYW5lZCBub2RlIGluXG4gICAgICAgICAgICAvLyBGaXJlZm94IDU3LCB3aGljaCBjYW4gaGF2ZSBgbnVsbGAgYW55d2hlcmUgaW4gaXRzIHBhcmVudCBsaW5lLiBJZiB3ZSBmYWlsXG4gICAgICAgICAgICAvLyB0byBmaW5kIGEgY2VsbCB1c2luZyBgZXZlbnQudGFyZ2V0YCwgdHJ5IGFnYWluIHVzaW5nIGEgdGFyZ2V0XG4gICAgICAgICAgICAvLyByZWNvbnN0cnVjdGVkIGZyb20gdGhlIHBvc2l0aW9uIG9mIHRoZSBjbGljayBldmVudC5cbiAgICAgICAgICAgIHRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICAgICAgICBjZWxsSW5kZXggPSBDZWxsRHJhZ1V0aWxzLmZpbmRDZWxsKHRhcmdldCwgdGhpcy5fY2VsbHMsIGNlbGxGaWx0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjZWxsSW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuX2NlbGxzLmdldChjZWxsSW5kZXgpO1xuICAgICAgICBjb25zdCB0YXJnZXRBcmVhID0gQ2VsbERyYWdVdGlscy5kZXRlY3RUYXJnZXRBcmVhKGNlbGwsIGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGlmICh0YXJnZXRBcmVhID09PSAncHJvbXB0Jykge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgcHJlc3NYOiBldmVudC5jbGllbnRYLFxuICAgICAgICAgICAgICAgIHByZXNzWTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgICAgICAgICBpbmRleDogY2VsbEluZGV4XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNlZENlbGwgPSBjZWxsO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMsIHRydWUpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgbW91c2Vtb3ZlYCBldmVudCBvZiB3aWRnZXRcbiAgICAgKi9cbiAgICBfZXZ0TW91c2VNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kcmFnRGF0YTtcbiAgICAgICAgaWYgKGRhdGEgJiZcbiAgICAgICAgICAgIENlbGxEcmFnVXRpbHMuc2hvdWxkU3RhcnREcmFnKGRhdGEucHJlc3NYLCBkYXRhLnByZXNzWSwgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSkpIHtcbiAgICAgICAgICAgIHZvaWQgdGhpcy5fc3RhcnREcmFnKGRhdGEuaW5kZXgsIGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGEgZHJhZyBldmVudFxuICAgICAqL1xuICAgIF9zdGFydERyYWcoaW5kZXgsIGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICAgICAgY29uc3QgY2VsbE1vZGVsID0gdGhpcy5fZm9jdXNlZENlbGwubW9kZWw7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gW2NlbGxNb2RlbC50b0pTT04oKV07XG4gICAgICAgIGNvbnN0IGRyYWdJbWFnZSA9IENlbGxEcmFnVXRpbHMuY3JlYXRlQ2VsbERyYWdJbWFnZSh0aGlzLl9mb2N1c2VkQ2VsbCwgc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLl9kcmFnID0gbmV3IERyYWcoe1xuICAgICAgICAgICAgbWltZURhdGE6IG5ldyBNaW1lRGF0YSgpLFxuICAgICAgICAgICAgZHJhZ0ltYWdlLFxuICAgICAgICAgICAgcHJvcG9zZWRBY3Rpb246ICdjb3B5JyxcbiAgICAgICAgICAgIHN1cHBvcnRlZEFjdGlvbnM6ICdjb3B5JyxcbiAgICAgICAgICAgIHNvdXJjZTogdGhpc1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZHJhZy5taW1lRGF0YS5zZXREYXRhKEpVUFlURVJfQ0VMTF9NSU1FLCBzZWxlY3RlZCk7XG4gICAgICAgIGNvbnN0IHRleHRDb250ZW50ID0gY2VsbE1vZGVsLnZhbHVlLnRleHQ7XG4gICAgICAgIHRoaXMuX2RyYWcubWltZURhdGEuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRleHRDb250ZW50KTtcbiAgICAgICAgdGhpcy5fZm9jdXNlZENlbGwgPSBudWxsO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMsIHRydWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZHJhZy5zdGFydChjbGllbnRYLCBjbGllbnRZKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9kcmFnID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdEYXRhID0gbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtVGhlIERPTSBldmVudCBzZW50IHRvIHRoZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBtZXRob2QgaW1wbGVtZW50cyB0aGUgRE9NIGBFdmVudExpc3RlbmVyYCBpbnRlcmZhY2UgYW5kIGlzXG4gICAgICogY2FsbGVkIGluIHJlc3BvbnNlIHRvIGV2ZW50cyBvbiB0aGUgbm90ZWJvb2sgcGFuZWwncyBub2RlLiBJdCBzaG91bGRcbiAgICAgKiBub3QgYmUgY2FsbGVkIGRpcmVjdGx5IGJ5IHVzZXIgY29kZS5cbiAgICAgKi9cbiAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2tleWRvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dEtleURvd24oZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRNb3VzZURvd24oZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRNb3VzZU1vdmUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW91c2V1cCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0TW91c2VVcChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgYWZ0ZXJfYXR0YWNoYCBtZXNzYWdlcyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMpO1xuICAgICAgICAvLyBDcmVhdGUgYSBwcm9tcHQgaWYgbmVjZXNzYXJ5LlxuICAgICAgICBpZiAoIXRoaXMucHJvbXB0Q2VsbCkge1xuICAgICAgICAgICAgdGhpcy5uZXdQcm9tcHRDZWxsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb21wdENlbGwuZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgYmVmb3JlLWRldGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25CZWZvcmVEZXRhY2gobXNnKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMsIHRydWUpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgJ2FjdGl2YXRlLXJlcXVlc3QnYCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvbkFjdGl2YXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgY29uc3QgZWRpdG9yID0gdGhpcy5wcm9tcHRDZWxsICYmIHRoaXMucHJvbXB0Q2VsbC5lZGl0b3I7XG4gICAgICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ha2UgYSBuZXcgcHJvbXB0IGNlbGwuXG4gICAgICovXG4gICAgbmV3UHJvbXB0Q2VsbCgpIHtcbiAgICAgICAgbGV0IHByb21wdENlbGwgPSB0aGlzLnByb21wdENlbGw7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5faW5wdXQ7XG4gICAgICAgIC8vIE1ha2UgdGhlIGxhc3QgcHJvbXB0IHJlYWQtb25seSwgY2xlYXIgaXRzIHNpZ25hbHMsIGFuZCBtb3ZlIHRvIGNvbnRlbnQuXG4gICAgICAgIGlmIChwcm9tcHRDZWxsKSB7XG4gICAgICAgICAgICBwcm9tcHRDZWxsLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHByb21wdENlbGwucmVtb3ZlQ2xhc3MoUFJPTVBUX0NMQVNTKTtcbiAgICAgICAgICAgIFNpZ25hbC5jbGVhckRhdGEocHJvbXB0Q2VsbC5lZGl0b3IpO1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBpbnB1dC53aWRnZXRzWzBdO1xuICAgICAgICAgICAgY2hpbGQucGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2VsbChwcm9tcHRDZWxsKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDcmVhdGUgdGhlIG5ldyBwcm9tcHQgY2VsbC5cbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY29udGVudEZhY3Rvcnk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9jcmVhdGVDb2RlQ2VsbE9wdGlvbnMoKTtcbiAgICAgICAgcHJvbXB0Q2VsbCA9IGZhY3RvcnkuY3JlYXRlQ29kZUNlbGwob3B0aW9ucyk7XG4gICAgICAgIHByb21wdENlbGwubW9kZWwubWltZVR5cGUgPSB0aGlzLl9taW1ldHlwZTtcbiAgICAgICAgcHJvbXB0Q2VsbC5hZGRDbGFzcyhQUk9NUFRfQ0xBU1MpO1xuICAgICAgICAvLyBBZGQgdGhlIHByb21wdCBjZWxsIHRvIHRoZSBET00sIG1ha2luZyBgdGhpcy5wcm9tcHRDZWxsYCB2YWxpZCBhZ2Fpbi5cbiAgICAgICAgdGhpcy5faW5wdXQuYWRkV2lkZ2V0KHByb21wdENlbGwpO1xuICAgICAgICAvLyBTdXBwcmVzcyB0aGUgZGVmYXVsdCBcIkVudGVyXCIga2V5IGhhbmRsaW5nLlxuICAgICAgICBjb25zdCBlZGl0b3IgPSBwcm9tcHRDZWxsLmVkaXRvcjtcbiAgICAgICAgZWRpdG9yLmFkZEtleWRvd25IYW5kbGVyKHRoaXMuX29uRWRpdG9yS2V5ZG93bik7XG4gICAgICAgIHRoaXMuX2hpc3RvcnkuZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICB0aGlzLl9wcm9tcHRDZWxsQ3JlYXRlZC5lbWl0KHByb21wdENlbGwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYHVwZGF0ZS1yZXF1ZXN0YCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvblVwZGF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIFByaXZhdGUuc2Nyb2xsVG9Cb3R0b20odGhpcy5fY29udGVudC5ub2RlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBgJ2tleWRvd24nYCBldmVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfZXZ0S2V5RG93bihldmVudCkge1xuICAgICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLnByb21wdENlbGwgJiYgdGhpcy5wcm9tcHRDZWxsLmVkaXRvcjtcbiAgICAgICAgaWYgKCFlZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgJiYgIWVkaXRvci5oYXNGb2N1cygpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcgJiYgZWRpdG9yLmhhc0ZvY3VzKCkpIHtcbiAgICAgICAgICAgIC8vIFNldCB0byBjb21tYW5kIG1vZGVcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdtb3VzZXVwJ2AgZXZlbnQgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgX2V2dE1vdXNlVXAoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvbXB0Q2VsbCAmJlxuICAgICAgICAgICAgdGhpcy5wcm9tcHRDZWxsLm5vZGUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5wcm9tcHRDZWxsLmVkaXRvci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgdGhlIGNvZGUgaW4gdGhlIGN1cnJlbnQgcHJvbXB0IGNlbGwuXG4gICAgICovXG4gICAgX2V4ZWN1dGUoY2VsbCkge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBjZWxsLm1vZGVsLnZhbHVlLnRleHQ7XG4gICAgICAgIHRoaXMuX2hpc3RvcnkucHVzaChzb3VyY2UpO1xuICAgICAgICAvLyBJZiB0aGUgc291cmNlIG9mIHRoZSBjb25zb2xlIGlzIGp1c3QgXCJjbGVhclwiLCBjbGVhciB0aGUgY29uc29sZSBhcyB3ZVxuICAgICAgICAvLyBkbyBpbiBJUHl0aG9uIG9yIFF0Q29uc29sZS5cbiAgICAgICAgaWYgKHNvdXJjZSA9PT0gJ2NsZWFyJyB8fCBzb3VyY2UgPT09ICclY2xlYXInKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICAgICAgY2VsbC5tb2RlbC5jb250ZW50Q2hhbmdlZC5jb25uZWN0KHRoaXMudXBkYXRlLCB0aGlzKTtcbiAgICAgICAgY29uc3Qgb25TdWNjZXNzID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmNvbnRlbnQuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHZhbHVlLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgLy8gVXNlIGRlcHJlY2F0ZWQgcGF5bG9hZHMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50LnBheWxvYWQgJiYgY29udGVudC5wYXlsb2FkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXROZXh0SW5wdXQgPSBjb250ZW50LnBheWxvYWQuZmlsdGVyKGkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkuc291cmNlID09PSAnc2V0X25leHRfaW5wdXQnO1xuICAgICAgICAgICAgICAgICAgICB9KVswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldE5leHRJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IHNldE5leHRJbnB1dC50ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlIHRoZSBgcmVwbGFjZWAgdmFsdWUgYW5kIGFsd2F5cyBzZXQgdGhlIG5leHQgY2VsbC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGwubW9kZWwudmFsdWUudGV4dCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSAmJiB2YWx1ZS5jb250ZW50LnN0YXR1cyA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgIGVhY2godGhpcy5fY2VsbHMsIChjZWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsLm1vZGVsLmV4ZWN1dGlvbkNvdW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLnNldFByb21wdCgnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNlbGwubW9kZWwuY29udGVudENoYW5nZWQuZGlzY29ubmVjdCh0aGlzLnVwZGF0ZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5fZXhlY3V0ZWQuZW1pdChuZXcgRGF0ZSgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgb25GYWlsdXJlID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNlbGwubW9kZWwuY29udGVudENoYW5nZWQuZGlzY29ubmVjdCh0aGlzLnVwZGF0ZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ29kZUNlbGwuZXhlY3V0ZShjZWxsLCB0aGlzLnNlc3Npb25Db250ZXh0KS50aGVuKG9uU3VjY2Vzcywgb25GYWlsdXJlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBjb25zb2xlIGJhc2VkIG9uIHRoZSBrZXJuZWwgaW5mby5cbiAgICAgKi9cbiAgICBfaGFuZGxlSW5mbyhpbmZvKSB7XG4gICAgICAgIGlmIChpbmZvLnN0YXR1cyAhPT0gJ29rJykge1xuICAgICAgICAgICAgdGhpcy5fYmFubmVyLm1vZGVsLnZhbHVlLnRleHQgPSAnRXJyb3IgaW4gZ2V0dGluZyBrZXJuZWwgYmFubmVyJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9iYW5uZXIubW9kZWwudmFsdWUudGV4dCA9IGluZm8uYmFubmVyO1xuICAgICAgICBjb25zdCBsYW5nID0gaW5mby5sYW5ndWFnZV9pbmZvO1xuICAgICAgICB0aGlzLl9taW1ldHlwZSA9IHRoaXMuX21pbWVUeXBlU2VydmljZS5nZXRNaW1lVHlwZUJ5TGFuZ3VhZ2UobGFuZyk7XG4gICAgICAgIGlmICh0aGlzLnByb21wdENlbGwpIHtcbiAgICAgICAgICAgIHRoaXMucHJvbXB0Q2VsbC5tb2RlbC5taW1lVHlwZSA9IHRoaXMuX21pbWV0eXBlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgb3B0aW9ucyB1c2VkIHRvIGluaXRpYWxpemUgYSBjb2RlIGNlbGwgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9jcmVhdGVDb2RlQ2VsbE9wdGlvbnMoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRGYWN0b3J5ID0gdGhpcy5jb250ZW50RmFjdG9yeTtcbiAgICAgICAgY29uc3QgbW9kZWxGYWN0b3J5ID0gdGhpcy5tb2RlbEZhY3Rvcnk7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gbW9kZWxGYWN0b3J5LmNyZWF0ZUNvZGVDZWxsKHt9KTtcbiAgICAgICAgY29uc3QgcmVuZGVybWltZSA9IHRoaXMucmVuZGVybWltZTtcbiAgICAgICAgY29uc3QgZWRpdG9yQ29uZmlnID0gdGhpcy5lZGl0b3JDb25maWc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgIHJlbmRlcm1pbWUsXG4gICAgICAgICAgICBjb250ZW50RmFjdG9yeSxcbiAgICAgICAgICAgIGVkaXRvckNvbmZpZyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgY2VsbCBkaXNwb3NlZCBzaWduYWxzLlxuICAgICAqL1xuICAgIF9vbkNlbGxEaXNwb3NlZChzZW5kZXIsIGFyZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NlbGxzLnJlbW92ZVZhbHVlKHNlbmRlcik7XG4gICAgICAgICAgICBjb25zdCBtc2dJZCA9IHRoaXMuX21zZ0lkQ2VsbHMuZ2V0KHNlbmRlcik7XG4gICAgICAgICAgICBpZiAobXNnSWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tc2dJZENlbGxzLmRlbGV0ZShzZW5kZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21zZ0lkcy5kZWxldGUobXNnSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlc3Qgd2hldGhlciB3ZSBzaG91bGQgZXhlY3V0ZSB0aGUgcHJvbXB0IGNlbGwuXG4gICAgICovXG4gICAgX3Nob3VsZEV4ZWN1dGUodGltZW91dCkge1xuICAgICAgICBjb25zdCBwcm9tcHRDZWxsID0gdGhpcy5wcm9tcHRDZWxsO1xuICAgICAgICBpZiAoIXByb21wdENlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vZGVsID0gcHJvbXB0Q2VsbC5tb2RlbDtcbiAgICAgICAgY29uc3QgY29kZSA9IG1vZGVsLnZhbHVlLnRleHQ7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIGNvbnN0IGtlcm5lbCA9IChfYSA9IHRoaXMuc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmtlcm5lbDtcbiAgICAgICAgICAgIGlmICgha2VybmVsKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAga2VybmVsXG4gICAgICAgICAgICAgICAgLnJlcXVlc3RJc0NvbXBsZXRlKHsgY29kZSB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGlzQ29tcGxldGUgPT4ge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzQ29tcGxldGUuY29udGVudC5zdGF0dXMgIT09ICdpbmNvbXBsZXRlJykge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGtleWRvd24gZXZlbnQgb24gYW4gZWRpdG9yLlxuICAgICAqL1xuICAgIF9vbkVkaXRvcktleWRvd24oZWRpdG9yLCBldmVudCkge1xuICAgICAgICAvLyBTdXBwcmVzcyBcIkVudGVyXCIgZXZlbnRzLlxuICAgICAgICByZXR1cm4gZXZlbnQua2V5Q29kZSA9PT0gMTM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUga2VybmVsLlxuICAgICAqL1xuICAgIGFzeW5jIF9vbktlcm5lbENoYW5nZWQoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBpZiAodGhpcy5fYmFubmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9iYW5uZXIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fYmFubmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZEJhbm5lcigpO1xuICAgICAgICBpZiAoKF9hID0gdGhpcy5zZXNzaW9uQ29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2VybmVsKSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVJbmZvKGF3YWl0IHRoaXMuc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbi5rZXJuZWwuaW5mbyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBrZXJuZWwgc3RhdHVzLlxuICAgICAqL1xuICAgIGFzeW5jIF9vbktlcm5lbFN0YXR1c0NoYW5nZWQoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qga2VybmVsID0gKF9hID0gdGhpcy5zZXNzaW9uQ29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eua2VybmVsO1xuICAgICAgICBpZiAoKGtlcm5lbCA9PT0gbnVsbCB8fCBrZXJuZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGtlcm5lbC5zdGF0dXMpID09PSAncmVzdGFydGluZycpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQmFubmVyKCk7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVJbmZvKGF3YWl0IChrZXJuZWwgPT09IG51bGwgfHwga2VybmVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBrZXJuZWwuaW5mbykpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgQ29kZUNvbnNvbGUgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChDb2RlQ29uc29sZSkge1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYElDb250ZW50RmFjdG9yeWAuXG4gICAgICovXG4gICAgY2xhc3MgQ29udGVudEZhY3RvcnkgZXh0ZW5kcyBDZWxsLkNvbnRlbnRGYWN0b3J5IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIG5ldyBjb2RlIGNlbGwgd2lkZ2V0LlxuICAgICAgICAgKlxuICAgICAgICAgKiAjIyMjIE5vdGVzXG4gICAgICAgICAqIElmIG5vIGNlbGwgY29udGVudCBmYWN0b3J5IGlzIHBhc3NlZCBpbiB3aXRoIHRoZSBvcHRpb25zLCB0aGUgb25lIG9uIHRoZVxuICAgICAgICAgKiBub3RlYm9vayBjb250ZW50IGZhY3RvcnkgaXMgdXNlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUNvZGVDZWxsKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5jb250ZW50RmFjdG9yeSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGVudEZhY3RvcnkgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb2RlQ2VsbChvcHRpb25zKS5pbml0aWFsaXplU3RhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgbmV3IHJhdyBjZWxsIHdpZGdldC5cbiAgICAgICAgICpcbiAgICAgICAgICogIyMjIyBOb3Rlc1xuICAgICAgICAgKiBJZiBubyBjZWxsIGNvbnRlbnQgZmFjdG9yeSBpcyBwYXNzZWQgaW4gd2l0aCB0aGUgb3B0aW9ucywgdGhlIG9uZSBvbiB0aGVcbiAgICAgICAgICogbm90ZWJvb2sgY29udGVudCBmYWN0b3J5IGlzIHVzZWQuXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVSYXdDZWxsKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5jb250ZW50RmFjdG9yeSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGVudEZhY3RvcnkgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYXdDZWxsKG9wdGlvbnMpLmluaXRpYWxpemVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIENvZGVDb25zb2xlLkNvbnRlbnRGYWN0b3J5ID0gQ29udGVudEZhY3Rvcnk7XG4gICAgLyoqXG4gICAgICogQSBkZWZhdWx0IGNvbnRlbnQgZmFjdG9yeSBmb3IgdGhlIGNvZGUgY29uc29sZS5cbiAgICAgKi9cbiAgICBDb2RlQ29uc29sZS5kZWZhdWx0Q29udGVudEZhY3RvcnkgPSBuZXcgQ29udGVudEZhY3RvcnkoKTtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiBhbiBgSU1vZGVsRmFjdG9yeWAuXG4gICAgICovXG4gICAgY2xhc3MgTW9kZWxGYWN0b3J5IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhIG5ldyBjZWxsIG1vZGVsIGZhY3RvcnkuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICAgICAgICAgIHRoaXMuY29kZUNlbGxDb250ZW50RmFjdG9yeSA9XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb2RlQ2VsbENvbnRlbnRGYWN0b3J5IHx8IENvZGVDZWxsTW9kZWwuZGVmYXVsdENvbnRlbnRGYWN0b3J5O1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBuZXcgY29kZSBjZWxsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gc291cmNlIC0gVGhlIGRhdGEgdG8gdXNlIGZvciB0aGUgb3JpZ2luYWwgc291cmNlIGRhdGEuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIEEgbmV3IGNvZGUgY2VsbC4gSWYgYSBzb3VyY2UgY2VsbCBpcyBwcm92aWRlZCwgdGhlXG4gICAgICAgICAqICAgbmV3IGNlbGwgd2lsbCBiZSBpbml0aWFsaXplZCB3aXRoIHRoZSBkYXRhIGZyb20gdGhlIHNvdXJjZS5cbiAgICAgICAgICogICBJZiB0aGUgY29udGVudEZhY3RvcnkgaXMgbm90IHByb3ZpZGVkLCB0aGUgaW5zdGFuY2VcbiAgICAgICAgICogICBgY29kZUNlbGxDb250ZW50RmFjdG9yeWAgd2lsbCBiZSB1c2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlQ29kZUNlbGwob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmNvbnRlbnRGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZW50RmFjdG9yeSA9IHRoaXMuY29kZUNlbGxDb250ZW50RmFjdG9yeTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29kZUNlbGxNb2RlbChvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgbmV3IHJhdyBjZWxsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gc291cmNlIC0gVGhlIGRhdGEgdG8gdXNlIGZvciB0aGUgb3JpZ2luYWwgc291cmNlIGRhdGEuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm5zIEEgbmV3IHJhdyBjZWxsLiBJZiBhIHNvdXJjZSBjZWxsIGlzIHByb3ZpZGVkLCB0aGVcbiAgICAgICAgICogICBuZXcgY2VsbCB3aWxsIGJlIGluaXRpYWxpemVkIHdpdGggdGhlIGRhdGEgZnJvbSB0aGUgc291cmNlLlxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlUmF3Q2VsbChvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhd0NlbGxNb2RlbChvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb2RlQ29uc29sZS5Nb2RlbEZhY3RvcnkgPSBNb2RlbEZhY3Rvcnk7XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgYE1vZGVsRmFjdG9yeWAgaW5zdGFuY2UuXG4gICAgICovXG4gICAgQ29kZUNvbnNvbGUuZGVmYXVsdE1vZGVsRmFjdG9yeSA9IG5ldyBNb2RlbEZhY3Rvcnkoe30pO1xufSkoQ29kZUNvbnNvbGUgfHwgKENvZGVDb25zb2xlID0ge30pKTtcbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIGNvbnNvbGUgd2lkZ2V0IHByaXZhdGUgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBKdW1wIHRvIHRoZSBib3R0b20gb2YgYSBub2RlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5vZGUgLSBUaGUgc2Nyb2xsYWJsZSBlbGVtZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNjcm9sbFRvQm90dG9tKG5vZGUpIHtcbiAgICAgICAgbm9kZS5zY3JvbGxUb3AgPSBub2RlLnNjcm9sbEhlaWdodCAtIG5vZGUuY2xpZW50SGVpZ2h0O1xuICAgIH1cbiAgICBQcml2YXRlLnNjcm9sbFRvQm90dG9tID0gc2Nyb2xsVG9Cb3R0b207XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpZGdldC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9