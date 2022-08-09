(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_docmanager_lib_index_js"],{

/***/ "../../packages/docmanager/lib/dialogs.js":
/*!************************************************!*\
  !*** ../../packages/docmanager/lib/dialogs.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renameDialog": () => (/* binding */ renameDialog),
/* harmony export */   "renameFile": () => (/* binding */ renameFile),
/* harmony export */   "shouldOverwrite": () => (/* binding */ shouldOverwrite),
/* harmony export */   "isValidFileName": () => (/* binding */ isValidFileName)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets?1508");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_3__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




/**
 * The class name added to file dialogs.
 */
const FILE_DIALOG_CLASS = 'jp-FileDialog';
/**
 * The class name added for the new name label in the rename dialog
 */
const RENAME_NEW_NAME_TITLE_CLASS = 'jp-new-name-title';
/**
 * Rename a file with a dialog.
 */
function renameDialog(manager, oldPath, translator) {
    translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
    const trans = translator.load('jupyterlab');
    return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
        title: trans.__('Rename File'),
        body: new RenameHandler(oldPath),
        focusNodeSelector: 'input',
        buttons: [
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Rename') })
        ]
    }).then(result => {
        if (!result.value) {
            return null;
        }
        if (!isValidFileName(result.value)) {
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(trans.__('Rename Error'), Error(trans.__('"%1" is not a valid name for a file. Names must have nonzero length, and cannot include "/", "\\", or ":"', result.value)));
            return null;
        }
        const basePath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.dirname(oldPath);
        const newPath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.join(basePath, result.value);
        return renameFile(manager, oldPath, newPath);
    });
}
/**
 * Rename a file, asking for confirmation if it is overwriting another.
 */
function renameFile(manager, oldPath, newPath) {
    return manager.rename(oldPath, newPath).catch(error => {
        if (error.response.status !== 409) {
            // if it's not caused by an already existing file, rethrow
            throw error;
        }
        // otherwise, ask for confirmation
        return shouldOverwrite(newPath).then((value) => {
            if (value) {
                return manager.overwrite(oldPath, newPath);
            }
            return Promise.reject('File not renamed');
        });
    });
}
/**
 * Ask the user whether to overwrite a file.
 */
function shouldOverwrite(path, translator) {
    translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
    const trans = translator.load('jupyterlab');
    const options = {
        title: trans.__('Overwrite file?'),
        body: trans.__('"%1" already exists, overwrite?', path),
        buttons: [
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: trans.__('Overwrite') })
        ]
    };
    return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)(options).then(result => {
        return Promise.resolve(result.button.accept);
    });
}
/**
 * Test whether a name is a valid file name
 *
 * Disallows "/", "\", and ":" in file names, as well as names with zero length.
 */
function isValidFileName(name) {
    const validNameExp = /[\/\\:]/;
    return name.length > 0 && !validNameExp.test(name);
}
/**
 * A widget used to rename a file.
 */
class RenameHandler extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Widget {
    /**
     * Construct a new "rename" dialog.
     */
    constructor(oldPath) {
        super({ node: Private.createRenameNode(oldPath) });
        this.addClass(FILE_DIALOG_CLASS);
        const ext = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.extname(oldPath);
        const value = (this.inputNode.value = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(oldPath));
        this.inputNode.setSelectionRange(0, value.length - ext.length);
    }
    /**
     * Get the input text node.
     */
    get inputNode() {
        return this.node.getElementsByTagName('input')[0];
    }
    /**
     * Get the value of the widget.
     */
    getValue() {
        return this.inputNode.value;
    }
}
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * Create the node for a rename handler.
     */
    function createRenameNode(oldPath, translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        const trans = translator.load('jupyterlab');
        const body = document.createElement('div');
        const existingLabel = document.createElement('label');
        existingLabel.textContent = trans.__('File Path');
        const existingPath = document.createElement('span');
        existingPath.textContent = oldPath;
        const nameTitle = document.createElement('label');
        nameTitle.textContent = trans.__('New Name');
        nameTitle.className = RENAME_NEW_NAME_TITLE_CLASS;
        const name = document.createElement('input');
        body.appendChild(existingLabel);
        body.appendChild(existingPath);
        body.appendChild(nameTitle);
        body.appendChild(name);
        return body;
    }
    Private.createRenameNode = createRenameNode;
})(Private || (Private = {}));
//# sourceMappingURL=dialogs.js.map

/***/ }),

/***/ "../../packages/docmanager/lib/index.js":
/*!**********************************************!*\
  !*** ../../packages/docmanager/lib/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isValidFileName": () => (/* reexport safe */ _dialogs__WEBPACK_IMPORTED_MODULE_0__.isValidFileName),
/* harmony export */   "renameDialog": () => (/* reexport safe */ _dialogs__WEBPACK_IMPORTED_MODULE_0__.renameDialog),
/* harmony export */   "renameFile": () => (/* reexport safe */ _dialogs__WEBPACK_IMPORTED_MODULE_0__.renameFile),
/* harmony export */   "shouldOverwrite": () => (/* reexport safe */ _dialogs__WEBPACK_IMPORTED_MODULE_0__.shouldOverwrite),
/* harmony export */   "DocumentManager": () => (/* reexport safe */ _manager__WEBPACK_IMPORTED_MODULE_1__.DocumentManager),
/* harmony export */   "PathStatus": () => (/* reexport safe */ _pathstatus__WEBPACK_IMPORTED_MODULE_2__.PathStatus),
/* harmony export */   "SaveHandler": () => (/* reexport safe */ _savehandler__WEBPACK_IMPORTED_MODULE_3__.SaveHandler),
/* harmony export */   "SavingStatus": () => (/* reexport safe */ _savingstatus__WEBPACK_IMPORTED_MODULE_4__.SavingStatus),
/* harmony export */   "IDocumentManager": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_5__.IDocumentManager),
/* harmony export */   "DocumentWidgetManager": () => (/* reexport safe */ _widgetmanager__WEBPACK_IMPORTED_MODULE_6__.DocumentWidgetManager)
/* harmony export */ });
/* harmony import */ var _dialogs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dialogs */ "../../packages/docmanager/lib/dialogs.js");
/* harmony import */ var _manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manager */ "../../packages/docmanager/lib/manager.js");
/* harmony import */ var _pathstatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pathstatus */ "../../packages/docmanager/lib/pathstatus.js");
/* harmony import */ var _savehandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./savehandler */ "../../packages/docmanager/lib/savehandler.js");
/* harmony import */ var _savingstatus__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./savingstatus */ "../../packages/docmanager/lib/savingstatus.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tokens */ "../../packages/docmanager/lib/tokens.js");
/* harmony import */ var _widgetmanager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./widgetmanager */ "../../packages/docmanager/lib/widgetmanager.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module docmanager
 */







//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/docmanager/lib/manager.js":
/*!************************************************!*\
  !*** ../../packages/docmanager/lib/manager.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentManager": () => (/* binding */ DocumentManager)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/properties */ "webpack/sharing/consume/default/@lumino/properties/@lumino/properties?140a");
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_properties__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _savehandler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./savehandler */ "../../packages/docmanager/lib/savehandler.js");
/* harmony import */ var _widgetmanager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./widgetmanager */ "../../packages/docmanager/lib/widgetmanager.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.










/**
 * The document manager.
 *
 * #### Notes
 * The document manager is used to register model and widget creators,
 * and the file browser uses the document manager to create widgets. The
 * document manager maintains a context for each path and model type that is
 * open, and a list of widgets for each context. The document manager is in
 * control of the proper closing and disposal of the widgets and contexts.
 */
class DocumentManager {
    /**
     * Construct a new document manager.
     */
    constructor(options) {
        this._activateRequested = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this._contexts = [];
        this._isDisposed = false;
        this._autosave = true;
        this._autosaveInterval = 120;
        this._lastModifiedCheckMargin = 500;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
        this.registry = options.registry;
        this.services = options.manager;
        this._collaborative = !!options.collaborative;
        this._dialogs = options.sessionDialogs || _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.sessionContextDialogs;
        this._docProviderFactory = options.docProviderFactory;
        this._opener = options.opener;
        this._when = options.when || options.manager.ready;
        const widgetManager = new _widgetmanager__WEBPACK_IMPORTED_MODULE_8__.DocumentWidgetManager({
            registry: this.registry,
            translator: this.translator
        });
        widgetManager.activateRequested.connect(this._onActivateRequested, this);
        this._widgetManager = widgetManager;
        this._setBusy = options.setBusy;
    }
    /**
     * A signal emitted when one of the documents is activated.
     */
    get activateRequested() {
        return this._activateRequested;
    }
    /**
     * Whether to autosave documents.
     */
    get autosave() {
        return this._autosave;
    }
    set autosave(value) {
        this._autosave = value;
        // For each existing context, start/stop the autosave handler as needed.
        this._contexts.forEach(context => {
            const handler = Private.saveHandlerProperty.get(context);
            if (!handler) {
                return;
            }
            if (value === true && !handler.isActive) {
                handler.start();
            }
            else if (value === false && handler.isActive) {
                handler.stop();
            }
        });
    }
    /**
     * Determines the time interval for autosave in seconds.
     */
    get autosaveInterval() {
        return this._autosaveInterval;
    }
    set autosaveInterval(value) {
        this._autosaveInterval = value;
        // For each existing context, set the save interval as needed.
        this._contexts.forEach(context => {
            const handler = Private.saveHandlerProperty.get(context);
            if (!handler) {
                return;
            }
            handler.saveInterval = value || 120;
        });
    }
    /**
     * Defines max acceptable difference, in milliseconds, between last modified timestamps on disk and client
     */
    get lastModifiedCheckMargin() {
        return this._lastModifiedCheckMargin;
    }
    set lastModifiedCheckMargin(value) {
        this._lastModifiedCheckMargin = value;
        // For each existing context, update the margin value.
        this._contexts.forEach(context => {
            context.lastModifiedCheckMargin = value;
        });
    }
    /**
     * Get whether the document manager has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the document manager.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        // Clear any listeners for our signals.
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal.clearData(this);
        // Close all the widgets for our contexts and dispose the widget manager.
        this._contexts.forEach(context => {
            return this._widgetManager.closeWidgets(context);
        });
        this._widgetManager.dispose();
        // Clear the context list.
        this._contexts.length = 0;
    }
    /**
     * Clone a widget.
     *
     * @param widget - The source widget.
     *
     * @returns A new widget or `undefined`.
     *
     * #### Notes
     *  Uses the same widget factory and context as the source, or returns
     *  `undefined` if the source widget is not managed by this manager.
     */
    cloneWidget(widget) {
        return this._widgetManager.cloneWidget(widget);
    }
    /**
     * Close all of the open documents.
     *
     * @returns A promise resolving when the widgets are closed.
     */
    closeAll() {
        return Promise.all(this._contexts.map(context => this._widgetManager.closeWidgets(context))).then(() => undefined);
    }
    /**
     * Close the widgets associated with a given path.
     *
     * @param path - The target path.
     *
     * @returns A promise resolving when the widgets are closed.
     */
    closeFile(path) {
        const close = this._contextsForPath(path).map(c => this._widgetManager.closeWidgets(c));
        return Promise.all(close).then(x => undefined);
    }
    /**
     * Get the document context for a widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The context associated with the widget, or `undefined` if no such
     * context exists.
     */
    contextForWidget(widget) {
        return this._widgetManager.contextForWidget(widget);
    }
    /**
     * Copy a file.
     *
     * @param fromFile - The full path of the original file.
     *
     * @param toDir - The full path to the target directory.
     *
     * @returns A promise which resolves to the contents of the file.
     */
    copy(fromFile, toDir) {
        return this.services.contents.copy(fromFile, toDir);
    }
    /**
     * Create a new file and return the widget used to view it.
     *
     * @param path - The file path to create.
     *
     * @param widgetName - The name of the widget factory to use. 'default' will use the default widget.
     *
     * @param kernel - An optional kernel name/id to override the default.
     *
     * @returns The created widget, or `undefined`.
     *
     * #### Notes
     * This function will return `undefined` if a valid widget factory
     * cannot be found.
     */
    createNew(path, widgetName = 'default', kernel) {
        return this._createOrOpenDocument('create', path, widgetName, kernel);
    }
    /**
     * Delete a file.
     *
     * @param path - The full path to the file to be deleted.
     *
     * @returns A promise which resolves when the file is deleted.
     *
     * #### Notes
     * If there is a running session associated with the file and no other
     * sessions are using the kernel, the session will be shut down.
     */
    deleteFile(path) {
        return this.services.sessions
            .stopIfNeeded(path)
            .then(() => {
            return this.services.contents.delete(path);
        })
            .then(() => {
            this._contextsForPath(path).forEach(context => this._widgetManager.deleteWidgets(context));
            return Promise.resolve(void 0);
        });
    }
    /**
     * See if a widget already exists for the given path and widget name.
     *
     * @param path - The file path to use.
     *
     * @param widgetName - The name of the widget factory to use. 'default' will use the default widget.
     *
     * @returns The found widget, or `undefined`.
     *
     * #### Notes
     * This can be used to find an existing widget instead of opening
     * a new widget.
     */
    findWidget(path, widgetName = 'default') {
        const newPath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.normalize(path);
        let widgetNames = [widgetName];
        if (widgetName === 'default') {
            const factory = this.registry.defaultWidgetFactory(newPath);
            if (!factory) {
                return undefined;
            }
            widgetNames = [factory.name];
        }
        else if (widgetName === null) {
            widgetNames = this.registry
                .preferredWidgetFactories(newPath)
                .map(f => f.name);
        }
        for (const context of this._contextsForPath(newPath)) {
            for (const widgetName of widgetNames) {
                if (widgetName !== null) {
                    const widget = this._widgetManager.findWidget(context, widgetName);
                    if (widget) {
                        return widget;
                    }
                }
            }
        }
        return undefined;
    }
    /**
     * Create a new untitled file.
     *
     * @param options - The file content creation options.
     */
    newUntitled(options) {
        if (options.type === 'file') {
            options.ext = options.ext || '.txt';
        }
        return this.services.contents.newUntitled(options);
    }
    /**
     * Open a file and return the widget used to view it.
     *
     * @param path - The file path to open.
     *
     * @param widgetName - The name of the widget factory to use. 'default' will use the default widget.
     *
     * @param kernel - An optional kernel name/id to override the default.
     *
     * @returns The created widget, or `undefined`.
     *
     * #### Notes
     * This function will return `undefined` if a valid widget factory
     * cannot be found.
     */
    open(path, widgetName = 'default', kernel, options) {
        return this._createOrOpenDocument('open', path, widgetName, kernel, options);
    }
    /**
     * Open a file and return the widget used to view it.
     * Reveals an already existing editor.
     *
     * @param path - The file path to open.
     *
     * @param widgetName - The name of the widget factory to use. 'default' will use the default widget.
     *
     * @param kernel - An optional kernel name/id to override the default.
     *
     * @returns The created widget, or `undefined`.
     *
     * #### Notes
     * This function will return `undefined` if a valid widget factory
     * cannot be found.
     */
    openOrReveal(path, widgetName = 'default', kernel, options) {
        const widget = this.findWidget(path, widgetName);
        if (widget) {
            this._opener.open(widget, options || {});
            return widget;
        }
        return this.open(path, widgetName, kernel, options || {});
    }
    /**
     * Overwrite a file.
     *
     * @param oldPath - The full path to the original file.
     *
     * @param newPath - The full path to the new file.
     *
     * @returns A promise containing the new file contents model.
     */
    overwrite(oldPath, newPath) {
        // Cleanly overwrite the file by moving it, making sure the original does
        // not exist, and then renaming to the new path.
        const tempPath = `${newPath}.${_lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.UUID.uuid4()}`;
        const cb = () => this.rename(tempPath, newPath);
        return this.rename(oldPath, tempPath)
            .then(() => {
            return this.deleteFile(newPath);
        })
            .then(cb, cb);
    }
    /**
     * Rename a file or directory.
     *
     * @param oldPath - The full path to the original file.
     *
     * @param newPath - The full path to the new file.
     *
     * @returns A promise containing the new file contents model.  The promise
     * will reject if the newPath already exists.  Use [[overwrite]] to overwrite
     * a file.
     */
    rename(oldPath, newPath) {
        return this.services.contents.rename(oldPath, newPath);
    }
    /**
     * Find a context for a given path and factory name.
     */
    _findContext(path, factoryName) {
        const normalizedPath = this.services.contents.normalize(path);
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.find)(this._contexts, context => {
            return (context.path === normalizedPath && context.factoryName === factoryName);
        });
    }
    /**
     * Get the contexts for a given path.
     *
     * #### Notes
     * There may be more than one context for a given path if the path is open
     * with multiple model factories (for example, a notebook can be open with a
     * notebook model factory and a text model factory).
     */
    _contextsForPath(path) {
        const normalizedPath = this.services.contents.normalize(path);
        return this._contexts.filter(context => context.path === normalizedPath);
    }
    /**
     * Create a context from a path and a model factory.
     */
    _createContext(path, factory, kernelPreference) {
        // TODO: Make it impossible to open two different contexts for the same
        // path. Or at least prompt the closing of all widgets associated with the
        // old context before opening the new context. This will make things much
        // more consistent for the users, at the cost of some confusion about what
        // models are and why sometimes they cannot open the same file in different
        // widgets that have different models.
        // Allow options to be passed when adding a sibling.
        const adopter = (widget, options) => {
            this._widgetManager.adoptWidget(context, widget);
            this._opener.open(widget, options);
        };
        const modelDBFactory = this.services.contents.getModelDBFactory(path) || undefined;
        const context = new _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_2__.Context({
            opener: adopter,
            manager: this.services,
            factory,
            path,
            kernelPreference,
            modelDBFactory,
            setBusy: this._setBusy,
            sessionDialogs: this._dialogs,
            collaborative: this._collaborative,
            docProviderFactory: this._docProviderFactory,
            lastModifiedCheckMargin: this._lastModifiedCheckMargin,
            translator: this.translator
        });
        const handler = new _savehandler__WEBPACK_IMPORTED_MODULE_9__.SaveHandler({
            context,
            saveInterval: this.autosaveInterval
        });
        Private.saveHandlerProperty.set(context, handler);
        void context.ready.then(() => {
            if (this.autosave) {
                handler.start();
            }
        });
        context.disposed.connect(this._onContextDisposed, this);
        this._contexts.push(context);
        return context;
    }
    /**
     * Handle a context disposal.
     */
    _onContextDisposed(context) {
        _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.removeFirstOf(this._contexts, context);
    }
    /**
     * Get the widget factory for a given widget name.
     */
    _widgetFactoryFor(path, widgetName) {
        const { registry } = this;
        if (widgetName === 'default') {
            const factory = registry.defaultWidgetFactory(path);
            if (!factory) {
                return undefined;
            }
            widgetName = factory.name;
        }
        return registry.getWidgetFactory(widgetName);
    }
    /**
     * Creates a new document, or loads one from disk, depending on the `which` argument.
     * If `which==='create'`, then it creates a new document. If `which==='open'`,
     * then it loads the document from disk.
     *
     * The two cases differ in how the document context is handled, but the creation
     * of the widget and launching of the kernel are identical.
     */
    _createOrOpenDocument(which, path, widgetName = 'default', kernel, options) {
        const widgetFactory = this._widgetFactoryFor(path, widgetName);
        if (!widgetFactory) {
            return undefined;
        }
        const modelName = widgetFactory.modelName || 'text';
        const factory = this.registry.getModelFactory(modelName);
        if (!factory) {
            return undefined;
        }
        // Handle the kernel preference.
        const preference = this.registry.getKernelPreference(path, widgetFactory.name, kernel);
        let context;
        let ready = Promise.resolve(undefined);
        // Handle the load-from-disk case
        if (which === 'open') {
            // Use an existing context if available.
            context = this._findContext(path, factory.name) || null;
            if (!context) {
                context = this._createContext(path, factory, preference);
                // Populate the model, either from disk or a
                // model backend.
                ready = this._when.then(() => context.initialize(false));
            }
        }
        else if (which === 'create') {
            context = this._createContext(path, factory, preference);
            // Immediately save the contents to disk.
            ready = this._when.then(() => context.initialize(true));
        }
        else {
            throw new Error(`Invalid argument 'which': ${which}`);
        }
        const widget = this._widgetManager.createWidget(widgetFactory, context);
        this._opener.open(widget, options || {});
        // If the initial opening of the context fails, dispose of the widget.
        ready.catch(err => {
            console.error(`Failed to initialize the context with '${factory.name}' for ${path}`, err);
            widget.close();
        });
        return widget;
    }
    /**
     * Handle an activateRequested signal from the widget manager.
     */
    _onActivateRequested(sender, args) {
        this._activateRequested.emit(args);
    }
}
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * An attached property for a context save handler.
     */
    Private.saveHandlerProperty = new _lumino_properties__WEBPACK_IMPORTED_MODULE_6__.AttachedProperty({
        name: 'saveHandler',
        create: () => undefined
    });
})(Private || (Private = {}));
//# sourceMappingURL=manager.js.map

