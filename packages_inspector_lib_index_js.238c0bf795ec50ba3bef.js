(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_inspector_lib_index_js"],{

/***/ "../../packages/inspector/lib/handler.js":
/*!***********************************************!*\
  !*** ../../packages/inspector/lib/handler.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InspectionHandler": () => (/* binding */ InspectionHandler)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_4__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





/**
 * An object that handles code inspection.
 */
class InspectionHandler {
    /**
     * Construct a new inspection handler for a widget.
     */
    constructor(options) {
        this._cleared = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._disposed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._editor = null;
        this._inspected = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        this._isDisposed = false;
        this._pending = 0;
        this._standby = true;
        this._lastInspectedReply = null;
        this._connector = options.connector;
        this._rendermime = options.rendermime;
        this._debouncer = new _lumino_polling__WEBPACK_IMPORTED_MODULE_3__.Debouncer(this.onEditorChange.bind(this), 250);
    }
    /**
     * A signal emitted when the inspector should clear all items.
     */
    get cleared() {
        return this._cleared;
    }
    /**
     * A signal emitted when the handler is disposed.
     */
    get disposed() {
        return this._disposed;
    }
    /**
     * A signal emitted when an inspector value is generated.
     */
    get inspected() {
        return this._inspected;
    }
    /**
     * The editor widget used by the inspection handler.
     */
    get editor() {
        return this._editor;
    }
    set editor(newValue) {
        if (newValue === this._editor) {
            return;
        }
        // Remove all of our listeners.
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal.disconnectReceiver(this);
        const editor = (this._editor = newValue);
        if (editor) {
            // Clear the inspector in preparation for a new editor.
            this._cleared.emit(void 0);
            // Call onEditorChange to cover the case where the user changes
            // the active cell
            this.onEditorChange();
            editor.model.selections.changed.connect(this._onChange, this);
            editor.model.value.changed.connect(this._onChange, this);
        }
    }
    /**
     * Indicates whether the handler makes API inspection requests or stands by.
     *
     * #### Notes
     * The use case for this attribute is to limit the API traffic when no
     * inspector is visible.
     */
    get standby() {
        return this._standby;
    }
    set standby(value) {
        this._standby = value;
    }
    /**
     * Get whether the inspection handler is disposed.
     *
     * #### Notes
     * This is a read-only property.
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
        this._disposed.emit(void 0);
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal.clearData(this);
    }
    /**
     * Handle a text changed signal from an editor.
     *
     * #### Notes
     * Update the hints inspector based on a text change.
     */
    onEditorChange(customText) {
        // If the handler is in standby mode, bail.
        if (this._standby) {
            return;
        }
        const editor = this.editor;
        if (!editor) {
            return;
        }
        const text = customText ? customText : editor.model.value.text;
        const position = editor.getCursorPosition();
        const offset = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.Text.jsIndexToCharIndex(editor.getOffsetAt(position), text);
        const update = { content: null };
        const pending = ++this._pending;
        void this._connector
            .fetch({ offset, text })
            .then(reply => {
            // If handler has been disposed or a newer request is pending, bail.
            if (!reply || this.isDisposed || pending !== this._pending) {
                this._lastInspectedReply = null;
                this._inspected.emit(update);
                return;
            }
            const { data } = reply;
            // Do not update if there would be no change.
            if (this._lastInspectedReply &&
                _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.deepEqual(this._lastInspectedReply, data)) {
                return;
            }
            const mimeType = this._rendermime.preferredMimeType(data);
            if (mimeType) {
                const widget = this._rendermime.createRenderer(mimeType);
                const model = new _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_1__.MimeModel({ data });
                void widget.renderModel(model);
                update.content = widget;
            }
            this._lastInspectedReply = reply.data;
            this._inspected.emit(update);
        })
            .catch(reason => {
            // Since almost all failures are benign, fail silently.
            this._lastInspectedReply = null;
            this._inspected.emit(update);
        });
    }
    /**
     * Handle changes to the editor state, debouncing.
     */
    _onChange() {
        void this._debouncer.invoke();
    }
}
//# sourceMappingURL=handler.js.map

/***/ }),

/***/ "../../packages/inspector/lib/index.js":
/*!*********************************************!*\
  !*** ../../packages/inspector/lib/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InspectionHandler": () => (/* reexport safe */ _handler__WEBPACK_IMPORTED_MODULE_0__.InspectionHandler),
