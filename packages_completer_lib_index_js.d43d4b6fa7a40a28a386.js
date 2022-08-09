(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_completer_lib_index_js"],{

/***/ "../../packages/completer/lib/connector.js":
/*!*************************************************!*\
  !*** ../../packages/completer/lib/connector.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompletionConnector": () => (/* binding */ CompletionConnector)
/* harmony export */ });
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contextconnector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contextconnector */ "../../packages/completer/lib/contextconnector.js");
/* harmony import */ var _kernelconnector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kernelconnector */ "../../packages/completer/lib/kernelconnector.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * A context+kernel connector for completion handlers.
 */
class CompletionConnector extends _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__.DataConnector {
    /**
     * Create a new connector for completion requests.
     *
     * @param options - The instantiation options for the connector.
     */
    constructor(options) {
        super();
        this._kernel = new _kernelconnector__WEBPACK_IMPORTED_MODULE_1__.KernelConnector(options);
        this._context = new _contextconnector__WEBPACK_IMPORTED_MODULE_2__.ContextConnector(options);
    }
    /**
     * Fetch completion requests.
     *
     * @param request - The completion request text and details.
     */
    fetch(request) {
        return Promise.all([
            this._kernel.fetch(request),
            this._context.fetch(request)
        ]).then(([kernel, context]) => Private.mergeReplies(kernel, context));
    }
}
/**
 * A namespace for private functionality.
 */
var Private;
(function (Private) {
    /**
     * Merge results from kernel and context completions.
     *
     * @param kernel - The kernel reply being merged.
     *
     * @param context - The context reply being merged.
     *
     * @returns A reply with a superset of kernel and context matches.
     *
     * #### Notes
     * The kernel and context matches are merged with a preference for kernel
     * results. Both lists are known to contain unique, non-repeating items;
     * so this function returns a non-repeating superset by filtering out
     * duplicates from the context list that appear in the kernel list.
     */
    function mergeReplies(kernel, context) {
        // If one is empty, return the other.
        if (kernel.matches.length === 0) {
            return context;
        }
        else if (context.matches.length === 0) {
            return kernel;
        }
        // Populate the result with a copy of the kernel matches.
        const matches = kernel.matches.slice();
        // Cache all the kernel matches in a memo.
        const memo = matches.reduce((acc, val) => {
            acc[val] = null;
            return acc;
        }, {});
        // Add each context match that is not in the memo to the result.
        context.matches.forEach(match => {
            if (!(match in memo)) {
                matches.push(match);
            }
        });
        return Object.assign(Object.assign({}, kernel), { matches });
    }
    Private.mergeReplies = mergeReplies;
})(Private || (Private = {}));
//# sourceMappingURL=connector.js.map

/***/ }),

/***/ "../../packages/completer/lib/contextconnector.js":
/*!********************************************************!*\
  !*** ../../packages/completer/lib/contextconnector.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContextConnector": () => (/* binding */ ContextConnector)
/* harmony export */ });
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * A context connector for completion handlers.
 */
class ContextConnector extends _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__.DataConnector {
    /**
     * Create a new context connector for completion requests.
     *
     * @param options - The instantiation options for the context connector.
     */
    constructor(options) {
        super();
        this._editor = options.editor;
    }
    /**
     * Fetch completion requests.
     *
     * @param request - The completion request text and details.
     */
    fetch(request) {
        if (!this._editor) {
            return Promise.reject('No editor');
        }
        return new Promise(resolve => {
            resolve(Private.contextHint(this._editor));
        });
    }
}
/**
 * A namespace for Private functionality.
 */
var Private;
(function (Private) {
    /**
     * Get a list of completion hints from a tokenization
     * of the editor.
     */
    function contextHint(editor) {
        // Find the token at the cursor
        const cursor = editor.getCursorPosition();
        const token = editor.getTokenForPosition(cursor);
        // Get the list of matching tokens.
        const tokenList = getCompletionTokens(token, editor);
        // Only choose the ones that have a non-empty type
        // field, which are likely to be of interest.
        const completionList = tokenList.filter(t => t.type).map(t => t.value);
        // Remove duplicate completions from the list
        const matches = Array.from(new Set(completionList));
        return {
            start: token.offset,
            end: token.offset + token.value.length,
            matches,
            metadata: {}
        };
    }
    Private.contextHint = contextHint;
    /**
     * Get a list of tokens that match the completion request,
     * but are not identical to the completion request.
     */
    function getCompletionTokens(token, editor) {
        const candidates = editor.getTokens();
        // Only get the tokens that have a common start, but
        // are not identical.
        return candidates.filter(t => t.value.indexOf(token.value) === 0 && t.value !== token.value);
    }
})(Private || (Private = {}));
//# sourceMappingURL=contextconnector.js.map

/***/ }),

/***/ "../../packages/completer/lib/dummyconnector.js":
/*!******************************************************!*\
  !*** ../../packages/completer/lib/dummyconnector.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DummyConnector": () => (/* binding */ DummyConnector)
/* harmony export */ });
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * DummyConnector's fetch method always returns a rejected Promise.
 * This class is only instantiated if both CompletionHandler._connector and
 * CompletionHandler._fetchItems are undefined.
 */
class DummyConnector extends _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__.DataConnector {
    fetch(_) {
        return Promise.reject('Attempting to fetch with DummyConnector. Please ensure connector responseType is set.');
    }
}
//# sourceMappingURL=dummyconnector.js.map

/***/ }),

/***/ "../../packages/completer/lib/handler.js":
/*!***********************************************!*\
  !*** ../../packages/completer/lib/handler.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompletionHandler": () => (/* binding */ CompletionHandler)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging?790d");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dummyconnector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dummyconnector */ "../../packages/completer/lib/dummyconnector.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




/**
 * A class added to editors that can host a completer.
 */
const COMPLETER_ENABLED_CLASS = 'jp-mod-completer-enabled';
/**
 * A class added to editors that have an active completer.
 */
const COMPLETER_ACTIVE_CLASS = 'jp-mod-completer-active';
/**
 * A completion handler for editors.
 */
class CompletionHandler {
    /**
     * Construct a new completion handler for a widget.
     */
    constructor(options) {
        this._editor = null;
        this._enabled = false;
        this._pending = 0;
        this._isDisposed = false;
        this.completer = options.completer;
        this.completer.selected.connect(this.onCompletionSelected, this);
        this.completer.visibilityChanged.connect(this.onVisibilityChanged, this);
        this._connector = options.connector;
    }
    /**
     * The data connector used to populate completion requests.
     * @deprecated will be removed, or will return `CompletionHandler.ICompletionItemsConnector`
     * instead of `IDataConnector` in future versions
     *
     * #### Notes
     * The only method of this connector that will ever be called is `fetch`, so
     * it is acceptable for the other methods to be simple functions that return
     * rejected promises.
     */
    get connector() {
        if ('responseType' in this._connector) {
            return new _dummyconnector__WEBPACK_IMPORTED_MODULE_3__.DummyConnector();
        }
        return this._connector;
    }
    set connector(connector) {
        this._connector = connector;
    }
    /**
     * The editor used by the completion handler.
     */
    get editor() {
        return this._editor;
    }
    set editor(newValue) {
        if (newValue === this._editor) {
            return;
        }
        let editor = this._editor;
        // Clean up and disconnect from old editor.
        if (editor && !editor.isDisposed) {
            const model = editor.model;
            editor.host.classList.remove(COMPLETER_ENABLED_CLASS);
            editor.host.classList.remove(COMPLETER_ACTIVE_CLASS);
            model.selections.changed.disconnect(this.onSelectionsChanged, this);
            model.value.changed.disconnect(this.onTextChanged, this);
        }
        // Reset completer state.
        this.completer.reset();
        this.completer.editor = newValue;
        // Update the editor and signal connections.
        editor = this._editor = newValue;
        if (editor) {
            const model = editor.model;
            this._enabled = false;
            model.selections.changed.connect(this.onSelectionsChanged, this);
            model.value.changed.connect(this.onTextChanged, this);
            // On initial load, manually check the cursor position.
            this.onSelectionsChanged();
        }
    }
    /**
     * Get whether the completion handler is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources used by the handler.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal.clearData(this);
    }
    /**
     * Invoke the handler and launch a completer.
     */
    invoke() {
        _lumino_messaging__WEBPACK_IMPORTED_MODULE_1__.MessageLoop.sendMessage(this, CompletionHandler.Msg.InvokeRequest);
    }
    /**
     * Process a message sent to the completion handler.
     */
    processMessage(msg) {
        switch (msg.type) {
            case CompletionHandler.Msg.InvokeRequest.type:
                this.onInvokeRequest(msg);
                break;
            default:
                break;
        }
    }
    /**
     * Get the state of the text editor at the given position.
     */
    getState(editor, position) {
        return {
            text: editor.model.value.text,
            lineHeight: editor.lineHeight,
            charWidth: editor.charWidth,
            line: position.line,
            column: position.column
        };
    }
    /**
     * Handle a completion selected signal from the completion widget.
     */
    onCompletionSelected(completer, val) {
        const model = completer.model;
        const editor = this._editor;
        if (!editor || !model) {
            return;
        }
        const patch = model.createPatch(val);
        if (!patch) {
            return;
        }
        const { start, end, value } = patch;
        const cursorBeforeChange = editor.getOffsetAt(editor.getCursorPosition());
        // we need to update the shared model in a single transaction so that the undo manager works as expected
        editor.model.sharedModel.updateSource(start, end, value);
        if (cursorBeforeChange <= end && cursorBeforeChange >= start) {
            editor.setCursorPosition(editor.getPositionAt(start + value.length));
        }
    }
    /**
     * Handle `invoke-request` messages.
     */
    onInvokeRequest(msg) {
        // If there is no completer model, bail.
        if (!this.completer.model) {
            return;
        }
        // If a completer session is already active, bail.
        if (this.completer.model.original) {
            return;
        }
        const editor = this._editor;
        if (editor) {
            this._makeRequest(editor.getCursorPosition()).catch(reason => {
                console.warn('Invoke request bailed', reason);
            });
        }
    }
    /**
     * Handle selection changed signal from an editor.
     *
     * #### Notes
     * If a sub-class reimplements this method, then that class must either call
     * its super method or it must take responsibility for adding and removing
     * the completer completable class to the editor host node.
     *
     * Despite the fact that the editor widget adds a class whenever there is a
     * primary selection, this method checks independently for two reasons:
     *
     * 1. The editor widget connects to the same signal to add that class, so
     *    there is no guarantee that the class will be added before this method
     *    is invoked so simply checking for the CSS class's existence is not an
     *    option. Secondarily, checking the editor state should be faster than
     *    querying the DOM in either case.
     * 2. Because this method adds a class that indicates whether completer
     *    functionality ought to be enabled, relying on the behavior of the
     *    `jp-mod-has-primary-selection` to filter out any editors that have
     *    a selection means the semantic meaning of `jp-mod-completer-enabled`
     *    is obscured because there may be cases where the enabled class is added
     *    even though the completer is not available.
     */
    onSelectionsChanged() {
        const model = this.completer.model;
        const editor = this._editor;
        if (!editor) {
            return;
        }
        const host = editor.host;
        // If there is no model, return.
        if (!model) {
            this._enabled = false;
            host.classList.remove(COMPLETER_ENABLED_CLASS);
            return;
        }
        // If we are currently performing a subset match,
        // return without resetting the completer.
        if (model.subsetMatch) {
            return;
        }
        const position = editor.getCursorPosition();
        const line = editor.getLine(position.line);
        if (!line) {
            this._enabled = false;
            model.reset(true);
            host.classList.remove(COMPLETER_ENABLED_CLASS);
            return;
        }
        const { start, end } = editor.getSelection();
        // If there is a text selection, return.
        if (start.column !== end.column || start.line !== end.line) {
            this._enabled = false;
            model.reset(true);
            host.classList.remove(COMPLETER_ENABLED_CLASS);
            return;
        }
        // If the part of the line before the cursor is white space, return.
        if (line.slice(0, position.column).match(/^\s*$/)) {
            this._enabled = false;
            model.reset(true);
            host.classList.remove(COMPLETER_ENABLED_CLASS);
            return;
        }
        // Enable completion.
        if (!this._enabled) {
            this._enabled = true;
            host.classList.add(COMPLETER_ENABLED_CLASS);
        }
        // Dispatch the cursor change.
        model.handleCursorChange(this.getState(editor, editor.getCursorPosition()));
    }
    /**
     * Handle a text changed signal from an editor.
     */
    onTextChanged() {
        const model = this.completer.model;
        if (!model || !this._enabled) {
            return;
        }
        // If there is a text selection, no completion is allowed.
        const editor = this.editor;
        if (!editor) {
            return;
        }
        const { start, end } = editor.getSelection();
        if (start.column !== end.column || start.line !== end.line) {
            return;
        }
        // Dispatch the text change.
        model.handleTextChange(this.getState(editor, editor.getCursorPosition()));
    }
    /**
     * Handle a visibility change signal from a completer widget.
     */
    onVisibilityChanged(completer) {
        // Completer is not active.
        if (completer.isDisposed || completer.isHidden) {
            if (this._editor) {
                this._editor.host.classList.remove(COMPLETER_ACTIVE_CLASS);
                this._editor.focus();
            }
            return;
        }
        // Completer is active.
        if (this._editor) {
            this._editor.host.classList.add(COMPLETER_ACTIVE_CLASS);
        }
    }
    /**
     * Make a completion request.
     */
    _makeRequest(position) {
        const editor = this.editor;
        if (!editor) {
            return Promise.reject(new Error('No active editor'));
        }
        const text = editor.model.value.text;
        const offset = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.Text.jsIndexToCharIndex(editor.getOffsetAt(position), text);
        const pending = ++this._pending;
        const state = this.getState(editor, position);
        const request = { text, offset };
        if (this._isICompletionItemsConnector(this._connector)) {
            return this._connector
                .fetch(request)
                .then(reply => {
                this._validate(pending, request);
                if (!reply) {
                    throw new Error(`Invalid request: ${request}`);
                }
                this._onFetchItemsReply(state, reply);
            })
                .catch(_ => {
                this._onFailure();
            });
        }
        return this._connector
            .fetch(request)
            .then(reply => {
            this._validate(pending, request);
            if (!reply) {
                throw new Error(`Invalid request: ${request}`);
            }
            this._onReply(state, reply);
        })
            .catch(_ => {
            this._onFailure();
        });
    }
    _isICompletionItemsConnector(connector) {
        return (connector
            .responseType === CompletionHandler.ICompletionItemsResponseType);
    }
    _validate(pending, request) {
        if (this.isDisposed) {
            throw new Error('Handler is disposed');
        }
        // If a newer completion request has created a pending request, bail.
        if (pending !== this._pending) {
            throw new Error('A newer completion request is pending');
        }
    }
    /**
     * Updates model with text state and current cursor position.
     */
    _updateModel(state, start, end) {
        const model = this.completer.model;
        const text = state.text;
        if (!model) {
            return null;
        }
        // Update the original request.
        model.original = state;
        // Update the cursor.
        model.cursor = {
            start: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.Text.charIndexToJsIndex(start, text),
            end: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.Text.charIndexToJsIndex(end, text)
        };
        return model;
    }
    /**
     * Receive a completion reply from the connector.
     *
     * @param state - The state of the editor when completion request was made.
     *
     * @param reply - The API response returned for a completion request.
     */
    _onReply(state, reply) {
        const model = this._updateModel(state, reply.start, reply.end);
        if (!model) {
            return;
        }
        // Dedupe the matches.
        const matches = [];
        const matchSet = new Set(reply.matches || []);
        if (reply.matches) {
            matchSet.forEach(match => {
                matches.push(match);
            });
        }
        // Extract the optional type map. The current implementation uses
        // _jupyter_types_experimental which provide string type names. We make no
        // assumptions about the names of the types, so other kernels can provide
        // their own types.
        // Even though the `metadata` field is required, it has historically not
        // been used. Defensively check if it exists.
        const metadata = reply.metadata || {};
        const types = metadata._jupyter_types_experimental;
        const typeMap = {};
        if (types) {
            types.forEach((item) => {
                // For some reason the _jupyter_types_experimental list has two entries
                // for each match, with one having a type of "<unknown>". Discard those
                // and use undefined to indicate an unknown type.
                const text = item.text;
                const type = item.type;
                if (matchSet.has(text) && type !== '<unknown>') {
                    typeMap[text] = type;
                }
            });
        }
        // Update the options, including the type map.
        model.setOptions(matches, typeMap);
    }
    /**
     * Receive completion items from provider.
     *
     * @param state - The state of the editor when completion request was made.
     *
     * @param reply - The API response returned for a completion request.
     */
    _onFetchItemsReply(state, reply) {
        const model = this._updateModel(state, reply.start, reply.end);
        if (!model) {
            return;
        }
        if (model.setCompletionItems) {
            model.setCompletionItems(reply.items);
        }
    }
    /**
     * If completion request fails, reset model and fail silently.
     */
    _onFailure() {
        const model = this.completer.model;
        if (model) {
            model.reset(true);
        }
    }
}
/**
 * A namespace for cell completion handler statics.
 */
(function (CompletionHandler) {
    CompletionHandler.ICompletionItemsResponseType = 'ICompletionItemsReply';
    /**
     * A namespace for completion handler messages.
     */
    let Msg;
    (function (Msg) {
        /* tslint:disable */
        /**
         * A singleton `'invoke-request'` message.
         */
        Msg.InvokeRequest = new _lumino_messaging__WEBPACK_IMPORTED_MODULE_1__.Message('invoke-request');
        /* tslint:enable */
    })(Msg = CompletionHandler.Msg || (CompletionHandler.Msg = {}));
})(CompletionHandler || (CompletionHandler = {}));
//# sourceMappingURL=handler.js.map

/***/ }),

/***/ "../../packages/completer/lib/index.js":
/*!*********************************************!*\
  !*** ../../packages/completer/lib/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompletionHandler": () => (/* reexport safe */ _handler__WEBPACK_IMPORTED_MODULE_0__.CompletionHandler),
/* harmony export */   "KernelConnector": () => (/* reexport safe */ _kernelconnector__WEBPACK_IMPORTED_MODULE_1__.KernelConnector),
/* harmony export */   "ContextConnector": () => (/* reexport safe */ _contextconnector__WEBPACK_IMPORTED_MODULE_2__.ContextConnector),
/* harmony export */   "CompletionConnector": () => (/* reexport safe */ _connector__WEBPACK_IMPORTED_MODULE_3__.CompletionConnector),
/* harmony export */   "CompleterModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_4__.CompleterModel),
/* harmony export */   "Completer": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_5__.Completer),
/* harmony export */   "ICompletionManager": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_6__.ICompletionManager)
/* harmony export */ });
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler */ "../../packages/completer/lib/handler.js");
/* harmony import */ var _kernelconnector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kernelconnector */ "../../packages/completer/lib/kernelconnector.js");
/* harmony import */ var _contextconnector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contextconnector */ "../../packages/completer/lib/contextconnector.js");
/* harmony import */ var _connector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./connector */ "../../packages/completer/lib/connector.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model */ "../../packages/completer/lib/model.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./widget */ "../../packages/completer/lib/widget.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tokens */ "../../packages/completer/lib/tokens.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module completer
 */







//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/completer/lib/kernelconnector.js":
/*!*******************************************************!*\
  !*** ../../packages/completer/lib/kernelconnector.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KernelConnector": () => (/* binding */ KernelConnector)
/* harmony export */ });
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * A kernel connector for completion handlers.
 */
class KernelConnector extends _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__.DataConnector {
    /**
     * Create a new kernel connector for completion requests.
     *
     * @param options - The instantiation options for the kernel connector.
     */
    constructor(options) {
        super();
        this._session = options.session;
    }
    /**
     * Fetch completion requests.
     *
     * @param request - The completion request text and details.
     */
    async fetch(request) {
        var _a;
        const kernel = (_a = this._session) === null || _a === void 0 ? void 0 : _a.kernel;
        if (!kernel) {
            throw new Error('No kernel for completion request.');
        }
        const contents = {
            code: request.text,
            cursor_pos: request.offset
        };
        const msg = await kernel.requestComplete(contents);
        const response = msg.content;
        if (response.status !== 'ok') {
            throw new Error('Completion fetch failed to return successfully.');
        }
        return {
            start: response.cursor_start,
            end: response.cursor_end,
            matches: response.matches,
            metadata: response.metadata
        };
    }
}
//# sourceMappingURL=kernelconnector.js.map

/***/ }),

/***/ "../../packages/completer/lib/model.js":
/*!*********************************************!*\
  !*** ../../packages/completer/lib/model.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CompleterModel": () => (/* binding */ CompleterModel)
/* harmony export */ });
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * An implementation of a completer model.
 */
