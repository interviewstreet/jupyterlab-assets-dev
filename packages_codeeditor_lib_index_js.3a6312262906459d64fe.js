(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_codeeditor_lib_index_js"],{

/***/ "../../packages/codeeditor/lib/editor.js":
/*!***********************************************!*\
  !*** ../../packages/codeeditor/lib/editor.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeEditor": () => (/* binding */ CodeEditor)
/* harmony export */ });
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/observables */ "webpack/sharing/consume/default/@jupyterlab/observables/@jupyterlab/observables");
/* harmony import */ var _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/shared-models */ "webpack/sharing/consume/default/@jupyterlab/shared-models/@jupyterlab/shared-models");
/* harmony import */ var _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



const globalModelDBMutex = _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_1__.createMutex();
/**
 * A namespace for code editors.
 *
 * #### Notes
 * - A code editor is a set of common assumptions which hold for all concrete editors.
 * - Changes in implementations of the code editor should only be caused by changes in concrete editors.
 * - Common JLab services which are based on the code editor should belong to `IEditorServices`.
 */
var CodeEditor;
(function (CodeEditor) {
    /**
     * The default selection style.
     */
    CodeEditor.defaultSelectionStyle = {
        className: '',
        displayName: '',
        color: 'black'
    };
    /**
     * The default implementation of the editor model.
     */
    class Model {
        /**
         * Construct a new Model.
         */
        constructor(options) {
            this._isDisposed = false;
            this._mimeTypeChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
            this._sharedModelSwitched = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
            options = options || {};
            if (options.modelDB) {
                this.modelDB = options.modelDB;
            }
            else {
                this.modelDB = new _jupyterlab_observables__WEBPACK_IMPORTED_MODULE_0__.ModelDB();
            }
            this.sharedModel = _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_1__.createStandaloneCell(this.type, options.id);
            this.sharedModel.changed.connect(this._onSharedModelChanged, this);
            const value = this.modelDB.createString('value');
            value.changed.connect(this._onModelDBValueChanged, this);
            value.text = value.text || options.value || '';
            const mimeType = this.modelDB.createValue('mimeType');
            mimeType.changed.connect(this._onModelDBMimeTypeChanged, this);
            mimeType.set(options.mimeType || 'text/plain');
            this.modelDB.createMap('selections');
        }
        /**
         * When we initialize a cell model, we create a standalone model that cannot be shared in a YNotebook.
         * Call this function to re-initialize the local representation based on a fresh shared model (e.g. models.YFile or models.YCodeCell).
         *
         * @param sharedModel
         * @param reinitialize Whether to reinitialize the shared model.
         */
        switchSharedModel(sharedModel, reinitialize) {
            if (reinitialize) {
                // update local modeldb
                // @todo also change metadata
                this.value.text = sharedModel.getSource();
            }
            this.sharedModel.changed.disconnect(this._onSharedModelChanged, this);
            // clone model retrieve a shared (not standalone) model
            this.sharedModel = sharedModel;
            this.sharedModel.changed.connect(this._onSharedModelChanged, this);
            this._sharedModelSwitched.emit(true);
        }
        /**
         * We update the modeldb store when the shared model changes.
         * To ensure that we don't run into infinite loops, we wrap this call in a "mutex".
         * The "mutex" ensures that the wrapped code can only be executed by either the sharedModelChanged handler
         * or the modelDB change handler.
         */
        _onSharedModelChanged(sender, change) {
            globalModelDBMutex(() => {
                if (change.sourceChange) {
                    const value = this.modelDB.get('value');
                    let currpos = 0;
                    change.sourceChange.forEach(delta => {
                        if (delta.insert != null) {
                            value.insert(currpos, delta.insert);
                            currpos += delta.insert.length;
                        }
                        else if (delta.delete != null) {
                            value.remove(currpos, currpos + delta.delete);
                        }
                        else if (delta.retain != null) {
                            currpos += delta.retain;
                        }
                    });
                }
            });
        }
        /**
         * Handle a change to the modelDB value.
         */
        _onModelDBValueChanged(value, event) {
            globalModelDBMutex(() => {
                this.sharedModel.transact(() => {
                    switch (event.type) {
                        case 'insert':
                            this.sharedModel.updateSource(event.start, event.start, event.value);
                            break;
                        case 'remove':
                            this.sharedModel.updateSource(event.start, event.end);
                            break;
                        default:
                            this.sharedModel.setSource(value.text);
                            break;
                    }
                });
            });
        }
        get type() {
            return 'code';
        }
        /**
         * A signal emitted when a mimetype changes.
         */
        get mimeTypeChanged() {
            return this._mimeTypeChanged;
        }
        /**
         * A signal emitted when the shared model was switched.
         */
        get sharedModelSwitched() {
            return this._sharedModelSwitched;
        }
        /**
         * Get the value of the model.
         */
        get value() {
            return this.modelDB.get('value');
        }
        /**
         * Get the selections for the model.
         */
        get selections() {
            return this.modelDB.get('selections');
        }
        /**
         * A mime type of the model.
         */
        get mimeType() {
            return this.modelDB.getValue('mimeType');
        }
        set mimeType(newValue) {
            const oldValue = this.mimeType;
            if (oldValue === newValue) {
                return;
            }
            this.modelDB.setValue('mimeType', newValue);
        }
        /**
         * Whether the model is disposed.
         */
        get isDisposed() {
            return this._isDisposed;
        }
        /**
         * Dispose of the resources used by the model.
         */
        dispose() {
            if (this._isDisposed) {
                return;
            }
            this._isDisposed = true;
            _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal.clearData(this);
        }
        _onModelDBMimeTypeChanged(mimeType, args) {
            this._mimeTypeChanged.emit({
                name: 'mimeType',
                oldValue: args.oldValue,
                newValue: args.newValue
            });
        }
    }
    CodeEditor.Model = Model;
    /**
     * The default configuration options for an editor.
     */
    CodeEditor.defaultConfig = {
        autoClosingBrackets: false,
        codeFolding: false,
        cursorBlinkRate: 530,
        fontFamily: null,
        fontSize: null,
        handlePaste: true,
        insertSpaces: true,
        lineHeight: null,
        lineNumbers: false,
        lineWrap: 'on',
        matchBrackets: true,
        readOnly: false,
        tabSize: 4,
        rulers: [],
        showTrailingSpace: false,
        wordWrapColumn: 80
    };
})(CodeEditor || (CodeEditor = {}));
//# sourceMappingURL=editor.js.map

/***/ }),

/***/ "../../packages/codeeditor/lib/index.js":
/*!**********************************************!*\
  !*** ../../packages/codeeditor/lib/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeEditor": () => (/* reexport safe */ _editor__WEBPACK_IMPORTED_MODULE_0__.CodeEditor),
/* harmony export */   "JSONEditor": () => (/* reexport safe */ _jsoneditor__WEBPACK_IMPORTED_MODULE_1__.JSONEditor),
/* harmony export */   "CodeEditorWrapper": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.CodeEditorWrapper),
/* harmony export */   "IEditorMimeTypeService": () => (/* reexport safe */ _mimetype__WEBPACK_IMPORTED_MODULE_3__.IEditorMimeTypeService),
/* harmony export */   "IEditorServices": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_4__.IEditorServices)
/* harmony export */ });
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor */ "../../packages/codeeditor/lib/editor.js");
/* harmony import */ var _jsoneditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jsoneditor */ "../../packages/codeeditor/lib/jsoneditor.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widget */ "../../packages/codeeditor/lib/widget.js");
/* harmony import */ var _mimetype__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mimetype */ "../../packages/codeeditor/lib/mimetype.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tokens */ "../../packages/codeeditor/lib/tokens.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module codeeditor
 */






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/codeeditor/lib/jsoneditor.js":
/*!***************************************************!*\
  !*** ../../packages/codeeditor/lib/jsoneditor.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JSONEditor": () => (/* binding */ JSONEditor)
