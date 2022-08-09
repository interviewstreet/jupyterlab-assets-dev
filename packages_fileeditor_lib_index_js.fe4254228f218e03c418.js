(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_fileeditor_lib_index_js"],{

/***/ "../../packages/fileeditor/lib/index.js":
/*!**********************************************!*\
  !*** ../../packages/fileeditor/lib/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabSpaceStatus": () => (/* reexport safe */ _tabspacestatus__WEBPACK_IMPORTED_MODULE_0__.TabSpaceStatus),
/* harmony export */   "IEditorTracker": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_1__.IEditorTracker),
/* harmony export */   "FileEditor": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.FileEditor),
/* harmony export */   "FileEditorCodeWrapper": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.FileEditorCodeWrapper),
/* harmony export */   "FileEditorFactory": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_2__.FileEditorFactory)
/* harmony export */ });
/* harmony import */ var _tabspacestatus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabspacestatus */ "../../packages/fileeditor/lib/tabspacestatus.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokens */ "../../packages/fileeditor/lib/tokens.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widget */ "../../packages/fileeditor/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module fileeditor
 */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/fileeditor/lib/tabspacestatus.js":
/*!*******************************************************!*\
  !*** ../../packages/fileeditor/lib/tabspacestatus.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabSpaceStatus": () => (/* binding */ TabSpaceStatus)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




/**
 * A pure functional component for rendering the TabSpace status.
 */
function TabSpaceComponent(props) {
    const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
    const trans = translator.load('jupyterlab');
    const description = props.isSpaces
        ? trans.__('Spaces')
        : trans.__('Tab Size');
    return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.TextItem, { onClick: props.handleClick, source: `${description}: ${props.tabSpace}`, title: trans.__('Change Tab indentation…') }));
}
/**
 * A VDomRenderer for a tabs vs. spaces status item.
 */
class TabSpaceStatus extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Create a new tab/space status item.
     */
    constructor(options) {
        super(new TabSpaceStatus.Model());
        this._popup = null;
        this._menu = options.menu;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        this.addClass(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.interactiveItem);
    }
    /**
     * Render the TabSpace status item.
     */
    render() {
        if (!this.model || !this.model.config) {
            return null;
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(TabSpaceComponent, { isSpaces: this.model.config.insertSpaces, tabSpace: this.model.config.tabSize, handleClick: () => this._handleClick(), translator: this.translator }));
        }
    }
    /**
     * Handle a click on the status item.
     */
    _handleClick() {
        const menu = this._menu;
        if (this._popup) {
            this._popup.dispose();
        }
        menu.aboutToClose.connect(this._menuClosed, this);
        this._popup = (0,_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.showPopup)({
            body: menu,
            anchor: this,
            align: 'right'
        });
    }
    _menuClosed() {
        this.removeClass(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.clickedItem);
    }
}
/**
 * A namespace for TabSpace statics.
 */
(function (TabSpaceStatus) {
    /**
     * A VDomModel for the TabSpace status item.
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        constructor() {
            super(...arguments);
            this._config = null;
        }
        /**
         * The editor config from the settings system.
         */
        get config() {
            return this._config;
        }
        set config(val) {
            const oldConfig = this._config;
            this._config = val;
            this._triggerChange(oldConfig, this._config);
        }
        _triggerChange(oldValue, newValue) {
            const oldSpaces = oldValue && oldValue.insertSpaces;
            const oldSize = oldValue && oldValue.tabSize;
            const newSpaces = newValue && newValue.insertSpaces;
            const newSize = newValue && newValue.tabSize;
            if (oldSpaces !== newSpaces || oldSize !== newSize) {
                this.stateChanged.emit(void 0);
            }
        }
    }
    TabSpaceStatus.Model = Model;
})(TabSpaceStatus || (TabSpaceStatus = {}));
//# sourceMappingURL=tabspacestatus.js.map

/***/ }),

/***/ "../../packages/fileeditor/lib/tokens.js":
/*!***********************************************!*\
  !*** ../../packages/fileeditor/lib/tokens.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IEditorTracker": () => (/* binding */ IEditorTracker)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The editor tracker token.
 */