class CompleterModel {
    constructor() {
        this._current = null;
        this._cursor = null;
        this._isDisposed = false;
        this._completionItems = [];
        this._options = [];
        this._original = null;
        this._query = '';
        this._subsetMatch = false;
        this._typeMap = {};
        this._orderedTypes = [];
        this._stateChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
    }
    /**
     * A signal emitted when state of the completer menu changes.
     */
    get stateChanged() {
        return this._stateChanged;
    }
    /**
     * The original completion request details.
     */
    get original() {
        return this._original;
    }
    set original(newValue) {
        const unchanged = this._original === newValue ||
            (this._original &&
                newValue &&
                _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepEqual(newValue, this._original));
        if (unchanged) {
            return;
        }
        this._reset();
        // Set both the current and original to the same value when original is set.
        this._current = this._original = newValue;
        this._stateChanged.emit(undefined);
    }
    /**
     * The current text change details.
     */
    get current() {
        return this._current;
    }
    set current(newValue) {
        const unchanged = this._current === newValue ||
            (this._current && newValue && _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepEqual(newValue, this._current));
        if (unchanged) {
            return;
        }
        const original = this._original;
        // Original request must always be set before a text change. If it isn't
        // the model fails silently.
        if (!original) {
            return;
        }
        const cursor = this._cursor;
        // Cursor must always be set before a text change. This happens
        // automatically in the completer handler, but since `current` is a public
        // attribute, this defensive check is necessary.
        if (!cursor) {
            return;
        }
        const current = (this._current = newValue);
        if (!current) {
            this._stateChanged.emit(undefined);
            return;
        }
        const originalLine = original.text.split('\n')[original.line];
        const currentLine = current.text.split('\n')[current.line];
        // If the text change means that the original start point has been preceded,
        // then the completion is no longer valid and should be reset.
        if (!this._subsetMatch && currentLine.length < originalLine.length) {
            this.reset(true);
            return;
        }
        const { start, end } = cursor;
        // Clip the front of the current line.
        let query = current.text.substring(start);
        // Clip the back of the current line by calculating the end of the original.
        const ending = original.text.substring(end);
        query = query.substring(0, query.lastIndexOf(ending));
        this._query = query;
        this._stateChanged.emit(undefined);
    }
    /**
     * The cursor details that the API has used to return matching options.
     */
    get cursor() {
        return this._cursor;
    }
    set cursor(newValue) {
        // Original request must always be set before a cursor change. If it isn't
        // the model fails silently.
        if (!this.original) {
            return;
        }
        this._cursor = newValue;
    }
    /**
     * The query against which items are filtered.
     */
    get query() {
        return this._query;
    }
    set query(newValue) {
        this._query = newValue;
    }
    /**
     * A flag that is true when the model value was modified by a subset match.
     */
    get subsetMatch() {
        return this._subsetMatch;
    }
    set subsetMatch(newValue) {
        this._subsetMatch = newValue;
    }
    /**
     * Get whether the model is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the model.
     */
    dispose() {
        // Do nothing if already disposed.
        if (this._isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal.clearData(this);
    }
    /**
     * The list of visible items in the completer menu.
     *
     * #### Notes
     * This is a read-only property.
     */
    completionItems() {
        let query = this._query;
        if (query) {
            return this._markup(query);
        }
        return this._completionItems;
    }
    /**
     * Set the list of visible items in the completer menu, and append any
     * new types to KNOWN_TYPES.
     */
    setCompletionItems(newValue) {
        if (_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepEqual(newValue, this._completionItems)) {
            return;
        }
        this._completionItems = newValue;
        this._orderedTypes = Private.findOrderedCompletionItemTypes(this._completionItems);
        this._stateChanged.emit(undefined);
    }
    /**
     * The list of visible items in the completer menu.
     * @deprecated use `completionItems` instead
     *
     * #### Notes
     * This is a read-only property.
     */
    items() {
        return this._filter();
    }
    /**
     * The unfiltered list of all available options in a completer menu.
     */
    options() {
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.iter)(this._options);
    }
    /**
     * The map from identifiers (a.b) to types (function, module, class, instance,
     * etc.).
     *
     * #### Notes
     * A type map is currently only provided by the latest IPython kernel using
     * the completer reply metadata field `_jupyter_types_experimental`. The
     * values are completely up to the kernel.
     *
     */
    typeMap() {
        return this._typeMap;
    }
    /**
     * An ordered list of all the known types in the typeMap.
     *
     * #### Notes
     * To visually encode the types of the completer matches, we assemble an
     * ordered list. This list begins with:
     * ```
     * ['function', 'instance', 'class', 'module', 'keyword']
     * ```
     * and then has any remaining types listed alphabetically. This will give
     * reliable visual encoding for these known types, but allow kernels to
     * provide new types.
     */
    orderedTypes() {
        return this._orderedTypes;
    }
    /**
     * Set the available options in the completer menu.
     */
    setOptions(newValue, typeMap) {
        const values = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.toArray)(newValue || []);
        const types = typeMap || {};
        if (_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepEqual(values, this._options) &&
            _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.JSONExt.deepEqual(types, this._typeMap)) {
            return;
        }
        if (values.length) {
            this._options = values;
            this._typeMap = types;
            this._orderedTypes = Private.findOrderedTypes(types);
        }
        else {
            this._options = [];
            this._typeMap = {};
            this._orderedTypes = [];
        }
        this._stateChanged.emit(undefined);
    }
    /**
     * Handle a cursor change.
     */
    handleCursorChange(change) {
        // If there is no active completion, return.
        if (!this._original) {
            return;
        }
        const { column, line } = change;
        const { current, original } = this;
        if (!original) {
            return;
        }
        // If a cursor change results in a the cursor being on a different line
        // than the original request, cancel.
        if (line !== original.line) {
            this.reset(true);
            return;
        }
        // If a cursor change results in the cursor being set to a position that
        // precedes the original column, cancel.
        if (column < original.column) {
            this.reset(true);
            return;
        }
        const { cursor } = this;
        if (!cursor || !current) {
            return;
        }
        // If a cursor change results in the cursor being set to a position beyond
        // the end of the area that would be affected by completion, cancel.
        const cursorDelta = cursor.end - cursor.start;
        const originalLine = original.text.split('\n')[original.line];
        const currentLine = current.text.split('\n')[current.line];
        const inputDelta = currentLine.length - originalLine.length;
        if (column > original.column + cursorDelta + inputDelta) {
            this.reset(true);
            return;
        }
    }
    /**
     * Handle a text change.
     */
    handleTextChange(change) {
        const original = this._original;
        // If there is no active completion, return.
        if (!original) {
            return;
        }
        const { text, column, line } = change;
        const last = text.split('\n')[line][column - 1];
        // If last character entered is not whitespace or if the change column is
        // greater than or equal to the original column, update completion.
        if ((last && last.match(/\S/)) || change.column >= original.column) {
            this.current = change;
            return;
        }
        // If final character is whitespace, reset completion.
        this.reset(false);
    }
    /**
     * Create a resolved patch between the original state and a patch string.
     *
     * @param patch - The patch string to apply to the original value.
     *
     * @returns A patched text change or undefined if original value did not exist.
     */
    createPatch(patch) {
        const original = this._original;
        const cursor = this._cursor;
        const current = this._current;
        if (!original || !cursor || !current) {
            return undefined;
        }
        let { start, end } = cursor;
        // Also include any filtering/additional-typing that has occurred
        // since the completion request in the patched length.
        end = end + (current.text.length - original.text.length);
        return { start, end, value: patch };
    }
    /**
     * Reset the state of the model and emit a state change signal.
     *
     * @param hard - Reset even if a subset match is in progress.
     */
    reset(hard = false) {
        // When the completer detects a common subset prefix for all options,
        // it updates the model and sets the model source to that value, triggering
        // a reset. Unless explicitly a hard reset, this should be ignored.
        if (!hard && this._subsetMatch) {
            return;
        }
        this._reset();
        this._stateChanged.emit(undefined);
    }
    /**
     * Check if CompletionItem matches against query.
     * Highlight matching prefix by adding <mark> tags.
     */
    _markup(query) {
        const items = this._completionItems;
        let results = [];
        for (let item of items) {
            // See if label matches query string
            // With ICompletionItems, the label may include parameters, so we exclude them from the matcher.
            // e.g. Given label `foo(b, a, r)` and query `bar`,
            // don't count parameters, `b`, `a`, and `r` as matches.
            const index = item.label.indexOf('(');
            const prefix = index > -1 ? item.label.substring(0, index) : item.label;
            let match = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.StringExt.matchSumOfSquares(prefix, query);
            // Filter non-matching items.
            if (match) {
                // Highlight label text if there's a match
                let marked = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.StringExt.highlight(item.label, match.indices, Private.mark);
                results.push(Object.assign(Object.assign({}, item), { 
                    // Allow for lazily retrieved documentation (with a getter)
                    documentation: item.documentation, label: marked.join(''), 
                    // If no insertText is present, preserve original label value
                    // by setting it as the insertText.
                    insertText: item.insertText ? item.insertText : item.label, score: match.score }));
            }
        }
        results.sort(Private.scoreCmp2);
        // Delete the extra score attribute to not leak implementation details
        // to JavaScript callers.
        results.forEach(x => {
            delete x.score;
        });
        return results;
    }
    /**
     * Apply the query to the complete options list to return the matching subset.
     */
    _filter() {
        const options = this._options || [];
        const query = this._query;
        if (!query) {
            return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.map)(options, option => ({ raw: option, text: option }));
        }
        const results = [];
        for (const option of options) {
            const match = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.StringExt.matchSumOfSquares(option, query);
            if (match) {
                const marked = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.StringExt.highlight(option, match.indices, Private.mark);
                results.push({
                    raw: option,
                    score: match.score,
                    text: marked.join('')
                });
            }
        }
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_0__.map)(results.sort(Private.scoreCmp), result => ({
            text: result.text,
            raw: result.raw
        }));
    }
    /**
     * Reset the state of the model.
     */
    _reset() {
        this._current = null;
        this._cursor = null;
        this._completionItems = [];
        this._options = [];
        this._original = null;
        this._query = '';
        this._subsetMatch = false;
        this._typeMap = {};
        this._orderedTypes = [];
    }
}
/**
 * A namespace for completer model private data.
 */
var Private;
(function (Private) {
    /**
     * The list of known type annotations of completer matches.
     */
    const KNOWN_TYPES = ['function', 'instance', 'class', 'module', 'keyword'];
    /**
     * The map of known type annotations of completer matches.
     */
    const KNOWN_MAP = KNOWN_TYPES.reduce((acc, type) => {
        acc[type] = null;
        return acc;
    }, {});
    /**
     * Mark a highlighted chunk of text.
     */
    function mark(value) {
        return `<mark>${value}</mark>`;
    }
    Private.mark = mark;
    /**
     * A sort comparison function for item match scores.
     *
     * #### Notes
     * This orders the items first based on score (lower is better), then
     * by locale order of the item text.
     */
    function scoreCmp(a, b) {
        const delta = a.score - b.score;
        if (delta !== 0) {
            return delta;
        }
        return a.raw.localeCompare(b.raw);
    }
    Private.scoreCmp = scoreCmp;
    /**
     * A sort comparison function for item match scores.
     *
     * #### Notes
     * This orders the items first based on score (lower is better), then
     * by locale order of the item text.
     */
    function scoreCmp2(a, b) {
        var _a, _b, _c;
        const delta = a.score - b.score;
        if (delta !== 0) {
            return delta;
        }
        return (_c = (_a = a.insertText) === null || _a === void 0 ? void 0 : _a.localeCompare((_b = b.insertText) !== null && _b !== void 0 ? _b : '')) !== null && _c !== void 0 ? _c : 0;
    }
    Private.scoreCmp2 = scoreCmp2;
    /**
     * Compute a reliably ordered list of types for ICompletionItems.
     *
     * #### Notes
     * The resulting list always begins with the known types:
     * ```
     * ['function', 'instance', 'class', 'module', 'keyword']
     * ```
     * followed by other types in alphabetical order.
     *
     */
    function findOrderedCompletionItemTypes(items) {
        const newTypeSet = new Set();
        items.forEach(item => {
            if (item.type &&
                !KNOWN_TYPES.includes(item.type) &&
                !newTypeSet.has(item.type)) {
                newTypeSet.add(item.type);
            }
        });
        const newTypes = Array.from(newTypeSet);
        newTypes.sort((a, b) => a.localeCompare(b));
        return KNOWN_TYPES.concat(newTypes);
    }
    Private.findOrderedCompletionItemTypes = findOrderedCompletionItemTypes;
    /**
     * Compute a reliably ordered list of types.
     *
     * #### Notes
     * The resulting list always begins with the known types:
     * ```
     * ['function', 'instance', 'class', 'module', 'keyword']
     * ```
     * followed by other types in alphabetical order.
     */
    function findOrderedTypes(typeMap) {
        const filtered = Object.keys(typeMap)
            .map(key => typeMap[key])
            .filter((value) => !!value && !(value in KNOWN_MAP))
            .sort((a, b) => a.localeCompare(b));
        return KNOWN_TYPES.concat(filtered);
    }
    Private.findOrderedTypes = findOrderedTypes;
})(Private || (Private = {}));
//# sourceMappingURL=model.js.map

/***/ }),

/***/ "../../packages/completer/lib/tokens.js":
/*!**********************************************!*\
  !*** ../../packages/completer/lib/tokens.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ICompletionManager": () => (/* binding */ ICompletionManager)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The completion manager token.
 */
const ICompletionManager = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/completer:ICompletionManager');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/completer/lib/widget.js":
/*!**********************************************!*\
  !*** ../../packages/completer/lib/widget.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Completer": () => (/* binding */ Completer)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/domutils */ "webpack/sharing/consume/default/@lumino/domutils/@lumino/domutils?0bc5");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_domutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_5__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.






/**
 * The class name added to completer menu items.
 */
const ITEM_CLASS = 'jp-Completer-item';
/**
 * The class name added to an active completer menu item.
 */
const ACTIVE_CLASS = 'jp-mod-active';
/**
 * The minimum height of a completer widget.
 */
const MIN_HEIGHT = 20;
/**
 * The maximum height of a completer widget.
 */
const MAX_HEIGHT = 300;
/**
 * A flag to indicate that event handlers are caught in the capture phase.
 */
const USE_CAPTURE = true;
/**
 * The number of colors defined for the completer type annotations.
 * These are listed in completer/style/index.css#102-152.
 */
const N_COLORS = 10;
/**
 * A widget that enables text completion.
 *
 * #### Notes
 * The completer is intended to be absolutely positioned on the
 * page and hover over any other content, so it should be attached directly
 * to `document.body`, or a node that is the full size of `document.body`.
 * Attaching it to other nodes may incorrectly locate the completer.
 */
class Completer extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Widget {
    /**
     * Construct a text completer menu widget.
     */
    constructor(options) {
        super({ node: document.createElement('div') });
        this._activeIndex = 0;
        this._editor = null;
        this._model = null;
        this._resetFlag = false;
        this._selected = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._visibilityChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._indexChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._lastSubsetMatch = '';
        this._renderer = options.renderer || Completer.defaultRenderer;
        this.model = options.model || null;
        this.editor = options.editor || null;
        this.addClass('jp-Completer');
    }
    /**
     * The active index.
     */
    get activeIndex() {
        return this._activeIndex;
    }
    /**
     * The editor used by the completion widget.
     */
    get editor() {
        return this._editor;
    }
    set editor(newValue) {
        this._editor = newValue;
    }
    /**
     * A signal emitted when a selection is made from the completer menu.
     */
    get selected() {
        return this._selected;
    }
    /**
     * A signal emitted when the completer widget's visibility changes.
     *
     * #### Notes
     * This signal is useful when there are multiple floating widgets that may
     * contend with the same space and ought to be mutually exclusive.
     */
    get visibilityChanged() {
        return this._visibilityChanged;
    }
    /**
     * A signal emitted when the active index changes.
     */
    get indexChanged() {
        return this._indexChanged;
    }
    /**
     * The model used by the completer widget.
     */
    get model() {
        return this._model;
    }
    set model(model) {
        if ((!model && !this._model) || model === this._model) {
            return;
        }
        if (this._model) {
            this._model.stateChanged.disconnect(this.onModelStateChanged, this);
        }
        this._model = model;
        if (this._model) {
            this._model.stateChanged.connect(this.onModelStateChanged, this);
        }
    }
    /**
     * Dispose of the resources held by the completer widget.
     */
    dispose() {
        this._model = null;
        super.dispose();
    }
    /**
     * Handle the DOM events for the widget.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the dock panel's node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        if (this.isHidden || !this._editor) {
            return;
        }
        switch (event.type) {
            case 'keydown':
                this._evtKeydown(event);
                break;
            case 'mousedown':
                this._evtMousedown(event);
                break;
            case 'scroll':
                this._evtScroll(event);
                break;
            default:
                break;
        }
    }
    /**
     * Reset the widget.
     */
    reset() {
        this._activeIndex = 0;
        this._lastSubsetMatch = '';
        if (this._model) {
            this._model.reset(true);
        }
    }
    /**
     * Emit the selected signal for the current active item and reset.
     */
    selectActive() {
        const active = this.node.querySelector(`.${ACTIVE_CLASS}`);
        if (!active) {
            this.reset();
            return;
        }
        this._selected.emit(active.getAttribute('data-value'));
        this.reset();
    }
    /**
     * Handle `after-attach` messages for the widget.
     */
    onAfterAttach(msg) {
        document.addEventListener('keydown', this, USE_CAPTURE);
        document.addEventListener('mousedown', this, USE_CAPTURE);
        document.addEventListener('scroll', this, USE_CAPTURE);
    }
    /**
     * Handle `before-detach` messages for the widget.
     */
    onBeforeDetach(msg) {
        document.removeEventListener('keydown', this, USE_CAPTURE);
        document.removeEventListener('mousedown', this, USE_CAPTURE);
        document.removeEventListener('scroll', this, USE_CAPTURE);
    }
    /**
     * Handle model state changes.
     */
    onModelStateChanged() {
        if (this.isAttached) {
            this._activeIndex = 0;
            this._indexChanged.emit(this._activeIndex);
            this.update();
        }
    }
    /**
     * Handle `update-request` messages.
     */
    onUpdateRequest(msg) {
        const model = this._model;
        if (!model) {
            return;
        }
        if (this._resetFlag) {
            this._resetFlag = false;
            if (!this.isHidden) {
                this.hide();
                this._visibilityChanged.emit(undefined);
            }
            return;
        }
        let node = null;
        let completionItemList = model.completionItems && model.completionItems();
        if (completionItemList && completionItemList.length) {
            node = this._createCompletionItemNode(model, completionItemList);
        }
        else {
            node = this._createIItemNode(model);
        }
        if (!node) {
            return;
        }
        let active = node.querySelectorAll(`.${ITEM_CLASS}`)[this._activeIndex];
        active.classList.add(ACTIVE_CLASS);
        // Add the documentation panel
        let docPanel = document.createElement('div');
        docPanel.className = 'jp-Completer-docpanel';
        node.appendChild(docPanel);
        this._updateDocPanel();
        // If this is the first time the current completer session has loaded,
        // populate any initial subset match.
        if (!model.query) {
            const populated = this._populateSubset();
            if (populated) {
                this.update();
                return;
            }
        }
        if (this.isHidden) {
            this.show();
            this._setGeometry();
            this._visibilityChanged.emit(undefined);
        }
        else {
            this._setGeometry();
        }
    }
    _createCompletionItemNode(model, items) {
        // If there are no items, reset and bail.
        if (!items.length) {
            this._resetFlag = true;
            this.reset();
            if (!this.isHidden) {
                this.hide();
                this._visibilityChanged.emit(undefined);
            }
            return null;
        }
        // Clear the node.
        let node = this.node;
        node.textContent = '';
        // Compute an ordered list of all the types in the typeMap, this is computed
        // once by the model each time new data arrives for efficiency.
        let orderedTypes = model.orderedTypes();
        // Populate the completer items.
        let ul = document.createElement('ul');
        ul.className = 'jp-Completer-list';
        for (let item of items) {
            if (!this._renderer.createCompletionItemNode) {
                return null;
            }
            let li = this._renderer.createCompletionItemNode(item, orderedTypes);
            ul.appendChild(li);
        }
        node.appendChild(ul);
        return node;
    }
    _createIItemNode(model) {
        const items = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.toArray)(model.items());
        // If there are no items, reset and bail.
        if (!items || !items.length) {
            this._resetFlag = true;
            this.reset();
            if (!this.isHidden) {
                this.hide();
                this._visibilityChanged.emit(undefined);
            }
            return null;
        }
        // If there is only one option, signal and bail.
        // We don't test the filtered `items`, as that
        // is too aggressive of completer behavior, it can
        // lead to double typing of an option.
        const options = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_1__.toArray)(model.options());
        if (options.length === 1) {
            this._selected.emit(options[0]);
            this.reset();
            return null;
        }
        // Clear the node.
        const node = this.node;
        node.textContent = '';
        // Compute an ordered list of all the types in the typeMap, this is computed
        // once by the model each time new data arrives for efficiency.
        const orderedTypes = model.orderedTypes();
        // Populate the completer items.
        let ul = document.createElement('ul');
        ul.className = 'jp-Completer-list';
        for (const item of items) {
            const li = this._renderer.createItemNode(item, model.typeMap(), orderedTypes);
            ul.appendChild(li);
        }
        node.appendChild(ul);
        return node;
    }
    /**
     * Cycle through the available completer items.
     *
     * #### Notes
     * When the user cycles all the way `down` to the last index, subsequent
     * `down` cycles will cycle to the first index. When the user cycles `up` to
     * the first item, subsequent `up` cycles will cycle to the last index.
     */
    _cycle(direction) {
        const items = this.node.querySelectorAll(`.${ITEM_CLASS}`);
        const index = this._activeIndex;
        let active = this.node.querySelector(`.${ACTIVE_CLASS}`);
        active.classList.remove(ACTIVE_CLASS);
        if (direction === 'up') {
            this._activeIndex = index === 0 ? items.length - 1 : index - 1;
        }
        else if (direction === 'down') {
            this._activeIndex = index < items.length - 1 ? index + 1 : 0;
        }
        else {
            // Measure the number of items on a page.
            const boxHeight = this.node.getBoundingClientRect().height;
            const itemHeight = active.getBoundingClientRect().height;
            const pageLength = Math.floor(boxHeight / itemHeight);
            // Update the index
            if (direction === 'pageUp') {
                this._activeIndex = index - pageLength;
            }
            else {
                this._activeIndex = index + pageLength;
            }
            // Clamp to the length of the list.
            this._activeIndex = Math.min(Math.max(0, this._activeIndex), items.length - 1);
        }
        active = items[this._activeIndex];
        active.classList.add(ACTIVE_CLASS);
        let completionList = this.node.querySelector('.jp-Completer-list');
        _lumino_domutils__WEBPACK_IMPORTED_MODULE_3__.ElementExt.scrollIntoViewIfNeeded(completionList, active);
        this._indexChanged.emit(this._activeIndex);
        this._updateDocPanel();
    }
    /**
     * Handle keydown events for the widget.
     */
    _evtKeydown(event) {
        if (this.isHidden || !this._editor) {
            return;
        }
        if (!this._editor.host.contains(event.target)) {
            this.reset();
            return;
        }
        switch (event.keyCode) {
            case 9: {
                // Tab key
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                const model = this._model;
                if (!model) {
                    return;
                }
                // Autoinsert single completions on manual request (tab)
                const items = model.completionItems && model.completionItems();
                if (items && items.length === 1) {
                    this._selected.emit(items[0].insertText || items[0].label);
                    this.reset();
                    return;
                }
                const populated = this._populateSubset();
                // If the common subset was found and set on `query`,
                // or if there is a `query` in the initialization options,
                // then emit a completion signal with that `query` (=subset match),
                // but only if the query has actually changed.
                // See: https://github.com/jupyterlab/jupyterlab/issues/10439#issuecomment-875189540
                if (model.query && model.query != this._lastSubsetMatch) {
                    model.subsetMatch = true;
                    this._selected.emit(model.query);
                    model.subsetMatch = false;
                    this._lastSubsetMatch = model.query;
                }
                // If the query changed, update rendering of the options.
                if (populated) {
                    this.update();
                }
                this._cycle(event.shiftKey ? 'up' : 'down');
                return;
            }
            case 27: // Esc key
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                this.reset();
                return;
            case 33: // PageUp
            case 34: // PageDown
            case 38: // Up arrow key
            case 40: {
                // Down arrow key
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                const cycle = Private.keyCodeMap[event.keyCode];
                this._cycle(cycle);
                return;
            }
            default:
                return;
        }
    }
    /**
     * Handle mousedown events for the widget.
     */
    _evtMousedown(event) {
        if (this.isHidden || !this._editor) {
            return;
        }
        if (Private.nonstandardClick(event)) {
            this.reset();
            return;
        }
        let target = event.target;
        while (target !== document.documentElement) {
            // If the user has made a selection, emit its value and reset the widget.
            if (target.classList.contains(ITEM_CLASS)) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                this._selected.emit(target.getAttribute('data-value'));
                this.reset();
                return;
            }
            // If the mouse event happened anywhere else in the widget, bail.
            if (target === this.node) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                return;
            }
            target = target.parentElement;
        }
        this.reset();
    }
    /**
     * Handle scroll events for the widget
     */
    _evtScroll(event) {
        if (this.isHidden || !this._editor) {
            return;
        }
        const { node } = this;
        // All scrolls except scrolls in the actual hover box node may cause the
        // referent editor that anchors the node to move, so the only scroll events
        // that can safely be ignored are ones that happen inside the hovering node.
        if (node.contains(event.target)) {
            return;
        }
        // Set the geometry of the node asynchronously.
        requestAnimationFrame(() => {
            this._setGeometry();
        });
    }
    /**
     * Populate the completer up to the longest initial subset of items.
     *
     * @returns `true` if a subset match was found and populated.
     */
    _populateSubset() {
        const { model } = this;
        if (!model) {
            return false;
        }
        const items = this.node.querySelectorAll(`.${ITEM_CLASS}`);
        const subset = Private.commonSubset(Private.itemValues(items));
        const { query } = model;
        // If a common subset exists and it is not the current query, highlight it.
        if (subset && subset !== query && subset.indexOf(query) === 0) {
            model.query = subset;
            return true;
        }
        return false;
    }
    /**
     * Set the visible dimensions of the widget.
     */
    _setGeometry() {
        const { node } = this;
        const model = this._model;
        const editor = this._editor;
        // This is an overly defensive test: `cursor` will always exist if
        // `original` exists, except in contrived tests. But since it is possible
        // to generate a runtime error, the check occurs here.
        if (!editor || !model || !model.original || !model.cursor) {
            return;
        }
        const start = model.cursor.start;
        const position = editor.getPositionAt(start);
        const anchor = editor.getCoordinateForPosition(position);
        const style = window.getComputedStyle(node);
        const borderLeft = parseInt(style.borderLeftWidth, 10) || 0;
        const paddingLeft = parseInt(style.paddingLeft, 10) || 0;
        // Calculate the geometry of the completer.
        _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.HoverBox.setGeometry({
            anchor,
            host: editor.host,
            maxHeight: MAX_HEIGHT,
            minHeight: MIN_HEIGHT,
            node: node,
            offset: { horizontal: borderLeft + paddingLeft },
            privilege: 'below',
            style: style
        });
    }
    /**
     * Update the display-state and contents of the documentation panel
     */
    _updateDocPanel() {
        var _a, _b;
        let docPanel = this.node.querySelector('.jp-Completer-docpanel');
        if (!docPanel) {
            return;
        }
        if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.completionItems)) {
            return;
        }
        let items = (_b = this.model) === null || _b === void 0 ? void 0 : _b.completionItems();
        if (!items) {
            docPanel.setAttribute('style', 'display:none');
            return;
        }
        let activeItem = items[this._activeIndex];
        if (!activeItem) {
            docPanel.setAttribute('style', 'display:none');
            return;
        }
        docPanel.textContent = '';
        if (activeItem.documentation) {
            let node;
            if (!this._renderer.createDocumentationNode) {
                node = Completer.defaultRenderer.createDocumentationNode(activeItem);
            }
            else {
                node = this._renderer.createDocumentationNode(activeItem);
            }
            docPanel.appendChild(node);
            docPanel.setAttribute('style', '');
        }
        else {
            docPanel.setAttribute('style', 'display:none');
        }
    }
}
(function (Completer) {
    /**
     * The default implementation of an `IRenderer`.
     */
    class Renderer {
        /**
         * Create an item node from an ICompletionItem for a text completer menu.
         */
        createCompletionItemNode(item, orderedTypes) {
            let baseNode = this._createBaseNode(item.insertText || item.label);
            if (item.deprecated) {
                baseNode.classList.add('jp-Completer-deprecated');
            }
            return this._constructNode(baseNode, this._createMatchNode(item.label), !!item.type, item.type, orderedTypes, item.icon);
        }
        /**
         * Create an item node for a text completer menu.
         */
        createItemNode(item, typeMap, orderedTypes) {
            return this._constructNode(this._createBaseNode(item.raw), this._createMatchNode(item.text), !_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.deepEqual(typeMap, {}), typeMap[item.raw] || '', orderedTypes);
        }
        /**
         * Create a documentation node for documentation panel.
         */
        createDocumentationNode(activeItem) {
            let pre = document.createElement('pre');
            pre.textContent = activeItem.documentation || '';
            return pre;
        }
        /**
         * Create base node with the value to be inserted
         */
        _createBaseNode(value) {
            const li = document.createElement('li');
            li.className = ITEM_CLASS;
            // Set the raw, un-marked up value as a data attribute.
            li.setAttribute('data-value', value);
            return li;
        }
        /**
         * Create match node to highlight potential prefix match within result.
         */
        _createMatchNode(result) {
            const matchNode = document.createElement('code');
            matchNode.className = 'jp-Completer-match';
            // Use innerHTML because search results include <mark> tags.
            matchNode.innerHTML = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.defaultSanitizer.sanitize(result, {
                allowedTags: ['mark']
            });
            return matchNode;
        }
        /**
         * Attaches type and match nodes to base node.
         */
        _constructNode(li, matchNode, typesExist, type, orderedTypes, icon) {
            // Add the icon or type monogram
            if (icon) {
                const iconNode = icon.element({
                    className: 'jp-Completer-type jp-Completer-icon'
                });
                li.appendChild(iconNode);
            }
            else if (typesExist) {
                const typeNode = document.createElement('span');
                typeNode.textContent = (type[0] || '').toLowerCase();
                const colorIndex = (orderedTypes.indexOf(type) % N_COLORS) + 1;
                typeNode.className = 'jp-Completer-type jp-Completer-monogram';
                typeNode.setAttribute(`data-color-index`, colorIndex.toString());
                li.appendChild(typeNode);
            }
            else {
                // Create empty span to ensure consistent list styling.
                // Otherwise, in a list of two items,
                // if one item has an icon, but the other has type,
                // the icon grows out of its bounds.
                const dummyNode = document.createElement('span');
                dummyNode.className = 'jp-Completer-monogram';
                li.appendChild(dummyNode);
            }
            li.appendChild(matchNode);
            // If there is a type, add the type extension and title
            if (typesExist) {
                li.title = type;
                const typeExtendedNode = document.createElement('code');
                typeExtendedNode.className = 'jp-Completer-typeExtended';
                typeExtendedNode.textContent = type.toLocaleLowerCase();
                li.appendChild(typeExtendedNode);
            }
            else {
                // If no type is present on the right,
                // the highlighting of the completion item
                // doesn't cover the entire row.
                const dummyTypeExtendedNode = document.createElement('span');
                dummyTypeExtendedNode.className = 'jp-Completer-typeExtended';
                li.appendChild(dummyTypeExtendedNode);
            }
            return li;
        }
    }
    Completer.Renderer = Renderer;
    /**
     * The default `IRenderer` instance.
     */
    Completer.defaultRenderer = new Renderer();
})(Completer || (Completer = {}));
/**
 * A namespace for completer widget private data.
 */