/* harmony export */ });
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor */ "../../packages/codeeditor/lib/editor.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





/**
 * The class name added to a JSONEditor instance.
 */
const JSONEDITOR_CLASS = 'jp-JSONEditor';
/**
 * The class name added when the Metadata editor contains invalid JSON.
 */
const ERROR_CLASS = 'jp-mod-error';
/**
 * The class name added to the editor host node.
 */
const HOST_CLASS = 'jp-JSONEditor-host';
/**
 * The class name added to the header area.
 */
const HEADER_CLASS = 'jp-JSONEditor-header';
/**
 * A widget for editing observable JSON.
 */
class JSONEditor extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Widget {
    /**
     * Construct a new JSON editor.
     */
    constructor(options) {
        super();
        this._dataDirty = false;
        this._inputDirty = false;
        this._source = null;
        this._originalValue = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.emptyObject;
        this._changeGuard = false;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_0__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this.addClass(JSONEDITOR_CLASS);
        this.headerNode = document.createElement('div');
        this.headerNode.className = HEADER_CLASS;
        this.revertButtonNode = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.undoIcon.element({
            tag: 'span',
            title: this._trans.__('Revert changes to data')
        });
        this.commitButtonNode = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_1__.checkIcon.element({
            tag: 'span',
            title: this._trans.__('Commit changes to data'),
            marginLeft: '8px'
        });
        this.editorHostNode = document.createElement('div');
        this.editorHostNode.className = HOST_CLASS;
        this.headerNode.appendChild(this.revertButtonNode);
        this.headerNode.appendChild(this.commitButtonNode);
        this.node.appendChild(this.headerNode);
        this.node.appendChild(this.editorHostNode);
        const model = new _editor__WEBPACK_IMPORTED_MODULE_4__.CodeEditor.Model();
        model.value.text = this._trans.__('No data!');
        model.mimeType = 'application/json';
        model.value.changed.connect(this._onValueChanged, this);
        this.model = model;
        this.editor = options.editorFactory({ host: this.editorHostNode, model });
        this.editor.setOption('readOnly', true);
    }
    /**
     * The observable source.
     */
    get source() {
        return this._source;
    }
    set source(value) {
        if (this._source === value) {
            return;
        }
        if (this._source) {
            this._source.changed.disconnect(this._onSourceChanged, this);
        }
        this._source = value;
        this.editor.setOption('readOnly', value === null);
        if (value) {
            value.changed.connect(this._onSourceChanged, this);
        }
        this._setValue();
    }
    /**
     * Get whether the editor is dirty.
     */
    get isDirty() {
        return this._dataDirty || this._inputDirty;
    }
    /**
     * Handle the DOM events for the widget.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the notebook panel's node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'blur':
                this._evtBlur(event);
                break;
            case 'click':
                this._evtClick(event);
                break;
            default:
                break;
        }
    }
    /**
     * Handle `after-attach` messages for the widget.
     */
    onAfterAttach(msg) {
        const node = this.editorHostNode;
        node.addEventListener('blur', this, true);
        node.addEventListener('click', this, true);
        this.revertButtonNode.hidden = true;
        this.commitButtonNode.hidden = true;
        this.headerNode.addEventListener('click', this);
        if (this.isVisible) {
            this.update();
        }
    }
    /**
     * Handle `after-show` messages for the widget.
     */
    onAfterShow(msg) {
        this.update();
    }
    /**
     * Handle `update-request` messages for the widget.
     */
    onUpdateRequest(msg) {
        this.editor.refresh();
    }
    /**
     * Handle `before-detach` messages for the widget.
     */
    onBeforeDetach(msg) {
        const node = this.editorHostNode;
        node.removeEventListener('blur', this, true);
        node.removeEventListener('click', this, true);
        this.headerNode.removeEventListener('click', this);
    }
    /**
     * Handle a change to the metadata of the source.
     */
    _onSourceChanged(sender, args) {
        if (this._changeGuard) {
            return;
        }
        if (this._inputDirty || this.editor.hasFocus()) {
            this._dataDirty = true;
            return;
        }
        this._setValue();
    }
    /**
     * Handle change events.
     */
    _onValueChanged() {
        let valid = true;
        try {
            const value = JSON.parse(this.editor.model.value.text);
            this.removeClass(ERROR_CLASS);
            this._inputDirty =
                !this._changeGuard && !_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.deepEqual(value, this._originalValue);
        }
        catch (err) {
            this.addClass(ERROR_CLASS);
            this._inputDirty = true;
            valid = false;
        }
        this.revertButtonNode.hidden = !this._inputDirty;
        this.commitButtonNode.hidden = !valid || !this._inputDirty;
    }
    /**
     * Handle blur events for the text area.
     */
    _evtBlur(event) {
        // Update the metadata if necessary.
        if (!this._inputDirty && this._dataDirty) {
            this._setValue();
        }
    }
    /**
     * Handle click events for the buttons.
     */
    _evtClick(event) {
        const target = event.target;
        if (this.revertButtonNode.contains(target)) {
            this._setValue();
        }
        else if (this.commitButtonNode.contains(target)) {
            if (!this.commitButtonNode.hidden && !this.hasClass(ERROR_CLASS)) {
                this._changeGuard = true;
                this._mergeContent();
                this._changeGuard = false;
                this._setValue();
            }
        }
        else if (this.editorHostNode.contains(target)) {
            this.editor.focus();
        }
    }
    /**
     * Merge the user content.
     */
    _mergeContent() {
        const model = this.editor.model;
        const old = this._originalValue;
        const user = JSON.parse(model.value.text);
        const source = this.source;
        if (!source) {
            return;
        }
        // If it is in user and has changed from old, set in new.
        for (const key in user) {
            if (!_lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.deepEqual(user[key], old[key] || null)) {
                source.set(key, user[key]);
            }
        }
        // If it was in old and is not in user, remove from source.
        for (const key in old) {
            if (!(key in user)) {
                source.delete(key);
            }
        }
    }
    /**
     * Set the value given the owner contents.
     */
    _setValue() {
        this._dataDirty = false;
        this._inputDirty = false;
        this.revertButtonNode.hidden = true;
        this.commitButtonNode.hidden = true;
        this.removeClass(ERROR_CLASS);
        const model = this.editor.model;
        const content = this._source ? this._source.toJSON() : {};
        this._changeGuard = true;
        if (content === void 0) {
            model.value.text = this._trans.__('No data!');
            this._originalValue = _lumino_coreutils__WEBPACK_IMPORTED_MODULE_2__.JSONExt.emptyObject;
        }
        else {
            const value = JSON.stringify(content, null, 4);
            model.value.text = value;
            this._originalValue = content;
            // Move the cursor to within the brace.
            if (value.length > 1 && value[0] === '{') {
                this.editor.setCursorPosition({ line: 0, column: 1 });
            }
        }
        this.editor.refresh();
        this._changeGuard = false;
        this.commitButtonNode.hidden = true;
        this.revertButtonNode.hidden = true;
    }
}
//# sourceMappingURL=jsoneditor.js.map

/***/ }),

/***/ "../../packages/codeeditor/lib/mimetype.js":
/*!*************************************************!*\
  !*** ../../packages/codeeditor/lib/mimetype.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IEditorMimeTypeService": () => (/* binding */ IEditorMimeTypeService)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * A namespace for `IEditorMimeTypeService`.
 */
