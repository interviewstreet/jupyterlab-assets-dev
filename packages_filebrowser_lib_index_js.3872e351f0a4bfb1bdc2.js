(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_filebrowser_lib_index_js"],{

/***/ "../../packages/filebrowser/lib/browser.js":
/*!*************************************************!*\
  !*** ../../packages/filebrowser/lib/browser.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileBrowser": () => (/* binding */ FileBrowser)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _crumbs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./crumbs */ "../../packages/filebrowser/lib/crumbs.js");
/* harmony import */ var _listing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./listing */ "../../packages/filebrowser/lib/listing.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.






/**
 * The class name added to file browsers.
 */
const FILE_BROWSER_CLASS = 'jp-FileBrowser';
/**
 * The class name added to the filebrowser crumbs node.
 */
const CRUMBS_CLASS = 'jp-FileBrowser-crumbs';
/**
 * The class name added to the filebrowser filterbox node.
 */
const FILTERBOX_CLASS = 'jp-FileBrowser-filterBox';
/**
 * The class name added to the filebrowser toolbar node.
 */
const TOOLBAR_CLASS = 'jp-FileBrowser-toolbar';
/**
 * The class name added to the filebrowser listing node.
 */
const LISTING_CLASS = 'jp-FileBrowser-listing';
/**
 * A widget which hosts a file browser.
 *
 * The widget uses the Jupyter Contents API to retrieve contents,
 * and presents itself as a flat list of files and directories with
 * breadcrumbs.
 */
class FileBrowser extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Widget {
    /**
     * Construct a new file browser.
     *
     * @param options - The file browser options.
     */
    constructor(options) {
        super();
        this._showLastModifiedColumn = true;
        this._useFuzzyFilter = true;
        this._showHiddenFiles = false;
        this.addClass(FILE_BROWSER_CLASS);
        this.id = options.id;
        const model = (this.model = options.model);
        const renderer = options.renderer;
        const translator = this.translator;
        model.connectionFailure.connect(this._onConnectionFailure, this);
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        this._manager = model.manager;
        this._trans = this.translator.load('jupyterlab');
        this.crumbs = new _crumbs__WEBPACK_IMPORTED_MODULE_4__.BreadCrumbs({ model, translator });
        this.toolbar = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Toolbar();
        // a11y
        this.toolbar.node.setAttribute('role', 'navigation');
        this.toolbar.node.setAttribute('aria-label', this._trans.__('file browser'));
        this._directoryPending = false;
        this.listing = this.createDirListing({
            model,
            renderer,
            translator: this.translator
        });
        this._filenameSearcher = (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.FilenameSearcher)({
            updateFilter: (filterFn) => {
                this.listing.model.setFilter(value => {
                    return filterFn(value.name.toLowerCase());
                });
            },
            useFuzzyFilter: this._useFuzzyFilter,
            placeholder: this._trans.__('Filter files by name')
        });
        this.crumbs.addClass(CRUMBS_CLASS);
        this.toolbar.addClass(TOOLBAR_CLASS);
        this._filenameSearcher.addClass(FILTERBOX_CLASS);
        this.listing.addClass(LISTING_CLASS);
        this.layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.PanelLayout();
        this.layout.addWidget(this.toolbar);
        this.layout.addWidget(this._filenameSearcher);
        this.layout.addWidget(this.crumbs);
        this.layout.addWidget(this.listing);
        if (options.restore !== false) {
            void model.restore(this.id);
        }
    }
    /**
     * Whether to show active file in file browser
     */
    get navigateToCurrentDirectory() {
        return this._navigateToCurrentDirectory;
    }
    set navigateToCurrentDirectory(value) {
        this._navigateToCurrentDirectory = value;
    }
    /**
     * Whether to show the last modified column
     */
    get showLastModifiedColumn() {
        return this._showLastModifiedColumn;
    }
    set showLastModifiedColumn(value) {
        if (this.listing.setColumnVisibility) {
            this.listing.setColumnVisibility('last_modified', value);
            this._showLastModifiedColumn = value;
        }
        else {
            console.warn('Listing does not support toggling column visibility');
        }
    }
    /**
     * Whether to use fuzzy filtering on file names.
     */
    set useFuzzyFilter(value) {
        this._useFuzzyFilter = value;
        this._filenameSearcher = (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.FilenameSearcher)({
            updateFilter: (filterFn) => {
                this.listing.model.setFilter(value => {
                    return filterFn(value.name.toLowerCase());
                });
            },
            useFuzzyFilter: this._useFuzzyFilter,
            placeholder: this._trans.__('Filter files by name'),
            forceRefresh: true
        });
        this._filenameSearcher.addClass(FILTERBOX_CLASS);
        this.layout.removeWidget(this._filenameSearcher);
        this.layout.removeWidget(this.crumbs);
        this.layout.removeWidget(this.listing);
        this.layout.addWidget(this._filenameSearcher);
        this.layout.addWidget(this.crumbs);
        this.layout.addWidget(this.listing);
    }
    /**
     * Whether to show hidden files
     */
    get showHiddenFiles() {
        return this._showHiddenFiles;
    }
    set showHiddenFiles(value) {
        this.model.showHiddenFiles(value);
        this._showHiddenFiles = value;
    }
    /**
     * Create an iterator over the listing's selected items.
     *
     * @returns A new iterator over the listing's selected items.
     */
    selectedItems() {
        return this.listing.selectedItems();
    }
    /**
     * Select an item by name.
     *
     * @param name - The name of the item to select.
     */
    async selectItemByName(name) {
        await this.listing.selectItemByName(name);
    }
    clearSelectedItems() {
        this.listing.clearSelectedItems();
    }
    /**
     * Rename the first currently selected item.
     *
     * @returns A promise that resolves with the new name of the item.
     */
    rename() {
        return this.listing.rename();
    }
    /**
     * Cut the selected items.
     */
    cut() {
        this.listing.cut();
    }
    /**
     * Copy the selected items.
     */
    copy() {
        this.listing.copy();
    }
    /**
     * Paste the items from the clipboard.
     *
     * @returns A promise that resolves when the operation is complete.
     */
    paste() {
        return this.listing.paste();
    }
    /**
     * Create a new directory
     */
    createNewDirectory() {
        if (this._directoryPending === true) {
            return;
        }
        this._directoryPending = true;
        // TODO: We should provide a hook into when the
        // directory is done being created. This probably
        // means storing a pendingDirectory promise and
        // returning that if there is already a directory
        // request.
        void this._manager
            .newUntitled({
            path: this.model.path,
            type: 'directory'
        })
            .then(async (model) => {
            await this.listing.selectItemByName(model.name);
            await this.rename();
            this._directoryPending = false;
        })
            .catch(err => {
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans.__('Error'), err);
            this._directoryPending = false;
        });
    }
    /**
     * Create a new file
     */
    createNewFile(options) {
        if (this._filePending === true) {
            return;
        }
        this._filePending = true;
        // TODO: We should provide a hook into when the
        // file is done being created. This probably
        // means storing a pendingFile promise and
        // returning that if there is already a file
        // request.
        void this._manager
            .newUntitled({
            path: this.model.path,
            type: 'file',
            ext: options.ext
        })
            .then(async (model) => {
            await this.listing.selectItemByName(model.name);
            await this.rename();
            this._filePending = false;
        })
            .catch(err => {
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans.__('Error'), err);
            this._filePending = false;
        });
    }
    /**
     * Delete the currently selected item(s).
     *
     * @returns A promise that resolves when the operation is complete.
     */
    delete() {
        return this.listing.delete();
    }
    /**
     * Duplicate the currently selected item(s).
     *
     * @returns A promise that resolves when the operation is complete.
     */
    duplicate() {
        return this.listing.duplicate();
    }
    /**
     * Download the currently selected item(s).
     */
    download() {
        return this.listing.download();
    }
    /**
     * Shut down kernels on the applicable currently selected items.
     *
     * @returns A promise that resolves when the operation is complete.
     */
    shutdownKernels() {
        return this.listing.shutdownKernels();
    }
    /**
     * Select next item.
     */
    selectNext() {
        this.listing.selectNext();
    }
    /**
     * Select previous item.
     */
    selectPrevious() {
        this.listing.selectPrevious();
    }
    /**
     * Find a model given a click.
     *
     * @param event - The mouse event.
     *
     * @returns The model for the selected file.
     */
    modelForClick(event) {
        return this.listing.modelForClick(event);
    }
    /**
     * Create the underlying DirListing instance.
     *
     * @param options - The DirListing constructor options.
     *
     * @returns The created DirListing instance.
     */
    createDirListing(options) {
        return new _listing__WEBPACK_IMPORTED_MODULE_5__.DirListing(options);
    }
    /**
     * Handle a connection lost signal from the model.
     */
    _onConnectionFailure(sender, args) {
        if (args instanceof _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.ResponseError &&
            args.response.status === 404) {
            const title = this._trans.__('Directory not found');
            args.message = this._trans.__('Directory not found: "%1"', this.model.path);
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(title, args);
        }
    }
}
//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "../../packages/filebrowser/lib/crumbs.js":
/*!************************************************!*\
  !*** ../../packages/filebrowser/lib/crumbs.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BreadCrumbs": () => (/* binding */ BreadCrumbs)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/docmanager */ "webpack/sharing/consume/default/@jupyterlab/docmanager/@jupyterlab/docmanager");
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/domutils */ "webpack/sharing/consume/default/@lumino/domutils/@lumino/domutils");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_domutils__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_7__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * The class name added to the breadcrumb node.
 */
const BREADCRUMB_CLASS = 'jp-BreadCrumbs';
/**
 * The class name for the breadcrumbs home node
 */
const BREADCRUMB_ROOT_CLASS = 'jp-BreadCrumbs-home';
/**
 * The class name for the breadcrumbs preferred node
 */
const BREADCRUMB_PREFERRED_CLASS = 'jp-BreadCrumbs-preferred';
/**
 * The class name added to the breadcrumb node.
 */
const BREADCRUMB_ITEM_CLASS = 'jp-BreadCrumbs-item';
/**
 * Bread crumb paths.
 */
const BREAD_CRUMB_PATHS = ['/', '../../', '../', ''];
/**
 * The mime type for a contents drag object.
 */
const CONTENTS_MIME = 'application/x-jupyter-icontents';
/**
 * The class name added to drop targets.
 */
const DROP_TARGET_CLASS = 'jp-mod-dropTarget';
/**
 * A class which hosts folder breadcrumbs.
 */
class BreadCrumbs extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_7__.Widget {
    /**
     * Construct a new file browser crumb widget.
     *
     * @param model - The file browser view model.
     */
    constructor(options) {
        super();
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this._model = options.model;
        this.addClass(BREADCRUMB_CLASS);
        this._crumbs = Private.createCrumbs();
        this._crumbSeps = Private.createCrumbSeparators();
        const hasPreferred = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PageConfig.getOption('preferredPath');
        this._hasPreferred = hasPreferred && hasPreferred !== '/' ? true : false;
        if (this._hasPreferred) {
            this.node.appendChild(this._crumbs[Private.Crumb.Preferred]);
        }
        this.node.appendChild(this._crumbs[Private.Crumb.Home]);
        this._model.refreshed.connect(this.update, this);
    }
    /**
     * Handle the DOM events for the bread crumbs.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the panel's DOM node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'click':
                this._evtClick(event);
                break;
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
                return;
        }
    }
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        this.update();
        const node = this.node;
        node.addEventListener('click', this);
        node.addEventListener('lm-dragenter', this);
        node.addEventListener('lm-dragleave', this);
        node.addEventListener('lm-dragover', this);
        node.addEventListener('lm-drop', this);
    }
    /**
     * A message handler invoked on a `'before-detach'` message.
     */
    onBeforeDetach(msg) {
        super.onBeforeDetach(msg);
        const node = this.node;
        node.removeEventListener('click', this);
        node.removeEventListener('lm-dragenter', this);
        node.removeEventListener('lm-dragleave', this);
        node.removeEventListener('lm-dragover', this);
        node.removeEventListener('lm-drop', this);
    }
    /**
     * A handler invoked on an `'update-request'` message.
     */
    onUpdateRequest(msg) {
        // Update the breadcrumb list.
        const contents = this._model.manager.services.contents;
        const localPath = contents.localPath(this._model.path);
        Private.updateCrumbs(this._crumbs, this._crumbSeps, localPath, this._hasPreferred);
    }
    /**
     * Handle the `'click'` event for the widget.
     */
    _evtClick(event) {
        // Do nothing if it's not a left mouse press.
        if (event.button !== 0) {
            return;
        }
        // Find a valid click target.
        let node = event.target;
        while (node && node !== this.node) {
            if (node.classList.contains(BREADCRUMB_PREFERRED_CLASS)) {
                this._model
                    .cd(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PageConfig.getOption('preferredPath'))
                    .catch(error => (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans.__('Open Error'), error));
                // Stop the event propagation.
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (node.classList.contains(BREADCRUMB_ITEM_CLASS) ||
                node.classList.contains(BREADCRUMB_ROOT_CLASS)) {
                const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__.ArrayExt.findFirstIndex(this._crumbs, value => value === node);
                this._model
                    .cd(BREAD_CRUMB_PATHS[index])
                    .catch(error => (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans.__('Open Error'), error));
                // Stop the event propagation.
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            node = node.parentElement;
        }
    }
    /**
     * Handle the `'lm-dragenter'` event for the widget.
     */
    _evtDragEnter(event) {
        if (event.mimeData.hasData(CONTENTS_MIME)) {
            const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__.ArrayExt.findFirstIndex(this._crumbs, node => _lumino_domutils__WEBPACK_IMPORTED_MODULE_6__.ElementExt.hitTest(node, event.clientX, event.clientY));
            if (index !== -1) {
                if (index !== Private.Crumb.Current) {
                    this._crumbs[index].classList.add(DROP_TARGET_CLASS);
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        }
    }
    /**
     * Handle the `'lm-dragleave'` event for the widget.
     */
    _evtDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        const dropTarget = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(this.node, DROP_TARGET_CLASS);
        if (dropTarget) {
            dropTarget.classList.remove(DROP_TARGET_CLASS);
        }
    }
    /**
     * Handle the `'lm-dragover'` event for the widget.
     */
    _evtDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        event.dropAction = event.proposedAction;
        const dropTarget = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(this.node, DROP_TARGET_CLASS);
        if (dropTarget) {
            dropTarget.classList.remove(DROP_TARGET_CLASS);
        }
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__.ArrayExt.findFirstIndex(this._crumbs, node => _lumino_domutils__WEBPACK_IMPORTED_MODULE_6__.ElementExt.hitTest(node, event.clientX, event.clientY));
        if (index !== -1) {
            this._crumbs[index].classList.add(DROP_TARGET_CLASS);
        }
    }
    /**
     * Handle the `'lm-drop'` event for the widget.
     */
    _evtDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.proposedAction === 'none') {
            event.dropAction = 'none';
            return;
        }
        if (!event.mimeData.hasData(CONTENTS_MIME)) {
            return;
        }
        event.dropAction = event.proposedAction;
        let target = event.target;
        while (target && target.parentElement) {
            if (target.classList.contains(DROP_TARGET_CLASS)) {
                target.classList.remove(DROP_TARGET_CLASS);
                break;
            }
            target = target.parentElement;
        }
        // Get the path based on the target node.
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_5__.ArrayExt.findFirstIndex(this._crumbs, node => node === target);
        if (index === -1) {
            return;
        }
        const model = this._model;
        const path = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.resolve(model.path, BREAD_CRUMB_PATHS[index]);
        const manager = model.manager;
        // Move all of the items.
        const promises = [];
        const oldPaths = event.mimeData.getData(CONTENTS_MIME);
        for (const oldPath of oldPaths) {
            const localOldPath = manager.services.contents.localPath(oldPath);
            const name = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(localOldPath);
            const newPath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.join(path, name);
            promises.push((0,_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__.renameFile)(manager, oldPath, newPath));
        }
        void Promise.all(promises).catch(err => {
            return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans.__('Move Error'), err);
        });
    }
}
/**
 * The namespace for the crumbs private data.
 */
var Private;
(function (Private) {
    /**
     * Breadcrumb item list enum.
     */
    let Crumb;
    (function (Crumb) {
        Crumb[Crumb["Home"] = 0] = "Home";
        Crumb[Crumb["Ellipsis"] = 1] = "Ellipsis";
        Crumb[Crumb["Parent"] = 2] = "Parent";
        Crumb[Crumb["Current"] = 3] = "Current";
        Crumb[Crumb["Preferred"] = 4] = "Preferred";
    })(Crumb = Private.Crumb || (Private.Crumb = {}));
    /**
     * Populate the breadcrumb node.
     */
    function updateCrumbs(breadcrumbs, separators, path, hasPreferred) {
        const node = breadcrumbs[0].parentNode;
        // Remove all but the root or preferred node.
        const firstChild = node.firstChild;
        while (firstChild && firstChild.nextSibling) {
            node.removeChild(firstChild.nextSibling);
        }
        if (hasPreferred) {
            node.appendChild(breadcrumbs[Crumb.Home]);
            node.appendChild(separators[0]);
        }
        else {
            node.appendChild(separators[0]);
        }
        const parts = path.split('/');
        if (parts.length > 2) {
            node.appendChild(breadcrumbs[Crumb.Ellipsis]);
            const grandParent = parts.slice(0, parts.length - 2).join('/');
            breadcrumbs[Crumb.Ellipsis].title = grandParent;
            node.appendChild(separators[1]);
        }
        if (path) {
            if (parts.length >= 2) {
                breadcrumbs[Crumb.Parent].textContent = parts[parts.length - 2];
                node.appendChild(breadcrumbs[Crumb.Parent]);
                const parent = parts.slice(0, parts.length - 1).join('/');
                breadcrumbs[Crumb.Parent].title = parent;
                node.appendChild(separators[2]);
            }
            breadcrumbs[Crumb.Current].textContent = parts[parts.length - 1];
            node.appendChild(breadcrumbs[Crumb.Current]);
            breadcrumbs[Crumb.Current].title = path;
            node.appendChild(separators[3]);
        }
    }
    Private.updateCrumbs = updateCrumbs;
    /**
     * Create the breadcrumb nodes.
     */
    function createCrumbs() {
        const home = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__.folderIcon.element({
            className: BREADCRUMB_ROOT_CLASS,
            tag: 'span',
            title: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PageConfig.getOption('serverRoot') || 'Jupyter Server Root',
            stylesheet: 'breadCrumb'
        });
        const ellipsis = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__.ellipsesIcon.element({
            className: BREADCRUMB_ITEM_CLASS,
            tag: 'span',
            stylesheet: 'breadCrumb'
        });
        const parent = document.createElement('span');
        parent.className = BREADCRUMB_ITEM_CLASS;
        const current = document.createElement('span');
        current.className = BREADCRUMB_ITEM_CLASS;
        const preferred = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_4__.homeIcon.element({
            className: BREADCRUMB_PREFERRED_CLASS,
            tag: 'span',
            title: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PageConfig.getOption('preferredPath') || 'Jupyter Preferred Path',
            stylesheet: 'breadCrumb'
        });
        return [home, ellipsis, parent, current, preferred];
    }
    Private.createCrumbs = createCrumbs;
    /**
     * Create the breadcrumb separator nodes.
     */
    function createCrumbSeparators() {
        const items = [];
        // The maximum number of directories that will be shown in the crumbs
        const MAX_DIRECTORIES = 2;
        // Make separators for after each directory, one at the beginning, and one
        // after a possible ellipsis.
        for (let i = 0; i < MAX_DIRECTORIES + 2; i++) {
            const item = document.createElement('span');
            item.textContent = '/';
            items.push(item);
        }
        return items;
    }
    Private.createCrumbSeparators = createCrumbSeparators;
})(Private || (Private = {}));
//# sourceMappingURL=crumbs.js.map

/***/ }),

/***/ "../../packages/filebrowser/lib/index.js":
/*!***********************************************!*\
  !*** ../../packages/filebrowser/lib/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileBrowser": () => (/* reexport safe */ _browser__WEBPACK_IMPORTED_MODULE_0__.FileBrowser),
/* harmony export */   "BreadCrumbs": () => (/* reexport safe */ _crumbs__WEBPACK_IMPORTED_MODULE_1__.BreadCrumbs),
/* harmony export */   "DirListing": () => (/* reexport safe */ _listing__WEBPACK_IMPORTED_MODULE_2__.DirListing),
/* harmony export */   "CHUNK_SIZE": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_3__.CHUNK_SIZE),
/* harmony export */   "FileBrowserModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_3__.FileBrowserModel),
/* harmony export */   "FilterFileBrowserModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_3__.FilterFileBrowserModel),
/* harmony export */   "LARGE_FILE_SIZE": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_3__.LARGE_FILE_SIZE),
/* harmony export */   "TogglableHiddenFileBrowserModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_3__.TogglableHiddenFileBrowserModel),
/* harmony export */   "FileDialog": () => (/* reexport safe */ _opendialog__WEBPACK_IMPORTED_MODULE_4__.FileDialog),
/* harmony export */   "IFileBrowserCommands": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_5__.IFileBrowserCommands),
/* harmony export */   "IFileBrowserFactory": () => (/* reexport safe */ _tokens__WEBPACK_IMPORTED_MODULE_5__.IFileBrowserFactory),
/* harmony export */   "Uploader": () => (/* reexport safe */ _upload__WEBPACK_IMPORTED_MODULE_6__.Uploader),
/* harmony export */   "FileUploadStatus": () => (/* reexport safe */ _uploadstatus__WEBPACK_IMPORTED_MODULE_7__.FileUploadStatus)
/* harmony export */ });
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browser */ "../../packages/filebrowser/lib/browser.js");
/* harmony import */ var _crumbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./crumbs */ "../../packages/filebrowser/lib/crumbs.js");
/* harmony import */ var _listing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listing */ "../../packages/filebrowser/lib/listing.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model */ "../../packages/filebrowser/lib/model.js");
/* harmony import */ var _opendialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./opendialog */ "../../packages/filebrowser/lib/opendialog.js");
/* harmony import */ var _tokens__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tokens */ "../../packages/filebrowser/lib/tokens.js");
/* harmony import */ var _upload__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./upload */ "../../packages/filebrowser/lib/upload.js");
/* harmony import */ var _uploadstatus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./uploadstatus */ "../../packages/filebrowser/lib/uploadstatus.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module filebrowser
 */








//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/filebrowser/lib/listing.js":
/*!*************************************************!*\
  !*** ../../packages/filebrowser/lib/listing.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DirListing": () => (/* binding */ DirListing)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/docmanager */ "webpack/sharing/consume/default/@jupyterlab/docmanager/@jupyterlab/docmanager");
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/docregistry */ "webpack/sharing/consume/default/@jupyterlab/docregistry/@jupyterlab/docregistry");
/* harmony import */ var _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lumino/domutils */ "webpack/sharing/consume/default/@lumino/domutils/@lumino/domutils");
/* harmony import */ var _lumino_domutils__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_lumino_domutils__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _lumino_dragdrop__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @lumino/dragdrop */ "webpack/sharing/consume/default/@lumino/dragdrop/@lumino/dragdrop");
/* harmony import */ var _lumino_dragdrop__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_lumino_dragdrop__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @lumino/messaging */ "webpack/sharing/consume/default/@lumino/messaging/@lumino/messaging");
/* harmony import */ var _lumino_messaging__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_lumino_messaging__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @lumino/virtualdom */ "webpack/sharing/consume/default/@lumino/virtualdom/@lumino/virtualdom");
/* harmony import */ var _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_13__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.














/**
 * The class name added to DirListing widget.
 */
const DIR_LISTING_CLASS = 'jp-DirListing';
/**
 * The class name added to a dir listing header node.
 */
const HEADER_CLASS = 'jp-DirListing-header';
/**
 * The class name added to a dir listing list header cell.
 */
const HEADER_ITEM_CLASS = 'jp-DirListing-headerItem';
/**
 * The class name added to a header cell text node.
 */
const HEADER_ITEM_TEXT_CLASS = 'jp-DirListing-headerItemText';
/**
 * The class name added to a header cell icon node.
 */
const HEADER_ITEM_ICON_CLASS = 'jp-DirListing-headerItemIcon';
/**
 * The class name added to the dir listing content node.
 */
const CONTENT_CLASS = 'jp-DirListing-content';
/**
 * The class name added to dir listing content item.
 */
const ITEM_CLASS = 'jp-DirListing-item';
/**
 * The class name added to the listing item text cell.
 */
const ITEM_TEXT_CLASS = 'jp-DirListing-itemText';
/**
 * The class name added to the listing item icon cell.
 */
const ITEM_ICON_CLASS = 'jp-DirListing-itemIcon';
/**
 * The class name added to the listing item modified cell.
 */
const ITEM_MODIFIED_CLASS = 'jp-DirListing-itemModified';
/**
 * The class name added to the dir listing editor node.
 */
const EDITOR_CLASS = 'jp-DirListing-editor';
/**
 * The class name added to the name column header cell.
 */
const NAME_ID_CLASS = 'jp-id-name';
/**
 * The class name added to the modified column header cell.
 */
const MODIFIED_ID_CLASS = 'jp-id-modified';
/**
 * The class name added to the narrow column header cell.
 */
const NARROW_ID_CLASS = 'jp-id-narrow';
/**
 * The class name added to the modified column header cell and modified item cell when hidden.
 */
const MODIFIED_COLUMN_HIDDEN = 'jp-LastModified-hidden';
/**
 * The mime type for a contents drag object.
 */
const CONTENTS_MIME = 'application/x-jupyter-icontents';
/**
 * The mime type for a rich contents drag object.
 */
const CONTENTS_MIME_RICH = 'application/x-jupyter-icontentsrich';
/**
 * The class name added to drop targets.
 */
const DROP_TARGET_CLASS = 'jp-mod-dropTarget';
/**
 * The class name added to selected rows.
 */
const SELECTED_CLASS = 'jp-mod-selected';
/**
 * The class name added to drag state icons to add space between the icon and the file name
 */
const DRAG_ICON_CLASS = 'jp-DragIcon';
/**
 * The class name added to the widget when there are items on the clipboard.
 */
const CLIPBOARD_CLASS = 'jp-mod-clipboard';
/**
 * The class name added to cut rows.
 */
const CUT_CLASS = 'jp-mod-cut';
/**
 * The class name added when there are more than one selected rows.
 */
const MULTI_SELECTED_CLASS = 'jp-mod-multiSelected';
/**
 * The class name added to indicate running notebook.
 */
const RUNNING_CLASS = 'jp-mod-running';
/**
 * The class name added for a descending sort.
 */
const DESCENDING_CLASS = 'jp-mod-descending';
/**
 * The maximum duration between two key presses when selecting files by prefix.
 */
const PREFIX_APPEND_DURATION = 1000;
/**
 * The threshold in pixels to start a drag event.
 */
const DRAG_THRESHOLD = 5;
/**
 * A boolean indicating whether the platform is Mac.
 */
const IS_MAC = !!navigator.platform.match(/Mac/i);
/**
 * The factory MIME type supported by lumino dock panels.
 */
const FACTORY_MIME = 'application/vnd.lumino.widget-factory';
/**
 * A widget which hosts a file list area.
 */
class DirListing extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_13__.Widget {
    /**
     * Construct a new file browser directory listing widget.
     *
     * @param model - The file browser view model.
     */
    constructor(options) {
        super({
            node: (options.renderer || DirListing.defaultRenderer).createNode()
        });
        this._items = [];
        this._sortedItems = [];
        this._sortState = {
            direction: 'ascending',
            key: 'name'
        };
        this._onItemOpened = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_11__.Signal(this);
        this._drag = null;
        this._dragData = null;
        this._selectTimer = -1;
        this._isCut = false;
        this._prevPath = '';
        this._clipboard = [];
        this._softSelection = '';
        this.selection = Object.create(null);
        this._searchPrefix = '';
        this._searchPrefixTimer = -1;
        this._inRename = false;
        this._isDirty = false;
        this._hiddenColumns = new Set();
        this.addClass(DIR_LISTING_CLASS);
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this._model = options.model;
        this._model.fileChanged.connect(this._onFileChanged, this);
        this._model.refreshed.connect(this._onModelRefreshed, this);
        this._model.pathChanged.connect(this._onPathChanged, this);
        this._editNode = document.createElement('input');
        this._editNode.className = EDITOR_CLASS;
        this._manager = this._model.manager;
        this._renderer = options.renderer || DirListing.defaultRenderer;
        const headerNode = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(this.node, HEADER_CLASS);
        this._renderer.populateHeaderNode(headerNode, this.translator, this._hiddenColumns);
        this._manager.activateRequested.connect(this._onActivateRequested, this);
    }
    /**
     * Dispose of the resources held by the directory listing.
     */
    dispose() {
        this._items.length = 0;
        this._sortedItems.length = 0;
        this._clipboard.length = 0;
        super.dispose();
    }
    /**
     * Get the model used by the listing.
     */
    get model() {
        return this._model;
    }
    /**
     * Get the dir listing header node.
     *
     * #### Notes
     * This is the node which holds the header cells.
     *
     * Modifying this node directly can lead to undefined behavior.
     */
    get headerNode() {
        return _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(this.node, HEADER_CLASS);
    }
    /**
     * Get the dir listing content node.
     *
     * #### Notes
     * This is the node which holds the item nodes.
     *
     * Modifying this node directly can lead to undefined behavior.
     */
    get contentNode() {
        return _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(this.node, CONTENT_CLASS);
    }
    /**
     * The renderer instance used by the directory listing.
     */
    get renderer() {
        return this._renderer;
    }
    /**
     * The current sort state.
     */
    get sortState() {
        return this._sortState;
    }
    /**
     * A signal fired when an item is opened.
     */
    get onItemOpened() {
        return this._onItemOpened;
    }
    /**
     * Create an iterator over the listing's selected items.
     *
     * @returns A new iterator over the listing's selected items.
     */
    selectedItems() {
        const items = this._sortedItems;
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.filter)(items, item => this.selection[item.path]);
    }
    /**
     * Create an iterator over the listing's sorted items.
     *
     * @returns A new iterator over the listing's sorted items.
     */
    sortedItems() {
        return new _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayIterator(this._sortedItems);
    }
    /**
     * Sort the items using a sort condition.
     */
    sort(state) {
        this._sortedItems = Private.sort(this.model.items(), state);
        this._sortState = state;
        this.update();
    }
    /**
     * Rename the first currently selected item.
     *
     * @returns A promise that resolves with the new name of the item.
     */
    rename() {
        return this._doRename();
    }
    /**
     * Cut the selected items.
     */
    cut() {
        this._isCut = true;
        this._copy();
        this.update();
    }
    /**
     * Copy the selected items.
     */
    copy() {
        this._copy();
    }
    /**
     * Paste the items from the clipboard.
     *
     * @returns A promise that resolves when the operation is complete.
     */
    paste() {
        if (!this._clipboard.length) {
            this._isCut = false;
            return Promise.resolve(undefined);
        }
        const basePath = this._model.path;
        const promises = [];
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.each)(this._clipboard, path => {
            if (this._isCut) {
                const parts = path.split('/');
                const name = parts[parts.length - 1];
                const newPath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.join(basePath, name);
                promises.push(this._model.manager.rename(path, newPath));
            }
            else {
                promises.push(this._model.manager.copy(path, basePath));
            }
        });
        // Remove any cut modifiers.
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.each)(this._items, item => {
            item.classList.remove(CUT_CLASS);
        });
        this._clipboard.length = 0;
        this._isCut = false;
        this.removeClass(CLIPBOARD_CLASS);
        return Promise.all(promises)
            .then(() => {
            return undefined;
        })
            .catch(error => {
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans._p('showErrorMessage', 'Paste Error'), error);
        });
    }
    /**
     * Delete the currently selected item(s).
     *
     * @returns A promise that resolves when the operation is complete.
     */
    async delete() {
        const items = this._sortedItems.filter(item => this.selection[item.path]);
        if (!items.length) {
            return;
        }
        const message = items.length === 1
            ? this._trans.__('Are you sure you want to permanently delete: %1?', items[0].name)
            : this._trans._n('Are you sure you want to permanently delete the %1 selected item?', 'Are you sure you want to permanently delete the %1 selected items?', items.length);
        const result = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: this._trans.__('Delete'),
            body: message,
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: this._trans.__('Cancel') }),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: this._trans.__('Delete') })
            ],
            // By default focus on "Cancel" to protect from accidental deletion
            // ("delete" and "Enter" are next to each other on many keyboards).
            defaultButton: 0
        });
        if (!this.isDisposed && result.button.accept) {
            await this._delete(items.map(item => item.path));
        }
    }
    /**
     * Duplicate the currently selected item(s).
     *
     * @returns A promise that resolves when the operation is complete.
     */
    duplicate() {
        const basePath = this._model.path;
        const promises = [];
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.each)(this.selectedItems(), item => {
            if (item.type !== 'directory') {
                promises.push(this._model.manager.copy(item.path, basePath));
            }
        });
        return Promise.all(promises)
            .then(() => {
            return undefined;
        })
            .catch(error => {
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans._p('showErrorMessage', 'Duplicate file'), error);
        });
    }
    /**
     * Download the currently selected item(s).
     */
    async download() {
        await Promise.all((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.toArray)(this.selectedItems())
            .filter(item => item.type !== 'directory')
            .map(item => this._model.download(item.path)));
    }
    /**
     * Shut down kernels on the applicable currently selected items.
     *
     * @returns A promise that resolves when the operation is complete.
     */
    shutdownKernels() {
        const model = this._model;
        const items = this._sortedItems;
        const paths = items.map(item => item.path);
        const promises = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.toArray)(this._model.sessions())
            .filter(session => {
            const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.firstIndexOf(paths, session.path);
            return this.selection[items[index].path];
        })
            .map(session => model.manager.services.sessions.shutdown(session.id));
        return Promise.all(promises)
            .then(() => {
            return undefined;
        })
            .catch(error => {
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans._p('showErrorMessage', 'Shut down kernel'), error);
        });
    }
    /**
     * Select next item.
     *
     * @param keepExisting - Whether to keep the current selection and add to it.
     */
    selectNext(keepExisting = false) {
        let index = -1;
        const selected = Object.keys(this.selection);
        const items = this._sortedItems;
        if (selected.length === 1 || keepExisting) {
            // Select the next item.
            const path = selected[selected.length - 1];
            index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.findFirstIndex(items, value => value.path === path);
            index += 1;
            if (index === this._items.length) {
                index = 0;
            }
        }
        else if (selected.length === 0) {
            // Select the first item.
            index = 0;
        }
        else {
            // Select the last selected item.
            const path = selected[selected.length - 1];
            index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.findFirstIndex(items, value => value.path === path);
        }
        if (index !== -1) {
            this._selectItem(index, keepExisting);
            _lumino_domutils__WEBPACK_IMPORTED_MODULE_8__.ElementExt.scrollIntoViewIfNeeded(this.contentNode, this._items[index]);
        }
    }
    /**
     * Select previous item.
     *
     * @param keepExisting - Whether to keep the current selection and add to it.
     */
    selectPrevious(keepExisting = false) {
        let index = -1;
        const selected = Object.keys(this.selection);
        const items = this._sortedItems;
        if (selected.length === 1 || keepExisting) {
            // Select the previous item.
            const path = selected[0];
            index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.findFirstIndex(items, value => value.path === path);
            index -= 1;
            if (index === -1) {
                index = this._items.length - 1;
            }
        }
        else if (selected.length === 0) {
            // Select the last item.
            index = this._items.length - 1;
        }
        else {
            // Select the first selected item.
            const path = selected[0];
            index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.findFirstIndex(items, value => value.path === path);
        }
        if (index !== -1) {
            this._selectItem(index, keepExisting);
            _lumino_domutils__WEBPACK_IMPORTED_MODULE_8__.ElementExt.scrollIntoViewIfNeeded(this.contentNode, this._items[index]);
        }
    }
    /**
     * Select the first item that starts with prefix being typed.
     */
    selectByPrefix() {
        const prefix = this._searchPrefix.toLowerCase();
        const items = this._sortedItems;
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.findFirstIndex(items, value => {
            return value.name.toLowerCase().substr(0, prefix.length) === prefix;
        });
        if (index !== -1) {
            this._selectItem(index, false);
            _lumino_domutils__WEBPACK_IMPORTED_MODULE_8__.ElementExt.scrollIntoViewIfNeeded(this.contentNode, this._items[index]);
        }
    }
    /**
     * Get whether an item is selected by name.
     *
     * @param name - The name of of the item.
     *
     * @returns Whether the item is selected.
     */
    isSelected(name) {
        const items = this._sortedItems;
        return ((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.toArray)((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.filter)(items, item => item.name === name && this.selection[item.path])).length !== 0);
    }
    /**
     * Find a model given a click.
     *
     * @param event - The mouse event.
     *
     * @returns The model for the selected file.
     */
    modelForClick(event) {
        const items = this._sortedItems;
        const index = Private.hitTestNodes(this._items, event);
        if (index !== -1) {
            return items[index];
        }
        return undefined;
    }
    /**
     * Clear the selected items.
     */
    clearSelectedItems() {
        this.selection = Object.create(null);
    }
    /**
     * Select an item by name.
     *
     * @param name - The name of the item to select.
     * @param focus - Whether to move focus the selected item.
     *
     * @returns A promise that resolves when the name is selected.
     */
    async selectItemByName(name, focus = false) {
        // Make sure the file is available.
        await this.model.refresh();
        if (this.isDisposed) {
            throw new Error('File browser is disposed.');
        }
        const items = this._sortedItems;
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.findFirstIndex(items, value => value.name === name);
        if (index === -1) {
            throw new Error('Item does not exist.');
        }
        this._selectItem(index, false, focus);
        _lumino_messaging__WEBPACK_IMPORTED_MODULE_10__.MessageLoop.sendMessage(this, _lumino_widgets__WEBPACK_IMPORTED_MODULE_13__.Widget.Msg.UpdateRequest);
        _lumino_domutils__WEBPACK_IMPORTED_MODULE_8__.ElementExt.scrollIntoViewIfNeeded(this.contentNode, this._items[index]);
    }
    /**
     * Handle the DOM events for the directory listing.
     *
     * @param event - The DOM event sent to the widget.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the panel's DOM node. It should
     * not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'mousedown':
                this._evtMousedown(event);
                break;
            case 'mouseup':
                this._evtMouseup(event);
                break;
            case 'mousemove':
                this._evtMousemove(event);
                break;
            case 'keydown':
                this.evtKeydown(event);
                break;
            case 'click':
                this._evtClick(event);
                break;
            case 'dblclick':
                this.evtDblClick(event);
                break;
            case 'dragenter':
            case 'dragover':
                this.addClass('jp-mod-native-drop');
                event.preventDefault();
                break;
            case 'dragleave':
            case 'dragend':
                this.removeClass('jp-mod-native-drop');
                break;
            case 'drop':
                this.removeClass('jp-mod-native-drop');
                this.evtNativeDrop(event);
                break;
            case 'scroll':
                this._evtScroll(event);
                break;
            case 'lm-dragenter':
                this.evtDragEnter(event);
                break;
            case 'lm-dragleave':
                this.evtDragLeave(event);
                break;
            case 'lm-dragover':
                this.evtDragOver(event);
                break;
            case 'lm-drop':
                this.evtDrop(event);
                break;
            default:
                break;
        }
    }
    /**
     * A message handler invoked on an `'after-attach'` message.
     */
    onAfterAttach(msg) {
        super.onAfterAttach(msg);
        const node = this.node;
        const content = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(node, CONTENT_CLASS);
        node.addEventListener('mousedown', this);
        node.addEventListener('keydown', this);
        node.addEventListener('click', this);
        node.addEventListener('dblclick', this);
        content.addEventListener('dragenter', this);
        content.addEventListener('dragover', this);
        content.addEventListener('dragleave', this);
        content.addEventListener('dragend', this);
        content.addEventListener('drop', this);
        content.addEventListener('scroll', this);
        content.addEventListener('lm-dragenter', this);
        content.addEventListener('lm-dragleave', this);
        content.addEventListener('lm-dragover', this);
        content.addEventListener('lm-drop', this);
    }
    /**
     * A message handler invoked on a `'before-detach'` message.
     */
    onBeforeDetach(msg) {
        super.onBeforeDetach(msg);
        const node = this.node;
        const content = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(node, CONTENT_CLASS);
        node.removeEventListener('mousedown', this);
        node.removeEventListener('keydown', this);
        node.removeEventListener('click', this);
        node.removeEventListener('dblclick', this);
        content.removeEventListener('scroll', this);
        content.removeEventListener('dragover', this);
        content.removeEventListener('dragover', this);
        content.removeEventListener('dragleave', this);
        content.removeEventListener('dragend', this);
        content.removeEventListener('drop', this);
        content.removeEventListener('lm-dragenter', this);
        content.removeEventListener('lm-dragleave', this);
        content.removeEventListener('lm-dragover', this);
        content.removeEventListener('lm-drop', this);
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('mouseup', this, true);
    }
    /**
     * A message handler invoked on an `'after-show'` message.
     */
    onAfterShow(msg) {
        if (this._isDirty) {
            // Update the sorted items.
            this.sort(this.sortState);
            this.update();
        }
    }
    /**
     * A handler invoked on an `'update-request'` message.
     */
    onUpdateRequest(msg) {
        this._isDirty = false;
        // Fetch common variables.
        const items = this._sortedItems;
        const nodes = this._items;
        const content = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(this.node, CONTENT_CLASS);
        const renderer = this._renderer;
        this.removeClass(MULTI_SELECTED_CLASS);
        this.removeClass(SELECTED_CLASS);
        // Remove any excess item nodes.
        while (nodes.length > items.length) {
            content.removeChild(nodes.pop());
        }
        // Add any missing item nodes.
        while (nodes.length < items.length) {
            const node = renderer.createItemNode(this._hiddenColumns);
            node.classList.add(ITEM_CLASS);
            nodes.push(node);
            content.appendChild(node);
        }
        // Remove extra classes from the nodes.
        nodes.forEach(item => {
            item.classList.remove(SELECTED_CLASS);
            item.classList.remove(RUNNING_CLASS);
            item.classList.remove(CUT_CLASS);
        });
        // Add extra classes to item nodes based on widget state.
        items.forEach((item, i) => {
            const node = nodes[i];
            const ft = this._manager.registry.getFileTypeForModel(item);
            renderer.updateItemNode(node, item, ft, this.translator, this._hiddenColumns);
            if (this.selection[item.path]) {
                node.classList.add(SELECTED_CLASS);
                if (this._isCut && this._model.path === this._prevPath) {
                    node.classList.add(CUT_CLASS);
                }
            }
            // add metadata to the node
            node.setAttribute('data-isdir', item.type === 'directory' ? 'true' : 'false');
        });
        // Handle the selectors on the widget node.
        const selected = Object.keys(this.selection).length;
        if (selected) {
            this.addClass(SELECTED_CLASS);
            if (selected > 1) {
                this.addClass(MULTI_SELECTED_CLASS);
            }
        }
        // Handle file session statuses.
        const paths = items.map(item => item.path);
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.each)(this._model.sessions(), session => {
            var _a;
            const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.firstIndexOf(paths, session.path);
            const node = nodes[index];
            // Node may have been filtered out.
            if (node) {
                let name = (_a = session.kernel) === null || _a === void 0 ? void 0 : _a.name;
                const specs = this._model.specs;
                node.classList.add(RUNNING_CLASS);
                if (specs && name) {
                    const spec = specs.kernelspecs[name];
                    name = spec ? spec.display_name : 'unknown'; // FIXME-TRANS: Is this localizable?
                }
                node.title = this._trans.__('%1\nKernel: %2', node.title, name);
            }
        });
        this._prevPath = this._model.path;
    }
    onResize(msg) {
        const { width } = msg.width === -1 ? this.node.getBoundingClientRect() : msg;
        this.toggleClass('jp-DirListing-narrow', width < 250);
    }
    setColumnVisibility(name, visible) {
        if (visible) {
            this._hiddenColumns.delete(name);
        }
        else {
            this._hiddenColumns.add(name);
        }
        this.headerNode.innerHTML = '';
        this._renderer.populateHeaderNode(this.headerNode, this.translator, this._hiddenColumns);
    }
    /**
     * Handle the `'click'` event for the widget.
     */
    _evtClick(event) {
        const target = event.target;
        const header = this.headerNode;
        if (header.contains(target)) {
            const state = this.renderer.handleHeaderClick(header, event);
            if (state) {
                this.sort(state);
            }
            return;
        }
    }
    /**
     * Handle the `'scroll'` event for the widget.
     */
    _evtScroll(event) {
        this.headerNode.scrollLeft = this.contentNode.scrollLeft;
    }
    /**
     * Handle the `'mousedown'` event for the widget.
     */
    _evtMousedown(event) {
        // Bail if clicking within the edit node
        if (event.target === this._editNode) {
            return;
        }
        // Blur the edit node if necessary.
        if (this._editNode.parentNode) {
            if (this._editNode !== event.target) {
                this._editNode.focus();
                this._editNode.blur();
                clearTimeout(this._selectTimer);
            }
            else {
                return;
            }
        }
        let index = Private.hitTestNodes(this._items, event);
        if (index === -1) {
            return;
        }
        this.handleFileSelect(event);
        if (event.button !== 0) {
            clearTimeout(this._selectTimer);
        }
        // Check for clearing a context menu.
        const newContext = (IS_MAC && event.ctrlKey) || event.button === 2;
        if (newContext) {
            return;
        }
        // Left mouse press for drag start.
        if (event.button === 0) {
            this._dragData = {
                pressX: event.clientX,
                pressY: event.clientY,
                index: index
            };
            document.addEventListener('mouseup', this, true);
            document.addEventListener('mousemove', this, true);
        }
    }
    /**
     * Handle the `'mouseup'` event for the widget.
     */
    _evtMouseup(event) {
        // Handle any soft selection from the previous mouse down.
        if (this._softSelection) {
            const altered = event.metaKey || event.shiftKey || event.ctrlKey;
            // See if we need to clear the other selection.
            if (!altered && event.button === 0) {
                this.clearSelectedItems();
                this.selection[this._softSelection] = true;
                this.update();
            }
            this._softSelection = '';
        }
        // Re-focus the selected file. This is needed because nodes corresponding
        // to files selected in mousedown handler will not retain the focus
        // as mousedown event is always followed by a blur/focus event.
        if (event.button === 0) {
            this._focusSelectedFile();
        }
        // Remove the drag listeners if necessary.
        if (event.button !== 0 || !this._drag) {
            document.removeEventListener('mousemove', this, true);
            document.removeEventListener('mouseup', this, true);
            return;
        }
        event.preventDefault();
        event.stopPropagation();
    }
    /**
     * Handle the `'mousemove'` event for the widget.
     */
    _evtMousemove(event) {
        event.preventDefault();
        event.stopPropagation();
        // Bail if we are the one dragging.
        if (this._drag || !this._dragData) {
            return;
        }
        // Check for a drag initialization.
        const data = this._dragData;
        const dx = Math.abs(event.clientX - data.pressX);
        const dy = Math.abs(event.clientY - data.pressY);
        if (dx < DRAG_THRESHOLD && dy < DRAG_THRESHOLD) {
            return;
        }
        this._startDrag(data.index, event.clientX, event.clientY);
    }
    /**
     * Handle the opening of an item.
     */
    handleOpen(item) {
        this._onItemOpened.emit(item);
        if (item.type === 'directory') {
            const localPath = this._manager.services.contents.localPath(item.path);
            this._model
                .cd(`/${localPath}`)
                .catch(error => (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans._p('showErrorMessage', 'Open directory'), error));
        }
        else {
            const path = item.path;
            this._manager.openOrReveal(path);
        }
    }
    /**
     * Handle the `'keydown'` event for the widget.
     */
    evtKeydown(event) {
        switch (event.keyCode) {
            case 13: {
                // Enter
                // Do nothing if any modifier keys are pressed.
                if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
                    return;
                }
                event.preventDefault();
                event.stopPropagation();
                const selected = Object.keys(this.selection);
                const path = selected[0];
                const items = this._sortedItems;
                const i = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.findFirstIndex(items, value => value.path === path);
                if (i === -1) {
                    return;
                }
                const item = this._sortedItems[i];
                this.handleOpen(item);
                break;
            }
            case 38: // Up arrow
                this.selectPrevious(event.shiftKey);
                event.stopPropagation();
                event.preventDefault();
                break;
            case 40: // Down arrow
                this.selectNext(event.shiftKey);
                event.stopPropagation();
                event.preventDefault();
                break;
            default:
                break;
        }
        // Detects printable characters typed by the user.
        // Not all browsers support .key, but it discharges us from reconstructing
        // characters from key codes.
        if (!this._inRename && event.key !== undefined && event.key.length === 1) {
            if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
                return;
            }
            this._searchPrefix += event.key;
            clearTimeout(this._searchPrefixTimer);
            this._searchPrefixTimer = window.setTimeout(() => {
                this._searchPrefix = '';
            }, PREFIX_APPEND_DURATION);
            this.selectByPrefix();
            event.stopPropagation();
            event.preventDefault();
        }
    }
    /**
     * Handle the `'dblclick'` event for the widget.
     */
    evtDblClick(event) {
        // Do nothing if it's not a left mouse press.
        if (event.button !== 0) {
            return;
        }
        // Do nothing if any modifier keys are pressed.
        if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
            return;
        }
        // Stop the event propagation.
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this._selectTimer);
        this._editNode.blur();
        // Find a valid double click target.
        const target = event.target;
        const i = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.findFirstIndex(this._items, node => node.contains(target));
        if (i === -1) {
            return;
        }
        const item = this._sortedItems[i];
        this.handleOpen(item);
    }
    /**
     * Handle the `drop` event for the widget.
     */
    evtNativeDrop(event) {
        var _a, _b, _c;
        const files = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.files;
        if (!files || files.length === 0) {
            return;
        }
        const length = (_b = event.dataTransfer) === null || _b === void 0 ? void 0 : _b.items.length;
        if (!length) {
            return;
        }
        for (let i = 0; i < length; i++) {
            let entry = (_c = event.dataTransfer) === null || _c === void 0 ? void 0 : _c.items[i].webkitGetAsEntry();
            if (entry.isDirectory) {
                console.log('currently not supporting drag + drop for folders');
                void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                    title: this._trans.__('Error Uploading Folder'),
                    body: this._trans.__('Drag and Drop is currently not supported for folders'),
                    buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: this._trans.__('Close') })]
                });
            }
        }
        event.preventDefault();
        for (let i = 0; i < files.length; i++) {
            void this._model.upload(files[i]);
        }
    }
    /**
     * Handle the `'lm-dragenter'` event for the widget.
     */
    evtDragEnter(event) {
        if (event.mimeData.hasData(CONTENTS_MIME)) {
            const index = Private.hitTestNodes(this._items, event);
            if (index === -1) {
                return;
            }
            const item = this._sortedItems[index];
            if (item.type !== 'directory' || this.selection[item.path]) {
                return;
            }
            const target = event.target;
            target.classList.add(DROP_TARGET_CLASS);
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * Handle the `'lm-dragleave'` event for the widget.
     */
    evtDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        const dropTarget = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(this.node, DROP_TARGET_CLASS);
        if (dropTarget) {
            dropTarget.classList.remove(DROP_TARGET_CLASS);
        }
    }
    /**
     * Handle the `'lm-dragover'` event for the widget.
     */
    evtDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        event.dropAction = event.proposedAction;
        const dropTarget = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(this.node, DROP_TARGET_CLASS);
        if (dropTarget) {
            dropTarget.classList.remove(DROP_TARGET_CLASS);
        }
        const index = Private.hitTestNodes(this._items, event);
        this._items[index].classList.add(DROP_TARGET_CLASS);
    }
    /**
     * Handle the `'lm-drop'` event for the widget.
     */
    evtDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(this._selectTimer);
        if (event.proposedAction === 'none') {
            event.dropAction = 'none';
            return;
        }
        if (!event.mimeData.hasData(CONTENTS_MIME)) {
            return;
        }
        let target = event.target;
        while (target && target.parentElement) {
            if (target.classList.contains(DROP_TARGET_CLASS)) {
                target.classList.remove(DROP_TARGET_CLASS);
                break;
            }
            target = target.parentElement;
        }
        // Get the path based on the target node.
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.firstIndexOf(this._items, target);
        const items = this._sortedItems;
        let basePath = this._model.path;
        if (items[index].type === 'directory') {
            basePath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.join(basePath, items[index].name);
        }
        const manager = this._manager;
        // Handle the items.
        const promises = [];
        const paths = event.mimeData.getData(CONTENTS_MIME);
        if (event.ctrlKey && event.proposedAction === 'move') {
            event.dropAction = 'copy';
        }
        else {
            event.dropAction = event.proposedAction;
        }
        for (const path of paths) {
            const localPath = manager.services.contents.localPath(path);
            const name = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(localPath);
            const newPath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.join(basePath, name);
            // Skip files that are not moving.
            if (newPath === path) {
                continue;
            }
            if (event.dropAction === 'copy') {
                promises.push(manager.copy(path, basePath));
            }
            else {
                promises.push((0,_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__.renameFile)(manager, path, newPath));
            }
        }
        Promise.all(promises).catch(error => {
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans._p('showErrorMessage', 'Error while copying/moving files'), error);
        });
    }
    /**
     * Start a drag event.
     */
    _startDrag(index, clientX, clientY) {
        let selectedPaths = Object.keys(this.selection);
        const source = this._items[index];
        const items = this._sortedItems;
        let selectedItems;
        let item;
        // If the source node is not selected, use just that node.
        if (!source.classList.contains(SELECTED_CLASS)) {
            item = items[index];
            selectedPaths = [item.path];
            selectedItems = [item];
        }
        else {
            const path = selectedPaths[0];
            item = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.find)(items, value => value.path === path);
            selectedItems = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.toArray)(this.selectedItems());
        }
        if (!item) {
            return;
        }
        // Create the drag image.
        const ft = this._manager.registry.getFileTypeForModel(item);
        const dragImage = this.renderer.createDragImage(source, selectedPaths.length, this._trans, ft);
        // Set up the drag event.
        this._drag = new _lumino_dragdrop__WEBPACK_IMPORTED_MODULE_9__.Drag({
            dragImage,
            mimeData: new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_7__.MimeData(),
            supportedActions: 'move',
            proposedAction: 'move'
        });
        this._drag.mimeData.setData(CONTENTS_MIME, selectedPaths);
        // Add thunks for getting mime data content.
        // We thunk the content so we don't try to make a network call
        // when it's not needed. E.g. just moving files around
        // in a filebrowser
        const services = this.model.manager.services;
        for (const item of selectedItems) {
            this._drag.mimeData.setData(CONTENTS_MIME_RICH, {
                model: item,
                withContent: async () => {
                    return await services.contents.get(item.path);
                }
            });
        }
        if (item && item.type !== 'directory') {
            const otherPaths = selectedPaths.slice(1).reverse();
            this._drag.mimeData.setData(FACTORY_MIME, () => {
                if (!item) {
                    return;
                }
                const path = item.path;
                let widget = this._manager.findWidget(path);
                if (!widget) {
                    widget = this._manager.open(item.path);
                }
                if (otherPaths.length) {
                    const firstWidgetPlaced = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_7__.PromiseDelegate();
                    void firstWidgetPlaced.promise.then(() => {
                        let prevWidget = widget;
                        otherPaths.forEach(path => {
                            const options = {
                                ref: prevWidget === null || prevWidget === void 0 ? void 0 : prevWidget.id,
                                mode: 'tab-after'
                            };
                            prevWidget = this._manager.openOrReveal(path, void 0, void 0, options);
                            this._manager.openOrReveal(item.path);
                        });
                    });
                    firstWidgetPlaced.resolve(void 0);
                }
                return widget;
            });
        }
        // Start the drag and remove the mousemove and mouseup listeners.
        document.removeEventListener('mousemove', this, true);
        document.removeEventListener('mouseup', this, true);
        clearTimeout(this._selectTimer);
        void this._drag.start(clientX, clientY).then(action => {
            this._drag = null;
            clearTimeout(this._selectTimer);
        });
    }
    /**
     * Handle selection on a file node.
     */
    handleFileSelect(event) {
        // Fetch common variables.
        const items = this._sortedItems;
        const index = Private.hitTestNodes(this._items, event);
        clearTimeout(this._selectTimer);
        if (index === -1) {
            return;
        }
        // Clear any existing soft selection.
        this._softSelection = '';
        const path = items[index].path;
        const selected = Object.keys(this.selection);
        // Handle toggling.
        if ((IS_MAC && event.metaKey) || (!IS_MAC && event.ctrlKey)) {
            if (this.selection[path]) {
                delete this.selection[path];
            }
            else {
                this.selection[path] = true;
            }
            // Handle multiple select.
        }
        else if (event.shiftKey) {
            this._handleMultiSelect(selected, index);
            // Handle a 'soft' selection
        }
        else if (path in this.selection && selected.length > 1) {
            this._softSelection = path;
            // Default to selecting the only the item.
        }
        else {
            // Select only the given item.
            return this._selectItem(index, false);
        }
        this.update();
    }
    /**
     * (Re-)focus on the selected file.
     *
     * If index is not given, it will be inferred from the current selection;
     * providing index saves on the iteration time.
     */
    _focusSelectedFile(index) {
        if (typeof index === 'undefined') {
            const selected = Object.keys(this.selection);
            if (selected.length > 1) {
                // Multiselect - do not focus on any single file
                return;
            }
            index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.findFirstIndex(this._sortedItems, value => value.path === selected[0]);
        }
        if (index === -1) {
            return;
        }
        // Focus on text to make shortcuts works
        const node = this._items[index];
        const text = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(node, ITEM_TEXT_CLASS);
        if (text) {
            text.focus();
        }
    }
    /**
     * Handle a multiple select on a file item node.
     */
    _handleMultiSelect(selected, index) {
        // Find the "nearest selected".
        const items = this._sortedItems;
        let nearestIndex = -1;
        for (let i = 0; i < this._items.length; i++) {
            if (i === index) {
                continue;
            }
            const path = items[i].path;
            if (selected.indexOf(path) !== -1) {
                if (nearestIndex === -1) {
                    nearestIndex = i;
                }
                else {
                    if (Math.abs(index - i) < Math.abs(nearestIndex - i)) {
                        nearestIndex = i;
                    }
                }
            }
        }
        // Default to the first element (and fill down).
        if (nearestIndex === -1) {
            nearestIndex = 0;
        }
        // Select the rows between the current and the nearest selected.
        for (let i = 0; i < this._items.length; i++) {
            if ((nearestIndex >= i && index <= i) ||
                (nearestIndex <= i && index >= i)) {
                this.selection[items[i].path] = true;
            }
        }
    }
    /**
     * Copy the selected items, and optionally cut as well.
     */
    _copy() {
        this._clipboard.length = 0;
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.each)(this.selectedItems(), item => {
            this._clipboard.push(item.path);
        });
    }
    /**
     * Delete the files with the given paths.
     */
    async _delete(paths) {
        await Promise.all(paths.map(path => this._model.manager.deleteFile(path).catch(err => {
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans._p('showErrorMessage', 'Delete Failed'), err);
        })));
    }
    /**
     * Allow the user to rename item on a given row.
     */
    _doRename() {
        this._inRename = true;
        const items = this._sortedItems;
        const path = Object.keys(this.selection)[0];
        const index = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.findFirstIndex(items, value => value.path === path);
        const row = this._items[index];
        const item = items[index];
        const nameNode = this.renderer.getNameNode(row);
        const original = item.name;
        this._editNode.value = original;
        this._selectItem(index, false);
        return Private.doRename(nameNode, this._editNode, original).then(newName => {
            this.node.focus();
            if (!newName || newName === original) {
                this._inRename = false;
                return original;
            }
            if (!(0,_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__.isValidFileName)(newName)) {
                void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans.__('Rename Error'), Error(this._trans._p('showErrorMessage', '"%1" is not a valid name for a file. Names must have nonzero length, and cannot include "/", "\\", or ":"', newName)));
                this._inRename = false;
                return original;
            }
            if (this.isDisposed) {
                this._inRename = false;
                throw new Error('File browser is disposed.');
            }
            const manager = this._manager;
            const oldPath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.join(this._model.path, original);
            const newPath = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.join(this._model.path, newName);
            const promise = (0,_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__.renameFile)(manager, oldPath, newPath);
            return promise
                .catch(error => {
                if (error !== 'File not renamed') {
                    void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans._p('showErrorMessage', 'Rename Error'), error);
                }
                this._inRename = false;
                return original;
            })
                .then(() => {
                if (this.isDisposed) {
                    this._inRename = false;
                    throw new Error('File browser is disposed.');
                }
                if (this._inRename) {
                    // No need to catch because `newName` will always exit.
                    void this.selectItemByName(newName);
                }
                this._inRename = false;
                return newName;
            });
        });
    }
    /**
     * Select a given item.
     */
    _selectItem(index, keepExisting, focus = true) {
        // Selected the given row(s)
        const items = this._sortedItems;
        if (!keepExisting) {
            this.clearSelectedItems();
        }
        const path = items[index].path;
        this.selection[path] = true;
        if (!keepExisting && focus) {
            this._focusSelectedFile(index);
        }
        this.update();
    }
    /**
     * Handle the `refreshed` signal from the model.
     */
    _onModelRefreshed() {
        // Update the selection.
        const existing = Object.keys(this.selection);
        this.clearSelectedItems();
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.each)(this._model.items(), item => {
            const path = item.path;
            if (existing.indexOf(path) !== -1) {
                this.selection[path] = true;
            }
        });
        if (this.isVisible) {
            // Update the sorted items.
            this.sort(this.sortState);
        }
        else {
            this._isDirty = true;
        }
    }
    /**
     * Handle a `pathChanged` signal from the model.
     */
    _onPathChanged() {
        // Reset the selection.
        this.clearSelectedItems();
        // Update the sorted items.
        this.sort(this.sortState);
    }
    /**
     * Handle a `fileChanged` signal from the model.
     */
    _onFileChanged(sender, args) {
        const newValue = args.newValue;
        if (!newValue) {
            return;
        }
        const name = newValue.name;
        if (args.type !== 'new' || !name) {
            return;
        }
        void this.selectItemByName(name).catch(() => {
            /* Ignore if file does not exist. */
        });
    }
    /**
     * Handle an `activateRequested` signal from the manager.
     */
    _onActivateRequested(sender, args) {
        const dirname = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.dirname(args);
        if (dirname !== this._model.path) {
            return;
        }
        const basename = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(args);
        this.selectItemByName(basename).catch(() => {
            /* Ignore if file does not exist. */
        });
    }
}
/**
 * The namespace for the `DirListing` class statics.
 */
(function (DirListing) {
    /**
     * The default implementation of an `IRenderer`.
     */
    class Renderer {
        /**
         * Create the DOM node for a dir listing.
         */
        createNode() {
            const node = document.createElement('div');
            const header = document.createElement('div');
            const content = document.createElement('ul');
            content.className = CONTENT_CLASS;
            header.className = HEADER_CLASS;
            node.appendChild(header);
            node.appendChild(content);
            node.tabIndex = 0;
            return node;
        }
        /**
         * Populate and empty header node for a dir listing.
         *
         * @param node - The header node to populate.
         */
        populateHeaderNode(node, translator, hiddenColumns) {
            var _a;
            translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.nullTranslator;
            const trans = translator.load('jupyterlab');
            const name = this.createHeaderItemNode(trans.__('Name'));
            const narrow = document.createElement('div');
            const modified = this.createHeaderItemNode(trans.__('Last Modified'));
            name.classList.add(NAME_ID_CLASS);
            name.classList.add(SELECTED_CLASS);
            modified.classList.add(MODIFIED_ID_CLASS);
            narrow.classList.add(NARROW_ID_CLASS);
            narrow.textContent = '...';
            node.appendChild(name);
            node.appendChild(narrow);
            node.appendChild(modified);
            if ((_a = hiddenColumns === null || hiddenColumns === void 0 ? void 0 : hiddenColumns.has) === null || _a === void 0 ? void 0 : _a.call(hiddenColumns, 'last_modified')) {
                modified.classList.add(MODIFIED_COLUMN_HIDDEN);
            }
            else {
                modified.classList.remove(MODIFIED_COLUMN_HIDDEN);
            }
            // set the initial caret icon
            Private.updateCaret(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(name, HEADER_ITEM_ICON_CLASS), 'right', 'up');
        }
        /**
         * Handle a header click.
         *
         * @param node - A node populated by [[populateHeaderNode]].
         *
         * @param event - A click event on the node.
         *
         * @returns The sort state of the header after the click event.
         */
        handleHeaderClick(node, event) {
            const name = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(node, NAME_ID_CLASS);
            const modified = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(node, MODIFIED_ID_CLASS);
            const state = { direction: 'ascending', key: 'name' };
            const target = event.target;
            if (name.contains(target)) {
                const modifiedIcon = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(modified, HEADER_ITEM_ICON_CLASS);
                const nameIcon = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(name, HEADER_ITEM_ICON_CLASS);
                if (name.classList.contains(SELECTED_CLASS)) {
                    if (!name.classList.contains(DESCENDING_CLASS)) {
                        state.direction = 'descending';
                        name.classList.add(DESCENDING_CLASS);
                        Private.updateCaret(nameIcon, 'right', 'down');
                    }
                    else {
                        name.classList.remove(DESCENDING_CLASS);
                        Private.updateCaret(nameIcon, 'right', 'up');
                    }
                }
                else {
                    name.classList.remove(DESCENDING_CLASS);
                    Private.updateCaret(nameIcon, 'right', 'up');
                }
                name.classList.add(SELECTED_CLASS);
                modified.classList.remove(SELECTED_CLASS);
                modified.classList.remove(DESCENDING_CLASS);
                Private.updateCaret(modifiedIcon, 'left');
                return state;
            }
            if (modified.contains(target)) {
                const modifiedIcon = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(modified, HEADER_ITEM_ICON_CLASS);
                const nameIcon = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(name, HEADER_ITEM_ICON_CLASS);
                state.key = 'last_modified';
                if (modified.classList.contains(SELECTED_CLASS)) {
                    if (!modified.classList.contains(DESCENDING_CLASS)) {
                        state.direction = 'descending';
                        modified.classList.add(DESCENDING_CLASS);
                        Private.updateCaret(modifiedIcon, 'left', 'down');
                    }
                    else {
                        modified.classList.remove(DESCENDING_CLASS);
                        Private.updateCaret(modifiedIcon, 'left', 'up');
                    }
                }
                else {
                    modified.classList.remove(DESCENDING_CLASS);
                    Private.updateCaret(modifiedIcon, 'left', 'up');
                }
                modified.classList.add(SELECTED_CLASS);
                name.classList.remove(SELECTED_CLASS);
                name.classList.remove(DESCENDING_CLASS);
                Private.updateCaret(nameIcon, 'right');
                return state;
            }
            return state;
        }
        /**
         * Create a new item node for a dir listing.
         *
         * @returns A new DOM node to use as a content item.
         */
        createItemNode(hiddenColumns) {
            var _a;
            const node = document.createElement('li');
            const icon = document.createElement('span');
            const text = document.createElement('span');
            const modified = document.createElement('span');
            icon.className = ITEM_ICON_CLASS;
            text.className = ITEM_TEXT_CLASS;
            modified.className = ITEM_MODIFIED_CLASS;
            node.appendChild(icon);
            node.appendChild(text);
            node.appendChild(modified);
            // Make the text note focusable so that it receives keyboard events;
            // text node was specifically chosen to receive shortcuts because
            // text element gets substituted with input area during file name edits
            // which conveniently deactivate irrelevant shortcuts.
            text.tabIndex = 0;
            if ((_a = hiddenColumns === null || hiddenColumns === void 0 ? void 0 : hiddenColumns.has) === null || _a === void 0 ? void 0 : _a.call(hiddenColumns, 'last_modified')) {
                modified.classList.add(MODIFIED_COLUMN_HIDDEN);
            }
            else {
                modified.classList.remove(MODIFIED_COLUMN_HIDDEN);
            }
            return node;
        }
        /**
         * Update an item node to reflect the current state of a model.
         *
         * @param node - A node created by [[createItemNode]].
         *
         * @param model - The model object to use for the item state.
         *
         * @param fileType - The file type of the item, if applicable.
         *
         */
        updateItemNode(node, model, fileType, translator, hiddenColumns) {
            var _a;
            translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.nullTranslator;
            fileType =
                fileType || _jupyterlab_docregistry__WEBPACK_IMPORTED_MODULE_3__.DocumentRegistry.getDefaultTextFileType(translator);
            const { icon, iconClass, name } = fileType;
            translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_4__.nullTranslator;
            const trans = translator.load('jupyterlab');
            const iconContainer = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(node, ITEM_ICON_CLASS);
            const text = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(node, ITEM_TEXT_CLASS);
            const modified = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(node, ITEM_MODIFIED_CLASS);
            if ((_a = hiddenColumns === null || hiddenColumns === void 0 ? void 0 : hiddenColumns.has) === null || _a === void 0 ? void 0 : _a.call(hiddenColumns, 'last_modified')) {
                modified.classList.add(MODIFIED_COLUMN_HIDDEN);
            }
            else {
                modified.classList.remove(MODIFIED_COLUMN_HIDDEN);
            }
            // render the file item's icon
            _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.LabIcon.resolveElement({
                icon,
                iconClass: (0,_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.classes)(iconClass, 'jp-Icon'),
                container: iconContainer,
                className: ITEM_ICON_CLASS,
                stylesheet: 'listing'
            });
            let hoverText = trans.__('Name: %1', model.name);
            // add file size to pop up if its available
            if (model.size !== null && model.size !== undefined) {
                hoverText += trans.__('\nSize: %1', Private.formatFileSize(model.size, 1, 1024));
            }
            if (model.path) {
                const dirname = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.dirname(model.path);
                if (dirname) {
                    hoverText += trans.__('\nPath: %1', dirname.substr(0, 50));
                    if (dirname.length > 50) {
                        hoverText += '...';
                    }
                }
            }
            if (model.created) {
                hoverText += trans.__('\nCreated: %1', _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.Time.format(new Date(model.created), 'YYYY-MM-DD HH:mm:ss'));
            }
            if (model.last_modified) {
                hoverText += trans.__('\nModified: %1', _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.Time.format(new Date(model.last_modified), 'YYYY-MM-DD HH:mm:ss'));
            }
            hoverText += trans.__('\nWritable: %1', model.writable);
            node.title = hoverText;
            node.setAttribute('data-file-type', name);
            if (model.name.startsWith('.')) {
                node.setAttribute('data-is-dot', 'true');
            }
            else {
                node.removeAttribute('data-is-dot');
            }
            // If an item is being edited currently, its text node is unavailable.
            if (text) {
                const indices = !model.indices ? [] : model.indices;
                let highlightedName = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.StringExt.highlight(model.name, indices, _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_12__.h.mark);
                _lumino_virtualdom__WEBPACK_IMPORTED_MODULE_12__.VirtualDOM.render(_lumino_virtualdom__WEBPACK_IMPORTED_MODULE_12__.h.span(highlightedName), text);
            }
            let modText = '';
            let modTitle = '';
            if (model.last_modified) {
                modText = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.Time.formatHuman(new Date(model.last_modified));
                modTitle = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.Time.format(new Date(model.last_modified), 'lll');
            }
            modified.textContent = modText;
            modified.title = modTitle;
        }
        /**
         * Get the node containing the file name.
         *
         * @param node - A node created by [[createItemNode]].
         *
         * @returns The node containing the file name.
         */
        getNameNode(node) {
            return _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(node, ITEM_TEXT_CLASS);
        }
        /**
         * Create a drag image for an item.
         *
         * @param node - A node created by [[createItemNode]].
         *
         * @param count - The number of items being dragged.
         *
         * @param fileType - The file type of the item, if applicable.
         *
         * @returns An element to use as the drag image.
         */
        createDragImage(node, count, trans, fileType) {
            const dragImage = node.cloneNode(true);
            const modified = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(dragImage, ITEM_MODIFIED_CLASS);
            const icon = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(dragImage, ITEM_ICON_CLASS);
            dragImage.removeChild(modified);
            if (!fileType) {
                icon.textContent = '';
                icon.className = '';
            }
            else {
                icon.textContent = fileType.iconLabel || '';
                icon.className = fileType.iconClass || '';
            }
            icon.classList.add(DRAG_ICON_CLASS);
            if (count > 1) {
                const nameNode = _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.DOMUtils.findElement(dragImage, ITEM_TEXT_CLASS);
                nameNode.textContent = trans._n('%1 Item', '%1 Items', count);
            }
            return dragImage;
        }
        /**
         * Create a node for a header item.
         */
        createHeaderItemNode(label) {
            const node = document.createElement('div');
            const text = document.createElement('span');
            const icon = document.createElement('span');
            node.className = HEADER_ITEM_CLASS;
            text.className = HEADER_ITEM_TEXT_CLASS;
            icon.className = HEADER_ITEM_ICON_CLASS;
            text.textContent = label;
            node.appendChild(text);
            node.appendChild(icon);
            return node;
        }
    }
    DirListing.Renderer = Renderer;
    /**
     * The default `IRenderer` instance.
     */
    DirListing.defaultRenderer = new Renderer();
})(DirListing || (DirListing = {}));
/**
 * The namespace for the listing private data.
 */
var Private;
(function (Private) {
    /**
     * Handle editing text on a node.
     *
     * @returns Boolean indicating whether the name changed.
     */
    function doRename(text, edit, original) {
        const parent = text.parentElement;
        parent.replaceChild(edit, text);
        edit.focus();
        const index = edit.value.lastIndexOf('.');
        if (index === -1) {
            edit.setSelectionRange(0, edit.value.length);
        }
        else {
            edit.setSelectionRange(0, index);
        }
        return new Promise((resolve, reject) => {
            edit.onblur = () => {
                parent.replaceChild(text, edit);
                resolve(edit.value);
            };
            edit.onkeydown = (event) => {
                switch (event.keyCode) {
                    case 13: // Enter
                        event.stopPropagation();
                        event.preventDefault();
                        edit.blur();
                        break;
                    case 27: // Escape
                        event.stopPropagation();
                        event.preventDefault();
                        edit.value = original;
                        edit.blur();
                        break;
                    case 38: // Up arrow
                        event.stopPropagation();
                        event.preventDefault();
                        if (edit.selectionStart !== edit.selectionEnd) {
                            edit.selectionStart = edit.selectionEnd = 0;
                        }
                        break;
                    case 40: // Down arrow
                        event.stopPropagation();
                        event.preventDefault();
                        if (edit.selectionStart !== edit.selectionEnd) {
                            edit.selectionStart = edit.selectionEnd = edit.value.length;
                        }
                        break;
                    default:
                        break;
                }
            };
        });
    }
    Private.doRename = doRename;
    /**
     * Sort a list of items by sort state as a new array.
     */
    function sort(items, state) {
        const copy = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.toArray)(items);
        const reverse = state.direction === 'descending' ? 1 : -1;
        if (state.key === 'last_modified') {
            // Sort by last modified (grouping directories first)
            copy.sort((a, b) => {
                const t1 = a.type === 'directory' ? 0 : 1;
                const t2 = b.type === 'directory' ? 0 : 1;
                const valA = new Date(a.last_modified).getTime();
                const valB = new Date(b.last_modified).getTime();
                return t1 - t2 || (valA - valB) * reverse;
            });
        }
        else {
            // Sort by name (grouping directories first)
            copy.sort((a, b) => {
                const t1 = a.type === 'directory' ? 0 : 1;
                const t2 = b.type === 'directory' ? 0 : 1;
                return t1 - t2 || b.name.localeCompare(a.name) * reverse;
            });
        }
        return copy;
    }
    Private.sort = sort;
    /**
     * Get the index of the node at a client position, or `-1`.
     */
    function hitTestNodes(nodes, event) {
        return _lumino_algorithm__WEBPACK_IMPORTED_MODULE_6__.ArrayExt.findFirstIndex(nodes, node => _lumino_domutils__WEBPACK_IMPORTED_MODULE_8__.ElementExt.hitTest(node, event.clientX, event.clientY) ||
            event.target === node);
    }
    Private.hitTestNodes = hitTestNodes;
    /**
     * Format bytes to human readable string.
     */
    function formatFileSize(bytes, decimalPoint, k) {
        // https://www.codexworld.com/how-to/convert-file-size-bytes-kb-mb-gb-javascript/
        if (bytes === 0) {
            return '0 Bytes';
        }
        const dm = decimalPoint || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        if (i >= 0 && i < sizes.length) {
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }
        else {
            return String(bytes);
        }
    }
    Private.formatFileSize = formatFileSize;
    /**
     * Update an inline svg caret icon in a node.
     */
    function updateCaret(container, float, state) {
        if (state) {
            (state === 'down' ? _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.caretDownIcon : _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.caretUpIcon).element({
                container,
                tag: 'span',
                stylesheet: 'listingHeaderItem',
                float
            });
        }
        else {
            _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_5__.LabIcon.remove(container);
            container.className = HEADER_ITEM_ICON_CLASS;
        }
    }
    Private.updateCaret = updateCaret;
})(Private || (Private = {}));
//# sourceMappingURL=listing.js.map

/***/ }),

/***/ "../../packages/filebrowser/lib/model.js":
/*!***********************************************!*\
  !*** ../../packages/filebrowser/lib/model.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LARGE_FILE_SIZE": () => (/* binding */ LARGE_FILE_SIZE),
/* harmony export */   "CHUNK_SIZE": () => (/* binding */ CHUNK_SIZE),
/* harmony export */   "FileBrowserModel": () => (/* binding */ FileBrowserModel),
/* harmony export */   "TogglableHiddenFileBrowserModel": () => (/* binding */ TogglableHiddenFileBrowserModel),
/* harmony export */   "FilterFileBrowserModel": () => (/* binding */ FilterFileBrowserModel)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/docmanager */ "webpack/sharing/consume/default/@jupyterlab/docmanager/@jupyterlab/docmanager");
/* harmony import */ var _jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_7__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * The default duration of the auto-refresh in ms
 */
const DEFAULT_REFRESH_INTERVAL = 10000;
/**
 * The maximum upload size (in bytes) for notebook version < 5.1.0
 */
const LARGE_FILE_SIZE = 15 * 1024 * 1024;
/**
 * The size (in bytes) of the biggest chunk we should upload at once.
 */
const CHUNK_SIZE = 1024 * 1024;
/**
 * An implementation of a file browser model.
 *
 * #### Notes
 * All paths parameters without a leading `'/'` are interpreted as relative to
 * the current directory.  Supports `'../'` syntax.
 */
class FileBrowserModel {
    /**
     * Construct a new file browser model.
     */
    constructor(options) {
        var _a;
        this._connectionFailure = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this._fileChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this._items = [];
        this._key = '';
        this._pathChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this._paths = new Set();
        this._pending = null;
        this._pendingPath = null;
        this._refreshed = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this._sessions = [];
        this._state = null;
        this._isDisposed = false;
        this._restored = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_5__.PromiseDelegate();
        this._uploads = [];
        this._uploadChanged = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal(this);
        this.manager = options.manager;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_3__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this._driveName = options.driveName || '';
        this._model = {
            path: this.rootPath,
            name: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(this.rootPath),
            type: 'directory',
            content: undefined,
            writable: false,
            created: 'unknown',
            last_modified: 'unknown',
            mimetype: 'text/plain',
            format: 'text'
        };
        this._state = options.state || null;
        const refreshInterval = options.refreshInterval || DEFAULT_REFRESH_INTERVAL;
        const { services } = options.manager;
        services.contents.fileChanged.connect(this.onFileChanged, this);
        services.sessions.runningChanged.connect(this.onRunningChanged, this);
        this._unloadEventListener = (e) => {
            if (this._uploads.length > 0) {
                const confirmationMessage = this._trans.__('Files still uploading');
                e.returnValue = confirmationMessage;
                return confirmationMessage;
            }
        };
        window.addEventListener('beforeunload', this._unloadEventListener);
        this._poll = new _lumino_polling__WEBPACK_IMPORTED_MODULE_6__.Poll({
            auto: (_a = options.auto) !== null && _a !== void 0 ? _a : true,
            name: '@jupyterlab/filebrowser:Model',
            factory: () => this.cd('.'),
            frequency: {
                interval: refreshInterval,
                backoff: true,
                max: 300 * 1000
            },
            standby: 'when-hidden'
        });
    }
    /**
     * A signal emitted when the file browser model loses connection.
     */
    get connectionFailure() {
        return this._connectionFailure;
    }
    /**
     * The drive name that gets prepended to the path.
     */
    get driveName() {
        return this._driveName;
    }
    /**
     * A promise that resolves when the model is first restored.
     */
    get restored() {
        return this._restored.promise;
    }
    /**
     * Get the file path changed signal.
     */
    get fileChanged() {
        return this._fileChanged;
    }
    /**
     * Get the current path.
     */
    get path() {
        return this._model ? this._model.path : '';
    }
    /**
     * Get the root path
     */
    get rootPath() {
        return this._driveName ? this._driveName + ':' : '';
    }
    /**
     * A signal emitted when the path changes.
     */
    get pathChanged() {
        return this._pathChanged;
    }
    /**
     * A signal emitted when the directory listing is refreshed.
     */
    get refreshed() {
        return this._refreshed;
    }
    /**
     * Get the kernel spec models.
     */
    get specs() {
        return this.manager.services.kernelspecs.specs;
    }
    /**
     * Get whether the model is disposed.
     */
    get isDisposed() {
        return this._isDisposed;
    }
    /**
     * A signal emitted when an upload progresses.
     */
    get uploadChanged() {
        return this._uploadChanged;
    }
    /**
     * Create an iterator over the status of all in progress uploads.
     */
    uploads() {
        return new _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayIterator(this._uploads);
    }
    /**
     * Dispose of the resources held by the model.
     */
    dispose() {
        if (this.isDisposed) {
            return;
        }
        window.removeEventListener('beforeunload', this._unloadEventListener);
        this._isDisposed = true;
        this._poll.dispose();
        this._sessions.length = 0;
        this._items.length = 0;
        _lumino_signaling__WEBPACK_IMPORTED_MODULE_7__.Signal.clearData(this);
    }
    /**
     * Create an iterator over the model's items.
     *
     * @returns A new iterator over the model's items.
     */
    items() {
        return new _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayIterator(this._items);
    }
    /**
     * Create an iterator over the active sessions in the directory.
     *
     * @returns A new iterator over the model's active sessions.
     */
    sessions() {
        return new _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayIterator(this._sessions);
    }
    /**
     * Force a refresh of the directory contents.
     */
    async refresh() {
        await this._poll.refresh();
        await this._poll.tick;
        this._refreshed.emit(void 0);
    }
    /**
     * Change directory.
     *
     * @param path - The path to the file or directory.
     *
     * @returns A promise with the contents of the directory.
     */
    async cd(newValue = '.') {
        if (newValue !== '.') {
            newValue = this.manager.services.contents.resolvePath(this._model.path, newValue);
        }
        else {
            newValue = this._pendingPath || this._model.path;
        }
        if (this._pending) {
            // Collapse requests to the same directory.
            if (newValue === this._pendingPath) {
                return this._pending;
            }
            // Otherwise wait for the pending request to complete before continuing.
            await this._pending;
        }
        const oldValue = this.path;
        const options = { content: true };
        this._pendingPath = newValue;
        if (oldValue !== newValue) {
            this._sessions.length = 0;
        }
        const services = this.manager.services;
        this._pending = services.contents
            .get(newValue, options)
            .then(contents => {
            if (this.isDisposed) {
                return;
            }
            this.handleContents(contents);
            this._pendingPath = null;
            this._pending = null;
            if (oldValue !== newValue) {
                // If there is a state database and a unique key, save the new path.
                // We don't need to wait on the save to continue.
                if (this._state && this._key) {
                    void this._state.save(this._key, { path: newValue });
                }
                this._pathChanged.emit({
                    name: 'path',
                    oldValue,
                    newValue
                });
            }
            this.onRunningChanged(services.sessions, services.sessions.running());
            this._refreshed.emit(void 0);
        })
            .catch(error => {
            this._pendingPath = null;
            this._pending = null;
            if (error.response &&
                error.response.status === 404 &&
                newValue !== '/') {
                error.message = this._trans.__('Directory not found: "%1"', this._model.path);
                console.error(error);
                this._connectionFailure.emit(error);
                return this.cd('/');
            }
            else {
                this._connectionFailure.emit(error);
            }
        });
        return this._pending;
    }
    /**
     * Download a file.
     *
     * @param path - The path of the file to be downloaded.
     *
     * @returns A promise which resolves when the file has begun
     *   downloading.
     */
    async download(path) {
        const url = await this.manager.services.contents.getDownloadUrl(path);
        const element = document.createElement('a');
        element.href = url;
        element.download = '';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        return void 0;
    }
    /**
     * Restore the state of the file browser.
     *
     * @param id - The unique ID that is used to construct a state database key.
     *
     * @param populate - If `false`, the restoration ID will be set but the file
     * browser state will not be fetched from the state database.
     *
     * @returns A promise when restoration is complete.
     *
     * #### Notes
     * This function will only restore the model *once*. If it is called multiple
     * times, all subsequent invocations are no-ops.
     */
    async restore(id, populate = true) {
        const { manager } = this;
        const key = `file-browser-${id}:cwd`;
        const state = this._state;
        const restored = !!this._key;
        if (restored) {
            return;
        }
        // Set the file browser key for state database fetch/save.
        this._key = key;
        if (!populate || !state) {
            this._restored.resolve(undefined);
            return;
        }
        await manager.services.ready;
        try {
            const value = await state.fetch(key);
            if (!value) {
                this._restored.resolve(undefined);
                return;
            }
            const path = value['path'];
            // need to return to root path if preferred dir is set
            if (path) {
                await this.cd('/');
            }
            const localPath = manager.services.contents.localPath(path);
            await manager.services.contents.get(path);
            await this.cd(localPath);
        }
        catch (error) {
            await state.remove(key);
        }
        this._restored.resolve(undefined);
    }
    /**
     * Upload a `File` object.
     *
     * @param file - The `File` object to upload.
     *
     * @returns A promise containing the new file contents model.
     *
     * #### Notes
     * On Notebook version < 5.1.0, this will fail to upload files that are too
     * big to be sent in one request to the server. On newer versions, or on
     * Jupyter Server, it will ask for confirmation then upload the file in 1 MB
     * chunks.
     */
    async upload(file) {
        // We do not support Jupyter Notebook version less than 4, and Jupyter
        // Server advertises itself as version 1 and supports chunked
        // uploading. We assume any version less than 4.0.0 to be Jupyter Server
        // instead of Jupyter Notebook.
        const serverVersion = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PageConfig.getNotebookVersion();
        const supportsChunked = serverVersion < [4, 0, 0] /* Jupyter Server */ ||
            serverVersion >= [5, 1, 0]; /* Jupyter Notebook >= 5.1.0 */
        const largeFile = file.size > LARGE_FILE_SIZE;
        if (largeFile && !supportsChunked) {
            const msg = this._trans.__('Cannot upload file (>%1 MB). %2', LARGE_FILE_SIZE / (1024 * 1024), file.name);
            console.warn(msg);
            throw msg;
        }
        const err = 'File not uploaded';
        if (largeFile && !(await this._shouldUploadLarge(file))) {
            throw 'Cancelled large file upload';
        }
        await this._uploadCheckDisposed();
        await this.refresh();
        await this._uploadCheckDisposed();
        if ((0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.find)(this._items, i => i.name === file.name) &&
            !(await (0,_jupyterlab_docmanager__WEBPACK_IMPORTED_MODULE_2__.shouldOverwrite)(file.name))) {
            throw err;
        }
        await this._uploadCheckDisposed();
        const chunkedUpload = supportsChunked && file.size > CHUNK_SIZE;
        return await this._upload(file, chunkedUpload);
    }
    async _shouldUploadLarge(file) {
        const { button } = await (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
            title: this._trans.__('Large file size warning'),
            body: this._trans.__('The file size is %1 MB. Do you still want to upload it?', Math.round(file.size / (1024 * 1024))),
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: this._trans.__('Cancel') }),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: this._trans.__('Upload') })
            ]
        });
        return button.accept;
    }
    /**
     * Perform the actual upload.
     */
    async _upload(file, chunked) {
        // Gather the file model parameters.
        let path = this._model.path;
        path = path ? path + '/' + file.name : file.name;
        const name = file.name;
        const type = 'file';
        const format = 'base64';
        const uploadInner = async (blob, chunk) => {
            await this._uploadCheckDisposed();
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            await new Promise((resolve, reject) => {
                reader.onload = resolve;
                reader.onerror = event => reject(`Failed to upload "${file.name}":` + event);
            });
            await this._uploadCheckDisposed();
            // remove header https://stackoverflow.com/a/24289420/907060
            const content = reader.result.split(',')[1];
            const model = {
                type,
                format,
                name,
                chunk,
                content
            };
            return await this.manager.services.contents.save(path, model);
        };
        if (!chunked) {
            try {
                return await uploadInner(file);
            }
            catch (err) {
                _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.removeFirstWhere(this._uploads, uploadIndex => {
                    return file.name === uploadIndex.path;
                });
                throw err;
            }
        }
        let finalModel;
        let upload = { path, progress: 0 };
        this._uploadChanged.emit({
            name: 'start',
            newValue: upload,
            oldValue: null
        });
        for (let start = 0; !finalModel; start += CHUNK_SIZE) {
            const end = start + CHUNK_SIZE;
            const lastChunk = end >= file.size;
            const chunk = lastChunk ? -1 : end / CHUNK_SIZE;
            const newUpload = { path, progress: start / file.size };
            this._uploads.splice(this._uploads.indexOf(upload));
            this._uploads.push(newUpload);
            this._uploadChanged.emit({
                name: 'update',
                newValue: newUpload,
                oldValue: upload
            });
            upload = newUpload;
            let currentModel;
            try {
                currentModel = await uploadInner(file.slice(start, end), chunk);
            }
            catch (err) {
                _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.ArrayExt.removeFirstWhere(this._uploads, uploadIndex => {
                    return file.name === uploadIndex.path;
                });
                this._uploadChanged.emit({
                    name: 'failure',
                    newValue: upload,
                    oldValue: null
                });
                throw err;
            }
            if (lastChunk) {
                finalModel = currentModel;
            }
        }
        this._uploads.splice(this._uploads.indexOf(upload));
        this._uploadChanged.emit({
            name: 'finish',
            newValue: null,
            oldValue: upload
        });
        return finalModel;
    }
    _uploadCheckDisposed() {
        if (this.isDisposed) {
            return Promise.reject('Filemanager disposed. File upload canceled');
        }
        return Promise.resolve();
    }
    /**
     * Handle an updated contents model.
     */
    handleContents(contents) {
        // Update our internal data.
        this._model = {
            name: contents.name,
            path: contents.path,
            type: contents.type,
            content: undefined,
            writable: contents.writable,
            created: contents.created,
            last_modified: contents.last_modified,
            mimetype: contents.mimetype,
            format: contents.format
        };
        this._items = contents.content;
        this._paths.clear();
        contents.content.forEach((model) => {
            this._paths.add(model.path);
        });
    }
    /**
     * Handle a change to the running sessions.
     */
    onRunningChanged(sender, models) {
        this._populateSessions(models);
        this._refreshed.emit(void 0);
    }
    /**
     * Handle a change on the contents manager.
     */
    onFileChanged(sender, change) {
        const path = this._model.path;
        const { sessions } = this.manager.services;
        const { oldValue, newValue } = change;
        const value = oldValue && oldValue.path && _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.dirname(oldValue.path) === path
            ? oldValue
            : newValue && newValue.path && _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.dirname(newValue.path) === path
                ? newValue
                : undefined;
        // If either the old value or the new value is in the current path, update.
        if (value) {
            void this._poll.refresh();
            this._populateSessions(sessions.running());
            this._fileChanged.emit(change);
            return;
        }
    }
    /**
     * Populate the model's sessions collection.
     */
    _populateSessions(models) {
        this._sessions.length = 0;
        (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.each)(models, model => {
            if (this._paths.has(model.path)) {
                this._sessions.push(model);
            }
        });
    }
}
/**
 * File browser model where hidden files inclusion can be toggled on/off.
 */
class TogglableHiddenFileBrowserModel extends FileBrowserModel {
    constructor(options) {
        super(options);
        this._includeHiddenFiles = options.includeHiddenFiles || false;
    }
    /**
     * Create an iterator over the model's items filtering hidden files out if necessary.
     *
     * @returns A new iterator over the model's items.
     */
    items() {
        return this._includeHiddenFiles
            ? super.items()
            : (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.filter)(super.items(), value => !value.name.startsWith('.'));
    }
    /**
     * Set the inclusion of hidden files. Triggers a model refresh.
     */
    showHiddenFiles(value) {
        this._includeHiddenFiles = value;
        void this.refresh();
    }
}
/**
 * File browser model with optional filter on element.
 */
class FilterFileBrowserModel extends TogglableHiddenFileBrowserModel {
    constructor(options) {
        super(options);
        this._filter = options.filter ? options.filter : model => true;
    }
    /**
     * Create an iterator over the filtered model's items.
     *
     * @returns A new iterator over the model's items.
     */
    items() {
        return (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.filter)(super.items(), (value, index) => {
            if (value.type === 'directory') {
                return true;
            }
            else {
                return this._filter(value);
            }
        });
    }
    setFilter(filter) {
        this._filter = filter;
        void this.refresh();
    }
}
//# sourceMappingURL=model.js.map

/***/ }),

/***/ "../../packages/filebrowser/lib/opendialog.js":
/*!****************************************************!*\
  !*** ../../packages/filebrowser/lib/opendialog.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileDialog": () => (/* binding */ FileDialog)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./browser */ "../../packages/filebrowser/lib/browser.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./model */ "../../packages/filebrowser/lib/model.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.








/**
 * The class name added to open file dialog
 */
const OPEN_DIALOG_CLASS = 'jp-Open-Dialog';
/**
 * Namespace for file dialog
 */
var FileDialog;
(function (FileDialog) {
    /**
     * Create and show a open files dialog.
     *
     * Note: if nothing is selected when `getValue` will return the browser
     * model current path.
     *
     * @param options - The dialog setup options.
     *
     * @returns A promise that resolves with whether the dialog was accepted.
     */
    function getOpenFiles(options) {
        const translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        const trans = translator.load('jupyterlab');
        const dialogOptions = {
            title: options.title,
            buttons: [
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
                _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({
                    label: trans.__('Select')
                })
            ],
            focusNodeSelector: options.focusNodeSelector,
            host: options.host,
            renderer: options.renderer,
            body: new OpenDialog(options.manager, options.filter, translator)
        };
        const dialog = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog(dialogOptions);
        return dialog.launch();
    }
    FileDialog.getOpenFiles = getOpenFiles;
    /**
     * Create and show a open directory dialog.
     *
     * Note: if nothing is selected when `getValue` will return the browser
     * model current path.
     *
     * @param options - The dialog setup options.
     *
     * @returns A promise that resolves with whether the dialog was accepted.
     */
    function getExistingDirectory(options) {
        return getOpenFiles(Object.assign(Object.assign({}, options), { filter: model => false }));
    }
    FileDialog.getExistingDirectory = getExistingDirectory;
})(FileDialog || (FileDialog = {}));
/**
 * Open dialog widget
 */
class OpenDialog extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.Widget {
    constructor(manager, filter, translator) {
        super();
        translator = translator !== null && translator !== void 0 ? translator : _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        const trans = translator.load('jupyterlab');
        this.addClass(OPEN_DIALOG_CLASS);
        this._browser = Private.createFilteredFileBrowser('filtered-file-browser-dialog', manager, filter, {}, translator);
        // Add toolbar items
        (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.setToolbar)(this._browser, (browser) => [
            {
                name: 'new-folder',
                widget: new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
                    icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.newFolderIcon,
                    onClick: () => {
                        browser.createNewDirectory();
                    },
                    tooltip: trans.__('New Folder')
                })
            },
            {
                name: 'refresher',
                widget: new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton({
                    icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_3__.refreshIcon,
                    onClick: () => {
                        browser.model.refresh().catch(reason => {
                            console.error('Failed to refresh file browser in open dialog.', reason);
                        });
                    },
                    tooltip: trans.__('Refresh File List')
                })
            }
        ]);
        // Build the sub widgets
        const layout = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_5__.PanelLayout();
        layout.addWidget(this._browser);
        // Set Widget content
        this.layout = layout;
    }
    /**
     * Get the selected items.
     */
    getValue() {
        const selection = (0,_lumino_algorithm__WEBPACK_IMPORTED_MODULE_4__.toArray)(this._browser.selectedItems());
        if (selection.length === 0) {
            // Return current path
            return [
                {
                    path: this._browser.model.path,
                    name: _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_1__.PathExt.basename(this._browser.model.path),
                    type: 'directory',
                    content: undefined,
                    writable: false,
                    created: 'unknown',
                    last_modified: 'unknown',
                    mimetype: 'text/plain',
                    format: 'text'
                }
            ];
        }
        else {
            return selection;
        }
    }
}
var Private;
(function (Private) {
    /**
     * Create a new file browser instance.
     *
     * @param id - The widget/DOM id of the file browser.
     *
     * @param manager - A document manager instance.
     *
     * @param filter - function to filter file browser item.
     *
     * @param options - The optional file browser configuration object.
     *
     * #### Notes
     * The ID parameter is used to set the widget ID. It is also used as part of
     * the unique key necessary to store the file browser's restoration data in
     * the state database if that functionality is enabled.
     *
     * If, after the file browser has been generated by the factory, the ID of the
     * resulting widget is changed by client code, the restoration functionality
     * will not be disrupted as long as there are no ID collisions, i.e., as long
     * as the initial ID passed into the factory is used for only one file browser
     * instance.
     */
    Private.createFilteredFileBrowser = (id, manager, filter, options = {}, translator) => {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        const model = new _model__WEBPACK_IMPORTED_MODULE_6__.FilterFileBrowserModel({
            manager,
            filter,
            translator,
            driveName: options.driveName,
            refreshInterval: options.refreshInterval
        });
        const widget = new _browser__WEBPACK_IMPORTED_MODULE_7__.FileBrowser({
            id,
            model,
            translator
        });
        return widget;
    };
})(Private || (Private = {}));
//# sourceMappingURL=opendialog.js.map

/***/ }),

/***/ "../../packages/filebrowser/lib/tokens.js":
/*!************************************************!*\
  !*** ../../packages/filebrowser/lib/tokens.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IFileBrowserFactory": () => (/* binding */ IFileBrowserFactory),
/* harmony export */   "IFileBrowserCommands": () => (/* binding */ IFileBrowserCommands)
/* harmony export */ });
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

/* tslint:disable */
/**
 * The path tracker token.
 */
const IFileBrowserFactory = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/filebrowser:IFileBrowserFactory');
/**
 * The token that indicates the default file browser commands are loaded.
 */
const IFileBrowserCommands = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_0__.Token('@jupyterlab/filebrowser:IFileBrowserCommands');
//# sourceMappingURL=tokens.js.map

/***/ }),

/***/ "../../packages/filebrowser/lib/upload.js":
/*!************************************************!*\
  !*** ../../packages/filebrowser/lib/upload.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Uploader": () => (/* binding */ Uploader)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * A widget which provides an upload button.
 */
class Uploader extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButton {
    /**
     * Construct a new file browser buttons widget.
     */
    constructor(options) {
        super({
            icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.fileUploadIcon,
            onClick: () => {
                this._input.click();
            },
            tooltip: Private.translateToolTip(options.translator)
        });
        /**
         * The 'change' handler for the input field.
         */
        this._onInputChanged = () => {
            const files = Array.prototype.slice.call(this._input.files);
            const pending = files.map(file => this.fileBrowserModel.upload(file));
            void Promise.all(pending).catch(error => {
                void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(this._trans._p('showErrorMessage', 'Upload Error'), error);
            });
        };
        /**
         * The 'click' handler for the input field.
         */
        this._onInputClicked = () => {
            // In order to allow repeated uploads of the same file (with delete in between),
            // we need to clear the input value to trigger a change event.
            this._input.value = '';
        };
        this._input = Private.createUploadInput();
        this.fileBrowserModel = options.model;
        this.translator = options.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this._input.onclick = this._onInputClicked;
        this._input.onchange = this._onInputChanged;
        this.addClass('jp-id-upload');
    }
}
/**
 * The namespace for module private data.
 */
var Private;
(function (Private) {
    /**
     * Create the upload input node for a file buttons widget.
     */
    function createUploadInput() {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        return input;
    }
    Private.createUploadInput = createUploadInput;
    /**
     * Translate upload tooltip.
     */
    function translateToolTip(translator) {
        translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        const trans = translator.load('jupyterlab');
        return trans.__('Upload Files');
    }
    Private.translateToolTip = translateToolTip;
})(Private || (Private = {}));
//# sourceMappingURL=upload.js.map

/***/ }),

/***/ "../../packages/filebrowser/lib/uploadstatus.js":
/*!******************************************************!*\
  !*** ../../packages/filebrowser/lib/uploadstatus.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileUploadStatus": () => (/* binding */ FileUploadStatus)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/statusbar */ "webpack/sharing/consume/default/@jupyterlab/statusbar/@jupyterlab/statusbar");
/* harmony import */ var _jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/algorithm */ "webpack/sharing/consume/default/@lumino/algorithm/@lumino/algorithm");
/* harmony import */ var _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
//





/**
 * Half-spacing between items in the overall status item.
 */
const HALF_SPACING = 4;
/**
 * A pure function component for a FileUpload status item.
 *
 * @param props: the props for the component.
 *
 * @returns a tsx component for the file upload status.
 */
function FileUploadComponent(props) {
    const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
    const trans = translator.load('jupyterlab');
    return (react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.GroupItem, { spacing: HALF_SPACING },
        react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.TextItem, { source: trans.__('Uploading…') }),
        react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.ProgressBar, { percentage: props.upload })));
}
/**
 * The time for which to show the "Complete!" message after uploading.
 */
const UPLOAD_COMPLETE_MESSAGE_MILLIS = 2000;
/**
 * Status bar item to display file upload progress.
 */
class FileUploadStatus extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    /**
     * Construct a new FileUpload status item.
     */
    constructor(opts) {
        super(new FileUploadStatus.Model(opts.tracker.currentWidget && opts.tracker.currentWidget.model));
        this._onBrowserChange = (tracker, browser) => {
            if (browser === null) {
                this.model.browserModel = null;
            }
            else {
                this.model.browserModel = browser.model;
            }
        };
        this.translator = opts.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this._tracker = opts.tracker;
        this._tracker.currentChanged.connect(this._onBrowserChange);
    }
    /**
     * Render the FileUpload status.
     */
    render() {
        const uploadPaths = this.model.items;
        if (uploadPaths.length > 0) {
            const item = this.model.items[0];
            if (item.complete) {
                return react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_jupyterlab_statusbar__WEBPACK_IMPORTED_MODULE_1__.TextItem, { source: this._trans.__('Complete!') });
            }
            else {
                return (react__WEBPACK_IMPORTED_MODULE_4___default().createElement(FileUploadComponent, { upload: this.model.items[0].progress, translator: this.translator }));
            }
        }
        else {
            return react__WEBPACK_IMPORTED_MODULE_4___default().createElement(FileUploadComponent, { upload: 100, translator: this.translator });
        }
    }
    dispose() {
        super.dispose();
        this._tracker.currentChanged.disconnect(this._onBrowserChange);
    }
}
/**
 * A namespace for FileUpload class statics.
 */
(function (FileUploadStatus) {
    /**
     * The VDomModel for the FileUpload renderer.
     */
    class Model extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
        /**
         * Construct a new model.
         */
        constructor(browserModel) {
            super();
            /**
             * Handle an uploadChanged event in the filebrowser model.
             */
            this._uploadChanged = (browse, uploads) => {
                if (uploads.name === 'start') {
                    this._items.push({
                        path: uploads.newValue.path,
                        progress: uploads.newValue.progress * 100,
                        complete: false
                    });
                }
                else if (uploads.name === 'update') {
                    const idx = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.findFirstIndex(this._items, val => val.path === uploads.oldValue.path);
                    if (idx !== -1) {
                        this._items[idx].progress = uploads.newValue.progress * 100;
                    }
                }
                else if (uploads.name === 'finish') {
                    const idx = _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.findFirstIndex(this._items, val => val.path === uploads.oldValue.path);
                    if (idx !== -1) {
                        this._items[idx].complete = true;
                        setTimeout(() => {
                            _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.removeAt(this._items, idx);
                            this.stateChanged.emit(void 0);
                        }, UPLOAD_COMPLETE_MESSAGE_MILLIS);
                    }
                }
                else if (uploads.name === 'failure') {
                    _lumino_algorithm__WEBPACK_IMPORTED_MODULE_3__.ArrayExt.removeFirstWhere(this._items, val => val.path === uploads.newValue.path);
                }
                this.stateChanged.emit(void 0);
            };
            this._items = [];
            this._browserModel = null;
            this.browserModel = browserModel;
        }
        /**
         * The currently uploading items.
         */
        get items() {
            return this._items;
        }
        /**
         * The current file browser model.
         */
        get browserModel() {
            return this._browserModel;
        }
        set browserModel(browserModel) {
            const oldBrowserModel = this._browserModel;
            if (oldBrowserModel) {
                oldBrowserModel.uploadChanged.disconnect(this._uploadChanged);
            }
            this._browserModel = browserModel;
            this._items = [];
            if (this._browserModel !== null) {
                this._browserModel.uploadChanged.connect(this._uploadChanged);
            }
            this.stateChanged.emit(void 0);
        }
    }
    FileUploadStatus.Model = Model;
})(FileUploadStatus || (FileUploadStatus = {}));
//# sourceMappingURL=uploadstatus.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZmlsZWJyb3dzZXIvbGliL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2ZpbGVicm93c2VyL2xpYi9jcnVtYnMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2ZpbGVicm93c2VyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZmlsZWJyb3dzZXIvbGliL2xpc3RpbmcuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2ZpbGVicm93c2VyL2xpYi9tb2RlbC5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZmlsZWJyb3dzZXIvbGliL29wZW5kaWFsb2cuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2ZpbGVicm93c2VyL2xpYi90b2tlbnMuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2ZpbGVicm93c2VyL2xpYi91cGxvYWQuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2ZpbGVicm93c2VyL2xpYi91cGxvYWRzdGF0dXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ21GO0FBQzNCO0FBQ0M7QUFDSDtBQUNmO0FBQ0E7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sMEJBQTBCLG1EQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELG1FQUFjO0FBQzlEO0FBQ0E7QUFDQSwwQkFBMEIsZ0RBQVcsRUFBRSxvQkFBb0I7QUFDM0QsMkJBQTJCLHlEQUFPO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsaUNBQWlDLHNFQUFnQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsd0RBQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsc0VBQWdCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsaUJBQWlCLHNFQUFnQjtBQUNqQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGlCQUFpQixzRUFBZ0I7QUFDakM7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsZ0RBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnRkFBOEI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLHNFQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxtQzs7Ozs7Ozs7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyx5QkFBeUIsb0RBQU07QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsc0RBQU07QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxtRUFBYztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsc0VBQW9CO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0VBQW9CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzRUFBb0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isc0VBQXVCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1RUFBdUIsT0FBTyxzRUFBd0I7QUFDOUQsUUFBUSwrRUFBaUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHNFQUFvQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0VBQW9CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isc0VBQW9CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1REFBSTtBQUNaO0FBQ0EsMEJBQTBCLG9FQUFxQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBLDRCQUE0QixnRUFBaUI7QUFDN0M7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdFQUF5QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRDQUE0QztBQUM3Qyx3QyIsImZpbGUiOiJwYWNrYWdlc19maWxlYnJvd3Nlcl9saWJfaW5kZXhfanMuMzg3MmUzNTFmMGE0YmZiMWJkYzIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBGaWxlbmFtZVNlYXJjaGVyLCBzaG93RXJyb3JNZXNzYWdlLCBUb29sYmFyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgU2VydmVyQ29ubmVjdGlvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3NlcnZpY2VzJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgUGFuZWxMYXlvdXQsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgeyBCcmVhZENydW1icyB9IGZyb20gJy4vY3J1bWJzJztcbmltcG9ydCB7IERpckxpc3RpbmcgfSBmcm9tICcuL2xpc3RpbmcnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBmaWxlIGJyb3dzZXJzLlxuICovXG5jb25zdCBGSUxFX0JST1dTRVJfQ0xBU1MgPSAnanAtRmlsZUJyb3dzZXInO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byB0aGUgZmlsZWJyb3dzZXIgY3J1bWJzIG5vZGUuXG4gKi9cbmNvbnN0IENSVU1CU19DTEFTUyA9ICdqcC1GaWxlQnJvd3Nlci1jcnVtYnMnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byB0aGUgZmlsZWJyb3dzZXIgZmlsdGVyYm94IG5vZGUuXG4gKi9cbmNvbnN0IEZJTFRFUkJPWF9DTEFTUyA9ICdqcC1GaWxlQnJvd3Nlci1maWx0ZXJCb3gnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byB0aGUgZmlsZWJyb3dzZXIgdG9vbGJhciBub2RlLlxuICovXG5jb25zdCBUT09MQkFSX0NMQVNTID0gJ2pwLUZpbGVCcm93c2VyLXRvb2xiYXInO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byB0aGUgZmlsZWJyb3dzZXIgbGlzdGluZyBub2RlLlxuICovXG5jb25zdCBMSVNUSU5HX0NMQVNTID0gJ2pwLUZpbGVCcm93c2VyLWxpc3RpbmcnO1xuLyoqXG4gKiBBIHdpZGdldCB3aGljaCBob3N0cyBhIGZpbGUgYnJvd3Nlci5cbiAqXG4gKiBUaGUgd2lkZ2V0IHVzZXMgdGhlIEp1cHl0ZXIgQ29udGVudHMgQVBJIHRvIHJldHJpZXZlIGNvbnRlbnRzLFxuICogYW5kIHByZXNlbnRzIGl0c2VsZiBhcyBhIGZsYXQgbGlzdCBvZiBmaWxlcyBhbmQgZGlyZWN0b3JpZXMgd2l0aFxuICogYnJlYWRjcnVtYnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWxlQnJvd3NlciBleHRlbmRzIFdpZGdldCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGZpbGUgYnJvd3Nlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIGZpbGUgYnJvd3NlciBvcHRpb25zLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc2hvd0xhc3RNb2RpZmllZENvbHVtbiA9IHRydWU7XG4gICAgICAgIHRoaXMuX3VzZUZ1enp5RmlsdGVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fc2hvd0hpZGRlbkZpbGVzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoRklMRV9CUk9XU0VSX0NMQVNTKTtcbiAgICAgICAgdGhpcy5pZCA9IG9wdGlvbnMuaWQ7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gKHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsKTtcbiAgICAgICAgY29uc3QgcmVuZGVyZXIgPSBvcHRpb25zLnJlbmRlcmVyO1xuICAgICAgICBjb25zdCB0cmFuc2xhdG9yID0gdGhpcy50cmFuc2xhdG9yO1xuICAgICAgICBtb2RlbC5jb25uZWN0aW9uRmFpbHVyZS5jb25uZWN0KHRoaXMuX29uQ29ubmVjdGlvbkZhaWx1cmUsIHRoaXMpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX21hbmFnZXIgPSBtb2RlbC5tYW5hZ2VyO1xuICAgICAgICB0aGlzLl90cmFucyA9IHRoaXMudHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHRoaXMuY3J1bWJzID0gbmV3IEJyZWFkQ3J1bWJzKHsgbW9kZWwsIHRyYW5zbGF0b3IgfSk7XG4gICAgICAgIHRoaXMudG9vbGJhciA9IG5ldyBUb29sYmFyKCk7XG4gICAgICAgIC8vIGExMXlcbiAgICAgICAgdGhpcy50b29sYmFyLm5vZGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ25hdmlnYXRpb24nKTtcbiAgICAgICAgdGhpcy50b29sYmFyLm5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgdGhpcy5fdHJhbnMuX18oJ2ZpbGUgYnJvd3NlcicpKTtcbiAgICAgICAgdGhpcy5fZGlyZWN0b3J5UGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxpc3RpbmcgPSB0aGlzLmNyZWF0ZURpckxpc3Rpbmcoe1xuICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICByZW5kZXJlcixcbiAgICAgICAgICAgIHRyYW5zbGF0b3I6IHRoaXMudHJhbnNsYXRvclxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZmlsZW5hbWVTZWFyY2hlciA9IEZpbGVuYW1lU2VhcmNoZXIoe1xuICAgICAgICAgICAgdXBkYXRlRmlsdGVyOiAoZmlsdGVyRm4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RpbmcubW9kZWwuc2V0RmlsdGVyKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlckZuKHZhbHVlLm5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXNlRnV6enlGaWx0ZXI6IHRoaXMuX3VzZUZ1enp5RmlsdGVyLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMuX3RyYW5zLl9fKCdGaWx0ZXIgZmlsZXMgYnkgbmFtZScpXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNydW1icy5hZGRDbGFzcyhDUlVNQlNfQ0xBU1MpO1xuICAgICAgICB0aGlzLnRvb2xiYXIuYWRkQ2xhc3MoVE9PTEJBUl9DTEFTUyk7XG4gICAgICAgIHRoaXMuX2ZpbGVuYW1lU2VhcmNoZXIuYWRkQ2xhc3MoRklMVEVSQk9YX0NMQVNTKTtcbiAgICAgICAgdGhpcy5saXN0aW5nLmFkZENsYXNzKExJU1RJTkdfQ0xBU1MpO1xuICAgICAgICB0aGlzLmxheW91dCA9IG5ldyBQYW5lbExheW91dCgpO1xuICAgICAgICB0aGlzLmxheW91dC5hZGRXaWRnZXQodGhpcy50b29sYmFyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuYWRkV2lkZ2V0KHRoaXMuX2ZpbGVuYW1lU2VhcmNoZXIpO1xuICAgICAgICB0aGlzLmxheW91dC5hZGRXaWRnZXQodGhpcy5jcnVtYnMpO1xuICAgICAgICB0aGlzLmxheW91dC5hZGRXaWRnZXQodGhpcy5saXN0aW5nKTtcbiAgICAgICAgaWYgKG9wdGlvbnMucmVzdG9yZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZvaWQgbW9kZWwucmVzdG9yZSh0aGlzLmlkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgYWN0aXZlIGZpbGUgaW4gZmlsZSBicm93c2VyXG4gICAgICovXG4gICAgZ2V0IG5hdmlnYXRlVG9DdXJyZW50RGlyZWN0b3J5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmF2aWdhdGVUb0N1cnJlbnREaXJlY3Rvcnk7XG4gICAgfVxuICAgIHNldCBuYXZpZ2F0ZVRvQ3VycmVudERpcmVjdG9yeSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9uYXZpZ2F0ZVRvQ3VycmVudERpcmVjdG9yeSA9IHZhbHVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIGxhc3QgbW9kaWZpZWQgY29sdW1uXG4gICAgICovXG4gICAgZ2V0IHNob3dMYXN0TW9kaWZpZWRDb2x1bW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93TGFzdE1vZGlmaWVkQ29sdW1uO1xuICAgIH1cbiAgICBzZXQgc2hvd0xhc3RNb2RpZmllZENvbHVtbih2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5saXN0aW5nLnNldENvbHVtblZpc2liaWxpdHkpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdGluZy5zZXRDb2x1bW5WaXNpYmlsaXR5KCdsYXN0X21vZGlmaWVkJywgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fc2hvd0xhc3RNb2RpZmllZENvbHVtbiA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdMaXN0aW5nIGRvZXMgbm90IHN1cHBvcnQgdG9nZ2xpbmcgY29sdW1uIHZpc2liaWxpdHknKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSBmdXp6eSBmaWx0ZXJpbmcgb24gZmlsZSBuYW1lcy5cbiAgICAgKi9cbiAgICBzZXQgdXNlRnV6enlGaWx0ZXIodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fdXNlRnV6enlGaWx0ZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5fZmlsZW5hbWVTZWFyY2hlciA9IEZpbGVuYW1lU2VhcmNoZXIoe1xuICAgICAgICAgICAgdXBkYXRlRmlsdGVyOiAoZmlsdGVyRm4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RpbmcubW9kZWwuc2V0RmlsdGVyKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlckZuKHZhbHVlLm5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXNlRnV6enlGaWx0ZXI6IHRoaXMuX3VzZUZ1enp5RmlsdGVyLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMuX3RyYW5zLl9fKCdGaWx0ZXIgZmlsZXMgYnkgbmFtZScpLFxuICAgICAgICAgICAgZm9yY2VSZWZyZXNoOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9maWxlbmFtZVNlYXJjaGVyLmFkZENsYXNzKEZJTFRFUkJPWF9DTEFTUyk7XG4gICAgICAgIHRoaXMubGF5b3V0LnJlbW92ZVdpZGdldCh0aGlzLl9maWxlbmFtZVNlYXJjaGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQucmVtb3ZlV2lkZ2V0KHRoaXMuY3J1bWJzKTtcbiAgICAgICAgdGhpcy5sYXlvdXQucmVtb3ZlV2lkZ2V0KHRoaXMubGlzdGluZyk7XG4gICAgICAgIHRoaXMubGF5b3V0LmFkZFdpZGdldCh0aGlzLl9maWxlbmFtZVNlYXJjaGVyKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuYWRkV2lkZ2V0KHRoaXMuY3J1bWJzKTtcbiAgICAgICAgdGhpcy5sYXlvdXQuYWRkV2lkZ2V0KHRoaXMubGlzdGluZyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyBoaWRkZW4gZmlsZXNcbiAgICAgKi9cbiAgICBnZXQgc2hvd0hpZGRlbkZpbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0hpZGRlbkZpbGVzO1xuICAgIH1cbiAgICBzZXQgc2hvd0hpZGRlbkZpbGVzKHZhbHVlKSB7XG4gICAgICAgIHRoaXMubW9kZWwuc2hvd0hpZGRlbkZpbGVzKHZhbHVlKTtcbiAgICAgICAgdGhpcy5fc2hvd0hpZGRlbkZpbGVzID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpdGVyYXRvciBvdmVyIHRoZSBsaXN0aW5nJ3Mgc2VsZWN0ZWQgaXRlbXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBpdGVyYXRvciBvdmVyIHRoZSBsaXN0aW5nJ3Mgc2VsZWN0ZWQgaXRlbXMuXG4gICAgICovXG4gICAgc2VsZWN0ZWRJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGluZy5zZWxlY3RlZEl0ZW1zKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBhbiBpdGVtIGJ5IG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBpdGVtIHRvIHNlbGVjdC5cbiAgICAgKi9cbiAgICBhc3luYyBzZWxlY3RJdGVtQnlOYW1lKG5hbWUpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5saXN0aW5nLnNlbGVjdEl0ZW1CeU5hbWUobmFtZSk7XG4gICAgfVxuICAgIGNsZWFyU2VsZWN0ZWRJdGVtcygpIHtcbiAgICAgICAgdGhpcy5saXN0aW5nLmNsZWFyU2VsZWN0ZWRJdGVtcygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5hbWUgdGhlIGZpcnN0IGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgbmV3IG5hbWUgb2YgdGhlIGl0ZW0uXG4gICAgICovXG4gICAgcmVuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0aW5nLnJlbmFtZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDdXQgdGhlIHNlbGVjdGVkIGl0ZW1zLlxuICAgICAqL1xuICAgIGN1dCgpIHtcbiAgICAgICAgdGhpcy5saXN0aW5nLmN1dCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb3B5IHRoZSBzZWxlY3RlZCBpdGVtcy5cbiAgICAgKi9cbiAgICBjb3B5KCkge1xuICAgICAgICB0aGlzLmxpc3RpbmcuY29weSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXN0ZSB0aGUgaXRlbXMgZnJvbSB0aGUgY2xpcGJvYXJkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIHBhc3RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0aW5nLnBhc3RlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBkaXJlY3RvcnlcbiAgICAgKi9cbiAgICBjcmVhdGVOZXdEaXJlY3RvcnkoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kaXJlY3RvcnlQZW5kaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZGlyZWN0b3J5UGVuZGluZyA9IHRydWU7XG4gICAgICAgIC8vIFRPRE86IFdlIHNob3VsZCBwcm92aWRlIGEgaG9vayBpbnRvIHdoZW4gdGhlXG4gICAgICAgIC8vIGRpcmVjdG9yeSBpcyBkb25lIGJlaW5nIGNyZWF0ZWQuIFRoaXMgcHJvYmFibHlcbiAgICAgICAgLy8gbWVhbnMgc3RvcmluZyBhIHBlbmRpbmdEaXJlY3RvcnkgcHJvbWlzZSBhbmRcbiAgICAgICAgLy8gcmV0dXJuaW5nIHRoYXQgaWYgdGhlcmUgaXMgYWxyZWFkeSBhIGRpcmVjdG9yeVxuICAgICAgICAvLyByZXF1ZXN0LlxuICAgICAgICB2b2lkIHRoaXMuX21hbmFnZXJcbiAgICAgICAgICAgIC5uZXdVbnRpdGxlZCh7XG4gICAgICAgICAgICBwYXRoOiB0aGlzLm1vZGVsLnBhdGgsXG4gICAgICAgICAgICB0eXBlOiAnZGlyZWN0b3J5J1xuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oYXN5bmMgKG1vZGVsKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxpc3Rpbmcuc2VsZWN0SXRlbUJ5TmFtZShtb2RlbC5uYW1lKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucmVuYW1lKCk7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3RvcnlQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIHZvaWQgc2hvd0Vycm9yTWVzc2FnZSh0aGlzLl90cmFucy5fXygnRXJyb3InKSwgZXJyKTtcbiAgICAgICAgICAgIHRoaXMuX2RpcmVjdG9yeVBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBmaWxlXG4gICAgICovXG4gICAgY3JlYXRlTmV3RmlsZShvcHRpb25zKSB7XG4gICAgICAgIGlmICh0aGlzLl9maWxlUGVuZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZpbGVQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgLy8gVE9ETzogV2Ugc2hvdWxkIHByb3ZpZGUgYSBob29rIGludG8gd2hlbiB0aGVcbiAgICAgICAgLy8gZmlsZSBpcyBkb25lIGJlaW5nIGNyZWF0ZWQuIFRoaXMgcHJvYmFibHlcbiAgICAgICAgLy8gbWVhbnMgc3RvcmluZyBhIHBlbmRpbmdGaWxlIHByb21pc2UgYW5kXG4gICAgICAgIC8vIHJldHVybmluZyB0aGF0IGlmIHRoZXJlIGlzIGFscmVhZHkgYSBmaWxlXG4gICAgICAgIC8vIHJlcXVlc3QuXG4gICAgICAgIHZvaWQgdGhpcy5fbWFuYWdlclxuICAgICAgICAgICAgLm5ld1VudGl0bGVkKHtcbiAgICAgICAgICAgIHBhdGg6IHRoaXMubW9kZWwucGF0aCxcbiAgICAgICAgICAgIHR5cGU6ICdmaWxlJyxcbiAgICAgICAgICAgIGV4dDogb3B0aW9ucy5leHRcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGFzeW5jIChtb2RlbCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5saXN0aW5nLnNlbGVjdEl0ZW1CeU5hbWUobW9kZWwubmFtZSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJlbmFtZSgpO1xuICAgICAgICAgICAgdGhpcy5fZmlsZVBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgdm9pZCBzaG93RXJyb3JNZXNzYWdlKHRoaXMuX3RyYW5zLl9fKCdFcnJvcicpLCBlcnIpO1xuICAgICAgICAgICAgdGhpcy5fZmlsZVBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZSB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW0ocykuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gICAgICovXG4gICAgZGVsZXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0aW5nLmRlbGV0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEdXBsaWNhdGUgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtKHMpLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIGR1cGxpY2F0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGluZy5kdXBsaWNhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRG93bmxvYWQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtKHMpLlxuICAgICAqL1xuICAgIGRvd25sb2FkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0aW5nLmRvd25sb2FkKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNodXQgZG93biBrZXJuZWxzIG9uIHRoZSBhcHBsaWNhYmxlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICBzaHV0ZG93bktlcm5lbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Rpbmcuc2h1dGRvd25LZXJuZWxzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBuZXh0IGl0ZW0uXG4gICAgICovXG4gICAgc2VsZWN0TmV4dCgpIHtcbiAgICAgICAgdGhpcy5saXN0aW5nLnNlbGVjdE5leHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VsZWN0IHByZXZpb3VzIGl0ZW0uXG4gICAgICovXG4gICAgc2VsZWN0UHJldmlvdXMoKSB7XG4gICAgICAgIHRoaXMubGlzdGluZy5zZWxlY3RQcmV2aW91cygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaW5kIGEgbW9kZWwgZ2l2ZW4gYSBjbGljay5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBtb3VzZSBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBtb2RlbCBmb3IgdGhlIHNlbGVjdGVkIGZpbGUuXG4gICAgICovXG4gICAgbW9kZWxGb3JDbGljayhldmVudCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0aW5nLm1vZGVsRm9yQ2xpY2soZXZlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIHVuZGVybHlpbmcgRGlyTGlzdGluZyBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gVGhlIERpckxpc3RpbmcgY29uc3RydWN0b3Igb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIERpckxpc3RpbmcgaW5zdGFuY2UuXG4gICAgICovXG4gICAgY3JlYXRlRGlyTGlzdGluZyhvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGlyTGlzdGluZyhvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgY29ubmVjdGlvbiBsb3N0IHNpZ25hbCBmcm9tIHRoZSBtb2RlbC5cbiAgICAgKi9cbiAgICBfb25Db25uZWN0aW9uRmFpbHVyZShzZW5kZXIsIGFyZ3MpIHtcbiAgICAgICAgaWYgKGFyZ3MgaW5zdGFuY2VvZiBTZXJ2ZXJDb25uZWN0aW9uLlJlc3BvbnNlRXJyb3IgJiZcbiAgICAgICAgICAgIGFyZ3MucmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5fdHJhbnMuX18oJ0RpcmVjdG9yeSBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIGFyZ3MubWVzc2FnZSA9IHRoaXMuX3RyYW5zLl9fKCdEaXJlY3Rvcnkgbm90IGZvdW5kOiBcIiUxXCInLCB0aGlzLm1vZGVsLnBhdGgpO1xuICAgICAgICAgICAgdm9pZCBzaG93RXJyb3JNZXNzYWdlKHRpdGxlLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJyb3dzZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgRE9NVXRpbHMsIHNob3dFcnJvck1lc3NhZ2UgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBQYWdlQ29uZmlnLCBQYXRoRXh0IH0gZnJvbSAnQGp1cHl0ZXJsYWIvY29yZXV0aWxzJztcbmltcG9ydCB7IHJlbmFtZUZpbGUgfSBmcm9tICdAanVweXRlcmxhYi9kb2NtYW5hZ2VyJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgZWxsaXBzZXNJY29uLCBob21lSWNvbiBhcyBwcmVmZXJyZWRJY29uLCBmb2xkZXJJY29uIGFzIHJvb3RJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBBcnJheUV4dCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IEVsZW1lbnRFeHQgfSBmcm9tICdAbHVtaW5vL2RvbXV0aWxzJztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBicmVhZGNydW1iIG5vZGUuXG4gKi9cbmNvbnN0IEJSRUFEQ1JVTUJfQ0xBU1MgPSAnanAtQnJlYWRDcnVtYnMnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBmb3IgdGhlIGJyZWFkY3J1bWJzIGhvbWUgbm9kZVxuICovXG5jb25zdCBCUkVBRENSVU1CX1JPT1RfQ0xBU1MgPSAnanAtQnJlYWRDcnVtYnMtaG9tZSc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGZvciB0aGUgYnJlYWRjcnVtYnMgcHJlZmVycmVkIG5vZGVcbiAqL1xuY29uc3QgQlJFQURDUlVNQl9QUkVGRVJSRURfQ0xBU1MgPSAnanAtQnJlYWRDcnVtYnMtcHJlZmVycmVkJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIGJyZWFkY3J1bWIgbm9kZS5cbiAqL1xuY29uc3QgQlJFQURDUlVNQl9JVEVNX0NMQVNTID0gJ2pwLUJyZWFkQ3J1bWJzLWl0ZW0nO1xuLyoqXG4gKiBCcmVhZCBjcnVtYiBwYXRocy5cbiAqL1xuY29uc3QgQlJFQURfQ1JVTUJfUEFUSFMgPSBbJy8nLCAnLi4vLi4vJywgJy4uLycsICcnXTtcbi8qKlxuICogVGhlIG1pbWUgdHlwZSBmb3IgYSBjb250ZW50cyBkcmFnIG9iamVjdC5cbiAqL1xuY29uc3QgQ09OVEVOVFNfTUlNRSA9ICdhcHBsaWNhdGlvbi94LWp1cHl0ZXItaWNvbnRlbnRzJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gZHJvcCB0YXJnZXRzLlxuICovXG5jb25zdCBEUk9QX1RBUkdFVF9DTEFTUyA9ICdqcC1tb2QtZHJvcFRhcmdldCc7XG4vKipcbiAqIEEgY2xhc3Mgd2hpY2ggaG9zdHMgZm9sZGVyIGJyZWFkY3J1bWJzLlxuICovXG5leHBvcnQgY2xhc3MgQnJlYWRDcnVtYnMgZXh0ZW5kcyBXaWRnZXQge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIG5ldyBmaWxlIGJyb3dzZXIgY3J1bWIgd2lkZ2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIG1vZGVsIC0gVGhlIGZpbGUgYnJvd3NlciB2aWV3IG1vZGVsLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gb3B0aW9ucy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLl90cmFucyA9IHRoaXMudHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHRoaXMuX21vZGVsID0gb3B0aW9ucy5tb2RlbDtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhCUkVBRENSVU1CX0NMQVNTKTtcbiAgICAgICAgdGhpcy5fY3J1bWJzID0gUHJpdmF0ZS5jcmVhdGVDcnVtYnMoKTtcbiAgICAgICAgdGhpcy5fY3J1bWJTZXBzID0gUHJpdmF0ZS5jcmVhdGVDcnVtYlNlcGFyYXRvcnMoKTtcbiAgICAgICAgY29uc3QgaGFzUHJlZmVycmVkID0gUGFnZUNvbmZpZy5nZXRPcHRpb24oJ3ByZWZlcnJlZFBhdGgnKTtcbiAgICAgICAgdGhpcy5faGFzUHJlZmVycmVkID0gaGFzUHJlZmVycmVkICYmIGhhc1ByZWZlcnJlZCAhPT0gJy8nID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5faGFzUHJlZmVycmVkKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYXBwZW5kQ2hpbGQodGhpcy5fY3J1bWJzW1ByaXZhdGUuQ3J1bWIuUHJlZmVycmVkXSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLmFwcGVuZENoaWxkKHRoaXMuX2NydW1ic1tQcml2YXRlLkNydW1iLkhvbWVdKTtcbiAgICAgICAgdGhpcy5fbW9kZWwucmVmcmVzaGVkLmNvbm5lY3QodGhpcy51cGRhdGUsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIERPTSBldmVudHMgZm9yIHRoZSBicmVhZCBjcnVtYnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnQgLSBUaGUgRE9NIGV2ZW50IHNlbnQgdG8gdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIG1ldGhvZCBpbXBsZW1lbnRzIHRoZSBET00gYEV2ZW50TGlzdGVuZXJgIGludGVyZmFjZSBhbmQgaXNcbiAgICAgKiBjYWxsZWQgaW4gcmVzcG9uc2UgdG8gZXZlbnRzIG9uIHRoZSBwYW5lbCdzIERPTSBub2RlLiBJdCBzaG91bGRcbiAgICAgKiBub3QgYmUgY2FsbGVkIGRpcmVjdGx5IGJ5IHVzZXIgY29kZS5cbiAgICAgKi9cbiAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRDbGljayhldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsbS1kcmFnZW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dERyYWdFbnRlcihldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsbS1kcmFnbGVhdmUnOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dERyYWdMZWF2ZShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsbS1kcmFnb3Zlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0RHJhZ092ZXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbG0tZHJvcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0RHJvcChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGFuIGAnYWZ0ZXItYXR0YWNoJ2AgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBvbkFmdGVyQXR0YWNoKG1zZykge1xuICAgICAgICBzdXBlci5vbkFmdGVyQXR0YWNoKG1zZyk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsbS1kcmFnZW50ZXInLCB0aGlzKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsbS1kcmFnbGVhdmUnLCB0aGlzKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdsbS1kcmFnb3ZlcicsIHRoaXMpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2xtLWRyb3AnLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBtZXNzYWdlIGhhbmRsZXIgaW52b2tlZCBvbiBhIGAnYmVmb3JlLWRldGFjaCdgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25CZWZvcmVEZXRhY2gobXNnKSB7XG4gICAgICAgIHN1cGVyLm9uQmVmb3JlRGV0YWNoKG1zZyk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdsbS1kcmFnZW50ZXInLCB0aGlzKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdsbS1kcmFnbGVhdmUnLCB0aGlzKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdsbS1kcmFnb3ZlcicsIHRoaXMpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xtLWRyb3AnLCB0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBoYW5kbGVyIGludm9rZWQgb24gYW4gYCd1cGRhdGUtcmVxdWVzdCdgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25VcGRhdGVSZXF1ZXN0KG1zZykge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIGJyZWFkY3J1bWIgbGlzdC5cbiAgICAgICAgY29uc3QgY29udGVudHMgPSB0aGlzLl9tb2RlbC5tYW5hZ2VyLnNlcnZpY2VzLmNvbnRlbnRzO1xuICAgICAgICBjb25zdCBsb2NhbFBhdGggPSBjb250ZW50cy5sb2NhbFBhdGgodGhpcy5fbW9kZWwucGF0aCk7XG4gICAgICAgIFByaXZhdGUudXBkYXRlQ3J1bWJzKHRoaXMuX2NydW1icywgdGhpcy5fY3J1bWJTZXBzLCBsb2NhbFBhdGgsIHRoaXMuX2hhc1ByZWZlcnJlZCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdjbGljaydgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnRDbGljayhldmVudCkge1xuICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGl0J3Mgbm90IGEgbGVmdCBtb3VzZSBwcmVzcy5cbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZpbmQgYSB2YWxpZCBjbGljayB0YXJnZXQuXG4gICAgICAgIGxldCBub2RlID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICB3aGlsZSAobm9kZSAmJiBub2RlICE9PSB0aGlzLm5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhCUkVBRENSVU1CX1BSRUZFUlJFRF9DTEFTUykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb2RlbFxuICAgICAgICAgICAgICAgICAgICAuY2QoUGFnZUNvbmZpZy5nZXRPcHRpb24oJ3ByZWZlcnJlZFBhdGgnKSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHNob3dFcnJvck1lc3NhZ2UodGhpcy5fdHJhbnMuX18oJ09wZW4gRXJyb3InKSwgZXJyb3IpKTtcbiAgICAgICAgICAgICAgICAvLyBTdG9wIHRoZSBldmVudCBwcm9wYWdhdGlvbi5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucyhCUkVBRENSVU1CX0lURU1fQ0xBU1MpIHx8XG4gICAgICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoQlJFQURDUlVNQl9ST09UX0NMQVNTKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlFeHQuZmluZEZpcnN0SW5kZXgodGhpcy5fY3J1bWJzLCB2YWx1ZSA9PiB2YWx1ZSA9PT0gbm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW9kZWxcbiAgICAgICAgICAgICAgICAgICAgLmNkKEJSRUFEX0NSVU1CX1BBVEhTW2luZGV4XSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHNob3dFcnJvck1lc3NhZ2UodGhpcy5fdHJhbnMuX18oJ09wZW4gRXJyb3InKSwgZXJyb3IpKTtcbiAgICAgICAgICAgICAgICAvLyBTdG9wIHRoZSBldmVudCBwcm9wYWdhdGlvbi5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBgJ2xtLWRyYWdlbnRlcidgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnREcmFnRW50ZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lm1pbWVEYXRhLmhhc0RhdGEoQ09OVEVOVFNfTUlNRSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlFeHQuZmluZEZpcnN0SW5kZXgodGhpcy5fY3J1bWJzLCBub2RlID0+IEVsZW1lbnRFeHQuaGl0VGVzdChub2RlLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSBQcml2YXRlLkNydW1iLkN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3J1bWJzW2luZGV4XS5jbGFzc0xpc3QuYWRkKERST1BfVEFSR0VUX0NMQVNTKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdsbS1kcmFnbGVhdmUnYCBldmVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfZXZ0RHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0ID0gRE9NVXRpbHMuZmluZEVsZW1lbnQodGhpcy5ub2RlLCBEUk9QX1RBUkdFVF9DTEFTUyk7XG4gICAgICAgIGlmIChkcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoRFJPUF9UQVJHRVRfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdsbS1kcmFnb3ZlcidgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnREcmFnT3ZlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQuZHJvcEFjdGlvbiA9IGV2ZW50LnByb3Bvc2VkQWN0aW9uO1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0ID0gRE9NVXRpbHMuZmluZEVsZW1lbnQodGhpcy5ub2RlLCBEUk9QX1RBUkdFVF9DTEFTUyk7XG4gICAgICAgIGlmIChkcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoRFJPUF9UQVJHRVRfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlFeHQuZmluZEZpcnN0SW5kZXgodGhpcy5fY3J1bWJzLCBub2RlID0+IEVsZW1lbnRFeHQuaGl0VGVzdChub2RlLCBldmVudC5jbGllbnRYLCBldmVudC5jbGllbnRZKSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2NydW1ic1tpbmRleF0uY2xhc3NMaXN0LmFkZChEUk9QX1RBUkdFVF9DTEFTUyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBgJ2xtLWRyb3AnYCBldmVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfZXZ0RHJvcChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKGV2ZW50LnByb3Bvc2VkQWN0aW9uID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIGV2ZW50LmRyb3BBY3Rpb24gPSAnbm9uZSc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFldmVudC5taW1lRGF0YS5oYXNEYXRhKENPTlRFTlRTX01JTUUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQuZHJvcEFjdGlvbiA9IGV2ZW50LnByb3Bvc2VkQWN0aW9uO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICB3aGlsZSAodGFyZ2V0ICYmIHRhcmdldC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhEUk9QX1RBUkdFVF9DTEFTUykpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShEUk9QX1RBUkdFVF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICAvLyBHZXQgdGhlIHBhdGggYmFzZWQgb24gdGhlIHRhcmdldCBub2RlLlxuICAgICAgICBjb25zdCBpbmRleCA9IEFycmF5RXh0LmZpbmRGaXJzdEluZGV4KHRoaXMuX2NydW1icywgbm9kZSA9PiBub2RlID09PSB0YXJnZXQpO1xuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLl9tb2RlbDtcbiAgICAgICAgY29uc3QgcGF0aCA9IFBhdGhFeHQucmVzb2x2ZShtb2RlbC5wYXRoLCBCUkVBRF9DUlVNQl9QQVRIU1tpbmRleF0pO1xuICAgICAgICBjb25zdCBtYW5hZ2VyID0gbW9kZWwubWFuYWdlcjtcbiAgICAgICAgLy8gTW92ZSBhbGwgb2YgdGhlIGl0ZW1zLlxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBjb25zdCBvbGRQYXRocyA9IGV2ZW50Lm1pbWVEYXRhLmdldERhdGEoQ09OVEVOVFNfTUlNRSk7XG4gICAgICAgIGZvciAoY29uc3Qgb2xkUGF0aCBvZiBvbGRQYXRocykge1xuICAgICAgICAgICAgY29uc3QgbG9jYWxPbGRQYXRoID0gbWFuYWdlci5zZXJ2aWNlcy5jb250ZW50cy5sb2NhbFBhdGgob2xkUGF0aCk7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gUGF0aEV4dC5iYXNlbmFtZShsb2NhbE9sZFBhdGgpO1xuICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IFBhdGhFeHQuam9pbihwYXRoLCBuYW1lKTtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gocmVuYW1lRmlsZShtYW5hZ2VyLCBvbGRQYXRoLCBuZXdQYXRoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdm9pZCBQcm9taXNlLmFsbChwcm9taXNlcykuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaG93RXJyb3JNZXNzYWdlKHRoaXMuX3RyYW5zLl9fKCdNb3ZlIEVycm9yJyksIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgdGhlIGNydW1icyBwcml2YXRlIGRhdGEuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogQnJlYWRjcnVtYiBpdGVtIGxpc3QgZW51bS5cbiAgICAgKi9cbiAgICBsZXQgQ3J1bWI7XG4gICAgKGZ1bmN0aW9uIChDcnVtYikge1xuICAgICAgICBDcnVtYltDcnVtYltcIkhvbWVcIl0gPSAwXSA9IFwiSG9tZVwiO1xuICAgICAgICBDcnVtYltDcnVtYltcIkVsbGlwc2lzXCJdID0gMV0gPSBcIkVsbGlwc2lzXCI7XG4gICAgICAgIENydW1iW0NydW1iW1wiUGFyZW50XCJdID0gMl0gPSBcIlBhcmVudFwiO1xuICAgICAgICBDcnVtYltDcnVtYltcIkN1cnJlbnRcIl0gPSAzXSA9IFwiQ3VycmVudFwiO1xuICAgICAgICBDcnVtYltDcnVtYltcIlByZWZlcnJlZFwiXSA9IDRdID0gXCJQcmVmZXJyZWRcIjtcbiAgICB9KShDcnVtYiA9IFByaXZhdGUuQ3J1bWIgfHwgKFByaXZhdGUuQ3J1bWIgPSB7fSkpO1xuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlIHRoZSBicmVhZGNydW1iIG5vZGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlQ3J1bWJzKGJyZWFkY3J1bWJzLCBzZXBhcmF0b3JzLCBwYXRoLCBoYXNQcmVmZXJyZWQpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGJyZWFkY3J1bWJzWzBdLnBhcmVudE5vZGU7XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgYnV0IHRoZSByb290IG9yIHByZWZlcnJlZCBub2RlLlxuICAgICAgICBjb25zdCBmaXJzdENoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICB3aGlsZSAoZmlyc3RDaGlsZCAmJiBmaXJzdENoaWxkLm5leHRTaWJsaW5nKSB7XG4gICAgICAgICAgICBub2RlLnJlbW92ZUNoaWxkKGZpcnN0Q2hpbGQubmV4dFNpYmxpbmcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNQcmVmZXJyZWQpIHtcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoYnJlYWRjcnVtYnNbQ3J1bWIuSG9tZV0pO1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChzZXBhcmF0b3JzWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoc2VwYXJhdG9yc1swXSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFydHMgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGJyZWFkY3J1bWJzW0NydW1iLkVsbGlwc2lzXSk7XG4gICAgICAgICAgICBjb25zdCBncmFuZFBhcmVudCA9IHBhcnRzLnNsaWNlKDAsIHBhcnRzLmxlbmd0aCAtIDIpLmpvaW4oJy8nKTtcbiAgICAgICAgICAgIGJyZWFkY3J1bWJzW0NydW1iLkVsbGlwc2lzXS50aXRsZSA9IGdyYW5kUGFyZW50O1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChzZXBhcmF0b3JzWzFdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgYnJlYWRjcnVtYnNbQ3J1bWIuUGFyZW50XS50ZXh0Q29udGVudCA9IHBhcnRzW3BhcnRzLmxlbmd0aCAtIDJdO1xuICAgICAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoYnJlYWRjcnVtYnNbQ3J1bWIuUGFyZW50XSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gcGFydHMuc2xpY2UoMCwgcGFydHMubGVuZ3RoIC0gMSkuam9pbignLycpO1xuICAgICAgICAgICAgICAgIGJyZWFkY3J1bWJzW0NydW1iLlBhcmVudF0udGl0bGUgPSBwYXJlbnQ7XG4gICAgICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChzZXBhcmF0b3JzWzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFkY3J1bWJzW0NydW1iLkN1cnJlbnRdLnRleHRDb250ZW50ID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGJyZWFkY3J1bWJzW0NydW1iLkN1cnJlbnRdKTtcbiAgICAgICAgICAgIGJyZWFkY3J1bWJzW0NydW1iLkN1cnJlbnRdLnRpdGxlID0gcGF0aDtcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoc2VwYXJhdG9yc1szXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS51cGRhdGVDcnVtYnMgPSB1cGRhdGVDcnVtYnM7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBicmVhZGNydW1iIG5vZGVzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUNydW1icygpIHtcbiAgICAgICAgY29uc3QgaG9tZSA9IHJvb3RJY29uLmVsZW1lbnQoe1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBCUkVBRENSVU1CX1JPT1RfQ0xBU1MsXG4gICAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICAgIHRpdGxlOiBQYWdlQ29uZmlnLmdldE9wdGlvbignc2VydmVyUm9vdCcpIHx8ICdKdXB5dGVyIFNlcnZlciBSb290JyxcbiAgICAgICAgICAgIHN0eWxlc2hlZXQ6ICdicmVhZENydW1iJ1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZWxsaXBzaXMgPSBlbGxpcHNlc0ljb24uZWxlbWVudCh7XG4gICAgICAgICAgICBjbGFzc05hbWU6IEJSRUFEQ1JVTUJfSVRFTV9DTEFTUyxcbiAgICAgICAgICAgIHRhZzogJ3NwYW4nLFxuICAgICAgICAgICAgc3R5bGVzaGVldDogJ2JyZWFkQ3J1bWInXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBwYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHBhcmVudC5jbGFzc05hbWUgPSBCUkVBRENSVU1CX0lURU1fQ0xBU1M7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGN1cnJlbnQuY2xhc3NOYW1lID0gQlJFQURDUlVNQl9JVEVNX0NMQVNTO1xuICAgICAgICBjb25zdCBwcmVmZXJyZWQgPSBwcmVmZXJyZWRJY29uLmVsZW1lbnQoe1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBCUkVBRENSVU1CX1BSRUZFUlJFRF9DTEFTUyxcbiAgICAgICAgICAgIHRhZzogJ3NwYW4nLFxuICAgICAgICAgICAgdGl0bGU6IFBhZ2VDb25maWcuZ2V0T3B0aW9uKCdwcmVmZXJyZWRQYXRoJykgfHwgJ0p1cHl0ZXIgUHJlZmVycmVkIFBhdGgnLFxuICAgICAgICAgICAgc3R5bGVzaGVldDogJ2JyZWFkQ3J1bWInXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gW2hvbWUsIGVsbGlwc2lzLCBwYXJlbnQsIGN1cnJlbnQsIHByZWZlcnJlZF07XG4gICAgfVxuICAgIFByaXZhdGUuY3JlYXRlQ3J1bWJzID0gY3JlYXRlQ3J1bWJzO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSB0aGUgYnJlYWRjcnVtYiBzZXBhcmF0b3Igbm9kZXMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlQ3J1bWJTZXBhcmF0b3JzKCkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgICAgICAvLyBUaGUgbWF4aW11bSBudW1iZXIgb2YgZGlyZWN0b3JpZXMgdGhhdCB3aWxsIGJlIHNob3duIGluIHRoZSBjcnVtYnNcbiAgICAgICAgY29uc3QgTUFYX0RJUkVDVE9SSUVTID0gMjtcbiAgICAgICAgLy8gTWFrZSBzZXBhcmF0b3JzIGZvciBhZnRlciBlYWNoIGRpcmVjdG9yeSwgb25lIGF0IHRoZSBiZWdpbm5pbmcsIGFuZCBvbmVcbiAgICAgICAgLy8gYWZ0ZXIgYSBwb3NzaWJsZSBlbGxpcHNpcy5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNQVhfRElSRUNUT1JJRVMgKyAyOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBpdGVtLnRleHRDb250ZW50ID0gJy8nO1xuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuICAgIFByaXZhdGUuY3JlYXRlQ3J1bWJTZXBhcmF0b3JzID0gY3JlYXRlQ3J1bWJTZXBhcmF0b3JzO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jcnVtYnMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLyoqXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqIEBtb2R1bGUgZmlsZWJyb3dzZXJcbiAqL1xuZXhwb3J0ICogZnJvbSAnLi9icm93c2VyJztcbmV4cG9ydCAqIGZyb20gJy4vY3J1bWJzJztcbmV4cG9ydCAqIGZyb20gJy4vbGlzdGluZyc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVsJztcbmV4cG9ydCAqIGZyb20gJy4vb3BlbmRpYWxvZyc7XG5leHBvcnQgKiBmcm9tICcuL3Rva2Vucyc7XG5leHBvcnQgKiBmcm9tICcuL3VwbG9hZCc7XG5leHBvcnQgKiBmcm9tICcuL3VwbG9hZHN0YXR1cyc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBEaWFsb2csIERPTVV0aWxzLCBzaG93RGlhbG9nLCBzaG93RXJyb3JNZXNzYWdlIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgUGF0aEV4dCwgVGltZSB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBpc1ZhbGlkRmlsZU5hbWUsIHJlbmFtZUZpbGUgfSBmcm9tICdAanVweXRlcmxhYi9kb2NtYW5hZ2VyJztcbmltcG9ydCB7IERvY3VtZW50UmVnaXN0cnkgfSBmcm9tICdAanVweXRlcmxhYi9kb2NyZWdpc3RyeSc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IGNhcmV0RG93bkljb24sIGNhcmV0VXBJY29uLCBjbGFzc2VzLCBMYWJJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyBBcnJheUV4dCwgQXJyYXlJdGVyYXRvciwgZWFjaCwgZmlsdGVyLCBmaW5kLCBTdHJpbmdFeHQsIHRvQXJyYXkgfSBmcm9tICdAbHVtaW5vL2FsZ29yaXRobSc7XG5pbXBvcnQgeyBNaW1lRGF0YSwgUHJvbWlzZURlbGVnYXRlIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuaW1wb3J0IHsgRWxlbWVudEV4dCB9IGZyb20gJ0BsdW1pbm8vZG9tdXRpbHMnO1xuaW1wb3J0IHsgRHJhZyB9IGZyb20gJ0BsdW1pbm8vZHJhZ2Ryb3AnO1xuaW1wb3J0IHsgTWVzc2FnZUxvb3AgfSBmcm9tICdAbHVtaW5vL21lc3NhZ2luZyc7XG5pbXBvcnQgeyBTaWduYWwgfSBmcm9tICdAbHVtaW5vL3NpZ25hbGluZyc7XG5pbXBvcnQgeyBoLCBWaXJ0dWFsRE9NIH0gZnJvbSAnQGx1bWluby92aXJ0dWFsZG9tJztcbmltcG9ydCB7IFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIERpckxpc3Rpbmcgd2lkZ2V0LlxuICovXG5jb25zdCBESVJfTElTVElOR19DTEFTUyA9ICdqcC1EaXJMaXN0aW5nJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYSBkaXIgbGlzdGluZyBoZWFkZXIgbm9kZS5cbiAqL1xuY29uc3QgSEVBREVSX0NMQVNTID0gJ2pwLURpckxpc3RpbmctaGVhZGVyJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYSBkaXIgbGlzdGluZyBsaXN0IGhlYWRlciBjZWxsLlxuICovXG5jb25zdCBIRUFERVJfSVRFTV9DTEFTUyA9ICdqcC1EaXJMaXN0aW5nLWhlYWRlckl0ZW0nO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBhIGhlYWRlciBjZWxsIHRleHQgbm9kZS5cbiAqL1xuY29uc3QgSEVBREVSX0lURU1fVEVYVF9DTEFTUyA9ICdqcC1EaXJMaXN0aW5nLWhlYWRlckl0ZW1UZXh0Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gYSBoZWFkZXIgY2VsbCBpY29uIG5vZGUuXG4gKi9cbmNvbnN0IEhFQURFUl9JVEVNX0lDT05fQ0xBU1MgPSAnanAtRGlyTGlzdGluZy1oZWFkZXJJdGVtSWNvbic7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBkaXIgbGlzdGluZyBjb250ZW50IG5vZGUuXG4gKi9cbmNvbnN0IENPTlRFTlRfQ0xBU1MgPSAnanAtRGlyTGlzdGluZy1jb250ZW50Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gZGlyIGxpc3RpbmcgY29udGVudCBpdGVtLlxuICovXG5jb25zdCBJVEVNX0NMQVNTID0gJ2pwLURpckxpc3RpbmctaXRlbSc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBsaXN0aW5nIGl0ZW0gdGV4dCBjZWxsLlxuICovXG5jb25zdCBJVEVNX1RFWFRfQ0xBU1MgPSAnanAtRGlyTGlzdGluZy1pdGVtVGV4dCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBsaXN0aW5nIGl0ZW0gaWNvbiBjZWxsLlxuICovXG5jb25zdCBJVEVNX0lDT05fQ0xBU1MgPSAnanAtRGlyTGlzdGluZy1pdGVtSWNvbic7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBsaXN0aW5nIGl0ZW0gbW9kaWZpZWQgY2VsbC5cbiAqL1xuY29uc3QgSVRFTV9NT0RJRklFRF9DTEFTUyA9ICdqcC1EaXJMaXN0aW5nLWl0ZW1Nb2RpZmllZCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBkaXIgbGlzdGluZyBlZGl0b3Igbm9kZS5cbiAqL1xuY29uc3QgRURJVE9SX0NMQVNTID0gJ2pwLURpckxpc3RpbmctZWRpdG9yJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIG5hbWUgY29sdW1uIGhlYWRlciBjZWxsLlxuICovXG5jb25zdCBOQU1FX0lEX0NMQVNTID0gJ2pwLWlkLW5hbWUnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byB0aGUgbW9kaWZpZWQgY29sdW1uIGhlYWRlciBjZWxsLlxuICovXG5jb25zdCBNT0RJRklFRF9JRF9DTEFTUyA9ICdqcC1pZC1tb2RpZmllZCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSBuYXJyb3cgY29sdW1uIGhlYWRlciBjZWxsLlxuICovXG5jb25zdCBOQVJST1dfSURfQ0xBU1MgPSAnanAtaWQtbmFycm93Jztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gdGhlIG1vZGlmaWVkIGNvbHVtbiBoZWFkZXIgY2VsbCBhbmQgbW9kaWZpZWQgaXRlbSBjZWxsIHdoZW4gaGlkZGVuLlxuICovXG5jb25zdCBNT0RJRklFRF9DT0xVTU5fSElEREVOID0gJ2pwLUxhc3RNb2RpZmllZC1oaWRkZW4nO1xuLyoqXG4gKiBUaGUgbWltZSB0eXBlIGZvciBhIGNvbnRlbnRzIGRyYWcgb2JqZWN0LlxuICovXG5jb25zdCBDT05URU5UU19NSU1FID0gJ2FwcGxpY2F0aW9uL3gtanVweXRlci1pY29udGVudHMnO1xuLyoqXG4gKiBUaGUgbWltZSB0eXBlIGZvciBhIHJpY2ggY29udGVudHMgZHJhZyBvYmplY3QuXG4gKi9cbmNvbnN0IENPTlRFTlRTX01JTUVfUklDSCA9ICdhcHBsaWNhdGlvbi94LWp1cHl0ZXItaWNvbnRlbnRzcmljaCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIGRyb3AgdGFyZ2V0cy5cbiAqL1xuY29uc3QgRFJPUF9UQVJHRVRfQ0xBU1MgPSAnanAtbW9kLWRyb3BUYXJnZXQnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBzZWxlY3RlZCByb3dzLlxuICovXG5jb25zdCBTRUxFQ1RFRF9DTEFTUyA9ICdqcC1tb2Qtc2VsZWN0ZWQnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBkcmFnIHN0YXRlIGljb25zIHRvIGFkZCBzcGFjZSBiZXR3ZWVuIHRoZSBpY29uIGFuZCB0aGUgZmlsZSBuYW1lXG4gKi9cbmNvbnN0IERSQUdfSUNPTl9DTEFTUyA9ICdqcC1EcmFnSWNvbic7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIHRoZSB3aWRnZXQgd2hlbiB0aGVyZSBhcmUgaXRlbXMgb24gdGhlIGNsaXBib2FyZC5cbiAqL1xuY29uc3QgQ0xJUEJPQVJEX0NMQVNTID0gJ2pwLW1vZC1jbGlwYm9hcmQnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB0byBjdXQgcm93cy5cbiAqL1xuY29uc3QgQ1VUX0NMQVNTID0gJ2pwLW1vZC1jdXQnO1xuLyoqXG4gKiBUaGUgY2xhc3MgbmFtZSBhZGRlZCB3aGVuIHRoZXJlIGFyZSBtb3JlIHRoYW4gb25lIHNlbGVjdGVkIHJvd3MuXG4gKi9cbmNvbnN0IE1VTFRJX1NFTEVDVEVEX0NMQVNTID0gJ2pwLW1vZC1tdWx0aVNlbGVjdGVkJztcbi8qKlxuICogVGhlIGNsYXNzIG5hbWUgYWRkZWQgdG8gaW5kaWNhdGUgcnVubmluZyBub3RlYm9vay5cbiAqL1xuY29uc3QgUlVOTklOR19DTEFTUyA9ICdqcC1tb2QtcnVubmluZyc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIGZvciBhIGRlc2NlbmRpbmcgc29ydC5cbiAqL1xuY29uc3QgREVTQ0VORElOR19DTEFTUyA9ICdqcC1tb2QtZGVzY2VuZGluZyc7XG4vKipcbiAqIFRoZSBtYXhpbXVtIGR1cmF0aW9uIGJldHdlZW4gdHdvIGtleSBwcmVzc2VzIHdoZW4gc2VsZWN0aW5nIGZpbGVzIGJ5IHByZWZpeC5cbiAqL1xuY29uc3QgUFJFRklYX0FQUEVORF9EVVJBVElPTiA9IDEwMDA7XG4vKipcbiAqIFRoZSB0aHJlc2hvbGQgaW4gcGl4ZWxzIHRvIHN0YXJ0IGEgZHJhZyBldmVudC5cbiAqL1xuY29uc3QgRFJBR19USFJFU0hPTEQgPSA1O1xuLyoqXG4gKiBBIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBwbGF0Zm9ybSBpcyBNYWMuXG4gKi9cbmNvbnN0IElTX01BQyA9ICEhbmF2aWdhdG9yLnBsYXRmb3JtLm1hdGNoKC9NYWMvaSk7XG4vKipcbiAqIFRoZSBmYWN0b3J5IE1JTUUgdHlwZSBzdXBwb3J0ZWQgYnkgbHVtaW5vIGRvY2sgcGFuZWxzLlxuICovXG5jb25zdCBGQUNUT1JZX01JTUUgPSAnYXBwbGljYXRpb24vdm5kLmx1bWluby53aWRnZXQtZmFjdG9yeSc7XG4vKipcbiAqIEEgd2lkZ2V0IHdoaWNoIGhvc3RzIGEgZmlsZSBsaXN0IGFyZWEuXG4gKi9cbmV4cG9ydCBjbGFzcyBEaXJMaXN0aW5nIGV4dGVuZHMgV2lkZ2V0IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgZmlsZSBicm93c2VyIGRpcmVjdG9yeSBsaXN0aW5nIHdpZGdldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBtb2RlbCAtIFRoZSBmaWxlIGJyb3dzZXIgdmlldyBtb2RlbC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIG5vZGU6IChvcHRpb25zLnJlbmRlcmVyIHx8IERpckxpc3RpbmcuZGVmYXVsdFJlbmRlcmVyKS5jcmVhdGVOb2RlKClcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgICAgIHRoaXMuX3NvcnRlZEl0ZW1zID0gW107XG4gICAgICAgIHRoaXMuX3NvcnRTdGF0ZSA9IHtcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2FzY2VuZGluZycsXG4gICAgICAgICAgICBrZXk6ICduYW1lJ1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vbkl0ZW1PcGVuZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9kcmFnID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZHJhZ0RhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl9zZWxlY3RUaW1lciA9IC0xO1xuICAgICAgICB0aGlzLl9pc0N1dCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wcmV2UGF0aCA9ICcnO1xuICAgICAgICB0aGlzLl9jbGlwYm9hcmQgPSBbXTtcbiAgICAgICAgdGhpcy5fc29mdFNlbGVjdGlvbiA9ICcnO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX3NlYXJjaFByZWZpeCA9ICcnO1xuICAgICAgICB0aGlzLl9zZWFyY2hQcmVmaXhUaW1lciA9IC0xO1xuICAgICAgICB0aGlzLl9pblJlbmFtZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc0RpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2hpZGRlbkNvbHVtbnMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoRElSX0xJU1RJTkdfQ0xBU1MpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0b3IgPSBvcHRpb25zLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX3RyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgdGhpcy5fbW9kZWwgPSBvcHRpb25zLm1vZGVsO1xuICAgICAgICB0aGlzLl9tb2RlbC5maWxlQ2hhbmdlZC5jb25uZWN0KHRoaXMuX29uRmlsZUNoYW5nZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLl9tb2RlbC5yZWZyZXNoZWQuY29ubmVjdCh0aGlzLl9vbk1vZGVsUmVmcmVzaGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fbW9kZWwucGF0aENoYW5nZWQuY29ubmVjdCh0aGlzLl9vblBhdGhDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fZWRpdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICB0aGlzLl9lZGl0Tm9kZS5jbGFzc05hbWUgPSBFRElUT1JfQ0xBU1M7XG4gICAgICAgIHRoaXMuX21hbmFnZXIgPSB0aGlzLl9tb2RlbC5tYW5hZ2VyO1xuICAgICAgICB0aGlzLl9yZW5kZXJlciA9IG9wdGlvbnMucmVuZGVyZXIgfHwgRGlyTGlzdGluZy5kZWZhdWx0UmVuZGVyZXI7XG4gICAgICAgIGNvbnN0IGhlYWRlck5vZGUgPSBET01VdGlscy5maW5kRWxlbWVudCh0aGlzLm5vZGUsIEhFQURFUl9DTEFTUyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnBvcHVsYXRlSGVhZGVyTm9kZShoZWFkZXJOb2RlLCB0aGlzLnRyYW5zbGF0b3IsIHRoaXMuX2hpZGRlbkNvbHVtbnMpO1xuICAgICAgICB0aGlzLl9tYW5hZ2VyLmFjdGl2YXRlUmVxdWVzdGVkLmNvbm5lY3QodGhpcy5fb25BY3RpdmF0ZVJlcXVlc3RlZCwgdGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3Bvc2Ugb2YgdGhlIHJlc291cmNlcyBoZWxkIGJ5IHRoZSBkaXJlY3RvcnkgbGlzdGluZy5cbiAgICAgKi9cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICB0aGlzLl9pdGVtcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9zb3J0ZWRJdGVtcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLl9jbGlwYm9hcmQubGVuZ3RoID0gMDtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1vZGVsIHVzZWQgYnkgdGhlIGxpc3RpbmcuXG4gICAgICovXG4gICAgZ2V0IG1vZGVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGlyIGxpc3RpbmcgaGVhZGVyIG5vZGUuXG4gICAgICpcbiAgICAgKiAjIyMjIE5vdGVzXG4gICAgICogVGhpcyBpcyB0aGUgbm9kZSB3aGljaCBob2xkcyB0aGUgaGVhZGVyIGNlbGxzLlxuICAgICAqXG4gICAgICogTW9kaWZ5aW5nIHRoaXMgbm9kZSBkaXJlY3RseSBjYW4gbGVhZCB0byB1bmRlZmluZWQgYmVoYXZpb3IuXG4gICAgICovXG4gICAgZ2V0IGhlYWRlck5vZGUoKSB7XG4gICAgICAgIHJldHVybiBET01VdGlscy5maW5kRWxlbWVudCh0aGlzLm5vZGUsIEhFQURFUl9DTEFTUyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZGlyIGxpc3RpbmcgY29udGVudCBub2RlLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoaXMgaXMgdGhlIG5vZGUgd2hpY2ggaG9sZHMgdGhlIGl0ZW0gbm9kZXMuXG4gICAgICpcbiAgICAgKiBNb2RpZnlpbmcgdGhpcyBub2RlIGRpcmVjdGx5IGNhbiBsZWFkIHRvIHVuZGVmaW5lZCBiZWhhdmlvci5cbiAgICAgKi9cbiAgICBnZXQgY29udGVudE5vZGUoKSB7XG4gICAgICAgIHJldHVybiBET01VdGlscy5maW5kRWxlbWVudCh0aGlzLm5vZGUsIENPTlRFTlRfQ0xBU1MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcmVuZGVyZXIgaW5zdGFuY2UgdXNlZCBieSB0aGUgZGlyZWN0b3J5IGxpc3RpbmcuXG4gICAgICovXG4gICAgZ2V0IHJlbmRlcmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHNvcnQgc3RhdGUuXG4gICAgICovXG4gICAgZ2V0IHNvcnRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvcnRTdGF0ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZmlyZWQgd2hlbiBhbiBpdGVtIGlzIG9wZW5lZC5cbiAgICAgKi9cbiAgICBnZXQgb25JdGVtT3BlbmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb25JdGVtT3BlbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaXRlcmF0b3Igb3ZlciB0aGUgbGlzdGluZydzIHNlbGVjdGVkIGl0ZW1zLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgaXRlcmF0b3Igb3ZlciB0aGUgbGlzdGluZydzIHNlbGVjdGVkIGl0ZW1zLlxuICAgICAqL1xuICAgIHNlbGVjdGVkSXRlbXMoKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5fc29ydGVkSXRlbXM7XG4gICAgICAgIHJldHVybiBmaWx0ZXIoaXRlbXMsIGl0ZW0gPT4gdGhpcy5zZWxlY3Rpb25baXRlbS5wYXRoXSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpdGVyYXRvciBvdmVyIHRoZSBsaXN0aW5nJ3Mgc29ydGVkIGl0ZW1zLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgaXRlcmF0b3Igb3ZlciB0aGUgbGlzdGluZydzIHNvcnRlZCBpdGVtcy5cbiAgICAgKi9cbiAgICBzb3J0ZWRJdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheUl0ZXJhdG9yKHRoaXMuX3NvcnRlZEl0ZW1zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU29ydCB0aGUgaXRlbXMgdXNpbmcgYSBzb3J0IGNvbmRpdGlvbi5cbiAgICAgKi9cbiAgICBzb3J0KHN0YXRlKSB7XG4gICAgICAgIHRoaXMuX3NvcnRlZEl0ZW1zID0gUHJpdmF0ZS5zb3J0KHRoaXMubW9kZWwuaXRlbXMoKSwgc3RhdGUpO1xuICAgICAgICB0aGlzLl9zb3J0U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuYW1lIHRoZSBmaXJzdCBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIG5ldyBuYW1lIG9mIHRoZSBpdGVtLlxuICAgICAqL1xuICAgIHJlbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RvUmVuYW1lKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEN1dCB0aGUgc2VsZWN0ZWQgaXRlbXMuXG4gICAgICovXG4gICAgY3V0KCkge1xuICAgICAgICB0aGlzLl9pc0N1dCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NvcHkoKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29weSB0aGUgc2VsZWN0ZWQgaXRlbXMuXG4gICAgICovXG4gICAgY29weSgpIHtcbiAgICAgICAgdGhpcy5fY29weSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXN0ZSB0aGUgaXRlbXMgZnJvbSB0aGUgY2xpcGJvYXJkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIHBhc3RlKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2NsaXBib2FyZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzQ3V0ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLl9tb2RlbC5wYXRoO1xuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBlYWNoKHRoaXMuX2NsaXBib2FyZCwgcGF0aCA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNDdXQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IFBhdGhFeHQuam9pbihiYXNlUGF0aCwgbmFtZSk7XG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9tb2RlbC5tYW5hZ2VyLnJlbmFtZShwYXRoLCBuZXdQYXRoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX21vZGVsLm1hbmFnZXIuY29weShwYXRoLCBiYXNlUGF0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gUmVtb3ZlIGFueSBjdXQgbW9kaWZpZXJzLlxuICAgICAgICBlYWNoKHRoaXMuX2l0ZW1zLCBpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShDVVRfQ0xBU1MpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fY2xpcGJvYXJkLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX2lzQ3V0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoQ0xJUEJPQVJEX0NMQVNTKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB2b2lkIHNob3dFcnJvck1lc3NhZ2UodGhpcy5fdHJhbnMuX3AoJ3Nob3dFcnJvck1lc3NhZ2UnLCAnUGFzdGUgRXJyb3InKSwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbShzKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS5cbiAgICAgKi9cbiAgICBhc3luYyBkZWxldGUoKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5fc29ydGVkSXRlbXMuZmlsdGVyKGl0ZW0gPT4gdGhpcy5zZWxlY3Rpb25baXRlbS5wYXRoXSk7XG4gICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGl0ZW1zLmxlbmd0aCA9PT0gMVxuICAgICAgICAgICAgPyB0aGlzLl90cmFucy5fXygnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHBlcm1hbmVudGx5IGRlbGV0ZTogJTE/JywgaXRlbXNbMF0ubmFtZSlcbiAgICAgICAgICAgIDogdGhpcy5fdHJhbnMuX24oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBwZXJtYW5lbnRseSBkZWxldGUgdGhlICUxIHNlbGVjdGVkIGl0ZW0/JywgJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBwZXJtYW5lbnRseSBkZWxldGUgdGhlICUxIHNlbGVjdGVkIGl0ZW1zPycsIGl0ZW1zLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNob3dEaWFsb2coe1xuICAgICAgICAgICAgdGl0bGU6IHRoaXMuX3RyYW5zLl9fKCdEZWxldGUnKSxcbiAgICAgICAgICAgIGJvZHk6IG1lc3NhZ2UsXG4gICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgRGlhbG9nLmNhbmNlbEJ1dHRvbih7IGxhYmVsOiB0aGlzLl90cmFucy5fXygnQ2FuY2VsJykgfSksXG4gICAgICAgICAgICAgICAgRGlhbG9nLndhcm5CdXR0b24oeyBsYWJlbDogdGhpcy5fdHJhbnMuX18oJ0RlbGV0ZScpIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgLy8gQnkgZGVmYXVsdCBmb2N1cyBvbiBcIkNhbmNlbFwiIHRvIHByb3RlY3QgZnJvbSBhY2NpZGVudGFsIGRlbGV0aW9uXG4gICAgICAgICAgICAvLyAoXCJkZWxldGVcIiBhbmQgXCJFbnRlclwiIGFyZSBuZXh0IHRvIGVhY2ggb3RoZXIgb24gbWFueSBrZXlib2FyZHMpLlxuICAgICAgICAgICAgZGVmYXVsdEJ1dHRvbjogMFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzcG9zZWQgJiYgcmVzdWx0LmJ1dHRvbi5hY2NlcHQpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX2RlbGV0ZShpdGVtcy5tYXAoaXRlbSA9PiBpdGVtLnBhdGgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEdXBsaWNhdGUgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtKHMpLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgICAqL1xuICAgIGR1cGxpY2F0ZSgpIHtcbiAgICAgICAgY29uc3QgYmFzZVBhdGggPSB0aGlzLl9tb2RlbC5wYXRoO1xuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBlYWNoKHRoaXMuc2VsZWN0ZWRJdGVtcygpLCBpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgIT09ICdkaXJlY3RvcnknKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9tb2RlbC5tYW5hZ2VyLmNvcHkoaXRlbS5wYXRoLCBiYXNlUGF0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB2b2lkIHNob3dFcnJvck1lc3NhZ2UodGhpcy5fdHJhbnMuX3AoJ3Nob3dFcnJvck1lc3NhZ2UnLCAnRHVwbGljYXRlIGZpbGUnKSwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRG93bmxvYWQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtKHMpLlxuICAgICAqL1xuICAgIGFzeW5jIGRvd25sb2FkKCkge1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbCh0b0FycmF5KHRoaXMuc2VsZWN0ZWRJdGVtcygpKVxuICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0udHlwZSAhPT0gJ2RpcmVjdG9yeScpXG4gICAgICAgICAgICAubWFwKGl0ZW0gPT4gdGhpcy5fbW9kZWwuZG93bmxvYWQoaXRlbS5wYXRoKSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaHV0IGRvd24ga2VybmVscyBvbiB0aGUgYXBwbGljYWJsZSBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gICAgICovXG4gICAgc2h1dGRvd25LZXJuZWxzKCkge1xuICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMuX21vZGVsO1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuX3NvcnRlZEl0ZW1zO1xuICAgICAgICBjb25zdCBwYXRocyA9IGl0ZW1zLm1hcChpdGVtID0+IGl0ZW0ucGF0aCk7XG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gdG9BcnJheSh0aGlzLl9tb2RlbC5zZXNzaW9ucygpKVxuICAgICAgICAgICAgLmZpbHRlcihzZXNzaW9uID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlFeHQuZmlyc3RJbmRleE9mKHBhdGhzLCBzZXNzaW9uLnBhdGgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uW2l0ZW1zW2luZGV4XS5wYXRoXTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYXAoc2Vzc2lvbiA9PiBtb2RlbC5tYW5hZ2VyLnNlcnZpY2VzLnNlc3Npb25zLnNodXRkb3duKHNlc3Npb24uaWQpKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB2b2lkIHNob3dFcnJvck1lc3NhZ2UodGhpcy5fdHJhbnMuX3AoJ3Nob3dFcnJvck1lc3NhZ2UnLCAnU2h1dCBkb3duIGtlcm5lbCcpLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgbmV4dCBpdGVtLlxuICAgICAqXG4gICAgICogQHBhcmFtIGtlZXBFeGlzdGluZyAtIFdoZXRoZXIgdG8ga2VlcCB0aGUgY3VycmVudCBzZWxlY3Rpb24gYW5kIGFkZCB0byBpdC5cbiAgICAgKi9cbiAgICBzZWxlY3ROZXh0KGtlZXBFeGlzdGluZyA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLl9zb3J0ZWRJdGVtcztcbiAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA9PT0gMSB8fCBrZWVwRXhpc3RpbmcpIHtcbiAgICAgICAgICAgIC8vIFNlbGVjdCB0aGUgbmV4dCBpdGVtLlxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHNlbGVjdGVkW3NlbGVjdGVkLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaW5kZXggPSBBcnJheUV4dC5maW5kRmlyc3RJbmRleChpdGVtcywgdmFsdWUgPT4gdmFsdWUucGF0aCA9PT0gcGF0aCk7XG4gICAgICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSB0aGlzLl9pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBTZWxlY3QgdGhlIGZpcnN0IGl0ZW0uXG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBTZWxlY3QgdGhlIGxhc3Qgc2VsZWN0ZWQgaXRlbS5cbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBzZWxlY3RlZFtzZWxlY3RlZC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGluZGV4ID0gQXJyYXlFeHQuZmluZEZpcnN0SW5kZXgoaXRlbXMsIHZhbHVlID0+IHZhbHVlLnBhdGggPT09IHBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdEl0ZW0oaW5kZXgsIGtlZXBFeGlzdGluZyk7XG4gICAgICAgICAgICBFbGVtZW50RXh0LnNjcm9sbEludG9WaWV3SWZOZWVkZWQodGhpcy5jb250ZW50Tm9kZSwgdGhpcy5faXRlbXNbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgcHJldmlvdXMgaXRlbS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZWVwRXhpc3RpbmcgLSBXaGV0aGVyIHRvIGtlZXAgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGFuZCBhZGQgdG8gaXQuXG4gICAgICovXG4gICAgc2VsZWN0UHJldmlvdXMoa2VlcEV4aXN0aW5nID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gT2JqZWN0LmtleXModGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuX3NvcnRlZEl0ZW1zO1xuICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID09PSAxIHx8IGtlZXBFeGlzdGluZykge1xuICAgICAgICAgICAgLy8gU2VsZWN0IHRoZSBwcmV2aW91cyBpdGVtLlxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHNlbGVjdGVkWzBdO1xuICAgICAgICAgICAgaW5kZXggPSBBcnJheUV4dC5maW5kRmlyc3RJbmRleChpdGVtcywgdmFsdWUgPT4gdmFsdWUucGF0aCA9PT0gcGF0aCk7XG4gICAgICAgICAgICBpbmRleCAtPSAxO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzZWxlY3RlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIFNlbGVjdCB0aGUgbGFzdCBpdGVtLlxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLl9pdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gU2VsZWN0IHRoZSBmaXJzdCBzZWxlY3RlZCBpdGVtLlxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHNlbGVjdGVkWzBdO1xuICAgICAgICAgICAgaW5kZXggPSBBcnJheUV4dC5maW5kRmlyc3RJbmRleChpdGVtcywgdmFsdWUgPT4gdmFsdWUucGF0aCA9PT0gcGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0SXRlbShpbmRleCwga2VlcEV4aXN0aW5nKTtcbiAgICAgICAgICAgIEVsZW1lbnRFeHQuc2Nyb2xsSW50b1ZpZXdJZk5lZWRlZCh0aGlzLmNvbnRlbnROb2RlLCB0aGlzLl9pdGVtc1tpbmRleF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbGVjdCB0aGUgZmlyc3QgaXRlbSB0aGF0IHN0YXJ0cyB3aXRoIHByZWZpeCBiZWluZyB0eXBlZC5cbiAgICAgKi9cbiAgICBzZWxlY3RCeVByZWZpeCgpIHtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gdGhpcy5fc2VhcmNoUHJlZml4LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5fc29ydGVkSXRlbXM7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlFeHQuZmluZEZpcnN0SW5kZXgoaXRlbXMsIHZhbHVlID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5uYW1lLnRvTG93ZXJDYXNlKCkuc3Vic3RyKDAsIHByZWZpeC5sZW5ndGgpID09PSBwcmVmaXg7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RJdGVtKGluZGV4LCBmYWxzZSk7XG4gICAgICAgICAgICBFbGVtZW50RXh0LnNjcm9sbEludG9WaWV3SWZOZWVkZWQodGhpcy5jb250ZW50Tm9kZSwgdGhpcy5faXRlbXNbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgd2hldGhlciBhbiBpdGVtIGlzIHNlbGVjdGVkIGJ5IG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSAtIFRoZSBuYW1lIG9mIG9mIHRoZSBpdGVtLlxuICAgICAqXG4gICAgICogQHJldHVybnMgV2hldGhlciB0aGUgaXRlbSBpcyBzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBpc1NlbGVjdGVkKG5hbWUpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLl9zb3J0ZWRJdGVtcztcbiAgICAgICAgcmV0dXJuICh0b0FycmF5KGZpbHRlcihpdGVtcywgaXRlbSA9PiBpdGVtLm5hbWUgPT09IG5hbWUgJiYgdGhpcy5zZWxlY3Rpb25baXRlbS5wYXRoXSkpLmxlbmd0aCAhPT0gMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbmQgYSBtb2RlbCBnaXZlbiBhIGNsaWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50IC0gVGhlIG1vdXNlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMgVGhlIG1vZGVsIGZvciB0aGUgc2VsZWN0ZWQgZmlsZS5cbiAgICAgKi9cbiAgICBtb2RlbEZvckNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5fc29ydGVkSXRlbXM7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gUHJpdmF0ZS5oaXRUZXN0Tm9kZXModGhpcy5faXRlbXMsIGV2ZW50KTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1zW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhciB0aGUgc2VsZWN0ZWQgaXRlbXMuXG4gICAgICovXG4gICAgY2xlYXJTZWxlY3RlZEl0ZW1zKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBhbiBpdGVtIGJ5IG5hbWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBpdGVtIHRvIHNlbGVjdC5cbiAgICAgKiBAcGFyYW0gZm9jdXMgLSBXaGV0aGVyIHRvIG1vdmUgZm9jdXMgdGhlIHNlbGVjdGVkIGl0ZW0uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBuYW1lIGlzIHNlbGVjdGVkLlxuICAgICAqL1xuICAgIGFzeW5jIHNlbGVjdEl0ZW1CeU5hbWUobmFtZSwgZm9jdXMgPSBmYWxzZSkge1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGZpbGUgaXMgYXZhaWxhYmxlLlxuICAgICAgICBhd2FpdCB0aGlzLm1vZGVsLnJlZnJlc2goKTtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaWxlIGJyb3dzZXIgaXMgZGlzcG9zZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLl9zb3J0ZWRJdGVtcztcbiAgICAgICAgY29uc3QgaW5kZXggPSBBcnJheUV4dC5maW5kRmlyc3RJbmRleChpdGVtcywgdmFsdWUgPT4gdmFsdWUubmFtZSA9PT0gbmFtZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSXRlbSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZWxlY3RJdGVtKGluZGV4LCBmYWxzZSwgZm9jdXMpO1xuICAgICAgICBNZXNzYWdlTG9vcC5zZW5kTWVzc2FnZSh0aGlzLCBXaWRnZXQuTXNnLlVwZGF0ZVJlcXVlc3QpO1xuICAgICAgICBFbGVtZW50RXh0LnNjcm9sbEludG9WaWV3SWZOZWVkZWQodGhpcy5jb250ZW50Tm9kZSwgdGhpcy5faXRlbXNbaW5kZXhdKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBET00gZXZlbnRzIGZvciB0aGUgZGlyZWN0b3J5IGxpc3RpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnQgLSBUaGUgRE9NIGV2ZW50IHNlbnQgdG8gdGhlIHdpZGdldC5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIG1ldGhvZCBpbXBsZW1lbnRzIHRoZSBET00gYEV2ZW50TGlzdGVuZXJgIGludGVyZmFjZSBhbmQgaXNcbiAgICAgKiBjYWxsZWQgaW4gcmVzcG9uc2UgdG8gZXZlbnRzIG9uIHRoZSBwYW5lbCdzIERPTSBub2RlLiBJdCBzaG91bGRcbiAgICAgKiBub3QgYmUgY2FsbGVkIGRpcmVjdGx5IGJ5IHVzZXIgY29kZS5cbiAgICAgKi9cbiAgICBoYW5kbGVFdmVudChldmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZ0TW91c2Vkb3duKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21vdXNldXAnOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2dE1vdXNldXAoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbW91c2Vtb3ZlJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRNb3VzZW1vdmUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAna2V5ZG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5ldnRLZXlkb3duKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRDbGljayhldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkYmxjbGljayc6XG4gICAgICAgICAgICAgICAgdGhpcy5ldnREYmxDbGljayhldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcmFnZW50ZXInOlxuICAgICAgICAgICAgY2FzZSAnZHJhZ292ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLW1vZC1uYXRpdmUtZHJvcCcpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcmFnbGVhdmUnOlxuICAgICAgICAgICAgY2FzZSAnZHJhZ2VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnanAtbW9kLW5hdGl2ZS1kcm9wJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkcm9wJzpcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdqcC1tb2QtbmF0aXZlLWRyb3AnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmV2dE5hdGl2ZURyb3AoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2Nyb2xsJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldnRTY3JvbGwoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbG0tZHJhZ2VudGVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLmV2dERyYWdFbnRlcihldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsbS1kcmFnbGVhdmUnOlxuICAgICAgICAgICAgICAgIHRoaXMuZXZ0RHJhZ0xlYXZlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xtLWRyYWdvdmVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLmV2dERyYWdPdmVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2xtLWRyb3AnOlxuICAgICAgICAgICAgICAgIHRoaXMuZXZ0RHJvcChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgbWVzc2FnZSBoYW5kbGVyIGludm9rZWQgb24gYW4gYCdhZnRlci1hdHRhY2gnYCBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uQWZ0ZXJBdHRhY2gobXNnKSB7XG4gICAgICAgIHN1cGVyLm9uQWZ0ZXJBdHRhY2gobXNnKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IERPTVV0aWxzLmZpbmRFbGVtZW50KG5vZGUsIENPTlRFTlRfQ0xBU1MpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzKTtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcyk7XG4gICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgdGhpcyk7XG4gICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzKTtcbiAgICAgICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzKTtcbiAgICAgICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcyk7XG4gICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMpO1xuICAgICAgICBjb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMpO1xuICAgICAgICBjb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xtLWRyYWdlbnRlcicsIHRoaXMpO1xuICAgICAgICBjb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xtLWRyYWdsZWF2ZScsIHRoaXMpO1xuICAgICAgICBjb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xtLWRyYWdvdmVyJywgdGhpcyk7XG4gICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignbG0tZHJvcCcsIHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGEgYCdiZWZvcmUtZGV0YWNoJ2AgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBvbkJlZm9yZURldGFjaChtc2cpIHtcbiAgICAgICAgc3VwZXIub25CZWZvcmVEZXRhY2gobXNnKTtcbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgY29uc3QgY29udGVudCA9IERPTVV0aWxzLmZpbmRFbGVtZW50KG5vZGUsIENPTlRFTlRfQ0xBU1MpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzKTtcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpO1xuICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgdGhpcyk7XG4gICAgICAgIGNvbnRlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcyk7XG4gICAgICAgIGNvbnRlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzKTtcbiAgICAgICAgY29udGVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMpO1xuICAgICAgICBjb250ZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMpO1xuICAgICAgICBjb250ZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzKTtcbiAgICAgICAgY29udGVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcyk7XG4gICAgICAgIGNvbnRlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG0tZHJhZ2VudGVyJywgdGhpcyk7XG4gICAgICAgIGNvbnRlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG0tZHJhZ2xlYXZlJywgdGhpcyk7XG4gICAgICAgIGNvbnRlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG0tZHJhZ292ZXInLCB0aGlzKTtcbiAgICAgICAgY29udGVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdsbS1kcm9wJywgdGhpcyk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMsIHRydWUpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcywgdHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgbWVzc2FnZSBoYW5kbGVyIGludm9rZWQgb24gYW4gYCdhZnRlci1zaG93J2AgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBvbkFmdGVyU2hvdyhtc2cpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzRGlydHkpIHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgc29ydGVkIGl0ZW1zLlxuICAgICAgICAgICAgdGhpcy5zb3J0KHRoaXMuc29ydFN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBoYW5kbGVyIGludm9rZWQgb24gYW4gYCd1cGRhdGUtcmVxdWVzdCdgIG1lc3NhZ2UuXG4gICAgICovXG4gICAgb25VcGRhdGVSZXF1ZXN0KG1zZykge1xuICAgICAgICB0aGlzLl9pc0RpcnR5ID0gZmFsc2U7XG4gICAgICAgIC8vIEZldGNoIGNvbW1vbiB2YXJpYWJsZXMuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5fc29ydGVkSXRlbXM7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gdGhpcy5faXRlbXM7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBET01VdGlscy5maW5kRWxlbWVudCh0aGlzLm5vZGUsIENPTlRFTlRfQ0xBU1MpO1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuX3JlbmRlcmVyO1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKE1VTFRJX1NFTEVDVEVEX0NMQVNTKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhTRUxFQ1RFRF9DTEFTUyk7XG4gICAgICAgIC8vIFJlbW92ZSBhbnkgZXhjZXNzIGl0ZW0gbm9kZXMuXG4gICAgICAgIHdoaWxlIChub2Rlcy5sZW5ndGggPiBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnRlbnQucmVtb3ZlQ2hpbGQobm9kZXMucG9wKCkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCBhbnkgbWlzc2luZyBpdGVtIG5vZGVzLlxuICAgICAgICB3aGlsZSAobm9kZXMubGVuZ3RoIDwgaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gcmVuZGVyZXIuY3JlYXRlSXRlbU5vZGUodGhpcy5faGlkZGVuQ29sdW1ucyk7XG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoSVRFTV9DTEFTUyk7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBSZW1vdmUgZXh0cmEgY2xhc3NlcyBmcm9tIHRoZSBub2Rlcy5cbiAgICAgICAgbm9kZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShTRUxFQ1RFRF9DTEFTUyk7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoUlVOTklOR19DTEFTUyk7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoQ1VUX0NMQVNTKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEFkZCBleHRyYSBjbGFzc2VzIHRvIGl0ZW0gbm9kZXMgYmFzZWQgb24gd2lkZ2V0IHN0YXRlLlxuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgICAgICAgICBjb25zdCBmdCA9IHRoaXMuX21hbmFnZXIucmVnaXN0cnkuZ2V0RmlsZVR5cGVGb3JNb2RlbChpdGVtKTtcbiAgICAgICAgICAgIHJlbmRlcmVyLnVwZGF0ZUl0ZW1Ob2RlKG5vZGUsIGl0ZW0sIGZ0LCB0aGlzLnRyYW5zbGF0b3IsIHRoaXMuX2hpZGRlbkNvbHVtbnMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uW2l0ZW0ucGF0aF0pIHtcbiAgICAgICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoU0VMRUNURURfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc0N1dCAmJiB0aGlzLl9tb2RlbC5wYXRoID09PSB0aGlzLl9wcmV2UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoQ1VUX0NMQVNTKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhZGQgbWV0YWRhdGEgdG8gdGhlIG5vZGVcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLWlzZGlyJywgaXRlbS50eXBlID09PSAnZGlyZWN0b3J5JyA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gSGFuZGxlIHRoZSBzZWxlY3RvcnMgb24gdGhlIHdpZGdldCBub2RlLlxuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0aW9uKS5sZW5ndGg7XG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhTRUxFQ1RFRF9DTEFTUyk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQgPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzcyhNVUxUSV9TRUxFQ1RFRF9DTEFTUyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGZpbGUgc2Vzc2lvbiBzdGF0dXNlcy5cbiAgICAgICAgY29uc3QgcGF0aHMgPSBpdGVtcy5tYXAoaXRlbSA9PiBpdGVtLnBhdGgpO1xuICAgICAgICBlYWNoKHRoaXMuX21vZGVsLnNlc3Npb25zKCksIHNlc3Npb24gPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBBcnJheUV4dC5maXJzdEluZGV4T2YocGF0aHMsIHNlc3Npb24ucGF0aCk7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZXNbaW5kZXhdO1xuICAgICAgICAgICAgLy8gTm9kZSBtYXkgaGF2ZSBiZWVuIGZpbHRlcmVkIG91dC5cbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSAoX2EgPSBzZXNzaW9uLmtlcm5lbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWU7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BlY3MgPSB0aGlzLl9tb2RlbC5zcGVjcztcbiAgICAgICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoUlVOTklOR19DTEFTUyk7XG4gICAgICAgICAgICAgICAgaWYgKHNwZWNzICYmIG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BlYyA9IHNwZWNzLmtlcm5lbHNwZWNzW25hbWVdO1xuICAgICAgICAgICAgICAgICAgICBuYW1lID0gc3BlYyA/IHNwZWMuZGlzcGxheV9uYW1lIDogJ3Vua25vd24nOyAvLyBGSVhNRS1UUkFOUzogSXMgdGhpcyBsb2NhbGl6YWJsZT9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZS50aXRsZSA9IHRoaXMuX3RyYW5zLl9fKCclMVxcbktlcm5lbDogJTInLCBub2RlLnRpdGxlLCBuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3ByZXZQYXRoID0gdGhpcy5fbW9kZWwucGF0aDtcbiAgICB9XG4gICAgb25SZXNpemUobXNnKSB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGggfSA9IG1zZy53aWR0aCA9PT0gLTEgPyB0aGlzLm5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiBtc2c7XG4gICAgICAgIHRoaXMudG9nZ2xlQ2xhc3MoJ2pwLURpckxpc3RpbmctbmFycm93Jywgd2lkdGggPCAyNTApO1xuICAgIH1cbiAgICBzZXRDb2x1bW5WaXNpYmlsaXR5KG5hbWUsIHZpc2libGUpIHtcbiAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZGRlbkNvbHVtbnMuZGVsZXRlKG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5faGlkZGVuQ29sdW1ucy5hZGQobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oZWFkZXJOb2RlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5wb3B1bGF0ZUhlYWRlck5vZGUodGhpcy5oZWFkZXJOb2RlLCB0aGlzLnRyYW5zbGF0b3IsIHRoaXMuX2hpZGRlbkNvbHVtbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnY2xpY2snYCBldmVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBfZXZ0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBjb25zdCBoZWFkZXIgPSB0aGlzLmhlYWRlck5vZGU7XG4gICAgICAgIGlmIChoZWFkZXIuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnJlbmRlcmVyLmhhbmRsZUhlYWRlckNsaWNrKGhlYWRlciwgZXZlbnQpO1xuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0KHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnc2Nyb2xsJ2AgZXZlbnQgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgX2V2dFNjcm9sbChldmVudCkge1xuICAgICAgICB0aGlzLmhlYWRlck5vZGUuc2Nyb2xsTGVmdCA9IHRoaXMuY29udGVudE5vZGUuc2Nyb2xsTGVmdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBgJ21vdXNlZG93bidgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnRNb3VzZWRvd24oZXZlbnQpIHtcbiAgICAgICAgLy8gQmFpbCBpZiBjbGlja2luZyB3aXRoaW4gdGhlIGVkaXQgbm9kZVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzLl9lZGl0Tm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEJsdXIgdGhlIGVkaXQgbm9kZSBpZiBuZWNlc3NhcnkuXG4gICAgICAgIGlmICh0aGlzLl9lZGl0Tm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZWRpdE5vZGUgIT09IGV2ZW50LnRhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXROb2RlLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdE5vZGUuYmx1cigpO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zZWxlY3RUaW1lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGluZGV4ID0gUHJpdmF0ZS5oaXRUZXN0Tm9kZXModGhpcy5faXRlbXMsIGV2ZW50KTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGFuZGxlRmlsZVNlbGVjdChldmVudCk7XG4gICAgICAgIGlmIChldmVudC5idXR0b24gIT09IDApIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zZWxlY3RUaW1lcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hlY2sgZm9yIGNsZWFyaW5nIGEgY29udGV4dCBtZW51LlxuICAgICAgICBjb25zdCBuZXdDb250ZXh0ID0gKElTX01BQyAmJiBldmVudC5jdHJsS2V5KSB8fCBldmVudC5idXR0b24gPT09IDI7XG4gICAgICAgIGlmIChuZXdDb250ZXh0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gTGVmdCBtb3VzZSBwcmVzcyBmb3IgZHJhZyBzdGFydC5cbiAgICAgICAgaWYgKGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fZHJhZ0RhdGEgPSB7XG4gICAgICAgICAgICAgICAgcHJlc3NYOiBldmVudC5jbGllbnRYLFxuICAgICAgICAgICAgICAgIHByZXNzWTogZXZlbnQuY2xpZW50WSxcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXhcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnbW91c2V1cCdgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnRNb3VzZXVwKGV2ZW50KSB7XG4gICAgICAgIC8vIEhhbmRsZSBhbnkgc29mdCBzZWxlY3Rpb24gZnJvbSB0aGUgcHJldmlvdXMgbW91c2UgZG93bi5cbiAgICAgICAgaWYgKHRoaXMuX3NvZnRTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IGFsdGVyZWQgPSBldmVudC5tZXRhS2V5IHx8IGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmN0cmxLZXk7XG4gICAgICAgICAgICAvLyBTZWUgaWYgd2UgbmVlZCB0byBjbGVhciB0aGUgb3RoZXIgc2VsZWN0aW9uLlxuICAgICAgICAgICAgaWYgKCFhbHRlcmVkICYmIGV2ZW50LmJ1dHRvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3RlZEl0ZW1zKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25bdGhpcy5fc29mdFNlbGVjdGlvbl0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zb2Z0U2VsZWN0aW9uID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmUtZm9jdXMgdGhlIHNlbGVjdGVkIGZpbGUuIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2Ugbm9kZXMgY29ycmVzcG9uZGluZ1xuICAgICAgICAvLyB0byBmaWxlcyBzZWxlY3RlZCBpbiBtb3VzZWRvd24gaGFuZGxlciB3aWxsIG5vdCByZXRhaW4gdGhlIGZvY3VzXG4gICAgICAgIC8vIGFzIG1vdXNlZG93biBldmVudCBpcyBhbHdheXMgZm9sbG93ZWQgYnkgYSBibHVyL2ZvY3VzIGV2ZW50LlxuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c1NlbGVjdGVkRmlsZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZHJhZyBsaXN0ZW5lcnMgaWYgbmVjZXNzYXJ5LlxuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwIHx8ICF0aGlzLl9kcmFnKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBgJ21vdXNlbW92ZSdgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIF9ldnRNb3VzZW1vdmUoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIEJhaWwgaWYgd2UgYXJlIHRoZSBvbmUgZHJhZ2dpbmcuXG4gICAgICAgIGlmICh0aGlzLl9kcmFnIHx8ICF0aGlzLl9kcmFnRGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIENoZWNrIGZvciBhIGRyYWcgaW5pdGlhbGl6YXRpb24uXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kcmFnRGF0YTtcbiAgICAgICAgY29uc3QgZHggPSBNYXRoLmFicyhldmVudC5jbGllbnRYIC0gZGF0YS5wcmVzc1gpO1xuICAgICAgICBjb25zdCBkeSA9IE1hdGguYWJzKGV2ZW50LmNsaWVudFkgLSBkYXRhLnByZXNzWSk7XG4gICAgICAgIGlmIChkeCA8IERSQUdfVEhSRVNIT0xEICYmIGR5IDwgRFJBR19USFJFU0hPTEQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdGFydERyYWcoZGF0YS5pbmRleCwgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgb3BlbmluZyBvZiBhbiBpdGVtLlxuICAgICAqL1xuICAgIGhhbmRsZU9wZW4oaXRlbSkge1xuICAgICAgICB0aGlzLl9vbkl0ZW1PcGVuZWQuZW1pdChpdGVtKTtcbiAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ2RpcmVjdG9yeScpIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsUGF0aCA9IHRoaXMuX21hbmFnZXIuc2VydmljZXMuY29udGVudHMubG9jYWxQYXRoKGl0ZW0ucGF0aCk7XG4gICAgICAgICAgICB0aGlzLl9tb2RlbFxuICAgICAgICAgICAgICAgIC5jZChgLyR7bG9jYWxQYXRofWApXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHNob3dFcnJvck1lc3NhZ2UodGhpcy5fdHJhbnMuX3AoJ3Nob3dFcnJvck1lc3NhZ2UnLCAnT3BlbiBkaXJlY3RvcnknKSwgZXJyb3IpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBpdGVtLnBhdGg7XG4gICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLm9wZW5PclJldmVhbChwYXRoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAna2V5ZG93bidgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGV2dEtleWRvd24oZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDEzOiB7XG4gICAgICAgICAgICAgICAgLy8gRW50ZXJcbiAgICAgICAgICAgICAgICAvLyBEbyBub3RoaW5nIGlmIGFueSBtb2RpZmllciBrZXlzIGFyZSBwcmVzc2VkLlxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gc2VsZWN0ZWRbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLl9zb3J0ZWRJdGVtcztcbiAgICAgICAgICAgICAgICBjb25zdCBpID0gQXJyYXlFeHQuZmluZEZpcnN0SW5kZXgoaXRlbXMsIHZhbHVlID0+IHZhbHVlLnBhdGggPT09IHBhdGgpO1xuICAgICAgICAgICAgICAgIGlmIChpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9zb3J0ZWRJdGVtc1tpXTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU9wZW4oaXRlbSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIDM4OiAvLyBVcCBhcnJvd1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UHJldmlvdXMoZXZlbnQuc2hpZnRLZXkpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwOiAvLyBEb3duIGFycm93XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3ROZXh0KGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBEZXRlY3RzIHByaW50YWJsZSBjaGFyYWN0ZXJzIHR5cGVkIGJ5IHRoZSB1c2VyLlxuICAgICAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgLmtleSwgYnV0IGl0IGRpc2NoYXJnZXMgdXMgZnJvbSByZWNvbnN0cnVjdGluZ1xuICAgICAgICAvLyBjaGFyYWN0ZXJzIGZyb20ga2V5IGNvZGVzLlxuICAgICAgICBpZiAoIXRoaXMuX2luUmVuYW1lICYmIGV2ZW50LmtleSAhPT0gdW5kZWZpbmVkICYmIGV2ZW50LmtleS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc2VhcmNoUHJlZml4ICs9IGV2ZW50LmtleTtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zZWFyY2hQcmVmaXhUaW1lcik7XG4gICAgICAgICAgICB0aGlzLl9zZWFyY2hQcmVmaXhUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWFyY2hQcmVmaXggPSAnJztcbiAgICAgICAgICAgIH0sIFBSRUZJWF9BUFBFTkRfRFVSQVRJT04pO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RCeVByZWZpeCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSB0aGUgYCdkYmxjbGljaydgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGV2dERibENsaWNrKGV2ZW50KSB7XG4gICAgICAgIC8vIERvIG5vdGhpbmcgaWYgaXQncyBub3QgYSBsZWZ0IG1vdXNlIHByZXNzLlxuICAgICAgICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gRG8gbm90aGluZyBpZiBhbnkgbW9kaWZpZXIga2V5cyBhcmUgcHJlc3NlZC5cbiAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuYWx0S2V5IHx8IGV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTdG9wIHRoZSBldmVudCBwcm9wYWdhdGlvbi5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zZWxlY3RUaW1lcik7XG4gICAgICAgIHRoaXMuX2VkaXROb2RlLmJsdXIoKTtcbiAgICAgICAgLy8gRmluZCBhIHZhbGlkIGRvdWJsZSBjbGljayB0YXJnZXQuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgY29uc3QgaSA9IEFycmF5RXh0LmZpbmRGaXJzdEluZGV4KHRoaXMuX2l0ZW1zLCBub2RlID0+IG5vZGUuY29udGFpbnModGFyZ2V0KSk7XG4gICAgICAgIGlmIChpID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9zb3J0ZWRJdGVtc1tpXTtcbiAgICAgICAgdGhpcy5oYW5kbGVPcGVuKGl0ZW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGBkcm9wYCBldmVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBldnROYXRpdmVEcm9wKGV2ZW50KSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jO1xuICAgICAgICBjb25zdCBmaWxlcyA9IChfYSA9IGV2ZW50LmRhdGFUcmFuc2ZlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZpbGVzO1xuICAgICAgICBpZiAoIWZpbGVzIHx8IGZpbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IChfYiA9IGV2ZW50LmRhdGFUcmFuc2ZlcikgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLml0ZW1zLmxlbmd0aDtcbiAgICAgICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZW50cnkgPSAoX2MgPSBldmVudC5kYXRhVHJhbnNmZXIpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5pdGVtc1tpXS53ZWJraXRHZXRBc0VudHJ5KCk7XG4gICAgICAgICAgICBpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY3VycmVudGx5IG5vdCBzdXBwb3J0aW5nIGRyYWcgKyBkcm9wIGZvciBmb2xkZXJzJyk7XG4gICAgICAgICAgICAgICAgdm9pZCBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRoaXMuX3RyYW5zLl9fKCdFcnJvciBVcGxvYWRpbmcgRm9sZGVyJyksXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHRoaXMuX3RyYW5zLl9fKCdEcmFnIGFuZCBEcm9wIGlzIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkIGZvciBmb2xkZXJzJyksXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFtEaWFsb2cuY2FuY2VsQnV0dG9uKHsgbGFiZWw6IHRoaXMuX3RyYW5zLl9fKCdDbG9zZScpIH0pXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZvaWQgdGhpcy5fbW9kZWwudXBsb2FkKGZpbGVzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnbG0tZHJhZ2VudGVyJ2AgZXZlbnQgZm9yIHRoZSB3aWRnZXQuXG4gICAgICovXG4gICAgZXZ0RHJhZ0VudGVyKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5taW1lRGF0YS5oYXNEYXRhKENPTlRFTlRTX01JTUUpKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IFByaXZhdGUuaGl0VGVzdE5vZGVzKHRoaXMuX2l0ZW1zLCBldmVudCk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX3NvcnRlZEl0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgIT09ICdkaXJlY3RvcnknIHx8IHRoaXMuc2VsZWN0aW9uW2l0ZW0ucGF0aF0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChEUk9QX1RBUkdFVF9DTEFTUyk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBgJ2xtLWRyYWdsZWF2ZSdgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGV2dERyYWdMZWF2ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldCA9IERPTVV0aWxzLmZpbmRFbGVtZW50KHRoaXMubm9kZSwgRFJPUF9UQVJHRVRfQ0xBU1MpO1xuICAgICAgICBpZiAoZHJvcFRhcmdldCkge1xuICAgICAgICAgICAgZHJvcFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKERST1BfVEFSR0VUX0NMQVNTKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnbG0tZHJhZ292ZXInYCBldmVudCBmb3IgdGhlIHdpZGdldC5cbiAgICAgKi9cbiAgICBldnREcmFnT3ZlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZXZlbnQuZHJvcEFjdGlvbiA9IGV2ZW50LnByb3Bvc2VkQWN0aW9uO1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0ID0gRE9NVXRpbHMuZmluZEVsZW1lbnQodGhpcy5ub2RlLCBEUk9QX1RBUkdFVF9DTEFTUyk7XG4gICAgICAgIGlmIChkcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICBkcm9wVGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoRFJPUF9UQVJHRVRfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gUHJpdmF0ZS5oaXRUZXN0Tm9kZXModGhpcy5faXRlbXMsIGV2ZW50KTtcbiAgICAgICAgdGhpcy5faXRlbXNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoRFJPUF9UQVJHRVRfQ0xBU1MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgdGhlIGAnbG0tZHJvcCdgIGV2ZW50IGZvciB0aGUgd2lkZ2V0LlxuICAgICAqL1xuICAgIGV2dERyb3AoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zZWxlY3RUaW1lcik7XG4gICAgICAgIGlmIChldmVudC5wcm9wb3NlZEFjdGlvbiA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBldmVudC5kcm9wQWN0aW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXZlbnQubWltZURhdGEuaGFzRGF0YShDT05URU5UU19NSU1FKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHdoaWxlICh0YXJnZXQgJiYgdGFyZ2V0LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKERST1BfVEFSR0VUX0NMQVNTKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKERST1BfVEFSR0VUX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIC8vIEdldCB0aGUgcGF0aCBiYXNlZCBvbiB0aGUgdGFyZ2V0IG5vZGUuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlFeHQuZmlyc3RJbmRleE9mKHRoaXMuX2l0ZW1zLCB0YXJnZXQpO1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuX3NvcnRlZEl0ZW1zO1xuICAgICAgICBsZXQgYmFzZVBhdGggPSB0aGlzLl9tb2RlbC5wYXRoO1xuICAgICAgICBpZiAoaXRlbXNbaW5kZXhdLnR5cGUgPT09ICdkaXJlY3RvcnknKSB7XG4gICAgICAgICAgICBiYXNlUGF0aCA9IFBhdGhFeHQuam9pbihiYXNlUGF0aCwgaXRlbXNbaW5kZXhdLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLl9tYW5hZ2VyO1xuICAgICAgICAvLyBIYW5kbGUgdGhlIGl0ZW1zLlxuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBjb25zdCBwYXRocyA9IGV2ZW50Lm1pbWVEYXRhLmdldERhdGEoQ09OVEVOVFNfTUlNRSk7XG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LnByb3Bvc2VkQWN0aW9uID09PSAnbW92ZScpIHtcbiAgICAgICAgICAgIGV2ZW50LmRyb3BBY3Rpb24gPSAnY29weSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBldmVudC5kcm9wQWN0aW9uID0gZXZlbnQucHJvcG9zZWRBY3Rpb247XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBwYXRoIG9mIHBhdGhzKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFBhdGggPSBtYW5hZ2VyLnNlcnZpY2VzLmNvbnRlbnRzLmxvY2FsUGF0aChwYXRoKTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBQYXRoRXh0LmJhc2VuYW1lKGxvY2FsUGF0aCk7XG4gICAgICAgICAgICBjb25zdCBuZXdQYXRoID0gUGF0aEV4dC5qb2luKGJhc2VQYXRoLCBuYW1lKTtcbiAgICAgICAgICAgIC8vIFNraXAgZmlsZXMgdGhhdCBhcmUgbm90IG1vdmluZy5cbiAgICAgICAgICAgIGlmIChuZXdQYXRoID09PSBwYXRoKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXZlbnQuZHJvcEFjdGlvbiA9PT0gJ2NvcHknKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChtYW5hZ2VyLmNvcHkocGF0aCwgYmFzZVBhdGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocmVuYW1lRmlsZShtYW5hZ2VyLCBwYXRoLCBuZXdQYXRoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHZvaWQgc2hvd0Vycm9yTWVzc2FnZSh0aGlzLl90cmFucy5fcCgnc2hvd0Vycm9yTWVzc2FnZScsICdFcnJvciB3aGlsZSBjb3B5aW5nL21vdmluZyBmaWxlcycpLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydCBhIGRyYWcgZXZlbnQuXG4gICAgICovXG4gICAgX3N0YXJ0RHJhZyhpbmRleCwgY2xpZW50WCwgY2xpZW50WSkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRQYXRocyA9IE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5faXRlbXNbaW5kZXhdO1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuX3NvcnRlZEl0ZW1zO1xuICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtcztcbiAgICAgICAgbGV0IGl0ZW07XG4gICAgICAgIC8vIElmIHRoZSBzb3VyY2Ugbm9kZSBpcyBub3Qgc2VsZWN0ZWQsIHVzZSBqdXN0IHRoYXQgbm9kZS5cbiAgICAgICAgaWYgKCFzb3VyY2UuY2xhc3NMaXN0LmNvbnRhaW5zKFNFTEVDVEVEX0NMQVNTKSkge1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW1zW2luZGV4XTtcbiAgICAgICAgICAgIHNlbGVjdGVkUGF0aHMgPSBbaXRlbS5wYXRoXTtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSBbaXRlbV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gc2VsZWN0ZWRQYXRoc1swXTtcbiAgICAgICAgICAgIGl0ZW0gPSBmaW5kKGl0ZW1zLCB2YWx1ZSA9PiB2YWx1ZS5wYXRoID09PSBwYXRoKTtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMgPSB0b0FycmF5KHRoaXMuc2VsZWN0ZWRJdGVtcygpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBDcmVhdGUgdGhlIGRyYWcgaW1hZ2UuXG4gICAgICAgIGNvbnN0IGZ0ID0gdGhpcy5fbWFuYWdlci5yZWdpc3RyeS5nZXRGaWxlVHlwZUZvck1vZGVsKGl0ZW0pO1xuICAgICAgICBjb25zdCBkcmFnSW1hZ2UgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZURyYWdJbWFnZShzb3VyY2UsIHNlbGVjdGVkUGF0aHMubGVuZ3RoLCB0aGlzLl90cmFucywgZnQpO1xuICAgICAgICAvLyBTZXQgdXAgdGhlIGRyYWcgZXZlbnQuXG4gICAgICAgIHRoaXMuX2RyYWcgPSBuZXcgRHJhZyh7XG4gICAgICAgICAgICBkcmFnSW1hZ2UsXG4gICAgICAgICAgICBtaW1lRGF0YTogbmV3IE1pbWVEYXRhKCksXG4gICAgICAgICAgICBzdXBwb3J0ZWRBY3Rpb25zOiAnbW92ZScsXG4gICAgICAgICAgICBwcm9wb3NlZEFjdGlvbjogJ21vdmUnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9kcmFnLm1pbWVEYXRhLnNldERhdGEoQ09OVEVOVFNfTUlNRSwgc2VsZWN0ZWRQYXRocyk7XG4gICAgICAgIC8vIEFkZCB0aHVua3MgZm9yIGdldHRpbmcgbWltZSBkYXRhIGNvbnRlbnQuXG4gICAgICAgIC8vIFdlIHRodW5rIHRoZSBjb250ZW50IHNvIHdlIGRvbid0IHRyeSB0byBtYWtlIGEgbmV0d29yayBjYWxsXG4gICAgICAgIC8vIHdoZW4gaXQncyBub3QgbmVlZGVkLiBFLmcuIGp1c3QgbW92aW5nIGZpbGVzIGFyb3VuZFxuICAgICAgICAvLyBpbiBhIGZpbGVicm93c2VyXG4gICAgICAgIGNvbnN0IHNlcnZpY2VzID0gdGhpcy5tb2RlbC5tYW5hZ2VyLnNlcnZpY2VzO1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygc2VsZWN0ZWRJdGVtcykge1xuICAgICAgICAgICAgdGhpcy5fZHJhZy5taW1lRGF0YS5zZXREYXRhKENPTlRFTlRTX01JTUVfUklDSCwge1xuICAgICAgICAgICAgICAgIG1vZGVsOiBpdGVtLFxuICAgICAgICAgICAgICAgIHdpdGhDb250ZW50OiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBzZXJ2aWNlcy5jb250ZW50cy5nZXQoaXRlbS5wYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLnR5cGUgIT09ICdkaXJlY3RvcnknKSB7XG4gICAgICAgICAgICBjb25zdCBvdGhlclBhdGhzID0gc2VsZWN0ZWRQYXRocy5zbGljZSgxKS5yZXZlcnNlKCk7XG4gICAgICAgICAgICB0aGlzLl9kcmFnLm1pbWVEYXRhLnNldERhdGEoRkFDVE9SWV9NSU1FLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IGl0ZW0ucGF0aDtcbiAgICAgICAgICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5fbWFuYWdlci5maW5kV2lkZ2V0KHBhdGgpO1xuICAgICAgICAgICAgICAgIGlmICghd2lkZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZGdldCA9IHRoaXMuX21hbmFnZXIub3BlbihpdGVtLnBhdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob3RoZXJQYXRocy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RXaWRnZXRQbGFjZWQgPSBuZXcgUHJvbWlzZURlbGVnYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZvaWQgZmlyc3RXaWRnZXRQbGFjZWQucHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcmV2V2lkZ2V0ID0gd2lkZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJQYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogcHJldldpZGdldCA9PT0gbnVsbCB8fCBwcmV2V2lkZ2V0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcmV2V2lkZ2V0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiAndGFiLWFmdGVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldldpZGdldCA9IHRoaXMuX21hbmFnZXIub3Blbk9yUmV2ZWFsKHBhdGgsIHZvaWQgMCwgdm9pZCAwLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYW5hZ2VyLm9wZW5PclJldmVhbChpdGVtLnBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBmaXJzdFdpZGdldFBsYWNlZC5yZXNvbHZlKHZvaWQgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB3aWRnZXQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTdGFydCB0aGUgZHJhZyBhbmQgcmVtb3ZlIHRoZSBtb3VzZW1vdmUgYW5kIG1vdXNldXAgbGlzdGVuZXJzLlxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMsIHRydWUpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2VsZWN0VGltZXIpO1xuICAgICAgICB2b2lkIHRoaXMuX2RyYWcuc3RhcnQoY2xpZW50WCwgY2xpZW50WSkudGhlbihhY3Rpb24gPT4ge1xuICAgICAgICAgICAgdGhpcy5fZHJhZyA9IG51bGw7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fc2VsZWN0VGltZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHNlbGVjdGlvbiBvbiBhIGZpbGUgbm9kZS5cbiAgICAgKi9cbiAgICBoYW5kbGVGaWxlU2VsZWN0KGV2ZW50KSB7XG4gICAgICAgIC8vIEZldGNoIGNvbW1vbiB2YXJpYWJsZXMuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5fc29ydGVkSXRlbXM7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gUHJpdmF0ZS5oaXRUZXN0Tm9kZXModGhpcy5faXRlbXMsIGV2ZW50KTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3NlbGVjdFRpbWVyKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIENsZWFyIGFueSBleGlzdGluZyBzb2Z0IHNlbGVjdGlvbi5cbiAgICAgICAgdGhpcy5fc29mdFNlbGVjdGlvbiA9ICcnO1xuICAgICAgICBjb25zdCBwYXRoID0gaXRlbXNbaW5kZXhdLnBhdGg7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkID0gT2JqZWN0LmtleXModGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAvLyBIYW5kbGUgdG9nZ2xpbmcuXG4gICAgICAgIGlmICgoSVNfTUFDICYmIGV2ZW50Lm1ldGFLZXkpIHx8ICghSVNfTUFDICYmIGV2ZW50LmN0cmxLZXkpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25bcGF0aF0pIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zZWxlY3Rpb25bcGF0aF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbltwYXRoXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBIYW5kbGUgbXVsdGlwbGUgc2VsZWN0LlxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVNdWx0aVNlbGVjdChzZWxlY3RlZCwgaW5kZXgpO1xuICAgICAgICAgICAgLy8gSGFuZGxlIGEgJ3NvZnQnIHNlbGVjdGlvblxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBhdGggaW4gdGhpcy5zZWxlY3Rpb24gJiYgc2VsZWN0ZWQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5fc29mdFNlbGVjdGlvbiA9IHBhdGg7XG4gICAgICAgICAgICAvLyBEZWZhdWx0IHRvIHNlbGVjdGluZyB0aGUgb25seSB0aGUgaXRlbS5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNlbGVjdCBvbmx5IHRoZSBnaXZlbiBpdGVtLlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdEl0ZW0oaW5kZXgsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAoUmUtKWZvY3VzIG9uIHRoZSBzZWxlY3RlZCBmaWxlLlxuICAgICAqXG4gICAgICogSWYgaW5kZXggaXMgbm90IGdpdmVuLCBpdCB3aWxsIGJlIGluZmVycmVkIGZyb20gdGhlIGN1cnJlbnQgc2VsZWN0aW9uO1xuICAgICAqIHByb3ZpZGluZyBpbmRleCBzYXZlcyBvbiB0aGUgaXRlcmF0aW9uIHRpbWUuXG4gICAgICovXG4gICAgX2ZvY3VzU2VsZWN0ZWRGaWxlKGluZGV4KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgLy8gTXVsdGlzZWxlY3QgLSBkbyBub3QgZm9jdXMgb24gYW55IHNpbmdsZSBmaWxlXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXggPSBBcnJheUV4dC5maW5kRmlyc3RJbmRleCh0aGlzLl9zb3J0ZWRJdGVtcywgdmFsdWUgPT4gdmFsdWUucGF0aCA9PT0gc2VsZWN0ZWRbMF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBGb2N1cyBvbiB0ZXh0IHRvIG1ha2Ugc2hvcnRjdXRzIHdvcmtzXG4gICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLl9pdGVtc1tpbmRleF07XG4gICAgICAgIGNvbnN0IHRleHQgPSBET01VdGlscy5maW5kRWxlbWVudChub2RlLCBJVEVNX1RFWFRfQ0xBU1MpO1xuICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgdGV4dC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIG11bHRpcGxlIHNlbGVjdCBvbiBhIGZpbGUgaXRlbSBub2RlLlxuICAgICAqL1xuICAgIF9oYW5kbGVNdWx0aVNlbGVjdChzZWxlY3RlZCwgaW5kZXgpIHtcbiAgICAgICAgLy8gRmluZCB0aGUgXCJuZWFyZXN0IHNlbGVjdGVkXCIuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5fc29ydGVkSXRlbXM7XG4gICAgICAgIGxldCBuZWFyZXN0SW5kZXggPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gaXRlbXNbaV0ucGF0aDtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZC5pbmRleE9mKHBhdGgpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIGlmIChuZWFyZXN0SW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIG5lYXJlc3RJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoaW5kZXggLSBpKSA8IE1hdGguYWJzKG5lYXJlc3RJbmRleCAtIGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZWFyZXN0SW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIERlZmF1bHQgdG8gdGhlIGZpcnN0IGVsZW1lbnQgKGFuZCBmaWxsIGRvd24pLlxuICAgICAgICBpZiAobmVhcmVzdEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgbmVhcmVzdEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZWxlY3QgdGhlIHJvd3MgYmV0d2VlbiB0aGUgY3VycmVudCBhbmQgdGhlIG5lYXJlc3Qgc2VsZWN0ZWQuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5faXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgobmVhcmVzdEluZGV4ID49IGkgJiYgaW5kZXggPD0gaSkgfHxcbiAgICAgICAgICAgICAgICAobmVhcmVzdEluZGV4IDw9IGkgJiYgaW5kZXggPj0gaSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbltpdGVtc1tpXS5wYXRoXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29weSB0aGUgc2VsZWN0ZWQgaXRlbXMsIGFuZCBvcHRpb25hbGx5IGN1dCBhcyB3ZWxsLlxuICAgICAqL1xuICAgIF9jb3B5KCkge1xuICAgICAgICB0aGlzLl9jbGlwYm9hcmQubGVuZ3RoID0gMDtcbiAgICAgICAgZWFjaCh0aGlzLnNlbGVjdGVkSXRlbXMoKSwgaXRlbSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9jbGlwYm9hcmQucHVzaChpdGVtLnBhdGgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBmaWxlcyB3aXRoIHRoZSBnaXZlbiBwYXRocy5cbiAgICAgKi9cbiAgICBhc3luYyBfZGVsZXRlKHBhdGhzKSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKHBhdGhzLm1hcChwYXRoID0+IHRoaXMuX21vZGVsLm1hbmFnZXIuZGVsZXRlRmlsZShwYXRoKS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgdm9pZCBzaG93RXJyb3JNZXNzYWdlKHRoaXMuX3RyYW5zLl9wKCdzaG93RXJyb3JNZXNzYWdlJywgJ0RlbGV0ZSBGYWlsZWQnKSwgZXJyKTtcbiAgICAgICAgfSkpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxsb3cgdGhlIHVzZXIgdG8gcmVuYW1lIGl0ZW0gb24gYSBnaXZlbiByb3cuXG4gICAgICovXG4gICAgX2RvUmVuYW1lKCkge1xuICAgICAgICB0aGlzLl9pblJlbmFtZSA9IHRydWU7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5fc29ydGVkSXRlbXM7XG4gICAgICAgIGNvbnN0IHBhdGggPSBPYmplY3Qua2V5cyh0aGlzLnNlbGVjdGlvbilbMF07XG4gICAgICAgIGNvbnN0IGluZGV4ID0gQXJyYXlFeHQuZmluZEZpcnN0SW5kZXgoaXRlbXMsIHZhbHVlID0+IHZhbHVlLnBhdGggPT09IHBhdGgpO1xuICAgICAgICBjb25zdCByb3cgPSB0aGlzLl9pdGVtc1tpbmRleF07XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1tpbmRleF07XG4gICAgICAgIGNvbnN0IG5hbWVOb2RlID0gdGhpcy5yZW5kZXJlci5nZXROYW1lTm9kZShyb3cpO1xuICAgICAgICBjb25zdCBvcmlnaW5hbCA9IGl0ZW0ubmFtZTtcbiAgICAgICAgdGhpcy5fZWRpdE5vZGUudmFsdWUgPSBvcmlnaW5hbDtcbiAgICAgICAgdGhpcy5fc2VsZWN0SXRlbShpbmRleCwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gUHJpdmF0ZS5kb1JlbmFtZShuYW1lTm9kZSwgdGhpcy5fZWRpdE5vZGUsIG9yaWdpbmFsKS50aGVuKG5ld05hbWUgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmZvY3VzKCk7XG4gICAgICAgICAgICBpZiAoIW5ld05hbWUgfHwgbmV3TmFtZSA9PT0gb3JpZ2luYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pblJlbmFtZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNWYWxpZEZpbGVOYW1lKG5ld05hbWUpKSB7XG4gICAgICAgICAgICAgICAgdm9pZCBzaG93RXJyb3JNZXNzYWdlKHRoaXMuX3RyYW5zLl9fKCdSZW5hbWUgRXJyb3InKSwgRXJyb3IodGhpcy5fdHJhbnMuX3AoJ3Nob3dFcnJvck1lc3NhZ2UnLCAnXCIlMVwiIGlzIG5vdCBhIHZhbGlkIG5hbWUgZm9yIGEgZmlsZS4gTmFtZXMgbXVzdCBoYXZlIG5vbnplcm8gbGVuZ3RoLCBhbmQgY2Fubm90IGluY2x1ZGUgXCIvXCIsIFwiXFxcXFwiLCBvciBcIjpcIicsIG5ld05hbWUpKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5SZW5hbWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5SZW5hbWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpbGUgYnJvd3NlciBpcyBkaXNwb3NlZC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG1hbmFnZXIgPSB0aGlzLl9tYW5hZ2VyO1xuICAgICAgICAgICAgY29uc3Qgb2xkUGF0aCA9IFBhdGhFeHQuam9pbih0aGlzLl9tb2RlbC5wYXRoLCBvcmlnaW5hbCk7XG4gICAgICAgICAgICBjb25zdCBuZXdQYXRoID0gUGF0aEV4dC5qb2luKHRoaXMuX21vZGVsLnBhdGgsIG5ld05hbWUpO1xuICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IHJlbmFtZUZpbGUobWFuYWdlciwgb2xkUGF0aCwgbmV3UGF0aCk7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yICE9PSAnRmlsZSBub3QgcmVuYW1lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBzaG93RXJyb3JNZXNzYWdlKHRoaXMuX3RyYW5zLl9wKCdzaG93RXJyb3JNZXNzYWdlJywgJ1JlbmFtZSBFcnJvcicpLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2luUmVuYW1lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pblJlbmFtZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpbGUgYnJvd3NlciBpcyBkaXNwb3NlZC4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2luUmVuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIG5lZWQgdG8gY2F0Y2ggYmVjYXVzZSBgbmV3TmFtZWAgd2lsbCBhbHdheXMgZXhpdC5cbiAgICAgICAgICAgICAgICAgICAgdm9pZCB0aGlzLnNlbGVjdEl0ZW1CeU5hbWUobmV3TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2luUmVuYW1lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld05hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBhIGdpdmVuIGl0ZW0uXG4gICAgICovXG4gICAgX3NlbGVjdEl0ZW0oaW5kZXgsIGtlZXBFeGlzdGluZywgZm9jdXMgPSB0cnVlKSB7XG4gICAgICAgIC8vIFNlbGVjdGVkIHRoZSBnaXZlbiByb3cocylcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLl9zb3J0ZWRJdGVtcztcbiAgICAgICAgaWYgKCFrZWVwRXhpc3RpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3RlZEl0ZW1zKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGF0aCA9IGl0ZW1zW2luZGV4XS5wYXRoO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbltwYXRoXSA9IHRydWU7XG4gICAgICAgIGlmICgha2VlcEV4aXN0aW5nICYmIGZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c1NlbGVjdGVkRmlsZShpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBgcmVmcmVzaGVkYCBzaWduYWwgZnJvbSB0aGUgbW9kZWwuXG4gICAgICovXG4gICAgX29uTW9kZWxSZWZyZXNoZWQoKSB7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgc2VsZWN0aW9uLlxuICAgICAgICBjb25zdCBleGlzdGluZyA9IE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGVkSXRlbXMoKTtcbiAgICAgICAgZWFjaCh0aGlzLl9tb2RlbC5pdGVtcygpLCBpdGVtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBpdGVtLnBhdGg7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmcuaW5kZXhPZihwYXRoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbltwYXRoXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5pc1Zpc2libGUpIHtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgc29ydGVkIGl0ZW1zLlxuICAgICAgICAgICAgdGhpcy5zb3J0KHRoaXMuc29ydFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2lzRGlydHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGBwYXRoQ2hhbmdlZGAgc2lnbmFsIGZyb20gdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIF9vblBhdGhDaGFuZ2VkKCkge1xuICAgICAgICAvLyBSZXNldCB0aGUgc2VsZWN0aW9uLlxuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0ZWRJdGVtcygpO1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHNvcnRlZCBpdGVtcy5cbiAgICAgICAgdGhpcy5zb3J0KHRoaXMuc29ydFN0YXRlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGEgYGZpbGVDaGFuZ2VkYCBzaWduYWwgZnJvbSB0aGUgbW9kZWwuXG4gICAgICovXG4gICAgX29uRmlsZUNoYW5nZWQoc2VuZGVyLCBhcmdzKSB7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gYXJncy5uZXdWYWx1ZTtcbiAgICAgICAgaWYgKCFuZXdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5hbWUgPSBuZXdWYWx1ZS5uYW1lO1xuICAgICAgICBpZiAoYXJncy50eXBlICE9PSAnbmV3JyB8fCAhbmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZvaWQgdGhpcy5zZWxlY3RJdGVtQnlOYW1lKG5hbWUpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIC8qIElnbm9yZSBpZiBmaWxlIGRvZXMgbm90IGV4aXN0LiAqL1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGFuIGBhY3RpdmF0ZVJlcXVlc3RlZGAgc2lnbmFsIGZyb20gdGhlIG1hbmFnZXIuXG4gICAgICovXG4gICAgX29uQWN0aXZhdGVSZXF1ZXN0ZWQoc2VuZGVyLCBhcmdzKSB7XG4gICAgICAgIGNvbnN0IGRpcm5hbWUgPSBQYXRoRXh0LmRpcm5hbWUoYXJncyk7XG4gICAgICAgIGlmIChkaXJuYW1lICE9PSB0aGlzLl9tb2RlbC5wYXRoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmFzZW5hbWUgPSBQYXRoRXh0LmJhc2VuYW1lKGFyZ3MpO1xuICAgICAgICB0aGlzLnNlbGVjdEl0ZW1CeU5hbWUoYmFzZW5hbWUpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIC8qIElnbm9yZSBpZiBmaWxlIGRvZXMgbm90IGV4aXN0LiAqL1xuICAgICAgICB9KTtcbiAgICB9XG59XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIHRoZSBgRGlyTGlzdGluZ2AgY2xhc3Mgc3RhdGljcy5cbiAqL1xuKGZ1bmN0aW9uIChEaXJMaXN0aW5nKSB7XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgYW4gYElSZW5kZXJlcmAuXG4gICAgICovXG4gICAgY2xhc3MgUmVuZGVyZXIge1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIHRoZSBET00gbm9kZSBmb3IgYSBkaXIgbGlzdGluZy5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZU5vZGUoKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICAgICAgY29udGVudC5jbGFzc05hbWUgPSBDT05URU5UX0NMQVNTO1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTmFtZSA9IEhFQURFUl9DTEFTUztcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgICAgICAgICBub2RlLnRhYkluZGV4ID0gMDtcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQb3B1bGF0ZSBhbmQgZW1wdHkgaGVhZGVyIG5vZGUgZm9yIGEgZGlyIGxpc3RpbmcuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBub2RlIC0gVGhlIGhlYWRlciBub2RlIHRvIHBvcHVsYXRlLlxuICAgICAgICAgKi9cbiAgICAgICAgcG9wdWxhdGVIZWFkZXJOb2RlKG5vZGUsIHRyYW5zbGF0b3IsIGhpZGRlbkNvbHVtbnMpIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmNyZWF0ZUhlYWRlckl0ZW1Ob2RlKHRyYW5zLl9fKCdOYW1lJykpO1xuICAgICAgICAgICAgY29uc3QgbmFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCBtb2RpZmllZCA9IHRoaXMuY3JlYXRlSGVhZGVySXRlbU5vZGUodHJhbnMuX18oJ0xhc3QgTW9kaWZpZWQnKSk7XG4gICAgICAgICAgICBuYW1lLmNsYXNzTGlzdC5hZGQoTkFNRV9JRF9DTEFTUyk7XG4gICAgICAgICAgICBuYW1lLmNsYXNzTGlzdC5hZGQoU0VMRUNURURfQ0xBU1MpO1xuICAgICAgICAgICAgbW9kaWZpZWQuY2xhc3NMaXN0LmFkZChNT0RJRklFRF9JRF9DTEFTUyk7XG4gICAgICAgICAgICBuYXJyb3cuY2xhc3NMaXN0LmFkZChOQVJST1dfSURfQ0xBU1MpO1xuICAgICAgICAgICAgbmFycm93LnRleHRDb250ZW50ID0gJy4uLic7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKG5hbWUpO1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChuYXJyb3cpO1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChtb2RpZmllZCk7XG4gICAgICAgICAgICBpZiAoKF9hID0gaGlkZGVuQ29sdW1ucyA9PT0gbnVsbCB8fCBoaWRkZW5Db2x1bW5zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoaWRkZW5Db2x1bW5zLmhhcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwoaGlkZGVuQ29sdW1ucywgJ2xhc3RfbW9kaWZpZWQnKSkge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVkLmNsYXNzTGlzdC5hZGQoTU9ESUZJRURfQ09MVU1OX0hJRERFTik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllZC5jbGFzc0xpc3QucmVtb3ZlKE1PRElGSUVEX0NPTFVNTl9ISURERU4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2V0IHRoZSBpbml0aWFsIGNhcmV0IGljb25cbiAgICAgICAgICAgIFByaXZhdGUudXBkYXRlQ2FyZXQoRE9NVXRpbHMuZmluZEVsZW1lbnQobmFtZSwgSEVBREVSX0lURU1fSUNPTl9DTEFTUyksICdyaWdodCcsICd1cCcpO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBIYW5kbGUgYSBoZWFkZXIgY2xpY2suXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBub2RlIC0gQSBub2RlIHBvcHVsYXRlZCBieSBbW3BvcHVsYXRlSGVhZGVyTm9kZV1dLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gZXZlbnQgLSBBIGNsaWNrIGV2ZW50IG9uIHRoZSBub2RlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgc29ydCBzdGF0ZSBvZiB0aGUgaGVhZGVyIGFmdGVyIHRoZSBjbGljayBldmVudC5cbiAgICAgICAgICovXG4gICAgICAgIGhhbmRsZUhlYWRlckNsaWNrKG5vZGUsIGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gRE9NVXRpbHMuZmluZEVsZW1lbnQobm9kZSwgTkFNRV9JRF9DTEFTUyk7XG4gICAgICAgICAgICBjb25zdCBtb2RpZmllZCA9IERPTVV0aWxzLmZpbmRFbGVtZW50KG5vZGUsIE1PRElGSUVEX0lEX0NMQVNTKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0geyBkaXJlY3Rpb246ICdhc2NlbmRpbmcnLCBrZXk6ICduYW1lJyB9O1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgaWYgKG5hbWUuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGlmaWVkSWNvbiA9IERPTVV0aWxzLmZpbmRFbGVtZW50KG1vZGlmaWVkLCBIRUFERVJfSVRFTV9JQ09OX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lSWNvbiA9IERPTVV0aWxzLmZpbmRFbGVtZW50KG5hbWUsIEhFQURFUl9JVEVNX0lDT05fQ0xBU1MpO1xuICAgICAgICAgICAgICAgIGlmIChuYW1lLmNsYXNzTGlzdC5jb250YWlucyhTRUxFQ1RFRF9DTEFTUykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuYW1lLmNsYXNzTGlzdC5jb250YWlucyhERVNDRU5ESU5HX0NMQVNTKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZGlyZWN0aW9uID0gJ2Rlc2NlbmRpbmcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZS5jbGFzc0xpc3QuYWRkKERFU0NFTkRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgUHJpdmF0ZS51cGRhdGVDYXJldChuYW1lSWNvbiwgJ3JpZ2h0JywgJ2Rvd24nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUuY2xhc3NMaXN0LnJlbW92ZShERVNDRU5ESU5HX0NMQVNTKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFByaXZhdGUudXBkYXRlQ2FyZXQobmFtZUljb24sICdyaWdodCcsICd1cCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuYW1lLmNsYXNzTGlzdC5yZW1vdmUoREVTQ0VORElOR19DTEFTUyk7XG4gICAgICAgICAgICAgICAgICAgIFByaXZhdGUudXBkYXRlQ2FyZXQobmFtZUljb24sICdyaWdodCcsICd1cCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuYW1lLmNsYXNzTGlzdC5hZGQoU0VMRUNURURfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIG1vZGlmaWVkLmNsYXNzTGlzdC5yZW1vdmUoU0VMRUNURURfQ0xBU1MpO1xuICAgICAgICAgICAgICAgIG1vZGlmaWVkLmNsYXNzTGlzdC5yZW1vdmUoREVTQ0VORElOR19DTEFTUyk7XG4gICAgICAgICAgICAgICAgUHJpdmF0ZS51cGRhdGVDYXJldChtb2RpZmllZEljb24sICdsZWZ0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vZGlmaWVkLmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RpZmllZEljb24gPSBET01VdGlscy5maW5kRWxlbWVudChtb2RpZmllZCwgSEVBREVSX0lURU1fSUNPTl9DTEFTUyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZUljb24gPSBET01VdGlscy5maW5kRWxlbWVudChuYW1lLCBIRUFERVJfSVRFTV9JQ09OX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5rZXkgPSAnbGFzdF9tb2RpZmllZCc7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGlmaWVkLmNsYXNzTGlzdC5jb250YWlucyhTRUxFQ1RFRF9DTEFTUykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtb2RpZmllZC5jbGFzc0xpc3QuY29udGFpbnMoREVTQ0VORElOR19DTEFTUykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLmRpcmVjdGlvbiA9ICdkZXNjZW5kaW5nJztcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVkLmNsYXNzTGlzdC5hZGQoREVTQ0VORElOR19DTEFTUyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBQcml2YXRlLnVwZGF0ZUNhcmV0KG1vZGlmaWVkSWNvbiwgJ2xlZnQnLCAnZG93bicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZWQuY2xhc3NMaXN0LnJlbW92ZShERVNDRU5ESU5HX0NMQVNTKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFByaXZhdGUudXBkYXRlQ2FyZXQobW9kaWZpZWRJY29uLCAnbGVmdCcsICd1cCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtb2RpZmllZC5jbGFzc0xpc3QucmVtb3ZlKERFU0NFTkRJTkdfQ0xBU1MpO1xuICAgICAgICAgICAgICAgICAgICBQcml2YXRlLnVwZGF0ZUNhcmV0KG1vZGlmaWVkSWNvbiwgJ2xlZnQnLCAndXAnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbW9kaWZpZWQuY2xhc3NMaXN0LmFkZChTRUxFQ1RFRF9DTEFTUyk7XG4gICAgICAgICAgICAgICAgbmFtZS5jbGFzc0xpc3QucmVtb3ZlKFNFTEVDVEVEX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBuYW1lLmNsYXNzTGlzdC5yZW1vdmUoREVTQ0VORElOR19DTEFTUyk7XG4gICAgICAgICAgICAgICAgUHJpdmF0ZS51cGRhdGVDYXJldChuYW1lSWNvbiwgJ3JpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgYSBuZXcgaXRlbSBub2RlIGZvciBhIGRpciBsaXN0aW5nLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBBIG5ldyBET00gbm9kZSB0byB1c2UgYXMgYSBjb250ZW50IGl0ZW0uXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVJdGVtTm9kZShoaWRkZW5Db2x1bW5zKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgbW9kaWZpZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICBpY29uLmNsYXNzTmFtZSA9IElURU1fSUNPTl9DTEFTUztcbiAgICAgICAgICAgIHRleHQuY2xhc3NOYW1lID0gSVRFTV9URVhUX0NMQVNTO1xuICAgICAgICAgICAgbW9kaWZpZWQuY2xhc3NOYW1lID0gSVRFTV9NT0RJRklFRF9DTEFTUztcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQoaWNvbik7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChtb2RpZmllZCk7XG4gICAgICAgICAgICAvLyBNYWtlIHRoZSB0ZXh0IG5vdGUgZm9jdXNhYmxlIHNvIHRoYXQgaXQgcmVjZWl2ZXMga2V5Ym9hcmQgZXZlbnRzO1xuICAgICAgICAgICAgLy8gdGV4dCBub2RlIHdhcyBzcGVjaWZpY2FsbHkgY2hvc2VuIHRvIHJlY2VpdmUgc2hvcnRjdXRzIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIHRleHQgZWxlbWVudCBnZXRzIHN1YnN0aXR1dGVkIHdpdGggaW5wdXQgYXJlYSBkdXJpbmcgZmlsZSBuYW1lIGVkaXRzXG4gICAgICAgICAgICAvLyB3aGljaCBjb252ZW5pZW50bHkgZGVhY3RpdmF0ZSBpcnJlbGV2YW50IHNob3J0Y3V0cy5cbiAgICAgICAgICAgIHRleHQudGFiSW5kZXggPSAwO1xuICAgICAgICAgICAgaWYgKChfYSA9IGhpZGRlbkNvbHVtbnMgPT09IG51bGwgfHwgaGlkZGVuQ29sdW1ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogaGlkZGVuQ29sdW1ucy5oYXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKGhpZGRlbkNvbHVtbnMsICdsYXN0X21vZGlmaWVkJykpIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllZC5jbGFzc0xpc3QuYWRkKE1PRElGSUVEX0NPTFVNTl9ISURERU4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbW9kaWZpZWQuY2xhc3NMaXN0LnJlbW92ZShNT0RJRklFRF9DT0xVTU5fSElEREVOKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcGRhdGUgYW4gaXRlbSBub2RlIHRvIHJlZmxlY3QgdGhlIGN1cnJlbnQgc3RhdGUgb2YgYSBtb2RlbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG5vZGUgLSBBIG5vZGUgY3JlYXRlZCBieSBbW2NyZWF0ZUl0ZW1Ob2RlXV0uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBtb2RlbCAtIFRoZSBtb2RlbCBvYmplY3QgdG8gdXNlIGZvciB0aGUgaXRlbSBzdGF0ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGZpbGVUeXBlIC0gVGhlIGZpbGUgdHlwZSBvZiB0aGUgaXRlbSwgaWYgYXBwbGljYWJsZS5cbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIHVwZGF0ZUl0ZW1Ob2RlKG5vZGUsIG1vZGVsLCBmaWxlVHlwZSwgdHJhbnNsYXRvciwgaGlkZGVuQ29sdW1ucykge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgICAgICBmaWxlVHlwZSA9XG4gICAgICAgICAgICAgICAgZmlsZVR5cGUgfHwgRG9jdW1lbnRSZWdpc3RyeS5nZXREZWZhdWx0VGV4dEZpbGVUeXBlKHRyYW5zbGF0b3IpO1xuICAgICAgICAgICAgY29uc3QgeyBpY29uLCBpY29uQ2xhc3MsIG5hbWUgfSA9IGZpbGVUeXBlO1xuICAgICAgICAgICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICAgICAgY29uc3QgaWNvbkNvbnRhaW5lciA9IERPTVV0aWxzLmZpbmRFbGVtZW50KG5vZGUsIElURU1fSUNPTl9DTEFTUyk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gRE9NVXRpbHMuZmluZEVsZW1lbnQobm9kZSwgSVRFTV9URVhUX0NMQVNTKTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGlmaWVkID0gRE9NVXRpbHMuZmluZEVsZW1lbnQobm9kZSwgSVRFTV9NT0RJRklFRF9DTEFTUyk7XG4gICAgICAgICAgICBpZiAoKF9hID0gaGlkZGVuQ29sdW1ucyA9PT0gbnVsbCB8fCBoaWRkZW5Db2x1bW5zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBoaWRkZW5Db2x1bW5zLmhhcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwoaGlkZGVuQ29sdW1ucywgJ2xhc3RfbW9kaWZpZWQnKSkge1xuICAgICAgICAgICAgICAgIG1vZGlmaWVkLmNsYXNzTGlzdC5hZGQoTU9ESUZJRURfQ09MVU1OX0hJRERFTik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb2RpZmllZC5jbGFzc0xpc3QucmVtb3ZlKE1PRElGSUVEX0NPTFVNTl9ISURERU4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcmVuZGVyIHRoZSBmaWxlIGl0ZW0ncyBpY29uXG4gICAgICAgICAgICBMYWJJY29uLnJlc29sdmVFbGVtZW50KHtcbiAgICAgICAgICAgICAgICBpY29uLFxuICAgICAgICAgICAgICAgIGljb25DbGFzczogY2xhc3NlcyhpY29uQ2xhc3MsICdqcC1JY29uJyksXG4gICAgICAgICAgICAgICAgY29udGFpbmVyOiBpY29uQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogSVRFTV9JQ09OX0NMQVNTLFxuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQ6ICdsaXN0aW5nJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsZXQgaG92ZXJUZXh0ID0gdHJhbnMuX18oJ05hbWU6ICUxJywgbW9kZWwubmFtZSk7XG4gICAgICAgICAgICAvLyBhZGQgZmlsZSBzaXplIHRvIHBvcCB1cCBpZiBpdHMgYXZhaWxhYmxlXG4gICAgICAgICAgICBpZiAobW9kZWwuc2l6ZSAhPT0gbnVsbCAmJiBtb2RlbC5zaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBob3ZlclRleHQgKz0gdHJhbnMuX18oJ1xcblNpemU6ICUxJywgUHJpdmF0ZS5mb3JtYXRGaWxlU2l6ZShtb2RlbC5zaXplLCAxLCAxMDI0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9kZWwucGF0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpcm5hbWUgPSBQYXRoRXh0LmRpcm5hbWUobW9kZWwucGF0aCk7XG4gICAgICAgICAgICAgICAgaWYgKGRpcm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJUZXh0ICs9IHRyYW5zLl9fKCdcXG5QYXRoOiAlMScsIGRpcm5hbWUuc3Vic3RyKDAsIDUwKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXJuYW1lLmxlbmd0aCA+IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBob3ZlclRleHQgKz0gJy4uLic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9kZWwuY3JlYXRlZCkge1xuICAgICAgICAgICAgICAgIGhvdmVyVGV4dCArPSB0cmFucy5fXygnXFxuQ3JlYXRlZDogJTEnLCBUaW1lLmZvcm1hdChuZXcgRGF0ZShtb2RlbC5jcmVhdGVkKSwgJ1lZWVktTU0tREQgSEg6bW06c3MnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9kZWwubGFzdF9tb2RpZmllZCkge1xuICAgICAgICAgICAgICAgIGhvdmVyVGV4dCArPSB0cmFucy5fXygnXFxuTW9kaWZpZWQ6ICUxJywgVGltZS5mb3JtYXQobmV3IERhdGUobW9kZWwubGFzdF9tb2RpZmllZCksICdZWVlZLU1NLUREIEhIOm1tOnNzJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaG92ZXJUZXh0ICs9IHRyYW5zLl9fKCdcXG5Xcml0YWJsZTogJTEnLCBtb2RlbC53cml0YWJsZSk7XG4gICAgICAgICAgICBub2RlLnRpdGxlID0gaG92ZXJUZXh0O1xuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsZS10eXBlJywgbmFtZSk7XG4gICAgICAgICAgICBpZiAobW9kZWwubmFtZS5zdGFydHNXaXRoKCcuJykpIHtcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgnZGF0YS1pcy1kb3QnLCAndHJ1ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtaXMtZG90Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiBhbiBpdGVtIGlzIGJlaW5nIGVkaXRlZCBjdXJyZW50bHksIGl0cyB0ZXh0IG5vZGUgaXMgdW5hdmFpbGFibGUuXG4gICAgICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGljZXMgPSAhbW9kZWwuaW5kaWNlcyA/IFtdIDogbW9kZWwuaW5kaWNlcztcbiAgICAgICAgICAgICAgICBsZXQgaGlnaGxpZ2h0ZWROYW1lID0gU3RyaW5nRXh0LmhpZ2hsaWdodChtb2RlbC5uYW1lLCBpbmRpY2VzLCBoLm1hcmspO1xuICAgICAgICAgICAgICAgIFZpcnR1YWxET00ucmVuZGVyKGguc3BhbihoaWdobGlnaHRlZE5hbWUpLCB0ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBtb2RUZXh0ID0gJyc7XG4gICAgICAgICAgICBsZXQgbW9kVGl0bGUgPSAnJztcbiAgICAgICAgICAgIGlmIChtb2RlbC5sYXN0X21vZGlmaWVkKSB7XG4gICAgICAgICAgICAgICAgbW9kVGV4dCA9IFRpbWUuZm9ybWF0SHVtYW4obmV3IERhdGUobW9kZWwubGFzdF9tb2RpZmllZCkpO1xuICAgICAgICAgICAgICAgIG1vZFRpdGxlID0gVGltZS5mb3JtYXQobmV3IERhdGUobW9kZWwubGFzdF9tb2RpZmllZCksICdsbGwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vZGlmaWVkLnRleHRDb250ZW50ID0gbW9kVGV4dDtcbiAgICAgICAgICAgIG1vZGlmaWVkLnRpdGxlID0gbW9kVGl0bGU7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgbm9kZSBjb250YWluaW5nIHRoZSBmaWxlIG5hbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBub2RlIC0gQSBub2RlIGNyZWF0ZWQgYnkgW1tjcmVhdGVJdGVtTm9kZV1dLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJucyBUaGUgbm9kZSBjb250YWluaW5nIHRoZSBmaWxlIG5hbWUuXG4gICAgICAgICAqL1xuICAgICAgICBnZXROYW1lTm9kZShub2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gRE9NVXRpbHMuZmluZEVsZW1lbnQobm9kZSwgSVRFTV9URVhUX0NMQVNTKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgZHJhZyBpbWFnZSBmb3IgYW4gaXRlbS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIG5vZGUgLSBBIG5vZGUgY3JlYXRlZCBieSBbW2NyZWF0ZUl0ZW1Ob2RlXV0uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBjb3VudCAtIFRoZSBudW1iZXIgb2YgaXRlbXMgYmVpbmcgZHJhZ2dlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGZpbGVUeXBlIC0gVGhlIGZpbGUgdHlwZSBvZiB0aGUgaXRlbSwgaWYgYXBwbGljYWJsZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybnMgQW4gZWxlbWVudCB0byB1c2UgYXMgdGhlIGRyYWcgaW1hZ2UuXG4gICAgICAgICAqL1xuICAgICAgICBjcmVhdGVEcmFnSW1hZ2Uobm9kZSwgY291bnQsIHRyYW5zLCBmaWxlVHlwZSkge1xuICAgICAgICAgICAgY29uc3QgZHJhZ0ltYWdlID0gbm9kZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBjb25zdCBtb2RpZmllZCA9IERPTVV0aWxzLmZpbmRFbGVtZW50KGRyYWdJbWFnZSwgSVRFTV9NT0RJRklFRF9DTEFTUyk7XG4gICAgICAgICAgICBjb25zdCBpY29uID0gRE9NVXRpbHMuZmluZEVsZW1lbnQoZHJhZ0ltYWdlLCBJVEVNX0lDT05fQ0xBU1MpO1xuICAgICAgICAgICAgZHJhZ0ltYWdlLnJlbW92ZUNoaWxkKG1vZGlmaWVkKTtcbiAgICAgICAgICAgIGlmICghZmlsZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBpY29uLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc05hbWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGljb24udGV4dENvbnRlbnQgPSBmaWxlVHlwZS5pY29uTGFiZWwgfHwgJyc7XG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc05hbWUgPSBmaWxlVHlwZS5pY29uQ2xhc3MgfHwgJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5hZGQoRFJBR19JQ09OX0NMQVNTKTtcbiAgICAgICAgICAgIGlmIChjb3VudCA+IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lTm9kZSA9IERPTVV0aWxzLmZpbmRFbGVtZW50KGRyYWdJbWFnZSwgSVRFTV9URVhUX0NMQVNTKTtcbiAgICAgICAgICAgICAgICBuYW1lTm9kZS50ZXh0Q29udGVudCA9IHRyYW5zLl9uKCclMSBJdGVtJywgJyUxIEl0ZW1zJywgY291bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRyYWdJbWFnZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIGEgbm9kZSBmb3IgYSBoZWFkZXIgaXRlbS5cbiAgICAgICAgICovXG4gICAgICAgIGNyZWF0ZUhlYWRlckl0ZW1Ob2RlKGxhYmVsKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NOYW1lID0gSEVBREVSX0lURU1fQ0xBU1M7XG4gICAgICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9IEhFQURFUl9JVEVNX1RFWFRfQ0xBU1M7XG4gICAgICAgICAgICBpY29uLmNsYXNzTmFtZSA9IEhFQURFUl9JVEVNX0lDT05fQ0xBU1M7XG4gICAgICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gbGFiZWw7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHRleHQpO1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIERpckxpc3RpbmcuUmVuZGVyZXIgPSBSZW5kZXJlcjtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmYXVsdCBgSVJlbmRlcmVyYCBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBEaXJMaXN0aW5nLmRlZmF1bHRSZW5kZXJlciA9IG5ldyBSZW5kZXJlcigpO1xufSkoRGlyTGlzdGluZyB8fCAoRGlyTGlzdGluZyA9IHt9KSk7XG4vKipcbiAqIFRoZSBuYW1lc3BhY2UgZm9yIHRoZSBsaXN0aW5nIHByaXZhdGUgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBIYW5kbGUgZWRpdGluZyB0ZXh0IG9uIGEgbm9kZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBuYW1lIGNoYW5nZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZG9SZW5hbWUodGV4dCwgZWRpdCwgb3JpZ2luYWwpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gdGV4dC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKGVkaXQsIHRleHQpO1xuICAgICAgICBlZGl0LmZvY3VzKCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZWRpdC52YWx1ZS5sYXN0SW5kZXhPZignLicpO1xuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICBlZGl0LnNldFNlbGVjdGlvblJhbmdlKDAsIGVkaXQudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVkaXQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBlZGl0Lm9uYmx1ciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRleHQsIGVkaXQpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZWRpdC52YWx1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZWRpdC5vbmtleWRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzogLy8gRW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXQuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjc6IC8vIEVzY2FwZVxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdC52YWx1ZSA9IG9yaWdpbmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzODogLy8gVXAgYXJyb3dcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlZGl0LnNlbGVjdGlvblN0YXJ0ICE9PSBlZGl0LnNlbGVjdGlvbkVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXQuc2VsZWN0aW9uU3RhcnQgPSBlZGl0LnNlbGVjdGlvbkVuZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDogLy8gRG93biBhcnJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVkaXQuc2VsZWN0aW9uU3RhcnQgIT09IGVkaXQuc2VsZWN0aW9uRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdC5zZWxlY3Rpb25TdGFydCA9IGVkaXQuc2VsZWN0aW9uRW5kID0gZWRpdC52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBQcml2YXRlLmRvUmVuYW1lID0gZG9SZW5hbWU7XG4gICAgLyoqXG4gICAgICogU29ydCBhIGxpc3Qgb2YgaXRlbXMgYnkgc29ydCBzdGF0ZSBhcyBhIG5ldyBhcnJheS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzb3J0KGl0ZW1zLCBzdGF0ZSkge1xuICAgICAgICBjb25zdCBjb3B5ID0gdG9BcnJheShpdGVtcyk7XG4gICAgICAgIGNvbnN0IHJldmVyc2UgPSBzdGF0ZS5kaXJlY3Rpb24gPT09ICdkZXNjZW5kaW5nJyA/IDEgOiAtMTtcbiAgICAgICAgaWYgKHN0YXRlLmtleSA9PT0gJ2xhc3RfbW9kaWZpZWQnKSB7XG4gICAgICAgICAgICAvLyBTb3J0IGJ5IGxhc3QgbW9kaWZpZWQgKGdyb3VwaW5nIGRpcmVjdG9yaWVzIGZpcnN0KVxuICAgICAgICAgICAgY29weS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdDEgPSBhLnR5cGUgPT09ICdkaXJlY3RvcnknID8gMCA6IDE7XG4gICAgICAgICAgICAgICAgY29uc3QgdDIgPSBiLnR5cGUgPT09ICdkaXJlY3RvcnknID8gMCA6IDE7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsQSA9IG5ldyBEYXRlKGEubGFzdF9tb2RpZmllZCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbEIgPSBuZXcgRGF0ZShiLmxhc3RfbW9kaWZpZWQpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdDEgLSB0MiB8fCAodmFsQSAtIHZhbEIpICogcmV2ZXJzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gU29ydCBieSBuYW1lIChncm91cGluZyBkaXJlY3RvcmllcyBmaXJzdClcbiAgICAgICAgICAgIGNvcHkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHQxID0gYS50eXBlID09PSAnZGlyZWN0b3J5JyA/IDAgOiAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHQyID0gYi50eXBlID09PSAnZGlyZWN0b3J5JyA/IDAgOiAxO1xuICAgICAgICAgICAgICAgIHJldHVybiB0MSAtIHQyIHx8IGIubmFtZS5sb2NhbGVDb21wYXJlKGEubmFtZSkgKiByZXZlcnNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgfVxuICAgIFByaXZhdGUuc29ydCA9IHNvcnQ7XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpbmRleCBvZiB0aGUgbm9kZSBhdCBhIGNsaWVudCBwb3NpdGlvbiwgb3IgYC0xYC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBoaXRUZXN0Tm9kZXMobm9kZXMsIGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBBcnJheUV4dC5maW5kRmlyc3RJbmRleChub2Rlcywgbm9kZSA9PiBFbGVtZW50RXh0LmhpdFRlc3Qobm9kZSwgZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSkgfHxcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldCA9PT0gbm9kZSk7XG4gICAgfVxuICAgIFByaXZhdGUuaGl0VGVzdE5vZGVzID0gaGl0VGVzdE5vZGVzO1xuICAgIC8qKlxuICAgICAqIEZvcm1hdCBieXRlcyB0byBodW1hbiByZWFkYWJsZSBzdHJpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZm9ybWF0RmlsZVNpemUoYnl0ZXMsIGRlY2ltYWxQb2ludCwgaykge1xuICAgICAgICAvLyBodHRwczovL3d3dy5jb2RleHdvcmxkLmNvbS9ob3ctdG8vY29udmVydC1maWxlLXNpemUtYnl0ZXMta2ItbWItZ2ItamF2YXNjcmlwdC9cbiAgICAgICAgaWYgKGJ5dGVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJzAgQnl0ZXMnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRtID0gZGVjaW1hbFBvaW50IHx8IDI7XG4gICAgICAgIGNvbnN0IHNpemVzID0gWydCeXRlcycsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicsICdFQicsICdaQicsICdZQiddO1xuICAgICAgICBjb25zdCBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZyhrKSk7XG4gICAgICAgIGlmIChpID49IDAgJiYgaSA8IHNpemVzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoKGJ5dGVzIC8gTWF0aC5wb3coaywgaSkpLnRvRml4ZWQoZG0pKSArICcgJyArIHNpemVzW2ldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhieXRlcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUHJpdmF0ZS5mb3JtYXRGaWxlU2l6ZSA9IGZvcm1hdEZpbGVTaXplO1xuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBhbiBpbmxpbmUgc3ZnIGNhcmV0IGljb24gaW4gYSBub2RlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUNhcmV0KGNvbnRhaW5lciwgZmxvYXQsIHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgKHN0YXRlID09PSAnZG93bicgPyBjYXJldERvd25JY29uIDogY2FyZXRVcEljb24pLmVsZW1lbnQoe1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICB0YWc6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0OiAnbGlzdGluZ0hlYWRlckl0ZW0nLFxuICAgICAgICAgICAgICAgIGZsb2F0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIExhYkljb24ucmVtb3ZlKGNvbnRhaW5lcik7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gSEVBREVSX0lURU1fSUNPTl9DTEFTUztcbiAgICAgICAgfVxuICAgIH1cbiAgICBQcml2YXRlLnVwZGF0ZUNhcmV0ID0gdXBkYXRlQ2FyZXQ7XG59KShQcml2YXRlIHx8IChQcml2YXRlID0ge30pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpc3RpbmcuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgRGlhbG9nLCBzaG93RGlhbG9nIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgUGFnZUNvbmZpZywgUGF0aEV4dCB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBzaG91bGRPdmVyd3JpdGUgfSBmcm9tICdAanVweXRlcmxhYi9kb2NtYW5hZ2VyJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgQXJyYXlFeHQsIEFycmF5SXRlcmF0b3IsIGVhY2gsIGZpbHRlciwgZmluZCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCB7IFByb21pc2VEZWxlZ2F0ZSB9IGZyb20gJ0BsdW1pbm8vY29yZXV0aWxzJztcbmltcG9ydCB7IFBvbGwgfSBmcm9tICdAbHVtaW5vL3BvbGxpbmcnO1xuaW1wb3J0IHsgU2lnbmFsIH0gZnJvbSAnQGx1bWluby9zaWduYWxpbmcnO1xuLyoqXG4gKiBUaGUgZGVmYXVsdCBkdXJhdGlvbiBvZiB0aGUgYXV0by1yZWZyZXNoIGluIG1zXG4gKi9cbmNvbnN0IERFRkFVTFRfUkVGUkVTSF9JTlRFUlZBTCA9IDEwMDAwO1xuLyoqXG4gKiBUaGUgbWF4aW11bSB1cGxvYWQgc2l6ZSAoaW4gYnl0ZXMpIGZvciBub3RlYm9vayB2ZXJzaW9uIDwgNS4xLjBcbiAqL1xuZXhwb3J0IGNvbnN0IExBUkdFX0ZJTEVfU0laRSA9IDE1ICogMTAyNCAqIDEwMjQ7XG4vKipcbiAqIFRoZSBzaXplIChpbiBieXRlcykgb2YgdGhlIGJpZ2dlc3QgY2h1bmsgd2Ugc2hvdWxkIHVwbG9hZCBhdCBvbmNlLlxuICovXG5leHBvcnQgY29uc3QgQ0hVTktfU0laRSA9IDEwMjQgKiAxMDI0O1xuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBhIGZpbGUgYnJvd3NlciBtb2RlbC5cbiAqXG4gKiAjIyMjIE5vdGVzXG4gKiBBbGwgcGF0aHMgcGFyYW1ldGVycyB3aXRob3V0IGEgbGVhZGluZyBgJy8nYCBhcmUgaW50ZXJwcmV0ZWQgYXMgcmVsYXRpdmUgdG9cbiAqIHRoZSBjdXJyZW50IGRpcmVjdG9yeS4gIFN1cHBvcnRzIGAnLi4vJ2Agc3ludGF4LlxuICovXG5leHBvcnQgY2xhc3MgRmlsZUJyb3dzZXJNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGZpbGUgYnJvd3NlciBtb2RlbC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvbkZhaWx1cmUgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9maWxlQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgICAgIHRoaXMuX2tleSA9ICcnO1xuICAgICAgICB0aGlzLl9wYXRoQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMuX3BhdGhzID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLl9wZW5kaW5nID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcGVuZGluZ1BhdGggPSBudWxsO1xuICAgICAgICB0aGlzLl9yZWZyZXNoZWQgPSBuZXcgU2lnbmFsKHRoaXMpO1xuICAgICAgICB0aGlzLl9zZXNzaW9ucyA9IFtdO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVzdG9yZWQgPSBuZXcgUHJvbWlzZURlbGVnYXRlKCk7XG4gICAgICAgIHRoaXMuX3VwbG9hZHMgPSBbXTtcbiAgICAgICAgdGhpcy5fdXBsb2FkQ2hhbmdlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHRoaXMubWFuYWdlciA9IG9wdGlvbnMubWFuYWdlcjtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gb3B0aW9ucy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLl90cmFucyA9IHRoaXMudHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHRoaXMuX2RyaXZlTmFtZSA9IG9wdGlvbnMuZHJpdmVOYW1lIHx8ICcnO1xuICAgICAgICB0aGlzLl9tb2RlbCA9IHtcbiAgICAgICAgICAgIHBhdGg6IHRoaXMucm9vdFBhdGgsXG4gICAgICAgICAgICBuYW1lOiBQYXRoRXh0LmJhc2VuYW1lKHRoaXMucm9vdFBhdGgpLFxuICAgICAgICAgICAgdHlwZTogJ2RpcmVjdG9yeScsXG4gICAgICAgICAgICBjb250ZW50OiB1bmRlZmluZWQsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjcmVhdGVkOiAndW5rbm93bicsXG4gICAgICAgICAgICBsYXN0X21vZGlmaWVkOiAndW5rbm93bicsXG4gICAgICAgICAgICBtaW1ldHlwZTogJ3RleHQvcGxhaW4nLFxuICAgICAgICAgICAgZm9ybWF0OiAndGV4dCdcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBvcHRpb25zLnN0YXRlIHx8IG51bGw7XG4gICAgICAgIGNvbnN0IHJlZnJlc2hJbnRlcnZhbCA9IG9wdGlvbnMucmVmcmVzaEludGVydmFsIHx8IERFRkFVTFRfUkVGUkVTSF9JTlRFUlZBTDtcbiAgICAgICAgY29uc3QgeyBzZXJ2aWNlcyB9ID0gb3B0aW9ucy5tYW5hZ2VyO1xuICAgICAgICBzZXJ2aWNlcy5jb250ZW50cy5maWxlQ2hhbmdlZC5jb25uZWN0KHRoaXMub25GaWxlQ2hhbmdlZCwgdGhpcyk7XG4gICAgICAgIHNlcnZpY2VzLnNlc3Npb25zLnJ1bm5pbmdDaGFuZ2VkLmNvbm5lY3QodGhpcy5vblJ1bm5pbmdDaGFuZ2VkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fdW5sb2FkRXZlbnRMaXN0ZW5lciA9IChlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fdXBsb2Fkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29uZmlybWF0aW9uTWVzc2FnZSA9IHRoaXMuX3RyYW5zLl9fKCdGaWxlcyBzdGlsbCB1cGxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICBlLnJldHVyblZhbHVlID0gY29uZmlybWF0aW9uTWVzc2FnZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlybWF0aW9uTWVzc2FnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIHRoaXMuX3VubG9hZEV2ZW50TGlzdGVuZXIpO1xuICAgICAgICB0aGlzLl9wb2xsID0gbmV3IFBvbGwoe1xuICAgICAgICAgICAgYXV0bzogKF9hID0gb3B0aW9ucy5hdXRvKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0cnVlLFxuICAgICAgICAgICAgbmFtZTogJ0BqdXB5dGVybGFiL2ZpbGVicm93c2VyOk1vZGVsJyxcbiAgICAgICAgICAgIGZhY3Rvcnk6ICgpID0+IHRoaXMuY2QoJy4nKSxcbiAgICAgICAgICAgIGZyZXF1ZW5jeToge1xuICAgICAgICAgICAgICAgIGludGVydmFsOiByZWZyZXNoSW50ZXJ2YWwsXG4gICAgICAgICAgICAgICAgYmFja29mZjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXg6IDMwMCAqIDEwMDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGFuZGJ5OiAnd2hlbi1oaWRkZW4nXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIGZpbGUgYnJvd3NlciBtb2RlbCBsb3NlcyBjb25uZWN0aW9uLlxuICAgICAqL1xuICAgIGdldCBjb25uZWN0aW9uRmFpbHVyZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3Rpb25GYWlsdXJlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgZHJpdmUgbmFtZSB0aGF0IGdldHMgcHJlcGVuZGVkIHRvIHRoZSBwYXRoLlxuICAgICAqL1xuICAgIGdldCBkcml2ZU5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kcml2ZU5hbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1vZGVsIGlzIGZpcnN0IHJlc3RvcmVkLlxuICAgICAqL1xuICAgIGdldCByZXN0b3JlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3RvcmVkLnByb21pc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZmlsZSBwYXRoIGNoYW5nZWQgc2lnbmFsLlxuICAgICAqL1xuICAgIGdldCBmaWxlQ2hhbmdlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGVDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgcGF0aC5cbiAgICAgKi9cbiAgICBnZXQgcGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGVsID8gdGhpcy5fbW9kZWwucGF0aCA6ICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHJvb3QgcGF0aFxuICAgICAqL1xuICAgIGdldCByb290UGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RyaXZlTmFtZSA/IHRoaXMuX2RyaXZlTmFtZSArICc6JyA6ICcnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gdGhlIHBhdGggY2hhbmdlcy5cbiAgICAgKi9cbiAgICBnZXQgcGF0aENoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoQ2hhbmdlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQSBzaWduYWwgZW1pdHRlZCB3aGVuIHRoZSBkaXJlY3RvcnkgbGlzdGluZyBpcyByZWZyZXNoZWQuXG4gICAgICovXG4gICAgZ2V0IHJlZnJlc2hlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZnJlc2hlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBrZXJuZWwgc3BlYyBtb2RlbHMuXG4gICAgICovXG4gICAgZ2V0IHNwZWNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tYW5hZ2VyLnNlcnZpY2VzLmtlcm5lbHNwZWNzLnNwZWNzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXQgd2hldGhlciB0aGUgbW9kZWwgaXMgZGlzcG9zZWQuXG4gICAgICovXG4gICAgZ2V0IGlzRGlzcG9zZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0Rpc3Bvc2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIHNpZ25hbCBlbWl0dGVkIHdoZW4gYW4gdXBsb2FkIHByb2dyZXNzZXMuXG4gICAgICovXG4gICAgZ2V0IHVwbG9hZENoYW5nZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91cGxvYWRDaGFuZ2VkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaXRlcmF0b3Igb3ZlciB0aGUgc3RhdHVzIG9mIGFsbCBpbiBwcm9ncmVzcyB1cGxvYWRzLlxuICAgICAqL1xuICAgIHVwbG9hZHMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXlJdGVyYXRvcih0aGlzLl91cGxvYWRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcG9zZSBvZiB0aGUgcmVzb3VyY2VzIGhlbGQgYnkgdGhlIG1vZGVsLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgdGhpcy5fdW5sb2FkRXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMuX2lzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9wb2xsLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fc2Vzc2lvbnMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5faXRlbXMubGVuZ3RoID0gMDtcbiAgICAgICAgU2lnbmFsLmNsZWFyRGF0YSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGFuIGl0ZXJhdG9yIG92ZXIgdGhlIG1vZGVsJ3MgaXRlbXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBpdGVyYXRvciBvdmVyIHRoZSBtb2RlbCdzIGl0ZW1zLlxuICAgICAqL1xuICAgIGl0ZW1zKCkge1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5SXRlcmF0b3IodGhpcy5faXRlbXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYW4gaXRlcmF0b3Igb3ZlciB0aGUgYWN0aXZlIHNlc3Npb25zIGluIHRoZSBkaXJlY3RvcnkuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIG5ldyBpdGVyYXRvciBvdmVyIHRoZSBtb2RlbCdzIGFjdGl2ZSBzZXNzaW9ucy5cbiAgICAgKi9cbiAgICBzZXNzaW9ucygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheUl0ZXJhdG9yKHRoaXMuX3Nlc3Npb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRm9yY2UgYSByZWZyZXNoIG9mIHRoZSBkaXJlY3RvcnkgY29udGVudHMuXG4gICAgICovXG4gICAgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcG9sbC5yZWZyZXNoKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuX3BvbGwudGljaztcbiAgICAgICAgdGhpcy5fcmVmcmVzaGVkLmVtaXQodm9pZCAwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hhbmdlIGRpcmVjdG9yeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXRoIC0gVGhlIHBhdGggdG8gdGhlIGZpbGUgb3IgZGlyZWN0b3J5LlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHdpdGggdGhlIGNvbnRlbnRzIG9mIHRoZSBkaXJlY3RvcnkuXG4gICAgICovXG4gICAgYXN5bmMgY2QobmV3VmFsdWUgPSAnLicpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSAnLicpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5tYW5hZ2VyLnNlcnZpY2VzLmNvbnRlbnRzLnJlc29sdmVQYXRoKHRoaXMuX21vZGVsLnBhdGgsIG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5fcGVuZGluZ1BhdGggfHwgdGhpcy5fbW9kZWwucGF0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcGVuZGluZykge1xuICAgICAgICAgICAgLy8gQ29sbGFwc2UgcmVxdWVzdHMgdG8gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlID09PSB0aGlzLl9wZW5kaW5nUGF0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wZW5kaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHdhaXQgZm9yIHRoZSBwZW5kaW5nIHJlcXVlc3QgdG8gY29tcGxldGUgYmVmb3JlIGNvbnRpbnVpbmcuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLl9wZW5kaW5nO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5wYXRoO1xuICAgICAgICBjb25zdCBvcHRpb25zID0geyBjb250ZW50OiB0cnVlIH07XG4gICAgICAgIHRoaXMuX3BlbmRpbmdQYXRoID0gbmV3VmFsdWU7XG4gICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nlc3Npb25zLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VydmljZXMgPSB0aGlzLm1hbmFnZXIuc2VydmljZXM7XG4gICAgICAgIHRoaXMuX3BlbmRpbmcgPSBzZXJ2aWNlcy5jb250ZW50c1xuICAgICAgICAgICAgLmdldChuZXdWYWx1ZSwgb3B0aW9ucylcbiAgICAgICAgICAgIC50aGVuKGNvbnRlbnRzID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNvbnRlbnRzKGNvbnRlbnRzKTtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdQYXRoID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmcgPSBudWxsO1xuICAgICAgICAgICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgc3RhdGUgZGF0YWJhc2UgYW5kIGEgdW5pcXVlIGtleSwgc2F2ZSB0aGUgbmV3IHBhdGguXG4gICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCB0byB3YWl0IG9uIHRoZSBzYXZlIHRvIGNvbnRpbnVlLlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZSAmJiB0aGlzLl9rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCB0aGlzLl9zdGF0ZS5zYXZlKHRoaXMuX2tleSwgeyBwYXRoOiBuZXdWYWx1ZSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fcGF0aENoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdwYXRoJyxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uUnVubmluZ0NoYW5nZWQoc2VydmljZXMuc2Vzc2lvbnMsIHNlcnZpY2VzLnNlc3Npb25zLnJ1bm5pbmcoKSk7XG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmdQYXRoID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3BlbmRpbmcgPSBudWxsO1xuICAgICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlICYmXG4gICAgICAgICAgICAgICAgZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDQgJiZcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSAhPT0gJy8nKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9IHRoaXMuX3RyYW5zLl9fKCdEaXJlY3Rvcnkgbm90IGZvdW5kOiBcIiUxXCInLCB0aGlzLl9tb2RlbC5wYXRoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9uRmFpbHVyZS5lbWl0KGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jZCgnLycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbkZhaWx1cmUuZW1pdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5fcGVuZGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogRG93bmxvYWQgYSBmaWxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGggLSBUaGUgcGF0aCBvZiB0aGUgZmlsZSB0byBiZSBkb3dubG9hZGVkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHdoZW4gdGhlIGZpbGUgaGFzIGJlZ3VuXG4gICAgICogICBkb3dubG9hZGluZy5cbiAgICAgKi9cbiAgICBhc3luYyBkb3dubG9hZChwYXRoKSB7XG4gICAgICAgIGNvbnN0IHVybCA9IGF3YWl0IHRoaXMubWFuYWdlci5zZXJ2aWNlcy5jb250ZW50cy5nZXREb3dubG9hZFVybChwYXRoKTtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgZWxlbWVudC5ocmVmID0gdXJsO1xuICAgICAgICBlbGVtZW50LmRvd25sb2FkID0gJyc7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIGVsZW1lbnQuY2xpY2soKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVzdG9yZSB0aGUgc3RhdGUgb2YgdGhlIGZpbGUgYnJvd3Nlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCAtIFRoZSB1bmlxdWUgSUQgdGhhdCBpcyB1c2VkIHRvIGNvbnN0cnVjdCBhIHN0YXRlIGRhdGFiYXNlIGtleS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwb3B1bGF0ZSAtIElmIGBmYWxzZWAsIHRoZSByZXN0b3JhdGlvbiBJRCB3aWxsIGJlIHNldCBidXQgdGhlIGZpbGVcbiAgICAgKiBicm93c2VyIHN0YXRlIHdpbGwgbm90IGJlIGZldGNoZWQgZnJvbSB0aGUgc3RhdGUgZGF0YWJhc2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2Ugd2hlbiByZXN0b3JhdGlvbiBpcyBjb21wbGV0ZS5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgb25seSByZXN0b3JlIHRoZSBtb2RlbCAqb25jZSouIElmIGl0IGlzIGNhbGxlZCBtdWx0aXBsZVxuICAgICAqIHRpbWVzLCBhbGwgc3Vic2VxdWVudCBpbnZvY2F0aW9ucyBhcmUgbm8tb3BzLlxuICAgICAqL1xuICAgIGFzeW5jIHJlc3RvcmUoaWQsIHBvcHVsYXRlID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCB7IG1hbmFnZXIgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGtleSA9IGBmaWxlLWJyb3dzZXItJHtpZH06Y3dkYDtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9zdGF0ZTtcbiAgICAgICAgY29uc3QgcmVzdG9yZWQgPSAhIXRoaXMuX2tleTtcbiAgICAgICAgaWYgKHJlc3RvcmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0IHRoZSBmaWxlIGJyb3dzZXIga2V5IGZvciBzdGF0ZSBkYXRhYmFzZSBmZXRjaC9zYXZlLlxuICAgICAgICB0aGlzLl9rZXkgPSBrZXk7XG4gICAgICAgIGlmICghcG9wdWxhdGUgfHwgIXN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9yZXN0b3JlZC5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgbWFuYWdlci5zZXJ2aWNlcy5yZWFkeTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgc3RhdGUuZmV0Y2goa2V5KTtcbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXN0b3JlZC5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IHZhbHVlWydwYXRoJ107XG4gICAgICAgICAgICAvLyBuZWVkIHRvIHJldHVybiB0byByb290IHBhdGggaWYgcHJlZmVycmVkIGRpciBpcyBzZXRcbiAgICAgICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jZCgnLycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbG9jYWxQYXRoID0gbWFuYWdlci5zZXJ2aWNlcy5jb250ZW50cy5sb2NhbFBhdGgocGF0aCk7XG4gICAgICAgICAgICBhd2FpdCBtYW5hZ2VyLnNlcnZpY2VzLmNvbnRlbnRzLmdldChwYXRoKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2QobG9jYWxQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGF3YWl0IHN0YXRlLnJlbW92ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Jlc3RvcmVkLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBsb2FkIGEgYEZpbGVgIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBmaWxlIC0gVGhlIGBGaWxlYCBvYmplY3QgdG8gdXBsb2FkLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBwcm9taXNlIGNvbnRhaW5pbmcgdGhlIG5ldyBmaWxlIGNvbnRlbnRzIG1vZGVsLlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIE9uIE5vdGVib29rIHZlcnNpb24gPCA1LjEuMCwgdGhpcyB3aWxsIGZhaWwgdG8gdXBsb2FkIGZpbGVzIHRoYXQgYXJlIHRvb1xuICAgICAqIGJpZyB0byBiZSBzZW50IGluIG9uZSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIuIE9uIG5ld2VyIHZlcnNpb25zLCBvciBvblxuICAgICAqIEp1cHl0ZXIgU2VydmVyLCBpdCB3aWxsIGFzayBmb3IgY29uZmlybWF0aW9uIHRoZW4gdXBsb2FkIHRoZSBmaWxlIGluIDEgTUJcbiAgICAgKiBjaHVua3MuXG4gICAgICovXG4gICAgYXN5bmMgdXBsb2FkKGZpbGUpIHtcbiAgICAgICAgLy8gV2UgZG8gbm90IHN1cHBvcnQgSnVweXRlciBOb3RlYm9vayB2ZXJzaW9uIGxlc3MgdGhhbiA0LCBhbmQgSnVweXRlclxuICAgICAgICAvLyBTZXJ2ZXIgYWR2ZXJ0aXNlcyBpdHNlbGYgYXMgdmVyc2lvbiAxIGFuZCBzdXBwb3J0cyBjaHVua2VkXG4gICAgICAgIC8vIHVwbG9hZGluZy4gV2UgYXNzdW1lIGFueSB2ZXJzaW9uIGxlc3MgdGhhbiA0LjAuMCB0byBiZSBKdXB5dGVyIFNlcnZlclxuICAgICAgICAvLyBpbnN0ZWFkIG9mIEp1cHl0ZXIgTm90ZWJvb2suXG4gICAgICAgIGNvbnN0IHNlcnZlclZlcnNpb24gPSBQYWdlQ29uZmlnLmdldE5vdGVib29rVmVyc2lvbigpO1xuICAgICAgICBjb25zdCBzdXBwb3J0c0NodW5rZWQgPSBzZXJ2ZXJWZXJzaW9uIDwgWzQsIDAsIDBdIC8qIEp1cHl0ZXIgU2VydmVyICovIHx8XG4gICAgICAgICAgICBzZXJ2ZXJWZXJzaW9uID49IFs1LCAxLCAwXTsgLyogSnVweXRlciBOb3RlYm9vayA+PSA1LjEuMCAqL1xuICAgICAgICBjb25zdCBsYXJnZUZpbGUgPSBmaWxlLnNpemUgPiBMQVJHRV9GSUxFX1NJWkU7XG4gICAgICAgIGlmIChsYXJnZUZpbGUgJiYgIXN1cHBvcnRzQ2h1bmtlZCkge1xuICAgICAgICAgICAgY29uc3QgbXNnID0gdGhpcy5fdHJhbnMuX18oJ0Nhbm5vdCB1cGxvYWQgZmlsZSAoPiUxIE1CKS4gJTInLCBMQVJHRV9GSUxFX1NJWkUgLyAoMTAyNCAqIDEwMjQpLCBmaWxlLm5hbWUpO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKG1zZyk7XG4gICAgICAgICAgICB0aHJvdyBtc2c7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXJyID0gJ0ZpbGUgbm90IHVwbG9hZGVkJztcbiAgICAgICAgaWYgKGxhcmdlRmlsZSAmJiAhKGF3YWl0IHRoaXMuX3Nob3VsZFVwbG9hZExhcmdlKGZpbGUpKSkge1xuICAgICAgICAgICAgdGhyb3cgJ0NhbmNlbGxlZCBsYXJnZSBmaWxlIHVwbG9hZCc7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5fdXBsb2FkQ2hlY2tEaXNwb3NlZCgpO1xuICAgICAgICBhd2FpdCB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgYXdhaXQgdGhpcy5fdXBsb2FkQ2hlY2tEaXNwb3NlZCgpO1xuICAgICAgICBpZiAoZmluZCh0aGlzLl9pdGVtcywgaSA9PiBpLm5hbWUgPT09IGZpbGUubmFtZSkgJiZcbiAgICAgICAgICAgICEoYXdhaXQgc2hvdWxkT3ZlcndyaXRlKGZpbGUubmFtZSkpKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5fdXBsb2FkQ2hlY2tEaXNwb3NlZCgpO1xuICAgICAgICBjb25zdCBjaHVua2VkVXBsb2FkID0gc3VwcG9ydHNDaHVua2VkICYmIGZpbGUuc2l6ZSA+IENIVU5LX1NJWkU7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLl91cGxvYWQoZmlsZSwgY2h1bmtlZFVwbG9hZCk7XG4gICAgfVxuICAgIGFzeW5jIF9zaG91bGRVcGxvYWRMYXJnZShmaWxlKSB7XG4gICAgICAgIGNvbnN0IHsgYnV0dG9uIH0gPSBhd2FpdCBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLl90cmFucy5fXygnTGFyZ2UgZmlsZSBzaXplIHdhcm5pbmcnKSxcbiAgICAgICAgICAgIGJvZHk6IHRoaXMuX3RyYW5zLl9fKCdUaGUgZmlsZSBzaXplIGlzICUxIE1CLiBEbyB5b3Ugc3RpbGwgd2FudCB0byB1cGxvYWQgaXQ/JywgTWF0aC5yb3VuZChmaWxlLnNpemUgLyAoMTAyNCAqIDEwMjQpKSksXG4gICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgRGlhbG9nLmNhbmNlbEJ1dHRvbih7IGxhYmVsOiB0aGlzLl90cmFucy5fXygnQ2FuY2VsJykgfSksXG4gICAgICAgICAgICAgICAgRGlhbG9nLndhcm5CdXR0b24oeyBsYWJlbDogdGhpcy5fdHJhbnMuX18oJ1VwbG9hZCcpIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYnV0dG9uLmFjY2VwdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSB0aGUgYWN0dWFsIHVwbG9hZC5cbiAgICAgKi9cbiAgICBhc3luYyBfdXBsb2FkKGZpbGUsIGNodW5rZWQpIHtcbiAgICAgICAgLy8gR2F0aGVyIHRoZSBmaWxlIG1vZGVsIHBhcmFtZXRlcnMuXG4gICAgICAgIGxldCBwYXRoID0gdGhpcy5fbW9kZWwucGF0aDtcbiAgICAgICAgcGF0aCA9IHBhdGggPyBwYXRoICsgJy8nICsgZmlsZS5uYW1lIDogZmlsZS5uYW1lO1xuICAgICAgICBjb25zdCBuYW1lID0gZmlsZS5uYW1lO1xuICAgICAgICBjb25zdCB0eXBlID0gJ2ZpbGUnO1xuICAgICAgICBjb25zdCBmb3JtYXQgPSAnYmFzZTY0JztcbiAgICAgICAgY29uc3QgdXBsb2FkSW5uZXIgPSBhc3luYyAoYmxvYiwgY2h1bmspID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3VwbG9hZENoZWNrRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcbiAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICByZWFkZXIub25lcnJvciA9IGV2ZW50ID0+IHJlamVjdChgRmFpbGVkIHRvIHVwbG9hZCBcIiR7ZmlsZS5uYW1lfVwiOmAgKyBldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3VwbG9hZENoZWNrRGlzcG9zZWQoKTtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBoZWFkZXIgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI0Mjg5NDIwLzkwNzA2MFxuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHJlYWRlci5yZXN1bHQuc3BsaXQoJywnKVsxXTtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsID0ge1xuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0LFxuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgY2h1bmssXG4gICAgICAgICAgICAgICAgY29udGVudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLm1hbmFnZXIuc2VydmljZXMuY29udGVudHMuc2F2ZShwYXRoLCBtb2RlbCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICghY2h1bmtlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgdXBsb2FkSW5uZXIoZmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgQXJyYXlFeHQucmVtb3ZlRmlyc3RXaGVyZSh0aGlzLl91cGxvYWRzLCB1cGxvYWRJbmRleCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWxlLm5hbWUgPT09IHVwbG9hZEluZGV4LnBhdGg7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBmaW5hbE1vZGVsO1xuICAgICAgICBsZXQgdXBsb2FkID0geyBwYXRoLCBwcm9ncmVzczogMCB9O1xuICAgICAgICB0aGlzLl91cGxvYWRDaGFuZ2VkLmVtaXQoe1xuICAgICAgICAgICAgbmFtZTogJ3N0YXJ0JyxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiB1cGxvYWQsXG4gICAgICAgICAgICBvbGRWYWx1ZTogbnVsbFxuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChsZXQgc3RhcnQgPSAwOyAhZmluYWxNb2RlbDsgc3RhcnQgKz0gQ0hVTktfU0laRSkge1xuICAgICAgICAgICAgY29uc3QgZW5kID0gc3RhcnQgKyBDSFVOS19TSVpFO1xuICAgICAgICAgICAgY29uc3QgbGFzdENodW5rID0gZW5kID49IGZpbGUuc2l6ZTtcbiAgICAgICAgICAgIGNvbnN0IGNodW5rID0gbGFzdENodW5rID8gLTEgOiBlbmQgLyBDSFVOS19TSVpFO1xuICAgICAgICAgICAgY29uc3QgbmV3VXBsb2FkID0geyBwYXRoLCBwcm9ncmVzczogc3RhcnQgLyBmaWxlLnNpemUgfTtcbiAgICAgICAgICAgIHRoaXMuX3VwbG9hZHMuc3BsaWNlKHRoaXMuX3VwbG9hZHMuaW5kZXhPZih1cGxvYWQpKTtcbiAgICAgICAgICAgIHRoaXMuX3VwbG9hZHMucHVzaChuZXdVcGxvYWQpO1xuICAgICAgICAgICAgdGhpcy5fdXBsb2FkQ2hhbmdlZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiAndXBkYXRlJyxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbmV3VXBsb2FkLFxuICAgICAgICAgICAgICAgIG9sZFZhbHVlOiB1cGxvYWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdXBsb2FkID0gbmV3VXBsb2FkO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRNb2RlbDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE1vZGVsID0gYXdhaXQgdXBsb2FkSW5uZXIoZmlsZS5zbGljZShzdGFydCwgZW5kKSwgY2h1bmspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIEFycmF5RXh0LnJlbW92ZUZpcnN0V2hlcmUodGhpcy5fdXBsb2FkcywgdXBsb2FkSW5kZXggPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsZS5uYW1lID09PSB1cGxvYWRJbmRleC5wYXRoO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwbG9hZENoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdmYWlsdXJlJyxcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IHVwbG9hZCxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IG51bGxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGFzdENodW5rKSB7XG4gICAgICAgICAgICAgICAgZmluYWxNb2RlbCA9IGN1cnJlbnRNb2RlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGxvYWRzLnNwbGljZSh0aGlzLl91cGxvYWRzLmluZGV4T2YodXBsb2FkKSk7XG4gICAgICAgIHRoaXMuX3VwbG9hZENoYW5nZWQuZW1pdCh7XG4gICAgICAgICAgICBuYW1lOiAnZmluaXNoJyxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiBudWxsLFxuICAgICAgICAgICAgb2xkVmFsdWU6IHVwbG9hZFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZpbmFsTW9kZWw7XG4gICAgfVxuICAgIF91cGxvYWRDaGVja0Rpc3Bvc2VkKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0ZpbGVtYW5hZ2VyIGRpc3Bvc2VkLiBGaWxlIHVwbG9hZCBjYW5jZWxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIGFuIHVwZGF0ZWQgY29udGVudHMgbW9kZWwuXG4gICAgICovXG4gICAgaGFuZGxlQ29udGVudHMoY29udGVudHMpIHtcbiAgICAgICAgLy8gVXBkYXRlIG91ciBpbnRlcm5hbCBkYXRhLlxuICAgICAgICB0aGlzLl9tb2RlbCA9IHtcbiAgICAgICAgICAgIG5hbWU6IGNvbnRlbnRzLm5hbWUsXG4gICAgICAgICAgICBwYXRoOiBjb250ZW50cy5wYXRoLFxuICAgICAgICAgICAgdHlwZTogY29udGVudHMudHlwZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBjb250ZW50cy53cml0YWJsZSxcbiAgICAgICAgICAgIGNyZWF0ZWQ6IGNvbnRlbnRzLmNyZWF0ZWQsXG4gICAgICAgICAgICBsYXN0X21vZGlmaWVkOiBjb250ZW50cy5sYXN0X21vZGlmaWVkLFxuICAgICAgICAgICAgbWltZXR5cGU6IGNvbnRlbnRzLm1pbWV0eXBlLFxuICAgICAgICAgICAgZm9ybWF0OiBjb250ZW50cy5mb3JtYXRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBjb250ZW50cy5jb250ZW50O1xuICAgICAgICB0aGlzLl9wYXRocy5jbGVhcigpO1xuICAgICAgICBjb250ZW50cy5jb250ZW50LmZvckVhY2goKG1vZGVsKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9wYXRocy5hZGQobW9kZWwucGF0aCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgYSBjaGFuZ2UgdG8gdGhlIHJ1bm5pbmcgc2Vzc2lvbnMuXG4gICAgICovXG4gICAgb25SdW5uaW5nQ2hhbmdlZChzZW5kZXIsIG1vZGVscykge1xuICAgICAgICB0aGlzLl9wb3B1bGF0ZVNlc3Npb25zKG1vZGVscyk7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hlZC5lbWl0KHZvaWQgMCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBhIGNoYW5nZSBvbiB0aGUgY29udGVudHMgbWFuYWdlci5cbiAgICAgKi9cbiAgICBvbkZpbGVDaGFuZ2VkKHNlbmRlciwgY2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLl9tb2RlbC5wYXRoO1xuICAgICAgICBjb25zdCB7IHNlc3Npb25zIH0gPSB0aGlzLm1hbmFnZXIuc2VydmljZXM7XG4gICAgICAgIGNvbnN0IHsgb2xkVmFsdWUsIG5ld1ZhbHVlIH0gPSBjaGFuZ2U7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gb2xkVmFsdWUgJiYgb2xkVmFsdWUucGF0aCAmJiBQYXRoRXh0LmRpcm5hbWUob2xkVmFsdWUucGF0aCkgPT09IHBhdGhcbiAgICAgICAgICAgID8gb2xkVmFsdWVcbiAgICAgICAgICAgIDogbmV3VmFsdWUgJiYgbmV3VmFsdWUucGF0aCAmJiBQYXRoRXh0LmRpcm5hbWUobmV3VmFsdWUucGF0aCkgPT09IHBhdGhcbiAgICAgICAgICAgICAgICA/IG5ld1ZhbHVlXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIC8vIElmIGVpdGhlciB0aGUgb2xkIHZhbHVlIG9yIHRoZSBuZXcgdmFsdWUgaXMgaW4gdGhlIGN1cnJlbnQgcGF0aCwgdXBkYXRlLlxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZvaWQgdGhpcy5fcG9sbC5yZWZyZXNoKCk7XG4gICAgICAgICAgICB0aGlzLl9wb3B1bGF0ZVNlc3Npb25zKHNlc3Npb25zLnJ1bm5pbmcoKSk7XG4gICAgICAgICAgICB0aGlzLl9maWxlQ2hhbmdlZC5lbWl0KGNoYW5nZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUG9wdWxhdGUgdGhlIG1vZGVsJ3Mgc2Vzc2lvbnMgY29sbGVjdGlvbi5cbiAgICAgKi9cbiAgICBfcG9wdWxhdGVTZXNzaW9ucyhtb2RlbHMpIHtcbiAgICAgICAgdGhpcy5fc2Vzc2lvbnMubGVuZ3RoID0gMDtcbiAgICAgICAgZWFjaChtb2RlbHMsIG1vZGVsID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXRocy5oYXMobW9kZWwucGF0aCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXNzaW9ucy5wdXNoKG1vZGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuLyoqXG4gKiBGaWxlIGJyb3dzZXIgbW9kZWwgd2hlcmUgaGlkZGVuIGZpbGVzIGluY2x1c2lvbiBjYW4gYmUgdG9nZ2xlZCBvbi9vZmYuXG4gKi9cbmV4cG9ydCBjbGFzcyBUb2dnbGFibGVIaWRkZW5GaWxlQnJvd3Nlck1vZGVsIGV4dGVuZHMgRmlsZUJyb3dzZXJNb2RlbCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5faW5jbHVkZUhpZGRlbkZpbGVzID0gb3B0aW9ucy5pbmNsdWRlSGlkZGVuRmlsZXMgfHwgZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpdGVyYXRvciBvdmVyIHRoZSBtb2RlbCdzIGl0ZW1zIGZpbHRlcmluZyBoaWRkZW4gZmlsZXMgb3V0IGlmIG5lY2Vzc2FyeS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgbmV3IGl0ZXJhdG9yIG92ZXIgdGhlIG1vZGVsJ3MgaXRlbXMuXG4gICAgICovXG4gICAgaXRlbXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmNsdWRlSGlkZGVuRmlsZXNcbiAgICAgICAgICAgID8gc3VwZXIuaXRlbXMoKVxuICAgICAgICAgICAgOiBmaWx0ZXIoc3VwZXIuaXRlbXMoKSwgdmFsdWUgPT4gIXZhbHVlLm5hbWUuc3RhcnRzV2l0aCgnLicpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBpbmNsdXNpb24gb2YgaGlkZGVuIGZpbGVzLiBUcmlnZ2VycyBhIG1vZGVsIHJlZnJlc2guXG4gICAgICovXG4gICAgc2hvd0hpZGRlbkZpbGVzKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2luY2x1ZGVIaWRkZW5GaWxlcyA9IHZhbHVlO1xuICAgICAgICB2b2lkIHRoaXMucmVmcmVzaCgpO1xuICAgIH1cbn1cbi8qKlxuICogRmlsZSBicm93c2VyIG1vZGVsIHdpdGggb3B0aW9uYWwgZmlsdGVyIG9uIGVsZW1lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWx0ZXJGaWxlQnJvd3Nlck1vZGVsIGV4dGVuZHMgVG9nZ2xhYmxlSGlkZGVuRmlsZUJyb3dzZXJNb2RlbCB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fZmlsdGVyID0gb3B0aW9ucy5maWx0ZXIgPyBvcHRpb25zLmZpbHRlciA6IG1vZGVsID0+IHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbiBpdGVyYXRvciBvdmVyIHRoZSBmaWx0ZXJlZCBtb2RlbCdzIGl0ZW1zLlxuICAgICAqXG4gICAgICogQHJldHVybnMgQSBuZXcgaXRlcmF0b3Igb3ZlciB0aGUgbW9kZWwncyBpdGVtcy5cbiAgICAgKi9cbiAgICBpdGVtcygpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcihzdXBlci5pdGVtcygpLCAodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUudHlwZSA9PT0gJ2RpcmVjdG9yeScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9maWx0ZXIodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0RmlsdGVyKGZpbHRlcikge1xuICAgICAgICB0aGlzLl9maWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgIHZvaWQgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9kZWwuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgRGlhbG9nLCBzZXRUb29sYmFyLCBUb29sYmFyQnV0dG9uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgUGF0aEV4dCB9IGZyb20gJ0BqdXB5dGVybGFiL2NvcmV1dGlscyc7XG5pbXBvcnQgeyBudWxsVHJhbnNsYXRvciB9IGZyb20gJ0BqdXB5dGVybGFiL3RyYW5zbGF0aW9uJztcbmltcG9ydCB7IG5ld0ZvbGRlckljb24sIHJlZnJlc2hJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgeyB0b0FycmF5IH0gZnJvbSAnQGx1bWluby9hbGdvcml0aG0nO1xuaW1wb3J0IHsgUGFuZWxMYXlvdXQsIFdpZGdldCB9IGZyb20gJ0BsdW1pbm8vd2lkZ2V0cyc7XG5pbXBvcnQgeyBGaWxlQnJvd3NlciB9IGZyb20gJy4vYnJvd3Nlcic7XG5pbXBvcnQgeyBGaWx0ZXJGaWxlQnJvd3Nlck1vZGVsIH0gZnJvbSAnLi9tb2RlbCc7XG4vKipcbiAqIFRoZSBjbGFzcyBuYW1lIGFkZGVkIHRvIG9wZW4gZmlsZSBkaWFsb2dcbiAqL1xuY29uc3QgT1BFTl9ESUFMT0dfQ0xBU1MgPSAnanAtT3Blbi1EaWFsb2cnO1xuLyoqXG4gKiBOYW1lc3BhY2UgZm9yIGZpbGUgZGlhbG9nXG4gKi9cbmV4cG9ydCB2YXIgRmlsZURpYWxvZztcbihmdW5jdGlvbiAoRmlsZURpYWxvZykge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbmQgc2hvdyBhIG9wZW4gZmlsZXMgZGlhbG9nLlxuICAgICAqXG4gICAgICogTm90ZTogaWYgbm90aGluZyBpcyBzZWxlY3RlZCB3aGVuIGBnZXRWYWx1ZWAgd2lsbCByZXR1cm4gdGhlIGJyb3dzZXJcbiAgICAgKiBtb2RlbCBjdXJyZW50IHBhdGguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIFRoZSBkaWFsb2cgc2V0dXAgb3B0aW9ucy5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggd2hldGhlciB0aGUgZGlhbG9nIHdhcyBhY2NlcHRlZC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRPcGVuRmlsZXMob3B0aW9ucykge1xuICAgICAgICBjb25zdCB0cmFuc2xhdG9yID0gb3B0aW9ucy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICBjb25zdCBkaWFsb2dPcHRpb25zID0ge1xuICAgICAgICAgICAgdGl0bGU6IG9wdGlvbnMudGl0bGUsXG4gICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgRGlhbG9nLmNhbmNlbEJ1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnQ2FuY2VsJykgfSksXG4gICAgICAgICAgICAgICAgRGlhbG9nLm9rQnV0dG9uKHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdTZWxlY3QnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZm9jdXNOb2RlU2VsZWN0b3I6IG9wdGlvbnMuZm9jdXNOb2RlU2VsZWN0b3IsXG4gICAgICAgICAgICBob3N0OiBvcHRpb25zLmhvc3QsXG4gICAgICAgICAgICByZW5kZXJlcjogb3B0aW9ucy5yZW5kZXJlcixcbiAgICAgICAgICAgIGJvZHk6IG5ldyBPcGVuRGlhbG9nKG9wdGlvbnMubWFuYWdlciwgb3B0aW9ucy5maWx0ZXIsIHRyYW5zbGF0b3IpXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coZGlhbG9nT3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBkaWFsb2cubGF1bmNoKCk7XG4gICAgfVxuICAgIEZpbGVEaWFsb2cuZ2V0T3BlbkZpbGVzID0gZ2V0T3BlbkZpbGVzO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhbmQgc2hvdyBhIG9wZW4gZGlyZWN0b3J5IGRpYWxvZy5cbiAgICAgKlxuICAgICAqIE5vdGU6IGlmIG5vdGhpbmcgaXMgc2VsZWN0ZWQgd2hlbiBgZ2V0VmFsdWVgIHdpbGwgcmV0dXJuIHRoZSBicm93c2VyXG4gICAgICogbW9kZWwgY3VycmVudCBwYXRoLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgZGlhbG9nIHNldHVwIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHdoZXRoZXIgdGhlIGRpYWxvZyB3YXMgYWNjZXB0ZWQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0RXhpc3RpbmdEaXJlY3Rvcnkob3B0aW9ucykge1xuICAgICAgICByZXR1cm4gZ2V0T3BlbkZpbGVzKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyksIHsgZmlsdGVyOiBtb2RlbCA9PiBmYWxzZSB9KSk7XG4gICAgfVxuICAgIEZpbGVEaWFsb2cuZ2V0RXhpc3RpbmdEaXJlY3RvcnkgPSBnZXRFeGlzdGluZ0RpcmVjdG9yeTtcbn0pKEZpbGVEaWFsb2cgfHwgKEZpbGVEaWFsb2cgPSB7fSkpO1xuLyoqXG4gKiBPcGVuIGRpYWxvZyB3aWRnZXRcbiAqL1xuY2xhc3MgT3BlbkRpYWxvZyBleHRlbmRzIFdpZGdldCB7XG4gICAgY29uc3RydWN0b3IobWFuYWdlciwgZmlsdGVyLCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yICE9PSBudWxsICYmIHRyYW5zbGF0b3IgIT09IHZvaWQgMCA/IHRyYW5zbGF0b3IgOiBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhPUEVOX0RJQUxPR19DTEFTUyk7XG4gICAgICAgIHRoaXMuX2Jyb3dzZXIgPSBQcml2YXRlLmNyZWF0ZUZpbHRlcmVkRmlsZUJyb3dzZXIoJ2ZpbHRlcmVkLWZpbGUtYnJvd3Nlci1kaWFsb2cnLCBtYW5hZ2VyLCBmaWx0ZXIsIHt9LCB0cmFuc2xhdG9yKTtcbiAgICAgICAgLy8gQWRkIHRvb2xiYXIgaXRlbXNcbiAgICAgICAgc2V0VG9vbGJhcih0aGlzLl9icm93c2VyLCAoYnJvd3NlcikgPT4gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICduZXctZm9sZGVyJyxcbiAgICAgICAgICAgICAgICB3aWRnZXQ6IG5ldyBUb29sYmFyQnV0dG9uKHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogbmV3Rm9sZGVySWNvbixcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3Nlci5jcmVhdGVOZXdEaXJlY3RvcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogdHJhbnMuX18oJ05ldyBGb2xkZXInKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdyZWZyZXNoZXInLFxuICAgICAgICAgICAgICAgIHdpZGdldDogbmV3IFRvb2xiYXJCdXR0b24oe1xuICAgICAgICAgICAgICAgICAgICBpY29uOiByZWZyZXNoSWNvbixcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJvd3Nlci5tb2RlbC5yZWZyZXNoKCkuY2F0Y2gocmVhc29uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gcmVmcmVzaCBmaWxlIGJyb3dzZXIgaW4gb3BlbiBkaWFsb2cuJywgcmVhc29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiB0cmFucy5fXygnUmVmcmVzaCBGaWxlIExpc3QnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIF0pO1xuICAgICAgICAvLyBCdWlsZCB0aGUgc3ViIHdpZGdldHNcbiAgICAgICAgY29uc3QgbGF5b3V0ID0gbmV3IFBhbmVsTGF5b3V0KCk7XG4gICAgICAgIGxheW91dC5hZGRXaWRnZXQodGhpcy5fYnJvd3Nlcik7XG4gICAgICAgIC8vIFNldCBXaWRnZXQgY29udGVudFxuICAgICAgICB0aGlzLmxheW91dCA9IGxheW91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzZWxlY3RlZCBpdGVtcy5cbiAgICAgKi9cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdG9BcnJheSh0aGlzLl9icm93c2VyLnNlbGVjdGVkSXRlbXMoKSk7XG4gICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gY3VycmVudCBwYXRoXG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogdGhpcy5fYnJvd3Nlci5tb2RlbC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBQYXRoRXh0LmJhc2VuYW1lKHRoaXMuX2Jyb3dzZXIubW9kZWwucGF0aCksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkaXJlY3RvcnknLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogJ3Vua25vd24nLFxuICAgICAgICAgICAgICAgICAgICBsYXN0X21vZGlmaWVkOiAndW5rbm93bicsXG4gICAgICAgICAgICAgICAgICAgIG1pbWV0eXBlOiAndGV4dC9wbGFpbicsXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogJ3RleHQnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb247XG4gICAgICAgIH1cbiAgICB9XG59XG52YXIgUHJpdmF0ZTtcbihmdW5jdGlvbiAoUHJpdmF0ZSkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBmaWxlIGJyb3dzZXIgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWQgLSBUaGUgd2lkZ2V0L0RPTSBpZCBvZiB0aGUgZmlsZSBicm93c2VyLlxuICAgICAqXG4gICAgICogQHBhcmFtIG1hbmFnZXIgLSBBIGRvY3VtZW50IG1hbmFnZXIgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmlsdGVyIC0gZnVuY3Rpb24gdG8gZmlsdGVyIGZpbGUgYnJvd3NlciBpdGVtLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBUaGUgb3B0aW9uYWwgZmlsZSBicm93c2VyIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuICAgICAqXG4gICAgICogIyMjIyBOb3Rlc1xuICAgICAqIFRoZSBJRCBwYXJhbWV0ZXIgaXMgdXNlZCB0byBzZXQgdGhlIHdpZGdldCBJRC4gSXQgaXMgYWxzbyB1c2VkIGFzIHBhcnQgb2ZcbiAgICAgKiB0aGUgdW5pcXVlIGtleSBuZWNlc3NhcnkgdG8gc3RvcmUgdGhlIGZpbGUgYnJvd3NlcidzIHJlc3RvcmF0aW9uIGRhdGEgaW5cbiAgICAgKiB0aGUgc3RhdGUgZGF0YWJhc2UgaWYgdGhhdCBmdW5jdGlvbmFsaXR5IGlzIGVuYWJsZWQuXG4gICAgICpcbiAgICAgKiBJZiwgYWZ0ZXIgdGhlIGZpbGUgYnJvd3NlciBoYXMgYmVlbiBnZW5lcmF0ZWQgYnkgdGhlIGZhY3RvcnksIHRoZSBJRCBvZiB0aGVcbiAgICAgKiByZXN1bHRpbmcgd2lkZ2V0IGlzIGNoYW5nZWQgYnkgY2xpZW50IGNvZGUsIHRoZSByZXN0b3JhdGlvbiBmdW5jdGlvbmFsaXR5XG4gICAgICogd2lsbCBub3QgYmUgZGlzcnVwdGVkIGFzIGxvbmcgYXMgdGhlcmUgYXJlIG5vIElEIGNvbGxpc2lvbnMsIGkuZS4sIGFzIGxvbmdcbiAgICAgKiBhcyB0aGUgaW5pdGlhbCBJRCBwYXNzZWQgaW50byB0aGUgZmFjdG9yeSBpcyB1c2VkIGZvciBvbmx5IG9uZSBmaWxlIGJyb3dzZXJcbiAgICAgKiBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBQcml2YXRlLmNyZWF0ZUZpbHRlcmVkRmlsZUJyb3dzZXIgPSAoaWQsIG1hbmFnZXIsIGZpbHRlciwgb3B0aW9ucyA9IHt9LCB0cmFuc2xhdG9yKSA9PiB7XG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCBtb2RlbCA9IG5ldyBGaWx0ZXJGaWxlQnJvd3Nlck1vZGVsKHtcbiAgICAgICAgICAgIG1hbmFnZXIsXG4gICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICB0cmFuc2xhdG9yLFxuICAgICAgICAgICAgZHJpdmVOYW1lOiBvcHRpb25zLmRyaXZlTmFtZSxcbiAgICAgICAgICAgIHJlZnJlc2hJbnRlcnZhbDogb3B0aW9ucy5yZWZyZXNoSW50ZXJ2YWxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IG5ldyBGaWxlQnJvd3Nlcih7XG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgdHJhbnNsYXRvclxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHdpZGdldDtcbiAgICB9O1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vcGVuZGlhbG9nLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IFRva2VuIH0gZnJvbSAnQGx1bWluby9jb3JldXRpbHMnO1xuLyogdHNsaW50OmRpc2FibGUgKi9cbi8qKlxuICogVGhlIHBhdGggdHJhY2tlciB0b2tlbi5cbiAqL1xuZXhwb3J0IGNvbnN0IElGaWxlQnJvd3NlckZhY3RvcnkgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL2ZpbGVicm93c2VyOklGaWxlQnJvd3NlckZhY3RvcnknKTtcbi8qKlxuICogVGhlIHRva2VuIHRoYXQgaW5kaWNhdGVzIHRoZSBkZWZhdWx0IGZpbGUgYnJvd3NlciBjb21tYW5kcyBhcmUgbG9hZGVkLlxuICovXG5leHBvcnQgY29uc3QgSUZpbGVCcm93c2VyQ29tbWFuZHMgPSBuZXcgVG9rZW4oJ0BqdXB5dGVybGFiL2ZpbGVicm93c2VyOklGaWxlQnJvd3NlckNvbW1hbmRzJyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b2tlbnMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgc2hvd0Vycm9yTWVzc2FnZSwgVG9vbGJhckJ1dHRvbiB9IGZyb20gJ0BqdXB5dGVybGFiL2FwcHV0aWxzJztcbmltcG9ydCB7IG51bGxUcmFuc2xhdG9yIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgZmlsZVVwbG9hZEljb24gfSBmcm9tICdAanVweXRlcmxhYi91aS1jb21wb25lbnRzJztcbi8qKlxuICogQSB3aWRnZXQgd2hpY2ggcHJvdmlkZXMgYW4gdXBsb2FkIGJ1dHRvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFVwbG9hZGVyIGV4dGVuZHMgVG9vbGJhckJ1dHRvbiB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgbmV3IGZpbGUgYnJvd3NlciBidXR0b25zIHdpZGdldC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIGljb246IGZpbGVVcGxvYWRJY29uLFxuICAgICAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lucHV0LmNsaWNrKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogUHJpdmF0ZS50cmFuc2xhdGVUb29sVGlwKG9wdGlvbnMudHJhbnNsYXRvcilcbiAgICAgICAgfSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgJ2NoYW5nZScgaGFuZGxlciBmb3IgdGhlIGlucHV0IGZpZWxkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fb25JbnB1dENoYW5nZWQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmaWxlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2lucHV0LmZpbGVzKTtcbiAgICAgICAgICAgIGNvbnN0IHBlbmRpbmcgPSBmaWxlcy5tYXAoZmlsZSA9PiB0aGlzLmZpbGVCcm93c2VyTW9kZWwudXBsb2FkKGZpbGUpKTtcbiAgICAgICAgICAgIHZvaWQgUHJvbWlzZS5hbGwocGVuZGluZykuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHZvaWQgc2hvd0Vycm9yTWVzc2FnZSh0aGlzLl90cmFucy5fcCgnc2hvd0Vycm9yTWVzc2FnZScsICdVcGxvYWQgRXJyb3InKSwgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgJ2NsaWNrJyBoYW5kbGVyIGZvciB0aGUgaW5wdXQgZmllbGQuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9vbklucHV0Q2xpY2tlZCA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIEluIG9yZGVyIHRvIGFsbG93IHJlcGVhdGVkIHVwbG9hZHMgb2YgdGhlIHNhbWUgZmlsZSAod2l0aCBkZWxldGUgaW4gYmV0d2VlbiksXG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGNsZWFyIHRoZSBpbnB1dCB2YWx1ZSB0byB0cmlnZ2VyIGEgY2hhbmdlIGV2ZW50LlxuICAgICAgICAgICAgdGhpcy5faW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5faW5wdXQgPSBQcml2YXRlLmNyZWF0ZVVwbG9hZElucHV0KCk7XG4gICAgICAgIHRoaXMuZmlsZUJyb3dzZXJNb2RlbCA9IG9wdGlvbnMubW9kZWw7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IG9wdGlvbnMudHJhbnNsYXRvciB8fCBudWxsVHJhbnNsYXRvcjtcbiAgICAgICAgdGhpcy5fdHJhbnMgPSB0aGlzLnRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICB0aGlzLl9pbnB1dC5vbmNsaWNrID0gdGhpcy5fb25JbnB1dENsaWNrZWQ7XG4gICAgICAgIHRoaXMuX2lucHV0Lm9uY2hhbmdlID0gdGhpcy5fb25JbnB1dENoYW5nZWQ7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLWlkLXVwbG9hZCcpO1xuICAgIH1cbn1cbi8qKlxuICogVGhlIG5hbWVzcGFjZSBmb3IgbW9kdWxlIHByaXZhdGUgZGF0YS5cbiAqL1xudmFyIFByaXZhdGU7XG4oZnVuY3Rpb24gKFByaXZhdGUpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIHVwbG9hZCBpbnB1dCBub2RlIGZvciBhIGZpbGUgYnV0dG9ucyB3aWRnZXQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlVXBsb2FkSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXQudHlwZSA9ICdmaWxlJztcbiAgICAgICAgaW5wdXQubXVsdGlwbGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuICAgIFByaXZhdGUuY3JlYXRlVXBsb2FkSW5wdXQgPSBjcmVhdGVVcGxvYWRJbnB1dDtcbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGUgdXBsb2FkIHRvb2x0aXAuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlVG9vbFRpcCh0cmFuc2xhdG9yKSB7XG4gICAgICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICBjb25zdCB0cmFucyA9IHRyYW5zbGF0b3IubG9hZCgnanVweXRlcmxhYicpO1xuICAgICAgICByZXR1cm4gdHJhbnMuX18oJ1VwbG9hZCBGaWxlcycpO1xuICAgIH1cbiAgICBQcml2YXRlLnRyYW5zbGF0ZVRvb2xUaXAgPSB0cmFuc2xhdGVUb29sVGlwO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11cGxvYWQuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuLy9cbmltcG9ydCB7IFZEb21Nb2RlbCwgVkRvbVJlbmRlcmVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgR3JvdXBJdGVtLCBQcm9ncmVzc0JhciwgVGV4dEl0ZW0gfSBmcm9tICdAanVweXRlcmxhYi9zdGF0dXNiYXInO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBBcnJheUV4dCB9IGZyb20gJ0BsdW1pbm8vYWxnb3JpdGhtJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vKipcbiAqIEhhbGYtc3BhY2luZyBiZXR3ZWVuIGl0ZW1zIGluIHRoZSBvdmVyYWxsIHN0YXR1cyBpdGVtLlxuICovXG5jb25zdCBIQUxGX1NQQUNJTkcgPSA0O1xuLyoqXG4gKiBBIHB1cmUgZnVuY3Rpb24gY29tcG9uZW50IGZvciBhIEZpbGVVcGxvYWQgc3RhdHVzIGl0ZW0uXG4gKlxuICogQHBhcmFtIHByb3BzOiB0aGUgcHJvcHMgZm9yIHRoZSBjb21wb25lbnQuXG4gKlxuICogQHJldHVybnMgYSB0c3ggY29tcG9uZW50IGZvciB0aGUgZmlsZSB1cGxvYWQgc3RhdHVzLlxuICovXG5mdW5jdGlvbiBGaWxlVXBsb2FkQ29tcG9uZW50KHByb3BzKSB7XG4gICAgY29uc3QgdHJhbnNsYXRvciA9IHByb3BzLnRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoR3JvdXBJdGVtLCB7IHNwYWNpbmc6IEhBTEZfU1BBQ0lORyB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRJdGVtLCB7IHNvdXJjZTogdHJhbnMuX18oJ1VwbG9hZGluZ+KApicpIH0pLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFByb2dyZXNzQmFyLCB7IHBlcmNlbnRhZ2U6IHByb3BzLnVwbG9hZCB9KSkpO1xufVxuLyoqXG4gKiBUaGUgdGltZSBmb3Igd2hpY2ggdG8gc2hvdyB0aGUgXCJDb21wbGV0ZSFcIiBtZXNzYWdlIGFmdGVyIHVwbG9hZGluZy5cbiAqL1xuY29uc3QgVVBMT0FEX0NPTVBMRVRFX01FU1NBR0VfTUlMTElTID0gMjAwMDtcbi8qKlxuICogU3RhdHVzIGJhciBpdGVtIHRvIGRpc3BsYXkgZmlsZSB1cGxvYWQgcHJvZ3Jlc3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkU3RhdHVzIGV4dGVuZHMgVkRvbVJlbmRlcmVyIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgRmlsZVVwbG9hZCBzdGF0dXMgaXRlbS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG5ldyBGaWxlVXBsb2FkU3RhdHVzLk1vZGVsKG9wdHMudHJhY2tlci5jdXJyZW50V2lkZ2V0ICYmIG9wdHMudHJhY2tlci5jdXJyZW50V2lkZ2V0Lm1vZGVsKSk7XG4gICAgICAgIHRoaXMuX29uQnJvd3NlckNoYW5nZSA9ICh0cmFja2VyLCBicm93c2VyKSA9PiB7XG4gICAgICAgICAgICBpZiAoYnJvd3NlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuYnJvd3Nlck1vZGVsID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuYnJvd3Nlck1vZGVsID0gYnJvd3Nlci5tb2RlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50cmFuc2xhdG9yID0gb3B0cy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgICAgICB0aGlzLl90cmFucyA9IHRoaXMudHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgICAgIHRoaXMuX3RyYWNrZXIgPSBvcHRzLnRyYWNrZXI7XG4gICAgICAgIHRoaXMuX3RyYWNrZXIuY3VycmVudENoYW5nZWQuY29ubmVjdCh0aGlzLl9vbkJyb3dzZXJDaGFuZ2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIEZpbGVVcGxvYWQgc3RhdHVzLlxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgdXBsb2FkUGF0aHMgPSB0aGlzLm1vZGVsLml0ZW1zO1xuICAgICAgICBpZiAodXBsb2FkUGF0aHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMubW9kZWwuaXRlbXNbMF07XG4gICAgICAgICAgICBpZiAoaXRlbS5jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHRJdGVtLCB7IHNvdXJjZTogdGhpcy5fdHJhbnMuX18oJ0NvbXBsZXRlIScpIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZpbGVVcGxvYWRDb21wb25lbnQsIHsgdXBsb2FkOiB0aGlzLm1vZGVsLml0ZW1zWzBdLnByb2dyZXNzLCB0cmFuc2xhdG9yOiB0aGlzLnRyYW5zbGF0b3IgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZVVwbG9hZENvbXBvbmVudCwgeyB1cGxvYWQ6IDEwMCwgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5fdHJhY2tlci5jdXJyZW50Q2hhbmdlZC5kaXNjb25uZWN0KHRoaXMuX29uQnJvd3NlckNoYW5nZSk7XG4gICAgfVxufVxuLyoqXG4gKiBBIG5hbWVzcGFjZSBmb3IgRmlsZVVwbG9hZCBjbGFzcyBzdGF0aWNzLlxuICovXG4oZnVuY3Rpb24gKEZpbGVVcGxvYWRTdGF0dXMpIHtcbiAgICAvKipcbiAgICAgKiBUaGUgVkRvbU1vZGVsIGZvciB0aGUgRmlsZVVwbG9hZCByZW5kZXJlci5cbiAgICAgKi9cbiAgICBjbGFzcyBNb2RlbCBleHRlbmRzIFZEb21Nb2RlbCB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb25zdHJ1Y3QgYSBuZXcgbW9kZWwuXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdHJ1Y3Rvcihicm93c2VyTW9kZWwpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEhhbmRsZSBhbiB1cGxvYWRDaGFuZ2VkIGV2ZW50IGluIHRoZSBmaWxlYnJvd3NlciBtb2RlbC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5fdXBsb2FkQ2hhbmdlZCA9IChicm93c2UsIHVwbG9hZHMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodXBsb2Fkcy5uYW1lID09PSAnc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogdXBsb2Fkcy5uZXdWYWx1ZS5wYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IHVwbG9hZHMubmV3VmFsdWUucHJvZ3Jlc3MgKiAxMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVwbG9hZHMubmFtZSA9PT0gJ3VwZGF0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gQXJyYXlFeHQuZmluZEZpcnN0SW5kZXgodGhpcy5faXRlbXMsIHZhbCA9PiB2YWwucGF0aCA9PT0gdXBsb2Fkcy5vbGRWYWx1ZS5wYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zW2lkeF0ucHJvZ3Jlc3MgPSB1cGxvYWRzLm5ld1ZhbHVlLnByb2dyZXNzICogMTAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHVwbG9hZHMubmFtZSA9PT0gJ2ZpbmlzaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gQXJyYXlFeHQuZmluZEZpcnN0SW5kZXgodGhpcy5faXRlbXMsIHZhbCA9PiB2YWwucGF0aCA9PT0gdXBsb2Fkcy5vbGRWYWx1ZS5wYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zW2lkeF0uY29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXJyYXlFeHQucmVtb3ZlQXQodGhpcy5faXRlbXMsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgVVBMT0FEX0NPTVBMRVRFX01FU1NBR0VfTUlMTElTKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh1cGxvYWRzLm5hbWUgPT09ICdmYWlsdXJlJykge1xuICAgICAgICAgICAgICAgICAgICBBcnJheUV4dC5yZW1vdmVGaXJzdFdoZXJlKHRoaXMuX2l0ZW1zLCB2YWwgPT4gdmFsLnBhdGggPT09IHVwbG9hZHMubmV3VmFsdWUucGF0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVDaGFuZ2VkLmVtaXQodm9pZCAwKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9pdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fYnJvd3Nlck1vZGVsID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYnJvd3Nlck1vZGVsID0gYnJvd3Nlck1vZGVsO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgY3VycmVudGx5IHVwbG9hZGluZyBpdGVtcy5cbiAgICAgICAgICovXG4gICAgICAgIGdldCBpdGVtcygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGN1cnJlbnQgZmlsZSBicm93c2VyIG1vZGVsLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0IGJyb3dzZXJNb2RlbCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9icm93c2VyTW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGJyb3dzZXJNb2RlbChicm93c2VyTW9kZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZEJyb3dzZXJNb2RlbCA9IHRoaXMuX2Jyb3dzZXJNb2RlbDtcbiAgICAgICAgICAgIGlmIChvbGRCcm93c2VyTW9kZWwpIHtcbiAgICAgICAgICAgICAgICBvbGRCcm93c2VyTW9kZWwudXBsb2FkQ2hhbmdlZC5kaXNjb25uZWN0KHRoaXMuX3VwbG9hZENoYW5nZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYnJvd3Nlck1vZGVsID0gYnJvd3Nlck1vZGVsO1xuICAgICAgICAgICAgdGhpcy5faXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9icm93c2VyTW9kZWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9icm93c2VyTW9kZWwudXBsb2FkQ2hhbmdlZC5jb25uZWN0KHRoaXMuX3VwbG9hZENoYW5nZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh2b2lkIDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIEZpbGVVcGxvYWRTdGF0dXMuTW9kZWwgPSBNb2RlbDtcbn0pKEZpbGVVcGxvYWRTdGF0dXMgfHwgKEZpbGVVcGxvYWRTdGF0dXMgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXBsb2Fkc3RhdHVzLmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=