var Private;
(function (Private) {
    /**
     * Mapping from keyCodes to scrollTypes.
     */
    Private.keyCodeMap = {
        38: 'up',
        40: 'down',
        33: 'pageUp',
        34: 'pageDown'
    };
    /**
     * Returns the common subset string that a list of strings shares.
     */
    function commonSubset(values) {
        const len = values.length;
        let subset = '';
        if (len < 2) {
            return subset;
        }
        const strlen = values[0].length;
        for (let i = 0; i < strlen; i++) {
            const ch = values[0][i];
            for (let j = 1; j < len; j++) {
                if (values[j][i] !== ch) {
                    return subset;
                }
            }
            subset += ch;
        }
        return subset;
    }
    Private.commonSubset = commonSubset;
    /**
     * Returns the list of raw item values currently in the DOM.
     */
    function itemValues(items) {
        const values = [];
        for (let i = 0, len = items.length; i < len; i++) {
            const attr = items[i].getAttribute('data-value');
            if (attr) {
                values.push(attr);
            }
        }
        return values;
    }
    Private.itemValues = itemValues;
    /**
     * Returns true for any modified click event (i.e., not a left-click).
     */
    function nonstandardClick(event) {
        return (event.button !== 0 ||
            event.altKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.metaKey);
    }
    Private.nonstandardClick = nonstandardClick;
})(Private || (Private = {}));
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29tcGxldGVyL2xpYi9jb25uZWN0b3IuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NvbXBsZXRlci9saWIvY29udGV4dGNvbm5lY3Rvci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29tcGxldGVyL2xpYi9kdW1teWNvbm5lY3Rvci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29tcGxldGVyL2xpYi9oYW5kbGVyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9jb21wbGV0ZXIvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9jb21wbGV0ZXIvbGliL2tlcm5lbGNvbm5lY3Rvci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29tcGxldGVyL2xpYi9tb2RlbC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29tcGxldGVyL2xpYi90b2tlbnMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NvbXBsZXRlci9saWIvd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNvRDtBQUNFO0FBQ0Y7QUFDcEQ7QUFDQTtBQUNBO0FBQ08sa0NBQWtDLDhEQUFhO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDZEQUFlO0FBQzFDLDRCQUE0QiwrREFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsSUFBSTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsNkNBQTZDLFlBQVksVUFBVTtBQUNuRTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0IscUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUVBO0FBQ0E7QUFDb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ08sK0JBQStCLDhEQUFhO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDBCQUEwQjtBQUMzQiw0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRUE7QUFDQTtBQUNvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sNkJBQTZCLDhEQUFhO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiQTtBQUNBO0FBQzZDO0FBQ1k7QUFDZDtBQUNPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDJEQUFjO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzRUFBdUI7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0JBQW9CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwRUFBdUI7QUFDOUM7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsUUFBUTtBQUNoRTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELFFBQVE7QUFDNUQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiwwRUFBdUI7QUFDMUMsaUJBQWlCLDBFQUF1QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHNEQUFPO0FBQ3ZDO0FBQ0EsS0FBSyw0REFBNEQ7QUFDakUsQ0FBQyw4Q0FBOEM7QUFDL0MsbUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBCO0FBQ1E7QUFDQztBQUNQO0FBQ0o7QUFDQztBQUNBO0FBQ3pCLGlDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2JBO0FBQ0E7QUFDb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ08sOEJBQThCLDhEQUFhO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVDQTtBQUNBO0FBQ2tFO0FBQ3RCO0FBQ0Q7QUFDM0M7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHFEQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0VBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGdFQUFpQjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrREFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGdFQUFpQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSx1REFBSTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwREFBTztBQUM5QjtBQUNBLFlBQVksZ0VBQWlCO0FBQzdCLFlBQVksZ0VBQWlCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCLGVBQWUsb0JBQW9CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxxQkFBcUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMEVBQTJCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixrRUFBbUI7QUFDaEQsMkRBQTJELFU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvR0FBb0c7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNEQUFHLHNCQUFzQiw0QkFBNEI7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDBFQUEyQjtBQUNyRDtBQUNBLCtCQUErQixrRUFBbUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGVBQWUsc0RBQUc7QUFDbEI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssSUFBSTtBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE1BQU07QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEJBQTBCO0FBQzNCLGlDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hmQTtBQUNBO0FBQzBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ08sK0JBQStCLG9EQUFLO0FBQzNDLGtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ2tFO0FBQ3RCO0FBQ0E7QUFDRTtBQUNIO0FBQ0Y7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyx3QkFBd0IsbURBQU07QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHNDQUFzQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixxREFBTTtBQUNuQyxzQ0FBc0MscURBQU07QUFDNUMsaUNBQWlDLHFEQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsYUFBYTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsV0FBVztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwwREFBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDBEQUFPO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxXQUFXO0FBQ2hFO0FBQ0EsaURBQWlELGFBQWE7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtFQUFpQztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0EscURBQXFELFdBQVc7QUFDaEU7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNFQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVDQUF1QztBQUM1RDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwR0FBMEcsZ0VBQWlCLFlBQVk7QUFDdkk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQywyRUFBeUI7QUFDM0Q7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixZQUFZO0FBQ25DO0FBQ0EsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxTQUFTO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0Isa0MiLCJmaWxlIjoicGFja2FnZXNfY29tcGxldGVyX2xpYl9pbmRleF9qcy5kNDNkNGI2ZmE3YTQwYTI4YTM4Ni5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IERhdGFDb25uZWN0b3IgfSBmcm9tICdAanVweXRlcmxhYi9zdGF0ZWRiJztcbmltcG9ydCB7IENvbnRleHRDb25uZWN0b3IgfSBmcm9tICcuL2NvbnRleHRjb25uZWN0b3InO1xuaW1wb3J0IHsgS2VybmVsQ29ubmVjdG9yIH0gZnJvbSAnLi9rZXJuZWxjb25uZWN0b3InO1xuLyoqXG4gKiBBIGNvbnRleHQra2VybmVsIGNvbm5lY3RvciBmb3IgY29tcGxldGlvbiBoYW5kbGVycy5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBsZXRpb25Db25uZWN0b3IgZXh0ZW5kcyBEYXRhQ29ubmVjdG9yIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgY29ubmVjdG9yIGZvciBjb21wbGV0aW9uIHJlcXVlc3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgaW5zdGFudGlhdGlvbiBvcHRpb25zIGZvciB0aGUgY29ubmVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fa2VybmVsID0gbmV3IEtlcm5lbENvbm5lY3RvcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IG5ldyBDb250ZXh0Q29ubmVjdG9yKG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGZXRjaCBjb21wbGV0aW9uIHJlcXVlc3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlcXVlc3QgLSBUaGUgY29tcGxldGlvbiByZXF1ZXN0IHRleHQgYW5kIGRldGFpbHMuXG4gICAgICovXG4gICAgZmV0Y2gocmVxdWVzdCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5fa2VybmVsLmZldGNoKHJlcXVlc3QpLFxuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5mZXRjaChyZXF1ZXN0KVxuICAgICAgICBdKS50aGVuKChba2VybmVsLCBjb250ZXh0XSkgPT4gUHJpdmF0ZS5tZXJnZVJlcGxpZXMoa2VybmVsLCBjb250ZXh0KSk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgcHJpdmF0ZSBmdW5jdGlvbmFsaXR5LlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIE1lcmdlIHJlc3VsdHMgZnJvbSBrZXJuZWwgYW5kIGNvbnRleHQgY29tcGxldGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2VybmVsIC0gVGhlIGtlcm5lbCByZXBseSBiZWluZyBtZXJnZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGV4dCAtIFRoZSBjb250ZXh0IHJlcGx5IGJlaW5nIG1lcmdlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcmVwbHkgd2l0aCBhIHN1cGVyc2V0IG9mIGtlcm5lbCBhbmQgY29udGV4dCBtYXRjaGVzLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBrZXJuZWwgYW5kIGNvbnRleHQgbWF0Y2hlcyBhcmUgbWVyZ2VkIHdpdGggYSBwcmVmZXJlbmNlIGZvciBrZXJuZWxcbiAgICAgKiByZXN1bHRzLiBCb3RoIGxpc3RzIGFyZSBrbm93biB0byBjb250YWluIHVuaXF1ZSwgbm9uLXJlcGVhdGluZyBpdGVtcztcbiAgICAgKiBzbyB0aGlzIGZ1bmN0aW9uIHJldHVybnMgYSBub24tcmVwZWF0aW5nIHN1cGVyc2V0IGJ5IGZpbHRlcmluZyBvdXRcbiAgICAgKiBkdXBsaWNhdGVzIGZyb20gdGhlIGNvbnRleHQgbGlzdCB0aGF0IGFwcGVhciBpbiB0aGUga2VybmVsIGxpc3QuXG4gICAgICovXG4gICAgZnVuY3Rpb24gbWVyZ2VSZXBsaWVzKGtlcm5lbCwgY29udGV4dCkge1xuICAgICAgICAvLyBJZiBvbmUgaXMgZW1wdHksIHJldHVybiB0aGUgb3RoZXIuXG4gICAgICAgIGlmIChrZXJuZWwubWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbnRleHQubWF0Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBrZXJuZWw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUG9wdWxhdGUgdGhlIHJlc3VsdCB3aXRoIGEgY29weSBvZiB0aGUga2VybmVsIG1hdGNoZXMuXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBrZXJuZWwubWF0Y2hlcy5zbGljZSgpO1xuICAgICAgICAvLyBDYWNoZSBhbGwgdGhlIGtlcm5lbCBtYXRjaGVzIGluIGEgbWVtby5cbiAgICAgICAgY29uc3QgbWVtbyA9IG1hdGNoZXMucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgICAgICAgICAgYWNjW3ZhbF0gPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30pO1xuICAgICAgICAvLyBBZGQgZWFjaCBjb250ZXh0IG1hdGNoIHRoYXQgaXMgbm90IGluIHRoZSBtZW1vIHRvIHRoZSByZXN1bHQuXG4gICAgICAgIGNvbnRleHQubWF0Y2hlcy5mb3JFYWNoKG1hdGNoID0+IHtcbiAgICAgICAgICAgIGlmICghKG1hdGNoIGluIG1lbW8pKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlcy5wdXNoKG1hdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGtlcm5lbCksIHsgbWF0Y2hlcyB9KTtcbiAgICB9XG4gICAgUHJpdmF0ZS5tZXJnZVJlcGxpZXMgPSBtZXJnZVJlcGxpZXM7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbm5lY3Rvci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBEYXRhQ29ubmVjdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc3RhdGVkYic7XG4vKipcbiAqIEEgY29udGV4dCBjb25uZWN0b3IgZm9yIGNvbXBsZXRpb24gaGFuZGxlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250ZXh0Q29ubmVjdG9yIGV4dGVuZHMgRGF0YUNvbm5lY3RvciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGNvbnRleHQgY29ubmVjdG9yIGZvciBjb21wbGV0aW9uIHJlcXVlc3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgaW5zdGFudGlhdGlvbiBvcHRpb25zIGZvciB0aGUgY29udGV4dCBjb25uZWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9lZGl0b3IgPSBvcHRpb25zLmVkaXRvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmV0Y2ggY29tcGxldGlvbiByZXF1ZXN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXF1ZXN0IC0gVGhlIGNvbXBsZXRpb24gcmVxdWVzdCB0ZXh0IGFuZCBkZXRhaWxzLlxuICAgICAqL1xuICAgIGZldGNoKHJlcXVlc3QpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnTm8gZWRpdG9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShQcml2YXRlLmNvbnRleHRIaW50KHRoaXMuX2VkaXRvcikpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBQcml2YXRlIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogR2V0IGEgbGlzdCBvZiBjb21wbGV0aW9uIGhpbnRzIGZyb20gYSB0b2tlbml6YXRpb25cbiAgICAgKiBvZiB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnRleHRIaW50KGVkaXRvcikge1xuICAgICAgICAvLyBGaW5kIHRoZSB0b2tlbiBhdCB0aGUgY3Vyc29yXG4gICAgICAgIGNvbnN0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICBjb25zdCB0b2tlbiA9IGVkaXRvci5nZXRUb2tlbkZvclBvc2l0aW9uKGN1cnNvcik7XG4gICAgICAgIC8vIEdldCB0aGUgbGlzdCBvZiBtYXRjaGluZyB0b2tlbnMuXG4gICAgICAgIGNvbnN0IHRva2VuTGlzdCA9IGdldENvbXBsZXRpb25Ub2tlbnModG9rZW4sIGVkaXRvcik7XG4gICAgICAgIC8vIE9ubHkgY2hvb3NlIHRoZSBvbmVzIHRoYXQgaGF2ZSBhIG5vbi1lbXB0eSB0eXBlXG4gICAgICAgIC8vIGZpZWxkLCB3aGljaCBhcmUgbGlrZWx5IHRvIGJlIG9mIGludGVyZXN0LlxuICAgICAgICBjb25zdCBjb21wbGV0aW9uTGlzdCA9IHRva2VuTGlzdC5maWx0ZXIodCA9PiB0LnR5cGUpLm1hcCh0ID0+IHQudmFsdWUpO1xuICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlIGNvbXBsZXRpb25zIGZyb20gdGhlIGxpc3RcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IEFycmF5LmZyb20obmV3IFNldChjb21wbGV0aW9uTGlzdCkpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHRva2VuLm9mZnNldCxcbiAgICAgICAgICAgIGVuZDogdG9rZW4ub2Zmc2V0ICsgdG9rZW4udmFsdWUubGVuZ3RoLFxuICAgICAgICAgICAgbWF0Y2hlcyxcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7fVxuICAgICAgICB9O1xuICAgIH1cbiAgICBQcml2YXRlLmNvbnRleHRIaW50ID0gY29udGV4dEhpbnQ7XG4gICAgLyoqXG4gICAgICogR2V0IGEgbGlzdCBvZiB0b2tlbnMgdGhhdCBtYXRjaCB0aGUgY29tcGxldGlvbiByZXF1ZXN0LFxuICAgICAqIGJ1dCBhcmUgbm90IGlkZW50aWNhbCB0byB0aGUgY29tcGxldGlvbiByZXF1ZXN0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldENvbXBsZXRpb25Ub2tlbnModG9rZW4sIGVkaXRvcikge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGVzID0gZWRpdG9yLmdldFRva2VucygpO1xuICAgICAgICAvLyBPbmx5IGdldCB0aGUgdG9rZW5zIHRoYXQgaGF2ZSBhIGNvbW1vbiBzdGFydCwgYnV0XG4gICAgICAgIC8vIGFyZSBub3QgaWRlbnRpY2FsLlxuICAgICAgICByZXR1cm4gY2FuZGlkYXRlcy5maWx0ZXIodCA9PiB0LnZhbHVlLmluZGV4T2YodG9rZW4udmFsdWUpID09PSAwICYmIHQudmFsdWUgIT09IHRva2VuLnZhbHVlKTtcbiAgICB9XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRleHRjb25uZWN0b3IuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgRGF0YUNvbm5lY3RvciB9IGZyb20gJ0BqdXB5dGVybGFiL3N0YXRlZGInO1xuLyoqXG4gKiBEdW1teUNvbm5lY3RvcidzIGZldGNoIG1ldGhvZCBhbHdheXMgcmV0dXJucyBhIHJlamVjdGVkIFByb21pc2UuXG4gKiBUaGlzIGNsYXNzIGlzIG9ubHkgaW5zdGFudGlhdGVkIGlmIGJvdGggQ29tcGxldGlvbkhhbmRsZXIuX2Nvbm5lY3RvciBhbmRcbiAqIENvbXBsZXRpb25IYW5kbGVyLl9mZXRjaEl0ZW1zIGFyZSB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBEdW1teUNvbm5lY3RvciBleHRlbmRzIERhdGFDb25uZWN0b3Ige1xuICAgIGZldGNoKF8pIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdBdHRlbXB0aW5nIHRvIGZldGNoIHdpdGggRHVtbXlDb25uZWN0b3IuIFBsZWFzZSBlbnN1cmUgY29ubmVjdG9yIHJlc3BvbnNlVHlwZSBpcyBzZXQuJyk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHVtbXljb25uZWN0b3IuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBNZXNzYWdlLCBNZXNzYWdlTG9vcCB9IGZyb20gJ0BsdW1pbm8vbWVzc2FnaW5nJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCB7IER1bW15Q29ubmVjdG9yIH0gZnJvbSAnLi9kdW1teWNvbm5lY3Rvcic7XG4vKipcbiAqIEEgY2xhc3MgYWRkZWQgdG8gZWRpdG9ycyB0aGF0IGNhbiBob3N0IGEgY29tcGxldGVyLlxuICovXG5jb25zdCBDT01QTEVURVJfRU5BQkxFRF9DTEFTUyA9ICdqcC1tb2QtY29tcGxldGVyLWVuYWJsZWQnO1xuLyoqXG4gKiBBIGNsYXNzIGFkZGVkIHRvIGVkaXRvcnMgdGhhdCBoYXZlIGFuIGFjdGl2ZSBjb21wbGV0ZXIuXG4gKi9cbmNvbnN0IENPTVBMRVRFUl9BQ1RJVkVfQ0xBU1MgPSAnanAtbW9kLWNvbXBsZXRlci1hY3RpdmUnO1xuLyoqXG4gKiBBIGNvbXBsZXRpb24gaGFuZGxlciBmb3IgZWRpdG9ycy5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBsZXRpb25IYW5kbGVyIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgY29tcGxldGlvbiBoYW5kbGVyIGZvciBhIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2VkaXRvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGVuZGluZyA9IDA7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZXIgPSBvcHRpb25zLmNvbXBsZXRlcjtcbiAgICAgICAgdGhpcy5jb21wbGV0ZXIuc2VsZWN0ZWQuY29ubmVjdCh0aGlzLm9uQ29tcGxldGlvblNlbGVjdGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5jb21wbGV0ZXIudmlzaWJpbGl0eUNoYW5nZWQuY29ubmVjdCh0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLl9jb25uZWN0b3IgPSBvcHRpb25zLmNvbm5lY3RvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGRhdGEgY29ubmVjdG9yIHVzZWQgdG8gcG9wdWxhdGUgY29tcGxldGlvbiByZXF1ZXN0cy5cbiAgICAgKiBAZGVwcmVjYXRlZCB3aWxsIGJlIHJlbW92ZWQsIG9yIHdpbGwgcmV0dXJuIGBDb21wbGV0aW9uSGFuZGxlci5JQ29tcGxldGlvbkl0ZW1zQ29ubmVjdG9yYFxuICAgICAqIGluc3RlYWQgb2YgYElEYXRhQ29ubmVjdG9yYCBpbiBmdXR1cmUgdmVyc2lvbnNcbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgb25seSBtZXRob2Qgb2YgdGhpcyBjb25uZWN0b3IgdGhhdCB3aWxsIGV2ZXIgYmUgY2FsbGVkIGlzIGBmZXRjaGAsIHNvXG4gICAgICogaXQgaXMgYWNjZXB0YWJsZSBmb3IgdGhlIG90aGVyIG1ldGhvZHMgdG8gYmUgc2ltcGxlIGZ1bmN0aW9ucyB0aGF0IHJldHVyblxuICAgICAqIHJlamVjdGVkIHByb21pc2VzLlxuICAgICAqL1xuICAgIGdldCBjb25uZWN0b3IoKSB7XG4gICAgICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB0aGlzLl9jb25uZWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRHVtbXlDb25uZWN0b3IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY29ubmVjdG9yO1xuICAgIH1cbiAgICBzZXQgY29ubmVjdG9yKGNvbm5lY3Rvcikge1xuICAgICAgICB0aGlzLl9jb25uZWN0b3IgPSBjb25uZWN0b3I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBlZGl0b3IgdXNlZCBieSB0aGUgY29tcGxldGlvbiBoYW5kbGVyLlxuICAgICAqL1xuICAgIGdldCBlZGl0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3I7XG4gICAgfVxuICAgIHNldCBlZGl0b3IobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0aGlzLl9lZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZWRpdG9yID0gdGhpcy5fZWRpdG9yO1xuICAgICAgICAvLyBDbGVhbiB1cCBhbmQgZGlzY29ubmVjdCBmcm9tIG9sZCBlZGl0b3IuXG4gICAgICAgIGlmIChlZGl0b3IgJiYgIWVkaXRvci5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IGVkaXRvci5tb2RlbDtcbiAgICAgICAgICAgIGVkaXRvci5ob3N0LmNsYXNzTGlzdC5yZW1vdmUoQ09NUExFVEVSX0VOQUJMRURfQ0xBU1MpO1xuICAgICAgICAgICAgZWRpdG9yLmhvc3QuY2xhc3NMaXN0LnJlbW92ZShDT01QTEVURVJfQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgICAgIG1vZGVsLnNlbGVjdGlvbnMuY2hhbmdlZC5kaXNjb25uZWN0KHRoaXMub25TZWxlY3Rpb25zQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICBtb2RlbC52YWx1ZS5jaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5vblRleHRDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZXNldCBjb21wbGV0ZXIgc3RhdGUuXG4gICAgICAgIHRoaXMuY29tcGxldGVyLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuY29tcGxldGVyLmVkaXRvciA9IG5ld1ZhbHVlO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIGVkaXRvciBhbmQgc2lnbmFsIGNvbm5lY3Rpb25zLlxuICAgICAgICBlZGl0b3IgPSB0aGlzLl9lZGl0b3IgPSBuZXdWYWx1ZTtcbiAgICAgICAgaWYgKGVkaXRvcikge1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSBlZGl0b3IubW9kZWw7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICBtb2RlbC5zZWxlY3Rpb25zLmNoYW5nZWQuY29ubmVjdCh0aGlzLm9uU2VsZWN0aW9uc0NoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgbW9kZWwudmFsdWUuY2hhbmdlZC5jb25uZWN0KHRoaXMub25UZXh0Q2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICAvLyBPbiBpbml0aWFsIGxvYWQsIG1hbnVhbGx5IGNoZWNrIHRoZSBjdXJzb3IgcG9zaXRpb24uXG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0aW9uc0NoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgd2hldGhlciB0aGUgY29tcGxldGlvbiBoYW5kbGVyIGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGhhbmRsZXIuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICBTaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZva2UgdGhlIGhhbmRsZXIgYW5kIGxhdW5jaCBhIGNvbXBsZXRlci5cbiAgICAgKi9cbiAgICBpbnZva2UoKSB7XG4gICAgICAgIE1lc3NhZ2VMb29wLnNlbmRNZXNzYWdlKHRoaXMsIENvbXBsZXRpb25IYW5kbGVyLk1zZy5JbnZva2VSZXF1ZXN0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvY2VzcyBhIG1lc3NhZ2Ugc2VudCB0byB0aGUgY29tcGxldGlvbiBoYW5kbGVyLlxuICAgICAqL1xuICAgIHByb2Nlc3NNZXNzYWdlKG1zZykge1xuICAgICAgICBzd2l0Y2ggKG1zZy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIENvbXBsZXRpb25IYW5kbGVyLk1zZy5JbnZva2VSZXF1ZXN0LnR5cGU6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkludm9rZVJlcXVlc3QobXNnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzdGF0ZSBvZiB0aGUgdGV4dCBlZGl0b3IgYXQgdGhlIGdpdmVuIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIGdldFN0YXRlKGVkaXRvciwgcG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRleHQ6IGVkaXRvci5tb2RlbC52YWx1ZS50ZXh0LFxuICAgICAgICAgICAgbGluZUhlaWdodDogZWRpdG9yLmxpbmVIZWlnaHQsXG4gICAgICAgICAgICBjaGFyV2lkdGg6IGVkaXRvci5jaGFyV2lkdGgsXG4gICAgICAgICAgICBsaW5lOiBwb3NpdGlvbi5saW5lLFxuICAgICAgICAgICAgY29sdW1uOiBwb3NpdGlvbi5jb2x1bW5cbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY29tcGxldGlvbiBzZWxlY3RlZCBzaWduYWwgZnJvbSB0aGUgY29tcGxldGlvbiB3aWRnZXQuXG4gICAgICovXG4gICAgb25Db21wbGV0aW9uU2VsZWN0ZWQoY29tcGxldGVyLCB2YWwpIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSBjb21wbGV0ZXIubW9kZWw7XG4gICAgICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuX2VkaXRvcjtcbiAgICAgICAgaWYgKCFlZGl0b3IgfHwgIW1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF0Y2ggPSBtb2RlbC5jcmVhdGVQYXRjaCh2YWwpO1xuICAgICAgICBpZiAoIXBhdGNoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kLCB2YWx1ZSB9ID0gcGF0Y2g7XG4gICAgICAgIGNvbnN0IGN1cnNvckJlZm9yZUNoYW5nZSA9IGVkaXRvci5nZXRPZmZzZXRBdChlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKSk7XG4gICAgICAgIC8vIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBzaGFyZWQgbW9kZWwgaW4gYSBzaW5nbGUgdHJhbnNhY3Rpb24gc28gdGhhdCB0aGUgdW5kbyBtYW5hZ2VyIHdvcmtzIGFzIGV4cGVjdGVkXG4gICAgICAgIGVkaXRvci5tb2RlbC5zaGFyZWRNb2RlbC51cGRhdGVTb3VyY2Uoc3RhcnQsIGVuZCwgdmFsdWUpO1xuICAgICAgICBpZiAoY3Vyc29yQmVmb3JlQ2hhbmdlIDw9IGVuZCAmJiBjdXJzb3JCZWZvcmVDaGFuZ2UgPj0gc3RhcnQpIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRDdXJzb3JQb3NpdGlvbihlZGl0b3IuZ2V0UG9zaXRpb25BdChzdGFydCArIHZhbHVlLmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgaW52b2tlLXJlcXVlc3RgIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIG9uSW52b2tlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gY29tcGxldGVyIG1vZGVsLCBiYWlsLlxuICAgICAgICBpZiAoIXRoaXMuY29tcGxldGVyLm1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgYSBjb21wbGV0ZXIgc2Vzc2lvbiBpcyBhbHJlYWR5IGFjdGl2ZSwgYmFpbC5cbiAgICAgICAgaWYgKHRoaXMuY29tcGxldGVyLm1vZGVsLm9yaWdpbmFsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZWRpdG9yID0gdGhpcy5fZWRpdG9yO1xuICAgICAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9tYWtlUmVxdWVzdChlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKSkuY2F0Y2gocmVhc29uID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0ludm9rZSByZXF1ZXN0IGJhaWxlZCcsIHJlYXNvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgc2VsZWN0aW9uIGNoYW5nZWQgc2lnbmFsIGZyb20gYW4gZWRpdG9yLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIElmIGEgc3ViLWNsYXNzIHJlaW1wbGVtZW50cyB0aGlzIG1ldGhvZCwgdGhlbiB0aGF0IGNsYXNzIG11c3QgZWl0aGVyIGNhbGxcbiAgICAgKiBpdHMgc3VwZXIgbWV0aG9kIG9yIGl0IG11c3QgdGFrZSByZXNwb25zaWJpbGl0eSBmb3IgYWRkaW5nIGFuZCByZW1vdmluZ1xuICAgICAqIHRoZSBjb21wbGV0ZXIgY29tcGxldGFibGUgY2xhc3MgdG8gdGhlIGVkaXRvciBob3N0IG5vZGUuXG4gICAgICpcbiAgICAgKiBEZXNwaXRlIHRoZSBmYWN0IHRoYXQgdGhlIGVkaXRvciB3aWRnZXQgYWRkcyBhIGNsYXNzIHdoZW5ldmVyIHRoZXJlIGlzIGFcbiAgICAgKiBwcmltYXJ5IHNlbGVjdGlvbiwgdGhpcyBtZXRob2QgY2hlY2tzIGluZGVwZW5kZW50bHkgZm9yIHR3byByZWFzb25zOlxuICAgICAqXG4gICAgICogMS4gVGhlIGVkaXRvciB3aWRnZXQgY29ubmVjdHMgdG8gdGhlIHNhbWUgc2lnbmFsIHRvIGFkZCB0aGF0IGNsYXNzLCBzb1xuICAgICAqICAgIHRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IHRoZSBjbGFzcyB3aWxsIGJlIGFkZGVkIGJlZm9yZSB0aGlzIG1ldGhvZFxuICAgICAqICAgIGlzIGludm9rZWQgc28gc2ltcGx5IGNoZWNraW5nIGZvciB0aGUgQ1NTIGNsYXNzJ3MgZXhpc3RlbmNlIGlzIG5vdCBhblxuICAgICAqICAgIG9wdGlvbi4gU2Vjb25kYXJpbHksIGNoZWNraW5nIHRoZSBlZGl0b3Igc3RhdGUgc2hvdWxkIGJlIGZhc3RlciB0aGFuXG4gICAgICogICAgcXVlcnlpbmcgdGhlIERPTSBpbiBlaXRoZXIgY2FzZS5cbiAgICAgKiAyLiBCZWNhdXNlIHRoaXMgbWV0aG9kIGFkZHMgYSBjbGFzcyB0aGF0IGluZGljYXRlcyB3aGV0aGVyIGNvbXBsZXRlclxuICAgICAqICAgIGZ1bmN0aW9uYWxpdHkgb3VnaHQgdG8gYmUgZW5hYmxlZCwgcmVseWluZyBvbiB0aGUgYmVoYXZpb3Igb2YgdGhlXG4gICAgICogICAgYGpwLW1vZC1oYXMtcHJpbWFyeS1zZWxlY3Rpb25gIHRvIGZpbHRlciBvdXQgYW55IGVkaXRvcnMgdGhhdCBoYXZlXG4gICAgICogICAgYSBzZWxlY3Rpb24gbWVhbnMgdGhlIHNlbWFudGljIG1lYW5pbmcgb2YgYGpwLW1vZC1jb21wbGV0ZXItZW5hYmxlZGBcbiAgICAgKiAgICBpcyBvYnNjdXJlZCBiZWNhdXNlIHRoZXJlIG1heSBiZSBjYXNlcyB3aGVyZSB0aGUgZW5hYmxlZCBjbGFzcyBpcyBhZGRlZFxuICAgICAqICAgIGV2ZW4gdGhvdWdoIHRoZSBjb21wbGV0ZXIgaXMgbm90IGF2YWlsYWJsZS5cbiAgICAgKi9cbiAgICBvblNlbGVjdGlvbnNDaGFuZ2VkKCkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMuY29tcGxldGVyLm1vZGVsO1xuICAgICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLl9lZGl0b3I7XG4gICAgICAgIGlmICghZWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaG9zdCA9IGVkaXRvci5ob3N0O1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBtb2RlbCwgcmV0dXJuLlxuICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICBob3N0LmNsYXNzTGlzdC5yZW1vdmUoQ09NUExFVEVSX0VOQUJMRURfQ0xBU1MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGFyZSBjdXJyZW50bHkgcGVyZm9ybWluZyBhIHN1YnNldCBtYXRjaCxcbiAgICAgICAgLy8gcmV0dXJuIHdpdGhvdXQgcmVzZXR0aW5nIHRoZSBjb21wbGV0ZXIuXG4gICAgICAgIGlmIChtb2RlbC5zdWJzZXRNYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIGNvbnN0IGxpbmUgPSBlZGl0b3IuZ2V0TGluZShwb3NpdGlvbi5saW5lKTtcbiAgICAgICAgaWYgKCFsaW5lKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICBtb2RlbC5yZXNldCh0cnVlKTtcbiAgICAgICAgICAgIGhvc3QuY2xhc3NMaXN0LnJlbW92ZShDT01QTEVURVJfRU5BQkxFRF9DTEFTUyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGEgdGV4dCBzZWxlY3Rpb24sIHJldHVybi5cbiAgICAgICAgaWYgKHN0YXJ0LmNvbHVtbiAhPT0gZW5kLmNvbHVtbiB8fCBzdGFydC5saW5lICE9PSBlbmQubGluZSkge1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbW9kZWwucmVzZXQodHJ1ZSk7XG4gICAgICAgICAgICBob3N0LmNsYXNzTGlzdC5yZW1vdmUoQ09NUExFVEVSX0VOQUJMRURfQ0xBU1MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBwYXJ0IG9mIHRoZSBsaW5lIGJlZm9yZSB0aGUgY3Vyc29yIGlzIHdoaXRlIHNwYWNlLCByZXR1cm4uXG4gICAgICAgIGlmIChsaW5lLnNsaWNlKDAsIHBvc2l0aW9uLmNvbHVtbikubWF0Y2goL15cXHMqJC8pKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICBtb2RlbC5yZXNldCh0cnVlKTtcbiAgICAgICAgICAgIGhvc3QuY2xhc3NMaXN0LnJlbW92ZShDT01QTEVURVJfRU5BQkxFRF9DTEFTUyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRW5hYmxlIGNvbXBsZXRpb24uXG4gICAgICAgIGlmICghdGhpcy5fZW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fZW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBob3N0LmNsYXNzTGlzdC5hZGQoQ09NUExFVEVSX0VOQUJMRURfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERpc3BhdGNoIHRoZSBjdXJzb3IgY2hhbmdlLlxuICAgICAgICBtb2RlbC5oYW5kbGVDdXJzb3JDaGFuZ2UodGhpcy5nZXRTdGF0ZShlZGl0b3IsIGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIHRleHQgY2hhbmdlZCBzaWduYWwgZnJvbSBhbiBlZGl0b3IuXG4gICAgICovXG4gICAgb25UZXh0Q2hhbmdlZCgpIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLmNvbXBsZXRlci5tb2RlbDtcbiAgICAgICAgaWYgKCFtb2RlbCB8fCAhdGhpcy5fZW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIGEgdGV4dCBzZWxlY3Rpb24sIG5vIGNvbXBsZXRpb24gaXMgYWxsb3dlZC5cbiAgICAgICAgY29uc3QgZWRpdG9yID0gdGhpcy5lZGl0b3I7XG4gICAgICAgIGlmICghZWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGlmIChzdGFydC5jb2x1bW4gIT09IGVuZC5jb2x1bW4gfHwgc3RhcnQubGluZSAhPT0gZW5kLmxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBEaXNwYXRjaCB0aGUgdGV4dCBjaGFuZ2UuXG4gICAgICAgIG1vZGVsLmhhbmRsZVRleHRDaGFuZ2UodGhpcy5nZXRTdGF0ZShlZGl0b3IsIGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIHZpc2liaWxpdHkgY2hhbmdlIHNpZ25hbCBmcm9tIGEgY29tcGxldGVyIHdpZGdldC5cbiAgICAgKi9cbiAgICBvblZpc2liaWxpdHlDaGFuZ2VkKGNvbXBsZXRlcikge1xuICAgICAgICAvLyBDb21wbGV0ZXIgaXMgbm90IGFjdGl2ZS5cbiAgICAgICAgaWYgKGNvbXBsZXRlci5pc0Rpc3Bvc2VkIHx8IGNvbXBsZXRlci5pc0hpZGRlbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRvci5ob3N0LmNsYXNzTGlzdC5yZW1vdmUoQ09NUExFVEVSX0FDVElWRV9DTEFTUyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29tcGxldGVyIGlzIGFjdGl2ZS5cbiAgICAgICAgaWYgKHRoaXMuX2VkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5fZWRpdG9yLmhvc3QuY2xhc3NMaXN0LmFkZChDT01QTEVURVJfQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlIGEgY29tcGxldGlvbiByZXF1ZXN0LlxuICAgICAqL1xuICAgIF9tYWtlUmVxdWVzdChwb3NpdGlvbikge1xuICAgICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmVkaXRvcjtcbiAgICAgICAgaWYgKCFlZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ05vIGFjdGl2ZSBlZGl0b3InKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGV4dCA9IGVkaXRvci5tb2RlbC52YWx1ZS50ZXh0O1xuICAgICAgICBjb25zdCBvZmZzZXQgPSBUZXh0LmpzSW5kZXhUb0NoYXJJbmRleChlZGl0b3IuZ2V0T2Zmc2V0QXQocG9zaXRpb24pLCB0ZXh0KTtcbiAgICAgICAgY29uc3QgcGVuZGluZyA9ICsrdGhpcy5fcGVuZGluZztcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKGVkaXRvciwgcG9zaXRpb24pO1xuICAgICAgICBjb25zdCByZXF1ZXN0ID0geyB0ZXh0LCBvZmZzZXQgfTtcbiAgICAgICAgaWYgKHRoaXMuX2lzSUNvbXBsZXRpb25JdGVtc0Nvbm5lY3Rvcih0aGlzLl9jb25uZWN0b3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29ubmVjdG9yXG4gICAgICAgICAgICAgICAgLmZldGNoKHJlcXVlc3QpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVwbHkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbGlkYXRlKHBlbmRpbmcsIHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIGlmICghcmVwbHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJlcXVlc3Q6ICR7cmVxdWVzdH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fb25GZXRjaEl0ZW1zUmVwbHkoc3RhdGUsIHJlcGx5KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKF8gPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uRmFpbHVyZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3RvclxuICAgICAgICAgICAgLmZldGNoKHJlcXVlc3QpXG4gICAgICAgICAgICAudGhlbihyZXBseSA9PiB7XG4gICAgICAgICAgICB0aGlzLl92YWxpZGF0ZShwZW5kaW5nLCByZXF1ZXN0KTtcbiAgICAgICAgICAgIGlmICghcmVwbHkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcmVxdWVzdDogJHtyZXF1ZXN0fWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fb25SZXBseShzdGF0ZSwgcmVwbHkpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKF8gPT4ge1xuICAgICAgICAgICAgdGhpcy5fb25GYWlsdXJlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfaXNJQ29tcGxldGlvbkl0ZW1zQ29ubmVjdG9yKGNvbm5lY3Rvcikge1xuICAgICAgICByZXR1cm4gKGNvbm5lY3RvclxuICAgICAgICAgICAgLnJlc3BvbnNlVHlwZSA9PT0gQ29tcGxldGlvbkhhbmRsZXIuSUNvbXBsZXRpb25JdGVtc1Jlc3BvbnNlVHlwZSk7XG4gICAgfVxuICAgIF92YWxpZGF0ZShwZW5kaW5nLCByZXF1ZXN0KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSGFuZGxlciBpcyBkaXNwb3NlZCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGEgbmV3ZXIgY29tcGxldGlvbiByZXF1ZXN0IGhhcyBjcmVhdGVkIGEgcGVuZGluZyByZXF1ZXN0LCBiYWlsLlxuICAgICAgICBpZiAocGVuZGluZyAhPT0gdGhpcy5fcGVuZGluZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIG5ld2VyIGNvbXBsZXRpb24gcmVxdWVzdCBpcyBwZW5kaW5nJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBtb2RlbCB3aXRoIHRleHQgc3RhdGUgYW5kIGN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uLlxuICAgICAqL1xuICAgIF91cGRhdGVNb2RlbChzdGF0ZSwgc3RhcnQsIGVuZCkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMuY29tcGxldGVyLm1vZGVsO1xuICAgICAgICBjb25zdCB0ZXh0ID0gc3RhdGUudGV4dDtcbiAgICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBvcmlnaW5hbCByZXF1ZXN0LlxuICAgICAgICBtb2RlbC5vcmlnaW5hbCA9IHN0YXRlO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIGN1cnNvci5cbiAgICAgICAgbW9kZWwuY3Vyc29yID0ge1xuICAgICAgICAgICAgc3RhcnQ6IFRleHQuY2hhckluZGV4VG9Kc0luZGV4KHN0YXJ0LCB0ZXh0KSxcbiAgICAgICAgICAgIGVuZDogVGV4dC5jaGFySW5kZXhUb0pzSW5kZXgoZW5kLCB0ZXh0KVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbW9kZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlY2VpdmUgYSBjb21wbGV0aW9uIHJlcGx5IGZyb20gdGhlIGNvbm5lY3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdGF0ZSAtIFRoZSBzdGF0ZSBvZiB0aGUgZWRpdG9yIHdoZW4gY29tcGxldGlvbiByZXF1ZXN0IHdhcyBtYWRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlcGx5IC0gVGhlIEFQSSByZXNwb25zZSByZXR1cm5lZCBmb3IgYSBjb21wbGV0aW9uIHJlcXVlc3QuXG4gICAgICovXG4gICAgX29uUmVwbHkoc3RhdGUsIHJlcGx5KSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5fdXBkYXRlTW9kZWwoc3RhdGUsIHJlcGx5LnN0YXJ0LCByZXBseS5lbmQpO1xuICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGVkdXBlIHRoZSBtYXRjaGVzLlxuICAgICAgICBjb25zdCBtYXRjaGVzID0gW107XG4gICAgICAgIGNvbnN0IG1hdGNoU2V0ID0gbmV3IFNldChyZXBseS5tYXRjaGVzIHx8IFtdKTtcbiAgICAgICAgaWYgKHJlcGx5Lm1hdGNoZXMpIHtcbiAgICAgICAgICAgIG1hdGNoU2V0LmZvckVhY2gobWF0Y2ggPT4ge1xuICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChtYXRjaCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBFeHRyYWN0IHRoZSBvcHRpb25hbCB0eXBlIG1hcC4gVGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gdXNlc1xuICAgICAgICAvLyBfanVweXRlcl90eXBlc19leHBlcmltZW50YWwgd2hpY2ggcHJvdmlkZSBzdHJpbmcgdHlwZSBuYW1lcy4gV2UgbWFrZSBub1xuICAgICAgICAvLyBhc3N1bXB0aW9ucyBhYm91dCB0aGUgbmFtZXMgb2YgdGhlIHR5cGVzLCBzbyBvdGhlciBrZXJuZWxzIGNhbiBwcm92aWRlXG4gICAgICAgIC8vIHRoZWlyIG93biB0eXBlcy5cbiAgICAgICAgLy8gRXZlbiB0aG91Z2ggdGhlIGBtZXRhZGF0YWAgZmllbGQgaXMgcmVxdWlyZWQsIGl0IGhhcyBoaXN0b3JpY2FsbHkgbm90XG4gICAgICAgIC8vIGJlZW4gdXNlZC4gRGVmZW5zaXZlbHkgY2hlY2sgaWYgaXQgZXhpc3RzLlxuICAgICAgICBjb25zdCBtZXRhZGF0YSA9IHJlcGx5Lm1ldGFkYXRhIHx8IHt9O1xuICAgICAgICBjb25zdCB0eXBlcyA9IG1ldGFkYXRhLl9qdXB5dGVyX3R5cGVzX2V4cGVyaW1lbnRhbDtcbiAgICAgICAgY29uc3QgdHlwZU1hcCA9IHt9O1xuICAgICAgICBpZiAodHlwZXMpIHtcbiAgICAgICAgICAgIHR5cGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAvLyBGb3Igc29tZSByZWFzb24gdGhlIF9qdXB5dGVyX3R5cGVzX2V4cGVyaW1lbnRhbCBsaXN0IGhhcyB0d28gZW50cmllc1xuICAgICAgICAgICAgICAgIC8vIGZvciBlYWNoIG1hdGNoLCB3aXRoIG9uZSBoYXZpbmcgYSB0eXBlIG9mIFwiPHVua25vd24+XCIuIERpc2NhcmQgdGhvc2VcbiAgICAgICAgICAgICAgICAvLyBhbmQgdXNlIHVuZGVmaW5lZCB0byBpbmRpY2F0ZSBhbiB1bmtub3duIHR5cGUuXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IGl0ZW0udGV4dDtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gaXRlbS50eXBlO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaFNldC5oYXModGV4dCkgJiYgdHlwZSAhPT0gJzx1bmtub3duPicpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZU1hcFt0ZXh0XSA9IHR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBvcHRpb25zLCBpbmNsdWRpbmcgdGhlIHR5cGUgbWFwLlxuICAgICAgICBtb2RlbC5zZXRPcHRpb25zKG1hdGNoZXMsIHR5cGVNYXApO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWNlaXZlIGNvbXBsZXRpb24gaXRlbXMgZnJvbSBwcm92aWRlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdGF0ZSAtIFRoZSBzdGF0ZSBvZiB0aGUgZWRpdG9yIHdoZW4gY29tcGxldGlvbiByZXF1ZXN0IHdhcyBtYWRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlcGx5IC0gVGhlIEFQSSByZXNwb25zZSByZXR1cm5lZCBmb3IgYSBjb21wbGV0aW9uIHJlcXVlc3QuXG4gICAgICovXG4gICAgX29uRmV0Y2hJdGVtc1JlcGx5KHN0YXRlLCByZXBseSkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMuX3VwZGF0ZU1vZGVsKHN0YXRlLCByZXBseS5zdGFydCwgcmVwbHkuZW5kKTtcbiAgICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtb2RlbC5zZXRDb21wbGV0aW9uSXRlbXMpIHtcbiAgICAgICAgICAgIG1vZGVsLnNldENvbXBsZXRpb25JdGVtcyhyZXBseS5pdGVtcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgY29tcGxldGlvbiByZXF1ZXN0IGZhaWxzLCByZXNldCBtb2RlbCBhbmQgZmFpbCBzaWxlbnRseS5cbiAgICAgKi9cbiAgICBfb25GYWlsdXJlKCkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMuY29tcGxldGVyLm1vZGVsO1xuICAgICAgICBpZiAobW9kZWwpIHtcbiAgICAgICAgICAgIG1vZGVsLnJlc2V0KHRydWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgY2VsbCBjb21wbGV0aW9uIGhhbmRsZXIgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChDb21wbGV0aW9uSGFuZGxlcikge1xuICAgIENvbXBsZXRpb25IYW5kbGVyLklDb21wbGV0aW9uSXRlbXNSZXNwb25zZVR5cGUgPSAnSUNvbXBsZXRpb25JdGVtc1JlcGx5JztcbiAgICAvKipcbiAgICAgKiBBIG5hbWVzcGFjZSBmb3IgY29tcGxldGlvbiBoYW5kbGVyIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIGxldCBNc2c7XG4gICAgKGZ1bmN0aW9uIChNc2cpIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUgKi9cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgc2luZ2xldG9uIGAnaW52b2tlLXJlcXVlc3QnYCBtZXNzYWdlLlxuICAgICAgICAgKi9cbiAgICAgICAgTXNnLkludm9rZVJlcXVlc3QgPSBuZXcgTWVzc2FnZSgnaW52b2tlLXJlcXVlc3QnKTtcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZSAqL1xuICAgIH0pKE1zZyA9IENvbXBsZXRpb25IYW5kbGVyLk1zZyB8fCAoQ29tcGxldGlvbkhhbmRsZXIuTXNnID0ge30pKTtcbn0pKENvbXBsZXRpb25IYW5kbGVyIHx8IChDb21wbGV0aW9uSGFuZGxlciA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oYW5kbGVyLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGNvbXBsZXRlclxuICovXG5leHBvcnQgKiBmcm9tICcuL2hhbmRsZXInO1xuZXhwb3J0ICogZnJvbSAnLi9rZXJuZWxjb25uZWN0b3InO1xuZXhwb3J0ICogZnJvbSAnLi9jb250ZXh0Y29ubmVjdG9yJztcbmV4cG9ydCAqIGZyb20gJy4vY29ubmVjdG9yJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi93aWRnZXQnO1xuZXhwb3J0ICogZnJvbSAnLi90b2tlbnMnO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgRGF0YUNvbm5lY3RvciB9IGZyb20gJ0BqdXB5dGVybGFiL3N0YXRlZGInO1xuLyoqXG4gKiBBIGtlcm5lbCBjb25uZWN0b3IgZm9yIGNvbXBsZXRpb24gaGFuZGxlcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBLZXJuZWxDb25uZWN0b3IgZXh0ZW5kcyBEYXRhQ29ubmVjdG9yIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcga2VybmVsIGNvbm5lY3RvciBmb3IgY29tcGxldGlvbiByZXF1ZXN0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGluc3RhbnRpYXRpb24gb3B0aW9ucyBmb3IgdGhlIGtlcm5lbCBjb25uZWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9zZXNzaW9uID0gb3B0aW9ucy5zZXNzaW9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGZXRjaCBjb21wbGV0aW9uIHJlcXVlc3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlcXVlc3QgLSBUaGUgY29tcGxldGlvbiByZXF1ZXN0IHRleHQgYW5kIGRldGFpbHMuXG4gICAgICovXG4gICAgYXN5bmMgZmV0Y2gocmVxdWVzdCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGtlcm5lbCA9IChfYSA9IHRoaXMuX3Nlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5rZXJuZWw7XG4gICAgICAgIGlmICgha2VybmVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGtlcm5lbCBmb3IgY29tcGxldGlvbiByZXF1ZXN0LicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0ge1xuICAgICAgICAgICAgY29kZTogcmVxdWVzdC50ZXh0LFxuICAgICAgICAgICAgY3Vyc29yX3BvczogcmVxdWVzdC5vZmZzZXRcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgbXNnID0gYXdhaXQga2VybmVsLnJlcXVlc3RDb21wbGV0ZShjb250ZW50cyk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gbXNnLmNvbnRlbnQ7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09ICdvaycpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29tcGxldGlvbiBmZXRjaCBmYWlsZWQgdG8gcmV0dXJuIHN1Y2Nlc3NmdWxseS4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3RhcnQ6IHJlc3BvbnNlLmN1cnNvcl9zdGFydCxcbiAgICAgICAgICAgIGVuZDogcmVzcG9uc2UuY3Vyc29yX2VuZCxcbiAgICAgICAgICAgIG1hdGNoZXM6IHJlc3BvbnNlLm1hdGNoZXMsXG4gICAgICAgICAgICBtZXRhZGF0YTogcmVzcG9uc2UubWV0YWRhdGFcbiAgICAgICAgfTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXJuZWxjb25uZWN0b3IuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgaXRlciwgbWFwLCBTdHJpbmdFeHQsIHRvQXJyYXkgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBKU09ORXh0IH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBhIGNvbXBsZXRlciBtb2RlbC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBsZXRlck1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2N1cnNvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29tcGxldGlvbkl0ZW1zID0gW107XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9xdWVyeSA9ICcnO1xuICAgICAgICB0aGlzLl9zdWJzZXRNYXRjaCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl90eXBlTWFwID0ge307XG4gICAgICAgIHRoaXMuX29yZGVyZWRUeXBlcyA9IFtdO1xuICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gc3RhdGUgb2YgdGhlIGNvbXBsZXRlciBtZW51IGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IHN0YXRlQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIG9yaWdpbmFsIGNvbXBsZXRpb24gcmVxdWVzdCBkZXRhaWxzLlxuICAgICAqL1xuICAgIGdldCBvcmlnaW5hbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yaWdpbmFsO1xuICAgIH1cbiAgICBzZXQgb3JpZ2luYWwobmV3VmFsdWUpIHtcbiAgICAgICAgY29uc3QgdW5jaGFuZ2VkID0gdGhpcy5fb3JpZ2luYWwgPT09IG5ld1ZhbHVlIHx8XG4gICAgICAgICAgICAodGhpcy5fb3JpZ2luYWwgJiZcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSAmJlxuICAgICAgICAgICAgICAgIEpTT05FeHQuZGVlcEVxdWFsKG5ld1ZhbHVlLCB0aGlzLl9vcmlnaW5hbCkpO1xuICAgICAgICBpZiAodW5jaGFuZ2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVzZXQoKTtcbiAgICAgICAgLy8gU2V0IGJvdGggdGhlIGN1cnJlbnQgYW5kIG9yaWdpbmFsIHRvIHRoZSBzYW1lIHZhbHVlIHdoZW4gb3JpZ2luYWwgaXMgc2V0LlxuICAgICAgICB0aGlzLl9jdXJyZW50ID0gdGhpcy5fb3JpZ2luYWwgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VkLmVtaXQodW5kZWZpbmVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgdGV4dCBjaGFuZ2UgZGV0YWlscy5cbiAgICAgKi9cbiAgICBnZXQgY3VycmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnQ7XG4gICAgfVxuICAgIHNldCBjdXJyZW50KG5ld1ZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHVuY2hhbmdlZCA9IHRoaXMuX2N1cnJlbnQgPT09IG5ld1ZhbHVlIHx8XG4gICAgICAgICAgICAodGhpcy5fY3VycmVudCAmJiBuZXdWYWx1ZSAmJiBKU09ORXh0LmRlZXBFcXVhbChuZXdWYWx1ZSwgdGhpcy5fY3VycmVudCkpO1xuICAgICAgICBpZiAodW5jaGFuZ2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3JpZ2luYWwgPSB0aGlzLl9vcmlnaW5hbDtcbiAgICAgICAgLy8gT3JpZ2luYWwgcmVxdWVzdCBtdXN0IGFsd2F5cyBiZSBzZXQgYmVmb3JlIGEgdGV4dCBjaGFuZ2UuIElmIGl0IGlzbid0XG4gICAgICAgIC8vIHRoZSBtb2RlbCBmYWlscyBzaWxlbnRseS5cbiAgICAgICAgaWYgKCFvcmlnaW5hbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHRoaXMuX2N1cnNvcjtcbiAgICAgICAgLy8gQ3Vyc29yIG11c3QgYWx3YXlzIGJlIHNldCBiZWZvcmUgYSB0ZXh0IGNoYW5nZS4gVGhpcyBoYXBwZW5zXG4gICAgICAgIC8vIGF1dG9tYXRpY2FsbHkgaW4gdGhlIGNvbXBsZXRlciBoYW5kbGVyLCBidXQgc2luY2UgYGN1cnJlbnRgIGlzIGEgcHVibGljXG4gICAgICAgIC8vIGF0dHJpYnV0ZSwgdGhpcyBkZWZlbnNpdmUgY2hlY2sgaXMgbmVjZXNzYXJ5LlxuICAgICAgICBpZiAoIWN1cnNvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSAodGhpcy5fY3VycmVudCA9IG5ld1ZhbHVlKTtcbiAgICAgICAgaWYgKCFjdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsTGluZSA9IG9yaWdpbmFsLnRleHQuc3BsaXQoJ1xcbicpW29yaWdpbmFsLmxpbmVdO1xuICAgICAgICBjb25zdCBjdXJyZW50TGluZSA9IGN1cnJlbnQudGV4dC5zcGxpdCgnXFxuJylbY3VycmVudC5saW5lXTtcbiAgICAgICAgLy8gSWYgdGhlIHRleHQgY2hhbmdlIG1lYW5zIHRoYXQgdGhlIG9yaWdpbmFsIHN0YXJ0IHBvaW50IGhhcyBiZWVuIHByZWNlZGVkLFxuICAgICAgICAvLyB0aGVuIHRoZSBjb21wbGV0aW9uIGlzIG5vIGxvbmdlciB2YWxpZCBhbmQgc2hvdWxkIGJlIHJlc2V0LlxuICAgICAgICBpZiAoIXRoaXMuX3N1YnNldE1hdGNoICYmIGN1cnJlbnRMaW5lLmxlbmd0aCA8IG9yaWdpbmFsTGluZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSBjdXJzb3I7XG4gICAgICAgIC8vIENsaXAgdGhlIGZyb250IG9mIHRoZSBjdXJyZW50IGxpbmUuXG4gICAgICAgIGxldCBxdWVyeSA9IGN1cnJlbnQudGV4dC5zdWJzdHJpbmcoc3RhcnQpO1xuICAgICAgICAvLyBDbGlwIHRoZSBiYWNrIG9mIHRoZSBjdXJyZW50IGxpbmUgYnkgY2FsY3VsYXRpbmcgdGhlIGVuZCBvZiB0aGUgb3JpZ2luYWwuXG4gICAgICAgIGNvbnN0IGVuZGluZyA9IG9yaWdpbmFsLnRleHQuc3Vic3RyaW5nKGVuZCk7XG4gICAgICAgIHF1ZXJ5ID0gcXVlcnkuc3Vic3RyaW5nKDAsIHF1ZXJ5Lmxhc3RJbmRleE9mKGVuZGluZykpO1xuICAgICAgICB0aGlzLl9xdWVyeSA9IHF1ZXJ5O1xuICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3Vyc29yIGRldGFpbHMgdGhhdCB0aGUgQVBJIGhhcyB1c2VkIHRvIHJldHVybiBtYXRjaGluZyBvcHRpb25zLlxuICAgICAqL1xuICAgIGdldCBjdXJzb3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3I7XG4gICAgfVxuICAgIHNldCBjdXJzb3IobmV3VmFsdWUpIHtcbiAgICAgICAgLy8gT3JpZ2luYWwgcmVxdWVzdCBtdXN0IGFsd2F5cyBiZSBzZXQgYmVmb3JlIGEgY3Vyc29yIGNoYW5nZS4gSWYgaXQgaXNuJ3RcbiAgICAgICAgLy8gdGhlIG1vZGVsIGZhaWxzIHNpbGVudGx5LlxuICAgICAgICBpZiAoIXRoaXMub3JpZ2luYWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJzb3IgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHF1ZXJ5IGFnYWluc3Qgd2hpY2ggaXRlbXMgYXJlIGZpbHRlcmVkLlxuICAgICAqL1xuICAgIGdldCBxdWVyeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1ZXJ5O1xuICAgIH1cbiAgICBzZXQgcXVlcnkobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcXVlcnkgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBmbGFnIHRoYXQgaXMgdHJ1ZSB3aGVuIHRoZSBtb2RlbCB2YWx1ZSB3YXMgbW9kaWZpZWQgYnkgYSBzdWJzZXQgbWF0Y2guXG4gICAgICovXG4gICAgZ2V0IHN1YnNldE1hdGNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2V0TWF0Y2g7XG4gICAgfVxuICAgIHNldCBzdWJzZXRNYXRjaChuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLl9zdWJzZXRNYXRjaCA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgd2hldGhlciB0aGUgbW9kZWwgaXMgZGlzcG9zZWQuXG4gICAgICovXG4gICAgZ2V0IGlzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgbW9kZWwuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBhbHJlYWR5IGRpc3Bvc2VkLlxuICAgICAgICBpZiAodGhpcy5faXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICBTaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbGlzdCBvZiB2aXNpYmxlIGl0ZW1zIGluIHRoZSBjb21wbGV0ZXIgbWVudS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGlzIGEgcmVhZC1vbmx5IHByb3BlcnR5LlxuICAgICAqL1xuICAgIGNvbXBsZXRpb25JdGVtcygpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5fcXVlcnk7XG4gICAgICAgIGlmIChxdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcmt1cChxdWVyeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBsZXRpb25JdGVtcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsaXN0IG9mIHZpc2libGUgaXRlbXMgaW4gdGhlIGNvbXBsZXRlciBtZW51LCBhbmQgYXBwZW5kIGFueVxuICAgICAqIG5ldyB0eXBlcyB0byBLTk9XTl9UWVBFUy5cbiAgICAgKi9cbiAgICBzZXRDb21wbGV0aW9uSXRlbXMobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKEpTT05FeHQuZGVlcEVxdWFsKG5ld1ZhbHVlLCB0aGlzLl9jb21wbGV0aW9uSXRlbXMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29tcGxldGlvbkl0ZW1zID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMuX29yZGVyZWRUeXBlcyA9IFByaXZhdGUuZmluZE9yZGVyZWRDb21wbGV0aW9uSXRlbVR5cGVzKHRoaXMuX2NvbXBsZXRpb25JdGVtcyk7XG4gICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlZC5lbWl0KHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBsaXN0IG9mIHZpc2libGUgaXRlbXMgaW4gdGhlIGNvbXBsZXRlciBtZW51LlxuICAgICAqIEBkZXByZWNhdGVkIHVzZSBgY29tcGxldGlvbkl0ZW1zYCBpbnN0ZWFkXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBhIHJlYWQtb25seSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBpdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbHRlcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgdW5maWx0ZXJlZCBsaXN0IG9mIGFsbCBhdmFpbGFibGUgb3B0aW9ucyBpbiBhIGNvbXBsZXRlciBtZW51LlxuICAgICAqL1xuICAgIG9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBpdGVyKHRoaXMuX29wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbWFwIGZyb20gaWRlbnRpZmllcnMgKGEuYikgdG8gdHlwZXMgKGZ1bmN0aW9uLCBtb2R1bGUsIGNsYXNzLCBpbnN0YW5jZSxcbiAgICAgKiBldGMuKS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBBIHR5cGUgbWFwIGlzIGN1cnJlbnRseSBvbmx5IHByb3ZpZGVkIGJ5IHRoZSBsYXRlc3QgSVB5dGhvbiBrZXJuZWwgdXNpbmdcbiAgICAgKiB0aGUgY29tcGxldGVyIHJlcGx5IG1ldGFkYXRhIGZpZWxkIGBfanVweXRlcl90eXBlc19leHBlcmltZW50YWxgLiBUaGVcbiAgICAgKiB2YWx1ZXMgYXJlIGNvbXBsZXRlbHkgdXAgdG8gdGhlIGtlcm5lbC5cbiAgICAgKlxuICAgICAqL1xuICAgIHR5cGVNYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlTWFwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbiBvcmRlcmVkIGxpc3Qgb2YgYWxsIHRoZSBrbm93biB0eXBlcyBpbiB0aGUgdHlwZU1hcC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUbyB2aXN1YWxseSBlbmNvZGUgdGhlIHR5cGVzIG9mIHRoZSBjb21wbGV0ZXIgbWF0Y2hlcywgd2UgYXNzZW1ibGUgYW5cbiAgICAgKiBvcmRlcmVkIGxpc3QuIFRoaXMgbGlzdCBiZWdpbnMgd2l0aDpcbiAgICAgKiBgYGBcbiAgICAgKiBbJ2Z1bmN0aW9uJywgJ2luc3RhbmNlJywgJ2NsYXNzJywgJ21vZHVsZScsICdrZXl3b3JkJ11cbiAgICAgKiBgYGBcbiAgICAgKiBhbmQgdGhlbiBoYXMgYW55IHJlbWFpbmluZyB0eXBlcyBsaXN0ZWQgYWxwaGFiZXRpY2FsbHkuIFRoaXMgd2lsbCBnaXZlXG4gICAgICogcmVsaWFibGUgdmlzdWFsIGVuY29kaW5nIGZvciB0aGVzZSBrbm93biB0eXBlcywgYnV0IGFsbG93IGtlcm5lbHMgdG9cbiAgICAgKiBwcm92aWRlIG5ldyB0eXBlcy5cbiAgICAgKi9cbiAgICBvcmRlcmVkVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcmRlcmVkVHlwZXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgYXZhaWxhYmxlIG9wdGlvbnMgaW4gdGhlIGNvbXBsZXRlciBtZW51LlxuICAgICAqL1xuICAgIHNldE9wdGlvbnMobmV3VmFsdWUsIHR5cGVNYXApIHtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gdG9BcnJheShuZXdWYWx1ZSB8fCBbXSk7XG4gICAgICAgIGNvbnN0IHR5cGVzID0gdHlwZU1hcCB8fCB7fTtcbiAgICAgICAgaWYgKEpTT05FeHQuZGVlcEVxdWFsKHZhbHVlcywgdGhpcy5fb3B0aW9ucykgJiZcbiAgICAgICAgICAgIEpTT05FeHQuZGVlcEVxdWFsKHR5cGVzLCB0aGlzLl90eXBlTWFwKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gdmFsdWVzO1xuICAgICAgICAgICAgdGhpcy5fdHlwZU1hcCA9IHR5cGVzO1xuICAgICAgICAgICAgdGhpcy5fb3JkZXJlZFR5cGVzID0gUHJpdmF0ZS5maW5kT3JkZXJlZFR5cGVzKHR5cGVzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX3R5cGVNYXAgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuX29yZGVyZWRUeXBlcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0YXRlQ2hhbmdlZC5lbWl0KHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGN1cnNvciBjaGFuZ2UuXG4gICAgICovXG4gICAgaGFuZGxlQ3Vyc29yQ2hhbmdlKGNoYW5nZSkge1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBhY3RpdmUgY29tcGxldGlvbiwgcmV0dXJuLlxuICAgICAgICBpZiAoIXRoaXMuX29yaWdpbmFsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBjb2x1bW4sIGxpbmUgfSA9IGNoYW5nZTtcbiAgICAgICAgY29uc3QgeyBjdXJyZW50LCBvcmlnaW5hbCB9ID0gdGhpcztcbiAgICAgICAgaWYgKCFvcmlnaW5hbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGEgY3Vyc29yIGNoYW5nZSByZXN1bHRzIGluIGEgdGhlIGN1cnNvciBiZWluZyBvbiBhIGRpZmZlcmVudCBsaW5lXG4gICAgICAgIC8vIHRoYW4gdGhlIG9yaWdpbmFsIHJlcXVlc3QsIGNhbmNlbC5cbiAgICAgICAgaWYgKGxpbmUgIT09IG9yaWdpbmFsLmxpbmUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgYSBjdXJzb3IgY2hhbmdlIHJlc3VsdHMgaW4gdGhlIGN1cnNvciBiZWluZyBzZXQgdG8gYSBwb3NpdGlvbiB0aGF0XG4gICAgICAgIC8vIHByZWNlZGVzIHRoZSBvcmlnaW5hbCBjb2x1bW4sIGNhbmNlbC5cbiAgICAgICAgaWYgKGNvbHVtbiA8IG9yaWdpbmFsLmNvbHVtbikge1xuICAgICAgICAgICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGN1cnNvciB9ID0gdGhpcztcbiAgICAgICAgaWYgKCFjdXJzb3IgfHwgIWN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBhIGN1cnNvciBjaGFuZ2UgcmVzdWx0cyBpbiB0aGUgY3Vyc29yIGJlaW5nIHNldCB0byBhIHBvc2l0aW9uIGJleW9uZFxuICAgICAgICAvLyB0aGUgZW5kIG9mIHRoZSBhcmVhIHRoYXQgd291bGQgYmUgYWZmZWN0ZWQgYnkgY29tcGxldGlvbiwgY2FuY2VsLlxuICAgICAgICBjb25zdCBjdXJzb3JEZWx0YSA9IGN1cnNvci5lbmQgLSBjdXJzb3Iuc3RhcnQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsTGluZSA9IG9yaWdpbmFsLnRleHQuc3BsaXQoJ1xcbicpW29yaWdpbmFsLmxpbmVdO1xuICAgICAgICBjb25zdCBjdXJyZW50TGluZSA9IGN1cnJlbnQudGV4dC5zcGxpdCgnXFxuJylbY3VycmVudC5saW5lXTtcbiAgICAgICAgY29uc3QgaW5wdXREZWx0YSA9IGN1cnJlbnRMaW5lLmxlbmd0aCAtIG9yaWdpbmFsTGluZS5sZW5ndGg7XG4gICAgICAgIGlmIChjb2x1bW4gPiBvcmlnaW5hbC5jb2x1bW4gKyBjdXJzb3JEZWx0YSArIGlucHV0RGVsdGEpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgdGV4dCBjaGFuZ2UuXG4gICAgICovXG4gICAgaGFuZGxlVGV4dENoYW5nZShjaGFuZ2UpIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWwgPSB0aGlzLl9vcmlnaW5hbDtcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gYWN0aXZlIGNvbXBsZXRpb24sIHJldHVybi5cbiAgICAgICAgaWYgKCFvcmlnaW5hbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgdGV4dCwgY29sdW1uLCBsaW5lIH0gPSBjaGFuZ2U7XG4gICAgICAgIGNvbnN0IGxhc3QgPSB0ZXh0LnNwbGl0KCdcXG4nKVtsaW5lXVtjb2x1bW4gLSAxXTtcbiAgICAgICAgLy8gSWYgbGFzdCBjaGFyYWN0ZXIgZW50ZXJlZCBpcyBub3Qgd2hpdGVzcGFjZSBvciBpZiB0aGUgY2hhbmdlIGNvbHVtbiBpc1xuICAgICAgICAvLyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gdGhlIG9yaWdpbmFsIGNvbHVtbiwgdXBkYXRlIGNvbXBsZXRpb24uXG4gICAgICAgIGlmICgobGFzdCAmJiBsYXN0Lm1hdGNoKC9cXFMvKSkgfHwgY2hhbmdlLmNvbHVtbiA+PSBvcmlnaW5hbC5jb2x1bW4pIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IGNoYW5nZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBmaW5hbCBjaGFyYWN0ZXIgaXMgd2hpdGVzcGFjZSwgcmVzZXQgY29tcGxldGlvbi5cbiAgICAgICAgdGhpcy5yZXNldChmYWxzZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHJlc29sdmVkIHBhdGNoIGJldHdlZW4gdGhlIG9yaWdpbmFsIHN0YXRlIGFuZCBhIHBhdGNoIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRjaCAtIFRoZSBwYXRjaCBzdHJpbmcgdG8gYXBwbHkgdG8gdGhlIG9yaWdpbmFsIHZhbHVlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwYXRjaGVkIHRleHQgY2hhbmdlIG9yIHVuZGVmaW5lZCBpZiBvcmlnaW5hbCB2YWx1ZSBkaWQgbm90IGV4aXN0LlxuICAgICAqL1xuICAgIGNyZWF0ZVBhdGNoKHBhdGNoKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsID0gdGhpcy5fb3JpZ2luYWw7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHRoaXMuX2N1cnNvcjtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHRoaXMuX2N1cnJlbnQ7XG4gICAgICAgIGlmICghb3JpZ2luYWwgfHwgIWN1cnNvciB8fCAhY3VycmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgeyBzdGFydCwgZW5kIH0gPSBjdXJzb3I7XG4gICAgICAgIC8vIEFsc28gaW5jbHVkZSBhbnkgZmlsdGVyaW5nL2FkZGl0aW9uYWwtdHlwaW5nIHRoYXQgaGFzIG9jY3VycmVkXG4gICAgICAgIC8vIHNpbmNlIHRoZSBjb21wbGV0aW9uIHJlcXVlc3QgaW4gdGhlIHBhdGNoZWQgbGVuZ3RoLlxuICAgICAgICBlbmQgPSBlbmQgKyAoY3VycmVudC50ZXh0Lmxlbmd0aCAtIG9yaWdpbmFsLnRleHQubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHsgc3RhcnQsIGVuZCwgdmFsdWU6IHBhdGNoIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSBzdGF0ZSBvZiB0aGUgbW9kZWwgYW5kIGVtaXQgYSBzdGF0ZSBjaGFuZ2Ugc2lnbmFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGhhcmQgLSBSZXNldCBldmVuIGlmIGEgc3Vic2V0IG1hdGNoIGlzIGluIHByb2dyZXNzLlxuICAgICAqL1xuICAgIHJlc2V0KGhhcmQgPSBmYWxzZSkge1xuICAgICAgICAvLyBXaGVuIHRoZSBjb21wbGV0ZXIgZGV0ZWN0cyBhIGNvbW1vbiBzdWJzZXQgcHJlZml4IGZvciBhbGwgb3B0aW9ucyxcbiAgICAgICAgLy8gaXQgdXBkYXRlcyB0aGUgbW9kZWwgYW5kIHNldHMgdGhlIG1vZGVsIHNvdXJjZSB0byB0aGF0IHZhbHVlLCB0cmlnZ2VyaW5nXG4gICAgICAgIC8vIGEgcmVzZXQuIFVubGVzcyBleHBsaWNpdGx5IGEgaGFyZCByZXNldCwgdGhpcyBzaG91bGQgYmUgaWdub3JlZC5cbiAgICAgICAgaWYgKCFoYXJkICYmIHRoaXMuX3N1YnNldE1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVzZXQoKTtcbiAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VkLmVtaXQodW5kZWZpbmVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgQ29tcGxldGlvbkl0ZW0gbWF0Y2hlcyBhZ2FpbnN0IHF1ZXJ5LlxuICAgICAqIEhpZ2hsaWdodCBtYXRjaGluZyBwcmVmaXggYnkgYWRkaW5nIDxtYXJrPiB0YWdzLlxuICAgICAqL1xuICAgIF9tYXJrdXAocXVlcnkpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLl9jb21wbGV0aW9uSXRlbXM7XG4gICAgICAgIGxldCByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIC8vIFNlZSBpZiBsYWJlbCBtYXRjaGVzIHF1ZXJ5IHN0cmluZ1xuICAgICAgICAgICAgLy8gV2l0aCBJQ29tcGxldGlvbkl0ZW1zLCB0aGUgbGFiZWwgbWF5IGluY2x1ZGUgcGFyYW1ldGVycywgc28gd2UgZXhjbHVkZSB0aGVtIGZyb20gdGhlIG1hdGNoZXIuXG4gICAgICAgICAgICAvLyBlLmcuIEdpdmVuIGxhYmVsIGBmb28oYiwgYSwgcilgIGFuZCBxdWVyeSBgYmFyYCxcbiAgICAgICAgICAgIC8vIGRvbid0IGNvdW50IHBhcmFtZXRlcnMsIGBiYCwgYGFgLCBhbmQgYHJgIGFzIG1hdGNoZXMuXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGl0ZW0ubGFiZWwuaW5kZXhPZignKCcpO1xuICAgICAgICAgICAgY29uc3QgcHJlZml4ID0gaW5kZXggPiAtMSA/IGl0ZW0ubGFiZWwuc3Vic3RyaW5nKDAsIGluZGV4KSA6IGl0ZW0ubGFiZWw7XG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBTdHJpbmdFeHQubWF0Y2hTdW1PZlNxdWFyZXMocHJlZml4LCBxdWVyeSk7XG4gICAgICAgICAgICAvLyBGaWx0ZXIgbm9uLW1hdGNoaW5nIGl0ZW1zLlxuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgLy8gSGlnaGxpZ2h0IGxhYmVsIHRleHQgaWYgdGhlcmUncyBhIG1hdGNoXG4gICAgICAgICAgICAgICAgbGV0IG1hcmtlZCA9IFN0cmluZ0V4dC5oaWdobGlnaHQoaXRlbS5sYWJlbCwgbWF0Y2guaW5kaWNlcywgUHJpdmF0ZS5tYXJrKTtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBpdGVtKSwgeyBcbiAgICAgICAgICAgICAgICAgICAgLy8gQWxsb3cgZm9yIGxhemlseSByZXRyaWV2ZWQgZG9jdW1lbnRhdGlvbiAod2l0aCBhIGdldHRlcilcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRhdGlvbjogaXRlbS5kb2N1bWVudGF0aW9uLCBsYWJlbDogbWFya2VkLmpvaW4oJycpLCBcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgbm8gaW5zZXJ0VGV4dCBpcyBwcmVzZW50LCBwcmVzZXJ2ZSBvcmlnaW5hbCBsYWJlbCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAvLyBieSBzZXR0aW5nIGl0IGFzIHRoZSBpbnNlcnRUZXh0LlxuICAgICAgICAgICAgICAgICAgICBpbnNlcnRUZXh0OiBpdGVtLmluc2VydFRleHQgPyBpdGVtLmluc2VydFRleHQgOiBpdGVtLmxhYmVsLCBzY29yZTogbWF0Y2guc2NvcmUgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlc3VsdHMuc29ydChQcml2YXRlLnNjb3JlQ21wMik7XG4gICAgICAgIC8vIERlbGV0ZSB0aGUgZXh0cmEgc2NvcmUgYXR0cmlidXRlIHRvIG5vdCBsZWFrIGltcGxlbWVudGF0aW9uIGRldGFpbHNcbiAgICAgICAgLy8gdG8gSmF2YVNjcmlwdCBjYWxsZXJzLlxuICAgICAgICByZXN1bHRzLmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICBkZWxldGUgeC5zY29yZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBseSB0aGUgcXVlcnkgdG8gdGhlIGNvbXBsZXRlIG9wdGlvbnMgbGlzdCB0byByZXR1cm4gdGhlIG1hdGNoaW5nIHN1YnNldC5cbiAgICAgKi9cbiAgICBfZmlsdGVyKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucyB8fCBbXTtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLl9xdWVyeTtcbiAgICAgICAgaWYgKCFxdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hcChvcHRpb25zLCBvcHRpb24gPT4gKHsgcmF3OiBvcHRpb24sIHRleHQ6IG9wdGlvbiB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBvcHRpb25zKSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IFN0cmluZ0V4dC5tYXRjaFN1bU9mU3F1YXJlcyhvcHRpb24sIHF1ZXJ5KTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtlZCA9IFN0cmluZ0V4dC5oaWdobGlnaHQob3B0aW9uLCBtYXRjaC5pbmRpY2VzLCBQcml2YXRlLm1hcmspO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHJhdzogb3B0aW9uLFxuICAgICAgICAgICAgICAgICAgICBzY29yZTogbWF0Y2guc2NvcmUsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IG1hcmtlZC5qb2luKCcnKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXAocmVzdWx0cy5zb3J0KFByaXZhdGUuc2NvcmVDbXApLCByZXN1bHQgPT4gKHtcbiAgICAgICAgICAgIHRleHQ6IHJlc3VsdC50ZXh0LFxuICAgICAgICAgICAgcmF3OiByZXN1bHQucmF3XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzZXQgdGhlIHN0YXRlIG9mIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICBfcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9jdXJzb3IgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb21wbGV0aW9uSXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLl9vcmlnaW5hbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3F1ZXJ5ID0gJyc7XG4gICAgICAgIHRoaXMuX3N1YnNldE1hdGNoID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3R5cGVNYXAgPSB7fTtcbiAgICAgICAgdGhpcy5fb3JkZXJlZFR5cGVzID0gW107XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgY29tcGxldGVyIG1vZGVsIHByaXZhdGUgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbGlzdCBvZiBrbm93biB0eXBlIGFubm90YXRpb25zIG9mIGNvbXBsZXRlciBtYXRjaGVzLlxuICAgICAqL1xuICAgIGNvbnN0IEtOT1dOX1RZUEVTID0gWydmdW5jdGlvbicsICdpbnN0YW5jZScsICdjbGFzcycsICdtb2R1bGUnLCAna2V5d29yZCddO1xuICAgIC8qKlxuICAgICAqIFRoZSBtYXAgb2Yga25vd24gdHlwZSBhbm5vdGF0aW9ucyBvZiBjb21wbGV0ZXIgbWF0Y2hlcy5cbiAgICAgKi9cbiAgICBjb25zdCBLTk9XTl9NQVAgPSBLTk9XTl9UWVBFUy5yZWR1Y2UoKGFjYywgdHlwZSkgPT4ge1xuICAgICAgICBhY2NbdHlwZV0gPSBudWxsO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgICAvKipcbiAgICAgKiBNYXJrIGEgaGlnaGxpZ2h0ZWQgY2h1bmsgb2YgdGV4dC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtYXJrKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBgPG1hcms+JHt2YWx1ZX08L21hcms+YDtcbiAgICB9XG4gICAgUHJpdmF0ZS5tYXJrID0gbWFyaztcbiAgICAvKipcbiAgICAgKiBBIHNvcnQgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgaXRlbSBtYXRjaCBzY29yZXMuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBvcmRlcnMgdGhlIGl0ZW1zIGZpcnN0IGJhc2VkIG9uIHNjb3JlIChsb3dlciBpcyBiZXR0ZXIpLCB0aGVuXG4gICAgICogYnkgbG9jYWxlIG9yZGVyIG9mIHRoZSBpdGVtIHRleHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2NvcmVDbXAoYSwgYikge1xuICAgICAgICBjb25zdCBkZWx0YSA9IGEuc2NvcmUgLSBiLnNjb3JlO1xuICAgICAgICBpZiAoZGVsdGEgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBkZWx0YTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYS5yYXcubG9jYWxlQ29tcGFyZShiLnJhdyk7XG4gICAgfVxuICAgIFByaXZhdGUuc2NvcmVDbXAgPSBzY29yZUNtcDtcbiAgICAvKipcbiAgICAgKiBBIHNvcnQgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgaXRlbSBtYXRjaCBzY29yZXMuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBvcmRlcnMgdGhlIGl0ZW1zIGZpcnN0IGJhc2VkIG9uIHNjb3JlIChsb3dlciBpcyBiZXR0ZXIpLCB0aGVuXG4gICAgICogYnkgbG9jYWxlIG9yZGVyIG9mIHRoZSBpdGVtIHRleHQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2NvcmVDbXAyKGEsIGIpIHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gYS5zY29yZSAtIGIuc2NvcmU7XG4gICAgICAgIGlmIChkZWx0YSAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlbHRhO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoX2MgPSAoX2EgPSBhLmluc2VydFRleHQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5sb2NhbGVDb21wYXJlKChfYiA9IGIuaW5zZXJ0VGV4dCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJycpKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiAwO1xuICAgIH1cbiAgICBQcml2YXRlLnNjb3JlQ21wMiA9IHNjb3JlQ21wMjtcbiAgICAvKipcbiAgICAgKiBDb21wdXRlIGEgcmVsaWFibHkgb3JkZXJlZCBsaXN0IG9mIHR5cGVzIGZvciBJQ29tcGxldGlvbkl0ZW1zLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSByZXN1bHRpbmcgbGlzdCBhbHdheXMgYmVnaW5zIHdpdGggdGhlIGtub3duIHR5cGVzOlxuICAgICAqIGBgYFxuICAgICAqIFsnZnVuY3Rpb24nLCAnaW5zdGFuY2UnLCAnY2xhc3MnLCAnbW9kdWxlJywgJ2tleXdvcmQnXVxuICAgICAqIGBgYFxuICAgICAqIGZvbGxvd2VkIGJ5IG90aGVyIHR5cGVzIGluIGFscGhhYmV0aWNhbCBvcmRlci5cbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmRPcmRlcmVkQ29tcGxldGlvbkl0ZW1UeXBlcyhpdGVtcykge1xuICAgICAgICBjb25zdCBuZXdUeXBlU2V0ID0gbmV3IFNldCgpO1xuICAgICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSAmJlxuICAgICAgICAgICAgICAgICFLTk9XTl9UWVBFUy5pbmNsdWRlcyhpdGVtLnR5cGUpICYmXG4gICAgICAgICAgICAgICAgIW5ld1R5cGVTZXQuaGFzKGl0ZW0udHlwZSkpIHtcbiAgICAgICAgICAgICAgICBuZXdUeXBlU2V0LmFkZChpdGVtLnR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbmV3VHlwZXMgPSBBcnJheS5mcm9tKG5ld1R5cGVTZXQpO1xuICAgICAgICBuZXdUeXBlcy5zb3J0KChhLCBiKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpO1xuICAgICAgICByZXR1cm4gS05PV05fVFlQRVMuY29uY2F0KG5ld1R5cGVzKTtcbiAgICB9XG4gICAgUHJpdmF0ZS5maW5kT3JkZXJlZENvbXBsZXRpb25JdGVtVHlwZXMgPSBmaW5kT3JkZXJlZENvbXBsZXRpb25JdGVtVHlwZXM7XG4gICAgLyoqXG4gICAgICogQ29tcHV0ZSBhIHJlbGlhYmx5IG9yZGVyZWQgbGlzdCBvZiB0eXBlcy5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgcmVzdWx0aW5nIGxpc3QgYWx3YXlzIGJlZ2lucyB3aXRoIHRoZSBrbm93biB0eXBlczpcbiAgICAgKiBgYGBcbiAgICAgKiBbJ2Z1bmN0aW9uJywgJ2luc3RhbmNlJywgJ2NsYXNzJywgJ21vZHVsZScsICdrZXl3b3JkJ11cbiAgICAgKiBgYGBcbiAgICAgKiBmb2xsb3dlZCBieSBvdGhlciB0eXBlcyBpbiBhbHBoYWJldGljYWwgb3JkZXIuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZE9yZGVyZWRUeXBlcyh0eXBlTWFwKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkID0gT2JqZWN0LmtleXModHlwZU1hcClcbiAgICAgICAgICAgIC5tYXAoa2V5ID0+IHR5cGVNYXBba2V5XSlcbiAgICAgICAgICAgIC5maWx0ZXIoKHZhbHVlKSA9PiAhIXZhbHVlICYmICEodmFsdWUgaW4gS05PV05fTUFQKSlcbiAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpO1xuICAgICAgICByZXR1cm4gS05PV05fVFlQRVMuY29uY2F0KGZpbHRlcmVkKTtcbiAgICB9XG4gICAgUHJpdmF0ZS5maW5kT3JkZXJlZFR5cGVzID0gZmluZE9yZGVyZWRUeXBlcztcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9kZWwuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4gKiBUaGUgY29tcGxldGlvbiBtYW5hZ2VyIHRva2VuLlxuICovXG5leHBvcnQgY29uc3QgSUNvbXBsZXRpb25NYW5hZ2VyID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9jb21wbGV0ZXI6SUNvbXBsZXRpb25NYW5hZ2VyJyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2tlbnMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgZGVmYXVsdFNhbml0aXplciwgSG92ZXJCb3ggfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyB0b0FycmF5IH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgSlNPTkV4dCB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IEVsZW1lbnRFeHQgfSBmcm9tICdAbHVtaW5vL2RvbXV0aWxzJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGNvbXBsZXRlciBtZW51IGl0ZW1zLlxuICovXG5jb25zdCBJVEVNX0NMQVNTID0gJ2pwLUNvbXBsZXRlci1pdGVtJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYW4gYWN0aXZlIGNvbXBsZXRlciBtZW51IGl0ZW0uXG4gKi9cbmNvbnN0IEFDVElWRV9DTEFTUyA9ICdqcC1tb2QtYWN0aXZlJztcbi8qKlxuICogVGhlIG1pbmltdW0gaGVpZ2h0IG9mIGEgY29tcGxldGVyIHdpZGdldC5cbiAqL1xuY29uc3QgTUlOX0hFSUdIVCA9IDIwO1xuLyoqXG4gKiBUaGUgbWF4aW11bSBoZWlnaHQgb2YgYSBjb21wbGV0ZXIgd2lkZ2V0LlxuICovXG5jb25zdCBNQVhfSEVJR0hUID0gMzAwO1xuLyoqXG4gKiBBIGZsYWcgdG8gaW5kaWNhdGUgdGhhdCBldmVudCBoYW5kbGVycyBhcmUgY2F1Z2h0IGluIHRoZSBjYXB0dXJlIHBoYXNlLlxuICovXG5jb25zdCBVU0VfQ0FQVFVSRSA9IHRydWU7XG4vKipcbiAqIFRoZSBudW1iZXIgb2YgY29sb3JzIGRlZmluZWQgZm9yIHRoZSBjb21wbGV0ZXIgdHlwZSBhbm5vdGF0aW9ucy5cbiAqIFRoZXNlIGFyZSBsaXN0ZWQgaW4gY29tcGxldGVyL3N0eWxlL2luZGV4LmNzcyMxMDItMTUyLlxuICovXG5jb25zdCBOX0NPTE9SUyA9IDEwO1xuLyoqXG4gKiBBIHdpZGdldCB0aGF0IGVuYWJsZXMgdGV4dCBjb21wbGV0aW9uLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFRoZSBjb21wbGV0ZXIgaXMgaW50ZW5kZWQgdG8gYmUgYWJzb2x1dGVseSBwb3NpdGlvbmVkIG9uIHRoZVxuICogcGFnZSBhbmQgaG92ZXIgb3ZlciBhbnkgb3RoZXIgY29udGVudCwgc28gaXQgc2hvdWxkIGJlIGF0dGFjaGVkIGRpcmVjdGx5XG4gKiB0byBgZG9jdW1lbnQuYm9keWAsIG9yIGEgbm9kZSB0aGF0IGlzIHRoZSBmdWxsIHNpemUgb2YgYGRvY3VtZW50LmJvZHlgLlxuICogQXR0YWNoaW5nIGl0IHRvIG90aGVyIG5vZGVzIG1heSBpbmNvcnJlY3RseSBsb2NhdGUgdGhlIGNvbXBsZXRlci5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBsZXRlciBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgdGV4dCBjb21wbGV0ZXIgbWVudSB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcih7IG5vZGU6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIH0pO1xuICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2VkaXRvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX21vZGVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVzZXRGbGFnID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdmlzaWJpbGl0eUNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9pbmRleENoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9sYXN0U3Vic2V0TWF0Y2ggPSAnJztcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIgPSBvcHRpb25zLnJlbmRlcmVyIHx8IENvbXBsZXRlci5kZWZhdWx0UmVuZGVyZXI7XG4gICAgICAgIHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsIHx8IG51bGw7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gb3B0aW9ucy5lZGl0b3IgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygnanAtQ29tcGxldGVyJyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBhY3RpdmUgaW5kZXguXG4gICAgICovXG4gICAgZ2V0IGFjdGl2ZUluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSW5kZXg7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBlZGl0b3IgdXNlZCBieSB0aGUgY29tcGxldGlvbiB3aWRnZXQuXG4gICAgICovXG4gICAgZ2V0IGVkaXRvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvcjtcbiAgICB9XG4gICAgc2V0IGVkaXRvcihuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLl9lZGl0b3IgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIGEgc2VsZWN0aW9uIGlzIG1hZGUgZnJvbSB0aGUgY29tcGxldGVyIG1lbnUuXG4gICAgICovXG4gICAgZ2V0IHNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgY29tcGxldGVyIHdpZGdldCdzIHZpc2liaWxpdHkgY2hhbmdlcy5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIHNpZ25hbCBpcyB1c2VmdWwgd2hlbiB0aGVyZSBhcmUgbXVsdGlwbGUgZmxvYXRpbmcgd2lkZ2V0cyB0aGF0IG1heVxuICAgICAqIGNvbnRlbmQgd2l0aCB0aGUgc2FtZSBzcGFjZSBhbmQgb3VnaHQgdG8gYmUgbXV0dWFsbHkgZXhjbHVzaXZlLlxuICAgICAqL1xuICAgIGdldCB2aXNpYmlsaXR5Q2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2liaWxpdHlDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGFjdGl2ZSBpbmRleCBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBpbmRleENoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmRleENoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBtb2RlbCB1c2VkIGJ5IHRoZSBjb21wbGV0ZXIgd2lkZ2V0LlxuICAgICAqL1xuICAgIGdldCBtb2RlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICAgIH1cbiAgICBzZXQgbW9kZWwobW9kZWwpIHtcbiAgICAgICAgaWYgKCghbW9kZWwgJiYgIXRoaXMuX21vZGVsKSB8fCBtb2RlbCA9PT0gdGhpcy5fbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbW9kZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsLnN0YXRlQ2hhbmdlZC5kaXNjb25uZWN0KHRoaXMub25Nb2RlbFN0YXRlQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbW9kZWwgPSBtb2RlbDtcbiAgICAgICAgaWYgKHRoaXMuX21vZGVsKSB7XG4gICAgICAgICAgICB0aGlzLl9tb2RlbC5zdGF0ZUNoYW5nZWQuY29ubmVjdCh0aGlzLm9uTW9kZWxTdGF0ZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBjb21wbGV0ZXIgd2lkZ2V0LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHRoaXMuX21vZGVsID0gbnVsbDtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIERPTSBldmVudHMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnQgLSBUaGUgRE9NIGV2ZW50IHNlbnQgdG8gdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIG1ldGhvZCBpbXBsZW1lbnRzIHRoZSBET00gYEV2ZW50TGlzdGVuZXJgIGludGVyZmFjZSBhbmQgaXNcbiAgICAgKiBjYWxsZWQgaW4gcmVzcG9uc2UgdG8gZXZlbnRzIG9uIHRoZSBkb2NrIHBhbmVsJ3Mgbm9kZS4gSXQgc2hvdWxkXG4gICAgICogbm90IGJlIGNhbGxlZCBkaXJlY3RseSBieSB1c2VyIGNvZGUuXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIaWRkZW4gfHwgIXRoaXMuX2VkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAna2V5ZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0S2V5ZG93bihldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dE1vdXNlZG93bihldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzY3JvbGwnOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dFNjcm9sbChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fbGFzdFN1YnNldE1hdGNoID0gJyc7XG4gICAgICAgIGlmICh0aGlzLl9tb2RlbCkge1xuICAgICAgICAgICAgdGhpcy5fbW9kZWwucmVzZXQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdCB0aGUgc2VsZWN0ZWQgc2lnbmFsIGZvciB0aGUgY3VycmVudCBhY3RpdmUgaXRlbSBhbmQgcmVzZXQuXG4gICAgICovXG4gICAgc2VsZWN0QWN0aXZlKCkge1xuICAgICAgICBjb25zdCBhY3RpdmUgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcihgLiR7QUNUSVZFX0NMQVNTfWApO1xuICAgICAgICBpZiAoIWFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkLmVtaXQoYWN0aXZlLmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpKTtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYGFmdGVyLWF0dGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25BZnRlckF0dGFjaChtc2cpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMsIFVTRV9DQVBUVVJFKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcywgVVNFX0NBUFRVUkUpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLCBVU0VfQ0FQVFVSRSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgYmVmb3JlLWRldGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25CZWZvcmVEZXRhY2gobXNnKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLCBVU0VfQ0FQVFVSRSk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMsIFVTRV9DQVBUVVJFKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcywgVVNFX0NBUFRVUkUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgbW9kZWwgc3RhdGUgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBvbk1vZGVsU3RhdGVDaGFuZ2VkKCkge1xuICAgICAgICBpZiAodGhpcy5pc0F0dGFjaGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IDA7XG4gICAgICAgICAgICB0aGlzLl9pbmRleENoYW5nZWQuZW1pdCh0aGlzLl9hY3RpdmVJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgdXBkYXRlLXJlcXVlc3RgIG1lc3NhZ2VzLlxuICAgICAqL1xuICAgIG9uVXBkYXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLl9tb2RlbDtcbiAgICAgICAgaWYgKCFtb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yZXNldEZsYWcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0RmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzSGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlzaWJpbGl0eUNoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBub2RlID0gbnVsbDtcbiAgICAgICAgbGV0IGNvbXBsZXRpb25JdGVtTGlzdCA9IG1vZGVsLmNvbXBsZXRpb25JdGVtcyAmJiBtb2RlbC5jb21wbGV0aW9uSXRlbXMoKTtcbiAgICAgICAgaWYgKGNvbXBsZXRpb25JdGVtTGlzdCAmJiBjb21wbGV0aW9uSXRlbUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5fY3JlYXRlQ29tcGxldGlvbkl0ZW1Ob2RlKG1vZGVsLCBjb21wbGV0aW9uSXRlbUxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMuX2NyZWF0ZUlJdGVtTm9kZShtb2RlbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFjdGl2ZSA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChgLiR7SVRFTV9DTEFTU31gKVt0aGlzLl9hY3RpdmVJbmRleF07XG4gICAgICAgIGFjdGl2ZS5jbGFzc0xpc3QuYWRkKEFDVElWRV9DTEFTUyk7XG4gICAgICAgIC8vIEFkZCB0aGUgZG9jdW1lbnRhdGlvbiBwYW5lbFxuICAgICAgICBsZXQgZG9jUGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZG9jUGFuZWwuY2xhc3NOYW1lID0gJ2pwLUNvbXBsZXRlci1kb2NwYW5lbCc7XG4gICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoZG9jUGFuZWwpO1xuICAgICAgICB0aGlzLl91cGRhdGVEb2NQYW5lbCgpO1xuICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIHRoZSBjdXJyZW50IGNvbXBsZXRlciBzZXNzaW9uIGhhcyBsb2FkZWQsXG4gICAgICAgIC8vIHBvcHVsYXRlIGFueSBpbml0aWFsIHN1YnNldCBtYXRjaC5cbiAgICAgICAgaWYgKCFtb2RlbC5xdWVyeSkge1xuICAgICAgICAgICAgY29uc3QgcG9wdWxhdGVkID0gdGhpcy5fcG9wdWxhdGVTdWJzZXQoKTtcbiAgICAgICAgICAgIGlmIChwb3B1bGF0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0hpZGRlbikge1xuICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLl9zZXRHZW9tZXRyeSgpO1xuICAgICAgICAgICAgdGhpcy5fdmlzaWJpbGl0eUNoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2V0R2VvbWV0cnkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfY3JlYXRlQ29tcGxldGlvbkl0ZW1Ob2RlKG1vZGVsLCBpdGVtcykge1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gaXRlbXMsIHJlc2V0IGFuZCBiYWlsLlxuICAgICAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRGbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0hpZGRlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Zpc2liaWxpdHlDaGFuZ2VkLmVtaXQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIENsZWFyIHRoZSBub2RlLlxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAvLyBDb21wdXRlIGFuIG9yZGVyZWQgbGlzdCBvZiBhbGwgdGhlIHR5cGVzIGluIHRoZSB0eXBlTWFwLCB0aGlzIGlzIGNvbXB1dGVkXG4gICAgICAgIC8vIG9uY2UgYnkgdGhlIG1vZGVsIGVhY2ggdGltZSBuZXcgZGF0YSBhcnJpdmVzIGZvciBlZmZpY2llbmN5LlxuICAgICAgICBsZXQgb3JkZXJlZFR5cGVzID0gbW9kZWwub3JkZXJlZFR5cGVzKCk7XG4gICAgICAgIC8vIFBvcHVsYXRlIHRoZSBjb21wbGV0ZXIgaXRlbXMuXG4gICAgICAgIGxldCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIHVsLmNsYXNzTmFtZSA9ICdqcC1Db21wbGV0ZXItbGlzdCc7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fcmVuZGVyZXIuY3JlYXRlQ29tcGxldGlvbkl0ZW1Ob2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgbGkgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVDb21wbGV0aW9uSXRlbU5vZGUoaXRlbSwgb3JkZXJlZFR5cGVzKTtcbiAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfVxuICAgICAgICBub2RlLmFwcGVuZENoaWxkKHVsKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIF9jcmVhdGVJSXRlbU5vZGUobW9kZWwpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0b0FycmF5KG1vZGVsLml0ZW1zKCkpO1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gaXRlbXMsIHJlc2V0IGFuZCBiYWlsLlxuICAgICAgICBpZiAoIWl0ZW1zIHx8ICFpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0RmxhZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNIaWRkZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl92aXNpYmlsaXR5Q2hhbmdlZC5lbWl0KHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBvbmx5IG9uZSBvcHRpb24sIHNpZ25hbCBhbmQgYmFpbC5cbiAgICAgICAgLy8gV2UgZG9uJ3QgdGVzdCB0aGUgZmlsdGVyZWQgYGl0ZW1zYCwgYXMgdGhhdFxuICAgICAgICAvLyBpcyB0b28gYWdncmVzc2l2ZSBvZiBjb21wbGV0ZXIgYmVoYXZpb3IsIGl0IGNhblxuICAgICAgICAvLyBsZWFkIHRvIGRvdWJsZSB0eXBpbmcgb2YgYW4gb3B0aW9uLlxuICAgICAgICBjb25zdCBvcHRpb25zID0gdG9BcnJheShtb2RlbC5vcHRpb25zKCkpO1xuICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkLmVtaXQob3B0aW9uc1swXSk7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBDbGVhciB0aGUgbm9kZS5cbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICAvLyBDb21wdXRlIGFuIG9yZGVyZWQgbGlzdCBvZiBhbGwgdGhlIHR5cGVzIGluIHRoZSB0eXBlTWFwLCB0aGlzIGlzIGNvbXB1dGVkXG4gICAgICAgIC8vIG9uY2UgYnkgdGhlIG1vZGVsIGVhY2ggdGltZSBuZXcgZGF0YSBhcnJpdmVzIGZvciBlZmZpY2llbmN5LlxuICAgICAgICBjb25zdCBvcmRlcmVkVHlwZXMgPSBtb2RlbC5vcmRlcmVkVHlwZXMoKTtcbiAgICAgICAgLy8gUG9wdWxhdGUgdGhlIGNvbXBsZXRlciBpdGVtcy5cbiAgICAgICAgbGV0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgdWwuY2xhc3NOYW1lID0gJ2pwLUNvbXBsZXRlci1saXN0JztcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICBjb25zdCBsaSA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUl0ZW1Ob2RlKGl0ZW0sIG1vZGVsLnR5cGVNYXAoKSwgb3JkZXJlZFR5cGVzKTtcbiAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfVxuICAgICAgICBub2RlLmFwcGVuZENoaWxkKHVsKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEN5Y2xlIHRocm91Z2ggdGhlIGF2YWlsYWJsZSBjb21wbGV0ZXIgaXRlbXMuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogV2hlbiB0aGUgdXNlciBjeWNsZXMgYWxsIHRoZSB3YXkgYGRvd25gIHRvIHRoZSBsYXN0IGluZGV4LCBzdWJzZXF1ZW50XG4gICAgICogYGRvd25gIGN5Y2xlcyB3aWxsIGN5Y2xlIHRvIHRoZSBmaXJzdCBpbmRleC4gV2hlbiB0aGUgdXNlciBjeWNsZXMgYHVwYCB0b1xuICAgICAqIHRoZSBmaXJzdCBpdGVtLCBzdWJzZXF1ZW50IGB1cGAgY3ljbGVzIHdpbGwgY3ljbGUgdG8gdGhlIGxhc3QgaW5kZXguXG4gICAgICovXG4gICAgX2N5Y2xlKGRpcmVjdGlvbikge1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yQWxsKGAuJHtJVEVNX0NMQVNTfWApO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2FjdGl2ZUluZGV4O1xuICAgICAgICBsZXQgYWN0aXZlID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoYC4ke0FDVElWRV9DTEFTU31gKTtcbiAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3VwJykge1xuICAgICAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXggPSBpbmRleCA9PT0gMCA/IGl0ZW1zLmxlbmd0aCAtIDEgOiBpbmRleCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZG93bicpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUluZGV4ID0gaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxID8gaW5kZXggKyAxIDogMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE1lYXN1cmUgdGhlIG51bWJlciBvZiBpdGVtcyBvbiBhIHBhZ2UuXG4gICAgICAgICAgICBjb25zdCBib3hIZWlnaHQgPSB0aGlzLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaXRlbUhlaWdodCA9IGFjdGl2ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBwYWdlTGVuZ3RoID0gTWF0aC5mbG9vcihib3hIZWlnaHQgLyBpdGVtSGVpZ2h0KTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaW5kZXhcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdwYWdlVXAnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXggPSBpbmRleCAtIHBhZ2VMZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IGluZGV4ICsgcGFnZUxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENsYW1wIHRvIHRoZSBsZW5ndGggb2YgdGhlIGxpc3QuXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IE1hdGgubWluKE1hdGgubWF4KDAsIHRoaXMuX2FjdGl2ZUluZGV4KSwgaXRlbXMubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgYWN0aXZlID0gaXRlbXNbdGhpcy5fYWN0aXZlSW5kZXhdO1xuICAgICAgICBhY3RpdmUuY2xhc3NMaXN0LmFkZChBQ1RJVkVfQ0xBU1MpO1xuICAgICAgICBsZXQgY29tcGxldGlvbkxpc3QgPSB0aGlzLm5vZGUucXVlcnlTZWxlY3RvcignLmpwLUNvbXBsZXRlci1saXN0Jyk7XG4gICAgICAgIEVsZW1lbnRFeHQuc2Nyb2xsSW50b1ZpZXdJZk5lZWRlZChjb21wbGV0aW9uTGlzdCwgYWN0aXZlKTtcbiAgICAgICAgdGhpcy5faW5kZXhDaGFuZ2VkLmVtaXQodGhpcy5fYWN0aXZlSW5kZXgpO1xuICAgICAgICB0aGlzLl91cGRhdGVEb2NQYW5lbCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUga2V5ZG93biBldmVudHMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgX2V2dEtleWRvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIaWRkZW4gfHwgIXRoaXMuX2VkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fZWRpdG9yLmhvc3QuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSA5OiB7XG4gICAgICAgICAgICAgICAgLy8gVGFiIGtleVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLl9tb2RlbDtcbiAgICAgICAgICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQXV0b2luc2VydCBzaW5nbGUgY29tcGxldGlvbnMgb24gbWFudWFsIHJlcXVlc3QgKHRhYilcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IG1vZGVsLmNvbXBsZXRpb25JdGVtcyAmJiBtb2RlbC5jb21wbGV0aW9uSXRlbXMoKTtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkLmVtaXQoaXRlbXNbMF0uaW5zZXJ0VGV4dCB8fCBpdGVtc1swXS5sYWJlbCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwb3B1bGF0ZWQgPSB0aGlzLl9wb3B1bGF0ZVN1YnNldCgpO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBjb21tb24gc3Vic2V0IHdhcyBmb3VuZCBhbmQgc2V0IG9uIGBxdWVyeWAsXG4gICAgICAgICAgICAgICAgLy8gb3IgaWYgdGhlcmUgaXMgYSBgcXVlcnlgIGluIHRoZSBpbml0aWFsaXphdGlvbiBvcHRpb25zLFxuICAgICAgICAgICAgICAgIC8vIHRoZW4gZW1pdCBhIGNvbXBsZXRpb24gc2lnbmFsIHdpdGggdGhhdCBgcXVlcnlgICg9c3Vic2V0IG1hdGNoKSxcbiAgICAgICAgICAgICAgICAvLyBidXQgb25seSBpZiB0aGUgcXVlcnkgaGFzIGFjdHVhbGx5IGNoYW5nZWQuXG4gICAgICAgICAgICAgICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vanVweXRlcmxhYi9qdXB5dGVybGFiL2lzc3Vlcy8xMDQzOSNpc3N1ZWNvbW1lbnQtODc1MTg5NTQwXG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLnF1ZXJ5ICYmIG1vZGVsLnF1ZXJ5ICE9IHRoaXMuX2xhc3RTdWJzZXRNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5zdWJzZXRNYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkLmVtaXQobW9kZWwucXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5zdWJzZXRNYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXN0U3Vic2V0TWF0Y2ggPSBtb2RlbC5xdWVyeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHF1ZXJ5IGNoYW5nZWQsIHVwZGF0ZSByZW5kZXJpbmcgb2YgdGhlIG9wdGlvbnMuXG4gICAgICAgICAgICAgICAgaWYgKHBvcHVsYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9jeWNsZShldmVudC5zaGlmdEtleSA/ICd1cCcgOiAnZG93bicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgMjc6IC8vIEVzYyBrZXlcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIDMzOiAvLyBQYWdlVXBcbiAgICAgICAgICAgIGNhc2UgMzQ6IC8vIFBhZ2VEb3duXG4gICAgICAgICAgICBjYXNlIDM4OiAvLyBVcCBhcnJvdyBrZXlcbiAgICAgICAgICAgIGNhc2UgNDA6IHtcbiAgICAgICAgICAgICAgICAvLyBEb3duIGFycm93IGtleVxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY3ljbGUgPSBQcml2YXRlLmtleUNvZGVNYXBbZXZlbnQua2V5Q29kZV07XG4gICAgICAgICAgICAgICAgdGhpcy5fY3ljbGUoY3ljbGUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBtb3VzZWRvd24gZXZlbnRzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnRNb3VzZWRvd24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNIaWRkZW4gfHwgIXRoaXMuX2VkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChQcml2YXRlLm5vbnN0YW5kYXJkQ2xpY2soZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgd2hpbGUgKHRhcmdldCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdXNlciBoYXMgbWFkZSBhIHNlbGVjdGlvbiwgZW1pdCBpdHMgdmFsdWUgYW5kIHJlc2V0IHRoZSB3aWRnZXQuXG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhJVEVNX0NMQVNTKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWQuZW1pdCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB0aGUgbW91c2UgZXZlbnQgaGFwcGVuZWQgYW55d2hlcmUgZWxzZSBpbiB0aGUgd2lkZ2V0LCBiYWlsLlxuICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gdGhpcy5ub2RlKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBzY3JvbGwgZXZlbnRzIGZvciB0aGUgd2lkZ2V0XG4gICAgICovXG4gICAgX2V2dFNjcm9sbChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0hpZGRlbiB8fCAhdGhpcy5fZWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBub2RlIH0gPSB0aGlzO1xuICAgICAgICAvLyBBbGwgc2Nyb2xscyBleGNlcHQgc2Nyb2xscyBpbiB0aGUgYWN0dWFsIGhvdmVyIGJveCBub2RlIG1heSBjYXVzZSB0aGVcbiAgICAgICAgLy8gcmVmZXJlbnQgZWRpdG9yIHRoYXQgYW5jaG9ycyB0aGUgbm9kZSB0byBtb3ZlLCBzbyB0aGUgb25seSBzY3JvbGwgZXZlbnRzXG4gICAgICAgIC8vIHRoYXQgY2FuIHNhZmVseSBiZSBpZ25vcmVkIGFyZSBvbmVzIHRoYXQgaGFwcGVuIGluc2lkZSB0aGUgaG92ZXJpbmcgbm9kZS5cbiAgICAgICAgaWYgKG5vZGUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldCB0aGUgZ2VvbWV0cnkgb2YgdGhlIG5vZGUgYXN5bmNocm9ub3VzbHkuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9zZXRHZW9tZXRyeSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9wdWxhdGUgdGhlIGNvbXBsZXRlciB1cCB0byB0aGUgbG9uZ2VzdCBpbml0aWFsIHN1YnNldCBvZiBpdGVtcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGB0cnVlYCBpZiBhIHN1YnNldCBtYXRjaCB3YXMgZm91bmQgYW5kIHBvcHVsYXRlZC5cbiAgICAgKi9cbiAgICBfcG9wdWxhdGVTdWJzZXQoKSB7XG4gICAgICAgIGNvbnN0IHsgbW9kZWwgfSA9IHRoaXM7XG4gICAgICAgIGlmICghbW9kZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yQWxsKGAuJHtJVEVNX0NMQVNTfWApO1xuICAgICAgICBjb25zdCBzdWJzZXQgPSBQcml2YXRlLmNvbW1vblN1YnNldChQcml2YXRlLml0ZW1WYWx1ZXMoaXRlbXMpKTtcbiAgICAgICAgY29uc3QgeyBxdWVyeSB9ID0gbW9kZWw7XG4gICAgICAgIC8vIElmIGEgY29tbW9uIHN1YnNldCBleGlzdHMgYW5kIGl0IGlzIG5vdCB0aGUgY3VycmVudCBxdWVyeSwgaGlnaGxpZ2h0IGl0LlxuICAgICAgICBpZiAoc3Vic2V0ICYmIHN1YnNldCAhPT0gcXVlcnkgJiYgc3Vic2V0LmluZGV4T2YocXVlcnkpID09PSAwKSB7XG4gICAgICAgICAgICBtb2RlbC5xdWVyeSA9IHN1YnNldDtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2aXNpYmxlIGRpbWVuc2lvbnMgb2YgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfc2V0R2VvbWV0cnkoKSB7XG4gICAgICAgIGNvbnN0IHsgbm9kZSB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLl9tb2RlbDtcbiAgICAgICAgY29uc3QgZWRpdG9yID0gdGhpcy5fZWRpdG9yO1xuICAgICAgICAvLyBUaGlzIGlzIGFuIG92ZXJseSBkZWZlbnNpdmUgdGVzdDogYGN1cnNvcmAgd2lsbCBhbHdheXMgZXhpc3QgaWZcbiAgICAgICAgLy8gYG9yaWdpbmFsYCBleGlzdHMsIGV4Y2VwdCBpbiBjb250cml2ZWQgdGVzdHMuIEJ1dCBzaW5jZSBpdCBpcyBwb3NzaWJsZVxuICAgICAgICAvLyB0byBnZW5lcmF0ZSBhIHJ1bnRpbWUgZXJyb3IsIHRoZSBjaGVjayBvY2N1cnMgaGVyZS5cbiAgICAgICAgaWYgKCFlZGl0b3IgfHwgIW1vZGVsIHx8ICFtb2RlbC5vcmlnaW5hbCB8fCAhbW9kZWwuY3Vyc29yKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhcnQgPSBtb2RlbC5jdXJzb3Iuc3RhcnQ7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWRpdG9yLmdldFBvc2l0aW9uQXQoc3RhcnQpO1xuICAgICAgICBjb25zdCBhbmNob3IgPSBlZGl0b3IuZ2V0Q29vcmRpbmF0ZUZvclBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICAgICAgY29uc3QgYm9yZGVyTGVmdCA9IHBhcnNlSW50KHN0eWxlLmJvcmRlckxlZnRXaWR0aCwgMTApIHx8IDA7XG4gICAgICAgIGNvbnN0IHBhZGRpbmdMZWZ0ID0gcGFyc2VJbnQoc3R5bGUucGFkZGluZ0xlZnQsIDEwKSB8fCAwO1xuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGdlb21ldHJ5IG9mIHRoZSBjb21wbGV0ZXIuXG4gICAgICAgIEhvdmVyQm94LnNldEdlb21ldHJ5KHtcbiAgICAgICAgICAgIGFuY2hvcixcbiAgICAgICAgICAgIGhvc3Q6IGVkaXRvci5ob3N0LFxuICAgICAgICAgICAgbWF4SGVpZ2h0OiBNQVhfSEVJR0hULFxuICAgICAgICAgICAgbWluSGVpZ2h0OiBNSU5fSEVJR0hULFxuICAgICAgICAgICAgbm9kZTogbm9kZSxcbiAgICAgICAgICAgIG9mZnNldDogeyBob3Jpem9udGFsOiBib3JkZXJMZWZ0ICsgcGFkZGluZ0xlZnQgfSxcbiAgICAgICAgICAgIHByaXZpbGVnZTogJ2JlbG93JyxcbiAgICAgICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBkaXNwbGF5LXN0YXRlIGFuZCBjb250ZW50cyBvZiB0aGUgZG9jdW1lbnRhdGlvbiBwYW5lbFxuICAgICAqL1xuICAgIF91cGRhdGVEb2NQYW5lbCgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgbGV0IGRvY1BhbmVsID0gdGhpcy5ub2RlLnF1ZXJ5U2VsZWN0b3IoJy5qcC1Db21wbGV0ZXItZG9jcGFuZWwnKTtcbiAgICAgICAgaWYgKCFkb2NQYW5lbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghKChfYSA9IHRoaXMubW9kZWwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb21wbGV0aW9uSXRlbXMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGl0ZW1zID0gKF9iID0gdGhpcy5tb2RlbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNvbXBsZXRpb25JdGVtcygpO1xuICAgICAgICBpZiAoIWl0ZW1zKSB7XG4gICAgICAgICAgICBkb2NQYW5lbC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6bm9uZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhY3RpdmVJdGVtID0gaXRlbXNbdGhpcy5fYWN0aXZlSW5kZXhdO1xuICAgICAgICBpZiAoIWFjdGl2ZUl0ZW0pIHtcbiAgICAgICAgICAgIGRvY1BhbmVsLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTpub25lJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZG9jUGFuZWwudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgaWYgKGFjdGl2ZUl0ZW0uZG9jdW1lbnRhdGlvbikge1xuICAgICAgICAgICAgbGV0IG5vZGU7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3JlbmRlcmVyLmNyZWF0ZURvY3VtZW50YXRpb25Ob2RlKSB7XG4gICAgICAgICAgICAgICAgbm9kZSA9IENvbXBsZXRlci5kZWZhdWx0UmVuZGVyZXIuY3JlYXRlRG9jdW1lbnRhdGlvbk5vZGUoYWN0aXZlSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRG9jdW1lbnRhdGlvbk5vZGUoYWN0aXZlSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2NQYW5lbC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgICAgIGRvY1BhbmVsLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb2NQYW5lbC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6bm9uZScpO1xuICAgICAgICB9XG4gICAgfVxufVxuKGZ1bmN0aW9uIChDb21wbGV0ZXIpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiBhbiBgSVJlbmRlcmVyYC5cbiAgICAgKi9cbiAgICBjbGFzcyBSZW5kZXJlciB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYW4gaXRlbSBub2RlIGZyb20gYW4gSUNvbXBsZXRpb25JdGVtIGZvciBhIHRleHQgY29tcGxldGVyIG1lbnUuXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVDb21wbGV0aW9uSXRlbU5vZGUoaXRlbSwgb3JkZXJlZFR5cGVzKSB7XG4gICAgICAgICAgICBsZXQgYmFzZU5vZGUgPSB0aGlzLl9jcmVhdGVCYXNlTm9kZShpdGVtLmluc2VydFRleHQgfHwgaXRlbS5sYWJlbCk7XG4gICAgICAgICAgICBpZiAoaXRlbS5kZXByZWNhdGVkKSB7XG4gICAgICAgICAgICAgICAgYmFzZU5vZGUuY2xhc3NMaXN0LmFkZCgnanAtQ29tcGxldGVyLWRlcHJlY2F0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb25zdHJ1Y3ROb2RlKGJhc2VOb2RlLCB0aGlzLl9jcmVhdGVNYXRjaE5vZGUoaXRlbS5sYWJlbCksICEhaXRlbS50eXBlLCBpdGVtLnR5cGUsIG9yZGVyZWRUeXBlcywgaXRlbS5pY29uKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGFuIGl0ZW0gbm9kZSBmb3IgYSB0ZXh0IGNvbXBsZXRlciBtZW51LlxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlSXRlbU5vZGUoaXRlbSwgdHlwZU1hcCwgb3JkZXJlZFR5cGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uc3RydWN0Tm9kZSh0aGlzLl9jcmVhdGVCYXNlTm9kZShpdGVtLnJhdyksIHRoaXMuX2NyZWF0ZU1hdGNoTm9kZShpdGVtLnRleHQpLCAhSlNPTkV4dC5kZWVwRXF1YWwodHlwZU1hcCwge30pLCB0eXBlTWFwW2l0ZW0ucmF3XSB8fCAnJywgb3JkZXJlZFR5cGVzKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgZG9jdW1lbnRhdGlvbiBub2RlIGZvciBkb2N1bWVudGF0aW9uIHBhbmVsLlxuICAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlRG9jdW1lbnRhdGlvbk5vZGUoYWN0aXZlSXRlbSkge1xuICAgICAgICAgICAgbGV0IHByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuICAgICAgICAgICAgcHJlLnRleHRDb250ZW50ID0gYWN0aXZlSXRlbS5kb2N1bWVudGF0aW9uIHx8ICcnO1xuICAgICAgICAgICAgcmV0dXJuIHByZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGJhc2Ugbm9kZSB3aXRoIHRoZSB2YWx1ZSB0byBiZSBpbnNlcnRlZFxuICAgICAgICAgKi9cbiAgICAgICAgX2NyZWF0ZUJhc2VOb2RlKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBsaS5jbGFzc05hbWUgPSBJVEVNX0NMQVNTO1xuICAgICAgICAgICAgLy8gU2V0IHRoZSByYXcsIHVuLW1hcmtlZCB1cCB2YWx1ZSBhcyBhIGRhdGEgYXR0cmlidXRlLlxuICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJywgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIGxpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgbWF0Y2ggbm9kZSB0byBoaWdobGlnaHQgcG90ZW50aWFsIHByZWZpeCBtYXRjaCB3aXRoaW4gcmVzdWx0LlxuICAgICAgICAgKi9cbiAgICAgICAgX2NyZWF0ZU1hdGNoTm9kZShyZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NvZGUnKTtcbiAgICAgICAgICAgIG1hdGNoTm9kZS5jbGFzc05hbWUgPSAnanAtQ29tcGxldGVyLW1hdGNoJztcbiAgICAgICAgICAgIC8vIFVzZSBpbm5lckhUTUwgYmVjYXVzZSBzZWFyY2ggcmVzdWx0cyBpbmNsdWRlIDxtYXJrPiB0YWdzLlxuICAgICAgICAgICAgbWF0Y2hOb2RlLmlubmVySFRNTCA9IGRlZmF1bHRTYW5pdGl6ZXIuc2FuaXRpemUocmVzdWx0LCB7XG4gICAgICAgICAgICAgICAgYWxsb3dlZFRhZ3M6IFsnbWFyayddXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF0dGFjaGVzIHR5cGUgYW5kIG1hdGNoIG5vZGVzIHRvIGJhc2Ugbm9kZS5cbiAgICAgICAgICovXG4gICAgICAgIF9jb25zdHJ1Y3ROb2RlKGxpLCBtYXRjaE5vZGUsIHR5cGVzRXhpc3QsIHR5cGUsIG9yZGVyZWRUeXBlcywgaWNvbikge1xuICAgICAgICAgICAgLy8gQWRkIHRoZSBpY29uIG9yIHR5cGUgbW9ub2dyYW1cbiAgICAgICAgICAgIGlmIChpY29uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWNvbk5vZGUgPSBpY29uLmVsZW1lbnQoe1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdqcC1Db21wbGV0ZXItdHlwZSBqcC1Db21wbGV0ZXItaWNvbidcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsaS5hcHBlbmRDaGlsZChpY29uTm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlc0V4aXN0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgdHlwZU5vZGUudGV4dENvbnRlbnQgPSAodHlwZVswXSB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb2xvckluZGV4ID0gKG9yZGVyZWRUeXBlcy5pbmRleE9mKHR5cGUpICUgTl9DT0xPUlMpICsgMTtcbiAgICAgICAgICAgICAgICB0eXBlTm9kZS5jbGFzc05hbWUgPSAnanAtQ29tcGxldGVyLXR5cGUganAtQ29tcGxldGVyLW1vbm9ncmFtJztcbiAgICAgICAgICAgICAgICB0eXBlTm9kZS5zZXRBdHRyaWJ1dGUoYGRhdGEtY29sb3ItaW5kZXhgLCBjb2xvckluZGV4LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKHR5cGVOb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBlbXB0eSBzcGFuIHRvIGVuc3VyZSBjb25zaXN0ZW50IGxpc3Qgc3R5bGluZy5cbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGluIGEgbGlzdCBvZiB0d28gaXRlbXMsXG4gICAgICAgICAgICAgICAgLy8gaWYgb25lIGl0ZW0gaGFzIGFuIGljb24sIGJ1dCB0aGUgb3RoZXIgaGFzIHR5cGUsXG4gICAgICAgICAgICAgICAgLy8gdGhlIGljb24gZ3Jvd3Mgb3V0IG9mIGl0cyBib3VuZHMuXG4gICAgICAgICAgICAgICAgY29uc3QgZHVtbXlOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIGR1bW15Tm9kZS5jbGFzc05hbWUgPSAnanAtQ29tcGxldGVyLW1vbm9ncmFtJztcbiAgICAgICAgICAgICAgICBsaS5hcHBlbmRDaGlsZChkdW1teU5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGkuYXBwZW5kQ2hpbGQobWF0Y2hOb2RlKTtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgdHlwZSwgYWRkIHRoZSB0eXBlIGV4dGVuc2lvbiBhbmQgdGl0bGVcbiAgICAgICAgICAgIGlmICh0eXBlc0V4aXN0KSB7XG4gICAgICAgICAgICAgICAgbGkudGl0bGUgPSB0eXBlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGVFeHRlbmRlZE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjb2RlJyk7XG4gICAgICAgICAgICAgICAgdHlwZUV4dGVuZGVkTm9kZS5jbGFzc05hbWUgPSAnanAtQ29tcGxldGVyLXR5cGVFeHRlbmRlZCc7XG4gICAgICAgICAgICAgICAgdHlwZUV4dGVuZGVkTm9kZS50ZXh0Q29udGVudCA9IHR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBsaS5hcHBlbmRDaGlsZCh0eXBlRXh0ZW5kZWROb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElmIG5vIHR5cGUgaXMgcHJlc2VudCBvbiB0aGUgcmlnaHQsXG4gICAgICAgICAgICAgICAgLy8gdGhlIGhpZ2hsaWdodGluZyBvZiB0aGUgY29tcGxldGlvbiBpdGVtXG4gICAgICAgICAgICAgICAgLy8gZG9lc24ndCBjb3ZlciB0aGUgZW50aXJlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCBkdW1teVR5cGVFeHRlbmRlZE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgZHVtbXlUeXBlRXh0ZW5kZWROb2RlLmNsYXNzTmFtZSA9ICdqcC1Db21wbGV0ZXItdHlwZUV4dGVuZGVkJztcbiAgICAgICAgICAgICAgICBsaS5hcHBlbmRDaGlsZChkdW1teVR5cGVFeHRlbmRlZE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpO1xuICAgICAgICB9XG4gICAgfVxuICAgIENvbXBsZXRlci5SZW5kZXJlciA9IFJlbmRlcmVyO1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGBJUmVuZGVyZXJgIGluc3RhbmNlLlxuICAgICAqL1xuICAgIENvbXBsZXRlci5kZWZhdWx0UmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoKTtcbn0pKENvbXBsZXRlciB8fCAoQ29tcGxldGVyID0ge30pKTtcbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIGNvbXBsZXRlciB3aWRnZXQgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIE1hcHBpbmcgZnJvbSBrZXlDb2RlcyB0byBzY3JvbGxUeXBlcy5cbiAgICAgKi9cbiAgICBQcml2YXRlLmtleUNvZGVNYXAgPSB7XG4gICAgICAgIDM4OiAndXAnLFxuICAgICAgICA0MDogJ2Rvd24nLFxuICAgICAgICAzMzogJ3BhZ2VVcCcsXG4gICAgICAgIDM0OiAncGFnZURvd24nXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjb21tb24gc3Vic2V0IHN0cmluZyB0aGF0IGEgbGlzdCBvZiBzdHJpbmdzIHNoYXJlcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb21tb25TdWJzZXQodmFsdWVzKSB7XG4gICAgICAgIGNvbnN0IGxlbiA9IHZhbHVlcy5sZW5ndGg7XG4gICAgICAgIGxldCBzdWJzZXQgPSAnJztcbiAgICAgICAgaWYgKGxlbiA8IDIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdWJzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RybGVuID0gdmFsdWVzWzBdLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJsZW47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2ggPSB2YWx1ZXNbMF1baV07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlc1tqXVtpXSAhPT0gY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnNldDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzZXQgKz0gY2g7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1YnNldDtcbiAgICB9XG4gICAgUHJpdmF0ZS5jb21tb25TdWJzZXQgPSBjb21tb25TdWJzZXQ7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGlzdCBvZiByYXcgaXRlbSB2YWx1ZXMgY3VycmVudGx5IGluIHRoZSBET00uXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXRlbVZhbHVlcyhpdGVtcykge1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBhdHRyID0gaXRlbXNbaV0uZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJyk7XG4gICAgICAgICAgICBpZiAoYXR0cikge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGF0dHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuICAgIFByaXZhdGUuaXRlbVZhbHVlcyA9IGl0ZW1WYWx1ZXM7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGZvciBhbnkgbW9kaWZpZWQgY2xpY2sgZXZlbnQgKGkuZS4sIG5vdCBhIGxlZnQtY2xpY2spLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5vbnN0YW5kYXJkQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIChldmVudC5idXR0b24gIT09IDAgfHxcbiAgICAgICAgICAgIGV2ZW50LmFsdEtleSB8fFxuICAgICAgICAgICAgZXZlbnQuY3RybEtleSB8fFxuICAgICAgICAgICAgZXZlbnQuc2hpZnRLZXkgfHxcbiAgICAgICAgICAgIGV2ZW50Lm1ldGFLZXkpO1xuICAgIH1cbiAgICBQcml2YXRlLm5vbnN0YW5kYXJkQ2xpY2sgPSBub25zdGFuZGFyZENsaWNrO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aWRnZXQuanMubWFwIl0sInNvdXJjZVJvb3QiOiIifQ==