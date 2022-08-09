(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_outputarea_lib_index_js"],{

/***/ "../../packages/outputarea/lib/index.js":
/*!**********************************************!*\
  !*** ../../packages/outputarea/lib/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutputAreaModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_0__.OutputAreaModel),
/* harmony export */   "OutputArea": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_1__.OutputArea),
/* harmony export */   "OutputPrompt": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_1__.OutputPrompt),
/* harmony export */   "SimplifiedOutputArea": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_1__.SimplifiedOutputArea),
/* harmony export */   "Stdin": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_1__.Stdin)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "../../packages/outputarea/lib/model.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget */ "../../packages/outputarea/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module outputarea
 */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/outputarea/lib/model.js":
/*!**********************************************!*\
  !*** ../../packages/outputarea/lib/model.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutputAreaModel": () => (/* binding */ OutputAreaModel)
/* harmony export */ });
/* harmony import */ var _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/nbformat */ "webpack/sharing/consume/default/@jupyterlab/nbformat/@jupyterlab/nbformat");
/* harmony import */ var _jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/observables */ "webpack/sharing/consume/default/@jupyterlab/observables/@jupyterlab/observables");
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_5__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.






/**
 * The default implementation of the IOutputAreaModel.
 */
class OutputAreaModel {
    /**
     * Construct a new observable outputs instance.
     */
    constructor(options = {}) {
        /**
         * A flag that is set when we want to clear the output area
         * *after* the next addition to it.
         */
        this.clearNext = false;
        this._trusted = false;
        this._isDisposed = false;
        this._stateChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__.Signal(this);
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__.Signal(this);
        this._trusted = !!options.trusted;
        this.contentFactory =
            options.contentFactory || OutputAreaModel.defaultContentFactory;
        this.list = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_1__.ObservableList();
        if (options.values) {
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(options.values, value => {
                this._add(value);
            });
        }
        this.list.changed.connect(this._onListChanged, this);
    }
    /**
     * A signal emitted when the model state changes.
     */
    get stateChanged() {
        return this._stateChanged;
    }
    /**
     * A signal emitted when the model changes.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Get the length of the items in the model.
     */
    get length() {
        return this.list ? this.list.length : 0;
    }
    /**
     * Get whether the model is trusted.
     */
    get trusted() {
        return this._trusted;
    }
    /**
     * Set whether the model is trusted.
     *
     * #### Notes
     * Changing the value will cause all of the models to re-set.
     */
    set trusted(value) {
        if (value === this._trusted) {
            return;
        }
        const trusted = (this._trusted = value);
        for (let i = 0; i < this.list.length; i++) {
            let item = this.list.get(i);
            const value = item.toJSON();
            item.dispose();
            item = this._createItem({ value, trusted });
            this.list.set(i, item);
        }
    }
    /**
     * Test whether the model is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources used by the model.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this.list.dispose();
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__.Signal.clearData(this);
    }
    /**
     * Get an item at the specified index.
     */
    get(index) {
        return this.list.get(index);
    }
    /**
     * Set the value at the specified index.
     */
    set(index, value) {
        value = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__.JSONExt.deepCopy(value);
        // Normalize stream data.
        Private.normalize(value);
        const item = this._createItem({ value, trusted: this._trusted });
        this.list.set(index, item);
    }
    /**
     * Add an output, which may be combined with previous output.
     *
     * @returns The total number of outputs.
     *
     * #### Notes
     * The output bundle is copied.
     * Contiguous stream outputs of the same `name` are combined.
     */
    add(output) {
        // If we received a delayed clear message, then clear now.
        if (this.clearNext) {
            this.clear();
            this.clearNext = false;
        }
        return this._add(output);
    }
    /**
     * Clear all of the output.
     *
     * @param wait Delay clearing the output until the next message is added.
     */
    clear(wait = false) {
        this._lastStream = '';
        if (wait) {
            this.clearNext = true;
            return;
        }
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(this.list, (item) => {
            item.dispose();
        });
        this.list.clear();
    }
    /**
     * Deserialize the model from JSON.
     *
     * #### Notes
     * This will clear any existing data.
     */
    fromJSON(values) {
        this.clear();
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(values, value => {
            this._add(value);
        });
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.toArray)((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.map)(this.list, (output) => output.toJSON()));
    }
    /**
     * Add a copy of the item to the list.
     */
    _add(value) {
        const trusted = this._trusted;
        value = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__.JSONExt.deepCopy(value);
        // Normalize the value.
        Private.normalize(value);
        // Consolidate outputs if they are stream outputs of the same kind.
        if (_jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__.isStream(value) &&
            this._lastStream &&
            value.name === this._lastName &&
            this.shouldCombine({
                value,
                lastModel: this.list.get(this.length - 1)
            })) {
            // In order to get a list change event, we add the previous
            // text to the current item and replace the previous item.
            // This also replaces the metadata of the last item.
            this._lastStream += value.text;
            this._lastStream = Private.removeOverwrittenChars(this._lastStream);
            value.text = this._lastStream;
            const item = this._createItem({ value, trusted });
            const index = this.length - 1;
            const prev = this.list.get(index);
            prev.dispose();
            this.list.set(index, item);
            return index;
        }
        if (_jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__.isStream(value)) {
            value.text = Private.removeOverwrittenChars(value.text);
        }
        // Create the new item.
        const item = this._createItem({ value, trusted });
        // Update the stream information.
        if (_jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__.isStream(value)) {
            this._lastStream = value.text;
            this._lastName = value.name;
        }
        else {
            this._lastStream = '';
        }
        // Add the item to our list and return the new length.
        return this.list.push(item);
    }
    /**
     * Whether a new value should be consolidated with the previous output.
     *
     * This will only be called if the minimal criteria of both being stream
     * messages of the same type.
     */
    shouldCombine(options) {
        return true;
    }
    /**
     * Create an output item and hook up its signals.
     */
    _createItem(options) {
        const factory = this.contentFactory;
        const item = factory.createOutputModel(options);
        item.changed.connect(this._onGenericChange, this);
        return item;
    }
    /**
     * Handle a change to the list.
     */
    _onListChanged(sender, args) {
        this._changed.emit(args);
    }
    /**
     * Handle a change to an item.
     */
    _onGenericChange() {
        this._stateChanged.emit(void 0);
    }
}
/**
 * The namespace for OutputAreaModel class statics.
 */
(function (OutputAreaModel) {
    /**
     * The default implementation of a `IModelOutputFactory`.
     */
    class ContentFactory {
        /**
         * Create an output model.
         */
        createOutputModel(options) {
            return new _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__.OutputModel(options);
        }
    }
    OutputAreaModel.ContentFactory = ContentFactory;
    /**
     * The default output model factory.
     */
    OutputAreaModel.defaultContentFactory = new ContentFactory();
})(OutputAreaModel || (OutputAreaModel = {}));
/**
 * A namespace for module-private functionality.
 */
var Private;
(function (Private) {
    /**
     * Normalize an output.
     */
    function normalize(value) {
        if (_jupyterlab_nbformat__WEBPACK_IMPORTED_MODULE_0__.isStream(value)) {
            if (Array.isArray(value.text)) {
                value.text = value.text.join('\n');
            }
        }
    }
    Private.normalize = normalize;
    /**
     * Remove characters that are overridden by backspace characters.
     */
    function fixBackspace(txt) {
        let tmp = txt;
        do {
            txt = tmp;
            // Cancel out anything-but-newline followed by backspace
            tmp = txt.replace(/[^\n]\x08/gm, ''); // eslint-disable-line no-control-regex
        } while (tmp.length < txt.length);
        return txt;
    }
    /**
     * Remove chunks that should be overridden by the effect of
     * carriage return characters.
     */
    function fixCarriageReturn(txt) {
        txt = txt.replace(/\r+\n/gm, '\n'); // \r followed by \n --> newline
        while (txt.search(/\r[^$]/g) > -1) {
            const base = txt.match(/^(.*)\r+/m)[1];
            let insert = txt.match(/\r+(.*)$/m)[1];
            insert = insert + base.slice(insert.length, base.length);
            txt = txt.replace(/\r+.*$/m, '\r').replace(/^.*\r/m, insert);
        }
        return txt;
    }
    /*
     * Remove characters overridden by backspaces and carriage returns
     */
    function removeOverwrittenChars(text) {
        return fixCarriageReturn(fixBackspace(text));
    }
    Private.removeOverwrittenChars = removeOverwrittenChars;
})(Private || (Private = {}));
//# sourceMappingURL=model.js.map

/***/ }),

/***/ "../../packages/outputarea/lib/widget.js":
/*!***********************************************!*\
  !*** ../../packages/outputarea/lib/widget.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutputArea": () => (/* binding */ OutputArea),
/* harmony export */   "SimplifiedOutputArea": () => (/* binding */ SimplifiedOutputArea),
/* harmony export */   "OutputPrompt": () => (/* binding */ OutputPrompt),
/* harmony export */   "Stdin": () => (/* binding */ Stdin)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/properties */ "webpack/sharing/consume/default/@lumino/properties/@lumino/properties?140a");
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_properties__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! resize-observer-polyfill */ "../../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * The class name added to an output area widget.
 */
const OUTPUT_AREA_CLASS = 'jp-OutputArea';
/**
 * The class name added to the direction children of OutputArea
 */
const OUTPUT_AREA_ITEM_CLASS = 'jp-OutputArea-child';
/**
 * The class name added to actual outputs
 */
const OUTPUT_AREA_OUTPUT_CLASS = 'jp-OutputArea-output';
/**
 * The class name added to prompt children of OutputArea.
 */
const OUTPUT_AREA_PROMPT_CLASS = 'jp-OutputArea-prompt';
/**
 * The class name added to OutputPrompt.
 */
const OUTPUT_PROMPT_CLASS = 'jp-OutputPrompt';
/**
 * The class name added to an execution result.
 */
const EXECUTE_CLASS = 'jp-OutputArea-executeResult';
/**
 * The class name added stdin items of OutputArea
 */
const OUTPUT_AREA_STDIN_ITEM_CLASS = 'jp-OutputArea-stdin-item';
/**
 * The class name added to stdin widgets.
 */
const STDIN_CLASS = 'jp-Stdin';
/**
 * The class name added to stdin data prompt nodes.
 */
const STDIN_PROMPT_CLASS = 'jp-Stdin-prompt';
/**
 * The class name added to stdin data input nodes.
 */
const STDIN_INPUT_CLASS = 'jp-Stdin-input';
/** ****************************************************************************
 * OutputArea
 ******************************************************************************/
/**
 * An output area widget.
 *
 * #### Notes
 * The widget model must be set separately and can be changed
 * at any time.  Consumers of the widget must account for a
 * `null` model, and may want to listen to the `modelChanged`
 * signal.
 */
