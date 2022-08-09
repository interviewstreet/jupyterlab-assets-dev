(self["webpackChunk_jupyterlab_application_top"] = self["webpackChunk_jupyterlab_application_top"] || []).push([["packages_extensionmanager_lib_index_js"],{

/***/ "../../packages/extensionmanager/lib/build-helper.js":
/*!***********************************************************!*\
  !*** ../../packages/extensionmanager/lib/build-helper.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "doBuild": () => (/* binding */ doBuild)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * Instruct the server to perform a build
 *
 * @param builder the build manager
 */
function doBuild(app, builder, translator) {
    translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    if (builder.isAvailable) {
        return builder
            .build()
            .then(() => {
            return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: trans.__('Build Complete'),
                body: (react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null,
                    trans.__('Build successfully completed, reload page?'),
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement("br", null),
                    trans.__('You will lose any unsaved changes.'))),
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({
                        label: trans.__('Reload Without Saving'),
                        actions: ['reload']
                    }),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: trans.__('Save and Reload') })
                ],
                hasClose: true
            });
        })
            .then(({ button: { accept, actions } }) => {
            if (accept) {
                void app.commands
                    .execute('docmanager:save')
                    .then(() => {
                    location.reload();
                })
                    .catch((err) => {
                    void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showErrorMessage)(trans.__('Save Failed'), {
                        message: react__WEBPACK_IMPORTED_MODULE_2__.createElement("pre", null, err.message)
                    });
                });
            }
            else if (actions.includes('reload')) {
                location.reload();
            }
        })
            .catch(err => {
            void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                title: trans.__('Build Failed'),
                body: react__WEBPACK_IMPORTED_MODULE_2__.createElement("pre", null, err.message)
            });
        });
    }
    return Promise.resolve();
}
//# sourceMappingURL=build-helper.js.map

/***/ }),

/***/ "../../packages/extensionmanager/lib/companions.js":
/*!*********************************************************!*\
  !*** ../../packages/extensionmanager/lib/companions.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "presentCompanions": () => (/* binding */ presentCompanions)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