var IEditorMimeTypeService;
(function (IEditorMimeTypeService) {
    /**
     * The default mime type.
     */
    IEditorMimeTypeService.defaultMimeType = 'text/plain';
})(IEditorMimeTypeService || (IEditorMimeTypeService = {}));
//# sourceMappingURL=mimetype.js.map

/***/ }),

/***/ "../../packages/codeeditor/lib/tokens.js":
/*!***********************************************!*\
  !*** ../../packages/codeeditor/lib/tokens.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IEditorServices": () => (/* binding */ IEditorServices)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * Code editor services token.
 */
const IEditorServices = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/codeeditor:IEditorServices');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/codeeditor/lib/widget.js":
/*!***********************************************!*\
  !*** ../../packages/codeeditor/lib/widget.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodeEditorWrapper": () => (/* binding */ CodeEditorWrapper)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * The class name added to an editor widget that has a primary selection.
 */
const HAS_SELECTION_CLASS = 'jp-mod-has-primary-selection';
/**
 * The class name added to an editor widget that has a cursor/selection
 * within the whitespace at the beginning of a line
 */
const HAS_IN_LEADING_WHITESPACE_CLASS = 'jp-mod-in-leading-whitespace';
/**
 * A class used to indicate a drop target.
 */
const DROP_TARGET_CLASS = 'jp-mod-dropTarget';
/**
 * RegExp to test for leading whitespace
 */
const leadingWhitespaceRe = /^\s+$/;
/**
 * A widget which hosts a code editor.
 */
class CodeEditorWrapper extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    /**
     * Construct a new code editor widget.
     */
    constructor(options) {
        super();
        this._hasRefreshedSinceAttach = false;
        const editor = (this.editor = options.factory({
            host: this.node,
            model: options.model,
            uuid: options.uuid,
            config: options.config,
            selectionStyle: options.selectionStyle
        }));
        editor.model.selections.changed.connect(this._onSelectionsChanged, this);
        this._updateOnShow = options.updateOnShow !== false;
    }
    /**
     * Get the model used by the widget.
     */
    get model() {
        return this.editor.model;
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        super.dispose();
        this.editor.dispose();
    }
    /**
     * Handle the DOM events for the widget.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the notebook panel's node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'lm-dragenter':
                this._evtDragEnter(event);
                break;
            case 'lm-dragleave':
                this._evtDragLeave(event);
                break;
            case 'lm-dragover':
                this._evtDragOver(event);
                break;
            case 'lm-drop':
                this._evtDrop(event);
                break;
            default:
                break;
        }
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        this.editor.focus();
    }
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        const node = this.node;
        node.addEventListener('lm-dragenter', this);
        node.addEventListener('lm-dragleave', this);
        node.addEventListener('lm-dragover', this);
        node.addEventListener('lm-drop', this);
        // We have to refresh at least once after attaching,
        // while visible.
        this._hasRefreshedSinceAttach = false;
        if (this.isVisible) {
            this.update();
        }
    }
    /**
     * Handle `before-detach` messages for the widget.
     */
    onBeforeDetach(msg) {
        const node = this.node;
        node.removeEventListener('lm-dragenter', this);
        node.removeEventListener('lm-dragleave', this);
        node.removeEventListener('lm-dragover', this);
        node.removeEventListener('lm-drop', this);
    }
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    onAfterShow(msg) {
        if (this._updateOnShow || !this._hasRefreshedSinceAttach) {
            this.update();
        }
    }
    /**
     * A message handler invoked on a `'resize'` message.
     */
    onResize(msg) {
        if (msg.width >= 0 && msg.height >= 0) {
            this.editor.setSize(msg);
        }
        else if (this.isVisible) {
            this.editor.resizeToFit();
        }
    }
    /**
     * A message handler invoked on an `'update-request'` message.
     */
    onUpdateRequest(msg) {
        if (this.isVisible) {
            this._hasRefreshedSinceAttach = true;
            this.editor.refresh();
        }
    }
    /**
     * Handle a change in model selections.
     */
    _onSelectionsChanged() {
        const { start, end } = this.editor.getSelection();
        if (start.column !== end.column || start.line !== end.line) {
            // a selection was made
            this.addClass(HAS_SELECTION_CLASS);
            this.removeClass(HAS_IN_LEADING_WHITESPACE_CLASS);
        }
        else {
            // the cursor was placed
            this.removeClass(HAS_SELECTION_CLASS);
            if (this.editor
                .getLine(end.line)
                .slice(0, end.column)
                .match(leadingWhitespaceRe)) {
                this.addClass(HAS_IN_LEADING_WHITESPACE_CLASS);
            }
            else {
                this.removeClass(HAS_IN_LEADING_WHITESPACE_CLASS);
            }
        }
    }
    /**
     * Handle the `'lm-dragenter'` event for the widget.
     */
    _evtDragEnter(event) {
        if (this.editor.getOption('readOnly') === true) {
            return;
        }
        const data = Private.findTextData(event.mimeData);
        if (data === undefined) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        this.addClass('jp-mod-dropTarget');
    }
    /**
     * Handle the `'lm-dragleave'` event for the widget.
     */
    _evtDragLeave(event) {
        this.removeClass(DROP_TARGET_CLASS);
        if (this.editor.getOption('readOnly') === true) {
            return;
        }
        const data = Private.findTextData(event.mimeData);
        if (data === undefined) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * Handle the `'lm-dragover'` event for the widget.
     */
    _evtDragOver(event) {
        this.removeClass(DROP_TARGET_CLASS);
        if (this.editor.getOption('readOnly') === true) {
            return;
        }
        const data = Private.findTextData(event.mimeData);
        if (data === undefined) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        event.dropAction = 'copy';
        this.addClass(DROP_TARGET_CLASS);
    }
    /**
     * Handle the `'lm-drop'` event for the widget.
     */
    _evtDrop(event) {
        if (this.editor.getOption('readOnly') === true) {
            return;
        }
        const data = Private.findTextData(event.mimeData);
        if (data === undefined) {
            return;
        }
        const coordinate = {
            top: event.y,
            bottom: event.y,
            left: event.x,
            right: event.x,
            x: event.x,
            y: event.y,
            width: 0,
            height: 0
        };
        const position = this.editor.getPositionForCoordinate(coordinate);
        if (position === null) {
            return;
        }
        this.removeClass(DROP_TARGET_CLASS);
        event.preventDefault();
        event.stopPropagation();
        if (event.proposedAction === 'none') {
            event.dropAction = 'none';
            return;
        }
        const offset = this.editor.getOffsetAt(position);
        this.model.value.insert(offset, data);
    }
}
/**
 * A namespace for private functionality.
 */