class OutputArea extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Widget {
    /**
     * Construct an output area widget.
     */
    constructor(options) {
        super();
        /**
         * A public signal used to indicate the number of outputs has changed.
         *
         * #### Notes
         * This is useful for parents who want to apply styling based on the number
         * of outputs. Emits the current number of outputs.
         */
        this.outputLengthChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_4__.Signal(this);
        /**
         * Handle an iopub message.
         */
        this._onIOPub = (msg) => {
            const model = this.model;
            const msgType = msg.header.msg_type;
            let output;
            const transient = (msg.content.transient || {});
            const displayId = transient['display_id'];
            let targets;
            switch (msgType) {
                case 'execute_result':
                case 'display_data':
                case 'stream':
                case 'error':
                    output = Object.assign(Object.assign({}, msg.content), { output_type: msgType });
                    model.add(output);
                    break;
                case 'clear_output': {
                    const wait = msg.content.wait;
                    model.clear(wait);
                    break;
                }
                case 'update_display_data':
                    output = Object.assign(Object.assign({}, msg.content), { output_type: 'display_data' });
                    targets = this._displayIdMap.get(displayId);
                    if (targets) {
                        for (const index of targets) {
                            model.set(index, output);
                        }
                    }
                    break;
                default:
                    break;
            }
            if (displayId && msgType === 'display_data') {
                targets = this._displayIdMap.get(displayId) || [];
                targets.push(model.length - 1);
                this._displayIdMap.set(displayId, targets);
            }
        };
        /**
         * Handle an execute reply message.
         */
        this._onExecuteReply = (msg) => {
            // API responses that contain a pager are special cased and their type
            // is overridden from 'execute_reply' to 'display_data' in order to
            // render output.
            const model = this.model;
            const content = msg.content;
            if (content.status !== 'ok') {
                return;
            }
            const payload = content && content.payload;
            if (!payload || !payload.length) {
                return;
            }
            const pages = payload.filter((i) => i.source === 'page');
            if (!pages.length) {
                return;
            }
            const page = JSON.parse(JSON.stringify(pages[0]));
            const output = {
                output_type: 'display_data',
                data: page.data,
                metadata: {}
            };
            model.add(output);
        };
        this._minHeightTimeout = null;
        this._displayIdMap = new Map();
        this._outputTracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.WidgetTracker({
            namespace: _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.UUID.uuid4()
        });
        const model = (this.model = options.model);
        this.addClass(OUTPUT_AREA_CLASS);
        this.rendermime = options.rendermime;
        this.contentFactory =
            options.contentFactory || OutputArea.defaultContentFactory;
        this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.PanelLayout();
        this.trimmedOutputModels = new Array();
        this.maxNumberOutputs = options.maxNumberOutputs || 0;
        this.headEndIndex = this.maxNumberOutputs;
        for (let i = 0; i < model.length; i++) {
            const output = model.get(i);
            this._insertOutput(i, output);
        }
        model.changed.connect(this.onModelChanged, this);
        model.stateChanged.connect(this.onStateChanged, this);
    }
    /**
     * A read-only sequence of the children widgets in the output area.
     */
    get widgets() {
        return this.layout.widgets;
    }
    /**
     * The kernel future associated with the output area.
     */
    get future() {
        return this._future;
    }
    set future(value) {
        // Bail if the model is disposed.
        if (this.model.isDisposed) {
            throw Error('Model is disposed');
        }
        if (this._future === value) {
            return;
        }
        if (this._future) {
            this._future.dispose();
        }
        this._future = value;
        this.model.clear();
        // Make sure there were no input widgets.
        if (this.widgets.length) {
            this._clear();
            this.outputLengthChanged.emit(this.model.length);
        }
        // Handle published messages.
        value.onIOPub = this._onIOPub;
        // Handle the execute reply.
        value.onReply = this._onExecuteReply;
        // Handle stdin.
        value.onStdin = msg => {
            if (_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.KernelMessage.isInputRequestMsg(msg)) {
                this.onInputRequest(msg, value);
            }
        };
    }
    /**
     * Dispose of the resources used by the output area.
     */
    dispose() {
        if (this._future) {
            this._future.dispose();
            this._future = null;
        }
        this._displayIdMap.clear();
        this._outputTracker.dispose();
        super.dispose();
    }
    /**
     * Follow changes on the model state.
     */
    onModelChanged(sender, args) {
        switch (args.type) {
            case 'add':
                this._insertOutput(args.newIndex, args.newValues[0]);
                this.outputLengthChanged.emit(this.model.length);
                break;
            case 'remove':
                if (this.widgets.length) {
                    // all items removed from model
                    if (this.model.length === 0) {
                        this._clear();
                    }
                    else {
                        // range of items removed from model
                        // remove widgets corresponding to removed model items
                        const startIndex = args.oldIndex;
                        for (let i = 0; i < args.oldValues.length && startIndex < this.widgets.length; ++i) {
                            const widget = this.widgets[startIndex];
                            widget.parent = null;
                            widget.dispose();
                        }
                        // apply item offset to target model item indices in _displayIdMap
                        this._moveDisplayIdIndices(startIndex, args.oldValues.length);
                        // prevent jitter caused by immediate height change
                        this._preventHeightChangeJitter();
                    }
                    this.outputLengthChanged.emit(this.model.length);
                }
                break;
            case 'set':
                this._setOutput(args.newIndex, args.newValues[0]);
                this.outputLengthChanged.emit(this.model.length);
                break;
            default:
                break;
        }
    }
    /**
     * Update indices in _displayIdMap in response to element remove from model items
     * *
     * @param startIndex - The index of first element removed
     *
     * @param count - The number of elements removed from model items
     *
     */
    _moveDisplayIdIndices(startIndex, count) {
        this._displayIdMap.forEach((indices) => {
            const rangeEnd = startIndex + count;
            const numIndices = indices.length;
            // reverse loop in order to prevent removing element affecting the index
            for (let i = numIndices - 1; i >= 0; --i) {
                const index = indices[i];
                // remove model item indices in removed range
                if (index >= startIndex && index < rangeEnd) {
                    indices.splice(i, 1);
                }
                else if (index >= rangeEnd) {
                    // move model item indices that were larger than range end
                    indices[i] -= count;
                }
            }
        });
    }
    /**
     * Follow changes on the output model state.
     */
    onStateChanged(sender) {
        this.trimmedOutputModels = new Array();
        for (let i = 0; i < this.model.length; i++) {
            this._setOutput(i, this.model.get(i));
        }
        this.outputLengthChanged.emit(this.model.length);
    }
    /**
     * Clear the widget inputs and outputs.
     */
    _clear() {
        // Bail if there is no work to do.
        if (!this.widgets.length) {
            return;
        }
        // Remove all of our widgets.
        const length = this.widgets.length;
        for (let i = 0; i < length; i++) {
            const widget = this.widgets[0];
            widget.parent = null;
            widget.dispose();
        }
        // Clear the display id map.
        this._displayIdMap.clear();
        // prevent jitter caused by immediate height change
        this._preventHeightChangeJitter();
    }
    _preventHeightChangeJitter() {
        // When an output area is cleared and then quickly replaced with new
        // content (as happens with @interact in widgets, for example), the
        // quickly changing height can make the page jitter.
        // We introduce a small delay in the minimum height
        // to prevent this jitter.
        const rect = this.node.getBoundingClientRect();
        this.node.style.minHeight = `${rect.height}px`;
        if (this._minHeightTimeout) {
            window.clearTimeout(this._minHeightTimeout);
        }
        this._minHeightTimeout = window.setTimeout(() => {
            if (this.isDisposed) {
                return;
            }
            this.node.style.minHeight = '';
        }, 50);
    }
    /**
     * Handle an input request from a kernel.
     */
    onInputRequest(msg, future) {
        // Add an output widget to the end.
        const factory = this.contentFactory;
        const stdinPrompt = msg.content.prompt;
        const password = msg.content.password;
        const panel = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Panel();
        panel.addClass(OUTPUT_AREA_ITEM_CLASS);
        panel.addClass(OUTPUT_AREA_STDIN_ITEM_CLASS);
        const prompt = factory.createOutputPrompt();
        prompt.addClass(OUTPUT_AREA_PROMPT_CLASS);
        panel.addWidget(prompt);
        const input = factory.createStdin({
            parent_header: msg.header,
            prompt: stdinPrompt,
            password,
            future
        });
        input.addClass(OUTPUT_AREA_OUTPUT_CLASS);
        panel.addWidget(input);
        const layout = this.layout;
        layout.addWidget(panel);
        /**
         * Wait for the stdin to complete, add it to the model (so it persists)
         * and remove the stdin widget.
         */
        void input.value.then(value => {
            // Use stdin as the stream so it does not get combined with stdout.
            this.model.add({
                output_type: 'stream',
                name: 'stdin',
                text: value + '\n'
            });
            panel.dispose();
        });
    }
    /**
     * Update an output in the layout in place.
     */
    _setOutput(index, model) {
        if (index >= this.headEndIndex && this.maxNumberOutputs !== 0) {
            this.trimmedOutputModels[index - this.headEndIndex] = model;
            return;
        }
        const layout = this.layout;
        const panel = layout.widgets[index];
        const renderer = (panel.widgets
            ? panel.widgets[1]
            : panel);
        // Check whether it is safe to reuse renderer:
        // - Preferred mime type has not changed
        // - Isolation has not changed
        const mimeType = this.rendermime.preferredMimeType(model.data, model.trusted ? 'any' : 'ensure');
        if (renderer.renderModel &&
            Private.currentPreferredMimetype.get(renderer) === mimeType &&
            OutputArea.isIsolated(mimeType, model.metadata) ===
                renderer instanceof Private.IsolatedRenderer) {
            void renderer.renderModel(model);
        }
        else {
            layout.widgets[index].dispose();
            this._insertOutput(index, model);
        }
    }
    /**
     * Render and insert a single output into the layout.
     *
     * @param index - The index of the output to be inserted.
     * @param model - The model of the output to be inserted.
     */
    _insertOutput(index, model) {
        if (index === 0) {
            this.trimmedOutputModels = new Array();
        }
        if (index === this.maxNumberOutputs && this.maxNumberOutputs !== 0) {
            // TODO Improve style of the display message.
            const separatorModel = this.model.contentFactory.createOutputModel({
                value: {
                    output_type: 'display_data',
                    data: {
                        'text/html': `
              <a style="margin: 10px; text-decoration: none; cursor: pointer;">
                <pre>Output of this cell has been trimmed on the initial display.</pre>
                <pre>Displaying the first ${this.maxNumberOutputs} top outputs.</pre>
                <pre>Click on this message to get the complete output.</pre>
              </a>
              `
                    }
                }
            });
            const onClick = () => this._showTrimmedOutputs();
            const separator = this.createOutputItem(separatorModel);
            separator.node.addEventListener('click', onClick);
            const layout = this.layout;
            layout.insertWidget(this.headEndIndex, separator);
        }
        const output = this._createOutput(model);
        const layout = this.layout;
        if (index < this.maxNumberOutputs || this.maxNumberOutputs === 0) {
            layout.insertWidget(index, output);
        }
        if (index >= this.maxNumberOutputs && this.maxNumberOutputs !== 0) {
            this.trimmedOutputModels.push(model);
        }
        if (!this._outputTracker.has(output)) {
            void this._outputTracker.add(output);
        }
    }
    _createOutput(model) {
        let output = this.createOutputItem(model);
        if (output) {
            output.toggleClass(EXECUTE_CLASS, model.executionCount !== null);
        }
        else {
            output = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Widget();
        }
        return output;
    }
    /**
     * A widget tracker for individual output widgets in the output area.
     */
    get outputTracker() {
        return this._outputTracker;
    }
    /**
     * Remove the information message related to the trimmed output
     * and show all previously trimmed outputs.
     */
    _showTrimmedOutputs() {
        const layout = this.layout;
        layout.removeWidgetAt(this.headEndIndex);
        for (let i = 0; i < this.trimmedOutputModels.length; i++) {
            const output = this._createOutput(this.trimmedOutputModels[i]);
            layout.insertWidget(this.headEndIndex + i, output);
        }
    }
    /**
     * Create an output item with a prompt and actual output
     *
     * @returns a rendered widget, or null if we cannot render
     * #### Notes
     */
    createOutputItem(model) {
        const output = this.createRenderedMimetype(model);
        if (!output) {
            return null;
        }
        const panel = new Private.OutputPanel();
        panel.addClass(OUTPUT_AREA_ITEM_CLASS);
        const prompt = this.contentFactory.createOutputPrompt();
        prompt.executionCount = model.executionCount;
        prompt.addClass(OUTPUT_AREA_PROMPT_CLASS);
        panel.addWidget(prompt);
        output.addClass(OUTPUT_AREA_OUTPUT_CLASS);
        panel.addWidget(output);
        return panel;
    }
    /**
     * Render a mimetype
     */
    createRenderedMimetype(model) {
        const mimeType = this.rendermime.preferredMimeType(model.data, model.trusted ? 'any' : 'ensure');
        if (!mimeType) {
            return null;
        }
        let output = this.rendermime.createRenderer(mimeType);
        const isolated = OutputArea.isIsolated(mimeType, model.metadata);
        if (isolated === true) {
            output = new Private.IsolatedRenderer(output);
        }
        Private.currentPreferredMimetype.set(output, mimeType);
        output.renderModel(model).catch(error => {
            // Manually append error message to output
            const pre = document.createElement('pre');
            pre.textContent = `Javascript Error: ${error.message}`;
            output.node.appendChild(pre);
            // Remove mime-type-specific CSS classes
            output.node.className = 'lm-Widget jp-RenderedText';
            output.node.setAttribute('data-mime-type', 'application/vnd.jupyter.stderr');
        });
        return output;
    }
}
class SimplifiedOutputArea extends OutputArea {
    /**
     * Handle an input request from a kernel by doing nothing.
     */
    onInputRequest(msg, future) {
        return;
    }
    /**
     * Create an output item without a prompt, just the output widgets
     */
    createOutputItem(model) {
        const output = this.createRenderedMimetype(model);
        if (output) {
            output.addClass(OUTPUT_AREA_OUTPUT_CLASS);
        }
        return output;
    }
}
/**
 * A namespace for OutputArea statics.
 */
(function (OutputArea) {
    /**
     * Execute code on an output area.
     */
    async function execute(code, output, sessionContext, metadata) {
        var _a;
        // Override the default for `stop_on_error`.
        let stopOnError = true;
        if (metadata &&
            Array.isArray(metadata.tags) &&
            metadata.tags.indexOf('raises-exception') !== -1) {
            stopOnError = false;
        }
        const content = {
            code,
            stop_on_error: stopOnError
        };
        const kernel = (_a = sessionContext.session) === null || _a === void 0 ? void 0 : _a.kernel;
        if (!kernel) {
            throw new Error('Session has no kernel.');
        }
        const future = kernel.requestExecute(content, false, metadata);
        output.future = future;
        return future.done;
    }
    OutputArea.execute = execute;
    function isIsolated(mimeType, metadata) {
        const mimeMd = metadata[mimeType];
        // mime-specific higher priority
        if (mimeMd && mimeMd['isolated'] !== undefined) {
            return !!mimeMd['isolated'];
        }
        else {
            // fallback on global
            return !!metadata['isolated'];
        }
    }
    OutputArea.isIsolated = isIsolated;
    /**
     * The default implementation of `IContentFactory`.
     */
    class ContentFactory {
        /**
         * Create the output prompt for the widget.
         */
        createOutputPrompt() {
            return new OutputPrompt();
        }
        /**
         * Create an stdin widget.
         */
        createStdin(options) {
            return new Stdin(options);
        }
    }
    OutputArea.ContentFactory = ContentFactory;
    /**
     * The default `ContentFactory` instance.
     */
    OutputArea.defaultContentFactory = new ContentFactory();
})(OutputArea || (OutputArea = {}));
/**
 * The default output prompt implementation
 */
