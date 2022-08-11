(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_docregistry_lib_index_js"],{

/***/ "../../packages/docregistry/lib/context.js":
/*!*************************************************!*\
  !*** ../../packages/docregistry/lib/context.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Context": () => (/* binding */ Context)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/docprovider */ "webpack/sharing/consume/default/@jupyterlab/docprovider/@jupyterlab/docprovider");
/* harmony import */ var _jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_8__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.









/**
 * An implementation of a document context.
 *
 * This class is typically instantiated by the document manager.
 */
class Context {
    /**
     * Construct a new document context.
     */
    constructor(options) {
        this._path = '';
        this._lineEnding = null;
        this._contentsModel = null;
        this._populatedPromise = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.PromiseDelegate();
        this._isPopulated = false;
        this._isReady = false;
        this._isDisposed = false;
        this._pathChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this._fileChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this._saveState = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this._disposed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this._lastModifiedCheckMargin = 500;
        this._timeConflictModalIsOpen = false;
        const manager = (this._manager = options.manager);
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this._factory = options.factory;
        this._dialogs = options.sessionDialogs || _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.sessionContextDialogs;
        this._opener = options.opener || Private.noOp;
        this._path = this._manager.contents.normalize(options.path);
        this._lastModifiedCheckMargin = options.lastModifiedCheckMargin || 500;
        const localPath = this._manager.contents.localPath(this._path);
        const lang = this._factory.preferredLanguage(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(localPath));
        const dbFactory = options.modelDBFactory;
        if (dbFactory) {
            const localPath = manager.contents.localPath(this._path);
            this._modelDB = dbFactory.createNew(localPath);
            this._model = this._factory.createNew(lang, this._modelDB, false);
        }
        else {
            this._model = this._factory.createNew(lang, undefined, false);
        }
        const ymodel = this._model.sharedModel; // translate to the concrete Yjs implementation
        const ydoc = ymodel.ydoc;
        this._ydoc = ydoc;
        this._ycontext = ydoc.getMap('context');
        const docProviderFactory = options.docProviderFactory;
        this._provider = docProviderFactory
            ? docProviderFactory({
                path: this._path,
                contentType: this._factory.contentType,
                ymodel
            })
            : new _jupyterlab_docprovider__WEBPACK_IMPORTED_MODULE_2__.ProviderMock();
        this._readyPromise = manager.ready.then(() => {
            return this._populatedPromise.promise;
        });
        const ext = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.extname(this._path);
        this.sessionContext = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.SessionContext({
            sessionManager: manager.sessions,
            specsManager: manager.kernelspecs,
            path: this._path,
            type: ext === '.ipynb' ? 'notebook' : 'file',
            name: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(localPath),
            kernelPreference: options.kernelPreference || { shouldStart: false },
            setBusy: options.setBusy
        });
        this.sessionContext.propertyChanged.connect(this._onSessionChanged, this);
        manager.contents.fileChanged.connect(this._onFileChanged, this);
        const urlResolver = (this.urlResolver = new _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_3__.RenderMimeRegistry.UrlResolver({
            path: this._path,
            contents: manager.contents
        }));
        this._ycontext.set('path', this._path);
        this._ycontext.observe(event => {
            var _a;
            const pathChanged = event.changes.keys.get('path');
            if (pathChanged) {
                const newPath = this._ycontext.get('path');
                if (newPath && newPath !== pathChanged.oldValue) {
                    urlResolver.path = newPath;
                    this._path = newPath;
                    this._provider.setPath(newPath);
                    this._pathChanged.emit(this.path);
                    (_a = this.sessionContext.session) === null || _a === void 0 ? void 0 : _a.setPath(newPath);
                }
            }
        });
    }
    /**
     * A signal emitted when the path changes.
     */
    get pathChanged() {
        return this._pathChanged;
    }
    /**
     * A signal emitted when the model is saved or reverted.
     */
    get fileChanged() {
        return this._fileChanged;
    }
    /**
     * A signal emitted on the start and end of a saving operation.
     */
    get saveState() {
        return this._saveState;
    }
    /**
     * A signal emitted when the context is disposed.
     */
    get disposed() {
        return this._disposed;
    }
    /**
     * Configurable margin used to detect document modification conflicts, in milliseconds
     */
    get lastModifiedCheckMargin() {
        return this._lastModifiedCheckMargin;
    }
    set lastModifiedCheckMargin(value) {
        this._lastModifiedCheckMargin = value;
    }
    /**
     * Get the model associated with the document.
     */
    get model() {
        return this._model;
    }
    /**
     * The current path associated with the document.
     */
    get path() {
        return this._path;
    }
    /**
     * The current local path associated with the document.
     * If the document is in the default notebook file browser,
     * this is the same as the path.
     */
    get localPath() {
        return this._manager.contents.localPath(this._path);
    }
    /**
     * The current contents model associated with the document.
     *
     * #### Notes
     * The contents model will be null until the context is populated.
     * It will have an  empty `contents` field.
     */
    get contentsModel() {
        return this._contentsModel;
    }
    /**
     * Get the model factory name.
     *
     * #### Notes
     * This is not part of the `IContext` API.
     */
    get factoryName() {
        return this.isDisposed ? '' : this._factory.name;
    }
    /**
     * Test whether the context is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the context.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        this.sessionContext.dispose();
        if (this._modelDB) {
            this._modelDB.dispose();
        }
        this._model.dispose();
        this._provider.destroy();
        this._model.sharedModel.dispose();
        this._ydoc.destroy();
        this._disposed.emit(void 0);
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal.clearData(this);
    }
    /**
     * Whether the context is ready.
     */
    get isReady() {
        return this._isReady;
    }
    /**
     * A promise that is fulfilled when the context is ready.
     */
    get ready() {
        return this._readyPromise;
    }
    /**
     * Initialize the context.
     *
     * @param isNew - Whether it is a new file.
     *
     * @returns a promise that resolves upon initialization.
     */
    async initialize(isNew) {
        const lock = await this._provider.acquireLock();
        const contentIsInitialized = await this._provider.requestInitialContent();
        let promise;
        if (isNew || contentIsInitialized) {
            promise = this._save();
        }
        else {
            promise = this._revert();
        }
        // make sure that the lock is released after the above operations are completed.
        const finally_ = () => {
            this._provider.releaseLock(lock);
        };
        // if save/revert completed successfully, we set the initialized content in the rtc server.
        promise
            .then(() => {
            this._provider.putInitializedState();
            this._model.initialize();
        })
            .then(finally_, finally_);
        return promise;
    }
    /**
     * Rename the document.
     *
     * @param newName - the new name for the document.
     */
    rename(newName) {
        return this.ready.then(() => {
            return this._manager.ready.then(() => {
                return this._rename(newName);
            });
        });
    }
    /**
     * Save the document contents to disk.
     */
    async save() {
        const [lock] = await Promise.all([
            this._provider.acquireLock(),
            this.ready
        ]);
        let promise;
        promise = this._save();
        // if save completed successfully, we set the initialized content in the rtc server.
        promise = promise.then(() => {
            this._provider.putInitializedState();
        });
        const finally_ = () => {
            this._provider.releaseLock(lock);
        };
        promise.then(finally_, finally_);
        return await promise;
    }
    /**
     * Save the document to a different path chosen by the user.
     */
    saveAs() {
        return this.ready
            .then(() => {
            return Private.getSavePath(this._path);
        })
            .then(newPath => {
            if (this.isDisposed || !newPath) {
                return;
            }
            if (newPath === this._path) {
                return this.save();
            }
            // Make sure the path does not exist.
            return this._manager.ready
                .then(() => {
                return this._manager.contents.get(newPath);
            })
                .then(() => {
                return this._maybeOverWrite(newPath);
            })
                .catch(err => {
                if (!err.response || err.response.status !== 404) {
                    throw err;
                }
                return this._finishSaveAs(newPath);
            });
        });
    }
    /**
     * Download a file.
     *
     * @param path - The path of the file to be downloaded.
     *
     * @returns A promise which resolves when the file has begun
     *   downloading.
     */
    async download() {
        const url = await this._manager.contents.getDownloadUrl(this._path);
        const element = document.createElement('a');
        element.href = url;
        element.download = '';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        return void 0;
    }
    /**
     * Revert the document contents to disk contents.
     */
    async revert() {
        const [lock] = await Promise.all([
            this._provider.acquireLock(),
            this.ready
        ]);
        const promise = this._revert();
        const finally_ = () => {
            this._provider.releaseLock(lock);
        };
        promise.then(finally_, finally_);
        return await promise;
    }
    /**
     * Create a checkpoint for the file.
     */
    createCheckpoint() {
        const contents = this._manager.contents;
        return this._manager.ready.then(() => {
            return contents.createCheckpoint(this._path);
        });
    }
    /**
     * Delete a checkpoint for the file.
     */
    deleteCheckpoint(checkpointId) {
        const contents = this._manager.contents;
        return this._manager.ready.then(() => {
            return contents.deleteCheckpoint(this._path, checkpointId);
        });
    }
    /**
     * Restore the file to a known checkpoint state.
     */
    restoreCheckpoint(checkpointId) {
        const contents = this._manager.contents;
        const path = this._path;
        return this._manager.ready.then(() => {
            if (checkpointId) {
                return contents.restoreCheckpoint(path, checkpointId);
            }
            return this.listCheckpoints().then(checkpoints => {
                if (this.isDisposed || !checkpoints.length) {
                    return;
                }
                checkpointId = checkpoints[checkpoints.length - 1].id;
                return contents.restoreCheckpoint(path, checkpointId);
            });
        });
    }
    /**
     * List available checkpoints for a file.
     */
    listCheckpoints() {
        const contents = this._manager.contents;
        return this._manager.ready.then(() => {
            return contents.listCheckpoints(this._path);
        });
    }
    /**
     * Add a sibling widget to the document manager.
     *
     * @param widget - The widget to add to the document manager.
     *
     * @param options - The desired options for adding the sibling.
     *
     * @returns A disposable used to remove the sibling if desired.
     *
     * #### Notes
     * It is assumed that the widget has the same model and context
     * as the original widget.
     */
    addSibling(widget, options = {}) {
        const opener = this._opener;
        if (opener) {
            opener(widget, options);
        }
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_6__.DisposableDelegate(() => {
            widget.close();
        });
    }
    /**
     * Handle a change on the contents manager.
     */
    _onFileChanged(sender, change) {
        var _a, _b, _c;
        if (change.type !== 'rename') {
            return;
        }
        let oldPath = change.oldValue && change.oldValue.path;
        let newPath = change.newValue && change.newValue.path;
        if (newPath && this._path.indexOf(oldPath || '') === 0) {
            let changeModel = change.newValue;
            // When folder name changed, `oldPath` is `foo`, `newPath` is `bar` and `this._path` is `foo/test`,
            // we should update `foo/test` to `bar/test` as well
            if (oldPath !== this._path) {
                newPath = this._path.replace(new RegExp(`^${oldPath}/`), `${newPath}/`);
                oldPath = this._path;
                // Update client file model from folder change
                changeModel = {
                    last_modified: (_a = change.newValue) === null || _a === void 0 ? void 0 : _a.created,
                    path: newPath
                };
            }
            this._path = newPath;
            void ((_b = this.sessionContext.session) === null || _b === void 0 ? void 0 : _b.setPath(newPath));
            const updateModel = Object.assign(Object.assign({}, this._contentsModel), changeModel);
            const localPath = this._manager.contents.localPath(newPath);
            void ((_c = this.sessionContext.session) === null || _c === void 0 ? void 0 : _c.setName(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(localPath)));
            this._updateContentsModel(updateModel);
            this._ycontext.set('path', this._path);
        }
    }
    /**
     * Handle a change to a session property.
     */
    _onSessionChanged(sender, type) {
        if (type !== 'path') {
            return;
        }
        const path = this.sessionContext.session.path;
        if (path !== this._path) {
            this._path = path;
            this._ycontext.set('path', this._path);
        }
    }
    /**
     * Update our contents model, without the content.
     */
    _updateContentsModel(model) {
        const newModel = {
            path: model.path,
            name: model.name,
            type: model.type,
            content: undefined,
            writable: model.writable,
            created: model.created,
            last_modified: model.last_modified,
            mimetype: model.mimetype,
            format: model.format
        };
        const mod = this._contentsModel ? this._contentsModel.last_modified : null;
        this._contentsModel = newModel;
        this._ycontext.set('last_modified', newModel.last_modified);
        if (!mod || newModel.last_modified !== mod) {
            this._fileChanged.emit(newModel);
        }
    }
    /**
     * Handle an initial population.
     */
    _populate() {
        this._isPopulated = true;
        this._isReady = true;
        this._populatedPromise.resolve(void 0);
        // Add a checkpoint if none exists and the file is writable.
        return this._maybeCheckpoint(false).then(() => {
            if (this.isDisposed) {
                return;
            }
            // Update the kernel preference.
            const name = this._model.defaultKernelName ||
                this.sessionContext.kernelPreference.name;
            this.sessionContext.kernelPreference = Object.assign(Object.assign({}, this.sessionContext.kernelPreference), { name, language: this._model.defaultKernelLanguage });
            // Note: we don't wait on the session to initialize
            // so that the user can be shown the content before
            // any kernel has started.
            void this.sessionContext.initialize().then(shouldSelect => {
                if (shouldSelect) {
                    void this._dialogs.selectKernel(this.sessionContext, this.translator);
                }
            });
        });
    }
    /**
     * Rename the document.
     *
     * @param newName - the new name for the document.
     */
    async _rename(newName) {
        var _a, _b;
        const splitPath = this.path.split('/');
        splitPath[splitPath.length - 1] = newName;
        const newPath = splitPath.join('/');
        await this._manager.contents.rename(this.path, newPath);
        await ((_a = this.sessionContext.session) === null || _a === void 0 ? void 0 : _a.setPath(newPath));
        await ((_b = this.sessionContext.session) === null || _b === void 0 ? void 0 : _b.setName(newName));
        this._path = newPath;
        this._ycontext.set('path', this._path);
    }
    /**
     * Save the document contents to disk.
     */
    async _save() {
        this._saveState.emit('started');
        const model = this._model;
        let content;
        if (this._factory.fileFormat === 'json') {
            content = model.toJSON();
        }
        else {
            content = model.toString();
            if (this._lineEnding) {
                content = content.replace(/\n/g, this._lineEnding);
            }
        }
        const options = {
            type: this._factory.contentType,
            format: this._factory.fileFormat,
            content
        };
        try {
            let value;
            await this._manager.ready;
            if (!model.modelDB.isCollaborative) {
                value = await this._maybeSave(options);
            }
            else {
                value = await this._manager.contents.save(this._path, options);
            }
            if (this.isDisposed) {
                return;
            }
            model.dirty = false;
            this._updateContentsModel(value);
            if (!this._isPopulated) {
                await this._populate();
            }
            // Emit completion.
            this._saveState.emit('completed');
        }
        catch (err) {
            // If the save has been canceled by the user,
            // throw the error so that whoever called save()
            // can decide what to do.
            if (err.message === 'Cancel' ||
                err.message === 'Modal is already displayed') {
                throw err;
            }
            // Otherwise show an error message and throw the error.
            const localPath = this._manager.contents.localPath(this._path);
            const name = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(localPath);
            void this._handleError(err, this._trans.__('File Save Error for %1', name));
            // Emit failure.
            this._saveState.emit('failed');
            throw err;
        }
    }
    /**
     * Revert the document contents to disk contents.
     *
     * @param initializeModel - call the model's initialization function after
     * deserializing the content.
     */
    _revert(initializeModel = false) {
        const opts = Object.assign({ type: this._factory.contentType, content: this._factory.fileFormat !== null }, (this._factory.fileFormat !== null
            ? { format: this._factory.fileFormat }
            : {}));
        const path = this._path;
        const model = this._model;
        return this._manager.ready
            .then(() => {
            return this._manager.contents.get(path, opts);
        })
            .then(contents => {
            if (this.isDisposed) {
                return;
            }
            if (contents.format === 'json') {
                model.fromJSON(contents.content);
                if (initializeModel) {
                    model.initialize();
                }
            }
            else {
                let content = contents.content;
                // Convert line endings if necessary, marking the file
                // as dirty.
                if (content.indexOf('\r\n') !== -1) {
                    this._lineEnding = '\r\n';
                    content = content.replace(/\r\n/g, '\n');
                }
                else if (content.indexOf('\r') !== -1) {
                    this._lineEnding = '\r';
                    content = content.replace(/\r/g, '\n');
                }
                else {
                    this._lineEnding = null;
                }
                model.fromString(content);
                if (initializeModel) {
                    model.initialize();
                }
            }
            this._updateContentsModel(contents);
            model.dirty = false;
            if (!this._isPopulated) {
                return this._populate();
            }
        })
            .catch(async (err) => {
            const localPath = this._manager.contents.localPath(this._path);
            const name = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(localPath);
            void this._handleError(err, this._trans.__('File Load Error for %1', name));
            throw err;
        });
    }
    /**
     * Save a file, dealing with conflicts.
     */
    _maybeSave(options) {
        const path = this._path;
        // Make sure the file has not changed on disk.
        const promise = this._manager.contents.get(path, { content: false });
        return promise.then(model => {
            var _a;
            if (this.isDisposed) {
                return Promise.reject(new Error('Disposed'));
            }
            // We want to check last_modified (disk) > last_modified (client)
            // (our last save)
            // In some cases the filesystem reports an inconsistent time, so we allow buffer when comparing.
            const lastModifiedCheckMargin = this._lastModifiedCheckMargin;
            const ycontextModified = this._ycontext.get('last_modified');
            // prefer using the timestamp from ycontext because it is more up to date
            const modified = ycontextModified || ((_a = this.contentsModel) === null || _a === void 0 ? void 0 : _a.last_modified);
            const tClient = modified ? new Date(modified) : new Date();
            const tDisk = new Date(model.last_modified);
            if (modified &&
                tDisk.getTime() - tClient.getTime() > lastModifiedCheckMargin) {
                return this._timeConflict(tClient, model, options);
            }
            return this._manager.contents.save(path, options);
        }, err => {
            if (err.response && err.response.status === 404) {
                return this._manager.contents.save(path, options);
            }
            throw err;
        });
    }
    /**
     * Handle a save/load error with a dialog.
     */
    async _handleError(err, title) {
        await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(title, err);
        return;
    }
    /**
     * Add a checkpoint the file is writable.
     */
    _maybeCheckpoint(force) {
        let writable = this._contentsModel && this._contentsModel.writable;
        let promise = Promise.resolve(void 0);
        if (!writable) {
            return promise;
        }
        if (force) {
            promise = this.createCheckpoint().then( /* no-op */);
        }
        else {
            promise = this.listCheckpoints().then(checkpoints => {
                writable = this._contentsModel && this._contentsModel.writable;
                if (!this.isDisposed && !checkpoints.length && writable) {
                    return this.createCheckpoint().then( /* no-op */);
                }
            });
        }
        return promise.catch(err => {
            // Handle a read-only folder.
            if (!err.response || err.response.status !== 403) {
                throw err;
            }
        });
    }
    /**
     * Handle a time conflict.
     */
    _timeConflict(tClient, model, options) {
        const tDisk = new Date(model.last_modified);
        console.warn(`Last saving performed ${tClient} ` +
            `while the current file seems to have been saved ` +
            `${tDisk}`);
        if (this._timeConflictModalIsOpen) {
            return Promise.reject(new Error('Modal is already displayed'));
        }
        const body = this._trans.__(`"%1" has changed on disk since the last time it was opened or saved.
Do you want to overwrite the file on disk with the version open here,
or load the version on disk (revert)?`, this.path);
        const revertBtn = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: this._trans.__('Revert') });
        const overwriteBtn = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({
            label: this._trans.__('Overwrite')
        });
        this._timeConflictModalIsOpen = true;
        return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: this._trans.__('File Changed'),
            body,
            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(), revertBtn, overwriteBtn]
        }).then(result => {
            this._timeConflictModalIsOpen = false;
            if (this.isDisposed) {
                return Promise.reject(new Error('Disposed'));
            }
            if (result.button.label === this._trans.__('Overwrite')) {
                return this._manager.contents.save(this._path, options);
            }
            // FIXME-TRANS: Why compare to label?
            if (result.button.label === this._trans.__('Revert')) {
                return this.revert().then(() => {
                    return model;
                });
            }
            return Promise.reject(new Error('Cancel')); // Otherwise cancel the save.
        });
    }
    /**
     * Handle a time conflict.
     */
    _maybeOverWrite(path) {
        const body = this._trans.__('"%1" already exists. Do you want to replace it?', path);
        const overwriteBtn = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({
            label: this._trans.__('Overwrite')
        });
        return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: this._trans.__('File Overwrite?'),
            body,
            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(), overwriteBtn]
        }).then(result => {
            if (this.isDisposed) {
                return Promise.reject(new Error('Disposed'));
            }
            // FIXME-TRANS: Why compare to label?
            if (result.button.label === this._trans.__('Overwrite')) {
                return this._manager.contents.delete(path).then(() => {
                    return this._finishSaveAs(path);
                });
            }
        });
    }
    /**
     * Finish a saveAs operation given a new path.
     */
    async _finishSaveAs(newPath) {
        var _a, _b;
        this._path = newPath;
        await ((_a = this.sessionContext.session) === null || _a === void 0 ? void 0 : _a.setPath(newPath));
        await ((_b = this.sessionContext.session) === null || _b === void 0 ? void 0 : _b.setName(newPath.split('/').pop()));
        await this.save();
        this._ycontext.set('path', this._path);
        await this._maybeCheckpoint(true);
    }
}
/**
 * A namespace for private data.
 */
var Private;
(function (Private) {
    /**
     * Get a new file path from the user.
     */
    function getSavePath(path, translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.nullTranslator;
        const trans = translator.load('jupyterlab');
        const saveBtn = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Save') });
        return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: trans.__('Save File As..'),
            body: new SaveWidget(path),
            buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton(), saveBtn]
        }).then(result => {
            var _a;
            // FIXME-TRANS: Why use the label?
            if (result.button.label === trans.__('Save')) {
                return (_a = result.value) !== null && _a !== void 0 ? _a : undefined;
            }
            return;
        });
    }
    Private.getSavePath = getSavePath;
    /**
     * A no-op function.
     */
    function noOp() {
        /* no-op */
    }
    Private.noOp = noOp;
    /*
     * A widget that gets a file path from a user.
     */
    class SaveWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_8__.Widget {
        /**
         * Construct a new save widget.
         */
        constructor(path) {
            super({ node: createSaveNode(path) });
        }
        /**
         * Get the value for the widget.
         */
        getValue() {
            return this.node.value;
        }
    }
    /**
     * Create the node for a save widget.
     */
    function createSaveNode(path) {
        const input = document.createElement('input');
        input.value = path;
        return input;
    }
})(Private || (Private = {}));
//# sourceMappingURL=context.js.map

/***/ }),

/***/ "../../packages/docregistry/lib/default.js":
/*!*************************************************!*\
  !*** ../../packages/docregistry/lib/default.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentModel": () => (/* binding */ DocumentModel),
/* harmony export */   "TextModelFactory": () => (/* binding */ TextModelFactory),
/* harmony export */   "Base64ModelFactory": () => (/* binding */ Base64ModelFactory),
/* harmony export */   "ABCWidgetFactory": () => (/* binding */ ABCWidgetFactory),
/* harmony export */   "DocumentWidget": () => (/* binding */ DocumentWidget)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/codeeditor */ "webpack/sharing/consume/default/@jupyterlab/codeeditor/@jupyterlab/codeeditor");
/* harmony import */ var _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/codemirror */ "webpack/sharing/consume/default/@jupyterlab/codemirror/@jupyterlab/codemirror");
/* harmony import */ var _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/shared-models */ "webpack/sharing/consume/default/@jupyterlab/shared-models/@jupyterlab/shared-models");
/* harmony import */ var _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_6__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * The default implementation of a document model.
 */
class DocumentModel extends _jupyterlab_codeeditor__WEBPACK_IMPORTED_MODULE_1__.CodeEditor.Model {
    /**
     * Construct a new document model.
     */
    constructor(languagePreference, modelDB) {
        super({ modelDB });
        this._defaultLang = '';
        this._readOnly = false;
        this._contentChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__.Signal(this);
        this._stateChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__.Signal(this);
        this._defaultLang = languagePreference || '';
        const filemodel = new _jupyterlab_shared_models__WEBPACK_IMPORTED_MODULE_4__.YFile();
        this.switchSharedModel(filemodel, true);
        this.value.changed.connect(this.triggerContentChange, this);
        this.sharedModel.dirty = false;
        this.sharedModel.changed.connect(this._onStateChanged, this);
    }
    /**
     * A signal emitted when the document content changes.
     */
    get contentChanged() {
        return this._contentChanged;
    }
    /**
     * A signal emitted when the document state changes.
     */
    get stateChanged() {
        return this._stateChanged;
    }
    /**
     * The dirty state of the document.
     */
    get dirty() {
        return this.sharedModel.dirty;
    }
    set dirty(newValue) {
        if (newValue === this.dirty) {
            return;
        }
        this.sharedModel.dirty = newValue;
    }
    /**
     * The read only state of the document.
     */
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(newValue) {
        if (newValue === this._readOnly) {
            return;
        }
        const oldValue = this._readOnly;
        this._readOnly = newValue;
        this.triggerStateChange({ name: 'readOnly', oldValue, newValue });
    }
    /**
     * The default kernel name of the document.
     *
     * #### Notes
     * This is a read-only property.
     */
    get defaultKernelName() {
        return '';
    }
    /**
     * The default kernel language of the document.
     *
     * #### Notes
     * This is a read-only property.
     */
    get defaultKernelLanguage() {
        return this._defaultLang;
    }
    /**
     * Serialize the model to a string.
     */
    toString() {
        return this.value.text;
    }
    /**
     * Deserialize the model from a string.
     *
     * #### Notes
     * Should emit a [contentChanged] signal.
     */
    fromString(value) {
        this.value.text = value;
    }
    /**
     * Serialize the model to JSON.
     */
    toJSON() {
        return JSON.parse(this.value.text || 'null');
    }
    /**
     * Deserialize the model from JSON.
     *
     * #### Notes
     * Should emit a [contentChanged] signal.
     */
    fromJSON(value) {
        this.fromString(JSON.stringify(value));
    }
    /**
     * Initialize the model with its current state.
     */
    initialize() {
        return;
    }
    /**
     * Trigger a state change signal.
     */
    triggerStateChange(args) {
        this._stateChanged.emit(args);
    }
    /**
     * Trigger a content changed signal.
     */
    triggerContentChange() {
        this._contentChanged.emit(void 0);
        this.dirty = true;
    }
    _onStateChanged(sender, changes) {
        if (changes.stateChange) {
            changes.stateChange.forEach(value => {
                if (value.name !== 'dirty' || value.oldValue !== value.newValue) {
                    this.triggerStateChange(value);
                }
            });
        }
    }
}
/**
 * An implementation of a model factory for text files.
 */