// Mapping of manager name to function that take name and gives command
const managerCommand = {
    pip: name => `pip install ${name}`,
    conda: name => `conda install -c conda-forge ${name}`
};
function getInstallCommands(info) {
    var _a, _b, _c, _d;
    const commands = Array();
    for (const manager of info.managers) {
        const name = (_c = (_b = (_a = info.overrides) === null || _a === void 0 ? void 0 : _a[manager]) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : info.base.name;
        if (!name) {
            console.warn(`No package name found for manager ${manager}`);
            continue;
        }
        const command = (_d = managerCommand[manager]) === null || _d === void 0 ? void 0 : _d.call(managerCommand, name);
        if (!command) {
            console.warn(`Don't know how to install packages for manager ${manager}`);
        }
        commands.push(command);
    }
    return commands;
}
/**
 * Prompt the user what do about companion packages, if present.
 *
 * @param builder the build manager
 */
function presentCompanions(kernelCompanions, serverCompanion, translator) {
    translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    const entries = [];
    if (serverCompanion) {
        entries.push(react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", { key: "server-companion" },
            trans.__(`This package has indicated that it needs a corresponding server
extension. Please contact your Administrator to update the server with
one of the following commands:`),
            getInstallCommands(serverCompanion).map(command => {
                return (react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", { key: command },
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement("code", null, command)));
            })));
    }
    if (kernelCompanions.length > 0) {
        entries.push(react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", { key: 'kernel-companion' }, trans.__('This package has indicated that it needs a corresponding package for the kernel.')));
        for (const [index, entry] of kernelCompanions.entries()) {
            entries.push(react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", { key: `companion-${index}` }, trans.__(`The package <code>%1</code>, is required by the following kernels:`, entry.kernelInfo.base.name)));
            const kernelEntries = [];
            for (const [index, kernel] of entry.kernels.entries()) {
                kernelEntries.push(react__WEBPACK_IMPORTED_MODULE_2__.createElement("li", { key: `kernels-${index}` },
                    react__WEBPACK_IMPORTED_MODULE_2__.createElement("code", null, kernel.display_name)));
            }
            entries.push(react__WEBPACK_IMPORTED_MODULE_2__.createElement("ul", { key: 'kernel-companion-end' }, kernelEntries));
            entries.push(react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", { key: `kernel-companion-${index}` },
                trans.__(`This package has indicated that it needs a corresponding kernel
package. Please contact your Administrator to update the server with
one of the following commands:`),
                getInstallCommands(entry.kernelInfo).map(command => {
                    return (react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", { key: command },
                        react__WEBPACK_IMPORTED_MODULE_2__.createElement("code", null, command)));
                })));
        }
    }
    const body = (react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null,
        entries,
        react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", null, trans.__(`You should make sure that the indicated packages are installed before
trying to use the extension. Do you want to continue with the extension
installation?`))));
    const hasKernelCompanions = kernelCompanions.length > 0;
    const hasServerCompanion = !!serverCompanion;
    let title = '';
    if (hasKernelCompanions && hasServerCompanion) {
        title = trans.__('Kernel and Server Companions');
    }
    else if (hasKernelCompanions) {
        title = trans.__('Kernel Companions');
    }
    else {
        title = trans.__('Server Companion');
    }
    return (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
        title,
        body,
        buttons: [
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: trans.__('Cancel') }),
            _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({
                label: trans.__('OK'),
                caption: trans.__('Install the JupyterLab extension.')
            })
        ]
    }).then(result => {
        return result.button.accept;
    });
}
//# sourceMappingURL=companions.js.map

/***/ }),

/***/ "../../packages/extensionmanager/lib/dialog.js":
/*!*****************************************************!*\
  !*** ../../packages/extensionmanager/lib/dialog.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reportInstallError": () => (/* binding */ reportInstallError)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * Show a dialog box reporting an error during installation of an extension.
 *
 * @param name The name of the extension
 * @param errorMessage Any error message giving details about the failure.
 */
function reportInstallError(name, errorMessage, translator) {
    translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    const entries = [];
    entries.push(react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", null, trans.__('An error occurred installing <code>%1</code>.', name)));
    if (errorMessage) {
        entries.push(react__WEBPACK_IMPORTED_MODULE_2__.createElement("p", null,
            react__WEBPACK_IMPORTED_MODULE_2__.createElement("span", { className: "jp-extensionmanager-dialog-subheader" }, trans.__('Error message:'))), react__WEBPACK_IMPORTED_MODULE_2__.createElement("pre", null, errorMessage.trim()));
    }
    const body = react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", { className: "jp-extensionmanager-dialog" }, entries);
    void (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
        title: trans.__('Extension Installation Error'),
        body,
        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: trans.__('OK') })]
    });
}
//# sourceMappingURL=dialog.js.map

/***/ }),

/***/ "../../packages/extensionmanager/lib/index.js":
/*!****************************************************!*\
  !*** ../../packages/extensionmanager/lib/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListModel": () => (/* reexport safe */ _model__WEBPACK_IMPORTED_MODULE_0__.ListModel),
/* harmony export */   "Searcher": () => (/* reexport safe */ _npm__WEBPACK_IMPORTED_MODULE_1__.Searcher),
/* harmony export */   "isJupyterOrg": () => (/* reexport safe */ _npm__WEBPACK_IMPORTED_MODULE_1__.isJupyterOrg),
/* harmony export */   "Lister": () => (/* reexport safe */ _listings__WEBPACK_IMPORTED_MODULE_2__.Lister),
/* harmony export */   "CollapsibleSection": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_3__.CollapsibleSection),
/* harmony export */   "ExtensionView": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_3__.ExtensionView),
/* harmony export */   "ListView": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_3__.ListView),
/* harmony export */   "SearchBar": () => (/* reexport safe */ _widget__WEBPACK_IMPORTED_MODULE_3__.SearchBar)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "../../packages/extensionmanager/lib/model.js");
/* harmony import */ var _npm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./npm */ "../../packages/extensionmanager/lib/npm.js");
/* harmony import */ var _listings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listings */ "../../packages/extensionmanager/lib/listings.js");
/* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./widget */ "../../packages/extensionmanager/lib/widget.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * @packageDocumentation
 * @module extensionmanager
 */




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/extensionmanager/lib/listings.js":
/*!*******************************************************!*\
  !*** ../../packages/extensionmanager/lib/listings.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lister": () => (/* binding */ Lister)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/signaling */ "webpack/sharing/consume/default/@lumino/signaling/@lumino/signaling?be3a");
/* harmony import */ var _lumino_signaling__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_signaling__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.



/**
 * An object for getting listings from the server API.
 */
class Lister {
    /**
     * Create a Lister object.
     */
    constructor() {
        this._listings = null;
        /**
         */
        this._listingsLoaded = new _lumino_signaling__WEBPACK_IMPORTED_MODULE_2__.Signal(this);
        requestAPI('@jupyterlab/extensionmanager-extension/listings.json')
            .then(data => {
            this._listings = {
                mode: 'default',
                uris: [],
                entries: []
            };
            if (data.blocked_extensions_uris.length > 0 &&
                data.allowed_extensions_uris.length > 0) {
                console.warn('Simultaneous black and white list are not allowed.');
                this._listings = {
                    mode: 'invalid',
                    uris: [],
                    entries: []
                };
            }
            else if (data.blocked_extensions_uris.length > 0 ||
                data.allowed_extensions_uris.length > 0) {
                this._listings = {
                    mode: data.blocked_extensions_uris.length > 0 ? 'block' : 'allow',
                    uris: data.blocked_extensions_uris.length > 0
                        ? data.blocked_extensions_uris
                        : data.allowed_extensions_uris,
                    entries: data.blocked_extensions_uris.length > 0
                        ? data.blocked_extensions
                        : data.allowed_extensions
                };
            }
            this._listingsLoaded.emit(this._listings);
        })
            .catch(error => {
            console.error(error);
        });
    }
    get listingsLoaded() {
        return this._listingsLoaded;
    }
}
/**
 * Call the listings API REST handler.
 *
 * @param endPoint API REST end point for the extension
 * @param init Initial values for the request
 * @returns The response body interpreted as JSON
 */
async function requestAPI(endPoint = '', init = {}) {
    // Make request to Jupyter API
    const settings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeSettings();
    const requestUrl = _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.URLExt.join(settings.baseUrl, settings.appUrl, 'api/listings/', endPoint);
    let response;
    try {
        response = await _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeRequest(requestUrl, init, settings);
    }
    catch (error) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.NetworkError(error);
    }
    const data = await response.json();
    if (!response.ok) {
        throw new _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.ResponseError(response, data.message);
    }
    return data;
}
//# sourceMappingURL=listings.js.map

/***/ }),

/***/ "../../packages/extensionmanager/lib/model.js":
/*!****************************************************!*\
  !*** ../../packages/extensionmanager/lib/model.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ListModel": () => (/* binding */ ListModel)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/services */ "webpack/sharing/consume/default/@jupyterlab/services/@jupyterlab/services");
/* harmony import */ var _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var semver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! semver */ "../../node_modules/semver/index.js");
/* harmony import */ var semver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(semver__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _build_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./build-helper */ "../../packages/extensionmanager/lib/build-helper.js");
/* harmony import */ var _companions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./companions */ "../../packages/extensionmanager/lib/companions.js");
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dialog */ "../../packages/extensionmanager/lib/dialog.js");
/* harmony import */ var _listings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./listings */ "../../packages/extensionmanager/lib/listings.js");
/* harmony import */ var _npm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./npm */ "../../packages/extensionmanager/lib/npm.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.










/**
 * The server API path for querying/modifying installed extensions.
 */
const EXTENSION_API_PATH = 'lab/api/extensions';
/**
 * Model for an extension list.
 */
class ListModel extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomModel {
    constructor(app, serviceManager, settings, translator) {
        super();
        /**
         * Contains an error message if an error occurred when querying installed extensions.
         */
        this.installedError = null;
        /**
         * Contains an error message if an error occurred when searching for extensions.
         */
        this.searchError = null;
        /**
         * Contains an error message if an error occurred when searching for lists.
         */
        this.blockedExtensionsError = null;
        /**
         * Contains an error message if an error occurred when querying the server extension.
         */
        this.serverConnectionError = null;
        /**
         * Contains an error message if the server has unfulfilled requirements.
         */
        this.serverRequirementsError = null;
        /**
         * Whether the model has finished async initialization.
         */
        this.initialized = false;
        /**
         * Whether a fresh build should be considered due to actions taken.
         */
        this.promptBuild = false;
        this.lister = new _listings__WEBPACK_IMPORTED_MODULE_5__.Lister();
        this._query = ''; // TODO: we may not need the null case?
        this._page = 0;
        this._pagination = 250;
        this._totalEntries = 0;
        this._pendingActions = [];
        this._totalblockedExtensionsFound = 0;
        this._totalallowedExtensionsFound = 0;
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_2__.nullTranslator;
        this._app = app;
        this._installed = [];
        this._searchResult = [];
        this.serviceManager = serviceManager;
        this.serverConnectionSettings = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeSettings();
        this._debouncedUpdate = new _lumino_polling__WEBPACK_IMPORTED_MODULE_3__.Debouncer(this.update.bind(this), 1000);
        this.lister.listingsLoaded.connect(this._listingIsLoaded, this);
        this.searcher = new _npm__WEBPACK_IMPORTED_MODULE_6__.Searcher(settings.composite['npmRegistry'], settings.composite['npmCdn'], settings.composite['enableCdn']);
        _isDisclaimed = settings.composite['disclaimed'] === true;
        settings.changed.connect(() => {
            _isDisclaimed = settings.composite['disclaimed'] === true;
            this.searcher = new _npm__WEBPACK_IMPORTED_MODULE_6__.Searcher(settings.composite['npmRegistry'], settings.composite['npmCdn'], settings.composite['enableCdn']);
            void this.update();
        });
    }
    _listingIsLoaded(_, listings) {
        this._listMode = listings.mode;
        this._blockedExtensionsArray = new Array();
        if (this._listMode === 'block') {
            listings.entries.map(e => {
                this._blockedExtensionsArray.push({
                    name: e.name,
                    regexp: new RegExp(e.name),
                    type: e.type,
                    reason: e.reason,
                    creation_date: e.creation_date,
                    last_update_date: e.last_update_date
                });
            });
        }
        this._allowedExtensionsArray = new Array();
        if (this._listMode === 'allow') {
            listings.entries.map(e => {
                this._allowedExtensionsArray.push({
                    name: e.name,
                    regexp: new RegExp(e.name),
                    type: e.type,
                    reason: e.reason,
                    creation_date: e.creation_date,
                    last_update_date: e.last_update_date
                });
            });
        }
        void this.initialize();
    }
    /**
     * A readonly array of the installed extensions.
     */
    get installed() {
        return this._installed;
    }
    /**
     * A readonly array containing the latest search result
     */
    get searchResult() {
        return this._searchResult;
    }
    /**
     * The current NPM repository search query.
     *
     * Setting its value triggers a new search.
     */
    get query() {
        return this._query;
    }
    set query(value) {
        this._query = value;
        void this._debouncedUpdate.invoke();
    }
    /**
     * The current NPM repository search page.
     *
     * The npm repository search is paginated by the `pagination` attribute.
     * The `page` value selects which page is used.
     *
     * Setting its value triggers a new search.
     */
    get page() {
        return this._page;
    }
    set page(value) {
        this._page = value;
        void this.update();
    }
    /**
     * The NPM repository search pagination.
     *
     * The npm repository search is paginated by the `pagination` attribute.
     * The `page` value selects which page is used.
     *
     * Setting its value triggers a new search.
     */
    get pagination() {
        return this._pagination;
    }
    set pagination(value) {
        this._pagination = value;
        void this.update();
    }
    /**
     * The total number of results in the current search.
     */
    get totalEntries() {
        return this._totalEntries;
    }
    /**
     * The list mode.
     */
    get listMode() {
        return this._listMode;
    }
    /**
     * The total number of blockedExtensions results in the current search.
     */
    get totalblockedExtensionsFound() {
        return this._totalblockedExtensionsFound;
    }
    /**
     * The total number of allowedExtensions results in the current search.
     */
    get totalallowedExtensionsFound() {
        return this._totalallowedExtensionsFound;
    }
    /**
     * Initialize the model.
     */
    initialize() {
        return this.update()
            .then(() => {
            this.initialized = true;
            this.stateChanged.emit(undefined);
        })
            .catch(() => {
            this.initialized = true;
            this.stateChanged.emit(undefined);
        });
    }
    /**
     * Whether there are currently any actions pending.
     */
    hasPendingActions() {
        return this._pendingActions.length > 0;
    }
    /**
     * Install an extension.
     *
     * @param entry An entry indicating which extension to install.
     */
    async install(entry) {
        if (entry.installed) {
            // Updating
            await this._performAction('install', entry).then(data => {
                if (data.status !== 'ok') {
                    (0,_dialog__WEBPACK_IMPORTED_MODULE_7__.reportInstallError)(entry.name, data.message, this.translator);
                }
                return this.update();
            });
        }
        await this.checkCompanionPackages(entry).then(shouldInstall => {
            if (shouldInstall) {
                return this._performAction('install', entry).then(data => {
                    if (data.status !== 'ok') {
                        (0,_dialog__WEBPACK_IMPORTED_MODULE_7__.reportInstallError)(entry.name, data.message, this.translator);
                    }
                    return this.update();
                });
            }
        });
    }
    /**
     * Uninstall an extension.
     *
     * @param entry An entry indicating which extension to uninstall.
     */
    async uninstall(entry) {
        if (!entry.installed) {
            throw new Error(`Not installed, cannot uninstall: ${entry.name}`);
        }
        await this._performAction('uninstall', entry);
        return this.update();
    }
    /**
     * Enable an extension.
     *
     * @param entry An entry indicating which extension to enable.
     */
    async enable(entry) {
        if (entry.enabled) {
            throw new Error(`Already enabled: ${entry.name}`);
        }
        await this._performAction('enable', entry);
        await this.update();
    }
    /**
     * Disable an extension.
     *
     * @param entry An entry indicating which extension to disable.
     */
    async disable(entry) {
        if (!entry.enabled) {
            throw new Error(`Already disabled: ${entry.name}`);
        }
        await this._performAction('disable', entry);
        await this.update();
    }
    /**
     * Check for companion packages in kernels or server.
     *
     * @param entry An entry indicating which extension to check.
     */
    checkCompanionPackages(entry) {
        return this.searcher
            .fetchPackageData(entry.name, entry.latest_version)
            .then(data => {
            if (!data || !data.jupyterlab || !data.jupyterlab.discovery) {
                return true;
            }
            const discovery = data.jupyterlab.discovery;
            const kernelCompanions = [];
            if (discovery.kernel) {
                // match specs
                for (const kernelInfo of discovery.kernel) {
                    const matches = Private.matchSpecs(kernelInfo, this.serviceManager.kernelspecs.specs);
                    kernelCompanions.push({ kernelInfo, kernels: matches });
                }
            }
            if (kernelCompanions.length < 1 && !discovery.server) {
                return true;
            }
            return (0,_companions__WEBPACK_IMPORTED_MODULE_8__.presentCompanions)(kernelCompanions, discovery.server, this.translator);
        });
    }
    /**
     * Trigger a build check to incorporate actions taken.
     */
    triggerBuildCheck() {
        const builder = this.serviceManager.builder;
        if (builder.isAvailable && !this.promptBuild) {
            const completed = builder.getStatus().then(response => {
                if (response.status === 'building') {
                    // Piggy-back onto existing build
                    // TODO: Can this cause dialog collision on build completion?
                    return (0,_build_helper__WEBPACK_IMPORTED_MODULE_9__.doBuild)(this._app, builder);
                }
                if (response.status !== 'needed') {
                    return;
                }
                if (!this.promptBuild) {
                    this.promptBuild = true;
                    this.stateChanged.emit(undefined);
                }
            });
            this._addPendingAction(completed);
        }
    }
    /**
     * Perform a build on the server
     */
    performBuild() {
        if (this.promptBuild) {
            this.promptBuild = false;
            this.stateChanged.emit(undefined);
        }
        const completed = (0,_build_helper__WEBPACK_IMPORTED_MODULE_9__.doBuild)(this._app, this.serviceManager.builder);
        this._addPendingAction(completed);
    }
    /**
     * Ignore a build recommendation
     */
    ignoreBuildRecommendation() {
        if (this.promptBuild) {
            this.promptBuild = false;
            this.stateChanged.emit(undefined);
        }
    }
    /**
     * Ignore a build recommendation
     */
    refreshInstalled() {
        const refresh = this.update(true);
        this._addPendingAction(refresh);
    }
    /**
     * Translate search results from an npm repository query into entries
     * and remove entries with 'deprecated' in the keyword list
     *
     * @param res Promise to an npm query result.
     */
    async translateSearchResult(res) {
        const entries = {};
        this._totalblockedExtensionsFound = 0;
        this._totalallowedExtensionsFound = 0;
        this._totalEntries = 0;
        for (const obj of (await res).objects) {
            const pkg = obj.package;
            if (pkg.keywords.indexOf('deprecated') >= 0) {
                continue;
            }
            this._totalEntries = this._totalEntries + 1;
            const isblockedExtensions = this.isListed(pkg.name, this._blockedExtensionsArray);
            if (isblockedExtensions) {
                this._totalblockedExtensionsFound =
                    this._totalblockedExtensionsFound + 1;
            }
            const isallowedExtensions = this.isListed(pkg.name, this._allowedExtensionsArray);
            if (isallowedExtensions) {
                this._totalallowedExtensionsFound =
                    this._totalallowedExtensionsFound + 1;
            }
            entries[pkg.name] = {
                name: pkg.name,
                description: pkg.description,
                url: 'homepage' in pkg.links
                    ? pkg.links.homepage
                    : 'repository' in pkg.links
                        ? pkg.links.repository
                        : pkg.links.npm,
                installed: false,
                enabled: false,
                status: null,
                latest_version: pkg.version,
                installed_version: '',
                blockedExtensionsEntry: isblockedExtensions,
                allowedExtensionsEntry: isallowedExtensions,
                pkg_type: 'source',
                install: undefined
            };
        }
        return entries;
    }
    /**
     * Translate installed extensions information from the server into entries.
     *
     * @param res Promise to the server reply data.
     */
    async translateInstalled(res) {
        const promises = [];
        const entries = {};
        for (const pkg of await res) {
            promises.push(res.then(info => {
                var _a, _b, _c;
                entries[pkg.name] = {
                    name: pkg.name,
                    description: pkg.description,
                    url: pkg.url,
                    installed: pkg.installed !== false,
                    enabled: pkg.enabled,
                    status: pkg.status,
                    latest_version: pkg.latest_version,
                    installed_version: pkg.installed_version,
                    blockedExtensionsEntry: this.isListed(pkg.name, this._blockedExtensionsArray),
                    allowedExtensionsEntry: this.isListed(pkg.name, this._allowedExtensionsArray),
                    pkg_type: pkg.pkg_type,
                    install: {
                        packageManager: (_a = pkg.install) === null || _a === void 0 ? void 0 : _a.packageManager,
                        packageName: (_b = pkg.install) === null || _b === void 0 ? void 0 : _b.packageName,
                        uninstallInstructions: (_c = pkg.install) === null || _c === void 0 ? void 0 : _c.uninstallInstructions
                    }
                };
            }));
        }
        return Promise.all(promises).then(() => {
            return entries;
        });
    }
    isListed(name, listArray) {
        let entry = undefined;
        listArray.forEach((listEntry) => {
            var _a;
            if (listEntry.regexp && ((_a = listEntry.regexp) === null || _a === void 0 ? void 0 : _a.test(name))) {
                entry = listEntry;
            }
        });
        return entry;
    }
    /**
     * Make a request to the server for info about its installed extensions.
     */
    fetchInstalled(refreshInstalled = false) {
        const url = new URL(EXTENSION_API_PATH, this.serverConnectionSettings.baseUrl);
        if (refreshInstalled) {
            url.searchParams.append('refresh', '1');
        }
        const request = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeRequest(url.toString(), {}, this.serverConnectionSettings).then(response => {
            Private.handleError(response);
            return response.json();
        });
        request.then(() => {
            this.serverConnectionError = null;
        }, reason => {
            this.serverConnectionError = reason.toString();
        });
        return request;
    }
    /**
     * Search with current query.
     *
     * Sets searchError and totalEntries as appropriate.
     *
     * @returns {Promise<{ [key: string]: IEntry; }>} The search result as a map of entries.
     */
    async performSearch() {
        if (this.query === null) {
            this.query = '';
        }
        // Start the search without waiting for it:
        const search = this.searcher.searchExtensions(this.query, this.page, this.pagination);
        const searchMapPromise = this.translateSearchResult(search);
        let searchMap;
        try {
            searchMap = await searchMapPromise;
            this.searchError = null;
        }
        catch (reason) {
            searchMap = {};
            this.searchError = reason.toString();
        }
        return searchMap;
    }
    /**
     * Query the installed extensions.
     *
     * Sets installedError as appropriate.
     *
     * @returns {Promise<{ [key: string]: IEntry; }>} A map of installed extensions.
     */
    async queryInstalled(refreshInstalled) {
        let installedMap;
        try {
            installedMap = await this.translateInstalled(this.fetchInstalled(refreshInstalled));
            this.installedError = null;
        }
        catch (reason) {
            installedMap = {};
            this.installedError = reason.toString();
        }
        return installedMap;
    }
    /**
     * Update the current model.
     *
     * This will query the NPM repository, and the notebook server.
     *
     * Emits the `stateChanged` signal on successful completion.
     */
    async update(refreshInstalled = false) {
        if (ListModel.isDisclaimed()) {
            const [searchMap, installedMap] = await Promise.all([
                this.performSearch(),
                this.queryInstalled(refreshInstalled)
            ]);
            // Map results to attributes:
            const installed = [];
            for (const key of Object.keys(installedMap)) {
                installed.push(installedMap[key]);
            }
            this._installed = installed.sort(Private.comparator);
            const searchResult = [];
            for (const key of Object.keys(searchMap)) {
                // Filter out installed entries from search results:
                if (installedMap[key] === undefined) {
                    searchResult.push(searchMap[key]);
                }
                else {
                    searchResult.push(installedMap[key]);
                }
            }
            this._searchResult = searchResult.sort(Private.comparator);
        }
        // Signal updated state
        this.stateChanged.emit(undefined);
    }
    /**
     * Send a request to the server to perform an action on an extension.
     *
     * @param action A valid action to perform.
     * @param entry The extension to perform the action on.
     */
    _performAction(action, entry) {
        const url = new URL(EXTENSION_API_PATH, this.serverConnectionSettings.baseUrl);
        const request = {
            method: 'POST',
            body: JSON.stringify({
                cmd: action,
                extension_name: entry.name
            })
        };
        const completed = _jupyterlab_services__WEBPACK_IMPORTED_MODULE_1__.ServerConnection.makeRequest(url.toString(), request, this.serverConnectionSettings).then(response => {
            Private.handleError(response);
            this.triggerBuildCheck();
            return response.json();
        });
        completed.then(() => {
            this.serverConnectionError = null;
        }, reason => {
            this.serverConnectionError = reason.toString();
        });
        this._addPendingAction(completed);
        return completed;
    }
    /**
     * Add a pending action.
     *
     * @param pending A promise that resolves when the action is completed.
     */
    _addPendingAction(pending) {
        // Add to pending actions collection
        this._pendingActions.push(pending);
        // Ensure action is removed when resolved
        const remove = () => {
            const i = this._pendingActions.indexOf(pending);
            this._pendingActions.splice(i, 1);
            this.stateChanged.emit(undefined);
        };
        pending.then(remove, remove);
        // Signal changed state
        this.stateChanged.emit(undefined);
    }
}
let _isDisclaimed = false;
/**
 * ListModel statics.
 */
(function (ListModel) {
    /**
     * Utility function to check whether an entry can be updated.
     *
     * @param entry The entry to check.
     */
    function entryHasUpdate(entry) {
        if (!entry.installed || !entry.latest_version) {
            return false;
        }
        return semver__WEBPACK_IMPORTED_MODULE_4__.lt(entry.installed_version, entry.latest_version);
    }
    ListModel.entryHasUpdate = entryHasUpdate;
    function isDisclaimed() {
        return _isDisclaimed;
    }
    ListModel.isDisclaimed = isDisclaimed;
    function toogleDisclaimed() {
        _isDisclaimed = !_isDisclaimed;
    }
    ListModel.toogleDisclaimed = toogleDisclaimed;
})(ListModel || (ListModel = {}));
/**
 * A namespace for private functionality.
 */
var Private;
(function (Private) {
    /**
     * A comparator function that sorts allowedExtensions orgs to the top.
     */
    function comparator(a, b) {
        if (a.name === b.name) {
            return 0;
        }
        const testA = (0,_npm__WEBPACK_IMPORTED_MODULE_6__.isJupyterOrg)(a.name);
        const testB = (0,_npm__WEBPACK_IMPORTED_MODULE_6__.isJupyterOrg)(b.name);
        if (testA === testB) {
            // Retain sort-order from API
            return 0;
        }
        else if (testA && !testB) {
            return -1;
        }
        else {
            return 1;
        }
    }
    Private.comparator = comparator;
    /**
     * Match kernel specs against kernel spec regexps
     *
     * @param kernelInfo The info containing the regexp patterns
     * @param specs The available kernel specs.
     */
    function matchSpecs(kernelInfo, specs) {
        if (!specs) {
            return [];
        }
        const matches = [];
        let reLang = null;
        let reName = null;
        if (kernelInfo.kernel_spec.language) {
            reLang = new RegExp(kernelInfo.kernel_spec.language);
        }
        if (kernelInfo.kernel_spec.display_name) {
            reName = new RegExp(kernelInfo.kernel_spec.display_name);
        }
        for (const key of Object.keys(specs.kernelspecs)) {
            const spec = specs.kernelspecs[key];
            let match = false;
            if (reLang) {
                match = reLang.test(spec.language);
            }
            if (!match && reName) {
                match = reName.test(spec.display_name);
            }
            if (match) {
                matches.push(spec);
                continue;
            }
        }
        return matches;
    }
    Private.matchSpecs = matchSpecs;
    /**
     * Convert a response to an exception on error.
     *
     * @param response The response to inspect.
     */
    function handleError(response) {
        if (!response.ok) {
            throw new Error(`${response.status} (${response.statusText})`);
        }
        return response;
    }
    Private.handleError = handleError;
})(Private || (Private = {}));
//# sourceMappingURL=model.js.map

/***/ }),

/***/ "../../packages/extensionmanager/lib/npm.js":
/*!**************************************************!*\
  !*** ../../packages/extensionmanager/lib/npm.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Searcher": () => (/* binding */ Searcher),
/* harmony export */   "isJupyterOrg": () => (/* binding */ isJupyterOrg)
/* harmony export */ });
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
/**
 * An object for searching an NPM registry.
 *
 * Searches the NPM registry via web API:
 * https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md
 */
class Searcher {
    /**
     * Create a Searcher object.
     *
     * @param repoUri The URI of the NPM registry to use.
     * @param cdnUri The URI of the CDN to use for fetching full package data.
     */
    constructor(repoUri = 'https://registry.npmjs.org/-/v1/', cdnUri = 'https://unpkg.com', enableCdn = true) {
        this.repoUri = repoUri;
        this.cdnUri = cdnUri;
        this.enableCdn = enableCdn;
    }
    /**
     * Search for a jupyterlab extension.
     *
     * @param query The query to send. `keywords:"jupyterlab-extension"` will be appended to the query.
     * @param page The page of results to fetch.
     * @param pageination The pagination size to use. See registry API documentation for acceptable values.
     */
    searchExtensions(query, page = 0, pageination = 250) {
        const uri = new URL('search', this.repoUri);
        // Note: Spaces are encoded to '+' signs!
        const text = `${query} keywords:"jupyterlab-extension"`;
        uri.searchParams.append('text', text);
        uri.searchParams.append('size', pageination.toString());
        uri.searchParams.append('from', (pageination * page).toString());
        return fetch(uri.toString()).then((response) => {
            if (response.ok) {
                return response.json();
            }
            return [];
        });
    }
    /**
     * Fetch package.json of a package
     *
     * @param name The package name.
     * @param version The version of the package to fetch.
     */
    fetchPackageData(name, version) {
        const uri = this.enableCdn
            ? new URL(`/${name}@${version}/package.json`, this.cdnUri)
            : new URL(`/${name}/${version}`, this.repoUri);
        return fetch(uri.toString()).then((response) => {
            if (response.ok) {
                return response.json();
            }
            return null;
        });
    }
}
/**
 * Check whether the NPM org is a Jupyter one.
 */
function isJupyterOrg(name) {
    /**
     * A list of jupyterlab NPM orgs.
     */
    const jupyterOrg = ['jupyterlab', 'jupyter-widgets'];
    const parts = name.split('/');
    const first = parts[0];
    return (parts.length > 1 && // Has a first part
        !!first && // with a finite length
        first[0] === '@' && // corresponding to an org name
        jupyterOrg.indexOf(first.slice(1)) !== -1 // in the org allowedExtensions.
    );
}
//# sourceMappingURL=npm.js.map

/***/ }),

/***/ "../../packages/extensionmanager/lib/widget.js":
/*!*****************************************************!*\
  !*** ../../packages/extensionmanager/lib/widget.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SearchBar": () => (/* binding */ SearchBar),
/* harmony export */   "ListView": () => (/* binding */ ListView),
/* harmony export */   "CollapsibleSection": () => (/* binding */ CollapsibleSection),
/* harmony export */   "ExtensionView": () => (/* binding */ ExtensionView)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/translation */ "webpack/sharing/consume/default/@jupyterlab/translation/@jupyterlab/translation");
/* harmony import */ var _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/ui-components */ "webpack/sharing/consume/default/@jupyterlab/ui-components/@jupyterlab/ui-components");
/* harmony import */ var _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "webpack/sharing/consume/default/react/react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-paginate */ "../../node_modules/react-paginate/dist/react-paginate.js");
/* harmony import */ var react_paginate__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_paginate__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./model */ "../../packages/extensionmanager/lib/model.js");
/* harmony import */ var _npm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./npm */ "../../packages/extensionmanager/lib/npm.js");
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.







// TODO: Replace pagination with lazy loading of lower search results
/**
 * Icons with custom styling bound.
 */
const caretDownIconStyled = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.caretDownIcon.bindprops({
    height: 'auto',
    width: '20px'
});
const caretRightIconStyled = _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.caretRightIcon.bindprops({
    height: 'auto',
    width: '20px'
});
const badgeSize = 32;
const badgeQuerySize = Math.floor(devicePixelRatio * badgeSize);
/**
 * Search bar VDOM component.
 */
class SearchBar extends react__WEBPACK_IMPORTED_MODULE_3__.Component {
    constructor(props) {
        super(props);
        /**
         * Handler for search input changes.
         */
        this.handleChange = (e) => {
            const target = e.target;
            this.setState({
                value: target.value
            });
        };
        this.state = {
            value: ''
        };
    }
    /**
     * Render the list view using the virtual DOM.
     */
    render() {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-search-bar" },
            react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.InputGroup, { className: "jp-extensionmanager-search-wrapper", type: "text", placeholder: this.props.placeholder, onChange: this.handleChange, value: this.state.value, rightIcon: "ui-components:search", disabled: this.props.disabled })));
    }
}
/**
 * Create a build prompt as a react element.
 *
 * @param props Configuration of the build prompt.
 */
function BuildPrompt(props) {
    const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-buildprompt" },
        react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-buildmessage" }, trans.__('A build is needed to include the latest changes')),
        react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: props.performBuild, minimal: true, small: true }, trans.__('Rebuild')),
        react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: props.ignoreBuild, minimal: true, small: true }, trans.__('Ignore'))));
}
function getExtensionGitHubUser(entry) {
    if (entry.url && entry.url.startsWith('https://github.com/')) {
        return entry.url.split('/')[3];
    }
    return null;
}
/**
 * VDOM for visualizing an extension entry.
 */
function ListEntry(props) {
    var _a;
    const { entry, listMode, viewType } = props;
    const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    const flagClasses = [];
    if (entry.status && ['ok', 'warning', 'error'].indexOf(entry.status) !== -1) {
        flagClasses.push(`jp-extensionmanager-entry-${entry.status}`);
    }
    let title = entry.name;
    const entryIsJupyterOrg = (0,_npm__WEBPACK_IMPORTED_MODULE_5__.isJupyterOrg)(entry.name);
    if (entryIsJupyterOrg) {
        title = trans.__('%1 (Developed by Project Jupyter)', entry.name);
    }
    const githubUser = getExtensionGitHubUser(entry);
    if (listMode === 'block' &&
        entry.blockedExtensionsEntry &&
        viewType === 'searchResult') {
        return react__WEBPACK_IMPORTED_MODULE_3__.createElement("li", null);
    }
    if (listMode === 'allow' &&
        !entry.allowedExtensionsEntry &&
        viewType === 'searchResult') {
        return react__WEBPACK_IMPORTED_MODULE_3__.createElement("li", null);
    }
    if (listMode === 'block' && ((_a = entry.blockedExtensionsEntry) === null || _a === void 0 ? void 0 : _a.name)) {
        flagClasses.push(`jp-extensionmanager-entry-should-be-uninstalled`);
    }
    if (listMode === 'allow' && !entry.allowedExtensionsEntry) {
        flagClasses.push(`jp-extensionmanager-entry-should-be-uninstalled`);
    }
    return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("li", { className: `jp-extensionmanager-entry ${flagClasses.join(' ')}`, title: title, style: { display: 'flex' } },
        react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { style: { marginRight: '8px' } },
            githubUser && (react__WEBPACK_IMPORTED_MODULE_3__.createElement("img", { src: `https://github.com/${githubUser}.png?size=${badgeQuerySize}`, style: { width: '32px', height: '32px' } })),
            !githubUser && (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { style: { width: `${badgeSize}px`, height: `${badgeSize}px` } }))),
        react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-entry-description" },
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-entry-title" },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-entry-name" }, entry.url ? (react__WEBPACK_IMPORTED_MODULE_3__.createElement("a", { href: entry.url, target: "_blank", rel: "noopener noreferrer" }, entry.name)) : (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null, entry.name))),
                entry.blockedExtensionsEntry && (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButtonComponent, { icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.listingsInfoIcon, iconLabel: trans.__('%1 extension has been blockedExtensions since install. Please uninstall immediately and contact your blockedExtensions administrator.', entry.name), onClick: () => window.open('https://jupyterlab.readthedocs.io/en/3.4.x/user/extensions.html') })),
                !entry.allowedExtensionsEntry &&
                    viewType === 'installed' &&
                    listMode === 'allow' && (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButtonComponent, { icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.listingsInfoIcon, iconLabel: trans.__('%1 extension has been removed from the allowedExtensions since installation. Please uninstall immediately and contact your allowedExtensions administrator.', entry.name), onClick: () => window.open('https://jupyterlab.readthedocs.io/en/3.4.x/user/extensions.html') })),
                entryIsJupyterOrg && (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.jupyterIcon.react, { className: "jp-extensionmanager-is-jupyter-org", top: "1px", height: "auto", width: "1em" }))),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-entry-content" },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-entry-description" }, entry.description),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-entry-buttons" },
                    !entry.installed &&
                        entry.pkg_type == 'source' &&
                        !entry.blockedExtensionsEntry &&
                        !(!entry.allowedExtensionsEntry && listMode === 'allow') &&
                        _model__WEBPACK_IMPORTED_MODULE_6__.ListModel.isDisclaimed() && (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: () => props.performAction('install', entry), minimal: true, small: true }, trans.__('Install'))),
                    _model__WEBPACK_IMPORTED_MODULE_6__.ListModel.entryHasUpdate(entry) &&
                        entry.pkg_type == 'source' &&
                        !entry.blockedExtensionsEntry &&
                        !(!entry.allowedExtensionsEntry && listMode === 'allow') &&
                        _model__WEBPACK_IMPORTED_MODULE_6__.ListModel.isDisclaimed() && (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: () => props.performAction('install', entry), minimal: true, small: true }, trans.__('Update'))),
                    entry.installed && entry.pkg_type == 'source' && (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: () => props.performAction('uninstall', entry), minimal: true, small: true }, trans.__('Uninstall'))),
                    entry.enabled && entry.pkg_type == 'source' && (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: () => props.performAction('disable', entry), minimal: true, small: true }, trans.__('Disable'))),
                    entry.installed && entry.pkg_type == 'source' && !entry.enabled && (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: () => props.performAction('enable', entry), minimal: true, small: true }, trans.__('Enable'))),
                    entry.installed && entry.pkg_type == 'prebuilt' && (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-entry-buttons" },
                        react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.Button, { onClick: () => (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
                                title,
                                body: (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null, getPrebuiltUninstallInstruction(entry, trans))),
                                buttons: [
                                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({
                                        label: trans.__('OK'),
                                        caption: trans.__('OK')
                                    })
                                ]
                            }).then(result => {
                                return result.button.accept;
                            }), minimal: true, small: true }, trans.__('About')))))))));
}
function getPrebuiltUninstallInstruction(entry, trans) {
    var _a, _b;
    if ((_a = entry.install) === null || _a === void 0 ? void 0 : _a.uninstallInstructions) {
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", null, trans.__(`This is a prebuilt extension. To uninstall it, please
    apply following instructions.`)),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", null, trans.__((_b = entry.install) === null || _b === void 0 ? void 0 : _b.uninstallInstructions))));
    }
    return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", null, trans.__(`This is a prebuilt extension. To uninstall it, please
    read the user guide on:`)),
        react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", null,
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("a", { href: "https://jupyterlab.readthedocs.io/en/3.4.x/user/extensions.html", target: "_blank", rel: "noopener noreferrer" }, "https://jupyterlab.readthedocs.io/en/3.4.x/user/extensions.html"))));
}
/**
 * List view widget for extensions
 */
function ListView(props) {
    const translator = props.translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
    const trans = translator.load('jupyterlab');
    const entryViews = [];
    for (const entry of props.entries) {
        entryViews.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement(ListEntry, { entry: entry, listMode: props.listMode, viewType: props.viewType, key: entry.name, performAction: props.performAction, translator: translator }));
    }
    let pagination;
    if (props.numPages > 1) {
        pagination = (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-pagination" },
            react__WEBPACK_IMPORTED_MODULE_3__.createElement((react_paginate__WEBPACK_IMPORTED_MODULE_4___default()), { previousLabel: '<', nextLabel: '>', breakLabel: react__WEBPACK_IMPORTED_MODULE_3__.createElement("a", { href: "" }, "..."), breakClassName: 'break-me', pageCount: props.numPages, marginPagesDisplayed: 2, pageRangeDisplayed: 5, onPageChange: (data) => props.onPage(data.selected), containerClassName: 'pagination', activeClassName: 'active' })));
    }
    const listview = (react__WEBPACK_IMPORTED_MODULE_3__.createElement("ul", { className: "jp-extensionmanager-listview" }, entryViews));
    return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-listview-wrapper" },
        entryViews.length > 0 ? (listview) : (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { key: "message", className: "jp-extensionmanager-listview-message" }, trans.__('No entries'))),
        pagination));
}
function ErrorMessage(props) {
    return (react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { key: "error-msg", className: "jp-extensionmanager-error" }, props.children));
}
/**
 *
 */
class CollapsibleSection extends react__WEBPACK_IMPORTED_MODULE_3__.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen ? true : false
        };
    }
    /**
     * Render the collapsible section using the virtual DOM.
     */
    render() {
        let icon = this.state.isOpen ? caretDownIconStyled : caretRightIconStyled;
        let isOpen = this.state.isOpen;
        let className = 'jp-extensionmanager-headerText';
        if (this.props.disabled) {
            icon = caretRightIconStyled;
            isOpen = false;
            className = 'jp-extensionmanager-headerTextDisabled';
        }
        return (react__WEBPACK_IMPORTED_MODULE_3__.createElement(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-stack-panel-header" },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButtonComponent, { icon: icon, onClick: () => {
                        this.handleCollapse();
                    } }),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", { className: className }, this.props.header),
                !this.props.disabled && this.props.headerElements),
            react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.Collapse, { isOpen: isOpen }, this.props.children)));
    }
    /**
     * Handler for search input changes.
     */
    handleCollapse() {
        this.setState({
            isOpen: !this.state.isOpen
        }, () => {
            if (this.props.onCollapse) {
                this.props.onCollapse(this.state.isOpen);
            }
        });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.forceOpen) {
            this.setState({
                isOpen: true
            });
        }
    }
}
/**
 * The main view for the discovery extension.
 */
class ExtensionView extends _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.VDomRenderer {
    constructor(app, serviceManager, settings, translator) {
        super(new _model__WEBPACK_IMPORTED_MODULE_6__.ListModel(app, serviceManager, settings, translator));
        this.translator = translator || _jupyterlab_translation__WEBPACK_IMPORTED_MODULE_1__.nullTranslator;
        this._trans = this.translator.load('jupyterlab');
        this._settings = settings;
        this._forceOpen = false;
        this.addClass('jp-extensionmanager-view');
    }
    /**
     * The search input node.
     */
    get inputNode() {
        return this.node.querySelector('.jp-extensionmanager-search-wrapper input');
    }
    /**
     * Render the extension view using the virtual DOM.
     */
    render() {
        var _a, _b;
        const model = this.model;
        if (!model.listMode) {
            return [react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { key: "empty" })];
        }
        if (model.listMode === 'invalid') {
            return [
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { style: { padding: 8 }, key: "invalid" },
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null, this._trans
                        .__(`The extension manager is disabled. Please contact your system
administrator to verify the listings configuration.`)),
                    react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null,
                        react__WEBPACK_IMPORTED_MODULE_3__.createElement("a", { href: "https://jupyterlab.readthedocs.io/en/3.4.x/user/extensions.html", target: "_blank", rel: "noopener noreferrer" }, this._trans.__('Read more in the JupyterLab documentation.'))))
            ];
        }
        const pages = Math.ceil(model.totalEntries / model.pagination);
        const elements = [
            react__WEBPACK_IMPORTED_MODULE_3__.createElement(SearchBar, { key: "searchbar", placeholder: this._trans.__('SEARCH'), disabled: !_model__WEBPACK_IMPORTED_MODULE_6__.ListModel.isDisclaimed(), settings: this._settings })
        ];
        if (model.promptBuild) {
            elements.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement(BuildPrompt, { key: "promt", translator: this.translator, performBuild: () => {
                    model.performBuild();
                }, ignoreBuild: () => {
                    model.ignoreBuildRecommendation();
                } }));
        }
        // Indicator element for pending actions:
        elements.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { key: "pending", className: `jp-extensionmanager-pending ${model.hasPendingActions() ? 'jp-mod-hasPending' : ''}` }));
        const content = [];
        content.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement(CollapsibleSection, { key: "warning-section", isOpen: !_model__WEBPACK_IMPORTED_MODULE_6__.ListModel.isDisclaimed(), disabled: false, header: this._trans.__('Warning') },
            react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { className: "jp-extensionmanager-disclaimer" },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null, this._trans
                    .__(`The JupyterLab development team is excited to have a robust
third-party extension community. However, we do not review
third-party extensions, and some extensions may introduce security
risks or contain malicious code that runs on your machine.`)),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { style: { paddingTop: 8 } },
                    _model__WEBPACK_IMPORTED_MODULE_6__.ListModel.isDisclaimed() && (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.Button, { className: "jp-extensionmanager-disclaimer-disable", onClick: (e) => {
                            this._settings.set('disclaimed', false).catch(reason => {
                                console.error(`Something went wrong when setting disclaimed.\n${reason}`);
                            });
                        } }, this._trans.__('Disable'))),
                    !_model__WEBPACK_IMPORTED_MODULE_6__.ListModel.isDisclaimed() && (react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.Button, { className: "jp-extensionmanager-disclaimer-enable", onClick: (e) => {
                            this._forceOpen = true;
                            this._settings.set('disclaimed', true).catch(reason => {
                                console.error(`Something went wrong when setting disclaimed.\n${reason}`);
                            });
                        } }, this._trans.__('Enable')))))));
        if (!model.initialized) {
            content.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { key: "loading-placeholder", className: "jp-extensionmanager-loader" }, this._trans.__('Updating extensions list')));
        }
        else if (model.serverConnectionError !== null) {
            content.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement(ErrorMessage, { key: "error-msg" },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", null, this._trans
                    .__(`Error communicating with server extension. Consult the documentation
            for how to ensure that it is enabled.`)),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", null, this._trans.__('Reason given:')),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("pre", null, model.serverConnectionError)));
        }
        else if (model.serverRequirementsError !== null) {
            content.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement(ErrorMessage, { key: "server-requirements-error" },
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", null, this._trans.__('The server has some missing requirements for installing extensions.')),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", null, this._trans.__('Details:')),
                react__WEBPACK_IMPORTED_MODULE_3__.createElement("pre", null, model.serverRequirementsError)));
        }
        else {
            // List installed and discovery sections
            const installedContent = [];
            if (model.installedError !== null) {
                installedContent.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement(ErrorMessage, { key: "install-error" }, `Error querying installed extensions${model.installedError ? `: ${model.installedError}` : '.'}`));
            }
            else {
                const query = new RegExp((_b = (_a = model.query) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : '');
                installedContent.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement(ListView, { key: "installed-items", listMode: model.listMode, viewType: 'installed', entries: model.installed.filter(pkg => !model.query || query.test(pkg.name)), numPages: 1, translator: this.translator, onPage: value => {
                        /* no-op */
                    }, performAction: this.onAction.bind(this) }));
            }
            content.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement(CollapsibleSection, { key: "installed-section", isOpen: _model__WEBPACK_IMPORTED_MODULE_6__.ListModel.isDisclaimed(), forceOpen: this._forceOpen, disabled: !_model__WEBPACK_IMPORTED_MODULE_6__.ListModel.isDisclaimed(), header: this._trans.__('Installed'), headerElements: react__WEBPACK_IMPORTED_MODULE_3__.createElement(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ToolbarButtonComponent, { key: "refresh-button", icon: _jupyterlab_ui_components__WEBPACK_IMPORTED_MODULE_2__.refreshIcon, onClick: () => {
                        model.refreshInstalled();
                    }, tooltip: this._trans.__('Refresh extension list') }) }, installedContent));
            const searchContent = [];
            if (model.searchError !== null) {
                searchContent.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement(ErrorMessage, { key: "search-error" }, `Error searching for extensions${model.searchError ? `: ${model.searchError}` : '.'}`));
            }
            else {
                searchContent.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement(ListView, { key: "search-items", listMode: model.listMode, viewType: 'searchResult', 
                    // Filter out installed extensions:
                    entries: model.searchResult.filter(entry => model.installed.indexOf(entry) === -1), numPages: pages, onPage: value => {
                        this.onPage(value);
                    }, performAction: this.onAction.bind(this), translator: this.translator }));
            }
            content.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement(CollapsibleSection, { key: "search-section", isOpen: _model__WEBPACK_IMPORTED_MODULE_6__.ListModel.isDisclaimed(), forceOpen: this._forceOpen, disabled: !_model__WEBPACK_IMPORTED_MODULE_6__.ListModel.isDisclaimed(), header: model.query
                    ? this._trans.__('Search Results')
                    : this._trans.__('Discover'), onCollapse: (isOpen) => {
                    if (isOpen && model.query === null) {
                        model.query = '';
                    }
                } }, searchContent));
        }
        elements.push(react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", { key: "content", className: "jp-extensionmanager-content" }, content));
        // Reset the force open for future usage.
        this._forceOpen = false;
        return elements;
    }
    /**
     * Callback handler for the user specifies a new search query.
     *
     * @param value The new query.
     */
    onSearch(value) {
        this.model.query = value;
    }
    /**
     * Callback handler for the user changes the page of the search result pagination.
     *
     * @param value The pagination page number.
     */
    onPage(value) {
        this.model.page = value;
    }
    /**
     * Callback handler for when the user wants to perform an action on an extension.
     *
     * @param action The action to perform.
     * @param entry The entry to perform the action on.
     */
    onAction(action, entry) {
        switch (action) {
            case 'install':
                return this.model.install(entry);
            case 'uninstall':
                return this.model.uninstall(entry);
            case 'enable':
                return this.model.enable(entry);
            case 'disable':
                return this.model.disable(entry);
            default:
                throw new Error(`Invalid action: ${action}`);
        }
    }
    /**
     * Handle the DOM events for the extension manager search bar.
     *
     * @param event - The DOM event sent to the extension manager search bar.
     *
     * #### Notes
     * This method implements the DOM `EventListener` interface and is
     * called in response to events on the search bar's DOM node.
     * It should not be called directly by user code.
     */
    handleEvent(event) {
        switch (event.type) {
            case 'input':
                this.onSearch(this.inputNode.value);
                break;
            case 'focus':
            case 'blur':
                this._toggleFocused();
                break;
            default:
                break;
        }
    }
    /**
     * A message handler invoked on a `'before-attach'` message.
     */
    onBeforeAttach(msg) {
        this.node.addEventListener('input', this);
        this.node.addEventListener('focus', this, true);
        this.node.addEventListener('blur', this, true);
    }
    /**
     * A message handler invoked on an `'after-detach'` message.
     */
    onAfterDetach(msg) {
        this.node.removeEventListener('input', this);
        this.node.removeEventListener('focus', this, true);
        this.node.removeEventListener('blur', this, true);
    }
    /**
     * A message handler invoked on an `'activate-request'` message.
     */
    onActivateRequest(msg) {
        if (this.isAttached) {
            const input = this.inputNode;
            if (input) {
                input.focus();
                input.select();
            }
        }
    }
    /**
     * Toggle the focused modifier based on the input node focus state.
     */
    _toggleFocused() {
        const focused = document.activeElement === this.inputNode;
        this.toggleClass('lm-mod-focused', focused);
    }
}
//# sourceMappingURL=widget.js.map

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZXh0ZW5zaW9ubWFuYWdlci9saWIvYnVpbGQtaGVscGVyLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9leHRlbnNpb25tYW5hZ2VyL2xpYi9jb21wYW5pb25zLmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9leHRlbnNpb25tYW5hZ2VyL2xpYi9kaWFsb2cuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2V4dGVuc2lvbm1hbmFnZXIvbGliL2luZGV4LmpzIiwid2VicGFjazovL0BqdXB5dGVybGFiL2FwcGxpY2F0aW9uLXRvcC8uLi8uLi9wYWNrYWdlcy9leHRlbnNpb25tYW5hZ2VyL2xpYi9saXN0aW5ncy5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZXh0ZW5zaW9ubWFuYWdlci9saWIvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vQGp1cHl0ZXJsYWIvYXBwbGljYXRpb24tdG9wLy4uLy4uL3BhY2thZ2VzL2V4dGVuc2lvbm1hbmFnZXIvbGliL25wbS5qcyIsIndlYnBhY2s6Ly9AanVweXRlcmxhYi9hcHBsaWNhdGlvbi10b3AvLi4vLi4vcGFja2FnZXMvZXh0ZW5zaW9ubWFuYWdlci9saWIvd2lkZ2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQzRFO0FBQ25CO0FBQzFCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLCtCQUErQixtRUFBYztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGdFQUFVO0FBQzdCO0FBQ0EsdUJBQXVC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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDhFQUE0QixtQkFBbUI7QUFDdkU7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVMsdUJBQXVCLEVBQUUsRUFBRTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUyx1QkFBdUIsRUFBRSxFQUFFO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDIiwiZmlsZSI6InBhY2thZ2VzX2V4dGVuc2lvbm1hbmFnZXJfbGliX2luZGV4X2pzLjA2NzExMjNmNDgzMzFmYjFhNmQwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgRGlhbG9nLCBzaG93RGlhbG9nLCBzaG93RXJyb3JNZXNzYWdlIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG4vKipcbiAqIEluc3RydWN0IHRoZSBzZXJ2ZXIgdG8gcGVyZm9ybSBhIGJ1aWxkXG4gKlxuICogQHBhcmFtIGJ1aWxkZXIgdGhlIGJ1aWxkIG1hbmFnZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRvQnVpbGQoYXBwLCBidWlsZGVyLCB0cmFuc2xhdG9yKSB7XG4gICAgdHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgY29uc3QgdHJhbnMgPSB0cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICBpZiAoYnVpbGRlci5pc0F2YWlsYWJsZSkge1xuICAgICAgICByZXR1cm4gYnVpbGRlclxuICAgICAgICAgICAgLmJ1aWxkKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzaG93RGlhbG9nKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdHJhbnMuX18oJ0J1aWxkIENvbXBsZXRlJyksXG4gICAgICAgICAgICAgICAgYm9keTogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnMuX18oJ0J1aWxkIHN1Y2Nlc3NmdWxseSBjb21wbGV0ZWQsIHJlbG9hZCBwYWdlPycpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnJcIiwgbnVsbCksXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zLl9fKCdZb3Ugd2lsbCBsb3NlIGFueSB1bnNhdmVkIGNoYW5nZXMuJykpKSxcbiAgICAgICAgICAgICAgICBidXR0b25zOiBbXG4gICAgICAgICAgICAgICAgICAgIERpYWxvZy5jYW5jZWxCdXR0b24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHRyYW5zLl9fKCdSZWxvYWQgV2l0aG91dCBTYXZpbmcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IFsncmVsb2FkJ11cbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIERpYWxvZy5va0J1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnU2F2ZSBhbmQgUmVsb2FkJykgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIGhhc0Nsb3NlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCh7IGJ1dHRvbjogeyBhY2NlcHQsIGFjdGlvbnMgfSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoYWNjZXB0KSB7XG4gICAgICAgICAgICAgICAgdm9pZCBhcHAuY29tbWFuZHNcbiAgICAgICAgICAgICAgICAgICAgLmV4ZWN1dGUoJ2RvY21hbmFnZXI6c2F2ZScpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdm9pZCBzaG93RXJyb3JNZXNzYWdlKHRyYW5zLl9fKCdTYXZlIEZhaWxlZCcpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBSZWFjdC5jcmVhdGVFbGVtZW50KFwicHJlXCIsIG51bGwsIGVyci5tZXNzYWdlKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFjdGlvbnMuaW5jbHVkZXMoJ3JlbG9hZCcpKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIHZvaWQgc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdCdWlsZCBGYWlsZWQnKSxcbiAgICAgICAgICAgICAgICBib2R5OiBSZWFjdC5jcmVhdGVFbGVtZW50KFwicHJlXCIsIG51bGwsIGVyci5tZXNzYWdlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1idWlsZC1oZWxwZXIuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgRGlhbG9nLCBzaG93RGlhbG9nIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBNYXBwaW5nIG9mIG1hbmFnZXIgbmFtZSB0byBmdW5jdGlvbiB0aGF0IHRha2UgbmFtZSBhbmQgZ2l2ZXMgY29tbWFuZFxuY29uc3QgbWFuYWdlckNvbW1hbmQgPSB7XG4gICAgcGlwOiBuYW1lID0+IGBwaXAgaW5zdGFsbCAke25hbWV9YCxcbiAgICBjb25kYTogbmFtZSA9PiBgY29uZGEgaW5zdGFsbCAtYyBjb25kYS1mb3JnZSAke25hbWV9YFxufTtcbmZ1bmN0aW9uIGdldEluc3RhbGxDb21tYW5kcyhpbmZvKSB7XG4gICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgIGNvbnN0IGNvbW1hbmRzID0gQXJyYXkoKTtcbiAgICBmb3IgKGNvbnN0IG1hbmFnZXIgb2YgaW5mby5tYW5hZ2Vycykge1xuICAgICAgICBjb25zdCBuYW1lID0gKF9jID0gKF9iID0gKF9hID0gaW5mby5vdmVycmlkZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVttYW5hZ2VyXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm5hbWUpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IGluZm8uYmFzZS5uYW1lO1xuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTm8gcGFja2FnZSBuYW1lIGZvdW5kIGZvciBtYW5hZ2VyICR7bWFuYWdlcn1gKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSAoX2QgPSBtYW5hZ2VyQ29tbWFuZFttYW5hZ2VyXSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmNhbGwobWFuYWdlckNvbW1hbmQsIG5hbWUpO1xuICAgICAgICBpZiAoIWNvbW1hbmQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgRG9uJ3Qga25vdyBob3cgdG8gaW5zdGFsbCBwYWNrYWdlcyBmb3IgbWFuYWdlciAke21hbmFnZXJ9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29tbWFuZHMucHVzaChjb21tYW5kKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbW1hbmRzO1xufVxuLyoqXG4gKiBQcm9tcHQgdGhlIHVzZXIgd2hhdCBkbyBhYm91dCBjb21wYW5pb24gcGFja2FnZXMsIGlmIHByZXNlbnQuXG4gKlxuICogQHBhcmFtIGJ1aWxkZXIgdGhlIGJ1aWxkIG1hbmFnZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByZXNlbnRDb21wYW5pb25zKGtlcm5lbENvbXBhbmlvbnMsIHNlcnZlckNvbXBhbmlvbiwgdHJhbnNsYXRvcikge1xuICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgZW50cmllcyA9IFtdO1xuICAgIGlmIChzZXJ2ZXJDb21wYW5pb24pIHtcbiAgICAgICAgZW50cmllcy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIHsga2V5OiBcInNlcnZlci1jb21wYW5pb25cIiB9LFxuICAgICAgICAgICAgdHJhbnMuX18oYFRoaXMgcGFja2FnZSBoYXMgaW5kaWNhdGVkIHRoYXQgaXQgbmVlZHMgYSBjb3JyZXNwb25kaW5nIHNlcnZlclxuZXh0ZW5zaW9uLiBQbGVhc2UgY29udGFjdCB5b3VyIEFkbWluaXN0cmF0b3IgdG8gdXBkYXRlIHRoZSBzZXJ2ZXIgd2l0aFxub25lIG9mIHRoZSBmb2xsb3dpbmcgY29tbWFuZHM6YCksXG4gICAgICAgICAgICBnZXRJbnN0YWxsQ29tbWFuZHMoc2VydmVyQ29tcGFuaW9uKS5tYXAoY29tbWFuZCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IGtleTogY29tbWFuZCB9LFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiY29kZVwiLCBudWxsLCBjb21tYW5kKSkpO1xuICAgICAgICAgICAgfSkpKTtcbiAgICB9XG4gICAgaWYgKGtlcm5lbENvbXBhbmlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBlbnRyaWVzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgeyBrZXk6ICdrZXJuZWwtY29tcGFuaW9uJyB9LCB0cmFucy5fXygnVGhpcyBwYWNrYWdlIGhhcyBpbmRpY2F0ZWQgdGhhdCBpdCBuZWVkcyBhIGNvcnJlc3BvbmRpbmcgcGFja2FnZSBmb3IgdGhlIGtlcm5lbC4nKSkpO1xuICAgICAgICBmb3IgKGNvbnN0IFtpbmRleCwgZW50cnldIG9mIGtlcm5lbENvbXBhbmlvbnMuZW50cmllcygpKSB7XG4gICAgICAgICAgICBlbnRyaWVzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgeyBrZXk6IGBjb21wYW5pb24tJHtpbmRleH1gIH0sIHRyYW5zLl9fKGBUaGUgcGFja2FnZSA8Y29kZT4lMTwvY29kZT4sIGlzIHJlcXVpcmVkIGJ5IHRoZSBmb2xsb3dpbmcga2VybmVsczpgLCBlbnRyeS5rZXJuZWxJbmZvLmJhc2UubmFtZSkpKTtcbiAgICAgICAgICAgIGNvbnN0IGtlcm5lbEVudHJpZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgW2luZGV4LCBrZXJuZWxdIG9mIGVudHJ5Lmtlcm5lbHMuZW50cmllcygpKSB7XG4gICAgICAgICAgICAgICAga2VybmVsRW50cmllcy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGtleTogYGtlcm5lbHMtJHtpbmRleH1gIH0sXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIGtlcm5lbC5kaXNwbGF5X25hbWUpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbnRyaWVzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIHsga2V5OiAna2VybmVsLWNvbXBhbmlvbi1lbmQnIH0sIGtlcm5lbEVudHJpZXMpKTtcbiAgICAgICAgICAgIGVudHJpZXMucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCB7IGtleTogYGtlcm5lbC1jb21wYW5pb24tJHtpbmRleH1gIH0sXG4gICAgICAgICAgICAgICAgdHJhbnMuX18oYFRoaXMgcGFja2FnZSBoYXMgaW5kaWNhdGVkIHRoYXQgaXQgbmVlZHMgYSBjb3JyZXNwb25kaW5nIGtlcm5lbFxucGFja2FnZS4gUGxlYXNlIGNvbnRhY3QgeW91ciBBZG1pbmlzdHJhdG9yIHRvIHVwZGF0ZSB0aGUgc2VydmVyIHdpdGhcbm9uZSBvZiB0aGUgZm9sbG93aW5nIGNvbW1hbmRzOmApLFxuICAgICAgICAgICAgICAgIGdldEluc3RhbGxDb21tYW5kcyhlbnRyeS5rZXJuZWxJbmZvKS5tYXAoY29tbWFuZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgeyBrZXk6IGNvbW1hbmQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIGNvbW1hbmQpKSk7XG4gICAgICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBib2R5ID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgZW50cmllcyxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgdHJhbnMuX18oYFlvdSBzaG91bGQgbWFrZSBzdXJlIHRoYXQgdGhlIGluZGljYXRlZCBwYWNrYWdlcyBhcmUgaW5zdGFsbGVkIGJlZm9yZVxudHJ5aW5nIHRvIHVzZSB0aGUgZXh0ZW5zaW9uLiBEbyB5b3Ugd2FudCB0byBjb250aW51ZSB3aXRoIHRoZSBleHRlbnNpb25cbmluc3RhbGxhdGlvbj9gKSkpKTtcbiAgICBjb25zdCBoYXNLZXJuZWxDb21wYW5pb25zID0ga2VybmVsQ29tcGFuaW9ucy5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGhhc1NlcnZlckNvbXBhbmlvbiA9ICEhc2VydmVyQ29tcGFuaW9uO1xuICAgIGxldCB0aXRsZSA9ICcnO1xuICAgIGlmIChoYXNLZXJuZWxDb21wYW5pb25zICYmIGhhc1NlcnZlckNvbXBhbmlvbikge1xuICAgICAgICB0aXRsZSA9IHRyYW5zLl9fKCdLZXJuZWwgYW5kIFNlcnZlciBDb21wYW5pb25zJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhhc0tlcm5lbENvbXBhbmlvbnMpIHtcbiAgICAgICAgdGl0bGUgPSB0cmFucy5fXygnS2VybmVsIENvbXBhbmlvbnMnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRpdGxlID0gdHJhbnMuX18oJ1NlcnZlciBDb21wYW5pb24nKTtcbiAgICB9XG4gICAgcmV0dXJuIHNob3dEaWFsb2coe1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgYm9keSxcbiAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgRGlhbG9nLmNhbmNlbEJ1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnQ2FuY2VsJykgfSksXG4gICAgICAgICAgICBEaWFsb2cub2tCdXR0b24oe1xuICAgICAgICAgICAgICAgIGxhYmVsOiB0cmFucy5fXygnT0snKSxcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB0cmFucy5fXygnSW5zdGFsbCB0aGUgSnVweXRlckxhYiBleHRlbnNpb24uJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJldHVybiByZXN1bHQuYnV0dG9uLmFjY2VwdDtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbXBhbmlvbnMuanMubWFwIiwiLy8gQ29weXJpZ2h0IChjKSBKdXB5dGVyIERldmVsb3BtZW50IFRlYW0uXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1vZGlmaWVkIEJTRCBMaWNlbnNlLlxuaW1wb3J0IHsgRGlhbG9nLCBzaG93RGlhbG9nIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG4vKipcbiAqIFNob3cgYSBkaWFsb2cgYm94IHJlcG9ydGluZyBhbiBlcnJvciBkdXJpbmcgaW5zdGFsbGF0aW9uIG9mIGFuIGV4dGVuc2lvbi5cbiAqXG4gKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZXh0ZW5zaW9uXG4gKiBAcGFyYW0gZXJyb3JNZXNzYWdlIEFueSBlcnJvciBtZXNzYWdlIGdpdmluZyBkZXRhaWxzIGFib3V0IHRoZSBmYWlsdXJlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwb3J0SW5zdGFsbEVycm9yKG5hbWUsIGVycm9yTWVzc2FnZSwgdHJhbnNsYXRvcikge1xuICAgIHRyYW5zbGF0b3IgPSB0cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgZW50cmllcyA9IFtdO1xuICAgIGVudHJpZXMucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCB0cmFucy5fXygnQW4gZXJyb3Igb2NjdXJyZWQgaW5zdGFsbGluZyA8Y29kZT4lMTwvY29kZT4uJywgbmFtZSkpKTtcbiAgICBpZiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIGVudHJpZXMucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwianAtZXh0ZW5zaW9ubWFuYWdlci1kaWFsb2ctc3ViaGVhZGVyXCIgfSwgdHJhbnMuX18oJ0Vycm9yIG1lc3NhZ2U6JykpKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcInByZVwiLCBudWxsLCBlcnJvck1lc3NhZ2UudHJpbSgpKSk7XG4gICAgfVxuICAgIGNvbnN0IGJvZHkgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLWV4dGVuc2lvbm1hbmFnZXItZGlhbG9nXCIgfSwgZW50cmllcyk7XG4gICAgdm9pZCBzaG93RGlhbG9nKHtcbiAgICAgICAgdGl0bGU6IHRyYW5zLl9fKCdFeHRlbnNpb24gSW5zdGFsbGF0aW9uIEVycm9yJyksXG4gICAgICAgIGJvZHksXG4gICAgICAgIGJ1dHRvbnM6IFtEaWFsb2cud2FybkJ1dHRvbih7IGxhYmVsOiB0cmFucy5fXygnT0snKSB9KV1cbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRpYWxvZy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICogQG1vZHVsZSBleHRlbnNpb25tYW5hZ2VyXG4gKi9cbmV4cG9ydCAqIGZyb20gJy4vbW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9ucG0nO1xuZXhwb3J0ICogZnJvbSAnLi9saXN0aW5ncyc7XG5leHBvcnQgKiBmcm9tICcuL3dpZGdldCc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBVUkxFeHQgfSBmcm9tICdAanVweXRlcmxhYi9jb3JldXRpbHMnO1xuaW1wb3J0IHsgU2VydmVyQ29ubmVjdGlvbiB9IGZyb20gJ0BqdXB5dGVybGFiL3NlcnZpY2VzJztcbmltcG9ydCB7IFNpZ25hbCB9IGZyb20gJ0BsdW1pbm8vc2lnbmFsaW5nJztcbi8qKlxuICogQW4gb2JqZWN0IGZvciBnZXR0aW5nIGxpc3RpbmdzIGZyb20gdGhlIHNlcnZlciBBUEkuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaXN0ZXIge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIExpc3RlciBvYmplY3QuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2xpc3RpbmdzID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9saXN0aW5nc0xvYWRlZCA9IG5ldyBTaWduYWwodGhpcyk7XG4gICAgICAgIHJlcXVlc3RBUEkoJ0BqdXB5dGVybGFiL2V4dGVuc2lvbm1hbmFnZXItZXh0ZW5zaW9uL2xpc3RpbmdzLmpzb24nKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9saXN0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICBtb2RlOiAnZGVmYXVsdCcsXG4gICAgICAgICAgICAgICAgdXJpczogW10sXG4gICAgICAgICAgICAgICAgZW50cmllczogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoZGF0YS5ibG9ja2VkX2V4dGVuc2lvbnNfdXJpcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAgICAgZGF0YS5hbGxvd2VkX2V4dGVuc2lvbnNfdXJpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdTaW11bHRhbmVvdXMgYmxhY2sgYW5kIHdoaXRlIGxpc3QgYXJlIG5vdCBhbGxvd2VkLicpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RpbmdzID0ge1xuICAgICAgICAgICAgICAgICAgICBtb2RlOiAnaW52YWxpZCcsXG4gICAgICAgICAgICAgICAgICAgIHVyaXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBlbnRyaWVzOiBbXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkYXRhLmJsb2NrZWRfZXh0ZW5zaW9uc191cmlzLmxlbmd0aCA+IDAgfHxcbiAgICAgICAgICAgICAgICBkYXRhLmFsbG93ZWRfZXh0ZW5zaW9uc191cmlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogZGF0YS5ibG9ja2VkX2V4dGVuc2lvbnNfdXJpcy5sZW5ndGggPiAwID8gJ2Jsb2NrJyA6ICdhbGxvdycsXG4gICAgICAgICAgICAgICAgICAgIHVyaXM6IGRhdGEuYmxvY2tlZF9leHRlbnNpb25zX3VyaXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBkYXRhLmJsb2NrZWRfZXh0ZW5zaW9uc191cmlzXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGRhdGEuYWxsb3dlZF9leHRlbnNpb25zX3VyaXMsXG4gICAgICAgICAgICAgICAgICAgIGVudHJpZXM6IGRhdGEuYmxvY2tlZF9leHRlbnNpb25zX3VyaXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBkYXRhLmJsb2NrZWRfZXh0ZW5zaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBkYXRhLmFsbG93ZWRfZXh0ZW5zaW9uc1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9saXN0aW5nc0xvYWRlZC5lbWl0KHRoaXMuX2xpc3RpbmdzKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBsaXN0aW5nc0xvYWRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RpbmdzTG9hZGVkO1xuICAgIH1cbn1cbi8qKlxuICogQ2FsbCB0aGUgbGlzdGluZ3MgQVBJIFJFU1QgaGFuZGxlci5cbiAqXG4gKiBAcGFyYW0gZW5kUG9pbnQgQVBJIFJFU1QgZW5kIHBvaW50IGZvciB0aGUgZXh0ZW5zaW9uXG4gKiBAcGFyYW0gaW5pdCBJbml0aWFsIHZhbHVlcyBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIFRoZSByZXNwb25zZSBib2R5IGludGVycHJldGVkIGFzIEpTT05cbiAqL1xuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdEFQSShlbmRQb2ludCA9ICcnLCBpbml0ID0ge30pIHtcbiAgICAvLyBNYWtlIHJlcXVlc3QgdG8gSnVweXRlciBBUElcbiAgICBjb25zdCBzZXR0aW5ncyA9IFNlcnZlckNvbm5lY3Rpb24ubWFrZVNldHRpbmdzKCk7XG4gICAgY29uc3QgcmVxdWVzdFVybCA9IFVSTEV4dC5qb2luKHNldHRpbmdzLmJhc2VVcmwsIHNldHRpbmdzLmFwcFVybCwgJ2FwaS9saXN0aW5ncy8nLCBlbmRQb2ludCk7XG4gICAgbGV0IHJlc3BvbnNlO1xuICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdChyZXF1ZXN0VXJsLCBpbml0LCBzZXR0aW5ncyk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgU2VydmVyQ29ubmVjdGlvbi5OZXR3b3JrRXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IFNlcnZlckNvbm5lY3Rpb24uUmVzcG9uc2VFcnJvcihyZXNwb25zZSwgZGF0YS5tZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXN0aW5ncy5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG5pbXBvcnQgeyBWRG9tTW9kZWwgfSBmcm9tICdAanVweXRlcmxhYi9hcHB1dGlscyc7XG5pbXBvcnQgeyBTZXJ2ZXJDb25uZWN0aW9uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvc2VydmljZXMnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBEZWJvdW5jZXIgfSBmcm9tICdAbHVtaW5vL3BvbGxpbmcnO1xuaW1wb3J0ICogYXMgc2VtdmVyIGZyb20gJ3NlbXZlcic7XG5pbXBvcnQgeyBkb0J1aWxkIH0gZnJvbSAnLi9idWlsZC1oZWxwZXInO1xuaW1wb3J0IHsgcHJlc2VudENvbXBhbmlvbnMgfSBmcm9tICcuL2NvbXBhbmlvbnMnO1xuaW1wb3J0IHsgcmVwb3J0SW5zdGFsbEVycm9yIH0gZnJvbSAnLi9kaWFsb2cnO1xuaW1wb3J0IHsgTGlzdGVyIH0gZnJvbSAnLi9saXN0aW5ncyc7XG5pbXBvcnQgeyBpc0p1cHl0ZXJPcmcsIFNlYXJjaGVyIH0gZnJvbSAnLi9ucG0nO1xuLyoqXG4gKiBUaGUgc2VydmVyIEFQSSBwYXRoIGZvciBxdWVyeWluZy9tb2RpZnlpbmcgaW5zdGFsbGVkIGV4dGVuc2lvbnMuXG4gKi9cbmNvbnN0IEVYVEVOU0lPTl9BUElfUEFUSCA9ICdsYWIvYXBpL2V4dGVuc2lvbnMnO1xuLyoqXG4gKiBNb2RlbCBmb3IgYW4gZXh0ZW5zaW9uIGxpc3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaXN0TW9kZWwgZXh0ZW5kcyBWRG9tTW9kZWwge1xuICAgIGNvbnN0cnVjdG9yKGFwcCwgc2VydmljZU1hbmFnZXIsIHNldHRpbmdzLCB0cmFuc2xhdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250YWlucyBhbiBlcnJvciBtZXNzYWdlIGlmIGFuIGVycm9yIG9jY3VycmVkIHdoZW4gcXVlcnlpbmcgaW5zdGFsbGVkIGV4dGVuc2lvbnMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluc3RhbGxlZEVycm9yID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRhaW5zIGFuIGVycm9yIG1lc3NhZ2UgaWYgYW4gZXJyb3Igb2NjdXJyZWQgd2hlbiBzZWFyY2hpbmcgZm9yIGV4dGVuc2lvbnMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlYXJjaEVycm9yID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRhaW5zIGFuIGVycm9yIG1lc3NhZ2UgaWYgYW4gZXJyb3Igb2NjdXJyZWQgd2hlbiBzZWFyY2hpbmcgZm9yIGxpc3RzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5ibG9ja2VkRXh0ZW5zaW9uc0Vycm9yID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRhaW5zIGFuIGVycm9yIG1lc3NhZ2UgaWYgYW4gZXJyb3Igb2NjdXJyZWQgd2hlbiBxdWVyeWluZyB0aGUgc2VydmVyIGV4dGVuc2lvbi5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvbkVycm9yID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRhaW5zIGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlIHNlcnZlciBoYXMgdW5mdWxmaWxsZWQgcmVxdWlyZW1lbnRzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zZXJ2ZXJSZXF1aXJlbWVudHNFcnJvciA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBtb2RlbCBoYXMgZmluaXNoZWQgYXN5bmMgaW5pdGlhbGl6YXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIGEgZnJlc2ggYnVpbGQgc2hvdWxkIGJlIGNvbnNpZGVyZWQgZHVlIHRvIGFjdGlvbnMgdGFrZW4uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnByb21wdEJ1aWxkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGlzdGVyID0gbmV3IExpc3RlcigpO1xuICAgICAgICB0aGlzLl9xdWVyeSA9ICcnOyAvLyBUT0RPOiB3ZSBtYXkgbm90IG5lZWQgdGhlIG51bGwgY2FzZT9cbiAgICAgICAgdGhpcy5fcGFnZSA9IDA7XG4gICAgICAgIHRoaXMuX3BhZ2luYXRpb24gPSAyNTA7XG4gICAgICAgIHRoaXMuX3RvdGFsRW50cmllcyA9IDA7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdBY3Rpb25zID0gW107XG4gICAgICAgIHRoaXMuX3RvdGFsYmxvY2tlZEV4dGVuc2lvbnNGb3VuZCA9IDA7XG4gICAgICAgIHRoaXMuX3RvdGFsYWxsb3dlZEV4dGVuc2lvbnNGb3VuZCA9IDA7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX2FwcCA9IGFwcDtcbiAgICAgICAgdGhpcy5faW5zdGFsbGVkID0gW107XG4gICAgICAgIHRoaXMuX3NlYXJjaFJlc3VsdCA9IFtdO1xuICAgICAgICB0aGlzLnNlcnZpY2VNYW5hZ2VyID0gc2VydmljZU1hbmFnZXI7XG4gICAgICAgIHRoaXMuc2VydmVyQ29ubmVjdGlvblNldHRpbmdzID0gU2VydmVyQ29ubmVjdGlvbi5tYWtlU2V0dGluZ3MoKTtcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkVXBkYXRlID0gbmV3IERlYm91bmNlcih0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgICAgICAgdGhpcy5saXN0ZXIubGlzdGluZ3NMb2FkZWQuY29ubmVjdCh0aGlzLl9saXN0aW5nSXNMb2FkZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLnNlYXJjaGVyID0gbmV3IFNlYXJjaGVyKHNldHRpbmdzLmNvbXBvc2l0ZVsnbnBtUmVnaXN0cnknXSwgc2V0dGluZ3MuY29tcG9zaXRlWyducG1DZG4nXSwgc2V0dGluZ3MuY29tcG9zaXRlWydlbmFibGVDZG4nXSk7XG4gICAgICAgIF9pc0Rpc2NsYWltZWQgPSBzZXR0aW5ncy5jb21wb3NpdGVbJ2Rpc2NsYWltZWQnXSA9PT0gdHJ1ZTtcbiAgICAgICAgc2V0dGluZ3MuY2hhbmdlZC5jb25uZWN0KCgpID0+IHtcbiAgICAgICAgICAgIF9pc0Rpc2NsYWltZWQgPSBzZXR0aW5ncy5jb21wb3NpdGVbJ2Rpc2NsYWltZWQnXSA9PT0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoZXIgPSBuZXcgU2VhcmNoZXIoc2V0dGluZ3MuY29tcG9zaXRlWyducG1SZWdpc3RyeSddLCBzZXR0aW5ncy5jb21wb3NpdGVbJ25wbUNkbiddLCBzZXR0aW5ncy5jb21wb3NpdGVbJ2VuYWJsZUNkbiddKTtcbiAgICAgICAgICAgIHZvaWQgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9saXN0aW5nSXNMb2FkZWQoXywgbGlzdGluZ3MpIHtcbiAgICAgICAgdGhpcy5fbGlzdE1vZGUgPSBsaXN0aW5ncy5tb2RlO1xuICAgICAgICB0aGlzLl9ibG9ja2VkRXh0ZW5zaW9uc0FycmF5ID0gbmV3IEFycmF5KCk7XG4gICAgICAgIGlmICh0aGlzLl9saXN0TW9kZSA9PT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgbGlzdGluZ3MuZW50cmllcy5tYXAoZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tlZEV4dGVuc2lvbnNBcnJheS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICByZWdleHA6IG5ldyBSZWdFeHAoZS5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZS50eXBlLFxuICAgICAgICAgICAgICAgICAgICByZWFzb246IGUucmVhc29uLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGlvbl9kYXRlOiBlLmNyZWF0aW9uX2RhdGUsXG4gICAgICAgICAgICAgICAgICAgIGxhc3RfdXBkYXRlX2RhdGU6IGUubGFzdF91cGRhdGVfZGF0ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYWxsb3dlZEV4dGVuc2lvbnNBcnJheSA9IG5ldyBBcnJheSgpO1xuICAgICAgICBpZiAodGhpcy5fbGlzdE1vZGUgPT09ICdhbGxvdycpIHtcbiAgICAgICAgICAgIGxpc3RpbmdzLmVudHJpZXMubWFwKGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FsbG93ZWRFeHRlbnNpb25zQXJyYXkucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXhwOiBuZXcgUmVnRXhwKGUubmFtZSksXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGUudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgcmVhc29uOiBlLnJlYXNvbixcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRpb25fZGF0ZTogZS5jcmVhdGlvbl9kYXRlLFxuICAgICAgICAgICAgICAgICAgICBsYXN0X3VwZGF0ZV9kYXRlOiBlLmxhc3RfdXBkYXRlX2RhdGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZvaWQgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcmVhZG9ubHkgYXJyYXkgb2YgdGhlIGluc3RhbGxlZCBleHRlbnNpb25zLlxuICAgICAqL1xuICAgIGdldCBpbnN0YWxsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YWxsZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgcmVhZG9ubHkgYXJyYXkgY29udGFpbmluZyB0aGUgbGF0ZXN0IHNlYXJjaCByZXN1bHRcbiAgICAgKi9cbiAgICBnZXQgc2VhcmNoUmVzdWx0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoUmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBOUE0gcmVwb3NpdG9yeSBzZWFyY2ggcXVlcnkuXG4gICAgICpcbiAgICAgKiBTZXR0aW5nIGl0cyB2YWx1ZSB0cmlnZ2VycyBhIG5ldyBzZWFyY2guXG4gICAgICovXG4gICAgZ2V0IHF1ZXJ5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcXVlcnk7XG4gICAgfVxuICAgIHNldCBxdWVyeSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9xdWVyeSA9IHZhbHVlO1xuICAgICAgICB2b2lkIHRoaXMuX2RlYm91bmNlZFVwZGF0ZS5pbnZva2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgTlBNIHJlcG9zaXRvcnkgc2VhcmNoIHBhZ2UuXG4gICAgICpcbiAgICAgKiBUaGUgbnBtIHJlcG9zaXRvcnkgc2VhcmNoIGlzIHBhZ2luYXRlZCBieSB0aGUgYHBhZ2luYXRpb25gIGF0dHJpYnV0ZS5cbiAgICAgKiBUaGUgYHBhZ2VgIHZhbHVlIHNlbGVjdHMgd2hpY2ggcGFnZSBpcyB1c2VkLlxuICAgICAqXG4gICAgICogU2V0dGluZyBpdHMgdmFsdWUgdHJpZ2dlcnMgYSBuZXcgc2VhcmNoLlxuICAgICAqL1xuICAgIGdldCBwYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFnZTtcbiAgICB9XG4gICAgc2V0IHBhZ2UodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcGFnZSA9IHZhbHVlO1xuICAgICAgICB2b2lkIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBOUE0gcmVwb3NpdG9yeSBzZWFyY2ggcGFnaW5hdGlvbi5cbiAgICAgKlxuICAgICAqIFRoZSBucG0gcmVwb3NpdG9yeSBzZWFyY2ggaXMgcGFnaW5hdGVkIGJ5IHRoZSBgcGFnaW5hdGlvbmAgYXR0cmlidXRlLlxuICAgICAqIFRoZSBgcGFnZWAgdmFsdWUgc2VsZWN0cyB3aGljaCBwYWdlIGlzIHVzZWQuXG4gICAgICpcbiAgICAgKiBTZXR0aW5nIGl0cyB2YWx1ZSB0cmlnZ2VycyBhIG5ldyBzZWFyY2guXG4gICAgICovXG4gICAgZ2V0IHBhZ2luYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYWdpbmF0aW9uO1xuICAgIH1cbiAgICBzZXQgcGFnaW5hdGlvbih2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wYWdpbmF0aW9uID0gdmFsdWU7XG4gICAgICAgIHZvaWQgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHRvdGFsIG51bWJlciBvZiByZXN1bHRzIGluIHRoZSBjdXJyZW50IHNlYXJjaC5cbiAgICAgKi9cbiAgICBnZXQgdG90YWxFbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG90YWxFbnRyaWVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgbGlzdCBtb2RlLlxuICAgICAqL1xuICAgIGdldCBsaXN0TW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RNb2RlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgdG90YWwgbnVtYmVyIG9mIGJsb2NrZWRFeHRlbnNpb25zIHJlc3VsdHMgaW4gdGhlIGN1cnJlbnQgc2VhcmNoLlxuICAgICAqL1xuICAgIGdldCB0b3RhbGJsb2NrZWRFeHRlbnNpb25zRm91bmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90b3RhbGJsb2NrZWRFeHRlbnNpb25zRm91bmQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSB0b3RhbCBudW1iZXIgb2YgYWxsb3dlZEV4dGVuc2lvbnMgcmVzdWx0cyBpbiB0aGUgY3VycmVudCBzZWFyY2guXG4gICAgICovXG4gICAgZ2V0IHRvdGFsYWxsb3dlZEV4dGVuc2lvbnNGb3VuZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsYWxsb3dlZEV4dGVuc2lvbnNGb3VuZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgbW9kZWwuXG4gICAgICovXG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGVyZSBhcmUgY3VycmVudGx5IGFueSBhY3Rpb25zIHBlbmRpbmcuXG4gICAgICovXG4gICAgaGFzUGVuZGluZ0FjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZW5kaW5nQWN0aW9ucy5sZW5ndGggPiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnN0YWxsIGFuIGV4dGVuc2lvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRyeSBBbiBlbnRyeSBpbmRpY2F0aW5nIHdoaWNoIGV4dGVuc2lvbiB0byBpbnN0YWxsLlxuICAgICAqL1xuICAgIGFzeW5jIGluc3RhbGwoZW50cnkpIHtcbiAgICAgICAgaWYgKGVudHJ5Lmluc3RhbGxlZCkge1xuICAgICAgICAgICAgLy8gVXBkYXRpbmdcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX3BlcmZvcm1BY3Rpb24oJ2luc3RhbGwnLCBlbnRyeSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgIT09ICdvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0SW5zdGFsbEVycm9yKGVudHJ5Lm5hbWUsIGRhdGEubWVzc2FnZSwgdGhpcy50cmFuc2xhdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmNoZWNrQ29tcGFuaW9uUGFja2FnZXMoZW50cnkpLnRoZW4oc2hvdWxkSW5zdGFsbCA9PiB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkSW5zdGFsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wZXJmb3JtQWN0aW9uKCdpbnN0YWxsJywgZW50cnkpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyAhPT0gJ29rJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0SW5zdGFsbEVycm9yKGVudHJ5Lm5hbWUsIGRhdGEubWVzc2FnZSwgdGhpcy50cmFuc2xhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVuaW5zdGFsbCBhbiBleHRlbnNpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50cnkgQW4gZW50cnkgaW5kaWNhdGluZyB3aGljaCBleHRlbnNpb24gdG8gdW5pbnN0YWxsLlxuICAgICAqL1xuICAgIGFzeW5jIHVuaW5zdGFsbChlbnRyeSkge1xuICAgICAgICBpZiAoIWVudHJ5Lmluc3RhbGxlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb3QgaW5zdGFsbGVkLCBjYW5ub3QgdW5pbnN0YWxsOiAke2VudHJ5Lm5hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5fcGVyZm9ybUFjdGlvbigndW5pbnN0YWxsJywgZW50cnkpO1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5hYmxlIGFuIGV4dGVuc2lvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRyeSBBbiBlbnRyeSBpbmRpY2F0aW5nIHdoaWNoIGV4dGVuc2lvbiB0byBlbmFibGUuXG4gICAgICovXG4gICAgYXN5bmMgZW5hYmxlKGVudHJ5KSB7XG4gICAgICAgIGlmIChlbnRyeS5lbmFibGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFscmVhZHkgZW5hYmxlZDogJHtlbnRyeS5uYW1lfWApO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuX3BlcmZvcm1BY3Rpb24oJ2VuYWJsZScsIGVudHJ5KTtcbiAgICAgICAgYXdhaXQgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzYWJsZSBhbiBleHRlbnNpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZW50cnkgQW4gZW50cnkgaW5kaWNhdGluZyB3aGljaCBleHRlbnNpb24gdG8gZGlzYWJsZS5cbiAgICAgKi9cbiAgICBhc3luYyBkaXNhYmxlKGVudHJ5KSB7XG4gICAgICAgIGlmICghZW50cnkuZW5hYmxlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBbHJlYWR5IGRpc2FibGVkOiAke2VudHJ5Lm5hbWV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy5fcGVyZm9ybUFjdGlvbignZGlzYWJsZScsIGVudHJ5KTtcbiAgICAgICAgYXdhaXQgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgZm9yIGNvbXBhbmlvbiBwYWNrYWdlcyBpbiBrZXJuZWxzIG9yIHNlcnZlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlbnRyeSBBbiBlbnRyeSBpbmRpY2F0aW5nIHdoaWNoIGV4dGVuc2lvbiB0byBjaGVjay5cbiAgICAgKi9cbiAgICBjaGVja0NvbXBhbmlvblBhY2thZ2VzKGVudHJ5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaGVyXG4gICAgICAgICAgICAuZmV0Y2hQYWNrYWdlRGF0YShlbnRyeS5uYW1lLCBlbnRyeS5sYXRlc3RfdmVyc2lvbilcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKCFkYXRhIHx8ICFkYXRhLmp1cHl0ZXJsYWIgfHwgIWRhdGEuanVweXRlcmxhYi5kaXNjb3ZlcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRpc2NvdmVyeSA9IGRhdGEuanVweXRlcmxhYi5kaXNjb3Zlcnk7XG4gICAgICAgICAgICBjb25zdCBrZXJuZWxDb21wYW5pb25zID0gW107XG4gICAgICAgICAgICBpZiAoZGlzY292ZXJ5Lmtlcm5lbCkge1xuICAgICAgICAgICAgICAgIC8vIG1hdGNoIHNwZWNzXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXJuZWxJbmZvIG9mIGRpc2NvdmVyeS5rZXJuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hlcyA9IFByaXZhdGUubWF0Y2hTcGVjcyhrZXJuZWxJbmZvLCB0aGlzLnNlcnZpY2VNYW5hZ2VyLmtlcm5lbHNwZWNzLnNwZWNzKTtcbiAgICAgICAgICAgICAgICAgICAga2VybmVsQ29tcGFuaW9ucy5wdXNoKHsga2VybmVsSW5mbywga2VybmVsczogbWF0Y2hlcyB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoa2VybmVsQ29tcGFuaW9ucy5sZW5ndGggPCAxICYmICFkaXNjb3Zlcnkuc2VydmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJlc2VudENvbXBhbmlvbnMoa2VybmVsQ29tcGFuaW9ucywgZGlzY292ZXJ5LnNlcnZlciwgdGhpcy50cmFuc2xhdG9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRyaWdnZXIgYSBidWlsZCBjaGVjayB0byBpbmNvcnBvcmF0ZSBhY3Rpb25zIHRha2VuLlxuICAgICAqL1xuICAgIHRyaWdnZXJCdWlsZENoZWNrKCkge1xuICAgICAgICBjb25zdCBidWlsZGVyID0gdGhpcy5zZXJ2aWNlTWFuYWdlci5idWlsZGVyO1xuICAgICAgICBpZiAoYnVpbGRlci5pc0F2YWlsYWJsZSAmJiAhdGhpcy5wcm9tcHRCdWlsZCkge1xuICAgICAgICAgICAgY29uc3QgY29tcGxldGVkID0gYnVpbGRlci5nZXRTdGF0dXMoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAnYnVpbGRpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBpZ2d5LWJhY2sgb250byBleGlzdGluZyBidWlsZFxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBDYW4gdGhpcyBjYXVzZSBkaWFsb2cgY29sbGlzaW9uIG9uIGJ1aWxkIGNvbXBsZXRpb24/XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb0J1aWxkKHRoaXMuX2FwcCwgYnVpbGRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09ICduZWVkZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnByb21wdEJ1aWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvbXB0QnVpbGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9hZGRQZW5kaW5nQWN0aW9uKGNvbXBsZXRlZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhIGJ1aWxkIG9uIHRoZSBzZXJ2ZXJcbiAgICAgKi9cbiAgICBwZXJmb3JtQnVpbGQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb21wdEJ1aWxkKSB7XG4gICAgICAgICAgICB0aGlzLnByb21wdEJ1aWxkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29tcGxldGVkID0gZG9CdWlsZCh0aGlzLl9hcHAsIHRoaXMuc2VydmljZU1hbmFnZXIuYnVpbGRlcik7XG4gICAgICAgIHRoaXMuX2FkZFBlbmRpbmdBY3Rpb24oY29tcGxldGVkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSWdub3JlIGEgYnVpbGQgcmVjb21tZW5kYXRpb25cbiAgICAgKi9cbiAgICBpZ25vcmVCdWlsZFJlY29tbWVuZGF0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9tcHRCdWlsZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9tcHRCdWlsZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElnbm9yZSBhIGJ1aWxkIHJlY29tbWVuZGF0aW9uXG4gICAgICovXG4gICAgcmVmcmVzaEluc3RhbGxlZCgpIHtcbiAgICAgICAgY29uc3QgcmVmcmVzaCA9IHRoaXMudXBkYXRlKHRydWUpO1xuICAgICAgICB0aGlzLl9hZGRQZW5kaW5nQWN0aW9uKHJlZnJlc2gpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGUgc2VhcmNoIHJlc3VsdHMgZnJvbSBhbiBucG0gcmVwb3NpdG9yeSBxdWVyeSBpbnRvIGVudHJpZXNcbiAgICAgKiBhbmQgcmVtb3ZlIGVudHJpZXMgd2l0aCAnZGVwcmVjYXRlZCcgaW4gdGhlIGtleXdvcmQgbGlzdFxuICAgICAqXG4gICAgICogQHBhcmFtIHJlcyBQcm9taXNlIHRvIGFuIG5wbSBxdWVyeSByZXN1bHQuXG4gICAgICovXG4gICAgYXN5bmMgdHJhbnNsYXRlU2VhcmNoUmVzdWx0KHJlcykge1xuICAgICAgICBjb25zdCBlbnRyaWVzID0ge307XG4gICAgICAgIHRoaXMuX3RvdGFsYmxvY2tlZEV4dGVuc2lvbnNGb3VuZCA9IDA7XG4gICAgICAgIHRoaXMuX3RvdGFsYWxsb3dlZEV4dGVuc2lvbnNGb3VuZCA9IDA7XG4gICAgICAgIHRoaXMuX3RvdGFsRW50cmllcyA9IDA7XG4gICAgICAgIGZvciAoY29uc3Qgb2JqIG9mIChhd2FpdCByZXMpLm9iamVjdHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHBrZyA9IG9iai5wYWNrYWdlO1xuICAgICAgICAgICAgaWYgKHBrZy5rZXl3b3Jkcy5pbmRleE9mKCdkZXByZWNhdGVkJykgPj0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdG90YWxFbnRyaWVzID0gdGhpcy5fdG90YWxFbnRyaWVzICsgMTtcbiAgICAgICAgICAgIGNvbnN0IGlzYmxvY2tlZEV4dGVuc2lvbnMgPSB0aGlzLmlzTGlzdGVkKHBrZy5uYW1lLCB0aGlzLl9ibG9ja2VkRXh0ZW5zaW9uc0FycmF5KTtcbiAgICAgICAgICAgIGlmIChpc2Jsb2NrZWRFeHRlbnNpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG90YWxibG9ja2VkRXh0ZW5zaW9uc0ZvdW5kID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG90YWxibG9ja2VkRXh0ZW5zaW9uc0ZvdW5kICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGlzYWxsb3dlZEV4dGVuc2lvbnMgPSB0aGlzLmlzTGlzdGVkKHBrZy5uYW1lLCB0aGlzLl9hbGxvd2VkRXh0ZW5zaW9uc0FycmF5KTtcbiAgICAgICAgICAgIGlmIChpc2FsbG93ZWRFeHRlbnNpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG90YWxhbGxvd2VkRXh0ZW5zaW9uc0ZvdW5kID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG90YWxhbGxvd2VkRXh0ZW5zaW9uc0ZvdW5kICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVudHJpZXNbcGtnLm5hbWVdID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IHBrZy5uYW1lLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwa2cuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgdXJsOiAnaG9tZXBhZ2UnIGluIHBrZy5saW5rc1xuICAgICAgICAgICAgICAgICAgICA/IHBrZy5saW5rcy5ob21lcGFnZVxuICAgICAgICAgICAgICAgICAgICA6ICdyZXBvc2l0b3J5JyBpbiBwa2cubGlua3NcbiAgICAgICAgICAgICAgICAgICAgICAgID8gcGtnLmxpbmtzLnJlcG9zaXRvcnlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcGtnLmxpbmtzLm5wbSxcbiAgICAgICAgICAgICAgICBpbnN0YWxsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXR1czogbnVsbCxcbiAgICAgICAgICAgICAgICBsYXRlc3RfdmVyc2lvbjogcGtnLnZlcnNpb24sXG4gICAgICAgICAgICAgICAgaW5zdGFsbGVkX3ZlcnNpb246ICcnLFxuICAgICAgICAgICAgICAgIGJsb2NrZWRFeHRlbnNpb25zRW50cnk6IGlzYmxvY2tlZEV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgICAgYWxsb3dlZEV4dGVuc2lvbnNFbnRyeTogaXNhbGxvd2VkRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgICBwa2dfdHlwZTogJ3NvdXJjZScsXG4gICAgICAgICAgICAgICAgaW5zdGFsbDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbnRyaWVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc2xhdGUgaW5zdGFsbGVkIGV4dGVuc2lvbnMgaW5mb3JtYXRpb24gZnJvbSB0aGUgc2VydmVyIGludG8gZW50cmllcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXMgUHJvbWlzZSB0byB0aGUgc2VydmVyIHJlcGx5IGRhdGEuXG4gICAgICovXG4gICAgYXN5bmMgdHJhbnNsYXRlSW5zdGFsbGVkKHJlcykge1xuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBjb25zdCBlbnRyaWVzID0ge307XG4gICAgICAgIGZvciAoY29uc3QgcGtnIG9mIGF3YWl0IHJlcykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChyZXMudGhlbihpbmZvID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgICAgICAgICBlbnRyaWVzW3BrZy5uYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogcGtnLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBwa2cuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHVybDogcGtnLnVybCxcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFsbGVkOiBwa2cuaW5zdGFsbGVkICE9PSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogcGtnLmVuYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogcGtnLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0X3ZlcnNpb246IHBrZy5sYXRlc3RfdmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFsbGVkX3ZlcnNpb246IHBrZy5pbnN0YWxsZWRfdmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tlZEV4dGVuc2lvbnNFbnRyeTogdGhpcy5pc0xpc3RlZChwa2cubmFtZSwgdGhpcy5fYmxvY2tlZEV4dGVuc2lvbnNBcnJheSksXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRFeHRlbnNpb25zRW50cnk6IHRoaXMuaXNMaXN0ZWQocGtnLm5hbWUsIHRoaXMuX2FsbG93ZWRFeHRlbnNpb25zQXJyYXkpLFxuICAgICAgICAgICAgICAgICAgICBwa2dfdHlwZTogcGtnLnBrZ190eXBlLFxuICAgICAgICAgICAgICAgICAgICBpbnN0YWxsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWNrYWdlTWFuYWdlcjogKF9hID0gcGtnLmluc3RhbGwpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wYWNrYWdlTWFuYWdlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhY2thZ2VOYW1lOiAoX2IgPSBwa2cuaW5zdGFsbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnBhY2thZ2VOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pbnN0YWxsSW5zdHJ1Y3Rpb25zOiAoX2MgPSBwa2cuaW5zdGFsbCkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnVuaW5zdGFsbEluc3RydWN0aW9uc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGVudHJpZXM7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpc0xpc3RlZChuYW1lLCBsaXN0QXJyYXkpIHtcbiAgICAgICAgbGV0IGVudHJ5ID0gdW5kZWZpbmVkO1xuICAgICAgICBsaXN0QXJyYXkuZm9yRWFjaCgobGlzdEVudHJ5KSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAobGlzdEVudHJ5LnJlZ2V4cCAmJiAoKF9hID0gbGlzdEVudHJ5LnJlZ2V4cCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRlc3QobmFtZSkpKSB7XG4gICAgICAgICAgICAgICAgZW50cnkgPSBsaXN0RW50cnk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ha2UgYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgZm9yIGluZm8gYWJvdXQgaXRzIGluc3RhbGxlZCBleHRlbnNpb25zLlxuICAgICAqL1xuICAgIGZldGNoSW5zdGFsbGVkKHJlZnJlc2hJbnN0YWxsZWQgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKEVYVEVOU0lPTl9BUElfUEFUSCwgdGhpcy5zZXJ2ZXJDb25uZWN0aW9uU2V0dGluZ3MuYmFzZVVybCk7XG4gICAgICAgIGlmIChyZWZyZXNoSW5zdGFsbGVkKSB7XG4gICAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZCgncmVmcmVzaCcsICcxJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IFNlcnZlckNvbm5lY3Rpb24ubWFrZVJlcXVlc3QodXJsLnRvU3RyaW5nKCksIHt9LCB0aGlzLnNlcnZlckNvbm5lY3Rpb25TZXR0aW5ncykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBQcml2YXRlLmhhbmRsZUVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXF1ZXN0LnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJDb25uZWN0aW9uRXJyb3IgPSBudWxsO1xuICAgICAgICB9LCByZWFzb24gPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJDb25uZWN0aW9uRXJyb3IgPSByZWFzb24udG9TdHJpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggd2l0aCBjdXJyZW50IHF1ZXJ5LlxuICAgICAqXG4gICAgICogU2V0cyBzZWFyY2hFcnJvciBhbmQgdG90YWxFbnRyaWVzIGFzIGFwcHJvcHJpYXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8eyBba2V5OiBzdHJpbmddOiBJRW50cnk7IH0+fSBUaGUgc2VhcmNoIHJlc3VsdCBhcyBhIG1hcCBvZiBlbnRyaWVzLlxuICAgICAqL1xuICAgIGFzeW5jIHBlcmZvcm1TZWFyY2goKSB7XG4gICAgICAgIGlmICh0aGlzLnF1ZXJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU3RhcnQgdGhlIHNlYXJjaCB3aXRob3V0IHdhaXRpbmcgZm9yIGl0OlxuICAgICAgICBjb25zdCBzZWFyY2ggPSB0aGlzLnNlYXJjaGVyLnNlYXJjaEV4dGVuc2lvbnModGhpcy5xdWVyeSwgdGhpcy5wYWdlLCB0aGlzLnBhZ2luYXRpb24pO1xuICAgICAgICBjb25zdCBzZWFyY2hNYXBQcm9taXNlID0gdGhpcy50cmFuc2xhdGVTZWFyY2hSZXN1bHQoc2VhcmNoKTtcbiAgICAgICAgbGV0IHNlYXJjaE1hcDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNlYXJjaE1hcCA9IGF3YWl0IHNlYXJjaE1hcFByb21pc2U7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEVycm9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAocmVhc29uKSB7XG4gICAgICAgICAgICBzZWFyY2hNYXAgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoRXJyb3IgPSByZWFzb24udG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VhcmNoTWFwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBRdWVyeSB0aGUgaW5zdGFsbGVkIGV4dGVuc2lvbnMuXG4gICAgICpcbiAgICAgKiBTZXRzIGluc3RhbGxlZEVycm9yIGFzIGFwcHJvcHJpYXRlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1Byb21pc2U8eyBba2V5OiBzdHJpbmddOiBJRW50cnk7IH0+fSBBIG1hcCBvZiBpbnN0YWxsZWQgZXh0ZW5zaW9ucy5cbiAgICAgKi9cbiAgICBhc3luYyBxdWVyeUluc3RhbGxlZChyZWZyZXNoSW5zdGFsbGVkKSB7XG4gICAgICAgIGxldCBpbnN0YWxsZWRNYXA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpbnN0YWxsZWRNYXAgPSBhd2FpdCB0aGlzLnRyYW5zbGF0ZUluc3RhbGxlZCh0aGlzLmZldGNoSW5zdGFsbGVkKHJlZnJlc2hJbnN0YWxsZWQpKTtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFsbGVkRXJyb3IgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChyZWFzb24pIHtcbiAgICAgICAgICAgIGluc3RhbGxlZE1hcCA9IHt9O1xuICAgICAgICAgICAgdGhpcy5pbnN0YWxsZWRFcnJvciA9IHJlYXNvbi50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnN0YWxsZWRNYXA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgY3VycmVudCBtb2RlbC5cbiAgICAgKlxuICAgICAqIFRoaXMgd2lsbCBxdWVyeSB0aGUgTlBNIHJlcG9zaXRvcnksIGFuZCB0aGUgbm90ZWJvb2sgc2VydmVyLlxuICAgICAqXG4gICAgICogRW1pdHMgdGhlIGBzdGF0ZUNoYW5nZWRgIHNpZ25hbCBvbiBzdWNjZXNzZnVsIGNvbXBsZXRpb24uXG4gICAgICovXG4gICAgYXN5bmMgdXBkYXRlKHJlZnJlc2hJbnN0YWxsZWQgPSBmYWxzZSkge1xuICAgICAgICBpZiAoTGlzdE1vZGVsLmlzRGlzY2xhaW1lZCgpKSB7XG4gICAgICAgICAgICBjb25zdCBbc2VhcmNoTWFwLCBpbnN0YWxsZWRNYXBdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIHRoaXMucGVyZm9ybVNlYXJjaCgpLFxuICAgICAgICAgICAgICAgIHRoaXMucXVlcnlJbnN0YWxsZWQocmVmcmVzaEluc3RhbGxlZClcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgLy8gTWFwIHJlc3VsdHMgdG8gYXR0cmlidXRlczpcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbGxlZCA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoaW5zdGFsbGVkTWFwKSkge1xuICAgICAgICAgICAgICAgIGluc3RhbGxlZC5wdXNoKGluc3RhbGxlZE1hcFtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2luc3RhbGxlZCA9IGluc3RhbGxlZC5zb3J0KFByaXZhdGUuY29tcGFyYXRvcik7XG4gICAgICAgICAgICBjb25zdCBzZWFyY2hSZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNlYXJjaE1hcCkpIHtcbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgb3V0IGluc3RhbGxlZCBlbnRyaWVzIGZyb20gc2VhcmNoIHJlc3VsdHM6XG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbGxlZE1hcFtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0LnB1c2goc2VhcmNoTWFwW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0LnB1c2goaW5zdGFsbGVkTWFwW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NlYXJjaFJlc3VsdCA9IHNlYXJjaFJlc3VsdC5zb3J0KFByaXZhdGUuY29tcGFyYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2lnbmFsIHVwZGF0ZWQgc3RhdGVcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHRvIHBlcmZvcm0gYW4gYWN0aW9uIG9uIGFuIGV4dGVuc2lvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhY3Rpb24gQSB2YWxpZCBhY3Rpb24gdG8gcGVyZm9ybS5cbiAgICAgKiBAcGFyYW0gZW50cnkgVGhlIGV4dGVuc2lvbiB0byBwZXJmb3JtIHRoZSBhY3Rpb24gb24uXG4gICAgICovXG4gICAgX3BlcmZvcm1BY3Rpb24oYWN0aW9uLCBlbnRyeSkge1xuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKEVYVEVOU0lPTl9BUElfUEFUSCwgdGhpcy5zZXJ2ZXJDb25uZWN0aW9uU2V0dGluZ3MuYmFzZVVybCk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBjbWQ6IGFjdGlvbixcbiAgICAgICAgICAgICAgICBleHRlbnNpb25fbmFtZTogZW50cnkubmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29tcGxldGVkID0gU2VydmVyQ29ubmVjdGlvbi5tYWtlUmVxdWVzdCh1cmwudG9TdHJpbmcoKSwgcmVxdWVzdCwgdGhpcy5zZXJ2ZXJDb25uZWN0aW9uU2V0dGluZ3MpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgUHJpdmF0ZS5oYW5kbGVFcnJvcihyZXNwb25zZSk7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJCdWlsZENoZWNrKCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29tcGxldGVkLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJDb25uZWN0aW9uRXJyb3IgPSBudWxsO1xuICAgICAgICB9LCByZWFzb24gPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJDb25uZWN0aW9uRXJyb3IgPSByZWFzb24udG9TdHJpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2FkZFBlbmRpbmdBY3Rpb24oY29tcGxldGVkKTtcbiAgICAgICAgcmV0dXJuIGNvbXBsZXRlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgcGVuZGluZyBhY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGVuZGluZyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBhY3Rpb24gaXMgY29tcGxldGVkLlxuICAgICAqL1xuICAgIF9hZGRQZW5kaW5nQWN0aW9uKHBlbmRpbmcpIHtcbiAgICAgICAgLy8gQWRkIHRvIHBlbmRpbmcgYWN0aW9ucyBjb2xsZWN0aW9uXG4gICAgICAgIHRoaXMuX3BlbmRpbmdBY3Rpb25zLnB1c2gocGVuZGluZyk7XG4gICAgICAgIC8vIEVuc3VyZSBhY3Rpb24gaXMgcmVtb3ZlZCB3aGVuIHJlc29sdmVkXG4gICAgICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGkgPSB0aGlzLl9wZW5kaW5nQWN0aW9ucy5pbmRleE9mKHBlbmRpbmcpO1xuICAgICAgICAgICAgdGhpcy5fcGVuZGluZ0FjdGlvbnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZWQuZW1pdCh1bmRlZmluZWQpO1xuICAgICAgICB9O1xuICAgICAgICBwZW5kaW5nLnRoZW4ocmVtb3ZlLCByZW1vdmUpO1xuICAgICAgICAvLyBTaWduYWwgY2hhbmdlZCBzdGF0ZVxuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlZC5lbWl0KHVuZGVmaW5lZCk7XG4gICAgfVxufVxubGV0IF9pc0Rpc2NsYWltZWQgPSBmYWxzZTtcbi8qKlxuICogTGlzdE1vZGVsIHN0YXRpY3MuXG4gKi9cbihmdW5jdGlvbiAoTGlzdE1vZGVsKSB7XG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBmdW5jdGlvbiB0byBjaGVjayB3aGV0aGVyIGFuIGVudHJ5IGNhbiBiZSB1cGRhdGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGVudHJ5IFRoZSBlbnRyeSB0byBjaGVjay5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBlbnRyeUhhc1VwZGF0ZShlbnRyeSkge1xuICAgICAgICBpZiAoIWVudHJ5Lmluc3RhbGxlZCB8fCAhZW50cnkubGF0ZXN0X3ZlcnNpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VtdmVyLmx0KGVudHJ5Lmluc3RhbGxlZF92ZXJzaW9uLCBlbnRyeS5sYXRlc3RfdmVyc2lvbik7XG4gICAgfVxuICAgIExpc3RNb2RlbC5lbnRyeUhhc1VwZGF0ZSA9IGVudHJ5SGFzVXBkYXRlO1xuICAgIGZ1bmN0aW9uIGlzRGlzY2xhaW1lZCgpIHtcbiAgICAgICAgcmV0dXJuIF9pc0Rpc2NsYWltZWQ7XG4gICAgfVxuICAgIExpc3RNb2RlbC5pc0Rpc2NsYWltZWQgPSBpc0Rpc2NsYWltZWQ7XG4gICAgZnVuY3Rpb24gdG9vZ2xlRGlzY2xhaW1lZCgpIHtcbiAgICAgICAgX2lzRGlzY2xhaW1lZCA9ICFfaXNEaXNjbGFpbWVkO1xuICAgIH1cbiAgICBMaXN0TW9kZWwudG9vZ2xlRGlzY2xhaW1lZCA9IHRvb2dsZURpc2NsYWltZWQ7XG59KShMaXN0TW9kZWwgfHwgKExpc3RNb2RlbCA9IHt9KSk7XG4vKipcbiAqIEEgbmFtZXNwYWNlIGZvciBwcml2YXRlIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbnZhciBQcml2YXRlO1xuKGZ1bmN0aW9uIChQcml2YXRlKSB7XG4gICAgLyoqXG4gICAgICogQSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRoYXQgc29ydHMgYWxsb3dlZEV4dGVuc2lvbnMgb3JncyB0byB0aGUgdG9wLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbXBhcmF0b3IoYSwgYikge1xuICAgICAgICBpZiAoYS5uYW1lID09PSBiLm5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRlc3RBID0gaXNKdXB5dGVyT3JnKGEubmFtZSk7XG4gICAgICAgIGNvbnN0IHRlc3RCID0gaXNKdXB5dGVyT3JnKGIubmFtZSk7XG4gICAgICAgIGlmICh0ZXN0QSA9PT0gdGVzdEIpIHtcbiAgICAgICAgICAgIC8vIFJldGFpbiBzb3J0LW9yZGVyIGZyb20gQVBJXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0ZXN0QSAmJiAhdGVzdEIpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIFByaXZhdGUuY29tcGFyYXRvciA9IGNvbXBhcmF0b3I7XG4gICAgLyoqXG4gICAgICogTWF0Y2gga2VybmVsIHNwZWNzIGFnYWluc3Qga2VybmVsIHNwZWMgcmVnZXhwc1xuICAgICAqXG4gICAgICogQHBhcmFtIGtlcm5lbEluZm8gVGhlIGluZm8gY29udGFpbmluZyB0aGUgcmVnZXhwIHBhdHRlcm5zXG4gICAgICogQHBhcmFtIHNwZWNzIFRoZSBhdmFpbGFibGUga2VybmVsIHNwZWNzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1hdGNoU3BlY3Moa2VybmVsSW5mbywgc3BlY3MpIHtcbiAgICAgICAgaWYgKCFzcGVjcykge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBbXTtcbiAgICAgICAgbGV0IHJlTGFuZyA9IG51bGw7XG4gICAgICAgIGxldCByZU5hbWUgPSBudWxsO1xuICAgICAgICBpZiAoa2VybmVsSW5mby5rZXJuZWxfc3BlYy5sYW5ndWFnZSkge1xuICAgICAgICAgICAgcmVMYW5nID0gbmV3IFJlZ0V4cChrZXJuZWxJbmZvLmtlcm5lbF9zcGVjLmxhbmd1YWdlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2VybmVsSW5mby5rZXJuZWxfc3BlYy5kaXNwbGF5X25hbWUpIHtcbiAgICAgICAgICAgIHJlTmFtZSA9IG5ldyBSZWdFeHAoa2VybmVsSW5mby5rZXJuZWxfc3BlYy5kaXNwbGF5X25hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNwZWNzLmtlcm5lbHNwZWNzKSkge1xuICAgICAgICAgICAgY29uc3Qgc3BlYyA9IHNwZWNzLmtlcm5lbHNwZWNzW2tleV07XG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChyZUxhbmcpIHtcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHJlTGFuZy50ZXN0KHNwZWMubGFuZ3VhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFtYXRjaCAmJiByZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHJlTmFtZS50ZXN0KHNwZWMuZGlzcGxheV9uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIG1hdGNoZXMucHVzaChzcGVjKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG4gICAgUHJpdmF0ZS5tYXRjaFNwZWNzID0gbWF0Y2hTcGVjcztcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgcmVzcG9uc2UgdG8gYW4gZXhjZXB0aW9uIG9uIGVycm9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlc3BvbnNlIFRoZSByZXNwb25zZSB0byBpbnNwZWN0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGhhbmRsZUVycm9yKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHtyZXNwb25zZS5zdGF0dXN9ICgke3Jlc3BvbnNlLnN0YXR1c1RleHR9KWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gICAgUHJpdmF0ZS5oYW5kbGVFcnJvciA9IGhhbmRsZUVycm9yO1xufSkoUHJpdmF0ZSB8fCAoUHJpdmF0ZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2RlbC5qcy5tYXAiLCIvLyBDb3B5cmlnaHQgKGMpIEp1cHl0ZXIgRGV2ZWxvcG1lbnQgVGVhbS5cbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTW9kaWZpZWQgQlNEIExpY2Vuc2UuXG4vKipcbiAqIEFuIG9iamVjdCBmb3Igc2VhcmNoaW5nIGFuIE5QTSByZWdpc3RyeS5cbiAqXG4gKiBTZWFyY2hlcyB0aGUgTlBNIHJlZ2lzdHJ5IHZpYSB3ZWIgQVBJOlxuICogaHR0cHM6Ly9naXRodWIuY29tL25wbS9yZWdpc3RyeS9ibG9iL21hc3Rlci9kb2NzL1JFR0lTVFJZLUFQSS5tZFxuICovXG5leHBvcnQgY2xhc3MgU2VhcmNoZXIge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIFNlYXJjaGVyIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZXBvVXJpIFRoZSBVUkkgb2YgdGhlIE5QTSByZWdpc3RyeSB0byB1c2UuXG4gICAgICogQHBhcmFtIGNkblVyaSBUaGUgVVJJIG9mIHRoZSBDRE4gdG8gdXNlIGZvciBmZXRjaGluZyBmdWxsIHBhY2thZ2UgZGF0YS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXBvVXJpID0gJ2h0dHBzOi8vcmVnaXN0cnkubnBtanMub3JnLy0vdjEvJywgY2RuVXJpID0gJ2h0dHBzOi8vdW5wa2cuY29tJywgZW5hYmxlQ2RuID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnJlcG9VcmkgPSByZXBvVXJpO1xuICAgICAgICB0aGlzLmNkblVyaSA9IGNkblVyaTtcbiAgICAgICAgdGhpcy5lbmFibGVDZG4gPSBlbmFibGVDZG47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBmb3IgYSBqdXB5dGVybGFiIGV4dGVuc2lvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBxdWVyeSBUaGUgcXVlcnkgdG8gc2VuZC4gYGtleXdvcmRzOlwianVweXRlcmxhYi1leHRlbnNpb25cImAgd2lsbCBiZSBhcHBlbmRlZCB0byB0aGUgcXVlcnkuXG4gICAgICogQHBhcmFtIHBhZ2UgVGhlIHBhZ2Ugb2YgcmVzdWx0cyB0byBmZXRjaC5cbiAgICAgKiBAcGFyYW0gcGFnZWluYXRpb24gVGhlIHBhZ2luYXRpb24gc2l6ZSB0byB1c2UuIFNlZSByZWdpc3RyeSBBUEkgZG9jdW1lbnRhdGlvbiBmb3IgYWNjZXB0YWJsZSB2YWx1ZXMuXG4gICAgICovXG4gICAgc2VhcmNoRXh0ZW5zaW9ucyhxdWVyeSwgcGFnZSA9IDAsIHBhZ2VpbmF0aW9uID0gMjUwKSB7XG4gICAgICAgIGNvbnN0IHVyaSA9IG5ldyBVUkwoJ3NlYXJjaCcsIHRoaXMucmVwb1VyaSk7XG4gICAgICAgIC8vIE5vdGU6IFNwYWNlcyBhcmUgZW5jb2RlZCB0byAnKycgc2lnbnMhXG4gICAgICAgIGNvbnN0IHRleHQgPSBgJHtxdWVyeX0ga2V5d29yZHM6XCJqdXB5dGVybGFiLWV4dGVuc2lvblwiYDtcbiAgICAgICAgdXJpLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ3RleHQnLCB0ZXh0KTtcbiAgICAgICAgdXJpLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ3NpemUnLCBwYWdlaW5hdGlvbi50b1N0cmluZygpKTtcbiAgICAgICAgdXJpLnNlYXJjaFBhcmFtcy5hcHBlbmQoJ2Zyb20nLCAocGFnZWluYXRpb24gKiBwYWdlKS50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIGZldGNoKHVyaS50b1N0cmluZygpKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZldGNoIHBhY2thZ2UuanNvbiBvZiBhIHBhY2thZ2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIFRoZSBwYWNrYWdlIG5hbWUuXG4gICAgICogQHBhcmFtIHZlcnNpb24gVGhlIHZlcnNpb24gb2YgdGhlIHBhY2thZ2UgdG8gZmV0Y2guXG4gICAgICovXG4gICAgZmV0Y2hQYWNrYWdlRGF0YShuYW1lLCB2ZXJzaW9uKSB7XG4gICAgICAgIGNvbnN0IHVyaSA9IHRoaXMuZW5hYmxlQ2RuXG4gICAgICAgICAgICA/IG5ldyBVUkwoYC8ke25hbWV9QCR7dmVyc2lvbn0vcGFja2FnZS5qc29uYCwgdGhpcy5jZG5VcmkpXG4gICAgICAgICAgICA6IG5ldyBVUkwoYC8ke25hbWV9LyR7dmVyc2lvbn1gLCB0aGlzLnJlcG9VcmkpO1xuICAgICAgICByZXR1cm4gZmV0Y2godXJpLnRvU3RyaW5nKCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgTlBNIG9yZyBpcyBhIEp1cHl0ZXIgb25lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNKdXB5dGVyT3JnKG5hbWUpIHtcbiAgICAvKipcbiAgICAgKiBBIGxpc3Qgb2YganVweXRlcmxhYiBOUE0gb3Jncy5cbiAgICAgKi9cbiAgICBjb25zdCBqdXB5dGVyT3JnID0gWydqdXB5dGVybGFiJywgJ2p1cHl0ZXItd2lkZ2V0cyddO1xuICAgIGNvbnN0IHBhcnRzID0gbmFtZS5zcGxpdCgnLycpO1xuICAgIGNvbnN0IGZpcnN0ID0gcGFydHNbMF07XG4gICAgcmV0dXJuIChwYXJ0cy5sZW5ndGggPiAxICYmIC8vIEhhcyBhIGZpcnN0IHBhcnRcbiAgICAgICAgISFmaXJzdCAmJiAvLyB3aXRoIGEgZmluaXRlIGxlbmd0aFxuICAgICAgICBmaXJzdFswXSA9PT0gJ0AnICYmIC8vIGNvcnJlc3BvbmRpbmcgdG8gYW4gb3JnIG5hbWVcbiAgICAgICAganVweXRlck9yZy5pbmRleE9mKGZpcnN0LnNsaWNlKDEpKSAhPT0gLTEgLy8gaW4gdGhlIG9yZyBhbGxvd2VkRXh0ZW5zaW9ucy5cbiAgICApO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bnBtLmpzLm1hcCIsIi8vIENvcHlyaWdodCAoYykgSnVweXRlciBEZXZlbG9wbWVudCBUZWFtLlxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBNb2RpZmllZCBCU0QgTGljZW5zZS5cbmltcG9ydCB7IERpYWxvZywgc2hvd0RpYWxvZywgVG9vbGJhckJ1dHRvbkNvbXBvbmVudCwgVkRvbVJlbmRlcmVyIH0gZnJvbSAnQGp1cHl0ZXJsYWIvYXBwdXRpbHMnO1xuaW1wb3J0IHsgbnVsbFRyYW5zbGF0b3IgfSBmcm9tICdAanVweXRlcmxhYi90cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBCdXR0b24sIGNhcmV0RG93bkljb24sIGNhcmV0UmlnaHRJY29uLCBDb2xsYXBzZSwgSW5wdXRHcm91cCwganVweXRlckljb24sIGxpc3RpbmdzSW5mb0ljb24sIHJlZnJlc2hJY29uIH0gZnJvbSAnQGp1cHl0ZXJsYWIvdWktY29tcG9uZW50cyc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RQYWdpbmF0ZSBmcm9tICdyZWFjdC1wYWdpbmF0ZSc7XG5pbXBvcnQgeyBMaXN0TW9kZWwgfSBmcm9tICcuL21vZGVsJztcbmltcG9ydCB7IGlzSnVweXRlck9yZyB9IGZyb20gJy4vbnBtJztcbi8vIFRPRE86IFJlcGxhY2UgcGFnaW5hdGlvbiB3aXRoIGxhenkgbG9hZGluZyBvZiBsb3dlciBzZWFyY2ggcmVzdWx0c1xuLyoqXG4gKiBJY29ucyB3aXRoIGN1c3RvbSBzdHlsaW5nIGJvdW5kLlxuICovXG5jb25zdCBjYXJldERvd25JY29uU3R5bGVkID0gY2FyZXREb3duSWNvbi5iaW5kcHJvcHMoe1xuICAgIGhlaWdodDogJ2F1dG8nLFxuICAgIHdpZHRoOiAnMjBweCdcbn0pO1xuY29uc3QgY2FyZXRSaWdodEljb25TdHlsZWQgPSBjYXJldFJpZ2h0SWNvbi5iaW5kcHJvcHMoe1xuICAgIGhlaWdodDogJ2F1dG8nLFxuICAgIHdpZHRoOiAnMjBweCdcbn0pO1xuY29uc3QgYmFkZ2VTaXplID0gMzI7XG5jb25zdCBiYWRnZVF1ZXJ5U2l6ZSA9IE1hdGguZmxvb3IoZGV2aWNlUGl4ZWxSYXRpbyAqIGJhZGdlU2l6ZSk7XG4vKipcbiAqIFNlYXJjaCBiYXIgVkRPTSBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZWFyY2hCYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhhbmRsZXIgZm9yIHNlYXJjaCBpbnB1dCBjaGFuZ2VzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiAnJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIGxpc3QgdmlldyB1c2luZyB0aGUgdmlydHVhbCBET00uXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtZXh0ZW5zaW9ubWFuYWdlci1zZWFyY2gtYmFyXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSW5wdXRHcm91cCwgeyBjbGFzc05hbWU6IFwianAtZXh0ZW5zaW9ubWFuYWdlci1zZWFyY2gtd3JhcHBlclwiLCB0eXBlOiBcInRleHRcIiwgcGxhY2Vob2xkZXI6IHRoaXMucHJvcHMucGxhY2Vob2xkZXIsIG9uQ2hhbmdlOiB0aGlzLmhhbmRsZUNoYW5nZSwgdmFsdWU6IHRoaXMuc3RhdGUudmFsdWUsIHJpZ2h0SWNvbjogXCJ1aS1jb21wb25lbnRzOnNlYXJjaFwiLCBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCB9KSkpO1xuICAgIH1cbn1cbi8qKlxuICogQ3JlYXRlIGEgYnVpbGQgcHJvbXB0IGFzIGEgcmVhY3QgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gcHJvcHMgQ29uZmlndXJhdGlvbiBvZiB0aGUgYnVpbGQgcHJvbXB0LlxuICovXG5mdW5jdGlvbiBCdWlsZFByb21wdChwcm9wcykge1xuICAgIGNvbnN0IHRyYW5zbGF0b3IgPSBwcm9wcy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLWV4dGVuc2lvbm1hbmFnZXItYnVpbGRwcm9tcHRcIiB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLWV4dGVuc2lvbm1hbmFnZXItYnVpbGRtZXNzYWdlXCIgfSwgdHJhbnMuX18oJ0EgYnVpbGQgaXMgbmVlZGVkIHRvIGluY2x1ZGUgdGhlIGxhdGVzdCBjaGFuZ2VzJykpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBvbkNsaWNrOiBwcm9wcy5wZXJmb3JtQnVpbGQsIG1pbmltYWw6IHRydWUsIHNtYWxsOiB0cnVlIH0sIHRyYW5zLl9fKCdSZWJ1aWxkJykpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBvbkNsaWNrOiBwcm9wcy5pZ25vcmVCdWlsZCwgbWluaW1hbDogdHJ1ZSwgc21hbGw6IHRydWUgfSwgdHJhbnMuX18oJ0lnbm9yZScpKSkpO1xufVxuZnVuY3Rpb24gZ2V0RXh0ZW5zaW9uR2l0SHViVXNlcihlbnRyeSkge1xuICAgIGlmIChlbnRyeS51cmwgJiYgZW50cnkudXJsLnN0YXJ0c1dpdGgoJ2h0dHBzOi8vZ2l0aHViLmNvbS8nKSkge1xuICAgICAgICByZXR1cm4gZW50cnkudXJsLnNwbGl0KCcvJylbM107XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuLyoqXG4gKiBWRE9NIGZvciB2aXN1YWxpemluZyBhbiBleHRlbnNpb24gZW50cnkuXG4gKi9cbmZ1bmN0aW9uIExpc3RFbnRyeShwcm9wcykge1xuICAgIHZhciBfYTtcbiAgICBjb25zdCB7IGVudHJ5LCBsaXN0TW9kZSwgdmlld1R5cGUgfSA9IHByb3BzO1xuICAgIGNvbnN0IHRyYW5zbGF0b3IgPSBwcm9wcy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgZmxhZ0NsYXNzZXMgPSBbXTtcbiAgICBpZiAoZW50cnkuc3RhdHVzICYmIFsnb2snLCAnd2FybmluZycsICdlcnJvciddLmluZGV4T2YoZW50cnkuc3RhdHVzKSAhPT0gLTEpIHtcbiAgICAgICAgZmxhZ0NsYXNzZXMucHVzaChganAtZXh0ZW5zaW9ubWFuYWdlci1lbnRyeS0ke2VudHJ5LnN0YXR1c31gKTtcbiAgICB9XG4gICAgbGV0IHRpdGxlID0gZW50cnkubmFtZTtcbiAgICBjb25zdCBlbnRyeUlzSnVweXRlck9yZyA9IGlzSnVweXRlck9yZyhlbnRyeS5uYW1lKTtcbiAgICBpZiAoZW50cnlJc0p1cHl0ZXJPcmcpIHtcbiAgICAgICAgdGl0bGUgPSB0cmFucy5fXygnJTEgKERldmVsb3BlZCBieSBQcm9qZWN0IEp1cHl0ZXIpJywgZW50cnkubmFtZSk7XG4gICAgfVxuICAgIGNvbnN0IGdpdGh1YlVzZXIgPSBnZXRFeHRlbnNpb25HaXRIdWJVc2VyKGVudHJ5KTtcbiAgICBpZiAobGlzdE1vZGUgPT09ICdibG9jaycgJiZcbiAgICAgICAgZW50cnkuYmxvY2tlZEV4dGVuc2lvbnNFbnRyeSAmJlxuICAgICAgICB2aWV3VHlwZSA9PT0gJ3NlYXJjaFJlc3VsdCcpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCBudWxsKTtcbiAgICB9XG4gICAgaWYgKGxpc3RNb2RlID09PSAnYWxsb3cnICYmXG4gICAgICAgICFlbnRyeS5hbGxvd2VkRXh0ZW5zaW9uc0VudHJ5ICYmXG4gICAgICAgIHZpZXdUeXBlID09PSAnc2VhcmNoUmVzdWx0Jykge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIG51bGwpO1xuICAgIH1cbiAgICBpZiAobGlzdE1vZGUgPT09ICdibG9jaycgJiYgKChfYSA9IGVudHJ5LmJsb2NrZWRFeHRlbnNpb25zRW50cnkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5uYW1lKSkge1xuICAgICAgICBmbGFnQ2xhc3Nlcy5wdXNoKGBqcC1leHRlbnNpb25tYW5hZ2VyLWVudHJ5LXNob3VsZC1iZS11bmluc3RhbGxlZGApO1xuICAgIH1cbiAgICBpZiAobGlzdE1vZGUgPT09ICdhbGxvdycgJiYgIWVudHJ5LmFsbG93ZWRFeHRlbnNpb25zRW50cnkpIHtcbiAgICAgICAgZmxhZ0NsYXNzZXMucHVzaChganAtZXh0ZW5zaW9ubWFuYWdlci1lbnRyeS1zaG91bGQtYmUtdW5pbnN0YWxsZWRgKTtcbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IGBqcC1leHRlbnNpb25tYW5hZ2VyLWVudHJ5ICR7ZmxhZ0NsYXNzZXMuam9pbignICcpfWAsIHRpdGxlOiB0aXRsZSwgc3R5bGU6IHsgZGlzcGxheTogJ2ZsZXgnIH0gfSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IG1hcmdpblJpZ2h0OiAnOHB4JyB9IH0sXG4gICAgICAgICAgICBnaXRodWJVc2VyICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgc3JjOiBgaHR0cHM6Ly9naXRodWIuY29tLyR7Z2l0aHViVXNlcn0ucG5nP3NpemU9JHtiYWRnZVF1ZXJ5U2l6ZX1gLCBzdHlsZTogeyB3aWR0aDogJzMycHgnLCBoZWlnaHQ6ICczMnB4JyB9IH0pKSxcbiAgICAgICAgICAgICFnaXRodWJVc2VyICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgd2lkdGg6IGAke2JhZGdlU2l6ZX1weGAsIGhlaWdodDogYCR7YmFkZ2VTaXplfXB4YCB9IH0pKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtZXh0ZW5zaW9ubWFuYWdlci1lbnRyeS1kZXNjcmlwdGlvblwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLWV4dGVuc2lvbm1hbmFnZXItZW50cnktdGl0bGVcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtZXh0ZW5zaW9ubWFuYWdlci1lbnRyeS1uYW1lXCIgfSwgZW50cnkudXJsID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgaHJlZjogZW50cnkudXJsLCB0YXJnZXQ6IFwiX2JsYW5rXCIsIHJlbDogXCJub29wZW5lciBub3JlZmVycmVyXCIgfSwgZW50cnkubmFtZSkpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgZW50cnkubmFtZSkpKSxcbiAgICAgICAgICAgICAgICBlbnRyeS5ibG9ja2VkRXh0ZW5zaW9uc0VudHJ5ICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXJCdXR0b25Db21wb25lbnQsIHsgaWNvbjogbGlzdGluZ3NJbmZvSWNvbiwgaWNvbkxhYmVsOiB0cmFucy5fXygnJTEgZXh0ZW5zaW9uIGhhcyBiZWVuIGJsb2NrZWRFeHRlbnNpb25zIHNpbmNlIGluc3RhbGwuIFBsZWFzZSB1bmluc3RhbGwgaW1tZWRpYXRlbHkgYW5kIGNvbnRhY3QgeW91ciBibG9ja2VkRXh0ZW5zaW9ucyBhZG1pbmlzdHJhdG9yLicsIGVudHJ5Lm5hbWUpLCBvbkNsaWNrOiAoKSA9PiB3aW5kb3cub3BlbignaHR0cHM6Ly9qdXB5dGVybGFiLnJlYWR0aGVkb2NzLmlvL2VuLzMuNC54L3VzZXIvZXh0ZW5zaW9ucy5odG1sJykgfSkpLFxuICAgICAgICAgICAgICAgICFlbnRyeS5hbGxvd2VkRXh0ZW5zaW9uc0VudHJ5ICYmXG4gICAgICAgICAgICAgICAgICAgIHZpZXdUeXBlID09PSAnaW5zdGFsbGVkJyAmJlxuICAgICAgICAgICAgICAgICAgICBsaXN0TW9kZSA9PT0gJ2FsbG93JyAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyQnV0dG9uQ29tcG9uZW50LCB7IGljb246IGxpc3RpbmdzSW5mb0ljb24sIGljb25MYWJlbDogdHJhbnMuX18oJyUxIGV4dGVuc2lvbiBoYXMgYmVlbiByZW1vdmVkIGZyb20gdGhlIGFsbG93ZWRFeHRlbnNpb25zIHNpbmNlIGluc3RhbGxhdGlvbi4gUGxlYXNlIHVuaW5zdGFsbCBpbW1lZGlhdGVseSBhbmQgY29udGFjdCB5b3VyIGFsbG93ZWRFeHRlbnNpb25zIGFkbWluaXN0cmF0b3IuJywgZW50cnkubmFtZSksIG9uQ2xpY2s6ICgpID0+IHdpbmRvdy5vcGVuKCdodHRwczovL2p1cHl0ZXJsYWIucmVhZHRoZWRvY3MuaW8vZW4vMy40LngvdXNlci9leHRlbnNpb25zLmh0bWwnKSB9KSksXG4gICAgICAgICAgICAgICAgZW50cnlJc0p1cHl0ZXJPcmcgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoanVweXRlckljb24ucmVhY3QsIHsgY2xhc3NOYW1lOiBcImpwLWV4dGVuc2lvbm1hbmFnZXItaXMtanVweXRlci1vcmdcIiwgdG9wOiBcIjFweFwiLCBoZWlnaHQ6IFwiYXV0b1wiLCB3aWR0aDogXCIxZW1cIiB9KSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJqcC1leHRlbnNpb25tYW5hZ2VyLWVudHJ5LWNvbnRlbnRcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtZXh0ZW5zaW9ubWFuYWdlci1lbnRyeS1kZXNjcmlwdGlvblwiIH0sIGVudHJ5LmRlc2NyaXB0aW9uKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImpwLWV4dGVuc2lvbm1hbmFnZXItZW50cnktYnV0dG9uc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICFlbnRyeS5pbnN0YWxsZWQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LnBrZ190eXBlID09ICdzb3VyY2UnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhZW50cnkuYmxvY2tlZEV4dGVuc2lvbnNFbnRyeSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgISghZW50cnkuYWxsb3dlZEV4dGVuc2lvbnNFbnRyeSAmJiBsaXN0TW9kZSA9PT0gJ2FsbG93JykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIExpc3RNb2RlbC5pc0Rpc2NsYWltZWQoKSAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgb25DbGljazogKCkgPT4gcHJvcHMucGVyZm9ybUFjdGlvbignaW5zdGFsbCcsIGVudHJ5KSwgbWluaW1hbDogdHJ1ZSwgc21hbGw6IHRydWUgfSwgdHJhbnMuX18oJ0luc3RhbGwnKSkpLFxuICAgICAgICAgICAgICAgICAgICBMaXN0TW9kZWwuZW50cnlIYXNVcGRhdGUoZW50cnkpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRyeS5wa2dfdHlwZSA9PSAnc291cmNlJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIWVudHJ5LmJsb2NrZWRFeHRlbnNpb25zRW50cnkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICEoIWVudHJ5LmFsbG93ZWRFeHRlbnNpb25zRW50cnkgJiYgbGlzdE1vZGUgPT09ICdhbGxvdycpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBMaXN0TW9kZWwuaXNEaXNjbGFpbWVkKCkgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IG9uQ2xpY2s6ICgpID0+IHByb3BzLnBlcmZvcm1BY3Rpb24oJ2luc3RhbGwnLCBlbnRyeSksIG1pbmltYWw6IHRydWUsIHNtYWxsOiB0cnVlIH0sIHRyYW5zLl9fKCdVcGRhdGUnKSkpLFxuICAgICAgICAgICAgICAgICAgICBlbnRyeS5pbnN0YWxsZWQgJiYgZW50cnkucGtnX3R5cGUgPT0gJ3NvdXJjZScgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IG9uQ2xpY2s6ICgpID0+IHByb3BzLnBlcmZvcm1BY3Rpb24oJ3VuaW5zdGFsbCcsIGVudHJ5KSwgbWluaW1hbDogdHJ1ZSwgc21hbGw6IHRydWUgfSwgdHJhbnMuX18oJ1VuaW5zdGFsbCcpKSksXG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmVuYWJsZWQgJiYgZW50cnkucGtnX3R5cGUgPT0gJ3NvdXJjZScgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IG9uQ2xpY2s6ICgpID0+IHByb3BzLnBlcmZvcm1BY3Rpb24oJ2Rpc2FibGUnLCBlbnRyeSksIG1pbmltYWw6IHRydWUsIHNtYWxsOiB0cnVlIH0sIHRyYW5zLl9fKCdEaXNhYmxlJykpKSxcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuaW5zdGFsbGVkICYmIGVudHJ5LnBrZ190eXBlID09ICdzb3VyY2UnICYmICFlbnRyeS5lbmFibGVkICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KEJ1dHRvbiwgeyBvbkNsaWNrOiAoKSA9PiBwcm9wcy5wZXJmb3JtQWN0aW9uKCdlbmFibGUnLCBlbnRyeSksIG1pbmltYWw6IHRydWUsIHNtYWxsOiB0cnVlIH0sIHRyYW5zLl9fKCdFbmFibGUnKSkpLFxuICAgICAgICAgICAgICAgICAgICBlbnRyeS5pbnN0YWxsZWQgJiYgZW50cnkucGtnX3R5cGUgPT0gJ3ByZWJ1aWx0JyAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJqcC1leHRlbnNpb25tYW5hZ2VyLWVudHJ5LWJ1dHRvbnNcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgb25DbGljazogKCkgPT4gc2hvd0RpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBnZXRQcmVidWlsdFVuaW5zdGFsbEluc3RydWN0aW9uKGVudHJ5LCB0cmFucykpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9nLm9rQnV0dG9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogdHJhbnMuX18oJ09LJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdHJhbnMuX18oJ09LJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuYnV0dG9uLmFjY2VwdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSwgbWluaW1hbDogdHJ1ZSwgc21hbGw6IHRydWUgfSwgdHJhbnMuX18oJ0Fib3V0JykpKSkpKSkpKTtcbn1cbmZ1bmN0aW9uIGdldFByZWJ1aWx0VW5pbnN0YWxsSW5zdHJ1Y3Rpb24oZW50cnksIHRyYW5zKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBpZiAoKF9hID0gZW50cnkuaW5zdGFsbCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnVuaW5zdGFsbEluc3RydWN0aW9ucykge1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIHRyYW5zLl9fKGBUaGlzIGlzIGEgcHJlYnVpbHQgZXh0ZW5zaW9uLiBUbyB1bmluc3RhbGwgaXQsIHBsZWFzZVxuICAgIGFwcGx5IGZvbGxvd2luZyBpbnN0cnVjdGlvbnMuYCkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgdHJhbnMuX18oKF9iID0gZW50cnkuaW5zdGFsbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnVuaW5zdGFsbEluc3RydWN0aW9ucykpKSk7XG4gICAgfVxuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCB0cmFucy5fXyhgVGhpcyBpcyBhIHByZWJ1aWx0IGV4dGVuc2lvbi4gVG8gdW5pbnN0YWxsIGl0LCBwbGVhc2VcbiAgICByZWFkIHRoZSB1c2VyIGd1aWRlIG9uOmApKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgaHJlZjogXCJodHRwczovL2p1cHl0ZXJsYWIucmVhZHRoZWRvY3MuaW8vZW4vMy40LngvdXNlci9leHRlbnNpb25zLmh0bWxcIiwgdGFyZ2V0OiBcIl9ibGFua1wiLCByZWw6IFwibm9vcGVuZXIgbm9yZWZlcnJlclwiIH0sIFwiaHR0cHM6Ly9qdXB5dGVybGFiLnJlYWR0aGVkb2NzLmlvL2VuLzMuNC54L3VzZXIvZXh0ZW5zaW9ucy5odG1sXCIpKSkpO1xufVxuLyoqXG4gKiBMaXN0IHZpZXcgd2lkZ2V0IGZvciBleHRlbnNpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBMaXN0Vmlldyhwcm9wcykge1xuICAgIGNvbnN0IHRyYW5zbGF0b3IgPSBwcm9wcy50cmFuc2xhdG9yIHx8IG51bGxUcmFuc2xhdG9yO1xuICAgIGNvbnN0IHRyYW5zID0gdHJhbnNsYXRvci5sb2FkKCdqdXB5dGVybGFiJyk7XG4gICAgY29uc3QgZW50cnlWaWV3cyA9IFtdO1xuICAgIGZvciAoY29uc3QgZW50cnkgb2YgcHJvcHMuZW50cmllcykge1xuICAgICAgICBlbnRyeVZpZXdzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChMaXN0RW50cnksIHsgZW50cnk6IGVudHJ5LCBsaXN0TW9kZTogcHJvcHMubGlzdE1vZGUsIHZpZXdUeXBlOiBwcm9wcy52aWV3VHlwZSwga2V5OiBlbnRyeS5uYW1lLCBwZXJmb3JtQWN0aW9uOiBwcm9wcy5wZXJmb3JtQWN0aW9uLCB0cmFuc2xhdG9yOiB0cmFuc2xhdG9yIH0pKTtcbiAgICB9XG4gICAgbGV0IHBhZ2luYXRpb247XG4gICAgaWYgKHByb3BzLm51bVBhZ2VzID4gMSkge1xuICAgICAgICBwYWdpbmF0aW9uID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtZXh0ZW5zaW9ubWFuYWdlci1wYWdpbmF0aW9uXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3RQYWdpbmF0ZSwgeyBwcmV2aW91c0xhYmVsOiAnPCcsIG5leHRMYWJlbDogJz4nLCBicmVha0xhYmVsOiBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGhyZWY6IFwiXCIgfSwgXCIuLi5cIiksIGJyZWFrQ2xhc3NOYW1lOiAnYnJlYWstbWUnLCBwYWdlQ291bnQ6IHByb3BzLm51bVBhZ2VzLCBtYXJnaW5QYWdlc0Rpc3BsYXllZDogMiwgcGFnZVJhbmdlRGlzcGxheWVkOiA1LCBvblBhZ2VDaGFuZ2U6IChkYXRhKSA9PiBwcm9wcy5vblBhZ2UoZGF0YS5zZWxlY3RlZCksIGNvbnRhaW5lckNsYXNzTmFtZTogJ3BhZ2luYXRpb24nLCBhY3RpdmVDbGFzc05hbWU6ICdhY3RpdmUnIH0pKSk7XG4gICAgfVxuICAgIGNvbnN0IGxpc3R2aWV3ID0gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7IGNsYXNzTmFtZTogXCJqcC1leHRlbnNpb25tYW5hZ2VyLWxpc3R2aWV3XCIgfSwgZW50cnlWaWV3cykpO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJqcC1leHRlbnNpb25tYW5hZ2VyLWxpc3R2aWV3LXdyYXBwZXJcIiB9LFxuICAgICAgICBlbnRyeVZpZXdzLmxlbmd0aCA+IDAgPyAobGlzdHZpZXcpIDogKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBrZXk6IFwibWVzc2FnZVwiLCBjbGFzc05hbWU6IFwianAtZXh0ZW5zaW9ubWFuYWdlci1saXN0dmlldy1tZXNzYWdlXCIgfSwgdHJhbnMuX18oJ05vIGVudHJpZXMnKSkpLFxuICAgICAgICBwYWdpbmF0aW9uKSk7XG59XG5mdW5jdGlvbiBFcnJvck1lc3NhZ2UocHJvcHMpIHtcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBrZXk6IFwiZXJyb3ItbXNnXCIsIGNsYXNzTmFtZTogXCJqcC1leHRlbnNpb25tYW5hZ2VyLWVycm9yXCIgfSwgcHJvcHMuY2hpbGRyZW4pKTtcbn1cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENvbGxhcHNpYmxlU2VjdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgaXNPcGVuOiBwcm9wcy5pc09wZW4gPyB0cnVlIDogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSBjb2xsYXBzaWJsZSBzZWN0aW9uIHVzaW5nIHRoZSB2aXJ0dWFsIERPTS5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBpY29uID0gdGhpcy5zdGF0ZS5pc09wZW4gPyBjYXJldERvd25JY29uU3R5bGVkIDogY2FyZXRSaWdodEljb25TdHlsZWQ7XG4gICAgICAgIGxldCBpc09wZW4gPSB0aGlzLnN0YXRlLmlzT3BlbjtcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9ICdqcC1leHRlbnNpb25tYW5hZ2VyLWhlYWRlclRleHQnO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWNvbiA9IGNhcmV0UmlnaHRJY29uU3R5bGVkO1xuICAgICAgICAgICAgaXNPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSAnanAtZXh0ZW5zaW9ubWFuYWdlci1oZWFkZXJUZXh0RGlzYWJsZWQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdC5GcmFnbWVudCwgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtc3RhY2stcGFuZWwtaGVhZGVyXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRvb2xiYXJCdXR0b25Db21wb25lbnQsIHsgaWNvbjogaWNvbiwgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDb2xsYXBzZSgpO1xuICAgICAgICAgICAgICAgICAgICB9IH0pLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWUgfSwgdGhpcy5wcm9wcy5oZWFkZXIpLFxuICAgICAgICAgICAgICAgICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRoaXMucHJvcHMuaGVhZGVyRWxlbWVudHMpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChDb2xsYXBzZSwgeyBpc09wZW46IGlzT3BlbiB9LCB0aGlzLnByb3BzLmNoaWxkcmVuKSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBzZWFyY2ggaW5wdXQgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBoYW5kbGVDb2xsYXBzZSgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBpc09wZW46ICF0aGlzLnN0YXRlLmlzT3BlblxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNvbGxhcHNlKHRoaXMuc3RhdGUuaXNPcGVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFVOU0FGRV9jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAobmV4dFByb3BzLmZvcmNlT3Blbikge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaXNPcGVuOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogVGhlIG1haW4gdmlldyBmb3IgdGhlIGRpc2NvdmVyeSBleHRlbnNpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBFeHRlbnNpb25WaWV3IGV4dGVuZHMgVkRvbVJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihhcHAsIHNlcnZpY2VNYW5hZ2VyLCBzZXR0aW5ncywgdHJhbnNsYXRvcikge1xuICAgICAgICBzdXBlcihuZXcgTGlzdE1vZGVsKGFwcCwgc2VydmljZU1hbmFnZXIsIHNldHRpbmdzLCB0cmFuc2xhdG9yKSk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRvciA9IHRyYW5zbGF0b3IgfHwgbnVsbFRyYW5zbGF0b3I7XG4gICAgICAgIHRoaXMuX3RyYW5zID0gdGhpcy50cmFuc2xhdG9yLmxvYWQoJ2p1cHl0ZXJsYWInKTtcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICAgICAgdGhpcy5fZm9yY2VPcGVuID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2pwLWV4dGVuc2lvbm1hbmFnZXItdmlldycpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgc2VhcmNoIGlucHV0IG5vZGUuXG4gICAgICovXG4gICAgZ2V0IGlucHV0Tm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5xdWVyeVNlbGVjdG9yKCcuanAtZXh0ZW5zaW9ubWFuYWdlci1zZWFyY2gtd3JhcHBlciBpbnB1dCcpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgdGhlIGV4dGVuc2lvbiB2aWV3IHVzaW5nIHRoZSB2aXJ0dWFsIERPTS5cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbDtcbiAgICAgICAgaWYgKCFtb2RlbC5saXN0TW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIFtSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsga2V5OiBcImVtcHR5XCIgfSldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtb2RlbC5saXN0TW9kZSA9PT0gJ2ludmFsaWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZTogeyBwYWRkaW5nOiA4IH0sIGtleTogXCJpbnZhbGlkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCB0aGlzLl90cmFuc1xuICAgICAgICAgICAgICAgICAgICAgICAgLl9fKGBUaGUgZXh0ZW5zaW9uIG1hbmFnZXIgaXMgZGlzYWJsZWQuIFBsZWFzZSBjb250YWN0IHlvdXIgc3lzdGVtXG5hZG1pbmlzdHJhdG9yIHRvIHZlcmlmeSB0aGUgbGlzdGluZ3MgY29uZmlndXJhdGlvbi5gKSksXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgaHJlZjogXCJodHRwczovL2p1cHl0ZXJsYWIucmVhZHRoZWRvY3MuaW8vZW4vMy40LngvdXNlci9leHRlbnNpb25zLmh0bWxcIiwgdGFyZ2V0OiBcIl9ibGFua1wiLCByZWw6IFwibm9vcGVuZXIgbm9yZWZlcnJlclwiIH0sIHRoaXMuX3RyYW5zLl9fKCdSZWFkIG1vcmUgaW4gdGhlIEp1cHl0ZXJMYWIgZG9jdW1lbnRhdGlvbi4nKSkpKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWdlcyA9IE1hdGguY2VpbChtb2RlbC50b3RhbEVudHJpZXMgLyBtb2RlbC5wYWdpbmF0aW9uKTtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBbXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXJjaEJhciwgeyBrZXk6IFwic2VhcmNoYmFyXCIsIHBsYWNlaG9sZGVyOiB0aGlzLl90cmFucy5fXygnU0VBUkNIJyksIGRpc2FibGVkOiAhTGlzdE1vZGVsLmlzRGlzY2xhaW1lZCgpLCBzZXR0aW5nczogdGhpcy5fc2V0dGluZ3MgfSlcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKG1vZGVsLnByb21wdEJ1aWxkKSB7XG4gICAgICAgICAgICBlbGVtZW50cy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnVpbGRQcm9tcHQsIHsga2V5OiBcInByb210XCIsIHRyYW5zbGF0b3I6IHRoaXMudHJhbnNsYXRvciwgcGVyZm9ybUJ1aWxkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLnBlcmZvcm1CdWlsZCgpO1xuICAgICAgICAgICAgICAgIH0sIGlnbm9yZUJ1aWxkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLmlnbm9yZUJ1aWxkUmVjb21tZW5kYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9IH0pKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbmRpY2F0b3IgZWxlbWVudCBmb3IgcGVuZGluZyBhY3Rpb25zOlxuICAgICAgICBlbGVtZW50cy5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBrZXk6IFwicGVuZGluZ1wiLCBjbGFzc05hbWU6IGBqcC1leHRlbnNpb25tYW5hZ2VyLXBlbmRpbmcgJHttb2RlbC5oYXNQZW5kaW5nQWN0aW9ucygpID8gJ2pwLW1vZC1oYXNQZW5kaW5nJyA6ICcnfWAgfSkpO1xuICAgICAgICBjb25zdCBjb250ZW50ID0gW107XG4gICAgICAgIGNvbnRlbnQucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KENvbGxhcHNpYmxlU2VjdGlvbiwgeyBrZXk6IFwid2FybmluZy1zZWN0aW9uXCIsIGlzT3BlbjogIUxpc3RNb2RlbC5pc0Rpc2NsYWltZWQoKSwgZGlzYWJsZWQ6IGZhbHNlLCBoZWFkZXI6IHRoaXMuX3RyYW5zLl9fKCdXYXJuaW5nJykgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwianAtZXh0ZW5zaW9ubWFuYWdlci1kaXNjbGFpbWVyXCIgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIHRoaXMuX3RyYW5zXG4gICAgICAgICAgICAgICAgICAgIC5fXyhgVGhlIEp1cHl0ZXJMYWIgZGV2ZWxvcG1lbnQgdGVhbSBpcyBleGNpdGVkIHRvIGhhdmUgYSByb2J1c3RcbnRoaXJkLXBhcnR5IGV4dGVuc2lvbiBjb21tdW5pdHkuIEhvd2V2ZXIsIHdlIGRvIG5vdCByZXZpZXdcbnRoaXJkLXBhcnR5IGV4dGVuc2lvbnMsIGFuZCBzb21lIGV4dGVuc2lvbnMgbWF5IGludHJvZHVjZSBzZWN1cml0eVxucmlza3Mgb3IgY29udGFpbiBtYWxpY2lvdXMgY29kZSB0aGF0IHJ1bnMgb24geW91ciBtYWNoaW5lLmApKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHsgcGFkZGluZ1RvcDogOCB9IH0sXG4gICAgICAgICAgICAgICAgICAgIExpc3RNb2RlbC5pc0Rpc2NsYWltZWQoKSAmJiAoUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgY2xhc3NOYW1lOiBcImpwLWV4dGVuc2lvbm1hbmFnZXItZGlzY2xhaW1lci1kaXNhYmxlXCIsIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3Muc2V0KCdkaXNjbGFpbWVkJywgZmFsc2UpLmNhdGNoKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFNvbWV0aGluZyB3ZW50IHdyb25nIHdoZW4gc2V0dGluZyBkaXNjbGFpbWVkLlxcbiR7cmVhc29ufWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSB9LCB0aGlzLl90cmFucy5fXygnRGlzYWJsZScpKSksXG4gICAgICAgICAgICAgICAgICAgICFMaXN0TW9kZWwuaXNEaXNjbGFpbWVkKCkgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQnV0dG9uLCB7IGNsYXNzTmFtZTogXCJqcC1leHRlbnNpb25tYW5hZ2VyLWRpc2NsYWltZXItZW5hYmxlXCIsIG9uQ2xpY2s6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZm9yY2VPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXR0aW5ncy5zZXQoJ2Rpc2NsYWltZWQnLCB0cnVlKS5jYXRjaChyZWFzb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIHNldHRpbmcgZGlzY2xhaW1lZC5cXG4ke3JlYXNvbn1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSwgdGhpcy5fdHJhbnMuX18oJ0VuYWJsZScpKSkpKSkpO1xuICAgICAgICBpZiAoIW1vZGVsLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICBjb250ZW50LnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGtleTogXCJsb2FkaW5nLXBsYWNlaG9sZGVyXCIsIGNsYXNzTmFtZTogXCJqcC1leHRlbnNpb25tYW5hZ2VyLWxvYWRlclwiIH0sIHRoaXMuX3RyYW5zLl9fKCdVcGRhdGluZyBleHRlbnNpb25zIGxpc3QnKSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1vZGVsLnNlcnZlckNvbm5lY3Rpb25FcnJvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGVudC5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRXJyb3JNZXNzYWdlLCB7IGtleTogXCJlcnJvci1tc2dcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIHRoaXMuX3RyYW5zXG4gICAgICAgICAgICAgICAgICAgIC5fXyhgRXJyb3IgY29tbXVuaWNhdGluZyB3aXRoIHNlcnZlciBleHRlbnNpb24uIENvbnN1bHQgdGhlIGRvY3VtZW50YXRpb25cbiAgICAgICAgICAgIGZvciBob3cgdG8gZW5zdXJlIHRoYXQgaXQgaXMgZW5hYmxlZC5gKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgdGhpcy5fdHJhbnMuX18oJ1JlYXNvbiBnaXZlbjonKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInByZVwiLCBudWxsLCBtb2RlbC5zZXJ2ZXJDb25uZWN0aW9uRXJyb3IpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobW9kZWwuc2VydmVyUmVxdWlyZW1lbnRzRXJyb3IgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KEVycm9yTWVzc2FnZSwgeyBrZXk6IFwic2VydmVyLXJlcXVpcmVtZW50cy1lcnJvclwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgdGhpcy5fdHJhbnMuX18oJ1RoZSBzZXJ2ZXIgaGFzIHNvbWUgbWlzc2luZyByZXF1aXJlbWVudHMgZm9yIGluc3RhbGxpbmcgZXh0ZW5zaW9ucy4nKSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCwgdGhpcy5fdHJhbnMuX18oJ0RldGFpbHM6JykpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwcmVcIiwgbnVsbCwgbW9kZWwuc2VydmVyUmVxdWlyZW1lbnRzRXJyb3IpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBMaXN0IGluc3RhbGxlZCBhbmQgZGlzY292ZXJ5IHNlY3Rpb25zXG4gICAgICAgICAgICBjb25zdCBpbnN0YWxsZWRDb250ZW50ID0gW107XG4gICAgICAgICAgICBpZiAobW9kZWwuaW5zdGFsbGVkRXJyb3IgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpbnN0YWxsZWRDb250ZW50LnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChFcnJvck1lc3NhZ2UsIHsga2V5OiBcImluc3RhbGwtZXJyb3JcIiB9LCBgRXJyb3IgcXVlcnlpbmcgaW5zdGFsbGVkIGV4dGVuc2lvbnMke21vZGVsLmluc3RhbGxlZEVycm9yID8gYDogJHttb2RlbC5pbnN0YWxsZWRFcnJvcn1gIDogJy4nfWApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFJlZ0V4cCgoX2IgPSAoX2EgPSBtb2RlbC5xdWVyeSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvTG93ZXJDYXNlKCkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICcnKTtcbiAgICAgICAgICAgICAgICBpbnN0YWxsZWRDb250ZW50LnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChMaXN0VmlldywgeyBrZXk6IFwiaW5zdGFsbGVkLWl0ZW1zXCIsIGxpc3RNb2RlOiBtb2RlbC5saXN0TW9kZSwgdmlld1R5cGU6ICdpbnN0YWxsZWQnLCBlbnRyaWVzOiBtb2RlbC5pbnN0YWxsZWQuZmlsdGVyKHBrZyA9PiAhbW9kZWwucXVlcnkgfHwgcXVlcnkudGVzdChwa2cubmFtZSkpLCBudW1QYWdlczogMSwgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yLCBvblBhZ2U6IHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIG5vLW9wICovXG4gICAgICAgICAgICAgICAgICAgIH0sIHBlcmZvcm1BY3Rpb246IHRoaXMub25BY3Rpb24uYmluZCh0aGlzKSB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZW50LnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChDb2xsYXBzaWJsZVNlY3Rpb24sIHsga2V5OiBcImluc3RhbGxlZC1zZWN0aW9uXCIsIGlzT3BlbjogTGlzdE1vZGVsLmlzRGlzY2xhaW1lZCgpLCBmb3JjZU9wZW46IHRoaXMuX2ZvcmNlT3BlbiwgZGlzYWJsZWQ6ICFMaXN0TW9kZWwuaXNEaXNjbGFpbWVkKCksIGhlYWRlcjogdGhpcy5fdHJhbnMuX18oJ0luc3RhbGxlZCcpLCBoZWFkZXJFbGVtZW50czogUmVhY3QuY3JlYXRlRWxlbWVudChUb29sYmFyQnV0dG9uQ29tcG9uZW50LCB7IGtleTogXCJyZWZyZXNoLWJ1dHRvblwiLCBpY29uOiByZWZyZXNoSWNvbiwgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwucmVmcmVzaEluc3RhbGxlZCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0b29sdGlwOiB0aGlzLl90cmFucy5fXygnUmVmcmVzaCBleHRlbnNpb24gbGlzdCcpIH0pIH0sIGluc3RhbGxlZENvbnRlbnQpKTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaENvbnRlbnQgPSBbXTtcbiAgICAgICAgICAgIGlmIChtb2RlbC5zZWFyY2hFcnJvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNlYXJjaENvbnRlbnQucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KEVycm9yTWVzc2FnZSwgeyBrZXk6IFwic2VhcmNoLWVycm9yXCIgfSwgYEVycm9yIHNlYXJjaGluZyBmb3IgZXh0ZW5zaW9ucyR7bW9kZWwuc2VhcmNoRXJyb3IgPyBgOiAke21vZGVsLnNlYXJjaEVycm9yfWAgOiAnLid9YCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VhcmNoQ29udGVudC5wdXNoKFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGlzdFZpZXcsIHsga2V5OiBcInNlYXJjaC1pdGVtc1wiLCBsaXN0TW9kZTogbW9kZWwubGlzdE1vZGUsIHZpZXdUeXBlOiAnc2VhcmNoUmVzdWx0JywgXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgaW5zdGFsbGVkIGV4dGVuc2lvbnM6XG4gICAgICAgICAgICAgICAgICAgIGVudHJpZXM6IG1vZGVsLnNlYXJjaFJlc3VsdC5maWx0ZXIoZW50cnkgPT4gbW9kZWwuaW5zdGFsbGVkLmluZGV4T2YoZW50cnkpID09PSAtMSksIG51bVBhZ2VzOiBwYWdlcywgb25QYWdlOiB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUGFnZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIHBlcmZvcm1BY3Rpb246IHRoaXMub25BY3Rpb24uYmluZCh0aGlzKSwgdHJhbnNsYXRvcjogdGhpcy50cmFuc2xhdG9yIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRlbnQucHVzaChSZWFjdC5jcmVhdGVFbGVtZW50KENvbGxhcHNpYmxlU2VjdGlvbiwgeyBrZXk6IFwic2VhcmNoLXNlY3Rpb25cIiwgaXNPcGVuOiBMaXN0TW9kZWwuaXNEaXNjbGFpbWVkKCksIGZvcmNlT3BlbjogdGhpcy5fZm9yY2VPcGVuLCBkaXNhYmxlZDogIUxpc3RNb2RlbC5pc0Rpc2NsYWltZWQoKSwgaGVhZGVyOiBtb2RlbC5xdWVyeVxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuX3RyYW5zLl9fKCdTZWFyY2ggUmVzdWx0cycpXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5fdHJhbnMuX18oJ0Rpc2NvdmVyJyksIG9uQ29sbGFwc2U6IChpc09wZW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3BlbiAmJiBtb2RlbC5xdWVyeSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWwucXVlcnkgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gfSwgc2VhcmNoQ29udGVudCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnRzLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGtleTogXCJjb250ZW50XCIsIGNsYXNzTmFtZTogXCJqcC1leHRlbnNpb25tYW5hZ2VyLWNvbnRlbnRcIiB9LCBjb250ZW50KSk7XG4gICAgICAgIC8vIFJlc2V0IHRoZSBmb3JjZSBvcGVuIGZvciBmdXR1cmUgdXNhZ2UuXG4gICAgICAgIHRoaXMuX2ZvcmNlT3BlbiA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGhhbmRsZXIgZm9yIHRoZSB1c2VyIHNwZWNpZmllcyBhIG5ldyBzZWFyY2ggcXVlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIG5ldyBxdWVyeS5cbiAgICAgKi9cbiAgICBvblNlYXJjaCh2YWx1ZSkge1xuICAgICAgICB0aGlzLm1vZGVsLnF1ZXJ5ID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGhhbmRsZXIgZm9yIHRoZSB1c2VyIGNoYW5nZXMgdGhlIHBhZ2Ugb2YgdGhlIHNlYXJjaCByZXN1bHQgcGFnaW5hdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZSBUaGUgcGFnaW5hdGlvbiBwYWdlIG51bWJlci5cbiAgICAgKi9cbiAgICBvblBhZ2UodmFsdWUpIHtcbiAgICAgICAgdGhpcy5tb2RlbC5wYWdlID0gdmFsdWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGhhbmRsZXIgZm9yIHdoZW4gdGhlIHVzZXIgd2FudHMgdG8gcGVyZm9ybSBhbiBhY3Rpb24gb24gYW4gZXh0ZW5zaW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIGFjdGlvbiBUaGUgYWN0aW9uIHRvIHBlcmZvcm0uXG4gICAgICogQHBhcmFtIGVudHJ5IFRoZSBlbnRyeSB0byBwZXJmb3JtIHRoZSBhY3Rpb24gb24uXG4gICAgICovXG4gICAgb25BY3Rpb24oYWN0aW9uLCBlbnRyeSkge1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnaW5zdGFsbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwuaW5zdGFsbChlbnRyeSk7XG4gICAgICAgICAgICBjYXNlICd1bmluc3RhbGwnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnVuaW5zdGFsbChlbnRyeSk7XG4gICAgICAgICAgICBjYXNlICdlbmFibGUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsLmVuYWJsZShlbnRyeSk7XG4gICAgICAgICAgICBjYXNlICdkaXNhYmxlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5kaXNhYmxlKGVudHJ5KTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGFjdGlvbjogJHthY3Rpb259YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlIHRoZSBET00gZXZlbnRzIGZvciB0aGUgZXh0ZW5zaW9uIG1hbmFnZXIgc2VhcmNoIGJhci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudCAtIFRoZSBET00gZXZlbnQgc2VudCB0byB0aGUgZXh0ZW5zaW9uIG1hbmFnZXIgc2VhcmNoIGJhci5cbiAgICAgKlxuICAgICAqICMjIyMgTm90ZXNcbiAgICAgKiBUaGlzIG1ldGhvZCBpbXBsZW1lbnRzIHRoZSBET00gYEV2ZW50TGlzdGVuZXJgIGludGVyZmFjZSBhbmQgaXNcbiAgICAgKiBjYWxsZWQgaW4gcmVzcG9uc2UgdG8gZXZlbnRzIG9uIHRoZSBzZWFyY2ggYmFyJ3MgRE9NIG5vZGUuXG4gICAgICogSXQgc2hvdWxkIG5vdCBiZSBjYWxsZWQgZGlyZWN0bHkgYnkgdXNlciBjb2RlLlxuICAgICAqL1xuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25TZWFyY2godGhpcy5pbnB1dE5vZGUudmFsdWUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9jdXMnOlxuICAgICAgICAgICAgY2FzZSAnYmx1cic6XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9nZ2xlRm9jdXNlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGEgYCdiZWZvcmUtYXR0YWNoJ2AgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBvbkJlZm9yZUF0dGFjaChtc2cpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMsIHRydWUpO1xuICAgICAgICB0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMsIHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBIG1lc3NhZ2UgaGFuZGxlciBpbnZva2VkIG9uIGFuIGAnYWZ0ZXItZGV0YWNoJ2AgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBvbkFmdGVyRGV0YWNoKG1zZykge1xuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcywgdHJ1ZSk7XG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcywgdHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEEgbWVzc2FnZSBoYW5kbGVyIGludm9rZWQgb24gYW4gYCdhY3RpdmF0ZS1yZXF1ZXN0J2AgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBvbkFjdGl2YXRlUmVxdWVzdChtc2cpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBdHRhY2hlZCkge1xuICAgICAgICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLmlucHV0Tm9kZTtcbiAgICAgICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgaW5wdXQuc2VsZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHRoZSBmb2N1c2VkIG1vZGlmaWVyIGJhc2VkIG9uIHRoZSBpbnB1dCBub2RlIGZvY3VzIHN0YXRlLlxuICAgICAqL1xuICAgIF90b2dnbGVGb2N1c2VkKCkge1xuICAgICAgICBjb25zdCBmb2N1c2VkID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5pbnB1dE5vZGU7XG4gICAgICAgIHRoaXMudG9nZ2xlQ2xhc3MoJ2xtLW1vZC1mb2N1c2VkJywgZm9jdXNlZCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2lkZ2V0LmpzLm1hcCJdLCJzb3VyY2VSb290IjoiIn0=