const IEditorTracker = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/fileeditor:IEditorTracker');
/* tslint:enable */
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/fileeditor/lib/widget.js":
/*!***********************************************!*\
  !*** ../../packages/fileeditor/lib/widget.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileEditorCodeWrapper": () => (/* binding */ FileEditorCodeWrapper),
/* harmony export */   "FileEditor": () => (/* binding */ FileEditor),
/* harmony export */   "FileEditorFactory": () => (/* binding */ FileEditorFactory)
/* harmony export */ });
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_4__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.





/**
 * The data attribute added to a widget that can run code.
 */
const CODE_RUNNER = 'jpCodeRunner';
/**
 * The data attribute added to a widget that can undo.
 */
const UNDOER = 'jpUndoer';
/**
 * A code editor wrapper for the file editor.
 *
 * @deprecated since v3.4
 * Note: This class will be removed in v4.0.
 * From now on, you can directly use the class
 * `CodeEditorWrapper` instead on `FileEditorCodeWrapper`.
 */
class FileEditorCodeWrapper extends _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0__.CodeEditorWrapper {
    /**
     * Construct a new editor widget.
     */
    constructor(options) {
        super({
            factory: options.factory,
            model: options.context.model
        });
        this._ready = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_3__.PromiseDelegate();
        const context = (this._context = options.context);
        // TODO: move this to the FileEditor when removing the
        // `FileEditorCodeWrapper`
        this.addClass('jp-FileEditorCodeWrapper');
        this.node.dataset[CODE_RUNNER] = 'true';
        this.node.dataset[UNDOER] = 'true';
        void context.ready.then(() => {
            this._onContextReady();
        });
        if (context.model.modelDB.isCollaborative) {
            const modelDB = context.model.modelDB;
            void modelDB.connected.then(() => {
                const collaborators = modelDB.collaborators;
                if (!collaborators) {
                    return;
                }
                // Setup the selection style for collaborators
                const localCollaborator = collaborators.localCollaborator;
                this.editor.uuid = localCollaborator.sessionId;
                this.editor.selectionStyle = Object.assign(Object.assign({}, _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_0__.CodeEditor.defaultSelectionStyle), { color: localCollaborator.color });
                collaborators.changed.connect(this._onCollaboratorsChanged, this);
                // Trigger an initial onCollaboratorsChanged event.
                this._onCollaboratorsChanged();
            });
        }
    }
    /**
     * Get the context for the editor widget.
     */
    get context() {
        return this._context;
    }
    /**
     * A promise that resolves when the file editor is ready.
     */
    get ready() {
        return this._ready.promise;
    }
    /**
     * Handle actions that should be taken when the context is ready.
     */
    _onContextReady() {
        if (this.isDisposed) {
            return;
        }
        // Prevent the initial loading from disk from being in the editor history.
        this.editor.clearHistory();
        // Resolve the ready promise.
        this._ready.resolve(undefined);
    }
    /**
     * Handle a change to the collaborators on the model
     * by updating UI elements associated with them.
     */
    _onCollaboratorsChanged() {
        // If there are selections corresponding to non-collaborators,
        // they are stale and should be removed.
        const collaborators = this._context.model.modelDB.collaborators;
        if (!collaborators) {
            return;
        }
        for (const key of this.editor.model.selections.keys()) {
            if (!collaborators.has(key)) {
                this.editor.model.selections.delete(key);
            }
        }
    }
}
/**
 * A widget for editors.
 */