class TextModelFactory {
    constructor() {
        this._isDisposed = false;
    }
    /**
     * The name of the model type.
     *
     * #### Notes
     * This is a read-only property.
     */
    get name() {
        return 'text';
    }
    /**
     * The type of the file.
     *
     * #### Notes
     * This is a read-only property.
     */
    get contentType() {
        return 'file';
    }
    /**
     * The format of the file.
     *
     * This is a read-only property.
     */
    get fileFormat() {
        return 'text';
    }
    /**
     * Get whether the model factory has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the model factory.
     */
    dispose() {
        this._isDisposed = true;
    }
    /**
     * Create a new model.
     *
     * @param languagePreference - An optional kernel language preference.
     * @param modelDB - An optional modelDB.
     * @param isInitialized - An optional flag to check if the model is initialized.
     *
     * @returns A new document model.
     */
    createNew(languagePreference, modelDB, isInitialized) {
        return new DocumentModel(languagePreference, modelDB);
    }
    /**
     * Get the preferred kernel language given a file path.
     */
    preferredLanguage(path) {
        const mode = _jupyterlab_codemirror__WEBPACK_IMPORTED_MODULE_2__.Mode.findByFileName(path);
        return mode && mode.mode;
    }
}
/**
 * An implementation of a model factory for base64 files.
 */
class Base64ModelFactory extends TextModelFactory {
    /**
     * The name of the model type.
     *
     * #### Notes
     * This is a read-only property.
     */
    get name() {
        return 'base64';
    }
    /**
     * The type of the file.
     *
     * #### Notes
     * This is a read-only property.
     */
    get contentType() {
        return 'file';
    }
    /**
     * The format of the file.
     *
     * This is a read-only property.
     */
    get fileFormat() {
        return 'base64';
    }
}
/**
 * The default implementation of a widget factory.
 */
class ABCWidgetFactory {
    /**
     * Construct a new `ABCWidgetFactory`.
     */
    constructor(options) {
        this._isDisposed = false;
        this._widgetCreated = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__.Signal(this);
        this._translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_5__.nullTranslator;
        this._name = options.name;
        this._readOnly = options.readOnly === undefined ? false : options.readOnly;
        this._defaultFor = options.defaultFor ? options.defaultFor.slice() : [];
        this._defaultRendered = (options.defaultRendered || []).slice();
        this._fileTypes = options.fileTypes.slice();
        this._modelName = options.modelName || 'text';
        this._preferKernel = !!options.preferKernel;
        this._canStartKernel = !!options.canStartKernel;
        this._shutdownOnClose = !!options.shutdownOnClose;
        this._autoStartDefault = !!options.autoStartDefault;
        this._toolbarFactory = options.toolbarFactory;
    }
    /**
     * A signal emitted when a widget is created.
     */
    get widgetCreated() {
        return this._widgetCreated;
    }
    /**
     * Get whether the model factory has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources used by the document manager.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_6__.Signal.clearData(this);
    }
    /**
     * Whether the widget factory is read only.
     */
    get readOnly() {
        return this._readOnly;
    }
    /**
     * The name of the widget to display in dialogs.
     */
    get name() {
        return this._name;
    }
    /**
     * The file types the widget can view.
     */
    get fileTypes() {
        return this._fileTypes.slice();
    }
    /**
     * The registered name of the model type used to create the widgets.
     */
    get modelName() {
        return this._modelName;
    }
    /**
     * The file types for which the factory should be the default.
     */
    get defaultFor() {
        return this._defaultFor.slice();
    }
    /**
     * The file types for which the factory should be the default for
     * rendering a document model, if different from editing.
     */
    get defaultRendered() {
        return this._defaultRendered.slice();
    }
    /**
     * Whether the widgets prefer having a kernel started.
     */
    get preferKernel() {
        return this._preferKernel;
    }
    /**
     * Whether the widgets can start a kernel when opened.
     */
    get canStartKernel() {
        return this._canStartKernel;
    }
    /**
     * Automatically start the default kernel if no other matching kernel is
     * found.
     */
    get autoStartDefault() {
        return this._autoStartDefault;
    }
    /**
     * The application language translator.
     */
    get translator() {
        return this._translator;
    }
    /**
     * Whether the kernel should be shutdown when the widget is closed.
     */
    get shutdownOnClose() {
        return this._shutdownOnClose;
    }
    set shutdownOnClose(value) {
        this._shutdownOnClose = value;
    }
    /**
     * Create a new widget given a document model and a context.
     *
     * #### Notes
     * It should emit the [widgetCreated] signal with the new widget.
     */
    createNew(context, source) {
        var _a;
        // Create the new widget
        const widget = this.createNewWidget(context, source);
        // Add toolbar
        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.setToolbar)(widget, (_a = this._toolbarFactory) !== null && _a !== void 0 ? _a : this.defaultToolbarFactory.bind(this));
        // Emit widget created signal
        this._widgetCreated.emit(widget);
        return widget;
    }
    /**
     * Default factory for toolbar items to be added after the widget is created.
     */
    defaultToolbarFactory(widget) {
        return [];
    }
}
/**
 * The class name added to a dirty widget.
 */
const DIRTY_CLASS = 'jp-mod-dirty';
/**
 * A document widget implementation.
 */
class DocumentWidget extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.MainAreaWidget {
    constructor(options) {
        // Include the context ready promise in the widget reveal promise
        options.reveal = Promise.all([options.reveal, options.context.ready]);
        super(options);
        this.context = options.context;
        // Handle context path changes
        this.context.pathChanged.connect(this._onPathChanged, this);
        this._onPathChanged(this.context, this.context.path);
        // Listen for changes in the dirty state.
        this.context.model.stateChanged.connect(this._onModelStateChanged, this);
        void this.context.ready.then(() => {
            this._handleDirtyState();
        });
        // listen for changes to the title object
        this.title.changed.connect(this._onTitleChanged, this);
    }
    /**
     * Set URI fragment identifier.
     */
    setFragment(fragment) {
        /* no-op */
    }
    /**
     * Handle a title change.
     */
    async _onTitleChanged(_sender) {
        const validNameExp = /[\/\\:]/;
        const name = this.title.label;
        const filename = this.context.path.split('/').pop();
        if (name === filename) {
            return;
        }
        if (name.length > 0 && !validNameExp.test(name)) {
            const oldPath = this.context.path;
            await this.context.rename(name);
            if (this.context.path !== oldPath) {
                // Rename succeeded
                return;
            }
        }
        // Reset title if name is invalid or rename fails
        this.title.label = filename;
    }
    /**
     * Handle a path change.
     */
    _onPathChanged(sender, path) {
        this.title.label = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_3__.PathExt.basename(sender.localPath);
    }
    /**
     * Handle a change to the context model state.
     */
    _onModelStateChanged(sender, args) {
        if (args.name === 'dirty') {
            this._handleDirtyState();
        }
    }
    /**
     * Handle the dirty state of the context model.
     */
    _handleDirtyState() {
        if (this.context.model.dirty &&
            !this.title.className.includes(DIRTY_CLASS)) {
            this.title.className += ` ${DIRTY_CLASS}`;
        }
        else {
            this.title.className = this.title.className.replace(DIRTY_CLASS, '');
        }
    }
}
//# sourceMappingURL=default.js.map

/***/ }),

/***/ "../../packages/docregistry/lib/index.js":
/*!***********************************************!*\
  !*** ../../packages/docregistry/lib/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Context": () => (/* reexport safe */ _context__WEBPACK_IMPORTED_MODULE_0__.Context),
/* harmony export */   "ABCWidgetFactory": () => (/* reexport safe */ _default__WEBPACK_IMPORTED_MODULE_1__.ABCWidgetFactory),
/* harmony export */   "Base64ModelFactory": () => (/* reexport safe */ _default__WEBPACK_IMPORTED_MODULE_1__.Base64ModelFactory),
/* harmony export */   "DocumentModel": () => (/* reexport safe */ _default__WEBPACK_IMPORTED_MODULE_1__.DocumentModel),
/* harmony export */   "DocumentWidget": () => (/* reexport safe */ _default__WEBPACK_IMPORTED_MODULE_1__.DocumentWidget),
/* harmony export */   "TextModelFactory": () => (/* reexport safe */ _default__WEBPACK_IMPORTED_MODULE_1__.TextModelFactory),
/* harmony export */   "MimeContent": () => (/* reexport safe */ _mimedocument__WEBPACK_IMPORTED_MODULE_2__.MimeContent),
/* harmony export */   "MimeDocument": () => (/* reexport safe */ _mimedocument__WEBPACK_IMPORTED_MODULE_2__.MimeDocument),
/* harmony export */   "MimeDocumentFactory": () => (/* reexport safe */ _mimedocument__WEBPACK_IMPORTED_MODULE_2__.MimeDocumentFactory),
/* harmony export */   "DocumentRegistry": () => (/* reexport safe */ _registry__WEBPACK_IMPORTED_MODULE_3__.DocumentRegistry)
/* harmony export */ });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ "../../packages/docregistry/lib/context.js");
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default */ "../../packages/docregistry/lib/default.js");
/* harmony import */ var _mimedocument__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mimedocument */ "../../packages/docregistry/lib/mimedocument.js");
/* harmony import */ var _registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./registry */ "../../packages/docregistry/lib/registry.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module docregistry
 */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/docregistry/lib/mimedocument.js":
/*!******************************************************!*\
  !*** ../../packages/docregistry/lib/mimedocument.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MimeContent": () => (/* binding */ MimeContent),
/* harmony export */   "MimeDocument": () => (/* binding */ MimeDocument),
/* harmony export */   "MimeDocumentFactory": () => (/* binding */ MimeDocumentFactory)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/rendermime */ "webpack/sharing/consume/default/@jupyterlab/rendermime/@jupyterlab/rendermime");
/* harmony import */ var _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./default */ "../../packages/docregistry/lib/default.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * A content widget for a rendered mimetype document.
 */
class MimeContent extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget {
    /**
     * Construct a new widget.
     */
    constructor(options) {
        super();
        /**
         * A bound change callback.
         */
        this._changeCallback = (options) => {
            if (!options.data || !options.data[this.mimeType]) {
                return;
            }
            const data = options.data[this.mimeType];
            if (typeof data === 'string') {
                if (data !== this._context.model.toString()) {
                    this._context.model.fromString(data);
                }
            }
            else if (data !== null &&
                data !== undefined &&
                !_lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__.JSONExt.deepEqual(data, this._context.model.toJSON())) {
                this._context.model.fromJSON(data);
            }
        };
        this._fragment = '';
        this._ready = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_4__.PromiseDelegate();
        this._isRendering = false;
        this._renderRequested = false;
        this.addClass('jp-MimeDocument');
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this.mimeType = options.mimeType;
        this._dataType = options.dataType || 'string';
        this._context = options.context;
        this.renderer = options.renderer;
        const layout = (this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.StackedLayout());
        layout.addWidget(this.renderer);
        this._context.ready
            .then(() => {
            return this._render();
        })
            .then(() => {
            // After rendering for the first time, send an activation request if we
            // are currently focused.
            if (this.node === document.activeElement) {
                // We want to synchronously send (not post) the activate message, while
                // we know this node still has focus.
                _lumino_messaging__WEBPACK_IMPORTED_MODULE_5__.MessageLoop.sendMessage(this.renderer, _lumino_widgets__WEBPACK_IMPORTED_MODULE_6__.Widget.Msg.ActivateRequest);
            }
            // Throttle the rendering rate of the widget.
            this._monitor = new _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.ActivityMonitor({
                signal: this._context.model.contentChanged,
                timeout: options.renderTimeout
            });
            this._monitor.activityStopped.connect(this.update, this);
            this._ready.resolve(undefined);
        })
            .catch(reason => {
            // Dispose the document if rendering fails.
            requestAnimationFrame(() => {
                this.dispose();
            });
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans.__('Renderer Failure: %1', this._context.path), reason);
        });
    }
    /**
     * Print method. Deferred to the renderer.
     */
    [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Printing.symbol]() {
        return _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Printing.getPrintFunction(this.renderer);
    }
    /**
     * A promise that resolves when the widget is ready.
     */
    get ready() {
        return this._ready.promise;
    }
    /**
     * Set URI fragment identifier.
     */
    setFragment(fragment) {
        this._fragment = fragment;
        this.update();
    }
    /**
     * Dispose of the resources held by the widget.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        if (this._monitor) {
            this._monitor.dispose();
        }
        this._monitor = null;
        super.dispose();
    }
    /**
     * Handle an `update-request` message to the widget.
     */
    onUpdateRequest(msg) {
        if (this._context.isReady) {
            void this._render();
            this._fragment = '';
        }
    }
    /**
     * Render the mime content.
     */
    async _render() {
        if (this.isDisposed) {
            return;
        }
        // Since rendering is async, we note render requests that happen while we
        // actually are rendering for a future rendering.
        if (this._isRendering) {
            this._renderRequested = true;
            return;
        }
        // Set up for this rendering pass.
        this._renderRequested = false;
        const context = this._context;
        const model = context.model;
        const data = {};
        if (this._dataType === 'string') {
            data[this.mimeType] = model.toString();
        }
        else {
            data[this.mimeType] = model.toJSON();
        }
        const mimeModel = new _jupyterlab_rendermime__WEBPACK_IMPORTED_MODULE_2__.MimeModel({
            data,
            callback: this._changeCallback,
            metadata: { fragment: this._fragment }
        });
        try {
            // Do the rendering asynchronously.
            this._isRendering = true;
            await this.renderer.renderModel(mimeModel);
            this._isRendering = false;
            // If there is an outstanding request to render, go ahead and render
            if (this._renderRequested) {
                return this._render();
            }
        }
        catch (reason) {
            // Dispose the document if rendering fails.
            requestAnimationFrame(() => {
                this.dispose();
            });
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans.__('Renderer Failure: %1', context.path), reason);
        }
    }
}
/**
 * A document widget for mime content.
 */
class MimeDocument extends _default__WEBPACK_IMPORTED_MODULE_7__.DocumentWidget {
    setFragment(fragment) {
        this.content.setFragment(fragment);
    }
}
/**
 * An implementation of a widget factory for a rendered mimetype document.
 */
class MimeDocumentFactory extends _default__WEBPACK_IMPORTED_MODULE_7__.ABCWidgetFactory {
    /**
     * Construct a new mimetype widget factory.
     */
    constructor(options) {
        super(Private.createRegistryOptions(options));
        this._rendermime = options.rendermime;
        this._renderTimeout = options.renderTimeout || 1000;
        this._dataType = options.dataType || 'string';
        this._fileType = options.primaryFileType;
        this._factory = options.factory;
    }
    /**
     * Create a new widget given a context.
     */
    createNewWidget(context) {
        var _a, _b;
        const ft = this._fileType;
        const mimeType = (ft === null || ft === void 0 ? void 0 : ft.mimeTypes.length) ? ft.mimeTypes[0] : 'text/plain';
        const rendermime = this._rendermime.clone({
            resolver: context.urlResolver
        });
        let renderer;
        if (this._factory && this._factory.mimeTypes.includes(mimeType)) {
            renderer = this._factory.createRenderer({
                mimeType,
                resolver: rendermime.resolver,
                sanitizer: rendermime.sanitizer,
                linkHandler: rendermime.linkHandler,
                latexTypesetter: rendermime.latexTypesetter
            });
        }
        else {
            renderer = rendermime.createRenderer(mimeType);
        }
        const content = new MimeContent({
            context,
            renderer,
            mimeType,
            renderTimeout: this._renderTimeout,
            dataType: this._dataType
        });
        content.title.icon = ft === null || ft === void 0 ? void 0 : ft.icon;
        content.title.iconClass = (_a = ft === null || ft === void 0 ? void 0 : ft.iconClass) !== null && _a !== void 0 ? _a : '';
        content.title.iconLabel = (_b = ft === null || ft === void 0 ? void 0 : ft.iconLabel) !== null && _b !== void 0 ? _b : '';
        const widget = new MimeDocument({ content, context });
        return widget;
    }
}
/**
 * The namespace for the module implementation details.
 */
var Private;
(function (Private) {
    /**
     * Create the document registry options.
     */
    function createRegistryOptions(options) {
        return Object.assign(Object.assign({}, options), { readOnly: true });
    }
    Private.createRegistryOptions = createRegistryOptions;
})(Private || (Private = {}));
//# sourceMappingURL=mimedocument.js.map

/***/ }),

/***/ "../../packages/docregistry/lib/registry.js":
/*!**************************************************!*\
  !*** ../../packages/docregistry/lib/registry.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentRegistry": () => (/* binding */ DocumentRegistry)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _default__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./default */ "../../packages/docregistry/lib/default.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







/**
 * The document registry.
 */
class DocumentRegistry {
    /**
     * Construct a new document registry.
     */
    constructor(options = {}) {
        this._modelFactories = Object.create(null);
        this._widgetFactories = Object.create(null);
        this._defaultWidgetFactory = '';
        this._defaultWidgetFactoryOverrides = Object.create(null);
        this._defaultWidgetFactories = Object.create(null);
        this._defaultRenderedWidgetFactories = Object.create(null);
        this._widgetFactoriesForFileType = Object.create(null);
        this._fileTypes = [];
        this._extenders = Object.create(null);
        this._changed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__.Signal(this);
        this._isDisposed = false;
        const factory = options.textModelFactory;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        if (factory && factory.name !== 'text') {
            throw new Error('Text model factory must have the name `text`');
        }
        this._modelFactories['text'] = factory || new _default__WEBPACK_IMPORTED_MODULE_6__.TextModelFactory();
        const fts = options.initialFileTypes ||
            DocumentRegistry.getDefaultFileTypes(this.translator);
        fts.forEach(ft => {
            const value = Object.assign(Object.assign({}, DocumentRegistry.getFileTypeDefaults(this.translator)), ft);
            this._fileTypes.push(value);
        });
    }
    /**
     * A signal emitted when the registry has changed.
     */
    get changed() {
        return this._changed;
    }
    /**
     * Get whether the document registry has been disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * Dispose of the resources held by the document registry.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        this._isDisposed = true;
        for (const modelName in this._modelFactories) {
            this._modelFactories[modelName].dispose();
        }
        for (const widgetName in this._widgetFactories) {
            this._widgetFactories[widgetName].dispose();
        }
        for (const widgetName in this._extenders) {
            this._extenders[widgetName].length = 0;
        }
        this._fileTypes.length = 0;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_5__.Signal.clearData(this);
    }
    /**
     * Add a widget factory to the registry.
     *
     * @param factory - The factory instance to register.
     *
     * @returns A disposable which will unregister the factory.
     *
     * #### Notes
     * If a factory with the given `'name'` is already registered,
     * a warning will be logged, and this will be a no-op.
     * If `'*'` is given as a default extension, the factory will be registered
     * as the global default.
     * If an extension or global default is already registered, this factory
     * will override the existing default.
     * The factory cannot be named an empty string or the string `'default'`.
     */
    addWidgetFactory(factory) {
        const name = factory.name.toLowerCase();
        if (!name || name === 'default') {
            throw Error('Invalid factory name');
        }
        if (this._widgetFactories[name]) {
            console.warn(`Duplicate registered factory ${name}`);
            return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__.DisposableDelegate(Private.noOp);
        }
        this._widgetFactories[name] = factory;
        for (const ft of factory.defaultFor || []) {
            if (factory.fileTypes.indexOf(ft) === -1) {
                continue;
            }
            if (ft === '*') {
                this._defaultWidgetFactory = name;
            }
            else {
                this._defaultWidgetFactories[ft] = name;
            }
        }
        for (const ft of factory.defaultRendered || []) {
            if (factory.fileTypes.indexOf(ft) === -1) {
                continue;
            }
            this._defaultRenderedWidgetFactories[ft] = name;
        }
        // For convenience, store a mapping of file type name -> name
        for (const ft of factory.fileTypes) {
            if (!this._widgetFactoriesForFileType[ft]) {
                this._widgetFactoriesForFileType[ft] = [];
            }
            this._widgetFactoriesForFileType[ft].push(name);
        }
        this._changed.emit({
            type: 'widgetFactory',
            name,
            change: 'added'
        });
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__.DisposableDelegate(() => {
            delete this._widgetFactories[name];
            if (this._defaultWidgetFactory === name) {
                this._defaultWidgetFactory = '';
            }
            for (const ext of Object.keys(this._defaultWidgetFactories)) {
                if (this._defaultWidgetFactories[ext] === name) {
                    delete this._defaultWidgetFactories[ext];
                }
            }
            for (const ext of Object.keys(this._defaultRenderedWidgetFactories)) {
                if (this._defaultRenderedWidgetFactories[ext] === name) {
                    delete this._defaultRenderedWidgetFactories[ext];
                }
            }
            for (const ext of Object.keys(this._widgetFactoriesForFileType)) {
                _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.removeFirstOf(this._widgetFactoriesForFileType[ext], name);
                if (this._widgetFactoriesForFileType[ext].length === 0) {
                    delete this._widgetFactoriesForFileType[ext];
                }
            }
            for (const ext of Object.keys(this._defaultWidgetFactoryOverrides)) {
                if (this._defaultWidgetFactoryOverrides[ext] === name) {
                    delete this._defaultWidgetFactoryOverrides[ext];
                }
            }
            this._changed.emit({
                type: 'widgetFactory',
                name,
                change: 'removed'
            });
        });
    }
    /**
     * Add a model factory to the registry.
     *
     * @param factory - The factory instance.
     *
     * @returns A disposable which will unregister the factory.
     *
     * #### Notes
     * If a factory with the given `name` is already registered, or
     * the given factory is already registered, a warning will be logged
     * and this will be a no-op.
     */
    addModelFactory(factory) {
        const name = factory.name.toLowerCase();
        if (this._modelFactories[name]) {
            console.warn(`Duplicate registered factory ${name}`);
            return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__.DisposableDelegate(Private.noOp);
        }
        this._modelFactories[name] = factory;
        this._changed.emit({
            type: 'modelFactory',
            name,
            change: 'added'
        });
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__.DisposableDelegate(() => {
            delete this._modelFactories[name];
            this._changed.emit({
                type: 'modelFactory',
                name,
                change: 'removed'
            });
        });
    }
    /**
     * Add a widget extension to the registry.
     *
     * @param widgetName - The name of the widget factory.
     *
     * @param extension - A widget extension.
     *
     * @returns A disposable which will unregister the extension.
     *
     * #### Notes
     * If the extension is already registered for the given
     * widget name, a warning will be logged and this will be a no-op.
     */
    addWidgetExtension(widgetName, extension) {
        widgetName = widgetName.toLowerCase();
        if (!(widgetName in this._extenders)) {
            this._extenders[widgetName] = [];
        }
        const extenders = this._extenders[widgetName];
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.firstIndexOf(extenders, extension);
        if (index !== -1) {
            console.warn(`Duplicate registered extension for ${widgetName}`);
            return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__.DisposableDelegate(Private.noOp);
        }
        this._extenders[widgetName].push(extension);
        this._changed.emit({
            type: 'widgetExtension',
            name: widgetName,
            change: 'added'
        });
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__.DisposableDelegate(() => {
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.removeFirstOf(this._extenders[widgetName], extension);
            this._changed.emit({
                type: 'widgetExtension',
                name: widgetName,
                change: 'removed'
            });
        });
    }
    /**
     * Add a file type to the document registry.
     *
     * @param fileType - The file type object to register.
     * @param factories - Optional factories to use for the file type.
     *
     * @returns A disposable which will unregister the command.
     *
     * #### Notes
     * These are used to populate the "Create New" dialog.
     *
     * If no default factory exists for the file type, the first factory will
     * be defined as default factory.
     */
    addFileType(fileType, factories) {
        const value = Object.assign(Object.assign(Object.assign({}, DocumentRegistry.getFileTypeDefaults(this.translator)), fileType), (!(fileType.icon || fileType.iconClass) && { icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.fileIcon }));
        this._fileTypes.push(value);
        // Add the filetype to the factory - filetype mapping
        //  We do not change the factory itself
        if (factories) {
            const fileTypeName = value.name.toLowerCase();
            factories
                .map(factory => factory.toLowerCase())
                .forEach(factory => {
                if (!this._widgetFactoriesForFileType[fileTypeName]) {
                    this._widgetFactoriesForFileType[fileTypeName] = [];
                }
                if (!this._widgetFactoriesForFileType[fileTypeName].includes(factory)) {
                    this._widgetFactoriesForFileType[fileTypeName].push(factory);
                }
            });
            if (!this._defaultWidgetFactories[fileTypeName]) {
                this._defaultWidgetFactories[fileTypeName] = this._widgetFactoriesForFileType[fileTypeName][0];
            }
        }
        this._changed.emit({
            type: 'fileType',
            name: value.name,
            change: 'added'
        });
        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_4__.DisposableDelegate(() => {
            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.removeFirstOf(this._fileTypes, value);
            if (factories) {
                const fileTypeName = value.name.toLowerCase();
                for (const name of factories.map(factory => factory.toLowerCase())) {
                    _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.removeFirstOf(this._widgetFactoriesForFileType[fileTypeName], name);
                }
                if (this._defaultWidgetFactories[fileTypeName] ===
                    factories[0].toLowerCase()) {
                    delete this._defaultWidgetFactories[fileTypeName];
                }
            }
            this._changed.emit({
                type: 'fileType',
                name: fileType.name,
                change: 'removed'
            });
        });
    }
    /**
     * Get a list of the preferred widget factories.
     *
     * @param path - The file path to filter the results.
     *
     * @returns A new array of widget factories.
     *
     * #### Notes
     * Only the widget factories whose associated model factory have
     * been registered will be returned.
     * The first item is considered the default. The returned array
     * has widget factories in the following order:
     * - path-specific default factory
     * - path-specific default rendered factory
     * - global default factory
     * - all other path-specific factories
     * - all other global factories
     */
    preferredWidgetFactories(path) {
        const factories = new Set();
        // Get the ordered matching file types.
        const fts = this.getFileTypesForPath(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(path));
        // Start with any user overrides for the defaults.
        fts.forEach(ft => {
            if (ft.name in this._defaultWidgetFactoryOverrides) {
                factories.add(this._defaultWidgetFactoryOverrides[ft.name]);
            }
        });
        // Next add the file type default factories.
        fts.forEach(ft => {
            if (ft.name in this._defaultWidgetFactories) {
                factories.add(this._defaultWidgetFactories[ft.name]);
            }
        });
        // Add the file type default rendered factories.
        fts.forEach(ft => {
            if (ft.name in this._defaultRenderedWidgetFactories) {
                factories.add(this._defaultRenderedWidgetFactories[ft.name]);
            }
        });
        // Add the global default factory.
        if (this._defaultWidgetFactory) {
            factories.add(this._defaultWidgetFactory);
        }
        // Add the file type factories in registration order.
        fts.forEach(ft => {
            if (ft.name in this._widgetFactoriesForFileType) {
                (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(this._widgetFactoriesForFileType[ft.name], n => {
                    factories.add(n);
                });
            }
        });
        // Add the rest of the global factories, in registration order.
        if ('*' in this._widgetFactoriesForFileType) {
            (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.each)(this._widgetFactoriesForFileType['*'], n => {
                factories.add(n);
            });
        }
        // Construct the return list, checking to make sure the corresponding
        // model factories are registered.
        const factoryList = [];
        factories.forEach(name => {
            const factory = this._widgetFactories[name];
            if (!factory) {
                return;
            }
            const modelName = factory.modelName || 'text';
            if (modelName in this._modelFactories) {
                factoryList.push(factory);
            }
        });
        return factoryList;
    }
    /**
     * Get the default rendered widget factory for a path.
     *
     * @param path - The path to for which to find a widget factory.
     *
     * @returns The default rendered widget factory for the path.
     *
     * ### Notes
     * If the widget factory has registered a separate set of `defaultRendered`
     * file types and there is a match in that set, this returns that.
     * Otherwise, this returns the same widget factory as
     * [[defaultWidgetFactory]].
     */
    defaultRenderedWidgetFactory(path) {
        // Get the matching file types.
        const fts = this.getFileTypesForPath(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(path));
        let factory = undefined;
        // Find if a there is a default rendered factory for this type.
        for (const ft of fts) {
            if (ft.name in this._defaultRenderedWidgetFactories) {
                factory = this._widgetFactories[this._defaultRenderedWidgetFactories[ft.name]];
                break;
            }
        }
        return factory || this.defaultWidgetFactory(path);
    }
    /**
     * Get the default widget factory for a path.
     *
     * @param path - An optional file path to filter the results.
     *
     * @returns The default widget factory for an path.
     *
     * #### Notes
     * This is equivalent to the first value in [[preferredWidgetFactories]].
     */
    defaultWidgetFactory(path) {
        if (!path) {
            return this._widgetFactories[this._defaultWidgetFactory];
        }
        return this.preferredWidgetFactories(path)[0];
    }
    /**
     * Set overrides for the default widget factory for a file type.
     *
     * Normally, a widget factory informs the document registry which file types
     * it should be the default for using the `defaultFor` option in the
     * IWidgetFactoryOptions. This function can be used to override that after
     * the fact.
     *
     * @param fileType: The name of the file type.
     *
     * @param factory: The name of the factory.
     *
     * #### Notes
     * If `factory` is undefined, then any override will be unset, and the
     * default factory will revert to the original value.
     *
     * If `factory` or `fileType` are not known to the docregistry, or
     * if `factory` cannot open files of type `fileType`, this will throw
     * an error.
     */
    setDefaultWidgetFactory(fileType, factory) {
        fileType = fileType.toLowerCase();
        if (!this.getFileType(fileType)) {
            throw Error(`Cannot find file type ${fileType}`);
        }
        if (!factory) {
            if (this._defaultWidgetFactoryOverrides[fileType]) {
                delete this._defaultWidgetFactoryOverrides[fileType];
            }
            return;
        }
        if (!this.getWidgetFactory(factory)) {
            throw Error(`Cannot find widget factory ${factory}`);
        }
        factory = factory.toLowerCase();
        const factories = this._widgetFactoriesForFileType[fileType];
        if (factory !== this._defaultWidgetFactory &&
            !(factories && factories.includes(factory))) {
            throw Error(`Factory ${factory} cannot view file type ${fileType}`);
        }
        this._defaultWidgetFactoryOverrides[fileType] = factory;
    }
    /**
     * Create an iterator over the widget factories that have been registered.
     *
     * @returns A new iterator of widget factories.
     */
    widgetFactories() {
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.map)(Object.keys(this._widgetFactories), name => {
            return this._widgetFactories[name];
        });
    }
    /**
     * Create an iterator over the model factories that have been registered.
     *
     * @returns A new iterator of model factories.
     */
    modelFactories() {
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.map)(Object.keys(this._modelFactories), name => {
            return this._modelFactories[name];
        });
    }
    /**
     * Create an iterator over the registered extensions for a given widget.
     *
     * @param widgetName - The name of the widget factory.
     *
     * @returns A new iterator over the widget extensions.
     */
    widgetExtensions(widgetName) {
        widgetName = widgetName.toLowerCase();
        if (!(widgetName in this._extenders)) {
            return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.empty)();
        }
        return new _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayIterator(this._extenders[widgetName]);
    }
    /**
     * Create an iterator over the file types that have been registered.
     *
     * @returns A new iterator of file types.
     */
    fileTypes() {
        return new _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayIterator(this._fileTypes);
    }
    /**
     * Get a widget factory by name.
     *
     * @param widgetName - The name of the widget factory.
     *
     * @returns A widget factory instance.
     */
    getWidgetFactory(widgetName) {
        return this._widgetFactories[widgetName.toLowerCase()];
    }
    /**
     * Get a model factory by name.
     *
     * @param name - The name of the model factory.
     *
     * @returns A model factory instance.
     */
    getModelFactory(name) {
        return this._modelFactories[name.toLowerCase()];
    }
    /**
     * Get a file type by name.
     */
    getFileType(name) {
        name = name.toLowerCase();
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.find)(this._fileTypes, fileType => {
            return fileType.name.toLowerCase() === name;
        });
    }
    /**
     * Get a kernel preference.
     *
     * @param path - The file path.
     *
     * @param widgetName - The name of the widget factory.
     *
     * @param kernel - An optional existing kernel model.
     *
     * @returns A kernel preference.
     */
    getKernelPreference(path, widgetName, kernel) {
        widgetName = widgetName.toLowerCase();
        const widgetFactory = this._widgetFactories[widgetName];
        if (!widgetFactory) {
            return void 0;
        }
        const modelFactory = this.getModelFactory(widgetFactory.modelName || 'text');
        if (!modelFactory) {
            return void 0;
        }
        const language = modelFactory.preferredLanguage(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(path));
        const name = kernel && kernel.name;
        const id = kernel && kernel.id;
        return {
            id,
            name,
            language,
            shouldStart: widgetFactory.preferKernel,
            canStart: widgetFactory.canStartKernel,
            shutdownOnDispose: widgetFactory.shutdownOnClose,
            autoStartDefault: widgetFactory.autoStartDefault
        };
    }
    /**
     * Get the best file type given a contents model.
     *
     * @param model - The contents model of interest.
     *
     * @returns The best matching file type.
     */
    getFileTypeForModel(model) {
        switch (model.type) {
            case 'directory':
                return ((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.find)(this._fileTypes, ft => ft.contentType === 'directory') ||
                    DocumentRegistry.getDefaultDirectoryFileType(this.translator));
            case 'notebook':
                return ((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.find)(this._fileTypes, ft => ft.contentType === 'notebook') ||
                    DocumentRegistry.getDefaultNotebookFileType(this.translator));
            default:
                // Find the best matching extension.
                if (model.name || model.path) {
                    const name = model.name || _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(model.path);
                    const fts = this.getFileTypesForPath(name);
                    if (fts.length > 0) {
                        return fts[0];
                    }
                }
                return (this.getFileType('text') ||
                    DocumentRegistry.getDefaultTextFileType(this.translator));
        }
    }
    /**
     * Get the file types that match a file name.
     *
     * @param path - The path of the file.
     *
     * @returns An ordered list of matching file types.
     */
    getFileTypesForPath(path) {
        const fts = [];
        const name = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(path);
        // Look for a pattern match first.
        let ft = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.find)(this._fileTypes, ft => {
            return !!(ft.pattern && name.match(ft.pattern) !== null);
        });
        if (ft) {
            fts.push(ft);
        }
        // Then look by extension name, starting with the longest
        let ext = Private.extname(name);
        while (ext.length > 1) {
            const ftSubset = this._fileTypes.filter(ft => 
            // In Private.extname, the extension is transformed to lower case
            ft.extensions.map(extension => extension.toLowerCase()).includes(ext));
            fts.push(...ftSubset);
            ext = '.' + ext.split('.').slice(2).join('.');
        }
        return fts;
    }
}
/**
 * The namespace for the `DocumentRegistry` class statics.
 */