/* harmony export */   "InspectorPanel": () => (/* reexport safe */ _inspector__WEBPACK_IMPORTED_MODULE_1__.InspectorPanel),
/* harmony export */   "KernelConnector": () => (/* reexport safe */ _kernelconnector__WEBPACK_IMPORTED_MODULE_2__.KernelConnector),
/* harmony export */   "IInspector": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_3__.IInspector)
/* harmony export */ });
/* harmony import */ var _handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler */ "../../packages/inspector/lib/handler.js");
/* harmony import */ var _inspector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inspector */ "../../packages/inspector/lib/inspector.js");
/* harmony import */ var _kernelconnector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./kernelconnector */ "../../packages/inspector/lib/kernelconnector.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tokens */ "../../packages/inspector/lib/tokens.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module inspector
 */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/inspector/lib/inspector.js":
/*!*************************************************!*\
  !*** ../../packages/inspector/lib/inspector.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InspectorPanel": () => (/* binding */ InspectorPanel)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * The class name added to inspector panels.
 */
const PANEL_CLASS = 'jp-Inspector';
/**
 * The class name added to inspector content.
 */
const CONTENT_CLASS = 'jp-Inspector-content';
/**
 * The class name added to default inspector content.
 */
const DEFAULT_CONTENT_CLASS = 'jp-Inspector-default-content';
/**
 * A panel which contains a set of inspectors.
 */
class InspectorPanel extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Panel {
    /**
     * Construct an inspector.
     */
    constructor(options = {}) {
        super();
        this._source = null;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        if (options.initialContent instanceof _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget) {
            this._content = options.initialContent;
        }
        else if (typeof options.initialContent === 'string') {
            this._content = InspectorPanel._generateContentWidget(`<p>${options.initialContent}</p>`);
        }
        else {
            this._content = InspectorPanel._generateContentWidget('<p>' +
                this._trans.__('Click on a function to see documentation.') +
                '</p>');
        }
        this.addClass(PANEL_CLASS);
        this.layout.addWidget(this._content);
    }
    /**
     * Print in iframe
     */
    [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Printing.symbol]() {
        return () => _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Printing.printWidget(this);
    }
    /**
     * The source of events the inspector panel listens for.
     */
    get source() {
        return this._source;
    }
    set source(source) {
        if (this._source === source) {
            return;
        }
        // Disconnect old signal handler.
        if (this._source) {
            this._source.standby = true;
            this._source.inspected.disconnect(this.onInspectorUpdate, this);
            this._source.disposed.disconnect(this.onSourceDisposed, this);
        }
        // Reject a source that is already disposed.
        if (source && source.isDisposed) {
            source = null;
        }
        // Update source.
        this._source = source;
        // Connect new signal handler.
        if (this._source) {
            this._source.standby = false;
            this._source.inspected.connect(this.onInspectorUpdate, this);
            this._source.disposed.connect(this.onSourceDisposed, this);
        }
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this.source = null;
        super.dispose();
    }
    /**
     * Handle inspector update signals.
     */
    onInspectorUpdate(sender, args) {
        const { content } = args;
        // Update the content of the inspector widget.
        if (!content || content === this._content) {
            return;
        }
        this._content.dispose();
        this._content = content;
        content.addClass(CONTENT_CLASS);
        this.layout.addWidget(content);
    }
    /**
     * Handle source disposed signals.
     */
    onSourceDisposed(sender, args) {
        this.source = null;
    }
    /**
     * Generate content widget from string
     */
    static _generateContentWidget(message) {
        const widget = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget();
        widget.node.innerHTML = message;
        widget.addClass(CONTENT_CLASS);
        widget.addClass(DEFAULT_CONTENT_CLASS);
        return widget;
    }
}
//# sourceMappingURL=inspector.js.map

/***/ }),

/***/ "../../packages/inspector/lib/kernelconnector.js":
/*!*******************************************************!*\
  !*** ../../packages/inspector/lib/kernelconnector.js ***!
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
 * The default connector for making inspection requests from the Jupyter API.
 */