class FileEditor extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Widget {
    /**
     * Construct a new editor widget.
     */
    constructor(options) {
        super();
        this.addClass('jp-FileEditor');
        const context = (this._context = options.context);
        this._mimeTypeService = options.mimeTypeService;
        const editorWidget = (this.editorWidget = new FileEditorCodeWrapper(options));
        this.editor = editorWidget.editor;
        this.model = editorWidget.model;
        // Listen for changes to the path.
        context.pathChanged.connect(this._onPathChanged, this);
        this._onPathChanged();
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.StackedLayout());
        layout.addWidget(editorWidget);
    }
    /**
     * Get the context for the editor widget.
     */
    get context() {
        return this.editorWidget.context;
    }
    /**
     * A promise that resolves when the file editor is ready.
     */
    get ready() {
        return this.editorWidget.ready;
    }
    /**
     * Handle the DOM events for the widget.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the widget's node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        if (!this.model) {
            return;
        }
        switch (event.type) {
            case 'mousedown':
                this._ensureFocus();
                break;
            default:
                break;
        }
    }
    /**
     * Handle `after-attach` messages for the widget.
     */
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        const node = this.node;
        node.addEventListener('mousedown', this);
    }
    /**
     * Handle `before-detach` messages for the widget.
     */
    onBeforeDetach(msg) {
        const node = this.node;
        node.removeEventListener('mousedown', this);
    }
    /**
     * Handle `'activate-request'` messages.
     */
    onActivateRequest(msg) {
        this._ensureFocus();
    }
    /**
     * Ensure that the widget has focus.
     */
    _ensureFocus() {
        if (!this.editor.hasFocus()) {
            this.editor.focus();
        }
    }
    /**
     * Handle a change to the path.
     */
    _onPathChanged() {
        const editor = this.editor;
        const localPath = this._context.localPath;
        editor.model.mimeType = this._mimeTypeService.getMimeTypeByFilePath(localPath);
    }
}
/**
 * A widget factory for editors.
 */