/***/ }),

/***/ "../../packages/docmanager/lib/pathstatus.js":
/*!***************************************************!*\
  !*** ../../packages/docmanager/lib/pathstatus.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PathStatus": () => (/* binding */ PathStatus)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.




/**
 * A pure component for rendering a file path (or activity name).
 *
 * @param props - the props for the component.
 *
 * @returns a tsx component for a file path.
 */
function PathStatusComponent(props) {
    return react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_2__.TextItem, { source: props.name, title: props.fullPath });
}
/**
 * A status bar item for the current file path (or activity name).
 */
class PathStatus extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Construct a new PathStatus status item.
     */
    constructor(opts) {
        super(new PathStatus.Model(opts.docManager));
        this.node.title = this.model.path;
    }
    /**
     * Render the status item.
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(PathStatusComponent, { fullPath: this.model.path, name: this.model.name }));
    }
}
/**
 * A namespace for PathStatus statics.
 */
(function (PathStatus) {
    /**
     * A VDomModel for rendering the PathStatus status item.
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        /**
         * Construct a new model.
         *
         * @param docManager: the application document manager. Used to check
         *   whether the current widget is a document.
         */
        constructor(docManager) {
            super();
            /**
             * React to a title change for the current widget.
             */
            this._onTitleChange = (title) => {
                const oldState = this._getAllState();
                this._name = title.label;
                this._triggerChange(oldState, this._getAllState());
            };
            /**
             * React to a path change for the current document.
             */
            this._onPathChange = (_documentModel, newPath) => {
                const oldState = this._getAllState();
                this._path = newPath;
                this._name = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(newPath);
                this._triggerChange(oldState, this._getAllState());
            };
            this._path = '';
            this._name = '';
            this._widget = null;
            this._docManager = docManager;
        }
        /**
         * The current path for the application.
         */
        get path() {
            return this._path;
        }
        /**
         * The name of the current activity.
         */
        get name() {
            return this._name;
        }
        /**
         * The current widget for the application.
         */
        get widget() {
            return this._widget;
        }
        set widget(widget) {
            const oldWidget = this._widget;
            if (oldWidget !== null) {
                const oldContext = this._docManager.contextForWidget(oldWidget);
                if (oldContext) {
                    oldContext.pathChanged.disconnect(this._onPathChange);
                }
                else {
                    oldWidget.title.changed.disconnect(this._onTitleChange);
                }
            }
            const oldState = this._getAllState();
            this._widget = widget;
            if (this._widget === null) {
                this._path = '';
                this._name = '';
            }
            else {
                const widgetContext = this._docManager.contextForWidget(this._widget);
                if (widgetContext) {
                    this._path = widgetContext.path;
                    this._name = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(widgetContext.path);
                    widgetContext.pathChanged.connect(this._onPathChange);
                }
                else {
                    this._path = '';
                    this._name = this._widget.title.label;
                    this._widget.title.changed.connect(this._onTitleChange);
                }
            }
            this._triggerChange(oldState, this._getAllState());
        }
        /**
         * Get the current state of the model.
         */
        _getAllState() {
            return [this._path, this._name];
        }
        /**
         * Trigger a state change to rerender.
         */
        _triggerChange(oldState, newState) {
            if (oldState[0] !== newState[0] || oldState[1] !== newState[1]) {
                this.stateChanged.emit(void 0);
            }
        }
    }
    PathStatus.Model = Model;
})(PathStatus || (PathStatus = {}));
//# sourceMappingURL=pathstatus.js.map

/***/ }),

/***/ "../../packages/docmanager/lib/savehandler.js":
/*!****************************************************!*\
  !*** ../../packages/docmanager/lib/savehandler.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SaveHandler": () => (/* binding */ SaveHandler)
/* harmony export */ });
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/**
 * A class that manages the auto saving of a document.
 *
 * #### Notes
 * Implements https://github.com/ipython/ipython/wiki/IPEP-15:-Autosaving-the-IPython-Notebook.
 */
class SaveHandler {
    /**
     * Construct a new save handler.
     */
    constructor(options) {
        this._autosaveTimer = -1;
        this._minInterval = -1;
        this._interval = -1;
        this._isActive = false;
        this._inDialog = false;
        this._isDisposed = false;
        this._multiplier = 10;
        this._context = options.context;
        const interval = options.saveInterval || 120;
        this._minInterval = interval * 1000;
        this._interval = this._minInterval;
        // Restart the timer when the contents model is updated.
        this._context.fileChanged.connect(this._setTimer, this);
        this._context.disposed.connect(this.dispose, this);
    }
    /**
     * The save interval used by the timer (in seconds).
     */
    get saveInterval() {
        return this._interval / 1000;
    }
    set saveInterval(value) {
        this._minInterval = this._interval = value * 1000;
        if (this._isActive) {
            this._setTimer();
        }
    }
    /**
     * Get whether the handler is active.
     */
    get isActive() {
        return this._isActive;
    }
    /**
     * Get whether the save handler is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources used by the save handler.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        clearTimeout(this._autosaveTimer);
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_0__.Signal.clearData(this);
    }
    /**
     * Start the autosaver.
     */
    start() {
        this._isActive = true;
        this._setTimer();
    }
    /**
     * Stop the autosaver.
     */
    stop() {
        this._isActive = false;
        clearTimeout(this._autosaveTimer);
    }
    /**
     * Set the timer.
     */
    _setTimer() {
        clearTimeout(this._autosaveTimer);
        if (!this._isActive) {
            return;
        }
        this._autosaveTimer = window.setTimeout(() => {
            this._save();
        }, this._interval);
    }
    /**
     * Handle an autosave timeout.
     */
    _save() {
        const context = this._context;
        // Trigger the next update.
        this._setTimer();
        if (!context) {
            return;
        }
        // Bail if the model is not dirty or the file is not writable, or the dialog
        // is already showing.
        const writable = context.contentsModel && context.contentsModel.writable;
        if (!writable || !context.model.dirty || this._inDialog) {
            return;
        }
        const start = new Date().getTime();
        context
            .save()
            .then(() => {
            if (this.isDisposed) {
                return;
            }
            const duration = new Date().getTime() - start;
            // New save interval: higher of 10x save duration or min interval.
            this._interval = Math.max(this._multiplier * duration, this._minInterval);
            // Restart the update to pick up the new interval.
            this._setTimer();
        })
            .catch(err => {
            // If the user canceled the save, do nothing.
            // FIXME-TRANS: Is this affected by localization?
            if (err.message === 'Cancel' ||
                err.message === 'Modal is already displayed') {
                return;
            }
            // Otherwise, log the error.
            console.error('Error in Auto-Save', err.message);
        });
    }
}
//# sourceMappingURL=savehandler.js.map

/***/ }),

/***/ "../../packages/docmanager/lib/savingstatus.js":
/*!*****************************************************!*\
  !*** ../../packages/docmanager/lib/savingstatus.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SavingStatus": () => (/* binding */ SavingStatus)
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
 * A pure functional component for a Saving status item.
 *
 * @param props - the props for the component.
 *
 * @returns a tsx component for rendering the saving state.
 */
function SavingStatusComponent(props) {
    return react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.TextItem, { source: props.fileStatus });
}
/**
 * The amount of time (in ms) to retain the saving completed message
 * before hiding the status item.
 */
const SAVING_COMPLETE_MESSAGE_MILLIS = 2000;
/**
 * A VDomRenderer for a saving status item.
 */
class SavingStatus extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Create a new SavingStatus item.
     */
    constructor(opts) {
        super(new SavingStatus.Model(opts.docManager));
        const translator = opts.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        const trans = translator.load('jupyterlab');
        this._statusMap = {
            completed: trans.__('Saving completed'),
            started: trans.__('Saving started'),
            failed: trans.__('Saving failed')
        };
    }
    /**
     * Render the SavingStatus item.
     */
    render() {
        if (this.model === null || this.model.status === null) {
            return null;
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_3___default().createElement(SavingStatusComponent, { fileStatus: this._statusMap[this.model.status] }));
        }
    }
}
/**
 * A namespace for SavingStatus statics.
 */
(function (SavingStatus) {
    /**
     * A VDomModel for the SavingStatus item.
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        /**
         * Create a new SavingStatus model.
         */
        constructor(docManager) {
            super();
            /**
             * React to a saving status change from the current document widget.
             */
            this._onStatusChange = (_, newStatus) => {
                this._status = newStatus;
                if (this._status === 'completed') {
                    setTimeout(() => {
                        this._status = null;
                        this.stateChanged.emit(void 0);
                    }, SAVING_COMPLETE_MESSAGE_MILLIS);
                    this.stateChanged.emit(void 0);
                }
                else {
                    this.stateChanged.emit(void 0);
                }
            };
            this._status = null;
            this._widget = null;
            this._status = null;
            this.widget = null;
            this._docManager = docManager;
        }
        /**
         * The current status of the model.
         */
        get status() {
            return this._status;
        }
        /**
         * The current widget for the model. Any widget can be assigned,
         * but it only has any effect if the widget is an IDocument widget
         * known to the application document manager.
         */
        get widget() {
            return this._widget;
        }
        set widget(widget) {
            var _a, _b;
            const oldWidget = this._widget;
            if (oldWidget !== null) {
                const oldContext = this._docManager.contextForWidget(oldWidget);
                if (oldContext) {
                    oldContext.saveState.disconnect(this._onStatusChange);
                }
                else if ((_a = this._widget.content) === null || _a === void 0 ? void 0 : _a.saveStateChanged) {
                    this._widget.content.saveStateChanged.disconnect(this._onStatusChange);
                }
            }
            this._widget = widget;
            if (this._widget === null) {
                this._status = null;
            }
            else {
                const widgetContext = this._docManager.contextForWidget(this._widget);
                if (widgetContext) {
                    widgetContext.saveState.connect(this._onStatusChange);
                }
                else if ((_b = this._widget.content) === null || _b === void 0 ? void 0 : _b.saveStateChanged) {
                    this._widget.content.saveStateChanged.connect(this._onStatusChange);
                }
            }
        }
    }
    SavingStatus.Model = Model;
})(SavingStatus || (SavingStatus = {}));
//# sourceMappingURL=savingstatus.js.map

/***/ }),

/***/ "../../packages/docmanager/lib/tokens.js":
/*!***********************************************!*\
  !*** ../../packages/docmanager/lib/tokens.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IDocumentManager": () => (/* binding */ IDocumentManager)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils?ace6");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The document registry token.
 */
const IDocumentManager = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/docmanager:IDocumentManager');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/docmanager/lib/widgetmanager.js":
/*!******************************************************!*\
  !*** ../../packages/docmanager/lib/widgetmanager.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentWidgetManager": () => (/* binding */ DocumentWidgetManager)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm?a039");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable?7038");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging?790d");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/properties */ "webpack/sharing/consume/default/@lumino/properties/@lumino/properties?140a");
/* harmony import */ var _lumino_properties__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_properties__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_7__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * The class name added to document widgets.
 */
const DOCUMENT_CLASS = 'jp-Document';
/**
 * A class that maintains the lifecycle of file-backed widgets.
 */