class OutputPrompt extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Widget {
    /*
     * Create an output prompt widget.
     */
    constructor() {
        super();
        this._executionCount = null;
        this.addClass(OUTPUT_PROMPT_CLASS);
    }
    /**
     * The execution count for the prompt.
     */
    get executionCount() {
        return this._executionCount;
    }
    set executionCount(value) {
        this._executionCount = value;
        if (value === null) {
            this.node.textContent = '';
        }
        else {
            this.node.textContent = `[${value}]:`;
        }
    }
}
/**
 * The default stdin widget.
 */
class Stdin extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Widget {
    /**
     * Construct a new input widget.
     */
    constructor(options) {
        super({
            node: Private.createInputWidgetNode(options.prompt, options.password)
        });
        this._promise = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.PromiseDelegate();
        this.addClass(STDIN_CLASS);
        this._input = this.node.getElementsByTagName('input')[0];
        this._input.focus();
        this._future = options.future;
        this._parent_header = options.parent_header;
        this._value = options.prompt + ' ';
    }
    /**
     * The value of the widget.
     */
    get value() {
        return this._promise.promise.then(() => this._value);
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
        const input = this._input;
        if (event.type === 'keydown') {
            if (event.keyCode === 13) {
                // Enter
                this._future.sendInputReply({
                    status: 'ok',
                    value: input.value
                }, this._parent_header);
                if (input.type === 'password') {
                    this._value += Array(input.value.length + 1).join('·');
                }
                else {
                    this._value += input.value;
                }
                this._promise.resolve(void 0);
            }
        }
    }
    /**
     * Handle `after-attach` messages sent to the widget.
     */
    onAfterAttach(msg) {
        this._input.addEventListener('keydown', this);
        this.update();
    }
    /**
     * Handle `update-request` messages sent to the widget.
     */
    onUpdateRequest(msg) {
        this._input.focus();
    }
    /**
     * Handle `before-detach` messages sent to the widget.
     */
    onBeforeDetach(msg) {
        this._input.removeEventListener('keydown', this);
    }
}
/** ****************************************************************************
 * Private namespace
 ******************************************************************************/
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * Create the node for an InputWidget.
     */
    function createInputWidgetNode(prompt, password) {
        const node = document.createElement('div');
        const promptNode = document.createElement('pre');
        promptNode.className = STDIN_PROMPT_CLASS;
        promptNode.textContent = prompt;
        const input = document.createElement('input');
        input.className = STDIN_INPUT_CLASS;
        if (password) {
            input.type = 'password';
        }
        node.appendChild(promptNode);
        promptNode.appendChild(input);
        return node;
    }
    Private.createInputWidgetNode = createInputWidgetNode;
    /**
     * A renderer for IFrame data.
     */
    class IsolatedRenderer extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Widget {
        /**
         * Create an isolated renderer.
         */
        constructor(wrapped) {
            super({ node: document.createElement('iframe') });
            this.addClass('jp-mod-isolated');
            this._wrapped = wrapped;
            // Once the iframe is loaded, the subarea is dynamically inserted
            const iframe = this.node;
            iframe.frameBorder = '0';
            iframe.scrolling = 'auto';
            iframe.addEventListener('load', () => {
                // Workaround needed by Firefox, to properly render svg inside
                // iframes, see https://stackoverflow.com/questions/10177190/
                // svg-dynamically-added-to-iframe-does-not-render-correctly
                iframe.contentDocument.open();
                // Insert the subarea into the iframe
                // We must directly write the html. At this point, subarea doesn't
                // contain any user content.
                iframe.contentDocument.write(this._wrapped.node.innerHTML);
                iframe.contentDocument.close();
                const body = iframe.contentDocument.body;
                // Adjust the iframe height automatically
                iframe.style.height = `${body.scrollHeight}px`;
                iframe.heightChangeObserver = new resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_6__.default(() => {
                    iframe.style.height = `${body.scrollHeight}px`;
                });
                iframe.heightChangeObserver.observe(body);
            });
        }
        /**
         * Render a mime model.
         *
         * @param model - The mime model to render.
         *
         * @returns A promise which resolves when rendering is complete.
         *
         * #### Notes
         * This method may be called multiple times during the lifetime
         * of the widget to update it if and when new data is available.
         */
        renderModel(model) {
            return this._wrapped.renderModel(model);
        }
    }
    Private.IsolatedRenderer = IsolatedRenderer;
    Private.currentPreferredMimetype = new _lumino_properties__WEBPACK_IMPORTED_MODULE_3__.AttachedProperty({
        name: 'preferredMimetype',
        create: owner => ''
    });
    /**
     * A `Panel` that's focused by a `contextmenu` event.
     */
    class OutputPanel extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Panel {
        /**
         * Construct a new `OutputPanel` widget.
         */
        constructor(options) {
            super(options);
        }
        /**
         * A callback that focuses on the widget.
         */
        _onContext(_) {
            this.node.focus();
        }
        /**
         * Handle `after-attach` messages sent to the widget.
         */
        onAfterAttach(msg) {
            super.onAfterAttach(msg);
            this.node.addEventListener('contextmenu', this._onContext.bind(this));
        }
        /**
         * Handle `before-detach` messages sent to the widget.
         */
        onBeforeDetach(msg) {
            super.onAfterDetach(msg);
            this.node.removeEventListener('contextmenu', this._onContext.bind(this));
        }
    }
    Private.OutputPanel = OutputPanel;
})(Private || (Private = {}));
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvb3V0cHV0YXJlYS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL291dHB1dGFyZWEvbGliL21vZGVsLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9vdXRwdXRhcmVhL2xpYi93aWRnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN3QjtBQUNDO0FBQ3pCLGlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ2lEO0FBQ1E7QUFDSjtBQUNFO0FBQ1g7QUFDRDtBQUMzQztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxxREFBTTtBQUN2Qyw0QkFBNEIscURBQU07QUFDbEM7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1FQUFjO0FBQ3RDO0FBQ0EsWUFBWSx1REFBSTtBQUNoQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsaUJBQWlCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLG1EQUFNO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlDQUF5QztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsa0JBQWtCO0FBQzNELGtEQUFrRCw2REFBYztBQUNoRSw2Q0FBNkMsa0JBQWtCO0FBQy9ELGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGdFQUFnQjtBQUMzRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixrREFBSztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMEJBQTBCO0FBQzNCLGtDIiwiZmlsZSI6InBhY2thZ2VzX291dHB1dGFyZWFfbGliX2luZGV4X2pzLjAwMTNhNzk2YjQ2ZTE4YzA4ZDBmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgb3V0cHV0YXJlYVxuICovXG5leHBvcnQgKiBmcm9tICcuL21vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vd2lkZ2V0Jztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCAqIGFzIG5iZm9ybWF0IGZyb20gJ0BqdXB5dGVybGFiL25iZm9ybWF0JztcbmltcG9ydCB7IE9ic2VydmFibGVMaXN0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvb2JzZXJ2YWJsZXMnO1xuaW1wb3J0IHsgT3V0cHV0TW9kZWwgfSBmcm9tICdAanVweXRlcmxhYi9yZW5kZXJtaW1lJztcbmltcG9ydCB7IGVhY2gsIG1hcCwgdG9BcnJheSB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG4vKipcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBJT3V0cHV0QXJlYU1vZGVsLlxuICovXG5leHBvcnQgY2xhc3MgT3V0cHV0QXJlYU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgb2JzZXJ2YWJsZSBvdXRwdXRzIGluc3RhbmNlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBmbGFnIHRoYXQgaXMgc2V0IHdoZW4gd2Ugd2FudCB0byBjbGVhciB0aGUgb3V0cHV0IGFyZWFcbiAgICAgICAgICogKmFmdGVyKiB0aGUgbmV4dCBhZGRpdGlvbiB0byBpdC5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY2xlYXJOZXh0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3RydXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdHJ1c3RlZCA9ICEhb3B0aW9ucy50cnVzdGVkO1xuICAgICAgICB0aGlzLmNvbnRlbnRGYWN0b3J5ID1cbiAgICAgICAgICAgIG9wdGlvbnMuY29udGVudEZhY3RvcnkgfHwgT3V0cHV0QXJlYU1vZGVsLmRlZmF1bHRDb250ZW50RmFjdG9yeTtcbiAgICAgICAgdGhpcy5saXN0ID0gbmV3IE9ic2VydmFibGVMaXN0KCk7XG4gICAgICAgIGlmIChvcHRpb25zLnZhbHVlcykge1xuICAgICAgICAgICAgZWFjaChvcHRpb25zLnZhbHVlcywgdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZCh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3QuY2hhbmdlZC5jb25uZWN0KHRoaXMuX29uTGlzdENoYW5nZWQsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIG1vZGVsIHN0YXRlIGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IHN0YXRlQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBtb2RlbCBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGdldCBjaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsZW5ndGggb2YgdGhlIGl0ZW1zIGluIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0ID8gdGhpcy5saXN0Lmxlbmd0aCA6IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB3aGV0aGVyIHRoZSBtb2RlbCBpcyB0cnVzdGVkLlxuICAgICAqL1xuICAgIGdldCB0cnVzdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHJ1c3RlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHdoZXRoZXIgdGhlIG1vZGVsIGlzIHRydXN0ZWQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogQ2hhbmdpbmcgdGhlIHZhbHVlIHdpbGwgY2F1c2UgYWxsIG9mIHRoZSBtb2RlbHMgdG8gcmUtc2V0LlxuICAgICAqL1xuICAgIHNldCB0cnVzdGVkKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5fdHJ1c3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRydXN0ZWQgPSAodGhpcy5fdHJ1c3RlZCA9IHZhbHVlKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5saXN0LmdldChpKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaXRlbS50b0pTT04oKTtcbiAgICAgICAgICAgIGl0ZW0uZGlzcG9zZSgpO1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuX2NyZWF0ZUl0ZW0oeyB2YWx1ZSwgdHJ1c3RlZCB9KTtcbiAgICAgICAgICAgIHRoaXMubGlzdC5zZXQoaSwgaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBtb2RlbCBpcyBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMubGlzdC5kaXNwb3NlKCk7XG4gICAgICAgIFNpZ25hbC5jbGVhckRhdGEodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhbiBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICovXG4gICAgZ2V0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QuZ2V0KGluZGV4KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB2YWx1ZSBhdCB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgICAqL1xuICAgIHNldChpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgdmFsdWUgPSBKU09ORXh0LmRlZXBDb3B5KHZhbHVlKTtcbiAgICAgICAgLy8gTm9ybWFsaXplIHN0cmVhbSBkYXRhLlxuICAgICAgICBQcml2YXRlLm5vcm1hbGl6ZSh2YWx1ZSk7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9jcmVhdGVJdGVtKHsgdmFsdWUsIHRydXN0ZWQ6IHRoaXMuX3RydXN0ZWQgfSk7XG4gICAgICAgIHRoaXMubGlzdC5zZXQoaW5kZXgsIGl0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gb3V0cHV0LCB3aGljaCBtYXkgYmUgY29tYmluZWQgd2l0aCBwcmV2aW91cyBvdXRwdXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgdG90YWwgbnVtYmVyIG9mIG91dHB1dHMuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlIG91dHB1dCBidW5kbGUgaXMgY29waWVkLlxuICAgICAqIENvbnRpZ3VvdXMgc3RyZWFtIG91dHB1dHMgb2YgdGhlIHNhbWUgYG5hbWVgIGFyZSBjb21iaW5lZC5cbiAgICAgKi9cbiAgICBhZGQob3V0cHV0KSB7XG4gICAgICAgIC8vIElmIHdlIHJlY2VpdmVkIGEgZGVsYXllZCBjbGVhciBtZXNzYWdlLCB0aGVuIGNsZWFyIG5vdy5cbiAgICAgICAgaWYgKHRoaXMuY2xlYXJOZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmNsZWFyTmV4dCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGQob3V0cHV0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIG9mIHRoZSBvdXRwdXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2FpdCBEZWxheSBjbGVhcmluZyB0aGUgb3V0cHV0IHVudGlsIHRoZSBuZXh0IG1lc3NhZ2UgaXMgYWRkZWQuXG4gICAgICovXG4gICAgY2xlYXIod2FpdCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuX2xhc3RTdHJlYW0gPSAnJztcbiAgICAgICAgaWYgKHdhaXQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlYWNoKHRoaXMubGlzdCwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGl0ZW0uZGlzcG9zZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5saXN0LmNsZWFyKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlc2VyaWFsaXplIHRoZSBtb2RlbCBmcm9tIEpTT04uXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyB3aWxsIGNsZWFyIGFueSBleGlzdGluZyBkYXRhLlxuICAgICAqL1xuICAgIGZyb21KU09OKHZhbHVlcykge1xuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIGVhY2godmFsdWVzLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9hZGQodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplIHRoZSBtb2RlbCB0byBKU09OLlxuICAgICAqL1xuICAgIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRvQXJyYXkobWFwKHRoaXMubGlzdCwgKG91dHB1dCkgPT4gb3V0cHV0LnRvSlNPTigpKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIGNvcHkgb2YgdGhlIGl0ZW0gdG8gdGhlIGxpc3QuXG4gICAgICovXG4gICAgX2FkZCh2YWx1ZSkge1xuICAgICAgICBjb25zdCB0cnVzdGVkID0gdGhpcy5fdHJ1c3RlZDtcbiAgICAgICAgdmFsdWUgPSBKU09ORXh0LmRlZXBDb3B5KHZhbHVlKTtcbiAgICAgICAgLy8gTm9ybWFsaXplIHRoZSB2YWx1ZS5cbiAgICAgICAgUHJpdmF0ZS5ub3JtYWxpemUodmFsdWUpO1xuICAgICAgICAvLyBDb25zb2xpZGF0ZSBvdXRwdXRzIGlmIHRoZXkgYXJlIHN0cmVhbSBvdXRwdXRzIG9mIHRoZSBzYW1lIGtpbmQuXG4gICAgICAgIGlmIChuYmZvcm1hdC5pc1N0cmVhbSh2YWx1ZSkgJiZcbiAgICAgICAgICAgIHRoaXMuX2xhc3RTdHJlYW0gJiZcbiAgICAgICAgICAgIHZhbHVlLm5hbWUgPT09IHRoaXMuX2xhc3ROYW1lICYmXG4gICAgICAgICAgICB0aGlzLnNob3VsZENvbWJpbmUoe1xuICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgIGxhc3RNb2RlbDogdGhpcy5saXN0LmdldCh0aGlzLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgLy8gSW4gb3JkZXIgdG8gZ2V0IGEgbGlzdCBjaGFuZ2UgZXZlbnQsIHdlIGFkZCB0aGUgcHJldmlvdXNcbiAgICAgICAgICAgIC8vIHRleHQgdG8gdGhlIGN1cnJlbnQgaXRlbSBhbmQgcmVwbGFjZSB0aGUgcHJldmlvdXMgaXRlbS5cbiAgICAgICAgICAgIC8vIFRoaXMgYWxzbyByZXBsYWNlcyB0aGUgbWV0YWRhdGEgb2YgdGhlIGxhc3QgaXRlbS5cbiAgICAgICAgICAgIHRoaXMuX2xhc3RTdHJlYW0gKz0gdmFsdWUudGV4dDtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RTdHJlYW0gPSBQcml2YXRlLnJlbW92ZU92ZXJ3cml0dGVuQ2hhcnModGhpcy5fbGFzdFN0cmVhbSk7XG4gICAgICAgICAgICB2YWx1ZS50ZXh0ID0gdGhpcy5fbGFzdFN0cmVhbTtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9jcmVhdGVJdGVtKHsgdmFsdWUsIHRydXN0ZWQgfSk7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGNvbnN0IHByZXYgPSB0aGlzLmxpc3QuZ2V0KGluZGV4KTtcbiAgICAgICAgICAgIHByZXYuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5saXN0LnNldChpbmRleCwgaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5iZm9ybWF0LmlzU3RyZWFtKHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUudGV4dCA9IFByaXZhdGUucmVtb3ZlT3ZlcndyaXR0ZW5DaGFycyh2YWx1ZS50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDcmVhdGUgdGhlIG5ldyBpdGVtLlxuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5fY3JlYXRlSXRlbSh7IHZhbHVlLCB0cnVzdGVkIH0pO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHN0cmVhbSBpbmZvcm1hdGlvbi5cbiAgICAgICAgaWYgKG5iZm9ybWF0LmlzU3RyZWFtKHZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFN0cmVhbSA9IHZhbHVlLnRleHQ7XG4gICAgICAgICAgICB0aGlzLl9sYXN0TmFtZSA9IHZhbHVlLm5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0U3RyZWFtID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIHRoZSBpdGVtIHRvIG91ciBsaXN0IGFuZCByZXR1cm4gdGhlIG5ldyBsZW5ndGguXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciBhIG5ldyB2YWx1ZSBzaG91bGQgYmUgY29uc29saWRhdGVkIHdpdGggdGhlIHByZXZpb3VzIG91dHB1dC5cbiAgICAgKlxuICAgICAqIFRoaXMgd2lsbCBvbmx5IGJlIGNhbGxlZCBpZiB0aGUgbWluaW1hbCBjcml0ZXJpYSBvZiBib3RoIGJlaW5nIHN0cmVhbVxuICAgICAqIG1lc3NhZ2VzIG9mIHRoZSBzYW1lIHR5cGUuXG4gICAgICovXG4gICAgc2hvdWxkQ29tYmluZShvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gb3V0cHV0IGl0ZW0gYW5kIGhvb2sgdXAgaXRzIHNpZ25hbHMuXG4gICAgICovXG4gICAgX2NyZWF0ZUl0ZW0ob3B0aW9ucykge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5jb250ZW50RmFjdG9yeTtcbiAgICAgICAgY29uc3QgaXRlbSA9IGZhY3RvcnkuY3JlYXRlT3V0cHV0TW9kZWwob3B0aW9ucyk7XG4gICAgICAgIGl0ZW0uY2hhbmdlZC5jb25uZWN0KHRoaXMuX29uR2VuZXJpY0NoYW5nZSwgdGhpcyk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIGxpc3QuXG4gICAgICovXG4gICAgX29uTGlzdENoYW5nZWQoc2VuZGVyLCBhcmdzKSB7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdChhcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIGFuIGl0ZW0uXG4gICAgICovXG4gICAgX29uR2VuZXJpY0NoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIE91dHB1dEFyZWFNb2RlbCBjbGFzcyBzdGF0aWNzLlxuICovXG4oZnVuY3Rpb24gKE91dHB1dEFyZWFNb2RlbCkge1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGEgYElNb2RlbE91dHB1dEZhY3RvcnlgLlxuICAgICAqL1xuICAgIGNsYXNzIENvbnRlbnRGYWN0b3J5IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhbiBvdXRwdXQgbW9kZWwuXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVPdXRwdXRNb2RlbChvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE91dHB1dE1vZGVsKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIE91dHB1dEFyZWFNb2RlbC5Db250ZW50RmFjdG9yeSA9IENvbnRlbnRGYWN0b3J5O1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IG91dHB1dCBtb2RlbCBmYWN0b3J5LlxuICAgICAqL1xuICAgIE91dHB1dEFyZWFNb2RlbC5kZWZhdWx0Q29udGVudEZhY3RvcnkgPSBuZXcgQ29udGVudEZhY3RvcnkoKTtcbn0pKE91dHB1dEFyZWFNb2RlbCB8fCAoT3V0cHV0QXJlYU1vZGVsID0ge30pKTtcbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIG1vZHVsZS1wcml2YXRlIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogTm9ybWFsaXplIGFuIG91dHB1dC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBub3JtYWxpemUodmFsdWUpIHtcbiAgICAgICAgaWYgKG5iZm9ybWF0LmlzU3RyZWFtKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUudGV4dCkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS50ZXh0ID0gdmFsdWUudGV4dC5qb2luKCdcXG4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBQcml2YXRlLm5vcm1hbGl6ZSA9IG5vcm1hbGl6ZTtcbiAgICAvKipcbiAgICAgKiBSZW1vdmUgY2hhcmFjdGVycyB0aGF0IGFyZSBvdmVycmlkZGVuIGJ5IGJhY2tzcGFjZSBjaGFyYWN0ZXJzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpeEJhY2tzcGFjZSh0eHQpIHtcbiAgICAgICAgbGV0IHRtcCA9IHR4dDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdHh0ID0gdG1wO1xuICAgICAgICAgICAgLy8gQ2FuY2VsIG91dCBhbnl0aGluZy1idXQtbmV3bGluZSBmb2xsb3dlZCBieSBiYWNrc3BhY2VcbiAgICAgICAgICAgIHRtcCA9IHR4dC5yZXBsYWNlKC9bXlxcbl1cXHgwOC9nbSwgJycpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbiAgICAgICAgfSB3aGlsZSAodG1wLmxlbmd0aCA8IHR4dC5sZW5ndGgpO1xuICAgICAgICByZXR1cm4gdHh0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgY2h1bmtzIHRoYXQgc2hvdWxkIGJlIG92ZXJyaWRkZW4gYnkgdGhlIGVmZmVjdCBvZlxuICAgICAqIGNhcnJpYWdlIHJldHVybiBjaGFyYWN0ZXJzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpeENhcnJpYWdlUmV0dXJuKHR4dCkge1xuICAgICAgICB0eHQgPSB0eHQucmVwbGFjZSgvXFxyK1xcbi9nbSwgJ1xcbicpOyAvLyBcXHIgZm9sbG93ZWQgYnkgXFxuIC0tPiBuZXdsaW5lXG4gICAgICAgIHdoaWxlICh0eHQuc2VhcmNoKC9cXHJbXiRdL2cpID4gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhc2UgPSB0eHQubWF0Y2goL14oLiopXFxyKy9tKVsxXTtcbiAgICAgICAgICAgIGxldCBpbnNlcnQgPSB0eHQubWF0Y2goL1xccisoLiopJC9tKVsxXTtcbiAgICAgICAgICAgIGluc2VydCA9IGluc2VydCArIGJhc2Uuc2xpY2UoaW5zZXJ0Lmxlbmd0aCwgYmFzZS5sZW5ndGgpO1xuICAgICAgICAgICAgdHh0ID0gdHh0LnJlcGxhY2UoL1xccisuKiQvbSwgJ1xccicpLnJlcGxhY2UoL14uKlxcci9tLCBpbnNlcnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eHQ7XG4gICAgfVxuICAgIC8qXG4gICAgICogUmVtb3ZlIGNoYXJhY3RlcnMgb3ZlcnJpZGRlbiBieSBiYWNrc3BhY2VzIGFuZCBjYXJyaWFnZSByZXR1cm5zXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVtb3ZlT3ZlcndyaXR0ZW5DaGFycyh0ZXh0KSB7XG4gICAgICAgIHJldHVybiBmaXhDYXJyaWFnZVJldHVybihmaXhCYWNrc3BhY2UodGV4dCkpO1xuICAgIH1cbiAgICBQcml2YXRlLnJlbW92ZU92ZXJ3cml0dGVuQ2hhcnMgPSByZW1vdmVPdmVyd3JpdHRlbkNoYXJzO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2RlbC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBXaWRnZXRUcmFja2VyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgS2VybmVsTWVzc2FnZSB9IGZyb20gJ0BqdXB5dGVybGFiL3NlcnZpY2VzJztcbmltcG9ydCB7IFByb21pc2VEZWxlZ2F0ZSwgVVVJRCB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IEF0dGFjaGVkUHJvcGVydHkgfSBmcm9tICdAbHVtaW5vL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuaW1wb3J0IHsgUGFuZWwsIFBhbmVsTGF5b3V0LCBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGFuIG91dHB1dCBhcmVhIHdpZGdldC5cbiAqL1xuY29uc3QgT1VUUFVUX0FSRUFfQ0xBU1MgPSAnanAtT3V0cHV0QXJlYSc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBkaXJlY3Rpb24gY2hpbGRyZW4gb2YgT3V0cHV0QXJlYVxuICovXG5jb25zdCBPVVRQVVRfQVJFQV9JVEVNX0NMQVNTID0gJ2pwLU91dHB1dEFyZWEtY2hpbGQnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBhY3R1YWwgb3V0cHV0c1xuICovXG5jb25zdCBPVVRQVVRfQVJFQV9PVVRQVVRfQ0xBU1MgPSAnanAtT3V0cHV0QXJlYS1vdXRwdXQnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBwcm9tcHQgY2hpbGRyZW4gb2YgT3V0cHV0QXJlYS5cbiAqL1xuY29uc3QgT1VUUFVUX0FSRUFfUFJPTVBUX0NMQVNTID0gJ2pwLU91dHB1dEFyZWEtcHJvbXB0Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gT3V0cHV0UHJvbXB0LlxuICovXG5jb25zdCBPVVRQVVRfUFJPTVBUX0NMQVNTID0gJ2pwLU91dHB1dFByb21wdCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGFuIGV4ZWN1dGlvbiByZXN1bHQuXG4gKi9cbmNvbnN0IEVYRUNVVEVfQ0xBU1MgPSAnanAtT3V0cHV0QXJlYS1leGVjdXRlUmVzdWx0Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgc3RkaW4gaXRlbXMgb2YgT3V0cHV0QXJlYVxuICovXG5jb25zdCBPVVRQVVRfQVJFQV9TVERJTl9JVEVNX0NMQVNTID0gJ2pwLU91dHB1dEFyZWEtc3RkaW4taXRlbSc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHN0ZGluIHdpZGdldHMuXG4gKi9cbmNvbnN0IFNURElOX0NMQVNTID0gJ2pwLVN0ZGluJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gc3RkaW4gZGF0YSBwcm9tcHQgbm9kZXMuXG4gKi9cbmNvbnN0IFNURElOX1BST01QVF9DTEFTUyA9ICdqcC1TdGRpbi1wcm9tcHQnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBzdGRpbiBkYXRhIGlucHV0IG5vZGVzLlxuICovXG5jb25zdCBTVERJTl9JTlBVVF9DTEFTUyA9ICdqcC1TdGRpbi1pbnB1dCc7XG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogT3V0cHV0QXJlYVxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKlxuICogQW4gb3V0cHV0IGFyZWEgd2lkZ2V0LlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFRoZSB3aWRnZXQgbW9kZWwgbXVzdCBiZSBzZXQgc2VwYXJhdGVseSBhbmQgY2FuIGJlIGNoYW5nZWRcbiAqIGF0IGFueSB0aW1lLiAgQ29uc3VtZXJzIG9mIHRoZSB3aWRnZXQgbXVzdCBhY2NvdW50IGZvciBhXG4gKiBgbnVsbGAgbW9kZWwsIGFuZCBtYXkgd2FudCB0byBsaXN0ZW4gdG8gdGhlIGBtb2RlbENoYW5nZWRgXG4gKiBzaWduYWwuXG4gKi9cbmV4cG9ydCBjbGFzcyBPdXRwdXRBcmVhIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYW4gb3V0cHV0IGFyZWEgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgcHVibGljIHNpZ25hbCB1c2VkIHRvIGluZGljYXRlIHRoZSBudW1iZXIgb2Ygb3V0cHV0cyBoYXMgY2hhbmdlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogIyMjIyBOb3Rlc1xuICAgICAgICAgKiBUaGlzIGlzIHVzZWZ1bCBmb3IgcGFyZW50cyB3aG8gd2FudCB0byBhcHBseSBzdHlsaW5nIGJhc2VkIG9uIHRoZSBudW1iZXJcbiAgICAgICAgICogb2Ygb3V0cHV0cy4gRW1pdHMgdGhlIGN1cnJlbnQgbnVtYmVyIG9mIG91dHB1dHMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm91dHB1dExlbmd0aENoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGFuIGlvcHViIG1lc3NhZ2UuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9vbklPUHViID0gKG1zZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsO1xuICAgICAgICAgICAgY29uc3QgbXNnVHlwZSA9IG1zZy5oZWFkZXIubXNnX3R5cGU7XG4gICAgICAgICAgICBsZXQgb3V0cHV0O1xuICAgICAgICAgICAgY29uc3QgdHJhbnNpZW50ID0gKG1zZy5jb250ZW50LnRyYW5zaWVudCB8fCB7fSk7XG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5SWQgPSB0cmFuc2llbnRbJ2Rpc3BsYXlfaWQnXTtcbiAgICAgICAgICAgIGxldCB0YXJnZXRzO1xuICAgICAgICAgICAgc3dpdGNoIChtc2dUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhlY3V0ZV9yZXN1bHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2Rpc3BsYXlfZGF0YSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyZWFtJzpcbiAgICAgICAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbXNnLmNvbnRlbnQpLCB7IG91dHB1dF90eXBlOiBtc2dUeXBlIH0pO1xuICAgICAgICAgICAgICAgICAgICBtb2RlbC5hZGQob3V0cHV0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xlYXJfb3V0cHV0Jzoge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB3YWl0ID0gbXNnLmNvbnRlbnQud2FpdDtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuY2xlYXIod2FpdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlICd1cGRhdGVfZGlzcGxheV9kYXRhJzpcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtc2cuY29udGVudCksIHsgb3V0cHV0X3R5cGU6ICdkaXNwbGF5X2RhdGEnIH0pO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRzID0gdGhpcy5fZGlzcGxheUlkTWFwLmdldChkaXNwbGF5SWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbmRleCBvZiB0YXJnZXRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwuc2V0KGluZGV4LCBvdXRwdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRpc3BsYXlJZCAmJiBtc2dUeXBlID09PSAnZGlzcGxheV9kYXRhJykge1xuICAgICAgICAgICAgICAgIHRhcmdldHMgPSB0aGlzLl9kaXNwbGF5SWRNYXAuZ2V0KGRpc3BsYXlJZCkgfHwgW107XG4gICAgICAgICAgICAgICAgdGFyZ2V0cy5wdXNoKG1vZGVsLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlJZE1hcC5zZXQoZGlzcGxheUlkLCB0YXJnZXRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBhbiBleGVjdXRlIHJlcGx5IG1lc3NhZ2UuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9vbkV4ZWN1dGVSZXBseSA9IChtc2cpID0+IHtcbiAgICAgICAgICAgIC8vIEFQSSByZXNwb25zZXMgdGhhdCBjb250YWluIGEgcGFnZXIgYXJlIHNwZWNpYWwgY2FzZWQgYW5kIHRoZWlyIHR5cGVcbiAgICAgICAgICAgIC8vIGlzIG92ZXJyaWRkZW4gZnJvbSAnZXhlY3V0ZV9yZXBseScgdG8gJ2Rpc3BsYXlfZGF0YScgaW4gb3JkZXIgdG9cbiAgICAgICAgICAgIC8vIHJlbmRlciBvdXRwdXQuXG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMubW9kZWw7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gbXNnLmNvbnRlbnQ7XG4gICAgICAgICAgICBpZiAoY29udGVudC5zdGF0dXMgIT09ICdvaycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gY29udGVudCAmJiBjb250ZW50LnBheWxvYWQ7XG4gICAgICAgICAgICBpZiAoIXBheWxvYWQgfHwgIXBheWxvYWQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGFnZXMgPSBwYXlsb2FkLmZpbHRlcigoaSkgPT4gaS5zb3VyY2UgPT09ICdwYWdlJyk7XG4gICAgICAgICAgICBpZiAoIXBhZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBhZ2VzWzBdKSk7XG4gICAgICAgICAgICBjb25zdCBvdXRwdXQgPSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0X3R5cGU6ICdkaXNwbGF5X2RhdGEnLFxuICAgICAgICAgICAgICAgIGRhdGE6IHBhZ2UuZGF0YSxcbiAgICAgICAgICAgICAgICBtZXRhZGF0YToge31cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBtb2RlbC5hZGQob3V0cHV0KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fbWluSGVpZ2h0VGltZW91dCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2Rpc3BsYXlJZE1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fb3V0cHV0VHJhY2tlciA9IG5ldyBXaWRnZXRUcmFja2VyKHtcbiAgICAgICAgICAgIG5hbWVzcGFjZTogVVVJRC51dWlkNCgpXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBtb2RlbCA9ICh0aGlzLm1vZGVsID0gb3B0aW9ucy5tb2RlbCk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoT1VUUFVUX0FSRUFfQ0xBU1MpO1xuICAgICAgICB0aGlzLnJlbmRlcm1pbWUgPSBvcHRpb25zLnJlbmRlcm1pbWU7XG4gICAgICAgIHRoaXMuY29udGVudEZhY3RvcnkgPVxuICAgICAgICAgICAgb3B0aW9ucy5jb250ZW50RmFjdG9yeSB8fCBPdXRwdXRBcmVhLmRlZmF1bHRDb250ZW50RmFjdG9yeTtcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBuZXcgUGFuZWxMYXlvdXQoKTtcbiAgICAgICAgdGhpcy50cmltbWVkT3V0cHV0TW9kZWxzID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMubWF4TnVtYmVyT3V0cHV0cyA9IG9wdGlvbnMubWF4TnVtYmVyT3V0cHV0cyB8fCAwO1xuICAgICAgICB0aGlzLmhlYWRFbmRJbmRleCA9IHRoaXMubWF4TnVtYmVyT3V0cHV0cztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb3V0cHV0ID0gbW9kZWwuZ2V0KGkpO1xuICAgICAgICAgICAgdGhpcy5faW5zZXJ0T3V0cHV0KGksIG91dHB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgbW9kZWwuY2hhbmdlZC5jb25uZWN0KHRoaXMub25Nb2RlbENoYW5nZWQsIHRoaXMpO1xuICAgICAgICBtb2RlbC5zdGF0ZUNoYW5nZWQuY29ubmVjdCh0aGlzLm9uU3RhdGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSByZWFkLW9ubHkgc2VxdWVuY2Ugb2YgdGhlIGNoaWxkcmVuIHdpZGdldHMgaW4gdGhlIG91dHB1dCBhcmVhLlxuICAgICAqL1xuICAgIGdldCB3aWRnZXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXQud2lkZ2V0cztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGtlcm5lbCBmdXR1cmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBvdXRwdXQgYXJlYS5cbiAgICAgKi9cbiAgICBnZXQgZnV0dXJlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZnV0dXJlO1xuICAgIH1cbiAgICBzZXQgZnV0dXJlKHZhbHVlKSB7XG4gICAgICAgIC8vIEJhaWwgaWYgdGhlIG1vZGVsIGlzIGRpc3Bvc2VkLlxuICAgICAgICBpZiAodGhpcy5tb2RlbC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignTW9kZWwgaXMgZGlzcG9zZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZnV0dXJlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9mdXR1cmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2Z1dHVyZS5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZnV0dXJlID0gdmFsdWU7XG4gICAgICAgIHRoaXMubW9kZWwuY2xlYXIoKTtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZXJlIHdlcmUgbm8gaW5wdXQgd2lkZ2V0cy5cbiAgICAgICAgaWYgKHRoaXMud2lkZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLm91dHB1dExlbmd0aENoYW5nZWQuZW1pdCh0aGlzLm1vZGVsLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIHB1Ymxpc2hlZCBtZXNzYWdlcy5cbiAgICAgICAgdmFsdWUub25JT1B1YiA9IHRoaXMuX29uSU9QdWI7XG4gICAgICAgIC8vIEhhbmRsZSB0aGUgZXhlY3V0ZSByZXBseS5cbiAgICAgICAgdmFsdWUub25SZXBseSA9IHRoaXMuX29uRXhlY3V0ZVJlcGx5O1xuICAgICAgICAvLyBIYW5kbGUgc3RkaW4uXG4gICAgICAgIHZhbHVlLm9uU3RkaW4gPSBtc2cgPT4ge1xuICAgICAgICAgICAgaWYgKEtlcm5lbE1lc3NhZ2UuaXNJbnB1dFJlcXVlc3RNc2cobXNnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25JbnB1dFJlcXVlc3QobXNnLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBvdXRwdXQgYXJlYS5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5fZnV0dXJlKSB7XG4gICAgICAgICAgICB0aGlzLl9mdXR1cmUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fZnV0dXJlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kaXNwbGF5SWRNYXAuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fb3V0cHV0VHJhY2tlci5kaXNwb3NlKCk7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRm9sbG93IGNoYW5nZXMgb24gdGhlIG1vZGVsIHN0YXRlLlxuICAgICAqL1xuICAgIG9uTW9kZWxDaGFuZ2VkKHNlbmRlciwgYXJncykge1xuICAgICAgICBzd2l0Y2ggKGFyZ3MudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnNlcnRPdXRwdXQoYXJncy5uZXdJbmRleCwgYXJncy5uZXdWYWx1ZXNbMF0pO1xuICAgICAgICAgICAgICAgIHRoaXMub3V0cHV0TGVuZ3RoQ2hhbmdlZC5lbWl0KHRoaXMubW9kZWwubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMud2lkZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGl0ZW1zIHJlbW92ZWQgZnJvbSBtb2RlbFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByYW5nZSBvZiBpdGVtcyByZW1vdmVkIGZyb20gbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSB3aWRnZXRzIGNvcnJlc3BvbmRpbmcgdG8gcmVtb3ZlZCBtb2RlbCBpdGVtc1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IGFyZ3Mub2xkSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3Mub2xkVmFsdWVzLmxlbmd0aCAmJiBzdGFydEluZGV4IDwgdGhpcy53aWRnZXRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdGhpcy53aWRnZXRzW3N0YXJ0SW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldC5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhcHBseSBpdGVtIG9mZnNldCB0byB0YXJnZXQgbW9kZWwgaXRlbSBpbmRpY2VzIGluIF9kaXNwbGF5SWRNYXBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21vdmVEaXNwbGF5SWRJbmRpY2VzKHN0YXJ0SW5kZXgsIGFyZ3Mub2xkVmFsdWVzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBwcmV2ZW50IGppdHRlciBjYXVzZWQgYnkgaW1tZWRpYXRlIGhlaWdodCBjaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZlbnRIZWlnaHRDaGFuZ2VKaXR0ZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm91dHB1dExlbmd0aENoYW5nZWQuZW1pdCh0aGlzLm1vZGVsLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2V0JzpcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXRPdXRwdXQoYXJncy5uZXdJbmRleCwgYXJncy5uZXdWYWx1ZXNbMF0pO1xuICAgICAgICAgICAgICAgIHRoaXMub3V0cHV0TGVuZ3RoQ2hhbmdlZC5lbWl0KHRoaXMubW9kZWwubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIGluZGljZXMgaW4gX2Rpc3BsYXlJZE1hcCBpbiByZXNwb25zZSB0byBlbGVtZW50IHJlbW92ZSBmcm9tIG1vZGVsIGl0ZW1zXG4gICAgICogKlxuICAgICAqIEBwYXJhbSBzdGFydEluZGV4IC0gVGhlIGluZGV4IG9mIGZpcnN0IGVsZW1lbnQgcmVtb3ZlZFxuICAgICAqXG4gICAgICogQHBhcmFtIGNvdW50IC0gVGhlIG51bWJlciBvZiBlbGVtZW50cyByZW1vdmVkIGZyb20gbW9kZWwgaXRlbXNcbiAgICAgKlxuICAgICAqL1xuICAgIF9tb3ZlRGlzcGxheUlkSW5kaWNlcyhzdGFydEluZGV4LCBjb3VudCkge1xuICAgICAgICB0aGlzLl9kaXNwbGF5SWRNYXAuZm9yRWFjaCgoaW5kaWNlcykgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmFuZ2VFbmQgPSBzdGFydEluZGV4ICsgY291bnQ7XG4gICAgICAgICAgICBjb25zdCBudW1JbmRpY2VzID0gaW5kaWNlcy5sZW5ndGg7XG4gICAgICAgICAgICAvLyByZXZlcnNlIGxvb3AgaW4gb3JkZXIgdG8gcHJldmVudCByZW1vdmluZyBlbGVtZW50IGFmZmVjdGluZyB0aGUgaW5kZXhcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBudW1JbmRpY2VzIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGluZGljZXNbaV07XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIG1vZGVsIGl0ZW0gaW5kaWNlcyBpbiByZW1vdmVkIHJhbmdlXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IHN0YXJ0SW5kZXggJiYgaW5kZXggPCByYW5nZUVuZCkge1xuICAgICAgICAgICAgICAgICAgICBpbmRpY2VzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5kZXggPj0gcmFuZ2VFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSBtb2RlbCBpdGVtIGluZGljZXMgdGhhdCB3ZXJlIGxhcmdlciB0aGFuIHJhbmdlIGVuZFxuICAgICAgICAgICAgICAgICAgICBpbmRpY2VzW2ldIC09IGNvdW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvbGxvdyBjaGFuZ2VzIG9uIHRoZSBvdXRwdXQgbW9kZWwgc3RhdGUuXG4gICAgICovXG4gICAgb25TdGF0ZUNoYW5nZWQoc2VuZGVyKSB7XG4gICAgICAgIHRoaXMudHJpbW1lZE91dHB1dE1vZGVscyA9IG5ldyBBcnJheSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubW9kZWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3NldE91dHB1dChpLCB0aGlzLm1vZGVsLmdldChpKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vdXRwdXRMZW5ndGhDaGFuZ2VkLmVtaXQodGhpcy5tb2RlbC5sZW5ndGgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgd2lkZ2V0IGlucHV0cyBhbmQgb3V0cHV0cy5cbiAgICAgKi9cbiAgICBfY2xlYXIoKSB7XG4gICAgICAgIC8vIEJhaWwgaWYgdGhlcmUgaXMgbm8gd29yayB0byBkby5cbiAgICAgICAgaWYgKCF0aGlzLndpZGdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBvZiBvdXIgd2lkZ2V0cy5cbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy53aWRnZXRzLmxlbmd0aDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdGhpcy53aWRnZXRzWzBdO1xuICAgICAgICAgICAgd2lkZ2V0LnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICB3aWRnZXQuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENsZWFyIHRoZSBkaXNwbGF5IGlkIG1hcC5cbiAgICAgICAgdGhpcy5fZGlzcGxheUlkTWFwLmNsZWFyKCk7XG4gICAgICAgIC8vIHByZXZlbnQgaml0dGVyIGNhdXNlZCBieSBpbW1lZGlhdGUgaGVpZ2h0IGNoYW5nZVxuICAgICAgICB0aGlzLl9wcmV2ZW50SGVpZ2h0Q2hhbmdlSml0dGVyKCk7XG4gICAgfVxuICAgIF9wcmV2ZW50SGVpZ2h0Q2hhbmdlSml0dGVyKCkge1xuICAgICAgICAvLyBXaGVuIGFuIG91dHB1dCBhcmVhIGlzIGNsZWFyZWQgYW5kIHRoZW4gcXVpY2tseSByZXBsYWNlZCB3aXRoIG5ld1xuICAgICAgICAvLyBjb250ZW50IChhcyBoYXBwZW5zIHdpdGggQGludGVyYWN0IGluIHdpZGdldHMsIGZvciBleGFtcGxlKSwgdGhlXG4gICAgICAgIC8vIHF1aWNrbHkgY2hhbmdpbmcgaGVpZ2h0IGNhbiBtYWtlIHRoZSBwYWdlIGppdHRlci5cbiAgICAgICAgLy8gV2UgaW50cm9kdWNlIGEgc21hbGwgZGVsYXkgaW4gdGhlIG1pbmltdW0gaGVpZ2h0XG4gICAgICAgIC8vIHRvIHByZXZlbnQgdGhpcyBqaXR0ZXIuXG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHRoaXMubm9kZS5zdHlsZS5taW5IZWlnaHQgPSBgJHtyZWN0LmhlaWdodH1weGA7XG4gICAgICAgIGlmICh0aGlzLl9taW5IZWlnaHRUaW1lb3V0KSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMuX21pbkhlaWdodFRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21pbkhlaWdodFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ub2RlLnN0eWxlLm1pbkhlaWdodCA9ICcnO1xuICAgICAgICB9LCA1MCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhbiBpbnB1dCByZXF1ZXN0IGZyb20gYSBrZXJuZWwuXG4gICAgICovXG4gICAgb25JbnB1dFJlcXVlc3QobXNnLCBmdXR1cmUpIHtcbiAgICAgICAgLy8gQWRkIGFuIG91dHB1dCB3aWRnZXQgdG8gdGhlIGVuZC5cbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuY29udGVudEZhY3Rvcnk7XG4gICAgICAgIGNvbnN0IHN0ZGluUHJvbXB0ID0gbXNnLmNvbnRlbnQucHJvbXB0O1xuICAgICAgICBjb25zdCBwYXNzd29yZCA9IG1zZy5jb250ZW50LnBhc3N3b3JkO1xuICAgICAgICBjb25zdCBwYW5lbCA9IG5ldyBQYW5lbCgpO1xuICAgICAgICBwYW5lbC5hZGRDbGFzcyhPVVRQVVRfQVJFQV9JVEVNX0NMQVNTKTtcbiAgICAgICAgcGFuZWwuYWRkQ2xhc3MoT1VUUFVUX0FSRUFfU1RESU5fSVRFTV9DTEFTUyk7XG4gICAgICAgIGNvbnN0IHByb21wdCA9IGZhY3RvcnkuY3JlYXRlT3V0cHV0UHJvbXB0KCk7XG4gICAgICAgIHByb21wdC5hZGRDbGFzcyhPVVRQVVRfQVJFQV9QUk9NUFRfQ0xBU1MpO1xuICAgICAgICBwYW5lbC5hZGRXaWRnZXQocHJvbXB0KTtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBmYWN0b3J5LmNyZWF0ZVN0ZGluKHtcbiAgICAgICAgICAgIHBhcmVudF9oZWFkZXI6IG1zZy5oZWFkZXIsXG4gICAgICAgICAgICBwcm9tcHQ6IHN0ZGluUHJvbXB0LFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICBmdXR1cmVcbiAgICAgICAgfSk7XG4gICAgICAgIGlucHV0LmFkZENsYXNzKE9VVFBVVF9BUkVBX09VVFBVVF9DTEFTUyk7XG4gICAgICAgIHBhbmVsLmFkZFdpZGdldChpbnB1dCk7XG4gICAgICAgIGNvbnN0IGxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgICAgICBsYXlvdXQuYWRkV2lkZ2V0KHBhbmVsKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdhaXQgZm9yIHRoZSBzdGRpbiB0byBjb21wbGV0ZSwgYWRkIGl0IHRvIHRoZSBtb2RlbCAoc28gaXQgcGVyc2lzdHMpXG4gICAgICAgICAqIGFuZCByZW1vdmUgdGhlIHN0ZGluIHdpZGdldC5cbiAgICAgICAgICovXG4gICAgICAgIHZvaWQgaW5wdXQudmFsdWUudGhlbih2YWx1ZSA9PiB7XG4gICAgICAgICAgICAvLyBVc2Ugc3RkaW4gYXMgdGhlIHN0cmVhbSBzbyBpdCBkb2VzIG5vdCBnZXQgY29tYmluZWQgd2l0aCBzdGRvdXQuXG4gICAgICAgICAgICB0aGlzLm1vZGVsLmFkZCh7XG4gICAgICAgICAgICAgICAgb3V0cHV0X3R5cGU6ICdzdHJlYW0nLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdzdGRpbicsXG4gICAgICAgICAgICAgICAgdGV4dDogdmFsdWUgKyAnXFxuJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBwYW5lbC5kaXNwb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgYW4gb3V0cHV0IGluIHRoZSBsYXlvdXQgaW4gcGxhY2UuXG4gICAgICovXG4gICAgX3NldE91dHB1dChpbmRleCwgbW9kZWwpIHtcbiAgICAgICAgaWYgKGluZGV4ID49IHRoaXMuaGVhZEVuZEluZGV4ICYmIHRoaXMubWF4TnVtYmVyT3V0cHV0cyAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy50cmltbWVkT3V0cHV0TW9kZWxzW2luZGV4IC0gdGhpcy5oZWFkRW5kSW5kZXhdID0gbW9kZWw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbGF5b3V0ID0gdGhpcy5sYXlvdXQ7XG4gICAgICAgIGNvbnN0IHBhbmVsID0gbGF5b3V0LndpZGdldHNbaW5kZXhdO1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IChwYW5lbC53aWRnZXRzXG4gICAgICAgICAgICA/IHBhbmVsLndpZGdldHNbMV1cbiAgICAgICAgICAgIDogcGFuZWwpO1xuICAgICAgICAvLyBDaGVjayB3aGV0aGVyIGl0IGlzIHNhZmUgdG8gcmV1c2UgcmVuZGVyZXI6XG4gICAgICAgIC8vIC0gUHJlZmVycmVkIG1pbWUgdHlwZSBoYXMgbm90IGNoYW5nZWRcbiAgICAgICAgLy8gLSBJc29sYXRpb24gaGFzIG5vdCBjaGFuZ2VkXG4gICAgICAgIGNvbnN0IG1pbWVUeXBlID0gdGhpcy5yZW5kZXJtaW1lLnByZWZlcnJlZE1pbWVUeXBlKG1vZGVsLmRhdGEsIG1vZGVsLnRydXN0ZWQgPyAnYW55JyA6ICdlbnN1cmUnKTtcbiAgICAgICAgaWYgKHJlbmRlcmVyLnJlbmRlck1vZGVsICYmXG4gICAgICAgICAgICBQcml2YXRlLmN1cnJlbnRQcmVmZXJyZWRNaW1ldHlwZS5nZXQocmVuZGVyZXIpID09PSBtaW1lVHlwZSAmJlxuICAgICAgICAgICAgT3V0cHV0QXJlYS5pc0lzb2xhdGVkKG1pbWVUeXBlLCBtb2RlbC5tZXRhZGF0YSkgPT09XG4gICAgICAgICAgICAgICAgcmVuZGVyZXIgaW5zdGFuY2VvZiBQcml2YXRlLklzb2xhdGVkUmVuZGVyZXIpIHtcbiAgICAgICAgICAgIHZvaWQgcmVuZGVyZXIucmVuZGVyTW9kZWwobW9kZWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGF5b3V0LndpZGdldHNbaW5kZXhdLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2luc2VydE91dHB1dChpbmRleCwgbW9kZWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciBhbmQgaW5zZXJ0IGEgc2luZ2xlIG91dHB1dCBpbnRvIHRoZSBsYXlvdXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW5kZXggLSBUaGUgaW5kZXggb2YgdGhlIG91dHB1dCB0byBiZSBpbnNlcnRlZC5cbiAgICAgKiBAcGFyYW0gbW9kZWwgLSBUaGUgbW9kZWwgb2YgdGhlIG91dHB1dCB0byBiZSBpbnNlcnRlZC5cbiAgICAgKi9cbiAgICBfaW5zZXJ0T3V0cHV0KGluZGV4LCBtb2RlbCkge1xuICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMudHJpbW1lZE91dHB1dE1vZGVscyA9IG5ldyBBcnJheSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5tYXhOdW1iZXJPdXRwdXRzICYmIHRoaXMubWF4TnVtYmVyT3V0cHV0cyAhPT0gMCkge1xuICAgICAgICAgICAgLy8gVE9ETyBJbXByb3ZlIHN0eWxlIG9mIHRoZSBkaXNwbGF5IG1lc3NhZ2UuXG4gICAgICAgICAgICBjb25zdCBzZXBhcmF0b3JNb2RlbCA9IHRoaXMubW9kZWwuY29udGVudEZhY3RvcnkuY3JlYXRlT3V0cHV0TW9kZWwoe1xuICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dF90eXBlOiAnZGlzcGxheV9kYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQvaHRtbCc6IGBcbiAgICAgICAgICAgICAgPGEgc3R5bGU9XCJtYXJnaW46IDEwcHg7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgY3Vyc29yOiBwb2ludGVyO1wiPlxuICAgICAgICAgICAgICAgIDxwcmU+T3V0cHV0IG9mIHRoaXMgY2VsbCBoYXMgYmVlbiB0cmltbWVkIG9uIHRoZSBpbml0aWFsIGRpc3BsYXkuPC9wcmU+XG4gICAgICAgICAgICAgICAgPHByZT5EaXNwbGF5aW5nIHRoZSBmaXJzdCAke3RoaXMubWF4TnVtYmVyT3V0cHV0c30gdG9wIG91dHB1dHMuPC9wcmU+XG4gICAgICAgICAgICAgICAgPHByZT5DbGljayBvbiB0aGlzIG1lc3NhZ2UgdG8gZ2V0IHRoZSBjb21wbGV0ZSBvdXRwdXQuPC9wcmU+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBvbkNsaWNrID0gKCkgPT4gdGhpcy5fc2hvd1RyaW1tZWRPdXRwdXRzKCk7XG4gICAgICAgICAgICBjb25zdCBzZXBhcmF0b3IgPSB0aGlzLmNyZWF0ZU91dHB1dEl0ZW0oc2VwYXJhdG9yTW9kZWwpO1xuICAgICAgICAgICAgc2VwYXJhdG9yLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrKTtcbiAgICAgICAgICAgIGNvbnN0IGxheW91dCA9IHRoaXMubGF5b3V0O1xuICAgICAgICAgICAgbGF5b3V0Lmluc2VydFdpZGdldCh0aGlzLmhlYWRFbmRJbmRleCwgc2VwYXJhdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvdXRwdXQgPSB0aGlzLl9jcmVhdGVPdXRwdXQobW9kZWwpO1xuICAgICAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5tYXhOdW1iZXJPdXRwdXRzIHx8IHRoaXMubWF4TnVtYmVyT3V0cHV0cyA9PT0gMCkge1xuICAgICAgICAgICAgbGF5b3V0Lmluc2VydFdpZGdldChpbmRleCwgb3V0cHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy5tYXhOdW1iZXJPdXRwdXRzICYmIHRoaXMubWF4TnVtYmVyT3V0cHV0cyAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy50cmltbWVkT3V0cHV0TW9kZWxzLnB1c2gobW9kZWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fb3V0cHV0VHJhY2tlci5oYXMob3V0cHV0KSkge1xuICAgICAgICAgICAgdm9pZCB0aGlzLl9vdXRwdXRUcmFja2VyLmFkZChvdXRwdXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9jcmVhdGVPdXRwdXQobW9kZWwpIHtcbiAgICAgICAgbGV0IG91dHB1dCA9IHRoaXMuY3JlYXRlT3V0cHV0SXRlbShtb2RlbCk7XG4gICAgICAgIGlmIChvdXRwdXQpIHtcbiAgICAgICAgICAgIG91dHB1dC50b2dnbGVDbGFzcyhFWEVDVVRFX0NMQVNTLCBtb2RlbC5leGVjdXRpb25Db3VudCAhPT0gbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBuZXcgV2lkZ2V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSB3aWRnZXQgdHJhY2tlciBmb3IgaW5kaXZpZHVhbCBvdXRwdXQgd2lkZ2V0cyBpbiB0aGUgb3V0cHV0IGFyZWEuXG4gICAgICovXG4gICAgZ2V0IG91dHB1dFRyYWNrZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vdXRwdXRUcmFja2VyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIGluZm9ybWF0aW9uIG1lc3NhZ2UgcmVsYXRlZCB0byB0aGUgdHJpbW1lZCBvdXRwdXRcbiAgICAgKiBhbmQgc2hvdyBhbGwgcHJldmlvdXNseSB0cmltbWVkIG91dHB1dHMuXG4gICAgICovXG4gICAgX3Nob3dUcmltbWVkT3V0cHV0cygpIHtcbiAgICAgICAgY29uc3QgbGF5b3V0ID0gdGhpcy5sYXlvdXQ7XG4gICAgICAgIGxheW91dC5yZW1vdmVXaWRnZXRBdCh0aGlzLmhlYWRFbmRJbmRleCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmltbWVkT3V0cHV0TW9kZWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvdXRwdXQgPSB0aGlzLl9jcmVhdGVPdXRwdXQodGhpcy50cmltbWVkT3V0cHV0TW9kZWxzW2ldKTtcbiAgICAgICAgICAgIGxheW91dC5pbnNlcnRXaWRnZXQodGhpcy5oZWFkRW5kSW5kZXggKyBpLCBvdXRwdXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBvdXRwdXQgaXRlbSB3aXRoIGEgcHJvbXB0IGFuZCBhY3R1YWwgb3V0cHV0XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhIHJlbmRlcmVkIHdpZGdldCwgb3IgbnVsbCBpZiB3ZSBjYW5ub3QgcmVuZGVyXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqL1xuICAgIGNyZWF0ZU91dHB1dEl0ZW0obW9kZWwpIHtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gdGhpcy5jcmVhdGVSZW5kZXJlZE1pbWV0eXBlKG1vZGVsKTtcbiAgICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhbmVsID0gbmV3IFByaXZhdGUuT3V0cHV0UGFuZWwoKTtcbiAgICAgICAgcGFuZWwuYWRkQ2xhc3MoT1VUUFVUX0FSRUFfSVRFTV9DTEFTUyk7XG4gICAgICAgIGNvbnN0IHByb21wdCA9IHRoaXMuY29udGVudEZhY3RvcnkuY3JlYXRlT3V0cHV0UHJvbXB0KCk7XG4gICAgICAgIHByb21wdC5leGVjdXRpb25Db3VudCA9IG1vZGVsLmV4ZWN1dGlvbkNvdW50O1xuICAgICAgICBwcm9tcHQuYWRkQ2xhc3MoT1VUUFVUX0FSRUFfUFJPTVBUX0NMQVNTKTtcbiAgICAgICAgcGFuZWwuYWRkV2lkZ2V0KHByb21wdCk7XG4gICAgICAgIG91dHB1dC5hZGRDbGFzcyhPVVRQVVRfQVJFQV9PVVRQVVRfQ0xBU1MpO1xuICAgICAgICBwYW5lbC5hZGRXaWRnZXQob3V0cHV0KTtcbiAgICAgICAgcmV0dXJuIHBhbmVsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgYSBtaW1ldHlwZVxuICAgICAqL1xuICAgIGNyZWF0ZVJlbmRlcmVkTWltZXR5cGUobW9kZWwpIHtcbiAgICAgICAgY29uc3QgbWltZVR5cGUgPSB0aGlzLnJlbmRlcm1pbWUucHJlZmVycmVkTWltZVR5cGUobW9kZWwuZGF0YSwgbW9kZWwudHJ1c3RlZCA/ICdhbnknIDogJ2Vuc3VyZScpO1xuICAgICAgICBpZiAoIW1pbWVUeXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3V0cHV0ID0gdGhpcy5yZW5kZXJtaW1lLmNyZWF0ZVJlbmRlcmVyKG1pbWVUeXBlKTtcbiAgICAgICAgY29uc3QgaXNvbGF0ZWQgPSBPdXRwdXRBcmVhLmlzSXNvbGF0ZWQobWltZVR5cGUsIG1vZGVsLm1ldGFkYXRhKTtcbiAgICAgICAgaWYgKGlzb2xhdGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBvdXRwdXQgPSBuZXcgUHJpdmF0ZS5Jc29sYXRlZFJlbmRlcmVyKG91dHB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgUHJpdmF0ZS5jdXJyZW50UHJlZmVycmVkTWltZXR5cGUuc2V0KG91dHB1dCwgbWltZVR5cGUpO1xuICAgICAgICBvdXRwdXQucmVuZGVyTW9kZWwobW9kZWwpLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vIE1hbnVhbGx5IGFwcGVuZCBlcnJvciBtZXNzYWdlIHRvIG91dHB1dFxuICAgICAgICAgICAgY29uc3QgcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gICAgICAgICAgICBwcmUudGV4dENvbnRlbnQgPSBgSmF2YXNjcmlwdCBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWA7XG4gICAgICAgICAgICBvdXRwdXQubm9kZS5hcHBlbmRDaGlsZChwcmUpO1xuICAgICAgICAgICAgLy8gUmVtb3ZlIG1pbWUtdHlwZS1zcGVjaWZpYyBDU1MgY2xhc3Nlc1xuICAgICAgICAgICAgb3V0cHV0Lm5vZGUuY2xhc3NOYW1lID0gJ2xtLVdpZGdldCBqcC1SZW5kZXJlZFRleHQnO1xuICAgICAgICAgICAgb3V0cHV0Lm5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLW1pbWUtdHlwZScsICdhcHBsaWNhdGlvbi92bmQuanVweXRlci5zdGRlcnInKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFNpbXBsaWZpZWRPdXRwdXRBcmVhIGV4dGVuZHMgT3V0cHV0QXJlYSB7XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGFuIGlucHV0IHJlcXVlc3QgZnJvbSBhIGtlcm5lbCBieSBkb2luZyBub3RoaW5nLlxuICAgICAqL1xuICAgIG9uSW5wdXRSZXF1ZXN0KG1zZywgZnV0dXJlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIG91dHB1dCBpdGVtIHdpdGhvdXQgYSBwcm9tcHQsIGp1c3QgdGhlIG91dHB1dCB3aWRnZXRzXG4gICAgICovXG4gICAgY3JlYXRlT3V0cHV0SXRlbShtb2RlbCkge1xuICAgICAgICBjb25zdCBvdXRwdXQgPSB0aGlzLmNyZWF0ZVJlbmRlcmVkTWltZXR5cGUobW9kZWwpO1xuICAgICAgICBpZiAob3V0cHV0KSB7XG4gICAgICAgICAgICBvdXRwdXQuYWRkQ2xhc3MoT1VUUFVUX0FSRUFfT1VUUFVUX0NMQVNTKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH1cbn1cbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIE91dHB1dEFyZWEgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChPdXRwdXRBcmVhKSB7XG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBjb2RlIG9uIGFuIG91dHB1dCBhcmVhLlxuICAgICAqL1xuICAgIGFzeW5jIGZ1bmN0aW9uIGV4ZWN1dGUoY29kZSwgb3V0cHV0LCBzZXNzaW9uQ29udGV4dCwgbWV0YWRhdGEpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBPdmVycmlkZSB0aGUgZGVmYXVsdCBmb3IgYHN0b3Bfb25fZXJyb3JgLlxuICAgICAgICBsZXQgc3RvcE9uRXJyb3IgPSB0cnVlO1xuICAgICAgICBpZiAobWV0YWRhdGEgJiZcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkobWV0YWRhdGEudGFncykgJiZcbiAgICAgICAgICAgIG1ldGFkYXRhLnRhZ3MuaW5kZXhPZigncmFpc2VzLWV4Y2VwdGlvbicpICE9PSAtMSkge1xuICAgICAgICAgICAgc3RvcE9uRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb250ZW50ID0ge1xuICAgICAgICAgICAgY29kZSxcbiAgICAgICAgICAgIHN0b3Bfb25fZXJyb3I6IHN0b3BPbkVycm9yXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGtlcm5lbCA9IChfYSA9IHNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5rZXJuZWw7XG4gICAgICAgIGlmICgha2VybmVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nlc3Npb24gaGFzIG5vIGtlcm5lbC4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmdXR1cmUgPSBrZXJuZWwucmVxdWVzdEV4ZWN1dGUoY29udGVudCwgZmFsc2UsIG1ldGFkYXRhKTtcbiAgICAgICAgb3V0cHV0LmZ1dHVyZSA9IGZ1dHVyZTtcbiAgICAgICAgcmV0dXJuIGZ1dHVyZS5kb25lO1xuICAgIH1cbiAgICBPdXRwdXRBcmVhLmV4ZWN1dGUgPSBleGVjdXRlO1xuICAgIGZ1bmN0aW9uIGlzSXNvbGF0ZWQobWltZVR5cGUsIG1ldGFkYXRhKSB7XG4gICAgICAgIGNvbnN0IG1pbWVNZCA9IG1ldGFkYXRhW21pbWVUeXBlXTtcbiAgICAgICAgLy8gbWltZS1zcGVjaWZpYyBoaWdoZXIgcHJpb3JpdHlcbiAgICAgICAgaWYgKG1pbWVNZCAmJiBtaW1lTWRbJ2lzb2xhdGVkJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuICEhbWltZU1kWydpc29sYXRlZCddO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZmFsbGJhY2sgb24gZ2xvYmFsXG4gICAgICAgICAgICByZXR1cm4gISFtZXRhZGF0YVsnaXNvbGF0ZWQnXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPdXRwdXRBcmVhLmlzSXNvbGF0ZWQgPSBpc0lzb2xhdGVkO1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGBJQ29udGVudEZhY3RvcnlgLlxuICAgICAqL1xuICAgIGNsYXNzIENvbnRlbnRGYWN0b3J5IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSB0aGUgb3V0cHV0IHByb21wdCBmb3IgdGhlIHdpZGdldC5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZU91dHB1dFByb21wdCgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3V0cHV0UHJvbXB0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhbiBzdGRpbiB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVTdGRpbihvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFN0ZGluKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIE91dHB1dEFyZWEuQ29udGVudEZhY3RvcnkgPSBDb250ZW50RmFjdG9yeTtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBgQ29udGVudEZhY3RvcnlgIGluc3RhbmNlLlxuICAgICAqL1xuICAgIE91dHB1dEFyZWEuZGVmYXVsdENvbnRlbnRGYWN0b3J5ID0gbmV3IENvbnRlbnRGYWN0b3J5KCk7XG59KShPdXRwdXRBcmVhIHx8IChPdXRwdXRBcmVhID0ge30pKTtcbi8qKlxuICogVGhlIGRlZmF1bHQgb3V0cHV0IHByb21wdCBpbXBsZW1lbnRhdGlvblxuICovXG5leHBvcnQgY2xhc3MgT3V0cHV0UHJvbXB0IGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKlxuICAgICAqIENyZWF0ZSBhbiBvdXRwdXQgcHJvbXB0IHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZXhlY3V0aW9uQ291bnQgPSBudWxsO1xuICAgICAgICB0aGlzLmFkZENsYXNzKE9VVFBVVF9QUk9NUFRfQ0xBU1MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZXhlY3V0aW9uIGNvdW50IGZvciB0aGUgcHJvbXB0LlxuICAgICAqL1xuICAgIGdldCBleGVjdXRpb25Db3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4ZWN1dGlvbkNvdW50O1xuICAgIH1cbiAgICBzZXQgZXhlY3V0aW9uQ291bnQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZXhlY3V0aW9uQ291bnQgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUudGV4dENvbnRlbnQgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS50ZXh0Q29udGVudCA9IGBbJHt2YWx1ZX1dOmA7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIFRoZSBkZWZhdWx0IHN0ZGluIHdpZGdldC5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0ZGluIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgaW5wdXQgd2lkZ2V0LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgbm9kZTogUHJpdmF0ZS5jcmVhdGVJbnB1dFdpZGdldE5vZGUob3B0aW9ucy5wcm9tcHQsIG9wdGlvbnMucGFzc3dvcmQpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2VEZWxlZ2F0ZSgpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKFNURElOX0NMQVNTKTtcbiAgICAgICAgdGhpcy5faW5wdXQgPSB0aGlzLm5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMF07XG4gICAgICAgIHRoaXMuX2lucHV0LmZvY3VzKCk7XG4gICAgICAgIHRoaXMuX2Z1dHVyZSA9IG9wdGlvbnMuZnV0dXJlO1xuICAgICAgICB0aGlzLl9wYXJlbnRfaGVhZGVyID0gb3B0aW9ucy5wYXJlbnRfaGVhZGVyO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IG9wdGlvbnMucHJvbXB0ICsgJyAnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgdmFsdWUgb2YgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnByb21pc2UudGhlbigoKSA9PiB0aGlzLl92YWx1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgbWV0aG9kIGltcGxlbWVudHMgdGhlIERPTSBgRXZlbnRMaXN0ZW5lcmAgaW50ZXJmYWNlIGFuZCBpc1xuICAgICAqIGNhbGxlZCBpbiByZXNwb25zZSB0byBldmVudHMgb24gdGhlIGRvY2sgcGFuZWwncyBub2RlLiBJdCBzaG91bGRcbiAgICAgKiBub3QgYmUgY2FsbGVkIGRpcmVjdGx5IGJ5IHVzZXIgY29kZS5cbiAgICAgKi9cbiAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICBjb25zdCBpbnB1dCA9IHRoaXMuX2lucHV0O1xuICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICAvLyBFbnRlclxuICAgICAgICAgICAgICAgIHRoaXMuX2Z1dHVyZS5zZW5kSW5wdXRSZXBseSh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ29rJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGlucHV0LnZhbHVlXG4gICAgICAgICAgICAgICAgfSwgdGhpcy5fcGFyZW50X2hlYWRlcik7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09ICdwYXNzd29yZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgKz0gQXJyYXkoaW5wdXQudmFsdWUubGVuZ3RoICsgMSkuam9pbignwrcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlICs9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9taXNlLnJlc29sdmUodm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYGFmdGVyLWF0dGFjaGAgbWVzc2FnZXMgc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uQWZ0ZXJBdHRhY2gobXNnKSB7XG4gICAgICAgIHRoaXMuX2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGB1cGRhdGUtcmVxdWVzdGAgbWVzc2FnZXMgc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uVXBkYXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgdGhpcy5faW5wdXQuZm9jdXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGBiZWZvcmUtZGV0YWNoYCBtZXNzYWdlcyBzZW50IHRvIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25CZWZvcmVEZXRhY2gobXNnKSB7XG4gICAgICAgIHRoaXMuX2lucHV0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzKTtcbiAgICB9XG59XG4vKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogUHJpdmF0ZSBuYW1lc3BhY2VcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBub2RlIGZvciBhbiBJbnB1dFdpZGdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVJbnB1dFdpZGdldE5vZGUocHJvbXB0LCBwYXNzd29yZCkge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHByb21wdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcbiAgICAgICAgcHJvbXB0Tm9kZS5jbGFzc05hbWUgPSBTVERJTl9QUk9NUFRfQ0xBU1M7XG4gICAgICAgIHByb21wdE5vZGUudGV4dENvbnRlbnQgPSBwcm9tcHQ7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXQuY2xhc3NOYW1lID0gU1RESU5fSU5QVVRfQ0xBU1M7XG4gICAgICAgIGlmIChwYXNzd29yZCkge1xuICAgICAgICAgICAgaW5wdXQudHlwZSA9ICdwYXNzd29yZCc7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChwcm9tcHROb2RlKTtcbiAgICAgICAgcHJvbXB0Tm9kZS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgICBQcml2YXRlLmNyZWF0ZUlucHV0V2lkZ2V0Tm9kZSA9IGNyZWF0ZUlucHV0V2lkZ2V0Tm9kZTtcbiAgICAvKipcbiAgICAgKiBBIHJlbmRlcmVyIGZvciBJRnJhbWUgZGF0YS5cbiAgICAgKi9cbiAgICBjbGFzcyBJc29sYXRlZFJlbmRlcmVyIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhbiBpc29sYXRlZCByZW5kZXJlci5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKHdyYXBwZWQpIHtcbiAgICAgICAgICAgIHN1cGVyKHsgbm9kZTogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJykgfSk7XG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1tb2QtaXNvbGF0ZWQnKTtcbiAgICAgICAgICAgIHRoaXMuX3dyYXBwZWQgPSB3cmFwcGVkO1xuICAgICAgICAgICAgLy8gT25jZSB0aGUgaWZyYW1lIGlzIGxvYWRlZCwgdGhlIHN1YmFyZWEgaXMgZHluYW1pY2FsbHkgaW5zZXJ0ZWRcbiAgICAgICAgICAgIGNvbnN0IGlmcmFtZSA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIGlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJztcbiAgICAgICAgICAgIGlmcmFtZS5zY3JvbGxpbmcgPSAnYXV0byc7XG4gICAgICAgICAgICBpZnJhbWUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBXb3JrYXJvdW5kIG5lZWRlZCBieSBGaXJlZm94LCB0byBwcm9wZXJseSByZW5kZXIgc3ZnIGluc2lkZVxuICAgICAgICAgICAgICAgIC8vIGlmcmFtZXMsIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDE3NzE5MC9cbiAgICAgICAgICAgICAgICAvLyBzdmctZHluYW1pY2FsbHktYWRkZWQtdG8taWZyYW1lLWRvZXMtbm90LXJlbmRlci1jb3JyZWN0bHlcbiAgICAgICAgICAgICAgICBpZnJhbWUuY29udGVudERvY3VtZW50Lm9wZW4oKTtcbiAgICAgICAgICAgICAgICAvLyBJbnNlcnQgdGhlIHN1YmFyZWEgaW50byB0aGUgaWZyYW1lXG4gICAgICAgICAgICAgICAgLy8gV2UgbXVzdCBkaXJlY3RseSB3cml0ZSB0aGUgaHRtbC4gQXQgdGhpcyBwb2ludCwgc3ViYXJlYSBkb2Vzbid0XG4gICAgICAgICAgICAgICAgLy8gY29udGFpbiBhbnkgdXNlciBjb250ZW50LlxuICAgICAgICAgICAgICAgIGlmcmFtZS5jb250ZW50RG9jdW1lbnQud3JpdGUodGhpcy5fd3JhcHBlZC5ub2RlLmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgaWZyYW1lLmNvbnRlbnREb2N1bWVudC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBpZnJhbWUuY29udGVudERvY3VtZW50LmJvZHk7XG4gICAgICAgICAgICAgICAgLy8gQWRqdXN0IHRoZSBpZnJhbWUgaGVpZ2h0IGF1dG9tYXRpY2FsbHlcbiAgICAgICAgICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gYCR7Ym9keS5zY3JvbGxIZWlnaHR9cHhgO1xuICAgICAgICAgICAgICAgIGlmcmFtZS5oZWlnaHRDaGFuZ2VPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmcmFtZS5zdHlsZS5oZWlnaHQgPSBgJHtib2R5LnNjcm9sbEhlaWdodH1weGA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWZyYW1lLmhlaWdodENoYW5nZU9ic2VydmVyLm9ic2VydmUoYm9keSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmVuZGVyIGEgbWltZSBtb2RlbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG1vZGVsIC0gVGhlIG1pbWUgbW9kZWwgdG8gcmVuZGVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiByZW5kZXJpbmcgaXMgY29tcGxldGUuXG4gICAgICAgICAqXG4gICAgICAgICAqICMjIyMgTm90ZXNcbiAgICAgICAgICogVGhpcyBtZXRob2QgbWF5IGJlIGNhbGxlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgdGhlIGxpZmV0aW1lXG4gICAgICAgICAqIG9mIHRoZSB3aWRnZXQgdG8gdXBkYXRlIGl0IGlmIGFuZCB3aGVuIG5ldyBkYXRhIGlzIGF2YWlsYWJsZS5cbiAgICAgICAgICovXG4gICAgICAgIHJlbmRlck1vZGVsKG1vZGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd3JhcHBlZC5yZW5kZXJNb2RlbChtb2RlbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5Jc29sYXRlZFJlbmRlcmVyID0gSXNvbGF0ZWRSZW5kZXJlcjtcbiAgICBQcml2YXRlLmN1cnJlbnRQcmVmZXJyZWRNaW1ldHlwZSA9IG5ldyBBdHRhY2hlZFByb3BlcnR5KHtcbiAgICAgICAgbmFtZTogJ3ByZWZlcnJlZE1pbWV0eXBlJyxcbiAgICAgICAgY3JlYXRlOiBvd25lciA9PiAnJ1xuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEEgYFBhbmVsYCB0aGF0J3MgZm9jdXNlZCBieSBhIGBjb250ZXh0bWVudWAgZXZlbnQuXG4gICAgICovXG4gICAgY2xhc3MgT3V0cHV0UGFuZWwgZXh0ZW5kcyBQYW5lbCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgYE91dHB1dFBhbmVsYCB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQSBjYWxsYmFjayB0aGF0IGZvY3VzZXMgb24gdGhlIHdpZGdldC5cbiAgICAgICAgICovXG4gICAgICAgIF9vbkNvbnRleHQoXykge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZSBgYWZ0ZXItYXR0YWNoYCBtZXNzYWdlcyBzZW50IHRvIHRoZSB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICAgICAgc3VwZXIub25BZnRlckF0dGFjaChtc2cpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5fb25Db250ZXh0LmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYGJlZm9yZS1kZXRhY2hgIG1lc3NhZ2VzIHNlbnQgdG8gdGhlIHdpZGdldC5cbiAgICAgICAgICovXG4gICAgICAgIG9uQmVmb3JlRGV0YWNoKG1zZykge1xuICAgICAgICAgICAgc3VwZXIub25BZnRlckRldGFjaChtc2cpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgdGhpcy5fb25Db250ZXh0LmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuT3V0cHV0UGFuZWwgPSBPdXRwdXRQYW5lbDtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2lkZ2V0LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=