class KernelConnector extends _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_0__.DataConnector {
    /**
     * Create a new kernel connector for inspection requests.
     *
     * @param options - The instantiation options for the kernel connector.
     */
    constructor(options) {
        super();
        this._sessionContext = options.sessionContext;
    }
    /**
     * Fetch inspection requests.
     *
     * @param request - The inspection request text and details.
     */
    fetch(request) {
        var _a;
        const kernel = (_a = this._sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
        if (!kernel) {
            return Promise.reject(new Error('Inspection fetch requires a kernel.'));
        }
        const contents = {
            code: request.text,
            cursor_pos: request.offset,
            detail_level: 1
        };
        return kernel.requestInspect(contents).then(msg => {
            const response = msg.content;
            if (response.status !== 'ok' || !response.found) {
                throw new Error('Inspection fetch failed to return successfully.');
            }
            return { data: response.data, metadata: response.metadata };
        });
    }
}
//# sourceMappingURL=kernelconnector.js.map

/***/ }),

/***/ "../../packages/inspector/lib/tokens.js":
/*!**********************************************!*\
  !*** ../../packages/inspector/lib/tokens.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IInspector": () => (/* binding */ IInspector)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The inspector panel token.
 */
const IInspector = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/inspector:IInspector');
//# sourceMappingURL=tokens.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvaW5zcGVjdG9yL2xpYi9oYW5kbGVyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9pbnNwZWN0b3IvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9pbnNwZWN0b3IvbGliL2luc3BlY3Rvci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvaW5zcGVjdG9yL2xpYi9rZXJuZWxjb25uZWN0b3IuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2luc3BlY3Rvci9saWIvdG9rZW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUM2QztBQUNNO0FBQ1A7QUFDQTtBQUNEO0FBQzNDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIscURBQU07QUFDbEMsNkJBQTZCLHFEQUFNO0FBQ25DO0FBQ0EsOEJBQThCLHFEQUFNO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixzREFBUztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdFQUF5QjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLCtEQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMEVBQXVCO0FBQzlDLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0EsZ0JBQWdCLGdFQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDZEQUFTLEVBQUUsT0FBTztBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDRTtBQUNNO0FBQ1Q7QUFDekIsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDZ0Q7QUFDUztBQUNUO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLDZCQUE2QixrREFBSztBQUN6QztBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBLGdEQUFnRCxtRUFBYztBQUM5RDtBQUNBLDhDQUE4QyxtREFBTTtBQUNwRDtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UsdUJBQXVCO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssaUVBQWU7QUFDcEIscUJBQXFCLHNFQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxVQUFVO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLG1EQUFNO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZIQTtBQUNBO0FBQ29EO0FBQ3BEO0FBQ0E7QUFDQTtBQUNPLDhCQUE4Qiw4REFBYTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsU0FBUztBQUNUO0FBQ0E7QUFDQSwyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Q0E7QUFDQTtBQUMwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNPLHVCQUF1QixvREFBSztBQUNuQyxrQyIsImZpbGUiOiJwYWNrYWdlc19pbnNwZWN0b3JfbGliX2luZGV4X2pzLjIzOGMwYmY3OTVlYzUwYmEzYmVmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBNaW1lTW9kZWwgfSBmcm9tICdAanVweXRlcmxhYi9yZW5kZXJtaW1lJztcbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBEZWJvdW5jZXIgfSBmcm9tICdAbHVtaW5vL3BvbGxpbmcnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBBbiBvYmplY3QgdGhhdCBoYW5kbGVzIGNvZGUgaW5zcGVjdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEluc3BlY3Rpb25IYW5kbGVyIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgaW5zcGVjdGlvbiBoYW5kbGVyIGZvciBhIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2NsZWFyZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9kaXNwb3NlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2VkaXRvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2luc3BlY3RlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGVuZGluZyA9IDA7XG4gICAgICAgIHRoaXMuX3N0YW5kYnkgPSB0cnVlO1xuICAgICAgICB0aGlzLl9sYXN0SW5zcGVjdGVkUmVwbHkgPSBudWxsO1xuICAgICAgICB0aGlzLl9jb25uZWN0b3IgPSBvcHRpb25zLmNvbm5lY3RvcjtcbiAgICAgICAgdGhpcy5fcmVuZGVybWltZSA9IG9wdGlvbnMucmVuZGVybWltZTtcbiAgICAgICAgdGhpcy5fZGVib3VuY2VyID0gbmV3IERlYm91bmNlcih0aGlzLm9uRWRpdG9yQ2hhbmdlLmJpbmQodGhpcyksIDI1MCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgaW5zcGVjdG9yIHNob3VsZCBjbGVhciBhbGwgaXRlbXMuXG4gICAgICovXG4gICAgZ2V0IGNsZWFyZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGVhcmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGhhbmRsZXIgaXMgZGlzcG9zZWQuXG4gICAgICovXG4gICAgZ2V0IGRpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiBhbiBpbnNwZWN0b3IgdmFsdWUgaXMgZ2VuZXJhdGVkLlxuICAgICAqL1xuICAgIGdldCBpbnNwZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnNwZWN0ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBlZGl0b3Igd2lkZ2V0IHVzZWQgYnkgdGhlIGluc3BlY3Rpb24gaGFuZGxlci5cbiAgICAgKi9cbiAgICBnZXQgZWRpdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yO1xuICAgIH1cbiAgICBzZXQgZWRpdG9yKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdGhpcy5fZWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBvZiBvdXIgbGlzdGVuZXJzLlxuICAgICAgICBTaWduYWwuZGlzY29ubmVjdFJlY2VpdmVyKHRoaXMpO1xuICAgICAgICBjb25zdCBlZGl0b3IgPSAodGhpcy5fZWRpdG9yID0gbmV3VmFsdWUpO1xuICAgICAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgICAgICAvLyBDbGVhciB0aGUgaW5zcGVjdG9yIGluIHByZXBhcmF0aW9uIGZvciBhIG5ldyBlZGl0b3IuXG4gICAgICAgICAgICB0aGlzLl9jbGVhcmVkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgICAgIC8vIENhbGwgb25FZGl0b3JDaGFuZ2UgdG8gY292ZXIgdGhlIGNhc2Ugd2hlcmUgdGhlIHVzZXIgY2hhbmdlc1xuICAgICAgICAgICAgLy8gdGhlIGFjdGl2ZSBjZWxsXG4gICAgICAgICAgICB0aGlzLm9uRWRpdG9yQ2hhbmdlKCk7XG4gICAgICAgICAgICBlZGl0b3IubW9kZWwuc2VsZWN0aW9ucy5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25DaGFuZ2UsIHRoaXMpO1xuICAgICAgICAgICAgZWRpdG9yLm1vZGVsLnZhbHVlLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vbkNoYW5nZSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGhhbmRsZXIgbWFrZXMgQVBJIGluc3BlY3Rpb24gcmVxdWVzdHMgb3Igc3RhbmRzIGJ5LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSB1c2UgY2FzZSBmb3IgdGhpcyBhdHRyaWJ1dGUgaXMgdG8gbGltaXQgdGhlIEFQSSB0cmFmZmljIHdoZW4gbm9cbiAgICAgKiBpbnNwZWN0b3IgaXMgdmlzaWJsZS5cbiAgICAgKi9cbiAgICBnZXQgc3RhbmRieSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YW5kYnk7XG4gICAgfVxuICAgIHNldCBzdGFuZGJ5KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3N0YW5kYnkgPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHdoZXRoZXIgdGhlIGluc3BlY3Rpb24gaGFuZGxlciBpcyBkaXNwb3NlZC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGlzIGEgcmVhZC1vbmx5IHByb3BlcnR5LlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGhhbmRsZXIuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kaXNwb3NlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgIFNpZ25hbC5jbGVhckRhdGEodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIHRleHQgY2hhbmdlZCBzaWduYWwgZnJvbSBhbiBlZGl0b3IuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVXBkYXRlIHRoZSBoaW50cyBpbnNwZWN0b3IgYmFzZWQgb24gYSB0ZXh0IGNoYW5nZS5cbiAgICAgKi9cbiAgICBvbkVkaXRvckNoYW5nZShjdXN0b21UZXh0KSB7XG4gICAgICAgIC8vIElmIHRoZSBoYW5kbGVyIGlzIGluIHN0YW5kYnkgbW9kZSwgYmFpbC5cbiAgICAgICAgaWYgKHRoaXMuX3N0YW5kYnkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmVkaXRvcjtcbiAgICAgICAgaWYgKCFlZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZXh0ID0gY3VzdG9tVGV4dCA/IGN1c3RvbVRleHQgOiBlZGl0b3IubW9kZWwudmFsdWUudGV4dDtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gVGV4dC5qc0luZGV4VG9DaGFySW5kZXgoZWRpdG9yLmdldE9mZnNldEF0KHBvc2l0aW9uKSwgdGV4dCk7XG4gICAgICAgIGNvbnN0IHVwZGF0ZSA9IHsgY29udGVudDogbnVsbCB9O1xuICAgICAgICBjb25zdCBwZW5kaW5nID0gKyt0aGlzLl9wZW5kaW5nO1xuICAgICAgICB2b2lkIHRoaXMuX2Nvbm5lY3RvclxuICAgICAgICAgICAgLmZldGNoKHsgb2Zmc2V0LCB0ZXh0IH0pXG4gICAgICAgICAgICAudGhlbihyZXBseSA9PiB7XG4gICAgICAgICAgICAvLyBJZiBoYW5kbGVyIGhhcyBiZWVuIGRpc3Bvc2VkIG9yIGEgbmV3ZXIgcmVxdWVzdCBpcyBwZW5kaW5nLCBiYWlsLlxuICAgICAgICAgICAgaWYgKCFyZXBseSB8fCB0aGlzLmlzRGlzcG9zZWQgfHwgcGVuZGluZyAhPT0gdGhpcy5fcGVuZGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RJbnNwZWN0ZWRSZXBseSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5zcGVjdGVkLmVtaXQodXBkYXRlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB7IGRhdGEgfSA9IHJlcGx5O1xuICAgICAgICAgICAgLy8gRG8gbm90IHVwZGF0ZSBpZiB0aGVyZSB3b3VsZCBiZSBubyBjaGFuZ2UuXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFzdEluc3BlY3RlZFJlcGx5ICYmXG4gICAgICAgICAgICAgICAgSlNPTkV4dC5kZWVwRXF1YWwodGhpcy5fbGFzdEluc3BlY3RlZFJlcGx5LCBkYXRhKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gdGhpcy5fcmVuZGVybWltZS5wcmVmZXJyZWRNaW1lVHlwZShkYXRhKTtcbiAgICAgICAgICAgIGlmIChtaW1lVHlwZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHdpZGdldCA9IHRoaXMuX3JlbmRlcm1pbWUuY3JlYXRlUmVuZGVyZXIobWltZVR5cGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gbmV3IE1pbWVNb2RlbCh7IGRhdGEgfSk7XG4gICAgICAgICAgICAgICAgdm9pZCB3aWRnZXQucmVuZGVyTW9kZWwobW9kZWwpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZS5jb250ZW50ID0gd2lkZ2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbGFzdEluc3BlY3RlZFJlcGx5ID0gcmVwbHkuZGF0YTtcbiAgICAgICAgICAgIHRoaXMuX2luc3BlY3RlZC5lbWl0KHVwZGF0ZSk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2gocmVhc29uID0+IHtcbiAgICAgICAgICAgIC8vIFNpbmNlIGFsbW9zdCBhbGwgZmFpbHVyZXMgYXJlIGJlbmlnbiwgZmFpbCBzaWxlbnRseS5cbiAgICAgICAgICAgIHRoaXMuX2xhc3RJbnNwZWN0ZWRSZXBseSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9pbnNwZWN0ZWQuZW1pdCh1cGRhdGUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNoYW5nZXMgdG8gdGhlIGVkaXRvciBzdGF0ZSwgZGVib3VuY2luZy5cbiAgICAgKi9cbiAgICBfb25DaGFuZ2UoKSB7XG4gICAgICAgIHZvaWQgdGhpcy5fZGVib3VuY2VyLmludm9rZSgpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhhbmRsZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgaW5zcGVjdG9yXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vaGFuZGxlcic7XG5leHBvcnQgKiBmcm9tICcuL2luc3BlY3Rvcic7XG5leHBvcnQgKiBmcm9tICcuL2tlcm5lbGNvbm5lY3Rvcic7XG5leHBvcnQgKiBmcm9tICcuL3Rva2Vucyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBQcmludGluZyB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgUGFuZWwsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGluc3BlY3RvciBwYW5lbHMuXG4gKi9cbmNvbnN0IFBBTkVMX0NMQVNTID0gJ2pwLUluc3BlY3Rvcic7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGluc3BlY3RvciBjb250ZW50LlxuICovXG5jb25zdCBDT05URU5UX0NMQVNTID0gJ2pwLUluc3BlY3Rvci1jb250ZW50Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gZGVmYXVsdCBpbnNwZWN0b3IgY29udGVudC5cbiAqL1xuY29uc3QgREVGQVVMVF9DT05URU5UX0NMQVNTID0gJ2pwLUluc3BlY3Rvci1kZWZhdWx0LWNvbnRlbnQnO1xuLyoqXG4gKiBBIHBhbmVsIHdoaWNoIGNvbnRhaW5zIGEgc2V0IG9mIGluc3BlY3RvcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnNwZWN0b3JQYW5lbCBleHRlbmRzIFBhbmVsIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYW4gaW5zcGVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9zb3VyY2UgPSBudWxsO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX3RyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuaW5pdGlhbENvbnRlbnQgaW5zdGFuY2VvZiBXaWRnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRlbnQgPSBvcHRpb25zLmluaXRpYWxDb250ZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluaXRpYWxDb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5fY29udGVudCA9IEluc3BlY3RvclBhbmVsLl9nZW5lcmF0ZUNvbnRlbnRXaWRnZXQoYDxwPiR7b3B0aW9ucy5pbml0aWFsQ29udGVudH08L3A+YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb250ZW50ID0gSW5zcGVjdG9yUGFuZWwuX2dlbmVyYXRlQ29udGVudFdpZGdldCgnPHA+JyArXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnMuX18oJ0NsaWNrIG9uIGEgZnVuY3Rpb24gdG8gc2VlIGRvY3VtZW50YXRpb24uJykgK1xuICAgICAgICAgICAgICAgICc8L3A+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRDbGFzcyhQQU5FTF9DTEFTUyk7XG4gICAgICAgIHRoaXMubGF5b3V0LmFkZFdpZGdldCh0aGlzLl9jb250ZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJpbnQgaW4gaWZyYW1lXG4gICAgICovXG4gICAgW1ByaW50aW5nLnN5bWJvbF0oKSB7XG4gICAgICAgIHJldHVybiAoKSA9PiBQcmludGluZy5wcmludFdpZGdldCh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHNvdXJjZSBvZiBldmVudHMgdGhlIGluc3BlY3RvciBwYW5lbCBsaXN0ZW5zIGZvci5cbiAgICAgKi9cbiAgICBnZXQgc291cmNlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc291cmNlO1xuICAgIH1cbiAgICBzZXQgc291cmNlKHNvdXJjZSkge1xuICAgICAgICBpZiAodGhpcy5fc291cmNlID09PSBzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBEaXNjb25uZWN0IG9sZCBzaWduYWwgaGFuZGxlci5cbiAgICAgICAgaWYgKHRoaXMuX3NvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5fc291cmNlLnN0YW5kYnkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fc291cmNlLmluc3BlY3RlZC5kaXNjb25uZWN0KHRoaXMub25JbnNwZWN0b3JVcGRhdGUsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fc291cmNlLmRpc3Bvc2VkLmRpc2Nvbm5lY3QodGhpcy5vblNvdXJjZURpc3Bvc2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZWplY3QgYSBzb3VyY2UgdGhhdCBpcyBhbHJlYWR5IGRpc3Bvc2VkLlxuICAgICAgICBpZiAoc291cmNlICYmIHNvdXJjZS5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICBzb3VyY2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVwZGF0ZSBzb3VyY2UuXG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgLy8gQ29ubmVjdCBuZXcgc2lnbmFsIGhhbmRsZXIuXG4gICAgICAgIGlmICh0aGlzLl9zb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZS5zdGFuZGJ5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9zb3VyY2UuaW5zcGVjdGVkLmNvbm5lY3QodGhpcy5vbkluc3BlY3RvclVwZGF0ZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9zb3VyY2UuZGlzcG9zZWQuY29ubmVjdCh0aGlzLm9uU291cmNlRGlzcG9zZWQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc291cmNlID0gbnVsbDtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgaW5zcGVjdG9yIHVwZGF0ZSBzaWduYWxzLlxuICAgICAqL1xuICAgIG9uSW5zcGVjdG9yVXBkYXRlKHNlbmRlciwgYXJncykge1xuICAgICAgICBjb25zdCB7IGNvbnRlbnQgfSA9IGFyZ3M7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgY29udGVudCBvZiB0aGUgaW5zcGVjdG9yIHdpZGdldC5cbiAgICAgICAgaWYgKCFjb250ZW50IHx8IGNvbnRlbnQgPT09IHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jb250ZW50LmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIGNvbnRlbnQuYWRkQ2xhc3MoQ09OVEVOVF9DTEFTUyk7XG4gICAgICAgIHRoaXMubGF5b3V0LmFkZFdpZGdldChjb250ZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHNvdXJjZSBkaXNwb3NlZCBzaWduYWxzLlxuICAgICAqL1xuICAgIG9uU291cmNlRGlzcG9zZWQoc2VuZGVyLCBhcmdzKSB7XG4gICAgICAgIHRoaXMuc291cmNlID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGUgY29udGVudCB3aWRnZXQgZnJvbSBzdHJpbmdcbiAgICAgKi9cbiAgICBzdGF0aWMgX2dlbmVyYXRlQ29udGVudFdpZGdldChtZXNzYWdlKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IG5ldyBXaWRnZXQoKTtcbiAgICAgICAgd2lkZ2V0Lm5vZGUuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICAgICAgd2lkZ2V0LmFkZENsYXNzKENPTlRFTlRfQ0xBU1MpO1xuICAgICAgICB3aWRnZXQuYWRkQ2xhc3MoREVGQVVMVF9DT05URU5UX0NMQVNTKTtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnNwZWN0b3IuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgRGF0YUNvbm5lY3RvciB9IGZyb20gJ0BqdXB5dGVybGFiL3N0YXRlZGInO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBjb25uZWN0b3IgZm9yIG1ha2luZyBpbnNwZWN0aW9uIHJlcXVlc3RzIGZyb20gdGhlIEp1cHl0ZXIgQVBJLlxuICovXG5leHBvcnQgY2xhc3MgS2VybmVsQ29ubmVjdG9yIGV4dGVuZHMgRGF0YUNvbm5lY3RvciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGtlcm5lbCBjb25uZWN0b3IgZm9yIGluc3BlY3Rpb24gcmVxdWVzdHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBpbnN0YW50aWF0aW9uIG9wdGlvbnMgZm9yIHRoZSBrZXJuZWwgY29ubmVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc2Vzc2lvbkNvbnRleHQgPSBvcHRpb25zLnNlc3Npb25Db250ZXh0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGZXRjaCBpbnNwZWN0aW9uIHJlcXVlc3RzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlcXVlc3QgLSBUaGUgaW5zcGVjdGlvbiByZXF1ZXN0IHRleHQgYW5kIGRldGFpbHMuXG4gICAgICovXG4gICAgZmV0Y2gocmVxdWVzdCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGtlcm5lbCA9IChfYSA9IHRoaXMuX3Nlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5rZXJuZWw7XG4gICAgICAgIGlmICgha2VybmVsKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdJbnNwZWN0aW9uIGZldGNoIHJlcXVpcmVzIGEga2VybmVsLicpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb250ZW50cyA9IHtcbiAgICAgICAgICAgIGNvZGU6IHJlcXVlc3QudGV4dCxcbiAgICAgICAgICAgIGN1cnNvcl9wb3M6IHJlcXVlc3Qub2Zmc2V0LFxuICAgICAgICAgICAgZGV0YWlsX2xldmVsOiAxXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBrZXJuZWwucmVxdWVzdEluc3BlY3QoY29udGVudHMpLnRoZW4obXNnID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gbXNnLmNvbnRlbnQ7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAnb2snIHx8ICFyZXNwb25zZS5mb3VuZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5zcGVjdGlvbiBmZXRjaCBmYWlsZWQgdG8gcmV0dXJuIHN1Y2Nlc3NmdWxseS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IHJlc3BvbnNlLmRhdGEsIG1ldGFkYXRhOiByZXNwb25zZS5tZXRhZGF0YSB9O1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXJuZWxjb25uZWN0b3IuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4gKiBUaGUgaW5zcGVjdG9yIHBhbmVsIHRva2VuLlxuICovXG5leHBvcnQgY29uc3QgSUluc3BlY3RvciA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvaW5zcGVjdG9yOklJbnNwZWN0b3InKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRva2Vucy5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9