class DocumentWidgetManager {
    /**
     * Construct a new document widget manager.
     */
    constructor(options) {
        this._activateRequested = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this._isDisposed = false;
        this._registry = options.registry;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
    }
    /**
     * A signal emitted when one of the documents is activated.
     */
    get activateRequested() {
        return this._activateRequested;
    }
    /**
     * Test whether the document widget manager is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources used by the widget manager.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal.disconnectReceiver(this);
    }
    /**
     * Create a widget for a document and handle its lifecycle.
     *
     * @param factory - The widget factory.
     *
     * @param context - The document context object.
     *
     * @returns A widget created by the factory.
     *
     * @throws If the factory is not registered.
     */
    createWidget(factory, context) {
        const widget = factory.createNew(context);
        this._initializeWidget(widget, factory, context);
        return widget;
    }
    /**
     * When a new widget is created, we need to hook it up
     * with some signals, update the widget extensions (for
     * this kind of widget) in the docregistry, among
     * other things.
     */
    _initializeWidget(widget, factory, context) {
        Private.factoryProperty.set(widget, factory);
        // Handle widget extensions.
        const disposables = new _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__.DisposableSet();
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(this._registry.widgetExtensions(factory.name), extender => {
            const disposable = extender.createNew(widget, context);
            if (disposable) {
                disposables.add(disposable);
            }
        });
        Private.disposablesProperty.set(widget, disposables);
        widget.disposed.connect(this._onWidgetDisposed, this);
        this.adoptWidget(context, widget);
        context.fileChanged.connect(this._onFileChanged, this);
        context.pathChanged.connect(this._onPathChanged, this);
        void context.ready.then(() => {
            void this.setCaption(widget);
        });
    }
    /**
     * Install the message hook for the widget and add to list
     * of known widgets.
     *
     * @param context - The document context object.
     *
     * @param widget - The widget to adopt.
     */
    adoptWidget(context, widget) {
        const widgets = Private.widgetsProperty.get(context);
        widgets.push(widget);
        _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__.MessageLoop.installMessageHook(widget, this);
        widget.addClass(DOCUMENT_CLASS);
        widget.title.closable = true;
        widget.disposed.connect(this._widgetDisposed, this);
        Private.contextProperty.set(widget, context);
    }
    /**
     * See if a widget already exists for the given context and widget name.
     *
     * @param context - The document context object.
     *
     * @returns The found widget, or `undefined`.
     *
     * #### Notes
     * This can be used to use an existing widget instead of opening
     * a new widget.
     */
    findWidget(context, widgetName) {
        const widgets = Private.widgetsProperty.get(context);
        if (!widgets) {
            return undefined;
        }
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.find)(widgets, widget => {
            const factory = Private.factoryProperty.get(widget);
            if (!factory) {
                return false;
            }
            return factory.name === widgetName;
        });
    }
    /**
     * Get the document context for a widget.
     *
     * @param widget - The widget of interest.
     *
     * @returns The context associated with the widget, or `undefined`.
     */
    contextForWidget(widget) {
        return Private.contextProperty.get(widget);
    }
    /**
     * Clone a widget.
     *
     * @param widget - The source widget.
     *
     * @returns A new widget or `undefined`.
     *
     * #### Notes
     *  Uses the same widget factory and context as the source, or throws
     *  if the source widget is not managed by this manager.
     */
    cloneWidget(widget) {
        const context = Private.contextProperty.get(widget);
        if (!context) {
            return undefined;
        }
        const factory = Private.factoryProperty.get(widget);
        if (!factory) {
            return undefined;
        }
        const newWidget = factory.createNew(context, widget);
        this._initializeWidget(newWidget, factory, context);
        return newWidget;
    }
    /**
     * Close the widgets associated with a given context.
     *
     * @param context - The document context object.
     */
    closeWidgets(context) {
        const widgets = Private.widgetsProperty.get(context);
        return Promise.all((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.toArray)((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.map)(widgets, widget => this.onClose(widget)))).then(() => undefined);
    }
    /**
     * Dispose of the widgets associated with a given context
     * regardless of the widget's dirty state.
     *
     * @param context - The document context object.
     */
    deleteWidgets(context) {
        const widgets = Private.widgetsProperty.get(context);
        return Promise.all((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.toArray)((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.map)(widgets, widget => this.onDelete(widget)))).then(() => undefined);
    }
    /**
     * Filter a message sent to a message handler.
     *
     * @param handler - The target handler of the message.
     *
     * @param msg - The message dispatched to the handler.
     *
     * @returns `false` if the message should be filtered, of `true`
     *   if the message should be dispatched to the handler as normal.
     */
    messageHook(handler, msg) {
        switch (msg.type) {
            case 'close-request':
                void this.onClose(handler);
                return false;
            case 'activate-request': {
                const context = this.contextForWidget(handler);
                if (context) {
                    this._activateRequested.emit(context.path);
                }
                break;
            }
            default:
                break;
        }
        return true;
    }
    /**
     * Set the caption for widget title.
     *
     * @param widget - The target widget.
     */
    async setCaption(widget) {
        const trans = this.translator.load('jupyterlab');
        const context = Private.contextProperty.get(widget);
        if (!context) {
            return;
        }
        const model = context.contentsModel;
        if (!model) {
            widget.title.caption = '';
            return;
        }
        return context
            .listCheckpoints()
            .then((checkpoints) => {
            if (widget.isDisposed) {
                return;
            }
            const last = checkpoints[checkpoints.length - 1];
            const checkpoint = last ? _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.Time.format(last.last_modified) : 'None';
            let caption = trans.__('Name: %1\nPath: %2\n', model.name, model.path);
            if (context.model.readOnly) {
                caption += trans.__('Read-only');
            }
            else {
                caption +=
                    trans.__('Last Saved: %1\n', _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.Time.format(model.last_modified)) +
                        trans.__('Last Checkpoint: %1', checkpoint);
            }
            widget.title.caption = caption;
        });
    }
    /**
     * Handle `'close-request'` messages.
     *
     * @param widget - The target widget.
     *
     * @returns A promise that resolves with whether the widget was closed.
     */
    async onClose(widget) {
        var _a;
        // Handle dirty state.
        const [shouldClose, ignoreSave] = await this._maybeClose(widget, this.translator);
        if (widget.isDisposed) {
            return true;
        }
        if (shouldClose) {
            if (!ignoreSave) {
                const context = Private.contextProperty.get(widget);
                if (!context) {
                    return true;
                }
                if ((_a = context.contentsModel) === null || _a === void 0 ? void 0 : _a.writable) {
                    await context.save();
                }
                else {
                    await context.saveAs();
                }
            }
            if (widget.isDisposed) {
                return true;
            }
            widget.dispose();
        }
        return shouldClose;
    }
    /**
     * Dispose of widget regardless of widget's dirty state.
     *
     * @param widget - The target widget.
     */
    onDelete(widget) {
        widget.dispose();
        return Promise.resolve(void 0);
    }
    /**
     * Ask the user whether to close an unsaved file.
     */
    _maybeClose(widget, translator) {
        var _a;
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        const trans = translator.load('jupyterlab');
        // Bail if the model is not dirty or other widgets are using the model.)
        const context = Private.contextProperty.get(widget);
        if (!context) {
            return Promise.resolve([true, true]);
        }
        let widgets = Private.widgetsProperty.get(context);
        if (!widgets) {
            return Promise.resolve([true, true]);
        }
        // Filter by whether the factories are read only.
        widgets = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.toArray)((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.filter)(widgets, widget => {
            const factory = Private.factoryProperty.get(widget);
            if (!factory) {
                return false;
            }
            return factory.readOnly === false;
        }));
        const factory = Private.factoryProperty.get(widget);
        if (!factory) {
            return Promise.resolve([true, true]);
        }
        const model = context.model;
        if (!model.dirty || widgets.length > 1 || factory.readOnly) {
            return Promise.resolve([true, true]);
        }
        const fileName = widget.title.label;
        const saveLabel = ((_a = context.contentsModel) === null || _a === void 0 ? void 0 : _a.writable) ? trans.__('Save')
            : trans.__('Save as');
        return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: trans.__('Save your work'),
            body: trans.__('Save changes in "%1" before closing?', fileName),
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: trans.__('Discard') }),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: saveLabel })
            ]
        }).then(result => {
            return [result.button.accept, result.button.displayType === 'warn'];
        });
    }
    /**
     * Handle the disposal of a widget.
     */
    _widgetDisposed(widget) {
        const context = Private.contextProperty.get(widget);
        if (!context) {
            return;
        }
        const widgets = Private.widgetsProperty.get(context);
        if (!widgets) {
            return;
        }
        // Remove the widget.
        _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.removeFirstOf(widgets, widget);
        // Dispose of the context if this is the last widget using it.
        if (!widgets.length) {
            context.dispose();
        }
    }
    /**
     * Handle the disposal of a widget.
     */
    _onWidgetDisposed(widget) {
        const disposables = Private.disposablesProperty.get(widget);
        disposables.dispose();
    }
    /**
     * Handle a file changed signal for a context.
     */
    _onFileChanged(context) {
        const widgets = Private.widgetsProperty.get(context);
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(widgets, widget => {
            void this.setCaption(widget);
        });
    }
    /**
     * Handle a path changed signal for a context.
     */
    _onPathChanged(context) {
        const widgets = Private.widgetsProperty.get(context);
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(widgets, widget => {
            void this.setCaption(widget);
        });
    }
}
/**
 * A private namespace for DocumentManager data.
 */