(function (DocumentRegistry) {
    /**
     * The defaults used for a file type.
     *
     * @param translator - The application language translator.
     *
     * @returns The default file type.
     */
    function getFileTypeDefaults(translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator === null || translator === void 0 ? void 0 : translator.load('jupyterlab');
        return {
            name: 'default',
            displayName: trans.__('default'),
            extensions: [],
            mimeTypes: [],
            contentType: 'file',
            fileFormat: 'text'
        };
    }
    DocumentRegistry.getFileTypeDefaults = getFileTypeDefaults;
    /**
     * The default text file type used by the document registry.
     *
     * @param translator - The application language translator.
     *
     * @returns The default text file type.
     */
    function getDefaultTextFileType(translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator === null || translator === void 0 ? void 0 : translator.load('jupyterlab');
        const fileTypeDefaults = getFileTypeDefaults(translator);
        return Object.assign(Object.assign({}, fileTypeDefaults), { name: 'text', displayName: trans.__('Text'), mimeTypes: ['text/plain'], extensions: ['.txt'], icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.fileIcon });
    }
    DocumentRegistry.getDefaultTextFileType = getDefaultTextFileType;
    /**
     * The default notebook file type used by the document registry.
     *
     * @param translator - The application language translator.
     *
     * @returns The default notebook file type.
     */
    function getDefaultNotebookFileType(translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator === null || translator === void 0 ? void 0 : translator.load('jupyterlab');
        return Object.assign(Object.assign({}, getFileTypeDefaults(translator)), { name: 'notebook', displayName: trans.__('Notebook'), mimeTypes: ['application/x-ipynb+json'], extensions: ['.ipynb'], contentType: 'notebook', fileFormat: 'json', icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.notebookIcon });
    }
    DocumentRegistry.getDefaultNotebookFileType = getDefaultNotebookFileType;
    /**
     * The default directory file type used by the document registry.
     *
     * @param translator - The application language translator.
     *
     * @returns The default directory file type.
     */
    function getDefaultDirectoryFileType(translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator === null || translator === void 0 ? void 0 : translator.load('jupyterlab');
        return Object.assign(Object.assign({}, getFileTypeDefaults(translator)), { name: 'directory', displayName: trans.__('Directory'), extensions: [], mimeTypes: ['text/directory'], contentType: 'directory', icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.folderIcon });
    }
    DocumentRegistry.getDefaultDirectoryFileType = getDefaultDirectoryFileType;
    /**
     * The default file types used by the document registry.
     *
     * @param translator - The application language translator.
     *
     * @returns The default directory file types.
     */
    function getDefaultFileTypes(translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator === null || translator === void 0 ? void 0 : translator.load('jupyterlab');
        return [
            getDefaultTextFileType(translator),
            getDefaultNotebookFileType(translator),
            getDefaultDirectoryFileType(translator),
            {
                name: 'markdown',
                displayName: trans.__('Markdown File'),
                extensions: ['.md'],
                mimeTypes: ['text/markdown'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.markdownIcon
            },
            {
                name: 'PDF',
                displayName: trans.__('PDF File'),
                extensions: ['.pdf'],
                mimeTypes: ['application/pdf'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.pdfIcon
            },
            {
                name: 'python',
                displayName: trans.__('Python File'),
                extensions: ['.py'],
                mimeTypes: ['text/x-python'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.pythonIcon
            },
            {
                name: 'json',
                displayName: trans.__('JSON File'),
                extensions: ['.json'],
                mimeTypes: ['application/json'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.jsonIcon
            },
            {
                name: 'julia',
                displayName: trans.__('Julia File'),
                extensions: ['.jl'],
                mimeTypes: ['text/x-julia'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.juliaIcon
            },
            {
                name: 'csv',
                displayName: trans.__('CSV File'),
                extensions: ['.csv'],
                mimeTypes: ['text/csv'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.spreadsheetIcon
            },
            {
                name: 'tsv',
                displayName: trans.__('TSV File'),
                extensions: ['.tsv'],
                mimeTypes: ['text/csv'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.spreadsheetIcon
            },
            {
                name: 'r',
                displayName: trans.__('R File'),
                mimeTypes: ['text/x-rsrc'],
                extensions: ['.R'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.rKernelIcon
            },
            {
                name: 'yaml',
                displayName: trans.__('YAML File'),
                mimeTypes: ['text/x-yaml', 'text/yaml'],
                extensions: ['.yaml', '.yml'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.yamlIcon
            },
            {
                name: 'svg',
                displayName: trans.__('Image'),
                mimeTypes: ['image/svg+xml'],
                extensions: ['.svg'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.imageIcon,
                fileFormat: 'base64'
            },
            {
                name: 'tiff',
                displayName: trans.__('Image'),
                mimeTypes: ['image/tiff'],
                extensions: ['.tif', '.tiff'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.imageIcon,
                fileFormat: 'base64'
            },
            {
                name: 'jpeg',
                displayName: trans.__('Image'),
                mimeTypes: ['image/jpeg'],
                extensions: ['.jpg', '.jpeg'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.imageIcon,
                fileFormat: 'base64'
            },
            {
                name: 'gif',
                displayName: trans.__('Image'),
                mimeTypes: ['image/gif'],
                extensions: ['.gif'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.imageIcon,
                fileFormat: 'base64'
            },
            {
                name: 'png',
                displayName: trans.__('Image'),
                mimeTypes: ['image/png'],
                extensions: ['.png'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.imageIcon,
                fileFormat: 'base64'
            },
            {
                name: 'bmp',
                displayName: trans.__('Image'),
                mimeTypes: ['image/bmp'],
                extensions: ['.bmp'],
                icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.imageIcon,
                fileFormat: 'base64'
            }
        ];
    }
    DocumentRegistry.getDefaultFileTypes = getDefaultFileTypes;
})(DocumentRegistry || (DocumentRegistry = {}));
/**
 * A private namespace for DocumentRegistry data.
 */
var Private;
(function (Private) {
    /**
     * Get the extension name of a path.
     *
     * @param file - string.
     *
     * #### Notes
     * Dotted filenames (e.g. `".table.json"` are allowed).
     */
    function extname(path) {
        const parts = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PathExt.basename(path).split('.');
        parts.shift();
        const ext = '.' + parts.join('.');
        return ext.toLowerCase();
    }
    Private.extname = extname;
    /**
     * A no-op function.
     */
    function noOp() {
        /* no-op */
    }
    Private.noOp = noOp;
})(Private || (Private = {}));
//# sourceMappingURL=registry.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZG9jcmVnaXN0cnkvbGliL2NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2RvY3JlZ2lzdHJ5L2xpYi9kZWZhdWx0LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9kb2NyZWdpc3RyeS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2RvY3JlZ2lzdHJ5L2xpYi9taW1lZG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2RvY3JlZ2lzdHJ5L2xpYi9yZWdpc3RyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNtSDtBQUNuRTtBQUNPO0FBQ0s7QUFDSDtBQUNMO0FBQ0k7QUFDYjtBQUNGO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLDhEQUFlO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxxREFBTTtBQUN0QyxnQ0FBZ0MscURBQU07QUFDdEMsOEJBQThCLHFEQUFNO0FBQ3BDLDZCQUE2QixxREFBTTtBQUNuQztBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsbUVBQWM7QUFDOUQ7QUFDQTtBQUNBLGtEQUFrRCx1RUFBcUI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsbUVBQWdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2Isa0JBQWtCLGlFQUFZO0FBQzlCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsb0JBQW9CLGtFQUFlO0FBQ25DLGtDQUFrQyxnRUFBYztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixtRUFBZ0I7QUFDbEMsMkRBQTJELHFCQUFxQjtBQUNoRjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esb0RBQW9ELGtGQUE4QjtBQUNsRjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrREFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHNFQUFlO0FBQ3JDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGtFQUFXO0FBQ2pDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLCtEQUFRO0FBQzlCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGdFQUFTO0FBQy9CO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsZ0VBQVM7QUFDL0I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnRUFBUztBQUMvQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGdFQUFTO0FBQy9CO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsZ0VBQVM7QUFDL0I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixnRUFBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw0Q0FBNEM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtRUFBZ0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywwQkFBMEI7QUFDM0Isb0MiLCJmaWxlIjoicGFja2FnZXNfZG9jcmVnaXN0cnlfbGliX2luZGV4X2pzLmZmZWU5MTcyM2MzMmVjZWVmYmE2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgRGlhbG9nLCBTZXNzaW9uQ29udGV4dCwgc2Vzc2lvbkNvbnRleHREaWFsb2dzLCBzaG93RGlhbG9nLCBzaG93RXJyb3JNZXNzYWdlIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgUGF0aEV4dCB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBQcm92aWRlck1vY2sgfSBmcm9tICdAanVweXRlcmxhYi9kb2Nwcm92aWRlcic7XG5pbXBvcnQgeyBSZW5kZXJNaW1lUmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9yZW5kZXJtaW1lJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgUHJvbWlzZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgRGlzcG9zYWJsZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9kaXNwb3NhYmxlJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIGEgZG9jdW1lbnQgY29udGV4dC5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIHR5cGljYWxseSBpbnN0YW50aWF0ZWQgYnkgdGhlIGRvY3VtZW50IG1hbmFnZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250ZXh0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgZG9jdW1lbnQgY29udGV4dC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX3BhdGggPSAnJztcbiAgICAgICAgdGhpcy5fbGluZUVuZGluZyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRzTW9kZWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9wb3B1bGF0ZWRQcm9taXNlID0gbmV3IFByb21pc2VEZWxlZ2F0ZSgpO1xuICAgICAgICB0aGlzLl9pc1BvcHVsYXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGF0aENoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9maWxlQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3NhdmVTdGF0ZSA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fbGFzdE1vZGlmaWVkQ2hlY2tNYXJnaW4gPSA1MDA7XG4gICAgICAgIHRoaXMuX3RpbWVDb25mbGljdE1vZGFsSXNPcGVuID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSAodGhpcy5fbWFuYWdlciA9IG9wdGlvbnMubWFuYWdlcik7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICB0aGlzLl9mYWN0b3J5ID0gb3B0aW9ucy5mYWN0b3J5O1xuICAgICAgICB0aGlzLl9kaWFsb2dzID0gb3B0aW9ucy5zZXNzaW9uRGlhbG9ncyB8fCBzZXNzaW9uQ29udGV4dERpYWxvZ3M7XG4gICAgICAgIHRoaXMuX29wZW5lciA9IG9wdGlvbnMub3BlbmVyIHx8IFByaXZhdGUubm9PcDtcbiAgICAgICAgdGhpcy5fcGF0aCA9IHRoaXMuX21hbmFnZXIuY29udGVudHMubm9ybWFsaXplKG9wdGlvbnMucGF0aCk7XG4gICAgICAgIHRoaXMuX2xhc3RNb2RpZmllZENoZWNrTWFyZ2luID0gb3B0aW9ucy5sYXN0TW9kaWZpZWRDaGVja01hcmdpbiB8fCA1MDA7XG4gICAgICAgIGNvbnN0IGxvY2FsUGF0aCA9IHRoaXMuX21hbmFnZXIuY29udGVudHMubG9jYWxQYXRoKHRoaXMuX3BhdGgpO1xuICAgICAgICBjb25zdCBsYW5nID0gdGhpcy5fZmFjdG9yeS5wcmVmZXJyZWRMYW5ndWFnZShQYXRoRXh0LmJhc2VuYW1lKGxvY2FsUGF0aCkpO1xuICAgICAgICBjb25zdCBkYkZhY3RvcnkgPSBvcHRpb25zLm1vZGVsREJGYWN0b3J5O1xuICAgICAgICBpZiAoZGJGYWN0b3J5KSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFBhdGggPSBtYW5hZ2VyLmNvbnRlbnRzLmxvY2FsUGF0aCh0aGlzLl9wYXRoKTtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsREIgPSBkYkZhY3RvcnkuY3JlYXRlTmV3KGxvY2FsUGF0aCk7XG4gICAgICAgICAgICB0aGlzLl9tb2RlbCA9IHRoaXMuX2ZhY3RvcnkuY3JlYXRlTmV3KGxhbmcsIHRoaXMuX21vZGVsREIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsID0gdGhpcy5fZmFjdG9yeS5jcmVhdGVOZXcobGFuZywgdW5kZWZpbmVkLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeW1vZGVsID0gdGhpcy5fbW9kZWwuc2hhcmVkTW9kZWw7IC8vIHRyYW5zbGF0ZSB0byB0aGUgY29uY3JldGUgWWpzIGltcGxlbWVudGF0aW9uXG4gICAgICAgIGNvbnN0IHlkb2MgPSB5bW9kZWwueWRvYztcbiAgICAgICAgdGhpcy5feWRvYyA9IHlkb2M7XG4gICAgICAgIHRoaXMuX3ljb250ZXh0ID0geWRvYy5nZXRNYXAoJ2NvbnRleHQnKTtcbiAgICAgICAgY29uc3QgZG9jUHJvdmlkZXJGYWN0b3J5ID0gb3B0aW9ucy5kb2NQcm92aWRlckZhY3Rvcnk7XG4gICAgICAgIHRoaXMuX3Byb3ZpZGVyID0gZG9jUHJvdmlkZXJGYWN0b3J5XG4gICAgICAgICAgICA/IGRvY1Byb3ZpZGVyRmFjdG9yeSh7XG4gICAgICAgICAgICAgICAgcGF0aDogdGhpcy5fcGF0aCxcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogdGhpcy5fZmFjdG9yeS5jb250ZW50VHlwZSxcbiAgICAgICAgICAgICAgICB5bW9kZWxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IG5ldyBQcm92aWRlck1vY2soKTtcbiAgICAgICAgdGhpcy5fcmVhZHlQcm9taXNlID0gbWFuYWdlci5yZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wb3B1bGF0ZWRQcm9taXNlLnByb21pc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBleHQgPSBQYXRoRXh0LmV4dG5hbWUodGhpcy5fcGF0aCk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbkNvbnRleHQgPSBuZXcgU2Vzc2lvbkNvbnRleHQoe1xuICAgICAgICAgICAgc2Vzc2lvbk1hbmFnZXI6IG1hbmFnZXIuc2Vzc2lvbnMsXG4gICAgICAgICAgICBzcGVjc01hbmFnZXI6IG1hbmFnZXIua2VybmVsc3BlY3MsXG4gICAgICAgICAgICBwYXRoOiB0aGlzLl9wYXRoLFxuICAgICAgICAgICAgdHlwZTogZXh0ID09PSAnLmlweW5iJyA/ICdub3RlYm9vaycgOiAnZmlsZScsXG4gICAgICAgICAgICBuYW1lOiBQYXRoRXh0LmJhc2VuYW1lKGxvY2FsUGF0aCksXG4gICAgICAgICAgICBrZXJuZWxQcmVmZXJlbmNlOiBvcHRpb25zLmtlcm5lbFByZWZlcmVuY2UgfHwgeyBzaG91bGRTdGFydDogZmFsc2UgfSxcbiAgICAgICAgICAgIHNldEJ1c3k6IG9wdGlvbnMuc2V0QnVzeVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXNzaW9uQ29udGV4dC5wcm9wZXJ0eUNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblNlc3Npb25DaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgbWFuYWdlci5jb250ZW50cy5maWxlQ2hhbmdlZC5jb25uZWN0KHRoaXMuX29uRmlsZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICBjb25zdCB1cmxSZXNvbHZlciA9ICh0aGlzLnVybFJlc29sdmVyID0gbmV3IFJlbmRlck1pbWVSZWdpc3RyeS5VcmxSZXNvbHZlcih7XG4gICAgICAgICAgICBwYXRoOiB0aGlzLl9wYXRoLFxuICAgICAgICAgICAgY29udGVudHM6IG1hbmFnZXIuY29udGVudHNcbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLl95Y29udGV4dC5zZXQoJ3BhdGgnLCB0aGlzLl9wYXRoKTtcbiAgICAgICAgdGhpcy5feWNvbnRleHQub2JzZXJ2ZShldmVudCA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBwYXRoQ2hhbmdlZCA9IGV2ZW50LmNoYW5nZXMua2V5cy5nZXQoJ3BhdGgnKTtcbiAgICAgICAgICAgIGlmIChwYXRoQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1BhdGggPSB0aGlzLl95Y29udGV4dC5nZXQoJ3BhdGgnKTtcbiAgICAgICAgICAgICAgICBpZiAobmV3UGF0aCAmJiBuZXdQYXRoICE9PSBwYXRoQ2hhbmdlZC5vbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB1cmxSZXNvbHZlci5wYXRoID0gbmV3UGF0aDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGF0aCA9IG5ld1BhdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb3ZpZGVyLnNldFBhdGgobmV3UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhdGhDaGFuZ2VkLmVtaXQodGhpcy5wYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gdGhpcy5zZXNzaW9uQ29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0UGF0aChuZXdQYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIHBhdGggY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgcGF0aENoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBtb2RlbCBpcyBzYXZlZCBvciByZXZlcnRlZC5cbiAgICAgKi9cbiAgICBnZXQgZmlsZUNoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWxlQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCBvbiB0aGUgc3RhcnQgYW5kIGVuZCBvZiBhIHNhdmluZyBvcGVyYXRpb24uXG4gICAgICovXG4gICAgZ2V0IHNhdmVTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NhdmVTdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBjb250ZXh0IGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBkaXNwb3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb25maWd1cmFibGUgbWFyZ2luIHVzZWQgdG8gZGV0ZWN0IGRvY3VtZW50IG1vZGlmaWNhdGlvbiBjb25mbGljdHMsIGluIG1pbGxpc2Vjb25kc1xuICAgICAqL1xuICAgIGdldCBsYXN0TW9kaWZpZWRDaGVja01hcmdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhc3RNb2RpZmllZENoZWNrTWFyZ2luO1xuICAgIH1cbiAgICBzZXQgbGFzdE1vZGlmaWVkQ2hlY2tNYXJnaW4odmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbGFzdE1vZGlmaWVkQ2hlY2tNYXJnaW4gPSB2YWx1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBtb2RlbCBhc3NvY2lhdGVkIHdpdGggdGhlIGRvY3VtZW50LlxuICAgICAqL1xuICAgIGdldCBtb2RlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBwYXRoIGFzc29jaWF0ZWQgd2l0aCB0aGUgZG9jdW1lbnQuXG4gICAgICovXG4gICAgZ2V0IHBhdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBsb2NhbCBwYXRoIGFzc29jaWF0ZWQgd2l0aCB0aGUgZG9jdW1lbnQuXG4gICAgICogSWYgdGhlIGRvY3VtZW50IGlzIGluIHRoZSBkZWZhdWx0IG5vdGVib29rIGZpbGUgYnJvd3NlcixcbiAgICAgKiB0aGlzIGlzIHRoZSBzYW1lIGFzIHRoZSBwYXRoLlxuICAgICAqL1xuICAgIGdldCBsb2NhbFBhdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYW5hZ2VyLmNvbnRlbnRzLmxvY2FsUGF0aCh0aGlzLl9wYXRoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgY29udGVudHMgbW9kZWwgYXNzb2NpYXRlZCB3aXRoIHRoZSBkb2N1bWVudC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGUgY29udGVudHMgbW9kZWwgd2lsbCBiZSBudWxsIHVudGlsIHRoZSBjb250ZXh0IGlzIHBvcHVsYXRlZC5cbiAgICAgKiBJdCB3aWxsIGhhdmUgYW4gIGVtcHR5IGBjb250ZW50c2AgZmllbGQuXG4gICAgICovXG4gICAgZ2V0IGNvbnRlbnRzTW9kZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50c01vZGVsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1vZGVsIGZhY3RvcnkgbmFtZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGlzIG5vdCBwYXJ0IG9mIHRoZSBgSUNvbnRleHRgIEFQSS5cbiAgICAgKi9cbiAgICBnZXQgZmFjdG9yeU5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRGlzcG9zZWQgPyAnJyA6IHRoaXMuX2ZhY3RvcnkubmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGVzdCB3aGV0aGVyIHRoZSBjb250ZXh0IGlzIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIGNvbnRleHQuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlc3Npb25Db250ZXh0LmRpc3Bvc2UoKTtcbiAgICAgICAgaWYgKHRoaXMuX21vZGVsREIpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsREIuZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21vZGVsLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fcHJvdmlkZXIuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl9tb2RlbC5zaGFyZWRNb2RlbC5kaXNwb3NlKCk7XG4gICAgICAgIHRoaXMuX3lkb2MuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl9kaXNwb3NlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgIFNpZ25hbC5jbGVhckRhdGEodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNvbnRleHQgaXMgcmVhZHkuXG4gICAgICovXG4gICAgZ2V0IGlzUmVhZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1JlYWR5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2hlbiB0aGUgY29udGV4dCBpcyByZWFkeS5cbiAgICAgKi9cbiAgICBnZXQgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFkeVByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGNvbnRleHQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaXNOZXcgLSBXaGV0aGVyIGl0IGlzIGEgbmV3IGZpbGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB1cG9uIGluaXRpYWxpemF0aW9uLlxuICAgICAqL1xuICAgIGFzeW5jIGluaXRpYWxpemUoaXNOZXcpIHtcbiAgICAgICAgY29uc3QgbG9jayA9IGF3YWl0IHRoaXMuX3Byb3ZpZGVyLmFjcXVpcmVMb2NrKCk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRJc0luaXRpYWxpemVkID0gYXdhaXQgdGhpcy5fcHJvdmlkZXIucmVxdWVzdEluaXRpYWxDb250ZW50KCk7XG4gICAgICAgIGxldCBwcm9taXNlO1xuICAgICAgICBpZiAoaXNOZXcgfHwgY29udGVudElzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLl9zYXZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcm9taXNlID0gdGhpcy5fcmV2ZXJ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIGxvY2sgaXMgcmVsZWFzZWQgYWZ0ZXIgdGhlIGFib3ZlIG9wZXJhdGlvbnMgYXJlIGNvbXBsZXRlZC5cbiAgICAgICAgY29uc3QgZmluYWxseV8gPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9wcm92aWRlci5yZWxlYXNlTG9jayhsb2NrKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gaWYgc2F2ZS9yZXZlcnQgY29tcGxldGVkIHN1Y2Nlc3NmdWxseSwgd2Ugc2V0IHRoZSBpbml0aWFsaXplZCBjb250ZW50IGluIHRoZSBydGMgc2VydmVyLlxuICAgICAgICBwcm9taXNlXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9wcm92aWRlci5wdXRJbml0aWFsaXplZFN0YXRlKCk7XG4gICAgICAgICAgICB0aGlzLl9tb2RlbC5pbml0aWFsaXplKCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmaW5hbGx5XywgZmluYWxseV8pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuYW1lIHRoZSBkb2N1bWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuZXdOYW1lIC0gdGhlIG5ldyBuYW1lIGZvciB0aGUgZG9jdW1lbnQuXG4gICAgICovXG4gICAgcmVuYW1lKG5ld05hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFuYWdlci5yZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuYW1lKG5ld05hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlIHRoZSBkb2N1bWVudCBjb250ZW50cyB0byBkaXNrLlxuICAgICAqL1xuICAgIGFzeW5jIHNhdmUoKSB7XG4gICAgICAgIGNvbnN0IFtsb2NrXSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMuX3Byb3ZpZGVyLmFjcXVpcmVMb2NrKCksXG4gICAgICAgICAgICB0aGlzLnJlYWR5XG4gICAgICAgIF0pO1xuICAgICAgICBsZXQgcHJvbWlzZTtcbiAgICAgICAgcHJvbWlzZSA9IHRoaXMuX3NhdmUoKTtcbiAgICAgICAgLy8gaWYgc2F2ZSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LCB3ZSBzZXQgdGhlIGluaXRpYWxpemVkIGNvbnRlbnQgaW4gdGhlIHJ0YyBzZXJ2ZXIuXG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcHJvdmlkZXIucHV0SW5pdGlhbGl6ZWRTdGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZmluYWxseV8gPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9wcm92aWRlci5yZWxlYXNlTG9jayhsb2NrKTtcbiAgICAgICAgfTtcbiAgICAgICAgcHJvbWlzZS50aGVuKGZpbmFsbHlfLCBmaW5hbGx5Xyk7XG4gICAgICAgIHJldHVybiBhd2FpdCBwcm9taXNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYXZlIHRoZSBkb2N1bWVudCB0byBhIGRpZmZlcmVudCBwYXRoIGNob3NlbiBieSB0aGUgdXNlci5cbiAgICAgKi9cbiAgICBzYXZlQXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWR5XG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJpdmF0ZS5nZXRTYXZlUGF0aCh0aGlzLl9wYXRoKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKG5ld1BhdGggPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCB8fCAhbmV3UGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdQYXRoID09PSB0aGlzLl9wYXRoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2F2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBwYXRoIGRvZXMgbm90IGV4aXN0LlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hbmFnZXIucmVhZHlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hbmFnZXIuY29udGVudHMuZ2V0KG5ld1BhdGgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21heWJlT3ZlcldyaXRlKG5ld1BhdGgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWVyci5yZXNwb25zZSB8fCBlcnIucmVzcG9uc2Uuc3RhdHVzICE9PSA0MDQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZmluaXNoU2F2ZUFzKG5ld1BhdGgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEb3dubG9hZCBhIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIFRoZSBwYXRoIG9mIHRoZSBmaWxlIHRvIGJlIGRvd25sb2FkZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgd2hlbiB0aGUgZmlsZSBoYXMgYmVndW5cbiAgICAgKiAgIGRvd25sb2FkaW5nLlxuICAgICAqL1xuICAgIGFzeW5jIGRvd25sb2FkKCkge1xuICAgICAgICBjb25zdCB1cmwgPSBhd2FpdCB0aGlzLl9tYW5hZ2VyLmNvbnRlbnRzLmdldERvd25sb2FkVXJsKHRoaXMuX3BhdGgpO1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBlbGVtZW50LmhyZWYgPSB1cmw7XG4gICAgICAgIGVsZW1lbnQuZG93bmxvYWQgPSAnJztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgZWxlbWVudC5jbGljaygpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXZlcnQgdGhlIGRvY3VtZW50IGNvbnRlbnRzIHRvIGRpc2sgY29udGVudHMuXG4gICAgICovXG4gICAgYXN5bmMgcmV2ZXJ0KCkge1xuICAgICAgICBjb25zdCBbbG9ja10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLl9wcm92aWRlci5hY3F1aXJlTG9jaygpLFxuICAgICAgICAgICAgdGhpcy5yZWFkeVxuICAgICAgICBdKTtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX3JldmVydCgpO1xuICAgICAgICBjb25zdCBmaW5hbGx5XyA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3ZpZGVyLnJlbGVhc2VMb2NrKGxvY2spO1xuICAgICAgICB9O1xuICAgICAgICBwcm9taXNlLnRoZW4oZmluYWxseV8sIGZpbmFsbHlfKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIGNoZWNrcG9pbnQgZm9yIHRoZSBmaWxlLlxuICAgICAqL1xuICAgIGNyZWF0ZUNoZWNrcG9pbnQoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0gdGhpcy5fbWFuYWdlci5jb250ZW50cztcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hbmFnZXIucmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29udGVudHMuY3JlYXRlQ2hlY2twb2ludCh0aGlzLl9wYXRoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZSBhIGNoZWNrcG9pbnQgZm9yIHRoZSBmaWxlLlxuICAgICAqL1xuICAgIGRlbGV0ZUNoZWNrcG9pbnQoY2hlY2twb2ludElkKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0gdGhpcy5fbWFuYWdlci5jb250ZW50cztcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hbmFnZXIucmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29udGVudHMuZGVsZXRlQ2hlY2twb2ludCh0aGlzLl9wYXRoLCBjaGVja3BvaW50SWQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzdG9yZSB0aGUgZmlsZSB0byBhIGtub3duIGNoZWNrcG9pbnQgc3RhdGUuXG4gICAgICovXG4gICAgcmVzdG9yZUNoZWNrcG9pbnQoY2hlY2twb2ludElkKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRzID0gdGhpcy5fbWFuYWdlci5jb250ZW50cztcbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMuX3BhdGg7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYW5hZ2VyLnJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoZWNrcG9pbnRJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZW50cy5yZXN0b3JlQ2hlY2twb2ludChwYXRoLCBjaGVja3BvaW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdENoZWNrcG9pbnRzKCkudGhlbihjaGVja3BvaW50cyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCB8fCAhY2hlY2twb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hlY2twb2ludElkID0gY2hlY2twb2ludHNbY2hlY2twb2ludHMubGVuZ3RoIC0gMV0uaWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRzLnJlc3RvcmVDaGVja3BvaW50KHBhdGgsIGNoZWNrcG9pbnRJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpc3QgYXZhaWxhYmxlIGNoZWNrcG9pbnRzIGZvciBhIGZpbGUuXG4gICAgICovXG4gICAgbGlzdENoZWNrcG9pbnRzKCkge1xuICAgICAgICBjb25zdCBjb250ZW50cyA9IHRoaXMuX21hbmFnZXIuY29udGVudHM7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYW5hZ2VyLnJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRzLmxpc3RDaGVja3BvaW50cyh0aGlzLl9wYXRoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIHNpYmxpbmcgd2lkZ2V0IHRvIHRoZSBkb2N1bWVudCBtYW5hZ2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldCAtIFRoZSB3aWRnZXQgdG8gYWRkIHRvIHRoZSBkb2N1bWVudCBtYW5hZ2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgZGVzaXJlZCBvcHRpb25zIGZvciBhZGRpbmcgdGhlIHNpYmxpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIGRpc3Bvc2FibGUgdXNlZCB0byByZW1vdmUgdGhlIHNpYmxpbmcgaWYgZGVzaXJlZC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBJdCBpcyBhc3N1bWVkIHRoYXQgdGhlIHdpZGdldCBoYXMgdGhlIHNhbWUgbW9kZWwgYW5kIGNvbnRleHRcbiAgICAgKiBhcyB0aGUgb3JpZ2luYWwgd2lkZ2V0LlxuICAgICAqL1xuICAgIGFkZFNpYmxpbmcod2lkZ2V0LCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3Qgb3BlbmVyID0gdGhpcy5fb3BlbmVyO1xuICAgICAgICBpZiAob3BlbmVyKSB7XG4gICAgICAgICAgICBvcGVuZXIod2lkZ2V0LCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGVEZWxlZ2F0ZSgoKSA9PiB7XG4gICAgICAgICAgICB3aWRnZXQuY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSBvbiB0aGUgY29udGVudHMgbWFuYWdlci5cbiAgICAgKi9cbiAgICBfb25GaWxlQ2hhbmdlZChzZW5kZXIsIGNoYW5nZSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgaWYgKGNoYW5nZS50eXBlICE9PSAncmVuYW1lJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvbGRQYXRoID0gY2hhbmdlLm9sZFZhbHVlICYmIGNoYW5nZS5vbGRWYWx1ZS5wYXRoO1xuICAgICAgICBsZXQgbmV3UGF0aCA9IGNoYW5nZS5uZXdWYWx1ZSAmJiBjaGFuZ2UubmV3VmFsdWUucGF0aDtcbiAgICAgICAgaWYgKG5ld1BhdGggJiYgdGhpcy5fcGF0aC5pbmRleE9mKG9sZFBhdGggfHwgJycpID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgY2hhbmdlTW9kZWwgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgICAgICAvLyBXaGVuIGZvbGRlciBuYW1lIGNoYW5nZWQsIGBvbGRQYXRoYCBpcyBgZm9vYCwgYG5ld1BhdGhgIGlzIGBiYXJgIGFuZCBgdGhpcy5fcGF0aGAgaXMgYGZvby90ZXN0YCxcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCB1cGRhdGUgYGZvby90ZXN0YCB0byBgYmFyL3Rlc3RgIGFzIHdlbGxcbiAgICAgICAgICAgIGlmIChvbGRQYXRoICE9PSB0aGlzLl9wYXRoKSB7XG4gICAgICAgICAgICAgICAgbmV3UGF0aCA9IHRoaXMuX3BhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtvbGRQYXRofS9gKSwgYCR7bmV3UGF0aH0vYCk7XG4gICAgICAgICAgICAgICAgb2xkUGF0aCA9IHRoaXMuX3BhdGg7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIGNsaWVudCBmaWxlIG1vZGVsIGZyb20gZm9sZGVyIGNoYW5nZVxuICAgICAgICAgICAgICAgIGNoYW5nZU1vZGVsID0ge1xuICAgICAgICAgICAgICAgICAgICBsYXN0X21vZGlmaWVkOiAoX2EgPSBjaGFuZ2UubmV3VmFsdWUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jcmVhdGVkLFxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBuZXdQYXRoXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3BhdGggPSBuZXdQYXRoO1xuICAgICAgICAgICAgdm9pZCAoKF9iID0gdGhpcy5zZXNzaW9uQ29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iuc2V0UGF0aChuZXdQYXRoKSk7XG4gICAgICAgICAgICBjb25zdCB1cGRhdGVNb2RlbCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fY29udGVudHNNb2RlbCksIGNoYW5nZU1vZGVsKTtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsUGF0aCA9IHRoaXMuX21hbmFnZXIuY29udGVudHMubG9jYWxQYXRoKG5ld1BhdGgpO1xuICAgICAgICAgICAgdm9pZCAoKF9jID0gdGhpcy5zZXNzaW9uQ29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Muc2V0TmFtZShQYXRoRXh0LmJhc2VuYW1lKGxvY2FsUGF0aCkpKTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUNvbnRlbnRzTW9kZWwodXBkYXRlTW9kZWwpO1xuICAgICAgICAgICAgdGhpcy5feWNvbnRleHQuc2V0KCdwYXRoJywgdGhpcy5fcGF0aCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIGEgc2Vzc2lvbiBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBfb25TZXNzaW9uQ2hhbmdlZChzZW5kZXIsIHR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUgIT09ICdwYXRoJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLnNlc3Npb25Db250ZXh0LnNlc3Npb24ucGF0aDtcbiAgICAgICAgaWYgKHBhdGggIT09IHRoaXMuX3BhdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhdGggPSBwYXRoO1xuICAgICAgICAgICAgdGhpcy5feWNvbnRleHQuc2V0KCdwYXRoJywgdGhpcy5fcGF0aCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIG91ciBjb250ZW50cyBtb2RlbCwgd2l0aG91dCB0aGUgY29udGVudC5cbiAgICAgKi9cbiAgICBfdXBkYXRlQ29udGVudHNNb2RlbChtb2RlbCkge1xuICAgICAgICBjb25zdCBuZXdNb2RlbCA9IHtcbiAgICAgICAgICAgIHBhdGg6IG1vZGVsLnBhdGgsXG4gICAgICAgICAgICBuYW1lOiBtb2RlbC5uYW1lLFxuICAgICAgICAgICAgdHlwZTogbW9kZWwudHlwZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBtb2RlbC53cml0YWJsZSxcbiAgICAgICAgICAgIGNyZWF0ZWQ6IG1vZGVsLmNyZWF0ZWQsXG4gICAgICAgICAgICBsYXN0X21vZGlmaWVkOiBtb2RlbC5sYXN0X21vZGlmaWVkLFxuICAgICAgICAgICAgbWltZXR5cGU6IG1vZGVsLm1pbWV0eXBlLFxuICAgICAgICAgICAgZm9ybWF0OiBtb2RlbC5mb3JtYXRcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgbW9kID0gdGhpcy5fY29udGVudHNNb2RlbCA/IHRoaXMuX2NvbnRlbnRzTW9kZWwubGFzdF9tb2RpZmllZCA6IG51bGw7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRzTW9kZWwgPSBuZXdNb2RlbDtcbiAgICAgICAgdGhpcy5feWNvbnRleHQuc2V0KCdsYXN0X21vZGlmaWVkJywgbmV3TW9kZWwubGFzdF9tb2RpZmllZCk7XG4gICAgICAgIGlmICghbW9kIHx8IG5ld01vZGVsLmxhc3RfbW9kaWZpZWQgIT09IG1vZCkge1xuICAgICAgICAgICAgdGhpcy5fZmlsZUNoYW5nZWQuZW1pdChuZXdNb2RlbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGFuIGluaXRpYWwgcG9wdWxhdGlvbi5cbiAgICAgKi9cbiAgICBfcG9wdWxhdGUoKSB7XG4gICAgICAgIHRoaXMuX2lzUG9wdWxhdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5faXNSZWFkeSA9IHRydWU7XG4gICAgICAgIHRoaXMuX3BvcHVsYXRlZFByb21pc2UucmVzb2x2ZSh2b2lkIDApO1xuICAgICAgICAvLyBBZGQgYSBjaGVja3BvaW50IGlmIG5vbmUgZXhpc3RzIGFuZCB0aGUgZmlsZSBpcyB3cml0YWJsZS5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21heWJlQ2hlY2twb2ludChmYWxzZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBrZXJuZWwgcHJlZmVyZW5jZS5cbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLl9tb2RlbC5kZWZhdWx0S2VybmVsTmFtZSB8fFxuICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbkNvbnRleHQua2VybmVsUHJlZmVyZW5jZS5uYW1lO1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uQ29udGV4dC5rZXJuZWxQcmVmZXJlbmNlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLnNlc3Npb25Db250ZXh0Lmtlcm5lbFByZWZlcmVuY2UpLCB7IG5hbWUsIGxhbmd1YWdlOiB0aGlzLl9tb2RlbC5kZWZhdWx0S2VybmVsTGFuZ3VhZ2UgfSk7XG4gICAgICAgICAgICAvLyBOb3RlOiB3ZSBkb24ndCB3YWl0IG9uIHRoZSBzZXNzaW9uIHRvIGluaXRpYWxpemVcbiAgICAgICAgICAgIC8vIHNvIHRoYXQgdGhlIHVzZXIgY2FuIGJlIHNob3duIHRoZSBjb250ZW50IGJlZm9yZVxuICAgICAgICAgICAgLy8gYW55IGtlcm5lbCBoYXMgc3RhcnRlZC5cbiAgICAgICAgICAgIHZvaWQgdGhpcy5zZXNzaW9uQ29udGV4dC5pbml0aWFsaXplKCkudGhlbihzaG91bGRTZWxlY3QgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGRTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCB0aGlzLl9kaWFsb2dzLnNlbGVjdEtlcm5lbCh0aGlzLnNlc3Npb25Db250ZXh0LCB0aGlzLnRyYW5zbGF0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuYW1lIHRoZSBkb2N1bWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuZXdOYW1lIC0gdGhlIG5ldyBuYW1lIGZvciB0aGUgZG9jdW1lbnQuXG4gICAgICovXG4gICAgYXN5bmMgX3JlbmFtZShuZXdOYW1lKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IHNwbGl0UGF0aCA9IHRoaXMucGF0aC5zcGxpdCgnLycpO1xuICAgICAgICBzcGxpdFBhdGhbc3BsaXRQYXRoLmxlbmd0aCAtIDFdID0gbmV3TmFtZTtcbiAgICAgICAgY29uc3QgbmV3UGF0aCA9IHNwbGl0UGF0aC5qb2luKCcvJyk7XG4gICAgICAgIGF3YWl0IHRoaXMuX21hbmFnZXIuY29udGVudHMucmVuYW1lKHRoaXMucGF0aCwgbmV3UGF0aCk7XG4gICAgICAgIGF3YWl0ICgoX2EgPSB0aGlzLnNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRQYXRoKG5ld1BhdGgpKTtcbiAgICAgICAgYXdhaXQgKChfYiA9IHRoaXMuc2Vzc2lvbkNvbnRleHQuc2Vzc2lvbikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnNldE5hbWUobmV3TmFtZSkpO1xuICAgICAgICB0aGlzLl9wYXRoID0gbmV3UGF0aDtcbiAgICAgICAgdGhpcy5feWNvbnRleHQuc2V0KCdwYXRoJywgdGhpcy5fcGF0aCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhdmUgdGhlIGRvY3VtZW50IGNvbnRlbnRzIHRvIGRpc2suXG4gICAgICovXG4gICAgYXN5bmMgX3NhdmUoKSB7XG4gICAgICAgIHRoaXMuX3NhdmVTdGF0ZS5lbWl0KCdzdGFydGVkJyk7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5fbW9kZWw7XG4gICAgICAgIGxldCBjb250ZW50O1xuICAgICAgICBpZiAodGhpcy5fZmFjdG9yeS5maWxlRm9ybWF0ID09PSAnanNvbicpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBtb2RlbC50b0pTT04oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSBtb2RlbC50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xpbmVFbmRpbmcpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9cXG4vZywgdGhpcy5fbGluZUVuZGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHR5cGU6IHRoaXMuX2ZhY3RvcnkuY29udGVudFR5cGUsXG4gICAgICAgICAgICBmb3JtYXQ6IHRoaXMuX2ZhY3RvcnkuZmlsZUZvcm1hdCxcbiAgICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX21hbmFnZXIucmVhZHk7XG4gICAgICAgICAgICBpZiAoIW1vZGVsLm1vZGVsREIuaXNDb2xsYWJvcmF0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBhd2FpdCB0aGlzLl9tYXliZVNhdmUob3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGF3YWl0IHRoaXMuX21hbmFnZXIuY29udGVudHMuc2F2ZSh0aGlzLl9wYXRoLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtb2RlbC5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ29udGVudHNNb2RlbCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzUG9wdWxhdGVkKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fcG9wdWxhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEVtaXQgY29tcGxldGlvbi5cbiAgICAgICAgICAgIHRoaXMuX3NhdmVTdGF0ZS5lbWl0KCdjb21wbGV0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgc2F2ZSBoYXMgYmVlbiBjYW5jZWxlZCBieSB0aGUgdXNlcixcbiAgICAgICAgICAgIC8vIHRocm93IHRoZSBlcnJvciBzbyB0aGF0IHdob2V2ZXIgY2FsbGVkIHNhdmUoKVxuICAgICAgICAgICAgLy8gY2FuIGRlY2lkZSB3aGF0IHRvIGRvLlxuICAgICAgICAgICAgaWYgKGVyci5tZXNzYWdlID09PSAnQ2FuY2VsJyB8fFxuICAgICAgICAgICAgICAgIGVyci5tZXNzYWdlID09PSAnTW9kYWwgaXMgYWxyZWFkeSBkaXNwbGF5ZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHNob3cgYW4gZXJyb3IgbWVzc2FnZSBhbmQgdGhyb3cgdGhlIGVycm9yLlxuICAgICAgICAgICAgY29uc3QgbG9jYWxQYXRoID0gdGhpcy5fbWFuYWdlci5jb250ZW50cy5sb2NhbFBhdGgodGhpcy5fcGF0aCk7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gUGF0aEV4dC5iYXNlbmFtZShsb2NhbFBhdGgpO1xuICAgICAgICAgICAgdm9pZCB0aGlzLl9oYW5kbGVFcnJvcihlcnIsIHRoaXMuX3RyYW5zLl9fKCdGaWxlIFNhdmUgRXJyb3IgZm9yICUxJywgbmFtZSkpO1xuICAgICAgICAgICAgLy8gRW1pdCBmYWlsdXJlLlxuICAgICAgICAgICAgdGhpcy5fc2F2ZVN0YXRlLmVtaXQoJ2ZhaWxlZCcpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldmVydCB0aGUgZG9jdW1lbnQgY29udGVudHMgdG8gZGlzayBjb250ZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpbml0aWFsaXplTW9kZWwgLSBjYWxsIHRoZSBtb2RlbCdzIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uIGFmdGVyXG4gICAgICogZGVzZXJpYWxpemluZyB0aGUgY29udGVudC5cbiAgICAgKi9cbiAgICBfcmV2ZXJ0KGluaXRpYWxpemVNb2RlbCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHsgdHlwZTogdGhpcy5fZmFjdG9yeS5jb250ZW50VHlwZSwgY29udGVudDogdGhpcy5fZmFjdG9yeS5maWxlRm9ybWF0ICE9PSBudWxsIH0sICh0aGlzLl9mYWN0b3J5LmZpbGVGb3JtYXQgIT09IG51bGxcbiAgICAgICAgICAgID8geyBmb3JtYXQ6IHRoaXMuX2ZhY3RvcnkuZmlsZUZvcm1hdCB9XG4gICAgICAgICAgICA6IHt9KSk7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLl9wYXRoO1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMuX21vZGVsO1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFuYWdlci5yZWFkeVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hbmFnZXIuY29udGVudHMuZ2V0KHBhdGgsIG9wdHMpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oY29udGVudHMgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb250ZW50cy5mb3JtYXQgPT09ICdqc29uJykge1xuICAgICAgICAgICAgICAgIG1vZGVsLmZyb21KU09OKGNvbnRlbnRzLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChpbml0aWFsaXplTW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gY29udGVudHMuY29udGVudDtcbiAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IGxpbmUgZW5kaW5ncyBpZiBuZWNlc3NhcnksIG1hcmtpbmcgdGhlIGZpbGVcbiAgICAgICAgICAgICAgICAvLyBhcyBkaXJ0eS5cbiAgICAgICAgICAgICAgICBpZiAoY29udGVudC5pbmRleE9mKCdcXHJcXG4nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGluZUVuZGluZyA9ICdcXHJcXG4nO1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb250ZW50LmluZGV4T2YoJ1xccicpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9saW5lRW5kaW5nID0gJ1xccic7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoL1xcci9nLCAnXFxuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9saW5lRW5kaW5nID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbW9kZWwuZnJvbVN0cmluZyhjb250ZW50KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbGl6ZU1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmluaXRpYWxpemUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDb250ZW50c01vZGVsKGNvbnRlbnRzKTtcbiAgICAgICAgICAgIG1vZGVsLmRpcnR5ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzUG9wdWxhdGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BvcHVsYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goYXN5bmMgKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxQYXRoID0gdGhpcy5fbWFuYWdlci5jb250ZW50cy5sb2NhbFBhdGgodGhpcy5fcGF0aCk7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gUGF0aEV4dC5iYXNlbmFtZShsb2NhbFBhdGgpO1xuICAgICAgICAgICAgdm9pZCB0aGlzLl9oYW5kbGVFcnJvcihlcnIsIHRoaXMuX3RyYW5zLl9fKCdGaWxlIExvYWQgRXJyb3IgZm9yICUxJywgbmFtZSkpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2F2ZSBhIGZpbGUsIGRlYWxpbmcgd2l0aCBjb25mbGljdHMuXG4gICAgICovXG4gICAgX21heWJlU2F2ZShvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLl9wYXRoO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGZpbGUgaGFzIG5vdCBjaGFuZ2VkIG9uIGRpc2suXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl9tYW5hZ2VyLmNvbnRlbnRzLmdldChwYXRoLCB7IGNvbnRlbnQ6IGZhbHNlIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKG1vZGVsID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdEaXNwb3NlZCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdlIHdhbnQgdG8gY2hlY2sgbGFzdF9tb2RpZmllZCAoZGlzaykgPiBsYXN0X21vZGlmaWVkIChjbGllbnQpXG4gICAgICAgICAgICAvLyAob3VyIGxhc3Qgc2F2ZSlcbiAgICAgICAgICAgIC8vIEluIHNvbWUgY2FzZXMgdGhlIGZpbGVzeXN0ZW0gcmVwb3J0cyBhbiBpbmNvbnNpc3RlbnQgdGltZSwgc28gd2UgYWxsb3cgYnVmZmVyIHdoZW4gY29tcGFyaW5nLlxuICAgICAgICAgICAgY29uc3QgbGFzdE1vZGlmaWVkQ2hlY2tNYXJnaW4gPSB0aGlzLl9sYXN0TW9kaWZpZWRDaGVja01hcmdpbjtcbiAgICAgICAgICAgIGNvbnN0IHljb250ZXh0TW9kaWZpZWQgPSB0aGlzLl95Y29udGV4dC5nZXQoJ2xhc3RfbW9kaWZpZWQnKTtcbiAgICAgICAgICAgIC8vIHByZWZlciB1c2luZyB0aGUgdGltZXN0YW1wIGZyb20geWNvbnRleHQgYmVjYXVzZSBpdCBpcyBtb3JlIHVwIHRvIGRhdGVcbiAgICAgICAgICAgIGNvbnN0IG1vZGlmaWVkID0geWNvbnRleHRNb2RpZmllZCB8fCAoKF9hID0gdGhpcy5jb250ZW50c01vZGVsKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGFzdF9tb2RpZmllZCk7XG4gICAgICAgICAgICBjb25zdCB0Q2xpZW50ID0gbW9kaWZpZWQgPyBuZXcgRGF0ZShtb2RpZmllZCkgOiBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgdERpc2sgPSBuZXcgRGF0ZShtb2RlbC5sYXN0X21vZGlmaWVkKTtcbiAgICAgICAgICAgIGlmIChtb2RpZmllZCAmJlxuICAgICAgICAgICAgICAgIHREaXNrLmdldFRpbWUoKSAtIHRDbGllbnQuZ2V0VGltZSgpID4gbGFzdE1vZGlmaWVkQ2hlY2tNYXJnaW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGltZUNvbmZsaWN0KHRDbGllbnQsIG1vZGVsLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYW5hZ2VyLmNvbnRlbnRzLnNhdmUocGF0aCwgb3B0aW9ucyk7XG4gICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyLnJlc3BvbnNlICYmIGVyci5yZXNwb25zZS5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYW5hZ2VyLmNvbnRlbnRzLnNhdmUocGF0aCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBzYXZlL2xvYWQgZXJyb3Igd2l0aCBhIGRpYWxvZy5cbiAgICAgKi9cbiAgICBhc3luYyBfaGFuZGxlRXJyb3IoZXJyLCB0aXRsZSkge1xuICAgICAgICBhd2FpdCBzaG93RXJyb3JNZXNzYWdlKHRpdGxlLCBlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIGNoZWNrcG9pbnQgdGhlIGZpbGUgaXMgd3JpdGFibGUuXG4gICAgICovXG4gICAgX21heWJlQ2hlY2twb2ludChmb3JjZSkge1xuICAgICAgICBsZXQgd3JpdGFibGUgPSB0aGlzLl9jb250ZW50c01vZGVsICYmIHRoaXMuX2NvbnRlbnRzTW9kZWwud3JpdGFibGU7XG4gICAgICAgIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHZvaWQgMCk7XG4gICAgICAgIGlmICghd3JpdGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JjZSkge1xuICAgICAgICAgICAgcHJvbWlzZSA9IHRoaXMuY3JlYXRlQ2hlY2twb2ludCgpLnRoZW4oIC8qIG5vLW9wICovKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByb21pc2UgPSB0aGlzLmxpc3RDaGVja3BvaW50cygpLnRoZW4oY2hlY2twb2ludHMgPT4ge1xuICAgICAgICAgICAgICAgIHdyaXRhYmxlID0gdGhpcy5fY29udGVudHNNb2RlbCAmJiB0aGlzLl9jb250ZW50c01vZGVsLndyaXRhYmxlO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0Rpc3Bvc2VkICYmICFjaGVja3BvaW50cy5sZW5ndGggJiYgd3JpdGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ2hlY2twb2ludCgpLnRoZW4oIC8qIG5vLW9wICovKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvbWlzZS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGEgcmVhZC1vbmx5IGZvbGRlci5cbiAgICAgICAgICAgIGlmICghZXJyLnJlc3BvbnNlIHx8IGVyci5yZXNwb25zZS5zdGF0dXMgIT09IDQwMykge1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIHRpbWUgY29uZmxpY3QuXG4gICAgICovXG4gICAgX3RpbWVDb25mbGljdCh0Q2xpZW50LCBtb2RlbCwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCB0RGlzayA9IG5ldyBEYXRlKG1vZGVsLmxhc3RfbW9kaWZpZWQpO1xuICAgICAgICBjb25zb2xlLndhcm4oYExhc3Qgc2F2aW5nIHBlcmZvcm1lZCAke3RDbGllbnR9IGAgK1xuICAgICAgICAgICAgYHdoaWxlIHRoZSBjdXJyZW50IGZpbGUgc2VlbXMgdG8gaGF2ZSBiZWVuIHNhdmVkIGAgK1xuICAgICAgICAgICAgYCR7dERpc2t9YCk7XG4gICAgICAgIGlmICh0aGlzLl90aW1lQ29uZmxpY3RNb2RhbElzT3Blbikge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignTW9kYWwgaXMgYWxyZWFkeSBkaXNwbGF5ZWQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYm9keSA9IHRoaXMuX3RyYW5zLl9fKGBcIiUxXCIgaGFzIGNoYW5nZWQgb24gZGlzayBzaW5jZSB0aGUgbGFzdCB0aW1lIGl0IHdhcyBvcGVuZWQgb3Igc2F2ZWQuXG5EbyB5b3Ugd2FudCB0byBvdmVyd3JpdGUgdGhlIGZpbGUgb24gZGlzayB3aXRoIHRoZSB2ZXJzaW9uIG9wZW4gaGVyZSxcbm9yIGxvYWQgdGhlIHZlcnNpb24gb24gZGlzayAocmV2ZXJ0KT9gLCB0aGlzLnBhdGgpO1xuICAgICAgICBjb25zdCByZXZlcnRCdG4gPSBEaWFsb2cub2tCdXR0b24oeyBsYWJlbDogdGhpcy5fdHJhbnMuX18oJ1JldmVydCcpIH0pO1xuICAgICAgICBjb25zdCBvdmVyd3JpdGVCdG4gPSBEaWFsb2cud2FybkJ1dHRvbih7XG4gICAgICAgICAgICBsYWJlbDogdGhpcy5fdHJhbnMuX18oJ092ZXJ3cml0ZScpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl90aW1lQ29uZmxpY3RNb2RhbElzT3BlbiA9IHRydWU7XG4gICAgICAgIHJldHVybiBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLl90cmFucy5fXygnRmlsZSBDaGFuZ2VkJyksXG4gICAgICAgICAgICBib2R5LFxuICAgICAgICAgICAgYnV0dG9uczogW0RpYWxvZy5jYW5jZWxCdXR0b24oKSwgcmV2ZXJ0QnRuLCBvdmVyd3JpdGVCdG5dXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVDb25mbGljdE1vZGFsSXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignRGlzcG9zZWQnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzdWx0LmJ1dHRvbi5sYWJlbCA9PT0gdGhpcy5fdHJhbnMuX18oJ092ZXJ3cml0ZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hbmFnZXIuY29udGVudHMuc2F2ZSh0aGlzLl9wYXRoLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEZJWE1FLVRSQU5TOiBXaHkgY29tcGFyZSB0byBsYWJlbD9cbiAgICAgICAgICAgIGlmIChyZXN1bHQuYnV0dG9uLmxhYmVsID09PSB0aGlzLl90cmFucy5fXygnUmV2ZXJ0JykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZXZlcnQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignQ2FuY2VsJykpOyAvLyBPdGhlcndpc2UgY2FuY2VsIHRoZSBzYXZlLlxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgdGltZSBjb25mbGljdC5cbiAgICAgKi9cbiAgICBfbWF5YmVPdmVyV3JpdGUocGF0aCkge1xuICAgICAgICBjb25zdCBib2R5ID0gdGhpcy5fdHJhbnMuX18oJ1wiJTFcIiBhbHJlYWR5IGV4aXN0cy4gRG8geW91IHdhbnQgdG8gcmVwbGFjZSBpdD8nLCBwYXRoKTtcbiAgICAgICAgY29uc3Qgb3ZlcndyaXRlQnRuID0gRGlhbG9nLndhcm5CdXR0b24oe1xuICAgICAgICAgICAgbGFiZWw6IHRoaXMuX3RyYW5zLl9fKCdPdmVyd3JpdGUnKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgdGl0bGU6IHRoaXMuX3RyYW5zLl9fKCdGaWxlIE92ZXJ3cml0ZT8nKSxcbiAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICBidXR0b25zOiBbRGlhbG9nLmNhbmNlbEJ1dHRvbigpLCBvdmVyd3JpdGVCdG5dXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdEaXNwb3NlZCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEZJWE1FLVRSQU5TOiBXaHkgY29tcGFyZSB0byBsYWJlbD9cbiAgICAgICAgICAgIGlmIChyZXN1bHQuYnV0dG9uLmxhYmVsID09PSB0aGlzLl90cmFucy5fXygnT3ZlcndyaXRlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFuYWdlci5jb250ZW50cy5kZWxldGUocGF0aCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9maW5pc2hTYXZlQXMocGF0aCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5pc2ggYSBzYXZlQXMgb3BlcmF0aW9uIGdpdmVuIGEgbmV3IHBhdGguXG4gICAgICovXG4gICAgYXN5bmMgX2ZpbmlzaFNhdmVBcyhuZXdQYXRoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHRoaXMuX3BhdGggPSBuZXdQYXRoO1xuICAgICAgICBhd2FpdCAoKF9hID0gdGhpcy5zZXNzaW9uQ29udGV4dC5zZXNzaW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0UGF0aChuZXdQYXRoKSk7XG4gICAgICAgIGF3YWl0ICgoX2IgPSB0aGlzLnNlc3Npb25Db250ZXh0LnNlc3Npb24pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5zZXROYW1lKG5ld1BhdGguc3BsaXQoJy8nKS5wb3AoKSkpO1xuICAgICAgICBhd2FpdCB0aGlzLnNhdmUoKTtcbiAgICAgICAgdGhpcy5feWNvbnRleHQuc2V0KCdwYXRoJywgdGhpcy5fcGF0aCk7XG4gICAgICAgIGF3YWl0IHRoaXMuX21heWJlQ2hlY2twb2ludCh0cnVlKTtcbiAgICB9XG59XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogR2V0IGEgbmV3IGZpbGUgcGF0aCBmcm9tIHRoZSB1c2VyLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFNhdmVQYXRoKHBhdGgsIHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIGNvbnN0IHNhdmVCdG4gPSBEaWFsb2cub2tCdXR0b24oeyBsYWJlbDogdHJhbnMuX18oJ1NhdmUnKSB9KTtcbiAgICAgICAgcmV0dXJuIHNob3dEaWFsb2coe1xuICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdTYXZlIEZpbGUgQXMuLicpLFxuICAgICAgICAgICAgYm9keTogbmV3IFNhdmVXaWRnZXQocGF0aCksXG4gICAgICAgICAgICBidXR0b25zOiBbRGlhbG9nLmNhbmNlbEJ1dHRvbigpLCBzYXZlQnRuXVxuICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAvLyBGSVhNRS1UUkFOUzogV2h5IHVzZSB0aGUgbGFiZWw/XG4gICAgICAgICAgICBpZiAocmVzdWx0LmJ1dHRvbi5sYWJlbCA9PT0gdHJhbnMuX18oJ1NhdmUnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoX2EgPSByZXN1bHQudmFsdWUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFByaXZhdGUuZ2V0U2F2ZVBhdGggPSBnZXRTYXZlUGF0aDtcbiAgICAvKipcbiAgICAgKiBBIG5vLW9wIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5vT3AoKSB7XG4gICAgICAgIC8qIG5vLW9wICovXG4gICAgfVxuICAgIFByaXZhdGUubm9PcCA9IG5vT3A7XG4gICAgLypcbiAgICAgKiBBIHdpZGdldCB0aGF0IGdldHMgYSBmaWxlIHBhdGggZnJvbSBhIHVzZXIuXG4gICAgICovXG4gICAgY2xhc3MgU2F2ZVdpZGdldCBleHRlbmRzIFdpZGdldCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgc2F2ZSB3aWRnZXQuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3RvcihwYXRoKSB7XG4gICAgICAgICAgICBzdXBlcih7IG5vZGU6IGNyZWF0ZVNhdmVOb2RlKHBhdGgpIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIHZhbHVlIGZvciB0aGUgd2lkZ2V0LlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgbm9kZSBmb3IgYSBzYXZlIHdpZGdldC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVTYXZlTm9kZShwYXRoKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSBwYXRoO1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250ZXh0LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IE1haW5BcmVhV2lkZ2V0LCBzZXRUb29sYmFyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgQ29kZUVkaXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL2NvZGVlZGl0b3InO1xuaW1wb3J0IHsgTW9kZSB9IGZyb20gJ0BqdXB5dGVybGFiL2NvZGVtaXJyb3InO1xuaW1wb3J0IHsgUGF0aEV4dCB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgKiBhcyBtb2RlbHMgZnJvbSAnQGp1cHl0ZXJsYWIvc2hhcmVkLW1vZGVscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbi8qKlxuICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYSBkb2N1bWVudCBtb2RlbC5cbiAqL1xuZXhwb3J0IGNsYXNzIERvY3VtZW50TW9kZWwgZXh0ZW5kcyBDb2RlRWRpdG9yLk1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgZG9jdW1lbnQgbW9kZWwuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobGFuZ3VhZ2VQcmVmZXJlbmNlLCBtb2RlbERCKSB7XG4gICAgICAgIHN1cGVyKHsgbW9kZWxEQiB9KTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdExhbmcgPSAnJztcbiAgICAgICAgdGhpcy5fcmVhZE9ubHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29udGVudENoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9zdGF0ZUNoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9kZWZhdWx0TGFuZyA9IGxhbmd1YWdlUHJlZmVyZW5jZSB8fCAnJztcbiAgICAgICAgY29uc3QgZmlsZW1vZGVsID0gbmV3IG1vZGVscy5ZRmlsZSgpO1xuICAgICAgICB0aGlzLnN3aXRjaFNoYXJlZE1vZGVsKGZpbGVtb2RlbCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMudmFsdWUuY2hhbmdlZC5jb25uZWN0KHRoaXMudHJpZ2dlckNvbnRlbnRDaGFuZ2UsIHRoaXMpO1xuICAgICAgICB0aGlzLnNoYXJlZE1vZGVsLmRpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hhcmVkTW9kZWwuY2hhbmdlZC5jb25uZWN0KHRoaXMuX29uU3RhdGVDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBkb2N1bWVudCBjb250ZW50IGNoYW5nZXMuXG4gICAgICovXG4gICAgZ2V0IGNvbnRlbnRDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudENoYW5nZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgc2lnbmFsIGVtaXR0ZWQgd2hlbiB0aGUgZG9jdW1lbnQgc3RhdGUgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgc3RhdGVDaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGVDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZGlydHkgc3RhdGUgb2YgdGhlIGRvY3VtZW50LlxuICAgICAqL1xuICAgIGdldCBkaXJ0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkTW9kZWwuZGlydHk7XG4gICAgfVxuICAgIHNldCBkaXJ0eShuZXdWYWx1ZSkge1xuICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRoaXMuZGlydHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoYXJlZE1vZGVsLmRpcnR5ID0gbmV3VmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSByZWFkIG9ubHkgc3RhdGUgb2YgdGhlIGRvY3VtZW50LlxuICAgICAqL1xuICAgIGdldCByZWFkT25seSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRPbmx5O1xuICAgIH1cbiAgICBzZXQgcmVhZE9ubHkobmV3VmFsdWUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0aGlzLl9yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5fcmVhZE9ubHk7XG4gICAgICAgIHRoaXMuX3JlYWRPbmx5ID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMudHJpZ2dlclN0YXRlQ2hhbmdlKHsgbmFtZTogJ3JlYWRPbmx5Jywgb2xkVmFsdWUsIG5ld1ZhbHVlIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBrZXJuZWwgbmFtZSBvZiB0aGUgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBhIHJlYWQtb25seSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBnZXQgZGVmYXVsdEtlcm5lbE5hbWUoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQga2VybmVsIGxhbmd1YWdlIG9mIHRoZSBkb2N1bWVudC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGlzIGEgcmVhZC1vbmx5IHByb3BlcnR5LlxuICAgICAqL1xuICAgIGdldCBkZWZhdWx0S2VybmVsTGFuZ3VhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhdWx0TGFuZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VyaWFsaXplIHRoZSBtb2RlbCB0byBhIHN0cmluZy5cbiAgICAgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUudGV4dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVzZXJpYWxpemUgdGhlIG1vZGVsIGZyb20gYSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogU2hvdWxkIGVtaXQgYSBbY29udGVudENoYW5nZWRdIHNpZ25hbC5cbiAgICAgKi9cbiAgICBmcm9tU3RyaW5nKHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWUudGV4dCA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXJpYWxpemUgdGhlIG1vZGVsIHRvIEpTT04uXG4gICAgICovXG4gICAgdG9KU09OKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLnZhbHVlLnRleHQgfHwgJ251bGwnKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVzZXJpYWxpemUgdGhlIG1vZGVsIGZyb20gSlNPTi5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBTaG91bGQgZW1pdCBhIFtjb250ZW50Q2hhbmdlZF0gc2lnbmFsLlxuICAgICAqL1xuICAgIGZyb21KU09OKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZnJvbVN0cmluZyhKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBtb2RlbCB3aXRoIGl0cyBjdXJyZW50IHN0YXRlLlxuICAgICAqL1xuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVHJpZ2dlciBhIHN0YXRlIGNoYW5nZSBzaWduYWwuXG4gICAgICovXG4gICAgdHJpZ2dlclN0YXRlQ2hhbmdlKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5fc3RhdGVDaGFuZ2VkLmVtaXQoYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyaWdnZXIgYSBjb250ZW50IGNoYW5nZWQgc2lnbmFsLlxuICAgICAqL1xuICAgIHRyaWdnZXJDb250ZW50Q2hhbmdlKCkge1xuICAgICAgICB0aGlzLl9jb250ZW50Q2hhbmdlZC5lbWl0KHZvaWQgMCk7XG4gICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBfb25TdGF0ZUNoYW5nZWQoc2VuZGVyLCBjaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnN0YXRlQ2hhbmdlKSB7XG4gICAgICAgICAgICBjaGFuZ2VzLnN0YXRlQ2hhbmdlLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5uYW1lICE9PSAnZGlydHknIHx8IHZhbHVlLm9sZFZhbHVlICE9PSB2YWx1ZS5uZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJTdGF0ZUNoYW5nZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIGEgbW9kZWwgZmFjdG9yeSBmb3IgdGV4dCBmaWxlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFRleHRNb2RlbEZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCB0eXBlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgYSByZWFkLW9ubHkgcHJvcGVydHkuXG4gICAgICovXG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiAndGV4dCc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB0eXBlIG9mIHRoZSBmaWxlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgYSByZWFkLW9ubHkgcHJvcGVydHkuXG4gICAgICovXG4gICAgZ2V0IGNvbnRlbnRUeXBlKCkge1xuICAgICAgICByZXR1cm4gJ2ZpbGUnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZm9ybWF0IG9mIHRoZSBmaWxlLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBhIHJlYWQtb25seSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBnZXQgZmlsZUZvcm1hdCgpIHtcbiAgICAgICAgcmV0dXJuICd0ZXh0JztcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHdoZXRoZXIgdGhlIG1vZGVsIGZhY3RvcnkgaGFzIGJlZW4gZGlzcG9zZWQuXG4gICAgICovXG4gICAgZ2V0IGlzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwb3NlIG9mIHRoZSByZXNvdXJjZXMgaGVsZCBieSB0aGUgbW9kZWwgZmFjdG9yeS5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IG1vZGVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxhbmd1YWdlUHJlZmVyZW5jZSAtIEFuIG9wdGlvbmFsIGtlcm5lbCBsYW5ndWFnZSBwcmVmZXJlbmNlLlxuICAgICAqIEBwYXJhbSBtb2RlbERCIC0gQW4gb3B0aW9uYWwgbW9kZWxEQi5cbiAgICAgKiBAcGFyYW0gaXNJbml0aWFsaXplZCAtIEFuIG9wdGlvbmFsIGZsYWcgdG8gY2hlY2sgaWYgdGhlIG1vZGVsIGlzIGluaXRpYWxpemVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgZG9jdW1lbnQgbW9kZWwuXG4gICAgICovXG4gICAgY3JlYXRlTmV3KGxhbmd1YWdlUHJlZmVyZW5jZSwgbW9kZWxEQiwgaXNJbml0aWFsaXplZCkge1xuICAgICAgICByZXR1cm4gbmV3IERvY3VtZW50TW9kZWwobGFuZ3VhZ2VQcmVmZXJlbmNlLCBtb2RlbERCKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBwcmVmZXJyZWQga2VybmVsIGxhbmd1YWdlIGdpdmVuIGEgZmlsZSBwYXRoLlxuICAgICAqL1xuICAgIHByZWZlcnJlZExhbmd1YWdlKHBhdGgpIHtcbiAgICAgICAgY29uc3QgbW9kZSA9IE1vZGUuZmluZEJ5RmlsZU5hbWUocGF0aCk7XG4gICAgICAgIHJldHVybiBtb2RlICYmIG1vZGUubW9kZTtcbiAgICB9XG59XG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIGEgbW9kZWwgZmFjdG9yeSBmb3IgYmFzZTY0IGZpbGVzLlxuICovXG5leHBvcnQgY2xhc3MgQmFzZTY0TW9kZWxGYWN0b3J5IGV4dGVuZHMgVGV4dE1vZGVsRmFjdG9yeSB7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHR5cGUuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyBhIHJlYWQtb25seSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICdiYXNlNjQnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgdHlwZSBvZiB0aGUgZmlsZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGlzIGEgcmVhZC1vbmx5IHByb3BlcnR5LlxuICAgICAqL1xuICAgIGdldCBjb250ZW50VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuICdmaWxlJztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGZvcm1hdCBvZiB0aGUgZmlsZS5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgYSByZWFkLW9ubHkgcHJvcGVydHkuXG4gICAgICovXG4gICAgZ2V0IGZpbGVGb3JtYXQoKSB7XG4gICAgICAgIHJldHVybiAnYmFzZTY0JztcbiAgICB9XG59XG4vKipcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGEgd2lkZ2V0IGZhY3RvcnkuXG4gKi9cbmV4cG9ydCBjbGFzcyBBQkNXaWRnZXRGYWN0b3J5IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgYEFCQ1dpZGdldEZhY3RvcnlgLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5faXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl93aWRnZXRDcmVhdGVkID0gbmV3IFNpZ25hbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdHJhbnNsYXRvciA9IG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZTtcbiAgICAgICAgdGhpcy5fcmVhZE9ubHkgPSBvcHRpb25zLnJlYWRPbmx5ID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IG9wdGlvbnMucmVhZE9ubHk7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRGb3IgPSBvcHRpb25zLmRlZmF1bHRGb3IgPyBvcHRpb25zLmRlZmF1bHRGb3Iuc2xpY2UoKSA6IFtdO1xuICAgICAgICB0aGlzLl9kZWZhdWx0UmVuZGVyZWQgPSAob3B0aW9ucy5kZWZhdWx0UmVuZGVyZWQgfHwgW10pLnNsaWNlKCk7XG4gICAgICAgIHRoaXMuX2ZpbGVUeXBlcyA9IG9wdGlvbnMuZmlsZVR5cGVzLnNsaWNlKCk7XG4gICAgICAgIHRoaXMuX21vZGVsTmFtZSA9IG9wdGlvbnMubW9kZWxOYW1lIHx8ICd0ZXh0JztcbiAgICAgICAgdGhpcy5fcHJlZmVyS2VybmVsID0gISFvcHRpb25zLnByZWZlcktlcm5lbDtcbiAgICAgICAgdGhpcy5fY2FuU3RhcnRLZXJuZWwgPSAhIW9wdGlvbnMuY2FuU3RhcnRLZXJuZWw7XG4gICAgICAgIHRoaXMuX3NodXRkb3duT25DbG9zZSA9ICEhb3B0aW9ucy5zaHV0ZG93bk9uQ2xvc2U7XG4gICAgICAgIHRoaXMuX2F1dG9TdGFydERlZmF1bHQgPSAhIW9wdGlvbnMuYXV0b1N0YXJ0RGVmYXVsdDtcbiAgICAgICAgdGhpcy5fdG9vbGJhckZhY3RvcnkgPSBvcHRpb25zLnRvb2xiYXJGYWN0b3J5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gYSB3aWRnZXQgaXMgY3JlYXRlZC5cbiAgICAgKi9cbiAgICBnZXQgd2lkZ2V0Q3JlYXRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZGdldENyZWF0ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB3aGV0aGVyIHRoZSBtb2RlbCBmYWN0b3J5IGhhcyBiZWVuIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIHVzZWQgYnkgdGhlIGRvY3VtZW50IG1hbmFnZXIuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICBTaWduYWwuY2xlYXJEYXRhKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSB3aWRnZXQgZmFjdG9yeSBpcyByZWFkIG9ubHkuXG4gICAgICovXG4gICAgZ2V0IHJlYWRPbmx5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZE9ubHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSB3aWRnZXQgdG8gZGlzcGxheSBpbiBkaWFsb2dzLlxuICAgICAqL1xuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGZpbGUgdHlwZXMgdGhlIHdpZGdldCBjYW4gdmlldy5cbiAgICAgKi9cbiAgICBnZXQgZmlsZVR5cGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsZVR5cGVzLnNsaWNlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSByZWdpc3RlcmVkIG5hbWUgb2YgdGhlIG1vZGVsIHR5cGUgdXNlZCB0byBjcmVhdGUgdGhlIHdpZGdldHMuXG4gICAgICovXG4gICAgZ2V0IG1vZGVsTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVsTmFtZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGZpbGUgdHlwZXMgZm9yIHdoaWNoIHRoZSBmYWN0b3J5IHNob3VsZCBiZSB0aGUgZGVmYXVsdC5cbiAgICAgKi9cbiAgICBnZXQgZGVmYXVsdEZvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRGb3Iuc2xpY2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGZpbGUgdHlwZXMgZm9yIHdoaWNoIHRoZSBmYWN0b3J5IHNob3VsZCBiZSB0aGUgZGVmYXVsdCBmb3JcbiAgICAgKiByZW5kZXJpbmcgYSBkb2N1bWVudCBtb2RlbCwgaWYgZGlmZmVyZW50IGZyb20gZWRpdGluZy5cbiAgICAgKi9cbiAgICBnZXQgZGVmYXVsdFJlbmRlcmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFJlbmRlcmVkLnNsaWNlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHdpZGdldHMgcHJlZmVyIGhhdmluZyBhIGtlcm5lbCBzdGFydGVkLlxuICAgICAqL1xuICAgIGdldCBwcmVmZXJLZXJuZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmVmZXJLZXJuZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHdpZGdldHMgY2FuIHN0YXJ0IGEga2VybmVsIHdoZW4gb3BlbmVkLlxuICAgICAqL1xuICAgIGdldCBjYW5TdGFydEtlcm5lbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhblN0YXJ0S2VybmVsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdXRvbWF0aWNhbGx5IHN0YXJ0IHRoZSBkZWZhdWx0IGtlcm5lbCBpZiBubyBvdGhlciBtYXRjaGluZyBrZXJuZWwgaXNcbiAgICAgKiBmb3VuZC5cbiAgICAgKi9cbiAgICBnZXQgYXV0b1N0YXJ0RGVmYXVsdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F1dG9TdGFydERlZmF1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBhcHBsaWNhdGlvbiBsYW5ndWFnZSB0cmFuc2xhdG9yLlxuICAgICAqL1xuICAgIGdldCB0cmFuc2xhdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHJhbnNsYXRvcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUga2VybmVsIHNob3VsZCBiZSBzaHV0ZG93biB3aGVuIHRoZSB3aWRnZXQgaXMgY2xvc2VkLlxuICAgICAqL1xuICAgIGdldCBzaHV0ZG93bk9uQ2xvc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaHV0ZG93bk9uQ2xvc2U7XG4gICAgfVxuICAgIHNldCBzaHV0ZG93bk9uQ2xvc2UodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fc2h1dGRvd25PbkNsb3NlID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyB3aWRnZXQgZ2l2ZW4gYSBkb2N1bWVudCBtb2RlbCBhbmQgYSBjb250ZXh0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIEl0IHNob3VsZCBlbWl0IHRoZSBbd2lkZ2V0Q3JlYXRlZF0gc2lnbmFsIHdpdGggdGhlIG5ldyB3aWRnZXQuXG4gICAgICovXG4gICAgY3JlYXRlTmV3KGNvbnRleHQsIHNvdXJjZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgbmV3IHdpZGdldFxuICAgICAgICBjb25zdCB3aWRnZXQgPSB0aGlzLmNyZWF0ZU5ld1dpZGdldChjb250ZXh0LCBzb3VyY2UpO1xuICAgICAgICAvLyBBZGQgdG9vbGJhclxuICAgICAgICBzZXRUb29sYmFyKHdpZGdldCwgKF9hID0gdGhpcy5fdG9vbGJhckZhY3RvcnkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMuZGVmYXVsdFRvb2xiYXJGYWN0b3J5LmJpbmQodGhpcykpO1xuICAgICAgICAvLyBFbWl0IHdpZGdldCBjcmVhdGVkIHNpZ25hbFxuICAgICAgICB0aGlzLl93aWRnZXRDcmVhdGVkLmVtaXQod2lkZ2V0KTtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBmYWN0b3J5IGZvciB0b29sYmFyIGl0ZW1zIHRvIGJlIGFkZGVkIGFmdGVyIHRoZSB3aWRnZXQgaXMgY3JlYXRlZC5cbiAgICAgKi9cbiAgICBkZWZhdWx0VG9vbGJhckZhY3Rvcnkod2lkZ2V0KSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGEgZGlydHkgd2lkZ2V0LlxuICovXG5jb25zdCBESVJUWV9DTEFTUyA9ICdqcC1tb2QtZGlydHknO1xuLyoqXG4gKiBBIGRvY3VtZW50IHdpZGdldCBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIERvY3VtZW50V2lkZ2V0IGV4dGVuZHMgTWFpbkFyZWFXaWRnZXQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgLy8gSW5jbHVkZSB0aGUgY29udGV4dCByZWFkeSBwcm9taXNlIGluIHRoZSB3aWRnZXQgcmV2ZWFsIHByb21pc2VcbiAgICAgICAgb3B0aW9ucy5yZXZlYWwgPSBQcm9taXNlLmFsbChbb3B0aW9ucy5yZXZlYWwsIG9wdGlvbnMuY29udGV4dC5yZWFkeV0pO1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0O1xuICAgICAgICAvLyBIYW5kbGUgY29udGV4dCBwYXRoIGNoYW5nZXNcbiAgICAgICAgdGhpcy5jb250ZXh0LnBhdGhDaGFuZ2VkLmNvbm5lY3QodGhpcy5fb25QYXRoQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMuX29uUGF0aENoYW5nZWQodGhpcy5jb250ZXh0LCB0aGlzLmNvbnRleHQucGF0aCk7XG4gICAgICAgIC8vIExpc3RlbiBmb3IgY2hhbmdlcyBpbiB0aGUgZGlydHkgc3RhdGUuXG4gICAgICAgIHRoaXMuY29udGV4dC5tb2RlbC5zdGF0ZUNoYW5nZWQuY29ubmVjdCh0aGlzLl9vbk1vZGVsU3RhdGVDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgdm9pZCB0aGlzLmNvbnRleHQucmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVEaXJ0eVN0YXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBsaXN0ZW4gZm9yIGNoYW5nZXMgdG8gdGhlIHRpdGxlIG9iamVjdFxuICAgICAgICB0aGlzLnRpdGxlLmNoYW5nZWQuY29ubmVjdCh0aGlzLl9vblRpdGxlQ2hhbmdlZCwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBVUkkgZnJhZ21lbnQgaWRlbnRpZmllci5cbiAgICAgKi9cbiAgICBzZXRGcmFnbWVudChmcmFnbWVudCkge1xuICAgICAgICAvKiBuby1vcCAqL1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSB0aXRsZSBjaGFuZ2UuXG4gICAgICovXG4gICAgYXN5bmMgX29uVGl0bGVDaGFuZ2VkKF9zZW5kZXIpIHtcbiAgICAgICAgY29uc3QgdmFsaWROYW1lRXhwID0gL1tcXC9cXFxcOl0vO1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy50aXRsZS5sYWJlbDtcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSB0aGlzLmNvbnRleHQucGF0aC5zcGxpdCgnLycpLnBvcCgpO1xuICAgICAgICBpZiAobmFtZSA9PT0gZmlsZW5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZS5sZW5ndGggPiAwICYmICF2YWxpZE5hbWVFeHAudGVzdChuYW1lKSkge1xuICAgICAgICAgICAgY29uc3Qgb2xkUGF0aCA9IHRoaXMuY29udGV4dC5wYXRoO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jb250ZXh0LnJlbmFtZShuYW1lKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRleHQucGF0aCAhPT0gb2xkUGF0aCkge1xuICAgICAgICAgICAgICAgIC8vIFJlbmFtZSBzdWNjZWVkZWRcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVzZXQgdGl0bGUgaWYgbmFtZSBpcyBpbnZhbGlkIG9yIHJlbmFtZSBmYWlsc1xuICAgICAgICB0aGlzLnRpdGxlLmxhYmVsID0gZmlsZW5hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIHBhdGggY2hhbmdlLlxuICAgICAqL1xuICAgIF9vblBhdGhDaGFuZ2VkKHNlbmRlciwgcGF0aCkge1xuICAgICAgICB0aGlzLnRpdGxlLmxhYmVsID0gUGF0aEV4dC5iYXNlbmFtZShzZW5kZXIubG9jYWxQYXRoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY2hhbmdlIHRvIHRoZSBjb250ZXh0IG1vZGVsIHN0YXRlLlxuICAgICAqL1xuICAgIF9vbk1vZGVsU3RhdGVDaGFuZ2VkKHNlbmRlciwgYXJncykge1xuICAgICAgICBpZiAoYXJncy5uYW1lID09PSAnZGlydHknKSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVEaXJ0eVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBkaXJ0eSBzdGF0ZSBvZiB0aGUgY29udGV4dCBtb2RlbC5cbiAgICAgKi9cbiAgICBfaGFuZGxlRGlydHlTdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dC5tb2RlbC5kaXJ0eSAmJlxuICAgICAgICAgICAgIXRoaXMudGl0bGUuY2xhc3NOYW1lLmluY2x1ZGVzKERJUlRZX0NMQVNTKSkge1xuICAgICAgICAgICAgdGhpcy50aXRsZS5jbGFzc05hbWUgKz0gYCAke0RJUlRZX0NMQVNTfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlLmNsYXNzTmFtZSA9IHRoaXMudGl0bGUuY2xhc3NOYW1lLnJlcGxhY2UoRElSVFlfQ0xBU1MsICcnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlZmF1bHQuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgZG9jcmVnaXN0cnlcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9jb250ZXh0JztcbmV4cG9ydCAqIGZyb20gJy4vZGVmYXVsdCc7XG5leHBvcnQgKiBmcm9tICcuL21pbWVkb2N1bWVudCc7XG5leHBvcnQgKiBmcm9tICcuL3JlZ2lzdHJ5Jztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFByaW50aW5nLCBzaG93RXJyb3JNZXNzYWdlIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgQWN0aXZpdHlNb25pdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IE1pbWVNb2RlbCB9IGZyb20gJ0BqdXB5dGVybGFiL3JlbmRlcm1pbWUnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBKU09ORXh0LCBQcm9taXNlRGVsZWdhdGUgfSBmcm9tICdAbHVtaW5vL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBNZXNzYWdlTG9vcCB9IGZyb20gJ0BsdW1pbm8vbWVzc2FnaW5nJztcbmltcG9ydCB7IFN0YWNrZWRMYXlvdXQsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgeyBBQkNXaWRnZXRGYWN0b3J5LCBEb2N1bWVudFdpZGdldCB9IGZyb20gJy4vZGVmYXVsdCc7XG4vKipcbiAqIEEgY29udGVudCB3aWRnZXQgZm9yIGEgcmVuZGVyZWQgbWltZXR5cGUgZG9jdW1lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBNaW1lQ29udGVudCBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIGJvdW5kIGNoYW5nZSBjYWxsYmFjay5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2NoYW5nZUNhbGxiYWNrID0gKG9wdGlvbnMpID0+IHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5kYXRhIHx8ICFvcHRpb25zLmRhdGFbdGhpcy5taW1lVHlwZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gb3B0aW9ucy5kYXRhW3RoaXMubWltZVR5cGVdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhICE9PSB0aGlzLl9jb250ZXh0Lm1vZGVsLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udGV4dC5tb2RlbC5mcm9tU3RyaW5nKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRhdGEgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICBkYXRhICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAhSlNPTkV4dC5kZWVwRXF1YWwoZGF0YSwgdGhpcy5fY29udGV4dC5tb2RlbC50b0pTT04oKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250ZXh0Lm1vZGVsLmZyb21KU09OKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9mcmFnbWVudCA9ICcnO1xuICAgICAgICB0aGlzLl9yZWFkeSA9IG5ldyBQcm9taXNlRGVsZWdhdGUoKTtcbiAgICAgICAgdGhpcy5faXNSZW5kZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVuZGVyUmVxdWVzdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLU1pbWVEb2N1bWVudCcpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX3RyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgdGhpcy5taW1lVHlwZSA9IG9wdGlvbnMubWltZVR5cGU7XG4gICAgICAgIHRoaXMuX2RhdGFUeXBlID0gb3B0aW9ucy5kYXRhVHlwZSB8fCAnc3RyaW5nJztcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IG9wdGlvbnMuY29udGV4dDtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG9wdGlvbnMucmVuZGVyZXI7XG4gICAgICAgIGNvbnN0IGxheW91dCA9ICh0aGlzLmxheW91dCA9IG5ldyBTdGFja2VkTGF5b3V0KCkpO1xuICAgICAgICBsYXlvdXQuYWRkV2lkZ2V0KHRoaXMucmVuZGVyZXIpO1xuICAgICAgICB0aGlzLl9jb250ZXh0LnJlYWR5XG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBBZnRlciByZW5kZXJpbmcgZm9yIHRoZSBmaXJzdCB0aW1lLCBzZW5kIGFuIGFjdGl2YXRpb24gcmVxdWVzdCBpZiB3ZVxuICAgICAgICAgICAgLy8gYXJlIGN1cnJlbnRseSBmb2N1c2VkLlxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIFdlIHdhbnQgdG8gc3luY2hyb25vdXNseSBzZW5kIChub3QgcG9zdCkgdGhlIGFjdGl2YXRlIG1lc3NhZ2UsIHdoaWxlXG4gICAgICAgICAgICAgICAgLy8gd2Uga25vdyB0aGlzIG5vZGUgc3RpbGwgaGFzIGZvY3VzLlxuICAgICAgICAgICAgICAgIE1lc3NhZ2VMb29wLnNlbmRNZXNzYWdlKHRoaXMucmVuZGVyZXIsIFdpZGdldC5Nc2cuQWN0aXZhdGVSZXF1ZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRocm90dGxlIHRoZSByZW5kZXJpbmcgcmF0ZSBvZiB0aGUgd2lkZ2V0LlxuICAgICAgICAgICAgdGhpcy5fbW9uaXRvciA9IG5ldyBBY3Rpdml0eU1vbml0b3Ioe1xuICAgICAgICAgICAgICAgIHNpZ25hbDogdGhpcy5fY29udGV4dC5tb2RlbC5jb250ZW50Q2hhbmdlZCxcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiBvcHRpb25zLnJlbmRlclRpbWVvdXRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fbW9uaXRvci5hY3Rpdml0eVN0b3BwZWQuY29ubmVjdCh0aGlzLnVwZGF0ZSwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9yZWFkeS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2gocmVhc29uID0+IHtcbiAgICAgICAgICAgIC8vIERpc3Bvc2UgdGhlIGRvY3VtZW50IGlmIHJlbmRlcmluZyBmYWlscy5cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZvaWQgc2hvd0Vycm9yTWVzc2FnZSh0aGlzLl90cmFucy5fXygnUmVuZGVyZXIgRmFpbHVyZTogJTEnLCB0aGlzLl9jb250ZXh0LnBhdGgpLCByZWFzb24pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJpbnQgbWV0aG9kLiBEZWZlcnJlZCB0byB0aGUgcmVuZGVyZXIuXG4gICAgICovXG4gICAgW1ByaW50aW5nLnN5bWJvbF0oKSB7XG4gICAgICAgIHJldHVybiBQcmludGluZy5nZXRQcmludEZ1bmN0aW9uKHRoaXMucmVuZGVyZXIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB3aWRnZXQgaXMgcmVhZHkuXG4gICAgICovXG4gICAgZ2V0IHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZHkucHJvbWlzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IFVSSSBmcmFnbWVudCBpZGVudGlmaWVyLlxuICAgICAqL1xuICAgIHNldEZyYWdtZW50KGZyYWdtZW50KSB7XG4gICAgICAgIHRoaXMuX2ZyYWdtZW50ID0gZnJhZ21lbnQ7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9tb25pdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9tb25pdG9yLmRpc3Bvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tb25pdG9yID0gbnVsbDtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYW4gYHVwZGF0ZS1yZXF1ZXN0YCBtZXNzYWdlIHRvIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgb25VcGRhdGVSZXF1ZXN0KG1zZykge1xuICAgICAgICBpZiAodGhpcy5fY29udGV4dC5pc1JlYWR5KSB7XG4gICAgICAgICAgICB2b2lkIHRoaXMuX3JlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy5fZnJhZ21lbnQgPSAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIG1pbWUgY29udGVudC5cbiAgICAgKi9cbiAgICBhc3luYyBfcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2luY2UgcmVuZGVyaW5nIGlzIGFzeW5jLCB3ZSBub3RlIHJlbmRlciByZXF1ZXN0cyB0aGF0IGhhcHBlbiB3aGlsZSB3ZVxuICAgICAgICAvLyBhY3R1YWxseSBhcmUgcmVuZGVyaW5nIGZvciBhIGZ1dHVyZSByZW5kZXJpbmcuXG4gICAgICAgIGlmICh0aGlzLl9pc1JlbmRlcmluZykge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyUmVxdWVzdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdXAgZm9yIHRoaXMgcmVuZGVyaW5nIHBhc3MuXG4gICAgICAgIHRoaXMuX3JlbmRlclJlcXVlc3RlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5fY29udGV4dDtcbiAgICAgICAgY29uc3QgbW9kZWwgPSBjb250ZXh0Lm1vZGVsO1xuICAgICAgICBjb25zdCBkYXRhID0ge307XG4gICAgICAgIGlmICh0aGlzLl9kYXRhVHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRhdGFbdGhpcy5taW1lVHlwZV0gPSBtb2RlbC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YVt0aGlzLm1pbWVUeXBlXSA9IG1vZGVsLnRvSlNPTigpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1pbWVNb2RlbCA9IG5ldyBNaW1lTW9kZWwoe1xuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIGNhbGxiYWNrOiB0aGlzLl9jaGFuZ2VDYWxsYmFjayxcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7IGZyYWdtZW50OiB0aGlzLl9mcmFnbWVudCB9XG4gICAgICAgIH0pO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRG8gdGhlIHJlbmRlcmluZyBhc3luY2hyb25vdXNseS5cbiAgICAgICAgICAgIHRoaXMuX2lzUmVuZGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmVuZGVyZXIucmVuZGVyTW9kZWwobWltZU1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMuX2lzUmVuZGVyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhbiBvdXRzdGFuZGluZyByZXF1ZXN0IHRvIHJlbmRlciwgZ28gYWhlYWQgYW5kIHJlbmRlclxuICAgICAgICAgICAgaWYgKHRoaXMuX3JlbmRlclJlcXVlc3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAocmVhc29uKSB7XG4gICAgICAgICAgICAvLyBEaXNwb3NlIHRoZSBkb2N1bWVudCBpZiByZW5kZXJpbmcgZmFpbHMuXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2b2lkIHNob3dFcnJvck1lc3NhZ2UodGhpcy5fdHJhbnMuX18oJ1JlbmRlcmVyIEZhaWx1cmU6ICUxJywgY29udGV4dC5wYXRoKSwgcmVhc29uKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQSBkb2N1bWVudCB3aWRnZXQgZm9yIG1pbWUgY29udGVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIE1pbWVEb2N1bWVudCBleHRlbmRzIERvY3VtZW50V2lkZ2V0IHtcbiAgICBzZXRGcmFnbWVudChmcmFnbWVudCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuc2V0RnJhZ21lbnQoZnJhZ21lbnQpO1xuICAgIH1cbn1cbi8qKlxuICogQW4gaW1wbGVtZW50YXRpb24gb2YgYSB3aWRnZXQgZmFjdG9yeSBmb3IgYSByZW5kZXJlZCBtaW1ldHlwZSBkb2N1bWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIE1pbWVEb2N1bWVudEZhY3RvcnkgZXh0ZW5kcyBBQkNXaWRnZXRGYWN0b3J5IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgbWltZXR5cGUgd2lkZ2V0IGZhY3RvcnkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihQcml2YXRlLmNyZWF0ZVJlZ2lzdHJ5T3B0aW9ucyhvcHRpb25zKSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcm1pbWUgPSBvcHRpb25zLnJlbmRlcm1pbWU7XG4gICAgICAgIHRoaXMuX3JlbmRlclRpbWVvdXQgPSBvcHRpb25zLnJlbmRlclRpbWVvdXQgfHwgMTAwMDtcbiAgICAgICAgdGhpcy5fZGF0YVR5cGUgPSBvcHRpb25zLmRhdGFUeXBlIHx8ICdzdHJpbmcnO1xuICAgICAgICB0aGlzLl9maWxlVHlwZSA9IG9wdGlvbnMucHJpbWFyeUZpbGVUeXBlO1xuICAgICAgICB0aGlzLl9mYWN0b3J5ID0gb3B0aW9ucy5mYWN0b3J5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgd2lkZ2V0IGdpdmVuIGEgY29udGV4dC5cbiAgICAgKi9cbiAgICBjcmVhdGVOZXdXaWRnZXQoY29udGV4dCkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBjb25zdCBmdCA9IHRoaXMuX2ZpbGVUeXBlO1xuICAgICAgICBjb25zdCBtaW1lVHlwZSA9IChmdCA9PT0gbnVsbCB8fCBmdCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZnQubWltZVR5cGVzLmxlbmd0aCkgPyBmdC5taW1lVHlwZXNbMF0gOiAndGV4dC9wbGFpbic7XG4gICAgICAgIGNvbnN0IHJlbmRlcm1pbWUgPSB0aGlzLl9yZW5kZXJtaW1lLmNsb25lKHtcbiAgICAgICAgICAgIHJlc29sdmVyOiBjb250ZXh0LnVybFJlc29sdmVyXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcmVuZGVyZXI7XG4gICAgICAgIGlmICh0aGlzLl9mYWN0b3J5ICYmIHRoaXMuX2ZhY3RvcnkubWltZVR5cGVzLmluY2x1ZGVzKG1pbWVUeXBlKSkge1xuICAgICAgICAgICAgcmVuZGVyZXIgPSB0aGlzLl9mYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKHtcbiAgICAgICAgICAgICAgICBtaW1lVHlwZSxcbiAgICAgICAgICAgICAgICByZXNvbHZlcjogcmVuZGVybWltZS5yZXNvbHZlcixcbiAgICAgICAgICAgICAgICBzYW5pdGl6ZXI6IHJlbmRlcm1pbWUuc2FuaXRpemVyLFxuICAgICAgICAgICAgICAgIGxpbmtIYW5kbGVyOiByZW5kZXJtaW1lLmxpbmtIYW5kbGVyLFxuICAgICAgICAgICAgICAgIGxhdGV4VHlwZXNldHRlcjogcmVuZGVybWltZS5sYXRleFR5cGVzZXR0ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVuZGVyZXIgPSByZW5kZXJtaW1lLmNyZWF0ZVJlbmRlcmVyKG1pbWVUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb250ZW50ID0gbmV3IE1pbWVDb250ZW50KHtcbiAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICByZW5kZXJlcixcbiAgICAgICAgICAgIG1pbWVUeXBlLFxuICAgICAgICAgICAgcmVuZGVyVGltZW91dDogdGhpcy5fcmVuZGVyVGltZW91dCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiB0aGlzLl9kYXRhVHlwZVxuICAgICAgICB9KTtcbiAgICAgICAgY29udGVudC50aXRsZS5pY29uID0gZnQgPT09IG51bGwgfHwgZnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZ0Lmljb247XG4gICAgICAgIGNvbnRlbnQudGl0bGUuaWNvbkNsYXNzID0gKF9hID0gZnQgPT09IG51bGwgfHwgZnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZ0Lmljb25DbGFzcykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJyc7XG4gICAgICAgIGNvbnRlbnQudGl0bGUuaWNvbkxhYmVsID0gKF9iID0gZnQgPT09IG51bGwgfHwgZnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGZ0Lmljb25MYWJlbCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJyc7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IG5ldyBNaW1lRG9jdW1lbnQoeyBjb250ZW50LCBjb250ZXh0IH0pO1xuICAgICAgICByZXR1cm4gd2lkZ2V0O1xuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgdGhlIG1vZHVsZSBpbXBsZW1lbnRhdGlvbiBkZXRhaWxzLlxuICovXG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgZG9jdW1lbnQgcmVnaXN0cnkgb3B0aW9ucy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVSZWdpc3RyeU9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKSwgeyByZWFkT25seTogdHJ1ZSB9KTtcbiAgICB9XG4gICAgUHJpdmF0ZS5jcmVhdGVSZWdpc3RyeU9wdGlvbnMgPSBjcmVhdGVSZWdpc3RyeU9wdGlvbnM7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1pbWVkb2N1bWVudC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBQYXRoRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgZmlsZUljb24sIGZvbGRlckljb24sIGltYWdlSWNvbiwganNvbkljb24sIGp1bGlhSWNvbiwgbWFya2Rvd25JY29uLCBub3RlYm9va0ljb24sIHBkZkljb24sIHB5dGhvbkljb24sIHJLZXJuZWxJY29uLCBzcHJlYWRzaGVldEljb24sIHlhbWxJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBBcnJheUV4dCwgQXJyYXlJdGVyYXRvciwgZWFjaCwgZW1wdHksIGZpbmQsIG1hcCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IERpc3Bvc2FibGVEZWxlZ2F0ZSB9IGZyb20gJ0BsdW1pbm8vZGlzcG9zYWJsZSc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBUZXh0TW9kZWxGYWN0b3J5IH0gZnJvbSAnLi9kZWZhdWx0Jztcbi8qKlxuICogVGhlIGRvY3VtZW50IHJlZ2lzdHJ5LlxuICovXG5leHBvcnQgY2xhc3MgRG9jdW1lbnRSZWdpc3RyeSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGRvY3VtZW50IHJlZ2lzdHJ5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgICAgICB0aGlzLl9tb2RlbEZhY3RvcmllcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX3dpZGdldEZhY3RvcmllcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRXaWRnZXRGYWN0b3J5ID0gJyc7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRXaWRnZXRGYWN0b3J5T3ZlcnJpZGVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdFdpZGdldEZhY3RvcmllcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRSZW5kZXJlZFdpZGdldEZhY3RvcmllcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX3dpZGdldEZhY3Rvcmllc0ZvckZpbGVUeXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZmlsZVR5cGVzID0gW107XG4gICAgICAgIHRoaXMuX2V4dGVuZGVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGZhY3RvcnkgPSBvcHRpb25zLnRleHRNb2RlbEZhY3Rvcnk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgaWYgKGZhY3RvcnkgJiYgZmFjdG9yeS5uYW1lICE9PSAndGV4dCcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGV4dCBtb2RlbCBmYWN0b3J5IG11c3QgaGF2ZSB0aGUgbmFtZSBgdGV4dGAnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tb2RlbEZhY3Rvcmllc1sndGV4dCddID0gZmFjdG9yeSB8fCBuZXcgVGV4dE1vZGVsRmFjdG9yeSgpO1xuICAgICAgICBjb25zdCBmdHMgPSBvcHRpb25zLmluaXRpYWxGaWxlVHlwZXMgfHxcbiAgICAgICAgICAgIERvY3VtZW50UmVnaXN0cnkuZ2V0RGVmYXVsdEZpbGVUeXBlcyh0aGlzLnRyYW5zbGF0b3IpO1xuICAgICAgICBmdHMuZm9yRWFjaChmdCA9PiB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgRG9jdW1lbnRSZWdpc3RyeS5nZXRGaWxlVHlwZURlZmF1bHRzKHRoaXMudHJhbnNsYXRvcikpLCBmdCk7XG4gICAgICAgICAgICB0aGlzLl9maWxlVHlwZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIHJlZ2lzdHJ5IGhhcyBjaGFuZ2VkLlxuICAgICAqL1xuICAgIGdldCBjaGFuZ2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHdoZXRoZXIgdGhlIGRvY3VtZW50IHJlZ2lzdHJ5IGhhcyBiZWVuIGRpc3Bvc2VkLlxuICAgICAqL1xuICAgIGdldCBpc0Rpc3Bvc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNEaXNwb3NlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIGRvY3VtZW50IHJlZ2lzdHJ5LlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgZm9yIChjb25zdCBtb2RlbE5hbWUgaW4gdGhpcy5fbW9kZWxGYWN0b3JpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGVsRmFjdG9yaWVzW21vZGVsTmFtZV0uZGlzcG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgd2lkZ2V0TmFtZSBpbiB0aGlzLl93aWRnZXRGYWN0b3JpZXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3dpZGdldEZhY3Rvcmllc1t3aWRnZXROYW1lXS5kaXNwb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCB3aWRnZXROYW1lIGluIHRoaXMuX2V4dGVuZGVycykge1xuICAgICAgICAgICAgdGhpcy5fZXh0ZW5kZXJzW3dpZGdldE5hbWVdLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZmlsZVR5cGVzLmxlbmd0aCA9IDA7XG4gICAgICAgIFNpZ25hbC5jbGVhckRhdGEodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIHdpZGdldCBmYWN0b3J5IHRvIHRoZSByZWdpc3RyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmYWN0b3J5IC0gVGhlIGZhY3RvcnkgaW5zdGFuY2UgdG8gcmVnaXN0ZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIGRpc3Bvc2FibGUgd2hpY2ggd2lsbCB1bnJlZ2lzdGVyIHRoZSBmYWN0b3J5LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIElmIGEgZmFjdG9yeSB3aXRoIHRoZSBnaXZlbiBgJ25hbWUnYCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQsXG4gICAgICogYSB3YXJuaW5nIHdpbGwgYmUgbG9nZ2VkLCBhbmQgdGhpcyB3aWxsIGJlIGEgbm8tb3AuXG4gICAgICogSWYgYCcqJ2AgaXMgZ2l2ZW4gYXMgYSBkZWZhdWx0IGV4dGVuc2lvbiwgdGhlIGZhY3Rvcnkgd2lsbCBiZSByZWdpc3RlcmVkXG4gICAgICogYXMgdGhlIGdsb2JhbCBkZWZhdWx0LlxuICAgICAqIElmIGFuIGV4dGVuc2lvbiBvciBnbG9iYWwgZGVmYXVsdCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQsIHRoaXMgZmFjdG9yeVxuICAgICAqIHdpbGwgb3ZlcnJpZGUgdGhlIGV4aXN0aW5nIGRlZmF1bHQuXG4gICAgICogVGhlIGZhY3RvcnkgY2Fubm90IGJlIG5hbWVkIGFuIGVtcHR5IHN0cmluZyBvciB0aGUgc3RyaW5nIGAnZGVmYXVsdCdgLlxuICAgICAqL1xuICAgIGFkZFdpZGdldEZhY3RvcnkoZmFjdG9yeSkge1xuICAgICAgICBjb25zdCBuYW1lID0gZmFjdG9yeS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICghbmFtZSB8fCBuYW1lID09PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIGZhY3RvcnkgbmFtZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl93aWRnZXRGYWN0b3JpZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgRHVwbGljYXRlIHJlZ2lzdGVyZWQgZmFjdG9yeSAke25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGVEZWxlZ2F0ZShQcml2YXRlLm5vT3ApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dpZGdldEZhY3Rvcmllc1tuYW1lXSA9IGZhY3Rvcnk7XG4gICAgICAgIGZvciAoY29uc3QgZnQgb2YgZmFjdG9yeS5kZWZhdWx0Rm9yIHx8IFtdKSB7XG4gICAgICAgICAgICBpZiAoZmFjdG9yeS5maWxlVHlwZXMuaW5kZXhPZihmdCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZnQgPT09ICcqJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRXaWRnZXRGYWN0b3J5ID0gbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRXaWRnZXRGYWN0b3JpZXNbZnRdID0gbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGZ0IG9mIGZhY3RvcnkuZGVmYXVsdFJlbmRlcmVkIHx8IFtdKSB7XG4gICAgICAgICAgICBpZiAoZmFjdG9yeS5maWxlVHlwZXMuaW5kZXhPZihmdCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0UmVuZGVyZWRXaWRnZXRGYWN0b3JpZXNbZnRdID0gbmFtZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBGb3IgY29udmVuaWVuY2UsIHN0b3JlIGEgbWFwcGluZyBvZiBmaWxlIHR5cGUgbmFtZSAtPiBuYW1lXG4gICAgICAgIGZvciAoY29uc3QgZnQgb2YgZmFjdG9yeS5maWxlVHlwZXMpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fd2lkZ2V0RmFjdG9yaWVzRm9yRmlsZVR5cGVbZnRdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkZ2V0RmFjdG9yaWVzRm9yRmlsZVR5cGVbZnRdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl93aWRnZXRGYWN0b3JpZXNGb3JGaWxlVHlwZVtmdF0ucHVzaChuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogJ3dpZGdldEZhY3RvcnknLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNoYW5nZTogJ2FkZGVkJ1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlRGVsZWdhdGUoKCkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3dpZGdldEZhY3Rvcmllc1tuYW1lXTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kZWZhdWx0V2lkZ2V0RmFjdG9yeSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRXaWRnZXRGYWN0b3J5ID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGV4dCBvZiBPYmplY3Qua2V5cyh0aGlzLl9kZWZhdWx0V2lkZ2V0RmFjdG9yaWVzKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZWZhdWx0V2lkZ2V0RmFjdG9yaWVzW2V4dF0gPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2RlZmF1bHRXaWRnZXRGYWN0b3JpZXNbZXh0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGV4dCBvZiBPYmplY3Qua2V5cyh0aGlzLl9kZWZhdWx0UmVuZGVyZWRXaWRnZXRGYWN0b3JpZXMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RlZmF1bHRSZW5kZXJlZFdpZGdldEZhY3Rvcmllc1tleHRdID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kZWZhdWx0UmVuZGVyZWRXaWRnZXRGYWN0b3JpZXNbZXh0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGV4dCBvZiBPYmplY3Qua2V5cyh0aGlzLl93aWRnZXRGYWN0b3JpZXNGb3JGaWxlVHlwZSkpIHtcbiAgICAgICAgICAgICAgICBBcnJheUV4dC5yZW1vdmVGaXJzdE9mKHRoaXMuX3dpZGdldEZhY3Rvcmllc0ZvckZpbGVUeXBlW2V4dF0sIG5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl93aWRnZXRGYWN0b3JpZXNGb3JGaWxlVHlwZVtleHRdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fd2lkZ2V0RmFjdG9yaWVzRm9yRmlsZVR5cGVbZXh0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGV4dCBvZiBPYmplY3Qua2V5cyh0aGlzLl9kZWZhdWx0V2lkZ2V0RmFjdG9yeU92ZXJyaWRlcykpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGVmYXVsdFdpZGdldEZhY3RvcnlPdmVycmlkZXNbZXh0XSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZGVmYXVsdFdpZGdldEZhY3RvcnlPdmVycmlkZXNbZXh0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICd3aWRnZXRGYWN0b3J5JyxcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIGNoYW5nZTogJ3JlbW92ZWQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIG1vZGVsIGZhY3RvcnkgdG8gdGhlIHJlZ2lzdHJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGZhY3RvcnkgLSBUaGUgZmFjdG9yeSBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgZGlzcG9zYWJsZSB3aGljaCB3aWxsIHVucmVnaXN0ZXIgdGhlIGZhY3RvcnkuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogSWYgYSBmYWN0b3J5IHdpdGggdGhlIGdpdmVuIGBuYW1lYCBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQsIG9yXG4gICAgICogdGhlIGdpdmVuIGZhY3RvcnkgaXMgYWxyZWFkeSByZWdpc3RlcmVkLCBhIHdhcm5pbmcgd2lsbCBiZSBsb2dnZWRcbiAgICAgKiBhbmQgdGhpcyB3aWxsIGJlIGEgbm8tb3AuXG4gICAgICovXG4gICAgYWRkTW9kZWxGYWN0b3J5KGZhY3RvcnkpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IGZhY3RvcnkubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAodGhpcy5fbW9kZWxGYWN0b3JpZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgRHVwbGljYXRlIHJlZ2lzdGVyZWQgZmFjdG9yeSAke25hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGVEZWxlZ2F0ZShQcml2YXRlLm5vT3ApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21vZGVsRmFjdG9yaWVzW25hbWVdID0gZmFjdG9yeTtcbiAgICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgIHR5cGU6ICdtb2RlbEZhY3RvcnknLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNoYW5nZTogJ2FkZGVkJ1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlRGVsZWdhdGUoKCkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX21vZGVsRmFjdG9yaWVzW25hbWVdO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbW9kZWxGYWN0b3J5JyxcbiAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgIGNoYW5nZTogJ3JlbW92ZWQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIHdpZGdldCBleHRlbnNpb24gdG8gdGhlIHJlZ2lzdHJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHdpZGdldE5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgd2lkZ2V0IGZhY3RvcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXh0ZW5zaW9uIC0gQSB3aWRnZXQgZXh0ZW5zaW9uLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBkaXNwb3NhYmxlIHdoaWNoIHdpbGwgdW5yZWdpc3RlciB0aGUgZXh0ZW5zaW9uLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIElmIHRoZSBleHRlbnNpb24gaXMgYWxyZWFkeSByZWdpc3RlcmVkIGZvciB0aGUgZ2l2ZW5cbiAgICAgKiB3aWRnZXQgbmFtZSwgYSB3YXJuaW5nIHdpbGwgYmUgbG9nZ2VkIGFuZCB0aGlzIHdpbGwgYmUgYSBuby1vcC5cbiAgICAgKi9cbiAgICBhZGRXaWRnZXRFeHRlbnNpb24od2lkZ2V0TmFtZSwgZXh0ZW5zaW9uKSB7XG4gICAgICAgIHdpZGdldE5hbWUgPSB3aWRnZXROYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICghKHdpZGdldE5hbWUgaW4gdGhpcy5fZXh0ZW5kZXJzKSkge1xuICAgICAgICAgICAgdGhpcy5fZXh0ZW5kZXJzW3dpZGdldE5hbWVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXh0ZW5kZXJzID0gdGhpcy5fZXh0ZW5kZXJzW3dpZGdldE5hbWVdO1xuICAgICAgICBjb25zdCBpbmRleCA9IEFycmF5RXh0LmZpcnN0SW5kZXhPZihleHRlbmRlcnMsIGV4dGVuc2lvbik7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgRHVwbGljYXRlIHJlZ2lzdGVyZWQgZXh0ZW5zaW9uIGZvciAke3dpZGdldE5hbWV9YCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IERpc3Bvc2FibGVEZWxlZ2F0ZShQcml2YXRlLm5vT3ApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2V4dGVuZGVyc1t3aWRnZXROYW1lXS5wdXNoKGV4dGVuc2lvbik7XG4gICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICB0eXBlOiAnd2lkZ2V0RXh0ZW5zaW9uJyxcbiAgICAgICAgICAgIG5hbWU6IHdpZGdldE5hbWUsXG4gICAgICAgICAgICBjaGFuZ2U6ICdhZGRlZCdcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZURlbGVnYXRlKCgpID0+IHtcbiAgICAgICAgICAgIEFycmF5RXh0LnJlbW92ZUZpcnN0T2YodGhpcy5fZXh0ZW5kZXJzW3dpZGdldE5hbWVdLCBleHRlbnNpb24pO1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnd2lkZ2V0RXh0ZW5zaW9uJyxcbiAgICAgICAgICAgICAgICBuYW1lOiB3aWRnZXROYW1lLFxuICAgICAgICAgICAgICAgIGNoYW5nZTogJ3JlbW92ZWQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIGZpbGUgdHlwZSB0byB0aGUgZG9jdW1lbnQgcmVnaXN0cnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmlsZVR5cGUgLSBUaGUgZmlsZSB0eXBlIG9iamVjdCB0byByZWdpc3Rlci5cbiAgICAgKiBAcGFyYW0gZmFjdG9yaWVzIC0gT3B0aW9uYWwgZmFjdG9yaWVzIHRvIHVzZSBmb3IgdGhlIGZpbGUgdHlwZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgZGlzcG9zYWJsZSB3aGljaCB3aWxsIHVucmVnaXN0ZXIgdGhlIGNvbW1hbmQuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhlc2UgYXJlIHVzZWQgdG8gcG9wdWxhdGUgdGhlIFwiQ3JlYXRlIE5ld1wiIGRpYWxvZy5cbiAgICAgKlxuICAgICAqIElmIG5vIGRlZmF1bHQgZmFjdG9yeSBleGlzdHMgZm9yIHRoZSBmaWxlIHR5cGUsIHRoZSBmaXJzdCBmYWN0b3J5IHdpbGxcbiAgICAgKiBiZSBkZWZpbmVkIGFzIGRlZmF1bHQgZmFjdG9yeS5cbiAgICAgKi9cbiAgICBhZGRGaWxlVHlwZShmaWxlVHlwZSwgZmFjdG9yaWVzKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIERvY3VtZW50UmVnaXN0cnkuZ2V0RmlsZVR5cGVEZWZhdWx0cyh0aGlzLnRyYW5zbGF0b3IpKSwgZmlsZVR5cGUpLCAoIShmaWxlVHlwZS5pY29uIHx8IGZpbGVUeXBlLmljb25DbGFzcykgJiYgeyBpY29uOiBmaWxlSWNvbiB9KSk7XG4gICAgICAgIHRoaXMuX2ZpbGVUeXBlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgLy8gQWRkIHRoZSBmaWxldHlwZSB0byB0aGUgZmFjdG9yeSAtIGZpbGV0eXBlIG1hcHBpbmdcbiAgICAgICAgLy8gIFdlIGRvIG5vdCBjaGFuZ2UgdGhlIGZhY3RvcnkgaXRzZWxmXG4gICAgICAgIGlmIChmYWN0b3JpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVUeXBlTmFtZSA9IHZhbHVlLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGZhY3Rvcmllc1xuICAgICAgICAgICAgICAgIC5tYXAoZmFjdG9yeSA9PiBmYWN0b3J5LnRvTG93ZXJDYXNlKCkpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goZmFjdG9yeSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl93aWRnZXRGYWN0b3JpZXNGb3JGaWxlVHlwZVtmaWxlVHlwZU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpZGdldEZhY3Rvcmllc0ZvckZpbGVUeXBlW2ZpbGVUeXBlTmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl93aWRnZXRGYWN0b3JpZXNGb3JGaWxlVHlwZVtmaWxlVHlwZU5hbWVdLmluY2x1ZGVzKGZhY3RvcnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpZGdldEZhY3Rvcmllc0ZvckZpbGVUeXBlW2ZpbGVUeXBlTmFtZV0ucHVzaChmYWN0b3J5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZGVmYXVsdFdpZGdldEZhY3Rvcmllc1tmaWxlVHlwZU5hbWVdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdFdpZGdldEZhY3Rvcmllc1tmaWxlVHlwZU5hbWVdID0gdGhpcy5fd2lkZ2V0RmFjdG9yaWVzRm9yRmlsZVR5cGVbZmlsZVR5cGVOYW1lXVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgdHlwZTogJ2ZpbGVUeXBlJyxcbiAgICAgICAgICAgIG5hbWU6IHZhbHVlLm5hbWUsXG4gICAgICAgICAgICBjaGFuZ2U6ICdhZGRlZCdcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgRGlzcG9zYWJsZURlbGVnYXRlKCgpID0+IHtcbiAgICAgICAgICAgIEFycmF5RXh0LnJlbW92ZUZpcnN0T2YodGhpcy5fZmlsZVR5cGVzLCB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZmFjdG9yaWVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZVR5cGVOYW1lID0gdmFsdWUubmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBmYWN0b3JpZXMubWFwKGZhY3RvcnkgPT4gZmFjdG9yeS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgICAgICBBcnJheUV4dC5yZW1vdmVGaXJzdE9mKHRoaXMuX3dpZGdldEZhY3Rvcmllc0ZvckZpbGVUeXBlW2ZpbGVUeXBlTmFtZV0sIG5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZGVmYXVsdFdpZGdldEZhY3Rvcmllc1tmaWxlVHlwZU5hbWVdID09PVxuICAgICAgICAgICAgICAgICAgICBmYWN0b3JpZXNbMF0udG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZGVmYXVsdFdpZGdldEZhY3Rvcmllc1tmaWxlVHlwZU5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2ZpbGVUeXBlJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBmaWxlVHlwZS5uYW1lLFxuICAgICAgICAgICAgICAgIGNoYW5nZTogJ3JlbW92ZWQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhIGxpc3Qgb2YgdGhlIHByZWZlcnJlZCB3aWRnZXQgZmFjdG9yaWVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggLSBUaGUgZmlsZSBwYXRoIHRvIGZpbHRlciB0aGUgcmVzdWx0cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgbmV3IGFycmF5IG9mIHdpZGdldCBmYWN0b3JpZXMuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogT25seSB0aGUgd2lkZ2V0IGZhY3RvcmllcyB3aG9zZSBhc3NvY2lhdGVkIG1vZGVsIGZhY3RvcnkgaGF2ZVxuICAgICAqIGJlZW4gcmVnaXN0ZXJlZCB3aWxsIGJlIHJldHVybmVkLlxuICAgICAqIFRoZSBmaXJzdCBpdGVtIGlzIGNvbnNpZGVyZWQgdGhlIGRlZmF1bHQuIFRoZSByZXR1cm5lZCBhcnJheVxuICAgICAqIGhhcyB3aWRnZXQgZmFjdG9yaWVzIGluIHRoZSBmb2xsb3dpbmcgb3JkZXI6XG4gICAgICogLSBwYXRoLXNwZWNpZmljIGRlZmF1bHQgZmFjdG9yeVxuICAgICAqIC0gcGF0aC1zcGVjaWZpYyBkZWZhdWx0IHJlbmRlcmVkIGZhY3RvcnlcbiAgICAgKiAtIGdsb2JhbCBkZWZhdWx0IGZhY3RvcnlcbiAgICAgKiAtIGFsbCBvdGhlciBwYXRoLXNwZWNpZmljIGZhY3Rvcmllc1xuICAgICAqIC0gYWxsIG90aGVyIGdsb2JhbCBmYWN0b3JpZXNcbiAgICAgKi9cbiAgICBwcmVmZXJyZWRXaWRnZXRGYWN0b3JpZXMocGF0aCkge1xuICAgICAgICBjb25zdCBmYWN0b3JpZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIC8vIEdldCB0aGUgb3JkZXJlZCBtYXRjaGluZyBmaWxlIHR5cGVzLlxuICAgICAgICBjb25zdCBmdHMgPSB0aGlzLmdldEZpbGVUeXBlc0ZvclBhdGgoUGF0aEV4dC5iYXNlbmFtZShwYXRoKSk7XG4gICAgICAgIC8vIFN0YXJ0IHdpdGggYW55IHVzZXIgb3ZlcnJpZGVzIGZvciB0aGUgZGVmYXVsdHMuXG4gICAgICAgIGZ0cy5mb3JFYWNoKGZ0ID0+IHtcbiAgICAgICAgICAgIGlmIChmdC5uYW1lIGluIHRoaXMuX2RlZmF1bHRXaWRnZXRGYWN0b3J5T3ZlcnJpZGVzKSB7XG4gICAgICAgICAgICAgICAgZmFjdG9yaWVzLmFkZCh0aGlzLl9kZWZhdWx0V2lkZ2V0RmFjdG9yeU92ZXJyaWRlc1tmdC5uYW1lXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBOZXh0IGFkZCB0aGUgZmlsZSB0eXBlIGRlZmF1bHQgZmFjdG9yaWVzLlxuICAgICAgICBmdHMuZm9yRWFjaChmdCA9PiB7XG4gICAgICAgICAgICBpZiAoZnQubmFtZSBpbiB0aGlzLl9kZWZhdWx0V2lkZ2V0RmFjdG9yaWVzKSB7XG4gICAgICAgICAgICAgICAgZmFjdG9yaWVzLmFkZCh0aGlzLl9kZWZhdWx0V2lkZ2V0RmFjdG9yaWVzW2Z0Lm5hbWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCB0aGUgZmlsZSB0eXBlIGRlZmF1bHQgcmVuZGVyZWQgZmFjdG9yaWVzLlxuICAgICAgICBmdHMuZm9yRWFjaChmdCA9PiB7XG4gICAgICAgICAgICBpZiAoZnQubmFtZSBpbiB0aGlzLl9kZWZhdWx0UmVuZGVyZWRXaWRnZXRGYWN0b3JpZXMpIHtcbiAgICAgICAgICAgICAgICBmYWN0b3JpZXMuYWRkKHRoaXMuX2RlZmF1bHRSZW5kZXJlZFdpZGdldEZhY3Rvcmllc1tmdC5uYW1lXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBBZGQgdGhlIGdsb2JhbCBkZWZhdWx0IGZhY3RvcnkuXG4gICAgICAgIGlmICh0aGlzLl9kZWZhdWx0V2lkZ2V0RmFjdG9yeSkge1xuICAgICAgICAgICAgZmFjdG9yaWVzLmFkZCh0aGlzLl9kZWZhdWx0V2lkZ2V0RmFjdG9yeSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWRkIHRoZSBmaWxlIHR5cGUgZmFjdG9yaWVzIGluIHJlZ2lzdHJhdGlvbiBvcmRlci5cbiAgICAgICAgZnRzLmZvckVhY2goZnQgPT4ge1xuICAgICAgICAgICAgaWYgKGZ0Lm5hbWUgaW4gdGhpcy5fd2lkZ2V0RmFjdG9yaWVzRm9yRmlsZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBlYWNoKHRoaXMuX3dpZGdldEZhY3Rvcmllc0ZvckZpbGVUeXBlW2Z0Lm5hbWVdLCBuID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZmFjdG9yaWVzLmFkZChuKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCB0aGUgcmVzdCBvZiB0aGUgZ2xvYmFsIGZhY3RvcmllcywgaW4gcmVnaXN0cmF0aW9uIG9yZGVyLlxuICAgICAgICBpZiAoJyonIGluIHRoaXMuX3dpZGdldEZhY3Rvcmllc0ZvckZpbGVUeXBlKSB7XG4gICAgICAgICAgICBlYWNoKHRoaXMuX3dpZGdldEZhY3Rvcmllc0ZvckZpbGVUeXBlWycqJ10sIG4gPT4ge1xuICAgICAgICAgICAgICAgIGZhY3Rvcmllcy5hZGQobik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb25zdHJ1Y3QgdGhlIHJldHVybiBsaXN0LCBjaGVja2luZyB0byBtYWtlIHN1cmUgdGhlIGNvcnJlc3BvbmRpbmdcbiAgICAgICAgLy8gbW9kZWwgZmFjdG9yaWVzIGFyZSByZWdpc3RlcmVkLlxuICAgICAgICBjb25zdCBmYWN0b3J5TGlzdCA9IFtdO1xuICAgICAgICBmYWN0b3JpZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLl93aWRnZXRGYWN0b3JpZXNbbmFtZV07XG4gICAgICAgICAgICBpZiAoIWZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBtb2RlbE5hbWUgPSBmYWN0b3J5Lm1vZGVsTmFtZSB8fCAndGV4dCc7XG4gICAgICAgICAgICBpZiAobW9kZWxOYW1lIGluIHRoaXMuX21vZGVsRmFjdG9yaWVzKSB7XG4gICAgICAgICAgICAgICAgZmFjdG9yeUxpc3QucHVzaChmYWN0b3J5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWN0b3J5TGlzdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBkZWZhdWx0IHJlbmRlcmVkIHdpZGdldCBmYWN0b3J5IGZvciBhIHBhdGguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGF0aCAtIFRoZSBwYXRoIHRvIGZvciB3aGljaCB0byBmaW5kIGEgd2lkZ2V0IGZhY3RvcnkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgZGVmYXVsdCByZW5kZXJlZCB3aWRnZXQgZmFjdG9yeSBmb3IgdGhlIHBhdGguXG4gICAgICpcbiAgICAgKiAjIyMgTm90ZXNcbiAgICAgKiBJZiB0aGUgd2lkZ2V0IGZhY3RvcnkgaGFzIHJlZ2lzdGVyZWQgYSBzZXBhcmF0ZSBzZXQgb2YgYGRlZmF1bHRSZW5kZXJlZGBcbiAgICAgKiBmaWxlIHR5cGVzIGFuZCB0aGVyZSBpcyBhIG1hdGNoIGluIHRoYXQgc2V0LCB0aGlzIHJldHVybnMgdGhhdC5cbiAgICAgKiBPdGhlcndpc2UsIHRoaXMgcmV0dXJucyB0aGUgc2FtZSB3aWRnZXQgZmFjdG9yeSBhc1xuICAgICAqIFtbZGVmYXVsdFdpZGdldEZhY3RvcnldXS5cbiAgICAgKi9cbiAgICBkZWZhdWx0UmVuZGVyZWRXaWRnZXRGYWN0b3J5KHBhdGgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBtYXRjaGluZyBmaWxlIHR5cGVzLlxuICAgICAgICBjb25zdCBmdHMgPSB0aGlzLmdldEZpbGVUeXBlc0ZvclBhdGgoUGF0aEV4dC5iYXNlbmFtZShwYXRoKSk7XG4gICAgICAgIGxldCBmYWN0b3J5ID0gdW5kZWZpbmVkO1xuICAgICAgICAvLyBGaW5kIGlmIGEgdGhlcmUgaXMgYSBkZWZhdWx0IHJlbmRlcmVkIGZhY3RvcnkgZm9yIHRoaXMgdHlwZS5cbiAgICAgICAgZm9yIChjb25zdCBmdCBvZiBmdHMpIHtcbiAgICAgICAgICAgIGlmIChmdC5uYW1lIGluIHRoaXMuX2RlZmF1bHRSZW5kZXJlZFdpZGdldEZhY3Rvcmllcykge1xuICAgICAgICAgICAgICAgIGZhY3RvcnkgPSB0aGlzLl93aWRnZXRGYWN0b3JpZXNbdGhpcy5fZGVmYXVsdFJlbmRlcmVkV2lkZ2V0RmFjdG9yaWVzW2Z0Lm5hbWVdXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFjdG9yeSB8fCB0aGlzLmRlZmF1bHRXaWRnZXRGYWN0b3J5KHBhdGgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRlZmF1bHQgd2lkZ2V0IGZhY3RvcnkgZm9yIGEgcGF0aC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIC0gQW4gb3B0aW9uYWwgZmlsZSBwYXRoIHRvIGZpbHRlciB0aGUgcmVzdWx0cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBkZWZhdWx0IHdpZGdldCBmYWN0b3J5IGZvciBhbiBwYXRoLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byB0aGUgZmlyc3QgdmFsdWUgaW4gW1twcmVmZXJyZWRXaWRnZXRGYWN0b3JpZXNdXS5cbiAgICAgKi9cbiAgICBkZWZhdWx0V2lkZ2V0RmFjdG9yeShwYXRoKSB7XG4gICAgICAgIGlmICghcGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dpZGdldEZhY3Rvcmllc1t0aGlzLl9kZWZhdWx0V2lkZ2V0RmFjdG9yeV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucHJlZmVycmVkV2lkZ2V0RmFjdG9yaWVzKHBhdGgpWzBdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgb3ZlcnJpZGVzIGZvciB0aGUgZGVmYXVsdCB3aWRnZXQgZmFjdG9yeSBmb3IgYSBmaWxlIHR5cGUuXG4gICAgICpcbiAgICAgKiBOb3JtYWxseSwgYSB3aWRnZXQgZmFjdG9yeSBpbmZvcm1zIHRoZSBkb2N1bWVudCByZWdpc3RyeSB3aGljaCBmaWxlIHR5cGVzXG4gICAgICogaXQgc2hvdWxkIGJlIHRoZSBkZWZhdWx0IGZvciB1c2luZyB0aGUgYGRlZmF1bHRGb3JgIG9wdGlvbiBpbiB0aGVcbiAgICAgKiBJV2lkZ2V0RmFjdG9yeU9wdGlvbnMuIFRoaXMgZnVuY3Rpb24gY2FuIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhhdCBhZnRlclxuICAgICAqIHRoZSBmYWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGZpbGVUeXBlOiBUaGUgbmFtZSBvZiB0aGUgZmlsZSB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIGZhY3Rvcnk6IFRoZSBuYW1lIG9mIHRoZSBmYWN0b3J5LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIElmIGBmYWN0b3J5YCBpcyB1bmRlZmluZWQsIHRoZW4gYW55IG92ZXJyaWRlIHdpbGwgYmUgdW5zZXQsIGFuZCB0aGVcbiAgICAgKiBkZWZhdWx0IGZhY3Rvcnkgd2lsbCByZXZlcnQgdG8gdGhlIG9yaWdpbmFsIHZhbHVlLlxuICAgICAqXG4gICAgICogSWYgYGZhY3RvcnlgIG9yIGBmaWxlVHlwZWAgYXJlIG5vdCBrbm93biB0byB0aGUgZG9jcmVnaXN0cnksIG9yXG4gICAgICogaWYgYGZhY3RvcnlgIGNhbm5vdCBvcGVuIGZpbGVzIG9mIHR5cGUgYGZpbGVUeXBlYCwgdGhpcyB3aWxsIHRocm93XG4gICAgICogYW4gZXJyb3IuXG4gICAgICovXG4gICAgc2V0RGVmYXVsdFdpZGdldEZhY3RvcnkoZmlsZVR5cGUsIGZhY3RvcnkpIHtcbiAgICAgICAgZmlsZVR5cGUgPSBmaWxlVHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoIXRoaXMuZ2V0RmlsZVR5cGUoZmlsZVR5cGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IGZpbmQgZmlsZSB0eXBlICR7ZmlsZVR5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmYWN0b3J5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGVmYXVsdFdpZGdldEZhY3RvcnlPdmVycmlkZXNbZmlsZVR5cGVdKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2RlZmF1bHRXaWRnZXRGYWN0b3J5T3ZlcnJpZGVzW2ZpbGVUeXBlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuZ2V0V2lkZ2V0RmFjdG9yeShmYWN0b3J5KSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYENhbm5vdCBmaW5kIHdpZGdldCBmYWN0b3J5ICR7ZmFjdG9yeX1gKTtcbiAgICAgICAgfVxuICAgICAgICBmYWN0b3J5ID0gZmFjdG9yeS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBmYWN0b3JpZXMgPSB0aGlzLl93aWRnZXRGYWN0b3JpZXNGb3JGaWxlVHlwZVtmaWxlVHlwZV07XG4gICAgICAgIGlmIChmYWN0b3J5ICE9PSB0aGlzLl9kZWZhdWx0V2lkZ2V0RmFjdG9yeSAmJlxuICAgICAgICAgICAgIShmYWN0b3JpZXMgJiYgZmFjdG9yaWVzLmluY2x1ZGVzKGZhY3RvcnkpKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEZhY3RvcnkgJHtmYWN0b3J5fSBjYW5ub3QgdmlldyBmaWxlIHR5cGUgJHtmaWxlVHlwZX1gKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kZWZhdWx0V2lkZ2V0RmFjdG9yeU92ZXJyaWRlc1tmaWxlVHlwZV0gPSBmYWN0b3J5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaXRlcmF0b3Igb3ZlciB0aGUgd2lkZ2V0IGZhY3RvcmllcyB0aGF0IGhhdmUgYmVlbiByZWdpc3RlcmVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgaXRlcmF0b3Igb2Ygd2lkZ2V0IGZhY3Rvcmllcy5cbiAgICAgKi9cbiAgICB3aWRnZXRGYWN0b3JpZXMoKSB7XG4gICAgICAgIHJldHVybiBtYXAoT2JqZWN0LmtleXModGhpcy5fd2lkZ2V0RmFjdG9yaWVzKSwgbmFtZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2lkZ2V0RmFjdG9yaWVzW25hbWVdO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGl0ZXJhdG9yIG92ZXIgdGhlIG1vZGVsIGZhY3RvcmllcyB0aGF0IGhhdmUgYmVlbiByZWdpc3RlcmVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgaXRlcmF0b3Igb2YgbW9kZWwgZmFjdG9yaWVzLlxuICAgICAqL1xuICAgIG1vZGVsRmFjdG9yaWVzKCkge1xuICAgICAgICByZXR1cm4gbWFwKE9iamVjdC5rZXlzKHRoaXMuX21vZGVsRmFjdG9yaWVzKSwgbmFtZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9kZWxGYWN0b3JpZXNbbmFtZV07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaXRlcmF0b3Igb3ZlciB0aGUgcmVnaXN0ZXJlZCBleHRlbnNpb25zIGZvciBhIGdpdmVuIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWRnZXROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHdpZGdldCBmYWN0b3J5LlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgaXRlcmF0b3Igb3ZlciB0aGUgd2lkZ2V0IGV4dGVuc2lvbnMuXG4gICAgICovXG4gICAgd2lkZ2V0RXh0ZW5zaW9ucyh3aWRnZXROYW1lKSB7XG4gICAgICAgIHdpZGdldE5hbWUgPSB3aWRnZXROYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICghKHdpZGdldE5hbWUgaW4gdGhpcy5fZXh0ZW5kZXJzKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheUl0ZXJhdG9yKHRoaXMuX2V4dGVuZGVyc1t3aWRnZXROYW1lXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpdGVyYXRvciBvdmVyIHRoZSBmaWxlIHR5cGVzIHRoYXQgaGF2ZSBiZWVuIHJlZ2lzdGVyZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBpdGVyYXRvciBvZiBmaWxlIHR5cGVzLlxuICAgICAqL1xuICAgIGZpbGVUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheUl0ZXJhdG9yKHRoaXMuX2ZpbGVUeXBlcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCBhIHdpZGdldCBmYWN0b3J5IGJ5IG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkZ2V0TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSB3aWRnZXQgZmFjdG9yeS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgd2lkZ2V0IGZhY3RvcnkgaW5zdGFuY2UuXG4gICAgICovXG4gICAgZ2V0V2lkZ2V0RmFjdG9yeSh3aWRnZXROYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWRnZXRGYWN0b3JpZXNbd2lkZ2V0TmFtZS50b0xvd2VyQ2FzZSgpXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGEgbW9kZWwgZmFjdG9yeSBieSBuYW1lLlxuICAgICAqXG4gICAgICogQHBhcmFtIG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgZmFjdG9yeS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgbW9kZWwgZmFjdG9yeSBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBnZXRNb2RlbEZhY3RvcnkobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZWxGYWN0b3JpZXNbbmFtZS50b0xvd2VyQ2FzZSgpXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IGEgZmlsZSB0eXBlIGJ5IG5hbWUuXG4gICAgICovXG4gICAgZ2V0RmlsZVR5cGUobmFtZSkge1xuICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gZmluZCh0aGlzLl9maWxlVHlwZXMsIGZpbGVUeXBlID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmaWxlVHlwZS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IG5hbWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgYSBrZXJuZWwgcHJlZmVyZW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIC0gVGhlIGZpbGUgcGF0aC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWRnZXROYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHdpZGdldCBmYWN0b3J5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGtlcm5lbCAtIEFuIG9wdGlvbmFsIGV4aXN0aW5nIGtlcm5lbCBtb2RlbC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEga2VybmVsIHByZWZlcmVuY2UuXG4gICAgICovXG4gICAgZ2V0S2VybmVsUHJlZmVyZW5jZShwYXRoLCB3aWRnZXROYW1lLCBrZXJuZWwpIHtcbiAgICAgICAgd2lkZ2V0TmFtZSA9IHdpZGdldE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3Qgd2lkZ2V0RmFjdG9yeSA9IHRoaXMuX3dpZGdldEZhY3Rvcmllc1t3aWRnZXROYW1lXTtcbiAgICAgICAgaWYgKCF3aWRnZXRGYWN0b3J5KSB7XG4gICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1vZGVsRmFjdG9yeSA9IHRoaXMuZ2V0TW9kZWxGYWN0b3J5KHdpZGdldEZhY3RvcnkubW9kZWxOYW1lIHx8ICd0ZXh0Jyk7XG4gICAgICAgIGlmICghbW9kZWxGYWN0b3J5KSB7XG4gICAgICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlID0gbW9kZWxGYWN0b3J5LnByZWZlcnJlZExhbmd1YWdlKFBhdGhFeHQuYmFzZW5hbWUocGF0aCkpO1xuICAgICAgICBjb25zdCBuYW1lID0ga2VybmVsICYmIGtlcm5lbC5uYW1lO1xuICAgICAgICBjb25zdCBpZCA9IGtlcm5lbCAmJiBrZXJuZWwuaWQ7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICAgIHNob3VsZFN0YXJ0OiB3aWRnZXRGYWN0b3J5LnByZWZlcktlcm5lbCxcbiAgICAgICAgICAgIGNhblN0YXJ0OiB3aWRnZXRGYWN0b3J5LmNhblN0YXJ0S2VybmVsLFxuICAgICAgICAgICAgc2h1dGRvd25PbkRpc3Bvc2U6IHdpZGdldEZhY3Rvcnkuc2h1dGRvd25PbkNsb3NlLFxuICAgICAgICAgICAgYXV0b1N0YXJ0RGVmYXVsdDogd2lkZ2V0RmFjdG9yeS5hdXRvU3RhcnREZWZhdWx0XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYmVzdCBmaWxlIHR5cGUgZ2l2ZW4gYSBjb250ZW50cyBtb2RlbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtb2RlbCAtIFRoZSBjb250ZW50cyBtb2RlbCBvZiBpbnRlcmVzdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBiZXN0IG1hdGNoaW5nIGZpbGUgdHlwZS5cbiAgICAgKi9cbiAgICBnZXRGaWxlVHlwZUZvck1vZGVsKG1vZGVsKSB7XG4gICAgICAgIHN3aXRjaCAobW9kZWwudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZGlyZWN0b3J5JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gKGZpbmQodGhpcy5fZmlsZVR5cGVzLCBmdCA9PiBmdC5jb250ZW50VHlwZSA9PT0gJ2RpcmVjdG9yeScpIHx8XG4gICAgICAgICAgICAgICAgICAgIERvY3VtZW50UmVnaXN0cnkuZ2V0RGVmYXVsdERpcmVjdG9yeUZpbGVUeXBlKHRoaXMudHJhbnNsYXRvcikpO1xuICAgICAgICAgICAgY2FzZSAnbm90ZWJvb2snOlxuICAgICAgICAgICAgICAgIHJldHVybiAoZmluZCh0aGlzLl9maWxlVHlwZXMsIGZ0ID0+IGZ0LmNvbnRlbnRUeXBlID09PSAnbm90ZWJvb2snKSB8fFxuICAgICAgICAgICAgICAgICAgICBEb2N1bWVudFJlZ2lzdHJ5LmdldERlZmF1bHROb3RlYm9va0ZpbGVUeXBlKHRoaXMudHJhbnNsYXRvcikpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyBGaW5kIHRoZSBiZXN0IG1hdGNoaW5nIGV4dGVuc2lvbi5cbiAgICAgICAgICAgICAgICBpZiAobW9kZWwubmFtZSB8fCBtb2RlbC5wYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBtb2RlbC5uYW1lIHx8IFBhdGhFeHQuYmFzZW5hbWUobW9kZWwucGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZ0cyA9IHRoaXMuZ2V0RmlsZVR5cGVzRm9yUGF0aChuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZ0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnRzWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5nZXRGaWxlVHlwZSgndGV4dCcpIHx8XG4gICAgICAgICAgICAgICAgICAgIERvY3VtZW50UmVnaXN0cnkuZ2V0RGVmYXVsdFRleHRGaWxlVHlwZSh0aGlzLnRyYW5zbGF0b3IpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGZpbGUgdHlwZXMgdGhhdCBtYXRjaCBhIGZpbGUgbmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIC0gVGhlIHBhdGggb2YgdGhlIGZpbGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBbiBvcmRlcmVkIGxpc3Qgb2YgbWF0Y2hpbmcgZmlsZSB0eXBlcy5cbiAgICAgKi9cbiAgICBnZXRGaWxlVHlwZXNGb3JQYXRoKHBhdGgpIHtcbiAgICAgICAgY29uc3QgZnRzID0gW107XG4gICAgICAgIGNvbnN0IG5hbWUgPSBQYXRoRXh0LmJhc2VuYW1lKHBhdGgpO1xuICAgICAgICAvLyBMb29rIGZvciBhIHBhdHRlcm4gbWF0Y2ggZmlyc3QuXG4gICAgICAgIGxldCBmdCA9IGZpbmQodGhpcy5fZmlsZVR5cGVzLCBmdCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gISEoZnQucGF0dGVybiAmJiBuYW1lLm1hdGNoKGZ0LnBhdHRlcm4pICE9PSBudWxsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChmdCkge1xuICAgICAgICAgICAgZnRzLnB1c2goZnQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZW4gbG9vayBieSBleHRlbnNpb24gbmFtZSwgc3RhcnRpbmcgd2l0aCB0aGUgbG9uZ2VzdFxuICAgICAgICBsZXQgZXh0ID0gUHJpdmF0ZS5leHRuYW1lKG5hbWUpO1xuICAgICAgICB3aGlsZSAoZXh0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGZ0U3Vic2V0ID0gdGhpcy5fZmlsZVR5cGVzLmZpbHRlcihmdCA9PiBcbiAgICAgICAgICAgIC8vIEluIFByaXZhdGUuZXh0bmFtZSwgdGhlIGV4dGVuc2lvbiBpcyB0cmFuc2Zvcm1lZCB0byBsb3dlciBjYXNlXG4gICAgICAgICAgICBmdC5leHRlbnNpb25zLm1hcChleHRlbnNpb24gPT4gZXh0ZW5zaW9uLnRvTG93ZXJDYXNlKCkpLmluY2x1ZGVzKGV4dCkpO1xuICAgICAgICAgICAgZnRzLnB1c2goLi4uZnRTdWJzZXQpO1xuICAgICAgICAgICAgZXh0ID0gJy4nICsgZXh0LnNwbGl0KCcuJykuc2xpY2UoMikuam9pbignLicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmdHM7XG4gICAgfVxufVxuLyoqXG4gKiBUaGUgbmFtZXNwYWNlIGZvciB0aGUgYERvY3VtZW50UmVnaXN0cnlgIGNsYXNzIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoRG9jdW1lbnRSZWdpc3RyeSkge1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0cyB1c2VkIGZvciBhIGZpbGUgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0cmFuc2xhdG9yIC0gVGhlIGFwcGxpY2F0aW9uIGxhbmd1YWdlIHRyYW5zbGF0b3IuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgZGVmYXVsdCBmaWxlIHR5cGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RmlsZVR5cGVEZWZhdWx0cyh0cmFuc2xhdG9yKSB7XG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IgPT09IG51bGwgfHwgdHJhbnNsYXRvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJhbnMuX18oJ2RlZmF1bHQnKSxcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IFtdLFxuICAgICAgICAgICAgbWltZVR5cGVzOiBbXSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnZmlsZScsXG4gICAgICAgICAgICBmaWxlRm9ybWF0OiAndGV4dCdcbiAgICAgICAgfTtcbiAgICB9XG4gICAgRG9jdW1lbnRSZWdpc3RyeS5nZXRGaWxlVHlwZURlZmF1bHRzID0gZ2V0RmlsZVR5cGVEZWZhdWx0cztcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCB0ZXh0IGZpbGUgdHlwZSB1c2VkIGJ5IHRoZSBkb2N1bWVudCByZWdpc3RyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB0cmFuc2xhdG9yIC0gVGhlIGFwcGxpY2F0aW9uIGxhbmd1YWdlIHRyYW5zbGF0b3IuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBUaGUgZGVmYXVsdCB0ZXh0IGZpbGUgdHlwZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXREZWZhdWx0VGV4dEZpbGVUeXBlKHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvciA9PT0gbnVsbCB8fCB0cmFuc2xhdG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgY29uc3QgZmlsZVR5cGVEZWZhdWx0cyA9IGdldEZpbGVUeXBlRGVmYXVsdHModHJhbnNsYXRvcik7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGZpbGVUeXBlRGVmYXVsdHMpLCB7IG5hbWU6ICd0ZXh0JywgZGlzcGxheU5hbWU6IHRyYW5zLl9fKCdUZXh0JyksIG1pbWVUeXBlczogWyd0ZXh0L3BsYWluJ10sIGV4dGVuc2lvbnM6IFsnLnR4dCddLCBpY29uOiBmaWxlSWNvbiB9KTtcbiAgICB9XG4gICAgRG9jdW1lbnRSZWdpc3RyeS5nZXREZWZhdWx0VGV4dEZpbGVUeXBlID0gZ2V0RGVmYXVsdFRleHRGaWxlVHlwZTtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBub3RlYm9vayBmaWxlIHR5cGUgdXNlZCBieSB0aGUgZG9jdW1lbnQgcmVnaXN0cnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdHJhbnNsYXRvciAtIFRoZSBhcHBsaWNhdGlvbiBsYW5ndWFnZSB0cmFuc2xhdG9yLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIGRlZmF1bHQgbm90ZWJvb2sgZmlsZSB0eXBlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldERlZmF1bHROb3RlYm9va0ZpbGVUeXBlKHRyYW5zbGF0b3IpIHtcbiAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvciA9PT0gbnVsbCB8fCB0cmFuc2xhdG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgZ2V0RmlsZVR5cGVEZWZhdWx0cyh0cmFuc2xhdG9yKSksIHsgbmFtZTogJ25vdGVib29rJywgZGlzcGxheU5hbWU6IHRyYW5zLl9fKCdOb3RlYm9vaycpLCBtaW1lVHlwZXM6IFsnYXBwbGljYXRpb24veC1pcHluYitqc29uJ10sIGV4dGVuc2lvbnM6IFsnLmlweW5iJ10sIGNvbnRlbnRUeXBlOiAnbm90ZWJvb2snLCBmaWxlRm9ybWF0OiAnanNvbicsIGljb246IG5vdGVib29rSWNvbiB9KTtcbiAgICB9XG4gICAgRG9jdW1lbnRSZWdpc3RyeS5nZXREZWZhdWx0Tm90ZWJvb2tGaWxlVHlwZSA9IGdldERlZmF1bHROb3RlYm9va0ZpbGVUeXBlO1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGRpcmVjdG9yeSBmaWxlIHR5cGUgdXNlZCBieSB0aGUgZG9jdW1lbnQgcmVnaXN0cnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdHJhbnNsYXRvciAtIFRoZSBhcHBsaWNhdGlvbiBsYW5ndWFnZSB0cmFuc2xhdG9yLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIGRlZmF1bHQgZGlyZWN0b3J5IGZpbGUgdHlwZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXREZWZhdWx0RGlyZWN0b3J5RmlsZVR5cGUodHJhbnNsYXRvcikge1xuICAgICAgICB0cmFuc2xhdG9yID0gdHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yID09PSBudWxsIHx8IHRyYW5zbGF0b3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBnZXRGaWxlVHlwZURlZmF1bHRzKHRyYW5zbGF0b3IpKSwgeyBuYW1lOiAnZGlyZWN0b3J5JywgZGlzcGxheU5hbWU6IHRyYW5zLl9fKCdEaXJlY3RvcnknKSwgZXh0ZW5zaW9uczogW10sIG1pbWVUeXBlczogWyd0ZXh0L2RpcmVjdG9yeSddLCBjb250ZW50VHlwZTogJ2RpcmVjdG9yeScsIGljb246IGZvbGRlckljb24gfSk7XG4gICAgfVxuICAgIERvY3VtZW50UmVnaXN0cnkuZ2V0RGVmYXVsdERpcmVjdG9yeUZpbGVUeXBlID0gZ2V0RGVmYXVsdERpcmVjdG9yeUZpbGVUeXBlO1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZhdWx0IGZpbGUgdHlwZXMgdXNlZCBieSB0aGUgZG9jdW1lbnQgcmVnaXN0cnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdHJhbnNsYXRvciAtIFRoZSBhcHBsaWNhdGlvbiBsYW5ndWFnZSB0cmFuc2xhdG9yLlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIGRlZmF1bHQgZGlyZWN0b3J5IGZpbGUgdHlwZXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RGVmYXVsdEZpbGVUeXBlcyh0cmFuc2xhdG9yKSB7XG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IgPT09IG51bGwgfHwgdHJhbnNsYXRvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBnZXREZWZhdWx0VGV4dEZpbGVUeXBlKHRyYW5zbGF0b3IpLFxuICAgICAgICAgICAgZ2V0RGVmYXVsdE5vdGVib29rRmlsZVR5cGUodHJhbnNsYXRvciksXG4gICAgICAgICAgICBnZXREZWZhdWx0RGlyZWN0b3J5RmlsZVR5cGUodHJhbnNsYXRvciksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ21hcmtkb3duJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJhbnMuX18oJ01hcmtkb3duIEZpbGUnKSxcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbJy5tZCddLFxuICAgICAgICAgICAgICAgIG1pbWVUeXBlczogWyd0ZXh0L21hcmtkb3duJ10sXG4gICAgICAgICAgICAgICAgaWNvbjogbWFya2Rvd25JY29uXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdQREYnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiB0cmFucy5fXygnUERGIEZpbGUnKSxcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbJy5wZGYnXSxcbiAgICAgICAgICAgICAgICBtaW1lVHlwZXM6IFsnYXBwbGljYXRpb24vcGRmJ10sXG4gICAgICAgICAgICAgICAgaWNvbjogcGRmSWNvblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAncHl0aG9uJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJhbnMuX18oJ1B5dGhvbiBGaWxlJyksXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogWycucHknXSxcbiAgICAgICAgICAgICAgICBtaW1lVHlwZXM6IFsndGV4dC94LXB5dGhvbiddLFxuICAgICAgICAgICAgICAgIGljb246IHB5dGhvbkljb25cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiB0cmFucy5fXygnSlNPTiBGaWxlJyksXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogWycuanNvbiddLFxuICAgICAgICAgICAgICAgIG1pbWVUeXBlczogWydhcHBsaWNhdGlvbi9qc29uJ10sXG4gICAgICAgICAgICAgICAgaWNvbjoganNvbkljb25cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2p1bGlhJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJhbnMuX18oJ0p1bGlhIEZpbGUnKSxcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbJy5qbCddLFxuICAgICAgICAgICAgICAgIG1pbWVUeXBlczogWyd0ZXh0L3gtanVsaWEnXSxcbiAgICAgICAgICAgICAgICBpY29uOiBqdWxpYUljb25cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2NzdicsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IHRyYW5zLl9fKCdDU1YgRmlsZScpLFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnM6IFsnLmNzdiddLFxuICAgICAgICAgICAgICAgIG1pbWVUeXBlczogWyd0ZXh0L2NzdiddLFxuICAgICAgICAgICAgICAgIGljb246IHNwcmVhZHNoZWV0SWNvblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAndHN2JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJhbnMuX18oJ1RTViBGaWxlJyksXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogWycudHN2J10sXG4gICAgICAgICAgICAgICAgbWltZVR5cGVzOiBbJ3RleHQvY3N2J10sXG4gICAgICAgICAgICAgICAgaWNvbjogc3ByZWFkc2hlZXRJY29uXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdyJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJhbnMuX18oJ1IgRmlsZScpLFxuICAgICAgICAgICAgICAgIG1pbWVUeXBlczogWyd0ZXh0L3gtcnNyYyddLFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnM6IFsnLlInXSxcbiAgICAgICAgICAgICAgICBpY29uOiByS2VybmVsSWNvblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAneWFtbCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IHRyYW5zLl9fKCdZQU1MIEZpbGUnKSxcbiAgICAgICAgICAgICAgICBtaW1lVHlwZXM6IFsndGV4dC94LXlhbWwnLCAndGV4dC95YW1sJ10sXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogWycueWFtbCcsICcueW1sJ10sXG4gICAgICAgICAgICAgICAgaWNvbjogeWFtbEljb25cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ3N2ZycsXG4gICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6IHRyYW5zLl9fKCdJbWFnZScpLFxuICAgICAgICAgICAgICAgIG1pbWVUeXBlczogWydpbWFnZS9zdmcreG1sJ10sXG4gICAgICAgICAgICAgICAgZXh0ZW5zaW9uczogWycuc3ZnJ10sXG4gICAgICAgICAgICAgICAgaWNvbjogaW1hZ2VJY29uLFxuICAgICAgICAgICAgICAgIGZpbGVGb3JtYXQ6ICdiYXNlNjQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICd0aWZmJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJhbnMuX18oJ0ltYWdlJyksXG4gICAgICAgICAgICAgICAgbWltZVR5cGVzOiBbJ2ltYWdlL3RpZmYnXSxcbiAgICAgICAgICAgICAgICBleHRlbnNpb25zOiBbJy50aWYnLCAnLnRpZmYnXSxcbiAgICAgICAgICAgICAgICBpY29uOiBpbWFnZUljb24sXG4gICAgICAgICAgICAgICAgZmlsZUZvcm1hdDogJ2Jhc2U2NCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2pwZWcnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiB0cmFucy5fXygnSW1hZ2UnKSxcbiAgICAgICAgICAgICAgICBtaW1lVHlwZXM6IFsnaW1hZ2UvanBlZyddLFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnM6IFsnLmpwZycsICcuanBlZyddLFxuICAgICAgICAgICAgICAgIGljb246IGltYWdlSWNvbixcbiAgICAgICAgICAgICAgICBmaWxlRm9ybWF0OiAnYmFzZTY0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnZ2lmJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJhbnMuX18oJ0ltYWdlJyksXG4gICAgICAgICAgICAgICAgbWltZVR5cGVzOiBbJ2ltYWdlL2dpZiddLFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnM6IFsnLmdpZiddLFxuICAgICAgICAgICAgICAgIGljb246IGltYWdlSWNvbixcbiAgICAgICAgICAgICAgICBmaWxlRm9ybWF0OiAnYmFzZTY0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAncG5nJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJhbnMuX18oJ0ltYWdlJyksXG4gICAgICAgICAgICAgICAgbWltZVR5cGVzOiBbJ2ltYWdlL3BuZyddLFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnM6IFsnLnBuZyddLFxuICAgICAgICAgICAgICAgIGljb246IGltYWdlSWNvbixcbiAgICAgICAgICAgICAgICBmaWxlRm9ybWF0OiAnYmFzZTY0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiAnYm1wJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogdHJhbnMuX18oJ0ltYWdlJyksXG4gICAgICAgICAgICAgICAgbWltZVR5cGVzOiBbJ2ltYWdlL2JtcCddLFxuICAgICAgICAgICAgICAgIGV4dGVuc2lvbnM6IFsnLmJtcCddLFxuICAgICAgICAgICAgICAgIGljb246IGltYWdlSWNvbixcbiAgICAgICAgICAgICAgICBmaWxlRm9ybWF0OiAnYmFzZTY0J1xuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cbiAgICBEb2N1bWVudFJlZ2lzdHJ5LmdldERlZmF1bHRGaWxlVHlwZXMgPSBnZXREZWZhdWx0RmlsZVR5cGVzO1xufSkoRG9jdW1lbnRSZWdpc3RyeSB8fCAoRG9jdW1lbnRSZWdpc3RyeSA9IHt9KSk7XG4vKipcbiAqIEEgcHJpdmF0ZSBuYW1lc3BhY2UgZm9yIERvY3VtZW50UmVnaXN0cnkgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGV4dGVuc2lvbiBuYW1lIG9mIGEgcGF0aC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmaWxlIC0gc3RyaW5nLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIERvdHRlZCBmaWxlbmFtZXMgKGUuZy4gYFwiLnRhYmxlLmpzb25cImAgYXJlIGFsbG93ZWQpLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGV4dG5hbWUocGF0aCkge1xuICAgICAgICBjb25zdCBwYXJ0cyA9IFBhdGhFeHQuYmFzZW5hbWUocGF0aCkuc3BsaXQoJy4nKTtcbiAgICAgICAgcGFydHMuc2hpZnQoKTtcbiAgICAgICAgY29uc3QgZXh0ID0gJy4nICsgcGFydHMuam9pbignLicpO1xuICAgICAgICByZXR1cm4gZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIFByaXZhdGUuZXh0bmFtZSA9IGV4dG5hbWU7XG4gICAgLyoqXG4gICAgICogQSBuby1vcCBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBub09wKCkge1xuICAgICAgICAvKiBuby1vcCAqL1xuICAgIH1cbiAgICBQcml2YXRlLm5vT3AgPSBub09wO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWdpc3RyeS5qcy5tYXAiXSwic291cmNlUm9vdCI6IiJ9