class FileEditorFactory extends _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.ABCWidgetFactory {
    /**
     * Construct a new editor widget factory.
     */
    constructor(options) {
        super(options.factoryOptions);
        this._services = options.editorServices;
    }
    /**
     * Create a new widget given a context.
     */
    createNewWidget(context) {
        const func = this._services.factoryService.newDocumentEditor;
        const factory = options => {
            return func(options);
        };
        const content = new FileEditor({
            factory,
            context,
            mimeTypeService: this._services.mimeTypeService
        });
        content.title.icon = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.textEditorIcon;
        const widget = new _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_1__.DocumentWidget({ content, context });
        return widget;
    }
}
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZmlsZWVkaXRvci9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2ZpbGVlZGl0b3IvbGliL3RhYnNwYWNlc3RhdHVzLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9maWxlZWRpdG9yL2xpYi90b2tlbnMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2ZpbGVlZGl0b3IvbGliL3dpZGdldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNpQztBQUNSO0FBQ0E7QUFDekIsaUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUMrRDtBQUMyQjtBQUNqQztBQUMvQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxtRUFBYztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMERBQW1CLENBQUMsMkRBQVEsR0FBRyx3Q0FBd0MsWUFBWSxJQUFJLGVBQWUsK0NBQStDO0FBQ2pLO0FBQ0E7QUFDQTtBQUNBO0FBQ08sNkJBQTZCLDhEQUFZO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELG1FQUFjO0FBQzlELHNCQUFzQixrRUFBZTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMERBQW1CLHFCQUFxQixxSkFBcUo7QUFDak47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnRUFBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHlCQUF5Qiw4REFBVztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkRBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0NBQXdDO0FBQ3pDLDBDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hHQTtBQUNBO0FBQzBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ08sMkJBQTJCLG9EQUFLO0FBQ3ZDO0FBQ0Esa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1RBO0FBQ0E7QUFDdUU7QUFDSTtBQUNoQjtBQUNQO0FBQ0k7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxvQ0FBb0MscUVBQWlCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDBCQUEwQiw4REFBZTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkVBQTJFLEVBQUUsb0ZBQWdDLElBQUksaUNBQWlDO0FBQ2xKO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08seUJBQXlCLG1EQUFNO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsMERBQWE7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLGdDQUFnQyxxRUFBZ0I7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsNkJBQTZCLHFFQUFjO0FBQzNDLDJCQUEyQixtRUFBYyxFQUFFLG1CQUFtQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQSxrQyIsImZpbGUiOiJwYWNrYWdlc19maWxlZWRpdG9yX2xpYl9pbmRleF9qcy5mZTQyNTQyMjhmMjE4ZTAzYzQxOC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbi8qKlxuICogQHBhY2thZ2VEb2N1bWVudGF0aW9uXG4gKiBAbW9kdWxlIGZpbGVlZGl0b3JcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi90YWJzcGFjZXN0YXR1cyc7XG5leHBvcnQgKiBmcm9tICcuL3Rva2Vucyc7XG5leHBvcnQgKiBmcm9tICcuL3dpZGdldCc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBWRG9tTW9kZWwsIFZEb21SZW5kZXJlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IGNsaWNrZWRJdGVtLCBpbnRlcmFjdGl2ZUl0ZW0sIHNob3dQb3B1cCwgVGV4dEl0ZW0gfSBmcm9tICdAanVweXRlcmxhYi9zdGF0dXNiYXInO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBBIHB1cmUgZnVuY3Rpb25hbCBjb21wb25lbnQgZm9yIHJlbmRlcmluZyB0aGUgVGFiU3BhY2Ugc3RhdHVzLlxuICovXG5mdW5jdGlvbiBUYWJTcGFjZUNvbXBvbmVudChwcm9wcykge1xuICAgIGNvbnN0IHRyYW5zbGF0b3IgPSBwcm9wcy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBwcm9wcy5pc1NwYWNlc1xuICAgICAgICA/IHRyYW5zLl9fKCdTcGFjZXMnKVxuICAgICAgICA6IHRyYW5zLl9fKCdUYWIgU2l6ZScpO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChUZXh0SXRlbSwgeyBvbkNsaWNrOiBwcm9wcy5oYW5kbGVDbGljaywgc291cmNlOiBgJHtkZXNjcmlwdGlvbn06ICR7cHJvcHMudGFiU3BhY2V9YCwgdGl0bGU6IHRyYW5zLl9fKCdDaGFuZ2UgVGFiIGluZGVudGF0aW9u4oCmJykgfSkpO1xufVxuLyoqXG4gKiBBIFZEb21SZW5kZXJlciBmb3IgYSB0YWJzIHZzLiBzcGFjZXMgc3RhdHVzIGl0ZW0uXG4gKi9cbmV4cG9ydCBjbGFzcyBUYWJTcGFjZVN0YXR1cyBleHRlbmRzIFZEb21SZW5kZXJlciB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHRhYi9zcGFjZSBzdGF0dXMgaXRlbS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKG5ldyBUYWJTcGFjZVN0YXR1cy5Nb2RlbCgpKTtcbiAgICAgICAgdGhpcy5fcG9wdXAgPSBudWxsO1xuICAgICAgICB0aGlzLl9tZW51ID0gb3B0aW9ucy5tZW51O1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoaW50ZXJhY3RpdmVJdGVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSBUYWJTcGFjZSBzdGF0dXMgaXRlbS5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RlbCB8fCAhdGhpcy5tb2RlbC5jb25maWcpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFRhYlNwYWNlQ29tcG9uZW50LCB7IGlzU3BhY2VzOiB0aGlzLm1vZGVsLmNvbmZpZy5pbnNlcnRTcGFjZXMsIHRhYlNwYWNlOiB0aGlzLm1vZGVsLmNvbmZpZy50YWJTaXplLCBoYW5kbGVDbGljazogKCkgPT4gdGhpcy5faGFuZGxlQ2xpY2soKSwgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yIH0pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjbGljayBvbiB0aGUgc3RhdHVzIGl0ZW0uXG4gICAgICovXG4gICAgX2hhbmRsZUNsaWNrKCkge1xuICAgICAgICBjb25zdCBtZW51ID0gdGhpcy5fbWVudTtcbiAgICAgICAgaWYgKHRoaXMuX3BvcHVwKSB7XG4gICAgICAgICAgICB0aGlzLl9wb3B1cC5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgbWVudS5hYm91dFRvQ2xvc2UuY29ubmVjdCh0aGlzLl9tZW51Q2xvc2VkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fcG9wdXAgPSBzaG93UG9wdXAoe1xuICAgICAgICAgICAgYm9keTogbWVudSxcbiAgICAgICAgICAgIGFuY2hvcjogdGhpcyxcbiAgICAgICAgICAgIGFsaWduOiAncmlnaHQnXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfbWVudUNsb3NlZCgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhjbGlja2VkSXRlbSk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgVGFiU3BhY2Ugc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChUYWJTcGFjZVN0YXR1cykge1xuICAgIC8qKlxuICAgICAqIEEgVkRvbU1vZGVsIGZvciB0aGUgVGFiU3BhY2Ugc3RhdHVzIGl0ZW0uXG4gICAgICovXG4gICAgY2xhc3MgTW9kZWwgZXh0ZW5kcyBWRG9tTW9kZWwge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICB0aGlzLl9jb25maWcgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZWRpdG9yIGNvbmZpZyBmcm9tIHRoZSBzZXR0aW5ncyBzeXN0ZW0uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgY29uZmlnKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgICAgICAgfVxuICAgICAgICBzZXQgY29uZmlnKHZhbCkge1xuICAgICAgICAgICAgY29uc3Qgb2xkQ29uZmlnID0gdGhpcy5fY29uZmlnO1xuICAgICAgICAgICAgdGhpcy5fY29uZmlnID0gdmFsO1xuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5nZShvbGRDb25maWcsIHRoaXMuX2NvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgX3RyaWdnZXJDaGFuZ2Uob2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRTcGFjZXMgPSBvbGRWYWx1ZSAmJiBvbGRWYWx1ZS5pbnNlcnRTcGFjZXM7XG4gICAgICAgICAgICBjb25zdCBvbGRTaXplID0gb2xkVmFsdWUgJiYgb2xkVmFsdWUudGFiU2l6ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1NwYWNlcyA9IG5ld1ZhbHVlICYmIG5ld1ZhbHVlLmluc2VydFNwYWNlcztcbiAgICAgICAgICAgIGNvbnN0IG5ld1NpemUgPSBuZXdWYWx1ZSAmJiBuZXdWYWx1ZS50YWJTaXplO1xuICAgICAgICAgICAgaWYgKG9sZFNwYWNlcyAhPT0gbmV3U3BhY2VzIHx8IG9sZFNpemUgIT09IG5ld1NpemUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgVGFiU3BhY2VTdGF0dXMuTW9kZWwgPSBNb2RlbDtcbn0pKFRhYlNwYWNlU3RhdHVzIHx8IChUYWJTcGFjZVN0YXR1cyA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10YWJzcGFjZXN0YXR1cy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIFRoZSBlZGl0b3IgdHJhY2tlciB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElFZGl0b3JUcmFja2VyID0gbmV3IFRva2VuKCdAanVweXRlcmxhYi9maWxlZWRpdG9yOklFZGl0b3JUcmFja2VyJyk7XG4vKiB0c2xpbnQ6ZW5hYmxlICovXG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2tlbnMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgQ29kZUVkaXRvciwgQ29kZUVkaXRvcldyYXBwZXIgfSBmcm9tICdAanVweXRlcmxhYi9jb2RlZWRpdG9yJztcbmltcG9ydCB7IEFCQ1dpZGdldEZhY3RvcnksIERvY3VtZW50V2lkZ2V0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvZG9jcmVnaXN0cnknO1xuaW1wb3J0IHsgdGV4dEVkaXRvckljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbmltcG9ydCB7IFByb21pc2VEZWxlZ2F0ZSB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IFN0YWNrZWRMYXlvdXQsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG4vKipcbiAqIFRoZSBkYXRhIGF0dHJpYnV0ZSBhZGRlZCB0byBhIHdpZGdldCB0aGF0IGNhbiBydW4gY29kZS5cbiAqL1xuY29uc3QgQ09ERV9SVU5ORVIgPSAnanBDb2RlUnVubmVyJztcbi8qKlxuICogVGhlIGRhdGEgYXR0cmlidXRlIGFkZGVkIHRvIGEgd2lkZ2V0IHRoYXQgY2FuIHVuZG8uXG4gKi9cbmNvbnN0IFVORE9FUiA9ICdqcFVuZG9lcic7XG4vKipcbiAqIEEgY29kZSBlZGl0b3Igd3JhcHBlciBmb3IgdGhlIGZpbGUgZWRpdG9yLlxuICpcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYzLjRcbiAqIE5vdGU6IFRoaXMgY2xhc3Mgd2lsbCBiZSByZW1vdmVkIGluIHY0LjAuXG4gKiBGcm9tIG5vdyBvbiwgeW91IGNhbiBkaXJlY3RseSB1c2UgdGhlIGNsYXNzXG4gKiBgQ29kZUVkaXRvcldyYXBwZXJgIGluc3RlYWQgb24gYEZpbGVFZGl0b3JDb2RlV3JhcHBlcmAuXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWxlRWRpdG9yQ29kZVdyYXBwZXIgZXh0ZW5kcyBDb2RlRWRpdG9yV3JhcHBlciB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGVkaXRvciB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICBmYWN0b3J5OiBvcHRpb25zLmZhY3RvcnksXG4gICAgICAgICAgICBtb2RlbDogb3B0aW9ucy5jb250ZXh0Lm1vZGVsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9yZWFkeSA9IG5ldyBQcm9taXNlRGVsZWdhdGUoKTtcbiAgICAgICAgY29uc3QgY29udGV4dCA9ICh0aGlzLl9jb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0KTtcbiAgICAgICAgLy8gVE9ETzogbW92ZSB0aGlzIHRvIHRoZSBGaWxlRWRpdG9yIHdoZW4gcmVtb3ZpbmcgdGhlXG4gICAgICAgIC8vIGBGaWxlRWRpdG9yQ29kZVdyYXBwZXJgXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLUZpbGVFZGl0b3JDb2RlV3JhcHBlcicpO1xuICAgICAgICB0aGlzLm5vZGUuZGF0YXNldFtDT0RFX1JVTk5FUl0gPSAndHJ1ZSc7XG4gICAgICAgIHRoaXMubm9kZS5kYXRhc2V0W1VORE9FUl0gPSAndHJ1ZSc7XG4gICAgICAgIHZvaWQgY29udGV4dC5yZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX29uQ29udGV4dFJlYWR5KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY29udGV4dC5tb2RlbC5tb2RlbERCLmlzQ29sbGFib3JhdGl2ZSkge1xuICAgICAgICAgICAgY29uc3QgbW9kZWxEQiA9IGNvbnRleHQubW9kZWwubW9kZWxEQjtcbiAgICAgICAgICAgIHZvaWQgbW9kZWxEQi5jb25uZWN0ZWQudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sbGFib3JhdG9ycyA9IG1vZGVsREIuY29sbGFib3JhdG9ycztcbiAgICAgICAgICAgICAgICBpZiAoIWNvbGxhYm9yYXRvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTZXR1cCB0aGUgc2VsZWN0aW9uIHN0eWxlIGZvciBjb2xsYWJvcmF0b3JzXG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYWxDb2xsYWJvcmF0b3IgPSBjb2xsYWJvcmF0b3JzLmxvY2FsQ29sbGFib3JhdG9yO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnV1aWQgPSBsb2NhbENvbGxhYm9yYXRvci5zZXNzaW9uSWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2VsZWN0aW9uU3R5bGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIENvZGVFZGl0b3IuZGVmYXVsdFNlbGVjdGlvblN0eWxlKSwgeyBjb2xvcjogbG9jYWxDb2xsYWJvcmF0b3IuY29sb3IgfSk7XG4gICAgICAgICAgICAgICAgY29sbGFib3JhdG9ycy5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25Db2xsYWJvcmF0b3JzQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBhbiBpbml0aWFsIG9uQ29sbGFib3JhdG9yc0NoYW5nZWQgZXZlbnQuXG4gICAgICAgICAgICAgICAgdGhpcy5fb25Db2xsYWJvcmF0b3JzQ2hhbmdlZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjb250ZXh0IGZvciB0aGUgZWRpdG9yIHdpZGdldC5cbiAgICAgKi9cbiAgICBnZXQgY29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGZpbGUgZWRpdG9yIGlzIHJlYWR5LlxuICAgICAqL1xuICAgIGdldCByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWR5LnByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhY3Rpb25zIHRoYXQgc2hvdWxkIGJlIHRha2VuIHdoZW4gdGhlIGNvbnRleHQgaXMgcmVhZHkuXG4gICAgICovXG4gICAgX29uQ29udGV4dFJlYWR5KCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHJldmVudCB0aGUgaW5pdGlhbCBsb2FkaW5nIGZyb20gZGlzayBmcm9tIGJlaW5nIGluIHRoZSBlZGl0b3IgaGlzdG9yeS5cbiAgICAgICAgdGhpcy5lZGl0b3IuY2xlYXJIaXN0b3J5KCk7XG4gICAgICAgIC8vIFJlc29sdmUgdGhlIHJlYWR5IHByb21pc2UuXG4gICAgICAgIHRoaXMuX3JlYWR5LnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBjb2xsYWJvcmF0b3JzIG9uIHRoZSBtb2RlbFxuICAgICAqIGJ5IHVwZGF0aW5nIFVJIGVsZW1lbnRzIGFzc29jaWF0ZWQgd2l0aCB0aGVtLlxuICAgICAqL1xuICAgIF9vbkNvbGxhYm9yYXRvcnNDaGFuZ2VkKCkge1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgc2VsZWN0aW9ucyBjb3JyZXNwb25kaW5nIHRvIG5vbi1jb2xsYWJvcmF0b3JzLFxuICAgICAgICAvLyB0aGV5IGFyZSBzdGFsZSBhbmQgc2hvdWxkIGJlIHJlbW92ZWQuXG4gICAgICAgIGNvbnN0IGNvbGxhYm9yYXRvcnMgPSB0aGlzLl9jb250ZXh0Lm1vZGVsLm1vZGVsREIuY29sbGFib3JhdG9ycztcbiAgICAgICAgaWYgKCFjb2xsYWJvcmF0b3JzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5lZGl0b3IubW9kZWwuc2VsZWN0aW9ucy5rZXlzKCkpIHtcbiAgICAgICAgICAgIGlmICghY29sbGFib3JhdG9ycy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLm1vZGVsLnNlbGVjdGlvbnMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEEgd2lkZ2V0IGZvciBlZGl0b3JzLlxuICovXG5leHBvcnQgY2xhc3MgRmlsZUVkaXRvciBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGVkaXRvciB3aWRnZXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKCdqcC1GaWxlRWRpdG9yJyk7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSAodGhpcy5fY29udGV4dCA9IG9wdGlvbnMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuX21pbWVUeXBlU2VydmljZSA9IG9wdGlvbnMubWltZVR5cGVTZXJ2aWNlO1xuICAgICAgICBjb25zdCBlZGl0b3JXaWRnZXQgPSAodGhpcy5lZGl0b3JXaWRnZXQgPSBuZXcgRmlsZUVkaXRvckNvZGVXcmFwcGVyKG9wdGlvbnMpKTtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBlZGl0b3JXaWRnZXQuZWRpdG9yO1xuICAgICAgICB0aGlzLm1vZGVsID0gZWRpdG9yV2lkZ2V0Lm1vZGVsO1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIGNoYW5nZXMgdG8gdGhlIHBhdGguXG4gICAgICAgIGNvbnRleHQucGF0aENoYW5nZWQuY29ubmVjdCh0aGlzLl9vblBhdGhDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fb25QYXRoQ2hhbmdlZCgpO1xuICAgICAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5sYXlvdXQgPSBuZXcgU3RhY2tlZExheW91dCgpKTtcbiAgICAgICAgbGF5b3V0LmFkZFdpZGdldChlZGl0b3JXaWRnZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGNvbnRleHQgZm9yIHRoZSBlZGl0b3Igd2lkZ2V0LlxuICAgICAqL1xuICAgIGdldCBjb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3JXaWRnZXQuY29udGV4dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZmlsZSBlZGl0b3IgaXMgcmVhZHkuXG4gICAgICovXG4gICAgZ2V0IHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3JXaWRnZXQucmVhZHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgRE9NIGV2ZW50cyBmb3IgdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgd2lkZ2V0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgbWV0aG9kIGltcGxlbWVudHMgdGhlIERPTSBgRXZlbnRMaXN0ZW5lcmAgaW50ZXJmYWNlIGFuZCBpc1xuICAgICAqIGNhbGxlZCBpbiByZXNwb25zZSB0byBldmVudHMgb24gdGhlIHdpZGdldCdzIG5vZGUuIEl0IHNob3VsZFxuICAgICAqIG5vdCBiZSBjYWxsZWQgZGlyZWN0bHkgYnkgdXNlciBjb2RlLlxuICAgICAqL1xuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5tb2RlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9lbnN1cmVGb2N1cygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYGFmdGVyLWF0dGFjaGAgbWVzc2FnZXMgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25BZnRlckF0dGFjaChtc2cpIHtcbiAgICAgICAgc3VwZXIub25BZnRlckF0dGFjaChtc2cpO1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYGJlZm9yZS1kZXRhY2hgIG1lc3NhZ2VzIGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIG9uQmVmb3JlRGV0YWNoKG1zZykge1xuICAgICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCdhY3RpdmF0ZS1yZXF1ZXN0J2AgbWVzc2FnZXMuXG4gICAgICovXG4gICAgb25BY3RpdmF0ZVJlcXVlc3QobXNnKSB7XG4gICAgICAgIHRoaXMuX2Vuc3VyZUZvY3VzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuc3VyZSB0aGF0IHRoZSB3aWRnZXQgaGFzIGZvY3VzLlxuICAgICAqL1xuICAgIF9lbnN1cmVGb2N1cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVkaXRvci5oYXNGb2N1cygpKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSB0byB0aGUgcGF0aC5cbiAgICAgKi9cbiAgICBfb25QYXRoQ2hhbmdlZCgpIHtcbiAgICAgICAgY29uc3QgZWRpdG9yID0gdGhpcy5lZGl0b3I7XG4gICAgICAgIGNvbnN0IGxvY2FsUGF0aCA9IHRoaXMuX2NvbnRleHQubG9jYWxQYXRoO1xuICAgICAgICBlZGl0b3IubW9kZWwubWltZVR5cGUgPSB0aGlzLl9taW1lVHlwZVNlcnZpY2UuZ2V0TWltZVR5cGVCeUZpbGVQYXRoKGxvY2FsUGF0aCk7XG4gICAgfVxufVxuLyoqXG4gKiBBIHdpZGdldCBmYWN0b3J5IGZvciBlZGl0b3JzLlxuICovXG5leHBvcnQgY2xhc3MgRmlsZUVkaXRvckZhY3RvcnkgZXh0ZW5kcyBBQkNXaWRnZXRGYWN0b3J5IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgZWRpdG9yIHdpZGdldCBmYWN0b3J5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucy5mYWN0b3J5T3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX3NlcnZpY2VzID0gb3B0aW9ucy5lZGl0b3JTZXJ2aWNlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IHdpZGdldCBnaXZlbiBhIGNvbnRleHQuXG4gICAgICovXG4gICAgY3JlYXRlTmV3V2lkZ2V0KGNvbnRleHQpIHtcbiAgICAgICAgY29uc3QgZnVuYyA9IHRoaXMuX3NlcnZpY2VzLmZhY3RvcnlTZXJ2aWNlLm5ld0RvY3VtZW50RWRpdG9yO1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gb3B0aW9ucyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZnVuYyhvcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IG5ldyBGaWxlRWRpdG9yKHtcbiAgICAgICAgICAgIGZhY3RvcnksXG4gICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgbWltZVR5cGVTZXJ2aWNlOiB0aGlzLl9zZXJ2aWNlcy5taW1lVHlwZVNlcnZpY2VcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRlbnQudGl0bGUuaWNvbiA9IHRleHRFZGl0b3JJY29uO1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBuZXcgRG9jdW1lbnRXaWRnZXQoeyBjb250ZW50LCBjb250ZXh0IH0pO1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpZGdldC5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9