var Private;
(function (Private) {
    /**
     * A private attached property for a widget context.
     */
    Private.contextProperty = new _lumino_properties__WEBPACK_IMPORTED_MODULE_6__.AttachedProperty({
        name: 'context',
        create: () => undefined
    });
    /**
     * A private attached property for a widget factory.
     */
    Private.factoryProperty = new _lumino_properties__WEBPACK_IMPORTED_MODULE_6__.AttachedProperty({
        name: 'factory',
        create: () => undefined
    });
    /**
     * A private attached property for the widgets associated with a context.
     */
    Private.widgetsProperty = new _lumino_properties__WEBPACK_IMPORTED_MODULE_6__.AttachedProperty({
        name: 'widgets',
        create: () => []
    });
    /**
     * A private attached property for a widget's disposables.
     */
    Private.disposablesProperty = new _lumino_properties__WEBPACK_IMPORTED_MODULE_6__.AttachedProperty({
        name: 'disposables',
        create: () => new _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__.DisposableSet()
    });
})(Private || (Private = {}));
//# sourceMappingURL=widgetmanager.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jbWFuYWdlci9saWIvZGlhbG9ncy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jbWFuYWdlci9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2RvY21hbmFnZXIvbGliL21hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2RvY21hbmFnZXIvbGliL3BhdGhzdGF0dXMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2RvY21hbmFnZXIvbGliL3NhdmVoYW5kbGVyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9kb2NtYW5hZ2VyL2xpYi9zYXZpbmdzdGF0dXMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2RvY21hbmFnZXIvbGliL3Rva2Vucy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jbWFuYWdlci9saWIvd2lkZ2V0bWFuYWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQzRFO0FBQzVCO0FBQ1M7QUFDaEI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1AsK0JBQStCLG1FQUFjO0FBQzdDO0FBQ0EsV0FBVyxnRUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVks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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG9FQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFt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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG1FQUFnQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnQ0FBZ0M7QUFDakMsc0M7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0lBO0FBQ0E7QUFDMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsK0RBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSUE7QUFDQTtBQUMrRDtBQUNkO0FBQ1E7QUFDL0I7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsMERBQW1CLENBQUMsMkRBQVEsR0FBRywyQkFBMkI7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sMkJBQTJCLDhEQUFZO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsbUVBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBEQUFtQix5QkFBeUIsaURBQWlEO0FBQ2pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDJEQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvQ0FBb0M7QUFDckMsd0M7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaElBO0FBQ0E7QUFDMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDTyw2QkFBNkIsb0RBQUs7QUFDekMsa0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQzBEO0FBQ2I7QUFDWTtBQUNzQjtBQUM1QjtBQUNIO0FBQ007QUFDWDtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MscURBQU07QUFDNUM7QUFDQTtBQUNBLGdEQUFnRCxtRUFBYztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHdFQUF5QjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDZEQUFhO0FBQzdDLFFBQVEsdURBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDZFQUE4QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHVEQUFJO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDBEQUFPLENBQUMsc0RBQUc7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDBEQUFPLENBQUMsc0RBQUc7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDhEQUFXO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCw4REFBVztBQUM1RDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsbUVBQWM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwwREFBTyxDQUFDLHlEQUFNO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZ0VBQVU7QUFDekI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHFFQUFtQixFQUFFLDRCQUE0QjtBQUNqRSxnQkFBZ0IsbUVBQWlCLEVBQUUsNkJBQTZCO0FBQ2hFLGdCQUFnQixpRUFBZSxFQUFFLG1CQUFtQjtBQUNwRDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxxRUFBc0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsdURBQUk7QUFDWjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVEQUFJO0FBQ1o7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsZ0VBQWdCO0FBQ2xEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGdFQUFnQjtBQUNsRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxnRUFBZ0I7QUFDbEQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZ0VBQWdCO0FBQ3REO0FBQ0EsMEJBQTBCLDZEQUFhO0FBQ3ZDLEtBQUs7QUFDTCxDQUFDLDBCQUEwQjtBQUMzQix5QyIsImZpbGUiOiJwYWNrYWdlc19kb2NtYW5hZ2VyX2xpYl9pbmRleF9qcy44YTE1OGY2Y2FmZGQ3MDNiMTUxZi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IERpYWxvZywgc2hvd0RpYWxvZywgc2hvd0Vycm9yTWVzc2FnZSB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IFBhdGhFeHQgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBXaWRnZXQgfSBmcm9tICdAbHVtaW5vL3dpZGdldHMnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBmaWxlIGRpYWxvZ3MuXG4gKi9cbmNvbnN0IEZJTEVfRElBTE9HX0NMQVNTID0gJ2pwLUZpbGVEaWFsb2cnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCBmb3IgdGhlIG5ldyBuYW1lIGxhYmVsIGluIHRoZSByZW5hbWUgZGlhbG9nXG4gKi9cbmNvbnN0IFJFTkFNRV9ORVdfTkFNRV9USVRMRV9DTEFTUyA9ICdqcC1uZXctbmFtZS10aXRsZSc7XG4vKipcbiAqIFJlbmFtZSBhIGZpbGUgd2l0aCBhIGRpYWxvZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbmFtZURpYWxvZyhtYW5hZ2VyLCBvbGRQYXRoLCB0cmFuc2xhdG9yKSB7XG4gICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgIHRpdGxlOiB0cmFucy5fXygnUmVuYW1lIEZpbGUnKSxcbiAgICAgICAgYm9keTogbmV3IFJlbmFtZUhhbmRsZXIob2xkUGF0aCksXG4gICAgICAgIGZvY3VzTm9kZVNlbGVjdG9yOiAnaW5wdXQnLFxuICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICBEaWFsb2cuY2FuY2VsQnV0dG9uKHsgbGFiZWw6IHRyYW5zLl9fKCdDYW5jZWwnKSB9KSxcbiAgICAgICAgICAgIERpYWxvZy5va0J1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnUmVuYW1lJykgfSlcbiAgICAgICAgXVxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKCFyZXN1bHQudmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNWYWxpZEZpbGVOYW1lKHJlc3VsdC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHZvaWQgc2hvd0Vycm9yTWVzc2FnZSh0cmFucy5fXygnUmVuYW1lIEVycm9yJyksIEVycm9yKHRyYW5zLl9fKCdcIiUxXCIgaXMgbm90IGEgdmFsaWQgbmFtZSBmb3IgYSBmaWxlLiBOYW1lcyBtdXN0IGhhdmUgbm9uemVybyBsZW5ndGgsIGFuZCBjYW5ub3QgaW5jbHVkZSBcIi9cIiwgXCJcXFxcXCIsIG9yIFwiOlwiJywgcmVzdWx0LnZhbHVlKSkpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmFzZVBhdGggPSBQYXRoRXh0LmRpcm5hbWUob2xkUGF0aCk7XG4gICAgICAgIGNvbnN0IG5ld1BhdGggPSBQYXRoRXh0LmpvaW4oYmFzZVBhdGgsIHJlc3VsdC52YWx1ZSk7XG4gICAgICAgIHJldHVybiByZW5hbWVGaWxlKG1hbmFnZXIsIG9sZFBhdGgsIG5ld1BhdGgpO1xuICAgIH0pO1xufVxuLyoqXG4gKiBSZW5hbWUgYSBmaWxlLCBhc2tpbmcgZm9yIGNvbmZpcm1hdGlvbiBpZiBpdCBpcyBvdmVyd3JpdGluZyBhbm90aGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lRmlsZShtYW5hZ2VyLCBvbGRQYXRoLCBuZXdQYXRoKSB7XG4gICAgcmV0dXJuIG1hbmFnZXIucmVuYW1lKG9sZFBhdGgsIG5ld1BhdGgpLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyAhPT0gNDA5KSB7XG4gICAgICAgICAgICAvLyBpZiBpdCdzIG5vdCBjYXVzZWQgYnkgYW4gYWxyZWFkeSBleGlzdGluZyBmaWxlLCByZXRocm93XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBvdGhlcndpc2UsIGFzayBmb3IgY29uZmlybWF0aW9uXG4gICAgICAgIHJldHVybiBzaG91bGRPdmVyd3JpdGUobmV3UGF0aCkudGhlbigodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYW5hZ2VyLm92ZXJ3cml0ZShvbGRQYXRoLCBuZXdQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnRmlsZSBub3QgcmVuYW1lZCcpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8qKlxuICogQXNrIHRoZSB1c2VyIHdoZXRoZXIgdG8gb3ZlcndyaXRlIGEgZmlsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZE92ZXJ3cml0ZShwYXRoLCB0cmFuc2xhdG9yKSB7XG4gICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICB0aXRsZTogdHJhbnMuX18oJ092ZXJ3cml0ZSBmaWxlPycpLFxuICAgICAgICBib2R5OiB0cmFucy5fXygnXCIlMVwiIGFscmVhZHkgZXhpc3RzLCBvdmVyd3JpdGU/JywgcGF0aCksXG4gICAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgICAgIERpYWxvZy5jYW5jZWxCdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ0NhbmNlbCcpIH0pLFxuICAgICAgICAgICAgRGlhbG9nLndhcm5CdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ092ZXJ3cml0ZScpIH0pXG4gICAgICAgIF1cbiAgICB9O1xuICAgIHJldHVybiBzaG93RGlhbG9nKG9wdGlvbnMpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXN1bHQuYnV0dG9uLmFjY2VwdCk7XG4gICAgfSk7XG59XG4vKipcbiAqIFRlc3Qgd2hldGhlciBhIG5hbWUgaXMgYSB2YWxpZCBmaWxlIG5hbWVcbiAqXG4gKiBEaXNhbGxvd3MgXCIvXCIsIFwiXFxcIiwgYW5kIFwiOlwiIGluIGZpbGUgbmFtZXMsIGFzIHdlbGwgYXMgbmFtZXMgd2l0aCB6ZXJvIGxlbmd0aC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRGaWxlTmFtZShuYW1lKSB7XG4gICAgY29uc3QgdmFsaWROYW1lRXhwID0gL1tcXC9cXFxcOl0vO1xuICAgIHJldHVybiBuYW1lLmxlbmd0aCA+IDAgJiYgIXZhbGlkTmFtZUV4cC50ZXN0KG5hbWUpO1xufVxuLyoqXG4gKiBBIHdpZGdldCB1c2VkIHRvIHJlbmFtZSBhIGZpbGUuXG4gKi9cbmNsYXNzIFJlbmFtZUhhbmRsZXIgZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBcInJlbmFtZVwiIGRpYWxvZy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvbGRQYXRoKSB7XG4gICAgICAgIHN1cGVyKHsgbm9kZTogUHJpdmF0ZS5jcmVhdGVSZW5hbWVOb2RlKG9sZFBhdGgpIH0pO1xuICAgICAgICB0aGlzLmFkZENsYXNzKEZJTEVfRElBTE9HX0NMQVNTKTtcbiAgICAgICAgY29uc3QgZXh0ID0gUGF0aEV4dC5leHRuYW1lKG9sZFBhdGgpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9ICh0aGlzLmlucHV0Tm9kZS52YWx1ZSA9IFBhdGhFeHQuYmFzZW5hbWUob2xkUGF0aCkpO1xuICAgICAgICB0aGlzLmlucHV0Tm9kZS5zZXRTZWxlY3Rpb25SYW5nZSgwLCB2YWx1ZS5sZW5ndGggLSBleHQubGVuZ3RoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpbnB1dCB0ZXh0IG5vZGUuXG4gICAgICovXG4gICAgZ2V0IGlucHV0Tm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB2YWx1ZSBvZiB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGdldFZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dE5vZGUudmFsdWU7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgbm9kZSBmb3IgYSByZW5hbWUgaGFuZGxlci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVSZW5hbWVOb2RlKG9sZFBhdGgsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGV4aXN0aW5nTGFiZWwudGV4dENvbnRlbnQgPSB0cmFucy5fXygnRmlsZSBQYXRoJyk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nUGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgZXhpc3RpbmdQYXRoLnRleHRDb250ZW50ID0gb2xkUGF0aDtcbiAgICAgICAgY29uc3QgbmFtZVRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgbmFtZVRpdGxlLnRleHRDb250ZW50ID0gdHJhbnMuX18oJ05ldyBOYW1lJyk7XG4gICAgICAgIG5hbWVUaXRsZS5jbGFzc05hbWUgPSBSRU5BTUVfTkVXX05BTUVfVElUTEVfQ0xBU1M7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKGV4aXN0aW5nTGFiZWwpO1xuICAgICAgICBib2R5LmFwcGVuZENoaWxkKGV4aXN0aW5nUGF0aCk7XG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQobmFtZVRpdGxlKTtcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZChuYW1lKTtcbiAgICAgICAgcmV0dXJuIGJvZHk7XG4gICAgfVxuICAgIFByaXZhdGUuY3JlYXRlUmVuYW1lTm9kZSA9IGNyZWF0ZVJlbmFtZU5vZGU7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpYWxvZ3MuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgZG9jbWFuYWdlclxuICovXG5leHBvcnQgKiBmcm9tICcuL2RpYWxvZ3MnO1xuZXhwb3J0ICogZnJvbSAnLi9tYW5hZ2VyJztcbmV4cG9ydCAqIGZyb20gJy4vcGF0aHN0YXR1cyc7XG5leHBvcnQgKiBmcm9tICcuL3NhdmVoYW5kbGVyJztcbmV4cG9ydCAqIGZyb20gJy4vc2F2aW5nc3RhdHVzJztcbmV4cG9ydCAqIGZyb20gJy4vdG9rZW5zJztcbmV4cG9ydCAqIGZyb20gJy4vd2lkZ2V0bWFuYWdlcic7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBzZXNzaW9uQ29udGV4dERpYWxvZ3MgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBQYXRoRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICdAanVweXRlcmxhYi9kb2NyZWdpc3RyeSc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IEFycmF5RXh0LCBmaW5kIH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IEF0dGFjaGVkUHJvcGVydHkgfSBmcm9tICdAbHVtaW5vL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuaW1wb3J0IHsgU2F2ZUhhbmRsZXIgfSBmcm9tICcuL3NhdmVoYW5kbGVyJztcbmltcG9ydCB7IERvY3VtZW50V2lkZ2V0TWFuYWdlciB9IGZyb20gJy4vd2lkZ2V0bWFuYWdlcic7XG4vKipcbiAqIFRoZSBkb2N1bWVudCBtYW5hZ2VyLlxuICpcbiAqICMjIyMgTm90ZXNcbiAqIFRoZSBkb2N1bWVudCBtYW5hZ2VyIGlzIHVzZWQgdG8gcmVnaXN0ZXIgbW9kZWwgYW5kIHdpZGdldCBjcmVhdG9ycyxcbiAqIGFuZCB0aGUgZmlsZSBicm93c2VyIHVzZXMgdGhlIGRvY3VtZW50IG1hbmFnZXIgdG8gY3JlYXRlIHdpZGdldHMuIFRoZVxuICogZG9jdW1lbnQgbWFuYWdlciBtYWludGFpbnMgYSBjb250ZXh0IGZvciBlYWNoIHBhdGggYW5kIG1vZGVsIHR5cGUgdGhhdCBpc1xuICogb3BlbiwgYW5kIGEgbGlzdCBvZiB3aWRnZXRzIGZvciBlYWNoIGNvbnRleHQuIFRoZSBkb2N1bWVudCBtYW5hZ2VyIGlzIGluXG4gKiBjb250cm9sIG9mIHRoZSBwcm9wZXIgY2xvc2luZyBhbmQgZGlzcG9zYWwgb2YgdGhlIHdpZGdldHMgYW5kIGNvbnRleHRzLlxuICovXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRNYW5hZ2VyIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgZG9jdW1lbnQgbWFuYWdlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRlUmVxdWVzdGVkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fY29udGV4dHMgPSBbXTtcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hdXRvc2F2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2F1dG9zYXZlSW50ZXJ2YWwgPSAxMjA7XG4gICAgICAgIHRoaXMuX2xhc3RNb2RpZmllZENoZWNrTWFyZ2luID0gNTAwO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMucmVnaXN0cnkgPSBvcHRpb25zLnJlZ2lzdHJ5O1xuICAgICAgICB0aGlzLnNlcnZpY2VzID0gb3B0aW9ucy5tYW5hZ2VyO1xuICAgICAgICB0aGlzLl9jb2xsYWJvcmF0aXZlID0gISFvcHRpb25zLmNvbGxhYm9yYXRpdmU7XG4gICAgICAgIHRoaXMuX2RpYWxvZ3MgPSBvcHRpb25zLnNlc3Npb25EaWFsb2dzIHx8IHNlc3Npb25Db250ZXh0RGlhbG9ncztcbiAgICAgICAgdGhpcy5fZG9jUHJvdmlkZXJGYWN0b3J5ID0gb3B0aW9ucy5kb2NQcm92aWRlckZhY3Rvcnk7XG4gICAgICAgIHRoaXMuX29wZW5lciA9IG9wdGlvbnMub3BlbmVyO1xuICAgICAgICB0aGlzLl93aGVuID0gb3B0aW9ucy53aGVuIHx8IG9wdGlvbnMubWFuYWdlci5yZWFkeTtcbiAgICAgICAgY29uc3Qgd2lkZ2V0TWFuYWdlciA9IG5ldyBEb2N1bWVudFdpZGdldE1hbmFnZXIoe1xuICAgICAgICAgICAgcmVnaXN0cnk6IHRoaXMucmVnaXN0cnksXG4gICAgICAgICAgICB0cmFuc2xhdG9yOiB0aGlzLnRyYW5zbGF0b3JcbiAgICAgICAgfSk7XG4gICAgICAgIHdpZGdldE1hbmFnZXIuYWN0aXZhdGVSZXF1ZXN0ZWQuY29ubmVjdCh0aGlzLl9vbkFjdGl2YXRlUmVxdWVzdGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fd2lkZ2V0TWFuYWdlciA9IHdpZGdldE1hbmFnZXI7XG4gICAgICAgIHRoaXMuX3NldEJ1c3kgPSBvcHRpb25zLnNldEJ1c3k7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiBvbmUgb2YgdGhlIGRvY3VtZW50cyBpcyBhY3RpdmF0ZWQuXG4gICAgICovXG4gICAgZ2V0IGFjdGl2YXRlUmVxdWVzdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZhdGVSZXF1ZXN0ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gYXV0b3NhdmUgZG9jdW1lbnRzLlxuICAgICAqL1xuICAgIGdldCBhdXRvc2F2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9zYXZlO1xuICAgIH1cbiAgICBzZXQgYXV0b3NhdmUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYXV0b3NhdmUgPSB2YWx1ZTtcbiAgICAgICAgLy8gRm9yIGVhY2ggZXhpc3RpbmcgY29udGV4dCwgc3RhcnQvc3RvcCB0aGUgYXV0b3NhdmUgaGFuZGxlciBhcyBuZWVkZWQuXG4gICAgICAgIHRoaXMuX2NvbnRleHRzLmZvckVhY2goY29udGV4dCA9PiB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gUHJpdmF0ZS5zYXZlSGFuZGxlclByb3BlcnR5LmdldChjb250ZXh0KTtcbiAgICAgICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSAmJiAhaGFuZGxlci5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIuc3RhcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBmYWxzZSAmJiBoYW5kbGVyLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlci5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHRoZSB0aW1lIGludGVydmFsIGZvciBhdXRvc2F2ZSBpbiBzZWNvbmRzLlxuICAgICAqL1xuICAgIGdldCBhdXRvc2F2ZUludGVydmFsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b3NhdmVJbnRlcnZhbDtcbiAgICB9XG4gICAgc2V0IGF1dG9zYXZlSW50ZXJ2YWwodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYXV0b3NhdmVJbnRlcnZhbCA9IHZhbHVlO1xuICAgICAgICAvLyBGb3IgZWFjaCBleGlzdGluZyBjb250ZXh0LCBzZXQgdGhlIHNhdmUgaW50ZXJ2YWwgYXMgbmVlZGVkLlxuICAgICAgICB0aGlzLl9jb250ZXh0cy5mb3JFYWNoKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IFByaXZhdGUuc2F2ZUhhbmRsZXJQcm9wZXJ0eS5nZXQoY29udGV4dCk7XG4gICAgICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoYW5kbGVyLnNhdmVJbnRlcnZhbCA9IHZhbHVlIHx8IDEyMDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZXMgbWF4IGFjY2VwdGFibGUgZGlmZmVyZW5jZSwgaW4gbWlsbGlzZWNvbmRzLCBiZXR3ZWVuIGxhc3QgbW9kaWZpZWQgdGltZXN0YW1wcyBvbiBkaXNrIGFuZCBjbGllbnRcbiAgICAgKi9cbiAgICBnZXQgbGFzdE1vZGlmaWVkQ2hlY2tNYXJnaW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXN0TW9kaWZpZWRDaGVja01hcmdpbjtcbiAgICB9XG4gICAgc2V0IGxhc3RNb2RpZmllZENoZWNrTWFyZ2luKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2xhc3RNb2RpZmllZENoZWNrTWFyZ2luID0gdmFsdWU7XG4gICAgICAgIC8vIEZvciBlYWNoIGV4aXN0aW5nIGNvbnRleHQsIHVwZGF0ZSB0aGUgbWFyZ2luIHZhbHVlLlxuICAgICAgICB0aGlzLl9jb250ZXh0cy5mb3JFYWNoKGNvbnRleHQgPT4ge1xuICAgICAgICAgICAgY29udGV4dC5sYXN0TW9kaWZpZWRDaGVja01hcmdpbiA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHdoZXRoZXIgdGhlIGRvY3VtZW50IG1hbmFnZXIgaGFzIGJlZW4gZGlzcG9zZWQuXG4gICAgICovXG4gICAgZ2V0IGlzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgZG9jdW1lbnQgbWFuYWdlci5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIC8vIENsZWFyIGFueSBsaXN0ZW5lcnMgZm9yIG91ciBzaWduYWxzLlxuICAgICAgICBTaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgICAgICAvLyBDbG9zZSBhbGwgdGhlIHdpZGdldHMgZm9yIG91ciBjb250ZXh0cyBhbmQgZGlzcG9zZSB0aGUgd2lkZ2V0IG1hbmFnZXIuXG4gICAgICAgIHRoaXMuX2NvbnRleHRzLmZvckVhY2goY29udGV4dCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2lkZ2V0TWFuYWdlci5jbG9zZVdpZGdldHMoY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl93aWRnZXRNYW5hZ2VyLmRpc3Bvc2UoKTtcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGNvbnRleHQgbGlzdC5cbiAgICAgICAgdGhpcy5fY29udGV4dHMubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvbmUgYSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHNvdXJjZSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIG5ldyB3aWRnZXQgb3IgYHVuZGVmaW5lZGAuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogIFVzZXMgdGhlIHNhbWUgd2lkZ2V0IGZhY3RvcnkgYW5kIGNvbnRleHQgYXMgdGhlIHNvdXJjZSwgb3IgcmV0dXJuc1xuICAgICAqICBgdW5kZWZpbmVkYCBpZiB0aGUgc291cmNlIHdpZGdldCBpcyBub3QgbWFuYWdlZCBieSB0aGlzIG1hbmFnZXIuXG4gICAgICovXG4gICAgY2xvbmVXaWRnZXQod2lkZ2V0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWRnZXRNYW5hZ2VyLmNsb25lV2lkZ2V0KHdpZGdldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlIGFsbCBvZiB0aGUgb3BlbiBkb2N1bWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgcmVzb2x2aW5nIHdoZW4gdGhlIHdpZGdldHMgYXJlIGNsb3NlZC5cbiAgICAgKi9cbiAgICBjbG9zZUFsbCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHRoaXMuX2NvbnRleHRzLm1hcChjb250ZXh0ID0+IHRoaXMuX3dpZGdldE1hbmFnZXIuY2xvc2VXaWRnZXRzKGNvbnRleHQpKSkudGhlbigoKSA9PiB1bmRlZmluZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9zZSB0aGUgd2lkZ2V0cyBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBwYXRoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggLSBUaGUgdGFyZ2V0IHBhdGguXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgcmVzb2x2aW5nIHdoZW4gdGhlIHdpZGdldHMgYXJlIGNsb3NlZC5cbiAgICAgKi9cbiAgICBjbG9zZUZpbGUocGF0aCkge1xuICAgICAgICBjb25zdCBjbG9zZSA9IHRoaXMuX2NvbnRleHRzRm9yUGF0aChwYXRoKS5tYXAoYyA9PiB0aGlzLl93aWRnZXRNYW5hZ2VyLmNsb3NlV2lkZ2V0cyhjKSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChjbG9zZSkudGhlbih4ID0+IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZG9jdW1lbnQgY29udGV4dCBmb3IgYSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHdpZGdldCBvZiBpbnRlcmVzdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBjb250ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgd2lkZ2V0LCBvciBgdW5kZWZpbmVkYCBpZiBubyBzdWNoXG4gICAgICogY29udGV4dCBleGlzdHMuXG4gICAgICovXG4gICAgY29udGV4dEZvcldpZGdldCh3aWRnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZGdldE1hbmFnZXIuY29udGV4dEZvcldpZGdldCh3aWRnZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb3B5IGEgZmlsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmcm9tRmlsZSAtIFRoZSBmdWxsIHBhdGggb2YgdGhlIG9yaWdpbmFsIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdG9EaXIgLSBUaGUgZnVsbCBwYXRoIHRvIHRoZSB0YXJnZXQgZGlyZWN0b3J5LlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHRvIHRoZSBjb250ZW50cyBvZiB0aGUgZmlsZS5cbiAgICAgKi9cbiAgICBjb3B5KGZyb21GaWxlLCB0b0Rpcikge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlcy5jb250ZW50cy5jb3B5KGZyb21GaWxlLCB0b0Rpcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBmaWxlIGFuZCByZXR1cm4gdGhlIHdpZGdldCB1c2VkIHRvIHZpZXcgaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIFRoZSBmaWxlIHBhdGggdG8gY3JlYXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgd2lkZ2V0IGZhY3RvcnkgdG8gdXNlLiAnZGVmYXVsdCcgd2lsbCB1c2UgdGhlIGRlZmF1bHQgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGtlcm5lbCAtIEFuIG9wdGlvbmFsIGtlcm5lbCBuYW1lL2lkIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgd2lkZ2V0LCBvciBgdW5kZWZpbmVkYC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIGB1bmRlZmluZWRgIGlmIGEgdmFsaWQgd2lkZ2V0IGZhY3RvcnlcbiAgICAgKiBjYW5ub3QgYmUgZm91bmQuXG4gICAgICovXG4gICAgY3JlYXRlTmV3KHBhdGgsIHdpZGdldE5hbWUgPSAnZGVmYXVsdCcsIGtlcm5lbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlT3JPcGVuRG9jdW1lbnQoJ2NyZWF0ZScsIHBhdGgsIHdpZGdldE5hbWUsIGtlcm5lbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIFRoZSBmdWxsIHBhdGggdG8gdGhlIGZpbGUgdG8gYmUgZGVsZXRlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB3aGljaCByZXNvbHZlcyB3aGVuIHRoZSBmaWxlIGlzIGRlbGV0ZWQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogSWYgdGhlcmUgaXMgYSBydW5uaW5nIHNlc3Npb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBmaWxlIGFuZCBubyBvdGhlclxuICAgICAqIHNlc3Npb25zIGFyZSB1c2luZyB0aGUga2VybmVsLCB0aGUgc2Vzc2lvbiB3aWxsIGJlIHNodXQgZG93bi5cbiAgICAgKi9cbiAgICBkZWxldGVGaWxlKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZXMuc2Vzc2lvbnNcbiAgICAgICAgICAgIC5zdG9wSWZOZWVkZWQocGF0aClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRzLmRlbGV0ZShwYXRoKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHRzRm9yUGF0aChwYXRoKS5mb3JFYWNoKGNvbnRleHQgPT4gdGhpcy5fd2lkZ2V0TWFuYWdlci5kZWxldGVXaWRnZXRzKGNvbnRleHQpKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodm9pZCAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlZSBpZiBhIHdpZGdldCBhbHJlYWR5IGV4aXN0cyBmb3IgdGhlIGdpdmVuIHBhdGggYW5kIHdpZGdldCBuYW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggLSBUaGUgZmlsZSBwYXRoIHRvIHVzZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWRnZXROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHdpZGdldCBmYWN0b3J5IHRvIHVzZS4gJ2RlZmF1bHQnIHdpbGwgdXNlIHRoZSBkZWZhdWx0IHdpZGdldC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBmb3VuZCB3aWRnZXQsIG9yIGB1bmRlZmluZWRgLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gZmluZCBhbiBleGlzdGluZyB3aWRnZXQgaW5zdGVhZCBvZiBvcGVuaW5nXG4gICAgICogYSBuZXcgd2lkZ2V0LlxuICAgICAqL1xuICAgIGZpbmRXaWRnZXQocGF0aCwgd2lkZ2V0TmFtZSA9ICdkZWZhdWx0Jykge1xuICAgICAgICBjb25zdCBuZXdQYXRoID0gUGF0aEV4dC5ub3JtYWxpemUocGF0aCk7XG4gICAgICAgIGxldCB3aWRnZXROYW1lcyA9IFt3aWRnZXROYW1lXTtcbiAgICAgICAgaWYgKHdpZGdldE5hbWUgPT09ICdkZWZhdWx0Jykge1xuICAgICAgICAgICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVnaXN0cnkuZGVmYXVsdFdpZGdldEZhY3RvcnkobmV3UGF0aCk7XG4gICAgICAgICAgICBpZiAoIWZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkZ2V0TmFtZXMgPSBbZmFjdG9yeS5uYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh3aWRnZXROYW1lID09PSBudWxsKSB7XG4gICAgICAgICAgICB3aWRnZXROYW1lcyA9IHRoaXMucmVnaXN0cnlcbiAgICAgICAgICAgICAgICAucHJlZmVycmVkV2lkZ2V0RmFjdG9yaWVzKG5ld1BhdGgpXG4gICAgICAgICAgICAgICAgLm1hcChmID0+IGYubmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjb250ZXh0IG9mIHRoaXMuX2NvbnRleHRzRm9yUGF0aChuZXdQYXRoKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB3aWRnZXROYW1lIG9mIHdpZGdldE5hbWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHdpZGdldE5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdGhpcy5fd2lkZ2V0TWFuYWdlci5maW5kV2lkZ2V0KGNvbnRleHQsIHdpZGdldE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB1bnRpdGxlZCBmaWxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgZmlsZSBjb250ZW50IGNyZWF0aW9uIG9wdGlvbnMuXG4gICAgICovXG4gICAgbmV3VW50aXRsZWQob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy50eXBlID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZXh0ID0gb3B0aW9ucy5leHQgfHwgJy50eHQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRzLm5ld1VudGl0bGVkKG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVuIGEgZmlsZSBhbmQgcmV0dXJuIHRoZSB3aWRnZXQgdXNlZCB0byB2aWV3IGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggLSBUaGUgZmlsZSBwYXRoIHRvIG9wZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSB3aWRnZXQgZmFjdG9yeSB0byB1c2UuICdkZWZhdWx0JyB3aWxsIHVzZSB0aGUgZGVmYXVsdCB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ga2VybmVsIC0gQW4gb3B0aW9uYWwga2VybmVsIG5hbWUvaWQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCB3aWRnZXQsIG9yIGB1bmRlZmluZWRgLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gYHVuZGVmaW5lZGAgaWYgYSB2YWxpZCB3aWRnZXQgZmFjdG9yeVxuICAgICAqIGNhbm5vdCBiZSBmb3VuZC5cbiAgICAgKi9cbiAgICBvcGVuKHBhdGgsIHdpZGdldE5hbWUgPSAnZGVmYXVsdCcsIGtlcm5lbCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3JlYXRlT3JPcGVuRG9jdW1lbnQoJ29wZW4nLCBwYXRoLCB3aWRnZXROYW1lLCBrZXJuZWwsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVuIGEgZmlsZSBhbmQgcmV0dXJuIHRoZSB3aWRnZXQgdXNlZCB0byB2aWV3IGl0LlxuICAgICAqIFJldmVhbHMgYW4gYWxyZWFkeSBleGlzdGluZyBlZGl0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIFRoZSBmaWxlIHBhdGggdG8gb3Blbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWRnZXROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHdpZGdldCBmYWN0b3J5IHRvIHVzZS4gJ2RlZmF1bHQnIHdpbGwgdXNlIHRoZSBkZWZhdWx0IHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXJuZWwgLSBBbiBvcHRpb25hbCBrZXJuZWwgbmFtZS9pZCB0byBvdmVycmlkZSB0aGUgZGVmYXVsdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIHdpZGdldCwgb3IgYHVuZGVmaW5lZGAuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBmdW5jdGlvbiB3aWxsIHJldHVybiBgdW5kZWZpbmVkYCBpZiBhIHZhbGlkIHdpZGdldCBmYWN0b3J5XG4gICAgICogY2Fubm90IGJlIGZvdW5kLlxuICAgICAqL1xuICAgIG9wZW5PclJldmVhbChwYXRoLCB3aWRnZXROYW1lID0gJ2RlZmF1bHQnLCBrZXJuZWwsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gdGhpcy5maW5kV2lkZ2V0KHBhdGgsIHdpZGdldE5hbWUpO1xuICAgICAgICBpZiAod2lkZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9vcGVuZXIub3Blbih3aWRnZXQsIG9wdGlvbnMgfHwge30pO1xuICAgICAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vcGVuKHBhdGgsIHdpZGdldE5hbWUsIGtlcm5lbCwgb3B0aW9ucyB8fCB7fSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJ3cml0ZSBhIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb2xkUGF0aCAtIFRoZSBmdWxsIHBhdGggdG8gdGhlIG9yaWdpbmFsIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmV3UGF0aCAtIFRoZSBmdWxsIHBhdGggdG8gdGhlIG5ldyBmaWxlLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIGNvbnRhaW5pbmcgdGhlIG5ldyBmaWxlIGNvbnRlbnRzIG1vZGVsLlxuICAgICAqL1xuICAgIG92ZXJ3cml0ZShvbGRQYXRoLCBuZXdQYXRoKSB7XG4gICAgICAgIC8vIENsZWFubHkgb3ZlcndyaXRlIHRoZSBmaWxlIGJ5IG1vdmluZyBpdCwgbWFraW5nIHN1cmUgdGhlIG9yaWdpbmFsIGRvZXNcbiAgICAgICAgLy8gbm90IGV4aXN0LCBhbmQgdGhlbiByZW5hbWluZyB0byB0aGUgbmV3IHBhdGguXG4gICAgICAgIGNvbnN0IHRlbXBQYXRoID0gYCR7bmV3UGF0aH0uJHtVVUlELnV1aWQ0KCl9YDtcbiAgICAgICAgY29uc3QgY2IgPSAoKSA9PiB0aGlzLnJlbmFtZSh0ZW1wUGF0aCwgbmV3UGF0aCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmFtZShvbGRQYXRoLCB0ZW1wUGF0aClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZUZpbGUobmV3UGF0aCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihjYiwgY2IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5hbWUgYSBmaWxlIG9yIGRpcmVjdG9yeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvbGRQYXRoIC0gVGhlIGZ1bGwgcGF0aCB0byB0aGUgb3JpZ2luYWwgZmlsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuZXdQYXRoIC0gVGhlIGZ1bGwgcGF0aCB0byB0aGUgbmV3IGZpbGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgY29udGFpbmluZyB0aGUgbmV3IGZpbGUgY29udGVudHMgbW9kZWwuICBUaGUgcHJvbWlzZVxuICAgICAqIHdpbGwgcmVqZWN0IGlmIHRoZSBuZXdQYXRoIGFscmVhZHkgZXhpc3RzLiAgVXNlIFtbb3ZlcndyaXRlXV0gdG8gb3ZlcndyaXRlXG4gICAgICogYSBmaWxlLlxuICAgICAqL1xuICAgIHJlbmFtZShvbGRQYXRoLCBuZXdQYXRoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2VzLmNvbnRlbnRzLnJlbmFtZShvbGRQYXRoLCBuZXdQYXRoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRmluZCBhIGNvbnRleHQgZm9yIGEgZ2l2ZW4gcGF0aCBhbmQgZmFjdG9yeSBuYW1lLlxuICAgICAqL1xuICAgIF9maW5kQ29udGV4dChwYXRoLCBmYWN0b3J5TmFtZSkge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9IHRoaXMuc2VydmljZXMuY29udGVudHMubm9ybWFsaXplKHBhdGgpO1xuICAgICAgICByZXR1cm4gZmluZCh0aGlzLl9jb250ZXh0cywgY29udGV4dCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKGNvbnRleHQucGF0aCA9PT0gbm9ybWFsaXplZFBhdGggJiYgY29udGV4dC5mYWN0b3J5TmFtZSA9PT0gZmFjdG9yeU5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjb250ZXh0cyBmb3IgYSBnaXZlbiBwYXRoLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZXJlIG1heSBiZSBtb3JlIHRoYW4gb25lIGNvbnRleHQgZm9yIGEgZ2l2ZW4gcGF0aCBpZiB0aGUgcGF0aCBpcyBvcGVuXG4gICAgICogd2l0aCBtdWx0aXBsZSBtb2RlbCBmYWN0b3JpZXMgKGZvciBleGFtcGxlLCBhIG5vdGVib29rIGNhbiBiZSBvcGVuIHdpdGggYVxuICAgICAqIG5vdGVib29rIG1vZGVsIGZhY3RvcnkgYW5kIGEgdGV4dCBtb2RlbCBmYWN0b3J5KS5cbiAgICAgKi9cbiAgICBfY29udGV4dHNGb3JQYXRoKHBhdGgpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFBhdGggPSB0aGlzLnNlcnZpY2VzLmNvbnRlbnRzLm5vcm1hbGl6ZShwYXRoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHRzLmZpbHRlcihjb250ZXh0ID0+IGNvbnRleHQucGF0aCA9PT0gbm9ybWFsaXplZFBhdGgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBjb250ZXh0IGZyb20gYSBwYXRoIGFuZCBhIG1vZGVsIGZhY3RvcnkuXG4gICAgICovXG4gICAgX2NyZWF0ZUNvbnRleHQocGF0aCwgZmFjdG9yeSwga2VybmVsUHJlZmVyZW5jZSkge1xuICAgICAgICAvLyBUT0RPOiBNYWtlIGl0IGltcG9zc2libGUgdG8gb3BlbiB0d28gZGlmZmVyZW50IGNvbnRleHRzIGZvciB0aGUgc2FtZVxuICAgICAgICAvLyBwYXRoLiBPciBhdCBsZWFzdCBwcm9tcHQgdGhlIGNsb3Npbmcgb2YgYWxsIHdpZGdldHMgYXNzb2NpYXRlZCB3aXRoIHRoZVxuICAgICAgICAvLyBvbGQgY29udGV4dCBiZWZvcmUgb3BlbmluZyB0aGUgbmV3IGNvbnRleHQuIFRoaXMgd2lsbCBtYWtlIHRoaW5ncyBtdWNoXG4gICAgICAgIC8vIG1vcmUgY29uc2lzdGVudCBmb3IgdGhlIHVzZXJzLCBhdCB0aGUgY29zdCBvZiBzb21lIGNvbmZ1c2lvbiBhYm91dCB3aGF0XG4gICAgICAgIC8vIG1vZGVscyBhcmUgYW5kIHdoeSBzb21ldGltZXMgdGhleSBjYW5ub3Qgb3BlbiB0aGUgc2FtZSBmaWxlIGluIGRpZmZlcmVudFxuICAgICAgICAvLyB3aWRnZXRzIHRoYXQgaGF2ZSBkaWZmZXJlbnQgbW9kZWxzLlxuICAgICAgICAvLyBBbGxvdyBvcHRpb25zIHRvIGJlIHBhc3NlZCB3aGVuIGFkZGluZyBhIHNpYmxpbmcuXG4gICAgICAgIGNvbnN0IGFkb3B0ZXIgPSAod2lkZ2V0LCBvcHRpb25zKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl93aWRnZXRNYW5hZ2VyLmFkb3B0V2lkZ2V0KGNvbnRleHQsIHdpZGdldCk7XG4gICAgICAgICAgICB0aGlzLl9vcGVuZXIub3Blbih3aWRnZXQsIG9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBtb2RlbERCRmFjdG9yeSA9IHRoaXMuc2VydmljZXMuY29udGVudHMuZ2V0TW9kZWxEQkZhY3RvcnkocGF0aCkgfHwgdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gbmV3IENvbnRleHQoe1xuICAgICAgICAgICAgb3BlbmVyOiBhZG9wdGVyLFxuICAgICAgICAgICAgbWFuYWdlcjogdGhpcy5zZXJ2aWNlcyxcbiAgICAgICAgICAgIGZhY3RvcnksXG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAga2VybmVsUHJlZmVyZW5jZSxcbiAgICAgICAgICAgIG1vZGVsREJGYWN0b3J5LFxuICAgICAgICAgICAgc2V0QnVzeTogdGhpcy5fc2V0QnVzeSxcbiAgICAgICAgICAgIHNlc3Npb25EaWFsb2dzOiB0aGlzLl9kaWFsb2dzLFxuICAgICAgICAgICAgY29sbGFib3JhdGl2ZTogdGhpcy5fY29sbGFib3JhdGl2ZSxcbiAgICAgICAgICAgIGRvY1Byb3ZpZGVyRmFjdG9yeTogdGhpcy5fZG9jUHJvdmlkZXJGYWN0b3J5LFxuICAgICAgICAgICAgbGFzdE1vZGlmaWVkQ2hlY2tNYXJnaW46IHRoaXMuX2xhc3RNb2RpZmllZENoZWNrTWFyZ2luLFxuICAgICAgICAgICAgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gbmV3IFNhdmVIYW5kbGVyKHtcbiAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICBzYXZlSW50ZXJ2YWw6IHRoaXMuYXV0b3NhdmVJbnRlcnZhbFxuICAgICAgICB9KTtcbiAgICAgICAgUHJpdmF0ZS5zYXZlSGFuZGxlclByb3BlcnR5LnNldChjb250ZXh0LCBoYW5kbGVyKTtcbiAgICAgICAgdm9pZCBjb250ZXh0LnJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b3NhdmUpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLnN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb250ZXh0LmRpc3Bvc2VkLmNvbm5lY3QodGhpcy5fb25Db250ZXh0RGlzcG9zZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLl9jb250ZXh0cy5wdXNoKGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY29udGV4dCBkaXNwb3NhbC5cbiAgICAgKi9cbiAgICBfb25Db250ZXh0RGlzcG9zZWQoY29udGV4dCkge1xuICAgICAgICBBcnJheUV4dC5yZW1vdmVGaXJzdE9mKHRoaXMuX2NvbnRleHRzLCBjb250ZXh0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB3aWRnZXQgZmFjdG9yeSBmb3IgYSBnaXZlbiB3aWRnZXQgbmFtZS5cbiAgICAgKi9cbiAgICBfd2lkZ2V0RmFjdG9yeUZvcihwYXRoLCB3aWRnZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IHsgcmVnaXN0cnkgfSA9IHRoaXM7XG4gICAgICAgIGlmICh3aWRnZXROYW1lID09PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGZhY3RvcnkgPSByZWdpc3RyeS5kZWZhdWx0V2lkZ2V0RmFjdG9yeShwYXRoKTtcbiAgICAgICAgICAgIGlmICghZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aWRnZXROYW1lID0gZmFjdG9yeS5uYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWdpc3RyeS5nZXRXaWRnZXRGYWN0b3J5KHdpZGdldE5hbWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGRvY3VtZW50LCBvciBsb2FkcyBvbmUgZnJvbSBkaXNrLCBkZXBlbmRpbmcgb24gdGhlIGB3aGljaGAgYXJndW1lbnQuXG4gICAgICogSWYgYHdoaWNoPT09J2NyZWF0ZSdgLCB0aGVuIGl0IGNyZWF0ZXMgYSBuZXcgZG9jdW1lbnQuIElmIGB3aGljaD09PSdvcGVuJ2AsXG4gICAgICogdGhlbiBpdCBsb2FkcyB0aGUgZG9jdW1lbnQgZnJvbSBkaXNrLlxuICAgICAqXG4gICAgICogVGhlIHR3byBjYXNlcyBkaWZmZXIgaW4gaG93IHRoZSBkb2N1bWVudCBjb250ZXh0IGlzIGhhbmRsZWQsIGJ1dCB0aGUgY3JlYXRpb25cbiAgICAgKiBvZiB0aGUgd2lkZ2V0IGFuZCBsYXVuY2hpbmcgb2YgdGhlIGtlcm5lbCBhcmUgaWRlbnRpY2FsLlxuICAgICAqL1xuICAgIF9jcmVhdGVPck9wZW5Eb2N1bWVudCh3aGljaCwgcGF0aCwgd2lkZ2V0TmFtZSA9ICdkZWZhdWx0Jywga2VybmVsLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldEZhY3RvcnkgPSB0aGlzLl93aWRnZXRGYWN0b3J5Rm9yKHBhdGgsIHdpZGdldE5hbWUpO1xuICAgICAgICBpZiAoIXdpZGdldEZhY3RvcnkpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbW9kZWxOYW1lID0gd2lkZ2V0RmFjdG9yeS5tb2RlbE5hbWUgfHwgJ3RleHQnO1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZWdpc3RyeS5nZXRNb2RlbEZhY3RvcnkobW9kZWxOYW1lKTtcbiAgICAgICAgaWYgKCFmYWN0b3J5KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhhbmRsZSB0aGUga2VybmVsIHByZWZlcmVuY2UuXG4gICAgICAgIGNvbnN0IHByZWZlcmVuY2UgPSB0aGlzLnJlZ2lzdHJ5LmdldEtlcm5lbFByZWZlcmVuY2UocGF0aCwgd2lkZ2V0RmFjdG9yeS5uYW1lLCBrZXJuZWwpO1xuICAgICAgICBsZXQgY29udGV4dDtcbiAgICAgICAgbGV0IHJlYWR5ID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgIC8vIEhhbmRsZSB0aGUgbG9hZC1mcm9tLWRpc2sgY2FzZVxuICAgICAgICBpZiAod2hpY2ggPT09ICdvcGVuJykge1xuICAgICAgICAgICAgLy8gVXNlIGFuIGV4aXN0aW5nIGNvbnRleHQgaWYgYXZhaWxhYmxlLlxuICAgICAgICAgICAgY29udGV4dCA9IHRoaXMuX2ZpbmRDb250ZXh0KHBhdGgsIGZhY3RvcnkubmFtZSkgfHwgbnVsbDtcbiAgICAgICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KHBhdGgsIGZhY3RvcnksIHByZWZlcmVuY2UpO1xuICAgICAgICAgICAgICAgIC8vIFBvcHVsYXRlIHRoZSBtb2RlbCwgZWl0aGVyIGZyb20gZGlzayBvciBhXG4gICAgICAgICAgICAgICAgLy8gbW9kZWwgYmFja2VuZC5cbiAgICAgICAgICAgICAgICByZWFkeSA9IHRoaXMuX3doZW4udGhlbigoKSA9PiBjb250ZXh0LmluaXRpYWxpemUoZmFsc2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh3aGljaCA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSB0aGlzLl9jcmVhdGVDb250ZXh0KHBhdGgsIGZhY3RvcnksIHByZWZlcmVuY2UpO1xuICAgICAgICAgICAgLy8gSW1tZWRpYXRlbHkgc2F2ZSB0aGUgY29udGVudHMgdG8gZGlzay5cbiAgICAgICAgICAgIHJlYWR5ID0gdGhpcy5fd2hlbi50aGVuKCgpID0+IGNvbnRleHQuaW5pdGlhbGl6ZSh0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgYXJndW1lbnQgJ3doaWNoJzogJHt3aGljaH1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3aWRnZXQgPSB0aGlzLl93aWRnZXRNYW5hZ2VyLmNyZWF0ZVdpZGdldCh3aWRnZXRGYWN0b3J5LCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy5fb3BlbmVyLm9wZW4od2lkZ2V0LCBvcHRpb25zIHx8IHt9KTtcbiAgICAgICAgLy8gSWYgdGhlIGluaXRpYWwgb3BlbmluZyBvZiB0aGUgY29udGV4dCBmYWlscywgZGlzcG9zZSBvZiB0aGUgd2lkZ2V0LlxuICAgICAgICByZWFkeS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIGluaXRpYWxpemUgdGhlIGNvbnRleHQgd2l0aCAnJHtmYWN0b3J5Lm5hbWV9JyBmb3IgJHtwYXRofWAsIGVycik7XG4gICAgICAgICAgICB3aWRnZXQuY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhbiBhY3RpdmF0ZVJlcXVlc3RlZCBzaWduYWwgZnJvbSB0aGUgd2lkZ2V0IG1hbmFnZXIuXG4gICAgICovXG4gICAgX29uQWN0aXZhdGVSZXF1ZXN0ZWQoc2VuZGVyLCBhcmdzKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRlUmVxdWVzdGVkLmVtaXQoYXJncyk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgcHJpdmF0ZSBkYXRhLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIEFuIGF0dGFjaGVkIHByb3BlcnR5IGZvciBhIGNvbnRleHQgc2F2ZSBoYW5kbGVyLlxuICAgICAqL1xuICAgIFByaXZhdGUuc2F2ZUhhbmRsZXJQcm9wZXJ0eSA9IG5ldyBBdHRhY2hlZFByb3BlcnR5KHtcbiAgICAgICAgbmFtZTogJ3NhdmVIYW5kbGVyJyxcbiAgICAgICAgY3JlYXRlOiAoKSA9PiB1bmRlZmluZWRcbiAgICB9KTtcbn0pKFByaXZhdGUgfHwgKFByaXZhdGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFuYWdlci5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBWRG9tTW9kZWwsIFZEb21SZW5kZXJlciB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IFBhdGhFeHQgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgVGV4dEl0ZW0gfSBmcm9tICdAanVweXRlcmxhYi9zdGF0dXNiYXInO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8qKlxuICogQSBwdXJlIGNvbXBvbmVudCBmb3IgcmVuZGVyaW5nIGEgZmlsZSBwYXRoIChvciBhY3Rpdml0eSBuYW1lKS5cbiAqXG4gKiBAcGFyYW0gcHJvcHMgLSB0aGUgcHJvcHMgZm9yIHRoZSBjb21wb25lbnQuXG4gKlxuICogQHJldHVybnMgYSB0c3ggY29tcG9uZW50IGZvciBhIGZpbGUgcGF0aC5cbiAqL1xuZnVuY3Rpb24gUGF0aFN0YXR1c0NvbXBvbmVudChwcm9wcykge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRJdGVtLCB7IHNvdXJjZTogcHJvcHMubmFtZSwgdGl0bGU6IHByb3BzLmZ1bGxQYXRoIH0pO1xufVxuLyoqXG4gKiBBIHN0YXR1cyBiYXIgaXRlbSBmb3IgdGhlIGN1cnJlbnQgZmlsZSBwYXRoIChvciBhY3Rpdml0eSBuYW1lKS5cbiAqL1xuZXhwb3J0IGNsYXNzIFBhdGhTdGF0dXMgZXh0ZW5kcyBWRG9tUmVuZGVyZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBQYXRoU3RhdHVzIHN0YXR1cyBpdGVtLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIobmV3IFBhdGhTdGF0dXMuTW9kZWwob3B0cy5kb2NNYW5hZ2VyKSk7XG4gICAgICAgIHRoaXMubm9kZS50aXRsZSA9IHRoaXMubW9kZWwucGF0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSBzdGF0dXMgaXRlbS5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChQYXRoU3RhdHVzQ29tcG9uZW50LCB7IGZ1bGxQYXRoOiB0aGlzLm1vZGVsLnBhdGgsIG5hbWU6IHRoaXMubW9kZWwubmFtZSB9KSk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgUGF0aFN0YXR1cyBzdGF0aWNzLlxuICovXG4oZnVuY3Rpb24gKFBhdGhTdGF0dXMpIHtcbiAgICAvKipcbiAgICAgKiBBIFZEb21Nb2RlbCBmb3IgcmVuZGVyaW5nIHRoZSBQYXRoU3RhdHVzIHN0YXR1cyBpdGVtLlxuICAgICAqL1xuICAgIGNsYXNzIE1vZGVsIGV4dGVuZHMgVkRvbU1vZGVsIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnN0cnVjdCBhIG5ldyBtb2RlbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGRvY01hbmFnZXI6IHRoZSBhcHBsaWNhdGlvbiBkb2N1bWVudCBtYW5hZ2VyLiBVc2VkIHRvIGNoZWNrXG4gICAgICAgICAqICAgd2hldGhlciB0aGUgY3VycmVudCB3aWRnZXQgaXMgYSBkb2N1bWVudC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0cnVjdG9yKGRvY01hbmFnZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJlYWN0IHRvIGEgdGl0bGUgY2hhbmdlIGZvciB0aGUgY3VycmVudCB3aWRnZXQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX29uVGl0bGVDaGFuZ2UgPSAodGl0bGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRTdGF0ZSA9IHRoaXMuX2dldEFsbFN0YXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHRpdGxlLmxhYmVsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJDaGFuZ2Uob2xkU3RhdGUsIHRoaXMuX2dldEFsbFN0YXRlKCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVhY3QgdG8gYSBwYXRoIGNoYW5nZSBmb3IgdGhlIGN1cnJlbnQgZG9jdW1lbnQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuX29uUGF0aENoYW5nZSA9IChfZG9jdW1lbnRNb2RlbCwgbmV3UGF0aCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5fZ2V0QWxsU3RhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXRoID0gbmV3UGF0aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9uYW1lID0gUGF0aEV4dC5iYXNlbmFtZShuZXdQYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90cmlnZ2VyQ2hhbmdlKG9sZFN0YXRlLCB0aGlzLl9nZXRBbGxTdGF0ZSgpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9wYXRoID0gJyc7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gJyc7XG4gICAgICAgICAgICB0aGlzLl93aWRnZXQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fZG9jTWFuYWdlciA9IGRvY01hbmFnZXI7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBjdXJyZW50IHBhdGggZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAgICAgICAgICovXG4gICAgICAgIGdldCBwYXRoKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IGFjdGl2aXR5LlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGN1cnJlbnQgd2lkZ2V0IGZvciB0aGUgYXBwbGljYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBnZXQgd2lkZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dpZGdldDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgd2lkZ2V0KHdpZGdldCkge1xuICAgICAgICAgICAgY29uc3Qgb2xkV2lkZ2V0ID0gdGhpcy5fd2lkZ2V0O1xuICAgICAgICAgICAgaWYgKG9sZFdpZGdldCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9sZENvbnRleHQgPSB0aGlzLl9kb2NNYW5hZ2VyLmNvbnRleHRGb3JXaWRnZXQob2xkV2lkZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAob2xkQ29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBvbGRDb250ZXh0LnBhdGhDaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5fb25QYXRoQ2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZFdpZGdldC50aXRsZS5jaGFuZ2VkLmRpc2Nvbm5lY3QodGhpcy5fb25UaXRsZUNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb2xkU3RhdGUgPSB0aGlzLl9nZXRBbGxTdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5fd2lkZ2V0ID0gd2lkZ2V0O1xuICAgICAgICAgICAgaWYgKHRoaXMuX3dpZGdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhdGggPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLl9uYW1lID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXRDb250ZXh0ID0gdGhpcy5fZG9jTWFuYWdlci5jb250ZXh0Rm9yV2lkZ2V0KHRoaXMuX3dpZGdldCk7XG4gICAgICAgICAgICAgICAgaWYgKHdpZGdldENvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGF0aCA9IHdpZGdldENvbnRleHQucGF0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmFtZSA9IFBhdGhFeHQuYmFzZW5hbWUod2lkZ2V0Q29udGV4dC5wYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0Q29udGV4dC5wYXRoQ2hhbmdlZC5jb25uZWN0KHRoaXMuX29uUGF0aENoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYXRoID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25hbWUgPSB0aGlzLl93aWRnZXQudGl0bGUubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpZGdldC50aXRsZS5jaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25UaXRsZUNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJpZ2dlckNoYW5nZShvbGRTdGF0ZSwgdGhpcy5fZ2V0QWxsU3RhdGUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgbW9kZWwuXG4gICAgICAgICAqL1xuICAgICAgICBfZ2V0QWxsU3RhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMuX3BhdGgsIHRoaXMuX25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmlnZ2VyIGEgc3RhdGUgY2hhbmdlIHRvIHJlcmVuZGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgX3RyaWdnZXJDaGFuZ2Uob2xkU3RhdGUsIG5ld1N0YXRlKSB7XG4gICAgICAgICAgICBpZiAob2xkU3RhdGVbMF0gIT09IG5ld1N0YXRlWzBdIHx8IG9sZFN0YXRlWzFdICE9PSBuZXdTdGF0ZVsxXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBQYXRoU3RhdHVzLk1vZGVsID0gTW9kZWw7XG59KShQYXRoU3RhdHVzIHx8IChQYXRoU3RhdHVzID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGhzdGF0dXMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBBIGNsYXNzIHRoYXQgbWFuYWdlcyB0aGUgYXV0byBzYXZpbmcgb2YgYSBkb2N1bWVudC5cbiAqXG4gKiAjIyMjIE5vdGVzXG4gKiBJbXBsZW1lbnRzIGh0dHBzOi8vZ2l0aHViLmNvbS9pcHl0aG9uL2lweXRob24vd2lraS9JUEVQLTE1Oi1BdXRvc2F2aW5nLXRoZS1JUHl0aG9uLU5vdGVib29rLlxuICovXG5leHBvcnQgY2xhc3MgU2F2ZUhhbmRsZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBzYXZlIGhhbmRsZXIuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9hdXRvc2F2ZVRpbWVyID0gLTE7XG4gICAgICAgIHRoaXMuX21pbkludGVydmFsID0gLTE7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gLTE7XG4gICAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luRGlhbG9nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbXVsdGlwbGllciA9IDEwO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0O1xuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IG9wdGlvbnMuc2F2ZUludGVydmFsIHx8IDEyMDtcbiAgICAgICAgdGhpcy5fbWluSW50ZXJ2YWwgPSBpbnRlcnZhbCAqIDEwMDA7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gdGhpcy5fbWluSW50ZXJ2YWw7XG4gICAgICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyIHdoZW4gdGhlIGNvbnRlbnRzIG1vZGVsIGlzIHVwZGF0ZWQuXG4gICAgICAgIHRoaXMuX2NvbnRleHQuZmlsZUNoYW5nZWQuY29ubmVjdCh0aGlzLl9zZXRUaW1lciwgdGhpcyk7XG4gICAgICAgIHRoaXMuX2NvbnRleHQuZGlzcG9zZWQuY29ubmVjdCh0aGlzLmRpc3Bvc2UsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgc2F2ZSBpbnRlcnZhbCB1c2VkIGJ5IHRoZSB0aW1lciAoaW4gc2Vjb25kcykuXG4gICAgICovXG4gICAgZ2V0IHNhdmVJbnRlcnZhbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVydmFsIC8gMTAwMDtcbiAgICB9XG4gICAgc2V0IHNhdmVJbnRlcnZhbCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9taW5JbnRlcnZhbCA9IHRoaXMuX2ludGVydmFsID0gdmFsdWUgKiAxMDAwO1xuICAgICAgICBpZiAodGhpcy5faXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldFRpbWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHdoZXRoZXIgdGhlIGhhbmRsZXIgaXMgYWN0aXZlLlxuICAgICAqL1xuICAgIGdldCBpc0FjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQWN0aXZlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgd2hldGhlciB0aGUgc2F2ZSBoYW5kbGVyIGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIHNhdmUgaGFuZGxlci5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9hdXRvc2F2ZVRpbWVyKTtcbiAgICAgICAgU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnQgdGhlIGF1dG9zYXZlci5cbiAgICAgKi9cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5faXNBY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zZXRUaW1lcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdG9wIHRoZSBhdXRvc2F2ZXIuXG4gICAgICovXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5faXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2F1dG9zYXZlVGltZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRpbWVyLlxuICAgICAqL1xuICAgIF9zZXRUaW1lcigpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2F1dG9zYXZlVGltZXIpO1xuICAgICAgICBpZiAoIXRoaXMuX2lzQWN0aXZlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYXV0b3NhdmVUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3NhdmUoKTtcbiAgICAgICAgfSwgdGhpcy5faW50ZXJ2YWwpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYW4gYXV0b3NhdmUgdGltZW91dC5cbiAgICAgKi9cbiAgICBfc2F2ZSgpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIC8vIFRyaWdnZXIgdGhlIG5leHQgdXBkYXRlLlxuICAgICAgICB0aGlzLl9zZXRUaW1lcigpO1xuICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBCYWlsIGlmIHRoZSBtb2RlbCBpcyBub3QgZGlydHkgb3IgdGhlIGZpbGUgaXMgbm90IHdyaXRhYmxlLCBvciB0aGUgZGlhbG9nXG4gICAgICAgIC8vIGlzIGFscmVhZHkgc2hvd2luZy5cbiAgICAgICAgY29uc3Qgd3JpdGFibGUgPSBjb250ZXh0LmNvbnRlbnRzTW9kZWwgJiYgY29udGV4dC5jb250ZW50c01vZGVsLndyaXRhYmxlO1xuICAgICAgICBpZiAoIXdyaXRhYmxlIHx8ICFjb250ZXh0Lm1vZGVsLmRpcnR5IHx8IHRoaXMuX2luRGlhbG9nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgY29udGV4dFxuICAgICAgICAgICAgLnNhdmUoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydDtcbiAgICAgICAgICAgIC8vIE5ldyBzYXZlIGludGVydmFsOiBoaWdoZXIgb2YgMTB4IHNhdmUgZHVyYXRpb24gb3IgbWluIGludGVydmFsLlxuICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSBNYXRoLm1heCh0aGlzLl9tdWx0aXBsaWVyICogZHVyYXRpb24sIHRoaXMuX21pbkludGVydmFsKTtcbiAgICAgICAgICAgIC8vIFJlc3RhcnQgdGhlIHVwZGF0ZSB0byBwaWNrIHVwIHRoZSBuZXcgaW50ZXJ2YWwuXG4gICAgICAgICAgICB0aGlzLl9zZXRUaW1lcigpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgdXNlciBjYW5jZWxlZCB0aGUgc2F2ZSwgZG8gbm90aGluZy5cbiAgICAgICAgICAgIC8vIEZJWE1FLVRSQU5TOiBJcyB0aGlzIGFmZmVjdGVkIGJ5IGxvY2FsaXphdGlvbj9cbiAgICAgICAgICAgIGlmIChlcnIubWVzc2FnZSA9PT0gJ0NhbmNlbCcgfHxcbiAgICAgICAgICAgICAgICBlcnIubWVzc2FnZSA9PT0gJ01vZGFsIGlzIGFscmVhZHkgZGlzcGxheWVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgbG9nIHRoZSBlcnJvci5cbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIEF1dG8tU2F2ZScsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2F2ZWhhbmRsZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgVkRvbU1vZGVsLCBWRG9tUmVuZGVyZXIgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBUZXh0SXRlbSB9IGZyb20gJ0BqdXB5dGVybGFiL3N0YXR1c2Jhcic7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vKipcbiAqIEEgcHVyZSBmdW5jdGlvbmFsIGNvbXBvbmVudCBmb3IgYSBTYXZpbmcgc3RhdHVzIGl0ZW0uXG4gKlxuICogQHBhcmFtIHByb3BzIC0gdGhlIHByb3BzIGZvciB0aGUgY29tcG9uZW50LlxuICpcbiAqIEByZXR1cm5zIGEgdHN4IGNvbXBvbmVudCBmb3IgcmVuZGVyaW5nIHRoZSBzYXZpbmcgc3RhdGUuXG4gKi9cbmZ1bmN0aW9uIFNhdmluZ1N0YXR1c0NvbXBvbmVudChwcm9wcykge1xuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRJdGVtLCB7IHNvdXJjZTogcHJvcHMuZmlsZVN0YXR1cyB9KTtcbn1cbi8qKlxuICogVGhlIGFtb3VudCBvZiB0aW1lIChpbiBtcykgdG8gcmV0YWluIHRoZSBzYXZpbmcgY29tcGxldGVkIG1lc3NhZ2VcbiAqIGJlZm9yZSBoaWRpbmcgdGhlIHN0YXR1cyBpdGVtLlxuICovXG5jb25zdCBTQVZJTkdfQ09NUExFVEVfTUVTU0FHRV9NSUxMSVMgPSAyMDAwO1xuLyoqXG4gKiBBIFZEb21SZW5kZXJlciBmb3IgYSBzYXZpbmcgc3RhdHVzIGl0ZW0uXG4gKi9cbmV4cG9ydCBjbGFzcyBTYXZpbmdTdGF0dXMgZXh0ZW5kcyBWRG9tUmVuZGVyZXIge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBTYXZpbmdTdGF0dXMgaXRlbS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG5ldyBTYXZpbmdTdGF0dXMuTW9kZWwob3B0cy5kb2NNYW5hZ2VyKSk7XG4gICAgICAgIGNvbnN0IHRyYW5zbGF0b3IgPSBvcHRzLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHRoaXMuX3N0YXR1c01hcCA9IHtcbiAgICAgICAgICAgIGNvbXBsZXRlZDogdHJhbnMuX18oJ1NhdmluZyBjb21wbGV0ZWQnKSxcbiAgICAgICAgICAgIHN0YXJ0ZWQ6IHRyYW5zLl9fKCdTYXZpbmcgc3RhcnRlZCcpLFxuICAgICAgICAgICAgZmFpbGVkOiB0cmFucy5fXygnU2F2aW5nIGZhaWxlZCcpXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbmRlciB0aGUgU2F2aW5nU3RhdHVzIGl0ZW0uXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbCA9PT0gbnVsbCB8fCB0aGlzLm1vZGVsLnN0YXR1cyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2F2aW5nU3RhdHVzQ29tcG9uZW50LCB7IGZpbGVTdGF0dXM6IHRoaXMuX3N0YXR1c01hcFt0aGlzLm1vZGVsLnN0YXR1c10gfSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgU2F2aW5nU3RhdHVzIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoU2F2aW5nU3RhdHVzKSB7XG4gICAgLyoqXG4gICAgICogQSBWRG9tTW9kZWwgZm9yIHRoZSBTYXZpbmdTdGF0dXMgaXRlbS5cbiAgICAgKi9cbiAgICBjbGFzcyBNb2RlbCBleHRlbmRzIFZEb21Nb2RlbCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBuZXcgU2F2aW5nU3RhdHVzIG1vZGVsLlxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3RydWN0b3IoZG9jTWFuYWdlcikge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogUmVhY3QgdG8gYSBzYXZpbmcgc3RhdHVzIGNoYW5nZSBmcm9tIHRoZSBjdXJyZW50IGRvY3VtZW50IHdpZGdldC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fb25TdGF0dXNDaGFuZ2UgPSAoXywgbmV3U3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdHVzID0gbmV3U3RhdHVzO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0dXMgPT09ICdjb21wbGV0ZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdHVzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgU0FWSU5HX0NPTVBMRVRFX01FU1NBR0VfTUlMTElTKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9zdGF0dXMgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fd2lkZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3N0YXR1cyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLndpZGdldCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9kb2NNYW5hZ2VyID0gZG9jTWFuYWdlcjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGN1cnJlbnQgc3RhdHVzIG9mIHRoZSBtb2RlbC5cbiAgICAgICAgICovXG4gICAgICAgIGdldCBzdGF0dXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY3VycmVudCB3aWRnZXQgZm9yIHRoZSBtb2RlbC4gQW55IHdpZGdldCBjYW4gYmUgYXNzaWduZWQsXG4gICAgICAgICAqIGJ1dCBpdCBvbmx5IGhhcyBhbnkgZWZmZWN0IGlmIHRoZSB3aWRnZXQgaXMgYW4gSURvY3VtZW50IHdpZGdldFxuICAgICAgICAgKiBrbm93biB0byB0aGUgYXBwbGljYXRpb24gZG9jdW1lbnQgbWFuYWdlci5cbiAgICAgICAgICovXG4gICAgICAgIGdldCB3aWRnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2lkZ2V0O1xuICAgICAgICB9XG4gICAgICAgIHNldCB3aWRnZXQod2lkZ2V0KSB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgY29uc3Qgb2xkV2lkZ2V0ID0gdGhpcy5fd2lkZ2V0O1xuICAgICAgICAgICAgaWYgKG9sZFdpZGdldCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9sZENvbnRleHQgPSB0aGlzLl9kb2NNYW5hZ2VyLmNvbnRleHRGb3JXaWRnZXQob2xkV2lkZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAob2xkQ29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBvbGRDb250ZXh0LnNhdmVTdGF0ZS5kaXNjb25uZWN0KHRoaXMuX29uU3RhdHVzQ2hhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoKF9hID0gdGhpcy5fd2lkZ2V0LmNvbnRlbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zYXZlU3RhdGVDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpZGdldC5jb250ZW50LnNhdmVTdGF0ZUNoYW5nZWQuZGlzY29ubmVjdCh0aGlzLl9vblN0YXR1c0NoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fd2lkZ2V0ID0gd2lkZ2V0O1xuICAgICAgICAgICAgaWYgKHRoaXMuX3dpZGdldCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXR1cyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aWRnZXRDb250ZXh0ID0gdGhpcy5fZG9jTWFuYWdlci5jb250ZXh0Rm9yV2lkZ2V0KHRoaXMuX3dpZGdldCk7XG4gICAgICAgICAgICAgICAgaWYgKHdpZGdldENvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0Q29udGV4dC5zYXZlU3RhdGUuY29ubmVjdCh0aGlzLl9vblN0YXR1c0NoYW5nZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKChfYiA9IHRoaXMuX3dpZGdldC5jb250ZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iuc2F2ZVN0YXRlQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl93aWRnZXQuY29udGVudC5zYXZlU3RhdGVDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25TdGF0dXNDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBTYXZpbmdTdGF0dXMuTW9kZWwgPSBNb2RlbDtcbn0pKFNhdmluZ1N0YXR1cyB8fCAoU2F2aW5nU3RhdHVzID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNhdmluZ3N0YXR1cy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBUb2tlbiB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbi8qIHRzbGludDpkaXNhYmxlICovXG4vKipcbiAqIFRoZSBkb2N1bWVudCByZWdpc3RyeSB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElEb2N1bWVudE1hbmFnZXIgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL2RvY21hbmFnZXI6SURvY3VtZW50TWFuYWdlcicpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9rZW5zLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IERpYWxvZywgc2hvd0RpYWxvZyB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IFRpbWUgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBBcnJheUV4dCwgZWFjaCwgZmlsdGVyLCBmaW5kLCBtYXAsIHRvQXJyYXkgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBEaXNwb3NhYmxlU2V0IH0gZnJvbSAnQGx1bWluby9kaXNwb3NhYmxlJztcbmltcG9ydCB7IE1lc3NhZ2VMb29wIH0gZnJvbSAnQGx1bWluby9tZXNzYWdpbmcnO1xuaW1wb3J0IHsgQXR0YWNoZWRQcm9wZXJ0eSB9IGZyb20gJ0BsdW1pbm8vcHJvcGVydGllcyc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGRvY3VtZW50IHdpZGdldHMuXG4gKi9cbmNvbnN0IERPQ1VNRU5UX0NMQVNTID0gJ2pwLURvY3VtZW50Jztcbi8qKlxuICogQSBjbGFzcyB0aGF0IG1haW50YWlucyB0aGUgbGlmZWN5Y2xlIG9mIGZpbGUtYmFja2VkIHdpZGdldHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEb2N1bWVudFdpZGdldE1hbmFnZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBkb2N1bWVudCB3aWRnZXQgbWFuYWdlci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2YXRlUmVxdWVzdGVkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9yZWdpc3RyeSA9IG9wdGlvbnMucmVnaXN0cnk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIG9uZSBvZiB0aGUgZG9jdW1lbnRzIGlzIGFjdGl2YXRlZC5cbiAgICAgKi9cbiAgICBnZXQgYWN0aXZhdGVSZXF1ZXN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmF0ZVJlcXVlc3RlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBkb2N1bWVudCB3aWRnZXQgbWFuYWdlciBpcyBkaXNwb3NlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNEaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRGlzcG9zZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyB1c2VkIGJ5IHRoZSB3aWRnZXQgbWFuYWdlci5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIFNpZ25hbC5kaXNjb25uZWN0UmVjZWl2ZXIodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIHdpZGdldCBmb3IgYSBkb2N1bWVudCBhbmQgaGFuZGxlIGl0cyBsaWZlY3ljbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmFjdG9yeSAtIFRoZSB3aWRnZXQgZmFjdG9yeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZXh0IC0gVGhlIGRvY3VtZW50IGNvbnRleHQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSB3aWRnZXQgY3JlYXRlZCBieSB0aGUgZmFjdG9yeS5cbiAgICAgKlxuICAgICAqIEB0aHJvd3MgSWYgdGhlIGZhY3RvcnkgaXMgbm90IHJlZ2lzdGVyZWQuXG4gICAgICovXG4gICAgY3JlYXRlV2lkZ2V0KGZhY3RvcnksIGNvbnRleHQpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZmFjdG9yeS5jcmVhdGVOZXcoY29udGV4dCk7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVXaWRnZXQod2lkZ2V0LCBmYWN0b3J5LCBjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hlbiBhIG5ldyB3aWRnZXQgaXMgY3JlYXRlZCwgd2UgbmVlZCB0byBob29rIGl0IHVwXG4gICAgICogd2l0aCBzb21lIHNpZ25hbHMsIHVwZGF0ZSB0aGUgd2lkZ2V0IGV4dGVuc2lvbnMgKGZvclxuICAgICAqIHRoaXMga2luZCBvZiB3aWRnZXQpIGluIHRoZSBkb2NyZWdpc3RyeSwgYW1vbmdcbiAgICAgKiBvdGhlciB0aGluZ3MuXG4gICAgICovXG4gICAgX2luaXRpYWxpemVXaWRnZXQod2lkZ2V0LCBmYWN0b3J5LCBjb250ZXh0KSB7XG4gICAgICAgIFByaXZhdGUuZmFjdG9yeVByb3BlcnR5LnNldCh3aWRnZXQsIGZhY3RvcnkpO1xuICAgICAgICAvLyBIYW5kbGUgd2lkZ2V0IGV4dGVuc2lvbnMuXG4gICAgICAgIGNvbnN0IGRpc3Bvc2FibGVzID0gbmV3IERpc3Bvc2FibGVTZXQoKTtcbiAgICAgICAgZWFjaCh0aGlzLl9yZWdpc3RyeS53aWRnZXRFeHRlbnNpb25zKGZhY3RvcnkubmFtZSksIGV4dGVuZGVyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRpc3Bvc2FibGUgPSBleHRlbmRlci5jcmVhdGVOZXcod2lkZ2V0LCBjb250ZXh0KTtcbiAgICAgICAgICAgIGlmIChkaXNwb3NhYmxlKSB7XG4gICAgICAgICAgICAgICAgZGlzcG9zYWJsZXMuYWRkKGRpc3Bvc2FibGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgUHJpdmF0ZS5kaXNwb3NhYmxlc1Byb3BlcnR5LnNldCh3aWRnZXQsIGRpc3Bvc2FibGVzKTtcbiAgICAgICAgd2lkZ2V0LmRpc3Bvc2VkLmNvbm5lY3QodGhpcy5fb25XaWRnZXREaXNwb3NlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuYWRvcHRXaWRnZXQoY29udGV4dCwgd2lkZ2V0KTtcbiAgICAgICAgY29udGV4dC5maWxlQ2hhbmdlZC5jb25uZWN0KHRoaXMuX29uRmlsZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICBjb250ZXh0LnBhdGhDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25QYXRoQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIHZvaWQgY29udGV4dC5yZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHZvaWQgdGhpcy5zZXRDYXB0aW9uKHdpZGdldCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnN0YWxsIHRoZSBtZXNzYWdlIGhvb2sgZm9yIHRoZSB3aWRnZXQgYW5kIGFkZCB0byBsaXN0XG4gICAgICogb2Yga25vd24gd2lkZ2V0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZXh0IC0gVGhlIGRvY3VtZW50IGNvbnRleHQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldCAtIFRoZSB3aWRnZXQgdG8gYWRvcHQuXG4gICAgICovXG4gICAgYWRvcHRXaWRnZXQoY29udGV4dCwgd2lkZ2V0KSB7XG4gICAgICAgIGNvbnN0IHdpZGdldHMgPSBQcml2YXRlLndpZGdldHNQcm9wZXJ0eS5nZXQoY29udGV4dCk7XG4gICAgICAgIHdpZGdldHMucHVzaCh3aWRnZXQpO1xuICAgICAgICBNZXNzYWdlTG9vcC5pbnN0YWxsTWVzc2FnZUhvb2sod2lkZ2V0LCB0aGlzKTtcbiAgICAgICAgd2lkZ2V0LmFkZENsYXNzKERPQ1VNRU5UX0NMQVNTKTtcbiAgICAgICAgd2lkZ2V0LnRpdGxlLmNsb3NhYmxlID0gdHJ1ZTtcbiAgICAgICAgd2lkZ2V0LmRpc3Bvc2VkLmNvbm5lY3QodGhpcy5fd2lkZ2V0RGlzcG9zZWQsIHRoaXMpO1xuICAgICAgICBQcml2YXRlLmNvbnRleHRQcm9wZXJ0eS5zZXQod2lkZ2V0LCBjb250ZXh0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VlIGlmIGEgd2lkZ2V0IGFscmVhZHkgZXhpc3RzIGZvciB0aGUgZ2l2ZW4gY29udGV4dCBhbmQgd2lkZ2V0IG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29udGV4dCAtIFRoZSBkb2N1bWVudCBjb250ZXh0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBmb3VuZCB3aWRnZXQsIG9yIGB1bmRlZmluZWRgLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gdXNlIGFuIGV4aXN0aW5nIHdpZGdldCBpbnN0ZWFkIG9mIG9wZW5pbmdcbiAgICAgKiBhIG5ldyB3aWRnZXQuXG4gICAgICovXG4gICAgZmluZFdpZGdldChjb250ZXh0LCB3aWRnZXROYW1lKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldHMgPSBQcml2YXRlLndpZGdldHNQcm9wZXJ0eS5nZXQoY29udGV4dCk7XG4gICAgICAgIGlmICghd2lkZ2V0cykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmluZCh3aWRnZXRzLCB3aWRnZXQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmFjdG9yeSA9IFByaXZhdGUuZmFjdG9yeVByb3BlcnR5LmdldCh3aWRnZXQpO1xuICAgICAgICAgICAgaWYgKCFmYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhY3RvcnkubmFtZSA9PT0gd2lkZ2V0TmFtZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZG9jdW1lbnQgY29udGV4dCBmb3IgYSB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHdpZGdldCBvZiBpbnRlcmVzdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBjb250ZXh0IGFzc29jaWF0ZWQgd2l0aCB0aGUgd2lkZ2V0LCBvciBgdW5kZWZpbmVkYC5cbiAgICAgKi9cbiAgICBjb250ZXh0Rm9yV2lkZ2V0KHdpZGdldCkge1xuICAgICAgICByZXR1cm4gUHJpdmF0ZS5jb250ZXh0UHJvcGVydHkuZ2V0KHdpZGdldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb25lIGEgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldCAtIFRoZSBzb3VyY2Ugd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgd2lkZ2V0IG9yIGB1bmRlZmluZWRgLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqICBVc2VzIHRoZSBzYW1lIHdpZGdldCBmYWN0b3J5IGFuZCBjb250ZXh0IGFzIHRoZSBzb3VyY2UsIG9yIHRocm93c1xuICAgICAqICBpZiB0aGUgc291cmNlIHdpZGdldCBpcyBub3QgbWFuYWdlZCBieSB0aGlzIG1hbmFnZXIuXG4gICAgICovXG4gICAgY2xvbmVXaWRnZXQod2lkZ2V0KSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSBQcml2YXRlLmNvbnRleHRQcm9wZXJ0eS5nZXQod2lkZ2V0KTtcbiAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSBQcml2YXRlLmZhY3RvcnlQcm9wZXJ0eS5nZXQod2lkZ2V0KTtcbiAgICAgICAgaWYgKCFmYWN0b3J5KSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld1dpZGdldCA9IGZhY3RvcnkuY3JlYXRlTmV3KGNvbnRleHQsIHdpZGdldCk7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVXaWRnZXQobmV3V2lkZ2V0LCBmYWN0b3J5LCBjb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIG5ld1dpZGdldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2UgdGhlIHdpZGdldHMgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gY29udGV4dC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZXh0IC0gVGhlIGRvY3VtZW50IGNvbnRleHQgb2JqZWN0LlxuICAgICAqL1xuICAgIGNsb3NlV2lkZ2V0cyhjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHdpZGdldHMgPSBQcml2YXRlLndpZGdldHNQcm9wZXJ0eS5nZXQoY29udGV4dCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbCh0b0FycmF5KG1hcCh3aWRnZXRzLCB3aWRnZXQgPT4gdGhpcy5vbkNsb3NlKHdpZGdldCkpKSkudGhlbigoKSA9PiB1bmRlZmluZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSB3aWRnZXRzIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIGNvbnRleHRcbiAgICAgKiByZWdhcmRsZXNzIG9mIHRoZSB3aWRnZXQncyBkaXJ0eSBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZXh0IC0gVGhlIGRvY3VtZW50IGNvbnRleHQgb2JqZWN0LlxuICAgICAqL1xuICAgIGRlbGV0ZVdpZGdldHMoY29udGV4dCkge1xuICAgICAgICBjb25zdCB3aWRnZXRzID0gUHJpdmF0ZS53aWRnZXRzUHJvcGVydHkuZ2V0KGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwodG9BcnJheShtYXAod2lkZ2V0cywgd2lkZ2V0ID0+IHRoaXMub25EZWxldGUod2lkZ2V0KSkpKS50aGVuKCgpID0+IHVuZGVmaW5lZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbHRlciBhIG1lc3NhZ2Ugc2VudCB0byBhIG1lc3NhZ2UgaGFuZGxlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBoYW5kbGVyIC0gVGhlIHRhcmdldCBoYW5kbGVyIG9mIHRoZSBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1zZyAtIFRoZSBtZXNzYWdlIGRpc3BhdGNoZWQgdG8gdGhlIGhhbmRsZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBgZmFsc2VgIGlmIHRoZSBtZXNzYWdlIHNob3VsZCBiZSBmaWx0ZXJlZCwgb2YgYHRydWVgXG4gICAgICogICBpZiB0aGUgbWVzc2FnZSBzaG91bGQgYmUgZGlzcGF0Y2hlZCB0byB0aGUgaGFuZGxlciBhcyBub3JtYWwuXG4gICAgICovXG4gICAgbWVzc2FnZUhvb2soaGFuZGxlciwgbXNnKSB7XG4gICAgICAgIHN3aXRjaCAobXNnLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Nsb3NlLXJlcXVlc3QnOlxuICAgICAgICAgICAgICAgIHZvaWQgdGhpcy5vbkNsb3NlKGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNhc2UgJ2FjdGl2YXRlLXJlcXVlc3QnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dEZvcldpZGdldChoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmF0ZVJlcXVlc3RlZC5lbWl0KGNvbnRleHQucGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjYXB0aW9uIGZvciB3aWRnZXQgdGl0bGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHRhcmdldCB3aWRnZXQuXG4gICAgICovXG4gICAgYXN5bmMgc2V0Q2FwdGlvbih3aWRnZXQpIHtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gUHJpdmF0ZS5jb250ZXh0UHJvcGVydHkuZ2V0KHdpZGdldCk7XG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vZGVsID0gY29udGV4dC5jb250ZW50c01vZGVsO1xuICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgICB3aWRnZXQudGl0bGUuY2FwdGlvbiA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250ZXh0XG4gICAgICAgICAgICAubGlzdENoZWNrcG9pbnRzKClcbiAgICAgICAgICAgIC50aGVuKChjaGVja3BvaW50cykgPT4ge1xuICAgICAgICAgICAgaWYgKHdpZGdldC5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbGFzdCA9IGNoZWNrcG9pbnRzW2NoZWNrcG9pbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgY29uc3QgY2hlY2twb2ludCA9IGxhc3QgPyBUaW1lLmZvcm1hdChsYXN0Lmxhc3RfbW9kaWZpZWQpIDogJ05vbmUnO1xuICAgICAgICAgICAgbGV0IGNhcHRpb24gPSB0cmFucy5fXygnTmFtZTogJTFcXG5QYXRoOiAlMlxcbicsIG1vZGVsLm5hbWUsIG1vZGVsLnBhdGgpO1xuICAgICAgICAgICAgaWYgKGNvbnRleHQubW9kZWwucmVhZE9ubHkpIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uICs9IHRyYW5zLl9fKCdSZWFkLW9ubHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhcHRpb24gKz1cbiAgICAgICAgICAgICAgICAgICAgdHJhbnMuX18oJ0xhc3QgU2F2ZWQ6ICUxXFxuJywgVGltZS5mb3JtYXQobW9kZWwubGFzdF9tb2RpZmllZCkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zLl9fKCdMYXN0IENoZWNrcG9pbnQ6ICUxJywgY2hlY2twb2ludCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aWRnZXQudGl0bGUuY2FwdGlvbiA9IGNhcHRpb247XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYCdjbG9zZS1yZXF1ZXN0J2AgbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHRhcmdldCB3aWRnZXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHdoZXRoZXIgdGhlIHdpZGdldCB3YXMgY2xvc2VkLlxuICAgICAqL1xuICAgIGFzeW5jIG9uQ2xvc2Uod2lkZ2V0KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gSGFuZGxlIGRpcnR5IHN0YXRlLlxuICAgICAgICBjb25zdCBbc2hvdWxkQ2xvc2UsIGlnbm9yZVNhdmVdID0gYXdhaXQgdGhpcy5fbWF5YmVDbG9zZSh3aWRnZXQsIHRoaXMudHJhbnNsYXRvcik7XG4gICAgICAgIGlmICh3aWRnZXQuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNob3VsZENsb3NlKSB7XG4gICAgICAgICAgICBpZiAoIWlnbm9yZVNhdmUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gUHJpdmF0ZS5jb250ZXh0UHJvcGVydHkuZ2V0KHdpZGdldCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKF9hID0gY29udGV4dC5jb250ZW50c01vZGVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eud3JpdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBjb250ZXh0LnNhdmVBcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3aWRnZXQuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkZ2V0LmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2hvdWxkQ2xvc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2Ygd2lkZ2V0IHJlZ2FyZGxlc3Mgb2Ygd2lkZ2V0J3MgZGlydHkgc3RhdGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0IC0gVGhlIHRhcmdldCB3aWRnZXQuXG4gICAgICovXG4gICAgb25EZWxldGUod2lkZ2V0KSB7XG4gICAgICAgIHdpZGdldC5kaXNwb3NlKCk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodm9pZCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXNrIHRoZSB1c2VyIHdoZXRoZXIgdG8gY2xvc2UgYW4gdW5zYXZlZCBmaWxlLlxuICAgICAqL1xuICAgIF9tYXliZUNsb3NlKHdpZGdldCwgdHJhbnNsYXRvcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAvLyBCYWlsIGlmIHRoZSBtb2RlbCBpcyBub3QgZGlydHkgb3Igb3RoZXIgd2lkZ2V0cyBhcmUgdXNpbmcgdGhlIG1vZGVsLilcbiAgICAgICAgY29uc3QgY29udGV4dCA9IFByaXZhdGUuY29udGV4dFByb3BlcnR5LmdldCh3aWRnZXQpO1xuICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW3RydWUsIHRydWVdKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgd2lkZ2V0cyA9IFByaXZhdGUud2lkZ2V0c1Byb3BlcnR5LmdldChjb250ZXh0KTtcbiAgICAgICAgaWYgKCF3aWRnZXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFt0cnVlLCB0cnVlXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRmlsdGVyIGJ5IHdoZXRoZXIgdGhlIGZhY3RvcmllcyBhcmUgcmVhZCBvbmx5LlxuICAgICAgICB3aWRnZXRzID0gdG9BcnJheShmaWx0ZXIod2lkZ2V0cywgd2lkZ2V0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZhY3RvcnkgPSBQcml2YXRlLmZhY3RvcnlQcm9wZXJ0eS5nZXQod2lkZ2V0KTtcbiAgICAgICAgICAgIGlmICghZmFjdG9yeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWN0b3J5LnJlYWRPbmx5ID09PSBmYWxzZTtcbiAgICAgICAgfSkpO1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gUHJpdmF0ZS5mYWN0b3J5UHJvcGVydHkuZ2V0KHdpZGdldCk7XG4gICAgICAgIGlmICghZmFjdG9yeSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbdHJ1ZSwgdHJ1ZV0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vZGVsID0gY29udGV4dC5tb2RlbDtcbiAgICAgICAgaWYgKCFtb2RlbC5kaXJ0eSB8fCB3aWRnZXRzLmxlbmd0aCA+IDEgfHwgZmFjdG9yeS5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbdHJ1ZSwgdHJ1ZV0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gd2lkZ2V0LnRpdGxlLmxhYmVsO1xuICAgICAgICBjb25zdCBzYXZlTGFiZWwgPSAoKF9hID0gY29udGV4dC5jb250ZW50c01vZGVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eud3JpdGFibGUpID8gdHJhbnMuX18oJ1NhdmUnKVxuICAgICAgICAgICAgOiB0cmFucy5fXygnU2F2ZSBhcycpO1xuICAgICAgICByZXR1cm4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICB0aXRsZTogdHJhbnMuX18oJ1NhdmUgeW91ciB3b3JrJyksXG4gICAgICAgICAgICBib2R5OiB0cmFucy5fXygnU2F2ZSBjaGFuZ2VzIGluIFwiJTFcIiBiZWZvcmUgY2xvc2luZz8nLCBmaWxlTmFtZSksXG4gICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgRGlhbG9nLmNhbmNlbEJ1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnQ2FuY2VsJykgfSksXG4gICAgICAgICAgICAgICAgRGlhbG9nLndhcm5CdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ0Rpc2NhcmQnKSB9KSxcbiAgICAgICAgICAgICAgICBEaWFsb2cub2tCdXR0b24oeyBsYWJlbDogc2F2ZUxhYmVsIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBbcmVzdWx0LmJ1dHRvbi5hY2NlcHQsIHJlc3VsdC5idXR0b24uZGlzcGxheVR5cGUgPT09ICd3YXJuJ107XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGRpc3Bvc2FsIG9mIGEgd2lkZ2V0LlxuICAgICAqL1xuICAgIF93aWRnZXREaXNwb3NlZCh3aWRnZXQpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IFByaXZhdGUuY29udGV4dFByb3BlcnR5LmdldCh3aWRnZXQpO1xuICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3aWRnZXRzID0gUHJpdmF0ZS53aWRnZXRzUHJvcGVydHkuZ2V0KGNvbnRleHQpO1xuICAgICAgICBpZiAoIXdpZGdldHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZW1vdmUgdGhlIHdpZGdldC5cbiAgICAgICAgQXJyYXlFeHQucmVtb3ZlRmlyc3RPZih3aWRnZXRzLCB3aWRnZXQpO1xuICAgICAgICAvLyBEaXNwb3NlIG9mIHRoZSBjb250ZXh0IGlmIHRoaXMgaXMgdGhlIGxhc3Qgd2lkZ2V0IHVzaW5nIGl0LlxuICAgICAgICBpZiAoIXdpZGdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb250ZXh0LmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGRpc3Bvc2FsIG9mIGEgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9vbldpZGdldERpc3Bvc2VkKHdpZGdldCkge1xuICAgICAgICBjb25zdCBkaXNwb3NhYmxlcyA9IFByaXZhdGUuZGlzcG9zYWJsZXNQcm9wZXJ0eS5nZXQod2lkZ2V0KTtcbiAgICAgICAgZGlzcG9zYWJsZXMuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBmaWxlIGNoYW5nZWQgc2lnbmFsIGZvciBhIGNvbnRleHQuXG4gICAgICovXG4gICAgX29uRmlsZUNoYW5nZWQoY29udGV4dCkge1xuICAgICAgICBjb25zdCB3aWRnZXRzID0gUHJpdmF0ZS53aWRnZXRzUHJvcGVydHkuZ2V0KGNvbnRleHQpO1xuICAgICAgICBlYWNoKHdpZGdldHMsIHdpZGdldCA9PiB7XG4gICAgICAgICAgICB2b2lkIHRoaXMuc2V0Q2FwdGlvbih3aWRnZXQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgcGF0aCBjaGFuZ2VkIHNpZ25hbCBmb3IgYSBjb250ZXh0LlxuICAgICAqL1xuICAgIF9vblBhdGhDaGFuZ2VkKGNvbnRleHQpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0cyA9IFByaXZhdGUud2lkZ2V0c1Byb3BlcnR5LmdldChjb250ZXh0KTtcbiAgICAgICAgZWFjaCh3aWRnZXRzLCB3aWRnZXQgPT4ge1xuICAgICAgICAgICAgdm9pZCB0aGlzLnNldENhcHRpb24od2lkZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBBIHByaXZhdGUgbmFtZXNwYWNlIGZvciBEb2N1bWVudE1hbmFnZXIgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBBIHByaXZhdGUgYXR0YWNoZWQgcHJvcGVydHkgZm9yIGEgd2lkZ2V0IGNvbnRleHQuXG4gICAgICovXG4gICAgUHJpdmF0ZS5jb250ZXh0UHJvcGVydHkgPSBuZXcgQXR0YWNoZWRQcm9wZXJ0eSh7XG4gICAgICAgIG5hbWU6ICdjb250ZXh0JyxcbiAgICAgICAgY3JlYXRlOiAoKSA9PiB1bmRlZmluZWRcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBBIHByaXZhdGUgYXR0YWNoZWQgcHJvcGVydHkgZm9yIGEgd2lkZ2V0IGZhY3RvcnkuXG4gICAgICovXG4gICAgUHJpdmF0ZS5mYWN0b3J5UHJvcGVydHkgPSBuZXcgQXR0YWNoZWRQcm9wZXJ0eSh7XG4gICAgICAgIG5hbWU6ICdmYWN0b3J5JyxcbiAgICAgICAgY3JlYXRlOiAoKSA9PiB1bmRlZmluZWRcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBBIHByaXZhdGUgYXR0YWNoZWQgcHJvcGVydHkgZm9yIHRoZSB3aWRnZXRzIGFzc29jaWF0ZWQgd2l0aCBhIGNvbnRleHQuXG4gICAgICovXG4gICAgUHJpdmF0ZS53aWRnZXRzUHJvcGVydHkgPSBuZXcgQXR0YWNoZWRQcm9wZXJ0eSh7XG4gICAgICAgIG5hbWU6ICd3aWRnZXRzJyxcbiAgICAgICAgY3JlYXRlOiAoKSA9PiBbXVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIEEgcHJpdmF0ZSBhdHRhY2hlZCBwcm9wZXJ0eSBmb3IgYSB3aWRnZXQncyBkaXNwb3NhYmxlcy5cbiAgICAgKi9cbiAgICBQcml2YXRlLmRpc3Bvc2FibGVzUHJvcGVydHkgPSBuZXcgQXR0YWNoZWRQcm9wZXJ0eSh7XG4gICAgICAgIG5hbWU6ICdkaXNwb3NhYmxlcycsXG4gICAgICAgIGNyZWF0ZTogKCkgPT4gbmV3IERpc3Bvc2FibGVTZXQoKVxuICAgIH0pO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13aWRnZXRtYW5hZ2VyLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=