var Private;
(function (Private) {
    /**
     * Given a MimeData instance, extract the first text data, if any.
     */
    function findTextData(mime) {
        const types = mime.types();
        const textType = types.find(t => t.indexOf('text') === 0);
        if (textType === undefined) {
            return undefined;
        }
        return mime.getData(textType);
    }
    Private.findTextData = findTextData;
})(Private || (Private = {}));
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29kZWVkaXRvci9saWIvZWRpdG9yLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9jb2RlZWRpdG9yL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29kZWVkaXRvci9saWIvanNvbmVkaXRvci5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29kZWVkaXRvci9saWIvbWltZXR5cGUuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2NvZGVlZGl0b3IvbGliL3Rva2Vucy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvY29kZWVkaXRvci9saWIvd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ2tEO0FBQ0U7QUFDVDtBQUMzQywyQkFBMkIsa0VBQWtCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxxREFBTTtBQUM5Qyw0Q0FBNEMscURBQU07QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyw0REFBTztBQUMxQztBQUNBLCtCQUErQiwyRUFBMkI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sZ0NBQWdDLG1EQUFNO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsYUFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0Isa0MiLCJmaWxlIjoicGFja2FnZXNfY29kZWVkaXRvcl9saWJfaW5kZXhfanMuM2E2MzEyMjYyOTA2NDU5ZDY0ZmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBNb2RlbERCIH0gZnJvbSAnQGp1cHl0ZXJsYWIvb2JzZXJ2YWJsZXMnO1xuaW1wb3J0ICogYXMgbW9kZWxzIGZyb20gJ0BqdXB5dGVybGFiL3NoYXJlZC1tb2RlbHMnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuY29uc3QgZ2xvYmFsTW9kZWxEQk11dGV4ID0gbW9kZWxzLmNyZWF0ZU11dGV4KCk7XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBjb2RlIGVkaXRvcnMuXG4gKlxuICogIyMjIyBOb3Rlc1xuICogLSBBIGNvZGUgZWRpdG9yIGlzIGEgc2V0IG9mIGNvbW1vbiBhc3N1bXB0aW9ucyB3aGljaCBob2xkIGZvciBhbGwgY29uY3JldGUgZWRpdG9ycy5cbiAqIC0gQ2hhbmdlcyBpbiBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIGNvZGUgZWRpdG9yIHNob3VsZCBvbmx5IGJlIGNhdXNlZCBieSBjaGFuZ2VzIGluIGNvbmNyZXRlIGVkaXRvcnMuXG4gKiAtIENvbW1vbiBKTGFiIHNlcnZpY2VzIHdoaWNoIGFyZSBiYXNlZCBvbiB0aGUgY29kZSBlZGl0b3Igc2hvdWxkIGJlbG9uZyB0byBgSUVkaXRvclNlcnZpY2VzYC5cbiAqL1xuZXhwb3J0IHZhciBDb2RlRWRpdG9yO1xuKGZ1bmN0aW9uIChDb2RlRWRpdG9yKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgc2VsZWN0aW9uIHN0eWxlLlxuICAgICAqL1xuICAgIENvZGVFZGl0b3IuZGVmYXVsdFNlbGVjdGlvblN0eWxlID0ge1xuICAgICAgICBjbGFzc05hbWU6ICcnLFxuICAgICAgICBkaXNwbGF5TmFtZTogJycsXG4gICAgICAgIGNvbG9yOiAnYmxhY2snXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgZWRpdG9yIG1vZGVsLlxuICAgICAqL1xuICAgIGNsYXNzIE1vZGVsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnN0cnVjdCBhIG5ldyBNb2RlbC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX21pbWVUeXBlQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9zaGFyZWRNb2RlbFN3aXRjaGVkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMubW9kZWxEQikge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWxEQiA9IG9wdGlvbnMubW9kZWxEQjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWxEQiA9IG5ldyBNb2RlbERCKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNoYXJlZE1vZGVsID0gbW9kZWxzLmNyZWF0ZVN0YW5kYWxvbmVDZWxsKHRoaXMudHlwZSwgb3B0aW9ucy5pZCk7XG4gICAgICAgICAgICB0aGlzLnNoYXJlZE1vZGVsLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblNoYXJlZE1vZGVsQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMubW9kZWxEQi5jcmVhdGVTdHJpbmcoJ3ZhbHVlJyk7XG4gICAgICAgICAgICB2YWx1ZS5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25Nb2RlbERCVmFsdWVDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgICAgIHZhbHVlLnRleHQgPSB2YWx1ZS50ZXh0IHx8IG9wdGlvbnMudmFsdWUgfHwgJyc7XG4gICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IHRoaXMubW9kZWxEQi5jcmVhdGVWYWx1ZSgnbWltZVR5cGUnKTtcbiAgICAgICAgICAgIG1pbWVUeXBlLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vbk1vZGVsREJNaW1lVHlwZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgbWltZVR5cGUuc2V0KG9wdGlvbnMubWltZVR5cGUgfHwgJ3RleHQvcGxhaW4nKTtcbiAgICAgICAgICAgIHRoaXMubW9kZWxEQi5jcmVhdGVNYXAoJ3NlbGVjdGlvbnMnKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV2hlbiB3ZSBpbml0aWFsaXplIGEgY2VsbCBtb2RlbCwgd2UgY3JlYXRlIGEgc3RhbmRhbG9uZSBtb2RlbCB0aGF0IGNhbm5vdCBiZSBzaGFyZWQgaW4gYSBZTm90ZWJvb2suXG4gICAgICAgICAqIENhbGwgdGhpcyBmdW5jdGlvbiB0byByZS1pbml0aWFsaXplIHRoZSBsb2NhbCByZXByZXNlbnRhdGlvbiBiYXNlZCBvbiBhIGZyZXNoIHNoYXJlZCBtb2RlbCAoZS5nLiBtb2RlbHMuWUZpbGUgb3IgbW9kZWxzLllDb2RlQ2VsbCkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBzaGFyZWRNb2RlbFxuICAgICAgICAgKiBAcGFyYW0gcmVpbml0aWFsaXplIFdoZXRoZXIgdG8gcmVpbml0aWFsaXplIHRoZSBzaGFyZWQgbW9kZWwuXG4gICAgICAgICAqL1xuICAgICAgICBzd2l0Y2hTaGFyZWRNb2RlbChzaGFyZWRNb2RlbCwgcmVpbml0aWFsaXplKSB7XG4gICAgICAgICAgICBpZiAocmVpbml0aWFsaXplKSB7XG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIGxvY2FsIG1vZGVsZGJcbiAgICAgICAgICAgICAgICAvLyBAdG9kbyBhbHNvIGNoYW5nZSBtZXRhZGF0YVxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUudGV4dCA9IHNoYXJlZE1vZGVsLmdldFNvdXJjZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zaGFyZWRNb2RlbC5jaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5fb25TaGFyZWRNb2RlbENoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgLy8gY2xvbmUgbW9kZWwgcmV0cmlldmUgYSBzaGFyZWQgKG5vdCBzdGFuZGFsb25lKSBtb2RlbFxuICAgICAgICAgICAgdGhpcy5zaGFyZWRNb2RlbCA9IHNoYXJlZE1vZGVsO1xuICAgICAgICAgICAgdGhpcy5zaGFyZWRNb2RlbC5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25TaGFyZWRNb2RlbENoYW5nZWQsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fc2hhcmVkTW9kZWxTd2l0Y2hlZC5lbWl0KHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXZSB1cGRhdGUgdGhlIG1vZGVsZGIgc3RvcmUgd2hlbiB0aGUgc2hhcmVkIG1vZGVsIGNoYW5nZXMuXG4gICAgICAgICAqIFRvIGVuc3VyZSB0aGF0IHdlIGRvbid0IHJ1biBpbnRvIGluZmluaXRlIGxvb3BzLCB3ZSB3cmFwIHRoaXMgY2FsbCBpbiBhIFwibXV0ZXhcIi5cbiAgICAgICAgICogVGhlIFwibXV0ZXhcIiBlbnN1cmVzIHRoYXQgdGhlIHdyYXBwZWQgY29kZSBjYW4gb25seSBiZSBleGVjdXRlZCBieSBlaXRoZXIgdGhlIHNoYXJlZE1vZGVsQ2hhbmdlZCBoYW5kbGVyXG4gICAgICAgICAqIG9yIHRoZSBtb2RlbERCIGNoYW5nZSBoYW5kbGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgX29uU2hhcmVkTW9kZWxDaGFuZ2VkKHNlbmRlciwgY2hhbmdlKSB7XG4gICAgICAgICAgICBnbG9iYWxNb2RlbERCTXV0ZXgoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2Uuc291cmNlQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5tb2RlbERCLmdldCgndmFsdWUnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJwb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2Uuc291cmNlQ2hhbmdlLmZvckVhY2goZGVsdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlbHRhLmluc2VydCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuaW5zZXJ0KGN1cnJwb3MsIGRlbHRhLmluc2VydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycnBvcyArPSBkZWx0YS5pbnNlcnQubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGVsdGEuZGVsZXRlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5yZW1vdmUoY3VycnBvcywgY3VycnBvcyArIGRlbHRhLmRlbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkZWx0YS5yZXRhaW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJwb3MgKz0gZGVsdGEucmV0YWluO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBtb2RlbERCIHZhbHVlLlxuICAgICAgICAgKi9cbiAgICAgICAgX29uTW9kZWxEQlZhbHVlQ2hhbmdlZCh2YWx1ZSwgZXZlbnQpIHtcbiAgICAgICAgICAgIGdsb2JhbE1vZGVsREJNdXRleCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRNb2RlbC50cmFuc2FjdCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaW5zZXJ0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXJlZE1vZGVsLnVwZGF0ZVNvdXJjZShldmVudC5zdGFydCwgZXZlbnQuc3RhcnQsIGV2ZW50LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZWRNb2RlbC51cGRhdGVTb3VyY2UoZXZlbnQuc3RhcnQsIGV2ZW50LmVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVkTW9kZWwuc2V0U291cmNlKHZhbHVlLnRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29kZSc7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiBhIG1pbWV0eXBlIGNoYW5nZXMuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgbWltZVR5cGVDaGFuZ2VkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21pbWVUeXBlQ2hhbmdlZDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBzaGFyZWQgbW9kZWwgd2FzIHN3aXRjaGVkLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IHNoYXJlZE1vZGVsU3dpdGNoZWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2hhcmVkTW9kZWxTd2l0Y2hlZDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSB2YWx1ZSBvZiB0aGUgbW9kZWwuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbERCLmdldCgndmFsdWUnKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBzZWxlY3Rpb25zIGZvciB0aGUgbW9kZWwuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgc2VsZWN0aW9ucygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsREIuZ2V0KCdzZWxlY3Rpb25zJyk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgbWltZSB0eXBlIG9mIHRoZSBtb2RlbC5cbiAgICAgICAgICovXG4gICAgICAgIGdldCBtaW1lVHlwZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsREIuZ2V0VmFsdWUoJ21pbWVUeXBlJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IG1pbWVUeXBlKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMubWltZVR5cGU7XG4gICAgICAgICAgICBpZiAob2xkVmFsdWUgPT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tb2RlbERCLnNldFZhbHVlKCdtaW1lVHlwZScsIG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0aGUgbW9kZWwgaXMgZGlzcG9zZWQuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc0Rpc3Bvc2VkO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgdXNlZCBieSB0aGUgbW9kZWwuXG4gICAgICAgICAqL1xuICAgICAgICBkaXNwb3NlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIFNpZ25hbC5jbGVhckRhdGEodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgX29uTW9kZWxEQk1pbWVUeXBlQ2hhbmdlZChtaW1lVHlwZSwgYXJncykge1xuICAgICAgICAgICAgdGhpcy5fbWltZVR5cGVDaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgICAgIG5hbWU6ICdtaW1lVHlwZScsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IGFyZ3Mub2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IGFyZ3MubmV3VmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIENvZGVFZGl0b3IuTW9kZWwgPSBNb2RlbDtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIGFuIGVkaXRvci5cbiAgICAgKi9cbiAgICBDb2RlRWRpdG9yLmRlZmF1bHRDb25maWcgPSB7XG4gICAgICAgIGF1dG9DbG9zaW5nQnJhY2tldHM6IGZhbHNlLFxuICAgICAgICBjb2RlRm9sZGluZzogZmFsc2UsXG4gICAgICAgIGN1cnNvckJsaW5rUmF0ZTogNTMwLFxuICAgICAgICBmb250RmFtaWx5OiBudWxsLFxuICAgICAgICBmb250U2l6ZTogbnVsbCxcbiAgICAgICAgaGFuZGxlUGFzdGU6IHRydWUsXG4gICAgICAgIGluc2VydFNwYWNlczogdHJ1ZSxcbiAgICAgICAgbGluZUhlaWdodDogbnVsbCxcbiAgICAgICAgbGluZU51bWJlcnM6IGZhbHNlLFxuICAgICAgICBsaW5lV3JhcDogJ29uJyxcbiAgICAgICAgbWF0Y2hCcmFja2V0czogdHJ1ZSxcbiAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICB0YWJTaXplOiA0LFxuICAgICAgICBydWxlcnM6IFtdLFxuICAgICAgICBzaG93VHJhaWxpbmdTcGFjZTogZmFsc2UsXG4gICAgICAgIHdvcmRXcmFwQ29sdW1uOiA4MFxuICAgIH07XG59KShDb2RlRWRpdG9yIHx8IChDb2RlRWRpdG9yID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVkaXRvci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBjb2RlZWRpdG9yXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vZWRpdG9yJztcbmV4cG9ydCAqIGZyb20gJy4vanNvbmVkaXRvcic7XG5leHBvcnQgKiBmcm9tICcuL3dpZGdldCc7XG5leHBvcnQgKiBmcm9tICcuL2ZhY3RvcnknO1xuZXhwb3J0ICogZnJvbSAnLi9taW1ldHlwZSc7XG5leHBvcnQgKiBmcm9tICcuL3Rva2Vucyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGNoZWNrSWNvbiwgdW5kb0ljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IEpTT05FeHQgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuaW1wb3J0IHsgQ29kZUVkaXRvciB9IGZyb20gJy4vZWRpdG9yJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYSBKU09ORWRpdG9yIGluc3RhbmNlLlxuICovXG5jb25zdCBKU09ORURJVE9SX0NMQVNTID0gJ2pwLUpTT05FZGl0b3InO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB3aGVuIHRoZSBNZXRhZGF0YSBlZGl0b3IgY29udGFpbnMgaW52YWxpZCBKU09OLlxuICovXG5jb25zdCBFUlJPUl9DTEFTUyA9ICdqcC1tb2QtZXJyb3InO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byB0aGUgZWRpdG9yIGhvc3Qgbm9kZS5cbiAqL1xuY29uc3QgSE9TVF9DTEFTUyA9ICdqcC1KU09ORWRpdG9yLWhvc3QnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byB0aGUgaGVhZGVyIGFyZWEuXG4gKi9cbmNvbnN0IEhFQURFUl9DTEFTUyA9ICdqcC1KU09ORWRpdG9yLWhlYWRlcic7XG4vKipcbiAqIEEgd2lkZ2V0IGZvciBlZGl0aW5nIG9ic2VydmFibGUgSlNPTi5cbiAqL1xuZXhwb3J0IGNsYXNzIEpTT05FZGl0b3IgZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBKU09OIGVkaXRvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2RhdGFEaXJ0eSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbnB1dERpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3NvdXJjZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsVmFsdWUgPSBKU09ORXh0LmVtcHR5T2JqZWN0O1xuICAgICAgICB0aGlzLl9jaGFuZ2VHdWFyZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX3RyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhKU09ORURJVE9SX0NMQVNTKTtcbiAgICAgICAgdGhpcy5oZWFkZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuaGVhZGVyTm9kZS5jbGFzc05hbWUgPSBIRUFERVJfQ0xBU1M7XG4gICAgICAgIHRoaXMucmV2ZXJ0QnV0dG9uTm9kZSA9IHVuZG9JY29uLmVsZW1lbnQoe1xuICAgICAgICAgICAgdGFnOiAnc3BhbicsXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5fdHJhbnMuX18oJ1JldmVydCBjaGFuZ2VzIHRvIGRhdGEnKVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb21taXRCdXR0b25Ob2RlID0gY2hlY2tJY29uLmVsZW1lbnQoe1xuICAgICAgICAgICAgdGFnOiAnc3BhbicsXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5fdHJhbnMuX18oJ0NvbW1pdCBjaGFuZ2VzIHRvIGRhdGEnKSxcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICc4cHgnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVkaXRvckhvc3ROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZWRpdG9ySG9zdE5vZGUuY2xhc3NOYW1lID0gSE9TVF9DTEFTUztcbiAgICAgICAgdGhpcy5oZWFkZXJOb2RlLmFwcGVuZENoaWxkKHRoaXMucmV2ZXJ0QnV0dG9uTm9kZSk7XG4gICAgICAgIHRoaXMuaGVhZGVyTm9kZS5hcHBlbmRDaGlsZCh0aGlzLmNvbW1pdEJ1dHRvbk5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGhpcy5oZWFkZXJOb2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKHRoaXMuZWRpdG9ySG9zdE5vZGUpO1xuICAgICAgICBjb25zdCBtb2RlbCA9IG5ldyBDb2RlRWRpdG9yLk1vZGVsKCk7XG4gICAgICAgIG1vZGVsLnZhbHVlLnRleHQgPSB0aGlzLl90cmFucy5fXygnTm8gZGF0YSEnKTtcbiAgICAgICAgbW9kZWwubWltZVR5cGUgPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICAgIG1vZGVsLnZhbHVlLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblZhbHVlQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBvcHRpb25zLmVkaXRvckZhY3RvcnkoeyBob3N0OiB0aGlzLmVkaXRvckhvc3ROb2RlLCBtb2RlbCB9KTtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9uKCdyZWFkT25seScsIHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgb2JzZXJ2YWJsZSBzb3VyY2UuXG4gICAgICovXG4gICAgZ2V0IHNvdXJjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZTtcbiAgICB9XG4gICAgc2V0IHNvdXJjZSh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5fc291cmNlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9zb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZS5jaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5fb25Tb3VyY2VDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zb3VyY2UgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9uKCdyZWFkT25seScsIHZhbHVlID09PSBudWxsKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB2YWx1ZS5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25Tb3VyY2VDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRWYWx1ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgd2hldGhlciB0aGUgZWRpdG9yIGlzIGRpcnR5LlxuICAgICAqL1xuICAgIGdldCBpc0RpcnR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YURpcnR5IHx8IHRoaXMuX2lucHV0RGlydHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgbWV0aG9kIGltcGxlbWVudHMgdGhlIERPTSBgRXZlbnRMaXN0ZW5lcmAgaW50ZXJmYWNlIGFuZCBpc1xuICAgICAqIGNhbGxlZCBpbiByZXNwb25zZSB0byBldmVudHMgb24gdGhlIG5vdGVib29rIHBhbmVsJ3Mgbm9kZS4gSXQgc2hvdWxkXG4gICAgICogbm90IGJlIGNhbGxlZCBkaXJlY3RseSBieSB1c2VyIGNvZGUuXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdibHVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRCbHVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRDbGljayhldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgYWZ0ZXItYXR0YWNoYCBtZXNzYWdlcyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5lZGl0b3JIb3N0Tm9kZTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5yZXZlcnRCdXR0b25Ob2RlLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuY29tbWl0QnV0dG9uTm9kZS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmhlYWRlck5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgYWZ0ZXItc2hvd2AgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25BZnRlclNob3cobXNnKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgdXBkYXRlLXJlcXVlc3RgIG1lc3NhZ2VzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uVXBkYXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IucmVmcmVzaCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYGJlZm9yZS1kZXRhY2hgIG1lc3NhZ2VzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uQmVmb3JlRGV0YWNoKG1zZykge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5lZGl0b3JIb3N0Tm9kZTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5oZWFkZXJOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgbWV0YWRhdGEgb2YgdGhlIHNvdXJjZS5cbiAgICAgKi9cbiAgICBfb25Tb3VyY2VDaGFuZ2VkKHNlbmRlciwgYXJncykge1xuICAgICAgICBpZiAodGhpcy5fY2hhbmdlR3VhcmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faW5wdXREaXJ0eSB8fCB0aGlzLmVkaXRvci5oYXNGb2N1cygpKSB7XG4gICAgICAgICAgICB0aGlzLl9kYXRhRGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldFZhbHVlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBjaGFuZ2UgZXZlbnRzLlxuICAgICAqL1xuICAgIF9vblZhbHVlQ2hhbmdlZCgpIHtcbiAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gSlNPTi5wYXJzZSh0aGlzLmVkaXRvci5tb2RlbC52YWx1ZS50ZXh0KTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoRVJST1JfQ0xBU1MpO1xuICAgICAgICAgICAgdGhpcy5faW5wdXREaXJ0eSA9XG4gICAgICAgICAgICAgICAgIXRoaXMuX2NoYW5nZUd1YXJkICYmICFKU09ORXh0LmRlZXBFcXVhbCh2YWx1ZSwgdGhpcy5fb3JpZ2luYWxWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhFUlJPUl9DTEFTUyk7XG4gICAgICAgICAgICB0aGlzLl9pbnB1dERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXZlcnRCdXR0b25Ob2RlLmhpZGRlbiA9ICF0aGlzLl9pbnB1dERpcnR5O1xuICAgICAgICB0aGlzLmNvbW1pdEJ1dHRvbk5vZGUuaGlkZGVuID0gIXZhbGlkIHx8ICF0aGlzLl9pbnB1dERpcnR5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYmx1ciBldmVudHMgZm9yIHRoZSB0ZXh0IGFyZWEuXG4gICAgICovXG4gICAgX2V2dEJsdXIoZXZlbnQpIHtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBtZXRhZGF0YSBpZiBuZWNlc3NhcnkuXG4gICAgICAgIGlmICghdGhpcy5faW5wdXREaXJ0eSAmJiB0aGlzLl9kYXRhRGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGNsaWNrIGV2ZW50cyBmb3IgdGhlIGJ1dHRvbnMuXG4gICAgICovXG4gICAgX2V2dENsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKHRoaXMucmV2ZXJ0QnV0dG9uTm9kZS5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29tbWl0QnV0dG9uTm9kZS5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY29tbWl0QnV0dG9uTm9kZS5oaWRkZW4gJiYgIXRoaXMuaGFzQ2xhc3MoRVJST1JfQ0xBU1MpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlR3VhcmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX21lcmdlQ29udGVudCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUd1YXJkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0VmFsdWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmVkaXRvckhvc3ROb2RlLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVyZ2UgdGhlIHVzZXIgY29udGVudC5cbiAgICAgKi9cbiAgICBfbWVyZ2VDb250ZW50KCkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMuZWRpdG9yLm1vZGVsO1xuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLl9vcmlnaW5hbFZhbHVlO1xuICAgICAgICBjb25zdCB1c2VyID0gSlNPTi5wYXJzZShtb2RlbC52YWx1ZS50ZXh0KTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5zb3VyY2U7XG4gICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgaXQgaXMgaW4gdXNlciBhbmQgaGFzIGNoYW5nZWQgZnJvbSBvbGQsIHNldCBpbiBuZXcuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHVzZXIpIHtcbiAgICAgICAgICAgIGlmICghSlNPTkV4dC5kZWVwRXF1YWwodXNlcltrZXldLCBvbGRba2V5XSB8fCBudWxsKSkge1xuICAgICAgICAgICAgICAgIHNvdXJjZS5zZXQoa2V5LCB1c2VyW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIGl0IHdhcyBpbiBvbGQgYW5kIGlzIG5vdCBpbiB1c2VyLCByZW1vdmUgZnJvbSBzb3VyY2UuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9sZCkge1xuICAgICAgICAgICAgaWYgKCEoa2V5IGluIHVzZXIpKSB7XG4gICAgICAgICAgICAgICAgc291cmNlLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdmFsdWUgZ2l2ZW4gdGhlIG93bmVyIGNvbnRlbnRzLlxuICAgICAqL1xuICAgIF9zZXRWYWx1ZSgpIHtcbiAgICAgICAgdGhpcy5fZGF0YURpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lucHV0RGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXZlcnRCdXR0b25Ob2RlLmhpZGRlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuY29tbWl0QnV0dG9uTm9kZS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKEVSUk9SX0NMQVNTKTtcbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLmVkaXRvci5tb2RlbDtcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuX3NvdXJjZSA/IHRoaXMuX3NvdXJjZS50b0pTT04oKSA6IHt9O1xuICAgICAgICB0aGlzLl9jaGFuZ2VHdWFyZCA9IHRydWU7XG4gICAgICAgIGlmIChjb250ZW50ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgIG1vZGVsLnZhbHVlLnRleHQgPSB0aGlzLl90cmFucy5fXygnTm8gZGF0YSEnKTtcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsVmFsdWUgPSBKU09ORXh0LmVtcHR5T2JqZWN0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBKU09OLnN0cmluZ2lmeShjb250ZW50LCBudWxsLCA0KTtcbiAgICAgICAgICAgIG1vZGVsLnZhbHVlLnRleHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsVmFsdWUgPSBjb250ZW50O1xuICAgICAgICAgICAgLy8gTW92ZSB0aGUgY3Vyc29yIHRvIHdpdGhpbiB0aGUgYnJhY2UuXG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMSAmJiB2YWx1ZVswXSA9PT0gJ3snKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2V0Q3Vyc29yUG9zaXRpb24oeyBsaW5lOiAwLCBjb2x1bW46IDEgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lZGl0b3IucmVmcmVzaCgpO1xuICAgICAgICB0aGlzLl9jaGFuZ2VHdWFyZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbW1pdEJ1dHRvbk5vZGUuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXZlcnRCdXR0b25Ob2RlLmhpZGRlbiA9IHRydWU7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9anNvbmVkaXRvci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBgSUVkaXRvck1pbWVUeXBlU2VydmljZWAuXG4gKi9cbmV4cG9ydCB2YXIgSUVkaXRvck1pbWVUeXBlU2VydmljZTtcbihmdW5jdGlvbiAoSUVkaXRvck1pbWVUeXBlU2VydmljZSkge1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IG1pbWUgdHlwZS5cbiAgICAgKi9cbiAgICBJRWRpdG9yTWltZVR5cGVTZXJ2aWNlLmRlZmF1bHRNaW1lVHlwZSA9ICd0ZXh0L3BsYWluJztcbn0pKElFZGl0b3JNaW1lVHlwZVNlcnZpY2UgfHwgKElFZGl0b3JNaW1lVHlwZVNlcnZpY2UgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWltZXR5cGUuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVG9rZW4gfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG4vKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuLyoqXG4gKiBDb2RlIGVkaXRvciBzZXJ2aWNlcyB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElFZGl0b3JTZXJ2aWNlcyA9IG5ldyBUb2tlbignQGp1cHl0ZXJsYWIvY29kZWVkaXRvcjpJRWRpdG9yU2VydmljZXMnKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRva2Vucy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBhbiBlZGl0b3Igd2lkZ2V0IHRoYXQgaGFzIGEgcHJpbWFyeSBzZWxlY3Rpb24uXG4gKi9cbmNvbnN0IEhBU19TRUxFQ1RJT05fQ0xBU1MgPSAnanAtbW9kLWhhcy1wcmltYXJ5LXNlbGVjdGlvbic7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGFuIGVkaXRvciB3aWRnZXQgdGhhdCBoYXMgYSBjdXJzb3Ivc2VsZWN0aW9uXG4gKiB3aXRoaW4gdGhlIHdoaXRlc3BhY2UgYXQgdGhlIGJlZ2lubmluZyBvZiBhIGxpbmVcbiAqL1xuY29uc3QgSEFTX0lOX0xFQURJTkdfV0hJVEVTUEFDRV9DTEFTUyA9ICdqcC1tb2QtaW4tbGVhZGluZy13aGl0ZXNwYWNlJztcbi8qKlxuICogQSBjbGFzcyB1c2VkIHRvIGluZGljYXRlIGEgZHJvcCB0YXJnZXQuXG4gKi9cbmNvbnN0IERST1BfVEFSR0VUX0NMQVNTID0gJ2pwLW1vZC1kcm9wVGFyZ2V0Jztcbi8qKlxuICogUmVnRXhwIHRvIHRlc3QgZm9yIGxlYWRpbmcgd2hpdGVzcGFjZVxuICovXG5jb25zdCBsZWFkaW5nV2hpdGVzcGFjZVJlID0gL15cXHMrJC87XG4vKipcbiAqIEEgd2lkZ2V0IHdoaWNoIGhvc3RzIGEgY29kZSBlZGl0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb2RlRWRpdG9yV3JhcHBlciBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGNvZGUgZWRpdG9yIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2hhc1JlZnJlc2hlZFNpbmNlQXR0YWNoID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGVkaXRvciA9ICh0aGlzLmVkaXRvciA9IG9wdGlvbnMuZmFjdG9yeSh7XG4gICAgICAgICAgICBob3N0OiB0aGlzLm5vZGUsXG4gICAgICAgICAgICBtb2RlbDogb3B0aW9ucy5tb2RlbCxcbiAgICAgICAgICAgIHV1aWQ6IG9wdGlvbnMudXVpZCxcbiAgICAgICAgICAgIGNvbmZpZzogb3B0aW9ucy5jb25maWcsXG4gICAgICAgICAgICBzZWxlY3Rpb25TdHlsZTogb3B0aW9ucy5zZWxlY3Rpb25TdHlsZVxuICAgICAgICB9KSk7XG4gICAgICAgIGVkaXRvci5tb2RlbC5zZWxlY3Rpb25zLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblNlbGVjdGlvbnNDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlT25TaG93ID0gb3B0aW9ucy51cGRhdGVPblNob3cgIT09IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1vZGVsIHVzZWQgYnkgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBnZXQgbW9kZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvci5tb2RlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLmVkaXRvci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgbWV0aG9kIGltcGxlbWVudHMgdGhlIERPTSBgRXZlbnRMaXN0ZW5lcmAgaW50ZXJmYWNlIGFuZCBpc1xuICAgICAqIGNhbGxlZCBpbiByZXNwb25zZSB0byBldmVudHMgb24gdGhlIG5vdGVib29rIHBhbmVsJ3Mgbm9kZS4gSXQgc2hvdWxkXG4gICAgICogbm90IGJlIGNhbGxlZCBkaXJlY3RseSBieSB1c2VyIGNvZGUuXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdsbS1kcmFnZW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dERyYWdFbnRlcihldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsbS1kcmFnbGVhdmUnOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dERyYWdMZWF2ZShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsbS1kcmFnb3Zlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0RHJhZ092ZXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbG0tZHJvcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0RHJvcChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBgJ2FjdGl2YXRlLXJlcXVlc3QnYCBtZXNzYWdlcy5cbiAgICAgKi9cbiAgICBvbkFjdGl2YXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBtZXNzYWdlIGhhbmRsZXIgaW52b2tlZCBvbiBhbiBgJ2FmdGVyLWF0dGFjaCdgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25BZnRlckF0dGFjaChtc2cpIHtcbiAgICAgICAgc3VwZXIub25BZnRlckF0dGFjaChtc2cpO1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2xtLWRyYWdlbnRlcicsIHRoaXMpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2xtLWRyYWdsZWF2ZScsIHRoaXMpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2xtLWRyYWdvdmVyJywgdGhpcyk7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbG0tZHJvcCcsIHRoaXMpO1xuICAgICAgICAvLyBXZSBoYXZlIHRvIHJlZnJlc2ggYXQgbGVhc3Qgb25jZSBhZnRlciBhdHRhY2hpbmcsXG4gICAgICAgIC8vIHdoaWxlIHZpc2libGUuXG4gICAgICAgIHRoaXMuX2hhc1JlZnJlc2hlZFNpbmNlQXR0YWNoID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYGJlZm9yZS1kZXRhY2hgIG1lc3NhZ2VzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uQmVmb3JlRGV0YWNoKG1zZykge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xtLWRyYWdlbnRlcicsIHRoaXMpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xtLWRyYWdsZWF2ZScsIHRoaXMpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xtLWRyYWdvdmVyJywgdGhpcyk7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG0tZHJvcCcsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGFuIGAnYWZ0ZXItc2hvdydgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25BZnRlclNob3cobXNnKSB7XG4gICAgICAgIGlmICh0aGlzLl91cGRhdGVPblNob3cgfHwgIXRoaXMuX2hhc1JlZnJlc2hlZFNpbmNlQXR0YWNoKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgbWVzc2FnZSBoYW5kbGVyIGludm9rZWQgb24gYSBgJ3Jlc2l6ZSdgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25SZXNpemUobXNnKSB7XG4gICAgICAgIGlmIChtc2cud2lkdGggPj0gMCAmJiBtc2cuaGVpZ2h0ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNldFNpemUobXNnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IucmVzaXplVG9GaXQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGFuIGAndXBkYXRlLXJlcXVlc3QnYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uVXBkYXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9oYXNSZWZyZXNoZWRTaW5jZUF0dGFjaCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIGluIG1vZGVsIHNlbGVjdGlvbnMuXG4gICAgICovXG4gICAgX29uU2VsZWN0aW9uc0NoYW5nZWQoKSB7XG4gICAgICAgIGNvbnN0IHsgc3RhcnQsIGVuZCB9ID0gdGhpcy5lZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIGlmIChzdGFydC5jb2x1bW4gIT09IGVuZC5jb2x1bW4gfHwgc3RhcnQubGluZSAhPT0gZW5kLmxpbmUpIHtcbiAgICAgICAgICAgIC8vIGEgc2VsZWN0aW9uIHdhcyBtYWRlXG4gICAgICAgICAgICB0aGlzLmFkZENsYXNzKEhBU19TRUxFQ1RJT05fQ0xBU1MpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhIQVNfSU5fTEVBRElOR19XSElURVNQQUNFX0NMQVNTKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoZSBjdXJzb3Igd2FzIHBsYWNlZFxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhIQVNfU0VMRUNUSU9OX0NMQVNTKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRvclxuICAgICAgICAgICAgICAgIC5nZXRMaW5lKGVuZC5saW5lKVxuICAgICAgICAgICAgICAgIC5zbGljZSgwLCBlbmQuY29sdW1uKVxuICAgICAgICAgICAgICAgIC5tYXRjaChsZWFkaW5nV2hpdGVzcGFjZVJlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoSEFTX0lOX0xFQURJTkdfV0hJVEVTUEFDRV9DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKEhBU19JTl9MRUFESU5HX1dISVRFU1BBQ0VfQ0xBU1MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdsbS1kcmFnZW50ZXInYCBldmVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfZXZ0RHJhZ0VudGVyKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvci5nZXRPcHRpb24oJ3JlYWRPbmx5JykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gUHJpdmF0ZS5maW5kVGV4dERhdGEoZXZlbnQubWltZURhdGEpO1xuICAgICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLW1vZC1kcm9wVGFyZ2V0Jyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdsbS1kcmFnbGVhdmUnYCBldmVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfZXZ0RHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoRFJPUF9UQVJHRVRfQ0xBU1MpO1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IuZ2V0T3B0aW9uKCdyZWFkT25seScpID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGF0YSA9IFByaXZhdGUuZmluZFRleHREYXRhKGV2ZW50Lm1pbWVEYXRhKTtcbiAgICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnbG0tZHJhZ292ZXInYCBldmVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfZXZ0RHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhEUk9QX1RBUkdFVF9DTEFTUyk7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvci5nZXRPcHRpb24oJ3JlYWRPbmx5JykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gUHJpdmF0ZS5maW5kVGV4dERhdGEoZXZlbnQubWltZURhdGEpO1xuICAgICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LmRyb3BBY3Rpb24gPSAnY29weSc7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoRFJPUF9UQVJHRVRfQ0xBU1MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnbG0tZHJvcCdgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnREcm9wKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvci5nZXRPcHRpb24oJ3JlYWRPbmx5JykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gUHJpdmF0ZS5maW5kVGV4dERhdGEoZXZlbnQubWltZURhdGEpO1xuICAgICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZSA9IHtcbiAgICAgICAgICAgIHRvcDogZXZlbnQueSxcbiAgICAgICAgICAgIGJvdHRvbTogZXZlbnQueSxcbiAgICAgICAgICAgIGxlZnQ6IGV2ZW50LngsXG4gICAgICAgICAgICByaWdodDogZXZlbnQueCxcbiAgICAgICAgICAgIHg6IGV2ZW50LngsXG4gICAgICAgICAgICB5OiBldmVudC55LFxuICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDBcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmVkaXRvci5nZXRQb3NpdGlvbkZvckNvb3JkaW5hdGUoY29vcmRpbmF0ZSk7XG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoRFJPUF9UQVJHRVRfQ0xBU1MpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKGV2ZW50LnByb3Bvc2VkQWN0aW9uID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIGV2ZW50LmRyb3BBY3Rpb24gPSAnbm9uZSc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5lZGl0b3IuZ2V0T2Zmc2V0QXQocG9zaXRpb24pO1xuICAgICAgICB0aGlzLm1vZGVsLnZhbHVlLmluc2VydChvZmZzZXQsIGRhdGEpO1xuICAgIH1cbn1cbi8qKlxuICogQSBuYW1lc3BhY2UgZm9yIHByaXZhdGUgZnVuY3Rpb25hbGl0eS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIE1pbWVEYXRhIGluc3RhbmNlLCBleHRyYWN0IHRoZSBmaXJzdCB0ZXh0IGRhdGEsIGlmIGFueS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kVGV4dERhdGEobWltZSkge1xuICAgICAgICBjb25zdCB0eXBlcyA9IG1pbWUudHlwZXMoKTtcbiAgICAgICAgY29uc3QgdGV4dFR5cGUgPSB0eXBlcy5maW5kKHQgPT4gdC5pbmRleE9mKCd0ZXh0JykgPT09IDApO1xuICAgICAgICBpZiAodGV4dFR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWltZS5nZXREYXRhKHRleHRUeXBlKTtcbiAgICB9XG4gICAgUHJpdmF0ZS5maW5kVGV4dERhdGEgPSBmaW5kVGV4dERhdGE7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpZGdldC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9